import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Avoid SSR assumptions (project is client-only, but keeps it safe).
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    if (prefersReduced) return

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
    })

    lenisRef.current = lenis

    let rafId = 0

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(raf)
    }

    rafId = window.requestAnimationFrame(raf)

    return () => {
      window.cancelAnimationFrame(rafId)
      lenisRef.current?.destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}

