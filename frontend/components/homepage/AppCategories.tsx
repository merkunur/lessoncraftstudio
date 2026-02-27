'use client';

import { useState } from 'react';
import Link from 'next/link';
import { getAppConfigBySlug, getSlugForLocale, type SupportedLocale } from '@/config/product-page-slugs';
import { useReveal } from '@/hooks/use-reveal';

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
  nameFi: string;
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
  descriptionFi: string;
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
  nameFi: string;
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
    badge: '33 Professional Printable Generators',
    title: 'Browse by Category',
    subtitle: 'From math worksheets to creative activities, find the perfect printable generator for your business.',
    learnMore: 'Try free',
    viewAllGenerators: 'View All 33 Generators',
  },
  de: {
    badge: '33 professionelle Druckvorlagen-Generatoren',
    title: 'Nach Kategorie durchsuchen',
    subtitle: 'Von Mathe-Arbeitsblättern bis zu kreativen Aktivitäten – finden Sie den perfekten Generator für Ihr Business.',
    learnMore: 'Gratis testen',
    viewAllGenerators: 'Alle 33 Generatoren entdecken',
  },
  fr: {
    badge: '33 générateurs d\'imprimables professionnels',
    title: 'Parcourir par catégorie',
    subtitle: 'Des exercices de maths aux activités créatives, trouvez le générateur idéal pour votre business.',
    learnMore: 'Essai gratuit',
    viewAllGenerators: 'Explorer les 33 générateurs',
  },
  es: {
    badge: '33 generadores de imprimibles profesionales',
    title: 'Explorar por categoría',
    subtitle: 'Desde ejercicios de matemáticas hasta actividades creativas, encuentra el generador perfecto para tu negocio.',
    learnMore: 'Probar gratis',
    viewAllGenerators: 'Explorar los 33 generadores',
  },
  it: {
    badge: '33 generatori di stampabili professionali',
    title: 'Esplora per categoria',
    subtitle: 'Dagli esercizi di matematica alle attività creative, trova il generatore perfetto per il tuo business.',
    learnMore: 'Prova gratis',
    viewAllGenerators: 'Esplora tutti i 33 generatori',
  },
  pt: {
    badge: '33 geradores de imprimíveis profissionais',
    title: 'Explore por categoria',
    subtitle: 'De exercícios de matemática a atividades criativas, encontre o gerador perfeito para o seu negócio.',
    learnMore: 'Teste grátis',
    viewAllGenerators: 'Ver todos os 33 geradores',
  },
  nl: {
    badge: '33 professionele printbare generatoren',
    title: 'Ontdek per categorie',
    subtitle: 'Van rekenoefeningen tot creatieve activiteiten, vind de perfecte generator voor jouw business.',
    learnMore: 'Gratis proberen',
    viewAllGenerators: 'Bekijk alle 33 generatoren',
  },
  da: {
    badge: '33 professionelle printbare generatorer',
    title: 'Udforsk efter kategori',
    subtitle: 'Fra regneopgaver til kreative aktiviteter – find den perfekte generator til din virksomhed.',
    learnMore: 'Prøv gratis',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  sv: {
    badge: '33 professionella utskriftsgeneratorer',
    title: 'Utforska efter kategori',
    subtitle: 'Från matematikövningar till kreativa aktiviteter – hitta den perfekta generatorn för ditt företag.',
    learnMore: 'Prova gratis',
    viewAllGenerators: 'Se alla 33 generatorer',
  },
  no: {
    badge: '33 profesjonelle utskriftsgeneratorer',
    title: 'Utforsk etter kategori',
    subtitle: 'Fra matteoppgaver til kreative aktiviteter – finn den perfekte generatoren for din virksomhet.',
    learnMore: 'Prøv gratis',
    viewAllGenerators: 'Se alle 33 generatorer',
  },
  fi: {
    badge: '33 ammattimaista tulostusgeneraattoria',
    title: 'Selaa kategorioittain',
    subtitle: 'Matematiikan tehtävistä luoviin aktiviteetteihin – löydä täydellinen generaattori yrityksellesi.',
    learnMore: 'Kokeile ilmaiseksi',
    viewAllGenerators: 'Tutustu kaikkiin 33 generaattoriin',
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
    nameFi: 'Matematiikka',
    icon: '🔢',
    gradient: 'from-cyan-500/10 to-blue-500/10',
    borderColor: 'border-cyan-500/20',
    apps: [
      { nameEn: 'Addition', nameDe: 'Addition', nameFr: 'Addition', nameEs: 'Sumas', nameIt: 'Addizioni', namePt: 'Adição', nameNl: 'Optellen', nameDa: 'Addition', nameSv: 'Addition', nameNo: 'Addisjon', nameFi: 'Yhteenlasku', slug: 'addition-worksheets', icon: '➕', descriptionEn: 'Visual counting & sums', descriptionDe: 'Anschauliches Zählen & Rechnen', descriptionFr: 'Comptage visuel et additions', descriptionEs: 'Conteo visual y sumas', descriptionIt: 'Conteggio visivo e somme', descriptionPt: 'Contagem visual e somas', descriptionNl: 'Visueel tellen en optellen', descriptionDa: 'Visuel tælling og plus', descriptionSv: 'Räkna och addera visuellt', descriptionNo: 'Visuell telling og pluss', descriptionFi: 'Visuaalinen laskeminen' },
      { nameEn: 'Subtraction', nameDe: 'Subtraktion', nameFr: 'Soustraction', nameEs: 'Restas', nameIt: 'Sottrazioni', namePt: 'Subtração', nameNl: 'Aftrekken', nameDa: 'Subtraktion', nameSv: 'Subtraktion', nameNo: 'Subtraksjon', nameFi: 'Vähennyslasku', slug: 'subtraction-worksheets', icon: '➖', descriptionEn: 'Visual subtraction practice', descriptionDe: 'Anschauliches Abziehen üben', descriptionFr: 'Exercices de soustraction visuels', descriptionEs: 'Práctica visual de restas', descriptionIt: 'Esercizi visivi di sottrazione', descriptionPt: 'Prática visual de subtração', descriptionNl: 'Visueel aftrekken oefenen', descriptionDa: 'Visuel subtraktionsøvelse', descriptionSv: 'Visuell subtraktionsövning', descriptionNo: 'Visuell subtraksjonsøving', descriptionFi: 'Visuaalinen vähennyslaskuharjoitus' },
      { nameEn: 'Code Addition', nameDe: 'Rechencode', nameFr: 'Addition codée', nameEs: 'Sumas con código', nameIt: 'Addizioni in codice', namePt: 'Adição com código', nameNl: 'Optellen met code', nameDa: 'Kodeaddition', nameSv: 'Kodaddition', nameNo: 'Kodeaddisjon', nameFi: 'Koodiyhteenlasku', slug: 'code-addition-worksheets', icon: '🔐', descriptionEn: 'Crack the code math', descriptionDe: 'Knack den Zahlencode', descriptionFr: 'Calculs à décoder', descriptionEs: 'Descifra el código matemático', descriptionIt: 'Decifra il codice matematico', descriptionPt: 'Desvende o código matemático', descriptionNl: 'Kraak de rekencode', descriptionDa: 'Knæk koden med tal', descriptionSv: 'Knäck koden med matte', descriptionNo: 'Knekk mattekoden', descriptionFi: 'Ratkaise matemaattinen koodi' },
      { nameEn: 'Math Worksheet', nameDe: 'Mathe-Arbeitsblatt', nameFr: 'Fiche de maths', nameEs: 'Ficha de matemáticas', nameIt: 'Scheda di matematica', namePt: 'Atividade de matemática', nameNl: 'Rekenwerkblad', nameDa: 'Regneopgaver', nameSv: 'Matteövningsblad', nameNo: 'Matteoppgaver', nameFi: 'Matematiikkatehtävät', slug: 'math-worksheets', icon: '📐', descriptionEn: 'Custom math problems', descriptionDe: 'Individuelle Rechenaufgaben', descriptionFr: 'Exercices personnalisés', descriptionEs: 'Ejercicios personalizados', descriptionIt: 'Esercizi personalizzati', descriptionPt: 'Exercícios personalizados', descriptionNl: 'Zelf sommen maken', descriptionDa: 'Tilpassede regneopgaver', descriptionSv: 'Skapa egna räkneuppgifter', descriptionNo: 'Lag egne regneark', descriptionFi: 'Omat laskutehtävät' },
      { nameEn: 'Math Puzzle', nameDe: 'Mathe-Puzzle', nameFr: 'Puzzle mathématique', nameEs: 'Rompecabezas matemático', nameIt: 'Puzzle matematico', namePt: 'Quebra-cabeça matemático', nameNl: 'Rekenpuzzel', nameDa: 'Mattepuslespil', nameSv: 'Mattepussel', nameNo: 'Mattepuslespill', nameFi: 'Matemaattinen palapeli', slug: 'math-puzzle-worksheets', icon: '🧩', descriptionEn: 'Picture puzzle math', descriptionDe: 'Bilderrätsel mit Rechnen', descriptionFr: 'Puzzles mathématiques illustrés', descriptionEs: 'Matemáticas con rompecabezas', descriptionIt: 'Puzzle matematici illustrati', descriptionPt: 'Quebra-cabeças matemáticos', descriptionNl: 'Rekenen met puzzels', descriptionDa: 'Billedpuslespil med matematik', descriptionSv: 'Bildpussel med matte', descriptionNo: 'Bildepuslespill med matte', descriptionFi: 'Kuvapalapeli matematiikalla' },
      { nameEn: 'Chart Count', nameDe: 'Diagramm-Zählen', nameFr: 'Comptage graphique', nameEs: 'Conteo con gráficas', nameIt: 'Conta con i grafici', namePt: 'Contagem com gráficos', nameNl: 'Tellen met diagrammen', nameDa: 'Tæl med diagrammer', nameSv: 'Räkna med diagram', nameNo: 'Diagramtelling', nameFi: 'Diagrammilaskenta', slug: 'chart-count-worksheets', icon: '📊', descriptionEn: 'Counting with charts', descriptionDe: 'Zählen mit Diagrammen', descriptionFr: 'Comptage avec diagrammes', descriptionEs: 'Contar con diagramas', descriptionIt: 'Contare con i grafici', descriptionPt: 'Contar usando gráficos', descriptionNl: 'Tellen met grafieken', descriptionDa: 'Tælling med diagrammer', descriptionSv: 'Räkna med hjälp av diagram', descriptionNo: 'Tell med diagrammer', descriptionFi: 'Laske diagrammeilla' },
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
    nameFi: 'Kieli',
    icon: '📝',
    gradient: 'from-purple-500/10 to-pink-500/10',
    borderColor: 'border-purple-500/20',
    apps: [
      { nameEn: 'Word Search', nameDe: 'Wortsuche', nameFr: 'Mots mêlés', nameEs: 'Sopa de letras', nameIt: 'Cerca parole', namePt: 'Caça-palavras', nameNl: 'Woordzoeker', nameDa: 'Find ord', nameSv: 'Ordsök', nameNo: 'Finn ord', nameFi: 'Sananetsintä', slug: 'word-search-worksheets', icon: '🔍', descriptionEn: 'Hidden word puzzles', descriptionDe: 'Versteckte Wörter finden', descriptionFr: 'Grilles de mots cachés', descriptionEs: 'Encuentra palabras escondidas', descriptionIt: 'Trova le parole nascoste', descriptionPt: 'Encontre palavras escondidas', descriptionNl: 'Zoek verborgen woorden', descriptionDa: 'Find skjulte ord', descriptionSv: 'Hitta gömda ord', descriptionNo: 'Skjulte ordpuslespill', descriptionFi: 'Etsi piilotetut sanat' },
      { nameEn: 'Crossword', nameDe: 'Kreuzworträtsel', nameFr: 'Mots croisés', nameEs: 'Crucigrama', nameIt: 'Cruciverba', namePt: 'Palavras cruzadas', nameNl: 'Kruiswoordpuzzel', nameDa: 'Krydsord', nameSv: 'Korsord', nameNo: 'Kryssord', nameFi: 'Ristikko', slug: 'crossword-worksheets', icon: '⬜', descriptionEn: 'Classic word puzzles', descriptionDe: 'Klassische Worträtsel', descriptionFr: 'Grilles de mots croisés', descriptionEs: 'El clásico juego de palabras', descriptionIt: 'Il classico gioco di parole', descriptionPt: 'O clássico jogo de palavras', descriptionNl: 'Klassiek woordspel', descriptionDa: 'Klassisk ordpuslespil', descriptionSv: 'Det klassiska ordpusslet', descriptionNo: 'Det klassiske ordpuslespillet', descriptionFi: 'Klassinen sanapeli' },
      { nameEn: 'Cryptogram', nameDe: 'Kryptogramm', nameFr: 'Cryptogramme', nameEs: 'Criptograma', nameIt: 'Crittogramma', namePt: 'Criptograma', nameNl: 'Cryptogram', nameDa: 'Kryptogram', nameSv: 'Kryptogram', nameNo: 'Kryptogram', nameFi: 'Kryptogrammi', slug: 'cryptogram-worksheets', icon: '🔮', descriptionEn: 'Secret message codes', descriptionDe: 'Geheime Botschaften', descriptionFr: 'Messages secrets codés', descriptionEs: 'Mensajes secretos codificados', descriptionIt: 'Messaggi segreti in codice', descriptionPt: 'Mensagens secretas em código', descriptionNl: 'Geheime codeberichten', descriptionDa: 'Hemmelige beskeder i kode', descriptionSv: 'Hemliga kodmeddelanden', descriptionNo: 'Hemmelige kodemeldinger', descriptionFi: 'Salaiset koodiviestit' },
      { nameEn: 'Word Scramble', nameDe: 'Buchstabensalat', nameFr: 'Lettres mélangées', nameEs: 'Letras revueltas', nameIt: 'Anagrammi', namePt: 'Embaralha letras', nameNl: 'Letterpuzzel', nameDa: 'Bogstavsalat', nameSv: 'Bokstavslek', nameNo: 'Bokstavmiks', nameFi: 'Kirjainsekoitus', slug: 'word-scramble-worksheets', icon: '🔀', descriptionEn: 'Unscramble letters', descriptionDe: 'Buchstaben entwirren', descriptionFr: 'Remettre les lettres en ordre', descriptionEs: 'Ordena las letras', descriptionIt: 'Riordina le lettere', descriptionPt: 'Desembaralhe as letras', descriptionNl: 'Ontwar de letters', descriptionDa: 'Sæt bogstaverne i orden', descriptionSv: 'Ordna om bokstäverna', descriptionNo: 'Sett bokstavene i rekkefølge', descriptionFi: 'Järjestä kirjaimet' },
      { nameEn: 'Word Guess', nameDe: 'Wort erraten', nameFr: 'Devine le mot', nameEs: 'Adivina la palabra', nameIt: 'Indovina la parola', namePt: 'Adivinhe a palavra', nameNl: 'Raad het woord', nameDa: 'Gæt ordet', nameSv: 'Gissa ordet', nameNo: 'Gjett ordet', nameFi: 'Arvaa sana', slug: 'word-guess-worksheets', icon: '❓', descriptionEn: 'Guess hidden words', descriptionDe: 'Versteckte Wörter erraten', descriptionFr: 'Deviner les mots cachés', descriptionEs: 'Adivina palabras ocultas', descriptionIt: 'Indovina le parole nascoste', descriptionPt: 'Adivinhe palavras escondidas', descriptionNl: 'Raad verborgen woorden', descriptionDa: 'Gæt skjulte ord', descriptionSv: 'Gissa dolda ord', descriptionNo: 'Gjett skjulte ord', descriptionFi: 'Arvaa piilotetut sanat' },
      { nameEn: 'Writing', nameDe: 'Schreiben', nameFr: 'Écriture', nameEs: 'Escritura', nameIt: 'Scrittura', namePt: 'Escrita', nameNl: 'Schrijven', nameDa: 'Skrivning', nameSv: 'Skrivning', nameNo: 'Skriving', nameFi: 'Kirjoittaminen', slug: 'writing-worksheets', icon: '✍️', descriptionEn: 'Handwriting practice', descriptionDe: 'Handschrift üben', descriptionFr: 'Pratique de l\'écriture', descriptionEs: 'Práctica de escritura', descriptionIt: 'Pratica di scrittura', descriptionPt: 'Prática de caligrafia', descriptionNl: 'Handschrift oefenen', descriptionDa: 'Håndskriftsøvelse', descriptionSv: 'Handskriftsövning', descriptionNo: 'Håndskriftsøving', descriptionFi: 'Käsialaharjoitus' },
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
    nameFi: 'Visuaalinen oppiminen',
    icon: '👁️',
    gradient: 'from-amber-500/10 to-orange-500/10',
    borderColor: 'border-amber-500/20',
    apps: [
      { nameEn: 'Matching', nameDe: 'Zuordnung', nameFr: 'Association', nameEs: 'Relacionar parejas', nameIt: 'Abbinamenti', namePt: 'Jogo de correspondência', nameNl: 'Koppelen', nameDa: 'Parspil', nameSv: 'Para ihop', nameNo: 'Finn par', nameFi: 'Yhdistäminen', slug: 'matching-worksheets', icon: '🎯', descriptionEn: 'Match pairs together', descriptionDe: 'Paare zuordnen', descriptionFr: 'Associer les paires', descriptionEs: 'Une las parejas', descriptionIt: 'Abbina le coppie', descriptionPt: 'Ligue os pares', descriptionNl: 'Koppel de paren', descriptionDa: 'Find par sammen', descriptionSv: 'Koppla ihop paren', descriptionNo: 'Koble sammen par', descriptionFi: 'Yhdistä parit' },
      { nameEn: 'Drawing Lines', nameDe: 'Linien zeichnen', nameFr: 'Tracer des lignes', nameEs: 'Trazar líneas', nameIt: 'Traccia le linee', namePt: 'Traçando linhas', nameNl: 'Lijnen trekken', nameDa: 'Tegn streger', nameSv: 'Dra streck', nameNo: 'Tegn linjer', nameFi: 'Viivojen piirtäminen', slug: 'drawing-lines-worksheets', icon: '✏️', descriptionEn: 'Trace & connect', descriptionDe: 'Nachspuren & Verbinden', descriptionFr: 'Tracer et relier', descriptionEs: 'Traza y conecta', descriptionIt: 'Traccia e collega', descriptionPt: 'Trace e conecte', descriptionNl: 'Trek na en verbind', descriptionDa: 'Tegn og forbind', descriptionSv: 'Rita och koppla ihop', descriptionNo: 'Tegn og koble', descriptionFi: 'Jäljennä ja yhdistä' },
      { nameEn: 'Find Objects', nameDe: 'Suchbilder', nameFr: 'Cherche et trouve', nameEs: 'Busca y encuentra', nameIt: 'Cerca e trova', namePt: 'Encontre objetos', nameNl: 'Zoek en vind', nameDa: 'Find objekterne', nameSv: 'Hitta föremålen', nameNo: 'Finn objekter', nameFi: 'Etsi esineet', slug: 'find-objects-worksheets', icon: '🔎', descriptionEn: 'I Spy activities', descriptionDe: 'Objekte suchen & finden', descriptionFr: 'Jeux d\'observation', descriptionEs: 'Actividades de observación', descriptionIt: 'Attività di osservazione', descriptionPt: 'Atividades de observação', descriptionNl: 'Kijkspelletjes', descriptionDa: 'Find og se aktiviteter', descriptionSv: 'Sök och hitta aktiviteter', descriptionNo: 'Se og finn-aktiviteter', descriptionFi: 'Etsi ja löydä' },
      { nameEn: 'Grid Match', nameDe: 'Gitter-Zuordnung', nameFr: 'Grille d\'association', nameEs: 'Cuadrícula de asociación', nameIt: 'Griglia di abbinamento', namePt: 'Grade de correspondência', nameNl: 'Raster koppelen', nameDa: 'Gittermatching', nameSv: 'Rutmatchning', nameNo: 'Rutematching', nameFi: 'Ruudukkomatch', slug: 'grid-match-worksheets', icon: '🔲', descriptionEn: 'Pattern matching', descriptionDe: 'Muster erkennen', descriptionFr: 'Reconnaissance de motifs', descriptionEs: 'Reconoce los patrones', descriptionIt: 'Riconosci i pattern', descriptionPt: 'Reconheça os padrões', descriptionNl: 'Patronen herkennen', descriptionDa: 'Mønstergenkendelse', descriptionSv: 'Mönsterigenkänning', descriptionNo: 'Mønstergjenkjenning', descriptionFi: 'Kuviotunnistus' },
      { nameEn: 'Find & Count', nameDe: 'Suchen & Zählen', nameFr: 'Chercher et compter', nameEs: 'Buscar y contar', nameIt: 'Cerca e conta', namePt: 'Encontre e conte', nameNl: 'Zoek en tel', nameDa: 'Find og tæl', nameSv: 'Hitta och räkna', nameNo: 'Finn og tell', nameFi: 'Etsi ja laske', slug: 'find-and-count-worksheets', icon: '🧮', descriptionEn: 'Count hidden items', descriptionDe: 'Versteckte Objekte zählen', descriptionFr: 'Compter les objets cachés', descriptionEs: 'Cuenta los objetos escondidos', descriptionIt: 'Conta gli oggetti nascosti', descriptionPt: 'Conte os objetos escondidos', descriptionNl: 'Tel verborgen voorwerpen', descriptionDa: 'Tæl skjulte ting', descriptionSv: 'Räkna gömda saker', descriptionNo: 'Tell skjulte gjenstander', descriptionFi: 'Laske piilotetut esineet' },
      { nameEn: 'Missing Pieces', nameDe: 'Fehlende Teile', nameFr: 'Pièces manquantes', nameEs: 'Piezas faltantes', nameIt: 'Pezzi mancanti', namePt: 'Peças faltando', nameNl: 'Ontbrekende stukjes', nameDa: 'Manglende brikker', nameSv: 'Saknade bitar', nameNo: 'Manglende brikker', nameFi: 'Puuttuvat palat', slug: 'missing-pieces-worksheets', icon: '🧩', descriptionEn: 'Complete the picture', descriptionDe: 'Bild vervollständigen', descriptionFr: 'Complétez l\'image', descriptionEs: 'Completa la imagen', descriptionIt: 'Completa l\'immagine', descriptionPt: 'Complete a imagem', descriptionNl: 'Maak het plaatje af', descriptionDa: 'Gør billedet færdigt', descriptionSv: 'Gör bilden komplett', descriptionNo: 'Fullfør bildet', descriptionFi: 'Täydennä kuva' },
      { nameEn: 'Shadow Match', nameDe: 'Schattenspiel', nameFr: 'Jeu d\'ombres', nameEs: 'Sombras y figuras', nameIt: 'Abbina le ombre', namePt: 'Combine as sombras', nameNl: 'Schaduw koppelen', nameDa: 'Skyggespil', nameSv: 'Skuggmatchning', nameNo: 'Skyggespill', nameFi: 'Varjoyhdistäminen', slug: 'shadow-match-worksheets', icon: '👤', descriptionEn: 'Match shadows to objects', descriptionDe: 'Schatten zuordnen', descriptionFr: 'Associer ombres et objets', descriptionEs: 'Une sombras con objetos', descriptionIt: 'Abbina ombre agli oggetti', descriptionPt: 'Combine sombras com objetos', descriptionNl: 'Koppel schaduwen aan voorwerpen', descriptionDa: 'Match skygger med objekter', descriptionSv: 'Matcha skuggor med föremål', descriptionNo: 'Match skygger med objekter', descriptionFi: 'Yhdistä varjot esineisiin' },
      { nameEn: 'Picture Path', nameDe: 'Bilderpfad', nameFr: 'Chemin d\'images', nameEs: 'Camino de imágenes', nameIt: 'Percorso di immagini', namePt: 'Caminho de imagens', nameNl: 'Plaatjespad', nameDa: 'Billedsti', nameSv: 'Bildväg', nameNo: 'Bildesti', nameFi: 'Kuvapolku', slug: 'picture-path-worksheets', icon: '🛤️', descriptionEn: 'Follow the path', descriptionDe: 'Folge dem Weg', descriptionFr: 'Suivez le chemin', descriptionEs: 'Sigue el camino', descriptionIt: 'Segui il percorso', descriptionPt: 'Siga o caminho', descriptionNl: 'Volg het pad', descriptionDa: 'Følg stien', descriptionSv: 'Följ vägen', descriptionNo: 'Følg stien', descriptionFi: 'Seuraa polkua' },
      { nameEn: 'Picture Sort', nameDe: 'Bilder sortieren', nameFr: 'Trier les images', nameEs: 'Ordenar imágenes', nameIt: 'Ordina le immagini', namePt: 'Ordenar imagens', nameNl: 'Plaatjes sorteren', nameDa: 'Sortér billeder', nameSv: 'Sortera bilder', nameNo: 'Sorter bilder', nameFi: 'Lajittele kuvat', slug: 'picture-sort-worksheets', icon: '📂', descriptionEn: 'Sort by category', descriptionDe: 'Nach Kategorie sortieren', descriptionFr: 'Trier par catégorie', descriptionEs: 'Ordena por categoría', descriptionIt: 'Ordina per categoria', descriptionPt: 'Ordene por categoria', descriptionNl: 'Sorteer op categorie', descriptionDa: 'Sortér efter kategori', descriptionSv: 'Sortera efter kategori', descriptionNo: 'Sorter etter kategori', descriptionFi: 'Lajittele luokittain' },
      { nameEn: 'Prepositions', nameDe: 'Präpositionen', nameFr: 'Prépositions', nameEs: 'Preposiciones', nameIt: 'Preposizioni', namePt: 'Preposições', nameNl: 'Voorzetsels', nameDa: 'Forholdsord', nameSv: 'Prepositioner', nameNo: 'Preposisjoner', nameFi: 'Prepositiot', slug: 'prepositions-worksheets', icon: '📍', descriptionEn: 'Spatial relationships', descriptionDe: 'Räumliche Beziehungen', descriptionFr: 'Relations spatiales', descriptionEs: 'Relaciones espaciales', descriptionIt: 'Relazioni spaziali', descriptionPt: 'Relações espaciais', descriptionNl: 'Ruimtelijke relaties', descriptionDa: 'Rumlige relationer', descriptionSv: 'Rumsliga relationer', descriptionNo: 'Romlige relasjoner', descriptionFi: 'Tilasuhteet' },
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
    nameFi: 'Luova',
    icon: '🎨',
    gradient: 'from-green-500/10 to-emerald-500/10',
    borderColor: 'border-green-500/20',
    apps: [
      { nameEn: 'Coloring', nameDe: 'Ausmalen', nameFr: 'Coloriage', nameEs: 'Colorear', nameIt: 'Colorare', namePt: 'Colorir', nameNl: 'Kleuren', nameDa: 'Tegnesider', nameSv: 'Målarbilder', nameNo: 'Tegnesider', nameFi: 'Väritys', slug: 'coloring-worksheets', icon: '🖍️', descriptionEn: 'Color by sections', descriptionDe: 'Nach Bereichen ausmalen', descriptionFr: 'Colorier par zones', descriptionEs: 'Colorea por secciones', descriptionIt: 'Colora per sezioni', descriptionPt: 'Pinte por seções', descriptionNl: 'Kleur per vlak', descriptionDa: 'Mal efter områder', descriptionSv: 'Måla efter områden', descriptionNo: 'Fargelegg etter områder', descriptionFi: 'Väritä alueet' },
      { nameEn: 'Draw & Color', nameDe: 'Zeichnen & Ausmalen', nameFr: 'Dessiner et colorier', nameEs: 'Dibujar y colorear', nameIt: 'Disegna e colora', namePt: 'Desenhe e pinte', nameNl: 'Tekenen en kleuren', nameDa: 'Tegn og mal', nameSv: 'Rita och måla', nameNo: 'Tegn og mal', nameFi: 'Piirrä ja väritä', slug: 'draw-and-color-worksheets', icon: '🎨', descriptionEn: 'Grid drawing', descriptionDe: 'Rasterzeichnen', descriptionFr: 'Dessin sur quadrillage', descriptionEs: 'Dibujo en cuadrícula', descriptionIt: 'Disegno su griglia', descriptionPt: 'Desenho em grade', descriptionNl: 'Rastertekenen', descriptionDa: 'Gittertegning', descriptionSv: 'Rutnätsritning', descriptionNo: 'Rutenett-tegning', descriptionFi: 'Ruutupiirtäminen' },
      { nameEn: 'Alphabet Train', nameDe: 'ABC-Zug', nameFr: 'Train de l\'alphabet', nameEs: 'Tren del abecedario', nameIt: 'Trenino dell\'alfabeto', namePt: 'Trenzinho do alfabeto', nameNl: 'Alfabettrein', nameDa: 'Alfabettog', nameSv: 'Alfabetståget', nameNo: 'Alfabettoget', nameFi: 'Aakkosjuna', slug: 'alphabet-train-worksheets', icon: '🚂', descriptionEn: 'ABC on trains', descriptionDe: 'Buchstaben auf Zügen', descriptionFr: 'L\'alphabet en train', descriptionEs: 'El ABC en trenes', descriptionIt: 'L\'alfabeto sul trenino', descriptionPt: 'O ABC no trenzinho', descriptionNl: 'Het ABC op treintjes', descriptionDa: 'ABC på tog', descriptionSv: 'ABC på tågvagnar', descriptionNo: 'ABC på togvogner', descriptionFi: 'Aakkoset junassa' },
      { nameEn: 'Picture Bingo', nameDe: 'Bilder-Bingo', nameFr: 'Loto images', nameEs: 'Lotería de imágenes', nameIt: 'Tombola illustrata', namePt: 'Bingo de imagens', nameNl: 'Plaatjesbingo', nameDa: 'Billed-bingo', nameSv: 'Bildbingo', nameNo: 'Bildebingo', nameFi: 'Kuvabingo', slug: 'picture-bingo-worksheets', icon: '🎰', descriptionEn: 'Visual bingo cards', descriptionDe: 'Bingokarten mit Bildern', descriptionFr: 'Cartes de loto illustrées', descriptionEs: 'Cartas de lotería ilustradas', descriptionIt: 'Cartelle tombola con immagini', descriptionPt: 'Cartelas de bingo ilustradas', descriptionNl: 'Bingokaarten met plaatjes', descriptionDa: 'Bingoplader med billeder', descriptionSv: 'Bingokort med bilder', descriptionNo: 'Bingokort med bilder', descriptionFi: 'Bingokortit kuvilla' },
      { nameEn: 'Pattern Train', nameDe: 'Musterzug', nameFr: 'Train des motifs', nameEs: 'Tren de patrones', nameIt: 'Trenino dei pattern', namePt: 'Trem de padrões', nameNl: 'Patroontrein', nameDa: 'Mønstertog', nameSv: 'Mönstertåg', nameNo: 'Mønstertog', nameFi: 'Kuviojuna', slug: 'pattern-train-worksheets', icon: '🚃', descriptionEn: 'Pattern sequences', descriptionDe: 'Musterfolgen erkennen', descriptionFr: 'Séquences de motifs', descriptionEs: 'Secuencias de patrones', descriptionIt: 'Sequenze di pattern', descriptionPt: 'Sequências de padrões', descriptionNl: 'Patronenreeksen', descriptionDa: 'Mønstersekvenser', descriptionSv: 'Mönstersekvenser', descriptionNo: 'Mønstersekvenser', descriptionFi: 'Kuviosarjat' },
      { nameEn: 'Pattern Worksheet', nameDe: 'Muster-Arbeitsblatt', nameFr: 'Fiche de motifs', nameEs: 'Ficha de patrones', nameIt: 'Scheda dei pattern', namePt: 'Atividade de padrões', nameNl: 'Patronenwerkblad', nameDa: 'Mønsteropgaver', nameSv: 'Mönsterövningsblad', nameNo: 'Mønsteroppgaver', nameFi: 'Kuviotehtävät', slug: 'pattern-worksheets', icon: '🔄', descriptionEn: 'Complete patterns', descriptionDe: 'Muster vervollständigen', descriptionFr: 'Compléter les motifs', descriptionEs: 'Completa los patrones', descriptionIt: 'Completa i pattern', descriptionPt: 'Complete os padrões', descriptionNl: 'Patronen aanvullen', descriptionDa: 'Færdiggør mønstre', descriptionSv: 'Slutför mönster', descriptionNo: 'Fullfør mønstre', descriptionFi: 'Täydennä kuviot' },
      { nameEn: 'Treasure Hunt', nameDe: 'Schatzsuche', nameFr: 'Chasse au trésor', nameEs: 'Búsqueda del tesoro', nameIt: 'Caccia al tesoro', namePt: 'Caça ao tesouro', nameNl: 'Schattenjacht', nameDa: 'Skattejagt', nameSv: 'Skattjakt', nameNo: 'Skattejakt', nameFi: 'Aarteenetsintä', slug: 'treasure-hunt-worksheets', icon: '🗺️', descriptionEn: 'Adventure worksheets', descriptionDe: 'Abenteuer-Arbeitsblätter', descriptionFr: 'Fiches d\'aventure', descriptionEs: 'Fichas de aventura', descriptionIt: 'Schede avventura', descriptionPt: 'Atividades de aventura', descriptionNl: 'Avontuurlijke werkbladen', descriptionDa: 'Eventyrlige opgaver', descriptionSv: 'Äventyrsuppgifter', descriptionNo: 'Eventyrlige oppgaver', descriptionFi: 'Seikkailutehtävät' },
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
    nameFi: 'Logiikka ja palapelit',
    icon: '🧩',
    gradient: 'from-rose-500/10 to-red-500/10',
    borderColor: 'border-rose-500/20',
    apps: [
      { nameEn: 'Sudoku', nameDe: 'Sudoku', nameFr: 'Sudoku', nameEs: 'Sudoku', nameIt: 'Sudoku', namePt: 'Sudoku', nameNl: 'Sudoku', nameDa: 'Sudoku', nameSv: 'Sudoku', nameNo: 'Sudoku', nameFi: 'Sudoku', slug: 'sudoku-worksheets', icon: '🔢', descriptionEn: 'Number logic grids', descriptionDe: 'Zahlenrätsel', descriptionFr: 'Grilles de chiffres', descriptionEs: 'Cuadrículas de lógica numérica', descriptionIt: 'Griglie di logica numerica', descriptionPt: 'Grades de lógica numérica', descriptionNl: 'Logische cijferrasters', descriptionDa: 'Logiske talgitre', descriptionSv: 'Logiska sifferrutnät', descriptionNo: 'Logiske tallruter', descriptionFi: 'Lukujen logiikkaruudukot' },
      { nameEn: 'Big & Small', nameDe: 'Groß & Klein', nameFr: 'Grand et petit', nameEs: 'Grande y pequeño', nameIt: 'Grande e piccolo', namePt: 'Grande e pequeno', nameNl: 'Groot en klein', nameDa: 'Stor og lille', nameSv: 'Stor och liten', nameNo: 'Stor og liten', nameFi: 'Iso ja pieni', slug: 'big-small-worksheets', icon: '📏', descriptionEn: 'Size comparison', descriptionDe: 'Größenvergleich', descriptionFr: 'Comparaison de tailles', descriptionEs: 'Comparación de tamaños', descriptionIt: 'Confronto di dimensioni', descriptionPt: 'Comparação de tamanhos', descriptionNl: 'Groottevergelijking', descriptionDa: 'Størrelsesammenligning', descriptionSv: 'Storleksjämförelse', descriptionNo: 'Sammenlign størrelser', descriptionFi: 'Kokojen vertailu' },
      { nameEn: 'More or Less', nameDe: 'Mehr oder weniger', nameFr: 'Plus ou moins', nameEs: 'Más o menos', nameIt: 'Di più o di meno', namePt: 'Mais ou menos', nameNl: 'Meer of minder', nameDa: 'Mere eller mindre', nameSv: 'Mer eller mindre', nameNo: 'Mer eller mindre', nameFi: 'Enemmän vai vähemmän', slug: 'more-less-worksheets', icon: '⚖️', descriptionEn: 'Quantity comparison', descriptionDe: 'Mengenvergleich', descriptionFr: 'Comparaison de quantités', descriptionEs: 'Comparar cantidades', descriptionIt: 'Confronto di quantità', descriptionPt: 'Comparar quantidades', descriptionNl: 'Hoeveelheden vergelijken', descriptionDa: 'Sammenlign antal', descriptionSv: 'Jämför antal', descriptionNo: 'Sammenlign antall', descriptionFi: 'Määrien vertailu' },
      { nameEn: 'Odd One Out', nameDe: 'Was passt nicht?', nameFr: 'L\'intrus', nameEs: 'El intruso', nameIt: 'L\'intruso', namePt: 'O intruso', nameNl: 'Wat hoort er niet bij?', nameDa: 'Find den der ikke hører til', nameSv: 'Vilken hör inte hemma?', nameNo: 'Finn den som ikke hører til', nameFi: 'Mikä ei kuulu joukkoon?', slug: 'odd-one-out-worksheets', icon: '🔴', descriptionEn: 'Find what\'s different', descriptionDe: 'Finde den Unterschied', descriptionFr: 'Trouvez l\'intrus', descriptionEs: 'Encuentra el diferente', descriptionIt: 'Trova l\'intruso', descriptionPt: 'Encontre o diferente', descriptionNl: 'Vind de buitenbeentje', descriptionDa: 'Find den anderledes', descriptionSv: 'Hitta den som skiljer sig', descriptionNo: 'Finn den som er annerledes', descriptionFi: 'Etsi poikkeava' },
    ],
  },
];

export default function AppCategories({ locale }: AppCategoriesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('math');
  const [hoveredApp, setHoveredApp] = useState<string | null>(null);
  const headerRef = useReveal();

  // Get content for current locale, fallback to English
  const content = localeContent[locale] || localeContent.en;

  // Helper functions for localized content
  const getCategoryName = (category: Category) => {
    if (locale === 'fi') return category.nameFi;
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
    if (locale === 'fi') return app.nameFi;
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
    if (locale === 'fi') return app.descriptionFi;
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

  const getLocalizedSlug = (englishSlug: string): string => {
    const config = getAppConfigBySlug(englishSlug);
    if (config) {
      return getSlugForLocale(config.appId, locale as SupportedLocale) || englishSlug;
    }
    return englishSlug;
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
        <div ref={headerRef} className="text-center mb-12 reveal">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 bg-amber-100 border border-amber-200">
            <span className="text-amber-600">{'\u2728'}</span>
            <span className="text-sm font-medium text-amber-700">{content.badge}</span>
          </div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'var(--font-cormorant), Georgia, serif' }}
          >
            {content.title}
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                relative px-4 sm:px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all duration-300
                ${activeCategory === category.id
                  ? 'text-white shadow-lg bg-gradient-to-r from-amber-500 to-orange-500'
                  : 'text-stone-600 hover:text-stone-800 bg-white/50 hover:bg-white border border-stone-200'
                }
              `}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{getCategoryName(category)}</span>
              </span>
            </button>
          ))}
        </div>

        {/* Apps grid */}
        {activeData && (
          <div
            key={activeData.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {activeData.apps.map((app) => (
              <div key={app.slug}>
                <Link
                  href={`/${locale}/apps/${getLocalizedSlug(app.slug)}`}
                  className="block group"
                  onMouseEnter={() => setHoveredApp(app.slug)}
                  onMouseLeave={() => setHoveredApp(null)}
                >
                  <div
                    className={`
                      relative p-6 rounded-2xl bg-white border-2 transition-all duration-300 hover:-translate-y-1
                      ${activeData.borderColor}
                      ${hoveredApp === app.slug ? 'border-opacity-100 shadow-xl' : 'border-opacity-50 shadow-md'}
                    `}
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
                        <svg
                          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Crawlable links for all apps - visible to search engines, hidden from visual users */}
        <nav className="sr-only" aria-label="All worksheet generators">
          {categories.map(cat => cat.apps.map(app => (
            <Link key={app.slug} href={`/${locale}/apps/${getLocalizedSlug(app.slug)}`}>
              {getAppName(app)}
            </Link>
          )))}
        </nav>

        {/* View all link */}
        <div className="text-center mt-12">
          <Link
            href={`/${locale}/apps`}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/30"
          >
            {content.viewAllGenerators}
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
