export default function PoliticaPrivacidadPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>
      <a href="/" className="page-back">← Inicio</a>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Política de<br />Privacidad
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          Última actualización: 2026 · techavenuecr.com
        </p>
      </div>

      {[
        {
          title: 'Introducción',
          content: 'En TechAvenue nos comprometemos a proteger la privacidad y seguridad de la información personal de nuestros usuarios. Valoramos la confianza que deposita en nosotros y trabajamos para garantizar un manejo transparente y responsable de sus datos personales al utilizar nuestro sitio web techavenuecr.com y nuestros servicios.'
        },
        {
          title: 'Información que Recopilamos',
          content: 'Podemos recopilar información personal cuando usted realiza acciones como crear una cuenta, efectuar una compra o interactuar con nuestros servicios. Entre los datos que podríamos solicitar se incluyen:',
          items: [
            'Nombre completo',
            'Correo electrónico',
            'Dirección física (hogar, oficina o empresa)',
            'Número telefónico',
            'Fecha de nacimiento y género',
            'Información relacionada con métodos de pago',
            'Profesión, cargo e intereses personales',
          ],
          footer: 'Además, mientras navega en nuestro sitio web, cierta información se obtiene automáticamente mediante cookies y herramientas de seguimiento. También podemos registrar la dirección IP con fines estadísticos y de seguridad.'
        },
        {
          title: 'Uso de la Información',
          content: 'La información recopilada podrá ser utilizada para los siguientes fines:',
          items: [
            'Gestionar pedidos, pagos y entregas',
            'Brindar soporte y atención al cliente',
            'Enviar información relacionada con compras o cuentas registradas',
            'Mejorar el funcionamiento y personalización del sitio web',
            'Realizar análisis internos y estudios estadísticos',
            'Compartir promociones, ofertas y contenido publicitario, siempre que el usuario haya otorgado su consentimiento',
          ]
        },
        {
          title: 'Compartición de Información',
          content: 'TechAvenue no comercializa ni alquila información personal a terceros. Sin embargo, en determinados casos podremos compartir datos con:',
          items: [
            'Empresas o proveedores que colaboran con nosotros para ofrecer servicios operativos, logísticos o tecnológicos',
            'Autoridades competentes cuando exista una obligación legal o sea necesario para proteger nuestros derechos y términos de uso',
          ]
        },
        {
          title: 'Protección de Datos',
          content: 'Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger la información personal contra accesos no autorizados, pérdida o alteración. Nuestro sitio utiliza protocolos de seguridad SSL para resguardar la transmisión de datos sensibles.'
        },
        {
          title: 'Derechos del Usuario',
          content: 'Los usuarios tienen derecho a solicitar acceso, modificación o eliminación de sus datos personales. Asimismo, pueden administrar las preferencias relacionadas con cookies y comunicaciones publicitarias desde la configuración de su navegador o mediante las opciones proporcionadas por nuestro sitio web.'
        },
        {
          title: 'Modificaciones de la Política',
          content: 'TechAvenue se reserva el derecho de actualizar o modificar esta Política de Privacidad en cualquier momento. Cualquier cambio importante será publicado en nuestro sitio web para mantener a los usuarios debidamente informados sobre el tratamiento de su información personal.'
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

    </div>
  )
}