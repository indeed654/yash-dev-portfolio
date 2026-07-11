import { type ReactNode } from 'react'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: ReactNode
  subtitle?: ReactNode
}) {
  return (
    <header className="mb-8">
      <p className="text-[13px] font-medium text-blue-500 mb-3">{eyebrow}</p>
      <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-medium text-gray-900 tracking-tight max-w-2xl">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-[13px] text-gray-500 max-w-2xl">{subtitle}</p> : null}
    </header>
  )
}

