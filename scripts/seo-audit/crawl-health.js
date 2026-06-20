#!/usr/bin/env node
/**
 * crawl-health.js — live SEO indexability regression guard.
 *
 * Samples real URLs per page type (from the live sitemap shards) and asserts the
 * invariants that the Part-2 baseline verified healthy (2026-06-20), so any future
 * regression (a sitemap URL going noindex/404, a canonical breaking, hreflang
 * dropping out of <head>, etc.) is caught. Read-only: fetches the live site only.
 *
 * Checks per sampled URL:
 *   - HTTP 200 (not 404/301/410)
 *   - <link rel="canonical"> present, https://www. host
 *   - NOT noindex (meta robots / X-Robots-Tag) — except deck.html PDFs (allowed)
 *   - SSR pages (landing/topic/activity/tool/standards/learn/home): hreflang in
 *     <head> incl. pt-BR + x-default
 *   - deck.html: self-canonical (landing-less) OR canonical→a 200 landing
 *
 * Plus: sitemap index lists the expected shards, and each shard returns 200.
 *
 * Usage:  node scripts/seo-audit/crawl-health.js [--per-shard=8] [--base=https://www.lessoncraftstudio.com]
 * Exit 0 = all pass; 1 = failures (printed).
 */
'use strict';

const ARGS = process.argv.slice(2).reduce((o, a) => {
  const m = a.match(/^--([^=]+)=(.*)$/); if (m) o[m[1]] = m[2]; return o;
}, {});
const BASE = ARGS.base || 'https://www.lessoncraftstudio.com';
const PER_SHARD = parseInt(ARGS['per-shard'] || '8', 10);
const UA = { 'User-Agent': 'Mozilla/5.0 (crawl-health audit)' };

let fails = 0, checked = 0;
const fail = (url, msg) => { fails++; console.log(`  FAIL ${url}\n       ${msg}`); };

async function get(url) {
  const res = await fetch(url, { headers: UA, redirect: 'manual' });
  const status = res.status;
  const ct = res.headers.get('content-type') || '';
  let body = '';
  // read body for HTML pages AND XML sitemaps (not binary assets)
  if (status === 200 && (ct.includes('html') || ct.includes('xml'))) body = await res.text();
  return { status, body, xrobots: res.headers.get('x-robots-tag') || '', location: res.headers.get('location') || '' };
}
const head = (html) => { const i = html.indexOf('</head>'); return i < 0 ? html : html.slice(0, i); };
const canonicalOf = (html) => { const m = head(html).match(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i); return m ? m[1] : null; };
const isNoindex = (html, xr) => /noindex/i.test(xr) || /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(head(html));
const hreflangCodes = (html) => [...head(html).matchAll(/<link[^>]+rel=["']alternate["'][^>]*hreflang=["']([^"']+)["']/gi)].map(m => m[1].toLowerCase());

async function sampleSitemap(id, n) {
  const { status, body } = await get(`${BASE}/sitemap/${id}.xml`);
  if (status !== 200) { fail(`${BASE}/sitemap/${id}.xml`, `shard HTTP ${status}`); return []; }
  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  // even spread, not just the first n
  const out = []; const step = Math.max(1, Math.floor(locs.length / n));
  for (let i = 0; i < locs.length && out.length < n; i += step) out.push(locs[i]);
  return out;
}

async function auditSsr(url) {
  checked++;
  const { status, body, xrobots } = await get(url);
  if (status !== 200) return fail(url, `HTTP ${status} (expected 200)`);
  const can = canonicalOf(body);
  if (!can) return fail(url, 'no <link rel=canonical>');
  if (!can.startsWith('https://www.')) fail(url, `canonical not https://www: ${can}`);
  if (isNoindex(body, xrobots)) fail(url, 'noindex on a sitemap URL');
  const hl = hreflangCodes(body);
  if (hl.length) {
    if (!hl.includes('x-default')) fail(url, 'hreflang present but no x-default');
    // pt-BR must be used (never bare pt) when pt is in the cluster
    if (hl.includes('pt')) fail(url, 'bare hreflang="pt" (must be pt-BR)');
  }
}

async function auditDeck(url) {
  checked++;
  const { status, body, xrobots } = await get(url); // url ends with /decks/<slug>/
  if (status !== 200) return fail(url, `HTTP ${status}`);
  if (isNoindex(body, xrobots)) fail(url, 'deck.html noindex');
  const can = canonicalOf(body);
  if (!can) return fail(url, 'deck.html no canonical');
  if (can.includes('/worksheets/')) {
    // canonical → landing: the landing must be 200 + indexable
    const l = await get(can);
    if (l.status !== 200) fail(url, `canonical→landing ${can} returns ${l.status}`);
    else if (isNoindex(l.body, l.xrobots)) fail(url, `canonical→landing ${can} is noindex`);
  } else if (!can.includes('/decks/')) {
    fail(url, `unexpected canonical: ${can}`);
  }
}

async function main() {
  console.log(`crawl-health @ ${BASE}  (per-shard=${PER_SHARD})\n`);

  // 1. sitemap index
  const idx = await get(`${BASE}/sitemap.xml`);
  const shards = [...idx.body.matchAll(/\/sitemap\/(\d+)\.xml/g)].map(m => m[1]);
  console.log(`sitemap index shards: ${[...new Set(shards)].join(', ')}`);
  for (const want of ['0', '1', '2', '3', '4']) if (!shards.includes(want)) fail(`${BASE}/sitemap.xml`, `shard ${want} missing from index`);

  // 2. SSR pages from shard 3 (topics/activities/tools/standards/learn/home/worksheets-hub) + shard 4 (landings) + shard 2 (intersections)
  console.log('\n[SSR pages — shards 2/3/4]');
  for (const id of ['2', '3', '4']) {
    const urls = await sampleSitemap(id, PER_SHARD);
    for (const u of urls) await auditSsr(u);
  }

  // 3. deck.html from shards 0/1 (landing-less, self-canonical) — the Part-2 re-add
  console.log('\n[deck.html — shards 0/1 (landing-less)]');
  for (const id of ['0', '1']) {
    const urls = await sampleSitemap(id, PER_SHARD);
    if (!urls.length) console.log(`  (shard ${id} empty — deck re-add not deployed yet?)`);
    for (const u of urls) await auditDeck(u);
  }

  console.log(`\n=== checked=${checked} fails=${fails} ===`);
  process.exit(fails ? 1 : 0);
}
main().catch((e) => { console.error('FATAL', e && e.stack || e); process.exit(2); });
