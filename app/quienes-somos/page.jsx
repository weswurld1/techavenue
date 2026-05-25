export default function QuienesSomosPage() {
  return (
    <>
      {/* HERO */}
      <div style={{
        background: '#0d0d0d',
        padding: '80px 32px 72px',
        textAlign: 'center',
      }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(249,190,22,0.12)',
          border: '1px solid rgba(249,190,22,0.3)',
          borderRadius: 4,
          padding: '5px 14px',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#F9BE16',
          marginBottom: 24,
        }}>
          Tienda costarricense
        </span>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          fontSize: 'clamp(48px, 7vw, 88px)',
          lineHeight: 0.9,
          color: '#ffffff',
          letterSpacing: '-0.02em',
          marginBottom: 20,
        }}>
          Quiénes<br />
          <span style={{ color: '#F9BE16' }}>somos.</span>
        </h1>
        <p style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.45)',
          maxWidth: 520,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Tecnología premium para gamers, entusiastas y creadores en Costa Rica.
        </p>
      </div>

      {/* STATS */}
      <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            { num: '100%', label: 'Productos de calidad premium' },
            { num: 'CR',   label: 'Tienda costarricense' },
            { num: '24/7', label: 'Soporte al cliente' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '36px 24px',
              borderRight: i < 2 ? '1px solid var(--gray-200)' : 'none',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: 44,
                color: 'var(--black)',
                lineHeight: 1,
                letterSpacing: '-0.03em',
              }}>
                {s.num}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--gray-600)', marginTop: 6, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px' }}>

        {/* INTRO */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          marginBottom: 72,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 8 }}>Nuestra historia</div>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              color: 'var(--black)',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: 24,
            }}>
              Tecnología que forma parte de tu día a día.
            </h2>
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 16 }}>
              En TechAvenue creemos que la tecnología no es solo una herramienta, sino parte de la experiencia diaria de quienes buscan rendimiento, diseño e innovación.
            </p>
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8 }}>
              Somos una tienda tecnológica costarricense enfocada en hardware gaming, componentes premium, periféricos y productos de alto desempeño para entusiastas, gamers y creadores.
            </p>
          </div>
          <div style={{
            background: '#0d0d0d',
            borderRadius: 8,
            padding: '48px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: 0, left: 0, right: 0,
              height: 3,
              background: '#F9BE16',
            }} />
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(22px, 2.5vw, 30px)',
              color: '#ffffff',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              marginBottom: 20,
            }}>
              "Más que vender tecnología, buscamos construir una comunidad apasionada."
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              — TechAvenue
            </div>
          </div>
        </div>

        {/* VALORES */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 8 }}>Lo que nos define</div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 'clamp(26px, 3vw, 36px)',
            color: 'var(--black)',
            letterSpacing: '-0.01em',
            marginBottom: 32,
          }}>
            Nuestro enfoque
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}>
            {[
              { n: '01', t: 'Rendimiento',   d: 'Seleccionamos cuidadosamente cada producto para garantizar el mejor desempeño en gaming y creación de contenido.', color: '#F9BE16' },
              { n: '02', t: 'Confianza',     d: 'Transparencia en cada compra. Productos reales, precios competitivos y atención personalizada en cada paso.', color: '#1E3A8A' },
              { n: '03', t: 'Comunidad',     d: 'Buscamos construir una comunidad apasionada por el gaming, los setups y el hardware de nueva generación.', color: '#F9BE16' },
            ].map((v, i) => (
              <div key={i} style={{
                border: '1px solid var(--gray-200)',
                borderTop: `3px solid ${v.color}`,
                borderRadius: '0 0 8px 8px',
                padding: '32px 24px',
                background: 'var(--white)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 52,
                  color: 'var(--gray-200)',
                  lineHeight: 1,
                  marginBottom: 16,
                  letterSpacing: '-0.03em',
                }}>{v.n}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--black)', marginBottom: 10 }}>{v.t}</div>
                <div style={{ fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.65 }}>{v.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* MISION */}
        <div style={{
          background: 'var(--gray-100)',
          border: '1px solid var(--gray-200)',
          borderRadius: 8,
          padding: '48px',
          marginBottom: 72,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 8 }}>Nuestra misión</div>
          <p style={{ fontSize: 16, color: 'var(--gray-800)', lineHeight: 1.8, maxWidth: 700, marginBottom: 16 }}>
            Trabajamos constantemente para brindar acceso a productos tecnológicos premium en Costa Rica, seleccionando cuidadosamente nuestros productos y manteniendo un enfoque en rendimiento, estética y confianza.
          </p>
          <p style={{ fontSize: 16, color: 'var(--gray-800)', lineHeight: 1.8, maxWidth: 700 }}>
            Aunque somos una marca en crecimiento, nuestro objetivo es claro: ofrecer una experiencia de compra moderna, segura y confiable, combinando atención personalizada, productos de calidad y precios competitivos.
          </p>
        </div>

        {/* CTA */}
        <div style={{
          background: '#0d0d0d',
          borderRadius: 8,
          padding: '52px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              color: '#ffffff',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              marginBottom: 12,
            }}>
              Bienvenido a<br />
              <span style={{ color: '#F9BE16' }}>TechAvenue.</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              Explorá nuestro catálogo y encontrá los componentes perfectos para tu setup.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            <a href="/" style={{
              background: '#F9BE16',
              color: '#0d0d0d',
              borderRadius: 5,
              padding: '13px 28px',
              fontWeight: 700,
              fontSize: 14,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}>
              ← Volver al inicio
            </a>
            <a href="/categoria/gpu" style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 5,
              padding: '13px 28px',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
            }}>
              Ver catálogo →
            </a>
          </div>
        </div>

      </div>
    </>
  )
}