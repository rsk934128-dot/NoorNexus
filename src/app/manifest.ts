
import { MetadataRoute } from 'next'

/**
 * @fileOverview Sovereign Web Manifest (V3.5 - Standalone & Background Ready)
 * নূরনেক্সাস অপারেটিং সিস্টেমের জন্য পিডাব্লিউএ (PWA) কনফিগারেশন।
 * এটি সিস্টেম লেভেল ব্যাকগ্রাউন্ড প্রসেসিং এবং স্ট্যান্ডঅ্যালোন মোড নিশ্চিত করে।
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
    // Essential for Mobile Standalone Experience
    orientation: 'portrait-primary',
    scope: '/',
    categories: ['fintech', 'business', 'productivity'],
  }
}
