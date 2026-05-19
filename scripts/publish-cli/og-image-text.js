/**
 * SVG-text builder for og-image.png right column (Phase 2 SEO-thumbnail commission).
 *
 * The og-image is composited as a two-column 1200×630 layout: actual thumbnail
 * on the left (~487 px), readable title + theme/level + brand wordmark on the
 * right (~713 px). The right column is rendered as an SVG → PNG conversion
 * (via Sharp) then composited onto the canvas.
 *
 * Why SVG: Sharp uses librsvg for SVG → raster conversion, which supports text
 * rendering via system fonts. We use DejaVu Sans (available on Hetzner per
 * `fc-list` check). librsvg does NOT support `<foreignObject>` HTML word-wrap,
 * so we manually split lines using an empirical char-width estimate.
 *
 * Output: SVG string ready to pass to `sharp(Buffer.from(svgString))`.
 */

'use strict';

var RIGHT_WIDTH = 713;
var RIGHT_HEIGHT = 630;
var BG_COLOR = '#FEFAF3';            // Cream — matches deck.html theme-color
var TITLE_COLOR = '#1C1C1E';          // Near-black
var SUBHEAD_COLOR = '#4E5FE8';        // LCS brand blue
var WORDMARK_COLOR = '#1C1C1E';

var PADDING_X = 40;
var TITLE_FONT_SIZE = 48;
var TITLE_LINE_HEIGHT = 1.15;
var TITLE_MAX_LINES = 3;
var TITLE_TOP_Y = 110;                // Baseline of first title line
// Empirical: DejaVu Sans Bold 48px renders ~28-32 px wide per char on average
// (variable across glyphs; em-dash is wider). Conservative estimate ensures
// no clipping. Re-tested on /var/www/lcs-media/decks/en/bingo/thumbnail.png
// at 2026-05-19 SEO-thumbnail commission Phase 2.
var TITLE_CHAR_WIDTH_EST = 32;

var SUBHEAD_FONT_SIZE = 28;
var SUBHEAD_TOP_OFFSET = 36;          // Gap below title block
var SUBHEAD_CHAR_WIDTH_EST = 16;      // DejaVu Sans Regular 28px

var WORDMARK_FONT_SIZE = 28;
var WORDMARK_BASELINE_FROM_BOTTOM = 50;

var TITLE_AVAILABLE_WIDTH = RIGHT_WIDTH - (PADDING_X * 2);
var SUBHEAD_AVAILABLE_WIDTH = RIGHT_WIDTH - (PADDING_X * 2);

// ----- helpers ---------------------------------------------------------------

function escapeXml(s) {
  return String(s == null ? '' : s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Strip brand suffix " | LessonCraftStudio" — brand is rendered separately
 * as a wordmark in the bottom of the right column.
 */
function stripBrandSuffix(s) {
  return String(s || '').replace(/\s*\|\s*LessonCraftStudio\s*$/i, '').trim();
}

/**
 * Word-wrap a string to N lines of max width given a char-width estimate.
 * Returns array of lines (length ≤ maxLines). The Nth line gets an ellipsis
 * if the input doesn't fit within N lines.
 */
function wrapLines(text, maxWidthPx, charWidthEst, maxLines) {
  if (!text) return [];
  var maxCharsPerLine = Math.max(1, Math.floor(maxWidthPx / charWidthEst));
  var words = String(text).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  var lines = [];
  var current = '';
  for (var i = 0; i < words.length; i++) {
    var word = words[i];
    var candidate = current ? current + ' ' + word : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      if (current) {
        lines.push(current);
        current = word;
      } else {
        // Single word longer than line — hard-break.
        lines.push(word.slice(0, maxCharsPerLine - 1) + '…');
        current = '';
      }
      if (lines.length >= maxLines) {
        // No more line capacity; truncate the rest into ellipsis.
        if (current || i + 1 < words.length) {
          var last = lines.pop();
          lines.push((last + (current ? ' ' + current : '')).slice(0, maxCharsPerLine - 1).replace(/\s+\S*$/, '') + '…');
        }
        return lines;
      }
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Single-line truncation with ellipsis.
 */
function truncateLine(text, maxWidthPx, charWidthEst) {
  var maxChars = Math.max(1, Math.floor(maxWidthPx / charWidthEst));
  var s = String(text || '').trim();
  if (s.length <= maxChars) return s;
  return s.slice(0, maxChars - 1).replace(/\s+\S*$/, '') + '…';
}

/**
 * Build right-column SVG for og-image. All inputs may be null/undefined; missing
 * values produce empty text nodes that render invisibly.
 *
 * opts = {
 *   title:      'Bingo Worksheet — Animals — Kindergarten | LessonCraftStudio'
 *               (brand suffix stripped automatically)
 *   themeName:  'Animals'   (locale-localized) | null
 *   levelName:  'Kindergarten' (locale-localized) | null
 *   locale:     'en' | 'es' | 'pt'  (currently informational; no per-locale layout)
 * }
 *
 * Returns: SVG string (UTF-8) suitable for `sharp(Buffer.from(svg))`.
 */
function buildRightColumnSvg(opts) {
  opts = opts || {};
  var titleRaw = stripBrandSuffix(opts.title || '');
  var themeName = opts.themeName || '';
  var levelName = opts.levelName || '';

  // Build subhead: "Theme — Level" if both present; "Level" alone if no theme;
  // "Theme" alone if no level; empty otherwise.
  var subheadParts = [];
  if (themeName) subheadParts.push(String(themeName));
  if (levelName) subheadParts.push(String(levelName));
  var subhead = subheadParts.join(' — ');
  subhead = truncateLine(subhead, SUBHEAD_AVAILABLE_WIDTH, SUBHEAD_CHAR_WIDTH_EST);

  // Wrap title across up to 3 lines.
  var titleLines = wrapLines(titleRaw, TITLE_AVAILABLE_WIDTH, TITLE_CHAR_WIDTH_EST, TITLE_MAX_LINES);

  // Compute Y positions.
  var titleLineSpacingY = TITLE_FONT_SIZE * TITLE_LINE_HEIGHT;
  var titleBottomY = TITLE_TOP_Y + (titleLines.length - 1) * titleLineSpacingY;
  var subheadY = titleBottomY + SUBHEAD_TOP_OFFSET + SUBHEAD_FONT_SIZE;
  var wordmarkY = RIGHT_HEIGHT - WORDMARK_BASELINE_FROM_BOTTOM;

  var titleTspans = titleLines.map(function (line, idx) {
    var y = TITLE_TOP_Y + idx * titleLineSpacingY;
    return '<tspan x="' + PADDING_X + '" y="' + y + '">' + escapeXml(line) + '</tspan>';
  }).join('');

  // SVG. Use DejaVu Sans (system font on Hetzner per `fc-list` check).
  // librsvg consumes `font-family` + `font-weight`; styles inline avoid <style>
  // tag issues in some libsrvg versions.
  var svg = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + RIGHT_WIDTH + '" height="' + RIGHT_HEIGHT + '">',
    '<rect width="' + RIGHT_WIDTH + '" height="' + RIGHT_HEIGHT + '" fill="' + BG_COLOR + '"/>',
    '<text font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="' + TITLE_FONT_SIZE + '" fill="' + TITLE_COLOR + '">' + titleTspans + '</text>',
    subhead
      ? '<text x="' + PADDING_X + '" y="' + subheadY + '" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="' + SUBHEAD_FONT_SIZE + '" fill="' + SUBHEAD_COLOR + '">' + escapeXml(subhead) + '</text>'
      : '',
    '<text x="' + PADDING_X + '" y="' + wordmarkY + '" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="' + WORDMARK_FONT_SIZE + '" fill="' + WORDMARK_COLOR + '">LessonCraftStudio</text>',
    '</svg>'
  ].filter(Boolean).join('\n');

  return svg;
}

module.exports = {
  buildRightColumnSvg: buildRightColumnSvg,
  stripBrandSuffix: stripBrandSuffix,
  wrapLines: wrapLines,
  truncateLine: truncateLine,
  RIGHT_WIDTH: RIGHT_WIDTH,
  RIGHT_HEIGHT: RIGHT_HEIGHT,
  BG_COLOR: BG_COLOR
};
