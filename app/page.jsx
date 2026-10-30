import Slideshow from '@/components/Slideshow'
import CategoriesGrid from '@/components/CategoriesGrid'
import HeroCinematic from '@/components/HeroCinematic'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      <HeroCinematic />

      <section className="categories-section">
        <div className="section-header">
          <div>
            <div className="section-label">Explorar</div>
            <div className="section-title">Categorías</div>
          </div>
          <Link href="/productos" className="section-link">Ver todo el catálogo →</Link>
        </div>
        <CategoriesGrid />
      </section>

      <Slideshow />

      <div style={{background:'var(--black)', padding:0}}>
        <div className="banner-strip">
          <div className="banner-strip-inner">
            <div>
              <div className="banner-text">Armá tu PC<br />con nosotros.</div>
              <p className="banner-sub">Todos los componentes en un solo lugar. Stock real, garantía oficial, soporte técnico.</p>
            </div>
            <a href="https://techavenuecr.com/productos" className="btn-white">Ver catálogo completo →</a>
          </div>
        </div>
      </div>

      <section style={{ borderTop: '1px solid var(--gray-200)', borderBottom: '1px solid var(--gray-200)', padding: '20px 0', overflow: 'hidden', background: 'var(--white)' }}>
        <div style={{ display: 'flex', animation: 'marquee-brands 25s linear infinite', willChange: 'transform' }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} aria-hidden={i === 1 ? 'true' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 64, paddingRight: 64, flexShrink: 0 }}>
              {[
                { src: '/images/marcas/nvidia-logo.png',                     alt: 'NVIDIA' },
                { src: '/images/marcas/amd-logo-black-and-white-1.png',      alt: 'AMD' },
                { src: '/images/marcas/intel-logo-1.png',                    alt: 'Intel' },
                { src: '/images/marcas/corsair-logo.png',                    alt: 'Corsair' },
                { src: '/images/marcas/gigabyte-logo-black-and-white-1.png', alt: 'Gigabyte' },
                { src: '/images/marcas/msi-logo-black-and-white.png',        alt: 'MSI' },
                { src: '/images/marcas/cooler-master-logo.png',              alt: 'Cooler Master' },
                { src: '/images/marcas/kingston-logo-2.png',                 alt: 'Kingston' },
                { src: '/images/marcas/evga-logo-black-and-white.png',       alt: 'EVGA' },
              ].map(b => (
                <img key={b.alt} src={b.src} alt={b.alt} style={{ width: 90, height: 30, objectFit: 'contain', flexShrink: 0 }} />
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="why-section">
        <div className="why-inner">
          <div className="section-header">
            <div>
              <div className="section-label">Por qué elegirnos</div>
              <div className="section-title">La diferencia TechAvenue</div>
            </div>
          </div>
          <div className="why-grid">
            {[
              { n:'01', t:'Stock real y actualizado',  d:'Nuestro inventario se sincroniza en tiempo real. Lo que ves disponible, está disponible.' },
              { n:'02', t:'Garantía oficial',           d:'Todos los productos incluyen garantía del fabricante. Respaldamos cada compra.' },
              { n:'03', t:'Soporte por WhatsApp',       d:'¿Dudas antes de comprar? Nuestro equipo te asesora en tiempo real por WhatsApp.' },
              { n:'04', t:'Pago seguro',                d:'Pagás por transferencia bancaria antes de la entrega. Tu información siempre está segura.' },
            ].map(w => (
              <div className="why-item" key={w.n}>
                <div className="why-num">{w.n}</div>
                <div className="why-title">{w.t}</div>
                <div className="why-desc">{w.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" style={{ display: 'inline-flex', marginBottom: 14 }}>
              <img src="/TITULO.AMARILLO.NEGRO.png" alt="TechAvenue" style={{ height: 44 }} />
            </Link>
            <p className="footer-desc">Tu tienda de confianza para componentes y periféricos de PC. Stock real, precios directos, garantía oficial.</p>
            <div className="footer-social">
              <a href="https://instagram.com/techavenue.cr/" target="_blank" rel="noreferrer" className="social-btn" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F9BE16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#F9BE16"/>
                </svg>
              </a>
              <a href="https://facebook.com/profile.php?id=100070614230493" target="_blank" rel="noreferrer" className="social-btn" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="#1E3A8A" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://wa.me/50663409795" target="_blank" rel="noreferrer" className="social-btn" aria-label="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 32 32" fill="#25D366">
                  <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/>
                </svg>
              </a>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Productos</div>
            <ul className="footer-links">
              {[
                ['/categoria/gpu','Tarjetas Gráficas'],
                ['/categoria/cpu','Procesadores'],
                ['/categoria/placas-madre','Placas Madre'],
                ['/categoria/ram','Memoria RAM'],
                ['/categoria/almacenamiento','Almacenamiento'],
                ['/categoria/perifericos','Periféricos'],
              ].map(([href,label]) => <li key={href}><Link href={href}>{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Soporte</div>
            <ul className="footer-links">
              {[
                ['/centro-ayuda', 'Centro de ayuda'],
                ['/estado-pedido', 'Estado de mi pedido'],
                ['/garantias', 'Política de garantía'],
                ['/politica-devoluciones', 'Devoluciones'],
                ['/contacto', 'Contacto'],
              ].map(([href, label]) => (
                <li key={label}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Empresa</div>
            <ul className="footer-links">
              {[
                ['/quienes-somos', 'Quiénes somos'],
                ['/terminos-servicio', 'Términos de servicio'],
                ['/politica-privacidad', 'Política de privacidad'],
              ].map(([href, label]) => (
                <li key={label}><Link href={href}>{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 TechAvenue. Todos los derechos reservados.</span>
          <div className="footer-legal">
            <Link href="/politica-privacidad">Privacidad</Link>
            <Link href="/terminos-servicio">Términos</Link>
            <Link href="/politica-cookies">Cookies</Link>
          </div>
        </div>
      </footer>

      <div className="wa-bubble">
        <span className="wa-tooltip">¿Necesitás ayuda?</span>
        <a href="https://wa.me/50663409795" className="wa-btn" aria-label="Contactar por WhatsApp" target="_blank" rel="noreferrer">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/>
          </svg>
        </a>
      </div>
    </>
  )
}