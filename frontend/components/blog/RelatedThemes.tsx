/**
 * RelatedThemes - Pill-style theme links for blog pages
 *
 * Displays related worksheet theme pages on blog posts to create
 * bidirectional blog <-> theme cross-links (topical clusters).
 *
 * SEO Benefits:
 * - Creates hub-and-spoke topical clusters
 * - Improves internal link equity flow
 * - Zero additional DB queries (theme data is static)
 */

import Link from 'next/link';
import { getThemeContentWithFallback } from '@/content/themes/index';
import { getThemeSlug } from '@/config/theme-slugs';

interface RelatedThemesProps {
  themeIds: string[];
  locale: string;
}

// Localized section headings
const SECTION_HEADINGS: Record<string, string> = {
  en: 'Explore Worksheet Themes',
  de: 'Arbeitsblatt-Themen entdecken',
  fr: 'Explorer les th\u00e8mes de fiches',
  es: 'Explorar temas de fichas',
  pt: 'Explorar temas de fichas',
  it: 'Esplora i temi delle schede',
  nl: 'Ontdek werkbladthema\'s',
  sv: 'Utforska arbetsblad-teman',
  da: 'Udforsk arbejdsark-temaer',
  no: 'Utforsk arbeidsark-temaer',
  fi: 'Tutustu ty\u00f6arkkiteemoihin',
};

export default function RelatedThemes({ themeIds, locale }: RelatedThemesProps) {
  if (!themeIds || themeIds.length === 0) return null;

  // Resolve theme names and slugs
  const themeLinks = themeIds
    .map(themeId => {
      const content = getThemeContentWithFallback(themeId, locale);
      const slug = getThemeSlug(themeId, locale);
      if (!content || !slug) return null;
      return { id: themeId, name: content.name, slug };
    })
    .filter(Boolean) as Array<{ id: string; name: string; slug: string }>;

  if (themeLinks.length === 0) return null;

  const heading = SECTION_HEADINGS[locale] || SECTION_HEADINGS.en;

  return (
    <section
      aria-label={heading}
      style={{
        maxWidth: '1200px',
        margin: '48px auto',
        padding: '0 24px',
        textAlign: 'center',
      }}
    >
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        marginBottom: '24px',
        color: '#480005',
      }}>
        {heading}
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '12px',
      }}>
        {themeLinks.map(theme => (
          <Link
            key={theme.id}
            href={`/${locale}/worksheets/${theme.slug}`}
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              border: '2px solid #480005',
              borderRadius: '9999px',
              color: '#480005',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              backgroundColor: 'transparent',
            }}
          >
            {theme.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
