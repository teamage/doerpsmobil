import { format } from '#/util';
import { Show } from 'solid-js';

type Props = {
  bool: boolean;
  currentTime: Date;
  date: Date;
};

export function Slot(props: Props) {
  const isNow = () =>
    format(props.currentTime, 'dMyH') === format(props.date, 'dMyH');

  const onSelect = () => {
    console.log(format(props.date, 'd MMM y HH'));
  };

  return (
    <Show
      when={props.bool}
      fallback={
        <div
          onClick={onSelect}
          class={`relative flex basis-[50px] shrink-0 border-b border-l`}
        >
          <Show when={isNow()}>
            <div class='bg-green-500 absolute w-[20px] h-[20px]'></div>
          </Show>
          {/* <button class='grow p-1 bg-clip-content text-sm hover:bg-slate-800'></button> */}
        </div>
      }
    >
      <div onClick={onSelect} class={`relative flex basis-[50px] shrink-0`}>
        <div
          class={`grow bg-clip-content border-b border-l bg-orange-500 border-b-orange-500`}
        ></div>
        <div class='basis-[10px] shrink-0 border-b'></div>
      </div>
    </Show>
  );
}
