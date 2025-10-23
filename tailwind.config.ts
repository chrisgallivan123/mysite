import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        accent: { DEFAULT: '#D21E2B' }
      }
    }
  },
  plugins: []
} satisfies Config
