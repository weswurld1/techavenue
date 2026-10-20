// Cliente minimo para la API de ONVO Pay (https://docs.onvopay.com).
// Usa Hosted Checkout: creamos una sesion y redirigimos al cliente a la pagina de ONVO,
// asi los datos de tarjeta nunca tocan nuestro servidor (evita alcance de PCI-DSS).

const ONVO_API_BASE = 'https://api.onvopay.com/v1'

// Crea una sesion de checkout alojada. Devuelve { url } (a donde redirigir al cliente).
// Lanza un error si ONVO responde con un status que no sea 2xx.
export async function crearSesionCheckout({ lineItems, customerEmail, redirectUrl, cancelUrl, metadata }) {
  const secretKey = process.env.ONVO_SECRET_KEY
  if (!secretKey) {
    throw new Error('ONVO_SECRET_KEY no está configurada')
  }

  const res = await fetch(`${ONVO_API_BASE}/checkout/sessions/one-time-link`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify({ lineItems, customerEmail, redirectUrl, cancelUrl, metadata }),
  })

  if (!res.ok) {
    const texto = await res.text().catch(() => '')
    throw new Error(`ONVO respondió ${res.status}: ${texto}`)
  }

  return res.json()
}
