/**
 * BlogSampleGallery - Server Component
 *
 * Displays 3 relevant sample images between blog body content and RelatedProducts.
 * Uses WebP thumbnails for fast loading with lazy loading and fixed dimensions to prevent CLS.
 * Includes ImageObject JSON-LD schema per image for SEO.
 */

import Link from 'next/link';
import { getHreflangCode } from '@/lib/schema-generator';

interface BlogSampleItem {
  worksheetSrc: string;
  thumbSrc: string;
  productUrl: string;
  productName: string;
  appId: string;
}

interface BlogSampleGalleryProps {
  locale: string;
  samples: BlogSampleItem[];
  blogSlug: string;
  focusKeyword?: string;
  category?: string;
}

const SECTION_TITLES: Record<string, string> = {
  en: 'Worksheet Samples',
  de: 'Arbeitsblatt-Beispiele',
  fr: 'Exemples de fiches',
  es: 'Ejemplos de fichas',
  pt: 'Exemplos de fichas',
  it: 'Esempi di schede',
  nl: 'Werkblad-voorbeelden',
  sv: 'Arbetsbladsexempel',
  da: 'Arbejdsark-eksempler',
  no: 'Arbeidsark-eksempler',
  fi: 'Teht\u00e4v\u00e4esimerkit',
};

const SUBTITLE_TEXT: Record<string, string> = {
  en: 'Browse free printable worksheets from our collection. Click any sample to explore more on the product page.',
  de: 'St\u00f6bere in unseren kostenlosen druckbaren Arbeitsbl\u00e4ttern. Klicke auf ein Beispiel, um mehr auf der Produktseite zu entdecken.',
  fr: 'Parcourez nos fiches imprimables gratuites. Cliquez sur un exemple pour en d\u00e9couvrir plus sur la page produit.',
  es: 'Explora fichas imprimibles gratuitas de nuestra colecci\u00f3n. Haz clic en un ejemplo para ver m\u00e1s en la p\u00e1gina del producto.',
  pt: 'Explore fichas imprim\u00edveis gratuitas da nossa cole\u00e7\u00e3o. Clique em um exemplo para ver mais na p\u00e1gina do produto.',
  it: 'Sfoglia le nostre schede stampabili gratuite. Clicca su un esempio per scoprire di pi\u00f9 nella pagina del prodotto.',
  nl: 'Blader door gratis afdrukbare werkbladen uit onze collectie. Klik op een voorbeeld om meer te ontdekken op de productpagina.',
  sv: 'Bl\u00e4ddra bland gratis utskrivbara arbetsblad fr\u00e5n v\u00e5r samling. Klicka p\u00e5 ett exempel f\u00f6r att utforska mer p\u00e5 produktsidan.',
  da: 'Gennemse gratis udskrivbare arbejdsark fra vores samling. Klik p\u00e5 et eksempel for at udforske mere p\u00e5 produktsiden.',
  no: 'Bla gjennom gratis utskrivbare arbeidsark fra v\u00e5r samling. Klikk p\u00e5 et eksempel for \u00e5 utforske mer p\u00e5 produktsiden.',
  fi: 'Selaa ilmaisia tulostettavia teht\u00e4vi\u00e4 kokoelmastamme. Napsauta esimerkki\u00e4 n\u00e4hd\u00e4ksesi lis\u00e4\u00e4 tuotesivulla.',
};

const SAMPLE_LABEL: Record<string, string> = {
  en: 'Free printable worksheet',
  de: 'Kostenloses druckbares Arbeitsblatt',
  fr: 'Fiche imprimable gratuite',
  es: 'Ficha imprimible gratuita',
  pt: 'Ficha imprim\u00edvel gratuita',
  it: 'Scheda stampabile gratuita',
  nl: 'Gratis afdrukbaar werkblad',
  sv: 'Gratis utskrivbart arbetsblad',
  da: 'Gratis udskrivbart arbejdsark',
  no: 'Gratis utskrivbart arbeidsark',
  fi: 'Ilmainen tulostettava teht\u00e4v\u00e4',
};

const TRY_WORKSHEET_LABELS: Record<string, string> = {
  en: 'Create your own',
  de: 'Eigenes erstellen',
  fr: 'Cr\u00e9er le v\u00f4tre',
  es: 'Crea el tuyo',
  pt: 'Crie o seu',
  it: 'Crea il tuo',
  nl: 'Maak je eigen',
  sv: 'Skapa ditt eget',
  da: 'Lav dit eget',
  no: 'Lag ditt eget',
  fi: 'Luo omasi',
};

const ALT_TEXT_TEMPLATES: Record<string, string> = {
  en: '{appName} \u2014 free printable worksheet sample',
  de: '{appName} \u2014 kostenloses druckbares Arbeitsblatt',
  fr: '{appName} \u2014 fiche imprimable gratuite',
  es: '{appName} \u2014 ficha imprimible gratuita',
  pt: '{appName} \u2014 ficha imprim\u00edvel gratuita',
  it: '{appName} \u2014 scheda stampabile gratuita',
  nl: '{appName} \u2014 gratis afdrukbaar werkblad',
  sv: '{appName} \u2014 gratis utskrivbart arbetsblad',
  da: '{appName} \u2014 gratis udskrivbart arbejdsark',
  no: '{appName} \u2014 gratis utskrivbart arbeidsark',
  fi: '{appName} \u2014 ilmainen tulostettava teht\u00e4v\u00e4',
};

const SCHEMA_DESCRIPTION: Record<string, { withKeyword: string; withoutKeyword: string }> = {
  en: { withKeyword: '{keyword} - {appName} worksheet sample', withoutKeyword: '{appName} - free printable worksheet sample' },
  de: { withKeyword: '{keyword} - {appName} Arbeitsblatt-Beispiel', withoutKeyword: '{appName} - kostenloses druckbares Arbeitsblatt' },
  fr: { withKeyword: '{keyword} - {appName} exemple de fiche', withoutKeyword: '{appName} - fiche imprimable gratuite' },
  es: { withKeyword: '{keyword} - {appName} ejemplo de ficha', withoutKeyword: '{appName} - ficha imprimible gratuita' },
  pt: { withKeyword: '{keyword} - {appName} exemplo de ficha', withoutKeyword: '{appName} - ficha imprim\u00edvel gratuita' },
  it: { withKeyword: '{keyword} - {appName} esempio di scheda', withoutKeyword: '{appName} - scheda stampabile gratuita' },
  nl: { withKeyword: '{keyword} - {appName} werkblad-voorbeeld', withoutKeyword: '{appName} - gratis afdrukbaar werkblad' },
  sv: { withKeyword: '{keyword} - {appName} arbetsbladsexempel', withoutKeyword: '{appName} - gratis utskrivbart arbetsblad' },
  da: { withKeyword: '{keyword} - {appName} arbejdsark-eksempel', withoutKeyword: '{appName} - gratis udskrivbart arbejdsark' },
  no: { withKeyword: '{keyword} - {appName} arbeidsark-eksempel', withoutKeyword: '{appName} - gratis utskrivbart arbeidsark' },
  fi: { withKeyword: '{keyword} - {appName} teht\u00e4v\u00e4esimerkki', withoutKeyword: '{appName} - ilmainen tulostettava teht\u00e4v\u00e4' },
};

function generateAltText(appName: string, locale: string): string {
  const template = ALT_TEXT_TEMPLATES[locale] || ALT_TEXT_TEMPLATES.en;
  return template.replace('{appName}', appName);
}

function generateSchemaDescription(appName: string, locale: string, focusKeyword?: string): string {
  const templates = SCHEMA_DESCRIPTION[locale] || SCHEMA_DESCRIPTION.en;
  if (focusKeyword) {
    return templates.withKeyword.replace('{keyword}', focusKeyword).replace('{appName}', appName);
  }
  return templates.withoutKeyword.replace('{appName}', appName);
}

export default function BlogSampleGallery({
  locale,
  samples,
  blogSlug,
  focusKeyword,
  category,
}: BlogSampleGalleryProps) {
  if (samples.length === 0) return null;

  const sectionTitle = SECTION_TITLES[locale] || SECTION_TITLES.en;
  const subtitle = SUBTITLE_TEXT[locale] || SUBTITLE_TEXT.en;
  const sampleLabel = SAMPLE_LABEL[locale] || SAMPLE_LABEL.en;
  const tryLabel = TRY_WORKSHEET_LABELS[locale] || TRY_WORKSHEET_LABELS.en;

  const baseUrl = 'https://www.lessoncraftstudio.com';

  return (
    <>
      {/* ImageObject JSON-LD schemas */}
      {samples.map((sample, index) => {
        const schema = {
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          '@id': `${baseUrl}${sample.worksheetSrc}#imageobject`,
          name: `${sample.productName} - ${sampleLabel} ${index + 1}`,
          caption: `${sampleLabel} - ${sample.productName}`,
          contentUrl: `${baseUrl}${sample.worksheetSrc}`,
          thumbnailUrl: `${baseUrl}${sample.thumbSrc}`,
          description: generateSchemaDescription(sample.productName, locale, focusKeyword),
          width: 2480,
          height: 3508,
          encodingFormat: 'image/jpeg',
          thumbnail: {
            '@type': 'ImageObject',
            contentUrl: `${baseUrl}${sample.thumbSrc}`,
            encodingFormat: 'image/webp',
            width: 400,
            height: 566,
          },
          inLanguage: getHreflangCode(locale),
          representativeOfPage: false,
          isPartOf: {
            '@type': 'BlogPosting',
            '@id': `${baseUrl}/${locale}/blog/${blogSlug}#article`,
          },
          creator: {
            '@type': 'Organization',
            name: 'LessonCraftStudio',
          },
        };
        return (
          <script
            key={`schema-${sample.appId}-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        );
      })}

      <section
        id="blog-sample-gallery"
        aria-label={sectionTitle}
        style={{
          maxWidth: '1200px',
          margin: '48px auto',
          padding: '40px 24px',
          backgroundColor: '#f8f9fa',
          borderRadius: '16px',
        }}
      >
        <h2 style={{
          fontSize: '28px',
          fontWeight: 700,
          marginBottom: '8px',
          textAlign: 'center',
          color: '#1a1a2e',
        }}>
          {sectionTitle}
        </h2>

        <p style={{
          fontSize: '15px',
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: '36px',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: 1.6,
        }}>
          {subtitle}
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {samples.map((sample, index) => (
            <figure
              key={`${sample.appId}-${index}`}
              style={{
                margin: 0,
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Link
                href={sample.productUrl}
                title={sample.productName}
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                <div style={{
                  position: 'relative',
                  backgroundColor: '#f3f4f6',
                  overflow: 'hidden',
                }}>
                  <img
                    src={sample.thumbSrc}
                    alt={generateAltText(sample.productName, locale)}
                    width={400}
                    height={566}
                    loading="lazy"
                    decoding="async"
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      aspectRatio: '400 / 566',
                      objectFit: 'cover',
                    }}
                  />
                </div>

                <figcaption style={{
                  padding: '16px',
                  textAlign: 'center',
                }}>
                  <span style={{
                    display: 'block',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1a1a2e',
                    marginBottom: '4px',
                  }}>
                    {sample.productName}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#9CA3AF',
                    marginBottom: '12px',
                  }}>
                    {sampleLabel}
                  </span>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 18px',
                    backgroundColor: '#D6AC47',
                    color: '#480005',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: 600,
                    transition: 'background-color 0.2s ease',
                  }}>
                    {tryLabel}
                    <span aria-hidden="true">&#8594;</span>
                  </span>
                </figcaption>
              </Link>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
