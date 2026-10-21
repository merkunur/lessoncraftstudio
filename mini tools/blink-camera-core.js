/* =====================================================================
   blink-camera-core.js — the model of ACTIVITY #60 of the one-by-one
   rebuild: "Read Common Sight Words" → THE BLINK CAMERA (RF.K.3.c,
   11 locales). Design sheet: docs/activities-rebuild/designs/060-choice-board.md
   ---------------------------------------------------------------------
   THE INVENTION: a sight word is a word you can read in a blink — so a
   toy camera shows the word for ONE blink while the cards lie face down,
   and the child finds the word they saw among its look-alikes.
     snap   — Snap and find: four cards, the word + its three look-alikes
     hunt   — Find every one: twelve tiles, the word 3, 4 or 5 times among
              its look-alikes; bracket every copy, then say how many
     story  — In the story: one picture and 2–3 short sentences; bracket
              every copy of the word (a capital at the start still counts)
   The blink: long 2.0 s · medium 1.2 s · short 0.7 s; a miss in Snap and
   find re-flashes one step longer. Re-flashing is never a miss.
   No DOM. UMD: window.BlinkCameraCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.BlinkCameraCore = factory();
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* per locale: w = 'target|look-alike look-alike look-alike' ×8 (Snap and find; the same sets fill the hunt grids);
     copies = how often the word sits in each round's 12-tile grid; s = 'picture|story' ×8 in the order of w */
  /*DATA-BEGIN*/
  var DATA = {
    en: {
      w: ['was|saw want with', 'the|they then that', 'of|off for on', 'you|your yes use', 'see|she say so', 'and|an hand band', 'go|got good dog', 'like|lick likes lime'],
      s: ['animals/cat|The cat was on the bed. Was it hot? I saw the cat.',
        'animals/dog|The dog ran to the bus. Then the dog sat.',
        'fruits/apple|I have a box of apples. Of course I bit one. I bit off a big piece.',
        'toys/ball|Can you see the ball? You can kick it. Is it your ball?',
        'beach/sun|I see the sun. See the sun go down! She can see it too.',
        'farm animals/hen|The hen and the dog sat in the sun. And then the hen had a nap. An egg is in the nest.',
        'vehicles/bus|Go, bus, go! We got on the bus. Do we go to the park?',
        'bakery/cupcake|I like cupcakes. Like you, I lick the top. Do you like it?']
    },
    de: {
      w: ['der|dem den die', 'und|uns ein um', 'ist|im isst fast', 'ich|in dich mich', 'das|dass was Glas', 'ein|Bein eins sein', 'mit|Mut mir Mitte', 'auf|aus Lauf Kauf'],
      s: ['animals/dog|Der Hund spielt mit dem Ball. Wo ist der Ball? Der Hund holt ihn.',
        'animals/cat|Die Katze und der Hund spielen. Und dann schlafen sie. Ein Ball liegt da.',
        'animals/fish|Der Fisch ist im Wasser. Ist er schnell? Ja, er ist fast so schnell wie ein Boot.',
        'fruits/apple|Ich habe einen Apfel. Den esse ich in der Pause.',
        'vehicles/boat|Das Boot ist im Wasser. Was ist das?',
        'farm animals/hen|Die Henne legt ein Ei. Ein Ei ist im Nest. Die Henne steht auf einem Bein.',
        'vehicles/bus|Ich fahre mit dem Bus. Mit mir fährt Mama.',
        'bakery/cupcake|Der Cupcake steht auf dem Tisch. Lauf hin und iss ihn auf!']
    },
    nl: {
      w: ['de|die den te', 'het|heet hen heeft', 'een|en geen teen', 'ik|in is uit', 'op|om of ook', 'met|mee meet net', 'niet|net niets nieuw', 'kan|kant kat kam'],
      s: ['animals/cat|De kat zit op de mat. Die kat is lief.',
        'animals/dog|Het is mijn hond. Hij heet Max. Ik geef het een bal.',
        'fruits/apple|Een appel en een peer zijn lekker. Geen banaan.',
        'toys/ball|Ik heb een bal. Waar is mijn bal? Hier ben ik!',
        'beach/sun|De zon komt op. Op het strand is het ook warm.',
        'animals/fish|Ik kijk naar de vis met papa. Met een net vang ik hem niet.',
        'vehicles/bus|Komt de bus? Nee, de bus komt niet. Niet boos zijn, er is niets aan de hand.',
        'farm animals/cow|Kan een koe springen? Nee, dat kan ze niet. De kat kan dat wel.']
    },
    da: {
      w: ['og|om op os', 'er|en et der', 'jeg|jer leg lege', 'det|der den de', 'på|pas så nå', 'med|mod dem ned', 'han|hans hus hun', 'var|vare varm far'],
      s: ['animals/cat|Katten og hunden leger. Og så sover de. Om lidt går vi op.',
        'animals/dog|Er hunden glad? Ja, den er glad. Der er en bold.',
        'fruits/apple|Jeg har et æble. Nu spiser jeg det, og så vil jeg lege.',
        'beach/sun|Det er sol i dag. Solen er varm, og det er godt. Der er ingen skyer.',
        'toys/ball|Se på bolden! På græsset ligger den. Så triller den væk.',
        'animals/fish|Fisken svømmer med sin far. Med halen svømmer den ned.',
        'farm animals/horse|Han har en hest. Hesten hedder Bo, og den er stor. Hun rider på den, mens han ser på.',
        'vehicles/bus|Bussen var her. Var den fuld? Ja, og far var med.']
    },
    sv: {
      w: ['är|ärt år har', 'och|ost oss som', 'jag|ja jaga dag', 'det|detta dem ett', 'en|ena ens in', 'på|påse så då', 'med|mig dem mer', 'inte|inne inom inre'],
      s: ['animals/cat|Är katten liten? Ja, katten är liten. Den har en boll.',
        'animals/dog|Hunden och katten leker med oss. Och sedan sover de.',
        'fruits/apple|Jag har ett äpple. I dag äter jag det.',
        'beach/sun|Det är sol i dag. Solen är varm, och det är bra. Detta är en fin dag.',
        'toys/ball|En boll ligger i gräset. Två bollar är bättre än en. Ta in den!',
        'animals/fish|Titta på fisken! På botten är det mörkt. Så simmar den upp.',
        'vehicles/bus|Jag åker med bussen. Med mamma sätter jag mig längst bak.',
        'farm animals/horse|Hästen vill springa, men den kan inte. Den är inne. Hästen är inte glad.']
    },
    no: {
      w: ['det|den der de', 'er|en et ert', 'jeg|jo ja jul', 'med|men mer mor', 'har|han hun hus', 'ikke|like ikon isen', 'var|vår vil ved', 'på|påske så tå'],
      s: ['beach/sun|Det er sol i dag. Sola er varm, og det er godt. Der er ingen skyer.',
        'animals/cat|Er katten liten? Ja, den er liten. Den har en ball.',
        'fruits/apple|Jeg har et eple. Ja, det spiser jeg nå.',
        'animals/dog|Hunden leker med ballen. Med mor går den tur.',
        'farm animals/hen|Høna har et egg. Har hun to egg? Nei, hun har ett.',
        'animals/fish|Kan fisken gå? Nei, den kan ikke. Den liker ikke isen.',
        'vehicles/bus|Bussen var her. Var den full? Ja, og den var ved huset.',
        'toys/ball|Se på ballen! På gresset ligger den. Så triller den.']
    },
    es: {
      w: ['el|ella le del', 'la|las una ya', 'los|las dos sol', 'con|cono como cosa', 'por|par pero poco', 'una|uno luna unos', 'mi|mil mis ti', 'su|sus sur tu'],
      s: ['animals/cat|El gato duerme en la cama del niño. Le doy leche al gato y el gato bebe.',
        'farm animals/hen|La gallina come maíz. Ya la veo en la granja.',
        'animals/dog|Los perros corren. Veo a los dos perros.',
        'toys/ball|Juego con la pelota. Con ella juego como un campeón.',
        'beach/sun|El sol sale por la mañana. Por eso hace calor. Pero luego se va.',
        'fruits/apple|Tengo una manzana y unos plátanos. Una manzana es roja.',
        'animals/rabbit|Mi conejo come zanahorias. Mis amigos ven a mi conejo.',
        'vehicles/bus|Su camión es grande. Sus ruedas giran. Va a su casa.']
    },
    pt: {
      w: ['com|como sem cor', 'não|mão são nos', 'que|quem quente queda', 'uma|umas rima luva', 'você|vocês voar vela', 'meu|meus mel mar', 'de|dia dei do', 'é|e eu ele'],
      s: ['animals/dog|Eu brinco com o cachorro. Com ele, corro como o vento.',
        'animals/cat|O gato não quer água. Não, ele não quer mais. Ele lambe a mão.',
        'beach/sun|Que sol quente! O sol é tão quente que eu fico na sombra.',
        'fruits/apple|Eu tenho uma maçã. Uma maçã e umas uvas são o meu lanche.',
        'toys/ball|Você tem uma bola? Vocês jogam comigo? Eu jogo com você!',
        'animals/fish|Meu peixe nada no aquário. O peixe é meu! Ele gosta de mel? Não!',
        'vehicles/bus|O ônibus de Ana é grande. De dia, ele vai para a escola.',
        'bakery/cupcake|O cupcake é gostoso. É para mim? Eu acho que é!']
    },
    fr: {
      w: ['les|des mes le', 'une|un lune ne', 'et|en le de', 'il|ils lit fil', 'elle|elles belle ville', 'dans|sans dent danse', 'avec|avoir avant avion', 'pour|pourquoi cour jour'],
      s: ['animals/cat|Le chat aime les souris. Les souris ont peur !',
        'fruits/apple|J’ai une pomme. Une pomme ronde comme la lune.',
        'animals/dog|Le chien et le chat jouent. Et le chien court en rond.',
        'beach/sun|Le soleil se lève. Il brille. Je sors du lit, il fait beau !',
        'farm animals/hen|Elle est belle, la poule. Elle mange du blé, et elle dort.',
        'animals/fish|Le poisson nage dans l’eau. Dans l’eau, il danse.',
        'vehicles/bus|Avec maman, je prends le bus. Avant, je joue avec mon ami.',
        'bakery/cupcake|Ce cupcake est pour toi. Pour moi, c’est un jour de fête !']
    },
    it: {
      w: ['il|in li si', 'la|le ala va', 'un|uno una tu', 'che|chi cena cane', 'con|come cono conta', 'non|nono noi nove', 'per|pera pere penna', 'sono|suono sano sole'],
      s: ['animals/cat|Il gatto dorme. La mamma accarezza il gatto in casa.',
        'farm animals/hen|La gallina fa l’uovo. La mamma la guarda e va via.',
        'animals/dog|Ho un cane. Un cane gioca con una palla.',
        'beach/sun|Che bel sole! Dico che fa caldo. Chi viene al mare?',
        'animals/fish|Il pesce nuota con la mamma. Con la coda, nuota come un razzo.',
        'animals/rabbit|Il coniglio non dorme. Non ha sonno: ha nove carote!',
        'fruits/apple|Questa mela è per te. Per me c’è una pera.',
        'bakery/cupcake|Sono felice. Il cupcake e il sole sono belli.']
    },
    fi: {
      w: ['ja|jo jaa jano', 'on|en oli ovi', 'ei|en eli oi', 'se|ne sen me', 'hän|hana häntä hai', 'mutta|matto mitta mato', 'kun|kuu kuin kana', 'tämä|tuo tämän nämä'],
      s: ['animals/cat|Kissa ja koira leikkivät. Ja nyt niillä on jano.',
        'animals/dog|Koira on iso. On kiva leikkiä koiran kanssa. Ovi on auki.',
        'animals/fish|Kala ei puhu. Ei, kala ui! En tiedä, mitä se ajattelee.',
        'toys/ball|Tässä on pallo. Se pomppii korkealle. Me potkimme sitä, ja se lentää.',
        'farm animals/horse|Liisa ratsastaa hevosella. Hän on iloinen. Hevosen häntä heiluu, ja hän nauraa.',
        'bakery/cupcake|Kuppikakku on pieni, mutta hyvä. Mutta se putosi! Nyt matto on sotkuinen.',
        'beach/sun|Kun aurinko paistaa, on lämmin. Illalla tulee kuu, kun aurinko laskee.',
        'fruits/apple|Tämä omena on minun. Ota sinä tämä. Nämä ovat sinun.']
    }
  };
  /*DATA-END*/

  var LOCALES = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
  var GAMES = ['snap', 'hunt', 'story'];
  var COPIES = [4, 5, 3, 4, 3, 5, 4, 3];          /* the hunt grid: the word 3, 4 or 5 times (3/4/5 = 3/3/2 a pass) */
  var GRID = 12, COUNT_MAX = 6;
  var BLINKS = { 'short': 700, medium: 1200, 'long': 2000 }, LADDER = ['short', 'medium', 'long'];
  var MIN_ROUNDS = 7;

  function locale(l) { l = String(l || 'en').slice(0, 2); return DATA[l] ? l : 'en'; }
  function low(s) { return String(s).normalize('NFC').toLocaleLowerCase(); }
  function same(a, b) { return low(a) === low(b); }

  /* a story's sentences → tokens; an elided form (l’ d’ c’ j’ qu’) is a token of its own and never the next word */
  function tokenize(text) {
    var out = [], sentences = String(text).match(/[^.!?]+[.!?]+/g) || [String(text)];
    sentences.forEach(function (sen, si) {
      var re = /([\p{L}]+['’])|([\p{L}]+)|([^\s\p{L}]+)/gu, m, wi = 0;
      while ((m = re.exec(sen))) {
        var ch = sen.charAt(m.index - 1), sp = m.index > 0 && /\s/.test(ch) ? ch : '';   /* the space before it, as written (a narrow one in French) */
        if (m[3]) out.push({ t: m[3], word: false, sen: si, sp: sp });
        else out.push({ t: m[1] || m[2], word: true, sen: si, at: wi++, elided: !!m[1], sp: sp });
      }
    });
    /* each word's place in its sentence: first · middle · last */
    out.forEach(function (tk) { if (!tk.word) return; var n = out.filter(function (x) { return x.word && x.sen === tk.sen; }).length; tk.pos = tk.at === 0 ? 'first' : tk.at === n - 1 ? 'last' : 'middle'; });
    return out;
  }

  function rounds(loc, game) {
    loc = locale(loc); var D = DATA[loc];
    return D.w.map(function (row, i) {
      var p = row.split('|'), target = p[0], looks = p[1].split(' ');
      var r = { id: game + '-' + i + '-' + low(target), game: game, loc: loc, target: target, looks: looks, i: i };
      if (game === 'snap') r.cards = [target].concat(looks);
      if (game === 'hunt') r.copies = COPIES[i];
      if (game === 'story') {
        var q = D.s[i].split('|'); r.pic = q[0]; r.text = q[1]; r.tokens = tokenize(q[1]);
        r.copies = r.tokens.filter(function (tk) { return tk.word && !tk.elided && same(tk.t, target); }).length;
      }
      return r;
    });
  }
  function games(loc) { loc = locale(loc); return GAMES.filter(function (g) { return rounds(loc, g).length >= MIN_ROUNDS; }); }
  function game(loc, g) { var gs = games(loc); return gs.indexOf(g) >= 0 ? g : gs[0]; }

  function seeded(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619); return function () { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  /* one pass of Snap and find: deal[i] = the four words in slot order. The word sits in each slot twice a pass;
     its look-alikes rotate through the other slots. */
  function dealCards(R, rnd) {
    var slots = []; for (var q = 0; q < R.length; q++) slots.push(q % 4); shuffle(slots, rnd);
    return R.map(function (r, k) {
      var looks = r.looks.slice(k % 3).concat(r.looks.slice(0, k % 3)), out = [], li = 0;
      for (var s = 0; s < 4; s++) out.push(s === slots[k] ? r.target : looks[li++]);
      return out;
    });
  }
  /* one pass of Find every one: deal[i] = the 12 tiles. The copies spread over the slots (each slot holds a copy
     2–4 times a pass); no row or column holds every copy, in the 4-wide grid nor in the 3-wide one. */
  function lineHasAll(set, cols, n) {
    for (var row = 0; row * cols < GRID; row++) { var c = 0; for (var x = 0; x < cols; x++) if (set[row * cols + x]) c++; if (c === n) return true; }
    for (var col = 0; col < cols; col++) { var d = 0; for (var y = 0; y * cols < GRID; y++) if (set[y * cols + col]) d++; if (d === n) return true; }
    return false;
  }
  function dealGrids(R, rnd) {
    var used = []; for (var u = 0; u < GRID; u++) used.push(0);
    return R.map(function (r, k) {
      var best = null, bestScore = 1e9;
      for (var t = 0; t < 400; t++) {
        /* the least-used slots first (a little jitter after the first try, so a blocked line can be stepped around) */
        var jit = used.map(function (u) { return u + (t ? rnd() * 1.5 : rnd() * 0.5); });
        var pick = used.map(function (_, i) { return i; }).sort(function (a, b) { return jit[a] - jit[b]; }).slice(0, r.copies);
        var set = {}; pick.forEach(function (i) { set[i] = 1; });
        if (lineHasAll(set, 4, r.copies) || lineHasAll(set, 3, r.copies)) continue;
        var score = 0; pick.forEach(function (i) { score = Math.max(score, used[i] + 1); });
        if (score < bestScore) { bestScore = score; best = pick; if (score <= 2) break; }
      }
      var set2 = {}; (best || []).forEach(function (i) { set2[i] = 1; used[i]++; });
      var tiles = [], li = k % 3;
      for (var s = 0; s < GRID; s++) { if (set2[s]) tiles.push(r.target); else { tiles.push(r.looks[li % 3]); li++; } }
      return tiles;
    });
  }

  /* ---------------- the round ---------------- */
  function newState(r, opts) {
    opts = opts || {};
    var st = { r: r, snaps: 0, open: false, up: false, chosen: null, brackets: [], phase: 'find', count: null, misses: 0, help: 0, show: false, last: null, done: false };
    if (r.game === 'snap') st.cards = opts.cards || r.cards.slice();
    if (r.game === 'hunt') st.tiles = opts.tiles || [];
    return st;
  }
  /* the shutter: open (the board goes face down), then shut (the board flips up). Snapping again is never a miss. */
  function snap(st) { if (st.done) return false; st.open = true; st.snaps++; return true; }
  function shut(st) { if (!st.open) return false; st.open = false; st.up = true; return true; }
  function visible(st) { return st.up && !st.open; }
  function moved(st) { st.show = false; st.last = null; }
  /* the words on the board, as tappable tokens: { t, i } (cards, tiles or the story's words) */
  function items(st) {
    var r = st.r;
    if (r.game === 'snap') return st.cards.map(function (t, i) { return { t: t, i: i }; });
    if (r.game === 'hunt') return st.tiles.map(function (t, i) { return { t: t, i: i }; });
    return r.tokens.map(function (tk, i) { return { t: tk.t, i: i, word: tk.word, elided: tk.elided }; }).filter(function (x) { return x.word; });
  }
  function isCopy(st, i) {
    var r = st.r;
    if (r.game === 'snap') return st.cards[i] === r.target;
    if (r.game === 'hunt') return st.tiles[i] === r.target;
    var tk = r.tokens[i]; return !!(tk && tk.word && !tk.elided && same(tk.t, r.target));
  }
  function copiesAt(st) { return items(st).filter(function (x) { return isCopy(st, x.i); }).map(function (x) { return x.i; }); }

  function choose(st, i) {
    if (st.done || !visible(st) || st.r.game !== 'snap' || i < 0 || i >= st.cards.length) return false;
    st.chosen = st.chosen === i ? null : i; moved(st); return true;
  }
  function toggle(st, i) {
    if (st.done || !visible(st) || st.r.game === 'snap' || st.phase !== 'find') return false;
    if (!items(st).some(function (x) { return x.i === i; })) return false;
    var k = st.brackets.indexOf(i); if (k >= 0) st.brackets.splice(k, 1); else st.brackets.push(i);
    moved(st); return true;
  }
  function pickCount(st, n) { if (st.done || st.phase !== 'count' || n < 1 || n > COUNT_MAX) return false; st.count = st.count === n ? null : n; moved(st); return true; }

  /* letter by letter: which letters of the card differ from the word (accents are letters), which are extra, how many are missing */
  function diff(word, card) {
    var a = String(word).normalize('NFC'), b = String(card).normalize('NFC'), glow = [], extra = [];
    for (var i = 0; i < b.length; i++) { if (i >= a.length) extra.push(i); else if (a[i] !== b[i]) glow.push(i); }
    return { glow: glow, extra: extra, missing: Math.max(0, a.length - b.length) };
  }

  function check(st) {
    var r = st.r;
    if (st.done) return { ok: true };
    if (r.game === 'snap') {
      if (st.chosen === null || !visible(st)) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
      if (isCopy(st, st.chosen)) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true }; }
      st.misses++; st.help = Math.min(2, st.misses); st.show = true;
      var card = st.chosen; st.last = { result: 'wrong', card: card, diff: diff(r.target, st.cards[card]) };
      if (st.help < 2) st.chosen = null;          /* miss 1: the card flips back; the camera looks again */
      return { ok: false, kase: 'wrong', card: card, reflash: st.help < 2 };
    }
    if (st.phase === 'count') {
      if (st.count === null) { st.show = true; st.last = { result: 'count-empty' }; return { ok: false, kase: 'count-empty' }; }
      if (st.count === copiesAt(st).length) { st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true }; }
      st.misses++; st.help = Math.min(2, st.misses); st.show = true; st.last = { result: 'count' }; st.count = null;
      return { ok: false, kase: 'count' };
    }
    if (!st.brackets.length || !visible(st)) { st.show = true; st.last = { result: 'empty' }; return { ok: false, kase: 'empty' }; }
    var wrong = st.brackets.filter(function (i) { return !isCopy(st, i); });
    var missing = copiesAt(st).filter(function (i) { return st.brackets.indexOf(i) < 0; });
    if (!wrong.length && !missing.length) {
      if (r.game === 'hunt') { st.phase = 'count'; st.show = true; st.last = { result: 'found' }; return { ok: false, kase: 'found' }; }
      st.done = true; st.show = false; st.last = { result: 'right' }; return { ok: true };
    }
    /* the brackets on look-alikes fall off; the copies still to find stay unmarked until miss 2 */
    st.brackets = st.brackets.filter(function (i) { return wrong.indexOf(i) < 0; });
    st.misses++; st.help = Math.min(2, st.misses); st.show = true;
    var cap = missing.filter(function (i) { var t = items(st).filter(function (x) { return x.i === i; })[0].t; return t !== low(t); });
    st.last = { result: 'hunt', wrong: wrong, missing: missing, cap: cap };
    return { ok: false, kase: 'hunt', wrong: wrong, missing: missing };
  }
  /* the help on the board: miss 2 shows the developed photo (and, in a hunt, dashed frames on the copies still to find) */
  function photoOn(st) { return !st.done && st.show && st.help >= 2 && !!st.last && (st.last.result === 'wrong' || st.last.result === 'hunt'); }
  function framed(st) { return photoOn(st) && st.last.result === 'hunt' ? st.last.missing.slice() : []; }
  function capGlow(st) { return !st.done && st.show && st.help === 1 && st.last && st.last.result === 'hunt' ? st.last.cap.slice() : []; }
  function hint(st) {
    if (st.done || !st.show || !st.last) return null;
    var L = st.last;
    if (L.result === 'empty') return 'hintEmpty';
    if (L.result === 'found' || L.result === 'count-empty') return 'hintCount';
    if (L.result === 'count') return 'hintCountAgain';
    if (L.result === 'wrong') return st.help >= 2 ? 'hintPhoto' : 'hintLook';
    if (st.help >= 2) return L.missing.length ? 'hintFrames' : 'hintWrongPhoto';
    if (L.wrong.length && L.missing.length) return 'hintWrongMore';
    if (L.wrong.length) return 'hintWrong';
    return L.cap.length ? 'hintCap' : 'hintMore';
  }
  /* how long the shutter stays open: the chosen blink, one step longer after each miss in Snap and find */
  function blinkFor(blink, misses) {
    var i = LADDER.indexOf(blink); if (i < 0) i = 1;
    return BLINKS[LADDER[Math.min(LADDER.length - 1, i + (misses || 0))]];
  }
  /* order-only reshuffle; never the previous order */
  function order(pool, rnd, prev) {
    for (var t = 0; t < 400; t++) { var o = shuffle(pool.map(function (_, i) { return i; }), rnd); if (prev && prev.join() === o.join()) continue; return o; }
    return pool.map(function (_, i) { return i; }).reverse();
  }
  function layout(W) {
    var wide = W >= 560, tiny = W < 340, L = { mode: wide ? 'wide' : 'narrow', W: W };
    L.cam = wide ? 300 : tiny ? 168 : 200; L.lens = wide ? 160 : tiny ? 88 : 104; L.btn = wide ? 64 : 52;
    L.word = wide ? 56 : tiny ? 32 : 40;
    L.cols = wide ? 4 : 2; L.card = Math.min(wide ? 108 : 150, Math.floor((W - (wide ? 16 : 8) * (L.cols - 1)) / L.cols)); L.cardH = wide ? 84 : tiny ? 64 : 72; L.cardF = wide ? 40 : 34;
    L.tcols = wide ? 4 : 3; L.tile = Math.min(wide ? 108 : 104, Math.floor((W - 8 * (L.tcols - 1)) / L.tcols)); L.tileH = wide ? 64 : tiny ? 44 : 52; L.tileF = wide ? 32 : tiny ? 24 : 26;
    L.ntile = wide ? 56 : Math.max(44, Math.min(56, Math.floor((W - 20) / 6)));
    L.pic = wide ? 120 : 72; L.story = wide ? 26 : 22;
    return L;
  }

  return {
    DATA: DATA, LOCALES: LOCALES, GAMES: GAMES, COPIES: COPIES, GRID: GRID, COUNT_MAX: COUNT_MAX, BLINKS: BLINKS, LADDER: LADDER, MIN_ROUNDS: MIN_ROUNDS,
    locale: locale, tokenize: tokenize, rounds: rounds, games: games, game: game, seeded: seeded, dealCards: dealCards, dealGrids: dealGrids,
    newState: newState, snap: snap, shut: shut, visible: visible, items: items, isCopy: isCopy, copiesAt: copiesAt,
    choose: choose, toggle: toggle, pickCount: pickCount, diff: diff, check: check, photoOn: photoOn, framed: framed, capGlow: capGlow,
    hint: hint, blinkFor: blinkFor, order: order, layout: layout
  };
}));
