'use client';
/**
 * @fileOverview Sovereign Notification Hub Service.
 * Manages permission handshakes and dispatching imperial alerts.
 */

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.error('This browser does not support desktop notifications');
    return false;
  }

  if (Notification.permission === 'granted') return true;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendSovereignNotification = async (title: string, body: string) => {
  const hasPermission = await requestNotificationPermission();
  
  if (hasPermission) {
    const registration = await navigator.serviceWorker.ready;
    if (registration) {
      registration.showNotification(`NoorNexus | ${title}`, {
        body: body,
        icon: 'https://picsum.photos/seed/sovereign/192/192',
        badge: 'https://picsum.photos/seed/sovereign/192/192',
        tag: 'imperial-alert',
        requireInteraction: true,
      });
    } else {
      new Notification(`NoorNexus | ${title}`, {
        body: body,
        icon: 'https://picsum.photos/seed/sovereign/192/192',
      });
    }
  }
};
