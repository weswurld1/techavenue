export const metadata = {
  title: 'Centro de Ayuda | TechAvenue CR',
  description: 'Encontrá respuestas sobre pedidos, envíos, pagos, devoluciones y más en nuestro centro de ayuda.',
}

export default function CentroAyudaPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>
      <a href="/" className="page-back">← Inicio</a>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Soporte</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Centro de<br />Ayuda
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          TechAvenue · Respuestas a tus preguntas frecuentes
        </p>
      </div>

      {[
        {
          title: 'Pedidos y compras',
          items: [
            { q: '¿Cómo realizo un pedido?', a: 'Navegá por nuestro catálogo, agregá los productos que querés al carrito y seguí el proceso de checkout. Completás tus datos de entrega y confirmás el pedido. Recibirás un correo con los datos para realizar la transferencia bancaria.' },
            { q: '¿Cuáles son los métodos de pago disponibles?', a: 'Actualmente aceptamos transferencia bancaria al Banco Promerica (IBAN: CR53010200009691543011) a nombre de Juan Paulo Ulate Barcelli. Próximamente habilitaremos más métodos de pago.' },
            { q: '¿Puedo modificar o cancelar mi pedido?', a: 'Podés modificar o cancelar tu pedido siempre que no haya sido procesado aún. Contactanos por WhatsApp o correo a ventas@techavenuecr.com lo antes posible con tu número de orden.' },
            { q: '¿Cómo sé si mi pedido fue confirmado?', a: 'Al completar el checkout recibirás un correo de confirmación con tu número de orden. También podés contactarnos por WhatsApp para verificar el estado de tu pedido.' },
          ]
        },
        {
          title: 'Envíos y entregas',
          items: [
            { q: '¿Cuánto cuesta el envío?', a: 'El envío es completamente gratis en todos los pedidos a cualquier parte de Costa Rica.' },
            { q: '¿Cuánto tiempo tarda en llegar mi pedido?', a: 'Los pedidos confirmados antes de las 5:30 p.m. se procesan el mismo día hábil. Después de esa hora se procesan el siguiente día hábil. Los tiempos de entrega varían según la provincia.' },
            { q: '¿Hacen entregas a todo Costa Rica?', a: 'Sí, realizamos entregas a todas las provincias de Costa Rica. Los tiempos y coordinación de entrega se gestionan directamente con el cliente por WhatsApp.' },
            { q: '¿Cómo coordino la entrega?', a: 'Una vez confirmado tu pedido y verificado el pago, nuestro equipo te contactará por WhatsApp para coordinar la entrega en la dirección que indicaste.' },
          ]
        },
        {
          title: 'Productos y garantías',
          items: [
            { q: '¿Los productos tienen garantía?', a: 'Sí, todos los productos incluyen garantía oficial del fabricante. El tiempo de garantía varía según la marca y el tipo de producto.' },
            { q: '¿Cómo verifico si un producto es compatible con mi equipo?', a: 'Podés consultarnos por WhatsApp antes de realizar tu compra. Nuestro equipo te ayuda a verificar compatibilidad entre componentes para que armes el setup ideal.' },
            { q: '¿Los productos son originales?', a: 'Sí, todos nuestros productos son 100% originales y provienen de proveedores autorizados. Nunca vendemos productos falsificados ni de dudosa procedencia.' },
            { q: '¿Tienen stock disponible en tiempo real?', a: 'Sí, nuestro inventario se actualiza constantemente. Si un producto aparece disponible en el sitio, está en stock. Si tenés dudas podés consultarnos por WhatsApp.' },
          ]
        },
        {
          title: 'Pagos y transferencias',
          items: [
            { q: '¿Cómo realizo la transferencia bancaria?', a: 'Al confirmar tu pedido recibirás los datos bancarios completos: Banco Promerica, IBAN CR53010200009691543011, a nombre de Juan Paulo Ulate Barcelli. Transferís el monto exacto del pedido.' },
            { q: '¿Debo enviar el comprobante de pago?', a: 'Sí, una vez realizada la transferencia envianos el comprobante por WhatsApp junto con tu número de orden para agilizar el proceso.' },
            { q: '¿Qué pasa si me equivoco en el monto de la transferencia?', a: 'Contactanos inmediatamente por WhatsApp o correo a ventas@techavenuecr.com con tu número de orden y el comprobante de la transferencia para resolver el inconveniente.' },
          ]
        },
        {
          title: 'Devoluciones y cambios',
          items: [
            { q: '¿Puedo devolver un producto?', a: 'Aceptamos devoluciones dentro de los 30 días posteriores a la entrega, siempre que el producto esté en perfecto estado, con su empaque original y sin señales de uso. Consultá nuestra Política de Devoluciones para más detalles.' },
            { q: '¿Cómo solicito una devolución?', a: 'Contactanos por WhatsApp o correo a ventas@techavenuecr.com indicando tu número de orden y el motivo de la devolución. Nuestro equipo te guiará en el proceso.' },
            { q: '¿Cuánto tiempo tarda el reembolso?', a: 'Una vez aprobada la devolución, procesamos el reembolso o nota de crédito. Los tiempos pueden variar según el banco.' },
          ]
        },
        {
          title: 'Contacto y soporte',
          items: [
            { q: '¿Cómo puedo contactarlos?', a: 'Podés contactarnos por WhatsApp al +506 6340-9795 o por correo a ventas@techavenuecr.com. También podés escribirnos por Instagram o Facebook.' },
            { q: '¿Cuál es el horario de atención?', a: 'Atendemos de lunes a viernes. Los pedidos se procesan en días hábiles antes de las 5:30 p.m. Para consultas urgentes podés escribirnos por WhatsApp.' },
            { q: '¿Tienen tienda física?', a: 'Por el momento somos una tienda 100% en línea. Todas las compras se realizan a través de techavenuecr.com y las entregas se coordinan directamente con el cliente.' },
          ]
        },
      ].map((section, i) => (
        <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--gray-200)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 20 }}>
            {section.title}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {section.items.map((item, j) => (
              <div key={j} style={{ paddingLeft: 16, borderLeft: '3px solid #1E3A8A' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 6 }}>{item.q}</div>
                <div style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{
        background: '#0d0d0d',
        borderRadius: 8,
        padding: '32px',
        marginBottom: 32,
        textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, color: '#fff', marginBottom: 8 }}>
          ¿No encontraste tu respuesta?
        </div>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
          Nuestro equipo está listo para ayudarte.
        </p>
        <a href="https://wa.me/50663409795" target="_blank" rel="noreferrer" style={{
          display: 'inline-block',
          background: '#25D366',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: 6,
          fontWeight: 600,
          fontSize: 14,
          textDecoration: 'none',
        }}>
          Contactar por WhatsApp
        </a>
      </div>

    </div>
  )
}