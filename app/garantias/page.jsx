export default function GarantiasPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Soporte</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Política de<br />Garantía
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          Última actualización: 2026 · techavenuecr.com
        </p>
      </div>

      {[
        {
          title: 'Garantía oficial de 1 año',
          content: 'Todos los productos vendidos en TechAvenue cuentan con garantía oficial del fabricante por un período de 12 meses a partir de la fecha de compra. Esta garantía cubre defectos de fabricación y fallas de funcionamiento bajo condiciones normales de uso. El comprobante de compra emitido por TechAvenue es el documento válido para hacer efectiva la garantía.',
        },
        {
          title: '¿Qué cubre la garantía?',
          content: 'La garantía cubre exclusivamente defectos originados en el proceso de fabricación o materiales defectuosos. Entre los casos cubiertos se incluyen:',
          items: [
            'Fallas de funcionamiento sin causa externa aparente (el producto deja de funcionar en condiciones normales de uso).',
            'Defectos de fabricación detectables desde el primer uso o que aparecen durante el período de garantía.',
            'Componentes internos defectuosos que impiden el correcto desempeño del producto.',
            'Errores o fallas documentados que el fabricante reconoce mediante boletines técnicos oficiales.',
          ],
        },
        {
          title: '¿Qué no cubre la garantía?',
          content: 'La garantía queda anulada en los siguientes casos:',
          items: [
            'Daños físicos causados por golpes, caídas, líquidos o cualquier agente externo.',
            'Daños por mal uso, instalación incorrecta, sobrevoltaje o uso fuera de las especificaciones del fabricante.',
            'Modificaciones, reparaciones o intervenciones realizadas por personas no autorizadas.',
            'Desgaste natural del producto por uso prolongado (como ventiladores, baterías o consumibles).',
            'Productos con número de serie alterado, removido o ilegible.',
            'Daños causados por software malicioso, actualizaciones incorrectas o errores de configuración del usuario.',
          ],
        },
        {
          title: 'Proceso para aplicar la garantía',
          content: 'Para gestionar una garantía, seguí estos pasos:',
          items: [
            'Paso 1: Contactanos vía WhatsApp al +506 6340-9795 o por correo electrónico con tu número de orden y una descripción detallada del problema.',
            'Paso 2: Nuestro equipo técnico te guiará en el proceso de diagnóstico inicial para confirmar que la falla está cubierta por garantía.',
            'Paso 3: Si se confirma la garantía, coordinamos la entrega o retiro del producto defectuoso sin costo adicional para vos dentro del Gran Área Metropolitana (GAM).',
            'Paso 4: El producto es enviado al fabricante o servicio técnico autorizado para su revisión y reparación o reemplazo.',
            'Paso 5: Una vez resuelto, te notificamos y coordinamos la devolución del producto reparado o el envío de uno nuevo.',
          ],
        },
        {
          title: 'Tiempos de resolución',
          content: 'Los tiempos de respuesta varían según el tipo de caso y el fabricante involucrado:',
          items: [
            'Diagnóstico inicial: 1 a 3 días hábiles desde que recibimos el producto.',
            'Reparación o reemplazo por parte del fabricante: entre 7 y 30 días hábiles dependiendo del proveedor.',
            'Casos de reemplazo directo por TechAvenue (stock disponible): 2 a 5 días hábiles.',
          ],
          footer: 'TechAvenue actuará como intermediario entre el cliente y el fabricante durante todo el proceso, manteniendo comunicación constante sobre el estado del caso.',
        },
        {
          title: 'Garantía del fabricante vs. garantía TechAvenue',
          content: 'TechAvenue comercializa productos con garantía oficial del fabricante. Esto significa que en caso de falla, el proceso de resolución involucra directamente al fabricante o su representante autorizado en Costa Rica. TechAvenue se encarga de facilitar y agilizar ese proceso, pero los tiempos definitivos de reparación o reemplazo dependen del fabricante. En casos donde TechAvenue cuente con stock de reemplazo y se confirme la falla, podemos ofrecer una solución directa más rápida.',
        },
        {
          title: 'Transporte y logística',
          content: 'El transporte del producto en garantía se gestiona de la siguiente forma:',
          items: [
            'Primera entrega (producto al cliente): TechAvenue asume el costo de envío dentro del GAM.',
            'Retiro del producto defectuoso: TechAvenue coordina el retiro sin costo adicional dentro del GAM.',
            'Zonas fuera del GAM: el cliente asume el costo de envío hacia TechAvenue; el retorno es cubierto por nosotros.',
          ],
        },
        {
          title: 'Contacto para garantías',
          content: 'Para iniciar un proceso de garantía o consultar sobre el estado de uno en curso, podés contactarnos por los siguientes medios:',
          items: [
            'WhatsApp: +506 6340-9795 (lunes a viernes, 8 a.m. – 6 p.m.).',
            'Redes sociales: @techavenue.cr en Instagram o Facebook.',
            'Indicá siempre tu número de orden y el producto involucrado para agilizar la atención.',
          ],
        },
      ].map((section, i) => (
        <div key={i} style={{ marginBottom: 40, paddingBottom: 40, borderBottom: '1px solid var(--gray-200)' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22, color: 'var(--black)', letterSpacing: '-0.01em', marginBottom: 14 }}>
            {section.title}
          </h2>
          {section.content && (
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginBottom: section.items ? 16 : 0 }}>{section.content}</p>
          )}
          {section.items && (
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {section.items.map((item, j) => (
                <li key={j} style={{ display: 'flex', gap: 10, fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.7 }}>
                  <span style={{ color: '#1E3A8A', fontWeight: 700, flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
          {section.footer && (
            <p style={{ fontSize: 15, color: 'var(--gray-600)', lineHeight: 1.8, marginTop: 16 }}>{section.footer}</p>
          )}
        </div>
      ))}

      <a href="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--black)',
        color: 'var(--white)',
        padding: '12px 24px',
        borderRadius: 5,
        fontWeight: 600,
        fontSize: 14,
        textDecoration: 'none',
        marginTop: 16,
      }}>
        ← Volver al inicio
      </a>
    </div>
  )
}
