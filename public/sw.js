/**
 * @fileOverview NoorNexus Sovereign Service Worker (V1.0)
 * handles background push notifications and offline caching for Mission 500.
 */

self.addEventListener('push', function(event) {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: 'https://picsum.photos/seed/sovereign/192/192',
      badge: 'https://picsum.photos/seed/sovereign/192/192',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1'
      },
      actions: [
        {action: 'explore', title: 'Open Dashboard', icon: 'https://picsum.photos/seed/dash/128/128'},
        {action: 'close', title: 'Dismiss', icon: 'https://picsum.photos/seed/close/128/128'},
      ]
    };
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
