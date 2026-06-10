
/**
 * NoorNexus Sovereign OS - Background Service Worker
 * Project 165: Persistence & Communication Logic
 */

const CACHE_NAME = 'noornexus-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Pass-through for network requests to ensure real-time comms work
  event.respondWith(fetch(event.request));
});

// Handle incoming push notifications for calls (Future Expansion)
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'NoorNexus Incoming Call', {
      body: data.body || 'New alert from Shurukkha Hub',
      icon: 'https://picsum.photos/seed/noornexus-icon/192/192',
      badge: 'https://picsum.photos/seed/noornexus-badge/96/96'
    })
  );
});
