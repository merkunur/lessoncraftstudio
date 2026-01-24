/**
 * Dynamic Redirect Generator for Product Pages (JavaScript version)
 *
 * This module generates SEO redirects from English slugs to localized slugs.
 * Used by next.config.js which requires CommonJS format.
 */

// Import the slug configuration (this works because it's a .ts file that can be transpiled)
// Note: This is a simplified version that works with Next.js's config loading

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'da', 'sv', 'no', 'fi'];

// Product page slug configuration (must be kept in sync with product-page-slugs.ts)
const productPageSlugs = [
  { appId: 'word-search', slugs: { en: 'word-search-worksheets', sv: 'ordletar-arbetsblad', de: 'wortsuche-arbeitsblaetter', fr: 'mots-caches-fiches', es: 'sopa-letras-fichas', it: 'cerca-parole-schede', pt: 'caca-palavras-fichas', nl: 'woordzoeker-werkbladen', da: 'ordsoegning-arbejdsark', no: 'ordsoek-arbeidsark', fi: 'sananhaku-tyoarkit' } },
  { appId: 'image-addition', slugs: { en: 'addition-worksheets', sv: 'addition-arbetsblad', de: 'addition-arbeitsblaetter', fr: 'addition-fiches', es: 'suma-fichas', it: 'addizione-schede', pt: 'adicao-fichas', nl: 'optellen-werkbladen', da: 'addition-arbejdsark', no: 'addisjon-arbeidsark', fi: 'yhteenlasku-tyoarkit' } },
  { appId: 'alphabet-train', slugs: { en: 'alphabet-train-worksheets', sv: 'alfabettag-arbetsblad', de: 'alphabet-zug-arbeitsblaetter', fr: 'train-alphabet-fiches', es: 'tren-alfabeto-fichas', it: 'treno-alfabeto-schede', pt: 'trem-alfabeto-fichas', nl: 'alfabet-trein-werkbladen', da: 'alfabet-tog-arbejdsark', no: 'alfabet-tog-arbeidsark', fi: 'aakkosjuna-tyoarkit' } },
  { appId: 'coloring', slugs: { en: 'coloring-worksheets', sv: 'malarbilder-arbetsblad', de: 'malvorlagen-arbeitsblaetter', fr: 'coloriage-fiches', es: 'dibujos-colorear-fichas', it: 'disegni-da-colorare', pt: 'desenhos-colorir-fichas', nl: 'kleurplaten-werkbladen', da: 'malebog-arbejdsark', no: 'fargeleggingsbilder-arbeidsark', fi: 'varityskuvat-tyoarkit' } },
  { appId: 'math-worksheet', slugs: { en: 'math-worksheets', sv: 'matematik-arbetsblad', de: 'mathe-arbeitsblaetter', fr: 'exercices-maths-fiches', es: 'acertijos-matematicos-fichas', it: 'matematica-schede', pt: 'atividades-matematica-fichas', nl: 'rekenen-werkbladen', da: 'matematikopgaver-arbejdsark', no: 'matematikk-oppgaver-arbeidsark', fi: 'matematiikka-tyoarkit' } },
  { appId: 'word-scramble', slugs: { en: 'word-scramble-worksheets', sv: 'ordpussel-arbetsblad', de: 'buchstabensalat-arbeitsblaetter', fr: 'mots-melanges-fiches', es: 'letras-revueltas-fichas', it: 'anagrammi-schede', pt: 'palavras-embaralhadas-fichas', nl: 'woordkruisel-werkbladen', da: 'bogstavblanding-arbejdsark', no: 'bokstavoppgaver-arbeidsark', fi: 'sanansekoitus-tyoarkit' } },
  { appId: 'find-and-count', slugs: { en: 'find-and-count-worksheets', sv: 'hitta-och-rakna-arbetsblad', de: 'suchen-und-zaehlen-arbeitsblaetter', fr: 'cherche-et-compte-fiches', es: 'buscar-contar-fichas', it: 'trova-e-conta-schede', pt: 'encontre-conte-fichas', nl: 'zoek-en-tel-werkbladen', da: 'find-og-tael-arbejdsark', no: 'finn-og-tell-arbeidsark', fi: 'etsi-ja-laske-tyoarkit' } },
  { appId: 'matching-app', slugs: { en: 'matching-worksheets', sv: 'matchnings-arbetsblad', es: 'relacionar-fichas', it: 'abbinamenti-schede', pt: 'ligar-fichas', nl: 'verbindings-werkbladen', da: 'matchning-arbejdsark', no: 'kobling-arbeidsark', fi: 'yhdista-parit-tyoarkit' } },
  { appId: 'drawing-lines', slugs: { en: 'drawing-lines-worksheets', sv: 'rita-linjer-arbetsblad', de: 'linien-ziehen-arbeitsblaetter', fr: 'graphisme-fiches', es: 'grafomotricidad-fichas', it: 'pregrafismo-schede', pt: 'tracar-linhas-fichas', nl: 'lijnen-trekken-werkbladen', da: 'linjetraening-arbejdsark', no: 'tegning-av-linjer-arbeidsark', fi: 'viivojen-piirtaminen-tyoarkit' } },
  { appId: 'picture-bingo', slugs: { en: 'picture-bingo-worksheets', sv: 'bildlotto-arbetsblad', de: 'bilder-bingo-arbeitsblaetter', fr: 'bingo-images-fiches', es: 'bingo-fichas', it: 'bingo-immagini-schede', pt: 'bingo-ilustrado-fichas', nl: 'plaatjes-bingo-werkbladen', da: 'bingo-arbejdsark', no: 'bildlotto-arbeidsark', fi: 'kuva-bingo-tyoarkit' } },
  { appId: 'sudoku', slugs: { en: 'sudoku-worksheets', sv: 'bildsudoku-arbetsblad', de: 'kinder-sudoku-arbeitsblaetter', es: 'sudoku-fichas-ninos', it: 'sudoku-bambini-schede', pt: 'sudoku-criancas-fichas', nl: 'sudoku-werkbladen', da: 'sudoku-arbejdsark', no: 'sudoku-arbeidsark', fi: 'sudoku-tyoarkit' } },
  { appId: 'big-small-app', slugs: { en: 'big-small-worksheets', sv: 'stort-litet-arbetsblad', de: 'gross-klein-arbeitsblaetter', fr: 'grand-petit-fiches', es: 'grande-pequeno-fichas', it: 'grande-piccolo-schede', pt: 'grande-pequeno-fichas', nl: 'groot-klein-werkbladen', da: 'stor-lille-arbejdsark', no: 'stor-og-liten-arbeidsark', fi: 'iso-pieni-tyoarkit' } },
  { appId: 'chart-count-color', slugs: { en: 'chart-count-worksheets', sv: 'diagram-rakning-arbetsblad', de: 'bilddiagramm-arbeitsblaetter', fr: 'graphique-images-fiches', es: 'graficos-conteo-fichas', it: 'grafici-immagini-schede', pt: 'grafico-pictorico-fichas', nl: 'telgrafieken-werkbladen', da: 'billediagram-arbejdsark', no: 'bildediagram-arbeidsark', fi: 'kuvakaavio-tyoarkit' } },
  { appId: 'code-addition', slugs: { en: 'code-addition-worksheets', sv: 'kodaddition-arbetsblad', de: 'bilder-additions-arbeitsblaetter', fr: 'addition-codee-fiches', es: 'suma-codigo-fichas', it: 'addizioni-immagini-schede', pt: 'adicao-codigo-fichas', nl: 'visuele-optelsommen-werkbladen', da: 'kode-plusstykker-arbejdsark', no: 'bildeaddisjon-arbeidsark', fi: 'kuva-yhteenlasku-tyoarkit' } },
  { appId: 'draw-and-color', slugs: { en: 'draw-and-color-worksheets', sv: 'rutritning-arbetsblad', de: 'rasterzeichnen-arbeitsblaetter', fr: 'dessin-quadrillage-fiches', es: 'dibujo-cuadricula-fichas', it: 'disegno-griglia-schede', pt: 'desenho-grade-fichas', nl: 'rastertekenen-werkbladen', da: 'tegn-og-farvelaeg-arbejdsark', no: 'rutenetttegning-arbeidsark', fi: 'ruudukkopiirustus-tyoarkit' } },
  { appId: 'find-objects', slugs: { en: 'find-objects-worksheets', sv: 'hitta-foremal-arbetsblad', de: 'suchbilder-arbeitsblaetter', fr: 'cherche-objets-fiches', es: 'buscar-objetos-fichas', it: 'trova-oggetti-schede', pt: 'encontrar-objetos-fichas', nl: 'zoek-voorwerpen-werkbladen', da: 'find-objekterne-arbejdsark', no: 'finn-objektene-arbeidsark', fi: 'etsi-esineet-tyoarkit' } },
  { appId: 'grid-match', slugs: { en: 'grid-match-worksheets', sv: 'rutnatsmatching-arbetsblad', de: 'raster-puzzle-arbeitsblaetter', es: 'rompecabezas-cuadricula-fichas', it: 'griglia-abbinamento-schede', pt: 'quebra-cabeca-grade-fichas', nl: 'raster-puzzel-werkbladen', da: 'raster-puslespil-arbejdsark', no: 'rutenett-tilpasning-arbeidsark', fi: 'ruudukko-sovitus-tyoarkit' } },
  { appId: 'image-crossword', slugs: { en: 'crossword-worksheets', sv: 'bildkorsord-arbetsblad', de: 'bilderkreuzwortraetsel-arbeitsblaetter', fr: 'mots-croises-images-fiches', es: 'crucigramas-imagenes-fichas', it: 'cruciverba-immagini-schede', pt: 'palavras-cruzadas-imagens-fichas', nl: 'kruiswoordpuzzel-werkbladen', da: 'krydsord-arbejdsark', no: 'bildekryssord-arbeidsark', fi: 'ristisanatehtavat-tyoarkit' } },
  { appId: 'image-cryptogram', slugs: { en: 'cryptogram-worksheets', sv: 'bildkryptogram-arbetsblad', de: 'bildkryptogramm-arbeitsblaetter', fr: 'cryptogramme-images-fiches', es: 'criptogramas-imagenes-fichas', it: 'crittogramma-schede', pt: 'criptograma-imagens-fichas', nl: 'cryptogram-werkbladen', da: 'kryptogram-arbejdsark', no: 'kryptogram-arbeidsark', fi: 'kuvakryptogrammi-tyoarkit' } },
  { appId: 'math-puzzle', slugs: { en: 'math-puzzle-worksheets', sv: 'mattepussel-arbetsblad', de: 'mathe-raetsel-arbeitsblaetter', fr: 'puzzle-maths-fiches', es: 'rompecabezas-matematicos-fichas', it: 'puzzle-matematici-schede', pt: 'quebra-cabeca-matematica-fichas', nl: 'rekenpuzzels-werkbladen', da: 'matteleger-arbejdsark', no: 'matematikkgater-arbeidsark', fi: 'matematiikkapulmat-tyoarkit' } },
  { appId: 'missing-pieces', slugs: { en: 'missing-pieces-worksheets', sv: 'saknade-bitar-arbetsblad', de: 'fehlende-puzzleteile-arbeitsblaetter', fr: 'pieces-manquantes-fiches', es: 'piezas-faltantes-fichas', it: 'pezzi-mancanti-schede', pt: 'pecas-faltantes-fichas', nl: 'ontbrekende-puzzelstukjes-werkbladen', da: 'manglende-brikker-arbejdsark', no: 'manglende-biter-arbeidsark', fi: 'puuttuvat-palat-tyoarkit' } },
  { appId: 'more-less', slugs: { en: 'more-less-worksheets', sv: 'jamforelse-arbetsblad', de: 'mehr-weniger-arbeitsblaetter', fr: 'comparaison-quantites-fiches', es: 'mayor-menor-fichas', it: 'confronto-numeri-schede', pt: 'maior-menor-fichas', nl: 'meer-minder-werkbladen', da: 'sammenligningsopgaver-arbejdsark', no: 'sammenligningsoppgaver-arbeidsark', fi: 'enemman-vahemman-tyoarkit' } },
  { appId: 'odd-one-out', slugs: { en: 'odd-one-out-worksheets', sv: 'hitta-udda-bilden-arbetsblad', de: 'was-passt-nicht-arbeitsblaetter', fr: 'intrus-fiches', es: 'encuentra-el-diferente-fichas', it: 'trova-intruso-schede', pt: 'encontre-diferente-fichas', nl: 'welke-hoort-niet-bij-werkbladen', da: 'find-den-ulige-arbejdsark', no: 'finn-den-ulike-arbeidsark', fi: 'poikkea-joukosta-tyoarkit' } },
  { appId: 'pattern-train', slugs: { en: 'pattern-train-worksheets', sv: 'monster-tag-arbetsblad', de: 'muster-zug-arbeitsblaetter', fr: 'train-suites-logiques-fiches', es: 'tren-patrones-fichas', it: 'treno-sequenze-schede', pt: 'trem-padroes-fichas', nl: 'patroontrein-werkbladen', da: 'moenstertog-arbejdsark', no: 'monstertog-arbeidsark', fi: 'kuviojuna-tyoarkit' } },
  { appId: 'pattern-worksheet', slugs: { en: 'pattern-worksheets', sv: 'monster-arbetsblad', de: 'muster-arbeitsblatt-arbeitsblaetter', fr: 'sequences-logiques-fiches', es: 'fichas-patrones', it: 'schede-pattern', pt: 'fichas-padroes-sequencias', nl: 'patronen-werkbladen', da: 'moenstre-arbejdsark', no: 'monsteroppgaver-arbeidsark', fi: 'kuviotehtava-tyoarkit' } },
  { appId: 'picture-path', slugs: { en: 'picture-path-worksheets', sv: 'bildlabyrint-arbetsblad', de: 'bilderpfad-arbeitsblaetter', fr: 'parcours-images-fiches', es: 'laberintos-imagenes-fichas', it: 'percorso-illustrato-schede', pt: 'labirinto-caminhos-fichas', nl: 'doolhof-werkbladen', da: 'billedsti-arbejdsark', no: 'bildesti-arbeidsark', fi: 'kuvapolku-tyoarkit' } },
  { appId: 'picture-sort', slugs: { en: 'picture-sort-worksheets', sv: 'bildsortering-arbetsblad', de: 'bilder-sortieren-arbeitsblaetter', fr: 'tri-images-fiches', es: 'clasificar-imagenes-fichas', it: 'classificazione-immagini-schede', pt: 'classificacao-imagens-fichas', nl: 'sorteer-werkbladen', da: 'billedsortering-arbejdsark', no: 'bildesortering-arbeidsark', fi: 'kuvalajittelu-tyoarkit' } },
  { appId: 'prepositions', slugs: { en: 'prepositions-worksheets', sv: 'prepositioner-arbetsblad', de: 'praepositionen-arbeitsblaetter', fr: 'prepositions-exercices-fiches', es: 'preposiciones-fichas', it: 'preposizioni-schede', pt: 'preposicoes-fichas', nl: 'voorzetsels-werkbladen', da: 'praepositioner-arbejdsark', no: 'preposisjoner-arbeidsark', fi: 'prepositio-tyoarkit' } },
  { appId: 'shadow-match', slugs: { en: 'shadow-match-worksheets', sv: 'skuggmatchning-arbetsblad', fi: 'varjoyhdistely-tyoarkit', de: 'schattenbilder-zuordnen-arbeitsblaetter', fr: 'discrimination-visuelle-fiches', es: 'asociacion-sombras-fichas', it: 'abbinamento-ombre-schede', pt: 'combinar-sombras-fichas', nl: 'schaduw-matching-werkbladen', da: 'skygge-match-arbejdsark', no: 'skyggematching-arbeidsark' } },
  { appId: 'subtraction', slugs: { en: 'subtraction-worksheets', sv: 'subtraktion-arbetsblad', de: 'subtraktion-arbeitsblaetter', fr: 'soustraction-fiches', es: 'resta-fichas', it: 'sottrazione-schede', pt: 'subtracao-fichas', nl: 'aftrekken-werkbladen', da: 'subtraktion-arbejdsark', no: 'subtraksjon-arbeidsark', fi: 'vahennyslasku-tyoarkit' } },
  { appId: 'treasure-hunt', slugs: { en: 'treasure-hunt-worksheets', sv: 'skattjakt-arbetsblad', de: 'schatzsuche-arbeitsblaetter', fr: 'chasse-au-tresor-fiches', es: 'busqueda-tesoro-fichas', it: 'caccia-tesoro-schede', pt: 'caca-ao-tesouro-fichas', nl: 'schattenjacht-werkbladen', da: 'skattejagt-arbejdsark', no: 'skattejakt-arbeidsark', fi: 'aarteenetsinta-tyoarkit' } },
  { appId: 'word-guess', slugs: { en: 'word-guess-worksheets', sv: 'gissa-ordet-arbetsblad', de: 'woerter-raten-arbeitsblaetter', fr: 'deviner-mots-fiches', es: 'adivinar-palabras-fichas', it: 'indovina-parole-schede', pt: 'adivinhar-palavras-fichas', nl: 'woordraadsel-werkbladen', da: 'gaet-ordet-arbejdsark', no: 'gjetteoppgaver-arbeidsark', fi: 'kuva-arvaus-tyoarkit' } },
  { appId: 'writing-app', slugs: { en: 'writing-worksheets', sv: 'skrivovningar-arbetsblad', de: 'schreibuebungen-arbeitsblaetter', fr: 'ecriture-fiches', es: 'lectoescritura-fichas', it: 'scrittura-schede', pt: 'caligrafia-fichas', nl: 'schrijfoefeningen-werkbladen', da: 'skriveopgaver-arbejdsark', no: 'skriveark-arbeidsark', fi: 'kasinkirjoitus-tyoarkit' } },
  { appId: 'fr-grid-match', slugs: { en: 'grid-match-worksheets', fr: 'puzzle-grille-fiches' } },
  { appId: 'fr-pattern-worksheet', slugs: { en: 'pattern-worksheets', fr: 'suites-logiques-fiches' } },
  { appId: 'fr-picture-sort', slugs: { en: 'picture-sort-worksheets', fr: 'tri-images-fiches' } },
  { appId: 'fr-more-less', slugs: { en: 'more-less-worksheets', fr: 'plus-moins-fiches' } },
  { appId: 'es-picture-path', slugs: { en: 'picture-path-worksheets', es: 'caminos-imagenes-fichas' } },
];

/**
 * Generate product page redirects from English slugs to localized slugs
 */
function generateProductPageRedirects() {
  const redirects = [];

  for (const app of productPageSlugs) {
    const englishSlug = app.slugs.en;
    if (!englishSlug) continue;

    for (const locale of SUPPORTED_LOCALES) {
      // Skip English
      if (locale === 'en') continue;

      const localizedSlug = app.slugs[locale];

      // Only create redirect if localized slug exists and differs from English
      if (localizedSlug && localizedSlug !== englishSlug) {
        redirects.push({
          source: `/${locale}/apps/${englishSlug}`,
          destination: `/${locale}/apps/${localizedSlug}`,
          permanent: true,
        });
      }
    }
  }

  return redirects;
}

module.exports = {
  generateProductPageRedirects,
  productPageSlugs,
  SUPPORTED_LOCALES,
};
