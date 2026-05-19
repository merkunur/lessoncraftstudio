/**
 * OG image (1200×630) derivation.
 *
 * Phase 2 SEO-thumbnail commission (2026-05-19): redesigned from centered-on-
 * white (~60% white space) to a two-column composite that fills the 1200×630
 * frame meaningfully:
 *   - Left 487px: thumbnail scaled to fit by height (preserves source 480×620
 *     proportional aspect at 0.984× scale)
 *   - Right 713px: cream #FEFAF3 background + deck title (wrapped) + theme/level
 *     subhead + LessonCraftStudio wordmark; rendered as SVG via Sharp.
 *
 * Source thumbnail: 480×620 (per catalog-export.js THUMB_WIDTH/THUMB_HEIGHT;
 * unchanged from Brief B Decision 3).
 *
 * Backwards-compat: callers that don't pass opts.title get a centered-on-white
 * layout matching the pre-Phase-2 behavior (legacy fallback for tests + cases
 * where text context is unavailable).
 *
 * Sharp chain: `.composite([{input:thumbnailBuffer}, {input:rightColumnSvgBuffer}])`
 * → `.withXmp(...)` (Phase 3 XMP embed; applied by caller if opts.xmp provided)
 * → `.png()` → `.toBuffer()`.
 *
 * channels:3 RGB (no alpha) per Phase 3 v4 nit N2 — RGB-only canvas.
 * Compositing thumbnails with alpha flattens onto cream background.
 */

'use strict';

var sharp = require('sharp');
var ogImageText = require('./og-image-text');

var OG_WIDTH = 1200;
var OG_HEIGHT = 630;

// Two-column geometry.
var LEFT_COL_WIDTH = 487;             // Thumbnail column width
var RIGHT_COL_WIDTH = OG_WIDTH - LEFT_COL_WIDTH;  // 713
var THUMB_TARGET_HEIGHT = OG_HEIGHT;  // Fit to canvas height
// Source thumbnail is 480×620; scaled to fit OG_HEIGHT (630).
var THUMB_SCALE = OG_HEIGHT / 620;    // ≈ 1.016
// Scaled thumbnail width = 480 * 1.016 ≈ 488; centered in LEFT_COL_WIDTH (487)
// produces ~1px clip per side, acceptable. Sharp's resize handles fractional.
var THUMB_TARGET_WIDTH = Math.round(480 * THUMB_SCALE);  // 488

// Background fill for thumbnail column (catches any sub-pixel transparency).
var LEFT_BG = '#FFFFFF';
var RIGHT_BG = '#FEFAF3';  // Cream; mirrors og-image-text.BG_COLOR

// Backwards-compat: legacy centered layout for opts-less callers.
var LEGACY_THUMB_WIDTH = 480;
var LEGACY_THUMB_HEIGHT = 620;
var LEGACY_THUMB_TOP = (OG_HEIGHT - LEGACY_THUMB_HEIGHT) / 2;  // 5
var LEGACY_THUMB_LEFT = (OG_WIDTH - LEGACY_THUMB_WIDTH) / 2;   // 360

/**
 * Derive OG image PNG buffer from a source thumbnail buffer.
 *
 * Args:
 *   thumbnailBuffer — Buffer of 480×620 thumbnail.png contents
 *   opts (optional):
 *     title:     string  — deck title (brand suffix optional; stripped if present)
 *     themeName: string  — locale-localized theme name (or null)
 *     levelName: string  — locale-localized educational level (or null)
 *     locale:    string  — informational; current implementation locale-agnostic
 *     xmpBuffer: Buffer  — optional XMP packet to embed (Phase 3)
 *
 * Returns: Promise<Buffer> of PNG bytes (1200×630).
 *
 * Throws if Sharp errors mid-derivation OR if output dimensions don't verify.
 */
async function derive(thumbnailBuffer, opts) {
  if (!Buffer.isBuffer(thumbnailBuffer)) {
    throw new Error('og-image.derive: thumbnailBuffer must be a Buffer');
  }

  // Backwards-compat path: no opts.title → legacy centered-on-white layout.
  if (!opts || !opts.title) {
    return deriveLegacy(thumbnailBuffer, opts);
  }

  // Two-column layout.
  // Step 1: scale thumbnail to fit by height.
  var scaledThumbnail = await sharp(thumbnailBuffer)
    .resize({ width: THUMB_TARGET_WIDTH, height: OG_HEIGHT, fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  // Step 2: render right-column SVG → PNG buffer.
  var svgString = ogImageText.buildRightColumnSvg({
    title: opts.title,
    themeName: opts.themeName,
    levelName: opts.levelName,
    locale: opts.locale
  });
  var rightColBuffer = await sharp(Buffer.from(svgString, 'utf8'))
    .png()
    .toBuffer();

  // Step 3: composite onto 1200×630 canvas.
  // Left column at (0,0); right column at (LEFT_COL_WIDTH, 0).
  // Background fills the unused 1px gap from sub-pixel scaling.
  var pipeline = sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 3,
      background: RIGHT_BG  // Cream wins on any uncovered area
    }
  })
    .composite([
      { input: scaledThumbnail, top: 0, left: 0 },
      { input: rightColBuffer, top: 0, left: LEFT_COL_WIDTH }
    ]);

  // Step 4: optional XMP packet (Phase 3).
  if (opts.xmpPacket && typeof opts.xmpPacket === 'string' && opts.xmpPacket.length > 0) {
    pipeline = pipeline.withXmp(opts.xmpPacket);
  } else if (opts.xmpBuffer && Buffer.isBuffer(opts.xmpBuffer)) {
    pipeline = pipeline.withXmp(opts.xmpBuffer.toString('utf8'));
  }

  var ogBuffer = await pipeline
    .png({ compressionLevel: 6 })
    .toBuffer();

  // Verify output dimensions.
  var meta = await sharp(ogBuffer).metadata();
  if (meta.width !== OG_WIDTH || meta.height !== OG_HEIGHT) {
    throw new Error('og-image.derive: output dimensions ' + meta.width + 'x' + meta.height +
      ' do not match expected ' + OG_WIDTH + 'x' + OG_HEIGHT);
  }
  return ogBuffer;
}

/**
 * Legacy centered-on-white layout. Used when caller passes no opts.title.
 * Preserves pre-Phase-2 behavior for tests + backwards-compat callers.
 */
async function deriveLegacy(thumbnailBuffer, opts) {
  var pipeline = sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 3,
      background: '#ffffff'
    }
  })
    .composite([{ input: thumbnailBuffer, top: LEGACY_THUMB_TOP, left: LEGACY_THUMB_LEFT }]);

  if (opts && opts.xmpBuffer && Buffer.isBuffer(opts.xmpBuffer)) {
    pipeline = pipeline.withXmp(opts.xmpBuffer);
  }

  var ogBuffer = await pipeline.png().toBuffer();

  var meta = await sharp(ogBuffer).metadata();
  if (meta.width !== OG_WIDTH || meta.height !== OG_HEIGHT) {
    throw new Error('og-image.derive (legacy): output dimensions ' + meta.width + 'x' + meta.height +
      ' do not match expected ' + OG_WIDTH + 'x' + OG_HEIGHT);
  }
  return ogBuffer;
}

module.exports = {
  derive: derive,
  deriveLegacy: deriveLegacy,
  OG_WIDTH: OG_WIDTH,
  OG_HEIGHT: OG_HEIGHT,
  LEFT_COL_WIDTH: LEFT_COL_WIDTH,
  RIGHT_COL_WIDTH: RIGHT_COL_WIDTH,
  THUMB_TARGET_WIDTH: THUMB_TARGET_WIDTH,
  THUMB_TARGET_HEIGHT: THUMB_TARGET_HEIGHT,
  // Legacy exports preserved for backwards compat.
  THUMB_WIDTH: LEGACY_THUMB_WIDTH,
  THUMB_HEIGHT: LEGACY_THUMB_HEIGHT,
  THUMB_TOP: LEGACY_THUMB_TOP,
  THUMB_LEFT: LEGACY_THUMB_LEFT
};
