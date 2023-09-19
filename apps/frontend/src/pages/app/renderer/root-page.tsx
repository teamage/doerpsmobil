import type { Store } from 'solid-js/store';
import { Dynamic } from 'solid-js/web';
import { Match, Switch, createSignal } from 'solid-js';

import { onAuthStateChanged } from 'firebase/auth';

import type { User, PageContext } from '#/pages/app/renderer/types';
import { PageContextProvider } from '#/pages/app/renderer/use-page-context';
import { AppHeader } from '#/components/app-header';
import { auth } from '#/firebase';
import { UserProvider } from '#/context/use-user';
import { SignInScreen } from '#/components/sign-in-screen';
import { UnauthorizedScreen } from '#/components/unauthorized-screen';

import '#/styles/globals.css';
import { AppContextProvider } from '#/context/use-active-date';

// make sure admin is exported from every page
// maybe type user role
// maybe should wait till page hydrated, then register onAuthStateChanged
// need to test role granting
// ping server already while doing auth (warmup)

type AppState = 'LOADING' | 'UNAUTHENTICATED' | 'AUTHORIZED' | 'UNAUTHORIZED';

export function RootPage(props: { pageContext: Store<PageContext> }) {
  let user: User | null;
  const [appState, setAppState] = createSignal<AppState>('LOADING');

  onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser) {
      const idTokenResult = await fbUser.getIdTokenResult();
      const role = idTokenResult.claims['role'] as string;
      user = {
        email: fbUser.email!,
        isAdmin: role === 'admin',
        fullName: fbUser.displayName!,
      };

      if (props.pageContext.exports.admin) {
        if (user.isAdmin) {
          setAppState('AUTHORIZED');
        } else {
          setAppState('UNAUTHORIZED');
        }
      } else {
        setAppState('AUTHORIZED');
      }
    } else {
      setAppState('UNAUTHENTICATED');
    }
  });

  return (
    <Switch>
      <Match when={appState() === 'UNAUTHENTICATED'}>
        <SignInScreen />
      </Match>
      <Match when={appState() === 'LOADING'}>... loading</Match>
      <Match when={appState() === 'UNAUTHORIZED'}>
        <UnauthorizedScreen />
      </Match>
      <Match when={appState() === 'AUTHORIZED'}>
        <PageContextProvider pageContext={props.pageContext}>
          <AppContextProvider pageContext={props.pageContext}>
            <UserProvider user={user!}>
              <div class='w-screen h-screen flex flex-col'>
                <AppHeader />
                <Dynamic
                  component={props.pageContext.Page}
                  {...(props.pageContext.pageProps ?? {})}
                />
              </div>
            </UserProvider>
          </AppContextProvider>
        </PageContextProvider>
      </Match>
    </Switch>
  );
}
