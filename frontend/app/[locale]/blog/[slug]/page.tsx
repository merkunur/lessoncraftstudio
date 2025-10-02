import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';

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

  // Render the extracted content with inline styles, PDFs after header, and related posts before footer
  return (
    <>
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
            Sample Worksheets
          </h2>
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

// Metadata generation
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { locale, slug } = params;

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
        images: post.featuredImage ? [post.featuredImage] : [],
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