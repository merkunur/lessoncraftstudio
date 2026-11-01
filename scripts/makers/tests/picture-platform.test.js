#!/usr/bin/env node
/**
 * The picture contracts of lib/platform (S6, 2026-11-01): the Node side returns exactly what the engines' own `sharp`
 * chains returned before they moved behind the platform, and the oracle that now runs on decoded pixels
 * (hm-verify.analyzeRgba) judges a synthetic page the way its contract says — poisoned both ways.
 *   node scripts/makers/tests/picture-platform.test.js
 */
'use strict';
const path = require('path');
const crypto = require('crypto');
const sharp = require('sharp');

const WG = path.join(__dirname, '..', '..', 'worksheet-gen');
const P = require(path.join(WG, 'lib', 'platform', 'index.js'));
const HM = require(path.join(WG, 'lib', 'hm-verify.js'));
const sha = (b) => crypto.createHash('sha1').update(Buffer.from(b.buffer, b.byteOffset, b.byteLength)).digest('hex');

(async () => {
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 200))); };

  // --- rasterSvg = the sharp chain every engine ran (ensureAlpha().raw()); the derived chains (removeAlpha, flatten on
  //     black + channel 0, plain raw) read the same bytes when the SVG paints its own paper first
  const svg = (bg) => `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">${bg ? `<rect width="300" height="200" fill="${bg}"/>` : ''}<path d="M20 30 L280 170" fill="none" stroke="#000" stroke-width="7"/><circle cx="150" cy="60" r="33" fill="#F2784B"/><path d="M40 150 Q150 20 260 150" fill="none" stroke="#fff" stroke-width="1.5"/></svg>`;
  const rgba = await P.picture.rasterSvg(svg(null));
  check('rasterSvg size = the SVG size', rgba.width === 300 && rgba.height === 200 && rgba.data.length === 300 * 200 * 4);
  const ref = await sharp(Buffer.from(svg(null))).ensureAlpha().raw().toBuffer();
  check('rasterSvg = sharp(svg).ensureAlpha().raw() byte for byte', sha(rgba.data) === sha(ref));
  const white = await P.picture.rasterSvg(svg('#fff'));
  const rgb = await sharp(Buffer.from(svg('#fff'))).removeAlpha().raw().toBuffer();
  let rgbSame = true; for (let i = 0; i < 300 * 200; i++) if (white.data[i * 4] !== rgb[i * 3] || white.data[i * 4 + 1] !== rgb[i * 3 + 1] || white.data[i * 4 + 2] !== rgb[i * 3 + 2]) { rgbSame = false; break; }
  check('on a white paper: RGB of the RGBA raster = sharp removeAlpha().raw() (htd-vector)', rgbSame);
  const black = await P.picture.rasterSvg(svg('#000'));
  const r0 = await sharp(Buffer.from(svg('#000'))).flatten({ background: '#000' }).extractChannel(0).raw().toBuffer();
  let rSame = true; for (let i = 0; i < 300 * 200; i++) if (black.data[i * 4] !== r0[i]) { rSame = false; break; }
  check('on a black paper: channel 0 of the RGBA raster = sharp flatten(black).extractChannel(0) (pt-verify)', rSame);
  const raw = await sharp(Buffer.from(svg('#fff'))).raw().toBuffer({ resolveWithObject: true });
  check('sharp(svg).raw() is already RGBA (fd-scene cbnSampler read 4 channels)', raw.info.channels === 4 && sha(raw.data) === sha(white.data));
  // poison: a different SVG must not hash equal (the comparison is not vacuous)
  const other = await P.picture.rasterSvg(svg('#fff').replace('r="33"', 'r="34"'));
  check('poison: one more px of radius changes the raster', sha(other.data) !== sha(white.data));

  // --- decode = sharp(png).ensureAlpha().raw() (hm-verify on a screenshot)
  const png = await sharp(Buffer.from(svg('#fff'))).png().toBuffer();
  const dec = await P.picture.decode(png);
  check('decode(png) = sharp(png).ensureAlpha().raw()', sha(dec.data) === sha(await sharp(png).ensureAlpha().raw().toBuffer()) && dec.width === 300);

  // --- trim / sized / scaled / alphaMask24 / extent on a real library drawing (the compose + tracer + silhouette inputs)
  const file = path.join(WG, 'cache', 'themes', 'animals', 'cat@3x.webp');
  const t = await P.picture.trim(file);
  const tRef = await sharp(file).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  check('trim = sharp.trim({threshold:10}) (size + bytes)', t.width === tRef.info.width && t.height === tRef.info.height && sha(t.handle) === sha(tRef.data));
  const s = await P.picture.sized(t, 211, 173, true);
  const sRef = await sharp(tRef.data).resize(211, 173, { fit: 'fill' }).flop().ensureAlpha().raw().toBuffer();
  check('sized(flip) = resize(fit fill).flop().ensureAlpha().raw()', s.width === 211 && s.height === 173 && sha(s.data) === sha(sRef));
  const sc = await P.picture.scaled(file, 800);
  const img = sharp(file).flatten({ background: '#ffffff' }); const meta = await img.metadata();
  const k = 800 / Math.max(meta.width, meta.height), W = Math.round(meta.width * k), H = Math.round(meta.height * k);
  const scRef = await img.resize(W, H).ensureAlpha().raw().toBuffer();
  check('scaled(800) = flatten(white).resize(W,H).ensureAlpha().raw()', sc.width === W && sc.height === H && sha(sc.data) === sha(scRef));
  const m24 = await P.picture.alphaMask24(file);
  const m24Ref = await sharp(file).ensureAlpha().extractChannel(3).resize(24, 24, { fit: 'contain', background: { r: 0, g: 0, b: 0 } }).raw().toBuffer();
  check('alphaMask24 = the 24 × 24 contain-fit alpha', m24.length === 576 && sha(m24) === sha(m24Ref));
  const ext = await P.picture.extent(file);
  const emeta = await sharp(file).metadata(); const { info } = await sharp(file).trim({ threshold: 8 }).toBuffer({ resolveWithObject: true });
  check('extent = the trim({threshold:8}) box as fractions', ext.widthFrac === info.width / emeta.width && ext.leftFrac === -(info.trimOffsetLeft || 0) / emeta.width && ext.heightFrac === info.height / emeta.height);
  check('dataUri(file) = data:image/webp;base64,<the file>', P.picture.dataUri(file) === 'data:image/webp;base64,' + require('fs').readFileSync(file).toString('base64'));

  // --- the maze oracle on decoded pixels: a synthetic page whose corridor IS the declared graph passes; covering it,
  //     painting a stray patch, or closing a loop fires the named issue (poisoned both ways)
  const graph = { W: 24, fill: '#F4E6C8', edges: [{ a: 0, b: 1, pts: [[40, 100], [160, 100]] }, { a: 1, b: 2, pts: [[160, 100], [160, 220]] }, { a: 1, b: 3, pts: [[160, 100], [280, 100]] }], mouths: { start: [[40, 100], [10, 100]], goal: [[160, 220], [160, 250]] }, route: [0, 1, 2], tree: true, stand: [] };
  const page = (extra) => `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="260"><rect width="320" height="260" rx="18" fill="#7CB46B"/><g fill="none" stroke="${graph.fill}" stroke-width="${graph.W}" stroke-linecap="round" stroke-linejoin="round"><polyline points="10,100 40,100 160,100 160,220 160,250"/><polyline points="160,100 280,100"/></g>${extra || ''}</svg>`;
  const judge = async (extra) => { const { data, width: w, height: h } = await P.picture.rasterSvg(page(extra)); return HM.analyzeRgba({ data, w, h, graph, scale: 1 }); };
  check('a page drawn exactly as declared passes the oracle', (await judge('')).length === 0, await judge(''));
  const covered = await judge('<rect x="200" y="80" width="40" height="40" fill="#C33"/>');
  check('poison: a drawing over a corridor → MISSING', covered.some((x) => /corridor is covered/.test(x)), covered);
  const stray = await judge(`<rect x="40" y="180" width="60" height="30" fill="${graph.fill}"/>`);
  check('poison: a patch of corridor colour off the maze → EXTRA', stray.some((x) => /painted outside the maze/.test(x)), stray);
  const loop = await judge(`<polyline points="280,100 280,220 160,220" fill="none" stroke="${graph.fill}" stroke-width="${graph.W}" stroke-linecap="round"/>`);
  check('poison: a second way closing a ring → not unique (and EXTRA)', loop.some((x) => /second way/.test(x)), loop);
  const svgEntry = await HM.analyzeSvg({ svg: page(''), graph, scale: 1 });
  check('analyzeSvg (the maker entry) agrees with the screenshot entry on the clean page', svgEntry.length === 0, svgEntry);
  const shot = await sharp(Buffer.from(page('<rect x="200" y="80" width="40" height="40" fill="#C33"/>'))).png().toBuffer();
  const viaPng = await HM.analyzeScene({ png: shot, graph, scale: 1 });
  check('analyzeScene (the catalogue entry, a PNG) fires the same MISSING', viaPng.some((x) => /corridor is covered/.test(x)), viaPng);

  console.log(fails ? `picture-platform: ${fails} FAILED` : 'picture-platform: all pass');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
