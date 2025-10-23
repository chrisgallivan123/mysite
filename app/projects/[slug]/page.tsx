import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

export default function DocPage({ params }: { params: { slug: string } }) {
  const file = path.join(process.cwd(), 'projects', params.slug + '.mdx')
  const raw = fs.readFileSync(file, 'utf8')
  const { content, data } = matter(raw)
  return (
    <article className="prose prose-invert max-w-3xl">
      <h1 className="text-3xl font-semibold">{data.title}</h1>
      {data.date ? <div className='-mt-2 text-sm text-neutral-400'>{data.date}</div> : null}
      <div className="mt-6">
        <MDXRemote source={content} />
      </div>
    </article>
  )
}
