export default function Speaking() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Speaking</h1>
      <p className="mt-4 text-neutral-300">
        Topics: Flow Metrics and the Why, Context Annotation for 10× Insight, Agentic Pipelines for Delivery.
      </p>
      <div className="mt-8 grid gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold">Context Is the Gold</h3>
          <p className="text-neutral-300 mt-2">How a handful of tags can out-signal terabytes of delivery data.</p>
          <a className="inline-block mt-4 underline underline-offset-4" href="https://outlook.office.com/book/ChrisGallivanAvailability@planview.com/?ismsaljsauthenabled">Book a session</a>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold">Are We Structured for Flow?</h3>
          <p className="text-neutral-300 mt-2">Using graph theory and community detection algorithms to make your organizational structure visible.</p>
          <a className="inline-block mt-4 underline underline-offset-4" href="https://outlook.office.com/book/ChrisGallivanAvailability@planview.com/?ismsaljsauthenabled">Book a session</a>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold">Making Flow Concepts Real</h3>
          <p className="text-neutral-300 mt-2">Understanding bottlenecks, capacity, and Little's Law isn't just academic theory—it's the key to unlocking system performance. Today, we'll build intuition for these concepts and explore what AI actually changes in your development workflow.</p>
          <a className="inline-block mt-4 underline underline-offset-4" href="https://outlook.office.com/book/ChrisGallivanAvailability@planview.com/?ismsaljsauthenabled">Book a session</a>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold">Investing in Quality - One Metric to Rule them All</h3>
          <p className="text-neutral-300 mt-2">How all the work you do competes for the same capacity. You only have so many chips. Choose your chips wisely.</p>
          <a className="inline-block mt-4 underline underline-offset-4" href="https://outlook.office.com/book/ChrisGallivanAvailability@planview.com/?ismsaljsauthenabled">Book a session</a>
        </div>
      </div>
    </div>
  )
}
