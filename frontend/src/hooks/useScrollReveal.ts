import { useEffect, useMemo, useState } from 'react'
import { useReducedMotion } from '../utils/useReducedMotion'

export function useScrollReveal<T extends HTMLElement>(opts?: {
  rootMargin?: string
  threshold?: number
}) {
  const reduced = useReducedMotion()
  const [node, setNode] = useState<T | null>(null)
  const [visible, setVisible] = useState(false)

  const { rootMargin = '0px 0px -10% 0px', threshold = 0.12 } = opts ?? {}

  const observer = useMemo(() => {
    if (reduced) return null

    if (typeof IntersectionObserver === 'undefined') return null

    return new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setVisible(true)
          observer?.disconnect()
        }
      },
      { root: null, rootMargin, threshold }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rootMargin, reduced, threshold])

  useEffect(() => {
    if (!node) return
    if (!observer) {
      setVisible(true)
      return
    }

    observer.observe(node)
    return () => observer.disconnect()
  }, [node, observer])

  // Reduced motion => already visible.
  useEffect(() => {
    if (reduced) setVisible(true)
  }, [reduced])

  return { setRef: setNode, visible }
}

