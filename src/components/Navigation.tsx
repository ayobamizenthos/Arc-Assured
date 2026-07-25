import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CurtainMenu from './CurtainMenu'
import { FIRM_MONOGRAM, FIRM_NAME_LEAD, FIRM_NAME_TRAIL } from '@/lib/brand'

const Navigation = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const closeMenu = useCallback(() => {
    setMenuOpen(wasOpen => {
      if (wasOpen) triggerRef.current?.focus()
      return false
    })
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      setScrollProgress(Math.min(currentScrollY / 200, 1))
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <>
      {/* Fixed Header with Hide on Scroll */}
      <motion.header
        className="fixed top-4 left-4 right-4 md:left-8 md:right-8 z-50 rounded-full transition-all duration-500 safe-top"
        style={{
          backdropFilter: `blur(${scrollProgress * 10}px)`,
          backgroundColor:
            scrollProgress > 0 ? `rgba(0,0,0,${scrollProgress * 0.9})` : 'transparent',
          boxShadow: scrollProgress > 0 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
          borderBottom: scrollProgress > 0.5 ? '1px solid rgba(255,255,255,0.1)' : 'none',
        }}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -200 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-luxury py-4 md:py-6">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="mix-blend-difference group"
              data-cursor="link"
              aria-label={`${FIRM_NAME_LEAD} ${FIRM_NAME_TRAIL} — home`}
            >
              <span className="md:hidden font-sans font-semibold text-2xl tracking-[0.15em] uppercase text-white">
                {FIRM_MONOGRAM}
              </span>

              <div className="hidden md:flex items-baseline gap-2">
                <span className="font-sans font-semibold text-lg tracking-[0.12em] uppercase text-white">
                  {FIRM_NAME_LEAD}
                </span>
                <span className="font-serif italic font-normal text-lg text-white/80">
                  {FIRM_NAME_TRAIL}
                </span>
              </div>
            </Link>

            <motion.span
              className="hidden lg:block absolute left-1/2 -translate-x-1/2 text-[10px] font-serif italic text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 - scrollProgress }}
              transition={{ duration: 0.3 }}
            >
              Architecture &amp; Real Estate Development
            </motion.span>

            <div className="flex items-center gap-6 md:gap-8">
              <Link
                to="/contact"
                className="hidden md:inline-block mix-blend-difference text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
                data-cursor="link"
              >
                Contact
              </Link>

              <motion.button
                ref={triggerRef}
                onClick={() => setMenuOpen(true)}
                className="mix-blend-difference flex items-center gap-3 group touch-target"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                data-cursor="button"
              >
                <span className="hidden md:block text-[10px] font-sans font-medium uppercase tracking-[0.25em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Menu
                </span>
                <span className="relative flex flex-col items-end justify-center w-8 h-8">
                  <span className="block w-7 h-[2px] bg-white mb-[6px] origin-right transition-all duration-300" />
                  <span className="block w-5 h-[2px] bg-white mb-[6px] origin-right group-hover:w-7 transition-all duration-300" />
                  <span className="block w-7 h-[2px] bg-white origin-right transition-all duration-300" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <CurtainMenu isOpen={menuOpen} onClose={closeMenu} />
    </>
  )
}

export default Navigation
