const CACHE_NAME = "zimdocs-pro-v5";
const OFFLINE_URL = "./index.html";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/app.js",
  "./assets/icons/icon-192x192.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      return (
        r ||
        fetch(e.request)
          .then(res => {
            if (e.request.url.startsWith("http")) {
              caches.open(CACHE_NAME).then(c => c.put(e.request, res.clone()));
            }
            return res;
          })
          .catch(() => caches.match(OFFLINE_URL))
      );
    })
  );
});
