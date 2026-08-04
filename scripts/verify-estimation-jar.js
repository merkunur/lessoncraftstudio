#!/usr/bin/env node
/* =====================================================================
   verify-estimation-jar.js — build-gate for TOOL #23 Estimation Jar:
   the locale-neutral object sets (mini tools/estimation-jar-sets.json)
   AND the tool source (mini tools/estimation-jar.js).

   THE TWO DOCTRINE INVARIANTS THIS GATE EXISTS FOR
   ------------------------------------------------
   An estimation jar is, in most classrooms, a competition. This one must
   never be. Both rules are mirrored from the already-gate-proven
   `mini tools/estimate-jar-core.js` (its header: "NO ACCURACY GRADIENT …
   no distance metric, no stored gap, no 'close/far'", and `getActual`
   THROWS before the count is finished):

     A. NO ACCURACY GRADIENT — the compare is a SIGN ('same'|'more'|
        'fewer'). No distance, no gap, no rank, no "closest", no winner.
        Asserted on the pure function AND on the shipped strings.
     B. NO NUMERAL LEAK — the true count must not be reachable in the
        DOM/aria/title/live-region before the reveal. Asserted here on
        the pure engine (`revealedCount` refuses pre-reveal); the DOM
        half lives in local-test-estimation-jar.js.

   MEASURED invariants (never loosen a threshold — FIX THE DATA):

   DATA (estimation-jar-sets.json)
     D1  version numeric; freeMax/premiumMax positive ints, free < premium
     D2  set ids unique + non-empty; >= 8 sets; >= 2 free sets
     D3  every noun exists in IMAGE_VOCABULARY
     D4  imageDir is a real pww theme dir AND holds a card whose .f ===
         imageFile and .k === noun  (checked in EVERY locale that ships)
     D5  season is null or one of the UNIVERSAL seasonal keys. The en-only
         keys (4th_of_july, thanksgivinng) are REFUSED: an object set
         gated to one locale would silently empty the picker elsewhere
     D6  no (imageDir,imageFile) pair used twice
     D7  on-disk @2x.webp exists (skipped when the gitignored tree is absent)

   TOOL (vm-loaded, DOM-free)
     T1  id / STORE_KEY / ENT_TRUST_DAYS / premium===false
     T2  strings.title + .instruction present for all 11 locales
     T3  strings completeness + {placeholder} parity against en
     T4  NO-SHAME + NO-RANKING: verdict/score regexes EXTENDED with
         ranking vocabulary per locale (closest / winner / gewinner /
         gagnant / ganador / vincitore / vinnare / voittaja / naermest …)
     T5  every LCSAudio.speak passes lang: AND type in {number, ui}
     T6  CSS injector idempotent; @media print + reduced-motion; no .lcs-
     T7  STRUCTURAL GATE: a locked set is absent from setsFor() when free
     T8  resolveDeepLink refuses a locked set without premium, and refuses
         a count above the free ceiling
     T9  DOCTRINE A — compare() returns a sign only, and no distance/gap/
         rank key can exist on the returned object (solver probe)
     T10 DOCTRINE B — revealedCount() THROWS before the reveal
     T11 groupsOfTen() decomposes correctly and never loses the remainder
     T12 privacyLine present ×11, and the source never puts the estimate
         array in a fetch body

   Usage: node scripts/verify-estimation-jar.js [--locales=en,de]
   Overrides for mutation testing: EJ_DATA_DIR / EJ_TOOL_DIR
   Exit 1 on any ERROR. WARNs never fail.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOLS_DIR = path.join(ROOT, 'mini tools');
const DATA_DIR = process.env.EJ_DATA_DIR || TOOLS_DIR;
const TOOL_DIR = process.env.EJ_TOOL_DIR || TOOLS_DIR;

const ALL = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const arg = process.argv.find(a => a.startsWith('--locales='));
const LOCALES = arg ? arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean) : ALL;

/* Universal seasons only. 4th_of_july + thanksgivinng are en-only in
   frontend/lib/seasonal-hub.ts:45-54, so a set tagged with either would
   vanish from the picker in ten locales. */
const UNIVERSAL_SEASONS = ['christmas', 'easter', 'winter', 'spring', 'summer'];
const EN_ONLY_SEASONS = ['4th_of_july', 'thanksgivinng'];

const VERDICT = {
  en: /\b(correct|incorrect|wrong|oops|try again|fail)\b/i,
  de: /\b(richtig|falsch|fehler)\b/i,
  fr: /\b(correct|correcte|faux|fausse|erreur)\b/i,
  it: /\b(giusto|sbagliato|errore)\b/i,
  es: /\b(correcto|incorrecto|error)\b/i,
  pt: /\b(correto|errado|erro)\b/i,
  nl: /\b(goed antwoord|fout|foutje)\b/i,
  sv: /\b(rätt svar|fel|felaktig)\b/i,
  da: /\b(rigtigt svar|forkert|fejl)\b/i,
  no: /\b(riktig svar|feil)\b/i,
  fi: /\b(oikein|väärin|virhe)\b/i
};

/* THE RANKING BAN — this tool's signature risk. An estimation jar is
   normally won; every locale's "closest / winner" vocabulary is refused. */
const RANKING = {
  en: /\b(closest|nearest|winner|wins|won|best guess|champion)\b/i,
  de: /\b(am nächsten|nächstdran|gewinner|gewinnt|sieger|beste schätzung)\b/i,
  fr: /\b(le plus proche|la plus proche|gagnant|gagne|vainqueur|meilleure)\b/i,
  it: /\b(più vicino|più vicina|vincitore|vince|migliore)\b/i,
  es: /\b(más cerca|más cercano|ganador|gana|mejor)\b/i,
  pt: /\b(mais perto|mais próximo|vencedor|ganha|melhor palpite)\b/i,
  nl: /\b(dichtstbij|het dichtst|winnaar|wint|beste gok)\b/i,
  sv: /\b(närmast|vinnare|vinner|bästa gissning)\b/i,
  da: /\b(tættest|nærmest|vinder|bedste gæt)\b/i,
  no: /\b(nærmest|vinner|beste gjett)\b/i,
  fi: /\b(lähimpänä|lähin|voittaja|voittaa|paras arvaus)\b/i
};
const SCORE_RE = /\b(score|scores|timer|streak|poäng|poeng|punkte|punteggio|puntuación|pontuação|pisteet|niveau|level|badge|reward)\b/i;

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR ' + m); };
const warn = (m) => { WARNS++; console.warn('  warn  ' + m); };

function loadImageVocabulary() {
  const src = fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
  return new Function(src + '; return IMAGE_VOCABULARY;')();
}
function loadPww(locale) {
  const f = path.join(TOOLS_DIR, `pww-index-${locale}.json`);
  if (!fs.existsSync(f)) return null;
  try { return JSON.parse(fs.readFileSync(f, 'utf8')); } catch (_) { return null; }
}

function loadTool(file, globalName) {
  const noop = () => {};
  const fakeEl = () => ({
    style: { setProperty: noop }, classList: { add: noop, remove: noop, toggle: noop, contains: () => false },
    appendChild: noop, addEventListener: noop, setAttribute: noop, removeAttribute: noop,
    innerHTML: '', textContent: '', children: [], dataset: {}, remove: noop
  });
  const sandbox = {
    window: {}, navigator: { language: 'en' }, console,
    document: {
      createElement: fakeEl, createElementNS: fakeEl, getElementById: () => null,
      querySelector: () => null, querySelectorAll: () => [],
      head: { appendChild: noop }, body: { classList: { add: noop, remove: noop } },
      addEventListener: noop, documentElement: fakeEl()
    },
    location: { search: '', hostname: 'gate' },
    localStorage: { getItem: () => null, setItem: noop, removeItem: noop },
    URLSearchParams, Intl, Date, Math, JSON,
    setTimeout: () => 0, clearTimeout: noop, setInterval: () => 0, clearInterval: noop,
    fetch: () => ({ then() { return this; }, catch() { return this; } }),
    matchMedia: () => ({ matches: false, addListener: noop, addEventListener: noop })
  };
  sandbox.global = sandbox; sandbox.self = sandbox;
  vm.createContext(sandbox);
  const src = fs.readFileSync(path.join(TOOL_DIR, file), 'utf8');
  vm.runInContext(src, sandbox, { filename: file });
  return { tool: sandbox[globalName], src };
}

/* ---------------- DATA ---------------- */
function checkSets(data, vocab) {
  /* D1 */
  if (typeof data.version !== 'number') err('D1 version must be a number');
  const fm = data.freeMax, pm = data.premiumMax;
  if (!Number.isInteger(fm) || fm < 1) err('D1 freeMax must be a positive int');
  if (!Number.isInteger(pm) || pm < 1) err('D1 premiumMax must be a positive int');
  if (Number.isInteger(fm) && Number.isInteger(pm) && !(fm < pm))
    err(`D1 freeMax ${fm} must be below premiumMax ${pm}`);

  const sets = data.sets || [];
  /* D2 */
  if (sets.length < 8) err(`D2 ${sets.length} sets, need >= 8`);
  const ids = new Set(), pairs = {};
  let free = 0;
  for (const s of sets) {
    const tag = `[set:${s.id || '?'}]`;
    if (!s.id) { err(`${tag} D2 missing id`); continue; }
    if (ids.has(s.id)) err(`${tag} D2 duplicate id`);
    ids.add(s.id);
    if (s.free) free++;

    /* D3 */
    if (!s.noun) err(`${tag} D3 missing noun`);
    else if (vocab && !vocab[s.noun]) err(`${tag} D3 noun "${s.noun}" not in IMAGE_VOCABULARY`);

    /* D5 */
    if (s.season !== null && s.season !== undefined) {
      if (EN_ONLY_SEASONS.indexOf(s.season) >= 0)
        err(`${tag} D5 season "${s.season}" is en-only in seasonal-hub.ts — the set would vanish from the picker in ten locales`);
      else if (UNIVERSAL_SEASONS.indexOf(s.season) < 0)
        err(`${tag} D5 season "${s.season}" is not a universal seasonal key`);
    }

    /* D6 */
    const p = s.imageDir + '/' + s.imageFile;
    if (pairs[p]) err(`${tag} D6 image "${p}" already used by "${pairs[p]}"`);
    pairs[p] = s.id;

    /* D7 */
    const dir = path.join(ROOT, 'image-library-webp', 'themes');
    if (s.imageDir && s.imageFile && fs.existsSync(dir)
      && !fs.existsSync(path.join(dir, s.imageDir, s.imageFile + '@2x.webp')))
      err(`${tag} D7 missing image ${s.imageDir}/${s.imageFile}@2x.webp`);
  }
  if (free < 2) err(`D2 ${free} free sets, need >= 2`);

  /* D4 — the picture must resolve in EVERY shipping locale, not just en */
  for (const L of LOCALES) {
    const pww = loadPww(L);
    if (!pww) { warn(`[${L}] D4 pww-index missing — image resolution unverified`); continue; }
    const byDir = new Map();
    for (const t of pww.themes || []) {
      const m = new Map();
      for (const c of t.c || []) m.set(c.f, c.k);
      byDir.set(t.d, m);
    }
    for (const s of sets) {
      const theme = byDir.get(s.imageDir);
      if (!theme) { err(`[${L}] D4 set "${s.id}" imageDir "${s.imageDir}" is not a theme dir`); continue; }
      const k = theme.get(s.imageFile);
      if (k === undefined) err(`[${L}] D4 set "${s.id}" "${s.imageDir}/${s.imageFile}" is not a card there`);
      else if (k !== s.noun) err(`[${L}] D4 set "${s.id}" resolves to "${k}", not "${s.noun}"`);
    }
  }
  return { n: sets.length, free };
}

/* ---------------- TOOL ---------------- */
function checkTool(tool, src, data) {
  if (tool.id !== 'estimation-jar') err(`T1 id "${tool.id}" != estimation-jar`);
  if (tool.STORE_KEY !== 'lcs:estimation-jar:v1') err('T1 STORE_KEY wrong');
  if (tool.ENT_TRUST_DAYS !== 14) err('T1 ENT_TRUST_DAYS != 14');
  if (tool.premium !== false) err('T1 premium must default to false');

  const S = tool.strings || {};
  if (!S.title || !S.instruction) err('T2 strings.title and .instruction are shell-mandatory');
  if (!S.privacyLine) err('T12 privacyLine missing — the estimate-anonymity promise');
  for (const k of Object.keys(S)) {
    const row = S[k];
    if (!row || typeof row !== 'object') { err(`T3 strings.${k} not a locale map`); continue; }
    for (const L of ALL) {
      const v = row[L];
      if (typeof v !== 'string' || !v.length) { err(`T3 strings.${k}.${L} missing`); continue; }
      const pe = (row.en.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
      const pl = (v.match(/\{[a-zA-Z]+\}/g) || []).sort().join(',');
      if (pe !== pl) err(`T3 strings.${k}.${L} placeholders "${pl}" != en "${pe}"`);
      if (VERDICT[L] && VERDICT[L].test(v)) err(`T4 strings.${k}.${L} verdict vocabulary: "${v}"`);
      if (RANKING[L] && RANKING[L].test(v)) err(`T4 strings.${k}.${L} RANKING vocabulary — this tool never ranks: "${v}"`);
      if (SCORE_RE.test(v)) err(`T4 strings.${k}.${L} score/timer vocabulary: "${v}"`);
    }
  }

  /* T5 */
  const calls = src.match(/LCSAudio\.speak\(\s*\{[^}]*\}/g) || [];
  if (!calls.length) warn('T5 no LCSAudio.speak call found');
  for (const c of calls) {
    if (!/\blang\s*:/.test(c)) err(`T5 speak without lang: -> ${c.slice(0, 80)}`);
    const m = /\btype\s*:\s*'([a-z]+)'/.exec(c);
    if (!m) err(`T5 speak without a literal type: -> ${c.slice(0, 80)}`);
    else if (['number', 'ui'].indexOf(m[1]) < 0) err(`T5 speak type '${m[1]}' — locked to number|ui`);
  }

  /* T6 */
  if (!/function\s+injectEstimationJarCSS\s*\(/.test(src)) err('T6 injectEstimationJarCSS() not defined');
  if (!/getElementById\(\s*['"]ej-style['"]\s*\)/.test(src)) err('T6 CSS injector not idempotent on #ej-style');
  if (!/@media print/.test(src)) err('T6 no @media print block');
  if (!/prefers-reduced-motion/.test(src)) err('T6 no reduced-motion block');
  const lcsSel = (src.match(/['"][^'"]*\.lcs-[a-z-]+[^'"]*['"]/g) || []).filter(s => !/ej-wide/.test(s));
  if (lcsSel.length) err(`T6 tool writes protected .lcs- selectors: ${lcsSel.slice(0, 3).join(' ')}`);

  /* T12 — the estimate array must never leave the device */
  const fetchBodies = src.match(/fetch\([^)]*\{[^}]*body\s*:[^}]*\}/g) || [];
  for (const f of fetchBodies) {
    if (/estimate|guess|dots/i.test(f)) err(`T12 an estimate/guess value appears in a fetch body: ${f.slice(0, 90)}`);
  }

  /* --- pure-function doctrine, with the sets injected --- */
  tool.data = data;

  /* T7 structural gate */
  tool.premium = false;
  const freeIds = data.sets.filter(s => s.free).map(s => s.id);
  const lockedIds = data.sets.filter(s => !s.free).map(s => s.id);
  const openFree = tool.setsFor().map(s => s.id);
  for (const id of lockedIds)
    if (openFree.indexOf(id) >= 0) err(`T7 locked set "${id}" is present while free — premium sets must never reach the DOM`);
  for (const id of freeIds)
    if (openFree.indexOf(id) < 0) err(`T7 free set "${id}" missing from the free list`);
  tool.premium = true;
  if (tool.setsFor().length !== data.sets.length) err('T7 premium does not see every set');
  tool.premium = false;

  /* T8 deep link */
  if (lockedIds.length) {
    if (tool.resolveDeepLink({ set: lockedIds[0] }, true) === null)
      err('T8 resolveDeepLink refused a locked set WITH premium (is the param name right?)');
    if (tool.resolveDeepLink({ set: lockedIds[0] }, false) !== null)
      err('T8 resolveDeepLink resolved a locked set without premium');
  }
  const over = tool.resolveDeepLink({ set: freeIds[0], count: data.premiumMax }, false);
  if (over && over.count > data.freeMax) err(`T8 deep link handed a free visitor a count of ${over.count} (free ceiling ${data.freeMax})`);

  /* T9 DOCTRINE A — sign only, and no gradient key may exist */
  const c1 = tool.compare(10, 14), c2 = tool.compare(14, 10), c3 = tool.compare(12, 12);
  if (c1 !== 'more' || c2 !== 'fewer' || c3 !== 'same')
    err(`T9 compare() must return 'more'|'fewer'|'same' — got ${c1}/${c2}/${c3}`);
  /* solver probe: nothing on the returned value may encode HOW FAR off */
  for (const v of [c1, c2, c3]) {
    if (typeof v !== 'string') err('T9 compare() returned a non-string — a gradient could hide in an object');
  }
  if (typeof tool.distance === 'function' || typeof tool.gap === 'function' || typeof tool.rank === 'function')
    err('T9 the tool exposes a distance/gap/rank function — NO ACCURACY GRADIENT');

  /* T10 DOCTRINE B — the truth is unreachable before the reveal */
  let threw = false;
  try { tool.revealedCount({ stage: 'estimate', count: 47 }); } catch (_) { threw = true; }
  if (!threw) err('T10 revealedCount() did not throw before the reveal — the true count must be unreachable');
  let ok10 = null;
  try { ok10 = tool.revealedCount({ stage: 'reveal', count: 47 }); } catch (_) {}
  if (ok10 !== 47) err(`T10 revealedCount() at reveal returned ${ok10}, expected 47`);

  /* T11 groups of ten */
  const cases = [[7, [7]], [10, [10]], [23, [10, 10, 3]], [40, [10, 10, 10, 10]], [137, null]];
  for (const [n, want] of cases) {
    const g = tool.groupsOfTen(n);
    const sum = g.reduce((a, b) => a + b, 0);
    if (sum !== n) err(`T11 groupsOfTen(${n}) sums to ${sum}`);
    if (g.some(x => x > 10)) err(`T11 groupsOfTen(${n}) produced a group above ten`);
    if (want && JSON.stringify(g) !== JSON.stringify(want)) err(`T11 groupsOfTen(${n}) = ${JSON.stringify(g)}, expected ${JSON.stringify(want)}`);
  }
}

/* =====================================================================
   P — THE HONEST JAR.

   These are the theorems the rebuild rests on, and the reason each is
   here is that the shipped tool violated it: the picture had SEVEN
   distinct states across thirty counts, and which state you got depended
   on your SUBSCRIPTION TIER.

   ⚠ EVERY EXPECTATION BELOW IS COMPUTED HERE, NOT READ OFF THE TOOL.
   Where the tool bisects for a radius, this counts slots with its own
   loop; where the tool packs, this re-derives containment from the
   profile table. A check that asks the renderer what it drew and then
   agrees with it has certified nothing — that is how a mirrored profile
   shipped past a green suite on tool #44.
   ===================================================================== */
function checkPacking(tool, data) {
  tool.data = data;
  const caps = (data.capacities || []).map(c => c.cap);
  if (caps.length < 2) err('P0 the sets file declares fewer than two capacities');

  /* --- P1 the pack constants are present, in range, and self-consistent */
  for (const s of (data.sets || [])) {
    const p = s.pack;
    if (!p) { err(`P1 set ${s.id} has no pack constants — run scripts/measure-jar-sprites.js --write`); continue; }
    if (!(p.r70 > 0.12 && p.r70 < 0.5)) err(`P1 ${s.id} r70=${p.r70} outside the plausible band`);
    if (!(p.cy > 0.2 && p.cy < 0.8)) err(`P1 ${s.id} cy=${p.cy} outside the plausible band`);
    if (p.rotMax !== 22 && p.rotMax !== 40) err(`P1 ${s.id} rotMax=${p.rotMax} is neither the asymmetric 22 nor the symmetric 40`);
  }
  /* the whole point of per-set constants: the spread must be REAL, or a
     single global size would have done and the seashell-reads-three-
     times-fuller defect is back */
  const r70s = (data.sets || []).map(s => s.pack && s.pack.r70).filter(Boolean);
  if (r70s.length > 1 && Math.max(...r70s) / Math.min(...r70s) < 1.2)
    err('P1 the r70 spread is under 1.2x — per-set packing constants would be pointless, so one of them is wrong');

  /* --- P1b ⚠ THE GATE RE-DERIVES THE CONSTANTS FROM THE SPRITES.
     The spread check above is a smell test and a mutation walked
     straight past it: setting ONE set's r70 to another's left the
     overall ratio comfortably inside the band while making that set's
     objects the wrong size in every jar. The only check that can see
     that is one that measures the artwork itself — the same discipline
     as everywhere else here, the gate owning its own ground truth
     rather than sanity-checking the tool's.

     Skipped with a WARN, never a silent pass, when the gitignored webp
     tree or sharp is unavailable (CI, a fresh clone). */
  (function reDerive() {
    const measurer = path.join(__dirname, 'measure-jar-sprites.js');
    const webp = path.join(ROOT, 'image-library-webp', 'themes');
    if (!fs.existsSync(measurer)) { warn('P1b the measurement oracle is missing'); return; }
    if (!fs.existsSync(webp)) { warn('P1b the webp tree is absent — pack constants not re-derived'); return; }
    let rows = null;
    try {
      /* ⚠ It reads the SETS FILE UNDER TEST (EJ_DATA_DIR), so a mutated
         constant is measured against the real sprite rather than
         against itself. Point it at the real sets file and the mutation
         would compare a doctored number with a doctored number. */
      const out = require('child_process').execFileSync(
        process.execPath, [measurer, '--json'],
        { cwd: ROOT, timeout: 60000, stdio: ['ignore', 'pipe', 'pipe'],
          env: Object.assign({}, process.env, { EJ_DATA_DIR: DATA_DIR }) });
      rows = JSON.parse(String(out));
    } catch (e) {
      warn('P1b could not run the measurement oracle: ' + String(e.message).slice(0, 120));
      return;
    }
    if (!rows || !rows.length) { warn('P1b the oracle measured nothing'); return; }
    /* NON-VACUITY FIRST: an oracle that returned an empty or short list
       would otherwise "agree" with everything. */
    const declared = (data.sets || []).filter(s => s.pack).length;
    if (rows.length < declared) err(`P1b the oracle measured ${rows.length} sets against ${declared} declared`);
    for (const s of (data.sets || [])) {
      if (!s.pack) continue;
      const m = rows.find(r => r.id === s.id);
      if (!m) { err(`P1b ${s.id} was never measured`); continue; }
      if (Math.abs(m.r70 - s.pack.r70) > 0.012)
        err(`P1b ${s.id} declares r70 ${s.pack.r70} but its sprite measures ${m.r70}`);
      if (Math.abs(m.cy - s.pack.cy) > 0.012)
        err(`P1b ${s.id} declares cy ${s.pack.cy} but its sprite measures ${m.cy}`);
      if (m.rotMax !== s.pack.rotMax)
        err(`P1b ${s.id} declares rotMax ${s.pack.rotMax} but the sprite's symmetry implies ${m.rotMax}`);
    }
  }());

  const setId = (data.sets && data.sets[0] && data.sets[0].id) || 'cherries';

  for (const cap of caps) {
    /* --- P2 the radius really is the largest that fits `cap` below the ring.
       Counted here with an independent loop, not by calling the tool's
       own bisection back on itself. */
    const R = tool.packRadius(cap);
    const count = (r) => {
      const px = 2 * r * 0.90, py = 1.50 * r;
      let y = tool.FILL_BOTTOM - r * 0.98, n = 0, guard = 0;
      while (y >= tool.FILL_TOP && guard++ < 400) {
        const half = tool.interiorHalfWidthAt(y);
        n += Math.max(1, Math.floor((2 * half - 2 * r) / px) + 1);
        y -= py;
      }
      return n;
    };
    if (count(R) < cap) err(`P2 cap ${cap}: R=${R.toFixed(3)} holds only ${count(R)} below the ring`);
    if (count(R + 0.35) >= cap) err(`P2 cap ${cap}: a LARGER radius would still fit — R is not maximal`);

    /* --- P3 exactly N, for every N */
    let wrongN = 0;
    for (let n = 0; n <= cap; n++) if (tool.packPile(n, cap, setId).length !== n) wrongN++;
    if (wrongN) err(`P3 cap ${cap}: ${wrongN} counts did not place exactly N objects`);

    /* --- P4 THE SEVEN-STATES REFUTATION. Every count must produce a
       distinguishable picture, or the child is estimating a lookup
       table. Measured on the full placement set, not on a summary. */
    const seen = new Map();
    for (let n = 1; n <= cap; n++) {
      const p = tool.packPile(n, cap, setId);
      const sig = p.length + '|' + p.map(o => o.x.toFixed(2) + ',' + o.y.toFixed(2)).join(';');
      if (seen.has(sig)) err(`P4 cap ${cap}: counts ${seen.get(sig)} and ${n} render an IDENTICAL picture`);
      seen.set(sig, n);
    }

    /* --- P5 adding an object never lowers the pile */
    let prevTop = Infinity, viol = 0;
    for (let n = 1; n <= cap; n++) {
      const t = tool.pileTop(tool.packPile(n, cap, setId));
      if (t > prevTop + 1e-6) viol++;
      prevTop = t;
    }
    if (viol) err(`P5 cap ${cap}: the pile top ROSE (fewer objects looked like more) at ${viol} steps`);

    /* --- P6 nothing escapes the glass, re-derived from the profile */
    let esc = 0, worst = 0;
    for (let n = 1; n <= cap; n++) {
      for (const o of tool.packPile(n, cap, setId)) {
        const over = Math.abs(o.x - 100) + R - tool.interiorHalfWidthAt(o.y);
        if (over > 1e-6) { esc++; worst = Math.max(worst, over); }
        if (o.y > tool.FILL_BOTTOM + 1e-6) esc++;
      }
    }
    if (esc) err(`P6 cap ${cap}: ${esc} objects sit outside the glass, worst ${worst.toFixed(2)} units`);

    /* --- P7 a full jar reads as full */
    const full = tool.pileTop(tool.packPile(cap, cap, setId));
    const pct = (tool.FILL_BOTTOM - full) / (tool.FILL_BOTTOM - tool.FILL_TOP);
    if (pct < 0.9 || pct > 1.15) err(`P7 cap ${cap}: a FULL jar reads ${(pct * 100).toFixed(0)}% full`);
  }

  /* --- P8 ⚠ THE TIER POISON. This is the defect the whole rebuild
     exists to remove: v1's fill height was `n / tier_ceiling`, so the
     same 30 cherries drew an 88%-full jar for a free teacher and a
     39%-full one for a subscriber. Flip the tier and demand the picture
     is byte-identical. */
  /* ⚠ THE FIRST VERSION OF THIS CHECK PASSED THE CAPACITY IN BY HAND —
     `packPile(20, cap0, …)` — so it never once called the accessor that
     actually supplies it, and a mutation putting `premium ? 200 : 30`
     straight into `capacityOf()` SURVIVED. A check that hands a function
     the value it is supposed to compute has not tested that function.
     Ask the tool, through the same door the renderer uses. */
  for (const c of (data.capacities || [])) {
    if (!c.free) continue;                     /* a paid jar is allowed to disappear when the tier does */
    tool.capacityId = c.id;
    tool.premium = false;
    const asFree = tool.capacityOf();
    const picFree = JSON.stringify(tool.packPile(20, tool.capacityOf(), setId));
    tool.premium = true;
    const asPaid = tool.capacityOf();
    const picPaid = JSON.stringify(tool.packPile(20, tool.capacityOf(), setId));
    tool.premium = false;
    if (asFree !== c.cap)
      err(`P8 the ${c.id} jar reports a capacity of ${asFree}, but it is declared as ${c.cap}`);
    if (asFree !== asPaid)
      err(`P8 the ${c.id} jar holds ${asFree} for a free teacher and ${asPaid} for a subscriber — the tier is in the jar`);
    if (picFree !== picPaid)
      err(`P8 the SAME ${c.id} jar of 20 renders differently once signed in — the tier is inside the picture`);
  }

  /* --- P9 the reveal counts on. "ten, twelve" is what this replaces. */
  for (let n = 0; n <= 200; n++) {
    for (const always of [false, true]) {
      const b = tool.revealBeats(n, always);
      const sum = b.reduce((a, x) => a + x.add, 0);
      if (sum !== n) { err(`P9 revealBeats(${n},${always}) places ${sum}`); break; }
      if (n && b[b.length - 1].total !== n) { err(`P9 revealBeats(${n},${always}) ends on ${b[b.length - 1].total}`); break; }
      if (b.some(x => x.add !== 1 && x.add !== 10)) { err(`P9 revealBeats(${n}) has a beat that is neither a one nor a ten`); break; }
    }
  }
  if (tool.revealBeats(17).some(x => x.add === 10)) err('P9 a jar of 17 was counted in TENS — below twenty it must go by ones');
  if (!tool.revealBeats(34).some(x => x.add === 1)) err('P9 a jar of 34 never counted ON through its leftover ones');
  if (tool.revealBeats(23, true).some(x => x.add === 10)) err('P9 the always-by-ones override was ignored');

  /* --- P10 the sign summary partitions, and carries no distance.
     ⚠ The first version of this check used [0,5,12,12,30] and could not
     see a mutation that widened "same" to a +/-2 BAND, because no guess
     in that set was near-but-not-equal. Neighbours are the whole point:
     the difference between a sign and a distance only shows up one step
     either side of the answer. */
  const g = [0, 10, 11, 12, 12, 13, 14, 30];
  const sp = tool.spread(g, 12);
  if (sp.below + sp.same + sp.above !== g.length) err('P10 spread() lost or duplicated a guess');
  if (sp.same !== 2) err(`P10 spread() counted ${sp.same} as EXACT, expected 2 — a near miss is not a match`);
  if (sp.below !== 3) err(`P10 spread() put ${sp.below} below, expected 3`);
  if (sp.above !== 3) err(`P10 spread() put ${sp.above} above, expected 3`);
  for (const k in sp) if (typeof sp[k] !== 'number') err('P10 spread() returned a non-number — a gradient could hide there');
  /* and a neighbour must land on the far side of the sign, not in it */
  if (tool.compare(11, 12) === 'same' || tool.compare(13, 12) === 'same')
    err('P10 compare() treats a neighbour as a match — that is a distance band wearing a sign');

  /* --- P11 the suggested count avoids decades, which is what keeps the
     leftover ones — the place-value payload — from being empty */
  const rnd = tool.mulberry32(20260805);
  const picks = [];
  for (let i = 0; i < 500; i++) picks.push(tool.pickCount(caps[0], rnd));
  if (picks.some(v => v % 10 === 0)) err('P11 pickCount produced a multiple of ten');
  if (picks.some(v => v < 1 || v > caps[0])) err('P11 pickCount left the jar');
  if (new Set(picks).size < 5) err('P11 pickCount is barely varying — it would hand every class the same jar');

  /* --- P12 a deep link brings its jar with it */
  const big = caps[caps.length - 1];
  const dl = tool.resolveDeepLink({ set: setId, count: String(big) }, true);
  if (!dl || !dl.capacityId) err('P12 a deep link asking for a big count did not choose a jar that holds it');
  else {
    const c = tool.capacityById(dl.capacityId);
    if (!c || c.cap < dl.count) err(`P12 the deep link chose the ${dl.capacityId} jar for a count of ${dl.count}`);
  }
  const dlFree = tool.resolveDeepLink({ set: setId, count: String(big) }, false);
  if (dlFree && dlFree.count > tool.freeMax()) err('P12 a free visitor was handed a premium-size count');

  /* --- P13 the display bins, the data does not */
  for (const [max, want] of [[30, 1], [60, 2], [200, 10]]) {
    if (tool.binWidthFor(max) !== want) err(`P13 binWidthFor(${max}) = ${tool.binWidthFor(max)}, expected ${want}`);
  }
}

/* ---------------- run ---------------- */
console.log(`verify-estimation-jar — locales: ${LOCALES.join(',')}`);
let vocab = null;
try { vocab = loadImageVocabulary(); } catch (e) { warn('IMAGE_VOCABULARY unavailable: ' + e.message); }

const setsFile = path.join(DATA_DIR, 'estimation-jar-sets.json');
let data = null;
console.log('\n[sets]');
if (!fs.existsSync(setsFile)) err(`missing ${setsFile}`);
else {
  try { data = JSON.parse(fs.readFileSync(setsFile, 'utf8')); }
  catch (e) { err(`JSON parse: ${e.message}`); }
  if (data) {
    const r = checkSets(data, vocab);
    console.log(`  ${r.n} sets, ${r.free} free`);
  }
}

const tp = path.join(TOOL_DIR, 'estimation-jar.js');
if (fs.existsSync(tp)) {
  let tool = null, src = '';
  try { const r = loadTool('estimation-jar.js', 'EstimationJar'); tool = r.tool; src = r.src; }
  catch (e) { err('tool failed to load in the vm sandbox: ' + e.message); }
  if (!tool) err('global EstimationJar not found');
  else if (data) {
    console.log('\n[tool]');
    checkTool(tool, src, data);
    console.log('\n[packing]');
    checkPacking(tool, data);
  }
} else warn('mini tools/estimation-jar.js not present yet — DATA checks only');

console.log(`\n${ERRORS ? 'FAIL' : 'PASS'} — ${ERRORS} error(s), ${WARNS} warn(s)`);
process.exit(ERRORS ? 1 : 0);
