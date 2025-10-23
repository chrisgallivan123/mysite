import Link from 'next/link'
import Image from 'next/image'

export default function Card({ title, href, desc, meta, image }: { title: string, href: string, desc?: string, meta?: string, image?: string }) {
  return (
    <Link href={href} className="card block">
      {image && (
        <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
          <Image 
            src={image} 
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="text-sm text-neutral-400">{meta}</div>
      <h3 className="mt-1 text-xl font-semibold">{title}</h3>
      {desc ? <p className="mt-2 text-neutral-300">{desc}</p> : null}
    </Link>
  )
}
