import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = path.join(process.cwd(), 'content', 'projects', slug + '.mdx')
  const raw = fs.readFileSync(file, 'utf8')
  const { content, data } = matter(raw)
  
  return (
    <article className="max-w-4xl mx-auto">
      {data.coverImage && (
        <div className="relative w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden shadow-2xl">
          <Image src={data.coverImage} alt={data.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      <div className="prose prose-invert max-w-none">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
        {data.date ? <div className='-mt-2 text-sm text-neutral-400'>{data.date}</div> : null}
        <div className="mt-6">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
