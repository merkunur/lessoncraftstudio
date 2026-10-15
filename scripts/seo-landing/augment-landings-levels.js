#!/usr/bin/env node
/**
 * augment-landings-levels.js — the Level Set augment for the static landings
 * (Level Sets v2, 2026-10-15; operator decision 2: ONE additive block per
 * landing, "This worksheet at three levels").
 *
 * RUNS ON HETZNER at deploy time (deploy.sh 1b-ii, before render-landing-html.js),
 * next to augment-landings-real-content.js. For every landing of a locale whose
 * own deck belongs to a face LADDER (≥ 2 pages across easy / core / hard —
 * scripts/lib/deck-ladder.js, read from the deck manifests on disk, the same
 * collect pass the deck strip uses), writes:
 *
 *   /var/www/lcs-media/landings-augment/levels-<locale>.json
 *   { "<landing slug>": { code, mine, rungs: [{ rung, count, siblings: [{slug,label}] }] } }
 *
 * NON-FATAL by design: the renderer tolerates a missing file (no block), so a
 * failure here can never fail a deploy. Never touches a landing's text.
 *
 * Usage: node scripts/seo-landing/augment-landings-levels.js --locales=all|en,de [--out=<dir>] [--decks-root=<dir>]
 */
'use strict';

const fs = require('fs');
const path = require('path');
const deckLadder = require('../lib/deck-ladder');
const injector = require('../publish-cli/inject-deck-ladder');

const ROOT = deckLadder.REPO_ROOT;
const LANDING_DIR = path.join(ROOT, 'frontend', 'content', 'seo-landing');
const LOCALES = ['en', 'de', 'es', 'sv', 'nl', 'da', 'it', 'no', 'fr', 'pt', 'fi'];
const MAX_SIBLINGS = 3;

const argv = process.argv.slice(2);
const arg = (k) => { const a = argv.find((x) => x.startsWith(k + '=')); return a ? a.slice(k.length + 1) : null; };
let OUT_DIR = arg('--out') || process.env.LCS_AUGMENT_DIR || '/var/www/lcs-media/landings-augment';
const locArg = arg('--locales') || 'all';
const locales = locArg === 'all' ? LOCALES : locArg.split(',').map((s) => s.trim()).filter(Boolean);

function landingsOf(locale) {
  const p = path.join(LANDING_DIR, `${locale}.json`);
  if (!fs.existsSync(p)) return [];
  try { return JSON.parse(fs.readFileSync(p, 'utf8')).landings || []; } catch (_e) { return []; }
}

function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  let bad = 0;
  for (const locale of locales) {
    const col = injector.collect(locale);
    const ladders = deckLadder.buildLadders(col.facts);
    const codeOf = new Map(col.facts.map((f) => [f.slug, f.code]));
    const landings = landingsOf(locale);
    const out = {};
    let n = 0;
    for (const l of landings) {
      const code = codeOf.get(l.canonicalDeckSlug);
      const ladder = code ? ladders.get(code) : null;
      if (!ladder) continue;
      let mine = null;
      for (const r of deckLadder.RUNGS) if (ladder.pages[r].some((p) => p.slug === l.canonicalDeckSlug)) { mine = r; break; }
      if (!mine) continue;
      out[l.slug] = {
        code,
        mine,
        rungs: deckLadder.RUNGS.filter((r) => ladder.pages[r].length > 0).map((r) => ({
          rung: r,
          count: ladder.pages[r].length,
          siblings: ladder.pages[r].filter((p) => p.slug !== l.canonicalDeckSlug).slice(0, MAX_SIBLINGS)
            .map((p) => ({ slug: p.slug, label: deckLadder.pageLabel(p, locale) })),
        })),
      };
      n++;
    }
    const file = path.join(OUT_DIR, `levels-${locale}.json`);
    const tmp = file + '.tmp';
    fs.writeFileSync(tmp, JSON.stringify(out));
    fs.renameSync(tmp, file);
    console.log(`${locale}: ${n} of ${landings.length} landings have a ladder (${ladders.size} ladders from ${col.decks.length} decks${col.errors.length ? `, ${col.errors.length} manifest errors` : ''}) → ${file}`);
    if (landings.length && n === 0) { console.log(`  ⚠ ${locale}: zero landings matched — check the decks root`); bad++; }
  }
  process.exit(bad ? 1 : 0);
}

main();
