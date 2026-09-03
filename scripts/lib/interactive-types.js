/**
 * interactive-types.js — CommonJS reader for
 * frontend/config/interactive-exercise-types.ts.
 *
 * Which worksheet types run in a browser is needed by three things that cannot
 * share a module system: the Next app (TypeScript), the deploy-time static
 * landing renderer (CJS), and the reconciliation audit (CJS). Rather than
 * duplicate a 30-key list into each — where the copies would drift silently and
 * a landing page would keep advertising a Play button for a tracing sheet — the
 * TypeScript file stays the single source and this parses it.
 *
 * Parsing beats re-declaring: a stale copy is invisible, whereas a parse that
 * stops working is loud. The parser therefore refuses a suspiciously small
 * result rather than returning it, because an empty set would silently mark the
 * ENTIRE catalogue print-only and strip every play affordance on the site.
 *
 * `scripts/audit-worksheet-formats.js` re-derives the same set from production
 * and fails if it has drifted.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const CONFIG = path.resolve(__dirname, '..', '..', 'frontend', 'config', 'interactive-exercise-types.ts');

let _set = null;

/** The interactive exercise-type keys, parsed once. */
function interactiveTypes() {
  if (_set) return _set;
  const src = fs.readFileSync(CONFIG, 'utf8');
  const anchor = src.indexOf('INTERACTIVE_EXERCISE_TYPES');
  if (anchor === -1) throw new Error('interactive-types: INTERACTIVE_EXERCISE_TYPES not found in ' + CONFIG);
  const start = src.indexOf('new Set([', anchor);
  const end = src.indexOf(']', start);
  if (start === -1 || end === -1) throw new Error('interactive-types: could not parse the Set literal');
  const keys = [...src.slice(start, end).matchAll(/'([^']+)'/g)].map((m) => m[1]);
  // Non-vacuity: an empty or near-empty parse must THROW, never be returned.
  // Returned, it would mark every worksheet on the site print-only in silence.
  if (keys.length < 10) {
    throw new Error('interactive-types: parsed only ' + keys.length + ' keys — the parser is broken, not the data');
  }
  _set = new Set(keys);
  return _set;
}

/** True when this worksheet type has a browser-playable version. */
function isInteractiveType(exerciseType) {
  return !!exerciseType && interactiveTypes().has(exerciseType);
}

/**
 * True when this worksheet type is a printable PDF only.
 * An UNKNOWN type counts as print-only: a missing Play button is a small loss,
 * a Play button onto a static page is the defect this exists to remove.
 */
function isPrintOnlyType(exerciseType) {
  return !isInteractiveType(exerciseType);
}

module.exports = { interactiveTypes, isInteractiveType, isPrintOnlyType };
