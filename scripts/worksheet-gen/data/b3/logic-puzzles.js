/**
 * data/b3/logic-puzzles.js — the G2-319 `logic-puzzles` bank (family key
 * `logic-puzzles`; design docs/worksheet-gen/b3-designs/G2-319-logic-puzzles.md §5).
 *
 * EN block HAND-AUTHORED (2026-09-14, the G2-319 base build); the ten non-EN
 * blocks are GENERATED later by tools/apply-b3-locale.js from
 * i18n/.draft-b3-<loc>.json after tools/validate-b3-draft.js (the native
 * panels author names / frames / truth / strings in their own grammar — the
 * EN block is a SOURCE TO AUDIT, never a target to translate). `data/` is
 * gitignored: the reviewer force-adds this module. Read at render ONLY through
 * lib/b3-common.js `bank('logic-puzzles', loc)`.
 *
 * Shape (design §5):
 *   LOGIC_PUZZLES[loc] = {
 *     head,                 the F0 title root (§1; must differ from the
 *                           `visual-logic` and `sudoku` hub NAMES of the locale)
 *     names: [{nom, ade?, gen?} × 8],   the 8 first names of data/b2/sentences.js
 *                           names[loc] (no gender anywhere); fi carries the
 *                           adessive + genitive LITERALS (Aino / Ainolla / Ainon)
 *     namePx: 22,           the name-tile font (data fallback; verify asserts
 *                           the label fits the 104 px tile inner)
 *     picSep: '',           a separator a panel may pin before {pic} (fr " : ")
 *                           — lives in the frame text, listed here for the record
 *     frames: { neg, pos, either, holderNot, cross, crossNot },   >= 2 literal
 *                           shapes per kind, each with EXACTLY its slots:
 *                             neg / pos      one {name|nameAde} + one {pic}
 *                             either         one {name|nameAde} + {pic} twice
 *                             holderNot      {pic} + {name}
 *                             cross/crossNot {pic} + {pic2}
 *                           the PICTURE replaces the noun phrase wherever the
 *                           grammar would inflect it — no pronoun, article,
 *                           noun or participle; no digit; ends "."; starts
 *                           with a capital or with {pic}
 *     truth: { has, hasNot, holderIs, either, nobody },   the F5 statement
 *                           frames (>= 1 each; fi uses {nameAde} in has/hasNot)
 *     strings: { 'G2-319': {title, instruction}, F1..F5: {…} }   6 faces:
 *                           title <= 70, no worksheet-word, no "sudoku", never
 *                           the bare head, unique; instruction <= 150 + end mark;
 *                           no visible "free" claim
 *   }
 * The picture allowlists are CODE (`SETS`, shared by every locale — a picture
 * is language-free); every noun below was OPENED on the contact sheets
 * out/dev/G2-319-pictures-<theme>.png (2026-09-14) at 110 px colour AND 36 px
 * greyscale (the mono-laser proxy): a noun is listed only when the picture is
 * what its filename says AND stays distinct from its list-mates at 36 px grey.
 * Pairs that MERGE in grey are in `confusable` (never together in one case);
 * `validateBank` requires >= 6 members after resolving every in-list pair.
 * Opened and REFUSED (the picture, not the word): pets goldfish (a fish),
 * gerbil (a hamster), tortoise (a turtle), chinchilla / ferret / gecko /
 * iguana / lizard (reptile-rodent look-alikes at 36 px); fruits plum (a red
 * apple), lime (a lemon), clementine / peach / nectarine / apricot / mango
 * (round-orange fruit, one shape), blueberry / blackberry / raspberry /
 * cranberry (berries, one shape); toys balloon (a small ball on a string),
 * girl / baby (people), lego (B2_EXCLUDE no), chess / cards / domino / crayons
 * (rectangles at 36 px); vehicles truck / van / taxi / jeep (a car or a bus at
 * 36 px), sailboat / ship / ferry / yacht / canoe (a boat), jet (an airplane),
 * crane (the BIRD in 8 locales, B2_EXCLUDE), bulldozer / excavator / forklift
 * (one silhouette), skateboard, scooter (a motorcycle at 36 px), subway (a
 * train); farm animals hen (= chicken), goose (a duck), donkey / foal (a
 * horse), calf / bull / ox (a cow), lamb (a sheep), chick / duckling (a duck),
 * llama, owl, cat / dog (the pets theme's), bee kept; zoo animals leopard /
 * cheetah / jaguar (a tiger), chimpanzee / gorilla / orangutan / lemur (a
 * monkey), gazelle / antelope / reindeer / moose (a deer), bison, meerkat /
 * otter / sloth / seal / wolf / fox / hyena / armadillo / bat (one grey
 * silhouette each). `colors` = the design's six drops (F4 only); measured mean
 * greyscale luma red 88 · blue 109 · purple 119 · green 143 · orange 161 ·
 * yellow 182 — an OPEN item for the F4 face (a hue-only difference prints as
 * near-identical grey drops), recorded in _work/G2-319-build.md.
 */
'use strict';

const SETS = {
  distinct: {
    pets: ['dog', 'cat', 'rabbit', 'fish', 'parrot', 'frog', 'hamster', 'turtle', 'mouse'],
    fruits: ['apple', 'banana', 'pear', 'strawberry', 'lemon', 'watermelon', 'pineapple', 'cherry', 'kiwi'],
    toys: ['ball', 'doll', 'kite', 'robot', 'train', 'dinosaur', 'rocket', 'blocks', 'dice'],
    vehicles: ['bus', 'car', 'train', 'boat', 'airplane', 'tractor', 'helicopter', 'motorcycle', 'bicycle', 'rocket', 'submarine'],
    'farm animals': ['cow', 'pig', 'sheep', 'horse', 'duck', 'goat', 'rabbit', 'turkey', 'rooster', 'bee', 'chicken'],
    'zoo animals': ['lion', 'elephant', 'giraffe', 'zebra', 'monkey', 'tiger', 'kangaroo', 'panda', 'hippopotamus', 'camel', 'rhinoceros', 'bear', 'koala'],
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange'],
  },
  // never together in ONE case (design §5 + the 36 px greyscale rulings above)
  confusable: [
    ['fish', 'goldfish'], ['turtle', 'tortoise'], ['hamster', 'gerbil'], ['hamster', 'mouse'],
    ['orange', 'clementine'], ['peach', 'nectarine'], ['peach', 'apricot'], ['orange', 'peach'],
    ['car', 'truck'], ['airplane', 'jet'],
    ['red', 'scarlet'], ['red', 'crimson'], ['blue', 'turquoise'], ['purple', 'violet'],
    // added after opening the pictures at 36 px grey (2026-09-14)
    ['apple', 'cherry'], ['bicycle', 'motorcycle'], ['boat', 'sailboat'], ['bus', 'truck'], ['car', 'taxi'], ['car', 'jeep'],
    ['duck', 'goose'], ['chicken', 'hen'], ['horse', 'donkey'], ['sheep', 'goat'],
    ['hippopotamus', 'rhinoceros'], ['bear', 'koala'], ['tiger', 'leopard'], ['monkey', 'chimpanzee'], ['ball', 'balloon'],
  ],
  // the wave's fan set (§1); a theme outside it, or without an allowlist, is REFUSED at build
  fan: ['pets', 'fruits', 'toys', 'vehicles', 'farm animals', 'zoo animals'],
};

const LOGIC_PUZZLES = {
  en: {
    head: 'Logic Grid Puzzles',
    names: [
      { nom: 'Mia' }, { nom: 'Ben' }, { nom: 'Emma' }, { nom: 'Leo' },
      { nom: 'Anna' }, { nom: 'Tom' }, { nom: 'Lily' }, { nom: 'Max' },
    ],
    namePx: 22,
    picSep: '',
    frames: {
      neg: ['{name} does not have {pic}.', '{pic} does not belong to {name}.'],
      pos: ['{name} has {pic}.', '{pic} belongs to {name}.'],
      either: ['{name} has {pic} or {pic}.', 'Either {pic} or {pic} belongs to {name}.'],
      holderNot: ['The child with {pic} is not {name}.', '{name} is not the child with {pic}.'],
      cross: ['The child with {pic} has {pic2}.', 'Whoever has {pic} also has {pic2}.'],
      crossNot: ['The child with {pic} does not have {pic2}.', 'Whoever has {pic} does not have {pic2}.'],
    },
    truth: {
      has: ['{name} has {pic}.'],
      hasNot: ['{name} does not have {pic}.'],
      holderIs: ['The child with {pic} is {name}.'],
      either: ['{name} has {pic} or {pic}.'],
      nobody: ['Nobody has {pic}.'],
    },
    strings: {
      'G2-319': {
        title: 'Logic Grid Puzzles: Three Clues, One Answer',
        instruction: 'Read the clues. Cross out on the grid what cannot be true, tick what must be true, then circle the picture each child has.',
      },
      F1: {
        title: 'Logic Grid Puzzles with Yes, No and Either-Or Clues',
        instruction: 'A yes clue gets a tick, a no clue gets a cross and an either-or clue crosses out the third picture. Finish the grid, then circle each answer.',
      },
      F2: {
        title: '4 by 4 Logic Grid Puzzles: Six Clues',
        instruction: 'Four children and four pictures. Use every clue: cross out what cannot be true and tick what must be true until each row has one answer.',
      },
      F3: {
        title: 'Picture Clue Logic Puzzles: Cross Out and Find',
        instruction: 'A crossed-out picture means the child does not have it. Cross out on the grid, then circle the picture each child has.',
      },
      F4: {
        title: 'Two-Attribute Logic Puzzles: Which Pet, Which Colour',
        instruction: 'Each child has one picture and one colour. Use the linking clues to fill all three grids.',
      },
      F5: {
        title: 'Read the Logic Grid: True or False',
        instruction: 'The grid is already solved. Read it, then circle the tick if the sentence is true or the cross if it is false.',
      },
    },
  },
};

/* ------------------------------------------------------------------ validator (design §5, rules 1-7) */
const FACES = ['G2-319', 'F1', 'F2', 'F3', 'F4', 'F5'];
const CLUE_KINDS = ['neg', 'pos', 'either', 'holderNot', 'cross', 'crossNot'];
const TRUTH_KINDS = ['has', 'hasNot', 'holderIs', 'either', 'nobody'];
// slot signature per kind: the multiset of slot names a frame must carry (NAME = {name} or {nameAde})
const SLOTS = {
  neg: ['NAME', 'pic'], pos: ['NAME', 'pic'], either: ['NAME', 'pic', 'pic'], holderNot: ['pic', 'name'],
  cross: ['pic', 'pic2'], crossNot: ['pic', 'pic2'],
  has: ['NAME', 'pic'], hasNot: ['NAME', 'pic'], holderIs: ['pic', 'name'], nobody: ['pic'],
};
const ADE_KINDS = new Set(['neg', 'pos', 'either', 'has', 'hasNot']);   // fi: the name inflects (adessive) in these
// (2) gendered-subject token ban per locale — `(?<!\p{L})…(?!\p{L})`, never \b (ASCII-only on å/ä/ö)
const GENDER_BAN = {
  en: ['he', 'she', 'boy', 'girl', 'his', 'her'],
  de: ['er', 'sie', 'Junge', 'Mädchen', 'Mädchens', 'Jungen'],
  es: ['niño', 'niña', 'el que', 'la que', 'él', 'ella'],
  pt: ['menino', 'menina', 'aquele', 'aquela', 'ele', 'ela'],
  it: ['bambino', 'bambina', 'quello', 'quella', 'lui', 'lei'],
  fr: ['celui', 'celle', 'garçon', 'fille', 'il', 'elle'],
  nl: ['jongen', 'meisje', 'hij', 'zij'],
  sv: ['pojken', 'flickan', 'han', 'hon'],
  da: ['drengen', 'pigen', 'han', 'hun'],
  no: ['gutten', 'jenta', 'han', 'hun'],
  fi: ['poika', 'tyttö', 'hän'],
};
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäväpaperi|tehtävämoniste/iu;
const BW_MARKER = /(?<!\p{L})(BW|SW|BN|NB|ZW|SH|PB|MV|SV)(?!\p{L})/u;
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];

function slotsOf(text) { return [...String(text).matchAll(/\{([A-Za-z][A-Za-z0-9_]*)\}/g)].map((m) => m[1]); }
function tokenRe(tok) { return new RegExp('(?<!\\p{L})' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?!\\p{L})', 'iu'); }

/**
 * validateBank(all = LOGIC_PUZZLES, opts) → string[] faults (empty = clean).
 * opts.locales: the locale blocks to check (default: every block present);
 * opts.sets: the allowlists (default SETS); opts.skipPictures: skip rule 5's
 * cache/vocab resolution (pure-text checks only); opts.taxonomy: an injected
 * taxonomy object for the head-collision check (default: read from disk when
 * present).
 */
function validateBank(all, opts) {
  const o = opts || {};
  const bank = all || LOGIC_PUZZLES;
  const sets = o.sets || SETS;
  const F = [];
  const locales = o.locales || Object.keys(bank);
  let taxonomy = o.taxonomy;
  if (taxonomy === undefined) {
    try { taxonomy = require('../../../../frontend/config/topics-taxonomy.json'); } catch (e) { taxonomy = null; }
  }
  for (const loc of locales) {
    const b = bank[loc];
    if (!b) { F.push(`${loc}: no block`); continue; }
    // (4) names
    const names = Array.isArray(b.names) ? b.names : [];
    if (names.length !== 8) F.push(`${loc}: ${names.length} names, want 8`);
    const noms = names.map((n) => n && n.nom);
    if (new Set(noms).size !== noms.length) F.push(`${loc}: names repeat`);
    names.forEach((n, i) => {
      if (!n || typeof n.nom !== 'string' || !/^\p{Lu}/u.test(n.nom)) F.push(`${loc}: name ${i} "${n && n.nom}" is not capitalised`);
      if (loc === 'fi' && (!n || !n.ade || !n.gen)) F.push(`${loc}: name "${n && n.nom}" lacks ade/gen literals (rule 3)`);
    });
    const allAde = names.length > 0 && names.every((n) => n && n.ade);
    if (!(b.namePx >= 14 && b.namePx <= 26)) F.push(`${loc}: namePx ${b.namePx} outside 14..26`);
    // (1) frames + (6) truth
    const checkFrame = (kind, text, where) => {
      if (typeof text !== 'string' || !text.trim()) { F.push(`${loc}: ${where} is not a string`); return; }
      const sl = slotsOf(text);
      const want = SLOTS[kind];
      const norm = sl.map((s) => (s === 'name' || s === 'nameAde') ? (want.includes('name') && !want.includes('NAME') ? 'name' : 'NAME') : s);
      const a = norm.slice().sort().join(','), w = want.slice().sort().join(',');
      if (a !== w) F.push(`${loc}: ${where} "${text}" has slots {${sl.join('} {')}}, the ${kind} kind needs {${want.join('} {')}}`);
      for (const s of sl) if (!['name', 'nameAde', 'pic', 'pic2'].includes(s)) F.push(`${loc}: ${where} carries an unknown slot {${s}} (a bare noun slot is forbidden)`);
      if (/\d/.test(text.replace(/\{[^}]*\}/g, ''))) F.push(`${loc}: ${where} carries a digit`);
      if (!/\.$/.test(text.trim())) F.push(`${loc}: ${where} does not end with "."`);
      // the filled sentence starts with a capital: a literal capital, a name (always capitalised) or the picture
      if (!(/^\p{Lu}/u.test(text) || /^\{(pic|name|nameAde)\}/.test(text))) F.push(`${loc}: ${where} starts neither with a capital nor with a slot`);
      if (sl.includes('nameAde') && !allAde) F.push(`${loc}: ${where} uses {nameAde} but not every name carries an ade literal (rule 3)`);
      if (loc === 'fi' && ADE_KINDS.has(kind) && sl.includes('name')) F.push(`${loc}: ${where} "${text}" uses the nominative {name} where the adessive {nameAde} is required (rule 3)`);
      if (!ADE_KINDS.has(kind) && sl.includes('nameAde')) F.push(`${loc}: ${where} uses {nameAde} in a ${kind} frame (the nominative {name} is required there)`);
      for (const tok of GENDER_BAN[loc] || []) if (tokenRe(tok).test(text)) F.push(`${loc}: ${where} "${text}" carries the gendered token "${tok}" (rule 2)`);
    };
    const frames = b.frames || {};
    for (const k of CLUE_KINDS) {
      const arr = frames[k];
      if (!Array.isArray(arr)) { F.push(`${loc}: frames.${k} missing`); continue; }
      if (arr.length === 0) continue;   // an EMPTY array is a recorded refusal of the face (design §4), not a fault
      if (arr.length < 2) F.push(`${loc}: frames.${k} has ${arr.length} frame, want >= 2`);
      arr.forEach((t, i) => checkFrame(k, t, `frames.${k}[${i}]`));
    }
    const truth = b.truth || {};
    for (const k of TRUTH_KINDS) {
      const arr = truth[k];
      if (!Array.isArray(arr)) { F.push(`${loc}: truth.${k} missing`); continue; }
      if (arr.length === 0) continue;   // refusal of F5 is data (design §4)
      arr.forEach((t, i) => checkFrame(k, t, `truth.${k}[${i}]`));
    }
    if (TRUTH_KINDS.some((k) => Array.isArray(truth[k]) && truth[k].length === 0) && !TRUTH_KINDS.every((k) => Array.isArray(truth[k]) && truth[k].length === 0)) F.push(`${loc}: truth refuses some kinds but not all (refuse F5 whole or author all five)`);
    // (7) strings
    const S = b.strings || {};
    const titles = [];
    const head = String(b.head || '').trim().toLowerCase();
    if (!head) F.push(`${loc}: head missing`);
    for (const f of FACES) {
      const s = S[f];
      if (!s || !s.title || !s.instruction) { F.push(`${loc}: strings.${f} missing title/instruction`); continue; }
      if ([...s.title].length > 70) F.push(`${loc}: ${f} title ${[...s.title].length} > 70`);
      if (WORKSHEET_WORD.test(s.title)) F.push(`${loc}: ${f} title carries the worksheet word`);
      if (/sudoku/i.test(s.title + ' ' + s.instruction)) F.push(`${loc}: ${f} copy says "sudoku" (the visual-logic family's head)`);
      if (head && s.title.trim().toLowerCase().replace(/[:!?.]+$/, '') === head) F.push(`${loc}: ${f} title "${s.title}" equals the family head bare (head + one element)`);
      if ([...s.instruction].length > 150) F.push(`${loc}: ${f} instruction ${[...s.instruction].length} > 150`);
      if (!/[.!?]$/.test(s.instruction.trim())) F.push(`${loc}: ${f} instruction has no end mark`);
      if (/\{[^}]*\}/.test(s.title + s.instruction)) F.push(`${loc}: ${f} copy carries a slot (the apparatus is language-free)`);
      const claim = freeClaimHit(s.title + ' ' + s.instruction);
      if (claim) F.push(`${loc}: ${f} copy claims free ("${claim}")`);
      titles.push(s.title.toLowerCase());
    }
    if (new Set(titles).size !== titles.length) F.push(`${loc}: face titles repeat`);
    if (taxonomy && taxonomy.axes && taxonomy.axes['exercise-type']) {
      for (const rival of ['visual-logic', 'sudoku']) {
        const r = taxonomy.axes['exercise-type'][rival];
        const nm = r && r.name && r.name[loc];
        if (nm && head && nm.trim().toLowerCase() === head) F.push(`${loc}: head "${b.head}" equals the ${rival} hub name (the head must differ)`);
      }
    }
  }
  // (5) allowlists (code, shared): >= 6 after resolving in-list confusable pairs; no BW marker; cached + vocab ×11
  const pairs = sets.confusable || [];
  for (const [theme, list] of Object.entries(sets.distinct || {})) {
    if (!Array.isArray(list)) { F.push(`SETS.distinct.${theme} is not an array`); continue; }
    if (new Set(list).size !== list.length) F.push(`SETS.distinct.${theme} repeats a noun`);
    const inList = pairs.filter(([a, c]) => list.includes(a) && list.includes(c));
    const usable = list.length - inList.length;
    if (usable < 6) F.push(`SETS.distinct.${theme}: ${list.length} nouns minus ${inList.length} confusable pair(s) = ${usable} < 6`);
    for (const n of list) if (BW_MARKER.test(n)) F.push(`SETS.distinct.${theme}: "${n}" carries a BW marker`);
    if (BW_MARKER.test(theme)) F.push(`SETS.distinct: theme "${theme}" is a BW theme`);
    if (!o.skipPictures) {
      let resolve, entriesFor;
      try { resolve = require('../../image-cache/resolve.js'); ({ entriesFor } = require('../../lib/b2-common.js')); } catch (e) { F.push('rule 5: cannot load the picture / vocab doors: ' + e.message); break; }
      let cached;
      try { cached = resolve.themeEntry(theme).nouns; } catch (e) { F.push(`SETS.distinct.${theme}: theme not in the image cache`); continue; }
      const byLoc = {};
      for (const l of ALL_LOCALES) byLoc[l] = new Set(entriesFor(theme, l).map((e) => e.vocabKey));
      for (const n of list) {
        if (!cached[n] || !cached[n].vocabKey) { F.push(`SETS.distinct.${theme}: "${n}" is not cached with a vocab key`); continue; }
        const miss = ALL_LOCALES.filter((l) => !byLoc[l].has(cached[n].vocabKey));
        if (miss.length) F.push(`SETS.distinct.${theme}: "${n}" has no vocab entry / is excluded in ${miss.join(',')}`);
      }
    }
  }
  for (const t of sets.fan || []) if (!sets.distinct || !sets.distinct[t]) F.push(`SETS.fan theme "${t}" has no allowlist`);
  if (!sets.distinct || !Array.isArray(sets.distinct.colors) || sets.distinct.colors.length < 6) F.push('SETS.distinct.colors < 6 (the F4 attribute)');
  return F;
}

let _free = null;
function freeClaimHit(text) {
  if (_free === null) { try { _free = require('../../../lib/free-claim.js'); } catch (e) { _free = false; } }
  if (!_free) return /(?<!\p{L})(free|kostenlos|gratis|gratuit|gratuito|ilmainen)(?!\p{L})/iu.test(text) ? 'free' : null;
  return _free.hit(text);
}

module.exports = { LOGIC_PUZZLES, SETS, validateBank, GENDER_BAN, CLUE_KINDS, TRUTH_KINDS, FACES };
