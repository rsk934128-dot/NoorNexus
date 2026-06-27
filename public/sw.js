/* eslint-disable no-restricted-globals */

/**
 * @fileOverview NoorNexus Sovereign Service Worker
 * Purpose: Background persistence, Imperial Notifications, and Offline-First Sync.
 */

self.addEventListener('install', (event) => {
  console.log('[NoorNexus-SW] System Handshake: Installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[NoorNexus-SW] System Handshake: Activated');
  event.waitUntil(clients.claim());
});

// Handle Imperial Push Notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    try {
      const payload = event.data.json();
      const title = payload.title || 'Sovereign Alert';
      const options = {
        body: payload.body || 'Identity pulse detected in the mesh.',
        icon: 'https://picsum.photos/seed/sovereign/192/192',
        badge: 'https://picsum.photos/seed/sovereign/192/192',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
      };
      event.waitUntil(self.registration.showNotification(title, options));
    } catch (e) {
      console.error('[NoorNexus-SW] Push Parsing Error:', e);
    }
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      if (clientList.length > 0) {
        let client = clientList[0];
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].focused) {
            client = clientList[i];
          }
        }
        return client.focus();
      }
      return clients.openWindow('/');
    })
  );
});

// Listen for Background Sync Events (Project #49)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sovereign-sync-pulse') {
    console.log('[NoorNexus-SW] Background Sync Triggered');
    // Implement background sync logic here if needed
  }
});
