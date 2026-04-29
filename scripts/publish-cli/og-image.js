/**
 * OG image (1200×630) derivation per Brief B v3 Decision 3 + Phase 3 v4 Surface 2.
 *
 * Source: 480×620 thumbnail.png (per catalog-export.js THUMB_WIDTH=480 / THUMB_HEIGHT=620;
 * confirmed against real emission at recon Item 2 across all 4 phase2-real-zips/).
 *
 * Composite: white 1200×630 background; thumbnail centered.
 *   - top: 5  centers vertically: (630 - 620) / 2 = 5
 *   - left: 360 centers horizontally: (1200 - 480) / 2 = 360
 *
 * channels:3 (RGB, no alpha) per Phase 3 v4 nit N2:
 * Sharp's create.channels:3 produces RGB-only canvas. Compositing a thumbnail
 * with alpha onto an RGB-only background flattens alpha onto white (Sharp's
 * default). Current 4 phase2-real-zips/ thumbnails emit RGB-no-alpha — no-op.
 * Across the remaining 25 forward-look apps, if any emit alpha-channel
 * thumbnails, behavior is composite-onto-white — typically the intended result
 * for worksheet thumbnails (transparent regions become white, matching the OG
 * card's white border).
 */

'use strict';

var sharp = require('sharp');

var OG_WIDTH = 1200;
var OG_HEIGHT = 630;
var THUMB_WIDTH = 480;
var THUMB_HEIGHT = 620;
var THUMB_TOP = (OG_HEIGHT - THUMB_HEIGHT) / 2;   // 5
var THUMB_LEFT = (OG_WIDTH - THUMB_WIDTH) / 2;    // 360

/**
 * Derive OG image PNG buffer from a source thumbnail buffer.
 *
 * Returns a Promise<Buffer> of PNG bytes. Caller writes to disk.
 *
 * Throws if Sharp errors mid-derivation OR if output dimensions don't
 * verify as 1200×630 (post-derivation metadata check per Surface 2).
 */
async function derive(thumbnailBuffer) {
  if (!Buffer.isBuffer(thumbnailBuffer)) {
    throw new Error('og-image.derive: thumbnailBuffer must be a Buffer');
  }

  var ogBuffer = await sharp({
    create: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      channels: 3,
      background: '#ffffff'
    }
  })
    .composite([{ input: thumbnailBuffer, top: THUMB_TOP, left: THUMB_LEFT }])
    .png()
    .toBuffer();

  // Verification: assert output dimensions per Surface 2.
  var meta = await sharp(ogBuffer).metadata();
  if (meta.width !== OG_WIDTH || meta.height !== OG_HEIGHT) {
    throw new Error('og-image.derive: output dimensions ' + meta.width + 'x' + meta.height +
      ' do not match expected ' + OG_WIDTH + 'x' + OG_HEIGHT);
  }
  return ogBuffer;
}

module.exports = {
  derive: derive,
  OG_WIDTH: OG_WIDTH,
  OG_HEIGHT: OG_HEIGHT,
  THUMB_WIDTH: THUMB_WIDTH,
  THUMB_HEIGHT: THUMB_HEIGHT,
  THUMB_TOP: THUMB_TOP,
  THUMB_LEFT: THUMB_LEFT
};
