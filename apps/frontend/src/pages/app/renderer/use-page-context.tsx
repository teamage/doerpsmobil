import { useContext, createContext, type JSX } from 'solid-js';
import { type Store } from 'solid-js/store';
import type { PageContext } from '#/pages/app/renderer/types';

const Context = createContext<Store<PageContext>>();

export function PageContextProvider(props: {
  pageContext: Store<PageContext>;
  children: JSX.Element;
}) {
  if (!props.pageContext) throw new Error('Argument pageContext missing');
  return (
    <Context.Provider value={props.pageContext}>
      {props.children}
    </Context.Provider>
  );
}

export function usePageContext() {
  const pageContext = useContext(Context);
  if (!pageContext)
    throw new Error(
      '<PageContextProvider> is needed for being able to use usePageContext()',
    );
  return pageContext;
}
