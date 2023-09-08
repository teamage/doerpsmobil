import { escapeInject } from 'vite-plugin-ssr/server';

export const passToClient = ['pageProps', 'documentProps', 'urlParams'];

export async function render() {
  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/logo-icon.svg" type="image/svg+xml"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head> 
      <body>
        <div id="root">
          <span id="loadID">loading ...</span>
        </div>
      </body>
    </html>`;

  return {
    documentHtml,
  };
}
