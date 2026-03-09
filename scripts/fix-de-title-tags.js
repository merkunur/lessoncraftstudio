#!/usr/bin/env node
/**
 * Fix all German content files with titleTag > 60 chars.
 * Each replacement is hand-crafted to preserve primary keyword + stay ≤ 60 chars.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');

// Map: category/filename → new titleTag (all verified ≤ 60 chars)
const FIXES = {
  // === APP CONTENT (31 fixes) ===
  'app-content/de/alphabet-train': 'Alphabet-Zug-Generator | Buchstaben-Druckvorlagen',
  'app-content/de/big-small': 'Groß-Klein-Generator | Größenvergleich-Übungen',
  'app-content/de/bingo': 'Bilder-Bingo-Generator | Bingo-Karten erstellen',
  'app-content/de/chart-count': 'Bilddiagramm-Generator | Piktogramm-Übungen',
  'app-content/de/code-addition': 'Bilder-Additions-Generator | Code-Knacker-Mathe',
  'app-content/de/coloring': 'Malvorlagen-Generator | Ausmalbilder erstellen',
  'app-content/de/crossword': 'Kreuzworträtsel-Generator | Bilder-Kreuzworträtsel',
  'app-content/de/cryptogram': 'Kryptogramm-Generator | Bilder-Chiffre-Rätsel',
  'app-content/de/draw-and-color': 'Rasterzeichnen-Generator | Gitterzeichnungen',
  'app-content/de/drawing-lines': 'Linien-Ziehen-Generator | Schwungübungen',
  'app-content/de/find-and-count': 'Suchbild-Generator | Ich-sehe-was-Übungen',
  'app-content/de/find-objects': 'Versteckte-Objekte-Generator | Suchbilder',
  'app-content/de/grid-match': 'Raster-Puzzle-Generator | Bilder-Rasterpuzzle',
  'app-content/de/matching': 'Zuordnungs-Generator | Paare-Verbinden-Übungen',
  'app-content/de/math-puzzle': 'Mathe-Rätsel-Generator | Puzzle-Druckvorlagen',
  'app-content/de/math-worksheet': 'Algebra-Bilderrätsel-Generator | Gleichungen',
  'app-content/de/missing-pieces': 'Fehlende-Puzzleteile-Generator | Puzzle-Rätsel',
  'app-content/de/more-less': 'Mehr-oder-Weniger-Generator | Vergleichsübungen',
  'app-content/de/odd-one-out': 'Was-Passt-Nicht-Generator | Ausreißer-Rätsel',
  'app-content/de/pattern-train': 'Muster-Zug-Generator | Musterfolge-Übungen',
  'app-content/de/pattern-worksheet': 'Muster-Raster-Generator | Muster-Arbeitsblätter',
  'app-content/de/picture-path': 'Labyrinth-Generator | Bilderpfad-Arbeitsblätter',
  'app-content/de/picture-sort': 'Bilder-Sortieren-Generator | Sortier-Aktivitäten',
  'app-content/de/prepositions': 'Präpositionen-Generator | Räumliche Beziehungen',
  'app-content/de/shadow-match': 'Schattenbilder-Generator | Silhouetten-Zuordnung',
  'app-content/de/sudoku': 'Bilder-Sudoku-Generator | 4×4-Bild-Sudoku',
  'app-content/de/treasure-hunt': 'Schatzsuche-Generator | Richtungs-Rätsel',
  'app-content/de/word-guess': 'Wörter-Raten-Generator | Bild-Hinweis-Vokabel',
  'app-content/de/word-scramble': 'Buchstabensalat-Generator | Buchstaben-Rätsel',
  'app-content/de/word-search': 'Wortsuche-Generator | Wortsuchrätsel erstellen',
  'app-content/de/writing': 'Schreibübungen-Generator | Handschrift-Übungen',

  // === TOOL CONTENT (30 fixes) ===
  'tool-content/de/alphabet-train': 'Alphabet-Zug-Generator | Buchstabenzug-Ersteller',
  'tool-content/de/big-small': 'Größenvergleich-Generator | Groß-Klein-Übungen',
  'tool-content/de/chart-count': 'Bilddiagramm-Generator | Ersteller für Verkäufer',
  'tool-content/de/code-addition': 'Bilder-Additions-Ersteller | Code-Knacker-Mathe',
  'tool-content/de/crossword': 'Kreuzworträtsel-Ersteller | Bilder-Rätsel',
  'tool-content/de/cryptogram': 'Kryptogramm-Generator | Bilder-Chiffre-Rätsel',
  'tool-content/de/draw-and-color': 'Rasterzeichnen-Generator | Gitter-Zeichnungen',
  'tool-content/de/drawing-lines': 'Linienverfolgung-Generator | Schwungübungen',
  'tool-content/de/find-and-count': 'Suchen-und-Zählen-Ersteller | Suchbild-Generator',
  'tool-content/de/find-objects': 'Suchbilder-Ersteller | Versteckte-Objekte-Rätsel',
  'tool-content/de/grid-match': 'Raster-Puzzle-Ersteller | Bilder-Rasterpuzzle',
  'tool-content/de/image-addition': 'Additions-Ersteller | Mathe-Übungen mit Bildern',
  'tool-content/de/image-subtraction': 'Subtraktions-Ersteller | Durchstreich-Übungen',
  'tool-content/de/matching': 'Zuordnungs-Generator | Paare-Verbinden-Ersteller',
  'tool-content/de/math-puzzle': 'Mathe-Rätsel-Generator | Puzzle-Mathe-Übungen',
  'tool-content/de/math-worksheet': 'Mathe-Generator | Algebra-Bilderrätsel erstellen',
  'tool-content/de/missing-pieces': 'Fehlende-Puzzleteile-Ersteller | Puzzle-Rätsel',
  'tool-content/de/more-less': 'Mehr-oder-Weniger-Ersteller | Vergleichsübungen',
  'tool-content/de/odd-one-out': 'Was-Passt-Nicht-Ersteller | Ausreißer-Rätsel',
  'tool-content/de/pattern-train': 'Muster-Zug-Ersteller | Musterfolge-Generator',
  'tool-content/de/pattern-worksheet': 'Muster-Generator | Muster-Arbeitsblätter',
  'tool-content/de/picture-path': 'Bilderpfad-Ersteller | Labyrinth-Generator',
  'tool-content/de/prepositions': 'Präpositionen-Generator | Ortspräpositionen',
  'tool-content/de/shadow-match': 'Schattenbilder-Ersteller | Silhouetten-Zuordnung',
  'tool-content/de/treasure-hunt': 'Schatzsuche-Ersteller | Richtungs-Rätsel',
  'tool-content/de/word-guess': 'Wörter-Raten-Generator | Rechtschreib-Übungen',
  'tool-content/de/word-scramble': 'Buchstabensalat-Generator | Buchstaben-Rätsel',
  'tool-content/de/word-search': 'Wortsuche-Generator | Buchstabengitter-Rätsel',
  'tool-content/de/writing': 'Schreibübungen-Generator | Handschrift-Übungen',

  // === BUNDLE CONTENT (5 fixes) ===
  'bundle-content/de/matching-bundle': 'Zuordnung & Sortierung — 5-Generatoren-Paket',
  'bundle-content/de/math-bundle': 'Mathe-Arbeitsblatt-Paket — 6 Mathe-Generatoren',
  'bundle-content/de/puzzle-bundle': 'Rätsel & Logik — 4-Generatoren-Paket',
  'bundle-content/de/search-bundle': 'Suchen & Finden — 4-Generatoren-Paket',
  'bundle-content/de/visual-bundle': 'Visuelles Lernen — 7-Generatoren-Paket',

  // === START CONTENT (4 fixes) ===
  'start-content/de/create-worksheets-that-sell': 'Arbeitsblätter die sich verkaufen — Profi-Tipps',
  'start-content/de/marketing-printable-business': 'Druckvorlagen vermarkten — Verkäufer-Leitfaden',
  'start-content/de/scaling-printable-business': 'Druckvorlagen-Geschäft skalieren — Wachstumstipps',
  'start-content/de/tools-for-printable-business': 'Beste Werkzeuge für Druckvorlagen-Verkäufer',

  // === GUIDE CONTENT (13 fixes) ===
  'guide-content/de/create-addition-worksheets': 'Additions-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-drawing-worksheets': 'Zeichen-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-handwriting-sheets': 'Schreibübungen-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-hidden-object-worksheets': 'Suchbilder-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-matching-worksheets': 'Zuordnungs-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-math-puzzle-worksheets': 'Mathe-Rätsel-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-maze-worksheets': 'Labyrinth-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-pattern-worksheets': 'Muster-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-shadow-matching-worksheets': 'Schattenbilder-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-size-comparison-worksheets': 'Größenvergleich-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/create-subtraction-worksheets': 'Subtraktions-Arbeitsblätter erstellen — Anleitung',
  'guide-content/de/research-profitable-niches': 'Profitable Druckvorlagen-Nischen recherchieren',
  'guide-content/de/scale-printable-business-guide': 'Druckvorlagen-Geschäft skalieren — Wachstumstipps',

  // === IDEA CONTENT (34 fixes) ===
  'idea-content/de/back-to-school-printable-ideas': 'Schulanfang-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/camping-printable-ideas': 'Camping-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/christmas-printable-ideas': 'Weihnachts-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/construction-printable-ideas': 'Baustelle Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/custom-worksheet-service-ideas': 'Arbeitsblatt-Service Geschäftsideen — Leitfaden',
  'idea-content/de/digital-download-printable-ideas': 'Digitale Download-Arbeitsblatt-Ideen — Leitfaden',
  'idea-content/de/dinosaur-printable-ideas': 'Dinosaurier-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/fairy-tale-printable-ideas': 'Märchen-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/farm-animals-printable-ideas': 'Bauernhoftiere-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/first-grade-printable-ideas': 'Erste-Klasse-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/food-cooking-printable-ideas': 'Essen & Kochen Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/forest-animals-printable-ideas': 'Waldtiere-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/halloween-printable-ideas': 'Halloween-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/homeschool-printable-ideas': 'Heimunterricht-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/insects-printable-ideas': 'Insekten-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/kindergarten-printable-ideas': 'Kindergarten-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/math-facts-printable-ideas': 'Mathe-Grundlagen-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/ocean-animals-printable-ideas': 'Meerestiere-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/parents-day-printable-ideas': 'Elterntag-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/party-supply-printable-ideas': 'Druckbare Partyzubehör-Ideen — Verkäufer-Guide',
  'idea-content/de/pets-printable-ideas': 'Haustiere-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/physical-printable-product-ideas': 'Physische Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/pirates-printable-ideas': 'Piraten-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/preschool-printable-ideas': 'Vorschule-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/safari-animals-printable-ideas': 'Safaritiere-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/second-grade-printable-ideas': 'Zweite-Klasse-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/space-printable-ideas': 'Weltraum-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/special-education-printable-ideas': 'Sonderpädagogik-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/spring-printable-ideas': 'Frühling-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/summer-learning-printable-ideas': 'Sommerlernen-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/thanksgiving-printable-ideas': 'Erntedankfest-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/third-grade-printable-ideas': 'Dritte-Klasse-Druckvorlagen — Verkäufer-Guide',
  'idea-content/de/transportation-printable-ideas': 'Fahrzeuge-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/underwater-printable-ideas': 'Unterwasser-Druckvorlagen-Ideen — Verkäufer-Guide',
  'idea-content/de/valentines-day-printable-ideas': 'Valentinstag-Druckvorlagen-Ideen — Verkäufer-Guide',
};

// Validate all replacement values are ≤ 60 chars
let validationErrors = 0;
for (const [key, val] of Object.entries(FIXES)) {
  if (val.length > 60) {
    console.error(`ERROR: ${key} → "${val}" is ${val.length} chars (max 60)`);
    validationErrors++;
  }
}
if (validationErrors > 0) {
  console.error(`\n${validationErrors} validation errors. Aborting.`);
  process.exit(1);
}

// Apply fixes
let fixed = 0;
let skipped = 0;
let errors = 0;

for (const [key, newTitle] of Object.entries(FIXES)) {
  const filePath = path.join(BASE, key + '.ts');

  if (!fs.existsSync(filePath)) {
    console.error(`SKIP (not found): ${filePath}`);
    skipped++;
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf-8');

  // Find and replace the titleTag value
  // Match: titleTag: 'old value' or titleTag: "old value"
  const titleRegex = /titleTag:\s*(['"])(.*?)\1/;
  const match = content.match(titleRegex);

  if (!match) {
    console.error(`SKIP (no titleTag found): ${key}`);
    skipped++;
    continue;
  }

  const oldTitle = match[2];
  if (oldTitle.length <= 60) {
    console.log(`SKIP (already OK at ${oldTitle.length} chars): ${key}`);
    skipped++;
    continue;
  }

  // Replace titleTag value, preserving quote style
  const quote = match[1];
  content = content.replace(titleRegex, `titleTag: ${quote}${newTitle}${quote}`);

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`FIXED: ${key} (${oldTitle.length} → ${newTitle.length} chars)`);
  fixed++;
}

console.log(`\n=== TITLE TAG FIX SUMMARY ===`);
console.log(`Fixed: ${fixed}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors}`);
console.log(`Total entries: ${Object.keys(FIXES).length}`);
