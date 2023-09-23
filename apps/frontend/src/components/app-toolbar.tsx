import { ArrowLeft, ArrowRight, Calendar, CaretDown } from '#/components/icons';
import { useAppContext } from '#/context/use-app-context';

import { format, toBerlinDate, urlQueryFormat } from '#/util';
import { endOfWeek, getMonth, getYear, startOfWeek } from 'date-fns';
import { addDays } from 'date-fns';

import { navigate } from 'vite-plugin-ssr/client/router';

export function Toolbar() {
  const appContext = useAppContext();
  const dayStep = appContext().view === 'Day' ? 1 : 7;

  const previous = () => {
    navigate(
      `/app/kalendar?datum=${format(
        addDays(appContext().date, -dayStep),
        urlQueryFormat,
      )}`,
    );
  };

  const next = () => {
    navigate(
      `/app/kalendar?datum=${format(
        addDays(appContext().date, dayStep),
        urlQueryFormat,
      )}`,
    );
  };

  const today = () => {
    navigate(
      `/app/kalendar?datum=${format(toBerlinDate(new Date()), urlQueryFormat)}`,
    );
  };

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

  return (
    <div class='grow flex gap-6'>
      <button class='hidden sm:block' onClick={today}>
        heute
      </button>
      <button
        class='hover:bg-neutral-700 w-max h-max rounded-full p-2 sm:hidden block'
        onClick={today}
      >
        <Calendar class='w-5 h-5' />
      </button>
      <div class='gap-2 hidden sm:flex'>
        <button
          onClick={previous}
          class='hover:bg-neutral-700 w-max h-max rounded-full p-2'
        >
          <ArrowLeft class='w-5 h-5' />
        </button>
        <button
          onClick={next}
          class='hover:bg-neutral-700 w-max h-max rounded-full p-2'
        >
          <ArrowRight class='w-5 h-5' />
        </button>
      </div>
      <button class='flex gap-1 items-center'>
        {monthText()}
        <CaretDown class='w-5 h-5' />
      </button>
    </div>
  );
}
