/* =====================================================================
   lamplight-cupboard-core.js — the model of ACTIVITY #80 of the
   one-by-one rebuild: "Sock & Shadow" → THE LAMPLIGHT CUPBOARD (SL.K.6,
   11 locales). Design sheet: docs/activities-rebuild/designs/080-sock-and-shadow.md
   ---------------------------------------------------------------------
   THE INVENTION: Shadow's cupboard is dark. Every word the child sends
   lights only the things that fit it, and the little door in the curtain
   lets ONE thing through — a phrase that fits two jams them in the door.
   Shadow has a few memory pegs: one word too many knocks the first off.
   Feeling rounds: "I feel … because …" — the feeling lights a face, the
   reason lights the help Shadow brings.
   Every word, phrase and sentence is a LITERAL per locale: the noun
   phrases are assembled from authored pieces by a per-locale rule
   (article, adjective place, definiteness) — never inflected by code.
   No DOM. UMD: window.LamplightCupboardCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.LamplightCupboardCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var LEVELS = ['l1', 'l2'];
  var MEMORY = ['3', '2'];
  var LAMPS = ['live', 'after'];

  var PIC = {
    cup: 'kitchen-tools/cup', mug: 'kitchen-tools/mug', glass: 'kitchen-tools/glass', ball: 'toys/ball', car: 'toys/car', truck: 'toys/truck',
    blocks: 'toys/blocks', kite: 'toys/kite', robot: 'toys/robot', hat: 'accessories/hat', cap: 'accessories/cap', sock: 'accessories/sock'
  };
  var FACE = { happy: 'emotions/happy', sad: 'emotions/sad', angry: 'emotions/angry', scared: 'emotions/scared', tired: 'emotions/tired', surprised: 'emotions/surprised' };
  /* each reason has ONE help (Shadow brings it) and one picture of what happened (contact sheets 2026-10-23: no labelled thunderstorm,
     so "scared" is about the dark — the moon — and "late" is the clock; no picture shows a fallen tower,
     so the round that wanted it is "sad because I am sick": the thermometer, and Shadow brings the tissues) */
  var HELP = { rain: 'weather/umbrella', dark: 'furniture/lamp', late: 'around-the-house/pillow', sick: 'hospital/tissue', birthday: 'bakery/cake', sunny: 'toys/kite', cold: 'weather/scarf' };
  var EVENT = { rain: 'weather/rainy', dark: 'camping/moon', late: 'around-the-house/clock', sick: 'hospital/thermometer', birthday: 'christmas/present', sunny: 'weather/sunny', cold: 'weather/snowflake' };

  /* Level 1 — things [noun, B|S, T|U]; target index; chips (n: noun · s: size · h: shelf · x: next to); pairs = things that stand side by side.
     A noun is SAID by tapping a thing in the cupboard (point and name), so the n: chips here only record the design; the tray keeps the other words. */
  var L1 = [
    { things: [['cup', 'B', 'T'], ['ball', 'B', 'T'], ['hat', 'B', 'U']], target: 0, chips: ['n:cup', 'n:ball', 'n:hat', 's:big', 'h:top'] },
    { things: [['sock', 'B', 'T'], ['car', 'B', 'T'], ['robot', 'B', 'U'], ['mug', 'B', 'U']], target: 0, chips: ['n:sock', 'n:mug', 'n:car', 's:big', 'h:top', 'h:bottom'] },
    { things: [['cup', 'B', 'T'], ['cup', 'S', 'T'], ['ball', 'B', 'U'], ['mug', 'B', 'U']], target: 1, chips: ['n:cup', 's:small', 's:big', 'n:mug', 'h:top'] },
    { things: [['ball', 'B', 'T'], ['ball', 'B', 'U'], ['car', 'B', 'U'], ['kite', 'B', 'T']], target: 1, chips: ['n:ball', 'h:bottom', 'h:top', 's:big', 'n:car'] },
    { things: [['hat', 'B', 'T'], ['hat', 'S', 'U'], ['cap', 'S', 'T'], ['cap', 'B', 'U']], target: 1, chips: ['n:hat', 'n:cap', 's:small', 's:big', 'h:bottom'] },
    { things: [['car', 'B', 'T'], ['car', 'S', 'T'], ['car', 'B', 'U'], ['car', 'S', 'U'], ['truck', 'B', 'T']], target: 3, chips: ['n:car', 's:small', 'h:bottom', 's:big', 'h:top', 'n:truck'] },
    { things: [['truck', 'B', 'T'], ['car', 'B', 'T'], ['ball', 'S', 'U'], ['truck', 'B', 'U']], target: 0, chips: ['n:truck', 's:big', 'h:top', 'x:car', 'n:ball'], pairs: [[0, 1]] },
    { things: [['mug', 'B', 'T'], ['ball', 'B', 'T'], ['mug', 'B', 'U'], ['sock', 'B', 'U']], target: 0, chips: ['n:mug', 'x:ball', 'x:sock', 's:big', 'n:cup'], pairs: [[0, 1], [2, 3]] },
    { things: [['glass', 'S', 'T'], ['glass', 'B', 'T'], ['glass', 'S', 'U'], ['cup', 'S', 'U']], target: 0, chips: ['n:glass', 's:small', 'h:top', 's:big', 'n:cup'] }
  ];
  /* Level 2 — [feeling, reason, the 3 faces in the cupboard, the 3 helps (by reason), feeling chips, reason chips, please?] */
  var L2 = [
    ['sad', 'rain', ['sad', 'happy', 'tired'], ['rain', 'late', 'sunny'], ['sad', 'happy'], ['rain', 'late'], true],
    ['scared', 'dark', ['scared', 'happy', 'angry'], ['dark', 'cold', 'sunny'], ['scared', 'happy'], ['dark', 'cold'], false],
    ['tired', 'late', ['tired', 'sad', 'happy'], ['late', 'rain', 'birthday'], ['tired', 'sad'], ['late', 'rain'], true],
    ['sad', 'sick', ['sad', 'angry', 'happy'], ['sick', 'late', 'cold'], ['sad', 'angry'], ['sick', 'dark'], false],
    ['happy', 'birthday', ['happy', 'surprised', 'sad'], ['birthday', 'rain', 'dark'], ['happy', 'surprised'], ['birthday', 'sunny'], false],
    ['happy', 'sunny', ['happy', 'tired', 'scared'], ['sunny', 'cold', 'late'], ['happy', 'tired'], ['sunny', 'birthday'], false],
    ['sad', 'cold', ['sad', 'angry', 'surprised'], ['cold', 'sunny', 'birthday'], ['sad', 'angry'], ['cold', 'rain'], true],
    ['surprised', 'birthday', ['surprised', 'happy', 'scared'], ['birthday', 'dark', 'rain'], ['surprised', 'happy'], ['birthday', 'late'], false]
  ];

  /* ---- words, per locale ----
     n: noun → [chip word, gender, definite form (sv/no/da)…]; the phrase rule per locale lives in build(). */
  var W = {
    en: {
      n: { cup: ['cup'], mug: ['mug'], glass: ['glass'], ball: ['ball'], hat: ['hat'], cap: ['cap'], sock: ['sock'], car: ['car'], truck: ['truck'], kite: ['kite'], robot: ['robot'], one: ['one'] },
      big: 'big', small: 'small', top: 'on the top shelf', bottom: 'on the bottom shelf',
      x: { car: 'next to the car', ball: 'next to the ball', sock: 'next to the sock' },
      f: { happy: 'I feel happy', sad: 'I feel sad', angry: 'I feel angry', scared: 'I feel scared', tired: 'I feel tired', surprised: 'I feel surprised' },
      fc: { happy: 'happy', sad: 'sad', angry: 'angry', scared: 'scared', tired: 'tired', surprised: 'surprised' },
      r: { rain: 'because it is raining', dark: 'because it is dark', late: 'because it is late', sick: 'because I am sick', birthday: 'because it is my birthday', sunny: 'because it is sunny', cold: 'because it is cold' },
      sep: ' ', please: 'Please help me.', pc: 'please'
    },
    de: {
      n: { cup: ['Tasse', 'f'], mug: ['Becher', 'm'], glass: ['Glas', 'n'], ball: ['Ball', 'm'], hat: ['Hut', 'm'], cap: ['Kappe', 'f'], sock: ['Socke', 'f'], car: ['Auto', 'n'], truck: ['Lastwagen', 'm'], kite: ['Drachen', 'm'], robot: ['Roboter', 'm'], one: ['Ding', 'n'] },
      big: 'groß', small: 'klein', top: 'oben im Regal', bottom: 'unten im Regal',
      x: { car: 'neben dem Auto', ball: 'neben dem Ball', sock: 'neben der Socke' },
      f: { happy: 'Ich bin froh', sad: 'Ich bin traurig', angry: 'Ich bin wütend', scared: 'Ich habe Angst', tired: 'Ich bin müde', surprised: 'Ich bin überrascht' },
      fc: { happy: 'froh', sad: 'traurig', angry: 'wütend', scared: 'Angst', tired: 'müde', surprised: 'überrascht' },
      r: { rain: 'weil es regnet', dark: 'weil es dunkel ist', late: 'weil es spät ist', sick: 'weil ich krank bin', birthday: 'weil ich Geburtstag habe', sunny: 'weil die Sonne scheint', cold: 'weil es kalt ist' },
      sep: ', ', please: 'Hilf mir bitte.', pc: 'bitte'
    },
    nl: {
      n: { cup: ['kopje', 'het'], mug: ['mok', 'de'], glass: ['glas', 'het'], ball: ['bal', 'de'], hat: ['hoed', 'de'], cap: ['pet', 'de'], sock: ['sok', 'de'], car: ['auto', 'de'], truck: ['vrachtwagen', 'de'], kite: ['vlieger', 'de'], robot: ['robot', 'de'], one: ['ding', 'het'] },
      big: 'groot', small: 'klein', top: 'op de bovenste plank', bottom: 'op de onderste plank',
      x: { car: 'naast de auto', ball: 'naast de bal', sock: 'naast de sok' },
      f: { happy: 'Ik ben blij', sad: 'Ik ben verdrietig', angry: 'Ik ben boos', scared: 'Ik ben bang', tired: 'Ik ben moe', surprised: 'Ik ben verrast' },
      fc: { happy: 'blij', sad: 'verdrietig', angry: 'boos', scared: 'bang', tired: 'moe', surprised: 'verrast' },
      r: { rain: 'omdat het regent', dark: 'omdat het donker is', late: 'omdat het laat is', sick: 'omdat ik ziek ben', birthday: 'omdat ik jarig ben', sunny: 'omdat de zon schijnt', cold: 'omdat het koud is' },
      sep: ' ', please: 'Help me alsjeblieft.', pc: 'alsjeblieft'
    },
    da: {   /* [indefinite, gender c|n, definite] — with an adjective: den/det + adjective + INDEFINITE noun (single definiteness) */
      n: { cup: ['kop', 'c', 'koppen'], mug: ['krus', 'n', 'kruset'], glass: ['glas', 'n', 'glasset'], ball: ['bold', 'c', 'bolden'], hat: ['hat', 'c', 'hatten'], cap: ['kasket', 'c', 'kasketten'], sock: ['strømpe', 'c', 'strømpen'], car: ['bil', 'c', 'bilen'], truck: ['lastbil', 'c', 'lastbilen'], kite: ['drage', 'c', 'dragen'], robot: ['robot', 'c', 'robotten'], one: ['ting', 'c', 'tingen'] },
      big: 'store', small: 'lille', bigc: 'stor', smallc: 'lille', top: 'på den øverste hylde', bottom: 'på den nederste hylde',
      x: { car: 'ved siden af bilen', ball: 'ved siden af bolden', sock: 'ved siden af strømpen' },
      f: { happy: 'Jeg er glad', sad: 'Jeg er ked af det', angry: 'Jeg er vred', scared: 'Jeg er bange', tired: 'Jeg er træt', surprised: 'Jeg er overrasket' },
      fc: { happy: 'glad', sad: 'ked af det', angry: 'vred', scared: 'bange', tired: 'træt', surprised: 'overrasket' },
      r: { rain: 'fordi det regner', dark: 'fordi det er mørkt', late: 'fordi det er sent', sick: 'fordi jeg er syg', birthday: 'fordi jeg har fødselsdag', sunny: 'fordi solen skinner', cold: 'fordi det er koldt' },
      sep: ', ', please: 'Vil du ikke nok hjælpe mig?', pc: 'vil du ikke nok'
    },
    sv: {   /* double definiteness: den/det + adjective + DEFINITE noun */
      n: { cup: ['kopp', 'c', 'koppen'], mug: ['mugg', 'c', 'muggen'], glass: ['glas', 'n', 'glaset'], ball: ['boll', 'c', 'bollen'], hat: ['hatt', 'c', 'hatten'], cap: ['keps', 'c', 'kepsen'], sock: ['strumpa', 'c', 'strumpan'], car: ['bil', 'c', 'bilen'], truck: ['lastbil', 'c', 'lastbilen'], kite: ['drake', 'c', 'draken'], robot: ['robot', 'c', 'roboten'], one: ['sak', 'c', 'saken'] },
      big: 'stora', small: 'lilla', bigc: 'stor', smallc: 'liten', top: 'på översta hyllan', bottom: 'på nedersta hyllan',
      x: { car: 'bredvid bilen', ball: 'bredvid bollen', sock: 'bredvid strumpan' },
      f: { happy: 'Jag är glad', sad: 'Jag är ledsen', angry: 'Jag är arg', scared: 'Jag är rädd', tired: 'Jag är trött', surprised: 'Jag är förvånad' },
      fc: { happy: 'glad', sad: 'ledsen', angry: 'arg', scared: 'rädd', tired: 'trött', surprised: 'förvånad' },
      r: { rain: 'för att det regnar', dark: 'för att det är mörkt', late: 'för att det är sent', sick: 'för att jag är sjuk', birthday: 'för att jag fyller år', sunny: 'för att solen skiner', cold: 'för att det är kallt' },
      sep: ' ', please: 'Snälla, hjälp mig.', pc: 'snälla'
    },
    no: {   /* double definiteness like sv */
      n: { cup: ['kopp', 'c', 'koppen'], mug: ['krus', 'n', 'kruset'], glass: ['glass', 'n', 'glasset'], ball: ['ball', 'c', 'ballen'], hat: ['hatt', 'c', 'hatten'], cap: ['caps', 'c', 'capsen'], sock: ['sokk', 'c', 'sokken'], car: ['bil', 'c', 'bilen'], truck: ['lastebil', 'c', 'lastebilen'], kite: ['drage', 'c', 'dragen'], robot: ['robot', 'c', 'roboten'], one: ['ting', 'c', 'tingen'] },
      big: 'store', small: 'lille', bigc: 'stor', smallc: 'liten', top: 'på øverste hylle', bottom: 'på nederste hylle',
      x: { car: 'ved siden av bilen', ball: 'ved siden av ballen', sock: 'ved siden av sokken' },
      f: { happy: 'Jeg er glad', sad: 'Jeg er lei meg', angry: 'Jeg er sint', scared: 'Jeg er redd', tired: 'Jeg er trøtt', surprised: 'Jeg er overrasket' },
      fc: { happy: 'glad', sad: 'lei meg', angry: 'sint', scared: 'redd', tired: 'trøtt', surprised: 'overrasket' },
      r: { rain: 'fordi det regner', dark: 'fordi det er mørkt', late: 'fordi det er sent', sick: 'fordi jeg er syk', birthday: 'fordi jeg har bursdag', sunny: 'fordi solen skinner', cold: 'fordi det er kaldt' },
      sep: ' ', please: 'Vær så snill og hjelp meg.', pc: 'vær så snill'
    },
    es: {   /* the size word follows the noun; Sock (el calcetín) speaks as masculine */
      n: { cup: ['taza', 'f'], mug: ['tarro', 'm'], glass: ['vaso', 'm'], ball: ['pelota', 'f'], hat: ['sombrero', 'm'], cap: ['gorra', 'f'], sock: ['calcetín', 'm'], car: ['carro', 'm'], truck: ['camión', 'm'], kite: ['papalote', 'm'], robot: ['robot', 'm'], one: ['cosa', 'f'] },
      big: ['grande', 'grande'], small: ['pequeño', 'pequeña'], bigc: 'grande', smallc: 'pequeño', top: 'en la repisa de arriba', bottom: 'en la repisa de abajo',
      x: { car: 'junto al carro', ball: 'junto a la pelota', sock: 'junto al calcetín' },
      f: { happy: 'Estoy contento', sad: 'Estoy triste', angry: 'Estoy enojado', scared: 'Tengo miedo', tired: 'Tengo sueño', surprised: 'Estoy sorprendido' },
      fc: { happy: 'contento', sad: 'triste', angry: 'enojado', scared: 'miedo', tired: 'sueño', surprised: 'sorprendido' },
      r: { rain: 'porque está lloviendo', dark: 'porque está oscuro', late: 'porque ya es tarde', sick: 'porque tengo gripa', birthday: 'porque es mi cumpleaños', sunny: 'porque hace sol', cold: 'porque hace frío' },
      sep: ' ', please: 'Ayúdame, por favor.', pc: 'por favor'
    },
    it: {   /* the size word follows the noun; Sock (il calzino) speaks as masculine */
      n: { cup: ['tazza', 'f'], mug: ['tazzone', 'm'], glass: ['bicchiere', 'm'], ball: ['palla', 'f'], hat: ['cappello', 'm'], cap: ['berretto', 'm'], sock: ['calzino', 'm'], car: ['macchina', 'f'], truck: ['camion', 'm'], kite: ['aquilone', 'm'], robot: ['robot', 'm'], one: ['cosa', 'f'] },
      big: ['grande', 'grande'], small: ['piccolo', 'piccola'], bigc: 'grande', smallc: 'piccolo', top: 'sul ripiano in alto', bottom: 'sul ripiano in basso',
      x: { car: 'vicino alla macchina', ball: 'vicino alla palla', sock: 'vicino al calzino' },
      f: { happy: 'Sono contento', sad: 'Sono triste', angry: 'Sono arrabbiato', scared: 'Ho paura', tired: 'Ho sonno', surprised: 'Sono sorpreso' },
      fc: { happy: 'contento', sad: 'triste', angry: 'arrabbiato', scared: 'paura', tired: 'sonno', surprised: 'sorpreso' },
      r: { rain: 'perché piove', dark: 'perché è buio', late: 'perché è tardi', sick: 'perché ho il raffreddore', birthday: 'perché è il mio compleanno', sunny: 'perché c’è il sole', cold: 'perché fa freddo' },
      sep: ' ', please: 'Aiutami, per favore.', pc: 'per favore'
    },
    pt: {   /* the size word follows the noun; Sock (a meia) speaks as feminine */
      n: { cup: ['xícara', 'f'], mug: ['caneca', 'f'], glass: ['copo', 'm'], ball: ['bola', 'f'], hat: ['chapéu', 'm'], cap: ['boné', 'm'], sock: ['meia', 'f'], car: ['carro', 'm'], truck: ['caminhão', 'm'], kite: ['pipa', 'f'], robot: ['robô', 'm'], one: ['coisa', 'f'] },
      big: ['grande', 'grande'], small: ['pequeno', 'pequena'], bigc: 'grande', smallc: 'pequeno', top: 'na prateleira de cima', bottom: 'na prateleira de baixo',
      x: { car: 'ao lado do carro', ball: 'ao lado da bola', sock: 'ao lado da meia' },
      f: { happy: 'Estou feliz', sad: 'Estou triste', angry: 'Estou com raiva', scared: 'Estou com medo', tired: 'Estou com sono', surprised: 'Estou surpresa' },
      fc: { happy: 'feliz', sad: 'triste', angry: 'com raiva', scared: 'com medo', tired: 'com sono', surprised: 'surpresa' },
      r: { rain: 'porque está chovendo', dark: 'porque está escuro', late: 'porque já está tarde', sick: 'porque estou com gripe', birthday: 'porque é meu aniversário', sunny: 'porque está fazendo sol', cold: 'porque está frio' },
      sep: ' ', please: 'Me ajuda, por favor.', pc: 'por favor'
    },
    fr: {   /* the size word comes before the noun and agrees; Sock (la chaussette) speaks as feminine */
      n: { cup: ['tasse', 'f'], mug: ['mug', 'm'], glass: ['verre', 'm'], ball: ['ballon', 'm'], hat: ['chapeau', 'm'], cap: ['casquette', 'f'], sock: ['chaussette', 'f'], car: ['voiture', 'f'], truck: ['camion', 'm'], kite: ['cerf-volant', 'm'], robot: ['robot', 'm'], one: ['objet', 'm'] },
      big: ['grand', 'grande'], small: ['petit', 'petite'], bigc: 'grand', smallc: 'petit', top: 'sur l’étagère du haut', bottom: 'sur l’étagère du bas',
      x: { car: 'à côté de la voiture', ball: 'à côté du ballon', sock: 'à côté de la chaussette' },
      f: { happy: 'Je suis contente', sad: 'Je suis triste', angry: 'Je suis en colère', scared: 'J’ai peur', tired: 'J’ai sommeil', surprised: 'Je suis surprise' },
      fc: { happy: 'contente', sad: 'triste', angry: 'en colère', scared: 'peur', tired: 'sommeil', surprised: 'surprise' },
      r: { rain: 'parce qu’il pleut', dark: 'parce qu’il fait noir', late: 'parce qu’il est tard', sick: 'parce que je suis malade', birthday: 'parce que c’est mon anniversaire', sunny: 'parce qu’il fait beau', cold: 'parce qu’il fait froid' },
      sep: ' ', please: 'Aide-moi, s’il te plaît.', pc: 's’il te plaît'
    },
    fi: {   /* no article; the size word first, the place after */
      n: { cup: ['kuppi'], mug: ['muki'], glass: ['lasi'], ball: ['pallo'], hat: ['hattu'], cap: ['lippis'], sock: ['sukka'], car: ['auto'], truck: ['kuorma-auto'], kite: ['leija'], robot: ['robotti'], one: ['esine'] },
      big: 'iso', small: 'pieni', top: 'ylähyllyllä', bottom: 'alahyllyllä',
      x: { car: 'auton vieressä', ball: 'pallon vieressä', sock: 'sukan vieressä' },
      f: { happy: 'Olen iloinen', sad: 'Olen surullinen', angry: 'Olen vihainen', scared: 'Minua pelottaa', tired: 'Olen väsynyt', surprised: 'Olen yllättynyt' },
      fc: { happy: 'iloinen', sad: 'surullinen', angry: 'vihainen', scared: 'pelottaa', tired: 'väsynyt', surprised: 'yllättynyt' },
      r: { rain: 'koska sataa', dark: 'koska on pimeää', late: 'koska on myöhä', sick: 'koska olen kipeä', birthday: 'koska on syntymäpäiväni', sunny: 'koska aurinko paistaa', cold: 'koska on kylmä' },
      sep: ', ', please: 'Auta minua, ole kiltti.', pc: 'ole kiltti'
    }
  };

  function locale(l) { l = String(l || 'en').slice(0, 2); return W[l] ? l : 'en'; }
  function levelOf(v) { return LEVELS.indexOf(v) >= 0 ? v : 'l1'; }
  function memoryOf(v) { v = String(v); return MEMORY.indexOf(v) >= 0 ? +v : 3; }
  function lampsOf(v) { return LAMPS.indexOf(v) >= 0 ? v : 'live'; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }
  function cap(s) { return s.charAt(0).toLocaleUpperCase() + s.slice(1); }

  /* ---- the noun phrase: segments [{t, w?}] so each word can be underlined in its bead colour ---- */
  function build(loc, words) {
    loc = locale(loc);
    var L = W[loc], get = function (c) { for (var i = 0; i < words.length; i++) if (words[i].charAt(0) === c) return words[i]; return null; };
    var nw = get('n'), sw = get('s'), hw = get('h'), xw = get('x'), key = nw ? nw.slice(2) : 'one', N = L.n[key], g = N[1], size = sw ? sw.slice(2) : null;
    var seg = [], put = function (t, w) { seg.push({ t: t, w: w || null }); };
    var noun = function (form) { put(form, nw); };
    if (loc === 'en') { put('the '); if (sw) put(L[size] + ' ', sw); noun(N[0]); }
    else if (loc === 'de') { put({ m: 'der ', f: 'die ', n: 'das ' }[g]); if (sw) put((size === 'big' ? 'große' : 'kleine') + ' ', sw); noun(N[0]); }
    else if (loc === 'nl') { put(g === 'het' ? 'het ' : 'de '); if (sw) put((size === 'big' ? 'grote' : 'kleine') + ' ', sw); noun(N[0]); }
    else if (loc === 'sv' || loc === 'no') { if (sw) { put(g === 'n' ? 'det ' : 'den '); put(L[size] + ' ', sw); } noun(N[2]); }
    else if (loc === 'da') { if (sw) { put(g === 'n' ? 'det ' : 'den '); put(L[size] + ' ', sw); noun(N[0]); } else noun(N[2]); }
    else if (loc === 'fr') {
      var adj = sw ? L[size][g === 'f' ? 1 : 0] : null, first = adj || N[0];
      put(/^[aeiouéèêh]/i.test(first) ? 'l’' : (g === 'f' ? 'la ' : 'le '));
      if (sw) put(adj + ' ', sw); noun(N[0]);
    } else if (loc === 'es' || loc === 'it' || loc === 'pt') {
      var art = loc === 'es' ? (g === 'f' ? 'la ' : 'el ') : loc === 'pt' ? (g === 'f' ? 'a ' : 'o ') : (g === 'f' ? (/^[aeiou]/i.test(N[0]) ? 'l’' : 'la ') : (/^[aeiou]/i.test(N[0]) ? 'l’' : (/^(z|s[^aeiou]|gn|ps|x)/i.test(N[0]) ? 'lo ' : 'il ')));
      put(art); noun(N[0]); if (sw) put(' ' + L[size][g === 'f' ? 1 : 0], sw);
    } else { if (sw) put(L[size] + ' ', sw); noun(N[0]); }   /* fi */
    if (hw) put(' ' + L[hw.slice(2)], hw);
    if (xw) put(' ' + L.x[xw.slice(2)], xw);
    if (seg.length) seg[0].t = cap(seg[0].t);
    return seg;
  }
  /* the feeling sentence: "I feel … because …." + an optional, ungraded "please" */
  function buildFeel(loc, words) {
    var L = W[locale(loc)], f = null, r = null, p = null, seg = [];
    words.forEach(function (w) { if (w.charAt(0) === 'f') f = w; else if (w.charAt(0) === 'r') r = w; else if (w.charAt(0) === 'p') p = w; });
    if (f) seg.push({ t: L.f[f.slice(2)], w: f });
    if (r) seg.push({ t: (f ? L.sep : '') + (f ? L.r[r.slice(2)] : cap(L.r[r.slice(2)])), w: r });
    if (f || r) seg.push({ t: '.', w: null });
    if (p) seg.push({ t: (seg.length ? ' ' : '') + L.please, w: p });
    return seg;
  }
  function phraseText(seg) { return seg.map(function (s) { return s.t; }).join(''); }
  function chipLabel(loc, w) {
    var L = W[locale(loc)], c = w.charAt(0), k = w.slice(2);
    if (c === 'n') return L.n[k][0];
    if (c === 's') return L[k + 'c'] || (Array.isArray(L[k]) ? L[k][0] : L[k]);
    if (c === 'h') return L[k];
    if (c === 'x') return L.x[k];
    if (c === 'f') return L.fc[k];
    if (c === 'r') return L.r[k];
    return L.pc;
  }

  /* ---- rounds and deals ---- */
  function ids(level) { var n = levelOf(level) === 'l1' ? L1.length : L2.length, out = []; for (var i = 0; i < n; i++) out.push(i); return out; }
  /* a round as dealt: L1 things {noun, size, shelf, col}; mirrored = the shelves (and the shelf chips) swapped */
  function round(level, idx, lay) {
    level = levelOf(level); lay = lay || {};
    if (level === 'l1') {
      var x = L1[idx], mir = !!lay.mirror, flip = function (s) { return mir ? (s === 'T' ? 'U' : 'T') : s; };
      var things = x.things.map(function (t, i) { return { i: i, noun: t[0], size: t[1], shelf: flip(t[2]), col: lay.cols ? lay.cols[i] : i % 3 }; });
      var chips = x.chips.filter(function (c) { return c.charAt(0) !== 'n'; }).map(function (c) { return mir && c.charAt(0) === 'h' ? (c === 'h:top' ? 'h:bottom' : 'h:top') : c; });
      if (lay.chipOrder) chips = lay.chipOrder.map(function (k) { return chips[k]; });
      var say = []; things.forEach(function (t) { if (say.indexOf('n:' + t.noun) < 0) say.push('n:' + t.noun); });
      return { id: 'l1.' + idx, level: 'l1', idx: idx, things: things, target: x.target, chips: chips, say: say, mirror: mir };
    }
    var y = L2[idx], fpos = lay.facePos == null ? 0 : lay.facePos, hpos = lay.helpPos == null ? 0 : lay.helpPos;
    var place = function (arr, right, pos) { var rest = arr.filter(function (k) { return k !== right; }), out = []; for (var p = 0, q = 0; p < 3; p++) out.push(p === pos ? right : rest[q++]); return out; };
    var chips2 = y[5].map(function (r) { return 'r:' + r; }).concat(y[6] ? ['p:please'] : []);
    if (lay.chipOrder) chips2 = lay.chipOrder.map(function (k) { return chips2[k]; });
    return { id: 'l2.' + idx, level: 'l2', idx: idx, feel: y[0], reason: y[1], faces: place(y[2], y[0], fpos), helps: place(y[3], y[1], hpos), chips: chips2, say: place(y[2], y[0], fpos).map(function (k) { return 'f:' + k; }) };
  }
  function cubby(t) { return (t.shelf === 'T' ? 0 : 3) + t.col; }
  function fits(r, t, w) {
    var c = w.charAt(0), k = w.slice(2);
    if (c === 'n') return t.noun === k;
    if (c === 's') return t.size === (k === 'big' ? 'B' : 'S');
    if (c === 'h') return t.shelf === (k === 'top' ? 'T' : 'U');
    if (c === 'x') return r.things.some(function (o) { return o !== t && o.shelf === t.shelf && Math.abs(o.col - t.col) === 1 && o.noun === k; });
    return true;
  }
  function litSet(r, words) {
    if (!words.length) return [];
    return r.things.filter(function (t) { return words.every(function (w) { return fits(r, t, w); }); }).map(function (t) { return t.i; });
  }
  function litFaces(r, words) { var f = words.filter(function (w) { return w.charAt(0) === 'f'; })[0]; return f ? r.faces.map(function (k, p) { return k === f.slice(2) ? p : -1; }).filter(function (p) { return p >= 0; }) : []; }
  function litHelps(r, words) { var x = words.filter(function (w) { return w.charAt(0) === 'r'; })[0]; return x ? r.helps.map(function (k, p) { return k === x.slice(2) ? p : -1; }).filter(function (p) { return p >= 0; }) : [0, 1, 2]; }
  /* the shortest clear phrase length (L1): the fewest chips whose lit set is exactly the target */
  function shortest(r) {
    var ch = r.chips.concat(r.say), n = ch.length, best = 99;
    for (var m = 1; m < (1 << n); m++) {
      var ws = ch.filter(function (c, b) { return m & (1 << b); }), cats = {}, ok = true;
      ws.forEach(function (w) { if (cats[w.charAt(0)]) ok = false; cats[w.charAt(0)] = 1; });
      if (!ok) continue;
      var lit = litSet(r, ws); if (lit.length === 1 && lit[0] === r.target && ws.length < best) best = ws.length;
    }
    return best;
  }
  /* columns: each shelf's things in distinct columns, side-by-side pairs kept side by side */
  function dealCols(x, rnd) {
    for (var t = 0; t < 500; t++) {
      var cols = [], ok = true;
      ['T', 'U'].forEach(function (s) { var on = []; x.things.forEach(function (th, i) { if (th[2] === s) on.push(i); }); var c = shuffle([0, 1, 2], rnd); on.forEach(function (i, k) { cols[i] = c[k]; }); });
      (x.pairs || []).forEach(function (p) { if (Math.abs(cols[p[0]] - cols[p[1]]) !== 1) ok = false; });
      if (ok) return cols;
    }
    return null;
  }
  /* one pass: the order, and for each round its layout — L1: half the targets on each shelf, never the same cubby twice running,
     the first chips never a clear phrase on their own; L2: the right face and help each in each place 2–3 times */
  function plan(level, rnd, prev) {
    level = levelOf(level);
    var all = ids(level), order;
    for (var t = 0; t < 2000; t++) {
      order = level === 'l1' ? [0, 1].concat(shuffle(all.slice(2), rnd)) : shuffle(all.slice(), rnd);
      if (prev && prev.length && prev.join() === order.join()) continue;
      break;
    }
    var lays = [];
    if (level === 'l1') {
      for (var a = 0; a < 4000; a++) {
        lays = []; var tops = 0, lastCub = -1, ok = true;
        for (var p = 0; p < order.length && ok; p++) {
          var x = L1[order[p]], mirror = rnd() < 0.5, cols = dealCols(x, rnd);
          var lay = { mirror: mirror, cols: cols, chipOrder: null }, r0 = round('l1', order[p], lay), tg = r0.things[x.target];
          if (cubby(tg) === lastCub) { ok = false; break; }
          lastCub = cubby(tg); if (tg.shelf === 'T') tops++;
          lay.chipOrder = dealChips(r0, rnd);
          lays.push(lay);
        }
        if (ok && tops >= 4 && tops <= 5) break;
      }
    } else {
      var fp = shuffle([0, 0, 0, 1, 1, 1, 2, 2], rnd), hp = shuffle([0, 0, 0, 1, 1, 1, 2, 2], rnd);
      order.forEach(function (idx, p) { var lay = { facePos: fp[p], helpPos: hp[p] }; lay.chipOrder = shuffle(L2[idx][5].concat(L2[idx][6] ? [0] : []).map(function (c, k) { return k; }), rnd); lays.push(lay); });
    }
    return { order: order, lays: lays };
  }
  function dealChips(r0, rnd) {
    var n = r0.chips.length, k = shortest(r0);
    for (var t = 0; t < 200; t++) {
      var o = shuffle(r0.chips.map(function (c, i) { return i; }), rnd), first = o.slice(0, Math.max(1, k - 1)).map(function (i) { return r0.chips[i]; }).concat(['n:' + r0.things[r0.target].noun]);
      var lit = litSet(r0, uniqCats(first)); if (!(lit.length === 1 && lit[0] === r0.target)) return o;
    }
    return r0.chips.map(function (c, i) { return i; });
  }
  function uniqCats(ws) { var seen = {}, out = []; ws.forEach(function (w) { var c = w.charAt(0); if (seen[c]) { out[seen[c] - 1] = w; } else { out.push(w); seen[c] = out.length; } }); return out; }

  /* ---- the round's state ---- */
  function newState(r, memory, lamps) {
    return { r: r, memory: memoryOf(memory), lamps: lampsOf(lamps), strip: [], pegs: [], dropped: [], sent: false, peeked: false, last: null, misses: 0, tries: 0, help: 0, done: false };
  }
  function clear(st) { st.last = null; st.help = 0; st.pegs = []; st.dropped = []; st.sent = false; }
  /* a tap on a chip: it joins the strip; a chip of the same kind already there goes back (one noun, one size, one place, one next-to) */
  function addWord(st, w) {
    if (st.done || (st.r.chips.indexOf(w) < 0 && st.r.say.indexOf(w) < 0) || st.strip.indexOf(w) >= 0) return false;
    st.strip = st.strip.filter(function (x) { return x.charAt(0) !== w.charAt(0); }); st.strip.push(w); clear(st); return true;
  }
  function removeWord(st, w) { if (st.done || st.strip.indexOf(w) < 0) return false; st.strip.splice(st.strip.indexOf(w), 1); clear(st); return true; }
  /* the lamps: live = the strip's words; after Check = the words on the pegs */
  function lit(st) { var ws = st.sent ? st.pegs : st.strip; return st.r.level === 'l1' ? litSet(st.r, ws) : { faces: litFaces(st.r, ws), helps: litHelps(st.r, ws) }; }
  /* the tube: the words travel to Shadow's pegs; "please" takes no peg; the last `memory` words stay, the first ones roll off */
  function send(st) {
    var ws = st.strip.filter(function (w) { return w.charAt(0) !== 'p'; });
    st.pegs = ws.slice(Math.max(0, ws.length - st.memory)); st.dropped = ws.slice(0, Math.max(0, ws.length - st.memory)); st.sent = true; st.peeked = true;
  }
  function miss(st, reason, extra) { st.misses++; st.tries++; st.help = Math.min(2, st.tries); st.last = { reason: reason }; if (extra) for (var k in extra) st.last[k] = extra[k]; return { ok: false, reason: reason }; }
  function check(st) {
    if (st.done) return { ok: true };
    var r = st.r;
    if (!st.strip.filter(function (w) { return w.charAt(0) !== 'p'; }).length) { st.last = { reason: 'empty' }; st.help = 0; return { ok: false, reason: 'empty' }; }
    send(st);
    if (r.level === 'l1') {
      var L = litSet(r, st.pegs), door = L.length === 1 ? 'through' : L.length ? 'jam' : 'none';
      if (L.length === 1 && L[0] === r.target) { st.done = true; st.last = { reason: 'ok', lit: L }; st.help = 0; return { ok: true, door: door }; }
      var why = st.dropped.length ? 'overflow' : door === 'jam' ? 'jam' : door === 'none' ? 'none' : 'wrong';
      return miss(st, why, { lit: L, door: door });
    }
    var F = litFaces(r, st.pegs), H = litHelps(r, st.pegs), fp = r.faces.indexOf(r.feel), hp = r.helps.indexOf(r.reason);
    if (F.length === 1 && F[0] === fp && H.length === 1 && H[0] === hp) { st.done = true; st.last = { reason: 'ok', faces: F, helps: H }; st.help = 0; return { ok: true }; }
    var hasF = st.pegs.some(function (w) { return w.charAt(0) === 'f'; }), hasR = st.pegs.some(function (w) { return w.charAt(0) === 'r'; });
    var why2 = st.dropped.length ? 'overflow' : !hasF ? 'noFeel' : !hasR ? 'noWhy' : F[0] !== fp ? 'wrongFace' : 'wrongHelp';
    return miss(st, why2, { faces: F, helps: H });
  }
  function hint(st) {
    if (st.done || !st.last || st.last.reason === 'ok') return null;
    var R = st.last.reason;
    if (R === 'empty') return 'hEmpty';
    if (st.help >= 2) return st.r.level === 'l1' ? 'hMiss2' : 'hMiss2f';
    return ({ overflow: 'hOverflow', jam: 'hJam', none: 'hNone', wrong: 'hWrong', noFeel: 'hNoFeel', noWhy: 'hNoWhy', wrongFace: 'hWrongFace', wrongHelp: 'hWrongHelp' })[R];
  }
  /* miss 2 (L1): each lit thing other than Sock's gets a badge for the first way it differs; the chips that would tell them apart throb */
  function badges(st) {
    if (st.help < 2 || !st.last || st.done || st.r.level !== 'l1') return null;
    var r = st.r, tg = r.things[r.target], cand = (st.last.lit && st.last.lit.length ? st.last.lit : r.things.map(function (t) { return t.i; })).filter(function (i) { return i !== r.target; });
    var out = { target: r.target, others: {}, chips: [] };
    cand.forEach(function (i) {
      var t = r.things[i], d = t.noun !== tg.noun ? 'n' : t.size !== tg.size ? 's' : t.shelf !== tg.shelf ? 'h' : 'x';
      out.others[i] = d;
    });
    out.chips = r.chips.concat(r.say).filter(function (w) { return fits(r, tg, w) && cand.some(function (i) { return !fits(r, r.things[i], w); }); });
    return out;
  }
  /* miss 2 (L2): the chips that belong in the sentence throb */
  function feelHelp(st) { if (st.help < 2 || !st.last || st.done || st.r.level !== 'l2') return []; return ['f:' + st.r.feel, 'r:' + st.r.reason]; }

  /* sizes per width: library pictures at the floor — big 132 / small 96 on a desktop card, 92 / 64 on a phone */
  function layout(W) {
    var wide = W >= 620, tiny = W < 300;   /* below 620 the counter would squeeze the cubbies until big and small looked alike */
    return { mode: wide ? 'wide' : 'narrow', tiny: tiny, W: W, big: wide ? 132 : tiny ? 88 : 96, small: wide ? 96 : 64, face: wide ? 96 : 64, chipPic: wide ? 96 : 64 };
  }

  return {
    DATA: { PIC: PIC, FACE: FACE, HELP: HELP, EVENT: EVENT, L1: L1, L2: L2, W: W },
    LOCALES: LOCALES, LEVELS: LEVELS, MEMORY: MEMORY, LAMPS: LAMPS,
    locale: locale, levelOf: levelOf, memoryOf: memoryOf, lampsOf: lampsOf, shuffle: shuffle,
    build: build, buildFeel: buildFeel, phraseText: phraseText, chipLabel: chipLabel,
    ids: ids, round: round, cubby: cubby, fits: fits, litSet: litSet, litFaces: litFaces, litHelps: litHelps, shortest: shortest, dealCols: dealCols, plan: plan,
    newState: newState, addWord: addWord, removeWord: removeWord, lit: lit, send: send, check: check, hint: hint, badges: badges, feelHelp: feelHelp, layout: layout
  };
}));
