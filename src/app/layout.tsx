
import type {Metadata} from 'next';
import './globals.css';
import {SidebarProvider} from '@/components/ui/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {FirebaseClientProvider} from '@/firebase';
import {PersistentCommNode} from '@/components/persistent-comm-node';

export const metadata: Metadata = {
  title: 'NoorNexus | Sovereign Digital Infrastructure',
  description: 'HMAC_V4 Protected Digital Empire by Sheikh Farid',
  icons: {
    icon: 'https://picsum.photos/seed/sovereign-logo/32/32',
    apple: 'https://picsum.photos/seed/sovereign-logo/180/180',
  },
  openGraph: {
    title: 'NoorNexus | Sovereign Digital Infrastructure',
    description: 'HMAC_V4 Protected Digital Empire by Sheikh Farid',
    url: 'https://noornexus.sovereign',
    siteName: 'NoorNexus OS',
    images: [
      {
        url: 'https://picsum.photos/seed/sovereign-brand/1200/630',
        width: 1200,
        height: 630,
        alt: 'NoorNexus Sovereign Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NoorNexus | Sovereign Digital Infrastructure',
    description: 'HMAC_V4 Protected Digital Empire by Sheikh Farid',
    images: ['https://picsum.photos/seed/sovereign-brand/1200/630'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/30 selection:text-primary">
        <FirebaseClientProvider>
          <SidebarProvider defaultOpen={true}>
            <div className="flex w-full">
              {/* The Communication Node stays mounted here globally */}
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
