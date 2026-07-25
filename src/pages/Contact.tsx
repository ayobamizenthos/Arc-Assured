import { useState, useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SmoothScroll from '@/components/SmoothScroll'
import PageTransition from '@/components/PageTransition'
import { toast } from '@/hooks/use-toast'
import WebGLLiquidImage from '@/components/WebGLLiquidImage'

// Animated input cursor
const BlinkingCursor = () => (
  <motion.span
    className="inline-block w-0.5 h-6 bg-primary ml-1"
    animate={{ opacity: [1, 0, 1] }}
    transition={{ duration: 1, repeat: Infinity }}
  />
)

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  const heroInView = useInView(heroRef, { once: true })
  const formInView = useInView(formRef, { once: true, margin: '-100px' })
  const mapInView = useInView(mapRef, { once: true, margin: '-100px' })

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroImageY = useTransform(heroScrollProgress, [0, 1], [0, 200])
  const heroImageScale = useTransform(heroScrollProgress, [0, 1], [1.1, 1.3])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.6], [1, 0])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const lines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Project type: ${formData.projectType}`,
      `Budget: ${formData.budget}`,
      '',
      formData.message,
    ]
    const subject = `Project inquiry — ${formData.name || 'Website'}`
    window.location.href = `mailto:studio@arcassured.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join('\n'))}`

    toast({
      title: 'Opening your email',
      description: 'Your inquiry is ready to send. We respond within one business day.',
    })

    setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' })
    setIsSubmitting(false)
  }

  const projectTypes = [
    'Residential Development',
    'Commercial Architecture',
    'Mixed-Use Complex',
    'Interior Design',
    'Conservation & Heritage',
    'Master Planning',
  ]

  const budgetRanges = ['₦50M - ₦200M', '₦200M - ₦500M', '₦500M - ₦1B', '₦1B - ₦5B', '₦5B+']

  return (
    <PageTransition>
      <SmoothScroll>
        <Navigation />

        <main className="bg-background min-h-screen">
          {/* ========== CINEMATIC HERO ========== */}
          <section ref={heroRef} className="relative h-[85vh] min-h-[600px] overflow-hidden">
            {/* Background Image - Lagos Skyline */}
            <motion.div
              className="absolute inset-0"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={heroInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{ y: heroImageY, scale: heroImageScale }}
              >
                <WebGLLiquidImage
                  src="/images/img-57e4c7a2476d.webp"
                  alt="Lagos Nigeria Skyline"
                  className="w-full h-full object-cover"
                  intensity={0.8}
                />
              </motion.div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
            </motion.div>

            {/* Hero Content */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 pb-20 md:pb-32 container-luxury"
              style={{ opacity: heroOpacity }}
            >
              <motion.p
                className="text-caption-luxury mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Begin Your Journey
              </motion.p>

              <div className="overflow-hidden mb-8">
                <motion.h1
                  className="text-hero text-foreground"
                  initial={{ y: '120%' }}
                  animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  Contact
                </motion.h1>
              </div>

              <motion.p
                className="text-body-luxury max-w-xl"
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 1 }}
              >
                Every project starts with a conversation. Tell us what you have in mind, and we'll
                take it from there.
              </motion.p>
            </motion.div>
          </section>

          {/* ========== CONTACT GRID ========== */}
          <section ref={formRef} className="section-spacing">
            <div className="container-luxury">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                {/* Left Column - Studio Info */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1 }}
                >
                  <p className="text-caption-luxury mb-8">Our Studio</p>

                  <div className="mb-16">
                    <h2 className="font-serif italic font-light text-6xl md:text-7xl lg:text-8xl text-foreground mb-10">
                      Lagos
                    </h2>

                    <motion.div
                      className="space-y-1 text-body-luxury mb-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <p className="text-foreground font-sans font-medium">
                        Arc Assured &amp; Partners
                      </p>
                      <p>1b, Kokoro-Aiye Street</p>
                      <p>Alagbado</p>
                      <p>Lagos, Nigeria</p>
                    </motion.div>

                    {/* Animated Contact Links */}
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={formInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <motion.a
                        href="tel:+2348034552215"
                        className="group flex items-center gap-4 text-foreground"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="w-8 h-px bg-primary group-hover:w-12 transition-all duration-300" />
                        <span className="font-sans text-lg">+234 803 455 2215</span>
                      </motion.a>

                      <motion.a
                        href="https://wa.me/2348034552215"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 text-primary hover:text-foreground transition-colors duration-300"
                        whileHover={{ x: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
                        <span className="font-sans text-lg">WhatsApp</span>
                      </motion.a>
                    </motion.div>
                  </div>

                  {/* Office Hours */}
                  <motion.div
                    className="border-t border-border pt-10 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <p className="text-caption-luxury mb-8">Studio Hours</p>
                    <div className="space-y-4 font-serif text-lg">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Monday — Friday</span>
                        <span className="text-foreground">9:00 — 18:00</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Saturday</span>
                        <span className="text-foreground">By Appointment</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Sunday</span>
                        <span className="text-foreground">Closed</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Collaboration */}
                  <motion.div
                    className="border-t border-border pt-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={formInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <p className="text-caption-luxury mb-6">Collaboration Inquiries</p>
                    <p className="text-body-luxury mb-6">
                      For press, partnerships, and industry collaboration:
                    </p>
                    <a
                      href="mailto:studio@arcassured.com"
                      className="font-serif text-xl text-foreground hover:text-primary transition-colors duration-300"
                    >
                      studio@arcassured.com
                    </a>
                  </motion.div>
                </motion.div>

                {/* Right Column - Letter-Style Form */}
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  animate={formInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <p className="text-caption-luxury mb-8">Project Inquiry</p>

                  {/* Letter-style Form */}
                  <form onSubmit={handleSubmit} className="relative">
                    {/* Paper texture background */}
                    <div className="absolute inset-0 -m-8 bg-card border border-border" />

                    <div className="relative p-8 md:p-12 space-y-8">
                      {/* Greeting */}
                      <div className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        <p className="mb-6">Dear Arc Assured &amp; Partners,</p>

                        {/* Name Input */}
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span>Hello, my name is</span>
                          <span className="relative inline-block min-w-[200px]">
                            <input
                              type="text"
                              value={formData.name}
                              onChange={e => setFormData({ ...formData, name: e.target.value })}
                              onFocus={() => setFocusedField('name')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent border-b border-primary/30 py-1 text-foreground focus:outline-none text-xl md:text-2xl"
                              placeholder="your name"
                              required
                            />
                            {focusedField === 'name' && !formData.name && <BlinkingCursor />}
                          </span>
                        </p>
                      </div>

                      {/* Email & Phone */}
                      <div className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        <p className="flex flex-wrap items-baseline gap-2 mb-4">
                          <span>You can reach me at</span>
                          <span className="relative inline-block min-w-[250px]">
                            <input
                              type="email"
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                              onFocus={() => setFocusedField('email')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent border-b border-primary/30 py-1 text-foreground focus:outline-none text-xl md:text-2xl"
                              placeholder="email@example.com"
                              required
                            />
                            {focusedField === 'email' && !formData.email && <BlinkingCursor />}
                          </span>
                        </p>
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span>or by phone at</span>
                          <span className="relative inline-block min-w-[200px]">
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={e => setFormData({ ...formData, phone: e.target.value })}
                              onFocus={() => setFocusedField('phone')}
                              onBlur={() => setFocusedField(null)}
                              className="w-full bg-transparent border-b border-primary/30 py-1 text-foreground focus:outline-none text-xl md:text-2xl"
                              placeholder="+234 xxx xxx xxxx"
                            />
                            {focusedField === 'phone' && !formData.phone && <BlinkingCursor />}
                          </span>
                        </p>
                      </div>

                      {/* Project Type */}
                      <div className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span>I'm interested in</span>
                          <span className="relative inline-block min-w-[250px]">
                            <select
                              value={formData.projectType}
                              onChange={e =>
                                setFormData({ ...formData, projectType: e.target.value })
                              }
                              className="w-full bg-transparent border-b border-primary/30 py-1 text-foreground focus:outline-none text-xl md:text-2xl appearance-none cursor-pointer"
                              required
                            >
                              <option value="" disabled className="bg-background text-base">
                                select type
                              </option>
                              {projectTypes.map(type => (
                                <option key={type} value={type} className="bg-background text-base">
                                  {type}
                                </option>
                              ))}
                            </select>
                          </span>
                        </p>
                      </div>

                      {/* Budget */}
                      <div className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        <p className="flex flex-wrap items-baseline gap-2">
                          <span>with a budget of approximately</span>
                          <span className="relative inline-block min-w-[200px]">
                            <select
                              value={formData.budget}
                              onChange={e => setFormData({ ...formData, budget: e.target.value })}
                              className="w-full bg-transparent border-b border-primary/30 py-1 text-foreground focus:outline-none text-xl md:text-2xl appearance-none cursor-pointer"
                            >
                              <option value="" disabled className="bg-background text-base">
                                select range
                              </option>
                              {budgetRanges.map(range => (
                                <option
                                  key={range}
                                  value={range}
                                  className="bg-background text-base"
                                >
                                  {range}
                                </option>
                              ))}
                            </select>
                          </span>
                        </p>
                      </div>

                      {/* Message */}
                      <div className="font-serif text-xl md:text-2xl text-muted-foreground leading-relaxed">
                        <p className="mb-4">Here's what I envision:</p>
                        <div className="relative">
                          <textarea
                            value={formData.message}
                            onChange={e => setFormData({ ...formData, message: e.target.value })}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => setFocusedField(null)}
                            rows={4}
                            className="w-full bg-transparent border-b border-primary/30 py-2 text-foreground focus:outline-none text-xl md:text-2xl resize-none"
                            placeholder="Tell us about your project..."
                            required
                          />
                        </div>
                      </div>

                      {/* Signature */}
                      <div className="pt-8 font-serif text-xl text-muted-foreground">
                        <p>With anticipation,</p>
                        <p className="text-foreground mt-2 italic">
                          {formData.name || 'Your Name'}
                        </p>
                      </div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-6 bg-foreground text-background text-caption-luxury hover:bg-primary transition-colors duration-500 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                      >
                        {isSubmitting
                          ? 'Sending Inquiry...'
                          : 'Send Letter – Begin Your Transformation'}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ========== INTERACTIVE MAP SECTION ========== */}
          <section ref={mapRef} className="section-spacing bg-card">
            <div className="container-luxury">
              <div className="mb-12">
                <motion.p
                  className="text-caption-luxury mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={mapInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                >
                  Visit Us
                </motion.p>
                <motion.h2
                  className="text-section text-foreground"
                  initial={{ opacity: 0, y: 40 }}
                  animate={mapInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 }}
                >
                  Our <span className="font-serif italic font-light">Location</span>
                </motion.h2>
              </div>

              {/* Map Container */}
              <motion.div
                className="relative aspect-[21/9] overflow-hidden"
                initial={{ opacity: 0, y: 60 }}
                animate={mapInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {/* Stylized Map Background */}
                <div className="absolute inset-0 bg-muted">
                  <img
                    src="/images/img-5bfc6b6191d2.webp"
                    alt="Lagos Map"
                    className="w-full h-full object-cover opacity-30"
                  />
                </div>

                {/* Map Grid Overlay */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full">
                    <defs>
                      <pattern id="mapGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path
                          d="M 60 0 L 0 0 0 60"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="0.5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill="url(#mapGrid)"
                      className="text-foreground"
                    />
                  </svg>
                </div>

                {/* Location Marker */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={mapInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6, type: 'spring' }}
                >
                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/30"
                    animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Marker */}
                  <div className="relative w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-background rounded-full" />
                  </div>

                  {/* Location Card */}
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-background p-6 min-w-[280px] border border-border shadow-xl"
                    initial={{ opacity: 0, y: -10 }}
                    animate={mapInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <p className="text-caption-luxury mb-2">
                      Lagos Design Studio – Where Legends are Born
                    </p>
                    <p className="font-serif text-lg text-foreground">1b, Kokoro-Aiye Street</p>
                    <p className="font-serif text-muted-foreground">Alagbado, Lagos</p>

                    <motion.a
                      href="https://maps.google.com/?q=Alagbado+Lagos+Nigeria"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-4 text-caption text-primary hover:text-foreground transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <span>Get Directions</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Coordinates Display */}
                <div className="absolute bottom-6 left-6 text-caption text-muted-foreground/60">
                  <p>6.6677° N, 3.2878° E</p>
                </div>

                <div className="absolute bottom-6 right-6 text-caption text-muted-foreground/60">
                  <p>Lagos, Nigeria</p>
                </div>
              </motion.div>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </PageTransition>
  )
}

export default Contact
