import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';

import type { PageContext } from '#/pages/app/renderer/types';
import { PageContextProvider } from '#/pages/app/renderer/use-page-context';

import '#/styles/globals.css';

export function RootPage(props: { pageContext: Store<PageContext> }) {
  return (
    <PageContextProvider pageContext={props.pageContext}>
      <div class='w-screen h-screen flex flex-col'>
        <Dynamic
          component={props.pageContext.Page}
          {...(props.pageContext.pageProps ?? {})}
        />
      </div>
    </PageContextProvider>
  );
}
