import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const services = [
  {
    number: '01',
    title: 'Architectural Design',
    description:
      'Residential and commercial buildings designed for their site, their brief, and the way people actually use them.',
    image: '/images/img-43a79c979a71.webp',
    link: '/expertise#architectural-design',
  },
  {
    number: '02',
    title: 'Interior Design',
    description:
      'Interiors resolved down to the detail, balancing material, light, and proportion across every room.',
    image: '/images/img-6b3f2371a6a3.webp',
    link: '/expertise#interior-design',
  },
  {
    number: '03',
    title: 'Real Estate Development',
    description:
      'End-to-end development across some of Lagos’s most established addresses, from feasibility to handover.',
    image: '/images/img-15c6a3ec3283.webp',
    link: '/expertise#development',
  },
  {
    number: '04',
    title: 'Conservation & Heritage',
    description:
      'Careful restoration of heritage buildings, retaining what matters while making them fit for continued use.',
    image: '/images/img-70fefa1d7639.webp',
    link: '/expertise#conservation-heritage',
  },
]

interface MinaleHeroProps {
  isReady: boolean
}

const MinaleHero = ({ isReady }: MinaleHeroProps) => {
  const [currentService, setCurrentService] = useState(0)

  useEffect(() => {
    if (!isReady) return

    const interval = setInterval(() => {
      setCurrentService(prev => (prev + 1) % services.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isReady])

  if (!isReady) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentService}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={services[currentService].image}
            alt={services[currentService].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/45" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container-luxury text-center text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentService}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-caption-luxury mb-4 text-white/70">
              {services[currentService].number}
            </div>
            <h1 className="text-hero mb-6 text-white">{services[currentService].title}</h1>
            <p className="text-body-luxury mb-8 max-w-2xl mx-auto text-white/90">
              {services[currentService].description}
            </p>
            <Link
              to={services[currentService].link}
              className="btn-luxury inline-block border-white/50 text-white hover:bg-white hover:text-black"
            >
              Explore Service
            </Link>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-2 mt-12">
          {services.map((service, index) => (
            <button
              key={service.title}
              onClick={() => setCurrentService(index)}
              className="w-11 h-11 flex items-center justify-center touch-target group"
              aria-label={`Show ${service.title}`}
              aria-current={index === currentService}
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentService
                    ? 'w-8 bg-white'
                    : 'w-2 bg-white/50 group-hover:bg-white/80'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MinaleHero
