import { type Transition, type Variants } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

export const motionSpring: Transition = {
  type: 'spring',
  stiffness: 520,
  damping: 40,
  mass: 0.7,
}

// Existing variants
export const fadeUp = (): Variants => ({
  hidden: { opacity: 0, y: 14, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...motionSpring, duration: 0.55 },
  },
})

export const fadeIn = (): Variants => ({
  hidden: { opacity: 0, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { ...motionSpring, duration: 0.45 },
  },
})

export const staggerContainer = (
  staggerChildren = 0.06,
  delayChildren = 0.08
): Variants => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

// New reusable motion variants
export const blurToSharp = (duration = 0.5): Variants => ({
  hidden: { opacity: 0, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { ...motionSpring, duration },
  },
})

export const hoverElevation = {
  scale: 1.03,
  transition: { type: 'spring', stiffness: 300 },
}

export const cardTilt = {
  rotateX: 5,
  rotateY: 5,
  transition: { type: 'spring', stiffness: 400 },
}

export const sectionChoreography = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: delay } },
})

export const animatedDivider = (duration = 0.4) => ({
  hidden: { width: 0 },
  show: { width: '100%', transition: { duration } },
})

export const pageTransition = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { type: 'tween', ease: 'anticipate', duration: 0.4 } },
  exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
}

// Helper to retrieve a variant by name – useful for components
export const useMotion = (type: string, ...args: any[]): Variants => {
  switch (type) {
    case 'fadeUp':
      return fadeUp()
    case 'fadeIn':
      return fadeIn()
    case 'stagger':
      return staggerContainer(...args)
    case 'blurToSharp':
      return blurToSharp(...args)
    case 'hoverElevation':
      return hoverElevation as unknown as Variants
    case 'cardTilt':
      return cardTilt as unknown as Variants
    case 'sectionChoreo':
      return sectionChoreography(...args)
    case 'divider':
      return animatedDivider(...args)
    case 'page':
      return pageTransition
    default:
      return {}
  }
}

// Convenience hook to avoid scattered reduced-motion logic.
export function useMotionReduced() {
  return useReducedMotion()
}

