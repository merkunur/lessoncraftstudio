import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import { getBlogPostsForLocale, getBlogCategoriesForLocale } from '@/lib/blog-data';

// Enable ISR - revalidate every hour for fast language switching
export const revalidate = 3600;

interface BlogPageProps {
  params: {
    locale: string;
  };
}


// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = params.locale || 'en';
  const baseUrl = 'https://lessoncraftstudio.com';

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

  return {
    title: localeMeta.title,
    description: localeMeta.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/blog`,
      languages: {
        'en': `${baseUrl}/en/blog`,
        'de': `${baseUrl}/de/blog`,
        'fr': `${baseUrl}/fr/blog`,
        'es': `${baseUrl}/es/blog`,
        'pt': `${baseUrl}/pt/blog`,
        'it': `${baseUrl}/it/blog`,
        'nl': `${baseUrl}/nl/blog`,
        'sv': `${baseUrl}/sv/blog`,
        'da': `${baseUrl}/da/blog`,
        'no': `${baseUrl}/no/blog`,
        'fi': `${baseUrl}/fi/blog`,
        'x-default': `${baseUrl}/en/blog`
      }
    },
    openGraph: {
      title: localeMeta.title,
      description: localeMeta.description,
      type: 'website',
      url: `${baseUrl}/${locale}/blog`,
      siteName: 'LessonCraftStudio',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].filter(l => l !== locale)
    }
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blogPage' });

  // Fetch blog posts and categories server-side (cached via ISR)
  const [initialPosts, initialCategories] = await Promise.all([
    getBlogPostsForLocale(params.locale),
    Promise.resolve(getBlogCategoriesForLocale(params.locale))
  ]);

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

  return (
    <BlogPageClient
      locale={params.locale}
      translations={translations}
      initialPosts={initialPosts}
      initialCategories={initialCategories}
    />
  );
}