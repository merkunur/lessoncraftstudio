#!/usr/bin/env node
/**
 * verify-b5-word-parts.js — the G2-359 `word-parts` family gate (design
 * docs/worksheet-gen/b5-designs/G2-359-word-parts.md §5; the nt10-E build brief deliverable 4).
 * BASE build (2026-09-23); the face renders / face poisons (PR2, PR3, PR9 render) join in
 * Phase E with the faces.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-word-parts.js [--quick]
 *
 * 0. the primitive gate (qa/verify-word-brick.js) must PASS.
 * 1. BANK — validateBank(block, loc) (exported; tools/validate-b5-draft.js calls it for every
 *    panel draft): §5 rules 1-15 (F1's rule 7 applies to exemplar.F1 when authored; the
 *    base root pictures are checked the same way: opened, resolving, never B&W).
 * 2. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts): d1/d2/d3 en,
 *    d2 under the 722 chrome (3-line title + 150-char instruction) and the 677 chrome (the
 *    4-line fi title), plus a long-word de/nl fixture bank; asserts verify() empty,
 *    qa/lints.js clean and the floors ITSELF (bricks >= 36, text >= 17, writing glyphH >= 24
 *    / base 28, courses >= courseH, stone text >= 22, bank <= 3 rows, pictures >= 44);
 *    SPARSE: no blank band > 40 px between the bank and the walls, between two courses, or
 *    between the last course and the stone, at the 814 / 722 / 677 chromes (the body slack
 *    below the walls is REPORTED, never between blocks).
 * 3. SWEEP — 20 seeds x d2 render distinct verify-clean pages (--quick: 5); a node sweep of
 *    400 seeds measures the answer-position tells on the SHIPPED composer (which family
 *    stands left, whether the strip's first brick belongs to the left wall, every family
 *    on both sides) and proves the pattern locale-neutral (a relabelled clone of the bank
 *    draws the same family / order / side sequence); an unauthored locale REFUSES.
 * 4. POISON — each must FAIL for its OWN reason (no fail = SILENT, another = WRONG REASON;
 *    either exits 1); the correct EN bank is the control. §5 P1-P17 + control C1 + the base
 *    render poisons PR5 PR6 PR7 PR8 + PS (sparse). PR1 / PR4 live in verify-word-brick.js.
 * 5. FACES (Phase E, 2026-09-23) — qa/b5-word-parts-faces.js: strings, sweeps, refusals, 5 faces x 4 chromes
 *    (SPARSE on ink, FILL), PR2 PR3 PR9 + the face poisons. Rule 14b (an en instruction names only apparatus
 *    its face prints) and the picFamilies / rootFamilies rules live in validateBank.
 */
'use strict';
/** the probe for 'an unauthored locale refuses': the first locale no panel has applied yet (sv was the probe until its panel landed) */
const UNAUTH = ['fi', 'no', 'da', 'sv', 'nl', 'it', 'fr', 'es', 'pt', 'de'].find((l) => !Object.keys(require('../lib/b5-common.js').bankModule('word-parts')).includes(l)) || 'xx';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng } = require('../lib/rng.js');
const { vocab } = require('../lib/b2-common.js');
const { fileUri } = require('../image-cache/resolve.js');
const B3 = require('../lib/b3-common.js');
const freeClaim = require('../../lib/free-claim.js');
const WB = require('../primitives/word-brick.js');
const brickGate = require('./verify-word-brick.js');
const bankMod = require('../data/b5/word-parts.js');
const { PRONOUNS } = require('../data/b4/pronouns.js');
const TYPE = require('../types/g2/G2-359-prefixes-suffixes-and-root-words.js');
const { faceGate } = require('./b5-word-parts-faces.js');
const TAX = require('../../../frontend/config/topics-taxonomy.json');

const OUT = path.join(__dirname, '..', 'out', 'dev', 'G2-359-gate');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const MODES = ['base', 'picture-family', 'root-word', 'prefix-key', 'who-does-it', 'family-in-sentence'];
const SLOTS = ['verb', 'noun-person', 'noun-thing', 'adjective', 'adverb'];
const KINDS = ['derived', 'prefixed', 'compound'];
const WORKSHEET_WORD = /worksheet|arbeitsblatt|werkblad|arbetsblad|arbejdsark|arbeidsark|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/i;
const INSTR_BANNED = /(?<!\p{L})(tick|cut|colou?r)(?!\p{L})/iu;
/** Rule 13 per locale (+ everywhere the silabic heads). */
const OWNED = {
  all: [/fam[ií]lia sil[aá]bica/i],
  en: [/word famil/i], fr: [/familles? de mots/i], es: [/familias de palabras/i], it: [/alterat/i],
};
/** Rule 14: the apparatus each face's instruction must name (en source). */
const APPARATUS_EN = {
  base: [/word/i, /wall/i, /root word/i], 'picture-family': [/picture/i, /word/i], 'root-word': [/words/i, /part/i, /stone/i],
  'prefix-key': [/mean/i, /prefix/i, /key/i, /empty piece/i], 'who-does-it': [/person/i, /word/i, /empty brick/i], 'family-in-sentence': [/words/i, /stone/i, /sentence/i],
};
/** Rule 14b (nt10-E): the apparatus NOUNS an en instruction may name = those drawn on that face's page. */
const APP_NOUNS = { line: /(?<!\p{L})lines?(?!\p{L})/iu, box: /(?<!\p{L})box(es)?(?!\p{L})/iu, wall: /(?<!\p{L})walls?(?!\p{L})/iu, key: /(?<!\p{L})keys?(?!\p{L})/iu,
  piece: /(?<!\p{L})pieces?(?!\p{L})/iu, stone: /(?<!\p{L})stones?(?!\p{L})/iu, brick: /(?<!\p{L})bricks?(?!\p{L})/iu, picture: /(?<!\p{L})pictures?(?!\p{L})/iu,
  sentence: /(?<!\p{L})sentences?(?!\p{L})/iu, strip: /(?<!\p{L})strips?(?!\p{L})/iu, chart: /(?<!\p{L})charts?(?!\p{L})/iu, grid: /(?<!\p{L})grids?(?!\p{L})/iu, card: /(?<!\p{L})cards?(?!\p{L})/iu };
const APP_PRESENT = {
  base: ['wall', 'line', 'stone', 'brick', 'strip'], 'picture-family': ['picture', 'brick', 'stone', 'card'], 'root-word': ['stone', 'brick', 'line', 'card'],
  'prefix-key': ['key', 'piece', 'brick', 'line'], 'who-does-it': ['brick', 'picture', 'line', 'card'], 'family-in-sentence': ['stone', 'sentence', 'brick', 'line'],
};
const INFLECT_EN = ['s', 'es', 'ed', 'd', 'ing', 'est', 'ies', 'ied'];
// + weather/cloud: nt10-D opened it and ruled it a pink faced blob (b4-designs _SUBSTRATE); F1 pins spring/cloud
const F1_REFUSED = ['weather/raindrop', 'weather/snowflake', 'spring/garden', 'summer/sand', 'weather/cloud'];
const AGENT_EXCLUDED = { all: ['author', 'librarian', 'coach'], en: ['waitress'] };
const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s|\d|$)/i;
const SPARSE_MAX = 40;

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const low = (s, loc) => String(s).normalize('NFC').toLocaleLowerCase(loc);
const glyphs = (s) => [...String(s).normalize('NFC')].length;
const tri = (s) => { const o = new Set(); for (let i = 0; i + 3 <= s.length; i++) o.add(s.slice(i, i + 3)); return o; };

let _compound = null;
/** Every `word` literal of every locale's compound-words bank (rule 11: all 11 locales). */
function compoundWords() {
  if (_compound) return _compound;
  _compound = new Set();
  for (const l of LOCALES) {
    let b; try { b = B3.bank('compound-words', l); } catch (e) { continue; }
    (function walk(o, k) { if (typeof o === 'string') { if (k === 'word') _compound.add(low(o, l)); return; } if (o && typeof o === 'object') for (const [kk, v] of Object.entries(o)) walk(v, kk); })(b);
  }
  return _compound;
}
function verbForms(loc) {
  const s = new Set();
  let b; try { b = B3.bank('verb-forms', loc); } catch (e) { return s; }
  for (const v of b.verbs || []) for (const f of Object.values(v.forms || {})) for (const x of Object.values(f || {})) if (typeof x === 'string') s.add(low(x, loc));
  return s;
}
function negatingTokens(b, loc) {
  let op = []; try { op = B3.bank('opposites', loc).prefix.prefixes || []; } catch (e) { /* no opposites bank */ }
  return [...op, ...(b.negating || [])].map((x) => low(x, loc));
}

/* ---------------------------------------------------------------- 1. bank */
function validateBank(b, loc) {
  const f = [];
  const push = (m) => f.push(`${loc}: ${m}`);
  if (!b || typeof b !== 'object') return [`${loc}: no block`];
  const fams = Array.isArray(b.families) ? b.families : [];
  const neg = negatingTokens(b, loc);
  const CW = compoundWords();
  const VF = verbForms(loc);
  const rootFams = Array.isArray(b.rootFamilies) ? b.rootFamilies : [];
  const picFams = Array.isArray(b.picFamilies) ? b.picFamilies : [];
  const allMembers = new Map();
  for (const fam of [...fams, ...rootFams, ...picFams]) for (const mm of fam.members || []) allMembers.set(low(mm.word, loc), fam.id);
  const wordOk = (w, what) => {
    if (typeof w !== 'string' || !w.trim()) { push(`${what} missing (rule 1)`); return false; }
    if (w !== w.normalize('NFC')) push(`${what} "${w}" is not NFC (rule 1)`);
    if (!/^[\p{L}\p{M}'’-]+$/u.test(w)) push(`${what} "${w}" carries a non-letter (rule 1)`);
    if (/[Œœ]/.test(w)) push(`${what} "${w}" carries Œ/œ (untested ligature, rule 1)`);
    return true;
  };
  // rule 4
  if (fams.length < 6) push(`${fams.length} families (< 6, rule 4)`);
  const ids = new Set();
  for (const fam of [...fams, ...rootFams]) {
    const tag = `family ${fam.id}`;
    if (ids.has(fam.id)) push(`${tag}: the id repeats`); ids.add(fam.id);
    if (fam.signed !== true) push(`${tag}: not signed`);
    const mem = fam.members || [];
    if (mem.length < 7) push(`${tag}: ${mem.length} members (< 7, rule 4)`);
    const comp = mem.filter((mm) => mm.kind === 'compound').length;
    if (comp > 1) push(`${tag}: ${comp} compound members (<= 1, rule 4)`);
    const stem = low(fam.stem || '', loc);
    wordOk(fam.stem, `${tag} stem`);
    const root = fam.root && fam.root.word;
    if (wordOk(root, `${tag} root.word`)) {
      if (fam.rootIsFreeWord) {
        if (!low(root, loc).includes(stem)) push(`${tag}: the stem "${fam.stem}" is not in the free-word root "${root}" (rule 2)`);
        if (glyphs(root) > 9) push(`${tag}: the free-word root "${root}" has ${glyphs(root)} glyphs (> 9)`);
      }
      if (mem.some((mm) => low(mm.word, loc) === low(root, loc))) push(`${tag}: the root "${root}" is also a member`);
    }
    if (fam.root && fam.root.pic) {
      const p = fam.root.pic;
      if (fam.root.picOpened !== true) push(`${tag}: root.pic ${p.theme}/${p.noun} not opened (rule 7)`);
      if (BW.test(p.theme)) push(`${tag}: root.pic is a B&W theme`);
      if (F1_REFUSED.includes(p.theme + '/' + p.noun)) push(`${tag}: root.pic ${p.theme}/${p.noun} is a refused picture (rule 7)`);
      try { fileUri(p.theme, p.noun); } catch (e) { push(`${tag}: root.pic ${p.theme}/${p.noun} does not resolve (rule 7)`); }
    }
    for (const mm of mem) {
      const mt = `${tag} member "${mm.word}"`;
      if (!wordOk(mm.word, mt)) continue;
      const w = low(mm.word, loc);
      if (!KINDS.includes(mm.kind)) push(`${mt}: kind "${mm.kind}" (rule 3)`);
      if (!SLOTS.includes(mm.slot)) push(`${mt}: slot "${mm.slot}"`);
      if (!w.includes(stem) && !mm.stemSigned) push(`${mt}: does not contain the stem "${fam.stem}" and carries no stemSigned (rule 2)`);
      // rule 3: inflection
      const ends = loc === 'en' ? INFLECT_EN : (b.inflections || []);
      for (const base of [low(root || '', loc), stem]) for (const e of ends) if (base && w === base + e) push(`${mt}: an inflected form (${base} + -${e}, rule 3)`);
      if (VF.has(w)) push(`${mt}: an inflected form in the verb-forms bank (rule 3)`);
      // rule 8: no negating-prefix member (whole token at the start)
      for (const t of neg) if (w.startsWith(t) && !w.startsWith(stem)) push(`${mt}: begins with the negating prefix "${t}" (rule 8)`);
      // rule 11
      if (CW.has(w)) push(`${mt}: a compound-words bank word (rule 11)`);
      if (glyphs(mm.word) > 18) push(`${mt}: ${glyphs(mm.word)} glyphs (> 18, rule 15)`);
      if (allMembers.get(w) !== fam.id) push(`${mt}: also a member of ${allMembers.get(w)}`);
    }
    // rule 6
    for (const la of fam.lookAlikes || []) {
      if (!la.whyNotFamily) push(`${tag} look-alike "${la.word}": no whyNotFamily (rule 6)`);
      if (!root || low(la.word, loc).slice(0, 2) !== low(root, loc).slice(0, 2)) push(`${tag} look-alike "${la.word}": does not share 2 initial letters with "${root}" (rule 6)`);
      if (allMembers.has(low(la.word, loc))) push(`${tag} look-alike "${la.word}": is a family member (rule 6)`);
    }
  }
  // cross-family: no member contains another family's stem (families + rootFamilies share the F2 page)
  const wallFams = [...fams, ...rootFams];
  for (const fa of wallFams) for (const fb of wallFams) if (fa !== fb) {
    const sb = low(fb.stem || '', loc);
    for (const mm of fa.members || []) if (sb && low(mm.word, loc).includes(sb) && low(fa.stem, loc).includes(sb) === false) push(`family ${fa.id} member "${mm.word}" contains family ${fb.id}'s stem "${fb.stem}" (a two-wall brick)`);
  }
  // F1 picture-root families (Phase E): >= 1 derived member CONTAINING the root, >= 3 look-alikes that
  // share its first 2 letters and do NOT contain it (exactly one brick per card is built from the picture word)
  const pidSeen = new Set();
  for (const fam of picFams) {
    const tag = `picFamily ${fam.id}`;
    if (pidSeen.has(fam.id)) push(`${tag}: the id repeats`); pidSeen.add(fam.id);
    if (fam.signed !== true) push(`${tag}: not signed`);
    const root = fam.root && fam.root.word;
    if (!wordOk(root, `${tag} root.word`)) continue;
    const r = low(root, loc);
    const pic = fam.root.pic;
    if (!pic) push(`${tag}: no root.pic (a picture root needs its picture, rule 7)`);
    else {
      if (fam.root.picOpened !== true) push(`${tag}: root.pic ${pic.theme}/${pic.noun} not opened (rule 7)`);
      if (BW.test(pic.theme)) push(`${tag}: root.pic is a B&W theme`);
      if (F1_REFUSED.includes(pic.theme + '/' + pic.noun)) push(`${tag}: root.pic ${pic.theme}/${pic.noun} is a refused F1 root picture (rule 7)`);
      try { fileUri(pic.theme, pic.noun); } catch (e) { push(`${tag}: root.pic ${pic.theme}/${pic.noun} does not resolve (rule 7)`); }
    }
    const mem = fam.members || [];
    if (!mem.length) push(`${tag}: no member (F1 needs >= 1)`);
    for (const mm of mem) {
      const mt = `${tag} member "${mm.word}"`;
      if (!wordOk(mm.word, mt)) continue;
      const w = low(mm.word, loc);
      if (mm.kind !== 'derived') push(`${mt}: kind "${mm.kind}" (F1 members are derived, never compound)`);
      if (!w.includes(r)) push(`${mt}: does not contain the picture word "${root}" (F1)`);
      const ends = loc === 'en' ? INFLECT_EN : (b.inflections || []);
      for (const e of ends) if (w === r + e) push(`${mt}: an inflected form (${r} + -${e}, rule 3)`);
      if (VF.has(w)) push(`${mt}: an inflected form in the verb-forms bank (rule 3)`);
      for (const t of neg) if (w.startsWith(t) && !w.startsWith(r)) push(`${mt}: begins with the negating prefix "${t}" (rule 8)`);
      if (CW.has(w)) push(`${mt}: a compound-words bank word (rule 11)`);
      if (WB.brickEstimate(20, glyphs(mm.word)) > 185) push(`${mt}: does not fit a G1 brick at 20 px (rule 15)`);
    }
    const looks = fam.lookAlikes || [];
    if (looks.length < 3) push(`${tag}: ${looks.length} look-alikes (< 3)`);
    for (const la of looks) {
      const lw = low(la.word, loc);
      if (!la.whyNotFamily) push(`${tag} look-alike "${la.word}": no whyNotFamily (rule 6)`);
      if (lw.slice(0, 2) !== r.slice(0, 2)) push(`${tag} look-alike "${la.word}": does not share 2 initial letters with "${root}" (rule 6)`);
      if (lw.includes(r)) push(`${tag} look-alike "${la.word}": contains the picture word "${root}" (two bricks built from it)`);
      if (allMembers.has(lw)) push(`${tag} look-alike "${la.word}": is a family member (rule 6)`);
      if (WB.brickEstimate(20, glyphs(la.word)) > 185) push(`${tag} look-alike "${la.word}": does not fit a G1 brick at 20 px (rule 15)`);
    }
  }
  // rule 5: exemplar pairs
  const ex = b.exemplar || {};
  const byId = Object.fromEntries([...fams, ...rootFams].map((x) => [x.id, x]));
  for (const id of ex.F2 || []) if (!byId[id]) push(`exemplar.F2 names an unknown family "${id}"`);
  for (const key of ['base', 'F5']) {
    const list = (ex[key] || []).map((id) => byId[id]);
    if (list.some((x) => !x)) { push(`exemplar.${key} names an unknown family (rule 5)`); continue; }
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
      const a = low(list[i].stem, loc), c = low(list[j].stem, loc);
      if (a.includes(c) || c.includes(a)) push(`exemplar.${key}: stems "${list[i].stem}" / "${list[j].stem}" are substrings (rule 5)`);
      const ta = tri(a); if ([...tri(c)].some((t) => ta.has(t))) push(`exemplar.${key}: stems "${list[i].stem}" / "${list[j].stem}" share a 3-letter string (rule 5)`);
    }
  }
  // rule 7: F1 roots (when authored)
  for (const k of ex.F1 || []) {
    const fam = [...picFams, ...fams].find((x) => x.root && x.root.pic && (x.root.pic.theme + '/' + x.root.pic.noun) === k);
    if (!fam) { push(`exemplar.F1 "${k}": no family pins that picture (rule 7)`); continue; }
    if (F1_REFUSED.includes(k)) push(`exemplar.F1 "${k}": a refused F1 root picture (rule 7)`);
    const m = require('../cache/manifest.json');
    const [t, n] = k.split('/');
    const vk = m.themes[t] && m.themes[t].nouns[n] && m.themes[t].nouns[n].vocabKey;
    const V = vk && vocab()[vk];
    if (!V || low(V[loc][0], loc) !== low(fam.root.word, loc)) push(`exemplar.F1 "${k}": the root "${fam.root.word}" ≠ the picture's ${loc} vocab word (rule 7)`);
    if ((fam.lookAlikes || []).length < 3) push(`exemplar.F1 "${k}": < 3 look-alikes`);
  }
  // rules 8 + 10: prefix key
  const pk = b.prefixKey;
  if (!(b.refuse && b.refuse['prefix-key'])) {
    if (!pk || !Array.isArray(pk.prefixes) || !Array.isArray(pk.rows)) push('prefixKey missing (rule 10)');
    else {
      for (const p of pk.prefixes) {
        if (neg.includes(low(p.prefix, loc))) push(`prefixKey "${p.prefix}" is a negating prefix (rule 8)`);
        const n = pk.rows.filter((r) => r.prefix === p.prefix).length;
        if (n < 2) push(`prefixKey "${p.prefix}" answers ${n} rows (< 2, rule 10)`);
        if (!p.meaning) push(`prefixKey "${p.prefix}" has no meaning`);
      }
      if (pk.rows.length < 10) push(`prefixKey has ${pk.rows.length} rows (< 10)`);
      for (const r of pk.rows) {
        if ((r.prefix + r.base).normalize('NFC') !== String(r.word).normalize('NFC')) push(`prefixKey row "${r.word}": prefix + base "${r.prefix + r.base}" ≠ the word (rule 10)`);
        if (!pk.prefixes.some((p) => p.prefix === r.prefix)) push(`prefixKey row "${r.word}": prefix "${r.prefix}" not in the key`);
        const cc = (pk.crossCheck || []).filter((c) => c.base === r.base);
        const good = cc.filter((c) => c.isWord && c.fitsGloss);
        if (cc.length !== pk.prefixes.length) push(`prefixKey row "${r.word}": crossCheck covers ${cc.length} of ${pk.prefixes.length} prefixes (rule 10)`);
        if (good.length !== 1 || good[0].prefix !== r.prefix) push(`prefixKey row "${r.word}": ${good.length} prefixes fit the gloss (want exactly its own, rule 10)`);
        if (WB.brickWidthFor('stem', r.base, 20) > 140) push(`prefixKey row "${r.word}": the base brick is ${WB.brickWidthFor('stem', r.base, 20)} px (> 140, rule 15)`);
        if (low(r.gloss, loc).includes(low(r.prefix, loc) + low(r.base, loc))) push(`prefixKey row "${r.word}": the gloss prints the answer`);
      }
    }
  }
  // rule 9: agents
  const people = Object.fromEntries(PRONOUNS.en.people.map((p) => [p.key, p]));
  const exAg = [...AGENT_EXCLUDED.all, ...(AGENT_EXCLUDED[loc] || [])];
  if (!(b.refuse && b.refuse['who-does-it'])) {
    if ((b.agents || []).length < 8) push(`${(b.agents || []).length} agents (< 8)`);
    for (const a of b.agents || []) {
      const tag = `agent ${a.key}`;
      const p = people[a.key];
      if (!p || !p.depicted) { push(`${tag}: not a pronouns-bank portrait with a depicted tag (rule 9)`); continue; }
      if (exAg.includes(a.key)) push(`${tag}: an excluded portrait (rule 9)`);
      const ans = (a.answer && (a.answer[p.depicted] || a.answer.any)) || null;
      if (!ans) { push(`${tag}: no answer for the depicted "${p.depicted}" (rule 9)`); continue; }
      if (!low(ans, loc).includes(low(a.base, loc)) && !a.stemSigned) push(`${tag}: base "${a.base}" not in the answer "${ans}" and no stemSigned (rule 9)`);
      for (const v of Object.values(a.answer)) if (CW.has(low(v, loc))) push(`${tag}: answer "${v}" is a compound-words bank word (rule 11)`);
    }
  }
  // rule 12: F5 blocks
  for (const id of ex.F5 || []) {
    const blk = (b.sentences || {})[id];
    if (!blk || blk.length !== 4) { push(`F5 block ${id}: ${blk ? blk.length : 0} sentences (want 4, rule 12)`); continue; }
    const slots = blk.map((x) => x.slot);
    if (new Set(slots).size !== 4) push(`F5 block ${id}: slots [${slots.join()}] are not pairwise distinct (rule 12)`);
    for (const s of blk) {
      const mm = (byId[id] && byId[id].members || []).find((x) => x.word === s.word);
      if (!mm) push(`F5 block ${id}: "${s.word}" is not a member (rule 12)`);
      else if (mm.slot !== s.slot) push(`F5 block ${id}: "${s.word}" slot ${s.slot} ≠ the member's ${mm.slot} (rule 12)`);
      if ((String(s.frame).match(/\{gap\}/g) || []).length !== 1) push(`F5 block ${id}: frame "${s.frame}" must carry exactly one {gap} (rule 12)`);
      if (loc === 'en' && /(?<!\p{L})an?\s+\{gap\}/iu.test(s.frame)) push(`F5 block ${id}: frame "${s.frame}" puts an agreeing article before the gap (rule 12)`);
      if (WB.brickWidthFor('word', s.word, 18) > 147) push(`F5 block ${id}: "${s.word}" brick > 147 px (rule 15)`);
    }
  }
  // rules 13 + 14: strings
  const S = b.strings || {};
  // A face the bank itself declares refused (b.refuse[mode] === true) is exempt: its string may be
  // absent or null. Every OTHER face must carry a string (absent OR null is a finding), and no id
  // outside MODES may appear.
  const refusedModes = MODES.filter((m) => b.refuse && b.refuse[m] === true);
  const liveModes = MODES.filter((m) => !refusedModes.includes(m));
  const extraIds = Object.keys(S).filter((k) => !MODES.includes(k));
  const missIds = liveModes.filter((m) => !S[m]);
  if (extraIds.length || missIds.length) push(`strings ids [${Object.keys(S).join()}] ≠ [${liveModes.join()}]${refusedModes.length ? ` (refused: ${refusedModes.join()})` : ''} (rule 14)`);
  const owned = [...OWNED.all, ...(OWNED[loc] || [])];
  const titles = [];
  for (const id of MODES) {
    const s = S[id]; if (!s) continue;
    const t = s.title || '', ins = s.instruction || '';
    for (const re of owned) for (const x of [t, ins]) if (re.test(x)) push(`strings.${id} "${x}" carries an owned head ${re} (rule 13)`);
    if (!t || t.length > 70) push(`strings.${id} title length ${t.length} (1..70, rule 14)`);
    if (WORKSHEET_WORD.test(t)) push(`strings.${id} title carries a worksheet word (rule 14)`);
    if (!ins || ins.length > 150) push(`strings.${id} instruction length ${ins.length} (1..150, rule 14)`);
    if ((ins.match(/[.!?](\s|$)/g) || []).length > 1) push(`strings.${id} instruction is more than ONE sentence (rule 14)`);
    if (INSTR_BANNED.test(ins)) push(`strings.${id} instruction names "${ins.match(INSTR_BANNED)[0]}" (rule 14)`);
    for (const x of [t, ins]) { const h = freeClaim.hit(x); if (h) push(`strings.${id} claims free ("${h}", rule 14)`); if (ANSWERS_WORD.test(x)) push(`strings.${id} promises answers (rule 14)`); }
    if (loc === 'en') for (const re of APPARATUS_EN[id]) if (!re.test(ins)) push(`strings.${id} instruction does not name its apparatus ${re} (rule 14)`);
    if (loc === 'en') for (const [noun, re] of Object.entries(APP_NOUNS)) if (re.test(ins) && !APP_PRESENT[id].includes(noun)) push(`strings.${id} instruction names "${noun}", which is not on the ${id} page (rule 14b)`);
    titles.push(low(t, loc));
  }
  if (new Set(titles).size !== titles.length) push('two faces share a title (rule 14)');
  if (b.familyHead) for (const re of owned) if (re.test(b.familyHead)) push(`familyHead "${b.familyHead}" carries an owned head ${re} (rule 13)`);
  return f;
}

/* ---------------------------------------------------------------- 2. render */
async function renderWith(page, type, { difficulty = 2, baseName, strings, seedEpoch }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: 'en', page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const R = (el) => el.getBoundingClientRect();
    const root = document.querySelector('[data-lcs-type="G2-359"]');
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
    if (!root) return null;
    const bank = root.querySelector('[data-lcs-bank-panel]');
    const walls = [...root.querySelectorAll('[data-lcs-wall]')];
    const bands = [];
    const wallsTop = Math.min(...walls.map((w) => R(w).top));
    bands.push(['bank -> walls', wallsTop - R(bank).bottom]);
    for (const w of walls) {
      const cs = [...w.querySelectorAll('[data-lcs-course]')];
      for (let i = 1; i < cs.length; i++) bands.push([`${w.dataset.lcsWall} course ${i - 1} -> ${i}`, R(cs[i]).top - R(cs[i - 1]).bottom]);
      const st = w.querySelector('[data-lcs-stone]');
      bands.push([`${w.dataset.lcsWall} last course -> stone`, R(st).top - R(cs[cs.length - 1]).bottom]);
      bands.push([`${w.dataset.lcsWall} wall top -> first course`, R(cs[0]).top - R(w).top]);
    }
    const courses = [...root.querySelectorAll('[data-lcs-course]')].map((c) => R(c).height);
    const lowest = Math.max(...[...root.querySelectorAll('*')].map((e) => R(e).bottom));
    const bricks = [...root.querySelectorAll('[data-lcs-bank-brick]')];
    return {
      body: R(body).height, headBottom: R(document.querySelector('.ws-head')).bottom, foot: R(foot).top, lowest, bands, courses,
      rows: new Set(bricks.map((b) => Math.round(R(b).top))).size, bank: bricks.map((b) => b.dataset.lcsWord).join('|'),
      walls: walls.map((w) => w.dataset.lcsWall).join('|'), slack: R(body).bottom - lowest,
      scroll: [...root.querySelectorAll('[data-lcs-wall], [data-lcs-bank-panel]')].some((e) => e.scrollWidth > e.clientWidth + 0.5),
    };
  });
  return { out, m, verify: out.qa.verify, lints: out.qa.lints };
}
function assertRender(name, r, { body } = {}) {
  ok(!r.verify.length, `${name}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
  ok(!r.lints.length, `${name}: lints ${JSON.stringify(r.lints.slice(0, 4))}`);
  const m = r.m;
  if (!ok(!!m, `${name}: no root`)) return;
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches the footer (${m.lowest.toFixed(0)} > ${m.foot.toFixed(0)})`);
  ok(!m.scroll, `${name}: a wall / the bank scrolls horizontally`);
  ok(m.rows <= 3, `${name}: the bank takes ${m.rows} rows (> 3)`);
  for (const [k, v] of m.bands) ok(v <= SPARSE_MAX + 0.5, `${name}: SPARSE — ${v.toFixed(0)} px blank band ${k} (> ${SPARSE_MAX})`);
  if (body) ok(m.body <= body + 0.6, `${name}: body ${m.body.toFixed(0)} px — the fixture did not squeeze it to <= ${body}`);
}

const LONG = {
  // 3-line title + a 150-char instruction (the 722 chrome) and a 4-line fi title (the 677 chrome)
  c722: { title: 'Wortfamilien sortieren: jedes Wort auf die Mauer über seinem Wortstamm schreiben und prüfen', instruction: 'Lies jedes Wort oben und schreibe es auf eine Zeile der Mauer, die auf seinem Wortstamm steht, sodass jede Mauer genau ihre eigenen Wörter trägt.', body: 722 },
  c677: { title: 'Sanaperheet: lajittele sanat kantasanan mukaan ja kirjoita jokainen sana oikean muurin riville kantasanan kiven yläpuolelle huolellisesti', instruction: 'Lue jokainen ylhäällä oleva sana ja kirjoita se sen muurin riville, joka seisoo sanan kantasanan päällä.', body: 677 },
  c814: { title: 'Root Words', instruction: 'Write each word on its wall.', body: 900 },
};
/** A synthetic long-word block (de / nl / fi literals) — widths only; the node cross-check is expected to name it. */
const LONGBLOCK = {
  ...bankMod.WORD_PARTS.en,
  families: [
    { id: 'fahr', stem: 'fahr', rootIsFreeWord: false, root: { word: 'fahr' }, signed: true, members: ['Fahrer', 'Abfahrt', 'Ausfahrt', 'Einfahrt', 'Fahrradfahrer'].map((w) => ({ word: w, kind: 'derived', slot: 'noun-thing' })) },
    { id: 'maak', stem: 'maak', rootIsFreeWord: true, root: { word: 'maken' }, signed: true, members: ['schoonmaakster', 'maaksel', 'namaak', 'opmaak', 'maakbaar'].map((w) => ({ word: w, kind: 'derived', slot: 'noun-thing' })) },
  ],
};
function withBlock(block, extra = {}) {
  return { ...TYPE, build({ difficulty }, ctx) { return this._buildWith(block, { ...this.difficulty[difficulty], ...extra }, { locale: 'en' }, ctx); } };
}
function doctored(fn) { return { ...TYPE, build(o, ctx) { const r = TYPE.build(o, ctx); r.bodyHtml = fn(r.bodyHtml); return r; } }; }

async function main() {
  const quick = process.argv.includes('--quick');
  const banks = bankMod.WORD_PARTS;
  freeClaim.selfTest();
  // 0. primitive gate
  { const before = console.log; const lines = []; console.log = (...a) => lines.push(a.join(' ')); let p = false; try { p = await brickGate.main(); } finally { console.log = before; } ok(p, 'qa/verify-word-brick.js FAILED:\n    ' + lines.slice(-6).join('\n    ')); console.log('word-brick gate: ' + (lines.find((l) => /^(PASS|FAIL)/.test(l)) || '?')); }
  // 1. bank
  for (const loc of Object.keys(banks)) { const bf = validateBank(banks[loc], loc); bf.forEach((x) => ok(false, x)); console.log(`bank ${loc}: ${bf.length} findings (${banks[loc].families.length} families, ${banks[loc].families.reduce((s, x) => s + x.members.length, 0)} members)`); }
  ok(banks.en.strings.base.title === TYPE.i18n.en.title && banks.en.strings.base.instruction === TYPE.i18n.en.instruction, 'the bank\'s base strings ≠ the spec\'s i18n.en');
  { const n = TAX.axes['exercise-type']['word-parts'] && TAX.axes['exercise-type']['word-parts'].name && TAX.axes['exercise-type']['word-parts'].name.en; console.log(`taxonomy en name today: "${n}"${/word famil/i.test(n || '') ? ' — WITHDRAWN by the design (rule 13); re-register before any landing ships (shared file, not this build)' : ''}`); }
  { let m = null; try { TYPE.build({ difficulty: 2, locale: UNAUTH }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && new RegExp('no ' + UNAUTH + ' block|refuse').test(m), `an unauthored ${UNAUTH} REFUSES (got ${m})`); }
  // node sweep: tells + locale-neutral pattern
  {
    const relabel = JSON.parse(JSON.stringify(banks.en));
    for (const fam of relabel.families) { fam.members.forEach((mm) => { mm.word = mm.word.toUpperCase(); }); fam.root.word = fam.root.word.toUpperCase(); fam.stem = fam.stem.toUpperCase(); }
    let leftFirst = 0, bankFirstLeft = 0, neutral = 0; const sides = {}; const N = 400;
    for (let s = 1; s <= N; s++) {
      const r = TYPE._buildWith(banks.en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('G2-359-sweep-' + s) });
      const r2 = TYPE._buildWith(relabel, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('G2-359-sweep-' + s) });
      if (JSON.stringify([r.meta.families, r.meta.bankFamilies]) === JSON.stringify([r2.meta.families, r2.meta.bankFamilies])) neutral++;
      if (r.meta.left === r.meta.bankFamilies[0]) bankFirstLeft++;
      if (r.meta.families[0] === [...new Set(r.meta.bankFamilies)][0]) leftFirst++;
      for (const [i, id] of r.meta.families.entries()) { sides[id] = sides[id] || [0, 0]; sides[id][i]++; }
      ok(TYPE.orderOk(r.meta.bankFamilies), `seed ${s}: bank order breaks the run rules`);
      ok(r.meta.rows <= 3, `seed ${s}: ${r.meta.rows} bank rows`);
    }
    const share = bankFirstLeft / N;
    ok(neutral === N, `node sweep: the draw is not locale-neutral in ${N - neutral} seeds`);
    ok(share >= 0.35 && share <= 0.65, `node sweep: the strip's first brick belongs to the LEFT wall in ${(share * 100).toFixed(1)} % of pages (tell; want 35-65 %)`);
    const oneSided = Object.entries(sides).filter(([, v]) => !v[0] || !v[1]);
    ok(!oneSided.length, `node sweep: families only ever on one side: ${oneSided.map((x) => x[0]).join()}`);
    console.log(`node sweep ${N} seeds: locale-neutral ${neutral}/${N}; first brick on the left wall ${(share * 100).toFixed(1)} %; left wall = first family in the strip ${(leftFirst / N * 100).toFixed(1)} %; sides ${JSON.stringify(sides)}`);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  try {
    // 2. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G2-359-gate-d${d}-en` });
      assertRender(`d${d}`, r);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.toFixed(0)} courses ${Math.min(...r.m.courses).toFixed(0)}-${Math.max(...r.m.courses).toFixed(0)} rows ${r.m.rows} slack-below ${r.m.slack.toFixed(0)} max band ${Math.max(...r.m.bands.map((b) => b[1])).toFixed(0)}`);
    }
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G2-359-gate-d2-chrome-${k}`, strings: LONG[k] });
      assertRender(`d2 chrome ${k}`, r, { body: LONG[k].body });
      console.log(`render d2 chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.toFixed(0)} courses ${Math.min(...r.m.courses).toFixed(0)}-${Math.max(...r.m.courses).toFixed(0)} slack-below ${r.m.slack.toFixed(0)} lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)}`);
    }
    {
      const r = await renderWith(page, withBlock(LONGBLOCK), { difficulty: 2, baseName: 'G2-359-gate-d2-longwords-677', strings: LONG.c677 });
      r.verify = r.verify.filter((x) => !/^node/.test(x) && !/0 walls whose stem/.test(x));   // the synthetic block is not a bank (expected)
      assertRender('d2 long de/nl words + 677 chrome', r, { body: 677 });
      console.log(`render long words: ${r.m.bank} rows ${r.m.rows} body ${r.m.body.toFixed(0)} lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)}`);
    }
    // 3. sweep
    const pages = new Set();
    const S = quick ? 5 : 20;
    for (let s = 1; s <= S; s++) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G2-359-gate-sweep-${s}`, seedEpoch: s });
      assertRender(`sweep ${s}`, r);
      pages.add(r.m.walls + '#' + r.m.bank);
    }
    ok(pages.size === S, `sweep: ${pages.size} distinct pages of ${S}`);
    console.log(`sweep: ${pages.size} distinct pages of ${S}`);

    // 4. poisons — data
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const en = () => clone(banks.en);
    const fam = (b, id) => b.families.find((x) => x.id === id);
    const P = (name, mut, re, loc = 'en', base = en) => { const b = base(); mut(b); judge(name, validateBank(b, loc), re); };
    P('P1 member "helped"', (b) => { fam(b, 'help').members.push({ word: 'helped', kind: 'derived', slot: 'verb' }); }, /"helped": an inflected form/);
    const deBlock = () => { const b = en(); b.families.push({ id: 'fahr', stem: 'fahr', rootIsFreeWord: false, root: { word: 'fahr' }, signed: true,
      members: ['Fahrer', 'Fahrt', 'Abfahrt', 'Ausfahrt', 'Einfahrt', 'Fähre', 'Fahrzeug'].map((w, i) => ({ word: w, kind: i === 6 ? 'compound' : 'derived', slot: 'noun-thing' })), lookAlikes: [] }); b.strings = en().strings; b.prefixKey = en().prefixKey; return b; };
    { const ctl = validateBank((() => { const b = deBlock(); fam(b, 'fahr').members[5].stemSigned = true; return b; })(), 'de').filter((x) => /fahr|Fähre/.test(x)); log.push(`  control de fahr family (Fähre stemSigned): ${ctl.length} fahr findings${ctl.length ? ' — ' + ctl.join(' | ') : ''}`); ok(!ctl.length, 'the de fahr control must be clean'); }
    P('P2 de Fähre without stemSigned', () => {}, /"Fähre": does not contain the stem "fahr"/, 'de', deBlock);
    P('P3 foil "Sunday" for sun', (b) => { b.families.push({ id: 'sun', stem: 'sun', rootIsFreeWord: true, root: { word: 'sun' }, signed: true, members: ['sunny', 'sunless', 'Sunday', 'sunnily', 'sunniness', 'sunward', 'sunlit'].map((w) => ({ word: w, kind: 'derived', slot: 'adjective' })), lookAlikes: [{ word: 'Sunday', whyNotFamily: 'a day' }] }); }, /look-alike "Sunday": is a family member/);
    P('P4 exemplar stems sun / sunflow', (b) => { b.families.push({ id: 'sun', stem: 'sun', rootIsFreeWord: true, root: { word: 'sun' }, signed: true, members: [], lookAlikes: [] }, { id: 'sunflow', stem: 'sunflow', rootIsFreeWord: false, root: { word: 'sunflow' }, signed: true, members: [], lookAlikes: [] }); b.exemplar.base = ['sun', 'sunflow']; }, /exemplar\.base: stems "sun" \/ "sunflow" are substrings/);
    P('P5 key prefix "un"', (b) => { b.prefixKey.prefixes[2].prefix = 'un'; }, /prefixKey "un" is a negating prefix/);
    P('P6 read row: re and pre both fit', (b) => { b.prefixKey.crossCheck.find((c) => c.base === 'read' && c.prefix === 'pre').isWord = true; b.prefixKey.crossCheck.find((c) => c.base === 'read' && c.prefix === 'pre').fitsGloss = true; }, /row "reread": 2 prefixes fit the gloss/);
    P('P7 teacher only m while depicted f', (b) => { b.agents.find((a) => a.key === 'teacher').answer = { m: 'teacher' }; }, /agent teacher: no answer for the depicted "f"/);
    { const b = en(); b.families[0].members.push({ word: 'florero', kind: 'derived', slot: 'noun-thing' }); judge('P8 es member "florero"', validateBank(b, 'es'), /"florero": a compound-words bank word/); }
    P('P9 F5 two noun-thing slots', (b) => { b.sentences.play[0].slot = 'noun-thing'; }, /F5 block play: slots .* not pairwise distinct/);
    P('P10 F1 root weather/raindrop', (b) => { fam(b, 'fear').root.pic = { theme: 'weather', noun: 'raindrop' }; b.exemplar.F1 = ['weather/raindrop']; }, /a refused F1 root picture|refused picture \(rule 7\)/);
    { const b = en(); b.strings['picture-family'].title = 'Família silábica'; judge('P11 pt title "Família silábica"', validateBank(b, 'pt'), /owned head/); }
    P('P12 agent author', (b) => { b.agents.push({ key: 'author', base: 'write', answer: { any: 'writer' } }); }, /agent author: an excluded portrait/);
    P('P13 a family with 6 members', (b) => { fam(b, 'fear').members.pop(); }, /family fear: 6 members \(< 7/);
    P('P14 member "handbag"', (b) => { fam(b, 'help').members.push({ word: 'handbag', kind: 'compound', slot: 'noun-thing', stemSigned: true }); }, /"handbag": a compound-words bank word/);
    P('P15 member "unhelpful"', (b) => { fam(b, 'help').members.push({ word: 'unhelpful', kind: 'prefixed', slot: 'adjective' }); }, /"unhelpful": begins with the negating prefix "un"/);
    { const b = en(); b.prefixKey.rows.push({ base: 'entrer', prefix: 're', word: 'rentrer', gloss: 'entrer de nouveau' }); judge('P16 fr re + entrer = rentrer', validateBank(b, 'fr'), /row "rentrer": prefix \+ base "reentrer" ≠ the word/); }
    // rule 14 × refusals: a face the bank declares refused may omit its string; any other may not.
    P('R14a root-word string missing (not refused)', (b) => { delete b.strings['root-word']; }, /strings ids \[.*\] ≠ \[.*root-word.*\] \(rule 14\)/);
    P('R14b root-word string null (not refused)', (b) => { b.strings['root-word'] = null; }, /strings ids \[.*\] ≠ \[.*root-word.*\] \(rule 14\)/);
    P('R14c who-does-it string missing, NOT declared refused', (b) => { b.refuse = { ...(b.refuse || {}), 'who-does-it': false }; delete b.strings['who-does-it']; }, /strings ids \[.*\] ≠ \[.*who-does-it.*\] \(rule 14\)/);
    P('R14d who-does-it refused, root-word string missing', (b) => { b.refuse = { ...(b.refuse || {}), 'who-does-it': true }; delete b.strings['who-does-it']; delete b.strings['root-word']; }, /strings ids \[.*\] ≠ \[.*root-word.*\] \(refused: who-does-it\) \(rule 14\)/);
    for (const [cn, mut] of [['absent', (b) => { delete b.strings['who-does-it']; }], ['null', (b) => { b.strings['who-does-it'] = null; }]]) {
      const b = en(); b.refuse = { ...(b.refuse || {}), 'who-does-it': true }; mut(b);
      const f = validateBank(b, 'en').filter((x) => /strings ids/.test(x));
      log.push(`  C2 who-does-it refused, string ${cn}: ${f.length ? 'WRONGLY FIRES — ' + f[0] : 'passes rule 14 (control)'}`);
      ok(!f.length, `C2: a refused who-does-it with its string ${cn} must pass rule 14`);
    }
    P('P17 familyHead "Word Families and Word Parts"', (b) => { b.familyHead = 'Word Families and Word Parts'; }, /familyHead .* owned head/);
    { const b = en(); b.prefixKey.prefixes[2].prefix = 'sotto'; const f = validateBank(b, 'it').filter((x) => /negating prefix/.test(x)); log.push(`  C1 it key "sotto" (G2-320 bans the token "s"): ${f.length ? 'WRONGLY FIRES — ' + f[0] : 'passes rule 8 (control)'}`); ok(!f.length, 'C1: "sotto" must pass rule 8 (whole-token compare)'); }
    P('P18 two compounds in one family', (b) => { fam(b, 'help').members.push({ word: 'helpdesk', kind: 'compound', slot: 'noun-thing' }); }, /family help: 2 compound members/);
    P('P19 F5 frame "an {gap}"', (b) => { b.sentences.act[1].frame = 'She is an {gap} in the play.'; }, /agreeing article before the gap/);

    // 4. poisons — render
    const rp = async (name, type, re, opts = {}) => { let f; try { const r = await renderWith(page, type, { difficulty: 2, baseName: 'G2-359-gate-poison-' + name.split(' ')[0], ...opts }); f = [...r.verify, ...r.lints.map((l) => JSON.stringify(l))]; if (opts.assert) { const before = fails.length; assertRender(name, r); f.push(...fails.splice(before)); } } catch (e) { f = ['THROWN: ' + e.message]; } judge(name, f, re); };
    // PR5: a picture on one stone only (the fear/joy pair pictures both; drop the first <img>)
    await rp('PR5 picture on one stone', doctored((h) => h.replace(/<img class="ws-icon"[^>]*>/, '')), /a picture on one stone only/, { seedEpoch: 1, difficulty: 1 });
    await rp('PR6 answerBox in a course', doctored((h) => h.replace('data-lcs-course="0"', 'data-lcs-course="0" data-lcs-answer="undefined"')), /answer stamp/);
    {
      const wide = clone(LONGBLOCK);   // every member >= 14 glyphs: two bricks a row at 20 px -> a 5-row strip unless the guard holds
      wide.families[0].members = ['Fahrradfahrerin', 'Autobahnauffahrt', 'Ausfahrtsschilder', 'Einfahrtstoren', 'Abfahrtszeiten'].map((w) => ({ word: w, kind: 'derived', slot: 'noun-thing' }));
      wide.families[1].members = ['schoonmaakster', 'schoonmaakbedrijf', 'maakwerkzaamheid', 'namaakhorloges', 'opmaakprogramma'].map((w) => ({ word: w, kind: 'derived', slot: 'noun-thing' }));
      const t = withBlock(wide, { bankRowsMax: 9, perWall: 5 });   // the composer's own guard lifted: the RENDER check must catch it
      await rp('PR7 a 4-row bank', t, /bank wraps to 4 rows|takes 4 rows/, { assert: true });
    }
    { let m = null; try { TYPE._buildWith(banks.en, { ...TYPE.difficulty[2], mode: 'root-word' }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } judge('PR8 a face mode on the base config (without the face keys)', m ? [m] : [], /root-word config is missing its own key/); }
    {
      // PS: the SPARSE poison — the walls row neither grows nor stretches, the page spreads its blocks apart
      const t = doctored((h) => h.replace('justify-content:flex-start;gap:14px', 'justify-content:space-between;gap:14px').replace(/flex:1 1 auto;min-height:\d+px;max-height:\d+px/, 'flex:0 0 auto'));
      await rp('PS blocks spread apart (sparse)', t, /SPARSE — \d+ px blank band bank -> walls/, { assert: true, strings: LONG.c814 });
    }
    // 5. FACES (Phase E) — qa/b5-word-parts-faces.js
    const faceRows = await faceGate({ page, ok, judge, validateBank, quick, OUT });
    for (const r of faceRows) console.log(r);
  } finally { await browser.close(); }

  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank };
