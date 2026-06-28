
import { MetadataRoute } from 'next'

/**
 * @fileOverview Sovereign Web Manifest (V4.5 - Standalone & Background Ready)
 * নূরনেক্সাস অপারেটিং সিস্টেমের জন্য পিডাব্লিউএ (PWA) কনফিগারেশন।
 * Updated: Set orientation to 'any' to allow landscape video mode.
 */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NoorNexus Sovereign OS',
    short_name: 'NoorNexus',
    description: 'HMAC_V4 Protected Digital Empire by Sheikh Farid',
    start_url: '/',
    display: 'standalone',
    background_color: '#030708',
    theme_color: '#030708',
    icons: [
      {
        src: 'https://picsum.photos/seed/sovereign-logo/192/192',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: 'https://picsum.photos/seed/sovereign-logo/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    // Essential for Mobile Standalone Experience - Changed to 'any' for video rotation
    orientation: 'any',
    scope: '/',
    categories: ['fintech', 'business', 'productivity'],
  }
}
