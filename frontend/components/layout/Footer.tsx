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
    en: 'Create and sell professional printables for Etsy, KDP & more.',
    de: 'Erstellen und verkaufen Sie professionelle Druckvorlagen für Etsy, KDP & mehr.',
    fr: 'Créez et vendez des imprimables professionnels pour Etsy, KDP et plus.',
    es: 'Crea y vende imprimibles profesionales para Etsy, KDP y más.',
    pt: 'Crie e venda imprimíveis profissionais para Etsy, KDP e mais.',
    it: 'Crea e vendi stampabili professionali per Etsy, KDP e altro.',
    nl: 'Maak en verkoop professionele printbare producten voor Etsy, KDP en meer.',
    sv: 'Skapa och sälj professionella utskrifter för Etsy, KDP och mer.',
    da: 'Opret og sælg professionelle printbare produkter til Etsy, KDP og mere.',
    no: 'Lag og selg profesjonelle utskrifter for Etsy, KDP og mer.',
    fi: 'Luo ja myy ammattimaisia tulostettavia Etsyyn, KDP:hen ja muualle.',
  };
  const localizedRights: Record<string, string> = {
    en: 'All rights reserved.',
    de: 'Alle Rechte vorbehalten.',
    fr: 'Tous droits réservés.',
    es: 'Todos los derechos reservados.',
    pt: 'Todos os direitos reservados.',
    it: 'Tutti i diritti riservati.',
    nl: 'Alle rechten voorbehouden.',
    sv: 'Alla rättigheter förbehållna.',
    da: 'Alle rettigheder forbeholdes.',
    no: 'Alle rettigheter forbeholdt.',
    fi: 'Kaikki oikeudet pidätetään.',
  };
  const localizedTutorials: Record<string, string> = {
    en: 'Video Tutorials',
    de: 'Video-Tutorials',
    fr: 'Tutoriels vidéo',
    es: 'Tutoriales en video',
    pt: 'Tutoriais em vídeo',
    it: 'Video tutorial',
    nl: 'Videotutorials',
    sv: 'Videohandledningar',
    da: 'Videovejledninger',
    no: 'Videoopplæringer',
    fi: 'Video-oppaat',
  };
  const tagline = localizedTaglines[locale] || localizedTaglines.en;
  const copyright = `© ${new Date().getFullYear()} LessonCraftStudio. ${localizedRights[locale] || localizedRights.en}`;

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
    { appId: 'word-search', labels: { en: 'Word Search', de: 'Wortsuche', fr: 'Mots Cachés', es: 'Sopa de Letras', it: 'Cerca Parole', pt: 'Caça-Palavras', nl: 'Woordzoeker', sv: 'Ordjakt', da: 'Ordsøgning', no: 'Ordsøk', fi: 'Sananhaku' } },
    { appId: 'image-addition', labels: { en: 'Addition', de: 'Addition', fr: 'Addition', es: 'Suma', it: 'Addizione', pt: 'Adição', nl: 'Optellen', sv: 'Addition', da: 'Addition', no: 'Addisjon', fi: 'Yhteenlasku' } },
    { appId: 'coloring', labels: { en: 'Coloring', de: 'Malvorlagen', fr: 'Coloriage', es: 'Colorear', it: 'Colorare', pt: 'Colorir', nl: 'Kleurplaten', sv: 'Målarbilder', da: 'Malebog', no: 'Fargelegging', fi: 'Väritys' } },
    { appId: 'math-worksheet', labels: { en: 'Math', de: 'Mathe', fr: 'Maths', es: 'Matemáticas', it: 'Matematica', pt: 'Matemática', nl: 'Rekenen', sv: 'Matte', da: 'Matematik', no: 'Matte', fi: 'Matematiikka' } },
    { appId: 'matching-app', labels: { en: 'Matching', de: 'Zuordnung', fr: 'Association', es: 'Relacionar', it: 'Abbinamento', pt: 'Ligar', nl: 'Verbinden', sv: 'Matchning', da: 'Matchning', no: 'Kobling', fi: 'Yhdistä' } },
    { appId: 'image-crossword', labels: { en: 'Crossword', de: 'Kreuzworträtsel', fr: 'Mots Croisés', es: 'Crucigrama', it: 'Cruciverba', pt: 'Palavras Cruzadas', nl: 'Kruiswoordpuzzel', sv: 'Korsord', da: 'Krydsord', no: 'Kryssord', fi: 'Ristikko' } },
    { appId: 'sudoku', labels: { en: 'Sudoku', de: 'Sudoku', fr: 'Sudoku', es: 'Sudoku', it: 'Sudoku', pt: 'Sudoku', nl: 'Sudoku', sv: 'Sudoku', da: 'Sudoku', no: 'Sudoku', fi: 'Sudoku' } },
    { appId: 'alphabet-train', labels: { en: 'Alphabet', de: 'Alphabet', fr: 'Alphabet', es: 'Abecedario', it: 'Alfabeto', pt: 'Alfabeto', nl: 'Alfabet', sv: 'Alfabet', da: 'Alfabet', no: 'Alfabet', fi: 'Aakkoset' } },
    { appId: 'subtraction', labels: { en: 'Subtraction', de: 'Subtraktion', fr: 'Soustraction', es: 'Resta', it: 'Sottrazione', pt: 'Subtração', nl: 'Aftrekken', sv: 'Subtraktion', da: 'Subtraktion', no: 'Subtraksjon', fi: 'Vähennyslasku' } },
    { appId: 'drawing-lines', labels: { en: 'Tracing', de: 'Schwungübungen', fr: 'Graphisme', es: 'Grafomotricidad', it: 'Pregrafismo', pt: 'Coordenação', nl: 'Schrijfmotoriek', sv: 'Finmotorik', da: 'Finmotorik', no: 'Finmotorikk', fi: 'Hienomotoriikka' } },
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

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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

          {/* Resources Section */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {{ en: 'Resources', de: 'Ressourcen', fr: 'Ressources', es: 'Recursos', pt: 'Recursos', it: 'Risorse', nl: 'Bronnen', sv: 'Resurser', da: 'Ressourcer', no: 'Ressurser', fi: 'Resurssit' }[locale] || 'Resources'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/tools`} className="hover:text-white">{{ en: 'Free Tools', de: 'Kostenlose Tools', fr: 'Outils gratuits', es: 'Herramientas gratis', pt: 'Ferramentas grátis', it: 'Strumenti gratuiti', nl: 'Gratis tools', sv: 'Gratisverktyg', da: 'Gratis værktøjer', no: 'Gratisverktøy', fi: 'Ilmaiset työkalut' }[locale] || 'Free Tools'}</Link></li>
              <li className="pl-3"><Link href="/en/tools/niche-finder" className="hover:text-white inline-flex items-center gap-1.5 text-gray-400"><span aria-hidden="true">↳</span><span>Printable Niche Finder</span><span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-white rounded px-1 py-0.5">New</span></Link></li>
              <li className="pl-3"><Link href="/en/tools/kdp-royalty-calculator" className="hover:text-white inline-flex items-center gap-1.5 text-gray-400"><span aria-hidden="true">↳</span><span>KDP Royalty Calculator</span><span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-white rounded px-1 py-0.5">New</span></Link></li>
              <li className="pl-3"><Link href="/en/tools/kdp-size-calculator" className="hover:text-white inline-flex items-center gap-1.5 text-gray-400"><span aria-hidden="true">↳</span><span>KDP Cover Size Calculator</span><span className="text-[9px] font-bold uppercase tracking-wider bg-primary text-white rounded px-1 py-0.5">New</span></Link></li>
              <li><Link href={`/${locale}/guides`} className="hover:text-white">{{ en: 'How-To Guides', de: 'Anleitungen', fr: 'Guides pratiques', es: 'Guías prácticas', pt: 'Guias práticos', it: 'Guide pratiche', nl: 'Handleidingen', sv: 'Guider', da: 'Vejledninger', no: 'Veiledninger', fi: 'Oppaat' }[locale] || 'How-To Guides'}</Link></li>
              <li><Link href={`/${locale}/bundles`} className="hover:text-white">{{ en: 'Bundles', de: 'Pakete', fr: 'Packs', es: 'Paquetes', pt: 'Pacotes', it: 'Pacchetti', nl: 'Bundels', sv: 'Paket', da: 'Pakker', no: 'Pakker', fi: 'Paketit' }[locale] || 'Bundles'}</Link></li>
              <li><Link href={`/${locale}/ideas`} className="hover:text-white">{{ en: 'Niche Ideas', de: 'Nischen-Ideen', fr: 'Idées de niches', es: 'Ideas de nichos', pt: 'Ideias de nichos', it: 'Idee di nicchia', nl: 'Niche-ideeën', sv: 'Nischidéer', da: 'Nicheideer', no: 'Nisjeideer', fi: 'Niche-ideat' }[locale] || 'Niche Ideas'}</Link></li>
              <li><Link href={`/${locale}/start`} className="hover:text-white">{{ en: 'Get Started', de: 'Erste Schritte', fr: 'Démarrer', es: 'Comenzar', pt: 'Começar', it: 'Inizia', nl: 'Aan de slag', sv: 'Kom igång', da: 'Kom i gang', no: 'Kom i gang', fi: 'Aloita' }[locale] || 'Get Started'}</Link></li>
              <li><Link href={`/${locale}/blog`} className="hover:text-white">{{ en: 'Blog', de: 'Blog', fr: 'Blog', es: 'Blog', pt: 'Blog', it: 'Blog', nl: 'Blog', sv: 'Blogg', da: 'Blog', no: 'Blogg', fi: 'Blogi' }[locale] || 'Blog'}</Link></li>
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
                <li>
                  <Link href="/member" className="hover:text-white">
                    {t('support.memberArea')}
                  </Link>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@LessonCraftStudioApps"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white inline-flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    {localizedTutorials[locale] || 'Video Tutorials'}
                  </a>
                </li>
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
