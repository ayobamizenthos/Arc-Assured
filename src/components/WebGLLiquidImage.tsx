import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

// Custom shader for liquid distortion
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uHover;
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from mouse
    float dist = distance(uv, uMouse);
    float strength = smoothstep(0.5, 0.0, dist) * uIntensity * uHover;
    
    // Liquid ripple effect
    float ripple = sin(dist * 15.0 - uTime * 3.0) * 0.02 * strength;
    float wave = sin(uv.y * 10.0 + uTime * 2.0) * 0.005 * uHover;
    
    // Displacement
    vec2 displacement = vec2(
      sin(dist * 20.0 - uTime * 4.0) * strength * 0.03,
      cos(dist * 20.0 - uTime * 3.5) * strength * 0.03
    );
    
    // Add subtle wave when hovering
    displacement += vec2(wave, wave * 0.5);
    
    vec2 distortedUV = uv + displacement + ripple;
    
    // Chromatic aberration on hover
    float aberration = strength * 0.01;
    float r = texture2D(uTexture, distortedUV + vec2(aberration, 0.0)).r;
    float g = texture2D(uTexture, distortedUV).g;
    float b = texture2D(uTexture, distortedUV - vec2(aberration, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`

interface LiquidMeshProps {
  image: string
  intensity?: number
}

const LiquidMesh = ({ image, intensity = 1 }: LiquidMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { viewport } = useThree()
  const [hovered, setHovered] = useState(false)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetMouseRef = useRef({ x: 0.5, y: 0.5 })
  const hoverRef = useRef(0)

  const texture = useTexture(image)

  useEffect(() => {
    if (texture) {
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
    }
  }, [texture])

  useFrame(state => {
    if (materialRef.current) {
      // Smooth mouse movement
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * 0.08
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * 0.08

      // Smooth hover transition
      const targetHover = hovered ? 1 : 0
      hoverRef.current += (targetHover - hoverRef.current) * 0.06

      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
      materialRef.current.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y)
      materialRef.current.uniforms.uHover.value = hoverRef.current
    }
  })

  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (meshRef.current && e.uv) {
      targetMouseRef.current.x = e.uv.x
      targetMouseRef.current.y = e.uv.y
    }
  }

  const uniforms = {
    uTexture: { value: texture },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uTime: { value: 0 },
    uIntensity: { value: intensity },
    uHover: { value: 0 },
  }

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

interface WebGLLiquidImageProps {
  src: string
  alt: string
  className?: string
  intensity?: number
}

const WebGLLiquidImage = ({ src, alt, className = '', intensity = 1 }: WebGLLiquidImageProps) => {
  const [isWebGLSupported, setIsWebGLSupported] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check WebGL support
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) {
        setIsWebGLSupported(false)
      }
    } catch {
      setIsWebGLSupported(false)
    }

    // Preload image
    const img = new Image()
    img.onload = () => setIsLoaded(true)
    img.src = src
  }, [src])

  // Fallback to regular image if WebGL not supported
  if (!isWebGLSupported) {
    return <img src={src} alt={alt} className={className} />
  }

  return (
    <div className={`relative ${className}`} style={{ touchAction: 'pan-y' }}>
      {/* Fallback image while loading */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />

      {/* WebGL Canvas */}
      {isLoaded && (
        <Canvas
          className="absolute inset-0 !touch-auto"
          gl={{ antialias: true, alpha: true }}
          dpr={Math.min(window.devicePixelRatio, 2)}
        >
          <Suspense fallback={null}>
            <LiquidMesh image={src} intensity={intensity} />
          </Suspense>
        </Canvas>
      )}
    </div>
  )
}

export default WebGLLiquidImage
