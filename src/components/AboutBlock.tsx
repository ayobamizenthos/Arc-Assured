import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FIRM_NAME_LEAD, FIRM_NAME_TRAIL, FIRM_NAME_TITLE } from '@/lib/brand'

const AboutBlock = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100])
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-[#0A0A0A] overflow-hidden"
    >
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          {/* Left - Image with Parallax */}
          <div className="lg:col-span-6 relative">
            <motion.div
              className="relative aspect-[3/4] overflow-hidden"
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
              transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            >
              <motion.img
                src="/images/img-c126e1f5e9f7.webp"
                alt="Arc Assured & Partners studio"
                className="w-full h-full object-cover"
                style={{ y: imageY }}
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 to-transparent" />
            </motion.div>

            {/* Floating Label */}
            <motion.div
              className="absolute -bottom-6 md:-bottom-8 right-0 md:right-8 bg-primary px-6 py-4"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <p className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-foreground">
                Est. 1999
              </p>
            </motion.div>
          </div>

          {/* Right - Content */}
          <div className="lg:col-span-5 lg:col-start-8">
            <motion.div style={{ y: textY }}>
              {/* Label */}
              <motion.p
                className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-white/50 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About the Firm
              </motion.p>

              {/* Subtitle */}
              <motion.p
                className="text-xs font-sans uppercase tracking-[0.15em] text-white/50 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Architecture &amp; Real Estate Development Studio
              </motion.p>

              {/* Main Title */}
              <motion.h2
                className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium uppercase tracking-wide text-white/90 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {FIRM_NAME_LEAD}{' '}
                <span className="font-serif italic font-light normal-case">{FIRM_NAME_TRAIL}</span>
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl font-serif text-white/70 leading-relaxed mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                At {FIRM_NAME_TITLE}, design decisions are made deliberately. Every line, material,
                and proportion is chosen to serve how a space is lived in and worked in.
              </motion.p>

              {/* Description */}
              <motion.p
                className="text-base font-serif text-white/70 leading-relaxed mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Founded in Lagos, our studio has grown into one of West Africa's most respected
                architecture practices, designing buildings that respond to their context and are
                built to last.
              </motion.p>

              {/* Read More Link */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Link to="/atelier" className="inline-flex items-center gap-4 group">
                  <span className="text-[11px] font-sans font-medium uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors duration-300">
                    Read More
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <motion.div
        className="absolute top-1/2 left-0 w-px h-[40%] bg-white/5 -translate-y-1/2"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.4 }}
        style={{ transformOrigin: 'top' }}
      />
    </section>
  )
}

export default AboutBlock
