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
  /* Batch 3 K.CC.C.7 — Which number is smaller (mirror of pick-bigger) */
  promptPickSmaller: {
    en: 'Which number is smaller?',
    de: 'Welche Zahl ist kleiner?',
    fr: 'Quel nombre est plus petit ?',
    it: 'Quale numero è più piccolo?',
    es: '¿Qué número es menor?',
    pt: 'Qual número é menor?',
    nl: 'Welk getal is kleiner?',
    sv: 'Vilket tal är mindre?',
    da: 'Hvilket tal er mindst?',
    no: 'Hvilket tall er minst?',
    fi: 'Kumpi luku on pienempi?'
  },
  /* Batch 3 K.CC.B.5 — How many are there (count + match the numeral) */
  promptMatchNumberToGroup: {
    en: 'How many are there?',
    de: 'Wie viele sind es?',
    fr: 'Combien y en a-t-il ?',
    it: 'Quanti ce ne sono?',
    es: '¿Cuántos hay?',
    pt: 'Quantos há?',
    nl: 'Hoeveel zijn er?',
    sv: 'Hur många finns det?',
    da: 'Hvor mange er der?',
    no: 'Hvor mange er det?',
    fi: 'Montako niitä on?'
  },
  /* Batch 2 K.CC.C.6 — Which group has more */
  promptWhichMore: {
    en: 'Which group has more?',
    de: 'Welche Gruppe hat mehr?',
    fr: 'Quel groupe en a plus ?',
    it: 'Quale gruppo ne ha di più?',
    es: '¿Qué grupo tiene más?',
    pt: 'Qual grupo tem mais?',
    nl: 'Welke groep heeft er meer?',
    sv: 'Vilken grupp har fler?',
    da: 'Hvilken gruppe har flest?',
    no: 'Hvilken gruppe har flest?',
    fi: 'Kummalla ryhmällä on enemmän?'
  },
  /* Batch 2 2.OA.C.3 — Even or odd */
  promptEvenOrOdd: {
    en: 'Is this number even or odd?',
    de: 'Ist diese Zahl gerade oder ungerade?',
    fr: 'Ce nombre est-il pair ou impair ?',
    it: 'Questo numero è pari o dispari?',
    es: '¿Este número es par o impar?',
    pt: 'Este número é par ou ímpar?',
    nl: 'Is dit getal even of oneven?',
    sv: 'Är talet jämnt eller udda?',
    da: 'Er tallet lige eller ulige?',
    no: 'Er tallet partall eller oddetall?',
    fi: 'Onko luku parillinen vai pariton?'
  },
  /* Batch 2 K.G.A.3 — Flat or solid (2D vs 3D) */
  promptFlatOrSolid: {
    en: 'Is this shape flat or solid?',
    de: 'Ist diese Form flach oder ein Körper?',
    fr: 'Cette forme est-elle plate ou solide ?',
    it: 'Questa forma è piatta o solida?',
    es: '¿Esta forma es plana o sólida?',
    pt: 'Esta forma é plana ou sólida?',
    nl: 'Is deze vorm plat of een lichaam?',
    sv: 'Är formen platt eller solid?',
    da: 'Er formen flad eller rumlig?',
    no: 'Er formen flat eller solid?',
    fi: 'Onko muoto litteä vai kappale?'
  },
  /* Even/Odd tile labels */
  labelEven: {
    en: 'Even', de: 'Gerade', fr: 'Pair', it: 'Pari', es: 'Par', pt: 'Par',
    nl: 'Even', sv: 'Jämnt', da: 'Lige', no: 'Partall', fi: 'Parillinen'
  },
  labelOdd: {
    en: 'Odd', de: 'Ungerade', fr: 'Impair', it: 'Dispari', es: 'Impar', pt: 'Ímpar',
    nl: 'Oneven', sv: 'Udda', da: 'Ulige', no: 'Oddetall', fi: 'Pariton'
  },
  /* Flat/Solid tile labels */
  labelFlat: {
    en: 'Flat', de: 'Flach', fr: 'Plate', it: 'Piatta', es: 'Plana', pt: 'Plana',
    nl: 'Plat', sv: 'Platt', da: 'Flad', no: 'Flat', fi: 'Litteä'
  },
  labelSolid: {
    en: 'Solid', de: 'Körper', fr: 'Solide', it: 'Solida', es: 'Sólida', pt: 'Sólida',
    nl: 'Lichaam', sv: 'Solid', da: 'Rumlig', no: 'Solid', fi: 'Kappale'
  },
  /* Batch 4 K.MD.A.2 — Comparing length (taller / longer / shorter).
     Direct attribute comparison of the SAME object at two sizes; no
     counting. Nordic (sv/da/no/fi) NSR-flagged per §17.5.1. EN-only
     ships now; the 11-locale dict keeps the engine fan-out-ready. */
  promptTapTaller: {
    en: 'Tap the taller one',
    de: 'Tippe auf das höhere',
    fr: 'Touche l\'image la plus grande',
    it: 'Tocca l\'immagine più alta',
    es: 'Toca la imagen más alta',
    pt: 'Toque na imagem mais alta',
    nl: 'Tik op het hoogste plaatje',
    sv: 'Tryck på den högre bilden',
    da: 'Tryk på det højere billede',
    no: 'Trykk på den høyeste',
    fi: 'Napauta korkeampaa'
  },
  promptTapLonger: {
    en: 'Tap the longer one',
    de: 'Tippe auf das längere',
    fr: 'Touche l\'image la plus longue',
    it: 'Tocca l\'immagine più lunga',
    es: 'Toca la imagen más larga',
    pt: 'Toque na imagem mais comprida',
    nl: 'Tik op het langste plaatje',
    sv: 'Tryck på den längre bilden',
    da: 'Tryk på det længere billede',
    no: 'Trykk på den lengste',
    fi: 'Napauta pidempää'
  },
  promptTapShorter: {
    en: 'Tap the shorter one',
    de: 'Tippe auf das kürzere',
    fr: 'Touche l\'image la plus courte',
    it: 'Tocca l\'immagine più corta',
    es: 'Toca la imagen más corta',
    pt: 'Toque na imagem mais curta',
    nl: 'Tik op het kortste plaatje',
    sv: 'Tryck på den kortare bilden',
    da: 'Tryk på det kortere billede',
    no: 'Trykk på den korteste',
    fi: 'Napauta lyhyempää'
  },
  /* Size adjectives used only for per-tile aria-labels (bigger/smaller
     + raw noun key), mirroring which-more's "5 cat" label pattern.
     Never rendered on screen — the size relationship is the content. */
  labelBigger: {
    en: 'bigger', de: 'größer', fr: 'plus grand', it: 'più grande', es: 'más grande', pt: 'maior',
    nl: 'groter', sv: 'större', da: 'større', no: 'større', fi: 'isompi'
  },
  labelSmaller: {
    en: 'smaller', de: 'kleiner', fr: 'plus petit', it: 'più piccolo', es: 'más pequeño', pt: 'menor',
    nl: 'kleiner', sv: 'mindre', da: 'mindre', no: 'mindre', fi: 'pienempi'
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
  },
  /* 3D shapes — used as flat-solid subject ARIA labels. Not interpolated
     into promptTapShape (that template is 2D-only). */
  cube: {
    en:'cube',de:'Würfel',fr:'cube',it:'cubo',es:'cubo',pt:'cubo',nl:'kubus',sv:'kub',da:'terning',no:'terning',fi:'kuutio'
  },
  sphere: {
    en:'sphere',de:'Kugel',fr:'sphère',it:'sfera',es:'esfera',pt:'esfera',nl:'bol',sv:'sfär',da:'kugle',no:'kule',fi:'pallo'
  },
  cylinder: {
    en:'cylinder',de:'Zylinder',fr:'cylindre',it:'cilindro',es:'cilindro',pt:'cilindro',nl:'cilinder',sv:'cylinder',da:'cylinder',no:'sylinder',fi:'lieriö'
  },
  cone: {
    en:'cone',de:'Kegel',fr:'cône',it:'cono',es:'cono',pt:'cone',nl:'kegel',sv:'kon',da:'kegle',no:'kjegle',fi:'kartio'
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

/* Batch 4 K.MD.A.2 — wrapper-owned size-delta CSS for compare-length.
   The core renders both tiles' images identically (it stamps
   tile.dataset.key, but applies no per-option scale); to show the SAME
   noun at two visibly different sizes we inject our OWN scoped stylesheet
   keyed on the cl-big / cl-small option keys. This touches NEITHER
   choice-board-core.js NOR lcs-shell.css — all new visual logic lives
   here in the activity layer. The selectors are higher-specificity than
   the core's `.cb-tile-img` (and use !important defensively per §A.13.47
   rule 6), so they win regardless of inject order. Bottom-anchoring both
   images within the tile (align-items:end) + transform-origin:bottom
   seats them on a shared visual floor so "taller / longer" reads
   honestly. The cl-* keys exist only in this template and one activity
   loads per iframe, so there is zero cross-activity contamination. */
var _clCssInjected = false;
function injectCompareLengthCSS() {
  if (_clCssInjected) return;
  _clCssInjected = true;
  var css = [
    '.cb-tile[data-key^="cl-"]{align-items:end !important;}',
    '.cb-tile[data-key="cl-big"] .cb-tile-img{transform:scale(1) !important;transform-origin:bottom center;}',
    '.cb-tile[data-key="cl-small"] .cb-tile-img{transform:scale(0.5) !important;transform-origin:bottom center;}'
  ].join('\n');
  var tag = document.createElement('style');
  tag.setAttribute('data-cb-compare-length', '');
  tag.textContent = css;
  document.head.appendChild(tag);
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

    /* TEMPLATE: which-more (K.CC.C.6) — show 2 groups of objects, kid
       picks the group with more. params.pairs = [
         { noun: 'cat', themeDir: 'animals', counts: [3, 5] }, ...
       ]. Engine cap: counts ≤ 8 per side. */
    if (row.task_template === 'which-more') {
      var morePairs = row.params.pairs;
      return morePairs.map(function (pair, idx) {
        var imgUrl = '/image-library-webp/themes/' + pair.themeDir + '/' + pair.noun + '@2x.webp';
        var a = pair.counts[0], b = pair.counts[1];
        var more = a > b ? a : b;
        var moreKey = 'group_' + more;
        return {
          id: row.id + '.' + pair.noun + '-' + a + '-vs-' + b,
          promptKey: 'promptWhichMore',
          answerType: 'state',
          setup: function (tool) {
            /* idx-parity for deterministic left/right placement so
               bigger isn't always on the same side. */
            var first  = (idx % 2 === 0) ? a : b;
            var second = (idx % 2 === 0) ? b : a;
            var options = [
              { key: 'group_' + first,  group: { imgUrl: imgUrl, count: first  }, label: first  + ' ' + pair.noun },
              { key: 'group_' + second, group: { imgUrl: imgUrl, count: second }, label: second + ' ' + pair.noun }
            ];
            tool.setupTask(options, moreKey, null);
          },
          check: function (tool) {
            var correct = tool.answer === moreKey;
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: even-odd (2.OA.C.3) — show a numeral as subject, kid
       picks "Even" or "Odd" text tile. params.numbers = [2..9, ...]. */
    if (row.task_template === 'even-odd') {
      var numbers = row.params.numbers;
      return numbers.map(function (n) {
        var isEven = (n % 2 === 0);
        var targetKey = isEven ? 'even' : 'odd';
        return {
          id: row.id + '.n' + n,
          promptKey: 'promptEvenOrOdd',
          answerType: 'state',
          setup: function (tool) {
            var options = [
              { key: 'even', text: self.api.t('labelEven') },
              { key: 'odd',  text: self.api.t('labelOdd')  }
            ];
            var subject = { type: 'text', text: String(n) };
            tool.setupTask(options, targetKey, subject);
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

    /* TEMPLATE: pick-smaller (K.CC.C.7) — mirror of pick-bigger; kid
       picks the SMALLER of two numerals. params.pairs = [[n1, n2], ...]. */
    if (row.task_template === 'pick-smaller') {
      var smallerPairs = row.params.pairs;
      return smallerPairs.map(function (pair, idx) {
        var a = pair[0], b = pair[1];
        var smaller = a < b ? a : b;
        return {
          id: row.id + '.' + a + '-vs-' + b,
          promptKey: 'promptPickSmaller',
          answerType: 'state',
          setup: function (tool) {
            /* idx-parity left/right placement so smaller isn't always
               on the same side. */
            var first  = (idx % 2 === 0) ? a : b;
            var second = (idx % 2 === 0) ? b : a;
            var options = [
              { key: String(first),  text: String(first)  },
              { key: String(second), text: String(second) }
            ];
            tool.setupTask(options, String(smaller), null);
          },
          check: function (tool) {
            var correct = tool.answer === String(smaller);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: how-many-group (K.CC.B.5) — show N objects as subject
       (uses subject.type === 'group' added in Batch 3 core.js), kid picks
       the matching numeral from 4 number tiles (target + 3 distractors).
       params.items = [{ noun, themeDir, count, distractors: [n,n,n] }, ...].
       Engine cap: count ≤ 8. */
    if (row.task_template === 'how-many-group') {
      var howManyItems = row.params.items;
      return howManyItems.map(function (entry) {
        var imgUrl = '/image-library-webp/themes/' + entry.themeDir + '/' + entry.noun + '@2x.webp';
        var target = entry.count;
        return {
          id: row.id + '.' + entry.noun + '-' + target,
          promptKey: 'promptMatchNumberToGroup',
          answerType: 'state',
          setup: function (tool) {
            /* 4-tile numeral choice: target + 3 hand-picked distractors.
               Distractors deterministic per task (from manifest); shuffle
               keyed on target so order stays consistent across locales. */
            var numbers = entry.distractors.concat([target]);
            var seed = target * 31;
            function rand() {
              seed = (seed + 0x6D2B79F5) | 0;
              var t = seed;
              t = Math.imul(t ^ (t >>> 15), t | 1);
              t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
              return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
            }
            for (var m = numbers.length - 1; m > 0; m--) {
              var n = Math.floor(rand() * (m + 1));
              var t2 = numbers[m]; numbers[m] = numbers[n]; numbers[n] = t2;
            }
            var options = numbers.map(function (val) {
              return { key: String(val), text: String(val) };
            });
            var subject = {
              type: 'group',
              imgUrl: imgUrl,
              count: target,
              alt: entry.noun
            };
            tool.setupTask(options, String(target), subject);
          },
          check: function (tool) {
            var correct = tool.answer === String(target);
            tool.showFeedback(correct);
            return correct;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: flat-solid (K.G.A.3) — show a shape image as subject,
       kid picks "Flat" (2D) or "Solid" (3D) text tile.
       params.shapes = [{ key, kind: '2d' | '3d' }, ...]. */
    if (row.task_template === 'flat-solid') {
      var shapeList = row.params.shapes;
      return shapeList.map(function (entry) {
        var targetKey = entry.kind === '3d' ? 'solid' : 'flat';
        return {
          id: row.id + '.' + entry.key,
          promptKey: 'promptFlatOrSolid',
          answerType: 'state',
          setup: function (tool) {
            var options = [
              { key: 'flat',  text: self.api.t('labelFlat')  },
              { key: 'solid', text: self.api.t('labelSolid') }
            ];
            var subject = {
              type: 'image',
              imgUrl: '/image-library-webp/themes/shapes/' + entry.key + '@2x.webp',
              alt: self.api.t('shapeLabel_' + entry.key) || entry.key
            };
            tool.setupTask(options, targetKey, subject);
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

    /* TEMPLATE: compare-length (K.MD.A.2, Measurement & Data) — show the
       SAME object at two visibly different sizes (one image instance
       scaled via the wrapper-injected CSS above, keyed on the option
       key), kid taps the taller / longer / shorter one. ONE object per
       tile + NO counting — structurally distinct from which-more
       (K.CC.C.6, which compares the COUNT of items in group tiles).
       params.rounds = [{ noun, themeDir, attribute:'taller'|'longer'|'shorter' }, ...].
       taller/longer → the bigger instance is correct; shorter → smaller. */
    if (row.task_template === 'compare-length') {
      injectCompareLengthCSS();
      var rounds = row.params.rounds;
      return rounds.map(function (round, idx) {
        var imgUrl = '/image-library-webp/themes/' + round.themeDir + '/' + round.noun + '@2x.webp';
        var attr = round.attribute;
        var targetKey = (attr === 'shorter') ? 'cl-small' : 'cl-big';
        var promptKey = (attr === 'taller') ? 'promptTapTaller'
                      : (attr === 'longer') ? 'promptTapLonger'
                      : 'promptTapShorter';
        return {
          id: row.id + '.' + round.noun + '-' + attr,
          promptKey: promptKey,
          answerType: 'state',
          setup: function (tool) {
            var bigOpt   = { key: 'cl-big',   imgUrl: imgUrl, label: self.api.t('labelBigger')  + ' ' + round.noun };
            var smallOpt = { key: 'cl-small', imgUrl: imgUrl, label: self.api.t('labelSmaller') + ' ' + round.noun };
            /* idx-parity left/right placement so the bigger tile isn't
               always on the same side across the round set. */
            var options = (idx % 2 === 0) ? [bigOpt, smallOpt] : [smallOpt, bigOpt];
            tool.setupTask(options, targetKey, null);
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

    return STATIC_DEMO_TASKS;
  }
});

ChoiceBoardCore.injectCSS();
