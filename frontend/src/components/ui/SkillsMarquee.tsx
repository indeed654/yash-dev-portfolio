import React from 'react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeIn } from '../../utils/motion'

// Simple list of tech icons – using emoji placeholders for brevity
const techIcons = [
  '⚛️', // React
  '🧩', // TypeScript
  '💅', // Tailwind
  '⚙️', // Node
  '🚀', // Vite
  '🪄', // Framer Motion
]

export default function SkillsMarquee() {
  return (
    <motion.div
      className="flex gap-4 overflow-x-auto py-4"
      variants={staggerContainer(0.05, 0.1)}
      initial="hidden"
      animate="show"
    >
      {techIcons.map((icon, idx) => (
        <motion.span
          key={idx}
          className="text-2xl"
          variants={fadeIn()}
        >
          {icon}
        </motion.span>
      ))}
    </motion.div>
  )
}
