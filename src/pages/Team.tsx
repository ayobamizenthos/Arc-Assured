import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const Team = () => {
  return (
    <div className="relative min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center pt-24">
        <div className="container-wide text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-widest text-muted-foreground block mb-6"
          >
            Leadership
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight mb-8"
          >
            The practice, and the people behind it
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A Lagos studio built around a consistent design philosophy and a close working
            relationship with every client.
          </motion.p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-24">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-[3/4] overflow-hidden"
            >
              <img
                src="/images/img-75d1492bc82d.webp"
                alt="Olayinka Ibrahim"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content */}
            <div className="flex flex-col justify-center space-y-8">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs uppercase tracking-widest text-muted-foreground"
              >
                Founder & Principal Architect
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground"
              >
                Olayinka Ibrahim
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
              >
                With over two decades in Nigerian architecture and real estate development, Olayinka
                Ibrahim founded the practice on a straightforward conviction: that carefully
                considered design measurably improves how people live and work.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
              >
                His work spans residences, commercial developments, and mixed-use projects across
                Lagos. Each one reflects a sustained attention to craftsmanship, sustainability, and
                the specific conditions of West African urbanism.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-sm md:text-base text-muted-foreground leading-relaxed"
              >
                Trained in both traditional building techniques and contemporary practice, he brings
                a perspective that draws on Nigeria's architectural heritage while working fluently
                with modern methods and standards.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 md:py-32 bg-secondary">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-foreground italic max-w-3xl mx-auto mb-8 leading-relaxed">
              "Architecture isn't about putting up structures. It's about making spaces where life
              unfolds, memories are made, and communities take shape."
            </blockquote>
            <cite className="text-xs uppercase tracking-widest text-muted-foreground not-italic">
              — Olayinka Ibrahim
            </cite>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container-wide text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-muted-foreground text-sm mb-8">Ready to discuss your project?</p>
            <Link
              to="/contact"
              className="inline-block text-xl md:text-2xl font-light text-foreground link-minimal"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Team
