import { usePageContext } from '#/pages/app/renderer/use-page-context';

export function Link(props: { href: string; children: string }) {
  const pageContext = usePageContext();

  console.log('render link');

  return (
    <a
      href={props.href}
      classList={{ 'text-blue-500': pageContext.urlPathname === props.href }}
    >
      {props.children}
    </a>
  );
}
