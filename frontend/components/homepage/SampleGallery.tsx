'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Sample {
  id: string;
  nameEn: string;
  nameDe: string;
  nameFr: string;
  nameEs: string;
  nameIt: string;
  namePt: string;
  nameNl: string;
  nameDa: string;
  nameSv: string;
  nameNo: string;
  nameFi: string;
  categoryEn: string;
  categoryDe: string;
  categoryFr: string;
  categoryEs: string;
  categoryIt: string;
  categoryPt: string;
  categoryNl: string;
  categoryDa: string;
  categorySv: string;
  categoryNo: string;
  categoryFi: string;
  imageSrc: string;
  pdfUrl: string;
  productPageSlug: string;
}

interface SampleGalleryProps {
  locale: string;
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  statSamples: string;
  statSamplesLabel: string;
  statQuality: string;
  statQualityLabel: string;
  statFormat: string;
  statFormatLabel: string;
  downloadPdf: string;
  downloading: string;
  viewDetails: string;
  viewAllGenerators: string;
}> = {
  en: {
    badge: 'Free Samples',
    title: 'Download Free Worksheet Samples',
    subtitle: 'Try before you subscribe. Download high-quality PDF samples from our most popular generators.',
    statSamples: '10+',
    statSamplesLabel: 'Free Samples',
    statQuality: '300 DPI',
    statQualityLabel: 'Print Quality',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Download PDF',
    downloading: 'Downloading...',
    viewDetails: 'View Details',
    viewAllGenerators: 'View All 33 Generators',
  },
  de: {
    badge: 'Kostenlose Beispiele',
    title: 'Arbeitsblätter kostenlos herunterladen',
    subtitle: 'Testen Sie vor dem Kauf. Laden Sie hochwertige PDF-Beispiele unserer beliebtesten Generatoren herunter.',
    statSamples: '10+',
    statSamplesLabel: 'Kostenlose Beispiele',
    statQuality: '300 DPI',
    statQualityLabel: 'Druckqualität',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'PDF herunterladen',
    downloading: 'Wird heruntergeladen...',
    viewDetails: 'Mehr erfahren',
    viewAllGenerators: 'Alle 33 Generatoren entdecken',
  },
  fr: {
    badge: 'Exemples gratuits',
    title: 'Téléchargez des fiches gratuites',
    subtitle: 'Testez avant de vous abonner. Téléchargez des exemples PDF haute qualité de nos générateurs les plus populaires.',
    statSamples: '10+',
    statSamplesLabel: 'Exemples gratuits',
    statQuality: '300 DPI',
    statQualityLabel: 'Qualité impression',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Télécharger le PDF',
    downloading: 'Téléchargement...',
    viewDetails: 'En savoir plus',
    viewAllGenerators: 'Explorer les 33 générateurs',
  },
  es: {
    badge: 'Ejemplos gratis',
    title: 'Descarga fichas de muestra gratis',
    subtitle: 'Prueba antes de suscribirte. Descarga ejemplos en PDF de alta calidad de nuestros generadores más populares.',
    statSamples: '10+',
    statSamplesLabel: 'Ejemplos gratis',
    statQuality: '300 DPI',
    statQualityLabel: 'Calidad de impresión',
    statFormat: 'PDF',
    statFormatLabel: 'Formato',
    downloadPdf: 'Descargar PDF',
    downloading: 'Descargando...',
    viewDetails: 'Ver más',
    viewAllGenerators: 'Explorar los 33 generadores',
  },
  it: {
    badge: 'Esempi gratuiti',
    title: 'Scarica schede di esempio gratuite',
    subtitle: 'Prova prima di abbonarti. Scarica esempi PDF di alta qualità dai nostri generatori più popolari.',
    statSamples: '10+',
    statSamplesLabel: 'Esempi gratuiti',
    statQuality: '300 DPI',
    statQualityLabel: 'Qualità di stampa',
    statFormat: 'PDF',
    statFormatLabel: 'Formato',
    downloadPdf: 'Scarica PDF',
    downloading: 'Download in corso...',
    viewDetails: 'Scopri di più',
    viewAllGenerators: 'Esplora tutti i 33 generatori',
  },
  pt: {
    badge: 'Exemplos grátis',
    title: 'Baixe atividades de exemplo grátis',
    subtitle: 'Experimente antes de assinar. Baixe exemplos em PDF de alta qualidade dos nossos geradores mais populares.',
    statSamples: '10+',
    statSamplesLabel: 'Exemplos grátis',
    statQuality: '300 DPI',
    statQualityLabel: 'Qualidade de impressão',
    statFormat: 'PDF',
    statFormatLabel: 'Formato',
    downloadPdf: 'Baixar PDF',
    downloading: 'Baixando...',
    viewDetails: 'Saiba mais',
    viewAllGenerators: 'Ver todos os 33 geradores',
  },
  nl: {
    badge: 'Gratis voorbeelden',
    title: 'Download gratis voorbeeldwerkbladen',
    subtitle: 'Probeer voordat je abonneert. Download hoogwaardige PDF-voorbeelden van onze populairste generatoren.',
    statSamples: '10+',
    statSamplesLabel: 'Gratis voorbeelden',
    statQuality: '300 DPI',
    statQualityLabel: 'Afdrukkwaliteit',
    statFormat: 'PDF',
    statFormatLabel: 'Bestandstype',
    downloadPdf: 'Download PDF',
    downloading: 'Downloaden...',
    viewDetails: 'Meer informatie',
    viewAllGenerators: 'Bekijk alle 33 generatoren',
  },
  da: {
    badge: 'Gratis eksempler',
    title: 'Download gratis opgaveeksempler',
    subtitle: 'Prøv før du abonnerer. Download PDF-eksempler i høj kvalitet fra vores mest populære generatorer.',
    statSamples: '10+',
    statSamplesLabel: 'Gratis eksempler',
    statQuality: '300 DPI',
    statQualityLabel: 'Printkvalitet',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Download PDF',
    downloading: 'Downloader...',
    viewDetails: 'Læs mere',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  sv: {
    badge: 'Gratis exempel',
    title: 'Ladda ner gratis övningsbladsexempel',
    subtitle: 'Testa innan du prenumererar. Ladda ner högkvalitativa PDF-exempel från våra mest populära generatorer.',
    statSamples: '10+',
    statSamplesLabel: 'Gratis exempel',
    statQuality: '300 DPI',
    statQualityLabel: 'Utskriftskvalitet',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Ladda ner PDF',
    downloading: 'Laddar ner...',
    viewDetails: 'Läs mer',
    viewAllGenerators: 'Se alla 33 generatorer',
  },
  no: {
    badge: 'Gratis eksempler',
    title: 'Last ned gratis oppgaveeksempler',
    subtitle: 'Prøv før du abonnerer. Last ned PDF-eksempler i høy kvalitet fra våre mest populære generatorer.',
    statSamples: '10+',
    statSamplesLabel: 'Gratis eksempler',
    statQuality: '300 DPI',
    statQualityLabel: 'Utskriftskvalitet',
    statFormat: 'PDF',
    statFormatLabel: 'Format',
    downloadPdf: 'Last ned PDF',
    downloading: 'Laster ned...',
    viewDetails: 'Les mer',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  fi: {
    badge: 'Ilmaiset esimerkit',
    title: 'Lataa ilmaisia tehtäväesimerkkejä',
    subtitle: 'Kokeile ennen tilaamista. Lataa laadukkaita PDF-esimerkkejä suosituimmista generaattoreistamme.',
    statSamples: '10+',
    statSamplesLabel: 'Ilmaista esimerkkiä',
    statQuality: '300 DPI',
    statQualityLabel: 'Tulostuslaatu',
    statFormat: 'PDF',
    statFormatLabel: 'Tiedostomuoto',
    downloadPdf: 'Lataa PDF',
    downloading: 'Ladataan...',
    viewDetails: 'Lue lisää',
    viewAllGenerators: 'Tutustu kaikkiin 33 generaattoriin',
  },
};

// Real samples from /samples/english/ folder with translations
const samples: Sample[] = [
  {
    id: '1',
    nameEn: 'Addition Worksheets',
    nameDe: 'Additions-Arbeitsblätter',
    nameFr: 'Fiches d\'addition',
    nameEs: 'Fichas de sumas',
    nameIt: 'Schede di addizioni',
    namePt: 'Atividades de Adição',
    nameNl: 'Optelwerkbladen',
    nameDa: 'Additionsopgaver',
    nameSv: 'Additionsövningsblad',
    nameNo: 'Addisjonsoppgaver',
    nameFi: 'Yhteenlaskutehtävät',
    categoryEn: 'Math',
    categoryDe: 'Mathematik',
    categoryFr: 'Maths',
    categoryEs: 'Matemáticas',
    categoryIt: 'Matematica',
    categoryPt: 'Matemática',
    categoryNl: 'Rekenen',
    categoryDa: 'Matematik',
    categorySv: 'Matematik',
    categoryNo: 'Matte',
    categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/addition/addition_worksheet portrait.jpeg',
    pdfUrl: '/samples/english/addition/addition_worksheet portrait.pdf',
    productPageSlug: 'addition-worksheets',
  },
  {
    id: '2',
    nameEn: 'Word Search',
    nameDe: 'Wortsuche',
    nameFr: 'Mots mêlés',
    nameEs: 'Sopa de letras',
    nameIt: 'Cerca parole',
    namePt: 'Caça-palavras',
    nameNl: 'Woordzoeker',
    nameDa: 'Find ord',
    nameSv: 'Ordsök',
    nameNo: 'Finn ord',
    nameFi: 'Sananetsintä',
    categoryEn: 'Language',
    categoryDe: 'Sprache',
    categoryFr: 'Langue',
    categoryEs: 'Lenguaje',
    categoryIt: 'Linguaggio',
    categoryPt: 'Linguagem',
    categoryNl: 'Taal',
    categoryDa: 'Sprog',
    categorySv: 'Språk',
    categoryNo: 'Språk',
    categoryFi: 'Kieli',
    imageSrc: '/samples/english/wordsearch/wordsearch landscape.jpeg',
    pdfUrl: '/samples/english/wordsearch/wordsearch landscape.pdf',
    productPageSlug: 'word-search-worksheets',
  },
  {
    id: '3',
    nameEn: 'Crossword Puzzles',
    nameDe: 'Kreuzworträtsel',
    nameFr: 'Mots croisés',
    nameEs: 'Crucigramas',
    nameIt: 'Cruciverba',
    namePt: 'Palavras cruzadas',
    nameNl: 'Kruiswoordpuzzels',
    nameDa: 'Krydsord',
    nameSv: 'Korsord',
    nameNo: 'Kryssord',
    nameFi: 'Ristikot',
    categoryEn: 'Language',
    categoryDe: 'Sprache',
    categoryFr: 'Langue',
    categoryEs: 'Lenguaje',
    categoryIt: 'Linguaggio',
    categoryPt: 'Linguagem',
    categoryNl: 'Taal',
    categoryDa: 'Sprog',
    categorySv: 'Språk',
    categoryNo: 'Språk',
    categoryFi: 'Kieli',
    imageSrc: '/samples/english/crossword/crossword_worksheet.jpeg',
    pdfUrl: '/samples/english/crossword/crossword_worksheet.jpeg',
    productPageSlug: 'crossword-worksheets',
  },
  {
    id: '4',
    nameEn: 'Drawing Lines',
    nameDe: 'Linien zeichnen',
    nameFr: 'Tracer des lignes',
    nameEs: 'Trazar líneas',
    nameIt: 'Traccia le linee',
    namePt: 'Traçar linhas',
    nameNl: 'Lijnen trekken',
    nameDa: 'Tegn streger',
    nameSv: 'Dra streck',
    nameNo: 'Tegn linjer',
    nameFi: 'Viivojen piirtäminen',
    categoryEn: 'Visual',
    categoryDe: 'Visuell',
    categoryFr: 'Visuel',
    categoryEs: 'Visual',
    categoryIt: 'Visivo',
    categoryPt: 'Visual',
    categoryNl: 'Visueel',
    categoryDa: 'Visuel',
    categorySv: 'Visuellt',
    categoryNo: 'Visuelt',
    categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/drawing lines/drawing_lines_curve 1.jpeg',
    pdfUrl: '/samples/english/drawing lines/drawing_lines_curve 1.pdf',
    productPageSlug: 'drawing-lines-worksheets',
  },
  {
    id: '5',
    nameEn: 'Alphabet Train',
    nameDe: 'ABC-Zug',
    nameFr: 'Train de l\'alphabet',
    nameEs: 'Tren del abecedario',
    nameIt: 'Trenino dell\'alfabeto',
    namePt: 'Trenzinho do alfabeto',
    nameNl: 'Alfabettrein',
    nameDa: 'Alfabettog',
    nameSv: 'Alfabetståget',
    nameNo: 'Alfabettoget',
    nameFi: 'Aakkosjuna',
    categoryEn: 'Creative',
    categoryDe: 'Kreativ',
    categoryFr: 'Créatif',
    categoryEs: 'Creativo',
    categoryIt: 'Creativo',
    categoryPt: 'Criativo',
    categoryNl: 'Creatief',
    categoryDa: 'Kreativ',
    categorySv: 'Kreativt',
    categoryNo: 'Kreativt',
    categoryFi: 'Luova',
    imageSrc: '/samples/english/alphabet-train/alphabet train landscape.jpeg',
    pdfUrl: '/samples/english/alphabet-train/alphabet train landscape.pdf',
    productPageSlug: 'alphabet-train-worksheets',
  },
  {
    id: '6',
    nameEn: 'Sudoku Puzzles',
    nameDe: 'Sudoku-Rätsel',
    nameFr: 'Grilles de Sudoku',
    nameEs: 'Sudoku',
    nameIt: 'Sudoku',
    namePt: 'Sudoku',
    nameNl: 'Sudoku-puzzels',
    nameDa: 'Sudoku',
    nameSv: 'Sudoku',
    nameNo: 'Sudoku',
    nameFi: 'Sudoku-tehtävät',
    categoryEn: 'Logic',
    categoryDe: 'Logik',
    categoryFr: 'Logique',
    categoryEs: 'Lógica',
    categoryIt: 'Logica',
    categoryPt: 'Lógica',
    categoryNl: 'Logica',
    categoryDa: 'Logik',
    categorySv: 'Logik',
    categoryNo: 'Logikk',
    categoryFi: 'Logiikka',
    imageSrc: '/samples/english/sudoku/sudoku hard.jpeg',
    pdfUrl: '/samples/english/sudoku/sudoku hard.pdf',
    productPageSlug: 'sudoku-worksheets',
  },
  {
    id: '7',
    nameEn: 'Coloring Pages',
    nameDe: 'Ausmalbilder',
    nameFr: 'Coloriages',
    nameEs: 'Páginas para colorear',
    nameIt: 'Disegni da colorare',
    namePt: 'Desenhos para colorir',
    nameNl: 'Kleurplaten',
    nameDa: 'Tegnesider',
    nameSv: 'Målarbilder',
    nameNo: 'Fargeleggingssider',
    nameFi: 'Värityssivut',
    categoryEn: 'Creative',
    categoryDe: 'Kreativ',
    categoryFr: 'Créatif',
    categoryEs: 'Creativo',
    categoryIt: 'Creativo',
    categoryPt: 'Criativo',
    categoryNl: 'Creatief',
    categoryDa: 'Kreativ',
    categorySv: 'Kreativt',
    categoryNo: 'Kreativt',
    categoryFi: 'Luova',
    imageSrc: '/samples/english/coloring/coloring portrait 1.png',
    pdfUrl: '/samples/english/coloring/coloring portrait 1.pdf',
    productPageSlug: 'coloring-worksheets',
  },
  {
    id: '8',
    nameEn: 'Find Objects',
    nameDe: 'Suchbilder',
    nameFr: 'Cherche et trouve',
    nameEs: 'Busca y encuentra',
    nameIt: 'Cerca e trova',
    namePt: 'Encontre os objetos',
    nameNl: 'Zoek en vind',
    nameDa: 'Find objekterne',
    nameSv: 'Hitta föremålen',
    nameNo: 'Finn gjenstandene',
    nameFi: 'Etsi esineet',
    categoryEn: 'Visual',
    categoryDe: 'Visuell',
    categoryFr: 'Visuel',
    categoryEs: 'Visual',
    categoryIt: 'Visivo',
    categoryPt: 'Visual',
    categoryNl: 'Visueel',
    categoryDa: 'Visuel',
    categorySv: 'Visuellt',
    categoryNo: 'Visuelt',
    categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/find objects/find objects landscape.jpeg',
    pdfUrl: '/samples/english/find objects/find objects landscape.pdf',
    productPageSlug: 'find-objects-worksheets',
  },
  {
    id: '9',
    nameEn: 'Matching Game',
    nameDe: 'Zuordnungsspiel',
    nameFr: 'Jeu d\'association',
    nameEs: 'Relacionar parejas',
    nameIt: 'Abbinamenti',
    namePt: 'Jogo de correspondência',
    nameNl: 'Koppelspel',
    nameDa: 'Parspil',
    nameSv: 'Para ihop',
    nameNo: 'Finn par',
    nameFi: 'Yhdistämistehtävä',
    categoryEn: 'Visual',
    categoryDe: 'Visuell',
    categoryFr: 'Visuel',
    categoryEs: 'Visual',
    categoryIt: 'Visivo',
    categoryPt: 'Visual',
    categoryNl: 'Visueel',
    categoryDa: 'Visuel',
    categorySv: 'Visuellt',
    categoryNo: 'Visuelt',
    categoryFi: 'Visuaalinen',
    imageSrc: '/samples/english/matching/matching landscape.jpeg',
    pdfUrl: '/samples/english/matching/matching landscape.pdf',
    productPageSlug: 'matching-worksheets',
  },
  {
    id: '10',
    nameEn: 'Code Addition',
    nameDe: 'Rechencode',
    nameFr: 'Addition codée',
    nameEs: 'Sumas con código',
    nameIt: 'Addizioni in codice',
    namePt: 'Adição com código',
    nameNl: 'Optellen met code',
    nameDa: 'Kodeaddition',
    nameSv: 'Kodaddition',
    nameNo: 'Kodeaddisjon',
    nameFi: 'Koodiyhteenlasku',
    categoryEn: 'Math',
    categoryDe: 'Mathematik',
    categoryFr: 'Maths',
    categoryEs: 'Matemáticas',
    categoryIt: 'Matematica',
    categoryPt: 'Matemática',
    categoryNl: 'Rekenen',
    categoryDa: 'Matematik',
    categorySv: 'Matematik',
    categoryNo: 'Matte',
    categoryFi: 'Matematiikka',
    imageSrc: '/samples/english/code addition/code addition landscape.jpeg',
    pdfUrl: '/samples/english/code addition/code addition landscape.pdf',
    productPageSlug: 'code-addition-worksheets',
  },
];

const categoryColorsEn: Record<string, string> = {
  Math: 'from-cyan-500 to-blue-500',
  Language: 'from-purple-500 to-pink-500',
  Visual: 'from-amber-500 to-orange-500',
  Creative: 'from-green-500 to-emerald-500',
  Logic: 'from-rose-500 to-red-500',
};

const categoryColorsDe: Record<string, string> = {
  Mathematik: 'from-cyan-500 to-blue-500',
  Sprache: 'from-purple-500 to-pink-500',
  Visuell: 'from-amber-500 to-orange-500',
  Kreativ: 'from-green-500 to-emerald-500',
  Logik: 'from-rose-500 to-red-500',
};

const categoryColorsFr: Record<string, string> = {
  Maths: 'from-cyan-500 to-blue-500',
  Langue: 'from-purple-500 to-pink-500',
  Visuel: 'from-amber-500 to-orange-500',
  Créatif: 'from-green-500 to-emerald-500',
  Logique: 'from-rose-500 to-red-500',
};

const categoryColorsEs: Record<string, string> = {
  Matemáticas: 'from-cyan-500 to-blue-500',
  Lenguaje: 'from-purple-500 to-pink-500',
  Visual: 'from-amber-500 to-orange-500',
  Creativo: 'from-green-500 to-emerald-500',
  Lógica: 'from-rose-500 to-red-500',
};

const categoryColorsIt: Record<string, string> = {
  Matematica: 'from-cyan-500 to-blue-500',
  Linguaggio: 'from-purple-500 to-pink-500',
  Visivo: 'from-amber-500 to-orange-500',
  Creativo: 'from-green-500 to-emerald-500',
  Logica: 'from-rose-500 to-red-500',
};

const categoryColorsPt: Record<string, string> = {
  Matemática: 'from-cyan-500 to-blue-500',
  Linguagem: 'from-purple-500 to-pink-500',
  Visual: 'from-amber-500 to-orange-500',
  Criativo: 'from-green-500 to-emerald-500',
  Lógica: 'from-rose-500 to-red-500',
};

const categoryColorsNl: Record<string, string> = {
  Rekenen: 'from-cyan-500 to-blue-500',
  Taal: 'from-purple-500 to-pink-500',
  Visueel: 'from-amber-500 to-orange-500',
  Creatief: 'from-green-500 to-emerald-500',
  Logica: 'from-rose-500 to-red-500',
};

const categoryColorsDa: Record<string, string> = {
  Matematik: 'from-cyan-500 to-blue-500',
  Sprog: 'from-purple-500 to-pink-500',
  Visuel: 'from-amber-500 to-orange-500',
  Kreativ: 'from-green-500 to-emerald-500',
  Logik: 'from-rose-500 to-red-500',
};

const categoryColorsSv: Record<string, string> = {
  Matematik: 'from-cyan-500 to-blue-500',
  Språk: 'from-purple-500 to-pink-500',
  Visuellt: 'from-amber-500 to-orange-500',
  Kreativt: 'from-green-500 to-emerald-500',
  Logik: 'from-rose-500 to-red-500',
};

const categoryColorsNo: Record<string, string> = {
  Matte: 'from-cyan-500 to-blue-500',
  Språk: 'from-purple-500 to-pink-500',
  Visuelt: 'from-amber-500 to-orange-500',
  Kreativt: 'from-green-500 to-emerald-500',
  Logikk: 'from-rose-500 to-red-500',
};

const categoryColorsFi: Record<string, string> = {
  Matematiikka: 'from-cyan-500 to-blue-500',
  Kieli: 'from-purple-500 to-pink-500',
  Visuaalinen: 'from-amber-500 to-orange-500',
  Luova: 'from-green-500 to-emerald-500',
  Logiikka: 'from-rose-500 to-red-500',
};

export default function SampleGallery({ locale }: SampleGalleryProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;
  const getCategoryColors = () => {
    if (locale === 'fi') return categoryColorsFi;
    if (locale === 'no') return categoryColorsNo;
    if (locale === 'sv') return categoryColorsSv;
    if (locale === 'da') return categoryColorsDa;
    if (locale === 'nl') return categoryColorsNl;
    if (locale === 'pt') return categoryColorsPt;
    if (locale === 'it') return categoryColorsIt;
    if (locale === 'es') return categoryColorsEs;
    if (locale === 'fr') return categoryColorsFr;
    if (locale === 'de') return categoryColorsDe;
    return categoryColorsEn;
  };
  const categoryColors = getCategoryColors();

  // Helper to get localized name/category
  const getSampleName = (sample: Sample) => {
    if (locale === 'fi') return sample.nameFi;
    if (locale === 'no') return sample.nameNo;
    if (locale === 'sv') return sample.nameSv;
    if (locale === 'da') return sample.nameDa;
    if (locale === 'nl') return sample.nameNl;
    if (locale === 'pt') return sample.namePt;
    if (locale === 'it') return sample.nameIt;
    if (locale === 'es') return sample.nameEs;
    if (locale === 'fr') return sample.nameFr;
    if (locale === 'de') return sample.nameDe;
    return sample.nameEn;
  };
  const getSampleCategory = (sample: Sample) => {
    if (locale === 'fi') return sample.categoryFi;
    if (locale === 'no') return sample.categoryNo;
    if (locale === 'sv') return sample.categorySv;
    if (locale === 'da') return sample.categoryDa;
    if (locale === 'nl') return sample.categoryNl;
    if (locale === 'pt') return sample.categoryPt;
    if (locale === 'it') return sample.categoryIt;
    if (locale === 'es') return sample.categoryEs;
    if (locale === 'fr') return sample.categoryFr;
    if (locale === 'de') return sample.categoryDe;
    return sample.categoryEn;
  };

  const handleDownload = async (sample: Sample) => {
    setDownloadingId(sample.id);

    // Create download link
    const link = document.createElement('a');
    link.href = sample.pdfUrl;
    const sampleName = getSampleName(sample);
    link.download = `${sampleName.replace(/\s+/g, '-').toLowerCase()}-sample.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Reset after animation
    setTimeout(() => setDownloadingId(null), 1500);
  };

  return (
    <section
      id="samples-gallery"
      className="relative py-24 overflow-hidden"
      style={{
        background: `linear-gradient(180deg,
          #051020 0%,
          #0a1628 30%,
          #0f1f3a 70%,
          #0a1628 100%
        )`,
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
            top: '-10%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
            bottom: '10%',
            right: '-5%',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid rgba(16,185,129,0.2)',
            }}
          >
            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="text-sm font-medium text-emerald-400">{content.badge}</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            {content.subtitle}
          </p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-8 mt-8"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{content.statSamples}</div>
              <div className="text-sm text-white/40">{content.statSamplesLabel}</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{content.statQuality}</div>
              <div className="text-sm text-white/40">{content.statQualityLabel}</div>
            </div>
            <div className="w-px bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{content.statFormat}</div>
              <div className="text-sm text-white/40">{content.statFormatLabel}</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Samples grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {samples.map((sample, index) => (
            <motion.div
              key={sample.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative"
              onMouseEnter={() => setHoveredId(sample.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                whileHover={{
                  y: -8,
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5)',
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Category badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`px-2 py-1 rounded-md text-xs font-medium text-white bg-gradient-to-r ${categoryColors[getSampleCategory(sample)]}`}
                  >
                    {getSampleCategory(sample)}
                  </span>
                </div>

                {/* Image container */}
                <div className="relative aspect-[3/4] bg-white overflow-hidden">
                  <Image
                    src={sample.imageSrc}
                    alt={getSampleName(sample)}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />

                  {/* Hover overlay */}
                  <AnimatePresence>
                    {hoveredId === sample.id && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-center pb-4"
                      >
                        <motion.button
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 20, opacity: 0 }}
                          onClick={() => handleDownload(sample)}
                          disabled={downloadingId === sample.id}
                          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 disabled:opacity-70"
                          style={{
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            boxShadow: '0 4px 20px rgba(16,185,129,0.4)',
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {downloadingId === sample.id ? (
                            <>
                              <motion.svg
                                className="w-4 h-4"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </motion.svg>
                              {content.downloading}
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                              </svg>
                              {content.downloadPdf}
                            </>
                          )}
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Card footer */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-white truncate mb-2">
                    {getSampleName(sample)}
                  </h3>
                  <Link
                    href={`/${locale}/apps/${sample.productPageSlug}`}
                    className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    {content.viewDetails}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all duration-200"
          >
            {content.viewAllGenerators}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
