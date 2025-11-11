import Card from '@/components/Card'
import { allProjects } from '@/lib/content'

export default function ProjectsIndex() {
  // Prioritize Flow Type Corrector and Viz Turbo (AI Dashboard)
  const items = allProjects().sort((a, b) => {
    const priorityProjects = ['flow-type-corrector', 'viz-turbo']
    const aIsPriority = priorityProjects.includes(a.slug) ? 1 : 0
    const bIsPriority = priorityProjects.includes(b.slug) ? 1 : 0
    if (bIsPriority !== aIsPriority) return bIsPriority - aIsPriority
    // Keep original order for non-priority projects
    return 0
  })
  
  return (
    <div>
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="mt-2 text-neutral-300">AI-powered tools and intelligent systems. From LLM-based validation to statistical rigor at scale.</p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(p => (
          <Card key={p.slug} title={p.title} href={`/projects/${p.slug}`} desc={p.excerpt} image={p.coverImage} />
        ))}
      </div>
    </div>
  )
}
