import { NextResponse } from 'next/server'
import { owner } from '@/data/portfolio'

export const revalidate = 900

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    next: { revalidate },
  })

  if (!response.ok) {
    throw new Error(`GitHub request failed: ${response.status}`)
  }

  return response.json() as Promise<T>
}

export async function GET() {
  try {
    const [repos, activity] = await Promise.all([
      fetchJson<Array<{ id: number; name: string; html_url: string; description: string | null; language: string | null; stargazers_count: number; forks_count: number; updated_at: string }>>(
        `https://api.github.com/users/${owner.githubUsername}/repos?sort=updated&per_page=12`,
      ),
      fetchJson<Array<{ id: string; type: string; repo: { name: string }; created_at: string }>>(
        `https://api.github.com/users/${owner.githubUsername}/events/public?per_page=12`,
      ),
    ])

    const languages = repos.reduce<Record<string, number>>((acc, repo) => {
      const language = repo.language ?? 'Other'
      acc[language] = (acc[language] ?? 0) + 1
      return acc
    }, {})

    const totalCommits = activity.filter((event) => event.type === 'PushEvent').length

    return NextResponse.json({ repos, activity, languages, totalCommits })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'GitHub API unavailable' }, { status: 503 })
  }
}
