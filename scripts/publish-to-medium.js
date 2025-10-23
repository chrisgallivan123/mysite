#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Medium Publishing Script
 * Converts MDX blog posts to Medium-compatible format
 */

const postsDir = path.join(__dirname, '..', 'content', 'posts');
const outputDir = path.join(__dirname, '..', 'medium-exports');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function convertMdxToMedium(mdxFile) {
  const content = fs.readFileSync(mdxFile, 'utf8');
  
  // Split frontmatter and content
  const parts = content.split('---');
  if (parts.length < 3) {
    throw new Error('Invalid MDX file format');
  }
  
  const frontmatter = parts[1].trim();
  const mdxContent = parts.slice(2).join('---').trim();
  
  // Parse frontmatter
  const metadata = {};
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      metadata[key.trim()] = value;
    }
  });
  
  // Convert MDX to Medium-compatible Markdown
  let mediumContent = mdxContent
    // Remove MDX-specific syntax
    .replace(/import.*from.*['"].*['"];?\n/g, '')
    // Convert images to Medium format
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      // For Medium, we'll use a placeholder that you can replace with actual images
      return `![${alt}](https://miro.medium.com/max/800/1*placeholder.png)`;
    })
    // Convert blockquotes to Medium style
    .replace(/^> (.+)$/gm, '> $1')
    // Ensure proper spacing
    .replace(/\n{3,}/g, '\n\n');
  
  // Create Medium post structure
  const mediumPost = {
    title: metadata.title || 'Untitled',
    subtitle: metadata.excerpt || '',
    tags: metadata.tags ? metadata.tags.split(',').map(t => t.trim()) : [],
    content: mediumContent,
    publishStatus: 'draft', // Start as draft
    notifyFollowers: false,
    license: 'all-rights-reserved',
    canonicalUrl: '', // Add your site URL here
    metaDescription: metadata.excerpt || '',
    publishAt: new Date().toISOString()
  };
  
  return mediumPost;
}

function createMediumExport(postSlug) {
  const mdxFile = path.join(postsDir, `${postSlug}.mdx`);
  
  if (!fs.existsSync(mdxFile)) {
    console.error(`❌ Post not found: ${postSlug}.mdx`);
    return;
  }
  
  try {
    const mediumPost = convertMdxToMedium(mdxFile);
    
    // Create JSON export for Medium API
    const jsonFile = path.join(outputDir, `${postSlug}-medium.json`);
    fs.writeFileSync(jsonFile, JSON.stringify(mediumPost, null, 2));
    
    // Create Markdown export for manual copy-paste
    const mdFile = path.join(outputDir, `${postSlug}-medium.md`);
    const markdownContent = `# ${mediumPost.title}

${mediumPost.subtitle ? `*${mediumPost.subtitle}*` : ''}

---

${mediumPost.content}

---

**Tags:** ${mediumPost.tags.join(', ')}

**Original URL:** https://your-site.com/ideas/${postSlug}
`;
    
    fs.writeFileSync(mdFile, markdownContent);
    
    console.log(`✅ Created Medium exports for: ${postSlug}`);
    console.log(`   📄 JSON: ${jsonFile}`);
    console.log(`   📝 Markdown: ${mdFile}`);
    
    return { jsonFile, mdFile, mediumPost };
    
  } catch (error) {
    console.error(`❌ Error processing ${postSlug}:`, error.message);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('🚀 Medium Publishing Tool');
    console.log('========================\n');
    console.log('Usage:');
    console.log('  node scripts/publish-to-medium.js <post-slug>');
    console.log('  node scripts/publish-to-medium.js make-your-value-stream-network-visible');
    console.log('\nAvailable posts:');
    
    const posts = fs.readdirSync(postsDir)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''));
    
    posts.forEach(post => {
      console.log(`  - ${post}`);
    });
    
    return;
  }
  
  const postSlug = args[0];
  const result = createMediumExport(postSlug);
  
  if (result) {
    console.log('\n📋 Next Steps:');
    console.log('==============');
    console.log('1. **Manual Publishing (Recommended):**');
    console.log('   - Copy content from the .md file');
    console.log('   - Go to medium.com/new-story');
    console.log('   - Paste and format');
    console.log('   - Upload images manually');
    console.log('');
    console.log('2. **API Publishing:**');
    console.log('   - Use the JSON file with Medium API');
    console.log('   - Requires Medium API access');
    console.log('');
    console.log('3. **Image Optimization:**');
    console.log('   - Replace placeholder images with high-quality versions');
    console.log('   - Use Medium\'s image upload for best quality');
    console.log('');
    console.log('💡 Pro Tips:');
    console.log('- Medium prefers images 1200px wide');
    console.log('- Use Medium\'s built-in formatting tools');
    console.log('- Add a compelling subtitle');
    console.log('- Use relevant tags for discoverability');
  }
}

if (require.main === module) {
  main();
}

module.exports = { convertMdxToMedium, createMediumExport };
