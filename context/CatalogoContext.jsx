'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CatalogoContext = createContext({ productos: [], loading: true })

// Categoriza productos por palabras clave en el nombre
// Divia no tiene subcategorías consistentes (96% son null)
function n(str) {
  return (' ' + (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase() + ' ')
}

function detectarCategoria(nombreRaw, marcaRaw) {
  const nombre = n(nombreRaw)
  const marca  = n(marcaRaw)

  const tiene = (...kw) => kw.some(k => nombre.includes(n(k).trim()))

  // ── Computadoras ────────────────────────────────────────────────
  if (tiene('laptop', 'notebook') && !tiene('soporte', 'base para laptop', 'cooler para laptop', 'mochila', 'maletín', 'funda'))
    return { categoria: 'computadoras', subcategoria: 'laptops', tipo_periferico: null }
  if (tiene('tablet', 'ipad') && !tiene('soporte para tablet'))
    return { categoria: 'computadoras', subcategoria: 'tablets', tipo_periferico: null }
  if (tiene('celular', 'smartphone', 'smart watch', 'smartwatch'))
    return { categoria: 'computadoras', subcategoria: 'tablets', tipo_periferico: null }

  // ── Componentes — GPU ────────────────────────────────────────────
  if (tiene('tarjeta de video', 'tarjeta grafica', 'video card', 'graphics card') ||
      tiene('rtx', 'gtx', 'geforce', 'radeon rx', 'arc a') ||
      (tiene('radeon') && !tiene('laptop')))
    return { categoria: 'componentes', subcategoria: 'gpu', tipo_periferico: null }

  // ── Componentes — CPU ────────────────────────────────────────────
  if (tiene('procesador', 'processor') ||
      tiene('core i3', 'core i5', 'core i7', 'core i9', 'core ultra') ||
      tiene('ryzen 3', 'ryzen 5', 'ryzen 7', 'ryzen 9', 'ryzen threadripper') ||
      tiene('athlon', 'pentium gold', 'celeron'))
    return { categoria: 'componentes', subcategoria: 'cpu', tipo_periferico: null }

  // ── Componentes — RAM ────────────────────────────────────────────
  if (tiene('memoria ram', ' ram ', 'ddr5', 'ddr4', 'ddr3', 'sodimm', 'so-dimm'))
    return { categoria: 'componentes', subcategoria: 'ram', tipo_periferico: null }

  // ── Accesorios — Externo / USB (antes de almacenamiento interno) ─
  if (tiene('disco externo', 'disco duro externo', 'ssd externo', 'hdd externo', 'disco portatil', 'hd externo', 'hd solido externo'))
    return { categoria: 'accesorios', subcategoria: null, tipo_periferico: null }
  if (tiene('memoria usb', 'pendrive', 'pen drive', 'micro sd', 'microsd', ' sd card', 'memoria flash'))
    return { categoria: 'accesorios', subcategoria: null, tipo_periferico: null }

  // ── Componentes — Almacenamiento interno ─────────────────────────
  if (tiene('disco ssd', 'ssd m.2', 'ssd 2.5', 'nvme', ' ssd ', 'disco duro interno', 'disco interno', 'hd interno') ||
      (tiene('hdd') && !tiene('externo')))
    return { categoria: 'componentes', subcategoria: 'almacenamiento', tipo_periferico: null }

  // ── Componentes — Placa madre ────────────────────────────────────
  if (tiene('placa madre', 'tarjeta madre', 'motherboard', 'mainboard'))
    return { categoria: 'componentes', subcategoria: 'placas-madre', tipo_periferico: null }

  // ── Componentes — Fuente de poder ────────────────────────────────
  if (tiene('fuente de poder', 'fuente poder', 'power supply', ' psu ', 'fuente atx'))
    return { categoria: 'componentes', subcategoria: 'fuentes-de-poder', tipo_periferico: null }

  // ── Componentes — Gabinete ───────────────────────────────────────
  if (tiene('gabinete', 'case atx', 'case matx', 'case itx', 'tower pc', 'chasis pc', 'mini tower', 'mid tower', 'full tower') ||
      (tiene(' case ') && tiene('pc', 'gamer', 'gaming', 'atx', 'rgb')))
    return { categoria: 'componentes', subcategoria: 'gabinetes', tipo_periferico: null }

  // ── Componentes — Pasta térmica ──────────────────────────────────
  if (tiene('pasta termica', 'thermal paste', 'thermal pad', 'parche termico', 'pasta conductora'))
    return { categoria: 'componentes', subcategoria: 'pastas-termicas', tipo_periferico: null }

  // ── Componentes — Refrigeración ──────────────────────────────────
  if (tiene('liquid cooling', 'water cooling', 'enfriamiento liquido', 'enfriamiento de aire', 'aio cooler', 'disipador cpu', 'cooler cpu', 'cooler procesador') ||
      (tiene('ventilador', 'abanico', ' fan ') && tiene('pc', 'case', 'cpu', 'gamer', '120mm', '140mm', '200mm', 'argb', 'rgb', 'pwm')))
    return { categoria: 'componentes', subcategoria: 'refrigeracion', tipo_periferico: null }

  // ── Periféricos — Monitor ────────────────────────────────────────
  if (tiene('monitor') && !tiene('soporte para monitor', 'brazo monitor', 'base monitor'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Monitor' }

  // ── Periféricos — Mouse ──────────────────────────────────────────
  if (tiene('mouse pad', 'mousepad', 'pad mouse'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Mouse' }
  if (tiene('mouse') || tiene('raton '))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Mouse' }

  // ── Periféricos — Teclado ────────────────────────────────────────
  if (tiene('teclado', 'keyboard', 'combo teclado'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Teclado' }

  // ── Periféricos — Headset ────────────────────────────────────────
  if (tiene('headset') || (tiene('audifono', 'audifonos', 'auricular') && tiene('gamer', 'gaming')))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Headset' }

  // ── Periféricos — Audífonos ──────────────────────────────────────
  if (tiene('audifono', 'audifonos', 'earphone', 'earbuds', 'in-ear', 'over-ear', 'auricular', 'inalambrico') && !tiene('gamer', 'gaming'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Audífonos' }

  // ── Periféricos — Webcam ─────────────────────────────────────────
  if (tiene('webcam', 'web cam', 'camara web', 'camara usb hd'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Webcam' }

  // ── Periféricos — Micrófono ──────────────────────────────────────
  if (tiene('microfono', 'microphone'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Micrófono' }

  // ── Periféricos — Parlantes ──────────────────────────────────────
  if (tiene('parlante', 'bocina', ' speaker', 'barra de sonido', 'soundbar', 'barra sonido'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Parlantes' }

  // ── Periféricos — Silla ──────────────────────────────────────────
  if (tiene('silla') && tiene('gamer', 'gaming', 'ergonomica', 'oficina'))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Silla' }

  // ── Periféricos — Escritorio ─────────────────────────────────────
  if ((tiene('escritorio', 'desk', 'mesa') && tiene('gamer', 'gaming')))
    return { categoria: 'perifericos', subcategoria: null, tipo_periferico: 'Escritorio' }

  // ── Energía — UPS ────────────────────────────────────────────────
  if (tiene(' ups ') || (tiene('respaldo') && tiene('electrico', 'bateria')) || tiene('no-break', 'nobreak'))
    return { categoria: 'energia-y-conectividad', subcategoria: 'ups', tipo_periferico: null }

  // ── Energía — Power Bank ─────────────────────────────────────────
  if (tiene('power bank', 'powerbank', 'bateria portatil', 'cargador portatil', 'banco de energia', 'banco energia'))
    return { categoria: 'energia-y-conectividad', subcategoria: 'power-banks', tipo_periferico: null }

  // ── Energía — Redes ──────────────────────────────────────────────
  if (tiene('router', ' switch ', 'access point', 'punto de acceso', 'adaptador wifi', 'tarjeta de red', 'usb wifi', 'antena wifi', 'extensor wifi', 'repetidor wifi', 'cable de red', 'cable ethernet', 'cable utp', 'cable rj45'))
    return { categoria: 'energia-y-conectividad', subcategoria: 'redes', tipo_periferico: null }

  // ── Energía — Smart Home ─────────────────────────────────────────
  if (tiene('smart home', 'foco inteligente', 'bombillo inteligente', 'smart bulb', 'smart plug', 'enchufe inteligente'))
    return { categoria: 'energia-y-conectividad', subcategoria: 'smart-home', tipo_periferico: null }

  // ── Streaming y Gaming ───────────────────────────────────────────
  if (tiene('capturadora', 'capture card', 'stream deck', 'elgato'))
    return { categoria: 'streaming-y-gaming', subcategoria: 'streaming', tipo_periferico: null }
  if ((tiene('volante') && tiene('racing', 'gamer', 'gaming')) || tiene('sim racing', 'playseat', 'fanatec', 'thrustmaster'))
    return { categoria: 'streaming-y-gaming', subcategoria: 'sim-racing', tipo_periferico: null }

  // ── Software ─────────────────────────────────────────────────────
  if (tiene('windows 10', 'windows 11', 'microsoft 365', 'office 365', 'office 2021', 'office 2019', 'licencia windows', 'licencia office', 'licencia antivirus') ||
      (tiene('licencia') && tiene('software', 'antivirus')))
    return { categoria: 'software', subcategoria: null, tipo_periferico: null }

  // ── Hogar ────────────────────────────────────────────────────────
  if (tiene('impresora', 'printer', 'multifuncional', 'escaner', 'scanner') ||
      (tiene('tinta', 'toner', 'cartucho') && !tiene('bateria')))
    return { categoria: 'hogar', subcategoria: null, tipo_periferico: null }
  if (tiene('camara de seguridad', 'camara ip', ' cctv', ' dvr ', ' nvr '))
    return { categoria: 'hogar', subcategoria: null, tipo_periferico: null }

  // ── Accesorios ───────────────────────────────────────────────────
  if (tiene('cable ', 'adaptador', 'convertidor', ' hub ', 'docking', 'dock station') ||
      tiene('soporte ', 'brazo ') ||
      tiene('mochila', 'maletin', 'maletín', 'funda laptop', 'bolso laptop') ||
      tiene('cargador', 'carga rapida') ||
      tiene('limpiador pantalla', 'spray limpia'))
    return { categoria: 'accesorios', subcategoria: null, tipo_periferico: null }

  // Sin categoría reconocida — se muestra igual bajo "Otros" en vez de ocultarse
  // (así el buscador y el link directo al producto siempre funcionan)
  return { categoria: 'otros', subcategoria: null, tipo_periferico: null }
}

function mapearProducto(p) {
  const cats = detectarCategoria(p.nombre, p.marca)
  if (!cats) return null

  const { categoria, subcategoria, tipo_periferico } = cats
  const imageUrl = Array.isArray(p.imageUrls)
    ? p.imageUrls[0]
    : typeof p.imageUrls === 'string' ? p.imageUrls : null

  return {
    id: p.id,
    sku: p.sku,
    partNumber: p.partNumber,
    nombre: p.nombre,
    detalle: p.detalle,
    marca: p.marca || '',
    precio: Math.round(p.isInOffer === 1 ? (p.TotalOferta || p.Total || 0) : (p.Total || 0)),
    precio_original: p.isInOffer === 1 ? Math.round(p.Total || 0) : null,
    stock: p.stock || 0,
    imagen: imageUrl,
    en_oferta: p.isInOffer === 1,
    categoria,
    subcategoria,
    tipo_periferico,
  }
}

const CACHE_KEY = 'ta_catalog_v4'
const CACHE_TTL = 15 * 60 * 1000 // 15 min

function slimForCache(p) {
  return {
    id: p.id, sku: p.sku, partNumber: p.partNumber,
    nombre: p.nombre, marca: p.marca,
    precio: p.precio, precio_original: p.precio_original,
    stock: p.stock, imagen: p.imagen, en_oferta: p.en_oferta,
    categoria: p.categoria, subcategoria: p.subcategoria,
    tipo_periferico: p.tipo_periferico,
  }
}

export function CatalogoProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mostrar caché de localStorage instantáneamente si existe y es fresca
    try {
      const raw = localStorage.getItem(CACHE_KEY)
      if (raw) {
        const { ts, data } = JSON.parse(raw)
        if (Date.now() - ts < CACHE_TTL) {
          setProductos(data)
          setLoading(false)
        }
      }
    } catch {}

    // Siempre refrescar del API en background
    fetch('/api/catalogo-externo')
      .then(r => r.json())
      .then(({ datos }) => {
        const mapeados = (datos?.data || []).map(mapearProducto).filter(Boolean)
        setProductos(mapeados)
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: mapeados.map(slimForCache) }))
        } catch {}
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  return (
    <CatalogoContext.Provider value={{ productos, loading }}>
      {children}
    </CatalogoContext.Provider>
  )
}

export function useCatalogo() {
  return useContext(CatalogoContext)
}
