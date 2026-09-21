#!/usr/bin/env node
/**
 * verify-b4-pronouns.js — the G1-352 `pronouns` gate (design file
 * docs/worksheet-gen/b4-designs/G1-352-pronouns.md §5; brief deliverable 4).
 *
 *   node scripts/worksheet-gen/qa/verify-b4-pronouns.js [--quick]
 *
 * 1. BANK — every locale block of data/b4/pronouns.js against the §5 validator
 *    rules 1-13 (the `tools/validate-b4-draft.js` pronouns block, folded in here
 *    and exported as `validateBank(block, loc, opts)`; tools/b4-probe-child.js
 *    calls it with (block, loc)):
 *    (1) `people` === the OPENED record below (the 32 portraits the build opened
 *        on its 64 px + 160 px contact sheets: same keys, theme, noun, depicted,
 *        minPx, picOpened:true — an overlay may not add, drop or retag; the
 *        excluded keys are absent; every file exists; no B&W marker; m >= 16 and
 *        f >= 8 at minPx 44); (2) names 12 (fi 16), half f / half m, distinct
 *        (NFD, case-insensitive), no name equals a chip / initial / possessive
 *        literal or the `and` word, `ambiguousInLocale` absent or false; (3)
 *        chips.length === initial.length in {2, 3, 4}; every map value a valid
 *        index; map.base reaches every chip from the locale's reachable key set;
 *        de/nl: map.base + map.sort have no mp/fp/xp and map.replace.xp ===
 *        map.rewrite.xp === the she-index; fi: 2 chips and every pair key -> 1;
 *        de initial Er/Sie + chips er/sie/es; it chips[0..1] in {lui/lei,
 *        egli/ella} + strings.base.note; sv `hen` only in extraChips; (4) frames
 *        >= 12, each sg/pl `{subj}`-first, one slot, no `___`, ends '.', sg !==
 *        pl, no initial/chip token, not a SENTENCES frame, >= 8 satisfy F5's
 *        caps (printed <= 56, answer <= 28) and every one F1's (<= 55) with the
 *        longest names; (5) anaphora >= 8: intro {a}+{b} once, filled <= 42 (fi
 *        33), exactly 2 `s` starting {P} <= 36, key sg|pl (non-fi both sg; fi one
 *        + one), contentNeutral:true, no name / chip literal in a sentence; (6)
 *        possessive null iff refuse.possessive, else chips 3-4 distinct, frame
 *        slots ({subj} ___ {thing} once, {art} iff artTable), filled <= 43,
 *        things >= 12 with a colour picture + a vocab singular, picOpened, >= 4
 *        f and >= 4 m/n where a gender code exists, forms per thing in de/fr/it
 *        (absent elsewhere, byOwner present), de forms.p === null + no frame.pl,
 *        fr no vowel/h-initial f thing, every chip reachable, no chip literal in
 *        the frame; (7) objects iff objectMap: 12 keys with picture + objForms +
 *        a code in objectMap, >= 4 neuter (de) / >= 6 h (nl), picOpened, never a
 *        person noun; (8) `and` non-empty, es andBefore, 6 strings: titles <= 70
 *        without the worksheet word, distinct, no verb-forms / articles /
 *        word-classes name of the locale, instructions <= 120, the replace
 *        instruction (only) carries bankWord, no visible string claims "free" or
 *        promises answers; (9) refuse.possessive === true for es + fi; (10) EN:
 *        strings.base === the spec's i18n.en; (11) the taxonomy slug of the
 *        locale equals table B (slug.en === key, the taxonomy invariant) and
 *        collides with no other axis slug; (12) resolveBase(d2) does not throw
 *        (mixFloor reachable by pairMix) and F2 names needed (10, fi 15) <=
 *        names.length; (13) fi: the base + F1 titles <= 3 lines at the shell
 *        width (opts.titleLines(title) -> lines; measured by this gate, skipped
 *        when no measurer is passed).
 *    The gate MAY read the vocab / taxonomy / SENTENCES; the spec never does.
 * 2. RENDER — through the REAL pipeline (render/render-instance.js, file://
 *    fonts): d1 / d2 en at the default chrome, d2 under the README 722 chrome
 *    (a 3-line title + a 3-line instruction), d3 under the 722 chrome (the
 *    design's UNPUBLISHED level: its ONLY failure must be the stage overflow),
 *    and d2 under a 4-line title (677: the base must FAIL — PR8, why rule 13
 *    exists). Asserts verify() empty, qa/lints.js clean, the G1 floors ITSELF
 *    (every portrait >= 44 AND >= its key's minPx, every chip >= 44 high, plate
 *    text >= 16, cards === config), the base stage overflow 0, every card above
 *    the footer, and the NODE cross-check: keyOf(refs) from the OPENED tags ===
 *    every stamped key, map.base[key] === every stamped chip index, the name
 *    tags equal the portrait tags, the plate is the names joined and NEVER an
 *    occupation noun (any locale's singular / plural of the pinned key, NFD,
 *    case-insensitive), no src / name twice.
 *    Plus a COMPONENT smoke: the six face components (nameGapRow, initialBank,
 *    anaphoraBlock, ownerLane, nameCardBins, rewriteLane) rendered through the
 *    pipeline in a throwaway type — lints clean + the design's row heights
 *    (74 / 116 / 83 / 218 / 77.4 est.) measured and printed for the faces.
 * 3. SWEEP — 20 seeds × d1 / d2 (build only): every chip >= mixFloor, no name
 *    or portrait twice, keys re-derived, >= 2 distinct card sets AND >= 2
 *    distinct card orders (skipped by --quick).
 * 4. POISON — each must FAIL for its OWN reason (a fail with no matching
 *    message = WRONG REASON; no fail = SILENT; either exits 1). The correct EN
 *    bank / render is the control. Design §5:
 *      P1  nurse retagged m (an overlay / the en block)   → rule 1
 *      P2  actor in people · picOpened absent · theme 'toys bw' → rule 1
 *      P3  7 f + 5 m names                                → rule 2
 *      P4  de map.base.xp:1 (synthetic de block)          → rule 3
 *      P5  sg === pl                                      → rule 4
 *      P6  "{subj} and they read."                        → rule 4
 *      P7  a non-fi anaphora key 'pl' / contentNeutral absent → rule 5
 *      P8  an es block carrying possessive (and one without the refusal) → rule 6 / 9
 *      P9  de forms.p:2 · fr thing amie · a de frame.pl (synthetic) → rule 6
 *      P10 an en block with objects · de objects with 2 neuter · nl objects with girl → rule 7
 *      P11 fi title "Persoonamuodot" · a base instruction with the bank word · sv chips with hen → rule 8 / 3
 *      P12 fr base config pairs:3 (elles once)            → rule 12 (resolveBase refuses)
 *      P13 fi names of 12                                 → rule 12 (F2 needs 15)
 *      P14 a fi base title measured at 4 lines            → rule 13
 *    Render poisons (the validator bypassed):
 *      PR1  Mia tagged m in the bank → the composer pairs "Mia" with a farmer → node cross-check
 *      PL   a card's stamped key edited (m1 → f1)          → node cross-check + verify()
 *      PR6  the chips reordered on one card               → verify() position leak
 *      PR7  the cards at .ws-card's default padding       → verify() stage overflow (at 722)
 *      PR8  the base under a 4-line title                 → footer lint (rule 13's reason)
 *      PR10 a plate "teacher" (the occupation noun)       → node cross-check
 *      PR12 a portrait src twice on one page              → verify()
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const puppeteer = require('puppeteer');
const { renderInstance } = require('../render/render-instance.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const { bankModule } = require('../lib/b4-common.js');
const { fileUri, vocab } = require('../lib/b2-common.js');
const { SENTENCES } = require('../data/b2/sentences.js');
const freeClaim = require('../../lib/free-claim.js');
const C4 = require('../templates/components-b4.js');

const TYPE = require('../types/g1/G1-352-pronouns.js');
const QUICK = process.argv.includes('--quick');
const OUT = path.join(__dirname, '..', 'out', 'dev');
const TAXONOMY = path.join(__dirname, '..', '..', '..', 'frontend', 'config', 'topics-taxonomy.json');
const BW_MARKER = /(^|[\s_])(BW|SW|BN|NB|ZW|SH|PB|MV|SV)$/i;
const FLOOR = 44;                                   // the G1 element floor
const WORKSHEET_WORD = /worksheet|arbeitsblatt|ficha|fiche|scheda|werkblad|arbetsblad|arbejdsark|arbeidsark|tehtävä|tehtäväpaperi/i;
const ANSWERS_WORD = /with answers|answer key|mit lösungen|con respuestas|com respostas|avec corrigé|con soluzioni|met antwoorden|med facit|med facitliste|med fasit|vastauksineen/i;
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TABLE_B = { en: 'pronouns', de: 'personalpronomen', es: 'pronombres-personales', pt: 'pronomes-pessoais-do-caso-reto', fr: 'pronoms-personnels-sujets', it: 'pronomi-personali-soggetto', nl: 'hij-zij-of-het', sv: 'pronomen-han-hon-eller-de', da: 'personlige-stedord', no: 'personlige-pronomen', fi: 'han-vai-he' };
// design §1 table B says en `personal-pronouns`; the taxonomy invariant (slug.en === key, CLAUDE.md §17.8.5) and the
// Phase 0.1 registration (07777114) rule `pronouns` — the DECK slug of the spec stays `personal-pronouns`.
const EXCLUDED = ['actor', 'firefighter', 'paramedic', 'veterinarian', 'baby', 'baby_girl', 'artist', 'astronaut', 'cook', 'mechanic', 'pilot', 'crossing_guard', 'crossing_guard_2', 'office_worker', 'delivery_driver', 'mail_carrier', 'sanitation_worker', 'park_ranger', 'doctor_2', 'bus_driver_2', 'truck_driver'];
const PERSON_NOUNS = ['girl', 'boy', 'baby', 'baby_girl', 'child', 'kid', 'student', 'teacher', 'man', 'woman', 'mother', 'father', 'grandmother', 'grandfather', 'brother', 'sister', 'friend', 'nurse', 'doctor', 'librarian'];

/**
 * The portraits OPENED 2026-09-21 (contact sheets G1-352-portraits-64.png + -160.png in the build scratchpad; every
 * candidate of the design's §2 pool read at 64 AND 160 px) and the sex each honestly shows. A `people` entry outside
 * this record FAILS — the human open is the gate. Refused (opened by the design + editor, wrong): actor (a stage scene),
 * firefighter (visor), paramedic (a child in a helmet), veterinarian (kneels behind a cat), baby_girl (a toddler).
 */
const OPENED = {
  architect: ['occupations', 'm', 44], author: ['occupations', 'm', 44], barber: ['occupations', 'm', 44], baker: ['occupations', 'm', 44],
  detective: ['occupations', 'm', 44], doctor: ['occupations', 'm', 44], judge: ['occupations', 'm', 44], musician: ['occupations', 'm', 44],
  pharmacist: ['occupations', 'm', 44], photographer: ['occupations', 'm', 44], singer: ['occupations', 'm', 44], police_officer: ['occupations', 'm', 44],
  coach: ['occupations', 'm', 44], farmer: ['occupations', 'm', 44], janitor: ['occupations', 'm', 44], student: ['classroom', 'm', 44],
  carpenter: ['occupations', 'm', 56], chef: ['occupations', 'm', 56], gardener: ['occupations', 'm', 56], construction_worker: ['occupations', 'm', 56],
  librarian: ['occupations', 'f', 44], teacher: ['occupations', 'f', 44], waitress: ['occupations', 'f', 44], flight_attendant: ['occupations', 'f', 44],
  mail_carrier_2: ['occupations', 'f', 44], athlete: ['occupations', 'f', 44], ballerina: ['occupations', 'f', 44], girl: ['toys', 'f', 44],
  cashier: ['occupations', 'f', 56], florist: ['occupations', 'f', 56], nurse: ['occupations', 'f', 56], tailor: ['occupations', 'f', 56],
};

let fails = 0, asserts = 0;
function ok(cond, msg) { asserts++; if (!cond) { fails++; console.log('  FAIL ' + msg); } }
function fold(s) { return String(s || '').trim().toLocaleLowerCase(); }
function nfd(s) { return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function hasWord(text, word) {
  const w = String(word).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu').test(String(text));
}
function fileExists(theme, noun) { try { return fs.existsSync(url.fileURLToPath(fileUri(theme, noun))); } catch (e) { return false; } }
function clone(o) { return JSON.parse(JSON.stringify(o)); }
function longestNames(block, gender, n) {
  return block.names.filter((x) => !gender || x.gender === gender).map((x) => x.name).sort((a, b) => [...b].length - [...a].length).slice(0, n);
}

/* ------------------------------------------------------------------ 1. the bank validator ------------------------------------------------------------------ */

/**
 * validateBank(block, loc, opts) -> string[] of failures (empty = clean). opts.titleLines(title) -> lines (rule 13);
 * opts.en = the EN block (defaults to the module's). Pure node; reads vocab / taxonomy / SENTENCES / objForms.
 */
function validateBank(block, loc, opts = {}) {
  const out = [];
  const push = (m) => out.push(m);
  const en = opts.en || bankModule('pronouns').en;
  const isFi = loc === 'fi', isObj = !!block.objectMap;
  if (!block || typeof block !== 'object') return ['no block'];

  // rule 1 — people === OPENED
  const people = Array.isArray(block.people) ? block.people : [];
  const keys = people.map((p) => p.key);
  if (people.length !== Object.keys(OPENED).length) push(`rule 1: ${people.length} people, the OPENED record has ${Object.keys(OPENED).length}`);
  if (new Set(keys).size !== keys.length) push('rule 1: a person key twice');
  for (const p of people) {
    const rec = OPENED[p.key];
    if (!rec) { push(`rule 1: "${p.key}" is not an OPENED portrait${EXCLUDED.includes(p.key) ? ' (EXCLUDED by the design)' : ''}`); continue; }
    if (!p.pic || p.pic.theme !== rec[0] || p.pic.noun !== p.key) push(`rule 1: "${p.key}" pins ${p.pic && p.pic.theme}/${p.pic && p.pic.noun}, opened as ${rec[0]}/${p.key}`);
    if (p.depicted !== rec[1]) push(`rule 1: "${p.key}" tagged ${p.depicted}, opened as ${rec[1]} (retag)`);
    if (p.minPx !== rec[2]) push(`rule 1: "${p.key}" minPx ${p.minPx}, opened at ${rec[2]}`);
    if (p.picOpened !== true) push(`rule 1: "${p.key}" picOpened is not true`);
    if (p.pic && BW_MARKER.test(p.pic.theme)) push(`rule 1: "${p.key}" pins a B&W theme "${p.pic.theme}"`);
    if (p.pic && !fileExists(p.pic.theme, p.pic.noun)) push(`rule 1: "${p.key}" picture ${p.pic.theme}/${p.pic.noun} does not exist`);
  }
  for (const k of Object.keys(OPENED)) if (!keys.includes(k)) push(`rule 1: OPENED portrait "${k}" dropped`);
  for (const k of EXCLUDED) if (keys.includes(k)) push(`rule 1: excluded key "${k}" present`);
  const m44 = people.filter((p) => p.depicted === 'm' && p.minPx === 44).length, f44 = people.filter((p) => p.depicted === 'f' && p.minPx === 44).length;
  if (m44 < 16 || f44 < 8) push(`rule 1: m ${m44} / f ${f44} at minPx 44 (want >= 16 / >= 8)`);
  if (loc !== 'en' && JSON.stringify(people) !== JSON.stringify(en.people)) push('rule 1: the overlay people[] differs from the EN block');

  // rule 2 — names
  const names = Array.isArray(block.names) ? block.names : [];
  const wantN = isFi ? 16 : 12;
  if (names.length !== wantN) push(`rule 2: ${names.length} names, want ${wantN}`);
  const nf = names.filter((n) => n.gender === 'f').length, nm = names.filter((n) => n.gender === 'm').length;
  if (nf !== nm || nf + nm !== names.length) push(`rule 2: ${nf} f / ${nm} m names (want half / half, every one tagged m|f)`);
  if (new Set(names.map((n) => nfd(n.name))).size !== names.length) push('rule 2: a name twice (NFD, case-insensitive)');
  const literals = [...(block.chips || []), ...(block.initial || []), ...((block.possessive && block.possessive.chips) || []), block.and].filter(Boolean).map(nfd);
  for (const n of names) { if (!n.name || !/^\p{Lu}/u.test(n.name)) push(`rule 2: name "${n.name}" is empty or not capitalised`); if (literals.includes(nfd(n.name))) push(`rule 2: name "${n.name}" equals a chip / initial / possessive / and literal`); if (n.ambiguousInLocale) push(`rule 2: name "${n.name}" is ambiguousInLocale`); }

  // rule 3 — chips + map
  const chips = block.chips || [], initial = block.initial || [];
  if (chips.length !== initial.length || ![2, 3, 4].includes(chips.length)) push(`rule 3: chips ${chips.length} / initial ${initial.length} (equal, in {2, 3, 4})`);
  if (new Set(chips.map(fold)).size !== chips.length) push('rule 3: a chip twice');
  chips.forEach((c, i) => { if (fold(initial[i]) !== fold(c)) push(`rule 3: initial[${i}] "${initial[i]}" is not chip "${c}" capitalised`); });
  const faces = ['base', 'replace', 'anaphora', 'sort', 'rewrite'];
  const map = block.map || {};
  for (const f of faces) {
    if (!map[f]) { push(`rule 3: map.${f} missing`); continue; }
    for (const [k, v] of Object.entries(map[f])) if (!Number.isInteger(v) || v < 0 || v >= chips.length) push(`rule 3: map.${f}.${k} = ${v} is not a chip index`);
  }
  const reachable = new Set();
  const personKeys = chips.length === 2 ? ['m1', 'f1', 'p'] : ['m1', 'f1', 'mp', 'fp', 'xp'];
  if (map.base) for (const k of personKeys) if (Number.isInteger(map.base[k])) reachable.add(map.base[k]);
  if (isObj) for (const v of Object.values(block.objectMap)) reachable.add(v);
  for (let i = 0; i < chips.length; i++) if (!reachable.has(i)) push(`rule 3: chip "${chips[i]}" is reached by no key on the base`);
  if (map.base && (!Number.isInteger(map.base.m1) || !Number.isInteger(map.base.f1))) push('rule 3: map.base lacks m1 / f1');
  if (isObj) {
    for (const f of ['base', 'sort']) for (const k of ['mp', 'fp', 'xp']) if (map[f] && k in map[f]) push(`rule 3: ${loc} map.${f}.${k} present (sie/zij = she AND they: pairs never reach a chip on ${f})`);
    const she = map.base && map.base.f1;
    if (!map.replace || map.replace.xp !== she || !map.rewrite || map.rewrite.xp !== she) push(`rule 3: ${loc} map.replace.xp / map.rewrite.xp must be the she-index ${she}`);
  }
  if (chips.length === 2) { if (!map.base || map.base.p !== 1 || 'mp' in map.base) push('rule 3: a 2-chip locale maps every pair key -> 1 (p:1)'); }
  if (loc === 'de' && (initial.join('|') !== 'Er|Sie' && initial.join('|') !== 'Er|Sie|Es' || chips.join('|') !== 'er|sie|es')) push('rule 3: de initial must be Er/Sie(/Es) and chips er/sie/es');
  if (loc === 'it') { const pair = chips.slice(0, 2).join('|'); if (!['lui|lei', 'egli|ella'].includes(pair)) push(`rule 3: it chips[0..1] "${pair}" not lui/lei or egli/ella`); if (!(block.strings && block.strings.base && block.strings.base.note)) push('rule 3: it strings.base.note must record the lui/lei vs egli/ella choice'); }
  if (loc === 'sv' && chips.map(fold).includes('hen')) push('rule 3: sv "hen" may live in extraChips only, never in chips');
  if (block.extraChips && loc !== 'sv') push('rule 3: extraChips is an sv-only field');

  // rule 4 — frames
  const frames = Array.isArray(block.frames) ? block.frames : [];
  if (frames.length < 12) push(`rule 4: ${frames.length} frames < 12`);
  const tokenLits = [...chips, ...initial].map(fold);
  const sentFrames = (SENTENCES[loc] && SENTENCES[loc].frames || []).map((f) => nfd(f.text.replace(/\{[a-z]+\}/g, '')).replace(/\s+/g, ' ').trim());
  const longest2 = longestNames(block, null, 2);
  const longestPair = TYPE.fillSubject('{subj}', longest2, block.and, block.andBefore);
  let f5ok = 0;
  const fids = new Set();
  for (const f of frames) {
    if (fids.has(f.id)) push(`rule 4: frame id ${f.id} twice`);
    fids.add(f.id);
    for (const k of ['sg', 'pl']) {
      const t = f[k];
      if (typeof t !== 'string' || !t.startsWith('{subj}')) { push(`rule 4: frame ${f.id}.${k} does not start with {subj} ("${t}")`); continue; }
      if ((t.match(/\{subj\}/g) || []).length !== 1 || /\{(?!subj\})[a-zA-Z]+\}/.test(t) || t.includes('___') || !t.endsWith('.')) push(`rule 4: frame ${f.id}.${k} slots / ___ / end mark ("${t}")`);
      const toks = fold(t.replace('{subj}', '')).split(/[^\p{L}']+/u).filter(Boolean);
      for (const lit of tokenLits) if (toks.includes(lit)) push(`rule 4: frame ${f.id}.${k} carries the pronoun "${lit}" as a token`);
      const body = nfd(t.replace('{subj}', '')).replace(/\s+/g, ' ').trim();
      if (sentFrames.includes(body)) push(`rule 4: frame ${f.id}.${k} equals a SENTENCES frame`);
    }
    if (f.sg === f.pl) push(`rule 4: frame ${f.id} sg === pl (the number is unproven)`);
    if (typeof f.sg === 'string' && typeof f.pl === 'string' && f.sg.startsWith('{subj}') && f.pl.startsWith('{subj}')) {
      const printedPl = TYPE.fillSubject(f.pl, longest2, block.and, block.andBefore);
      const answerPl = f.pl.replace('{subj}', initial[initial.length - 1] || '');
      if ([...printedPl].length <= 56 && [...answerPl].length <= 28) f5ok++;
      if ([...printedPl].length > 55) push(`rule 4: frame ${f.id} filled with "${longestPair}" is ${[...printedPl].length} > 55 (F1)`);
    }
  }
  if (frames.length && f5ok < 8) push(`rule 4: only ${f5ok} frames satisfy F5 (printed <= 56, answer <= 28) — want >= 8`);

  // rule 5 — anaphora
  const ana = Array.isArray(block.anaphora) ? block.anaphora : [];
  if (ana.length < 8) push(`rule 5: ${ana.length} anaphora frames < 8`);
  const introMax = isFi ? 33 : 42;
  const longestF = longestNames(block, 'f', 1)[0] || '', longestM = longestNames(block, 'm', 1)[0] || '';
  for (const a of ana) {
    const intro = String(a.intro || '');
    if ((intro.match(/\{a\}/g) || []).length !== 1 || (intro.match(/\{b\}/g) || []).length !== 1) push(`rule 5: anaphora ${a.id} intro lacks {a} / {b} once`);
    const bFill = isFi ? TYPE.fillSubject('{subj}', longestNames(block, null, 2), block.and, block.andBefore) : longestM;
    const filled = intro.replace('{a}', longestF).replace('{b}', bFill);
    if ([...filled].length > introMax) push(`rule 5: anaphora ${a.id} intro filled is ${[...filled].length} > ${introMax}`);
    if (!Array.isArray(a.s) || a.s.length !== 2) { push(`rule 5: anaphora ${a.id} needs exactly 2 sentences`); continue; }
    const longestInit = initial.slice().sort((x, y) => [...y].length - [...x].length)[0] || '';
    for (const s of a.s) {
      if (!String(s.text).startsWith('{P}')) push(`rule 5: anaphora ${a.id} sentence "${s.text}" does not start with {P}`);
      if ([...String(s.text).replace('{P}', longestInit)].length > 36) push(`rule 5: anaphora ${a.id} sentence "${s.text}" > 36 chars`);
      if (!['sg', 'pl'].includes(s.key)) push(`rule 5: anaphora ${a.id} key "${s.key}"`);
      for (const n of names) if (hasWord(s.text, n.name)) push(`rule 5: anaphora ${a.id} sentence carries the name "${n.name}"`);
      for (const lit of [...chips, ...initial]) if (hasWord(String(s.text).replace('{P}', ''), lit)) push(`rule 5: anaphora ${a.id} sentence carries the pronoun "${lit}"`);
    }
    const keysS = a.s.map((s) => s.key).sort().join('|');
    if (!isFi && keysS !== 'sg|sg') push(`rule 5: anaphora ${a.id} keys ${keysS} (non-fi: both sg)`);
    if (isFi && keysS !== 'pl|sg') push(`rule 5: anaphora ${a.id} keys ${keysS} (fi: one sg + one pl)`);
    if (a.contentNeutral !== true) push(`rule 5: anaphora ${a.id} contentNeutral is not signed true`);
  }

  // rule 6 + 9 — possessive / the refusal
  const refuse = !!(block.refuse && block.refuse.possessive);
  if (['es', 'fi'].includes(loc) && !refuse) push(`rule 9: ${loc} must record refuse.possessive:true`);
  if (refuse && block.possessive) push(`rule 6: ${loc} refuses the possessive but carries a possessive block`);
  if (!refuse && !block.possessive) push('rule 6: possessive block missing (and not refused)');
  const P = block.possessive;
  if (P && !refuse) {
    const pc = P.chips || [];
    if (pc.length < 3 || pc.length > 4 || new Set(pc.map(fold)).size !== pc.length) push(`rule 6: possessive chips ${pc.length} (3-4, distinct)`);
    const fr = P.frame || {};
    const needsPl = loc !== 'de';
    for (const k of needsPl ? ['sg', 'pl'] : ['sg']) {
      const t = String(fr[k] || '');
      if (!t) { push(`rule 6: possessive frame.${k} missing`); continue; }
      if ((t.match(/\{subj\}/g) || []).length !== 1 || (t.match(/___/g) || []).length !== 1 || (t.match(/\{thing\}/g) || []).length !== 1) push(`rule 6: possessive frame.${k} slots ("${t}")`);
      if (((t.match(/\{art\}/g) || []).length === 1) !== !!P.artTable) push(`rule 6: possessive frame.${k} {art} iff artTable`);
      const filledN = k === 'pl' ? longestPair : longestNames(block, null, 1)[0];
      const longestThing = (P.things || []).map((x) => x.key).sort((a, b) => b.length - a.length)[0] || '';
      const filled = t.replace('{subj}', filledN).replace('{thing}', longestThing).replace('{art}', P.artTable ? Object.values(P.artTable).sort((a, b) => b.length - a.length)[0] : '');
      if ([...filled].length > 43) push(`rule 6: possessive frame.${k} filled "${filled}" is ${[...filled].length} > 43`);
      for (const c of pc) if (hasWord(t, c)) push(`rule 6: possessive frame.${k} carries the chip "${c}"`);
    }
    if (loc === 'de' && fr.pl) push('rule 6: de possessive frame.pl must be absent (sg only)');
    const things = P.things || [];
    if (things.length < 12) push(`rule 6: ${things.length} things < 12`);
    const V = vocab();
    const genders = { f: 0, mn: 0 };
    const formsLoc = ['de', 'fr', 'it'].includes(loc);
    const reach = new Set();
    for (const th of things) {
      if (!th.pic || !fileExists(th.pic.theme, th.pic.noun)) push(`rule 6: thing "${th.key}" picture missing`);
      if (th.pic && BW_MARKER.test(th.pic.theme)) push(`rule 6: thing "${th.key}" pins a B&W theme`);
      if (th.picOpened !== true) push(`rule 6: thing "${th.key}" picOpened is not true`);
      const e = V[th.key] && V[th.key][loc];
      if (!e || !e[0]) push(`rule 6: thing "${th.key}" has no ${loc} vocab singular`);
      const code = e && e[2];
      if (code) { if (['f', 'd'].includes(code) && loc !== 'nl') genders.f++; else genders.mn++; }
      if (formsLoc) {
        if (!th.forms || typeof th.forms !== 'object') push(`rule 6: thing "${th.key}" needs forms {m1, f1, p} in ${loc}`);
        else { for (const [k, v] of Object.entries(th.forms)) { if (v !== null && (!Number.isInteger(v) || v < 0 || v >= pc.length)) push(`rule 6: thing "${th.key}" forms.${k} = ${v}`); else if (v !== null) reach.add(v); } if (loc === 'de' && th.forms.p !== null) push(`rule 6: de thing "${th.key}" forms.p must be null (no pair owners)`); }
        if (loc === 'fr' && code === 'f' && e && /^[aeiouyhàâéèêëîïôûüœ]/i.test(nfd(e[0]))) push(`rule 6: fr f thing "${th.key}" ("${e[0]}") is vowel / h-initial (son amie) — refused`);
      } else {
        if (th.forms) push(`rule 6: thing "${th.key}" carries forms outside de/fr/it`);
        if (!P.byOwner) push('rule 6: byOwner missing (forms:null locale)');
      }
    }
    if (!formsLoc && P.byOwner) for (const v of Object.values(P.byOwner)) if (Number.isInteger(v)) reach.add(v);
    for (let i = 0; i < pc.length; i++) if (!reach.has(i)) push(`rule 6: possessive chip "${pc[i]}" is reached by no (owner, thing)`);
    const hasCode = things.some((th) => V[th.key] && V[th.key][loc] && V[th.key][loc][2]);
    if (hasCode && (genders.f < 4 || genders.mn < 4)) push(`rule 6: things f ${genders.f} / m-n ${genders.mn} (want >= 4 each)`);
  }

  // rule 7 — objects iff objectMap
  const objects = Array.isArray(block.objects) ? block.objects : [];
  if (!isObj && objects.length) push('rule 7: objects present without an objectMap');
  if (isObj) {
    if (objects.length !== 12) push(`rule 7: ${objects.length} objects, want 12`);
    let objForms = {};
    try { objForms = require('../lib/b3-common.js').bank('instructions', loc).objForms || {}; } catch (e) { push('rule 7: no instructions bank for ' + loc); }
    const V = vocab();
    let neuter = 0;
    const neuterCode = Object.entries(block.objectMap).sort((a, b) => b[1] - a[1])[0][0];
    for (const o of objects) {
      if (!o.pic || !fileExists(o.pic.theme, o.pic.noun)) push(`rule 7: object "${o.key}" picture missing`);
      if (o.picOpened !== true) push(`rule 7: object "${o.key}" picOpened is not true`);
      if (!objForms[o.key]) push(`rule 7: object "${o.key}" has no objForms entry in ${loc}`);
      const code = V[o.key] && V[o.key][loc] && V[o.key][loc][2];
      if (!code || !(code in block.objectMap)) push(`rule 7: object "${o.key}" gender code "${code}" is not in objectMap`);
      if (code === neuterCode) neuter++;
      if (keys.includes(o.key) || PERSON_NOUNS.includes(o.key)) push(`rule 7: object "${o.key}" is a person noun`);
    }
    const wantNeuter = loc === 'nl' ? 6 : 4;
    if (neuter < wantNeuter) push(`rule 7: ${neuter} neuter objects < ${wantNeuter}`);
  }

  // rule 8 — and, andBefore, strings
  if (typeof block.and !== 'string' || !block.and.trim()) push('rule 8: and literal missing');
  if (loc === 'es' && !block.andBefore) push('rule 8: es needs andBefore');
  const S = block.strings || {};
  let forbidden = [];
  try {
    const tax = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
    forbidden = ['verb-forms', 'articles', 'word-classes'].map((k) => tax.axes['exercise-type'][k] && tax.axes['exercise-type'][k].name && tax.axes['exercise-type'][k].name[loc]).filter(Boolean);
  } catch (e) { push('rule 8: taxonomy unreadable'); }
  const titles = [];
  for (const f of ['base', 'replace', 'anaphora', 'possessive', 'sort', 'rewrite']) {
    const s = S[f];
    if (f === 'possessive' && refuse) { if (s) push('rule 8: strings.possessive present on a refusing locale'); continue; }
    if (!s || !s.title || !s.instruction) { push(`rule 8: strings.${f} missing title / instruction`); continue; }
    titles.push(s.title);
    if ([...s.title].length > 70) push(`rule 8: ${f} title ${[...s.title].length} > 70`);
    if (WORKSHEET_WORD.test(s.title)) push(`rule 8: ${f} title carries the worksheet word`);
    for (const fb of forbidden) { const toks = fold(fb).split(/[^\p{L}]+/u).filter((t) => t.length >= 6); if (fold(s.title).includes(fold(fb)) || toks.some((t) => hasWord(s.title, t))) push(`rule 8: ${f} title "${s.title}" contains the sibling family name "${fb}"`); }
    if ([...s.instruction].length > 120) push(`rule 8: ${f} instruction ${[...s.instruction].length} > 120`);
    const bw = S.replace && S.replace.bankWord;
    if (bw) { const has = hasWord(s.instruction, bw); if (f === 'replace' && !has) push('rule 8: the replace instruction lacks its bankWord'); if (f !== 'replace' && has) push(`rule 8: the ${f} instruction carries the bank word "${bw}"`); }
    for (const t of [s.title, s.instruction]) { if (freeClaim.hit(t)) push(`rule 8: ${f} string claims free ("${t}")`); if (ANSWERS_WORD.test(t)) push(`rule 8: ${f} string promises answers ("${t}")`); }
  }
  if (S.replace && !S.replace.bankWord) push('rule 8: strings.replace.bankWord missing');
  if (new Set(titles.map(fold)).size !== titles.length) push('rule 8: two faces share a title');

  // rule 10 — EN: strings.base === the spec's i18n.en
  if (loc === 'en' && S.base && (S.base.title !== TYPE.i18n.en.title || S.base.instruction !== TYPE.i18n.en.instruction)) push('rule 10: en strings.base != the spec i18n.en');

  // rule 11 — the taxonomy slug
  try {
    const tax = JSON.parse(fs.readFileSync(TAXONOMY, 'utf8'));
    const mine = tax.axes['exercise-type'].pronouns && tax.axes['exercise-type'].pronouns.slug && tax.axes['exercise-type'].pronouns.slug[loc];
    if (!mine) push(`rule 11: axes['exercise-type'].pronouns.slug.${loc} is not registered`);
    else {
      if (mine !== TABLE_B[loc]) push(`rule 11: slug.${loc} "${mine}" != table B "${TABLE_B[loc]}"`);
      for (const [axis, entries] of Object.entries(tax.axes)) for (const [k, e] of Object.entries(entries)) if (k !== 'pronouns' && e.slug && e.slug[loc] === mine) push(`rule 11: slug.${loc} "${mine}" collides with ${axis}.${k}`);
    }
  } catch (e) { push('rule 11: taxonomy unreadable'); }

  // rule 12 — the d2 config reaches mixFloor; F2 names
  try { TYPE.resolveBase(TYPE.difficulty[2], block); } catch (e) { push('rule 12: ' + e.message); }
  const f2need = isFi ? 15 : 10;
  if (names.length < f2need) push(`rule 12: F2 needs ${f2need} names, the block has ${names.length}`);

  // rule 13 — fi titles <= 3 lines (measured by the caller)
  if (isFi && typeof opts.titleLines === 'function') {
    for (const f of ['base', 'replace']) { const t = S[f] && S[f].title; if (t) { const n = opts.titleLines(t); if (n > 3) push(`rule 13: fi ${f} title wraps to ${n} lines (the 677 stack: base 722 / F1 704 do not fit)`); } }
  }
  return out;
}

/* ------------------------------------------------------------------ 2. render helpers ------------------------------------------------------------------ */

async function renderWith(page, type, { difficulty = 2, baseName, strings, locale = 'en' }) {
  const out = await renderInstance({ type, theme: null, difficulty, locale, page, outDir: OUT, baseName, strings });
  const m = await page.evaluate(() => {
    const r = (el) => el.getBoundingClientRect();
    const body = document.querySelector('.ws-body');
    const foot = document.querySelector('.ws-foot');
    const title = document.querySelector('.ws-title');
    const cards = [...document.querySelectorAll('.ws-card')].map((c) => ({ h: r(c).height, bottom: r(c).bottom, inner: c.clientHeight - 2 * parseFloat(getComputedStyle(c).paddingTop) }));
    const items = [...document.querySelectorAll('[data-lcs-item]')].map((it) => ({
      key: it.dataset.lcsKey, refs: (it.dataset.lcsRefs || '').split(',').filter(Boolean), names: (it.dataset.lcsNames || '').split('|').filter(Boolean),
      chipKey: +it.dataset.lcsChipKey, plate: (it.querySelector('[data-lcs-plate]') || {}).textContent || '',
      plateFont: it.querySelector('[data-lcs-plate]') ? parseFloat(getComputedStyle(it.querySelector('[data-lcs-plate]')).fontSize) : 0,
      content: it.children.length ? it.children[it.children.length - 1].getBoundingClientRect().bottom - it.children[0].getBoundingClientRect().top : 0,
      pics: [...it.querySelectorAll('img[data-lcs-pic]')].map((i) => ({ key: i.dataset.lcsPic, src: i.src, w: r(i).width })),
      chips: [...it.querySelectorAll('[data-lcs-chip]')].map((c) => ({ label: c.dataset.lcsLabel, correct: !!c.dataset.lcsCorrect, h: r(c).height })),
      overflow: it.scrollHeight - it.clientHeight, stage: it.scrollHeight, inner: it.clientHeight,
    }));
    let lowest = 0;
    document.querySelectorAll('.ws-body *').forEach((el) => { const b = r(el); if (b.width && b.height && b.bottom > lowest) lowest = b.bottom; });
    return { body: { h: r(body).height, top: r(body).top }, foot: r(foot).top, titleH: r(title).height, cards, items, lowest,
      lines: Math.round(r(title).height / (30 * 1.1)) };
  });
  return { ...out, verify: out.qa.verify, lints: out.qa.lints, m };
}

/** The node cross-check over the rendered stamps: keys / chips / tags / plates / uniqueness re-derived from the bank + OPENED. */
function crossCheck(items, bank, cfgPx) {
  const out = [];
  const byKey = new Map(bank.people.map((p) => [p.key, p]));
  const nameG = new Map(bank.names.map((n) => [nfd(n.name), n.gender]));
  const V = vocab();
  const nounForms = (key) => { const v = V[key]; if (!v) return []; return Object.values(v).flatMap((e) => (Array.isArray(e) ? e.slice(0, 2) : [])).filter((x) => typeof x === 'string').map(nfd); };
  const srcs = new Set(), names = new Set();
  items.forEach((it, i) => {
    const L = `card ${i + 1}`;
    const isObj = /^obj:/.test(it.key);
    if (isObj) {
      const code = it.key.slice(4);
      if (!bank.objectMap || bank.objectMap[code] !== it.chipKey) out.push(`${L}: object chip ${it.chipKey} != objectMap.${code}`);
      return;
    }
    const refs = it.refs.map((k, j) => { const p = byKey.get(k); if (!p) { out.push(`${L}: portrait "${k}" is not in the bank`); return null; } const rec = OPENED[k]; if (!rec) out.push(`${L}: portrait "${k}" was never OPENED`); return { key: k, depicted: rec ? rec[1] : p.depicted, name: it.names[j], nameGender: nameG.get(nfd(it.names[j])) }; }).filter(Boolean);
    if (refs.length !== it.refs.length) return;
    let key;
    try { key = TYPE.keyOf(refs, bank); } catch (e) { out.push(`${L}: ${e.message}`); return; }
    if (key !== it.key) out.push(`${L}: stamped key ${it.key}, re-derived ${key}`);
    const chip = TYPE.answerChip(bank, 'base', key);
    if (chip !== it.chipKey) out.push(`${L}: stamped chip ${it.chipKey}, map.base.${key} = ${chip}`);
    const correctIdx = it.chips.findIndex((c) => c.correct);
    if (correctIdx !== it.chipKey) out.push(`${L}: the DOM's correct chip ${correctIdx} != ${it.chipKey}`);
    if (it.chips.map((c) => c.label).join('|') !== bank.chips.join('|')) out.push(`${L}: chips ${it.chips.map((c) => c.label).join('|')} != the canonical ${bank.chips.join('|')}`);
    // the plate = the names joined; never an occupation noun; never a chip
    const want = it.names.length === 2 ? TYPE.fillSubject('{subj}', it.names, bank.and, bank.andBefore) : it.names[0];
    if (it.plate.trim() !== want) out.push(`${L}: plate "${it.plate.trim()}" != "${want}"`);
    for (const r of refs) for (const nn of nounForms(r.key)) if (nn && it.plate.trim().split(/\s+/).map(nfd).includes(nn)) out.push(`${L}: plate "${it.plate.trim()}" prints the occupation noun of "${r.key}"`);
    for (const n of it.names) { if (!nameG.has(nfd(n))) out.push(`${L}: name "${n}" is not in the bank`); if (names.has(nfd(n))) out.push(`${L}: name "${n}" twice`); names.add(nfd(n)); }
    // portraits: >= 44 and >= minPx
    it.pics.forEach((p) => {
      const rec = OPENED[p.key];
      if (p.w < FLOOR - 0.6) out.push(`${L}: portrait "${p.key}" ${p.w.toFixed(1)} px < ${FLOOR}`);
      if (rec && p.w < rec[2] - 0.6) out.push(`${L}: portrait "${p.key}" ${p.w.toFixed(1)} px below its minPx ${rec[2]}`);
      if (srcs.has(p.src)) out.push(`${L}: src twice (${p.key})`);
      srcs.add(p.src);
    });
    it.chips.forEach((c) => { if (c.h < FLOOR - 0.6) out.push(`${L}: chip ${c.h.toFixed(1)} < ${FLOOR}`); });
    if (it.plateFont < 16) out.push(`${L}: plate font ${it.plateFont} < 16`);
  });
  return out;
}

function assertRender(name, r, { cards, allowStageOverflow = false }) {
  ok(r.verify.length === 0, `${name}: verify ${JSON.stringify(r.verify)}`);
  ok(r.lints.length === 0, `${name}: lints ${JSON.stringify(r.lints)}`);
  ok(r.m.cards.length === cards, `${name}: ${r.m.cards.length} cards, want ${cards}`);
  ok(r.m.lowest <= r.m.foot + 0.6, `${name}: lowest ink ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
  if (!allowStageOverflow) ok(r.m.items.every((it) => it.overflow <= 0), `${name}: stage overflow ${JSON.stringify(r.m.items.map((it) => it.overflow))}`);
}

/** A type whose bodyHtml is post-processed (render poisons) */
function mutated(type, fn) { return { ...type, build: async (a, c) => { const b = await type.build(a, c); return { ...b, bodyHtml: fn(b.bodyHtml) }; } }; }
/** A type over an injected bank (bank poisons that bypass the validator) */
function withBank(type, bank) { return { ...type, build: (a, c) => type._buildWith(bank, type.difficulty[a.difficulty], { locale: a.locale }, c) }; }

/**
 * Long-chrome fixtures (measured in this gate; the lines are printed). The 722 chrome = a 3-line title + a 3-line
 * instruction (the README floor); the 677 chrome = a 4-line title (the fi four-line stack the base does NOT fit).
 */
const CHROME = {
  three: { title: 'Personal Pronouns: Read the Name Under Each Picture and Circle He, She or', instruction: 'Look at each person carefully and read the name printed on the white plate under the picture. Then circle the single word we would say instead of that name: he, she or they.' },
  four: { title: 'Persoonapronominitehtäväsarja: ympyröi persoonapronominivaihtoehto nimestä', instruction: 'Look at each person carefully and read the name printed on the white plate under the picture. Then circle the single word we would say instead of that name: he, she or they.' },
};
// a synthetic nl object list with >= 6 het nouns (opened pictures; the real one is the nl panel's)
const NL_OBJECTS = [['vehicles', 'airplane'], ['classroom', 'book'], ['around the house', 'bed'], ['around the house', 'window'], ['around the house', 'toilet'], ['vehicles', 'ship'], ['vehicles', 'bus'], ['toys', 'ball'], ['fruits', 'apple'], ['toys', 'kite'], ['toys', 'doll'], ['pets', 'cat']];

/** A synthetic locale block for the validator poisons (a de / es / fr / nl / sv / fi block does not exist yet) */
function synthetic(loc, en) {
  const b = clone(en);
  b.strings = clone(en.strings);
  if (loc === 'de') {
    Object.assign(b, { chips: ['er', 'sie', 'es'], initial: ['Er', 'Sie', 'Es'], and: 'und', objectMap: { m: 0, f: 1, n: 2 },
      map: { base: { m1: 0, f1: 1 }, replace: { m1: 0, f1: 1, mp: 1, fp: 1, xp: 1 }, anaphora: { m1: 0, f1: 1 }, sort: { m1: 0, f1: 1 }, rewrite: { m1: 0, f1: 1, mp: 1, fp: 1, xp: 1 } },
      objects: [['vehicles', 'airplane'], ['vehicles', 'car'], ['vehicles', 'bicycle'], ['vehicles', 'boat'], ['vehicles', 'bus'], ['toys', 'ball'], ['fruits', 'apple'], ['toys', 'kite'], ['toys', 'doll'], ['fruits', 'orange'], ['music', 'drum'], ['pets', 'cat']].map(([t, k]) => ({ key: k, pic: { theme: t, noun: k }, picOpened: true })) });
    b.possessive = { chips: ['sein', 'seine', 'ihr', 'ihre'], byOwner: null, frame: { sg: 'Das ist {subj}. Das ist ___ {thing}.' }, artTable: null,
      things: en.possessive.things.map((t, i) => ({ ...t, forms: { m1: i % 2 ? 1 : 0, f1: i % 2 ? 3 : 2, p: null } })) };
    b.strings.base.note = undefined;
  }
  if (loc === 'es') { Object.assign(b, { chips: ['él', 'ella', 'ellos', 'ellas'], initial: ['Él', 'Ella', 'Ellos', 'Ellas'], and: 'y', andBefore: { i: 'e', hi: 'e' }, map: { base: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, replace: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, anaphora: { m1: 0, f1: 1 }, sort: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, rewrite: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 } }, possessive: null, refuse: { possessive: true } }); delete b.strings.possessive; }
  if (loc === 'fr') { Object.assign(b, { chips: ['il', 'elle', 'ils', 'elles'], initial: ['Il', 'Elle', 'Ils', 'Elles'], and: 'et', map: { base: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, replace: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, anaphora: { m1: 0, f1: 1 }, sort: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, rewrite: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 } } });
    b.possessive = { chips: ['son', 'sa', 'leur'], byOwner: null, frame: { sg: 'Voici {subj}. Voici ___ {thing}.', pl: 'Voici {subj}. Voici ___ {thing}.' }, artTable: null, things: en.possessive.things.map((t, i) => ({ ...t, forms: { m1: i % 2, f1: i % 2, p: 2 } })) }; }
  if (loc === 'nl') { Object.assign(b, { chips: ['hij', 'zij', 'het'], initial: ['Hij', 'Zij', 'Het'], and: 'en', objectMap: { d: 0, h: 2 }, map: { base: { m1: 0, f1: 1 }, replace: { m1: 0, f1: 1, mp: 1, fp: 1, xp: 1 }, anaphora: { m1: 0, f1: 1 }, sort: { m1: 0, f1: 1 }, rewrite: { m1: 0, f1: 1, mp: 1, fp: 1, xp: 1 } },
    objects: NL_OBJECTS.map(([t, k]) => ({ key: k, pic: { theme: t, noun: k }, picOpened: true })) }); }
  if (loc === 'sv') { Object.assign(b, { chips: ['han', 'hon', 'de'], initial: ['Han', 'Hon', 'De'], and: 'och', extraChips: ['hen'] }); }
  if (loc === 'fi') { Object.assign(b, { chips: ['hän', 'he'], initial: ['Hän', 'He'], and: 'ja', map: { base: { m1: 0, f1: 0, p: 1 }, replace: { m1: 0, f1: 0, p: 1 }, anaphora: { m1: 0, f1: 0, p: 1 }, sort: { m1: 0, f1: 0, p: 1 }, rewrite: { m1: 0, f1: 0, p: 1 } }, possessive: null, refuse: { possessive: true },
    names: [...en.names, { name: 'Aino', gender: 'f' }, { name: 'Helmi', gender: 'f' }, { name: 'Väinö', gender: 'm' }, { name: 'Onni', gender: 'm' }],
    anaphora: en.anaphora.map((a) => ({ ...a, intro: '{a} ja {b} lukevat.', s: [{ text: '{P} lukee.', key: 'sg' }, { text: '{P} lukevat.', key: 'pl' }] })) }); delete b.strings.possessive; }
  return b;
}

/* ------------------------------------------------------------------ main ------------------------------------------------------------------ */

async function main() {
  const all = bankModule('pronouns');
  const en = all.en;
  const t0 = Date.now();
  console.log(`verify-b4-pronouns ${QUICK ? '(--quick) ' : ''}— locales on disk: ${Object.keys(all).join(' ')}`);

  // ---- 1. the bank(s)
  for (const loc of Object.keys(all)) {
    const errs = validateBank(all[loc], loc);
    ok(errs.length === 0, `bank ${loc}: ${errs.join(' | ')}`);
    console.log(`bank ${loc}: ${errs.length ? errs.length + ' fails' : 'clean'} (people ${all[loc].people.length}, names ${all[loc].names.length}, chips ${all[loc].chips.length}, frames ${all[loc].frames.length}, anaphora ${all[loc].anaphora.length}, things ${all[loc].possessive ? all[loc].possessive.things.length : 'refused'})`);
  }
  // the synthetic blocks are themselves clean controls for the non-EN rules
  for (const loc of ['de', 'es', 'fr', 'nl', 'sv', 'fi']) {
    const errs = validateBank(synthetic(loc, en), loc).filter((e) => !/^rule 11: axes|^rule 7: object "\w+" has no objForms|^rule 7: \d+ objects, want 12|^rule 7: \d+ neuter|^rule 6: things f/.test(e));
    ok(errs.length === 0, `synthetic ${loc} control: ${errs.join(' | ')}`);
  }

  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  try {
    // rule 13's measurer: a title's rendered line count at the shell width
    const titleLines = async (title) => { const r = await renderWith(page, TYPE, { baseName: 'G1-352-gate-titlelines', strings: { title, instruction: 'x' } }); return r.m.lines; };
    const lines3 = await titleLines(CHROME.three.title), lines4 = await titleLines(CHROME.four.title);
    ok(lines3 === 3, `the 3+3 chrome fixture title wraps to ${lines3} lines, want 3`);
    ok(lines4 === 4, `the 677 chrome fixture title wraps to ${lines4} lines, want 4`);
    const fiBase = await titleLines('Hän vai he?'), fiF1 = await titleLines('Korvaa nimi pronominilla');
    ok(fiBase <= 3 && fiF1 <= 3, `the proposed fi titles wrap to ${fiBase} / ${fiF1} lines`);
    console.log(`title lines: 722-fixture ${lines3} · 677-fixture ${lines4} · "Hän vai he?" ${fiBase} · "Korvaa nimi pronominilla" ${fiF1}`);

    // ---- 2. renders
    const seen = {};
    for (const d of [1, 2]) {
      const r = await renderWith(page, TYPE, { difficulty: d, baseName: `G1-352-gate-d${d}-en` });
      assertRender(`d${d} en`, r, { cards: TYPE.difficulty[d].cards });
      const cc = crossCheck(r.m.items, en);
      ok(cc.length === 0, `d${d} en node cross-check: ${cc.join(' | ')}`);
      seen[d] = r;
      console.log(`render d${d} en: verify ${r.verify.length} lints ${r.lints.length} body ${Math.round(r.m.body.h)} card ${r.m.cards[0].h.toFixed(1)} inner ${r.m.cards[0].inner.toFixed(1)} stage ${r.m.items[0].stage} overflow ${Math.max(...r.m.items.map((i) => i.overflow))} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // d2 under the 3-line-title + 3-line-instruction chrome — the README's "722" measures 710 (the G2-317 finding);
    // the stage (140) must sit inside the card inner (143) with 0 overflow
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-352-gate-d2-en-chrome722', strings: CHROME.three });
      assertRender('d2 en 3+3 chrome', r, { cards: 8 });
      ok(r.m.body.h <= 724 && r.m.body.h >= 700, `3+3 chrome fixture gives body ${Math.round(r.m.body.h)} (README 722; measured 710)`);
      ok(r.m.items.every((it) => it.content <= 141 && it.content >= 126 && it.inner >= it.content), `3+3 chrome: content ${r.m.items.map((i) => Math.round(i.content)).join('/')} inner ${Math.round(r.m.items[0].inner)} (design: 140 <= 143)`);
      const cc = crossCheck(r.m.items, en);
      ok(cc.length === 0, `d2 3+3 chrome node cross-check: ${cc.join(' | ')}`);
      console.log(`render d2 en 3+3 chrome: body ${r.m.body.h.toFixed(1)} card ${r.m.cards[0].h.toFixed(1)} inner ${r.m.cards[0].inner.toFixed(1)} content ${r.m.items.map((i) => Math.round(i.content)).join('/')} overflow ${Math.max(...r.m.items.map((i) => i.overflow))} lowest ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
    }
    // d3 under the 722 chrome — UNPUBLISHED by design: its only failure must be the stage overflow
    {
      const r = await renderWith(page, TYPE, { difficulty: 3, baseName: 'G1-352-gate-d3-en-chrome722', strings: CHROME.three });
      ok(r.m.cards.length === 10, `d3: ${r.m.cards.length} cards`);
      ok(r.verify.length > 0 && r.verify.every((f) => /stage overflow|spills past/.test(f)), `d3 at 722: expected ONLY stage-overflow failures, got ${JSON.stringify(r.verify)}`);
      console.log(`render d3 en 3+3 chrome (unpublished by design): card ${r.m.cards[0].h.toFixed(1)} inner ${r.m.cards[0].inner.toFixed(1)} content ${Math.round(r.m.items[0].content)} overflow ${Math.max(...r.m.items.map((i) => i.overflow))} → ${r.verify.length} stage-overflow lines`);
    }
    // PR8 — the base under a 4-line title (677): must FAIL (the footer lint or the stage overflow)
    {
      const r = await renderWith(page, TYPE, { difficulty: 2, baseName: 'G1-352-gate-d2-en-chrome677', strings: CHROME.four });
      const failed = [...r.verify, ...r.lints];
      ok(r.m.body.h <= 690, `677 chrome fixture gives body ${Math.round(r.m.body.h)} (want 677)`);
      ok(failed.some((f) => /footer overlap|stage overflow|spills past/.test(f)), `PR8 677 chrome: the base must fail (footer / stage), got ${JSON.stringify(failed)}`);
      console.log(`render d2 en 677 chrome (PR8): body ${Math.round(r.m.body.h)} inner ${r.m.cards[0].inner.toFixed(1)} content ${Math.round(r.m.items[0].content)} → ${failed.length} fails (${failed[0]})`);
    }

    // ---- component smoke: the six face components through the real pipeline
    {
      const rng = makeRng('G1-352-components');
      const P = (k) => ({ src: fileUri(OPENED[k][0], k), key: k });
      const body = [
        C4.initialBank({ words: en.initial, rng, chipOrder: en.initial }),
        `<div style="display:grid;grid-template-rows:repeat(2,minmax(74px,1fr));row-gap:6px">` +
          C4.nameGapRow({ pics: [P('teacher')], line1: 'Mia reads a book.', line2: 'reads a book.', frameId: 'read-book', num: 'sg', key: 'f1', answer: 'She' }) +
          C4.nameGapRow({ pics: [P('barber'), P('coach')], line1: 'Jack and Eli play with a ball.', line2: 'play with a ball.', frameId: 'play-ball', num: 'pl', key: 'mp', answer: 'They' }) + `</div>`,
        C4.anaphoraBlock({ referents: [{ pics: [P('librarian')], name: 'Mia', target: 'a' }, { pics: [P('farmer')], name: 'Ben', target: 'b' }], intro: 'Mia and Ben are in the park.', sentences: [{ pronoun: 'He', rest: 'has a ball.', ref: 'b' }, { pronoun: 'She', rest: 'has a kite.', ref: 'a' }] }),
        C4.ownerLane({ owners: { pics: [P('nurse'), P('chef')] }, thing: { src: fileUri('toys', 'ball'), key: 'ball' }, frame: 'These are Zoe and Max. This is ___ ball.', chips: en.possessive.chips, correctIndex: 2, chipW: 66, num: 'pl', ownerKey: 'xp', thingKey: 'ball' }),
        C4.rewriteLane({ pics: [P('judge')], sentence: 'Tom feeds the dog.', num: 'sg', frameId: 'feed-dog', key: 'm1', answer: 'He feeds the dog.' }),
      ].join('<div style="height:10px"></div>');
      const sortBody = C4.nameCardBins({
        cards: [['Mia', ['teacher'], 1], ['Ben', ['farmer'], 0], ['Zoe and Ava', ['nurse', 'girl'], 2], ['Leo', ['judge'], 0], ['Anna', ['florist'], 1], ['Tom and Max', ['coach', 'baker'], 2], ['Lily', ['athlete'], 1], ['Jack', ['author'], 0], ['Eli', ['doctor'], 0], ['Emma', ['cashier'], 1]]
          .map(([caption, ks, key]) => ({ caption, pics: ks.map(P), key })),
        bins: en.chips.map((head, idx) => ({ head, idx })), binLayout: 'row', binH: 330,
      });
      const fake = (html, id) => ({ ...TYPE, id, build: async () => ({ bodyHtml: `<div data-ws-content style="flex:1;display:flex;flex-direction:column">${html}</div>`, meta: {} }), verify: async () => [] });
      const r1 = await renderWith(page, fake(body, 'G1-352'), { baseName: 'G1-352-gate-components' });
      ok(r1.lints.length === 0, `components smoke: lints ${JSON.stringify(r1.lints)}`);
      const h = await page.evaluate(() => ({
        bank: document.querySelector('[data-lcs-bank-banner]').getBoundingClientRect().height,
        gap: [...document.querySelectorAll('[data-lcs-frame][data-lcs-num]')].map((e) => e.getBoundingClientRect().height),
        ana: document.querySelector('[data-lcs-pair]').getBoundingClientRect().height,
        owner: document.querySelector('[data-lcs-owner]').getBoundingClientRect().height,
        rewrite: document.querySelector('[data-lcs-ruling-row]').closest('[data-lcs-frame]').getBoundingClientRect().height,
        lines1: [...document.querySelectorAll('[data-lcs-line1]')].map((e) => e.getBoundingClientRect().height),
      }));
      ok(h.bank <= 70, `initialBank ${h.bank.toFixed(1)} px (design 60)`);
      ok(h.ana >= 110 && h.ana <= 122, `anaphoraBlock ${h.ana.toFixed(1)} px (design 116)`);
      ok(h.owner >= 78 && h.owner <= 90, `ownerLane ${h.owner.toFixed(1)} px (design 83)`);
      ok(h.rewrite >= 74 && h.rewrite <= 84, `rewriteLane ${h.rewrite.toFixed(1)} px (design 77.4 est.)`);
      ok(h.lines1.every((x) => x <= 26), `nameGapRow line 1 heights ${h.lines1.map((x) => x.toFixed(1)).join('/')} (<= 26)`);
      console.log(`components: bank ${h.bank.toFixed(1)} · nameGapRow ${h.gap.map((x) => x.toFixed(1)).join('/')} (grid min 74) · anaphoraBlock ${h.ana.toFixed(1)} · ownerLane ${h.owner.toFixed(1)} · rewriteLane ${h.rewrite.toFixed(1)}`);
      const r2 = await renderWith(page, fake(sortBody, 'G1-352'), { baseName: 'G1-352-gate-components-sort' });
      ok(r2.lints.length === 0, `nameCardBins smoke: lints ${JSON.stringify(r2.lints)}`);
      const s = await page.evaluate(() => ({ shelf: document.querySelector('[data-lcs-shelf]').getBoundingClientRect().height, bins: [...document.querySelectorAll('[data-lcs-sortbin]')].map((b) => [b.dataset.lcsGapy, b.querySelector('.ws-bin').getBoundingClientRect().width]), caps: [...document.querySelectorAll('[data-lcs-caption]')].map((c) => c.scrollHeight) }));
      ok(s.shelf >= 210 && s.shelf <= 226, `nameCardBins shelf ${s.shelf.toFixed(1)} px (design 218)`);
      ok(s.bins.every(([g]) => +g >= 34), `nameCardBins gapY ${s.bins.map(([g]) => g).join('/')}`);
      ok(s.caps.every((c) => c <= 37), `caption zones ${s.caps.join('/')} (<= 37)`);
      console.log(`components: shelf ${s.shelf.toFixed(1)} · bins ${s.bins.map(([g, w]) => g + '@' + w).join(' ')} · captions ${s.caps.join('/')}`);
      // component throws (contracts)
      const throws = (fn, re, what) => { let m = null; try { fn(); } catch (e) { m = e.message; } ok(m && re.test(m), `${what}: ${m || 'did NOT throw'}`); };
      throws(() => C4.portraitStrip({ pics: [P('teacher'), P('teacher')], px: 64 }), /twice/, 'portraitStrip same src twice');
      throws(() => C4.portraitStrip({ pics: [P('teacher')], px: 30 }), /< 36/, 'portraitStrip px 30');
      throws(() => C4.namePlate({ text: 'Mia', px: 14 }), /< 16/, 'namePlate px 14');
      throws(() => C4.pronounChips({ chips: en.chips, correctIndex: 3, count: 3 }), /out of range/, 'pronounChips index 3');
      throws(() => C4.pronounChips({ chips: en.chips, correctIndex: 0, count: 3, h: 40 }), /< the G1 floor/, 'pronounChips h 40');
      throws(() => C4.nameGapRow({ pics: [P('teacher')], line1: 'Mia reads a book.', line2: 'reads a kite.', frameId: 'x', num: 'sg', key: 'f1', answer: 'She' }), /minus its leading subject/, 'nameGapRow line2 mismatch (PR11)');
      throws(() => C4.anaphoraBlock({ referents: [{ pics: [P('librarian')], name: 'Mia', target: 'a' }, { pics: [P('farmer')], name: 'Ben', target: 'b' }], intro: 'Mia and Ben are here.', sentences: [{ pronoun: 'He', rest: 'has a ball.', ref: 'b' }, { pronoun: 'He', rest: 'has a kite.', ref: 'a' }] }), /no single solution/, 'anaphoraBlock two He (PR2)');
      throws(() => C4.ownerLane({ owners: { pics: [P('nurse')] }, thing: { src: fileUri('toys', 'ball'), key: 'ball' }, frame: 'This is Mia. This is her ___ ball.', chips: en.possessive.chips, correctIndex: 1, chipW: 66, num: 'sg', ownerKey: 'f1', thingKey: 'ball' }), /chip "her" occurs/, 'ownerLane chip in the frame');
      throws(() => C4.nameCardBins({ cards: [{ caption: 'Mia', pics: [P('teacher')], key: 0 }], bins: [0, 1, 2, 3].map((i) => ({ head: 'x' + i, idx: i })), binLayout: 'row' }), /use the grid/, 'nameCardBins 4 bins in a row (PR9)');
      throws(() => C4.rewriteLane({ pics: [P('judge')], sentence: 'He feeds the dog.', num: 'sg', frameId: 'x', key: 'm1', answer: 'He feeds the dog.' }), /prints the answer/, 'rewriteLane answer printed');
    }

    // ---- 3. sweep
    if (!QUICK) {
      for (const d of [1, 2]) {
        const sets = new Set(), orders = new Set();
        for (let s = 1; s <= 20; s++) {
          const rng = makeRng(instanceSeed({ typeId: TYPE.id, theme: null, difficulty: d, seedEpoch: 1, variant: s }));
          const b = TYPE.build({ theme: null, difficulty: d, locale: 'en' }, { rng });
          const cards = b.meta.cards;
          const hist = new Array(en.chips.length).fill(0);
          cards.forEach(([, chip]) => hist[chip]++);
          ok(hist.every((h) => h >= TYPE.difficulty[d].mixFloor), `sweep d${d} seed ${s}: chips ${hist.join('/')} < mixFloor`);
          const people = cards.flatMap(([, , ks]) => ks.split('+')), nm = cards.flatMap(([, , , ns]) => ns.split('+').filter(Boolean));
          ok(new Set(people).size === people.length, `sweep d${d} seed ${s}: a portrait twice`);
          ok(new Set(nm).size === nm.length, `sweep d${d} seed ${s}: a name twice`);
          cards.forEach(([key, chip, ks]) => { const refs = ks.split('+').map((k) => ({ key: k, depicted: OPENED[k][1] })); ok(TYPE.keyOf(refs, en) === key && TYPE.answerChip(en, 'base', key) === chip, `sweep d${d} seed ${s}: key ${key} / chip ${chip} not re-derived`); });
          sets.add(people.slice().sort().join(',')); orders.add(people.join(','));
        }
        ok(sets.size >= 2 && orders.size >= 2, `sweep d${d}: ${sets.size} distinct card sets / ${orders.size} orders over 20 seeds`);
        console.log(`sweep d${d}: 20 seeds, ${sets.size} distinct sets, ${orders.size} distinct orders`);
      }
    }

    // ---- 4. poisons — bank (validator)
    const poison = (name, block, loc, re, opts) => {
      const errs = validateBank(block, loc, opts);
      const hit = errs.filter((e) => re.test(e));
      if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (the validator passed the poison)`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    let b;
    b = clone(en); b.people.find((p) => p.key === 'nurse').depicted = 'm'; poison('P1 nurse retagged m', b, 'en', /rule 1: "nurse" tagged m/);
    b = synthetic('de', en); b.people.find((p) => p.key === 'nurse').depicted = 'm'; poison('P1 de overlay retags nurse', b, 'de', /rule 1/);
    b = clone(en); b.people.push({ key: 'actor', pic: { theme: 'occupations', noun: 'actor' }, depicted: 'm', minPx: 44, picOpened: true }); poison('P2 actor in people', b, 'en', /rule 1: "actor" is not an OPENED portrait \(EXCLUDED/);
    b = clone(en); delete b.people[0].picOpened; poison('P2 picOpened absent', b, 'en', /rule 1: "architect" picOpened/);
    b = clone(en); b.people.find((p) => p.key === 'girl').pic.theme = 'toys bw'; poison('P2 theme toys bw', b, 'en', /B&W theme|pins toys bw/);
    b = clone(en); b.names.find((n) => n.name === 'Eli').gender = 'f'; poison('P3 7 f + 5 m names', b, 'en', /rule 2: 7 f \/ 5 m/);
    b = synthetic('de', en); b.map.base.xp = 1; poison('P4 de map.base.xp:1', b, 'de', /rule 3: de map\.base\.xp present/);
    b = clone(en); b.frames[0].pl = b.frames[0].sg; poison('P5 sg === pl', b, 'en', /rule 4: frame read-book sg === pl/);
    b = clone(en); b.frames[1].pl = '{subj} and they read.'; poison('P6 "{subj} and they read."', b, 'en', /rule 4: frame play-ball\.pl carries the pronoun "they"/);
    b = clone(en); b.frames[2].sg = 'A book reads {subj}.'; poison('P6b subject not first', b, 'en', /rule 4: frame eat-apple\.sg does not start with \{subj\}/);
    b = clone(en); b.anaphora[0].s[1].key = 'pl'; poison('P7 non-fi anaphora key pl', b, 'en', /rule 5: anaphora park keys/);
    b = clone(en); delete b.anaphora[1].contentNeutral; poison('P7 contentNeutral absent', b, 'en', /rule 5: anaphora school contentNeutral/);
    b = synthetic('es', en); b.possessive = clone(en.possessive); poison('P8 es carries possessive', b, 'es', /rule 6: es refuses the possessive but carries/);
    b = synthetic('es', en); b.refuse = { possessive: false }; poison('P8 es without the refusal', b, 'es', /rule 9: es must record refuse/);
    b = synthetic('de', en); b.possessive.things[0].forms.p = 2; poison('P9 de forms.p:2', b, 'de', /rule 6: de thing "ball" forms\.p must be null/);
    b = synthetic('de', en); b.possessive.frame.pl = 'Das sind {subj}. Das ist ___ {thing}.'; poison('P9 de frame.pl', b, 'de', /rule 6: de possessive frame\.pl must be absent/);
    b = synthetic('fr', en); b.possessive.things.push({ key: 'orange', pic: { theme: 'fruits', noun: 'orange' }, forms: { m1: 0, f1: 0, p: 2 }, picOpened: true });
    poison('P9 fr thing orange (f, vowel-initial: "son orange")', b, 'fr', /rule 6: fr f thing "orange"/);
    b = clone(en); b.objects = [{ key: 'ball', pic: { theme: 'toys', noun: 'ball' }, picOpened: true }]; poison('P10 en with objects', b, 'en', /rule 7: objects present without an objectMap/);
    b = synthetic('de', en); b.objects[0] = { key: 'dog', pic: { theme: 'pets', noun: 'dog' }, picOpened: true }; b.objects[1] = { key: 'hat', pic: { theme: 'accessories', noun: 'hat' }, picOpened: true }; poison('P10 de objects with 2 neuter', b, 'de', /rule 7: 2 neuter objects < 4/);
    b = synthetic('nl', en); b.objects = Array.from({ length: 12 }, (_, i) => ({ key: i === 0 ? 'girl' : 'ball', pic: { theme: 'toys', noun: i === 0 ? 'girl' : 'ball' }, picOpened: true })); poison('P10 nl objects with girl', b, 'nl', /rule 7: object "girl" is a person noun/);
    b = synthetic('fi', en); b.strings.base.title = 'Persoonamuodot'; poison('P11 fi title Persoonamuodot', b, 'fi', /rule 8: base title "Persoonamuodot" contains the sibling family name/);
    b = clone(en); b.strings.base.instruction = 'Circle the word from the bank.'; poison('P11 base instruction with the bank word', b, 'en', /rule 8: the base instruction carries the bank word/);
    b = synthetic('sv', en); b.chips = ['han', 'hon', 'hen', 'de']; b.initial = ['Han', 'Hon', 'Hen', 'De']; poison('P11 sv chips with hen', b, 'sv', /rule 3: sv "hen"/);
    b = clone(en); b.strings.base.title = 'Personal Pronouns Worksheet'; poison('P11b worksheet word', b, 'en', /rule 8: base title carries the worksheet word/);
    b = clone(en); b.strings.sort.title = 'Sort the Names with Answers'; poison('P11c answers promised', b, 'en', /rule 8: sort string promises answers/);
    b = clone(en); b.strings.base.instruction = 'Free printable: circle the word.'; poison('P11d free claim', b, 'en', /rule 8: base string claims free/);
    {
      const fr4 = synthetic('fr', en);
      let m = null; try { TYPE.resolveBase({ ...TYPE.difficulty[2], four: { singles: 5, pairs: 3, pairMix: 'mp,fp,xp' } }, fr4); } catch (e) { m = e.message; }
      ok(m && /chip "elles" reaches 1 < mixFloor 2/.test(m), `P12 fr pairs:3: ${m || 'resolveBase did NOT refuse'}`);
      if (m) console.log(`  poison P12 fr pairs:3: killed (${m.slice(0, 90)})`);
    }
    b = synthetic('fi', en); b.names = b.names.slice(0, 12); poison('P13 fi names of 12', b, 'fi', /rule 12: F2 needs 15 names/);
    b = synthetic('fi', en); poison('P14 fi 4-line base title', b, 'fi', /rule 13: fi base title wraps to 4 lines/, { titleLines: (t) => (t === b.strings.base.title ? 4 : 1) });
    // the control: the correct EN bank + the measured fi titles pass rule 13
    ok(validateBank(synthetic('fi', en), 'fi', { titleLines: () => 1 }).filter((e) => !/rule 11/.test(e)).length === 0, 'control: the synthetic fi block with 1-line titles is clean');

    // ---- render poisons (the validator bypassed)
    const renderPoison = async (name, type, re, { difficulty = 2, strings } = {}) => {
      const r = await renderWith(page, type, { difficulty, baseName: `G1-352-gate-poison-${name.split(' ')[0]}`, strings });
      const all2 = [...r.verify, ...r.lints, ...crossCheck(r.m.items, en)];
      const hit = all2.filter((f) => re.test(f));
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    { const bad = clone(en); bad.names.find((n) => n.name === 'Mia').gender = 'm'; await renderPoison('PR1 Mia tagged m in the bank (a plate over a wrong-sex portrait)', withBank(TYPE, bad), /tag mismatch|re-derived/); }
    await renderPoison('PL a stamped key edited', mutated(TYPE, (h) => h.replace('data-lcs-key="m1"', 'data-lcs-key="f1"')), /stamped key f1, re-derived m1|refs for key|portraits for key/);
    await renderPoison('PR6 chips reordered on one card', mutated(TYPE, (h) => { const i = h.indexOf('<div class="ws-achips"'); const j = h.indexOf('</div>', i); const seg = h.slice(i, j); const chips = seg.match(/<span class="ws-achip"[\s\S]*?<\/span>/g); return h.slice(0, i) + seg.replace(chips.join(''), chips.slice().reverse().join('')) + h.slice(j); }), /position leak/);
    await renderPoison('PR7 default card padding at 722', mutated(TYPE, (h) => h.replace(/ style="padding:10px 12px"/g, '')), /stage overflow/, { strings: CHROME.three });
    await renderPoison('PR10 a plate printing the occupation noun', mutated(TYPE, (h) => {
      const V = vocab();
      const m = [...h.matchAll(/data-lcs-refs="(\w+)" data-lcs-names="([^"|]+)"/g)].find((x) => V[x[1]] && V[x[1]].en);
      if (!m) throw new Error('PR10: no card with a vocab-keyed portrait');
      const noun = V[m[1]].en[0];
      const i = h.indexOf(m[0]); const j = h.indexOf('data-lcs-plate', i); const k = h.indexOf('>', j) + 1; const l = h.indexOf('</span>', k);
      return h.slice(0, k) + noun + h.slice(l);
    }), /prints the occupation noun of|plate "\w+" !=/);
    await renderPoison('PR12 a portrait src twice', mutated(TYPE, (h) => { const srcs = [...h.matchAll(/src="([^"]+)"/g)].map((m) => m[1]); return h.replace(`src="${srcs[1]}"`, `src="${srcs[0]}"`); }), /src twice/);
    await renderPoison('PR3 answer printed as the plate', mutated(TYPE, (h) => h.replace(/(data-lcs-plate[^>]*>)[^<]*(<\/span>)/, '$1she$2')), /prints a chip label|prints a pronoun|plate "she" !=/);
    // PR10 guard: the mutation must have matched (a poison that edits nothing is a silent pass)
  } finally {
    await browser.close();
  }
  console.log(`\nverify-b4-pronouns: ${asserts} assertions, ${fails} failures in ${((Date.now() - t0) / 1000).toFixed(0)}s → ${fails ? 'FAIL' : 'PASS'}`);
  process.exit(fails ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, crossCheck, OPENED, EXCLUDED, TABLE_B };
