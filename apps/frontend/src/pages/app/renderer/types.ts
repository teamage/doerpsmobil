import { Component } from 'solid-js';
import type {
  PageContextBuiltInServer,
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient,
} from 'vite-plugin-ssr/types';

type Page = Component<PageProps>;

export type PageProps = object;

type PageContextCustom = {
  pageProps?: PageProps;
  exports: {
    title: string;
    description?: string;
    admin?: boolean;
  };
};

export type PageContextServer = PageContextBuiltInServer<Page> &
  PageContextCustom;
export type PageContextClient = PageContextBuiltInClient<Page> &
  PageContextCustom;

export type PageContext = PageContextClient | PageContextServer;

export type User = {
  isAdmin?: boolean;
  email: string;
  fullName: string;
};
