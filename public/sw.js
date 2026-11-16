const CACHE_NAME = 'medquiz-v2';
const BASE_PATH = '/MedQuiz';

const PRECACHE_URLS = [
  `${BASE_PATH}/`,
  `${BASE_PATH}/manifest.webmanifest`,
  `${BASE_PATH}/assets/images/icon.png`,
  `${BASE_PATH}/assets/images/favicon.png`,
];

// Install: pre-cache shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate: clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Fetch: stale-while-revalidate for static assets, network-only for API
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET, cross-origin, and API requests
  if (
    request.method !== 'GET' ||
    url.origin !== self.location.origin ||
    url.pathname.startsWith(`${BASE_PATH}/api/`)
  ) {
    return;
  }

  // For JS/CSS bundles and static assets: cache-first
  if (
    url.pathname.startsWith(`${BASE_PATH}/_expo/`) ||
    url.pathname.startsWith(`${BASE_PATH}/assets/`) ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.webmanifest')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const network = fetch(request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        });
        return cached || network;
      })
    );
    return;
  }

  // For HTML navigation: network-first, fall back to cached '/'
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
        }
        return response;
      })
      .catch(() => caches.match(`${BASE_PATH}/`) || caches.match(request))
  );
});
