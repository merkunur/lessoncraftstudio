'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';

interface FooterContent {
  companyName?: string;
  companyTagline?: string;
  sections?: {
    product?: {
      title?: string;
      links?: {
        apps?: string;
        pricing?: string;
        blog?: string;
      };
    };
    support?: {
      title?: string;
      links?: {
        helpCenter?: string;
        contact?: string;
        faq?: string;
      };
    };
    legal?: {
      title?: string;
      links?: {
        terms?: string;
        privacy?: string;
        license?: string;
      };
    };
  };
  copyright?: string;
}

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const [footerContent, setFooterContent] = useState<FooterContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations('footer');

  useEffect(() => {
    fetchFooterContent();
  }, [locale]);

  const fetchFooterContent = async () => {
    try {
      const response = await fetch(`/api/homepage/content?locale=${locale}`);
      if (response.ok) {
        const data = await response.json();
        if (data.content?.footer) {
          setFooterContent(data.content.footer);
        }
      }
    } catch (error) {
      console.error('Failed to fetch footer content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Default fallback content
  const companyName = footerContent?.companyName || 'LessonCraftStudio';
  const tagline = footerContent?.companyTagline || 'Professional worksheet generators for educational publishers.';
  const copyright = footerContent?.copyright || '© 2024 LessonCraftStudio. All rights reserved.';

  const sections = footerContent?.sections || {
    product: {
      title: t('product.title'),
      links: {
        apps: t('product.apps'),
        pricing: t('product.pricing'),
        blog: t('product.blog')
      }
    },
    support: {
      title: t('support.title'),
      links: {
        helpCenter: t('support.helpCenter'),
        contact: t('support.contact'),
        faq: t('support.faq')
      }
    },
    legal: {
      title: t('legal.title'),
      links: {
        terms: t('legal.terms'),
        privacy: t('legal.privacy'),
        license: t('legal.license')
      }
    }
  };

  // Popular generators configuration with locale-specific labels
  const popularGenerators = [
    { appId: 'word-search', labels: { en: 'Word Search', de: 'Wortsuche', fr: 'Mots Cachés', es: 'Sopa de Letras', it: 'Cerca Parole', pt: 'Caça-Palavras', nl: 'Woordzoeker', sv: 'Ordjakt', da: 'Ordsøgning', no: 'Ordsøk', fi: 'Sananhaku' } },
    { appId: 'image-addition', labels: { en: 'Addition', de: 'Addition', fr: 'Addition', es: 'Suma', it: 'Addizione', pt: 'Adição', nl: 'Optellen', sv: 'Addition', da: 'Addition', no: 'Addisjon', fi: 'Yhteenlasku' } },
    { appId: 'coloring', labels: { en: 'Coloring', de: 'Malvorlagen', fr: 'Coloriage', es: 'Colorear', it: 'Colorare', pt: 'Colorir', nl: 'Kleurplaten', sv: 'Målarbilder', da: 'Malebog', no: 'Fargelegging', fi: 'Väritys' } },
    { appId: 'math-worksheet', labels: { en: 'Math', de: 'Mathe', fr: 'Maths', es: 'Matemáticas', it: 'Matematica', pt: 'Matemática', nl: 'Rekenen', sv: 'Matte', da: 'Matematik', no: 'Matte', fi: 'Matematiikka' } },
    { appId: 'matching-app', labels: { en: 'Matching', de: 'Zuordnung', fr: 'Association', es: 'Relacionar', it: 'Abbinamento', pt: 'Ligar', nl: 'Verbinden', sv: 'Matchning', da: 'Matchning', no: 'Kobling', fi: 'Yhdistä' } },
    { appId: 'image-crossword', labels: { en: 'Crossword', de: 'Kreuzworträtsel', fr: 'Mots Croisés', es: 'Crucigrama', it: 'Cruciverba', pt: 'Palavras Cruzadas', nl: 'Kruiswoordpuzzel', sv: 'Korsord', da: 'Krydsord', no: 'Kryssord', fi: 'Ristikko' } },
  ];

  // Get localized title for Popular Generators section
  const popularGeneratorsTitle: Record<string, string> = {
    en: 'Popular Generators',
    de: 'Beliebte Generatoren',
    fr: 'Générateurs Populaires',
    es: 'Generadores Populares',
    it: 'Generatori Popolari',
    pt: 'Geradores Populares',
    nl: 'Populaire Generatoren',
    sv: 'Populära Generatorer',
    da: 'Populære Generatorer',
    no: 'Populære Generatorer',
    fi: 'Suositut Generaattorit'
  };

  if (isLoading) {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-3 bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i}>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{companyName}</h3>
            <p className="text-sm">{tagline}</p>
          </div>

          {/* Popular Generators Section - Direct links to product pages for SEO */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {popularGeneratorsTitle[locale] || 'Popular Generators'}
            </h4>
            <ul className="space-y-2 text-sm">
              {popularGenerators.map(generator => {
                const slug = getSlugForLocale(generator.appId, locale as SupportedLocale);
                const label = generator.labels[locale as keyof typeof generator.labels] || generator.labels.en;
                if (!slug) return null;
                return (
                  <li key={generator.appId}>
                    <Link href={`/${locale}/apps/${slug}`} className="hover:text-white">
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Product Section */}
          {sections.product && (
            <div>
              <h4 className="text-white font-semibold mb-4">
                {sections.product.title || 'Product'}
              </h4>
              <ul className="space-y-2 text-sm">
                {sections.product.links?.apps && (
                  <li>
                    <Link href={`/${locale}/apps`} className="hover:text-white">
                      {sections.product.links.apps}
                    </Link>
                  </li>
                )}
                {sections.product.links?.pricing && (
                  <li>
                    <Link href={`/${locale}/pricing`} className="hover:text-white">
                      {sections.product.links.pricing}
                    </Link>
                  </li>
                )}
                {sections.product.links?.blog && (
                  <li>
                    <Link href={`/${locale}/blog`} className="hover:text-white">
                      {sections.product.links.blog}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Support Section */}
          {sections.support && (
            <div>
              <h4 className="text-white font-semibold mb-4">
                {sections.support.title || t('support.title')}
              </h4>
              <ul className="space-y-2 text-sm">
                {sections.support.links?.helpCenter && (
                  <li>
                    <Link href={`/${locale}/help`} className="hover:text-white">
                      {sections.support.links.helpCenter}
                    </Link>
                  </li>
                )}
                {sections.support.links?.contact && (
                  <li>
                    <Link href={`/${locale}/contact`} className="hover:text-white">
                      {sections.support.links.contact}
                    </Link>
                  </li>
                )}
                {sections.support.links?.faq && (
                  <li>
                    <Link href={`/${locale}/faq`} className="hover:text-white">
                      {sections.support.links.faq}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}

          {/* Legal Section */}
          {sections.legal && (
            <div>
              <h4 className="text-white font-semibold mb-4">
                {sections.legal.title || 'Legal'}
              </h4>
              <ul className="space-y-2 text-sm">
                {sections.legal.links?.terms && (
                  <li>
                    <Link href={`/${locale}/terms`} className="hover:text-white">
                      {sections.legal.links.terms}
                    </Link>
                  </li>
                )}
                {sections.legal.links?.privacy && (
                  <li>
                    <Link href={`/${locale}/privacy`} className="hover:text-white">
                      {sections.legal.links.privacy}
                    </Link>
                  </li>
                )}
                {sections.legal.links?.license && (
                  <li>
                    <Link href={`/${locale}/license`} className="hover:text-white">
                      {sections.legal.links.license}
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  );
}