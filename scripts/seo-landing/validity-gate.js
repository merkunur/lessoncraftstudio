#!/usr/bin/env node
/* Fan-out Planning Part 2 STEP C — the ONE pre-render coordinate-validity gate.
 * Enforces BOTH pilot-flagged refinements as one coherent check (not 3 bolt-ons):
 *   - per-mechanic property requirement  -> semantic validity (body_parts+sum blocked)
 *   - collective_risk + copy partitive scan -> "a tray of buns"+count flagged
 * Reads the compatibility property table. A coordinate that fails is NEVER authored.
 * Usage: node scripts/seo-landing/validity-gate.js        (runs the proof harness)
 */
const fs = require('fs');
const COMPAT = JSON.parse(fs.readFileSync('frontend/content/seo-landing/theme-mechanic-compat.json', 'utf8'));

function themeProps(theme) {
  return Object.assign({}, COMPAT.themeProperties._default, COMPAT.themeProperties[theme] || {});
}
function override(mechanic, theme) {
  return COMPAT.overrideWhitelist.find((o) => o.mechanic === mechanic && o.theme === theme);
}

/**
 * Validate a coordinate before authoring/rendering.
 * @param {string} type exercise-type    @param {string|null} mode
 * @param {string} theme                 @param {object} [opts] {copy: "rendered P1 text", readinessStrand?}
 * @returns {{valid:boolean, gate:string, reason:string, warn:string|null, readinessStrand?:string}}
 */
function validateCoordinate(type, mode, theme, opts = {}) {
  const gate = COMPAT.mechanicGate[type] || COMPAT.mechanicGate._otherDefault || 'none';
  const p = themeProps(theme);
  const ovr = override(type, theme);

  if (gate === 'readiness') {
    return { valid: true, gate, reason: 'readiness-class: no theme gate', warn: null,
             readinessStrand: (COMPAT.readinessStrands[type] || 'readiness'), jsonLd: 'OMIT educationalAlignment; teaches=readiness strand' };
  }
  if (gate === 'none') return { valid: true, gate, reason: 'ungated mechanic (letter/sort/match/pattern)', warn: null };

  if (gate === 'size') {
    if (!ovr && p.physical_size_orderable === false)
      return { valid: false, gate, reason: `INVALID: ${theme} has no orderable physical size for a size mechanic`, warn: null };
    return { valid: true, gate, reason: 'size-orderable', warn: null };
  }

  if (gate === 'phonetic') {
    return { valid: true, gate, reason: 'find-and-count: phonetic gate (no countability)',
             warn: p.phonetic_variety === false ? `WEAK: ${theme} has low onset variety` : null };
  }

  // gate === 'countability'
  if (!ovr && p.discrete_countable === false)
    return { valid: false, gate, reason: `INVALID: cannot ${type} ${theme} — not discrete-countable (semantic nonsense)`, warn: null };
  let warn = null;
  if (p.collective_risk) {
    warn = `COLLECTIVE-RISK: ${theme} — copy must use discrete counts, not partitives`;
    if (opts.copy) {
      const hit = COMPAT.copyPartitivePatterns.find((pat) => opts.copy.toLowerCase().includes(pat));
      if (hit) return { valid: false, gate, reason: `BLOCK: copy uses partitive "${hit}" for a counting mechanic`, warn };
    }
  }
  return { valid: true, gate, reason: ovr ? `override-whitelist: ${ovr.reason}` : 'discrete-countable', warn };
}

module.exports = { validateCoordinate };

if (require.main === module) {
  const cases = [
    ['BLOCK semantic (the body_parts catch)', 'addition', 'image-image', 'body_parts', {}],
    ['BLOCK partitive copy (the "tray of buns" catch)', 'addition', 'image-image', 'bakery', { copy: 'two loaves with a tray of buns on each row' }],
    ['PASS bakery with discrete copy', 'addition', 'image-image', 'bakery', { copy: 'two bagels beside three buns' }],
    ['PASS animals+addition', 'addition', 'image-image', 'animals', {}],
    ['PASS music+addition (read correction: instruments countable)', 'addition', 'image-image', 'music', {}],
    ['BLOCK emotions+subtraction', 'subtraction', 'cross-out', 'emotions', {}],
    ['BLOCK colors+addition', 'addition', 'image-image', 'colors', {}],
    ['PASS colors+chart-count (override whitelist)', 'chart-count', null, 'colors', {}],
    ['BLOCK weather+big-small (no orderable size)', 'big-small', 'findBig', 'weather', {}],
    ['PASS animals+big-small', 'big-small', 'findBig', 'animals', {}],
    ['PASS body_parts+grid-match (readiness routes around countability)', 'grid-match', null, 'body_parts', {}],
    ['PASS emotions+missing-pieces (readiness, shape-fit)', 'missing-pieces', 'one-missing', 'emotions', {}],
    ['WEAK colors+find-and-count (phonetic warn, not block)', 'find-and-count', 'letter-spotting', 'colors', {}],
    ['PASS any theme + wordsearch (ungated)', 'wordsearch', null, 'emotions', {}],
  ];
  let fails = 0;
  for (const [label, t, m, th, opts] of cases) {
    const r = validateCoordinate(t, m, th, opts);
    const tag = r.valid ? 'VALID' : 'BLOCKED';
    console.log(`[${tag}] ${label}\n    gate=${r.gate} reason="${r.reason}"${r.warn ? ' warn="' + r.warn + '"' : ''}`);
  }
  // assertions
  const must = (cond, msg) => { if (!cond) { console.log('ASSERT FAIL: ' + msg); fails++; } };
  must(!validateCoordinate('addition','image-image','body_parts').valid, 'body_parts+addition must block');
  must(!validateCoordinate('addition','image-image','bakery',{copy:'a tray of buns'}).valid, 'partitive copy must block');
  must(validateCoordinate('addition','image-image','music').valid, 'music+addition must pass');
  must(validateCoordinate('chart-count',null,'colors').valid, 'colors+chart-count must pass (override)');
  must(validateCoordinate('grid-match',null,'body_parts').valid, 'body_parts+grid-match must pass (readiness)');
  console.log(fails === 0 ? '\nALL ASSERTIONS PASS' : `\n${fails} ASSERTION(S) FAILED`);
  process.exit(fails === 0 ? 0 : 1);
}
