import Hero from '@/components/Hero'
import Card from '@/components/Card'
import { allPosts, allFrameworks } from '@/lib/content'

export default function Page() {
  // Prioritize AI-tagged content, then by date
  const posts = allPosts()
    .sort((a, b) => {
      const aHasAI = a.tags?.includes('AI') ? 1 : 0
      const bHasAI = b.tags?.includes('AI') ? 1 : 0
      if (bHasAI !== aHasAI) return bHasAI - aHasAI
      // If both have AI tag or both don't, sort by date (newest first)
      return (b.date || '').localeCompare(a.date || '')
    })
    .slice(0,3)
  
  const frames = allFrameworks().slice(0,2)

  return (
    <div>
      <Hero />
              <section className="mt-10">
                <h2 className="text-2xl font-semibold">Latest Ideas</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {posts.map(p => (
                    <Card key={p.slug} title={p.title} href={`/ideas/${p.slug}`} desc={p.excerpt} meta={p.date} />
                  ))}
                </div>
              </section>

              <section className="mt-12">
                <h2 className="text-2xl font-semibold">Approaches</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {frames.map(p => (
                    <Card key={p.slug} title={p.title} href={`/frameworks/${p.slug}`} desc={p.excerpt} />
                  ))}
                </div>
              </section>
    </div>
  )
}
