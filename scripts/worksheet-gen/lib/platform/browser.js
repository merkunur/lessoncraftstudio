/**
 * Platform layer — browser implementation (worksheet makers, ARCHITECTURE §2.2). The bundler aliases
 * lib/platform/index.js to this file.
 *
 * Paths: the bundler gives every module a `__dirname` of '/' + its repo-relative directory, and `path` is a posix
 * shim, so `path.join(__dirname, …)` yields '/scripts/worksheet-gen/…'. Files are looked up in a PRELOAD map keyed
 * by that repo-relative path (no leading slash). The maker shell fills the map before it calls build():
 * a file that was not preloaded THROWS — a page is never built from a guessed or missing file.
 *
 * picture.* (S6, 2026-11-01): the picture engines' pixel work on a canvas, the same contracts as the Node side
 * (./index.js). A library drawing is fetched from the asset base (the derived 512 px set); an SVG is rasterised by
 * drawing it into a canvas, with every <image href> inlined first (an SVG inside an <img> may load nothing external).
 */
'use strict';
const { sha1Bytes } = require('./sha1.js');
const MINI_CORES = require('lcs-mini-cores');   // virtual module: { 'file.js': function (window) { …source… } }
const DATA_MODULES = require('lcs-data-modules');   // virtual module: { 'repo/relative/path.js': module.exports } (recorded per maker)

const PRELOAD = Object.create(null);
let ASSET_BASE = '/makers-assets';
// ART files (2026-11-02): one file per picture of a picture family (data/d2d/<scene>.json …) is NOT preloaded; a build
// that reads one throws PlatformMissing, runtime.generate asks fetchMissing() for it and builds again. Only these paths
// are ever fetched; every other missing file stays an error.
// (+ the Picture Tracing trace store, one file per library drawing: data/pt/traces/<theme>__<noun>.json — lib/pt-store.js)
const LAZY = /^scripts\/worksheet-gen\/data\/((d2d|cbn\/lineart|fd|htd|htdx|htdv)\/[a-z0-9-]+|pt\/traces\/[^\/]+__[^\/]+)\.json$/;
let FETCHER = null;

const key = (p) => String(p).replace(/\\/g, '/').replace(/^\/+/, '');

class PlatformMissing extends Error {
  constructor(p) { super('platform: file not preloaded: ' + key(p)); this.name = 'PlatformMissing'; this.path = key(p); }
}

function readText(p) {
  const k = key(p);
  if (!(k in PRELOAD)) throw new PlatformMissing(p);
  const v = PRELOAD[k];
  return typeof v === 'string' ? v : JSON.stringify(v);
}

function fileHref(p) {
  const k = key(p);
  if (/^(https?:|data:|blob:)/.test(String(p)) || String(p).startsWith('/makers-assets/')) return String(p);   // already a URL
  const m = k.match(/^scripts\/worksheet-gen\/cache\/(themes-512|themes)\/(.+)$/);
  if (m) return ASSET_BASE + '/themes-512/' + m[2].split('/').map(encodeURIComponent).join('/');
  const f = k.match(/^scripts\/worksheet-gen\/assets\/fonts\/(.+)$/);
  if (f) return ASSET_BASE + '/fonts/' + f[1];
  throw new Error('platform: no browser URL for ' + k);
}

/* ------------------------------------------------------------------ picture (canvas) */
const IMAGES = new Map();   // href → Promise<HTMLImageElement>
function loadImage(href) {
  if (!IMAGES.has(href)) IMAGES.set(href, new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => { IMAGES.delete(href); rej(new Error('platform: picture did not load: ' + href)); };
    img.src = href;
  }));
  return IMAGES.get(href);
}
function canvasOf(w, h) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  const g = c.getContext('2d', { willReadFrequently: true });
  return { c, g };
}
const pixels = (g, w, h) => ({ data: g.getImageData(0, 0, w, h).data, width: w, height: h });

const DATA_URLS = new Map();   // href → Promise<data URL> (an <image href> inside an SVG rasterised through <img>)
function dataUrlOf(href) {
  if (!DATA_URLS.has(href)) DATA_URLS.set(href, fetch(href).then((r) => { if (!r.ok) throw new Error('platform: ' + r.status + ' ' + href); return r.blob(); })
    .then((b) => new Promise((res, rej) => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.onerror = rej; fr.readAsDataURL(b); })));
  return DATA_URLS.get(href);
}
/** every <image href="…"> that is not a data: URL becomes one (same-origin fetch); the SVG's own size attributes are kept */
async function inlineImages(svg) {
  const hrefs = [...new Set([...svg.matchAll(/<image\b[^>]*?\s(?:xlink:)?href="([^"]+)"/g)].map((m) => m[1]).filter((h) => !/^data:/.test(h)))];
  if (!hrefs.length) return svg;
  const map = new Map(await Promise.all(hrefs.map(async (h) => [h, await dataUrlOf(fileHref(h.replace(/&amp;/g, '&')))])));
  return svg.replace(/(<image\b[^>]*?\s(?:xlink:)?href=")([^"]+)(")/g, (m, a, h, b) => (map.has(h) ? a + map.get(h) + b : m));
}
function svgSize(svg) {
  const head = (svg.match(/<svg\b[^>]*>/) || [''])[0];
  const num = (n) => { const m = head.match(new RegExp('\\s' + n + '="([\\d.]+)')); return m ? +m[1] : null; };
  let w = num('width'), h = num('height');
  if (w == null || h == null) { const vb = head.match(/viewBox="\s*[\d.-]+\s+[\d.-]+\s+([\d.]+)\s+([\d.]+)/); if (vb) { w = w == null ? +vb[1] : w; h = h == null ? +vb[2] : h; } }
  return { w: Math.round(w), h: Math.round(h) };
}

const picture = {
  /** an SVG string → RGBA at its declared width × height (opts.width/height override); transparent where it draws
   *  nothing, like librsvg — opts.background = a CSS colour paints the paper under it first (a page's white) */
  async rasterSvg(svg, opts = {}) {
    const inlined = await inlineImages(svg);
    const { w: w0, h: h0 } = svgSize(inlined);
    const w = opts.width || w0, h = opts.height || h0;
    const src = inlined.replace(/<svg\b([^>]*)>/, (m, attrs) => '<svg' + attrs.replace(/\swidth="[^"]*"/, '').replace(/\sheight="[^"]*"/, '') + ` width="${w}" height="${h}">`);
    const blob = new Blob([src.includes('xmlns=') ? src : src.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"')], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    try {
      const img = await loadImage(url);
      const { g } = canvasOf(w, h);
      if (opts.background && opts.background !== 'transparent') { g.fillStyle = opts.background; g.fillRect(0, 0, w, h); }
      g.drawImage(img, 0, 0, w, h);
      return pixels(g, w, h);
    } finally { URL.revokeObjectURL(url); IMAGES.delete(url); }
  },
  async decode(bytes) {
    const url = URL.createObjectURL(new Blob([bytes]));
    try {
      const img = await loadImage(url);
      const { g } = canvasOf(img.naturalWidth, img.naturalHeight);
      g.drawImage(img, 0, 0);
      return pixels(g, img.naturalWidth, img.naturalHeight);
    } finally { URL.revokeObjectURL(url); IMAGES.delete(url); }
  },
  /** the drawing cut to its ink box: the pixels whose alpha is over 10 (sharp.trim's threshold on a transparent square) */
  async trim(file) {
    const img = await loadImage(fileHref(file));
    const W = img.naturalWidth, H = img.naturalHeight;
    const { c, g } = canvasOf(W, H);
    g.drawImage(img, 0, 0);
    const a = g.getImageData(0, 0, W, H).data;
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (a[(y * W + x) * 4 + 3] > 10) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) { x0 = 0; y0 = 0; x1 = W - 1; y1 = H - 1; }
    return { width: x1 - x0 + 1, height: y1 - y0 + 1, handle: { canvas: c, x0, y0 } };
  },
  async sized(trimmed, w, h, flip) {
    const { g } = canvasOf(w, h);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    if (flip) { g.translate(w, 0); g.scale(-1, 1); }
    g.drawImage(trimmed.handle.canvas, trimmed.handle.x0, trimmed.handle.y0, trimmed.width, trimmed.height, 0, 0, w, h);
    return pixels(g, w, h);
  },
  async scaled(file, work) {
    const img = await loadImage(fileHref(file));
    const sc = work / Math.max(img.naturalWidth, img.naturalHeight);
    const W = Math.round(img.naturalWidth * sc), H = Math.round(img.naturalHeight * sc);
    const { g } = canvasOf(W, H);
    g.fillStyle = '#fff'; g.fillRect(0, 0, W, H);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(img, 0, 0, W, H);
    return pixels(g, W, H);
  },
  async alphaMask24(file) {
    const img = await loadImage(fileHref(file));
    const s = Math.min(24 / img.naturalWidth, 24 / img.naturalHeight);
    const dw = Math.round(img.naturalWidth * s), dh = Math.round(img.naturalHeight * s);
    const { g } = canvasOf(24, 24);
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    g.drawImage(img, Math.floor((24 - dw) / 2), Math.floor((24 - dh) / 2), dw, dh);
    const d = g.getImageData(0, 0, 24, 24).data;
    const out = new Uint8Array(576); for (let i = 0; i < 576; i++) out[i] = d[i * 4 + 3];
    return out;
  },
  async extent(file) {
    const img = await loadImage(fileHref(file));
    const W = img.naturalWidth, H = img.naturalHeight;
    const { g } = canvasOf(W, H);
    g.drawImage(img, 0, 0);
    const a = g.getImageData(0, 0, W, H).data;
    let x0 = W, y0 = H, x1 = -1, y1 = -1;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (a[(y * W + x) * 4 + 3] > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) return { widthFrac: 1, leftFrac: 0, heightFrac: 1, topFrac: 0 };
    return { widthFrac: (x1 - x0 + 1) / W, leftFrac: x0 / W, heightFrac: (y1 - y0 + 1) / H, topFrac: y0 / H };
  },
  async silhouette(file, dest, ink) {
    const img = await loadImage(fileHref(file));
    const W = img.naturalWidth, H = img.naturalHeight;
    const { c, g } = canvasOf(W, H);
    g.drawImage(img, 0, 0);
    g.globalCompositeOperation = 'source-in';
    g.fillStyle = `rgb(${ink.r},${ink.g},${ink.b})`; g.fillRect(0, 0, W, H);
    return c.toDataURL('image/png');
  },
  dataUri(file) { return fileHref(file); },
};

module.exports = {
  kind: 'browser',
  REPO: '',
  PlatformMissing,
  /** The shell's loader: files = { 'repo/relative/path': string | parsed JSON }. */
  preload(files) { for (const [k, v] of Object.entries(files)) PRELOAD[key(k)] = v; },
  /** The shell's art loader: fetcher(repoRelativePath) → the file's text (or null). */
  setFetcher(fn) { FETCHER = fn; },
  /** Fetch one missing ART file into the preload map; false when the path is not an art file or cannot be had. */
  async fetchMissing(p) {
    const k = key(p);
    if (!FETCHER || !LAZY.test(k) || k in PRELOAD) return false;
    const text = await FETCHER(k);
    if (text == null) return false;
    PRELOAD[k] = text;
    return true;
  },
  isLazy(p) { return LAZY.test(key(p)); },
  setAssetBase(base) { ASSET_BASE = String(base).replace(/\/+$/, ''); },
  readText,
  readJson(p) { const k = key(p); if (!(k in PRELOAD)) throw new PlatformMissing(p); const v = PRELOAD[k]; return typeof v === 'string' ? JSON.parse(v) : v; },
  // binary files are not preloaded yet: the first maker that draws one (the family portraits) publishes them as assets
  readBase64(p) { throw new Error('platform: binary files are not available in a maker yet: ' + key(p)); },
  // Picture files are not data: every derived 512 px picture is published, so the image cache "exists" for them.
  // an ART file exists (it is published with the data, fetched when a page reads it — the index lists only what is built)
  exists(p) { const k = key(p); return k in PRELOAD || k in DATA_MODULES || LAZY.test(k) || /^scripts\/worksheet-gen\/cache\/themes-512\//.test(k); },
  fileHref,
  sha1Bytes,
  requireData(p) { const k = key(p); if (!(k in DATA_MODULES)) throw new PlatformMissing(p); return DATA_MODULES[k]; },
  vocab() { return module.exports.readJson('REFERENCE TRANSLATIONS/image-vocabulary.json'); },
  // deck ids and slugs are made on the server, never in a maker
  slugify() { throw new Error('platform: slugify is not available in a maker'); },
  miniCore(file, win) {
    const fn = MINI_CORES[file];
    if (!fn) throw new Error('platform: mini core not bundled: ' + file);
    fn(win);
    return win;
  },
  picture,
};
