'use client'

export default function HeroCinematic() {
  return (
    <section className="hero-cine">
      <div className="hero-cine-inner">
        <div className="hero-cine-media">
          <video
            className="hero-cine-video"
            src="/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>
        <div className="hero-cine-overlay" aria-hidden="true" />
        <div className="hero-cine-vignette" aria-hidden="true" />

        <div className="hero-cine-content">
          <h1 className="hero-cine-title">
            <span className="hc-line"><span className="hc-line-in">Construye</span></span>
            <span className="hc-line"><span className="hc-line-in">tu setup</span></span>
            <span className="hc-line"><span className="hc-line-in"><em>ideal.</em></span></span>
          </h1>
          <p className="hero-cine-sub">
            Componentes, periféricos y todo lo que necesitas para armar el PC de
            tus sueños. Stock real, precios directos.
          </p>
          <div className="hero-cine-scroll" aria-hidden="true">
            <span className="hero-cine-mouse">
              <span className="hero-cine-wheel" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
