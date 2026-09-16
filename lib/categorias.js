const H = Math.PI / 2

export const CATEGORIAS = [
  { href: '/categoria/componentes?sub=gpu',              label: 'Tarjetas Gráficas', desc: 'Placas de video para gaming y edición',       model: '/models/gpu.glb' },
  { href: '/categoria/componentes?sub=placas-madre',     label: 'Tarjetas Madre',    desc: 'Placas madre para todo tipo de socket',        model: '/models/motherboard.glb',    rotation: [H, 0, 0] },
  { href: '/categoria/componentes?sub=cpu',               label: 'Procesadores',      desc: 'CPUs Intel y AMD de última generación',        model: '/models/cpu.glb',            rotation: [-H, 0, Math.PI] },
  { href: '/categoria/componentes?sub=almacenamiento',   label: 'Almacenamiento',    desc: 'Discos SSD, NVMe y HDD',                       model: '/models/almacenamiento.glb', rotation: [-H, 0, 0] },
  { href: '/categoria/componentes?sub=fuentes-de-poder', label: 'Fuentes de Poder',  desc: 'Fuentes de poder certificadas',                model: '/models/fuentedepoder.glb' },
  { href: '/categoria/componentes?sub=refrigeracion',    label: 'Enfriamiento',      desc: 'Coolers, AIO y ventiladores',                  model: '/models/cooling.glb' },
  { href: '/categoria/perifericos',                       label: 'Periféricos',       desc: 'Mouse, teclados, monitores, headsets',         model: '/models/perifericos.glb' },
  { href: '/categoria/hogar',                             label: 'Hogar',             desc: 'Electrodomésticos y tecnología para el hogar', model: '/models/redes.glb' },
]
