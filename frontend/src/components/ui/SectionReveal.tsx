import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../../utils/motion'
import { useScrollReveal } from '../../hooks/useScrollReveal'
import { useReducedMotion } from '../../utils/useReducedMotion'

export function SectionReveal({
  children,
  className,
  id,
}: {
  id?: string
  className?: string
  children: React.ReactNode
}) {

  const { setRef, visible } = useScrollReveal<HTMLElement>()
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <section id={id} ref={setRef as any} className={className}>
        {children}
      </section>
    )

  }

  // Avoid passing DOM motion events incorrectly typed from HTMLAttributes.
  return (
    <motion.section
      id={id}
      ref={setRef as any}
      className={className}
      initial="hidden"
      animate={visible ? 'show' : 'hidden'}
      variants={fadeUp()}
    >
      <motion.div variants={staggerContainer(0.06, 0.08)}>{children}</motion.div>
    </motion.section>
  )

}


