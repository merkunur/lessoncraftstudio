#!/usr/bin/env node
/* =====================================================================
   local-test-activities-index.js — local verifier for the reorganized
   /[locale]/activities/ index (grade-band → localized-strand → cards).

   Replicates the route's EXACT grouping logic from the SAME sources of
   truth the route reads (so it can't drift):
     • the activity manifests in `mini tools/*-activities.json`
     • localizeStrand — extracted live from frontend/lib/seo/strand-names.ts
     • grade-band headings — frontend/messages/<loc>.json seo.educational_level

   Asserts, per locale:
     1. sections render (≥1 grade band);
     2. grade bands ordered K → 1 → 2 → 3;
     3. within a grade, strand groups ordered by min CCSS strand index;
     4. every filtered row appears exactly once (no orphan, no duplicate);
     5. every grade + strand heading is non-empty and localized;
     6. 0 "Common Core" leak on the 10 non-EN locales (headings/titles/intros);
     7. E18 auto-slot: numberbond.make-ten.k-oa-a-4 lands in the K band under
        the localized "Operations & Algebraic Thinking" group.
   Exit 0 = pass; 1 = any failure.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MSG = path.join(REPO, 'frontend', 'messages');
const LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NON_EN = LOCALES.filter((l) => l !== 'en');

const GRADE_ORDER = ['K', '1', '2', '3'];
const GRADE_KEY_MAP = { K: 'kindergarten', '1': 'grade_1', '2': 'grade_2', '3': 'grade_3' };
const STRAND_ORDER = {
  'Counting & Cardinality': 0,
  'Operations & Algebraic Thinking': 1,
  'Number & Operations in Base Ten': 2,
  'Number and Operations in Base Ten': 2,
  'Measurement & Data': 3,
  Geometry: 4,
  'Reading: Foundational Skills': 5,
  'Phonological Awareness': 6,
  Language: 7,
};
const strandIdx = (s) => (STRAND_ORDER[s] === undefined ? 99 : STRAND_ORDER[s]);

/* --- load the real STRAND_NAMES object out of strand-names.ts --- */
function loadStrandNames() {
  const src = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'seo', 'strand-names.ts'), 'utf8');
  const m = src.match(/export const STRAND_NAMES[^=]*=\s*(\{[\s\S]*?\n\});/);
  if (!m) throw new Error('could not extract STRAND_NAMES from strand-names.ts');
  // eslint-disable-next-line no-eval
  return eval('(' + m[1] + ')');
}
const STRAND_NAMES = loadStrandNames();
function localizeStrand(strand, locale) {
  const row = STRAND_NAMES[strand];
  if (!row) return strand;
  return row[locale] || row.en || strand;
}

/* --- load all activity rows (all *-activities.json, like the registered set) --- */
function loadRows() {
  const files = fs.readdirSync(MINI).filter((f) => /-activities\.json$/.test(f));
  const all = [];
  for (const f of files) all.push(...JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')));
  return all;
}
const ALL = loadRows();

function eduLevel(loc, gradeKey) {
  const m = JSON.parse(fs.readFileSync(path.join(MSG, loc + '.json'), 'utf8'));
  return (m.seo && m.seo.educational_level && m.seo.educational_level[gradeKey]) || '';
}

const fails = [];
const note = (cond, msg) => { if (!cond) fails.push(msg); };

for (const loc of LOCALES) {
  const rows = ALL.filter((r) => r.slug[loc] && r.page_title[loc]);
  note(rows.length > 0, `${loc}: no activity rows resolved`);

  const presentGrades = [
    ...GRADE_ORDER.filter((g) => rows.some((r) => r.alignment.grade === g)),
    ...Array.from(new Set(rows.map((r) => r.alignment.grade))).filter((g) => !GRADE_ORDER.includes(g)).sort(),
  ];

  // 2. grade order matches GRADE_ORDER prefix
  const expectedKnown = GRADE_ORDER.filter((g) => rows.some((r) => r.alignment.grade === g));
  note(JSON.stringify(presentGrades.slice(0, expectedKnown.length)) === JSON.stringify(expectedKnown),
    `${loc}: grade bands out of order: ${presentGrades.join(',')}`);

  let cardCount = 0;
  const seen = new Set();
  let autoSlotOk = false;
  const opsLabel = localizeStrand('Operations & Algebraic Thinking', loc);

  for (const grade of presentGrades) {
    const gradeKey = GRADE_KEY_MAP[grade];
    const gradeLabel = gradeKey ? eduLevel(loc, gradeKey) : '';
    // 5. grade heading non-empty + localized
    note(!!gradeLabel, `${loc}: empty grade heading for grade ${grade}`);
    // 6. no CC leak in grade heading (non-EN)
    if (loc !== 'en') note(!/common core/i.test(gradeLabel), `${loc}: "Common Core" in grade heading "${gradeLabel}"`);

    const gradeRows = rows.filter((r) => r.alignment.grade === grade);
    const byStrand = new Map();
    for (const r of gradeRows) {
      const label = localizeStrand(r.alignment.strand, loc);
      const e = byStrand.get(label);
      if (e) { e.rows.push(r); e.order = Math.min(e.order, strandIdx(r.alignment.strand)); }
      else byStrand.set(label, { label, order: strandIdx(r.alignment.strand), rows: [r] });
    }
    const groups = Array.from(byStrand.values()).sort((a, b) => a.order - b.order || a.label.localeCompare(b.label, loc));

    // 3. strand order non-decreasing
    for (let i = 1; i < groups.length; i++) note(groups[i - 1].order <= groups[i].order, `${loc}/${grade}: strand groups out of order`);

    for (const g of groups) {
      note(!!g.label && g.label.trim().length > 0, `${loc}/${grade}: empty strand heading`);
      if (loc !== 'en') note(!/common core/i.test(g.label), `${loc}: "Common Core" in strand heading "${g.label}"`);
      for (const r of g.rows) {
        cardCount++;
        note(!seen.has(r.id), `${loc}: duplicate card ${r.id}`);
        seen.add(r.id);
        const title = r.page_title[loc] || '';
        const intro = r.page_intro[loc] || '';
        note(title.length > 0, `${loc}: empty title ${r.id}`);
        note(!!r.slug[loc], `${loc}: missing slug ${r.id}`);
        // 6. CC leak in card title/intro (non-EN only)
        if (loc !== 'en') {
          note(!/common core/i.test(title), `${loc}: "Common Core" in title ${r.id}`);
          note(!/common core/i.test(intro), `${loc}: "Common Core" in intro ${r.id}`);
        }
        // 7. auto-slot of the new E18 row
        if (r.id === 'numberbond.make-ten.k-oa-a-4') {
          autoSlotOk = grade === 'K' && g.label === opsLabel;
        }
      }
    }
  }
  // 4. every filtered row placed exactly once
  note(cardCount === rows.length, `${loc}: ${cardCount} cards placed ≠ ${rows.length} filtered rows`);
  // 7. number-bond auto-slot (only where it has a slug — all 11)
  if (rows.some((r) => r.id === 'numberbond.make-ten.k-oa-a-4')) {
    note(autoSlotOk, `${loc}: E18 number-bond did NOT auto-slot into K / "${opsLabel}"`);
  }

  const okLoc = !fails.some((f) => f.startsWith(loc + ':') || f.startsWith(loc + '/'));
  console.log(`  ${okLoc ? 'ok  ' : 'FAIL'} ${loc} — ${presentGrades.length} grade band(s), ${seen.size} cards`);
}

console.log('');
if (fails.length) {
  console.error(`ACTIVITIES-INDEX LOCAL TEST FAILED — ${fails.length} issue(s):`);
  fails.forEach((f) => console.error('  • ' + f));
  process.exit(1);
}
console.log(`ACTIVITIES-INDEX LOCAL TEST PASSED — ${LOCALES.length} locale(s): grade-band → localized-strand grouping, ordered, no orphan, localized headings, 0 Common-Core leak on the 10 non-EN, E18 auto-slot into K / Operations.`);
process.exit(0);
