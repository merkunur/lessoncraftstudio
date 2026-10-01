#!/usr/bin/env node
/**
 * meter-deck-downloads.js — apply the free-tier policy to published deck.html files (2026-10-01).
 * See scripts/lib/deck-metering.js for what changes and why: the deck's own PDF / answer-key links go through the
 * metered proxy, the download buttons lose "free" from their visible label, and an interactive deck gets the play
 * wall. Idempotent; atomic writes; metadata untouched. Runs as a publish-wave step (wave-scoped) and as a catalogue
 * retrofit.
 *
 *   node scripts/publish-cli/meter-deck-downloads.js [--dry-run | --check] [--locale=<code>] [--slugs-file=<path>]
 * --check: the AUDIT — writes nothing, exits 1 if any deck still needs the policy applied (a direct PDF link, a
 * "free" button label, an interactive deck without the play wall).
 */
'use strict';
const fs = require('fs');
const path = require('path');
const waveScope = require('./wave-scope');
const { meterDeckHtml } = require('../lib/deck-metering.js');

const DECKS_ROOT = process.env.LCS_DECKS_ROOT || '/var/www/lcs-media/decks';
const ALL_LOCALES = ['en', 'de', 'es', 'nl', 'fr', 'it', 'pt', 'sv', 'da', 'no', 'fi'];
const argv = process.argv.slice(2);
const CHECK = argv.includes('--check');
const DRY_RUN = argv.includes('--dry-run') || CHECK;
const locFlag = argv.find((a) => a.startsWith('--locale='));
const LOCALES = locFlag ? [locFlag.split('=')[1]] : ALL_LOCALES;
const WAVE_SLUGS = waveScope.loadSlugSet(argv);

function main() {
  console.log(`=== meter-deck-downloads (${DRY_RUN ? 'DRY-RUN' : 'WRITE'}) ===`);
  const tot = { decks: 0, changed: 0, links: 0, relabel: 0, meter: 0, failed: 0 };
  const failures = [];
  for (const locale of LOCALES) {
    const dir = path.join(DECKS_ROOT, locale);
    if (!fs.existsSync(dir)) continue;
    const slugs = fs.readdirSync(dir).filter((n) => !n.startsWith('.') && !/-v\d+$/.test(n)).filter((n) => waveScope.inSet(WAVE_SLUGS, n));
    const L = { decks: 0, changed: 0, links: 0, relabel: 0, meter: 0 };
    for (const slug of slugs) {
      const link = path.join(dir, slug);
      try {
        if (!fs.lstatSync(link).isSymbolicLink()) continue;
        const target = fs.readlinkSync(link);
        const file = path.join(path.isAbsolute(target) ? target : path.join(dir, target), 'deck.html');
        if (!fs.existsSync(file)) continue;
        L.decks++;
        const r = meterDeckHtml(fs.readFileSync(file, 'utf8'), locale, slug);
        if (!r.changed) continue;
        L.changed++; L.links += r.links; L.relabel += r.relabel; L.meter += r.meter;
        if (!DRY_RUN) { fs.writeFileSync(file + '.tmp', r.html, 'utf8'); fs.renameSync(file + '.tmp', file); }
      } catch (e) { tot.failed++; failures.push(`${locale}/${slug}: ${e.message}`); }
    }
    console.log(`[${locale}] decks ${L.decks} · changed ${L.changed} · links metered ${L.links} · labels ${L.relabel} · play meter added ${L.meter}`);
    for (const k of Object.keys(L)) tot[k] += L[k];
  }
  console.log(`=== total: decks ${tot.decks} · changed ${tot.changed} · links ${tot.links} · labels ${tot.relabel} · meter ${tot.meter} · failed ${tot.failed}`);
  failures.slice(0, 20).forEach((f) => console.log('  FAIL ' + f));
  if (CHECK && tot.changed) { console.log(`CHECK FAILED: ${tot.changed} deck(s) outside the free-tier policy`); process.exit(1); }
  process.exit(tot.failed ? 1 : 0);
}
main();
