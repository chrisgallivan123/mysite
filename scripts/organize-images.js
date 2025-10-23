#!/usr/bin/env node

/**
 * Image Organizer for Blog Posts
 * Helps organize and categorize images from PowerPoint files for blog use
 */

const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const BLOG_IMAGES_DIR = path.join(process.cwd(), 'blog-images');

// Ensure directories exist
if (!fs.existsSync(BLOG_IMAGES_DIR)) {
  fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });
}

// Image categories based on common blog post topics
const IMAGE_CATEGORIES = {
  'flow-metrics': {
    description: 'Flow metrics, charts, and dashboards',
    keywords: ['flow', 'metrics', 'chart', 'dashboard', 'velocity', 'throughput']
  },
  'value-streams': {
    description: 'Value stream maps and network diagrams',
    keywords: ['value', 'stream', 'network', 'map', 'diagram', 'flow']
  },
  'bottlenecks': {
    description: 'Bottleneck analysis and constraint identification',
    keywords: ['bottleneck', 'constraint', 'blocked', 'waiting', 'delay']
  },
  'process-improvement': {
    description: 'Process improvement methodologies and frameworks',
    keywords: ['process', 'improvement', 'lean', 'agile', 'methodology']
  },
  'team-dynamics': {
    description: 'Team collaboration and organizational dynamics',
    keywords: ['team', 'collaboration', 'organization', 'culture', 'dynamics']
  },
  'case-studies': {
    description: 'Real-world examples and case studies',
    keywords: ['case', 'study', 'example', 'success', 'results']
  }
};

function categorizeImage(filename) {
  const name = filename.toLowerCase();
  
  for (const [category, config] of Object.entries(IMAGE_CATEGORIES)) {
    if (config.keywords.some(keyword => name.includes(keyword))) {
      return category;
    }
  }
  
  return 'general';
}

function organizeImages() {
  console.log('📸 Organizing images from PowerPoint files...\n');
  
  // Get all images from public directory
  const publicImages = fs.readdirSync(PUBLIC_DIR)
    .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
  
  console.log(`Found ${publicImages.length} images in public directory:`);
  
  const categorizedImages = {};
  
  publicImages.forEach(image => {
    const category = categorizeImage(image);
    
    if (!categorizedImages[category]) {
      categorizedImages[category] = [];
    }
    
    categorizedImages[category].push(image);
  });
  
  // Display categorized images
  Object.entries(categorizedImages).forEach(([category, images]) => {
    console.log(`\n📁 ${category.toUpperCase()}:`);
    console.log(`   ${IMAGE_CATEGORIES[category]?.description || 'General images'}`);
    images.forEach(image => {
      console.log(`   - ${image}`);
    });
  });
  
  // Create image usage guide
  const usageGuide = `# Image Usage Guide

## Available Images by Category

${Object.entries(categorizedImages).map(([category, images]) => `
### ${category.charAt(0).toUpperCase() + category.slice(1)}
${IMAGE_CATEGORIES[category]?.description || 'General images'}

${images.map(img => `- \`${img}\` - Use for ${category} related content`).join('\n')}
`).join('\n')}

## Usage in Blog Posts

### Cover Images
Use large, high-quality images for post covers:
- \`image109.png\` - Large diagram, good for covers
- \`image12.jpeg\` - Professional chart, good for covers

### Section Images
Use medium-sized images for section breaks:
- \`image1.png\` - Good for introduction sections
- \`image103.png\` - Good for technical sections
- \`image107.png\` - Good for process sections

### Inline Images
Use smaller images within content:
- Charts and graphs for data visualization
- Diagrams for process explanation
- Screenshots for tool demonstrations

## Image Optimization Tips

1. **File Sizes**: Keep images under 500KB for web performance
2. **Dimensions**: Use appropriate sizes (800x400 for covers, 400x200 for sections)
3. **Alt Text**: Always include descriptive alt text for accessibility
4. **Formats**: Use PNG for diagrams, JPEG for photos

## Next Steps

1. Review the categorized images above
2. Choose appropriate images for your blog posts
3. Update post frontmatter with \`coverImage\` field
4. Add images to post content using Markdown syntax
5. Test image loading and optimization

Generated on: ${new Date().toISOString()}
`;

  fs.writeFileSync(path.join(BLOG_IMAGES_DIR, 'IMAGE_USAGE_GUIDE.md'), usageGuide);
  
  console.log(`\n📋 Created image usage guide: ${path.join(BLOG_IMAGES_DIR, 'IMAGE_USAGE_GUIDE.md')}`);
  console.log('\n🎯 Next steps:');
  console.log('1. Review the categorized images above');
  console.log('2. Choose images for your blog posts');
  console.log('3. Update post frontmatter with coverImage field');
  console.log('4. Add images to post content');
}

function suggestImagesForPost(postTitle) {
  const title = postTitle.toLowerCase();
  
  console.log(`\n🎯 Image suggestions for "${postTitle}":`);
  
  // Get all images
  const publicImages = fs.readdirSync(PUBLIC_DIR)
    .filter(file => /\.(png|jpg|jpeg|gif)$/i.test(file));
  
  // Suggest based on title keywords
  const suggestions = [];
  
  if (title.includes('flow') || title.includes('network')) {
    suggestions.push('image109.png', 'image1.png', 'flow-network.png');
  }
  
  if (title.includes('value') || title.includes('stream')) {
    suggestions.push('image103.png', 'image107.png');
  }
  
  if (title.includes('context') || title.includes('gold')) {
    suggestions.push('context-gold.png', 'image12.jpeg');
  }
  
  if (title.includes('efficiency') || title.includes('metrics')) {
    suggestions.push('image12.jpeg', 'image103.png');
  }
  
  // Remove duplicates and show suggestions
  const uniqueSuggestions = [...new Set(suggestions)];
  
  if (uniqueSuggestions.length > 0) {
    uniqueSuggestions.forEach(img => {
      if (publicImages.includes(img)) {
        console.log(`   ✅ ${img} - Available`);
      } else {
        console.log(`   ❌ ${img} - Not found`);
      }
    });
  } else {
    console.log('   📸 Consider using any of the available images:');
    publicImages.slice(0, 5).forEach(img => {
      console.log(`   - ${img}`);
    });
  }
}

// Run the organizer
if (require.main === module) {
  const postTitle = process.argv[2];
  
  if (postTitle) {
    suggestImagesForPost(postTitle);
  } else {
    organizeImages();
  }
}

module.exports = { organizeImages, suggestImagesForPost };
