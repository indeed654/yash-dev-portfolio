import { skillCategories } from '../data/portfolio'
import SkillsMarquee from './ui/SkillsMarquee'

export default function Skills() {
  return (
    <section id="skills" className="px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-24 bg-white/45">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-[13px] font-medium text-blue-500 mb-3">Skills</p>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-medium text-gray-900 tracking-tight max-w-2xl">
            A focused stack for AI products, cloud systems, and secure engineering.
          </h2>
        </div>

        {/* Animated marquee of tech icons */}
        <div className="mb-8">
          <SkillsMarquee />
        </div>

        {/* Category list with simple progress bars */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category) => (
            <article
              key={category.title}
              className="rounded-[1.5rem] border border-gray-200/80 bg-[#f0f0ee]/70 p-5 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:scale-[1.01] hover:border-blue-200 hover:bg-white/80 hover:shadow-[0_24px_80px_rgba(17,24,39,0.08)]"
            >
              <h3 className="text-[15px] font-medium text-gray-900">{category.title}</h3>
              <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-blue-500"></div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
