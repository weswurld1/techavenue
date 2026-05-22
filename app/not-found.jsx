export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      fontFamily: 'sans-serif',
      gap: '16px'
    }}>
      <h1 style={{ fontSize: '72px', fontWeight: 800, margin: 0 }}>404</h1>
      <p style={{ color: '#6b6b6b' }}>Esta página no existe.</p>
      <a href="/" style={{
        background: '#0d0d0d',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '5px',
        textDecoration: 'none',
        fontWeight: 600
      }}>
        Volver al inicio
      </a>
    </div>
  )
}
