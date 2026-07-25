import { useState, useRef, useMemo, lazy, Suspense, forwardRef } from 'react'
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
  LayoutGroup,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Filter } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import PageTransition from '@/components/PageTransition'

// Lazy load WebGL component for performance
const WebGLLiquidImage = lazy(() => import('@/components/WebGLLiquidImage'))

interface Project {
  id: string
  title: string
  category: 'residential' | 'commercial'
  subcategory: string
  image: string
  year: string
  location: string
  description: string
  featured?: boolean
}

const allProjects: Project[] = [
  {
    id: 'aurora-residence',
    title: 'Aurora Residence',
    category: 'residential',
    subcategory: 'Private Villa',
    image: '/images/img-02d1c415affc.webp',
    year: '2024',
    location: 'Ikoyi, Lagos',
    description:
      'A private villa organised around light and open space, where contemporary architecture meets tropical living.',
    featured: true,
  },
  {
    id: 'meridian-tower',
    title: 'Meridian Tower',
    category: 'commercial',
    subcategory: 'Corporate HQ',
    image: '/images/img-7019573fdcd5.webp',
    year: '2024',
    location: 'Victoria Island',
    description:
      "A corporate headquarters that adds a considered vertical presence to Lagos's commercial skyline.",
    featured: true,
  },
  {
    id: 'onyx-villa',
    title: 'Onyx Villa',
    category: 'residential',
    subcategory: 'Luxury Estate',
    image: '/images/img-ee7ce67a17be.webp',
    year: '2023',
    location: 'Lekki, Lagos',
    description:
      'A private family compound where a dark, restrained palette is balanced by organic material warmth.',
  },
  {
    id: 'vertex-offices',
    title: 'Vertex Offices',
    category: 'commercial',
    subcategory: 'Mixed-Use',
    image: '/images/img-3eacbaab3055.webp',
    year: '2024',
    location: 'Ikeja GRA',
    description:
      'A mixed-use workspace planned to support focus and collaboration in equal measure.',
  },
  {
    id: 'serene-penthouse',
    title: 'Serene Penthouse',
    category: 'residential',
    subcategory: 'Interior Design',
    image: '/images/img-f82df319a5ae.webp',
    year: '2024',
    location: 'Banana Island',
    description:
      'A penthouse interior resolved through careful sequencing of space, light, and material.',
  },
  {
    id: 'coastal-retreat',
    title: 'Coastal Retreat',
    category: 'residential',
    subcategory: 'Beach House',
    image: '/images/img-11f5b76a796c.webp',
    year: '2023',
    location: 'Lakowe, Lagos',
    description:
      'A beach house where the architecture opens fully to the horizon, dissolving the line between land and sea.',
  },
  {
    id: 'heritage-plaza',
    title: 'Heritage Plaza',
    category: 'commercial',
    subcategory: 'Retail Complex',
    image: '/images/img-9561b362b950.webp',
    year: '2024',
    location: 'Marina, Lagos',
    description:
      'A retail complex that reworks a historic foundation for contemporary commercial use.',
  },
  {
    id: 'eden-gardens',
    title: 'Eden Gardens',
    category: 'residential',
    subcategory: 'Townhouse',
    image: '/images/img-2d8e7f40a0aa.webp',
    year: '2023',
    location: 'Yaba, Lagos',
    description:
      'A townhouse scheme that treats urban density as a green, layered vertical community.',
  },
  {
    id: 'zenith-tower',
    title: 'Zenith Tower',
    category: 'commercial',
    subcategory: 'Office Building',
    image: '/images/img-87ea1c62441b.webp',
    year: '2024',
    location: 'Ikoyi, Lagos',
    description: 'An office tower in glass and steel, rising cleanly above the Lagos lagoon.',
  },
  {
    id: 'sanctuary-villa',
    title: 'Sanctuary Villa',
    category: 'residential',
    subcategory: 'Private Villa',
    image: '/images/img-547a04665bef.webp',
    year: '2024',
    location: 'Banana Island',
    description:
      'A private villa where seclusion and quiet are treated as the central design brief.',
  },
]

const filters = [
  { key: 'all', label: 'All Projects' },
  { key: 'residential', label: 'Residential' },
  { key: 'commercial', label: 'Commercial' },
]

// Floating cursor for projects
const FloatingCursor = ({
  position,
  isVisible,
}: {
  position: { x: number; y: number }
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
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
      }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        {/* Outer ring */}
        <motion.div
          className="w-24 h-24 rounded-full border border-foreground/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
        {/* Inner content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-foreground text-background px-4 py-2 rounded-full">
            <span className="text-[10px] font-sans font-medium uppercase tracking-[0.15em] whitespace-nowrap">
              View Project
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Project Card with WebGL
interface ProjectCardProps {
  project: Project
  index: number
  onHover: () => void
  onLeave: () => void
  onMouseMove: (e: React.MouseEvent) => void
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ project, index, onHover, onLeave, onMouseMove }, forwardedRef) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const setCardRef = (node: HTMLDivElement | null) => {
      cardRef.current = node
      if (typeof forwardedRef === 'function') forwardedRef(node)
      else if (forwardedRef) forwardedRef.current = node
    }
    const isInView = useInView(cardRef, { once: true, margin: '-50px' })
    const [isHovered, setIsHovered] = useState(false)

    const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ['start end', 'end start'],
    })

    const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30])

    const handleMouseEnter = () => {
      setIsHovered(true)
      onHover()
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      onLeave()
    }

    return (
      <motion.div
        ref={setCardRef}
        layout
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 60 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{
          duration: 0.8,
          delay: index * 0.08,
          ease: [0.16, 1, 0.3, 1],
          layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        }}
        className="group cursor-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={onMouseMove}
      >
        <Link to={`/project/${project.id}`} className="block">
          {/* Image Container with WebGL */}
          <div className="relative aspect-[3/4] overflow-hidden mb-6">
            <motion.div className="absolute inset-0" style={{ y: imageY }}>
              {/* WebGL Liquid Effect */}
              <Suspense
                fallback={
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[115%] object-cover"
                  />
                }
              >
                <WebGLLiquidImage
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[115%]"
                  intensity={1.2}
                />
              </Suspense>
            </motion.div>

            {/* Overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Hover Content */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="text-caption text-background/70 mb-2">{project.subcategory}</span>
              <p className="text-sm md:text-base text-background/90 font-serif italic leading-relaxed max-w-xs">
                {project.description}
              </p>
            </motion.div>

            {/* Featured Badge */}
            {project.featured && (
              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="px-3 py-1.5 bg-primary text-primary-foreground text-[10px] font-sans font-medium uppercase tracking-widest">
                  Featured
                </span>
              </motion.div>
            )}

            {/* Category Badge */}
            <motion.div
              className="absolute top-4 left-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className="px-3 py-1.5 bg-background/90 backdrop-blur-sm text-caption-luxury text-foreground capitalize">
                {project.category}
              </span>
            </motion.div>
          </div>

          {/* Project Info */}
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 15 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-caption-luxury text-primary">{project.subcategory}</span>
              <span className="text-caption text-muted-foreground">{project.year}</span>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl md:text-2xl text-foreground font-light italic group-hover:text-primary transition-colors duration-500">
                {project.title}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
            </div>

            <p className="text-body text-muted-foreground">{project.location}</p>
          </motion.div>
        </Link>
      </motion.div>
    )
  }
)
ProjectCard.displayName = 'ProjectCard'

const ProjectsHero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[700px] flex items-end pb-16 md:pb-24 overflow-hidden"
    >
      {/* Background with WebGL */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale }}>
        <Suspense
          fallback={
            <img
              src="/images/img-58f8e2820a83.webp"
              alt="Portfolio"
              className="w-full h-full object-cover"
            />
          }
        >
          <WebGLLiquidImage
            src="/images/img-58f8e2820a83.webp"
            alt="Portfolio"
            className="w-full h-full"
            intensity={0.8}
          />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div className="relative z-10 container-luxury" style={{ y: titleY, opacity }}>
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-16 h-px bg-primary origin-left"
          />
          <span className="text-caption-luxury text-primary">Selected Work</span>
        </motion.div>

        <div className="overflow-hidden mb-2">
          <motion.h1
            className="text-[clamp(3rem,12vw,8rem)] font-sans font-light uppercase tracking-tight text-foreground leading-[0.9]"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Our
          </motion.h1>
        </div>

        <div className="overflow-hidden">
          <motion.h1
            className="text-[clamp(3rem,12vw,8rem)] font-serif italic font-light text-foreground leading-[0.9]"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            Portfolio
          </motion.h1>
        </div>

        <motion.p
          className="text-body-luxury max-w-xl mt-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          A selection of the practice's most significant work—buildings that show what considered
          architecture can achieve when ambition and execution meet.
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-16 bg-gradient-to-b from-primary/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const isFilterInView = useInView(filterRef, { once: true })

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPos({ x: e.clientX, y: e.clientY })
  }

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return allProjects
    return allProjects.filter(p => p.category === activeFilter)
  }, [activeFilter])

  // Calculate counts
  const counts = useMemo(
    () => ({
      all: allProjects.length,
      residential: allProjects.filter(p => p.category === 'residential').length,
      commercial: allProjects.filter(p => p.category === 'commercial').length,
    }),
    []
  )

  // Split into asymmetrical columns
  const leftColumn = filteredProjects.filter((_, i) => i % 2 === 0)
  const rightColumn = filteredProjects.filter((_, i) => i % 2 === 1)

  return (
    <PageTransition>
      <SmoothScroll>
        <Navigation />

        {/* Floating Cursor */}
        <FloatingCursor position={cursorPos} isVisible={isHovering} />

        <main className="bg-background min-h-screen-safe">
          <ProjectsHero />

          {/* Filter Section */}
          <section ref={filterRef} className="container-luxury py-12 md:py-20">
            <motion.div
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isFilterInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              {/* Desktop Filters */}
              <div className="hidden md:flex items-center gap-8">
                {filters.map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`group relative flex items-center gap-2 touch-target transition-all duration-500 py-2 ${
                      activeFilter === filter.key
                        ? 'text-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <span
                      className={`text-caption-luxury ${activeFilter === filter.key ? '' : 'opacity-70'}`}
                    >
                      {filter.label}
                    </span>
                    <span
                      className={`text-caption tabular-nums transition-colors duration-500 ${
                        activeFilter === filter.key ? 'text-primary' : 'text-muted-foreground/50'
                      }`}
                    >
                      ({counts[filter.key as keyof typeof counts]})
                    </span>

                    {/* Underline */}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-px bg-foreground"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeFilter === filter.key ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: 'left' }}
                    />
                  </button>
                ))}
              </div>

              {/* Mobile Filter Dropdown */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-3 px-4 py-3 border border-border w-full justify-between"
                >
                  <span className="text-caption-luxury">
                    {filters.find(f => f.key === activeFilter)?.label}
                  </span>
                  <Filter size={16} className="text-muted-foreground" />
                </button>

                <AnimatePresence>
                  {showFilterDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-card border border-border z-20"
                    >
                      {filters.map(filter => (
                        <button
                          key={filter.key}
                          onClick={() => {
                            setActiveFilter(filter.key)
                            setShowFilterDropdown(false)
                          }}
                          className={`w-full px-4 py-3 text-left text-caption-luxury flex justify-between items-center ${
                            activeFilter === filter.key
                              ? 'bg-secondary text-foreground'
                              : 'text-muted-foreground hover:bg-secondary/50'
                          }`}
                        >
                          <span>{filter.label}</span>
                          <span className="text-primary">
                            ({counts[filter.key as keyof typeof counts]})
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Project Count */}
              <motion.p
                className="text-body text-muted-foreground"
                key={filteredProjects.length}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                Showing <span className="text-foreground">{filteredProjects.length}</span> project
                {filteredProjects.length !== 1 ? 's' : ''}
              </motion.p>
            </motion.div>

            {/* Bronze Line */}
            <motion.div
              className="accent-line-luxury mt-8"
              initial={{ scaleX: 0 }}
              animate={isFilterInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
          </section>

          {/* Asymmetrical Masonry Grid */}
          <section className="container-luxury pb-24 md:pb-40">
            <LayoutGroup>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 lg:gap-x-24">
                {/* Left Column */}
                <div className="space-y-16 md:space-y-24 lg:space-y-32">
                  <AnimatePresence mode="popLayout">
                    {leftColumn.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index * 2}
                        onHover={() => setIsHovering(true)}
                        onLeave={() => setIsHovering(false)}
                        onMouseMove={handleMouseMove}
                      />
                    ))}
                  </AnimatePresence>
                </div>

                {/* Right Column - Offset */}
                <div className="space-y-16 md:space-y-24 lg:space-y-32 mt-16 md:mt-40 lg:mt-56">
                  <AnimatePresence mode="popLayout">
                    {rightColumn.map((project, index) => (
                      <ProjectCard
                        key={project.id}
                        project={project}
                        index={index * 2 + 1}
                        onHover={() => setIsHovering(true)}
                        onLeave={() => setIsHovering(false)}
                        onMouseMove={handleMouseMove}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </LayoutGroup>
          </section>

          {/* CTA Section */}
          <section className="py-24 md:py-40 border-t border-border bg-card">
            <div className="container-luxury">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                <div>
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-px bg-primary/40" />
                    <span className="text-caption-luxury">Have a project in mind?</span>
                  </motion.div>

                  <motion.h2
                    className="text-section text-foreground font-light mb-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    Let's build it <span className="font-serif italic">together</span>
                  </motion.h2>

                  <motion.p
                    className="text-body-luxury mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    Every project starts with a conversation. Tell us what you're planning, and
                    we'll show you what's possible.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link
                      to="/contact"
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background hover:bg-primary transition-colors duration-500"
                    >
                      <span className="text-sm font-sans uppercase tracking-widest">
                        Start Your Project Today
                      </span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { value: '20+', label: 'Projects Completed' },
                    { value: '25+', label: 'Years Experience' },
                    { value: 'Lagos', label: 'Based In Nigeria' },
                    { value: '4', label: 'Global Offices' },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center lg:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-3xl md:text-4xl font-sans font-light text-foreground">
                        {stat.value}
                      </span>
                      <p className="text-caption-luxury mt-2 text-muted-foreground">{stat.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </SmoothScroll>
    </PageTransition>
  )
}

export default Projects
