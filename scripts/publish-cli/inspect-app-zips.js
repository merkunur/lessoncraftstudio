#!/usr/bin/env node
/* =====================================================================
   inspect-app-zips.js — READ what a folder of "Export to catalog" ZIPs
   actually contains, BEFORE anything is uploaded (2026-09-27).

   The operator generates decks in the live worksheet apps. Until now the
   publisher could not see what each ZIP held: the per-app `settings` were
   partial (no number range in addition/subtraction), `images_used` dropped
   the theme folder, and `theme` was null for "all"/random. Every ZIP made
   by an app that loads catalog-export.js ≥ v44 carries manifest.fingerprint
   (the full settings form, every picture with its folder, every text on
   the page). This script turns that into a readable report.

   Per ZIP it prints: app · locale · mode · the themes the pictures really
   came from (colour / black-and-white) · the numbers printed on the page
   (min–max) · the settings that DIFFER between the ZIPs of the same app ·
   warnings.

   Warnings (exit 1 when any appear):
     NO-FINGERPRINT  the app page was an old cached copy → hard-refresh
                     (Ctrl+Shift+R) the app and regenerate this deck
     DUPLICATE       two ZIPs show the same pictures and the same texts
     NO-CONTENT      the fingerprint saw no pictures and < 3 texts
     UNKNOWN-FOLDER  a picture folder that no theme owns

   Folder → theme names come from the live /api/images (image folders are
   either the theme key or an internal id), cached in
   scripts/publish-cli/.cache/image-folder-themes.json (--refresh-themes).

   Usage:
     node scripts/publish-cli/inspect-app-zips.js <folder-with-zips> [--json] [--refresh-themes]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const https = require('https');
const AdmZip = require('adm-zip');

const SITE = 'https://www.lessoncraftstudio.com';
const CACHE_FILE = path.join(__dirname, '.cache', 'image-folder-themes.json');
const BW_RE = /(^|_)bw(_\d+)?$/i;

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'lcs-inspect-app-zips' } }, (res) => {
      let s = '';
      res.on('data', (d) => { s += d; });
      res.on('end', () => { try { resolve(JSON.parse(s)); } catch (e) { reject(new Error(url + ': ' + e.message)); } });
    }).on('error', reject);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
/* The site rate-limits bursts (an HTML error page instead of JSON) — pace
   the calls and retry with a growing pause. */
async function getJsonRetry(url) {
  for (let i = 0; ; i++) {
    try { return await getJson(url); }
    catch (e) { if (i >= 5) throw e; await sleep(2000 * (i + 1)); }
  }
}

async function folderThemeMap(refresh) {
  if (!refresh && fs.existsSync(CACHE_FILE)) return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  const themes = await getJsonRetry(SITE + '/api/themes-translated?locale=en');
  const map = {};
  for (const t of themes) {
    await sleep(400);
    const r = await getJsonRetry(SITE + '/api/images?theme=' + encodeURIComponent(t.value) + '&locale=en&limit=1000');
    for (const img of r.images || []) {
      const folder = String(img.path || '').split('/')[2];
      if (folder) map[folder] = t.value;
    }
    map[t.value] = t.value;
  }
  fs.mkdirSync(path.dirname(CACHE_FILE), { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(map, null, 2));
  return map;
}

/* Folders in fingerprint paths: the raw folder, or the webp mirror's
   "themes-lossless/<folder with spaces>" form. Normalise both. */
function themeOf(folder, map) {
  if (!folder) return null;
  const f = folder.trim();
  if (map[f]) return map[f];
  const k = f.toLowerCase().replace(/\s+/g, '_');
  if (map[k]) return map[k];
  return null;
}

function numbersIn(texts) {
  const nums = [];
  for (const t of texts || []) for (const m of String(t).match(/-?\d+/g) || []) nums.push(Number(m));
  return nums;
}

function inspectZip(file, map) {
  const zip = new AdmZip(file);
  const m = JSON.parse(zip.readAsText('manifest.json'));
  const fp = m.fingerprint;
  const r = {
    zip: path.basename(file), app: m.generator && m.generator.app, locale: m.language,
    mode: m.exercise_mode, declaredTheme: m.theme, warnings: [], form: {}, themes: [], numbers: null, texts: 0, pictures: 0,
  };
  if (!fp || fp.error) { r.warnings.push('NO-FINGERPRINT'); return r; }
  r.form = fp.form || {};
  r.canvas = fp.canvasId || null;
  const pics = (fp.images || []).filter((i) => i.kind === 'picture');
  r.pictures = pics.reduce((a, i) => a + (i.count || 1), 0);
  const themes = {};
  for (const p of pics) {
    if (p.kind === 'embedded-data-url') continue;
    const th = themeOf(p.folder, map);
    if (!th) { r.warnings.push('UNKNOWN-FOLDER ' + p.folder); continue; }
    themes[th] = (themes[th] || 0) + (p.count || 1);
  }
  r.themes = Object.entries(themes).map(([t, n]) => ({ theme: t, bw: BW_RE.test(t), pictures: n }));
  const nums = numbersIn(fp.texts);
  r.numbers = nums.length ? { min: Math.min(...nums), max: Math.max(...nums), count: nums.length } : null;
  r.texts = (fp.texts || []).length;
  r.signature = JSON.stringify([r.app, r.locale, pics.map((p) => p.path + '×' + p.count).sort(), fp.texts]);
  if (!pics.length && r.texts < 3) r.warnings.push('NO-CONTENT');
  return r;
}

/* Settings that differ between ZIPs of the same app — the useful part of a
   30-control form is only what the operator actually changed. */
function flat(v) { return v && typeof v === 'object' && !Array.isArray(v) ? v.value : v; }
function varyingKeys(rows) {
  const keys = new Set();
  rows.forEach((r) => Object.keys(r.form).forEach((k) => keys.add(k)));
  return [...keys].filter((k) => new Set(rows.map((r) => JSON.stringify(flat(r.form[k])))).size > 1);
}

(async () => {
  const dir = process.argv[2];
  if (!dir || !fs.existsSync(dir)) { console.error('usage: inspect-app-zips.js <folder-with-zips> [--json] [--refresh-themes]'); process.exit(2); }
  const map = await folderThemeMap(process.argv.includes('--refresh-themes'));
  const files = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.zip')).sort();
  const rows = [];
  for (const f of files) {
    try { rows.push(inspectZip(path.join(dir, f), map)); }
    catch (e) { rows.push({ zip: f, warnings: ['UNREADABLE ' + e.message], form: {}, themes: [] }); }
  }
  const seen = {};
  for (const r of rows) {
    if (!r.signature) continue;
    if (seen[r.signature]) r.warnings.push('DUPLICATE of ' + seen[r.signature]);
    else seen[r.signature] = r.zip;
  }
  if (process.argv.includes('--json')) { console.log(JSON.stringify(rows.map(({ signature, ...x }) => x), null, 2)); }
  else {
    const byApp = {};
    rows.forEach((r) => { (byApp[r.app || '?'] = byApp[r.app || '?'] || []).push(r); });
    for (const [app, list] of Object.entries(byApp)) {
      const vary = varyingKeys(list.filter((r) => Object.keys(r.form).length));
      console.log(`\n=== ${app} — ${list.length} ZIP(s)${vary.length ? ' — settings that differ: ' + vary.join(', ') : ''}`);
      for (const r of list) {
        const th = r.themes.map((t) => t.theme + (t.bw ? ' [B&W]' : '') + ' ×' + t.pictures).join(', ') || '(no pictures)';
        const nums = r.numbers ? `numbers ${r.numbers.min}–${r.numbers.max}` : 'no numbers';
        const set = vary.map((k) => k + '=' + JSON.stringify(flat(r.form[k]))).join(' ');
        console.log(`  ${r.zip}\n     ${r.locale || '?'} · mode ${r.mode || '-'} · ${th} · ${nums} · ${r.texts} texts${set ? '\n     ' + set : ''}${r.warnings.length ? '\n     ⚠ ' + r.warnings.join(' | ') : ''}`);
      }
    }
  }
  const warned = rows.filter((r) => r.warnings.length).length;
  console.log(`\n${rows.length} ZIP(s) inspected, ${warned} with warnings.`);
  process.exit(warned ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
