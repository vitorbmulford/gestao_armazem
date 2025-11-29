// Service Worker para Sistema de Gestão de Cozinha Comercial
// Versão do cache - incrementar quando houver atualizações
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `gestao-cozinha-${CACHE_VERSION}`;

// Arquivos essenciais para funcionamento offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando Service Worker versão', CACHE_VERSION);
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache aberto, adicionando arquivos estáticos');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[SW] Arquivos estáticos cacheados com sucesso');
        // Força o Service Worker a ativar imediatamente
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Erro ao cachear arquivos:', error);
      })
  );
});

// Ativação do Service Worker
self.addEventListener('activate', (event) => {
  console.log('[SW] Ativando Service Worker versão', CACHE_VERSION);
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        // Remove caches antigos
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Removendo cache antigo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker ativado e pronto');
        // Toma controle de todas as páginas imediatamente
        return self.clients.claim();
      })
  );
});

// Estratégia de cache: Network First com fallback para Cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignora requisições que não são do mesmo domínio
  if (url.origin !== location.origin) {
    return;
  }

  // Ignora requisições de API externas
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    // Tenta buscar da rede primeiro
    fetch(request)
      .then((response) => {
        // Se a resposta for válida, clona e adiciona ao cache
        if (response && response.status === 200) {
          const responseClone = response.clone();
          
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        
        return response;
      })
      .catch(() => {
        // Se falhar (offline), busca do cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[SW] Servindo do cache:', request.url);
            return cachedResponse;
          }
          
          // Se não estiver no cache e for uma navegação, retorna index.html
          if (request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          
          // Retorna resposta de erro genérica
          return new Response('Offline - Recurso não disponível no cache', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain'
            })
          });
        });
      })
  );
});

// Mensagens do cliente para o Service Worker
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Recebido comando SKIP_WAITING');
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_VERSION });
  }
});

// Sincronização em background (quando voltar online)
self.addEventListener('sync', (event) => {
  console.log('[SW] Evento de sincronização:', event.tag);
  
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Aqui você pode implementar sincronização de dados
      // Por exemplo, enviar dados salvos localmente para o servidor
      Promise.resolve()
    );
  }
});

console.log('[SW] Service Worker carregado - versão', CACHE_VERSION);
