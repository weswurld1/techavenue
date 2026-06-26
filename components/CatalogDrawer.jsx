'use client'
import { useState } from 'react'
import Link from 'next/link'

const DESTACADOS = [
  {
    label: 'Artículos Destacados',
    href: '/destacados',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="#F9BE16" stroke="#F9BE16" strokeWidth="0">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
  {
    label: 'Los más Vendidos',
    href: '/mas-vendidos',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    label: 'Promociones',
    href: '/promociones',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 14 15 8"/><circle cx="9.5" cy="8.5" r="0.5" fill="#DC2626"/><circle cx="14.5" cy="13.5" r="0.5" fill="#DC2626"/>
        <path d="M2 12L12 2l10 10-10 10z"/>
      </svg>
    ),
  },
  {
    label: 'Novedades',
    href: '/novedades',
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
  },
]

const SECCIONES = [
  {
    titulo: 'Componentes',
    href: '/categoria/componentes',
    items: [
      { label: 'Procesadores',               href: '/categoria/componentes?sub=cpu' },
      { label: 'Tarjetas de Video',          href: '/categoria/componentes?sub=gpu' },
      { label: 'Tarjetas Madre',             href: '/categoria/componentes?sub=placas-madre' },
      { label: 'Memoria RAM',                href: '/categoria/componentes?sub=ram' },
      { label: 'Discos SSD / HDD',           href: '/categoria/componentes?sub=almacenamiento' },
      { label: 'Fuentes de Poder',           href: '/categoria/componentes?sub=fuentes-de-poder' },
      { label: 'Gabinetes / Cases',          href: '/categoria/componentes?sub=gabinetes' },
      { label: 'Enfriamiento Aire / Líquido',href: '/categoria/componentes?sub=refrigeracion' },
      { label: 'Pastas y Parches Térmicos',  href: '/categoria/componentes?sub=pastas-termicas' },
    ],
  },
  {
    titulo: 'Periféricos',
    href: '/categoria/perifericos',
    items: [
      { label: 'Mouse',       href: '/categoria/perifericos?sub=Mouse' },
      { label: 'Teclados',    href: '/categoria/perifericos?sub=Teclado' },
      { label: 'Audífonos',   href: '/categoria/perifericos?sub=Audífonos' },
      { label: 'Headsets',    href: '/categoria/perifericos?sub=Headset' },
      { label: 'Webcams',     href: '/categoria/perifericos?sub=Webcam' },
      { label: 'Monitores',   href: '/categoria/perifericos?sub=Monitor' },
      { label: 'Escritorios', href: '/categoria/perifericos?sub=Escritorio' },
      { label: 'Sillas',      href: '/categoria/perifericos?sub=Silla' },
    ],
  },
  {
    titulo: 'Accesorios',
    href: '/categoria/accesorios',
    items: [
      { label: 'Hubs',            href: '/categoria/accesorios?sub=hubs' },
      { label: 'Bases',           href: '/categoria/accesorios?sub=bases' },
      { label: 'Soportes',        href: '/categoria/accesorios?sub=soportes' },
      { label: 'Barra de Sonido', href: '/categoria/accesorios?sub=barra-sonido' },
      { label: 'Mantenimiento',   href: '/categoria/accesorios?sub=mantenimiento' },
    ],
  },
  {
    titulo: 'Energía y Conectividad',
    href: '/categoria/energia-y-conectividad',
    items: [
      { label: 'Power Banks', href: '/categoria/energia-y-conectividad?sub=power-banks' },
      { label: 'UPS',         href: '/categoria/energia-y-conectividad?sub=ups' },
      { label: 'Smart Home',  href: '/categoria/energia-y-conectividad?sub=smart-home' },
      { label: 'Redes',       href: '/categoria/energia-y-conectividad?sub=redes' },
    ],
  },
  {
    titulo: 'Streaming y Gaming',
    href: '/categoria/streaming-y-gaming',
    items: [
      { label: 'Simulación de Carreras', href: '/categoria/streaming-y-gaming?sub=sim-racing' },
      { label: 'Capturadoras y Stream',  href: '/categoria/streaming-y-gaming?sub=streaming' },
    ],
  },
  {
    titulo: 'Computadoras',
    href: '/categoria/computadoras',
    items: [
      { label: 'Laptops', href: '/categoria/computadoras?sub=laptops' },
      { label: 'Tablets', href: '/categoria/computadoras?sub=tablets' },
    ],
  },
  {
    titulo: 'Hogar',
    href: '/categoria/hogar',
    items: [
      { label: 'Electrodomésticos', href: '/categoria/hogar?sub=electrodomesticos' },
    ],
  },
  {
    titulo: 'Software',
    href: '/categoria/software',
    items: [
      { label: 'Licencias y Windows', href: '/categoria/software?sub=licencias' },
    ],
  },
]

export default function CatalogDrawer({ open, onClose }) {
  const [abiertos, setAbiertos] = useState(
    () => Object.fromEntries(SECCIONES.map(s => [s.titulo, false]))
  )

  const toggle = (titulo) =>
    setAbiertos(prev => ({ ...prev, [titulo]: !prev[titulo] }))

  return (
    <div className={`catalog-drawer${open ? ' open' : ''}`} aria-hidden={!open}>
      <div className="catalog-backdrop" onClick={onClose} />
      <div className="catalog-panel">

        <div className="catalog-header">
          <Link href="/" onClick={onClose} style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/TITULO.AMARILLO.NEGRO.png" alt="TechAvenue" style={{ height: 40 }} />
          </Link>
          <button className="catalog-close" aria-label="Cerrar" onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="catalog-body">
          <Link href="/productos" className="catalog-all-link" onClick={onClose}>
            Ver catálogo completo →
          </Link>

          <div className="catalog-featured">
            <div className="catalog-section-title">Destacados</div>
            {DESTACADOS.map(item => (
              <Link key={item.label} href={item.href} className="catalog-featured-item" onClick={onClose}>
                <span className="catalog-featured-icon">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>

          {SECCIONES.map(sec => (
            <div key={sec.titulo} className="catalog-section">
              <button
                className="catalog-section-btn"
                onClick={() => toggle(sec.titulo)}
              >
                <span className="catalog-section-title" style={{ marginBottom: 0, padding: 0 }}>
                  {sec.titulo}
                </span>
                <svg
                  width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                  style={{ transform: abiertos[sec.titulo] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}
                >
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </button>
              <div className={`catalog-section-items${abiertos[sec.titulo] ? ' open' : ''}`}>
                <div>
                  {sec.items.map(item => (
                    <Link key={item.label} href={item.href} className="catalog-item" onClick={onClose}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
