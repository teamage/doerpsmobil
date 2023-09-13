import { middleware } from '@/trpc';
import { TRPCError } from '@trpc/server';

export const isAdmin = middleware(async ({ ctx, next }) => {
  if (!ctx.user || !ctx.user.isAdmin)
    throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const isUser = middleware(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: 'UNAUTHORIZED' });

  return next({
    ctx: {
      user: ctx.user,
    },
  });
});
