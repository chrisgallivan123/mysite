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
  const file = path.join(process.cwd(), 'content', 'posts', slug + '.mdx')
  const raw = fs.readFileSync(file, 'utf8')
  const { content, data } = matter(raw)

  return (
    <article className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12">
        {data.coverImage && (
          <div className="relative w-full h-64 md:h-80 mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={data.coverImage}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent leading-tight">
            {data.title}
          </h1>
          
          {data.excerpt && (
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              {data.excerpt}
            </p>
          )}
          
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            {data.date && (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {data.date}
              </span>
            )}
            {data.tags && (
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <div className="flex space-x-1">
                  {data.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-gray-800 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert prose-lg max-w-none">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw]}
                      components={{
            h1: memo(({children}) => <h1 className="text-3xl font-bold mt-12 mb-6 text-white">{children}</h1>),
                        h2: memo(({children}) => {
                          // Extract emoji and text for section images
                          const text = children?.toString() || '';
                          const emoji = text.match(/^(\p{Emoji}+)/u)?.[1] || '';
                          const cleanText = text.replace(/^\p{Emoji}+\s*/u, '');
                          
                          return (
                            <div className="mt-16 mb-8">
                              <h2 className="text-2xl font-bold mb-6 text-white">{children}</h2>
                              {/* Section image based on emoji */}
                              {emoji && (
                                <div className="relative w-full h-48 mb-8 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700">
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                      <div className="text-6xl mb-4">{emoji}</div>
                                      <div className="text-gray-300 text-lg font-medium">{cleanText}</div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }),
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
            div: memo(({className, children, ...props}) => (
              <div className={className} {...props}>
                {children}
              </div>
            )),
            img: memo(({src, alt, ...props}) => {
              const isTeamImage = src === '/team.png';
              return (
                <div className={isTeamImage ? "magazine-image-container" : ""}>
                  <img 
                    src={src} 
                    alt={alt} 
                    {...props}
                    className={isTeamImage 
                      ? "magazine-image" 
                      : "w-[60%] h-auto mx-auto my-8 rounded-lg shadow-lg"
                    }
                    style={{ 
                      transform: isTeamImage ? 'none' : 'translateX(-10%)',
                      filter: 'contrast(1.1) brightness(1.05) saturate(1.1)',
                      imageRendering: 'crisp-edges'
                    }}
                  />
                  {isTeamImage && (
                    <div className="magazine-caption">
                      <em>The Team's Journey</em> — From data symptoms to contextual understanding
                    </div>
                  )}
                </div>
              );
            }),
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {/* Medium-style footer */}
      <div className="mt-16 pt-8 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">CG</span>
            </div>
                        <div>
                          <div className="text-white font-medium">Chris Gallivan</div>
                          <div className="text-gray-400 text-sm">AI-First Value Architect</div>
                        </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-300 text-sm transition-colors">
              Follow
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-sm transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
