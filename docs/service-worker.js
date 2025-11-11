const CACHE_NAME = 'zimdocs-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/static/css/ui.css',
  '/static/js/main.js',
  '/manifest.json'
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => {
      if(k !== CACHE_NAME) return caches.delete(k);
    })))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (evt) => {
  if(evt.request.method !== 'GET') return;
  evt.respondWith(
    caches.match(evt.request).then(resp => {
      return resp || fetch(evt.request).then(r => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(evt.request, r.clone());
          return r;
        });
      }).catch(()=> caches.match('/index.html'));
    })
  );
});