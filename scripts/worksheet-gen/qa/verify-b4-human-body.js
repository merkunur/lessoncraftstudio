#!/usr/bin/env node
/**
 * verify-b4-human-body.js — the K-354 `human-body` gate (design file
 * docs/worksheet-gen/b4-designs/K-354-human-body.md §5, base scope; the
 * nt10-D build brief deliverable 4). The five faces (K-360 K-361 G1-356 K-362
 * K-363) add their branches in Phase 2.
 *
 *   node scripts/worksheet-gen/qa/verify-b4-human-body.js [--quick]
 *
 * 1. FACTS — data/b4/body-facts.json against §5 rules 1-3 + 7 (validateFacts):
 *    the 16 part keys, counts in {1,2,10,null}, facts in {1,2,5,10}, no tooth /
 *    brain / heart / skeleton / muscles anywhere, hair null, toe.countFace
 *    false; every cue resolves via fileUri('body parts', cue), has a vocab
 *    singular in all 11 locales and is not B2_EXCLUDE'd; every chipPool member
 *    picOpened:true; shoulder / neck / thumb / chin / tongue (the `excluded`
 *    block) never in chipPool; confusable groups disjoint and inside chipPool;
 *    omitPool ⊂ hideable, eye never hideable; countPools[10] single-instance
 *    cues (toe out); pairsPool pairs all 2, singles all 1 and >= 4, neither
 *    holding finger toe hair thumb chin tongue; leadSet ∪ faceSet = the 16.
 * 2. BANK — validateBank(block, loc) (also called by tools/b4-probe-child.js
 *    for every panel draft): rule 4 partWords === displayWord(vocab) or an
 *    overrides[id] with a reason, no two equal, bankWords END with partWords;
 *    rule 5 plural / factLabels whole (<= 34, no digit, no slot), fi
 *    factLabels never the vocab plural, the two hand/foot facts present unless
 *    `count` is refused; rule 6 refuseWords ids ⊂ 16, the F3 pool (single
 *    token, <= 8 letters, minus refuseWords.write) >= 8 else refuse names
 *    write, base pool >= 8, pairs >= 4 + 4; rule 8 titles <= 70, no
 *    worksheet-word, unique per band, never the `body_parts` theme name / slug
 *    of the locale, fi never "ruumiinosa" / "parillis", instructions <= 150,
 *    no visible free-claim; rule 9 no colour word adjacent to a part word in
 *    ONE literal; rule 10 strings ids === base + the five allocated faces,
 *    every face title = base title + separator + a suffix that carries a MOVE
 *    (a `?` or a verb / question word of the locale), suffix token sets
 *    pairwise distinct beyond a stoplist of adjectives.
 * 3. RENDER through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 / d3 en, then d2 under the 722 chrome (a 3-line de title
 *    + 3-line instruction) AND the 677 chrome (a 4-line fi title); asserts
 *    verify() empty, qa/lints.js clean and the floors ITSELF: lanes >= 56 high
 *    and === config, writing-row rules glyphH apart, bank words >= 18 px and
 *    unclipped, the en bank one row (59), the figure === figureH with 12
 *    regions and every outline 3 px teal, rings r 7 coral stroke 3, everything
 *    above the footer and inside the body; the NODE CROSS-CHECK: every bank
 *    word text === bankWords[id] of the bank; the node SWEEP on the stamps
 *    (an independent sampled-point test: no leader intersects another, none
 *    within 16 px of a foreign ring, none crosses a limb it does not own).
 * 4. SWEEP — 20 seeds x d1/d2/d3: the label SET varies, no fallback fires at
 *    d2, the bank order never equals the lane order or its reverse, and a
 *    synthetic de block (vocab words) renders the SAME ids / sides / order as
 *    en (locale-neutral seed); the fixed fallback sets build sweep-clean;
 *    a refuseWords.base:['eye'] block never draws eye; an unauthored locale
 *    REFUSES. (--quick skips the 20-seed loops.)
 * 5. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1); the correct EN
 *    bank / facts are the control. Design §5:
 *      P1  parts.tooth = {count:20}                 → rule 1
 *      P2  cue 'durian' on fingersOneHand           → rule 2
 *      P3  chipPool += shoulder                     → rule 2
 *      P4  de partWords.eye 'Augen'                 → rule 4
 *      P5  fi partWords.leg 'jalka' with foot 'jalka' → rule 4
 *      P6  no overrides.neck with reason ''         → rule 4
 *      P7  de bankWords.hair 'das Haar'             → rule 4 (does not end with "Haare")
 *      P8  fi factLabels.eye 'silmät'               → rule 5
 *      P9  pairsPool.pairs += finger                → rule 7
 *      P10 sv title 'Kroppsdelar'                   → rule 8
 *      P11 fi F5 title with 'parilliset'            → rule 8
 *      P12 de literal 'blauer Arm'                  → rule 9
 *      P13 F3 title 'Parts of the Body: Big Words'  → rule 10
 *      PR1 the head anchor mirrored to the far side → verify() (a leader across the figure)
 *      PR8 an answerBox injected on the page        → verify() (data-lcs-answer="undefined")
 *      PR9 a RIGID stage row under the fi chrome    → qa/lints.js footer lint
 *      PR10 faceMax 3 from a level-index guard      → the config guard fires before render
 *      PR12 is the primitive gate's (qa/verify-body-figure.js, run here)
 *    plus the base needs: PL a model word on a lane → verify(); PB the bank in
 *    lane order → verify(); PD a lane dropped → verify() bijection; PW a bank
 *    word ≠ the literal → the node cross-check; PC a leader run past a foreign
 *    ring → verify() 16 px; PO a leader rewired across the arm → the node
 *    obstacle sweep; PX a lane 40 high → the spec guard + the floor past it.
 */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { vocab, excluded, fileUri, displayWord } = require('../lib/b2-common.js');
const tokens = require('../primitives/_tokens.js');
const { COLOR_WORDS } = require('../data/color-words.js');
const { answerBox } = require('../templates/components.js');
const freeClaim = require('../../lib/free-claim.js');
const BF = require('../primitives/body-figure.js');
const C4 = require('../templates/components-b4.js');
const bankMod = require('../data/b4/human-body.js');
const FACTS = require('../data/b4/body-facts.json');
const alloc = require('../../../docs/worksheet-gen/b4-designs/_records/b4var-id-allocation.json');
const figureGate = require('./verify-body-figure.js');

const TYPE = require('../types/k/K-354-human-body.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const K_FLOOR = tokens.density.K.minElement;   // 56
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const IDS = BF.ANCHOR_IDS;
const BASE_ID = 'K-354';
const FACE_IDS = alloc.faces.filter((f) => f.family === BASE_ID).map((f) => f.id);   // K-360 K-361 G1-356 K-362 K-363
const FACE_KEYS = ['base', 'count', 'color', 'write', 'missing', 'pairs'];
const BANNED_PARTS = ['tooth', 'teeth', 'brain', 'heart', 'skeleton', 'muscles', 'muscle'];
const NEVER_PAIRS = ['finger', 'toe', 'hair', 'thumb', 'chin', 'tongue'];
const SINGLE_TOKEN = /^[\p{L}][\p{L}'’-]*$/u;
/** Rule 10: a face suffix must carry a MOVE — a `?` or one of these per locale (panels may extend via bank.moveWords). */
const MOVE_WORDS = {
  en: ['color', 'colour', 'write', 'draw', 'circle', 'count', 'find', 'label', 'match', 'sort', 'trace', 'cut', 'how', 'what', 'which', 'where', 'who'],
  de: ['ausmalen', 'schreiben', 'malen', 'zeichnen', 'einkreisen', 'zählen', 'finden', 'ordnen', 'wie', 'was', 'welche', 'welcher', 'wo', 'wer'],
  es: ['colorea', 'escribe', 'pinta', 'dibuja', 'rodea', 'cuenta', 'encuentra', 'une', 'cuántos', 'cuántas', 'qué', 'cuáles', 'cuál', 'dónde'],
  pt: ['pinte', 'escreva', 'colora', 'desenhe', 'circule', 'conte', 'complete', 'ligue', 'quantos', 'quantas', 'que', 'quais', 'qual', 'onde'],
  fr: ['colorie', 'écris', 'dessine', 'entoure', 'compte', 'trouve', 'relie', 'combien', 'que', 'quoi', 'lesquels', 'lequel', 'où', 'qui'],
  it: ['colora', 'scrivi', 'disegna', 'cerchia', 'conta', 'trova', 'collega', 'quanti', 'quante', 'cosa', 'quali', 'quale', 'dove', 'chi'],
  nl: ['kleur', 'schrijf', 'teken', 'omcirkel', 'tel', 'zoek', 'verbind', 'hoeveel', 'wat', 'welke', 'welk', 'waar', 'wie'],
  sv: ['färglägg', 'skriv', 'rita', 'ringa', 'räkna', 'hitta', 'dra', 'hur', 'vad', 'vilka', 'vilken', 'var', 'vem'],
  da: ['farvelæg', 'skriv', 'tegn', 'sæt', 'tæl', 'find', 'forbind', 'hvor', 'hvad', 'hvilke', 'hvilken', 'hvem'],
  no: ['fargelegg', 'skriv', 'tegn', 'sett', 'tell', 'finn', 'trekk', 'hvor', 'hva', 'hvilke', 'hvilken', 'hvem'],
  fi: ['väritä', 'kirjoita', 'piirrä', 'ympyröi', 'laske', 'etsi', 'yhdistä', 'kuinka', 'montako', 'mikä', 'mitkä', 'mitä', 'missä', 'kuka'],
};
const STOP = new Set(['the', 'a', 'an', 'of', 'by', 'in', 'to', 'and', 'or', 'big', 'small', 'little', 'new', 'old', 'easy', 'hard', 'fun', 'more', 'der', 'die', 'das', 'ein', 'eine', 'nach', 'mit', 'und', 'el', 'la', 'los', 'las', 'de', 'del', 'por', 'y', 'o', 'le', 'les', 'un', 'une', 'du', 'des', 'et', 'il', 'lo', 'gli', 'con', 'per', 'e', 'het', 'een', 'van', 'en', 'op', 'ett', 'och', 'av', 'på', 'og', 'af', 'i', 'ja', 'mukaan']);

let assertions = 0;
const fails = [];
function ok(cond, msg) { assertions++; if (!cond) fails.push(msg); return !!cond; }
const chars = (s) => [...String(s || '')].length;

/* ------------------------------------------------------------------ facts (rules 1-3, 7) */
function validateFacts(F) {
  const f = [];
  const v = vocab();
  const parts = F.parts || {};
  const keys = Object.keys(parts).sort();
  if (keys.join() !== [...IDS].sort().join()) f.push(`parts keys ${JSON.stringify(keys)} ≠ the 16 anchor ids`);
  for (const [id, p] of Object.entries(parts)) {
    if (![1, 2, 10, null].includes(p.count)) f.push(`parts.${id}.count ${p.count} ∉ {1, 2, 10, null}`);
    if (BANNED_PARTS.includes(id) || BANNED_PARTS.includes(p.cue)) f.push(`parts.${id}: a banned part (${BANNED_PARTS.join(' ')})`);
  }
  if (parts.hair && parts.hair.count !== null) f.push('hair.count must be null (uncountable)');
  if (parts.toe && parts.toe.countFace !== false) f.push('toe.countFace must be false (the picture prints five toes)');
  for (const x of F.facts || []) {
    if (![1, 2, 5, 10].includes(x.count)) f.push(`facts.${x.id}.count ${x.count} ∉ {1, 2, 5, 10}`);
    if (!parts[x.part]) f.push(`facts.${x.id}.part ${x.part} is not a part`);
    if (BANNED_PARTS.includes(x.part) || BANNED_PARTS.includes(x.cue)) f.push(`facts.${x.id}: a banned part`);
  }
  // rule 2 — cues resolve, vocab x11, not excluded; chip pictures opened; the excluded block never in chipPool
  const cues = [...Object.entries(parts).map(([id, p]) => [`parts.${id}.cue`, p.cue]), ...(F.facts || []).map((x) => [`facts.${x.id}.cue`, x.cue])];
  for (const [what, cue] of cues) {
    if (cue == null) continue;
    try { fileUri('body parts', cue); } catch (e) { f.push(`${what} "${cue}" does not resolve: ${e.message}`); continue; }
    for (const loc of LOCALES) { if (!v[cue] || !v[cue][loc] || !v[cue][loc][0]) f.push(`${what} "${cue}" has no ${loc} singular`); if (excluded(cue, loc)) f.push(`${what} "${cue}" is B2_EXCLUDE'd in ${loc}`); }
  }
  const chip = Array.isArray(F.chipPool) ? F.chipPool : [];
  const chipIds = chip.map((c) => (typeof c === 'string' ? c : c.id));
  for (const c of chip) {
    const id = typeof c === 'string' ? c : c.id;
    if (typeof c === 'string' || c.picOpened !== true) f.push(`chipPool ${id}: picOpened is not true`);
    if (!IDS.includes(id)) f.push(`chipPool ${id} is not one of the 16`);
    try { fileUri('body parts', id); } catch (e) { f.push(`chipPool ${id} does not resolve`); }
  }
  for (const x of ['shoulder', 'neck', 'thumb', 'chin', 'tongue']) if (chipIds.includes(x)) f.push(`chipPool holds ${x} (excluded by the design)`);
  for (const x of Object.keys(F.excluded || {})) if (chipIds.includes(x)) f.push(`chipPool holds ${x} but excluded.${x} says: ${F.excluded[x]}`);
  if (!F.excluded || ['shoulder', 'neck', 'thumb', 'chin', 'tongue'].some((x) => !F.excluded[x])) f.push('excluded must record shoulder, neck, thumb, chin, tongue with a reason each');
  if (parts.shoulder && parts.shoulder.cue !== null) f.push('shoulder.cue must be null (picture rejected)');
  // rule 3
  const groups = F.confusable || [];
  const seen = new Set();
  for (const g of groups) for (const id of g) { if (!chipIds.includes(id)) f.push(`confusable ${id} ∉ chipPool`); if (seen.has(id)) f.push(`confusable ${id} in two groups`); seen.add(id); }
  const hideable = F.hideable || [];
  if (hideable.includes('eye')) f.push('eye is hideable');
  for (const [h, pool] of Object.entries(F.omitPool || {})) for (const id of pool) if (!hideable.includes(id)) f.push(`omitPool[${h}] ${id} ∉ hideable`);
  const cp = F.countPools || {};
  for (const id of cp['10'] || []) { if (id === 'toe') f.push('countPools[10] holds toe (five toes printed)'); if (!parts[id] || parts[id].count !== 10) f.push(`countPools[10] ${id} count ≠ 10`); }
  for (const id of cp['1'] || []) if (!parts[id] || parts[id].count !== 1) f.push(`countPools[1] ${id} count ≠ 1`);
  for (const id of cp['2'] || []) if (!parts[id] || parts[id].count !== 2) f.push(`countPools[2] ${id} count ≠ 2`);
  // rule 7
  const pp = F.pairsPool || {};
  for (const id of pp.pairs || []) if (!parts[id] || parts[id].count !== 2) f.push(`pairsPool.pairs ${id} count ≠ 2`);
  for (const id of pp.singles || []) if (!parts[id] || parts[id].count !== 1) f.push(`pairsPool.singles ${id} count ≠ 1`);
  for (const id of [...(pp.pairs || []), ...(pp.singles || [])]) if (NEVER_PAIRS.includes(id)) f.push(`pairsPool holds ${id} (never)`);
  if (!pp.singles || pp.singles.length < 4) f.push('pairsPool.singles < 4');
  const lead = F.leadSet || [], face = F.faceSet || [];
  if ([...lead, ...face].sort().join() !== [...IDS].sort().join() || lead.some((x) => face.includes(x))) f.push('leadSet ∪ faceSet ≠ the 16 (or they overlap)');
  return f;
}

/* ------------------------------------------------------------------ bank (rules 4-6, 8-10) */
function themeNames(loc) {
  try {
    const tax = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json'), 'utf8'));
    const t = tax.axes.theme.body_parts || {};
    return [t.name && t.name[loc], t.slug && t.slug[loc]].filter(Boolean).map((s) => s.toLocaleLowerCase(loc));
  } catch (e) { return []; }
}
function tokens_(s, loc) { return String(s || '').toLocaleLowerCase(loc).replace(/[^\p{L}\s'’-]/gu, ' ').split(/\s+/).filter(Boolean); }
function validateBank(bank, loc) {
  const f = [];
  const push = (m) => f.push(`[${loc}] ${m}`);
  const v = vocab();
  if (!bank || typeof bank !== 'object') { push('no block'); return f; }
  const PW = bank.partWords || {}, OV = bank.overrides || {}, BW = bank.bankWords || {}, PL = bank.plural || {}, FL = bank.factLabels || {};
  const refuse = Array.isArray(bank.refuse) ? bank.refuse : [];
  const RW = bank.refuseWords || {};
  const whole = (what, s, max) => {
    if (typeof s !== 'string' || !s.trim()) { push(`${what} missing`); return false; }
    if (s.includes('{')) push(`${what} "${s}" carries a slot`);
    if (/\d/.test(s)) push(`${what} "${s}" prints a digit`);
    if (max && chars(s) > max) push(`${what} "${s}" > ${max} chars`);
    return true;
  };
  // rule 4
  const seenPW = new Map();
  for (const id of IDS) {
    if (!whole(`partWords.${id}`, PW[id])) continue;
    const cite = v[id] && v[id][loc] && v[id][loc][0];
    const want = cite ? displayWord(cite, loc) : null;
    const o = OV[id];
    if (o) {
      if (typeof o.reason !== 'string' || !o.reason.trim()) push(`overrides.${id} has no reason`);
      if (o.word !== PW[id]) push(`overrides.${id}.word "${o.word}" ≠ partWords.${id} "${PW[id]}"`);
      if (want && o.word === want) push(`overrides.${id} equals the vocab singular "${want}" (no override needed)`);
    } else if (!want) push(`no vocab singular for ${id} in ${loc}`);
    else if (PW[id] !== want) push(`partWords.${id} "${PW[id]}" ≠ vocab singular "${want}" (and no overrides.${id} with a reason)`);
    const k = PW[id].toLocaleLowerCase(loc);
    if (seenPW.has(k)) push(`partWords.${id} "${PW[id]}" equals partWords.${seenPW.get(k)}`); else seenPW.set(k, id);
    if (whole(`bankWords.${id}`, BW[id]) && !BW[id].toLocaleLowerCase(loc).endsWith(k)) push(`bankWords.${id} "${BW[id]}" does not end with partWords.${id} "${PW[id]}"`);
  }
  for (const id of Object.keys(OV)) if (!IDS.includes(id)) push(`overrides.${id} is not one of the 16`);
  // rule 5
  for (const id of IDS) {
    whole(`plural.${id}`, PL[id], 34);
    if (whole(`factLabels.${id}`, FL[id], 34) && loc === 'fi') {
      const pl = v[id] && v[id].fi && v[id].fi[1];
      if (pl && FL[id].toLocaleLowerCase('fi') === pl.toLocaleLowerCase('fi')) push(`factLabels.${id} "${FL[id]}" is the vocab plural (fi partitive rule)`);
    }
  }
  for (const k of ['fingersOneHand', 'toesOneFoot']) if (!(typeof FL[k] === 'string' && FL[k].trim())) { if (!refuse.includes('count')) push(`factLabels.${k} missing and count is not refused`); } else whole(`factLabels.${k}`, FL[k], 34);
  // rule 6
  for (const [face, ids] of Object.entries(RW)) {
    if (!FACE_KEYS.includes(face)) push(`refuseWords.${face} is not a face`);
    for (const id of ids || []) if (!IDS.includes(id)) push(`refuseWords.${face} names "${id}"`);
  }
  for (const x of refuse) if (!FACE_KEYS.includes(x)) push(`refuse names "${x}"`);
  const writePool = IDS.filter((id) => { const w = String(PW[id] || '').normalize('NFC'); return SINGLE_TOKEN.test(w) && [...w.replace(/['’-]/g, '')].length <= 8 && !(RW.write || []).includes(id); });
  if (writePool.length < 8 && !refuse.includes('write')) push(`F3 eligible pool ${writePool.length} < 8 and write is not refused`);
  const basePool = IDS.filter((id) => !(RW.base || []).includes(id));
  if (basePool.length < 8 && !refuse.includes('base')) push(`base pool ${basePool.length} < 8 and base is not refused`);
  const pp = FACTS.pairsPool || { pairs: [], singles: [] };
  const pairs = pp.pairs.filter((id) => !(RW.pairs || []).includes(id)), singles = pp.singles.filter((id) => !(RW.pairs || []).includes(id));
  if ((pairs.length < 4 || singles.length < 4) && !refuse.includes('pairs')) push(`F5 pools ${pairs.length} pairs / ${singles.length} singles < 4 + 4 and pairs is not refused`);
  // rule 8 — strings
  const S = bank.strings || {};
  const wantIds = [BASE_ID, ...FACE_IDS];
  const haveIds = Object.keys(S).sort();
  if (haveIds.join() !== wantIds.slice().sort().join()) push(`strings ids ${JSON.stringify(haveIds)} ≠ ${JSON.stringify(wantIds.slice().sort())} (rule 10)`);
  const names = themeNames(loc);
  const byBand = {};
  for (const id of wantIds) {
    const s = S[id];
    if (!s) continue;
    const t = String(s.title || ''), ins = String(s.instruction || '');
    if (!t.trim() || chars(t) > 70) push(`${id} title "${t}" empty or > 70 chars`);
    if (WORKSHEET_WORD.test(t)) push(`${id} title carries the worksheet word`);
    if (names.includes(t.trim().toLocaleLowerCase(loc))) push(`${id} title "${t}" equals the body_parts theme name / slug of ${loc}`);
    if (!ins.trim() || chars(ins) > 150) push(`${id} instruction empty or > 150 chars`);
    if (loc === 'fi' && /ruumiinosa|parillis/i.test(t + ' ' + ins)) push(`${id} fi string uses "ruumiinosa" / "parillis"`);
    for (const [what, str] of [['title', t], ['instruction', ins]]) { const hit = freeClaim.hit(str); if (hit) push(`${id} ${what} claims free ("${hit}")`); }
    if (/with answers|mit lösungen|con respuestas|com respostas|avec (les )?réponses|con (le )?soluzioni|met antwoorden|med facit|med svar|vastauksineen|vastauksilla/i.test(t + ' ' + ins)) push(`${id} promises an answer key (printables ship none)`);
    const band = id.split('-')[0];
    const k = t.trim().toLocaleLowerCase(loc);
    (byBand[band] = byBand[band] || new Map());
    if (byBand[band].has(k)) push(`${id} title "${t}" repeats ${byBand[band].get(k)} within band ${band}`); else byBand[band].set(k, id);
  }
  // rule 9 — a colour word adjacent to a part word in ONE literal
  const colours = Object.values(COLOR_WORDS[loc] || {}).map((c) => c.toLocaleLowerCase(loc));
  const partish = new Set([...Object.values(PW), ...Object.values(PL)].filter(Boolean).map((w) => w.toLocaleLowerCase(loc)));
  const literals = [...Object.values(BW), ...Object.values(PL), ...Object.values(FL), ...Object.values(bank.use || {}), ...Object.values(S).flatMap((s) => [s.title, s.instruction])];
  for (const lit of literals) {
    const tk = tokens_(lit, loc);
    for (let i = 0; i + 1 < tk.length; i++) {
      const pair = [[tk[i], tk[i + 1]], [tk[i + 1], tk[i]]];
      for (const [a, b] of pair) if (colours.some((c) => a === c || (a.startsWith(c) && a.length <= c.length + 3)) && partish.has(b)) { push(`literal "${lit}" puts a colour word beside a part word (rule 9)`); i = tk.length; break; }
    }
  }
  // rule 10 — face titles = base + suffix carrying a MOVE; suffix token sets pairwise distinct
  const base = S[BASE_ID] && String(S[BASE_ID].title || '').trim();
  const moves = new Set([...(MOVE_WORDS[loc] || []), ...(bank.moveWords || [])].map((w) => w.toLocaleLowerCase(loc)));
  const suffixes = [];
  for (const id of FACE_IDS) {
    const s = S[id]; if (!s || !base) continue;
    const t = String(s.title || '').trim();
    const m = new RegExp('^' + base.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*[:：]\\s*(.+)$', 'u').exec(t);
    if (!m) { push(`${id} title "${t}" is not "${base}: <suffix>" (rule 10)`); continue; }
    const suf = m[1].trim();
    const tk = tokens_(suf, loc).filter((x) => !STOP.has(x));
    if (!/[?？]$/.test(suf) && !tk.some((x) => moves.has(x))) push(`${id} title suffix "${suf}" names no move (no ? and no verb / question word of ${loc}) — an adjective is not a face (rule 10)`);
    for (const [pid, ptk] of suffixes) { const sym = [...tk.filter((x) => !ptk.includes(x)), ...ptk.filter((x) => !tk.includes(x))]; if (!sym.length) push(`${id} and ${pid} suffixes differ only by stoplisted words (rule 10)`); }
    suffixes.push([id, tk]);
  }
  return f;
}

/* ---------------------------------------------------------------- render */
async function renderWith(page, type, { difficulty, baseName, strings, seedEpoch }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale: 'en', page, outDir: OUT, baseName, strings, seedEpoch });
  const m = await page.evaluate(() => {
    const rect = (el) => { const r = el.getBoundingClientRect(); return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, w: r.width, h: r.height }; };
    const root = document.querySelector('[data-lcs-type="human-body"]');
    const q = (s) => (root ? root.querySelector(s) : null), qa = (s) => (root ? [...root.querySelectorAll(s)] : []);
    const banner = q('[data-lcs-bank-banner]');
    const fig = q('svg[data-lcs-body]');
    const stage = q('[data-lcs-labelstage]');
    const overlay = q('svg[data-lcs-pointers]');
    const or = overlay ? rect(overlay) : { left: 0, top: 0 };
    const scale = fig ? +fig.getAttribute('data-lcs-scale') : 0;
    return {
      body: rect(document.querySelector('[data-lcs-body]')),
      foot: document.querySelector('.ws-foot').getBoundingClientRect().top,
      headH: rect(document.querySelector('.ws-head')).h,
      stamps: root ? { ...root.dataset } : null,
      lowest: Math.max(...qa('*').map((el) => el.getBoundingClientRect().bottom)),
      answers: qa('[data-lcs-answer]').map((a) => a.getAttribute('data-lcs-answer')),
      banner: banner ? rect(banner) : null,
      bank: qa('[data-lcs-bank-banner] [data-lcs-bank]').map((w) => ({ id: w.dataset.lcsBank, text: w.textContent.trim(), w: w.scrollWidth, clientW: w.clientWidth, px: parseFloat(getComputedStyle(w).fontSize), font: getComputedStyle(w).fontFamily })),
      lanes: qa('[data-lcs-label]').map((l) => { const ls = l.querySelectorAll('svg[data-lcs-prim="writing-row"] line'); return { id: l.dataset.lcsLabel, side: l.dataset.lcsSide, ...rect(l), text: l.textContent.trim(), glyph: ls.length >= 3 ? Math.abs(+ls[2].getAttribute('y1') - +ls[0].getAttribute('y1')) : 0 }; }),
      stage: stage ? rect(stage) : null,
      figure: fig ? { ...rect(fig), h: rect(fig).h, bodyH: +fig.getAttribute('data-lcs-body-h'), hidden: fig.getAttribute('data-lcs-hidden'), regions: fig.querySelectorAll('[data-lcs-region]').length, markers: fig.querySelectorAll('[data-lcs-marker]').length,
        strokes: [...fig.querySelectorAll('[data-lcs-region] [stroke]')].map((el) => ({ c: (el.getAttribute('stroke') || '').toUpperCase(), px: parseFloat(el.getAttribute('stroke-width')) * scale })) } : null,
      pointers: overlay ? [...overlay.querySelectorAll('line[data-lcs-pointer]')].map((l) => ({ id: l.dataset.lcsPointer, side: l.dataset.lcsSide, ax: or.left + +l.dataset.lcsAx, ay: or.top + +l.dataset.lcsAy, lx: or.left + +l.dataset.lcsLx, ly: or.top + +l.dataset.lcsLy, x1: or.left + +l.getAttribute('x1'), y1: or.top + +l.getAttribute('y1') })) : [],
      rings: overlay ? [...overlay.querySelectorAll('circle[data-lcs-anchor-ring]')].map((c) => ({ id: c.dataset.lcsAnchorRing, r: +c.getAttribute('r'), sw: +c.getAttribute('stroke-width'), stroke: (c.getAttribute('stroke') || '').toUpperCase(), fill: c.getAttribute('fill') })) : [],
      imgs: qa('img').length,
    };
  });
  return { lints: out.qa.lints, verify: out.qa.verify, m, png: out.pngPath, html: out.html, meta: out.meta };
}

/* ------------------------------------------------------------ the node sweep (an INDEPENDENT method: sampled points against the obstacle shapes) */
function pointInObstacle(x, y, o, m) {
  if (o.kind === 'circle') return Math.hypot(x - o.cx, y - o.cy) <= o.r + m;
  if (o.kind === 'ellipse') { const k = Math.min(o.rx, o.ry); return Math.hypot((x - o.cx) / o.rx, (y - o.cy) / o.ry) <= 1 + m / k; }
  if (o.kind === 'rect') return x >= o.x - m && x <= o.x + o.w + m && y >= o.y - m && y <= o.y + o.h + m;
  // capsule: distance from the point to the axis segment
  const dx = o.b[0] - o.a[0], dy = o.b[1] - o.a[1], L2 = dx * dx + dy * dy;
  const t = Math.max(0, Math.min(1, ((x - o.a[0]) * dx + (y - o.a[1]) * dy) / L2));
  return Math.hypot(x - (o.a[0] + t * dx), y - (o.a[1] + t * dy)) <= o.w / 2 + m;
}
function nodeSweep(pointers, figRect, figureH) {
  const f = [];
  const fig = BF.bodyFigure({ h: figureH });
  const obs = fig.obstacles.map((o) => (o.kind === 'circle' || o.kind === 'ellipse' ? { ...o, cx: o.cx + figRect.left, cy: o.cy + figRect.top }
    : o.kind === 'rect' ? { ...o, x: o.x + figRect.left, y: o.y + figRect.top } : { ...o, a: [o.a[0] + figRect.left, o.a[1] + figRect.top], b: [o.b[0] + figRect.left, o.b[1] + figRect.top] }));
  const own = (id, side) => new Set((BF.OWN_REGIONS[id] || []).flatMap((r) => (['arm', 'hand', 'leg', 'foot', 'ear'].includes(r) ? [r + '-' + side] : [r])));
  const orient = (ax, ay, bx, by, cx, cy) => Math.sign((bx - ax) * (cy - ay) - (by - ay) * (cx - ax));
  for (let i = 0; i < pointers.length; i++) for (let j = i + 1; j < pointers.length; j++) {
    const p = pointers[i], q = pointers[j];
    if (orient(p.ax, p.ay, p.lx, p.ly, q.ax, q.ay) * orient(p.ax, p.ay, p.lx, p.ly, q.lx, q.ly) < 0 && orient(q.ax, q.ay, q.lx, q.ly, p.ax, p.ay) * orient(q.ax, q.ay, q.lx, q.ly, p.lx, p.ly) < 0) f.push(`leaders ${p.id} and ${q.id} intersect`);
  }
  for (const p of pointers) {
    const mine = own(p.id, p.side);
    const n = Math.ceil(Math.hypot(p.lx - p.x1, p.ly - p.y1) / 2);
    for (let k = 0; k <= n; k++) {
      const x = p.x1 + (p.lx - p.x1) * k / n, y = p.y1 + (p.ly - p.y1) * k / n;
      for (const q of pointers) if (q !== p && Math.hypot(x - q.ax, y - q.ay) < 16) { f.push(`leader ${p.id} within 16 px of the ${q.id} ring`); break; }
      for (const o of obs) if (!mine.has(o.region) && pointInObstacle(x, y, o, 3)) { f.push(`leader ${p.id}-${p.side} runs over the figure's ${o.region}`); break; }
    }
  }
  return [...new Set(f)];
}

function assertRender(name, r, cfg, bank, opts = {}) {
  const m = r.m;
  ok(r.verify.length === 0, `${name}: verify() ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  if (!m.stamps) { ok(false, `${name}: no root`); return; }
  ok(!m.stamps.lcsLayout, `${name}: data-lcs-layout stamped on the base`);
  ok(m.answers.every((a) => a === ''), `${name}: an answer value is stamped ${JSON.stringify(m.answers)}`);
  ok(m.imgs === 0, `${name}: ${m.imgs} <img> on the base`);
  ok(m.lowest <= m.foot + 0.6, `${name}: content reaches ${Math.round(m.lowest)} against the footer at ${Math.round(m.foot)}`);
  // the bank: one row for en at 18 px, words >= 18 px unclipped, text === the literal, order !== lane order
  ok(!!m.banner && Math.abs(m.banner.w - 675) < 1, `${name}: bank ${m.banner && Math.round(m.banner.w)} wide ≠ 675`);
  ok(!!m.banner && m.banner.h <= (opts.bankRows === 2 ? 110 : 60), `${name}: bank ${m.banner && Math.round(m.banner.h)} px high (want ${opts.bankRows === 2 ? '<= 110 (two rows)' : 'one row <= 60'})`);
  ok(m.bank.length === cfg.labels, `${name}: ${m.bank.length} bank words ≠ ${cfg.labels}`);
  for (const w of m.bank) {
    ok(w.text === bank.bankWords[w.id], `${name}: bank word ${w.id} prints "${w.text}" ≠ bank "${bank.bankWords[w.id]}"`);
    ok(w.px >= 18 - 0.01 && w.w <= w.clientW + 0.6, `${name}: bank word "${w.text}" ${w.px}px / ${w.w} of ${w.clientW}`);
    ok(/nunito/i.test(w.font), `${name}: bank word font ${w.font} (Nunito not loaded)`);
  }
  const laneOrder = m.lanes.slice().sort((a, b) => a.top - b.top || (a.side === 'L' ? -1 : 1)).map((l) => l.id);
  const bankOrder = m.bank.map((w) => w.id);
  ok(bankOrder.join() !== laneOrder.join() && bankOrder.join() !== laneOrder.slice().reverse().join(), `${name}: bank order [${bankOrder.join()}] mirrors the lane order`);
  ok(m.stamps.lcsParts === laneOrder.join(), `${name}: stamped parts ${m.stamps.lcsParts} ≠ rendered lane order ${laneOrder.join()}`);
  // the lanes
  ok(m.lanes.length === cfg.labels, `${name}: ${m.lanes.length} lanes ≠ ${cfg.labels}`);
  for (const s of ['L', 'R']) ok(m.lanes.filter((l) => l.side === s).length === cfg.perSide, `${name}: lanes on side ${s} ≠ ${cfg.perSide}`);
  for (const l of m.lanes) {
    ok(l.h >= K_FLOOR - 0.6 && Math.abs(l.h - cfg.laneH) < 1 && Math.abs(l.w - cfg.laneW) < 1, `${name}: lane ${l.id} ${Math.round(l.w)}×${Math.round(l.h)} (want ${cfg.laneW}×${cfg.laneH}, floor ${K_FLOOR})`);
    ok(l.text === '', `${name}: lane ${l.id} prints "${l.text}"`);
    ok(Math.abs(l.glyph - cfg.glyphH) <= 1, `${name}: lane ${l.id} rules ${l.glyph.toFixed(1)} apart ≠ glyphH ${cfg.glyphH}`);
    ok(l.left >= m.body.left - 0.6 && l.right <= m.body.right + 0.6 && l.bottom <= m.foot + 0.6, `${name}: lane ${l.id} leaves the body column`);
  }
  // the figure
  const F = m.figure;
  ok(!!F && F.bodyH === cfg.figureH && Math.abs(F.h - cfg.figureH) < 1 && Math.abs(F.w - cfg.figureH * 300 / 560) < 1, `${name}: figure ${F && Math.round(F.w)}×${F && Math.round(F.h)} (want ${(cfg.figureH * 300 / 560).toFixed(1)}×${cfg.figureH})`);
  ok(!!F && F.regions === 12 && !F.hidden && F.markers === 0, `${name}: figure regions ${F && F.regions} hidden ${F && F.hidden} markers ${F && F.markers}`);
  ok(!!F && F.strokes.length > 0 && F.strokes.every((s) => s.c === '#146B5E' && [3, 2.5, 1.5].some((w) => Math.abs(s.px - w) < 0.2)), `${name}: a region outline is not 3 / 2.5 / 1.5 px teal`);
  ok(!!F && !!m.stage && F.left >= m.stage.left && F.right <= m.stage.right && F.top >= m.stage.top - 0.6 && F.bottom <= m.stage.bottom + 0.6, `${name}: the figure leaves the stage`);
  // rings + pointers
  ok(m.rings.length === cfg.labels && m.rings.every((c) => c.r === 7 && c.sw === 3 && c.stroke === '#F2784B' && c.fill === 'none'), `${name}: rings ${JSON.stringify(m.rings.slice(0, 2))} (want ${cfg.labels} hollow coral r 7 stroke 3)`);
  ok(m.pointers.length === cfg.labels, `${name}: ${m.pointers.length} pointers ≠ ${cfg.labels}`);
  const sweep = F ? nodeSweep(m.pointers, F, cfg.figureH) : ['no figure'];
  ok(sweep.length === 0, `${name}: node sweep ${JSON.stringify(sweep)}`);
  // config: faceMax / leadMin
  const faces = laneOrder.filter((id) => FACTS.faceSet.includes(id)).length, leads = laneOrder.filter((id) => FACTS.leadSet.includes(id)).length;
  ok(faces <= cfg.faceMax && leads >= cfg.leadMin, `${name}: ${faces} face / ${leads} lead parts vs faceMax ${cfg.faceMax} / leadMin ${cfg.leadMin}`);
  ok(m.stage.h >= 580 - 0.6 && Math.abs(m.stage.w - 675) < 1, `${name}: stage ${Math.round(m.stage.w)}×${Math.round(m.stage.h)}`);
}

/* ----------------------------------------------------------------- helpers */
function clone(o) { return JSON.parse(JSON.stringify(o)); }
const poisonLog = [];
function judge(name, findings, re, note) {
  const hit = findings.some((x) => re.test(x));
  const verdict = hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT';
  poisonLog.push(`  ${name}: ${verdict}${note ? ' (' + note + ')' : ''}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 3))}`);
  return hit;
}
/** A synthetic locale block: the EN shape with the locale's vocab words (partWords / bankWords / plural) — what a panel's default would be. */
function syntheticBlock(loc) {
  const b = clone(bankMod.HUMAN_BODY.en);
  const v = vocab();
  for (const id of IDS) { b.partWords[id] = displayWord(v[id][loc][0], loc); b.bankWords[id] = b.partWords[id]; b.plural[id] = displayWord(v[id][loc][1] || v[id][loc][0], loc); }
  if (loc === 'fi') { b.factLabels.eye = 'Kuinka monta silmää?'; b.factLabels.finger = 'Kuinka monta sormea?'; b.factLabels.fingersOneHand = 'Montako sormea yhdessä kädessä?'; b.factLabels.toesOneFoot = 'Montako varvasta yhdessä jalassa?'; }
  return b;
}
function buildRefusal(bank, d, loc, cfgPatch) {
  try { TYPE._buildWith(bank, { ...TYPE.difficulty[d], ...(cfgPatch || {}) }, { locale: loc || 'en' }, { rng: makeRng('poison') }); return []; } catch (e) { return [e.message]; }
}
/** A type whose bodyHtml is the real d-build rewritten by `fn` (past the spec's own guards). */
function rewired(bank, fn, cfgPatch) {
  return Object.assign(Object.create(TYPE), { build(args, ctx) {
    const cfg = cfgPatch ? { ...TYPE.difficulty[args.difficulty], ...cfgPatch } : TYPE.difficulty[args.difficulty];
    const out = TYPE._buildWith(bank, cfg, args, ctx);
    out.bodyHtml = fn(out.bodyHtml);
    return out;
  } });
}
async function gateFindings(page, type, d, baseName, bank, opts) {
  const r = await renderWith(page, type, { difficulty: d, baseName, strings: opts && opts.strings });
  const before = fails.length, saved = assertions;
  assertRender(baseName, r, TYPE.difficulty[d], bank, opts || {});
  const own = fails.splice(before);
  assertions = saved;
  return { r, own };
}

/* the chrome fixtures (README ruling): 722 = a 3-line title + a 3-line instruction (de: 67-char title, 144-char
 * instruction, measured body 710) and 677 = a 4-line fi title + a 3-line instruction. Nunito 18 holds ~78 chars a
 * line, so a 150-char fi instruction stays at two lines (body 700, measured on five variants); the fi fixture runs
 * a 176-char instruction to reach the README's third line. The 150 cap is the validator's for SHIPPED copy; a
 * fixture models the tightest chrome the page must survive, and the gate asserts the squeeze it produced. */
const LONG = {
  de: { title: 'Der Körper: Wörter aus der Wortbank auf die richtigen Schreiblinien', instruction: 'Schreibe jedes Wortbankwort auf diejenige Schreiblinie, die zum entsprechenden Körperteil zeigt, und betrachte anschließend die Körperzeichnung.', body: 722 },
  fi: { title: 'Kehon osat: sanapankin sanat oikeille kirjoitusviivoille, tunnista osat', instruction: 'Jäljennä jokainen sanapankin sana huolellisesti sille kirjoitusviivalle, joka osoittaa kyseiseen kehonosaan, ja tarkastele lopuksi kokonaisuudessaan omaa kehonkuvaasi tarkasti.', body: 677 },
};

async function main() {
  const banks = bankMod.HUMAN_BODY;
  // 0. the primitive's node gate
  { const before = console.log; const lines = []; console.log = (...a) => lines.push(a.join(' ')); let p = false; try { p = figureGate.main(); } finally { console.log = before; } ok(p, 'qa/verify-body-figure.js FAILED:\n    ' + lines.slice(-6).join('\n    ')); console.log('body-figure gate: ' + (lines.find((l) => /^(PASS|FAIL)/.test(l)) || '?')); }
  // 1. facts
  { const f = validateFacts(FACTS); ok(f.length === 0, `facts: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    ')); console.log(`facts: ${Object.keys(FACTS.parts).length} parts, ${FACTS.chipPool.length} chips, excluded ${Object.keys(FACTS.excluded).join(' ')}`); }
  // 2. banks on disk
  for (const loc of Object.keys(banks)) {
    const f = validateBank(banks[loc], loc);
    ok(f.length === 0, `bank ${loc}: ${f.length} findings\n    ` + f.slice(0, 12).join('\n    '));
    console.log(`bank ${loc}: ${Object.keys(banks[loc].partWords).length} part words, ${Object.keys(banks[loc].strings).length} strings, refuse ${JSON.stringify(banks[loc].refuse)}`);
  }
  // the synthetic locale blocks (vocab words in the EN shape) are clean except where the design records a lock
  for (const loc of LOCALES.filter((l) => l !== 'en')) {
    const f = validateBank(syntheticBlock(loc), loc).filter((x) => !/theme name|strings ids|rule 10|title|instruction/.test(x));   // en strings in a foreign block are not the point here
    ok(f.length === 0, `synthetic ${loc} block: ${f.length} findings\n    ` + f.slice(0, 6).join('\n    '));
  }
  const en = banks.en;
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  const pngs = [];
  try {
    // 3. renders
    for (const d of [1, 2, 3]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `K-354-gate-d${d}-en` });
      assertRender(`d${d}`, r, TYPE.difficulty[d], en);
      pngs.push(r.png);
      console.log(`render d${d}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px bank ${Math.round(r.m.banner.h)} lanes ${r.m.lanes.map((l) => l.id + l.side + '@' + Math.round(l.top)).join(' ')} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    for (const k of Object.keys(LONG)) {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: `K-354-gate-d2-en-longchrome-${k}`, strings: LONG[k] });
      assertRender(`d2 long chrome ${k}`, r, TYPE.difficulty[2], en);
      ok(r.m.body.h <= LONG[k].body, `d2 long chrome ${k}: body ${Math.round(r.m.body.h)} px — the fixture did not squeeze the body to <= ${LONG[k].body} (head ${Math.round(r.m.headH)} px)`);
      pngs.push(r.png);
      console.log(`render d2 long chrome ${k}: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} px (head ${Math.round(r.m.headH)}), stage ${Math.round(r.m.stage.h)}, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // the widest six of a synthetic fi bank at 18 px: one row or two? (design: "engineer measures kyynärpää / käsivarsi")
    {
      const fi = syntheticBlock('fi');
      const type = Object.assign(Object.create(TYPE), { build(args, ctx) {
        // the six widest fi words in one bank (a worst case the composer may draw)
        const words = ['käsivarsi', 'kyynärpää', 'olkapää', 'hiukset', 'varvas', 'polvi'].map((w, i) => ({ id: IDS[i], word: w }));
        const out = TYPE._buildWith(fi, TYPE.difficulty[2], args, ctx);
        out.bodyHtml = out.bodyHtml.replace(/<div class="ws-scene-banner ws-bank"[\s\S]*?<\/div>/, C4.bodyLabelBank({ words, wordPx: 18 }));
        return out;
      } });
      const r = await renderWith(page, type, { difficulty: 2, baseName: 'K-354-gate-d2-fi-widest-bank' });
      ok(r.lints.length === 0 && r.m.banner.h <= 110, `fi widest bank: lints ${JSON.stringify(r.lints)} bank ${Math.round(r.m.banner.h)} px`);
      console.log(`fi widest bank (käsivarsi kyynärpää olkapää hiukset varvas polvi at 18 px): ${Math.round(r.m.banner.h)} px high (${r.m.banner.h <= 60 ? 'one row' : 'two rows'}), words ${r.m.bank.map((w) => Math.round(w.w)).join('/')}`);
    }
    // refusals
    { let refused = false; try { TYPE.build({ theme: null, difficulty: 2, locale: 'xx' }, { rng: makeRng('x') }); } catch (e) { refused = /no xx block/.test(e.message); } ok(refused, 'an unauthored locale must REFUSE (throw), not fall back to en'); }
    // the fixed fallback sets build sweep-clean at every perSide
    for (const d of [1, 2, 3]) {
      const cfg = TYPE.difficulty[d];
      const targets = { 2: [['head', 'L'], ['foot', 'L'], ['arm', 'R'], ['knee', 'R']], 3: [['head', 'L'], ['leg', 'L'], ['foot', 'L'], ['arm', 'R'], ['hand', 'R'], ['knee', 'R']], 4: [['head', 'L'], ['elbow', 'L'], ['leg', 'L'], ['foot', 'L'], ['shoulder', 'R'], ['arm', 'R'], ['hand', 'R'], ['knee', 'R']] }[cfg.perSide];
      let err = null; try { C4.bodyLabelStage({ targets: targets.map(([id, side]) => ({ id, side })), figureH: cfg.figureH, laneW: cfg.laneW, laneH: cfg.laneH, glyphH: cfg.glyphH }); } catch (e) { err = e.message; }
      ok(!err, `fallback set for perSide ${cfg.perSide} does not build: ${err}`);
    }
    // 4. sweeps
    if (!QUICK) {
      for (const d of [1, 2, 3]) {
        const sets = new Set(); let fallbacks = 0, leaks = 0;
        const deSets = [];
        for (let k = 1; k <= 20; k++) {
          const rng = makeRng(instanceSeed({ typeId: 'K-354', theme: null, difficulty: d, seedEpoch: k }));
          const out = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
          sets.add(out.meta.targets.join()); if (out.meta.fallback) fallbacks++;
          if (out.meta.bank.join() === out.meta.parts.join() || out.meta.bank.join() === out.meta.parts.slice().reverse().join()) leaks++;
          const rng2 = makeRng(instanceSeed({ typeId: 'K-354', theme: null, difficulty: d, seedEpoch: k }));
          const de = TYPE._buildWith(syntheticBlock('de'), TYPE.difficulty[d], { locale: 'de' }, { rng: rng2 });
          deSets.push(de.meta.targets.join() === out.meta.targets.join() && de.meta.bank.join() === out.meta.bank.join());
        }
        ok(sets.size >= 15, `sweep d${d}: ${sets.size} distinct target sets over 20 seeds`);
        ok(leaks === 0, `sweep d${d}: ${leaks} pages with the bank in lane order`);
        ok(fallbacks <= (d === 3 ? 3 : 1), `sweep d${d}: ${fallbacks} fallbacks over 20 seeds`);
        ok(deSets.every(Boolean), `sweep d${d}: the synthetic de block diverged from en on ${deSets.filter((x) => !x).length} seeds (the seed is not locale-neutral)`);
        console.log(`sweep d${d}: ${sets.size} target sets, ${fallbacks} fallbacks, ${leaks} order leaks, de ≡ en on ${deSets.filter(Boolean).length}/20`);
      }
      // a per-word refusal shrinks the pool
      {
        const b = clone(en); b.refuseWords = { base: ['eye'] };
        let withEye = 0;
        for (let k = 1; k <= 20; k++) { const rng = makeRng(instanceSeed({ typeId: 'K-354', theme: null, difficulty: 2, seedEpoch: k })); const out = TYPE._buildWith(b, TYPE.difficulty[2], { locale: 'en' }, { rng }); if (out.meta.parts.includes('eye')) withEye++; }
        ok(withEye === 0, `refuseWords.base ['eye']: ${withEye} pages still draw eye`);
        console.log('refuseWords.base [eye]: 0/20 pages draw eye');
      }
    }
    // 5. poisons
    let killed = 0;
    const TOTAL = 24;
    const ctlFacts = validateFacts(FACTS).length === 0, ctlEn = validateBank(en, 'en').length === 0;
    // P1 tooth
    { const F = clone(FACTS); F.parts.tooth = { count: 20, cue: 'tooth' }; if (judge('P1', validateFacts(F), /parts keys .* ≠ the 16|parts\.tooth: a banned part|count 20/) && ctlFacts) killed++; }
    // P2 durian cue
    { const F = clone(FACTS); F.facts[0].cue = 'durian'; if (judge('P2', validateFacts(F), /facts\.fingersOneHand\.cue "durian" does not resolve/) && ctlFacts) killed++; }
    // P3 chipPool += shoulder
    { const F = clone(FACTS); F.chipPool.push({ id: 'shoulder', picOpened: true }); if (judge('P3', validateFacts(F), /chipPool holds shoulder \(excluded by the design\)/) && ctlFacts) killed++; }
    // P4 de eye Augen
    { const b = syntheticBlock('de'); b.partWords.eye = 'Augen'; b.bankWords.eye = 'Augen'; const c = validateBank(syntheticBlock('de'), 'de').filter((x) => /partWords/.test(x)).length === 0; if (judge('P4', validateBank(b, 'de'), /partWords\.eye "Augen" ≠ vocab singular "Auge"/) && c) killed++; else poisonLog.push('  P4 control: the synthetic de block was rejected on partWords'); }
    // P5 fi leg jalka + foot jalka
    { const b = syntheticBlock('fi'); b.partWords.leg = 'jalka'; b.bankWords.leg = 'jalka'; b.overrides.leg = { word: 'jalka', reason: 'panel: leg = jalka' }; if (judge('P5', validateBank(b, 'fi'), /partWords\.(leg|foot) "jalka" equals partWords\.(foot|leg)/)) killed++; }
    // P6 overrides.neck with an empty reason
    { const b = syntheticBlock('no'); b.partWords.neck = 'hals'; b.bankWords.neck = 'hals'; b.overrides.neck = { word: 'hals', reason: '' }; const a = judge('P6', validateBank(b, 'no'), /overrides\.neck has no reason/); const c = clone(b); c.overrides.neck.reason = 'front view; nakke = nape'; const ctl = validateBank(c, 'no').filter((x) => /neck/.test(x)).length === 0; if (a && ctl) killed++; else poisonLog.push('  P6 control: a reasoned override was rejected'); }
    // P7 de bankWords.hair 'das Haar'
    { const b = syntheticBlock('de'); b.bankWords.hair = 'das Haar'; const ctl = clone(b); ctl.bankWords.hair = 'die Haare'; const a = judge('P7', validateBank(b, 'de'), /bankWords\.hair "das Haar" does not end with partWords\.hair "Haare"/); if (a && validateBank(ctl, 'de').filter((x) => /bankWords\.hair/.test(x)).length === 0) killed++; else poisonLog.push('  P7 control: "die Haare" was rejected'); }
    // P8 fi factLabels.eye 'silmät'
    { const b = syntheticBlock('fi'); b.factLabels.eye = 'silmät'; if (judge('P8', validateBank(b, 'fi'), /factLabels\.eye "silmät" is the vocab plural/)) killed++; }
    // P9 pairs += finger
    { const F = clone(FACTS); F.pairsPool.pairs.push('finger'); if (judge('P9', validateFacts(F), /pairsPool holds finger \(never\)|pairsPool\.pairs finger count ≠ 2/) && ctlFacts) killed++; }
    // P10 sv title 'Kroppsdelar' (the theme name)
    { const b = syntheticBlock('sv'); b.strings['K-354'].title = 'Kroppsdelar'; if (judge('P10', validateBank(b, 'sv'), /K-354 title "Kroppsdelar" equals the body_parts theme name/)) killed++; }
    // P11 fi F5 title with parilliset
    { const b = syntheticBlock('fi'); b.strings['K-363'].title = 'Kehon osat: parilliset'; if (judge('P11', validateBank(b, 'fi'), /K-363 fi string uses "ruumiinosa" \/ "parillis"/)) killed++; }
    // P12 de 'blauer Arm' in a literal
    { const b = syntheticBlock('de'); b.factLabels.arm = 'blauer Arm'; const ctl = clone(b); ctl.factLabels.arm = 'Wie viele Arme?'; const a = judge('P12', validateBank(b, 'de'), /literal "blauer Arm" puts a colour word beside a part word/); if (a && validateBank(ctl, 'de').filter((x) => /rule 9/.test(x)).length === 0) killed++; else poisonLog.push('  P12 control: "Wie viele Arme?" was rejected'); }
    // P13 F3 title 'Parts of the Body: Big Words'
    { const b = clone(en); b.strings['G1-356'].title = 'Parts of the Body: Big Words'; if (judge('P13', validateBank(b, 'en'), /G1-356 title suffix "Big Words" names no move/) && ctlEn) killed++; }
    // PR1 — the head anchor mirrored to the far side (a leader across the figure)
    {
      const mirrorHead = (h) => {
        const m = /data-lcs-anchors='([^']+)'/.exec(h); const an = JSON.parse(m[1].replace(/&#39;/g, "'"));
        const mid = 337.5; const id = Object.keys(an).find((k) => an[k].side === 'L') ; const a = an[id]; const nx = +(2 * mid - a.x).toFixed(1);
        let out = h.replace(new RegExp(`data-lcs-pointer="${id}" data-lcs-side="L" data-lcs-ax="[^"]+"`), `data-lcs-pointer="${id}" data-lcs-side="L" data-lcs-ax="${nx}"`);
        out = out.replace(new RegExp(`(x1=")[^"]+(" y1="[^"]+" x2="[^"]+" y2="[^"]+" stroke="#146B5E" stroke-width="2.5" stroke-linecap="round" data-lcs-pointer="${id}")`), `$1${(nx - 8.5).toFixed(1)}$2`);
        out = out.replace(new RegExp(`<circle cx="[^"]+"( cy="[^"]+" r="7" fill="none" stroke="#F2784B" stroke-width="3" data-lcs-anchor-ring="${id}")`), `<circle cx="${nx}"$1`);
        an[id].x = nx;
        return out.replace(m[0], `data-lcs-anchors='${JSON.stringify(an).replace(/'/g, '&#39;')}'`);
      };
      const { r, own } = await gateFindings(page, rewired(en, mirrorHead), 2, 'K-354-gate-poison-PR1', en);
      const a = judge('PR1 verify', r.verify, /an L lane from an anchor right of the midline/);
      const c = judge('PR1 node', own, /node sweep .*runs over the figure|intersect|verify\(\)/, 'the node sweep sees it too');
      if (a && c) killed++;
    }
    // PR8 — an answerBox on the page
    {
      const box = answerBox({ w: 68, h: 56 });
      const { r, own } = await gateFindings(page, rewired(en, (h) => h.replace('<div data-lcs-stagecell', box + '<div data-lcs-stagecell')), 2, 'K-354-gate-poison-PR8', en);
      const a = judge('PR8 verify', r.verify, /an answer value "undefined" is stamped|an answerBox on an open page/);
      const c = judge('PR8 node', own, /an answer value is stamped/);
      if (a && c) killed++;
    }
    // PR9 — a RIGID 700 px stage row under the fi chrome → the footer lint
    {
      const rigid = rewired(en, (h) => h.replace('grid-template-rows:auto minmax(580px,1fr)', 'grid-template-rows:auto 700px').replace('height:580px;flex:0 0 auto', 'height:700px;flex:0 0 auto'));
      const r = await renderWith(page, rigid, { difficulty: 2, baseName: 'K-354-gate-poison-PR9', strings: LONG.fi });
      if (judge('PR9', r.lints, /footer overlap/, `body ${Math.round(r.m.body.h)} px, lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`)) killed++;
    }
    // PR10 — faceMax 3 resolved from a level-index guard → the config guard fires
    { if (judge('PR10', buildRefusal(en, 2, 'en', { faceMax: 3 }), /faceMax 3 outside 0\.\.2/)) killed++; }
    // PX — a 40 px lane: the spec guard, and the gate floor past it
    {
      const a = judge('PX guard', buildRefusal(en, 2, 'en', { laneH: 40 }), /laneH 40 < the K floor 56/);
      const shrunk = rewired(en, (h) => h.replace(/height:64px;display:inline-flex/g, 'height:40px;display:inline-flex'));
      const { r, own } = await gateFindings(page, shrunk, 2, 'K-354-gate-poison-PX', en);
      const c = judge('PX floor', own, /lane \w+ 195×40 \(want 195×64, floor 56\)/, `verify ${r.verify.length} (its own floor fires too)`);
      if (a && c) killed++;
    }
    // PL — a model word printed on a lane
    {
      const { r } = await gateFindings(page, rewired(en, (h) => h.replace(/(<span class="ws-blankbox" data-lcs-label="[^"]+" data-lcs-side="L"[^>]*>)/, '$1<span style="position:absolute">arm</span>')), 2, 'K-354-gate-poison-PL', en);
      if (judge('PL', r.verify, /lane \w+: the lane prints "arm"/)) killed++;
    }
    // PB — the bank re-ordered into the lane order
    {
      const inLaneOrder = (h) => {
        const parts = /data-lcs-parts="([^"]+)"/.exec(h)[1].split(',');
        const words = parts.map((id) => ({ id, word: en.bankWords[id] }));
        return h.replace(/<div class="ws-scene-banner ws-bank"[\s\S]*?<\/div>/, C4.bodyLabelBank({ words, wordPx: 18 }));
      };
      const { r, own } = await gateFindings(page, rewired(en, inLaneOrder), 2, 'K-354-gate-poison-PB', en);
      const a = judge('PB verify', r.verify, /the bank order equals the top-to-bottom lane order/);
      const c = judge('PB node', own, /bank order .* mirrors the lane order/);
      if (a && c) killed++;
    }
    // PD — a lane dropped (bank id without a lane)
    {
      const { r } = await gateFindings(page, rewired(en, (h) => h.replace(/<span class="ws-blankbox" data-lcs-label="[^"]+" data-lcs-side="R"[\s\S]*?<\/svg><\/span>/, '')), 2, 'K-354-gate-poison-PD', en);
      if (judge('PD', r.verify, /no bijection/)) killed++;
    }
    // PW — a bank word ≠ the bank literal (verify() is blind by design; the node cross-check sees it)
    {
      const { r, own } = await gateFindings(page, rewired(en, (h) => h.replace(/data-lcs-bank="arm"><span>arm<\/span>/, 'data-lcs-bank="arm"><span>arms</span>')), 2, 'K-354-gate-poison-PW', en);
      const a = judge('PW node', own, /bank word arm prints "arms" ≠ bank "arm"/, `verify ${r.verify.length} (blind by design)`);
      if (a) killed++;
    }
    // PC — a leader run past a foreign ring: the head-L lane end moved onto the leg ring's height (the leg is L too on the fallback page)
    {
      const past = (h) => h
        .replace(/(data-lcs-pointer="head" data-lcs-side="L" data-lcs-ax="[^"]+" data-lcs-ay="[^"]+" data-lcs-lx=")195(" data-lcs-ly=")[^"]+(")/, '$1300$2442$3')
        .replace(/(y1="[^"]+" x2=")195(" y2=")[^"]+(" stroke="#146B5E" stroke-width="2.5" stroke-linecap="round" data-lcs-pointer="head")/, '$1300$2442$3');
      const { r, own } = await gateFindings(page, rewired(en, past, { fixed: true }), 2, 'K-354-gate-poison-PC', en);
      const a = judge('PC verify', r.verify, /pointer head passes the leg ring|lane end sits \d+ px off/);
      const c = judge('PC node', own, /within 16 px of the leg ring|verify\(\)/);
      if (a && c) killed++;
    }
    // PO — a leader rewired across the figure's arm (verify's 16 px rule cannot see a limb; the node obstacle sweep must)
    {
      // the R-side `arm` pointer's lane end dragged to the figure's left of the torso: the drawn line crosses the torso
      const across = (h) => h
        .replace(/(data-lcs-pointer="arm" data-lcs-side="R" data-lcs-ax="[^"]+" data-lcs-ay="[^"]+" data-lcs-lx=")480(" data-lcs-ly=")[^"]+(")/, '$1195$2300$3')
        .replace(/(y1="[^"]+" x2=")480(" y2=")[^"]+(" stroke="#146B5E" stroke-width="2.5" stroke-linecap="round" data-lcs-pointer="arm")/, '$1195$2300$3');
      const { r, own } = await gateFindings(page, rewired(en, across, { fixed: true }), 2, 'K-354-gate-poison-PO', en);
      const c = judge('PO node', own, /runs over the figure's (torso|leg|neck|head|hand)/, `verify ${r.verify.length}`);
      if (c) killed++;
    }
    console.log('poison:\n' + poisonLog.join('\n'));
    if (fails.length) console.log('FAILS:\n  ' + fails.join('\n  '));
    console.log('PNGs: ' + pngs.map((p) => path.relative(process.cwd(), p)).join(' '));
    const pass = !fails.length && killed === TOTAL;
    console.log(pass ? `PASS (${assertions} assertions, ${killed}/${TOTAL} poisons killed${QUICK ? ', --quick: sweep skipped' : ''})` : `FAIL (${fails.length} findings, ${killed}/${TOTAL} poisons killed)`);
    process.exit(pass ? 0 : 1);
  } finally {
    await browser.close();
  }
}

if (require.main === module) main().catch((e) => { console.error(e && e.stack || e); process.exit(1); });
module.exports = { validateBank, validateFacts, nodeSweep, syntheticBlock, MOVE_WORDS };
