import type { JSX, Component } from 'solid-js';
import { Link } from './Link';

import { PageContextProvider, usePageContext } from './usePageContext';
import type { PageContext } from './types';
import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';

import '../globals.css';

export { PageLayout };

interface Props {
  pageContext: Store<PageContext>;
}
interface Children {
  children: JSX.Element;
}

const PageLayout: Component<Props> = (props) => {
  console.log('render layout');

  return (
    <PageContextProvider pageContext={props.pageContext}>
      <Layout>
        <Sidebar>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </Sidebar>
        <Content>
          <Page />
        </Content>
      </Layout>
    </PageContextProvider>
  );
};

function Page() {
  const pageContext = usePageContext();
  console.log('render page');

  return (
    <>
      <Dynamic
        component={pageContext.Page}
        {...(pageContext.pageProps ?? {})}
      />
    </>
  );
}

const Layout: Component<Children> = (props) => {
  return (
    <div
      style={{
        display: 'flex',
        'max-width': '900px',
        margin: 'auto',
      }}
    >
      {props.children}
    </div>
  );
};

const Sidebar: Component<Children> = (props) => {
  return (
    <div
      class="bg-green-500"
      style={{
        padding: '20px',
        'flex-shrink': 0,
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'line-height': '1.8em',
      }}
    >
      {props.children}
    </div>
  );
};

const Content: Component<Children> = (props) => {
  return (
    <div
      style={{
        padding: '20px',
        'padding-bottom': '50px',
        'border-left': '2px solid #eee',
        'min-height': '100vh',
      }}
    >
      {props.children}
    </div>
  );
};
