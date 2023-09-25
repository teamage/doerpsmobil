import { CaretDown, CaretLeft, CaretRight } from '#/components/icons';

import { As, Dialog } from '@kobalte/core';

import { format, toBerlinDate, urlQueryFormat } from '#/util';
import {
  addDays,
  addMonths,
  addWeeks,
  endOfWeek,
  getMonth,
  getYear,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useAppContext } from '#/context/use-app-context';
import { For, JSX, createEffect, createSignal, onCleanup } from 'solid-js';
import { navigate } from 'vite-plugin-ssr/client/router';

export function DayPicker() {
  const appContext = useAppContext();

  const [selectedDate, setSelectedDate] = createSignal(appContext().date);

  createEffect(() => {
    setSelectedDate(appContext().date);
  });

  const slots = Array.from({ length: 6 }, () =>
    Array.from({ length: 7 }, () => createSignal(new Date())),
  );

  const [currentTime, setCurrentTime] = createSignal(toBerlinDate(new Date()));

  const timer = setInterval(() => {
    setCurrentTime(toBerlinDate(new Date()));
  }, 3000);

  onCleanup(() => clearInterval(timer));

  createEffect(() => {
    const startDate = startOfWeek(startOfMonth(selectedDate()), {
      weekStartsOn: 1,
    });

    slots.forEach((slot, i) => {
      slot.forEach((day, j) => {
        const setter = day[1];
        setter(addDays(addWeeks(startDate, i), j));
      });
    });
  });

  console.log('render picker');

  const monthText = () => {
    if (appContext().view === 'Week') {
      const start = startOfWeek(appContext().date, { weekStartsOn: 1 });
      const end = endOfWeek(appContext().date, { weekStartsOn: 1 });

      if (getMonth(start) === getMonth(end)) return format(start, 'MMMM y');

      if (getYear(start) === getYear(end))
        return format(start, 'MMMM') + ' - ' + format(end, 'MMMM y');

      return format(start, 'MMMM y') + ' - ' + format(end, 'MMMM y');
    } else {
      return format(appContext().date, 'MMMM y');
    }
  };

  const onLeftClick = () => {
    setSelectedDate(addMonths(selectedDate(), -1));
  };

  const onRightClick = () => {
    setSelectedDate(addMonths(selectedDate(), 1));
  };

  const onBclick: JSX.EventHandler<HTMLButtonElement, MouseEvent> = (e) => {
    setSelectedDate(appContext().date);
    if (appContext().view === 'Week') {
      left = e.currentTarget.getBoundingClientRect().x;
      top = e.currentTarget.getBoundingClientRect().y;
      w = '';
    } else {
      w = '100vw';
      left = 0;
      top = 0;
    }
  };

  let w = '';
  let left = 0;
  let top = 0;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <As
          onClick={onBclick}
          component='button'
          class='flex gap-1 items-center'
        >
          {monthText()}
          <CaretDown class='w-5 h-5' />
        </As>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class='bg-background/80 fixed inset-0 data-[expanded]:animate-in animate-out fade-out-0 data-[expanded]:fade-in-0' />
        <Dialog.Content
          style={{ left: `${left}px`, top: `${top}px`, width: w }}
          class='p-4 flex border flex-col absolute bg-background z-50 transition ease-in-out data-[expanded]:animate-in animate-out duration-300 data-[expanded]:duration-500 slide-out-to-top data-[expanded]:slide-in-from-top'
        >
          <div class='flex items-center justify-between pb-4'>
            <div>{format(selectedDate(), 'MMMM y')}</div>
            <div class='flex gap-2'>
              <button onClick={onLeftClick}>
                <CaretLeft class='w-5 h-5' />
              </button>
              <button onClick={onRightClick}>
                <CaretRight class='w-5 h-5' />
              </button>
            </div>
          </div>
          <div class='flex flex-col gap-2 text-sm'>
            <div class='flex justify-between gap-2'>
              <For each={['M', 'D', 'M', 'D', 'F', 'S', 'S']}>
                {(e) => (
                  <div class='text-foreground/50 w-[35px] h-[35px] flex justify-center items-center'>
                    {e}
                  </div>
                )}
              </For>
            </div>
            <For each={slots}>
              {(slot) => (
                <div class='flex justify-between gap-2'>
                  <For each={slot}>
                    {(e) => <Cell date={e[0]()} currentTime={currentTime()} />}
                  </For>
                </div>
              )}
            </For>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function Cell(props: { date: Date; currentTime: Date }) {
  const style = () =>
    format(props.date, 'dMy') === format(props.currentTime, 'dMy')
      ? 'text-blue-500'
      : '';

  return (
    <Dialog.CloseButton asChild>
      <As
        class={`w-[35px] h-[35px] flex justify-center items-center ${style()}`}
        component='button'
        onclick={() =>
          navigate(`/app/kalendar?datum=${format(props.date, urlQueryFormat)}`)
        }
      >
        {format(props.date, 'd')}
      </As>
    </Dialog.CloseButton>
  );
}
