import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  EMAIL_GENERAL,
  FIRM_NAME_LEAD,
  FIRM_NAME_TRAIL,
  INSTAGRAM_URL,
  PHONE_DISPLAY,
  PHONE_E164,
  WHATSAPP_URL,
} from '@/lib/brand'

interface Service {
  label: string
  href: string
  subcategories: { label: string; href: string }[]
}

interface NavItem {
  label: string
  href: string
  services?: Service[]
}

const navLinks: NavItem[] = [
  {
    label: 'Services',
    href: '/expertise',
    services: [
      {
        label: 'Architectural Design',
        href: '/expertise#architectural-design',
        subcategories: [
          {
            label: 'Residential',
            href: '/projects?category=residential&service=architectural-design',
          },
          {
            label: 'Commercial',
            href: '/projects?category=commercial&service=architectural-design',
          },
        ],
      },
      {
        label: 'Planning Applications',
        href: '/expertise#planning-applications',
        subcategories: [
          {
            label: 'Residential',
            href: '/projects?category=residential&service=planning-applications',
          },
        ],
      },
      {
        label: 'Interior Design',
        href: '/expertise#interior-design',
        subcategories: [
          { label: 'Residential', href: '/projects?category=residential&service=interior-design' },
          { label: 'Commercial', href: '/projects?category=commercial&service=interior-design' },
        ],
      },
      {
        label: 'Conservation & Heritage',
        href: '/expertise#conservation-heritage',
        subcategories: [
          {
            label: 'Residential',
            href: '/projects?category=residential&service=conservation-heritage',
          },
        ],
      },
      {
        label: 'Real Estate Development',
        href: '/expertise#development',
        subcategories: [
          { label: 'Residential', href: '/projects?category=residential&service=development' },
          { label: 'Commercial', href: '/projects?category=commercial&service=development' },
        ],
      },
    ],
  },
  { label: 'Portfolio', href: '/projects' },
  { label: 'About', href: '/atelier' },
  { label: 'Contact', href: '/contact' },
]

interface CurtainMenuProps {
  isOpen: boolean
  onClose: () => void
}

const CurtainMenu = ({ isOpen, onClose }: CurtainMenuProps) => {
  const [activeMainNav, setActiveMainNav] = useState<string>('Services')
  const [activeService, setActiveService] = useState<Service | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isOpen && navLinks[0].services) {
      setActiveService(navLinks[0].services[0])
      setActiveMainNav('Services')
    }
  }, [isOpen])

  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!isOpen) return

    document.body.style.overflow = 'hidden'
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen, onClose])

  const navigateAndClose = (href: string) => {
    onClose()
    navigate(href)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#080808] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                initial={{ scale: 1.15, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
                className="absolute inset-0"
              >
                <img
                  src="/images/img-afbfc8d0d605.webp"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/95 to-[#080808]/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/50" />
                <div className="absolute inset-0 bg-[#080808]/30" />
              </motion.div>
            </div>

            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-5 md:px-10 lg:px-16 py-5 md:py-8 z-20">
              <motion.button
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={() => navigateAndClose('/')}
                className="text-white/90 hover:text-white transition-colors group"
                aria-label={`${FIRM_NAME_LEAD} ${FIRM_NAME_TRAIL} — home`}
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-sans font-semibold text-base sm:text-xl md:text-2xl tracking-[0.15em] uppercase">
                    {FIRM_NAME_LEAD}
                  </span>
                  <span className="font-serif italic font-light text-base sm:text-xl md:text-2xl text-white/70 group-hover:text-white/90 transition-colors">
                    {FIRM_NAME_TRAIL}
                  </span>
                </div>
              </motion.button>

              <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300 touch-target group"
                aria-label="Close menu"
              >
                <X
                  size={24}
                  strokeWidth={1}
                  className="group-hover:rotate-90 transition-transform duration-500"
                />
              </motion.button>
            </div>

            <div className="relative z-10 min-h-full flex items-start md:items-center px-[clamp(1.25rem,5vw,6rem)] pt-24 pb-10 md:pb-32">
              <div className="w-full">
                <div className="hidden md:grid grid-cols-12 gap-[clamp(0.5rem,2.4vw,3rem)] items-start">
                  <nav className="col-span-4 xl:col-span-3 space-y-1">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-[clamp(8px,0.72vw,10px)] uppercase tracking-[0.3em] text-white/50 mb-[clamp(0.9rem,2.2vw,1.5rem)] block"
                    >
                      Navigation
                    </motion.span>

                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.label}
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{
                          delay: 0.4 + index * 0.06,
                          duration: 0.6,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                        onClick={() => {
                          if (link.services) {
                            setActiveMainNav(link.label)
                            setActiveService(link.services[0])
                          } else {
                            navigateAndClose(link.href)
                          }
                        }}
                        onMouseEnter={() => {
                          if (link.services) {
                            setActiveMainNav(link.label)
                            setActiveService(link.services[0])
                          }
                        }}
                        className="text-left group w-full flex items-center justify-between py-2"
                      >
                        <span
                          className={`text-[clamp(1.05rem,3.1vw,3rem)] font-sans font-light uppercase tracking-wide transition-all duration-500 ${
                            activeMainNav === link.label
                              ? 'text-white'
                              : 'text-white/60 group-hover:text-white/90'
                          }`}
                        >
                          {link.label}
                        </span>

                        {activeMainNav === link.label && !link.services && (
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-white/40"
                          >
                            <ArrowUpRight size={24} strokeWidth={1} />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </nav>

                  <div className="col-span-1 flex justify-center pt-10">
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ delay: 0.7, duration: 1, ease: [0.76, 0, 0.24, 1] }}
                      className="w-px h-[clamp(180px,24vw,320px)] bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top"
                    />
                  </div>

                  <div className="col-span-4 xl:col-span-4 space-y-1 pt-0">
                    {activeMainNav === 'Services' && (
                      <>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-[clamp(8px,0.72vw,10px)] uppercase tracking-[0.3em] text-white/50 mb-[clamp(0.9rem,2.2vw,1.5rem)] block"
                        >
                          Services
                        </motion.span>

                        {navLinks[0].services?.map((service, index) => (
                          <motion.button
                            key={service.label}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.45 + index * 0.04, duration: 0.5 }}
                            onMouseEnter={() => setActiveService(service)}
                            onFocus={() => setActiveService(service)}
                            onClick={() => navigateAndClose(service.href)}
                            className={`text-left w-full py-2.5 transition-all duration-500 flex items-center justify-between group ${
                              activeService?.label === service.label
                                ? 'text-white'
                                : 'text-white/65 hover:text-white/90'
                            }`}
                          >
                            <span className="text-[clamp(0.8rem,1.3vw,1.125rem)] font-sans font-normal uppercase tracking-[0.18em]">
                              {service.label}
                            </span>

                            {activeService?.label === service.label && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 32 }}
                                className="h-px bg-white/30"
                              />
                            )}
                          </motion.button>
                        ))}
                      </>
                    )}
                  </div>

                  <div className="col-span-1 flex justify-center pt-10">
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      transition={{ delay: 0.8, duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                      className="w-px h-[clamp(140px,16vw,200px)] bg-gradient-to-b from-transparent via-white/10 to-transparent origin-top"
                    />
                  </div>

                  <div className="col-span-2 space-y-1 pt-0">
                    {activeService && (
                      <>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.1 }}
                          className="text-[clamp(8px,0.72vw,10px)] uppercase tracking-[0.3em] text-white/50 mb-[clamp(0.9rem,2.2vw,1.5rem)] block"
                        >
                          Category
                        </motion.span>

                        {activeService.subcategories.map((sub, index) => (
                          <motion.button
                            key={`${activeService.label}-${sub.label}`}
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.04, duration: 0.3 }}
                            onClick={() => navigateAndClose(sub.href)}
                            className="text-left w-full text-white/65 hover:text-white transition-colors duration-500 py-2.5 flex items-center gap-3 group"
                          >
                            <span className="w-2 h-px bg-white/50 group-hover:w-4 group-hover:bg-white/80 transition-all duration-300" />
                            <span className="text-[clamp(0.72rem,1.05vw,0.875rem)] font-sans font-light uppercase tracking-[0.18em]">
                              {sub.label}
                            </span>
                          </motion.button>
                        ))}
                      </>
                    )}
                  </div>
                </div>

                <div className="md:hidden space-y-10">
                  <nav aria-label="Primary" className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 block">
                      Navigation
                    </span>
                    {navLinks.map((link, index) => (
                      <motion.button
                        key={link.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 + index * 0.06 }}
                        onClick={() => navigateAndClose(link.href)}
                        className="block w-full text-left py-2 touch-target"
                      >
                        <span className="text-[clamp(1.6rem,8vw,2.25rem)] font-sans font-light uppercase tracking-wide text-white/90 hover:text-white transition-colors">
                          {link.label}
                        </span>
                      </motion.button>
                    ))}
                  </nav>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 block">
                      Services
                    </span>
                    {navLinks[0].services?.map((service, index) => (
                      <motion.button
                        key={service.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 + index * 0.05 }}
                        onClick={() => navigateAndClose(service.href)}
                        className="block w-full text-left py-2 touch-target"
                      >
                        <span className="text-[clamp(0.95rem,4.2vw,1.15rem)] font-sans font-normal uppercase tracking-[0.15em] text-white/75 hover:text-white transition-colors">
                          {service.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative md:absolute md:bottom-0 md:left-0 md:right-0 px-[clamp(1.25rem,5vw,6rem)] pb-10 md:py-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.6 }}
                className="space-y-3"
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="w-12 h-px bg-gradient-to-r from-primary/60 to-transparent origin-left"
                  />
                  <span className="text-[9px] uppercase tracking-[0.3em] text-white/60 font-sans font-medium">
                    Est. 1999
                  </span>
                </div>

                <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-sans max-w-xs">
                  Architecture &amp; Real Estate Development, Lagos
                </p>

                <button
                  onClick={() => navigateAndClose('/atelier')}
                  className="text-[9px] uppercase tracking-[0.25em] text-primary hover:text-primary/80 transition-colors font-sans font-medium flex items-center gap-2 group"
                >
                  <span>Discover Our Story</span>
                  <ArrowUpRight
                    size={12}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </button>
              </motion.div>

              {/* Contact & Social */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="flex flex-col items-start md:items-end gap-4"
              >
                <a
                  href={`tel:${PHONE_E164}`}
                  className="text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors font-sans touch-target"
                >
                  {PHONE_DISPLAY}
                </a>

                <div className="flex items-center gap-6">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-300 touch-target"
                    aria-label="Instagram"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-300 touch-target"
                    aria-label="WhatsApp"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </a>

                  <a
                    href={`mailto:${EMAIL_GENERAL}`}
                    className="text-white/70 hover:text-white transition-colors duration-300 touch-target"
                    aria-label="Email"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CurtainMenu
