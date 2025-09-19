import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

// Read the actual HTML file from the public/blog directory
async function getBlogPost(locale: string, slug: string) {
  try {
    // Read the static HTML file
    const filePath = path.join(process.cwd(), 'public', 'blog', locale, `${slug}.html`);

    const htmlContent = await fs.readFile(filePath, 'utf-8');

    // Return the full HTML content
    return {
      htmlContent,
      exists: true
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug} for ${locale}:`, error);
    return {
      htmlContent: null,
      exists: false
    };
  }
}

// Generate static params for all existing blog posts
export async function generateStaticParams() {
  const locales = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    try {
      const blogDir = path.join(process.cwd(), 'public', 'blog', locale);

      // Check if directory exists
      try {
        await fs.access(blogDir);
      } catch {
        continue; // Skip if directory doesn't exist
      }

      const files = await fs.readdir(blogDir);
      const htmlFiles = files.filter(file => file.endsWith('.html'));

      for (const file of htmlFiles) {
        const slug = file.replace('.html', '');
        params.push({ locale, slug });
      }
    } catch (error) {
      console.error(`Error reading blog directory for ${locale}:`, error);
    }
  }

  return params;
}

export default async function BlogPostPage({
  params
}: BlogPostPageProps) {
  const { locale, slug } = params;
  const post = await getBlogPost(locale, slug);

  if (!post.exists || !post.htmlContent) {
    notFound();
  }

  // Render the complete HTML file content
  // Since the HTML file already contains full styling and structure,
  // we'll render it directly
  return (
    <div
      dangerouslySetInnerHTML={{ __html: post.htmlContent }}
      style={{
        width: '100%',
        minHeight: '100vh',
        margin: 0,
        padding: 0
      }}
    />
  );
}

// Metadata generation
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = params;

  try {
    const filePath = path.join(process.cwd(), 'public', 'blog', locale, `${slug}.html`);
    const htmlContent = await fs.readFile(filePath, 'utf-8');

    // Parse HTML to extract metadata
    const titleMatch = htmlContent.match(/<title>([^<]*)<\/title>/i);
    const descriptionMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
    const keywordsMatch = htmlContent.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);

    const title = titleMatch?.[1] || slug.replace(/-/g, ' ');
    const description = descriptionMatch?.[1] || '';
    const keywords = keywordsMatch?.[1] || '';

    return {
      title,
      description,
      keywords,
      openGraph: {
        title,
        description,
        type: 'article',
        url: `https://lessoncraftstudio.com/${locale}/blog/${slug}`,
        siteName: 'LessonCraftStudio',
        locale,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
      alternates: {
        languages: {
          'en': `/en/blog/${slug}`,
          'de': `/de/blog/${slug}`,
          'fr': `/fr/blog/${slug}`,
          'es': `/es/blog/${slug}`,
          'pt': `/pt/blog/${slug}`,
          'it': `/it/blog/${slug}`,
          'nl': `/nl/blog/${slug}`,
          'sv': `/sv/blog/${slug}`,
          'da': `/da/blog/${slug}`,
          'no': `/no/blog/${slug}`,
          'fi': `/fi/blog/${slug}`,
        }
      }
    };
  } catch (error) {
    return {
      title: slug.replace(/-/g, ' '),
      description: 'Blog post on LessonCraftStudio'
    };
  }
}