'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface App {
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
  slug: string;
  icon: string;
  descriptionEn: string;
  descriptionDe: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt: string;
  descriptionPt: string;
  descriptionNl: string;
  descriptionDa: string;
  descriptionSv: string;
  descriptionNo: string;
}

interface Category {
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
  icon: string;
  gradient: string;
  borderColor: string;
  apps: App[];
}

interface AppCategoriesProps {
  locale: string;
}

// Localization content
const localeContent: Record<string, {
  badge: string;
  title: string;
  subtitle: string;
  learnMore: string;
  viewAllGenerators: string;
}> = {
  en: {
    badge: '33 Worksheet Generators',
    title: 'Browse by Category',
    subtitle: 'From math exercises to creative activities, find the perfect worksheet generator for your classroom.',
    learnMore: 'Learn more',
    viewAllGenerators: 'View All 33 Generators',
  },
  de: {
    badge: '33 Arbeitsblatt-Generatoren',
    title: 'Nach Kategorie durchsuchen',
    subtitle: 'Von Matheübungen bis zu kreativen Aktivitäten – finden Sie den perfekten Generator für Ihren Unterricht.',
    learnMore: 'Mehr erfahren',
    viewAllGenerators: 'Alle 33 Generatoren entdecken',
  },
  fr: {
    badge: '33 générateurs de fiches',
    title: 'Parcourir par catégorie',
    subtitle: 'Des exercices de maths aux activités créatives, trouvez le générateur idéal pour votre classe.',
    learnMore: 'En savoir plus',
    viewAllGenerators: 'Explorer les 33 générateurs',
  },
  es: {
    badge: '33 generadores de fichas',
    title: 'Explorar por categoría',
    subtitle: 'Desde ejercicios de matemáticas hasta actividades creativas, encuentra el generador perfecto para tu salón.',
    learnMore: 'Ver más',
    viewAllGenerators: 'Explorar los 33 generadores',
  },
  it: {
    badge: '33 generatori di schede',
    title: 'Esplora per categoria',
    subtitle: 'Dagli esercizi di matematica alle attività creative, trova il generatore perfetto per la tua classe.',
    learnMore: 'Scopri di più',
    viewAllGenerators: 'Esplora tutti i 33 generatori',
  },
  pt: {
    badge: '33 geradores de atividades',
    title: 'Explore por categoria',
    subtitle: 'De exercícios de matemática a atividades criativas, encontre o gerador perfeito para sua sala de aula.',
    learnMore: 'Saiba mais',
    viewAllGenerators: 'Ver todos os 33 geradores',
  },
  nl: {
    badge: '33 werkbladgeneratoren',
    title: 'Ontdek per categorie',
    subtitle: 'Van rekenoefeningen tot creatieve activiteiten, vind de perfecte generator voor jouw klas.',
    learnMore: 'Meer informatie',
    viewAllGenerators: 'Bekijk alle 33 generatoren',
  },
  da: {
    badge: '33 opgavegeneratorer',
    title: 'Udforsk efter kategori',
    subtitle: 'Fra regneopgaver til kreative aktiviteter – find den perfekte generator til dit klasseværelse.',
    learnMore: 'Læs mere',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  sv: {
    badge: '33 övningsbladsgeneratorer',
    title: 'Utforska efter kategori',
    subtitle: 'Från matematikövningar till kreativa aktiviteter – hitta den perfekta generatorn för ditt klassrum.',
    learnMore: 'Läs mer',
    viewAllGenerators: 'Se alla 33 generatorer',
  },
  no: {
    badge: '33 oppgavegeneratorer',
    title: 'Utforsk etter kategori',
    subtitle: 'Fra matteoppgaver til kreative aktiviteter – finn den perfekte generatoren for klasserommet ditt.',
    learnMore: 'Les mer',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
};

// Real apps with their product page slugs and translations
const categories: Category[] = [
  {
    id: 'math',
    nameEn: 'Math',
    nameDe: 'Mathematik',
    nameFr: 'Mathématiques',
    nameEs: 'Matemáticas',
    nameIt: 'Matematica',
    namePt: 'Matemática',
    nameNl: 'Rekenen',
    nameDa: 'Matematik',
    nameSv: 'Matematik',
    nameNo: 'Matte',
    icon: '🔢',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
    apps: [
      { nameEn: 'Addition', nameDe: 'Addition', nameFr: 'Addition', nameEs: 'Sumas', nameIt: 'Addizioni', namePt: 'Adição', nameNl: 'Optellen', nameDa: 'Addition', nameSv: 'Addition', nameNo: 'Addisjon', slug: 'addition-worksheets', icon: '➕', descriptionEn: 'Visual counting & sums', descriptionDe: 'Anschauliches Zählen & Rechnen', descriptionFr: 'Comptage visuel et additions', descriptionEs: 'Conteo visual y sumas', descriptionIt: 'Conteggio visivo e somme', descriptionPt: 'Contagem visual e somas', descriptionNl: 'Visueel tellen en optellen', descriptionDa: 'Visuel tælling og plus', descriptionSv: 'Räkna och addera visuellt', descriptionNo: 'Visuell telling og pluss' },
      { nameEn: 'Code Addition', nameDe: 'Rechencode', nameFr: 'Addition codée', nameEs: 'Sumas con código', nameIt: 'Addizioni in codice', namePt: 'Adição com código', nameNl: 'Optellen met code', nameDa: 'Kodeaddition', nameSv: 'Kodaddition', nameNo: 'Kodeaddisjon', slug: 'code-addition-worksheets', icon: '🔐', descriptionEn: 'Crack the code math', descriptionDe: 'Knack den Zahlencode', descriptionFr: 'Calculs à décoder', descriptionEs: 'Descifra el código matemático', descriptionIt: 'Decifra il codice matematico', descriptionPt: 'Desvende o código matemático', descriptionNl: 'Kraak de rekencode', descriptionDa: 'Knæk koden med tal', descriptionSv: 'Knäck koden med matte', descriptionNo: 'Knekk mattekoden' },
      { nameEn: 'Math Worksheet', nameDe: 'Mathe-Arbeitsblatt', nameFr: 'Fiche de maths', nameEs: 'Ficha de matemáticas', nameIt: 'Scheda di matematica', namePt: 'Atividade de matemática', nameNl: 'Rekenwerkblad', nameDa: 'Regneopgaver', nameSv: 'Matteövningsblad', nameNo: 'Matteoppgaver', slug: 'math-worksheets', icon: '📐', descriptionEn: 'Custom math problems', descriptionDe: 'Individuelle Rechenaufgaben', descriptionFr: 'Exercices personnalisés', descriptionEs: 'Ejercicios personalizados', descriptionIt: 'Esercizi personalizzati', descriptionPt: 'Exercícios personalizados', descriptionNl: 'Zelf sommen maken', descriptionDa: 'Tilpassede regneopgaver', descriptionSv: 'Skapa egna räkneuppgifter', descriptionNo: 'Lag egne regneark' },
      { nameEn: 'Chart Count', nameDe: 'Diagramm-Zählen', nameFr: 'Comptage graphique', nameEs: 'Conteo con gráficas', nameIt: 'Conta con i grafici', namePt: 'Contagem com gráficos', nameNl: 'Tellen met diagrammen', nameDa: 'Tæl med diagrammer', nameSv: 'Räkna med diagram', nameNo: 'Diagramtelling', slug: 'chart-count-worksheets', icon: '📊', descriptionEn: 'Counting with charts', descriptionDe: 'Zählen mit Diagrammen', descriptionFr: 'Comptage avec diagrammes', descriptionEs: 'Contar con diagramas', descriptionIt: 'Contare con i grafici', descriptionPt: 'Contar usando gráficos', descriptionNl: 'Tellen met grafieken', descriptionDa: 'Tælling med diagrammer', descriptionSv: 'Räkna med hjälp av diagram', descriptionNo: 'Tell med diagrammer' },
    ],
  },
  {
    id: 'language',
    nameEn: 'Language',
    nameDe: 'Sprache',
    nameFr: 'Langue',
    nameEs: 'Lenguaje',
    nameIt: 'Linguaggio',
    namePt: 'Linguagem',
    nameNl: 'Taal',
    nameDa: 'Sprog',
    nameSv: 'Språk',
    nameNo: 'Språk',
    icon: '📝',
    gradient: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
    apps: [
      { nameEn: 'Word Search', nameDe: 'Wortsuche', nameFr: 'Mots mêlés', nameEs: 'Sopa de letras', nameIt: 'Cerca parole', namePt: 'Caça-palavras', nameNl: 'Woordzoeker', nameDa: 'Find ord', nameSv: 'Ordsök', nameNo: 'Finn ord', slug: 'word-search-worksheets', icon: '🔍', descriptionEn: 'Hidden word puzzles', descriptionDe: 'Versteckte Wörter finden', descriptionFr: 'Grilles de mots cachés', descriptionEs: 'Encuentra palabras escondidas', descriptionIt: 'Trova le parole nascoste', descriptionPt: 'Encontre palavras escondidas', descriptionNl: 'Zoek verborgen woorden', descriptionDa: 'Find skjulte ord', descriptionSv: 'Hitta gömda ord', descriptionNo: 'Skjulte ordpuslespill' },
      { nameEn: 'Crossword', nameDe: 'Kreuzworträtsel', nameFr: 'Mots croisés', nameEs: 'Crucigrama', nameIt: 'Cruciverba', namePt: 'Palavras cruzadas', nameNl: 'Kruiswoordpuzzel', nameDa: 'Krydsord', nameSv: 'Korsord', nameNo: 'Kryssord', slug: 'crossword-worksheets', icon: '⬜', descriptionEn: 'Classic word puzzles', descriptionDe: 'Klassische Worträtsel', descriptionFr: 'Grilles de mots croisés', descriptionEs: 'El clásico juego de palabras', descriptionIt: 'Il classico gioco di parole', descriptionPt: 'O clássico jogo de palavras', descriptionNl: 'Klassiek woordspel', descriptionDa: 'Klassisk ordpuslespil', descriptionSv: 'Det klassiska ordpusslet', descriptionNo: 'Det klassiske ordpuslespillet' },
      { nameEn: 'Cryptogram', nameDe: 'Kryptogramm', nameFr: 'Cryptogramme', nameEs: 'Criptograma', nameIt: 'Crittogramma', namePt: 'Criptograma', nameNl: 'Cryptogram', nameDa: 'Kryptogram', nameSv: 'Kryptogram', nameNo: 'Kryptogram', slug: 'cryptogram-worksheets', icon: '🔮', descriptionEn: 'Secret message codes', descriptionDe: 'Geheime Botschaften', descriptionFr: 'Messages secrets codés', descriptionEs: 'Mensajes secretos codificados', descriptionIt: 'Messaggi segreti in codice', descriptionPt: 'Mensagens secretas em código', descriptionNl: 'Geheime codeberichten', descriptionDa: 'Hemmelige beskeder i kode', descriptionSv: 'Hemliga kodmeddelanden', descriptionNo: 'Hemmelige kodemeldinger' },
      { nameEn: 'Word Scramble', nameDe: 'Buchstabensalat', nameFr: 'Lettres mélangées', nameEs: 'Letras revueltas', nameIt: 'Anagrammi', namePt: 'Embaralha letras', nameNl: 'Letterpuzzel', nameDa: 'Bogstavsalat', nameSv: 'Bokstavslek', nameNo: 'Bokstavmiks', slug: 'word-scramble-worksheets', icon: '🔀', descriptionEn: 'Unscramble letters', descriptionDe: 'Buchstaben entwirren', descriptionFr: 'Remettre les lettres en ordre', descriptionEs: 'Ordena las letras', descriptionIt: 'Riordina le lettere', descriptionPt: 'Desembaralhe as letras', descriptionNl: 'Ontwar de letters', descriptionDa: 'Sæt bogstaverne i orden', descriptionSv: 'Ordna om bokstäverna', descriptionNo: 'Sett bokstavene i rekkefølge' },
    ],
  },
  {
    id: 'visual',
    nameEn: 'Visual Learning',
    nameDe: 'Visuelles Lernen',
    nameFr: 'Apprentissage visuel',
    nameEs: 'Aprendizaje visual',
    nameIt: 'Apprendimento visivo',
    namePt: 'Aprendizado visual',
    nameNl: 'Visueel leren',
    nameDa: 'Visuel læring',
    nameSv: 'Visuellt lärande',
    nameNo: 'Visuell læring',
    icon: '👁️',
    gradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20',
    apps: [
      { nameEn: 'Matching', nameDe: 'Zuordnung', nameFr: 'Association', nameEs: 'Relacionar parejas', nameIt: 'Abbinamenti', namePt: 'Jogo de correspondência', nameNl: 'Koppelen', nameDa: 'Parspil', nameSv: 'Para ihop', nameNo: 'Finn par', slug: 'matching-worksheets', icon: '🎯', descriptionEn: 'Match pairs together', descriptionDe: 'Paare zuordnen', descriptionFr: 'Associer les paires', descriptionEs: 'Une las parejas', descriptionIt: 'Abbina le coppie', descriptionPt: 'Ligue os pares', descriptionNl: 'Koppel de paren', descriptionDa: 'Find par sammen', descriptionSv: 'Koppla ihop paren', descriptionNo: 'Koble sammen par' },
      { nameEn: 'Drawing Lines', nameDe: 'Linien zeichnen', nameFr: 'Tracer des lignes', nameEs: 'Trazar líneas', nameIt: 'Traccia le linee', namePt: 'Traçando linhas', nameNl: 'Lijnen trekken', nameDa: 'Tegn streger', nameSv: 'Dra streck', nameNo: 'Tegn linjer', slug: 'drawing-lines-worksheets', icon: '✏️', descriptionEn: 'Trace & connect', descriptionDe: 'Nachspuren & Verbinden', descriptionFr: 'Tracer et relier', descriptionEs: 'Traza y conecta', descriptionIt: 'Traccia e collega', descriptionPt: 'Trace e conecte', descriptionNl: 'Trek na en verbind', descriptionDa: 'Tegn og forbind', descriptionSv: 'Rita och koppla ihop', descriptionNo: 'Tegn og koble' },
      { nameEn: 'Find Objects', nameDe: 'Suchbilder', nameFr: 'Cherche et trouve', nameEs: 'Busca y encuentra', nameIt: 'Cerca e trova', namePt: 'Encontre objetos', nameNl: 'Zoek en vind', nameDa: 'Find objekterne', nameSv: 'Hitta föremålen', nameNo: 'Finn objekter', slug: 'find-objects-worksheets', icon: '🔎', descriptionEn: 'I Spy activities', descriptionDe: 'Objekte suchen & finden', descriptionFr: 'Jeux d\'observation', descriptionEs: 'Actividades de observación', descriptionIt: 'Attività di osservazione', descriptionPt: 'Atividades de observação', descriptionNl: 'Kijkspelletjes', descriptionDa: 'Find og se aktiviteter', descriptionSv: 'Sök och hitta aktiviteter', descriptionNo: 'Se og finn-aktiviteter' },
      { nameEn: 'Grid Match', nameDe: 'Gitter-Zuordnung', nameFr: 'Grille d\'association', nameEs: 'Cuadrícula de asociación', nameIt: 'Griglia di abbinamento', namePt: 'Grade de correspondência', nameNl: 'Raster koppelen', nameDa: 'Gittermatching', nameSv: 'Rutmatchning', nameNo: 'Rutematching', slug: 'grid-match-worksheets', icon: '🔲', descriptionEn: 'Pattern matching', descriptionDe: 'Muster erkennen', descriptionFr: 'Reconnaissance de motifs', descriptionEs: 'Reconoce los patrones', descriptionIt: 'Riconosci i pattern', descriptionPt: 'Reconheça os padrões', descriptionNl: 'Patronen herkennen', descriptionDa: 'Mønstergenkendelse', descriptionSv: 'Mönsterigenkänning', descriptionNo: 'Mønstergjenkjenning' },
      { nameEn: 'Find & Count', nameDe: 'Suchen & Zählen', nameFr: 'Chercher et compter', nameEs: 'Buscar y contar', nameIt: 'Cerca e conta', namePt: 'Encontre e conte', nameNl: 'Zoek en tel', nameDa: 'Find og tæl', nameSv: 'Hitta och räkna', nameNo: 'Finn og tell', slug: 'find-and-count-worksheets', icon: '🧮', descriptionEn: 'Count hidden items', descriptionDe: 'Versteckte Objekte zählen', descriptionFr: 'Compter les objets cachés', descriptionEs: 'Cuenta los objetos escondidos', descriptionIt: 'Conta gli oggetti nascosti', descriptionPt: 'Conte os objetos escondidos', descriptionNl: 'Tel verborgen voorwerpen', descriptionDa: 'Tæl skjulte ting', descriptionSv: 'Räkna gömda saker', descriptionNo: 'Tell skjulte gjenstander' },
    ],
  },
  {
    id: 'creative',
    nameEn: 'Creative',
    nameDe: 'Kreativ',
    nameFr: 'Créatif',
    nameEs: 'Creativo',
    nameIt: 'Creativo',
    namePt: 'Criativo',
    nameNl: 'Creatief',
    nameDa: 'Kreativ',
    nameSv: 'Kreativt',
    nameNo: 'Kreativt',
    icon: '🎨',
    gradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
    apps: [
      { nameEn: 'Coloring', nameDe: 'Ausmalen', nameFr: 'Coloriage', nameEs: 'Colorear', nameIt: 'Colorare', namePt: 'Colorir', nameNl: 'Kleuren', nameDa: 'Tegnesider', nameSv: 'Målarbilder', nameNo: 'Tegnesider', slug: 'coloring-worksheets', icon: '🖍️', descriptionEn: 'Color by sections', descriptionDe: 'Nach Bereichen ausmalen', descriptionFr: 'Colorier par zones', descriptionEs: 'Colorea por secciones', descriptionIt: 'Colora per sezioni', descriptionPt: 'Pinte por seções', descriptionNl: 'Kleur per vlak', descriptionDa: 'Mal efter områder', descriptionSv: 'Måla efter områden', descriptionNo: 'Fargelegg etter områder' },
      { nameEn: 'Draw & Color', nameDe: 'Zeichnen & Ausmalen', nameFr: 'Dessiner et colorier', nameEs: 'Dibujar y colorear', nameIt: 'Disegna e colora', namePt: 'Desenhe e pinte', nameNl: 'Tekenen en kleuren', nameDa: 'Tegn og mal', nameSv: 'Rita och måla', nameNo: 'Tegn og mal', slug: 'draw-and-color-worksheets', icon: '🎨', descriptionEn: 'Grid drawing', descriptionDe: 'Rasterzeichnen', descriptionFr: 'Dessin sur quadrillage', descriptionEs: 'Dibujo en cuadrícula', descriptionIt: 'Disegno su griglia', descriptionPt: 'Desenho em grade', descriptionNl: 'Rastertekenen', descriptionDa: 'Gittertegning', descriptionSv: 'Rutnätsritning', descriptionNo: 'Rutenett-tegning' },
      { nameEn: 'Alphabet Train', nameDe: 'ABC-Zug', nameFr: 'Train de l\'alphabet', nameEs: 'Tren del abecedario', nameIt: 'Trenino dell\'alfabeto', namePt: 'Trenzinho do alfabeto', nameNl: 'Alfabettrein', nameDa: 'Alfabettog', nameSv: 'Alfabetståget', nameNo: 'Alfabettoget', slug: 'alphabet-train-worksheets', icon: '🚂', descriptionEn: 'ABC on trains', descriptionDe: 'Buchstaben auf Zügen', descriptionFr: 'L\'alphabet en train', descriptionEs: 'El ABC en trenes', descriptionIt: 'L\'alfabeto sul trenino', descriptionPt: 'O ABC no trenzinho', descriptionNl: 'Het ABC op treintjes', descriptionDa: 'ABC på tog', descriptionSv: 'ABC på tågvagnar', descriptionNo: 'ABC på togvogner' },
      { nameEn: 'Picture Bingo', nameDe: 'Bilder-Bingo', nameFr: 'Loto images', nameEs: 'Lotería de imágenes', nameIt: 'Tombola illustrata', namePt: 'Bingo de imagens', nameNl: 'Plaatjesbingo', nameDa: 'Billed-bingo', nameSv: 'Bildbingo', nameNo: 'Bildebingo', slug: 'picture-bingo-worksheets', icon: '🎰', descriptionEn: 'Visual bingo cards', descriptionDe: 'Bingokarten mit Bildern', descriptionFr: 'Cartes de loto illustrées', descriptionEs: 'Cartas de lotería ilustradas', descriptionIt: 'Cartelle tombola con immagini', descriptionPt: 'Cartelas de bingo ilustradas', descriptionNl: 'Bingokaarten met plaatjes', descriptionDa: 'Bingoplader med billeder', descriptionSv: 'Bingokort med bilder', descriptionNo: 'Bingokort med bilder' },
    ],
  },
  {
    id: 'logic',
    nameEn: 'Logic & Puzzles',
    nameDe: 'Logik & Rätsel',
    nameFr: 'Logique et énigmes',
    nameEs: 'Lógica y rompecabezas',
    nameIt: 'Logica e rompicapo',
    namePt: 'Lógica e quebra-cabeças',
    nameNl: 'Logica en puzzels',
    nameDa: 'Logik og puslespil',
    nameSv: 'Logik och pyssel',
    nameNo: 'Logikk og hjernetrim',
    icon: '🧩',
    gradient: 'from-rose-500/10 to-red-500/10',
    borderColor: 'border-rose-500/20',
    apps: [
      { nameEn: 'Sudoku', nameDe: 'Sudoku', nameFr: 'Sudoku', nameEs: 'Sudoku', nameIt: 'Sudoku', namePt: 'Sudoku', nameNl: 'Sudoku', nameDa: 'Sudoku', nameSv: 'Sudoku', nameNo: 'Sudoku', slug: 'sudoku-worksheets', icon: '🔢', descriptionEn: 'Number logic grids', descriptionDe: 'Zahlenrätsel', descriptionFr: 'Grilles de chiffres', descriptionEs: 'Cuadrículas de lógica numérica', descriptionIt: 'Griglie di logica numerica', descriptionPt: 'Grades de lógica numérica', descriptionNl: 'Logische cijferrasters', descriptionDa: 'Logiske talgitre', descriptionSv: 'Logiska sifferrutnät', descriptionNo: 'Logiske tallruter' },
      { nameEn: 'Big & Small', nameDe: 'Groß & Klein', nameFr: 'Grand et petit', nameEs: 'Grande y pequeño', nameIt: 'Grande e piccolo', namePt: 'Grande e pequeno', nameNl: 'Groot en klein', nameDa: 'Stor og lille', nameSv: 'Stor och liten', nameNo: 'Stor og liten', slug: 'big-small-worksheets', icon: '📏', descriptionEn: 'Size comparison', descriptionDe: 'Größenvergleich', descriptionFr: 'Comparaison de tailles', descriptionEs: 'Comparación de tamaños', descriptionIt: 'Confronto di dimensioni', descriptionPt: 'Comparação de tamanhos', descriptionNl: 'Groottevergelijking', descriptionDa: 'Størrelsesammenligning', descriptionSv: 'Storleksjämförelse', descriptionNo: 'Sammenlign størrelser' },
    ],
  },
];

export default function AppCategories({ locale }: AppCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('math');
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Helper functions for localized content
  const getCategoryName = (category: Category) => {
    if (locale === 'no') return category.nameNo;
    if (locale === 'sv') return category.nameSv;
    if (locale === 'da') return category.nameDa;
    if (locale === 'nl') return category.nameNl;
    if (locale === 'pt') return category.namePt;
    if (locale === 'it') return category.nameIt;
    if (locale === 'es') return category.nameEs;
    if (locale === 'fr') return category.nameFr;
    if (locale === 'de') return category.nameDe;
    return category.nameEn;
  };
  const getAppName = (app: App) => {
    if (locale === 'no') return app.nameNo;
    if (locale === 'sv') return app.nameSv;
    if (locale === 'da') return app.nameDa;
    if (locale === 'nl') return app.nameNl;
    if (locale === 'pt') return app.namePt;
    if (locale === 'it') return app.nameIt;
    if (locale === 'es') return app.nameEs;
    if (locale === 'fr') return app.nameFr;
    if (locale === 'de') return app.nameDe;
    return app.nameEn;
  };
  const getAppDescription = (app: App) => {
    if (locale === 'no') return app.descriptionNo;
    if (locale === 'sv') return app.descriptionSv;
    if (locale === 'da') return app.descriptionDa;
    if (locale === 'nl') return app.descriptionNl;
    if (locale === 'pt') return app.descriptionPt;
    if (locale === 'it') return app.descriptionIt;
    if (locale === 'es') return app.descriptionEs;
    if (locale === 'fr') return app.descriptionFr;
    if (locale === 'de') return app.descriptionDe;
    return app.descriptionEn;
  };

  const activeData = categories.find(c => c.id === activeCategory);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Light gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg,
            #f8fafc 0%,
            #ffffff 30%,
            #fefce8 70%,
            #fffbeb 100%
          )`,
        }}
      />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, rgba(251,191,36,0.15) 0%, transparent 70%)',
            top: '20%',
            right: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(217,119,6,0.1) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%',
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
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-100 border border-amber-200"
          >
            <span className="text-amber-600">✨</span>
            <span className="text-sm font-medium text-amber-700">{content.badge}</span>
          </motion.div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                relative px-4 sm:px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300
                ${activeCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'text-stone-600 hover:text-stone-800 bg-white/50 hover:bg-white border border-stone-200'
                }
              `}
            >
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategoryBg"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{getCategoryName(category)}</span>
              </span>
            </button>
          ))}
        </motion.div>

        {/* Apps grid */}
        <AnimatePresence mode="wait">
          {activeData && (
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
              {activeData.apps.map((app, index) => (
                <motion.div
                  key={app.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/${locale}/apps/${app.slug}`}
                    className="block group"
                    onMouseEnter={() => setHoveredApp(app.slug)}
                    onMouseLeave={() => setHoveredApp(null)}
                  >
                    <motion.div
                      className={`
                        relative p-6 rounded-2xl bg-white border-2 transition-all duration-300
                        ${activeData.borderColor}
                        ${hoveredApp === app.slug ? 'border-opacity-100 shadow-xl' : 'border-opacity-50 shadow-md'}
                      `}
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      {/* Background gradient on hover */}
                      <div
                        className={`
                          absolute inset-0 rounded-2xl bg-gradient-to-br ${activeData.gradient}
                          transition-opacity duration-300
                          ${hoveredApp === app.slug ? 'opacity-100' : 'opacity-0'}
                        `}
                      />

                      <div className="relative z-10">
                        {/* Icon */}
                        <div className="text-4xl mb-4">{app.icon}</div>

                        {/* Name */}
                        <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-stone-900">
                          {getAppName(app)}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-stone-500 mb-4">
                          {getAppDescription(app)}
                        </p>

                        {/* Link indicator */}
                        <div className="flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:text-amber-700">
                          <span>{content.learnMore}</span>
                          <motion.svg
                            className="w-4 h-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            animate={{ x: hoveredApp === app.slug ? 3 : 0 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </motion.svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30"
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
