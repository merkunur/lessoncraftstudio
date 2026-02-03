import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import BlogPageClient from './BlogPageClient';
import { getBlogPostsForLocale, getBlogCategoriesForLocale } from '@/lib/blog-data';
import Breadcrumb from '@/components/Breadcrumb';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getRelatedProductsByCategory } from '@/lib/internal-linking';
import type { SupportedLocale } from '@/config/product-page-slugs';

// Enable ISR - revalidate every 30 minutes (reduced from 1 hour for faster updates)
export const revalidate = 1800;

const POSTS_PER_PAGE = 12;

interface BlogPageProps {
  params: {
    locale: string;
  };
  searchParams: {
    page?: string;
  };
}


// Generate metadata for SEO with pagination support
export async function generateMetadata({ params, searchParams }: BlogPageProps): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Fetch posts to calculate total pages
  const posts = await getBlogPostsForLocale(locale);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  // Localized titles and descriptions
  const metadata: Record<string, { title: string; description: string }> = {
    en: {
      title: 'Educational Blog - Teaching Resources & Worksheet Tips | LessonCraftStudio',
      description: 'Discover expert teaching strategies, worksheet design tips, and educational resources. Free guides for teachers, parents, and educators.'
    },
    de: {
      title: 'Bildungs-Blog - Unterrichtsmaterialien & Arbeitsblatt-Tipps | LessonCraftStudio',
      description: 'Entdecken Sie Expertentipps für Unterricht, Arbeitsblattgestaltung und Bildungsressourcen. Kostenlose Anleitungen für Lehrer, Eltern und Pädagogen.'
    },
    fr: {
      title: 'Blog Éducatif - Ressources Pédagogiques & Conseils | LessonCraftStudio',
      description: 'Découvrez des stratégies d\'enseignement expertes, des conseils de conception de feuilles de travail et des ressources éducatives. Guides gratuits pour enseignants et parents.'
    },
    es: {
      title: 'Blog Educativo - Recursos Didácticos & Consejos | LessonCraftStudio',
      description: 'Descubre estrategias de enseñanza expertas, consejos para diseñar hojas de trabajo y recursos educativos. Guías gratuitas para maestros y padres.'
    },
    pt: {
      title: 'Blog Educacional - Recursos Pedagógicos & Dicas | LessonCraftStudio',
      description: 'Descubra estratégias de ensino especializadas, dicas de design de planilhas e recursos educacionais. Guias gratuitos para professores e pais.'
    },
    it: {
      title: 'Blog Educativo - Risorse Didattiche & Consigli | LessonCraftStudio',
      description: 'Scopri strategie di insegnamento esperte, suggerimenti per la progettazione di schede e risorse educative. Guide gratuite per insegnanti e genitori.'
    },
    nl: {
      title: 'Educatieve Blog - Lesmateriaal & Werkblad Tips | LessonCraftStudio',
      description: 'Ontdek deskundige onderwijsstrategieën, werkbladontwerp tips en educatieve bronnen. Gratis gidsen voor leraren en ouders.'
    },
    sv: {
      title: 'Utbildningsblogg - Undervisningsmaterial & Arbetsbladstips | LessonCraftStudio',
      description: 'Upptäck expertstrategier för undervisning, tips för arbetsbladdesign och utbildningsresurser. Gratis guider för lärare och föräldrar.'
    },
    da: {
      title: 'Uddannelsesblog - Undervisningsmaterialer & Arbejdsark Tips | LessonCraftStudio',
      description: 'Opdag ekspertstrategier for undervisning, tips til arbejdsarksdesign og uddannelsesressourcer. Gratis guider til lærere og forældre.'
    },
    no: {
      title: 'Utdanningsblogg - Undervisningsressurser & Regneark Tips | LessonCraftStudio',
      description: 'Oppdag ekspertstrategier for undervisning, tips for regnearkdesign og utdanningsressurser. Gratis guider for lærere og foreldre.'
    },
    fi: {
      title: 'Koulutusblogi - Opetusmateriaalit & Työarkkivinkit | LessonCraftStudio',
      description: 'Löydä asiantuntijastrategioita opetukseen, työarkkien suunnitteluvinkkejä ja koulutusresursseja. Ilmaiset oppaat opettajille ja vanhemmille.'
    }
  };

  const localeMeta = metadata[locale] || metadata['en'];

  // Build canonical URL (page 1 has no query param)
  const canonicalUrl = currentPage === 1
    ? `${baseUrl}/${locale}/blog`
    : `${baseUrl}/${locale}/blog?page=${currentPage}`;

  // Build title with page number for pages > 1
  const pageTitle = currentPage > 1
    ? `${localeMeta.title} - Page ${currentPage}`
    : localeMeta.title;

  // Build other pagination links
  const otherLinks: Record<string, string> = {};
  if (currentPage > 1) {
    otherLinks.prev = currentPage === 2
      ? `${baseUrl}/${locale}/blog`
      : `${baseUrl}/${locale}/blog?page=${currentPage - 1}`;
  }
  if (currentPage < totalPages) {
    otherLinks.next = `${baseUrl}/${locale}/blog?page=${currentPage + 1}`;
  }

  // Generate hreflang alternates with proper regional codes (pt-BR, es-MX)
  const locales = SUPPORTED_LOCALES;
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of locales) {
    const hreflangCode = getHreflangCode(lang);
    hreflangAlternates[hreflangCode] = `${baseUrl}/${lang}/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`;
  }
  hreflangAlternates['x-default'] = `${baseUrl}/en/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`;

  return {
    title: pageTitle,
    description: localeMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: hreflangAlternates
    },
    openGraph: {
      title: pageTitle,
      description: localeMeta.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: locales.filter(l => l !== locale).map(l => ogLocaleMap[l] || l)
    },
    other: otherLinks
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blogPage' });
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Fetch blog posts and categories server-side (cached via ISR)
  const [initialPosts, initialCategories] = await Promise.all([
    getBlogPostsForLocale(params.locale),
    Promise.resolve(getBlogCategoriesForLocale(params.locale))
  ]);

  const totalPages = Math.ceil(initialPosts.length / POSTS_PER_PAGE);

  // Localized breadcrumb labels
  const breadcrumbLabels: Record<string, string> = {
    en: 'Blog',
    de: 'Blog',
    fr: 'Blog',
    es: 'Blog',
    pt: 'Blog',
    it: 'Blog',
    nl: 'Blog',
    sv: 'Blogg',
    da: 'Blog',
    no: 'Blogg',
    fi: 'Blogi'
  };

  // Prepare all translations for the client component
  const translations = {
    hero: {
      title: t('hero.title'),
      subtitle: t('hero.subtitle')
    },
    categories: {
      all: t('categories.all'),
      worksheetTips: t('categories.worksheetTips'),
      teachingResources: t('categories.teachingResources'),
      educationalActivities: t('categories.educationalActivities'),
      learningStrategies: t('categories.learningStrategies'),
      curriculumGuides: t('categories.curriculumGuides'),
      parentResources: t('categories.parentResources'),
      seasonalContent: t('categories.seasonalContent')
    },
    loading: {
      message: t('loading.message')
    },
    empty: {
      title: t('empty.title'),
      description: t('empty.description')
    },
    postCard: {
      pdfSamples: t('postCard.pdfSamples'),
      readTime: t('postCard.readTime')
    },
    pagination: {
      previous: t('pagination.previous'),
      next: t('pagination.next'),
      showing: t('pagination.showing'),
      of: t('pagination.of'),
      posts: t('pagination.posts')
    },
    newsletter: {
      title: t('newsletter.title'),
      subtitle: t('newsletter.subtitle'),
      emailPlaceholder: t('newsletter.emailPlaceholder'),
      subscribe: t('newsletter.subscribe'),
      noSpam: t('newsletter.noSpam')
    }
  };

  // Generate CollectionPage schema for blog listing (helps Google understand this is an article archive)
  const baseUrl = 'https://www.lessoncraftstudio.com';
  const localeMeta = {
    en: { name: 'Educational Blog', description: 'Teaching resources, worksheet tips, and educational guides for teachers and parents.' },
    de: { name: 'Bildungs-Blog', description: 'Unterrichtsmaterialien, Arbeitsblatt-Tipps und Bildungsleitfäden für Lehrer und Eltern.' },
    fr: { name: 'Blog Éducatif', description: 'Ressources pédagogiques, conseils et guides éducatifs pour enseignants et parents.' },
    es: { name: 'Blog Educativo', description: 'Recursos didácticos, consejos y guías educativas para maestros y padres.' },
    pt: { name: 'Blog Educacional', description: 'Recursos pedagógicos, dicas e guias educacionais para professores e pais.' },
    it: { name: 'Blog Educativo', description: 'Risorse didattiche, consigli e guide educative per insegnanti e genitori.' },
    nl: { name: 'Educatieve Blog', description: 'Lesmateriaal, werkbladtips en educatieve gidsen voor leraren en ouders.' },
    sv: { name: 'Utbildningsblogg', description: 'Undervisningsmaterial, arbetsbladstips och utbildningsguider för lärare och föräldrar.' },
    da: { name: 'Uddannelsesblog', description: 'Undervisningsmaterialer, arbejdsarkstips og uddannelsesguider til lærere og forældre.' },
    no: { name: 'Utdanningsblogg', description: 'Undervisningsressurser, arbeidsarktips og utdanningsguider for lærere og foreldre.' },
    fi: { name: 'Koulutusblogi', description: 'Opetusmateriaalit, työarkkivinkit ja koulutusoppaat opettajille ja vanhemmille.' }
  };

  const blogMeta = localeMeta[params.locale as keyof typeof localeMeta] || localeMeta.en;

  // Fetch featured products for the product showcase section (SEO internal linking)
  const featuredProducts = getRelatedProductsByCategory('teaching-resources', params.locale as SupportedLocale, 4);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": blogMeta.name,
    "description": blogMeta.description,
    "url": `${baseUrl}/${params.locale}/blog`,
    "isPartOf": {
      "@type": "WebSite",
      "name": "LessonCraftStudio",
      "url": baseUrl
    },
    "about": {
      "@type": "Thing",
      "name": "Educational Resources"
    },
    "inLanguage": params.locale,
    "numberOfItems": initialPosts.length,
    "provider": {
      "@type": "EducationalOrganization",
      "name": "LessonCraftStudio",
      "url": baseUrl
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <Breadcrumb
        locale={params.locale}
        items={[{ label: breadcrumbLabels[params.locale] || 'Blog' }]}
      />
      <BlogPageClient
        locale={params.locale}
        translations={translations}
        initialPosts={initialPosts}
        initialCategories={initialCategories}
        initialPage={currentPage}
        totalPages={totalPages}
      />

      {/* Product Showcase Section - SEO Internal Linking */}
      {featuredProducts.length > 0 && (
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-4 text-gray-900">
              {params.locale === 'de' ? 'Erstelle deine eigenen Arbeitsblätter' :
               params.locale === 'fr' ? 'Créez vos propres fiches' :
               params.locale === 'es' ? 'Crea tus propias fichas' :
               params.locale === 'it' ? 'Crea le tue schede' :
               params.locale === 'pt' ? 'Crie suas próprias fichas' :
               params.locale === 'nl' ? 'Maak je eigen werkbladen' :
               params.locale === 'sv' ? 'Skapa dina egna arbetsblad' :
               params.locale === 'da' ? 'Lav dine egne arbejdsark' :
               params.locale === 'no' ? 'Lag dine egne arbeidsark' :
               params.locale === 'fi' ? 'Luo omat työarkkisi' :
               'Create Your Own Worksheets'}
            </h2>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              {params.locale === 'de' ? 'Nutze unsere kostenlosen Arbeitsblatt-Generatoren um individuelle Lernmaterialien zu erstellen.' :
               params.locale === 'fr' ? 'Utilisez nos générateurs de fiches gratuits pour créer des matériaux pédagogiques personnalisés.' :
               params.locale === 'es' ? 'Usa nuestros generadores de fichas gratuitos para crear materiales educativos personalizados.' :
               params.locale === 'it' ? 'Usa i nostri generatori di schede gratuiti per creare materiali didattici personalizzati.' :
               params.locale === 'pt' ? 'Use nossos geradores de fichas gratuitos para criar materiais educacionais personalizados.' :
               params.locale === 'nl' ? 'Gebruik onze gratis werkbladgeneratoren om persoonlijke leermaterialen te maken.' :
               params.locale === 'sv' ? 'Använd våra gratis arbetsbladsgeneratorer för att skapa personliga läromedel.' :
               params.locale === 'da' ? 'Brug vores gratis arbejdsarkgeneratorer til at oprette personlige lærematerialer.' :
               params.locale === 'no' ? 'Bruk våre gratis arbeidsarkgeneratorer for å lage personlige læremateriell.' :
               params.locale === 'fi' ? 'Käytä ilmaisia työarkkigeneraattoreitamme henkilökohtaisten oppimateriaalien luomiseen.' :
               'Use our free worksheet generators to create custom educational materials.'}
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {featuredProducts.map((product) => (
                <Link
                  key={product.appId}
                  href={product.url}
                  className="bg-white rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <span className="text-4xl block mb-4">{product.icon}</span>
                  <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${params.locale}/apps`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                {params.locale === 'de' ? 'Alle 33 Generatoren anzeigen' :
                 params.locale === 'fr' ? 'Voir les 33 générateurs' :
                 params.locale === 'es' ? 'Ver los 33 generadores' :
                 params.locale === 'it' ? 'Vedi tutti i 33 generatori' :
                 params.locale === 'pt' ? 'Ver todos os 33 geradores' :
                 params.locale === 'nl' ? 'Bekijk alle 33 generatoren' :
                 params.locale === 'sv' ? 'Visa alla 33 generatorer' :
                 params.locale === 'da' ? 'Se alle 33 generatorer' :
                 params.locale === 'no' ? 'Se alle 33 generatorer' :
                 params.locale === 'fi' ? 'Näytä kaikki 33 generaattoria' :
                 'Browse All 33 Generators'}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}