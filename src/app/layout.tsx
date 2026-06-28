"use client"

import './globals.css';
import {SidebarProvider} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {FirebaseClientProvider} from '@/firebase';
import {PersistentCommNode} from '@/components/persistent-comm-node';
import {SessionTracker} from '@/components/session-tracker';
import {useEffect} from 'react';
import {initSyncEngine} from '@/services/sync-engine';
import Script from 'next/script';

/**
 * @fileOverview Root Layout (V4.3 - GTM & Sovereign Edition)
 * নূরনেক্সাস অপারেটিং সিস্টেমের কেন্দ্রীয় লেআউট।
 * Google Tag Manager (GTM-ML2HBMVP) এখন গ্লোবাল হেডারে যুক্ত।
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  useEffect(() => {
    // Initialize Offline-First Sync Engine on client mount
    initSyncEngine();
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>NoorNexus | Sovereign Digital Infrastructure</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        
        {/* Google Tag Manager - Imperial Pulse */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-ML2HBMVP');
          `}
        </Script>
      </head>
      <body className="font-body antialiased selection:bg-primary/30 selection:text-primary">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-ML2HBMVP"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <FirebaseClientProvider>
          <SessionTracker />
          <SidebarProvider defaultOpen={true}>
            <div className="flex w-full">
              <PersistentCommNode />
              <div className="flex-1 flex flex-col min-w-0">
                {children}
              </div>
            </div>
            <Toaster />
          </SidebarProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
