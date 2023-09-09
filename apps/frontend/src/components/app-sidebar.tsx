import { Burger } from '#/components/icons';
import { Logo } from '#/components/logo';
import { useCounter } from '#/context/use-counter';
import { usePageContext } from '#/pages/app/renderer/use-page-context';
import { As, Dialog } from '@kobalte/core';

export function Sidebar() {
  const counter = useCounter()[0];

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <As
          component='button'
          class='hover:bg-neutral-700 w-max h-max rounded-full p-2'
        >
          <Burger class='w-5 h-5' />
        </As>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay class='bg-background/80 fixed inset-0 data-[expanded]:animate-in animate-out fade-out-0 data-[expanded]:fade-in-0' />
        <Dialog.Content class='border-r fixed gap-6 px-1 py-6 flex flex-col bg-background inset-y-0 left-0 h-full w-[280px] z-50 transition ease-in-out data-[expanded]:animate-in animate-out duration-300 data-[expanded]:duration-500 slide-out-to-left data-[expanded]:slide-in-from-left'>
          <Logo class='w-auto h-16 pl-6' />
          <div class='grow overflow-auto flex flex-col px-1'>
            <div class='flex flex-col grow gap-4'>
              <MyLink href={`/app/kalendar?counter=${counter()}`}>
                Kalendar
              </MyLink>
              <div class='flex flex-col'>
                <span class='pl-6 mb-1 text-neutral-500'>Account</span>
                <MyLink href='/app/account/meine-buchungen'>
                  Meine Buchungen
                </MyLink>
                <MyLink href='/app/account/meine-daten'>Meine Daten</MyLink>
              </div>
              <div class='flex flex-col'>
                <span class='pl-6 mb-1 text-neutral-500'>Admin</span>
                <MyLink href='/app/admin/buchungsverwaltung'>
                  Buchungsverwaltung
                </MyLink>
                <MyLink href='/app/admin/nutzerverwaltung'>
                  Nutzerverwaltung
                </MyLink>
                <MyLink href='/app/admin/statistiken'>Statistiken</MyLink>
              </div>
            </div>
            <div class='flex flex-col items-center'>
              <span>Karen Hansen</span>
              <span>Admin</span>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function MyLink(props: { href: string; children: string }) {
  const pageContext = usePageContext();

  return (
    <Dialog.CloseButton asChild>
      <As
        class='text-left py-1 pl-6 rounded-sm hover:bg-neutral-600'
        component='a'
        href={props.href}
        classList={{
          'bg-neutral-600':
            pageContext.urlPathname === props.href.split('?')[0],
        }}
      >
        {props.children}
      </As>
    </Dialog.CloseButton>
  );
}
