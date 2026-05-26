'use client'
import { useEffect, useRef, useState } from 'react'

const slides = [
  {
    img:    '/images/productos/rtx-4070-super.png',
    alt:    'GeForce RTX 4070 Super',
    badge:  'Nuevo',
    badgeClass: 'badge-new',
    brand:  'NVIDIA',
    name:   'GeForce RTX 4070 Super',
    href:   '/catalogo/gpu/rtx-4070-super',
    spec:   '12GB GDDR6X · DLSS 3 · Ada Lovelace\nRay Tracing de 3.ª generación · AV1 Encoder',
    price:  '$649',
    oldPrice: null,
    placeholder: 'p-gpu',
    phStyle: { width: 200, height: 130 },
  },
  {
    img:    '/images/productos/ryzen9-7900x.png',
    alt:    'Ryzen 9 7900X',
    badge:  'Oferta',
    badgeClass: 'badge-sale',
    brand:  'AMD',
    name:   'Ryzen 9 7900X',
    href:   '/catalogo/cpu/ryzen-9-7900x',
    spec:   '12 núcleos · 24 hilos · 4.7GHz base / 5.6GHz boost\nSocket AM5 · DDR5 · PCIe 5.0 · 170W TDP',
    price:  '$389',
    oldPrice: '$449',
    placeholder: 'p-cpu',
    phStyle: { width: 140, height: 140, borderRadius: '50%' },
  },
  {
    img:    '/images/productos/corsair-ddr5-32gb.png',
    alt:    'Corsair Vengeance DDR5 32GB',
    badge:  null,
    brand:  'Corsair',
    name:   'Vengeance DDR5 32GB',
    href:   '/catalogo/ram/corsair-vengeance-ddr5-32gb',
    spec:   '2×16GB · 6000MHz CL36 · XMP 3.0\nDisipador de aluminio · Compatible AM5 & LGA1700',
    price:  '$129',
    oldPrice: null,
    placeholder: 'p-ram',
    phStyle: { width: 70, height: 180 },
  },
  {
    img:    '/images/productos/asus-rog-b650e.png',
    alt:    'ASUS ROG Strix B650E-F',
    badge:  'Nuevo',
    badgeClass: 'badge-new',
    brand:  'ASUS',
    name:   'ROG Strix B650E-F',
    href:   '/catalogo/placas-madre/rog-strix-b650e-f',
    spec:   'Socket AM5 · DDR5 · PCIe 5.0 · ATX\nWiFi 6E · 2.5G LAN · USB 3.2 Gen 2×2',
    price:  '$279',
    oldPrice: null,
    placeholder: 'p-mobo',
    phStyle: { width: 190, height: 190 },
  },
]

export default function Slideshow() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  const goTo = (n) => setCurrent((n + slides.length) % slides.length)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  const startAuto = () => { timerRef.current = setInterval(next, 5000) }
  const stopAuto  = () => clearInterval(timerRef.current)

  useEffect(() => {
    startAuto()
    return () => stopAuto()
  }, [current])

  return (
    <section className="products-section">
      <div className="products-inner">
        <div className="section-header">
          <div>
            <div className="section-label">Selección</div>
            <div className="section-title">Productos destacados</div>
          </div>
          <a href="/productos" className="section-link">Ver todos →</a>
        </div>

        <div
          className="products-slideshow"
          onMouseEnter={stopAuto}
          onMouseLeave={startAuto}
        >
          <div className="slideshow-viewport">
            <div
              className="slideshow-track"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((s, i) => (
                <div className="slide" key={i}>
                  <div className="slide-image-area">
                    <img
                      src={s.img}
                      alt={s.alt}
                      onError={(e) => { e.target.style.opacity = '0' }}
                    />
                    <div className="slide-img-placeholder">
                      <div
                        className={`product-img-inner ${s.placeholder}`}
                        style={s.phStyle}
                      />
                    </div>
                    {s.badge && (
                      <span className={`product-badge ${s.badgeClass}`}>{s.badge}</span>
                    )}
                  </div>
                  <div className="slide-info">
                    <span className="slide-brand">{s.brand}</span>
                    <a href={s.href} className="slide-name">{s.name}</a>
                    <span className="slide-spec">
                      {s.spec.split('\n').map((line, j) => (
                        <span key={j}>{line}<br /></span>
                      ))}
                    </span>
                    <div className="slide-price-row">
                      <span className="slide-price">{s.price}</span>
                      {s.oldPrice && <span className="slide-price-old">{s.oldPrice}</span>}
                      <button className="slide-add-btn">Agregar al carrito</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          <button
            className="slide-arrow slide-prev"
            onClick={() => { stopAuto(); prev(); }}
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <button
            className="slide-arrow slide-next"
            onClick={() => { stopAuto(); next(); }}
            aria-label="Siguiente"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="slide-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`slide-dot${current === i ? ' active' : ''}`}
                onClick={() => { stopAuto(); goTo(i) }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
