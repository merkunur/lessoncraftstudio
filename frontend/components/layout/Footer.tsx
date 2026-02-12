'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { getThemeSlug } from '@/config/theme-slugs';

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

  // By Subject - links to category hub pages
  const bySubjectTitle: Record<string, string> = {
    en: 'By Subject', de: 'Nach Fach', fr: 'Par Mati\u00e8re', es: 'Por Materia',
    it: 'Per Materia', pt: 'Por Mat\u00e9ria', nl: 'Per Vak', sv: 'Per \u00c4mne',
    da: 'Per Fag', no: 'Per Fag', fi: 'Aiheen Mukaan'
  };

  const subjectLinks = [
    { slug: 'math', labels: { en: 'Math', de: 'Mathe', fr: 'Maths', es: 'Matem\u00e1ticas', it: 'Matematica', pt: 'Matem\u00e1tica', nl: 'Rekenen', sv: 'Matte', da: 'Matematik', no: 'Matte', fi: 'Matematiikka' } },
    { slug: 'language-arts', labels: { en: 'Language Arts', de: 'Sprache', fr: 'Fran\u00e7ais', es: 'Lenguaje', it: 'Italiano', pt: 'Portugu\u00eas', nl: 'Taal', sv: 'Spr\u00e5k', da: 'Sprog', no: 'Spr\u00e5k', fi: 'Kieli' } },
    { slug: 'word-games', labels: { en: 'Word Games', de: 'Wortspiele', fr: 'Jeux de Mots', es: 'Juegos de Palabras', it: 'Giochi di Parole', pt: 'Jogos de Palavras', nl: 'Woordspellen', sv: 'Ordspel', da: 'Ordspil', no: 'Ordspill', fi: 'Sanapelit' } },
    { slug: 'art-creativity', labels: { en: 'Art & Creativity', de: 'Kunst & Kreativit\u00e4t', fr: 'Art & Cr\u00e9ativit\u00e9', es: 'Arte & Creatividad', it: 'Arte & Creativit\u00e0', pt: 'Arte & Criatividade', nl: 'Kunst & Creativiteit', sv: 'Konst & Kreativitet', da: 'Kunst & Kreativitet', no: 'Kunst & Kreativitet', fi: 'Taide & Luovuus' } },
    { slug: 'logic-puzzles', labels: { en: 'Logic & Puzzles', de: 'Logik & R\u00e4tsel', fr: 'Logique & Puzzles', es: 'L\u00f3gica & Puzzles', it: 'Logica & Puzzle', pt: 'L\u00f3gica & Quebra-cabe\u00e7as', nl: 'Logica & Puzzels', sv: 'Logik & Pussel', da: 'Logik & Puslespil', no: 'Logikk & Puslespill', fi: 'Logiikka & Pulmat' } },
    { slug: 'visual-perception', labels: { en: 'Visual Perception', de: 'Visuelle Wahrnehmung', fr: 'Perception visuelle', es: 'Percepci\u00f3n visual', it: 'Percezione visiva', pt: 'Percep\u00e7\u00e3o visual', nl: 'Visuele waarneming', sv: 'Visuell perception', da: 'Visuel perception', no: 'Visuell persepsjon', fi: 'Visuaalinen hahmottaminen' } },
    { slug: 'matching-sorting', labels: { en: 'Matching & Sorting', de: 'Zuordnung & Sortierung', fr: 'Association & Tri', es: 'Emparejamiento y clasificaci\u00f3n', it: 'Abbinamento e classificazione', pt: 'Associa\u00e7\u00e3o e classifica\u00e7\u00e3o', nl: 'Koppelen & Sorteren', sv: 'Koppla & Sortera', da: 'Parring & Sortering', no: 'Kobling & Sortering', fi: 'Yhdist\u00e4minen ja lajittelu' } },
    { slug: 'patterns-motor', labels: { en: 'Patterns & Motor Skills', de: 'Muster & Feinmotorik', fr: 'Motifs & Motricit\u00e9 fine', es: 'Patrones y motricidad fina', it: 'Sequenze e motricit\u00e0 fine', pt: 'Padr\u00f5es e coordena\u00e7\u00e3o motora', nl: 'Patronen & Fijne motoriek', sv: 'M\u00f6nster & Finmotorik', da: 'M\u00f8nstre & Finmotorik', no: 'M\u00f8nstre & Finmotorikk', fi: 'Kuviot ja hienomotoriikka' } },
  ];

  // By Grade - links to grade-level pages
  const byGradeTitle: Record<string, string> = {
    en: 'By Grade', de: 'Nach Klasse', fr: 'Par Niveau', es: 'Por Grado',
    it: 'Per Classe', pt: 'Por S\u00e9rie', nl: 'Per Groep', sv: 'Per \u00c5rskurs',
    da: 'Per Klasse', no: 'Per Klasse', fi: 'Luokittain'
  };

  const gradeLinks = [
    { slug: 'preschool', labels: { en: 'Preschool', de: 'Vorschule', fr: 'Maternelle', es: 'Preescolar', it: 'Scuola dell\'Infanzia', pt: 'Pr\u00e9-escola', nl: 'Kleutergroep', sv: 'F\u00f6rskola', da: 'B\u00f8rnehave', no: 'Barnehage', fi: 'Esikoulu' } },
    { slug: 'kindergarten', labels: { en: 'Kindergarten', de: 'Kindergarten', fr: 'Grande Section', es: 'Jard\u00edn de Infantes', it: 'Scuola Materna', pt: 'Jardim de Inf\u00e2ncia', nl: 'Groep 1-2', sv: 'F\u00f6rskoleklass', da: '0. Klasse', no: 'F\u00f8rskole', fi: 'Esikoulu' } },
    { slug: 'first-grade', labels: { en: 'Grade 1', de: '1. Klasse', fr: 'CP', es: '1\u00b0 Grado', it: '1\u00aa Elementare', pt: '1\u00ba Ano', nl: 'Groep 3', sv: '\u00c5rskurs 1', da: '1. Klasse', no: '2. Klasse', fi: '1. Luokka' } },
    { slug: 'second-grade', labels: { en: 'Grade 2', de: '2. Klasse', fr: 'CE1', es: '2\u00b0 Grado', it: '2\u00aa Elementare', pt: '2\u00ba Ano', nl: 'Groep 4', sv: '\u00c5rskurs 2', da: '2. Klasse', no: '3. Klasse', fi: '2. Luokka' } },
    { slug: 'third-grade', labels: { en: 'Grade 3', de: '3. Klasse', fr: 'CE2', es: '3\u00b0 Grado', it: 'Terza elementare', pt: '3\u00ba Ano', nl: 'Groep 5', sv: '\u00c5rskurs 3', da: '3. klasse', no: '4. Klasse', fi: '3. luokka' } },
  ];

  // By Theme - links to theme worksheets pages
  const byThemeTitle: Record<string, string> = {
    en: 'By Theme', de: 'Nach Thema', fr: 'Par Th\u00e8me', es: 'Por Tema',
    it: 'Per Tema', pt: 'Por Tema', nl: 'Per Thema', sv: 'Per Tema',
    da: 'Per Tema', no: 'Per Tema', fi: 'Teemoittain'
  };

  const viewAllThemesLabel: Record<string, string> = {
    en: 'View All 50 Themes \u2192',
    de: 'Alle 50 Themen ansehen \u2192',
    fr: 'Voir les 50 th\u00e8mes \u2192',
    es: 'Ver los 50 temas \u2192',
    pt: 'Ver os 50 temas \u2192',
    it: 'Vedi tutti i 50 temi \u2192',
    nl: "Bekijk alle 50 thema's \u2192",
    sv: 'Visa alla 50 teman \u2192',
    da: 'Se alle 50 temaer \u2192',
    no: 'Se alle 50 temaer \u2192',
    fi: 'N\u00e4yt\u00e4 kaikki 50 teemaa \u2192',
  };

  const themeLinks = [
    { id: 'animals', labels: { en: 'Animals', de: 'Tiere', fr: 'Animaux', es: 'Animales', pt: 'Animais', it: 'Animali', nl: 'Dieren', sv: 'Djur', da: 'Dyr', no: 'Dyr', fi: 'El\u00e4imet' } },
    { id: 'dinosaurs', labels: { en: 'Dinosaurs', de: 'Dinosaurier', fr: 'Dinosaures', es: 'Dinosaurios', pt: 'Dinossauros', it: 'Dinosauri', nl: 'Dinosaurussen', sv: 'Dinosaurier', da: 'Dinosaurer', no: 'Dinosaurer', fi: 'Dinosaurukset' } },
    { id: 'space', labels: { en: 'Space', de: 'Weltraum', fr: 'Espace', es: 'Espacio', pt: 'Espa\u00e7o', it: 'Spazio', nl: 'Ruimte', sv: 'Rymden', da: 'Rummet', no: 'Verdensrommet', fi: 'Avaruus' } },
    { id: 'ocean', labels: { en: 'Ocean', de: 'Ozean', fr: 'Oc\u00e9an', es: 'Oc\u00e9ano', pt: 'Oceano', it: 'Oceano', nl: 'Oceaan', sv: 'Havet', da: 'Havet', no: 'Havet', fi: 'Meri' } },
    { id: 'farm', labels: { en: 'Farm', de: 'Bauernhof', fr: 'Ferme', es: 'Granja', pt: 'Fazenda', it: 'Fattoria', nl: 'Boerderij', sv: 'Bondg\u00e5rd', da: 'Bondeg\u00e5rd', no: 'Bondeg\u00e5rd', fi: 'Maatila' } },
    { id: 'nature', labels: { en: 'Nature', de: 'Natur', fr: 'Nature', es: 'Naturaleza', pt: 'Natureza', it: 'Natura', nl: 'Natuur', sv: 'Natur', da: 'Natur', no: 'Natur', fi: 'Luonto' } },
    { id: 'sports', labels: { en: 'Sports', de: 'Sport', fr: 'Sports', es: 'Deportes', pt: 'Esportes', it: 'Sport', nl: 'Sport', sv: 'Sport', da: 'Sport', no: 'Sport', fi: 'Urheilu' } },
    { id: 'food', labels: { en: 'Food', de: 'Essen', fr: 'Nourriture', es: 'Comida', pt: 'Comida', it: 'Cibo', nl: 'Eten', sv: 'Mat', da: 'Mad', no: 'Mat', fi: 'Ruoka' } },
    { id: 'seasons', labels: { en: 'Seasons', de: 'Jahreszeiten', fr: 'Saisons', es: 'Estaciones', pt: 'Esta\u00e7\u00f5es', it: 'Stagioni', nl: 'Seizoenen', sv: 'S\u00e4songer', da: 'S\u00e6soner', no: 'Sesonger', fi: 'Vuodenajat' } },
    { id: 'fairy-tales', labels: { en: 'Fairy Tales', de: 'M\u00e4rchen', fr: 'Contes', es: 'Cuentos', pt: 'Contos', it: 'Fiabe', nl: 'Sprookjes', sv: 'Sagor', da: 'Eventyr', no: 'Eventyr', fi: 'Sadut' } },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="container mx-auto px-4">
        {/* Main footer grid - 8 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
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

          {/* By Subject - Category hub page links */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {bySubjectTitle[locale] || 'By Subject'}
            </h4>
            <ul className="space-y-2 text-sm">
              {subjectLinks.map(subject => (
                <li key={subject.slug}>
                  <Link href={`/${locale}/apps/category/${subject.slug}`} className="hover:text-white">
                    {subject.labels[locale as keyof typeof subject.labels] || subject.labels.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Grade - Grade-level page links */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {byGradeTitle[locale] || 'By Grade'}
            </h4>
            <ul className="space-y-2 text-sm">
              {gradeLinks.map(grade => (
                <li key={grade.slug}>
                  <Link href={`/${locale}/apps/grades/${grade.slug}`} className="hover:text-white">
                    {grade.labels[locale as keyof typeof grade.labels] || grade.labels.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* By Theme - Theme worksheets page links */}
          <div>
            <h4 className="text-white font-semibold mb-4">
              {byThemeTitle[locale] || 'By Theme'}
            </h4>
            <ul className="space-y-2 text-sm">
              {themeLinks.map(theme => {
                const slug = getThemeSlug(theme.id, locale);
                if (!slug) return null;
                return (
                  <li key={theme.id}>
                    <Link href={`/${locale}/worksheets/${slug}`} className="hover:text-white">
                      {theme.labels[locale as keyof typeof theme.labels] || theme.labels.en}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-2">
                <Link href={`/${locale}/worksheets`} className="text-purple-400 hover:text-white font-medium">
                  {viewAllThemesLabel[locale] || viewAllThemesLabel.en}
                </Link>
              </li>
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
