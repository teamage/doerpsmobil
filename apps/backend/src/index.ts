import * as functionsv2 from 'firebase-functions/v2';

import express from 'express';

import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({
  req,
  res,
});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const valid = z.string();

const appRouter = t.router({
  userById: t.procedure.input(valid).mutation(async (opts) => {
    const { input } = opts;

    /*  await new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, 500),
    ); */

    console.log('received: ', input);

    return input;
    /* try {
      const { input } = opts;

      console.log('received: ', input);

      return 'data';
    } catch (e) {
      return 'error';
    } */
  }),
});

const app = express();

app.use(
  '/api',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export type AppRouter = typeof appRouter;

export const api = functionsv2.https.onRequest(
  {
    region: 'europe-west3',
    maxInstances: 1,
    concurrency: 1,
    memory: '128MiB',
    timeoutSeconds: 10,
  },
  app,
);

/* 
export const authTrigger: functions.CloudFunction<functions.auth.UserRecord> =
  functions
    .region('europe-west3')
    .runWith({ memory: '128MB', maxInstances: 1 })
    .auth.user()
    .onCreate((user) => {
      functions.logger.log(`Welcome `, user.email!);
      return null;
    });
 */
