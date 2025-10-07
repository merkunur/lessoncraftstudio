import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { generateBlogSchemas } from '@/lib/schema-generator';

interface BlogPostPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

interface BlogPDF {
  id: string;
  title: string;
  description: string;
  filename: string;
  filePath: string;
  fileSize: number;
  thumbnail: string | null;
  price: string;
  downloads: number;
}

interface BlogPost {
  id: string;
  slug: string;
  translations: any;
  category: string;
  keywords: string[];
  featuredImage: string | null;
  createdAt: Date;
  updatedAt: Date;
  pdfs: BlogPDF[];
}

// Fetch blog post from database directly
async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        pdfs: {
          orderBy: { sortOrder: 'asc' }
        }
      }
    });

    return post;
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error);
    return null;
  }
}

// Generate static params for all existing blog posts
export async function generateStaticParams() {
  // In production, you'd fetch this from the database
  // For now, return empty array to allow dynamic generation
  return [];
}

// Get related blog posts
async function getRelatedPosts(currentSlug: string, category: string, limit: number = 3) {
  try {
    const posts = await prisma.blogPost.findMany({
      where: {
        status: 'published',
        slug: { not: currentSlug },
        category: category
      },
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
    return posts;
  } catch (error) {
    console.error('Error fetching related posts:', error);
    return [];
  }
}

export default async function BlogPostPage({
  params
}: BlogPostPageProps) {
  const { locale, slug } = params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Get related posts
  const relatedPosts = await getRelatedPosts(post.slug, post.category);

  const translations = post.translations as any;
  const translation = translations[locale] || translations['en'] || {};
  let htmlContent = translation.content || '';

  // Extract styles and body content from the complete HTML page
  const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  const styles = styleMatch ? styleMatch.join('\n') : '';

  // Extract body content (everything between <body> and </body>)
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

  // Extract header (navigation) from body content
  const headerMatch = bodyContent.match(/(<nav[^>]*>[\s\S]*?<\/nav>)/i);
  const headerContent = headerMatch ? headerMatch[1] : '';

  // Remove header from body content to insert PDFs after it
  if (headerContent) {
    bodyContent = bodyContent.replace(headerContent, '');
  }

  // Generate SEO Schema Markup (AUTOMATED)
  const schemas = generateBlogSchemas({
    slug: post.slug,
    title: translation.title || '',
    metaTitle: translation.metaTitle,
    metaDescription: translation.metaDescription,
    excerpt: translation.excerpt,
    content: htmlContent,
    featuredImage: post.featuredImage,
    focusKeyword: translation.focusKeyword,
    keywords: post.keywords,
    category: post.category,
    author: translation.author,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  }, locale);

  // Render the extracted content with inline styles, PDFs after header, and related posts before footer
  return (
    <>
      {/* AUTOMATED: Schema Markup Injection for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div dangerouslySetInnerHTML={{ __html: styles }} />

      {/* Header/Navigation */}
      {headerContent && (
        <div dangerouslySetInnerHTML={{ __html: headerContent }} />
      )}

      {/* Sample Worksheets - Right after header */}
      {post.pdfs && post.pdfs.length > 0 && (
        <div style={{
          maxWidth: '1200px',
          margin: '32px auto 64px',
          padding: '0 24px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#480005'
          }}>
            {translation.pdfSectionTitle || 'Sample Worksheets'}
          </h2>
          {translation.pdfSectionDescription && (
            <p style={{
              fontSize: '18px',
              color: '#6B7280',
              textAlign: 'center',
              marginBottom: '32px'
            }}>
              {translation.pdfSectionDescription}
            </p>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {post.pdfs.map((pdf) => (
              <div key={pdf.id} style={{
                border: '2px solid #480005',
                borderRadius: '12px',
                padding: '24px',
                backgroundColor: '#FFFFFF',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {pdf.thumbnail && (
                  <div style={{
                    width: '100%',
                    height: '350px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={pdf.thumbnail}
                      alt={pdf.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        width: 'auto',
                        height: 'auto',
                        objectFit: 'contain'
                      }}
                    />
                  </div>
                )}
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#480005'
                }}>
                  {pdf.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  marginBottom: '16px',
                  color: '#480005',
                  opacity: 0.8,
                  flex: 1
                }}>
                  {pdf.description}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 'auto'
                }}>
                  <span style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    color: '#D6AC47'
                  }}>
                    {pdf.price}
                  </span>
                  <a
                    href={pdf.filePath}
                    download={pdf.filename}
                    style={{
                      backgroundColor: '#480005',
                      color: '#FFFFFF',
                      padding: '10px 20px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                      transition: 'background-color 0.3s ease'
                    }}
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main body content */}
      <div
        dangerouslySetInnerHTML={{ __html: bodyContent }}
        style={{
          width: '100%',
          margin: 0,
          padding: 0
        }}
      />

      {/* Related Blog Posts - Before footer */}
      {relatedPosts.length > 0 && (
        <div style={{
          maxWidth: '1200px',
          margin: '64px auto',
          padding: '0 24px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#480005'
          }}>
            Related Articles
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {relatedPosts.map((relatedPost) => {
              const relatedTranslations = relatedPost.translations as any;
              const relatedTranslation = relatedTranslations[locale] || relatedTranslations['en'] || {};

              return (
                <article
                  key={relatedPost.id}
                  style={{
                    border: '2px solid #480005',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#FFFFFF',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                >
                  <Link
                    href={`/${locale}/blog/${relatedPost.slug}`}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      color: 'inherit'
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '250px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                      overflow: 'hidden'
                    }}>
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedTranslation.title}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain'
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: '64px', opacity: 0.3 }}>📝</span>
                      )}
                    </div>
                    <div style={{ padding: '24px' }}>
                      <h3 style={{
                        fontSize: '20px',
                        fontWeight: '600',
                        marginBottom: '12px',
                        color: '#480005'
                      }}>
                        {relatedTranslation.title || relatedPost.slug}
                      </h3>
                      <p style={{
                        fontSize: '14px',
                        color: '#480005',
                        opacity: 0.8,
                        marginBottom: '16px'
                      }}>
                        {relatedTranslation.excerpt || ''}
                      </p>
                      <span style={{
                        fontSize: '14px',
                        fontWeight: '600',
                        color: '#D6AC47'
                      }}>
                        Read More →
                      </span>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// Metadata generation (ENHANCED WITH AUTOMATED SEO)
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = params;
  const baseUrl = 'https://lessoncraftstudio.com';

  try {
    const post = await getBlogPost(slug);

    if (!post) {
      return {
        title: slug.replace(/-/g, ' '),
        description: 'Blog post on LessonCraftStudio'
      };
    }

    const translations = post.translations as any;
    const translation = translations[locale] || translations['en'] || {};
    const title = translation.metaTitle || translation.title || slug.replace(/-/g, ' ');
    const description = translation.metaDescription || translation.excerpt || '';
    const keywords = post.keywords?.join(', ') || '';
    const canonicalUrl = `${baseUrl}/${locale}/blog/${slug}`;

    return {
      title,
      description,
      keywords,
      // AUTOMATED: Canonical URL (prevents duplicate content penalties)
      alternates: {
        canonical: canonicalUrl,
        languages: {
          'en': `${baseUrl}/en/blog/${slug}`,
          'de': `${baseUrl}/de/blog/${slug}`,
          'fr': `${baseUrl}/fr/blog/${slug}`,
          'es': `${baseUrl}/es/blog/${slug}`,
          'pt': `${baseUrl}/pt/blog/${slug}`,
          'it': `${baseUrl}/it/blog/${slug}`,
          'nl': `${baseUrl}/nl/blog/${slug}`,
          'sv': `${baseUrl}/sv/blog/${slug}`,
          'da': `${baseUrl}/da/blog/${slug}`,
          'no': `${baseUrl}/no/blog/${slug}`,
          'fi': `${baseUrl}/fi/blog/${slug}`,
        }
      },
      // AUTOMATED: Open Graph tags (Facebook, LinkedIn, etc.)
      openGraph: {
        title,
        description,
        type: 'article',
        url: canonicalUrl,
        siteName: 'LessonCraftStudio',
        locale,
        // AUTOMATED: Article dates (content freshness signal)
        publishedTime: post.createdAt.toISOString(),
        modifiedTime: post.updatedAt.toISOString(),
        authors: [translation.author || 'LessonCraftStudio'],
        section: post.category || 'Education',
        tags: post.keywords || [],
        images: post.featuredImage ? [{
          url: `${baseUrl}${post.featuredImage}`,
          width: 1200,
          height: 630,
          alt: title
        }] : [],
      },
      // AUTOMATED: Twitter Card tags
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: post.featuredImage ? [`${baseUrl}${post.featuredImage}`] : [],
        creator: '@LessonCraftStudio', // TODO: Replace with actual Twitter handle
      },
      // AUTOMATED: Robots directives
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      // AUTOMATED: Additional meta tags
      other: {
        'article:author': translation.author || 'LessonCraftStudio',
        'article:published_time': post.createdAt.toISOString(),
        'article:modified_time': post.updatedAt.toISOString(),
        'article:section': post.category || 'Education',
        'article:tag': post.keywords?.join(',') || '',
      }
    };
  } catch (error) {
    return {
      title: slug.replace(/-/g, ' '),
      description: 'Blog post on LessonCraftStudio'
    };
  }
}