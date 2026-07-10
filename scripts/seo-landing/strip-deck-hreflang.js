#!/usr/bin/env node
/* Deck.html hreflang STRIP retrofit — forensic-audit 2026-07-10 remediation (report §4.1).
 *
 * repoint-deck-canonical.js's blanket URL substitution also rewrote each repointed deck's own
 * hreflang self/x-default entries (any quote-terminated full deck URL), producing MIXED
 * landing/deck hreflang clusters (3,450 files) plus deck-only clusters whose targets are
 * themselves non-canonical repointed pages (~4,532 files). Google discards non-reciprocal
 * clusters; worse, they contradict the canonical signals.
 *
 * Correct state: hreflang lives on the CANONICAL pages (the /worksheets/ landings carry full
 * reciprocal 12-locale clusters — verified healthy). A deck.html keeps its hreflang cluster
 * ONLY if (a) the deck itself is self-canonical AND (b) every /decks/ target in the cluster is
 * itself self-canonical (not in any locale's landing map). Otherwise the block contents are
 * stripped (the HREFLANG_BLOCK_START/END markers are KEPT so populate-and-inject-hreflang.js
 * can re-inject a correct cluster later).
 *
 * MUST run on Hetzner AFTER reconcile-deck-canonicals.js --apply (canonical state decides (a)).
 * Default DRY-RUN. --apply mutates with .bak.hreflang-strip backup + atomic temp+rename.
 * Usage: node scripts/seo-landing/strip-deck-hreflang.js [--locales=en,de,...] [--apply] [--samples=N]
 */
'use strict';
const fs = require('fs');
const path = require('path');

const HOST = 'https://www.lessoncraftstudio.com';
const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const argv = process.argv.slice(2);
const arg = (k, d) => { const a = argv.find(s => s.startsWith('--' + k + '=')); return a ? a.slice(k.length + 3) : d; };
const LOCALES = arg('locales', '') ? arg('locales', '').split(',').map(s => s.trim()).filter(Boolean) : ALL_LOCALES;
const APPLY = argv.includes('--apply');
const SAMPLES = parseInt(arg('samples', '5'), 10);
const CONTENT_DIR = path.resolve(__dirname, '..', '..', 'frontend', 'content', 'seo-landing');
const DECKS_ROOT = '/var/www/lcs-media/decks';

const BLOCK_RE = /(<!-- HREFLANG_BLOCK_START -->)([\s\S]*?)(<!-- HREFLANG_BLOCK_END -->)/;
const CANON_RE = /<link rel="canonical" href="([^"]+)"/;
const ALT_RE = /<link rel="alternate" hreflang="[^"]+" href="([^"]+)"/g;

// landed[locale] = Set of deck slugs that map to a landing (i.e. are non-canonical pages)
const landed = {};
for (const loc of ALL_LOCALES) {
  landed[loc] = new Set();
  const f = path.join(CONTENT_DIR, loc + '.json');
  if (!fs.existsSync(f)) continue;
  for (const l of JSON.parse(fs.readFileSync(f, 'utf8')).landings) {
    if (!l.slug) continue;
    const decks = (l.collapseSiblings && l.collapseSiblings.length) ? l.collapseSiblings : [l.canonicalDeckSlug];
    for (const ds of decks) if (ds) landed[loc].add(ds);
    if (l.canonicalDeckSlug) landed[loc].add(l.canonicalDeckSlug);
  }
}

const DECK_URL_RE = new RegExp('^' + HOST.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&') + '\\/([a-z]{2})\\/decks\\/([^/"\']+)\\/$');
const totals = {}; const sampleLog = {};
const tally = (cls, d) => { totals[cls] = (totals[cls] || 0) + 1; if (d && (sampleLog[cls] = sampleLog[cls] || []).length < SAMPLES) sampleLog[cls].push(d); };

for (const locale of LOCALES) {
  const root = path.join(DECKS_ROOT, locale);
  if (!fs.existsSync(root)) continue;
  for (const d of fs.readdirSync(root, { withFileTypes: true })) {
    if (!d.isDirectory() || !/-v\d+$/.test(d.name)) continue;
    const slug = d.name.replace(/-v\d+$/, '');
    const file = path.join(root, d.name, 'deck.html');
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    const block = html.match(BLOCK_RE);
    if (!block || !block[2].trim()) { tally('NO_BLOCK_OR_EMPTY'); continue; }

    let strip = false, reason = '';
    const canon = (html.match(CANON_RE) || [])[1] || '';
    if (canon.includes('/worksheets/')) { strip = true; reason = 'deck is non-canonical (repointed)'; }
    if (!strip) {
      let m;
      ALT_RE.lastIndex = 0;
      while ((m = ALT_RE.exec(block[2])) !== null) {
        const url = m[1];
        if (url.includes('/worksheets/')) { strip = true; reason = 'cluster mixes landing URL on self-canonical deck'; break; }
        const dm = url.match(DECK_URL_RE);
        if (dm && landed[dm[1] === 'pt' ? 'pt' : dm[1]] && landed[dm[1]].has(dm[2])) {
          strip = true; reason = `target ${dm[1]}/${dm[2]} is repointed (non-canonical)`; break;
        }
      }
    }
    if (!strip) { tally('KEEP_VALID_CLUSTER'); continue; }
    tally('STRIP', `${locale}/${slug}: ${reason}`);
    if (APPLY) {
      const out = html.replace(BLOCK_RE, '$1\n$3');
      const bak = file + '.bak.hreflang-strip';
      if (!fs.existsSync(bak)) fs.copyFileSync(file, bak);
      const tmp = file + '.tmp.hreflang-strip';
      fs.writeFileSync(tmp, out);
      fs.renameSync(tmp, file);
    }
  }
}

console.log(`\n=== strip-deck-hreflang ${APPLY ? 'APPLY' : 'DRY-RUN'} (locales: ${LOCALES.join(',')}) ===`);
for (const [cls, n] of Object.entries(totals).sort((a, b) => b[1] - a[1])) {
  console.log(`${cls.padEnd(20)} ${n}`);
  for (const s of sampleLog[cls] || []) console.log(`    ${s}`);
}
if (!APPLY) console.log('\nDry-run only — re-run with --apply to mutate (backups: deck.html.bak.hreflang-strip).');
