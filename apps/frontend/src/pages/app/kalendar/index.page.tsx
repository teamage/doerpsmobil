import { For, Show, createResource, createSignal, onCleanup } from 'solid-js';

import { format } from 'date-fns';
import de from 'date-fns/locale/de';

import { getBookings } from '#/data';
import { toBerlinDate } from '#/util';
import { useAppContext } from '#/context/use-active-date';

export function Page() {
  const appContext = useAppContext();

  const [currentTime, setCurrentTime] = createSignal(toBerlinDate(new Date()));

  const timer = setInterval(() => {
    setCurrentTime(toBerlinDate(new Date()));
  }, 1000);

  onCleanup(() => clearInterval(timer));

  const [data] = createResource(() => appContext().date, getBookings);

  return (
    <div class='grow flex flex-col gap-4 justify-center items-center'>
      <span>view: {appContext().view}</span>
      <span>
        date:{' '}
        {format(appContext().date, 'EEEEEE. dd-MM-y HH:mm', {
          locale: de,
        })}
      </span>
      <span>
        Berlin Zeit:{' '}
        {format(currentTime(), 'EEEEEE. dd-MM-y HH:mm:ss', {
          locale: de,
        })}
      </span>

      <Show when={!data.loading} fallback={'...loading'}>
        <For each={data()}>
          {(booking) => <li>{new Date(booking.createdAt).toLocaleString()}</li>}
        </For>
      </Show>
    </div>
  );
}

export const title = 'Kalendar';
