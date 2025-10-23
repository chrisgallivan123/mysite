import Card from '@/components/Card'
import { allCases } from '@/lib/content'

export default function CasesIndex() {
  const items = allCases()
  return (
    <div>
      <h1 className="text-3xl font-semibold">Case Studies</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <Card key={p.slug} title={p.title} href={`/case-studies/${p.slug}`} desc={p.excerpt} />
        ))}
      </div>
    </div>
  )
}
