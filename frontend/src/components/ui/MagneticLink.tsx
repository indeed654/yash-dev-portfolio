import { type ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring, animate, useReducedMotion } from 'framer-motion'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export default function MagneticLink({
  href,
  children,
  className,
  ariaLabel,
  onClick,
}: {
  href: string
  children?: ReactNode
  className?: string
  ariaLabel?: string
  onClick?: () => void
}) {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const springX = useSpring(mx, { stiffness: 400, damping: 30 })
  const springY = useSpring(my, { stiffness: 400, damping: 30 })

  const rm = useReducedMotion()

  function onMove(e: React.MouseEvent) {
    if (rm) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top

    const dx = (px - rect.width / 2) / rect.width
    const dy = (py - rect.height / 2) / rect.height

    const tx = clamp(dx, -0.5, 0.5) * 10
    const ty = clamp(dy, -0.5, 0.5) * 10

    mx.set(tx)
    my.set(ty)
  }

  function onLeave() {
    if (rm) return
    animate(mx, 0, { duration: 0.2 })
    animate(my, 0, { duration: 0.2 })
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </motion.a>
  )
}

