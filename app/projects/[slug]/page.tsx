import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import Image from 'next/image'
import { memo } from 'react'

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
      <div className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-3xl font-semibold">{data.title}</h1>
        {data.date ? <div className='-mt-2 text-sm text-neutral-400'>{data.date}</div> : null}
        <div className="mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              h1: memo(({children}) => <h1 className="text-3xl font-bold mt-12 mb-6 text-white">{children}</h1>),
              h2: memo(({children}) => <h2 className="text-2xl font-bold mt-16 mb-6 text-white">{children}</h2>),
              h3: memo(({children}) => <h3 className="text-xl font-semibold mt-8 mb-3 text-white">{children}</h3>),
              p: memo(({children}) => <p className="text-gray-300 leading-relaxed mb-6">{children}</p>),
              blockquote: memo(({children}) => (
                <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-8 bg-gray-900/50 rounded-r-lg">
                  <div className="text-gray-200 italic text-lg">{children}</div>
                </blockquote>
              )),
              code: memo(({children}) => (
                <code className="bg-gray-800 text-blue-300 px-2 py-1 rounded text-sm font-mono">
                  {children}
                </code>
              )),
              pre: memo(({children}) => (
                <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto my-8 border border-gray-700">
                  {children}
                </pre>
              )),
              ul: memo(({children}) => <ul className="space-y-2 my-6">{children}</ul>),
              ol: memo(({children}) => <ol className="space-y-2 my-6">{children}</ol>),
              li: memo(({children}) => <li className="text-gray-300">{children}</li>),
              strong: memo(({children}) => <strong className="text-white font-semibold">{children}</strong>),
              em: memo(({children}) => <em className="text-gray-200 italic">{children}</em>),
              hr: memo(() => <hr className="my-12 border-gray-700" />),
              img: memo(({src, alt, ...props}) => (
                <img src={src} alt={alt} {...props} className="w-[60%] h-auto mx-auto my-8 rounded-lg shadow-lg" />
              )),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  )
}
