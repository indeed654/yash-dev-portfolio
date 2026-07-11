import { useEffect, useState } from 'react'

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!mql) return

    const onChange = () => setReduced(!!mql.matches)
    onChange()

    // Safari/old browsers
    if ('addEventListener' in mql) {
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    }

    // @ts-expect-error legacy
    mql.addListener(onChange)
    // @ts-expect-error legacy
    return () => mql.removeListener(onChange)
  }, [])

  return reduced
}

