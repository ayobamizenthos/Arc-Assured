import { useRef, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { projects } from '@/data/projects'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import PageTransition from '@/components/PageTransition'

// Full-screen gallery lightbox
const ImageLightbox = ({
  images,
  currentIndex,
  onClose,
  onNext,
  onPrev,
}: {
  images: string[]
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 bg-foreground/95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-8 right-8 text-background/60 hover:text-background transition-colors z-10"
        onClick={onClose}
      >
        <span className="text-xs uppercase tracking-widest font-manrope">Close</span>
      </button>

      {/* Image Counter */}
      <div className="absolute top-8 left-8 text-background/60 font-manrope text-sm">
        {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
      </div>

      {/* Navigation */}
      <button
        className="absolute left-8 top-1/2 -translate-y-1/2 text-background/60 hover:text-background transition-colors"
        onClick={e => {
          e.stopPropagation()
          onPrev()
        }}
      >
        <span className="text-xs uppercase tracking-widest font-manrope">Prev</span>
      </button>

      <button
        className="absolute right-8 top-1/2 -translate-y-1/2 text-background/60 hover:text-background transition-colors"
        onClick={e => {
          e.stopPropagation()
          onNext()
        }}
      >
        <span className="text-xs uppercase tracking-widest font-manrope">Next</span>
      </button>

      {/* Image */}
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt=""
        className="max-w-[90vw] max-h-[85vh] object-contain"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={e => e.stopPropagation()}
      />
    </motion.div>
  )
}

// Editorial image with parallax
const EditorialImage = ({
  src,
  caption,
  index,
  onClick,
}: {
  src: string
  caption: string
  index: number
  onClick: () => void
}) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(imageRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <div ref={imageRef} className="relative my-16 md:my-24 lg:my-32">
      <motion.div
        className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden cursor-pointer group"
        initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }}
        animate={isInView ? { opacity: 1, clipPath: 'inset(0 0 0 0)' } : {}}
        transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        onClick={onClick}
      >
        <motion.img
          src={src}
          alt={caption}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ y: imageY }}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500 flex items-center justify-center">
          <motion.span
            className="text-background text-xs uppercase tracking-widest font-manrope opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={{ y: 10 }}
            whileHover={{ y: 0 }}
          >
            View Full Screen
          </motion.span>
        </div>
      </motion.div>

      {/* Caption */}
      <motion.div
        className="flex justify-between items-center mt-4 px-4"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground font-manrope">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="text-xs text-muted-foreground font-manrope">{caption}</span>
      </motion.div>
    </div>
  )
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const project = projects.find(p => p.id === id)

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const currentIndex = projects.findIndex(p => p.id === id)
  const nextProject = projects[(currentIndex + 1) % projects.length]

  const heroRef = useRef<HTMLDivElement>(null)
  const heroInView = useInView(heroRef, { once: true })

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1.1, 1])
  const heroOverlayOpacity = useTransform(heroScrollProgress, [0, 0.5], [0.3, 0.6])

  const nextRef = useRef<HTMLDivElement>(null)
  const nextInView = useInView(nextRef, { once: true, margin: '-200px' })

  const { scrollYProgress: nextScrollProgress } = useScroll({
    target: nextRef,
    offset: ['start end', 'end end'],
  })

  const currentTitleOpacity = useTransform(nextScrollProgress, [0, 0.5], [1, 0])
  const nextTitleScale = useTransform(nextScrollProgress, [0.3, 1], [0.8, 1])
  const nextTitleOpacity = useTransform(nextScrollProgress, [0.3, 0.7], [0, 1])

  const imageCaptions = useMemo(
    () => [
      'Exterior elevation',
      'Interior spatial flow',
      'Material detail',
      'Environmental integration',
    ],
    []
  )

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => setLightboxOpen(false)

  const nextImage = () => {
    if (project) {
      setLightboxIndex(prev => (prev + 1) % project.images.length)
    }
  }

  const prevImage = () => {
    if (project) {
      setLightboxIndex(prev => (prev - 1 + project.images.length) % project.images.length)
    }
  }

  if (!project) {
    return (
      <PageTransition>
        <SmoothScroll>
          <Navigation />
          <div className="min-h-screen-safe bg-background flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-manrope mb-4">
                Project not found
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-4 text-xs uppercase tracking-widest font-manrope text-foreground hover:text-primary transition-colors"
              >
                <span>View All Projects</span>
                <span className="w-8 h-px bg-current" />
              </Link>
            </div>
          </div>
        </SmoothScroll>
      </PageTransition>
    )
  }

  return (
    <PageTransition>
      <SmoothScroll>
        <Navigation />

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <ImageLightbox
              images={project.images}
              currentIndex={lightboxIndex}
              onClose={closeLightbox}
              onNext={nextImage}
              onPrev={prevImage}
            />
          )}
        </AnimatePresence>

        <main className="bg-background">
          {/* Hero */}
          <section ref={heroRef} className="relative h-screen-safe w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={heroInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ scale: heroImageScale }}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent"
                style={{ opacity: heroOverlayOpacity }}
              />
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24 container-wide overflow-hidden">
              <motion.div
                initial={{ y: '100%' }}
                animate={heroInView ? { y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="text-xs uppercase tracking-widest text-background/60 mb-4 font-manrope">
                  {project.category} — {project.location}
                </p>
                <h1 className="font-cormorant italic font-extralight text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-background pl-[0.12em]">
                  {project.title}
                </h1>
              </motion.div>
            </div>

            <motion.div
              className="absolute bottom-8 right-5 md:right-12 lg:right-20"
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 }}
            >
              <div className="w-px h-12 bg-background/30" />
            </motion.div>
          </section>

          {/* Project Stats Bar */}
          <section className="py-8 border-b border-primary/20">
            <div className="container-wide">
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {project.stats.map((stat, index) => (
                  <div key={index} className="text-center md:text-left">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-manrope">
                      {stat.label}
                    </p>
                    <p className="font-cormorant italic text-3xl md:text-4xl text-foreground">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* The Story */}
          <section className="py-24 md:py-40">
            <div className="container-wide">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Project Details Sidebar */}
                <motion.div
                  className="lg:col-span-4"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-xs uppercase tracking-widest text-primary mb-8 font-manrope">
                    Project Details
                  </p>

                  <div className="space-y-6 border-t border-primary/20 pt-8">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-manrope">
                        Client
                      </p>
                      <p className="font-manrope text-foreground">{project.details.client}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-manrope">
                        Location
                      </p>
                      <p className="font-manrope text-foreground">{project.location}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-manrope">
                        Year
                      </p>
                      <p className="font-manrope text-foreground">{project.year}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-manrope">
                        Area
                      </p>
                      <p className="font-manrope text-foreground">{project.details.area}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-manrope">
                        Lead Architect
                      </p>
                      <p className="font-manrope text-foreground">{project.details.architect}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-manrope">
                        Duration
                      </p>
                      <p className="font-manrope text-foreground">{project.details.duration}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                  className="lg:col-span-8"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  <p className="text-xs uppercase tracking-widest text-primary mb-8 font-manrope">
                    The Approach
                  </p>

                  <p className="font-manrope text-xl md:text-2xl text-foreground leading-relaxed mb-12 first-letter:text-6xl first-letter:font-cormorant first-letter:italic first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:text-primary">
                    {project.description}
                  </p>

                  <p className="font-manrope text-muted-foreground leading-relaxed mb-8">
                    Every element was considered to create spaces that hold up over time. The
                    interplay of light and material moves occupants through the building, revealing
                    new perspectives at each turn. Indigenous materials were sourced from across
                    Nigeria, supporting local artisans and keeping the detailing authentic.
                  </p>

                  <p className="font-manrope text-muted-foreground leading-relaxed">
                    The design responds directly to its Nigerian context—the tropical climate, the
                    cultural setting, and the wider ambition of a built environment still defining
                    its own identity. The result is less a single object than an argument for what
                    architecture here can be when intent and execution meet.
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Full-Width Images */}
            <div className="mt-16 md:mt-24">
              {project.images.map((image, index) => (
                <EditorialImage
                  key={index}
                  src={image}
                  caption={imageCaptions[index] || `View ${index + 1}`}
                  index={index}
                  onClick={() => openLightbox(index)}
                />
              ))}
            </div>

            {/* Closing Quote */}
            <div className="container-wide mt-24 md:mt-40">
              <motion.blockquote
                className="font-cormorant italic text-2xl md:text-3xl lg:text-4xl text-foreground font-extralight text-center max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                "Architecture is the thoughtful making of space—a dialogue between earth and sky,
                between tradition and tomorrow."
              </motion.blockquote>

              <motion.p
                className="text-xs uppercase tracking-widest text-primary text-center mt-6 font-manrope"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                — Olayinka Ibrahim, Founder
              </motion.p>
            </div>
          </section>

          {/* Next Project */}
          <section ref={nextRef} className="relative min-h-screen overflow-hidden">
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={nextInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                src={nextProject.image}
                alt={nextProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-foreground/50" />
            </motion.div>

            <div className="relative h-screen flex flex-col items-center justify-center text-center px-5">
              <motion.div className="absolute" style={{ opacity: currentTitleOpacity }}>
                <p className="text-xs uppercase tracking-widest text-background/60 mb-2 font-manrope">
                  Current Project
                </p>
                <p className="font-cormorant italic text-2xl md:text-3xl text-background font-extralight">
                  {project.title}
                </p>
              </motion.div>

              <motion.div
                style={{
                  scale: nextTitleScale,
                  opacity: nextTitleOpacity,
                }}
              >
                <p className="text-xs uppercase tracking-widest text-background/60 mb-4 font-manrope">
                  Next Project
                </p>
                <Link to={`/project/${nextProject.id}`} className="block group">
                  <h2 className="font-cormorant italic font-extralight text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-background group-hover:text-background/80 transition-colors duration-500">
                    {nextProject.title}
                  </h2>

                  <motion.div
                    className="mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={nextInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    <span className="text-xs uppercase tracking-widest text-background/60 font-manrope border-b border-background/30 pb-2 group-hover:border-background transition-colors duration-500">
                      View Project
                    </span>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </PageTransition>
  )
}

export default ProjectDetail
