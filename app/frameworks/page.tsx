import Card from '@/components/Card'
import { allFrameworks } from '@/lib/content'

export default function FrameworksIndex() {
  const items = allFrameworks()
  return (
    <div>
      <h1 className="text-3xl font-semibold">Frameworks</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <Card key={p.slug} title={p.title} href={`/frameworks/${p.slug}`} desc={p.excerpt} image={p.coverImage} />
        ))}
      </div>
    </div>
  )
}
