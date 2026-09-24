#!/usr/bin/env node
/**
 * verify-b6-healthy-habits.js — the K-380 `healthy-habits` family gate (design
 * docs/worksheet-gen/b6-designs/K-380-healthy-habits.md §5). Exit 1 on any real
 * failure OR any silent poison.
 *
 *   node scripts/worksheet-gen/qa/verify-b6-healthy-habits.js [--quick]
 *
 * 1. validateBank(block, loc) — the §5 validator rules 1-12 over every authored
 *    locale block (en today; the native panels add the rest). Exported for
 *    tools/b6-probe-child.js / tools/validate-b6-draft.js. validateCommon() —
 *    the locale-neutral tables (no cough-hand, no mouth-rinse, distinct hand
 *    states, the co-occurrence sets resolve in the primitive).
 * 2. DATA POISONS P4-P13, P18, P21 (each must FAIL for its OWN rule; the correct
 *    EN block is the control; the non-en blocks are TEST FIXTURES shaped like a
 *    panel's block, never a page).
 * 3. RENDER through the real pipeline (render/render-instance.js, file:// fonts):
 *    d1 / d2 / d3 en + (unless --quick) the 20-seed d2 sweep: verify() empty,
 *    qa/lints.js clean, the K floors measured HERE (lints has no size lint):
 *    every pictogram and tool >= 56 px and >= its config size (d2 104 / 104),
 *    dots 14, the pencil zone >= 160; every printed literal === the bank.
 * 4. POOLED composition over 400 seeds (pure build, d2): no tool sits in any
 *    column > 30 %; every plaque->tool offset value between 10 % and 40 % (a
 *    too-regular spread is a tell too); 0 % in its own column by construction.
 * 5. SPARSE at the 814 / 722 / 677 chromes (verify(): no blank band > 60 px between consecutive
 *    blocks but the 180-260 px line zone; lead review 2026-09-23) + the LONG-CHROME case: a 4-line title + a 150-char instruction (the fi 677
 *    budget) — the stage still fits above the footer, verify + lints clean.
 * 6. The GREYSCALE read: the page rendered through filter:grayscale(1) must still
 *    verify (the habit is carried by pose + parts, never by hue); PNG kept.
 * 7. RENDER POISONS: P1 a toothbrush glyph inside the brush-teeth plaque (tool
 *    leak) · P2 bubbles on the soap glyph (shared-mark rule) · P3 the tool order
 *    = the plaque order shifted by one (constant shift) · PS a pose stamp swapped
 *    (verify reads the DRAWING, so it must say the stamp disagrees) · P20 a face
 *    config fed to a base build whose guard keys on the level index · PSP1 / PSP2 the old
 *    sparse page restored (110 px above the rail; the line zone taking every spare pixel).
 * 8. THE FIVE FACES (Phase E): qa/b6-healthy-habits-faces.js — strings, pooled tells, renders at the
 *    814 / 722 / 677 chromes + greyscale (verify carries SPARSE <= 40 + FILL >= 85 %), the face poisons.
 * The primitive has its own gate (qa/verify-b6-habit-pictogram.js); run it too.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { numberWord } = require('../lib/number-words.js');
const { textWidthEm } = require('../primitives/bankword-width.js');
const freeClaim = require('../../lib/free-claim.js');
const HP = require('../primitives/habit-pictogram.js');
const H = require('./b6-healthy-habits-harness.js');
const SPEC = require('../types/k/K-380-healthy-habits.js');
const DATA = require('../data/b6/healthy-habits.js');
const { COMMON } = DATA;

const K = H.makeChecker();
const { ok } = K;
const OUTDIR = path.join(__dirname, '..', 'out', 'dev', 'K-380-gate');
const TAX = require('../../../frontend/config/topics-taxonomy.json');

/* ================================================================== 1. the validator */
const nfc = (s) => String(s).normalize('NFC').toLowerCase();
const esc = (w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** whole-word (letter-bounded, never \b: ASCII-only) */
const hasWord = (text, w) => new RegExp(`(?<!\\p{L})${esc(nfc(w))}(?!\\p{L})`, 'u').test(nfc(text));
/** a stem pattern: 'eat*' = the stem plus any letters, else whole word */
const hasPat = (text, p) => (p.endsWith('*') ? new RegExp(`(?<!\\p{L})${esc(nfc(p.slice(0, -1)))}\\p{L}*`, 'u') : new RegExp(`(?<!\\p{L})${esc(nfc(p))}(?!\\p{L})`, 'u')).test(nfc(text));
const anyPat = (text, list) => (list || []).find((p) => hasPat(text, p)) || null;
const sentences = (s) => String(s).trim().split(/(?<=[.!?…])\s+(?=\S)/u).filter(Boolean).length;
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWER_KEY = /(?<!\p{L})(answer\s*key|answer\s*sheet|with\s+answers|l[öo]sung\p{L}*|solucion\p{L}*|soluç\p{L}*|respostas|r[ée]ponses|corrig[ée]\p{L}*|soluzion\p{L}*|antwoord\p{L}*|facit|fasit|vastau\p{L}*|svar)(?!\p{L})/iu;

/** rule 4 — food words per locale (a stem ending `*` matches its inflections); native panels extend */
const FOOD = {
  en: ['food*', 'eat*', 'meal*', 'breakfast*', 'lunch*', 'dinner*', 'snack*', 'sweets', 'sugar*', 'fruit*', 'vegetable*', 'plate*', 'candy', 'candies'],
  de: ['essen', 'isst', 'frühstück*', 'mahlzeit*', 'obst', 'gemüse', 'süßigkeit*', 'zucker*', 'teller*', 'ernährung*', 'snack*', 'mittagessen', 'abendessen', 'mad'],
  es: ['comida*', 'comer', 'come', 'desayun*', 'almuerz*', 'merienda*', 'dulce*', 'azúcar*', 'fruta*', 'verdura*', 'plato*', 'golosina*'],
  pt: ['comida*', 'comer', 'come', 'café da manhã', 'lanche*', 'doce*', 'açúcar*', 'fruta*', 'legume*', 'prato*', 'refeiç*', 'almoç*'],
  fr: ['nourriture*', 'manger', 'mange*', 'repas', 'petit-déjeuner*', 'goûter*', 'bonbon*', 'sucre*', 'fruit*', 'légume*', 'assiette*'],
  it: ['cibo', 'cibi', 'mangia*', 'pasto', 'pasti', 'colazione', 'merenda*', 'dolci', 'zucchero', 'frutta', 'verdura*', 'piatto', 'piatti'],
  nl: ['eten', 'eet', 'ontbijt*', 'maaltijd*', 'snoep*', 'suiker*', 'fruit', 'groente*', 'bord', 'borden', 'lunch*'],
  sv: ['mat', 'maten', 'äta', 'äter', 'frukost*', 'måltid*', 'godis', 'socker', 'frukt*', 'grönsak*', 'tallrik*', 'lunch*'],
  da: ['mad', 'maden', 'spise', 'spiser', 'morgenmad*', 'måltid*', 'slik', 'sukker', 'frugt*', 'grøntsag*', 'tallerken*', 'frokost*'],
  no: ['mat', 'maten', 'spise', 'spiser', 'frokost*', 'måltid*', 'godteri*', 'sukker', 'frukt*', 'grønnsak*', 'tallerken*'],
  fi: ['ruoka*', 'ruoan', 'ruokaa', 'syö*', 'aamiai*', 'ateria*', 'karkki*', 'karkit', 'sokeri*', 'hedelm*', 'vihann*', 'lautan*'],
};
/** rule 6 — quantity / time units per locale */
const UNITS = {
  en: ['second*', 'minute*', 'hour*', 'times a day', 'per day', 'twice', 'once a day', 'a day'],
  de: ['sekunde*', 'minute*', 'stunde*', 'mal am tag', 'pro tag', 'zweimal', 'täglich'],
  es: ['segundo*', 'minuto*', 'hora', 'horas', 'veces al día', 'al día', 'dos veces'],
  pt: ['segundo*', 'minuto*', 'hora', 'horas', 'vezes ao dia', 'vezes por dia', 'por dia', 'duas vezes'],
  fr: ['seconde*', 'minute*', 'heure*', 'fois par jour', 'par jour', 'deux fois'],
  it: ['secondi', 'secondo', 'minuti', 'minuto', 'ore', 'ora', 'volte al giorno', 'al giorno', 'due volte'],
  nl: ['seconde*', 'minuut', 'minuten', 'uur', 'uren', 'keer per dag', 'per dag', 'twee keer'],
  sv: ['sekund*', 'minut*', 'timme', 'timmar', 'gånger om dagen', 'om dagen', 'två gånger'],
  da: ['sekund*', 'minut*', 'time', 'timer', 'gange om dagen', 'om dagen', 'to gange'],
  no: ['sekund*', 'minutt*', 'time', 'timer', 'ganger om dagen', 'om dagen', 'to ganger'],
  fi: ['sekunti*', 'sekunni*', 'minuutti*', 'minuuti*', 'tunti*', 'tunni*', 'kertaa päivässä', 'päivässä'],
};
/** rule 7 — the outdated cough (into the hand / "cover your mouth"), and what coughPhrase must name */
const COUGH_BAD = {
  en: [/(cough|sneez)\p{L}*[^.!?]{0,40}(?<!\p{L})hands?(?!\p{L})/iu, /(?<!\p{L})cover\p{L}* (your|the|their|his|her|a) mouth/iu],
  de: [/in die hand (husten|niesen)/iu, /hand vor (den|dem) mund/iu], es: [/(?<!\p{L})tápa\p{L}* la boca/iu, /en la mano/iu],
  pt: [/tamp\p{L}* a boca/iu, /na mão/iu], fr: [/main devant la bouche/iu, /dans (sa|ta|la) main/iu], it: [/mano davanti alla bocca/iu, /nella mano/iu],
  nl: [/hand voor (je|de) mond/iu, /in je hand/iu], sv: [/handen för munnen/iu, /i handen/iu], da: [/hånden for munden/iu, /i hånden/iu],
  no: [/hånden for munnen/iu, /i hånden/iu], fi: [/käsi suun eteen/iu, /käteen/iu],
};
const COUGH_OK = {
  en: ['elbow', 'sleeve', 'tissue'], de: ['armbeuge', 'ellenbogen', 'taschentuch'], es: ['codo', 'pañuelo'], pt: ['cotovelo', 'lenço'],
  fr: ['coude', 'mouchoir'], it: ['gomito', 'fazzoletto'], nl: ['elleboog', 'zakdoek'], sv: ['armveck*', 'armbåge*', 'näsduk*'],
  da: ['ærme*', 'albue*', 'lommetørklæde*'], no: ['albue*', 'erme*', 'lommetørkle*'], fi: ['hiha*', 'kyynärtaive*', 'nenäliina*'],
};
/** rule 8 — heads a title may never carry (§ Boundary + §4), + the neighbour type / theme names read from the taxonomy */
const BANNED_HEADS = {
  en: ['step by step', 'sequencing', 'daily routine', 'good habits'], de: ['schritt für schritt', 'reihenfolge', 'tagesablauf', 'ernährung', 'ungesund', 'gesund und ungesund'],
  es: ['paso a paso', 'los pasos en orden', 'mi rutina', 'secuencia*'], pt: ['passo a passo', 'sequência*', 'atividade*'], fr: ['étape par étape', 'les étapes', 'séquentielle*', 'ma journée', 'propreté'],
  it: ['passo dopo passo', 'i passi in ordine', 'sequenz*'], nl: ['stap voor stap', 'volgorde', 'gezonde gewoonte*', 'gezond en ongezond'],
  sv: ['steg för steg', 'ordningsföljd'], da: ['trin for trin', 'sund', 'usund', 'sunde'], no: ['steg for steg', 'mat og helse', 'helse'], fi: ['vaihe vaiheelta', 'järjestykseen', 'terveystieto'],
};
/** the bare product/toilet heads (a title whose head before ':' is exactly this word) */
const BARE_HEAD = { en: ['hygiene'], fr: ['hygiène'] };
/** rule 9 — en apparatus words per face (letter-bounded); the forbidden five are global */
const APPARATUS_EN = {
  box: 'box(?:es)?', line: 'lines?', circle: 'circl(?:e|es|ed|ing)', word: 'words?', number: 'numbers?|numerals?', dot: 'dots?',
  picture: 'pictures?', row: 'rows?', sentence: 'sentences?', habit: 'habits?', day: 'days?', check: 'check|tick', child: 'child(?:ren)?',
};
const APPARATUS_OK = {
  base: ['child', 'line'], 'hand-washing-steps': ['number', 'box'], 'brushing-teeth': ['word', 'circle', 'picture'], 'stop-the-germs': ['row', 'picture', 'circle'],
  'why-habits': ['habit', 'sentence', 'line'], 'habit-chart': ['box', 'day', 'check', 'habit'],
};
const NEVER_INSTR = { en: ['sort', 'cut', 'glue', 'colou?r', 'bins?'] };
/** rule 5 — number words that are ALSO the indefinite article in the locale are not numbers in a sentence */
const ARTICLE_ONE = { fr: ['un', 'une'], pt: ['um', 'uma'], nl: ['een'], sv: ['en', 'ett'], da: ['en', 'et'], no: ['en', 'ei', 'et'], de: ['ein', 'eine'], es: ['un', 'una'], it: ['un', 'una', 'uno'] };

function taxonomyNames(loc) {
  const out = [];
  const t = TAX.axes.theme.body_parts; if (t && t.name && t.name[loc]) out.push(t.name[loc]);
  for (const k of ['human-body', 'five-senses', 'all-about-me']) { const e = TAX.axes['exercise-type'][k]; if (e && e.name && e.name[loc]) out.push(e.name[loc]); }
  return out;
}
/** greedy word-wrap at Nunito 800 `px` into `w` px; THROWS on a character without a measured advance */
function wrapLines(text, px, w) {
  const words = String(text).split(/\s+/).filter(Boolean);
  const sp = textWidthEm(' ') * px;
  let lines = 1, cur = 0;
  for (const wd of words) {
    const ww = textWidthEm(wd) * px;
    if (ww > w) return Infinity;
    if (cur === 0) cur = ww; else if (cur + sp + ww <= w) cur += sp + ww; else { lines++; cur = ww; }
  }
  return lines;
}
function numberWordsHit(text, loc) {
  const skip = new Set(ARTICLE_ONE[loc] || []);
  for (let n = 0; n <= 100; n++) {
    let w; try { w = numberWord(n, loc); } catch (e) { return null; }
    if (skip.has(nfc(w))) continue;
    if (hasWord(text, w)) return w;
  }
  return null;
}

const _vocab = (() => { let v = null; return () => v || (v = require('../../publish-cli/deck-rich-alt.js').loadVocab()); })();
/** rule 3b ban patterns for one habit in one locale, from image-vocabulary (singular + plural; >= 4 letters -> stem*) */
function reasonBanWords(h, L) {
  const V = _vocab(), out = new Set();
  for (const k of (COMMON.REASON_BAN_KEYS || {})[h] || []) {
    const e = V[k] && V[k][L];
    if (!e) continue;
    for (const f of [e[0], e[1]]) if (f) { const w = nfc(f); out.add(w.length >= 4 ? w + '*' : w); }
  }
  return [...out];
}
/**
 * The §5 validator rules over one locale block. Returns the findings (strings, each prefixed "rule N").
 * Exported: tools/b6-probe-child.js runs it on every drafted block.
 */
function validateBank(block, loc) {
  const E = [];
  const e = (n, m) => E.push(`rule ${n}: ${m}`);
  const L = String(loc).slice(0, 2);
  if (!block || typeof block !== 'object') return ['rule 12: no block'];
  // 12 — the six mode strings
  const got = Object.keys(block.strings || {}).sort().join(), want = [...COMMON.modes].sort().join();
  if (got !== want) e(12, `strings keys ${got} ≠ the six modes ${want}`);
  // 1 — three phase chips, distinct, <= 152 px at Nunito 800 18
  const ph = block.phases || {};
  const pv = ['before', 'during', 'after'].map((k) => ph[k]);
  if (Object.keys(ph).length !== 3 || pv.some((v) => typeof v !== 'string' || !v.trim())) e(1, `phases must be exactly before / during / after, non-empty (${JSON.stringify(ph)})`);
  else {
    if (new Set(pv.map(nfc)).size !== 3) e(1, `phase chips are not pairwise distinct (${pv.join(' · ')})`);
    for (const v of pv) {
      let w; try { w = textWidthEm(v) * 18; } catch (err) { e(1, `phase chip "${v}": ${err.message}`); continue; }
      if (w > 152) e(1, `phase chip "${v}" is ${w.toFixed(1)} px at Nunito 800 18 (> 152: it does not fit the 184 x 40 chip)`);
    }
  }
  // 2 — labels cover every habit a face shows; each <= 2 lines in 96 px at Nunito 800 16
  const needLabels = new Set([...COMMON.chartRows, ...COMMON.reasonD2, ...COMMON.reasonReserve, ...COMMON.baseD2]);
  for (const h of needLabels) {
    const l = block.labels && block.labels[h];
    if (typeof l !== 'string' || !l.trim()) { e(2, `no label for "${h}"`); continue; }
    let n; try { n = wrapLines(l, 16, 96); } catch (err) { e(2, `label "${l}": ${err.message}`); continue; }
    if (n > 2) e(2, `label "${l}" wraps to ${n === Infinity ? 'an overflowing word' : n + ' lines'} in 96 px (<= 2)`);
  }
  // 2b (FIX ROUND 2, de + en panels) — a chart row must be a DECISION a child makes or misses: the bare verb "sleep"
  // is ticked by every child every day. The sleep row's label is a phrase (go to sleep early / früh ins Bett gehen),
  // never one word.
  { const l = block.labels && block.labels.sleep; if (typeof l === 'string' && l.trim().split(/\s+/).length < 2) e(2, `labels.sleep "${l}" is one word: every child sleeps every day, so the chart row asks no decision (write the habit: go to sleep early)`); }
  // 3 — reasons: cover reasonD2, <= 110 chars, no stem of ITS habit or of any other habit of reasonD2
  const stems = block.labelStems || {};
  for (const h of [...COMMON.reasonD2, ...COMMON.reasonReserve]) {
    const r = block.reasons && block.reasons[h];
    if (typeof r !== 'string' || !r.trim()) { if (COMMON.reasonD2.includes(h)) e(3, `no reason for "${h}"`); continue; }
    if (r.length > 110) e(3, `reason for "${h}" is ${r.length} chars (> 110)`);
    for (const o of new Set([h, ...COMMON.reasonD2])) {
      for (const s of stems[o] || []) if (hasWord(r, s)) e(3, `the reason for "${h}" ("${r}") contains "${s}", a stem of ${o === h ? 'its OWN habit' : 'the habit "' + o + '"'}`);
    }
    if (!Array.isArray(stems[h]) || !stems[h].length) e(3, `no labelStems for "${h}"`);
    // 3b (FIX ROUND 1): a reason never names ITS habit's body part or tool — the image-vocabulary singular + plural
    // of COMMON.REASON_BAN_KEYS[h] in this locale (a form of >= 4 letters also bans its inflections: nenä -> nenän)
    for (const w of reasonBanWords(h, L)) if (hasPat(r, w)) e(3, `the reason for "${h}" ("${r}") names "${w.replace(/\*$/, '')}", its own body part or tool`);
  }
  // every printed literal of the block
  const lit = [];
  for (const [m, s] of Object.entries(block.strings || {})) { lit.push([`strings.${m}.title`, s.title, m, 'title']); lit.push([`strings.${m}.instruction`, s.instruction, m, 'instruction']); }
  for (const [k, v] of Object.entries(block.labels || {})) lit.push([`labels.${k}`, v, null, 'label']);
  for (const [k, v] of Object.entries(block.phases || {})) lit.push([`phases.${k}`, v, null, 'chip']);
  for (const [k, v] of Object.entries(block.reasons || {})) lit.push([`reasons.${k}`, v, null, 'reason']);
  for (const [where, text, mode, kind] of lit) {
    const t = String(text || '');
    // 4 — food
    const f = anyPat(t, FOOD[L]);
    if (f) e(4, `${where} "${t}" carries the food word "${f}" (K-203 / G1-207 own food)`);
    // 5 — digits and number words (F1's instruction may carry the numerals 1-5, each at most once)
    const digits = t.match(/\p{Nd}/gu) || [];
    if (mode === 'hand-washing-steps' && kind === 'instruction') {
      const bad = digits.filter((d) => !'12345'.includes(d)), dup = digits.filter((d, i) => digits.indexOf(d) !== i);
      if (bad.length || dup.length) e(5, `${where} "${t}" prints numerals other than 1-5 once each`);
    } else if (digits.length) e(5, `${where} "${t}" prints a digit`);
    if (!(mode === 'hand-washing-steps' && kind === 'instruction')) { const nw = numberWordsHit(t, L); if (nw) e(5, `${where} "${t}" carries the number word "${nw}"`); }
    // 6 — quantity / time units
    const u = anyPat(t, UNITS[L]);
    if (u) e(6, `${where} "${t}" carries the quantity / time unit "${u}"`);
    // 7 — the outdated cough
    for (const re of COUGH_BAD[L] || []) if (re.test(t)) e(7, `${where} "${t}" pairs the cough / sneeze with the hand or the mouth-cover (outdated)`);
    // 10 — no answer key, no visible free claim (titles / instructions / labels / chips / reasons are all visible)
    if (ANSWER_KEY.test(t)) e(10, `${where} "${t}" promises an answer key (printable decks ship none)`);
    const fc = freeClaim.hit(t);
    if (fc) e(10, `${where} "${t}" claims "free" (${fc}) on a visible surface`);
  }
  // 7 — coughPhrase names the elbow / sleeve / arm crook / tissue
  if (typeof block.coughPhrase !== 'string' || !anyPat(block.coughPhrase, COUGH_OK[L])) e(7, `coughPhrase "${block.coughPhrase}" names neither the elbow / sleeve nor a tissue`);
  for (const re of COUGH_BAD[L] || []) if (re.test(String(block.coughPhrase || ''))) e(7, `coughPhrase "${block.coughPhrase}" is the outdated hand / mouth-cover cough`);
  // 8 — titles
  const titles = COMMON.modes.map((m) => (block.strings && block.strings[m] && block.strings[m].title) || '');
  if (new Set(titles.map(nfc)).size !== titles.length) e(8, 'the six titles are not unique');
  const heads = [...(BANNED_HEADS[L] || []), ...taxonomyNames(L)];
  titles.forEach((t, i) => {
    if (t.length > 70) e(8, `title "${t}" is ${t.length} chars (> 70)`);
    if (WORKSHEET_WORD.test(t)) e(8, `title "${t}" carries the worksheet word`);
    if (/­/.test(t)) e(8, `title "${t}" carries a soft hyphen`);
    const hb = heads.find((h) => hasPat(t, h));
    if (hb) e(8, `title "${t}" (${COMMON.modes[i]}) carries the banned head "${hb}"`);
    const head = nfc(t.split(/\s*:\s*/)[0]);
    if ((BARE_HEAD[L] || []).includes(head)) e(8, `title "${t}" has the bare head "${head}" (compound it)`);
  });
  // 9 — instructions
  for (const m of COMMON.modes) {
    const ins = String((block.strings && block.strings[m] && block.strings[m].instruction) || '');
    if (!ins) continue;
    if (ins.length > 150) e(9, `${m} instruction is ${ins.length} chars (> 150)`);
    if (sentences(ins) !== 1) e(9, `${m} instruction "${ins}" is not one sentence`);
    if (!/[.!?…]$/.test(ins.trim())) e(9, `${m} instruction "${ins}" does not end in a mark`);
    for (const w of NEVER_INSTR[L] || []) if (new RegExp(`(?<!\\p{L})${w}(?!\\p{L})`, 'iu').test(ins)) e(9, `${m} instruction "${ins}" names "${w}" (never an apparatus of this family)`);
    if (L === 'en') for (const [k, re] of Object.entries(APPARATUS_EN)) if (new RegExp(`(?<!\\p{L})(?:${re})(?!\\p{L})`, 'iu').test(ins) && !APPARATUS_OK[m].includes(k)) e(9, `${m} instruction "${ins}" names "${k}", which is not on its page`);
  }
  // 11 — kaiOrder
  if (typeof block.kaiOrder !== 'boolean') e(11, `kaiOrder must be a boolean (${JSON.stringify(block.kaiOrder)})`);
  else if (block.kaiOrder && L !== 'de' && !block.kaiSource) e(11, `kaiOrder true in ${L} without a recorded national source (never invent a surface order)`);
  if (block.weekStartOverride !== null && block.weekStartOverride !== undefined && ![0, 1].includes(block.weekStartOverride)) e(11, `weekStartOverride ${block.weekStartOverride} (null, 0 or 1)`);
  return E;
}

/**
 * REASON_READ (FIX ROUND 1) — the hand-read claim table for the EN reasons: which ONE habit each printed reason
 * fits, read against every other habit of reasonD2 + reserves. Pinned to the exact text: an edited reason FAILS until
 * it is re-read here (never trusted). The native panels keep the same table for their locale in their draft review.
 */
const REASON_READ = {
  en: {
    'wash-hands': ['It gets rid of the germs we picked up when we touched things.', 'wash-hands'],
    'brush-teeth': ['It keeps our smile clean and bright.', 'brush-teeth'],
    sleep: ['Our body and brain rest and get ready for a new day.', 'sleep'],
    'move-body': ['It makes us fit, fast and strong.', 'move-body'],
    'sun-protect': ['We do not get burnt on a hot, sunny day.', 'sun-protect'],
    'drink-water': ['Our body needs it to work well.', 'drink-water'],
    'blow-nose': ['We can breathe easily again.', 'blow-nose'],
  },
};
function reasonReadFindings(block, loc) {
  const R = REASON_READ[loc];
  if (!R) return [];
  const f = [];
  for (const [h, [text, fits]] of Object.entries(R)) {
    const now = block.reasons && block.reasons[h];
    if (now !== text) f.push(`reason read: the ${loc} reason for "${h}" changed ("${now}") — re-read which habit it fits and pin it in REASON_READ`);
    else if (fits !== h) f.push(`reason read: the ${loc} reason for "${h}" fits "${fits}"`);
  }
  return f;
}

/** The locale-neutral tables (P7, P21). */
function validateCommon(C) {
  const E = [];
  const e = (m) => E.push('common: ' + m);
  const kinds = [];
  for (const p of C.GERM_PAIRS) kinds.push(p.healthy, p.other);
  for (const k of kinds) if (/cough-hand|hand-cough|mask|screen/.test(k)) e(`GERM_PAIRS carries "${k}" (cough into the hand is outdated and never offered; masks / screens are excluded topics)`);
  for (const k of Object.keys(C.PHASE_OF)) if (/rinse-mouth|mouth-rinse|mouthwash|floss|timer|clock/.test(k)) e(`PHASE_OF carries "${k}" (mouth-rinse / floss / timer are never drawn: advice differs by country)`);
  const vec = Object.values(C.HAND_STATES).map((v) => v.join('|'));
  if (new Set(vec).size !== vec.length) e('HAND_STATES vectors are not pairwise distinct');
  if (C.handSteps.join() !== 'wet,soap,rub,rinse,dry') e(`handSteps ${C.handSteps.join()} (WHO / CDC order)`);
  for (const [set, list] of Object.entries(C.coOccur)) for (const id of list) {
    const [kind, key] = id.split(':');
    const okId = { figure: HP.POSES, tool: HP.TOOLS, hands: [...Object.keys(HP.HAND_STATES), 'hands-soap', 'hands-water-only', 'hands-dirty'], brush: HP.BRUSH_KINDS }[kind];
    if (!okId || !okId.includes(key)) e(`coOccur.${set}: "${id}" is not drawn by the primitive`);
  }
  for (const lvl of ['baseD1', 'baseD2', 'baseD3']) {
    const onPage = new Set([...C[lvl], ...C[lvl].map((h) => C.TOOL_OF[h])]);
    for (const [a, b] of C.neverTogether) if (onPage.has(a) && onPage.has(b)) e(`${lvl}: "${a}" and "${b}" share the page`);
  }
  return E;
}

/* ================================================================== 2. data poisons */
function fixture(loc, over) { return JSON.parse(JSON.stringify({ ...DATA.HEALTHY_HABITS.en, ...over })); }
function dataPoisons() {
  const en = DATA.HEALTHY_HABITS.en;
  const ctl = K.control('P0 correct EN block (control)', validateBank(en, 'en'));
  const cc = K.control('P0c correct COMMON (control)', validateCommon(COMMON));
  const J = (name, block, loc, re) => K.judge(name, validateBank(block, loc), re, ctl);
  J('P4 en brush-teeth reason "Brushing keeps teeth clean"', fixture('en', { reasons: { ...en.reasons, 'brush-teeth': 'Brushing keeps teeth clean.' } }), 'en', /^rule 3: the reason for "brush-teeth"/);
  J('P5 en wash-hands reason "We wash before we eat"', fixture('en', { reasons: { ...en.reasons, 'wash-hands': 'We wash before we eat.' } }), 'en', /^rule 4: reasons\.wash-hands/);
  J('P6 es reason "Lávate las manos 20 segundos" (digit)', fixture('es', { reasons: { ...en.reasons, 'wash-hands': 'Lávate las manos 20 segundos.' } }), 'es', /^rule 5: reasons\.wash-hands/);
  J('P6b es reason "Lávate las manos 20 segundos" (unit)', fixture('es', { reasons: { ...en.reasons, 'wash-hands': 'Lávate las manos 20 segundos.' } }), 'es', /^rule 6: reasons\.wash-hands/);
  K.judge('P7 a cough-hand kind marked healthy', validateCommon({ ...COMMON, GERM_PAIRS: [{ key: 'cough', healthy: 'cough-hand', other: 'cough-open' }, ...COMMON.GERM_PAIRS.slice(1)] }), /cough into the hand is outdated/, cc);
  J('P8 nl title "Gezonde gewoontes voor kleuters"', fixture('nl', { strings: { ...en.strings, base: { ...en.strings.base, title: 'Gezonde gewoontes voor kleuters' } } }), 'nl', /^rule 8: .*banned head "gezonde gewoonte\*"/);
  J('P9 sv F1 title "Tvätta händerna steg för steg"', fixture('sv', { strings: { ...en.strings, 'hand-washing-steps': { ...en.strings['hand-washing-steps'], title: 'Tvätta händerna steg för steg' } } }), 'sv', /^rule 8: .*banned head "steg för steg"/);
  J('P10 fr phases with "après" twice', fixture('fr', { phases: { before: 'avant', during: 'après', after: 'après' } }), 'fr', /^rule 1: phase chips are not pairwise distinct/);
  J('P22 en chart label "sleep" (a row every child ticks every day)', fixture('en', { labels: { ...en.labels, sleep: 'sleep' } }), 'en', /^rule 2: labels\.sleep "sleep" is one word/);
  J('P11 fi chip "harjaamisen jälkeen" (169.7 px)', fixture('fi', { phases: { before: 'ennen', during: 'samalla', after: 'harjaamisen jälkeen' } }), 'fi', /^rule 1: phase chip "harjaamisen jälkeen" is 169\.\d px/);
  J('P12 pt chart label "escovar os dentes 3 vezes"', fixture('pt', { labels: { ...en.labels, 'brush-teeth': 'escovar os dentes 3 vezes' } }), 'pt', /^rule 5: labels\.brush-teeth/);
  J('P13 da title "Sunde vaner og sund mad" (food)', fixture('da', { strings: { ...en.strings, base: { ...en.strings.base, title: 'Sunde vaner og sund mad' } } }), 'da', /^rule 4: strings\.base\.title/);
  J('P13b da title "Sunde vaner og sund mad" (head)', fixture('da', { strings: { ...en.strings, base: { ...en.strings.base, title: 'Sunde vaner og sund mad' } } }), 'da', /^rule 8: .*banned head "sund/);
  J('P18 en F4 reason naming "soap" beside wash-hands', fixture('en', { reasons: { ...en.reasons, 'wash-hands': 'Soap takes away the germs we picked up.' } }), 'en', /^rule 3: the reason for "wash-hands".*"soap", a stem of its OWN habit/);
  K.judge('P21 a mouth-rinse kind added to PHASE_OF', validateCommon({ ...COMMON, PHASE_OF: { ...COMMON.PHASE_OF, 'mouth-rinse': 'after' } }), /PHASE_OF carries "mouth-rinse"/, cc);
  J('RB1 en blow-nose reason naming "nose"', fixture('en', { reasons: { ...en.reasons, 'blow-nose': 'We can breathe through our nose again.' } }), 'en', /^rule 3: the reason for "blow-nose".*names "nose"/);
  J('RB2 en brush-teeth reason naming "teeth"', fixture('en', { reasons: { ...en.reasons, 'brush-teeth': 'It keeps our teeth clean and bright.' } }), 'en', /^rule 3: the reason for "brush-teeth".*(names "teeth"|a stem of its OWN habit)/);
  J('RB3 de wash-hands reason naming "Händen"', fixture('de', { reasons: { ...en.reasons, 'wash-hands': 'Die Keime von den Händen sind weg.' } }), 'de', /^rule 3: the reason for "wash-hands".*names "hände"|names "hand"/);
  K.judge('RR1 an en reason edited without a re-read', reasonReadFindings(fixture('en', { reasons: { ...en.reasons, 'wash-hands': 'It takes away the germs we picked up.' } }), 'en'), /changed/, K.control('RR0 the pinned en reasons (control)', reasonReadFindings(en, 'en')));
  J('P7b en instruction "Cover your mouth with your hand"', fixture('en', { strings: { ...en.strings, 'stop-the-germs': { ...en.strings['stop-the-germs'], instruction: 'In each row, circle the child who covers the mouth with a hand.' } } }), 'en', /^rule 7: strings\.stop-the-germs\.instruction/);
}

/* ================================================================== 3. render */
async function renderPage(page, { difficulty = 2, variant = 1, strings, plan, config, doctor, name, filter }) {
  const type = Object.create(SPEC);
  type.build = function (args, ctx) {
    const b = require('../lib/b6-common.js').bank('healthy-habits', 'en');
    const r = SPEC._buildWith.call(SPEC, { block: b, config: config || SPEC.difficulty[args.difficulty], plan }, { locale: 'en' }, ctx);
    if (doctor) r.bodyHtml = doctor(r.bodyHtml);
    if (filter) r.bodyHtml = `<div style="flex:1 1 auto;display:flex;flex-direction:column;min-height:0;filter:${filter}">${r.bodyHtml}</div>`;
    return r;
  };
  const en = require('../lib/b6-common.js').bank('healthy-habits', 'en');
  const out = await renderInstance({ type, theme: null, difficulty, locale: 'en', variant, strings: strings || en.strings.base, page, outDir: OUTDIR, baseName: name || `K-380-d${difficulty}-v${variant}` });
  const m = await page.evaluate(() => {
    const f = [];
    const root = document.querySelector('[data-ws-content][data-lcs-healthy-habits]');
    const tool = +root.dataset.lcsToolPx;
    const figs = [...root.querySelectorAll('.hh-plaque [data-lcs-pictogram]')].map((g) => { const r = g.getBoundingClientRect(), p = g.closest('.hh-plaque').getBoundingClientRect(); return { h: r.height, w: r.width, fill: r.height / p.height, plaqueH: p.height }; });
    figs.forEach((r) => { if (Math.max(r.w, r.h) < 56 - 0.6) f.push(`pictogram ${Math.max(r.w, r.h).toFixed(1)} < 56`); });
    root.querySelectorAll('.hh-tool svg').forEach((s) => { const r = s.getBoundingClientRect(); if (Math.min(r.width, r.height) < Math.max(56, tool) - 0.6) f.push(`tool ${r.width.toFixed(1)} < ${Math.max(56, tool)}`); });
    const hd = [...root.querySelectorAll('[data-lcs-dot="habit"]')], td = [...root.querySelectorAll('[data-lcs-dot="tool"]')];
    const zone = hd.length && td.length ? Math.min(...td.map((x) => x.getBoundingClientRect().top)) - Math.max(...hd.map((x) => x.getBoundingClientRect().bottom)) : 0;
    const body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const rail = root.querySelector('.hh-railband').getBoundingClientRect(), shelf = root.querySelector('.hh-shelf').getBoundingClientRect();
    const ins = document.querySelector('.ws-instruction').getBoundingClientRect(), foot = document.querySelector('.ws-foot').getBoundingClientRect();
    const railTop = root.querySelector('[data-lcs-rail-part="rail"]').getBoundingClientRect().top, plankBot = root.querySelector('[data-lcs-shelf-part="plank"]').getBoundingClientRect().bottom;
    return { f, zone, bodyH: body.height, stack: shelf.bottom - rail.top, topGap: railTop - ins.bottom, botGap: foot.top - plankBot,
      plaqueH: figs.length ? figs[0].plaqueH : 0, minFill: figs.length ? Math.min(...figs.map((x) => x.fill)) : 0, figH: figs.map((x) => Math.round(x.h)).join('/'),
      title: document.querySelector('[data-lcs-title]').textContent, instr: document.querySelector('[data-lcs-instruction]').textContent };
  });
  return { out, m };
}
function pageChecks(tag, r, expect) {
  ok(!r.out.qa.verify.length, `${tag}: verify() ${JSON.stringify(r.out.qa.verify.slice(0, 4))}`);
  ok(!r.out.qa.lints.length, `${tag}: lints ${JSON.stringify(r.out.qa.lints.slice(0, 4))}`);
  ok(!r.m.f.length, `${tag}: floors ${JSON.stringify(r.m.f.slice(0, 3))}`);
  ok(r.m.zone >= 180 - 0.6 && r.m.zone <= 260 + 0.6, `${tag}: the pencil zone is ${r.m.zone.toFixed(0)} px (180..260)`);
  if (expect) {
    ok(r.m.title.trim() === expect.title, `${tag}: printed title "${r.m.title}" ≠ the bank "${expect.title}"`);
    ok(r.m.instr.trim() === expect.instruction, `${tag}: printed instruction "${r.m.instr}" ≠ the bank "${expect.instruction}"`);
  }
}

/** 4 — pooled composition over n seeds (pure build) */
function pooled(n = 400) {
  const d = SPEC.difficulty[2], N = d.pairs;
  const col = {}, off = {};
  const en = require('../lib/b6-common.js').bank('healthy-habits', 'en');
  for (let v = 1; v <= n; v++) {
    const rng = makeRng(instanceSeed({ typeId: 'K-380', theme: null, difficulty: 2, seedEpoch: 1, variant: v }));
    const r = SPEC._buildWith({ block: en, config: d }, { locale: 'en' }, { rng });
    const habits = r.meta.habits.split(','), tools = r.meta.tools.split(',');
    tools.forEach((t, j) => { col[t] = col[t] || Array(N).fill(0); col[t][j]++; });
    habits.forEach((h, i) => { ok(tools.indexOf(COMMON.TOOL_OF[h]) !== i, `pooled v${v}: a tool in its own column`); });
    r.meta.offsets.split(',').map(Number).forEach((o) => { off[o] = (off[o] || 0) + 1; });
    ok(!SPEC.orderTell(habits, tools), `pooled v${v}: ${SPEC.orderTell(habits, tools)}`);
  }
  let worstCol = 0;
  for (const [t, arr] of Object.entries(col)) for (const c of arr) { worstCol = Math.max(worstCol, c / n); }
  ok(worstCol <= 0.30, `pooled: a tool sits in one column ${(100 * worstCol).toFixed(1)} % of pages (> 30 %)`);
  const tot = Object.values(off).reduce((a, b) => a + b, 0);
  const shares = [];
  for (let o = 1; o < N; o++) {
    const s = (off[o] || 0) / tot;
    shares.push(`${o}:${(100 * s).toFixed(1)}%`);
    ok(s <= 0.40, `pooled: offset ${o} on ${(100 * s).toFixed(1)} % of pairs (> 40 %)`);
    ok(s >= 0.10, `pooled: offset ${o} on only ${(100 * s).toFixed(1)} % of pairs (< 10 %: a too-regular spread is a tell too)`);
  }
  return { worstCol, shares };
}

const desc = (r) => `body ${r.m.bodyH.toFixed(0)}, stack ${r.m.stack.toFixed(0)}, plaque ${r.m.plaqueH.toFixed(0)} (children ${r.m.figH} px, min fill ${(100 * r.m.minFill).toFixed(0)} %), zone ${r.m.zone.toFixed(0)}, blank above the rail ${r.m.topGap.toFixed(0)} / below the plank ${r.m.botGap.toFixed(0)}`;
async function renderPass(page, quick) {
  const rows = [];
  const en = require('../lib/b6-common.js').bank('healthy-habits', 'en');
  ok(SPEC.i18n.en.title === en.strings.base.title && SPEC.i18n.en.instruction === en.strings.base.instruction, 'spec i18n.en ≠ the bank strings.base');
  for (const d of [1, 2, 3]) {
    const r = await renderPage(page, { difficulty: d, name: `K-380-d${d}-en` });
    pageChecks(`d${d}`, r, en.strings.base);
    rows.push(`d${d}: verify + lints ${r.out.qa.verify.length + r.out.qa.lints.length ? 'FAIL' : 'clean'}; ${desc(r)} · ${r.out.pngPath}`);
  }
  if (!quick) {
    let bad = 0;
    for (let v = 2; v <= 20; v++) { const r = await renderPage(page, { difficulty: 2, variant: v, name: `K-380-d2-sweep` }); const n0 = K.fails.length; pageChecks(`d2 v${v}`, r, en.strings.base); if (K.fails.length > n0) bad++; }
    rows.push(`d2 sweep v2..v20: ${bad} failing pages`);
  }
  // 5a — the SPARSE sweep at the three chromes (814 one-line / 722 three-line title + three-line instruction / 677)
  const CHROMES = [
    ['814', { title: 'Healthy Habits', instruction: 'Draw a line from each child to what they need.' }],
    ['722', { title: 'Hygiene und Körperpflege: Was braucht jedes Kind zum Waschen, Zähneputzen und Schlafen?', instruction: 'Zeichne von jedem Kind eine Linie zu dem, was es braucht. Schau dir zuerst genau an, was jedes Kind gerade macht, und such dann das passende Ding unten.' }],
  ];
  for (const [name, str] of CHROMES) {
    const r = await renderPage(page, { difficulty: 2, strings: str, name: `K-380-d2-chrome-${name}` });
    pageChecks(`chrome ${name}`, r, null);
    rows.push(`chrome ${name}: ${desc(r)}, verify + lints ${r.out.qa.verify.length + r.out.qa.lints.length ? 'FAIL ' + JSON.stringify(r.out.qa.verify.concat(r.out.qa.lints).slice(0, 2)) : 'clean'}`);
  }
  // 5 — long chrome (4-line title + 150-char instruction)
  const longTitle = 'Hygienia ja terveelliset elintavat: mitä kukin lapsi tarvitsee pestäkseen, harjatakseen, nukkuakseen ja kammatakseen';
  const longInstr = 'Piirrä viiva jokaisesta lapsesta siihen tavaraan, jota juuri se lapsi tarvitsee, ja katso ensin tarkasti, mitä kukin lapsi on tekemässä kuvassa.';
  const lc = await renderPage(page, { difficulty: 2, strings: { title: longTitle, instruction: longInstr }, name: 'K-380-d2-longchrome' });
  const titleLines = await page.evaluate(() => { const t = document.querySelector('[data-lcs-title]'); return Math.round(t.getBoundingClientRect().height / parseFloat(getComputedStyle(t).lineHeight)); });
  ok(titleLines >= 4, `long-chrome: the stress title wraps to ${titleLines} lines (< 4: the case is not exercised)`);
  pageChecks('long-chrome', lc, null);
  rows.push(`long chrome (677): title ${titleLines} lines, instruction ${longInstr.length} chars → ${desc(lc)}, verify + lints ${lc.out.qa.verify.length + lc.out.qa.lints.length ? 'FAIL' : 'clean'} · ${lc.out.pngPath}`);
  // 6 — greyscale read
  const g = await renderPage(page, { difficulty: 2, filter: 'grayscale(1)', name: 'K-380-d2-greyscale' });
  pageChecks('greyscale d2', g, en.strings.base);
  rows.push(`greyscale d2: verify + lints ${g.out.qa.verify.length + g.out.qa.lints.length ? 'FAIL' : 'clean'} · ${g.out.pngPath}`);
  return rows;
}

/* ================================================================== 7. render poisons */
async function renderPoisons(page) {
  const verifyOf = async (opts) => { const r = await renderPage(page, { difficulty: 2, ...opts }); return r.out.qa.verify; };
  const ctl = K.control('PR0 d2 render (control)', await verifyOf({ name: 'K-380-poison-control' }));
  const brush = HP.habitTool({ kind: 'toothbrush', px: 40 }).svg;
  K.judge('P1 a toothbrush glyph inside the brush-teeth plaque', await verifyOf({ name: 'K-380-poison-P1',
    doctor: (h) => h.replace(/(<div class="hh-plaque" data-lcs-habit="brush-teeth"[^>]*>)/, `$1<div style="position:absolute;right:4px;top:4px">${brush}</div>`) }), /plaque \d: (a whole tool glyph is drawn inside the habit|the toothbrush \(its own tool\) is drawn)/, ctl);
  K.judge('P2 bubbles on the soap glyph', await verifyOf({ name: 'K-380-poison-P2',
    doctor: (h) => h.replace(/(<g data-lcs-glyph="soap">)/, '$1<g data-lcs-part="bubbles"><circle cx="30" cy="36" r="4" fill="#FFFFFF" stroke="#3A3530" stroke-width="1.8"/></g>') }), /\(soap\): (carries the forbidden mark "bubbles"|a round mark on the soap)/, ctl);
  // PSP (lead review 2026-09-23) the old gap restored: 110 px empty above the rail + a line zone taking all slack
  K.judge('PSP1 the old 110 px blank above the rail', await verifyOf({ name: 'K-380-poison-PSP1',
    doctor: (h) => h.replace('class="hh-hooks" style="', 'class="hh-hooks" style="padding-top:110px !important;align-content:start;') }), /sparse: a \d+ px blank band/, ctl);
  K.judge('PSP2 the old line zone minmax(160px,1fr)', await verifyOf({ name: 'K-380-poison-PSP2',
    doctor: (h) => h.replace(/minmax\(180px,260px\)/, 'minmax(160px,1fr)') }), /line zone \d+ px outside/, ctl);
  // PH1 (fix round 1b) the sleep child drawn at half height again (its viewBox doubled)
  K.judge('PH1 the sleep child drawn at half height', await verifyOf({ name: 'K-380-poison-PH1',
    doctor: (h) => h.replace(/viewBox="29 -16 55 113"/, 'viewBox="-16 -70 136 226"') }), /a standing child is \d+ px tall/, ctl);
  // P3 the tool order = the plaque order shifted by one
  const habits = [...COMMON.baseD2];
  const tools = habits.map((h, i) => COMMON.TOOL_OF[habits[(i + habits.length - 1) % habits.length]]);
  K.judge('P3 tools = plaques shifted by one (constant shift)', await verifyOf({ name: 'K-380-poison-P3', plan: { habits, tools } }), /derangement: a constant cyclic shift/, ctl);
  // PS two pose stamps swapped (the drawings stay): verify reads the drawing, so it must name the disagreement
  K.judge('PS two pose stamps swapped', await verifyOf({ name: 'K-380-poison-PS',
    doctor: (h) => h.replace('data-lcs-pose="sleep"', 'data-lcs-pose="__S__"').replace('data-lcs-pose="comb-hair"', 'data-lcs-pose="sleep"').replace('data-lcs-pose="__S__"', 'data-lcs-pose="comb-hair"') }), /the drawing reads "(sleep|comb-hair)" but the stamp says/, ctl);
  // P20 a face config fed to a base build: the real guard refuses; a guard keyed on the level index would not
  const faceCfg = { layout: 'steps-write', cards: 5 };   // a face config that LOST its mode (the real base guard keys on layout)
  const refuses = (spec) => { try { spec._buildWith({ block: DATA.HEALTHY_HABITS.en, config: faceCfg }, { locale: 'en' }, { rng: makeRng('x') }); return []; } catch (err) { return ['refused: ' + err.message]; } };
  const real = refuses(SPEC);
  ok(real.length === 1, 'P20 control: the real base build does not refuse a face config');
  const indexGuard = Object.create(SPEC);
  indexGuard._buildWith = function (args, loc, ctx) { const cfg = SPEC.difficulty[2]; return SPEC._buildWith.call(SPEC, { ...args, config: cfg }, loc, ctx); };  // "difficulty === 2 → base": ignores the resolved config
  const pr = refuses(indexGuard);
  K.judge('P20 a base guard keyed on the level index, fed a face config', pr.length ? [] : ['the face config was built as a base page (the guard keyed on the level index)'], /built as a base page/, real.length === 1);
}

async function main() {
  const quick = process.argv.includes('--quick');
  const en = DATA.HEALTHY_HABITS.en;
  for (const [loc, block] of Object.entries(DATA.HEALTHY_HABITS)) for (const f of validateBank(block, loc)) ok(false, `bank ${loc}: ${f}`);
  for (const f of reasonReadFindings(DATA.HEALTHY_HABITS.en, 'en')) ok(false, f);
  for (const f of validateCommon(COMMON)) ok(false, f);
  dataPoisons();
  const pool = pooled(400);
  let rows = [];
  await H.withBrowser(async (page) => {
    rows = await renderPass(page, quick);
    await renderPoisons(page);
    // Phase E: the five faces (strings, pooled tells, renders at 3 chromes + greyscale, the face poisons)
    rows.push(...await require('./b6-healthy-habits-faces.js').faceGate({ page, K, quick, OUTDIR, validateBank }));
  });
  console.log(`bank: ${Object.keys(DATA.HEALTHY_HABITS).join(', ')} validated (${validateBank(en, 'en').length} findings on en)`);
  console.log(`pooled 400 seeds (d2): worst tool-in-column ${(100 * pool.worstCol).toFixed(1)} % (<= 30), offsets ${pool.shares.join(' ')} (10-40 each)`);
  console.log('render:\n  ' + rows.join('\n  '));
  console.log('poisons:\n' + K.log.join('\n'));
  if (K.fails.length) console.log('FAILS:\n  ' + K.fails.slice(0, 40).join('\n  '));
  const pass = !K.fails.length && K.killed === K.total;
  console.log(pass ? `PASS (${K.assertions} assertions, ${K.killed}/${K.total} poisons killed)` : `FAIL (${K.fails.length} findings, ${K.killed}/${K.total} poisons killed)`);
  return pass;
}
if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, validateCommon, reasonReadFindings, REASON_READ, main };
