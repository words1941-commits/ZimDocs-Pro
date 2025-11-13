const CACHE_NAME = "zimdocs-pro-v4";
const OFFLINE_URL = "./index.html";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./js/app.js",
  "./assets/markable.png",
  "./assets/screenshot1.png",
  "./assets/screenshot2.png"
];

// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request)
          .then((networkResponse) => {
            if (event.request.url.startsWith("http")) {
              caches.open(CACHE_NAME).then((cache) =>
                cache.put(event.request, networkResponse.clone())
              );
            }
            return networkResponse;
          })
          .catch(() => caches.match(OFFLINE_URL))
      );
    })
  );
});

// Background sync placeholder
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-zimdocs-data") {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  const data = await self.clients.matchAll();
  console.log("Syncing offline data", data.length, "clients.");
}
