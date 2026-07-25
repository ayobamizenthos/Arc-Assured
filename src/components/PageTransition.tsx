import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      {/* Page Content with fade */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}
      >
        {children}
      </motion.div>

      {/* Bronze Curtain Reveal */}
      <motion.div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #CD7F32 0%, #A0522D 50%, #8B4513 100%)',
        }}
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        exit={{ x: '100%' }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
      />
    </>
  )
}

export default PageTransition
