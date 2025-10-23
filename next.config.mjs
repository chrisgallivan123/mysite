import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    turbo: {
      rules: {
        '*.mdx': {
          loaders: ['@next/mdx-loader'],
          as: '*.js'
        }
      }
    },
    // Enable faster builds
    optimizePackageImports: ['react-markdown', 'remark-gfm']
  }
}

const withMDX = createMDX({
  extension: /\.mdx?$/
})

export default withMDX({
  ...nextConfig,
  pageExtensions: ['ts','tsx','md','mdx']
})
