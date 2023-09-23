import {
  For,
  createEffect,
  createResource,
  createSignal,
  onCleanup,
} from 'solid-js';

import {
  addDays,
  addHours,
  eachHourOfInterval,
  endOfDay,
  startOfDay,
  startOfWeek,
} from 'date-fns';

import { getBookings } from '#/data';
import { toBerlinDate } from '#/util';
import { useAppContext } from '#/context/use-app-context';
import { Slot } from '#/pages/app/kalendar/slot';
import { DayHeader } from '#/pages/app/kalendar/day-header';
import { TimeSlot } from '#/pages/app/kalendar/time-slot';

export function Page() {
  const appContext = useAppContext();

  const colLength = appContext().view === 'Week' ? 7 : 1;
  const startDate =
    appContext().view === 'Week'
      ? startOfWeek(appContext().date, { weekStartsOn: 1 })
      : appContext().date;

  const cols = Array.from({ length: colLength }, (_, i) =>
    Array.from({ length: 24 }, (_, j) => ({
      date: createSignal(addHours(addDays(startDate, i), j)),
      booking: createSignal(false),
    })),
  );

  const days = Array.from({ length: colLength }, (_, i) =>
    createSignal(addDays(startDate, i)),
  );

  const timeSlots = eachHourOfInterval({
    start: addHours(startOfDay(appContext().date), 1),
    end: endOfDay(appContext().date),
  });

  const [currentTime, setCurrentTime] = createSignal(toBerlinDate(new Date()));

  const timer = setInterval(() => {
    setCurrentTime(toBerlinDate(new Date()));
  }, 3000);

  onCleanup(() => clearInterval(timer));

  const [data] = createResource(() => {
    const start =
      appContext().view === 'Week'
        ? startOfWeek(appContext().date, { weekStartsOn: 1 })
        : appContext().date;

    return Array.from({ length: colLength }, (_, i) => addDays(start, i));
  }, getBookings);

  createEffect(() => {
    if (data.loading) {
      cols.forEach((e) =>
        e.forEach(({ booking: [_, setBooking] }) => setBooking(false)),
      );
    } else {
      cols.forEach((e, i) =>
        e.forEach(({ booking: [_, setBooking] }, j) =>
          setBooking(data()![i][j]),
        ),
      );
    }
  });

  createEffect(() => {
    const start =
      appContext().view === 'Week'
        ? startOfWeek(appContext().date, { weekStartsOn: 1 })
        : appContext().date;

    days.forEach(([_, setDay], i) => setDay(addDays(start, i)));

    cols.forEach((e, i) =>
      e.forEach(({ date: [_, setDate] }, j) =>
        setDate(addHours(addDays(start, i), j)),
      ),
    );
  });

  return (
    <>
      <div class='basis-[100px] shrink-0 flex overflow-y-scroll'>
        <div class='basis-[80px] shrink-0 border-b'></div>
        <For each={days}>
          {([day]) => <DayHeader day={day()} currentTime={currentTime()} />}
        </For>
      </div>

      <div class='grow flex overflow-auto'>
        <div class='flex flex-col basis-[80px] shrink-0'>
          <For each={timeSlots}>{(slot) => <TimeSlot time={slot} />}</For>
        </div>
        <For each={cols}>
          {(col) => (
            <div class='flex flex-col grow'>
              <For each={col}>
                {({ date: [date], booking: [booking] }) => (
                  <Slot
                    bool={booking()}
                    date={date()}
                    currentTime={currentTime()}
                  />
                )}
              </For>
            </div>
          )}
        </For>
      </div>
    </>
  );
}

export const title = 'Kalendar';
