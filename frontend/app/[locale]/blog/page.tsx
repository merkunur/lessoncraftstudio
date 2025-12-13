import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import { getBlogPostsForLocale, getBlogCategoriesForLocale } from '@/lib/blog-data';
import Breadcrumb from '@/components/Breadcrumb';

// Enable ISR - revalidate every hour for fast language switching
export const revalidate = 3600;

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
  const baseUrl = 'https://lessoncraftstudio.com';
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

  return {
    title: pageTitle,
    description: localeMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${baseUrl}/en/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'de': `${baseUrl}/de/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'fr': `${baseUrl}/fr/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'es': `${baseUrl}/es/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'pt': `${baseUrl}/pt/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'it': `${baseUrl}/it/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'nl': `${baseUrl}/nl/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'sv': `${baseUrl}/sv/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'da': `${baseUrl}/da/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'no': `${baseUrl}/no/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'fi': `${baseUrl}/fi/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`,
        'x-default': `${baseUrl}/en/blog${currentPage > 1 ? `?page=${currentPage}` : ''}`
      }
    },
    openGraph: {
      title: pageTitle,
      description: localeMeta.description,
      type: 'website',
      url: canonicalUrl,
      siteName: 'LessonCraftStudio',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].filter(l => l !== locale)
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
  const baseUrl = 'https://lessoncraftstudio.com';
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
    </>
  );
}