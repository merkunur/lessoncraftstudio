/**
 * pron-common.js — Level Set 2026-09-28 (Personal Pronouns): a native panel's output -> the Level Set shape
 * G1-352's mergedBank() reads (data/b4/pronouns-levelset.json), and the merged bank for validation.
 *
 * The published bank (data/b4/pronouns.js + locales) is never touched: new copies read published + Level Set.
 *
 * PORTRAITS opened in session 2026-09-28 (contact sheets pron-portraits*.png): only files the design left
 * UNOPENED (the second file of a published key) or never considered (the B&W faces + farmer). Every file the
 * design opened and REFUSED (EXCLUDED in qa/verify-b4-pronouns.js: firefighter visor, a toddler, a child in a
 * helmet, faces too small at 44 …) stays out.
 */
'use strict';
const { bank } = require('../../lib/b4-common.js');
const TYPE = require('../../types/g1/G1-352-pronouns.js');

// key -> [theme, noun, depicted, minPx]
const LS_OPENED = {
  doctor_hospital: ['hospital', 'doctor', 'm', 44],       // bearded bust, stethoscope
  nurse_hospital: ['hospital', 'nurse', 'f', 44],         // bust, cap + tablet
  teacher_classroom: ['classroom', 'teacher', 'f', 44],   // bust, long hair + book
  librarian_classroom: ['classroom', 'librarian', 'f', 44], // bust, long hair, writing
  singer_music: ['music', 'singer', 'f', 44],             // bust, curls + microphone
  // the B&W faces + farmer were opened too and left out: the builder keeps a page's portraits in one (colour) style
};
const LS_PEOPLE = Object.entries(LS_OPENED).map(([key, [theme, noun, depicted, minPx]]) => ({ key, pic: { theme, noun }, depicted, minPx, picOpened: true }));

// the printed level instructions a panel supplies (only where a level changes what the child does) + the screen
const INSTR_KEYS = ['G1-352_L3', 'G1-371_L3', 'G2-354_L3', 'G2-355_L1'];
const SCREEN_KEYS = ['base', 'replace', 'anaphora', 'possessive', 'sort', 'rewrite'];

/** A panel file -> the Level Set block for its locale. Refuses entries that could not be right on any page. */
function toLevelset(loc, P) {
  const pub = bank('pronouns', loc);
  const refused = [];
  const nfd = (s) => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  const pubNames = new Set(pub.names.map((n) => nfd(n.name)));
  const names = (P.names || []).filter((n) => { if (pubNames.has(nfd(n.name))) { refused.push('name ' + n.name + ' (published)'); return false; } return true; });
  const pubIds = new Set([...(pub.frames || []).map((f) => f.id), ...(pub.anaphora || []).map((a) => a.id)]);
  const uniq = (arr, what) => (arr || []).filter((x) => { if (pubIds.has(x.id)) { refused.push(what + ' ' + x.id + ' (published id)'); return false; } return true; });
  const things = (P.things || []).map((t) => ({ key: t.key, pic: t.pic, ...(t.forms ? { forms: t.forms } : {}), picOpened: true }));
  return {
    names,
    frames: uniq(P.frames, 'frame'),
    anaphora: uniq(P.anaphora, 'anaphora').map((a) => ({ ...a, contentNeutral: true })),
    anaphoraSgpl: uniq(P.anaphoraSgpl, 'sgpl').map((a) => ({ ...a, contentNeutral: true })),
    things: pub.possessive && !(pub.refuse && pub.refuse.possessive) ? things : [],
    ...(refused.length ? { refused } : {}),
  };
}

/** The bank a NEW copy reads (mirrors G1-352 mergedBank) — for validation before the import. */
function mergeForCheck(loc, ls) {
  const b = bank('pronouns', loc);
  const m = {
    ...b,
    people: [...b.people, ...LS_PEOPLE],
    names: [...b.names, ...ls.names],
    frames: [...b.frames, ...ls.frames],
    anaphora: [...b.anaphora, ...ls.anaphora],
    anaphoraSgpl: ls.anaphoraSgpl || [],
  };
  if (b.possessive && ls.things && ls.things.length) m.possessive = { ...b.possessive, things: [...b.possessive.things, ...ls.things] };
  return m;
}

/**
 * The level-3 "one person + a pair" frames (non-fi). TWO intro clauses put the single person and the pair in
 * DIFFERENT places (introA "{a} is at home." / introB "{b} are at the park.") so "they" can only mean the pair —
 * one shared intro ("Mia, Tom and Leo are at the zoo. They …") lets "they" mean all three (the fr + en panels,
 * 2026-09-28). Each clause filled with the longest names <= 42; one sg + one pl sentence starting {P}, each <= 36
 * with the longest pronoun; no name / pronoun inside a sentence. The page draws the single person as a BOY where
 * the locale's she and they are one word (de sie, nl zij), so the pronoun alone tells them apart.
 */
function checkSgpl(loc, m) {
  const out = [];
  if (loc === 'fi') { if ((m.anaphoraSgpl || []).length) out.push('fi: anaphoraSgpl must be empty (the published anaphora is already sg + pl)'); return out; }
  const list = m.anaphoraSgpl || [];
  if (list.length < 12) out.push(`sgpl: ${list.length} frames < 12`);
  const byLen = (g) => m.names.filter((n) => !g || n.gender === g).map((n) => n.name).sort((a, b) => [...b].length - [...a].length);
  const longest1 = byLen()[0], pair = TYPE.fillSubject('{subj}', byLen().slice(0, 2), m.and, m.andBefore);
  const longestInit = m.initial.slice().sort((x, y) => [...y].length - [...x].length)[0];
  const ids = new Set();
  const once = (t, k) => String(t).split('{' + k + '}').length === 2;
  const has = (t, k) => String(t).includes('{' + k + '}');
  const wordIn = (w, text) => new RegExp(String.raw`(?<!\p{L})` + String(w).toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + String.raw`(?!\p{L})`, 'u').test(text);
  for (const a of list) {
    if (ids.has(a.id)) out.push(`sgpl ${a.id} twice`); ids.add(a.id);
    if ('intro' in a) out.push(`sgpl ${a.id}: a single shared intro is ambiguous — use introA + introB`);
    const A = String(a.introA || ''), B = String(a.introB || '');
    if (!once(A, 'a') || has(A, 'b')) out.push(`sgpl ${a.id}: introA needs {a} once and no {b}`);
    if (!once(B, 'b') || has(B, 'a')) out.push(`sgpl ${a.id}: introB needs {b} once and no {a}`);
    for (const [t, fill, k] of [[A, longest1, '{a}'], [B, pair, '{b}']]) {
      if (!/[.!]$/.test(t.trim())) out.push(`sgpl ${a.id}: "${t}" must end with "."`);
      const filled = t.replace(k, fill);
      if ([...filled].length > 42) out.push(`sgpl ${a.id}: "${filled}" is ${[...filled].length} > 42`);
    }
    if (!Array.isArray(a.s) || a.s.length !== 2 || a.s.map((s) => s.key).sort().join('|') !== 'pl|sg') { out.push(`sgpl ${a.id}: needs one sg + one pl sentence`); continue; }
    for (const s of a.s) {
      const t = String(s.text);
      if (!t.startsWith('{P} ')) out.push(`sgpl ${a.id}: "${t}" does not start with {P}`);
      if ([...t.replace('{P}', longestInit)].length > 36) out.push(`sgpl ${a.id}: "${t}" > 36 chars`);
      const low = t.replace('{P}', '').toLowerCase();
      for (const n of m.names) if (wordIn(n.name, low)) out.push(`sgpl ${a.id}: "${t}" carries the name ${n.name}`);
      for (const c of [...m.chips, ...m.initial]) if (wordIn(c, low)) out.push(`sgpl ${a.id}: "${t}" carries the pronoun ${c}`);
    }
  }
  return out;
}

module.exports = { LS_OPENED, LS_PEOPLE, INSTR_KEYS, SCREEN_KEYS, toLevelset, mergeForCheck, checkSgpl };
