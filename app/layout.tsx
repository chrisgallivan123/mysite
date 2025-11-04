import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chris Gallivan — AI-First Value Architect',
  description: 'Building agentic systems that understand flow. Essays, frameworks, and projects on AI-driven delivery intelligence.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container py-8 flex items-center justify-between">
          <a href="/" className="font-semibold tracking-tight">Chris Gallivan — AI-First Value Architect</a>
                  <nav className="flex gap-6 text-sm text-neutral-300">
                    <a href="/ideas">Ideas</a>
                    <a href="/frameworks">Approaches</a>
                    <a href="/projects">Projects</a>
                    <a href="/speaking">Speaking</a>
                  </nav>
        </header>
        <main className="container pb-24">{children}</main>
        <footer className="container py-10 text-sm text-neutral-400 border-t border-neutral-900">
          © {new Date().getFullYear()} Chris Gallivan · <a href="mailto:chris@chrisgallivan.com">Contact</a>
        </footer>
      </body>
    </html>
  )
}
