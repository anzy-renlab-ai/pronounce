// Pronounce service worker — offline cache for the static shell + audio.
const CACHE_NAME = 'pronounce-v1';
const SHELL = [
  '/',
  '/browse.html',
  '/style.css',
  '/script.js',
  '/manifest.webmanifest',
  '/og.png',
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Cache-first for static assets + audio (immutable per word).
  if (
    SHELL.includes(url.pathname) ||
    url.pathname.startsWith('/audio/') ||
    url.pathname.startsWith('/og/') ||
    url.pathname.startsWith('/word/') ||
    url.pathname.startsWith('/embed/')
  ) {
    e.respondWith(
      caches.match(e.request).then(
        (cached) =>
          cached ||
          fetch(e.request).then((res) => {
            // Don't cache opaque or error responses
            if (!res || res.status !== 200) return res;
            const copy = res.clone();
            caches.open(CACHE_NAME).then((c) => c.put(e.request, copy));
            return res;
          }).catch(() => cached)
      )
    );
    return;
  }
  // Network-first for everything else.
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
