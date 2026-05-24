/**
 * Homepage OG image generator (1200×630, written to frontend/public/og-homepage.png).
 *
 * Companion to scripts/publish-cli/og-image.js (per-deck two-column pipeline).
 * The per-deck pipeline composites a deck thumbnail + per-deck title; this
 * pipeline has no thumbnail input and composes a brand-only centered layout
 * for the homepage `og:image` + `twitter:image` surface.
 *
 * Authored 2026-05-24 as Phase 2a of the SEO cleanup commission. Replaces the
 * hardcoded `/de/decks/picture-path/og-image.png` reference in
 * frontend/app/[locale]/page.tsx:49.
 *
 * Direction A palette per CLAUDE.md §A.13.47 (locked):
 *   - Cream background #FBF3E4
 *   - Teal title       #146B5E
 *   - Coral accents    #F2784B
 *   - Ink subhead/wordmark #1C1C1E
 *
 * Font: DejaVu Sans on Hetzner / Arial fallback on Windows. librsvg consumes
 * `font-family` directly. Baloo 2 (the runtime UI face) is NOT available to
 * librsvg on either platform without installation; DejaVu Sans Bold is the
 * closest universally-available substitute at this size.
 *
 * Layout (two-line title to avoid horizontal clipping at the 1200px width
 * with DejaVu Sans Bold 84px):
 *
 *   .  *    K-3 worksheets         .
 *           in 11 languages
 *              ~~~                   ← coral squiggle under "11"
 *      Free · Interactive · Multilingual
 *
 *            LessonCraftStudio
 *   For dual-language, bilingual, and international-school classrooms
 *
 * Sparkle accents per the DoodleAccents.tsx aesthetic in homepage-v3.
 *
 * Run locally on Windows or Linux:
 *   node scripts/og-images/generate-homepage-og.js
 *
 * Idempotent: rewrites frontend/public/og-homepage.png byte-identically given
 * the same source code. Commit both this script AND the binary PNG; downstream
 * environments do NOT regenerate at build time.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var sharp = require('sharp');

var OG_WIDTH = 1200;
var OG_HEIGHT = 630;

// Direction A palette.
var BG_COLOR = '#FBF3E4';
var TITLE_COLOR = '#146B5E';
var CORAL_COLOR = '#F2784B';
var INK_COLOR = '#1C1C1E';

// Layout — two-line title centered horizontally.
var CX = OG_WIDTH / 2;

var TITLE_FONT_SIZE = 84;
var TITLE_LINE_GAP = 96;
var TITLE_LINE_1_Y = 150;
var TITLE_LINE_2_Y = TITLE_LINE_1_Y + TITLE_LINE_GAP;

var SUBHEAD_FONT_SIZE = 36;
var SUBHEAD_Y = 380;

var WORDMARK_FONT_SIZE = 48;
var WORDMARK_Y = 480;

var TAGLINE_FONT_SIZE = 26;
var TAGLINE_Y = 550;

/**
 * Squiggle under "11" in line 2.
 *
 * Line 2 = "in 11 languages" rendered centered at (CX, TITLE_LINE_2_Y).
 * Approximate glyph widths for DejaVu Sans Bold 84px:
 *   "i"=27, "n"=51, " "=23, "1"=53, "1"=53, " "=23, "l"=27, "a"=51, "n"=51,
 *   "g"=51, "u"=51, "a"=51, "g"=51, "e"=51, "s"=49
 * Total ~712 px. Half = 356.
 * "in " = 27+51+23 = 101 → "11" starts at CX - 356 + 101 = CX - 255.
 * "11" width = 53+53 = 106 → "11" centered at CX - 255 + 53 = CX - 202.
 * Squiggle baseline below the digit (descender clearance ~16px).
 */
function buildSquigglePath() {
  var centerX = CX - 202;
  var startY = TITLE_LINE_2_Y + 22;
  var width = 110;
  var startX = centerX - width / 2;
  // Smooth quadratic-Bezier squiggle. Two crests + two troughs.
  return [
    '<path',
    'd="M ' + startX + ' ' + startY,
    'q ' + (width / 8).toFixed(2) + ' -14 ' + (width / 4).toFixed(2) + ' 0',
    't ' + (width / 4).toFixed(2) + ' 0',
    't ' + (width / 4).toFixed(2) + ' 0',
    't ' + (width / 4).toFixed(2) + ' 0"',
    'fill="none"',
    'stroke="' + CORAL_COLOR + '"',
    'stroke-width="7"',
    'stroke-linecap="round"',
    '/>'
  ].join(' ');
}

/**
 * Decorative sparkles per DoodleAccents.tsx (four-pointed star + dot).
 * Placed in the cream margin areas; semi-transparent.
 */
function buildSparkleSvg(cx, cy, radius, color, opacity) {
  var r = radius;
  var rIn = radius * 0.35;
  // Four-pointed star path.
  var pts = [
    cx + ',' + (cy - r),
    (cx + rIn) + ',' + (cy - rIn),
    (cx + r) + ',' + cy,
    (cx + rIn) + ',' + (cy + rIn),
    cx + ',' + (cy + r),
    (cx - rIn) + ',' + (cy + rIn),
    (cx - r) + ',' + cy,
    (cx - rIn) + ',' + (cy - rIn)
  ];
  return '<polygon points="' + pts.join(' ') + '" fill="' + color + '" opacity="' + opacity + '"/>';
}

function buildDot(cx, cy, r, color, opacity) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + color + '" opacity="' + opacity + '"/>';
}

function buildSvg() {
  var titleLine1 = 'K-3 worksheets';
  var titleLine2 = 'in 11 languages';
  var subhead = 'Free  ·  Interactive  ·  Multilingual';
  var wordmark = 'LessonCraftStudio';
  var tagline = 'For dual-language, bilingual, and international-school classrooms';

  var parts = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<svg xmlns="http://www.w3.org/2000/svg" width="' + OG_WIDTH + '" height="' + OG_HEIGHT + '">',
    // Background.
    '<rect width="' + OG_WIDTH + '" height="' + OG_HEIGHT + '" fill="' + BG_COLOR + '"/>',

    // Sparkles + dots in cream margins (top-left + top-right + bottom corners).
    buildSparkleSvg(100, 100, 14, CORAL_COLOR, '0.45'),
    buildSparkleSvg(1100, 80, 10, TITLE_COLOR, '0.40'),
    buildSparkleSvg(70, 540, 11, TITLE_COLOR, '0.35'),
    buildSparkleSvg(1130, 560, 13, CORAL_COLOR, '0.40'),
    buildDot(180, 160, 5, TITLE_COLOR, '0.30'),
    buildDot(1050, 180, 4, CORAL_COLOR, '0.40'),
    buildDot(140, 470, 4, CORAL_COLOR, '0.35'),
    buildDot(1080, 480, 5, TITLE_COLOR, '0.30'),

    // Title line 1: "K-3 worksheets".
    '<text x="' + CX + '" y="' + TITLE_LINE_1_Y + '" text-anchor="middle" ' +
      'font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-weight="800" ' +
      'font-size="' + TITLE_FONT_SIZE + '" fill="' + TITLE_COLOR + '">' + titleLine1 + '</text>',
    // Title line 2: "in 11 languages".
    '<text x="' + CX + '" y="' + TITLE_LINE_2_Y + '" text-anchor="middle" ' +
      'font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-weight="800" ' +
      'font-size="' + TITLE_FONT_SIZE + '" fill="' + TITLE_COLOR + '">' + titleLine2 + '</text>',
    // Squiggle under "11".
    buildSquigglePath(),

    // Subhead pill row.
    '<text x="' + CX + '" y="' + SUBHEAD_Y + '" text-anchor="middle" ' +
      'font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-weight="500" ' +
      'font-size="' + SUBHEAD_FONT_SIZE + '" fill="' + CORAL_COLOR + '">' + subhead + '</text>',

    // Wordmark.
    '<text x="' + CX + '" y="' + WORDMARK_Y + '" text-anchor="middle" ' +
      'font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-weight="700" ' +
      'font-size="' + WORDMARK_FONT_SIZE + '" fill="' + INK_COLOR + '">' + wordmark + '</text>',

    // Tagline.
    '<text x="' + CX + '" y="' + TAGLINE_Y + '" text-anchor="middle" ' +
      'font-family="DejaVu Sans, Arial, Helvetica, sans-serif" font-weight="400" ' +
      'font-size="' + TAGLINE_FONT_SIZE + '" fill="' + INK_COLOR + '">' + tagline + '</text>',

    '</svg>'
  ];

  return parts.join('\n');
}

async function main() {
  var svgString = buildSvg();
  var outputPath = path.resolve(__dirname, '..', '..', 'frontend', 'public', 'og-homepage.png');

  var pngBuffer = await sharp(Buffer.from(svgString, 'utf8'))
    .png({ compressionLevel: 9 })
    .toBuffer();

  var meta = await sharp(pngBuffer).metadata();
  if (meta.width !== OG_WIDTH || meta.height !== OG_HEIGHT) {
    throw new Error('og-homepage: output dimensions ' + meta.width + 'x' + meta.height +
      ' do not match expected ' + OG_WIDTH + 'x' + OG_HEIGHT);
  }

  fs.writeFileSync(outputPath, pngBuffer);
  console.log('og-homepage: wrote ' + outputPath + ' (' + pngBuffer.length + ' bytes)');
}

main().catch(function (err) {
  console.error('og-homepage generation failed:', err);
  process.exit(1);
});
