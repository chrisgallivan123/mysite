import Card from '@/components/Card'
import { allFrameworks } from '@/lib/content'

export default function FrameworksIndex() {
  // Prioritize AI-tagged content, then by date
  const items = allFrameworks().sort((a, b) => {
    const aHasAI = a.tags?.includes('AI') ? 1 : 0
    const bHasAI = b.tags?.includes('AI') ? 1 : 0
    if (bHasAI !== aHasAI) return bHasAI - aHasAI
    // If both have AI tag or both don't, sort by date (newest first)
    return (b.date || '').localeCompare(a.date || '')
  })
  
  return (
    <div>
      <h1 className="text-3xl font-semibold">Approaches</h1>
      <p className="mt-2 text-neutral-300">Practical frameworks for AI-enabled improvement. Real methods, tested at scale.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <Card key={p.slug} title={p.title} href={`/frameworks/${p.slug}`} desc={p.excerpt} image={p.coverImage} />
        ))}
      </div>
    </div>
  )
}
