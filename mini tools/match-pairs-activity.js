/* =====================================================================
   MATCH PAIRS — ACTIVITY   (match-pairs-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of match-pairs. Reuses match-pairs-core.js for
   the DOM/paint/state.

   Task source:
   • ?activity=<id>   → fetches match-pairs-activities.json, finds row,
                         instantiates tasks from row.task_template +
                         row.params.tasks.
   • no ?activity     → falls back to a static demo set.

   First task_template: 'make-n' — for each {target, cards} task in
   row.params.tasks, builds a "Make N" task whose check function asserts
   every pair in tool.pairsFormed sums to target.

   On correct Check, the activity calls MatchPairsCore.speakAllPairs()
   so the kid hears "All pairs make 5!" — the celebration of having
   found multiple decompositions, which is the K.OA.A.3 teaching point.
   ===================================================================== */

/* Localized chrome strings. EN base-locale only this commission; future
   locale fan-outs add entries under each key per the §A.13.48 plan-mode-
   per-locale discipline. */
var ACTIVITY_STRINGS_MP = {
  taskMakeN:       { en: 'Make {n}',                                                de: 'Bilde {n}',                                                                                            es: 'Forma {n}',                                                                                            it: 'Forma {n}',                                                                                                            fr: 'Compose {n}',                                                                                                                                                       pt: 'Forme {n}',                                                                                                                                                                                                                            nl: 'Maak {n}',                                                                                                                       sv: 'Gör {n}',                                                                                                              da: 'Lav {n}',                                                                                                              no: 'Lag {n}',                                                                                                              fi: 'Tee {n}' },
  hintFormPairs:   { en: 'Tap a number, then tap its partner',                      de: 'Tippe auf eine Zahl, dann auf ihren Partner',                                                          es: 'Toca un número, luego toca su pareja',                                                                 it: 'Tocca un numero, poi tocca il suo compagno',                                                                           fr: 'Touche un nombre, puis touche son partenaire',                                                                                                                      pt: 'Toque em um número, depois toque no par dele',                                                                                                                                                                                         nl: 'Tik op een getal, dan op zijn partner',                                                                                          sv: 'Tryck på ett tal, sedan på dess kompis',                                                                               da: 'Tryk på et tal, derefter på dets makker',                                                                              no: 'Trykk på et tall, deretter på makkeren',                                                                               fi: 'Paina numeroa, sitten paina sen paria' },
  hintTryDifferent:{ en: 'Some pairs don\'t add up — tap a pair to break it and try again',
                     de: 'Manche Paare ergeben nicht das Ziel — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                     es: 'Algunas parejas no forman el objetivo — toca una pareja para deshacerla e inténtalo de nuevo',
                     it: 'Alcune coppie non vanno — tocca una coppia per scioglierla e riprova',
                     fr: 'Certaines paires ne font pas l\'objectif — touche une paire pour la défaire et réessaie',
                     pt: 'Alguns pares não fazem o objetivo — toque em um par para desfazê-lo e tente novamente',
                     nl: 'Sommige paren maken het doel niet — tik op een paar om het te ontkoppelen en probeer opnieuw',
                     sv: 'Vissa par når inte målet — tryck på ett par för att lösa upp det och försök igen',
                     da: 'Nogle par når ikke målet — tryk på et par for at løse det op og prøv igen',
                     no: 'Noen par når ikke målet — trykk på et par for å løse det opp og prøv igjen',
                     fi: 'Jotkin parit eivät yllä tavoitteeseen — paina paria avataksesi sen ja yritä uudelleen' },

  /* ---- equal-value template (1.OA.D.7) chrome. The kid works out each
     card (results are HIDDEN) and matches the addition to the subtraction
     with the SAME answer; each task has two pairs with two DIFFERENT answers.
     EN base-locale only this commission; the 10-locale fan-out adds entries
     per §A.13.48. The activity ships slug.en only, so it loads at lang='en'
     exclusively until fan-out — these EN-only keys are never read at any
     other lang (no key-leak). ---- */
  taskEqualValue:     { en: 'Match each addition to the subtraction with the same answer',
                        de: 'Finde zu jeder Plusaufgabe die Minusaufgabe mit demselben Ergebnis',
                        fr: 'Relie chaque addition à la soustraction qui a le même résultat',
                        es: 'Relaciona cada suma con la resta que tiene el mismo resultado',
                        it: 'Collega ogni addizione alla sottrazione che ha lo stesso risultato',
                        pt: 'Combine cada adição com a subtração que tem o mesmo resultado',
                        da: 'Forbind hvert plusstykke med det minusstykke, der har samme resultat',
                        no: 'Koble hver plussoppgave til minusoppgaven som har samme resultat',
                        sv: 'Koppla ihop varje plusuppgift med minusuppgiften som har samma resultat',
                        fi: 'Yhdistä jokainen yhteenlasku vähennyslaskuun, jolla on sama tulos',
                        nl: 'Verbind elke optelsom met de aftreksom die dezelfde uitkomst heeft' },
  hintEqualValue:     { en: 'Work out each card, then match the ones with the same answer',
                        de: 'Rechne jede Karte aus und verbinde die mit demselben Ergebnis',
                        fr: 'Calcule chaque carte, puis relie celles qui ont le même résultat',
                        es: 'Calcula cada tarjeta y relaciona las que tienen el mismo resultado',
                        it: 'Calcola ogni carta e collega quelle con lo stesso risultato',
                        pt: 'Calcule cada carta e combine as que têm o mesmo resultado',
                        da: 'Regn hvert kort ud, og forbind dem, der har samme resultat',
                        no: 'Regn ut hvert kort, og koble dem som har samme resultat',
                        sv: 'Räkna ut varje kort och koppla ihop dem som har samma resultat',
                        fi: 'Laske kortit ja yhdistä ne, joilla on sama tulos',
                        nl: 'Reken elke kaart uit en verbind de kaarten met dezelfde uitkomst' },
  hintTryEqualValue:  { en: 'Those answers aren\'t equal yet — tap a pair to break it and try again',
                        de: 'Die Ergebnisse passen noch nicht — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                        fr: 'Ces résultats ne sont pas encore égaux — touche une paire pour la défaire et réessaie',
                        es: 'Esos resultados aún no son iguales — toca una pareja para deshacerla e inténtalo de nuevo',
                        it: 'Questi risultati non sono ancora uguali — tocca una coppia per scioglierla e riprova',
                        pt: 'Esses resultados ainda não são iguais — toque em um par para desfazê-lo e tente novamente',
                        da: 'Resultaterne er ikke ens endnu — tryk på et par for at løse det op og prøv igen',
                        no: 'Resultatene er ikke like ennå — trykk på et par for å løse det opp og prøv igjen',
                        sv: 'Resultaten är inte lika än — tryck på ett par för att lösa upp det och försök igen',
                        fi: 'Tulokset eivät ole vielä samat — paina paria avataksesi sen ja yritä uudelleen',
                        nl: 'De uitkomsten zijn nog niet gelijk — tik op een paar om het te ontkoppelen en probeer opnieuw' },
  /* Truthful Check-correct celebration. Does NOT claim a number total — a
     task has TWO different answers, so "All pairs make 5!" would be false.
     The shell shows its visual "Great!"; this is the spoken line. EN-only. */
  speakMatchedAll:    { en: 'You matched every pair!',
                        de: 'Du hast alle Paare verbunden!',
                        fr: 'Tu as relié toutes les paires !',
                        es: '¡Has relacionado todas las parejas!',
                        it: 'Hai collegato tutte le coppie!',
                        pt: 'Você combinou todos os pares!',
                        da: 'Du har forbundet alle par!',
                        no: 'Du har koblet sammen alle par!',
                        sv: 'Du har kopplat ihop alla par!',
                        fi: 'Yhdistit kaikki parit!',
                        nl: 'Je hebt alle paren verbonden!' },

  /* ---- three-form template (2.NBT.A.3) chrome. The kid matches cards that
     show the SAME number across numeral / expanded-form / number-word
     representations. Each task has 3 pairs with 3 DIFFERENT numbers, so each
     value maps to exactly two cards → every match is unique, no false-correct.
     Per-locale fan-out adds entries per §A.13.48; register matched to each
     locale's live E4 (K.OA.A.3 + 1.OA.D.7). ---- */
  taskThreeForm:      { en: 'Match the cards that show the same number',
                        de: 'Finde die Karten, die dieselbe Zahl zeigen',
                        fr: 'Relie les cartes qui montrent le même nombre',
                        da: 'Forbind kortene, der viser det samme tal' },
  hintThreeForm:      { en: 'Tap a card, then tap another card that shows the same number',
                        de: 'Tippe auf eine Karte, dann auf eine andere Karte mit derselben Zahl',
                        fr: 'Touche une carte, puis une autre carte qui montre le même nombre',
                        da: 'Tryk på et kort, derefter på et andet kort, der viser det samme tal' },
  hintTryThreeForm:   { en: 'Some cards don\'t show the same number yet — tap a pair to break it and try again',
                        de: 'Manche Karten zeigen noch nicht dieselbe Zahl — tippe ein Paar an, um es zu trennen, und versuch\'s nochmal',
                        fr: 'Certaines cartes ne montrent pas encore le même nombre — touche une paire pour la défaire et réessaie',
                        da: 'Nogle kort viser ikke det samme tal endnu — tryk på et par for at løse det op og prøv igen' },
  /* Check-correct celebration, spoken AFTER the three matched number-words are
     read aloud. Number-free + truthful (a task has three different numbers). */
  speakThreeFormDone: { en: 'You matched every number!',
                        de: 'Du hast alle Zahlen verbunden!',
                        fr: 'Tu as relié tous les nombres !',
                        da: 'Du har forbundet alle tal!' }
};

/* Fallback static task set when no ?activity= is given. Same shape as
   the manifest's params.tasks array. */
var STATIC_DEMO_TASKS_MP = makeMatchTasks([
  { target: 3, cards: [0, 3, 1, 2] },
  { target: 5, cards: [0, 5, 1, 4, 2, 3] }
], 'demo');

function makeMatchTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var target = t.target;
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.make-' + target + '-' + i,
      promptKey: 'taskMakeN',
      promptArgs: { n: target },
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ target: target, cards: cards });
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every pair sums to target. */
        if (!tool.allPaired()) return false;
        for (var i = 0; i < tool.pairsFormed.length; i++) {
          var p = tool.pairsFormed[i];
          var sum = tool.cards[p[0]] + tool.cards[p[1]];
          if (sum !== target) {
            /* Mark wrong pairs visually + speak nudge. */
            tool.markWrongPairs();
            tool.speakTryAgain();
            return false;
          }
        }
        /* Correct! Lock the board + speak celebration. */
        tool.readOnly = true;
        tool.paint();
        tool.speakAllPairs();
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintFormPairs';
        return 'hintTryDifferent';
      }
    };
  });
}

/* task_template 'equal-value' (1.OA.D.7) — the kid works out each card
   (results are HIDDEN in `display`, e.g. "2 + 3" / "6 − 1") and matches the
   addition to the subtraction with the SAME answer. Each task has two pairs
   with two DIFFERENT answers, so each value maps to exactly one addition +
   one subtraction → every match is unique and there is no false-correct
   configuration. Cards are {display, kind, value} objects; validity is
   `a.value === b.value`. No single target → no banner (core omits it for
   object cards) and the celebration is number-free ("You matched every
   pair!"). The numeric make-n (K.OA.A.3) path is unaffected. */
function makeEqualValueTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskEqualValue',
      answerType: 'state',
      setup: function (tool) {
        tool.setupTask({ cards: cards });   /* no single target */
        tool.render();   /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two
           cards of EQUAL value (the addition and the subtraction that share
           an answer). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          /* Mark mismatched pairs visually + speak the gentle nudge. This
             template sets wrongIdxSet directly (core markWrongPairs is
             sum-based and unused here). */
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board + speak a TRUTHFUL, number-free
           celebration (a task has two different answers, so "All pairs make
           {n}!" would be false). */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var done = (tool.strings.speakMatchedAll && tool.strings.speakMatchedAll[tool.language])
                     || tool.strings.speakMatchedAll.en;
          window.LCSAudio.speak({ type: 'ui', text: done, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintEqualValue';
        return 'hintTryEqualValue';
      }
    };
  });
}

/* Value-verified number-words (the 15 values used by
   match-pairs.three-ways-to-show-a-number), per locale. Each locale's entries
   EQUAL PlaceValueCore._NUMBER_WORD_HELPERS.<locale>(n, 'cardinal') — copied as
   a flat lookup per the locked engine-decoupling doctrine — NO PlaceValueCore
   import (§0.4 / feedback_cognate_aware_verify_discipline.md). The word-card
   DISPLAY is sourced from this table at render time (the manifest's word-card
   display is a language-neutral placeholder); numeral + expanded cards stay
   language-neutral. New locales add one block here, value-verified at build. */
var THREE_FORM_WORDS = {
  en: {
    247: 'two hundred forty-seven',  562: 'five hundred sixty-two',  305: 'three hundred five',
    836: 'eight hundred thirty-six', 481: 'four hundred eighty-one', 420: 'four hundred twenty',
    615: 'six hundred fifteen',      700: 'seven hundred',           208: 'two hundred eight',
    353: 'three hundred fifty-three',940: 'nine hundred forty',      190: 'one hundred ninety',
    560: 'five hundred sixty',       274: 'two hundred seventy-four', 409: 'four hundred nine'
  },
  /* DE: units-first single-word (zweihundertsiebenundvierzig); einhundert
     convention; ß; sechzig/siebzig. Value-verified vs _NUMBER_WORD_HELPERS.de
     2026-05-31 (15/15). */
  de: {
    247: 'zweihundertsiebenundvierzig', 562: 'fünfhundertzweiundsechzig',  305: 'dreihundertfünf',
    836: 'achthundertsechsunddreißig',  481: 'vierhunderteinundachtzig',   420: 'vierhundertzwanzig',
    615: 'sechshundertfünfzehn',        700: 'siebenhundert',              208: 'zweihundertacht',
    353: 'dreihundertdreiundfünfzig',   940: 'neunhundertvierzig',         190: 'einhundertneunzig',
    560: 'fünfhundertsechzig',          274: 'zweihundertvierundsiebzig',  409: 'vierhundertneun'
  },
  /* FR: classic convention — space at the hundred boundary, hyphens within the
     sub-99 tail (deux cent quarante-sept); cent→cents only on round ×100 (sept
     cents); vigesimal 70s/90s; bare "cent" for h=1. Value-verified vs
     _NUMBER_WORD_HELPERS.fr 2026-05-31 (15/15). */
  fr: {
    247: 'deux cent quarante-sept',  562: 'cinq cent soixante-deux',      305: 'trois cent cinq',
    836: 'huit cent trente-six',     481: 'quatre cent quatre-vingt-un',  420: 'quatre cent vingt',
    615: 'six cent quinze',          700: 'sept cents',                   208: 'deux cent huit',
    353: 'trois cent cinquante-trois',940: 'neuf cent quarante',          190: 'cent quatre-vingt-dix',
    560: 'cinq cent soixante',       274: 'deux cent soixante-quatorze',  409: 'quatre cent neuf'
  },
  /* DA: spaced " og " joiner (tohundrede og syvogfyrre — NOT compound);
     units-first tens (syvogfyrre = 7+og+40); vigesimal halvtreds/tres/
     halvfjerds/firs/halvfems (50/60/70/80/90); fyrre=40 (not vigesimal);
     bare "hundrede" for h=1. Value-verified vs _NUMBER_WORD_HELPERS.da
     2026-05-31 (15/15). [NSR-FLAG][da] */
  da: {
    247: 'tohundrede og syvogfyrre',    562: 'femhundrede og toogtres',        305: 'trehundrede og fem',
    836: 'ottehundrede og seksogtredive',481: 'firehundrede og enogfirs',       420: 'firehundrede og tyve',
    615: 'sekshundrede og femten',      700: 'syvhundrede',                    208: 'tohundrede og otte',
    353: 'trehundrede og treoghalvtreds',940: 'nihundrede og fyrre',            190: 'hundrede og halvfems',
    560: 'femhundrede og tres',         274: 'tohundrede og fireoghalvfjerds',  409: 'firehundrede og ni'
  }
};

/* Anti-predictability placement for three-form. The board is 6 cards in a
   responsive grid (2-col <600px, 3-col ≥600px). A plain shuffle frequently
   leaves a number's two cards visually stacked in one column ("every column is a
   pair" → kid matches top↔bottom without reading each card). 6 slots can't make
   every pair non-adjacent at BOTH breakpoints (min adjacency = 1), so we MINIMIZE
   a visual-adjacency penalty summed over both geometries: a same-value pair
   scores when horizontally adjacent (flat-distance 1, same row) or vertically
   stacked (distance 2 at 2-col / distance 3 at 3-col). Sample shuffles, keep the
   lowest penalty with a RANDOM tie-break so the layout still varies per load —
   never the clean all-columns transposition; at most ~1 guessable pair. */
function scatterThreeForm(cards) {
  function shuffle(a) {
    var b = a.slice();
    for (var i = b.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = b[i]; b[i] = b[j]; b[j] = t;
    }
    return b;
  }
  function penalty(arr) {
    var p = 0;
    for (var i = 0; i < arr.length; i++) {
      for (var j = i + 1; j < arr.length; j++) {
        var a = arr[i], b = arr[j];
        if (!a || !b || typeof a !== 'object' || typeof b !== 'object' || a.value !== b.value) continue;
        var d = j - i;
        /* 2-col grid: horiz-adjacent (d=1 same row) OR vert-stacked (d=2). */
        if (d === 1 && Math.floor(i / 2) === Math.floor(j / 2)) p++;
        if (d === 2) p++;
        /* 3-col grid: horiz-adjacent (d=1 same row) OR vert-stacked (d=3). */
        if (d === 1 && Math.floor(i / 3) === Math.floor(j / 3)) p++;
        if (d === 3) p++;
      }
    }
    return p;
  }
  var best = shuffle(cards), bestP = penalty(best);
  for (var k = 0; k < 60; k++) {
    var cand = shuffle(cards), cp = penalty(cand);
    if (cp < bestP || (cp === bestP && Math.random() < 0.5)) { best = cand; bestP = cp; }
  }
  return best;
}

/* task_template 'three-form' (2.NBT.A.3) — "Read and write numbers to 1000
   using base-ten numerals, number names, and expanded form." Each task shows
   6 cards = 3 pairs; each number's value appears on exactly TWO cards, bridging
   two of its three representations (numeral / expanded "200 + 40 + 7" /
   number-word "two hundred forty-seven"). Across the task all three forms
   appear; across the activity every bridge type (numeral↔expanded,
   numeral↔word, word↔expanded) is exercised. Validity is the same value-
   equality as equal-value (a.value === b.value), so the engine state machine +
   connector renderer are UNCHANGED. On correct Check the three matched number-
   words are spoken in ascending order (reading 3-digit numbers aloud is the
   2.NBT.A.3 teaching point), then a number-free celebration. The only engine
   additions are the .mp-word wrapping face + the _speakWordTable tap-audio
   branch in match-pairs-core.js. */
function makeThreeFormTasks(tasksRaw, idPrefix) {
  return tasksRaw.map(function (t, i) {
    var cards = t.cards.slice();
    return {
      id: idPrefix + '.task-' + i,
      promptKey: 'taskThreeForm',
      answerType: 'state',
      setup: function (tool) {
        /* Per-locale word-card display + tap-audio table; numeral/expanded
           cards stay language-neutral. For EN, wt.en[value] === the manifest
           display, so EN renders byte-identical. */
        var wt = THREE_FORM_WORDS[tool.language] || THREE_FORM_WORDS.en;
        var localized = cards.map(function (c) {
          if (c && c.kind === 'word' && typeof c.value === 'number' && wt[c.value]) {
            return { display: wt[c.value], kind: 'word', value: c.value };
          }
          return c;
        });
        tool.setupTask({ cards: localized });       /* resets state; its shuffle is overridden below */
        tool.cards = scatterThreeForm(tool.cards);  /* anti-predictable placement (no column-stacking) */
        tool.cardsState = tool.cards.map(function () { return 'unpaired'; });
        tool._speakWordTable = wt;                  /* number-word tap-audio + spoken-summary table */
        tool.render();                              /* fresh DOM per task — clears prior board */
      },
      check: function (tool) {
        /* Pass criteria: every card paired AND every formed pair has two
           cards of EQUAL value (two representations of the same number). */
        if (!tool.allPaired()) return false;
        var wrong = {};
        var ok = true;
        tool.pairsFormed.forEach(function (p) {
          var a = tool.cards[p[0]];
          var b = tool.cards[p[1]];
          var valid = a && b && typeof a === 'object' && typeof b === 'object'
                      && typeof a.value === 'number' && a.value === b.value;
          if (!valid) { wrong[p[0]] = true; wrong[p[1]] = true; ok = false; }
        });
        if (!ok) {
          /* Mark mismatched pairs visually + speak the gentle nudge (sets
             wrongIdxSet directly; core markWrongPairs is sum-based, unused here). */
          tool.wrongIdxSet = wrong;
          tool.paint();
          tool.speakTryAgain();
          return false;
        }
        /* Correct! Lock the board, then speak each matched number-word in
           ascending order followed by a truthful number-free celebration. */
        tool.readOnly = true;
        tool.paint();
        if (window.LCSAudio && window.LCSAudio.speak) {
          var vals = [];
          tool.cards.forEach(function (c) {
            if (c && typeof c === 'object' && typeof c.value === 'number' && vals.indexOf(c.value) < 0) {
              vals.push(c.value);
            }
          });
          vals.sort(function (x, y) { return x - y; });
          var wt = tool._speakWordTable || THREE_FORM_WORDS.en;
          var words = vals.map(function (v) { return wt[v] || String(v); });
          var done = (tool.strings.speakThreeFormDone && tool.strings.speakThreeFormDone[tool.language])
                     || tool.strings.speakThreeFormDone.en;
          var text = words.join('. ') + '. ' + done;
          window.LCSAudio.speak({ type: 'ui', text: text, lang: tool.language, rate: 0.95 });
        }
        return true;
      },
      hintKey: function (tool) {
        if (!tool.allPaired()) return 'hintThreeForm';
        return 'hintTryThreeForm';
      }
    };
  });
}

window.MatchPairsActivity = Object.assign({}, MatchPairsCore, {
  id: 'match-pairs-activity',
  strings: Object.assign({}, MatchPairsCore.strings, ACTIVITY_STRINGS_MP, {
    title: {
      en: 'Make the Number',
      de: 'Bilde die Zahl',
      es: 'Forma el número',
      it: 'Forma il numero',
      fr: 'Compose le nombre',
      pt: 'Forme o número',
      nl: 'Maak het getal',
      sv: 'Gör talet',
      da: 'Lav tallet',
      no: 'Lag tallet',
      fi: 'Tee luku'
    },
    instruction: {
      en: 'Find pairs of numbers that add up to the target. Tap Check when you\'re ready.',
      de: 'Finde Zahlenpaare, die zusammen das Ziel ergeben. Tippe auf Prüfen, wenn du fertig bist.',
      es: 'Encuentra parejas de números que sumen el objetivo. Toca Comprobar cuando estés listo.',
      it: 'Trova coppie di numeri che fanno l\'obiettivo. Tocca Verifica quando sei pronto.',
      fr: 'Trouve des paires de nombres qui font l\'objectif. Touche Vérifier quand tu es prêt.',
      pt: 'Encontre pares de números que formam o objetivo. Toque em Verificar quando estiver pronto.',
      nl: 'Zoek getallenparen die samen het doel maken. Tik op Controleer als je klaar bent.',
      sv: 'Hitta talpar som tillsammans blir målet. Tryck på Kontrollera när du är klar.',
      da: 'Find talpar, der tilsammen bliver målet. Tryk på Tjek, når du er klar.',
      no: 'Finn tallpar som til sammen blir målet. Trykk på Sjekk når du er klar.',
      fi: 'Etsi lukupareja, jotka yhdessä tekevät tavoitteen. Paina Tarkista kun olet valmis.'
    }
  }),

  /* tasks resolved lazily: by ?activity=<id> if present, else fallback. */
  tasks: STATIC_DEMO_TASKS_MP,

  init: function (api) {
    MatchPairsCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) {
      this._loadActivity();
    }
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/match-pairs-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      /* Sync the in-iframe shell title to this row's page_title. The shell
         rendered the generic facade title at mount (before this async fetch
         resolved); with two+ activities on one facade the specific title
         must come from the loaded row. Guarded to write ONLY when the text
         differs, so K.OA.A.3 (whose facade title == page_title in every
         locale) gets ZERO DOM mutation and stays byte-identical. */
      var titleEl = document.querySelector('.lcs-title');
      var wantTitle = row.page_title && row.page_title[self.language];
      if (titleEl && wantTitle && titleEl.textContent !== wantTitle) {
        titleEl.textContent = wantTitle;
      }
      self.tasks = self._buildTasksFromRow(row);
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[match-pairs-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    if (row.task_template === 'make-n') {
      var tasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeMatchTasks(tasks, row.id);
    }
    if (row.task_template === 'equal-value') {
      var evTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeEqualValueTasks(evTasks, row.id);
    }
    if (row.task_template === 'three-form') {
      var tfTasks = (row.params && Array.isArray(row.params.tasks)) ? row.params.tasks : [];
      return makeThreeFormTasks(tfTasks, row.id);
    }
    return STATIC_DEMO_TASKS_MP;
  }
});

MatchPairsCore.injectCSS();
