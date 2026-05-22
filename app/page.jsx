import Slideshow from '@/components/Slideshow'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* ANNOUNCEMENT */}
      <div className="announce">
        ✦ Envío gratis en pedidos cancelados contra entrega <span>·</span>
        Garantía oficial en todos los productos <span>·</span>
        <a href="#">Contactar por WhatsApp →</a>
      </div>

      {/* NAVBAR */}
      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">
           <span style={{color:'#F9BE16'}}>Tech</span><em>Avenue</em>
          </Link>
          <div className="nav-links">
            <Link href="/categoria/gpu" className="active">GPU</Link>
            <Link href="/categoria/cpu">CPU</Link>
            <Link href="/categoria/placas-madre">Placas Madre</Link>
            <Link href="/categoria/ram">RAM</Link>
            <Link href="/categoria/almacenamiento">Almacenamiento</Link>
            <Link href="/categoria/perifericos">Periféricos</Link>
            <Link href="/categoria/gabinetes">Gabinetes</Link>
          </div>
          <div className="nav-right">
            <button className="nav-icon-btn" aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
            <button className="nav-icon-btn" aria-label="Carrito" style={{position:'relative'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="cart-count">0</span>
            </button>
            <Link href="/buscar" className="nav-cta">Buscar productos</Link>
          </div>
        </div>
      </nav>

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
                {/* Cuando tengas la foto, descomenta el img y borra el placeholder */}
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
              <button className="social-btn" aria-label="Instagram">ig</button>
              <button className="social-btn" aria-label="Facebook">fb</button>
              <button className="social-btn" aria-label="WhatsApp">wa</button>
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
  <li key={label}><a href={href}>{label}</a></li>
))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Empresa</div>
            <ul className="footer-links">
              {['Quiénes somos','Términos de servicio','Política de privacidad']
                .map(l => <li key={l}><a href="#">{l}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© 2026 TechAvenue. Todos los derechos reservados.</span>
          <div className="footer-legal">
            <a href="#">Privacidad</a>
            <a href="#">Términos</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </footer>

      {/* WHATSAPP BUBBLE */}
      <div className="wa-bubble">
        <span className="wa-tooltip">¿Necesitás ayuda?</span>
        <a href="https://wa.me/TUNUMERO" className="wa-btn" aria-label="Contactar por WhatsApp">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/>
          </svg>
        </a>
      </div>
    </>
  )
}
