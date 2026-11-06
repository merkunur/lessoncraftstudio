#!/usr/bin/env node
/**
 * inject-deck-maker-ribbon.js — bake the maker ribbon into published deck.html files, just above the worksheet.
 *
 * WHY. Ready worksheets bring visitors in; the makers are what turn them into subscribers (operator 2026-11-06: every
 * worksheet, deck and topic page links to its maker's landing in its language, in a way a visitor cannot miss). A deck is
 * a static page served by nginx, so the link is baked, which also makes it a real crawlable internal link.
 *
 * SoT: scripts/lib/maker-links.js (markup, CSS, which maker). Never inline a second copy (CLAUDE.md §21.8-A).
 * Both the retrofit and the forward path: publish-wave.js runs it per locale, like inject-deck-actions.js.
 *
 * The walk follows inject-deck-actions.js: alias symlinks share one versioned dir, so physical files are processed once
 * (realpath dedupe); writes are atomic (tmp + rename); a deck whose manifest disagrees with its directory is reported.
 * Unlike the action strip this also covers printable-only decks: every deck page gets the ribbon.
 *
 *   node scripts/publish-cli/inject-deck-maker-ribbon.js [--dry-run] [--rewrite] [--remove]
 *        [--locale=<code>] [--limit=N] [--slugs-file=<path>] [--decks-root=<dir>]
 *
 * ⚠ The default IS write (the `inject-*` dialect). --rewrite strips and re-emits; --remove strips only.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const links = require('../lib/maker-links');
const deckActions = require('../lib/deck-actions');
const waveScope = require('./wave-scope');

const argv = process.argv.slice(2);
const DRY = argv.includes('--dry-run');
const REWRITE = argv.includes('--rewrite');
const REMOVE = argv.includes('--remove');
const flag = (k) => { const a = argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : null; };
const ONLY = flag('locale');
const LIMIT = Number(flag('limit') || 0);
const ROOT = flag('decks-root') || '/var/www/lcs-media/decks';
const WAVE_SLUGS = waveScope.loadSlugSet(argv);
const ANCHOR = deckActions.ANCHOR;

function strip(content) { return content.replace(links.STRIP_RE, ''); }

/** the ribbon goes on its own line directly before the worksheet, after the action strip when there is one */
function inject(content, block) {
  const head = content.indexOf('</head>');
  const at = content.indexOf(ANCHOR, head === -1 ? 0 : head);
  if (at === -1) return null;
  return `${content.slice(0, at)}\n${block}${content.slice(at)}`;
}

function atomicWrite(file, text) {
  const tmp = `${file}.tmp-ribbon`;
  fs.writeFileSync(tmp, text, 'utf8');
  fs.renameSync(tmp, file);
}

function run(locale) {
  const dir = path.join(ROOT, locale);
  if (!fs.existsSync(dir)) return null;
  const seen = new Set();
  const sum = { locale, written: 0, already: 0, maker: 0, hub: 0, aliases: 0, skipped: 0, errors: 0 };
  let done = 0;
  for (const entry of fs.readdirSync(dir)) {
    if (entry.startsWith('.')) continue;
    if (WAVE_SLUGS && !WAVE_SLUGS.has(entry)) continue;
    if (LIMIT && done >= LIMIT) break;
    const target = path.join(dir, entry);
    let real;
    try { real = fs.realpathSync(target); } catch (e) { sum.errors++; console.log(`dangling: ${locale}/${entry}`); continue; }
    if (seen.has(real)) { sum.aliases++; continue; }
    seen.add(real);
    const html = path.join(real, 'deck.html');
    if (!fs.existsSync(html)) { sum.skipped++; continue; }
    let manifest = null;
    try { manifest = JSON.parse(fs.readFileSync(path.join(real, 'manifest.json'), 'utf8')); } catch (e) { manifest = null; }
    const content = fs.readFileSync(html, 'utf8');
    const has = content.includes(links.MARKER);
    if (REMOVE) {
      if (!has) { sum.already++; continue; }
      if (!DRY) atomicWrite(html, strip(content));
      sum.written++; done++;
      continue;
    }
    if (has && !REWRITE) { sum.already++; continue; }
    const makerId = links.makerFor({
      variantId: manifest && manifest.variant_id,
      exerciseType: manifest && manifest.exercise_type,
      app: manifest && manifest.generator && manifest.generator.app,
    });
    const onLanding = makerId && links.landing(locale, makerId);
    if (onLanding) sum.maker++; else sum.hub++;
    const next = inject(strip(content), links.block({ locale, makerId: onLanding ? makerId : null }));
    if (next === null) { sum.errors++; console.log(`no anchor: ${locale}/${entry}`); continue; }
    if (next === content) { sum.already++; continue; }
    if (!DRY) atomicWrite(html, next);
    sum.written++; done++;
  }
  return sum;
}

let bad = 0;
for (const locale of ONLY ? [ONLY] : links.LOCALES) {
  const s = run(locale);
  if (!s) { console.log(`${locale}: no decks directory`); continue; }
  console.log(`${locale}: ${DRY ? 'would write' : 'wrote'} ${s.written} · already ${s.already} · maker ${s.maker} · hub ${s.hub} · aliases ${s.aliases} · no deck.html ${s.skipped} · errors ${s.errors}`);
  bad += s.errors;
}
process.exit(bad ? 1 : 0);
