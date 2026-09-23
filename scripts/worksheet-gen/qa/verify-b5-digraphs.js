#!/usr/bin/env node
/**
 * verify-b5-digraphs.js — the G1-380 `digraphs` family gate (design
 * docs/worksheet-gen/b5-designs/G1-380-digraphs.md §5; the nt10-E build brief deliverable 4).
 * BASE build (2026-09-23): the face renders / face poisons (PR1-PR3, PR6-PR10) join in
 * Phase 2 with the faces.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-digraphs.js [--quick]
 *
 * 0. the primitive's render-measuring gate (qa/verify-team-bead.js) must PASS.
 * 1. BANK — validateBank(block, loc) (exported; tools/validate-b5-draft.js calls it for
 *    every panel draft): §5 rules 1-13 (rule 6 reported as the print-face pool size).
 * 2. REFUSALS — es / it / sv / da / no THROW in the spec (with or without a block); an
 *    unauthored shipping locale (de) THROWS; a block carrying `refused` THROWS.
 * 3. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts): d1/d2/d3
 *    en, then d2 under the 722 chrome (3-line title + 3-line instruction, de lengths) AND
 *    the 677 chrome (4-line fi title); asserts verify() empty, qa/lints.js clean and the
 *    floors ITSELF (no size lint exists): row beads 76x44 / 26 px, key beads 92x52 / 32,
 *    pictures 60 in 68 caps, numerals >= 14; SPARSE (no blank band > 40 px between rows);
 *    the body height per chrome.
 * 4. ANSWER TELLS on the SHIPPED instance, per page: a node sweep of 400 seeds proves every
 *    page has each column answering 2-3 wires, no run > 2, no staircase, no column on wires
 *    1-3, and no wire POSITION whose answer column is fixed across seeds (share <= 0.6);
 *    20 (--quick 5) seeds render distinct, verify-clean pages.
 * 5. POISON — each must FAIL for its OWN reason (no fail = SILENT, another fail = WRONG
 *    REASON; either exits 1); the correct EN bank is the control. Design §5 P1-P19 (the
 *    face-only P14 position / P15-P16 sentence poisons run against the data rules, which the
 *    base bank already carries) + the base render poisons PR4 PR5 + PR-SPARSE (both ways)
 *    + PR-col (a bead off its column) + PR-rail (a wire short of a rail) + PR-word (a
 *    printed word) + PR-foil (a wire holding a foil sound).
 */
'use strict';
const path = require('path');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng } = require('../lib/rng.js');
const { approvedWords } = require('../lib/b5-common.js');
const { bank: b3bank } = require('../lib/b3-common.js');
const { hasPicture } = require('../lib/b3-picture-index.js');
const freeClaim = require('../../lib/free-claim.js');
const bankMod = require('../data/b5/digraphs.js');
const beadGate = require('./verify-team-bead.js');
const TYPE = require('../types/g1/G1-380-digraphs.js');

const OUT = path.join(__dirname, '..', 'out', 'dev', 'G1-380-gate');
const N = bankMod.DIGRAPHS_NEUTRAL;
const H = TYPE._helpers;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|werkblad|arbetsblad|arbejdsark|arbeidsark|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/i;
/** The locale's G1-311 phrasing (design §5 rule 13) + the per-locale title bans. */
const TITLE_BANS = {
  en: [/sound of the week/i], es: [/un solo sonido/i], pt: [/um som só/i, /encontro consonantal/i], sv: [/två bokstäver/i], da: [/én lyd/i], no: [/én lyd/i],
  fr: [/syllabe/i, /(?<!\p{L})fiche/iu], de: [/buchstabenverbindung/i], nl: [], fi: [/sukupuu/i], it: [],
};
/** A bead noun must never name the apparatus (pt "conta" is also a sum). */
const BEAD_NOUN = /(?<!\p{L})(beads?|perlen?|perle|conta|contas|perles?|kraal|kralen|helmi|helmet|helmiä)(?!\p{L})/iu;
const FACE_MODES = ['sort-two', 'gap', 'match', 'position', 'text'];
/** §5 rule 13, en source: instruction must / must-not per face. */
const INSTR_EN = {
  base: { ban: [/write/i, /(?<!\p{L})lines?(?!\p{L})/iu] },
  'sort-two': { must: [/(?<!\p{L})line(?!\p{L})/iu] },
  gap: { must: [/dashed space/i] },
  match: { must: [/(?<!\p{L})line(?!\p{L})/iu] },
  position: { must: [/beginning/i, /middle/i, /(?<!\p{L})end(?!\p{L})/iu] },
  text: { must: [/(?<!\p{L})box(?!\p{L})/iu] },
};
const BW = /(^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s|\d|$)/i;

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const fold = (s) => String(s).normalize('NFC').toLowerCase();

/** owned teams, derived at run time (never typed): spelling-rules cands + syllable-reading blends / complex onsets. */
function ownedFor(loc) {
  const owned = new Set(), blends = new Set();
  try { const s = b3bank('spelling-rules', loc); for (const r of Object.values(s.rules || {})) for (const c of r.cands || []) if (c.length >= 2) owned.add(fold(c)); } catch (e) { /* no bank */ }
  try {
    const y = b3bank('syllable-reading', loc);
    for (const b of y.blends || []) blends.add(fold(b));
    for (const u of y.complexUnits || []) for (const w of u.words || []) { const m = /^[^aeiouyäöüåæøéèêàâîôûáíóúãõ]{2,}/i.exec(w.unit || ''); if (m) blends.add(fold(m[0])); }
  } catch (e) { /* no bank */ }
  return { owned, blends };
}
function positionOf(item) {
  const silent = new Set(item.silent || []);
  const kept = item.seg.map((g, i) => ({ g: fold(g), i })).filter((x) => !silent.has(x.i));
  const t = fold(item._team);
  const at = kept.findIndex((x) => x.g === t);
  if (at < 0 || kept.length < 2) return null;
  return at === 0 ? 'beginning' : at === kept.length - 1 ? 'end' : 'middle';
}

/* ---------------------------------------------------------------- 1. bank */
function validateBank(b, loc) {
  const f = [];
  const push = (m) => f.push(`${loc}: ${m}`);
  if (!b || typeof b !== 'object') return [`${loc}: no block`];
  const refusedLoc = N.REFUSED_LOCALES.includes(loc);
  const teams = b.teams || {};
  const nItems = Object.values(teams).reduce((a, t) => a + ((t && t.items) || []).length, 0);
  if (refusedLoc) {
    if (!b.refused || !b.refused.reason) push(`is REFUSED whole-family (design §1) but the block carries no refused {reason} (rule 9)`);
    if (nItems) push(`is REFUSED whole-family but the block carries ${nItems} items (rule 9)`);
    return f;
  }
  if (b.refused) { if (nItems) push(`refused but carries ${nItems} items (rule 9)`); return f; }
  const phon = new Set(b.phonemes || []);
  if (!phon.size) push('no phonemes list (rule 2)');
  let approved = null;
  try { approved = new Map(approvedWords(loc).map((e) => [e.key, e.word])); } catch (e) { push(`no approved-words list (${e.message})`); }
  const rejected = new Set([...N.REJECTED_PICS_ALL, ...(b.rejectedPics || []).map((r) => (typeof r === 'string' ? r : r.pic))]);
  const { owned, blends } = ownedFor(loc);
  // per item: rules 1, 2, 3, 7
  const falseByTeam = {};
  for (const fp of b.falsePairs || []) (falseByTeam[fold(fp.letters)] = falseByTeam[fold(fp.letters)] || new Set()).add(fold(fp.word));
  for (const [t, tb] of Object.entries(teams)) {
    if (!tb || tb.t !== t) push(`team ${t}: t ≠ its key`);
    if (!Array.isArray(tb.sound) || !tb.sound.length) push(`team ${t}: no sound`);
    for (const s of tb.sound || []) if (!phon.has(s)) push(`team ${t}: sound /${s}/ ∉ phonemes (rule 2)`);
    if (owned.has(fold(t))) push(`team ${t} is owned by spelling-rules (rule 4)`);
    if (blends.has(fold(t))) push(`team ${t} is a blend owned by syllable-reading (two sounds; rule 4)`);
    for (const it of tb.items || []) {
      const w = `${t} item ${it.word}`;
      const pic = `${it.theme}/${it.noun}`;
      if (approved && approved.get(it.vocabKey) !== it.word) push(`${w}: vocabKey "${it.vocabKey}" is not approved with word "${it.word}" (rule 1)`);
      if (!hasPicture(it.vocabKey, loc)) push(`${w}: no colour picture for "${it.vocabKey}" (rule 1)`);
      if (BW.test(it.theme)) push(`${w}: a B&W theme "${it.theme}" (rule 1)`);
      if (it.picOpened !== true) push(`${w}: picOpened is not true (rule 1)`);
      if (rejected.has(pic)) push(`${w}: ${pic} is a rejected picture (rule 1)`);
      if (!Array.isArray(it.seg) || !Array.isArray(it.snd)) { push(`${w}: no seg / snd (rule 2)`); continue; }
      if (fold(it.seg.join('')) !== fold(it.word)) push(`${w}: seg "${it.seg.join('|')}" does not spell the word (rule 2)`);
      if (it.snd.length !== it.seg.length) push(`${w}: snd ${it.snd.length} ≠ seg ${it.seg.length} (rule 2)`);
      for (const s of it.snd) if (!phon.has(s)) push(`${w}: /${s}/ ∉ phonemes (rule 2)`);
      const at = it.seg.map((g, i) => (fold(g) === fold(t) ? i : -1)).filter((i) => i >= 0);
      if (at.length !== 1) push(`${w}: the team ${t} is an element of seg ${at.length} times (want exactly once; rule 3)`);
      else if (!(tb.sound || []).includes(it.snd[at[0]])) push(`${w}: the ${t} element sounds /${it.snd[at[0]]}/ ∉ ${t}.sound [${tb.sound}] (rule 3)`);
      if (falseByTeam[fold(t)] && falseByTeam[fold(t)].has(fold(it.word))) push(`${w}: a falsePair of ${t} used as a ${t} item (rule 7)`);
      if (it.position) { const p = positionOf({ ...it, _team: t }); if (p !== it.position) push(`${w}: stored position "${it.position}" ≠ derived "${p}" from seg minus silent (rule 11)`); }
    }
  }
  const sets = b.sets || {};
  for (const k of ['exemplar', 'k', 'position']) {
    const s = sets[k];
    if (!Array.isArray(s)) { if (!(k === 'position' && (N.FACE_REFUSALS[loc] || []).includes('position'))) push(`sets.${k} missing`); continue; }
    if (s.length !== (k === 'k' ? 2 : 3)) push(`sets.${k} has ${s.length} teams`);
    for (const t of s) if (!teams[t]) push(`sets.${k} names an unknown team "${t}"`);
    // rule 8: samesound
    for (const grp of b.samesound || []) if (grp.filter((x) => s.includes(x)).length > 1) push(`sets.${k} carries two spellings of one sound [${grp.filter((x) => s.includes(x))}] (rule 8)`);
    // rule 5 + rule 9 per set
    const sounds = Object.fromEntries(s.filter((t) => teams[t]).map((t) => [t, teams[t].sound]));
    for (const t of s) {
      if (!teams[t]) continue;
      const valid = [];
      for (const it of teams[t].items || []) {
        const why = H.itemFitsPage(it, t, s, sounds);
        if (why) push(`sets.${k} [${s}]: ${why} (rule 5)`);
        else valid.push(it);
      }
      const clean = valid.filter((it) => !rejected.has(`${it.theme}/${it.noun}`) && it.picOpened === true && hasPicture(it.vocabKey, loc));
      const stems = new Set(clean.map((it) => it.stem || it.word));
      if (stems.size < 6) push(`sets.${k}: team ${t} has ${stems.size} valid stems after rules 1-8 (< 6; rule 9 — refuse the locale or face)`);
    }
  }
  if ((b.falsePairs || []).length < 6) push(`falsePairs has ${(b.falsePairs || []).length} entries (< 6; rule 7)`);
  // rule 6 + 10: the F2 / F3 print pool (foil letters outside a team element; F2 frame uniqueness + capital rule)
  const ex = sets.exemplar || [];
  const allWords = approved ? new Set([...approved.values()].map(fold)) : new Set();
  for (const t of ex) {
    if (!teams[t]) continue;
    let gap = 0;
    for (const it of teams[t].items || []) {
      const j = it.seg.findIndex((g) => fold(g) === fold(t));
      const outside = it.seg.map((g, i) => (i === j ? '|' : fold(g))).join('');
      if (ex.some((f) => f !== t && outside.includes(fold(f)))) continue;                 // rule 6
      if (j === 0 && /^\p{Lu}/u.test(it.word)) continue;                                   // capital rule
      if (ex.some((f) => f !== t && allWords.has(fold(it.seg.map((g, i) => (i === j ? f : g)).join(''))))) continue;   // rule 10 frame
      gap++;
    }
    if (gap < 3) push(`F2: team ${t} has ${gap} gap-eligible items (< 3; rule 10)`);
  }
  // rule 11: F4 positions
  if (!(N.FACE_REFUSALS[loc] || []).includes('position') && Array.isArray(sets.position)) {
    const pos = { beginning: 0, middle: 0, end: 0 };
    for (const t of sets.position) for (const it of (teams[t] && teams[t].items) || []) { const p = positionOf({ ...it, _team: t }); if (p) pos[p]++; }
    for (const [p, n] of Object.entries(pos)) if (n < 3) push(`F4: position "${p}" reached by ${n} items (< 3; rule 11 — refuse F4 for ${loc})`);
  }
  // rule 12: F5 sentences
  const sents = b.sentences || [];
  if (sents.length < 6) push(`${sents.length} sentences (< 6; rule 12)`);
  const target = ex[0];
  const hits = sents.map((s) => {
    const tg = fold(s.target || target);
    if (tg !== fold(target)) push(`sentence ${s.id}: target "${s.target}" ≠ sets.exemplar[0] "${target}" (rule 12)`);
    let n = 0;
    for (const tk of s.tokens || []) {
      if (fold(tk.seg.join('')) !== fold(tk.w)) push(`sentence ${s.id}: token "${tk.w}" seg does not spell it (rule 12)`);
      for (const g of tk.seg) { const G = fold(g); if (G === tg) n++; else if (G.includes(tg)) push(`sentence ${s.id}: the target "${tg}" is a proper substring of the element "${g}" in "${tk.w}" (rule 12)`); }
    }
    const words = String(s.text).split(/[^\p{L}'’-]+/u).filter(Boolean);
    if (words.join(' ') !== (s.tokens || []).map((x) => x.w).join(' ')) push(`sentence ${s.id}: tokens ≠ the words of its text (rule 12)`);
    if (s.hits !== n) push(`sentence ${s.id}: claims ${s.hits} hits, its seg holds ${n} (rule 12)`);
    if (n < 1 || n > 4) push(`sentence ${s.id}: ${n} hits outside 1-4 (rule 12)`);
    return n;
  });
  for (let i = 0; i + 2 < hits.length; i++) { const sum = hits[i] + hits[i + 1] + hits[i + 2]; if (sum < 5 || sum > 8) push(`sentences ${i + 1}-${i + 3} total ${sum} hits (outside 5-8; rule 12)`); }
  // rule 13: strings
  const S = b.strings || {};
  const want = ['base', ...FACE_MODES.filter((m) => !(N.FACE_REFUSALS[loc] || []).includes(m))];
  if (Object.keys(S).sort().join() !== want.slice().sort().join()) push(`strings ids [${Object.keys(S)}] ≠ [${want}] (rule 13)`);
  const seen = new Set();
  for (const id of want) {
    const s = S[id]; if (!s) continue;
    const t = s.title || '', ins = s.instruction || '';
    if (!t || t.length > 70) push(`strings.${id} title length ${t.length} (1..70, rule 13)`);
    if (WORKSHEET_WORD.test(t)) push(`strings.${id} title carries a worksheet word (rule 13)`);
    for (const re of TITLE_BANS[loc] || []) if (re.test(t)) push(`strings.${id} title "${t}" uses a banned phrase ${re} (G1-311 phrasing / register; rule 13)`);
    if (!ins || ins.length > 150) push(`strings.${id} instruction length ${ins.length} (1..150, rule 13)`);
    if (!/[.!?。]$/.test(ins.trim())) push(`strings.${id} instruction has no end mark (rule 13)`);
    for (const x of [t, ins]) { const h = freeClaim.hit(x); if (h) push(`strings.${id} claims free ("${h}", rule 13)`); if (ANSWERS_WORD.test(x)) push(`strings.${id} promises answers (rule 13)`); if (BEAD_NOUN.test(x)) push(`strings.${id} names a bead noun "${x.match(BEAD_NOUN)[0]}" (rule 13)`); }
    if (loc === 'en') {
      for (const re of (INSTR_EN[id] && INSTR_EN[id].ban) || []) if (re.test(ins)) push(`strings.${id} instruction names "${ins.match(re)[0]}" — not apparatus of this face (rule 13)`);
      for (const re of (INSTR_EN[id] && INSTR_EN[id].must) || []) if (!re.test(ins)) push(`strings.${id} instruction lacks ${re} (rule 13)`);
    }
    const k = fold(t); if (seen.has(k)) push(`strings.${id} repeats another face's title (rule 13)`); seen.add(k);
  }
  return f;
}

/* ---------------------------------------------------------------- 3. render */
async function renderWith(page, type, { difficulty = 2, baseName, strings, seedEpoch, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="digraphs"]');
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot'), head = document.querySelector('.ws-head');
    const q = (s) => (root ? [...root.querySelectorAll(s)] : []);
    const rows = q('[data-lcs-wire]');
    const blocks = rows.map((w) => { const els = [...w.querySelectorAll('[data-lcs-cap], [data-lcs-bead]')]; return { top: Math.min(...els.map((e) => e.getBoundingClientRect().top)), bottom: Math.max(...els.map((e) => e.getBoundingClientRect().bottom)) }; });
    let gap = 0; for (let i = 1; i < blocks.length; i++) gap = Math.max(gap, blocks[i].top - blocks[i - 1].bottom);
    const ab = root && root.querySelector('[data-lcs-abacus]');
    return {
      body: body ? rect(body) : null, headH: head ? rect(head).h : 0, foot: foot ? rect(foot).top : 0,
      abacus: ab ? rect(ab) : null,
      beads: q('[data-lcs-bead] svg').map((s) => ({ ...rect(s), px: parseFloat(s.querySelector('text').getAttribute('font-size')) })),
      keys: q('[data-lcs-keybead] svg').map((s) => ({ ...rect(s), px: parseFloat(s.querySelector('text').getAttribute('font-size')) })),
      pics: q('img[data-lcs-pic]').map((i) => rect(i)), caps: q('[data-lcs-cap]').map((c) => rect(c)),
      nums: q('[data-lcs-wire-n]').map((n) => parseFloat(getComputedStyle(n).fontSize)),
      rowGap: gap, wires: rows.length,
      cols: rows.map((w) => +w.dataset.lcsAnswerCol).join(','), items: rows.map((w) => w.dataset.lcsKey).join(','),
    };
  });
  return { out, m, verify: out.qa.verify, lints: out.qa.lints };
}
function assertRender(name, r, d, { body } = {}) {
  ok(!r.verify.length, `${name}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
  ok(!r.lints.length, `${name}: lints ${JSON.stringify(r.lints.slice(0, 4))}`);
  const m = r.m;
  ok(m.wires === d.wires, `${name}: ${m.wires} wires ≠ ${d.wires}`);
  ok(m.beads.length === d.wires * d.teams && m.beads.every((b) => Math.abs(b.w - d.bead.w) < 0.6 && Math.abs(b.h - d.bead.h) < 0.6 && b.h >= 44 && b.px >= 26), `${name}: row beads not all ${d.bead.w}x${d.bead.h} / >= 26 px (G1 floors 44 / 26)`);
  ok(m.keys.length === d.teams && m.keys.every((b) => Math.abs(b.w - d.keyBead.w) < 0.6 && Math.abs(b.h - d.keyBead.h) < 0.6 && b.px >= d.keyBead.fontPx), `${name}: key beads not ${d.keyBead.w}x${d.keyBead.h}`);
  ok(m.pics.length === d.wires && m.pics.every((p) => p.w >= d.iconPx - 0.6 && p.h >= d.iconPx - 0.6 && p.w >= 44), `${name}: a picture under ${d.iconPx} px`);
  ok(m.caps.every((c) => Math.abs(c.w - d.capPx) < 0.6), `${name}: a cap ≠ ${d.capPx}`);
  ok(m.nums.every((x) => x >= 14), `${name}: a numeral under 14 px`);
  ok(m.rowGap <= H.SPARSE_MAX + 0.5, `${name}: SPARSE — ${m.rowGap.toFixed(1)} px blank band between rows (> ${H.SPARSE_MAX})`);
  ok(m.abacus && m.abacus.bottom <= m.foot + 0.6, `${name}: the abacus reaches the footer`);
  if (body) ok(m.body.h <= body + 0.6, `${name}: body ${m.body.h.toFixed(0)} px — the fixture did not squeeze it to <= ${body}`);
}
const LONG = {
  de: { title: 'Wörter mit sch, ch und au: Welche Buchstabengruppe hörst du in jedem einzelnen Bild auf dieser Seite?', instruction: 'Sprich den Namen von jedem Bild langsam und deutlich aus. Kreise danach auf derselben Reihe genau die eine Buchstabengruppe ein, die du in dem gesprochenen Wort hörst, und prüfe am Ende jede Reihe noch einmal.', body: 722 },
  fi: { title: 'Pitkä vokaali aa, uu ja ää: mikä pitkä vokaali kuuluu kuvan sanassa, kun sanot sen ääneen hitaasti ja tarkasti omalla äänelläsi?', instruction: 'Sano jokaisen kuvan nimi ääneen hitaasti ja selvästi. Ympyröi samalta riviltä se pitkä vokaali, jonka kuulet sanassa.', body: 677 },
};

async function main() {
  const quick = process.argv.includes('--quick');
  freeClaim.selfTest();
  const EN = bankMod.DIGRAPHS.en;
  // 0. primitive gate
  { const before = console.log; const lines = []; console.log = (...a) => lines.push(a.join(' ')); let p = false; try { p = await beadGate.main(); } finally { console.log = before; } ok(p, 'qa/verify-team-bead.js FAILED:\n    ' + lines.slice(-6).join('\n    ')); console.log('team-bead gate: ' + (lines.find((l) => /^(PASS|FAIL)/.test(l)) || '?')); }
  // 1. bank
  for (const loc of Object.keys(bankMod.DIGRAPHS)) { const bf = validateBank(bankMod.DIGRAPHS[loc], loc); bf.forEach((x) => ok(false, x)); console.log(`bank ${loc}: ${bf.length} findings`); }
  ok(EN.strings.base.title === TYPE.i18n.en.title && EN.strings.base.instruction === TYPE.i18n.en.instruction, 'the bank\'s base strings ≠ the spec\'s i18n.en');
  {
    const ex = EN.sets.exemplar;
    console.log('en pool per team: ' + ex.map((t) => `${t} ${EN.teams[t].items.length} items / ${new Set(EN.teams[t].items.map((i) => i.stem)).size} stems`).join(' · '));
  }
  // 2. refusals
  for (const loc of N.REFUSED_LOCALES) { let m = null; try { TYPE.build({ difficulty: 2, locale: loc }, { rng: makeRng('r') }); } catch (e) { m = e.message; } ok(m && /REFUSED whole-family/.test(m), `${loc} must REFUSE (got ${m})`); }
  { let m = null; try { TYPE.build({ difficulty: 2, locale: 'de' }, { rng: makeRng('r') }); } catch (e) { m = e.message; } ok(m && /no de block|refuse/.test(m), `an unauthored de must REFUSE (got ${m})`); }
  { let m = null; try { TYPE._buildWith({ ...EN, refused: { reason: 'test' } }, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('r') }); } catch (e) { m = e.message; } ok(m && /REFUSED/.test(m), `a refused block must REFUSE (got ${m})`); }
  { let m = null; try { TYPE._buildWith(EN, { ...TYPE.difficulty[2], mode: 'gap' }, { locale: 'en' }, { rng: makeRng('r') }); } catch (e) { m = e.message; } ok(m && /Phase-2 face/.test(m), `a face mode must refuse until built (got ${m})`); }
  // 4. node sweep: answer tells on the shipped instance, per page
  {
    let tells = 0, colFail = 0; const posCols = Array.from({ length: 8 }, () => [0, 0, 0]); const pages = new Set();
    for (let s = 1; s <= 400; s++) {
      const r = TYPE._buildWith(EN, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('G1-380-sweep-' + s) });
      if (H.orderTell(r.meta.cols, 3, 2)) tells++;
      const per = [0, 1, 2].map((j) => r.meta.cols.filter((c) => c === j).length);
      if (per.some((c) => c < 2 || c > 3)) colFail++;
      r.meta.cols.forEach((c, i) => posCols[i][c]++);
      pages.add(r.meta.items.join());
    }
    const maxShare = Math.max(...posCols.map((p) => Math.max(...p) / 400));
    ok(tells === 0, `node sweep: ${tells} pages with a column tell`); ok(colFail === 0, `node sweep: ${colFail} pages with a column outside [2,3]`);
    ok(maxShare <= 0.6, `node sweep: a wire position answers one column in ${(maxShare * 100).toFixed(0)}% of pages (> 60%)`);
    ok(pages.size >= 390, `node sweep: only ${pages.size} distinct item sets in 400 seeds`);
    console.log(`node sweep 400 seeds: tells ${tells}, column-count fails ${colFail}, max per-position column share ${(maxShare * 100).toFixed(0)}%, distinct pages ${pages.size}`);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  try {
    // 3. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-380-gate-d${d}-en` });
      assertRender(`d${d}`, r, TYPE.difficulty[d]);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} abacus ${r.m.abacus.h.toFixed(0)} max row gap ${r.m.rowGap.toFixed(1)} cols ${r.m.cols}`);
    }
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-380-gate-d2-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d2 long chrome ${k}`, r, TYPE.difficulty[2], { body: LONG[k].body });
      console.log(`render d2 long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} (head ${r.m.headH.toFixed(0)}) abacus ${r.m.abacus.h.toFixed(0)} max row gap ${r.m.rowGap.toFixed(1)}`);
    }
    // sweep
    const pages = new Set();
    for (let s = 1; s <= (quick ? 5 : 20); s++) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `G1-380-gate-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      pages.add(r.m.items + '/' + r.m.cols);
    }
    ok(pages.size === (quick ? 5 : 20), `sweep: ${pages.size} distinct pages of ${quick ? 5 : 20}`);
    console.log(`sweep: ${pages.size} distinct pages`);

    // 5. poisons — data
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const en = () => clone(EN);
    const withItem = (b, t, it) => { b.teams[t].items.push({ silent: [], picOpened: true, stem: it.word, ...it }); return b; };
    const ctl = validateBank(EN, 'en'); log.push(`  control en: ${ctl.length} findings`); ok(!ctl.length, 'the EN control must be clean');
    judge('P1 grasshopper as sh', validateBank(withItem(en(), 'sh', { vocabKey: 'grasshopper', theme: 'forest creatures', noun: 'grasshopper', word: 'grasshopper', seg: 'g|r|a|s|sh|o|pp|er'.split('|'), snd: 'g|r|ɑː|s|ʃ|ɒ|p|ə'.split('|') }), 'en'), /grasshopper: a falsePair of sh/);
    judge('P4 chef as ch', validateBank(withItem(en(), 'ch', { vocabKey: 'chef', theme: 'occupations', noun: 'chef', word: 'chef', seg: ['ch', 'e', 'f'], snd: ['ʃ', 'ɛ', 'f'] }), 'en'), /chef: the ch element sounds \/ʃ\//);
    judge('P5 toothbrush on a th + sh page', validateBank(withItem(en(), 'th', { vocabKey: 'toothbrush', theme: 'around the house', noun: 'toothbrush', word: 'toothbrush', seg: 't|oo|th|b|r|u|sh'.split('|'), snd: 't|uː|θ|b|r|ʌ|ʃ'.split('|') }), 'en'), /toothbrush: page teams in seg \[sh,th\].*rule 5/);
    judge('P12 st as a team', validateBank((() => { const b = en(); b.teams.st = { t: 'st', sound: ['s'], items: [] }; return b; })(), 'en'), /team st is a blend/);
    judge('P17 picOpened false', validateBank((() => { const b = en(); b.teams.sh.items[0].picOpened = false; return b; })(), 'en'), /ship: picOpened is not true/);
    judge('P18 fruits/cherry as ch', validateBank(withItem(en(), 'ch', { vocabKey: 'cherry', theme: 'fruits', noun: 'cherry', word: 'cherry', seg: 'ch|e|rr|y'.split('|'), snd: 'tʃ|ɛ|r|i'.split('|') }), 'en'), /fruits\/cherry is a rejected picture/);
    // synthetic locale blocks (a minimal draft carrying ONLY the defect under test)
    const mini = (loc, teams, extra = {}) => ({ head: 'x', refused: null, phonemes: extra.phonemes, teams, samesound: [], falsePairs: [], sets: extra.sets, sentences: extra.sentences || [], rejectedPics: [], strings: {}, ...extra });
    const DE_PH = ['ʃ', 'ç', 'x', 'aʊ', 'ks', 'f', 'ʊ', 's', 't', 'ɛ', 'r', 'n', 'h', 'ɛː', 'ə', 'a', 'uː', 'l', 'eː'];
    const deTeams = (items) => ({ sch: { t: 'sch', sound: ['ʃ'], items: items.sch || [] }, ch: { t: 'ch', sound: ['ç', 'x'], items: items.ch || [] }, au: { t: 'au', sound: ['aʊ'], items: items.au || [] } });
    const deSets = { exemplar: ['sch', 'ch', 'au'], k: ['sch', 'au'], position: ['sch', 'ch', 'au'] };
    judge('P2 de Häschen as sch', validateBank(mini('de', deTeams({ sch: [{ vocabKey: 'bunny', theme: 'easter', noun: 'bunny', word: 'Häschen', seg: ['H', 'ä', 'sch', 'e', 'n'], snd: ['h', 'ɛː', 'ʃ', 'ə', 'n'], silent: [], stem: 'Häschen', picOpened: true }] }), { phonemes: DE_PH, sets: deSets, falsePairs: [{ word: 'Häschen', letters: 'sch', why: 'Häs-chen' }] }), 'de'), /Häschen: a falsePair of sch/);
    judge('P3 de Fuchs as ch', validateBank(mini('de', deTeams({ ch: [{ vocabKey: 'fox', theme: 'forest creatures', noun: 'fox', word: 'Fuchs', seg: ['F', 'u', 'chs'], snd: ['f', 'ʊ', 'ks'], silent: [], stem: 'Fuchs', picOpened: true }] }), { phonemes: DE_PH, sets: deSets }), 'de'), /Fuchs: the team ch is an element of seg 0 times/);
    judge('P6 de Stern as au on a sch page', validateBank(mini('de', deTeams({ au: [{ vocabKey: 'star', theme: 'space', noun: 'star', word: 'Stern', seg: ['S', 't', 'e', 'r', 'n'], snd: ['ʃ', 't', 'ɛ', 'r', 'n'], silent: [], stem: 'Stern', picOpened: true }] }), { phonemes: DE_PH, sets: deSets }), 'de'), /Stern: (page teams in seg|holds the foil team sch's sound \/ʃ\/)/);
    judge('P11 de ie as a team', validateBank(mini('de', { ...deTeams({}), ie: { t: 'ie', sound: ['iː'], items: [] } }, { phonemes: [...DE_PH, 'iː'], sets: deSets }), 'de'), /team ie is owned by spelling-rules/);
    const PT_PH = ['k', 'a', 'm', 'ɲ', 'ɐ̃w̃', 'ʎ', 'i', 'ɐ'];
    judge('P7 pt caminhão as nh on a qu page', validateBank(mini('pt', { nh: { t: 'nh', sound: ['ɲ'], items: [{ vocabKey: 'truck', theme: 'vehicles', noun: 'truck', word: 'caminhão', seg: ['c', 'a', 'm', 'i', 'nh', 'ão'], snd: ['k', 'a', 'm', 'i', 'ɲ', 'ɐ̃w̃'], silent: [], stem: 'caminhão', picOpened: true }] }, lh: { t: 'lh', sound: ['ʎ'], items: [] }, qu: { t: 'qu', sound: ['k'], items: [] } }, { phonemes: PT_PH, sets: { exemplar: ['nh', 'lh', 'qu'], k: ['nh', 'lh'] } }), 'pt'), /caminhão: holds the foil team qu's sound \/k\//);
    judge('P8 nl ou and au in one set', validateBank(mini('nl', { ou: { t: 'ou', sound: ['ʌu'], items: [] }, au: { t: 'au', sound: ['ʌu'], items: [] }, oe: { t: 'oe', sound: ['u'], items: [] } }, { phonemes: ['ʌu', 'u'], samesound: [['ou', 'au']], sets: { exemplar: ['ou', 'au', 'oe'], k: ['ou', 'oe'], position: ['ou', 'au', 'oe'] } }), 'nl'), /two spellings of one sound \[ou,au\]/);
    judge('P9 fr banane tagged an', validateBank(mini('fr', { an: { t: 'an', sound: ['ɑ̃'], items: [{ vocabKey: 'banana', theme: 'fruits', noun: 'banana', word: 'banane', seg: ['b', 'an', 'a', 'n', 'e'], snd: ['b', 'a', 'a', 'n', 'ə'], silent: [], stem: 'banane', picOpened: true }] }, ou: { t: 'ou', sound: ['u'], items: [] }, on: { t: 'on', sound: ['ɔ̃'], items: [] } }, { phonemes: ['b', 'a', 'n', 'ə', 'ɑ̃', 'u', 'ɔ̃'], sets: { exemplar: ['an', 'ou', 'on'], k: ['an', 'ou'], position: ['an', 'ou', 'on'] } }), 'fr'), /banane: the an element sounds \/a\//);
    judge('P10 es block with items, no refused', validateBank(mini('es', { ch: { t: 'ch', sound: ['tʃ'], items: [{ vocabKey: 'chocolate', theme: 'easter', noun: 'chocolate', word: 'chocolate', seg: ['ch', 'o'], snd: ['tʃ', 'o'], picOpened: true }] } }, { refused: null }), 'es'), /es: is REFUSED whole-family .*carries no refused/);
    judge('P13 fi jääkaappi on an ää + aa page', validateBank(mini('fi', { aa: { t: 'aa', sound: ['ɑː'], items: [] }, uu: { t: 'uu', sound: ['uː'], items: [] }, 'ää': { t: 'ää', sound: ['æː'], items: [{ vocabKey: 'refrigerator', theme: 'around the house', noun: 'refrigerator', word: 'jääkaappi', seg: ['j', 'ää', 'k', 'aa', 'pp', 'i'], snd: ['j', 'æː', 'k', 'ɑː', 'pː', 'i'], silent: [], stem: 'jääkaappi', picOpened: true }] } }, { phonemes: ['ɑː', 'uː', 'æː', 'j', 'k', 'pː', 'i'], sets: { exemplar: ['aa', 'uu', 'ää'], k: ['aa', 'uu'], position: ['aa', 'uu', 'ää'] } }), 'fi'), /jääkaappi: page teams in seg \[aa,ää\].*rule 5/);
    judge('P14 fr loup silent [] stored end', validateBank(mini('fr', { ou: { t: 'ou', sound: ['u'], items: [{ vocabKey: 'wolf', theme: 'forest creatures', noun: 'wolf', word: 'loup', seg: ['l', 'ou', 'p'], snd: ['l', 'u', 'p'], silent: [], position: 'end', stem: 'loup', picOpened: true }] }, on: { t: 'on', sound: ['ɔ̃'], items: [] }, oi: { t: 'oi', sound: ['wa'], items: [] } }, { phonemes: ['l', 'u', 'p', 'ɔ̃', 'wa'], sets: { exemplar: ['ou', 'on', 'oi'], k: ['ou', 'on'], position: ['ou', 'on', 'oi'] } }), 'fr'), /loup: stored position "end" ≠ derived "middle"/);
    judge('P15 F5 sentence claims 3 hits, seg holds 2', validateBank((() => { const b = en(); b.sentences[0].hits = 3; return b; })(), 'en'), /sentence s1: claims 3 hits, its seg holds 2/);
    judge('P16 de F5 target ch over Schule', validateBank(mini('de', deTeams({}), { phonemes: DE_PH, sets: { exemplar: ['ch', 'sch', 'au'], k: ['ch', 'au'], position: ['ch', 'sch', 'au'] }, sentences: [{ id: 'd1', text: 'Die Schule.', target: 'ch', hits: 0, tokens: [{ w: 'Die', seg: ['D', 'ie'] }, { w: 'Schule', seg: ['Sch', 'u', 'l', 'e'] }] }] }), 'de'), /target "ch" is a proper substring of the element "Sch"/);
    judge('P19 da hvid from colors/white', validateBank(mini('da', { hv: { t: 'hv', sound: ['v'], items: [{ vocabKey: 'white', theme: 'colors', noun: 'white', word: 'hvid', seg: ['hv', 'i', 'd'], snd: ['v', 'i', 'ð'], picOpened: true }] } }, { refused: null }), 'da'), /da: is REFUSED whole-family/);
    judge('P19b colors/white in a shipping bank', validateBank(withItem(en(), 'sh', { vocabKey: 'white', theme: 'colors', noun: 'white', word: 'white', seg: ['wh', 'i', 'te'], snd: ['w', 'aɪ', 't'] }), 'en'), /colors\/white is a rejected picture/);
    judge('P20 base instruction says "write"', validateBank((() => { const b = en(); b.strings.base.instruction = 'Say each picture. Write the letter team you hear.'; return b; })(), 'en'), /strings\.base instruction names "Write"/);
    judge('P21 G1-311 phrasing in a title', validateBank((() => { const b = en(); b.strings.match.title = 'Sound of the Week: sh ch th'; return b; })(), 'en'), /strings\.match title .* banned phrase/);
    judge('P22 a bead noun', validateBank((() => { const b = en(); b.strings.base.instruction = 'Say each picture. Circle the bead you hear.'; return b; })(), 'en'), /names a bead noun "bead"/);
    judge('P23 church (ch twice)', validateBank(withItem(en(), 'ch', { vocabKey: 'church', theme: 'christmas', noun: 'church', word: 'church', seg: ['ch', 'ur', 'ch'], snd: ['tʃ', 'ɜː', 'tʃ'] }), 'en'), /church: the team ch is an element of seg 2 times/);

    // 5. poisons — render
    const rp = async (name, type, re, opts = {}) => { const r = await renderWith(page, type, { difficulty: 2, baseName: 'G1-380-gate-poison-' + name.split(' ')[0], ...opts }); judge(name, [...r.verify, ...r.lints.map((l) => JSON.stringify(l)), ...(opts.extra ? opts.extra(r) : [])], re); return r; };
    const doctored = (fn, d = 2) => ({ ...TYPE, build(o, ctx) { const r = TYPE.build({ ...o, difficulty: d }, ctx); r.bodyHtml = fn(r.bodyHtml); return r; } });
    const withCfg = (extra) => ({ ...TYPE, build(o, ctx) { return this._buildWith(EN, { ...TYPE.difficulty[o.difficulty], ...extra }, { locale: 'en' }, ctx); } });
    await rp('PR4 row bead sized by team length', doctored((h) => h.replace(/(<div style="position:absolute;left:[\d.]+px;top:50%;margin-top:-22px;width:)76px(;height:44px;line-height:0" data-lcs-bead="sh")/, '$188px$2').replace(/(data-lcs-bead="sh" data-lcs-col="0"><svg [^>]*width=")76(")/, '$188$2')), /row beads must be identical/);
    await rp('PR5 staircase 0,1,2,0,1,2,0,1', withCfg({ forceCols: [0, 1, 2, 0, 1, 2, 0, 1] }), /staircase over >= 6 wires/);
    await rp('PR-col bead 3 px off its column', doctored((h) => h.replace(/(left:)([\d.]+)(px;top:50%;margin-top:-22px;width:76px;height:44px;line-height:0" data-lcs-bead="ch")/, (m, a, x, b) => a + (+x + 3) + b)), /sits 3\.00 px off its key column/);
    await rp('PR-rail a wire short of the rail', doctored((h) => h.replace('data-lcs-rowwire style="position:absolute;left:0;right:0', 'data-lcs-rowwire style="position:absolute;left:0;right:12px')), /not rail to rail/);
    await rp('PR-word a printed word', doctored((h) => h.replace(/(<div data-lcs-cap [^>]*>)/, '$1<span style="font-size:14px">ship</span>')), /text printed outside the numerals and beads/);
    await rp('PR-foil a wire holding a foil sound', doctored((h) => h.replace(/data-lcs-snd="([^"]*)"/, (m, s) => `data-lcs-snd="${s}|tʃ"`).replace(/data-lcs-seg="([^"]*)"/, (m, s) => `data-lcs-seg="${s}|"`)), /holds the foil team (sh|ch|th)'s sound/);
    // SPARSE both ways: d1 with the row ceiling removed stretches its six rows over the body
    const SHORT = { title: 'Digraphs', instruction: TYPE.i18n.en.instruction };   // a one-line chrome: the tallest body, where a stretch shows
    const unCapped = { ...TYPE, build(o, ctx) { const r = TYPE.build({ ...o, difficulty: 1 }, ctx); r.bodyHtml = r.bodyHtml.replace(/flex:0 1 \d+px;/, 'flex:1 1 auto;'); return r; } };
    await rp('PR-SPARSE d1 rows uncapped', unCapped, /SPARSE — [\d.]+ px blank band/, { difficulty: 1, strings: SHORT });
    { const c = await renderWith(page, TYPE, { difficulty: 1, baseName: 'G1-380-gate-sparse-control', strings: SHORT }); log.push(`  PR-SPARSE control: shipped d1 max row gap ${c.m.rowGap.toFixed(1)} px (<= ${H.SPARSE_MAX}), verify ${c.verify.length}`); ok(!c.verify.length && c.m.rowGap <= H.SPARSE_MAX + 0.5, 'SPARSE control must pass'); }
  } finally { await browser.close(); }

  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, ownedFor, positionOf };
