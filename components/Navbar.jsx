import Link from 'next/link'
import SearchOverlay from './SearchOverlay'

export default function Navbar() {
  return (
    <>
      <div className="announce">
        ✦ Envío gratis en pedidos cancelados contra entrega <span>·</span>
        Garantía oficial en todos los productos <span>·</span>
        <a href="#">Contactar por WhatsApp →</a>
      </div>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="logo">
            <span style={{color:'#F9BE16'}}>Tech</span><em>Avenue</em>
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
            <a href="/carrito" className="nav-icon-btn" aria-label="Carrito" style={{position:'relative'}}>
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
               <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
               <path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
             </svg>
            <span className="cart-count">0</span>
          </a>
          </div>
        </div>
      </nav>
    </>
  )
}