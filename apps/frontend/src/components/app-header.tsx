import { Sidebar } from '#/components/app-sidebar';
import { Toolbar } from '#/components/app-toolbar';
import { usePageContext } from '#/pages/app/renderer/use-page-context';
import { Show } from 'solid-js';

export function AppHeader() {
  const pageContext = usePageContext();

  return (
    <div class='basis-[100px] shrink-0 flex px-4 border-b gap-4 items-center'>
      <div class='flex gap-4 items-center'>
        <Sidebar />
        <a class='sm:hidden block' rel='external' href='/'>
          <img width={20} height={'auto'} src='/logo-icon.svg' />
        </a>

        <a class='w-[160px] hidden sm:block' rel='external' href='/'>
          <img src={'/logo.png'} alt='logo' />
        </a>
      </div>

      <Show
        when={pageContext.urlPathname === '/app/kalendar'}
        fallback={<h1 class='grow'>{pageContext.exports.title}</h1>}
      >
        <Toolbar />
      </Show>

      <div>ende</div>
    </div>
  );
}
