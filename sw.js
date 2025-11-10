const CACHE_NAME = 'zimdocs-v2-cache'
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/ui.css',
  '/src/main.jsx',
  '/src/App.jsx'
]

self.addEventListener('install', event => {
  self.skipWaiting()
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url)
  // Serve local assets from cache first
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached
      return fetch(event.request).then(response => {
        // Optionally cache new requests for offline use
        if (event.request.method === 'GET' && response && response.status === 200 && response.type === 'basic') {
          const copy = response.clone()
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy))
        }
        return response
      }).catch(() => {
        // fallback to offline image or index
        if (event.request.destination === 'image') {
          return caches.match('/icons/icon-192.png')
        }
        return caches.match('/index.html')
      })
    })
  )
})
