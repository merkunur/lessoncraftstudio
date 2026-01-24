/**
 * TEST HTML PARSING
 *
 * Tests the HTML parsing logic on a few sample files
 * Run this BEFORE the full import to verify parsing works correctly
 */

const fs = require('fs');
const path = require('path');
const { parse } = require('node-html-parser');

const BLOG_BUILDING_DIR = 'C:/Users/rkgen/lessoncraftstudio/BLOG BUILDING';

function parseHtmlBlogPost(htmlContent) {
  const root = parse(htmlContent);

  const metaTitle = root.querySelector('title')?.text || '';
  const metaDescription = root.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const metaKeywords = root.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
  const canonicalUrl = root.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
  const h1 = root.querySelector('h1')?.text || metaTitle;
  const article = root.querySelector('article');
  const content = article ? article.innerHTML : '';
  const textContent = article ? article.text : '';
  const excerpt = textContent.substring(0, 200).trim() + '...';

  return {
    title: h1,
    metaTitle,
    metaDescription,
    keywords: metaKeywords,
    content,
    excerpt,
    canonicalUrl,
    contentLength: content.length,
    textContentLength: textContent.length
  };
}

function extractSlugFromFilename(filename) {
  return filename
    .replace(/^\d{3}-/, '')
    .replace(/\.html$/, '');
}

console.log('════════════════════════════════════════════════════');
console.log('  HTML PARSING TEST');
console.log('════════════════════════════════════════════════════\n');

// Test files
const testFiles = [
  {
    path: 'ENGLISH BLOGPOSTS/001-33-editable-worksheet-generators-elementary-teachers.html',
    lang: 'English'
  },
  {
    path: 'DANISH BLOGPOSTS/001-redigerbare-arbejdsark-generatorer-skolelærere.html',
    lang: 'Danish'
  },
  {
    path: 'FINNISH BLOGPOSTS/001-muokattavat-tehtavageneraattorit-opettajille.html',
    lang: 'Finnish'
  }
];

testFiles.forEach(({ path: filePath, lang }) => {
  console.log(`\n📄 Testing: ${lang}`);
  console.log(`   File: ${filePath}`);
  console.log('───────────────────────────────────────────────────');

  try {
    const fullPath = path.join(BLOG_BUILDING_DIR, filePath);
    const htmlContent = fs.readFileSync(fullPath, 'utf8');
    const parsed = parseHtmlBlogPost(htmlContent);
    const slug = extractSlugFromFilename(path.basename(fullPath));

    console.log(`   ✅ Parsed successfully`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Title: ${parsed.title.substring(0, 60)}...`);
    console.log(`   Meta Title: ${parsed.metaTitle.substring(0, 60)}...`);
    console.log(`   Meta Desc: ${parsed.metaDescription.substring(0, 60)}...`);
    console.log(`   Keywords: ${parsed.keywords.substring(0, 60)}...`);
    console.log(`   Excerpt: ${parsed.excerpt.substring(0, 80)}...`);
    console.log(`   Content Length: ${parsed.contentLength} chars`);
    console.log(`   Text Length: ${parsed.textContentLength} chars`);

    if (parsed.contentLength === 0) {
      console.log('   ⚠️  WARNING: Content is empty!');
    } else if (parsed.contentLength < 1000) {
      console.log('   ⚠️  WARNING: Content seems too short!');
    }

  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
});

console.log('\n════════════════════════════════════════════════════');
console.log('  TEST COMPLETE');
console.log('════════════════════════════════════════════════════\n');
console.log('If all tests passed, you can proceed with the full import.');
console.log('Run: node scripts/import-blog-posts.js');
console.log('');
