export const metadata = {
  title: 'Quiénes Somos | TechAvenue CR',
  description: 'TechAvenue es tu tienda de tecnología en Costa Rica. Conocé nuestra misión, visión y valores.',
}

export default function QuienesSomosPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>
      <a href="/" className="page-back">← Inicio</a>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Nosotros</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Quiénes<br />Somos
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          TechAvenue · Tienda costarricense de tecnología
        </p>
      </div>

      {[
        {
          title: 'Nuestra identidad',
          content: 'En TechAvenue creemos que la tecnología no es solo una herramienta, sino parte de la experiencia diaria de quienes buscan rendimiento, diseño e innovación. Somos una tienda tecnológica costarricense enfocada en hardware gaming, componentes premium, periféricos y productos de alto desempeño para entusiastas, gamers y creadores.'
        },
        {
          title: 'Nuestro objetivo',
          content: 'Aunque somos una marca en crecimiento, nuestro objetivo es claro: ofrecer una experiencia de compra moderna, segura y confiable, combinando atención personalizada, productos de calidad y precios competitivos.'
        },
        {
          title: 'Lo que nos mueve',
          content: 'Trabajamos constantemente para brindar acceso a productos tecnológicos premium en Costa Rica, seleccionando cuidadosamente nuestros productos y manteniendo un enfoque en rendimiento, estética y confianza.',
          items: [
            { term: 'Rendimiento', def: 'Seleccionamos cada producto para garantizar el mejor desempeño en gaming y creación de contenido.' },
            { term: 'Confianza', def: 'Transparencia en cada compra. Productos reales, precios competitivos y atención personalizada.' },
            { term: 'Comunidad', def: 'Buscamos construir una comunidad apasionada por el gaming, los setups y el hardware de nueva generación.' },
          ]
        },
        {
          title: 'Nuestra visión',
          content: 'Más que vender tecnología, buscamos construir una comunidad apasionada por el gaming, los setups y el hardware de nueva generación, ofreciendo una experiencia en la que nuestros clientes puedan confiar.'
        },
      ].map((section, i) => (
        <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--gray-200)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 14 }}>
            {section.title}
          </h2>
          {section.content && (
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: section.items ? 20 : 0 }}>{section.content}</p>
          )}
          {section.items && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {section.items.map((item, j) => (
                <div key={j} style={{ paddingLeft: 16, borderLeft: '3px solid #1E3A8A' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 4 }}>{item.term}</div>
                  <div style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>{item.def}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

    </div>
  )
}