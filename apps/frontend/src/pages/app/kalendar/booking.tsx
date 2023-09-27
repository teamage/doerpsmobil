import { gridArea } from '#/util';
import type { Booking } from '../../../../../backend/src/procedures/bookings/list';

export function Booking(props: { dayIndex: number; booking: Booking }) {
  return (
    <div
      onClick={() => console.log('click booking')}
      class='bg-orange-500 pr-4 bg-clip-content cursor-pointer hover:bg-orange-400'
      style={{
        'grid-area': gridArea(
          props.booking.start + 1,
          props.dayIndex + 2,
          props.booking.end + 1,
          props.dayIndex + 2,
        ),
      }}
    ></div>
  );
}
