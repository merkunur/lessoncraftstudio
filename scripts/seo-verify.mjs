#!/usr/bin/env node
/**
 * SEO verification harness — deterministic HTTP-level checks against a
 * running server. Replaces scripts/seo-spot-check.js.
 *
 * Reliability invariants:
 *   - Every assertion fetches with `redirect: 'manual'`. A 3xx on
 *     canonical / hreflang / og:url is a FAIL (the whole point — catches
 *     the `canonical → 308` chain).
 *   - Parses rendered HTML, not source files.
 *   - Locale-complete where the claim is "× 11".
 *   - Structured PASS/FAIL; non-zero exit on any failure.
 *   - JSON artifact written to docs/audit-results/seo-verify-<ISO>.json.
 *
 * Usage:
 *   BASE=http://localhost:3000 node scripts/seo-verify.mjs
 *   BASE=https://www.lessoncraftstudio.com node scripts/seo-verify.mjs
 *
 * Optional env vars:
 *   DECK_SAMPLE   Comma-separated `<locale>:<slug>` pairs for C.3.
 *                 e.g. "en:big-small-find-bigger-animals,de:addition-tiere"
 *                 If unset, harness pulls deck URLs from /sitemap/0.xml.
 *   ARTIFACT_DIR  Override artifact output dir (default docs/audit-results/).
 *
 * Exit codes:
 *   0 — all assertions passed
 *   1 — at least one assertion failed
 *   2 — fetch error / server unreachable
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');

const BASE = (process.env.BASE || 'http://localhost:3000').replace(/\/+$/, '');
const CANONICAL_HOST = 'https://www.lessoncraftstudio.com';
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || path.join(REPO_ROOT, 'docs', 'audit-results');

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// Mirrors `frontend/config/locales.ts: NSR_PENDING_LOCALES` — keep in
// sync. The harness lives outside Next.js TS module resolution; this
// inline mirror follows the same comment-anchored convention as
// `HREFLANG_MAP` below. When the live array changes (a locale clears
// NSR), update this mirror in the same commit so the harness still
// asserts the live behavior.
const UNREVIEWED_ABOUT_LOCALES = ['sv', 'da', 'no', 'fi'];
const INDEXABLE_ABOUT_LOCALES = SUPPORTED_LOCALES.filter(l => !UNREVIEWED_ABOUT_LOCALES.includes(l));

// Mirrors frontend/lib/schema-generator.ts:hreflangMap (the live emission
// table). `pt` → `pt-BR` per CLAUDE.md §6 (Brazilian Portuguese canonical).
// Other locales pass through. Update both this map AND the source if a
// new mapping ships.
const HREFLANG_MAP = {
  en: 'en', de: 'de', fr: 'fr', es: 'es',
  pt: 'pt-BR',
  it: 'it', nl: 'nl', sv: 'sv', da: 'da', no: 'no', fi: 'fi',
};
const HREFLANG_TAGS = SUPPORTED_LOCALES.map(l => HREFLANG_MAP[l] || l);

// Routes that depend on Prisma to render. Without a reachable database
// (the localhost-dev case per CLAUDE.md §A.5.1: "local Postgres is
// intentionally not connected during dev builds"), these return 500.
// Harness marks them OPERATOR-VERIFY on localhost; against a real host
// with DB, they must return 200.
const DB_DEPENDENT_KINDS = new Set(['topic', 'intersection']);
const IS_LOCALHOST = (process.env.BASE || 'http://localhost:3000').match(/localhost|127\.0\.0\.1/);

// === Configuration ===========================================================

// Paths the audit assumed should 410. `/pricing` is intentionally NOT
// here: per CLAUDE.md §17.1, pricing / about / faq are "reshelled"
// directories that 404 via the route system pending future content,
// rather than being added to the REMOVED_PREFIXES 410 regex. They
// don't compete with the classroom surface either way (404 is fine).
// Asserted separately in RESHELLED_404_SAMPLE below.
const SELLER_410_SAMPLE = [
  '/en/apps/big-small-worksheets',
  '/en/tools/niche-finder',
  '/en/blog',
  '/en/guides',
];

// Reshelled-not-deleted directories per CLAUDE.md §17.1. Should 404
// (not 200, not 410). Proves they're neither resurrected nor accidentally
// indexed.
const RESHELLED_404_SAMPLE = [
  '/en/pricing',
];

const CLASSROOM_200_SAMPLE = [
  '/en',
  '/en/worksheets',
  '/en/topic/animals',
  '/en/activities',
  '/en/tools',
  '/en/about',
];

// Per-route Next.js targets for C.1/C.2/C.4/C.7/C.8 checks. `kind` drives
// per-check applicability.
const NEXT_TARGETS = [
  // Locale roots
  { path: '/en', kind: 'home' },
  { path: '/de', kind: 'home' },
  { path: '/es', kind: 'home' },
  { path: '/fi', kind: 'home' },
  // Worksheets hub (full hreflang × 11)
  { path: '/en/worksheets', kind: 'worksheets' },
  { path: '/de/worksheets', kind: 'worksheets' },
  { path: '/es/worksheets', kind: 'worksheets' },
  // Topic single-axis (hreflang sibling-honest)
  { path: '/en/topic/animals', kind: 'topic' },
  { path: '/de/topic/tiere', kind: 'topic' },
  // Topic intersection — canonical axis order is theme → educational-level
  // → exercise-type (CLAUDE.md §16.5.3). `animals` (theme) before
  // `addition` (exercise-type). Non-canonical order 307-redirects.
  { path: '/en/topic/animals/addition', kind: 'intersection' },
  // Activities index
  { path: '/en/activities', kind: 'activities-index' },
  { path: '/de/activities', kind: 'activities-index' },
  { path: '/es/activities', kind: 'activities-index' },
  // Manipulatives landing
  { path: '/en/tools', kind: 'tools' },
  { path: '/de/tools', kind: 'tools' },
  // About × 4 (covers noindex + indexable cases)
  { path: '/en/about', kind: 'about-indexable' },
  { path: '/de/about', kind: 'about-indexable' },
  { path: '/sv/about', kind: 'about-noindex' },
  { path: '/fi/about', kind: 'about-noindex' },
];

// === Fetch helpers ===========================================================

async function fetchRaw(url, opts = {}) {
  try {
    const res = await fetch(url, {
      redirect: 'manual',
      headers: { 'User-Agent': 'lcs-seo-verify/1.0' },
      ...opts,
    });
    const headers = Object.fromEntries(res.headers.entries());
    const isBinary = (headers['content-type'] || '').match(/^image\//);
    const text = (!opts.head && !isBinary && res.status === 200) ? await res.text() : '';
    return { status: res.status, headers, text, url };
  } catch (err) {
    return { status: 0, error: err.message, url };
  }
}

// === HTML extractors =========================================================

function findOne(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : null;
}

function findAll(html, regex) {
  const out = [];
  let m;
  while ((m = regex.exec(html)) !== null) out.push(m);
  return out;
}

function extractMeta(html) {
  const canonical = findOne(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const robots = findOne(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const ogUrl = findOne(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i);
  const ogImage = findOne(html, /<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
  const ogImageW = findOne(html, /<meta[^>]+property=["']og:image:width["'][^>]+content=["']([^"']+)["']/i);
  const ogImageH = findOne(html, /<meta[^>]+property=["']og:image:height["'][^>]+content=["']([^"']+)["']/i);
  const twitterCard = findOne(html, /<meta[^>]+name=["']twitter:card["'][^>]+content=["']([^"']+)["']/i);

  const alternates = [];
  const altRe = /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]+href=["']([^"']+)["']/gi;
  for (const m of findAll(html, altRe)) {
    alternates.push({ hreflang: m[1], href: m[2] });
  }
  // Some renderers emit `href` before `hreflang` — catch the reversed order too.
  const altReReversed = /<link[^>]+rel=["']alternate["'][^>]+href=["']([^"']+)["'][^>]+hreflang=["']([^"']+)["']/gi;
  for (const m of findAll(html, altReReversed)) {
    if (!alternates.find(a => a.hreflang === m[2] && a.href === m[1])) {
      alternates.push({ hreflang: m[2], href: m[1] });
    }
  }

  // Extract all JSON-LD blocks
  const jsonLdBlocks = [];
  const jsonLdRe = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const m of findAll(html, jsonLdRe)) {
    const raw = m[1].trim();
    try {
      jsonLdBlocks.push({ raw, parsed: JSON.parse(raw), error: null });
    } catch (err) {
      jsonLdBlocks.push({ raw, parsed: null, error: err.message });
    }
  }

  // Visible breadcrumb hrefs (for C.8 BreadcrumbList equality)
  const breadcrumbHrefs = [];
  const navMatch = html.match(/<nav[^>]+aria-label=["']Breadcrumb["'][^>]*>([\s\S]*?)<\/nav>/i);
  if (navMatch) {
    const navHtml = navMatch[1];
    const aRe = /<a[^>]+href=["']([^"']+)["']/gi;
    for (const m of findAll(navHtml, aRe)) breadcrumbHrefs.push(m[1]);
  }

  return {
    canonical, robots, ogUrl, ogImage, ogImageW, ogImageH, twitterCard,
    alternates, jsonLdBlocks, breadcrumbHrefs,
  };
}

// === Check results aggregator ================================================

const results = {
  meta: {
    base: BASE,
    canonicalHost: CANONICAL_HOST,
    nodeVersion: process.version,
    startedAt: new Date().toISOString(),
    serverMode: process.env.SERVER_MODE || 'unspecified',
  },
  checks: {
    'C.1-canonical-chain': [],
    'C.2-hreflang-reciprocity': [],
    'C.3-deck-slash': [],
    'C.4-robots-matrix': [],
    'C.5-410-200-matrix': [],
    'C.6-host-canonicalization': [],
    'C.7-og-image-reality': [],
    'C.8-structured-data': [],
    'C.9-i18n-regression': [],
  },
  passCount: 0,
  failCount: 0,
  verifyOnly: 0,
};

function record(checkId, status, target, message, evidence = null) {
  const entry = { target, status, message };
  if (evidence) entry.evidence = evidence;
  results.checks[checkId].push(entry);
  if (status === 'PASS') results.passCount += 1;
  else if (status === 'FAIL') results.failCount += 1;
  else if (status === 'OPERATOR-VERIFY') results.verifyOnly += 1;

  const tag =
    status === 'PASS' ? '  pass' :
    status === 'FAIL' ? '  FAIL' :
    status === 'OPERATOR-VERIFY' ? '  ovrfy' :
    '  ?    ';
  console.log(`${tag}  [${checkId}] ${target}: ${message}`);
}

// === Per-target check runner =================================================

async function checkNextTarget(target) {
  const url = BASE + target.path;
  const res = await fetchRaw(url);

  if (res.status === 0) {
    record('C.1-canonical-chain', 'FAIL', target.path, `fetch error: ${res.error}`);
    return null;
  }
  if (res.status !== 200) {
    // DB-dependent route on localhost returns 500 because the dev host
    // has no Postgres (CLAUDE.md §A.5.1). Mark OPERATOR-VERIFY rather
    // than FAIL — production has the DB and these pages render normally
    // (and they DID render fine throughout the prior arc's prod runs).
    if (IS_LOCALHOST && DB_DEPENDENT_KINDS.has(target.kind) && res.status === 500) {
      record('C.1-canonical-chain', 'OPERATOR-VERIFY', target.path,
        `localhost dev returns 500 (Prisma cannot reach localhost:5432). DB-dependent route — verify against the live host post-deploy.`);
      return null;
    }
    record('C.1-canonical-chain', 'FAIL', target.path, `page returned ${res.status} (expected 200-direct)`);
    return null;
  }

  const meta = extractMeta(res.text);

  // ----- C.1 canonical -----
  if (!meta.canonical) {
    record('C.1-canonical-chain', 'FAIL', target.path, 'no rel=canonical in <head>');
  } else {
    const cleanCanonical = meta.canonical.trim();
    const hostOk = cleanCanonical.startsWith(CANONICAL_HOST);
    const isRoot = cleanCanonical === `${CANONICAL_HOST}/`;
    const noTrailing = isRoot || !cleanCanonical.endsWith('/');
    if (!hostOk) {
      record('C.1-canonical-chain', 'FAIL', target.path, `canonical not on canonical host: ${cleanCanonical}`);
    } else if (!noTrailing) {
      record('C.1-canonical-chain', 'FAIL', target.path, `canonical has trailing slash: ${cleanCanonical}`);
    } else {
      // Resolve canonical against the running server: replace host with BASE
      const canonicalLocal = cleanCanonical.replace(CANONICAL_HOST, BASE);
      const cRes = await fetchRaw(canonicalLocal);
      if (cRes.status !== 200) {
        record('C.1-canonical-chain', 'FAIL', target.path, `canonical resolves ${cRes.status} (expected 200-direct): ${canonicalLocal}`);
      } else {
        record('C.1-canonical-chain', 'PASS', target.path, `canonical 200-direct: ${cleanCanonical}`);
      }
    }
  }

  // ----- og:url should match canonical -----
  if (meta.ogUrl && meta.canonical && meta.ogUrl !== meta.canonical) {
    record('C.1-canonical-chain', 'FAIL', target.path, `og:url (${meta.ogUrl}) ≠ canonical (${meta.canonical})`);
  } else if (meta.ogUrl) {
    const ogLocal = meta.ogUrl.replace(CANONICAL_HOST, BASE);
    const oRes = await fetchRaw(ogLocal);
    if (oRes.status !== 200) {
      record('C.1-canonical-chain', 'FAIL', target.path, `og:url resolves ${oRes.status} (expected 200-direct): ${ogLocal}`);
    }
  }

  // ----- C.2 hreflang -----
  // Only certain page kinds get the full × 11 cluster (homepage, worksheets,
  // about-indexable, activities-index, tools). Topic single-axis and
  // intersection use sibling-honest filtering (subset of 11).
  const fullClusterKinds = new Set(['home', 'worksheets', 'about-indexable', 'about-noindex', 'activities-index', 'tools']);
  if (fullClusterKinds.has(target.kind)) {
    const langTags = meta.alternates.map(a => a.hreflang);
    // Compare against the live hreflang-code mapping (pt → pt-BR), not
    // the bare locale codes — the rendered HTML emits hreflang tags via
    // getHreflangCode() in schema-generator.ts.
    const expected = new Set([...HREFLANG_TAGS, 'x-default']);
    const got = new Set(langTags);
    const missing = [...expected].filter(t => !got.has(t));
    if (missing.length > 0) {
      record('C.2-hreflang-reciprocity', 'FAIL', target.path,
        `missing hreflang tags: ${missing.join(', ')} (got ${langTags.length} alternates)`);
    } else {
      // Verify each alternate URL resolves 200-direct
      let altFails = 0;
      const altDetail = [];
      for (const alt of meta.alternates) {
        const altLocal = alt.href.replace(CANONICAL_HOST, BASE);
        const r = await fetchRaw(altLocal);
        if (r.status !== 200) {
          altFails += 1;
          altDetail.push(`${alt.hreflang} → ${r.status}`);
        }
      }
      if (altFails > 0) {
        record('C.2-hreflang-reciprocity', 'FAIL', target.path,
          `${altFails} alternate(s) did not resolve 200-direct: ${altDetail.slice(0, 3).join(', ')}`);
      } else {
        record('C.2-hreflang-reciprocity', 'PASS', target.path,
          `${meta.alternates.length} alternates all 200-direct`);
      }
    }
  } else if (target.kind === 'topic' || target.kind === 'intersection') {
    // Sibling-honest — just verify any present alternate resolves 200-direct
    if (meta.alternates.length === 0) {
      record('C.2-hreflang-reciprocity', 'OPERATOR-VERIFY', target.path,
        'no hreflang alternates (topic likely sibling-honest with empty set — manual check)');
    } else {
      let altFails = 0;
      for (const alt of meta.alternates) {
        const altLocal = alt.href.replace(CANONICAL_HOST, BASE);
        const r = await fetchRaw(altLocal);
        if (r.status !== 200) altFails += 1;
      }
      if (altFails > 0) {
        record('C.2-hreflang-reciprocity', 'FAIL', target.path,
          `${altFails}/${meta.alternates.length} sibling-honest alternate(s) did not resolve 200-direct`);
      } else {
        record('C.2-hreflang-reciprocity', 'PASS', target.path,
          `${meta.alternates.length} sibling alternate(s) all 200-direct`);
      }
    }
  }

  // ----- C.4 robots matrix -----
  const robotsVal = (meta.robots || '').toLowerCase();
  const isNoindex = /noindex/.test(robotsVal);
  if (target.kind === 'about-noindex') {
    if (isNoindex) {
      record('C.4-robots-matrix', 'PASS', target.path, `noindex emitted: "${meta.robots}"`);
    } else {
      record('C.4-robots-matrix', 'FAIL', target.path,
        `expected noindex for NSR-flagged About locale; got robots="${meta.robots || '(missing)'}"`);
    }
  } else if (target.kind === 'about-indexable' || target.kind === 'home' ||
             target.kind === 'worksheets' || target.kind === 'topic' ||
             target.kind === 'intersection' || target.kind === 'activities-index' ||
             target.kind === 'tools') {
    if (isNoindex) {
      record('C.4-robots-matrix', 'FAIL', target.path, `unexpected noindex on indexable page: "${meta.robots}"`);
    } else {
      record('C.4-robots-matrix', 'PASS', target.path, `indexable (no robots noindex)`);
    }
  }

  // ----- C.7 OG image reality -----
  const wantsOg = ['worksheets', 'topic', 'intersection', 'activities-index', 'about-indexable', 'about-noindex'];
  if (wantsOg.includes(target.kind)) {
    if (!meta.ogImage) {
      record('C.7-og-image-reality', 'FAIL', target.path, 'no og:image declared');
    } else {
      // Dimensions must declare 1200×630 (the prior 512×512 mismatch must be gone)
      const wOk = meta.ogImageW === '1200';
      const hOk = meta.ogImageH === '630';
      if (!wOk || !hOk) {
        record('C.7-og-image-reality', 'FAIL', target.path,
          `og:image:width/height = ${meta.ogImageW}/${meta.ogImageH}, expected 1200/630`);
      }
      // Twitter card = summary_large_image on promoted pages
      const promoted = ['worksheets', 'about-indexable', 'about-noindex'];
      if (promoted.includes(target.kind) && meta.twitterCard !== 'summary_large_image') {
        record('C.7-og-image-reality', 'FAIL', target.path,
          `twitter:card = "${meta.twitterCard}", expected summary_large_image`);
      }
      // HEAD the og:image — image content-type, 200. If it points off-host, mark OPERATOR-VERIFY.
      const ogImageLocal = meta.ogImage.replace(CANONICAL_HOST, BASE);
      if (ogImageLocal.startsWith(BASE)) {
        const headRes = await fetchRaw(ogImageLocal, { head: true, method: 'HEAD' });
        if (headRes.status !== 200) {
          record('C.7-og-image-reality', 'FAIL', target.path,
            `og:image HEAD returned ${headRes.status} for ${ogImageLocal}`);
        } else if (!/^image\//.test(headRes.headers['content-type'] || '')) {
          record('C.7-og-image-reality', 'FAIL', target.path,
            `og:image content-type = "${headRes.headers['content-type']}", not image/*`);
        } else {
          record('C.7-og-image-reality', 'PASS', target.path,
            `og:image=${meta.ogImage} (${meta.ogImageW}×${meta.ogImageH}), twitter=${meta.twitterCard}, HEAD 200 ${headRes.headers['content-type']}`);
        }
      } else {
        record('C.7-og-image-reality', 'OPERATOR-VERIFY', target.path,
          `og:image off-host (${meta.ogImage}) — HEAD-check requires live host`);
      }
    }
  }

  // ----- C.8 structured data -----
  const orgDefs = [];
  const breadcrumbBlocks = [];
  const aboutPageBlocks = [];
  const faqBlocks = [];
  for (const blk of meta.jsonLdBlocks) {
    if (blk.error) {
      record('C.8-structured-data', 'FAIL', target.path,
        `JSON-LD parse error: ${blk.error} (block excerpt: ${blk.raw.slice(0, 80)}...)`);
      continue;
    }
    const items = Array.isArray(blk.parsed) ? blk.parsed : [blk.parsed];
    for (const item of items) {
      if (!item || typeof item !== 'object') continue;
      const type = item['@type'];
      // Organization-once rule: a *definition* has `name` + `url` (not just `@id`).
      if (type === 'Organization' && item.name && item.url) {
        orgDefs.push(item['@id'] || '(no @id)');
      }
      if (type === 'BreadcrumbList' && Array.isArray(item.itemListElement)) {
        breadcrumbBlocks.push(item);
      }
      if (type === 'AboutPage') aboutPageBlocks.push(item);
      if (type === 'FAQPage') faqBlocks.push(item);
    }
  }

  if (orgDefs.length > 1) {
    record('C.8-structured-data', 'FAIL', target.path,
      `${orgDefs.length} Organization *definitions* found on one page (expected ≤1): ${orgDefs.join(', ')}`);
  }

  // Topic + intersection should carry BreadcrumbList equal to visible <a href>s.
  if (target.kind === 'topic' || target.kind === 'intersection') {
    if (breadcrumbBlocks.length === 0) {
      record('C.8-structured-data', 'FAIL', target.path, 'no BreadcrumbList JSON-LD');
    } else {
      const schemaUrls = breadcrumbBlocks[0].itemListElement
        .map(li => (li.item || '').replace(CANONICAL_HOST, ''));
      const visibleHrefs = meta.breadcrumbHrefs;
      // Visible may have trailing slash on `/${locale}/`; normalize both sides.
      const norm = (u) => u.replace(/\/+$/, '') || '/';
      const schemaNorm = schemaUrls.map(norm);
      const visNorm = visibleHrefs.map(norm);
      // Schema includes the current page as final item; visible breadcrumb's
      // final crumb is non-link. So visible should be a strict prefix of schema.
      const expectedPrefix = schemaNorm.slice(0, visNorm.length);
      const ok = visNorm.every((v, i) => v === expectedPrefix[i]);
      if (!ok) {
        record('C.8-structured-data', 'FAIL', target.path,
          `BreadcrumbList ≠ visible breadcrumb: schema=${JSON.stringify(schemaNorm)} visible=${JSON.stringify(visNorm)}`);
      } else {
        record('C.8-structured-data', 'PASS', target.path,
          `BreadcrumbList matches visible hrefs (${schemaUrls.length} items)`);
      }
    }
  }

  // About page should emit AboutPage referencing Organization @id (not a redefinition).
  if (target.kind === 'about-indexable' || target.kind === 'about-noindex') {
    if (aboutPageBlocks.length === 0) {
      record('C.8-structured-data', 'FAIL', target.path, 'no AboutPage JSON-LD');
    } else if (orgDefs.length > 0) {
      record('C.8-structured-data', 'FAIL', target.path,
        `About page also *defines* Organization (should reference by @id only): ${orgDefs.join(', ')}`);
    } else {
      record('C.8-structured-data', 'PASS', target.path,
        `AboutPage references Organization by @id (no duplicate definition)`);
    }
  }

  // FAQPage on non-FAQ pages
  if (faqBlocks.length > 0) {
    record('C.8-structured-data', 'FAIL', target.path,
      `FAQPage schema on non-FAQ page (${faqBlocks.length} block(s))`);
  }

  return { target, meta };
}

// === C.3 deck-slash ==========================================================

async function getDeckSamples() {
  if (process.env.DECK_SAMPLE) {
    return process.env.DECK_SAMPLE.split(',').map(s => {
      const [locale, slug] = s.split(':');
      return { locale: locale.trim(), slug: slug.trim() };
    });
  }
  // Pull from /sitemap/0.xml (deck shard A)
  const sitemap = await fetchRaw(`${BASE}/sitemap/0.xml`);
  if (sitemap.status !== 200) return null;
  const xml = sitemap.text;
  const locs = findAll(xml, /<loc>\s*([^<\s]+)\s*<\/loc>/gi).map(m => m[1]);
  const deckUrls = locs.filter(u => /\/decks\//.test(u));
  if (deckUrls.length === 0) return null;
  // Take 2 — prefer 1 en + 1 non-en when possible
  const samples = [];
  const en = deckUrls.find(u => /\/en\/decks\//.test(u));
  const nonEn = deckUrls.find(u => !/\/en\/decks\//.test(u));
  if (en) samples.push(parseUrl(en));
  if (nonEn && samples.length < 2) samples.push(parseUrl(nonEn));
  if (samples.length === 0) samples.push(parseUrl(deckUrls[0]));
  return samples;

  function parseUrl(u) {
    const m = u.match(/\/(?<locale>[a-z]{2})\/decks\/(?<slug>[^/]+)/);
    return m ? { locale: m.groups.locale, slug: m.groups.slug } : null;
  }
}

async function checkDeckSlash(samples) {
  if (!samples || samples.length === 0) {
    record('C.3-deck-slash', 'OPERATOR-VERIFY', 'deck-sample',
      'no deck samples available (DECK_SAMPLE unset, sitemap shard 0 had no deck entries — likely DB unreachable on this server)');
    return;
  }
  for (const { locale, slug } of samples) {
    if (!locale || !slug) continue;
    // Slash form returns 200-direct
    const slashUrl = `${BASE}/${locale}/decks/${slug}/`;
    const slashRes = await fetchRaw(slashUrl);
    if (slashRes.status !== 200) {
      // Deck pages are nginx-served on prod; on localhost dev they 404 (no nginx).
      // Mark OPERATOR-VERIFY rather than FAIL when we're against localhost.
      if (BASE.includes('localhost') || BASE.includes('127.0.0.1')) {
        record('C.3-deck-slash', 'OPERATOR-VERIFY', `${locale}/decks/${slug}/`,
          `localhost serves ${slashRes.status} (decks are nginx-served on prod — verify against live host)`);
        continue;
      }
      record('C.3-deck-slash', 'FAIL', `${locale}/decks/${slug}/`,
        `slash form returned ${slashRes.status} (expected 200-direct)`);
      continue;
    }
    // Deck's canonical should end in `/`
    const meta = extractMeta(slashRes.text);
    if (!meta.canonical) {
      record('C.3-deck-slash', 'FAIL', `${locale}/decks/${slug}/`, 'no rel=canonical in deck HTML');
    } else if (!meta.canonical.endsWith('/')) {
      record('C.3-deck-slash', 'FAIL', `${locale}/decks/${slug}/`,
        `deck canonical missing trailing slash: ${meta.canonical}`);
    } else {
      record('C.3-deck-slash', 'PASS', `${locale}/decks/${slug}/`,
        `200-direct, canonical=${meta.canonical}`);
    }
  }
}

// === C.5 410/200 matrix ======================================================

async function check410200Matrix() {
  for (const seller of SELLER_410_SAMPLE) {
    const res = await fetchRaw(BASE + seller);
    if (res.status !== 410) {
      record('C.5-410-200-matrix', 'FAIL', seller, `expected 410, got ${res.status}`);
    } else {
      record('C.5-410-200-matrix', 'PASS', seller, '410 Gone');
    }
  }
  for (const classroom of CLASSROOM_200_SAMPLE) {
    const res = await fetchRaw(BASE + classroom);
    if (res.status !== 200) {
      // DB-dependent topic routes return 500 on localhost without
      // Postgres (CLAUDE.md §A.5.1). Mark OPERATOR-VERIFY — same
      // treatment as C.1 — rather than papering over with FAIL.
      const isDbDependent = /\/topic\//.test(classroom);
      if (IS_LOCALHOST && isDbDependent && res.status === 500) {
        record('C.5-410-200-matrix', 'OPERATOR-VERIFY', classroom,
          `localhost dev returns 500 (DB-dependent route; Prisma cannot reach localhost:5432) — verify against live host post-deploy`);
      } else {
        record('C.5-410-200-matrix', 'FAIL', classroom, `expected 200-direct, got ${res.status}`);
      }
    } else {
      record('C.5-410-200-matrix', 'PASS', classroom, '200-direct');
    }
  }
  // /tools carve-out
  const liveTools = await fetchRaw(BASE + '/en/tools');
  if (liveTools.status !== 200) {
    record('C.5-410-200-matrix', 'FAIL', '/en/tools', `carve-out broken: expected 200-direct, got ${liveTools.status}`);
  } else {
    record('C.5-410-200-matrix', 'PASS', '/en/tools', 'manipulatives carve-out 200-direct');
  }
  const sellerTool = await fetchRaw(BASE + '/en/tools/niche-finder');
  if (sellerTool.status !== 410) {
    record('C.5-410-200-matrix', 'FAIL', '/en/tools/niche-finder',
      `carve-out leak: expected 410, got ${sellerTool.status}`);
  } else {
    record('C.5-410-200-matrix', 'PASS', '/en/tools/niche-finder', 'sub-path correctly 410-Gone');
  }
  // Reshelled-not-deleted paths (pricing/about/faq per CLAUDE.md §17.1)
  // should 404 — confirms they're neither resurrected nor 410'd.
  for (const reshelled of RESHELLED_404_SAMPLE) {
    const res = await fetchRaw(BASE + reshelled);
    if (res.status !== 404) {
      record('C.5-410-200-matrix', 'FAIL', reshelled,
        `reshelled path expected 404 (per CLAUDE.md §17.1), got ${res.status}`);
    } else {
      record('C.5-410-200-matrix', 'PASS', reshelled, 'reshelled 404 (intentional per CLAUDE.md §17.1)');
    }
  }
}

// === C.6 host www-canonicalization ===========================================

async function checkHostCanonicalization() {
  if (BASE.includes('localhost') || BASE.includes('127.0.0.1')) {
    record('C.6-host-canonicalization', 'OPERATOR-VERIFY', 'apex→www',
      'localhost mode — host redirect only enforceable against the live hosting layer. Operator must verify with `curl -I https://lessoncraftstudio.com/` post-deploy.');
    return;
  }
  // Live host: hit apex with redirect off, expect 301 to www
  const apex = BASE.replace('https://www.', 'https://');
  const res = await fetchRaw(apex);
  if (res.status === 301 && /^https:\/\/www\./.test(res.headers.location || '')) {
    record('C.6-host-canonicalization', 'PASS', 'apex→www', `301 → ${res.headers.location}`);
  } else {
    record('C.6-host-canonicalization', 'FAIL', 'apex→www',
      `expected 301 to www; got ${res.status} ${res.headers.location || ''}`);
  }
}

// === C.9 i18n regression guard ===============================================

async function checkI18nRegression() {
  const baselinePath = path.join(REPO_ROOT, 'docs', 'audit-results', 'seo-i18n-integrity-2026-05-26T19-52-50.json');
  if (!fs.existsSync(baselinePath)) {
    record('C.9-i18n-regression', 'OPERATOR-VERIFY', 'baseline',
      `baseline not found at ${baselinePath}`);
    return;
  }
  const baseline = JSON.parse(fs.readFileSync(baselinePath, 'utf-8'));

  // Re-run the integrity logic inline (don't shell out)
  const messagesDir = path.join(REPO_ROOT, 'frontend', 'messages');
  const enFile = path.join(messagesDir, 'en.json');
  if (!fs.existsSync(enFile)) {
    record('C.9-i18n-regression', 'FAIL', 'messages', `frontend/messages/en.json not found`);
    return;
  }
  function flatten(obj, prefix = '') {
    const out = {};
    for (const [k, v] of Object.entries(obj)) {
      const key = prefix ? `${prefix}.${k}` : k;
      if (v !== null && typeof v === 'object' && !Array.isArray(v)) Object.assign(out, flatten(v, key));
      else out[key] = v;
    }
    return out;
  }
  function isPlaceholder(v) {
    if (v === null || v === undefined) return true;
    if (typeof v !== 'string') return false;
    const t = v.trim();
    if (t === '') return true;
    if (/^(TODO|TBD|FIXME|XXX|\?{2,}|---)$/i.test(t)) return true;
    return false;
  }

  const en = flatten(JSON.parse(fs.readFileSync(enFile, 'utf-8')));
  const enKeys = Object.keys(en);

  let anyRegression = false;
  for (const loc of SUPPORTED_LOCALES) {
    if (loc === 'en') continue;
    const file = path.join(messagesDir, `${loc}.json`);
    if (!fs.existsSync(file)) continue;
    const data = flatten(JSON.parse(fs.readFileSync(file, 'utf-8')));
    const missing = enKeys.filter(k => !(k in data)).length;
    const placeholder = enKeys.filter(k => k in data && isPlaceholder(data[k])).length;
    const baseMissing = (baseline.findings?.[loc]?.missing?.length) ?? 0;
    const basePlaceholder = (baseline.findings?.[loc]?.placeholder?.length) ?? 0;
    const missingDelta = missing - baseMissing;
    const placeholderDelta = placeholder - basePlaceholder;
    if (missingDelta > 0 || placeholderDelta > 0) {
      anyRegression = true;
      record('C.9-i18n-regression', 'FAIL', loc,
        `regressed: missing ${baseMissing}→${missing} (+${missingDelta}), placeholder ${basePlaceholder}→${placeholder} (+${placeholderDelta})`);
    } else {
      record('C.9-i18n-regression', 'PASS', loc,
        `no regression: missing ${baseMissing}→${missing} (${missingDelta}), placeholder ${basePlaceholder}→${placeholder} (${placeholderDelta})`);
    }
  }
}

// === main ====================================================================

async function main() {
  console.log(`SEO verification harness`);
  console.log(`  BASE         : ${BASE}`);
  console.log(`  Canonical    : ${CANONICAL_HOST}`);
  console.log(`  Node         : ${process.version}`);
  console.log(`  Started      : ${results.meta.startedAt}`);
  console.log('');

  // Sanity: server reachable?
  const ping = await fetchRaw(BASE + '/en');
  if (ping.status === 0) {
    console.error(`Server unreachable at ${BASE}: ${ping.error}`);
    process.exit(2);
  }

  console.log('--- C.1/C.2/C.4/C.7/C.8 per-target checks ---');
  for (const target of NEXT_TARGETS) {
    await checkNextTarget(target);
  }

  console.log('');
  console.log('--- C.3 deck-slash ---');
  const deckSamples = await getDeckSamples();
  await checkDeckSlash(deckSamples);

  console.log('');
  console.log('--- C.5 410/200 matrix + /tools carve-out ---');
  await check410200Matrix();

  console.log('');
  console.log('--- C.6 host canonicalization ---');
  await checkHostCanonicalization();

  console.log('');
  console.log('--- C.9 i18n regression guard ---');
  await checkI18nRegression();

  // === artifact ===
  results.meta.finishedAt = new Date().toISOString();
  results.summary = {
    pass: results.passCount,
    fail: results.failCount,
    operatorVerify: results.verifyOnly,
    total: results.passCount + results.failCount + results.verifyOnly,
  };

  fs.mkdirSync(ARTIFACT_DIR, { recursive: true });
  const utc = results.meta.finishedAt.replace(/[:.]/g, '-').slice(0, 19);
  const artifactPath = path.join(ARTIFACT_DIR, `seo-verify-${utc}.json`);
  fs.writeFileSync(artifactPath, JSON.stringify(results, null, 2), 'utf-8');

  console.log('');
  console.log('=== SUMMARY ===');
  console.log(`  PASS              : ${results.passCount}`);
  console.log(`  FAIL              : ${results.failCount}`);
  console.log(`  OPERATOR-VERIFY   : ${results.verifyOnly}`);
  console.log(`  Artifact          : ${path.relative(REPO_ROOT, artifactPath).replace(/\\/g, '/')}`);
  console.log('');

  if (results.failCount > 0) {
    console.error(`FAILED: ${results.failCount} check(s) did not pass.`);
    process.exit(1);
  }
  console.log('All checks passed (or marked OPERATOR-VERIFY).');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal harness error:', err);
  process.exit(2);
});
