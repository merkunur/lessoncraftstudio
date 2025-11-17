import { notFound } from 'next/navigation';
import fs from 'fs';
import path from 'path';

interface PageProps {
  params: {
    locale: string;
    slug: string[];
  };
}

// Supported languages
const supportedLocales = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

export default async function StaticPage({ params }: PageProps) {
  const { locale, slug } = params;

  // Check if locale is supported
  if (!supportedLocales.includes(locale)) {
    notFound();
  }

  // Build the file path
  const pagePath = slug.join('/');

  // Try different possible paths
  const possiblePaths = [
    // Direct path with .html
    path.join(process.cwd(), 'public', 'static-pages', locale, `${pagePath}.html`),
    // Path under pages directory
    path.join(process.cwd(), 'public', 'static-pages', locale, 'pages', `${pagePath}.html`),
    // Path under blog directory
    path.join(process.cwd(), 'public', 'static-pages', locale, 'blog', `${pagePath}.html`),
    // Index file in directory
    path.join(process.cwd(), 'public', 'static-pages', locale, pagePath, 'index.html'),
  ];

  // Find the first existing file
  let htmlContent = '';
  let fileFound = false;

  for (const filePath of possiblePaths) {
    try {
      if (fs.existsSync(filePath)) {
        htmlContent = fs.readFileSync(filePath, 'utf-8');
        fileFound = true;
        break;
      }
    } catch (error) {
      // Continue to next path
    }
  }

  if (!fileFound) {
    notFound();
  }

  // Update paths in HTML to work with Next.js routing
  htmlContent = htmlContent
    // Fix static page links
    .replace(/href="\/static\//g, 'href="/static/')
    .replace(/href="\/static-pages\//g, 'href="/static/')
    // Fix worksheet generator links
    .replace(/href="\/worksheet-generators\//g, 'href="/worksheet-generators/')
    // Fix asset paths
    .replace(/src="\/images\//g, 'src="/images/')
    .replace(/src="\/js\//g, 'src="/js/')
    .replace(/src="\/css\//g, 'src="/css/')
    // Update language links
    .replace(/href="\/([a-z]{2})\/pages\//g, 'href="/static/$1/')
    .replace(/href="\/([a-z]{2})\/blog\//g, 'href="/static/$1/blog/');

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}

// Generate static params for known pages
export async function generateStaticParams() {
  const staticParams: { locale: string; slug: string[] }[] = [];

  // Common pages (exclude 'apps' and 'pricing' - they have their own dedicated routes)
  const commonPages = ['homepage', 'contact', 'about', 'terms', 'privacy'];

  supportedLocales.forEach(locale => {
    commonPages.forEach(page => {
      staticParams.push({
        locale: locale,
        slug: [page]
      });
    });
  });

  return staticParams;
}

// Metadata generation
export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = params;
  const pageName = slug[slug.length - 1];

  // Known valid pages
  const knownPages = ['homepage', 'contact', 'about', 'terms', 'privacy'];

  // Default metadata based on page
  const titles: Record<string, Record<string, string>> = {
    homepage: {
      en: 'LessonCraftStudio - Professional Worksheet Generator',
      de: 'LessonCraftStudio - Professioneller Arbeitsblatt-Generator',
      fr: 'LessonCraftStudio - Générateur de Feuilles de Travail Professionnel',
      es: 'LessonCraftStudio - Generador de Hojas de Trabajo Profesional',
    },
    apps: {
      en: 'Worksheet Generator Apps - LessonCraftStudio',
      de: 'Arbeitsblatt-Generator Apps - LessonCraftStudio',
      fr: 'Applications Générateur de Feuilles - LessonCraftStudio',
      es: 'Aplicaciones Generador de Hojas - LessonCraftStudio',
    },
    pricing: {
      en: 'Pricing Plans - LessonCraftStudio',
      de: 'Preispläne - LessonCraftStudio',
      fr: 'Plans Tarifaires - LessonCraftStudio',
      es: 'Planes de Precios - LessonCraftStudio',
    }
  };

  const title = titles[pageName]?.[locale] || `${pageName} - LessonCraftStudio`;

  // If page is not in known pages list, add noindex to prevent search engine indexing
  if (!knownPages.includes(pageName)) {
    return {
      title,
      description: 'Professional worksheet generators with 100+ themed images for educators and publishers',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title,
    description: 'Professional worksheet generators with 100+ themed images for educators and publishers',
  };
}