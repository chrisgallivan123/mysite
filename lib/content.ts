import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

export type Doc = {
  slug: string
  title: string
  date?: string
  excerpt?: string
  tags?: string[]
  coverImage?: string
  kind: 'post' | 'case' | 'framework' | 'project'
}

const base = process.cwd()

function load(dir: string) {
  const full = path.join(base, 'content', dir)
  if (!fs.existsSync(full)) return []
  return fs.readdirSync(full).filter(f => f.endsWith('.mdx')).map(f => {
    const raw = fs.readFileSync(path.join(full, f), 'utf8')
    const { data } = matter(raw)
    const slug = f.replace(/\.mdx$/, '')
    return { slug, ...data }
  })
}

export function allPosts(): Doc[] {
  return load('posts').map((d: any) => ({ kind: 'post', ...d })) as Doc[]
}

export function allCases(): Doc[] {
  return load('case-studies').map((d: any) => ({ kind: 'case', ...d })) as Doc[]
}

export function allFrameworks(): Doc[] {
  return load('frameworks').map((d: any) => ({ kind: 'framework', ...d })) as Doc[]
}

export function allProjects(): Doc[] {
  return load('projects').map((d: any) => ({ kind: 'project', ...d })) as Doc[]
}
