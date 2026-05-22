import Slideshow from '@/components/Slideshow'
import Link from 'next/link'

export default function HomePage() {
  return (
    <>
      {/* ANNOUNCEMENT */}
      <div className="announce">
        ✦ Envío gratis en pedidos mayores a ₡80,000 <span>·</span>
        Garantía oficial en todos los productos <span>·</span>
        <a href="#">Contactar por WhatsApp →</a>
      </div>

      {/* NAVBAR */}
      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">Tech<em>Avenue</em></Link>
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

      {/* MARQUEE */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[
            'NVIDIA RTX 5000 Series','AMD Ryzen 9000','DDR5 Gaming RAM',
            'NVMe Gen 5 SSD','Gabinetes ATX & ITX','Cooling AIO 360mm',
            'Fuentes 80+ Gold','Monitores 144Hz+',
            'NVIDIA RTX 5000 Series','AMD Ryzen 9000','DDR5 Gaming RAM',
            'NVMe Gen 5 SSD','Gabinetes ATX & ITX','Cooling AIO 360mm',
            'Fuentes 80+ Gold','Monitores 144Hz+',
          ].map((item, i) => (
            <div className="marquee-item" key={i}>
              <span className="marquee-dot">·</span> {item}
            </div>
          ))}
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
            { href: '/categoria/p
