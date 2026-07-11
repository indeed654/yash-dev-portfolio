import React from 'react'
import { motion } from 'framer-motion'
import { cardTilt, hoverElevation, fadeIn } from '../../utils/motion'

interface ProjectCardProps {
  title: string
  tech: string[]
  features: string[]
  // Placeholder fields – could be expanded later
  role?: string
  duration?: string
  outcome?: string
}

export default function ProjectCard({ title, tech, features, role, duration, outcome }: ProjectCardProps) {
  return (
    <motion.article
      className="flex min-h-[360px] flex-col rounded-[1.5rem] border border-gray-200/80 bg-[#f0f0ee]/70 p-5 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-200 hover:bg-white/80 hover:shadow-[0_28px_90px_rgba(17,24,39,0.09)]"
      variants={fadeIn()}
      whileHover={{...cardTilt, ...hoverElevation}}
    >
      {/* Placeholder image area */}
      <div className="h-40 w-full bg-gray-200/30 rounded-lg mb-4" />

      <h3 className="text-[18px] leading-snug font-medium text-gray-900">{title}</h3>

      <div className="mt-5 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-[12px] font-medium text-blue-500"
          >
            {t}
          </span>
        ))}
      </div>

      <ul className="mt-6 grid gap-2">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-[13px] leading-6 text-gray-600">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {/* Optional meta fields – rendered if provided */}
      {(role || duration || outcome) && (
        <div className="mt-auto pt-4 text-[13px] text-gray-600">
          {role && <div><strong>Role:</strong> {role}</div>}
          {duration && <div><strong>Duration:</strong> {duration}</div>}
          {outcome && <div><strong>Outcome:</strong> {outcome}</div>}
        </div>
      )}
    </motion.article>
  )
}
