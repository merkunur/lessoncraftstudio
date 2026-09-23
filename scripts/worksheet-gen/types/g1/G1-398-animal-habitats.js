/**
 * G1-398 — Animal Habitats: Match the Animal (nt5-F, b6; family key `habitats`, G1, science,
 * no CCSS — `teaches` "Animal habitats (science readiness)"; en prose names NGSS K-ESS3-1 +
 * 2-LS4-1). Design: docs/worksheet-gen/b6-designs/G1-398-habitats.md §2/§5; rulings
 * _work/G1-398-critic.md; build record _work/G1-398-build.md.
 *
 * "The Habitat Museum": a 2 x 2 wall of framed CUT-AWAY windows (primitives/habitat-tile.js:
 * each an EMPTY place drawn above AND below its surface line), each with a coral letter disc
 * and a name plaque; under the wall a drawer of animal cards (opened library pictures), each
 * over an empty letter box. The child looks into a window, reads the place, finds where each
 * animal lives and writes that window's letter under it.
 *
 * THEME axis OFF, no unitAxis (the habitat SET is per-locale data). build() reads ONLY its
 * bank (lib/b6-common.js bank('habitats', loc) — a missing locale block THROWS, never an en
 * fallback) + fileUri for the FIXED (theme, noun) pictures of the claim table; never
 * pictureFor, never image-vocabulary.js. No animal name is ever printed.
 *
 * THE RULE THAT LOCKS THE TYPE: a page is legal only if each animal's hand-read `lives` list
 * meets the page's windows in EXACTLY ONE window (the polar window counts as the ONE pole on
 * the page), so two right answers are impossible by construction; + the page rules of §5
 * (coastal birds never with an ocean window, notWithWindow, look-alikes, one ape, no Arctic +
 * Antarctic animal on one page, the locale's rainforest region).
 *
 * Ladder (a CONFIG; every guard keys on the RESOLVED keys, never the level index):
 *   d1  3 windows (2 + 1 centred) · 6 animals · per window 1..3 · plaques · 0 near pairs · pic 84
 *       (design 96: a 2 x 2 wall + 2 rows of 162 px cards = 690 > 677; the one-row wall of 191 px
 *       tiles put the letter disc over a quarter of each place — measured, build report)
 *   d2  4 windows (2 x 2)   · 8 animals · 1..3, not all equal · plaques · <= 1 near pair · pic 84   (ships)
 *   d3  4 windows · 10 animals · 1..4 · NO plaques · <= 2 near pairs · pic 72 (a scaffold; never shipped)
 *
 * COMPOSER (locale-neutral in its draws; the WINDOW SET is locale data): windows (generic
 * sets: a seeded pick with the near-pair cap; fixed sets: all of them) -> the polar pole ->
 * per-window eligible pools -> a count vector in [lo, hi] summing to n, not all equal, within
 * the pools -> the animals (re-drawn until the page rules hold) -> window -> letter by
 * rng.shuffle -> the drawer order (no two adjacent equal letters; every drawer row >= 3
 * distinct letters; not sorted, not periodic). Bounded retries, then it THROWS (a refusal);
 * a rule is never relaxed.
 *
 * Layout (§2; body 722 with a 3-line title + 3-line instruction, 677 at the 4-line fi title):
 * d2 = wall 2 x (312 x 148 + 13 plaque overhang) + row gap 14 = 336; spacer 18..60; drawer
 * 2 x 150 + 12 = 312 -> 666 <= 677. Slack beyond the spacer's 60 falls below the drawer.
 *
 * Stamps: root [data-ws-content][data-lcs-type="habitats"] data-lcs-locale data-lcs-lives
 * (JSON: the page's animals -> lives) data-lcs-pole data-lcs-plaques data-lcs-pic-px
 * data-lcs-min-row-distinct; windows data-lcs-window=<letter> data-lcs-habitat=<habitat key>
 * (the tile id, or polar-arctic | polar-antarctic); cards data-lcs-animal=<bank key>
 * data-lcs-answer=<letter> over an EMPTY blankNumeralBox carrying the same letter. No
 * data-lcs-layout on the base (the faces stamp it). verify(page) re-derives every answer from
 * the stamps + the bank's lives table.
 */
'use strict';
const { bank: loadBank } = require('../../lib/b6-common.js');
const { fileUri } = require('../../image-cache/resolve.js');
const HT = require('../../primitives/habitat-tile.js');
const C6 = require('../../templates/components-b6.js');
const { HABITATS } = require('../../data/b6/habitats.js');
const AH = require('../../primitives/animal-home.js');
const { rulingBlock } = require('../../templates/components-b2.js');

const ID = 'G1-398';
const KEY = 'habitats';
const BANK = 'habitats';
const G1_FLOOR = 44;
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];
const TRIES = 400;
const PLAQUE_MAX = 280;
const BOX_W = 64, BOX_H = 44;

const BY_KEY = Object.fromEntries(HABITATS.ANIMALS.map((a) => [a.key, a]));
const isNear = (a, b) => HABITATS.NEAR.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
const nearCount = (ids) => { let n = 0; for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) if (isNear(ids[i], ids[j])) n++; return n; };
const tileOf = (h) => HABITATS.TILE_OF[h] || h;
/** seq repeats with some period p < n (an alternating / periodic letter sequence is a tell) */
function isPeriodic(seq) { const n = seq.length; for (let p = 1; p <= Math.floor(n / 2); p++) if (seq.every((x, i) => i + p >= n || seq[i + p] === x)) return true; return false; }

/** The page habitat keys of a window set (tile ids) with the chosen pole. */
function pageHabitatsOf(tiles, pole) { return tiles.map((t) => (t === 'polar' ? 'polar-' + pole : t)); }

/**
 * THE PAGE ORACLE — pure, used by the composer, verify() and the gate. `windows` =
 * [{letter, habitat}] (habitat = page habitat key), `animals` = [{key, answer}] with the
 * answer letter; `opts.rainforestRegion` the locale's region rule; `opts.layout` the face.
 * Returns the list of violated rules (empty = legal).
 */
function pageOracle(windows, animals, opts = {}) {
  const f = [];
  const habs = windows.map((w) => w.habitat);
  const tiles = habs.map(tileOf);
  const letterOf = Object.fromEntries(windows.map((w) => [w.habitat, w.letter]));
  const layout = opts.layout || 'base';
  const poles = new Set(habs.filter((h) => h.startsWith('polar-')));
  if (poles.size > 1) f.push('two poles on one page (one polar drawing, two habitats)');
  if (new Set(windows.map((w) => w.letter)).size !== windows.length) f.push('two windows share a letter');
  const keys = animals.map((a) => a.key);
  let apes = 0;
  let arctic = 0, antarctic = 0;
  for (const { key, answer } of animals) {
    const a = BY_KEY[key];
    if (!a) { f.push(`${key}: not in the claim table`); continue; }
    if (a.faces && !a.faces.includes(layout)) f.push(`${key}: may not appear on the ${layout} face (faces ${a.faces.join('/')})`);
    const meet = a.lives.filter((h) => habs.includes(h));
    if (meet.length !== 1) f.push(`${key}: lives [${a.lives}] meets ${meet.length} windows [${meet}] (two right answers / no answer)`);
    else if (letterOf[meet[0]] !== answer) f.push(`${key}: answer ${answer} ≠ the ${meet[0]} window ${letterOf[meet[0]]}`);
    // a widened animal answers only through its FIRST (primary) habitat: a ladybug is never sent to the forest
    // window because the meadow is missing (generalist audit, 2026-09-23)
    if (meet.length === 1 && meet[0] !== a.lives[0]) f.push(`${key}: answers through ${meet[0]}, not its primary habitat ${a.lives[0]} (a generalist sent to a secondary home)`);
    if (a.coastal && tiles.includes('ocean')) f.push(`${key}: a coastal bird on a page with an ocean window`);
    for (const t of a.notWithWindow) if (tiles.includes(t)) f.push(`${key}: never on a page with a ${t} window`);
    if (a.lives.includes('polar-arctic')) arctic++;
    if (a.lives.includes('polar-antarctic')) antarctic++;
    if (a.group === 'ape') apes++;
    for (const l of a.lookalike) if (keys.includes(l)) f.push(`${key} and ${l} are look-alikes on one page`);
    if (opts.rainforestRegion && meet[0] === 'rainforest' && a.region !== opts.rainforestRegion) f.push(`${key}: not a ${opts.rainforestRegion} rainforest animal (the locale's rainforest)`);
    if (HABITATS.EXCLUDED_KEYS.includes(key)) f.push(`${key}: EXCLUDED after opening`);
    if (a.onlyRegion && opts.rainforestRegion !== a.onlyRegion) f.push(`${key}: stands only on a page of an ${a.onlyRegion}-rainforest locale (region-only; fix round 2)`);
  }
  if (arctic && antarctic) f.push('an Arctic and an Antarctic animal on one page');
  if (apes > 1) f.push(`${apes} apes on one page (<= 1)`);
  return f;
}

/** The drawer-order tells (letters in reading order, cols per row). */
function drawerTells(letters, cols, minRowDistinct) {
  const f = [];
  if (letters.some((x, i) => i > 0 && x === letters[i - 1])) f.push('two adjacent cards share a letter');
  for (let r = 0; r * cols < letters.length; r++) {
    const row = letters.slice(r * cols, r * cols + cols);
    if (new Set(row).size < Math.min(minRowDistinct, row.length)) f.push(`drawer row ${r + 1} holds ${new Set(row).size} distinct letters (< ${minRowDistinct})`);
  }
  if (letters.every((x, i) => i === 0 || x >= letters[i - 1]) || letters.every((x, i) => i === 0 || x <= letters[i - 1])) f.push('the letter sequence is sorted');
  if (new Set(letters).size === 1) f.push('the letter sequence is constant');
  if (isPeriodic(letters)) f.push('the letter sequence is periodic (alternation tell)');
  return f;
}

/* ------------------------------------------------------------------ face oracles (pure; composer + verify + gate) */
const LETTERS7 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
/** F1: `right` = the partner ANIMAL of each right-column home, in row order. */
function homesTells(left, right) {
  const f = [];
  if (left.some((x, i) => right[i] === x)) f.push('a home sits level with its own animal (not a derangement)');
  if (right.join() === left.slice().reverse().join()) f.push('the homes run in the reverse animal order');
  const n = left.length;
  for (let k = 1; k < n; k++) if (left.every((x, i) => right[(i + k) % n] === x)) { f.push(`the homes are the animal order rotated by ${k} (rotation tell)`); break; }
  return f;
}
/** F2: the stranger's card position per row. */
function oddPosTells(pos, perRow) {
  const f = [];
  if (pos.some((p, i) => i > 0 && p === pos[i - 1])) f.push('the stranger sits in the same place in two consecutive rows (column tell)');
  if (new Set(pos).size < Math.min(3, pos.length, perRow)) f.push(`the stranger takes ${new Set(pos).size} distinct places (< 3)`);
  if (pos.length >= 3 && (pos.every((p, i) => i === 0 || p > pos[i - 1]) || pos.every((p, i) => i === 0 || p < pos[i - 1]))) f.push('the stranger places run in order (monotone)');
  return f;
}
/** F2: one row's residents + stranger against the claim table. */
function oddRowOracle(h, residents, stranger, region) {
  const f = [];
  for (const k of residents) {
    const a = BY_KEY[k];
    if (!a) { f.push(`${k}: not in the claim table`); continue; }
    if (!a.lives.includes(h)) f.push(`resident ${k} does not live in ${h}`);
    else if (h !== 'polar-arctic' && a.lives[0] !== h) f.push(`resident ${k} lives in ${h} only as a secondary home (primary ${a.lives[0]}): a child may take it for the stranger`);
    if (a.faces && !a.faces.includes('odd')) f.push(`${k} may not appear on the odd face`);
    if (a.oddRow && a.oddRow !== h) f.push(`${k} may stand only in the ${a.oddRow} row`);
    if (h === 'polar-arctic' && !['walrus', 'seal-white', 'narwhal'].includes(k)) f.push(`the Arctic row holds ${k} (the trio only)`);
    if (region && h === 'rainforest' && a.region !== region) f.push(`${k}: not a ${region} rainforest animal`);
    if (region && a.group === 'ape') f.push(`${k}: an ape on a ${region}-rainforest page`);
    if (a.onlyRegion && region !== a.onlyRegion) f.push(`${k}: stands only on a page of an ${a.onlyRegion}-rainforest locale (region-only)`);
  }
  const s = BY_KEY[stranger];
  if (!s) f.push(`${stranger}: not in the claim table`);
  else {
    if (s.lives.includes(h)) f.push(`the stranger ${stranger} DOES live in ${h} (two right answers)`);
    if (s.lives.length !== 1) f.push(`the stranger ${stranger} lives in several habitats (multi)`);
    // EVERY habitat the stranger lives in must be FAR from the row (lead review 2026-09-23: a butterfly
    // "stranger" in a Rainforest row — butterflies live there too); a generalist is named as such
    const near = s.lives.filter((x) => !(HABITATS.FAR[h] || []).includes(x));
    if (near.length) f.push(`the stranger ${stranger} also lives in ${near.join(', ')}, which is not FAR from ${h}` + (s.kind ? ` (a generalist ${s.kind})` : ''));
    if (s.kind === 'insect') f.push(`the stranger ${stranger} is an insect (a generalist insect: its range is wider than any row)`);
    if (s.noStranger) f.push(`the stranger ${stranger} is never a stranger (${s.noStranger})`);
    if ((s.notStrangerIn || []).includes(h)) f.push(`the stranger ${stranger} is never the stranger of a ${h} row` + (s.cetacean ? ' (a cetacean: the Amazon river dolphin lives there)' : ''));
    if (isNear(tileOf(s.lives[0]), tileOf(h))) f.push(`the stranger ${stranger} comes from a near pair of ${h}`);
    if (s.oddRow || (s.faces && !s.faces.includes('odd'))) f.push(`the stranger ${stranger} may not stand here`);
    if (h === 'polar-arctic' && stranger === 'penguin') f.push('a penguin in the Arctic row');
    if (region && s.group === 'ape') f.push(`${stranger}: an ape on a ${region}-rainforest page`);
    if (s.onlyRegion && region !== s.onlyRegion) f.push(`the stranger ${stranger} stands only on a page of an ${s.onlyRegion}-rainforest locale (region-only)`);
  }
  return f;
}
/** F2 (fix round 2, de landing panel): the page's strangers — at least one lives in a TEMPERATE place (forest / meadow /
 *  pond, the child's own), so no page is solved row by row as "cross out the animal that is not from my country". */
function oddPageTells(strangers) {
  const f = [];
  if (strangers.length >= 2 && !strangers.some((k) => BY_KEY[k] && HABITATS.TEMPERATE.includes(BY_KEY[k].lives[0]))) f.push(`every stranger is an exotic animal [${strangers.join(', ')}] (no temperate stranger: the page solves as "not an animal of my country")`);
  return f;
}
/** F3: rows [{claim, animal}] against the bank's animals. */
function adaptOracle(rows, bank, region) {
  const f = [];
  const claims = rows.map((r) => HABITATS.ADAPT.find((c) => c.key === r.claim));
  rows.forEach((r, i) => {
    const c = claims[i];
    if (!c) { f.push(`claim ${r.claim} is not in ADAPT`); return; }
    if (HABITATS.ADAPT_BANNED.includes(c.key)) f.push(`claim ${c.key} is banned`);
    const hit = bank.filter((k) => c.trueOf.includes(k));
    if (hit.length !== 1) f.push(`claim ${c.key} is true of ${hit.length} bank animals [${hit}] (two right answers / none)`);
    else if (hit[0] !== r.animal) f.push(`claim ${c.key}: the answer is ${r.animal}, the claim is true of ${hit[0]}`);
    else if (!(c.answers || c.trueOf).includes(r.animal)) f.push(`claim ${c.key} answered by ${r.animal}, not one of its answers [${c.answers}]`);
  });
  const answered = new Set(rows.map((r) => r.animal));
  for (const k of bank) {
    const a = BY_KEY[k];
    if (!a) { f.push(`bank ${k}: not in the claim table`); continue; }
    if (a.faces && !a.faces.includes('adapt')) f.push(`bank ${k} may not appear on the adapt face`);
    if (a.onlyRegion && region !== undefined && region !== a.onlyRegion) f.push(`bank ${k} stands only on a page of an ${a.onlyRegion}-rainforest locale (region-only)`);
    if (!answered.has(k) && claims.some((c) => c && c.trueOf.includes(k))) f.push(`decoy ${k} is true of a claim on the page`);
  }
  return f;
}
/** F3: the rows' answer positions in the bank. */
function adaptOrderTells(idx) {
  const f = [];
  if (idx.length >= 3 && idx.every((p, i) => i === 0 || p > idx[i - 1])) f.push('the answers run A, B, C … in bank order');
  if (idx.length >= 3 && idx.every((p, i) => i === 0 || p < idx[i - 1])) f.push('the answers run in reverse bank order');
  return f;
}
/** F4: the correct chip's side (0 left / 1 right) per row. */
function sideTells(s) {
  const f = [];
  if (s.length >= 2 && s.every((x) => x === s[0])) f.push('the correct chip is always on the same side');
  if (s.length >= 3 && s.every((x, i) => i === 0 || x !== s[i - 1])) f.push('the correct chip strictly alternates sides');
  // fix round 2 (de / nl landing panels on G1-407: the right home sat first in 3 of 4 rows): each side within one of half
  const left = s.filter((x) => x === 0).length;
  if (s.length >= 3 && Math.abs(2 * left - s.length) > 1) f.push(`the correct chip sits on one side in ${Math.max(left, s.length - left)} of ${s.length} rows (unbalanced sides)`);
  return f;
}

/** The renderer's French typography (page/shell.js) turns a space before : ; ? ! » into U+00A0 / U+202F and may add
 *  one; a page-vs-bank text comparison normalises both sides (fr panel, fix round 1). A real mismatch still differs. */
function typoNorm(s) {
  return String(s == null ? '' : s).normalize('NFC').replace(/[\u00A0\u202F]/g, ' ').replace(/\s+([:;?!»])/g, '$1').replace(/«\s+/g, '«').replace(/\s+/g, ' ').trim();
}

function literal(obj, key, what, loc) {
  const v = obj && obj[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} is missing (refuse)`);
  if (v !== v.trim()) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" is not trimmed`);
  if (/[{}]/.test(v)) throw new Error(`${ID}: ${loc} ${what}.${key} "${v}" carries a slot`);
  return v;
}

const TYPE = {
  id: ID,
  slug: 'animal-habitats',
  gradeBand: 'G1',
  assetClass: 'geometry',
  exerciseType: KEY,
  themeAxis: { applicable: false },
  difficulty: {
    1: { windows: 3, wallCols: 2, animals: 6, perWindow: [1, 3], plaques: true, nearPairs: 0, picPx: 84, cols: 3, minRowDistinct: 2 },
    2: { windows: 4, wallCols: 2, animals: 8, perWindow: [1, 3], plaques: true, nearPairs: 1, picPx: 84, cols: 4, minRowDistinct: 3 },
    3: { windows: 4, wallCols: 2, animals: 10, perWindow: [1, 4], plaques: false, nearPairs: 2, picPx: 72, cols: 5, minRowDistinct: 3 },
  },
  i18n: {
    en: {
      title: 'Animal Habitats: Match the Animal',
      instruction: 'Under each animal, write the letter of the habitat where it lives.',
    },
  },

  // exposed for the gate
  pageOracle, drawerTells, typoNorm, homesTells, oddPosTells, oddRowOracle, oddPageTells, adaptOracle, adaptOrderTells, sideTells, LETTERS7,

  build({ difficulty, locale }, ctx) {
    const loc = (locale || 'en').slice(0, 2);
    return this._buildWith(loadBank(BANK, loc), this.difficulty[difficulty], { locale: loc }, ctx);
  },

  /** The locale's window set (tile ids), refuse applied. */
  _setOf(bankLoc, loc) {
    const set = bankLoc && bankLoc.sets && bankLoc.sets.base;
    if (!Array.isArray(set) || !set.length) throw new Error(`${ID}: ${loc} bank has no sets.base (refuse)`);
    for (const t of set) if (!HT.HABITAT_IDS.includes(t)) throw new Error(`${ID}: ${loc} sets.base "${t}" is not a drawn tile (${HT.HABITAT_IDS.join(', ')})`);
    if (new Set(set).size !== set.length) throw new Error(`${ID}: ${loc} sets.base repeats a tile`);
    const refuse = Array.isArray(bankLoc.refuse) ? bankLoc.refuse : [];
    return set.filter((t) => !refuse.includes(t));
  },

  /** Eligible base animals for a window set + pole (the page rules that depend on the windows only). */
  _pools(tiles, pole, bankLoc) {
    const habs = pageHabitatsOf(tiles, pole);
    const pools = Object.fromEntries(habs.map((h) => [h, []]));
    for (const a of HABITATS.ANIMALS) {
      if (a.faces && !a.faces.includes('base')) continue;
      const meet = a.lives.filter((h) => habs.includes(h));
      if (meet.length !== 1) continue;
      if (meet[0] !== a.lives[0]) continue;   // primary habitat only (see pageOracle)
      if (a.coastal && tiles.includes('ocean')) continue;
      if (a.notWithWindow.some((t) => tiles.includes(t))) continue;
      if (pole === 'arctic' && a.lives.includes('polar-antarctic')) continue;
      if (pole === 'antarctic' && a.lives.includes('polar-arctic')) continue;
      if (bankLoc.rainforestRegion && meet[0] === 'rainforest' && a.region !== bankLoc.rainforestRegion) continue;
      if (a.onlyRegion && bankLoc.rainforestRegion !== a.onlyRegion) continue;
      pools[meet[0]].push(a.key);
    }
    return { habs, pools };
  },

  /** Pure composition over the resolved config (the gate's statistics read this). */
  _compose(d, bankLoc, loc, rng) {
    const set = this._setOf(bankLoc, loc);
    const nWin = Math.min(d.windows, set.length);
    if (nWin < 2) throw new Error(`${ID}: ${loc} set holds ${set.length} window(s) (< 2; refuse)`);
    const [lo, hi] = d.perWindow;
    for (let t = 0; t < TRIES; t++) {
      // (1) windows
      let tiles;
      if (set.length === nWin) tiles = set.slice();
      else { tiles = rng.sample(set, nWin); if (nearCount(tiles) > d.nearPairs) continue; }
      const pole = tiles.includes('polar') ? rng.pick(['arctic', 'antarctic']) : null;
      // (2) pools
      const { habs, pools } = this._pools(tiles, pole, bankLoc);
      if (habs.some((h) => pools[h].length < lo)) continue;
      // (3) counts: lo each, the rest spread at random within [lo, min(hi, pool)]
      const cap = habs.map((h) => Math.min(hi, pools[h].length));
      if (cap.reduce((s, c) => s + c, 0) < d.animals) continue;
      const counts = habs.map(() => lo);
      let rest = d.animals - lo * habs.length;
      if (rest < 0) continue;
      while (rest > 0) { const open = habs.map((_, i) => i).filter((i) => counts[i] < cap[i]); const i = rng.pick(open); counts[i]++; rest--; }
      if (counts.every((c) => c === counts[0])) continue;
      // (4) animals
      const chosen = [];
      habs.forEach((h, i) => { for (const k of rng.sample(pools[h], counts[i])) chosen.push({ key: k, habitat: h }); });
      // (5) letters: window order by shuffle
      const order = rng.shuffle(habs);
      const windows = order.map((h, i) => ({ letter: LETTERS[i], habitat: h }));
      const letterOf = Object.fromEntries(windows.map((w) => [w.habitat, w.letter]));
      const animals = chosen.map((c) => ({ key: c.key, answer: letterOf[c.habitat] }));
      if (pageOracle(windows, animals, { rainforestRegion: bankLoc.rainforestRegion }).length) continue;
      // (6) drawer order
      let drawer = null;
      for (let u = 0; u < TRIES && !drawer; u++) {
        const o = rng.shuffle(animals);
        if (drawerTells(o.map((a) => a.answer), d.cols, d.minRowDistinct).length) continue;
        drawer = o;
      }
      if (!drawer) continue;
      return { tiles: order.map(tileOf), pole, windows, drawer, counts: Object.fromEntries(habs.map((h, i) => [h, counts[i]])) };
    }
    throw new Error(`${ID}: ${loc} no legal page in ${TRIES} draws (set [${set}], d ${JSON.stringify(d)}) — refuse`);
  },

  /** The GATE's poison seam: a hand-made page { habitats:[page habitat keys in letter order], drawer:[animal keys] }
   *  (the composer and its rules are BYPASSED, so verify() must catch whatever is wrong). Never a shipped config. */
  _forced({ habitats, drawer }) {
    const windows = habitats.map((h, i) => ({ letter: LETTERS[i], habitat: h }));
    const letterOf = Object.fromEntries(windows.map((w) => [w.habitat, w.letter]));
    const habs = habitats;
    const out = drawer.map((k) => { const a = BY_KEY[k]; const meet = a ? a.lives.filter((h) => habs.includes(h)) : []; return { key: k, answer: meet.length ? letterOf[meet[0]] : 'A' }; });
    const pole = (habitats.find((h) => h.startsWith('polar-')) || '').replace('polar-', '') || null;
    return { tiles: habitats.map(tileOf), pole, windows, drawer: out, counts: {} };
  },

  /** The whole build over an INJECTED bank + resolved config (the gate's poison seam). */
  _buildWith(bankLoc, d, { locale }, ctx) {
    if (!d) throw new Error(`${ID}: no difficulty config`);
    const loc = (locale || 'en').slice(0, 2);
    const rng = ctx && ctx.rng;
    if (!rng) throw new Error(`${ID}: no rng in ctx (a seeded page)`);
    if (d.layout) return this._buildFace(bankLoc, d, loc, rng);   // the five faces (Phase E); the base path below is untouched
    if (!(d.picPx >= G1_FLOOR)) throw new Error(`${ID}: picPx ${d.picPx} < the G1 floor ${G1_FLOOR}`);
    if (d.windows > LETTERS.length) throw new Error(`${ID}: ${d.windows} windows > ${LETTERS.length} letters`);
    if (Array.isArray(bankLoc && bankLoc.refuse) && bankLoc.refuse.includes('base')) throw new Error(`${ID}: ${loc} refuses the base (bank.refuse)`);
    const tileLabel = bankLoc && bankLoc.tileLabel;
    if (!tileLabel) throw new Error(`${ID}: ${loc} bank has no tileLabel block (refuse)`);

    const c = d.forcePage ? this._forced(d.forcePage) : this._compose(d, bankLoc, loc, rng);

    // windows
    const nWin = c.windows.length;
    const cols = d.wallCols;
    const cardW = Math.floor((639 - (cols - 1) * 15) / cols);
    const tileW = cardW - 12;
    const plaqueMax = Math.min(PLAQUE_MAX, cardW - 24);
    const labels = {};
    const windowsHtml = c.windows.map((w) => {
      const tile = HT.habitatTile({ id: tileOf(w.habitat), w: tileW });
      let plaque = null, plaquePx = 17;
      if (d.plaques) {
        const labKey = w.habitat === 'polar-antarctic' ? 'polar' : w.habitat;
        plaque = literal(tileLabel, labKey, 'tileLabel', loc);
        labels[w.habitat] = plaque;
        // the ONE fallback: a conservative width estimate (Baloo 2 700 ~0.6 em a grapheme + 28 padding)
        if ([...plaque].length * 0.6 * 17 + 31 > plaqueMax) plaquePx = 15;
      }
      if (d.forceWindowImg) return `<div class="hb-cell"><div class="hb-window" data-lcs-window="${w.letter}" data-lcs-habitat="${w.habitat}"><img src="${fileUri('camping', 'forest')}" style="width:${tileW}px"></div></div>`;   // poison PR7
      return C6.hbWindow({ tile, habitat: w.habitat, letter: w.letter, plaque, plaquePx: d.forcePlaquePx || plaquePx });
    });
    const wall = C6.hbWall({ windows: windowsHtml });

    // drawer
    const dCols = d.cols;
    const dCardW = Math.floor((639 - (dCols - 1) * 13) / dCols);
    const cards = c.drawer.map((a) => {
      const an = BY_KEY[a.key];
      const pic = an ? an.pic : null;
      const src = pic ? fileUri(pic.theme, pic.noun) : '';
      if (d.forceAnswerBox) {   // poison PR8: the old answerBox with no answer stamps "undefined"
        return `<div class="hb-card" data-lcs-animal="${a.key}" data-lcs-answer="${a.answer}" style="width:${dCardW}px"><img class="ws-icon" data-lcs-pic src="${src}" style="width:${d.picPx}px;height:${d.picPx}px"><span class="ws-blankbox" data-lcs-answer="${undefined}" style="width:64px;height:44px"></span></div>`;
      }
      return C6.hbSpecimenCard({ src, key: a.key, picPx: d.picPx, answer: a.answer, w: dCardW, boxW: BOX_W, boxH: BOX_H });
    });
    const drawer = C6.hbDrawer({ cards, cols: dCols });

    const lives = {};
    for (const a of c.drawer) if (BY_KEY[a.key]) lives[a.key] = BY_KEY[a.key].lives;
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const bodyHtml = `<div class="hb-root" data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-lives='${js(lives)}' ` +
      `data-lcs-pole="${c.pole || ''}" data-lcs-plaques="${d.plaques ? 1 : 0}" data-lcs-pic-px="${d.picPx}" data-lcs-cols="${dCols}" data-lcs-min-row-distinct="${d.minRowDistinct}" ` +
      (bankLoc.rainforestRegion ? `data-lcs-region="${bankLoc.rainforestRegion}" ` : '') +
      `style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start">` +
      wall + C6.hbSpacer({ min: 18, max: 60 }) + drawer + `</div>`;
    return { bodyHtml, meta: { windows: c.windows, pole: c.pole, drawer: c.drawer, counts: c.counts, labels } };
  },

  /* ================================================================== FACES (Phase E)
   * Five CODE faces on ONE additive knob `layout` (design §3; record _work/G1-398-faces.md):
   *   homes  (K-383)  six animals, six DRAWN cut-away homes, a line from each animal to its home; no word
   *   odd    (G1-406) four habitat rows, three residents + one stranger from a FAR habitat; cross it out
   *   adapt  (G2-380) seven lettered animal cards (one decoy), six body-feature sentences; write the letter
   *   needs  (G1-407) four animals, each with a food pair and a home pair (the distractor = ANOTHER row's
   *                   need it never uses); circle its own food and home
   *   report (G2-381) one big empty window of the locale's first habitat: draw three animals, write
   *                   their names and a plant, circle hot / cold, wet / dry (open)
   * The base path above is untouched (d.layout undefined); a face stamps data-lcs-layout.
   * Guards key on the resolved config (d.layout, d.pairs, d.rows, d.items, d.bank), never the level. */

  _buildFace(bankLoc, d, loc, rng) {
    const L = d.layout;
    if (!HABITATS.LAYOUTS.includes(L)) throw new Error(`${ID}: unknown layout "${L}"`);
    const refuse = Array.isArray(bankLoc && bankLoc.refuse) ? bankLoc.refuse : [];
    if (refuse.includes(L) || refuse.includes(HABITATS.FACE_IDS[L])) throw new Error(`${ID}: ${loc} refuses the ${L} face (bank.refuse)`);
    const js = (o) => JSON.stringify(o).replace(/'/g, '&#39;');
    const root = (attrs, inner, style) => `<div class="hb-root" data-ws-content data-lcs-type="${KEY}" data-lcs-locale="${loc}" data-lcs-layout="${L}" ${attrs} ` +
      `style="flex:1;min-height:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;${style || ''}">${inner}</div>`;
    const pic = (key) => { const a = BY_KEY[key]; if (!a) throw new Error(`${ID}: ${key} is not in the claim table`); return fileUri(a.pic.theme, a.pic.noun); };

    if (L === 'homes') {
      if (!(d.pairs >= 2 && d.pairs <= 6)) throw new Error(`${ID}: homes pairs ${d.pairs} out of 2..6`);
      const c = d.forceHomes || this._composeHomes(d, rng);
      const left = c.left.map((k) => ({ key: k, src: fileUri(HABITATS.HOME_PICS[k].theme, HABITATS.HOME_PICS[k].noun) }));
      const right = c.right.map((k) => ({ home: HABITATS.HOMES[k], svg: AH.animalHome({ id: HABITATS.HOMES[k], px: d.homePx || 88 }).svg }));
      const pairs = Object.fromEntries(c.left.map((k) => [k, HABITATS.HOMES[k]]));
      return { bodyHtml: root(`data-lcs-pairs='${js(pairs)}'`, C6.hbHomeMatch({ left, right }), 'align-items:stretch'), meta: { layout: L, left: c.left, right: c.right } };
    }
    if (L === 'odd') {
      const tileLabel = bankLoc && bankLoc.tileLabel;
      if (!tileLabel) throw new Error(`${ID}: ${loc} bank has no tileLabel block (refuse)`);
      const c = d.forceOdd || this._composeOdd(d, bankLoc, loc, rng);
      const rows = c.rows.map((r) => {
        const labKey = r.habitat;
        const plaque = literal(tileLabel, labKey, 'tileLabel', loc);
        const plaquePx = [...plaque].length * 0.6 * 17 + 28 > 250 ? 15 : 17;
        return C6.hbStrangerRow({ tileSvg: HT.habitatTile({ id: tileOf(r.habitat), w: 196 }).svg, habitat: r.habitat, plaque, plaquePx: d.forcePlaquePx || plaquePx,
          cards: r.cards.map((k) => ({ key: k, src: pic(k), odd: k === r.stranger })) });
      });
      const lives = {};
      for (const r of c.rows) for (const k of r.cards) lives[k] = BY_KEY[k] ? BY_KEY[k].lives : [];
      const body = `<div data-lcs-orows style="display:grid;grid-template-rows:repeat(${rows.length},minmax(150px,1fr));row-gap:16px;width:639px;flex:1 1 auto;min-height:0">${rows.join('')}</div>`;
      return { bodyHtml: root(`data-lcs-lives='${js(lives)}'` + (bankLoc.rainforestRegion ? ` data-lcs-region="${bankLoc.rainforestRegion}"` : ''), body),
        meta: { layout: L, rows: c.rows } };
    }
    if (L === 'adapt') {
      const c = d.forceAdapt || this._composeAdapt(d, bankLoc, loc, rng);
      const bank = C6.hbAdaptBank({ cards: c.bank.map((k, i) => ({ key: k, letter: LETTERS7[i], src: pic(k) })), cardH: 120, picPx: 76 });
      const rows = c.rows.map((r) => C6.hbAdaptRow({ claim: r.claim, text: d.forceText && d.forceText[r.claim] ? d.forceText[r.claim] : literal(bankLoc.adapt, r.claim, 'adapt', loc), answer: LETTERS7[c.bank.indexOf(r.animal)] }));
      const body = rows.map((r) => C6.hbGap({ min: 10, max: 40 }) + r.replace('min-height:0;', 'height:80px;flex:0 0 80px;width:639px;')).join('');
      return { bodyHtml: root(`data-lcs-bank="${c.bank.join(',')}" data-lcs-decoy="${c.decoys.join(',')}"`, bank + body), meta: { layout: L, bank: c.bank, rows: c.rows, decoys: c.decoys } };
    }
    if (L === 'needs') {
      const needs = bankLoc && bankLoc.needs;
      if (!needs) throw new Error(`${ID}: ${loc} bank has no needs block (refuse)`);
      const c = d.forceNeeds || this._composeNeeds(d, rng);
      const geo = { pad: 12, animalW: 108, animalPic: 90, g1: 16, g2: 24, pg: 10, chip: 108, pic: 88, pairW: 2 * 108 + 10 };
      const head = C6.hbNeedsHead({ line: literal(needs, 'line', 'needs', loc), foodHead: literal(needs, 'foodHead', 'needs', loc), homeHead: literal(needs, 'homeHead', 'needs', loc), geo });
      const rows = c.rows.map((r) => C6.hbNeedsRow({ geo, animal: { key: r.animal, src: fileUri(HABITATS.HOME_PICS[r.animal].theme, HABITATS.HOME_PICS[r.animal].noun) },
        foods: r.foods.map((f) => ({ item: f, ok: f === HABITATS.NEEDS[r.animal].food, src: fileUri(HABITATS.FOOD_PICS[f].theme, HABITATS.FOOD_PICS[f].noun) })),
        homes: r.homes.map((h) => ({ item: h, ok: h === HABITATS.NEEDS[r.animal].home, svg: AH.animalHome({ id: h, px: 88 }).svg })) }));
      const body = head + rows.map((r) => C6.hbGap({ min: 12, max: 40 }) + r.replace('min-height:0;', 'height:132px;flex:0 0 132px;')).join('');
      return { bodyHtml: root('', body), meta: { layout: L, rows: c.rows } };
    }
    // report (open)
    const set = this._setOf(bankLoc, loc);
    // fix round 1 (de panel): only a word pair whose answer is TRUE for the habitat is offered, and the report
    // habitat is the first set member with at least one such pair (a forest is neither hot / cold nor wet / dry)
    const truthOf = (t) => HABITATS.CHIP_TRUTH[t] || {};
    // fix round 2 (en/de/fr/nl landing panels: "each pair" over ONE printed pair): exactly d.chipPairs pairs are printed,
    // taken in CHIP_ORDER among the habitat's true pairs; the habitat is the first set member that has that many
    const nPairs = d.chipPairs || 1;
    const orderOf = (t) => (HABITATS.CHIP_ORDER[t] || []).filter((dim) => truthOf(t)[dim]);
    const tileId = d.forceHabitat || set.find((t) => orderOf(t).length >= nPairs);
    if (!tileId) throw new Error(`${ID}: ${loc} no set member has ${nPairs} true word pair(s) for the report (refuse)`);
    const tileLabel = bankLoc && bankLoc.tileLabel;
    const rep = bankLoc && bankLoc.report;
    if (!tileLabel || !rep) throw new Error(`${ID}: ${loc} bank has no tileLabel / report block (refuse)`);
    const plaque = literal(tileLabel, tileId === 'polar' ? 'polar' : tileId, 'tileLabel', loc);
    const W = { animals: literal(rep, 'animals', 'report', loc), plant: literal(rep, 'plant', 'report', loc) };
    const truth = d.forceTruth || truthOf(tileId);
    const dims = d.forceTruth ? ['temp', 'wet'].filter((x) => truth[x]) : orderOf(tileId).slice(0, nPairs);
    const pairs = [];
    for (const dim of ['temp', 'wet']) {
      if (!dims.includes(dim)) continue;
      if (dim === 'temp') pairs.push([['hot', literal(rep, 'hot', 'report', loc)], ['cold', literal(rep, 'cold', 'report', loc)], truth.temp]);
      else pairs.push([['wet', literal(rep, 'wet', 'report', loc)], ['dry', literal(rep, 'dry', 'report', loc)], truth.wet]);
    }
    const tile = HT.habitatTile({ id: tileId, w: 627 });
    const lane = (n) => rulingBlock({ rows: n, w: 639, h: 44, glyphH: 24, gap: 8 });
    let inner = C6.hbReport({ tile, habitat: tileId, plaque, labels: W, lanesAnimals: lane(d.animalRows || 3), lanePlant: lane(d.plantRows || 1), pairs });
    if (d.forceReportImg) inner = inner.replace('</svg></div>', `</svg><img data-lcs-pic src="${pic('whale')}" style="position:absolute;left:120px;top:60px;width:80px"></div>`);   // poison PR10
    return { bodyHtml: root(`data-lcs-open data-lcs-chip-pairs="${nPairs}"`, inner), meta: { layout: L, habitat: tileId, pairs: pairs.map((p) => p[2]) } };
  },

  /** F1: the left order (a shuffle) and the right column's homes (a derangement, not reversed, never a rotation). */
  _composeHomes(d, rng) {
    const all = Object.keys(HABITATS.HOMES);
    const left = rng.shuffle(rng.sample(all, d.pairs));
    for (let t = 0; t < TRIES; t++) {
      const right = rng.shuffle(left);
      if (homesTells(left, right).length) continue;
      return { left, right };
    }
    throw new Error(`${ID}: no F1 right order clears the order rules`);
  },

  /** F2: four DIFFERENT windows; per row three residents + one stranger from a FAR habitat; stranger positions spread. */
  _composeOdd(d, bankLoc, loc, rng) {
    const set = this._setOf(bankLoc, loc);
    const n = Math.min(d.rows, set.length);
    for (let t = 0; t < TRIES; t++) {
      const tiles = set.length === n ? rng.shuffle(set) : rng.sample(set, n);
      if (set.length > n && nearCount(tiles) > (d.nearPairs == null ? 1 : d.nearPairs)) continue;   // a fixed set is taken whole (es: selva + bosque AND mar + lago)
      const habs = tiles.map((x) => (x === 'polar' ? 'polar-arctic' : x));
      const hasArctic = habs.includes('polar-arctic');
      const used = new Set();
      const noApe = !!bankLoc.rainforestRegion;
      const clash = (a) => (hasArctic && a.lives.includes('polar-antarctic')) || a.lookalike.some((l) => used.has(l)) || [...used].some((u) => BY_KEY[u].lookalike.includes(a.key)) || (noApe && a.group === 'ape');
      const okFace = (a) => !a.faces || a.faces.includes('odd');
      const okRegion = (a) => !a.onlyRegion || a.onlyRegion === bankLoc.rainforestRegion;
      const rows = [];
      let bad = false;
      for (const h of habs) {
        let R;
        if (h === 'polar-arctic') R = ['walrus', 'seal-white', 'narwhal'].filter((k) => !used.has(k));
        else R = HABITATS.ANIMALS.filter((a) => okFace(a) && okRegion(a) && a.lives[0] === h && !a.oddRow && !used.has(a.key) && !clash(a) &&
          !(bankLoc.rainforestRegion && h === 'rainforest' && a.region !== bankLoc.rainforestRegion)).map((a) => a.key);
        const singles = R.filter((k) => BY_KEY[k].lives.length === 1);
        const residents = singles.length >= (d.perRow - 1) ? rng.sample(singles, d.perRow - 1) : [...singles, ...rng.sample(R.filter((k) => !singles.includes(k)), d.perRow - 1 - singles.length)];
        if (residents.length < d.perRow - 1 || residents.some((k) => k === undefined)) { bad = true; break; }
        residents.forEach((k) => used.add(k));
        const far = HABITATS.FAR[h] || [];
        const S = HABITATS.ANIMALS.filter((a) => okFace(a) && okRegion(a) && !a.oddRow && a.kind !== 'insect' && !a.noStranger && !(a.notStrangerIn || []).includes(h) && a.lives.length === 1 && a.lives.every((x) => far.includes(x)) && !a.lives.includes(h) && !isNear(tileOf(a.lives[0]), tileOf(h)) && !used.has(a.key) && !clash(a)).map((a) => a.key);
        if (!S.length) { bad = true; break; }
        const stranger = rng.pick(S);
        used.add(stranger);
        rows.push({ habitat: h, residents, stranger });
      }
      if (bad) continue;
      // no Arctic + Antarctic animal on one page (a penguin stranger with a walrus stranger)
      const all = rows.flatMap((r) => [...r.residents, r.stranger]);
      if (all.some((k) => BY_KEY[k].lives.includes('polar-arctic')) && all.some((k) => BY_KEY[k].lives.includes('polar-antarctic'))) continue;
      if (oddPageTells(rows.map((r) => r.stranger)).length) continue;   // fix round 2: >= 1 temperate stranger
      // stranger positions: >= 3 distinct (4 rows), never equal in consecutive rows, not monotone
      let pos = null;
      for (let u = 0; u < TRIES && !pos; u++) { const p = rows.map(() => rng.int(0, d.perRow - 1)); if (!oddPosTells(p, d.perRow).length) pos = p; }
      if (!pos) continue;
      rows.forEach((r, i) => { const o = rng.shuffle(r.residents); o.splice(pos[i], 0, r.stranger); r.cards = o; r.pos = pos[i]; });
      return { rows };
    }
    throw new Error(`${ID}: ${loc} no legal F2 page in ${TRIES} draws — refuse`);
  },

  /** F3: `items` claims each true of EXACTLY ONE bank animal; bank - items decoys true of none. */
  _composeAdapt(d, bankLoc, loc, rng) {
    const refuse = bankLoc.refuseClaims || [];
    const claims = HABITATS.ADAPT.filter((c) => !refuse.includes(c.key) && (c.answers || c.trueOf).length && bankLoc.adapt && typeof bankLoc.adapt[c.key] === 'string');
    if (claims.length < d.items) throw new Error(`${ID}: ${loc} has ${claims.length} adaptation claims < ${d.items} (refuse)`);
    const allowed = HABITATS.ANIMALS.filter((a) => (!a.faces || a.faces.includes('adapt')) && !(bankLoc.rainforestRegion && a.group === 'ape') && (!a.onlyRegion || a.onlyRegion === bankLoc.rainforestRegion)).map((a) => a.key);
    const nDecoy = d.bank - d.items;
    for (let t = 0; t < TRIES; t++) {
      const cs = rng.sample(claims, d.items);
      const rows = [];
      const used = new Set();
      let bad = false;
      for (const c of cs) {
        const opts = (c.answers || c.trueOf).filter((k) => allowed.includes(k) && !used.has(k) && !cs.some((o) => o !== c && o.trueOf.includes(k)));
        if (!opts.length) { bad = true; break; }
        const k = rng.pick(opts); used.add(k); rows.push({ claim: c.key, animal: k });
      }
      if (bad) continue;
      const decoyPool = allowed.filter((k) => !used.has(k) && !cs.some((c) => c.trueOf.includes(k)) && BY_KEY[k].lives.length);
      if (decoyPool.length < nDecoy) continue;
      const decoys = rng.sample(decoyPool, nDecoy);
      const page = [...used, ...decoys];
      if (page.some((k) => BY_KEY[k].lives.includes('polar-arctic')) && page.some((k) => BY_KEY[k].lives.includes('polar-antarctic'))) continue;
      if (page.some((k) => BY_KEY[k].lookalike.some((l) => page.includes(l)))) continue;
      if (adaptOracle(rows, page, bankLoc.rainforestRegion || null).length) continue;
      // the bank order: the decoy never A and never the last letter
      let bank = null;
      for (let u = 0; u < TRIES && !bank; u++) { const b = rng.shuffle(page); if (decoys.some((k) => b.indexOf(k) === 0 || b.indexOf(k) === b.length - 1)) continue; bank = b; }
      if (!bank) continue;
      // the row order: the answer letters never ascending / descending, never the bank order
      let order = null;
      for (let u = 0; u < TRIES && !order; u++) { const o = rng.shuffle(rows); if (!adaptOrderTells(o.map((r) => bank.indexOf(r.animal))).length) order = o; }
      if (!order) continue;
      return { bank, rows: order, decoys };
    }
    throw new Error(`${ID}: ${loc} no legal F3 page in ${TRIES} draws — refuse`);
  },

  /** F4: `rows` animals; each pair's distractor = ANOTHER row's food / home that this animal never eats / uses. */
  _composeNeeds(d, rng) {
    const N = HABITATS.NEEDS;
    for (let t = 0; t < TRIES; t++) {
      const animals = rng.sample(Object.keys(N), d.rows);
      const rows = [];
      let bad = false;
      for (const a of animals) {
        const others = animals.filter((x) => x !== a);
        const fd = [...new Set(others.map((x) => N[x].food))].filter((f) => f !== N[a].food && N[a].neverEats.includes(f));
        const hd = [...new Set(others.map((x) => N[x].home))].filter((h) => h !== N[a].home && N[a].neverHome.includes(h));
        if (!fd.length || !hd.length) { bad = true; break; }
        rows.push({ animal: a, food: N[a].food, home: N[a].home, foodX: rng.pick(fd), homeX: rng.pick(hd) });
      }
      if (bad) continue;
      let sides = null;
      for (let u = 0; u < TRIES && !sides; u++) { const f = rows.map(() => rng.int(0, 1)), h = rows.map(() => rng.int(0, 1)); if (!sideTells(f).length && !sideTells(h).length) sides = { f, h }; }
      if (!sides) continue;
      rows.forEach((r, i) => { r.foods = sides.f[i] ? [r.foodX, r.food] : [r.food, r.foodX]; r.homes = sides.h[i] ? [r.homeX, r.home] : [r.home, r.homeX]; });
      return { rows };
    }
    throw new Error(`${ID}: no legal F4 page in ${TRIES} draws`);
  },

  async _verifyFace(page, L) {
    const got = await page.evaluate((L) => {
      const f = [];
      const R = (e) => e.getBoundingClientRect();
      const root = document.querySelector('[data-ws-content][data-lcs-type="habitats"]');
      const texts = () => { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const o = []; while (tw.nextNode()) if (tw.currentNode.nodeValue.trim()) o.push([tw.currentNode.parentElement.closest('[data-lcs-plaque],[data-lcs-disc],[data-lcs-sentence],[data-lcs-needs-line],[data-lcs-colhead],[data-lcs-label],[data-lcs-chip]') ? 'ok' : 'stray', tw.currentNode.nodeValue]); return o; };
      const out = { layout: L, loc: root.dataset.lcsLocale, fails: f, texts: texts() };
      if (root.scrollWidth > root.clientWidth + 0.6) f.push('the body overflows horizontally');
      const foot = document.querySelector('.ws-foot');
      for (const b of root.querySelectorAll('[data-lcs-block]')) { if (foot && R(b).bottom > R(foot).top + 0.6) { f.push('a block reaches the footer'); break; } if (!b.querySelector('[data-lcs-dot]') && b.scrollWidth > b.clientWidth + 1) f.push('a block overflows horizontally'); }   // a match item's dot sits OUTSIDE it by design
      for (const img of root.querySelectorAll('img')) if (!img.complete || !img.naturalWidth) f.push('a picture did not load');
      for (const bx of root.querySelectorAll('.ws-blankbox')) if (bx.textContent.trim() || bx.childNodes.length) f.push('an answer box is not empty');
      if (L === 'homes') {
        out.left = [...root.querySelectorAll('[data-lcs-animal]')].map((e) => e.dataset.lcsAnimal);
        out.right = [...root.querySelectorAll('[data-lcs-home-item]')].map((e) => ({ home: e.dataset.lcsHomeItem, prim: (e.querySelector('svg[data-lcs-prim="animal-home"]') || {}).dataset ? e.querySelector('svg[data-lcs-prim="animal-home"]').dataset.lcsHome : null, img: !!e.querySelector('img') }));
        out.pairs = JSON.parse(root.dataset.lcsPairs || '{}');
        out.sizes = { pic: Math.min(...[...root.querySelectorAll('[data-lcs-animal] img')].map((i) => R(i).width)), home: Math.min(...[...root.querySelectorAll('[data-lcs-home-item] svg')].map((s) => R(s).width)) };
        out.dots = root.querySelectorAll('[data-lcs-dot]').length;
      }
      if (L === 'odd') {
        out.rows = [...root.querySelectorAll('[data-lcs-orow]')].map((r) => ({ habitat: r.dataset.lcsHabitat,
          tile: (r.querySelector('svg[data-lcs-prim="habitat-tile"]') || { dataset: {} }).dataset.lcsHabitat || null, tileImg: !!r.querySelector('.hb-window img, .hb-window image, .hb-window svg text'),
          plaque: (r.querySelector('[data-lcs-plaque]') || {}).textContent || null, plaqueOver: (() => { const p = r.querySelector('[data-lcs-plaque]'); return p ? p.scrollWidth > p.clientWidth + 0.5 : false; })(),
          disc: !!r.querySelector('[data-lcs-disc]'),
          cards: [...r.querySelectorAll('[data-lcs-animal]')].map((c) => ({ key: c.dataset.lcsAnimal, odd: c.dataset.lcsOdd === '1', pos: +c.dataset.lcsPos })) }));
        out.lives = JSON.parse(root.dataset.lcsLives || '{}');
        out.region = root.dataset.lcsRegion || null;
        out.sizes = { pic: Math.min(...[...root.querySelectorAll('.hb-card img')].map((i) => R(i).width)), tile: Math.min(...[...root.querySelectorAll('svg[data-lcs-prim="habitat-tile"]')].map((s) => R(s).width)) };
      }
      if (L === 'adapt') {
        out.bank = [...root.querySelectorAll('[data-lcs-adapt-bank] [data-lcs-animal]')].map((c) => ({ key: c.dataset.lcsAnimal, letter: c.dataset.lcsLetter, disc: (c.querySelector('[data-lcs-disc]') || {}).textContent }));
        out.rows = [...root.querySelectorAll('[data-lcs-adapt]')].map((r) => { const s = r.querySelector('[data-lcs-sentence]'); const rg = document.createRange(); rg.selectNodeContents(s);
          return { claim: r.dataset.lcsAdapt, answer: r.dataset.lcsAnswer, box: (r.querySelector('.ws-blankbox') || { dataset: {} }).dataset.lcsAnswer || r.querySelector('.ws-blankbox').getAttribute('data-lcs-answer'), text: s.textContent,
            lines: new Set([...rg.getClientRects()].map((q) => Math.round(q.top))).size, boxW: R(r.querySelector('.ws-blankbox')).width, boxH: R(r.querySelector('.ws-blankbox')).height, over: s.scrollWidth > s.clientWidth + 0.5 }; });
        out.decoys = (root.dataset.lcsDecoy || '').split(',').filter(Boolean);
        out.sizes = { pic: Math.min(...[...root.querySelectorAll('[data-lcs-adapt-bank] img')].map((i) => R(i).width)) };
      }
      if (L === 'needs') {
        out.rows = [...root.querySelectorAll('[data-lcs-nrow]')].map((r) => ({ animal: r.dataset.lcsAnimal,
          chips: [...r.querySelectorAll('[data-lcs-need]')].map((c) => ({ need: c.dataset.lcsNeed, item: c.dataset.lcsItem, ok: c.dataset.lcsOk === '1', home: (c.querySelector('svg[data-lcs-prim="animal-home"]') || { dataset: {} }).dataset.lcsHome || null, img: !!c.querySelector('img'), w: R(c).width })) }));
        out.sizes = { pic: Math.min(...[...root.querySelectorAll('img')].map((i) => R(i).width)), home: Math.min(...[...root.querySelectorAll('[data-lcs-need="home"] svg')].map((s) => R(s).width)) };
        const line = root.querySelector('[data-lcs-needs-line]'); out.lineOver = line ? line.scrollWidth > R(line).width + 0.5 || R(line).width > 639.5 : true;
      }
      if (L === 'report') {
        out.open = root.hasAttribute('data-lcs-open');
        out.habitat = (root.querySelector('.hb-window') || { dataset: {} }).dataset.lcsHabitat;
        out.tile = (root.querySelector('svg[data-lcs-prim="habitat-tile"]') || { dataset: {} }).dataset.lcsHabitat || null;
        out.imgs = root.querySelectorAll('img').length;
        out.lanes = [...root.querySelectorAll('[data-lcs-ruling-row]')].length;
        out.pills = [...root.querySelectorAll('[data-lcs-chip]')].map((p) => [p.dataset.lcsChip, R(p).height, p.textContent, p.dataset.lcsTrue || '']);
        out.chipPairs = +(root.dataset.lcsChipPairs || 0);
      }
      return out;
    }, L);
    const f = got.fails;
    for (const [k, t] of got.texts) if (k === 'stray') f.push(`a stray text on the ${L} face: "${t}"`);
    let b = null;
    try { b = loadBank(BANK, got.loc); } catch (e) { f.push(`no ${got.loc} bank for the cross-check: ${e.message}`); }
    const names = b ? Object.values(b.names || {}).flat() : [];
    const allText = got.texts.map((x) => x[1]).join(' ').normalize('NFC').toLocaleLowerCase(got.loc);
    for (const n of names) if (new RegExp(`(?<!\\p{L})${n.normalize('NFC').toLocaleLowerCase(got.loc).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'u').test(allText)) f.push(`the ${L} face prints the animal name "${n}" (name in body)`);
    if (L === 'homes') {
      if (got.texts.length) f.push(`the homes face prints a word ("${got.texts[0][1]}") — no word at all`);
      const right = got.right.map((r) => r.home);
      for (const r of got.right) { if (r.img || r.prim !== r.home) f.push(`home ${r.home}: not the animal-home primitive (a library <img> or a mismatch)`); }
      if (got.left.length !== right.length) f.push('the columns differ in length');
      for (const k of got.left) { if (HABITATS.HOMES[k] === undefined) f.push(`${k} has no home in HOMES`); if (got.pairs[k] !== HABITATS.HOMES[k]) f.push(`${k}: the pair stamp ≠ HOMES`); }
      const partner = right.map((h) => Object.keys(HABITATS.HOMES).find((k) => HABITATS.HOMES[k] === h));
      if (new Set(right).size !== right.length || partner.some((p) => !got.left.includes(p))) f.push('the homes are not a bijection with the animals');
      for (const x of homesTells(got.left, partner)) f.push('homes order: ' + x);
      if (got.dots !== 2 * got.left.length) f.push(`${got.dots} dots ≠ ${2 * got.left.length}`);
      if (got.sizes.pic < 80 - 0.5) f.push(`a homes picture ${got.sizes.pic.toFixed(1)} < 80`);
      if (got.sizes.home < 88 - 0.5) f.push(`a home drawing ${got.sizes.home.toFixed(1)} < 88`);
    }
    if (L === 'odd') {
      const all = [];
      const pos = [];
      for (const r of got.rows) {
        const tile = r.habitat === 'polar-arctic' ? 'polar' : r.habitat;
        if (r.tile !== tile || r.tileImg) f.push(`row ${r.habitat}: the window is not the habitat-tile primitive (tile is not the primitive)`);
        if (r.disc) f.push(`row ${r.habitat}: a letter disc on the odd face`);
        if (r.plaqueOver) f.push(`row ${r.habitat}: plaque overflow`);
        if (b && typoNorm(r.plaque) !== typoNorm(b.tileLabel[r.habitat])) f.push(`row ${r.habitat}: the plaque "${r.plaque}" ≠ tileLabel.${r.habitat}`);
        const odd = r.cards.filter((c) => c.odd);
        if (odd.length !== 1) { f.push(`row ${r.habitat}: ${odd.length} strangers (≠ 1)`); continue; }
        pos.push(odd[0].pos);
        for (const x of oddRowOracle(r.habitat, r.cards.filter((c) => !c.odd).map((c) => c.key), odd[0].key, got.region)) f.push(`row ${r.habitat}: ${x}`);
        all.push(...r.cards.map((c) => c.key));
      }
      for (const x of oddPosTells(pos, 4)) f.push('stranger position: ' + x);
      for (const x of oddPageTells(got.rows.map((r) => (r.cards.find((c) => c.odd) || {}).key).filter(Boolean))) f.push('strangers: ' + x);
      if (new Set(all).size !== all.length) f.push('an animal appears twice on the page');
      if (all.some((k) => BY_KEY[k] && BY_KEY[k].lives.includes('polar-arctic')) && all.some((k) => BY_KEY[k] && BY_KEY[k].lives.includes('polar-antarctic'))) f.push('an Arctic and an Antarctic animal on one page');
      for (const k of all) if (BY_KEY[k]) for (const l of BY_KEY[k].lookalike) if (all.includes(l)) f.push(`${k} and ${l} are look-alikes on one page`);
      if (new Set(got.rows.map((r) => r.habitat)).size !== got.rows.length) f.push('two rows show the same habitat');
      if (got.sizes.pic < 56 - 0.5) f.push(`an odd picture ${got.sizes.pic.toFixed(1)} < 56`);
      if (got.sizes.tile < 196 - 0.5) f.push(`a window ${got.sizes.tile.toFixed(1)} < 196 wide`);
    }
    if (L === 'adapt') {
      const bank = got.bank.map((c) => c.key);
      got.bank.forEach((c, i) => { if (c.letter !== LETTERS7[i] || c.disc !== c.letter) f.push(`bank card ${i + 1}: letter ${c.letter} / disc ${c.disc}`); });
      const rows = got.rows.map((r) => ({ claim: r.claim, animal: (got.bank.find((c) => c.letter === r.answer) || {}).key }));
      for (const x of adaptOracle(rows, bank, b ? (b.rainforestRegion || null) : undefined)) f.push(x);
      for (const r of got.rows) {
        if (r.box !== r.answer) f.push(`row ${r.claim}: the box stamps "${r.box}" ≠ ${r.answer}`);
        if (r.lines > 3) f.push(`row ${r.claim}: the sentence runs to ${r.lines} lines (> 3)`);
        if (Math.abs(r.boxW - 56) > 0.6 || Math.abs(r.boxH - 48) > 0.6) f.push(`row ${r.claim}: box ${r.boxW.toFixed(1)} x ${r.boxH.toFixed(1)} ≠ 56 x 48`);
        if (b && typoNorm(r.text) !== typoNorm(b.adapt[r.claim])) f.push(`row ${r.claim}: prints "${r.text}" ≠ adapt.${r.claim}`);
      }
      for (const k of got.decoys) { if (!bank.includes(k)) f.push(`decoy ${k} is not in the bank`); else { const i = bank.indexOf(k); if (i === 0 || i === bank.length - 1) f.push(`decoy ${k} sits at letter ${LETTERS7[i]} (first / last)`); } }
      for (const x of adaptOrderTells(got.rows.map((r) => LETTERS7.indexOf(r.answer)))) f.push('row order: ' + x);
      if (got.sizes.pic < 64 - 0.5) f.push(`a bank picture ${got.sizes.pic.toFixed(1)} < 64`);
    }
    if (L === 'needs') {
      const fs = [], hs = [];
      const onPage = got.rows.map((r) => r.animal);
      for (const r of got.rows) {
        const N = HABITATS.NEEDS[r.animal];
        if (!N) { f.push(`${r.animal} is not in the needs table`); continue; }
        const food = r.chips.filter((c) => c.need === 'food'), home = r.chips.filter((c) => c.need === 'home');
        if (food.length !== 2 || home.length !== 2) { f.push(`${r.animal}: pairs ${food.length} / ${home.length} (≠ 2 / 2)`); continue; }
        for (const [grp, own, never, key, sides] of [[food, N.food, N.neverEats, 'food', fs], [home, N.home, N.neverHome, 'home', hs]]) {
          const ok = grp.filter((c) => c.item === own);
          if (ok.length !== 1) f.push(`${r.animal}: ${ok.length} correct ${key} chips (≠ 1)`);
          for (const c of grp) if ((c.item === own) !== c.ok) f.push(`${r.animal}: the ${key} chip ${c.item} stamps ok=${c.ok}`);
          const x = grp.find((c) => c.item !== own);
          if (x) {
            if (!never.includes(x.item)) f.push(`${r.animal}: the ${key} distractor ${x.item} is not in its never-list (a second right answer)`);
            if (!onPage.some((a) => a !== r.animal && HABITATS.NEEDS[a][key] === x.item)) f.push(`${r.animal}: the ${key} distractor ${x.item} is not another row's ${key}`);
          }
          sides.push(grp.findIndex((c) => c.item === own));
        }
        for (const c of home) if (!c.home || c.img || c.home !== c.item) f.push(`${r.animal}: home chip ${c.item} is not the animal-home primitive`);
        for (const c of food) if (!c.img || !HABITATS.FOOD_PICS[c.item]) f.push(`${r.animal}: food chip ${c.item} is not a food picture`);
      }
      for (const x of sideTells(fs)) f.push('food side: ' + x);
      for (const x of sideTells(hs)) f.push('home side: ' + x);
      if (got.lineOver) f.push('the head line does not fit one line');
      if (got.sizes.pic < 76 - 0.5) f.push(`a needs picture ${got.sizes.pic.toFixed(1)} < 76`);
      if (got.sizes.home < 76 - 0.5) f.push(`a home chip drawing ${got.sizes.home.toFixed(1)} < 76`);
    }
    if (L === 'report') {
      if (!got.open) f.push('the report face does not stamp data-lcs-open');
      if (got.tile !== got.habitat) f.push('the report window is not the habitat-tile primitive');
      if (b && !b.sets.base.includes(got.habitat)) f.push(`the report habitat ${got.habitat} is not in sets.base`);
      if (got.imgs) f.push(`${got.imgs} picture(s) on the open page (open page answers itself)`);
      if (got.lanes < 4) f.push(`${got.lanes} writing lanes (< 4)`);
      for (const [k, h] of got.pills) if (h < 47.5) f.push(`pill ${k} ${h.toFixed(1)} px < 48`);
      if (b) for (const [k, , t] of got.pills) if (typoNorm(t) !== typoNorm(b.report[k])) f.push(`pill ${k} prints "${t}" ≠ report.${k}`);
      // every offered pair has a TRUE answer for the habitat (CHIP_TRUTH), stamped on the pair
      const truth = HABITATS.CHIP_TRUTH[got.habitat] || {};
      const offered = new Set(got.pills.map((p) => p[0]));
      for (const [pair, dim] of [[['hot', 'cold'], 'temp'], [['wet', 'dry'], 'wet']]) {
        const on = pair.filter((k) => offered.has(k));
        if (!on.length) continue;
        if (on.length !== 2) f.push(`pill pair ${pair} is incomplete`);
        if (!truth[dim]) f.push(`the ${pair.join(' / ')} pair has no true answer for ${got.habitat} (a chip with no true answer)`);
      }
      if (!offered.size) f.push('no word pair on the report');
      // fix round 2: the page prints exactly the declared number of pairs (the instruction speaks of "the word", never "each pair")
      if (got.pills.length !== 2 * got.chipPairs) f.push(`the report prints ${got.pills.length / 2} word pair(s), declared ${got.chipPairs} (pairs ≠ declared)`);
    }
    return f;
  },

  async verify(page) {
    const faceLayout = await page.evaluate(() => { const r = document.querySelector('[data-ws-content][data-lcs-type="habitats"]'); return r ? (r.getAttribute('data-lcs-layout') || '') : ''; });
    if (faceLayout && HABITATS.LAYOUTS.includes(faceLayout)) return this._verifyFace(page, faceLayout);
    const got = await page.evaluate(() => {
      const fails = [];
      const root = document.querySelector('[data-ws-content][data-lcs-type="habitats"]');
      if (!root) return { fails: ['no habitats root'] };
      const R = (el) => el.getBoundingClientRect();
      if (root.hasAttribute('data-lcs-layout')) fails.push('data-lcs-layout is stamped on the base');
      const picPx = +root.dataset.lcsPicPx, plaques = root.dataset.lcsPlaques === '1', cols = +root.dataset.lcsCols;
      let lives = {};
      try { lives = JSON.parse(root.dataset.lcsLives || '{}'); } catch (e) { fails.push('data-lcs-lives is not JSON'); }
      // windows
      const wins = [...root.querySelectorAll('[data-lcs-window]')];
      const windows = [];
      for (const w of wins) {
        const letter = w.dataset.lcsWindow, habitat = w.dataset.lcsHabitat;
        windows.push({ letter, habitat });
        const svg = w.querySelector('svg[data-lcs-prim="habitat-tile"]');
        if (!svg) { fails.push(`window ${letter}: the tile is not the habitat-tile primitive (tile is not the primitive)`); continue; }
        const tile = habitat.startsWith('polar-') ? 'polar' : habitat;
        if (svg.dataset.lcsHabitat !== tile) fails.push(`window ${letter}: draws ${svg.dataset.lcsHabitat}, stamped ${habitat}`);
        if (w.querySelector('img, image, svg text')) fails.push(`window ${letter}: an <img>/<image>/<text> inside the window (tile is not the primitive)`);
        const disc = w.querySelector('[data-lcs-disc]');
        if (!disc || disc.textContent !== letter) fails.push(`window ${letter}: the disc prints "${disc && disc.textContent}"`);
        const p = w.querySelector('[data-lcs-plaque]');
        if (plaques) {
          if (!p || !p.textContent.trim()) fails.push(`window ${letter}: no plaque`);
          else {
            const fs = parseFloat(getComputedStyle(p).fontSize);
            if (fs < 15) fails.push(`window ${letter}: plaque ${fs}px < 15`);
            if (p.scrollWidth > p.clientWidth + 0.5 || R(p).width > 280.5) fails.push(`window ${letter}: plaque overflow "${p.textContent}" (${p.scrollWidth} > ${p.clientWidth})`);
            const range = document.createRange(); range.selectNodeContents(p);
            if (new Set([...range.getClientRects()].map((q) => Math.round(q.top))).size > 1) fails.push(`window ${letter}: plaque runs to 2 lines`);
            if (R(p).width > R(w).width - 20) fails.push(`window ${letter}: plaque wider than its window`);
          }
        } else if (p) fails.push(`window ${letter}: a plaque on a plaque-free page`);
      }
      // cards
      const cardEls = [...root.querySelectorAll('[data-lcs-animal]')];
      const animals = [];
      for (const c of cardEls) {
        const key = c.dataset.lcsAnimal, ans = c.dataset.lcsAnswer;
        animals.push({ key, answer: ans });
        const box = c.querySelector('.ws-blankbox');
        if (!box) { fails.push(`card ${key}: no letter box`); continue; }
        if (box.getAttribute('data-lcs-answer') !== ans) fails.push(`card ${key}: the box stamps "${box.getAttribute('data-lcs-answer')}" ≠ the card's ${ans}`);
        if (box.textContent.trim() || box.childNodes.length) fails.push(`card ${key}: the letter box is not empty`);
        const br = R(box);
        if (Math.abs(br.width - 64) > 0.6 || Math.abs(br.height - 44) > 0.6) fails.push(`card ${key}: box ${br.width.toFixed(1)} x ${br.height.toFixed(1)} ≠ 64 x 44`);
        const img = c.querySelector('img[data-lcs-pic]');
        if (!img) fails.push(`card ${key}: no picture`);
        else {
          const ir = R(img);
          if (ir.width < Math.min(picPx, 44) - 0.5 || ir.width < picPx - 0.5) fails.push(`card ${key}: picture ${ir.width.toFixed(1)} px < ${picPx}`);
          if (!img.complete || !img.naturalWidth) fails.push(`card ${key}: the picture did not load`);
        }
        if (!(key in lives)) fails.push(`card ${key}: no lives stamp`);
      }
      // text in the body: letters + plaques only
      const text = [...root.querySelectorAll('[data-lcs-plaque], [data-lcs-disc]')].reduce((s, e) => s + e.textContent.length, 0);
      if (root.textContent.replace(/\s/g, '').length !== [...root.querySelectorAll('[data-lcs-plaque], [data-lcs-disc]')].map((e) => e.textContent.replace(/\s/g, '')).join('').length) fails.push('text in the body other than the plaques and the letters');
      void text;
      // layout
      if (root.scrollWidth > root.clientWidth + 0.6) fails.push('the body overflows horizontally');
      for (const row of root.querySelectorAll('[data-lcs-wall], [data-lcs-drawer]')) if (row.scrollWidth > row.clientWidth + 0.6) fails.push('a row overflows horizontally');
      const drawer = root.querySelector('[data-lcs-drawer]');
      const foot = document.querySelector('.ws-foot');
      if (foot && drawer && R(drawer).bottom > R(foot).top + 0.6) fails.push('the drawer reaches the footer');
      const wall = root.querySelector('[data-lcs-wall]');
      if (wall && drawer) { const g = R(drawer).top - R(wall).bottom; if (g > 61) fails.push(`SPARSE — ${g.toFixed(0)} px between the wall and the drawer (> 60)`); }
      if (wall && R(wall).top - R(root).top > 2) fails.push('blank band above the wall');
      // drawer letters in READING order (by rendered position)
      const order = cardEls.map((c) => ({ a: c.dataset.lcsAnswer, r: R(c) })).sort((p, q) => (Math.abs(p.r.top - q.r.top) > 4 ? p.r.top - q.r.top : p.r.left - q.r.left)).map((x) => x.a);
      return { fails, windows, animals, order, cols, minRowDistinct: +root.dataset.lcsMinRowDistinct, region: root.dataset.lcsRegion || null, loc: root.dataset.lcsLocale, lives, plaqueTexts: [...root.querySelectorAll('[data-lcs-plaque]')].map((p) => [p.closest('[data-lcs-window]').dataset.lcsHabitat, p.textContent]), // every TEXT NODE on its own, space-joined: textContent glues the disc letter to the plaque ("BWhale Ocean"),
        // which hides a printed name from a letter-boundary match (found by poison PR5)
        bodyText: (() => { const tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const out = []; while (tw.nextNode()) out.push(tw.currentNode.nodeValue); return out.join(' '); })() };
    });
    const fails = got.fails;
    if (!got.windows) return fails;
    // node side: the page oracle from the stamps + the bank's own lives table
    for (const x of pageOracle(got.windows, got.animals, { rainforestRegion: got.region })) fails.push('oracle: ' + x);
    for (const [k, l] of Object.entries(got.lives)) if (BY_KEY[k] && JSON.stringify(BY_KEY[k].lives) !== JSON.stringify(l)) fails.push(`${k}: the lives stamp ${JSON.stringify(l)} ≠ the claim table`);
    const perWin = {};
    for (const a of got.animals) perWin[a.answer] = (perWin[a.answer] || 0) + 1;
    for (const w of got.windows) if (!perWin[w.letter]) fails.push(`window ${w.letter} holds no animal`);
    const cv = got.windows.map((w) => perWin[w.letter] || 0);
    if (cv.length > 1 && cv.every((x) => x === cv[0])) fails.push(`all-equal counts (${cv.join(',')})`);
    if (got.windows.map((w) => w.letter).join('') !== LETTERS.slice(0, got.windows.length).join('')) fails.push(`window letters ${got.windows.map((w) => w.letter).join('')} are not A.. in reading order`);
    for (const x of drawerTells(got.order, got.cols, got.minRowDistinct)) fails.push('drawer: ' + x);
    // no animal name anywhere in the body; every plaque === its bank literal
    let b = null;
    try { b = loadBank(BANK, got.loc); } catch (e) { fails.push(`no ${got.loc} bank for the cross-check: ${e.message}`); }
    if (b) {
      const body = got.bodyText.normalize('NFC').toLocaleLowerCase(got.loc);
      for (const [k, ns] of Object.entries(b.names || {})) for (const n of ns) {
        const re = new RegExp(`(?<!\\p{L})${n.normalize('NFC').toLocaleLowerCase(got.loc).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'u');
        if (re.test(body)) fails.push(`the body prints the animal name "${n}" (${k}) (name in body)`);
      }
      for (const [h, t] of got.plaqueTexts) { const lk = h === 'polar-antarctic' ? 'polar' : h; if (typoNorm(b.tileLabel[lk]) !== typoNorm(t)) fails.push(`plaque ${h} prints "${t}" ≠ tileLabel.${lk} "${b.tileLabel[lk]}"`); }
    }
    return fails;
  },
};

module.exports = TYPE;
