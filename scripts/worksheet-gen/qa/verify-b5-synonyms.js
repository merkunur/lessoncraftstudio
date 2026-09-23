#!/usr/bin/env node
/**
 * verify-b5-synonyms.js — the G2-358 `synonyms` family gate (design
 * docs/worksheet-gen/b5-designs/G2-358-synonyms.md §5; the nt10-E build brief deliverable 4).
 * BASE build (2026-09-23): sections 0-5 below; the face renders and the face-render
 * poisons (P6 P10 P15 P16 PR5) join in Phase 2 with the faces.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-synonyms.js [--quick]
 *
 * 1. BANK — validateBank(block, loc) (exported; tools/validate-b5-draft.js calls it for every
 *    panel draft through tools/b5-probe-child.js): §5 rules 1-15 (rule 10 = the base build
 *    probe, 20 seeds at d2; the F2 probe joins with the face).
 * 2. NODE SWEEP — 400 seeds x d2: the answer-position tells measured in BOTH directions
 *    (slot balance per page; the answer is the longest / shortest / alphabetically first /
 *    last tag at a chance rate; the answer shares the target's first letter no more than a
 *    foil does; same-domain foils present often enough that "the only word on the topic"
 *    is not the key); the draw is locale-neutral (same concepts + slots under a relabelled
 *    block); an unauthored locale REFUSES.
 * 3. RENDER through the REAL pipeline (render/render-instance.js, file:// fonts): d1/d2/d3 en,
 *    then d2 under the 722 chrome (3-line title + 3-line instruction) AND the fi chrome
 *    (4-line title; measured body 667, not the ruled 677) + the widest words (13-glyph de/fi literals at 24 / 18 px); asserts
 *    verify() empty (uniqueness re-derived on the RENDER, SPARSE <= 40 px, card clip, tag
 *    floors), qa/lints.js clean, every inline-style hex a token (the shared lint reads SVG
 *    attributes only), and the body measured per chrome.
 * 4. SWEEP — 20 seeds x d2 render distinct pages, each verify-clean (--quick renders 5).
 * 5. POISON — each must FAIL for its OWN reason (no fail = SILENT, another fail = WRONG
 *    REASON; either exits 1); the correct EN bank is the control. Design §5 P1-P5 P7-P9
 *    P11-P14 P17-P19 + PR1 PR2 PR6 PR7 + PS (SPARSE). PR3 / PR4 (the sock) are void:
 *    the sock was RETIRED 2026-09-23 (lead ruling); F2 uses the half-ring tags.
 */
'use strict';
const path = require('path');
const freeClaim = require('../../lib/free-claim.js');
const DATA = require('../data/b5/synonyms.js');
const { makeRng } = require('../lib/rng.js');
const tokens = require('../primitives/_tokens.js');

const OUT = path.join(__dirname, '..', 'out', 'dev', 'G2-358-gate');
const MODES = DATA.MODES;
const WORKSHEET_WORD = /worksheet|arbeitsblatt|werkblad|arbetsblad|arbejdsark|arbeidsark|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|gabarito|avec corrigé|con soluzioni|met antwoorden|med facit|med fasit|vastauksineen/i;
/** Rule 12: opposites heads (G1-307 owns antonyms) + compound-words heads (G2-333 "Word Web"). NFD, case-folded. */
const OPPOSITES_HEADS = /(?<!\p{L})(antonym\p{L}*|opposite\p{L}*|gegenteil\p{L}*|antonimo\p{L}*|antonimo|antonimos|contraire\p{L}*|contrari\p{L}*|tegenstelling\p{L}*|tegengesteld\p{L}*|motsats\p{L}*|modsæt\p{L}*|modsat\p{L}*|motsatt\p{L}*|motsetning\p{L}*|vastakoh\p{L}*|vastakoh)(?!\p{L})/iu;
const COMPOUND_HEADS = /(?<!\p{L})(web|netz|red de palabras|rede de palavras)(?!\p{L})/iu;
/** Rule 12: the locale's "same" word, banned in F3 strings (F3 orders SHADES, never sameness). */
const SAME_WORD = { en: /(?<!\p{L})same(?!\p{L})/iu, de: /(?<!\p{L})gleich\p{L}*/iu, es: /(?<!\p{L})mism[oa]s?(?!\p{L})/iu, pt: /(?<!\p{L})mesm[oa]s?(?!\p{L})/iu,
  fr: /(?<!\p{L})m[eê]mes?(?!\p{L})/iu, it: /(?<!\p{L})stess[oaie](?!\p{L})/iu, nl: /(?<!\p{L})hetzelfde|dezelfde(?!\p{L})/iu, sv: /(?<!\p{L})samma(?!\p{L})/iu,
  da: /(?<!\p{L})samme(?!\p{L})/iu, no: /(?<!\p{L})samme(?!\p{L})/iu, fi: /(?<!\p{L})sama\p{L}*/iu };
/** Rule 13: "synonyms and antonyms" in the locales where opposites owns the combined head. */
const SYN_AND_ANT = { es: /sin[oó]nimos\s+y\s+ant[oó]nimos/i, pt: /sin[oô]nimos\s+e\s+ant[oô]nimos/i, it: /sinonimi\s+e\s+contrari/i, da: /synonymer\s+og\s+(antonymer|modsætninger)/i, fi: /synonyymit\s+ja\s+(antonyymit|vastakohdat)/i, en: /synonyms\s+and\s+antonyms/i };
/** Rule 1: the design's per-locale ban floor (§4 traps), merged under every block's own `ban`. */
const BAN_FLOOR = {
  en: ['light', 'right', 'kind', 'mean', 'fine', 'bright', 'cool', 'skip', 'cried', 'unhappy'], de: ['schwer', 'sauer', 'toll', 'hell'], es: ['listo', 'rico'], pt: ['legal', 'esperto'],
  fr: ['fort', 'bon', 'chouette'], it: ['furbo', 'forte'], nl: ['leuk', 'mooi', 'lekker'], sv: ['rolig'], da: ['sjov'], no: ['morsom', 'grei'], fi: ['kova', 'hyvä'],
};
/** Rule 14 (en source): each face's instruction names its apparatus and nothing else; the panels pass `instructionBans` / `instructionMust`. */
const INSTR_MUST_EN = { base: [/card/i, /word/i], pictures: [/picture/i, /word/i], pairs: [/(?<!\p{L})lines?(?!\p{L})/iu, /(?<!\p{L})(link|ring)s?(?!\p{L})/iu], shades: [/box/i, /1, 2 and 3/], say: [/sentence/i, /bubble/i, /box/i], fields: [/field/i, /word/i] };
const APPARATUS = { card: /(?<!\p{L})cards?(?!\p{L})/iu, picture: /picture/i, link: /(?<!\p{L})(link|ring)s?(?!\p{L})/iu, line: /(?<!\p{L})lines?(?!\p{L})/iu, box: /(?<!\p{L})box(es)?(?!\p{L})/iu, bubble: /bubble/i, field: /(?<!\p{L})fields?(?!\p{L})/iu, sentence: /sentence/i };
const OWN = { base: ['card'], pictures: ['picture'], pairs: ['line', 'link'], shades: ['box'], say: ['sentence', 'bubble', 'box'], fields: ['field'] };
const INSTR_BAN_ALL = /(?<!\p{L})(tick|cut|colou?r|teal)(?!\p{L})/iu;
const MAX = { base: 13, pictures: 11, pairs: 14, shades: 12, say: 12, fields: 12 };

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const low = (s) => String(s).normalize('NFC').toLowerCase();
const nfd = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const glyphs = (s) => [...String(s)].length;
const hasWord = (text, w) => new RegExp(`(?<!\\p{L})${nfd(w).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu').test(nfd(text));

let _type = null;
function TYPE() { if (!_type) _type = require('../types/g2/G2-358-synonyms.js'); return _type; }
let _liveTitles = null;
function liveTitlesEn() {
  if (!_liveTitles) { const { loadAllTypes } = require('../lib/load-types.js'); _liveTitles = new Set(loadAllTypes().filter((t) => t.id !== 'G2-358' && t.i18n && t.i18n.en).map((t) => low(t.i18n.en.title))); }
  return _liveTitles;
}

/* ---------------------------------------------------------------- 1. bank */
function validateBank(b, loc) {
  const f = [];
  const push = (m) => f.push(`${loc}: ${m}`);
  if (!b || typeof b !== 'object') return [`${loc}: no block`];
  const allowed = new Set(Array.isArray(b.allowed) ? b.allowed : [' ', '-', "'"]);
  const ban = new Set([...(BAN_FLOOR[loc] || []), ...(b.ban || [])].map(low));
  const concepts = new Map(DATA.CONCEPTS.map((c) => [c.id, c]));
  let T = null;
  try { T = TYPE().antonymTable(loc); } catch (e) { push(`no opposites bank for the antonym ban (${e.message.slice(0, 80)})`); }
  const antOf = (w) => (T ? T.antonymsOf(w) : []);
  const isPrefix = (w) => !!(T && T.prefix.has(low(w)));
  const lit = (w, where) => {
    if (typeof w !== 'string' || !w.trim()) { push(`${where}: an empty literal (rule 1)`); return false; }
    if (w !== w.trim()) push(`${where} "${w}": not trimmed (rule 1)`);
    for (const ch of w) if (!/\p{L}/u.test(ch) && !allowed.has(ch)) { push(`${where} "${w}": the character "${ch}" is not a letter or an allowed mark (rule 1)`); break; }
    if (ban.has(low(w))) push(`${where} "${w}" is a banned word (rule 1)`);
    if (/^\p{Lu}/u.test(w)) push(`${where} "${w}" is capitalised (rule 1)`);
    return true;
  };
  // groups
  const groups = Array.isArray(b.groups) ? b.groups : [];
  const groupOf = new Map();
  const ids = new Set(), cids = new Set();
  for (const g of groups) {
    const where = `group ${g && g.id}`;
    if (!g || !g.id) { push('a group without an id (rule 3)'); continue; }
    if (ids.has(g.id)) push(`${where}: the id repeats (rule 3)`); ids.add(g.id);
    if (cids.has(g.concept)) push(`${where}: concept "${g.concept}" signed twice (rule 3)`); cids.add(g.concept);
    if (!['adj', 'verb'].includes(g.pos)) push(`${where}: pos "${g.pos}" ∉ {adj, verb} (rule 3)`);
    if (!g.domain) push(`${where}: no domain (rule 3)`);
    if (![1, 2].includes(g.tier)) push(`${where}: tier ${g.tier} ∉ {1, 2} (rule 3)`);
    const c = concepts.get(g.concept);
    if (!c && !(g.pos && g.domain)) push(`${where}: concept "${g.concept}" is not in CONCEPTS and carries no pos + domain (rule 3)`);
    if (c && c.pos !== g.pos) push(`${where}: pos ${g.pos} ≠ the concept's ${c.pos} (rule 3)`);
    if (!Array.isArray(g.words) || g.words.length < 2) { push(`${where}: ${g.words ? g.words.length : 0} word(s) — a group needs >= 2 (rule 3)`); continue; }
    if (new Set(g.words.map(low)).size !== g.words.length) push(`${where}: a word repeats inside the group (rule 3)`);
    for (const w of g.words) {
      if (!lit(w, where)) continue;
      if (groupOf.has(low(w))) push(`"${w}" sits in ${groupOf.get(low(w))} AND ${g.id} — a word of two meanings is banned, never shared (rule 2)`);
      groupOf.set(low(w), g.id);
      if (isPrefix(w)) push(`${where}: "${w}" is a prefix antonym (G2-320 owns un- / dis- / in-, rule 3)`);
      if (glyphs(w) > MAX.base) push(`${where}: "${w}" has ${glyphs(w)} glyphs > ${MAX.base} (rule 11)`);
      for (const v of g.words) if (v !== w && antOf(w).includes(low(v))) push(`${where}: "${w}" and "${v}" are antonyms (rule 3)`);
    }
  }
  // scales
  const scales = Array.isArray(b.scales) ? b.scales : [];
  const scaleOf = new Map();
  for (const s of scales) {
    const where = `scale ${s && s.id}`;
    if (!s || !Array.isArray(s.words) || ![3, 4].includes(s.words.length)) { push(`${where}: a scale holds exactly 3 words (4 at d3) (rule 6)`); continue; }
    if (new Set(s.words.map(low)).size !== s.words.length) push(`${where}: a word repeats (rule 6)`);
    for (const w of s.words) {
      if (!lit(w, where)) continue;
      if (scaleOf.has(low(w))) push(`"${w}" sits in two scales (rule 2)`); scaleOf.set(low(w), s.id);
      if (glyphs(w) > MAX.shades) push(`${where}: "${w}" has ${glyphs(w)} glyphs > ${MAX.shades} (rule 11)`);
    }
    for (let i = 0; i < s.words.length; i++) for (let j = i + 1; j < s.words.length; j++) {
      const a = groupOf.get(low(s.words[i])), c = groupOf.get(low(s.words[j]));
      if (a && a === c) push(`${where}: "${s.words[i]}" and "${s.words[j]}" are one group — a group is ONE strength (rule 6)`);
    }
  }
  // fields
  const F = b.fields || {};
  const fieldOf = new Map();
  for (const k of ['say', 'go', 'look']) {
    const fl = F[k];
    if (!fl || !fl.head || !Array.isArray(fl.words)) { push(`fields.${k} missing (rule 7)`); continue; }
    lit(fl.head, `fields.${k}.head`);
    for (const w of fl.words) {
      if (!lit(w, `fields.${k}`)) continue;
      if (fieldOf.has(low(w))) push(`"${w}" sits in fields.${fieldOf.get(low(w))} AND fields.${k} (rule 2)`); else fieldOf.set(low(w), k);
      if (scaleOf.has(low(w))) push(`fields.${k} "${w}" is a scale word (rule 6)`);
      if (glyphs(w) > MAX[k === 'say' ? 'say' : 'fields']) push(`fields.${k}: "${w}" has ${glyphs(w)} glyphs > ${MAX[k === 'say' ? 'say' : 'fields']} (rule 11)`);
      if (low(w) === low(fl.head)) push(`fields.${k} contains its own head "${fl.head}" (rule 7)`);
    }
  }
  if (F.go && F.look) for (const w of F.go.words || []) if ((F.look.words || []).map(low).includes(low(w))) push(`"${w}" in both go and look (rule 7)`);
  if (F.go && (F.go.words || []).length < 8) push(`fields.go has ${(F.go.words || []).length} words < 8 (rule 7)`);
  if (F.look && (F.look.words || []).length < 8) push(`fields.look has ${(F.look.words || []).length} words < 8 (rule 7)`);
  // rule 8: F4
  const say = F.say;
  if (say && Array.isArray(say.words)) {
    if (say.words.length < 6 || say.words.length > 7) push(`fields.say has ${say.words.length} words ∉ [6, 7] (rule 7)`);
    if (!say.form || typeof say.form !== 'string') push('fields.say.form missing — every say word shares one form (rule 8)');
    const sents = Array.isArray(say.sentences) ? say.sentences : [];
    if (sents.length < 8) push(`fields.say has ${sents.length} sentences < 8 (rule 7)`);
    const cols = new Set();
    for (const s of sents) {
      const where = `say sentence ${s.id}`;
      const slots = (s.text || '').match(/\{[^}]*\}/g) || [];
      if (slots.filter((x) => x === '{gap}').length !== 1) push(`${where}: {gap} ${slots.filter((x) => x === '{gap}').length} times ≠ 1 (rule 8)`);
      for (const x of slots) if (!['{gap}', '{name}'].includes(x)) push(`${where}: the slot ${x} (only {name} and {gap}, rule 8)`);
      const fit = s.fit || {};
      const keys = Object.keys(fit);
      if (keys.length !== say.words.length || say.words.some((w) => !(w in fit))) { push(`${where}: the fit row does not cover every say word (rule 8)`); continue; }
      const trues = keys.filter((k) => fit[k] === true);
      if (trues.length !== 1) push(`${where}: ${trues.length} true cells in the fit row (exactly one, rule 8)`);
      else cols.add(trues[0]);
      const txt = (s.text || '').replace(/\{[^}]*\}/g, ' ');
      for (const w of say.words) if (hasWord(txt, w)) push(`${where}: the say word "${w}" is printed in the sentence (rule 8)`);
      if (hasWord(txt, say.head)) push(`${where}: the struck head "${say.head}" is printed in the sentence (rule 8)`);
    }
    if (cols.size < 6) push(`only ${cols.size} say words are answered by a sentence — no 6 x 6 permutation draw exists (rule 8)`);
  }
  // rule 4 / 5: near + regional
  const inBank = new Set([...groupOf.keys(), ...scaleOf.keys(), ...fieldOf.keys()]);
  for (const n of b.near || []) {
    if (!inBank.has(low(n.a)) || !inBank.has(low(n.b))) push(`near ${n.a}~${n.b}: a word is not in the bank (rule 4)`);
    if (groupOf.has(low(n.a)) && groupOf.get(low(n.a)) === groupOf.get(low(n.b))) push(`near ${n.a}~${n.b} sits inside one group ${groupOf.get(low(n.a))} (rule 4)`);
    if (!n.why) push(`near ${n.a}~${n.b}: no why (rule 4)`);
  }
  if ((b.near || []).length < 12) push(`${(b.near || []).length} near pairs < 12 (§4)`);
  for (const r of b.regional || []) {
    const [a, c] = r;
    if (groupOf.has(low(a)) && groupOf.get(low(a)) === groupOf.get(low(c))) push(`regional ${a} / ${c} form one group — a regional doublet is near or ban, never a group (rule 5)`);
  }
  // rule 7: counts
  const adj = groups.filter((g) => g.pos === 'adj').length, verb = groups.filter((g) => g.pos === 'verb').length;
  if (groups.length < 21 || adj < 13 || verb < 8) push(`${groups.length} groups (${adj} adj, ${verb} verb) < 21 (13 adj, 8 verb) (rule 7)`);
  const refuse = new Set(b.refuse || []);
  if (scales.length < 8 && !refuse.has('shades')) push(`${scales.length} scales < 8 and shades not refused (rule 7)`);
  // rule 9: F1
  const byConcept = new Map(groups.map((g) => [g.concept, g]));
  const pictured = Object.keys(DATA.PICTURES).filter((c) => byConcept.has(c));
  if (pictured.length < 8 && !refuse.has('pictures')) push(`${pictured.length} pictured concepts signed < 8 and pictures not refused (rule 7)`);
  const near = new Set((b.near || []).flatMap((n) => [low(n.a) + '|' + low(n.b), low(n.b) + '|' + low(n.a)]));
  for (const c of pictured) {
    const P = DATA.PICTURES[c];
    if (!P || P.picOpened !== true) push(`PICTURES.${c}: picOpened is not true (rule 9)`);
    for (const w of byConcept.get(c).words) if (glyphs(w) > MAX.pictures) push(`pictured ${c}: "${w}" has ${glyphs(w)} glyphs > ${MAX.pictures} (rule 11)`);
    const fo = (b.falseOf || {})[c];
    if (!Array.isArray(fo) || fo.length < 2) { if (!refuse.has('pictures')) push(`falseOf.${c}: < 2 words (rule 9)`); continue; }
    const other = new Set(pictured.filter((x) => x !== c).flatMap((x) => byConcept.get(x).words.map(low)));
    for (const w of fo) {
      if (!other.has(low(w))) push(`falseOf.${c} "${w}" is not a word of another pictured concept (rule 9)`);
      for (const v of byConcept.get(c).words) if (near.has(low(v) + '|' + low(w))) push(`falseOf.${c} "${w}" is near "${v}" (rule 9)`);
    }
  }
  // rules 12-15: strings
  const S = b.strings || {};
  if (Object.keys(S).sort().join() !== MODES.slice().sort().join()) push(`strings keys [${Object.keys(S).join()}] ≠ [${MODES.join()}] (rule 15)`);
  const titles = [];
  const live = loc === 'en' ? liveTitlesEn() : new Set((b.liveTitles || []).map(low));
  for (const m of MODES) {
    const s = S[m];
    if (!s) { push(`strings.${m} missing (rule 15)`); continue; }
    const t = s.title || '', ins = s.instruction || '';
    if (!t || t.length > 70) push(`strings.${m} title length ${t.length} (1..70, rule 13)`);
    if (WORKSHEET_WORD.test(t)) push(`strings.${m} title carries a worksheet word (rule 13)`);
    for (const x of [t, ins]) {
      if (OPPOSITES_HEADS.test(nfd(x))) push(`strings.${m} names an opposites head ("${nfd(x).match(OPPOSITES_HEADS)[0]}", rule 12)`);
      if (COMPOUND_HEADS.test(x)) push(`strings.${m} names a compound-words head (rule 12)`);
      const h = freeClaim.hit(x); if (h) push(`strings.${m} claims free ("${h}", rule 13)`);
      if (ANSWERS_WORD.test(x)) push(`strings.${m} promises answers (rule 15)`);
      if (SYN_AND_ANT[loc] && SYN_AND_ANT[loc].test(x)) push(`strings.${m} is a "synonyms and antonyms" combination (rule 13)`);
    }
    if (m === 'shades' && SAME_WORD[loc]) for (const x of [t, ins]) if (SAME_WORD[loc].test(x)) push(`strings.shades says "same" (F3 orders shades, rule 12)`);
    if (loc === 'de' && /^wortfeld/i.test(t) && !/[„"“].+[“"”]/.test(t) && t !== b.head) push(`strings.${m} title starts "Wortfeld" without a quoted verb (rule 13)`);
    if (live.has(low(t))) push(`strings.${m} title "${t}" repeats a live title (rule 13)`);
    titles.push(low(t));
    // rule 14
    if (!ins || ins.length > 150) push(`strings.${m} instruction length ${ins.length} (1..150, rule 14)`);
    if (!/[.!?]$/.test(ins.trim())) push(`strings.${m} instruction does not end in a mark (rule 14)`);
    if (/[.!?]\s+\p{Lu}/u.test(ins.trim().slice(0, -1))) push(`strings.${m} instruction is more than ONE sentence (rule 14)`);
    if (loc === 'en') {
      if (INSTR_BAN_ALL.test(ins)) push(`strings.${m} instruction names "${ins.match(INSTR_BAN_ALL)[0]}" (rule 14)`);
      for (const re of INSTR_MUST_EN[m] || []) if (!re.test(ins)) push(`strings.${m} instruction lacks ${re} (rule 14)`);
      for (const [k, re] of Object.entries(APPARATUS)) if (!OWN[m].includes(k) && re.test(ins)) push(`strings.${m} instruction names "${k}" — not apparatus of this face (rule 14)`);
    } else {
      for (const w of ((b.instructionBans && b.instructionBans[m]) || [])) if (hasWord(ins, w)) push(`strings.${m} instruction names "${w}" (rule 14)`);
    }
  }
  if (new Set(titles).size !== titles.length) push('two modes share a title (rule 13)');
  // rule 10: the base build probe (20 seeds x d2) — only when the block is otherwise sound
  if (!f.length) {
    const TY = TYPE();
    for (let s = 1; s <= 20; s++) {
      try {
        const r = TY._buildWith(b, TY.difficulty[2], { locale: loc }, { rng: makeRng(`G2-358-probe-${loc}-${s}`) });
        const words = r.meta.cards.flatMap((c) => [c.target, ...c.tags]).map(low);
        if (new Set(words).size !== 40) push(`probe seed ${s}: ${new Set(words).size} distinct words ≠ 40 (rule 10)`);
      } catch (e) { push(`probe seed ${s}: the base draw refuses — ${e.message.slice(0, 120)} (rule 10)`); break; }
    }
  }
  return f;
}

/* ---------------------------------------------------------------- 2. node sweep */
function nodeSweep() {
  const TY = TYPE();
  const en = DATA.SYNONYMS.en;
  const N = 400;
  let cards = 0, longest = 0, shortest = 0, alphaFirst = 0, alphaLast = 0, firstLetterA = 0, firstLetterF = 0, foilCards = 0, sameDom = 0, onlyTopic = 0;
  const neutralFails = [];
  const relabel = JSON.parse(JSON.stringify(en));
  const map = (w) => w + 'q';
  for (const g of relabel.groups) g.words = g.words.map(map);
  relabel.near = relabel.near.map((n) => ({ ...n, a: map(n.a), b: map(n.b) }));
  relabel.ban = [];
  for (let s = 1; s <= N; s++) {
    const r = TY._buildWith(en, TY.difficulty[2], { locale: 'en' }, { rng: makeRng('G2-358-sweep-' + s) });
    const r2 = TY._buildWith(relabel, TY.difficulty[2], { locale: 'en' }, { rng: makeRng('G2-358-sweep-' + s) });
    if (JSON.stringify(r.meta.cards.map((c) => c.concept)) !== JSON.stringify(r2.meta.cards.map((c) => c.concept))) neutralFails.push(s);
    const counts = {};
    for (const c of r.meta.cards) counts[c.slot] = (counts[c.slot] || 0) + 1;
    ok(Object.keys(counts).length === 4 && Object.values(counts).every((v) => v === 2), `sweep seed ${s}: slot counts ${JSON.stringify(counts)} (each slot twice)`);
    for (const c of r.meta.cards) {
      cards++;
      const a = c.answer, tags = c.tags, len = tags.map((x) => glyphs(x));
      if (glyphs(a) === Math.max(...len) && len.filter((x) => x === glyphs(a)).length === 1) longest++;
      if (glyphs(a) === Math.min(...len) && len.filter((x) => x === glyphs(a)).length === 1) shortest++;
      const sorted = tags.slice().sort((x, y) => x.localeCompare(y, 'en'));
      if (sorted[0] === a) alphaFirst++;
      if (sorted[sorted.length - 1] === a) alphaLast++;
      if (a[0] === c.target[0]) firstLetterA++;
      firstLetterF += tags.filter((x) => x !== a && x[0] === c.target[0]).length / 3;
      const sd = c.foilDomains.filter((d) => d === c.domain).length;
      if (sd) foilCards++;
      sameDom += sd;
      if (!sd) onlyTopic++;
    }
  }
  const pct = (x) => x / cards;
  const band = (name, x, lo, hi) => { ok(x >= lo && x <= hi, `tell: the answer is ${name} on ${(x * 100).toFixed(1)} % of cards (chance band ${lo * 100}-${hi * 100} %)`); return `${name} ${(x * 100).toFixed(1)}%`; };
  const rep = [
    band('the unique longest tag', pct(longest), 0.08, 0.40), band('the unique shortest tag', pct(shortest), 0.08, 0.40),
    band('alphabetically first', pct(alphaFirst), 0.10, 0.40), band('alphabetically last', pct(alphaLast), 0.10, 0.40),
  ];
  ok(pct(firstLetterA) <= Math.max(0.2, 2 * pct(firstLetterF)), `tell: the answer shares the target's first letter on ${(pct(firstLetterA) * 100).toFixed(1)} % vs a foil ${(pct(firstLetterF) * 100).toFixed(1)} %`);
  ok(pct(foilCards) >= 0.35, `tell: only ${(pct(foilCards) * 100).toFixed(1)} % of cards carry a same-domain foil — "the only word on the topic" would be the key`);
  ok(pct(onlyTopic) <= 0.65, `tell: the answer is the only same-domain tag on ${(pct(onlyTopic) * 100).toFixed(1)} % of cards`);
  ok(!neutralFails.length, `the draw is not locale-neutral on seeds ${neutralFails.slice(0, 5)}`);
  console.log(`node sweep ${N} seeds (${cards} cards): ${rep.join(' · ')} · first letter answer ${(pct(firstLetterA) * 100).toFixed(1)}% / foil ${(pct(firstLetterF) * 100).toFixed(1)}% · same-domain foil on ${(pct(foilCards) * 100).toFixed(1)}% · locale-neutral ${N - neutralFails.length}/${N}`);
}

/* ---------------------------------------------------------------- 3. render */
async function renderWith(page, type, { difficulty = 2, baseName, strings, seedEpoch, locale = 'en' }) {
  const { renderInstance } = require('../render/render-instance.js');
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate((palette) => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, h: r.height, w: r.width }; };
    const body = document.querySelector('.ws-body'), foot = document.querySelector('.ws-foot');
    const root = document.querySelector('[data-lcs-type="G2-358"]');
    const pal = new Set(palette);
    const hexes = [];
    for (const el of document.querySelectorAll('.ws-page [style]')) for (const h of (el.getAttribute('style').match(/#[0-9A-Fa-f]{6}\b/g) || [])) if (!pal.has(h.toUpperCase())) hexes.push(h);
    return {
      body: body ? rect(body) : null, foot: foot ? foot.getBoundingClientRect().top : 0,
      lowest: Math.max(0, ...[...(root ? root.querySelectorAll('*') : [])].map((e) => e.getBoundingClientRect().bottom)),
      tags: root ? [...root.querySelectorAll('[data-lcs-tag]')].map((t) => ({ h: t.getBoundingClientRect().height, px: parseFloat(getComputedStyle(t).fontSize) })) : [],
      targets: root ? [...root.querySelectorAll('[data-lcs-target-word]')].map((t) => parseFloat(getComputedStyle(t).fontSize)) : [],
      offHex: hexes,
      sparse: root ? Math.max(...[...root.querySelectorAll('section.ws-card')].map((card) => {
        const cs = getComputedStyle(card), cr = card.getBoundingClientRect(), b = card.querySelector('[data-lcs-band]').getBoundingClientRect(), q = card.querySelector('[data-lcs-square]').getBoundingClientRect();
        const top = cr.top + parseFloat(cs.borderTopWidth) + parseFloat(cs.paddingTop), bot = cr.bottom - parseFloat(cs.borderBottomWidth) - parseFloat(cs.paddingBottom);
        return Math.max(b.top - top, q.top - b.bottom, bot - q.bottom);
      })) : null,
      sig: root ? [...root.querySelectorAll('[data-lcs-twin]')].map((t) => t.dataset.lcsTarget).join('|') + [...root.querySelectorAll('[data-lcs-tag]')].map((t) => t.textContent).join(',') : '',
    };
  }, Object.values(tokens.color).map((c) => c.toUpperCase()));
  return { out, m, verify: out.qa.verify, lints: out.qa.lints };
}
function assertRender(name, r, { d = 2, body } = {}) {
  const TY = TYPE();
  const cfg = TY.difficulty[d];
  ok(!r.verify.length, `${name}: verify ${JSON.stringify(r.verify.slice(0, 4))}`);
  ok(!r.lints.length, `${name}: lints ${JSON.stringify(r.lints.slice(0, 4))}`);
  const m = r.m;
  ok(m.tags.length === cfg.cards * cfg.chips, `${name}: ${m.tags.length} tags ≠ ${cfg.cards * cfg.chips}`);
  ok(m.tags.every((t) => t.h >= 36 - 0.5 && t.px >= 16), `${name}: a tag under the G2 floor (36 px high, 16 px text)`);
  ok(m.targets.every((x) => x >= 18), `${name}: a target word under 18 px`);
  ok(!m.offHex.length, `${name}: off-token inline hex ${[...new Set(m.offHex)].join(', ')}`);
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches the footer (${m.lowest.toFixed(0)} > ${m.foot.toFixed(0)})`);
  if (body) ok(m.body.h <= body + 0.6, `${name}: body ${m.body.h.toFixed(0)} px — the fixture did not squeeze it to <= ${body}`);
}
const LONG = {
  de: { title: 'Wortfelder und Synonyme: Kreise das Wort ein, das dasselbe bedeutet, genau', instruction: 'Lies das große Wort auf jeder Karte und kreise darunter das eine Wort ein, das dasselbe bedeutet; die anderen drei Wörter bedeuten etwas ganz anderes als das große Wort.', body: 722 },
  fi: { title: 'Synonyymit: ympyröi jokaisen kortin alta se sana, joka tarkoittaa samaa kuin kortin iso sana, ja tutki muut kolme sanaa huolellisesti', instruction: 'Lue jokaisen kortin iso sana ja ympyröi sen alta se yksi sana, joka tarkoittaa samaa; muut kolme sanaa tarkoittavat jotakin aivan muuta kuin iso sana.', body: 667 },
};
/** The one-line chrome (the largest body, 814 px): SPARSE is measured here. */
const SHORT = { title: 'Synonyms', instruction: 'Circle the word that means the same.' };
/** A type whose build injects a synthetic block / config (fixtures and poisons). */
function withBlock(block, extra = {}, loc = 'en') {
  const TY = TYPE();
  return { ...TY, build({ difficulty }, ctx) { return this._buildWith(block, { ...this.difficulty[difficulty], ...extra }, { locale: loc }, ctx); } };
}
function doctored(fn) {
  const TY = TYPE();
  return { ...TY, build(o, ctx) { const r = TY.build(o, ctx); r.bodyHtml = fn(r.bodyHtml, r); return r; } };
}

async function main() {
  const quick = process.argv.includes('--quick');
  freeClaim.selfTest();
  const TY = TYPE();
  const en = DATA.SYNONYMS.en;
  // 1. bank
  for (const loc of Object.keys(DATA.SYNONYMS)) { const bf = validateBank(DATA.SYNONYMS[loc], loc); bf.forEach((x) => ok(false, x)); console.log(`bank ${loc}: ${bf.length} findings`); }
  ok(en.strings.base.title === TY.i18n.en.title && en.strings.base.instruction === TY.i18n.en.instruction, 'the bank\'s base strings ≠ the spec\'s i18n.en');
  ok(DATA.CONCEPTS.length >= 40, `CONCEPTS has ${DATA.CONCEPTS.length} < 40`);
  for (const c of DATA.CONCEPTS) for (const o of c.opp || []) ok(DATA.CONCEPTS.some((x) => x.id === o && (x.opp || []).includes(c.id)), `CONCEPTS: ${c.id} -> ${o} is not symmetric`);
  for (const c of en.groups) ok(DATA.CONCEPTS.find((x) => x.id === c.concept).domain === c.domain, `group ${c.id}: domain ${c.domain} ≠ the concept's`);
  { let m = null; try { TY.build({ difficulty: 2, locale: 'sv' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && /no sv block|refuse/.test(m), `an unauthored sv REFUSES (got ${m})`); }
  // 2. node sweep
  nodeSweep();

  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const log = []; let killed = 0, total = 0;
  const judge = (name, f, re) => { total++; const k = f.some((x) => re.test(x)); log.push(`  ${name}: ${k ? 'KILLED' : f.length ? 'WRONG REASON — ' + f.slice(0, 2).join(' | ') : 'SILENT'}`); if (k) killed++; };
  try {
    // 3. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TY, { difficulty: d, baseName: `G2-358-gate-d${d}-en` });
      assertRender(`d${d}`, r, { d });
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)}`);
    }
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TY, { difficulty: d, baseName: `G2-358-gate-d${d}-shortchrome`, strings: SHORT });
      assertRender(`d${d} short chrome`, r, { d });
      ok(r.m.body.h >= 800, `d${d} short chrome: body ${r.m.body.h.toFixed(0)} px — the fixture did not open it to ~814`);
      console.log(`render d${d} short chrome: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} widest blank band in a card ${r.m.sparse.toFixed(1)} px`);
    }
    for (const k of Object.keys(LONG)) for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TY, { difficulty: d, baseName: `G2-358-gate-d${d}-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d${d} long chrome ${k}`, r, { d, body: LONG[k].body });
      console.log(`render d${d} long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)} lowest ${r.m.lowest.toFixed(0)} foot ${r.m.foot.toFixed(0)}`);
    }
    {
      // the widest REAL literals the caps allow (13 glyphs, measured by the design editor: ausgezeichnet 117.8 px at Baloo 2 700 18) at the fi chrome
      const wide = JSON.parse(JSON.stringify(en));
      const W13 = { 'g.happy': 'überglücklich', 'g.pretty': 'wunderschönen', 'g.surprised': 'hämmästynyt', 'g.scared': 'amedrontado', 'g.strange': 'surpreendido', 'g.smart': 'ausgezeichnet', 'g.tasty': 'kochend heiß',
        'g.difficult': 'schwierigsten', 'g.funny': 'hauskanpuoleinen'.slice(0, 13), 'g.collect': 'kerätäänkinhän'.slice(0, 13), 'g.fix': 'reparieren', 'g.choose': 'auszuwählen' };
      for (const g of wide.groups) if (W13[g.id]) g.words[0] = W13[g.id];
      const r = await renderWith(page, withBlock(wide), { difficulty: 2, baseName: 'G2-358-gate-d2-widest-fi-chrome', strings: LONG.fi });
      assertRender('d2 widest words + fi chrome', r, { body: 667 });
      console.log(`render widest (13-glyph) words at the fi chrome: verify ${r.verify.length} lints ${r.lints.length} body ${r.m.body.h.toFixed(0)}`);
    }
    // 4. sweep
    const pages = new Set();
    for (let s = 1; s <= (quick ? 5 : 20); s++) {
      const r = await renderWith(page, TY, { difficulty: 2, baseName: `G2-358-gate-sweep-${s}`, seedEpoch: s });
      ok(!r.verify.length && !r.lints.length, `sweep ${s}: verify ${JSON.stringify(r.verify.slice(0, 3))} lints ${r.lints.length}`);
      pages.add(r.m.sig);
    }
    ok(pages.size === (quick ? 5 : 20), `sweep: ${pages.size} distinct pages of ${quick ? 5 : 20}`);
    console.log(`sweep: ${pages.size} distinct pages`);

    // 5. poisons — data (the correct EN bank is the control)
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const ctl = validateBank(clone(en), 'en'); log.push(`  control en bank: ${ctl.length} findings`); ok(!ctl.length, 'the en control must be clean');
    const withGroups = (fn, loc = 'en', base = en) => { const b = clone(base); fn(b); return validateBank(b, loc); };
    judge('P1 group light/bright', withGroups((b) => { b.groups.push({ id: 'g.shine', concept: 'shine', pos: 'adj', domain: 'looks', tier: 1, words: ['light', 'bright'] }); }), /"light" is a banned word \(rule 1\)/);
    judge('P3 hot/warm as a group', withGroups((b) => { b.groups.push({ id: 'g.hot', concept: 'hot', pos: 'adj', domain: 'senses', tier: 1, words: ['hot', 'warm'] }); b.scales = b.scales.filter((s) => s.id !== 's.heat'); b.scales.push({ id: 's.x', pos: 'adj', words: ['cool2', 'x2', 'y2'] }); }), /near hot~warm sits inside one group/);
    {
      const es = clone(en); es.ban = []; es.regional = [['carro', 'coche']];
      es.groups.push({ id: 'g.car', concept: 'car', pos: 'adj', domain: 'looks', tier: 1, words: ['carro', 'coche'] });
      judge('P4 es-MX carro/coche group', validateBank(es, 'es'), /regional carro \/ coche form one group/);
    }
    judge('P5 de group with schwer', withGroups((b) => { b.groups[13].words = ['schwer', 'tricky']; }, 'de'), /"schwer" is a banned word/);
    {
      const save = DATA.PICTURES.sad.picOpened; DATA.PICTURES.sad.picOpened = false;
      try { judge('P7 picture picOpened false', validateBank(clone(en), 'en'), /PICTURES\.sad: picOpened is not true/); } finally { DATA.PICTURES.sad.picOpened = save; }
    }
    judge('P8 F4 fit row with two trues', withGroups((b) => { b.fields.say.sentences[0].fit.shouted = true; }), /2 true cells in the fit row/);
    judge('P9 F4 bank word in a sentence', withGroups((b) => { b.fields.say.sentences[3].text = '{name} {gap} and then asked again.'; }), /the say word "asked" is printed in the sentence/);
    judge('P11 march in go and look', withGroups((b) => { b.fields.look.words.push('march'); }), /"march" sits in fields\.go AND fields\.look|"march" in both go and look/);
    {
      const it = clone(en); it.ban = []; it.strings.base.title = 'Sinonimi e contrari: cerchia la parola';
      judge('P12 it title "Sinonimi e contrari"', validateBank(it, 'it'), /opposites head|"synonyms and antonyms" combination/);
    }
    judge('P13 en chip unhappy', withGroups((b) => { b.groups[1].words = ['sad', 'gloomy', 'unhappy']; }), /"unhappy" (is a prefix antonym|is a banned word)/);
    judge('P14 a one-word group', withGroups((b) => { b.groups[0].words = ['happy']; }), /1 word\(s\) — a group needs >= 2/);
    judge('P17 a 14-glyph de tag', withGroups((b) => { b.groups[13].words = ['schwierigkeits', 'kniffelig']; }, 'de'), /has 14 glyphs > 13 \(rule 11\)/);
    judge('P19 F3 instruction "means the same"', withGroups((b) => { b.strings.shades.instruction = 'Read the three words in each row and write 1, 2 and 3 in the boxes, even if they mean the same.'; }), /strings\.shades says "same"/);

    // 5. poisons — render
    const rp = async (name, type, re, opts = {}) => {
      let r;
      try { r = await renderWith(page, type, { difficulty: 2, baseName: 'G2-358-gate-poison-' + name.split(' ')[0], ...opts }); } catch (e) { judge(name, [String(e.message)], re); return; }
      const extra = [];
      const before = fails.length; assertRender(name, r, { d: opts.difficulty || 2, body: opts.body }); extra.push(...fails.splice(before));
      judge(name, [...r.verify, ...r.lints.map((l) => JSON.stringify(l)), ...extra], re);
    };
    {
      // P2: force a card whose target is big, then print "small" on one of its foil tags (the lexicon stamp carries the antonym table for printed words, so add small)
      const big = { ...TY, build(o, ctx) {
        const r = TY._buildWith(en, { ...TY.difficulty[2] }, { locale: 'en' }, ctx);
        let html = r.bodyHtml;
        const card = r.meta.cards.findIndex((c) => c.pos === 'adj');
        const c = r.meta.cards[card];
        const foil = c.tags.find((w) => w !== c.answer);
        html = html.replace(`data-lcs-target="g.${c.concept}:${c.target}"`, `data-lcs-target="g.big:big"`).replace(new RegExp(`<span data-lcs-target-word([^>]*)>${c.target}<`), '<span data-lcs-target-word$1>big<')
          .replace(new RegExp(`(<span class="ws-achip" data-lcs-tag data-lcs-group=")g\\.${c.concept}(")`), '$1g.big$2').replace(`<span data-lcs-word>${c.answer}<`, '<span data-lcs-word>large<')
          .replace(new RegExp(`(data-lcs-group=")(g\\.[a-z]+)(" data-lcs-slot="\\d"[^>]*><span data-lcs-word>)${foil}<`), '$1g.small$3small<');
        // the lexicon slice must know the printed groups / antonyms (verify reads the stamp)
        html = html.replace(/data-lcs-lex="([^"]+)"/, (m0, s) => {
          const lex = JSON.parse(s.replace(/&quot;/g, '"').replace(/&amp;/g, '&'));
          for (const id of ['g.big', 'g.small']) { const g = en.groups.find((x) => x.id === id); lex.groups[id] = { concept: g.concept, pos: g.pos, domain: g.domain, words: g.words }; }
          lex.ant.big = ['small', 'little']; lex.ant.large = ['small', 'little']; lex.ant.small = ['big', 'large', 'huge'];
          return `data-lcs-lex="${JSON.stringify(lex).replace(/&/g, '&amp;').replace(/"/g, '&quot;')}"`;
        });
        r.bodyHtml = html; return r;
      } };
      await rp('P2 target big with a tag small', big, /"small" is an antonym of the target or the answer/);
    }
    // P18: "quick" printed as a distractor on one card AND as the answer / target on another
    await rp('P18 a word twice on the page', doctored((html) => {
      const words = [...html.matchAll(/<span data-lcs-word>([^<]+)</g)].map((x) => x[1]);
      return html.replace(`<span data-lcs-word>${words[1]}<`, `<span data-lcs-word>${words[5]}<`);
    }), /printed twice on the page/);
    // PR1: cardGrid's default geometry (gap 14, minmax(0,1fr)) at the fi (667) chrome with 4 px of extra band -> a card clips
    await rp('PR1 cardGrid default rows clip', doctored((html) => html.replace(/grid-template-rows:repeat\(4,minmax\(158px,1fr\)\);column-gap:14px;row-gap:12px/, 'grid-template-rows:repeat(4,minmax(0,1fr));gap:14px')
      .replace(/height:40px;flex:0 0 40px/g, 'height:44px;flex:0 0 44px')), /the card clips/, { strings: LONG.fi, body: 667 });
    // PR2: base slots [0,0,0,1,1,2,2,3]
    await rp('PR2 unbalanced slots', withBlock(en, { _forceSlots: [0, 0, 0, 1, 1, 2, 2, 3] }), /slot balance: slot 1 holds 3 answers|answers cards 1\.\.3 in a row/);
    // PR6: an off-token inline border on a card (the shared lint reads SVG attributes only)
    await rp('PR6 off-token inline border', doctored((html) => html.replace('style="justify-content:space-evenly;padding:12px"', 'style="justify-content:space-evenly;padding:12px;border-color:#F0E4CB"')), /off-token inline hex #F0E4CB/);
    // PR7: a base build fed the F2 config
    { let m = ''; try { TY._buildWith(en, { mode: 'pairs', pairs: 8 }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } judge('PR7 base fed the F2 config', m ? [m] : [], /mode "pairs" is a face/); }
    // PS: SPARSE — d1 with its cards top-packed (flex-start) at the 814 chrome leaves a > 40 px band under the tags
    await rp('PS top-packed d1 cards (sparse)', doctored((html) => html.replace(/justify-content:space-evenly;padding:12px/g, 'justify-content:flex-start;padding:12px')), /SPARSE — \d+ px blank band/, { difficulty: 1, strings: SHORT });
  } finally { await browser.close(); }

  console.log('poison:\n' + log.join('\n'));
  if (fails.length) console.log('FAILS:\n  ' + fails.slice(0, 40).join('\n  '));
  const pass = !fails.length && killed === total;
  console.log(pass ? `PASS (${assertions} assertions, ${killed}/${total} poisons killed)` : `FAIL (${fails.length} findings, ${killed}/${total} poisons killed)`);
  return pass;
}

if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank };
