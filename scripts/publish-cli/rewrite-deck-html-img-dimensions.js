#!/usr/bin/env node
/**
 * Retrofit: add intrinsic width/height to the deck worksheet <img>.
 *
 * Per the page-speed audit 2026-06 (docs/audit-results/pagespeed-audit-2026-06.md),
 * the worksheet image `<img class="lcs-worksheet__img">` ships with NO width/height
 * and NO aspect-ratio. For non-square decks this causes large Cumulative Layout
 * Shift on mobile (measured: deck-A addition CLS 0.313; square sudoku 0.001) — the
 * browser cannot reserve the image box until the inline data-URI JPEG decodes.
 *
 * Fix (purely additive, no visual change): decode the inline JPEG's SOF marker to
 * get its pixel width/height and inject `width="W" height="H"` on the img tag. The
 * existing CSS (`width:100%;height:auto`) still scales it responsively; the
 * attributes only give the browser the aspect-ratio up front so the box is reserved.
 * The runtime responsive-fit logic already keys off `img.naturalWidth` and is
 * unaffected.
 *
 * Self-contained: NO DB, NO substitute, NO network. Idempotent (re-run = 0 changes).
 * Atomicity: backup (.bak.img-dims) → temp → rename(2) per §15.5. dry-run/confirm
 * parity per §15.13. Member of the rewrite-deck-html-*.js family (§A.14.9 / §21.2).
 *
 * Usage (run on Hetzner):
 *   node scripts/publish-cli/rewrite-deck-html-img-dimensions.js --dry-run
 *   node scripts/publish-cli/rewrite-deck-html-img-dimensions.js --dry-run --locales=no,da --sample=5
 *   node scripts/publish-cli/rewrite-deck-html-img-dimensions.js --confirm --locales=no
 */
'use strict';

var fs = require('fs');
var path = require('path');

var DEFAULT_DECKS_ROOT = '/var/www/lcs-media/decks';
var LOCALE_CHUNK_ORDER = ['no', 'da', 'fi', 'sv', 'nl', 'it', 'pt', 'es', 'fr', 'de', 'en'];
var IMG_CLASS = 'class="lcs-worksheet__img"';
var ID_TOKEN = 'id="lcs-worksheet-img"';

function parseArgs(argv) {
  var out = { dryRun: true, confirm: false, decksRoot: DEFAULT_DECKS_ROOT, locales: LOCALE_CHUNK_ORDER.slice(), sample: null };
  argv.slice(2).forEach(function (a) {
    if (a === '--confirm') { out.confirm = true; out.dryRun = false; }
    else if (a === '--dry-run') { out.dryRun = true; out.confirm = false; }
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node rewrite-deck-html-img-dimensions.js [--dry-run|--confirm] [--locales=no,da] [--sample=N] [--decks-root=path]');
      process.exit(0);
    }
  });
  return out;
}

/**
 * Read width/height from a JPEG buffer by scanning for an SOFn frame header.
 * SOFn markers: 0xFFC0..0xFFCF EXCEPT C4 (DHT), C8 (JPG), CC (DAC).
 * Frame header layout after the 2-byte marker: length(2) precision(1) height(2) width(2).
 * Returns {w,h} or null.
 */
function jpegSize(buf) {
  if (buf.length < 4 || buf[0] !== 0xFF || buf[1] !== 0xD8) return null; // not SOI
  var off = 2;
  while (off + 9 < buf.length) {
    if (buf[off] !== 0xFF) { off++; continue; }
    var marker = buf[off + 1];
    if (marker === 0xFF) { off++; continue; }                       // fill byte
    if (marker === 0xD8 || marker === 0xD9 || (marker >= 0xD0 && marker <= 0xD7)) { off += 2; continue; } // standalone
    var segLen = buf.readUInt16BE(off + 2);
    var isSOF = (marker >= 0xC0 && marker <= 0xCF) && marker !== 0xC4 && marker !== 0xC8 && marker !== 0xCC;
    if (isSOF) {
      var h = buf.readUInt16BE(off + 5);
      var w = buf.readUInt16BE(off + 7);
      if (w > 0 && h > 0) return { w: w, h: h };
      return null;
    }
    off += 2 + segLen; // skip this segment
  }
  return null;
}

/** Decode the worksheet image dims from its base64 data-URI src (prefix-first). */
function dimsFromBase64(b64) {
  // SOF lives near the JPEG start; decode a prefix first to avoid decoding the
  // full ~400KB. Fall back to full decode if not found (rare: many/large APPn).
  var prefix = b64.slice(0, 48000); // ~36KB binary
  var dims = jpegSize(Buffer.from(prefix, 'base64'));
  if (dims) return dims;
  return jpegSize(Buffer.from(b64, 'base64'));
}

/**
 * Locate the worksheet <img …> tag and return {start,end,tag,b64,hasDims} or null.
 */
function locateImg(html) {
  var ci = html.indexOf(IMG_CLASS);
  if (ci === -1) return null;
  var start = html.lastIndexOf('<img', ci);
  if (start === -1) return null;
  var end = html.indexOf('>', ci);
  if (end === -1) return null;
  var tag = html.slice(start, end + 1);
  if (!/\bid="lcs-worksheet-img"/.test(tag)) return null;
  var hasDims = /\swidth="\d/.test(tag) && /\sheight="\d/.test(tag);
  var m = tag.match(/src="data:image\/jpeg;base64,([A-Za-z0-9+/=]+)"/);
  return { start: start, end: end + 1, tag: tag, b64: m ? m[1] : null, hasDims: hasDims };
}

/** Inject width/height after id="lcs-worksheet-img". Returns new html or null. */
function rewriteHtml(html) {
  var loc = locateImg(html);
  if (!loc) return { status: 'no-img' };
  if (loc.hasDims) return { status: 'idempotent' };
  if (!loc.b64) return { status: 'no-datauri' };
  var dims = dimsFromBase64(loc.b64);
  if (!dims) return { status: 'undecodable' };
  var newTag = loc.tag.replace(ID_TOKEN, ID_TOKEN + ' width="' + dims.w + '" height="' + dims.h + '"');
  if (newTag === loc.tag) return { status: 'inject-failed' };
  var newHtml = html.slice(0, loc.start) + newTag + html.slice(loc.end);
  return { status: 'rewrite', html: newHtml, dims: dims };
}

function listDeckDirs(decksRoot, locale, sampleN) {
  var d = path.join(decksRoot, locale);
  if (!fs.existsSync(d)) return [];
  var dirs = fs.readdirSync(d, { withFileTypes: true })
    .filter(function (e) { return e.isDirectory() && !e.name.startsWith('.'); })
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
  if (opts.dryRun) return { status: 'would-rewrite', dims: r.dims };
  var bak = htmlPath + '.bak.img-dims';
  var tmp = htmlPath + '.tmp.img-dims';
  try {
    if (!fs.existsSync(bak)) fs.copyFileSync(htmlPath, bak);
    fs.writeFileSync(tmp, r.html, 'utf8');
    fs.renameSync(tmp, htmlPath);
  } catch (e) { return { status: 'fs-error', error: e.message }; }
  return { status: 'written', dims: r.dims };
}

function main() {
  var opts = parseArgs(process.argv);
  console.log('=== deck worksheet-img width/height retrofit ===');
  console.log('mode:       ' + (opts.dryRun ? 'DRY-RUN (no writes)' : 'APPLY (--confirm)'));
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', '));
  console.log('sample:     ' + (opts.sample || 'all') + '\n');

  var grand = { total: 0, rewrite: 0, idempotent: 0, errors: 0, other: 0 };
  opts.locales.forEach(function (locale) {
    var t = { total: 0, rewrite: 0, idempotent: 0, errors: 0, other: 0 };
    listDeckDirs(opts.decksRoot, locale, opts.sample).forEach(function (deckDir) {
      var res = processDeck(deckDir, opts);
      t.total++;
      if (res.status === 'written' || res.status === 'would-rewrite') t.rewrite++;
      else if (res.status === 'idempotent') t.idempotent++;
      else if (res.status === 'fs-error') { t.errors++; console.log('  ERROR ' + deckDir + ': ' + res.error); }
      else if (res.status === 'undecodable' || res.status === 'no-img' || res.status === 'no-datauri' || res.status === 'inject-failed') {
        t.other++; console.log('  ' + res.status.toUpperCase() + ': ' + path.basename(deckDir));
      }
    });
    grand.total += t.total; grand.rewrite += t.rewrite; grand.idempotent += t.idempotent; grand.errors += t.errors; grand.other += t.other;
    console.log('[' + locale + '] ' + t.total + ' decks; ' + (opts.dryRun ? t.rewrite + ' would-rewrite' : t.rewrite + ' written') + ', ' + t.idempotent + ' idempotent, ' + t.other + ' skipped, ' + t.errors + ' errors');
  });

  console.log('\n=== Summary ===');
  console.log('Total decks:   ' + grand.total);
  console.log((opts.dryRun ? 'Would rewrite: ' : 'Rewritten:     ') + grand.rewrite);
  console.log('Idempotent:    ' + grand.idempotent);
  console.log('Skipped(other):' + grand.other);
  console.log('Errors:        ' + grand.errors);
  process.exit(grand.errors > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { jpegSize: jpegSize, dimsFromBase64: dimsFromBase64, locateImg: locateImg, rewriteHtml: rewriteHtml };
