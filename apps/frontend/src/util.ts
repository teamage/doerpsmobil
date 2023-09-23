import { utcToZonedTime } from 'date-fns-tz';
import { format as fnsFormat } from 'date-fns';
import { de } from 'date-fns/locale';

export function toBerlinDate(date: Date) {
  return utcToZonedTime(date, 'Europe/Berlin');
}

export function format(date: Date, str: string) {
  return fnsFormat(date, str, { locale: de });
}

export const urlQueryFormat = 'dd-MM-y';
