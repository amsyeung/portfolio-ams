import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useFBX, useGLTF } from '@react-three/drei'

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')
  // const computer = useFBX('./desktop_pc/future_car_002_01_by_unityfan.fbx')

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor='black' />
      <pointLight position={[0, 1.2, 0]} intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow={true}
        shadow-mapSize={1024}
      />

      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.75}
        position={isMobile ? [1.2, -1.5, -3] : [1, -2.5, -1.5]}
        rotation={[0.08, -1.571, 0]}
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop='demand'
      shadows
      camera={{ position: [0, 0, 20], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas
