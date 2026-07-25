import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

interface BackButtonProps {
  className?: string
}

const BackButton = ({ className = '' }: BackButtonProps) => {
  const navigate = useNavigate()

  return (
    <motion.button
      onClick={() => navigate(-1)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className={`fixed top-6 left-6 md:top-8 md:left-8 z-50 group cursor-magnetic ${className}`}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ width: 56, height: 56, left: -6, top: -6 }}
      />

      {/* Main container */}
      <div className="relative flex items-center gap-3">
        {/* Animated circle button */}
        <div className="relative">
          {/* Background circle */}
          <motion.div
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary/30 bg-background/50 backdrop-blur-xl flex items-center justify-center overflow-hidden"
            whileHover={{ scale: 1.1, borderColor: 'hsl(var(--primary))' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated gradient fill on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5"
              initial={{ x: '-100%' }}
              whileHover={{ x: '0%' }}
              transition={{ duration: 0.4 }}
            />

            {/* Arrow icon with animation */}
            <motion.div animate={{ x: 0 }} whileHover={{ x: -2 }} transition={{ duration: 0.3 }}>
              <ArrowLeft size={18} strokeWidth={1} className="text-primary relative z-10" />
            </motion.div>
          </motion.div>

          {/* Rotating ring */}
          <svg
            className="absolute inset-0 w-10 h-10 md:w-12 md:h-12 -rotate-90"
            viewBox="0 0 48 48"
          >
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="138"
              strokeDashoffset="138"
              whileHover={{ strokeDashoffset: 0 }}
              transition={{ duration: 0.6 }}
            />
          </svg>
        </div>

        {/* Text label - hidden on mobile, visible on desktop */}
        <motion.div
          className="hidden md:flex items-center overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: 'auto', opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.span
            className="font-mono text-[10px] tracking-[0.3em] text-primary/80 whitespace-nowrap pr-2"
            initial={{ x: -20 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            BACK
          </motion.span>
        </motion.div>
      </div>

      {/* Decorative line */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-12 md:left-14 h-px bg-gradient-to-r from-primary/40 to-transparent"
        initial={{ width: 0 }}
        whileHover={{ width: 40 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      />
    </motion.button>
  )
}

export default BackButton
