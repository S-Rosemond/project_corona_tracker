const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// Install SW
// Alternate code: avoiding for now due to Samsung
// self.addEventListener('install', async (event) => {
//   event.waitUntil(createCache());
// });

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened Cache');

      return cache.addAll(urlsToCache);
    })
  );
});

// Listen for requests

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request).then(() => {
//       return fetch(event.request).catch(() => {
//         return caches.match('offline.html');
//       });
//     })
//   );
// });

self.addEventListener('fetch', (event) => {
  event.respondWith(openCache(event));
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Functions

async function createCache() {
  const cache = await caches.open(CACHE_NAME);

  return cache.addAll(urlsToCache);
}

async function openCache(event) {
  try {
    const cachedResponse = await caches.match(event.request);

    if (cachedResponse) return cachedResponse;

    return await fetch(event.request);
  } catch (error) {
    if (error) return await caches.match('offline.html');
  }
}
