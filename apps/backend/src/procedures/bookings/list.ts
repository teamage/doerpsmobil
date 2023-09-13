import { bookings } from '@/db/booking';
import { isUser } from '@/middleware';
import { procedure } from '@/trpc';
import { z } from 'zod';

export const list = procedure
  .input(z.object({ week: z.string() }))
  .use(isUser)
  .query(async () => {
    try {
      const querySnapshot = await bookings.get();
      const docs = querySnapshot.docs;
      const books = docs.map((doc) => {
        const booking = doc.data();
        return {
          from: booking.from,
          to: booking.to,
          createdAt: booking.createdAt,
        };
      });
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      });
      return books;
    } catch (e) {
      console.log(e);
      throw e;
      // return 'caught error serverside';
    }
  });
