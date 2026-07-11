import { projects } from '../data/portfolio'
import ProjectCard from './ui/ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="relative overflow-hidden px-6 sm:px-12 md:px-20 lg:px-28 py-20 sm:py-24 bg-white/45">
      <div className="absolute right-0 top-12 h-72 w-72 translate-x-1/3 rounded-full bg-blue-200/25 blur-3xl transition-transform duration-200 hover:scale-105" />
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-[13px] font-medium text-blue-500 mb-3">Featured Projects</p>
          <h2 className="text-[1.75rem] sm:text-[2.25rem] leading-[1.15] font-medium text-gray-900 tracking-tight max-w-2xl">
            Systems that connect intelligence, security, automation, and ownership.
          </h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              tech={project.tech}
              features={project.features}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
