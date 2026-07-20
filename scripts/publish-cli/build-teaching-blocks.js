#!/usr/bin/env node
/**
 * Render the per-deck teaching block: facts (derive-teaching-facts.js) + the native-authored
 * sentence system (teaching-copy/<locale>.js) -> one HTML section per deck.
 *
 * WHY THE FACTS MUST VARY, not just the numbers
 * These deck pages are ~130 words each and differ mostly by a slug — a near-duplicate
 * cluster at catalogue scale. The German SEO review was blunt about it: a paragraph that is
 * 95% identical across thousands of decks with one number swapped does not solve that, it
 * industrialises it. So the block varies on the operation mix, the measured range, the
 * ten-relationship, which real operations are quoted, and which classroom use genuinely
 * fits — and gate.js is run over the result to PROVE it rather than assume it.
 *
 * WHAT IT WILL NOT DO — state this plainly to anyone who asks:
 *   - It will not lift CTR on queries these pages already rank for. That is a title and
 *     rich-result problem, and titles are frozen under the churn freeze.
 *   - It does nothing for the PDFs, which are two of the four best-performing German pages.
 *   - Its realistic upside is new long-tail impressions over 8-12 weeks, plus making
 *     near-duplicate pages distinguishable. Measure with a holdout or you are guessing.
 *
 * Output is DATA ONLY (a JSON map slug -> {html, text, shapes}); nothing is written to any
 * deck. inject-deck-teaching-block.js does the writing, so generation stays re-runnable and
 * reviewable.
 *
 * Usage:
 *   node build-teaching-blocks.js --facts=<facts.json> --locale=de [--out=blocks.json] [--limit=N]
 */
'use strict';

var fs = require('fs');
var path = require('path');

/**
 * A theme display name fit to print.
 *
 * Two defects showed up in live copy: `birds_2` renders as "Vögel 2" / "birds 2" — the `_2`
 * is a duplicate-marker on the image set, not part of the theme — and lowercasing for an
 * English mid-sentence slot turned "4th of July" into "4th of july". Strip the marker, and
 * never case-fold a name that carries capitals beyond its first letter, because those are
 * proper nouns.
 */
function cleanThemeName(name) {
  return String(name).replace(/\s+\d+$/, '').trim();
}

/** True when a display name carries an internal capital — a proper noun, do not case-fold. */
function isProperNoun(name) {
  return /\s\p{Lu}|^\d/u.test(String(name));
}

/** Theme keys are snake_case English; deck pages need the locale display name. */
function loadThemeNames(locale) {
  var candidates = [
    path.join(__dirname, '..', '..', 'frontend', 'config', 'topics-taxonomy.json'),
    '/opt/lessoncraftstudio/frontend/config/topics-taxonomy.json',
  ];
  for (var i = 0; i < candidates.length; i++) {
    try {
      if (!fs.existsSync(candidates[i])) continue;
      var tax = JSON.parse(fs.readFileSync(candidates[i], 'utf8'));
      var themes = (tax.axes && tax.axes.theme) || {};
      var out = {};
      Object.keys(themes).forEach(function (key) {
        var n = themes[key].name;
        if (n && n[locale]) out[key] = cleanThemeName(n[locale]);
      });
      return out;
    } catch (e) { /* try next */ }
  }
  return {};
}

/**
 * Escape for HTML text nodes. Note the copy system is authored WITHOUT quotation marks
 * (they break the SWC build in single-quoted strings), so this is belt-and-braces.
 */
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/**
 * The rendered section.
 *
 * Structure follows both specialists, who wanted different things and both were right:
 *  - the TEACHER wants a scannable spec line (Zahlenraum first — it is the filter they
 *    apply before anything else), so there is a chip row;
 *  - the SEO wanted the first PROSE sentence to stand alone and front-load the same facts,
 *    because a middot list reads as scraped metadata and Google is less likely to lift it
 *    as a snippet. So the prose repeats the facts as a real sentence rather than relying
 *    on the chips.
 *
 * The marker comments make the block exactly removable — same contract as
 * SEO_INSERTION_POINT_* (§17.8.16). `lcs-teaching` is hidden inside embeds by the style
 * rule carried with the block, so an embedded worksheet stays a worksheet.
 */
function renderHtml(copy, facts) {
  var chips = [];
  // Range first: the fact a teacher applies before any other filter. `chipLevel` is
  // locale-optional — English leads with ages because US Grade 1 equals UK Year 2, while
  // German bans age-in-years outright. The renderer stays agnostic; the copy system decides.
  chips.push(copy.chipRange);
  chips.push(copy.chipMode);
  if (copy.chipTen) chips.push(copy.chipTen);
  if (copy.chipLevel) chips.push(copy.chipLevel);

  var lines = [];
  lines.push('<!-- TEACHING_BLOCK_START -->');
  lines.push('<style id="lcs-teaching-style">body.lcs-embedded .lcs-teaching{display:none!important}'
    + '.lcs-teaching{max-width:52rem;margin:1.5rem auto 0;padding:0 1rem 1.5rem;'
    + 'font-family:inherit;color:#2f3a37;line-height:1.55}'
    + '.lcs-teaching h2{font-size:1.05rem;margin:1.25rem 0 .35rem;color:#146B5E}'
    + '.lcs-teaching p{margin:0 0 .5rem;font-size:.95rem}'
    + '.lcs-teaching-tasks{font-variant-numeric:tabular-nums;color:#4a5754}'
    + '.lcs-teaching-chips{display:flex;flex-wrap:wrap;gap:.4rem;margin:0 0 .9rem;padding:0;list-style:none}'
    + '.lcs-teaching-chips li{font-size:.8rem;background:#EEF5F3;color:#146B5E;'
    + 'border-radius:999px;padding:.2rem .6rem;white-space:nowrap}'
    + '@media print{.lcs-teaching{display:none}}</style>');
  lines.push('<section class="lcs-teaching">');
  lines.push('  <ul class="lcs-teaching-chips">');
  chips.forEach(function (c) { lines.push('    <li>' + esc(c) + '</li>'); });
  lines.push('  </ul>');
  lines.push('  <h2>' + esc(copy.heading1) + '</h2>');
  lines.push('  <p>' + esc(copy.block1) + '</p>');
  // The deck's own nine operations, visible. Both the teacher's fastest check and the
  // page's structural fingerprint (see teaching-copy/de.js taskList).
  if (copy.taskList) lines.push('  <p class="lcs-teaching-tasks">' + esc(copy.taskList) + '</p>');
  if (copy.heading2 && copy.block2) {
    lines.push('  <h2>' + esc(copy.heading2) + '</h2>');
    lines.push('  <p>' + esc(copy.block2) + '</p>');
  }
  lines.push('  <h2>' + esc(copy.heading3) + '</h2>');
  lines.push('  <p>' + esc(copy.block3) + '</p>');
  if (copy.blockExtras) lines.push('  <p>' + esc(copy.blockExtras) + '</p>');
  lines.push('</section>');
  lines.push('<!-- TEACHING_BLOCK_END -->');
  return lines.join('\n');
}

function plainText(copy) {
  return [copy.block1, copy.taskList || '', copy.block2, copy.block3, copy.blockExtras || '']
    .join(' ').trim();
}

function main() {
  var args = process.argv.slice(2);
  function arg(name, dflt) {
    var hit = args.find(function (a) { return a.indexOf('--' + name + '=') === 0; });
    return hit ? hit.split('=').slice(1).join('=') : dflt;
  }
  var locale = arg('locale', 'de');
  var factsPath = arg('facts', '/tmp/teaching-facts-de-math-puzzle.json');
  var outPath = arg('out', '/tmp/teaching-blocks-' + locale + '.json');
  var limit = parseInt(arg('limit', '0'), 10);

  // Route by FAMILY, not just locale. math-puzzle has a per-locale module because its copy
  // needs per-locale rules (band vs true maximum, ten-crossing phrasing). Picture-arithmetic
  // has no such rules — every deck is within 10 with no crossing — so all locales share one
  // module with a per-locale string table.
  var family = arg('family', 'math-puzzle');
  var copySystem;
  if (family === 'picture-arith') {
    var pa = require('./teaching-copy/picture-arith.js');
    if (pa.locales.indexOf(locale) === -1) {
      console.error('no authored picture-arithmetic copy for ' + locale + ' yet (§21.3)');
      process.exit(2);
    }
    copySystem = { build: function (f, ord) { return pa.build(f, ord, locale); } };
  } else {
    try {
      copySystem = require('./teaching-copy/' + locale + '.js');
    } catch (e) {
      console.error('no authored copy system for locale ' + locale + ' — a native ensemble must author it first (§21.3)');
      process.exit(2);
    }
  }

  var facts = JSON.parse(fs.readFileSync(factsPath, 'utf8'));
  var themeNames = loadThemeNames(locale);

  // Ordinal WITHIN the (mode, tenCase) group drives shape rotation, so that shapes scatter
  // across themes instead of tracking the alphabetical theme order the decks arrive in.
  var groupCount = {};
  var out = {};
  var shapeUse = {};
  var missingTheme = 0;

  for (var i = 0; i < facts.length; i++) {
    var f = facts[i];
    if (limit && Object.keys(out).length >= limit) break;
    var group = f.mode + '|' + f.tenCase;
    groupCount[group] = (groupCount[group] || 0) + 1;
    var ordinal = groupCount[group] - 1;

    f.themeName = themeNames[f.theme] || null;
    if (!f.themeName) { missingTheme++; f.themeName = null; }

    var copy = copySystem.build(f, ordinal);
    if (!copy) continue;   // an unauthored mode yields NO block, never a vague one
    var key = copy.shapes.block1 + '/' + copy.shapes.block2 + '/' + copy.shapes.block3;
    shapeUse[key] = (shapeUse[key] || 0) + 1;

    out[f.slug] = {
      html: renderHtml(copy, f),
      text: plainText(copy),
      shapes: copy.shapes,
      namedObjects: copy.namedObjects || [],
      // carried for the verifier: every claim must trace back to these
      facts: {
        mode: f.mode, maxSeen: f.band.maxSeen, tenCase: f.tenCase,
        crossesTen: f.regrouping.crossesTen, makesTen: f.regrouping.makesTen,
        examples: f.examples, tenExample: f.tenExample, theme: f.theme, themeName: f.themeName,
      },
    };
  }

  fs.writeFileSync(outPath, JSON.stringify(out, null, 1));

  var words = Object.values(out).map(function (b) { return b.text.split(/\s+/).length; });
  var avg = Math.round(words.reduce(function (a, b) { return a + b; }, 0) / words.length);
  console.log(locale + ': built ' + Object.keys(out).length + ' teaching blocks');
  console.log('  words per block: min ' + Math.min.apply(null, words)
    + ' / avg ' + avg + ' / max ' + Math.max.apply(null, words));
  console.log('  distinct shape combinations: ' + Object.keys(shapeUse).length);
  var top = Object.entries(shapeUse).sort(function (a, b) { return b[1] - a[1]; }).slice(0, 5);
  top.forEach(function (t) { console.log('     ' + t[0] + '  x' + t[1]); });
  if (missingTheme) console.log('  theme display name missing for ' + missingTheme + ' decks (theme omitted from copy)');
  console.log('  -> ' + outPath);
}

if (require.main === module) main();
module.exports = { renderHtml: renderHtml, cleanThemeName: cleanThemeName, isProperNoun: isProperNoun };
