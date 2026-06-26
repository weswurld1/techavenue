export default function TerminosServicioPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>
      <a href="/" className="page-back">← Inicio</a>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Términos y<br />Condiciones de Uso
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          Última actualización: 2026 · techavenuecr.com
        </p>
      </div>

      {[
        {
          title: 'Aceptación de los Términos',
          content: 'Toda persona que acceda y utilice el sitio web techavenuecr.com acepta expresamente los presentes Términos y Condiciones de Uso, así como las demás políticas, lineamientos y disposiciones publicadas en el sitio, las cuales forman parte integral de este acuerdo. El uso del sitio implica la aceptación total y obligatoria de estas condiciones entre TechAvenue y el usuario. En caso de no estar de acuerdo con cualquiera de los términos aquí establecidos, el usuario deberá abstenerse de utilizar el sitio web y sus servicios.'
        },
        {
          title: 'Definiciones',
          content: null,
          items: [
            { term: 'TechAvenue', def: 'Plataforma digital dedicada a la comercialización de productos físicos y tecnológicos ofrecidos directamente o mediante proveedores autorizados.' },
            { term: 'Usuario', def: 'Toda persona física mayor de edad que navegue o realice compras en techavenuecr.com. Se presume que el usuario cuenta con capacidad legal y financiera suficiente para realizar transacciones.' },
            { term: 'Producto', def: 'Cualquier artículo físico, accesorio, componente tecnológico o mercancía ofrecida dentro del sitio web.' },
            { term: 'Número de Orden', def: 'Código único asignado a cada compra realizada por el usuario para efectos de control, seguimiento y gestión del pedido.' },
          ]
        },
        {
          title: 'Compra y Pago de Productos',
          content: 'Al realizar una compra, el usuario acepta pagar el monto indicado del producto, así como los costos adicionales de envío cuando corresponda. Todos los precios estarán expresados en colones costarricenses. TechAvenue podrá aceptar pagos mediante tarjetas de crédito, débito, transferencias bancarias, SINPE u otros métodos habilitados dentro del sitio. Aunque realizamos esfuerzos razonables para mantener información correcta, algunos productos podrían presentar errores involuntarios en precio o descripción. En caso de detectarse un precio incorrecto, TechAvenue podrá contactar al usuario para confirmar si desea continuar con la compra al precio correcto o proceder con la cancelación y devolución del dinero pagado.'
        },
        {
          title: 'Entregas y Envíos',
          content: 'Los productos adquiridos podrán ser enviados al domicilio, oficina o dirección indicada por el usuario. Los tiempos y costos de envío pueden variar según ubicación y disponibilidad logística. Una vez confirmado el pago, el usuario recibirá una notificación con el número de orden y el detalle de la compra realizada. El usuario contará con un plazo de cuarenta y ocho (48) horas posteriores a la entrega para reportar daños, errores o inconformidades relacionadas con el producto recibido.'
        },
        {
          title: 'Seguridad de la Información',
          content: 'TechAvenue implementa medidas de seguridad para proteger la información personal y financiera de los usuarios. Las transacciones realizadas dentro del sitio utilizan protocolos de seguridad y cifrado para proteger los datos transmitidos. La información proporcionada será utilizada únicamente para procesar compras, validaciones y gestiones relacionadas con el servicio, conforme a la legislación costarricense aplicable, incluyendo la Ley 8968 de Protección de la Persona frente al Tratamiento de sus Datos Personales.'
        },
        {
          title: 'Responsabilidad y Propiedad Intelectual',
          content: 'TechAvenue procura brindar descripciones, imágenes, especificaciones y disponibilidad lo más precisas posible. En la máxima medida permitida por la legislación aplicable, TechAvenue no será responsable por daños directos o indirectos derivados del uso o imposibilidad de uso del sitio web. Todo el contenido disponible en techavenuecr.com, incluyendo imágenes, textos, logotipos, diseños, gráficos y elementos visuales, se encuentra protegido por las leyes de propiedad intelectual y derechos de autor vigentes en Costa Rica. Queda prohibida la reproducción, distribución, modificación o uso comercial del contenido sin autorización previa y por escrito de TechAvenue.'
        },
        {
          title: 'Modificaciones de los Términos',
          content: 'TechAvenue podrá actualizar, modificar o reemplazar estos Términos y Condiciones en cualquier momento y sin previo aviso. Las modificaciones entrarán en vigencia desde su publicación en el sitio web. El uso continuo de techavenuecr.com después de cualquier actualización implicará la aceptación de los nuevos términos por parte del usuario.'
        },
      ].map((section, i) => (
        <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--gray-200)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 14 }}>
            {section.title}
          </h2>
          {section.content && (
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8 }}>{section.content}</p>
          )}
          {section.items && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
              {section.items.map((item, j) => (
                <div key={j} style={{ paddingLeft: 16, borderLeft: '3px solid #1E3A8A' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--black)', marginBottom: 4 }}>{item.term}</div>
                  <div style={{ fontSize: 14, color: 'var(--gray-600)', lineHeight: 1.7 }}>{item.def}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

    </div>
  )
}