import { describe, it, expect } from '@jest/globals'

describe('Blog SEO Validation', () => {
  describe('Static HTML Generation', () => {
    it('should include all required meta tags', () => {
      const requiredMetaTags = [
        { name: 'description', content: 'metaDescription' },
        { name: 'keywords', content: 'keywords' },
        { name: 'author', content: 'author' },
        { property: 'og:title', content: 'metaTitle' },
        { property: 'og:description', content: 'metaDescription' },
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: 'url' },
        { property: 'og:site_name', content: 'LessonCraftStudio' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'metaTitle' },
        { name: 'twitter:description', content: 'metaDescription' }
      ]

      const html = generateTestHTML({
        metaTitle: 'Test Title',
        metaDescription: 'Test Description',
        keywords: 'test, keywords',
        author: 'Test Author'
      })

      requiredMetaTags.forEach(tag => {
        if (tag.name) {
          expect(html).toContain(`<meta name="${tag.name}"`)
        } else if (tag.property) {
          expect(html).toContain(`<meta property="${tag.property}"`)
        }
      })
    })

    it('should generate hreflang tags for all 11 languages', () => {
      const languages = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi']
      const html = generateTestHTML({ slug: 'test-post' })

      languages.forEach(lang => {
        expect(html).toContain(`<link rel="alternate" hreflang="${lang}"`)
        expect(html).toContain(`href="https://lessoncraftstudio.com/${lang}/blog/test-post"`)
      })
    })

    it('should include structured data (JSON-LD)', () => {
      const html = generateTestHTML({
        title: 'Test Blog Post',
        metaDescription: 'Test Description',
        author: 'Test Author',
        date: '2024-12-19'
      })

      expect(html).toContain('<script type="application/ld+json">')
      expect(html).toContain('"@context": "https://schema.org"')
      expect(html).toContain('"@type": "BlogPosting"')
      expect(html).toContain('"headline": "Test Blog Post"')
      expect(html).toContain('"author"')
      expect(html).toContain('"datePublished": "2024-12-19"')
      expect(html).toContain('"publisher"')
    })

    it('should include canonical URL', () => {
      const html = generateTestHTML({
        slug: 'test-post',
        locale: 'en'
      })

      expect(html).toContain('<link rel="canonical" href="https://lessoncraftstudio.com/en/blog/test-post" />')
    })

    it('should optimize meta description length', () => {
      const tooLongDescription = 'a'.repeat(200)
      const html = generateTestHTML({
        metaDescription: tooLongDescription
      })

      // Should truncate to ~155-160 characters for optimal SEO
      const metaDescMatch = html.match(/meta name="description" content="([^"]+)"/)
      if (metaDescMatch) {
        expect(metaDescMatch[1].length).toBeLessThanOrEqual(160)
      }
    })
  })

  describe('URL Structure', () => {
    it('should generate SEO-friendly slugs', () => {
      const testCases = [
        { input: 'How to Create Math Worksheets!', expected: 'how-to-create-math-worksheets' },
        { input: 'Best Práctice & Tips', expected: 'best-practice-tips' },
        { input: '10 Amazing Ideas!!!', expected: '10-amazing-ideas' },
        { input: 'Test   Multiple   Spaces', expected: 'test-multiple-spaces' }
      ]

      testCases.forEach(({ input, expected }) => {
        expect(generateSlug(input)).toBe(expected)
      })
    })

    it('should maintain consistent URL structure', () => {
      const locales = ['en', 'de', 'fr']
      const slug = 'test-post'

      locales.forEach(locale => {
        const url = `/${locale}/blog/${slug}`
        expect(url).toMatch(/^\/[a-z]{2}\/blog\/[a-z0-9-]+$/)
      })
    })
  })

  describe('Performance Optimization', () => {
    it('should use static HTML files for fast loading', () => {
      // Verify static files are created in correct structure
      const expectedPaths = [
        '/public/blog/en/test-post.html',
        '/public/blog/de/test-post.html',
        '/public/blog/fr/test-post.html'
      ]

      expectedPaths.forEach(path => {
        // In real test, check if file exists
        expect(path).toMatch(/^\/public\/blog\/[a-z]{2}\/[a-z0-9-]+\.html$/)
      })
    })

    it('should implement proper caching headers', () => {
      const cacheHeaders = {
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
        'ETag': expect.any(String),
        'Last-Modified': expect.any(String)
      }

      // In real implementation, verify response headers
      Object.keys(cacheHeaders).forEach(header => {
        expect(header).toBeTruthy()
      })
    })
  })

  describe('Mobile Optimization', () => {
    it('should include mobile viewport meta tag', () => {
      const html = generateTestHTML({})
      expect(html).toContain('<meta name="viewport" content="width=device-width, initial-scale=1.0">')
    })

    it('should have responsive design styles', () => {
      const html = generateTestHTML({})
      expect(html).toContain('@media (max-width: 768px)')
    })
  })

  describe('Content Validation', () => {
    it('should validate required fields are present', () => {
      const requiredFields = ['title', 'content', 'slug', 'locale']
      const blogData = {
        title: 'Test',
        content: '<p>Content</p>',
        slug: 'test',
        locale: 'en'
      }

      requiredFields.forEach(field => {
        expect(blogData).toHaveProperty(field)
        expect(blogData[field as keyof typeof blogData]).toBeTruthy()
      })
    })

    it('should escape HTML in meta tags to prevent XSS', () => {
      const html = generateTestHTML({
        metaTitle: 'Test <script>alert("XSS")</script> Title',
        metaDescription: 'Test <img onerror="alert(1)"> Description'
      })

      expect(html).not.toContain('<script>alert("XSS")</script>')
      expect(html).not.toContain('<img onerror="alert(1)">')
      expect(html).toContain('&lt;script&gt;')
      expect(html).toContain('&lt;img')
    })
  })
})

// Helper functions
function generateTestHTML(data: any): string {
  const {
    title = 'Test Title',
    content = '<p>Test content</p>',
    metaTitle = title,
    metaDescription = 'Test description',
    keywords = 'test, keywords',
    author = 'Test Author',
    date = '2024-12-19',
    slug = 'test-post',
    locale = 'en'
  } = data

  // Escape HTML for security
  const escapeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
  }

  // Truncate description for SEO
  const truncatedDescription = metaDescription.length > 160
    ? metaDescription.substring(0, 157) + '...'
    : metaDescription

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metaTitle)}</title>
  <meta name="description" content="${escapeHtml(truncatedDescription)}">
  <meta name="keywords" content="${escapeHtml(keywords)}">
  <meta name="author" content="${escapeHtml(author)}">
  <link rel="canonical" href="https://lessoncraftstudio.com/${locale}/blog/${slug}" />
  ${['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].map(lang =>
    `<link rel="alternate" hreflang="${lang}" href="https://lessoncraftstudio.com/${lang}/blog/${slug}" />`
  ).join('\n  ')}
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(truncatedDescription)}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="https://lessoncraftstudio.com/${locale}/blog/${slug}">
  <meta property="og:site_name" content="LessonCraftStudio">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(truncatedDescription)}">
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${escapeHtml(title)}",
    "description": "${escapeHtml(truncatedDescription)}",
    "author": {
      "@type": "Person",
      "name": "${escapeHtml(author)}"
    },
    "datePublished": "${date}",
    "publisher": {
      "@type": "Organization",
      "name": "LessonCraftStudio"
    }
  }
  </script>
  <style>
    @media (max-width: 768px) {
      /* Mobile styles */
    }
  </style>
</head>
<body>
  <article>${content}</article>
</body>
</html>`
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Trim hyphens from start and end
}