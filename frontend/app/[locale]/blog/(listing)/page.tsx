import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import BlogPageClient from './BlogPageClient';
import { getBlogPostsForLocale, getBlogCategoriesForLocale } from '@/lib/blog-data';
import Breadcrumb from '@/components/Breadcrumb';
import { getHreflangCode, ogLocaleMap, hreflangMap } from '@/lib/schema-generator';
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
      title: 'Teaching Resources & Worksheet Tips Blog | 100+ Expert Articles | LessonCraftStudio',
      description: 'Discover 100+ expert articles on teaching strategies, worksheet design tips, and free educational resources. Guides for teachers, parents, and homeschool educators.'
    },
    de: {
      title: 'Unterrichtsmaterialien & Arbeitsblatt-Tipps Blog | 100+ Fachartikel | LessonCraftStudio',
      description: 'Entdecken Sie 100+ Fachartikel zu Unterrichtsstrategien, Arbeitsblattgestaltung und kostenlose Bildungsressourcen. Anleitungen f\u00fcr Lehrer, Eltern und P\u00e4dagogen.'
    },
    fr: {
      title: 'Ressources P\u00e9dagogiques & Conseils Fiches Blog | 100+ Articles Experts | LessonCraftStudio',
      description: 'D\u00e9couvrez 100+ articles experts sur les strat\u00e9gies d\'enseignement, la conception de fiches et les ressources \u00e9ducatives gratuites. Guides pour enseignants et parents.'
    },
    es: {
      title: 'Recursos Did\u00e1cticos & Consejos Fichas Blog | 100+ Art\u00edculos Expertos | LessonCraftStudio',
      description: 'Descubra 100+ art\u00edculos expertos sobre estrategias de ense\u00f1anza, dise\u00f1o de fichas y recursos educativos gratuitos. Gu\u00edas para maestros y padres.'
    },
    pt: {
      title: 'Recursos Pedag\u00f3gicos & Dicas de Atividades Blog | 100+ Artigos Especializados | LessonCraftStudio',
      description: 'Descubra 100+ artigos especializados sobre estrat\u00e9gias de ensino, design de atividades e recursos educacionais gratuitos. Guias para professores e pais.'
    },
    it: {
      title: 'Risorse Didattiche & Consigli Schede Blog | 100+ Articoli Esperti | LessonCraftStudio',
      description: 'Scopri 100+ articoli esperti su strategie di insegnamento, progettazione di schede e risorse educative gratuite. Guide per insegnanti e genitori.'
    },
    nl: {
      title: 'Lesmateriaal & Werkblad Tips Blog | 100+ Deskundige Artikelen | LessonCraftStudio',
      description: 'Ontdek 100+ deskundige artikelen over onderwijsstrategie\u00ebn, werkbladontwerp en gratis educatieve bronnen. Gidsen voor leraren en ouders.'
    },
    sv: {
      title: 'Undervisningsmaterial & Arbetsbladstips Blogg | 100+ Expertartiklar | LessonCraftStudio',
      description: 'Uppt\u00e4ck 100+ expertartiklar om undervisningsstrategier, arbetsbladdesign och gratis utbildningsresurser. Guider f\u00f6r l\u00e4rare och f\u00f6r\u00e4ldrar.'
    },
    da: {
      title: 'Undervisningsmaterialer & Arbejdsark Tips Blog | 100+ Ekspertartikler | LessonCraftStudio',
      description: 'Opdag 100+ ekspertartikler om undervisningsstrategier, arbejdsarkdesign og gratis uddannelsesressourcer. Guider til l\u00e6rere og for\u00e6ldre.'
    },
    no: {
      title: 'Undervisningsressurser & Arbeidsark Tips Blogg | 100+ Ekspertartikler | LessonCraftStudio',
      description: 'Oppdag 100+ ekspertartikler om undervisningsstrategier, arbeidsarkdesign og gratis utdanningsressurser. Guider for l\u00e6rere og foreldre.'
    },
    fi: {
      title: 'Opetusmateriaalit & Ty\u00f6arkkivinkit Blogi | 100+ Asiantuntija-artikkelia | LessonCraftStudio',
      description: 'L\u00f6yd\u00e4 100+ asiantuntija-artikkelia opetusstrategioista, ty\u00f6arkkien suunnittelusta ja ilmaisista koulutusresursseista. Oppaita opettajille ja vanhemmille.'
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

  // Build hreflang alternates — only on page 1 (paginated pages should not have hreflang)
  const blogHreflangLanguages: Record<string, string> | undefined = currentPage === 1
    ? (() => {
        const langs: Record<string, string> = {};
        for (const loc of SUPPORTED_LOCALES) {
          const hreflangCode = hreflangMap[loc] || loc;
          langs[hreflangCode] = `${baseUrl}/${loc}/blog`;
        }
        langs['x-default'] = `${baseUrl}/en/blog`;
        return langs;
      })()
    : undefined;

  return {
    title: pageTitle,
    description: localeMeta.description,
    alternates: {
      canonical: canonicalUrl,
      ...(blogHreflangLanguages && { languages: blogHreflangLanguages }),
    },
    openGraph: {
      title: pageTitle,
      description: localeMeta.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l)
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: localeMeta.description,
    },
    other: otherLinks
  };
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blogPage' });
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Fetch blog posts and categories server-side (cached via ISR)
  let initialPosts: Awaited<ReturnType<typeof getBlogPostsForLocale>>;
  let initialCategories: ReturnType<typeof getBlogCategoriesForLocale>;
  try {
    [initialPosts, initialCategories] = await Promise.all([
      getBlogPostsForLocale(params.locale),
      Promise.resolve(getBlogCategoriesForLocale(params.locale))
    ]);
  } catch (err) {
    console.error(`Blog index error (locale=${params.locale}):`, err);
    initialPosts = [];
    initialCategories = [];
  }

  const totalPosts = initialPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Server-side pagination: only send current page's posts to client
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = initialPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

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
    "inLanguage": getHreflangCode(params.locale),
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
        initialPosts={paginatedPosts}
        initialCategories={initialCategories}
        initialPage={currentPage}
        totalPages={totalPages}
        totalPosts={totalPosts}
      />

      {/* Server-rendered article index for SEO crawlability - ensures every blog post
          has at least 1 inbound link visible in raw HTML (no JS required) */}
      {initialPosts.length > 0 && (
        <section className="py-8 bg-white border-t border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              {params.locale === 'de' ? 'Alle Artikel' :
               params.locale === 'fr' ? 'Tous les articles' :
               params.locale === 'es' ? 'Todos los art\u00edculos' :
               params.locale === 'it' ? 'Tutti gli articoli' :
               params.locale === 'pt' ? 'Todos os artigos' :
               params.locale === 'nl' ? 'Alle artikelen' :
               params.locale === 'sv' ? 'Alla artiklar' :
               params.locale === 'da' ? 'Alle artikler' :
               params.locale === 'no' ? 'Alle artikler' :
               params.locale === 'fi' ? 'Kaikki artikkelit' :
               'All Articles'}
            </h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-x-6">
              {initialPosts.map(post => (
                <Link
                  key={post.slug}
                  href={`/${params.locale}/blog/${post.slug}`}
                  className="block py-1.5 text-sm text-blue-700 hover:text-blue-900 hover:underline break-inside-avoid"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

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