import Card from '@/components/Card'
import { allPosts } from '@/lib/content'

export default function IdeasIndex() {
  const posts = allPosts()
  return (
    <div>
      <h1 className="text-3xl font-semibold">Ideas</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(p => (
          <Card key={p.slug} title={p.title} href={`/ideas/${p.slug}`} desc={p.excerpt} meta={p.date} image={p.coverImage} />
        ))}
      </div>
    </div>
  )
}
