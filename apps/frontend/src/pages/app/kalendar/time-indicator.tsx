import { gridArea } from '#/util';
import { getMinutes } from 'date-fns';

export function TimeIndicator(props: {
  row: number;
  col: number;
  currentTime: Date;
}) {
  return (
    <div
      class='pointer-events-none relative'
      style={{
        'grid-area': gridArea(props.row, props.col, props.row, props.col),
        top: (100 / 60) * getMinutes(props.currentTime) + '%',
      }}
    >
      <div class='bg-red-500 w-full h-[2px] absolute'></div>
    </div>
  );
}
