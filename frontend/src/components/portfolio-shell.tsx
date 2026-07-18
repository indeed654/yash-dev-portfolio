'use client'

import dynamic from 'next/dynamic'
import { type ReactNode, useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import {
  ArrowDownToLine,
  ArrowRight,
  Award,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Star,
  X,
} from 'lucide-react'
import {
  achievements,
  blogPosts,
  certifications,
  educationTimeline,
  engineeringMetrics,
  experiences,
  faqs,
  navLinks,
  owner,
  projectCaseStudies,
  skillCategories,
  stackRibbon,
  systemHighlights,
} from '@/data/portfolio'
import { cn } from '@/lib/utils'

const HeroScene = dynamic(() => import('@/components/scene/hero-scene'), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.12),transparent_48%)]" />,
})

interface GithubRepo {
  id: number
  name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
}

interface GithubActivity {
  id: string
  type: string
  repo: { name: string }
  created_at: string
}

interface GithubData {
  repos: GithubRepo[]
  activity: GithubActivity[]
  languages: Record<string, number>
  totalCommits: number
}

const sectionMotion = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
}

export function PortfolioShell() {
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.2 })
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    const lenis = new Lenis({ duration: 1.05, lerp: 0.09 })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [reducedMotion])

  return (
    <main className="relative overflow-hidden">
      <motion.div aria-hidden className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-cyan-500 via-violet-500 to-lime-500" style={{ scaleX: progress, width: '100%' }} />
      <CursorAura />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Metrics />
      <SystemNarrative />
      <Projects />
      <GithubDashboard />
      <ResumeCenter />
      <ExperienceTimeline />
      <Skills />
      <Certifications />
      <Testimonials />
      <BlogAndFaq />
      <Contact />
      <StructuredData />
    </main>
  )
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <header className="fixed inset-x-0 top-4 z-40 px-4">
      <nav aria-label="Primary navigation" className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/70 bg-white/68 px-4 py-3 shadow-glass backdrop-blur-2xl">
        <a href="#top" className="flex items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-sm font-semibold text-white">YS</span>
          <span className="hidden text-sm font-semibold text-ink sm:block">{owner.name}</span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-600">
              {link.label}
            </a>
          ))}
        </div>
        <a href={`mailto:${owner.email}`} className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:inline-flex">
          Hire Yash
        </a>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-ink lg:hidden" aria-label="Toggle navigation menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>
      {menuOpen ? (
        <div className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-3xl border border-white/70 bg-white/90 p-3 shadow-glass backdrop-blur-2xl lg:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100">
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="relative min-h-screen overflow-hidden px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10">
        <HeroScene />
      </div>
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.08 } } }} className="max-w-4xl">
          <motion.p variants={sectionMotion} className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-white/70 px-4 py-2 text-sm font-semibold text-cyan-800 shadow-glass backdrop-blur">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-orange-400" /></span> Available for ambitious engineering teams
          </motion.p>
          <motion.h1 variants={sectionMotion} className="text-hero font-semibold leading-[0.96] tracking-normal text-ink">
            Building the next<br />layer of <span className="bg-gradient-to-r from-orange-400 via-violet-400 to-cyan-300 bg-clip-text text-transparent">intelligent systems.</span>
          </motion.h1>
          <motion.p variants={sectionMotion} className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            AI engineer and full-stack developer turning complex workflows into precise, fast, human-centered products.
          </motion.p>
          <motion.div variants={sectionMotion} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <MagneticCta href="#projects" variant="primary">
              Explore selected work <ArrowRight size={18} />
            </MagneticCta>
            <MagneticCta href="#resume" variant="secondary">
              Download résumé <ArrowDownToLine size={18} />
            </MagneticCta>
          </motion.div>
          <motion.div variants={sectionMotion} className="mt-8 flex flex-wrap gap-2">
            {stackRibbon.slice(0, 8).map((item) => (
              <span key={item} className="rounded-full border border-white/70 bg-white/60 px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
        <motion.aside initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }} className="rounded-[2rem] border border-white/70 bg-white/62 p-5 shadow-glass backdrop-blur-2xl">
          <div className="rounded-[1.5rem] border border-slate-900/10 bg-ink p-5 text-white shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-semibold text-cyan-200">SYSTEM / 01</span>
              <span className="rounded-full bg-orange-400/15 px-3 py-1 text-xs font-semibold text-orange-200">Open to work</span>
            </div>
            <div className="grid gap-4">
              {systemHighlights.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/7 p-4">
                    <Icon className="mb-3 text-cyan-300" size={20} />
                    <h2 className="text-sm font-semibold">{item.label}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{item.value}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  )
}

function MagneticCta({ href, children, variant }: { href: string; children: ReactNode; variant: 'primary' | 'secondary' }) {
  return (
    <motion.a href={href} whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }} className={cn('inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold shadow-glass transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2', variant === 'primary' ? 'bg-ink text-white focus-visible:outline-ink' : 'border border-slate-200 bg-white/70 text-ink backdrop-blur focus-visible:outline-cyan-600')}>
      {children}
    </motion.a>
  )
}

function Metrics() {
  return (
    <Section id="metrics" eyebrow="Engineering Metrics" title="Signals recruiters can scan in seconds." copy="A compact view of scope, consistency, and breadth across production-style work.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {engineeringMetrics.map((metric) => (
          <motion.div key={metric.label} variants={sectionMotion} className="rounded-3xl border border-white/70 bg-white/64 p-6 shadow-glass backdrop-blur-xl">
            <p className="text-4xl font-semibold text-ink">{metric.value}</p>
            <h3 className="mt-3 font-semibold text-slate-900">{metric.label}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{metric.detail}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function SystemNarrative() {
  return (
    <Section id="about" eyebrow="Positioning" title="I connect product UX, backend reliability, AI workflows, and deployment discipline." copy="The portfolio is written for engineering evaluation: what was built, why it was built that way, and what tradeoffs were made.">
      <div className="grid gap-4 lg:grid-cols-4">
        {systemHighlights.map((item) => {
          const Icon = item.icon
          return (
            <motion.div key={item.label} variants={sectionMotion} className="rounded-3xl border border-white/70 bg-white/58 p-6 shadow-glass backdrop-blur-xl">
              <Icon className="text-violet-600" />
              <h3 className="mt-5 font-semibold text-ink">{item.label}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.value}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Case Studies" title="Projects explained like engineering ownership, not gallery cards." copy="Each build is structured around the real questions a hiring team asks: problem framing, architecture, tradeoffs, performance, and outcomes.">
      <div className="grid gap-6">
        {projectCaseStudies.map((project, index) => (
          <motion.article key={project.slug} variants={sectionMotion} className="rounded-[2rem] border border-white/70 bg-white/68 p-5 shadow-glass backdrop-blur-2xl lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <span className="text-sm font-semibold text-cyan-700">0{index + 1} / Featured system</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-normal text-ink sm:text-3xl">{project.title}</h3>
                <p className="mt-4 leading-7 text-slate-700">{project.summary}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">{tech}</span>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={project.demo} className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white">Demo <ExternalLink size={15} /></a>
                  <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink">GitHub <Github size={15} /></a>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <ProjectBlock title="Problem" items={[project.problem]} />
                <ProjectBlock title="Solution" items={[project.solution]} />
                <ProjectBlock title="Architecture" items={project.architecture} />
                <ProjectBlock title="Engineering Decisions" items={project.decisions} />
                <ProjectBlock title="Challenges" items={project.challenges} />
                <ProjectBlock title="Performance Optimizations" items={project.performance} />
                <ProjectBlock title="Results" items={project.results} wide />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  )
}

function ProjectBlock({ title, items, wide }: { title: string; items: string[]; wide?: boolean }) {
  return (
    <div className={cn('rounded-3xl border border-slate-200/70 bg-white/72 p-5', wide && 'md:col-span-2')}>
      <h4 className="text-sm font-semibold text-ink">{title}</h4>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-slate-600">
            <CheckCircle2 className="mt-1 shrink-0 text-cyan-600" size={15} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function GithubDashboard() {
  const [data, setData] = useState<GithubData | null>(null)
  const [status, setStatus] = useState('Loading live GitHub data')

  useEffect(() => {
    fetch('/api/github', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API unavailable')
        return res.json()
      })
      .then((payload: GithubData) => {
        setData(payload)
        setStatus('Live GitHub API data')
      })
      .catch(() => setStatus('Live API unavailable. Showing profile links and cached-ready layout.'))
  }, [])

  const topLanguages = useMemo(() => Object.entries(data?.languages ?? {}).sort((a, b) => b[1] - a[1]).slice(0, 5), [data])

  return (
    <Section id="github" eyebrow="GitHub Dashboard" title="Recent engineering activity, repositories, languages, and contribution rhythm." copy={status}>
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={sectionMotion} className="rounded-[2rem] border border-white/70 bg-ink p-5 text-white shadow-glow">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Repositories</h3>
            <a href={owner.github.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">Profile <ExternalLink size={14} /></a>
          </div>
          <div className="mt-5 grid gap-3">
            {(data?.repos ?? []).slice(0, 5).map((repo) => (
              <a key={repo.id} href={repo.html_url} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/7 p-4 transition hover:bg-white/12">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="font-semibold">{repo.name}</h4>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-300">{repo.description ?? 'Repository maintained on GitHub.'}</p>
                  </div>
                  <ChevronRight className="shrink-0 text-cyan-300" size={18} />
                </div>
                <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-300">
                  <span>{repo.language ?? 'Multi-language'}</span>
                  <span>{repo.stargazers_count} stars</span>
                  <span>{repo.forks_count} forks</span>
                </div>
              </a>
            ))}
            {!data?.repos?.length ? <p className="rounded-2xl border border-white/10 bg-white/7 p-4 text-sm text-slate-300">Connect to the internet or add a GitHub token later to populate repositories, commits, languages, contribution heatmap, and activity.</p> : null}
          </div>
        </motion.div>
        <motion.div variants={sectionMotion} className="grid gap-5">
          <div className="rounded-[2rem] border border-white/70 bg-white/68 p-5 shadow-glass backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Languages</h3>
            <div className="mt-4 grid gap-3">
              {topLanguages.length ? topLanguages.map(([language, count]) => (
                <div key={language}>
                  <div className="mb-1 flex justify-between text-sm font-medium text-slate-700"><span>{language}</span><span>{count}</span></div>
                  <div className="h-2 rounded-full bg-slate-200"><div className="h-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500" style={{ width: `${Math.min(100, count * 18)}%` }} /></div>
                </div>
              )) : <p className="text-sm leading-6 text-slate-600">Language distribution appears after the GitHub API responds.</p>}
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/68 p-5 shadow-glass backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Contribution Heatmap</h3>
            <div className="mt-4 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-1" aria-label="Decorative contribution heatmap placeholder">
              {Array.from({ length: 98 }).map((_, index) => (
                <span key={index} className={cn('h-3 rounded-[4px]', index % 7 === 0 ? 'bg-cyan-500' : index % 5 === 0 ? 'bg-lime-400' : index % 3 === 0 ? 'bg-violet-400' : 'bg-slate-200')} />
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">Commits tracked: {data?.totalCommits ?? 'API pending'}</p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/68 p-5 shadow-glass backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Recent Activity</h3>
            <div className="mt-3 grid gap-2">
              {(data?.activity ?? []).slice(0, 4).map((event) => (
                <p key={event.id} className="text-sm leading-6 text-slate-600">{event.type.replace('Event', '')} in {event.repo.name}</p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function ResumeCenter() {
  return (
    <Section id="resume" eyebrow="Resume Center" title="A recruiter-ready view of proof, documents, education, and achievements." copy="Download concise ATS and recruiter versions, preview the resume, and scan credentials without leaving the portfolio.">
      <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
        <motion.div variants={sectionMotion} className="rounded-[2rem] border border-white/70 bg-white/70 p-4 shadow-glass backdrop-blur-xl">
          <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100">
            <iframe title="Resume preview" src={owner.resume.preview} className="h-full w-full" loading="lazy" />
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={owner.resume.ats} download className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white"><ArrowDownToLine size={16} /> ATS resume</a>
            <a href={owner.resume.recruiter} download className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink"><ArrowDownToLine size={16} /> Recruiter resume</a>
          </div>
        </motion.div>
        <motion.div variants={sectionMotion} className="grid gap-5">
          <TimelineList title="Education Timeline" items={educationTimeline.map((item) => ({ title: item.title, meta: `${item.org} · ${item.period}`, detail: item.detail, Icon: item.icon }))} />
          <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-glass backdrop-blur-xl">
            <h3 className="font-semibold text-ink">Achievements</h3>
            <ul className="mt-4 grid gap-3">
              {achievements.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600"><Star className="mt-1 shrink-0 text-lime-600" size={16} />{item}</li>)}
            </ul>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function ExperienceTimeline() {
  return (
    <Section id="experience" eyebrow="Experience" title="Internship work explained through shipped responsibilities." copy="Practical exposure across backend services, AI pipelines, database work, and deployment workflows.">
      <TimelineList title="Experience Timeline" items={experiences.map((item) => ({ title: item.role, meta: `${item.company} · ${item.period} · ${item.type}`, detail: item.highlights.join(' '), Icon: BriefcaseBusiness }))} />
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Grouped by the domains hiring teams care about." copy="A full-stack profile with clear depth areas instead of a wall of disconnected badges.">
      <div className="grid gap-5 md:grid-cols-2">
        {skillCategories.map((category) => {
          const Icon = category.icon
          return (
            <motion.div key={category.title} variants={sectionMotion} className="rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-glass backdrop-blur-xl">
              <Icon className="text-violet-600" />
              <h3 className="mt-5 text-xl font-semibold text-ink">{category.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{category.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.skills.map((skill) => <span key={skill} className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">{skill}</span>)}
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Credential gallery with practical learning themes." copy="Certifications are framed by what they strengthen: GenAI product thinking, security analysis, analytics, and applied productivity.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => {
          const Icon = cert.icon
          return (
            <motion.div key={cert.title} variants={sectionMotion} className="rounded-3xl border border-white/70 bg-white/68 p-6 shadow-glass backdrop-blur-xl">
              <Icon className="text-cyan-700" />
              <h3 className="mt-5 font-semibold text-ink">{cert.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{cert.issuer}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{cert.focus}</p>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

function Testimonials() {
  return (
    <Section id="testimonials" eyebrow="Testimonials" title="Placeholder for manager, mentor, and teammate proof." copy="Ready for quotes from internship mentors, project collaborators, faculty, or open-source maintainers.">
      <div className="grid gap-4 md:grid-cols-3">
        {['Engineering mentor', 'Project collaborator', 'Recruiter note'].map((label) => (
          <motion.div key={label} variants={sectionMotion} className="rounded-3xl border border-dashed border-slate-300 bg-white/54 p-6 shadow-glass backdrop-blur-xl">
            <Award className="text-violet-600" />
            <h3 className="mt-5 font-semibold text-ink">{label}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Add a concise quote here that validates ownership, reliability, learning speed, or production engineering judgment.</p>
          </motion.div>
        ))}
      </div>
    </Section>
  )
}

function BlogAndFaq() {
  return (
    <Section id="blog" eyebrow="Writing + FAQ" title="Clear thinking is part of the engineering signal." copy="Blog slots and FAQ content help recruiters quickly understand fit, focus, and communication style.">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="grid gap-3">
          {blogPosts.map((post) => (
            <motion.article key={post.title} variants={sectionMotion} className="rounded-3xl border border-white/70 bg-white/68 p-5 shadow-glass backdrop-blur-xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">{post.tag} · {post.readTime}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{post.title}</h3>
            </motion.article>
          ))}
        </div>
        <div className="grid gap-3">
          {faqs.map((faq) => (
            <motion.details key={faq.question} variants={sectionMotion} className="rounded-3xl border border-white/70 bg-white/68 p-5 shadow-glass backdrop-blur-xl">
              <summary className="cursor-pointer font-semibold text-ink">{faq.question}</summary>
              <p className="mt-3 text-sm leading-6 text-slate-600">{faq.answer}</p>
            </motion.details>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Contact() {
  return (
    <section id="contact" className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] bg-ink p-6 text-white shadow-glow sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold text-cyan-300">Contact</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-normal sm:text-6xl">Need someone who can build, explain, and ship?</h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-300">I am open to full-stack, AI, backend, cybersecurity, and IoT roles where production readiness matters.</p>
          </div>
          <div className="grid gap-3">
            <ContactLink icon={<Mail size={18} />} label={owner.email} href={`mailto:${owner.email}`} />
            <ContactLink icon={<Phone size={18} />} label={owner.phone} href={`tel:${owner.phone}`} />
            <ContactLink icon={<Github size={18} />} label={owner.github.value} href={owner.github.href} />
            <ContactLink icon={<MapPin size={18} />} label={owner.location} href="#top" />
          </div>
        </div>
      </div>
      <footer className="mx-auto flex max-w-7xl flex-col gap-3 px-2 py-8 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>{owner.name} · Full-Stack AI Engineer</span>
        <span>Built with Next.js 15, TypeScript, Tailwind, Framer Motion, R3F, and Lenis.</span>
      </footer>
    </section>
  )
}

function ContactLink({ icon, label, href }: { icon: ReactNode; label: string; href: string }) {
  return <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/7 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/12">{icon}{label}</a>
}

function TimelineList({ title, items }: { title: string; items: { title: string; meta: string; detail: string; Icon: typeof BriefcaseBusiness }[] }) {
  return (
    <motion.div variants={sectionMotion} className="rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-glass backdrop-blur-xl">
      <h3 className="font-semibold text-ink">{title}</h3>
      <div className="mt-6 grid gap-5">
        {items.map((item) => {
          const Icon = item.Icon
          return (
            <div key={`${item.title}-${item.meta}`} className="grid grid-cols-[auto_1fr] gap-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white"><Icon size={18} /></span>
              <div>
                <h4 className="font-semibold text-ink">{item.title}</h4>
                <p className="mt-1 text-sm font-medium text-cyan-700">{item.meta}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function Section({ id, eyebrow, title, copy, children }: { id: string; eyebrow: string; title: string; copy: string; children: ReactNode }) {
  return (
    <motion.section id={id} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-120px' }} transition={{ duration: 0.55, ease: 'easeOut' }} className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div variants={sectionMotion} className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold text-cyan-700">{eyebrow}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal text-ink sm:text-5xl">{title}</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">{copy}</p>
        </motion.div>
        {children}
      </div>
    </motion.section>
  )
}

function CursorAura() {
  const reduced = useReducedMotion()
  const [position, setPosition] = useState({ x: -200, y: -200 })
  useEffect(() => {
    if (reduced) return
    const onMove = (event: PointerEvent) => setPosition({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced])
  if (reduced) return null
  return <div aria-hidden className="pointer-events-none fixed z-30 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20 bg-cyan-300/10 blur-xl transition-transform duration-75" style={{ left: position.x, top: position.y }} />
}

function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: owner.name,
    jobTitle: owner.roles[0],
    email: owner.email,
    telephone: owner.phone,
    address: owner.location,
    url: 'https://yash-sharma.dev',
    sameAs: [owner.github.href, owner.linkedIn.href],
    knowsAbout: stackRibbon,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
}
