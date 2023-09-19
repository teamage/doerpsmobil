import { ArrowLeft, ArrowRight, Calendar, CaretDown } from '#/components/icons';
import { useAppContext } from '#/context/use-active-date';

import { toBerlinDate } from '#/util';
import { format } from 'date-fns';
import { addDays } from 'date-fns';
import { de } from 'date-fns/locale';
import { navigate } from 'vite-plugin-ssr/client/router';

export function Toolbar() {
  const appContext = useAppContext();

  const previous = () => {
    const n = appContext().view === 'Day' ? 1 : 7;
    navigate(
      `/app/kalendar?woche=${format(
        addDays(appContext().date, -n),
        'dd-MM-y',
      )}`,
    );
  };

  const next = () => {
    const n = appContext().view === 'Day' ? 1 : 7;
    navigate(
      `/app/kalendar?woche=${format(addDays(appContext().date, n), 'dd-MM-y')}`,
    );
  };

  const today = () => {
    navigate(
      `/app/kalendar?woche=${format(toBerlinDate(new Date()), 'dd-MM-y')}`,
    );
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
        {format(appContext().date, 'MMMM', { locale: de })}
        <CaretDown class='w-5 h-5' />
      </button>
    </div>
  );
}
