'use client';
/**
 * @fileOverview Sovereign JavaScript Bridge (V1.0 - Command Edition)
 * নূরনেক্সাস সাম্রাজ্যের অ্যাপ এবং ব্রাউজার টানেলের মধ্যে সিকিউর কমিউনিকেশন ব্রিজ।
 * এটি "Command-Based Permission" নিশ্চিত করে এবং লগইন লুপ প্রতিরোধ করে।
 */

export interface SovereignCommand {
  type: 'PERMIT_YOUTUBE' | 'AUTH_HANDSHAKE' | 'SYNC_IDENTITY' | 'LOGOUT_TUNNEL';
  payload: any;
  signature: string;
}

/**
 * অ্যাপ থেকে ব্রাউজার টানেলে (Iframe) কমান্ড পাঠায়।
 */
export const dispatchSovereignCommand = (iframeRef: React.RefObject<HTMLIFrameElement | null>, command: SovereignCommand) => {
  if (!iframeRef.current || !iframeRef.current.contentWindow) {
    console.warn('[SovereignBridge] Target node not resolved.');
    return;
  }

  const targetOrigin = '*'; // Security note: In production, specify the actual origin
  iframeRef.current.contentWindow.postMessage(command, targetOrigin);
  console.log(`[SovereignBridge] Command Dispatched: ${command.type}`);
};

/**
 * ব্রাউজার টানেলের ভেতরে ইনজেক্ট করার জন্য জাভাস্ক্রিপ্ট কোড।
 */
export const getBridgeScript = () => {
  return `
    (function() {
      window.isSovereignTunnel = true;
      console.log('[Sovereign-Canal] Bridge Script Active.');

      window.addEventListener('message', function(event) {
        const command = event.data;
        if (!command || !command.type) return;

        console.log('[Sovereign-Canal] Received Command:', command.type);

        if (command.type === 'PERMIT_YOUTUBE') {
          window.allowYouTube = true;
          localStorage.setItem('sov_yt_permit', 'true');
          document.dispatchEvent(new CustomEvent('permitYouTube', { detail: command.payload }));
          window.parent.postMessage({ type: 'ACK_PERMIT', status: 'GRANTED' }, '*');
        }
      });

      // Persistent Check
      if (localStorage.getItem('sov_yt_permit') === 'true') {
        window.allowYouTube = true;
      }
    })();
  `;
};

/**
 * ব্রাউজার থেকে অ্যাপের কমান্ড শোনা।
 */
export const listenToTunnelResponse = (callback: (data: any) => void) => {
  const handler = (event: MessageEvent) => {
    if (event.data && event.data.type) {
      callback(event.data);
    }
  };
  window.addEventListener('message', handler);
  return () => window.removeEventListener('message', handler);
};
