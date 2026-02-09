/**
 * RelatedProducts - Server Component for Blog Pages
 *
 * Displays related worksheet generator products on blog pages
 * to improve internal linking and guide users to relevant tools.
 *
 * SEO Benefits:
 * - Increases internal link equity flow between content and products
 * - Improves user engagement and time on site
 * - Creates topical relevance signals for search engines
 */

import Link from 'next/link';
import {
  getRelatedProducts,
  extractKeywordsFromContent,
  type RelatedProduct
} from '@/lib/internal-linking';
import type { SupportedLocale } from '@/config/product-page-slugs';

interface RelatedProductsProps {
  locale: SupportedLocale;
  category: string;
  htmlContent?: string;
  keywords?: string[];
  limit?: number;
}

// Localized section titles
const SECTION_TITLES: Record<string, string> = {
  en: 'Create Your Own Worksheets',
  de: 'Erstelle deine eigenen Arbeitsblatter',
  fr: 'Creez vos propres fiches',
  es: 'Crea tus propias fichas',
  it: 'Crea le tue schede',
  pt: 'Crie suas proprias fichas',
  nl: 'Maak je eigen werkbladen',
  sv: 'Skapa dina egna arbetsblad',
  da: 'Lav dine egne arbejdsark',
  no: 'Lag dine egne arbeidsark',
  fi: 'Luo omat tyoarkkisi'
};

// Localized "Try it free" labels
const TRY_FREE_LABELS: Record<string, string> = {
  en: 'Try Free',
  de: 'Kostenlos testen',
  fr: 'Essayer gratuitement',
  es: 'Probar gratis',
  it: 'Prova gratis',
  pt: 'Experimentar gratis',
  nl: 'Gratis proberen',
  sv: 'Prova gratis',
  da: 'Prov gratis',
  no: 'Prov gratis',
  fi: 'Kokeile ilmaiseksi'
};

// Localized "View all tools" labels
const VIEW_ALL_LABELS: Record<string, string> = {
  en: 'View All Worksheet Generators',
  de: 'Alle Arbeitsblatt-Generatoren anzeigen',
  fr: 'Voir tous les generateurs de fiches',
  es: 'Ver todos los generadores de fichas',
  it: 'Visualizza tutti i generatori di schede',
  pt: 'Ver todos os geradores de fichas',
  nl: 'Bekijk alle werkbladgeneratoren',
  sv: 'Visa alla arbetsbladsgeneratorer',
  da: 'Se alle arbejdsarkgeneratorer',
  no: 'Se alle arbeidsarkgeneratorer',
  fi: 'Nayta kaikki tyoarkki generaattorit'
};

export default function RelatedProducts({
  locale,
  category,
  htmlContent = '',
  keywords = [],
  limit = 4
}: RelatedProductsProps) {
  // Extract keywords from content if not provided (pass locale for multilingual support)
  const extractedKeywords = keywords.length > 0
    ? keywords
    : extractKeywordsFromContent(htmlContent, locale);

  // Get related products based on keywords and category
  const products = getRelatedProducts(
    extractedKeywords,
    category,
    locale,
    limit
  );

  // Don't render if no products found
  if (products.length === 0) {
    return null;
  }

  const sectionTitle = SECTION_TITLES[locale] || SECTION_TITLES.en;
  const tryFreeLabel = TRY_FREE_LABELS[locale] || TRY_FREE_LABELS.en;
  const viewAllLabel = VIEW_ALL_LABELS[locale] || VIEW_ALL_LABELS.en;

  return (
    <section
      aria-label={sectionTitle}
      style={{
        maxWidth: '1200px',
        margin: '48px auto',
        padding: '32px 24px',
        backgroundColor: '#f8f9fa',
        borderRadius: '16px'
      }}
    >
      <h2 style={{
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '8px',
        textAlign: 'center',
        color: '#1a1a2e'
      }}>
        {sectionTitle}
      </h2>

      <p style={{
        fontSize: '16px',
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: '32px',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        {locale === 'en'
          ? 'Use our free worksheet generators to create custom educational materials.'
          : locale === 'de'
          ? 'Nutze unsere kostenlosen Arbeitsblatt-Generatoren.'
          : locale === 'fr'
          ? 'Utilisez nos generateurs de fiches gratuits.'
          : locale === 'es'
          ? 'Usa nuestros generadores de fichas gratuitos.'
          : locale === 'it'
          ? 'Usa i nostri generatori di schede gratuiti.'
          : locale === 'pt'
          ? 'Use nossos geradores de fichas gratuitos.'
          : locale === 'nl'
          ? 'Gebruik onze gratis werkbladgeneratoren.'
          : locale === 'sv'
          ? 'Anvand vara gratis arbetsbladsgeneratorer.'
          : locale === 'da'
          ? 'Brug vores gratis arbejdsarkgeneratorer.'
          : locale === 'no'
          ? 'Bruk vare gratis arbeidsarkgeneratorer.'
          : locale === 'fi'
          ? 'Kayta ilmaisia tyoarkki generaattoreitamme.'
          : 'Use our free worksheet generators to create custom educational materials.'
        }
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '32px'
      }}>
        {products.map((product) => (
          <ProductCard
            key={product.appId}
            product={product}
            tryFreeLabel={tryFreeLabel}
          />
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          href={`/${locale}/apps`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: '#480005',
            color: '#ffffff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '15px',
            fontWeight: '600',
            transition: 'background-color 0.2s ease'
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
 * Individual product card component
 */
function ProductCard({
  product,
  tryFreeLabel
}: {
  product: RelatedProduct;
  tryFreeLabel: string;
}) {
  return (
    <article
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <div style={{
        fontSize: '40px',
        marginBottom: '16px',
        textAlign: 'center'
      }}>
        {product.icon}
      </div>

      <h3 style={{
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '8px',
        color: '#1a1a2e',
        textAlign: 'center'
      }}>
        {product.name}
      </h3>

      <p style={{
        fontSize: '14px',
        color: '#6B7280',
        marginBottom: '16px',
        textAlign: 'center',
        lineHeight: '1.5',
        flex: '1'
      }}>
        {product.description}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        marginTop: 'auto'
      }}>
        <Link
          href={product.url}
          aria-label={`${tryFreeLabel} – ${product.name}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '10px 20px',
            backgroundColor: '#D6AC47',
            color: '#480005',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'background-color 0.2s ease'
          }}
        >
          {tryFreeLabel}
        </Link>
      </div>

      {/* Category badge */}
      <div style={{
        marginTop: '12px',
        textAlign: 'center'
      }}>
        <span style={{
          display: 'inline-block',
          fontSize: '11px',
          color: '#9CA3AF',
          backgroundColor: '#f3f4f6',
          padding: '4px 10px',
          borderRadius: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {product.category}
        </span>
      </div>
    </article>
  );
}
