/**
 * Platform layer — Node implementation (worksheet makers, ARCHITECTURE §2.2).
 *
 * The worksheet engine runs in two hosts: Node + Puppeteer (the published catalogue, unchanged) and the teacher's
 * browser (the makers). Every place the engine touched the disk, a hash or a raw script now goes through this one
 * interface; the bundler swaps this file for ./browser.js. In Node every function does exactly what its call site did
 * before, so the catalogue builds byte-identical.
 *
 *   readText(absPath)          file contents (utf8)
 *   readJson(absPath)          JSON.parse(readText)
 *   exists(absPath)            boolean
 *   fileHref(absPath)          a URL the page can load (file:// here, the CDN in the browser)
 *   sha1Bytes(str)             the 20-byte SHA-1 digest as a Uint8Array-like (Buffer here)
 *   vocab()                    REFERENCE TRANSLATIONS/image-vocabulary.js as an object
 *   miniCore(file, win)        runs a `mini tools/<file>` browser script against `win` (it attaches its globals)
 *   requireData(absPath)       a JS data module (a word bank with its helpers): require() here; in the browser the
 *                              modules the maker's build recorded, bundled in (a module it did not record THROWS)
 *   picture.*                  the pixel work of the picture engines (S6, 2026-11-01): here the EXACT `sharp` chains
 *                              the engines ran before (moved, not rewritten — the catalogue's bytes depend on them);
 *                              in the browser the same contracts on a canvas. See ./picture-contract.md in the
 *                              handoff (docs/makers/handoff/05-picture-engines-browser.md) for what is identical.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..', '..', '..', '..');
const sharp = () => require('sharp');   // loaded on first use (a Node process that never touches a picture never loads it)

/**
 * picture — every contract returns RGBA pixels as { data: Uint8Array (4 bytes per px), width, height }, unpremultiplied.
 *   rasterSvg(svg)                      an SVG string at its own declared size (librsvg here, a canvas there)
 *   decode(bytes)                       an encoded image (the PNG a screenshot gives) → pixels
 *   trim(file)                          a library drawing cut to its ink box (sharp.trim threshold 10) → { width, height, handle }
 *   sized(trimmed, w, h, flip)          that trimmed drawing stretched to w × h (fit 'fill'), optionally mirrored
 *   scaled(file, work)                  a drawing flattened on white with its longer side = work px (the tracer's input)
 *   alphaMask24(file)                   the alpha channel fitted inside 24 × 24 (contain, black background) → Uint8Array(576)
 *   extent(file)                        { widthFrac, leftFrac, heightFrac, topFrac } of the art inside its square (trim threshold 8)
 *   silhouette(file, dest, ink)         the drawing's alpha filled with `ink` → a URL the page can load (cached at dest here)
 *   dataUri(file)                       the file as something an <image href> can show (base64 here, the CDN URL there)
 */
const picture = {
  async rasterSvg(svg) {
    const { data, info } = await sharp()(Buffer.from(svg)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    return { data, width: info.width, height: info.height };
  },
  async decode(bytes) {
    const { data, info } = await sharp()(bytes).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    return { data, width: info.width, height: info.height };
  },
  async trim(file) {
    const t = await sharp()(file).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
    return { width: t.info.width, height: t.info.height, handle: t.data };
  },
  async sized(trimmed, w, h, flip) {
    let img = sharp()(trimmed.handle).resize(w, h, { fit: 'fill' });
    if (flip) img = img.flop();
    const { data, info } = await img.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    return { data, width: info.width, height: info.height };
  },
  async scaled(file, work) {
    const img = sharp()(file).flatten({ background: '#ffffff' });
    const meta = await img.metadata();
    const sc = work / Math.max(meta.width, meta.height);
    const W = Math.round(meta.width * sc), H = Math.round(meta.height * sc);
    const { data } = await img.resize(W, H).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    return { data, width: W, height: H };
  },
  async alphaMask24(file) {
    const buf = await sharp()(file).ensureAlpha().extractChannel(3).resize(24, 24, { fit: 'contain', background: { r: 0, g: 0, b: 0 } }).raw().toBuffer();
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  },
  async extent(file) {
    const meta = await sharp()(file).metadata();
    const { info } = await sharp()(file).trim({ threshold: 8 }).toBuffer({ resolveWithObject: true });
    const left = -(info.trimOffsetLeft || 0);
    const top = -(info.trimOffsetTop || 0);
    return { widthFrac: info.width / meta.width, leftFrac: left / meta.width, heightFrac: info.height / meta.height, topFrac: top / meta.height };
  },
  async silhouette(file, dest, ink) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      const { width, height } = await sharp()(file).metadata();
      // flat ink-colored canvas + the source's alpha channel = the shadow shape
      const alpha = await sharp()(file).ensureAlpha().extractChannel(3).raw().toBuffer();
      await sharp()({ create: { width, height, channels: 3, background: ink } })
        .joinChannel(alpha, { raw: { width, height, channels: 1 } })
        .png()
        .toFile(dest);
    }
    return url.pathToFileURL(dest).href;
  },
  dataUri(file) { return 'data:image/webp;base64,' + fs.readFileSync(file).toString('base64'); },
};

module.exports = {
  kind: 'node',
  REPO,
  readText: (p) => fs.readFileSync(p, 'utf8'),
  readJson: (p) => JSON.parse(fs.readFileSync(p, 'utf8')),
  // a binary file as base64 (the family portraits, primitives/family-figure.js — 2026-11-02)
  readBase64: (p) => fs.readFileSync(p).toString('base64'),
  exists: (p) => fs.existsSync(p),
  fileHref: (p) => url.pathToFileURL(p).href,
  sha1Bytes: (s) => crypto.createHash('sha1').update(s).digest(),
  vocab: () => require('../../../publish-cli/deck-rich-alt.js').loadVocab(),
  requireData: (p) => require(p),
  slugify: (v) => require('../../../publish-cli/slug.js').slugify(v),
  miniCore(file, win) {
    const src = fs.readFileSync(path.join(REPO, 'mini tools', file), 'utf8');
    new Function('window', src)(win);
    return win;
  },
  picture,
};
