import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, OrbitControls, useCursor } from '@react-three/drei'
import * as THREE from 'three'
import { useReducedMotion } from '../../utils/useReducedMotion'

function useRafMouseParallax() {
  const reduced = useReducedMotion()
  const mouse = useRef(new THREE.Vector2(0, 0))

  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      mouse.current.set(x, y)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])

  return mouse
}

function Particles({ count = 220 }: { count?: number }) {
  const reduced = useReducedMotion()
  const pointsRef = useRef<THREE.Points | null>(null)
  const geom = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.cos(phi) + (Math.random() - 0.5) * 2
      const z = r * Math.sin(phi) * Math.sin(theta)

      positions[i * 3 + 0] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z

      const c = new THREE.Color()
      c.setHSL(0.58 + Math.random() * 0.15, 0.7, 0.65)
      colors[i * 3 + 0] = c.r
      colors[i * 3 + 1] = c.g
      colors[i * 3 + 2] = c.b
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    return g
  }, [count])

  useFrame((state, dt) => {
    if (!pointsRef.current) return
    if (reduced) return

    pointsRef.current.rotation.y += dt * 0.07
    pointsRef.current.rotation.x += dt * 0.03
  })

  return (
    <points ref={pointsRef} geometry={geom}>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </points>
  )
}

function Aurora({ intensity = 1 }: { intensity?: number }) {
  const reduced = useReducedMotion()
  const mesh = useRef<THREE.Mesh | null>(null)

  useFrame((state) => {
    if (reduced) return
    const t = state.clock.getElapsedTime()
    if (!mesh.current) return

    mesh.current.rotation.z = Math.sin(t * 0.12) * 0.2
    mesh.current.position.y = Math.sin(t * 0.2) * 0.12
    // @ts-expect-error custom material
    mesh.current.material.uniforms.uTime.value = t
  })

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        varying vec2 vUv;
        void main(){
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        void main(){
          vec2 uv = vUv;
          float t = uTime;
          float glow = 0.0;
          glow += exp(-pow(length(uv-0.5)*1.9, 2.0)*3.2);
          glow *= 0.85 + 0.15*sin(t*0.8 + uv.x*6.0);
          vec3 c1 = vec3(0.27, 0.55, 1.0);
          vec3 c2 = vec3(0.71, 0.24, 1.0);
          vec3 col = mix(c1, c2, uv.y);
          float alpha = glow * 0.55 * ${intensity.toFixed(2)};
          gl_FragColor = vec4(col, alpha);
        }
      `,
    })
  }, [intensity])

  return (
    <mesh ref={mesh} rotation-x={-Math.PI / 2} position={[0, -1.2, -2.2]}>
      <planeGeometry args={[6.5, 6.5, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

function GlassOrb({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const reduced = useReducedMotion()
  const orb = useRef<THREE.Mesh | null>(null)
  const { viewport } = useThree()

  useFrame((state, dt) => {
    if (reduced) return
    if (!orb.current) return
    const t = state.clock.getElapsedTime()

    const mx = mouse.current.x
    const my = mouse.current.y

    orb.current.position.x = mx * 0.35
    orb.current.position.y = my * 0.22
    orb.current.rotation.y += dt * 0.22
    orb.current.rotation.x = Math.sin(t * 0.35) * 0.05
  })

  const radius = 0.95
  return (
    <mesh ref={orb} scale={Math.min(1.15, viewport.dpr * 1)}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshPhysicalMaterial
        color={new THREE.Color('#7aa7ff')}
        roughness={0.18}
        metalness={0.65}
        transmission={0.95}
        thickness={1.4}
        ior={1.45}
        transparent
        opacity={0.95}
        specularIntensity={0.9}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function CameraRig({ mouse }: { mouse: React.MutableRefObject<THREE.Vector2> }) {
  const reduced = useReducedMotion()
  const { camera } = useThree()

  useFrame((state) => {
    if (reduced) return
    const t = state.clock.getElapsedTime()

    const mx = mouse.current.x
    const my = mouse.current.y

    camera.position.x = mx * 0.6
    camera.position.y = 0.4 + my * 0.35
    camera.position.z = 4.2 + Math.sin(t * 0.15) * 0.35
    camera.lookAt(0, 0, -2)
  })

  return null
}

export default function HeroScene() {
  const mouse = useRafMouseParallax()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setEnabled(true))
    return () => window.cancelAnimationFrame(id)
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0.7, 4.2], fov: 38 }}>
        <Suspense fallback={null}>
          <fog attach="fog" args={['#f0f0ee', 2.8, 10]} />
          <color attach="background" args={['#f0f0ee']} />

          <CameraRig mouse={mouse} />

          <ambientLight intensity={0.35} />

          <directionalLight position={[2.5, 3.5, 2.0]} intensity={1.05} />
          <pointLight position={[-2.0, -0.4, 1.5]} intensity={0.65} color={'#8ab4ff'} />

          <Aurora intensity={1.0} />

          <Float speed={reducedSpeed()} rotationIntensity={0.28} floatIntensity={0.22}>
            <GlassOrb mouse={mouse} />
          </Float>

          <Particles count={260} />

          <Environment preset="city" />
          <Lightformer position={[0, 2.0, -1.5]} intensity={1.15} color="#8ab4ff" scale={[2.2, 1.2, 1]} />
        </Suspense>

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

function reducedSpeed() {
  // keep predictable even with reduced-motion; actual reduced logic is in hooks.
  return 0.7
}

