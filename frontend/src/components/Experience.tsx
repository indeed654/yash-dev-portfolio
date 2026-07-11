import { experiences } from '../data/portfolio'

export default function Experience() {
  return (
    <section id="experience" className="px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-[13px] font-medium text-blue-500 mb-3">Experience</p>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-medium text-gray-900 tracking-tight max-w-2xl">
            Practical internships across backend systems and applied machine learning.
          </h2>
        </div>

        <div className="relative grid gap-5 before:absolute before:left-3 before:top-3 before:hidden before:h-[calc(100%-1.5rem)] before:w-px before:bg-gray-200 sm:before:block">
          {experiences.map((item) => (
            <article key={`${item.company}-${item.role}`} className="relative sm:pl-10">
              <span className="absolute left-[7px] top-5 hidden h-3 w-3 rounded-full border-2 border-blue-400 bg-[#f0f0ee] sm:block" />
              <div className="rounded-[1.5rem] border border-gray-200/80 bg-white/65 p-5 sm:p-6 backdrop-blur transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_24px_80px_rgba(17,24,39,0.08)]">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-[17px] font-medium text-gray-900">{item.role}</h3>
                    <p className="mt-1 text-[13px] font-medium text-gray-500">{item.company}</p>
                  </div>
                  <p className="text-[12px] font-medium text-blue-500">{item.period}</p>
                </div>

                <ul className="mt-5 grid gap-2">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2 text-[13px] leading-6 text-gray-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
