import './globals.css'
import Navbar from '../components/Navbar'
import Providers from '../components/Providers'
import { Suspense } from 'react'
import { Analytics } from '@vercel/analytics/next'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'TechAvenue CR — Tecnología en Costa Rica',
  description: 'Comprá componentes, periféricos, laptops y accesorios en TechAvenue Costa Rica. Garantía oficial, envío a todo el país.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
            {children}
          </Suspense>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}