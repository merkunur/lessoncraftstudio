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
 *        f >= 8 at minPx 44); (2) names >= 6 f AND >= 6 m (fi >= 8 / >= 8; a FLOOR —
 *        fr/es/pt author 13 for the 4-chip deals, fi 16, the rest 12), distinct
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
 *        names.length; (13) the base + F1 + F3 titles <= 3 lines at the shell
 *        width in EVERY locale (opts.titleLines(title) -> lines; measured by this
 *        gate; skipped when no measurer is passed) — the 710 / 704 / 706 stacks
 *        do not fit a four-line title.
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
 *
 * 5. THE FIVE FACES (Phase 2; design §3; tools/b4var-rows/pronouns.js; record
 *    _work/G1-352-faces.md): the face specs on disk (i18n.en === bank.strings.<face>,
 *    themeless, G2 faces carry gradeBand, the F4 title lists EXACTLY the d2 chips);
 *    every face rendered at d2 en at the default chrome + the 3+3 (710) chrome +
 *    the 677 four-line chrome (F2 / F4 / F5 fit; F1 704 + F3 706 must FAIL there —
 *    rule 13 caps the fi F1 title, F3 has no fi), verify() empty (the per-face
 *    branch: floors, uniqueness, no answer printed, SPARSE — the lane grid ends at
 *    the body bottom, blank inside a lane <= 24, lanes <= 12 apart; F4 stack >= 660,
 *    slack <= 180, the bin lines fill the bin), lints clean, the node cross-check
 *    (keyOf from OPENED === every stamped key; map[face] / possForm === every
 *    answer / chip; printed sentence === the frame filled; the F2 pronoun ===
 *    initial[keyOf]; F3 chip text inside its measured chipW pill; F4 bins === chips);
 *    the synthetic de / fr / nl / fi classes (objects + ownerEnding, four + the 2 x 2
 *    grid at 710 + thingAgree, owner, two + the fi pair referent); the es / fi
 *    possessive REFUSAL (a throw, never a page); a 20-seed sweep per face; and the
 *    face poisons: PC1-10 config guards (throws), PB1-3 chipW (rule 6), PR2-PR20 +
 *    PN1-5 render / node poisons, PS1-5 the SPARSE poisons (rows fixed at their
 *    minimum: the grid floats; F4 at the design's 330 bins).
 *    Final line: PASS (N assertions, M/M poisons killed).
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

let fails = 0, asserts = 0, killed = 0, poisonTotal = 0;
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
  // rule 2 is a FLOOR (reviewer ruling 2026-09-21): >= 6 f AND >= 6 m (fi >= 8 / >= 8); fr/es/pt author 13 (7 f + 6 m, the 4-chip deals), fi 16, every other locale 12
  const floorN = isFi ? 8 : 6;
  const nf = names.filter((n) => n.gender === 'f').length, nm = names.filter((n) => n.gender === 'm').length;
  if (nf < floorN || nm < floorN || nf + nm !== names.length) push(`rule 2: ${nf} f / ${nm} m names (want >= ${floorN} / >= ${floorN}, every one tagged m|f)`);
  if (names.length > 16) push(`rule 2: ${names.length} names > 16`);
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
    if (!Number.isInteger(P.chipW) || P.chipW < 60 || P.chipW > 100) push(`rule 6: possessive chipW ${P.chipW} (an integer in [60, 100]: max(60, widest label at Baloo 2 700 20 + 18))`);
    else if (pc.length * P.chipW + (pc.length - 1) * 12 > 487) push(`rule 6: possessive chipW ${P.chipW} x ${pc.length} chips do not fit the 487 text column`);
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

  // rule 13 — the base / F1 / F3 titles <= 3 lines in EVERY locale (measured by the caller): the base (710), F1 (704) and F3 (706) do not fit a four-line stack (677)
  if (typeof opts.titleLines === 'function') {
    for (const f of ['base', 'replace', 'possessive']) { const t = S[f] && S[f].title; if (t) { const n = opts.titleLines(t); if (n > 3) push(`rule 13: ${loc} ${f} title wraps to ${n} lines (the 677 stack: base 710 / F1 704 / F3 706 do not fit)`); } }
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
// a four-line title of ORDINARY words (the base's `four` fixture carries a 44-char word that overflows the name/date band — a fixture artefact the faces must not inherit)
CHROME.threeFr = { title: 'Personal Pronouns: Read the Name Under Each Picture and Circle He', instruction: CHROME.three.instruction };   // 3 lines under the WIDER fr name/date band (the en fixture wraps to 4 there)
CHROME.fourClean = { title: 'Hän vai he? Ympyröi sana, joka korvaa nimen jokaisessa lauseessa ja kortissa tällä', instruction: CHROME.four.instruction };
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
    b.possessive = { chips: ['sein', 'seine', 'ihr', 'ihre'], chipW: 66, byOwner: null, frame: { sg: 'Das ist {subj}. Das ist ___ {thing}.' }, artTable: null,
      things: en.possessive.things.map((t, i) => ({ ...t, forms: { m1: i % 2 ? 1 : 0, f1: i % 2 ? 3 : 2, p: null } })) };
    b.strings.base.note = undefined;
  }
  if (loc === 'es') { Object.assign(b, { chips: ['él', 'ella', 'ellos', 'ellas'], initial: ['Él', 'Ella', 'Ellos', 'Ellas'], and: 'y', andBefore: { i: 'e', hi: 'e' }, map: { base: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, replace: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, anaphora: { m1: 0, f1: 1 }, sort: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, rewrite: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 } }, possessive: null, refuse: { possessive: true } }); delete b.strings.possessive; }
  if (loc === 'fr') { Object.assign(b, { chips: ['il', 'elle', 'ils', 'elles'], initial: ['Il', 'Elle', 'Ils', 'Elles'], and: 'et', names: [...en.names, { name: 'Léa', gender: 'f' }], map: { base: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, replace: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, anaphora: { m1: 0, f1: 1 }, sort: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 }, rewrite: { m1: 0, f1: 1, mp: 2, fp: 3, xp: 2 } } });
    // things: the en 12 with drum -> apple, hat -> banana (>= 3 f: poupée, voiture, pomme, banane); forms by the THING's gender (son m / sa f) + leur for pairs
    const V = vocab();
    const frThings = en.possessive.things.map((t) => (t.key === 'drum' ? { ...t, key: 'apple', pic: { theme: 'fruits', noun: 'apple' } } : t.key === 'hat' ? { ...t, key: 'banana', pic: { theme: 'fruits', noun: 'banana' } } : t));
    b.possessive = { chips: ['son', 'sa', 'leur'], chipW: 60, byOwner: null, frame: { sg: 'Voici {subj}. Voici ___ {thing}.', pl: 'Voici {subj}. Voici ___ {thing}.' }, artTable: null, things: frThings.map((t) => { const g = V[t.key].fr[2] === 'f' ? 1 : 0; return { ...t, forms: { m1: g, f1: g, p: 2 } }; }) }; }
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
    const lines3 = await titleLines(CHROME.three.title), lines4 = await titleLines(CHROME.four.title), lines4c = await titleLines(CHROME.fourClean.title);
    ok(lines3 === 3, `the 3+3 chrome fixture title wraps to ${lines3} lines, want 3`);
    ok(lines4 === 4, `the 677 chrome fixture title wraps to ${lines4} lines, want 4`);
    ok(lines4c === 4, `the clean 677 chrome fixture title wraps to ${lines4c} lines, want 4`);
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
      poisonTotal++;
      if (!errs.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (the validator passed the poison)`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${errs.join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); }
    };
    let b;
    b = clone(en); b.people.find((p) => p.key === 'nurse').depicted = 'm'; poison('P1 nurse retagged m', b, 'en', /rule 1: "nurse" tagged m/);
    b = synthetic('de', en); b.people.find((p) => p.key === 'nurse').depicted = 'm'; poison('P1 de overlay retags nurse', b, 'de', /rule 1/);
    b = clone(en); b.people.push({ key: 'actor', pic: { theme: 'occupations', noun: 'actor' }, depicted: 'm', minPx: 44, picOpened: true }); poison('P2 actor in people', b, 'en', /rule 1: "actor" is not an OPENED portrait \(EXCLUDED/);
    b = clone(en); delete b.people[0].picOpened; poison('P2 picOpened absent', b, 'en', /rule 1: "architect" picOpened/);
    b = clone(en); b.people.find((p) => p.key === 'girl').pic.theme = 'toys bw'; poison('P2 theme toys bw', b, 'en', /B&W theme|pins toys bw/);
    b = clone(en); b.names.find((n) => n.name === 'Eli').gender = 'f'; poison('P3 7 f + 5 m names', b, 'en', /rule 2: 7 f \/ 5 m names \(want >= 6/);
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
      poisonTotal++;
      ok(m && /chip "elles" reaches 1 < mixFloor 2/.test(m), `P12 fr pairs:3: ${m || 'resolveBase did NOT refuse'}`);
      if (m && /chip "elles" reaches 1 < mixFloor 2/.test(m)) killed++;
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
      poisonTotal++;
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0]})`); }
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

    /* ================================================================== 5. THE FIVE FACES (Phase 2; design §3; tools/b4var-rows/pronouns.js) ================================================================== */
    console.log('\n--- faces');
    const FACE_IDS = { replace: 'G1-371', anaphora: 'G2-353', possessive: 'G2-354', sort: 'G1-372', rewrite: 'G2-355' };
    const faceSpec = (face) => {
      const id = FACE_IDS[face];
      for (const dir of ['g1', 'g2']) { const d = path.join(__dirname, '..', 'types', dir); const f = fs.readdirSync(d).find((x) => x.startsWith(id + '-')); if (f) return require(path.join(d, f)); }
      throw new Error(`face spec ${id} not on disk (run tools/gen-b4var-specs.js)`);
    };
    const SPECS = {};
    for (const face of TYPE.FACES) {
      const sp = faceSpec(face);
      SPECS[face] = sp;
      ok(sp.difficulty[2].layout === face, `${sp.id}: layout ${sp.difficulty[2].layout} != ${face}`);
      ok(sp.i18n.en.title === en.strings[face].title && sp.i18n.en.instruction === en.strings[face].instruction, `${sp.id}: i18n.en != bank.strings.${face} (one source)`);
      ok(sp.themeAxis && sp.themeAxis.applicable === false, `${sp.id}: themeless`);
      ok(!/worksheet/i.test(sp.i18n.en.title) && !ANSWERS_WORD.test(sp.i18n.en.title + ' ' + sp.i18n.en.instruction), `${sp.id}: title / instruction wording`);
      const g2 = ['anaphora', 'possessive', 'rewrite'].includes(face);
      ok((sp.gradeBand === 'G2') === g2, `${sp.id}: gradeBand ${sp.gradeBand} (G2 faces carry extra {gradeBand:'G2'})`);
    }
    // the title-lists-config rule: a title that lists the chips lists EXACTLY the shipped d2 chips
    const titleChips = (title) => { const m = /:\s*(.+)$/.exec(title); return m ? m[1].split(/,\s*|\s+or\s+/).map(fold) : null; };
    const listedChips = (title, chips) => { const t = titleChips(title); return !t || t.join('|') === chips.map(fold).join('|'); };
    ok(listedChips(SPECS.sort.i18n.en.title, en.chips), `F4 title "${SPECS.sort.i18n.en.title}" does not list the d2 chips ${en.chips.join('/')}`);
    ok(!listedChips('Sort the Names: He, She or It', en.chips), 'PT poison: a title listing "He, She or It" over he/she/they must fail the title-lists-config rule');

    /** Face extraction from the rendered page (structure + geometry; the node re-derives every key from it). */
    const extractFace = () => page.evaluate(() => {
      const r = (el) => el.getBoundingClientRect();
      const root = document.querySelector('[data-lcs-pron]');
      const body = document.querySelector('[data-lcs-body]');
      const out = { layout: root.dataset.lcsLayout, body: { top: r(body).top, bottom: r(body).bottom, h: r(body).height }, rootTop: r(root).top, rootBottom: r(root).bottom, foot: r(document.querySelector('.ws-foot')).top };
      const pics = (el) => [...el.querySelectorAll('img[data-lcs-pic]')].map((i) => ({ key: i.dataset.lcsPic, src: i.src, w: r(i).width }));
      const nm = (el) => (el.dataset.lcsNames || '').split('|').filter(Boolean);
      const grid = root.querySelector('[data-lcs-lanes]');
      if (grid) out.gridBottom = r(grid).bottom;
      if (out.layout === 'replace' || out.layout === 'rewrite') {
        out.lanes = [...root.querySelectorAll('[data-lcs-frame]')].map((ln) => ({
          key: ln.dataset.lcsKey, num: ln.dataset.lcsNum, frameId: ln.dataset.lcsFrame, answer: ln.dataset.lcsAnswer, names: nm(ln), pics: pics(ln),
          line1: (ln.querySelector('[data-lcs-line1], [data-lcs-sentence]') || {}).textContent || '', line2: (ln.querySelector('[data-lcs-line2]') || {}).textContent || '',
          h: r(ln).height, top: r(ln).top, bottom: r(ln).bottom, svgW: ln.querySelector('svg') ? r(ln.querySelector('svg')).width : 0,
        }));
        const b = root.querySelector('[data-lcs-bank-banner]');
        out.bank = b ? [...b.querySelectorAll('[data-lcs-bank-word]')].map((w) => w.dataset.lcsBankWord) : null;
        out.bankH = b ? r(b).height : 0;
      } else if (out.layout === 'anaphora') {
        out.blocks = [...root.querySelectorAll('[data-lcs-pair]')].map((bl) => ({
          h: r(bl).height,
          referents: [...bl.querySelectorAll('[data-lcs-referent]')].map((rf) => ({ target: rf.dataset.lcsReferent, key: rf.dataset.lcsKey, refs: (rf.dataset.lcsRefs || '').split(',').filter(Boolean), names: nm(rf), plate: (rf.querySelector('[data-lcs-plate]') || {}).textContent || '', pics: pics(rf) })),
          intro: (bl.querySelector('[data-lcs-intro]') || {}).textContent || '',
          sentences: [...bl.querySelectorAll('[data-lcs-anaphor]')].map((s) => ({ ref: s.dataset.lcsRef, pronoun: s.querySelector('[data-lcs-pronoun]').dataset.lcsPronoun, rest: s.textContent.replace(s.querySelector('[data-lcs-pronoun]').textContent, '').trim() })),
        }));
      } else if (out.layout === 'possessive') {
        out.lanes = [...root.querySelectorAll('[data-lcs-item]')].map((ln) => ({
          ownerKey: ln.dataset.lcsOwner, thingKey: ln.dataset.lcsThing, chipKey: +ln.dataset.lcsChipKey, num: ln.dataset.lcsNum, names: nm(ln), pics: pics(ln),
          thingSrc: (ln.querySelector('img[data-lcs-thing-pic]') || {}).src || '', thingW: ln.querySelector('img[data-lcs-thing-pic]') ? r(ln.querySelector('img[data-lcs-thing-pic]')).width : 0,
          text: (ln.querySelector('[data-lcs-frametext]') || {}).textContent || '', chips: [...ln.querySelectorAll('[data-lcs-chip]')].map((c) => ({ label: c.dataset.lcsLabel, correct: !!c.dataset.lcsCorrect, w: r(c).width, textW: c.scrollWidth })),
          h: r(ln).height,
        }));
        out.chipW = +root.dataset.lcsChipw; out.possClass = root.dataset.lcsPossClass;
      } else if (out.layout === 'sort') {
        const sr = root.querySelector('[data-lcs-binlayout]');
        out.binLayout = sr.dataset.lcsBinlayout; out.dropped = +root.dataset.lcsDropped;
        out.cards = [...root.querySelectorAll('[data-lcs-sortword]')].map((c) => ({ itemKey: c.dataset.lcsItemKey, bin: +c.dataset.lcsKey, refs: (c.dataset.lcsRefs || '').split(',').filter(Boolean), names: nm(c), caption: c.dataset.lcsSortword, pics: pics(c) }));
        out.bins = [...root.querySelectorAll('[data-lcs-sortbin]')].map((b) => ({ idx: +b.dataset.lcsSortbin, head: b.querySelector('[data-lcs-sorthead]').textContent.trim(), lines: +b.dataset.lcsLines, gapY: +b.dataset.lcsGapy, w: r(b.querySelector('.ws-bin')).width, h: r(b.querySelector('.ws-bin')).height, bottom: r(b).bottom }));
        out.shelfTop = r(root.querySelector('[data-lcs-shelf]')).top; out.shelfH = r(root.querySelector('[data-lcs-shelf]')).height;
      }
      return out;
    });

    /** The node cross-check of a face render: every stamped key / chip / answer re-derived from the bank + OPENED. */
    const crossCheckFace = (x, bank, loc = 'en') => {
      const out = [];
      const byKey = new Map(bank.people.map((p) => [p.key, p]));
      const nameG = new Map(bank.names.map((n) => [nfd(n.name), n.gender]));
      const srcs = new Set(), names = new Set();
      const refsOf = (keys, nms, L) => keys.map((k, j) => { const p = byKey.get(k); const rec = OPENED[k]; if (!p || !rec) { out.push(`${L}: portrait "${k}" is not an OPENED bank portrait`); return null; } return { key: k, depicted: rec[1], name: nms[j], nameGender: nameG.get(nfd(nms[j] || '')) }; });
      const picsOk = (pics, L, floor) => pics.forEach((p) => { const rec = OPENED[p.key]; if (p.w < floor - 0.6) out.push(`${L}: portrait "${p.key}" ${p.w.toFixed(1)} < ${floor}`); if (rec && p.w < rec[2] - 0.6) out.push(`${L}: portrait "${p.key}" ${p.w.toFixed(1)} px below its minPx ${rec[2]}`); if (srcs.has(p.src)) out.push(`${L}: src twice (${p.key})`); srcs.add(p.src); });
      const namesOk = (nms, L) => nms.forEach((n) => { if (!nameG.has(nfd(n))) out.push(`${L}: name "${n}" is not in the bank`); if (names.has(nfd(n))) out.push(`${L}: name "${n}" twice`); names.add(nfd(n)); });
      const keyCheck = (keys, nms, stamped, L) => { const refs = refsOf(keys, nms, L); if (refs.some((x2) => !x2)) return null; let k; try { k = TYPE.keyOf(refs, bank); } catch (e) { out.push(`${L}: ${e.message}`); return null; } if (k !== stamped) out.push(`${L}: stamped key ${stamped}, re-derived ${k}`); return k; };
      const frameBy = (id) => bank.frames.find((f) => f.id === id);
      if (x.layout === 'replace' || x.layout === 'rewrite') {
        const face = x.layout;
        x.lanes.forEach((ln, i) => {
          const L = `${face} lane ${i + 1}`;
          const k = keyCheck(ln.pics.map((p) => p.key), ln.names, ln.key, L);
          if (!k) return;
          const chip = TYPE.answerChip(bank, face, k);
          if (chip == null || bank.initial[chip] !== (face === 'replace' ? ln.answer : ln.answer.split(/\s+/)[0])) out.push(`${L}: answer "${ln.answer}" != initial[map.${face}.${k}] "${bank.initial[chip]}"`);
          const fr = frameBy(ln.frameId);
          if (!fr) { out.push(`${L}: frame ${ln.frameId} not in the bank`); return; }
          const lit = fr[ln.num];
          const printed = TYPE.fillSubject(lit, ln.names, bank.and, bank.andBefore);
          if (ln.line1.trim() !== printed) out.push(`${L}: printed "${ln.line1.trim()}" != "${printed}"`);
          if (face === 'replace' && ln.line2.trim() !== lit.slice('{subj} '.length)) out.push(`${L}: line 2 "${ln.line2.trim()}" != the literal minus {subj}`);
          if (face === 'rewrite') { const want = lit.replace('{subj}', bank.initial[chip]); if (ln.answer !== want) out.push(`${L}: answer "${ln.answer}" != "${want}"`); if (ln.svgW < TYPE.need(want, 24) - 0.6) out.push(`${L}: writing row ${ln.svgW} < need ${TYPE.need(want, 24)}`); }
          picsOk(ln.pics, L, face === 'replace' ? 44 : 36); namesOk(ln.names, L);
        });
        if (face === 'replace') { if (!x.bank || x.bank.map(fold).sort().join('|') !== bank.initial.map(fold).sort().join('|')) out.push(`replace: bank ${JSON.stringify(x.bank)} != the initial table ${JSON.stringify(bank.initial)}`); }
      } else if (x.layout === 'anaphora') {
        x.blocks.forEach((bl, i) => {
          const L = `anaphora block ${i + 1}`;
          const byT = {};
          bl.referents.forEach((rf) => { byT[rf.target] = rf; const k = keyCheck(rf.refs, rf.names, rf.key, `${L} ${rf.target}`); if (k) { const want = TYPE.fillSubject('{subj}', rf.names, bank.and, bank.andBefore); if (rf.plate.trim() !== want) out.push(`${L}: plate "${rf.plate.trim()}" != "${want}"`); } picsOk(rf.pics, `${L} ${rf.target}`, 36); namesOk(rf.names, `${L} ${rf.target}`); });
          bl.sentences.forEach((s, k) => { const rf = byT[s.ref]; if (!rf) { out.push(`${L} s${k + 1}: ref ${s.ref} has no referent`); return; } const chip = TYPE.answerChip(bank, 'anaphora', rf.key); if (chip == null || bank.initial[chip] !== s.pronoun) out.push(`${L} s${k + 1}: pronoun "${s.pronoun}" != initial[map.anaphora.${rf.key}] "${bank.initial[chip]}"`); if (!bank.anaphora.some((a) => a.s.some((t) => t.text.slice('{P} '.length) === s.rest))) out.push(`${L} s${k + 1}: rest "${s.rest}" is not a bank sentence`); });
          const introOk = bank.anaphora.some((a) => a.intro.replace('{a}', byT.a ? byT.a.plate.trim() : '?').replace('{b}', byT.b ? byT.b.plate.trim() : '?') === bl.intro.trim());
          if (!introOk) out.push(`${L}: intro "${bl.intro.trim()}" is not a bank intro filled with the plates`);
        });
      } else if (x.layout === 'possessive') {
        const P = bank.possessive;
        const V = vocab();
        if (x.chipW !== P.chipW) out.push(`possessive: rendered chipW ${x.chipW} != bank ${P.chipW}`);
        x.lanes.forEach((ln, i) => {
          const L = `possessive lane ${i + 1}`;
          const k = keyCheck(ln.pics.map((p) => p.key), ln.names, ln.ownerKey, L);
          if (!k) return;
          const thing = P.things.find((t) => t.key === ln.thingKey);
          if (!thing) { out.push(`${L}: thing "${ln.thingKey}" not in the bank`); return; }
          const want = TYPE.possForm(bank, k, thing);
          if (want !== ln.chipKey) out.push(`${L}: chip ${ln.chipKey} != possForm(${k}, ${thing.key}) ${want}`);
          if (ln.chips.findIndex((c) => c.correct) !== ln.chipKey) out.push(`${L}: the DOM's correct chip != chip-key`);
          if (ln.chips.map((c) => c.label).join('|') !== P.chips.join('|')) out.push(`${L}: chips ${ln.chips.map((c) => c.label).join('|')} != ${P.chips.join('|')}`);
          if (ln.thingSrc !== fileUri(thing.pic.theme, thing.pic.noun)) out.push(`${L}: thing src != fileUri(${thing.pic.theme}, ${thing.pic.noun})`);
          const e = V[thing.key][loc];
          const frame = ln.num === 'pl' ? P.frame.pl : P.frame.sg;
          const wantText = TYPE.fillSubject(frame, ln.names, bank.and, bank.andBefore).replace('{thing}', require('../lib/b2-common.js').displayWord(e[0], loc)).replace('{art}', P.artTable ? P.artTable[e[2]] : '').replace('___', '').replace(/\s+/g, ' ').trim();
          if (ln.text.replace(/\s+/g, ' ').trim() !== wantText) out.push(`${L}: frame "${ln.text.replace(/\s+/g, ' ').trim()}" != "${wantText}"`);
          ln.chips.forEach((c) => { if (c.textW > c.w + 0.6) out.push(`${L}: chip "${c.label}" text ${c.textW} overflows its ${c.w} pill`); if (Math.abs(c.w - P.chipW) > 1) out.push(`${L}: chip ${c.w.toFixed(1)} wide != chipW ${P.chipW}`); });
          picsOk(ln.pics, L, 36); namesOk(ln.names, L);
        });
      } else if (x.layout === 'sort') {
        if (x.bins.map((b) => b.head).join('|') !== bank.chips.join('|')) out.push(`sort: heads ${x.bins.map((b) => b.head).join('|')} != chips ${bank.chips.join('|')}`);
        x.cards.forEach((c, i) => {
          const L = `sort card ${i + 1}`;
          if (/^obj:/.test(c.itemKey)) { const o = bank.objects.find((ob) => ob.key === c.refs[0]); if (!o) { out.push(`${L}: object "${c.refs[0]}" not in the bank`); return; } const code = vocab()[o.key][loc][2]; if ('obj:' + code !== c.itemKey || bank.objectMap[code] !== c.bin) out.push(`${L}: object ${o.key} code ${code}: key ${c.itemKey} / bin ${c.bin}`); if (c.caption !== require('../lib/b2-common.js').displayWord(vocab()[o.key][loc][0], loc)) out.push(`${L}: object caption "${c.caption}"`); return; }
          const k = keyCheck(c.refs, c.names, c.itemKey, L);
          if (!k) return;
          if (TYPE.answerChip(bank, 'sort', k) !== c.bin) out.push(`${L}: bin ${c.bin} != map.sort.${k}`);
          const want = TYPE.fillSubject('{subj}', c.names, bank.and, bank.andBefore);
          if (c.caption !== want) out.push(`${L}: caption "${c.caption}" != "${want}"`);
          picsOk(c.pics, L, 44); namesOk(c.names, L);
        });
        if (x.dropped) out.push(`sort: ${x.dropped} card(s) dropped to fit the bins (a re-deal should have found a deal)`);
      }
      return out;
    };

    const faceRender = async (face, { type = SPECS[face], bank = en, loc = 'en', strings, baseName, expectFail = null, label } = {}) => {
      const r = await renderWith(page, type, { difficulty: 2, baseName: baseName || `${type.id}-gate-d2-${loc}`, strings, locale: loc });
      const x = await extractFace();
      const cc = crossCheckFace(x, bank, loc);
      const tag = label || `${face} ${loc}${strings ? ' ' + (strings === CHROME.three || strings === CHROME.threeFr ? '3+3' : '677') : ''}`;
      if (expectFail) {
        const all2 = [...r.verify, ...r.lints];
        ok(all2.some((f) => expectFail.test(f)), `${tag}: expected a ${expectFail} failure, got ${JSON.stringify(all2)}`);
      } else {
        ok(r.verify.length === 0, `${tag}: verify ${JSON.stringify(r.verify)}`);
        ok(r.lints.length === 0, `${tag}: lints ${JSON.stringify(r.lints)}`);
        ok(cc.length === 0, `${tag}: node cross-check ${cc.join(' | ')}`);
        ok(r.m.lowest <= r.m.foot + 0.6, `${tag}: lowest ink ${Math.round(r.m.lowest)} vs foot ${Math.round(r.m.foot)}`);
      }
      return { r, x, cc };
    };
    const stackOf = (x) => (x.layout === 'sort' ? Math.max(...x.bins.map((b) => b.bottom)) - x.shelfTop : x.gridBottom - x.rootTop);

    // ---- 5a. every face at d2 en, the default chrome + the 3+3 (710) chrome + the 677 chrome
    const FLOORS = { replace: 700, anaphora: 610, possessive: 700, sort: 660, rewrite: 660 };
    for (const face of TYPE.FACES) {
      const a = await faceRender(face);
      const stack = stackOf(a.x);
      ok(stack >= FLOORS[face], `${face} en: stack ${Math.round(stack)} < floor ${FLOORS[face]} (sparse)`);
      const b = await faceRender(face, { strings: CHROME.three, baseName: `${SPECS[face].id}-gate-d2-en-chrome722` });
      ok(b.x.body.h <= 724 && b.x.body.h >= 700, `${face} 3+3 chrome: body ${Math.round(b.x.body.h)} (measured 710)`);
      const line = (x) => (x.layout === 'sort' ? `stack ${Math.round(stackOf(x))} bins ${x.bins.map((bb) => bb.lines + '@' + bb.gapY).join('/')} ${x.binLayout}` : `stack ${Math.round(stackOf(x))} lanes ${(x.lanes || x.blocks).map((l) => Math.round(l.h)).join('/')}`);
      console.log(`render ${SPECS[face].id} ${face} en: verify ${a.r.verify.length} lints ${a.r.lints.length} body ${Math.round(a.x.body.h)} ${line(a.x)} · 3+3 chrome body ${Math.round(b.x.body.h)} ${line(b.x)}`);
      const fits677 = ['anaphora', 'sort', 'rewrite'].includes(face);
      if (fits677) {
        const c = await faceRender(face, { strings: CHROME.fourClean, baseName: `${SPECS[face].id}-gate-d2-en-chrome677` });
        ok(c.x.body.h <= 690, `${face} 677 chrome: body ${Math.round(c.x.body.h)}`);
        console.log(`render ${SPECS[face].id} ${face} en 677 chrome: verify ${c.r.verify.length} lints ${c.r.lints.length} body ${Math.round(c.x.body.h)} ${line(c.x)}`);
      } else {
        // F1 (704) and F3 (706) do NOT fit a four-line title: the fi F1 title is validated <= 3 lines (rule 13); F3 has no fi
        const c = await faceRender(face, { strings: CHROME.fourClean, baseName: `${SPECS[face].id}-gate-d2-en-chrome677`, expectFail: /footer|under the body|spills|overflow/ });
        console.log(`render ${SPECS[face].id} ${face} en 677 chrome: FAILS as designed (${[...c.r.verify, ...c.r.lints][0]})`);
      }
    }

    // ---- 5b. the synthetic locale classes (structure; the real blocks are the panels'): de objects + ownerEnding, fr four + grid + thingAgree, nl objects, fi two
    if (!QUICK) {
      const SYN = { de: synthetic('de', en), fr: synthetic('fr', en), nl: synthetic('nl', en), fi: synthetic('fi', en) };
      const plan = [['de', 'replace'], ['de', 'possessive'], ['de', 'sort'], ['de', 'rewrite'], ['fr', 'replace'], ['fr', 'possessive'], ['fr', 'sort'], ['nl', 'sort'], ['nl', 'possessive'], ['fi', 'anaphora'], ['fi', 'sort'], ['fi', 'replace'], ['fi', 'rewrite']];
      for (const [loc, face] of plan) {
        const type = withBank(SPECS[face], SYN[loc]);
        const strings = face === 'sort' && loc === 'fr' ? CHROME.threeFr : undefined;   // the 4-bin grid must fit the 710 budget (a 3-line title under fr chrome)
        const a = await faceRender(face, { type, bank: SYN[loc], loc, strings, baseName: `${SPECS[face].id}-gate-d2-${loc}-synthetic${strings ? '-chrome722' : ''}`, label: `synthetic ${loc} ${face}` });
        const x = a.x;
        if (strings) ok(x.body.h >= 700 && x.body.h <= 724, `synthetic ${loc} ${face}: the 3-line fixture gave body ${Math.round(x.body.h)} (want ~710)`);
        if (face === 'sort') {
          const wantLayout = SYN[loc].chips.length === 4 ? 'grid' : 'row';
          ok(x.binLayout === wantLayout, `synthetic ${loc} sort: binLayout ${x.binLayout} (want ${wantLayout})`);
          ok(x.bins.every((b) => b.w >= 175), `synthetic ${loc} sort: bin widths ${x.bins.map((b) => Math.round(b.w)).join('/')} (>= 175)`);
          if (loc === 'de' || loc === 'nl') ok(x.cards.filter((c) => /^obj:/.test(c.itemKey)).length === 4 && x.cards.some((c) => c.bin === SYN[loc].chips.length - 1), `synthetic ${loc} sort: 4 object cards and the neuter bin fillable`);
          if (loc === 'fi') ok(x.bins.length === 2 && x.cards.some((c) => c.itemKey === 'p'), 'synthetic fi sort: 2 bins with pair cards');
        }
        if (face === 'possessive') {
          if (loc === 'de') ok(x.possClass === 'ownerEnding' && x.lanes.every((l) => l.pics.length === 1) && x.lanes[0].chips.length === 4, `synthetic de possessive: class ${x.possClass}, single owners, 4 chips`);
          if (loc === 'fr') ok(x.possClass === 'thingAgree' && x.lanes.some((l) => l.pics.length === 2), `synthetic fr possessive: class ${x.possClass} with pair owners`);
          if (loc === 'nl') ok(x.possClass === 'owner', `synthetic nl possessive: class ${x.possClass}`);
        }
        if (face === 'anaphora') ok(x.blocks.every((b) => b.referents.some((rf) => rf.pics.length === 2) && b.referents.some((rf) => rf.pics.length === 1)) && x.blocks.every((b) => b.sentences.map((s) => s.pronoun).sort().join('|') === 'He|Hän'), 'synthetic fi anaphora: one name + one pair per block, Hän + He');
        if (face === 'replace' && loc === 'de') ok(x.lanes.filter((l) => l.answer === 'Sie').length >= 3 && x.lanes.filter((l) => l.answer === 'Er').length >= 2, `synthetic de replace: answers ${x.lanes.map((l) => l.answer).join('/')} (pairs -> Sie, >= 2 Er)`);
        if (face === 'rewrite' && loc === 'fi') ok(x.lanes.filter((l) => l.answer.startsWith('He ')).length === 3, `synthetic fi rewrite: answers ${x.lanes.map((l) => l.answer.split(' ')[0]).join('/')}`);
        console.log(`render synthetic ${loc} ${face}: verify ${a.r.verify.length} lints ${a.r.lints.length} cross ${a.cc.length} stack ${Math.round(stackOf(x))}`);
      }
      // the es refusal: the possessive face REFUSES on a refusing bank (never a page)
      { let m = null; try { withBank(SPECS.possessive, synthetic('es', en)).build({ theme: null, difficulty: 2, locale: 'es' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && /refuses the possessive face/.test(m), `es possessive: ${m || 'did NOT refuse'}`); }
      { let m = null; try { withBank(SPECS.possessive, synthetic('fi', en)).build({ theme: null, difficulty: 2, locale: 'fi' }, { rng: makeRng('x') }); } catch (e) { m = e.message; } ok(m && /refuses the possessive face/.test(m), `fi possessive: ${m || 'did NOT refuse'}`); }
    }

    // ---- 5c. the face sweep: 20 seeds x 5 faces (build only)
    if (!QUICK) {
      for (const face of TYPE.FACES) {
        const sp = SPECS[face];
        const sets = new Set(), orders = new Set(), extra = new Set();
        let bankDiffers = 0;
        for (let s = 1; s <= 20; s++) {
          const rng = makeRng(instanceSeed({ typeId: sp.id, theme: null, difficulty: 2, seedEpoch: 1, variant: s }));
          const b = sp.build({ theme: null, difficulty: 2, locale: 'en' }, { rng });
          const m = b.meta;
          const rows = m.items || m.lanes || m.cards || m.blocks;
          const people = m.blocks ? m.blocks.flatMap(([, refs]) => refs.split(' ').flatMap((x) => x.split(':')[1].split('+'))) : rows.flatMap((row) => row[2].split('+'));
          ok(new Set(people).size === people.length, `sweep ${face} seed ${s}: a portrait twice`);
          if (!m.blocks) { const nm = rows.flatMap((row) => row[3].split('+').filter(Boolean)); ok(new Set(nm).size === nm.length, `sweep ${face} seed ${s}: a name twice`); }
          if (m.items || m.cards) rows.forEach(([key, chip, ks]) => { if (/^obj:/.test(key)) return; const refs = ks.split('+').map((k) => ({ key: k, depicted: OPENED[k][1] })); ok(TYPE.keyOf(refs, en) === key && TYPE.answerChip(en, face, key) === chip, `sweep ${face} seed ${s}: key ${key} / chip ${chip} not re-derived`); });
          if (m.lanes) rows.forEach(([key, chip, ks, , thing]) => { const refs = ks.split('+').map((k) => ({ key: k, depicted: OPENED[k][1] })); ok(TYPE.keyOf(refs, en) === key && TYPE.possForm(en, key, en.possessive.things.find((t) => t.key === thing)) === chip, `sweep ${face} seed ${s}: possForm(${key}, ${thing}) != ${chip}`); });
          if (m.cards) ok(m.dropped === 0, `sweep ${face} seed ${s}: ${m.dropped} card(s) dropped`);
          if (face === 'replace') { const bw = [...b.bodyHtml.matchAll(/data-lcs-bank-word="([^"]+)"/g)].map((x) => x[1]); if (bw.join('|') !== en.initial.join('|')) bankDiffers++; }
          if (face === 'anaphora') m.blocks.forEach(([, , assign]) => extra.add(assign.split(' ').map((a) => a.split('>')[1]).join('')));
          if (face === 'possessive') extra.add(rows.map((row) => row[4]).sort().join(','));
          sets.add(people.slice().sort().join(',')); orders.add(people.join(','));
        }
        ok(sets.size >= 2 && orders.size >= 2, `sweep ${face}: ${sets.size} distinct sets / ${orders.size} orders over 20 seeds`);
        if (face === 'replace') ok(bankDiffers >= 1, `sweep replace: the bank order equals the chip order on every seed (${bankDiffers} differ)`);
        if (face === 'anaphora') ok(extra.size >= 2, `sweep anaphora: the sentence -> referent assignment never varies`);
        if (face === 'possessive') ok(extra.size >= 2, `sweep possessive: the thing set never varies`);
        console.log(`sweep ${face}: 20 seeds, ${sets.size} distinct sets, ${orders.size} distinct orders${face === 'replace' ? `, bank order != chip order on ${bankDiffers}` : ''}${extra.size ? `, ${extra.size} variants` : ''}`);
      }
    }

    // ---- 5d. face poisons — config guards (throws), bank rules, render + sparse poisons
    console.log('--- face poisons');
    const throwsFace = (name, face, over, re, bank = en, loc = 'en') => {
      const sp = SPECS[face];
      const type = { ...sp, difficulty: { 2: { ...sp.difficulty[2], ...over } } };
      let m = null;
      poisonTotal++;
      try { type._buildWith(bank, type.difficulty[2], { locale: loc }, { rng: makeRng('poison') }); } catch (e) { m = e.message; }
      if (!m) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT (built)`); }
      else if (!re.test(m)) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${m}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${m.slice(0, 100)})`); }
    };
    throwsFace('PC1 replace bank:false', 'replace', { bank: false }, /bank must be true/);
    throwsFace('PC2 rewrite bank:true', 'rewrite', { bank: true }, /ruling must be true and bank false/);
    throwsFace('PC3 rewrite glyphH 20', 'rewrite', { glyphH: 20 }, /glyphH 20 < the G2 floor 24/);
    throwsFace('PC4 anaphora pairs 3', 'anaphora', { pairs: 3 }, /pairs 3 outside \[4, 6\]/);
    throwsFace('PC5 sort lineGap 20', 'sort', { lineGap: 20 }, /lineGap/);
    throwsFace('PC6 possessive maxLine 60', 'possessive', { maxLine: 60 }, /maxLine 60 outside/);
    throwsFace('PC7 replace pic 40', 'replace', { pic: 40 }, /below the G1 floor 44/);
    throwsFace('PC8 de possessive with pair owners', 'possessive', { ending: { singles: 7, pairs: 1, pairMix: 'xp' } }, /single owners only|pairs need frame\.pl/, synthetic('de', en), 'de');
    throwsFace('PC9 sort split 6 + 2 (8 cards for ten)', 'sort', { singles: 6, pairs: 2 }, /singles 6 \+ pairs 2 \+ objects 0 != cards 10/);
    throwsFace('PC10 unknown layout', 'replace', { layout: 'circle' }, /unknown layout "circle"/);
    { const bad = clone(en); bad.possessive.chipW = 40; poison('PB1 possessive.chipW 40', bad, 'en', /rule 6: possessive chipW 40/); }
    { const bad = clone(en); bad.possessive.chipW = 300; poison('PB2 possessive.chipW 300', bad, 'en', /rule 6: possessive chipW 300|do not fit/); }
    { const bad = clone(en); delete bad.possessive.chipW; poison('PB3 possessive.chipW missing', bad, 'en', /rule 6: possessive chipW/); }

    const facePoison = async (name, face, fn, re, { type = SPECS[face], bank = en, loc = 'en', strings } = {}) => {
      const t = fn.length === 0 ? fn() : mutated(type, fn);
      const r = await renderWith(page, t, { difficulty: 2, baseName: `${SPECS[face].id}-gate-poison-${name.split(' ')[0]}`, strings, locale: loc });
      const x = await extractFace();
      const all2 = [...r.verify, ...r.lints, ...crossCheckFace(x, bank, loc)];
      const hit = all2.filter((f) => re.test(f));
      poisonTotal++;
      if (!all2.length) { fails++; asserts++; console.log(`  FAIL ${name}: SILENT`); }
      else if (!hit.length) { fails++; asserts++; console.log(`  FAIL ${name}: WRONG REASON — ${all2.slice(0, 4).join(' | ')}`); }
      else { asserts++; killed++; console.log(`  poison ${name}: killed (${hit[0].slice(0, 110)})`); }
    };
    const must = (h, a, b, what) => { if (!h.includes(a)) throw new Error(`poison ${what}: needle matched nothing (${a.slice(0, 60)})`); return h.replace(a, b); };
    // F1
    await facePoison('PR11 F1 line 2 != line 1 minus its subject', 'replace', (h) => must(h, 'data-lcs-line2', 'data-lcs-line2 data-x', 'PR11').replace(/(<p data-lcs-line2 data-x[^>]*>[\s\S]*?<\/span>)([^<]+)/, '$1eats a cake.'), /line 2 .* is not line 1|line 2 .* != the literal/);
    await facePoison('PR12 F1 a portrait src twice', 'replace', (h) => { const s = [...h.matchAll(/src="([^"]+)"/g)].map((m) => m[1]); return must(h, `src="${s[1]}"`, `src="${s[0]}"`, 'PR12'); }, /src twice/);
    await facePoison('PN1 F1 an answer stamp edited (the box would take the wrong word)', 'replace', (h) => { const m = /data-lcs-key="f1" data-lcs-answer="She"/.exec(h); if (!m) throw new Error('PN1: no f1 lane'); return h.replace(m[0], 'data-lcs-key="f1" data-lcs-answer="He"'); }, /answer "He" != initial\[map\.replace\.f1\]/);
    await facePoison('PR13 F1 a bank word printed in the sentence', 'replace', (h) => h.replace(/(<p data-lcs-line1[^>]*>)([^<]+)/, '$1$2 They ride.'), /bank word "They" is printed|printed ".*" !=/);
    await facePoison('PS1 F1 rows fixed at 74 px (the grid floats above the body bottom)', 'replace', (h) => must(h, 'minmax(74px,1fr)', 'minmax(74px,74px)', 'PS1'), /lanes end \d+ px above the body bottom/);
    await facePoison('PS1b F1 the lane grid floating under the bank', 'replace', (h) => must(h, 'data-lcs-lanes style="flex:1;', 'data-lcs-lanes style="flex:0 0 auto;margin-top:120px;', 'PS1b'), /starts \d+ px under the stage top|lanes end \d+ px above/);
    // F2
    await facePoison('PR2 F2 two "He" sentences on one block', 'anaphora', (h) => { const i = h.indexOf('data-lcs-pronoun="She"'); if (i < 0) throw new Error('PR2: no She'); const j = h.indexOf('</span>', i); return h.slice(0, i) + 'data-lcs-pronoun="He"' + h.slice(i + 'data-lcs-pronoun="She"'.length, j).replace('>She<', '>He<') + h.slice(j); }, /no single solution/);
    await facePoison('PR5 F2 a chef (minPx 56) rendered at 44', 'anaphora', (h) => { const m = /data-lcs-pic="(\w+)"/.exec(h); const src = fileUri('occupations', 'chef'); const i = h.lastIndexOf('<img', m.index); const j = h.indexOf('>', m.index); return h.slice(0, i) + `<img class="ws-icon" src="${src}" alt="" data-lcs-pic="chef" style="width:44px;height:44px;flex:0 0 auto"` + h.slice(j); }, /below its minPx 56/);
    await facePoison('PR14 F2 a name inside a pronoun sentence', 'anaphora', (h) => { const m = /data-lcs-a="(\w+)"/.exec(h); return h.replace(/(<div data-lcs-anaphor[\s\S]*?<span style="[^"]*">)([^<]+)/, `$1${m[1]} $2`); }, /sits in the sentence|is not a bank sentence/);
    await facePoison('PR15 F2 a line pre-drawn in the zone', 'anaphora', (h) => must(h, '<div data-lcs-zone></div>', '<div data-lcs-zone><svg width="70" height="40"><line x1="0" y1="20" x2="70" y2="20" stroke="#146B5E"/></svg></div>', 'PR15'), /pre-drawn|zone is not empty/);
    await facePoison('PS2 F2 blocks fixed at 116 px', 'anaphora', (h) => must(h, 'minmax(116px,1fr)', 'minmax(116px,116px)', 'PS2'), /lanes end \d+ px above the body bottom/);
    // F3
    await facePoison('PR6 F3 chips reordered on one lane', 'possessive', (h) => { const i = h.indexOf('<div class="ws-achips"'); const j = h.indexOf('</div>', i); const seg = h.slice(i, j); const chips = seg.match(/<span class="ws-achip"[\s\S]*?<\/span>/g); return h.slice(0, i) + seg.replace(chips.join(''), chips.slice().reverse().join('')) + h.slice(j); }, /position leak/);
    await facePoison('PR16 F3 a chip label printed in the frame', 'possessive', (h) => h.replace(/(<p data-lcs-frametext[^>]*>[^<]*?)(<span class="ws-blankbox")/, '$1his $2'), /chip "his" is printed|frame ".*" !=/);
    await facePoison('PN3 F3 an owner key edited', 'possessive', (h) => { const m = /data-lcs-owner="f1"/.exec(h); if (!m) throw new Error('PN3: no f1 lane'); return h.replace(m[0], 'data-lcs-owner="m1"'); }, /stamped key m1, re-derived f1/);
    await facePoison('PR3 de F3 an article before the box', 'possessive', (h) => must(h, 'Das ist <span class="ws-blankbox"', 'Das ist der <span class="ws-blankbox"', 'PR3'), /an article "der" sits before the box/, { type: withBank(SPECS.possessive, synthetic('de', en)), bank: synthetic('de', en), loc: 'de' });
    await facePoison('PS3 F3 lanes fixed at 83 px', 'possessive', (h) => must(h, 'minmax(83px,1fr)', 'minmax(83px,83px)', 'PS3'), /lanes end \d+ px above the body bottom/);
    // F4
    await facePoison('PN4 F4 a card key edited', 'sort', (h) => { const m = /data-lcs-item-key="f1"/.exec(h); if (!m) throw new Error('PN4: no f1 card'); return h.replace(m[0], 'data-lcs-item-key="m1"'); }, /stamped key m1, re-derived f1/);
    await facePoison('PR17 F4 a card pre-placed in a bin', 'sort', (h) => must(h, '<div class="ws-bin"', '<div class="ws-bin" data-x', 'PR17').replace(/(<div class="ws-bin" data-x[^>]*>)/, '$1<span data-lcs-sortword="Mia">Mia</span>'), /pre-placed|cards, config says/);
    await facePoison('PR18 F4 a bin head not a chip', 'sort', (h) => must(h, 'data-lcs-sorthead="2">they', 'data-lcs-sorthead="2">it', 'PR18'), /heads .* != chips/);
    await facePoison('PS4 F4 the design\'s 330 bins with 4 lines (the stack floats above a 300 px blank)', 'sort', () => { const sp = SPECS.sort; return { ...sp, difficulty: { 2: { ...sp.difficulty[2], binH: 330 } } }; }, /stack \d+ px < 660|slack \d+ px under the bins|last line sits \d+ px above the bin bottom/);
    await facePoison('PS4b F4 lines that do not fill the bin', 'sort', (h) => h.replace(/data-lcs-lines="7"/g, 'data-lcs-lines="4"').replace(/<line x1="8" y1="(255|306|357)"[^>]*\/>/g, ''), /last line sits \d+ px above the bin bottom|drawn lines, stamped/);
    await facePoison('PR9 F4 a 4-bin page declared a row', 'sort', (h) => must(h, 'data-lcs-binlayout="grid"', 'data-lcs-binlayout="row"', 'PR9'), /binLayout row with 4 bins/, { type: withBank(SPECS.sort, synthetic('fr', en)), bank: synthetic('fr', en), loc: 'fr', strings: CHROME.threeFr });
    // F5
    await facePoison('PR4 F5 a starter on the writing row', 'rewrite', (h) => { const m = /data-lcs-answer="([^"]+)"/.exec(h); return must(h, '<line', `<text data-lcs-starter="1" x="8" y="30" font-size="20">${m[1]}</text><line`, 'PR4'); }, /starter is printed|not empty|answer sentence is printed/);
    await facePoison('PR4b F5 a bank banner injected', 'rewrite', (h) => must(h, '<div data-lcs-lanes', C4.initialBank({ words: en.initial, rng: makeRng('p'), chipOrder: en.initial }) + '<div data-lcs-lanes', 'PR4b'), /a bank \/ chip is printed/);
    await facePoison('PR19 F5 the pronoun printed in the sentence', 'rewrite', (h) => { const m = /data-lcs-key="m1" data-lcs-answer="He ([^"]+)"[\s\S]*?<p data-lcs-sentence[^>]*>([^<]+)</.exec(h); if (!m) throw new Error('PR19: no m1 row'); return h.replace(`>${m[2]}<`, `>He ${m[2]}<`); }, /pronoun "He" is printed|printed ".*" !=/);
    await facePoison('PN5 F5 an answer stamp edited', 'rewrite', (h) => { const m = /data-lcs-key="f1" data-lcs-answer="She ([^"]+)"/.exec(h); if (!m) throw new Error('PN5: no f1 row'); return h.replace(m[0], `data-lcs-key="f1" data-lcs-answer="He ${m[1]}"`); }, /answer "He .*" != /);
    await facePoison('PS5 F5 rows fixed at 77 px', 'rewrite', (h) => must(h, 'minmax(77px,1fr)', 'minmax(77px,77px)', 'PS5'), /lanes end \d+ px above the body bottom/);
    await facePoison('PR20 F5 the writing row narrowed under need', 'rewrite', (h) => h.replace(/width="535" height="48" viewBox="0 0 535 48"/g, 'width="300" height="48" viewBox="0 0 300 48"'), /writing row 300 px < /);

  } finally {
    await browser.close();
  }
  console.log(`\nverify-b4-pronouns: ${asserts} assertions, ${fails} failures in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  console.log(fails ? `FAIL (${asserts} assertions, ${fails} failures, ${killed}/${poisonTotal} poisons killed)` : `PASS (${asserts} assertions, ${killed}/${poisonTotal} poisons killed${QUICK ? ', --quick: sweeps + synthetic-locale face renders skipped' : ''})`);
  process.exit(fails ? 1 : 0);
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });

module.exports = { validateBank, crossCheck, OPENED, EXCLUDED, TABLE_B };
