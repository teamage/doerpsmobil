import * as functionsv2 from 'firebase-functions/v2';
import express from 'express';
import { createExpressMiddleware } from '@trpc/server/adapters/express';

import { createContext } from '@/context';
import { appRouter } from '@/router';

const app = express();
app.use(
  '/api',
  createExpressMiddleware({
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
