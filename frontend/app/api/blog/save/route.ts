import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { slug, locale, content, metadata } = await request.json();

    if (!slug || !locale || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create the blog directory if it doesn't exist
    const blogDir = path.join(process.cwd(), 'public', 'blog', locale);
    await fs.mkdir(blogDir, { recursive: true });

    // Create the HTML file path
    const filePath = path.join(blogDir, `${slug}.html`);

    // Build the complete HTML document
    const htmlContent = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title || slug}</title>
  <meta name="description" content="${metadata.excerpt || ''}">
  <meta name="keywords" content="${metadata.keywords || ''}">
  <meta name="author" content="${metadata.author || 'LessonCraftStudio Team'}">
  <meta name="date" content="${metadata.date || new Date().toISOString().split('T')[0]}">
  <meta name="category" content="${metadata.category || 'teaching-resources'}">
  <meta name="readTime" content="${metadata.readTime || '5 min read'}">

  <!-- Canonical URL -->
  <link rel="canonical" href="https://www.lessoncraftstudio.com/${locale}/blog/${slug}" />

  <!-- Hreflang tags for all languages -->
  <link rel="alternate" hreflang="en" href="https://www.lessoncraftstudio.com/en/blog/${slug}" />
  <link rel="alternate" hreflang="de" href="https://www.lessoncraftstudio.com/de/blog/${slug}" />
  <link rel="alternate" hreflang="fr" href="https://www.lessoncraftstudio.com/fr/blog/${slug}" />
  <link rel="alternate" hreflang="es-MX" href="https://www.lessoncraftstudio.com/es/blog/${slug}" />
  <link rel="alternate" hreflang="pt-BR" href="https://www.lessoncraftstudio.com/pt/blog/${slug}" />
  <link rel="alternate" hreflang="it" href="https://www.lessoncraftstudio.com/it/blog/${slug}" />
  <link rel="alternate" hreflang="nl" href="https://www.lessoncraftstudio.com/nl/blog/${slug}" />
  <link rel="alternate" hreflang="sv" href="https://www.lessoncraftstudio.com/sv/blog/${slug}" />
  <link rel="alternate" hreflang="da" href="https://www.lessoncraftstudio.com/da/blog/${slug}" />
  <link rel="alternate" hreflang="no" href="https://www.lessoncraftstudio.com/no/blog/${slug}" />
  <link rel="alternate" hreflang="fi" href="https://www.lessoncraftstudio.com/fi/blog/${slug}" />

  <!-- Open Graph Meta Tags -->
  <meta property="og:title" content="${metadata.metaTitle || metadata.title || slug}">
  <meta property="og:description" content="${metadata.metaDescription || metadata.excerpt || ''}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://www.lessoncraftstudio.com/${locale}/blog/${slug}">
  <meta property="og:site_name" content="LessonCraftStudio">
  <meta property="og:locale" content="${locale}">

  <!-- Twitter Card Meta Tags -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${metadata.metaTitle || metadata.title || slug}">
  <meta name="twitter:description" content="${metadata.metaDescription || metadata.excerpt || ''}">

  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 { color: #2c3e50; margin-bottom: 10px; }
    .meta { color: #7f8c8d; margin-bottom: 30px; }
    article { margin: 40px 0; }
    .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <h1>${metadata.title || slug}</h1>
      <div class="meta">
        <span>By ${metadata.author || 'LessonCraftStudio Team'}</span> |
        <span>${metadata.date || new Date().toLocaleDateString()}</span> |
        <span>${metadata.category || 'Teaching Resources'}</span>
      </div>
    </div>
  </header>

  <main>
    <div class="container">
      <article>
        ${content}
      </article>
    </div>
  </main>

  <footer>
    <div class="container">
      <p>&copy; ${new Date().getFullYear()} LessonCraftStudio. All rights reserved.</p>
      <p><a href="https://www.lessoncraftstudio.com">Create Your Own Worksheets</a></p>
    </div>
  </footer>
</body>
</html>`;

    // Write the file
    await fs.writeFile(filePath, htmlContent, 'utf-8');

    // Also create a backup
    const backupPath = path.join(blogDir, `${slug}.backup.html`);
    await fs.writeFile(backupPath, htmlContent, 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Blog post saved successfully',
      path: filePath
    });

  } catch (error) {
    console.error('Error saving blog post:', error);
    return NextResponse.json(
      { error: 'Failed to save blog post', details: error },
      { status: 500 }
    );
  }
}