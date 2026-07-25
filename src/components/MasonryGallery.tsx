import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '@/data/projects'

interface CursorPosition {
  x: number
  y: number
}

// Floating Cursor Component
const FloatingCursor = ({
  title,
  position,
  isVisible,
}: {
  title: string
  position: CursorPosition
  isVisible: boolean
}) => {
  return (
    <motion.div
      className="fixed pointer-events-none z-50 hidden md:flex items-center justify-center"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="bg-foreground px-6 py-3 rounded-full">
        <span className="text-xs font-sans font-medium uppercase tracking-[0.15em] text-background whitespace-nowrap">
          {title}
        </span>
      </div>
    </motion.div>
  )
}

// Project Card Component
const ProjectCard = ({
  project,
  index,
  variant = 'default',
  onHover,
  onLeave,
  onMouseMove,
}: {
  project: (typeof projects)[0]
  index: number
  variant?: 'large' | 'medium' | 'small' | 'default'
  onHover: (title: string) => void
  onLeave: () => void
  onMouseMove: (e: React.MouseEvent) => void
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [50, -50])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05])

  const aspectRatios = {
    large: 'aspect-[3/4]',
    medium: 'aspect-[4/5]',
    small: 'aspect-square',
    default: 'aspect-[4/5]',
  }

  return (
    <motion.div
      ref={cardRef}
      data-project-title={project.title}
      className="relative group cursor-none"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => onHover(project.title)}
      onMouseLeave={onLeave}
      onMouseMove={onMouseMove}
    >
      <Link
        to={`/project/${project.id}`}
        className={`block w-full ${aspectRatios[variant]} overflow-hidden`}
      >
        {/* Image Container with Parallax */}
        <motion.div
          className="w-full h-full overflow-hidden"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
          transition={{ duration: 1.4, delay: 0.1 + index * 0.08, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.div className="w-full h-full" style={{ y, scale }}>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
          </motion.div>
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
        </motion.div>
      </Link>

      {/* Caption - Always Visible on Mobile */}
      <motion.div
        className="mt-4 md:mt-6"
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
      >
        {/* Category Label */}
        <p className="text-[10px] md:text-xs font-sans font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {project.category}
        </p>

        {/* Title */}
        <h3 className="text-lg md:text-xl lg:text-2xl font-sans font-medium uppercase tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>

        {/* Location */}
        <p className="text-sm font-serif text-muted-foreground mt-2 hidden md:block">
          {project.location}
        </p>
      </motion.div>
    </motion.div>
  )
}

const MasonryGallery = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 })
  const pointer = useRef<CursorPosition>({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  // On scroll the pointer stays put while the page moves beneath it, so mouseenter
  // never fires for the card that slides under the cursor. Re-run the hit test on
  // scroll to keep the floating label in sync with whatever image is now under it.
  useEffect(() => {
    const trackPointer = (e: MouseEvent) => {
      pointer.current = { x: e.clientX, y: e.clientY }
    }

    let queued = false
    const syncLabelToPointer = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(() => {
        queued = false
        const { x, y } = pointer.current
        const target = document.elementFromPoint(x, y) as HTMLElement | null
        const card = target?.closest<HTMLElement>('[data-project-title]')
        setHoveredProject(card?.dataset.projectTitle ?? null)
        setCursorPos({ x, y })
      })
    }

    window.addEventListener('mousemove', trackPointer, { passive: true })
    window.addEventListener('scroll', syncLabelToPointer, { passive: true })
    return () => {
      window.removeEventListener('mousemove', trackPointer)
      window.removeEventListener('scroll', syncLabelToPointer)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const headerY = useTransform(scrollYProgress, [0, 1], [60, -30])

  return (
    <>
      {/* Floating Cursor */}
      <FloatingCursor
        title={hoveredProject || ''}
        position={cursorPos}
        isVisible={!!hoveredProject}
      />

      <section id="portfolio" ref={sectionRef} className="py-32 md:py-40 lg:py-48 bg-background">
        <div className="container-luxury">
          {/* Section Header */}
          <motion.div className="mb-16 md:mb-24 lg:mb-32" style={{ y: headerY }}>
            {/* Label */}
            <motion.p
              className="text-[11px] md:text-xs font-sans font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Selected Works
            </motion.p>

            {/* Title */}
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-medium uppercase tracking-wide text-foreground"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              The <span className="font-serif italic font-light normal-case">Portfolio</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl font-serif text-muted-foreground mt-6 md:mt-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A curated collection of our most significant works—structures that stand as testament
              to what architecture achieves when vision meets craft.
            </motion.p>

            {/* Bronze Line */}
            <motion.div
              className="w-24 h-px bg-primary mt-8 md:mt-12"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Asymmetrical Masonry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24 lg:gap-y-32 gap-x-6 md:gap-x-8">
            {/* Row 1 - Large left, Medium right offset */}
            <div className="md:col-span-7">
              <ProjectCard
                project={projects[0]}
                index={0}
                variant="large"
                onHover={setHoveredProject}
                onLeave={() => setHoveredProject(null)}
                onMouseMove={handleMouseMove}
              />
            </div>
            <div className="md:col-span-5 md:mt-40 lg:mt-56">
              <ProjectCard
                project={projects[1]}
                index={1}
                variant="medium"
                onHover={setHoveredProject}
                onLeave={() => setHoveredProject(null)}
                onMouseMove={handleMouseMove}
              />
            </div>

            {/* Row 2 - Small left offset, Large right */}
            {projects[2] && (
              <>
                <div className="md:col-span-4 md:col-start-2 md:-mt-20">
                  <ProjectCard
                    project={projects[2]}
                    index={2}
                    variant="small"
                    onHover={setHoveredProject}
                    onLeave={() => setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                  />
                </div>
                <div className="md:col-span-6 md:col-start-7">
                  <ProjectCard
                    project={projects[3]}
                    index={3}
                    variant="large"
                    onHover={setHoveredProject}
                    onLeave={() => setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                  />
                </div>
              </>
            )}

            {/* Row 3 - Wide centered */}
            {projects[4] && (
              <div className="md:col-span-8 md:col-start-3 md:mt-10">
                <ProjectCard
                  project={projects[4]}
                  index={4}
                  variant="large"
                  onHover={setHoveredProject}
                  onLeave={() => setHoveredProject(null)}
                  onMouseMove={handleMouseMove}
                />
              </div>
            )}

            {/* Row 4 - Two columns, offset */}
            {projects[5] && (
              <>
                <div className="md:col-span-5">
                  <ProjectCard
                    project={projects[5]}
                    index={5}
                    variant="medium"
                    onHover={setHoveredProject}
                    onLeave={() => setHoveredProject(null)}
                    onMouseMove={handleMouseMove}
                  />
                </div>
                {projects[6] && (
                  <div className="md:col-span-5 md:col-start-8 md:mt-32">
                    <ProjectCard
                      project={projects[6] || projects[0]}
                      index={6}
                      variant="medium"
                      onHover={setHoveredProject}
                      onLeave={() => setHoveredProject(null)}
                      onMouseMove={handleMouseMove}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* View All Link */}
          <motion.div
            className="mt-24 md:mt-32 lg:mt-40 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Link to="/projects" className="inline-flex items-center gap-4 group">
              <span className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors duration-300">
                View All Projects
              </span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-foreground group-hover:text-primary group-hover:translate-x-2 transition-all duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default MasonryGallery
