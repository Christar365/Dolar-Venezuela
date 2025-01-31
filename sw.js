const CACHE_NAME = 'dolar-ve-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/styles.css',
  '/assets/app.js',
  '/assets/icon.png' // Agrega el icono cuando lo tengas
];

// Durante la fase de instalación, se almacena en caché los recursos estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta las solicitudes y responde con recursos de la caché si están disponibles
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // Si está en caché, responde con ello
        }
        return fetch(event.request); // Si no, realiza una solicitud de red
      })
  );
});