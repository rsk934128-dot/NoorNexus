/**
 * @fileOverview NoorNexus Service Worker (V5.5 - Always Alive Edition)
 * নূরনেক্সাস অপারেটিং সিস্টেমের জন্য ব্যাকগ্রাউন্ড পার্সিস্টেন্স এবং নোটিফিকেশন হ্যান্ডলার।
 */

const CACHE_NAME = 'noornexus-cache-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('[NoorNexus-SW] System Installed.');
});

self.addEventListener('activate', (event) => {
  console.log('[NoorNexus-SW] System Activated.');
  event.waitUntil(clients.claim());
});

// Handling Push Notifications from Nora-AI and Fortress
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'NoorNexus | Imperial Alert';
  const options = {
    body: data.body || 'Sovereign Pulse Detected.',
    icon: 'https://picsum.photos/seed/sovereign/192/192',
    badge: 'https://picsum.photos/seed/sovereign/192/192',
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Listening for messages from the PersistentCommNode
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CHECK_HEALTH') {
    event.source.postMessage({ type: 'HEALTH_OK', status: 'SYNCHRONIZED' });
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
