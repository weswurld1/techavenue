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
  <div className="brands-row" style={{ alignItems: 'center', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between' }}>

    {/* NVIDIA */}
    <svg height="30" viewBox="0 0 100 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.9 11.2v-1.7c.2 0 .4 0 .6-.1 5.3-.3 8.8 4.6 8.8 4.6s-3.7 5.3-7.7 5.3c-.6 0-1.2-.1-1.7-.3v-5.3c2.2.3 2.7 1.2 4 3.3l3-2.5s-2.1-2.8-5.1-3.2c-.6-.1-1.3-.1-1.9-.1zm0-6.8v2.3c.2 0 .4 0 .6-.1 7.3-.4 12.1 6 12.1 6s-5.5 6.7-11.2 6.7c-.5 0-1-.1-1.5-.1v1.4c.4.1.9.1 1.4.1 6.1 0 10.5-3.1 14.8-6.8 .7.6 3.6 1.9 4.2 2.5-4 3.4-13.4 7.3-18.9 7.3-.5 0-1 0-1.5-.1V24h19.5V4.4H11.9zm0 13.4v1.2c-4.9-.9-6.3-5.9-6.3-5.9s2.3-2.6 6.3-3v1.3c-2.2.3-3.9 2.2-3.9 2.2s1 3.6 3.9 4.2zm31.3-12h3.8l4.4 13.4 4.4-13.4h3.6l-6.4 18.2h-3.4L42.5 5.8zm17.3 0h3.6v18.2h-3.6V5.8zm5.7 0h7.4c5.4 0 8.6 3.2 8.6 9s-3.1 9.2-8.6 9.2h-7.4V5.8zm3.6 3.2v11.8h3.7c3.2 0 5-2.1 5-5.9 0-3.7-1.8-5.9-5-5.9h-3.7zm-26.7-3.2h4.1l5.2 12.4V5.8h3.4v18.2h-4.1l-5.2-12.4v12.4h-3.4V5.8z" fill="#76B900"/>
    </svg>

    {/* AMD */}
    <svg height="30" viewBox="0 0 80 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.1 4.5L4.5 25.5h4.8l2.1-4.5h9.3l2.1 4.5h4.8L17.1 4.5h-2zm1 5.8l3.2 7h-6.4l3.2-7zM28 4.5v21h4.5v-13l5.5 8h.8l5.5-8v13H49v-21h-4.2l-6.3 9.5L32.2 4.5H28zm25.5 0v21h9.5c6.5 0 10.5-3.8 10.5-10.5S69.5 4.5 63 4.5h-9.5zm4.5 4h5c3.8 0 6 2.3 6 6.5s-2.2 6.5-6 6.5h-5V8.5z" fill="#ED1C24"/>
    </svg>

    {/* Intel */}
    <svg height="30" viewBox="0 0 70 30" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 6h4v18H8V6zm8 5h4v13h-4V11zm0-5h4v3h-4V6zm8 10c0-3.3 2.7-5.5 6-5.5 1.8 0 3.3.6 4.4 1.7l-2.5 2.5c-.5-.5-1.1-.8-1.9-.8-1.3 0-2.2.9-2.2 2.1v5c0 1.2.9 2.1 2.2 2.1.8 0 1.4-.3 1.9-.8l2.5 2.5c-1.1 1.1-2.6 1.7-4.4 1.7-3.3 0-6-2.2-6-5.5v-5zm14-5h4v2.5c.8-1.6 2.3-2.8 4.3-2.8v4c-2.5 0-4.3 1.2-4.3 4v6h-4V11zm10 6.5c0-3.8 3-6.5 7-6.5s7 2.7 7 6.5-3 6.5-7 6.5-7-2.7-7-6.5zm10 0c0-1.9-1.3-3.1-3-3.1s-3 1.2-3 3.1 1.3 3.1 3 3.1 3-1.2 3-3.1z" fill="#0068B5"/>
    </svg>

    {/* ASUS */}
    <svg height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 5L0 23h6l2-4h8l2 4h6L14 5h-4zm2 4l2.5 6h-5L12 9zM27 5v12c0 2 1.2 3 3 3h8c1.8 0 3-1 3-3V5h-5v11h-4V5h-5zm19 0v4h7c.8 0 1 .3 1 .8 0 .6-.5.8-1 .8h-5c-2 0-3 1.2-3 3v2c0 2 1 3.4 3.5 3.4H61v-4h-8c-.5 0-1-.2-1-.8 0-.5.3-.8 1-.8h5c2 0 3.2-1.2 3.2-3v-2c0-2-1-4.2-3.5-4.2H46zm18 0v12c0 2 1.2 3 3 3h8c1.8 0 3-1 3-3V5h-5v11h-4V5h-5z" fill="#1A1A1A"/>
    </svg>

    {/* Corsair */}
    <svg height="28" viewBox="0 0 120 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 5C8.5 5 4 9.5 4 15s4.5 10 10 10c3 0 5.7-1.3 7.5-3.4l-3-2.6c-1.1 1.3-2.7 2-4.5 2-3.3 0-6-2.7-6-6s2.7-6 6-6c1.8 0 3.4.8 4.5 2l3-2.6C19.7 6.3 17 5 14 5zm12 .5V25h5V5.5h-5zm8 0V25h14c4 0 6.5-2 6.5-5.5 0-2.2-1-3.8-2.8-4.6 1.3-.8 2.2-2.2 2.2-4 0-3-2.2-5-5.8-5H34zm5 4h7.5c1.2 0 2 .6 2 1.8s-.8 1.7-2 1.7H39V9.5zm0 7h8c1.3 0 2.2.7 2.2 2s-.9 2.2-2.2 2.2H39V16.5zm20-11V25h5V5.5h-5zm8.5 0L60 25h5l1.5-4h8l1.5 4h5L73 5.5h-5.5zm2.5 4.5l2.5 7h-5l2.5-7zm14-4.5V25h5V16l7 9h6l-7.5-9.5L91 5.5h-6l-5.5 7V5.5h-5zm25 0c-3 0-5.5 2-5.5 5.5v3c0 3.5 2.5 5.5 5.5 5.5h4.5V21h-5c-1 0-1.5-.5-1.5-1.5V18h7v-4h-7v-2c0-1 .5-1.5 1.5-1.5h5v-4.5H100z" fill="#F9BE16"/>
    </svg>

    {/* Gigabyte */}
    <svg height="28" viewBox="0 0 50 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M25 3C13 3 3 13 3 25h8c0-7.7 6.3-14 14-14s14 6.3 14 14h8C47 13 37 3 25 3zm0 10c-6.6 0-12 5.4-12 12h8c0-2.2 1.8-4 4-4s4 1.8 4 4h8c0-6.6-5.4-12-12-12z" fill="#E2001A"/>
    </svg>

    {/* MSI */}
    <svg height="28" viewBox="0 0 70 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5v18h5V13l5 10h4l5-10v10h5V5H23l-6 12-6-12H5zm28 0v18h5V5h-5zm10 0v5h8c1 0 1.5.4 1.5 1.2 0 .8-.6 1.3-1.5 1.3h-6c-2.5 0-4 1.5-4 4v1.5c0 2.8 1.5 5 5 5H60v-5h-9c-.8 0-1.5-.4-1.5-1.2 0-.8.5-1.3 1.5-1.3h5.5c2.8 0 4.5-1.8 4.5-4.5v-1c0-3-1.8-5-5-5H43z" fill="#D40000"/>
    </svg>

    {/* NZXT */}
    <svg height="28" viewBox="0 0 80 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5v18h5V13l10 10h5V5h-5v10L10 5H5zm25 0v5h7v13h5V10h7V5H30zm18 0l7 9-7 9h6l4-5 4 5h6l-7-9 7-9h-6l-4 5-4-5h-6z" fill="#000000"/>
    </svg>

    {/* Samsung */}
    <svg height="28" viewBox="0 0 130 28" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v5h8c1 0 1.8.5 1.8 1.5S17 13 16 13h-6c-3 0-5 2-5 5v1c0 3 2 5 5.5 5H23v-5h-9c-.8 0-1.5-.5-1.5-1.5s.5-1.5 1.5-1.5h5.5c3 0 5-1.8 5-5v-1c0-3-2-5.5-5.5-5.5H8zm21 0L21 23h5l1.5-4.5h8L37 23h5L34 5h-5zm2.5 5l2.5 6.5h-5L31.5 10zM44 5v18h5V13l5 10h3l5-10v10h5V5h-6l-6 11-6-11h-5zm28 0v18h5V5h-5zm9.5 0L74 23h5l1.5-4.5h8L90 23h5L87 5h-5.5zm2.5 5l2.5 6.5h-5L84 10zM97 5v18h5V13l10 10h5V5h-5v10L102 5h-5zm26 0v10c0 5.5-2.5 8-7 8h-1v-5h.5c2 0 2.5-1 2.5-3V5h5z" fill="#1428A0"/>
    </svg>

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
