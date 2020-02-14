// https://github.com/Microsoft/TypeScript/issues/14877#issuecomment-340279293
// @ts-ignore
import {} from '.';
declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', () => {
  console.log('sw installing...');
});

self.addEventListener('activate', () => {
  console.log('sw now ready to handle fetches!');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  const isSameOrigin = url.origin == location.origin;
  const toPostEndpoint = url.pathname === '/post/';
  const isPost = event.request.method === 'POST';

  if (isSameOrigin && toPostEndpoint && isPost) {
    // using "await" didn't work as expected
    // https://stackoverflow.com/questions/46838778/service-worker-error-event-already-responded-to

    // output would be in following order:
    // "before respondWith"
    // "after respondWith"
    // "create response"
    const res = event.request
      .formData()
      .then(formData => formData.get('html') as string)
      .then(encodedHTML => decodeURI(encodedHTML))
      .then(decodedHTML => {
        // console.log('create response');
        return new Response(decodedHTML, {
          headers: { 'content-type': 'text/html; charset=UTF-8' },
        });
      })
      .catch(e => {
        console.error(e);
        return fetch('/');
      });

    // console.log('before respondWith');
    event.respondWith(res);
    // console.log('after respondWith');
  }
});
