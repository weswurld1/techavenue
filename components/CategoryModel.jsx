'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center, Bounds } from '@react-three/drei'

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
      gl={{ antialias: true }}
      dpr={[1, 1.5]}
      flat
    >
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      <directionalLight position={[-3, 3, -3]} intensity={0.8} />
      <directionalLight position={[0, -5, 0]} intensity={0.3} />
      <OrbitControls
        makeDefault
        autoRotate
        autoRotateSpeed={2}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
      <Suspense fallback={null}>
        <Bounds fit clip observe margin={1.4}>
          <Model url={url} rotation={rotation} />
        </Bounds>
      </Suspense>
    </Canvas>
  )
}
