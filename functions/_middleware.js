// 301-redirect the Cloudflare-assigned *.pages.dev URL to the canonical custom
// domain so we don't have two indexable copies of the same content (SEO duplicate-
// content problem).
//
// Preview/branch deployments (e.g. <hash>.wibe-ecg.pages.dev) are NOT redirected,
// so we can still test before promoting to production.

const CANONICAL_HOST = 'wibeglobal.com';
const PAGES_HOST = 'wibe-ecg.pages.dev';

export const onRequest = async ({ request, next }) => {
  const url = new URL(request.url);

  if (url.hostname === PAGES_HOST) {
    const target = `https://${CANONICAL_HOST}${url.pathname}${url.search}`;
    return Response.redirect(target, 301);
  }

  return next();
};
