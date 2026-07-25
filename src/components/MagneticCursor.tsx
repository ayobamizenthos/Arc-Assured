import { useEffect, useState, useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

type CursorType = 'default' | 'text' | 'image' | 'button' | 'link' | 'video'

interface CursorState {
  type: CursorType
  text?: string
  scale?: number
}

const MagneticCursor = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>({ type: 'default' })
  const [isMobile, setIsMobile] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  // Smoother spring configs for different elements
  const springConfig = { damping: 35, stiffness: 400, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  // Slower trailing ring
  const ringSpringConfig = { damping: 25, stiffness: 150, mass: 1 }
  const ringXSpring = useSpring(cursorX, ringSpringConfig)
  const ringYSpring = useSpring(cursorY, ringSpringConfig)

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(hover: none) and (pointer: coarse)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    },
    [cursorX, cursorY, isVisible]
  )

  const getCursorType = useCallback((element: HTMLElement): CursorState => {
    // Check for custom cursor attributes
    if (element.dataset.cursor) {
      return {
        type: element.dataset.cursor as CursorType,
        text: element.dataset.cursorText,
        scale: element.dataset.cursorScale ? parseFloat(element.dataset.cursorScale) : undefined,
      }
    }

    // Check element type
    if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') {
      return { type: 'button', scale: 1.5 }
    }
    if (element.tagName === 'A' || element.closest('a')) {
      return { type: 'link', scale: 1.2 }
    }
    if (
      element.tagName === 'IMG' ||
      element.closest('.image-luxury') ||
      element.closest('[data-cursor="image"]')
    ) {
      return { type: 'image', text: 'View', scale: 2 }
    }
    if (element.tagName === 'VIDEO' || element.closest('video')) {
      return { type: 'video', text: 'Play', scale: 2 }
    }
    if (
      element.tagName === 'H1' ||
      element.tagName === 'H2' ||
      element.tagName === 'H3' ||
      element.tagName === 'P' ||
      element.closest('.text-hero')
    ) {
      return { type: 'text', scale: 0.5 }
    }

    return { type: 'default' }
  }, [])

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const state = getCursorType(target)
      setCursorState(state)

      // Magnetic pull for images
      if (state.type === 'image') {
        const imageElement =
          target.tagName === 'IMG'
            ? target
            : target.closest('img') ||
              target.closest('.image-luxury') ||
              target.closest('[data-cursor="image"]')
        if (imageElement) {
          const rect = imageElement.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          cursorX.set(centerX)
          cursorY.set(centerY)
        }
      }
    },
    [getCursorType, cursorX, cursorY]
  )

  const handleMouseOut = useCallback(() => {
    setCursorState({ type: 'default' })
  }, [])

  useEffect(() => {
    if (isMobile) return

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [handleMouseMove, handleMouseOver, handleMouseOut, isMobile])

  if (isMobile || !isVisible) return null

  const getCursorStyles = () => {
    const baseScale = cursorState.scale || 1

    switch (cursorState.type) {
      case 'button':
        return {
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '1px solid hsl(38 35% 62% / 0.8)',
          scale: baseScale,
        }
      case 'link':
        return {
          width: 60,
          height: 60,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: '1px solid hsl(38 35% 62% / 0.6)',
          scale: baseScale,
        }
      case 'image':
        return {
          width: 120,
          height: 120,
          borderRadius: '50%',
          backgroundColor: 'hsl(38 35% 62% / 0.9)',
          border: 'none',
          scale: baseScale,
        }
      case 'video':
        return {
          width: 100,
          height: 100,
          borderRadius: '50%',
          backgroundColor: 'hsl(0 0% 100% / 0.95)',
          border: 'none',
          scale: baseScale,
        }
      case 'text':
        return {
          width: 24,
          height: 4,
          borderRadius: '2px',
          backgroundColor: 'hsl(38 35% 62%)',
          border: 'none',
          scale: baseScale,
        }
      default:
        return {
          width: 12,
          height: 12,
          borderRadius: '50%',
          backgroundColor: 'hsl(38 35% 62%)',
          border: 'none',
          scale: 1,
        }
    }
  }

  const cursorStyles = getCursorStyles()

  return (
    <>
      {/* Main Cursor - Morphing Shape */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorStyles.width,
          height: cursorStyles.height,
          borderRadius: cursorStyles.borderRadius,
          backgroundColor: cursorStyles.backgroundColor,
          border: cursorStyles.border,
          scale: cursorStyles.scale,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        }}
      >
        {/* Text inside cursor for image/video states */}
        <AnimatePresence mode="wait">
          {cursorState.text && (
            <motion.span
              key={cursorState.type}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className={`text-[10px] font-sans font-medium uppercase tracking-[0.2em] ${
                cursorState.type === 'video' ? 'text-foreground' : 'text-background'
              }`}
            >
              {cursorState.text}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Ring - Follows with delay */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorState.type === 'default' ? 40 : 0,
          height: cursorState.type === 'default' ? 40 : 0,
          opacity: cursorState.type === 'default' ? 0.5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full rounded-full border border-white/60" />
      </motion.div>

      {/* Magnetic pull indicator for buttons */}
      <AnimatePresence>
        {(cursorState.type === 'button' || cursorState.type === 'link') && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            style={{
              x: ringXSpring,
              y: ringYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-32 h-32 rounded-full border border-primary/20" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MagneticCursor
