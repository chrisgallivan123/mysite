import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from 'next/image'
import { memo } from 'react'

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const file = path.join(process.cwd(), 'content', 'frameworks', slug + '.mdx')
  const raw = fs.readFileSync(file, 'utf8')
  const { content, data } = matter(raw)
  
  // Split content by horizontal rules to create slide sections
  const sections = content.split(/\n---\n/).filter(section => section.trim())
  
  return (
    <article className="w-full">
      {data.coverImage && (
        <div className="relative w-full h-64 md:h-80 mb-16 rounded-2xl overflow-hidden shadow-2xl">
          <Image src={data.coverImage} alt={data.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white leading-tight">{data.title}</h1>
          {data.date ? <div className='text-base text-neutral-400'>{data.date}</div> : null}
        </div>
        <div className="space-y-8 md:space-y-10">
          {sections.map((section, index) => (
            <section key={index} className="py-6 md:py-8">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: memo(({children}) => (
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">{children}</h1>
                  )),
                  h2: memo(({children}) => (
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">{children}</h2>
                  )),
                  h3: memo(({children}) => (
                    <h3 className="text-2xl md:text-3xl font-semibold mt-6 mb-3 text-white">{children}</h3>
                  )),
                  p: memo(({children}) => (
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-4 max-w-4xl">{children}</p>
                  )),
                  ul: memo(({children}) => (
                    <ul className="space-y-3 my-6 text-lg text-gray-300 max-w-4xl">{children}</ul>
                  )),
                  ol: memo(({children}) => (
                    <ol className="space-y-3 my-6 text-lg text-gray-300 max-w-4xl list-decimal list-inside">{children}</ol>
                  )),
                  li: memo(({children}) => (
                    <li className="leading-relaxed">{children}</li>
                  )),
                  strong: memo(({children}) => (
                    <strong className="text-white font-bold text-xl">{children}</strong>
                  )),
                  em: memo(({children}) => (
                    <em className="text-gray-200 italic">{children}</em>
                  )),
                  table: memo(({children}) => (
                    <div className="my-8 max-w-4xl overflow-x-auto">
                      <table className="w-full border-collapse text-lg">{children}</table>
                    </div>
                  )),
                  thead: memo(({children}) => (
                    <thead className="border-b-2 border-gray-600">{children}</thead>
                  )),
                  th: memo(({children}) => (
                    <th className="text-left text-white font-bold px-4 py-3">{children}</th>
                  )),
                  td: memo(({children}) => (
                    <td className="text-gray-300 px-4 py-3 border-b border-gray-700/50">{children}</td>
                  )),
                }}
              >
                {section.trim()}
              </ReactMarkdown>
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
