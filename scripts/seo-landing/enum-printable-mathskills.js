#!/usr/bin/env node
/*
 * enum-printable-mathskills.js — SEO landing program Part 2, Batch 2 (themed math-skill types).
 * Emits the structural coordinates JSON (one entry per (type,level)) consumed by
 * gen-printable-mathskills.js. Per-(type,level): the full deck slug list (collapseSiblings,
 * incl. -N + themed + easy/hard variants) + the canonical (plain `<type>-(g|k)<id>` base).
 *
 * Runs on Hetzner (DB). Absolute db require so it can live outside the repo (/root) and not
 * block git pull (§22.5 deploy gotcha). Read-only. Writes /root/pm-coords.json + prints it.
 *
 * Granularity = per (type,level) (the telling-time pattern): one landing per skill+grade,
 * collapsing themes/modes/sub-skills. coordinate.theme = "" (themeless); distinct mode per
 * level so coordKey (type|mode|theme) does not collide across grades.
 */
'use strict';
const fs = require('fs');
const db = require('/opt/lessoncraftstudio/scripts/publish-cli/db');

const AGE2LVL = { '3-5': 'preschool', '5-7': 'kindergarten', '6-8': 'grade-1', '7-9': 'grade-2', '8-10': 'grade-3' };

// 18 coordinate definitions: [type, level, mode, standard|null, strand]
const DEFS = [
  // telling-time (the EN pilot's 3 coordinates — included here so non-EN fan-outs get all 21 in one enum)
  ['telling-time', 'grade-1', 'hour-half-hour', '1.MD.B.3', 'Measurement & Data'],
  ['telling-time', 'grade-2', 'to-five-minutes', '2.MD.C.7', 'Measurement & Data'],
  ['telling-time', 'grade-3', 'to-the-minute', '3.MD.A.1', 'Measurement & Data'],
  ['fractions', 'grade-2', 'partition-and-share', '2.G.A.3', 'Fractions'],
  ['fractions', 'grade-3', 'name-and-compare', '3.NF.A.1', 'Fractions'],
  ['geometry', 'kindergarten', 'count-and-sort-shapes', 'K.G.B.4', 'Geometry'],
  ['geometry', 'grade-2', 'shape-attributes', '2.G.A.1', 'Geometry'],
  ['geometry', 'grade-3', 'quadrilaterals-and-area', '3.G.A.1', 'Geometry'],
  ['measurement', 'kindergarten', 'compare-weight', 'K.MD.A.2', 'Measurement & Data'],
  ['measurement', 'grade-1', 'length-units', '1.MD.A.2', 'Measurement & Data'],
  ['measurement', 'grade-2', 'measure-and-compare-length', '2.MD.A.1', 'Measurement & Data'],
  ['measurement', 'grade-3', 'volume-and-temperature', null, 'Measurement & Data'], // strand-only (verify)
  ['arrays-multiplication', 'grade-2', 'arrays-repeated-addition', '2.OA.C.4', 'Operations & Algebraic Thinking'],
  ['arrays-multiplication', 'grade-3', 'multiply-and-divide', '3.OA.A.1', 'Operations & Algebraic Thinking'],
  ['graphing-data', 'grade-1', 'read-picture-bar-graphs', '1.MD.C.4', 'Measurement & Data'],
  ['graphing-data', 'grade-2', 'graphs-and-line-plots', '2.MD.D.10', 'Measurement & Data'],
  ['graphing-data', 'grade-3', 'scaled-graphs', '3.MD.B.3', 'Measurement & Data'],
  ['number-charts', 'kindergarten', 'numbers-to-20', 'K.CC.A.3', 'Counting & Cardinality'],
  ['number-charts', 'grade-1', 'hundreds-chart-skip-count', '1.NBT.A.1', 'Number & Operations in Base Ten'],
  ['number-charts', 'grade-2', 'skip-count-and-100-more-less', '2.NBT.A.2', 'Number & Operations in Base Ten'],
  ['number-charts', 'grade-3', 'number-patterns', '3.OA.D.9', 'Operations & Algebraic Thinking'], // verify
];

const argLocale = (process.argv.find((a) => a.indexOf('--locale=') === 0) || '--locale=en').slice(9);

(async () => {
  const p = db.client();
  const out = [];
  for (const [type, level, mode, standard, strand] of DEFS) {
    const rows = await p.deck.findMany({
      where: { language: argLocale, status: 'published', contentLanguage: null, exerciseType: type },
      select: { slug: true, ageRange: true },
      orderBy: { slug: 'asc' },
    });
    const atLevel = rows.filter((r) => (AGE2LVL[r.ageRange] || r.ageRange) === level).map((r) => r.slug);
    if (!atLevel.length) { console.error('!! NO DECKS for ' + type + ' ' + level + ' (' + argLocale + ')'); continue; }
    // LOCALE-AWARE canonical = plain base ending `-(g|k)<id>` (no -N suffix), with the FEWEST
    // hyphens (themeless base like `brueche-g2228` / `uhrzeit-g1148` over themed `brueche-fahrzeuge-g2233`);
    // independent of the localized slug prefix. Fallback = shortest slug.
    const plain = atLevel.filter((s) => /-(g|k)\d+$/.test(s))
      .sort((a, b) => a.split('-').length - b.split('-').length || a.length - b.length || a.localeCompare(b));
    const canonical = (plain[0]) || atLevel.slice().sort((a, b) => a.length - b.length)[0];
    const slug = type + '-' + level; // landing slug stays English (route key); deck slugs are localized
    out.push({ slug, type, level, mode, standard, strand, canonicalDeckSlug: canonical, collapseSiblings: atLevel });
    console.error('  ' + slug.padEnd(34) + ' decks=' + String(atLevel.length).padStart(3) + ' canonical=' + canonical + (standard ? ' [' + standard + ']' : ' [strand-only]'));
  }
  fs.writeFileSync('/root/pm-coords-' + argLocale + '.json', JSON.stringify({ locale: argLocale, coordinates: out }, null, 2) + '\n', 'utf8');
  console.error('LOCALE=' + argLocale + ' TOTAL coordinates=' + out.length + ' | covered decks=' + out.reduce((a, c) => a + c.collapseSiblings.length, 0));
  // stdout = pure JSON (for capture)
  process.stdout.write(JSON.stringify({ coordinates: out }, null, 2) + '\n');
  await db.disconnect();
})();
