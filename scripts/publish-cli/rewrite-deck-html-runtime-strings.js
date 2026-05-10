#!/usr/bin/env node
/**
 * Phase 4 retrofit: rewrites already-published deck.html files in-place to
 * inject bundle.runtimeStrings into DECK_BUNDLE for non-en locales, and
 * replaces hardcoded English UI button literals with localized strings.
 *
 * Defect class: pre-Phase-3 deck.html files have:
 *   1. STRINGS object with only `en:` entries (no runtimeStrings field on bundle)
 *   2. Hardcoded "Check Answers" / "Try Again" button text in HTML
 *   3. Hardcoded "Addition Practice" / "Treasure Hunt" / etc. page-title strip
 *
 * Post-Phase-3 fix shipped in 28 apps (commit ef0c6b79) handles future decks;
 * this retrofit handles the 262 already-published non-en decks (29 each in
 * de/es/nl/fr/it/pt/sv/da/fi + 1 in no per DB; en is unaffected).
 *
 * Per-deck pipeline (per §15.17):
 *   1. Read deck.html
 *   2. Extract DECK_BUNDLE.contentLanguage + DECK_BUNDLE.appType
 *   3. Build runtimeStrings dict from baked TRANSLATION_TABLE for that locale + app
 *   4. Inject runtimeStrings into DECK_BUNDLE JSON literal
 *   5. Replace hardcoded English button HTML with localized text
 *   6. Replace hardcoded English title-strip text (top-left page strip)
 *   7. Replace English youDidIt/doAnother/printMyWorksheet/allCorrect/score/correct
 *      strings in the runtime-emitted HTML with localized via STRINGS post-load
 *   8. Atomic write (tmp + rename) per §15.17
 *
 * Idempotent: skip if DECK_BUNDLE.runtimeStrings already populated.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-runtime-strings.js <directory> [--dry-run]
 *
 *   <directory>  e.g. /var/www/lcs-media/decks (walks per-locale subdirs)
 */

'use strict';

var fs = require('fs');
var path = require('path');

// Baked translation table — mirrors translations-shared.js runtimeXxx keys.
// Format: TABLE[locale][key] = "localized string"
var SHARED_RUNTIME = {
  en: { checkAnswers:'Check Answers', tryAgain:'Try Again', allCorrect:'All correct!', youDidIt:'You did it!', doAnother:'Do Another', printMyWorksheet:'Print my worksheet', mute:'Mute sounds', unmute:'Turn sounds on', correct:'correct', score:'{n} of {total} correct', progressLabel:'{n} / {total}', firstTryStars:'first-try stars' },
  de: { checkAnswers:'Antworten prüfen', tryAgain:'Erneut versuchen', allCorrect:'Alles richtig!', youDidIt:'Geschafft!', doAnother:'Noch eins', printMyWorksheet:'Mein Arbeitsblatt drucken', mute:'Töne stummschalten', unmute:'Töne einschalten', correct:'richtig', score:'{n} von {total} richtig', progressLabel:'{n} / {total}', firstTryStars:'Sterne im ersten Versuch' },
  es: { checkAnswers:'Comprobar respuestas', tryAgain:'Intentar de nuevo', allCorrect:'¡Todo correcto!', youDidIt:'¡Lo lograste!', doAnother:'Hacer otra', printMyWorksheet:'Imprimir mi hoja', mute:'Silenciar sonidos', unmute:'Activar sonidos', correct:'correctas', score:'{n} de {total} correctas', progressLabel:'{n} / {total}', firstTryStars:'estrellas al primer intento' },
  nl: { checkAnswers:'Antwoorden controleren', tryAgain:'Opnieuw proberen', allCorrect:'Alles goed!', youDidIt:'Gelukt!', doAnother:'Nog een', printMyWorksheet:'Mijn werkblad printen', mute:'Geluid uit', unmute:'Geluid aan', correct:'goed', score:'{n} van {total} goed', progressLabel:'{n} / {total}', firstTryStars:'sterren in eerste poging' },
  fr: { checkAnswers:'Vérifier les réponses', tryAgain:'Réessayer', allCorrect:'Tout est correct !', youDidIt:'Bravo !', doAnother:'Faire une autre', printMyWorksheet:'Imprimer ma fiche', mute:'Couper le son', unmute:'Activer le son', correct:'correct', score:'{n} sur {total} correct', progressLabel:'{n} / {total}', firstTryStars:'étoiles au premier essai' },
  it: { checkAnswers:'Controlla risposte', tryAgain:'Riprova', allCorrect:'Tutto corretto!', youDidIt:'Bravo!', doAnother:"Fai un'altra", printMyWorksheet:'Stampa la mia scheda', mute:'Silenzia suoni', unmute:'Attiva suoni', correct:'corretto', score:'{n} su {total} corretto', progressLabel:'{n} / {total}', firstTryStars:'stelle al primo tentativo' },
  pt: { checkAnswers:'Verificar respostas', tryAgain:'Tentar de novo', allCorrect:'Tudo correto!', youDidIt:'Você conseguiu!', doAnother:'Fazer outra', printMyWorksheet:'Imprimir minha atividade', mute:'Silenciar sons', unmute:'Ativar sons', correct:'correto', score:'{n} de {total} correto', progressLabel:'{n} / {total}', firstTryStars:'estrelas na primeira tentativa' },
  sv: { checkAnswers:'Kontrollera svar', tryAgain:'Försök igen', allCorrect:'Allt rätt!', youDidIt:'Du klarade det!', doAnother:'Gör en till', printMyWorksheet:'Skriv ut mitt arbetsblad', mute:'Stäng av ljud', unmute:'Slå på ljud', correct:'rätt', score:'{n} av {total} rätt', progressLabel:'{n} / {total}', firstTryStars:'stjärnor på första försöket' },
  da: { checkAnswers:'Kontroller svar', tryAgain:'Prøv igen', allCorrect:'Alt rigtigt!', youDidIt:'Du klarede det!', doAnother:'Lav en til', printMyWorksheet:'Udskriv mit arbejdsark', mute:'Slå lyd fra', unmute:'Slå lyd til', correct:'rigtigt', score:'{n} ud af {total} rigtigt', progressLabel:'{n} / {total}', firstTryStars:'stjerner i første forsøg' },
  no: { checkAnswers:'Sjekk svar', tryAgain:'Prøv igjen', allCorrect:'Alt riktig!', youDidIt:'Du klarte det!', doAnother:'Gjør en til', printMyWorksheet:'Skriv ut arbeidsarket', mute:'Slå av lyd', unmute:'Slå på lyd', correct:'riktig', score:'{n} av {total} riktig', progressLabel:'{n} / {total}', firstTryStars:'stjerner på første forsøk' },
  fi: { checkAnswers:'Tarkista vastaukset', tryAgain:'Yritä uudelleen', allCorrect:'Kaikki oikein!', youDidIt:'Sinä teit sen!', doAnother:'Tee toinen', printMyWorksheet:'Tulosta työarkkini', mute:'Mykistä äänet', unmute:'Avaa äänet', correct:'oikein', score:'{n}/{total} oikein', progressLabel:'{n} / {total}', firstTryStars:'tähteä ensimmäisellä yrityksellä' }
};

// Per-app title × locale (trimmed list — only the apps that have been published in non-en).
// Pre-baked from the same table used in scripts/add-runtime-title-per-app.js.
var APP_TITLES = {
  'addition':         { en:'Addition Practice',     de:'Additionsübung',          es:'Práctica de Sumas', nl:'Optellen oefenen', fr:"Exercices d'addition", it:'Esercizi di addizione', pt:'Prática de Adição', sv:'Additionsövning', da:'Additionsøvelse', no:'Addisjonsøving', fi:'Yhteenlaskuharjoitus' },
  'subtraction':      { en:'Subtraction Practice',  de:'Subtraktionsübung',       es:'Práctica de Restas', nl:'Aftrekken oefenen', fr:'Exercices de soustraction', it:'Esercizi di sottrazione', pt:'Prática de Subtração', sv:'Subtraktionsövning', da:'Subtraktionsøvelse', no:'Subtraksjonsøving', fi:'Vähennyslaskuharjoitus' },
  'code-addition':    { en:'Code Addition Practice', de:'Code-Additions-Übung',   es:'Práctica de Sumas con Código', nl:'Codeoptellen oefenen', fr:"Exercices d'addition codée", it:'Esercizi di addizione in codice', pt:'Prática de Adição com Código', sv:'Kodadditionsövning', da:'Kodeadditionsøvelse', no:'Kodeaddisjonsøving', fi:'Koodiyhteenlaskuharjoitus' },
  'more-less':        { en:'More or Less Practice', de:'Mehr-oder-weniger-Übung', es:'Práctica de Más o Menos', nl:'Meer of minder oefenen', fr:'Exercice plus ou moins', it:'Esercizi di più o meno', pt:'Prática de Mais ou Menos', sv:'Mer eller mindre-övning', da:'Mere eller mindre-øvelse', no:'Mer eller mindre-øving', fi:'Enemmän tai vähemmän -harjoitus' },
  'big-small':        { en:'Big or Small?', de:'Groß oder klein?', es:'¿Grande o pequeño?', nl:'Groot of klein?', fr:'Grand ou petit ?', it:'Grande o piccolo?', pt:'Grande ou pequeno?', sv:'Stor eller liten?', da:'Stor eller lille?', no:'Stor eller liten?', fi:'Iso vai pieni?' },
  'math-puzzle':      { en:'Math Puzzle Practice', de:'Mathe-Puzzle-Übung', es:'Práctica de Rompecabezas Matemático', nl:'Wiskundepuzzel oefenen', fr:'Exercices de puzzle mathématique', it:'Esercizi col puzzle matematico', pt:'Prática de Quebra-Cabeça de Matemática', sv:'Matematikpussel-övning', da:'Matematikpuslespil-øvelse', no:'Mattepuslespill-øving', fi:'Matematiikkapalapeli-harjoitus' },
  'math-worksheet':   { en:'Math Worksheet Practice', de:'Mathe-Arbeitsblatt-Übung', es:'Práctica de Hoja de Matemáticas', nl:'Wiskundewerkblad oefenen', fr:'Exercice de fiche de maths', it:'Esercizi di matematica', pt:'Prática de Atividade de Matemática', sv:'Mattearbetsblad-övning', da:'Matematikøvelsesark', no:'Matteoppgaveark-øving', fi:'Matematiikkatehtävä-harjoitus' },
  'alphabet-train':   { en:'Alphabet Train Practice', de:'Alphabet-Zug Übung', es:'Práctica del Tren del Abecedario', nl:'Alfabettrein oefenen', fr:'Exercice du Train Alphabet', it:'Esercizi col Treno Alfabetico', pt:'Prática do Trem do Alfabeto', sv:'Alfabetståg-övning', da:'Alfabettog-øvelse', no:'Alfabettog-øving', fi:'Aakkosjuna-harjoitus' },
  'pattern-train':    { en:'Pattern Train Practice', de:'Muster-Zug-Übung', es:'Práctica del Tren de Patrones', nl:'Patroontrein oefenen', fr:'Exercices du train à motifs', it:'Esercizi col treno dei modelli', pt:'Prática do Trem de Padrões', sv:'Mönstertåg-övning', da:'Mønstertog-øvelse', no:'Mønstertog-øving', fi:'Kuvio-juna-harjoitus' },
  'pattern-worksheet':{ en:'Complete the Pattern', de:'Vervollständige das Muster', es:'Completa el Patrón', nl:'Maak het patroon af', fr:'Complète le motif', it:'Completa il modello', pt:'Complete o Padrão', sv:'Fyll i Mönstret', da:'Færdiggør Mønstret', no:'Fullfør Mønsteret', fi:'Täydennä Kuvio' },
  'prepositions':     { en:'Prepositions Practice', de:'Präpositionen-Übung', es:'Práctica de Preposiciones', nl:'Voorzetsels oefenen', fr:'Exercices de prépositions', it:'Esercizi di preposizioni', pt:'Prática de Preposições', sv:'Prepositionsövning', da:'Præpositionsøvelse', no:'Preposisjonsøving', fi:'Prepositioharjoitus' },
  'word-guess':       { en:'Word Guess Practice', de:'Wörter-Raten-Übung', es:'Práctica de Adivinar Palabras', nl:'Woordraden oefenen', fr:'Exercices devine le mot', it:'Esercizi indovina la parola', pt:'Prática de Adivinhar Palavras', sv:'Gissa ordet-övning', da:'Gæt ordet-øvelse', no:'Gjett ordet-øving', fi:'Arvaa sana -harjoitus' },
  'word-scramble':    { en:'Word Scramble Practice', de:'Wörter-Mix-Übung', es:'Práctica de Palabras Desordenadas', nl:'Woorddoorelkaar oefenen', fr:'Exercices mots mélangés', it:'Esercizi parole mescolate', pt:'Prática de Palavras Embaralhadas', sv:'Bokstavskramla-övning', da:'Bogstavsalat-øvelse', no:'Bokstavkrøll-øving', fi:'Sanasekoitus-harjoitus' },
  'wordsearch':       { en:'Word Search', de:'Buchstabensalat', es:'Sopa de Letras', nl:'Woordzoeker', fr:'Mots Mêlés', it:'Trova le Parole', pt:'Caça-Palavras', sv:'Korsord (Sök ord)', da:'Find ord', no:'Finn ord', fi:'Sanahaku' },
  'cryptogram':       { en:'Cryptogram Practice', de:'Kryptogramm-Übung', es:'Práctica de Criptograma', nl:'Cryptogram oefenen', fr:'Exercices de cryptogramme', it:'Esercizi di crittogramma', pt:'Prática de Criptograma', sv:'Kryptogramövning', da:'Kryptogramøvelse', no:'Kryptogramøving', fi:'Salakirjoitusharjoitus' },
  'crossword':        { en:'Crossword', de:'Kreuzworträtsel', es:'Crucigrama', nl:'Kruiswoordpuzzel', fr:'Mots croisés', it:'Cruciverba', pt:'Palavras Cruzadas', sv:'Korsord', da:'Krydsord', no:'Kryssord', fi:'Ristisanat' },
  'bingo':            { en:'Picture Bingo', de:'Bilder-Bingo', es:'Bingo de Imágenes', nl:'Plaatjesbingo', fr:"Loto d'images", it:'Tombola di Immagini', pt:'Bingo de Imagens', sv:'Bildbingo', da:'Billedbanko', no:'Bildebingo', fi:'Kuvabingo' },
  'chart-count':      { en:'Picture Graph', de:'Bilddiagramm', es:'Gráfico de Imágenes', nl:'Beeldgrafiek', fr:"Graphique d'images", it:'Grafico di Immagini', pt:'Gráfico de Imagens', sv:'Bilddiagram', da:'Billeddiagram', no:'Bildediagram', fi:'Kuvakaavio' },
  'matching':         { en:'Match Up', de:'Verbinden', es:'Emparejar', nl:'Verbinden', fr:'Associer', it:'Abbinare', pt:'Combinar', sv:'Para ihop', da:'Sæt sammen', no:'Sett sammen', fi:'Yhdistä' },
  'shadow-match':     { en:'Shadow Match', de:'Schatten-Zuordnung', es:'Emparejar Sombras', nl:'Schaduwen matchen', fr:"Associations d'ombres", it:'Abbinamento di Ombre', pt:'Combinar Sombras', sv:'Skuggmatchning', da:'Skyggematch', no:'Skyggematch', fi:'Varjojen yhdistäminen' },
  'grid-match':       { en:'Grid Match', de:'Raster-Zuordnung', es:'Emparejar en Cuadrícula', nl:'Rastermatch', fr:'Associations en grille', it:'Abbinamento a Griglia', pt:'Combinar em Grade', sv:'Rutmatchning', da:'Gittermatch', no:'Rutenettmatch', fi:'Ruudukon yhdistäminen' },
  'find-and-count':   { en:'Find and Count', de:'Suchen und Zählen', es:'Encuentra y Cuenta', nl:'Zoeken en Tellen', fr:'Trouve et Compte', it:'Trova e Conta', pt:'Encontre e Conte', sv:'Hitta och Räkna', da:'Find og Tæl', no:'Finn og Tell', fi:'Etsi ja Laske' },
  'find-objects':     { en:'Find the Objects', de:'Finde die Gegenstände', es:'Encuentra los Objetos', nl:'Zoek de Voorwerpen', fr:'Trouve les Objets', it:'Trova gli Oggetti', pt:'Encontre os Objetos', sv:'Hitta Föremålen', da:'Find Genstandene', no:'Finn Gjenstandene', fi:'Etsi Esineet' },
  'odd-one-out':      { en:'Odd One Out', de:'Was passt nicht?', es:'El que sobra', nl:'Welke hoort er niet bij?', fr:"L'intrus", it:"L'intruso", pt:'Qual é o diferente?', sv:'Vilken passar inte in?', da:'Hvilken passer ikke?', no:'Hvilken passer ikke?', fi:'Mikä ei kuulu joukkoon?' },
  'missing-pieces':   { en:'Missing Pieces', de:'Fehlende Teile', es:'Piezas que Faltan', nl:'Ontbrekende Stukken', fr:'Pièces Manquantes', it:'Pezzi Mancanti', pt:'Peças Faltantes', sv:'Saknade Bitar', da:'Manglende Brikker', no:'Manglende Brikker', fi:'Puuttuvat Palat' },
  'picture-path':     { en:'Picture Path', de:'Bilderpfad', es:'Camino de Imágenes', nl:'Plaatjespad', fr:"Chemin d'images", it:'Percorso di Immagini', pt:'Caminho de Imagens', sv:'Bildstig', da:'Billedsti', no:'Bildesti', fi:'Kuvapolku' },
  'picture-sort':     { en:'Picture Sort', de:'Bilder sortieren', es:'Clasificar Imágenes', nl:'Plaatjes sorteren', fr:'Trier les images', it:'Ordina le immagini', pt:'Classificar Imagens', sv:'Sortera bilder', da:'Sortér billeder', no:'Sorter bilder', fi:'Lajittele kuvat' },
  'sudoku':           { en:'Picture Sudoku', de:'Bilder-Sudoku', es:'Sudoku de Imágenes', nl:'Plaatjessudoku', fr:"Sudoku d'images", it:'Sudoku di Immagini', pt:'Sudoku de Imagens', sv:'Bildsudoku', da:'Billedsudoku', no:'Bildesudoku', fi:'Kuvasudoku' },
  'treasure-hunt':    { en:'Treasure Hunt', de:'Schatzsuche', es:'Búsqueda del Tesoro', nl:'Schattenjacht', fr:'Chasse au Trésor', it:'Caccia al Tesoro', pt:'Caça ao Tesouro', sv:'Skattjakt', da:'Skattejagt', no:'Skattejakt', fi:'Aarteenmetsästys' }
};

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function buildRuntimeStringsForDeck(locale, appType) {
  var shared = SHARED_RUNTIME[locale] || SHARED_RUNTIME.en;
  var titles = APP_TITLES[appType];
  var title = (titles && titles[locale]) || (titles && titles.en) || appType;
  var rs = {
    title: title,
    checkAnswers: shared.checkAnswers,
    check: shared.checkAnswers,  // alias for Family B/C apps
    tryAgain: shared.tryAgain,
    youDidIt: shared.youDidIt,
    doAnother: shared.doAnother,
    printMyWorksheet: shared.printMyWorksheet,
    mute: shared.mute,
    unmute: shared.unmute,
    correct: shared.correct,
    score: shared.score,
    allCorrect: shared.allCorrect,
    progressLabel: shared.progressLabel,
    firstTryStars: shared.firstTryStars
  };
  return rs;
}

function processDeck(filePath, dryRun) {
  var html;
  try {
    html = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return { file: filePath, action: 'skip-read-error' };
  }

  // Parse contentLanguage + appType from DECK_BUNDLE
  var langMatch = html.match(/"contentLanguage"\s*:\s*"([a-z]{2})"/);
  if (!langMatch) return { file: filePath, action: 'skip-no-lang' };
  var locale = langMatch[1];
  if (locale === 'en') return { file: filePath, action: 'skip-en' };

  var appMatch = html.match(/"appType"\s*:\s*"([a-z-]+)"/);
  if (!appMatch) return { file: filePath, action: 'skip-no-app' };
  var appType = appMatch[1];

  if (!APP_TITLES[appType]) return { file: filePath, action: 'skip-unknown-app', appType: appType };
  // No global idempotency check — each transformation below is individually idempotent.
  // Allows re-running to fix decks that got partial retrofit on prior pass.

  var rs = buildRuntimeStringsForDeck(locale, appType);
  var rsJson = JSON.stringify(rs);

  // 1) Inject runtimeStrings into DECK_BUNDLE + update DECK_BUNDLE.title to localized.
  //    Pattern: var DECK_BUNDLE = { ... };<\/script>
  //    Operations: replace "title":"Addition Practice" (or whatever) -> "title":"<localized>";
  //                append ,"runtimeStrings":{...} before the closing brace.
  var bundleRe = /(var\s+DECK_BUNDLE\s*=\s*\{)([\s\S]*?)(\}\s*;\s*<\/script>)/;
  if (!bundleRe.test(html)) return { file: filePath, action: 'skip-no-bundle' };
  html = html.replace(bundleRe, function (m, head, body, tail) {
    // Update DECK_BUNDLE.title to localized (idempotent — replaces any value)
    body = body.replace(/("title"\s*:\s*")[^"]*(")/, '$1' + rs.title.replace(/"/g, '\\"') + '$2');
    // Append runtimeStrings field if not already present
    if (body.indexOf('"runtimeStrings"') === -1) {
      var trimmed = body.replace(/[,\s]*$/, '');
      body = trimmed + ',"runtimeStrings":' + rsJson;
    }
    return head + body + tail;
  });

  // 2) Replace hardcoded button text patterns in HTML
  var checkBtnRe = /(<button[^>]*id="lcs-check"[^>]*>)Check Answers(<\/button>)/g;
  html = html.replace(checkBtnRe, '$1' + escapeHtml(rs.checkAnswers) + '$2');
  var resetBtnRe = /(<button[^>]*id="lcs-reset"[^>]*>)Try Again(<\/button>)/g;
  html = html.replace(resetBtnRe, '$1' + escapeHtml(rs.tryAgain) + '$2');

  // 3) Replace title strip if it contains the English literal
  var enTitle = APP_TITLES[appType].en;
  if (enTitle) {
    var titleRe = new RegExp('(id="lcs-title"[^>]*>)' + enTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(<)', 'g');
    html = html.replace(titleRe, '$1' + escapeHtml(rs.title) + '$2');
  }

  // 4) Inject locale entry into STRINGS object inside the runtime so T() returns
  //    localized strings for "You did it!" / "Do Another" / "Print my worksheet" / etc.
  //    Pattern: var STRINGS={en:{...}};  -> add ,<locale>:{...}
  //    The runtime's T() does STRINGS[loc] || STRINGS.en, so adding the locale
  //    block makes T() pick localized first.
  //    Idempotent: skip if `<locale>:{` already present in STRINGS scope.
  var stringsScopeRe = new RegExp('var\\s+STRINGS\\s*=\\s*\\{[\\s\\S]{0,5000}?' + locale + '\\s*:\\s*\\{');
  if (locale !== 'en' && !stringsScopeRe.test(html)) {
    // Build per-locale entry mirroring the en object's KEYS but with our localized values.
    // Match en{...} bracket-balanced from inside STRINGS={...}.
    var stringsRe = /(var\s+STRINGS\s*=\s*\{)/;
    var stringsMatch = stringsRe.exec(html);
    if (stringsMatch) {
      // Find en:{ position relative to STRINGS={
      var afterStrings = html.indexOf('en:{', stringsMatch.index);
      if (afterStrings !== -1 && afterStrings < stringsMatch.index + 100) {
        // Walk en object to find its closing }
        var enOpenBrace = html.indexOf('{', afterStrings);
        var depth2 = 0, inStr2 = false, esc2 = false;
        var enCloseIdx = -1;
        for (var i2 = enOpenBrace; i2 < html.length && i2 < enOpenBrace + 5000; i2++) {
          var c2 = html[i2];
          if (esc2) { esc2 = false; continue; }
          if (c2 === '\\') { esc2 = true; continue; }
          if (c2 === '"') { inStr2 = !inStr2; continue; }
          if (inStr2) continue;
          if (c2 === '{') depth2++;
          else if (c2 === '}') { depth2--; if (depth2 === 0) { enCloseIdx = i2; break; } }
        }
        if (enCloseIdx !== -1) {
          // Build localized entry — match shape of en object's keys.
          // Extract en object text to discover its keys + use rs values.
          var enBody = html.slice(enOpenBrace + 1, enCloseIdx);
          // Parse keys from en body (simple regex; values may contain {} but keys are plain identifiers)
          var keyRe = /(\w+)\s*:/g;
          var keyMatches;
          var localeEntries = [];
          while ((keyMatches = keyRe.exec(enBody)) !== null) {
            var k = keyMatches[1];
            // Check if this is a top-level key (depth 0 of enBody)
            var prefix = enBody.slice(0, keyMatches.index);
            var pdepth = 0, pstr = false, pesc = false;
            for (var pi = 0; pi < prefix.length; pi++) {
              var pc = prefix[pi];
              if (pesc) { pesc = false; continue; }
              if (pc === '\\') { pesc = true; continue; }
              if (pc === '"') { pstr = !pstr; continue; }
              if (pstr) continue;
              if (pc === '{') pdepth++;
              else if (pc === '}') pdepth--;
            }
            if (pdepth !== 0) continue;
            // Map to rs value if present
            if (Object.prototype.hasOwnProperty.call(rs, k)) {
              localeEntries.push(k + ':' + JSON.stringify(rs[k]));
            }
          }
          if (localeEntries.length > 0) {
            var localeJsonEntry = ',' + locale + ':{' + localeEntries.join(',') + '}';
            html = html.slice(0, enCloseIdx + 1) + localeJsonEntry + html.slice(enCloseIdx + 1);
          }
        }
      }
    }
  }

  if (dryRun) {
    return { file: filePath, action: 'would-rewrite', locale: locale, app: appType };
  }

  var tmpPath = filePath + '.tmp';
  try {
    fs.writeFileSync(tmpPath, html, 'utf8');
    fs.renameSync(tmpPath, filePath);
  } catch (e) {
    try { fs.unlinkSync(tmpPath); } catch (_) {}
    return { file: filePath, action: 'write-error', note: e.message };
  }
  return { file: filePath, action: 'rewritten', locale: locale, app: appType };
}

function walkDecks(rootDir) {
  var results = [];
  function walk(dir, depth) {
    var entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }
    entries.forEach(function (e) {
      var fp = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (depth < 4 && !e.name.startsWith('.')) walk(fp, depth + 1);
      } else if (e.isFile() && e.name === 'deck.html') {
        results.push(fp);
      }
    });
  }
  walk(rootDir, 0);
  return results;
}

function main() {
  var args = process.argv.slice(2);
  var dryRun = args.includes('--dry-run');
  var rootDir = args.filter(function (a) { return !a.startsWith('--'); })[0];
  if (!rootDir) {
    console.error('USAGE: node scripts/publish-cli/rewrite-deck-html-runtime-strings.js <directory> [--dry-run]');
    process.exit(2);
  }
  rootDir = path.resolve(rootDir);
  console.log('rewrite-deck-html-runtime-strings — ' + (dryRun ? 'DRY-RUN' : 'APPLY'));
  console.log('  root:', rootDir);

  var files = walkDecks(rootDir);
  console.log('  deck.html files:', files.length);
  console.log('');

  var counts = {};
  files.forEach(function (f, idx) {
    var r = processDeck(f, dryRun);
    counts[r.action] = (counts[r.action] || 0) + 1;
    if ((idx + 1) % 200 === 0) console.log('  ' + (idx + 1) + '/' + files.length + ' processed');
  });

  console.log('');
  console.log('=== Summary ===');
  Object.keys(counts).forEach(function (k) { console.log('  ' + k + ': ' + counts[k]); });
}

if (require.main === module) main();
