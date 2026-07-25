import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import BackButton from '@/components/BackButton'

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Floating debris particles
  const debris = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 10 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden relative flex items-center justify-center">
      <BackButton />
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="grid404" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A059" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid404)" />
        </svg>
      </div>

      {/* Floating debris particles */}
      {debris.map(particle => (
        <motion.div
          key={particle.id}
          className="absolute bg-[#C5A059]/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 360],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* 3D Wireframe Collapsing Building */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center opacity-[0.08]"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
        }}
      >
        <svg viewBox="0 0 400 500" className="w-[80vw] md:w-[50vw] h-auto max-w-[600px]">
          {/* Main building structure - collapsing/floating */}
          <motion.g
            animate={{
              y: [0, -10, 0],
              rotate: [0, 0.5, -0.5, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Base platform */}
            <motion.path
              d="M50 450 L200 480 L350 450 L200 420 Z"
              fill="none"
              stroke="#C5A059"
              strokeWidth="0.5"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Building floors - staggered floating */}
            {[0, 1, 2, 3, 4, 5, 6, 7].map(floor => (
              <motion.g
                key={floor}
                animate={{
                  y: [0, -5 - floor * 2, 0],
                  x: [0, floor % 2 === 0 ? 3 : -3, 0],
                  rotate: [0, floor * 0.3, 0],
                }}
                transition={{
                  duration: 4 + floor * 0.5,
                  delay: floor * 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Left face */}
                <path
                  d={`M${80 + floor * 2} ${400 - floor * 45} L${80 + floor * 2} ${360 - floor * 45} L${200 + floor} ${340 - floor * 45} L${200 + floor} ${380 - floor * 45} Z`}
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="0.5"
                />
                {/* Right face */}
                <path
                  d={`M${320 - floor * 2} ${400 - floor * 45} L${320 - floor * 2} ${360 - floor * 45} L${200 + floor} ${340 - floor * 45} L${200 + floor} ${380 - floor * 45} Z`}
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="0.5"
                />
                {/* Top face */}
                <path
                  d={`M${80 + floor * 2} ${360 - floor * 45} L${200 + floor} ${340 - floor * 45} L${320 - floor * 2} ${360 - floor * 45} L${200 + floor} ${320 - floor * 45} Z`}
                  fill="none"
                  stroke="#C5A059"
                  strokeWidth="0.5"
                />
                {/* Window grid */}
                {[0, 1, 2].map(col => (
                  <motion.line
                    key={`h-${floor}-${col}`}
                    x1={100 + col * 40}
                    y1={370 - floor * 45}
                    x2={100 + col * 40}
                    y2={350 - floor * 45}
                    stroke="#C5A059"
                    strokeWidth="0.3"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, delay: col * 0.3, repeat: Infinity }}
                  />
                ))}
              </motion.g>
            ))}

            {/* Floating debris around building */}
            {[...Array(12)].map((_, i) => (
              <motion.rect
                key={`debris-${i}`}
                x={100 + Math.random() * 200}
                y={100 + Math.random() * 300}
                width={Math.random() * 15 + 5}
                height={Math.random() * 8 + 2}
                fill="none"
                stroke="#C5A059"
                strokeWidth="0.3"
                animate={{
                  y: [0, -50 - Math.random() * 50, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                  rotate: [0, 180 + Math.random() * 180, 360],
                  opacity: [0.1, 0.4, 0.1],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </motion.g>

          {/* Spiral orbit lines */}
          {[0, 1, 2].map(orbit => (
            <motion.ellipse
              key={orbit}
              cx="200"
              cy="280"
              rx={120 + orbit * 40}
              ry={30 + orbit * 10}
              fill="none"
              stroke="#C5A059"
              strokeWidth="0.3"
              strokeDasharray="5 10"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20 + orbit * 5,
                repeat: Infinity,
                ease: 'linear',
              }}
              style={{ transformOrigin: '200px 280px' }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Scanning lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(197, 160, 89, 0.02) 2px, rgba(197, 160, 89, 0.02) 4px)',
        }}
        animate={{ y: [0, 20] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'linear' }}
      />

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* 404 Text with glitch effect */}
        <motion.div
          className="relative mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="text-[25vw] md:text-[20vw] lg:text-[15vw] font-light text-transparent tracking-[0.3em] md:tracking-[0.5em] leading-none select-none"
            style={{
              WebkitTextStroke: '1px rgba(197, 160, 89, 0.3)',
              fontFamily: "'Playfair Display', serif",
            }}
            animate={{
              textShadow: [
                '0 0 30px rgba(197, 160, 89, 0.1)',
                '0 0 60px rgba(197, 160, 89, 0.2)',
                '0 0 30px rgba(197, 160, 89, 0.1)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            4 0 4
          </motion.h1>

          {/* Glitch layers */}
          <motion.div
            className="absolute inset-0 text-[25vw] md:text-[20vw] lg:text-[15vw] font-light text-[#C5A059]/10 tracking-[0.3em] md:tracking-[0.5em] leading-none pointer-events-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
            animate={{
              x: [-2, 2, -2],
              opacity: [0, 0.3, 0],
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3 }}
          >
            4 0 4
          </motion.div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-[10px] md:text-xs tracking-[0.4em] md:tracking-[0.5em] text-[#C5A059]/70 mb-4 font-mono">
            PAGE NOT FOUND
          </p>
          <h2
            className="text-lg md:text-2xl lg:text-3xl font-light text-[#F5F5F7]/80 tracking-[0.15em] md:tracking-[0.2em]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            This page doesn't exist
          </h2>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="w-px h-16 md:h-24 bg-gradient-to-b from-transparent via-[#C5A059]/40 to-transparent mx-auto mb-12"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        />

        {/* Return button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <Link
            to="/"
            className="group relative inline-flex items-center gap-4 md:gap-6 px-8 md:px-12 py-4 md:py-5 overflow-hidden"
          >
            {/* Button border */}
            <motion.div
              className="absolute inset-0 border border-[#C5A059]/30"
              whileHover={{ borderColor: 'rgba(197, 160, 89, 0.6)' }}
              transition={{ duration: 0.3 }}
            />

            {/* Hover fill */}
            <motion.div
              className="absolute inset-0 bg-[#C5A059]/5"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Arrow */}
            <motion.span
              className="relative text-[#C5A059] text-lg"
              whileHover={{ x: -5 }}
              transition={{ duration: 0.3 }}
            >
              ←
            </motion.span>

            {/* Text */}
            <span className="relative text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-[#F5F5F7]/80 group-hover:text-[#F5F5F7] transition-colors duration-300 font-mono">
              RETURN HOME
            </span>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#C5A059]/50" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#C5A059]/50" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#C5A059]/50" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#C5A059]/50" />
          </Link>
        </motion.div>

        {/* Status indicator */}
        <motion.div
          className="mt-16 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-[#C5A059]/60"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-[#F5F5F7]/60 font-mono">
            ERROR 404
          </span>
        </motion.div>
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(5,5,5,0.8) 100%)',
        }}
      />
    </div>
  )
}

export default NotFound
