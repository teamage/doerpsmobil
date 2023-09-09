import { ArrowLeft, ArrowRight, Calendar, CaretDown } from '#/components/icons';
import { useCounter } from '#/context/use-counter';
import { navigate } from 'vite-plugin-ssr/client/router';

export function Toolbar() {
  const counter = useCounter()[0];

  const previous = () => {
    navigate(`/app/kalendar?counter=${counter() - 1}`);
  };

  function next() {
    navigate(`/app/kalendar?counter=${counter() + 1}`);
  }

  function today() {
    navigate(`/app/kalendar?counter=0`);
  }

  return (
    <div class='grow flex gap-6'>
      <button class='hidden sm:block' onClick={today}>
        today
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
        23. August
        <CaretDown class='w-5 h-5' />
      </button>
    </div>
  );
}
