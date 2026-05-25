'use client'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function ConfirmacionContent() {
  const params = useSearchParams()
  const orden = params.get('orden') || 'TA-000000'
  const total = Number(params.get('total')) || 0
  const nombre = params.get('nombre') || 'Cliente'

  const mensajeWA = `Hola! Acabo de realizar un pedido en TechAvenue. Mi número de orden es ${orden} por un total de ₡${total.toLocaleString('es-CR')}. Adjunto el comprobante de transferencia.`

  return (
    <div style={{ maxWidth: 520, margin: '0 auto', padding: '72px 32px 96px', textAlign: 'center' }}>

      <div style={{ width: 64, height: 64, background: '#EEF2FF', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1E3A8A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
      </div>

      <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px, 5vw, 48px)', color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 10 }}>
        ¡Pedido confirmado!
      </h1>
      <p style={{ color: 'var(--gray-600)', fontSize: 15, marginBottom: 28, lineHeight: 1.6 }}>
        Gracias por tu compra, <strong>{nombre}</strong>. Realizá la transferencia con los datos de abajo y envianos el comprobante por WhatsApp.
      </p>

      <div style={{ background: '#EEF2FF', borderRadius: 8, padding: '16px 24px', marginBottom: 24, display: 'inline-block' }}>
        <div style={{ fontSize: 11, color: '#3730A3', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>Número de orden</div>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#1E3A8A', letterSpacing: '-0.01em' }}>{orden}</div>
      </div>

      <div style={{ background: 'var(--gray-100)', borderRadius: 8, padding: '16px 24px', marginBottom: 16, textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{ fontSize: 13, color: 'var(--gray-600)' }}>Total a transferir</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: 'var(--black)' }}>₡{total.toLocaleString('es-CR')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#16a34a', fontWeight: 600, marginTop: 6 }}>
          <span>Envío</span><span>Gratis 🎉</span>
        </div>
      </div>

      <div style={{ background: '#EEF2FF', border: '1px solid #C7D2FE', borderRadius: 8, padding: '16px 20px', marginBottom: 24, textAlign: 'left' }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 12 }}>
          Datos para tu transferencia bancaria
        </div>
        <table style={{ width: '100%', fontSize: 13, borderCollapse: 'collapse' }}>
          <tbody>
            <tr><td style={{ color: '#6b6b6b', padding: '4px 0', width: 110 }}>Banco</td><td style={{ fontWeight: 600, color: '#1E3A8A' }}>Banco Promerica</td></tr>
            <tr><td style={{ color: '#6b6b6b', padding: '4px 0' }}>IBAN</td><td style={{ fontWeight: 600, color: '#1E3A8A' }}>CR53010200009691543011</td></tr>
            <tr><td style={{ color: '#6b6b6b', padding: '4px 0' }}>A nombre de</td><td style={{ fontWeight: 600, color: '#1E3A8A' }}>Juan Paulo Ulate Barcelli</td></tr>
            <tr><td style={{ color: '#6b6b6b', padding: '4px 0' }}>Monto exacto</td><td style={{ fontWeight: 700, color: '#1E3A8A', fontSize: 15 }}>₡{total.toLocaleString('es-CR')}</td></tr>
          </tbody>
        </table>
      </div>

      <div style={{ background: '#FFF8E1', border: '1px solid #F9BE16', borderRadius: 8, padding: '12px 16px', marginBottom: 24, fontSize: 13, color: '#7D5A00', textAlign: 'left' }}>
        📧 Revisá tu correo — te enviamos la confirmación con todos los detalles.
      </div>

      <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
        
          href={`https://wa.me/50663409795?text=' + {encodeURIComponent(mensajeWA)}}
          target="_blank"
          rel="noreferrer"
          style={{ background: '#25D366', color: '#fff', padding: '12px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}
        >
          Enviar comprobante por WhatsApp
        </a>
        <Link href="/" style={{ background: 'var(--black)', color: '#fff', padding: '12px 20px', borderRadius: 6, textDecoration: 'none', fontWeight: 600, fontSize: 13 }}>
          Seguir comprando →
        </Link>
      </div>
    </div>
  )
}

export default function OrdenConfirmadaPage() {
  return (
    <Suspense>
      <ConfirmacionContent />
    </Suspense>
  )
}