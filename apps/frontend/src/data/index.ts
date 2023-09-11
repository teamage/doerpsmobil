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
    }),
  ],
});

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export async function fetcher(arg: string) {
  const token = await auth.currentUser!.getIdToken();
  console.log(arg);

  try {
    const res = await trpc.userById.mutate(token);
    return res as string;
  } catch (cause) {
    if (isTRPCClientError(cause)) {
      console.log('isTRPCClientError');
      console.log('cause: ', cause);
    } else {
      console.log('no trpc error');
    }

    return 'errrroooorrr';
  }
}
