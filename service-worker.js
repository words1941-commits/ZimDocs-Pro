// ZimDocs Pro - Service Worker
const CACHE_NAME = "zimdocs-pro-v1";
const OFFLINE_URL = "./index.html";

const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/styles.css",
  "./js/app.js",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/favicon.svg",
  "./icons/maskable.png",
  "./icons/screenshot1.png",
  "./icons/screenshot2.png",
];

// Install Service Worker and cache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching ZimDocs Pro files...");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((oldCache) => caches.delete(oldCache))
      )
    )
  );
  self.clients.claim();
});

// Fetch handler — serve from cache, then network fallback
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests (like POST uploads)
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(request)
        .then((response) => {
          // Cache new files dynamically
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, response.clone());
            return response;
          });
        })
        .catch(() => caches.match(OFFLINE_URL));
    })
  );
});
