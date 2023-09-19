import {
  createTRPCProxyClient,
  httpBatchLink,
  TRPCClientError,
} from '@trpc/client';
import type { AppRouter } from '#backend';
import { auth } from '#/firebase';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:5001/doerpsmobil-65d16/europe-west3/api/api'
          : '/api',
      headers: async () => {
        return {
          Authorization: `Bearer ${await auth.currentUser!.getIdToken()}`,
        };
      },
    }),
  ],
});

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export async function addBooking() {
  trpc.bookings.create.mutate({
    from: 'heute',
    to: 'morgen',
    isAdminBooking: false,
  });
}

export async function getBookings(startOfWeek: Date) {
  console.log(startOfWeek);

  try {
    const res = await trpc.bookings.list.query({
      week: 'some-week',
    });

    return res;
  } catch (cause) {
    if (isTRPCClientError(cause)) {
      console.log('isTRPCClientError');
      console.log(cause.message);
      console.log(cause.data);
      console.log(cause.name);
    } else {
      console.log('no trpc error');
    }
    return [];
  }
}
