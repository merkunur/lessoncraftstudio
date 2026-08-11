/* =====================================================================
   ONE-SHOT — `ariaTags*`  ->  `sayTags*`   (tool #57, THE SHAPE STRETCHER)
   ---------------------------------------------------------------------
   ⚠⚠ THE `aria*` PREFIX WAS INVERTED, AND IT COST TEN NATIVE PANELS THE
   REGISTER. `_paint` assigns these four strings to `this._say.textContent`
   — the `<p class="shp-say">` under the pane. They are the tool's ONLY
   VISIBLE CAPTION, the sentence a class reads off a projector. The string
   that is genuinely for assistive tech is the pane's `aria-label`, which
   sits on a `role="group"` and is therefore never announced when it
   changes. Every panel read `ariaTagsBoth` and wrote screen-reader prose
   for a projector line.

   `ariaShape3` / `ariaShape4` / `ariaKept` are NOT renamed — those really
   are the pane's label text, so their prefix is accurate.

   ⚠ THE RENAME TRAVELS BY REFERENCE, IN ONE PASS, ACROSS EVERY FILE THAT
   NAMES THE KEY — the tool, the ten panel files, and the four gates that
   name it in a call site, a mutation needle or a poison key. Renaming the
   tool alone would have left `_shp-behaviour` calling `t('ariaTagsBoth')`
   (which returns the KEY, silently) and `mutate`'s needle matching zero
   times, which that harness counts as a FAULT rather than a pass.

   IDEMPOTENT: a second run finds no occurrence of `ariaTags` anywhere and
   reports every file as already renamed.

   RUN: node scripts/_shp-rename-saytags.js
   ===================================================================== */
'use strict';

var fs = require('fs');
var path = require('path');

var ROOT = path.resolve(__dirname, '..');

var FILES = [
  path.join(ROOT, 'mini tools', 'shape-stretcher.js'),
  path.join(ROOT, 'scripts', '_shp-behaviour.js'),
  path.join(ROOT, 'scripts', '_shp-fix-aria.js'),
  path.join(ROOT, 'scripts', 'mutate-shape-stretcher.js'),
  path.join(ROOT, 'scripts', 'verify-shape-stretcher.js'),
  path.join(ROOT, 'scripts', 'smoke-shape-stretcher-locales.js')
].concat(['de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'].map(function (l) {
  return path.join(ROOT, 'scripts', '_shape-stretcher-locale-' + l + '.js');
}));

/* ⚠ THE TOKEN IS `ariaTags`, NOT `aria`. A wider pattern would have taken
   `ariaShape3/4` and `ariaKept` with it — three keys whose prefix is
   correct, and whose rename nothing asked for. Poison-tested below in
   both directions: it must FIRE on `ariaTagsBoth` and must NOT fire on
   `ariaKept` / `ariaShape4` / `aria-label` / `setAttribute('aria-live')`. */
var FROM = /ariaTags/g;
var TO = 'sayTags';

function poison() {
  var mustFire = ['ariaTagsBoth', "t('ariaTagsNone')", '      ariaTagsEqual: {', 'ariaTagsNope'];
  var mustPass = ['ariaKept', 'ariaShape4', 'aria-label', "setAttribute('aria-live', 'polite')",
    'ariatags', 'AriaTags'];
  var bad = [];
  mustFire.forEach(function (s) { if (!/ariaTags/.test(s)) bad.push('MUST-FIRE did not match: ' + s); });
  mustPass.forEach(function (s) { if (/ariaTags/.test(s)) bad.push('MUST-PASS was matched: ' + s); });
  if (bad.length) {
    console.log('POISON BROKEN — the rename pattern is wrong:');
    bad.forEach(function (b) { console.log('  ' + b); });
    process.exit(1);
  }
  console.log('poison: pattern fires on ' + mustFire.length + ' must-fire strings and spares ' +
    mustPass.length + ' must-pass strings (ariaKept / ariaShape* / aria-label untouched)');
}

function main() {
  poison();

  var wrote = 0, already = 0, missing = 0;
  FILES.forEach(function (f) {
    if (!fs.existsSync(f)) { missing++; console.log('  MISSING  ' + path.relative(ROOT, f)); return; }
    /* ⚠ binary read + explicit utf8, and the file is written back with the
       same newline bytes it arrived with — a `\r\n` normalisation here is
       exactly what blinded seven multi-line mutation needles on #43. */
    var src = fs.readFileSync(f, 'utf8');
    var n = (src.match(FROM) || []).length;
    if (n === 0) { already++; console.log('  already  ' + path.relative(ROOT, f)); return; }
    fs.writeFileSync(f, src.replace(FROM, TO), 'utf8');
    wrote++;
    console.log('  renamed  ' + path.relative(ROOT, f) + '  (' + n + ' occurrence' + (n === 1 ? '' : 's') + ')');
  });

  /* ⚠ VERIFY THE WRITE LANDED — re-read from disk, do not trust the call. */
  var left = 0;
  FILES.forEach(function (f) {
    if (!fs.existsSync(f)) return;
    left += (fs.readFileSync(f, 'utf8').match(FROM) || []).length;
  });
  if (left !== 0) { console.log('\nFAIL — ' + left + ' occurrence(s) of ariaTags survive on disk'); process.exit(1); }

  /* ⚠ AND THAT THE FOUR KEYS ARE ACTUALLY THERE UNDER THE NEW NAME —
     a rename that deleted them would also leave zero `ariaTags`. */
  var tool = fs.readFileSync(FILES[0], 'utf8');
  var want = ['sayTagsBoth', 'sayTagsEqual', 'sayTagsRight', 'sayTagsNone'];
  var absent = want.filter(function (k) { return tool.indexOf('      ' + k + ': {') === -1; });
  if (absent.length) { console.log('\nFAIL — declaration missing after rename: ' + absent.join(', ')); process.exit(1); }
  console.log('\n' + wrote + ' file(s) renamed, ' + already + ' already renamed, ' + missing + ' missing.');
  console.log('all four declarations present as sayTags*; 0 occurrences of ariaTags remain.');
}

main();
