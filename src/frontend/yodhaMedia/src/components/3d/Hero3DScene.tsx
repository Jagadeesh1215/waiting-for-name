'use client'

// Bring in Three.js JSX element types for this file
import '@react-three/fiber'

import {
  Component,
  type ErrorInfo,
  type ReactNode,
  Suspense,
  useMemo,
  useRef,
} from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, OrbitControls, RoundedBox } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import type * as THREE from 'three'

/* ── Helpers ── */
const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 768
const isLowEnd = () =>
  typeof window !== 'undefined' &&
  (navigator.hardwareConcurrency <= 4 || isMobile())

/* ── Error boundary ── */
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true }
  }
  componentDidCatch(_error: Error, _info: ErrorInfo) {}
  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

/* ── Platform base (3 stacked cylinders) ── */
function PlatformBase() {
  const refs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ]

  useFrame((_state, delta) => {
    for (const ref of refs) {
      if (ref.current) ref.current.rotation.y += delta * 0.0015 * 60
    }
  })

  const tiers = useMemo(
    () => [
      { id: 'tier-outer', radius: 2.4, height: 0.05, y: -2.25, emissiveIntensity: 0.4 },
      { id: 'tier-mid',   radius: 2.0, height: 0.05, y: -2.17, emissiveIntensity: 0.3 },
      { id: 'tier-inner', radius: 1.5, height: 0.1,  y: -2.07, emissiveIntensity: 0.25 },
    ],
    [],
  )

  return (
    <group>
      {tiers.map((tier, i) => (
        <mesh key={tier.id} ref={refs[i]} position={[0, tier.y, 0]}>
          <cylinderGeometry args={[tier.radius, tier.radius, tier.height, 64]} />
          <meshStandardMaterial
            color="#2D1B69"
            metalness={0.95}
            roughness={0.05}
            emissive="#4A2C9E"
            emissiveIntensity={tier.emissiveIntensity}
          />
        </mesh>
      ))}
    </group>
  )
}

/* ── Laptop model ── */
function LaptopModel() {
  const screenRef = useRef<THREE.Group>(null)
  const screenGlowRef = useRef<THREE.Mesh>(null)

  const keyboardRows = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => ({
          x: (col - 4.5) * 0.22,
          z: (row - 1.5) * 0.18,
          key: `key-${row}-${col}`,
        })),
      ),
    [],
  )

  useFrame((state) => {
    if (screenRef.current) {
      screenRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.6) * 0.03
    }
    if (screenGlowRef.current) {
      const mat = screenGlowRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.6 + Math.sin(state.clock.elapsedTime * 1.2) * 0.2
    }
  })

  return (
    <group>
      {/* Keyboard base */}
      <mesh position={[0, -0.25, 0.3]} rotation={[-0.35, 0, 0]}>
        <boxGeometry args={[2.5, 0.12, 1.7]} />
        <meshStandardMaterial color="#1A1035" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Keyboard key rows */}
      {keyboardRows.map((row) =>
        row.map((key) => (
          <mesh
            key={key.key}
            position={[key.x, -0.17, key.z + 0.1]}
            rotation={[-0.35, 0, 0]}
          >
            <boxGeometry args={[0.17, 0.02, 0.14]} />
            <meshStandardMaterial color="#4A2C9E" metalness={0.7} roughness={0.3} />
          </mesh>
        )),
      )}
      {/* Screen panel */}
      <group ref={screenRef} position={[0, 0.6, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 1.5, 0.1]} />
          <meshStandardMaterial color="#1A1035" metalness={0.85} roughness={0.15} />
        </mesh>
        <mesh ref={screenGlowRef} position={[0, 0, 0.056]}>
          <planeGeometry args={[2.2, 1.25]} />
          <meshStandardMaterial
            color="#7B3FE4"
            emissive="#7B3FE4"
            emissiveIntensity={1.8}
            transparent
            opacity={0.92}
          />
        </mesh>
        {(
          [
            { y: 0.4, x: 0.1, w: 0.6, id: 'top' },
            { y: 0, x: 0.3, w: 0.8, id: 'mid' },
            { y: -0.4, x: -0.2, w: 1.0, id: 'bot' },
          ] as { y: number; x: number; w: number; id: string }[]
        ).map((bar) => (
          <mesh key={`bar-${bar.id}`} position={[bar.x, bar.y, 0.062]}>
            <planeGeometry args={[bar.w, 0.06]} />
            <meshStandardMaterial
              color="#F0C040"
              emissive="#F0C040"
              emissiveIntensity={0.8}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

/* ── Phone model ── */
function PhoneModel() {
  const phoneGroupRef = useRef<THREE.Group>(null)
  const screenRef = useRef<THREE.Mesh>(null)
  const mouseXRef = useRef(0)

  const handleMouseMove = useMemo(
    () => (e: MouseEvent) => {
      mouseXRef.current = (e.clientX / window.innerWidth - 0.5) * 2
    },
    [],
  )

  const listenerRegistered = useRef(false)
  if (!listenerRegistered.current && typeof window !== 'undefined') {
    window.addEventListener('mousemove', handleMouseMove)
    listenerRegistered.current = true
  }

  useFrame((state) => {
    if (phoneGroupRef.current) {
      const targetRotY = mouseXRef.current * (8 * (Math.PI / 180))
      phoneGroupRef.current.rotation.y +=
        (targetRotY - phoneGroupRef.current.rotation.y) * 0.06
    }
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial
      mat.emissiveIntensity = 1.3 + Math.sin(state.clock.elapsedTime * 0.9) * 0.2
    }
  })

  const analyticsBars = useMemo(
    () => [
      { id: 'abar-1', h: 0.18, c: '#D4A017', x: -0.15 },
      { id: 'abar-2', h: 0.28, c: '#F0C040', x: -0.07 },
      { id: 'abar-3', h: 0.22, c: '#D4A017', x: 0.01 },
      { id: 'abar-4', h: 0.35, c: '#F0C040', x: 0.09 },
      { id: 'abar-5', h: 0.25, c: '#7B3FE4', x: 0.17 },
    ],
    [],
  )

  return (
    <group ref={phoneGroupRef} position={[2.1, -0.5, 0]}>
      <mesh>
        <boxGeometry args={[0.65, 1.3, 0.1]} />
        <meshStandardMaterial
          color="#1A1035"
          metalness={0.85}
          roughness={0.15}
          emissive="#4A2C9E"
          emissiveIntensity={0.35}
        />
      </mesh>
      <mesh ref={screenRef} position={[0, 0, 0.056]}>
        <planeGeometry args={[0.55, 1.1]} />
        <meshStandardMaterial
          color="#4A2C9E"
          emissive="#D4A017"
          emissiveIntensity={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      {analyticsBars.map((bar) => (
        <mesh key={bar.id} position={[bar.x, -0.28 + bar.h / 2, 0.062]}>
          <boxGeometry args={[0.06, bar.h, 0.01]} />
          <meshStandardMaterial color={bar.c} emissive={bar.c} emissiveIntensity={0.9} />
        </mesh>
      ))}
      <mesh position={[0, 0.44, 0.062]}>
        <planeGeometry args={[0.45, 0.05]} />
        <meshStandardMaterial
          color="#F0C040"
          emissive="#F0C040"
          emissiveIntensity={1.0}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}

/* ── Orbiting icons ── */
const ICON_CONFIGS = [
  { color: '#D4A017', speed: 0.35, yOffset: 0.3,  radiusX: 3.5, radiusZ: 2.2, id: 'orbit-a' },
  { color: '#F0C040', speed: 0.28, yOffset: -0.4,  radiusX: 3.5, radiusZ: 2.2, id: 'orbit-b' },
  { color: '#D4A017', speed: 0.42, yOffset: 0.8,  radiusX: 3.5, radiusZ: 2.2, id: 'orbit-c' },
  { color: '#F0C040', speed: 0.22, yOffset: -0.1,  radiusX: 3.5, radiusZ: 2.2, id: 'orbit-d' },
]

function OrbitingIcons() {
  const iconRefs = useRef<THREE.Mesh[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    iconRefs.current.forEach((mesh, i) => {
      if (!mesh) return
      const icon = ICON_CONFIGS[i]
      const offset = (i / ICON_CONFIGS.length) * Math.PI * 2
      mesh.position.x = Math.cos(t * icon.speed + offset) * icon.radiusX
      mesh.position.z = Math.sin(t * icon.speed + offset) * icon.radiusZ
      mesh.position.y = icon.yOffset + Math.sin(t * 0.8 + offset) * 0.25
      mesh.rotation.y += 0.01
    })
  })

  return (
    <group>
      {ICON_CONFIGS.map((icon, i) => (
        <RoundedBox
          key={icon.id}
          args={[0.42, 0.42, 0.12]}
          radius={0.05}
          smoothness={4}
          ref={(el: THREE.Mesh | null) => {
            if (el) iconRefs.current[i] = el
          }}
        >
          <meshStandardMaterial
            color={icon.color}
            emissive={icon.color}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>
      ))}
    </group>
  )
}

/* ── Particles ── */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null)
  const mobile = isMobile()
  const count = mobile ? 100 : 300

  const { positions, colors, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 7
      phases[i] = Math.random() * Math.PI * 2
      const isGold = Math.random() > 0.45
      colors[i * 3]     = isGold ? 0.831 : 0.29
      colors[i * 3 + 1] = isGold ? 0.627 : 0.17
      colors[i * 3 + 2] = isGold ? 0.09  : 0.62
    }
    return { positions, colors, phases }
  }, [count])

  const origPositions = useMemo(() => positions.slice(), [positions])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    const geo = pointsRef.current.geometry
    const pos = geo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < count; i++) {
      const phase = phases[i]
      pos.setX(i, origPositions[i * 3]     + Math.cos(t * 0.18 + phase) * 0.35)
      pos.setY(i, origPositions[i * 3 + 1] + Math.sin(t * 0.22 + phase * 1.3) * 0.28)
      pos.setZ(i, origPositions[i * 3 + 2] + Math.cos(t * 0.15 + phase * 0.7) * 0.2)
    }
    pos.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.75} sizeAttenuation />
    </points>
  )
}

/* ── Camera rig with mouse parallax + scroll zoom ── */
function CameraRig() {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })

  const registered = useRef(false)
  if (!registered.current && typeof window !== 'undefined') {
    window.addEventListener('mousemove', (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    })
    registered.current = true
  }

  useFrame(() => {
    targetRef.current.x += (mouseRef.current.x * 0.25 - targetRef.current.x) * 0.08
    targetRef.current.y += (mouseRef.current.y * 0.2  - targetRef.current.y) * 0.08

    camera.position.x = targetRef.current.x
    camera.position.y = targetRef.current.y

    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0
    const docH =
      typeof document !== 'undefined'
        ? document.documentElement.scrollHeight - window.innerHeight
        : 1
    const scrollPct = Math.min(scrollY / Math.max(docH, 1), 1)

    camera.position.z = 8 - scrollPct * 0.8
    camera.rotation.x = -scrollPct * 0.08

    camera.lookAt(0, 0, 0)
  })

  return null
}

/* ── Post-processing (desktop only) ── */
function PostFX() {
  if (isLowEnd()) return null
  return (
    <EffectComposer>
      <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.9} intensity={1.4} />
      <Vignette eskil={false} offset={0.1} darkness={0.6} />
    </EffectComposer>
  )
}

/* ── Main scene ── */
function Scene() {
  return (
    <>
      <spotLight position={[4, 6, 4]}   intensity={2.5} color="#F0C040" castShadow={false} angle={0.4} penumbra={0.3} />
      <spotLight position={[-4, 3, -3]} intensity={1.8} color="#7B3FE4" angle={0.5} penumbra={0.4} />
      <ambientLight intensity={0.3} />

      <CameraRig />

      <Float speed={2} rotationIntensity={0.25} floatIntensity={0.5}>
        <LaptopModel />
      </Float>

      <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.3}>
        <PhoneModel />
      </Float>

      <OrbitingIcons />
      <PlatformBase />
      <Particles />
      <PostFX />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

/* ── Fallback gradient ── */
function SceneFallback() {
  return (
    <div
      className="w-full h-full rounded-2xl flex items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at 30% 50%, rgba(74,44,158,0.35) 0%, transparent 60%), radial-gradient(ellipse at 70% 20%, rgba(212,160,23,0.2) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(45,27,105,0.4) 0%, transparent 70%), #1A1035',
      }}
    >
      <div className="text-center space-y-4 p-8">
        <div className="w-24 h-16 mx-auto bg-[#2d1b69]/60 rounded-xl flex items-center justify-center text-4xl">
          💻
        </div>
        <div className="flex gap-4 justify-center">
          {['📱', '⭐', '📊', '🚀'].map((icon) => (
            <div
              key={icon}
              className="w-10 h-10 bg-[#d4a017]/20 rounded-lg flex items-center justify-center text-xl animate-[float_6s_ease-in-out_infinite]"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Loading placeholder ── */
function SceneLoader() {
  return (
    <div className="w-full h-full rounded-2xl flex items-center justify-center bg-[#1a1035]/50">
      <div className="w-8 h-8 border-2 border-[#d4a017] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

/* ── Exported component ── */
export function Hero3DScene() {
  const mobile = isMobile()
  const dpr: [number, number] = mobile ? [1, 1] : [1, 2]

  return (
    <WebGLErrorBoundary fallback={<SceneFallback />}>
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          camera={{ fov: 45, position: [0, 0, 8] }}
          style={{ width: '100%', height: '100%' }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={dpr}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </WebGLErrorBoundary>
  )
}

export default Hero3DScene
