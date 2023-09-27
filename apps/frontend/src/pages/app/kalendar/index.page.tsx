import {
  For,
  Index,
  Show,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
} from 'solid-js';

import { addDays, addHours, startOfWeek } from 'date-fns';

import { getBookings } from '#/data';
import { format, toBerlinDate } from '#/util';
import { useAppContext } from '#/context/use-app-context';
import { DayHeader } from '#/pages/app/kalendar/day-header';
import { TimeSlot } from '#/pages/app/kalendar/timeslot';
import { Slot } from '#/pages/app/kalendar/slot';
import { Booking } from '#/pages/app/kalendar/booking';
import { TimeIndicator } from '#/pages/app/kalendar/time-indicator';

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
              {([date], j) => (
                <Slot date={date()} dayIndex={i()} timeIndex={j()} />
              )}
            </For>
          )}
        </For>

        <Show when={!data.loading}>
          <For each={data()}>
            {(e, i) => (
              <For each={e}>
                {(a) => <Booking booking={a} dayIndex={i()} />}
              </For>
            )}
          </For>
        </Show>

        <Show when={currentPos().row !== -1}>
          <TimeIndicator
            row={currentPos().row}
            col={currentPos().col}
            currentTime={currentTime()}
          />
        </Show>
      </div>
    </>
  );
}

export const title = 'Kalendar';
