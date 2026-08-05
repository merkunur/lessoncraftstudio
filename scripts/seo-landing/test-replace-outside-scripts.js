#!/usr/bin/env node
'use strict';
/**
 * Poison + control for replace-outside-scripts.js.
 *
 * The helper exists to stop canonical repoints reaching into inline scripts.
 * The tests that matter are therefore SYMMETRICAL: it must still rewrite every
 * surface a repoint is for (markup attributes AND JSON-LD), and it must leave
 * executable script bodies byte-identical. Testing only the second half would
 * pass on a helper that does nothing at all — and the first draft of this
 * helper DID over-reach, masking JSON-LD too, which would have quietly stopped
 * structured data from being repointed on every future wave.
 *
 * Also runs against a REAL production deck.html when one is passed as argv[2],
 * because synthetic fixtures cannot show what 240KB of real inline script does.
 *
 * Usage:
 *   node scripts/seo-landing/test-replace-outside-scripts.js
 *   node scripts/seo-landing/test-replace-outside-scripts.js <deck.html> <locale> <slug>
 *
 * Exit 0 all pass · 1 a case failed.
 */
var fs = require('fs');
var H = require('./replace-outside-scripts');

var FROM = 'https://www.lessoncraftstudio.com/en/decks/addition-animals/';
var TO = 'https://www.lessoncraftstudio.com/en/worksheets/addition-animals-kindergarten';

var fails = [];
function check(name, cond, detail) {
  console.log('  ' + (cond ? 'pass ' : 'FAIL ') + name + (detail ? '  ' + detail : ''));
  if (!cond) fails.push(name);
}
var count = function (s, sub) { return s.split(sub).length - 1; };

console.log('=== controls: it must still do its job ===');
{
  var doc = '<link rel="canonical" href="' + FROM + '">';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('rewrites a canonical in markup', r.html.indexOf(TO) !== -1 && r.n === 1, '(n=' + r.n + ')');
}
{
  var doc = "<meta property='og:url' content='" + FROM + "'>";
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('rewrites single-quoted markup', r.html.indexOf(TO) !== -1 && r.n === 1, '(n=' + r.n + ')');
}
{
  // JSON-LD is DATA. Repoints legitimately move `url` and `@id`, so the helper
  // must NOT protect it — this is the ban-too-wide case.
  var doc = '<script type="application/ld+json">{"url":"' + FROM + '","@id":"' + FROM + '"}</script>';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('REWRITES JSON-LD (data, not code)', r.n === 2 && r.skipped === 0, '(n=' + r.n + ' skipped=' + r.skipped + ')');
}
{
  var doc = "<script type='application/ld+json'>{\"url\":\"" + FROM + '"}</script>';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('REWRITES JSON-LD with single-quoted type', r.n === 1, '(n=' + r.n + ')');
}

console.log('=== the defect this exists to prevent ===');
{
  var doc = '<script>(function(){var url="' + FROM + '";var homeURL="x";})();</script>';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('does NOT rewrite var url= inside a bare <script>', r.html === doc && r.n === 0, '(n=' + r.n + ')');
  check('reports the skip rather than hiding it', r.skipped === 1, '(skipped=' + r.skipped + ')');
}
{
  var doc = '<script type="text/javascript">var url="' + FROM + '";</script>';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('protects type="text/javascript"', r.html === doc && r.skipped === 1);
}
{
  var doc = '<script type="module">var url="' + FROM + '";</script>';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('protects type="module"', r.html === doc && r.skipped === 1);
}
{
  // Mixed: exactly the deck.html shape — markup + JSON-LD outside, the trap inside.
  var doc = '<link rel="canonical" href="' + FROM + '">' +
            '<script type="application/ld+json">{"url":"' + FROM + '"}</script>' +
            '<script>var url="' + FROM + '";</script>' +
            '<meta property="og:url" content="' + FROM + '">';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('rewrites canonical + JSON-LD + og:url (3 hits)', r.n === 3, '(n=' + r.n + ')');
  check('executable script body untouched', r.html.indexOf('<script>var url="' + FROM + '";</script>') !== -1);
  check('exactly one needle spared', r.skipped === 1, '(skipped=' + r.skipped + ')');
}

console.log('=== asset paths must still be spared (the original guard) ===');
{
  var doc = '<img src="' + FROM + 'thumbnail.png"><link rel="canonical" href="' + FROM + '">';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, FROM, TO);
  check('thumbnail.png untouched', r.html.indexOf(FROM + 'thumbnail.png') !== -1);
  check('canonical still moved', r.html.indexOf('href="' + TO + '"') !== -1, '(n=' + r.n + ')');
}

console.log('=== round-trip must be byte-exact ===');
{
  var doc = '<html><script>a<b && c;</script>text<script defer src="x.js"></script>\n<script>\nmulti\nline\n</script></html>';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, 'NOTHING-MATCHES-THIS', 'X');
  check('no-op replacement returns the input byte-for-byte', r.html === doc,
    r.html === doc ? '' : '(len ' + r.html.length + ' vs ' + doc.length + ')');
}
{
  var doc = '<script>1</script><script>2</script><script>3</script>';
  var r = H.replaceQuoteTerminatedOutsideScripts(doc, 'NOPE', 'X');
  check('multiple script blocks restore in order', r.html === doc);
}

var real = process.argv[2];
if (real && fs.existsSync(real)) {
  var loc = process.argv[3], slug = process.argv[4];
  console.log('=== REAL production deck.html: ' + loc + '/' + slug + ' ===');
  var html = fs.readFileSync(real, 'utf8');
  var from = 'https://www.lessoncraftstudio.com/' + loc + '/decks/' + slug + '/';
  var to = 'https://www.lessoncraftstudio.com/' + loc + '/worksheets/' + slug + '-test';

  // Non-vacuity: if this deck was already repointed there is nothing to move,
  // and every count below would be a meaningless zero.
  var needlesTotal = count(html, from + '"') + count(html, from + "'");
  console.log('  needles present in file      : ' + needlesTotal);
  check('file actually contains the needle (else this case proves nothing)', needlesTotal > 0);

  var r = H.replaceQuoteTerminatedOutsideScripts(html, from, to);
  console.log('  replacements outside scripts : ' + r.n);
  console.log('  needles SPARED inside scripts: ' + r.skipped);
  check('it moved something', r.n > 0, '(n=' + r.n + ')');
  check('it spared something', r.skipped > 0, '(skipped=' + r.skipped + ')');
  check('n + skipped accounts for every needle', r.n + r.skipped === needlesTotal,
    '(' + r.n + '+' + r.skipped + ' vs ' + needlesTotal + ')');

  /* EXECUTABLE scripts only. JSON-LD is DATA and is SUPPOSED to change here —
     the first version of this assertion compared every <script> block and so
     failed on a perfectly correct helper. The measurement was wrong, not the
     code under test. */
  var execScriptsOf = function (s) {
    var out = [];
    String(s).replace(H.SCRIPT_BLOCK, function (m, attrs) { if (H.isExecutableScript(attrs)) out.push(m); return m; });
    return out.join(' ');
  };
  check('every EXECUTABLE inline script byte-identical', execScriptsOf(html) === execScriptsOf(r.html));
  // ...and prove that check is not vacuous: there must BE executable scripts.
  check('executable scripts exist to compare', execScriptsOf(html).length > 1000,
    '(' + execScriptsOf(html).length + ' bytes)');
  check('the embed iframe concat survives', r.html.indexOf('src="\'+url+\'"') !== -1);

  var noop = H.replaceQuoteTerminatedOutsideScripts(html, 'NOTHING-MATCHES-THIS', 'X');
  check('no-op over the real file is byte-exact', noop.html === html,
    noop.html === html ? '' : '(len ' + noop.html.length + ' vs ' + html.length + ')');
} else {
  console.log('(no real deck.html passed — synthetic cases only)');
}

console.log('');
if (fails.length) { console.log('FAILED: ' + fails.join(', ')); process.exit(1); }
console.log('ALL CASES PASSED');
