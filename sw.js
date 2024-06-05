
// Nome do cache (Controle de versão)
const cachePWA = 'cache-v1';
// Arquivos a serem armazenados em cache
// Todos os arquivos devem ser add ao vetor (exceto o manifesto)
const urlsToCache = [
  '/',
  '/index.html',  
  '/escola192.png',
  '/escola512.png',
  '/style.css',
  '/media.js',
  '/manifest.json'
]

// Instalando o Service Worker e armazenando os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cachePWA)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

// Interceptando as solicitações de rede e servindo arquivos do cache quando offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se o arquivo está no cache, serve o arquivo do cache
        if (response) {
          return response
        }
        // Caso contrário, faz uma solicitação de rede
        return fetch(event.request)
      })
  )
})
