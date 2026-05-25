export default function CheckoutPage() {
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
        Checkout
      </h1>
      <p style={{
        color: 'var(--gray-400)',
        fontSize: 14,
      }}>
        El proceso de pago estará disponible próximamente.
      </p>
    </div>
  )
}
