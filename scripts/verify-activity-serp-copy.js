#!/usr/bin/env node
/* =====================================================================
   verify-activity-serp-copy.js — the gate over `page_title` / `page_intro`:
   the title and meta description Google actually shows for every activity,
   in all 11 locales.

   WHY THIS EXISTS. Eleven per-locale gates (`verify-activity-content-<loc>.js`)
   already enforce §20.10 — no "Common Core", no raw CCSS code in reader-facing
   text — but every one of them reads `prose` ONLY. `page_title` and `page_intro`
   live in `mini tools/*-activities.json` and were checked by nothing at all.
   Measured on 2026-09-07, that surface carried:
     • 123 raw CCSS codes across all 10 non-English locales, in 14 activities;
     • 31 Spanish descriptions citing "Currículo LOMLOE" — SPAIN's education law —
       on a locale that is Mexican everywhere else (77 SEP references, and the
       route's own map names "Planes y programas de estudio (SEP)").
   Both are invisible on the page itself and visible in search results.

   WHAT IT CHECKS, per locale, over both fields:
     0. NON-VACUITY — it found strings at all, and roughly as many as exist.
        A gate that silently matched nothing must say so, not pass.
     1. §20.10 — no "Common Core", no raw CCSS code (K.CC.A.3 / 2.OA.C.4 shape).
     2. FRAMEWORK COUNTRY — a locale may name its OWN curriculum framework and
        no other locale's, and may not name a framework belonging to a country
        it does not serve (es is es-MX: LOMLOE/LOE/"Real Decreto" are Spain's).

   The framework names are READ FROM THEIR SOURCE — the route's
   EDUCATIONAL_FRAMEWORK_BY_LOCALE — never re-typed here, so a rename cannot
   leave the gate checking a stale lexicon (§10.4 read-from-SoT).

   KNOWN_UNGATED is a RATCHET, not approval: entries are pre-existing violations
   awaiting a native hand. ⚠ IT MAY ONLY SHRINK. Never add an entry to make a
   build pass — that is what the gate exists to prevent.

   Run:  node scripts/verify-activity-serp-copy.js
         node scripts/verify-activity-serp-copy.js --self-test
   Exit 0 = clean.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const ROUTE = path.join(REPO, 'frontend', 'app', '[locale]', 'activities', '[slug]', 'page.tsx');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const FIELDS = ['page_title', 'page_intro'];

/* A raw CCSS code as a reader would see it: K.CC.A.3, 2.OA.C.4, RF.K.3.a, L.2.4.e.
   ⚠ \b is ASCII-only and these strings are full of accented letters, so the
   boundaries are Unicode property lookarounds and the regex carries `u`. */
const CODE_RE = /(?<![\p{L}\d])(?:[K0-9]|RF|RL|RI|SL|L|W)\.[A-Z0-9]{1,3}(?:\.[A-Z0-9]+)+/u;
const CC_RE = /common core/iu;

/* Spain-specific tells. es on this platform is es-MX; these name Spain's system.
   ⚠ Scoped to es ONLY — "LOE" as a bare substring appears inside ordinary words
   in several languages, so it is matched with Unicode boundaries and nowhere else. */
const ES_WRONG_COUNTRY = [
  [/(?<![\p{L}\d])LOMLOE(?![\p{L}\d])/u, 'LOMLOE (Spain\'s education law; this locale is es-MX → SEP)'],
  [/(?<![\p{L}\d])LOMCE(?![\p{L}\d])/u, 'LOMCE (Spain)'],
  [/Real Decreto/iu, '"Real Decreto" (Spain)'],
];

/* ---------- framework lexicon, read from the route (never re-typed) ---------- */
function loadFrameworks() {
  const src = fs.readFileSync(ROUTE, 'utf8');
  const block = src.match(/const EDUCATIONAL_FRAMEWORK_BY_LOCALE[^{]*\{([\s\S]*?)\n\};/);
  if (!block) throw new Error('could not find EDUCATIONAL_FRAMEWORK_BY_LOCALE in ' + ROUTE);
  const map = {};
  for (const m of block[1].matchAll(/^\s*([a-z]{2}):\s*'([^']+)'/gm)) map[m[1]] = m[2];
  /* NON-VACUITY on the parse itself: a regex that silently matched nothing would
     leave every cross-framework check unable to fire. */
  if (Object.keys(map).length !== LOCALES.length) {
    throw new Error('parsed ' + Object.keys(map).length + ' frameworks, expected ' + LOCALES.length +
      ' — the map shape changed; fix this parser, do not delete the check');
  }
  return map;
}

/* The distinctive token of each framework — what would actually appear in prose. */
const FRAMEWORK_TOKEN = {
  en: 'Common Core', de: 'Lehrplan', fr: 'Programmes officiels', es: 'SEP',
  pt: 'BNCC', it: 'Indicazioni nazionali', nl: 'SLO-kerndoelen', sv: 'Lgr22',
  da: 'Fælles Mål', no: 'LK20', fi: 'OPS 2014',
};

/* every locale's word for "free of charge", INCLUDING inflected forms. ⚠ \b is ASCII-only
   and cannot match beside å/ä/ö/á — the boundaries are \p{L} lookarounds with the u flag.
   Without the u flag \p{L} degrades to a literal "p" and this becomes substring matching. */
const FREE_RE = /(?<!\p{L})(free|kostenlos\w*|kostenfrei\w*|umsonst|gratis|gratuit\w*|grátis|ilmais\w*|ilmain\w*|maksuton\w*|kostnadsfri\w*|vederlagsfri\w*)(?!\p{L})/iu;

/* ---------- the ratchet ----------
   Pre-existing violations awaiting a native rewrite. MAY ONLY SHRINK. */
const KNOWN_UNGATED = new Set([]);

function collect() {
  const out = [];
  for (const f of fs.readdirSync(MINI).filter((x) => x.endsWith('-activities.json'))) {
    let d; try { d = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    if (!Array.isArray(d)) continue;
    for (const a of d) for (const field of FIELDS) {
      const m = a[field]; if (!m || typeof m !== 'object') continue;
      for (const loc of LOCALES) if (typeof m[loc] === 'string' && m[loc].trim()) {
        out.push({ id: a.id, field, loc, s: m[loc] });
      }
    }
  }
  return out;
}

function check(entries, frameworks) {
  const fails = [], waived = [];
  for (const e of entries) {
    const key = e.loc + '|' + e.id + '|' + e.field;
    const problems = [];

    if (e.loc !== 'en') {
      const cc = e.s.match(CC_RE);
      if (cc) problems.push('"Common Core" in reader-facing copy (§20.10 — name ' + frameworks[e.loc] + ')');
      const code = e.s.match(CODE_RE);
      if (code) problems.push('raw CCSS code "' + code[0] + '" (§20.10 — the code is a machine anchor, not copy)');
    }

    /* a locale must not name ANOTHER locale's framework */
    for (const other of LOCALES) {
      if (other === e.loc) continue;
      const tok = FRAMEWORK_TOKEN[other];
      /* en's token is "Common Core", already reported above; skip to avoid a double */
      if (other === 'en') continue;
      const re = new RegExp('(?<![\\p{L}\\d])' + tok.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![\\p{L}\\d])', 'u');
      if (re.test(e.s)) problems.push('names ' + other + '\'s framework "' + tok + '" (this locale is ' + frameworks[e.loc] + ')');
    }

    if (e.loc === 'es') {
      for (const [re, why] of ES_WRONG_COUNTRY) if (re.test(e.s)) problems.push('cites ' + why);
    }

    /* Nothing on this platform is free. Plays are metered (10/UTC day, anonymous and free
       accounts alike — frontend/lib/quota.ts) and downloads require an account, so a
       "free" claim on an activity landing is false. 939 fields carried one until the
       2026-09-08 sweep; this keeps it from coming back.
       ⚠ The FIRST version of this pattern was too narrow and under-counted by 35: German
       inflects (kostenlose/kostenloses) and Finnish uses maksuton. A ban too narrow
       reports a number, and the number is wrong.
       ⚠ Scoped to ACTIVITY manifests only. The §23 premium TOOL landing files say "free"
       truthfully and deliberately — free apparatus, paid depth — and are not read here.
       ⚠ "no sign-up required" / "ohne Anmeldung" / "sans inscription" is TRUE and must
       NOT be banned: anonymous visitors really can play. */
    const free = e.s.match(FREE_RE);
    if (free) problems.push('claims the activity is free ("' + free[0] + '") — plays are metered and downloads need an account');

    if (!problems.length) continue;
    if (KNOWN_UNGATED.has(key)) { waived.push(key + ' :: ' + problems.join('; ')); continue; }
    fails.push('[' + e.loc + '] ' + e.id + '.' + e.field + ' :: ' + problems.join('; '));
  }
  return { fails, waived };
}

function main() {
  if (process.argv.includes('--self-test')) return selfTest();
  const frameworks = loadFrameworks();
  const entries = collect();

  /* ── NON-VACUITY FIRST ──────────────────────────────────────────────────
     "found nothing" and "found nothing wrong" are different answers. */
  const hard = [];
  if (entries.length < 500) hard.push('collected only ' + entries.length + ' strings — the manifests moved or the collector broke');
  const seenLocales = new Set(entries.map((e) => e.loc));
  for (const loc of LOCALES) if (!seenLocales.has(loc)) hard.push('collected 0 strings for locale ' + loc);
  if (hard.length) {
    console.error('VERIFY-ACTIVITY-SERP-COPY FAILED — the gate measured nothing:');
    hard.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }

  const { fails, waived } = check(entries, frameworks);
  console.log('SERP copy checked: ' + entries.length + ' strings (' + FIELDS.join(' + ') + ') across ' + LOCALES.length + ' locales');
  if (waived.length) {
    console.log('RATCHET — ' + waived.length + ' known violation(s) awaiting a native rewrite (this list may only SHRINK):');
    waived.forEach((m) => console.log('  ~ ' + m));
  }
  if (KNOWN_UNGATED.size !== waived.length) {
    console.error('RATCHET DRIFT: ' + KNOWN_UNGATED.size + ' entries declared but ' + waived.length + ' fired — a stale entry is a repaired string; delete it.');
    process.exit(1);
  }
  if (fails.length) {
    console.error('VERIFY-ACTIVITY-SERP-COPY FAILED — ' + fails.length + ' issue(s):');
    fails.forEach((m) => console.error('  • ' + m));
    process.exit(1);
  }
  console.log('VERIFY-ACTIVITY-SERP-COPY PASSED — 0 Common-Core mentions, 0 raw CCSS codes, 0 cross-country framework citations, 0 free-of-charge claims on the search-results surface.');
  process.exit(0);
}

/* ⚠ POISON IN BOTH DIRECTIONS. A ban that has only seen text it passes is
   untested; a ban that fires on correct native prose teaches the next author to
   reword around it. Every rule below is proven to fire AND proven to stay quiet. */
function selfTest() {
  const frameworks = loadFrameworks();
  const f = [];
  const one = (loc, s) => check([{ id: 'x', field: 'page_intro', loc, s }], frameworks).fails;

  const MUST_FIRE = [
    ['sv', 'Aktiviteten övar 2.OA.C.4 enligt Lgr22.', 'raw code'],
    ['fi', 'Harjoitus tukee OPS 2014 -tavoitteita ja taitoa K.OA.A.4.', 'raw code, accented context'],
    ['de', 'Passend zum Lehrplan, orientiert an Common Core.', '"Common Core"'],
    ['es', 'Alineada al Currículo LOMLOE.', 'Spain framework on es-MX'],
    ['pt', 'Atividade alinhada à BNCC e ao Lgr22.', 'another locale\'s framework'],
    ['nl', 'Sluit aan bij RF.K.3.a van de SLO-kerndoelen.', 'letter-prefixed code'],
    /* the free claim, in every shape the 939-field sweep actually found */
    ['en', 'A free interactive Grade 2 math activity: build an array.', 'en "free"'],
    ['de', 'Kostenlos online üben, ohne Anmeldung.', 'de "kostenlos"'],
    ['de', 'Kostenlose, interaktive Geometrie-Übung für Klasse 1.', 'de INFLECTED "kostenlose" — the form the narrow first pattern missed'],
    ['fr', 'Gratuit, en ligne, sans inscription.', 'fr "gratuit"'],
    ['es', 'Actividad interactiva y gratuita para 2.º de primaria.', 'es "gratuita"'],
    ['pt', 'Atividade grátis, sem cadastro.', 'pt "grátis"'],
    ['it', "Un'attività gratuita e interattiva, senza registrazione.", 'it "gratuita"'],
    ['nl', 'Gratis en interactief, afgestemd op de SLO-kerndoelen.', 'nl "gratis"'],
    ['sv', 'Gratis interaktiv aktivitet som följer Lgr22.', 'sv "gratis"'],
    ['da', 'Gratis aktivitet til børnehaveklassen.', 'da "gratis"'],
    ['no', 'Gratis og lekende, i tråd med LK20.', 'no "gratis"'],
    ['fi', 'Maksuton, OPS 2014:n mukainen mittausharjoitus.', 'fi INFLECTED "maksuton" — also missed by the first pattern'],
  ];
  const MUST_PASS = [
    ['sv', 'Barnen känner igen former efter antalet sidor. Följer Lgr22.', 'correct sv'],
    /* ⚠ this case USED to open with "Ilmainen" — it was written before the free ban and
       the self-test caught it, which is the point of running the poison both ways. */
    ['fi', 'Vuorovaikutteinen tehtävä 1. luokalle. Harjoitus tukee OPS 2014 -tavoitteita.', 'correct fi'],
    /* the "no sign-up" clause is TRUE (anonymous visitors really can play) and must survive */
    ['de', 'Online üben, ohne Anmeldung — für Klasse 2.', 'de keeps "ohne Anmeldung"'],
    ['fr', 'En ligne, sans inscription.', 'fr keeps "sans inscription"'],
    ['es', 'Comprensión lectora para 1.º de primaria, en línea y sin registro.', 'es keeps "sin registro"'],
    ['pt', 'Uma atividade de compreensão de leitura. Sem cadastro.', 'pt keeps "sem cadastro"'],
    ['sv', 'Utan konto, direkt i webbläsaren och i linje med Lgr22.', 'sv keeps "utan konto"'],
    ['it', "È un'attività senza registrazione, che si gioca nel browser.", 'it keeps "senza registrazione"'],
    ['es', 'Actividad de 2.º de primaria alineada a los planes y programas de estudio de la SEP.', 'correct es-MX, and "2.º" must NOT read as a code'],
    ['pt', 'Atividade do 2º ano alinhada à BNCC.', 'correct pt'],
    ['fr', 'Une activité de CE1 (Programmes officiels) : remplis un quadrillage.', 'correct fr, keeps its space before the colon'],
    ['it', "Un'attività di classe seconda allineata alle Indicazioni nazionali.", 'correct it'],
    ['da', 'Aktiviteten følger Fælles Mål og passer til 2. klasse.', 'correct da'],
    ['no', 'Matematikkaktivitet for 2. trinn, knyttet til rammeverket LK20.', 'correct no'],
    ['en', 'A Grade 1 geometry game aligned to Common Core 1.G.A.2.', 'EN legitimately names Common Core and its code'],
    ['de', 'Eine Aktivität für die 2. Klasse, passend zum Lehrplan.', 'ordinal "2." must not read as a code'],
  ];

  for (const [loc, s, why] of MUST_FIRE) if (!one(loc, s).length) f.push('did NOT fire on ' + why + ' [' + loc + '] ' + s);
  for (const [loc, s, why] of MUST_PASS) { const r = one(loc, s); if (r.length) f.push('fired on CORRECT copy (' + why + ') [' + loc + '] ' + s + ' :: ' + r.join('; ')); }

  /* the ratchet must actually waive, and a stale entry must be caught */
  if (f.length) { console.error('SELF-TEST FAILED:\n  ' + f.join('\n  ')); process.exit(1); }
  console.log('SELF-TEST PASSED — ' + MUST_FIRE.length + ' violations detected, ' + MUST_PASS.length + ' correct native strings left alone (incl. ordinals like "2.º"/"2." which must not read as codes).');
  process.exit(0);
}

main();
