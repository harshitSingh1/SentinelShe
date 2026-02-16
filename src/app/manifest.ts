import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SentinelShe',
    short_name: 'SentinelShe',
    description: 'Knowledge is Your Shield. Community is Your Strength.',
    start_url: '/',
    display: 'standalone',
    background_color: '#2D1B3A',
    theme_color: '#C6A43F',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}