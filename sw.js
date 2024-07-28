// Service Worker File: sw.js

// Define a unique cache name
const cacheName = 'my-pwa-cache-v1';

// Files to cache
const cacheAssets = [
  '/',
  'index.html',
  'styled.css',
  'script.js',
  '/images/pic-1.png',
  '/catalogh/index.html',
  '/catalogh/script.js',
  '/catalogh/style.css',
  '/PROMOTIONS/index.html',
  '/PROMOTIONS/mixitup.min.js',
  '/PROMOTIONS/scriptall.js',
  '/PROMOTIONS/style.css',
  '/PROMOTIONS/thumbnail.png',
  '/PROMOTIONS/Animated tab/index.html',
  '/PROMOTIONS/Animated tab/script.js',
  '/PROMOTIONS/Animated tab/style.css',
  '/RECTO VERSO/index.html',
  '/RECTO VERSO/style.css',

];

// Install event
self.addEventListener('install', (e) => {
  console.log('Service Worker: Installed');

  // Cache files
  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event
self.addEventListener('activate', (e) => {
  console.log('Service Worker: Activated');

  // Remove old caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Fetching');
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
