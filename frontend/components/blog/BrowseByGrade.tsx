/**
 * BrowseByGrade - Grade hub pill links for blog pages
 *
 * Displays grade-level navigation pills and a worksheets hub link
 * at the bottom of every blog post. Provides inbound links to
 * grade hub pages and the worksheets hub.
 *
 * SEO Benefits:
 * - Creates inbound links to 5 grade hub pages + worksheets hub
 * - Improves internal link equity flow to landing pages
 * - Zero additional DB queries (grade data is static)
 */

import Link from 'next/link';
import { GRADE_IDS, getGradeSlug, gradeDisplayNames, gradeAgeRanges } from '@/config/grade-slugs';

interface BrowseByGradeProps {
  locale: string;
}

const SECTION_HEADINGS: Record<string, string> = {
  en: 'Find Worksheets by Grade',
  de: 'Arbeitsbl\u00e4tter nach Klassenstufe',
  fr: 'Fiches par niveau scolaire',
  es: 'Fichas por nivel escolar',
  pt: 'Atividades por s\u00e9rie escolar',
  it: 'Schede per livello scolastico',
  nl: 'Werkbladen per leerjaar',
  sv: 'Arbetsblad per \u00e5rskurs',
  da: 'Arbejdsark efter klassetrin',
  no: 'Arbeidsark etter klassetrinn',
  fi: 'Ty\u00f6arkit luokka-asteittain',
};

const BROWSE_ALL_LABEL: Record<string, string> = {
  en: 'Browse All 50 Worksheet Themes',
  de: 'Alle 50 Arbeitsblatt-Themen entdecken',
  fr: 'Parcourir les 50 th\u00e8mes de fiches',
  es: 'Explorar los 50 temas de fichas',
  pt: 'Explorar os 50 temas de atividades',
  it: 'Sfoglia tutti i 50 temi di schede',
  nl: 'Bekijk alle 50 werkbladthema\u0027s',
  sv: 'Bl\u00e4ddra bland alla 50 arbetsblad-teman',
  da: 'Udforsk alle 50 arbejdsark-temaer',
  no: 'Utforsk alle 50 arbeidsark-temaer',
  fi: 'Selaa kaikkia 50 ty\u00f6arkkiteemaa',
};

export default function BrowseByGrade({ locale }: BrowseByGradeProps) {
  const heading = SECTION_HEADINGS[locale] || SECTION_HEADINGS.en;
  const browseAllLabel = BROWSE_ALL_LABEL[locale] || BROWSE_ALL_LABEL.en;

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
        marginBottom: '20px',
      }}>
        {GRADE_IDS.map(gradeId => {
          const slug = getGradeSlug(gradeId, locale);
          const name = gradeDisplayNames[gradeId]?.[locale] || gradeDisplayNames[gradeId]?.en || gradeId;
          const ageRange = gradeAgeRanges[gradeId]?.[locale] || gradeAgeRanges[gradeId]?.en || '';
          if (!slug) return null;

          return (
            <Link
              key={gradeId}
              href={`/${locale}/apps/grades/${slug}`}
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
              {name} ({ageRange})
            </Link>
          );
        })}
      </div>

      <div>
        <Link
          href={`/${locale}/worksheets`}
          style={{
            color: '#480005',
            fontSize: '15px',
            fontWeight: '600',
            textDecoration: 'none',
            borderBottom: '2px solid #480005',
            paddingBottom: '2px',
          }}
        >
          {browseAllLabel} &rarr;
        </Link>
      </div>
    </section>
  );
}
