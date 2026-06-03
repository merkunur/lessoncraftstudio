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
    no: 'Trykk på det høyere bildet',
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
    no: 'Trykk på det lengre bildet',
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
    no: 'Trykk på det kortere bildet',
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
  /* Activity 10 K.MD.B.3 — Sort and Count. The kid sees a MIXED set of
     objects (≥2 categories, interleaved), the prompt names ONE category,
     and they tap how many objects belong to it. Classify-then-count —
     structurally distinct from how-many-group (K.CC.B.5, homogeneous set)
     and which-more (K.CC.C.6, magnitude compare).

     PER-CATEGORY FULL prompt strings (not a {category} template) so every
     locale is grammatically perfect — fi partitive-singular, fr elision,
     es/pt gendered interrogative — per §A.13.54 (author-correct, don't
     inflect fragilely). The sort-count branch picks promptCount<Category>
     by the round's target. Locales are added one per fan-out commit; an
     unpopulated locale has no published slug yet, so the EN fallback never
     reaches a live non-EN page. */
  promptCountAnimals: {
    en: 'How many animals?',
    de: 'Wie viele Tiere?',
    fr: 'Combien d\'animaux ?',
    es: '¿Cuántos animales?',
    it: 'Quanti animali?',
    pt: 'Quantos animais?',
    nl: 'Hoeveel dieren?',
    sv: 'Hur många djur?',
    da: 'Hvor mange dyr?',
    no: 'Hvor mange dyr?',
    fi: 'Kuinka monta eläintä?'
  },
  promptCountFruits: {
    en: 'How many fruits?',
    de: 'Wie viele Früchte?',
    fr: 'Combien de fruits ?',
    es: '¿Cuántas frutas?',
    it: 'Quanti frutti?',
    pt: 'Quantas frutas?',
    nl: 'Hoeveel vruchten?',
    sv: 'Hur många frukter?',
    da: 'Hvor mange frugter?',
    no: 'Hvor mange frukter?',
    fi: 'Kuinka monta hedelmää?'
  },
  promptCountVehicles: {
    en: 'How many vehicles?',
    de: 'Wie viele Fahrzeuge?',
    fr: 'Combien de véhicules ?',
    es: '¿Cuántos vehículos?',
    it: 'Quanti veicoli?',
    pt: 'Quantos veículos?',
    nl: 'Hoeveel voertuigen?',
    sv: 'Hur många fordon?',
    da: 'Hvor mange køretøjer?',
    no: 'Hvor mange kjøretøy?',
    fi: 'Kuinka monta kulkuneuvoa?'
  },
  /* Neutral noun for the mixed-set's group aria-label ("6 objects") so the
     screen-reader summary never leaks per-category counts (the answer).
     fi uses partitive-singular "esinettä" (reads correctly after a count). */
  labelObjects: {
    en: 'objects', de: 'Dinge', fr: 'images', it: 'oggetti', es: 'objetos', pt: 'objetos',
    nl: 'voorwerpen', sv: 'bilder', da: 'billeder', no: 'bilder', fi: 'esinettä'
  },
  /* Activity 11 K.MD.A.1 — Describe Measurable Attributes. Show ONE object;
     the kid taps the measurement-attribute WORD (long / tall / heavy =
     length / height / weight) that describes it. Curated single-salient
     objects only (pencil→long, giraffe→tall, rock→heavy) so exactly one
     tile is defensible — describing a measurable attribute of a SINGLE
     object, structurally distinct from compare-length (K.MD.A.2, compares
     two instances) and sort-count (K.MD.B.3, classify-then-count).

     EN-only ships now. i18n.t() resolves entry[locale] || entry.en, so the
     non-EN locales fall back to the EN string until the native-ensemble
     fan-out (§A.13.56) authors them; no non-EN slug is published yet, so
     that EN fallback never reaches a live non-EN page. */
  promptDescribeAttribute: {
    en: 'Which word describes the {noun}?'
  },
  labelLong:  { en: 'Long'  },
  labelTall:  { en: 'Tall'  },
  labelHeavy: { en: 'Heavy' },
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
  heart: {
    en:'heart',de:'Herz',fr:'cœur',it:'cuore',es:'corazón',pt:'coração',nl:'hart',sv:'hjärtat',da:'hjertet',no:'hjertet',fi:'sydäntä'
  },
  pentagon: {
    en:'pentagon',de:'Fünfeck',fr:'pentagone',it:'pentagono',es:'pentágono',pt:'pentágono',nl:'vijfhoek',sv:'femhörningen',da:'femkanten',no:'femkanten',fi:'viisikulmiota'
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
  },
  pyramid: {
    en:'pyramid',de:'Pyramide',fr:'pyramide',it:'piramide',es:'pirámide',pt:'pirâmide',nl:'piramide',sv:'pyramid',da:'pyramide',no:'pyramide',fi:'pyramidi'
  }
};

/* Build the strings dict the core+shell consume. Flat keys per shape
   so the i18n helper can look up shapeLabel_<key>. */
var FLATTENED_SHAPE_LABELS = {};
Object.keys(SHAPE_LABELS).forEach(function (key) {
  FLATTENED_SHAPE_LABELS['shapeLabel_' + key] = SHAPE_LABELS[key];
});

/* Activity 11 K.MD.A.1 — display nouns interpolated into
   promptDescribeAttribute via {noun}. The image path uses the vocab KEY
   (round.noun); these are the human display labels, looked up as
   nounLabel_<key> exactly like FLATTENED_SHAPE_LABELS above. EN authored
   now; non-EN fall back to EN via i18n.t() until the native-ensemble
   fan-out localizes them from image-vocabulary.js + the article/plural
   system. */
var NOUN_LABELS = {
  pencil:     { en: 'pencil' },
  ruler:      { en: 'ruler' },
  carrot:     { en: 'carrot' },
  giraffe:    { en: 'giraffe' },
  pine:       { en: 'pine tree' },
  lighthouse: { en: 'lighthouse' },
  rock:       { en: 'rock' },
  pumpkin:    { en: 'pumpkin' }
};
var FLATTENED_NOUN_LABELS = {};
Object.keys(NOUN_LABELS).forEach(function (key) {
  FLATTENED_NOUN_LABELS['nounLabel_' + key] = NOUN_LABELS[key];
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

/* Activity 11 K.MD.A.1 — wrapper-owned 3-word-tile layout for
   describe-attribute. The core sizes any >2-option board as cb-cols-4
   (small square tiles built for single digits / small images), which
   clips the word tiles "Long / Tall / Heavy" on narrow phones. We tag the
   board .cb-attr3 in the render() override below and style it here as a
   centered 3-up row of auto-height word tiles with a viewport-stable font
   (vw, NOT vmin, per §A.13.47 rule 1 — iframe-relative vmin would run away
   as auto-resize grows the iframe) that never overflows 280→768px. The
   .cb-board.cb-attr3-scoped selectors (specificity 0,3,0) beat the
   wrapper's .cb-cols-4 rules (0,2,0) regardless of inject order, and carry
   !important per §A.13.47 rule 6. Touches NEITHER choice-board-core.js NOR
   lcs-shell.css — all new visual logic lives in the activity layer, and the
   .cb-attr3 class exists only for this template (one activity per iframe →
   zero cross-activity contamination). */
var _daCssInjected = false;
function injectDescribeAttributeCSS() {
  if (_daCssInjected) return;
  _daCssInjected = true;
  var css = [
    '.cb-board.cb-attr3{grid-template-columns:repeat(3,1fr)!important;max-width:540px!important;gap:clamp(8px,2.2vw,16px)!important;}',
    '.cb-board.cb-attr3 .cb-tile{aspect-ratio:auto!important;width:auto!important;max-width:none!important;max-height:none!important;min-height:clamp(64px,16vw,108px)!important;padding:clamp(10px,3vw,22px) clamp(6px,2vw,12px)!important;}',
    '.cb-board.cb-attr3 .cb-tile-text{font-size:clamp(16px,5.4vw,34px)!important;white-space:nowrap!important;}'
  ].join('\n');
  var tag = document.createElement('style');
  tag.setAttribute('data-cb-describe-attr', '');
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

/* Activity 10 K.MD.B.3 (sort-count) helpers — deterministic per round so
   every sibling locale URL renders an identical pile order + tile order
   (only the language changes), matching the determinism discipline used
   by pickOptions / pickNumberDistractors above. */
function _scRng(seed) {
  return function () {
    seed = (seed + 0x6D2B79F5) | 0;
    var t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function seededShuffle(arr, seed) {
  var a = arr.slice(), rand = _scRng(seed);
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(rand() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}
/* Build 4 distinct number tiles for a sort-count round: the correct
   target-count + 3 distractors drawn (in priority order) from the
   classification traps — TOTAL (counted everything) and the OTHER-category
   counts (counted the wrong group) — then near-misses, padding from 1..9
   only if a tiny round left us short. Guarantees the total + at least one
   other-count surface so skipping classification lands on a wrong tile.
   All values clamped to 1..9 (K-friendly single-digit numerals). */
function buildSortCountTiles(correct, total, otherCounts, seed) {
  var seen = {}, vals = [];
  function add(v) {
    if (v == null) return;
    v = Math.round(v);
    if (v < 1 || v > 9 || seen[v]) return;
    seen[v] = 1; vals.push(v);
  }
  add(correct);
  add(total);
  otherCounts.slice().sort(function (a, b) { return b - a; }).forEach(add);
  add(correct + 1); add(correct - 1); add(correct + 2); add(correct - 2);
  for (var n = 1; n <= 9 && vals.length < 4; n++) add(n);
  vals = vals.slice(0, 4);
  return seededShuffle(vals, seed).map(function (v) {
    return { key: String(v), text: String(v) };
  });
}

window.ChoiceBoardActivity = Object.assign({}, ChoiceBoardCore, {
  id: 'choice-board-activity',
  strings: Object.assign({}, ChoiceBoardCore.strings, ACTIVITY_STRINGS, FLATTENED_SHAPE_LABELS, FLATTENED_NOUN_LABELS, {
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

    /* TEMPLATE: sort-count (K.MD.B.3, Measurement & Data) — show a MIXED
       set of objects (≥2 categories, interleaved), name ONE category in
       the prompt, kid taps how many objects belong to it from 4 number
       tiles. Classify-THEN-count: the distractors include the TOTAL
       (counted everything) + the OTHER-category counts (counted the wrong
       group), so skipping classification lands on a wrong tile. Distinct
       from how-many-group (K.CC.B.5, homogeneous set → pure count) and
       which-more (K.CC.C.6, magnitude compare → tap a group).

       The core's subject-group is homogeneous (N copies of one image), so
       we seat the right COUNT of group items via the engine and swap each
       item's src to the heterogeneous pile in the wrapper-owned render()
       override below — 0 lines to choice-board-core.js / lcs-shell.* /
       Direction A CSS (same activity-layer pattern as compare-length's
       injected CSS). params.rounds = [
         { target:'animals', items:[{noun,themeDir,cat}, ...] }, ...
       ]. Engine subject cap = 8, so keep each round's items ≤ 8. */
    if (row.task_template === 'sort-count') {
      var scRounds = row.params.rounds;
      return scRounds.map(function (round, idx) {
        var items = round.items || [];
        var target = round.target;
        var correct = items.filter(function (it) { return it.cat === target; }).length;
        var total = items.length;
        /* counts of every non-target category present (mis-classify traps) */
        var byCat = {};
        items.forEach(function (it) { byCat[it.cat] = (byCat[it.cat] || 0) + 1; });
        var otherCounts = Object.keys(byCat)
          .filter(function (c) { return c !== target; })
          .map(function (c) { return byCat[c]; });
        /* deterministic interleave of the pile so categories aren't shown
           in contiguous blocks (counting a block would skip classifying). */
        var pileSeed = 0;
        for (var s = 0; s < target.length; s++) pileSeed = (pileSeed * 31 + target.charCodeAt(s)) | 0;
        pileSeed = (pileSeed + total * 101 + idx * 7) | 0;
        var mixed = seededShuffle(items, pileSeed).map(function (it) {
          return { imgUrl: '/image-library-webp/themes/' + it.themeDir + '/' + it.noun + '@2x.webp' };
        });
        return {
          id: row.id + '.' + target + '-' + idx,
          promptKey: 'promptCount' + target.charAt(0).toUpperCase() + target.slice(1),
          answerType: 'state',
          setup: function (tool) {
            var tiles = buildSortCountTiles(correct, total, otherCounts, (pileSeed ^ 0x9E3779B9) | 0);
            /* stash the heterogeneous pile for the render() override below */
            tool._mixedItems = mixed;
            var subject = {
              type: 'group',
              imgUrl: mixed.length ? mixed[0].imgUrl : '',
              count: total,
              alt: self.api.t('labelObjects')
            };
            tool.setupTask(tiles, String(correct), subject);
          },
          check: function (tool) {
            var ok = tool.answer === String(correct);
            tool.showFeedback(ok);
            return ok;
          },
          hintKey: function (tool) {
            return tool.answer == null ? 'hintPickOne' : 'hintTryAgain';
          }
        };
      });
    }

    /* TEMPLATE: describe-attribute (K.MD.A.1, Measurement & Data) — show ONE
       object as the image subject; the kid taps the measurement-attribute
       WORD (long / tall / heavy = length / height / weight) that describes
       it. Describes a measurable attribute of a SINGLE object — structurally
       distinct from compare-length (K.MD.A.2, compares two instances) and
       sort-count (K.MD.B.3, classify-then-count). Curated single-salient
       objects only (pencil→long, giraffe→tall, rock→heavy); exactly one tile
       is defensible per round and co-salient objects (elephant=tall+heavy,
       a watermelon-slice that reads light) are excluded at the manifest.
       Structural twin of flat-solid (image subject + text tiles); the only
       activity-layer addition is the 3-word-tile layout (injectDescribe-
       AttributeCSS + the .cb-attr3 board tag in render()) — 0 lines to
       choice-board-core.js / lcs-shell.* / Direction A CSS. params.rounds = [
         { noun, themeDir, attribute:'long'|'tall'|'heavy' }, ...
       ]. */
    if (row.task_template === 'describe-attribute') {
      injectDescribeAttributeCSS();
      var attrRounds = row.params.rounds;
      var ATTR_ORDER = ['long', 'tall', 'heavy'];
      var ATTR_TILE = { long: 'labelLong', tall: 'labelTall', heavy: 'labelHeavy' };
      return attrRounds.map(function (round, idx) {
        var imgUrl = '/image-library-webp/themes/' + round.themeDir + '/' + round.noun + '@2x.webp';
        var targetKey = round.attribute;
        return {
          id: row.id + '.' + round.noun + '-' + targetKey,
          promptKey: 'promptDescribeAttribute',
          promptArgs: { noun: self.api.t('nounLabel_' + round.noun) },
          answerType: 'state',
          setup: function (tool) {
            /* Rotate the fixed long/tall/heavy triad by idx so the correct
               word isn't always in the same slot; deterministic (depends
               only on idx) so the 11 sibling locales render identically. */
            var r = idx % 3;
            var keys = ATTR_ORDER.slice(r).concat(ATTR_ORDER.slice(0, r));
            var options = keys.map(function (k) {
              return { key: k, text: self.api.t(ATTR_TILE[k]) };
            });
            var subject = {
              type: 'image',
              imgUrl: imgUrl,
              alt: self.api.t('nounLabel_' + round.noun) || round.noun
            };
            /* Flag for the render() override to tag the board .cb-attr3 so
               the wrapper-owned 3-word-tile CSS applies. */
            tool._attr3 = true;
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

    return STATIC_DEMO_TASKS;
  },

  /* Activity 10 K.MD.B.3 — heterogeneous-subject augmentation. After the
     core builds the DOM (the shell calls tool.render() right after
     task.setup()), swap each subject group-item's src to the per-position
     image stashed on tool._mixedItems by the sort-count setup(). Runs
     synchronously after the core render (no rAF/timing fragility per
     §A.13.47); touches 0 lines of choice-board-core.js / lcs-shell.* /
     Direction A CSS. No-op for every other template + the static demo
     (_mixedItems unset), and one activity loads per iframe, so there is
     zero cross-activity contamination. paint() never rebuilds the subject,
     so the swap survives selection + Check feedback; Next re-runs
     setup → render → re-swap. */
  render: function () {
    ChoiceBoardCore.render.call(this);
    /* Activity 11 K.MD.A.1 — tag the board so the wrapper-owned 3-word-tile
       CSS (injectDescribeAttributeCSS) applies. Guarded on the per-task
       _attr3 flag set by the describe-attribute setup(); no-op for every
       other template + the static demo. Idempotent (classList.add). */
    if (this._attr3 && this.api && this.api.stage) {
      var attrBoard = this.api.stage.querySelector('.cb-board');
      if (attrBoard) attrBoard.classList.add('cb-attr3');
    }
    var mixed = this._mixedItems;
    if (!mixed || !mixed.length || !this.api || !this.api.stage) return;
    var imgs = this.api.stage.querySelectorAll('.cb-subject--group .cb-group-item');
    for (var i = 0; i < imgs.length && i < mixed.length; i++) {
      if (mixed[i] && mixed[i].imgUrl) imgs[i].src = mixed[i].imgUrl;
    }
  }
});

ChoiceBoardCore.injectCSS();
