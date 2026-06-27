
/**
 * @fileOverview NoorNexus Sovereign Service Worker (v3.5)
 * Handles background push notifications, synchronization, and "Always Alive" signals.
 */

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[Sovereign-SW] Lifecycle: INSTALLED');
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
  console.log('[Sovereign-SW] Lifecycle: ACTIVE_AND_READY');
});

// Background Push Listener
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : { title: 'NoorNexus Pulse', body: 'New Imperial Dispatch Received.' };
  
  const options = {
    body: data.body,
    icon: 'https://picsum.photos/seed/sovereign/192/192',
    badge: 'https://picsum.photos/seed/sovereign/96/96',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '1'
    },
    actions: [
      { action: 'accept', title: 'Accept Handshake', icon: 'https://picsum.photos/seed/check/96/96' },
      { action: 'close', title: 'Ignore', icon: 'https://picsum.photos/seed/cross/96/96' },
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Always Alive - Background Sync Listener
self.addEventListener('sync', (event) => {
  if (event.tag === 'imperial-heartbeat') {
    event.waitUntil(sendHeartbeatToMainframe());
  }
});

async function sendHeartbeatToMainframe() {
  console.log('[Sovereign-SW] Background Heartbeat: PULSING...');
  // Logic to sync pending ledger entries while offline
  return Promise.resolve();
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'accept') {
    clients.openWindow('/');
  }
});
