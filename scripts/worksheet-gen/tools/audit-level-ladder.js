#!/usr/bin/env node
/**
 * audit-level-ladder.js — MEASURE, for every worksheet type, whether its three
 * difficulty levels are real (2026-09-27, the Level Set programme).
 *
 * Per type:
 *   - the declared difficulty configs (1/2/3) and which keys differ
 *   - each level BUILT with the SAME random seed, so any difference in the
 *     page comes from the level, never from luck
 *   - per level, what the child sees: largest number, count of numbers,
 *     pictures, words of text
 *   - theme eligibility with the full image library: colour themes and
 *     black-and-white themes the type can use
 *
 * Verdicts (mechanical — a pedagogy review still decides "genuine"):
 *   NO-LEVELS          the type declares no difficulty table
 *   SAME-CONFIG        two or more levels have identical settings
 *   SAME-PAGE          settings differ but the built pages are identical
 *   DIFFERENT          all three pages differ
 *   BUILD-ERROR        level 1 builds but level 2 or 3 fails (message recorded)
 *   REFUSED-ALL        no theme/unit combination builds at all (en)
 *
 * Output: out/level-ladder/audit.json + a summary on stdout.
 * Usage:  node scripts/worksheet-gen/tools/audit-level-ladder.js [--types=K-002,G1-101]
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadAllTypes } = require('../lib/load-types.js');
const { makeRng } = require('../lib/rng.js');
const resolve = require('../image-cache/resolve.js');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'out', 'level-ladder');
const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=')[1] : null; };
const ONLY = arg('types') ? new Set(arg('types').split(',')) : null;

const isBw = (t) => /\bbw\b/i.test(t);
function eligible(spec, themes) {
  const ax = spec.themeAxis || {};
  return themes.filter((t) => {
    if (ax.excludeBw && isBw(t)) return false;
    if (ax.bwOnly && !isBw(t)) return false;
    let n = [];
    try { n = resolve.labelSafeNouns(t); } catch (e) { return false; }
    return n.length >= (ax.minNouns || 1);
  });
}

function stats(html) {
  const text = String(html).replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
  const nums = (text.match(/\d+/g) || []).map(Number);
  return {
    hash: crypto.createHash('sha1').update(String(html)).digest('hex').slice(0, 12),
    maxNumber: nums.length ? Math.max(...nums) : null,
    numbers: nums.length,
    pictures: (String(html).match(/<img\b|<image\b/gi) || []).length,
    words: (text.match(/\p{L}+/gu) || []).length,
    bytes: String(html).length,
  };
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

(async () => {
  const themes = Object.keys(resolve.manifest().themes);
  const specs = loadAllTypes().filter((s) => s && s.id && (!ONLY || ONLY.has(s.id)));
  const rows = [];
  for (const spec of specs) {
    const row = { id: spec.id, slug: spec.slug, grade: spec.gradeBand, family: spec.exerciseType, verdict: null, levels: {}, differingKeys: [], note: null };
    const ax = spec.themeAxis || {};
    const el = ax.applicable === false ? [] : eligible(spec, themes);
    row.themes = { applicable: ax.applicable !== false, colour: el.filter((t) => !isBw(t)).length, bw: el.filter(isBw).length, excludeBw: !!ax.excludeBw, bwOnly: !!ax.bwOnly };
    const d = spec.difficulty;
    if (!d || typeof d !== 'object' || !d[1]) { row.verdict = 'NO-LEVELS'; rows.push(row); continue; }
    const cfg = [d[1], d[2], d[3]];
    const keys = new Set(cfg.filter(Boolean).flatMap((c) => Object.keys(c)));
    row.differingKeys = [...keys].filter((k) => new Set(cfg.map((c) => JSON.stringify(c && c[k]))).size > 1);
    row.configs = cfg;
    /* A type may legitimately REFUSE a theme (too few label-safe nouns, no
       curated allowlist…) — that is not a level defect. Try colour themes
       first, then B&W, and units when the type has a unit axis, until one
       combination builds at level 1; then build all three levels on it. */
    const units = (() => { try { return (spec.unitAxis && spec.unitAxis.applicable) ? (spec.unitAxis.units('en') || []) : [null]; } catch (e) { return [null]; } })();
    const themeTry = ax.applicable === false ? [null] : [...el.filter((t) => !isBw(t)), ...el.filter(isBw)].slice(0, 25);
    let theme = null, unit = null, found = false, lastErr = null;
    outer: for (const th of themeTry) {
      for (const u of (units.length ? units : [null]).slice(0, 8)) {
        try { await spec.build({ theme: th, difficulty: 1, locale: 'en', unit: u }, { rng: makeRng('level-ladder|' + spec.id) }); theme = th; unit = u; found = true; break outer; }
        catch (e) { lastErr = e; }
      }
    }
    row.themeUsed = theme; row.unitUsed = unit;
    if (!found) { row.verdict = 'REFUSED-ALL'; row.note = String(lastErr && lastErr.message || lastErr).slice(0, 200); rows.push(row); continue; }
    const built = [];
    for (const lv of [1, 2, 3]) {
      if (!d[lv]) { built.push(null); continue; }
      try {
        const b = await spec.build({ theme, difficulty: lv, locale: 'en', unit }, { rng: makeRng('level-ladder|' + spec.id) });
        built.push(stats(b.bodyHtml));
      } catch (e) { built.push({ error: String(e.message || e).slice(0, 200) }); }
    }
    built.forEach((s, i) => { row.levels[i + 1] = s; });
    if (built.some((s) => s && s.error)) row.verdict = 'BUILD-ERROR';
    else {
      // judged by the PAGES: a building block may vary a level whose settings
      // row is identical (e.g. the fraction unit/non-unit rule), and settings
      // may differ while the page ignores them
      row.configsIdentical = !d[2] || !d[3] || same(cfg[0], cfg[1]) || same(cfg[1], cfg[2]) || same(cfg[0], cfg[2]);
      const distinct = new Set(built.filter(Boolean).map((s) => s.hash)).size;
      row.verdict = distinct >= 3 ? 'DIFFERENT' : (row.configsIdentical ? 'SAME-CONFIG' : 'SAME-PAGE');
    }
    rows.push(row);
  }
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(path.join(OUT, 'audit.json'), JSON.stringify(rows, null, 1));
  const tally = {};
  for (const r of rows) { const k = r.grade + ' ' + r.verdict; tally[k] = (tally[k] || 0) + 1; }
  console.log(Object.entries(tally).sort().map(([k, v]) => k.padEnd(18) + v).join('\n'));
  const bwUsable = rows.filter((r) => r.themes.bw > 0).length;
  console.log(`\n${rows.length} types · ${bwUsable} can use black-and-white themes · written ${path.relative(process.cwd(), path.join(OUT, 'audit.json'))}`);
})().catch((e) => { console.error(e); process.exit(1); });
