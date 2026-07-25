import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Instagram, Linkedin, MessageCircle, Mail, Phone, MapPin } from 'lucide-react'
import {
  EMAIL_GENERAL,
  FIRM_NAME,
  FIRM_NAME_LEAD,
  FIRM_NAME_TRAIL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_URL,
} from '@/lib/brand'

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true })

  return (
    <footer
      ref={containerRef}
      className="relative py-20 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-black border-t border-gold/20 overflow-hidden rounded-t-3xl"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
      </div>

      <div className="container-luxury relative z-10">
        {/* Main Footer Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
        >
          {/* Brand */}
          <motion.div className="lg:col-span-1">
            <Link to="/" className="block mb-6 group" data-cursor="link">
              <span className="text-2xl font-sans font-semibold tracking-wider uppercase bg-gradient-to-r from-gold via-yellow-400 to-gold bg-clip-text text-transparent group-hover:from-yellow-400 group-hover:to-gold transition-all duration-500">
                {FIRM_NAME_LEAD}
              </span>
              <span className="text-2xl font-serif italic font-light text-white/80 ml-2 group-hover:text-white transition-colors duration-300">
                {FIRM_NAME_TRAIL}
              </span>
            </Link>
            <p className="font-serif text-white/70 max-w-sm leading-relaxed text-sm md:text-base">
              A Lagos-based architecture and real estate development firm, designing residential,
              commercial, and heritage projects for institutional and private clients since 1999.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div>
            <h4 className="text-label mb-8 text-white font-sans font-medium tracking-wider uppercase text-sm">
              Navigate
            </h4>
            <nav className="space-y-4">
              {[
                { to: '/projects', label: 'Portfolio' },
                { to: '/atelier', label: 'About the Firm' },
                { to: '/expertise', label: 'Expertise' },
                { to: '/team', label: 'Team' },
                { to: '/contact', label: 'Contact' },
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  <Link
                    to={link.to}
                    className="block font-serif text-white/60 hover:text-gold hover:translate-x-1 transition-all duration-300 text-sm md:text-base"
                    data-cursor="link"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>

          {/* Contact Details */}
          <motion.div>
            <h4 className="text-label mb-8 text-white font-sans font-medium tracking-wider uppercase text-sm">
              Connect
            </h4>
            <div className="space-y-6">
              <motion.div
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <p className="font-serif text-white/70 text-sm leading-relaxed">
                  1b, Kokoro-Aiye Street
                  <br />
                  Alagbado, Lagos
                  <br />
                  Nigeria
                </p>
              </motion.div>
              <motion.a
                href={`tel:${PHONE_E164}`}
                className="flex items-center gap-3 font-serif text-white/60 hover:text-gold transition-colors duration-300 group"
                data-cursor="link"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Phone className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm md:text-base">{PHONE_DISPLAY}</span>
              </motion.a>
              <motion.a
                href={`mailto:${EMAIL_GENERAL}`}
                className="flex items-center gap-3 font-serif text-white/60 hover:text-gold transition-colors duration-300 group"
                data-cursor="link"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Mail className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm md:text-base">{EMAIL_GENERAL}</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Social Presence */}
          <motion.div>
            <h4 className="text-label mb-8 text-white font-sans font-medium tracking-wider uppercase text-sm">
              Follow
            </h4>
            <div className="space-y-4">
              {[
                {
                  href: INSTAGRAM_URL,
                  icon: Instagram,
                  label: 'Instagram',
                },
                {
                  href: 'https://linkedin.com/company/arcassured',
                  icon: Linkedin,
                  label: 'LinkedIn',
                },
                { href: WHATSAPP_URL, icon: MessageCircle, label: 'WhatsApp' },
              ].map((social, index) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-serif text-white/60 hover:text-gold transition-colors duration-300 group"
                  data-cursor="link"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + 0.1 * index }}
                >
                  <social.icon className="w-5 h-5 text-gold group-hover:scale-110 transition-transform duration-300" />
                  <span className="text-sm md:text-base">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mb-20 md:mb-32"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-serif font-light text-white mb-6">
            Ready to Transform Your Vision?
          </h3>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto text-sm md:text-base">
            Let's create something extraordinary together. Contact us to begin your architectural
            journey.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gold via-yellow-500 to-gold bg-size-200 bg-pos-0 hover:bg-pos-100 text-black font-sans font-medium tracking-wider uppercase text-sm transition-all duration-500 rounded-sm hover:shadow-2xl hover:shadow-gold/25"
            data-cursor="link"
          >
            Start Your Project
          </Link>
        </motion.div>

        {/* Massive Logo */}
        <motion.div
          className="overflow-hidden mb-16 md:mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.h2
            className="font-sans text-[14vw] md:text-[12vw] font-bold text-white/[0.03] leading-none tracking-wider select-none whitespace-nowrap uppercase"
            initial={{ x: '-5%' }}
            animate={isInView ? { x: 0 } : {}}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {FIRM_NAME}
          </motion.h2>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-sans">
            © {new Date().getFullYear()} {FIRM_NAME}. All rights reserved.
          </span>
          <span className="text-xs uppercase tracking-[0.2em] text-white/50 font-sans">
            Lagos, Nigeria
          </span>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
