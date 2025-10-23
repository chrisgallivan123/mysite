# Image Management System

## 🖼️ Available Images

### From VS Network Forum.pptx
I've extracted **83 images** from your PowerPoint file and organized them by topic:

#### Cover Images (Large, High-Quality)
- `image109.png` - Large network diagram (1.5MB) - **Perfect for covers**
- `image12.jpeg` - Professional chart (286KB) - **Great for covers**
- `image1.png` - Network diagram (261KB) - **Good for covers**

#### Section Images (Medium-Sized)
- `image103.png` - Analysis chart (105KB) - **Good for technical sections**
- `image107.png` - Dashboard view (56KB) - **Good for process sections**
- `image105.jpeg` - Chart/graph (45KB) - **Good for data sections**

#### Inline Images (Smaller)
- `image106.jpeg` - Small chart (7KB) - **Good for inline content**
- `image108.png` - Small diagram (9KB) - **Good for inline content**

## 📝 Using Images in Posts

### 1. Cover Images
Update your post frontmatter:
```yaml
---
title: "Your Post Title"
coverImage: "/image109.png"
---
```

### 2. Section Images
Add images between sections:
```markdown
## 📊 Section Title

Your content here...

![Description](/image103.png)
*Figure 1: Caption explaining the image*

More content...
```

### 3. Inline Images
Add images within paragraphs:
```markdown
The data shows that **flow time increases** with dependency complexity:

![Flow Time Chart](/image107.png)

This demonstrates the relationship between...
```

## 🎯 Image Selection Guide

### For Flow Metrics Posts
- **Cover**: `image109.png` or `image12.jpeg`
- **Sections**: `image103.png`, `image107.png`
- **Inline**: `image105.jpeg`, `image106.jpeg`

### For Value Stream Posts
- **Cover**: `image1.png` or `image109.png`
- **Sections**: `image103.png`, `image107.png`
- **Inline**: `image108.png`

### For Process Improvement Posts
- **Cover**: `image12.jpeg` or `image109.png`
- **Sections**: `image107.png`, `image103.png`
- **Inline**: `image105.jpeg`

## 🚀 Quick Image Commands

### Organize All Images
```bash
npm run organize-images
```

### Get Suggestions for Specific Post
```bash
npm run suggest-images "Your Post Title"
```

### Export to Medium
```bash
npm run export-medium
```

## 📊 Image Optimization Tips

### File Sizes
- **Cover images**: 200KB - 1.5MB (acceptable for hero images)
- **Section images**: 50KB - 200KB (good balance)
- **Inline images**: 10KB - 50KB (fast loading)

### Formats
- **PNG**: Best for diagrams, charts, screenshots
- **JPEG**: Best for photos, complex images
- **GIF**: Only for simple animations

### Alt Text
Always include descriptive alt text:
```markdown
![Value stream network showing team dependencies and handoffs](/image109.png)
```

## 🎨 Creating New Images

### From PowerPoint Files
1. Extract images using the Python script
2. Copy relevant images to `/public/`
3. Run `npm run organize-images` to categorize
4. Use in posts with proper attribution

### Image Naming Convention
- `category-description-number.png`
- Examples: `flow-metrics-chart-1.png`, `value-stream-network-2.png`

## 📈 Performance Optimization

### Next.js Image Component
Use Next.js Image component for automatic optimization:
```jsx
import Image from 'next/image'

<Image
  src="/image109.png"
  alt="Value stream network diagram"
  width={800}
  height={400}
  className="rounded-lg"
/>
```

### Lazy Loading
Images are automatically lazy-loaded by Next.js Image component.

## 🔄 Workflow Integration

### 1. Extract Images
```bash
# Extract from PowerPoint
python3 extract_images.py "VS Network Forum.pptx"
```

### 2. Organize Images
```bash
# Categorize and create usage guide
npm run organize-images
```

### 3. Use in Posts
- Update frontmatter with `coverImage`
- Add section images between headings
- Include inline images with captions

### 4. Export for Medium
```bash
# Create Medium-compatible versions
npm run export-medium
```

## 📋 Image Checklist

Before publishing:
- [ ] Cover image set in frontmatter
- [ ] Section images added every 200-300 words
- [ ] All images have descriptive alt text
- [ ] Images are properly sized (not too large)
- [ ] Captions explain the image relevance
- [ ] Images support the narrative flow

---

**Pro Tip**: Use the image suggestion tool to get recommendations based on your post title and content!
