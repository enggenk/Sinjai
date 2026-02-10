const CACHE_NAME = 'sinjai-timer-v1';

const STATIC_ASSETS = [
  './manifest.json',
  'https://enggenk.github.io/Sinjai/logo-512.png',
  'https://actions.google.com/sounds/v1/alarms/beep_short.ogg',
  'https://actions.google.com/sounds/v1/alarms/digital_alarm_clock.ogg',
  'https://enggenk.github.io/Sinjai/qris (1).jpg'
];

// INSTALL: cache aset statis SAJA
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// ACTIVATE: bersihkan cache lama
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = req.url;

  // ❌ JANGAN SENTUH FIREBASE
  if (url.includes('firebase') || url.includes('googleapis')) {
    return;
  }

  // 🌐 HTML → NETWORK FIRST
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(res => res)
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // 🧊 ASET → CACHE FIRST
  event.respondWith(
    caches.match(req).then(cached => {
      return cached || fetch(req);
    })
  );
});
