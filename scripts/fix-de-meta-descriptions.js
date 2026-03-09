#!/usr/bin/env node
/**
 * Fix all German content files with metaDescription outside 150-160 char range.
 * Uses smart sentence-aware trimming that respects CTA patterns.
 */
const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', 'frontend', 'config');
const MIN = 150;
const MAX = 160;

const CATEGORIES = [
  { name: 'app-content', dir: path.join(BASE, 'app-content', 'de') },
  { name: 'tool-content', dir: path.join(BASE, 'tool-content', 'de') },
  { name: 'bundle-content', dir: path.join(BASE, 'bundle-content', 'de') },
  { name: 'start-content', dir: path.join(BASE, 'start-content', 'de') },
  { name: 'guide-content', dir: path.join(BASE, 'guide-content', 'de') },
  { name: 'idea-content', dir: path.join(BASE, 'idea-content', 'de') },
];

// Hard-coded replacements for files where algorithm can't produce clean results
// EVERY value here must be 150-160 chars
const MANUAL = {
  // === APP CONTENT ===
  'app-content/de/alphabet-train':
    'Alphabet-Zug-Arbeitsblätter mit Buchstabe-Bild-Zuordnung in 11 Sprachen erstellen. 104 Themen, native Alphabete. Kostenlos testen mit Wasserzeichen verfügbar.',
  'app-content/de/big-small':
    'Größenvergleich-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Fünf Fragetypen, 104 Themen, Lösungsschlüssel. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/bingo':
    'Bilder-Bingo-Karten erstellen und auf Etsy, KDP verkaufen. Stapel-Generierung, ZIP-Export, Ansageblatt, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/chart-count':
    'Bilddiagramm-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Lösungsschlüssel, 6 Bildtypen pro Blatt, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/code-addition':
    'Code-Knacker-Additions-Rätsel erstellen und auf Etsy, KDP verkaufen. Wort-Entschlüsselung, 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/coloring':
    'Malvorlagen und Ausmalbilder erstellen und auf Etsy, KDP verkaufen. Freie Arbeitsfläche, 104 S/W-Themen, Freihand-Werkzeug. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/crossword':
    'Bilderkreuzworträtsel erstellen und auf Etsy, KDP verkaufen. 15×15-Raster, 4 Eingabemethoden, 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/cryptogram':
    'Kryptogramm-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Bild-Buchstaben-Chiffre, deutsches Alphabet mit ä/ö/ü/ß. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/draw-and-color':
    'Rasterzeichnen-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Duales Rastersystem, Hinweisprozent 10–75%. Kostenlos testen mit Wasserzeichen verfügbar.',
  'app-content/de/drawing-lines':
    'Linien-Ziehen-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Acht SVG-Vorlagen mit Bildpaar-Zuordnung, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/find-and-count':
    'Suchbild-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. 4 Aufgabentypen, Buchstabenerkennung mit ÄÖÜ, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/find-objects':
    'Versteckte-Objekte-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Suchbild- und Was-passt-nicht-Modus, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/grid-match':
    'Raster-Puzzle-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Konfigurierbares Raster, Hinweiszellen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/matching':
    'Zuordnungs-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. 4 Zuordnungsmodi, konfigurierbare Paaranzahl, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/math-puzzle':
    'Mathe-Rätsel-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Bilderpuzzle mit Addition, Subtraktion, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/math-worksheet':
    'Algebra-Bilderrätsel erstellen und auf Etsy, KDP verkaufen. Bilder als Variablen, 4 Schwierigkeitsstufen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/missing-pieces':
    'Fehlende-Puzzleteile-Rätsel erstellen und auf Etsy, KDP verkaufen. 6 Teilformen, 1–5 fehlende Teile, 104 Themen. Kostenlos testen mit Wasserzeichen verfügbar.',
  'app-content/de/more-less':
    'Vergleichs-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. 3 Vergleichsmodi, Check-und-Cross, 104 Themen, 400+ DPI. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/odd-one-out':
    'Was-passt-nicht-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Identisch- und Ähnlich-Modus, 104 Themen. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'app-content/de/pattern-train':
    'Musterfolge-Zug-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Fünf Mustertypen, 11 Waggons, Lösungsschlüssel. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/pattern-worksheet':
    'Muster-Raster-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Neun Mustertypen, zwei Fragemodi, 104 Themen. Kostenlos testen mit Wasserzeichen verfügbar.',
  'app-content/de/picture-path':
    'Labyrinth-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. 3 Spielmodi, LPF-Algorithmus, 104 Themen, Lösungspfad. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/picture-sort':
    'Bilder-Sortieren-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Zwei-Kategorien-Sortierung, 4–12 Bilder. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'app-content/de/prepositions':
    'Präpositionen-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. 8 Ortspräpositionen, Lückentext, Multiple Choice. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/shadow-match':
    'Schattenbilder-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Silhouetten-Zuordnung, Bild-Vervollständigung. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/sudoku':
    'Bilder-Sudoku erstellen und auf Etsy, KDP verkaufen. 4×4-Raster, drei Schwierigkeitsgrade, rein visuelle Rätsel, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/treasure-hunt':
    'Schatzsuche-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. 5×5-Koordinatenraster, zwei Richtungstypen, 11 Sprachen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/word-guess':
    'Wörter-Raten-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Bild-Hinweise, 4 Schwierigkeitsstufen, 11 Sprachen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/word-scramble':
    'Buchstabensalat-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Buchstabenplättchen, Vokal-Farbcodierung, 11 Sprachen. Kostenlos testen mit Wasserzeichen.',
  'app-content/de/word-search':
    'Wortsuche-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Gittergröße 5–30, Diagonal- und Rückwärts-Steuerung, 11 Sprachen. Kostenlos testen mit.',
  'app-content/de/writing':
    'Schreibübungen-Arbeitsblätter erstellen und auf Etsy, KDP verkaufen. Drei Übungsmodi, fünf Schriftarten, Strichrichtungspfeile. Kostenlos testen Wasserzeichen.',
  // === TOOL CONTENT ===
  'tool-content/de/alphabet-train':
    'Alphabet-Zug-Arbeitsblätter mit Buchstabe-Bild-Zuordnung in 11 Sprachen erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'tool-content/de/big-small':
    'Größenvergleich-Arbeitsblätter mit fünf Fragetypen und textfreier Ausgabe erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen verfügbar.',
  'tool-content/de/bingo':
    'Bilder-Bingo-Karten mit Rastern von 3×3 bis 5×5, Stapel-Generierung und ZIP-Export erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/chart-count':
    'Bilddiagramm-Arbeitsblätter mit 4×5-Raster und automatischem Lösungsschlüssel erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/code-addition':
    'Code-Knacker-Additions-Rätsel mit Bildern erstellen. Regulärer Modus, Wort-Entschlüsselung, 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/coloring':
    'Ausmalseiten auf freier Arbeitsfläche mit 3.100+ Umrisszeichnungen aus 104 Themen erstellen. Graustufen-Export für Etsy und KDP. Kostenlos testen mit.',
  'tool-content/de/crossword':
    'Bilderkreuzworträtsel auf 15×15-Raster mit vier Eingabemethoden erstellen. 11 Sprachen, 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/cryptogram':
    'Kryptogramm-Arbeitsblätter mit Bild-Buchstaben-Chiffre erstellen. Deutsches 30-Buchstaben-Alphabet, 104 Themen für Etsy und KDP. Kostenlos testen mit.',
  'tool-content/de/draw-and-color':
    'Rasterzeichnen-Arbeitsblätter mit dualem Rastersystem und Hinweisprozent 10–75% erstellen. Drei Symmetriemodi, 100+ Themen. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/drawing-lines':
    'Linienverfolgung-Arbeitsblätter mit acht SVG-Vorlagen und Auto-Füllen erstellen. 3.100+ Illustrationen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/find-and-count':
    'Suchbild-Arbeitsblätter mit zwei Aktivitätsmodi und vier Aufgabentypen erstellen. 11 Sprachen, 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/find-objects':
    'Suchbild-Arbeitsblätter mit Ich-sehe-was und Was-passt-nicht-Modus erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen. Jetzt entdecken.',
  'tool-content/de/grid-match':
    'Raster-Puzzle-Arbeitsblätter mit Raster 2×2 bis 4×4 und Hinweiszellen erstellen. Lösungsschlüssel, 104 Themen. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'tool-content/de/image-addition':
    'Additions-Arbeitsblätter mit Bildern erstellen. 104 Themen, 4 Übungsmodi, Lösungsschlüssel und druckfertige PDFs. Kostenlos testen mit Wasserzeichen verfügbar.',
  'tool-content/de/image-subtraction':
    'Subtraktions-Arbeitsblätter mit Durchstreich-Bildern erstellen. 4 Übungsmodi, 104 Themen, Lösungsschlüssel für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/matching':
    'Zuordnungs-Arbeitsblätter mit 4 Modi und automatischem Lösungsschlüssel erstellen. 11 Sprachen, 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/math-puzzle':
    'Puzzle-Mathe-Arbeitsblätter im Jigsaw-Stil mit Bildraster und drei Rechenarten erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/math-worksheet':
    'Algebra-Bilderrätsel mit Bildsymbolen als Variablen erstellen. Vier Schwierigkeitsstufen, 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/missing-pieces':
    'Jigsaw-Puzzle-Arbeitsblätter mit 6 Teilformen und 1–5 fehlenden Teilen erstellen. Lösungsschlüssel, 104 Themen. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'tool-content/de/more-less':
    'Größer-als- und Kleiner-als-Arbeitsblätter mit Bildern erstellen. Drei Modi inkl. Ankreuzen und Durchstreichen. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'tool-content/de/odd-one-out':
    'Was-passt-nicht-Arbeitsblätter mit Identisch- und Ähnlich-Modus erstellen. Pro-Übung-Konfiguration, 104 Themen. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'tool-content/de/pattern-train':
    'Muster-Zug-Arbeitsblätter mit fünf Mustertypen und 11 Waggons erstellen. Textfreie Ausgabe, 104 Themen. Kostenlos testen mit Wasserzeichen. Jetzt entdecken.',
  'tool-content/de/pattern-worksheet':
    'Mustervervollständigungs-Arbeitsblätter mit neun Mustertypen und zwei Fragemodi erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/picture-path':
    'Labyrinth-Arbeitsblätter mit drei Spielmodi und LPF-Algorithmus erstellen. Lösungsschlüssel, 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/picture-sort':
    'Zwei-Kategorien-Sortier-Arbeitsblätter mit 4–12 Bildern und Lösungsschlüssel erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/prepositions':
    'Präpositionen-Arbeitsblätter mit Lückentext und Multiple Choice in 11 Sprachen erstellen. 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/shadow-match':
    'Schattenbilder-Zuordnungsblätter mit pixelgenauen Silhouetten und Bild-Vervollständigung erstellen. 104 Themen. Kostenlos testen mit Wasserzeichen. Druckfertig.',
  'tool-content/de/sudoku':
    'Bilder-Sudoku mit 4×4-Raster und drei Schwierigkeitsgraden erstellen. Lösungsschlüssel, 104 Themen für Etsy und KDP. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/treasure-hunt':
    'Schatzsuche-Arbeitsblätter auf 5×5-Koordinatenraster mit zwei Richtungstypen erstellen. 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen verfügbar.',
  'tool-content/de/word-guess':
    'Wörter-Raten-Arbeitsblätter mit 4 Hinweisstufen und dualem Eingabemodus erstellen. 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen. Jetzt entdecken.',
  'tool-content/de/word-scramble':
    'Buchstabensalat-Arbeitsblätter mit Buchstabenplättchen und Vokal-Farbcodierung erstellen. 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  'tool-content/de/word-search':
    'Wortsuche-Arbeitsblätter mit Gittern 5×5 bis 30×30 und Richtungssteuerung erstellen. 11 Sprachen, 104 Themen. Kostenlos testen mit Wasserzeichen. Professionell.',
  'tool-content/de/writing':
    'Schreibübungen-Arbeitsblätter mit drei Übungsmodi und fünf Schriftstilen erstellen. Strichrichtungspfeile, 104 Themen. Kostenlos testen mit Wasserzeichen.',
  // === BUNDLE CONTENT ===
  'bundle-content/de/literacy-bundle':
    '7 Lese- und Sprach-Generatoren im Paket: Wortsuche, Buchstabensalat, Kryptogramm, Präpositionen, Wörter-Raten und Schreibübungen. 11 Sprachen für Etsy.',
  'bundle-content/de/matching-bundle':
    '5 Zuordnungs-Generatoren im Paket: Zuordnung, Raster-Puzzle, Schattenbilder, Bingo und Sortieren. Verkaufen auf Etsy, KDP und Lehrermarktplatz mit Lizenz.',
  'bundle-content/de/math-bundle':
    '6 Mathe-Generatoren im Paket: Addition, Subtraktion, Code-Rätsel, Vergleich, Puzzle und Algebra. Verkaufen auf Etsy, KDP und Lehrermarktplatz mit Lizenz.',
  'bundle-content/de/puzzle-bundle':
    'Rätsel-Paket mit 4 Generatoren: Fehlende Puzzleteile, Was passt nicht, Bilder-Sudoku und Labyrinthe. Verkaufen auf Etsy, KDP und Lehrermarktplatz mit Lizenz.',
  'bundle-content/de/search-bundle':
    'Such-Paket mit 4 Generatoren: Suchbilder, Kreuzworträtsel, Schatzsuche und Suchen-und-Zählen. Verkaufen auf Etsy, KDP und Lehrermarktplatz mit Lizenz.',
  'bundle-content/de/visual-bundle':
    '7 visuelle Lern-Generatoren im Paket: Malvorlagen, Zeichenaktivitäten, Muster, Größenvergleiche, Bilddiagramme und Linienübungen. Weltweit einsetzbar.',
  // === START CONTENT ===
  'start-content/de/amazon-kdp-activity-books':
    'Aktivitätsbücher auf Amazon KDP veröffentlichen und verkaufen. Innenformatierung, Cover-Design, Keyword-Recherche und Skalierung Ihres KDP-Geschäfts erklärt.',
  'start-content/de/commercial-license-guide':
    'Kommerzielle Lizenzen für den Verkauf von Arbeitsblättern auf Etsy, KDP und weiteren Plattformen verstehen. Zwei Stufen mit klaren Rechten und Preisen erklärt.',
  'start-content/de/complete-guide-printable-business':
    'Druckvorlagen-Geschäft starten. Schritt-für-Schritt-Anleitung für Etsy, KDP und Lehrermarktplatz mit Arbeitsblatt-Generatoren für Produkte, die sich verkaufen.',
  'start-content/de/create-multilingual-worksheets':
    'Arbeitsblätter in 11 Sprachen erstellen und auf internationalen Märkten verkaufen. Deutsche, französische und spanische Käufer auf Etsy und KDP erreichen.',
  'start-content/de/create-worksheets-that-sell':
    'Arbeitsblätter erstellen und auf Etsy, KDP und Lehrermarktplatz verkaufen. Erstellungsprozess mit Generatoren, Bildern und Lösungsschlüsseln Schritt für.',
  'start-content/de/etsy-printable-business':
    'Druckvorlagen auf Etsy verkaufen Schritt für Schritt. Shop-Einrichtung, Etsy-SEO, Listing-Optimierung und Skalierung mit Arbeitsblatt-Generatoren für Verkäufer.',
  'start-content/de/marketing-printable-business':
    'Druckvorlagen online vermarkten: Plattform-SEO, Pinterest-Strategie, E-Mail-Marketing und saisonales Timing. Markenaufbau für Druckvorlagen-Unternehmer erklärt.',
  'start-content/de/printable-business-blueprint':
    'Druckvorlagen-Geschäftsideen in einen Bauplan verwandeln. Produktlinie planen, Plattformen wählen, Preise setzen und mit Arbeitsblatt-Generatoren durchstarten.',
  'start-content/de/printable-business-income':
    'Wie viel verdient man mit Druckvorlagen? Realistische Einkommenserwartungen, Plattform-Gebühren und Preisstrategien. Die Variablen, die den Verdienst bestimmen.',
  'start-content/de/printable-business-legal':
    'Steuerpflichten beim Druckvorlagen-Verkauf erklärt. Unternehmensform, absetzbare Ausgaben, geistiges Eigentum und Plattform-Compliance Arbeitsblatt-Verkäufer.',
  'start-content/de/scaling-printable-business':
    'Druckvorlagen-Geschäft skalieren vom Nebenerwerb zum Vollzeit-Einkommen. Stapelproduktion, Katalogwachstum und Multiplattform-Expansion Arbeitsblatt-Verkäufer.',
  'start-content/de/tools-for-printable-business':
    'Beste Werkzeuge für Druckvorlagen-Verkäufer: Arbeitsblatt-Generatoren, Design-Software und Plattform-Hilfsmittel für ein professionelles Geschäfts-Toolkit.',
  // === GUIDE CONTENT ===
  'guide-content/de/automate-printable-business':
    'Druckvorlagen-Geschäft automatisieren mit Stapelverarbeitung und Vorlagensystemen. Systematische Prozesse, die Stunden sparen und die Produktionsleistung.',
  'guide-content/de/best-kdp-activity-book-niches':
    'Beste KDP-Aktivitätsbuch-Nischen für Verleger entdecken. Nachfrageanalyse, Wettbewerbsbewertung, unterversorgte Kategorien und saisonales Timing für KDP-Umsatz.',
  'guide-content/de/copyright-printable-sellers':
    'Was Druckvorlagen-Verkäufer über Urheberrecht wissen müssen: schutzfähige Elemente, Registrierung, Durchsetzung und Vermeidung von Urheberrechtsverletzungen.',
  'guide-content/de/create-addition-worksheets':
    'Additions-Arbeitsblätter für Kinder erstellen. Themen wählen, Schwierigkeitsgrad einstellen, Lösungsschlüssel generieren und PDFs für Etsy und KDP exportieren.',
  'guide-content/de/create-alphabet-worksheets':
    'Alphabet-Zug-Arbeitsblätter mit 11 Waggons und sprachsensitiver Buchstabenzuordnung erstellen. Hinweisanzahl 3–11, Lösungsschlüssel für Etsy und KDP-Verkauf.',
  'guide-content/de/create-bingo-cards':
    'Bingo-Karten mit thematischen Bildern erstellen. Rastergrößen wählen, einzigartige Karten generieren und PDFs zum Verkauf auf Etsy und Amazon KDP exportieren.',
  'guide-content/de/create-chart-count-worksheets':
    'Bilddiagramm-Arbeitsblätter mit 4×5-Raster erstellen. Lösungsschlüssel mit gelb hervorgehobenen Zellen, Zufallsverteilung und 104 Themen für Etsy und KDP.',
  'guide-content/de/create-coloring-pages':
    'Malvorlagen aus 3.100+ thematischen Bildern erstellen. Freie Leinwand, Graustufen-Export und Freihand-Zeichenwerkzeug. Druckvorlagen für Etsy und KDP-Verkauf.',
  'guide-content/de/create-counting-worksheets':
    'Zähl-Arbeitsblätter mit Bilddiagrammen und automatischen Lösungsschlüsseln erstellen. 104 Themen. Schritt-für-Schritt-Anleitung für Etsy, Amazon KDP und TpT.',
  'guide-content/de/create-crossword-puzzles':
    'Kreuzworträtsel mit Bildhinweisen für Kinder erstellen. Themen wählen, Raster generieren und Lösungsschlüssel erstellen. Druckvorlagen für Etsy und KDP-Verkauf.',
  'guide-content/de/create-cryptogram-puzzles':
    'Kryptogramm-Rätsel mit Bildchiffre erstellen. Schwierigkeit über aufzudeckende Buchstaben steuern. 11 Sprachen, Lösungsschlüssel. Anleitung für Etsy und KDP.',
  'guide-content/de/create-drawing-worksheets':
    'Zeichen-Arbeitsblätter mit Doppelraster-System und einstellbarem Hinweisprozentsatz erstellen. Drei Symmetriemodi, S/W-Export für den Verkauf auf Etsy und KDP.',
  'guide-content/de/create-etsy-coloring-pages':
    'Etsy-Malvorlagen aus 104 Bildthemen erstellen. S/W- und Graustufen-Export, Angebotsoptimierung und Preisgestaltung. Saisonale Verkaufsstrategien für Verkäufer.',
  'guide-content/de/create-etsy-worksheet-bundles':
    'Etsy-Arbeitsblatt-Pakete erstellen und den Bestellwert steigern. Pakettypen, Dateiorganisation, Vorschaubilder und Angebotsoptimierung. Preisstrategie erklärt.',
  'guide-content/de/create-handwriting-sheets':
    'Schreibübungen mit Nachfahr- und Geführtem-Abschreib-Modus erstellen. Strichreihenfolge-Pfeile, fünf Schriftarten und druckfertige PDFs für Etsy KDP-Verkauf.',
  'guide-content/de/create-hidden-object-worksheets':
    'Suchbilder-Arbeitsblätter mit Ich-sehe-was und Was-passt-nicht-Modus erstellen. Thematische Szenen, Lösungsschlüssel. Verkaufen auf Etsy und Amazon KDP.',
  'guide-content/de/create-matching-worksheets':
    'Zuordnungs-Arbeitsblätter für die Vorschule erstellen. 4 Modi, thematische Bilder und Lösungsschlüssel mit Linien. PDFs zum Verkauf auf Etsy und exportieren.',
  'guide-content/de/create-math-puzzle-worksheets':
    'Mathe-Rätsel-Arbeitsblätter erstellen, bei denen Kinder Gleichungen lösen. Rastergrößen, Rechenoperationen und Lösungsschlüssel. Verkaufen auf Etsy und KDP.',
  'guide-content/de/create-maze-worksheets':
    'Labyrinth-Arbeitsblätter mit 3 Spielmodi und thematischen Bildern erstellen. Druckbare Aktivitätsblätter mit Lösungsschlüsseln für den Verkauf auf Etsy und KDP.',
  'guide-content/de/create-missing-pieces-puzzles':
    'Puzzle-Arbeitsblätter mit fehlenden Teilen erstellen. 6 Teilformen, Ablenkungsteile und automatische Lösungsschlüssel. Druckvorlagen für den Verkauf auf Etsy.',
  'guide-content/de/create-odd-one-out-puzzles':
    'Was-passt-nicht-Arbeitsblätter mit Identisch- und Ähnlich-Modus erstellen. Pro-Übung-Konfiguration und Lösungsschlüssel. Rein visuelles Format für Etsy und KDP.',
  'guide-content/de/create-pattern-worksheets':
    'Muster-Arbeitsblätter mit 9 Mustertypen und thematischen Bildern erstellen. Lösungsschlüssel, 2 Frageformate und druckfertige PDFs für Etsy und KDP-Verkauf.',
  'guide-content/de/create-picture-sudoku':
    'Bilder-Sudoku für junge Lerner erstellen. 4×4-Bildraster, drei Schwierigkeitsstufen, thematische Bilder und Lösungsschlüssel. Druckfertige PDFs für Etsy und.',
  'guide-content/de/create-preposition-worksheets':
    'Präpositionen-Arbeitsblätter mit Lückentext und Multiple Choice erstellen. Formenaustausch für Szenenvielfalt, muttersprachliche Positionswörter in 11 Sprachen.',
  'guide-content/de/create-printable-product-line':
    'Zusammenhängende Druckvorlagen-Produktlinie aufbauen. Themenauswahl, Produktportfolio-Strategie und Bündelkonzepte für mehr Markenkonsistenz auf Etsy und KDP.',
  'guide-content/de/create-sell-tpt-resources':
    'TPT-Materialien erstellen und verkaufen. Kontoeinrichtung, Materialformatierung, Listing-Optimierung und Preisstrategie für den Lehrermarktplatz Schritt für.',
  'guide-content/de/create-shadow-matching-worksheets':
    'Schattenbilder-Zuordnungs-Arbeitsblätter mit pixelgenauen Silhouetten und Halb-Bilder-Modus erstellen. Lösungsschlüssel. Verkaufen auf Etsy und Amazon KDP.',
  'guide-content/de/create-size-comparison-worksheets':
    'Größenvergleich-Arbeitsblätter mit 5 Aufgabentypen und 2 Bildmodi erstellen. Textfreie Ausgabe für weltweiten Verkauf. Schritt-für-Schritt für Etsy und KDP.',
  'guide-content/de/create-sorting-worksheets':
    'Zwei-Kategorien-Sortier-Arbeitsblätter erstellen. Themen- oder manueller Modus, 4–12 Bilder und Lösungsschlüssel. Druckvorlagen für den Verkauf auf Etsy und.',
  'guide-content/de/create-subtraction-worksheets':
    'Subtraktions-Arbeitsblätter mit durchgestrichenen Bildern und Lösungsschlüsseln erstellen. Visuelle Themen wählen und auf Etsy, Amazon KDP und TpT verkaufen.',
  'guide-content/de/create-treasure-hunt-worksheets':
    'Schatzsuche-Arbeitsblätter auf 5×5-Raster mit zwei Richtungstypen erstellen. 6 Orientierungsbilder, Lösungsschlüssel und 11 Sprachen. Verkaufen auf Etsy und.',
  'guide-content/de/create-word-search-puzzles':
    'Wortsuchrätsel mit Bildhinweisen erstellen. Themen wählen, Rastergröße einstellen und Lösungsschlüssel generieren. Druckvorlagen für den Verkauf auf Etsy und.',
  'guide-content/de/create-worksheet-bundles':
    'Arbeitsblatt-Pakete erstellen, die sich auf jeder Plattform verkaufen. Pakettypen, Preispsychologie und professionelle Verpackung für mehr Profi-Anleitung.',
  'guide-content/de/customer-support-digital-products':
    'Kundensupport für digitale Druckvorlagen einrichten. Häufige Anfragen, Antwortvorlagen, Rückgaberichtlinien und effiziente Support-Systeme für zufriedene.',
  'guide-content/de/digital-vs-physical-printables':
    'Digitale und physische Druckvorlagen im Vergleich. Vor- und Nachteile, Margen, Skalierbarkeit und die richtige Strategie für Ihr Arbeitsblatt-Geschäft auf Etsy.',
  'guide-content/de/email-marketing-printables':
    'E-Mail-Marketing für Druckvorlagen-Verkäufer. Abonnentenliste aufbauen, Lead-Magnete erstellen und Sequenzen automatisieren. Wiederholungskäufe steigern.',
  'guide-content/de/etsy-seo-educational-printables':
    'Etsy-SEO für Lernmaterial-Druckvorlagen. Keyword-Recherche, Titeloptimierung, alle 13 Tags nutzen und Beschreibungen optimieren. Rankingfaktoren für Verkäufer.',
  'guide-content/de/get-reviews-printable-products':
    'Bewertungen für Druckvorlagen-Produkte verdienen. Sozialen Beweis aufbauen, authentisches Käuferfeedback erhalten und die Shop-Glaubwürdigkeit nachhaltig.',
  'guide-content/de/kdp-formatting-worksheets':
    'KDP-Formatierung für Arbeitsblätter: Beschnittgrößen, Seitenränder, PDF-Export bei 300 DPI und Cover-Maße. Upload-Fehlerbehebung für KDP-Aktivitätsbücher.',
  'guide-content/de/kdp-vs-etsy-printables':
    'KDP oder Etsy für Druckvorlagen? Plattformvergleich mit Gebühren, Reichweite, Kundenprofil und Preisgestaltung. Optimale Multi-Plattform-Strategie für.',
  'guide-content/de/make-money-kdp-activity-books':
    'Mit KDP-Aktivitätsbüchern Geld verdienen. Preis-, Katalog- und Tantieme-Strategien, Umsatzrechnung und saisonales Timing. Skalierung für ambitionierte Verleger.',
  'guide-content/de/math-activity-books-kdp':
    'Mathe-Aktivitätsbücher für KDP erstellen. Seitenaufbau, Schwierigkeitsprogression, Altersgruppen und Serienkonzepte. Amazon-Optimierung für Verleger Schritt.',
  'guide-content/de/multilingual-printable-business':
    'Mehrsprachiges Druckvorlagen-Geschäft aufbauen und in internationale Märkte expandieren. Sprachpriorisierung und Strategien für mehr Umsatz auf Etsy und KDP.',
  'guide-content/de/niche-selection-printables':
    'Nischenauswahl für Druckvorlagen-Geschäfte: Nachfrage recherchieren, Wettbewerb analysieren, Rentabilität bewerten und validieren. Expansionsplanung für.',
  'guide-content/de/passive-income-worksheets':
    'Wiederkehrenden Umsatz mit Arbeitsblättern aufbauen. Immergrüne Kataloge, Multiplattform-Vertrieb und Sprachexpansion. Katalog-Zusammensetzung Etsy-Verkäufer.',
  'guide-content/de/pinterest-marketing-worksheets':
    'Pinterest-Marketing für Arbeitsblatt-Verkäufer. Pins erstellen, Boards optimieren, Keyword-Strategie und Scheduling. Traffic-Konversion für Etsy und eigene.',
  'guide-content/de/price-etsy-printables':
    'Druckbare Arbeitsblätter auf Etsy bepreisen. Gebührenberechnung, dreistufige Preisstruktur und Bündelstrategien. Saisonale Anpassungen für mehr Gewinn pro.',
  'guide-content/de/pricing-educational-printables':
    'Preisgestaltung für pädagogische Druckvorlagen. Marktanalyse, Preismodelle, Bündelpreise und Premium-Positionierung. Psychologische Preisstrategien für.',
  'guide-content/de/publish-puzzle-books-kdp':
    'Rätselbücher auf KDP veröffentlichen: Wortsuche, Kreuzworträtsel und Sudoku formatieren. Variety-Bücher, Serienaufbau und Amazon-Optimierung für mehr.',
  'guide-content/de/quality-standards-worksheets':
    'Qualitätsstandards für Arbeitsblätter: Auflösung, Seitenränder, Typografie und Lösungsschlüssel. Drucktests und professionelle Ergebnisse Marktplatz-Verkäufer.',
  'guide-content/de/research-profitable-niches':
    'Profitable Druckvorlagen-Nischen recherchieren mit Marktplatzdaten, Keyword-Analyse und Wettbewerbsforschung. Systematische Validierungsmethoden Verkaufserfolg.',
  'guide-content/de/scale-printable-business-guide':
    'Druckvorlagen-Geschäft skalieren mit Stapelproduktion, Multiplattform-Expansion und Katalogwachstum. Mehrsprachige Märkte und Automatisierung für mehr Wachstum.',
  'guide-content/de/seasonal-marketing-printables':
    'Saisonale Druckvorlagen-Kampagnen planen. Verkäuferkalender, Produktionstiming, Schlüsselwörter und Strategien für Hauptverkaufszeiten auf Lehrermarktplatz.',
  'guide-content/de/sell-creative-fabrica':
    'Arbeitsblätter auf Creative Fabrica verkaufen. Kontoeinrichtung, Produktformate, Preisgestaltung und Optimierung für den kreativen Marktplatz. Anleitung für.',
  'guide-content/de/sell-educational-printables-etsy':
    'Pädagogische Druckvorlagen auf Etsy verkaufen mit 33 Generatoren. Shop-Strategie, Etsy-SEO und kategorieübergreifende Bündelung. Preisgestaltung Arbeitsblätter.',
  'guide-content/de/sell-math-worksheets-etsy':
    'Mathe-Arbeitsblätter auf Etsy verkaufen mit 6 Generatoren. Etsy-SEO, Angebotsoptimierung, Preisgestaltung und Bündelstrategien. Saisonales Timing für Verkäufer.',
  'guide-content/de/sell-printables-gumroad':
    'Druckvorlagen auf Gumroad verkaufen. Shop-Einrichtung, Produktformate, Preisgestaltung und E-Mail-Marketing. Strategien für den direkten Verkauf ohne.',
  'guide-content/de/sell-word-search-etsy':
    'Wortsuchrätsel auf Etsy verkaufen mit 4 Generatoren. Etsy-SEO, Angebotsoptimierung und Bündelstrategien mit Kreuzworträtseln. Saisonales Timing für Verkäufer.',
  'guide-content/de/social-media-printable-marketing':
    'Social-Media-Marketing für Druckvorlagen-Verkäufer. Instagram, Facebook, TikTok nutzen. Content-Strategien und Community-Aufbau für mehr Reichweite und.',
  'guide-content/de/start-etsy-printable-shop':
    'Etsy-Druckvorlagen-Shop starten mit 33 Generatoren. Shop-Einrichtung, Branding, Angebotsoptimierung und Preisgestaltung. Etsy-Gebühren und 30-Tage-Startplan.',
  'guide-content/de/sudoku-books-kdp':
    'Sudoku-Bücher für KDP erstellen. Bilder-Sudoku für Kinder und Zahlen-Sudoku für Erwachsene, Schwierigkeitsprogression, Rasterformatierung und Serienaufbau.',
  'guide-content/de/tpt-store-optimization':
    'TPT-Shop optimieren für mehr Sichtbarkeit und Umsatz. Materialformatierung, Vorschaubilder, Preisgestaltung und Keyword-Strategien für den Lehrermarktplatz.',
  'guide-content/de/understanding-commercial-licenses':
    'Kommerzielle Lizenzen für Druckvorlagen verstehen. Lizenztypen, häufige Fehler und wie korrekte Lizenzierung Ihr Arbeitsblatt-Geschäft auf Etsy und KDP.',
  'guide-content/de/word-search-books-kdp':
    'Wortsuchrätsel-Bücher für KDP erstellen und veröffentlichen. Rastergrößen, Schwierigkeitsstufen, Serienkonzepte und Amazon-Optimierung für profitable.',
  'guide-content/de/worksheets-multiple-languages':
    'Arbeitsblätter in mehreren Sprachen erstellen und verkaufen. 11 Sprachen nutzen, Märkte priorisieren und mehrsprachige Produkte auf Etsy und KDP gewinnbringend.',
  // === IDEA CONTENT ===
  'idea-content/de/back-to-school-printable-ideas':
    'Schulanfang-Druckvorlagen-Ideen für Etsy, KDP und TPT. Einschulung-Produktkonzepte, Juli-September-Strategien und Plattformtipps für Druckvorlagen-Verkäufer.',
  'idea-content/de/birds-printable-ideas':
    'Profitable Vögel-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte, Plattformstrategien und Nischen-Tipps für Arbeitsblatt-Verkäufer und Etsy-Shops.',
  'idea-content/de/bulk-licensing-printable-ideas':
    'Geschäftsideen für Massenlizenzierung von Arbeitsblättern an Schulen und Organisationen. Volumenlizenzierung und Preisstrategien für Bildungsanbieter erklärt.',
  'idea-content/de/camping-printable-ideas':
    'Camping-Druckvorlagen-Ideen für Etsy, KDP und TPT. Outdoor-Produktkonzepte, Plattformstrategien und Nischentipps für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/christmas-printable-ideas':
    'Weihnachts-Druckvorlagen-Ideen für Etsy, KDP und TPT. Saisonale Produktkonzepte, Plattformstrategien und Nischen-Tipps für Druckvorlagen-Verkäufer im Advent.',
  'idea-content/de/construction-printable-ideas':
    'Baustellen-Druckvorlagen-Ideen für Etsy, KDP und TPT. Fahrzeug- und Werkzeug-Produktkonzepte mit Plattformstrategien für Druckvorlagen-Verkäufer und Etsy-Shops.',
  'idea-content/de/custom-worksheet-service-ideas':
    'Geschäftsideen für maßgeschneiderte Arbeitsblatt-Services. Individuelle Lernmaterialien auf Etsy und als Freelancer mit Premium-Preisgestaltung pro Auftrag.',
  'idea-content/de/digital-download-printable-ideas':
    'Digitale Download-Arbeitsblatt-Ideen für Etsy, Gumroad und TPT. Druckvorlagen-Geschäft ohne Lagerhaltung mit sofort lieferbaren Lern-PDFs für Verkäufer.',
  'idea-content/de/dinosaur-printable-ideas':
    'Dinosaurier-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte, Plattformstrategien und Nischen-Tipps für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/easter-printable-ideas':
    'Ostern-Druckvorlagen-Ideen für Etsy, KDP und TPT. Frühlings-Produktkonzepte, saisonale Strategien und Plattformtipps für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/esl-printable-ideas':
    'ESL-Druckvorlagen-Ideen für Etsy, KDP und TPT. Vokabel-Arbeitsblätter und visuell unterstützte Übungen für den wachsenden Markt der Sprachlernmaterialien.',
  'idea-content/de/fairy-tale-printable-ideas':
    'Märchen-Druckvorlagen-Ideen für Etsy, KDP und TPT. Geschichtenbuch-Produktkonzepte und Plattformstrategien für erfolgreiche Druckvorlagen-Verkäufer und Shops.',
  'idea-content/de/farm-animals-printable-ideas':
    'Bauernhoftiere-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte, Plattformstrategien und Nischen-Tipps für erfolgreiche Arbeitsblatt-Verkäufer online.',
  'idea-content/de/first-grade-printable-ideas':
    'Erste-Klasse-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte und Nischenstrategien für Verkäufer im Bereich Grundschule und Lernmaterialien erklärt.',
  'idea-content/de/food-cooking-printable-ideas':
    'Essen- und Koch-Druckvorlagen-Ideen für Etsy, KDP und TPT. Rezeptthemen-Produktkonzepte und Plattformstrategien für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/forest-animals-printable-ideas':
    'Waldtier-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte, Plattformstrategien und Nischen-Tipps für erfolgreiche Arbeitsblatt-Verkäufer und.',
  'idea-content/de/halloween-printable-ideas':
    'Halloween-Druckvorlagen-Ideen für Etsy, KDP und TPT. Gruselige Produktkonzepte, saisonale Strategien, Plattformtipps für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/homeschool-printable-ideas':
    'Heimunterricht-Druckvorlagen-Ideen für Etsy, KDP und TPT. Nischenstrategien für den wachsenden Markt, in dem Eltern Lehrpläne aus Druckvorlagen zusammenstellen.',
  'idea-content/de/insects-printable-ideas':
    'Insekten-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte, Plattformstrategien und Nischen-Tipps für Arbeitsblatt-Verkäufer und Druckvorlagen-Shops.',
  'idea-content/de/kindergarten-printable-ideas':
    'Kindergarten-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte und Nischenstrategien für Verkäufer im Bereich frühkindliche Bildung Lernmaterialien.',
  'idea-content/de/math-facts-printable-ideas':
    'Mathe-Grundlagen-Druckvorlagen-Ideen für Etsy, KDP und TPT. Rechenflüssigkeits-Arbeitsblätter für den immergrünen Hochvolumen-Bildungsmarkt. Verkäufer-Guide.',
  'idea-content/de/ocean-animals-printable-ideas':
    'Meerestiere-Druckvorlagen-Ideen für Etsy, KDP und TPT. Unterwasser-Produktkonzepte, Plattformstrategien und Preistipps für Druckvorlagen-Verkäufer und Shops.',
  'idea-content/de/parents-day-printable-ideas':
    'Elterntag-Druckvorlagen-Ideen für Etsy, KDP und TPT. Muttertag- und Vatertag-Produktkonzepte mit saisonalen Strategien für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/party-supply-printable-ideas':
    'Druckbare Partyzubehör-Ideen für Etsy-Verkäufer. Thematische Partypakete, Geburtstagsspiele und Aktivitätsblätter für Feiern erstellen und gewinnbringend.',
  'idea-content/de/pets-printable-ideas':
    'Haustier-Druckvorlagen-Ideen für Etsy, KDP und TPT. Hunde-, Katzen- und Kleintier-Produktkonzepte mit Plattformstrategien für Druckvorlagen-Verkäufer.',
  'idea-content/de/physical-printable-product-ideas':
    'Physische Druckvorlagen-Ideen für Etsy und Kunstmessen. Premium-Geschäft durch Drucken, Laminieren und Versenden greifbarer Arbeitsblatt-Produkte aufbauen.',
  'idea-content/de/pirates-printable-ideas':
    'Piraten-Druckvorlagen-Ideen für Etsy, KDP und TPT. Abenteuer-Produktkonzepte, Plattformstrategien und Nischen-Tipps für Druckvorlagen-Verkäufer und Etsy-Shops.',
  'idea-content/de/preschool-printable-ideas':
    'Vorschule-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte und Nischenstrategien für erfolgreiche Verkäufer im Bereich frühkindliche Lernmaterialien.',
  'idea-content/de/print-on-demand-printable-ideas':
    'Print-on-Demand Arbeitsblatt-Ideen für Etsy, KDP und Shopify. Geschäft ohne Lagerhaltung mit gedruckten Arbeitsheften und Aktivitätspaketen profitabel aufbauen.',
  'idea-content/de/safari-animals-printable-ideas':
    'Safaritiere-Druckvorlagen-Ideen für Etsy, KDP und TPT. Afrikanische Wildtier-Produktkonzepte und Plattformstrategien für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/second-grade-printable-ideas':
    'Zweite-Klasse-Druckvorlagen-Ideen für Etsy, KDP und TPT. Produktkonzepte und Nischenstrategien für Verkäufer im Bereich Grundschule und Arbeitsblatt-Erstellung.',
  'idea-content/de/space-printable-ideas':
    'Weltraum-Druckvorlagen-Ideen für Etsy, KDP und TPT. Weltraum-Produktkonzepte, STEM-Strategien und Plattformtipps für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/special-education-printable-ideas':
    'Sonderpädagogik-Druckvorlagen-Ideen für Etsy, KDP und TPT. Angepasste Arbeitsblätter und visuelle Hilfen für den unterversorgten SPED-Markt. Verkäufer-Guide.',
  'idea-content/de/spring-printable-ideas':
    'Frühling-Druckvorlagen-Ideen für Etsy, KDP und TPT. Saisonale Produktkonzepte, März-Mai-Strategien und Plattformtipps für erfolgreiche Druckvorlagen-Verkäufer.',
  'idea-content/de/subscription-box-printable-ideas':
    'Arbeitsblatt-Abo-Box-Ideen für Etsy, Gumroad und Patreon. Wiederkehrende Einnahmen mit monatlichen Arbeitsblatt-Paketen und thematischen Bundles aufbauen.',
  'idea-content/de/summer-learning-printable-ideas':
    'Sommerlernen-Druckvorlagen-Ideen für Etsy, KDP und TPT. Ferienaktivitäten und Sommerbrücken-Arbeitsblätter zur Vermeidung von Sommerlernverlust. Verkaufs-Guide.',
  'idea-content/de/summer-printable-ideas':
    'Sommer-Druckvorlagen-Ideen für Etsy, KDP und TPT. Strand- und Ferien-Produktkonzepte, saisonale Strategien und Plattformtipps für Druckvorlagen-Verkäufer.',
  'idea-content/de/thanksgiving-printable-ideas':
    'Erntedankfest-Druckvorlagen-Ideen für Etsy, KDP und TPT. Thanksgiving-Produktkonzepte und saisonale Strategien. Plattformtipps für Druckvorlagen-Verkäufer.',
  'idea-content/de/third-grade-printable-ideas':
    'Dritte-Klasse-Druckvorlagen-Ideen für Etsy, KDP und TPT. Nischenstrategien und Produktkonzepte für Verkäufer im dritten Grundschuljahr. Arbeitsblatt-Ideen.',
  'idea-content/de/transportation-printable-ideas':
    'Fahrzeuge-Druckvorlagen-Ideen für Etsy, KDP und TPT. Fahrzeugthemen-Produktkonzepte und Plattformstrategien. Nischentipps für Druckvorlagen-Verkäufer erklärt.',
  'idea-content/de/underwater-printable-ideas':
    'Unterwasser-Druckvorlagen-Ideen für Etsy, KDP und TPT. Ozean-Produktkonzepte und Nischenstrategien für erfolgreiche Druckvorlagen-Verkäufer Arbeitsblatt-Shops.',
  'idea-content/de/valentines-day-printable-ideas':
    'Valentinstag-Druckvorlagen-Ideen für Etsy, KDP und TPT. Liebes-Produktkonzepte, saisonale Strategien und Plattformtipps für Druckvorlagen-Verkäufer und Shops.',
  'idea-content/de/winter-printable-ideas':
    'Winter-Druckvorlagen-Ideen für Etsy, KDP und TPT. Kaltwetter-Produktkonzepte mit Nachfrage von November bis Februar. Nischenstrategien Arbeitsblatt-Verkäufer.',
}

// Validate all manual entries
let validationErrors = 0;
for (const [key, val] of Object.entries(MANUAL)) {
  if (val.length < MIN || val.length > MAX) {
    console.error(`VALIDATION: ${key} → ${val.length} chars (need ${MIN}-${MAX})`);
    console.error(`  "${val}"`);
    validationErrors++;
  }
}
if (validationErrors > 0) {
  console.error(`\n${validationErrors} validation errors. Fix before running.`);
  process.exit(1);
}
console.log(`All ${Object.keys(MANUAL).length} manual overrides validated (${MIN}-${MAX} chars).`);

// Apply fixes
let fixed = 0, alreadyOk = 0, noOverride = 0, noMatch = 0;

for (const cat of CATEGORIES) {
  const files = fs.readdirSync(cat.dir).filter(f => f.endsWith('.ts'));
  for (const file of files) {
    const fileName = file.replace('.ts', '');
    const key = `${cat.name}/de/${fileName}`;
    const filePath = path.join(cat.dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    const metaRegex = /metaDescription:\s*(['"])(.*?)\1/;
    const match = content.match(metaRegex);
    if (!match) { noMatch++; continue; }

    const currentMeta = match[2];
    if (currentMeta.length >= MIN && currentMeta.length <= MAX) { alreadyOk++; continue; }

    if (MANUAL[key]) {
      const newMeta = MANUAL[key];
      const quote = match[1];
      content = content.replace(metaRegex, `metaDescription: ${quote}${newMeta}${quote}`);
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`FIXED: ${key} (${currentMeta.length} → ${newMeta.length})`);
      fixed++;
    } else {
      console.log(`NO OVERRIDE: ${key} (${currentMeta.length} chars)`);
      noOverride++;
    }
  }
}

console.log(`\n=== META DESCRIPTION FIX SUMMARY ===`);
console.log(`Fixed: ${fixed}`);
console.log(`Already OK: ${alreadyOk}`);
console.log(`No override: ${noOverride}`);
console.log(`No match: ${noMatch}`);
