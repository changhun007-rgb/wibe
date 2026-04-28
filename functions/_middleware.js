// 1. 301-redirect the Cloudflare-assigned *.pages.dev URL to the canonical custom
//    domain so search engines don't index two copies of the same site.
//    Preview/branch deployments (e.g. <hash>.wibe-ecg.pages.dev) are NOT redirected.
//
// 2. SPA fallback: client-side routes like /privacy aren't real files, so the
//    static asset handler 404s on them. Serve index.html instead and let React
//    render the correct component based on window.location.pathname.

const CANONICAL_HOST = 'wibeglobal.com';
const PAGES_HOST = 'wibe-ecg.pages.dev';

// Add new client-side routes here when introducing new pages.
const SPA_ROUTES = new Set(['/privacy', '/privacy/']);

export const onRequest = async ({ request, next, env }) => {
  const url = new URL(request.url);

  if (url.hostname === PAGES_HOST) {
    const target = `https://${CANONICAL_HOST}${url.pathname}${url.search}`;
    return Response.redirect(target, 301);
  }

  if (SPA_ROUTES.has(url.pathname)) {
    // Serve the SPA's index.html so React boots and main.jsx can route by pathname.
    return env.ASSETS.fetch(new URL('/', request.url));
  }

  return next();
};
