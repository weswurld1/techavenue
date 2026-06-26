'use client'
import { useEffect, useRef, useState } from 'react'
import { toSlug } from '@/lib/utils'

export default function Slideshow() {
  const [slides, setSlides] = useState([])
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    fetch('/api/destacados')
      .then(r => r.json())
      .then(d => setSlides(d.productos || []))
  }, [])

  const goTo = (n) => setCurrent((n + slides.length) % slides.length)
  const next = () => goTo(current + 1)
  const prev = () => goTo(current - 1)

  const startAuto = () => { timerRef.current = setInterval(next, 5000) }
  const stopAuto  = () => clearInterval(timerRef.current)

  useEffect(() => {
    if (slides.length === 0) return
    startAuto()
    return () => stopAuto()
  }, [current, slides])

  if (slides.length === 0) return (
    <section className="products-section">
      <div className="products-inner">
        <div className="section-header">
          <div>
            <div className="section-label">Selección</div>
            <div className="section-title">Productos destacados</div>
          </div>
          <a href="/productos" className="section-link">Ver todos →</a>
        </div>
        <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--gray-400)', fontSize: 14 }}>
          Los productos destacados aparecerán aquí pronto.
        </div>
      </div>
    </section>
  )

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

        <div className="products-slideshow" onMouseEnter={stopAuto} onMouseLeave={startAuto}>
          <div className="slideshow-viewport">
            <div className="slideshow-track" style={{ transform: `translateX(-${current * 100}%)` }}>
              {slides.map((s, i) => (
                <div className="slide" key={i}>
                  <div className="slide-image-area">
                    <img src={s.imagen} alt={s.nombre} onError={e => { e.target.style.opacity = '0' }} />
                    {s.badge && <span className={`product-badge ${s.badge === 'Nuevo' ? 'badge-new' : 'badge-sale'}`}>{s.badge}</span>}
                  </div>
                  <div className="slide-info">
                    <span className="slide-brand">{s.marca}</span>
                    <a href={`/producto/${toSlug(s.nombre)}`} className="slide-name">{s.nombre}</a>
                    <span className="slide-spec">{s.descripcion}</span>
                    <div className="slide-price-row">
                      <span className="slide-price">₡{s.precio?.toLocaleString('es-CR')}</span>
                      {s.precio_original && <span className="slide-price-old">₡{s.precio_original?.toLocaleString('es-CR')}</span>}
                      <button className="slide-add-btn">Agregar al carrito</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="slide-arrow slide-prev" onClick={() => { stopAuto(); prev() }} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <button className="slide-arrow slide-next" onClick={() => { stopAuto(); next() }} aria-label="Siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>

          <div className="slide-dots">
            {slides.map((_, i) => (
              <button key={i} className={`slide-dot${current === i ? ' active' : ''}`} onClick={() => { stopAuto(); goTo(i) }} aria-label={`Slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}