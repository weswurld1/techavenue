/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'" },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: '/categoria/gpu',            destination: '/categoria/componentes?sub=gpu',              permanent: true },
      { source: '/categoria/cpu',            destination: '/categoria/componentes?sub=cpu',              permanent: true },
      { source: '/categoria/placas-madre',   destination: '/categoria/componentes?sub=placas-madre',    permanent: true },
      { source: '/categoria/ram',            destination: '/categoria/componentes?sub=ram',              permanent: true },
      { source: '/categoria/almacenamiento', destination: '/categoria/componentes?sub=almacenamiento',  permanent: true },
      { source: '/categoria/gabinetes',      destination: '/categoria/componentes?sub=gabinetes',       permanent: true },
      { source: '/categoria/refrigeracion',  destination: '/categoria/componentes?sub=refrigeracion',   permanent: true },
      { source: '/categoria/psu',            destination: '/categoria/componentes?sub=fuentes-de-poder',permanent: true },
      { source: '/categoria/fuentes-de-poder',destination: '/categoria/componentes?sub=fuentes-de-poder',permanent: true },
      { source: '/categoria/redes',          destination: '/categoria/energia-y-conectividad?sub=redes',permanent: true },
    ]
  },
}

module.exports = nextConfig
