#!/usr/bin/env node
/**
 * inject-deck-ladder.js — bake the Level Set LADDER strip
 *   Level Set · Level 1 of 3  [1 Easy · 5] [2 Core · 6] [3 Hard · 5]  See the whole set →
 *   More pages at this level: Beach · Camping · …
 * into every worksheet-gen deck.html that belongs to a ladder, directly above
 * the worksheet (Level Sets v2, 2026-10-15).
 *
 * SoT: markup + CSS + strings + the ladder model in scripts/lib/deck-ladder.js
 * (mirror of frontend/lib/level-sets.ts). Do NOT inline a second copy.
 *
 * BOTH the retrofit and the forward path: publish-wave.js STEP 6f runs it per
 * locale on every wave. Two passes per locale:
 *   1. COLLECT — walk every deck symlink of the locale, read manifest.json,
 *      keep the ladder facts (variant id, mode, theme, indexable, title).
 *      ALWAYS the whole locale: a new wave changes the siblings of pages that
 *      were published earlier, so their strips must be re-emitted too.
 *   2. INJECT — for every deck in a ladder, write the block (or re-emit it when
 *      its content changed — the strip carries sibling counts, so it is
 *      compared, not just probed); for a coded deck NOT in a ladder, strip any
 *      stale block. --slugs-file scopes pass 2 to the wave's slugs PLUS every
 *      sibling in those slugs' ladders (siblings' counts changed).
 *
 * Architectural sibling of inject-deck-actions.js (symlink walk, locale
 * cross-check, realpath dedupe, atomic .tmp+rename, --rewrite/--remove,
 * per-locale summary, exit code).
 *
 * Usage:
 *   node scripts/publish-cli/inject-deck-ladder.js [--dry-run] [--rewrite] [--remove] [--check]
 *        [--locale=<code>] [--limit=N] [--slugs-file=<path>] [--decks-root=<dir>]
 *
 * ⚠ --dry-run means DO NOT WRITE. The default IS write (the `inject-*` dialect).
 *   --check    audit only: exit 1 when a deck in a ladder lacks the strip or
 *              carries a stale one (publish-wave runs it after the wave).
 */
'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');
var ladderLib = require('../lib/deck-ladder');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = ladderLib.LOCALES;

var argv = process.argv.slice(2);
var DRY_RUN = argv.includes('--dry-run');
var REWRITE = argv.includes('--rewrite');
var REMOVE = argv.includes('--remove');
var CHECK = argv.includes('--check');
var localeFlag = argv.find(function (a) { return a.indexOf('--locale=') === 0; });
var TARGET_LOCALE = localeFlag ? localeFlag.split('=')[1] : null;
var limitFlag = argv.find(function (a) { return a.indexOf('--limit=') === 0; });
var TARGET_LIMIT = limitFlag ? parseInt(limitFlag.split('=')[1], 10) : Infinity;
var rootFlag = argv.find(function (a) { return a.indexOf('--decks-root=') === 0; });
if (rootFlag) DECKS_ROOT = rootFlag.split('=')[1];
var WAVE_SLUGS = waveScope.loadSlugSet(argv);

/* ------------------------------------------------------------------ *
 * The injection core — exported for the unit test.
 * ------------------------------------------------------------------ */

function stripBlock(content) {
  return content.replace(ladderLib.STRIP_RE, '');
}

/** The block currently in the file, or null. */
function currentBlock(content) {
  var m = /<!--LCS_DECK_LADDER_START-->[\s\S]*?<!--LCS_DECK_LADDER_END-->/.exec(content);
  return m ? m[0] : null;
}

/**
 * @param {string} content  deck.html
 * @param {{locale:string, slug:string}} deck
 * @param {object|null} ladder  the deck's ladder (null ⇒ strip any block)
 * @param {{rewrite?:boolean, remove?:boolean}} [opts]
 */
function injectIntoDeckHtml(content, deck, ladder, opts) {
  var rewrite = opts && typeof opts.rewrite === 'boolean' ? opts.rewrite : REWRITE;
  var remove = opts && typeof opts.remove === 'boolean' ? opts.remove : REMOVE;

  if (remove || !ladder) {
    if (content.indexOf(ladderLib.MARKER) === -1) return { alreadyApplied: true, none: !ladder };
    return { changed: true, removed: true, content: stripBlock(content) };
  }

  var block;
  try { block = ladderLib.block(deck, ladder); } catch (e) { return { error: e.message }; }

  var existing = currentBlock(content);
  if (existing && !rewrite) {
    if (existing === block) return { alreadyApplied: true };
    rewrite = true;   // sibling counts changed → re-emit
  }
  if (rewrite) content = stripBlock(content);
  if (content.indexOf(ladderLib.MARKER) !== -1) return { alreadyApplied: true };

  var headClose = content.indexOf('</head>');
  if (headClose === -1) return { error: 'no </head>' };
  var at = content.indexOf(ladderLib.ANCHOR, headClose);
  if (at === -1) return { error: 'no ' + ladderLib.ANCHOR + ' anchor after </head>' };
  var footAt = content.lastIndexOf('</body>');
  if (footAt !== -1 && footAt < at) return { error: 'anchor sits after </body> (malformed deck)' };

  content = content.slice(0, at) + '\n' + block + content.slice(at);
  return { changed: true, content: content, reemitted: !!existing };
}

function resolveLocale(manifest, content, dirLocale) {
  var fromManifest = manifest && typeof manifest.language === 'string' ? manifest.language.slice(0, 2) : null;
  var htmlLang = null;
  var m = /<html[^>]*\blang\s*=\s*"([^"]+)"/i.exec(content);
  if (m) htmlLang = m[1].slice(0, 2).toLowerCase();
  var locale = fromManifest || htmlLang || dirLocale;
  if (ALL_LOCALES.indexOf(locale) === -1) return { error: 'unresolvable locale: ' + JSON.stringify(locale) };
  if (locale !== dirLocale) return { error: 'locale disagreement: manifest/html=' + locale + ' but directory=' + dirLocale };
  return { locale: locale };
}

function atomicWrite(filePath, content) {
  var tmp = filePath + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, filePath);
}

/* ------------------------------------------------------------------ *
 * Pass 1 — collect the locale's ladder facts from every manifest.
 * ------------------------------------------------------------------ */

/** @returns {{decks: Array<{slug, real, manifest}>, facts: Array, errors: Array}} */
function collect(locale) {
  var localeDir = path.join(DECKS_ROOT, locale);
  var names;
  try { names = fs.readdirSync(localeDir); } catch (e) { return { decks: [], facts: [], errors: ['readdir ' + localeDir + ': ' + e.message] }; }
  var seen = new Set();
  var decks = [], facts = [], errors = [];
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    if (name.charAt(0) === '.' || /-v\d+$/.test(name)) continue;   // versioned dirs + dotfiles
    var p = path.join(localeDir, name);
    var st;
    try { st = fs.lstatSync(p); } catch (e) { continue; }
    if (!st.isSymbolicLink()) continue;
    var real;
    try { real = fs.realpathSync(p); } catch (e) { errors.push(name + ': dangling symlink'); continue; }
    if (seen.has(real)) continue;   // alias symlink of a dir already seen
    seen.add(real);
    var manifestPath = path.join(real, 'manifest.json');
    var manifest = null;
    if (fs.existsSync(manifestPath)) {
      try { manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')); } catch (e) { errors.push(name + ': manifest parse ' + e.message); continue; }
    }
    // The canonical slug is the symlink name whose dir this is — the first
    // (non-alias) symlink wins, which is the DB slug (aliases are legacy names).
    decks.push({ slug: name, real: real, manifest: manifest });
    var f = ladderLib.factsOf(manifest, name);
    if (f) facts.push(f);
  }
  return { decks: decks, facts: facts, errors: errors };
}

/* ------------------------------------------------------------------ *
 * Pass 2 — inject.
 * ------------------------------------------------------------------ */

function processLocale(locale) {
  var col = collect(locale);
  var ladders = ladderLib.buildLadders(col.facts);
  var codeOf = new Map();
  col.facts.forEach(function (f) { codeOf.set(f.slug, f.code); });

  // Scope: the wave's slugs plus every page of the ladders they touch.
  var scope = null;
  if (WAVE_SLUGS) {
    scope = new Set();
    WAVE_SLUGS.forEach(function (s) {
      scope.add(s);
      var c = codeOf.get(s);
      var l = c ? ladders.get(c) : null;
      if (l) ladderLib.RUNGS.forEach(function (r) { l.pages[r].forEach(function (p) { scope.add(p.slug); }); });
    });
  }

  var st = { decks: col.decks.length, ladders: ladders.size, inLadder: 0, applied: 0, reemitted: 0, removed: 0, already: 0, skipped: 0, errors: col.errors.length, stale: 0, missing: 0 };
  col.errors.forEach(function (e) { if (st.errors <= 10) console.log('  ERR ' + e); });
  var done = 0;
  for (var i = 0; i < col.decks.length && done < TARGET_LIMIT; i++) {
    var d = col.decks[i];
    var code = codeOf.get(d.slug);
    if (!code) { st.skipped++; continue; }   // an app deck or a non-level mode: never touched
    var ladder = ladders.get(code) || null;
    if (ladder) st.inLadder++;
    if (scope && !scope.has(d.slug)) continue;
    done++;
    var deckHtmlPath = path.join(d.real, 'deck.html');
    if (!fs.existsSync(deckHtmlPath)) { st.errors++; console.log('  ERR ' + d.slug + ': deck.html missing'); continue; }
    var content = fs.readFileSync(deckHtmlPath, 'utf8');
    var loc = resolveLocale(d.manifest, content, locale);
    if (loc.error) { st.errors++; console.log('  ERR ' + d.slug + ': ' + loc.error); continue; }

    if (CHECK) {
      if (!ladder) { if (content.indexOf(ladderLib.MARKER) !== -1) { st.stale++; console.log('  STALE ' + d.slug + ' (no ladder)'); } continue; }
      var want = ladderLib.block({ locale: locale, slug: d.slug }, ladder);
      var have = currentBlock(content);
      if (!have) { st.missing++; if (st.missing <= 10) console.log('  MISSING ' + d.slug); }
      else if (have !== want) { st.stale++; if (st.stale <= 10) console.log('  STALE ' + d.slug); }
      continue;
    }

    var result = injectIntoDeckHtml(content, { locale: locale, slug: d.slug }, ladder);
    if (result.error) { st.errors++; console.log('  ERR ' + d.slug + ': ' + result.error); continue; }
    if (result.alreadyApplied) { st.already++; continue; }
    if (result.changed) {
      if (!DRY_RUN) atomicWrite(deckHtmlPath, result.content);
      if (result.removed) st.removed++; else { st.applied++; if (result.reemitted) st.reemitted++; }
    }
  }
  return st;
}

function main() {
  console.log('=== inject-deck-ladder === ' + (CHECK ? '[CHECK]' : DRY_RUN ? '[DRY-RUN]' : REMOVE ? '[REMOVE]' : REWRITE ? '[REWRITE]' : '[WRITE]') +
    (WAVE_SLUGS ? ' scope=' + WAVE_SLUGS.size + ' wave slugs (+ their ladders)' : ' scope=catalog'));
  var locales = TARGET_LOCALE ? [TARGET_LOCALE] : ALL_LOCALES;
  var bad = 0;
  locales.forEach(function (loc) {
    if (ALL_LOCALES.indexOf(loc) === -1) { console.log('unknown locale ' + loc); bad++; return; }
    var st = processLocale(loc);
    console.log(loc + ': decks ' + st.decks + ' · ladders ' + st.ladders + ' · pages in a ladder ' + st.inLadder +
      (CHECK ? ' · missing ' + st.missing + ' · stale ' + st.stale
        : ' · applied ' + st.applied + ' (re-emitted ' + st.reemitted + ') · removed ' + st.removed + ' · unchanged ' + st.already) +
      ' · not coded ' + st.skipped + ' · errors ' + st.errors);
    if (st.errors) bad++;
    if (CHECK && (st.missing || st.stale)) bad++;
  });
  process.exit(bad ? 1 : 0);
}

module.exports = { injectIntoDeckHtml, stripBlock, currentBlock, collect, resolveLocale };

if (require.main === module) main();
