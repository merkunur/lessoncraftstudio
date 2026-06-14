#!/usr/bin/env node
/**
 * audit-maker-pages.js — thin-page guardrail for the worksheet-MAKER landings
 * at /<locale>/tools/<slug> (SEO RESCUE Part 1). Sibling of
 * audit-tool-pages.js. Maker landings carry a crawlable teacher-framed body +
 * a LAUNCH link to the generator (no iframe embed) + WebApplication JSON-LD.
 *
 * Targets are derived from the maker-content files (same SoT the route +
 * sitemap + middleware carve-out use), so adding a maker/locale slug is picked
 * up automatically.
 *
 * Usage:
 *   node scripts/audit-maker-pages.js
 *   node scripts/audit-maker-pages.js --locales=en,de --out=docs/audit-results
 *
 * Exit 0 if every audited page passes; 1 otherwise.
 */

const fs = require('fs');
const path = require('path');

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const MAKER_KEYS = ['cryptogram', 'wordsearch', 'sudoku', 'crossword', 'find-objects', 'word-guess'];
const WORD_FLOOR = 200; // §17.4 content-depth floor (total crawlable words)

// EN telltales that must NOT appear in a non-EN maker page body (locale leak).
const EN_LEAK_MARKERS = [
  'About this worksheet maker',
  'How to use it in class',
  'Worksheet ideas',
  'More worksheet makers',
  'Open the free',
];

function parseArgs(argv) {
  const args = { locales: ALL_LOCALES, base: 'https://www.lessoncraftstudio.com', concurrency: 8, out: null };
  for (const a of argv.slice(2)) {
    if (a.startsWith('--locales=')) args.locales = a.slice('--locales='.length).split(',').map((s) => s.trim()).filter(Boolean);
    else if (a.startsWith('--base=')) args.base = a.slice('--base='.length).replace(/\/$/, '');
    else if (a.startsWith('--concurrency=')) args.concurrency = Math.max(1, parseInt(a.slice('--concurrency='.length), 10) || 8);
    else if (a.startsWith('--out=')) args.out = a.slice('--out='.length);
  }
  return args;
}

/** Load each locale's maker-content file → { locale: {makerKey: entry} }. */
function loadMakerContent() {
  const dir = path.join(__dirname, '..', 'frontend', 'messages', 'maker-content');
  const byLocale = {};
  for (const loc of ALL_LOCALES) {
    try {
      byLocale[loc] = JSON.parse(fs.readFileSync(path.join(dir, `${loc}.json`), 'utf8'));
    } catch {
      // locale file absent → that locale's maker pages simply aren't audited
    }
  }
  return byLocale;
}

function stripToText(html) {
  let h = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  h = h.replace(/<[^>]+>/g, ' ');
  h = h.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/gi, ' ');
  return h.replace(/\s+/g, ' ').trim();
}

function checkPage(html, { locale }) {
  const text = stripToText(html);
  const totalWords = (text.match(/\S+/g) || []).length;

  const ldBlocks = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];
  const ldJoined = ldBlocks.join(' ');
  const hasWebApplication = /"@type"\s*:\s*"WebApplication"/.test(ldJoined);

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;
  // Launch link to the generator HTML (the maker's CTA).
  const hasLaunchLink = /href="\/worksheet-generators\/[a-z0-9-]+\.html/i.test(html);
  // other-language anchors: a DIFFERENT locale's tools path
  const otherLangAnchor = (html.match(/href="\/([a-z]{2})\/tools\/[a-z0-9-]+/gi) || [])
    .filter((m) => !m.includes(`/${locale}/tools/`)).length;

  const leak = locale === 'en' ? [] : EN_LEAK_MARKERS.filter((m) => text.includes(m));

  const checks = {
    wordFloor: totalWords >= WORD_FLOOR,
    webApplicationJsonLd: hasWebApplication,
    singleH1: h1Count === 1,
    launchLink: hasLaunchLink,
    otherLanguageLink: otherLangAnchor >= 1,
    noLocaleLeak: leak.length === 0,
  };
  const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
  return { totalWords, h1Count, leak, checks, failed, pass: failed.length === 0 };
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'lcs-maker-audit/1.0' } });
  return { status: res.status, html: res.ok ? await res.text() : '' };
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let idx = 0;
  async function next() {
    while (idx < items.length) {
      const i = idx++;
      results[i] = await worker(items[i], i);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, next));
  return results;
}

async function main() {
  const args = parseArgs(process.argv);
  const content = loadMakerContent();
  const targets = [];
  for (const locale of args.locales) {
    const file = content[locale];
    if (!file) continue;
    for (const key of MAKER_KEYS) {
      const entry = file[key];
      if (entry && entry.slug) {
        targets.push({ makerKey: key, locale, slug: entry.slug, url: `${args.base}/${locale}/tools/${entry.slug}` });
      }
    }
  }
  if (!targets.length) {
    console.error('No maker (key × locale) targets found for locales:', args.locales.join(','));
    process.exit(1);
  }
  console.log(`Auditing ${targets.length} maker pages (${args.locales.join(',')}) at ${args.base} …`);

  const perPage = await runPool(targets, args.concurrency, async (t) => {
    try {
      const { status, html } = await fetchText(t.url);
      if (status !== 200) return { ...t, status, pass: false, error: `HTTP ${status}` };
      return { ...t, status, ...checkPage(html, t) };
    } catch (e) {
      return { ...t, status: 0, pass: false, error: e.message };
    }
  });

  const byLocale = {};
  for (const p of perPage) {
    const L = (byLocale[p.locale] = byLocale[p.locale] || { total: 0, pass: 0, fails: {} });
    L.total++;
    if (p.pass) L.pass++;
    for (const c of p.failed || []) L.fails[c] = (L.fails[c] || 0) + 1;
    if (p.error) L.fails[p.error] = (L.fails[p.error] || 0) + 1;
  }
  const passCount = perPage.filter((p) => p.pass).length;

  let md = `# Maker-page audit — ${args.base}\n\n`;
  md += `Audited **${perPage.length}** pages · **${passCount} pass / ${perPage.length - passCount} fail** · floor ${WORD_FLOOR} words\n\n`;
  md += `| locale | pages | pass | failing checks |\n|---|---|---|---|\n`;
  for (const loc of args.locales) {
    const L = byLocale[loc];
    if (!L) continue;
    const fails = Object.entries(L.fails).map(([k, v]) => `${k}×${v}`).join(', ') || '—';
    md += `| ${loc} | ${L.total} | ${L.pass} | ${fails} |\n`;
  }
  md += `\n## Failing pages\n\n`;
  const failing = perPage.filter((p) => !p.pass);
  if (!failing.length) md += `None — all audited pages pass.\n`;
  for (const p of failing) {
    md += `- \`${p.locale}\` ${p.url} — ${p.error ? p.error : `failed: ${p.failed.join(', ')} (totalWords=${p.totalWords}, h1=${p.h1Count}${p.leak && p.leak.length ? ', leak=' + p.leak.join('|') : ''})`}\n`;
  }

  console.log('\n' + md);

  if (args.out) {
    const outDir = path.isAbsolute(args.out) ? args.out : path.join(__dirname, '..', args.out);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'maker-page-audit.json'), JSON.stringify(perPage, null, 2));
    fs.writeFileSync(path.join(outDir, 'maker-page-audit.md'), md);
    console.log(`Wrote ${path.join(outDir, 'maker-page-audit.json')} + .md`);
  }

  process.exit(passCount === perPage.length ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
