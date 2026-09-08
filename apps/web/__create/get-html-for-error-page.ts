import { serializeError } from 'serialize-error';

export const getHTMLForErrorPage = (err: unknown): string => {
  const error = serializeError(err);
  return `
<html>
  <head>
    <title>App Error</title>
    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: #18191B;
        color: #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        margin: 0;
        padding: 24px;
      }
      .card {
        max-width: 480px;
        width: 100%;
        background: #18191B;
        border: 1px solid #414243;
        border-radius: 8px;
        padding: 24px;
      }
      h1 {
        font-size: 16px;
        font-weight: 500;
        margin: 0 0 8px;
      }
      pre {
        font-size: 12px;
        color: #959697;
        white-space: pre-wrap;
        word-break: break-word;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>App Error Detected</h1>
      <pre>${JSON.stringify(error, null, 2)}</pre>
    </div>
    <script>
      const $pre = document.querySelector('pre');
      if ($pre) {
        const text = $pre.textContent;
        try {
          const parsed = JSON.parse(text);
          console.error('App error:', parsed);
        } catch {}
      }
    </script>
  </body>
</html>
    `;
};