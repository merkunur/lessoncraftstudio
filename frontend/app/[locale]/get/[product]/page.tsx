import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSalesPage, getAllSalesPageSlugs } from '@/config/sales-pages';
import { SalesPageClient } from './SalesPageClient';

interface PageProps {
  params: { locale: string; product: string };
}

export function generateStaticParams() {
  const slugs = getAllSalesPageSlugs();
  // English-only for now (WarriorPlus audience is English)
  return slugs.map((product) => ({ locale: 'en', product }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const config = getSalesPage(params.product);
  if (!config) return {};

  const baseUrl = 'https://www.lessoncraftstudio.com';
  const url = `${baseUrl}/${params.locale}/get/${params.product}`;

  return {
    title: config.seo.title,
    description: config.seo.description,
    keywords: config.seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: config.seo.title,
      description: config.seo.description,
      type: 'website',
      url,
      siteName: 'LessonCraftStudio',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seo.title,
      description: config.seo.description,
    },
    robots: { index: true, follow: true },
  };
}

export default function SalesPage({ params }: PageProps) {
  const config = getSalesPage(params.product);
  if (!config) notFound();

  return <SalesPageClient config={config} locale={params.locale} />;
}
