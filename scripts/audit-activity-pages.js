#!/usr/bin/env node
/**
 * audit-activity-pages.js — thin-page guardrail for /<locale>/activities/<slug>/
 *
 * Activities run their playable engine inside an iframe (invisible to
 * crawlers), so the parent activity page is the ONLY indexable surface. This
 * script fetches each live activity page and asserts it carries enough unique
 * crawlable content + structured data + internal links to rank — the floor the
 * 1000+ activity rollout must never drop below.
 *
 * It is the activity-page analogue of scripts/publish-cli/audit-deck-html.js
 * (per CLAUDE.md §A.14.9): per-page checks → per-page JSON + an aggregate
 * markdown summary, concurrency-limited. READ-ONLY — only HTTPS GETs.
 *
 * Usage:
 *   node scripts/audit-activity-pages.js                       # all 11 locales, prod
 *   node scripts/audit-activity-pages.js --locales=en,de,fi
 *   node scripts/audit-activity-pages.js --base=https://www.lessoncraftstudio.com
 *   node scripts/audit-activity-pages.js --concurrency=8 --out=docs/audit-results
 *
 * Exit code: 0 if every audited page passes every (applicable) check; 1 otherwise.
 */

const fs = require('fs');
const path = require('path');

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const WORD_FLOOR = 200; // §17.4 content-depth floor

// EN telltales that must NOT appear in a non-EN page body (locale-leak guard).
const EN_LEAK_MARKERS = [
  "What's inside this activity",
  'How to play',
  'What your child practices',
  'no timer and no score',
  'About this activity',
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

/** Load every activity row from the manifests. */
function loadActivityRows() {
  const dir = path.join(__dirname, '..', 'frontend', 'public', 'mini-tools');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('-activities.json'));
  const rows = [];
  for (const f of files) {
    try {
      const arr = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
      if (Array.isArray(arr)) rows.push(...arr);
    } catch (e) {
      console.warn('[audit] could not parse', f, e.message);
    }
  }
  return rows;
}

function stripToText(html) {
  let h = html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ');
  h = h.replace(/<[^>]+>/g, ' ');
  // decode a few common entities so word counts aren't inflated/garbled
  h = h.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&[a-z]+;/gi, ' ');
  return h.replace(/\s+/g, ' ').trim();
}

function uniqueWordCount(text) {
  const words = text.toLowerCase().match(/[\p{L}\p{N}]+/gu) || [];
  return new Set(words).size;
}

function checkPage(html, { locale, code }) {
  const text = stripToText(html);
  const uniqWords = uniqueWordCount(text);
  const totalWords = (text.match(/\S+/g) || []).length;

  const ldBlocks = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) || [];
  const ldJoined = ldBlocks.join(' ');
  const hasLearningResource = /"@type"\s*:\s*"LearningResource"/.test(ldJoined);
  const hasFaq = /"@type"\s*:\s*"FAQPage"/.test(ldJoined);

  const h1Count = (html.match(/<h1[\s>]/gi) || []).length;

  const standardsAnchor = new RegExp(`/${locale}/standards/${code.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(html);
  const relatedAnchor = (html.match(new RegExp(`href="/${locale}/activities/[a-z0-9-]+`, 'gi')) || []).length;
  // other-language anchors: links to a DIFFERENT locale's activities path
  const otherLangAnchor = (html.match(/href="\/(?!" )([a-z]{2})\/activities\/[a-z0-9-]+/gi) || [])
    .filter((m) => !m.includes(`/${locale}/activities/`)).length;

  const leak = locale === 'en' ? [] : EN_LEAK_MARKERS.filter((m) => text.includes(m));

  const checks = {
    wordFloor: uniqWords >= WORD_FLOOR,
    learningResourceJsonLd: hasLearningResource,
    faqJsonLd: hasFaq,
    singleH1: h1Count === 1,
    standardsHubLink: standardsAnchor,
    relatedLink: relatedAnchor >= 1,
    otherLanguageLink: otherLangAnchor >= 1,
    noLocaleLeak: leak.length === 0,
  };
  const failed = Object.entries(checks).filter(([, v]) => !v).map(([k]) => k);
  return { uniqWords, totalWords, h1Count, leak, checks, failed, pass: failed.length === 0 };
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'user-agent': 'lcs-activity-audit/1.0' } });
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
  const rows = loadActivityRows();
  const targets = [];
  for (const row of rows) {
    for (const locale of args.locales) {
      const slug = row.slug && row.slug[locale];
      if (slug) targets.push({ id: row.id, locale, slug, code: row.alignment.code, url: `${args.base}/${locale}/activities/${slug}/` });
    }
  }
  if (!targets.length) {
    console.error('No activity (row × locale) targets found for locales:', args.locales.join(','));
    process.exit(1);
  }
  console.log(`Auditing ${targets.length} activity pages (${args.locales.join(',')}) at ${args.base} …`);

  const perPage = await runPool(targets, args.concurrency, async (t) => {
    try {
      const { status, html } = await fetchText(t.url);
      if (status !== 200) return { ...t, status, pass: false, error: `HTTP ${status}` };
      const r = checkPage(html, t);
      return { ...t, status, ...r };
    } catch (e) {
      return { ...t, status: 0, pass: false, error: e.message };
    }
  });

  // Aggregate
  const checkNames = ['wordFloor', 'learningResourceJsonLd', 'faqJsonLd', 'singleH1', 'standardsHubLink', 'relatedLink', 'otherLanguageLink', 'noLocaleLeak'];
  const byLocale = {};
  for (const p of perPage) {
    const L = (byLocale[p.locale] = byLocale[p.locale] || { total: 0, pass: 0, fails: {} });
    L.total++;
    if (p.pass) L.pass++;
    for (const c of p.failed || []) L.fails[c] = (L.fails[c] || 0) + 1;
    if (p.error) L.fails[p.error] = (L.fails[p.error] || 0) + 1;
  }
  const passCount = perPage.filter((p) => p.pass).length;

  // Markdown summary
  let md = `# Activity-page audit — ${args.base}\n\n`;
  md += `Audited **${perPage.length}** pages · **${passCount} pass / ${perPage.length - passCount} fail** · floor ${WORD_FLOOR} unique words\n\n`;
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
    md += `- \`${p.locale}\` ${p.url} — ${p.error ? p.error : `failed: ${p.failed.join(', ')} (uniqWords=${p.uniqWords}, h1=${p.h1Count}${p.leak && p.leak.length ? ', leak=' + p.leak.join('|') : ''})`}\n`;
  }

  console.log('\n' + md);

  if (args.out) {
    const outDir = path.isAbsolute(args.out) ? args.out : path.join(__dirname, '..', args.out);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'activity-page-audit.json'), JSON.stringify(perPage, null, 2));
    fs.writeFileSync(path.join(outDir, 'activity-page-audit.md'), md);
    console.log(`Wrote ${path.join(outDir, 'activity-page-audit.json')} + .md`);
  }

  process.exit(passCount === perPage.length ? 0 : 1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
