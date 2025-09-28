import { getTranslations } from 'next-intl/server';
import BlogPageClient from './BlogPageClient';

interface BlogPageProps {
  params: {
    locale: string;
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const t = await getTranslations({ locale: params.locale, namespace: 'blogPage' });

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

  return <BlogPageClient locale={params.locale} translations={translations} />;
}