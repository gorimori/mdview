// https://github.com/Microsoft/TypeScript/issues/14877#issuecomment-340279293
// @ts-ignore
import {} from '.';
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', event => {
  console.log('sw installing...');
});

self.addEventListener('activate', event => {
  console.log('sw now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  const isSameOrigin = url.origin == location.origin;
  const toPostEndpoint = url.pathname === '/post/';
  const isPost = event.request.method === 'POST';

  // TODO: respond with generated HTML
  if (isSameOrigin && toPostEndpoint && isPost) {
    console.log('POST to /post/!');
    event.respondWith(fetch('/'));
  }
});
