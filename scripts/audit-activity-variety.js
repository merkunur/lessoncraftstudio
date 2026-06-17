#!/usr/bin/env node
/* =====================================================================
   audit-activity-variety.js — the STANDING variety + shuffle gate
   (CLAUDE.md §A.13.60). Every activity must have ≥7 ORIGINAL distinct
   exercises AND a working post-pass order-only reshuffle (the child never
   gets the same sequence twice). This is a default-on definition-of-done
   gate: an activity is OUT OF SPEC without it.

   Two layers:
   • STATIC scan (no browser, catalog-wide): reads every
     mini tools/*-activities.json, reports each activity's pool size (where
     the manifest makes it enumerable) vs the ≥7 floor, and whether its
     wrapper implements the per-pass reshuffle (a `nextTask` definition) or
     still loops the shell's per-mount order. Surfaces the pre-existing
     backlog (engines not yet converted) as WARN, not a hard fail.
   • LIVE probe (puppeteer, per locale): for the IN-SCOPE activities
     (--activities filter, default "fractions"), mounts the real page,
     finds the mounted tool, drives its nextTask() over 2 full passes, and
     asserts ≥7 distinct rounds + pass-2 order ≠ pass-1 + same set
     (order-only). HARD gate (exit 1) for in-scope activities.

   Usage:
     node scripts/audit-activity-variety.js                      # static scan + live fractions, LIVE base
     node scripts/audit-activity-variety.js --base=http://localhost:3000
     node scripts/audit-activity-variety.js --activities=fractions --locales=en,de,fi
     node scripts/audit-activity-variety.js --strict             # backlog (sub-7 / no-reshuffle) also fails
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const arg = (k, d) => { const m = process.argv.find(a => a.startsWith('--' + k + '=')); return m ? m.split('=')[1] : d; };
const has = (k) => process.argv.includes('--' + k);
const BASE = arg('base', 'https://www.lessoncraftstudio.com');
const ACTIVITIES = arg('activities', 'fractions');
const LOCALES = arg('locales', 'en,de,es,pt,fr,it,nl,sv,da,no,fi').split(',');
const MIN = parseInt(arg('min', '7'), 10);
const STRICT = has('strict');
const MINI = path.join(__dirname, '..', 'mini tools');

/* engine-agnostic pool-size extractor from a manifest row's params */
function poolSize(row) {
  const p = row.params || {};
  if (Array.isArray(p.rounds)) return p.rounds.length;
  if (Array.isArray(p.targets)) return p.targets.length;
  if (Array.isArray(p.items)) return p.items.length;
  return null; // not enumerable from the manifest → manual
}

/* ---- STATIC catalog-wide scan ---- */
const manifests = fs.readdirSync(MINI).filter(f => /-activities\.json$/.test(f));
const rows = [];
for (const f of manifests) {
  try { JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')).forEach(r => rows.push(r)); } catch (e) { /* skip */ }
}
const wrapperHasNextTask = {};
function reshuffles(tool) {
  if (!(tool in wrapperHasNextTask)) {
    try {
      const src = fs.readFileSync(path.join(MINI, tool + '.js'), 'utf8');
      wrapperHasNextTask[tool] = /nextTask\s*[:(]/.test(src);
    } catch (e) { wrapperHasNextTask[tool] = false; }
  }
  return wrapperHasNextTask[tool];
}

const backlog = [];
console.log('=== STATIC variety scan (catalog-wide) — floor ≥' + MIN + ' originals + per-pass reshuffle ===');
for (const r of rows) {
  const n = poolSize(r), rs = reshuffles(r.tool);
  const poolStr = n === null ? 'N/A(manual)' : String(n);
  const ok = (n === null || n >= MIN) && rs;
  const flags = [];
  if (n !== null && n < MIN) flags.push('POOL<' + MIN);
  if (!rs) flags.push('NO-RESHUFFLE(shell-loop)');
  if (!ok) backlog.push(r.id + ' [pool ' + poolStr + ', ' + (rs ? 'reshuffle' : 'shell-loop') + ']');
  console.log('  ' + (ok ? 'ok  ' : 'WARN') + '  ' + r.id + '  pool=' + poolStr + '  reshuffle=' + (rs ? 'yes' : 'NO') + (flags.length ? '  <' + flags.join(',') + '>' : ''));
}
if (backlog.length) {
  console.log('\n  BACKLOG (' + backlog.length + ' activities not yet conforming — apply the rule when next touched):');
  backlog.forEach(b => console.log('    • ' + b));
}

/* ---- LIVE probe for in-scope activities ---- */
const scope = rows.filter(r => r.id.indexOf(ACTIVITIES) !== -1);
if (!scope.length) {
  console.log('\n(no activities match --activities=' + ACTIVITIES + ' for the live probe)');
  process.exit(STRICT && backlog.length ? 1 : 0);
}

(async () => {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const hardFails = [];

  console.log('\n=== LIVE probe (' + BASE + ') — in-scope: ' + scope.map(r => r.id).join(', ') + ' ===');
  for (const row of scope) {
    const N = poolSize(row);
    for (const loc of LOCALES) {
      const slug = row.slug[loc];
      if (!slug) continue;
      const label = row.id + ' @' + loc;
      const page = await browser.newPage();
      await page.setViewport({ width: 412, height: 900 });
      try {
        await page.goto(`${BASE}/${loc}/activities/${slug}`, { waitUntil: 'networkidle2', timeout: 60000 });
        const fh = await page.waitForSelector('iframe', { timeout: 20000 });
        const fr = await fh.contentFrame();
        // wait for the mounted tool + its manifest pool to load
        await fr.waitForFunction(() => {
          for (const k of Object.keys(window)) {
            const o = window[k];
            if (o && typeof o === 'object' && typeof o.nextTask === 'function' && o._activityRow) return true;
          }
          return false;
        }, { timeout: 20000 });
        // drive nextTask over 2 full passes and capture pool-stable round ids
        const ids = await fr.evaluate((count) => {
          let tool = null;
          for (const k of Object.keys(window)) {
            const o = window[k];
            if (o && typeof o === 'object' && typeof o.nextTask === 'function') { tool = o; break; }
          }
          const out = [];
          for (let i = 0; i < count; i++) { const t = tool.nextTask({ index: i, completed: i }); out.push(t ? t.id : null); }
          return out;
        }, 2 * N);
        const pass1 = ids.slice(0, N), pass2 = ids.slice(N, 2 * N);
        const distinct = new Set(pass1).size;
        const sameSet = pass1.slice().sort().join('|') === pass2.slice().sort().join('|');
        const orderDiffers = pass1.join('|') !== pass2.join('|');
        const probs = [];
        if (distinct < MIN) probs.push(`only ${distinct} distinct (<${MIN})`);
        if (!sameSet) probs.push('pass-2 is not the same item set (order-only violated)');
        if (!orderDiffers) probs.push('pass-2 order identical to pass-1 (no reshuffle)');
        if (probs.length) { hardFails.push(`${label}: ${probs.join('; ')}`); console.log('  FAIL ' + label + ' — ' + probs.join('; ')); }
        else console.log(`  ok   ${label} — ${distinct} distinct, pass-2 reshuffled (same set, different order)`);
      } catch (e) {
        hardFails.push(`${label}: ${e.message}`); console.log('  FAIL ' + label + ' — ' + e.message);
      } finally { await page.close(); }
    }
  }
  await browser.close();

  console.log('');
  const backlogFail = STRICT && backlog.length;
  if (hardFails.length || backlogFail) {
    console.error(`VARIETY GATE FAILED — ${hardFails.length} in-scope failure(s)` + (backlogFail ? ` + ${backlog.length} backlog (--strict)` : '') + '.');
    process.exit(1);
  }
  console.log(`VARIETY GATE PASSED — in-scope activities have ≥${MIN} originals + a working post-pass order-only reshuffle across ${LOCALES.length} locale(s).` + (backlog.length ? ` (${backlog.length} other activities reported as backlog — not blocking.)` : ''));
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
