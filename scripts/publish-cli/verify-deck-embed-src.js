#!/usr/bin/env node
/**
 * verify-deck-embed-src.js — gate for the deck.html embed snippet's iframe src.
 *
 * ⚠ POISON-TEST THIS BEFORE TRUSTING IT (§21.7). `--poison` proves each
 * assertion FAILS on a synthetic violation, and that a correct deck passes.
 * If any poison survives it exits 2 rather than pretending to be a gate: a
 * gate that cannot fail is worth less than no gate, because it certifies.
 *
 * The cheapest and most honest poison is free and uses real data: run this on a
 * locale BEFORE the retrofit. It must report ~100% FAIL.
 *
 * Per deck.html carrying an embed affordance, asserts:
 *   1  src-literal   — the iframe src is a baked literal, not `'+url+'`
 *                      (a concatenation is what a canonical rewrite can move)
 *   2  src-value     — that literal is THIS file's own deck dir,
 *                      https://www.lessoncraftstudio.com/<locale>/<slug>/
 *   3  backlink      — the visible backlink still uses `'+url+'`, i.e. it still
 *                      follows the canonical (the landing) and was NOT dragged
 *                      along by the fix
 *   4  share-intact  — the SHARE affordance's `var url=` (followed by
 *                      `var title=`) is still present and untouched
 *
 * Checks 3 and 4 are what stop the fix from being too wide. Check 2 is why the
 * slug comes from the VERSIONED DIR: ~8,500 slugs are aliases sharing one file,
 * so the symlink name is not a safe source.
 *
 * Usage:
 *   node scripts/publish-cli/verify-deck-embed-src.js --poison
 *   node scripts/publish-cli/verify-deck-embed-src.js --locales=no
 *   node scripts/publish-cli/verify-deck-embed-src.js --locales=no --sample=50
 *
 * Exit 0 clean · 1 real failures found · 2 a poison survived.
 */
'use strict';

var fs = require('fs');
var path = require('path');
var waveScope = require('./wave-scope');
var retrofit = require('./rewrite-deck-html-embed-src');

var DEFAULT_DECKS_ROOT = '/var/www/lcs-media/decks';
var ALL_LOCALES = ['no', 'da', 'fi', 'sv', 'nl', 'it', 'pt', 'es', 'fr', 'de', 'en'];

var CONCAT_SRC = 'src="\'+url+\'"';
var CONCAT_BACKLINK = '<a href="\'+url+\'"';
var EMBED_MARKER = 'lcs-embed-snippet';
var SHARE_ANCHOR = /var url="[^"]*";\s*\nvar title=/;
/* ⚠ ANCHORED ON THE IFRAME, deliberately. The first version matched any
   `src="https://…/decks/…"` in the document and cheerfully reported the deck's
   own THUMBNAIL image as the embed src — it was measuring the wrong element and
   passed only because, after the rewrite, the iframe happens to precede the
   thumbnail in the byte order. A check that reads the wrong node is worse than
   no check, because it certifies. Poisoned by `thumbnail precedes a wrong
   iframe src` below. */
var IFRAME_PUSH = "lines.push('  <iframe";
var IFRAME_SRC = /<iframe[^>]*?\ssrc="([^"]*)"/;
var EMBED_SRC_VAR = /var embedSrc="([^"]*)";/;

/**
 * There are TWO legitimate shapes, and a gate that only knew the first would
 * fail every deck published after the source fix:
 *
 *   (a) RETROFITTED older deck — the src is a baked literal:
 *         src="https://www.lessoncraftstudio.com/en/decks/<slug>/"
 *   (b) NEWLY GENERATED deck — the src concatenates its own variable, which
 *       publish-cli resolved to the deck dir:
 *         var embedSrc="https://…/decks/<slug>/";  …  src="'+embedSrc+'"
 *
 * Both put the playable deck in the iframe. What is NOT legitimate is
 * `src="'+url+'"`, because `url` is the canonical and follows a repoint.
 *
 * Returns { kind, value } — value is the EFFECTIVE url, or null if unresolvable.
 */
function resolveEmbedSrc(html) {
  var at = html.indexOf(IFRAME_PUSH);
  if (at === -1) return { kind: 'no-iframe', value: null };
  var m = html.slice(at, at + 600).match(IFRAME_SRC);
  if (!m) return { kind: 'unreadable', value: null };
  var raw = m[1];
  if (raw === "'+url+'") return { kind: 'canonical-concat', value: null };
  if (raw === "'+embedSrc+'") {
    var v = html.match(EMBED_SRC_VAR);
    return { kind: 'embedSrc-var', value: v ? v[1] : null };
  }
  if (raw.indexOf("'+") !== -1) return { kind: 'other-concat', value: raw };
  return { kind: 'literal', value: raw };
}

function parseArgs(argv) {
  var out = { decksRoot: DEFAULT_DECKS_ROOT, locales: ALL_LOCALES.slice(), sample: null, poison: false, slugs: waveScope.loadSlugSet(argv) };
  argv.slice(2).forEach(function (a) {
    if (a === '--poison') out.poison = true;
    else if (a.indexOf('--locales=') === 0) out.locales = a.slice(10).split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    else if (a.indexOf('--decks-root=') === 0) out.decksRoot = a.slice(13);
    else if (a.indexOf('--sample=') === 0) out.sample = parseInt(a.slice(9), 10);
    else if (a === '--help' || a === '-h') {
      console.log('Usage: node verify-deck-embed-src.js [--poison] [--locales=no,da] [--sample=N] [--decks-root=path]');
      process.exit(0);
    }
  });
  return out;
}

/**
 * Pure. Returns { applicable, defects[] } for one deck.html body.
 * `applicable:false` means the file has no embed affordance — reported
 * separately so "nothing to check" can never read as "checked and clean".
 */
function checkHtml(html, locale, slug) {
  if (html.indexOf(EMBED_MARKER) === -1) return { applicable: false, defects: [] };
  var defects = [];

  // 1+2 — the iframe must resolve to THIS deck's own playable directory,
  //        by either legitimate shape. Read it off the IFRAME statement, not
  //        off the first deck-ish URL in the file.
  var want = retrofit.deckDirUrl(locale, slug);
  var r = resolveEmbedSrc(html);
  if (r.kind === 'no-iframe') defects.push('EMBED_IFRAME_STATEMENT_MISSING');
  else if (r.kind === 'unreadable') defects.push('EMBED_SRC_UNREADABLE');
  else if (r.kind === 'canonical-concat') defects.push('EMBED_SRC_STILL_CONCATENATED');
  else if (r.value === null) defects.push('EMBED_SRC_VAR_UNRESOLVED');
  else if (r.value !== want) defects.push('EMBED_SRC_WRONG (' + r.value + ' != ' + want + ')');

  // 3 — the backlink must still follow the canonical.
  if (html.indexOf(CONCAT_BACKLINK) === -1) defects.push('EMBED_BACKLINK_LOST');

  // 4 — the share affordance must be untouched.
  if (!SHARE_ANCHOR.test(html)) defects.push('SHARE_AFFORDANCE_DAMAGED');

  return { applicable: true, defects: defects };
}

/* ---------------------------------------------------------------- poison --- */

/** A minimal but REAL-SHAPED deck: the exact emitted fragments, post-retrofit. */
function syntheticDeck(locale, slug) {
  var url = retrofit.deckDirUrl(locale, slug);
  return [
    '<!doctype html><html lang="' + locale + '"><head><title>t</title></head><body>',
    /* A deck-ish URL that appears BEFORE the iframe and is not the embed src.
       Real decks are full of these (thumbnails, deck-end suggestion tiles);
       an unanchored check reads this one and calls it the embed src. */
    '<img src="' + retrofit.deckDirUrl(locale, 'some-other-deck').slice(0, -1) + '/thumbnail.png" alt="">',
    '<script>(function(){',
    'var btn=document.getElementById("lcs-share");',
    'var overlay=document.getElementById("lcs-share-overlay");',
    'if(!btn||!overlay)return;',
    'var url="https://www.lessoncraftstudio.com/' + locale + '/worksheets/' + slug + '";',
    'var title="A Worksheet";',
    '})();</script>',
    '<script>(function(){',
    'var snippet=document.getElementById("lcs-embed-snippet");',
    'if(!btn||!overlay||!widthInput||!heightInput||!snippet)return;',
    'var url="https://www.lessoncraftstudio.com/' + locale + '/worksheets/' + slug + '";',
    'var homeURL="https://www.lessoncraftstudio.com";',
    'function buildSnippet(){',
    'var lines=[];',
    'lines.push(\'  <iframe id="\'+iframeId+\'" src="' + url + '" frameborder="0" style="display: block;"></iframe>\');',
    'lines.push(\'    \'+prefixText+\' <a href="\'+url+\'" style="color:#6b6357;">\'+brandText+\'</a>\');',
    'return lines.join("\\n");}',
    '})();</script>',
    '</body></html>',
  ].join('\n');
}

/** The shape a NEWLY generated deck has after the source fix + substitution. */
function syntheticNewDeck(locale, slug) {
  return syntheticDeck(locale, slug)
    .replace('var homeURL="https://www.lessoncraftstudio.com";',
      'var embedSrc="' + retrofit.deckDirUrl(locale, slug) + '";\nvar homeURL="https://www.lessoncraftstudio.com";')
    /* ⚠ Target the IFRAME. A generic `src="https…/decks/…"` matches the decoy
       <img> first, so this built an unchanged deck and the control silently
       tested nothing — the poison caught it. */
    .replace(/(<iframe[^>]*?\ssrc=")[^"]*"/, '$1\'+embedSrc+\'"');
}

function poison() {
  var LOC = 'en', SLUG = 'addition-animals';
  var good = syntheticDeck(LOC, SLUG);
  var survived = [];

  // CONTROL — a correct deck must be clean, in every locale.
  ALL_LOCALES.forEach(function (l) {
    var r = checkHtml(syntheticDeck(l, SLUG), l, SLUG);
    if (!r.applicable || r.defects.length) {
      survived.push('CONTROL(' + l + ') should be clean, got: ' + (r.applicable ? r.defects.join(',') : 'not-applicable'));
    }
  });

  /* CONTROL 2 — the OTHER legitimate shape. Without this the gate would reject
     every deck published after the source fix, which is the failure mode that
     turns a gate into an obstacle people switch off. */
  var newShape = syntheticNewDeck(LOC, SLUG);
  var nr = checkHtml(newShape, LOC, SLUG);
  if (newShape === good) survived.push('CONTROL2 mutation was a no-op — the new-deck shape was never tested');
  if (nr.defects.length) survived.push('CONTROL2 (newly generated shape) should be clean, got: ' + nr.defects.join(','));
  // …and it must still catch a WRONG embedSrc var.
  var badVar = newShape.replace(/var embedSrc="[^"]*";/, 'var embedSrc="https://www.lessoncraftstudio.com/en/decks/wrong-deck/";');
  var br = checkHtml(badVar, LOC, SLUG);
  if (!br.defects.some(function (d) { return d.indexOf('EMBED_SRC_WRONG') === 0; })) {
    survived.push('wrong embedSrc var not caught');
  }

  var cases = [
    ['iframe src still concatenated on url (the pre-retrofit state)', 'EMBED_SRC_STILL_CONCATENATED',
      function (h) { return h.replace(/(<iframe[^>]*?\ssrc=")[^"]*"/, '$1\'+url+\'"'); }],
    /* These two mutate the IFRAME's src specifically (the <img> above shares
       the shape, so a lazy `/src="https:[^"]*"/` would hit the decoy and the
       poison would silently test nothing). */
    ['iframe src points at another deck', 'EMBED_SRC_WRONG',
      function (h) { return h.replace(/(<iframe[^>]*?\ssrc=")[^"]*"/, '$1https://www.lessoncraftstudio.com/en/decks/some-other-deck/"'); }],
    ['iframe src points at the landing (the defect being fixed)', 'EMBED_SRC_WRONG',
      function (h) { return h.replace(/(<iframe[^>]*?\ssrc=")[^"]*"/, '$1https://www.lessoncraftstudio.com/en/worksheets/addition-animals"'); }],
    /* The decoy test: a wrong iframe src sitting BEHIND a correct-looking
       thumbnail URL. This is the bug the first version of check 2 had. */
    ['wrong iframe src hidden behind an earlier deck thumbnail URL', 'EMBED_SRC_WRONG',
      function (h) { return h.replace(/(<iframe[^>]*?\ssrc=")[^"]*"/, '$1https://www.lessoncraftstudio.com/en/decks/decoy-deck/"'); }],
    ['iframe statement missing entirely', 'EMBED_IFRAME_STATEMENT_MISSING',
      function (h) { return h.replace("lines.push('  <iframe", "lines.push('  <span"); }],
    ['backlink dragged onto the deck url (fix too wide)', 'EMBED_BACKLINK_LOST',
      function (h) { return h.replace('<a href="\'+url+\'"', '<a href="https://www.lessoncraftstudio.com/en/decks/addition-animals/"'); }],
    ['share affordance damaged', 'SHARE_AFFORDANCE_DAMAGED',
      function (h) { return h.replace('var title="A Worksheet";', 'var somethingElse=1;'); }],
  ];

  console.log('=== poison ===');
  cases.forEach(function (c) {
    var mutated = c[2](good);
    if (mutated === good) { survived.push('MUTATION NO-OP: "' + c[0] + '" changed nothing'); console.log('  !! no-op  ' + c[0]); return; }
    var r = checkHtml(mutated, LOC, SLUG);
    var fired = r.defects.some(function (d) { return d.indexOf(c[1]) === 0; });
    console.log('  ' + (fired ? 'kill ' : 'SURVIVED ') + c[0] + '  -> ' + (r.defects.join(', ') || '(clean)'));
    if (!fired) survived.push(c[0] + ' (wanted ' + c[1] + ')');
  });

  // A file with no embed affordance must report NOT-APPLICABLE, never "clean".
  var noEmbed = checkHtml('<html><body>nothing here</body></html>', LOC, SLUG);
  console.log('  ' + (noEmbed.applicable === false ? 'kill ' : 'SURVIVED ') + 'no-embed file is reported not-applicable');
  if (noEmbed.applicable !== false) survived.push('no-embed file was treated as applicable');

  console.log('');
  if (survived.length) {
    console.log('POISON FAILED — ' + survived.length + ' survived:');
    survived.forEach(function (s) { console.log('  - ' + s); });
    process.exit(2);
  }
  console.log('POISON PASSED — every assertion observed failing, control clean in all 11 locales.');
  process.exit(0);
}

/* ----------------------------------------------------------------- scan --- */

function listDeckDirs(decksRoot, locale, sampleN) {
  var d = path.join(decksRoot, locale);
  if (!fs.existsSync(d)) return [];
  var dirs = fs.readdirSync(d, { withFileTypes: true })
    .filter(function (e) { return e.isDirectory() && !e.name.startsWith('.'); })
    .map(function (e) { return path.join(d, e.name); });
  if (sampleN && sampleN > 0 && dirs.length > sampleN) dirs = dirs.slice(0, sampleN);
  return dirs;
}

function main() {
  var opts = parseArgs(process.argv);
  if (opts.poison) return poison();

  console.log('=== verify deck embed-src ===');
  console.log('decks-root: ' + opts.decksRoot);
  console.log('locales:    ' + opts.locales.join(', ') + '\n');

  var grand = { checked: 0, clean: 0, failed: 0, notApplicable: 0 };
  var byClass = {};
  var examples = [];

  opts.locales.forEach(function (locale) {
    var t = { checked: 0, clean: 0, failed: 0, na: 0 };
    listDeckDirs(opts.decksRoot, locale, opts.sample)
      .filter(function (d) { return waveScope.inSet(opts.slugs, path.basename(d)); })
      .forEach(function (deckDir) {
        var p = path.join(deckDir, 'deck.html');
        if (!fs.existsSync(p)) return;
        var html;
        try { html = fs.readFileSync(p, 'utf8'); } catch (e) { return; }
        var slug = waveScope.baseSlug(path.basename(deckDir));
        var r = checkHtml(html, locale, slug);
        if (!r.applicable) { t.na++; return; }
        t.checked++;
        if (r.defects.length === 0) { t.clean++; return; }
        t.failed++;
        r.defects.forEach(function (d) {
          var cls = d.split(' ')[0];
          byClass[cls] = (byClass[cls] || 0) + 1;
        });
        if (examples.length < 40) examples.push(locale + '/' + slug + ': ' + r.defects.join(', '));
      });
    grand.checked += t.checked; grand.clean += t.clean; grand.failed += t.failed; grand.notApplicable += t.na;
    var pct = t.checked ? Math.round((t.clean / t.checked) * 1000) / 10 : 0;
    console.log('[' + locale + '] checked ' + t.checked + ', clean ' + t.clean + ' (' + pct + '%), FAILED ' + t.failed + ', no-embed ' + t.na);
  });

  console.log('\n=== Summary ===');
  console.log('Checked (embed-bearing): ' + grand.checked);
  console.log('Clean:                   ' + grand.clean);
  console.log('FAILED:                  ' + grand.failed);
  console.log('No embed affordance:     ' + grand.notApplicable);
  if (grand.failed) {
    console.log('\nDefects by class:');
    Object.keys(byClass).sort().forEach(function (k) { console.log('  ' + k + ': ' + byClass[k]); });
    console.log('\nExamples (first 40):');
    examples.forEach(function (e) { console.log('  - ' + e); });
  }
  process.exit(grand.failed > 0 ? 1 : 0);
}

if (require.main === module) main();

module.exports = { checkHtml: checkHtml, resolveEmbedSrc: resolveEmbedSrc };
