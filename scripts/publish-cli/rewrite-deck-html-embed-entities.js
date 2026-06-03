#!/usr/bin/env node
/**
 * rewrite-deck-html-embed-entities.js — retrofit: numeric-entity-encode the baked
 * embed-snippet caption vars in published deck.htmls so the copied embed snippet
 * renders correctly on a host page of ANY charset.
 *
 * THE BUG: buildEmbedAffordance (REFERENCE TRANSLATIONS/catalog-export.js) baked the
 * embed snippet's caption pieces as RAW UTF-8 JS vars —
 *   var prefixText="Arbetsblad från"   var sepText=" — "
 *   var keywordText="…"                 var iframeTitle="… från …"
 * The snippet's buildSnippet() assembles the visible backlink caption from these.
 * When the operator pastes the snippet onto a non-UTF-8 host page, the raw UTF-8
 * mojibakes (å → Ã¥, — → â€"). The deck is self-contained (catalog-export.js is not
 * loaded at runtime), so the raw bytes are baked into every deck.html.
 *
 * THE FIX (forward, in catalog-export.js) entity-encodes new decks. THIS script
 * retrofits the already-published decks: it rewrites the non-ASCII inside the five
 * baked `var (prefixText|brandText|sepText|keywordText|iframeTitle)="…"` assignments
 * to numeric HTML entities (å → &#229;, — → &#8212;) — charset-independent, ASCII-only.
 *
 * Scope: every locale (the `—` separator + iframe-title em-dash appear in all of them).
 * Idempotent (already-entity'd values are pure ASCII → untouched). Atomic:
 * backup (.bak.embed-entities) → temp → rename(2) per §15.5. Only the 5 caption vars
 * are touched — the rest of deck.html (including the UTF-8 worksheet, meta charset,
 * and the in-deck dialog labels) is byte-identical.
 *
 * Usage:
 *   node scripts/publish-cli/rewrite-deck-html-embed-entities.js --dry-run --locales=sv --sample=5
 *   node scripts/publish-cli/rewrite-deck-html-embed-entities.js --confirm --locales=en,de,es,fr,it,pt,nl,sv,da,no,fi
 */
var fs = require('fs');
var path = require('path');

var DEFAULT_DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = ['no', 'da', 'fi', 'sv', 'nl', 'it', 'pt', 'es', 'fr', 'de', 'en'];

// The five baked embed-snippet vars whose values leave the deck inside the copied
// snippet (caption text + iframe title). JSON.stringify wraps each value in "…";
// escAttr/escHtml already turned any literal `"` into &quot;, so [^"]* is safe.
var EMBED_VAR_RE = /var (prefixText|brandText|sepText|keywordText|iframeTitle)="([^"]*)"/g;

/** Convert every non-ASCII char (>U+007F) to a numeric HTML entity. ASCII-safe + idempotent. */
function escEntities(s) {
  return String(s == null ? '' : s).replace(/[-￿]/g, function (c) {
    return '&#' + c.charCodeAt(0) + ';';
  });
}

/** Rewrite the 5 caption vars in `html`. Returns {status, html?, matched, changedVars}. */
function rewriteHtml(html) {
  var matched = 0;
  var changedVars = 0;
  var out = html.replace(EMBED_VAR_RE, function (full, name, val) {
    matched++;
    var enc = escEntities(val);
    if (enc === val) return full;
    changedVars++;
    return 'var ' + name + '="' + enc + '"';
  });
  if (matched === 0) return { status: 'no-embed', matched: 0, changedVars: 0 };
  if (changedVars === 0) return { status: 'idempotent', matched: matched, changedVars: 0 };
  return { status: 'rewrite', html: out, matched: matched, changedVars: changedVars };
}

function parseArgs(argv) {
  var out = { dryRun: true, confirm: false, decksRoot: DEFAULT_DECKS_ROOT, locales: ALL_LOCALES.slice(), sample: null };
  argv.slice(2).forEach(function (a) {
    if (a === '--confirm') { out.confirm = true; out.dryRun = false; }
    else if (a === '--dry-run') { out.dryRun = true; out.confirm = false; }
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node rewrite-deck-html-embed-entities.js [--dry-run|--confirm] [--locales=sv,en] [--sample=N] [--decks-root=path]');
      process.exit(0);
    }
  });
  return out;
}

function listDeckDirs(decksRoot, locale, sampleN) {
  var d = path.join(decksRoot, locale);
  if (!fs.existsSync(d)) return [];
  var dirs = fs.readdirSync(d, { withFileTypes: true })
    .filter(function (e) { return e.isDirectory() && !e.name.startsWith('.'); }) // real version dirs; symlinks + .archived skipped
    .map(function (e) { return path.join(d, e.name); });
  if (sampleN && sampleN > 0 && dirs.length > sampleN) dirs = dirs.slice(0, sampleN);
  return dirs;
}

function processDeck(deckDir, opts) {
  var htmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(htmlPath)) return { status: 'missing' };
  var raw = fs.readFileSync(htmlPath, 'utf8');
  var r = rewriteHtml(raw);
  if (r.status !== 'rewrite') return { status: r.status };
  if (opts.dryRun) return { status: 'would-rewrite', changedVars: r.changedVars };
  var bak = htmlPath + '.bak.embed-entities';
  var tmp = htmlPath + '.tmp.embed-entities';
  try {
    if (!fs.existsSync(bak)) fs.copyFileSync(htmlPath, bak);
    fs.writeFileSync(tmp, r.html, 'utf8');
    fs.renameSync(tmp, htmlPath);
  } catch (e) { return { status: 'fs-error', error: e.message }; }
  return { status: 'written', changedVars: r.changedVars };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== deck embed-caption entity-encode retrofit ===');
  console.log('mode:       ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', '));
  console.log('sample:     ' + (opts.sample || 'all') + '\n');

  var grand = { total: 0, rewrite: 0, idempotent: 0, noEmbed: 0, errors: 0 };
  opts.locales.forEach(function (locale) {
    var t = { total: 0, rewrite: 0, idempotent: 0, noEmbed: 0, errors: 0 };
    listDeckDirs(opts.decksRoot, locale, opts.sample).forEach(function (deckDir) {
      var res = processDeck(deckDir, opts);
      t.total++;
      if (res.status === 'written' || res.status === 'would-rewrite') t.rewrite++;
      else if (res.status === 'idempotent') t.idempotent++;
      else if (res.status === 'no-embed') { t.noEmbed++; }
      else if (res.status === 'fs-error') { t.errors++; console.log('  ERROR ' + deckDir + ': ' + res.error); }
      else if (res.status === 'missing') { t.noEmbed++; }
    });
    grand.total += t.total; grand.rewrite += t.rewrite; grand.idempotent += t.idempotent; grand.noEmbed += t.noEmbed; grand.errors += t.errors;
    console.log('[' + locale + '] ' + t.total + ' decks; ' + (opts.dryRun ? t.rewrite + ' would-rewrite' : t.rewrite + ' written') + ', ' + t.idempotent + ' idempotent, ' + t.noEmbed + ' no-embed/missing, ' + t.errors + ' errors');
  });

  console.log('\n=== Summary ===');
  console.log('Total decks:    ' + grand.total);
  console.log((opts.dryRun ? 'Would rewrite:  ' : 'Rewritten:      ') + grand.rewrite);
  console.log('Idempotent:     ' + grand.idempotent);
  console.log('No-embed/miss:  ' + grand.noEmbed);
  console.log('Errors:         ' + grand.errors);
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { escEntities: escEntities, rewriteHtml: rewriteHtml, listDeckDirs: listDeckDirs };
