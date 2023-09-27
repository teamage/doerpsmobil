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

export async function getBookings(dates: Date[]) {
  try {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
    const r = getRandomInt(0, 7);
    return dates.map((_, i) => {
      if (i === r) return [{ start: 3, end: 5, from: 'from', to: 'to' }];
      return [];
    });
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

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
