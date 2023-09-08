import type { JSX } from 'solid-js';
import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';

import type { PageContext } from './types';
import { Link } from './Link';
import { PageContextProvider, usePageContext } from './usePageContext';

import '../styles/globals.css';

export function PageLayout(props: { pageContext: Store<PageContext> }) {
  console.log('render PageLayout');

  return (
    <PageContextProvider pageContext={props.pageContext}>
      <Layout>
        <div class='basis-[250px] shrink-0 flex flex-col pl-4'>
          <Link href='/'>Home</Link>
          <Link href='/about'>About</Link>
        </div>

        <Page />
      </Layout>
    </PageContextProvider>
  );
}

function Page() {
  const pageContext = usePageContext();

  return (
    <Dynamic component={pageContext.Page} {...(pageContext.pageProps ?? {})} />
  );
}

function Layout(props: { children: JSX.Element }) {
  return <div class='w-screen h-screen flex'>{props.children}</div>;
}
