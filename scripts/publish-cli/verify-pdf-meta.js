/**
 * verify-pdf-meta.js — read back PDF /Info metadata + the LCSCanonicalLink
 * annotation for a sample of published decks per locale, and assert the
 * PDF-SEO acceptance gates:
 *   (a) no English leak on non-EN (no "worksheet"/"K-3"/"Kindergarten"-EN tokens;
 *       the localized worksheet/print word IS present),
 *   (b) printable-intent framing (no "interactive"/"play online"),
 *   (c) the clickable canonical /Link annotation is preserved (≥1 LCSCanonicalLink),
 *   (d) char budgets sane (Title ≤ ~95, Subject ≤ ~180).
 *
 * Read-only. Usage:
 *   node scripts/publish-cli/verify-pdf-meta.js --deck-list=/tmp/decks.tsv --per-locale=3
 */
'use strict';
var fs = require('fs');
var path = require('path');
var pdfLib = require('pdf-lib');
var PDFDocument = pdfLib.PDFDocument;
var PDFName = pdfLib.PDFName;

var DECKS_ROOT = '/var/www/lcs-media/decks';
var LOCALES = ['en', 'de', 'es', 'pt', 'fr', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
// English tokens that must NOT appear on non-EN PDFs (whole-word, case-insensitive).
// NOTE: "kindergarten" is excluded — it is also the correct GERMAN level word (a
// shared loanword), so it is not an English-leak signal. "grade"/"preschool" stay
// (no non-EN locale uses them).
var EN_LEAK = /\b(worksheet|worksheets|preschool|grade [0-9]|free printable|k-3|interactive|play online|print or play)\b/i;
// the localized "printable/print" word that SHOULD appear per locale
var PRINT_WORD = {
  en: /printable/i, de: /ausdrucken|druckbar/i, es: /imprimir|imprimible/i, pt: /imprimir/i,
  fr: /imprimer|imprimable/i, it: /stampare|stampabile/i, nl: /printen|afdrukken/i,
  sv: /skriva ut/i, da: /print/i, no: /utskrift/i, fi: /tulostettava/i
};

function args() {
  var o = { deckList: null, perLocale: 3 };
  process.argv.slice(2).forEach(function (a) {
    if (a.indexOf('--deck-list=') === 0) o.deckList = a.slice(12);
    else if (a.indexOf('--per-locale=') === 0) o.perLocale = parseInt(a.slice(13), 10) || 3;
  });
  return o;
}

function sampleByLocale(listPath, per) {
  var lines = fs.readFileSync(listPath, 'utf8').split('\n');
  var by = {};
  for (var i = 0; i < lines.length; i++) {
    var t = lines[i].indexOf('\t'); if (t < 0) continue;
    var lang = lines[i].slice(0, t).trim(), slug = lines[i].slice(t + 1).trim();
    if (!slug) continue;
    by[lang] = by[lang] || [];
    if (by[lang].length < per) by[lang].push(slug);
  }
  return by;
}

function hasCanonicalLink(doc) {
  var pages = doc.getPages();
  for (var i = 0; i < pages.length; i++) {
    var annots = pages[i].node.lookup(PDFName.of('Annots'));
    var arr = annots && annots.asArray ? annots.asArray() : [];
    for (var j = 0; j < arr.length; j++) {
      try {
        var r = doc.context.lookup(arr[j]);
        var nm = r.get(PDFName.of('NM'));
        var s = nm && (nm.decodeText ? nm.decodeText() : (nm.asString ? nm.asString() : ''));
        if (s && String(s).indexOf('LCSCanonicalLink') >= 0) return true;
      } catch (e) { /* skip */ }
    }
  }
  return false;
}

async function main() {
  var a = args();
  var by = sampleByLocale(a.deckList, a.perLocale);
  var fails = 0, checked = 0;
  for (var li = 0; li < LOCALES.length; li++) {
    var loc = LOCALES[li];
    var slugs = by[loc] || [];
    console.log('\n=== ' + loc + ' ===');
    for (var si = 0; si < slugs.length; si++) {
      var slug = slugs[si];
      var p = path.join(DECKS_ROOT, loc, slug, slug + '-printable.pdf');
      if (!fs.existsSync(p)) { console.log('  MISS ' + slug); continue; }
      checked++;
      var doc = await PDFDocument.load(fs.readFileSync(p), { updateMetadata: false });
      var title = doc.getTitle() || '', subject = doc.getSubject() || '', kw = doc.getKeywords() || '';
      var link = hasCanonicalLink(doc);
      var problems = [];
      if (loc !== 'en') {
        if (EN_LEAK.test(title) || EN_LEAK.test(subject) || EN_LEAK.test(kw)) problems.push('EN-LEAK');
        if (PRINT_WORD[loc] && !(PRINT_WORD[loc].test(title) || PRINT_WORD[loc].test(subject))) problems.push('NO-PRINT-WORD');
      }
      if (/interactive|play online|print or play/i.test(subject)) problems.push('DECK-FRAMING');
      if (!link) problems.push('NO-LINK');
      if (title.length > 95) problems.push('TITLE-LONG(' + title.length + ')');
      if (subject.length > 180) problems.push('SUBJ-LONG(' + subject.length + ')');
      if (problems.length) fails++;
      console.log('  [' + (problems.length ? 'FAIL ' + problems.join(',') : 'ok') + '] ' + slug);
      console.log('     T: ' + title);
      console.log('     S: ' + subject);
      console.log('     K: ' + kw);
      console.log('     link=' + link);
    }
  }
  console.log('\n=== checked=' + checked + ' fails=' + fails + ' ===');
  process.exit(fails ? 1 : 0);
}
main().catch(function (e) { console.error('FATAL', e && e.stack || e); process.exit(2); });
