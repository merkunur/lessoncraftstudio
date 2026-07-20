#!/usr/bin/env node
/**
 * Translate the screen-reader question rows on published deck pages.
 *
 * THE DEFECT. Every worksheet page carries a hidden list — one line per exercise — that is the
 * only way a blind teacher or child learns what is on the sheet. On 21,192 non-English pages
 * those lines are in ENGLISH: a Finnish page reads "Question 1: Drag the correct image into
 * wagon 1 to complete the pattern."
 *
 * The cause is §A.13.46's locale-binding class. Each app builds the row with
 * `t('srExercisePatternTrain') || '<English literal>'`, and `t()` resolves against the
 * OPERATOR'S UI LOCALE with an English fallback. The keys were only ever authored in `en` and
 * `de`, so German decks are correct (47 stragglers) and the other nine locales fall back to the
 * literal.
 *
 * It is also a duplicate-content defect: the same English sentences appear on ten locales'
 * pages, and within a page the same sentence repeats once per exercise.
 *
 * WHY THE ROWS CAN BE REWRITTEN RATHER THAN REGENERATED. Only the FRAME is English — the values
 * interpolated into it were always taken from the deck's own data and are already localised
 * ("Match Croissant…", "Count every Águia…", "Compare the groups of Limonader…"). So each row
 * is parsed with the English template it was built from, the captured values are kept, and the
 * locale's template is filled with them. Nothing is re-derived and no value is invented.
 *
 * Downstream retrofit, following rewrite-deck-html-alt-text.js: the same symlink walk, atomic
 * temp+rename, .bak sibling, idempotency and per-locale chunking. The app-side emission fix is
 * a separate commission (§10.3) so that newly published decks stop needing this.
 *
 * Usage (run on Hetzner):
 *   node rewrite-deck-html-sr-rows.js --dry-run --locales=fi
 *   node rewrite-deck-html-sr-rows.js --confirm --locales=fi,sv,da
 */
'use strict';

var fs = require('fs');
var path = require('path');
var T = require('./sr-row-templates.js');

var DECKS_ROOT = '/var/www/lcs-media/decks';

/**
 * A regex that recognises a row built from `tpl` and captures each placeholder's value.
 *
 * The first occurrence of a placeholder becomes a capture group; any later occurrence of the
 * SAME placeholder becomes a backreference, because a row like "Question 3: … wagon 3 …" must
 * only match when both numbers agree — otherwise a row could be parsed against the wrong
 * template and silently rewritten with shuffled values.
 */
function templateToRegex(tpl) {
  var order = [];
  var seen = {};
  var out = '';
  var i = 0;
  while (i < tpl.length) {
    var open = tpl.indexOf('{', i);
    if (open === -1) { out += escapeRe(tpl.slice(i)); break; }
    var close = tpl.indexOf('}', open);
    if (close === -1) { out += escapeRe(tpl.slice(i)); break; }
    out += escapeRe(tpl.slice(i, open));
    var name = tpl.slice(open + 1, close);
    if (seen[name]) {
      out += '\\' + seen[name];
    } else {
      order.push(name);
      seen[name] = order.length;
      // Numbers are digits; everything else is a noun or a whole expression.
      out += /^(n|N|a|b|sum|result|operandA|operandB)$/.test(name) ? '(\\d+)' : '(.+?)';
    }
    i = close + 1;
  }
  return { re: new RegExp('^' + out + '$'), order: order };
}

function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

/* Longest literal first. Two templates can both match a row — `Question {n}: {operationText}
 * blank.` will match almost anything — so the more specific pattern has to be tried first. */
var COMPILED = Object.keys(T.en)
  .filter(function (k) { return k !== 'srWorksheetQuestions'; })
  .map(function (k) {
    var tpl = T.en[k];
    return { key: k, tpl: tpl, literal: tpl.replace(/\{[^}]*\}/g, '').length, c: templateToRegex(tpl) };
  })
  .sort(function (a, b) { return b.literal - a.literal; });

/** Translate one row, or null when it is not an English row this script knows. */
function translateRow(text, locale) {
  var table = T[locale];
  if (!table) return null;
  for (var i = 0; i < COMPILED.length; i++) {
    var m = COMPILED[i].c.re.exec(text);
    if (!m) continue;
    var target = table[COMPILED[i].key];
    if (!target) return null;            // no authored template: leave the row alone
    var vals = {};
    COMPILED[i].c.order.forEach(function (name, k) { vals[name] = m[k + 1]; });

    /* Almost every captured value is already in the deck's language, because it came from the
     * deck's own data. `{pieceShape}` is the exception: it is a fixed English token from the
     * generator ("square", "circle" — measured, only those two occur), so it is mapped through
     * the shape table or the row is left alone rather than shipping one English word inside an
     * otherwise translated sentence. */
    var leak = null;
    ['pieceShape', 'shape'].forEach(function (slot) {
      if (!vals[slot]) return;
      var w = T.shapeWord(vals[slot], locale);
      if (!w) { leak = vals[slot]; return; }
      vals[slot] = w;
    });
    // An unmapped shape word would ship one English noun inside a translated sentence, so the
    // row is left in English instead — visibly wrong beats subtly wrong, and it shows up in
    // the "already localised" count rather than passing silently.
    if (leak) return null;

    /* math-worksheet is the one row whose VALUE is itself English: `{equations}` arrives as
     * "Moose plus Rabbit minus Bat equals 5, Rabbit plus 15 equals 21" — the picture names are
     * localised but the operator words are not. They are translated with the words derived
     * from this locale's own addition and subtraction rows, so a page cannot read "plus" on
     * one line and the locale's word on the next. */
    if (vals.equations) {
      var w = T.arithmeticWords(locale);
      if (!w) return null;
      vals.equations = vals.equations
        .replace(/ plus /g, w.plus)
        .replace(/ minus /g, w.minus)
        .replace(/ equals /g, w.equals);
    }
    return target.replace(/\{([^}]*)\}/g, function (whole, name) {
      return Object.prototype.hasOwnProperty.call(vals, name) ? vals[name] : whole;
    });
  }
  return null;
}

/* HTML entities have to survive the round trip: the row in the file is escaped, the template
 * is not. Decode before matching, re-encode after. */
function decode(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
function encode(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * Rewrite the sr block of one deck.html.
 * Returns { changed, html, rows } — `rows` is how many lines were translated.
 */
function rewriteSrBlock(html, locale) {
  var start = html.indexOf('<section class="lcs-sr" aria-label="');
  if (start === -1) return { changed: false, rows: 0 };
  var end = html.indexOf('</section>', start);
  if (end === -1) return { changed: false, rows: 0 };

  var seg = html.slice(start, end);
  var rows = 0;
  var next = seg.replace(/<li>([^<]*)<\/li>/g, function (whole, inner) {
    var translated = translateRow(decode(inner), locale);
    if (translated === null) return whole;
    rows++;
    return '<li>' + encode(translated) + '</li>';
  });

  // The list's own label, read as a heading.
  var label = T[locale] && T[locale].srWorksheetQuestions;
  if (label) {
    next = next.replace('<section class="lcs-sr" aria-label="' + encode(T.en.srWorksheetQuestions) + '"',
      '<section class="lcs-sr" aria-label="' + encode(label) + '"');
  }

  if (!rows && next === seg) return { changed: false, rows: 0 };
  return { changed: true, html: html.slice(0, start) + next + html.slice(end), rows: rows };
}

function atomicWrite(p, content) {
  var tmp = p + '.tmp';
  fs.writeFileSync(tmp, content, 'utf8');
  fs.renameSync(tmp, p);
}

function processLocale(locale, opts) {
  var dir = path.join(DECKS_ROOT, locale);
  var entries;
  try { entries = fs.readdirSync(dir); } catch (e) { return { error: e.message }; }

  var stat = { decks: 0, changed: 0, rows: 0, untouched: 0, failed: 0 };
  entries.forEach(function (name) {
    var link = path.join(dir, name);
    var st;
    try { st = fs.lstatSync(link); } catch (e) { return; }
    if (!st.isSymbolicLink()) return;              // only the live version of each deck
    var target = fs.readlinkSync(link);
    var deckDir = path.isAbsolute(target) ? target : path.join(dir, target);
    var p = path.join(deckDir, 'deck.html');
    if (!fs.existsSync(p)) return;
    stat.decks++;

    var html;
    try { html = fs.readFileSync(p, 'utf8'); } catch (e) { stat.failed++; return; }
    var r = rewriteSrBlock(html, locale);
    if (!r.changed) { stat.untouched++; return; }
    stat.changed++;
    stat.rows += r.rows;
    if (opts.dryRun) return;
    var bak = p + '.bak.sr-rows';
    if (!fs.existsSync(bak)) fs.copyFileSync(p, bak);
    atomicWrite(p, r.html);
  });
  return stat;
}

function main() {
  var argv = process.argv.slice(2);
  function arg(n, d) {
    var h = argv.find(function (a) { return a.indexOf('--' + n + '=') === 0; });
    return h ? h.split('=').slice(1).join('=') : d;
  }
  var dryRun = argv.indexOf('--confirm') === -1;
  var locales = arg('locales', 'nl,fr,es,it,pt,sv,da,no,fi').split(',').filter(Boolean);

  console.log((dryRun ? '[DRY RUN] ' : '') + 'sr-row translation');
  var total = 0, totalRows = 0;
  locales.forEach(function (L) {
    var s = processLocale(L, { dryRun: dryRun });
    if (s.error) { console.log('  ' + L + ': ' + s.error); return; }
    console.log('  ' + L + '  decks ' + s.decks + '   rewritten ' + s.changed
      + '   rows ' + s.rows + '   already localised ' + s.untouched
      + (s.failed ? '   unreadable ' + s.failed : ''));
    total += s.changed; totalRows += s.rows;
  });
  console.log('  ---  ' + total + ' pages, ' + totalRows + ' rows'
    + (dryRun ? ' (nothing written)' : ''));
}

if (require.main === module) main();
module.exports = { translateRow: translateRow, rewriteSrBlock: rewriteSrBlock, templateToRegex: templateToRegex };
