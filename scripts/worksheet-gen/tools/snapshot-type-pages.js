#!/usr/bin/env node
/**
 * snapshot-type-pages.js — fingerprint the page every worksheet type builds,
 * so a change to a shared builder can PROVE what it changed (2026-09-27).
 *
 * For every type × level (1/2/3) × locale (en, de, fi) × theme (first colour
 * theme the type accepts, and its first B&W theme when it accepts one), build
 * the page with the published seed recipe (instanceSeed, seedEpoch 1) and
 * record a hash of bodyHtml. Refused combinations are recorded as REFUSED.
 *
 *   --out=<file>      write a snapshot
 *   --compare=<file>  build again and list every (type, level, locale, theme)
 *                     whose page changed; exit 1 when any did
 *   --types=A,B       limit to some types
 *
 * The rule it enforces for builder fixes: level 2 — the level every type has
 * been published at — must stay byte-identical; only intended levels change.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { loadAllTypes } = require('../lib/load-types.js');
const { makeRng, instanceSeed } = require('../lib/rng.js');
const resolve = require('../image-cache/resolve.js');

const arg = (k) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : null; };
const ONLY = arg('types') ? new Set(arg('types').split(',')) : null;
const LOCALES = ['en', 'de', 'fi'];
const isBw = (t) => /\bbw\b/i.test(t);

function themesFor(spec, all) {
  const ax = spec.themeAxis || {};
  if (ax.applicable === false) return [null];
  const ok = all.filter((t) => {
    if (ax.excludeBw && isBw(t)) return false;
    if (ax.bwOnly && !isBw(t)) return false;
    try { return resolve.labelSafeNouns(t).length >= (ax.minNouns || 1); } catch (e) { return false; }
  });
  const out = [];
  const c = ok.find((t) => !isBw(t)); if (c) out.push(c);
  const b = ok.find(isBw); if (b) out.push(b);
  return out.length ? out : [null];
}

async function snapshot() {
  const all = Object.keys(resolve.manifest().themes);
  const snap = {};
  for (const spec of loadAllTypes()) {
    if (!spec || !spec.id || (ONLY && !ONLY.has(spec.id))) continue;
    let unit = null;
    try { if (spec.unitAxis && spec.unitAxis.applicable) unit = (spec.unitAxis.units('en') || [])[0] || null; } catch (e) {}
    for (const theme of themesFor(spec, all)) {
      for (const level of [1, 2, 3]) {
        if (!spec.difficulty || !spec.difficulty[level]) continue;
        for (const locale of LOCALES) {
          const key = [spec.id, 'd' + level, locale, theme || '-'].join('|');
          try {
            const rng = makeRng(instanceSeed({ typeId: spec.id, theme, difficulty: level, seedEpoch: 1, unit }));
            const b = await spec.build({ theme, difficulty: level, locale, unit }, { rng });
            snap[key] = crypto.createHash('sha1').update(String(b.bodyHtml)).digest('hex').slice(0, 16);
          } catch (e) {
            snap[key] = 'REFUSED:' + String(e.message || e).slice(0, 60);
          }
        }
      }
    }
  }
  return snap;
}

(async () => {
  const out = arg('out'), cmp = arg('compare');
  if (!out && !cmp) { console.error('usage: --out=<file> | --compare=<file> [--types=A,B]'); process.exit(2); }
  const snap = await snapshot();
  if (out) {
    fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(snap));
    console.log('snapshot: ' + Object.keys(snap).length + ' pages → ' + out);
    return;
  }
  const base = JSON.parse(fs.readFileSync(cmp, 'utf8'));
  const changed = [];
  for (const k of Object.keys(snap)) if (k in base && base[k] !== snap[k]) changed.push(k);
  const added = Object.keys(snap).filter((k) => !(k in base));
  const removed = Object.keys(base).filter((k) => !(k in snap) && (!ONLY || ONLY.has(k.split('|')[0])));
  const byType = {};
  for (const k of changed) { const [id, lv] = k.split('|'); (byType[id] = byType[id] || new Set()).add(lv); }
  console.log('compared ' + Object.keys(snap).length + ' pages: ' + changed.length + ' changed, ' + added.length + ' new, ' + removed.length + ' missing');
  for (const [id, lv] of Object.entries(byType)) console.log('  ' + id.padEnd(8) + [...lv].sort().join(','));
  const d2 = changed.filter((k) => k.split('|')[1] === 'd2');
  if (d2.length) { console.log('\nLEVEL 2 CHANGED (' + d2.length + ') — published pages would differ:'); d2.slice(0, 30).forEach((k) => console.log('  ' + k)); }
  process.exit(changed.length || removed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
