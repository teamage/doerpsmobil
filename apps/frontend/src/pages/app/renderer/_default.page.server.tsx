import { RootPage } from '#/pages/app/renderer/root-page';
import { PageContextServer } from '#/pages/app/renderer/types';
import { generateHydrationScript, renderToStream } from 'solid-js/web';
import {
  dangerouslySkipEscape,
  escapeInject,
  stampPipe,
} from 'vite-plugin-ssr/server';

export async function render(pageContext: PageContextServer) {
  const { pipe } = renderToStream(() => <RootPage pageContext={pageContext} />);
  stampPipe(pipe, 'node-stream');

  return escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <script>
          if(window.matchMedia('(prefers-color-scheme: dark)').matches)
            window.document.documentElement.classList.add('dark'); 
        </script>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
        <link rel="icon" href="/logo-icon.svg" type="image/svg+xml"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${pageContext.exports.title}</title>
        ${dangerouslySkipEscape(generateHydrationScript())}
      </head> 
      <body>
        <div id="root">${pipe}</div>
      </body>
    </html>`;
}
