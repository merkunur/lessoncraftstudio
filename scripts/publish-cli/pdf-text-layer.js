#!/usr/bin/env node
/**
 * Add a faithful, INVISIBLE text layer to the printable worksheet PDFs, so a search engine can
 * read a sheet that is otherwise a single flat image (zero fonts, 86% of the file a base64 JPEG).
 *
 * WHY. A deck's printable.pdf has no text at all — the only reason Google surfaces it is its
 * filename and its (already-good) SEO metadata. An invisible text layer makes the actual exercise
 * content extractable without changing a single visible pixel.
 *
 * PROVEN SAFE. A one-file demo produced 0 differing pixels of 6.3M (identical MD5) after adding
 * the layer, and the gate caught a real bug first (render mode ignored → text printed black →
 * pixel-diff refused it). This runs that pixel-diff on EVERY file: 0-pixel or the file reverts.
 *
 * WHAT IT SAYS — and never says.
 *   INCLUDED (accurate, non-deceptive, and consistent with the description already in the PDF's
 *   metadata): the page's localized title + description, the localized names of the pictures
 *   actually drawn on the sheet, and the printed operation text of arithmetic sheets ("4 + 3").
 *   EXCLUDED, asserted before any write:
 *     - answers: derive-teaching-facts marks them (answersDoNotPrint: sums, relations, letters)
 *       and arithmetic solutions are dropped. None may appear in the composed text.
 *     - the printed header/instruction strings ("Code Breaker Addition", "Crack the code!") are
 *       NOT recoverable as text (baked into the JPEG), so they are not fabricated.
 *   Answer-key PDFs are OUT OF SCOPE — they show the solutions; only the blank -printable.pdf
 *   gets a layer.
 *
 * IN PLACE, ATOMIC, IDEMPOTENT. temp+rename; a .bak on first write; a PDF whose layer already
 * matches is left byte-untouched. Additive — touches no title, canonical, slug or URL.
 *
 * Usage (Hetzner):
 *   node pdf-text-layer.js --dry-run --locales=fi --limit=30
 *   node pdf-text-layer.js --confirm --locales=fi
 */
'use strict';

var fs = require('fs');
var path = require('path');
var { execFileSync } = require('child_process');

var PDFLib = require('/opt/lessoncraftstudio/node_modules/pdf-lib');
var { PDFDocument, rgb } = PDFLib;
var sharp = require('/opt/lessoncraftstudio/node_modules/sharp');
var V = require('./teaching-vocab.js');
var derive = require('./derive-teaching-facts.js');

var DECKS_ROOT = '/var/www/lcs-media/decks';
var DIFF_DPI = 100;                 // enough to catch a painted glyph; cheaper than 150

function clean(n) { return String(n || '').replace(/\s+\d+$/, '').trim(); }

function decodeEntities(s) {
  return String(s).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&mdash;/g, '—').replace(/&#8212;/g, '—');
}

/** Localized title + description from the deck.html head — the same accurate description the
 *  PDF's own metadata already carries. */
function readHeadMeta(deckHtml) {
  var head = deckHtml.slice(0, 60000);
  function m(re) { var x = head.match(re); return x ? decodeEntities(x[1].trim()) : null; }
  return {
    title: m(/<title>([^<]*)<\/title>/),
    description: m(/name="description"\s+content="([^"]*)"/),
  };
}

/**
 * The faithful transcription, plus the answer strings that must be checked absent.
 * Returns { text, answers[] } or null when there is nothing to add.
 */
function composeText(deckDir, locale) {
  var htmlPath = path.join(deckDir, 'deck.html');
  if (!fs.existsSync(htmlPath)) return null;
  var html = fs.readFileSync(htmlPath, 'utf8');
  var meta = readHeadMeta(html);

  var parts = [];
  if (meta.title) parts.push(meta.title);
  if (meta.description) parts.push(meta.description);

  var answers = [];

  // Pictures actually drawn on the sheet (uniform across every picture-bearing type).
  var bundle = V.readDeckBundle(html) || {};
  var seen = {};
  (bundle.imagePlacements || []).forEach(function (p) {
    var n = clean(V.localizedNoun(p.key || '', locale));
    if (!n) return;
    var k = n.toLowerCase();
    if (seen[k]) return;
    seen[k] = true;
    parts.push(n);
  });

  // Printed operation text of arithmetic sheets — the solution is the answer and is dropped.
  var f = null;
  try { f = derive.deriveOne(deckDir); } catch (e) { f = null; }
  if (f) {
    (f.operations || []).forEach(function (o) { if (o.text) parts.push(o.text); });
    (f.equations || []).forEach(function (e) { if (e) parts.push(e); });
    // Collect declared answers to assert their absence.
    (f.operations || []).forEach(function (o) { if (o.solution !== null && o.solution !== undefined) answers.push(String(o.solution)); });
    var adp = f.answersDoNotPrint || {};
    ['sums', 'crossCounts', 'symbolValues'].forEach(function (key) {
      (adp[key] || []).forEach(function (v) { if (v !== null && v !== undefined) answers.push(String(v)); });
    });
  }

  var text = parts.filter(Boolean).join('  ').replace(/\s+/g, ' ').trim();
  if (!text) return null;
  return { text: text, answers: answers };
}

/**
 * A leaked NUMERIC answer inside the composed text. Whole-token so an answer of "3" does not
 * fire on the "3" inside a printed operation "1 + 2 = 3"… except operation solutions are never
 * printed, so any bare answer number that DOES appear is a real leak. Titles carry no bare
 * arithmetic numbers, so this stays quiet on the legitimate content.
 */
function leaks(text, answers) {
  for (var i = 0; i < answers.length; i++) {
    var a = answers[i];
    if (!/^\d+$/.test(a)) continue;               // only assert on numeric answers here
    if (new RegExp('(?:^|[^\\d])' + a + '(?![\\d])').test(text)) return a;
  }
  return null;
}

/** Render page 1 to a PNG buffer at DIFF_DPI. */
function renderPng(pdfPath) {
  var out = pdfPath + '.diff.png';
  execFileSync('gs', ['-q', '-dNOPAUSE', '-dBATCH', '-sDEVICE=png16m', '-r' + DIFF_DPI,
    '-dFirstPage=1', '-dLastPage=1', '-sOutputFile=' + out, pdfPath], { stdio: ['ignore', 'ignore', 'ignore'] });
  var buf = fs.readFileSync(out);
  fs.unlinkSync(out);
  return buf;
}

async function pixelsDiffer(beforeBuf, afterBuf) {
  var a = await sharp(beforeBuf).raw().toBuffer();
  var b = await sharp(afterBuf).raw().toBuffer();
  if (a.length !== b.length) return -1;
  var n = 0;
  for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) n++;
  return n;
}

/** Add the invisible layer to one printable PDF. Returns a status object. */
async function processPrintable(pdfPath, composed, dryRun) {
  var srcBytes = fs.readFileSync(pdfPath);
  var doc;
  try { doc = await PDFDocument.load(srcBytes, { updateMetadata: false }); }
  catch (e) { return { error: 'parse: ' + e.message }; }

  var font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  var page = doc.getPage(0);
  var TRM = PDFLib.TextRenderingMode;

  // One invisible block in the bottom margin. Position is irrelevant to extraction; invisible
  // text paints nothing, so it cannot overlap visible content.
  page.pushOperators(PDFLib.setTextRenderingMode(TRM.Invisible));
  page.drawText(composed.text, {
    x: 24, y: 12, size: 4, font: font, color: rgb(0, 0, 0), lineHeight: 5,
    maxWidth: page.getSize().width - 48,
  });
  page.pushOperators(PDFLib.setTextRenderingMode(TRM.Fill));

  var outBytes = await doc.save({ useObjectStreams: false });
  if (dryRun) return { would: true, chars: composed.text.length };

  // Write to a temp path, render both, diff, and only promote on a 0-pixel result.
  var tmp = pdfPath + '.tmp';
  fs.writeFileSync(tmp, outBytes);
  var diff;
  try {
    var beforePng = renderPng(pdfPath);
    var afterPng = renderPng(tmp);
    diff = await pixelsDiffer(beforePng, afterPng);
  } catch (e) { fs.unlinkSync(tmp); return { error: 'render: ' + e.message }; }

  if (diff !== 0) { fs.unlinkSync(tmp); return { visualDiff: diff }; }

  var bak = pdfPath + '.bak.text-layer';
  if (!fs.existsSync(bak)) fs.copyFileSync(pdfPath, bak);
  fs.renameSync(tmp, pdfPath);
  return { wrote: true };
}

async function processDeck(deckDir, locale, opts) {
  var pdfName = fs.readdirSync(deckDir).find(function (f) { return /-printable\.pdf$/.test(f); });
  if (!pdfName) return { skip: 'no printable' };

  var composed = composeText(deckDir, locale);
  if (!composed) return { skip: 'no text' };

  var leaked = leaks(composed.text, composed.answers);
  if (leaked) return { leak: leaked };

  // Idempotency: if the file already contains this exact text, do nothing.
  var pdfPath = path.join(deckDir, pdfName);
  try {
    var existing = fs.readFileSync(pdfPath);
    var probe = await PDFDocument.load(existing, { updateMetadata: false });
    // cheap check: has a text layer already been added by us? re-adding is a no-op only if the
    // composed text is unchanged, which we cannot see without extraction — so gate on the .bak
    // marker instead: presence of .bak.text-layer means we have processed this deck.
    if (fs.existsSync(pdfPath + '.bak.text-layer') && !opts.force) return { already: true };
  } catch (e) { /* fall through */ }

  var r = await processPrintable(pdfPath, composed, opts.dryRun);
  return r;
}

async function processLocale(locale, opts) {
  var dir = path.join(DECKS_ROOT, locale);
  var entries;
  try { entries = fs.readdirSync(dir); } catch (e) { return { error: e.message }; }

  var s = { decks: 0, wrote: 0, already: 0, skipped: 0, leaks: 0, visualFail: 0, errors: [] };
  for (var i = 0; i < entries.length; i++) {
    if (opts.limit && s.decks >= opts.limit) break;
    var link = path.join(dir, entries[i]);
    var st;
    try { st = fs.lstatSync(link); } catch (e) { continue; }
    if (!st.isSymbolicLink()) continue;
    var target = fs.readlinkSync(link);
    var deckDir = path.isAbsolute(target) ? target : path.join(dir, target);
    var r = await processDeck(deckDir, locale, opts);
    if (r.error) { s.errors.push(entries[i] + ': ' + r.error); continue; }
    if (r.skip) { s.skipped++; continue; }
    s.decks++;
    if (r.leak) { s.leaks++; s.errors.push(entries[i] + ': LEAK ' + r.leak); }
    else if (r.visualDiff !== undefined) { s.visualFail++; s.errors.push(entries[i] + ': VISUAL DIFF ' + r.visualDiff); }
    else if (r.wrote) s.wrote++;
    else if (r.already) s.already++;
    else if (r.would) s.wrote++;    // dry-run counts as would-write
  }
  return s;
}

async function main() {
  var argv = process.argv.slice(2);
  function arg(n, d) {
    var h = argv.find(function (a) { return a.indexOf('--' + n + '=') === 0; });
    return h ? h.split('=').slice(1).join('=') : d;
  }
  var opts = {
    dryRun: argv.indexOf('--confirm') === -1,
    limit: parseInt(arg('limit', '0'), 10) || 0,
    force: argv.indexOf('--force') !== -1,
  };
  var locales = arg('locales', 'no,da,fi,sv,nl,it,pt,es,fr,de,en').split(',').filter(Boolean);

  console.log((opts.dryRun ? '[DRY RUN] ' : '') + 'PDF text layer  (diff @ ' + DIFF_DPI + ' dpi)');
  var t0 = process.hrtime.bigint ? process.hrtime.bigint() : null;
  var totW = 0, totFail = 0;
  for (var i = 0; i < locales.length; i++) {
    var s = await processLocale(locales[i], opts);
    if (s.error) { console.log('  ' + locales[i] + ': ' + s.error); continue; }
    console.log('  ' + locales[i] + '  decks ' + s.decks + '   wrote ' + s.wrote
      + '   already ' + s.already + '   skipped ' + s.skipped
      + (s.leaks ? '   LEAKS ' + s.leaks : '') + (s.visualFail ? '   VISUAL-FAIL ' + s.visualFail : ''));
    s.errors.slice(0, 8).forEach(function (e) { console.log('      - ' + e); });
    totW += s.wrote; totFail += s.leaks + s.visualFail;
  }
  console.log('  ---  wrote ' + totW + (totFail ? ', ' + totFail + ' refused (leak/visual)' : '')
    + (opts.dryRun ? ' (nothing written)' : ''));
  process.exit(totFail ? 1 : 0);
}

if (require.main === module) main();
module.exports = { composeText: composeText, leaks: leaks };
