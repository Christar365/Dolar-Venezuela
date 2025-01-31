const CACHE_NAME = 'dolarve-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/styles.css',
  '/assets/app.js',
  '/assets/icon.png',
  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en caché correctamente');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  console.log('Service Worker activado');
});

// Intercepción de solicitudes
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});