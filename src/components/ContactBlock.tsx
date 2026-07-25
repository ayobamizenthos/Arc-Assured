import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

const ContactBlock = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section
      ref={sectionRef}
      className="relative py-32 md:py-40 lg:py-48 bg-background overflow-hidden"
    >
      <div className="container-luxury">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left - Contact Info */}
          <div>
            {/* Label */}
            <motion.p
              className="text-[11px] font-sans font-medium uppercase tracking-[0.25em] text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Contact
            </motion.p>

            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-sans font-medium uppercase tracking-wide text-foreground mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Get in <span className="font-serif italic font-light normal-case">Touch</span>
            </motion.h2>

            <motion.p
              className="text-lg md:text-xl font-serif text-muted-foreground leading-relaxed mb-10 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Tell us about your project, or ask about how we work. We read every enquiry and
              respond personally.
            </motion.p>

            {/* Find Us Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="inline-flex items-center gap-4 group bg-gradient-to-r from-background via-background/95 to-background border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl transition-all duration-500 backdrop-blur-sm"
                  >
                    <span className="text-sm font-sans font-medium uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors duration-300">
                      Find Us
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
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl bg-gradient-to-br from-background via-background/98 to-background/95 backdrop-blur-xl border-primary/10 shadow-2xl">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative overflow-hidden"
                  >
                    {/* Office Building Image */}
                    <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-6 shadow-2xl">
                      <motion.img
                        src="/images/img-05ddda6ee41f.webp"
                        alt="Modern office building in Lagos"
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <motion.div
                        className="absolute bottom-4 left-4 right-4"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      >
                        <h3 className="text-white text-xl font-serif font-light">
                          Lagos Design Studio
                        </h3>
                      </motion.div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-6">
                      {/* Email */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-primary"
                          >
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                            <polyline points="22,6 12,13 2,6" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-sans font-medium uppercase tracking-wide text-muted-foreground">
                            Email
                          </p>
                          <a
                            href="mailto:studio@arcassured.com"
                            className="text-foreground hover:text-primary transition-colors font-medium"
                          >
                            studio@arcassured.com
                          </a>
                        </div>
                      </motion.div>

                      {/* Physical Address */}
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="flex items-start gap-4 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20"
                      >
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="text-primary"
                          >
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-sans font-medium uppercase tracking-wide text-muted-foreground">
                            Address
                          </p>
                          <address className="not-italic text-foreground leading-relaxed">
                            1b, Kokoro-Aiye Street,
                            <br />
                            Alagbado, Lagos,
                            <br />
                            Nigeria
                          </address>
                        </div>
                      </motion.div>

                      {/* View on Map Button */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="pt-4"
                      >
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <a
                            href="https://www.google.com/maps/search/?api=1&query=1b+Kokoro-Aiye+Street+Alagbado+Lagos+Nigeria"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2"
                          >
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              className="text-white"
                            >
                              <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2.172a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 10.828 19H13a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4z" />
                              <path d="M14 11h4a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2.172a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 13 19h-2.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 17H4a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h4" />
                            </svg>
                            View on Google Maps
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>

          {/* Right - Studio Location Card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Background Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                initial={{ clipPath: 'inset(100% 0 0 0)' }}
                animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              >
                <img
                  src="/images/img-9228ebeca9c1.webp"
                  alt="Lagos Skyline"
                  className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
              </motion.div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                {/* Studio Name */}
                <motion.p
                  className="text-[10px] font-sans font-medium uppercase tracking-[0.2em] text-white/50 mb-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  Lagos Design Studio
                </motion.p>

                {/* Address */}
                <motion.address
                  className="not-italic text-base md:text-lg font-serif text-white/80 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  1b, Kokoro-Aiye Street,
                  <br />
                  Alagbado, Lagos,
                  <br />
                  Nigeria
                </motion.address>

                {/* Contact Details */}
                <motion.div
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <a
                    href="tel:+2348034552215"
                    className="text-sm font-sans text-white/60 hover:text-white transition-colors"
                  >
                    +234 803 455 2215
                  </a>
                  <a
                    href="mailto:studio@arcassured.com"
                    className="text-sm font-sans text-white/60 hover:text-white transition-colors"
                  >
                    studio@arcassured.com
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Floating Social Icons */}
            <motion.div
              className="absolute -bottom-4 right-8 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {/* Instagram */}
              <a
                href="https://instagram.com/arcassured"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-background flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
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

              {/* WhatsApp */}
              <a
                href="https://wa.me/2348034552215"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-background flex items-center justify-center text-foreground hover:text-primary transition-colors"
                aria-label="WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bronze Line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-primary/30"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        style={{ transformOrigin: 'top' }}
      />
    </section>
  )
}

export default ContactBlock
