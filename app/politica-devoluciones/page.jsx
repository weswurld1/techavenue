export default function PoliticaDevolucionesPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Soporte</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Política de<br />Devoluciones
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          Última actualización: 2026 · techavenuecr.com
        </p>
      </div>

      {/* Proceso */}
      <div style={{ marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid var(--gray-200)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 20 }}>
          ¿Cómo funciona?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 12 }}>
          {[
            { n: '01', t: 'Contactanos',       d: 'Escribinos por WhatsApp o correo dentro de los 30 días.' },
            { n: '02', t: 'Validación',         d: 'Revisamos tu caso y validamos si aplica para devolución.' },
            { n: '03', t: 'Envío del producto', d: 'Te indicamos cómo enviar el producto en empaque original.' },
            { n: '04', t: 'Reembolso',          d: 'Procesamos el reembolso o nota de crédito una vez aprobado.' },
          ].map((p) => (
            <div key={p.n} style={{ border: '1px solid var(--gray-200)', borderTop: '3px solid #1E3A8A', borderRadius: 8, padding: '24px 20px', background: 'var(--white)' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 40, color: 'var(--gray-200)', lineHeight: 1, marginBottom: 12, letterSpacing: '-0.03em' }}>{p.n}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 6 }}>{p.t}</div>
              <div style={{ fontSize: 13, color: 'var(--gray-600)', lineHeight: 1.65 }}>{p.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* No aplica / Reembolsos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid var(--gray-200)' }}>

        <div style={{ border: '1px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ background: 'var(--black)', padding: '16px 20px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>No aplica devolución</span>
          </div>
          {[
            'Productos personalizados o por encargo especial',
            'Software, licencias digitales o códigos activados',
            'Productos con daños físicos o señales de manipulación',
            'Productos incompletos o sin empaque original',
          ].map((item, i, arr) => (
            <div key={i} style={{ padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--gray-200)' : 'none', display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--gray-800)', lineHeight: 1.5 }}>
              <span style={{ color: '#DC2626', fontWeight: 700, flexShrink: 0 }}>✕</span>
              {item}
            </div>
          ))}
        </div>

        <div style={{ border: '1px solid var(--gray-200)', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ background: '#1E3A8A', padding: '16px 20px' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Reembolsos y notas de crédito</span>
          </div>
          {[
            'Procesamos reembolso o nota de crédito una vez aprobado',
            'Los tiempos varían según el método de pago utilizado',
            'Los costos de envío no son reembolsables',
            'Excepción: error nuestro o garantía aprobada',
          ].map((item, i, arr) => (
            <div key={i} style={{ padding: '13px 20px', borderBottom: i < arr.length - 1 ? '1px solid var(--gray-200)' : 'none', display: 'flex', gap: 10, fontSize: 13.5, color: 'var(--gray-800)', lineHeight: 1.5 }}>
              <span style={{ color: '#1E3A8A', fontWeight: 700, flexShrink: 0 }}>→</span>
              {item}
            </div>
          ))}
        </div>

      </div>

      {/* CTA */}
      <div style={{ background: '#0d0d0d', borderRadius: 8, padding: '40px 40px', display: 'flex', gap: 40, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(24px, 3vw, 34px)', color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: 8 }}>
            ¿Necesitás ayuda<br />con tu devolución?
          </div>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', margin: 0 }}>
            Nuestro equipo te acompaña en todo el proceso.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>

          <a href="https://wa.me/50663409795" target="_blank" rel="noreferrer" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 5, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 13.5, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <svg width="16" height="16" viewBox="0 0 32 32" fill="#25D366">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/>
            </svg>
            WhatsApp
          </a>

          <a href="mailto:ventas@techavenuecr.com" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 5, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 10, color: '#fff', fontSize: 13.5, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            Correo electrónico
          </a>

        </div>
      </div>

      <a href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--black)', color: 'var(--white)', padding: '12px 24px', borderRadius: 5, fontWeight: 600, fontSize: 14, textDecoration: 'none', marginTop: 40 }}>
        ← Volver al inicio
      </a>

    </div>
  )
}
