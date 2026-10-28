#!/usr/bin/env node
/**
 * live-verify-level-set-hubs.js — after a deploy, prove every Level Set hub is live and correct:
 *   each /<loc>/worksheets/<slug> answers 200 with ONE h1, a self canonical, index robots and the
 *   CollectionPage JSON-LD listing its decks; a sample of listed decks still answers noindex with its
 *   canonical unchanged (a hub must never repoint or index a deck); every hub URL is in a sitemap shard.
 * Sends the QA header from ~/.lcs-secrets/cf-qa-header.txt when present (never printed).
 * Usage: node scripts/seo-landing/live-verify-level-set-hubs.js [--locales=en,de]
 */
'use strict';
const fs = require('fs');
const os = require('os');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const BASE = 'https://www.lessoncraftstudio.com';
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const a = process.argv.find((x) => x.startsWith('--locales='));
const locs = a ? a.slice(10).split(',') : LOCALES;

/* the same secret and header name as scripts/lib/qa-header.js (the file holds the value only) */
function qaHeaders() {
  const s = process.env.LCS_QA_HEADER || (() => { try { return fs.readFileSync(path.join(os.homedir(), '.lcs-secrets', 'cf-qa-header.txt'), 'utf8'); } catch (_) { return ''; } })();
  return s.trim() ? { 'x-lcs-qa': s.trim() } : {};
}
const H = { 'User-Agent': 'Mozilla/5.0 (LCS live-verify)', ...qaHeaders() };
async function get(url) {
  for (let t = 0; t < 3; t++) {
    try { const r = await fetch(url, { headers: H, redirect: 'manual' }); return { status: r.status, text: await r.text() }; }
    catch (e) { if (t === 2) return { status: 0, text: String(e) }; }
  }
}

(async () => {
  const fails = []; let ok = 0, decksChecked = 0;
  const sitemapText = (await Promise.all([4, 5, 6, 7].map((i) => get(`${BASE}/sitemap/${i}.xml`)))).map((r) => r.text).join('\n');
  for (const loc of locs) {
    const p = path.join(ROOT, 'frontend', 'content', 'seo-landing-hubs', `${loc}.json`);
    if (!fs.existsSync(p)) continue;
    const hubs = JSON.parse(fs.readFileSync(p, 'utf8')).hubs;
    for (const h of hubs) {
      const url = `${BASE}/${loc}/worksheets/${h.slug}`;
      const r = await get(url);
      const why = [];
      if (r.status !== 200) why.push('status ' + r.status);
      else {
        if ((r.text.match(/<h1[\s>]/g) || []).length !== 1) why.push('h1 count');
        if (!r.text.includes(`<link rel="canonical" href="${url}"/>`)) why.push('canonical');
        if (!/<meta name="robots" content="index, follow/.test(r.text)) why.push('robots');
        if (!r.text.includes('"@type":"CollectionPage"')) why.push('no CollectionPage');
        if (!r.text.includes(`/${loc}/decks/${h.decks[0].slug}/`)) why.push('first deck link missing');
      }
      if (!sitemapText.includes(`<loc>${url}</loc>`)) why.push('not in sitemap');
      if (why.length) fails.push(`${loc}/${h.slug}: ${why.join(', ')}`); else ok++;
      // one listed deck per hub: still noindex, canonical not pointing at the hub
      const d = h.decks[h.decks.length - 1];
      const dr = await get(`${BASE}/${loc}/decks/${d.slug}/`);
      decksChecked++;
      if (dr.status === 200) {
        if (!/noindex/.test(dr.text)) fails.push(`${loc}/${h.slug}: deck ${d.slug} is not noindex`);
        if (dr.text.includes(`/worksheets/${h.slug}"`) && /rel="canonical"[^>]*worksheets\//.test(dr.text)) fails.push(`${loc}/${h.slug}: deck ${d.slug} canonical points at the hub`);
      } else fails.push(`${loc}/${h.slug}: deck ${d.slug} status ${dr.status}`);
    }
  }
  fails.forEach((f) => console.log('  FAIL ' + f));
  console.log(`${ok} hubs pass, ${fails.length} failures; ${decksChecked} listed decks checked`);
  process.exit(fails.length ? 1 : 0);
})();
