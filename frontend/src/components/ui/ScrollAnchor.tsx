import { type AnchorHTMLAttributes } from 'react'

export function ScrollAnchor({
  href,
  onClick,
  children,
  ...rest
}: {
  href: string
  onClick?: () => void
  children: React.ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'onClick'>) {
  return (
    <a
      href={href}
      onClick={(e) => {
        const id = href.startsWith('#') ? href.slice(1) : ''
        if (id) {
          e.preventDefault()
          const el = document.getElementById(id)
          el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        onClick?.()
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

