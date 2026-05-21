/* =====================================================================
   CHOICE BOARD — ACTIVITY   (choice-board-activity.js)
   ---------------------------------------------------------------------
   Task-driven variant of choice-board. Reuses choice-board-core.js for
   the DOM/paint/state. Task source depends on the URL:

   • ?activity=<id>   → fetches choice-board-activities.json, finds the
                         row, instantiates tasks from the row's
                         task_template + params.
   • no ?activity     → falls back to a static demo set so the
                         /mini-tools/choice-board-activity.html direct-
                         load shows the same kind of board.

   First task_template: 'shape-id' — Tap the {shape}.
   ===================================================================== */

/* Localized chrome strings for activity tasks. Per-locale templates use
   {shape} interpolation; the activity-task-builder injects the localized
   shape label at build time.

   Tier-3+4 (sv/da/no/fi) NSR-flagged per CLAUDE.md §17.5.1; review
   recommended on native speakers but acceptable for ship. */
var ACTIVITY_STRINGS = {
  promptTapShape: {
    en: 'Tap the {shape}',
    de: 'Tippe auf das {shape}',
    fr: 'Touche le {shape}',
    it: 'Tocca il {shape}',
    es: 'Toca el {shape}',
    pt: 'Toque no {shape}',
    nl: 'Tik op het {shape}',
    sv: 'Tryck på {shape}',
    da: 'Tryk på {shape}',
    no: 'Trykk på {shape}',
    fi: 'Napauta {shape}'
  },
  /* Batch 1 K.G.B.4 — Count the sides */
  promptCountSides: {
    en: 'How many sides does this shape have?',
    de: 'Wie viele Seiten hat diese Form?',
    fr: 'Combien de côtés a cette forme ?',
    it: 'Quanti lati ha questa forma?',
    es: '¿Cuántos lados tiene esta forma?',
    pt: 'Quantos lados tem esta forma?',
    nl: 'Hoeveel zijden heeft deze vorm?',
    sv: 'Hur många sidor har formen?',
    da: 'Hvor mange sider har formen?',
    no: 'Hvor mange sider har formen?',
    fi: 'Kuinka monta sivua tällä muodolla on?'
  },
  /* Batch 1 K.CC.C.7 — Which number is bigger */
  promptPickBigger: {
    en: 'Which number is bigger?',
    de: 'Welche Zahl ist größer?',
    fr: 'Quel nombre est plus grand ?',
    it: 'Quale numero è più grande?',
    es: '¿Qué número es mayor?',
    pt: 'Qual número é maior?',
    nl: 'Welk getal is groter?',
    sv: 'Vilket tal är större?',
    da: 'Hvilket tal er størst?',
    no: 'Hvilket tall er størst?',
    fi: 'Kumpi luku on suurempi?'
  },
  hintPickOne: {
    en: 'Pick one of the shapes first',
    de: 'Wähle zuerst eine Form aus',
    fr: 'Choisis d\'abord une forme',
    it: 'Scegli prima una forma',
    es: 'Elige primero una forma',
    pt: 'Escolhe primeiro uma forma',
    nl: 'Kies eerst een vorm',
    sv: 'Välj först en form',
    da: 'Vælg først en form',
    no: 'Velg først en form',
    fi: 'Valitse ensin muoto'
  },
  hintTryAgain: {
    en: 'Try a different shape',
    de: 'Versuche eine andere Form',
    fr: 'Essaie une autre forme',
    it: 'Prova un\'altra forma',
    es: 'Prueba otra forma',
    pt: 'Tenta outra forma',
    nl: 'Probeer een andere vorm',
    sv: 'Försök en annan form',
    da: 'Prøv en anden form',
    no: 'Prøv en annen form',
    fi: 'Kokeile toista muotoa'
  }
};

/* Shape labels per locale — interpolated into promptTapShape via {shape}.
   Singular-form locales use whichever grammatical form fits the prompt
   template's article (the template uses neuter/masculine forms; some
   locales need an article rebuild for full grammatical correctness,
   tracked as NSR-flag for Nordic + fi). */
var SHAPE_LABELS = {
  circle: {
    en:'circle',de:'Kreis',fr:'cercle',it:'cerchio',es:'círculo',pt:'círculo',nl:'cirkel',sv:'cirkeln',da:'cirklen',no:'sirkelen',fi:'ympyrää'
  },
  square: {
    en:'square',de:'Quadrat',fr:'carré',it:'quadrato',es:'cuadrado',pt:'quadrado',nl:'vierkant',sv:'kvadraten',da:'kvadratet',no:'kvadratet',fi:'neliötä'
  },
  triangle: {
    en:'triangle',de:'Dreieck',fr:'triangle',it:'triangolo',es:'triángulo',pt:'triângulo',nl:'driehoek',sv:'triangeln',da:'trekanten',no:'trekanten',fi:'kolmiota'
  },
  rectangle: {
    en:'rectangle',de:'Rechteck',fr:'rectangle',it:'rettangolo',es:'rectángulo',pt:'retângulo',nl:'rechthoek',sv:'rektangeln',da:'rektanglet',no:'rektangelet',fi:'suorakulmiota'
  },
  hexagon: {
    en:'hexagon',de:'Sechseck',fr:'hexagone',it:'esagono',es:'hexágono',pt:'hexágono',nl:'zeshoek',sv:'sexhörningen',da:'sekskanten',no:'sekskanten',fi:'kuusikulmiota'
  },
  oval: {
    en:'oval',de:'Oval',fr:'ovale',it:'ovale',es:'óvalo',pt:'oval',nl:'ovaal',sv:'ovalen',da:'ovalen',no:'ovalen',fi:'soikiota'
  },
  star: {
    en:'star',de:'Stern',fr:'étoile',it:'stella',es:'estrella',pt:'estrela',nl:'ster',sv:'stjärnan',da:'stjernen',no:'stjernen',fi:'tähteä'
  },
  diamond: {
    en:'diamond',de:'Raute',fr:'losange',it:'rombo',es:'rombo',pt:'losango',nl:'ruit',sv:'romben',da:'rumben',no:'rombe',fi:'vinoneliötä'
  }
};

/* Build the strings dict the core+shell consume. Flat keys per shape
   so the i18n helper can look up shapeLabel_<key>. */
var FLATTENED_SHAPE_LABELS = {};
Object.keys(SHAPE_LABELS).forEach(function (key) {
  FLATTENED_SHAPE_LABELS['shapeLabel_' + key] = SHAPE_LABELS[key];
});

/* Static demo set used when /mini-tools/choice-board-activity.html is
   loaded directly without ?activity= (testability + sanity check). */
var STATIC_DEMO_TASKS = [
  /* Each demo task is structurally identical to the manifest-built
     tasks below — proves the engine works without manifest load. */
  {
    id: 'demo-circle',
    promptKey: 'promptTapShape',
    promptArgs: { shape: 'circle' },  /* untranslated — manifest path uses real labels */
    answerType: 'state',
    setup: function (tool) {
      var opts = ['circle', 'square', 'triangle', 'star'].map(buildOption);
      tool.setupTask(opts, 'circle');
    },
    check: function (tool) {
      var correct = tool.answer === 'circle';
      tool.showFeedback(correct);
      return correct;
    },
    hintKey: function (tool) {
      return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
    }
  }
];

function shapeImageUrl(key) {
  return '/image-library-webp/themes/shapes/' + key + '@2x.webp';
}

function buildOption(key) {
  return { key: key, imgUrl: shapeImageUrl(key), label: key };
}

/* Number-tile builder for count-sides + similar templates. Seeded
   deterministically on the target so all 11 locales render identical
   tile ordering. Distractors are picked from `pool` excluding target,
   then target re-added and the whole set shuffled. */
function pickNumberDistractors(pool, target, count) {
  var others = pool.filter(function (n) { return n !== target; });
  var seed = target * 31;
  function rand() {
    seed = (seed + 0x6D2B79F5) | 0;
    var t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  var picks = others.slice();
  for (var j = picks.length - 1; j > 0; j--) {
    var k = Math.floor(rand() * (j + 1));
    var tmp = picks[j]; picks[j] = picks[k]; picks[k] = tmp;
  }
  var distractors = picks.slice(0, count - 1);
  var numbers = distractors.concat([target]);
  for (var m = numbers.length - 1; m > 0; m--) {
    var n = Math.floor(rand() * (m + 1));
    var t2 = numbers[m]; numbers[m] = numbers[n]; numbers[n] = t2;
  }
  return numbers.map(function (val) {
    return { key: String(val), text: String(val) };
  });
}

/* Deterministic distractor picker. Same shape-key seed produces the same
   shuffled option order across all 11 locales so the 11 sibling URLs
   render identically (only language changes). */
function pickOptions(pool, targetKey, count) {
  var others = pool.filter(function (k) { return k !== targetKey; });
  /* Simple seeded RNG (mulberry32-lite) keyed on targetKey's char codes. */
  var seed = 0;
  for (var i = 0; i < targetKey.length; i++) seed = (seed * 31 + targetKey.charCodeAt(i)) | 0;
  function rand() {
    seed = (seed + 0x6D2B79F5) | 0;
    var t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  /* Pick (count-1) distinct distractors from `others`. */
  var picks = others.slice();
  /* Fisher-Yates partial shuffle. */
  for (var j = picks.length - 1; j > 0; j--) {
    var k = Math.floor(rand() * (j + 1));
    var tmp = picks[j]; picks[j] = picks[k]; picks[k] = tmp;
  }
  var distractors = picks.slice(0, count - 1);
  var optionsKeys = distractors.concat([targetKey]);
  /* Shuffle so target isn't always last. Second shuffle keyed on the
     same seed so still deterministic per-target. */
  for (var m = optionsKeys.length - 1; m > 0; m--) {
    var n = Math.floor(rand() * (m + 1));
    var t2 = optionsKeys[m]; optionsKeys[m] = optionsKeys[n]; optionsKeys[n] = t2;
  }
  return optionsKeys.map(buildOption);
}

window.ChoiceBoardActivity = Object.assign({}, ChoiceBoardCore, {
  id: 'choice-board-activity',
  strings: Object.assign({}, ChoiceBoardCore.strings, ACTIVITY_STRINGS, FLATTENED_SHAPE_LABELS, {
    title: {en:'Choice Activity',de:'Auswahlaufgabe',fr:'Activité de choix',it:'Attività di scelta',es:'Actividad de elección',pt:'Atividade de escolha',nl:'Keuzeactiviteit',sv:'Valövning',da:'Valgøvelse',no:'Valgøvelse',fi:'Valintatehtävä'},
    instruction: {en:'Follow the prompt. Tap Check when you’re ready.',de:'Folge der Aufforderung. Tippe Prüfen, wenn du fertig bist.',fr:'Suis la consigne. Tape Vérifier quand tu es prêt.',it:'Segui l’istruzione. Tocca Verifica quando sei pronto.',es:'Sigue la indicación. Toca Comprobar cuando estés listo.',pt:'Siga a instrução. Toque em Verificar quando estiver pronto.',nl:'Volg de opdracht. Tik op Controleer als je klaar bent.',sv:'Följ uppmaningen. Tryck på Kontrollera när du är klar.',da:'Følg opgaven. Tryk på Tjek, når du er klar.',no:'Følg oppgaven. Trykk på Sjekk når du er klar.',fi:'Seuraa ohjetta. Paina Tarkista, kun olet valmis.'}
  }),

  tasks: STATIC_DEMO_TASKS,

  init: function (api) {
    ChoiceBoardCore.init.call(this, api);
    var params = (typeof window !== 'undefined' && window.location)
      ? new URLSearchParams(window.location.search) : null;
    this._activityId = params ? params.get('activity') : null;
    if (this._activityId) this._loadActivity();
  },

  _loadActivity: function () {
    var self = this;
    fetch('/mini-tools/choice-board-activities.json').then(function (r) {
      if (!r.ok) throw new Error('manifest fetch failed: ' + r.status);
      return r.json();
    }).then(function (rows) {
      var row = rows.find(function (r) { return r.id === self._activityId; });
      if (!row) return;
      self._activityRow = row;
      self.tasks = self._buildTasksFromRow(row);
      if (typeof window.LCS_reloadFirstTask === 'function') {
        window.LCS_reloadFirstTask();
      }
    }).catch(function (e) {
      if (window.console && console.warn) console.warn('[choice-board-activity] manifest load failed; using fallback:', e.message);
    });
  },

  _buildTasksFromRow: function (row) {
    var self = this;

    /* TEMPLATE: shape-id (K.G.A.2) — tap the named shape. */
    if (row.task_template === 'shape-id') {
      var pool = row.params.shapes;
      var choicesPerTask = row.params.choicesPerTask || 4;
      return pool.map(function (targetKey) {
        return {
          id: row.id + '.' + targetKey,
          promptKey: 'promptTapShape',
          promptArgs: { shape: self.api.t('shapeLabel_' + targetKey) },
          answerType: 'state',
          setup: function (tool) {
            var options = pickOptions(pool, targetKey, choicesPerTask);
            tool.setupTask(options, targetKey);
          },
          check: function (tool) {
            var correct = tool.answer === targetKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: count-sides (K.G.B.4) — show a polygon, kid picks the
       number of sides from 4 number tiles. params.shapes = list of
       {key, sides} entries; we pick 4 number tiles per task (target +
       3 distractors from {3..8}). */
    if (row.task_template === 'count-sides') {
      var shapeEntries = row.params.shapes;  /* [{key:'triangle', sides:3}, ...] */
      var distractorPool = row.params.distractorPool || [3, 4, 5, 6, 7, 8];
      return shapeEntries.map(function (entry) {
        return {
          id: row.id + '.' + entry.key,
          promptKey: 'promptCountSides',
          answerType: 'state',
          setup: function (tool) {
            var numberOpts = pickNumberDistractors(distractorPool, entry.sides, 4);
            var subject = {
              type: 'image',
              imgUrl: '/image-library-webp/themes/shapes/' + entry.key + '@2x.webp',
              alt: entry.key
            };
            tool.setupTask(numberOpts, String(entry.sides), subject);
          },
          check: function (tool) {
            var correct = tool.answer === String(entry.sides);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: pick-bigger (K.CC.C.7) — show 2 numbers, kid picks the
       bigger one. params.pairs = [[n1, n2], ...]. */
    if (row.task_template === 'pick-bigger') {
      var pairs = row.params.pairs;
      return pairs.map(function (pair, idx) {
        var a = pair[0], b = pair[1];
        var bigger = a > b ? a : b;
        return {
          id: row.id + '.' + a + '-vs-' + b,
          promptKey: 'promptPickBigger',
          answerType: 'state',
          setup: function (tool) {
            /* Deterministic left/right order — use idx-parity so half
               of the tasks have bigger on left, half on right. */
            var first = (idx % 2 === 0) ? a : b;
            var second = (idx % 2 === 0) ? b : a;
            var options = [
              { key: String(first),  text: String(first) },
              { key: String(second), text: String(second) }
            ];
            tool.setupTask(options, String(bigger), null);
          },
          check: function (tool) {
            var correct = tool.answer === String(bigger);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    return STATIC_DEMO_TASKS;
  }
});

ChoiceBoardCore.injectCSS();
