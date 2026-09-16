import CategoryClient from './CategoryClient'

const NOMBRES = {
  'componentes':            'Componentes',
  'perifericos':            'Periféricos',
  'accesorios':             'Accesorios',
  'energia-y-conectividad': 'Energía y Conectividad',
  'streaming-y-gaming':     'Streaming y Gaming',
  'computadoras':           'Computadoras',
  'hogar':                  'Hogar',
  'software':               'Software',
}

export async function generateMetadata({ params }) {
  const { nombre } = await params
  const titulo = NOMBRES[nombre] || nombre.charAt(0).toUpperCase() + nombre.slice(1).replace(/-/g, ' ')
  return {
    title: `${titulo} | TechAvenue CR`,
    description: `Comprá ${titulo} en TechAvenue Costa Rica. Garantía oficial, envío a todo el país.`,
  }
}

export default function Page({ params }) {
  return <CategoryClient params={params} />
}
