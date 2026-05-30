export default function PoliticaCookiesPage() {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto', padding: '64px 32px 96px' }}>

      <div style={{ marginBottom: 48 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E3A8A', marginBottom: 10 }}>Legal</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(40px, 6vw, 64px)', lineHeight: 0.95, color: 'var(--black)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Política de<br />Cookies
        </h1>
        <p style={{ fontSize: 14, color: 'var(--gray-400)', borderTop: '1px solid var(--gray-200)', paddingTop: 16, marginTop: 16 }}>
          Última actualización: 2026 · techavenuecr.com
        </p>
      </div>

      {[
        {
          title: '¿Qué son las cookies?',
          content: 'Las cookies son pequeños archivos de texto que los sitios web almacenan en su dispositivo (computadora, teléfono o tablet) cuando los visita. Permiten que el sitio recuerde sus preferencias, acciones e información de sesión durante un período de tiempo, mejorando así su experiencia de navegación.',
        },
        {
          title: 'Cookies que utilizamos',
          content: 'En techavenuecr.com utilizamos los siguientes tipos de cookies:',
          items: [
            'Cookies esenciales: necesarias para el funcionamiento básico del sitio, como mantener el carrito de compras activo o gestionar sesiones de usuario. No pueden desactivarse.',
            'Cookies funcionales: recuerdan sus preferencias (como provincia seleccionada o método de pago) para personalizar su experiencia.',
            'Cookies analíticas: recopilan información anónima sobre cómo los visitantes utilizan el sitio (páginas visitadas, tiempo en el sitio, errores encontrados) con el fin de mejorar el rendimiento y contenido.',
            'Cookies de marketing: usadas para mostrarle anuncios relevantes en otros sitios web basados en sus intereses. Solo se activan con su consentimiento.',
          ],
        },
        {
          title: 'Cookies de terceros',
          content: 'Algunos de nuestros socios y proveedores de servicios pueden establecer cookies a través de nuestro sitio. Entre ellos:',
          items: [
            'Google Analytics: análisis de tráfico y comportamiento de usuarios (datos anonimizados).',
            'Meta Pixel (Facebook/Instagram): medición de campañas publicitarias.',
            'Vercel: infraestructura de hosting y optimización del rendimiento.',
          ],
          footer: 'Estos terceros tienen sus propias políticas de privacidad y cookies, sobre las cuales TechAvenue no tiene control directo.',
        },
        {
          title: 'Duración de las cookies',
          content: 'Las cookies pueden ser de dos tipos según su duración:',
          items: [
            'Cookies de sesión: se eliminan automáticamente al cerrar el navegador.',
            'Cookies persistentes: permanecen en su dispositivo durante un período definido (generalmente entre 30 días y 2 años) o hasta que las elimine manualmente.',
          ],
        },
        {
          title: 'Cómo gestionar y desactivar las cookies',
          content: 'Usted puede controlar y administrar las cookies a través de la configuración de su navegador. A continuación encontrará instrucciones para los navegadores más comunes:',
          items: [
            'Google Chrome: Configuración → Privacidad y seguridad → Cookies y otros datos de sitios.',
            'Mozilla Firefox: Opciones → Privacidad y seguridad → Cookies y datos del sitio.',
            'Safari: Preferencias → Privacidad → Gestionar datos de sitios web.',
            'Microsoft Edge: Configuración → Privacidad, búsqueda y servicios → Cookies.',
          ],
          footer: 'Tenga en cuenta que deshabilitar ciertas cookies puede afectar el funcionamiento del sitio, incluyendo la capacidad de agregar productos al carrito o completar una compra.',
        },
        {
          title: 'Su consentimiento',
          content: 'Al navegar por techavenuecr.com, usted acepta el uso de cookies de acuerdo con esta política. Para las cookies no esenciales (analíticas y de marketing), solicitamos su consentimiento expreso. Puede revocar su consentimiento en cualquier momento ajustando la configuración de su navegador o contactándonos directamente.',
        },
        {
          title: 'Modificaciones a esta política',
          content: 'TechAvenue se reserva el derecho de actualizar esta Política de Cookies para reflejar cambios en la tecnología, legislación aplicable o nuestras prácticas internas. Cualquier cambio relevante será publicado en esta página con la fecha de actualización correspondiente.',
        },
        {
          title: 'Contacto',
          content: 'Si tiene preguntas sobre el uso de cookies en nuestro sitio, puede contactarnos a través de WhatsApp al +506 6340-9795 o escribirnos mediante nuestras redes sociales en @techavenue.cr.',
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
