import { createEffect, createResource } from 'solid-js';
import { usePageContext } from '#/pages/app/renderer/use-page-context';
import { fetcher } from '#/data';
import { useCounter } from '#/context/use-counter';

export function Page() {
  const pageContext = usePageContext();
  const setCounter = useCounter()[1];

  const urlCounter = () => {
    const v = pageContext.urlParsed.search['counter'];
    if (v) return v;
    window.history.replaceState({}, '', '/app/kalendar?counter=0');
    return '0';
  };

  const [data] = createResource<string, string>(urlCounter, fetcher);

  createEffect(() => {
    console.log('effect');

    setCounter(parseInt(urlCounter()));
  });

  console.log('render Home');

  return (
    <div class='grow flex flex-col gap-4 justify-center items-center'>
      <span>data for {urlCounter()} :</span>
      <span class='w-[200px] h-5'>{data.loading ? 'loading' : data()}</span>
    </div>
  );
}

export const title = 'Kalendar';
