import type { Metadata } from 'next'
import { owner } from '@/data/portfolio'
import './globals.css'

const siteUrl = 'https://yash-sharma.dev'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${owner.name} | Full-Stack AI Engineer`,
    template: `%s | ${owner.name}`,
  },
  description:
    'Production engineering portfolio for a full-stack AI engineer building reliable AI, cybersecurity, IoT, and cloud-native systems.',
  keywords: [
    'Full Stack Engineer',
    'AI Engineer',
    'Next.js Developer',
    'Cybersecurity Developer',
    'IoT Engineer',
    owner.name,
  ],
  authors: [{ name: owner.name, url: siteUrl }],
  creator: owner.name,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: `${owner.name} | Full-Stack AI Engineer`,
    description: 'Recruiter-focused engineering portfolio with architecture, metrics, resume center, and GitHub activity.',
    siteName: `${owner.name} Portfolio`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${owner.name} | Full-Stack AI Engineer`,
    description: 'Production-ready software, AI systems, cybersecurity, and IoT engineering case studies.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>{children}</body>
    </html>
  )
}
