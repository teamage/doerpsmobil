import { format, gridArea } from '#/util';

export function Slot(props: {
  date: Date;
  dayIndex: number;
  timeIndex: number;
}) {
  return (
    <div
      onClick={() => console.log(format(props.date, 'd H'))}
      style={{
        'grid-area': gridArea(
          props.timeIndex + 1,
          props.dayIndex + 2,
          props.timeIndex + 1,
          props.dayIndex + 2,
        ),
      }}
      class='border-l border-b cursor-pointer hover:bg-neutral-900'
    ></div>
  );
}
