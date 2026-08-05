'use strict';
/**
 * replace-outside-scripts.js — quote-terminated URL replacement that CANNOT
 * reach inside an executable <script> block.
 *
 * WHY THIS EXISTS. The canonical-repoint scripts rewrote deck.html with a raw
 * whole-file `html.split(needle).join(repl)`, needle = `<deckURL>` + a quote.
 * That is correct for the things they mean to move — <link rel=canonical>,
 * og:url, twitter:url, and the JSON-LD url/@id — and the quote-termination
 * guard correctly spares asset paths like `…/decks/<slug>/thumbnail.png`,
 * because those continue past the slash and never present a closing quote.
 *
 * But deck.html also carries INLINE SCRIPTS, and catalog-export.js emits
 *
 *     var url="https://www.lessoncraftstudio.com/<loc>/decks/<slug>/";
 *
 * which is a VERBATIM match for the needle. So every canonical repoint silently
 * dragged the embed affordance's iframe src onto the landing page — a page that
 * posts no resize message and renders the full site chrome — breaking embedding
 * across ~32,000 decks without touching anything anyone was looking at. The
 * repoint scripts were doing exactly what they said; they were simply operating
 * on a wider surface than their own docblock claimed.
 *
 * A page URL belongs in markup and in structured data. Rewriting executable
 * code is never the repoint's job, so this helper refuses to — structurally,
 * rather than by asking each caller to remember.
 *
 * ⚠ EXECUTABLE scripts only. The first draft of this guard masked EVERY
 * <script>, which would have quietly stopped JSON-LD url/@id from being
 * repointed — trading a visible bug for an invisible one. A <script> carrying
 * DATA (ld+json, importmap, text/template) is part of the page's markup
 * surface; a <script> carrying CODE is not.
 *
 * ⚠ NO SENTINEL SUBSTITUTION. An earlier version masked scripts by swapping in
 * a placeholder token and swapping back. It worked, but a stray NUL in the
 * placeholder turned this file into a binary blob as far as git was concerned —
 * unreviewable, and invisible until `git diff` reported "Bin". Segmenting the
 * document and rejoining has no placeholder to get wrong and no round-trip to
 * verify.
 */

// Non-greedy, case-insensitive, spans newlines; tolerates attributes on the tag.
var SCRIPT_BLOCK = /<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi;
var JS_TYPE = /^(?:|text\/javascript|application\/javascript|text\/ecmascript|application\/ecmascript|module)$/i;

/** `type` absent, empty, or a JavaScript MIME → executable code → protected. */
function isExecutableScript(attrs) {
  var m = String(attrs || '').match(/\stype\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
  if (!m) return true; // no type attribute → classic JavaScript
  var t = (m[1] !== undefined ? m[1] : m[2] !== undefined ? m[2] : m[3]) || '';
  return JS_TYPE.test(t.trim());
}

/**
 * Split `html` into alternating segments, tagging each as protected or not.
 * Protected segments are executable <script> blocks, carried through verbatim.
 */
function segment(html) {
  var segs = [];
  var last = 0;
  var re = new RegExp(SCRIPT_BLOCK.source, 'gi');
  var m;
  while ((m = re.exec(html)) !== null) {
    if (m.index > last) segs.push({ isProtected: false, text: html.slice(last, m.index) });
    segs.push({ isProtected: isExecutableScript(m[1]), text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < html.length) segs.push({ isProtected: false, text: html.slice(last) });
  return segs;
}

/**
 * @param {string} html   full document
 * @param {string} from   URL WITHOUT the terminating quote
 * @param {string} to     replacement URL WITHOUT the terminating quote
 * @returns {{html:string, n:number, skipped:number}}
 *   n       — replacements made outside executable script
 *   skipped — needles deliberately left alone inside executable script.
 *             Surface it: a non-zero value is the whole point of this module,
 *             and it is exactly the number that used to be silent damage.
 */
function replaceQuoteTerminatedOutsideScripts(html, from, to) {
  var n = 0;
  var skipped = 0;
  var out = segment(html).map(function (seg) {
    if (seg.isProtected) {
      skipped += seg.text.split(from + '"').length - 1;
      skipped += seg.text.split(from + "'").length - 1;
      return seg.text;
    }
    var t = seg.text;
    ['"', "'"].forEach(function (q) {
      var parts = t.split(from + q);
      n += parts.length - 1;
      t = parts.join(to + q);
    });
    return t;
  }).join('');
  return { html: out, n: n, skipped: skipped };
}

module.exports = {
  replaceQuoteTerminatedOutsideScripts: replaceQuoteTerminatedOutsideScripts,
  isExecutableScript: isExecutableScript,
  SCRIPT_BLOCK: SCRIPT_BLOCK,
};
