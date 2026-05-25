export default function BuscarPage() {
  return (
    <div style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '64px 32px',
    }}>
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 800,
        fontSize: 'clamp(36px, 5vw, 56px)',
        color: 'var(--black)',
        marginBottom: 32,
        letterSpacing: '-0.02em',
      }}>
        Buscar productos
      </h1>
      <input
        type="text"
        placeholder="Buscar por nombre, marca o categoría..."
        style={{
          width: '100%',
          padding: '14px 20px',
          fontSize: 15,
          border: '1.5px solid var(--gray-200)',
          borderRadius: 6,
          outline: 'none',
          fontFamily: 'var(--font-body)',
        }}
      />
      <p style={{
        marginTop: 48,
        color: 'var(--gray-400)',
        fontSize: 14,
      }}>
        Los resultados aparecerán aquí cuando se conecte la API de productos.
      </p>
    </div>
  )
}
