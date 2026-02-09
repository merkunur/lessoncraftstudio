import fs from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import { generateLocalizedAltText, generateLocalizedTitle, generateLocalizedCaption } from '@/lib/localized-seo-templates';

// Base path for samples (filesystem scanning)
// Production uses isolated /var/www/lcs-media/samples - COMPLETELY SEPARATE from code repository
const SAMPLES_BASE = process.env.NODE_ENV === 'production'
  ? '/var/www/lcs-media/samples'
  : path.join(process.cwd(), 'public', 'samples');

// Locale to language folder mapping
const localeToFolder: Record<string, string> = {
  en: 'english',
  de: 'german',
  fr: 'french',
  es: 'spanish',
  it: 'italian',
  pt: 'portuguese',
  nl: 'dutch',
  da: 'danish',
  sv: 'swedish',
  no: 'norwegian',
  fi: 'finnish',
};

// Locale-aware app display names for localized SEO (alt text, image sitemap, schemas)
// C3/C4 fix: Previously English-only, now returns localized product names
const appIdToLocalizedDisplayName: Record<string, Record<string, string>> = {
  'addition': { en: 'Addition', de: 'Additions-Arbeitsbl\u00e4tter', fr: "Fiches d'addition", es: 'Fichas de sumas', it: 'Schede di addizioni', pt: 'Atividades de Adi\u00e7\u00e3o', nl: 'Optelwerkbladen', da: 'Additionsopgaver', sv: 'Additions\u00f6vningsblad', no: 'Addisjonsoppgaver', fi: 'Yhteenlaskuteht\u00e4v\u00e4t' },
  'alphabet-train': { en: 'Alphabet Train', de: 'ABC-Zug', fr: "Train de l'alphabet", es: 'Tren del abecedario', it: "Trenino dell'alfabeto", pt: 'Trenzinho do alfabeto', nl: 'Alfabettrein', da: 'Alfabettog', sv: 'Alfabet\u00e5get', no: 'Alfabettoget', fi: 'Aakkosjuna' },
  'big-small': { en: 'Big and Small', de: 'Gro\u00df oder Klein', fr: 'Grand ou Petit', es: 'Grande o Peque\u00f1o', it: 'Grande o Piccolo', pt: 'Grande ou Pequeno', nl: 'Groot of Klein', da: 'Stort eller Lille', sv: 'Stort eller Litet', no: 'Stort eller Lite', fi: 'Iso vai Pieni' },
  'bingo': { en: 'Picture Bingo', de: 'Bilder-Bingo', fr: 'Bingo en images', es: 'Bingo de im\u00e1genes', it: 'Bingo illustrato', pt: 'Bingo de imagens', nl: 'Plaatjesbingo', da: 'Billedbingo', sv: 'Bildbingo', no: 'Bildebingo', fi: 'Kuvabingo' },
  'chart-count': { en: 'Chart Count', de: 'Bilddiagramm', fr: "Graphique d'images", es: 'Gr\u00e1fico de Dibujos', it: 'Grafico con Immagini', pt: 'Gr\u00e1fico de Figuras', nl: 'Plaatjesgrafiek', da: 'Billediagram', sv: 'Bilddiagram', no: 'Bildediagram', fi: 'Kuvakaavio' },
  'code-addition': { en: 'Code Addition', de: 'Rechencode', fr: 'Addition cod\u00e9e', es: 'Sumas con c\u00f3digo', it: 'Addizioni in codice', pt: 'Adi\u00e7\u00e3o com c\u00f3digo', nl: 'Optellen met code', da: 'Kodeaddition', sv: 'Kodaddition', no: 'Kodeaddisjon', fi: 'Koodiyhteenlasku' },
  'coloring': { en: 'Coloring Pages', de: 'Ausmalbilder', fr: 'Coloriages', es: 'P\u00e1ginas para colorear', it: 'Disegni da colorare', pt: 'Desenhos para colorir', nl: 'Kleurplaten', da: 'Tegnesider', sv: 'M\u00e5larbilder', no: 'Fargeleggingssider', fi: 'V\u00e4rityssivut' },
  'crossword': { en: 'Crossword Puzzles', de: 'Kreuzwortr\u00e4tsel', fr: 'Mots crois\u00e9s', es: 'Crucigramas', it: 'Cruciverba', pt: 'Palavras cruzadas', nl: 'Kruiswoordpuzzels', da: 'Krydsord', sv: 'Korsord', no: 'Kryssord', fi: 'Ristikot' },
  'cryptogram': { en: 'Cryptogram Puzzles', de: 'Kryptogramme', fr: 'Cryptogrammes', es: 'Criptogramas', it: 'Crittogrammi', pt: 'Criptogramas', nl: 'Cryptogrammen', da: 'Kryptogrammer', sv: 'Kryptogram', no: 'Kryptogrammer', fi: 'Kryptogrammit' },
  'draw-and-color': { en: 'Draw and Color', de: 'Zeichnen und Ausmalen', fr: 'Dessine et Colorie', es: 'Dibuja y Colorea', it: 'Disegna e Colora', pt: 'Desenha e Pinta', nl: 'Teken en Kleur', da: 'Tegn og Farvl\u00e6g', sv: 'Rita och F\u00e4rgl\u00e4gg', no: 'Tegn og Fargelegg', fi: 'Piirr\u00e4 ja V\u00e4rit\u00e4' },
  'drawing-lines': { en: 'Drawing Lines', de: 'Linien zeichnen', fr: 'Tracer des lignes', es: 'Trazar l\u00edneas', it: 'Traccia le linee', pt: 'Tra\u00e7ar linhas', nl: 'Lijnen trekken', da: 'Tegn streger', sv: 'Dra streck', no: 'Tegn linjer', fi: 'Viivojen piirt\u00e4minen' },
  'find-and-count': { en: 'Find and Count', de: 'Suchen und Z\u00e4hlen', fr: 'Je vois', es: 'Veo Veo', it: 'Vedo Vedo', pt: 'Vejo Vejo', nl: 'Ik zie ik zie', da: 'Jeg ser jeg ser', sv: 'Hitta och r\u00e4kna', no: 'Jeg ser jeg ser', fi: 'Min\u00e4 n\u00e4en' },
  'find-objects': { en: 'Find Objects', de: 'Suchbilder', fr: 'Cherche et trouve', es: 'Busca y encuentra', it: 'Cerca e trova', pt: 'Encontre os objetos', nl: 'Zoek en vind', da: 'Find objekterne', sv: 'Hitta f\u00f6rem\u00e5len', no: 'Finn gjenstandene', fi: 'Etsi esineet' },
  'grid-match': { en: 'Grid Match', de: 'Raster-Puzzle', fr: 'Puzzle Grille', es: 'Puzzle de Cuadr\u00edcula', it: 'Puzzle a Griglia', pt: 'Quebra-Cabe\u00e7a de Grade', nl: 'Rasterpuzzel', da: 'Gitterpuslespil', sv: 'Rutn\u00e4tspussel', no: 'Rutenettspuslespill', fi: 'Ruudukkopalapeli' },
  'matching': { en: 'Matching Game', de: 'Zuordnungsspiel', fr: "Jeu d'association", es: 'Relacionar parejas', it: 'Abbinamenti', pt: 'Jogo de correspond\u00eancia', nl: 'Koppelspel', da: 'Parspil', sv: 'Para ihop', no: 'Finn par', fi: 'Yhdist\u00e4misteht\u00e4v\u00e4' },
  'math-puzzle': { en: 'Math Puzzle', de: 'Mathe-R\u00e4tsel', fr: 'Casse-T\u00eates Math\u00e9matiques', es: 'Rompecabezas Matem\u00e1ticos', it: 'Rompicapi Matematici', pt: 'Quebra-Cabe\u00e7as Matem\u00e1tico', nl: 'Wiskundepuzzels', da: 'Mattepuslespil', sv: 'Mattepussel', no: 'Mattepuslespill', fi: 'Matematiikkapulmat' },
  'math-worksheet': { en: 'Math', de: 'Mathe-\u00dcbungsbl\u00e4tter', fr: 'Feuilles de Math\u00e9matiques', es: 'Hojas de Matem\u00e1ticas', it: 'Schede di Matematica', pt: 'Folhas de Matem\u00e1tica', nl: 'Wiskundebladen', da: 'Matematikopgaver', sv: 'Matte\u00f6vningsblad', no: 'Matematikkoppgaver', fi: 'Matematiikkalehdet' },
  'missing-pieces': { en: 'Missing Pieces', de: 'Fehlende Teile', fr: 'Pi\u00e8ces Manquantes', es: 'Piezas Perdidas', it: 'Pezzi Mancanti', pt: 'Pe\u00e7as em Falta', nl: 'Ontbrekende Stukjes', da: 'Manglende Dele', sv: 'Saknade Bitar', no: 'Manglende Deler', fi: 'Puuttuvat Palat' },
  'more-less': { en: 'More or Less', de: 'Mehr oder Weniger', fr: 'Plus ou Moins', es: 'M\u00e1s o Menos', it: 'Pi\u00f9 o Meno', pt: 'Mais ou Menos', nl: 'Meer of Minder', da: 'Mere eller Mindre', sv: 'Mer eller Mindre', no: 'Mer eller Mindre', fi: 'Enemm\u00e4n tai V\u00e4hemm\u00e4n' },
  'odd-one-out': { en: 'Odd One Out', de: 'Was passt nicht?', fr: "Trouve l'intrus", es: 'Encuentra el diferente', it: 'Trova il diverso', pt: 'Encontra o diferente', nl: 'Vind de vreemde eend', da: 'Find den ulige', sv: 'Hitta udda', no: 'Finn den rare', fi: 'L\u00f6yd\u00e4 outo' },
  'pattern-train': { en: 'Pattern Train', de: 'Musterzug', fr: 'Train \u00e0 Motifs', es: 'Tren de Patrones', it: 'Treno dei Modelli', pt: 'Comboio de Padr\u00f5es', nl: 'Patroontrein', da: 'M\u00f8nstertoget', sv: 'M\u00f6nstert\u00e5get', no: 'M\u00f8nstertoget', fi: 'Kuviojuna' },
  'pattern-worksheet': { en: 'Pattern Recognition', de: 'Musterr\u00e4tsel', fr: 'Puzzles de Motifs', es: 'Rompecabezas de Patrones', it: 'Puzzle di Schemi', pt: 'Quebra-cabe\u00e7as de Padr\u00f5es', nl: 'Patroonpuzzels', da: 'M\u00f8nsterg\u00e5der', sv: 'M\u00f6nsterpussel', no: 'M\u00f8nsterg\u00e5ter', fi: 'Kuvioteht\u00e4v\u00e4t' },
  'picture-path': { en: 'Picture Path', de: 'Bilderpfad', fr: "Chemin d'Images", es: 'Camino de Im\u00e1genes', it: 'Percorso di Immagini', pt: 'Caminho de Imagens', nl: 'Afbeeldingspad', da: 'Billedsti', sv: 'Bildv\u00e4g', no: 'Bildesti', fi: 'Kuvapolku' },
  'picture-sort': { en: 'Picture Sort', de: 'Bilder Sortieren', fr: "Tri d'Images", es: 'Clasificaci\u00f3n de Im\u00e1genes', it: 'Classificazione Immagini', pt: 'Classifica\u00e7\u00e3o de Imagens', nl: 'Afbeeldingen Sorteren', da: 'Sorter Billeder', sv: 'Sortera Bilder', no: 'Sorter Bilder', fi: 'Lajittele Kuvat' },
  'prepositions': { en: 'Prepositions', de: 'Pr\u00e4positionen', fr: 'Pr\u00e9positions', es: 'Preposiciones', it: 'Preposizioni', pt: 'Preposi\u00e7\u00f5es', nl: 'Voorzetsels', da: 'Pr\u00e6positioner', sv: 'Prepositioner', no: 'Preposisjoner', fi: 'Prepositiot' },
  'shadow-match': { en: 'Shadow Match', de: 'Schatten Zuordnen', fr: "Trouve l'Ombre", es: 'Empareja las Sombras', it: 'Abbina le Ombre', pt: 'Combine as Sombras', nl: 'Schaduw Koppelen', da: 'G\u00f8r Billederne Hele', sv: 'Skuggmatchning', no: 'Fullf\u00f8r Bildene', fi: 'T\u00e4ydenn\u00e4 Kuvat' },
  'subtraction': { en: 'Subtraction', de: 'Subtraktions-Arbeitsbl\u00e4tter', fr: 'Fiches de soustraction', es: 'Fichas de restas', it: 'Schede di sottrazioni', pt: 'Atividades de Subtra\u00e7\u00e3o', nl: 'Aftrekwerkbladen', da: 'Subtraktionsopgaver', sv: 'Subtraktions\u00f6vningsblad', no: 'Subtraksjonsoppgaver', fi: 'V\u00e4hennyslaskuteht\u00e4v\u00e4t' },
  'sudoku': { en: 'Sudoku Puzzles', de: 'Sudoku-R\u00e4tsel', fr: 'Grilles de Sudoku', es: 'Sudoku', it: 'Sudoku', pt: 'Sudoku', nl: 'Sudoku-puzzels', da: 'Sudoku', sv: 'Sudoku', no: 'Sudoku', fi: 'Sudoku-teht\u00e4v\u00e4t' },
  'treasure-hunt': { en: 'Treasure Hunt', de: 'Schatzsuche', fr: 'Chasse au Tr\u00e9sor', es: 'B\u00fasqueda del Tesoro', it: 'Caccia al Tesoro', pt: 'Ca\u00e7a ao Tesouro', nl: 'Schattenjacht', da: 'Skattejagt', sv: 'Skattjakt', no: 'Skattejakt', fi: 'Aarteenetsint\u00e4' },
  'word-guess': { en: 'Word Guess', de: 'W\u00f6rter-R\u00e4tsel', fr: 'Devine le Mot', es: 'Adivina la Palabra', it: 'Indovina la Parola', pt: 'Adivinha a Palavra', nl: 'Raad het Woord', da: 'G\u00e6t Ordet', sv: 'Gissa Ordet', no: 'Gjett Ordet', fi: 'Arvaa Sana' },
  'word-scramble': { en: 'Word Scramble', de: 'Buchstabensalat', fr: 'Mots M\u00eal\u00e9s', es: 'Palabras Revueltas', it: 'Lettere Mescolate', pt: 'Letras Embaralhadas', nl: 'Letterzaak', da: 'Bogstavrod', sv: 'Ordmix', no: 'Bokstavblanding', fi: 'Kirjainsekoitus' },
  'wordsearch': { en: 'Word Search', de: 'Wortsuche', fr: 'Mots m\u00eal\u00e9s', es: 'Sopa de letras', it: 'Cerca parole', pt: 'Ca\u00e7a-palavras', nl: 'Woordzoeker', da: 'Find ord', sv: 'Ords\u00f6k', no: 'Finn ord', fi: 'Sananetsint\u00e4' },
  'writing': { en: 'Writing Practice', de: 'Schreib\u00fcbungen', fr: '\u00c9criture', es: 'Escritura', it: 'Scrittura', pt: 'Escrita', nl: 'Schrijfoefeningen', da: 'Skrive\u00f8velser', sv: 'Skriv\u00f6vningar', no: 'Skrive\u00f8velser', fi: 'Kirjoitusharjoitukset' },
};

// Get localized display name for an app (falls back to English)
export function getLocalizedDisplayName(appId: string, locale: string): string {
  return appIdToLocalizedDisplayName[appId]?.[locale] || appIdToLocalizedDisplayName[appId]?.en || appId.replace(/-/g, ' ');
}

// Valid app IDs (33 apps) - same as in the API route
const validAppIds = [
  'addition', 'alphabet-train', 'big-small', 'bingo', 'chart-count', 'code-addition',
  'coloring', 'crossword', 'cryptogram', 'draw-and-color', 'drawing-lines',
  'find-and-count', 'find-objects', 'grid-match', 'matching', 'math-puzzle',
  'math-worksheet', 'missing-pieces', 'more-less', 'odd-one-out', 'pattern-train',
  'pattern-worksheet', 'picture-path', 'picture-sort', 'prepositions',
  'shadow-match', 'subtraction', 'sudoku', 'treasure-hunt', 'word-guess',
  'word-scramble', 'wordsearch', 'writing'
];

export interface HomepageSamplesData {
  dynamicImages: Record<string, string>;
  seoData: Record<string, { altText: string; title: string; description: string; caption: string; updatedAt?: string }>;
  heroImages: { portrait: string; landscape: string };
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get homepage samples data directly from filesystem + database.
 * This replaces the self-referential HTTP fetch that caused request deadlock under load.
 */
export async function getHomepageSamplesData(locale: string): Promise<HomepageSamplesData> {
  const result: HomepageSamplesData = {
    dynamicImages: {},
    seoData: {},
    heroImages: { portrait: '', landscape: '' }
  };

  try {
    const language = localeToFolder[locale];
    if (!language) return result;

    const dir = path.join(SAMPLES_BASE, language, 'homepage');

    // Check all app thumbnails in parallel
    const appChecks = await Promise.all(
      validAppIds.map(async (appId) => {
        const [hasPreviewWebp] = await Promise.all([
          fileExists(path.join(dir, `${appId}-thumbnail_preview.webp`)),
        ]);
        // We need hasThumbnail AND hasPreviewWebp for the gallery
        // But we only use _thumb.webp in the actual URL
        const hasThumbWebp = hasPreviewWebp
          ? await fileExists(path.join(dir, `${appId}-thumbnail_thumb.webp`))
          : false;
        return { appId, hasThumbWebp, hasPreviewWebp };
      })
    );

    // Build dynamicImages map
    for (const { appId, hasThumbWebp, hasPreviewWebp } of appChecks) {
      if (hasThumbWebp && hasPreviewWebp) {
        result.dynamicImages[appId] = `/samples/${language}/homepage/${appId}-thumbnail_thumb.webp`;
      }
    }

    // Check hero images in parallel
    const [hasPortraitPreview, hasLandscapePreview] = await Promise.all([
      fileExists(path.join(dir, 'hero-portrait_preview.webp')),
      fileExists(path.join(dir, 'hero-landscape_preview.webp')),
    ]);

    if (hasPortraitPreview) {
      result.heroImages.portrait = `/samples/${language}/homepage/hero-portrait_preview.webp`;
    }
    if (hasLandscapePreview) {
      result.heroImages.landscape = `/samples/${language}/homepage/hero-landscape_preview.webp`;
    }

    // Query SEO data from database for homepage thumbnails
    try {
      const seoRecords = await prisma.productSample.findMany({
        where: {
          locale,
          filename: { endsWith: '-thumbnail.jpeg' }
        },
        select: {
          appId: true,
          altText: true,
          title: true,
          description: true,
          updatedAt: true,
        }
      });
      for (const s of seoRecords) {
        const displayName = getLocalizedDisplayName(s.appId, locale);
        result.seoData[s.appId] = {
          altText: s.altText || generateLocalizedAltText(displayName, locale, 1),
          title: s.title || generateLocalizedTitle(displayName, locale, 1),
          description: (s.description as string) || generateLocalizedAltText(displayName, locale, 1),
          caption: generateLocalizedCaption(displayName, locale, 1),
          updatedAt: s.updatedAt ? s.updatedAt.toISOString().split('T')[0] : undefined,
        };
      }
    } catch {
      // SEO data is optional - continue without it
    }

    // Ensure every app with a thumbnail has rich localized SEO metadata (even without DB records)
    for (const appId of Object.keys(result.dynamicImages)) {
      if (!result.seoData[appId]) {
        const displayName = getLocalizedDisplayName(appId, locale);
        result.seoData[appId] = {
          altText: generateLocalizedAltText(displayName, locale, 1),
          title: generateLocalizedTitle(displayName, locale, 1),
          description: generateLocalizedAltText(displayName, locale, 1),
          caption: generateLocalizedCaption(displayName, locale, 1),
        };
      }
    }
  } catch {
    // Silent fallback to empty data - same behavior as the HTTP fetch version
  }

  return result;
}
