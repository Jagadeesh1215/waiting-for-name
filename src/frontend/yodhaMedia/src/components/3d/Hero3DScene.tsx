/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Hero3DScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const width = mount.clientWidth
    const height = mount.clientHeight

    // Scene setup
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100)
    camera.position.set(0, 0, 6)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
    scene.add(ambientLight)
    const goldLight = new THREE.PointLight(0xd4a017, 1.5, 20)
    goldLight.position.set(5, 5, 5)
    scene.add(goldLight)
    const purpleLight = new THREE.PointLight(0x2d1b69, 0.8, 20)
    purpleLight.position.set(-5, -3, -5)
    scene.add(purpleLight)

    // Central sphere
    const centerGeo = new THREE.SphereGeometry(1.2, 64, 64)
    const centerMat = new THREE.MeshPhongMaterial({
      color: 0x2d1b69,
      emissive: 0x4a2d9e,
      emissiveIntensity: 0.4,
      shininess: 100,
    })
    const centerSphere = new THREE.Mesh(centerGeo, centerMat)
    scene.add(centerSphere)

    // Orbiting gold spheres
    const orbitGroup = new THREE.Group()
    scene.add(orbitGroup)
    const orbitCount = 6
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2
      const radius = 2.5
      const geo = new THREE.SphereGeometry(0.12, 16, 16)
      const mat = new THREE.MeshPhongMaterial({
        color: 0xd4a017,
        emissive: 0xd4a017,
        emissiveIntensity: 0.5,
        shininess: 200,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 0.5) * 0.5,
        Math.sin(angle) * radius,
      )
      orbitGroup.add(mesh)
    }

    // Floating icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(0.5, 0)
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x4a2d9e,
      wireframe: true,
    })
    const ico = new THREE.Mesh(icoGeo, icoMat)
    ico.position.set(2.8, 0.5, 0)
    scene.add(ico)

    // Particles
    const particleCount = 800
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      size: 0.03,
      color: 0xd4a017,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Animation
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      centerSphere.rotation.y = t * 0.3
      orbitGroup.rotation.y = t * 0.5
      orbitGroup.rotation.x = Math.sin(t * 0.2) * 0.3
      ico.rotation.x = t * 0.4
      ico.rotation.z = t * 0.2
      centerSphere.position.y = Math.sin(t * 0.8) * 0.15

      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="w-full h-full rounded-2xl overflow-hidden"
      style={{ minHeight: '400px' }}
      aria-hidden="true"
    />
  )
}
