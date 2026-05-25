export default function OrdenConfirmadaPage() {
  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '64px 32px',
      textAlign: 'center',
    }}>
      <div style={{
        fontSize: 64,
        marginBottom: 24,
      }}>✅</div>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(36px, 5vw, 56px)',
        color: 'var(--black)',
        marginBottom: 16,
        letterSpacing: '-0.02em',
      }}>
        ¡Orden confirmada!
      </h1>
      <p style={{
        color: 'var(--gray-400)',
        fontSize: 15,
        marginBottom: 32,
      }}>
        Gracias por tu compra. Te contactaremos pronto con los detalles.
      </p>
      <a href="/" style={{
        background: 'var(--black)',
        color: 'var(--white)',
        padding: '13px 28px',
        borderRadius: 5,
        fontWeight: 600,
        fontSize: 14,
        textDecoration: 'none',
      }}>
        Volver al inicio
      </a>
    </div>
  )
}
