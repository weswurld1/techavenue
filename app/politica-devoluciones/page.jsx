export default function PoliticaDevolucionesPage() {
  return (
    <>
      {/* ── HERO ── */}
      <div style={{
        background: '#0d0d0d',
        padding: '80px 32px 72px',
        textAlign: 'center',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(30,58,138,0.15)',
          border: '1px solid rgba(30,58,138,0.3)',
          borderRadius: 4,
          padding: '5px 14px',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#6B8FD4',
          marginBottom: 24,
        }}>
          ← Soporte al cliente
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
          Política de<br />
          <span style={{ color: '#1E3A8A' }}>Devoluciones</span>
        </h1>
        <p style={{
          fontSize: 16,
          color: 'rgba(255,255,255,0.45)',
          maxWidth: 480,
          margin: '0 auto',
          lineHeight: 1.7,
        }}>
          Queremos que tu compra sea perfecta. Si algo no está bien, acá explicamos cómo te ayudamos.
        </p>
      </div>

      {/* ── STATS ROW ── */}
      <div style={{ borderBottom: '1px solid var(--gray-200)' }}>
        <div style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 32px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}>
          {[
            { num: '30',   unit: 'días',    label: 'para solicitar devolución' },
            { num: '100%', unit: '',         label: 'respaldo en garantías' },
            { num: '24h',  unit: '',         label: 'respuesta máxima' },
            { num: '3',    unit: 'canales',  label: 'de contacto disponibles' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '36px 24px',
              borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none',
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
                {s.unit && <span style={{ fontSize: 20, color: '#1E3A8A', marginLeft: 2 }}>{s.unit}</span>}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--gray-600)', marginTop: 6, fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '72px 32px' }}>

        {/* INFO NOTE */}
        <div style={{
          background: 'rgba(30,58,138,0.04)',
          border: '1px solid rgba(30,58,138,0.15)',
          borderLeft: '4px solid #1E3A8A',
          borderRadius: '0 6px 6px 0',
          padding: '20px 24px',
          marginBottom: 64,
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
        }}>
          <p style={{ fontSize: 14, color: '#2a2a2a', lineHeight: 1.7, margin: 0 }}>
            <strong>¿Dudas antes de comprar?</strong> Nuestro equipo puede ayudarte a verificar compatibilidad entre componentes antes de hacer tu pedido. Contactanos por WhatsApp o correo.
          </p>
        </div>

        {/* PROCESO */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 6 }}>Proceso</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 28 }}>¿Cómo funciona?</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid var(--gray-200)',
            borderRadius: 6,
            overflow: 'hidden',
          }}>
            {[
              { n: '01', t: 'Contactanos',        d: 'Escribinos por WhatsApp, correo o formulario dentro de los 30 días.' },
              { n: '02', t: 'Validación',          d: 'Revisamos tu caso y validamos si aplica para devolución.' },
              { n: '03', t: 'Envío del producto',  d: 'Te indicamos cómo enviar el producto en empaque original y completo.' },
              { n: '04', t: 'Reembolso',           d: 'Procesamos el reembolso o nota de crédito una vez aprobado.' },
            ].map((p, i) => (
              <div key={i} style={{
                padding: '32px 24px',
                borderRight: i < 3 ? '1px solid var(--gray-200)' : 'none',
                background: i % 2 === 0 ? 'var(--white)' : 'var(--gray-100)',
              }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 64, color: 'var(--gray-200)', lineHeight: 1, marginBottom: 16, letterSpacing: '-0.03em' }}>{p.n}</div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: 'var(--black)', marginBottom: 8 }}>{p.t}</div>
                <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.65 }}>{p.d}</div>
              </div>
            ))}
          </div>
        </div>

        {/* DOS COLUMNAS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 72 }}>

          {/* No aplica */}
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ background: 'var(--black)', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>✕ No aplica devolución</span>
            </div>
            {[
              'Productos personalizados o por encargo especial',
              'Software, licencias digitales o códigos activados',
              'Productos con daños físicos o señales de manipulación',
              'Productos incompletos o sin empaque original',
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px 22px', borderBottom: i < 3 ? '1px solid var(--gray-200)' : 'none', display: 'flex', gap: 12, fontSize: 13.5, color: 'var(--gray-800)', lineHeight: 1.5 }}>
                <span style={{ color: '#dc2626', fontWeight: 700, flexShrink: 0 }}>✕</span>
                {item}
              </div>
            ))}
          </div>

          {/* Reembolsos */}
          <div style={{ border: '1px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
            <div style={{ background: '#1E3A8A', padding: '18px 22px', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>→ Reembolsos y notas de crédito</span>
            </div>
            {[
              'Procesamos reembolso o nota de crédito una vez aprobado',
              'Los tiempos varían según el método de pago utilizado',
              'Los costos de envío no son reembolsables',
              'Excepción: error nuestro o garantía aprobada',
            ].map((item, i) => (
              <div key={i} style={{ padding: '14px 22px', borderBottom: i < 3 ? '1px solid var(--gray-200)' : 'none', display: 'flex', gap: 12, fontSize: 13.5, color: 'var(--gray-800)', lineHeight: 1.5 }}>
                <span style={{ color: '#1E3A8A', fontWeight: 700, flexShrink: 0 }}>→</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* TIEMPOS */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 6 }}>Logística</div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(26px, 3vw, 36px)', color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 28 }}>Tiempos de procesamiento</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[
              { title: 'Antes de 5:30 p.m.',    desc: 'Pedidos confirmados antes de esa hora se procesan el mismo día hábil.',  dot: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
              { title: 'Después de 5:30 p.m.',  desc: 'Se procesan el siguiente día hábil.',                                     dot: '#d97706', bg: '#fffbeb', border: '#fde68a' },
              { title: 'Sábado o Domingo',       desc: 'Pedidos del fin de semana se procesan el Lunes.',                        dot: '#6b6b6b', bg: 'var(--gray-100)', border: 'var(--gray-200)' },
            ].map((t, i) => (
              <div key={i} style={{ background: t.bg, border: `1px solid ${t.border}`, borderRadius: 6, padding: '28px 24px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.dot, marginBottom: 14 }} />
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 18, color: 'var(--black)', marginBottom: 8, letterSpacing: '-0.01em' }}>{t.title}</div>
                <div style={{ fontSize: 13.5, color: 'var(--gray-600)', lineHeight: 1.65 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT CTA */}
        <div style={{
          background: 'var(--black)',
          borderRadius: 8,
          padding: '52px 48px',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 40,
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px, 3.5vw, 42px)', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 12 }}>
              ¿Necesitás ayuda<br />con tu devolución?
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
              Nuestro equipo está disponible para acompañarte en todo el proceso.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
            {[
              { label: 'WhatsApp',             href: 'https://wa.me/TUNUMERO' },
              { label: 'Correo electrónico',   href: 'mailto:info@techavenue.com' },
              { label: 'Formulario de contacto', href: '/contacto' },
            ].map((c) => (
              <a key={c.label} href={c.href} style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 5,
                padding: '11px 20px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#fff',
                fontSize: 13.5,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                textDecoration: 'none',
              }}>
                {c.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </>
  )
}