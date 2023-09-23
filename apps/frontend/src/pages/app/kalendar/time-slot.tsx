import { format } from '#/util';
import { Show } from 'solid-js';

export function TimeSlot(props: { time: Date }) {
  const d = format(props.time, 'HH:mm');
  return (
    <div class='basis-[50px] flex shrink-0'>
      <Show when={d !== '24:00'}>
        <div class='text-xs pr-2 grow flex justify-end items-center translate-y-[24px]'>
          {d}
        </div>
      </Show>
      <div class='basis-[10px] border-b'></div>
    </div>
  );
}
