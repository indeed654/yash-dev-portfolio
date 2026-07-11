import { aboutFocus, owner } from '../data/portfolio'

export default function About() {
  const details = [
    ['Location', owner.location],
    ['Education', `${owner.education.degree}, ${owner.education.institution}`],
    ['Email', owner.email],
    ['GitHub', owner.github.value],
    ['LinkedIn', owner.linkedIn.value],
  ]

  return (
    <section id="about" className="relative overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-24">
      <div className="absolute left-1/2 top-10 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl transition-transform duration-200 hover:scale-105" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8 transition-all duration-200 translate-y-0 opacity-100">
          <p className="text-[13px] font-medium text-blue-500 mb-3">About</p>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-medium text-gray-900 tracking-tight max-w-2xl">
            Building reliable intelligent systems across software, security, and connected devices.
          </h2>
        </div>

        <div className="rounded-[2rem] border border-white/70 bg-white/55 backdrop-blur-2xl shadow-[0_30px_100px_rgba(17,24,39,0.08)] p-6 sm:p-8 md:p-10 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_35px_120px_rgba(17,24,39,0.12)]">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-[15px] sm:text-[16px] leading-7 text-gray-600">
                Computer Science (IoT) student focused on turning research-grade ideas into practical,
                secure, and production-minded applications.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {aboutFocus.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gray-200/80 bg-white/70 px-3 py-1.5 text-[12px] font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-500"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <dl className="grid gap-3">
              {details.map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-gray-200/70 bg-[#f0f0ee]/70 px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/80"
                >
                  <dt className="text-[11.5px] font-medium text-gray-400">{label}</dt>
                  <dd className="mt-1 text-[13px] font-medium text-gray-800 break-words">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
