'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const CatalogoContext = createContext({ productos: [], loading: true })

// Mapeo exacto de subcategorías del proveedor → categorías de TechAvenue
const MAPA_CATEGORIAS = {
  // Componentes
  'Componentes de PC > Procesadores':           { categoria: 'componentes',            subcategoria: 'cpu',            tipo_periferico: null },
  'Componentes de PC > Tarjetas de Video':      { categoria: 'componentes',            subcategoria: 'gpu',            tipo_periferico: null },
  'Componentes de PC > Tarjetas Madre':         { categoria: 'componentes',            subcategoria: 'placas-madre',   tipo_periferico: null },
  'Almacenamiento > Memorias RAM para PC':      { categoria: 'componentes',            subcategoria: 'ram',            tipo_periferico: null },
  'Almacenamiento > Memorias RAM para Laptop':  { categoria: 'componentes',            subcategoria: 'ram',            tipo_periferico: null },
  'Almacenamiento > Discos Duros Solidos Internos': { categoria: 'componentes',        subcategoria: 'almacenamiento', tipo_periferico: null },
  'Almacenamiento > Discos Duros Internos':     { categoria: 'componentes',            subcategoria: 'almacenamiento', tipo_periferico: null },
  'Componentes de PC > Cases':                  { categoria: 'componentes',            subcategoria: 'gabinetes',      tipo_periferico: null },
  'Componentes de PC > Fuentes de Poder':       { categoria: 'componentes',            subcategoria: 'fuentes-de-poder', tipo_periferico: null },
  'Componentes de PC > Enfriamiento Liquido':   { categoria: 'componentes',            subcategoria: 'refrigeracion',  tipo_periferico: null },
  'Componentes de PC > Enfriamiento de Aire':   { categoria: 'componentes',            subcategoria: 'refrigeracion',  tipo_periferico: null },
  'Componentes de PC > Abanicos':               { categoria: 'componentes',            subcategoria: 'refrigeracion',  tipo_periferico: null },
  'Componentes de PC > Pastas/Parches Termicos':{ categoria: 'componentes',            subcategoria: 'pastas-termicas',tipo_periferico: null },
  // Periféricos
  'Perifericos > Mouses':                       { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Mouse' },
  'Perifericos > Teclados':                     { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Teclado' },
  'Perifericos > Combos Teclado y Mouse':       { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Teclado' },
  'Perifericos > Headsets':                     { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Headset' },
  'Perifericos > Audífonos':                    { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Audífonos' },
  'Perifericos > Cámaras Web/Digitales':        { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Webcam' },
  'Perifericos > Mouse Pads':                   { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Mouse' },
  'Dispositivos de visualizacion > Monitores':  { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Monitor' },
  'Hogar y oficina > Sillas':                   { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Silla' },
  'Audio y Sonido > Parlantes':                 { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Parlantes' },
  'Audio y Sonido > Micrófonos':                { categoria: 'perifericos',            subcategoria: null, tipo_periferico: 'Micrófono' },
  // Computadoras
  'Laptops > Inglés':                           { categoria: 'computadoras',           subcategoria: 'laptops',        tipo_periferico: null },
  'Laptops > Español':                          { categoria: 'computadoras',           subcategoria: 'laptops',        tipo_periferico: null },
  'Dispositivos Móviles  > Tablets':            { categoria: 'computadoras',           subcategoria: 'tablets',        tipo_periferico: null },
  'Dispositivos Móviles  > Celulares':          { categoria: 'computadoras',           subcategoria: 'tablets',        tipo_periferico: null },
  'Dispositivos Móviles  > Smart Watches':      { categoria: 'computadoras',           subcategoria: 'tablets',        tipo_periferico: null },
  'COMPUTADORAS':                               { categoria: 'computadoras',           subcategoria: null,             tipo_periferico: null },
  // Gaming y Streaming
  'Gaming > Controles':                         { categoria: 'streaming-y-gaming',     subcategoria: null,             tipo_periferico: null },
  // Energía y Conectividad
  'Respaldo Eléctrico > UPS':                   { categoria: 'energia-y-conectividad', subcategoria: 'ups',            tipo_periferico: null },
  'Respaldo Eléctrico > Power Banks':           { categoria: 'energia-y-conectividad', subcategoria: 'power-banks',    tipo_periferico: null },
  'Redes y Conectividad > Routers':             { categoria: 'energia-y-conectividad', subcategoria: 'redes',          tipo_periferico: null },
  'Redes y Conectividad > Switches':            { categoria: 'energia-y-conectividad', subcategoria: 'redes',          tipo_periferico: null },
  'Redes y Conectividad > Puntos de Acceso':    { categoria: 'energia-y-conectividad', subcategoria: 'redes',          tipo_periferico: null },
  'Smart Home > Iluminación Inteligente':       { categoria: 'energia-y-conectividad', subcategoria: 'smart-home',     tipo_periferico: null },
  // Accesorios
  'ACCESORIOS > Cables':                        { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'ACCESORIOS > Adaptadores':                   { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'ACCESORIOS > Hubs':                          { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'ACCESORIOS > Soportes':                      { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'ACCESORIOS > Cargadores':                    { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'ACCESORIOS > Mochilas y Maletas':            { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'Almacenamiento > Memorias USB':              { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'Almacenamiento > Memorias Micro SD':         { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  'Almacenamiento > Discos Duros Solidos Externos': { categoria: 'accesorios',         subcategoria: null,             tipo_periferico: null },
  'Almacenamiento > Discos Duros Externos':     { categoria: 'accesorios',             subcategoria: null,             tipo_periferico: null },
  // Software
  'Software > Garantias':                       { categoria: 'software',               subcategoria: null,             tipo_periferico: null },
  // Hogar
  'Impresión > Impresoras':                     { categoria: 'hogar',                  subcategoria: null,             tipo_periferico: null },
  'Impresión > Consumibles':                    { categoria: 'hogar',                  subcategoria: null,             tipo_periferico: null },
  'Seguridad > Camaras':                        { categoria: 'hogar',                  subcategoria: null,             tipo_periferico: null },
  'Seguridad > Grabadoras':                     { categoria: 'hogar',                  subcategoria: null,             tipo_periferico: null },
  // Excluidos (no aparecen en la tienda)
  'Seguridad > Sensores':                       null,
  'Seguridad > Controles de Acceso':            null,
  'Punto de Venta > Consumibles Pv':            null,
  'Punto de Venta > Impresoras Pv':             null,
  'Punto de Venta > Lectores':                  null,
  'ACCESORIOS > Carro':                         null,
  'Utensilios':                                 null,
  'SERVIDORES':                                 null,
}

function mapearCategorias(subcategoriaExterna) {
  const resultado = MAPA_CATEGORIAS[subcategoriaExterna?.trim()]
  if (resultado === null) return null // excluido
  if (resultado) return resultado
  // Fallback para subcategorías no mapeadas aún
  return { categoria: 'accesorios', subcategoria: null, tipo_periferico: null }
}

function mapearProducto(p) {
  const cats = mapearCategorias(p.subcategoria)
  if (!cats) return null // categoría excluida

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
    precio: p.PrecioNacional || p.precioConvertido || 0,
    precio_original: p.isInOffer === 1 ? (p.PrecioNacional || p.precioConvertido || 0) : null,
    stock: p.stock || 0,
    imagen: imageUrl,
    en_oferta: p.isInOffer === 1,
    categoria,
    subcategoria,
    tipo_periferico,
    subcategoria_original: p.subcategoria,
  }
}

export function CatalogoProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/catalogo-externo')
      .then(r => r.json())
      .then(({ datos }) => {
        const mapeados = (datos?.data || []).map(mapearProducto).filter(Boolean)
        setProductos(mapeados)
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
