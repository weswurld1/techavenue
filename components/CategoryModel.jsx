'use client'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center, Bounds, Environment } from '@react-three/drei'

useGLTF.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')

function PauseOnScroll() {
  const controls = useThree(s => s.controls)
  useEffect(() => {
    if (!controls) return
    let timer
    const onScroll = () => {
      controls.autoRotate = false
      clearTimeout(timer)
      timer = setTimeout(() => { controls.autoRotate = true }, 250)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { window.removeEventListener('scroll', onScroll); clearTimeout(timer) }
  }, [controls])
  return null
}

function Model({ url, rotation }) {
  const { scene } = useGLTF(url)
  return (
    <Center>
      <primitive object={scene} rotation={rotation} />
    </Center>
  )
}

export default function CategoryModel({ url, rotation = [0, 0, 0] }) {
  const wrapRef = useRef(null)
  // Only ever create the WebGL context once the card is near the viewport,
  // and only run the render loop while it's actually on screen. This keeps all
  // 8 canvases from rendering at once (and from stealing frames from the hero
  // video while the categories are still below the fold).
  const [activated, setActivated] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
        if (entry.isIntersecting) setActivated(true) // mount once, keep mounted
      },
      { rootMargin: '250px 0px' } // warm up just before it scrolls in
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      {activated && (
        <Canvas
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          frameloop={visible ? 'always' : 'never'}
        >
          <OrbitControls
            makeDefault
            autoRotate
            autoRotateSpeed={2}
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
          <PauseOnScroll />
          <Suspense fallback={null}>
            <Bounds fit clip margin={1.4}>
              <Model url={url} rotation={rotation} />
            </Bounds>
            <Environment preset="city" />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}
