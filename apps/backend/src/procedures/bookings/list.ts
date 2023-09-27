import { isUser } from '@/middleware';
import { procedure } from '@/trpc';
import { z } from 'zod';

export type Booking = {
  start: number;
  end: number;
  from: string;
  to: string;
};

export const list = procedure
  .input(z.array(z.string()))
  .use(isUser)
  .query(async (a) => {
    try {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      const r = getRandomInt(0, 7);
      const bookings: Booking[][] = a.input.map((e, i) => {
        if (i === r) return [{ start: 3, end: 5, from: 'from', to: 'to' }];
        return [];
      });
      return bookings;
    } catch (e) {
      console.log(e);
      throw e;
      // return 'caught error serverside';
    }
  });

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
