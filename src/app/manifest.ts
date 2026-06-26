
import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NoorNexus Sovereign OS',
    short_name: 'NoorNexus',
    description: 'HMAC_V4 Protected Digital Empire',
    start_url: '/',
    display: 'standalone',
    background_color: '#030708',
    theme_color: '#030708',
    orientation: 'any',
    icons: [
      {
        src: 'https://picsum.photos/seed/sovereign-logo/192/192',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'https://picsum.photos/seed/sovereign-logo/512/512',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
