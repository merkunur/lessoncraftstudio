#!/usr/bin/env node
/**
 * Phase 2b: adds runtimeTitle key to each per-app translations file across all 11 locales.
 *
 * Approach: read each translations-<app>.js, find each locale block's last key
 * line (before its closing `},` or final `}`), inject `,\n    "runtimeTitle": "<localized>"`.
 *
 * Idempotent: skips locales that already have runtimeTitle.
 *
 * Translations table below — operator-authored confidently for en/de/es/nl/fr/it/pt;
 * NSR-flagged for sv/da/no/fi (best-effort, native-speaker review pending per §17.5.1).
 *
 * Usage: node scripts/add-runtime-title-per-app.js [--dry-run]
 */

'use strict';

var fs = require('fs');
var path = require('path');

var TRANS_DIR = path.join(__dirname, '..', 'REFERENCE TRANSLATIONS');

// Per-app runtimeTitle × 11 locales. Bracket-keyed by app name (from §14.10 canonical).
var TITLE_TABLE = {
  'alphabet-train':   { en:'Alphabet Train Practice',     de:'Alphabet-Zug Übung',          es:'Práctica del Tren del Abecedario', nl:'Alfabettrein oefenen',          fr:'Exercice du Train Alphabet',      it:'Esercizi col Treno Alfabetico',  pt:'Prática do Trem do Alfabeto',  sv:'Alfabetståg-övning',         da:'Alfabettog-øvelse',         no:'Alfabettog-øving',          fi:'Aakkosjuna-harjoitus' },
  'big-small':        { en:'Big or Small?',                de:'Groß oder klein?',           es:'¿Grande o pequeño?',                nl:'Groot of klein?',               fr:'Grand ou petit ?',                it:'Grande o piccolo?',              pt:'Grande ou pequeno?',           sv:'Stor eller liten?',          da:'Stor eller lille?',          no:'Stor eller liten?',         fi:'Iso vai pieni?' },
  'bingo':            { en:'Picture Bingo',                de:'Bilder-Bingo',               es:'Bingo de Imágenes',                 nl:'Plaatjesbingo',                 fr:'Loto d\'images',                  it:'Tombola di Immagini',            pt:'Bingo de Imagens',             sv:'Bildbingo',                  da:'Billedbanko',                no:'Bildebingo',                fi:'Kuvabingo' },
  'chart-count':      { en:'Picture Graph',                de:'Bilddiagramm',               es:'Gráfico de Imágenes',               nl:'Beeldgrafiek',                  fr:'Graphique d\'images',             it:'Grafico di Immagini',            pt:'Gráfico de Imagens',           sv:'Bilddiagram',                da:'Billeddiagram',              no:'Bildediagram',              fi:'Kuvakaavio' },
  'code-addition':    { en:'Code Addition Practice',       de:'Code-Additions-Übung',       es:'Práctica de Sumas con Código',      nl:'Codeoptellen oefenen',          fr:'Exercices d\'addition codée',     it:'Esercizi di addizione in codice',pt:'Prática de Adição com Código', sv:'Kodadditionsövning',         da:'Kodeadditionsøvelse',        no:'Kodeaddisjonsøving',        fi:'Koodiyhteenlaskuharjoitus' },
  'crossword':        { en:'Crossword',                    de:'Kreuzworträtsel',            es:'Crucigrama',                        nl:'Kruiswoordpuzzel',              fr:'Mots croisés',                    it:'Cruciverba',                     pt:'Palavras Cruzadas',            sv:'Korsord',                    da:'Krydsord',                   no:'Kryssord',                  fi:'Ristisanat' },
  'cryptogram':       { en:'Cryptogram Practice',          de:'Kryptogramm-Übung',          es:'Práctica de Criptograma',           nl:'Cryptogram oefenen',            fr:'Exercices de cryptogramme',       it:'Esercizi di crittogramma',       pt:'Prática de Criptograma',       sv:'Kryptogramövning',           da:'Kryptogramøvelse',           no:'Kryptogramøving',           fi:'Salakirjoitusharjoitus' },
  'find-and-count':   { en:'Find and Count',               de:'Suchen und Zählen',          es:'Encuentra y Cuenta',                nl:'Zoeken en Tellen',              fr:'Trouve et Compte',                it:'Trova e Conta',                  pt:'Encontre e Conte',             sv:'Hitta och Räkna',            da:'Find og Tæl',                no:'Finn og Tell',              fi:'Etsi ja Laske' },
  'find-objects':     { en:'Find the Objects',             de:'Finde die Gegenstände',      es:'Encuentra los Objetos',             nl:'Zoek de Voorwerpen',            fr:'Trouve les Objets',               it:'Trova gli Oggetti',              pt:'Encontre os Objetos',          sv:'Hitta Föremålen',            da:'Find Genstandene',           no:'Finn Gjenstandene',         fi:'Etsi Esineet' },
  'grid-match':       { en:'Grid Match',                   de:'Raster-Zuordnung',           es:'Emparejar en Cuadrícula',           nl:'Rastermatch',                   fr:'Associations en grille',          it:'Abbinamento a Griglia',          pt:'Combinar em Grade',            sv:'Rutmatchning',               da:'Gittermatch',                no:'Rutenettmatch',             fi:'Ruudukon yhdistäminen' },
  'matching':         { en:'Match Up',                     de:'Verbinden',                  es:'Emparejar',                         nl:'Verbinden',                     fr:'Associer',                        it:'Abbinare',                       pt:'Combinar',                     sv:'Para ihop',                  da:'Sæt sammen',                 no:'Sett sammen',               fi:'Yhdistä' },
  'math-puzzle':      { en:'Math Puzzle Practice',         de:'Mathe-Puzzle-Übung',         es:'Práctica de Rompecabezas Matemático',nl:'Wiskundepuzzel oefenen',       fr:'Exercices de puzzle mathématique',it:'Esercizi col puzzle matematico', pt:'Prática de Quebra-Cabeça de Matemática',sv:'Matematikpussel-övning', da:'Matematikpuslespil-øvelse',  no:'Mattepuslespill-øving',     fi:'Matematiikkapalapeli-harjoitus' },
  'math-worksheet':   { en:'Math Worksheet Practice',      de:'Mathe-Arbeitsblatt-Übung',   es:'Práctica de Hoja de Matemáticas',   nl:'Wiskundewerkblad oefenen',      fr:'Exercice de fiche de maths',      it:'Esercizi di matematica',         pt:'Prática de Atividade de Matemática',sv:'Mattearbetsblad-övning', da:'Matematikøvelsesark',        no:'Matteoppgaveark-øving',     fi:'Matematiikkatehtävä-harjoitus' },
  'missing-pieces':   { en:'Missing Pieces',               de:'Fehlende Teile',             es:'Piezas que Faltan',                 nl:'Ontbrekende Stukken',           fr:'Pièces Manquantes',               it:'Pezzi Mancanti',                 pt:'Peças Faltantes',              sv:'Saknade Bitar',              da:'Manglende Brikker',          no:'Manglende Brikker',         fi:'Puuttuvat Palat' },
  'more-less':        { en:'More or Less Practice',        de:'Mehr-oder-weniger-Übung',    es:'Práctica de Más o Menos',           nl:'Meer of minder oefenen',        fr:'Exercice plus ou moins',          it:'Esercizi di più o meno',         pt:'Prática de Mais ou Menos',     sv:'Mer eller mindre-övning',    da:'Mere eller mindre-øvelse',   no:'Mer eller mindre-øving',    fi:'Enemmän tai vähemmän -harjoitus' },
  'odd-one-out':      { en:'Odd One Out',                  de:'Was passt nicht?',           es:'El que sobra',                      nl:'Welke hoort er niet bij?',      fr:'L\'intrus',                       it:'L\'intruso',                     pt:'Qual é o diferente?',          sv:'Vilken passar inte in?',     da:'Hvilken passer ikke?',       no:'Hvilken passer ikke?',      fi:'Mikä ei kuulu joukkoon?' },
  'pattern-train':    { en:'Pattern Train Practice',       de:'Muster-Zug-Übung',           es:'Práctica del Tren de Patrones',     nl:'Patroontrein oefenen',          fr:'Exercices du train à motifs',     it:'Esercizi col treno dei modelli', pt:'Prática do Trem de Padrões',   sv:'Mönstertåg-övning',          da:'Mønstertog-øvelse',          no:'Mønstertog-øving',          fi:'Kuvio-juna-harjoitus' },
  'pattern-worksheet':{ en:'Complete the Pattern',         de:'Vervollständige das Muster', es:'Completa el Patrón',                nl:'Maak het patroon af',           fr:'Complète le motif',               it:'Completa il modello',            pt:'Complete o Padrão',            sv:'Fyll i Mönstret',            da:'Færdiggør Mønstret',         no:'Fullfør Mønsteret',         fi:'Täydennä Kuvio' },
  'picture-path':     { en:'Picture Path',                 de:'Bilderpfad',                 es:'Camino de Imágenes',                nl:'Plaatjespad',                   fr:'Chemin d\'images',                it:'Percorso di Immagini',           pt:'Caminho de Imagens',           sv:'Bildstig',                   da:'Billedsti',                  no:'Bildesti',                  fi:'Kuvapolku' },
  'picture-sort':     { en:'Picture Sort',                 de:'Bilder sortieren',           es:'Clasificar Imágenes',               nl:'Plaatjes sorteren',             fr:'Trier les images',                it:'Ordina le immagini',             pt:'Classificar Imagens',          sv:'Sortera bilder',             da:'Sortér billeder',            no:'Sorter bilder',             fi:'Lajittele kuvat' },
  'prepositions':     { en:'Prepositions Practice',        de:'Präpositionen-Übung',        es:'Práctica de Preposiciones',         nl:'Voorzetsels oefenen',           fr:'Exercices de prépositions',       it:'Esercizi di preposizioni',       pt:'Prática de Preposições',       sv:'Prepositionsövning',         da:'Præpositionsøvelse',         no:'Preposisjonsøving',         fi:'Prepositioharjoitus' },
  'shadow-match':     { en:'Shadow Match',                 de:'Schatten-Zuordnung',         es:'Emparejar Sombras',                 nl:'Schaduwen matchen',             fr:'Associations d\'ombres',          it:'Abbinamento di Ombre',           pt:'Combinar Sombras',             sv:'Skuggmatchning',             da:'Skyggematch',                no:'Skyggematch',               fi:'Varjojen yhdistäminen' },
  'subtraction':      { en:'Subtraction Practice',         de:'Subtraktionsübung',          es:'Práctica de Restas',                nl:'Aftrekken oefenen',             fr:'Exercices de soustraction',       it:'Esercizi di sottrazione',        pt:'Prática de Subtração',         sv:'Subtraktionsövning',         da:'Subtraktionsøvelse',         no:'Subtraksjonsøving',         fi:'Vähennyslaskuharjoitus' },
  'sudoku':           { en:'Picture Sudoku',               de:'Bilder-Sudoku',              es:'Sudoku de Imágenes',                nl:'Plaatjessudoku',                fr:'Sudoku d\'images',                it:'Sudoku di Immagini',             pt:'Sudoku de Imagens',            sv:'Bildsudoku',                 da:'Billedsudoku',               no:'Bildesudoku',               fi:'Kuvasudoku' },
  'treasure-hunt':    { en:'Treasure Hunt',                de:'Schatzsuche',                es:'Búsqueda del Tesoro',               nl:'Schattenjacht',                 fr:'Chasse au Trésor',                it:'Caccia al Tesoro',               pt:'Caça ao Tesouro',              sv:'Skattjakt',                  da:'Skattejagt',                 no:'Skattejakt',                fi:'Aarteenmetsästys' },
  'word-guess':       { en:'Word Guess Practice',          de:'Wörter-Raten-Übung',         es:'Práctica de Adivinar Palabras',     nl:'Woordraden oefenen',            fr:'Exercices devine le mot',         it:'Esercizi indovina la parola',    pt:'Prática de Adivinhar Palavras',sv:'Gissa ordet-övning',         da:'Gæt ordet-øvelse',           no:'Gjett ordet-øving',         fi:'Arvaa sana -harjoitus' },
  'word-scramble':    { en:'Word Scramble Practice',       de:'Wörter-Mix-Übung',           es:'Práctica de Palabras Desordenadas', nl:'Woorddoorelkaar oefenen',       fr:'Exercices mots mélangés',         it:'Esercizi parole mescolate',      pt:'Prática de Palavras Embaralhadas',sv:'Bokstavskramla-övning',   da:'Bogstavsalat-øvelse',        no:'Bokstavkrøll-øving',        fi:'Sanasekoitus-harjoitus' },
  'wordsearch':       { en:'Word Search',                  de:'Buchstabensalat',            es:'Sopa de Letras',                    nl:'Woordzoeker',                   fr:'Mots Mêlés',                      it:'Trova le Parole',                pt:'Caça-Palavras',                sv:'Korsord (Sök ord)',          da:'Find ord',                   no:'Finn ord',                  fi:'Sanahaku' }
};

// Map app name -> translations file. Most are translations-<app>.js; exceptions:
var FILE_MAP = {
  'alphabet-train': 'translations-alphabet-train-complete.js',
  'addition': 'translations-addition-complete.js',
  'bingo': 'translations-picture-bingo.js',
  'find-and-count': 'translations-find-and-count-complete.js',
  'matching': 'translations-matchup-maker.js',
  'math-worksheet': 'translations-math-worksheet-final.js',
  'picture-path': 'translations-picture-pathway.js',
  'word-scramble': 'translations-word-scramble-complete.js',
  'wordsearch': 'translations-wordsearch-complete.js'
};

function fileForApp(appName) {
  if (FILE_MAP[appName]) return FILE_MAP[appName];
  return 'translations-' + appName + '.js';
}

function injectRuntimeTitle(content, locale, title) {
  // Find the locale block. Two valid forms:
  //   "<locale>": {       — quoted, common
  //    <locale>: {        — unquoted at start of line (alphabet-train style)
  // Use anchored patterns to avoid matches inside French/etc translation
  // values where JavaScript \b can match at é→e (ASCII-only word boundary).
  var localeRe = new RegExp('(?:^|[\\n,])\\s*(?:"' + locale + '"|' + locale + ')\\s*:\\s*\\{', 'm');
  var m = localeRe.exec(content);
  if (!m) return { content: content, action: 'skip-locale-not-found' };
  var openBrace = content.indexOf('{', m.index);
  // Walk forward bracket-balanced to find matching `}`
  var depth = 0, inStr = false, esc = false;
  var closeIdx = -1;
  for (var i = openBrace; i < content.length; i++) {
    var c = content[i];
    if (esc) { esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { closeIdx = i; break; } }
  }
  if (closeIdx === -1) return { content: content, action: 'skip-locale-bracket-unbalanced' };

  var localeBlock = content.slice(m.index, closeIdx + 1);
  if (localeBlock.indexOf('"runtimeTitle"') !== -1) {
    return { content: content, action: 'skip-already-present' };
  }

  // Find the last `,\n    "key": "value"` pattern within the block, append after.
  // Simpler: insert before the closing `}` with a leading comma.
  var beforeClose = content.slice(0, closeIdx);
  // Find the last newline before closeIdx
  var lastNewlineIdx = beforeClose.lastIndexOf('\n');
  // Find position of last non-whitespace char before closeIdx (should be the last value)
  var i2 = closeIdx - 1;
  while (i2 > openBrace && /\s/.test(content[i2])) i2--;
  // i2 now points to last non-whitespace char before close brace (e.g., '"' from prior value)
  var lastChar = content[i2];
  var insertion;
  if (lastChar === ',') {
    insertion = '\n    "runtimeTitle": ' + JSON.stringify(title);
  } else {
    insertion = ',\n    "runtimeTitle": ' + JSON.stringify(title);
  }
  // Insert AFTER i2 (before closeIdx whitespace)
  var newContent = content.slice(0, i2 + 1) + insertion + content.slice(i2 + 1);
  return { content: newContent, action: 'rewritten' };
}

function processApp(appName, dryRun) {
  var titleSet = TITLE_TABLE[appName];
  if (!titleSet) return { app: appName, action: 'skip-no-title-table' };
  var fileName = fileForApp(appName);
  var filePath = path.join(TRANS_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    return { app: appName, action: 'skip-file-not-found', file: fileName };
  }
  var content = fs.readFileSync(filePath, 'utf8');
  var locales = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
  var results = {};
  locales.forEach(function (loc) {
    var title = titleSet[loc];
    if (!title) { results[loc] = 'no-title'; return; }
    var r = injectRuntimeTitle(content, loc, title);
    content = r.content;
    results[loc] = r.action;
  });
  if (!dryRun) {
    var tmpPath = filePath + '.tmp';
    fs.writeFileSync(tmpPath, content, 'utf8');
    fs.renameSync(tmpPath, filePath);
  }
  return { app: appName, file: fileName, results: results };
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.includes('--dry-run');

  var apps = Object.keys(TITLE_TABLE);
  console.log('add-runtime-title-per-app — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  apps:', apps.length);
  console.log('');

  apps.forEach(function (a) {
    var r = processApp(a, dryRun);
    if (r.action) {
      console.log('  ' + a.padEnd(22) + ' ' + r.action);
    } else {
      var summary = Object.keys(r.results).map(function (loc) {
        var act = r.results[loc];
        return loc + ':' + (act === 'rewritten' ? '✓' : act === 'skip-already-present' ? '·' : '✗');
      }).join(' ');
      console.log('  ' + a.padEnd(22) + ' ' + summary);
    }
  });
}

if (require.main === module) main();
