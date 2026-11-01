#!/usr/bin/env node
/**
 * S6 — the NODE paths of the picture engines are unchanged (README rule 5: the catalogue never changes).
 *
 * Builds a fixed sample through every engine that touches `sharp` — live page builds (picture tracing, shadow match,
 * mirror match, the maze scenes), the verify oracles (hm-verify on a real screenshot, pt-verify, htd-vector laws) and
 * the offline derivations (cbn-lineart compose + segment, fd-scene layers + panels, htd-steps, pt-trace, the
 * silhouette cache) — and hashes every output. Run once BEFORE an engine change (--out) and again after (--check):
 * every hash must be equal.
 *
 *   node scripts/makers/spikes/s6-node-identity.js --out=<file.json>
 *   node scripts/makers/spikes/s6-node-identity.js --check=<file.json>
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const REPO = path.resolve(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const sha = (v) => crypto.createHash('sha1').update(Buffer.isBuffer(v) || v instanceof Uint8Array ? Buffer.from(v) : String(v)).digest('hex');
const hashJson = (o) => sha(JSON.stringify(o, (k, v) => (v instanceof Uint8Array || v instanceof Int32Array || v instanceof Int16Array || v instanceof Float32Array ? sha(Buffer.from(v.buffer, v.byteOffset, v.byteLength)) : (k.startsWith('_') ? undefined : v))));

const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { buildPage } = require(path.join(WG, 'page', 'shell.js'));
const { resolveStrings } = require(path.join(WG, 'i18n', 'strings.js'));

/** one page the way render-instance.js builds it (an async build is awaited) */
async function page(typeId, { locale = 'en', difficulty = 2, theme = null, unit = null, variant = 1 } = {}) {
  const type = loadType(typeId);
  const rng = makeRng(instanceSeed({ typeId, theme, difficulty, seedEpoch: 1, variant, unit }));
  const built = await type.build({ theme, difficulty, locale, unit }, { rng, variant });
  const s = resolveStrings(typeId, locale, type);
  const html = buildPage({ title: s.printTitle || s.title, instruction: s.instruction, bodyHtml: built.bodyHtml, locale, pageSize: locale === 'en' ? 'letter' : 'a4' });
  return { html, meta: built.meta, type };
}

async function main() {
  const out = {};
  const t0 = Date.now();
  const note = (k, v) => { out[k] = v; process.stderr.write(k + ' '); };

  // --- live page builds
  for (const [id, d, loc, v] of [['K-418', 1, 'en', 1], ['K-418', 2, 'de', 2], ['K-418', 3, 'en', 1], ['K-419', 1, 'fi', 1], ['K-422', 2, 'en', 1], ['K-425', 2, 'fr', 1], ['K-428', 3, 'en', 2], ['K-432', 2, 'sv', 1]]) {
    const p = await page(id, { difficulty: d, locale: loc, variant: v });
    note(`page ${id} L${d} ${loc} v${v}`, sha(p.html));
  }
  for (const [id, d, theme] of [['K-057', 1, 'animals'], ['K-057', 2, 'fruits'], ['K-057', 3, 'toys'], ['K-063', 2, 'animals'], ['K-063', 3, 'fruits']]) {
    const p = await page(id, { difficulty: d, theme });
    note(`page ${id} L${d} ${theme}`, sha(p.html));
  }
  const mazePages = [];
  for (const [id, d, loc] of [['K-405', 1, 'en'], ['K-405', 2, 'de'], ['K-406', 2, 'en'], ['K-408', 2, 'nl'], ['K-409', 2, 'sv']]) {
    const p = await page(id, { difficulty: d, locale: loc });
    note(`page ${id} L${d} ${loc}`, sha(p.html));
    mazePages.push({ id, d, loc, ...p });
  }
  for (const [id, d, loc] of [['K-395', 2, 'en'], ['K-395', 3, 'de'], ['K-396', 2, 'en'], ['K-393', 2, 'en'], ['K-394', 2, 'fr']]) {
    const p = await page(id, { difficulty: d, locale: loc });
    note(`page ${id} L${d} ${loc}`, sha(p.html));
  }

  // --- the maze oracle on real screenshots (the catalogue's verify, through puppeteer)
  {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch();
    const pg = await browser.newPage();
    await pg.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
    const tmp = path.join(REPO, '.scratch', 's6-identity'); fs.mkdirSync(tmp, { recursive: true });
    for (const m of mazePages.slice(0, 3)) {
      const f = path.join(tmp, `${m.id}-${m.loc}.html`); fs.writeFileSync(f, m.html);
      await pg.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' });
      await pg.evaluate(() => document.fonts.ready);
      const issues = await m.type.verify(pg);
      note(`hm-verify ${m.id} ${m.loc}`, hashJson(issues));
    }
    await browser.close();
    fs.rmSync(tmp, { recursive: true, force: true });
  }

  // --- pt-trace + pt-verify
  const { traceDrawing } = require(path.join(WG, 'lib', 'pt-trace.js'));
  const { coverage, tracerLaws } = require(path.join(WG, 'lib', 'pt-verify.js'));
  const LIB = path.join(WG, 'cache', 'themes');
  for (const k of ['animals bw/giraffe', 'beach bw/sun', 'farm bw/barn', 'nature bw/tree', 'animals bw/whale']) {
    const tr = await traceDrawing(path.join(LIB, k + '@3x.webp'));
    note(`pt-trace ${k}`, hashJson({ W: tr.W, H: tr.H, sw: tr.sw, paths: tr.paths, blobs: tr.blobs, inkBox: tr.inkBox, ink: tr.ink, skeleton: tr.skeleton, body: tr.body }));
    const c = await coverage(tr);
    note(`pt-verify ${k}`, hashJson({ miss: c.miss, outside: c.outside, skeletonPx: c.skeletonPx, missMask: c.missMask, outMask: c.outMask, laws: await tracerLaws(tr) }));
  }

  // --- htd-vector laws + compile
  const V = require(path.join(WG, 'lib', 'htd-vector.js'));
  for (const k of ['cat', 'dog', 'mushroom']) {
    const S = await V.compile(require(path.join(WG, 'data', 'htdv', 'src', k + '.js')), { report: true });
    note(`htd-vector ${k}`, hashJson(S));
  }

  // --- cbn-lineart compose + segment (what cbn-lineart-build.js does)
  const L = require(path.join(WG, 'lib', 'cbn-lineart.js'));
  const { LINEART } = require(path.join(WG, 'data', 'cbn', 'lineart-designs.js'));
  for (const id of ['airplane', 'cat', 'farm-sheep']) {
    const d = LINEART.find((x) => x.id === id) || LINEART.find((x) => x.id.startsWith(id.split('-')[0]));
    const ink = await L.compose(d);
    const seg = L.segmentInk(ink, L.CW, L.CH, { unit: L.UNIT });
    note(`cbn-lineart ${d.id}`, hashJson({ ink, owner: ink.owner, regions: seg.regions.map((r) => ({ ...r })), inkD: seg.ink }));
  }

  // --- fd-scene layers (+ the Color by Number sampler) + a rendered panel
  const F = require(path.join(WG, 'lib', 'fd-scene.js'));
  const { SCENES } = require(path.join(WG, 'data', 'cbn', 'lineart-scenes.js'));
  for (const spec of [SCENES[0], SCENES[7]]) {
    const scene = await F.buildLayers(spec);
    const strip = JSON.parse(JSON.stringify(scene, (k, v) => (k.startsWith('_') ? undefined : v)));
    note(`fd-scene ${spec.id}`, hashJson({ strip, panel: F.renderPanel(scene, [{ kind: 'remove', item: 0 }], { mode: 'colour' }) }));
  }

  // --- htd-steps (compose inside)
  const Hd = require(path.join(WG, 'lib', 'htd-steps.js'));
  for (const src of ['animals bw 2/cat', 'farm bw/barn']) {
    const S = await Hd.buildSteps(src, { steps: 5 });
    note(`htd-steps ${src}`, hashJson(S));
  }

  // --- the silhouette cache (shadow match): signatures, extents, the generated PNG bytes
  const Si = require(path.join(WG, 'image-cache', 'silhouette.js'));
  const { themeEntry } = require(path.join(WG, 'image-cache', 'resolve.js'));
  for (const [theme, noun] of [['animals', 'cat'], ['fruits', 'apple'], ['toys', 'ball'], ['vehicles', 'car']]) {
    note(`silhouette mask ${theme}/${noun}`, hashJson(await Si.maskSignature(theme, noun)));
    note(`silhouette extent ${theme}/${noun}`, hashJson(await Si.artExtent(theme, noun)));
  }
  for (const [theme, noun] of [['animals', 'cat'], ['fruits', 'apple']]) {
    const dest = path.join(WG, 'cache', 'silhouettes', theme, noun + '.png');
    if (fs.existsSync(dest)) fs.unlinkSync(dest);   // regenerate: the cache is derived data
    const href = await Si.silhouetteUri(theme, noun);
    note(`silhouette png ${theme}/${noun}`, sha(fs.readFileSync(dest)) + ' ' + sha(href.replace(/^file:.*?\/scripts\//, 'file:///scripts/')));
    void themeEntry;
  }

  process.stderr.write(`\n${Object.keys(out).length} hashes in ${((Date.now() - t0) / 1000).toFixed(1)} s\n`);
  if (args.out) { fs.writeFileSync(args.out, JSON.stringify(out, null, 1)); console.log('wrote ' + args.out); }
  if (args.check) {
    const ref = JSON.parse(fs.readFileSync(args.check, 'utf8'));
    let bad = 0;
    for (const k of Object.keys(ref)) { if (!(k in out)) { bad++; console.log('MISSING ' + k); } else if (ref[k] !== out[k]) { bad++; console.log('DIFF    ' + k); } }
    for (const k of Object.keys(out)) if (!(k in ref)) console.log('NEW     ' + k);
    console.log(`s6-node-identity: ${Object.keys(ref).length} reference hashes, ${bad} differ`);
    process.exit(bad ? 1 : 0);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
