#!/usr/bin/env node
/**
 * verify-b6-story-sequencing.js — the K-379 `story-sequencing` family gate
 * (design docs/worksheet-gen/b6-designs/K-379-story-sequencing.md §5).
 *
 *   node scripts/worksheet-gen/qa/verify-b6-story-sequencing.js [--quick]
 *
 * Exports (tools/b6-probe-child.js calls validateBank(block, loc) for every
 * panel draft):
 *   validateStories(common)   §5 validator rules 1-8 over the locale-free story bank
 *   validateBank(block, loc)  rules 8-15 over one locale block (+ rules 1-7 on COMMON)
 * Each finding is prefixed with its rule ("r10: …") so every poison is judged on
 * its OWN reason.
 *
 * main():
 *   1. the EN block + COMMON validate clean (the control)
 *   2. bank poisons P1-P16 (each must FAIL on its own rule)
 *   3. build: every d, the pooled scramble census at 400 seeds (d2: rank-1 and
 *      rank-4 slot shares 25 % ± 6 pts in BOTH directions; every row obeys the law;
 *      the two rows differ in story / stage / objects / permutation / first slot);
 *      a non-en locale REFUSES (no block authored yet)
 *   4. render (render/render-instance.js, file:// fonts): d1 / d2 / d3 shipped seeds
 *      + d2 x 20 more seeds (skipped by --quick); the chrome stress at the 722 body
 *      (3-line title + a 150-char instruction) and the 677 body (a 4-line title);
 *      verify() empty, qa/lints.js clean, the floors measured HERE (qa/lints.js has
 *      no size lint): K cards >= 132 px wide at d2, tags >= 64 x 60, nothing under
 *      the footer, rows inside the lane
 *   5. render poisons PR1 (a 2341 rotation), PR3 (a tag carrying its numeral), PR11
 *      (an F1 config fed to the base build) + build poison PR2 (the derangement
 *      composer: pooled slot-1 share of rank 1 reads 0 % and FAILS the band)
 *   PR4 / PR5 / PR10 are the primitive's: qa/verify-b6-story-panel.js (run it too).
 *   PR6-PR9 are F2 / F4 face poisons: Phase E.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const { COMMON, STORY_SEQUENCING } = require('../data/b6/story-sequencing.js');
const SP = require('../primitives/story-panel.js');
const freeClaim = require('../../lib/free-claim.js');

const MODES = COMMON.MODES;
const SENT_POOL = COMMON.SENTENCE_POOL;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const STORY_WORD = {
  en: /(?<!\p{L})stor(?:y|ies)(?!\p{L})/iu, de: /bildergeschichte/iu, es: /cuento/iu, pt: /fatos|história/iu, fr: /séquentielles|histoire/iu,
  it: /(?<!\p{L})stori[ae](?!\p{L})/iu, nl: /verhaal/iu, sv: /bildserie|bildberättelse/iu, da: /billedserie|billedfortælling/iu,
  no: /bildeserie|bildefortelling/iu, fi: /kuvasarja|kuvakertomus/iu,
};
// nl (fix round 1, nl panel measured): "Verhaal op volgorde leggen" is the genre head; `volgorde` is bare only when
// `verhaal` is absent ANYWHERE in the title (the old lookahead accepted `verhaal` only AFTER `volgorde`).
const BARE_ORDER = [/^(story )?sequencing$/iu, /reihenfolge/iu, /^(?![\s\S]*verhaal)[\s\S]*(?<!\p{L})volgorde(?!\p{L})/iu, /sequência lógica/iu, /^sequenze$/iu, /^i rätt ordning/iu, /^remettre dans l'ordre$/iu];
const ANSWER_KEY = /answer key|with answers|mit lösung|con soluciones|com gabarito|avec corrigé|con soluzioni|met antwoorden|med facit|med svar|vastauksin/iu;
const RULE14_EN = {
  base: [/boxes?/i, /numbers?/i],
  'first-next-last-cut': [/(?<!\p{L})cut(?!\p{L})/iu, /glue/i],
  'what-happens-next': [/circle/i],
  'beginning-middle-end': [/draw/i, /middle/i],
  'sequencing-sentences': [/line/i, /sentence/i],
  'retell-with-starters': [/lines?/i, /word/i],
};
const nfc = (s) => String(s).normalize('NFC').toLowerCase();
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasWord = (text, w) => new RegExp('(?<!\\p{L})' + esc(nfc(w)) + '(?!\\p{L})', 'u').test(nfc(text));

/* ---------------------------------------------------------------- rules 1-8 (locale-free) */
function walkOps(ops, fn, inSet) { for (const op of ops) { fn(op, inSet); if (op.k === 'g') walkOps(op.children, fn, inSet); } }
function validateStories(common = COMMON) {
  const f = [];
  const IRR = new Set(common.IRREVERSIBLE);
  const ids = new Set();
  for (const s of common.stories) {
    const t = `story ${s.id}`;
    if (ids.has(s.id)) f.push(`r8: ${t} id repeats`); ids.add(s.id);
    if (!Array.isArray(s.objects) || !s.objects.length) f.push(`r8: ${t} has no objects`);
    const keys = Object.keys(s.panels[0].irr).sort().join(',');
    s.panels.forEach((p, i) => {
      if (p.rank !== i + 1) f.push(`r5: ${t} panel ${i} has rank ${p.rank}`);
      // rule 1
      if (Object.keys(p.irr).sort().join(',') !== keys) f.push(`r1: ${t}#${p.rank} irr keys ${Object.keys(p.irr)} ≠ ${keys}`);
      for (const [k, v] of Object.entries(p.irr)) {
        if (!IRR.has(k)) f.push(`r1: ${t}#${p.rank} variable ${k} is not in IRREVERSIBLE`);
        if (!Number.isInteger(v) || v < 0) f.push(`r1: ${t}#${p.rank} ${k} = ${v}`);
      }
      // rule 4
      const occ = p.occluded || {};
      for (const [k, v] of Object.entries(occ)) if (!(v <= (p.irr[k] || 0))) f.push(`r4: ${t}#${p.rank} occluded ${k} ${v} > irr ${p.irr[k]}`);
      if (Object.keys(occ).length && i > 0) {
        const prev = s.panels[i - 1].irr;
        if (!Object.keys(p.irr).some((k) => !(occ[k] > 0) && p.irr[k] > prev[k])) f.push(`r4: ${t}#${p.rank} occludes ${Object.keys(occ)} with no increase in a visible variable`);
      }
      // rules 6 + 7 on the ops
      walkOps(s.set, (op) => {
        if (common.FORBIDDEN_KINDS.includes(op.k)) f.push(`r6: ${t} set op kind ${op.k}`);
        if (op.k === 'g' || op.k === 'walker') { if (op.k === 'walker') f.push(`r7: ${t} a walker in the set`); return; }
        if (op.fill !== undefined && !common.SET_FILLS.includes(op.fill)) f.push(`r7: ${t} set fill ${op.fill}`);
        if (op.st !== undefined && (op.st !== 'grid' || op.sw !== 1.5)) f.push(`r7: ${t} set stroke ${op.st} ${op.sw}`);
        if (op.irr) f.push(`r7: ${t} a counted part in the set`);
      });
      walkOps(p.prop, (op) => {
        if (common.FORBIDDEN_KINDS.includes(op.k)) f.push(`r6: ${t}#${p.rank} op kind ${op.k}`);
        if (op.k !== 'g' && op.k !== 'walker') {
          if (op.fill !== undefined && !common.PROP_FILLS.includes(op.fill)) f.push(`r7: ${t}#${p.rank} prop fill ${op.fill}`);
          if (op.st !== undefined && !common.PROP_STROKES.includes(op.st)) f.push(`r7: ${t}#${p.rank} prop stroke ${op.st}`);
        }
        if (op.irr) {
          if (!(op.irr in p.irr)) f.push(`r7: ${t}#${p.rank} data-irr "${op.irr}" is not a declared variable`);
          const b = SP.opBBox(op);
          if (Math.min(b.w, b.h) < 8 - 1e-6) f.push(`r7: ${t}#${p.rank} a ${op.irr} carrier ${b.w.toFixed(1)} x ${b.h.toFixed(1)} units (< 8)`);
        }
      });
    });
    // rule 2 (strict chain) + 3 (distinct)
    for (let i = 1; i < s.panels.length; i++) {
      const a = s.panels[i - 1].irr, b = s.panels[i].irr;
      const dec = Object.keys(b).filter((k) => b[k] < a[k]);
      const inc = Object.keys(b).filter((k) => b[k] > a[k]);
      if (dec.length) f.push(`r2: ${t} ${i}->${i + 1} decreases ${dec.join(',')}`);
      if (!inc.length) f.push(`r2: ${t} ${i}->${i + 1} increases nothing`);
    }
    const vecs = s.panels.map((p) => JSON.stringify(Object.keys(p.irr).sort().map((k) => p.irr[k])));
    if (new Set(vecs).size !== vecs.length) f.push(`r3: ${t} two panels share an irr vector`);
    // rule 5
    const last = s.panels.length;
    for (const key of ['sub4', 'sub3', 'n5']) {
      const L = s[key];
      if (L == null) continue;
      const want = { sub4: 4, sub3: 3, n5: 5 }[key];
      if (!Array.isArray(L) || L.length !== want) { f.push(`r5: ${t} ${key} is not ${want} long`); continue; }
      if (L[0] !== 1 || L[L.length - 1] !== last) f.push(`r5: ${t} ${key} ${L.join('')} must start at 1 and end at ${last}`);
      for (let i = 1; i < L.length; i++) if (!(L[i] > L[i - 1])) f.push(`r5: ${t} ${key} ${L.join('')} is not strictly increasing`);
    }
    if (last === 3 && s.sub4) f.push(`r5: ${t} a 3-panel story carries sub4`);
    if (!Array.isArray(s.sub3)) f.push(`r5: ${t} has no sub3`);
    // rule 6
    for (const tg of s.tags || []) if (common.EXCLUDED_TAGS.includes(tg)) f.push(`r6: ${t} is tagged "${tg}" (excluded content)`);
  }
  return f;
}

/* ---------------------------------------------------------------- rules 8-15 (one locale) */
function poolFor(common, block, loc, mode) {
  const ex = new Set(block.excludeStories || []);
  return common.stories.filter((s) => (s.pools || []).includes(mode) && !ex.has(s.id) && !(s.excludeLocales || []).includes(loc));
}
function validateBank(block, loc, common = COMMON) {
  const f = validateStories(common);
  if (!block || typeof block !== 'object') return [...f, `r15: ${loc}: no block`];
  // rule 8 pools
  for (const m of MODES) {
    const pool = poolFor(common, block, loc, m);
    if (pool.length < 3) f.push(`r8: ${loc} ${m} pool has ${pool.length} stories (< 3)`);
    if (m === 'what-happens-next' && new Set(pool.map((s) => s.setKind)).size < 2) f.push(`r8: ${loc} F2 pool has one setKind (no other-story foil)`);
  }
  // rule 9
  for (const [k, n] of [['words3', 3], ['openers4', 4], ['starters4', 4], ['bme', 3]]) {
    const L = block[k];
    if (!Array.isArray(L) || L.length !== n) { f.push(`r9: ${loc} ${k} must hold ${n} literals`); continue; }
    if (L.some((x) => typeof x !== 'string' || !x.trim())) f.push(`r9: ${loc} ${k} has an empty literal`);
    if (new Set(L.map(nfc)).size !== n) f.push(`r9: ${loc} ${k} repeats a literal (${L.join(' | ')})`);
    if (L.some((x) => /[{}]/.test(x))) f.push(`r9: ${loc} ${k} carries a {slot}`);
  }
  // rules 10 + 11
  const long = ['de', 'fi', 'pt'].includes(loc) ? 96 : 80;
  const refusedSentences = [];
  for (const id of SENT_POOL) {
    if ((block.excludeStories || []).includes(id)) continue;
    const st = (block.stories || {})[id];
    if (!st) { f.push(`r10: ${loc} ${id}: no sentences`); continue; }
    const S = st.sentences, W = st.stateWords;
    if (!Array.isArray(S) || S.length !== 4) { f.push(`r10: ${loc} ${id}: ${S && S.length} sentences ≠ 4`); continue; }
    if (!Array.isArray(W) || W.length !== 4) { f.push(`r10: ${loc} ${id}: ${W && W.length} stateWords ≠ 4`); continue; }
    S.forEach((sen, k) => {
      const op = (block.openers4 || [])[k];
      if (!op || !sen.normalize('NFC').startsWith(op.normalize('NFC'))) f.push(`r10: ${loc} ${id} sentence ${k + 1} does not start with "${op}"`);
      if ([...sen].length > long) f.push(`r10: ${loc} ${id} sentence ${k + 1} is ${[...sen].length} chars (> ${long})`);
      if (!hasWord(sen, W[k])) f.push(`r10: ${loc} ${id} sentence ${k + 1} lacks its stateWord "${W[k]}"`);
      S.forEach((other, j) => { if (j !== k && hasWord(other, W[k])) f.push(`r10: ${loc} ${id} stateWord "${W[k]}" also fits sentence ${j + 1} (two pictures)`); });
    });
    const H = st.helpWords;
    if (!Array.isArray(H) || H.length < 4 || H.length > 6) f.push(`r11: ${loc} ${id}: ${H && H.length} helpWords (4-6)`);
    else if (new Set(H.map(nfc)).size !== H.length) f.push(`r11: ${loc} ${id}: a helpWord repeats`);
    // fix round 1: every bank word names a DRAWN part (cake "candles" once named nothing a child could see)
    const I = st.helpIds, parts = (common.PARTS || {})[id] || [];
    if (!Array.isArray(I) || !Array.isArray(H) || I.length !== H.length) f.push(`r11: ${loc} ${id}: helpIds must be parallel to helpWords (${I ? I.length : 'none'} vs ${H ? H.length : 'none'})`);
    else I.forEach((pid, k) => { if (!parts.includes(pid)) f.push(`r11: ${loc} ${id}: help word "${H[k]}" names "${pid}", which the story does not draw (PARTS: ${parts.join(', ')})`); });
  }
  void refusedSentences;
  // rules 12-15
  const strs = block.strings || {};
  const keys = Object.keys(strs).sort().join(',');
  if (keys !== MODES.slice().sort().join(',')) f.push(`r15: ${loc} strings keys ${keys} ≠ the 6 modes`);
  const titles = new Set();
  for (const m of MODES) {
    const x = strs[m];
    if (!x) continue;
    const title = String(x.title || '').trim(), ins = String(x.instruction || '').trim();
    if (!title || [...title].length > 70) f.push(`r12: ${loc} ${m} title is ${[...title].length} chars (1-70)`);
    if (WORKSHEET_WORD.test(title)) f.push(`r12: ${loc} ${m} title carries a worksheet-word`);
    if (titles.has(nfc(title))) f.push(`r12: ${loc} ${m} title repeats another face's`);
    titles.add(nfc(title));
    if (STORY_WORD[loc] && !STORY_WORD[loc].test(title)) f.push(`r12: ${loc} ${m} title "${title}" lacks the locale's STORY word`);
    for (const re of BARE_ORDER) if (re.test(title)) f.push(`r12: ${loc} ${m} title "${title}" is a bare order head`);
    for (const t of [title, ins]) {
      const h = freeClaim.hit(t);
      if (h) f.push(`r13: ${loc} ${m} claims free ("${h}")`);
      if (ANSWER_KEY.test(t)) f.push(`r13: ${loc} ${m} promises an answer key`);
    }
    if (!ins || [...ins].length > 150) f.push(`r14: ${loc} ${m} instruction is ${[...ins].length} chars (1-150)`);
    if (ins && (!/[.!?…]$/u.test(ins) || /[.!?](?=\s+\p{Lu})/u.test(ins.slice(0, -1)))) f.push(`r14: ${loc} ${m} instruction is not ONE sentence`);
    if (loc === 'en') for (const re of RULE14_EN[m] || []) if (!re.test(ins)) f.push(`r14: en ${m} instruction does not name its apparatus (${re})`);
    if (m === 'first-next-last-cut') {
      if (/(?<!\p{L})(sort|group)/iu.test(ins)) f.push(`r14: ${loc} F1 instruction says sort / group`);
      for (const w of block.words3 || []) if (!nfc(ins).includes(nfc(w))) f.push(`r14: ${loc} F1 instruction does not name "${w}"`);
    }
  }
  return f;
}

/* ---------------------------------------------------------------- helpers for main */
const clone = (x) => JSON.parse(JSON.stringify(x));
function synthLocale(loc, openers, words3) {
  const b = clone(STORY_SEQUENCING.en);
  const oldOp = b.openers4;
  if (openers) {
    b.openers4 = openers;
    for (const st of Object.values(b.stories)) st.sentences = st.sentences.map((s, k) => openers[k] + s.slice(oldOp[k].length));
  }
  if (words3) {
    b.words3 = words3;
    const i = b.strings['first-next-last-cut'];
    i.instruction = `Cut out the pictures and glue them under ${words3.join(', ')}.`;
  }
  const head = { de: 'Bildergeschichte', fi: 'Kuvasarja', fr: 'Images séquentielles', pt: 'Sequência de fatos', es: 'Secuencias de cuentos' }[loc];
  if (head) Object.entries(b.strings).forEach(([m, x], i) => { x.title = `${head}: ${m} ${i}`; });
  return b;
}

async function main() {
  const quick = process.argv.includes('--quick');
  let assertions = 0; const fails = [];
  const ok = (c, m) => { assertions++; if (!c) fails.push(m); return !!c; };
  const plog = []; let killed = 0, poisons = 0;
  const judge = (name, f, re) => { poisons++; const k = f.some((x) => re.test(x)); plog.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };

  // 1. control
  const ctrl = validateBank(STORY_SEQUENCING.en, 'en');
  ctrl.forEach((x) => ok(false, 'control: ' + x));
  ok(!ctrl.length, 'the EN control validates clean');
  console.log(`validator: EN control ${ctrl.length} findings over ${COMMON.stories.length} stories`);

  // 2. bank poisons
  const withStory = (id, fn) => { const c = clone(COMMON); fn(c.stories.find((s) => s.id === id), c); return c; };
  const V = (common, block = STORY_SEQUENCING.en, loc = 'en') => validateBank(block, loc, common);
  judge('P1 apple P3 irr = P2', V(withStory('apple', (s) => { s.panels[2].irr = { bite: 1 }; })), /^r3: story apple/);
  judge('P2 a tower story {blocks}', V((() => { const c = clone(COMMON); const t = clone(c.stories[0]); t.id = 'tower'; t.panels.forEach((p, i) => { p.irr = { blocks: [1, 3, 5, 7][i] }; }); c.stories.push(t); return c; })()), /^r1: story tower.*not in IRREVERSIBLE/);
  judge('P3 sandwich crumb 0,0,0,4,2', V(withStory('sandwich', (s) => { [0, 0, 0, 4, 2].forEach((v, i) => { s.panels[i].irr.crumb = v; }); })), /^r2: story sandwich 4->5 decreases crumb/);
  judge('P4 a story tagged melt', V(withStory('snowman', (s) => { s.tags.push('melt'); })), /^r6: story snowman is tagged "melt"/);
  judge('P5 a snowman op {kind: eye}', V(withStory('snowman', (s) => { s.panels[3].prop.push({ k: 'eye', cx: 100, cy: 30, r: 1 }); })), /^r6: story snowman#4 op kind eye/);
  judge('P6 sub3 [2,3,4]', V(withStory('apple', (s) => { s.sub3 = [2, 3, 4]; })), /^r5: story apple sub3 234 must start at 1/);
  judge('P7 letter P4 occludes with no stamp increase', V(withStory('letter', (s) => { s.panels[3].irr.stamp = 0; s.panels[3].irr.address = 0; })), /^r4: story letter#4 occludes/);
  judge('P8 a coral fill in a set op', V(withStory('fence', (s) => { s.set.push({ k: 'rect', x: 0, y: 0, w: 5, h: 5, fill: 'coral' }); })), /^r7: story fence set fill coral/);
  judge('P9 a footprint op 6 x 9 units', V(withStory('beach-walk', (s) => { const e = s.panels[1].prop.find((o) => o.irr === 'footprint'); e.rx = 3; e.ry = 4.5; })), /^r7: story beach-walk#2 a footprint carrier 6\.0 x 9\.0/);
  {
    const de = synthLocale('de', ['Zuerst', 'Dann', 'Danach', 'Zum Schluss']);
    const ctl = validateBank(de, 'de');
    ok(!ctl.length, 'the synthetic de control validates clean: ' + ctl.slice(0, 3).join(' | '));
    const bad = clone(de); bad.stories.apple.sentences[1] = 'Danach' + bad.stories.apple.sentences[1].slice('Dann'.length);
    judge('P10 de sentence 2 starting "Danach"', validateBank(bad, 'de'), /^r10: de apple sentence 2 does not start with "Dann"/);
  }
  {
    const bad = clone(STORY_SEQUENCING.en); bad.stories.apple.stateWords[1] = 'bite'; bad.stories.apple.sentences[2] = 'Then, bite after bite, the apple has three bites.';
    judge('P11 en stateWords[1] "bite" also in sentence 3', validateBank(bad, 'en'), /^r10: en apple stateWord "bite" also fits sentence 3/);
  }
  {
    const fi = synthLocale('fi', ['Ensin', 'Sitten', 'Seuraavaksi', 'Lopuksi'], ['Ensin', 'Sitten', 'Sitten']);
    judge('P12 fi words3 with "Sitten" twice', validateBank(fi, 'fi'), /^r9: fi words3 repeats/);
  }
  { const fr = synthLocale('fr'); fr.strings.base.title = "Remettre dans l'ordre"; judge('P13 fr title "Remettre dans l\'ordre"', validateBank(fr, 'fr'), /^r12: fr base title/); }
  { const pt = synthLocale('pt'); pt.strings.base.title = 'Sequência lógica: numere as cenas'; judge('P14 pt title "Sequência lógica: …"', validateBank(pt, 'pt'), /^r12: pt base title .*(STORY word|bare order)/); }
  { const es = synthLocale('es'); es.strings.base.instruction = 'Numera las viñetas gratis.'; judge('P15 es instruction with "gratis"', validateBank(es, 'es'), /^r13: es base claims free/); }
  { const en = clone(STORY_SEQUENCING.en); en.strings['first-next-last-cut'].instruction = 'Cut and sort the pictures under First, Next and Last.'; judge('P16 en F1 "Cut and sort the pictures"', validateBank(en, 'en'), /^r14: en F1 instruction says sort/); }
  // fix round 1
  { const en = clone(STORY_SEQUENCING.en); en.stories.cake.helpIds[2] = 'balloon'; judge('P17 cake bank word naming an undrawn part', validateBank(en, 'en'), /^r11: en cake: help word "candles" names "balloon"/); }
  { const en = clone(STORY_SEQUENCING.en); delete en.stories.apple.helpIds; judge('P17b a story without helpIds', validateBank(en, 'en'), /^r11: en apple: helpIds must be parallel/); }
  {
    const nl = synthLocale('nl'); Object.entries(nl.strings).forEach(([m, x], i) => { x.title = `Verhaal op volgorde ${m} ${i}`; });
    nl.strings.base.title = 'Verhaal op volgorde leggen';
    const r12 = validateBank(nl, 'nl').filter((x) => /^r12/.test(x));
    ok(!r12.length, 'must-pass: nl "Verhaal op volgorde leggen" is a legal head: ' + r12.join(' | '));
    nl.strings.base.title = 'Volgorde';
    judge('P19 nl bare "Volgorde"', validateBank(nl, 'nl'), /^r12: nl base title "Volgorde" (lacks the locale's STORY word|is a bare order head)/);
    nl.strings.base.title = 'Plaatjes op volgorde';
    judge('P19b nl "Plaatjes op volgorde" (no story word anywhere)', validateBank(nl, 'nl'), /^r12: nl base title "Plaatjes op volgorde" is a bare order head/);
  }

  // 3. build: pooled census + refusal + config guard
  const spec = require('../types/k/K-379-story-sequencing.js');
  const { makeRng, instanceSeed } = require('../lib/rng.js');
  const buildAt = (d, variant, extra = {}) => spec._buildWith({ block: STORY_SEQUENCING.en, config: spec.difficulty[d], ...extra }, { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: 'K-379', theme: null, difficulty: d, seedEpoch: 1, variant })) });
  function census(d, n, extra) {
    const N = spec.difficulty[d].panels;
    const first = Array(N).fill(0), last = Array(N).fill(0); let rows = 0; const bad = [];
    for (let v = 1; v <= n; v++) {
      const r = buildAt(d, v, extra);
      const perms = r.meta.perms.split(',');
      const stories = r.meta.stories.split(',');
      if (stories.length === 2) {
        const [a, b] = stories.map((id) => COMMON.stories.find((s) => s.id === id));
        if (a.setKind === b.setKind || a.objects.some((o) => b.objects.includes(o))) bad.push(`seed ${v}: stories ${stories} share a stage / object`);
        if (perms[0] === perms[1] || perms[0].indexOf('1') === perms[1].indexOf('1')) bad.push(`seed ${v}: rows ${perms} share a permutation / first slot`);
      }
      for (const p of perms) {
        rows++;
        const law = spec.scrambleLaw(p.split('').map(Number));
        if (law && !extra) bad.push(`seed ${v}: ${p} breaks the law (${law})`);
        first[p.indexOf('1')]++; last[p.indexOf(String(N))]++;
      }
    }
    return { first: first.map((x) => x / rows), last: last.map((x) => x / rows), bad };
  }
  const band = (shares, lo, hi) => shares.every((x) => x >= lo && x <= hi);
  const c2 = census(2, 400);
  c2.bad.forEach((x) => ok(false, 'd2 ' + x));
  const pct = (a) => a.map((x) => (x * 100).toFixed(1)).join('/');
  ok(band(c2.first, 0.19, 0.31), `d2 rank-1 slot shares ${pct(c2.first)} % outside 25 ± 6`);
  ok(band(c2.last, 0.19, 0.31), `d2 rank-4 slot shares ${pct(c2.last)} % outside 25 ± 6`);
  console.log(`census d2 (400 seeds, 800 rows): rank-1 by slot ${pct(c2.first)} %, rank-4 by slot ${pct(c2.last)} %`);
  const c1 = census(1, 400); c1.bad.forEach((x) => ok(false, 'd1 ' + x));
  // §2 records the n = 3 middle-slot share as 0.50 for ONE strip; with two strips per page and the
  // rank-1-slots-differ rule the pooled middle share falls toward uniform (measured 43 %): assert the
  // recorded bound as a CEILING (<= 56) and a floor on every slot (>= 19), never the point value.
  ok(c1.first[1] <= 0.56 && c1.first.every((x) => x >= 0.19), `d1 rank-1 slot shares ${pct(c1.first)} % (middle <= 56, every slot >= 19)`);
  console.log(`census d1: rank-1 by slot ${pct(c1.first)} % (middle = the recorded 50 % bound)`);
  const c3 = census(3, 400); c3.bad.forEach((x) => ok(false, 'd3 ' + x));
  ok(band(c3.first, 0.14, 0.26) && band(c3.last, 0.14, 0.26), `d3 rank-1 ${pct(c3.first)} / rank-5 ${pct(c3.last)} % outside 20 ± 6`);
  console.log(`census d3: rank-1 by slot ${pct(c3.first)} %, rank-5 ${pct(c3.last)} %`);
  // PR2: the inputs' derangement composer -> slot-1 share of rank 1 is 0 % (an inverted leak)
  { const cd = census(2, 400, { composer: 'derange' }); judge('PR2 derangement composer (pooled slot-1 share)', band(cd.first, 0.19, 0.31) ? [] : [`rank-1 slot shares ${pct(cd.first)} % outside 25 ± 6`], /outside 25 ± 6/); }
  // PR11: an F1 config fed to the base build
  { let t = null; try { spec._buildWith({ block: STORY_SEQUENCING.en, config: { ...spec.difficulty[2], answer: 'glue' } }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { t = e.message; } judge('PR11 a base config carrying an F1 answer key (glue)', t ? [t] : [], /is not the base's numeral/); }
  // refusal: an unauthored locale
  { let t = null; try { spec.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('x') }); } catch (e) { t = e.message; } ok(t && /no de block/.test(t), 'de must REFUSE until its panel authors the block: ' + t); }
  // es/pt pools lose the snowman by default (a pool check through the spec's own filter)
  ok(!spec.storyPool({}, 'es', 'sub4').some((s) => s.id === 'snowman') && spec.storyPool({}, 'es', 'sub4').length === 11, 'es sub4 pool = 11 without snowman (12 stories carry sub4)');

  // 4 + 5. render
  const puppeteer = require('puppeteer');
  const { renderInstance } = require('../render/render-instance.js');
  const OUTD = path.join(__dirname, '..', 'out', 'dev');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const floors = async (d, tagName) => page.evaluate((d) => {
    const f = [];
    const foot = document.querySelector('.ws-foot').getBoundingClientRect();
    const lane = document.querySelector('.ss-page').getBoundingClientRect();
    for (const c of document.querySelectorAll('[data-lcs-card]')) {
      const r = c.getBoundingClientRect();
      if (d === 2 && r.width < 132) f.push(`card ${r.width} px wide (< 132)`);
      if (r.bottom > foot.top || r.left < lane.left || r.right > lane.right) f.push('a card outside the lane / under the footer');
    }
    for (const t of document.querySelectorAll('.ss-page .ws-blankbox')) {
      const r = t.getBoundingClientRect();
      if (d !== 3 && (r.width < 64 || r.height < 60)) f.push(`tag ${r.width} x ${r.height} (< 64 x 60)`);
      if (d === 3 && (r.width < 56 || r.height < 56)) f.push(`tag ${r.width} x ${r.height} (< 56 x 56)`);
      if (r.bottom > foot.top) f.push('a tag under the footer');
    }
    for (const row of document.querySelectorAll('[data-lcs-story-row]')) { const r = row.getBoundingClientRect(); if (r.bottom > lane.bottom + 0.5 || r.top < lane.top - 0.5) f.push('a row outside the lane'); }
    const body = document.querySelector('.ws-body').getBoundingClientRect();
    return { f, bodyH: Math.round(body.height) };
  }, d);
  /**
   * SPARSE + FILL (lead review 2026-09-23; _FACE-BRIEF nt5-F additions): the drawn blocks inside the lane
   * (cords, cards, tags, and anything a face stamps [data-ss-block]) merged into vertical intervals; every
   * empty band (lane top -> first block, between blocks, last block -> lane bottom) <= 40 px; the content
   * bottom >= 85 % of the body at the 814 chrome and inside the body at every chrome.
   */
  const sparse = async () => page.evaluate(() => {
    const lane = document.querySelector('.ss-page');
    const L = lane.getBoundingClientRect(), cs = getComputedStyle(lane);
    const top = L.top + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop), bot = L.bottom - parseFloat(cs.borderBottomWidth) - parseFloat(cs.paddingBottom);
    const iv = [...lane.querySelectorAll('[data-lcs-cord], [data-lcs-card], .ws-blankbox, [data-ss-block]')].map((e) => e.getBoundingClientRect()).filter((r) => r.height > 0).map((r) => [r.top, r.bottom]).sort((a, b) => a[0] - b[0]);
    const m = [];
    for (const x of iv) { if (m.length && x[0] <= m[m.length - 1][1] + 0.5) m[m.length - 1][1] = Math.max(m[m.length - 1][1], x[1]); else m.push(x.slice()); }
    const bands = [];
    if (m.length) { bands.push(m[0][0] - top); for (let i = 1; i < m.length; i++) bands.push(m[i][0] - m[i - 1][1]); bands.push(bot - m[m.length - 1][1]); }
    const body = document.querySelector('.ws-body').getBoundingClientRect();
    const low = m.length ? m[m.length - 1][1] : body.top;
    return { maxBand: Math.max(0, ...bands), bands: bands.map((x) => Math.round(x)), fill: (low - body.top) / body.height, inside: low <= body.bottom + 0.5, bodyH: Math.round(body.height) };
  });
  const judgeSparse = (m, chrome) => {
    const f = [];
    if (m.maxBand > 40) f.push(`sparse: a ${Math.round(m.maxBand)} px empty band (bands ${m.bands.join('/')}; > 40)`);
    if (chrome === '814' && m.fill < 0.85) f.push(`fill: the content ends at ${Math.round(m.fill * 100)} % of the body at 814 (< 85)`);
    if (!m.inside) f.push('fill: the content runs below the body');
    return f;
  };
  const runOne = async (d, variant, strings, tag) => {
    const out = await renderInstance({ type: spec, theme: null, difficulty: d, locale: 'en', variant, strings, page, outDir: OUTD, baseName: `K-379-gate-${tag}` });
    const fl = await floors(d);
    return { out, fl };
  };
  try {
    const shipped = [];
    for (const d of [1, 2, 3]) {
      const { out, fl } = await runOne(d, 1, undefined, `d${d}`);
      ok(!out.qa.verify.length, `d${d}: verify ${out.qa.verify.join(' | ')}`);
      ok(!out.qa.lints.length, `d${d}: lints ${out.qa.lints.join(' | ')}`);
      fl.f.forEach((x) => ok(false, `d${d}: ${x}`));
      shipped.push(`d${d} body ${fl.bodyH}`);
    }
    if (!quick) for (let v = 2; v <= 21; v++) {
      const { out, fl } = await runOne(2, v, undefined, 'sweep');
      ok(!out.qa.verify.length && !out.qa.lints.length && !fl.f.length, `d2 seed v${v}: ${[...out.qa.verify, ...out.qa.lints, ...fl.f].join(' | ')}`);
    }
    // chrome stress: 3-line title + 150-char instruction (the 722 body); a 4-line title (677)
    const ins150 = 'Look at what changes in each of the two stories, then write the numbers one, two, three and four in the boxes to put all the pictures in order.';
    const stress = [
      ['814', { title: 'Story Sequencing', instruction: 'Write 1, 2, 3 and 4 in the boxes.' }],
      ['722', { title: 'Story Sequencing: Number the Pictures of Every Little Story on the Washing Line', instruction: ins150 }],
      ['677', { title: 'Story Sequencing: Number the Pictures of Every Little Story Hanging Here on the Long Washing Line Today in Our Classroom', instruction: ins150 }],
    ];
    for (const [name, strings] of stress) for (const d of [1, 2, 3]) {
      const { out, fl } = await runOne(d, 1, strings, `stress${name}-d${d}`);
      ok(!out.qa.verify.length && !out.qa.lints.length && !fl.f.length, `stress ${name} d${d}: ${[...out.qa.verify, ...out.qa.lints, ...fl.f].join(' | ')}`);
      const sm = await sparse();
      judgeSparse(sm, name).forEach((x) => ok(false, `stress ${name} d${d}: ${x}`));
      shipped.push(`${name} d${d} body ${fl.bodyH} max band ${Math.round(sm.maxBand)} fill ${Math.round(sm.fill * 100)} %`);
    }
    console.log('render: ' + shipped.join(' · ') + (quick ? ' (sweep skipped: --quick)' : ' · d2 x 20 more seeds'));
    // PS1 (sparse, one way): the rows FIXED at their minimum height (no card growth) under the 814 chrome
    {
      const r = buildAt(2, 1);
      const bad = r.bodyHtml.replace(/flex:1 1 ([\d.]+)px;min-height:([\d.]+)px;max-height:[\d.]+px/g, 'flex:0 0 $1px;min-height:$2px;max-height:$2px');
      await verifyHtml(page, bad, spec, OUTD, 'ps1', stress[0][1]);
      const f = judgeSparse(await sparse(), '814');
      judge('PS1 rows fixed at their minimum (814)', bad === r.bodyHtml ? ['POISON DID NOT APPLY'] : f, /sparse: a \d+ px empty band|fill: the content ends/);
    }
    // PS2 (fill, the other way): cards too tall for the fi four-line chrome (vh 260) -> the content runs out of the body
    {
      const cfg = { ...spec.difficulty[2], vh: 260 };
      const r = spec._buildWith({ block: STORY_SEQUENCING.en, config: cfg }, { locale: 'en' }, { rng: makeRng('K-379|none|2|1') });
      await verifyHtml(page, r.bodyHtml, spec, OUTD, 'ps2', stress[2][1]);
      const f = judgeSparse(await sparse(), '677');
      const lints = await require('./lints.js').runLints(page, { gradeBand: 'K' });
      judge('PS2 cards too tall for 677', [...f, ...lints], /fill: the content runs below the body|footer overlap|overflow/);
    }
    // PR1: a base row scrambled as 2341 (a rotation)
    {
      const r = spec._buildWith({ block: STORY_SEQUENCING.en, config: spec.difficulty[2], plan: { stories: ['apple', 'fence'], perms: [[2, 3, 4, 1], [3, 1, 4, 2]] } }, { locale: 'en' }, { rng: makeRng('x') });
      const v = await verifyHtml(page, r.bodyHtml, spec, OUTD, 'pr1');
      judge('PR1 a 2341 rotation', v, /breaks the scramble law \(forward chain 2\)/);
    }
    // PR3: a tag carrying its numeral
    {
      const r = buildAt(2, 1);
      const bad = r.bodyHtml.replace(/(<span class="ws-blankbox"[^>]*>)(<\/span>)/, '$13$2');
      const v = await verifyHtml(page, bad, spec, OUTD, 'pr3');
      judge('PR3 a tag carrying its numeral', bad === r.bodyHtml ? ['POISON DID NOT APPLY'] : v, /tag 0 carries content/);
    }

    // ================================================================ Phase E: the five faces
    const { loadType } = require('../lib/load-types.js');
    const ROWS = require('../tools/b6var-rows/story-sequencing.js').ROWS;
    const FACE_FLOORS = { 'first-next-last-cut': 'K', 'what-happens-next': 'G1', 'beginning-middle-end': 'G1', 'sequencing-sentences': 'G1', 'retell-with-starters': 'G2' };
    const faceLog = [];
    for (const row of ROWS) {
      const id = row[1], mode = row[5].mode;
      const fspec = loadType(id);
      ok(fspec.difficulty[2].mode === mode, `${id}: mode ${fspec.difficulty[2].mode}`);
      ok(fspec.i18n.en.title === STORY_SEQUENCING.en.strings[mode].title && fspec.i18n.en.instruction === STORY_SEQUENCING.en.strings[mode].instruction, `${id}: the spec strings are not the bank's strings.${mode}`);
      ok(fspec.gradeBand === FACE_FLOORS[mode], `${id}: gradeBand ${fspec.gradeBand} ≠ ${FACE_FLOORS[mode]}`);
      { let t = null; try { fspec.build({ theme: null, difficulty: 2, locale: 'fi' }, { rng: makeRng('x') }); } catch (e) { t = e.message; } ok(t && /no fi block/.test(t), `${id}: fi must REFUSE until its panel authors the block (${t})`); }
      const seeds = quick ? [1] : [1, 2, 3, 4, 5];
      for (const [chrome, strings] of [['766', undefined], ...stress]) for (const v of (chrome === '766' ? seeds : [1])) {
        const out = await renderInstance({ type: fspec, theme: null, difficulty: 2, locale: 'en', variant: v, strings, page, outDir: OUTD, baseName: `K-379-gate-${id}-${chrome}` });
        ok(!out.qa.verify.length, `${id} ${chrome} v${v}: verify ${out.qa.verify.join(' | ')}`);
        ok(!out.qa.lints.length, `${id} ${chrome} v${v}: lints ${out.qa.lints.slice(0, 3).join(' | ')}`);
        const sm = await sparse();
        if (chrome !== '766') judgeSparse(sm, chrome).forEach((x) => ok(false, `${id} ${chrome}: ${x}`));
        else ok(sm.maxBand <= 40 && sm.inside, `${id} 766 v${v}: max band ${Math.round(sm.maxBand)}`);
        // floors (qa/lints.js has none): pictures, choices, text
        const fl = await page.evaluate((mode) => {
          const f = [];
          const band = { 'first-next-last-cut': 56, 'retell-with-starters': 36 }[mode] || 44;
          for (const sv of document.querySelectorAll('.ss-page [data-lcs-story-panel]')) { const r = sv.getBoundingClientRect(); if (r.width < 100) f.push(`a picture ${Math.round(r.width)} px wide (< 100)`); if (Math.min(r.width, r.height) < band) f.push(`a picture under the ${band} px floor`); }
          for (const t of document.querySelectorAll('.ss-page [data-lcs-sentence-text], .ss-page .ss-word, .ss-page .ss-stage, .ss-page [data-lcs-bank-word]')) { const px = parseFloat(getComputedStyle(t).fontSize); if (px < 16) f.push(`text ${px} px (< 16)`); }
          for (const c of document.querySelectorAll('.ss-page [data-lcs-choice]')) { const r = c.getBoundingClientRect(); if (r.width < 44 || r.height < 44) f.push('a choice under 44 px'); }
          return f;
        }, mode);
        fl.forEach((x) => ok(false, `${id} ${chrome}: ${x}`));
        if (v === 1) faceLog.push(`${id} ${chrome}: band ${Math.round(sm.maxBand)} fill ${Math.round(sm.fill * 100)} %`);
      }
      // SPARSE poisoned both ways per face: nothing may grow (814) / the stage forced taller than the body (677)
      {
        const r = fspec._buildWith({ block: STORY_SEQUENCING.en, config: fspec.difficulty[2] }, { locale: 'en' }, { rng: makeRng(`${id}|none|2|1`) });
        const flat = r.bodyHtml.replace(/flex:1 1 /g, 'flex:0 0 ').replace(/max-height:[\d.]+px/g, 'max-height:0px');
        await verifyHtml(page, flat, fspec, OUTD, `${id}-ps1`, stress[0][1]);
        judge(`PS1 ${id} nothing grows (814)`, judgeSparse(await sparse(), '814'), /sparse: a \d+ px empty band|fill: the content ends/);
        const tall = r.bodyHtml.replace(/(class="ws-lane ss-page"[^>]*style="[^"]*)"/, '$1;min-height:980px"');
        await verifyHtml(page, tall, fspec, OUTD, `${id}-ps2`, stress[2][1]);
        judge(`PS2 ${id} stage taller than the body (677)`, judgeSparse(await sparse(), '677'), /fill: the content runs below the body/);
      }
    }
    console.log('faces: ' + faceLog.join(' · '));
    // the face poisons the base deferred (design §5)
    const F2 = loadType('G1-400'), F4 = loadType('G1-402');
    const f2plan = { stories: ['apple', 'fence', 'snowman'], others: ['letter', 'banana', 'cake'], slots: [0, 2, 1], foilOrder: [['regress', 'other'], ['other', 'regress'], ['regress', 'other']] };
    const f2 = (plan) => F2._buildWith({ block: STORY_SEQUENCING.en, config: F2.difficulty[2], plan }, { locale: 'en' }, { rng: makeRng('x') }).bodyHtml;
    { const v = await verifyHtml(page, f2(f2plan), F2, OUTD, 'f2-ctl'); ok(!v.length, 'F2 control plan: ' + v.join(' | ')); }
    judge('PR6 F2 other-story foil on the SAME stage', await verifyHtml(page, f2({ ...f2plan, others: ['banana', 'letter', 'cake'] }), F2, OUTD, 'pr6'), /shares the stage "table"/);
    {
      const bad = f2(f2plan).replace(/data-lcs-choice-story="apple" data-lcs-choice-rank="1"/, 'data-lcs-choice-story="apple" data-lcs-choice-rank="3"');
      judge('PR7 F2 a choice = rank 3', await verifyHtml(page, bad, F2, OUTD, 'pr7'), /same-story foil at rank 3/);
    }
    {
      const F1s = loadType('K-381');
      const good = F1s._buildWith({ block: STORY_SEQUENCING.en, config: F1s.difficulty[2] }, { locale: 'en' }, { rng: makeRng('K-381|none|2|1') }).bodyHtml;
      const v0 = await verifyHtml(page, good, F1s, OUTD, 'f1-ctl'); ok(!v0.length, 'F1 control: ' + v0.join(' | '));
      // swap the SECOND strip's triangle for a dot (its line keeps the triangle): strip and line disagree, both show a dot
      const i2 = good.lastIndexOf('data-lcs-marker="triangle"');
      const bad = good.slice(0, i2) + good.slice(i2).replace(/<polygon points="8,1.5 15,14.5 1,14.5"[^>]*\/>/, '<circle cx="8" cy="8" r="6.5" fill="#146B5E"/>');
      judge('PM F1 strip and line markers disagree', bad === good ? ['POISON DID NOT APPLY'] : await verifyHtml(page, bad, F1s, OUTD, 'pm'), /pairing marker disagrees/);
    }
    judge('PR8 F2 correct slots 0,1,2 (a staircase)', await verifyHtml(page, f2({ ...f2plan, slots: [0, 1, 2] }), F2, OUTD, 'pr8'), /staircase/);
    {
      const bad = F4._buildWith({ block: STORY_SEQUENCING.en, config: F4.difficulty[2], plan: { stories: ['apple', 'fence'], perms: [[1, 2, 3, 4], [3, 1, 4, 2]] } }, { locale: 'en' }, { rng: makeRng('x') }).bodyHtml;
      judge('PR9 F4 pictures in story order', await verifyHtml(page, bad, F4, OUTD, 'pr9'), /breaks the scramble law \(identity\)/);
    }
    // pooled tells at 400 seeds (raise the sample, never the threshold)
    {
      const slot = [0, 0, 0]; let n = 0; const r4 = [0, 0, 0, 0], l4 = [0, 0, 0, 0]; let rows4 = 0;
      for (let v = 1; v <= 400; v++) {
        const a = F2._buildWith({ block: STORY_SEQUENCING.en, config: F2.difficulty[2] }, { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: 'G1-400', theme: null, difficulty: 2, seedEpoch: 1, variant: v })) });
        for (const c of a.meta.slots) { slot[+c]++; n++; }
        const b = F4._buildWith({ block: STORY_SEQUENCING.en, config: F4.difficulty[2] }, { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: 'G1-402', theme: null, difficulty: 2, seedEpoch: 1, variant: v })) });
        for (const p of b.meta.perms.split(',')) { r4[p.indexOf('1')]++; l4[p.indexOf('4')]++; rows4++; }
      }
      const s2 = slot.map((x) => x / n), s4 = r4.map((x) => x / rows4), e4 = l4.map((x) => x / rows4);
      ok(s2.every((x) => x >= 0.27 && x <= 0.39), `F2 correct-slot shares ${pct(s2)} % outside 33 ± 6`);
      ok(band(s4, 0.19, 0.31) && band(e4, 0.19, 0.31), `F4 rank-1 ${pct(s4)} / rank-4 ${pct(e4)} % outside 25 ± 6`);
      console.log(`census F2 correct slot ${pct(s2)} % · F4 rank-1 ${pct(s4)} % rank-4 ${pct(e4)} %`);
      const f1 = [0, 0, 0]; let rows3 = 0; const F1 = loadType('K-381');
      for (let v = 1; v <= 400; v++) { const a = F1._buildWith({ block: STORY_SEQUENCING.en, config: F1.difficulty[2] }, { locale: 'en' }, { rng: makeRng(instanceSeed({ typeId: 'K-381', theme: null, difficulty: 2, seedEpoch: 1, variant: v })) }); for (const p of a.meta.perms.split(',')) { f1[p.indexOf('1')]++; rows3++; } }
      const s1 = f1.map((x) => x / rows3);
      ok(s1[1] <= 0.56 && s1.every((x) => x >= 0.19), `F1 rank-1 slot shares ${pct(s1)} % (middle <= 56, each >= 19)`);
      console.log(`census F1 rank-1 by slot ${pct(s1)} % (the recorded n = 3 middle bound)`);
    }
  } finally { await browser.close(); }

  console.log('poison:\n' + plog.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === poisons;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${poisons} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${poisons} poisons killed)`);
  return pass;
}

/** verify() on a doctored body, through the real page shell (file:// fonts). */
async function verifyHtml(page, bodyHtml, spec, outDir, tag, strings) {
  const { buildPage } = require('../page/shell.js');
  const st = strings || spec.i18n.en;
  const html = buildPage({ title: st.title, instruction: st.instruction, bodyHtml, locale: 'en', pageSize: 'letter' });
  const f = path.join(outDir, `K-379-gate-${tag}.html`);
  fs.writeFileSync(f, html);
  await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 1 });
  await page.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);
  return spec.verify(page);
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, validateStories };
