import { auth } from '@/firebase';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = async ({ req }: CreateExpressContextOptions) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) return { user: undefined };

    const token = authHeader.split(' ')[1];
    const decodedIdToken = await auth.verifyIdToken(token);
    const role: string = decodedIdToken['role'];
    const isAdmin = role === 'admin';

    return {
      user: { uid: decodedIdToken.uid, isAdmin },
    };
  } catch (error) {
    return { user: undefined };
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;
