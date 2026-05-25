import './globals.css'
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'TechAvenue — Componentes y Periféricos PC',
  description: 'Tu tienda de confianza para componentes y periféricos de PC.',
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
        <Navbar />
        {children}
      </body>
    </html>
  )
}