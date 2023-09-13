import { create } from '@/procedures/bookings/create';
import { list } from '@/procedures/bookings/list';
import { router } from '@/trpc';

export const appRouter = router({
  bookings: router({
    create,
    list,
  }),
});
