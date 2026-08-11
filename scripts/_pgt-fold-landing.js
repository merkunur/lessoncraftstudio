/* =====================================================================
   _pgt-fold-landing.js — fold the redesigned landing copy into the 11
   tool-content JSONs and the manipulatives.ts hub card.

   EN is authored HERE (the panels audited the draft EN and their
   findings are folded: the repaired tagline ellipsis, the honest
   theorem framing, the width qualifier, the relative clause instead of
   a verdict noun, "no plus sign" instead of "no symbol", the ≤160
   metaDescription, "which two parades" instead of "pairs of parades").
   The ten locales come from the native panels' JSON files.

   ⚠ slug / name / metaTitle are PRESERVED from the shipped entries —
   the slug is the URL identity of eleven live landing pages.
   ⚠ After every file surgery the WHOLE file is re-parsed; a fold that
   corrupts a locale's JSON must die here, not in the static export.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const SCRATCH = process.argv[2];
if (!SCRATCH) { console.log('usage: node _pgt-fold-landing.js <dir-with-locale-jsons>'); process.exit(1); }

const TC_DIR = path.join(__dirname, '..', 'frontend', 'messages', 'tool-content');
const MAN = path.join(__dirname, '..', 'frontend', 'lib', 'manipulatives.ts');
const LOCS = ['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

const EN = {
  tagline: 'Choose the parade, say how many will be left standing — then call them through, as many abreast as the archway takes. Whoever is left standing is drawn exactly like everybody else; only the empty place beside them shows.',
  metaDescription: 'Free whiteboard tool: choose the parade, say how many will be left standing, then call them through the archway. Can two remainders make a full rank together? Test it.',
  about: [
    'A parade of marchers, an archway in a wall — wide enough, to start with, for exactly two of them — and a courtyard on the far side. The class chooses the parade from a numeral strip, then commits a number: how many will be left standing. Only then does the bar lift. That order is the whole design: the first thing that happens is a judgement, and the judgement is a number a child can compute rather than a guess.',
    'Then the ranks are called forward, one at a time, and the count grows as they go — 2, 4, 6, 8 — skip-counting made visible. When too few are left, the archway simply refuses. Nothing calls the child wrong: whoever is left standing is drawn exactly like every other marcher, and what IS drawn is the empty place beside them. At the standstill the courtyard shows its two equal columns with their counts — thirteen is six and six and one more — the even-and-odd idea shown by the apparatus itself, with no plus sign ever written.',
    'Then the class chooses a second parade — any size it likes, even numbers included, which is the point. If it also leaves somebody standing, the two who were left step onto the sill, a plate exactly as wide as the archway — and when the plate fills exactly, it is a rank, and it goes through: odd plus odd made even, watched as a mechanism. If the second parade marches clean through, no one new arrives for the sill, and the tool says so. The claim can be put at genuine risk in front of the class — which is exactly what makes the routine worth repeating.'
  ],
  howToUse: [
    'Open with the question, not the animation. A child picks the parade from the numeral strip, and the class commits one numeral chip before anything moves.',
    'Call the ranks forward yourself and let the class read the growing count. Stop the moment the archway refuses — and let the line under the card do the talking.',
    'Point at the empty place, not at the marcher beside it. Then read the tableau aloud without symbols: thirteen is six and six and one more.',
    'On theorem days, ask for a second parade that will ALSO leave one standing. Commit again, press to bring them in, then ask: the two who were left — will they fill the archway together? At two abreast the answer is always yes; the real question is why it must be. Commit once more before the sill tries.',
    'Once a week, at two abreast, let a child bring an even second parade on purpose and watch the experiment fizzle honestly — no one new arrives for the sill, and that is the lesson.'
  ],
  classroomIdeas: [
    'A two-minute daily routine: three parades, three committed numerals, and the prediction said out loud before a single rank is called.',
    'Run a parade of twelve and a parade of thirteen back to back at the same width, and ask what the archway did differently. It did nothing differently — that is the point.',
    'Widen the archway to three and set the inverse challenge: find a parade that leaves exactly two standing. The strip makes it a search, not a guess.',
    'A stretch for the eight-year-olds: at three abreast, two groups who were left standing only sometimes fill the archway together. Ask which two parades work and why — the sill will referee every claim.'
  ]
};

function foldToolContent(loc, landing) {
  const fp = path.join(TC_DIR, loc + '.json');
  let src = fs.readFileSync(fp, 'utf8');
  const whole = JSON.parse(src);
  const old = whole['pair-gate'];
  if (!old) throw new Error(loc + '.json has no pair-gate entry');
  const entry = {
    name: old.name, slug: old.slug,
    tagline: landing.tagline,
    metaTitle: old.metaTitle,
    metaDescription: landing.metaDescription,
    about: landing.about,
    howToUse: landing.howToUse,
    classroomIdeas: landing.classroomIdeas
  };
  /* the eight required ToolEntry fields, none blank (the #42 lesson) */
  ['name', 'slug', 'tagline', 'metaTitle', 'metaDescription'].forEach(k => {
    if (!entry[k] || !String(entry[k]).trim()) throw new Error(loc + ': blank ' + k);
  });
  ['about', 'howToUse', 'classroomIdeas'].forEach(k => {
    if (!Array.isArray(entry[k]) || !entry[k].length || entry[k].some(s => !s || !String(s).trim())) {
      throw new Error(loc + ': bad array ' + k);
    }
  });

  const anchor = '  "pair-gate": {';
  const at = src.indexOf(anchor);
  if (at === -1) throw new Error(loc + ': no anchor');
  /* brace-match from the entry's opening brace */
  let i = src.indexOf('{', at), depth = 0, inStr = false;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) { if (ch === '\\') i++; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true;
    else if (ch === '{') depth++;
    else if (ch === '}') { depth--; if (depth === 0) break; }
  }
  if (depth !== 0) throw new Error(loc + ': brace match failed');
  const serial = JSON.stringify(entry, null, 2).split('\n').map((l, n) => (n === 0 ? l : '  ' + l)).join('\n');
  src = src.slice(0, at) + '  "pair-gate": ' + serial + src.slice(i + 1);
  JSON.parse(src);                                  /* the whole file must still parse */
  fs.writeFileSync(fp, src, 'utf8');
}

function foldCard(cards) {
  let src = fs.readFileSync(MAN, 'utf8');
  const start = src.indexOf('id: "pair-gate"');
  const end = src.indexOf('id: "doubling-mirror"');
  if (start === -1 || end === -1 || end < start) throw new Error('manipulatives.ts anchors missing');
  let region = src.slice(start, end);
  function setLine(block, loc, text) {
    const bAt = region.indexOf(block + ': {');
    if (bAt === -1) throw new Error('no ' + block + ' block');
    const bEnd = region.indexOf('},', bAt);
    let seg = region.slice(bAt, bEnd);
    const re = new RegExp('(\\n\\s+' + loc + ': ")((?:[^"\\\\]|\\\\.)*)(",)');
    if (!re.test(seg)) throw new Error(block + '.' + loc + ' line not found');
    const esc = String(text).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    seg = seg.replace(re, '$1' + esc.replace(/\$/g, '$$$$') + '$3');
    region = region.slice(0, bAt) + seg + region.slice(bEnd);
  }
  for (const loc of Object.keys(cards)) {
    setLine('tagline', loc, cards[loc].tagline);
    setLine('description', loc, cards[loc].description);
  }
  src = src.slice(0, start) + region + src.slice(end);
  fs.writeFileSync(MAN, src, 'utf8');
}

/* ---- run ---------------------------------------------------------- */
foldToolContent('en', EN);
const cards = {
  en: {
    tagline: EN.tagline,
    description: EN.about.join(' ')
  }
};
for (const loc of LOCS) {
  const j = JSON.parse(fs.readFileSync(path.join(SCRATCH, loc + '.json'), 'utf8'));
  if (!j.landing) throw new Error(loc + ': no landing block');
  foldToolContent(loc, j.landing);
  if (!j.card || !j.card.tagline || !j.card.description) throw new Error(loc + ': no card block');
  cards[loc] = j.card;
}
foldCard(cards);
console.log('folded landing copy for en + ' + LOCS.length + ' locales, and the hub card x11');
