import { utcToZonedTime } from 'date-fns-tz';
import { format as fnsFormat } from 'date-fns';
import { de } from 'date-fns/locale';

export function toBerlinDate(date: Date) {
  return utcToZonedTime(date, 'Europe/Berlin');
}

export function format(date: Date, str: string) {
  return fnsFormat(date, str, { locale: de });
}

export function gridArea(a: number, b: number, c: number, d: number) {
  return `${a}/${b}/${c}/${d}`;
}

export const urlQueryFormat = 'dd-MM-y';
