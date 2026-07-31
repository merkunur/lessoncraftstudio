/* =====================================================================
   gen-draw-bag-bags.js — builds the bag book for TOOL #38, The Draw Bag
   ---------------------------------------------------------------------
   Run:  node scripts/gen-draw-bag-bags.js            (preview)
         node scripts/gen-draw-bag-bags.js --write    (writes the JSON)

   ⚠ PROVABLY VALID IS NOT THE SAME AS WORTH TURNING OVER. The recorded
   number-sieve lesson: a greedy that only checked validity produced 240
   decks averaging TWO cards — every one valid, not one of them a
   routine. So this generator carries an ADMISSION TEST with a stated
   pedagogical reason for every clause, and the test is POISON-TESTED at
   startup: if a clause stops being able to reject, the generator exits
   1 rather than quietly shipping a library that admits everything.

   THE FIVE FAMILIES, and why each one is in the book:
     certain   one kind only. The edge case the class needs in order to
               have the word for it — every draw is the same, forever.
     two-kind  the workhorse. Two kinds is where "how sure are we" is
               first arguable at all.
     even      equal counts. The bag that FEELS predictable and is not,
               which is the whole quarrel the tool exists to host.
     lopsided  one kind takes most of the bag. Twenty draws look almost
               settled, and the minority still turns up.
     rare-one  ⭐ THE STAR FAMILY, and the payload. One kind is scarce
               enough that a twenty-draw run plausibly MISSES it —
               (1-p)^n between 0.05 and 0.5. That is the run where a
               child says "there are no blue ones in there", and it is
               the run where the second draw of the same bag proves them
               wrong without an adult saying a word.

   ⚠ NO DERIVED ANSWER RIDES IN THE FILE. The shipped record is exactly
   {id, b, free} — the family label is used HERE to balance the library
   and is deliberately NOT emitted, because a public field naming a
   bag's shape is a hint about its contents. Ids are a plain sequence
   and never encode anything (the number-sieve "the id spelled the
   answer" defect, and its follow-on where a ban on "three digits in a
   row" fired on the FIELD SIZE — structure, not pattern-matching).

   ⚠ ZERO NEW AUTHORED LANGUAGE. The picture skins carry per-locale
   labels, and every one of them is READ FROM PLATFORM SoT rather than
   written here: the nouns from `REFERENCE TRANSLATIONS/image-vocabulary.js`
   (1,263 entries x 11 locales, §6 — read-only, never modified) and the
   theme names from `frontend/config/topics-taxonomy.json`
   (axes.theme.<key>.name.<locale>, §16.5.1). That is the §10.4
   read-from-SoT rule, and it is what keeps a tool with pictures inside
   the v4 no-words law: a screen reader hears "Apfel" in German because
   the platform already knew the word, not because this tool authored it.

   ⚠ NO RANDOMNESS HERE EITHER. The library is enumerated in a canonical
   order, so re-running this script on an unchanged repo produces a
   byte-identical file.
   ===================================================================== */

'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'mini tools', 'draw-bag-bags.json');
const WRITE = process.argv.includes('--write');

const KINDS = ['c', 's', 't', 'd', 'h', 'x'];
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const MIN_TOTAL = 6;
const MAX_TOTAL = 24;
const MAX_EACH = 12;

/* the run length the rare-one band is reckoned against — the tool's
   default record, because that is the run a class actually watches */
const REF_N = 20;
const RARE_LO = 0.05;
const RARE_HI = 0.50;

let ERRORS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };

/* =====================================================================
   THE ADMISSION TEST
   ===================================================================== */

/* a partition is a DESCENDING list of positive counts, at most 6 long */
function totalOf(p) { return p.reduce((a, b) => a + b, 0); }

function admit(p) {
  if (!p.length || p.length > KINDS.length) return false;
  const t = totalOf(p);
  if (t < MIN_TOTAL || t > MAX_TOTAL) return false;
  for (const c of p) if (c < 1 || c > MAX_EACH) return false;
  return true;
}

/* probability that a run of n draws never turns up a kind of count c */
function missChance(c, t, n) { return Math.pow(1 - c / t, n); }

function hasRareOne(p) {
  const t = totalOf(p);
  if (p.length < 2) return false;
  return p.some((c) => {
    const m = missChance(c, t, REF_N);
    return m >= RARE_LO && m <= RARE_HI;
  });
}

/* primary family, by priority — the families overlap by nature and a
   bag belongs to the most interesting one it qualifies for */
function familyOf(p) {
  const t = totalOf(p);
  if (p.length === 1) return 'certain';
  if (hasRareOne(p)) return 'rare-one';
  if (p.length >= 3 && p.every((c) => c === p[0])) return 'even';
  if (p[0] / t >= 0.6) return 'lopsided';
  if (p.length === 2) return 'two-kind';
  return null;                    /* interesting to nobody — not shipped */
}

/* ---- POISON TEST. A gate that cannot fail is not a gate. Each clause
   must be shown to REJECT something before the generator is trusted. -- */
(function poison() {
  const cases = [
    ['total below the floor', () => admit([2, 2]) === false],
    ['total above the ceiling', () => admit([12, 12, 12]) === false],
    ['a count above the per-kind ceiling', () => admit([13, 1]) === false],
    ['more kinds than exist', () => admit([1, 1, 1, 1, 1, 1, 1]) === false],
    ['an empty bag', () => admit([]) === false],
    ['a legitimate bag is ADMITTED', () => admit([6, 6]) === true],
    /* a single kind can never be "rare" — there is nothing else to draw */
    ['rare-one refuses a one-kind bag', () => hasRareOne([10]) === false],
    /* 1 in 24 is missed by a 20-draw run about 42% of the time: in band */
    ['rare-one finds a genuinely scarce kind', () => hasRareOne([23, 1]) === true],
    /* an even split is never rare: a 12/12 bag misses neither */
    ['rare-one refuses an even split', () => hasRareOne([12, 12]) === false],
    /* 6 of 12 is missed with probability 2^-20 — far below the band */
    ['rare-one refuses a common kind', () => hasRareOne([6, 6]) === false],
    ['family refuses an uninteresting bag', () => familyOf([5, 4, 3]) === null],
    ['certain wins the priority', () => familyOf([8]) === 'certain']
  ];
  let bad = 0;
  for (const [name, fn] of cases) {
    let ok = false;
    try { ok = fn(); } catch (_) { ok = false; }
    if (!ok) { console.error('  POISON FAILED  ' + name); bad++; }
  }
  if (bad) { console.error('FATAL: the admission test can no longer reject — ' + bad + ' poison case(s) failed'); process.exit(1); }
  console.log('poison test: ' + cases.length + '/' + cases.length + ' — every clause still rejects');
})();

/* =====================================================================
   ENUMERATION — canonical order, no randomness
   ===================================================================== */

function partitions() {
  const out = [];
  /* descending compositions of t into at most 6 parts */
  (function walk(rest, maxPart, acc) {
    if (acc.length && admit(acc)) out.push(acc.slice());
    if (acc.length === KINDS.length) return;
    for (let c = Math.min(maxPart, MAX_EACH, rest); c >= 1; c--) {
      acc.push(c);
      walk(rest - c, c, acc);
      acc.pop();
    }
  })(MAX_TOTAL, MAX_EACH, []);
  /* canonical: by total, then lexicographically descending */
  out.sort((a, b) => (totalOf(a) - totalOf(b)) || (b.length - a.length) || a.join(',').localeCompare(b.join(',')));
  /* dedupe identical partitions reached by different paths */
  const seen = new Set(), uniq = [];
  for (const p of out) { const k = p.join(','); if (!seen.has(k)) { seen.add(k); uniq.push(p); } }
  return uniq;
}

/* ⭐ A PARTITION IS THE PEDAGOGY; THE KINDS ARE THE PAINT. {6 circles,
   2 squares} and {6 stars, 2 hexagons} are the same lesson, so the book
   carries each SHAPE once and rotates which kinds wear it — the library
   looks varied without repeating a single question. */
function paint(p, rot) {
  const b = {};
  for (const k of KINDS) b[k] = 0;
  for (let i = 0; i < p.length; i++) b[KINDS[(rot + i) % KINDS.length]] = p[i];
  return b;
}

const QUOTA = { certain: 4, 'two-kind': 30, even: 16, lopsided: 30, 'rare-one': 40 };
/* the eight free bags: one of every family, weighted to the two that
   carry the routine best. They lead the array and their ids are the
   ones the tool's FALLBACK_BAGS must mirror exactly (gate D16). */
const FREE_PLAN = ['two-kind', 'rare-one', 'even', 'lopsided', 'rare-one', 'two-kind', 'certain', 'lopsided'];

function build() {
  const parts = partitions();
  const byFam = {};
  for (const f of Object.keys(QUOTA)) byFam[f] = [];
  for (const p of parts) {
    const f = familyOf(p);
    if (f && byFam[f]) byFam[f].push(p);
  }
  /* ⚠ NEVER PAD A FAMILY PAST WHAT EXISTS. The first cut clamped the
     spread index at src.length-1, so a family short of its quota
     silently repeated its last shape — and the duplicate check did NOT
     catch it, because painting rotates the kinds and two paintings of
     one shape have different signatures. It would have shipped the same
     question twice wearing different colours. Cap at availability,
     redistribute the shortfall to families that have room, and SAY SO:
     a silent cap reads as "we covered everything" when we did not. */
  const target = Object.keys(QUOTA).reduce((a, f) => a + QUOTA[f], 0);
  const cap = {};
  let shortfall = 0;
  for (const f of Object.keys(QUOTA)) {
    cap[f] = Math.min(QUOTA[f], byFam[f].length);
    if (cap[f] < QUOTA[f]) {
      console.log('  note   family "' + f + '" holds only ' + byFam[f].length +
        ' distinct shapes (quota ' + QUOTA[f] + ') — taking all of them, not padding');
      shortfall += QUOTA[f] - cap[f];
    }
  }
  /* ⚠ REDISTRIBUTE BY PEDAGOGICAL PREFERENCE, NOT BY KEY ORDER. The
     first cut walked Object.keys and handed both spare slots to
     `certain` — the family that is one-kind bags, the least interesting
     thing in the book, and capped on purpose. Spare slots go to the
     star family first. `certain` is excluded outright: four is a
     deliberate number, not a leftover. */
  const PREFER = ['rare-one', 'lopsided', 'two-kind', 'even'];
  for (const f of PREFER) {
    if (!shortfall) break;
    const room = byFam[f].length - cap[f];
    if (room <= 0) continue;
    const give = Math.min(room, shortfall);
    cap[f] += give;
    shortfall -= give;
    console.log('  note   family "' + f + '" takes ' + give + ' redistributed slot(s)');
  }
  if (shortfall) console.log('  note   ' + shortfall + ' slot(s) unfilled — the library ships at ' + (target - shortfall));

  /* spread each family evenly across its available shapes rather than
     taking the first N, which would make every rare-one bag tiny */
  const pick = (f, n) => {
    const src = byFam[f], out = [];
    if (!src.length || n <= 0) return out;
    const step = src.length / n;
    for (let i = 0; i < n; i++) {
      const at = Math.floor(i * step);
      if (at >= src.length) break;
      out.push(src[at]);
    }
    return out;
  };

  const chosen = [];
  const pools = {};
  for (const f of Object.keys(QUOTA)) pools[f] = pick(f, cap[f]);

  /* ⚠ THE FREE EIGHT COME FROM THE MIDDLE OF EACH FAMILY, NOT THE FRONT.
     The pools are ordered by total, so taking the front handed every
     free bag the SMALLEST shape its family has — a free tier made
     entirely of six-piece bags, which is not what the routine looks
     like. The middle is the representative one. */
  const taken = {};
  for (const f of Object.keys(QUOTA)) taken[f] = [];
  const takeMid = (f, nth) => {
    const pool = pools[f];
    const base = Math.floor(pool.length / 2);
    for (let d = 0; d < pool.length; d++) {
      const at = (base + (nth * 3) + d) % pool.length;
      if (taken[f].indexOf(at) === -1) { taken[f].push(at); return at; }
    }
    return -1;
  };
  const seenPerFam = {};
  for (const f of FREE_PLAN) {
    seenPerFam[f] = (seenPerFam[f] || 0);
    const at = takeMid(f, seenPerFam[f]++);
    if (at < 0) { err('family "' + f + '" cannot supply a free bag'); continue; }
    chosen.push({ fam: f, p: pools[f][at] });
  }
  /* then the rest, interleaved family by family so the book never runs
     twenty of one shape in a row */
  const cursor = {};
  for (const f of Object.keys(QUOTA)) cursor[f] = 0;
  let left = true;
  while (left) {
    left = false;
    for (const f of Object.keys(QUOTA)) {
      while (cursor[f] < pools[f].length && taken[f].indexOf(cursor[f]) !== -1) cursor[f]++;
      if (cursor[f] < pools[f].length) { chosen.push({ fam: f, p: pools[f][cursor[f]++] }); left = true; }
    }
  }

  const bags = chosen.map((c, i) => ({
    id: 'b-' + String(i + 1).padStart(3, '0'),
    b: paint(c.p, i % KINDS.length),
    free: i < FREE_PLAN.length
  }));

  /* every shipped bag must still pass admission after painting */
  for (const bg of bags) {
    const counts = KINDS.map((k) => bg.b[k]).filter((v) => v > 0).sort((a, b) => b - a);
    if (!admit(counts)) err(bg.id + ' does not pass admission after painting');
  }
  /* and no two bags may be identical */
  const sig = new Set();
  for (const bg of bags) {
    const s = KINDS.map((k) => bg.b[k]).join(',');
    if (sig.has(s)) err('duplicate bag: ' + bg.id + ' (' + s + ')');
    sig.add(s);
  }
  /* ⭐ AND NO SHAPE MAY APPEAR TWICE, which is the check that actually
     bites: two paintings of one partition have different signatures and
     sail past the check above while being the SAME QUESTION. The shape
     is the lesson; the kinds are only the paint. */
  const shapes = new Set();
  for (let i = 0; i < chosen.length; i++) {
    const s = chosen[i].p.join(',');
    if (shapes.has(s)) err('duplicate SHAPE at ' + bags[i].id + ' (' + s + ') — the same question twice in different colours');
    shapes.add(s);
  }
  return { bags, chosen };
}

/* =====================================================================
   THE SKINS — labels read from platform SoT, never authored here
   ===================================================================== */

function loadVocabulary() {
  const src = fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  const sandbox = { window: {}, module: { exports: {} }, console: { log() {}, warn() {}, error() {} } };
  vm.createContext(sandbox);
  vm.runInContext(src + '\n;this.__V = IMAGE_VOCABULARY;', sandbox);
  return sandbox.__V;
}

function loadThemeNames() {
  const tax = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
  return (tax.axes && tax.axes.theme) || {};
}

/* six visually unmistakable members per theme, in KINDS order */
const SKIN_PLAN = [
  { id: 'fruits', dir: 'fruits', files: ['apple', 'banana', 'cherry', 'lemon', 'pear', 'strawberry'] },
  { id: 'vehicles', dir: 'vehicles', files: ['bus', 'car', 'boat', 'train', 'airplane', 'bicycle'] },
  { id: 'animals', dir: 'animals', files: ['cat', 'dog', 'fish', 'owl', 'rabbit', 'elephant'] }
];

function buildSkins() {
  const V = loadVocabulary();
  const themes = loadThemeNames();
  const pub = path.join(ROOT, 'frontend', 'public', 'image-library-webp', 'themes');
  return SKIN_PLAN.map((plan) => {
    const themeEntry = themes[plan.id];
    if (!themeEntry || !themeEntry.name) err('no theme name in topics-taxonomy.json for "' + plan.id + '"');
    const name = {};
    for (const loc of LOCALES) {
      const v = themeEntry && themeEntry.name && themeEntry.name[loc];
      if (!v) err('theme "' + plan.id + '" has no name for locale ' + loc);
      name[loc] = v || plan.id;
    }
    const items = {};
    plan.files.forEach((file, i) => {
      const kind = KINDS[i];
      /* the art must actually be on disk, or the skin ships a broken
         picture that a gate would never see */
      const asset = path.join(pub, plan.dir, file + '@2x.webp');
      if (!fs.existsSync(asset)) err('missing asset: ' + plan.dir + '/' + file + '@2x.webp');
      const entry = V[file];
      if (!entry) err('no vocabulary entry for "' + file + '"');
      const nm = {};
      for (const loc of LOCALES) {
        const pair = entry && entry[loc];
        /* index 0 is the SINGULAR — one piece is drawn at a time */
        if (!pair || !pair[0]) err('vocabulary "' + file + '" has no singular for locale ' + loc);
        nm[loc] = (pair && pair[0]) || file;
      }
      items[kind] = { dir: plan.dir, file: file, name: nm };
    });
    return { id: plan.id, free: false, name: name, items: items };
  });
}

/* =====================================================================
   EMIT
   ===================================================================== */

const { bags, chosen } = build();
const skins = buildSkins();

const freeCount = bags.filter((b) => b.free).length;

const NOTE =
  'THE BAG BOOK. Locale-NEUTRAL in its bags: a bag is six counts and nothing else, so it carries no ' +
  'words in any language and can be grown and PROVEN mechanically (validity is arithmetic — see ' +
  'scripts/verify-draw-bag.js D16). The SKINS do carry per-locale labels, but not one of them was ' +
  'authored for this tool: the nouns are read from REFERENCE TRANSLATIONS/image-vocabulary.js and the ' +
  'theme names from frontend/config/topics-taxonomy.json (axes.theme.<key>.name), so a screen reader ' +
  'hears the right word in all eleven locales at zero authoring cost. ' +
  'A bag record is EXACTLY {id, b, free} — the family that balanced this library (certain / two-kind / ' +
  'even / lopsided / rare-one) is deliberately NOT emitted, because a public field naming a bag\'s ' +
  'shape is a hint about its contents, and the ids are a plain sequence that encodes nothing. ' +
  'freeMax/premiumMax here are a LIBRARY-SIZE BUDGET (how many bags are open), NOT a capacity ceiling ' +
  '— arrow-strip-mats.json uses them the same way and estimation-jar-sets.json does not. ' +
  'Regenerate with: node scripts/gen-draw-bag-bags.js --write';

const doc = {
  version: 1,
  note: NOTE,
  freeMax: freeCount,
  premiumMax: bags.length,
  bags: bags,
  skins: skins
};

const famTally = {};
for (const c of chosen) famTally[c.fam] = (famTally[c.fam] || 0) + 1;

console.log('bags: ' + bags.length + ' (' + freeCount + ' free)');
console.log('families: ' + Object.keys(famTally).sort().map((f) => f + '=' + famTally[f]).join('  '));
console.log('skins: ' + skins.map((s) => s.id).join(', ') + '  (+ the free built-in shapes skin, which needs no record)');

if (ERRORS) {
  console.error('FAIL — ' + ERRORS + ' error(s); nothing written');
  process.exit(1);
}

if (WRITE) {
  /* one line per bag, keys in a fixed order, free ones first — the house
     shape of every repertoire file in mini tools/ */
  const bagLines = bags.map((b) =>
    '    { "id": "' + b.id + '", "b": { ' + KINDS.map((k) => '"' + k + '": ' + b.b[k]).join(', ') + ' }, "free": ' + b.free + ' }'
  );
  const withBreak = bagLines.map((l, i) => (i === freeCount ? '\n' + l : l));
  const body =
    '{\n' +
    '  "version": 1,\n' +
    '  "note": ' + JSON.stringify(NOTE) + ',\n' +
    '  "freeMax": ' + freeCount + ',\n' +
    '  "premiumMax": ' + bags.length + ',\n' +
    '  "bags": [\n' + withBreak.join(',\n') + '\n  ],\n' +
    '  "skins": ' + JSON.stringify(skins, null, 2).split('\n').map((l, i) => (i ? '  ' + l : l)).join('\n') + '\n' +
    '}\n';
  JSON.parse(body);                       /* never write something unparseable */
  fs.writeFileSync(OUT, body, 'utf8');
  console.log('wrote ' + path.relative(ROOT, OUT) + ' (' + Buffer.byteLength(body) + ' bytes)');
} else {
  console.log('(preview only — pass --write to emit ' + path.relative(ROOT, OUT) + ')');
  console.log('the eight free bags:');
  bags.filter((b) => b.free).forEach((b) => console.log('  ' + b.id + '  ' + KINDS.map((k) => k + ':' + b.b[k]).join(' ')));
}
