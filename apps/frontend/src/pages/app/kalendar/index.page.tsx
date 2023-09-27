import {
  For,
  Index,
  Show,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
} from 'solid-js';

import { addDays, addHours, getMinutes, startOfWeek } from 'date-fns';

import { getBookings } from '#/data';
import { format, toBerlinDate } from '#/util';
import { useAppContext } from '#/context/use-app-context';
import { DayHeader } from '#/pages/app/kalendar/day-header';
import { TimeSlot } from '#/pages/app/kalendar/timeslot';

export function Page() {
  const appContext = useAppContext();

  const colLength = appContext().view === 'Week' ? 7 : 1;
  const startDate =
    appContext().view === 'Week'
      ? startOfWeek(appContext().date, { weekStartsOn: 1 })
      : appContext().date;

  const cols = Array.from({ length: colLength }, (_, i) =>
    Array.from({ length: 24 }, (_, j) =>
      createSignal(addHours(addDays(startDate, i), j)),
    ),
  );

  const days = Array.from({ length: colLength }, (_, i) =>
    createSignal(addDays(startDate, i)),
  );

  const [currentTime, setCurrentTime] = createSignal(toBerlinDate(new Date()));

  const timer = setInterval(() => {
    setCurrentTime(toBerlinDate(new Date()));
  }, 30000);

  const [currentPos, setCurrentPos] = createSignal({ row: -1, col: -1 });

  onCleanup(() => clearInterval(timer));

  const [data] = createResource(() => {
    const start =
      appContext().view === 'Week'
        ? startOfWeek(appContext().date, { weekStartsOn: 1 })
        : appContext().date;

    return Array.from({ length: colLength }, (_, i) => addDays(start, i));
  }, getBookings);

  createEffect(() => {
    const start =
      appContext().view === 'Week'
        ? startOfWeek(appContext().date, { weekStartsOn: 1 })
        : appContext().date;

    days.forEach(([, setDay], i) => setDay(addDays(start, i)));

    cols.forEach((e, i) =>
      e.forEach(([, setDate], j) => setDate(addHours(addDays(start, i), j))),
    );
  });

  createEffect(() => {
    setCurrentPos({ row: -1, col: -1 });

    const f = format(currentTime(), 'dMyH');

    cols.forEach((element, i) => {
      element.forEach(([d], j) => {
        if (format(d(), 'dMyH') === f)
          setCurrentPos({ col: i + 2, row: j + 1 });
      });
    });
  });

  const gridStyle =
    appContext().view === 'Week'
      ? 'grid-cols-[80px,_repeat(7,1fr)]'
      : 'grid-cols-[80px,_repeat(1,1fr)]';

  return (
    <>
      <div
        class={`${gridStyle} border-b basis-[100px] shrink-0 grid overflow-y-scroll`}
      >
        <div></div>
        <For each={days}>
          {([day]) => <DayHeader day={day()} currentTime={currentTime()} />}
        </For>
      </div>

      <div
        class={`${gridStyle} grid-flow-col grow overflow-auto grid grid-rows-[repeat(24,50px)]`}
      >
        <Index each={Array.from({ length: 24 })}>
          {(_, i) => <TimeSlot index={i} />}
        </Index>

        <For each={cols}>
          {(col, i) => (
            <For each={col}>
              {([date], j) => {
                return (
                  <div
                    onClick={() => console.log(format(date(), 'd H'))}
                    style={{
                      'grid-area': gridArea(j() + 1, i() + 2, j() + 1, i() + 2),
                    }}
                    class='border-l border-b cursor-pointer hover:bg-neutral-900'
                  ></div>
                );
              }}
            </For>
          )}
        </For>
        <Show when={!data.loading}>
          <For each={data()}>
            {(e, i) => (
              <For each={e}>
                {(a) => (
                  <div
                    onClick={() => console.log('click booking')}
                    class='bg-orange-500 pr-4 bg-clip-content cursor-pointer hover:bg-orange-400'
                    style={{
                      'grid-area': gridArea(
                        a.start + 1,
                        i() + 2,
                        a.end + 1,
                        i() + 2,
                      ),
                    }}
                  ></div>
                )}
              </For>
            )}
          </For>
        </Show>
        <Show when={currentPos().row !== -1}>
          <div
            class='pointer-events-none relative'
            style={{
              'grid-area': gridArea(
                currentPos().row,
                currentPos().col,
                currentPos().row,
                currentPos().col,
              ),
              top: (100 / 60) * getMinutes(currentTime()) + '%',
            }}
          >
            <div class='bg-red-500 w-full h-[2px] absolute'></div>
          </div>
        </Show>
      </div>
    </>
  );
}

function gridArea(a: number, b: number, c: number, d: number) {
  return `${a}/${b}/${c}/${d}`;
}

export const title = 'Kalendar';
