'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';

export function Footer() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';
  const t = useTranslations('footer');

  const companyName = 'LessonCraftStudio';
  const localizedTaglines: Record<string, string> = {
    en: 'Professional worksheet generators for educational publishers.',
    de: 'Professionelle Arbeitsblatt-Generatoren f\u00fcr Bildungsverlage.',
    fr: 'G\u00e9n\u00e9rateurs de fiches professionnels pour l\u2019\u00e9ducation.',
    es: 'Generadores de fichas profesionales para educadores.',
    pt: 'Geradores de atividades profissionais para educadores.',
    it: 'Generatori di schede professionali per editori educativi.',
    nl: 'Professionele werkblad-generatoren voor het onderwijs.',
    sv: 'Professionella arbetsblads-generatorer f\u00f6r utbildning.',
    da: 'Professionelle arbejdsark-generatorer til uddannelse.',
    no: 'Profesjonelle arbeidsark-generatorer for utdanning.',
    fi: 'Ammattimaiset ty\u00f6arkki-generaattorit opetusk\u00e4ytt\u00f6\u00f6n.',
  };
  const localizedRights: Record<string, string> = {
    en: 'All rights reserved.',
    de: 'Alle Rechte vorbehalten.',
    fr: 'Tous droits r\u00e9serv\u00e9s.',
    es: 'Todos los derechos reservados.',
    pt: 'Todos os direitos reservados.',
    it: 'Tutti i diritti riservati.',
    nl: 'Alle rechten voorbehouden.',
    sv: 'Alla r\u00e4ttigheter f\u00f6rbeh\u00e5llna.',
    da: 'Alle rettigheder forbeholdes.',
    no: 'Alle rettigheter forbeholdt.',
    fi: 'Kaikki oikeudet pid\u00e4tet\u00e4\u00e4n.',
  };
  const tagline = localizedTaglines[locale] || localizedTaglines.en;
  const copyright = `\u00a9 ${new Date().getFullYear()} LessonCraftStudio. ${localizedRights[locale] || localizedRights.en}`;

  const sections = {
    support: {
      title: t('support.title'),
      links: {
        helpCenter: t('support.helpCenter'),
        contact: t('support.contact'),
        faq: t('support.faq'),
        about: t('support.about')
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

  // Popular generators - expanded from 6 to 10
  const popularGenerators = [
    { appId: 'word-search', labels: { en: 'Word Search', de: 'Wortsuche', fr: 'Mots Cach\u00e9s', es: 'Sopa de Letras', it: 'Cerca Parole', pt: 'Ca\u00e7a-Palavras', nl: 'Woordzoeker', sv: 'Ordjakt', da: 'Ords\u00f8gning', no: 'Ords\u00f8k', fi: 'Sananhaku' } },
    { appId: 'image-addition', labels: { en: 'Addition', de: 'Addition', fr: 'Addition', es: 'Suma', it: 'Addizione', pt: 'Adi\u00e7\u00e3o', nl: 'Optellen', sv: 'Addition', da: 'Addition', no: 'Addisjon', fi: 'Yhteenlasku' } },
    { appId: 'coloring', labels: { en: 'Coloring', de: 'Malvorlagen', fr: 'Coloriage', es: 'Colorear', it: 'Colorare', pt: 'Colorir', nl: 'Kleurplaten', sv: 'M\u00e5larbilder', da: 'Malebog', no: 'Fargelegging', fi: 'V\u00e4ritys' } },
    { appId: 'math-worksheet', labels: { en: 'Math', de: 'Mathe', fr: 'Maths', es: 'Matem\u00e1ticas', it: 'Matematica', pt: 'Matem\u00e1tica', nl: 'Rekenen', sv: 'Matte', da: 'Matematik', no: 'Matte', fi: 'Matematiikka' } },
    { appId: 'matching-app', labels: { en: 'Matching', de: 'Zuordnung', fr: 'Association', es: 'Relacionar', it: 'Abbinamento', pt: 'Ligar', nl: 'Verbinden', sv: 'Matchning', da: 'Matchning', no: 'Kobling', fi: 'Yhdist\u00e4' } },
    { appId: 'image-crossword', labels: { en: 'Crossword', de: 'Kreuzwortr\u00e4tsel', fr: 'Mots Crois\u00e9s', es: 'Crucigrama', it: 'Cruciverba', pt: 'Palavras Cruzadas', nl: 'Kruiswoordpuzzel', sv: 'Korsord', da: 'Krydsord', no: 'Kryssord', fi: 'Ristikko' } },
    { appId: 'sudoku', labels: { en: 'Sudoku', de: 'Sudoku', fr: 'Sudoku', es: 'Sudoku', it: 'Sudoku', pt: 'Sudoku', nl: 'Sudoku', sv: 'Sudoku', da: 'Sudoku', no: 'Sudoku', fi: 'Sudoku' } },
    { appId: 'alphabet-train', labels: { en: 'Alphabet', de: 'Alphabet', fr: 'Alphabet', es: 'Abecedario', it: 'Alfabeto', pt: 'Alfabeto', nl: 'Alfabet', sv: 'Alfabet', da: 'Alfabet', no: 'Alfabet', fi: 'Aakkoset' } },
    { appId: 'subtraction', labels: { en: 'Subtraction', de: 'Subtraktion', fr: 'Soustraction', es: 'Resta', it: 'Sottrazione', pt: 'Subtra\u00e7\u00e3o', nl: 'Aftrekken', sv: 'Subtraktion', da: 'Subtraktion', no: 'Subtraksjon', fi: 'V\u00e4hennyslasku' } },
    { appId: 'drawing-lines', labels: { en: 'Tracing', de: 'Schwung\u00fcbungen', fr: 'Graphisme', es: 'Grafomotricidad', it: 'Pregrafismo', pt: 'Coordena\u00e7\u00e3o', nl: 'Schrijfmotoriek', sv: 'Finmotorik', da: 'Finmotorik', no: 'Finmotorikk', fi: 'Hienomotoriikka' } },
  ];

  // Get localized title for Popular Generators section
  const popularGeneratorsTitle: Record<string, string> = {
    en: 'Popular Generators',
    de: 'Beliebte Generatoren',
    fr: 'G\u00e9n\u00e9rateurs Populaires',
    es: 'Generadores Populares',
    it: 'Generatori Popolari',
    pt: 'Geradores Populares',
    nl: 'Populaire Generatoren',
    sv: 'Popul\u00e4ra Generatorer',
    da: 'Popul\u00e6re Generatorer',
    no: 'Popul\u00e6re Generatorer',
    fi: 'Suositut Generaattorit'
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{companyName}</h3>
            <p className="text-sm">{tagline}</p>
          </div>

          {/* Popular Generators Section */}
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

          {/* Support Section */}
          {sections.support && (
            <div>
              <h4 className="text-white font-semibold mb-4">
                {sections.support.title || t('support.title')}
              </h4>
              <ul className="space-y-2 text-sm">
                {sections.support.links?.helpCenter && (
                  <li>
                    <Link href={`/${locale}/faq`} className="hover:text-white">
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
                {sections.support.links?.about && (
                  <li>
                    <Link href={`/${locale}/about`} className="hover:text-white">
                      {sections.support.links.about}
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
