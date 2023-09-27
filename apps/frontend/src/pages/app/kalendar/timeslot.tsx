import { Show } from 'solid-js';

export function TimeSlot(props: { index: number }) {
  const s = props.index < 10 ? `0${props.index}` : `${props.index}`;
  return (
    <div class='flex'>
      <div class='text-xs pr-2 grow flex justify-end items-center -translate-y-[25px]'>
        <Show when={props.index > 0}>{`${s}:00`}</Show>
      </div>
      <div class='basis-[10px] border-b'></div>
    </div>
  );
}
