'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center, Bounds, Environment } from '@react-three/drei'

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
    >
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-3, -3, -3]} intensity={0.4} />
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
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  )
}
