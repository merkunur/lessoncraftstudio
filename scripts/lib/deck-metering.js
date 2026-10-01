/**
 * deck-metering.js — the free-tier policy applied to a static deck.html (2026-10-01).
 *
 * Operator report 2026-10-01: the worksheet-gen decks (every Level Set copy and the printable families) let anybody
 * download the PDF and play the screen version without signing in, unlimited. Measured on en: 4,638 Level Set decks
 * + 519 published printable decks carried NO play meter, and 5,807 deck pages linked their PDF / answer key
 * STRAIGHT to the nginx file — bypassing /api/quota/dl, the metered proxy every other surface (landings, hub
 * cards, topic pages, the deck action strip) uses. The policy (frontend/lib/quota.ts): downloads 3 per month with a
 * free account (anonymous → sign-up), interactive plays 10 per day; subscribers and crawlers bypass.
 *
 * meterDeckHtml(html, locale, slug) → { html, changed, links, relabel, meter } — idempotent:
 *   1. every <a href> to THIS deck's own *-printable.pdf / *-answer-key.pdf → the metered proxy
 *      (/api/quota/dl?loc=&slug=&kind=pdf|answer), the same href deck-actions.js and the landings emit;
 *   2. the worksheet-gen download buttons drop "free" from their visible label (the free tier is limited — standing
 *      rule 2026-09-14: "free" only in metadata, never on what the user sees): they take the action strip's
 *      native-reviewed labels (messages deckActions.downloadPdf / .answerKey);
 *   3. an INTERACTIVE deck (it carries window.DECK_BUNDLE — the play runtime) gets lcs-meter.js, the play wall that
 *      inject-meter.js gives every app deck. Printable-only pages are not plays and get no play meter.
 * Metadata (<head> JSON-LD, og:*, canonical) is never touched.
 */
'use strict';
const deckActions = require('./deck-actions.js');

const CANONICAL_BASE = 'https://www.lessoncraftstudio.com';
const METER_MARKER = 'id="lcs-meter-js"';
const METER_SCRIPT = '<script id="lcs-meter-js" defer src="https://www.lessoncraftstudio.com/worksheet-generators/js/lcs-meter.js?v=1"></script>\n';

function dlHref(locale, slug, kind) {
  return CANONICAL_BASE + '/api/quota/dl?loc=' + encodeURIComponent(locale) + '&slug=' + encodeURIComponent(slug) + '&kind=' + kind;
}
const reEsc = (s) => String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function meterDeckHtml(html, locale, slug) {
  let out = String(html);
  let links = 0, relabel = 0, meter = 0;
  // 1. the deck's own PDFs, absolute or root-relative, any file name in its folder
  const own = new RegExp('(<a\\b[^>]*?\\bhref=")(?:' + reEsc(CANONICAL_BASE) + ')?/' + reEsc(locale) + '/decks/' + reEsc(slug) + '/([^"/]*?)(printable|answer-key)\\.pdf(")', 'g');
  out = out.replace(own, (m, a, _pre, kind, q) => { links++; return a + dlHref(locale, slug, kind === 'answer-key' ? 'answer' : 'pdf').replace(/&/g, '&amp;') + q; });
  // 2. the worksheet-gen buttons' visible labels (⬇ download, ✓ answer key)
  const S = deckActions.strings(locale);
  out = out.replace(/(<a class="lcs-download-cta"[^>]*>)⬇ ([^<]*)(<\/a>)/g, (m, a, label, z) => { if (label === S.downloadPdf) return m; relabel++; return a + '⬇ ' + S.downloadPdf + z; });
  out = out.replace(/(<a class="lcs-download-cta"[^>]*>)✓ ([^<]*)(<\/a>)/g, (m, a, label, z) => { if (label === S.answerKey) return m; relabel++; return a + '✓ ' + S.answerKey + z; });
  // 3. the play wall on an interactive deck
  if (/\bDECK_BUNDLE\s*=/.test(out) && out.indexOf(METER_MARKER) === -1) {
    const h = /<head\b[^>]*>/i.exec(out);
    if (h) { const at = h.index + h[0].length; out = out.slice(0, at) + '\n' + METER_SCRIPT + out.slice(at); meter++; }
  }
  return { html: out, changed: out !== html, links, relabel, meter };
}

module.exports = { meterDeckHtml, dlHref, METER_MARKER };
