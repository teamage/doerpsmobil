import {
  createTRPCProxyClient,
  httpBatchLink,
  TRPCClientError,
} from '@trpc/client';
import type { AppRouter } from '../../../backend/src';

/* function decideHeader() {
  return {
    'my-header': 'my-value',
  };
} */
console.log(process.env.NODE_ENV);

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url:
        process.env.NODE_ENV === 'development'
          ? 'http://127.0.0.1:5001/doerpsmobil-65d16/europe-west3/api/api'
          : '/api',
      /*   headers: decideHeader, */
    }),
  ],
});

export function isTRPCClientError(
  cause: unknown,
): cause is TRPCClientError<AppRouter> {
  return cause instanceof TRPCClientError;
}

export async function fetcher(arg: string) {
  console.log('call fetch ', arg);

  try {
    const res = await trpc.userById.mutate(arg);
    return res;
  } catch (cause) {
    if (isTRPCClientError(cause)) {
      // `cause` is now typed as your router's `TRPCClientError`
      console.log('data', cause);
    }
    return 'errrroooorrr';
  }
}
