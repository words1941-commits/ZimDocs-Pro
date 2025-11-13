const CACHE_NAME = "zimdocs-pro-v5";
const OFFLINE_URL = "/ZimDocs-Pro/docs/index.html";

const FILES_TO_CACHE = [
  "/ZimDocs-Pro/docs/",
  "/ZimDocs-Pro/docs/index.html",
  "/ZimDocs-Pro/docs/manifest.json",
  "/ZimDocs-Pro/docs/css/style.css",
  "/ZimDocs-Pro/docs/js/app.js",
  "/ZimDocs-Pro/docs/assets/icons/icon-192x192.png",
  "/ZimDocs-Pro/docs/assets/icons/icon-384x384.png",
  "/ZimDocs-Pro/docs/assets/icons/icon-512x512.png",
  "/ZimDocs-Pro/docs/assets/screenshot1.png",
  "/ZimDocs-Pro/docs/assets/screenshot2.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => 
    Promise.all(keys.map(key => key !== CACHE_NAME && caches.delete(key)))
  ));
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).catch(() => caches.match(OFFLINE_URL)))
  );
});
