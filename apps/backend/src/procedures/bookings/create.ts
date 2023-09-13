import { bookings } from '@/db/booking';
import { isUser } from '@/middleware';
import { procedure } from '@/trpc';
import { z } from 'zod';

export const create = procedure
  .input(
    z.object({
      from: z.string(),
      to: z.string(),
      isAdminBooking: z.boolean(),
    }),
  )
  .use(isUser)
  .mutation(async ({ ctx, input }) => {
    try {
      await bookings.add({
        uid: ctx.user.uid,
        from: input.from,
        to: input.to,
        isAdminBooking: input.isAdminBooking,
        createdAt: new Date().toString(),
      });
      return 'ok';
    } catch (e) {
      console.log(e);
      return 'caught error serverside';
    }
  });
