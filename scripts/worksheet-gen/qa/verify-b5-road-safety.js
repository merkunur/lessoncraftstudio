#!/usr/bin/env node
/**
 * verify-b5-road-safety.js — the K-369 `road-safety` family gate (design
 * docs/worksheet-gen/b5-designs/K-369-road-safety.md §5). Exit 1 on any real
 * failure OR any silent poison.
 *
 *   node scripts/worksheet-gen/qa/verify-b5-road-safety.js [--quick]
 *
 * 1. validateBank(block, loc) — the §5 validator rules 1-12 over every authored
 *    locale block (en today; the native panels add the rest). Exported for
 *    tools/validate-b5-draft.js.
 * 2. DATA POISONS P1-P15 (each must FAIL for its OWN rule; the correct EN block
 *    and the correct gate FIXTURES are the controls). The Vienna / BR / MX
 *    fixtures below are TEST FIXTURES — shaped like a panel's block so the
 *    per-convention rules are exercised before any panel exists; they are NOT
 *    signed tables and never reach a page.
 * 3. RENDER through the real pipeline (render/render-instance.js, file:// fonts):
 *    d1 / d2 / d3 en + (unless --quick) the 20-seed d2 sweep (variants 1..20,
 *    the shipped seed = variant 1): verify() empty, qa/lints.js clean, the K
 *    floors measured HERE (lamps >= 56, pictogram max extent >= 56 — lints has
 *    no size lint), every printed literal === the bank, no answer-key / free
 *    promise, balance + anti-staircase + no reading position stop > 70 %.
 * 4. The LONG-CHROME case: a 4-line title + a 150-char instruction (the fi 677
 *    budget) — the stage must still fit above the footer.
 * 5. The GREYSCALE PROOF — nothing is answerable by colour alone: every code
 *    colour on the page is replaced by ONE grey (inkSoft) and the page must still
 *    verify with the SAME derived answers (the answers come from rays + lamp
 *    rank + pose, never a hue); the colour-stripped PNG is kept for the reviewer.
 * 6. RENDER POISONS: PR1 two lamps lit · PR5 the data-lcs-on stamps swapped
 *    with the rays left in place (the gate must STAY GREEN — it never reads the
 *    stamp) · PR6 the pedestrian head 20 px down · PR7 the it pill literal
 *    "attraversare" · PR9 a forced SGSGSG order · PR10 a code colour outside
 *    [data-lcs-signal] · PR11 a face config that lost its mode fed to the base
 *    build · PR11b a misspelt face mode.
 * 7. THE FIVE FACES (Phase E): qa/b5-road-safety-faces.js — sweeps, renders at
 *    814 / 722 / 677 + the Vienna fixture + greyscale, FILL / SPARSE, and the face
 *    poisons PR2 / PR3 / PR4 / PR8 + the per-page tells + apparatus rule 9.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const tokens = require('../primitives/_tokens.js');
const { renderInstance } = require('../render/render-instance.js');
const { runLints } = require('./lints.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { COLOR_WORDS } = require('../data/color-words.js');
const freeClaim = require('../../lib/free-claim.js');
const H = require('./b5-road-safety-harness.js');

const SPEC = require('../types/k/K-369-road-safety.js');
const DATA = require('../data/b5/road-safety.js');
const { COMMON, geometryKey } = DATA;

const K = H.makeChecker();
const { ok } = K;
const OUTDIR = path.join(__dirname, '..', 'out', 'dev', 'K-369-gate');

/* ================================================================== 1. validateBank */
/** Regulation facts only a signed review may change; the design marks each reg ✓. */
const REG = {
  stopText: { en: 'STOP', de: 'STOP', es: 'ALTO', pt: 'PARE', fr: 'STOP', it: 'STOP', nl: 'STOP', sv: 'STOP', da: 'STOP', no: 'STOP', fi: 'STOP' },
  warningField: { sv: 'yellow', fi: 'yellow', da: 'white' },            // Vienna warning-triangle field (reg ✓); no is SET by its panel
  amberToken: { fr: 'codeOrange', nl: 'codeOrange' },                    // everyone else codeYellow
  convention: { en: 'mutcd', es: 'mx', pt: 'br' },                      // the rest vienna
};
const TOKEN_COLOUR = { codeYellow: 'yellow', codeOrange: 'orange' };
const WORKSHEET_WORD = /arbeitsblatt|worksheet|werkblad|arbetsblad|arbejdsark|arbeidsark|feuille|(?<!\p{L})fiches?(?!\p{L})|ficha|scheda|tehtäv/iu;
const ANSWER_KEY = /(?<!\p{L})(answer\s*key|answer\s*sheet|with\s+answers|l[öo]sung\p{L}*|solucion\p{L}*|soluç\p{L}*|respostas|r[ée]ponses|corrig[ée]\p{L}*|soluzion\p{L}*|antwoord\p{L}*|facit|fasit|vastau\p{L}*|svar)(?!\p{L})/iu;
const VEHICLES = ['vehicles', 'fahrzeuge', 'vehículos', 'veículos', 'véhicules', 'veicoli', 'voertuigen', 'fordon', 'køretøjer', 'kjøretøy', 'ajoneuvot'];
const K210 = /land,?\s+water,?\s+and\s+air\s+transportation/i;
const nfc = (s) => String(s).normalize('NFC').toLowerCase();
const sentences = (s) => String(s).trim().split(/(?<=[.!?])\s+(?=\S)/u).filter(Boolean).length;
/** The words printed inside a sign (its `text`, `|` = a line break). */
const signWords = (sign) => String(sign.text || '').split(/[|\s]+/).filter(Boolean).map(nfc);
const containsWord = (text, w) => new RegExp(`(?<!\\p{L})${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?!\\p{L})`, 'iu').test(nfc(text));

/** en apparatus words (letter-bounded) and which face prints which (design §5 rule 9) */
const APPARATUS = Object.fromEntries(Object.entries({
  box: 'box(?:es)?', line: 'lines?', circle: 'circl(?:e|es|ed|ing)', letter: 'letters?', lamp: 'lamps?', ray: 'rays?', sign: 'signs?',
  group: 'groups?', sentence: 'sentences?', colour: 'colou?r(?:s|ed|ing)?', dot: 'dots?', bin: 'bins?', arrow: 'arrows?', card: 'cards?',
  picture: 'pictures?', row: 'rows?', word: 'words?', number: 'numbers?|numerals?', cut: 'cut', tick: 'tick',
}).map(([k, v]) => [k, new RegExp(`(?<!\\p{L})(?:${v})(?!\\p{L})`, 'iu')]));
const APPARATUS_ALLOWED = {
  base: ['lamp', 'circle'],
  'colour-lights': ['lamp', 'ray', 'colour'],
  'crossing-steps': ['box', 'number'],
  'sign-meaning': ['line', 'sign'],
  'sign-kinds': ['letter', 'sign', 'box', 'group'],
  'sign-quiz': ['sentence', 'circle', 'sign'],
};

/**
 * rule 13 — THE GATE'S OWN MEANING MODEL (never read off the bank): each role -> the claims a sentence about
 * that sign makes, which that sign SATISFIES. Two roles sharing a claim can BOTH fit one sign-quiz sentence
 * (a row with two right answers: "Bicycles are not allowed here" fits no-bikes AND no-vehicles), so every
 * such pair must sit in COMMON.confusable (the build keeps confusable pairs off one row). The table may carry
 * MORE pairs (look-alike glyphs); it may never carry fewer. Audit 2026-09-23 (native panels on G2-361).
 */
const ROLE_SATISFIES = {
  stop: ['give-way', 'halt'],
  yield: ['give-way', 'may-roll'],               // may-roll: slow down, no full halt (a stop sign does NOT satisfy it)
  crossing: ['people-cross', 'crossing-place'],  // crossing-place: a marked place to cross is HERE (a warning of children is not)
  'pedestrian-warning': ['people-cross', 'people-walk-along'],
  children: ['people-cross', 'children'],
  school: ['people-cross', 'children', 'school-near'],
  'signal-ahead': ['light-ahead'],
  'bike-warning': ['bikes-ride', 'children'],
  'no-entry': ['no-cars-in'],
  'no-vehicles': ['no-cars-in', 'no-bikes'],
  'no-bikes': ['no-bikes'],
  'no-pedestrians': ['no-walkers'],
  footpath: ['people-walk-along', 'no-bikes'],
  'bike-path': ['bikes-ride', 'no-walkers'],
  'shared-path': ['people-walk-along', 'bikes-ride'],
  'info-1': ['info-1'],
  'info-2': ['info-2'],
};
/**
 * rule 14 (landing round 1, 2026-09-23; G1-384 sign-meaning rows): every meaning on the matching page must be
 * satisfied by EXACTLY ONE sign of that page — its own (the en panel: "Watch for people crossing the road" fitted
 * the school sign too). The model is ROLE_SATISFIES above; the CLAIM each printed meaning makes is READ by hand per
 * locale and pinned to the exact text, so an edited meaning FAILS until its claim is re-read (never trusted).
 */
const MEANING_READ = {
  en: { "stop": ["Every car must halt here, then look.", 'halt'], "yield": ["Slow down and let the others go first.", 'may-roll'], "crossing": ["This is a marked place where people cross the road.", 'crossing-place'], "school": ["A school is near, so look out for children.", 'school-near'], "no-entry": ["No car may drive into the street from this side.", 'no-cars-in'], "signal-ahead": ["Watch out, a traffic light is coming.", 'light-ahead'] },
  de: { "stop": ["Ganz anhalten und die anderen zuerst fahren lassen.", 'halt'], "crossing": ["Hier ist ein Zebrastreifen zum sicheren Überqueren.", 'crossing-place'], "children": ["Achtung, hier können Kinder auf die Straße laufen.", 'children'], "no-entry": ["Hier darf kein Fahrzeug hineinfahren.", 'no-cars-in'], "footpath": ["Dieser Weg ist nur für Fußgänger.", 'people-walk-along'], "bike-path": ["Dieser Weg ist nur für Radfahrer.", 'bikes-ride'] },
  es: { "stop": ["Todos los carros deben detenerse por completo aquí.", 'halt'], "yield": ["Frena y deja pasar primero a los demás.", 'may-roll'], "crossing": ["Aquí hay un paso peatonal para cruzar la calle.", 'crossing-place'], "school": ["Cerca hay una escuela y cruzan niños.", 'school-near'], "signal-ahead": ["Más adelante hay un semáforo.", 'light-ahead'], "no-bikes": ["Aquí no pueden circular las bicicletas.", 'no-bikes'] },
  pt: { "stop": ["Todo carro deve parar aqui e olhar antes de seguir.", 'halt'], "yield": ["Diminua e deixe os outros passarem primeiro.", 'may-roll'], "crossing": ["Atenção: aqui as pessoas atravessam na faixa.", 'crossing-place'], "school": ["Perto daqui tem uma escola com muitas crianças.", 'school-near'], "signal-ahead": ["Atenção: logo à frente tem um semáforo.", 'light-ahead'], "no-bikes": ["Bicicletas não podem andar nesta rua.", 'no-bikes'] },
  fr: { "stop": ["Toutes les voitures doivent s’arrêter ici.", 'halt'], "crossing": ["Ici, un passage piéton est tracé pour traverser la rue.", 'crossing-place'], "children": ["Attention, des enfants passent souvent ici.", 'children'], "no-entry": ["Les voitures n’ont pas le droit d’entrer par ici.", 'no-cars-in'], "footpath": ["Ce chemin est réservé aux piétons.", 'people-walk-along'], "bike-path": ["Cette voie est réservée aux vélos.", 'bikes-ride'] },
  it: { "stop": ["Tutte le auto devono fermarsi qui e dare la precedenza.", 'halt'], "crossing": ["Qui ci sono le strisce pedonali per attraversare la strada.", 'crossing-place'], "children": ["Attenzione, qui passano spesso dei bambini.", 'children'], "no-entry": ["Le auto non possono entrare da questa parte.", 'no-cars-in'], "footpath": ["Questo percorso è solo per chi va a piedi.", 'people-walk-along'], "bike-path": ["Questa pista è solo per le biciclette.", 'bikes-ride'] },
  nl: { "stop": ["Elke auto moet hier helemaal stilstaan en voorrang geven.", 'halt'], "yield": ["Rem af en laat het andere verkeer eerst gaan, daarna mag je verder rijden.", 'may-roll'], "crossing": ["Hier is een zebrapad om veilig over te steken.", 'crossing-place'], "children": ["Let op, hier kunnen kinderen de weg op lopen.", 'children'], "no-entry": ["Hier mag geen enkel voertuig de straat in.", 'no-cars-in'], "bike-path": ["Dit pad is alleen voor fietsers.", 'bikes-ride'] },
  sv: { "stop": ["Här måste alla bilar stanna helt och släppa fram de andra.", 'halt'], "crossing": ["Här är ett övergångsställe där du kan gå över gatan.", 'crossing-place'], "children": ["Se upp, här kan barn springa ut på gatan.", 'children'], "no-entry": ["Hit in får inga fordon köra.", 'no-cars-in'], "footpath": ["Den här vägen är bara för gående.", 'people-walk-along'], "bike-path": ["Den här vägen är bara för cyklister.", 'bikes-ride'] },
  da: { "stop": ["Alle biler skal holde helt stille her og se sig for.", 'halt'], "crossing": ["Her er en fodgængerovergang, hvor man går over vejen.", 'crossing-place'], "children": ["Pas på, her kan børn løbe ud på vejen.", 'children'], "no-entry": ["Her må ingen køre ind.", 'no-cars-in'], "footpath": ["Denne sti er kun for dem, der går.", 'people-walk-along'], "bike-path": ["Denne sti er kun for cykler.", 'bikes-ride'] },
  no: { "stop": ["Her må alle biler stoppe helt og slippe fram de andre.", 'halt'], "crossing": ["Her er et gangfelt der du kan gå over veien.", 'crossing-place'], "children": ["Pass på, her kan barn løpe ut i veien.", 'children'], "no-entry": ["Hit inn får ingen kjøre.", 'no-cars-in'], "signal-ahead": ["Pass på, snart kommer et trafikklys.", 'light-ahead'], "bike-path": ["Denne veien er laget for sykler.", 'bikes-ride'] },
  fi: { "stop": ["Jokaisen auton täytyy pysähtyä kokonaan ennen risteystä.", 'halt'], "crossing": ["Tässä on suojatie, jota pitkin voit ylittää kadun.", 'crossing-place'], "children": ["Varo, tässä lähellä voi olla lapsia.", 'children'], "no-entry": ["Tähän suuntaan ei saa ajaa.", 'no-cars-in'], "footpath": ["Tämä tie on vain kävelijöille.", 'people-walk-along'], "bike-path": ["Tämä tie on pyöräilijöille.", 'bikes-ride'] },
};
/** Readings whose meaning also fits another sign on the page — a native must re-author them. A RATCHET: an entry
 *  that no longer fires FAILS (remove it), a new overlap outside it FAILS; it may only shrink. */
const MEANING_PENDING = {};
function meaningFindings(block, loc) {
  const F = [];
  const set = block.setG1 || [], M = block.meanings || {}, R = MEANING_READ[loc];
  if (!R) return [`rule 14: ${loc}: no meaning readings for this locale`];
  for (const r of set) {
    const rd = R[r];
    if (!rd) { F.push(`rule 14: ${loc}: meanings.${r} has no reading (read its claim into MEANING_READ)`); continue; }
    if (rd[0] !== M[r]) { F.push(`rule 14: ${loc}: meanings.${r} "${M[r]}" changed since it was read ("${rd[0]}") — re-read its claim`); continue; }
    if (!(ROLE_SATISFIES[r] || []).includes(rd[1])) F.push(`rule 14: ${loc}: meanings.${r} claims "${rd[1]}", which its own sign does not satisfy`);
    const also = set.filter((x) => x !== r && (ROLE_SATISFIES[x] || []).includes(rd[1]));
    if (also.length) F.push(`rule 14: ${loc}: meanings.${r} ("${M[r]}", claim ${rd[1]}) also fits the ${also.join(' / ')} sign on the same page`);
  }
  return F;
}
/** true when one sentence can be satisfied by both roles (the gate's model) */
function bothSatisfy(a, b) {
  if (a === b) return false;
  const A = ROLE_SATISFIES[a] || [], B = ROLE_SATISFIES[b] || [];
  return A.some((x) => B.includes(x));
}
function validateConfusable(common = COMMON) {
  const E = [];
  const has = (a, b) => (common.confusable || []).some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  for (const r of common.roles) if (!ROLE_SATISFIES[r]) E.push(`rule 13: role "${r}" has no entry in the gate's meaning model`);
  for (let i = 0; i < common.roles.length; i++) for (let j = i + 1; j < common.roles.length; j++) {
    const a = common.roles[i], b = common.roles[j];
    if (bothSatisfy(a, b) && !has(a, b)) E.push(`rule 13: ${a} / ${b} both satisfy one sentence but the pair is not in COMMON.confusable (a quiz row could have two right answers)`);
  }
  return E;
}

function validateBank(block, loc, common = COMMON) {
  const E = [];
  const e = (rule, msg) => E.push(`rule ${rule}: ${loc}: ${msg}`);
  if (!block || typeof block !== 'object') return [`rule 0: ${loc}: no block`];
  // rule 1 — every sign record complete, closed sets, the regulation table
  if (!common.conventions.includes(block.convention)) e(1, `convention "${block.convention}" not in ${common.conventions.join('|')}`);
  const wantConv = REG.convention[loc] || 'vienna';
  if (block.convention !== wantConv) e(1, `convention "${block.convention}" ≠ the ${loc} regulation family "${wantConv}"`);
  const signs = block.signs || {};
  for (const [role, s] of Object.entries(signs)) {
    if (!common.roles.includes(role)) e(1, `sign role "${role}" is not a known role`);
    for (const f of ['code', 'regRef', 'signedBy']) if (typeof s[f] !== 'string' || !s[f].trim()) e(1, `sign ${role} has no ${f}`);
    if (!common.shapes.includes(s.shape)) e(1, `sign ${role} shape "${s.shape}"`);
    if (!common.fields.includes(s.field)) e(1, `sign ${role} field "${s.field}"`);
    if (!common.glyphs.includes(s.glyph)) e(1, `sign ${role} glyph "${s.glyph}"`);
    if (s.text && !['text', 'bar'].includes(s.glyph)) e(1, `sign ${role} carries text on glyph "${s.glyph}"`);
    if (s.glyph === 'text' && !s.text) e(1, `sign ${role} glyph text without text`);
    if (role === 'stop' && s.text !== REG.stopText[loc]) e(1, `the stop sign reads "${s.text}", the ${loc} regulation sign reads "${REG.stopText[loc]}"`);
    if (REG.warningField[loc] && s.shape === 'triUp' && s.field !== REG.warningField[loc]) e(1, `warning triangle ${role} has a ${s.field} field; the ${loc} regulation field is ${REG.warningField[loc]}`);
  }
  // rule 2 — the class from geometry
  const table = (common.classOf || {})[block.convention] || {};
  for (const [role, s] of Object.entries(signs)) {
    const gk = geometryKey(s);
    const c = table[gk];
    if (c !== s.class) e(2, `sign ${role}: geometry "${gk}" reads as "${c}" under ${block.convention}, the record says "${s.class}"`);
  }
  // rule 3 — setG1, kindsPool, classes
  const setG1 = block.setG1 || [];
  if (setG1.length !== 6 || new Set(setG1).size !== 6) e(3, `setG1 has ${setG1.length} (${new Set(setG1).size} distinct) roles ≠ 6`);
  for (const r of setG1) if (!signs[r]) e(3, `setG1 role ${r} has no sign`);
  const pool = block.kindsPool || [];
  if (pool.length < 8 || new Set(pool).size !== pool.length) e(3, `kindsPool has ${pool.length} roles (>= 8 distinct)`);
  const perClass = {};
  for (const r of pool) {
    const s = signs[r];
    if (!s) { e(3, `kindsPool role ${r} has no sign`); continue; }
    if (geometryKey(s) === 'circle+red') e(3, `kindsPool role ${r} is a filled red disc (red 96 = blue 96 in greyscale)`);
    perClass[s.class] = (perClass[s.class] || 0) + 1;
  }
  const classes = block.classes || [];
  if (classes.length < 2 || classes.length > 3) e(3, `${classes.length} classes (2-3)`);
  for (const c of classes) {
    if (!c || typeof c.label !== 'string' || !c.label.trim()) e(3, `class ${c && c.key} has no label`);
    if (block.convention === 'vienna' && c && c.key === 'priority') e(3, `a Vienna classes list carries "priority" (STOP / yield are excluded from the sort)`);
    if (c && !(perClass[c.key] >= 2)) e(3, `class ${c && c.key} has ${perClass[c && c.key] || 0} kindsPool roles (< 2)`);
  }
  for (const k of Object.keys(perClass)) if (!classes.some((c) => c && c.key === k)) e(3, `kindsPool class "${k}" has no bin`);
  // rule 4 — situations (+ the F3 meanings: no sign's printed word leaks into its own line)
  const sit = block.situations || {};
  const targeted = [...new Set([...setG1, ...pool])];
  let total = 0;
  const cap = ['fi', 'de'].includes(loc) ? 126 : 90;
  for (const r of targeted) {
    const list = sit[r] || [];
    if (list.length < 2) e(4, `role ${r} has ${list.length} situations (< 2)`);
    for (const t of list) {
      total++;
      if (typeof t !== 'string' || !t.trim()) { e(4, `role ${r}: an empty situation`); continue; }
      if (t.length > cap) e(4, `role ${r}: situation ${t.length} chars > ${cap}: "${t}"`);
      if (sentences(t) > 2) e(4, `role ${r}: situation has ${sentences(t)} sentences: "${t}"`);
      for (const w of signWords(signs[r] || {})) if (containsWord(t, w)) e(4, `role ${r}: the situation prints the sign's own word "${w}": "${t}"`);
    }
  }
  if (total < 12) e(4, `${total} situations (< 12)`);
  for (const r of setG1) {
    const m = (block.meanings || {})[r];
    if (typeof m !== 'string' || !m.trim()) { e(4, `setG1 role ${r} has no meaning`); continue; }
    for (const w of signWords(signs[r] || {})) if (containsWord(m, w)) e(4, `role ${r}: the meaning prints the sign's own word "${w}": "${m}"`);
  }
  // rule 5 — the pedestrian light
  const pl = block.pedLight || {};
  if (!['standing', 'hand'].includes(pl.stop)) e(5, `pedLight.stop is ${JSON.stringify(pl.stop)} (SET it: standing | hand)`);
  if (pl.go !== 'walking') e(5, `pedLight.go is ${JSON.stringify(pl.go)} (walking)`);
  if (![2, 3].includes(pl.lamps)) e(5, `pedLight.lamps ${pl.lamps}`);
  if (block.convention === 'mutcd' && pl.stop !== 'hand') e(5, `a MUTCD pedestrian light shows the HAND at stop, not "${pl.stop}"`);
  // rule 6 — amber
  const am = block.amber || {};
  if (!['codeYellow', 'codeOrange'].includes(am.token)) e(6, `amber.token "${am.token}"`);
  const wantTok = REG.amberToken[loc] || 'codeYellow';
  if (am.token !== wantTok) e(6, `amber.token "${am.token}" ≠ the ${loc} crayon "${wantTok}"`);
  const cw = (COLOR_WORDS[loc] || {})[TOKEN_COLOUR[am.token]];
  if (am.word !== cw && !(am.wordOverride && am.wordOverride.reason)) e(6, `amber.word "${am.word}" ≠ data/color-words.js ${loc}.${TOKEN_COLOUR[am.token]} "${cw}" (and no recorded override)`);
  if (!['stop', 'slow'].includes(block.amberMeans)) e(6, `amberMeans "${block.amberMeans}"`);
  // rule 7 — steps
  const st = block.steps || [];
  if (st.length < 3 || st.length > 6) e(7, `steps length ${st.length} (3-6)`);
  if (st[0] !== 'stop-kerb') e(7, `steps start "${st[0]}" (stop-kerb)`);
  if (st[st.length - 1] !== 'walk-across') e(7, `steps end "${st[st.length - 1]}" (walk-across)`);
  for (const k of st) if (!common.stepKinds.includes(k)) e(7, `step "${k}" is not a step kind`);
  if (new Set(st).size !== st.length) e(7, `steps ${st.join(',')} repeat an action (landing round 1: every card a different action)`);
  const il = st.indexOf('look-left'), ir = st.indexOf('look-right');
  if (ir >= 0 && (il < 0 || il > ir)) e(7, 'look-right comes before look-left (right-hand traffic: the near lane comes from the LEFT)');
  // rule 8 — chip words
  for (const a of ['ped', 'car']) for (const s of ['stop', 'go']) {
    const w = block.chipWords && block.chipWords[a] && block.chipWords[a][s];
    if (typeof w !== 'string' || !w.trim()) e(8, `chipWords.${a}.${s} missing`);
  }
  // rules 9-12 — strings
  const S = block.strings || {};
  const modes = common.modes;
  if (Object.keys(S).sort().join() !== modes.slice().sort().join()) e(12, `strings keys ${Object.keys(S).join(',')} ≠ the 6 modes`);
  const titles = [];
  for (const m of modes) {
    const t = S[m] || {};
    if (typeof t.title !== 'string' || typeof t.instruction !== 'string') { e(12, `strings.${m} lacks title / instruction`); continue; }
    titles.push(nfc(t.title));
    if (t.instruction.length > 150) e(9, `strings.${m}.instruction ${t.instruction.length} chars > 150`);
    if (sentences(t.instruction) > 1 && !(loc === 'fi' && t.twoSentenceReason)) e(9, `strings.${m}.instruction has ${sentences(t.instruction)} sentences (ONE)`);
    if (loc === 'en' && /(?<!\p{L})(tick|cut)(?!\p{L})/iu.test(t.instruction)) e(9, `strings.${m}.instruction asks to tick / cut`);
    if (t.title.length > 70) e(10, `strings.${m}.title ${t.title.length} chars > 70`);
    if (WORKSHEET_WORD.test(t.title)) e(10, `strings.${m}.title carries a worksheet-word`);
    for (const f of ['title', 'instruction']) { const c = freeClaim.hit(t[f]); if (c) e(10, `strings.${m}.${f} claims free ("${c}")`); }
    if (VEHICLES.some((v) => nfc(t.title).includes(v)) || K210.test(t.title)) e(10, `strings.${m}.title names the vehicles theme / K-210`);
    if (block.signHead && nfc(t.title).includes(nfc(block.signHead))) {
      const anchored = nfc(t.title).includes(nfc(block.familyHead || '\u0000')) || (block.childAnchors || []).some((a) => nfc(t.title).includes(nfc(a)));
      if (!anchored) e(10, `strings.${m}.title "${t.title}" carries the sign head without the family head or a child anchor`);
    }
    if (nfc(t.title) === nfc(block.signHead || '\u0000')) e(10, `strings.${m}.title is the bare sign head "${t.title}"`);
    if (loc === 'sv' && /(?<!\p{L})trafik(?!\p{L})/iu.test(t.title)) e(10, `strings.${m}.title uses bare "Trafik"`);
    for (const f of ['title', 'instruction']) if (ANSWER_KEY.test(t[f])) e(11, `strings.${m}.${f} promises an answer key`);
  }
  if (new Set(titles).size !== titles.length) e(10, 'two modes share a title');
  // rule 9 (studio rule: the instruction names only apparatus ON the page): every chip word the base instruction
  // QUOTES must be a chip on EVERY card type the base addresses (pedestrian + car). "circle … stop or go" was false
  // on the pedestrian cards, whose chips read wait / walk (coordinator review 2026-09-23).
  if (S.base && block.chipWords) {
    const actors = ['ped', 'car'].filter((a) => block.chipWords[a]);
    const all = [...new Set(actors.flatMap((a) => Object.values(block.chipWords[a])))];
    for (const w of all) {
      if (!containsWord(S.base.instruction, nfc(w))) continue;
      const missing = actors.filter((a) => !Object.values(block.chipWords[a]).some((x) => nfc(x) === nfc(w)));
      if (missing.length) e(9, `strings.base.instruction quotes the chip word "${w}", which is not a chip on the ${missing.join(' / ')} cards`);
    }
  }
  // rule 9 (apparatus, en): the base names only a lamp + circling
  if (loc === 'en' && S.base && !(/lamp|light/i.test(S.base.instruction) && /circle/i.test(S.base.instruction))) e(9, 'the base instruction does not name the lamp and the circling');
  // rule 9 (apparatus per face, en; the K-369 base review lesson "the instruction names ONLY apparatus present on
  // this face's page"): every apparatus word an instruction uses must be printed on that face; the faces' apparatus
  // is design §5 rule 9 (F1 lamps with rays + colour; F2 boxes + numbers; F3 a line; F4 letters + boxes / groups;
  // F5 a sentence + circling). Letter-boundary, so "lines" and "colored" are caught and "online" is not.
  if (loc === 'en') {
    for (const [m, allowed] of Object.entries(APPARATUS_ALLOWED)) {
      const ins = S[m] && S[m].instruction;
      if (typeof ins !== 'string') continue;
      for (const [word, re] of Object.entries(APPARATUS)) if (re.test(ins) && !allowed.includes(word)) e(9, `strings.${m}.instruction names "${word}", which is not on the ${m} page`);
    }
  }
  // rule 14 — the G1-384 meanings are mutually exclusive on their page (fixtures carry placeholder meanings: skipped)
  if (!block._fixture) for (const m of meaningFindings(block, loc)) if (!(MEANING_PENDING[loc] || []).some((r) => m.includes(`meanings.${r} (`))) E.push(m);
  return E;
}

/* ================================================================== 2. fixtures + data poisons */
const clone = (o) => JSON.parse(JSON.stringify(o));
const FIX_SIGNED = 'TEST FIXTURE (verify-b5-road-safety.js) — not a signed table';
function sgn(code, shape, rim, field, glyph, cls, extra = {}) { return { code, regRef: 'fixture', shape, rim, field, glyph, text: '', slash: false, class: cls, signedBy: FIX_SIGNED, ...extra }; }
function fixStrings(head, signHead) {
  return {
    base: { title: `${head}: base`, instruction: 'Fixture lamp and circle instruction.' },
    'colour-lights': { title: `${head}: lights`, instruction: 'Fixture instruction.' },
    'crossing-steps': { title: `${head}: steps`, instruction: 'Fixture instruction.' },
    'sign-meaning': { title: `${head}: ${signHead}`, instruction: 'Fixture instruction.' },
    'sign-kinds': { title: `${head}: kinds`, instruction: 'Fixture instruction.' },
    'sign-quiz': { title: `${head}: quiz`, instruction: 'Fixture instruction.' },
  };
}
function sits(roles) { return Object.fromEntries(roles.map((r, i) => [r, [`Fixture situation ${i}a for this role.`, `Fixture situation ${i}b for this role.`]])); }
function fixture(loc) {
  const words = { de: 'gelb', sv: 'gul', nl: 'oranje', es: 'amarillo', pt: 'amarelo' };
  if (loc === 'es' || loc === 'pt') {
    const br = loc === 'pt';
    const reg = br ? 'regulamentacao' : 'restrictiva', warn = br ? 'advertencia' : 'preventiva', info = br ? 'indicacao' : 'informativa';
    const signs = {
      stop: sgn('R-1', 'octagon', 'white', 'red', 'text', reg, { text: REG.stopText[loc] }),
      yield: sgn('R-2', 'triDown', 'red', 'white', 'none', reg),
      crossing: sgn('A-32', 'diamond', 'ink', 'yellow', 'walker', warn),
      school: sgn('A-33', 'diamond', 'ink', 'yellow', 'twoChildren', warn),
      'signal-ahead': sgn('A-14', 'diamond', 'ink', 'yellow', 'trafficLightMini', warn),
      'bike-warning': sgn('A-30', 'diamond', 'ink', 'yellow', 'bicycle', warn),
      'no-bikes': br ? sgn('R-12', 'circle', 'red', 'white', 'bicycle', reg, { slash: true }) : sgn('SR-1', 'plateCircle', 'red', 'white', 'bicycle', reg, { slash: true }),
      'no-pedestrians': br ? sgn('R-29', 'circle', 'red', 'white', 'walker', reg, { slash: true }) : sgn('SR-2', 'plateCircle', 'red', 'white', 'walker', reg, { slash: true }),
      'info-1': sgn('I-1', 'square', 'white', 'blue', 'walkerOnStripes', info),
      'info-2': sgn('I-2', 'square', 'white', 'blue', 'crossingTriangle', info),
    };
    const setG1 = ['stop', 'yield', 'crossing', 'school', 'signal-ahead', 'no-bikes'];
    const kindsPool = ['crossing', 'school', 'signal-ahead', 'bike-warning', 'stop', 'yield', 'no-bikes', 'no-pedestrians', 'info-1', 'info-2'];
    return { _fixture: true, convention: br ? 'br' : 'mx', signs, setG1, kindsPool, classes: [{ key: warn, label: 'Fixture A' }, { key: reg, label: 'Fixture B' }, { key: info, label: 'Fixture C' }],
      pedLight: { stop: 'standing', go: 'walking', lamps: 2 }, amber: { token: 'codeYellow', word: words[loc] }, amberMeans: 'stop',
      chipWords: { ped: { stop: 'a', go: 'b' }, car: { stop: 'c', go: 'd' } }, meanings: Object.fromEntries(setG1.map((r) => [r, `Fixture meaning of this sign.`])),
      situations: sits([...new Set([...setG1, ...kindsPool])]), steps: ['stop-kerb', 'look-left', 'look-right', 'wait-clear', 'walk-across'], listenStep: null,
      familyHead: 'Fixture Family', signHead: 'Fixture Signs', childAnchors: ['fixture kids'], strings: fixStrings('Fixture Family', 'Fixture Signs') };
  }
  // Vienna (de, sv, nl)
  const wf = REG.warningField[loc] || 'white';
  const signs = {
    stop: sgn('Z 206', 'octagon', 'white', 'red', 'text', 'priority', { text: 'STOP' }),
    crossing: sgn('Z 350', 'square', 'white', 'blue', 'walkerOnStripes', 'information'),
    children: sgn('Z 136', 'triUp', 'red', wf, 'twoChildren', 'warning'),
    'pedestrian-warning': sgn('Z 133', 'triUp', 'red', wf, 'walker', 'warning'),
    'signal-ahead': sgn('Z 131', 'triUp', 'red', wf, 'trafficLightMini', 'warning'),
    'bike-warning': sgn('Z 138', 'triUp', 'red', wf, 'bicycle', 'warning'),
    'no-entry': sgn('Z 267', 'circle', null, 'red', 'bar', 'prohibition'),
    'no-vehicles': sgn('Z 250', 'circle', 'red', wf, 'none', 'prohibition'),
    'no-bikes': sgn('Z 254', 'circle', 'red', wf, 'bicycle', 'prohibition'),
    'no-pedestrians': sgn('Z 259', 'circle', 'red', wf, 'walker', 'prohibition'),
    footpath: sgn('Z 239', 'circle', 'white', 'blue', 'adultChild', 'mandatory'),
    'bike-path': sgn('Z 237', 'circle', 'white', 'blue', 'bicycle', 'mandatory'),
    'shared-path': sgn('Z 240', 'circle', 'white', 'blue', 'walker', 'mandatory'),
  };
  const setG1 = ['stop', 'crossing', 'children', 'no-entry', 'footpath', 'bike-path'];
  const kindsPool = ['children', 'pedestrian-warning', 'signal-ahead', 'bike-warning', 'no-vehicles', 'no-bikes', 'no-pedestrians', 'footpath', 'bike-path', 'shared-path'];
  const tok = REG.amberToken[loc] || 'codeYellow';
  return { _fixture: true, convention: 'vienna', signs, setG1, kindsPool, classes: [{ key: 'warning', label: 'Fixture A' }, { key: 'prohibition', label: 'Fixture B' }, { key: 'mandatory', label: 'Fixture C' }],
    pedLight: { stop: 'standing', go: 'walking', lamps: 2 }, amber: { token: tok, word: words[loc] }, amberMeans: 'stop',
    chipWords: { ped: { stop: 'a', go: 'b' }, car: { stop: 'c', go: 'd' } }, meanings: Object.fromEntries(setG1.map((r) => [r, 'Fixture meaning of this sign.'])),
    situations: sits([...new Set([...setG1, ...kindsPool])]), steps: ['stop-kerb', 'look-left', 'look-right', 'wait-clear', 'walk-across'], listenStep: null,
    familyHead: 'Verkehrserziehung', signHead: 'Verkehrszeichen', childAnchors: ['Grundschule', 'für Kinder'], strings: fixStrings('Verkehrserziehung', 'Verkehrszeichen') };
}

function confusablePoisons() {
  const ctl = K.control('P18 control: COMMON.confusable covers the meaning model', validateConfusable());
  const drop = (a, b) => { const c = clone(COMMON); c.confusable = c.confusable.filter(([x, y]) => !((x === a && y === b) || (x === b && y === a))); return c; };
  K.judge('P18 confusable without [no-bikes, no-vehicles]', validateConfusable(drop('no-bikes', 'no-vehicles')), /rule 13: no-vehicles \/ no-bikes both satisfy one sentence/, ctl);
  K.judge('P19 confusable without [no-pedestrians, bike-path]', validateConfusable(drop('no-pedestrians', 'bike-path')), /rule 13: no-pedestrians \/ bike-path both satisfy one sentence/, ctl);
  // the other direction: a pair the model does NOT derive is never demanded (dropping a look-alike pair stays green),
  // and the model never calls two unrelated signs a double fit
  const c20 = validateConfusable(drop('signal-ahead', 'crossing'));
  K.control('P20 must-pass: dropping the look-alike [signal-ahead, crossing] is not a rule-13 finding', c20);
  ok(!c20.length, `P20 must-pass: dropping a look-alike pair raised ${JSON.stringify(c20)}`);
  ok(!bothSatisfy('stop', 'school') && !bothSatisfy('no-bikes', 'bike-path') && !bothSatisfy('no-pedestrians', 'footpath'), 'rule 13 model: an unrelated / opposite pair reads as a double fit');
  ok(bothSatisfy('no-bikes', 'no-vehicles') && bothSatisfy('bike-path', 'no-pedestrians'), 'rule 13 model: the audited double fits are not derived');
}

function dataPoisons(en) {
  const ctl = {};
  for (const [loc, b] of [['en', en], ['de', fixture('de')], ['sv', fixture('sv')], ['nl', fixture('nl')], ['es', fixture('es')], ['pt', fixture('pt')]]) {
    ctl[loc] = K.control(`P0 ${loc} ${loc === 'en' ? 'bank' : 'fixture'} control`, validateBank(b, loc));
  }
  const P = (name, loc, mutate, re) => { const b = clone(loc === 'en' ? en : fixture(loc)); mutate(b); K.judge(name, validateBank(b, loc), re, ctl[loc]); };
  P('P1 en yield (triDown) tagged warning', 'en', (b) => { b.signs.yield.class = 'warning'; }, /rule 2: en: sign yield: geometry "triDown" reads as "regulatory"/);
  P('P2 de crossing drawn as a yellow diamond', 'de', (b) => { Object.assign(b.signs.crossing, { shape: 'diamond', rim: 'ink', field: 'yellow', glyph: 'walker' }); }, /rule 2: de: sign crossing: geometry "diamond" reads as "undefined"/);
  P('P3 pt stop.text = "STOP"', 'pt', (b) => { b.signs.stop.text = 'STOP'; }, /rule 1: pt: the stop sign reads "STOP", the pt regulation sign reads "PARE"/);
  P('P4 es stop.text = "PARE"', 'es', (b) => { b.signs.stop.text = 'PARE'; }, /rule 1: es: the stop sign reads "PARE", the es regulation sign reads "ALTO"/);
  P('P5 sv warning triangle field white', 'sv', (b) => { b.signs.children.field = 'white'; }, /rule 1: sv: warning triangle children has a white field; the sv regulation field is yellow/);
  P('P6 nl amber codeYellow with word "oranje"', 'nl', (b) => { b.amber.token = 'codeYellow'; }, /rule 6: nl: amber\.token "codeYellow" ≠ the nl crayon "codeOrange"/);
  P('P7 en pedLight.stop standing', 'en', (b) => { b.pedLight.stop = 'standing'; }, /rule 5: en: a MUTCD pedestrian light shows the HAND/);
  P('P8 pt pedLight.stop unset', 'pt', (b) => { delete b.pedLight.stop; }, /rule 5: pt: pedLight\.stop is undefined/);
  P('P9 steps with look-right first', 'en', (b) => { b.steps = ['stop-kerb', 'look-right', 'look-left', 'wait-clear', 'walk-across']; }, /rule 7: en: look-right comes before look-left/);
  P('P9b steps looking left twice (one action on two cards)', 'en', (b) => { b.steps = ['stop-kerb', 'look-left', 'look-right', 'look-left', 'walk-across']; }, /rule 7: en: steps .* repeat an action/);
  P('P10 stop situation "Here is a STOP sign."', 'en', (b) => { b.situations.stop[0] = 'Here is a STOP sign.'; }, /rule 4: en: role stop: the situation prints the sign's own word "stop"/);
  P('P11 a Vienna classes list with priority', 'de', (b) => { b.classes.push({ key: 'priority', label: 'Fixture D' }); }, /rule 3: de: a Vienna classes list carries "priority"/);
  P('P12 kindsPool with no-entry (filled red disc)', 'de', (b) => { b.kindsPool.push('no-entry'); }, /rule 3: de: kindsPool role no-entry is a filled red disc/);
  P('P13 title "Verkehrszeichen"', 'de', (b) => { b.strings['sign-quiz'].title = 'Verkehrszeichen'; }, /rule 10: de: strings\.sign-quiz\.title (".*" carries the sign head|is the bare sign head)/);
  P('P14 sign without signedBy', 'en', (b) => { delete b.signs.school.signedBy; }, /rule 1: en: sign school has no signedBy/);
  P('P16 base instruction quotes "stop or go" (not on the pedestrian cards)', 'en', (b) => { b.strings.base.instruction = 'Look at the lamp that is on, then circle what to do: stop or go.'; }, /rule 9: en: strings\.base\.instruction quotes the chip word "stop", which is not a chip on the ped cards/);
  P('P17 base instruction quotes "wait or walk" (not on the car cards)', 'en', (b) => { b.strings.base.instruction = 'Look at the lamp that is on, then circle wait or walk.'; }, /rule 9: en: strings\.base\.instruction quotes the chip word "wait", which is not a chip on the car cards/);
  P('P15 two-sentence base instruction', 'en', (b) => { b.strings.base.instruction = 'Look at the lamp that is on. Then circle stop or go.'; }, /rule 9: en: strings\.base\.instruction has 2 sentences/);
}

/* ================================================================== 3-6. render */
async function renderPage(page, { difficulty, variant, strings, block, config, geom, plan, doctor, name, locale = 'en' }) {
  const type = Object.create(SPEC);
  type.build = function (args, ctx) {
    const b = block || require('../lib/b5-common.js').bank('road-safety', locale);
    const r = SPEC._buildWith.call(SPEC, { block: b, config: config || SPEC.difficulty[args.difficulty], geom, plan }, { locale }, ctx);
    if (doctor) r.bodyHtml = doctor(r.bodyHtml);
    return r;
  };
  const en = require('../lib/b5-common.js').bank('road-safety', locale);
  const out = await renderInstance({ type, theme: null, difficulty, locale, variant, strings: strings || en.strings.base, page, outDir: OUTDIR, baseName: name || `K-369-d${difficulty}-v${variant || 1}` });
  const floors = await page.evaluate(() => {
    const f = [];
    document.querySelectorAll('[data-lcs-lamp]').forEach((g) => { const r = g.getBoundingClientRect(); if (Math.min(r.width, r.height) < 55.4) f.push(`lamp ${r.width.toFixed(1)} x ${r.height.toFixed(1)} < 56`); });
    document.querySelectorAll('.rs-cell svg').forEach((s) => { const r = s.getBoundingClientRect(); if (Math.max(r.width, r.height) < 55.4) f.push(`pictogram ${Math.max(r.width, r.height).toFixed(1)} < 56`); });
    const title = document.querySelector('[data-lcs-title]').textContent, instr = document.querySelector('[data-lcs-instruction]').textContent;
    const pills = [...document.querySelectorAll('[data-lcs-pill]')].map((p) => ({ side: p.closest('[data-lcs-side]').dataset.lcsSide, actor: p.closest('[data-lcs-strip]').dataset.lcsActor, text: p.textContent }));
    const root = document.querySelector('[data-ws-content]').getBoundingClientRect(), body = document.querySelector('[data-lcs-body]').getBoundingClientRect();
    const strips = [...document.querySelectorAll('[data-lcs-strip]')];
    const stack = strips.length ? Math.max(...strips.map((s) => s.getBoundingClientRect().bottom)) - Math.min(...strips.map((s) => s.getBoundingClientRect().top)) : 0;
    return { f, title, instr, pills, bodyH: body.height, rootH: root.height, stack, visible: document.querySelector('.ws-page').innerText };
  });
  return { out, floors };
}

function pageChecks(tag, r, block, expectStrings) {
  const { out, floors } = r;
  ok(!out.qa.verify.length, `${tag}: verify() ${JSON.stringify(out.qa.verify.slice(0, 4))}`);
  ok(!out.qa.lints.length, `${tag}: lints ${JSON.stringify(out.qa.lints.slice(0, 4))}`);
  ok(!floors.f.length, `${tag}: floors ${JSON.stringify(floors.f.slice(0, 3))}`);
  if (expectStrings) {
    // the fr page prints a no-break space where the string has a plain one (page/shell.js frTypo, landing round 1)
    const sp = (s) => String(s).replace(/[  ]/g, ' ');
    ok(sp(floors.title) === sp(expectStrings.title), `${tag}: printed title "${floors.title}" ≠ the bank "${expectStrings.title}"`);
    ok(sp(floors.instr) === sp(expectStrings.instruction), `${tag}: printed instruction ≠ the bank`);
  }
  for (const p of floors.pills) ok(p.text === block.chipWords[p.actor][p.side], `${tag}: pill "${p.text}" ≠ the bank chipWords.${p.actor}.${p.side}`);
  ok(!ANSWER_KEY.test(floors.visible), `${tag}: visible copy promises an answer key`);
  ok(!freeClaim.hit(floors.visible), `${tag}: visible copy claims free`);
  ok(!/[≈→]/.test(floors.visible), `${tag}: ≈ / → printed as text`);
}

async function renderGate(page, quick) {
  const en = require('../lib/b5-common.js').bank('road-safety', 'en');
  const rows = [];
  // d1 / d2 / d3 shipped seeds
  for (const d of [1, 2, 3]) {
    const r = await renderPage(page, { difficulty: d, variant: 1, name: `K-369-d${d}-shipped` });
    pageChecks(`d${d} shipped`, r, en, en.strings.base);
    rows.push(`d${d} shipped: answers ${r.out.meta.answers} · stack ${r.floors.stack.toFixed(0)} px in a ${r.floors.bodyH.toFixed(0)} px body`);
  }
  // the seed sweep (d2, variants 1..20) — computed from the composer for all 20; rendered unless --quick
  const pos = Array(6).fill(0);
  const ans = [];
  for (let v = 1; v <= 20; v++) {
    const rng = makeRng(instanceSeed({ typeId: 'K-369', theme: null, difficulty: 2, seedEpoch: 1, variant: v }));
    const b = SPEC._buildWith({ block: en, config: SPEC.difficulty[2] }, { locale: 'en' }, { rng });
    ans.push(b.meta.answers);
    [...b.meta.answers].forEach((c, i) => { if (c === 'S') pos[i]++; });
    if (!quick && v > 1) { const r = await renderPage(page, { difficulty: 2, variant: v, name: `K-369-d2-v${v}` }); pageChecks(`d2 v${v}`, r, en, en.strings.base); }
  }
  // per PAGE (sibling-review ruling): each page uses BOTH answer sides, each actor answers both ways, each column mixes
  let perPage = 0;
  for (const a of ans) { const nS = (a.match(/S/g) || []).length; if (nS === 3 && !/^(SSS|GGG)/.test(a) && !/(SSS|GGG)$/.test(a)) perPage++; }
  ok(perPage === ans.length, `per page: only ${perPage}/${ans.length} pages use both sides 3/3 with mixed columns`);
  rows.push(`per page: ${perPage}/${ans.length} pages answer stop 3 / go 3 with both columns mixed (verify() also asserts each actor answers both ways on every page)`);
  pos.forEach((n, i) => ok(n / 20 <= 0.7, `seed sweep: reading position ${i + 1} is stop on ${n}/20 seeds (> 70 %)`));
  ok(!['SSSGGG', 'GGGSSS', 'SGSGSG', 'GSGSGS'].includes(ans[0]), `the shipped seed's order ${ans[0]} is a staircase / alternation`);
  rows.push(`seed sweep d2 x20: ${ans.join(' ')} · stop per position ${pos.map((n) => n + '/20').join(' ')}${quick ? ' (composer only, --quick)' : ' (all rendered)'}`);
  // 4a. the three chromes (sibling-review ruling: SPARSE is measured at 814 / 722 / 677): verify() carries the
  //     "largest empty band between consecutive blocks <= 40 px" assertion, so pageChecks fails a sparse page
  const CHROMES = [
    ['814 (1-line title + 1-line instruction)', { title: 'Road Safety: Stop or Go', instruction: 'Circle what to do.' }],
    ['722 (3-line title + 3-line instruction)', { title: 'Verkehrserziehung: die Ampel für Fußgänger und Autos, stehen oder gehen', instruction: 'Schau bei jeder Ampel auf das Licht, das leuchtet, und kreise dann ein, was die Person auf dem Gehweg oder das Auto auf der Straße jetzt tun muss: stehen bleiben oder gehen, halten oder weiterfahren.' }],
  ];
  for (const [name, str] of CHROMES) {
    const r = await renderPage(page, { difficulty: 2, variant: 1, strings: str, name: `K-369-d2-chrome-${name.slice(0, 3)}` });
    const lines = await page.evaluate(() => { const L = (sel) => { const t = document.querySelector(sel); const rg = document.createRange(); rg.selectNodeContents(t); return new Set([...rg.getClientRects()].map((r) => Math.round(r.top))).size; }; return [L('[data-lcs-title]'), L('[data-lcs-instruction]')]; });
    pageChecks(`chrome ${name}`, r, en, null);
    rows.push(`chrome ${name}: measured ${lines[0]}-line title / ${lines[1]}-line instruction → body ${r.floors.bodyH.toFixed(0)} px, stack ${r.floors.stack.toFixed(0)} px, verify + lints ${r.out.qa.verify.length + r.out.qa.lints.length ? 'FAIL ' + JSON.stringify(r.out.qa.verify.concat(r.out.qa.lints).slice(0, 2)) : 'clean'}`);
  }
  // 4b. the long-chrome case
  const longTitle = 'Liikenneturvallisuus: liikennevalot ja suojatie, pysähdy tai mene, harjoittele tien ylittämistä turvallisesti koulumatkalla';
  const longInstr = 'Katso jokaisessa liikennevalossa palavaa valoa, ja ympyröi sitten, mitä kadulla kävelevän tai autoa ajavan pitää tehdä: pysähtyä vai mennä eteenpäin.';
  const lc = await renderPage(page, { difficulty: 2, variant: 1, strings: { title: longTitle, instruction: longInstr }, name: 'K-369-d2-longchrome' });
  const titleLines = await page.evaluate(() => { const t = document.querySelector('[data-lcs-title]'); return Math.round(t.getBoundingClientRect().height / parseFloat(getComputedStyle(t).lineHeight)); });
  ok(titleLines >= 4, `long-chrome: the stress title wraps to ${titleLines} lines (< 4: the case is not exercised)`);
  pageChecks('long-chrome (4-line title + 150-char instruction)', lc, en, null);
  rows.push(`long chrome: title ${titleLines} lines, instruction ${longInstr.length} chars → body ${lc.floors.bodyH.toFixed(0)} px, stack ${lc.floors.stack.toFixed(0)} px (<= 677 designed), verify + lints ${lc.out.qa.verify.length + lc.out.qa.lints.length ? 'FAIL' : 'clean'} · ${lc.out.pngPath}`);
  // 5. the greyscale proof: every code colour → ONE grey; the same answers must be derived
  const CODE = Object.values(tokens.codeColors);
  const grey = (html) => CODE.reduce((h, c) => h.split(c).join(tokens.color.inkSoft), html);
  const g = await renderPage(page, { difficulty: 2, variant: 1, doctor: grey, name: 'K-369-d2-colour-stripped' });
  pageChecks('colour-stripped d2', g, en, en.strings.base);
  const derivedGrey = await page.evaluate(() => document.querySelector('[data-ws-content]').dataset.lcsAnswers);
  ok(!/#(C0392B|2E6DA4|E0A800|4E8A3C|D9661C)/i.test(fs.readFileSync(path.join(OUTDIR, 'K-369-d2-colour-stripped.html'), 'utf8')), 'colour-stripped: a code colour survived the strip');
  rows.push(`greyscale proof: every code colour → inkSoft, verify() ${g.out.qa.verify.length ? 'FAILS' : 'clean'} with answers ${derivedGrey} (the rays + lamp rank + pose carry every answer) · ${g.out.pngPath}`);
  return rows;
}

async function renderPoisons(page) {
  const en = require('../lib/b5-common.js').bank('road-safety', 'en');
  const base = await renderPage(page, { difficulty: 2, variant: 1, name: 'K-369-poison-control' });
  const ctl = K.control('PR0 d2 control', await K.collect(() => pageChecks('control', base, en, en.strings.base)));
  const verifyOf = (r) => r.out.qa.verify.concat(r.out.qa.lints);
  // PR1 two lamps lit on one car light: copy the ray group onto the top lamp and fill it
  const pr1 = await renderPage(page, { difficulty: 2, variant: 1, name: 'K-369-poison-PR1', doctor: (h) => h.replace(/(<svg[^>]*aria-label="traffic light"[^>]*>[\s\S]*?)(<g data-lcs-rays="1" data-lcs-for="(\d)">[\s\S]*?<\/g>)/, (m, pre, rays, idx) => {
    const lamp0cy = /data-lcs-index="0"[^>]*><circle cx="[\d.]+" cy="([\d.]+)"/.exec(pre);
    const cyOn = /data-lcs-index="(\d)"[^>]*><circle cx="[\d.]+" cy="([\d.]+)"/g;
    let on = null; for (const mm of pre.matchAll(cyOn)) if (mm[1] === idx) on = +mm[2];
    const other = +idx === 0 ? on + 124 : +lamp0cy[1];
    const shifted = rays.replace(/y([12])="([\d.]+)"/g, (a, k, v) => `y${k}="${(+v - on + other).toFixed(2)}"`);
    return pre + rays + shifted;
  }) });
  K.judge('PR1 two lamps lit on one car light', verifyOf(pr1), /2 ray groups/, ctl);
  // PR5 swap the data-lcs-on stamps, rays untouched → must STAY GREEN
  const pr5 = await renderPage(page, { difficulty: 2, variant: 1, name: 'K-369-poison-PR5', doctor: (h) => h.replace(/data-lcs-on="1"/g, 'data-lcs-on="X"').replace(/data-lcs-on="0"/g, 'data-lcs-on="1"').replace(/data-lcs-on="X"/g, 'data-lcs-on="0"') });
  const pr5f = verifyOf(pr5);
  K.total++; const pr5ok = !pr5f.length && ctl; if (pr5ok) K.killed++;
  K.log.push(`  PR5 data-lcs-on stamps swapped, rays in place: ${pr5ok ? 'STAYS GREEN (the gate never reads the stamp) — correct' : 'WENT RED ' + JSON.stringify(pr5f.slice(0, 2)) + ' — the gate reads the stamp (a defect)'}`);
  // PR6 the pedestrian head 20 px below the strip top
  const g6 = { ...SPEC.geomFor(SPEC.difficulty[2]), pedTop: 20 };
  const pr6 = await renderPage(page, { difficulty: 2, variant: 1, geom: g6, name: 'K-369-poison-PR6' });
  K.judge('PR6 pedestrian head 20 px down (height cue lost)', verifyOf(pr6), /pedestrian head only 20\.0 px below the car head in its row/, ctl);
  // PR7 the it pill literal "attraversare" (101.7 px > 94)
  const b7 = clone(en); b7.chipWords.ped.go = 'attraversare';
  const pr7 = await renderPage(page, { difficulty: 2, variant: 1, block: b7, name: 'K-369-poison-PR7' });
  K.judge('PR7 pill literal "attraversare"', verifyOf(pr7), /the go pill "attraversare" overflows/, ctl);
  // PR9 a forced SGSGSG order
  const pr9 = await renderPage(page, { difficulty: 2, variant: 1, plan: { actors: ['car', 'ped', 'car', 'ped', 'car', 'ped'], sides: ['stop', 'go', 'stop', 'go', 'stop', 'go'] }, name: 'K-369-poison-PR9' });
  K.judge('PR9 answer order SGSGSG', verifyOf(pr9), /answer order SGSGSG is a staircase/, ctl);
  // PR10 a code colour outside [data-lcs-signal]
  const pr10 = await renderPage(page, { difficulty: 2, variant: 1, name: 'K-369-poison-PR10', doctor: (h) => h.replace('<div class="rs-rule"', `<svg width="10" height="10" style="position:absolute"><rect width="10" height="10" fill="${tokens.codeColors.codeRed}"/></svg><div class="rs-rule"`) });
  K.judge('PR10 a codeRed fill outside [data-lcs-signal]', verifyOf(pr10), /code colour #C0392B outside \[data-lcs-signal\]/, ctl);
  // PR14 SPARSE both ways: the pre-review stage (fixed 214 px rows + space-evenly) at the 814 chrome must FAIL the
  //      empty-band assertion; the shipped stage at the same chrome is its control
  const short = { title: 'Road Safety: Stop or Go', instruction: 'Circle what to do.' };
  const c14 = await renderPage(page, { difficulty: 2, variant: 1, strings: short, name: 'K-369-poison-PR14-control' });
  const ctl14 = K.control('PR14 sparse control (814 chrome, shipped stage)', verifyOf(c14));
  const pr14 = await renderPage(page, { difficulty: 2, variant: 1, strings: short, name: 'K-369-poison-PR14', doctor: (h) => h.replace(/grid-template-rows:repeat\((\d),minmax\((\d+)px,1fr\)\)/, 'grid-template-rows:repeat($1,$2px);align-content:space-evenly').replace(/height:100%;min-height:(\d+)px/g, 'height:$1px') });
  K.judge('PR14 the old space-evenly stage at the 814 chrome (sparse)', verifyOf(pr14), /sparse: a \d+ px empty band between consecutive blocks \(> 40\)/, ctl14);
  // PR11 a face config fed to the base build (a guard written on the level index would let it through)
  let msg = '';
  // Phase E: a config WITH a face mode now builds that face (the one additive knob), so the class this poison guards
  // is a face-shaped config that LOST its mode — the base build must refuse it on the resolved config's own keys
  try { SPEC._buildWith({ block: en, config: { layout: 'lights', lights: 6, car: 6, ped: 0, fill: 'none', lampD: 70 } }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { msg = e.message; }
  K.judge('PR11 a face config without its mode fed to the base build', msg ? [msg] : [], /layout "lights" is not the base fork/, ctl);
  let m11 = ''; try { SPEC._buildWith({ block: en, config: { ...SPEC.difficulty[2], mode: 'colour-light' } }, { locale: 'en' }, { rng: makeRng('x') }); } catch (e) { m11 = e.message; }
  K.judge('PR11b a misspelt face mode', m11 ? [m11] : [], /unknown mode "colour-light"/, ctl);
  // refusal: an unauthored locale / an unset pedLight.stop
  // the probe locale is the first one NO panel has authored yet (de was the probe until its panel applied it)
  const authored = Object.keys(require('../lib/b5-common.js').bankModule('road-safety'));
  const un = ['fi', 'no', 'da', 'sv', 'nl', 'it', 'fr', 'es', 'pt', 'de'].find((l) => !authored.includes(l));
  if (un) {
    let m2 = ''; try { SPEC.build({ difficulty: 2, locale: un }, { rng: makeRng('x') }); } catch (e) { m2 = e.message; }
    K.judge(`PR12 an unauthored locale (${un}) refuses`, m2 ? [m2] : [], new RegExp(`has no ${un} block`), ctl);
  }
  const b13 = clone(en); delete b13.pedLight.stop; let m3 = '';
  try { SPEC._buildWith({ block: b13, config: SPEC.difficulty[2] }, { locale: 'pt' }, { rng: makeRng('x') }); } catch (e) { m3 = e.message; }
  K.judge('PR13 pedLight.stop unset refuses (the pt case)', m3 ? [m3] : [], /pedLight\.stop is undefined — the pt panel must SET it/, ctl);
}

async function main() {
  const quick = process.argv.includes('--quick');
  const mod = require('../lib/b5-common.js').bankModule('road-safety');
  const locs = Object.keys(mod);
  for (const loc of locs) { const f = validateBank(mod[loc], loc); ok(!f.length, `bank ${loc}: ${JSON.stringify(f.slice(0, 5))}`); }
  console.log(`validateBank: ${locs.length} authored block(s) (${locs.join(', ')})`);
  // rule 14 ratchet: each pending reading must STILL overlap (else remove it); report them for the native fixers
  for (const [loc, roles] of Object.entries(MEANING_PENDING)) for (const r of roles) {
    const hit = meaningFindings(mod[loc], loc).filter((m) => m.includes(`meanings.${r} (`));
    ok(hit.length > 0, `rule 14 ratchet: ${loc} ${r} no longer overlaps — remove it from MEANING_PENDING`);
    if (hit.length) console.log(`  rule 14 PENDING (native re-author): ${hit[0]}`);
  }
  {
    const ctl21 = K.control('P21 control: the shipped en meanings', validateBank(mod.en, 'en').filter((x) => /rule 14/.test(x)));
    const b = clone(mod.en); b.meanings.crossing = 'Watch for people crossing the road.';
    const r0 = MEANING_READ.en.crossing; MEANING_READ.en.crossing = [b.meanings.crossing, 'people-cross'];
    const f21 = validateBank(b, 'en');
    MEANING_READ.en.crossing = r0;
    K.judge('P21 en G1-384 crossing meaning "Watch for people crossing the road." (fits school too)', f21, /rule 14: en: meanings.crossing .* also fits the school sign/, ctl21);
    const b2 = clone(mod.en); b2.meanings.school = 'Children walk here on their way to class.';
    K.judge('P22 en school meaning edited without a re-read', validateBank(b2, 'en'), /rule 14: en: meanings.school .* changed since it was read/);
  }
  { const f = validateConfusable(); ok(!f.length, `COMMON.confusable: ${JSON.stringify(f.slice(0, 5))}`); }
  confusablePoisons();
  dataPoisons(mod.en);
  fs.mkdirSync(OUTDIR, { recursive: true });
  const rows = await H.withBrowser(async (page) => {
    const r = await renderGate(page, quick);
    await renderPoisons(page);
    // Phase E: the five faces (sweeps, renders at 814 / 722 / 677, FILL + SPARSE, greyscale, the face poisons)
    r.push(...await require('./b5-road-safety-faces.js').faceGate({ page, K, validateBank, fixture, quick, OUTDIR, bothSatisfy }));
    return r;
  });
  console.log('render:\n  ' + rows.join('\n  '));
  console.log('poisons:\n' + K.log.join('\n'));
  if (K.fails.length) console.log('FAILS:\n  ' + K.fails.slice(0, 40).join('\n  '));
  const pass = !K.fails.length && K.killed === K.total;
  console.log(pass ? `PASS (${K.assertions} assertions, ${K.killed}/${K.total} poisons killed)` : `FAIL (${K.fails.length} findings, ${K.killed}/${K.total} poisons killed)`);
  return pass;
}
if (require.main === module) main().then((p) => process.exit(p ? 0 : 1), (e) => { console.error(e); process.exit(1); });
module.exports = { validateBank, validateConfusable, bothSatisfy, ROLE_SATISFIES, fixture, REG, main };
