const toCache = [
  '/',
  '/index.html',
  '/android-chrome-96x96.png',
  '/apple-touch-icon.png',
  '/browserconfig.xml',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/favicon.png',
  '/mstile-150x150.png',
  '/safari-pinned-tab.svg',
  '/icon-192x192.png',
  '/icon-256x256.png',
  '/icon-384x384.png',
  '/icon-512x512.png',
  '/code.js',
  '/style.css',
  '/style2.css',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(toCache);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) return response;
        else return fetch(event.request);
      }),
  )
});
