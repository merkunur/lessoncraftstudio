#!/usr/bin/env node
/* =====================================================================
   register-money-mat.js — the 7 registration points, IDEMPOTENT.

   money-mat is already registered; this exists so the registration can be
   RE-ASSERTED after any refactor and so the wrapper bump is not done by
   hand. A second run must report every point as already done.

   ⚠ Point 3 (TOOL_WRAPPER_VERSION) is the one NON-IDEMPOTENT step. It is
     guarded on a state that IS stable — the tool's own ?v= cache-buster —
     so a second run cannot double-bump it.
   ⚠ Every guard REFUSES TO RUN if it parses implausibly little. A check
     that cannot fail is as useless as one that cannot pass, and a
     completeness check listing a subset of the required fields is worse
     than none, because it certifies.

   Usage: node scripts/register-money-mat.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const KEY = 'money-mat';
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const read = (p) => fs.readFileSync(path.join(REPO, p), 'utf8');
const results = [];
const say = (n, state, detail) => { results.push({ n, state, detail }); };
let broken = 0;

/* ---- 1. live-tool-slugs — THE 410 TRAP ---- */
{
  const f = 'frontend/config/live-tool-slugs.ts';
  const s = read(f);
  const keys = (s.match(/'[a-z0-9-]+'/g) || []).length;
  if (keys < 20) { console.log(`REFUSING: ${f} parsed only ${keys} keys — the guard would be vacuous`); process.exit(1); }
  const has = s.includes(`'${KEY}'`);
  say('1 live-tool-slugs TOOL_KEYS', has ? 'ok' : 'MISSING',
    has ? `${keys} keys` : '⚠ ALL ELEVEN LOCALES WOULD RETURN 410 — /tools/* is a seller-era teardown and this is the carve-out');
  if (!has) broken++;
}

/* ---- 2. tool-content — 4 edits, and the FULL ToolEntry field list ---- */
let REQUIRED = [];
{
  const f = 'frontend/lib/seo/tool-content.ts';
  const s = read(f);
  const iface = (s.match(/export interface ToolEntry \{([\s\S]*?)\}/) || [])[1] || '';
  REQUIRED = (iface.match(/^\s*(\w+)\s*:/gm) || []).map((x) => x.trim().replace(':', ''));
  /* ⚠ READ THE FIELD LIST OFF THE INTERFACE, and refuse a short parse. A
     completeness check that lists five of eight fields certifies a
     half-formed entry — that is how tool #42 failed the static export of
     all eleven landing pages AFTER two guards reported success. */
  if (REQUIRED.length < 6) { console.log(`REFUSING: parsed only ${REQUIRED.length} ToolEntry fields — implausible`); process.exit(1); }
  for (const [label, re] of [
    ['TOOL_KEYS', new RegExp(`'${KEY}'`)],
    ['TOOL_MINI_URL', new RegExp(`'${KEY}':\\s*'/mini-tools/${KEY}\\.html'`)],
    ['TOOL_ACTIVITY_PREFIX', new RegExp(`'${KEY}':\\s*'${KEY}'`)],
    ['ToolContentFile member', new RegExp(`'${KEY}'\\?:\\s*ToolEntry`)]
  ]) {
    const has = re.test(s);
    say(`2 tool-content ${label}`, has ? 'ok' : 'MISSING');
    if (!has) broken++;
  }
}

/* ---- 3. TOOL_WRAPPER_VERSION — the one non-idempotent step ---- */
{
  const wf = 'frontend/app/[locale]/tools/[tool]/page.tsx';
  const hf = `mini tools/${KEY}.html`;
  const w = read(wf), h = read(hf);
  const wv = (w.match(/TOOL_WRAPPER_VERSION = '([\d.]+)'/) || [])[1];
  const cv = (h.match(new RegExp(`${KEY}\\.js\\?v=(\\d+)`)) || [])[1];
  if (!wv || !cv) { console.log('REFUSING: could not read the wrapper version or the cache-buster'); process.exit(1); }
  /* GUARDED ON A STABLE STATE: the bump is owed only while the tool's own
     ?v= is ahead of what a previous run recorded. A marker file would drift;
     the cache-buster is the artefact that actually changes when the JS does. */
  const marker = path.join(REPO, 'scripts', `.register-${KEY}.json`);
  let last = {};
  try { last = JSON.parse(fs.readFileSync(marker, 'utf8')); } catch (_) {}
  const owed = last.cacheBuster !== cv;
  if (owed && !DRY) {
    const next = wv.replace(/(\d+)$/, (n) => String(Number(n) + 1));
    fs.writeFileSync(path.join(REPO, wf), w.replace(`TOOL_WRAPPER_VERSION = '${wv}'`, `TOOL_WRAPPER_VERSION = '${next}'`));
    fs.writeFileSync(marker, JSON.stringify({ cacheBuster: cv, wrapper: next }, null, 2) + '\n');
    say('3 TOOL_WRAPPER_VERSION', 'bumped', `${wv} → ${next} (tool is at ?v=${cv})`);
  } else {
    say('3 TOOL_WRAPPER_VERSION', 'ok', `${wv}, already bumped for ?v=${cv}`);
  }
}

/* ---- 4. the hub card ---- */
{
  const s = read('frontend/lib/manipulatives.ts');
  const has = new RegExp(`id:\\s*"${KEY}"`).test(s) || new RegExp(`id:\\s*'${KEY}'`).test(s);
  say('4 manipulatives hub card', has ? 'ok' : 'MISSING');
  if (!has) broken++;
}

/* ---- 5. the 11 landing entries, EVERY required field ---- */
{
  const missing = [];
  const slugs = {};
  for (const L of LOCALES) {
    const j = JSON.parse(read(`frontend/messages/tool-content/${L}.json`));
    const e = j[KEY];
    if (!e) { missing.push(`${L}: no entry`); continue; }
    for (const k of REQUIRED) if (!e[k] || (Array.isArray(e[k]) && !e[k].length)) missing.push(`${L}.${k}`);
    if (e.slug && !/^[a-z0-9-]+$/.test(e.slug)) missing.push(`${L}: slug "${e.slug}" is not url-safe`);
    if (e.slug) { if (slugs[e.slug]) missing.push(`${L}: slug collides with ${slugs[e.slug]}`); slugs[e.slug] = L; }
  }
  say(`5 landing entries (${REQUIRED.length} required fields × 11)`, missing.length ? 'MISSING' : 'ok', missing.slice(0, 4).join(', '));
  if (missing.length) broken++;
}

/* ---- 6. the category — omission does NOT error, it silently mis-files ---- */
{
  const s = read('frontend/lib/tool-categories.ts');
  const union = (s.match(/export type ToolCategory\s*=\s*([^;]+);/) || [])[1] || '';
  const valid = (union.match(/'([a-z]+)'/g) || []).map((x) => x.replace(/'/g, ''));
  if (valid.length < 3) { console.log('REFUSING: could not parse the ToolCategory union'); process.exit(1); }
  const m = s.match(new RegExp(`'${KEY}':\\s*'([a-z]+)'`));
  const cat = m && m[1];
  const okCat = cat && valid.includes(cat);
  say('6 tool-categories', okCat ? 'ok' : 'MISSING',
    okCat ? `'${cat}' of [${valid}]` : `⚠ toolCategory() falls back to 'number' — the tool would sit in the wrong hub section forever`);
  if (!okCat) broken++;
}

/* ---- 7. the hub thumbnail — omission does not error either ---- */
{
  const p = path.join(REPO, 'frontend/public/mini-tools/tool-previews', `${KEY}.webp`);
  const has = fs.existsSync(p);
  const seeds = read('scripts/generate-tool-previews.js');
  const seeded = new RegExp(`'${KEY}':`).test(seeds);
  say('7 preview webp + SEEDS', has && seeded ? 'ok' : 'CHECK',
    `${has ? 'webp present' : '⚠ NO WEBP — the card falls back to a generic glyph'}; ${seeded ? 'seeded' : '⚠ no SEEDS entry'}` +
    (has ? '  (gitignored — regenerate and scp BEFORE deploy.sh)' : ''));
  if (!has || !seeded) broken++;
}

console.log(`\nregister-${KEY}${DRY ? ' (dry run)' : ''}`);
for (const r of results) console.log(`  ${r.state === 'ok' ? '✓' : r.state === 'bumped' ? '▲' : '✗'} ${r.n}${r.detail ? ' — ' + r.detail : ''}`);
console.log(broken ? `\n${broken} registration point(s) need attention` : '\nall 7 registration points in place');
process.exit(broken ? 1 : 0);
