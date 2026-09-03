#!/usr/bin/env node
/**
 * validate-b2-draft.js <locale> [path]  — the refuse-don't-guess gate for a
 * nt20-B locale draft (default path i18n/.draft-b2-<locale>.json).
 *
 * Checks (ALL run, every error listed, exit 1 on any):
 *   types      20 × {title, instruction}; no worksheet-word in a title; per-BAND
 *              title uniqueness against the locale's EXISTING strings
 *   families   17 × {slug, name}; slug ASCII-kebab; unique across the locale
 *   skills     17 × {full 60-180, short 15-90}
 *   topicMeta  17 × ≥ 50 chars
 *   colorWords orange/purple/brown/pink present
 *   figureNames 25 keys
 *   labels     the label tables (pills ≤ 12 chars, starters ≤ 22 chars, no end mark)
 *   calendar   8 frames with exactly their slots; ≤ 90 chars; weekStart 0|1
 *   sentences  the §0 bank contract: color ≥ 3 · unscramble ≥ 8 · fix ≥ 10 ·
 *              ≥ 6 fix frames with {name} · ≥ 2 '?' frames · 12-20 frames ·
 *              slots exact per kind · each frame renders on 5 sample nouns of
 *              every wave theme (no '{', no double space, capital first, end mark)
 *              · fi/table forms cover the wave themes' nouns
 *   wordClasses terms ×3; ≥ 24 verbs + ≥ 24 adjectives; verbs ∩ adjectives = ∅;
 *              every homograph with a wave-theme vocab word is in nounExclude
 *   shopFrames yes/no + frames total/total3/change/canBuy/diff with their slots
 *   wpMulDiv   mul/share/group ≥ 3 each with {name}{n1}{n2}{noun} ({n1} {noun} adjacency is
 *              the CORRECT shape — the nt20 'no adjacent slots' rule was ban-too-wide)
 *
 * Poison-tested by tools/validate-b2-draft.test.js (must FAIL a broken frame,
 * PASS a correct fi partitive frame).
 */
'use strict';
const fs = require('fs');
const path = require('path');

const WG = path.join(__dirname, '..');
const ROOT = path.join(WG, '..', '..');
const { entriesFor, displayWord } = require('../lib/b2-common.js');
const SB = require('../lib/sentence-bank.js');

const TYPE_IDS = ['K-284', 'K-285', 'K-286', 'K-287', 'K-288', 'G1-242', 'G1-243', 'G1-244', 'G1-245', 'G1-246', 'G1-247', 'G1-248', 'G1-249', 'G2-274', 'G2-275', 'G2-276', 'G2-277', 'G2-278', 'G2-279', 'G3-370'];
const FAMILIES = ['word-tracing', 'dot-to-dot', 'grid-copy', 'singular-plural', 'articles', 'read-and-color', 'number-of-the-day', 'write-the-word', 'alphabetical-order', 'number-walls', 'doubles-halves', 'sentence-building', 'capitals-punctuation', 'word-classes', 'calendar', 'picture-writing', 'grid-coordinates'];
const FIGURES = ['star', 'house', 'boat', 'rocket', 'fish', 'kite', 'heart', 'butterfly', 'tree', 'car', 'cat', 'ice-cream', 'umbrella', 'whale', 'sailboat', 'crown', 'duck', 'flag', 'cup', 'boot', 'key', 'cherries', 'elephant', 'bird', 'giraffe'];
const WAVE_THEMES = ['fruits', 'vehicles', 'toys', 'animals'];
const BW_THEMES = ['animals bw', 'fruits bw', 'farm animals bw', 'toys bw'];
// fr appends "Fiche d'exercices", so `fiche` is the token that matters here — `feuille` is
// a word the engine never appends in any locale and `ficha` is Spanish, so before this the
// French guard was checking for two words that cannot collide and missing the one that can.
// Bounded with a Unicode lookaround so it cannot fire inside "affiche" or "fichier".
// Poison-tested BOTH ways: "Fiche des nombres" FIRES; "Affiche des nombres", "Fichier de
// mots" and every shipped title in all 11 locales stay CLEAN (0 match today).
// STILL OPEN: es appends "Hoja de ejercicios" and pt "Folha de exercicios", and neither
// `hoja` nor `folha` is in this list — those two locales have NO effective guard. Not
// widened here because in both languages that word also means LEAF, so a legitimate
// autumn-theme title would be condemned; the shape of that ban is the es/pt panels' call.
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const CAL_SLOTS = { dayOfDate: ['date'], countWeekday: ['dayPlural'], stickerDate: ['sticker'], weekLater: ['date'], daysInMonth: [], firstDay: [], lastDay: [], after: ['stickerA', 'stickerB'] };

function slotsOf(text) { return [...String(text).matchAll(/\{([a-zA-Z0-9]+)\}/g)].map((m) => m[1]); }

function validate(loc, draft, opts = {}) {
  const errs = [];
  const E = (m) => errs.push(m);
  if (draft.locale !== loc) E(`draft.locale ${draft.locale} != ${loc}`);
  // ---- types
  const strings = JSON.parse(fs.readFileSync(path.join(WG, 'i18n', `strings.${loc}.json`), 'utf8'));
  const seen = new Map();
  for (const [id, t] of Object.entries(strings)) if (!TYPE_IDS.includes(id)) seen.set(id.split('-')[0] + '|' + String(t.title).trim().toLowerCase(), id);
  for (const id of TYPE_IDS) {
    const t = draft.types && draft.types[id];
    if (!t || !t.title || !t.instruction) { E(`types.${id} missing title/instruction`); continue; }
    if (WORKSHEET_WORD.test(t.title)) E(`types.${id}: title contains a worksheet-word (the engine appends it): "${t.title}"`);
    if (t.title.length > 70) E(`types.${id}: title ${t.title.length} chars > 70`);
    const key = id.split('-')[0] + '|' + t.title.trim().toLowerCase();
    if (seen.has(key)) E(`types.${id}: title collides with ${seen.get(key)} ("${t.title}")`);
    seen.set(key, id);
  }
  // ---- families
  const tax = JSON.parse(fs.readFileSync(path.join(ROOT, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
  const slugs = new Map();
  for (const [k, v] of Object.entries(tax.axes['exercise-type'])) if (!FAMILIES.includes(k) && v.slug && v.slug[loc]) slugs.set(v.slug[loc], k);
  for (const fam of FAMILIES) {
    const f = draft.families && draft.families[fam];
    if (!f || !f.slug || !f.name) { E(`families.${fam} missing slug/name`); continue; }
    if (!/^[a-z0-9-]+$/.test(f.slug)) E(`families.${fam}: slug not ascii-kebab "${f.slug}"`);
    if (slugs.has(f.slug)) E(`families.${fam}: slug "${f.slug}" already used by ${slugs.get(f.slug)}`);
    slugs.set(f.slug, fam);
    const s = draft.skills && draft.skills[fam];
    if (!s || !s.full || !s.short) E(`skills.${fam} missing`);
    else {
      if (s.full.length < 60 || s.full.length > 180) E(`skills.${fam}.full ${s.full.length} chars (60-180)`);
      if (s.short.length < 15 || s.short.length > 90) E(`skills.${fam}.short ${s.short.length} chars (15-90)`);
    }
    const tm = draft.topicMeta && draft.topicMeta[fam];
    if (!tm || tm.length < 50) E(`topicMeta.${fam} missing or < 50 chars`);
  }
  // ---- colour words + figure names
  for (const k of ['orange', 'purple', 'brown', 'pink']) if (!draft.colorWords || !draft.colorWords[k]) E(`colorWords.${k} missing`);
  for (const k of FIGURES) if (!draft.figureNames || !draft.figureNames[k]) E(`figureNames.${k} missing`);
  // ---- labels
  const L = draft.labels || {};
  for (const k of ['numberWord', 'tensOnes', 'tens', 'ones', 'tenFrames', 'tally', 'beforeAfter', 'numberLine', 'drawIt', 'tenMoreLess', 'oneMoreLess', 'countOn', 'countBack', 'countOnTens']) if (!L.numberOfDay || !L.numberOfDay[k]) E(`labels.numberOfDay.${k} missing`);
  for (const k of ['double', 'half']) { const v = L.doublesHalves && L.doublesHalves[k]; if (!v) E(`labels.doublesHalves.${k} missing`); else if (v.length > 14) E(`labels.doublesHalves.${k} "${v}" > 14 chars`); }
  for (const k of ['one', 'many']) { const v = L.singularPlural && L.singularPlural[k]; if (!v) E(`labels.singularPlural.${k} missing`); else if (v.length > 12) E(`labels.singularPlural.${k} > 12 chars`); }
  if (!L.pictureWriting || !Array.isArray(L.pictureWriting.d1) || L.pictureWriting.d1.length < 3 || !Array.isArray(L.pictureWriting.d2) || L.pictureWriting.d2.length < 2) E('labels.pictureWriting needs d1[3] + d2[2]');
  else [...L.pictureWriting.d1, ...L.pictureWriting.d2].forEach((s) => { if (s.length > 22 || /[.?!]$/.test(s)) E(`labels.pictureWriting starter "${s}" > 22 chars or ends with a mark`); });
  for (const k of ['capital', 'name', 'end']) if (!L.fixChecklist || !L.fixChecklist[k]) E(`labels.fixChecklist.${k} missing`);
  // ---- calendar
  const C = draft.calendar || {};
  if (C.weekStart != null && ![0, 1].includes(C.weekStart)) E('calendar.weekStart must be 0 or 1');
  for (const [k, need] of Object.entries(CAL_SLOTS)) {
    const f = C.frames && C.frames[k];
    if (!f) { E(`calendar.frames.${k} missing`); continue; }
    const have = slotsOf(f).sort().join(',');
    if (have !== need.slice().sort().join(',')) E(`calendar.frames.${k}: slots [${have}] != [${need}]`);
    if (f.length > 90) E(`calendar.frames.${k} > 90 chars`);
  }
  if (C.dayAbbr && (!Array.isArray(C.dayAbbr) || C.dayAbbr.length !== 7)) E('calendar.dayAbbr must have 7 entries');
  if (C.dayPlural && (!Array.isArray(C.dayPlural) || C.dayPlural.length !== 7)) E('calendar.dayPlural must have 7 entries');
  // ---- sentences
  const S = draft.sentences;
  if (!S || !Array.isArray(S.frames)) E('sentences.frames missing');
  else {
    if (!['lower', 'keep'].includes(S.nounCase)) E('sentences.nounCase must be lower|keep');
    if (!Array.isArray(S.names) || S.names.length < 6) E('sentences.names needs ≥ 6');
    for (const k of ['capital', 'name', 'end']) if (!S.fixLabels || !S.fixLabels[k]) E(`sentences.fixLabels.${k} missing`);
    const ids = new Set();
    const color = S.frames.filter((f) => f.kind === 'color'), simple = S.frames.filter((f) => f.kind === 'simple');
    if (S.frames.length < 12 || S.frames.length > 20) E(`sentences: ${S.frames.length} frames (12-20)`);
    if (color.length < 3) E(`sentences: ${color.length} color frames (≥ 3)`);
    const uns = simple.filter((f) => (f.uses || []).includes('unscramble')), fix = simple.filter((f) => (f.uses || []).includes('fix'));
    if (uns.length < 8) E(`sentences: ${uns.length} unscramble frames (≥ 8)`);
    if (fix.length < 10) E(`sentences: ${fix.length} fix frames (≥ 10)`);
    if (fix.filter((f) => /\{name\}/.test(f.text)).length < 6) E('sentences: ≥ 6 fix frames must carry {name}');
    if (fix.filter((f) => SB.endMark(f.text) === '?').length < 2) E('sentences: ≥ 2 fix frames must be questions');
    for (const f of S.frames) {
      if (!f.id || ids.has(f.id)) E(`sentences: frame id missing/duplicate "${f.id}"`);
      ids.add(f.id);
      const sl = slotsOf(f.text);
      const count = (k) => sl.filter((x) => x === k).length;
      if (f.kind === 'color') {
        if (count('n') !== 1 || count('noun') !== 1 || count('color') !== 1) E(`sentences.${f.id}: color frame needs exactly one {n} {noun} {color}`);
      } else if (f.kind === 'simple') {
        if (count('noun') !== 1) E(`sentences.${f.id}: simple frame needs exactly one {noun}`);
        if (count('name') > 2 || count('n') || count('color')) E(`sentences.${f.id}: simple frame slots [${sl}]`);
        if (!f.uses || !f.uses.length) E(`sentences.${f.id}: uses[] missing`);
        const toks = SB.tokenize(f.text);
        if ((f.uses || []).includes('unscramble') && (toks.length < 3 || toks.length > 7)) E(`sentences.${f.id}: ${toks.length} tokens (unscramble 3-7)`);
        if ((f.uses || []).includes('fix') && f.text.length > 70) E(`sentences.${f.id}: > 70 chars for fix`);
      } else E(`sentences.${f.id}: unknown kind ${f.kind}`);
      if (!['sg', 'pl'].includes(f.noun) && !(S.nounForms && S.nounForms[f.noun])) E(`sentences.${f.id}: noun form "${f.noun}" has no table`);
      if (!/[.?!]$/.test(f.text.trim())) E(`sentences.${f.id}: no end mark`);
      if (SB.endMark(f.text) === '!' && !f.exclaimStrict && (f.uses || []).includes('fix')) E(`sentences.${f.id}: '!' fix frame must set exclaimStrict`);
      // render on 5 sample nouns per theme
      const themes = f.kind === 'color' ? BW_THEMES : WAVE_THEMES;
      for (const theme of themes) {
        let entries;
        try { entries = entriesFor(theme, loc).filter((e) => e.plural); } catch (e) { continue; }
        for (const e of entries.slice(0, 5)) {
          try {
            const nounText = SB.resolveNoun(S, f, { ...e, singular: displayWord(e.singular, loc, S.nounCase === 'keep' ? 'keep' : 'lower'), plural: displayWord(e.plural, loc, S.nounCase === 'keep' ? 'keep' : 'lower') }, loc);
            const out = SB.fillFrame(f.text, { name: [S.names[0], S.names[1]], n: 3, noun: nounText, color: (S.colorWords && S.colorWords.red) || 'red' });
            if (/\{/.test(out)) E(`sentences.${f.id}: unfilled slot on ${theme}/${e.vocabKey}`);
            if (/ {2}/.test(out) || /^\s|\s$/.test(out)) E(`sentences.${f.id}: spacing defect on ${e.vocabKey}: "${out}"`);
            if (!/^[¿¡]?\p{Lu}/u.test(out)) E(`sentences.${f.id}: does not start with a capital: "${out}"`);
          } catch (err) {
            if (opts.strictTables !== false) E(`sentences.${f.id}: ${err.message}`);
          }
        }
      }
    }
  }
  // ---- word classes
  const W = draft.wordClasses;
  if (!W) E('wordClasses missing');
  else {
    for (const k of ['noun', 'verb', 'adj']) if (!W.terms || !W.terms[k]) E(`wordClasses.terms.${k} missing`);
    const vb = (W.verbs || []).map((v) => (v.w || v).toLowerCase()), ab = (W.adjectives || []).map((a) => (a.w || a).toLowerCase());
    if (vb.length < 24) E(`wordClasses: ${vb.length} verbs (≥ 24)`);
    if (ab.length < 24) E(`wordClasses: ${ab.length} adjectives (≥ 24)`);
    const inter = vb.filter((v) => ab.includes(v));
    if (inter.length) E(`wordClasses: verbs ∩ adjectives = ${inter}`);
    const excl = new Set((W.nounExclude || []).map((s) => s.toLowerCase()));
    const homographs = [];
    for (const theme of WAVE_THEMES) {
      let entries; try { entries = entriesFor(theme, loc); } catch (e) { continue; }
      for (const e of entries) { const w = e.singular.toLowerCase(); if ((vb.includes(w) || ab.includes(w)) && !excl.has(w)) homographs.push(`${w} (${theme})`); }
    }
    if (homographs.length) E(`wordClasses: homographs with vocab nouns not in nounExclude: ${[...new Set(homographs)].join(', ')}`);
  }
  // ---- shop frames
  const SF = draft.shopFrames;
  if (!SF || !SF.yes || !SF.no || !SF.frames) E('shopFrames missing yes/no/frames');
  else {
    const need = { total: ['name', 'item1', 'item2'], total3: ['name', 'item1', 'item2', 'item3'], change: ['name', 'item1', 'coins'], canBuy: ['name', 'item1', 'item2', 'money'], diff: ['item1', 'item2'] };
    for (const [k, req] of Object.entries(need)) {
      const arr = SF.frames[k];
      if (!Array.isArray(arr) || arr.length < (k === 'total3' ? 1 : 2)) { E(`shopFrames.${k} needs ≥ ${k === 'total3' ? 1 : 2}`); continue; }
      arr.forEach((f) => { const sl = new Set(slotsOf(f)); req.forEach((r) => { if (!sl.has(r)) E(`shopFrames.${k}: "${f}" lacks {${r}}`); }); if (/\{noun\}/.test(f)) E(`shopFrames.${k}: no {noun} allowed`); });
    }
  }
  // ---- mul/div frames
  const M = draft.wpMulDiv;
  if (!M || !M.frames) E('wpMulDiv missing');
  else {
    if (!['plural', 'partitive'].includes(M.nounForm)) E('wpMulDiv.nounForm must be plural|partitive');
    if (M.nounForm !== 'plural' && !M.nounForms) E('wpMulDiv: a non-plural nounForm needs nounForms');
    if (!Array.isArray(M.names) || M.names.length < 6) E('wpMulDiv.names ≥ 6');
    for (const k of ['mul', 'share', 'group']) {
      const arr = M.frames[k];
      if (!Array.isArray(arr) || arr.length < 3) { E(`wpMulDiv.frames.${k} needs ≥ 3`); continue; }
      arr.forEach((f) => {
        for (const s of ['name', 'n1', 'n2', 'noun']) if (!f.includes(`{${s}}`)) E(`wpMulDiv.${k}: "${f}" lacks {${s}}`);
        if (/\{(?!name|n1|n2|noun\})/.test(f)) E(`wpMulDiv.${k}: unknown slot in "${f}"`);
      });
    }
    if (M.nounForms) for (const theme of WAVE_THEMES) {
      let entries; try { entries = entriesFor(theme, loc); } catch (e) { continue; }
      const missing = entries.filter((e) => !M.nounForms[e.vocabKey]).map((e) => e.vocabKey);
      if (missing.length) E(`wpMulDiv.nounForms lacks ${missing.length} ${theme} nouns: ${missing.slice(0, 8).join(', ')}${missing.length > 8 ? '…' : ''}`);
    }
  }
  return errs;
}

if (require.main === module) {
  const [, , loc, p] = process.argv;
  if (!loc) { console.error('usage: validate-b2-draft.js <locale> [path]'); process.exit(2); }
  const file = p || path.join(WG, 'i18n', `.draft-b2-${loc}.json`);
  const draft = JSON.parse(fs.readFileSync(file, 'utf8'));
  const errs = validate(loc, draft);
  if (errs.length) { errs.forEach((e) => console.error(' - ' + e)); console.error(`FAIL: ${errs.length} error(s) in ${file}`); process.exit(1); }
  console.log(`ok: ${file} passes all checks`);
}

module.exports = { validate, TYPE_IDS, FAMILIES, FIGURES, WAVE_THEMES, BW_THEMES };
