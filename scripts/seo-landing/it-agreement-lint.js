#!/usr/bin/env node
/* it-agreement-lint.js — deterministic Italian-grammar backstop for the it landing
 * fan-out (PART IT). Scans rendered it.json text (h1/p1/p2/p3) for the mechanical
 * error signatures the native author+reviewer loop targets, so a regression can't
 * ship silently:
 *   1. UNRENDERED placeholders ({N_PL}/{GEN}/{GEN_ART}/{H1}/{nb1}/{nb2}).
 *   2. UNCONTRACTED prep+definite-article (di/a/da/in/su + il|lo|la|i|gli|le|l'
 *      → must be del/al/dal/nel/sul…). "con" is intentionally NOT contracted.
 *   3. ARTICLE 'i' before a vowel / z / s-impura / gn / ps / x  (should be 'gli').
 *   4. doubled prepositions ("di di", "con con", "a a").
 * Usage: node scripts/seo-landing/it-agreement-lint.js [path-to-it.json]
 * Exit non-zero on any hit.
 */
'use strict';
const fs = require('fs');
const path = process.argv[2] || 'frontend/content/seo-landing/it.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const FIELDS = ['h1', 'p1', 'p2', 'p3', 'title', 'metaDescription'];
const RX = [
  { code: 'UNRENDERED_PLACEHOLDER', re: /\{(N_PL|GEN|GEN_ART|H1|nb1|nb2)\}/ },
  { code: 'UNCONTRACTED_PREP_ART', re: /\b(di|a|da|in|su) (il|lo|la|i|gli|le|l')\b/ },
  { code: 'I_BEFORE_VOWEL_OR_SIMPURA', re: /\bi (?=[aeiouàèéìòùAEIOU]|z|gn|ps|x|s[bcdfghlmnpqrtvz])/ },
  { code: 'DOUBLED_PREP', re: /\b(di|a|da|in|su|con|per) \1\b/ },
];

let hits = [];
for (const l of (data.landings || [])) {
  for (const f of FIELDS) {
    const v = l[f];
    if (typeof v !== 'string') continue;
    for (const { code, re } of RX) {
      const m = v.match(re);
      if (m) hits.push({ slug: l.slug, field: f, code, ctx: v.slice(Math.max(0, m.index - 25), m.index + 25) });
    }
  }
}

console.log('it-agreement-lint: ' + (data.landings || []).length + ' landings × ' + FIELDS.length + ' fields scanned');
if (!hits.length) { console.log('CLEAN — 0 agreement-signature hits.'); process.exit(0); }
console.log('FAIL — ' + hits.length + ' hit(s):');
for (const h of hits.slice(0, 60)) console.log('  [' + h.code + '] ' + h.slug + '.' + h.field + ' :: …' + h.ctx + '…');
process.exit(1);
