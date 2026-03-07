import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SUPPORTED_LOCALES } from '@/config/locales';
import {
  getToolConfigBySlug,
  getAllToolPageSlugs,
  getToolAlternateUrls,
  getToolSlugForLocale,
} from '@/config/tool-page-slugs';
import type { SupportedLocale } from '@/config/product-page-slugs';
import { ogLocaleMap, getHreflangCode, localizedHomeLabel } from '@/lib/schema-generator';
import { ALL_APPS, type AppId } from '@/config/warriorplus-products';
import { getLocalizedAppName } from '@/config/app-translations';
import { getToolContent } from '@/config/tool-content';
import { getSectionLabel } from '@/config/section-labels';
import YouTubeFacade from './YouTubeFacade';
import ReadMoreText from '@/components/ReadMoreText';

const baseUrl = 'https://www.lessoncraftstudio.com';

// Map tool slug appIds to warriorplus appIds where they differ
const toolToWpApp: Record<string, string> = {
  'word-search': 'wordsearch',
  'image-addition': 'addition',
  'matching-app': 'matching',
  'picture-bingo': 'bingo',
  'big-small-app': 'big-small',
  'chart-count-color': 'chart-count',
  'image-crossword': 'crossword',
  'image-cryptogram': 'cryptogram',
  'writing-app': 'writing',
};

function getWpAppId(slugAppId: string): AppId | null {
  const wpId = toolToWpApp[slugAppId] || slugAppId;
  if (wpId in ALL_APPS) return wpId as AppId;
  return null;
}

// Localized CTA strings for tool detail pages
const toolCta: Record<string, {
  tryFreeNow: string;
  tryFreeDesc: string;
  fallbackTitle: (name: string) => string;
  fallbackDesc: string;
  tryFreeWithWatermark: string;
  watermarkNote: string;
}> = {
  en: { tryFreeNow: 'Try Free Now', tryFreeDesc: 'Try it free with watermark. No signup required.', fallbackTitle: (n) => `Free Trial: ${n}`, fallbackDesc: 'Create professional worksheets instantly. No signup required.', tryFreeWithWatermark: 'Try Free with Watermark', watermarkNote: 'Free trial includes a small watermark. Purchase to remove.' },
  de: { tryFreeNow: 'Jetzt kostenlos testen', tryFreeDesc: 'Kostenlos mit Wasserzeichen testen. Keine Anmeldung erforderlich.', fallbackTitle: (n) => `Gratis testen: ${n}`, fallbackDesc: 'Professionelle Arbeitsbl\ätter sofort erstellen. Keine Anmeldung.', tryFreeWithWatermark: 'Gratis mit Wasserzeichen testen', watermarkNote: 'Die kostenlose Version enth\ält ein kleines Wasserzeichen. Kaufen Sie, um es zu entfernen.' },
  fr: { tryFreeNow: 'Essayer gratuitement', tryFreeDesc: 'Essayez gratuitement avec filigrane. Aucune inscription requise.', fallbackTitle: (n) => `Essai gratuit : ${n}`, fallbackDesc: 'Cr\éez des fiches professionnelles instantan\ément. Sans inscription.', tryFreeWithWatermark: 'Essai gratuit avec filigrane', watermarkNote: 'La version gratuite inclut un petit filigrane. Achetez pour le supprimer.' },
  es: { tryFreeNow: 'Probar gratis ahora', tryFreeDesc: 'Prueba gratis con marca de agua. Sin registro.', fallbackTitle: (n) => `Prueba gratis: ${n}`, fallbackDesc: 'Crea fichas profesionales al instante. Sin registro.', tryFreeWithWatermark: 'Probar gratis con marca de agua', watermarkNote: 'La versi\ón gratuita incluye una peque\ña marca de agua. Compra para eliminarla.' },
  pt: { tryFreeNow: 'Experimentar gr\átis', tryFreeDesc: 'Experimente gr\átis com marca d\’\água. Sem registo.', fallbackTitle: (n) => `Teste gr\átis: ${n}`, fallbackDesc: 'Crie fichas profissionais instantaneamente. Sem registo.', tryFreeWithWatermark: 'Testar gr\átis com marca d\’\água', watermarkNote: 'A vers\ão gratuita inclui uma pequena marca d\’\água. Compre para remover.' },
  it: { tryFreeNow: 'Prova gratis ora', tryFreeDesc: 'Prova gratis con filigrana. Nessuna registrazione richiesta.', fallbackTitle: (n) => `Prova gratis: ${n}`, fallbackDesc: 'Crea schede professionali all\’istante. Senza registrazione.', tryFreeWithWatermark: 'Prova gratis con filigrana', watermarkNote: 'La versione gratuita include una piccola filigrana. Acquista per rimuoverla.' },
  nl: { tryFreeNow: 'Gratis proberen', tryFreeDesc: 'Gratis proberen met watermerk. Geen registratie nodig.', fallbackTitle: (n) => `Gratis testen: ${n}`, fallbackDesc: 'Maak direct professionele werkbladen. Geen registratie.', tryFreeWithWatermark: 'Gratis proberen met watermerk', watermarkNote: 'De gratis versie bevat een klein watermerk. Koop om te verwijderen.' },
  sv: { tryFreeNow: 'Prova gratis nu', tryFreeDesc: 'Prova gratis med vattenst\ämpel. Ingen registrering kr\ävs.', fallbackTitle: (n) => `Prova gratis: ${n}`, fallbackDesc: 'Skapa professionella arbetsblad direkt. Ingen registrering.', tryFreeWithWatermark: 'Prova gratis med vattenst\ämpel', watermarkNote: 'Gratisversionen inkluderar en liten vattenst\ämpel. K\öp f\ör att ta bort.' },
  da: { tryFreeNow: 'Pr\øv gratis nu', tryFreeDesc: 'Pr\øv gratis med vandm\ærke. Ingen tilmelding kr\æves.', fallbackTitle: (n) => `Pr\øv gratis: ${n}`, fallbackDesc: 'Opret professionelle opgaveark med det samme. Ingen tilmelding.', tryFreeWithWatermark: 'Pr\øv gratis med vandm\ærke', watermarkNote: 'Gratisversionen indeholder et lille vandm\ærke. K\øb for at fjerne.' },
  no: { tryFreeNow: 'Pr\øv gratis n\å', tryFreeDesc: 'Pr\øv gratis med vannmerke. Ingen registrering kreves.', fallbackTitle: (n) => `Pr\øv gratis: ${n}`, fallbackDesc: 'Lag profesjonelle oppgaveark med en gang. Ingen registrering.', tryFreeWithWatermark: 'Pr\øv gratis med vannmerke', watermarkNote: 'Gratisversjonen inkluderer et lite vannmerke. Kj\øp for \å fjerne.' },
  fi: { tryFreeNow: 'Kokeile ilmaiseksi nyt', tryFreeDesc: 'Kokeile ilmaiseksi vesileimalla. Ei rekister\öitymist\ä.', fallbackTitle: (n) => `Kokeile ilmaiseksi: ${n}`, fallbackDesc: 'Luo ammattimaisia teht\ävi\ä heti. Ei rekister\öitymist\ä.', tryFreeWithWatermark: 'Kokeile ilmaiseksi vesileimalla', watermarkNote: 'Ilmainen versio sis\ält\ä\ä pienen vesileiman. Osta poistaaksesi.' },
};

const toolsLabel: Record<string, string> = {
  en: 'Tools', de: 'Tools', fr: 'Outils', es: 'Herramientas', pt: 'Ferramentas',
  it: 'Strumenti', nl: 'Tools', sv: 'Verktyg', da: 'V\ærkt\øjer', no: 'Verkt\øy', fi: 'Ty\ökalut',
};

export const revalidate = 3600;

export async function generateStaticParams() {
  return getAllToolPageSlugs().map(({ locale, slug }) => ({ locale, slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  try {
    const locale = params.locale as SupportedLocale;
    const slug = params.slug;

    const toolConfig = getToolConfigBySlug(slug);
    if (!toolConfig) return {};

    const wpAppId = getWpAppId(toolConfig.toolId);
    if (!wpAppId) return {};

    const content = await getToolContent(toolConfig.toolId, locale);
    const localizedName = getLocalizedAppName(wpAppId, locale);
    const alternateUrls = getToolAlternateUrls(toolConfig.toolId, baseUrl);
    const localeSlug = getToolSlugForLocale(toolConfig.toolId, locale);

    const title = content?.seo?.titleTag || `Free ${localizedName} | LessonCraftStudio`;
    const description = content?.seo?.metaDescription || `Try ${localizedName} free online. No signup required.`;

    const keywords = content?.seo?.primaryKeyword
      ? [content.seo.primaryKeyword, ...content.seo.secondaryKeywords, ...content.seo.lsiKeywords]
      : undefined;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: `${baseUrl}/${locale}/tools/${localeSlug || slug}`,
        languages: alternateUrls,
      },
      openGraph: {
        title,
        description,
        type: 'website',
        url: `${baseUrl}/${locale}/tools/${localeSlug || slug}`,
        siteName: 'LessonCraftStudio',
        locale: ogLocaleMap[locale] || locale,
        alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      },
      robots: content ? undefined : { index: false },
    };
  } catch {
    return {};
  }
}

export default async function ToolPage({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = params.locale as SupportedLocale;
  const slug = params.slug;

  const toolConfig = getToolConfigBySlug(slug);
  if (!toolConfig) notFound();

  const wpAppId = getWpAppId(toolConfig.toolId);
  if (!wpAppId) notFound();

  const appData = ALL_APPS[wpAppId];
  if (!appData) notFound();

  const content = await getToolContent(toolConfig.toolId, locale);
  const localizedName = getLocalizedAppName(wpAppId, locale);
  const localeSlug = getToolSlugForLocale(toolConfig.toolId, locale);
  const cta = toolCta[locale] || toolCta.en;

  // App launch URL
  const htmlFile = appData.htmlFile || `${wpAppId}.html`;
  const launchUrl = `/worksheet-generators/${htmlFile}`;

  // JSON-LD schemas
  const pageUrl = `${baseUrl}/${locale}/tools/${localeSlug || slug}`;
  const schemas: any[] = [];

  // SoftwareApplication schema
  const softwareSchema: any = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": localizedName,
    "url": pageUrl,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web Browser",
    "inLanguage": getHreflangCode(locale),
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": cta.tryFreeDesc,
    },
    "provider": {
      "@type": "Organization",
      "name": "LessonCraftStudio",
      "url": baseUrl,
    },
  };
  if (content?.hero?.description) {
    softwareSchema.description = content.hero.description;
  }
  schemas.push(softwareSchema);

  // BreadcrumbList schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": localizedHomeLabel[locale] || "Home",
        "item": `${baseUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": toolsLabel[locale] || "Tools",
        "item": `${baseUrl}/${locale}/tools`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": localizedName,
      },
    ],
  });

  // FAQPage schema (when FAQ content exists)
  if (content?.faq && content.faq.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": content.faq.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    });
  }

  // If enriched content exists, render full page
  if (content) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* JSON-LD Structured Data */}
        {schemas.map((schema, i) => (
          <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        ))}

        {/* Hero */}
        <section className="py-12 md:py-20 bg-gradient-to-b from-indigo-50 to-white">
          <div className="container mx-auto px-4 max-w-4xl">
            {content.visuals?.heroImages?.primary && (
              <img
                src={content.visuals.heroImages.primary}
                alt={content.visuals.heroImages.primaryAlt}
                className="w-full max-w-2xl mx-auto rounded-xl shadow-lg mb-8"
                loading="eager"
              />
            )}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.hero.title}
            </h1>
            <p className="text-indigo-600 font-medium mb-2">{content.hero.tagline}</p>
            <p className="text-lg text-gray-600 mb-8">{content.hero.description}</p>
            <a
              href={launchUrl}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {cta.tryFreeNow}
            </a>
          </div>
        </section>

        {/* Video Tutorial */}
        {content.visuals?.youtubeId && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {content.visuals.videoTitle}
              </h2>
              <YouTubeFacade
                youtubeId={content.visuals.youtubeId}
                title={content.visuals.videoTitle}
              />
            </div>
          </section>
        )}

        {/* How It Works */}
        {content.tutorial && content.tutorial.steps.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{content.tutorial.title}</h2>
              <div className="space-y-6">
                {content.tutorial.steps.map((step, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-gray-600 mt-1">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Sample Gallery */}
        {content.visuals?.sampleGallery && content.visuals.sampleGallery.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('sampleWorksheets', locale)}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {content.visuals.sampleGallery.map((img, i) => (
                  <figure key={i} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    {img.caption && (
                      <figcaption className="p-3 text-sm text-gray-600 bg-gray-50">{img.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Product Examples */}
        {content.whatYouCanCreate && content.whatYouCanCreate.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('whatYouCanCreate', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.whatYouCanCreate.map((example, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">{example.title}</h3>
                    <ReadMoreText text={example.description} locale={locale} className="text-gray-600 text-sm" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Business Ideas */}
        {content.businessIdeas && content.businessIdeas.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('businessIdeas', locale)}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.businessIdeas.map((idea, i) => (
                  <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">{idea.title}</h3>
                    <ReadMoreText text={idea.description} locale={locale} className="text-gray-600 text-sm" />
                    {idea.platform && (
                      <span className="inline-block mt-2 text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                        {idea.platform}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Pro Tips */}
        {content.proTips && content.proTips.length > 0 && (
          <section className="py-12 md:py-16 bg-amber-50">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('proTips', locale)}</h2>
              <div className="space-y-4">
                {content.proTips.map((tip, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-white rounded-lg border border-amber-200">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      <ReadMoreText text={tip.description} locale={locale} className="text-gray-600 mt-1 text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        {content.faq && content.faq.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">{getSectionLabel('faq', locale)}</h2>
              <div className="space-y-4">
                {content.faq.map((faq, i) => (
                  <details key={i} className="group border border-gray-200 rounded-lg">
                    <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900">
                      {faq.question}
                      <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <div className="px-4 pb-4 text-gray-600">{faq.answer}</div>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Internal Links */}
        {content.internalLinks && content.internalLinks.length > 0 && (
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{getSectionLabel('related', locale)}</h2>
              <div className="flex flex-wrap gap-3">
                {content.internalLinks.map((link, i) => (
                  <Link
                    key={i}
                    href={`/${locale}/${link.pageType === 'app' ? 'apps' : link.pageType === 'tool' ? 'tools' : link.pageType === 'bundle' ? 'bundles' : link.pageType === 'start' ? 'start' : link.pageType === 'guide' ? 'guides' : 'ideas'}/${link.slug}`}
                    className="text-sm text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full"
                  >
                    {link.anchorText}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section className="py-12 md:py-16 bg-indigo-600">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">{localizedName}</h2>
            <p className="text-indigo-100 mb-8 max-w-lg mx-auto">{cta.tryFreeDesc}</p>
            <a
              href={launchUrl}
              className="inline-flex items-center px-8 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-colors"
            >
              {cta.tryFreeNow}
            </a>
          </div>
        </section>
      </div>
    );
  }

  // Fallback: minimal page when content file doesn't exist yet
  return (
    <div className="min-h-screen bg-gray-50">
      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {cta.fallbackTitle(localizedName)}
          </h1>
          <p className="text-gray-600 mb-8">
            {cta.fallbackDesc}
          </p>
          <a
            href={launchUrl}
            className="inline-flex items-center px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
          >
            {cta.tryFreeWithWatermark}
          </a>
          <p className="mt-4 text-sm text-gray-500">
            {cta.watermarkNote}
          </p>
        </div>
      </section>
    </div>
  );
}
