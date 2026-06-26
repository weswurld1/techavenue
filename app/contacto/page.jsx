import Link from 'next/link'

export const metadata = {
  title: 'Contacto | TechAvenue CR',
  description: 'Escribinos por WhatsApp, correo o redes sociales. Atención de lunes a viernes de 8 a.m. a 6 p.m.',
}

export default function ContactoPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>
      <a href="/" className="page-back">← Inicio</a>

      <div style={{ marginBottom: 56 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Soporte</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Contacto
        </h1>
        <p style={{ fontSize: 16, color: 'var(--gray-600)', lineHeight: 1.7, maxWidth: 540, borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          Estamos para ayudarte. Escribinos por cualquiera de estos canales y te respondemos a la brevedad.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 48 }}>

        <a
          href="mailto:ventas@techavenuecr.com"
          style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '28px 24px', border: '1.5px solid var(--gray-200)', borderRadius: 10, textDecoration: 'none', background: 'var(--white)', transition: 'border-color 0.15s' }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Correo electrónico</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--black)', marginBottom: 4 }}>ventas@techavenuecr.com</div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Respuesta en 1–2 días hábiles</div>
          </div>
        </a>

        <a
          href="https://wa.me/50663409795"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '28px 24px', border: '1.5px solid var(--gray-200)', borderRadius: 10, textDecoration: 'none', background: 'var(--white)', transition: 'border-color 0.15s' }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 32 32" fill="#16A34A">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 2.824.738 5.47 2.031 7.772L0 32l8.469-2.219A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.32 22.72c-.347.977-2.025 1.867-2.773 1.936-.748.07-1.469.36-4.96-1.036-4.208-1.666-6.896-5.936-7.104-6.208-.208-.272-1.664-2.213-1.664-4.224 0-2.01 1.053-3.002 1.427-3.413.373-.41.813-.513 1.083-.513.27 0 .54.003.776.014.25.012.585-.095.916.699.347.824 1.179 2.84 1.283 3.047.104.207.174.45.035.726-.139.275-.208.446-.416.687-.207.24-.437.537-.624.721-.208.204-.424.424-.183.833.241.41 1.072 1.765 2.302 2.86 1.582 1.41 2.914 1.848 3.323 2.057.41.208.649.174.89-.104.24-.277.997-1.162 1.264-1.56.267-.4.534-.333.9-.2.366.133 2.338 1.102 2.738 1.302.4.2.665.3.765.467.1.167.1.958-.247 1.91z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>WhatsApp</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--black)', marginBottom: 4 }}>+506 6340-9795</div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Atención en tiempo real</div>
          </div>
        </a>

        <a
          href="https://instagram.com/techavenue.cr/"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '28px 24px', border: '1.5px solid var(--gray-200)', borderRadius: 10, textDecoration: 'none', background: 'var(--white)', transition: 'border-color 0.15s' }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA580C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#EA580C"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Instagram</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--black)', marginBottom: 4 }}>@techavenue.cr</div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Seguinos para novedades</div>
          </div>
        </a>

        <a
          href="https://facebook.com/profile.php?id=100070614230493"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'flex', alignItems: 'flex-start', gap: 18, padding: '28px 24px', border: '1.5px solid var(--gray-200)', borderRadius: 10, textDecoration: 'none', background: 'var(--white)', transition: 'border-color 0.15s' }}
        >
          <div style={{ width: 44, height: 44, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1E3A8A">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 4 }}>Facebook</div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 17, color: 'var(--black)', marginBottom: 4 }}>TechAvenue CR</div>
            <div style={{ fontSize: 13, color: 'var(--gray-600)' }}>Mensajes y publicaciones</div>
          </div>
        </a>

      </div>

      <div style={{ background: 'var(--gray-100)', borderRadius: 10, padding: '28px 32px', marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-600)', marginBottom: 16 }}>Horario de atención</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
          {[
            { dia: 'Lunes – Viernes', hora: '8:00 a.m. – 6:00 p.m.' },
            { dia: 'Sábados', hora: '9:00 a.m. – 2:00 p.m.' },
            { dia: 'Domingos y feriados', hora: 'Cerrado' },
          ].map(({ dia, hora }) => (
            <div key={dia}>
              <div style={{ fontSize: 13, color: 'var(--gray-600)', marginBottom: 2 }}>{dia}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: hora === 'Cerrado' ? 'var(--gray-400)' : 'var(--black)' }}>{hora}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--gray-200)', paddingTop: 40 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 12 }}>Garantías y soporte técnico</div>
        <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: 20 }}>
          ¿Tenés un problema con un producto? Contactanos por WhatsApp con tu número de orden y te asistimos en el proceso de garantía.
        </p>
        <Link href="/garantias" style={{ fontSize: 14, fontWeight: 600, color: '#1E3A8A', textDecoration: 'none' }}>
          Ver política de garantía →
        </Link>
      </div>


    </div>
  )
}
