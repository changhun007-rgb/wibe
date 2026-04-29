// Facebook domain verification file. Served as a Pages Function instead of a
// static .html so Cloudflare's auto-redirect-strip-extension behavior doesn't
// 308 the request to a no-extension path before Facebook sees the content.
//
// Facebook fetches https://wibeglobal.com/223kfftjdyga5em0z01a3ayo3qwzxa.html
// and expects a 200 response whose body equals the token.

export const onRequest = () =>
  new Response('223kfftjdyga5em0z01a3ayo3qwzxa', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
