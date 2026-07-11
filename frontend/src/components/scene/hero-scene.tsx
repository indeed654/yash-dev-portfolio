'use client'

import { Float } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function SignalMesh() {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    return Array.from({ length: 42 }, (_, index) => {
      const angle = (index / 42) * Math.PI * 2
      const radius = 1.45 + (index % 5) * 0.18
      return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(index * 1.7) * 0.5, Math.sin(angle) * radius)
    })
  }, [])
  const lines = useMemo(() => {
    return nodes.slice(0, 30).map((node, index) => {
      const next = nodes[(index * 5 + 7) % nodes.length]
      const geometry = new THREE.BufferGeometry().setFromPoints([node, next])
      const material = new THREE.LineBasicMaterial({ color: '#0891b2', transparent: true, opacity: 0.18 })
      return new THREE.Line(geometry, material)
    })
  }, [nodes])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.08
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08
  })

  return (
    <group ref={group}>
      {nodes.map((node, index) => (
        <mesh key={`${node.x}-${index}`} position={node}>
          <sphereGeometry args={[index % 4 === 0 ? 0.035 : 0.024, 16, 16]} />
          <meshStandardMaterial color={index % 3 === 0 ? '#06b6d4' : index % 3 === 1 ? '#7c3aed' : '#84cc16'} emissive="#06b6d4" emissiveIntensity={0.16} />
        </mesh>
      ))}
      {lines.map((line, index) => <primitive key={`line-${index}`} object={line} />)}
    </group>
  )
}

function Core() {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * 0.18
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08
  })
  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[0.78, 2]} />
      <meshPhysicalMaterial color="#dff7ff" roughness={0.18} metalness={0.25} transmission={0.55} thickness={0.9} transparent opacity={0.86} />
    </mesh>
  )
}

export default function HeroScene() {
  return (
    <div aria-hidden className="h-full w-full opacity-90">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 4.8], fov: 42 }}>
        <color attach="background" args={['#f8fafc']} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[3, 4, 4]} intensity={1.2} />
        <pointLight position={[-2, 1, 2]} color="#7c3aed" intensity={1.4} />
        <Float speed={0.75} rotationIntensity={0.18} floatIntensity={0.25}>
          <Core />
          <SignalMesh />
        </Float>
      </Canvas>
    </div>
  )
}
