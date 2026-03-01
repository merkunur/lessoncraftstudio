import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSalesPage, getAllSalesPageSlugs } from '@/config/sales-pages';
import { SalesPageClient } from './SalesPageClient';
import MathPuzzleSalesClient from './MathPuzzleSalesClient';
import MathPuzzleOTOClient from './MathPuzzleOTOClient';
import CodeAdditionSalesClient from './CodeAdditionSalesClient';
import CodeAdditionOTO1Client from './CodeAdditionOTO1Client';
import CodeAdditionOTO2Client from './CodeAdditionOTO2Client';

interface PageProps {
  params: { locale: string; product: string };
}

/* OG preview images — one per product, served via nginx */
const OG_IMAGES: Record<string, string> = {
  'word-search': '/samples/english/wordsearch/wordsearch%20portrait.jpeg',
  'word-search-library': '/samples/english/wordsearch/wordsearch%20portrait.jpeg',
  'word-search-languages': '/samples/english/wordsearch/wordsearch%20portrait.jpeg',
  'math-puzzle': '/samples/english/math%20puzzle/Math%20Puzzles%20(1).jpeg',
  'math-puzzle-library': '/samples/english/math%20puzzle/Math%20Puzzles%20(1).jpeg',
  'code-addition': '/samples/english/code%20addition/image_addition_worksheet%20(1).jpeg',
  'code-addition-wordreveal': '/samples/english/code%20addition/Code%20Breaker%20Addition%203.jpeg',
  'code-addition-library': '/samples/english/code%20addition/image_addition_worksheet%20(1).jpeg',
};

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
  const ogImage = OG_IMAGES[params.product]
    ? `${baseUrl}${OG_IMAGES[params.product]}`
    : undefined;

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
      ...(ogImage && { images: [{ url: ogImage }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: config.seo.title,
      description: config.seo.description,
      ...(ogImage && { images: [ogImage] }),
    },
    robots: { index: true, follow: true },
  };
}

export default function SalesPage({ params }: PageProps) {
  const config = getSalesPage(params.product);
  if (!config) notFound();

  // Product JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: config.hero.headline,
    description: config.seo.description,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Web browser',
    offers: {
      '@type': 'Offer',
      price: String(config.pricing.price),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  // Code Addition pages use teal/emerald design
  if (params.product === 'code-addition') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CodeAdditionSalesClient config={config} locale={params.locale} />
      </>
    );
  }

  if (params.product === 'code-addition-wordreveal') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CodeAdditionOTO1Client config={config} locale={params.locale} />
      </>
    );
  }

  if (params.product === 'code-addition-library') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <CodeAdditionOTO2Client config={config} locale={params.locale} />
      </>
    );
  }

  // Math Puzzle OTO1 uses the indigo design to match the FE page
  if (params.product === 'math-puzzle-library') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MathPuzzleOTOClient config={config} locale={params.locale} />
      </>
    );
  }

  // Math Puzzle FE page uses a custom component with unique visual design
  if (params.product === 'math-puzzle') {
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <MathPuzzleSalesClient config={config} locale={params.locale} />
      </>
    );
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SalesPageClient config={config} locale={params.locale} />
    </>
  );
}
