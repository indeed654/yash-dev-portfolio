import { owner } from '../data/portfolio'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-24 bg-white/45">
      <div className="absolute left-10 bottom-0 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl transition-transform duration-200 hover:scale-105" />
      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-white/70 bg-white/60 p-6 sm:p-8 md:p-10 backdrop-blur-2xl shadow-[0_30px_100px_rgba(17,24,39,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_35px_120px_rgba(17,24,39,0.12)]">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-[13px] font-medium text-blue-500 mb-3">Contact</p>
              <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-medium text-gray-900 tracking-tight max-w-2xl">
                Let&apos;s build intelligent, secure systems with real-world utility.
              </h2>
              <div className="mt-6 grid gap-3 text-[13px] text-gray-600">
                <a className="font-medium transition-colors duration-200 hover:text-blue-500" href={`mailto:${owner.email}`}>
                  Email: {owner.email}
                </a>
                <a className="font-medium transition-colors duration-200 hover:text-blue-500" href={owner.github.href}>
                  GitHub: {owner.github.value}
                </a>
                <a className="font-medium transition-colors duration-200 hover:text-blue-500" href={owner.linkedIn.href}>
                  LinkedIn: {owner.linkedIn.value}
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <a
                href={`mailto:${owner.email}`}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-500 border border-blue-400 rounded-full px-5 py-2.5 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-200 group"
              >
                Email Me
                <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href={owner.github.href}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 border border-gray-300 rounded-full px-5 py-2.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
              >
                GitHub
              </a>
              <a
                href={owner.linkedIn.href}
                className="inline-flex items-center gap-2 text-[13px] font-medium text-gray-700 border border-gray-300 rounded-full px-5 py-2.5 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-200"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
