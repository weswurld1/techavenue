'use client'

export default function HeroVideo() {
  return (
    <video
      src="/gaming%20trio.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  )
}
