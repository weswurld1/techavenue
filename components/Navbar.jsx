'use client'
import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const SearchOverlay = dynamic(() => import('./SearchOverlay'), { ssr: false })

const NAV_LINKS = [
  { href: '/categoria/gpu',           label: 'Tarjetas Gráficas (GPU)' },
  { href: '/categoria/cpu',           label: 'Procesadores (CPU)' },
  { href: '/categoria/placas-madre',  label: 'Placas Madre' },
  { href: '/categoria/ram',           label: 'Memoria RAM' },
  { href: '/categoria/almacenamiento',label: 'Almacenamiento' },
  { href: '/categoria/perifericos',   label: 'Periféricos' },
  { href: '/categoria/gabinetes',     label: 'Gabinetes' },
  { href: '/categoria/refrigeracion', label: 'Refrigeración' },
  { href: '/categoria/psu',           label: 'Fuentes de Poder' },
  { href: '/productos',               label: 'Ver todo el catálogo' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <div className="announce">
        ✦ Envío gratis en pedidos con pago anticipado <span>·</span>
        Garantía oficial en todos los productos <span>·</span>
        <a href="https://wa.me/50663409795" target="_blank" rel="noreferrer">Contactar por WhatsApp →</a>
      </div>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/TITULO.AMARILLO.NEGRO.png" alt="TechAvenue" style={{ height: 68 }} />
          </Link>
          <div className="nav-links">
            <Link href="/categoria/gpu">GPU</Link>
            <Link href="/categoria/cpu">CPU</Link>
            <Link href="/categoria/placas-madre">Placas Madre</Link>
            <Link href="/categoria/ram">RAM</Link>
            <Link href="/categoria/almacenamiento">Almacenamiento</Link>
            <Link href="/categoria/perifericos">Periféricos</Link>
            <Link href="/categoria/gabinetes">Gabinetes</Link>
          </div>
          <div className="nav-right">
            <SearchOverlay />
            <a href="/carrito" className="nav-icon-btn" aria-label="Carrito" style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="cart-count">0</span>
            </a>
            <button
              className="nav-hamburger"
              aria-label="Abrir menú"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />
        <div className="mobile-panel">
          <div className="mobile-panel-header">
            <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }} onClick={() => setMenuOpen(false)}>
              <img src="/TITULO.AMARILLO.NEGRO.png" alt="TechAvenue" style={{ height: 56 }} />
            </Link>
            <button className="mobile-close" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div className="mobile-nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
          <div className="mobile-nav-footer">
            <a
              href="https://wa.me/50663409795"
              target="_blank"
              rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600, color: '#25D366' }}
              onClick={() => setMenuOpen(false)}
            >
              <svg width="20" height="20" viewBox="0 0 32 32" fill="#25D366">
                <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/>
              </svg>
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  )
}