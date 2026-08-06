#!/usr/bin/env node
/**
 * ONE-FILE DEMONSTRATION of a PDF invisible text layer, with proof it changes nothing visible.
 *
 * Reads a deck's printable.pdf (a flat image) and its deck.html (which carries every element's
 * position in the SAME 612x792 coordinate space the PDF uses), then overlays the localized
 * picture names as INVISIBLE text — PDF render mode 3, "add to text object but do not paint".
 *
 * It writes the result to a NEW file and touches nothing else. It does not deploy, does not
 * overwrite the source, does not run at scale. The point is to show two things on one PDF:
 *   1. the rendered page is pixel-identical before and after (Ghostscript raster + diff);
 *   2. the text layer is now extractable (word count > 0, and it is the real nouns).
 *
 * Usage: node pdf-text-layer-demo.js <deck-dir> <out-dir>
 */
'use strict';

var fs = require('fs');
var path = require('path');
var { execFileSync } = require('child_process');

var PDFLib = require('/opt/lessoncraftstudio/node_modules/pdf-lib');
var { PDFDocument, rgb } = PDFLib;
var V = require('./teaching-vocab.js');

function clean(n) { return String(n || '').replace(/\s+\d+$/, '').trim(); }

async function main() {
  var deckDir = process.argv[2];
  var outDir = process.argv[3] || '/tmp/pdf-demo';
  fs.mkdirSync(outDir, { recursive: true });

  var locale = deckDir.split('/decks/')[1].split('/')[0];
  var pdfName = fs.readdirSync(deckDir).find(function (f) { return /-printable\.pdf$/.test(f); });
  var srcPdf = path.join(deckDir, pdfName);
  var bundle = V.readDeckBundle(fs.readFileSync(path.join(deckDir, 'deck.html'), 'utf8')) || {};

  // Every pictured symbol, with its rect (top-left origin) and its localized name.
  var placements = (bundle.imagePlacements || []).map(function (p) {
    return { name: clean(V.localizedNoun(p.key || '', locale)) || clean(nameFromKey(p.key)), rect: p.rect };
  }).filter(function (p) { return p.name && p.rect; });

  var pageH = (bundle.page && bundle.page.height) || 792;

  var doc = await PDFDocument.load(fs.readFileSync(srcPdf), { updateMetadata: false });
  var font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  var page = doc.getPage(0);

  /* drawText in pdf-lib 1.17.1 IGNORES a renderMode option (the first demo proved it — the
   * text printed solid black). Invisibility has to be set as an explicit operator around the
   * text: `setTextRenderingMode(Invisible)` emits `3 Tr`, "add to the text object but paint
   * nothing". Restore to Fill afterwards so nothing else on the page is affected. */
  var TRM = PDFLib.TextRenderingMode;
  placements.forEach(function (p) {
    var r = p.rect;
    page.pushOperators(PDFLib.setTextRenderingMode(TRM.Invisible));
    page.drawText(p.name, {
      x: r.x,
      // PDF origin is bottom-left; the bundle's y is top-left, so flip it.
      y: pageH - r.y - r.h,
      size: 6,
      font: font,
      color: rgb(0, 0, 0),
    });
    page.pushOperators(PDFLib.setTextRenderingMode(TRM.Fill));
  });

  var outPdf = path.join(outDir, 'with-text-layer.pdf');
  fs.writeFileSync(outPdf, await doc.save({ useObjectStreams: false }));

  // --- proof 1: rendered pages are pixel-identical -------------------------------------------
  function raster(pdf, tag) {
    var png = path.join(outDir, tag + '.png');
    execFileSync('gs', ['-q', '-dNOPAUSE', '-dBATCH', '-sDEVICE=png16m', '-r150',
      '-dFirstPage=1', '-dLastPage=1', '-sOutputFile=' + png, pdf]);
    return png;
  }
  var beforePng = raster(srcPdf, 'before');
  var afterPng = raster(outPdf, 'after');

  var sharp = require('/opt/lessoncraftstudio/node_modules/sharp');
  Promise.all([sharp(beforePng).raw().toBuffer({ resolveWithObject: true }),
    sharp(afterPng).raw().toBuffer({ resolveWithObject: true })]).then(function (res) {
    var a = res[0].data, b = res[1].data;
    var diff = 0, maxd = 0;
    if (a.length !== b.length) { diff = -1; }
    else for (var i = 0; i < a.length; i++) { var d = Math.abs(a[i] - b[i]); if (d) { diff++; if (d > maxd) maxd = d; } }
    console.log('\n=== PROOF 1: does the page LOOK different? ===');
    console.log('  raster size:      ' + res[0].info.width + 'x' + res[0].info.height + ' (' + a.length + ' bytes each)');
    console.log('  differing pixels: ' + (diff === -1 ? 'SIZE MISMATCH' : diff + ' of ' + a.length));
    console.log('  max channel delta:' + maxd);
    console.log('  VERDICT: ' + (diff === 0 ? 'IDENTICAL — zero visual change' : 'CHANGED — do not ship'));

    console.log('\n=== PROOF 2: is the text now extractable? ===');
    var txt = execFileSync('gs', ['-q', '-dNOPAUSE', '-dBATCH', '-sDEVICE=txtwrite',
      '-sOutputFile=-', outPdf]).toString().replace(/\s+/g, ' ').trim();
    console.log('  extractable words: ' + (txt ? txt.split(' ').length : 0));
    console.log('  text: "' + txt.slice(0, 200) + '"');
    console.log('  named ' + placements.length + ' pictures: ' + placements.map(function (p) { return p.name; }).join(', '));
    console.log('\n  files: ' + beforePng + '  ' + afterPng + '  ' + outPdf);
  });
}

function nameFromKey(k) { return String(k || '').split('/').pop().replace(/-\d{6,}.*$/, '').replace(/-/g, ' '); }

main().catch(function (e) { console.error(e); process.exit(1); });
