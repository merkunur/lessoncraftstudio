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
  slug: string;
  icon: string;
  descriptionEn: string;
  descriptionDe: string;
  descriptionFr: string;
  descriptionEs: string;
  descriptionIt: string;
}

interface Category {
  id: string;
  nameEn: string;
  nameDe: string;
  nameFr: string;
  nameEs: string;
  nameIt: string;
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
    icon: '🔢',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
    apps: [
      { nameEn: 'Addition', nameDe: 'Addition', nameFr: 'Addition', nameEs: 'Sumas', nameIt: 'Addizioni', slug: 'addition-worksheets', icon: '➕', descriptionEn: 'Visual counting & sums', descriptionDe: 'Anschauliches Zählen & Rechnen', descriptionFr: 'Comptage visuel et additions', descriptionEs: 'Conteo visual y sumas', descriptionIt: 'Conteggio visivo e somme' },
      { nameEn: 'Code Addition', nameDe: 'Rechencode', nameFr: 'Addition codée', nameEs: 'Sumas con código', nameIt: 'Addizioni in codice', slug: 'code-addition-worksheets', icon: '🔐', descriptionEn: 'Crack the code math', descriptionDe: 'Knack den Zahlencode', descriptionFr: 'Calculs à décoder', descriptionEs: 'Descifra el código matemático', descriptionIt: 'Decifra il codice matematico' },
      { nameEn: 'Math Worksheet', nameDe: 'Mathe-Arbeitsblatt', nameFr: 'Fiche de maths', nameEs: 'Ficha de matemáticas', nameIt: 'Scheda di matematica', slug: 'math-worksheets', icon: '📐', descriptionEn: 'Custom math problems', descriptionDe: 'Individuelle Rechenaufgaben', descriptionFr: 'Exercices personnalisés', descriptionEs: 'Ejercicios personalizados', descriptionIt: 'Esercizi personalizzati' },
      { nameEn: 'Chart Count', nameDe: 'Diagramm-Zählen', nameFr: 'Comptage graphique', nameEs: 'Conteo con gráficas', nameIt: 'Conta con i grafici', slug: 'chart-count-worksheets', icon: '📊', descriptionEn: 'Counting with charts', descriptionDe: 'Zählen mit Diagrammen', descriptionFr: 'Comptage avec diagrammes', descriptionEs: 'Contar con diagramas', descriptionIt: 'Contare con i grafici' },
    ],
  },
  {
    id: 'language',
    nameEn: 'Language',
    nameDe: 'Sprache',
    nameFr: 'Langue',
    nameEs: 'Lenguaje',
    nameIt: 'Linguaggio',
    icon: '📝',
    gradient: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
    apps: [
      { nameEn: 'Word Search', nameDe: 'Wortsuche', nameFr: 'Mots mêlés', nameEs: 'Sopa de letras', nameIt: 'Cerca parole', slug: 'word-search-worksheets', icon: '🔍', descriptionEn: 'Hidden word puzzles', descriptionDe: 'Versteckte Wörter finden', descriptionFr: 'Grilles de mots cachés', descriptionEs: 'Encuentra palabras escondidas', descriptionIt: 'Trova le parole nascoste' },
      { nameEn: 'Crossword', nameDe: 'Kreuzworträtsel', nameFr: 'Mots croisés', nameEs: 'Crucigrama', nameIt: 'Cruciverba', slug: 'crossword-worksheets', icon: '⬜', descriptionEn: 'Classic word puzzles', descriptionDe: 'Klassische Worträtsel', descriptionFr: 'Grilles de mots croisés', descriptionEs: 'El clásico juego de palabras', descriptionIt: 'Il classico gioco di parole' },
      { nameEn: 'Cryptogram', nameDe: 'Kryptogramm', nameFr: 'Cryptogramme', nameEs: 'Criptograma', nameIt: 'Crittogramma', slug: 'cryptogram-worksheets', icon: '🔮', descriptionEn: 'Secret message codes', descriptionDe: 'Geheime Botschaften', descriptionFr: 'Messages secrets codés', descriptionEs: 'Mensajes secretos codificados', descriptionIt: 'Messaggi segreti in codice' },
      { nameEn: 'Word Scramble', nameDe: 'Buchstabensalat', nameFr: 'Lettres mélangées', nameEs: 'Letras revueltas', nameIt: 'Anagrammi', slug: 'word-scramble-worksheets', icon: '🔀', descriptionEn: 'Unscramble letters', descriptionDe: 'Buchstaben entwirren', descriptionFr: 'Remettre les lettres en ordre', descriptionEs: 'Ordena las letras', descriptionIt: 'Riordina le lettere' },
    ],
  },
  {
    id: 'visual',
    nameEn: 'Visual Learning',
    nameDe: 'Visuelles Lernen',
    nameFr: 'Apprentissage visuel',
    nameEs: 'Aprendizaje visual',
    nameIt: 'Apprendimento visivo',
    icon: '👁️',
    gradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20',
    apps: [
      { nameEn: 'Matching', nameDe: 'Zuordnung', nameFr: 'Association', nameEs: 'Relacionar parejas', nameIt: 'Abbinamenti', slug: 'matching-worksheets', icon: '🎯', descriptionEn: 'Match pairs together', descriptionDe: 'Paare zuordnen', descriptionFr: 'Associer les paires', descriptionEs: 'Une las parejas', descriptionIt: 'Abbina le coppie' },
      { nameEn: 'Drawing Lines', nameDe: 'Linien zeichnen', nameFr: 'Tracer des lignes', nameEs: 'Trazar líneas', nameIt: 'Traccia le linee', slug: 'drawing-lines-worksheets', icon: '✏️', descriptionEn: 'Trace & connect', descriptionDe: 'Nachspuren & Verbinden', descriptionFr: 'Tracer et relier', descriptionEs: 'Traza y conecta', descriptionIt: 'Traccia e collega' },
      { nameEn: 'Find Objects', nameDe: 'Suchbilder', nameFr: 'Cherche et trouve', nameEs: 'Busca y encuentra', nameIt: 'Cerca e trova', slug: 'find-objects-worksheets', icon: '🔎', descriptionEn: 'I Spy activities', descriptionDe: 'Objekte suchen & finden', descriptionFr: 'Jeux d\'observation', descriptionEs: 'Actividades de observación', descriptionIt: 'Attività di osservazione' },
      { nameEn: 'Grid Match', nameDe: 'Gitter-Zuordnung', nameFr: 'Grille d\'association', nameEs: 'Cuadrícula de asociación', nameIt: 'Griglia di abbinamento', slug: 'grid-match-worksheets', icon: '🔲', descriptionEn: 'Pattern matching', descriptionDe: 'Muster erkennen', descriptionFr: 'Reconnaissance de motifs', descriptionEs: 'Reconoce los patrones', descriptionIt: 'Riconosci i pattern' },
      { nameEn: 'Find & Count', nameDe: 'Suchen & Zählen', nameFr: 'Chercher et compter', nameEs: 'Buscar y contar', nameIt: 'Cerca e conta', slug: 'find-and-count-worksheets', icon: '🧮', descriptionEn: 'Count hidden items', descriptionDe: 'Versteckte Objekte zählen', descriptionFr: 'Compter les objets cachés', descriptionEs: 'Cuenta los objetos escondidos', descriptionIt: 'Conta gli oggetti nascosti' },
    ],
  },
  {
    id: 'creative',
    nameEn: 'Creative',
    nameDe: 'Kreativ',
    nameFr: 'Créatif',
    nameEs: 'Creativo',
    nameIt: 'Creativo',
    icon: '🎨',
    gradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
    apps: [
      { nameEn: 'Coloring', nameDe: 'Ausmalen', nameFr: 'Coloriage', nameEs: 'Colorear', nameIt: 'Colorare', slug: 'coloring-worksheets', icon: '🖍️', descriptionEn: 'Color by sections', descriptionDe: 'Nach Bereichen ausmalen', descriptionFr: 'Colorier par zones', descriptionEs: 'Colorea por secciones', descriptionIt: 'Colora per sezioni' },
      { nameEn: 'Draw & Color', nameDe: 'Zeichnen & Ausmalen', nameFr: 'Dessiner et colorier', nameEs: 'Dibujar y colorear', nameIt: 'Disegna e colora', slug: 'draw-and-color-worksheets', icon: '🎨', descriptionEn: 'Grid drawing', descriptionDe: 'Rasterzeichnen', descriptionFr: 'Dessin sur quadrillage', descriptionEs: 'Dibujo en cuadrícula', descriptionIt: 'Disegno su griglia' },
      { nameEn: 'Alphabet Train', nameDe: 'ABC-Zug', nameFr: 'Train de l\'alphabet', nameEs: 'Tren del abecedario', nameIt: 'Trenino dell\'alfabeto', slug: 'alphabet-train-worksheets', icon: '🚂', descriptionEn: 'ABC on trains', descriptionDe: 'Buchstaben auf Zügen', descriptionFr: 'L\'alphabet en train', descriptionEs: 'El ABC en trenes', descriptionIt: 'L\'alfabeto sul trenino' },
      { nameEn: 'Picture Bingo', nameDe: 'Bilder-Bingo', nameFr: 'Loto images', nameEs: 'Lotería de imágenes', nameIt: 'Tombola illustrata', slug: 'picture-bingo-worksheets', icon: '🎰', descriptionEn: 'Visual bingo cards', descriptionDe: 'Bingokarten mit Bildern', descriptionFr: 'Cartes de loto illustrées', descriptionEs: 'Cartas de lotería ilustradas', descriptionIt: 'Cartelle tombola con immagini' },
    ],
  },
  {
    id: 'logic',
    nameEn: 'Logic & Puzzles',
    nameDe: 'Logik & Rätsel',
    nameFr: 'Logique et énigmes',
    nameEs: 'Lógica y rompecabezas',
    nameIt: 'Logica e rompicapo',
    icon: '🧩',
    gradient: 'from-rose-500/10 to-red-500/10',
    borderColor: 'border-rose-500/20',
    apps: [
      { nameEn: 'Sudoku', nameDe: 'Sudoku', nameFr: 'Sudoku', nameEs: 'Sudoku', nameIt: 'Sudoku', slug: 'sudoku-worksheets', icon: '🔢', descriptionEn: 'Number logic grids', descriptionDe: 'Zahlenrätsel', descriptionFr: 'Grilles de chiffres', descriptionEs: 'Cuadrículas de lógica numérica', descriptionIt: 'Griglie di logica numerica' },
      { nameEn: 'Big & Small', nameDe: 'Groß & Klein', nameFr: 'Grand et petit', nameEs: 'Grande y pequeño', nameIt: 'Grande e piccolo', slug: 'big-small-worksheets', icon: '📏', descriptionEn: 'Size comparison', descriptionDe: 'Größenvergleich', descriptionFr: 'Comparaison de tailles', descriptionEs: 'Comparación de tamaños', descriptionIt: 'Confronto di dimensioni' },
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
    if (locale === 'it') return category.nameIt;
    if (locale === 'es') return category.nameEs;
    if (locale === 'fr') return category.nameFr;
    if (locale === 'de') return category.nameDe;
    return category.nameEn;
  };
  const getAppName = (app: App) => {
    if (locale === 'it') return app.nameIt;
    if (locale === 'es') return app.nameEs;
    if (locale === 'fr') return app.nameFr;
    if (locale === 'de') return app.nameDe;
    return app.nameEn;
  };
  const getAppDescription = (app: App) => {
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
