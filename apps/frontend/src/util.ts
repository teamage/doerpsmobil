import { utcToZonedTime } from 'date-fns-tz';

export function toBerlinDate(date: Date) {
  return utcToZonedTime(date, 'Europe/Berlin');
}
