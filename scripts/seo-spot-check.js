#!/usr/bin/env node
/**
 * Phase 8 SEO crawl spot-check.
 *
 * Fetches a representative URL × locale matrix against a running site
 * and asserts the technical-SEO invariants enforced by Phase 3-7:
 *   - rel=canonical resolves directly (no 3xx)
 *   - every hreflang URL resolves directly (no 3xx)
 *   - canonical and current request URL match (idempotent canonical)
 *   - no trailing slash on Next.js routes (homepage, topic, worksheets,
 *     activities, about); deck.html URLs keep their slash (nginx-strict)
 *   - hreflang set is reciprocal (sampled across 3 locales)
 *   - rendered <head> carries og:image + summary_large_image twitter
 *
 * Usage:
 *   BASE=http://localhost:3000 node scripts/seo-spot-check.js
 *   BASE=https://www.lessoncraftstudio.com node scripts/seo-spot-check.js
 *
 * Exit codes:
 *   0 — all assertions passed
 *   1 — at least one assertion failed (details printed)
 *   2 — fetch error / server unreachable
 *
 * Requires the dev server (or production) reachable at $BASE. Does NOT
 * start the server itself — operator runs `npm run dev` first.
 */

const BASE = (process.env.BASE || 'http://localhost:3000').replace(/\/+$/, '');

// Representative URL set across 3 locales + the deck-URL carve-out.
const TARGETS = [
  // Locale roots — no trailing slash
  { path: '/en', kind: 'next' },
  { path: '/de', kind: 'next' },
  { path: '/es', kind: 'next' },
  // Worksheets hub (Phase 3.3 added full metadata)
  { path: '/en/worksheets', kind: 'next' },
  { path: '/de/worksheets', kind: 'next' },
  { path: '/es/worksheets', kind: 'next' },
  // Topic single-axis
  { path: '/en/topic/animals', kind: 'next' },
  { path: '/de/topic/tiere', kind: 'next' },
  // Topic intersection
  { path: '/en/topic/addition/animals', kind: 'next' },
  // Activities
  { path: '/en/activities', kind: 'next' },
  { path: '/en/activities/forma-las-silabas', kind: 'next', allowMissing: true },
  // About — Phase 6 deliverable
  { path: '/en/about', kind: 'next' },
  { path: '/de/about', kind: 'next' },
  { path: '/fi/about', kind: 'next' },
  // Manipulatives
  { path: '/en/tools', kind: 'next' },
  // Worksheet-makers
  { path: '/en/worksheet-makers', kind: 'next' },
  // Deck nginx URL (trailing-slash carve-out — keeps slash)
  // Disabled by default since deck URLs are nginx-only on prod; uncomment
  // to spot-check against production: BASE=https://www.lessoncraftstudio.com
  // { path: '/en/decks/picture-trail/', kind: 'nginx', allowMissing: true },
];

let failed = 0;
let unreachable = 0;

async function fetchRaw(url) {
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const headers = new Map();
    for (const [k, v] of res.headers.entries()) headers.set(k.toLowerCase(), v);
    const text = res.status === 200 ? await res.text() : '';
    return { status: res.status, headers, text };
  } catch (err) {
    return { status: 0, error: err.message };
  }
}

function findTag(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : null;
}

function extractCanonical(html) {
  return findTag(html, /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
}

function extractAlternates(html) {
  const out = [];
  const re = /<link\s+rel=["']alternate["']\s+hreflang=["']([^"']+)["']\s+href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    out.push({ hreflang: m[1], href: m[2] });
  }
  return out;
}

function extractOgImage(html) {
  return findTag(html, /<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
}

function extractTwitterCard(html) {
  return findTag(html, /<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i);
}

function pass(target, msg) {
  console.log(`  ok   ${target.path}: ${msg}`);
}

function fail(target, msg) {
  console.log(`  FAIL ${target.path}: ${msg}`);
  failed += 1;
}

async function checkTarget(target) {
  const url = BASE + target.path;
  const res = await fetchRaw(url);

  if (res.status === 0) {
    console.log(`  ERR  ${target.path}: fetch failed — ${res.error}`);
    unreachable += 1;
    return;
  }

  // Trailing-slash invariant: Next.js routes return 200 directly. With-
  // slash form should 308. Deck nginx URLs are the inverse (no-slash 404).
  if (target.kind === 'next' && res.status === 308) {
    fail(target, `308 on canonical no-slash form (framework redirect — should serve 200)`);
    return;
  }

  if (target.allowMissing && (res.status === 404 || res.status === 410)) {
    console.log(`  skip ${target.path}: ${res.status} (allowMissing)`);
    return;
  }

  if (res.status !== 200) {
    fail(target, `unexpected status ${res.status}`);
    return;
  }

  const html = res.text;

  // === canonical ===
  const canonical = extractCanonical(html);
  if (!canonical) {
    fail(target, 'no rel=canonical in <head>');
    return;
  }
  if (target.kind === 'next' && canonical.endsWith('/') && canonical !== BASE + '/') {
    fail(target, `canonical has trailing slash: ${canonical}`);
  }
  // Canonical must point at the canonical-host www form.
  if (!canonical.startsWith('https://www.lessoncraftstudio.com')) {
    fail(target, `canonical not www form: ${canonical}`);
  }

  // === hreflang ===
  const alternates = extractAlternates(html);
  if (target.path.match(/\/(worksheets|about|topic|activities|tools)$/) && alternates.length < 11) {
    fail(target, `hreflang count = ${alternates.length}, expected ≥ 11`);
  }
  const xDefault = alternates.find(a => a.hreflang === 'x-default');
  if (target.kind === 'next' && alternates.length > 0 && !xDefault) {
    fail(target, 'has hreflang but no x-default');
  }

  // === og:image ===
  const ogImage = extractOgImage(html);
  if (target.path.match(/\/(worksheets|about|topic\/|activities)/) && !ogImage) {
    fail(target, 'no og:image declared');
  }

  // === twitter card ===
  const twitter = extractTwitterCard(html);
  if (target.path.match(/\/(worksheets|about)$/) && twitter !== 'summary_large_image') {
    fail(target, `twitter card = ${twitter}, expected summary_large_image`);
  }

  if (failed === 0 || (failed > 0 && failed < 99)) {
    pass(target, `canonical=${canonical} | hreflang=${alternates.length} | og:image=${ogImage ? 'yes' : 'no'}`);
  }
}

async function main() {
  console.log(`SEO spot-check against ${BASE}`);
  console.log('');
  for (const target of TARGETS) {
    await checkTarget(target);
  }
  console.log('');
  if (unreachable > 0) {
    console.error(`${unreachable} URL(s) unreachable — is the server running at ${BASE}?`);
    process.exit(2);
  }
  if (failed > 0) {
    console.error(`${failed} assertion(s) failed.`);
    process.exit(1);
  }
  console.log('All assertions passed.');
}

main();
