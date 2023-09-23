import { format } from '#/util';

export function DayHeader(props: { day: Date; currentTime: Date }) {
  const style = () =>
    format(props.currentTime, 'dMy') === format(props.day, 'dMy')
      ? 'text-blue-500'
      : '';

  return (
    <div class='grow basis-full border-b border-l flex flex-col gap-2 justify-center items-center'>
      <div class={style()}>{format(props.day, 'EEEEEE')}</div>
      <div class={style()}>{format(props.day, 'd')}</div>
    </div>
  );
}
