/**
 * RelatedBlogPosts - Server Component for Product Pages
 *
 * Displays related blog posts on product pages to improve internal linking
 * and guide users to educational content about the product.
 *
 * SEO Benefits:
 * - Increases internal link equity flow between products and content
 * - Improves user engagement and time on site
 * - Creates topical relevance signals for search engines
 *
 * Must be used in a server component (or via async data passing) since it
 * requires database access to fetch blog posts.
 */

import Link from 'next/link';
import type { SupportedLocale } from '@/config/product-page-slugs';

// Blog post data passed from server
export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string | null;
  category: string;
}

interface RelatedBlogPostsProps {
  locale: SupportedLocale;
  posts: BlogPostSummary[];
}

// Localized section titles
const SECTION_TITLES: Record<string, string> = {
  en: 'Learn More From Our Blog',
  de: 'Mehr erfahren in unserem Blog',
  fr: 'En savoir plus sur notre blog',
  es: 'Aprende mas en nuestro blog',
  it: 'Scopri di piu sul nostro blog',
  pt: 'Saiba mais no nosso blog',
  nl: 'Lees meer op onze blog',
  sv: 'Las mer pa var blogg',
  da: 'Laes mere pa vores blog',
  no: 'Les mer pa var blogg',
  fi: 'Lue lisaa blogistamme'
};

// Localized "Read article" labels
const READ_ARTICLE_LABELS: Record<string, string> = {
  en: 'Read Article',
  de: 'Artikel lesen',
  fr: 'Lire l\'article',
  es: 'Leer articulo',
  it: 'Leggi l\'articolo',
  pt: 'Ler artigo',
  nl: 'Lees artikel',
  sv: 'Las artikel',
  da: 'Laes artikel',
  no: 'Les artikkel',
  fi: 'Lue artikkeli'
};

// Localized "View all articles" labels
const VIEW_ALL_LABELS: Record<string, string> = {
  en: 'View All Blog Posts',
  de: 'Alle Blogbeitrage anzeigen',
  fr: 'Voir tous les articles',
  es: 'Ver todos los articulos',
  it: 'Vedi tutti gli articoli',
  pt: 'Ver todos os artigos',
  nl: 'Bekijk alle artikelen',
  sv: 'Visa alla artiklar',
  da: 'Se alle artikler',
  no: 'Se alle artikler',
  fi: 'Nayta kaikki artikkelit'
};

export default function RelatedBlogPosts({
  locale,
  posts
}: RelatedBlogPostsProps) {
  // Don't render if no posts found
  if (!posts || posts.length === 0) {
    return null;
  }

  const sectionTitle = SECTION_TITLES[locale] || SECTION_TITLES.en;
  const readArticleLabel = READ_ARTICLE_LABELS[locale] || READ_ARTICLE_LABELS.en;
  const viewAllLabel = VIEW_ALL_LABELS[locale] || VIEW_ALL_LABELS.en;

  return (
    <section
      aria-label={sectionTitle}
      style={{
        maxWidth: '1200px',
        margin: '64px auto',
        padding: '0 24px'
      }}
    >
      <h2 style={{
        fontSize: '32px',
        fontWeight: '700',
        marginBottom: '12px',
        textAlign: 'center',
        color: '#480005'
      }}>
        {sectionTitle}
      </h2>

      <p style={{
        fontSize: '16px',
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: '40px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {locale === 'en'
          ? 'Discover tips, tutorials, and teaching strategies.'
          : locale === 'de'
          ? 'Entdecke Tipps, Tutorials und Lehrstrategien.'
          : locale === 'fr'
          ? 'Decouvrez des conseils, tutoriels et strategies pedagogiques.'
          : locale === 'es'
          ? 'Descubre consejos, tutoriales y estrategias de ensenanza.'
          : locale === 'it'
          ? 'Scopri suggerimenti, tutorial e strategie didattiche.'
          : locale === 'pt'
          ? 'Descubra dicas, tutoriais e estrategias de ensino.'
          : locale === 'nl'
          ? 'Ontdek tips, handleidingen en onderwijsstrategieen.'
          : locale === 'sv'
          ? 'Upptack tips, handledningar och undervisningsstrategier.'
          : locale === 'da'
          ? 'Opdag tips, vejledninger og undervisningsstrategier.'
          : locale === 'no'
          ? 'Oppdag tips, veiledninger og undervisningsstrategier.'
          : locale === 'fi'
          ? 'Loyda vinkkeja, oppaita ja opetusstrategioita.'
          : 'Discover tips, tutorials, and teaching strategies.'
        }
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '32px',
        marginBottom: '40px'
      }}>
        {posts.map((post) => (
          <BlogPostCard
            key={post.slug}
            post={post}
            locale={locale}
            readArticleLabel={readArticleLabel}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          href={`/${locale}/blog`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#480005',
            border: '2px solid #480005',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}
        >
          {viewAllLabel}
          <span aria-hidden="true">&#8594;</span>
        </Link>
      </div>
    </section>
  );
}

/**
 * Individual blog post card component
 */
function BlogPostCard({
  post,
  locale,
  readArticleLabel
}: {
  post: BlogPostSummary;
  locale: string;
  readArticleLabel: string;
}) {
  return (
    <article
      style={{
        border: '2px solid #e5e7eb',
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor: '#ffffff',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Link
        href={`/${locale}/blog/${post.slug}`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          color: 'inherit'
        }}
      >
        {/* Featured Image */}
        <div style={{
          width: '100%',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          overflow: 'hidden'
        }}>
          {post.featuredImage ? (
            <img
              src={post.featuredImage}
              alt={post.title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          ) : (
            <span style={{ fontSize: '48px', opacity: 0.3 }}>&#128221;</span>
          )}
        </div>

        {/* Content */}
        <div style={{
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          flex: '1'
        }}>
          {/* Category badge */}
          <span style={{
            display: 'inline-block',
            fontSize: '11px',
            color: '#D6AC47',
            backgroundColor: '#fef9e7',
            padding: '4px 10px',
            borderRadius: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            marginBottom: '12px',
            alignSelf: 'flex-start'
          }}>
            {post.category}
          </span>

          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '8px',
            color: '#480005',
            lineHeight: '1.4'
          }}>
            {post.title}
          </h3>

          <p style={{
            fontSize: '14px',
            color: '#6B7280',
            marginBottom: '16px',
            lineHeight: '1.6',
            flex: '1',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {post.excerpt}
          </p>

          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#D6AC47',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {readArticleLabel}
            <span aria-hidden="true">&#8594;</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
