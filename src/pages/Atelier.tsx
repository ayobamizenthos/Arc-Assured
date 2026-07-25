import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Award, Building2, Users, Globe } from 'lucide-react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import PageTransition from '@/components/PageTransition'

const teamMembers = [
  {
    name: 'Olayinka Ibrahim',
    role: 'Founder & Principal Architect',
    image: '/images/img-fe2b4b1d68f7.webp',
    bio: 'Founder of the practice, with more than 25 years shaping residential, commercial, and mixed-use work across Nigeria.',
  },
  {
    name: 'Adaeze Okonkwo',
    role: 'Design Director',
    image: '/images/img-0e5fb87f0b15.webp',
    bio: 'Leads design across the studio, with a particular focus on sustainable, climate-responsive architecture.',
  },
  {
    name: 'Chidi Emenike',
    role: 'Senior Project Architect',
    image: '/images/img-75d1492bc82d.webp&q=90',
    bio: 'Carries projects from technical detailing through construction, keeping design intent intact on site.',
  },
  {
    name: 'Folake Adeleke',
    role: 'Head of Interiors',
    image: '/images/img-c52e34adb8da.webp',
    bio: 'Directs the studio’s interior work, resolving material, light, and detail across every room.',
  },
  {
    name: 'Emeka Nwosu',
    role: 'Development Director',
    image: '/images/img-0ad843e7b657.webp',
    bio: 'Oversees the practice’s development projects from feasibility through delivery.',
  },
]

const values = [
  {
    number: '01',
    title: 'Considered Detail',
    description:
      'We resolve every project down to the detail, from the first sketch to the final finish. Nothing is left to chance on site.',
    icon: Award,
  },
  {
    number: '02',
    title: 'Design That Lasts',
    description:
      'We favour ideas that hold up over decades rather than seasons, pushing the work forward without chasing trends.',
    icon: Building2,
  },
  {
    number: '03',
    title: 'Local Roots, Global Standards',
    description:
      'Our work is grounded in Nigeria’s architectural heritage and built to the standards expected anywhere in the world.',
    icon: Globe,
  },
  {
    number: '04',
    title: 'Close Client Partnership',
    description:
      'We work in close, direct relationships with our clients, built on clear communication and a shared sense of the brief.',
    icon: Users,
  },
]

const stats = [
  { value: '25', label: 'Years in Practice', suffix: '+' },
  { value: '20', label: 'Projects Completed', suffix: '+' },
  { value: '4', label: 'Studios Worldwide', suffix: '' },
  { value: '40', label: 'Team Members', suffix: '+' },
]

const milestones = [
  {
    year: '1999',
    event: 'Founded in Lagos with a focus on rigorous, context-driven architecture',
  },
  {
    year: '2005',
    event: 'Completed our first landmark commercial tower on Victoria Island',
  },
  {
    year: '2010',
    event: 'Expanded into high-end residential development',
  },
  {
    year: '2015',
    event: 'Received our first international design award',
  },
  {
    year: '2020',
    event: 'Launched a dedicated sustainable architecture initiative',
  },
  {
    year: '2024',
    event: 'Recognised among Nigeria’s leading architecture practices',
  },
]

const Atelier = () => {
  const [hoveredTeamMember, setHoveredTeamMember] = useState<number | null>(null)
  const [activeTeamMember, setActiveTeamMember] = useState<number>(0)

  // Section refs
  const heroRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true })
  const introInView = useInView(introRef, { once: true, margin: '-100px' })
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' })
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' })
  const timelineInView = useInView(timelineRef, { once: true, margin: '-100px' })

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(heroScrollProgress, [0, 1], [0, 200])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.6], [1, 0])
  const heroScale = useTransform(heroScrollProgress, [0, 1], [1, 1.1])

  return (
    <PageTransition>
      <SmoothScroll>
        <Navigation />

        <main className="bg-background min-h-screen-safe">
          {/* ========== HERO SECTION ========== */}
          <section
            ref={heroRef}
            className="relative h-screen min-h-[700px] flex items-end pb-16 md:pb-24 overflow-hidden"
          >
            {/* Background with Parallax */}
            <motion.div className="absolute inset-0" style={{ scale: heroScale }}>
              <motion.img
                src="/images/img-beb4a0408fb2.webp"
                alt="Arc Assured & Partners architecture"
                className="w-full h-full object-cover"
                initial={{ scale: 1.2, filter: 'grayscale(100%)' }}
                animate={heroInView ? { scale: 1, filter: 'grayscale(0%)' } : {}}
                transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
            </motion.div>

            {/* Content */}
            <motion.div
              className="relative z-10 container-luxury"
              style={{ y: heroY, opacity: heroOpacity }}
            >
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={heroInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-16 h-px bg-primary origin-left"
                />
                <span className="text-caption-luxury text-primary">
                  A Lagos architecture and real estate development practice
                </span>
              </motion.div>

              <div className="overflow-hidden mb-4">
                <motion.h1
                  className="text-[clamp(3rem,12vw,8rem)] font-sans font-light uppercase tracking-tight text-foreground leading-[0.9]"
                  initial={{ y: '100%' }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  Our
                </motion.h1>
              </div>

              <div className="overflow-hidden">
                <motion.h1
                  className="text-[clamp(3rem,12vw,8rem)] font-serif italic font-light text-foreground leading-[0.9]"
                  initial={{ y: '100%' }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  Story
                </motion.h1>
              </div>

              <motion.p
                className="text-body-luxury max-w-lg mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
              >
                For over two decades we have been shaping Nigeria's built environment—designing
                landmarks that give cities their character and spaces that change how people use
                them.
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

          {/* ========== STATS BAR ========== */}
          <section ref={statsRef} className="py-12 md:py-20 bg-card border-y border-border">
            <div className="container-luxury">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center md:text-left"
                    initial={{ opacity: 0, y: 30 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex items-baseline justify-center md:justify-start gap-1">
                      <span className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-foreground">
                        {stat.value}
                      </span>
                      {stat.suffix && (
                        <span className="text-xl md:text-2xl text-primary font-light">
                          {stat.suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-caption-luxury mt-2 text-muted-foreground">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========== INTRODUCTION ========== */}
          <section ref={introRef} className="section-spacing">
            <div className="container-luxury">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                {/* Text Column */}
                <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
                  <motion.div
                    className="flex items-center gap-4 mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={introInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-12 h-px bg-primary/40" />
                    <span className="text-caption-luxury">Our Story</span>
                  </motion.div>

                  <motion.h2
                    className="text-title text-foreground font-light mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={introInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                  >
                    Building <span className="font-serif italic">Nigeria's</span> Future
                  </motion.h2>

                  <motion.p
                    className="text-body-luxury mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={introInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    Arc Assured & Partners was founded in 1999 on a simple premise: that design of
                    genuine international standard could come out of Lagos and hold its own
                    anywhere. That conviction still drives the work.
                  </motion.p>

                  <motion.p
                    className="text-body-luxury mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={introInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    Today the practice is among Nigeria's most recognised architecture and real
                    estate developers, with a portfolio exceeding ₦50 billion and projects that have
                    expanded what is possible in West African architecture.
                  </motion.p>

                  <motion.p
                    className="text-body-luxury"
                    initial={{ opacity: 0, y: 20 }}
                    animate={introInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Our work spans residential estates, commercial towers, and mixed-use
                    developments—each one grounded in the belief that considered design creates
                    lasting value.
                  </motion.p>
                </div>

                {/* Image Column */}
                <motion.div
                  className="lg:col-span-7"
                  initial={{ opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
                  animate={introInView ? { opacity: 1, clipPath: 'inset(0 0 0 0)' } : {}}
                  transition={{ duration: 1.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <motion.img
                      src="/images/img-ee7ce67a17be.webp"
                      alt="Arc Assured & Partners headquarters"
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.2 }}
                      animate={introInView ? { scale: 1 } : {}}
                      transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========== VALUES SECTION ========== */}
          <section ref={valuesRef} className="section-spacing bg-card">
            <div className="container-luxury">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={valuesInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8 }}
                  className="w-12 h-px bg-primary/40 origin-left"
                />
                <motion.span
                  className="text-caption-luxury"
                  initial={{ opacity: 0 }}
                  animate={valuesInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Our Principles
                </motion.span>
              </div>

              <motion.h2
                className="text-section text-foreground font-light mb-16 md:mb-24"
                initial={{ opacity: 0, y: 40 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                What We <span className="font-serif italic">Stand For</span>
              </motion.h2>

              {/* Values Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border">
                {values.map((value, index) => (
                  <motion.div
                    key={value.number}
                    className="bg-card p-8 md:p-12 group hover:bg-secondary/30 transition-colors duration-500"
                    initial={{ opacity: 0, y: 30 }}
                    animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="flex items-start justify-between mb-6">
                      <span className="text-caption text-primary/60">{value.number}</span>
                      <value.icon className="w-6 h-6 text-primary/40 group-hover:text-primary transition-colors duration-500" />
                    </div>
                    <h3 className="font-sans text-lg md:text-xl uppercase tracking-wide text-foreground font-medium mb-4">
                      {value.title}
                    </h3>
                    <p className="text-body-luxury">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========== TEAM SECTION ========== */}
          <section ref={teamRef} className="section-spacing relative overflow-hidden">
            {/* Background Image on Hover */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredTeamMember === index ? 0.08 : 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                  <img
                    src={member.image}
                    alt=""
                    className="w-full h-full object-cover scale-110 blur-sm"
                  />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="container-luxury mb-16 md:mb-24">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={teamInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="w-12 h-px bg-primary/40 origin-left"
                  />
                  <motion.span
                    className="text-caption-luxury"
                    initial={{ opacity: 0 }}
                    animate={teamInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Our Team
                  </motion.span>
                </div>

                <motion.h2
                  className="text-section text-foreground font-light"
                  initial={{ opacity: 0, y: 40 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  The <span className="font-serif italic">people</span> behind the work
                </motion.h2>

                <motion.p
                  className="text-body-luxury max-w-xl mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  A leadership team united by a shared standard of craft and the conviction that
                  Nigerian architecture belongs on the world stage.
                </motion.p>
              </div>

              {/* Team Grid - Desktop */}
              <div className="hidden md:block container-luxury">
                <div className="grid grid-cols-5 gap-6 lg:gap-8">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 40 }}
                      animate={teamInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      onMouseEnter={() => setHoveredTeamMember(index)}
                      onMouseLeave={() => setHoveredTeamMember(null)}
                    >
                      {/* Image */}
                      <div className="aspect-[3/4] overflow-hidden mb-4 relative">
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          initial={{ filter: 'grayscale(100%)' }}
                          whileHover={{ filter: 'grayscale(0%)', scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors duration-500" />
                      </div>

                      {/* Info */}
                      <h3 className="font-serif text-lg text-foreground font-light italic group-hover:text-primary transition-colors duration-500">
                        {member.name}
                      </h3>
                      <p className="text-caption-luxury mt-1 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                        {member.role}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Team Carousel - Mobile */}
              <div className="md:hidden">
                <div className="container-luxury mb-6">
                  {/* Active Member Image */}
                  <motion.div
                    className="aspect-[3/4] overflow-hidden mb-6"
                    key={activeTeamMember}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <img
                      src={teamMembers[activeTeamMember].image}
                      alt={teamMembers[activeTeamMember].name}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <h3 className="font-serif text-2xl text-foreground font-light italic">
                    {teamMembers[activeTeamMember].name}
                  </h3>
                  <p className="text-caption-luxury mt-2">{teamMembers[activeTeamMember].role}</p>
                  <p className="text-body-luxury mt-4">{teamMembers[activeTeamMember].bio}</p>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center gap-3 mt-8">
                  {teamMembers.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTeamMember(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        activeTeamMember === index
                          ? 'bg-primary w-8'
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ========== TIMELINE ========== */}
          <section ref={timelineRef} className="section-spacing bg-card">
            <div className="container-luxury">
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={timelineInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8 }}
                  className="w-12 h-px bg-primary/40 origin-left"
                />
                <motion.span
                  className="text-caption-luxury"
                  initial={{ opacity: 0 }}
                  animate={timelineInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Our Journey
                </motion.span>
              </div>

              <motion.h2
                className="text-section text-foreground font-light mb-16 md:mb-24"
                initial={{ opacity: 0, y: 40 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                25 Years of <span className="font-serif italic">Practice</span>
              </motion.h2>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical Line */}
                <motion.div
                  className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2"
                  initial={{ scaleY: 0 }}
                  animate={timelineInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'top' }}
                />

                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    className={`relative pl-8 md:pl-0 pb-12 md:pb-16 ${
                      index % 2 === 0 ? 'md:pr-[55%]' : 'md:pl-[55%]'
                    }`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-0 md:left-1/2 top-0 w-3 h-3 rounded-full bg-primary md:-translate-x-1/2 ${
                        index % 2 === 0 ? '' : ''
                      }`}
                    />

                    <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <span className="text-2xl md:text-3xl font-sans font-light text-primary">
                        {milestone.year}
                      </span>
                      <p className="text-body-luxury mt-2">{milestone.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ========== CTA ========== */}
          <section className="py-24 md:py-40 border-t border-border">
            <div className="container-luxury text-center">
              <motion.div
                className="flex items-center justify-center gap-4 mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <div className="w-12 h-px bg-primary/40" />
                <span className="text-caption-luxury">Work With Us</span>
                <div className="w-12 h-px bg-primary/40" />
              </motion.div>

              <motion.h2
                className="text-section text-foreground font-light mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Start a <span className="font-serif italic">Conversation</span>
              </motion.h2>

              <motion.p
                className="text-body-luxury max-w-xl mx-auto mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Tell us about your project and we'll take it from there.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 text-lg md:text-xl font-sans uppercase tracking-widest text-foreground hover:text-primary transition-colors duration-500"
                >
                  <span>Get in Touch</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </SmoothScroll>
    </PageTransition>
  )
}

export default Atelier
