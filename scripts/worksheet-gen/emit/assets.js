/**
 * emit/assets.js — derive the deck-page preview JPEG (inline data-URI) and the
 * 480×620 thumbnail.png (og-image.js two-column composite expects this size)
 * from the render harness's page screenshot PNG (~1406×1890 @2x).
 */
'use strict';
const fs = require('fs');
const sharp = require('sharp');

const PREVIEW_WIDTH = 860;
const THUMB_WIDTH = 480;
const THUMB_HEIGHT = 620;

/** @returns {Promise<{dataUri: string, width: number, height: number}>} */
async function buildPreviewJpeg(pngPath) {
  const img = sharp(pngPath).flatten({ background: '#FFFFFF' }).resize(PREVIEW_WIDTH, null, { withoutEnlargement: true });
  const buf = await img.jpeg({ quality: 80 }).toBuffer();
  const meta = await sharp(buf).metadata();
  return {
    dataUri: 'data:image/jpeg;base64,' + buf.toString('base64'),
    width: meta.width,
    height: meta.height,
  };
}

/** @returns {Promise<Buffer>} 480×620 PNG (cover, top-anchored). */
async function buildThumbnail(pngPath) {
  return sharp(pngPath)
    .flatten({ background: '#FFFFFF' })
    .resize(THUMB_WIDTH, THUMB_HEIGHT, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();
}

module.exports = { buildPreviewJpeg, buildThumbnail, THUMB_WIDTH, THUMB_HEIGHT };
