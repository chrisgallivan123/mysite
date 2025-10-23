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
    optimizePackageImports: ['react-markdown', 'remark-gfm'],
    // Reduce bundle analysis overhead
    bundlePagesRouterDependencies: true
  },
  // Development optimizations
  ...(process.env.NODE_ENV === 'development' && {
    webpack: (config, { dev, isServer }) => {
      if (dev && !isServer) {
        // Faster source maps in development
        config.devtool = 'eval-cheap-module-source-map'
        
        // Reduce bundle size by excluding unnecessary modules
        config.resolve.alias = {
          ...config.resolve.alias,
          'react-markdown': 'react-markdown/dist/react-markdown.min.js'
        }
      }
      return config
    }
  })
}

const withMDX = createMDX({
  extension: /\.mdx?$/
})

export default withMDX({
  ...nextConfig,
  pageExtensions: ['ts','tsx','md','mdx']
})
