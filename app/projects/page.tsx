import Card from '@/components/Card'
import { allProjects } from '@/lib/content'

export default function ProjectsIndex() {
  const items = allProjects()
  return (
    <div>
      <h1 className="text-3xl font-semibold">Projects & Demos</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <Card key={p.slug} title={p.title} href={`/projects/${p.slug}`} desc={p.excerpt} />
        ))}
      </div>
    </div>
  )
}
