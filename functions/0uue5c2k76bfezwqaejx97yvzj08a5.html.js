// Facebook domain verification file. Served as a Pages Function so Cloudflare's
// auto-redirect-strip-extension behavior doesn't 308 the .html away before
// Facebook can read the body.

export const onRequest = () =>
  new Response('0uue5c2k76bfezwqaejx97yvzj08a5', {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
