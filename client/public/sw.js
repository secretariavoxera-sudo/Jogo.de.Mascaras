const CACHE_NAME = "jogo-mascaras-v1";
const BASE_PATH = "/Jogo_de_Mascaras";

const STATIC_ASSETS = [
  BASE_PATH + "/",
  BASE_PATH + "/index.html",
  BASE_PATH + "/icon-192.png",
  BASE_PATH + "/icon-512.png",
  BASE_PATH + "/manifest.json",
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(() => {
        // Falha silenciosa se algum asset não estiver disponível
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  // Apenas interceptar pedidos GET
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request)
        .then(response => {
          if (
            !response ||
            response.status !== 200 ||
            response.type !== "basic"
          ) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Offline fallback para navegação
          if (event.request.mode === "navigate") {
            return caches.match(BASE_PATH + "/index.html");
          }
        });
    })
  );
});
