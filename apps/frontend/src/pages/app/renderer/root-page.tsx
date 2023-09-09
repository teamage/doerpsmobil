import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';

import type { PageContext } from '#/pages/app/renderer/types';
import { PageContextProvider } from '#/pages/app/renderer/use-page-context';

import '#/styles/globals.css';
import { AppHeader } from '#/components/app-header';
import { CounterProvider } from '#/context/use-counter';

export function RootPage(props: { pageContext: Store<PageContext> }) {
  console.log('render RootPage');

  return (
    <PageContextProvider pageContext={props.pageContext}>
      <CounterProvider>
        <div class='w-screen h-screen flex flex-col'>
          <AppHeader />
          <Dynamic
            component={props.pageContext.Page}
            {...(props.pageContext.pageProps ?? {})}
          />
        </div>
      </CounterProvider>
    </PageContextProvider>
  );
}
