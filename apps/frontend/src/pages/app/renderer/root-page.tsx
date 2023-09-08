import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';

import type { PageContext } from '#/pages/app/renderer/types';
import { Link } from '#/pages/app/renderer/link';
import { PageContextProvider } from '#/pages/app/renderer/use-page-context';

import '#/styles/globals.css';

export function RootPage(props: { pageContext: Store<PageContext> }) {
  console.log('render RootPage');

  return (
    <PageContextProvider pageContext={props.pageContext}>
      <div class='w-screen h-screen flex flex-col'>
        <div class='basis-[100px] shrink-0 flex flex-col pl-4 border-b'>
          <Link href='/app'>Home</Link>
          <Link href='/app/about'>About</Link>
        </div>
        <Dynamic
          component={props.pageContext.Page}
          {...(props.pageContext.pageProps ?? {})}
        />
      </div>
    </PageContextProvider>
  );
}
