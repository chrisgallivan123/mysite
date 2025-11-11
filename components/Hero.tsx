export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
        AI-First Delivery Intelligence
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-neutral-300">
        Years of delivery expertise reimagined through AI. Building intelligent systems that understand delivery patterns, surface hidden bottlenecks, and transform metrics into genuine insight — at scale.
      </p>
      <div className="mt-8 flex gap-4">
        <a className="rounded-md bg-accent px-5 py-3 font-medium" href="/ideas/context-is-the-gold">Read an idea</a>
        <a className="rounded-md border border-neutral-700 px-5 py-3 font-medium" href="/speaking">Book a session</a>
      </div>
    </section>
  )
}
