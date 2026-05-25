import Slideshow from '@/components/Slideshow'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <span className="hero-badge">Nuevos lanzamientos 2025</span>
          <h1 className="hero-title">
            Construye<br />
            tu setup<br />
            <em>ideal.</em>
          </h1>
          <p className="hero-sub">
            Componentes, periféricos y todo lo que necesitas para armar el PC de tus sueños. Stock real, precios directos.
          </p>
          <div className="hero-actions">
            <button className="btn-primary">Ver catálogo completo</button>
            <button className="btn-outline">Ver ofertas</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-product-visual">
            <div className="gpu-shape">
              <div className="gpu-accent"></div>
              <div className="gpu-fans">
                <div className="fan"></div>
                <div className="fan"></div>
                <div className="fan"></div>
              </div>
            </div>
            <div className="hero-product-label">
              <span>Destacado</span>
              <strong>RTX 4070 Super · 12GB GDDR6X</strong>
            </div>
            <span className="hero-tag">En stock</span>
          </div>
        </div>
      </div>

      {/* CATEGORIES */}
      <section className="categories-section">
        <div className="section-header">
          <div>
            <div className="section-label">Explorar</div>
            <div className="section-title">Categorías</div>
          </div>
          <Link href="/productos" className="section-link">Ver todo el catálogo →</Link>
        </div>
        <div className="categories-grid">
          {[
            { href: '/categoria/gpu',            label: 'Tarjetas Gráficas', img: '/images/categorias/gpu.png' },
            { href: '/categoria/cpu',             label: 'Procesadores',      img: '/images/categorias/cpu.png' },
            { href: '/categoria/placas-madre',    label: 'Placas Madre',      img: '/images/categorias/motherboard.png' },
            { href: '/categoria/ram',             label: 'Memoria RAM',       img: '/images/categorias/ram.png' },
            { href: '/categoria/almacenamiento',  label: 'Almacenamiento',    img: '/images/categorias/ssd.png' },
            { href: '/categoria/refrigeracion',   label: 'Refrigeración',     img: '/images/categorias/cooling.png' },
            { href: '/categoria/perifericos',     label: 'Periféricos',       img: '/images/categorias/perifericos.png' },
            { href: '/categoria/gabinetes',       label: 'Gabinetes',         img: '/images/categorias/gabinete.png' },
            { href: '/categoria/psu',             label: 'Fuentes de Poder',  img: '/images/categorias/psu.png' },
            { href: '/categoria/redes',           label: 'Redes',             img: '/images/categorias/redes.png' },
          ].map((cat) => (
            <Link href={cat.href} className="category-card" key={cat.href}>
              <div className="category-img-wrap">
                {/* <img src={cat.img} alt={cat.label} /> */}
                <div className="category-img-placeholder">foto aquí</div>
              </div>
              <div className="category-body">
                <span className="category-name"><em>//</em> {cat.label}</span>
                <span className="category-arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS — SLIDESHOW */}
      <Slideshow />

      {/* BANNER */}
      <div style={{background:'var(--black)', padding:0}}>
        <div className="banner-strip">
          <div className="banner-strip-inner">
            <div>
              <div className="banner-text">Armá tu PC<br />con nosotros.</div>
              <p className="banner-sub">Todos los componentes en un solo lugar. Stock real, garantía oficial, soporte técnico.</p>
            </div>
            <button className="btn-white">Ver catálogo completo →</button>
          </div>
        </div>
      </div>

      {/* BRANDS */}
      <section className="brands-section">
        <div className="brands-label">Trabajamos con las mejores marcas</div>
        <div className="brands-row">
          {['NVIDIA','AMD','Intel','ASUS','Corsair','Gigabyte','MSI','NZXT','Samsung'].map(b => (
            <span className="brand-logo" key={b}>{b}</span>
          ))}
        </div>
      </section>

      {/* WHY US */}
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
              { n:'04', t:'Pago seguro',                d:'Checkout protegido con PayPal. Tu información siempre está segura.' },
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

      {/* FOOTER */}
      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="logo">Tech<em>Avenue</em></Link>
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
                ['#', 'Centro de ayuda'],
                ['#', 'Estado de mi pedido'],
                ['#', 'Política de garantía'],
                ['/politica-devoluciones', 'Devoluciones'],
                ['#', 'Contacto'],
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
                ['/Términos de servicio', 'Términos de servicio'],
                ['/Política de privacidad', 'Política de privacidad'],
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
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>

      {/* WHATSAPP BUBBLE */}
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