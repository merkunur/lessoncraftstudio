#!/usr/bin/env node
/**
 * verify-b5-family.js — the K-370 `family` gate (nt10-E; design
 * docs/worksheet-gen/b5-designs/K-370-family.md §5 "qa/verify-b5-family.js").
 *
 *   node scripts/worksheet-gen/qa/verify-b5-family.js [--quick]
 *
 * EXPORTS validateBank(block, loc, opts) — §5 rules 1-16 over ONE locale block
 * (tools/validate-b5-draft.js runs it on every panel draft); the page-level
 * halves of rules 5 / 6 / 8 / 9 are exported as pure functions the faces
 * (Phase 2) call on their own pages: checkClueTree (F3), checkGenRow (F1),
 * f2GlyphH (F2), bankRule7 (F4).
 *
 * THE RUN:
 *  1. validateBank(en) — clean (the control of every bank poison).
 *  2. The two primitive gates (verify-b5-family-figure.js + verify-b5-family-tree.js,
 *     node passes) — clean.
 *  3. RENDERS through render/render-instance.js (file:// fonts): d1 / d2 / d3 en
 *     under the default chrome, d2 under the 722 chrome (3-line title + 3-line
 *     instruction) AND the 677 chrome (4-line title); verify() empty, qa/lints.js
 *     clean, and the floors asserted HERE (qa/lints.js has no size lint): busts
 *     >= 72 tall, frames >= 80 wide, chips >= 56 tall, numeral boxes 64 x 56,
 *     every body text >= 16 px, chips never clip, everything above the footer,
 *     0 <img>, no codeColors hex, the printed title / instruction === the bank's
 *     strings.base === the spec's i18n.en; every figure on the page re-checked
 *     by the figure gate's rules (checkFigure).
 *  4. THE SEED SWEEP (skipped by --quick): d2 x variants 1..20 rendered — verify()
 *     empty on every one; both grand sides occur; no box position holds the same
 *     answer on > 40 % of the seeds (the nt10-D staircase lesson: one bad order
 *     ships to 11 locales); every answer column differs from its reading order.
 *  5. POISONS — each must FAIL for ITS OWN reason (bank poisons against the
 *     validator with the correct en block as the control; render poisons against
 *     verify() with the untouched d2 page as the control):
 *     P1 both grandparent couples on an en base (grandma names two people) → rule 4
 *     P2 a closed face built from a one-parent graph → the `structure` throw
 *     P3 a d3 page offering `brother` + `By` with only a baby → rule 5
 *     P4 F3: Leo (m) on a grandmother plate → rule 6
 *     P5 F3: four empty plates in four different (age, sex) cells → rule 6
 *     P6 F1 row grandma · grandpa · cousin → rule 8
 *     P7 nl generationOK with `neef` → rule 8
 *     P8 fr F2 badge on `sœur` (œ has no stroke data) → rule 9
 *     P9 fr riddle "… est ma ___." → rule 10
 *     P10 en riddle "My mom's mom is my ___." → rule 11
 *     P11 fi title "Sukupuu: lue vihjeet" → rule 12
 *     P12 sv kin.MM = "farmor" → rule 2
 *     P13 F5 instruction "Draw your mom and dad." → rule 14
 *     P14 de page words mixing Oma (K) and Großvater (G2) → rule 13 (validator + the build throw)
 *     P15 F4 distractor `grandma` on an en page → rule 7
 *     P16 it name "Mia" (= my) → rule 3
 *     PR1 a kin word printed under a frame → verify()
 *     PR2 a badge order monotone by generation on the shipped seed → verify()
 *     PR3 two drops swapped on the rendered page (the stamps unchanged) → verify()'s line re-derivation
 *     PR4 an f look whose hair stops at y 62 on the page → checkFigure
 *     PR5 de `Schwester` in a 250 px F2 lane (the silent shrink below glyphH 40) → f2GlyphH
 *     PR7 a face config fed to the base (a guard written `difficulty === 2` would be blind) → the config guard throws
 *     PR8 a codeColors fill anywhere on the page → the gate's own palette ban
 *     (PR6 — F5 with a connector between two mats — is Phase 2: F5 is not built; recorded.)
 * Exit 1 on any real failure OR any silent poison.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const url = require('url');
const tokens = require('../primitives/_tokens.js');
const FT = require('../primitives/family-tree.js');
const LS = require('../data/tracing/letter-strokes.js');
const { FAMILY, FAMILY_NEUTRAL } = require('../data/b5/family.js');

const K370 = 'K-370';
const MODES = FAMILY_NEUTRAL.modes;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const FREE_WORD = /(?<!\p{L})(free|gratis|kostenlos|gratuit|gratuito|gratuita|ilmainen|gratuitamente)(?!\p{L})/iu;
const ANSWER_KEY = /answer key|with answers|lösungen|solucionario|con respuestas|gabarito|corrigé|con soluzioni|antwoorden|facit|med svar|vastaukset/iu;
const MY = { en: ['my'], de: ['mein', 'meine'], es: ['mi', 'mis'], pt: ['meu', 'minha', 'meus', 'minhas'], fr: ['mon', 'ma', 'mes'], it: ['mio', 'mia', 'miei', 'mie'], nl: ['mijn'], sv: ['min', 'mitt', 'mina'], da: ['min', 'mit', 'mine'], no: ['min', 'mitt', 'mine'], fi: ['minun'] };
/** rule 10 defaults per locale (a panel adds to block.agreeing) */
const AGREE = { en: ['a', 'an', 'his', 'her'], de: ['der', 'die', 'das', 'den', 'dem', 'ein', 'eine', 'seine', 'ihre', 'sein', 'ihr'], fr: ['le', 'la', 'les', "l'", 'un', 'une', 'son', 'sa', 'ses', 'ma', 'mon'], es: ['el', 'la', 'los', 'las', 'un', 'una', 'su'], pt: ['o', 'a', 'os', 'as', 'um', 'uma', 'seu', 'sua'], it: ['il', 'lo', 'la', 'i', 'gli', 'le', "l'", 'suo', 'sua'], nl: ['de', 'het', 'een', 'zijn', 'haar'], sv: ['en', 'ett', 'hans', 'hennes', 'sin', 'sitt'], da: ['en', 'et', 'hans', 'hendes', 'sin', 'sit'], no: ['en', 'ei', 'et', 'hans', 'hennes', 'sin', 'sitt'], fi: [] };
/** rule 8: words whose generation is ambiguous in the locale although the path table cannot see it (nl neef / nicht = cousin AND nephew / niece) */
const AMBIGUOUS_GEN = { nl: ['neef', 'nicht'] };
/** rule 12: per-locale forbidden title shapes */
const TITLE_BANS = {
  fi: [/sukupuu/i], pt: [/^\s*fam[ií]lia\s*$/i], it: [/^\s*la famiglia\s*$/i], de: [/^\s*meine familie/i], sv: [/släktord/i],
};
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const hasToken = (text, tok) => new RegExp(`(?<!\\p{L})${esc(tok)}(?!\\p{L})`, 'iu').test(text);

/* ------------------------------------------------------------------ page-level pure rules */
/** rule 6 (F3): plates [{path, sex, age, name, given:bool}], clues [{path, text}] */
function checkClueTree({ plates, clues }) {
  const f = [];
  const names = plates.map((p) => p.name);
  if (new Set(names).size !== names.length) f.push('rule 6: two plates carry the same name');
  for (const p of plates) if (p.nameSex && p.nameSex !== p.sex) f.push(`rule 6: ${p.name} (${p.nameSex}) sits on a ${p.sex} plate (${p.path})`);
  const given = plates.filter((p) => p.given && p.path !== '').map((p) => p.name);   // the ego's name IS in every clue ({egoGen})
  for (const c of clues) for (const g of given) if (hasToken(c.text, g) && !c.egoName) f.push(`rule 6: the given name ${g} appears in a clue`);
  const empty = plates.filter((p) => !p.given);
  const cells = empty.map((p) => p.age + p.sex);
  if (new Set(cells).size === cells.length) f.push('rule 6: the empty plates hold no same-(age, sex) pair — a name could be placed from the figure alone');
  for (const c of clues) if (!empty.some((p) => p.path === c.path)) f.push(`rule 6: clue ${c.path} targets no empty plate`);
  return f;
}
/** rule 8 (F1): the three words in a row name three distinct generations */
function checkGenRow(words, kin) {
  const gens = words.map((w) => { const gs = [...new Set(Object.entries(kin).filter(([, v]) => v === w).map(([p]) => FT.genOf(p)))]; return gs.length === 1 ? gs[0] : NaN; });
  if (gens.some((g) => Number.isNaN(g))) return [`rule 8: a row word has no single generation (${words.join(' · ')})`];
  return new Set(gens).size === words.length ? [] : [`rule 8: the row ${words.join(' · ')} repeats a generation (${gens.join(',')})`];
}
/** rule 9 (F2): the resolved glyph height of a word in a stacked strokeWordLane (trace-path.js:597-620, the silent shrink) */
function f2GlyphH(text, { w = 321, h = 58, glyphH = 40, padLeft = 10 } = {}) {
  const LM = LS.METRICS;
  const { width } = LS.textGlyphs(text);   // throws on a glyph with no stroke data
  const units = LM.base - LM.ascender;
  let scale = Math.min(glyphH / units, (h - 6) / (LM.desc - LM.ascender));
  const maxW = w - padLeft - 8;
  if (width * scale > maxW) scale = maxW / width;
  return scale * units;
}
/** rule 7 (F4): the riddle bank */
function bankRule7(block) {
  const f = [];
  const answers = FAMILY_NEUTRAL.riddlePathsD2.map((p) => block.kin[p]);
  const distinct = [...new Set(answers)];
  const bank = [...distinct, ...(block.distractors || [])];
  if (new Set(bank).size !== bank.length) f.push('rule 7: the bank repeats a word (a distractor equals an answer)');
  const genOfWord = (w) => new Set(Object.entries(block.kin).filter(([, v]) => v === w).map(([p]) => FT.genOf(p)));
  const answerGens = new Set(answers.flatMap((a) => [...genOfWord(a)]));
  for (const d of block.distractors || []) {
    if (!block.words[d]) f.push(`rule 7: distractor ${d} is not a word`);
    if (answers.includes(d)) f.push(`rule 7: distractor ${d} fits a riddle`);
    if (![...genOfWord(d)].some((g) => answerGens.has(g))) f.push(`rule 7: distractor ${d} shares no generation with an answer`);
  }
  const repeats = distinct.length < answers.length;
  if (!!block.repeatsNote !== repeats) f.push(`rule 7: repeatsNote ${block.repeatsNote} but the d2 answers ${repeats ? 'do' : 'do not'} repeat`);
  return f;
}

/* ------------------------------------------------------------------ validateBank */
function validateBank(block, loc, opts = {}) {
  const errs = [];
  const E = (m) => errs.push(m);
  if (!block || typeof block !== 'object') return ['no block'];
  const { kin = {}, words = {}, names = [], strings = {} } = block;
  const paths = FAMILY_NEUTRAL.paths.filter((p) => p !== '');
  // rule 1
  for (const p of paths) if (!kin[p]) E(`rule 1: kin has no entry for path ${p}`);
  for (const [p, w] of Object.entries(kin)) {
    if (!paths.includes(p)) E(`rule 1: kin is keyed on "${p}", not a path`);
    if (!words[w]) E(`rule 1: kin.${p} = ${w} has no words entry`);
  }
  for (const [k, w] of Object.entries(words)) if (!w || typeof w.text !== 'string' || !w.text.trim() || !['K', 'G2'].includes(w.register)) E(`rule 1: words.${k} needs {text, register:'K'|'G2'}`);
  // rule 2 (the Nordic lineage inversion, mechanical)
  if (['sv', 'da'].includes(loc) || (loc === 'no' && block.lineage)) {
    for (const p of paths.filter((x) => /^[MF][MFZB]$/.test(x))) {
      const t = words[kin[p]] ? words[kin[p]].text.toLowerCase() : '';
      // "mo" / "fa", not the design's "mor" / "far": moster = mor + syster and faster = far + syster contract (build record)
      const want = p[0] === 'M' ? 'mo' : 'fa';
      if (!t.startsWith(want)) E(`rule 2: ${loc} kin.${p} = "${t}" does not start "${want}" (the drawn side decides the lineage word)`);
    }
  }
  // rule 3
  const fem = names.filter((n) => n.sex === 'f'), mas = names.filter((n) => n.sex === 'm');
  if (fem.length < 6 || mas.length < 6) E(`rule 3: ${fem.length} f + ${mas.length} m names (>= 6 each)`);
  const lits = new Set(Object.values(words).map((w) => w.text.toLowerCase()));
  const tokens3 = new Set([...(block.firstPerson || []), ...(MY[loc] || []), block.meWord || ''].map((x) => x.toLowerCase()));
  const seen = new Set();
  const usesGen = Object.values({ ...(block.clueFrames || {}), ...(block.riddleFrames || {}) }).some((t) => t.includes('{egoGen}'));
  for (const n of names) {
    if (!n.name || [...n.name].length > 7) E(`rule 3: name "${n.name}" > 7 chars`);
    if (!['f', 'm'].includes(n.sex)) E(`rule 3: name ${n.name} has no sex tag`);
    const k = String(n.name).toLowerCase();
    if (seen.has(k)) E(`rule 3: name ${n.name} twice`);
    seen.add(k);
    if (lits.has(k) || tokens3.has(k)) E(`rule 3: name "${n.name}" is also a word / frame token in ${loc}`);
    if (usesGen && !n.gen) E(`rule 3: name ${n.name} has no genitive literal but the frames use {egoGen}`);
  }
  // rule 4 — word -> person uniqueness on the base under the ONE structure, either grand side, every sibling set
  for (const side of ['M', 'F']) for (const sib of ['Z', 'B']) for (const baby of [null, 'Zy', 'By']) {
    const ps = ['M', 'F', side + 'M', side + 'F', '', sib, ...(baby ? [baby] : [])].map((p) => ({ path: p }));
    const asked = ps.filter((p) => p.path !== '').map((p) => kin[p.path]).filter(Boolean);
    const seenW = new Set();
    for (const w of asked) {
      const refs = ps.filter((p) => p.path !== '' && kin[p.path] === w);
      if (refs.length !== 1 && !seenW.has(w)) E(`rule 4: side ${side} ${sib}${baby ? '+' + baby : ''}: "${w}" names ${refs.length} people (${refs.map((r) => r.path).join(',')})`);
      seenW.add(w);
    }
  }
  // rule 5 — a baby word never collapses onto the older sibling word
  if (kin.Zy && kin.Zy === kin.Z) E('rule 5: kin.Zy === kin.Z (the baby and the older sister share a word)');
  if (kin.By && kin.By === kin.B) E('rule 5: kin.By === kin.B');
  // rule 6 (bank half) — a clue frame per path, {name} + {egoGen} only
  for (const p of paths) {
    const t = block.clueFrames && block.clueFrames[p];
    if (!t) { E(`rule 6: no clue frame for ${p}`); continue; }
    if (!t.includes('{name}')) E(`rule 6: clue ${p} has no {name}`);
    const slots = (t.match(/\{[^}]+\}/g) || []).filter((s) => !['{name}', '{egoGen}', '{egoName}'].includes(s));
    if (slots.length) E(`rule 6: clue ${p} carries ${slots.join(',')}`);
  }
  // rule 7
  for (const p of FAMILY_NEUTRAL.riddlePathsD2) {
    const t = block.riddleFrames && block.riddleFrames[p];
    if (!t) { E(`rule 7: no riddle frame for ${p}`); continue; }
    if ((t.match(/___/g) || []).length !== 1) E(`rule 7: riddle ${p} has ${(t.match(/___/g) || []).length} gaps`);
    const slots = (t.match(/\{[^}]+\}/g) || []).filter((s) => !['{egoGen}', '{egoName}'].includes(s));
    if (slots.length) E(`rule 7: riddle ${p} carries ${slots.join(',')}`);
  }
  errs.push(...bankRule7(block));
  // rule 7 (instruction half): the "a word can fit more than one riddle" clause rides in the F4 instruction IFF repeatsNote
  { const ri = strings['relation-riddles'] && strings['relation-riddles'].instruction;
    const has = !!(ri && block.repeatsNoteText && ri.includes(block.repeatsNoteText));
    if (ri && !!block.repeatsNote !== has) E(`rule 7: repeatsNote ${!!block.repeatsNote} but the F4 instruction ${has ? 'carries' : 'lacks'} the repeatsNoteText clause`); }
  // NBSP: no U+00A0 in any literal of the block (it leaks into every SEO string; page.css balances titles instead)
  if (/\u00A0/.test(JSON.stringify(block))) E('NBSP: the block carries a U+00A0 (titles wrap balanced in page.css; an NBSP leaks into SEO strings)');
  // rule 8
  const amb = new Set((AMBIGUOUS_GEN[loc] || []).map((x) => x.toLowerCase()));
  for (const w of block.generationOK || []) {
    if (!words[w]) { E(`rule 8: generationOK names ${w}, not a word`); continue; }
    const gens = new Set(Object.entries(kin).filter(([, v]) => v === w).map(([p]) => FT.genOf(p)));
    if (gens.size !== 1) E(`rule 8: ${w} has ${gens.size} generations in ${loc}`);
    if (amb.has(words[w].text.toLowerCase())) E(`rule 8: ${loc} "${words[w].text}" is generation-ambiguous (cousin AND nephew / niece)`);
    // F1 as built (faces record): the placard chip is 137 px of Nunito 800 **20** (the design said 141 at 18); opts.measure(text) measures at 20
    if (opts.measure && opts.measure(words[w].text) > 137 && !/\s/.test(words[w].text)) E(`rule 8: "${words[w].text}" is one word wider than 137 px at Nunito 800 20 (the F1 placard)`);
  }
  // rule 9 — every glyph of every word the F2 pool offers (the d2 family: M F Z B + one grand couple — no baby,
  // no aunt / cousin) is traceable, and holds glyphH 40 at lane w 321
  const f2Keys = new Set(['M', 'F', 'Z', 'B', 'MM', 'MF', 'FM', 'FF'].map((p) => kin[p]).filter(Boolean));
  for (const [k, w] of Object.entries(words)) {
    if (!f2Keys.has(k) || (block.f2Exclude || []).includes(k)) continue;
    let g;
    try { g = f2GlyphH(w.text); } catch (e) { E(`rule 9: ${loc} "${w.text}" is not traceable (${e.message})`); continue; }
    if (g < 40 - 1e-6) E(`rule 9: ${loc} "${w.text}" shrinks to glyphH ${g.toFixed(1)} < 40 in the F2 lane`);
  }
  // rule 10 / 11 — frames
  const agree = [...(AGREE[loc] || []), ...(block.agreeing || [])].map((x) => x.toLowerCase());
  const first = [...(MY[loc] || []), ...(block.firstPerson || [])].map((x) => x.toLowerCase());
  const frames = { ...(block.clueFrames || {}), ...(block.riddleFrames || {}) };
  for (const [p, t] of Object.entries(frames)) {
    const m = /(\S+)\s+___/.exec(t);
    if (m) {
      const before = m[1].toLowerCase().replace(/[’]/g, "'");
      if (agree.includes(before) || agree.some((a) => a.endsWith("'") && before.endsWith(a))) E(`rule 10: ${loc} frame ${p} puts "${m[1]}" (it agrees with the answer) right before the gap`);
    }
    const bare = t.replace(/\{[^}]+\}/g, ' ');
    for (const tok of first) if (hasToken(bare, tok)) { E(`rule 11: ${loc} frame ${p} is first person ("${tok}")`); break; }
  }
  // rule 12 — titles
  const titles = MODES.map((m) => strings[m] && strings[m].title).filter(Boolean);
  if (new Set(titles.map((t) => t.toLowerCase())).size !== titles.length) E('rule 12: two titles are the same');
  for (const m of MODES) {
    const t = strings[m] && strings[m].title;
    if (!t) continue;
    if ([...t].length > 70) E(`rule 12: ${m} title ${[...t].length} chars > 70`);
    if (WORKSHEET_WORD.test(t)) E(`rule 12: ${m} title carries the worksheet word`);
    if (FREE_WORD.test(t)) E(`rule 12: ${m} title claims "free"`);
    for (const re of TITLE_BANS[loc] || []) if (re.test(t)) E(`rule 12: ${loc} ${m} title "${t}" matches the banned shape ${re}`);
    for (const my of MY[loc] || []) if (new RegExp(`^\\s*${esc(my)}(?!\\p{L})`, 'iu').test(t)) E(`rule 12: ${m} title starts with "${my}" (the reader's own family is K-343)`);
  }
  if (loc === 'fi') for (const [k, v] of Object.entries(JSON.parse(JSON.stringify(block)))) if (JSON.stringify(v).toLowerCase().includes('sukupuu')) E(`rule 12: fi field ${k} contains "sukupuu"`);
  if (loc === 'sv' && JSON.stringify(block).toLowerCase().includes('släktord')) E('rule 12: sv contains "släktord"');
  // rule 13 — one register per page: every word the K faces (base, F2) draw is register K
  for (const p of FAMILY_NEUTRAL.basePaths) { const w = words[kin[p]]; if (w && w.register !== 'K') E(`rule 13: the base word ${w.text} (${p}) is register ${w.register}, the base page is K`); }
  // rule 14
  const ti = strings['tree-template'] && strings['tree-template'].instruction;
  if (ti) for (const f of block.forbiddenInTemplate || []) if (hasToken(ti, f)) E(`rule 14: the template instruction says "${f}" (it presumes a family shape)`);
  // rule 15
  const bans = [...(block.instructionBans || []), 'tick', 'cut', 'colour', 'color'];
  for (const m of MODES) {
    const s = strings[m] && strings[m].instruction;
    if (!s) continue;
    if ([...s].length > 150) E(`rule 15: ${m} instruction ${[...s].length} chars > 150`);
    const stops = (s.match(/[.!?](\s|$)/g) || []).length;
    if (stops !== 1 || !/[.!?]\s*$/.test(s)) E(`rule 15: ${m} instruction is not ONE sentence`);
    for (const b of bans) if (hasToken(s, b)) E(`rule 15: ${m} instruction says "${b}"`);
  }
  // rule 16
  const keys = Object.keys(strings).sort().join(',');
  if (keys !== MODES.slice().sort().join(',')) E(`rule 16: strings keys ${keys} ≠ the six modes`);
  for (const m of MODES) for (const f of ['title', 'instruction']) { const s = strings[m] && strings[m][f]; if (!s) E(`rule 16: strings.${m}.${f} missing`); else if (ANSWER_KEY.test(s)) E(`rule 16: strings.${m}.${f} promises an answer key`); }
  return errs;
}

/* ------------------------------------------------------------------ the run */
let assertions = 0;
const fails = [];
const POISON = { n: 0, killed: 0 };
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const clone = (o) => JSON.parse(JSON.stringify(o));

/** synthetic non-EN blocks for the poisons (FIXTURES — not bank data; the real blocks are the panels') */
function synthetic(loc) {
  const b = clone(FAMILY.en);
  if (loc === 'sv') {
    Object.assign(b.words, { mormor: { text: 'mormor', register: 'K' }, morfar: { text: 'morfar', register: 'K' }, farmor: { text: 'farmor', register: 'K' }, farfar: { text: 'farfar', register: 'K' }, moster: { text: 'moster', register: 'K' }, faster: { text: 'faster', register: 'K' }, morbror: { text: 'morbror', register: 'K' }, farbror: { text: 'farbror', register: 'K' } });
    Object.assign(b.kin, { MM: 'mormor', MF: 'morfar', FM: 'farmor', FF: 'farfar', MZ: 'moster', FZ: 'faster', MB: 'morbror', FB: 'farbror' });
    b.repeatsNote = false;
    b.strings['relation-riddles'].instruction = 'Read each riddle and write the right family word from the box on the line.';   // no repeats → no clause (rule 7)
    b.generationOK = ['mormor', 'morfar', 'farmor', 'farfar', 'mom', 'dad', 'moster', 'faster', 'morbror', 'farbror', 'sister', 'brother', 'cousin'];
    b.distractors = ['mom', 'dad'];
    for (const k of ['grandma', 'grandpa', 'aunt', 'uncle']) delete b.words[k];
    b.names = [{ name: 'Elsa', sex: 'f', gen: 'Elsas' }, { name: 'Maja', sex: 'f', gen: 'Majas' }, { name: 'Alva', sex: 'f', gen: 'Alvas' }, { name: 'Wilma', sex: 'f', gen: 'Wilmas' }, { name: 'Saga', sex: 'f', gen: 'Sagas' }, { name: 'Ella', sex: 'f', gen: 'Ellas' }, { name: 'Nils', sex: 'm', gen: 'Nils' }, { name: 'Olle', sex: 'm', gen: 'Olles' }, { name: 'Liam', sex: 'm', gen: 'Liams' }, { name: 'Alvin', sex: 'm', gen: 'Alvins' }, { name: 'Hugo', sex: 'm', gen: 'Hugos' }, { name: 'Viggo', sex: 'm', gen: 'Viggos' }];
  }
  return b;
}

async function main() {
  const quick = process.argv.includes('--quick');
  // 1. the en bank
  const enErr = validateBank(FAMILY.en, 'en');
  ok(enErr.length === 0, `validateBank(en): ${enErr.join(' | ')}`);
  console.log(`validateBank(en): ${enErr.length ? enErr.length + ' errors' : 'clean'}`);
  const svErr = validateBank(synthetic('sv'), 'sv');
  ok(svErr.length === 0, `validateBank(synthetic sv control): ${svErr.join(' | ')}`);

  const TYPE = require('../types/k/K-370-family.js');
  ok(TYPE.i18n.en.title === FAMILY.en.strings.base.title && TYPE.i18n.en.instruction === FAMILY.en.strings.base.instruction, 'the spec i18n.en ≠ the bank strings.base');

  // 2. the primitive gates (node passes)
  const { execFileSync } = require('child_process');
  for (const g of ['verify-b5-family-figure.js', 'verify-b5-family-tree.js']) {
    let outp = '', code = 0;
    try { outp = execFileSync(process.execPath, [path.join(__dirname, g), '--no-render'], { encoding: 'utf8' }); } catch (e) { outp = String(e.stdout || '') + String(e.stderr || ''); code = e.status || 1; }
    ok(code === 0 && /PASS/.test(outp), `${g} failed:\n${outp.split('\n').slice(-6).join('\n')}`);
    console.log(`${g}: ${(outp.match(/\d+ assertions, \d+ failures/) || ['?'])[0]}`);
  }

  // 3-5 renders
  const puppeteer = require('puppeteer');
  const { renderInstance } = require('../render/render-instance.js');
  const { buildPage } = require('../page/shell.js');
  const { runLints } = require('../qa/lints.js');
  const { makeRng } = require('../lib/rng.js');
  const { checkFigure } = require('./verify-b5-family-figure.js');
  const OUT = path.join(__dirname, '..', 'out', 'dev');
  const CODE_HEX = Object.values(tokens.codeColors).map((c) => c.toUpperCase());
  const CHROME = {
    one: { title: 'Family', instruction: 'Write each number.' },
    three: { title: 'Family Members on the Family Tree: Who Is Who? Find Each Person and Write', instruction: 'Look at every person on the family tree and find the number on the frame. Then write that number in the empty box next to the family word that names the person.' },
    four: { title: 'Perheenjäsenet sukulaisten kuvissa: kuka on kuka? Etsi jokainen henkilö ja kirjoita hänen numeronsa', instruction: 'Look at every person on the family tree and find the number on the frame. Then write that number in the empty box next to the family word that names the person.' },
  };

  const measure = async (page) => page.evaluate((CODE_HEX) => {
    const r = (e) => e.getBoundingClientRect();
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot'), title = document.querySelector('.ws-title'), ins = document.querySelector('.ws-instruction');
    // the bust's BOX (its height attribute through the stage CTM); a nested <svg>'s client rect is only its ink bbox
    const figs = [...document.querySelectorAll('svg[data-lcs-figure]')].map((s) => (s.ownerSVGElement ? s.height.baseVal.value * s.ownerSVGElement.getScreenCTM().d : s.getBoundingClientRect().height));
    const inks = [...document.querySelectorAll('svg[data-lcs-figure]')].map((s) => r(s).height);
    const frames = [...document.querySelectorAll('rect[data-lcs-frame]')].map((s) => r(s).width);
    const chips = [...document.querySelectorAll('[data-lcs-chip-text]')].map((c) => ({ h: r(c).height, clip: c.scrollWidth > c.clientWidth + 0.5 }));
    const boxes = [...document.querySelectorAll('[data-lcs-kinbox]')].map((b) => ({ w: r(b).width, h: r(b).height }));
    let minFont = Infinity, lowest = 0;
    document.querySelectorAll('.ws-body *').forEach((el) => {
      const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom;
      if (el.childNodes && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) {
        const fs = el.tagName.toLowerCase() === 'text' ? +el.getAttribute('font-size') : parseFloat(getComputedStyle(el).fontSize);
        minFont = Math.min(minFont, fs);
      }
    });
    const html = document.querySelector('.ws-body').innerHTML.toUpperCase();
    // FILL: the lowest drawn box INSIDE the family root (the root itself is height:100% and would always read 100 %)
    const fr = document.querySelector('[data-lcs-family]');
    const content = fr ? [...fr.querySelectorAll('*')].filter((e) => !e.hasAttribute('data-lcs-gap')).reduce((mx, e) => { const b = r(e); return b.width && b.height ? Math.max(mx, b.bottom) : mx; }, 0) : 0;
    return { body: r(body).height, bodyTop: r(body).top, bodyBottom: r(body).bottom, content, foot: r(foot).top, lowest, figs, inks, frames, chips, boxes, minFont, imgs: document.querySelectorAll('.ws-body img').length,
      code: CODE_HEX.filter((h) => html.includes(h)), title: title.textContent.trim(), instruction: ins.textContent.trim(), titleH: r(title).height,
      // SPARSE: the blank bands between consecutive blocks (body top -> stage, stage -> word block); slack belongs BELOW
      bands: (() => { const st = document.querySelector('[data-lcs-stage]'), bl = document.querySelector('[data-lcs-kinblock]'); if (!st || !bl) return null;
        const bt = r(body).top, s = r(st), k = r(bl); return [s.top - bt, k.top - s.bottom]; })(),
      // ORPHAN: the number of words on each rendered title line (an NBSP binds two words into one)
      titleLines: (() => { const lines = []; const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT); let node; const words = [];
        while ((node = walker.nextNode())) { const re = /\S+/g; /* \s includes NBSP: "Who Is Who?" counts as three words even when bound */ let mm; while ((mm = re.exec(node.textContent))) { const rg = document.createRange(); rg.setStart(node, mm.index); rg.setEnd(node, mm.index + mm[0].length);
          const rects = [...rg.getClientRects()]; for (const rc of rects) words.push({ top: Math.round(rc.top) }); } }
        for (const w of words) { let l = lines.find((x) => Math.abs(x.top - w.top) < 6); if (!l) { l = { top: w.top, n: 0 }; lines.push(l); } l.n++; }
        return lines.map((l) => l.n); })() };
  }, CODE_HEX);

  const SPARSE_MAX = 40;
  const sparseFails = (m, tag) => {
    const f = [];
    if (!m.bands) return [`${tag}: SPARSE — no stage / word block measured`];
    const [top, mid] = m.bands;
    if (Math.max(top, mid) > SPARSE_MAX) f.push(`${tag}: SPARSE — a ${Math.round(Math.max(top, mid))} px blank band between blocks (> ${SPARSE_MAX}; the slack must fall below the word block)`);
    if (Math.min(top, mid) < -0.5) f.push(`${tag}: OVERLAP — the word block rides ${Math.round(-Math.min(top, mid))} px into the stage`);
    return f;
  };
  /** base FILL (review round 1: the K-370 en page left its bottom band blank): the content reaches >= 85 % of the body
   *  at the 814 chrome and stays inside the body at 677 (the faces' rule, applied to the shipped base) */
  const BASE_FILL_MIN = 0.85;
  const baseFillFails = (m, tag, k) => {
    const f = [], frac = (m.content - m.bodyTop) / m.body;
    if (k === 'one' && frac < BASE_FILL_MIN - 1e-6) f.push(`${tag}: FILL — the content ends at ${(frac * 100).toFixed(1)} % of the ${Math.round(m.body)} px body (< ${BASE_FILL_MIN * 100} %)`);
    if (m.content > m.bodyBottom + 0.5) f.push(`${tag}: FILL — the content runs ${Math.round(m.content - m.bodyBottom)} px past the body`);
    return f;
  };
  const orphanFails = (m, tag) => (m.titleLines.length > 1 && m.titleLines.some((n) => n === 1) ? [`${tag}: ORPHAN — the title wraps into lines of ${m.titleLines.join('/')} words (a lone word on a line)`] : []);
  /** fill <-> sex across pages: a fill used by one sex only (anywhere) can carry sex */
  const garmentSexFails = (htmls) => {
    const bySex = {};
    for (const h of htmls) for (const m of h.matchAll(/data-lcs-sex="([fm])"[^>]*data-lcs-tint="[^"]*"[^>]*>(?:(?!<\/svg>)[\s\S])*?<path d="[^"]+" fill="(#[0-9A-Fa-f]{6})"[^>]*data-lcs-garment=""/g)) (bySex[m[2].toUpperCase()] = bySex[m[2].toUpperCase()] || new Set()).add(m[1]);
    const n = Object.keys(bySex).length;
    if (!n) return ['GARMENT: no garment measured (needle matched nothing)'];
    return Object.entries(bySex).filter(([, s]) => s.size < 2).map(([f, s]) => `GARMENT: fill ${f} is worn only by sex ${[...s][0]} across ${htmls.length} pages`);
  };
  const floors = (m, tag) => {
    for (const x of [...sparseFails(m, tag), ...orphanFails(m, tag)]) ok(false, x);
    ok(m.figs.length >= 4 && Math.min(...m.figs) >= 72 - 0.6, `${tag}: a bust ${Math.min(...m.figs).toFixed(1)} px < 72`);
    ok(Math.min(...m.frames) >= 80 - 0.6, `${tag}: a frame ${Math.min(...m.frames).toFixed(1)} wide < 80`);
    ok(m.chips.length >= 3 && m.chips.every((c) => c.h >= 56 - 0.6 && !c.clip), `${tag}: a chip < 56 tall or clipped`);
    ok(m.boxes.length === m.chips.length && m.boxes.every((b) => Math.abs(b.w - 64) < 1 && Math.abs(b.h - 56) < 1), `${tag}: a numeral box ≠ 64 x 56`);
    ok(m.minFont >= 16 - 0.01, `${tag}: body text ${m.minFont} px < 16`);
    ok(m.lowest <= m.foot + 0.5, `${tag}: content reaches the footer (${m.lowest.toFixed(1)} > ${m.foot.toFixed(1)})`);
    ok(m.imgs === 0, `${tag}: ${m.imgs} <img> on the page`);
    ok(m.code.length === 0, `${tag}: codeColors ${m.code.join(',')} on the page`);
  };
  const figuresOk = (html, tag) => {
    const svgs = [...html.matchAll(/<svg [^>]*data-lcs-figure=""[^>]*>[\s\S]*?<\/svg>/g)].map((x) => x[0]);
    ok(svgs.length >= 4, `${tag}: ${svgs.length} figures parsed`);
    const f = [];
    for (const s of svgs) {
      const age = /data-lcs-age="([^"]+)"/.exec(s)[1], sex = /data-lcs-sex="([^"]+)"/.exec(s)[1], look = /data-lcs-look="([^"]+)"/.exec(s)[1];
      f.push(...checkFigure(s.replace(/^<svg x="[^"]+" y="[^"]+" /, '<svg '), { age, sex, look }));
    }
    return f;
  };

  const browser = await puppeteer.launch({ headless: 'new' });
  try {
    const page = await browser.newPage();
    const render = async (d, opts = {}) => {
      const out = await renderInstance({ type: TYPE, theme: null, difficulty: d, locale: 'en', page, outDir: OUT, baseName: opts.baseName || `K-370-gate-d${d}-en`, strings: opts.strings, variant: opts.variant });
      const m = await measure(page);
      return { ...out, m };
    };
    /** render an arbitrary body (the render poisons) through the real shell + fonts */
    const renderBody = async (bodyHtml, baseName, strings) => {
      const S = strings || TYPE.i18n.en;
      const html = buildPage({ title: S.title, instruction: S.instruction, bodyHtml, locale: 'en', pageSize: 'letter' });
      const f = path.join(OUT, baseName + '.html');
      fs.writeFileSync(f, html);
      await page.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
      await page.goto(url.pathToFileURL(f).href, { waitUntil: 'networkidle0' });
      await page.evaluate(() => document.fonts.ready);
      const v = await TYPE.verify(page);
      const lints = await runLints(page, { gradeBand: 'K' });
      const m = await measure(page);
      fs.unlinkSync(f);
      return { v, lints, m };
    };

    // 3. d1 / d2 / d3 + the two long chromes
    for (const d of [1, 2, 3]) {
      const r = await render(d);
      ok(r.qa.verify.length === 0, `d${d}: verify ${JSON.stringify(r.qa.verify)}`);
      ok(r.qa.lints.length === 0, `d${d}: lints ${JSON.stringify(r.qa.lints)}`);
      floors(r.m, `d${d}`);
      ok(r.m.title === FAMILY.en.strings.base.title && r.m.instruction === FAMILY.en.strings.base.instruction, `d${d}: the printed chrome ≠ the bank strings.base`);
      const ff = figuresOk(r.html, `d${d}`);
      ok(ff.length === 0, `d${d}: figure rules ${ff.join(' | ')}`);
      console.log(`render d${d} en: title lines ${r.m.titleLines.join('/')} words, bands ${r.m.bands.map(Math.round).join('/')} px, verify ${r.qa.verify.length} lints ${r.qa.lints.length} body ${Math.round(r.m.body)} stack ${r.meta.stackH} busts ${Math.min(...r.m.figs).toFixed(0)} (ink ${Math.min(...r.m.inks).toFixed(0)}) grand ${r.meta.grandSide || '-'} asked ${r.meta.asked.join('/')} answers ${r.meta.answers.join(',')} → ${r.pngPath}`);
    }
    for (const [k, s] of Object.entries(CHROME)) {
      const r = await render(2, { strings: s, baseName: `K-370-gate-d2-en-chrome-${k}` });
      const want = { one: 814, three: 722, four: 677 }[k];
      ok(Math.abs(r.m.body - want) <= 12, `chrome ${k}: body ${Math.round(r.m.body)} (want ~${want})`);
      ok(r.qa.verify.length === 0 && r.qa.lints.length === 0, `chrome ${k}: verify ${JSON.stringify(r.qa.verify)} lints ${JSON.stringify(r.qa.lints)}`);
      floors(r.m, `chrome ${k}`);
      for (const x of baseFillFails(r.m, `chrome ${k}`, k)) ok(false, x);
      console.log(`render d2 en chrome ${k}: fill ${(((r.m.content - r.m.bodyTop) / r.m.body) * 100).toFixed(1)}% bands ${r.m.bands.map(Math.round).join('/')} body ${Math.round(r.m.body)} (title ${Math.round(r.m.titleH)} px) stack ${r.meta.stackH} lowest ${Math.round(r.m.lowest)} foot ${Math.round(r.m.foot)} verify ${r.qa.verify.length} lints ${r.qa.lints.length} → ${r.pngPath}`);
    }

    // 4. the seed sweep
    if (!quick) {
      const pos = {};
      const sides = new Set();
      const htmls = [];
      let n = 0;
      for (let v = 1; v <= 20; v++) {
        const r = await render(2, { variant: v, baseName: `K-370-gate-sweep-v${v}` });
        ok(r.qa.verify.length === 0 && r.qa.lints.length === 0, `sweep v${v}: verify ${JSON.stringify(r.qa.verify)} lints ${JSON.stringify(r.qa.lints)}`);
        floors(r.m, `sweep v${v}`);
        sides.add(r.meta.grandSide);
        htmls.push(r.html);
        r.meta.answers.forEach((a, i) => { const k = i + ':' + a; pos[k] = (pos[k] || 0) + 1; });
        ok(r.meta.answers.join(',') !== r.meta.reading.join(','), `sweep v${v}: the answer column repeats the reading order`);
        fs.unlinkSync(r.pdfPath); fs.unlinkSync(r.pngPath); fs.unlinkSync(path.join(OUT, `K-370-gate-sweep-v${v}.html`));
        n++;
      }
      const worst = Object.entries(pos).sort((a, b) => b[1] - a[1])[0];
      ok(worst[1] / n <= 0.4, `sweep: box ${worst[0].split(':')[0]} holds answer ${worst[0].split(':')[1]} on ${worst[1]}/${n} seeds (> 40 %)`);
      const gs = garmentSexFails(htmls);
      ok(gs.length === 0, `sweep: ${gs.join(' | ')}`);
      console.log(`sweep garment fill <-> sex: ${gs.length ? gs.join(' | ') : 'every fill worn by both sexes'}`);
      ok(sides.size === 2, `sweep: grand sides ${[...sides].join(',')} (want both M and F)`);
      console.log(`sweep d2 x ${n} seeds: verify clean, grand sides {${[...sides].join(',')}}, worst box/answer ${worst[0]} on ${worst[1]}/${n}`);
    }

    // 5. POISONS
    const expectFail = (name, errs, re) => {
      const hit = errs.find((e) => re.test(e));
      POISON.n++; if (hit) POISON.killed++;
      ok(!!hit, `poison ${name} did not fail for its reason (got ${JSON.stringify(errs).slice(0, 300)})`);
      console.log(`poison ${name}: ${hit ? 'FAILED as required — ' + hit : 'SILENT'}`);
    };
    const expectThrow = (name, fn, re) => {
      let msg = null; try { fn(); } catch (e) { msg = e.message; }
      POISON.n++; if (msg && re.test(msg)) POISON.killed++;
      ok(msg && re.test(msg), `poison ${name}: ${msg ? 'threw for the wrong reason: ' + msg : 'did not throw'}`);
      console.log(`poison ${name}: ${msg && re.test(msg) ? 'FAILED as required — ' + msg : 'SILENT'}`);
    };
    const en = FAMILY.en;
    // P1
    expectFail('P1 both grand couples', TYPE.uniqueReferents(['M', 'F', 'MM', 'MF', 'FM', 'FF', '', 'Z'].map((p) => ({ path: p })), en.kin, ['grandma', 'grandpa', 'mom', 'dad', 'sister']), /"grandma" names 2 people/);
    // P2
    expectThrow('P2 one-parent graph', () => TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('p2') }, { compose: () => ({ persons: [{ id: 'a', path: 'M', sex: 'f', age: 'adult', look: 'bun' }, { id: 'b', path: '', sex: 'f', age: 'child', look: 'bun' }, { id: 'c', path: 'Z', sex: 'f', age: 'child', look: 'pigtails' }], grandSide: null }) }), /conventional family/);
    // P3
    expectFail('P3 brother + By with only a baby', TYPE.uniqueReferents(['M', 'F', 'MM', 'MF', '', 'By'].map((p) => ({ path: p })), en.kin, ['brother', 'babyBrother']), /"brother" names 0 people/);
    // P4 / P5 (F3 page rule)
    const f3 = [
      { path: 'MM', sex: 'f', age: 'elder', name: 'Leo', nameSex: 'm' }, { path: 'MF', sex: 'm', age: 'elder', name: 'Tom', nameSex: 'm' },
      { path: 'MB', sex: 'm', age: 'adult', name: 'Max', nameSex: 'm' }, { path: 'F', sex: 'm', age: 'adult', name: 'Ben', nameSex: 'm' },
      { path: 'M', sex: 'f', age: 'adult', name: 'Anna', nameSex: 'f', given: true }, { path: '', sex: 'f', age: 'child', name: 'Mia', nameSex: 'f', given: true },
    ];
    const f3clues = [{ path: 'MM', text: "Leo is Mia's grandma." }, { path: 'MF', text: "Tom is Mia's grandpa." }, { path: 'MB', text: "Max is Mia's uncle." }, { path: 'F', text: "Ben is Mia's dad." }];
    const ctrl6 = checkClueTree({ plates: f3.map((p, i) => (i === 0 ? { ...p, name: 'Zoe', nameSex: 'f' } : p)), clues: f3clues.map((c, i) => (i === 0 ? { ...c, text: "Zoe is Mia's grandma." } : c)) });
    ok(ctrl6.length === 0, `P4/P5 control: ${ctrl6.join(' | ')}`);
    expectFail('P4 Leo (m) on a grandmother plate', checkClueTree({ plates: f3, clues: f3clues }), /rule 6: Leo \(m\) sits on a f plate/);
    expectFail('P5 four different (age, sex) cells', checkClueTree({ plates: [{ ...f3[0], name: 'Zoe', nameSex: 'f' }, f3[1], f3[2], { path: 'Z', sex: 'f', age: 'child', name: 'Ava', nameSex: 'f' }, f3[4], f3[5]], clues: [f3clues[0], f3clues[1], f3clues[2], { path: 'Z', text: "Ava is Mia's sister." }] }), /no same-\(age, sex\) pair/);
    // P6 / P7
    ok(checkGenRow(['grandma', 'mom', 'sister'], en.kin).length === 0, 'P6 control row fails');
    expectFail('P6 row grandma · grandpa · cousin', checkGenRow(['grandma', 'grandpa', 'cousin'], en.kin), /repeats a generation/);
    { const b = clone(en); b.words.cousin.text = 'neef'; expectFail('P7 nl generationOK with neef', validateBank(b, 'nl'), /rule 8: nl "neef" is generation-ambiguous/); }
    // P8 / PR5
    { const b = clone(en); b.words.sister.text = 'sœur'; expectFail('P8 fr F2 badge on sœur', validateBank(b, 'fr'), /rule 9: fr "sœur" is not traceable/); }
    ok(f2GlyphH('Schwester') >= 40 - 1e-6, `PR5 control: Schwester in the 321 lane resolves ${f2GlyphH('Schwester').toFixed(1)}`);
    { const g = f2GlyphH('Schwester', { w: 250 }); ok(g < 40, `PR5 Schwester in a 250 lane holds ${g.toFixed(1)}`); console.log(`poison PR5 de Schwester in a 250 px lane: ${g < 40 ? 'FAILED as required — glyphH ' + g.toFixed(1) + ' < 40 (321 lane: ' + f2GlyphH('Schwester').toFixed(1) + ')' : 'SILENT'}`); }
    // P9 / P10
    { const b = clone(en); b.riddleFrames.MM = "La mère de la mère de Léa est ma ___."; expectFail('P9 fr "… est ma ___."', validateBank(b, 'fr'), /rule 10: fr frame MM puts "ma"/); }
    { const b = clone(en); b.riddleFrames.MM = "My mom's mom is my ___."; expectFail('P10 en first-person riddle', validateBank(b, 'en'), /rule 11: en frame MM is first person/); }
    // P11
    { const b = clone(en); b.strings['tree-clues'].title = 'Sukupuu: lue vihjeet'; expectFail('P11 fi title "Sukupuu"', validateBank(b, 'fi'), /rule 12: fi .*sukupuu|rule 12: fi field strings contains "sukupuu"/i); }
    // P12
    { const b = synthetic('sv'); b.kin.MM = 'farmor'; expectFail('P12 sv kin.MM = farmor', validateBank(b, 'sv'), /rule 2: sv kin\.MM = "farmor" does not start "mo"/); }
    // P13
    { const b = clone(en); b.strings['tree-template'].instruction = 'Draw your mom and dad.'; expectFail('P13 F5 "Draw your mom and dad."', validateBank(b, 'en'), /rule 14: the template instruction says "mom"/); }
    // P14 (validator + the build refuses the mixed page)
    { const b = clone(en); b.words.grandpa = { text: 'Großvater', register: 'G2' }; expectFail('P14 de Oma + Großvater', validateBank(b, 'de'), /rule 13: the base word Großvater/);
      expectThrow('P14 the build refuses the mixed page', () => { for (let s = 0; s < 40; s++) TYPE._buildWith(b, TYPE.difficulty[2], { locale: 'de' }, { rng: makeRng('p14-' + s) }); }, /mix registers/); }
    // P15
    { const b = clone(en); b.distractors = ['grandma', 'dad']; expectFail('P15 F4 distractor grandma', validateBank(b, 'en'), /rule 7: .*(distractor grandma fits a riddle|repeats a word)/); }
    // P16
    { const b = clone(en); b.names[0] = { name: 'Mia', sex: 'f', gen: 'di Mia' }; expectFail('P16 it name "Mia"', validateBank(b, 'it'), /rule 3: name "Mia" is also a word \/ frame token in it/); }
    // a locale the panels have not authored REFUSES (never an en fallback)
    // the de block is HIDDEN for the probe (all 11 locales are authored; qa/b5-unauthored.js), and the authored
    // de page must fail the same check (a build that does not throw is never a refusal)
    {
      const U = require('./b5-unauthored.js');
      const buildDe = () => TYPE.build({ theme: null, difficulty: 2, locale: 'de' }, { rng: makeRng('de') });
      expectThrow('refusal: the de block is absent', () => U.withLocaleHidden('family', 'de', buildDe), /has no de block/);
      const real = U.msgOf(buildDe);
      ok(!U.refused(real, /has no de block/), `poison — the authored de page passed the absent-block refusal check (got ${real})`);
    }
    // PR7 — the guard keys on the RESOLVED config: a face config fed to the base builds THAT face (stamped), never the
    //        base under a face's name; an unknown mode throws (a guard written `difficulty === 2` would be blind to both)
    { const b7 = TYPE._buildWith(en, { ...TYPE.difficulty[2], mode: 'generations', rows: 6, minSideline: 4, maxPerSlot: 3, legend: [170, 110], legendPx: 88, rowH: 60, rowGap: 8, chipPx: 20, box: [52, 48] }, { locale: 'en' }, { rng: makeRng('pr7') });
      ok(/data-lcs-mode="generations"/.test(b7.bodyHtml) && !/data-lcs-kinblock/.test(b7.bodyHtml), 'PR7: a generations config rendered the base');
      console.log('PR7 control: a generations config builds the generations face (data-lcs-mode="generations", no base word block)'); }
    expectThrow('PR7 an unknown mode fed to the base', () => TYPE._buildWith(en, { ...TYPE.difficulty[2], mode: 'bogus' }, { locale: 'en' }, { rng: makeRng('pr7') }), /unknown mode "bogus"/);
    // the render poisons: the d2 page, doctored
    const base = TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('K-370|none|2|1') });
    const ctl = await renderBody(base.bodyHtml, 'K-370-gate-poison-control');
    ok(ctl.v.length === 0 && ctl.lints.length === 0, `render-poison control: verify ${JSON.stringify(ctl.v)} lints ${JSON.stringify(ctl.lints)}`);
    // PR1
    { const bad = base.bodyHtml.replace('<g data-lcs-tree=""', `<g data-lcs-tree=""><text x="40" y="440" font-size="18" fill="${tokens.color.ink}">grandma</text>`).replace('<g data-lcs-tree=""><text', '<g data-lcs-tree=""><text');
      ok(bad !== base.bodyHtml, 'PR1 needle matched nothing'); const r = await renderBody(bad, 'K-370-gate-pr1'); expectFail('PR1 a kin word under a frame', r.v, /stage text "grandma"|a kin word "grandma"/); }
    // PR2 — badges by generation (1-2 grand, 3-4 parents, 5 sibling)
    { const b2 = TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('K-370|none|2|1') }, { badges: (nonEgo) => { const order = nonEgo.slice().sort((a, b) => FT.genOf(a.path) - FT.genOf(b.path)); return Object.fromEntries(order.map((p, i) => [p.id, i + 1])); } });
      const r = await renderBody(b2.bodyHtml, 'K-370-gate-pr2'); expectFail('PR2 badge order monotone by generation', r.v, /monotone in generation/); }
    // PR3 — swap the two children's drops' x (each drop now lands on the OTHER child's frame top: stamps unchanged) and re-hang one on the grand bar
    { const drops = [...base.bodyHtml.matchAll(/<line x1="([^"]+)" y1="([^"]+)" x2="\1" y2="([^"]+)"[^>]*data-lcs-conn="drop"\/>/g)];
      const bars = [...base.bodyHtml.matchAll(/<line x1="([^"]+)" y1="([^"]+)" x2="([^"]+)" y2="\2"[^>]*data-lcs-conn="couple"\/>/g)].map((m) => ({ x1: +m[1], y: +m[2], x2: +m[3] })).sort((a, b) => a.y - b.y);
      const gb = bars[0], gx = (gb.x1 + gb.x2) / 2;
      const d0 = drops[0];
      const ry = +d0[3] - 8;
      const bad = base.bodyHtml.replace(d0[0], `<line x1="${gx}" y1="${gb.y}" x2="${gx}" y2="${ry}" stroke="#146B5E" stroke-width="3" data-lcs-conn="drop"/><line x1="${Math.min(gx, +d0[1])}" y1="${ry}" x2="${Math.max(gx, +d0[1])}" y2="${ry}" stroke="#146B5E" stroke-width="3" data-lcs-conn="sibling"/><line x1="${d0[1]}" y1="${ry}" x2="${d0[1]}" y2="${d0[3]}" stroke="#146B5E" stroke-width="3" data-lcs-conn="drop"/>`);
      ok(drops.length === 2 && bad !== base.bodyHtml, `PR3 needle: ${drops.length} drops`);
      const r = await renderBody(bad, 'K-370-gate-pr3'); expectFail('PR3 a child re-hung from the grand bar', r.v, /the drawn lines give (ego|Z|B) the parents \[(FF\+FM|MF\+MM)\], the graph says \[F\+M\]/); }
    // PR4 — an f look whose hair stops at y 62, on the page
    { const f0 = figuresOk(base.bodyHtml, 'PR4 control'); ok(f0.length === 0, `PR4 control: ${f0.join(' | ')}`);
      // a generic poison: cap the lowest point of every hair path on the first adult f figure at y 62
      const m = /<svg [^>]*data-lcs-age="adult" data-lcs-sex="f"[^>]*>[\s\S]*?<\/svg>/.exec(base.bodyHtml);
      const bad = m[0].replace(/(<(?:path|circle|ellipse)[^>]*data-lcs-hair=""\/>)/g, '').replace('<ellipse cx="50" cy="44"', `<path d="M 28 40 C 27 15 40 12 50 12 C 60 12 73 15 72 40 L 72 62 L 28 62 Z" fill="${tokens.color.ink}" stroke="${tokens.color.teal}" stroke-width="3" data-lcs-hair=""/><ellipse cx="50" cy="44"`);
      expectFail('PR4 an f look with hair to y 62 on the page', figuresOk(base.bodyHtml.replace(m[0], bad), 'PR4'), /f hair reaches y 62/); }
    // PR8 — a codeColors fill
    { const bad = base.bodyHtml.replace(`fill="${tokens.color.tealSoft}" data-lcs-crown=""`, `fill="${tokens.codeColors.codeRed}" data-lcs-crown=""`);
      ok(bad !== base.bodyHtml, 'PR8 needle matched nothing'); const r = await renderBody(bad, 'K-370-gate-pr8');
      ok(r.m.code.length > 0, `PR8 a codeColors fill passed the gate's palette ban (lints: ${JSON.stringify(r.lints)})`);
      console.log(`poison PR8 a codeColors fill: ${r.m.code.length ? 'FAILED as required — codeColors ' + r.m.code.join(',') + ' on the page (qa/lints.js alone: ' + (r.lints.length ? 'fails' : 'PASSES — it whitelists codeColors') + ')' : 'SILENT'}`); }
    // SP1 / SP2 — the sparse check, both ways (the 814 one-line chrome has the most slack)
    { const ctl1 = await renderBody(base.bodyHtml, 'K-370-gate-sp-control', CHROME.one);
      ok(sparseFails(ctl1.m, 'SP control').length === 0, `SP control fails: ${sparseFails(ctl1.m, 'SP control').join(' | ')}`);
      const even = base.bodyHtml.replace('justify-content:flex-start', 'justify-content:space-evenly');
      ok(even !== base.bodyHtml, 'SP1 needle matched nothing');
      expectFail('SP1 slack spread evenly (814 chrome)', sparseFails((await renderBody(even, 'K-370-gate-sp1', CHROME.one)).m, 'SP1'), /SPARSE — a \d+ px blank band/);
      const over = base.bodyHtml.replace('<div style="flex:0 0 auto"><div class="fam-kinblock"', '<div style="flex:0 0 auto;margin-top:-80px"><div class="fam-kinblock"');
      ok(over !== base.bodyHtml, 'SP2 needle matched nothing');
      expectFail('SP2 the word block ridden into the stage', sparseFails((await renderBody(over, 'K-370-gate-sp2')).m, 'SP2'), /OVERLAP/); }
    // FB1 / FB2 — the base FILL, both ways: the growing stage->words gap made rigid ends high at 814; an over-tall stage overruns at 677
    { const ctlF = await renderBody(base.bodyHtml, 'K-370-gate-fill-control', CHROME.one);
      ok(baseFillFails(ctlF.m, 'FB control', 'one').length === 0, `FB control fails: ${baseFillFails(ctlF.m, 'FB control', 'one').join(' | ')}`);
      const rigid = base.bodyHtml.split('flex:1 1 ').join('flex:0 0 ');
      ok(rigid !== base.bodyHtml, 'FB1 needle matched nothing');
      expectFail('FB1 the stage->words gap does not grow (814 chrome)', baseFillFails((await renderBody(rigid, 'K-370-gate-fb1', CHROME.one)).m, 'FB1', 'one'), /FILL — the content ends at/);
      const tall = base.bodyHtml.replace(/min-height:12px/, 'min-height:80px').replace(/flex:1 1 12px/, 'flex:1 1 80px');
      ok(tall !== base.bodyHtml, 'FB2 needle matched nothing');
      expectFail('FB2 the stack too tall for the 677 chrome', baseFillFails((await renderBody(tall, 'K-370-gate-fb2', CHROME.four)).m, 'FB2', 'four'), /runs [0-9]+ px past the body/); }
    // T1 — the orphan guard is page.css `.ws-title { text-wrap: balance }` (the NBSPs were removed: they leaked into SEO strings).
    //      Poison = the same title with the balance rule overridden → must ORPHAN; control = shipped CSS → no orphan; the title carries no U+00A0.
    { ok(!/ /.test(TYPE.i18n.en.title), 'T1: the title carries a U+00A0 (it would leak into SEO strings)');
      ok(orphanFails(ctl.m, 'T1 control').length === 0, `T1 control: ${ctl.m.titleLines.join('/')}`);
      const unbalanced = base.bodyHtml + '<style>.ws-title{text-wrap:wrap !important}</style>';
      expectFail('T1 the title without balanced wrapping', orphanFails((await renderBody(unbalanced, 'K-370-gate-t1')).m, 'T1'), /ORPHAN/); }
    // GC1 — look-bound garment tints (the reviewed defect: the grandmother alone in coralSoft) → verify's one-fill-per-row rule
    { const FFm = require('../primitives/family-figure.js');
      const b1 = TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('K-370|none|2|1') }, { compose: (d, rng) => { const c = TYPE._compose(d, rng); for (const p of c.persons) p.tint = FFm.LOOKS[p.age][p.sex][p.look].tint; return c; } });
      expectFail('GC1 look-bound garment tints', (await renderBody(b1.bodyHtml, 'K-370-gate-gc1')).v, /garment fills differ within a generation row/); }
    // OS1 — landing review 2026-09-23: the older sibling drawn the same size as the ego (the shipped control above passes)
    { const b1 = TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('K-370|none|2|1') }, { sameSize: true });
      expectFail('OS1 the older sister / brother drawn the same size as the child', (await renderBody(b1.bodyHtml, 'K-370-gate-os1')).v, /not taller than the ego/); }
    // GC2 — sex-keyed fills across 20 builds → the sweep's fill <-> sex check
    { const hs = [], ctlH = [];
      for (let v = 1; v <= 20; v++) {
        hs.push(TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('gc2-' + v) }, { compose: (d, rng) => { const c = TYPE._compose(d, rng); for (const p of c.persons) p.tint = p.sex === 'f' ? 'coralSoft' : 'tealSoft'; return c; } }).bodyHtml);
        ctlH.push(TYPE._buildWith(en, TYPE.difficulty[2], { locale: 'en' }, { rng: makeRng('gc2-' + v) }).bodyHtml);
      }
      ok(garmentSexFails(ctlH).length === 0, `GC2 control: ${garmentSexFails(ctlH).join(' | ')}`);
      expectFail('GC2 sex-keyed garment fills', garmentSexFails(hs), /GARMENT: fill #F.* only by sex f/); }
    await faceGate({ page, render: null, renderBody, measure, expectFail, expectThrow, ok, CHROME, OUT, quick, garmentSexFails });
  } finally { await browser.close(); }

  console.log(`verify-b5-family: ${assertions} assertions, ${fails.length} failures`);
  if (fails.length) { for (const f of fails.slice(0, 40)) console.log('  FAIL ' + f); console.log(`FAIL (${assertions} assertions, ${fails.length} failures, ${POISON.killed}/${POISON.n} poisons killed)`); process.exit(1); }
  console.log(`PASS (${assertions} assertions, ${POISON.killed}/${POISON.n} poisons killed)`);
}

/* ================================================================== THE FIVE FACES (Phase E, 2026-09-23) */
const FACES = [
  { id: 'G1-385', mode: 'generations', band: 'G1' },
  { id: 'K-375', mode: 'trace-words', band: 'K' },
  { id: 'G1-386', mode: 'tree-clues', band: 'G1' },
  { id: 'G2-362', mode: 'relation-riddles', band: 'G2' },
  { id: 'G1-387', mode: 'tree-template', band: 'G1' },
];
const ELEMENT_FLOOR = { K: 56, G1: 44, G2: 36 };
const B = (w) => new RegExp(`(?<!\\p{L})${w}(?!\\p{L})`, 'iu');
/** the EN apparatus vocabulary: an instruction may name ONLY what its face draws (nt10-E addition 4, the K-369 lesson) */
const APPARATUS = { tree: B('trees?'), box: B('box(?:es)?'), number: B('numbers?'), line: B('lines?'), clue: B('clues?'), riddle: B('riddles?'), frame: B('frames?'),
  word: B('words?'), name: B('names?'), row: B('rows?'), picture: B('pictures?'), card: B('cards?'), chip: B('chips?'), bank: B('bank'), dot: B('dott?(?:ed|s)?'), plate: B('plates?') };
/** what each face draws (the DOM proof that the named apparatus is on THIS page) */
const PRESENT = {
  generations: { row: '[data-lcs-genrow-band]', box: '[data-lcs-genbox]', word: '[data-lcs-genword]', picture: 'svg[data-lcs-genrail] svg[data-lcs-figure]', number: '[data-lcs-gen-disc]' },
  'trace-words': { tree: '[data-lcs-tree]', number: '[data-lcs-disc]', word: '[data-lcs-bank-lane] svg[data-lcs-prim="trace-word"]', line: '[data-lcs-trace-row] svg[data-lcs-prim="trace-word"]' },
  'tree-clues': { tree: '[data-lcs-tree]', clue: '[data-lcs-clue-path]', name: '[data-lcs-plate-for]', box: '[data-lcs-namebox]' },
  'relation-riddles': { riddle: '[data-lcs-riddle]', word: '[data-lcs-bank-word]', box: '[data-lcs-bank-banner]', line: '[data-lcs-riddle-path] svg[data-lcs-prim="writing-row"]' },
  'tree-template': { frame: '[data-lcs-mat]', name: 'svg[data-lcs-nameline]', line: 'svg[data-lcs-nameline]' },
};
const FLOOR_SEL = {
  generations: ['[data-lcs-genword]', '[data-lcs-genbox]'],
  'trace-words': ['[data-lcs-trace-row]', '[data-lcs-bank-lane]'],
  'tree-clues': ['[data-lcs-plate-for]'],
  'relation-riddles': ['[data-lcs-riddle-path]', '[data-lcs-bank-word]'],
  'tree-template': ['svg[data-lcs-nameline]', '[data-lcs-mat]'],
};
function apparatusFails(mode, instruction, present) {
  const f = [];
  for (const [k, re] of Object.entries(APPARATUS)) {
    if (!re.test(instruction)) continue;
    if (!PRESENT[mode][k]) f.push(`APPARATUS: the ${mode} instruction names "${k}", which this face does not draw`);
    else if (present && !present[k]) f.push(`APPARATUS: the ${mode} instruction names "${k}" but the rendered page has none (${PRESENT[mode][k]})`);
  }
  return f;
}

async function faceGate({ page, renderBody, expectFail, expectThrow, ok, CHROME, OUT, quick, garmentSexFails }) {
  const { loadType } = require('../lib/load-types.js');
  const { renderInstance } = require('../render/render-instance.js');
  const { makeRng } = require('../lib/rng.js');
  const TYPE = require('../types/k/K-370-family.js');
  const en = FAMILY.en;
  const CODE_HEX = Object.values(tokens.codeColors).map((c) => c.toUpperCase());
  const measureFace = (mode) => page.evaluate((mode, PRESENT, FLOOR_SEL, CODE_HEX) => {
    const r = (e) => e.getBoundingClientRect();
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
    const title = document.querySelector('.ws-title'), ins = document.querySelector('.ws-instruction');
    const root = document.querySelector('[data-lcs-family]');
    let minFont = Infinity, lowest = 0;
    document.querySelectorAll('.ws-body *').forEach((el) => {
      const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom;
      if ([...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) minFont = Math.min(minFont, el.tagName.toLowerCase() === 'text' ? +el.getAttribute('font-size') : parseFloat(getComputedStyle(el).fontSize));
    });
    const blocks = [...root.querySelectorAll(':scope > [data-lcs-block]')].map((b) => r(b));
    const bands = blocks.length ? [blocks[0].top - r(body).top, ...blocks.slice(1).map((b, i) => b.top - blocks[i].bottom)] : null;
    const floors = {};
    // a nested <svg>'s client rect is its INK bbox: measure its box (height attribute through the owner CTM)
    const hOf = (e) => (e.tagName.toLowerCase() === 'svg' && e.ownerSVGElement ? e.height.baseVal.value * e.ownerSVGElement.getScreenCTM().d : r(e).height);
    for (const sel of FLOOR_SEL[mode]) floors[sel] = Math.min(...[...document.querySelectorAll(sel)].map(hOf));
    const figs = [...document.querySelectorAll('svg[data-lcs-figure]')].map((s) => (s.ownerSVGElement ? s.height.baseVal.value * s.ownerSVGElement.getScreenCTM().d : s.getBoundingClientRect().height));
    const frames = [...document.querySelectorAll('rect[data-lcs-frame]')].map((s) => r(s).width);
    const present = {}; for (const [k, sel] of Object.entries(PRESENT[mode])) present[k] = !!document.querySelector(sel);
    const html = body.innerHTML.toUpperCase();
    const content = [...root.querySelectorAll('*')].reduce((m, el) => { const b = r(el); return b.width && b.height ? Math.max(m, b.bottom) : m; }, 0);
    return { body: r(body).height, bodyTop: r(body).top, bodyBottom: r(body).bottom, content, foot: r(foot).top, lowest, minFont, bands, floors, figs, frames, present, title: title.textContent.trim(), instruction: ins.textContent.trim(),
      imgs: document.querySelectorAll('.ws-body img').length, code: CODE_HEX.filter((h) => html.includes(h)) };
  }, mode, PRESENT, FLOOR_SEL, CODE_HEX);
  const SPARSE_MAX = 40;
  const sparse = (m, tag) => {
    if (!m.bands || !m.bands.length) return [`${tag}: SPARSE — no blocks measured`];
    const f = [];
    if (Math.max(...m.bands) > SPARSE_MAX) f.push(`${tag}: SPARSE — a ${Math.round(Math.max(...m.bands))} px blank band between blocks (> ${SPARSE_MAX})`);
    if (Math.min(...m.bands) < -0.5) f.push(`${tag}: OVERLAP — a block rides ${Math.round(-Math.min(...m.bands))} px into the one above`);
    return f;
  };
  /** FILL (lead note 2026-09-23): the content reaches >= 85 % of the body at the 814 chrome and stays inside it at 677 */
  const FILL_MIN = 0.85;
  const fillFails = (m, tag, k) => {
    const frac = (m.content - m.bodyTop) / m.body;
    const f = [];
    if (k === 'one' && frac < FILL_MIN - 1e-6) f.push(`${tag}: FILL — the content ends at ${(frac * 100).toFixed(1)} % of the ${Math.round(m.body)} px body (< ${FILL_MIN * 100} %)`);
    if (m.content > m.bodyBottom + 0.5) f.push(`${tag}: FILL — the content runs ${Math.round(m.content - m.bodyBottom)} px past the body`);
    return f;
  };
  const faceFloors = (m, face, tag) => {
    for (const x of sparse(m, tag)) ok(false, x);
    const fl = ELEMENT_FLOOR[face.band];
    for (const [sel, h] of Object.entries(m.floors)) {
      const want = sel === '[data-lcs-mat]' ? 44 : fl;   // a mat is a drawing area (>= 96 tree / 72 shelf), a writing element is the band floor
      ok(Number.isFinite(h) && h >= want - 0.6, `${tag}: ${sel} ${Number.isFinite(h) ? h.toFixed(1) : 'none'} px < ${want}`);
    }
    if (face.mode !== 'tree-template') ok(m.figs.length >= 1 && Math.min(...m.figs) >= 72 - 0.6, `${tag}: a bust ${Math.min(...m.figs).toFixed(1)} px < 72`);
    if (m.frames.length) ok(Math.min(...m.frames) >= 80 - 0.6, `${tag}: a frame ${Math.min(...m.frames).toFixed(1)} wide < 80`);
    ok(m.minFont >= 16 - 0.01, `${tag}: text ${m.minFont} px < 16`);
    ok(m.lowest <= m.foot + 0.5, `${tag}: content reaches the footer (${m.lowest.toFixed(1)} > ${m.foot.toFixed(1)})`);
    ok(m.imgs === 0, `${tag}: <img> on the page`);
    ok(m.code.length === 0, `${tag}: codeColors ${m.code.join(',')}`);
  };

  // 0. strings: one source (bank strings.<mode> === the face spec i18n.en === the printed chrome); no NBSP anywhere
  const specs = Object.fromEntries(FACES.map((f) => [f.mode, loadType(f.id)]));
  for (const f of FACES) {
    const sp = specs[f.mode];
    ok(sp.gradeBand === f.band, `${f.id}: gradeBand ${sp.gradeBand} ≠ ${f.band}`);
    ok(sp.difficulty[2].mode === f.mode, `${f.id}: d2 mode ${sp.difficulty[2].mode}`);
    ok(sp.i18n.en.title === en.strings[f.mode].title && sp.i18n.en.instruction === en.strings[f.mode].instruction, `${f.id}: the spec i18n.en ≠ the bank strings.${f.mode}`);
    for (const s of [sp.i18n.en.title, sp.i18n.en.instruction]) ok(!/ /.test(s), `${f.id}: a U+00A0 in "${s}"`);
    ok([...sp.i18n.en.instruction].length <= 150, `${f.id}: instruction > 150 chars`);
    ok(!/(?<!\p{L})(worksheet|free)(?!\p{L})/iu.test(sp.i18n.en.title), `${f.id}: title carries worksheet / free`);
  }

  // 1. renders: d2 en under the default, the 722 (three-line) and the 677 (four-line fi) chromes
  const shots = {};
  for (const f of FACES) {
    const sp = specs[f.mode];
    for (const k of ['default', 'one', 'three', 'four']) {
      const strings = k === 'default' ? undefined : CHROME[k];
      const out = await renderInstance({ type: sp, theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName: k === 'default' ? `${f.id}-gate-d2-en` : `${f.id}-gate-d2-en-chrome-${k}`, strings });
      const m = await measureFace(f.mode);
      const tag = `${f.id} ${f.mode} [${k}]`;
      ok(out.qa.verify.length === 0, `${tag}: verify ${JSON.stringify(out.qa.verify).slice(0, 400)}`);
      ok(out.qa.lints.length === 0, `${tag}: lints ${JSON.stringify(out.qa.lints).slice(0, 300)}`);
      faceFloors(m, f, tag);
      for (const x of fillFails(m, tag, k)) ok(false, x);
      if (k === 'default') {
        ok(m.title === en.strings[f.mode].title && m.instruction === en.strings[f.mode].instruction, `${tag}: the printed chrome ≠ the bank strings`);
        const ap = apparatusFails(f.mode, m.instruction, m.present);
        ok(ap.length === 0, `${tag}: ${ap.join(' | ')}`);
        shots[f.id] = out.pngPath;
      } else ok(Math.abs(m.body - { one: 814, three: 722, four: 677 }[k]) <= 12, `${tag}: body ${Math.round(m.body)}`);
      console.log(`render ${tag}: body ${Math.round(m.body)} stack ${out.meta.stackH}..${out.meta.stackMax} fill ${(((m.content - m.bodyTop) / m.body) * 100).toFixed(1)}% bands ${m.bands.map(Math.round).join('/')} lowest ${Math.round(m.lowest)} foot ${Math.round(m.foot)} floors ${Object.values(m.floors).map((v) => v.toFixed(0)).join('/')} busts ${m.figs.length ? Math.min(...m.figs).toFixed(0) : '-'} minFont ${m.minFont} verify ${out.qa.verify.length} lints ${out.qa.lints.length}` + (k === 'default' ? ` → ${out.pngPath}` : ''));
    }
  }

  // 2. the seed sweep: verify clean on every seed; garment fill never tied to sex (pooled); pooled answer-position tells
  if (!quick) {
    const N = 12;
    const htmls = [];
    for (const f of FACES) {
      const pos = {};
      for (let v = 1; v <= N; v++) {
        const out = await renderInstance({ type: specs[f.mode], theme: null, difficulty: 2, locale: 'en', page, outDir: OUT, baseName: `${f.id}-gate-sweep-v${v}`, variant: v });
        ok(out.qa.verify.length === 0 && out.qa.lints.length === 0, `${f.id} sweep v${v}: verify ${JSON.stringify(out.qa.verify).slice(0, 300)} lints ${JSON.stringify(out.qa.lints).slice(0, 200)}`);
        if (f.mode !== 'tree-template') htmls.push(out.html);
        // F1: pooled per (slot, rank) over EVERY row of every page (6 rows x N pages), not one row per page
        const key = f.mode === 'generations' ? out.meta.answers.flatMap((r) => r.map((g, sl) => 's' + sl + ':' + g))
          : f.mode === 'relation-riddles' ? out.meta.answers.map((a, i) => i + ':' + a)
            : f.mode === 'tree-clues' ? out.meta.clues.map((c, i) => i + ':' + c)
              : f.mode === 'trace-words' ? out.meta.words.map((w, i) => i + ':' + w) : [];
        for (const k of key) pos[k] = (pos[k] || 0) + 1;
        for (const ext of ['pdfPath', 'pngPath']) if (out[ext]) fs.unlinkSync(out[ext]);
        fs.unlinkSync(path.join(OUT, `${f.id}-gate-sweep-v${v}.html`));
      }
      const worst = Object.entries(pos).sort((a, b) => b[1] - a[1])[0];
      const denom = f.mode === 'generations' ? N * 6 : N;
      if (worst) ok(worst[1] / denom <= 0.5, `${f.id} sweep: position ${worst[0]} on ${worst[1]}/${denom} (> 50 %: a pooled answer-position tell)`);
      console.log(`sweep ${f.id} ${f.mode} x ${N}: verify clean${worst ? ', worst position/answer ' + worst[0] + ' on ' + worst[1] + '/' + denom : ''}`);
    }
    const gs = garmentSexFails(htmls);
    ok(gs.length === 0, `faces sweep: ${gs.join(' | ')}`);
    console.log(`faces sweep garment fill <-> sex over ${htmls.length} pages: ${gs.length ? gs.join(' | ') : 'every fill worn by both sexes'}`);
  }

  // 3. POISONS — each must FAIL for its own reason; the untouched face page is the control
  const buildFace = (f, over = {}, dOver = {}, seed = `${f.id}|none|2|1`, block = en) => TYPE._buildWith(block, { ...specs[f.mode].difficulty[2], ...dOver }, { locale: 'en' }, { rng: makeRng(seed) }, over);
  const rb = (bodyHtml, name, f, strings) => renderBody(bodyHtml, name, strings || en.strings[f.mode]);
  const F = Object.fromEntries(FACES.map((f) => [f.mode, f]));
  const ctl = {};
  for (const f of FACES) { const b = buildFace(f); const r = await rb(b.bodyHtml, `${f.id}-gate-poison-control`, f); ok(r.v.length === 0, `${f.id} poison control: ${JSON.stringify(r.v)}`); ctl[f.mode] = b; }
  const swapAttr = (html, re, a, b) => { let i = 0; return html.replace(re, (m0) => (i++ === a ? '\u0001' : i - 1 === b ? '\u0002' : m0)); };
  // F1
  { const f = F.generations;
    const b = buildFace(f, { rows: (rows) => [rows[0].slice().sort((x, y) => x.gen - y.gen), ...rows.slice(1)] });
    expectFail('F1-PA a row printed in answer order', (await rb(b.bodyHtml, 'K-370-f1-pa', f)).v, /printed in answer order/);
    const FFm = require('../primitives/family-figure.js');
    const fig = FFm.familyFigure({ age: 'adult', sex: 'f', look: 'bun', px: 44 + 28, id: 'poison' }).svg;
    const bad = ctl.generations.bodyHtml.replace('<span data-lcs-gen-chip=""', fig + '<span data-lcs-gen-chip=""');
    ok(bad !== ctl.generations.bodyHtml, 'F1-PB needle');
    expectFail('F1-PB a figure beside a word', (await rb(bad, 'K-370-f1-pb', f)).v, /a figure beside a word/);
    const L1 = ctl.generations.bodyHtml.indexOf('data-lcs-gen-legend="1"');
    const tail = ctl.generations.bodyHtml.slice(L1);
    const oneSex = ctl.generations.bodyHtml.slice(0, L1) + tail.replace('data-lcs-sex="m"', 'data-lcs-sex="f"');
    expectFail('F1-PC a legend frame of one sex', (await rb(oneSex, 'K-370-f1-pc', f)).v, /not one f \+ one m/);
    const fills = [...tail.matchAll(/fill="(#[0-9A-F]{6})"([^>]*)data-lcs-garment=""/gi)];
    const other = [tokens.color.tealSoft, tokens.color.coralSoft, tokens.color.creamDeep].find((c) => c.toUpperCase() !== fills[1][1].toUpperCase());
    const twoFill = ctl.generations.bodyHtml.slice(0, L1) + tail.replace(fills[1][0], fills[1][0].replace(fills[1][1], other));
    expectFail('F1-PD two garment fills in one legend frame (colour ~ sex)', (await rb(twoFill, 'K-370-f1-pd', f)).v, /two garment fills in one frame/);
    // SPARSE both ways on this face (the 814 one-line chrome has the most slack)
    const c1 = await rb(ctl.generations.bodyHtml, 'K-370-f1-sp-ctl', f, CHROME.one);
    ok(sparse(await measureFace('generations'), 'F1 SP control').length === 0, 'F1 SP control fails');
    const even = ctl.generations.bodyHtml.replace('justify-content:flex-start', 'justify-content:space-evenly');
    await rb(even, 'K-370-f1-sp1', f, CHROME.one);
    expectFail('F1-SP1 slack spread evenly (814 chrome)', sparse(await measureFace('generations'), 'F1-SP1'), /SPARSE/);
    const ride = ctl.generations.bodyHtml.replace('<div data-lcs-block="1" style="', '<div data-lcs-block="1" style="margin-top:-80px;');
    ok(ride !== ctl.generations.bodyHtml, 'F1-SP2 needle');
    await rb(ride, 'K-370-f1-sp2', f);
    expectFail('F1-SP2 the rows ridden into the legend', sparse(await measureFace('generations'), 'F1-SP2'), /OVERLAP/);
    void c1;
    // FILL both ways: growth removed (every flex-grow killed) at the 814 chrome ends high; mins inflated at 677 overrun
    const rigid = ctl.generations.bodyHtml.split('flex:1 1 ').join('flex:0 0 ');
    await rb(rigid, 'K-370-f1-fill1', f, CHROME.one);
    const mf1 = await measureFace('generations');
    ok(fillFails(await (async () => { await rb(ctl.generations.bodyHtml, 'K-370-f1-fill-ctl', f, CHROME.one); return measureFace('generations'); })(), 'FILL control', 'one').length === 0, 'FILL control (814) fails');
    expectFail('FILL1 the rows do not grow (814 chrome)', fillFails(mf1, 'FILL1', 'one'), /FILL — the content ends at/);
    const fat = ctl.generations.bodyHtml.replace(/min-height:68px/g, 'min-height:90px').replace(/flex:1 1 68px/g, 'flex:1 1 90px');
    ok(fat !== ctl.generations.bodyHtml, 'FILL2 needle');
    await rb(fat, 'K-370-f1-fill2', f, CHROME.four);
    expectFail('FILL2 rows too tall for the 677 chrome', fillFails(await measureFace('generations'), 'FILL2', 'four'), /runs [0-9]+ px past the body/); }
  // F2
  { const f = F['trace-words'];
    const C2 = ctl['trace-words'].bodyHtml;
    const answers = [...C2.matchAll(/data-lcs-trace-row="" data-lcs-badge="\d+" data-lcs-answer="([^"]+)"/g)].map((m) => m[1]);
    ok(answers.length >= 4, `F2-PA needle: ${answers.length} lines`);
    const swapped = swapAttr(C2, /data-lcs-answer="[^"]+"(?= style="flex:0 0 \d+px;display:flex;align-items:flex-start)/g, 0, 1).replace('\u0001', `data-lcs-answer="${answers[1]}"`).replace('\u0002', `data-lcs-answer="${answers[0]}"`);
    ok(swapped !== C2, 'F2-PA needle matched nothing');
    expectFail('F2-PA two lines swap their answers (the word no longer names the numbered person)', (await rb(swapped, 'K-370-f2-pa', f)).v, /the line answers/);
    // review round 1 — each must FAIL for its own reason
    const unb = buildFace(f, { unbadge: ctl['trace-words'].meta.grandSide + 'M' });
    expectFail('F2-PC an elder drawn with no number', (await rb(unb.bodyHtml, 'K-370-f2-pc', f)).v, /drawn with no number/);
    const level = buildFace(f, { bank: (rows) => rows.map((r) => r.answer) });
    expectFail('F2-PD the trace panel in line order (no lookup needed)', (await rb(level.bodyHtml, 'K-370-f2-pd', f)).v, /level with its own line/);
    // landing review 2026-09-23 — each word to trace carries its person's number (the instruction's "same number"); the older sibling taller
    expectFail('F2-PN the words to trace printed with no numbers', (await rb(buildFace(f, { unnumberBank: true }).bodyHtml, 'K-370-f2-pn', f)).v, /0 number discs/);
    expectFail('F2-PW two panel numbers swapped', (await rb(buildFace(f, { bankBadges: (b) => { const c = b.slice(); [c[0], c[1]] = [c[1], c[0]]; return c; } }).bodyHtml, 'K-370-f2-pw', f)).v, /is numbered \d, its person is \d/);
    expectFail('F2-PS the older sibling drawn the same size as the ego', (await rb(buildFace(f, { sameSize: true }).bodyHtml, 'K-370-f2-ps', f)).v, /not taller than the ego/);
    const firstRowLane = /(<div class="fam-trace-row"[^>]*>[\s\S]*?<div style="flex:0 0 321px;display:flex">)(<svg [\s\S]*?<\/svg>)/.exec(C2);
    const bankLane = /data-lcs-bank-lane=""[\s\S]*?(<svg [^>]*data-lcs-prim="trace-word"[\s\S]*?<\/svg>)/.exec(C2);   // the panel lane now carries a number disc first
    ok(firstRowLane && bankLane, 'F2-PE needle');
    const printed = C2.replace(firstRowLane[0], firstRowLane[1] + bankLane[1]);
    expectFail('F2-PE a word printed beside its number (the old page)', (await rb(printed, 'K-370-f2-pe', f)).v, /not an EMPTY trio/);
    const small = buildFace(f, {}, { glyphH: 30 });
    expectFail('F2-PB a lane at glyphH 30 (the silent-shrink floor)', (await rb(small.bodyHtml, 'K-370-f2-pb', f)).v, /glyphH \d+(\.\d)? < 40/);
    const noTrace = JSON.parse(JSON.stringify(en)); for (const k of ['mom', 'dad', 'sister', 'brother', 'grandma', 'grandpa']) noTrace.words[k].text = noTrace.words[k].text + 'œ';
    expectThrow('F2-REF a locale whose tree words are not traceable REFUSES (never a filler)', () => buildFace(f, {}, {}, 'f2ref', noTrace), /traceable family words on the tree .* refuse/); }
  // F3
  { const f = F['tree-clues'];
    // review round 1 — the older sibling drawn the same size as the ego (the maggiore / grand frère clue unreadable)
    const same = buildFace(f, { sameSize: true });
    expectFail('F3-PS the older sibling drawn the same size as the ego', (await rb(same.bodyHtml, 'K-370-f3-ps', f)).v, /not taller than the ego/);
    const b = buildFace(f, { empty: (ps) => [ps.find((p) => p.path === ps.find((q) => /^[MF][ZB]$/.test(q.path)).path[0] + 'M'), ps.find((p) => p.path === ps.find((q) => /^[MF][ZB]$/.test(q.path)).path[0] + 'F'), ps.find((p) => /^[ZB]$/.test(p.path)), ps.find((p) => /^[MF][ZB]$/.test(p.path))] });
    expectFail('F3-PA empty plates in four different (age, sex) cells', (await rb(b.bodyHtml, 'K-370-f3-pa', f)).v, /no same-\(age, sex\) pair/);
    const boxes = [...ctl['tree-clues'].bodyHtml.matchAll(/data-lcs-answer="([^"]+)" data-lcs-namebox=""/g)];
    const sexOf = Object.fromEntries(en.names.map((n) => [n.name, n.sex]));
    const i0 = boxes.findIndex((x) => sexOf[x[1]] === 'f'), i1 = boxes.findIndex((x) => sexOf[x[1]] === 'm');
    ok(i0 >= 0 && i1 >= 0, 'F3-PB needle: an f and an m empty plate');
    let k = 0;
    const sw = ctl['tree-clues'].bodyHtml.replace(/data-lcs-answer="([^"]+)" data-lcs-namebox=""/g, (m0) => { const j = k++; return j === i0 ? `data-lcs-answer="${boxes[i1][1]}" data-lcs-namebox=""` : j === i1 ? `data-lcs-answer="${boxes[i0][1]}" data-lcs-namebox=""` : m0; });
    expectFail('F3-PB an f name on an m plate', (await rb(sw, 'K-370-f3-pb', f)).v, /sits on a [fm] plate/);
    const ro = buildFace(f, { clueOrder: (order, reading) => reading.map((id) => order.find((p) => p.id === id)) });
    expectFail('F3-PC the clues in the tree reading order', (await rb(ro.bodyHtml, 'K-370-f3-pc', f)).v, /reading order/); }
  // F4
  { const f = F['relation-riddles'];
    const adj = buildFace(f, { order: (o) => ['MM', 'FM', 'MZ', 'MF', 'FZ', 'FF', 'MB', 'FB'] });
    expectFail('F4-PA two riddles with one answer adjacent', (await rb(adj.bodyHtml, 'K-370-f4-pa', f)).v, /share the answer/);
    const noAunt = ctl['relation-riddles'].bodyHtml.replace(/<span class="ws-bankword" data-lcs-bank-word="aunt"[^>]*>[^<]*<\/span>/, '');
    ok(noAunt !== ctl['relation-riddles'].bodyHtml, 'F4-PB needle');
    expectFail('F4-PB an answer missing from the bank', (await rb(noAunt, 'K-370-f4-pb', f)).v, /is not in the bank/);
    // review round 1 — the old page: two bank words that answer no riddle
    const extra = buildFace(f, { withDistractors: true });
    expectFail('F4-PD bank words that answer no riddle (the distractors printed)', (await rb(extra.bodyHtml, 'K-370-f4-pd', f)).v, /answer no riddle on the page/);
    const tree = ctl['relation-riddles'].bodyHtml.replace('<div data-lcs-riddles=""', `<svg width="10" height="10"><line x1="1" y1="1" x2="1" y2="9" stroke="${tokens.color.teal}" data-lcs-conn="drop"/></svg><div data-lcs-riddles=""`);
    expectFail('F4-PC a tree drawn on the riddle page', (await rb(tree, 'K-370-f4-pc', f)).v, /a tree on the riddle page/);
    { const b = JSON.parse(JSON.stringify(en)); b.strings['relation-riddles'].instruction = 'Read each riddle and write the right family word from the box on the line.';
      expectFail('F4-RN repeatsNote true but no clause in the instruction', validateBank(b, 'en'), /rule 7: repeatsNote true but the F4 instruction lacks/); } }
  // F5
  { const f = F['tree-template'];
    const h = ctl['tree-template'].bodyHtml;
    const mats = [...h.matchAll(/data-lcs-mat="" data-lcs-shape="[^"]+" data-lcs-box="([^"]+)"/g)].map((m) => m[1].split(',').map(Number));
    const [a, b2] = [mats[0], mats[1]];
    const conn = h.replace('<line x1="0" y1="510"', `<line x1="${a[0] + a[2] / 2}" y1="${a[1] + a[3] / 2}" x2="${b2[0] + b2[2] / 2}" y2="${b2[1] + b2[3] / 2}" stroke="${tokens.color.teal}" stroke-width="3"/><line x1="0" y1="510"`);
    ok(conn !== h, 'PR6 needle');
    expectFail('PR6 F5 with one connector between two mats', (await rb(conn, 'K-370-pr6', f)).v, /a line joins two mats/);
    // review round 1 — the old page's two defects, each for its own reason
    const twig = h.replace('<line x1="0" y1="510"', `<path d="M 0 0" data-lcs-branch="" data-lcs-pts="${[[318, 498, 8], [290, 490, 6], [262, 470, 4], [214, 452, 3]].map((q) => q.join(',')).join(';')}"/><line x1="0" y1="510"`);
    ok(twig !== h, 'F5-TW needle');
    expectFail('F5-TW a bare twig that holds no frame', (await rb(twig, 'K-370-f5-tw', f)).v, /an orphan branch/);
    const oneLine = h.replace(/<svg x="[^"]+" y="[^"]+" data-lcs-nameline="" data-lcs-me-line=""[\s\S]*?<\/svg>/, '');
    ok(oneLine !== h, 'F5-NL needle');
    expectFail('F5-NL a frame with no name line (13 frames, 12 lines)', (await rb(oneLine, 'K-370-f5-nl', f)).v, /frames but \d+ name lines/);
    const word = h.replace('<line x1="0" y1="510"', `<text x="100" y="300" font-size="18" fill="${tokens.color.ink}">mom</text><line x1="0" y1="510"`);
    expectFail('F5-PB a kin word printed on the template', (await rb(word, 'K-370-f5-pb', f)).v, /the template prints|kin word "mom"/);
    const br = h.replace('<line x1="0" y1="510"', `<path d="M 0 0" data-lcs-branch="" data-lcs-pts="${a[0] - 10},${a[1] + 40},8;${a[0] + a[2] + 10},${a[1] + 40},8"/><line x1="0" y1="510"`);
    expectFail('F5-PC a branch through a mat', (await rb(br, 'K-370-f5-pc', f)).v, /a branch passes through a mat/); }
  // the instruction names only apparatus on the page (a poison per direction) + the NBSP ban
  ok(apparatusFails('relation-riddles', en.strings['relation-riddles'].instruction).length === 0, 'APP control: the F4 instruction');
  expectFail('APP1 the F4 instruction names a tree (F4 draws none)', apparatusFails('relation-riddles', 'Read each riddle, look at the family tree and write the word on the line.'), /names "tree", which this face does not draw/);
  expectFail('APP2 the F1 instruction names a line', apparatusFails('generations', 'Write the numbers 1, 2 and 3 on the lines in each row.'), /names "line"/);
  { const b = JSON.parse(JSON.stringify(en)); b.strings.generations.title = 'Family Generations: Oldest to Youngest';
    expectFail('NB1 a face title with a U+00A0', validateBank(b, 'en'), /NBSP/); }
  for (const [id, p] of Object.entries(shots)) console.log(`face render ${id}: ${p}`);
}

module.exports = { validateBank, checkClueTree, checkGenRow, f2GlyphH, bankRule7, apparatusFails };
if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
