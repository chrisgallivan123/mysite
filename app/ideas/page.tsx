import Card from '@/components/Card'
import { allPosts } from '@/lib/content'

export default function IdeasIndex() {
  // Prioritize AI-tagged content, then by date
  const posts = allPosts().sort((a, b) => {
    const aHasAI = a.tags?.includes('AI') ? 1 : 0
    const bHasAI = b.tags?.includes('AI') ? 1 : 0
    if (bHasAI !== aHasAI) return bHasAI - aHasAI
    // If both have AI tag or both don't, sort by date (newest first)
    return (b.date || '').localeCompare(a.date || '')
  })
  
  return (
    <div>
      <h1 className="text-3xl font-semibold">Ideas</h1>
      <p className="mt-2 text-neutral-300">AI-first thinking meets flow metrics. How AI is changing how we understand and improve delivery systems.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(p => (
          <Card key={p.slug} title={p.title} href={`/ideas/${p.slug}`} desc={p.excerpt} meta={p.date} image={p.coverImage} />
        ))}
      </div>
    </div>
  )
}
