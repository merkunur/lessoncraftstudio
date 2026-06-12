/**
 * Contact sheet — montage of rendered worksheet PNGs into one review image
 * (the human design gate's artifact).
 *   node scripts/worksheet-gen/qa/contact-sheet.js <dir-or-glob-prefix> <out.png>
 * Programmatic: makeContactSheet(pngPaths, outPath)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TILE_W = 420; // px per tile (page aspect 703:945 ≈ kept)
const COLS = 3;
const GAP = 16;
const LABEL_H = 26;

async function makeContactSheet(pngPaths, outPath) {
  const tileH = Math.round(TILE_W * 945 / 703);
  const rows = Math.ceil(pngPaths.length / COLS);
  const W = COLS * TILE_W + (COLS + 1) * GAP;
  const H = rows * (tileH + LABEL_H) + (rows + 1) * GAP;
  const composites = [];
  for (let i = 0; i < pngPaths.length; i++) {
    const col = i % COLS, row = Math.floor(i / COLS);
    const x = GAP + col * (TILE_W + GAP);
    const y = GAP + row * (tileH + LABEL_H + GAP);
    composites.push({
      input: await sharp(pngPaths[i]).resize(TILE_W, tileH, { fit: 'contain', background: '#fff' }).png().toBuffer(),
      left: x, top: y,
    });
    const labelText = path.basename(pngPaths[i], '.png');
    const labelSvg = Buffer.from(
      `<svg width="${TILE_W}" height="${LABEL_H}" xmlns="http://www.w3.org/2000/svg">` +
      `<text x="${TILE_W / 2}" y="${LABEL_H / 2 + 4}" font-family="Arial" font-size="13" fill="#555" text-anchor="middle">${labelText}</text></svg>`
    );
    composites.push({ input: labelSvg, left: x, top: y + tileH });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: '#EAEAEA' } })
    .composite(composites)
    .png()
    .toFile(outPath);
  return outPath;
}

if (require.main === module) {
  (async () => {
    const [dirOrPrefix, out] = process.argv.slice(2);
    let files;
    if (fs.existsSync(dirOrPrefix) && fs.statSync(dirOrPrefix).isDirectory()) {
      files = fs.readdirSync(dirOrPrefix).filter((f) => f.endsWith('.png')).map((f) => path.join(dirOrPrefix, f));
    } else {
      const dir = path.dirname(dirOrPrefix);
      const prefix = path.basename(dirOrPrefix);
      files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix) && f.endsWith('.png')).map((f) => path.join(dir, f));
    }
    files.sort();
    if (!files.length) { console.error('no PNGs matched'); process.exit(1); }
    console.log(await makeContactSheet(files, out), `(${files.length} tiles)`);
  })();
}

module.exports = { makeContactSheet };
