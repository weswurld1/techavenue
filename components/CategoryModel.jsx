'use client'
import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center, Bounds } from '@react-three/drei'

// Module-level scroll tracker shared across all 10 instances
let isScrolling = false
let scrollTimer = null
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    isScrolling = true
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => { isScrolling = false }, 200)
  }, { passive: true })
}

function Scene({ url, rotation }) {
  const { scene } = useGLTF(url)
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (!isScrolling && groupRef.current) {
      groupRef.current.rotation.y += delta * 1.5
    }
  })

  return (
    <Bounds fit clip margin={1.4}>
      <Center>
        <group ref={groupRef}>
          <primitive object={scene} rotation={rotation} />
        </group>
      </Center>
    </Bounds>
  )
}

export default function CategoryModel({ url, rotation = [0, 0, 0] }) {
  return (
    <Canvas
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      flat
    >
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-3, 3, -3]} intensity={0.8} />
      <directionalLight position={[0, -5, 0]} intensity={0.3} />
      <Suspense fallback={null}>
        <Scene url={url} rotation={rotation} />
      </Suspense>
    </Canvas>
  )
}
