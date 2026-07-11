import { useEffect, useRef, useState } from 'react'

/**
 * Returns the current scroll direction: "up" when scrolling up, "down" when scrolling down.
 */
export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up')
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setDirection(y > lastY.current ? 'down' : 'up')
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return direction
}
