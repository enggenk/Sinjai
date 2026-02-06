// Service Worker Minimalis untuk Syarat Instalasi PWA
const CACHE_NAME = 'sinjai-timer-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://enggenk.github.io/Sinjai/logo-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
