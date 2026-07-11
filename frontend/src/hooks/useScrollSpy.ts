import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from '../utils/useReducedMotion'

export function useScrollSpy(sectionIds: string[], opts?: { rootMargin?: string }) {
  const reduced = useReducedMotion()
  const [active, setActive] = useState<string>(sectionIds[0] ?? '')

  const rootMargin = opts?.rootMargin ?? '-30% 0px -60% 0px'

  const callbacks = useMemo(() => sectionIds.filter(Boolean), [sectionIds])

  useEffect(() => {
    if (!callbacks.length) return
    if (reduced) {
      // simple fallback: pick the first id
      setActive(callbacks[0])
      return
    }

    const nodes = callbacks
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => !!n)

    if (!nodes.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0]
        if (!visible?.target) return
        const id = (visible.target as HTMLElement).id
        if (id) setActive(id)
      },
      { root: null, rootMargin, threshold: [0.08, 0.2, 0.35] }
    )

    nodes.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [callbacks, reduced, rootMargin])

  return active
}

