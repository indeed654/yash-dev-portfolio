import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn, staggerContainer } from '../../utils/motion'

export default function HeroMetrics() {
  const metrics = [
    { label: 'Projects', value: '12+', icon: '📁' },
    { label: 'Certifications', value: '5+', icon: '🏅' },
    { label: 'Technologies', value: '30+', icon: '⚙️' },
  ]

  return (
    <motion.div
      className="absolute bottom-8 left-6 flex gap-4"
      initial="hidden"
      animate="show"
      variants={staggerContainer(0.05, 0.1)}
    >
      {metrics.map((m) => (
        <motion.div
          key={m.label}
          className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-3 py-1 text-sm text-gray-700"
          variants={fadeIn()}
        >
          <span>{m.icon}</span>
          <span>{m.value}</span>
          <span>{m.label}</span>
        </motion.div>
      ))}
    </motion.div>
  )
}
