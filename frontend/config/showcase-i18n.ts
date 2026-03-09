/**
 * showcase-i18n.ts — Shared locale infrastructure for visual showcases.
 *
 * Provides:
 * 1. Locale-aware image URL builder
 * 2. German translation table for shared UI strings
 * 3. Per-app German text overrides (headings, descriptions, etc.)
 */

// ─── Locale-aware image URL builder ───

const localeFolderMap: Record<string, string> = {
  en: 'english',
  de: 'german',
};

/** Build a sample image URL for any locale */
export function imgUrl(appFolder: string, filename: string, locale: string = 'en') {
  const langFolder = localeFolderMap[locale] || 'english';
  return `/samples/${langFolder}/${encodeURIComponent(appFolder)}/${encodeURIComponent(filename)}`;
}

// ─── Shared German string translations ───
// Used by all 3 config files to auto-translate common strings.

const deStringTable: Record<string, string> = {
  // ── Badges ──
  'Grades K-2': 'Klassen K-2',
  'Grades 1-3': 'Klassen 1-3',
  'Grades 1-4': 'Klassen 1-4',
  'Skill Levels': 'Schwierigkeitsstufen',
  'Challenge Levels': 'Herausforderungsstufen',
  'Professional Printables': 'Professionelle Druckvorlagen',
  'Early Math Skills': 'Erste Rechenschritte',
  'Early Math Foundations': 'Mathe-Grundlagen',
  'Progression Path': 'Lernpfad',
  'Visual Learning': 'Visuelles Lernen',
  'Fine Motor Skills': 'Feinmotorik',
  'Pre-Writing': 'Vorschulschreiben',
  'Language Skills': 'Sprachkompetenz',
  'Word Skills': 'Wortschatz',
  'Logic & Fun': 'Logik & Spaß',
  'Creative Skills': 'Kreativität',
  'Observation Skills': 'Beobachtungsgabe',
  'Group Activities': 'Gruppenaktivitäten',

  // ── Tier names ──
  'Beginner': 'Anfänger',
  'Explorer': 'Entdecker',
  'Expert': 'Experte',
  'Rookie': 'Einsteiger',
  'Codebreaker': 'Codeknacker',
  'Mastermind': 'Meisterdetektiv',
  'Standard': 'Standard',
  'Advanced': 'Fortgeschritten',
  'Creative': 'Kreativ',

  // ── Common pill labels ──
  'Pictures + Numbers': 'Bilder + Zahlen',
  'Answer Keys': 'Lösungsschlüssel',
  'Answer Key Included': 'Lösungsschlüssel inklusive',
  'Print-Ready': 'Druckfertig',
  'Free Trial with Watermark': 'Kostenlos testen mit Wasserzeichen',
  'Cross Out Method': 'Durchstreich-Methode',
  'Decode Messages': 'Nachrichten entschlüsseln',
  'Compare Amounts': 'Mengen vergleichen',
  'Brain Teasers': 'Denksportaufgaben',
  'Practice Problems': 'Übungsaufgaben',
  'ABC Learning': 'ABC Lernen',
  'Position Words': 'Positionswörter',
  'Guess the Word': 'Wort erraten',
  'Unscramble Words': 'Buchstabensalat lösen',
  'Find Hidden Words': 'Versteckte Wörter finden',
  'Crossword Puzzles': 'Kreuzworträtsel',
  'Decode Secrets': 'Geheimcodes knacken',
  'Handwriting Practice': 'Schreibübung',
  'Guided Lines': 'Führungslinien',
  'Size Comparison': 'Größenvergleich',
  'Pattern Fun': 'Musterspaß',
  'Pattern Recognition': 'Mustererkennung',
  'Grid Drawing': 'Rasterzeichnen',
  'Step-by-Step': 'Schritt für Schritt',
  'Trace Lines': 'Linien nachzeichnen',
  'Fine Motor': 'Feinmotorik',
  'Color & Create': 'Ausmalen & Gestalten',
  'Themed Pages': 'Themen-Seiten',
  'Picture Graphs': 'Bilddiagramme',
  'Match Pairs': 'Paare finden',
  'Grid Puzzles': 'Raster-Puzzle',
  'Match Shadows': 'Schatten zuordnen',
  'Bingo Cards': 'Bingokarten',
  'Callout Sheets': 'Aufruflisten',
  'Sort & Classify': 'Sortieren & Zuordnen',
  'Find Missing Parts': 'Fehlende Teile finden',
  'Spot the Odd One': 'Finde den Unterschied',
  'Picture Sudoku': 'Bilder-Sudoku',
  'Follow the Path': 'Folge dem Pfad',
  'I Spy & Count': 'Ich sehe was & Zählen',
  'Hidden Objects': 'Versteckte Objekte',
  'Map Adventures': 'Kartenabenteuer',
  'Themed Pictures': 'Themenbilder',
  'Instant Download': 'Sofort-Download',

  // ── Spotlight pills ──
  'Print Instantly!': 'Sofort ausdrucken!',
  'Pictures for Math': 'Bilder für Mathe',
  'With Answer Keys': 'Mit Lösungsschlüssel',
  'Cross Out Pictures': 'Bilder durchstreichen',
  'Crack the Code!': 'Knack den Code!',
  'Math + Logic': 'Mathe + Logik',
  'Compare & Learn!': 'Vergleichen & Lernen!',
  'Visual Comparisons': 'Visuelle Vergleiche',
  'Puzzle Fun!': 'Puzzle-Spaß!',
  'Practice Makes Perfect!': 'Übung macht den Meister!',
  'All Operations': 'Alle Rechenarten',
  'All Aboard ABC!': 'Alle einsteigen zum ABC!',
  'Letter Recognition': 'Buchstabenerkennung',
  'Where Is It?': 'Wo ist es?',
  'Position Practice': 'Positionsübung',
  'Guess It!': 'Rate mal!',
  'Picture Clues': 'Bilderhinweise',
  'Unscramble Fun!': 'Buchstabensalat!',
  'Spelling Practice': 'Rechtschreibübung',
  'Find the Words!': 'Finde die Wörter!',
  'Custom Themes': 'Eigene Themen',
  'Solve the Clues!': 'Löse die Hinweise!',
  'Vocabulary Fun': 'Vokabel-Spaß',
  'Letter Substitution': 'Buchstaben-Ersetzung',
  'Write & Learn!': 'Schreiben & Lernen!',
  'Letter Formation': 'Buchstabenform',
  'Guided Practice': 'Geführtes Üben',
  'Big or Small?': 'Groß oder Klein?',
  'Visual Comparison': 'Visueller Vergleich',
  'Complete the Pattern!': 'Vervollständige das Muster!',
  'Train Theme': 'Zug-Thema',
  'Spot the Pattern!': 'Erkenne das Muster!',
  'Logical Thinking': 'Logisches Denken',
  'Draw It!': 'Zeichne es!',
  'Grid Guidance': 'Raster-Hilfe',
  'Creative Fun': 'Kreativer Spaß',
  'Trace & Learn!': 'Nachzeichnen & Lernen!',
  'Motor Skills': 'Motorik',
  'Color Your World!': 'Male deine Welt!',
  '100+ Themes': '100+ Themen',
  'Print & Color': 'Ausdrucken & Ausmalen',
  'Data Made Fun!': 'Daten machen Spaß!',
  'Visual Graphing': 'Visuelles Diagramm',
  'Find the Match!': 'Finde das Paar!',
  'Visual Pairing': 'Visuelles Zuordnen',
  'Match the Grid!': 'Raster zuordnen!',
  'Spatial Skills': 'Räumliches Denken',
  'Find the Shadow!': 'Finde den Schatten!',
  'Visual Matching': 'Visuelles Zuordnen',
  'BINGO!': 'BINGO!',
  'Group Activity': 'Gruppenaktivität',
  'Print & Play': 'Ausdrucken & Spielen',
  'Sort It Out!': 'Sortiere es!',
  'Categories': 'Kategorien',
  'Complete the Picture!': 'Vervollständige das Bild!',
  'Visual Logic': 'Visuelle Logik',
  'Which One Is Different?': 'Welches ist anders?',
  'Visual Reasoning': 'Visuelles Denken',
  'Sudoku Fun!': 'Sudoku-Spaß!',
  'Logic Puzzles': 'Logik-Rätsel',
  'Find the Way!': 'Finde den Weg!',
  'Maze & Path': 'Labyrinth & Pfad',
  'I Spy!': 'Ich sehe was!',
  'Count & Find': 'Zählen & Finden',
  'Find Them All!': 'Finde sie alle!',
  'Sharp Eyes': 'Scharfe Augen',
  'Hunt for Treasure!': 'Schatzsuche!',
  'Map Reading': 'Karten lesen',
  'Download & Print': 'Herunterladen & Drucken',
  'Themed Images': 'Themenbilder',
  'Solutions Included': 'Lösungen inklusive',

  // ── Gallery pills ──
  'No Prep Required': 'Keine Vorbereitung nötig',
  'Answers Included': 'Lösungen inklusive',
  'Differentiated': 'Differenziert',
  'Multiple Modes': 'Verschiedene Modi',
  'Problem Solving': 'Problemlösung',
  'All Skill Levels': 'Alle Schwierigkeitsstufen',
  'Vocabulary Builder': 'Wortschatztraining',
  'Any Theme': 'Jedes Thema',
  'Custom Words': 'Eigene Wörter',
  'Spelling Skills': 'Rechtschreibung',
  'Logic Skills': 'Logikfähigkeiten',
  'Engaging': 'Motivierend',
  'Vocabulary': 'Wortschatz',
  'Traceable': 'Nachzeichenbar',
  'All Letters': 'Alle Buchstaben',
  'Grammar': 'Grammatik',
  'Size Concepts': 'Größenkonzepte',
  'Pattern Skills': 'Mustererkennung',
  'Engaging Theme': 'Ansprechendes Thema',
  'Critical Thinking': 'Kritisches Denken',
  'Art Skills': 'Kunstfertigkeiten',
  'Progressive': 'Aufbauend',
  'Data Skills': 'Datenkompetenz',
  'Cognitive Skills': 'Kognitive Fähigkeiten',
  'Logic': 'Logik',
  'Visual Thinking': 'Visuelles Denken',
  'Observation': 'Beobachtung',
  'Fun Challenge': 'Spaßige Herausforderung',
  'Group Fun': 'Gruppenspaß',
  'Callouts Included': 'Aufruflisten inklusive',
  'Classification': 'Klassifizierung',
  'Brain Training': 'Gehirntraining',
  '3 Difficulties': '3 Schwierigkeiten',
  'Navigation': 'Navigation',
  'Fun Themes': 'Spaßige Themen',
  'Counting': 'Zählen',
  'Themed Scenes': 'Themen-Szenen',
  'Detailed Scenes': 'Detaillierte Szenen',
  'Adventure': 'Abenteuer',
  'Number Sense': 'Zahlenverständnis',
  'Comprehensive': 'Umfassend',
  'Challenging': 'Herausfordernd',
  'Phonics': 'Lautlehre',
  'Fun Theme': 'Lustiges Thema',
  'Multiple Themes': 'Verschiedene Themen',

  // ── Gallery labels ──
  'Worksheet': 'Arbeitsblatt',
  'Answer Key': 'Lösungsschlüssel',
  'Activity Page': 'Aktivitätsseite',
  'Practice Sheet': 'Übungsblatt',
  'Solutions': 'Lösungen',
  'Find Subtrahend': 'Subtrahend finden',
  'Code Puzzle': 'Code-Rätsel',
  'More or Less': 'Mehr oder Weniger',
  'Bingo Card': 'Bingokarte',
  'Callout Sheet': 'Aufrufliste',

  // ── Gallery/tool pills ──
  'Print-Ready PDFs': 'Druckfertige PDFs',
  'Zero Prep Time': 'Null Vorbereitungszeit',
  'Full Solutions': 'Vollständige Lösungen',
  'Professional Quality': 'Professionelle Qualität',
  'Multiple Formats': 'Verschiedene Formate',

  // ── Trophy/motivational text ──
  'Every child can succeed at their own pace': 'Jedes Kind kann in seinem eigenen Tempo Erfolg haben',
  'Build confidence with every problem solved': 'Mit jeder gelösten Aufgabe wächst das Selbstvertrauen',
  'Professional quality at every difficulty level': 'Professionelle Qualität auf jedem Schwierigkeitsniveau',
  'Progress at your own pace with visual math': 'In eigenem Tempo mit visueller Mathematik lernen',
};

/**
 * Translate a shared UI string to German.
 * Returns the original string if no translation is found.
 */
export function t(s: string, locale: string): string {
  if (locale !== 'de') return s;
  return deStringTable[s] ?? s;
}

/**
 * Translate an array of pill objects (with label + icon).
 */
export function tPills(
  pills: Array<{ label: string; icon: string }>,
  locale: string,
): Array<{ label: string; icon: string }> {
  if (locale !== 'de') return pills;
  return pills.map(p => ({ ...p, label: deStringTable[p.label] ?? p.label }));
}

/**
 * Translate an array of string pills.
 */
export function tStringPills(pills: string[], locale: string): string[] {
  if (locale !== 'de') return pills;
  return pills.map(p => deStringTable[p] ?? p);
}
