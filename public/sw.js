/**
 * @fileOverview NoorNexus PWA Service Worker (Nora-SW)
 * Handles background sync, caching, and Imperial Push Notifications.
 */

const CACHE_NAME = 'noornexus-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  'https://picsum.photos/seed/sovereign-logo/32/32'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// --- IMPERIAL NOTIFICATION LOGIC ---

self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'NoorNexus Alert', body: 'Incoming Secure Signal detected.' };
  
  const options = {
    body: data.body,
    icon: 'https://picsum.photos/seed/sovereign-logo/192/192',
    badge: 'https://picsum.photos/seed/sovereign-logo/32/32',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
