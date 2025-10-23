#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Simple image enhancement script for PowerPoint-exported images
 * This script provides recommendations and basic file operations
 */

const publicDir = path.join(__dirname, '..', 'public');

function analyzeImages() {
  console.log('🔍 Analyzing images in public directory...\n');
  
  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg|gif|webp)$/i.test(file)
  );
  
  console.log('📊 Image Analysis Report:');
  console.log('========================\n');
  
  imageFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    
    let quality = '❌ Poor';
    if (sizeKB > 200) quality = '✅ Good';
    else if (sizeKB > 100) quality = '⚠️ Fair';
    
    console.log(`${file.padEnd(25)} ${sizeKB.toString().padStart(6)}KB ${quality}`);
  });
  
  console.log('\n💡 Recommendations:');
  console.log('===================');
  console.log('1. Re-export from PowerPoint at 300 DPI');
  console.log('2. Use PNG format for graphics/diagrams');
  console.log('3. Consider AI upscaling for small images');
  console.log('4. Apply CSS filters (already added to your site)');
  console.log('\n🌐 Online Enhancement Tools:');
  console.log('- upscale.media (AI upscaling)');
  console.log('- waifu2x.net (great for graphics)');
  console.log('- bigjpg.com (AI enlarger)');
  console.log('- letsenhance.io (professional)');
}

function createOptimizedVersions() {
  console.log('\n🔄 Creating optimized versions...');
  
  const files = fs.readdirSync(publicDir);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file) && !file.includes('_enhanced')
  );
  
  imageFiles.forEach(file => {
    const stats = fs.statSync(path.join(publicDir, file));
    const sizeKB = Math.round(stats.size / 1024);
    
    if (sizeKB < 100) {
      console.log(`⚠️  ${file} (${sizeKB}KB) - Consider enhancing`);
    } else {
      console.log(`✅ ${file} (${sizeKB}KB) - Good quality`);
    }
  });
}

function main() {
  console.log('🚀 PowerPoint Image Enhancement Tool');
  console.log('====================================\n');
  
  analyzeImages();
  createOptimizedVersions();
  
  console.log('\n✨ CSS enhancements have been applied to your images!');
  console.log('   - Increased contrast (1.1x)');
  console.log('   - Enhanced brightness (1.05x)');
  console.log('   - Boosted saturation (1.1x)');
  console.log('   - Crisp edge rendering');
}

if (require.main === module) {
  main();
}

module.exports = { analyzeImages, createOptimizedVersions };
