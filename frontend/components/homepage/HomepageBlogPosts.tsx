import Link from 'next/link';
import { prisma } from '@/lib/prisma';

interface HomepageBlogPostsProps {
  locale: string;
}

// Localized content for all 11 locales
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  readMore: string;
  viewAll: string;
}> = {
  en: {
    badge: 'From Our Blog',
    title: 'Teaching Tips & Resources',
    subtitle: 'Practical ideas and strategies for your classroom.',
    readMore: 'Read Article',
    viewAll: 'View All Articles',
  },
  de: {
    badge: 'Aus unserem Blog',
    title: 'Tipps & Ressourcen f\u00fcr den Unterricht',
    subtitle: 'Praktische Ideen und Strategien f\u00fcr Ihren Unterricht.',
    readMore: 'Artikel lesen',
    viewAll: 'Alle Artikel ansehen',
  },
  fr: {
    badge: 'Notre Blog',
    title: 'Conseils & Ressources P\u00e9dagogiques',
    subtitle: 'Des id\u00e9es pratiques et des strat\u00e9gies pour votre classe.',
    readMore: 'Lire l\u2019article',
    viewAll: 'Voir tous les articles',
  },
  es: {
    badge: 'Nuestro Blog',
    title: 'Consejos y Recursos Educativos',
    subtitle: 'Ideas pr\u00e1cticas y estrategias para tu aula.',
    readMore: 'Leer art\u00edculo',
    viewAll: 'Ver todos los art\u00edculos',
  },
  pt: {
    badge: 'Nosso Blog',
    title: 'Dicas e Recursos Educativos',
    subtitle: 'Ideias pr\u00e1ticas e estrat\u00e9gias para sua sala de aula.',
    readMore: 'Ler artigo',
    viewAll: 'Ver todos os artigos',
  },
  it: {
    badge: 'Dal Nostro Blog',
    title: 'Consigli e Risorse Didattiche',
    subtitle: 'Idee pratiche e strategie per la tua classe.',
    readMore: 'Leggi articolo',
    viewAll: 'Vedi tutti gli articoli',
  },
  nl: {
    badge: 'Ons Blog',
    title: 'Tips & Leermiddelen',
    subtitle: 'Praktische idee\u00ebn en strategie\u00ebn voor uw klas.',
    readMore: 'Lees artikel',
    viewAll: 'Bekijk alle artikelen',
  },
  sv: {
    badge: 'Fr\u00e5n v\u00e5r blogg',
    title: 'Tips & Resurser f\u00f6r Undervisning',
    subtitle: 'Praktiska id\u00e9er och strategier f\u00f6r ditt klassrum.',
    readMore: 'L\u00e4s artikel',
    viewAll: 'Se alla artiklar',
  },
  da: {
    badge: 'Fra vores blog',
    title: 'Undervisningstips & Ressourcer',
    subtitle: 'Praktiske id\u00e9er og strategier til dit klasselokale.',
    readMore: 'L\u00e6s artikel',
    viewAll: 'Se alle artikler',
  },
  no: {
    badge: 'Fra v\u00e5r blogg',
    title: 'Undervisningstips & Ressurser',
    subtitle: 'Praktiske id\u00e9er og strategier for ditt klasserom.',
    readMore: 'Les artikkel',
    viewAll: 'Se alle artikler',
  },
  fi: {
    badge: 'Blogistamme',
    title: 'Opetusvinkkej\u00e4 & Resursseja',
    subtitle: 'K\u00e4yt\u00e4nn\u00f6llisi\u00e4 ideoita ja strategioita luokkahuoneeseesi.',
    readMore: 'Lue artikkeli',
    viewAll: 'N\u00e4yt\u00e4 kaikki artikkelit',
  },
};

export default async function HomepageBlogPosts({ locale }: HomepageBlogPostsProps) {
  const content = localeContent[locale] || localeContent.en;

  let posts: Array<{
    slug: string;
    translations: any;
    featuredImage: string | null;
    category: string;
    createdAt: Date;
  }> = [];

  try {
    posts = await prisma.blogPost.findMany({
      where: { status: 'published' },
      select: {
        slug: true,
        translations: true,
        featuredImage: true,
        category: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });
  } catch {
    // Silent fallback - don't break homepage if blog DB fails
    return null;
  }

  if (posts.length === 0) return null;

  return (
    <section style={{
      padding: '80px 24px',
      backgroundColor: '#FAFAFA',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            display: 'inline-block',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            color: '#D6AC47',
            marginBottom: '12px',
          }}>
            {content.badge}
          </span>
          <h2 style={{
            fontSize: '36px',
            fontWeight: 700,
            color: '#480005',
            marginBottom: '12px',
            lineHeight: 1.2,
          }}>
            {content.title}
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            {content.subtitle}
          </p>
        </div>

        {/* Blog post cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          marginBottom: '40px',
        }}>
          {posts.filter((post) => {
            const translations = post.translations as any;
            const translation = translations[locale];
            return translation && translation.slug && translation.title;
          }).map((post) => {
            const translations = post.translations as any;
            const translation = translations[locale] || {};
            const postSlug = translation.slug;
            const title = translation.title || post.slug.replace(/-/g, ' ');
            const excerpt = translation.excerpt || '';
            // Truncate excerpt to ~120 chars
            const shortExcerpt = excerpt.length > 120
              ? excerpt.substring(0, 117).replace(/\s+\S*$/, '') + '...'
              : excerpt;

            return (
              <article
                key={post.slug}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #480005',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <Link
                  href={`/${locale}/blog/${postSlug}`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    color: 'inherit',
                  }}
                >
                  {/* Image */}
                  <div style={{
                    width: '100%',
                    height: '200px',
                    backgroundColor: '#f5f5f5',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={title}
                        width={600}
                        height={400}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                          objectFit: 'contain',
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(135deg, #480005 0%, #7a1a1f 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#D6AC47',
                        fontSize: '14px',
                        fontWeight: 600,
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                      }}>
                        LessonCraftStudio
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{
                      fontSize: '18px',
                      fontWeight: 600,
                      color: '#480005',
                      marginBottom: '8px',
                      lineHeight: 1.4,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {title}
                    </h3>
                    {shortExcerpt && (
                      <p style={{
                        fontSize: '14px',
                        color: '#6B7280',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                      }}>
                        {shortExcerpt}
                      </p>
                    )}
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#D6AC47',
                    }}>
                      {content.readMore} &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        {/* View All link */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href={`/${locale}/blog`}
            style={{
              display: 'inline-block',
              padding: '14px 36px',
              borderRadius: '10px',
              border: '2px solid #480005',
              color: '#480005',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
          >
            {content.viewAll}
          </Link>
        </div>
      </div>
    </section>
  );
}
