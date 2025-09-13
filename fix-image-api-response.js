const fs = require('fs');
const path = require('path');

// Directory containing HTML files
const htmlDir = path.join(__dirname, 'frontend', 'public', 'worksheet-generators');

// Get all HTML files
const htmlFiles = fs.readdirSync(htmlDir).filter(file => file.endsWith('.html'));

console.log(`Found ${htmlFiles.length} HTML files to fix`);

let totalFixed = 0;

htmlFiles.forEach(file => {
  const filePath = path.join(htmlDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let fixCount = 0;
  
  // Pattern 1: Fix simple await res.json() assignments to imagesToRender
  const pattern1 = /imagesToRender = await res\.json\(\);/g;
  if (pattern1.test(content)) {
    content = content.replace(pattern1, 'const data = await res.json();\n                    imagesToRender = data.images || data; // Handle both old and new API formats');
    fixCount++;
  }
  
  // Pattern 2: Fix assignments to allImages
  const pattern2 = /const themeImages = await res\.json\(\);/g;
  if (pattern2.test(content)) {
    content = content.replace(pattern2, 'const data = await res.json();\n                const themeImages = data.images || data; // Handle both old and new API formats');
    fixCount++;
  }
  
  // Pattern 3: Fix direct assignment without intermediate variable
  const pattern3 = /allImages = await res\.json\(\);/g;
  if (pattern3.test(content)) {
    content = content.replace(pattern3, 'const data = await res.json();\n                allImages = data.images || data; // Handle both old and new API formats');
    fixCount++;
  }
  
  if (fixCount > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file} (${fixCount} replacements)`);
    totalFixed++;
  }
});

console.log(`\n✅ Fixed ${totalFixed} files total`);