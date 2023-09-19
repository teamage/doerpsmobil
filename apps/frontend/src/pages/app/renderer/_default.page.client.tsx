import { hydrate, render as solidRender } from 'solid-js/web';
import { RootPage } from '#/pages/app/renderer/root-page';

import type { PageContextClient as PageContextClient } from '#/pages/app/renderer/types';
import { createStore, reconcile } from 'solid-js/store';

let dispose: () => void;
let rendered = false;

const [pageContextStore, setPageContext] = createStore<PageContextClient>(
  {} as PageContextClient,
);

export async function render(pageContext: PageContextClient) {
  pageContext = removeUnmergableInternals(pageContext);

  document.title = pageContext.exports.title;

  if (!rendered) {
    // Dispose to prevent duplicate pages when navigating.
    if (dispose) dispose();

    setPageContext(pageContext);

    const container = document.getElementById('root')!;

    if (pageContext.isHydration) {
      dispose = hydrate(
        () => <RootPage pageContext={pageContextStore} />,
        container,
      );
    } else {
      dispose = solidRender(
        () => <RootPage pageContext={pageContextStore} />,
        container,
      );
    }

    rendered = true;
  } else {
    setPageContext(reconcile(pageContext));
  }
}

export const clientRouting = true;

// from vite-plugin-ssr author:

/* eslint-disable @typescript-eslint/ban-ts-comment */
// Avoid reconcile() to throw:
// ```
// dev.js:135 Uncaught (in promise) TypeError: Cannot assign to read only property 'Page' of object '[object Module]'
//   at setProperty (dev.js:135:70)
//   at applyState (dev.js:320:5)
// ```
// TODO/v1-release: remove workaround since _pageFilesAll and _pageFilesLoaded aren't used by the V1 design
function removeUnmergableInternals<T>(pageContext: T): T {
  // Remove pageContext properties that cannot be reassigned by reconcile()
  const pageContextFixed = { ...pageContext };
  // @ts-ignore
  delete pageContextFixed._pageFilesAll;
  // @ts-ignore
  delete pageContextFixed._pageFilesLoaded;
  return pageContextFixed;
}
