#!/usr/bin/env node

/**
 * Medium Export Utility
 * Exports posts in Medium-compatible format for cross-posting
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(process.cwd(), 'content', 'posts');
const OUTPUT_DIR = path.join(process.cwd(), 'medium-exports');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function convertToMediumFormat(content, frontmatter) {
  // Convert emoji headings to regular headings for Medium
  let mediumContent = content
    .replace(/^## (.*)$/gm, (match, heading) => {
      // Remove emoji from headings for Medium
      const cleanHeading = heading.replace(/^\p{Emoji}+\s*/, '');
      return `## ${cleanHeading}`;
    })
    .replace(/^### (.*)$/gm, (match, heading) => {
      const cleanHeading = heading.replace(/^\p{Emoji}+\s*/, '');
      return `### ${cleanHeading}`;
    });

  // Convert callout boxes to Medium-style quotes
  mediumContent = mediumContent.replace(
    /> (.*?) \*\*(.*?)\*\*  \n> \*(.*?)\*/g,
    '> **$2**  \n> *$3*'
  );

  // Add Medium-specific metadata
  const mediumPost = {
    title: frontmatter.title,
    subtitle: frontmatter.excerpt,
    tags: frontmatter.tags || [],
    publishStatus: 'draft', // Change to 'public' when ready to publish
    content: mediumContent,
    canonicalUrl: `https://your-site.com/ideas/${frontmatter.slug}`,
    license: 'all-rights-reserved',
    notifyFollowers: true
  };

  return mediumPost;
}

function exportPost(filename) {
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(raw);
  
  const slug = filename.replace('.mdx', '');
  const mediumPost = convertToMediumFormat(content, { ...data, slug });
  
  // Save as JSON for Medium API
  const outputPath = path.join(OUTPUT_DIR, `${slug}-medium.json`);
  fs.writeFileSync(outputPath, JSON.stringify(mediumPost, null, 2));
  
  // Also save as Markdown for manual copy-paste
  const markdownPath = path.join(OUTPUT_DIR, `${slug}-medium.md`);
  const markdownContent = `# ${mediumPost.title}

${mediumPost.subtitle}

---

${mediumPost.content}

---

*Originally published on [your-site.com](https://your-site.com/ideas/${slug})*
`;
  
  fs.writeFileSync(markdownPath, markdownContent);
  
  console.log(`✅ Exported ${filename} to Medium format`);
  console.log(`   JSON: ${outputPath}`);
  console.log(`   Markdown: ${markdownPath}`);
}

function exportAllPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter(file => file.endsWith('.mdx'));
  
  console.log(`📝 Exporting ${files.length} posts to Medium format...\n`);
  
  files.forEach(exportPost);
  
  console.log(`\n🎉 Export complete! Check the ${OUTPUT_DIR} directory.`);
  console.log('\n📋 Next steps:');
  console.log('1. Review the exported files');
  console.log('2. Use Medium API or copy-paste the Markdown');
  console.log('3. Update canonicalUrl in the JSON files');
  console.log('4. Publish to Medium!');
}

// Run the export
if (require.main === module) {
  const filename = process.argv[2];
  if (filename) {
    exportPost(filename);
  } else {
    exportAllPosts();
  }
}

module.exports = { exportPost, exportAllPosts };
