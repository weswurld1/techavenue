'use client'
import { Suspense, useEffect } from 'react'
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
  return (
    <Canvas
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
      frameloop="always"
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
  )
}
