'use client'
import { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useCarrito } from '../context/CartContext'
import CatalogDrawer from './CatalogDrawer'

const SearchOverlay = dynamic(() => import('./SearchOverlay'), { ssr: false })

const NAV_LINKS = [
  { href: '/mas-vendidos',    label: 'Lo más vendido' },
  { href: '/estado-pedido',   label: 'Estado de mi pedido' },
  { href: '/contacto',        label: 'Contacto' },
]

export default function Navbar() {
  const [catalogOpen, setCatalogOpen] = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const { cantidad } = useCarrito()

  return (
    <>
      <div className="announce">
        ✦ 3% de descuento y envío gratis con pagos anticipados <span>·</span>
        Garantía oficial en todos los productos <span>·</span>
        <a href="https://wa.me/50663409795" target="_blank" rel="noreferrer">Contactar por WhatsApp →</a>
      </div>

      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img src="/TITULO.AMARILLO.NEGRO.png" alt="TechAvenue" style={{ height: 52 }} />
          </Link>

          <div className="nav-links">
            {NAV_LINKS.map(({ href, label }) => (
              <Link key={href} href={href}>{label}</Link>
            ))}
          </div>

          <button className="nav-search-bar" onClick={() => setSearchOpen(true)} aria-label="Buscar productos">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--gray-400)' }}>
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <span className="nav-search-placeholder">¿Qué estás buscando hoy?</span>
          </button>

          <div className="nav-right">
            <button
              className="nav-catalog-btn"
              aria-label="Ver todas las categorías"
              onClick={() => setCatalogOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>

            <a href="/carrito" className="nav-icon-btn" aria-label="Carrito" style={{ position: 'relative' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cantidad > 0 && (
                <span className="cart-count">{cantidad > 99 ? '99+' : cantidad}</span>
              )}
            </a>

            <button className="nav-hamburger" aria-label="Abrir menú" onClick={() => setCatalogOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="3" y1="6"  x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <CatalogDrawer open={catalogOpen} onClose={() => setCatalogOpen(false)} onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
