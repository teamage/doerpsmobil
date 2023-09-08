import { createEffect, createResource } from 'solid-js';
import { navigate } from 'vite-plugin-ssr/client/router';
import { usePageContext } from '../renderer/usePageContext';
import { fetcher } from '../data';

function previous() {
  const currentCounter = getWeekFromSearchParams();
  navigate(`/?counter=${currentCounter - 1}`);
}

function next() {
  const currentCounter = getWeekFromSearchParams();
  navigate(`/?counter=${currentCounter + 1}`);
}

function today() {
  navigate(`/?counter=0`);
}

export function Page() {
  const pageContext = usePageContext();

  console.log('render Home');

  const [data] = createResource<string, string>(
    () => pageContext.urlParsed.search['counter'],
    fetcher,
  );

  createEffect(() => {
    /* console.log(data.loading); */
  });

  return (
    <div class='grow flex flex-col gap-4 justify-center items-center'>
      <h1>Home</h1>
      <span>data for {pageContext.urlParsed.search['counter']} :</span>
      <span class='w-[200px] h-5'>{data.loading ? 'loading' : data()}</span>
      <div class='flex gap-4'>
        <button onClick={previous}>prev</button>
        <button onClick={today}>today</button>
        <button onClick={next}>next</button>
      </div>
    </div>
  );
}

function getWeekFromSearchParams() {
  return parseInt(new URLSearchParams(window.location.search).get('counter')!);
}

export const title = 'Home';
