export default function NotFound() {
  return (
    <div className="container py-24 text-center">
      <h2 className="text-2xl font-semibold mb-4">404 - Page Not Found</h2>
      <p className="text-neutral-400 mb-6">The page you're looking for doesn't exist.</p>
      <a href="/" className="underline underline-offset-4 hover:text-white transition-colors">
        Go back home
      </a>
    </div>
  )
}


