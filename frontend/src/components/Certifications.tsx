import { certifications } from '../data/portfolio'

export default function Certifications() {
  return (
    <section id="certifications" className="px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-[13px] font-medium text-blue-500 mb-3">Certifications</p>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-medium text-gray-900 tracking-tight max-w-2xl">
            Continuous learning across AI, cyber, analytics, and productivity workflows.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((certification) => (
            <article
              key={certification}
              className="rounded-[1.25rem] border border-gray-200/80 bg-white/65 p-5 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:bg-white/85 hover:shadow-[0_24px_70px_rgba(17,24,39,0.08)]"
            >
              <p className="text-[14px] leading-6 font-medium text-gray-800">{certification}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
