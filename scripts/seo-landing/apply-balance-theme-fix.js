#!/usr/bin/env node
/**
 * apply-balance-theme-fix.js — operator ruling 2026-10-09: the published balance pages (G2-252 / G2-261 / G2-262) put
 * an animal or a vehicle on the pan "weighing" a few hundred grams; they moved to light objects with real weights
 * (G2-252 animals → clothing, vehicles → toys; G2-261 / G2-262 vehicles → toys; slugs kept). This applies the
 * landings' rewritten text (native rewrite) and moves coordinate.theme / slotTokens to the new theme. It edits ONLY the
 * touched lines inside each landing's own block (the files keep their own escaping); every edit names its exact OLD
 * text (parsed from the line), a mismatch is refused, re-running is a no-op.
 * argv[2] = {locale: {canonicalDeckSlug: {h1|title|meta|p1|p2|p3: {old, new}}}}.
 */
'use strict';
const fs = require('fs'); const path = require('path');
const E = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const NEWTHEME = { animals: 'clothing', vehicles: 'toys' };
const FIELD = { meta: 'metaDescription' };
const bad = []; let n = 0;
for (const [loc, bySlug] of Object.entries(E)) {
  const f = path.join(__dirname, '..', '..', 'frontend', 'content', 'seo-landing', loc + '.json');
  const raw = fs.readFileSync(f, 'utf8'); const EOL = raw.includes('\r\n') ? '\r\n' : '\n';   // the working copy may be CRLF
  const lines = raw.split(EOL);
  for (const [slug, fields] of Object.entries(bySlug)) {
    const ci = lines.findIndex((x) => x === `   "canonicalDeckSlug": ${JSON.stringify(slug)},`);
    if (ci < 0) { bad.push(`${loc} ${slug}: no landing`); continue; }
    let a = ci; while (a > 0 && lines[a] !== '  {') a--;
    let b = ci; while (b < lines.length && lines[b] !== '  },' && lines[b] !== '  }') b++;
    const at = (key) => { for (let i = a; i <= b; i++) if (lines[i].startsWith(`   ${JSON.stringify(key)}: `)) return i; return -1; };
    for (const [k, { old, new: nu }] of Object.entries(fields)) {
      const key = FIELD[k] || k, i = at(key);
      if (i < 0) { bad.push(`${loc} ${slug} ${key}: no line`); continue; }
      const m = /^(   "[^"]+": )(".*")(,?)$/.exec(lines[i]);
      const cur = JSON.parse(m[2]);
      if (cur === nu) continue;
      if (cur !== old) { bad.push(`${loc} ${slug} ${key}: text changed`); continue; }
      lines[i] = m[1] + JSON.stringify(nu) + m[3]; n++;
    }
    for (let i = a; i <= b; i++) {
      for (const [o, nw] of Object.entries(NEWTHEME)) {
        if (lines[i] === `    "theme": "${o}",`) { lines[i] = `    "theme": "${nw}",`; n++; }
        if (lines[i] === `    "${o}",` && lines[i - 1] === '    "measurement",') { lines[i] = `    "${nw}",`; n++; }
      }
    }
  }
  if (!bad.length) fs.writeFileSync(f, lines.join(EOL));
}
if (bad.length) { console.error('REFUSED:\n' + bad.join('\n')); process.exit(1); }
console.log('applied', n, 'edits');
