import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import PageTransition from '@/components/PageTransition'

interface Service {
  id: string
  number: string
  title: string
  subtitle: string
  description: string
  philosophy: string
  image: string
  categories: { name: string; items: string[] }[]
}

const services: Service[] = [
  {
    id: 'architectural-design',
    number: '01',
    title: 'Architectural Design',
    subtitle: 'Where a brief becomes a building',
    description:
      'We shape space with intent. Every line and every material is chosen to serve the way a place will actually be used, rather than for effect alone.',
    philosophy:
      'Architecture is more than shelter. Our designs come out of close listening—to the site, to the client, and to what a project could become when its constraints are read carefully.',
    image: '/images/img-b618e279194b.webp',
    categories: [
      {
        name: 'Residential',
        items: [
          'Private Villas',
          'Luxury Estates',
          'Apartment Complexes',
          'Townhouse Developments',
        ],
      },
      {
        name: 'Commercial',
        items: [
          'Corporate Headquarters',
          'Mixed-Use Developments',
          'Retail Environments',
          'Hospitality Venues',
        ],
      },
    ],
  },
  {
    id: 'planning-applications',
    number: '02',
    title: 'Planning Applications',
    subtitle: 'Navigating Complexity with Precision',
    description:
      'We turn complex regulatory requirements into a clear path forward. Our familiarity with Lagos planning frameworks keeps a project moving from concept to approval with fewer surprises.',
    philosophy:
      'Every good building begins with good planning. We treat regulatory bodies as partners rather than obstacles, preparing submissions that anticipate requirements instead of reacting to them.',
    image: '/images/img-b36ab61c74e9.webp',
    categories: [
      {
        name: 'Residential',
        items: [
          'Building Permits',
          'Zoning Applications',
          'Environmental Assessments',
          'Heritage Consultations',
        ],
      },
      {
        name: 'Commercial',
        items: [
          'Development Approvals',
          'Impact Studies',
          'Compliance Reviews',
          'Mixed-Use Permissions',
        ],
      },
    ],
  },
  {
    id: 'interior-design',
    number: '03',
    title: 'Interior Design',
    subtitle: 'Orchestrating the Poetry of Living',
    description:
      'Interiors are composed, not just decorated. We work light, texture, proportion, and function together so a space holds up to daily use.',
    philosophy:
      'The interior is where architecture becomes intimate. Grand gestures give way to refinements—the angle of morning light, the feel of natural materials, the details that make a space quietly work.',
    image: '/images/img-3541f8666f6d.webp',
    categories: [
      {
        name: 'Residential',
        items: [
          'Complete Home Design',
          'Kitchen & Bath',
          'Furniture Curation',
          'Art & Accessories',
        ],
      },
      {
        name: 'Commercial',
        items: [
          'Workplace Design',
          'Hospitality Interiors',
          'Retail Experiences',
          'Restaurant Design',
        ],
      },
    ],
  },
  {
    id: 'conservation-heritage',
    number: '04',
    title: 'Conservation & Heritage Design',
    subtitle: 'Honoring the Past, Enabling the Future',
    description:
      'We approach heritage buildings with care and restraint. Our conservation work brings contemporary use to historic spaces while keeping what makes them worth preserving.',
    philosophy:
      'History is a foundation, not a constraint. We read a building closely, understanding its original intent before adding to it—so it can honour its past while serving a present purpose.',
    image: '/images/img-ee701f27cf6f.webp',
    categories: [
      {
        name: 'Residential',
        items: [
          'Heritage Restoration',
          'Period Renovations',
          'Adaptive Reuse',
          'Historical Documentation',
        ],
      },
      {
        name: 'Commercial',
        items: [
          'Monument Preservation',
          'Cultural Centers',
          'Institutional Heritage',
          'Public Conservation',
        ],
      },
    ],
  },
  {
    id: 'create-construct',
    number: '05',
    title: 'Create & Construct',
    subtitle: 'From First Sketch to Final Stone',
    description:
      'We offer complete project delivery—design through construction under a single team. Keeping both under one roof avoids the losses that occur when concept is handed off to someone else to build.',
    philosophy:
      'Architecture proves itself in execution. By staying involved through construction, we make sure every joint, finish, and threshold carries the original intent, so the building becomes what it was meant to be.',
    image: '/images/img-7b885f1339d7.webp',
    categories: [
      {
        name: 'Residential',
        items: ['Turnkey Homes', 'Project Management', 'Quality Assurance', 'Handover Services'],
      },
      {
        name: 'Commercial',
        items: [
          'Design-Build',
          'Development Partnership',
          'Construction Oversight',
          'Completion Management',
        ],
      },
    ],
  },
]

// Individual Service Section with Parallax and Curtain Reveal
const ServiceSection = ({ service, index }: { service: Service; index: number }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const contentInView = useInView(contentRef, { once: true, margin: '-50px' })

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })

  // Parallax effect for image
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80])
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1.1, 1])

  // Grayscale to color effect
  const grayscale = useTransform(scrollYProgress, [0, 0.3, 0.6], [100, 50, 0])

  const isEven = index % 2 === 0

  const [activeCategory, setActiveCategory] = useState(0)

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden">
      {/* Background Number - Subtle */}
      <motion.div
        className="absolute top-20 right-10 md:right-20 pointer-events-none select-none z-0"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <span className="font-serif text-[25vw] md:text-[20vw] font-extralight text-foreground/[0.03] leading-none">
          {service.number}
        </span>
      </motion.div>

      <div className="container-luxury relative z-10">
        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 py-20 md:py-32 lg:py-40 ${isEven ? '' : 'direction-rtl'}`}
        >
          {/* Image Column - Parallax with Curtain Reveal */}
          <motion.div
            ref={imageRef}
            className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-6'}`}
            style={{ direction: 'ltr' }}
          >
            <motion.div
              className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden"
              initial={{ clipPath: isEven ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }}
              animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
                <motion.img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[120%] object-cover"
                  style={{ filter: useTransform(grayscale, v => `grayscale(${v}%)`) }}
                />
              </motion.div>

              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </motion.div>

            {/* Image Caption */}
            <motion.p
              className="text-caption-luxury mt-4"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {service.subtitle}
            </motion.p>
          </motion.div>

          {/* Content Column - Overlapping on Desktop */}
          <motion.div
            ref={contentRef}
            className={`lg:col-span-6 ${isEven ? 'lg:col-start-6 lg:-ml-24' : 'lg:col-start-1 lg:-mr-24 lg:row-start-1'} lg:self-center`}
            style={{ direction: 'ltr' }}
          >
            <div className="bg-background p-8 md:p-12 lg:p-16 relative z-10">
              {/* Number & Title */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-caption-luxury text-primary mb-4 block">
                  {service.number} — Expertise
                </span>
                <h2 className="text-title md:text-section text-foreground font-light">
                  {service.title.split(' ')[0]}{' '}
                  <span className="italic">{service.title.split(' ').slice(1).join(' ')}</span>
                </h2>
              </motion.div>

              {/* Bronze Accent Line */}
              <motion.div
                className="w-16 h-px bg-primary/40 mb-8"
                initial={{ scaleX: 0 }}
                animate={contentInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Description */}
              <motion.p
                className="text-body-luxury mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {service.description}
              </motion.p>

              {/* Philosophy */}
              <motion.p
                className="text-body text-foreground/75 mb-10 italic"
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                {service.philosophy}
              </motion.p>

              {/* Category Tabs */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 15 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex gap-6 mb-6">
                  {service.categories.map((cat, i) => (
                    <button
                      key={cat.name}
                      onClick={() => setActiveCategory(i)}
                      className={`text-caption-luxury transition-all duration-500 pb-2 border-b ${
                        activeCategory === i
                          ? 'text-foreground border-foreground'
                          : 'text-muted-foreground border-transparent hover:text-foreground'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Category Items */}
                <div className="grid grid-cols-2 gap-3">
                  {service.categories[activeCategory].items.map((item, i) => (
                    <motion.div
                      key={item}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                    >
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                      <span className="text-body text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <Link
                  to="/contact"
                  className="text-caption-luxury text-foreground link-magnetic touch-target inline-block"
                >
                  Begin Your Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section Divider */}
      {index < services.length - 1 && (
        <motion.div
          className="accent-line-luxury"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          style={{ transformOrigin: 'center' }}
        />
      )}
    </section>
  )
}

// Hero Section with Cinematic Effect
const ExpertiseHero = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9])

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
    >
      {/* Background with Parallax */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.2 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/images/img-5dfa3cb14c08.webp"
          alt="Architectural Excellence"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/30 to-foreground/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center container-luxury"
        style={{ y: titleY, opacity, scale }}
      >
        <motion.p
          className="text-caption text-background/60 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Our Disciplines
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            className="text-hero text-background mb-4"
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Expertise
          </motion.h1>
        </div>

        <motion.p
          className="text-body-lg text-background/70 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Five disciplines, held together by a single design approach—from first concept through
          final construction.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <span className="text-caption text-background/40">Explore</span>
          <motion.div
            className="w-px h-12 bg-background/20"
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'top' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// CTA Section
const ExpertiseCTA = () => {
  const ctaRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ctaRef, { once: true, margin: '-100px' })

  return (
    <section ref={ctaRef} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/img-503d4d038776.webp"
          alt="Architecture Detail"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-luxury text-center">
        <motion.p
          className="text-caption text-background/60 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Ready to start your project?
        </motion.p>

        <motion.h2
          className="text-section text-background font-light mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Let's build it <span className="italic">together</span>
        </motion.h2>

        <motion.p
          className="text-body-luxury text-background/60 max-w-xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Every project starts with a conversation. Tell us what you're planning, and we'll help you
          work out how to get there.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/contact"
            className="inline-flex items-center gap-4 px-10 py-5 border border-background/30 text-background hover:bg-background hover:text-foreground transition-all duration-500 text-caption-luxury"
          >
            Start a Conversation Today
            <motion.span
              className="w-6 h-px bg-current"
              initial={{ width: 0 }}
              whileHover={{ width: 24 }}
            />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

const Expertise = () => {
  return (
    <PageTransition>
      <SmoothScroll>
        <Navigation />

        <main className="bg-background min-h-screen-safe">
          <ExpertiseHero />

          {services.map((service, index) => (
            <ServiceSection key={service.id} service={service} index={index} />
          ))}

          <ExpertiseCTA />
          <Footer />
        </main>
      </SmoothScroll>
    </PageTransition>
  )
}

export default Expertise
