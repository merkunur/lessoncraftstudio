#!/usr/bin/env node
/**
 * lighthouse-audit.js — live Core Web Vitals measurement harness.
 *
 * Drives a local headless Chrome via `npx lighthouse` against one representative
 * URL per public page type (homepage, topic, deck x6 runtime families, activity,
 * tool, worksheets hub), for BOTH mobile and desktop form factors.
 *
 * Why local Lighthouse instead of the PageSpeed Insights API: the keyless PSI
 * endpoint shares a global anonymous quota that is routinely exhausted (HTTP 429
 * RESOURCE_EXHAUSTED). Local Lighthouse produces the same lab metrics PSI reports
 * (LCP/CLS/TBT/FCP/SI), and a low-traffic site has no CrUX field data anyway.
 *
 * Usage:
 *   node scripts/lighthouse-audit.js                 # all URLs, mobile+desktop
 *   node scripts/lighthouse-audit.js --only=deck     # only labels containing "deck"
 *   node scripts/lighthouse-audit.js --form=mobile   # one form factor
 *
 * Output: docs/audit-results/lighthouse-<date>.json + a markdown table on stdout.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE = 'https://www.lessoncraftstudio.com';
// Canonical forms: Next.js pages are NO trailing slash (next.config trailingSlash:false
// 308-redirects /en/ -> /en; canonical + internal links are all no-slash). nginx-served
// deck pages ARE trailing-slash (that is their canonical form, served 200 directly).
// Using the wrong form injects a ~770ms mobile redirect penalty that real traffic never sees.
const URLS = [
  { label: 'home-en',        type: 'homepage',  url: `${BASE}/en` },
  { label: 'home-de',        type: 'homepage',  url: `${BASE}/de` },
  { label: 'topic-addition', type: 'topic',     url: `${BASE}/en/topic/addition` },
  { label: 'worksheets-hub', type: 'hub',       url: `${BASE}/en/worksheets` },
  { label: 'activity',       type: 'activity',  url: `${BASE}/en/activities/count-to-10-with-animals` },
  { label: 'tool',           type: 'tool',      url: `${BASE}/en/tools/ten-frame` },
  // one deck per runtime family (A letter-fill, B puzzle-drag, C grid-tap,
  // D bar-chart, E tap-connect, F drag-drop)
  { label: 'deck-A-addition',     type: 'deck', family: 'A', url: `${BASE}/en/decks/addition-find-addend-4th-of-july/` },
  { label: 'deck-B-wordsearch',   type: 'deck', family: 'B', url: `${BASE}/en/decks/wordsearch/` },
  { label: 'deck-C-find-count',   type: 'deck', family: 'C', url: `${BASE}/en/decks/find-and-count/` },
  { label: 'deck-D-chart-count',  type: 'deck', family: 'D', url: `${BASE}/en/decks/chart-count/` },
  { label: 'deck-E-matching',     type: 'deck', family: 'E', url: `${BASE}/en/decks/matching-letter/` },
  { label: 'deck-F-sudoku',       type: 'deck', family: 'F', url: `${BASE}/en/decks/sudoku/` },
];

const args = process.argv.slice(2);
const onlyRaw = (args.find(a => a.startsWith('--only=')) || '').split('=')[1] || '';
const onlyList = onlyRaw ? onlyRaw.split(',').map(s => s.trim()).filter(Boolean) : [];
const formArg = (args.find(a => a.startsWith('--form=')) || '').split('=')[1] || '';
const forms = formArg ? [formArg] : ['mobile', 'desktop'];

const CHROME = ['/c/Program Files/Google/Chrome/Application/chrome.exe',
                'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe']
                .find(p => { try { return fs.existsSync(p); } catch (e) { return false; } });
if (CHROME) process.env.CHROME_PATH = CHROME;

const KEY_DIAGS = [
  'render-blocking-resources', 'unminified-javascript', 'unminified-css',
  'unused-javascript', 'unused-css-rules', 'uses-text-compression',
  'uses-long-cache-ttl', 'uses-optimized-images', 'modern-image-formats',
  'uses-responsive-images', 'efficient-animated-content', 'total-byte-weight',
  'dom-size', 'mainthread-work-breakdown', 'server-response-time',
  'font-display', 'largest-contentful-paint-element', 'layout-shift-elements',
];

const cacheDir = path.join(__dirname, '..', '.lh-cache');
fs.mkdirSync(cacheDir, { recursive: true });

function runOne(entry, form) {
  const outFile = path.join(cacheDir, `${entry.label}-${form}.json`);
  const flags = [
    'lighthouse', entry.url,
    '--only-categories=performance',
    `--form-factor=${form}`,
    form === 'desktop' ? '--preset=desktop' : '--screenEmulation.mobile=true',
    '--output=json', `--output-path=${outFile}`,
    '--quiet', '--chrome-flags=--headless=new --no-sandbox --disable-gpu',
  ];
  try {
    execFileSync('npx', ['-y', ...flags], { stdio: 'ignore', timeout: 180000, shell: true });
  } catch (e) {
    return { error: e.message.slice(0, 120) };
  }
  const d = JSON.parse(fs.readFileSync(outFile, 'utf8'));
  const a = d.audits;
  const val = k => (a[k] ? a[k].displayValue : '');
  const num = k => (a[k] && a[k].numericValue != null ? a[k].numericValue : null);
  const opportunities = Object.values(a)
    .filter(x => x.details && x.details.type === 'opportunity' && x.details.overallSavingsMs > 30)
    .map(x => ({ id: x.id, title: x.title, savingsMs: Math.round(x.details.overallSavingsMs) }))
    .sort((x, y) => y.savingsMs - x.savingsMs);
  const diags = {};
  for (const k of KEY_DIAGS) if (a[k]) diags[k] = { score: a[k].score, display: a[k].displayValue };
  return {
    score: Math.round(d.categories.performance.score * 100),
    lcp: val('largest-contentful-paint'), lcpMs: num('largest-contentful-paint'),
    cls: val('cumulative-layout-shift'), clsNum: num('cumulative-layout-shift'),
    tbt: val('total-blocking-time'), tbtMs: num('total-blocking-time'),
    fcp: val('first-contentful-paint'), si: val('speed-index'),
    totalBytes: a['total-byte-weight'] ? a['total-byte-weight'].displayValue : '',
    opportunities, diags,
  };
}

const results = [];
for (const entry of URLS) {
  if (onlyList.length && !onlyList.some(o => entry.label.includes(o))) continue;
  for (const form of forms) {
    process.stderr.write(`[run] ${entry.label} ${form} ...\n`);
    const r = runOne(entry, form);
    results.push({ ...entry, form, ...r });
    process.stderr.write(`      score=${r.score} lcp=${r.lcp} cls=${r.cls} tbt=${r.tbt} fcp=${r.fcp}\n`);
  }
}

const date = new Date().toISOString().slice(0, 10);
const outJson = path.join(__dirname, '..', 'docs', 'audit-results', `lighthouse-${date}.json`);
fs.writeFileSync(outJson, JSON.stringify(results, null, 2));

// markdown table
const rows = results.map(r => `| ${r.label} | ${r.form} | ${r.score ?? 'ERR'} | ${r.lcp || ''} | ${r.cls || ''} | ${r.tbt || ''} | ${r.fcp || ''} | ${r.totalBytes || ''} |`);
console.log('\n| page | form | score | LCP | CLS | TBT | FCP | total bytes |');
console.log('|---|---|---|---|---|---|---|---|');
console.log(rows.join('\n'));
console.log(`\nJSON: ${outJson}`);
