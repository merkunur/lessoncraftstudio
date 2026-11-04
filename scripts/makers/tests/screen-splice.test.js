#!/usr/bin/env node
/**
 * Test: a screen document carries its runtime and texts VERBATIM (scripts/makers/screen.js screenDocument /
 * declaredDocument). The browser bundle's runtime is MINIFIED — a variable named `$` gives "$&&" — and a String.replace
 * with a replacement STRING reads "$&", "$'", "$`" and "$$" as patterns: on 2026-11-04 every marks screen built in the
 * browser (the student play page, the maker's screen preview) had "</body>" pasted into its script and never ran, while
 * every Node-built screen (unminified, no "$&") passed its gates. Here the runtime, its css, its stage and the
 * instruction each carry all four patterns and must arrive unchanged.
 * Poisoned: the same splice done with a replacement STRING must corrupt the script (the test is not vacuous).
 *
 *   node scripts/makers/tests/screen-splice.test.js
 */
'use strict';
const core = require('../../worksheet-gen/emit/interactive-runtime-core.js');
const screen = require('../screen.js');

const PAT = "$&&$'$`$$";
const SCRIPT = '<script>var $=1;$&&$;var q="' + "$'$`$$" + '";</script>';
const fake = { css: '.x{content:"' + PAT + '"}', stageOpen: '<div class="lcs-stage" id="lcs-stage" data-p="' + PAT + '">', stageClose: '<div id="lcs-overlay"></div></div>', controls: '<a href="__PDF_URL__">' + PAT + '</a>', script: SCRIPT };
const html = '<!doctype html><html><head><title>t</title></head><body>\n<div class="ws-page" data-lcs-page><p>page</p></div>\n</body></html>';
let fails = 0;
const check = (name, ok) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name); };

const real = core.buildInteractive;
core.buildInteractive = () => fake;
let a, b;
try {
  a = screen.screenDocument({ html, locale: 'en', strings: {}, instruction: 'Tap ' + PAT, plan: { ctx: {}, parts: [] } });
  b = screen.declaredDocument({ html, rt: fake, crop: 600, width: 703 });
} finally { core.buildInteractive = real; }
for (const [name, out] of [['screenDocument (marks)', a], ['declaredDocument', b]]) {
  check(`${name}: the runtime script arrives verbatim`, out.includes(SCRIPT));
  check(`${name}: the runtime css arrives verbatim`, out.includes(fake.css));
  check(`${name}: the stage markup arrives verbatim`, out.includes('data-p="' + PAT + '"'));
  check(`${name}: one </body>, at the end`, out.split('</body>').length === 2 && /<\/body>\s*<\/html>\s*$/.test(out));
}
check('screenDocument: the instruction arrives verbatim (escaped)', a.includes('Tap ' + PAT.replace(/&/g, '&amp;')));
// poison: the splice with a replacement STRING corrupts the same script
const poisoned = html.replace('\n</body>', '\n' + SCRIPT + '\n</body>');
check('poison: a replacement string pastes "</body>" into the script', !poisoned.includes(SCRIPT) && poisoned.includes('$=1;\n</body>&'));
console.log(fails ? `screen splice: ${fails} failing` : 'screen splice: runtime, css, stage and instruction arrive verbatim; poison fires');
if (fails) process.exitCode = 1;
