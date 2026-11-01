#!/usr/bin/env node
/**
 * Spike S6 — the picture engines in the browser (ARCHITECTURE §17.4, ENGINES-ART §11; handoff task 5).
 *
 * Every `sharp`-dependent engine now does its pixel work through lib/platform (sharp in Node, a canvas in the
 * browser). This spike bundles the engines with the makers' own esbuild plugin, runs each one in headless Chrome on
 * the same inputs the Node path gets, and MEASURES the two against each other:
 *   hm   hm-verify   the maze oracle: issue lists on real pages (screenshot in Node, the scene SVG on a canvas in the
 *                    browser), declared-corridor mask agreement, what-the-child-sees mask agreement
 *   pt   pt-verify   laws a/b on the same traces (the raster of the guide: librsvg vs canvas)
 *        pt-trace    the tracer from a canvas decode of the drawing (the @3x source and the published 512 px copy)
 *   htd  htd-vector  compile + the four laws (raster of the drawn shapes)
 *   cbn  cbn-lineart compose + segment (the library drawing trimmed, resized, flipped by a canvas)
 *   fd   fd-scene    layers + the Color-by-Number sampler + a rendered panel
 *   sil  silhouette  the 24 × 24 shape signatures, the distinct-pick, the art extents, the silhouette PNG
 * Each browser run is timed (performance.now) at CPU throttle 1× and --throttle× (6× ≈ a 2019 iPad, S5) and its heap
 * delta recorded (performance.memory, before/after and after gc).
 *
 *   node scripts/makers/spikes/s6-picture-engines.js [--cases=hm,pt,htd,cbn,fd,sil] [--assets=512|3x] [--throttle=6]
 *   → out/s6/results-<assets>.json + a markdown table on stdout (the report: docs/makers/spikes/S6-picture-engines.md)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const esbuild = require('esbuild');
const puppeteer = require('puppeteer');

const REPO = path.resolve(__dirname, '..', '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const CASES = String(args.cases || 'hm,pt,htd,cbn,fd,sil').split(',');
const ASSETS = String(args.assets || '512');          // which picture set the browser sees as /makers-assets/themes-512/
const THROTTLE = Number(args.throttle || 6);
const OUT = path.join(REPO, 'out', 's6');
fs.mkdirSync(OUT, { recursive: true });
const rel = (p) => path.relative(REPO, p).replace(/\\/g, '/');
const u8 = (b64) => new Uint8Array(Buffer.from(b64, 'base64'));
const b64 = (arr) => Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength).toString('base64');
/** share of equal entries of two masks + the IoU of their set pixels */
function agree(a, b) {
  if (a.length !== b.length) return { equal: 0, iou: 0, n: a.length, m: b.length };
  let eq = 0, inter = 0, uni = 0;
  for (let i = 0; i < a.length; i++) { const x = a[i] ? 1 : 0, y = b[i] ? 1 : 0; if (x === y) eq++; if (x && y) inter++; if (x || y) uni++; }
  return { equal: +(eq / a.length).toFixed(5), iou: uni ? +(inter / uni).toFixed(5) : 1, n: a.length };
}
const r3 = (v) => +Number(v).toFixed(3);

/* ---------------------------------------------------------------- the bundle (the makers' own plugin) */
async function buildBundle() {
  const { makerPlugin } = require('../build-bundles.js');
  const entry = path.join(OUT, '.entry.js');
  const imp = (name, f) => `import ${name} from ${JSON.stringify(path.join(WG, f).replace(/\\/g, '/'))};`;
  const src = [
    imp('platform', 'lib/platform/index.js'), imp('HM', 'lib/hm-verify.js'), imp('PT', 'lib/pt-trace.js'), imp('PV', 'lib/pt-verify.js'),
    imp('HV', 'lib/htd-vector.js'), imp('CL', 'lib/cbn-lineart.js'), imp('FD', 'lib/fd-scene.js'), imp('SI', 'image-cache/silhouette.js'),
    imp('RS', 'image-cache/resolve.js'), imp('RNG', 'lib/rng.js'), imp('LA', 'data/cbn/lineart-designs.js'), imp('SC', 'data/cbn/lineart-scenes.js'),
    imp('PS', 'lib/pt-scene.js'), imp('FS', 'data/b9/face-scenes.js'),
    ...['cat', 'dog', 'mushroom', 'bee'].map((k) => imp('HTDV_' + k, 'data/htdv/src/' + k + '.js')),
    'export { platform, HM, PT, PV, HV, CL, FD, SI, RS, RNG, LA, SC, PS, FS };',
    'export const HTDV = { cat: HTDV_cat, dog: HTDV_dog, mushroom: HTDV_mushroom, bee: HTDV_bee };',
  ].join('\n');
  fs.writeFileSync(entry, src);
  const offenders = [];
  const r = await esbuild.build({ entryPoints: { 's6-engines': entry }, bundle: true, format: 'esm', target: ['chrome100'], outdir: OUT, metafile: true, plugins: [makerPlugin([], offenders)], logLevel: 'error', define: { 'process.env.NODE_ENV': '"production"' } });
  if (offenders.length) throw new Error('Node-only modules reachable from the S6 bundle:\n  ' + [...new Set(offenders)].join('\n  '));
  const lint = require('../lint-browser-safe.js').check(Object.keys(r.metafile.inputs).filter((k) => !k.includes(':')), REPO);
  if (lint.length) throw new Error('browser-safety lint failed:\n  ' + lint.join('\n  '));
  const js = Object.entries(r.metafile.outputs).find(([f]) => f.endsWith('.js'));
  return { file: path.join(OUT, 's6-engines.js'), bytes: js[1].bytes, inputs: Object.keys(r.metafile.inputs).length };
}

/* ---------------------------------------------------------------- a server: the bundle, the pictures, the data */
function serve() {
  const types = { '.js': 'text/javascript', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png' };
  const pics = path.join(WG, 'cache', ASSETS === '3x' ? 'themes' : 'themes-512');
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split('?')[0]);
    let f = null;
    if (u === '/') { res.writeHead(200, { 'content-type': 'text/html' }); return res.end('<!doctype html><title>s6</title>'); }
    if (u.startsWith('/makers-assets/themes-512/')) f = path.join(pics, u.slice('/makers-assets/themes-512/'.length));
    else if (u.startsWith('/repo/')) f = path.join(REPO, u.slice(6));
    else if (u.startsWith('/s6/')) f = path.join(OUT, u.slice(4));
    if (!f || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'content-type': types[path.extname(f)] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((r) => server.listen(0, () => r(server)));
}

/* ---------------------------------------------------------------- one page the way the catalogue builds it */
const { loadType } = require(path.join(WG, 'lib', 'load-types.js'));
const { makeRng, instanceSeed } = require(path.join(WG, 'lib', 'rng.js'));
const { buildPage } = require(path.join(WG, 'page', 'shell.js'));
const { resolveStrings } = require(path.join(WG, 'i18n', 'strings.js'));
async function nodePage(typeId, { locale = 'en', difficulty = 2, theme = null, unit = null, variant = 1 } = {}) {
  const type = loadType(typeId);
  const rng = makeRng(instanceSeed({ typeId, theme, difficulty, seedEpoch: 1, variant, unit }));
  const built = await type.build({ theme, difficulty, locale, unit }, { rng, variant });
  const s = resolveStrings(typeId, locale, type);
  return { type, html: buildPage({ title: s.printTitle || s.title, instruction: s.instruction, bodyHtml: built.bodyHtml, locale, pageSize: locale === 'en' ? 'letter' : 'a4' }) };
}

/* ---------------------------------------------------------------- the browser side: timed, memory-sampled */
function browserRunner(page) {
  return async function run(fnSource, arg, { rate = 1 } = {}) {
    const cdp = await page.target().createCDPSession();
    await cdp.send('Emulation.setCPUThrottlingRate', { rate });
    const r = await page.evaluate(async (src, a) => {
      const M = window.__S6;
      const fn = new Function('M', 'a', 'return (' + src + ')(M, a)');
      if (window.gc) window.gc();
      const m0 = performance.memory ? performance.memory.usedJSHeapSize : 0;
      const t0 = performance.now();
      const out = await fn(M, a);
      const ms = performance.now() - t0;
      const m1 = performance.memory ? performance.memory.usedJSHeapSize : 0;
      if (window.gc) window.gc();
      const m2 = performance.memory ? performance.memory.usedJSHeapSize : 0;
      return { out, ms: +ms.toFixed(1), heapMB: +((m1 - m0) / 1048576).toFixed(1), retainedMB: +((m2 - m0) / 1048576).toFixed(1) };
    }, fnSource, arg);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    await cdp.detach();
    return r;
  };
}
/** time the same browser call at 1× and THROTTLE×; keep the 1× result */
async function timed(run, fnSource, arg) {
  const a = await run(fnSource, arg, { rate: 1 });
  const b = await run(fnSource, arg, { rate: THROTTLE });
  return { ...a, msThrottled: b.ms };
}
const nodeTimed = async (fn) => { const t0 = process.hrtime.bigint(); const out = await fn(); return { out, ms: +(Number(process.hrtime.bigint() - t0) / 1e6).toFixed(1) }; };

/* ================================================================ cases */
const results = { assets: ASSETS, throttle: THROTTLE, date: new Date().toISOString(), cases: {} };

async function caseHm(run, browser) {
  const HMn = require(path.join(WG, 'lib', 'hm-verify.js'));
  const Pn = require(path.join(WG, 'lib', 'platform', 'index.js'));
  const pg = await browser.newPage();
  await pg.setViewport({ width: 703, height: 945, deviceScaleFactor: 2 });
  const tmp = path.join(OUT, '.hm'); fs.mkdirSync(tmp, { recursive: true });
  const rows = [];
  for (const [id, d, loc] of [['K-405', 1, 'en'], ['K-405', 2, 'de'], ['K-406', 2, 'en'], ['K-408', 2, 'nl'], ['G1-420', 2, 'en'], ['G1-422', 2, 'fr'], ['G1-423', 2, 'en'], ['G1-426', 2, 'sv'], ['G2-393', 2, 'de']]) {
    let p; try { p = await nodePage(id, { difficulty: d, locale: loc }); } catch (e) { rows.push({ id, loc, error: 'build: ' + e.message.slice(0, 80) }); continue; }
    const f = path.join(tmp, `${id}-${loc}.html`); fs.writeFileSync(f, p.html);
    await pg.goto(require('url').pathToFileURL(f).href, { waitUntil: 'networkidle0' });
    await pg.evaluate(() => document.fonts.ready);
    // the catalogue's oracle, exactly as K-405.verify runs it (screenshot → sharp → analyzeRgba)
    const nodeV = await nodeTimed(() => p.type.verify(pg));
    const info = await pg.evaluate(() => { const svg = document.querySelector('svg[data-lcs-hm-graph]'); const r = svg.getBoundingClientRect(); return { svg: svg.outerHTML, graph: JSON.parse(svg.getAttribute('data-lcs-hm-graph')), clip: { x: r.left + window.scrollX, y: r.top + window.scrollY, width: r.width, height: r.height }, w: svg.viewBox.baseVal.width, h: svg.viewBox.baseVal.height }; });
    const dpr = 2, scale = (info.clip.width / info.w) * dpr;
    const png = await pg.screenshot({ clip: info.clip });
    const shot = await Pn.picture.decode(png);
    // the browser's oracle: the scene SVG the page shows, its picture hrefs re-pointed at the served set
    const svg = info.svg.replace(/file:\/\/\/[^"]*?\/cache\/themes(?:-512)?\//g, '/makers-assets/themes-512/');
    const w = Math.round(info.w * scale), h = Math.round(info.h * scale);
    const br = await timed(run, `async (M, a) => {
      const issues = await M.HM.analyzeSvg({ svg: a.svg, graph: a.graph, scale: a.scale });
      const D = a.graph.hex ? new Uint8Array(0) : await M.HM.rasterDeclared(a.graph, a.w, a.h, a.scale);
      const { data } = await M.platform.picture.rasterSvg(a.svg, { width: a.w, height: a.h, background: '#fff' });
      const hex = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16)); const [fr, fg, fb] = hex(a.graph.fill);
      const Mm = new Uint8Array(a.w * a.h); for (let i = 0; i < Mm.length; i++) Mm[i] = Math.abs(data[i * 4] - fr) <= 18 && Math.abs(data[i * 4 + 1] - fg) <= 18 && Math.abs(data[i * 4 + 2] - fb) <= 18 ? 1 : 0;
      const enc = (u) => { let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); };
      return { issues, D: enc(D), M: enc(Mm) };
    }`, { svg, graph: info.graph, scale, w, h });
    // the maker would judge the page at its CSS size (scale 1, ENGINES-ART §8.2): the same oracle at a quarter of the pixels
    const br1 = await timed(run, `async (M, a) => ({ issues: await M.HM.analyzeSvg({ svg: a.svg, graph: a.graph, scale: 1 }) })`, { svg, graph: info.graph });
    const Dn = info.graph.hex ? new Uint8Array(0) : await HMn.rasterDeclared(info.graph, shot.width, shot.height, scale);
    const hex = (x) => [1, 3, 5].map((i) => parseInt(x.slice(i, i + 2), 16)); const [fr, fg, fb] = hex(info.graph.fill);
    const Mn = new Uint8Array(shot.width * shot.height); for (let i = 0; i < Mn.length; i++) Mn[i] = Math.abs(shot.data[i * 4] - fr) <= 18 && Math.abs(shot.data[i * 4 + 1] - fg) <= 18 && Math.abs(shot.data[i * 4 + 2] - fb) <= 18 ? 1 : 0;
    const Db = u8(br.out.D), Mb = u8(br.out.M);
    rows.push({ id, loc, face: info.graph.hex ? 'hex' : info.graph.strands ? 'strands' : info.graph.line ? 'line' : info.graph.tree ? 'tree' : 'looped', scale: r3(scale), px: `${shot.width}×${shot.height}` + (shot.width === w && shot.height === h ? '' : ` vs ${w}×${h}`),
      nodeIssues: nodeV.out, browserIssues: br.out.issues, identical: JSON.stringify(nodeV.out) === JSON.stringify(br.out.issues),
      declared: agree(Dn, Db), seen: agree(Mn, Mb), nodeMs: nodeV.ms, browserMs: br.ms, browserMsThrottled: br.msThrottled, heapMB: br.heapMB, retainedMB: br.retainedMB,
      scale1: { issues: br1.out.issues, identical: JSON.stringify(nodeV.out) === JSON.stringify(br1.out.issues), browserMs: br1.ms, browserMsThrottled: br1.msThrottled, heapMB: br1.heapMB } });
    process.stderr.write('hm ' + id + ' ');
  }
  await pg.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  results.cases.hm = rows;
}

async function casePt(run) {
  const PTn = require(path.join(WG, 'lib', 'pt-trace.js'));
  const PVn = require(path.join(WG, 'lib', 'pt-verify.js'));
  const LIB = path.join(WG, 'cache', 'themes');
  const rows = [];
  for (const k of ['animals bw/giraffe', 'beach bw/sun', 'farm bw/barn', 'nature bw/tree', 'animals bw/whale', 'beach bw/starfish', 'animals bw 2/cat', 'farm bw/duck']) {
    const file = path.join(LIB, k + '@3x.webp');
    if (!fs.existsSync(file)) { rows.push({ k, error: 'no such drawing' }); continue; }
    const tn = await nodeTimed(() => PTn.traceDrawing(file));
    const tr = tn.out;
    const cn = await PVn.coverage(tr); const lawsN = await PVn.tracerLaws(tr);
    const pack = { W: tr.W, H: tr.H, sw: tr.sw, paths: tr.paths, blobs: tr.blobs, skeleton: b64(tr.skeleton), ink: b64(tr.ink), ...(tr.coreSkeleton ? { coreSkeleton: b64(tr.coreSkeleton) } : {}) };
    // (a) pt-verify on the SAME trace: only the raster differs
    const v = await timed(run, `async (M, a) => {
      const dec = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
      const tr = { ...a, skeleton: dec(a.skeleton), ink: dec(a.ink), coreSkeleton: a.coreSkeleton ? dec(a.coreSkeleton) : undefined };
      const c = await M.PV.coverage(tr); const laws = await M.PV.tracerLaws(tr);
      const enc = (u) => { let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); };
      return { miss: c.miss, outside: c.outside, skeletonPx: c.skeletonPx, laws, missMask: enc(c.missMask), outMask: enc(c.outMask) };
    }`, pack);
    // (b) the tracer from a canvas decode of the served picture
    const t = await timed(run, `async (M, a) => {
      const tr = await M.PT.traceDrawing(a.file);
      const laws = await M.PV.tracerLaws(tr);
      const enc = (u) => { let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); };
      return { W: tr.W, H: tr.H, sw: tr.sw, nPaths: tr.paths.length, nBlobs: tr.blobs.length, len: tr.paths.reduce((s, p) => s + p.len, 0), inkBox: tr.inkBox, laws, ink: enc(tr.ink), paths: tr.paths, blobs: tr.blobs, skeleton: enc(tr.skeleton) };
    }`, { file: rel(file) });
    const bt = t.out;
    const inkB = u8(bt.ink);
    // the browser's trace judged by the NODE laws (sharp raster): does the Node gate accept what the browser traced?
    let nodeLawsOnBrowserTrace = null;
    if (bt.W === tr.W && bt.H === tr.H) nodeLawsOnBrowserTrace = await PVn.tracerLaws({ W: bt.W, H: bt.H, sw: bt.sw, paths: bt.paths, blobs: bt.blobs, skeleton: u8(bt.skeleton), ink: inkB });
    rows.push({ k, work: `${tr.W}×${tr.H}` + (bt.W === tr.W && bt.H === tr.H ? '' : ` vs ${bt.W}×${bt.H}`),
      verify: { nodeMiss: r3(cn.miss), browserMiss: r3(v.out.miss), nodeOutside: r3(cn.outside), browserOutside: r3(v.out.outside), skeletonPx: [cn.skeletonPx, v.out.skeletonPx], lawsNode: lawsN, lawsBrowser: v.out.laws, missMask: agree(cn.missMask, u8(v.out.missMask)), outMask: agree(cn.outMask, u8(v.out.outMask)), browserMs: v.ms, browserMsThrottled: v.msThrottled, heapMB: v.heapMB },
      trace: { sw: [r3(tr.sw), r3(bt.sw)], paths: [tr.paths.length, bt.nPaths], blobs: [tr.blobs.length, bt.nBlobs], len: [Math.round(tr.paths.reduce((s, p) => s + p.len, 0)), Math.round(bt.len)], inkBox: [tr.inkBox, bt.inkBox], ink: bt.W === tr.W && bt.H === tr.H ? agree(tr.ink, inkB) : 'size differs', lawsBrowser: bt.laws, nodeLawsOnBrowserTrace, nodeMs: tn.ms, browserMs: t.ms, browserMsThrottled: t.msThrottled, heapMB: t.heapMB, retainedMB: t.retainedMB } });
    process.stderr.write('pt ' + k + ' ');
  }
  // the maker path (ENGINES-ART §7.2): the scene composed from SHIPPED traces — Node's traces primed into the browser's
  // pt-scene cache — must give Node's SVG byte for byte (only the model picture's href differs: base64 here, the CDN there)
  const PS = require(path.join(WG, 'lib', 'pt-scene.js'));
  const { sceneFor } = require(path.join(WG, 'data', 'b9', 'face-scenes.js'));
  const norm = (svg) => svg.replace(/href="data:image\/webp;base64,[^"]+"/g, 'href="ASSET"').replace(/href="\/makers-assets\/[^"]+"/g, 'href="ASSET"');
  const scenes = [];
  for (const mode of ['first-tracing', 'look-then-trace', 'trace-and-color', 'trace-and-count', 'finish-the-picture']) {
    const sc = sceneFor(mode, {}); if (!sc) { scenes.push({ mode, error: 'no scene' }); continue; }
    const n = await nodeTimed(() => PS.composeScene(sc));
    const srcs = [...new Set(n.out.placed.filter((p) => !p.motif).map((p) => p.src))];
    // the composer also reads tr.body (what a drawing hides of the things behind it): the store must carry it — measured
    // here as a run-length size (2 bytes per run), what a packed store would cost
    const traces = {}; let bodyRle = 0;
    for (const k of srcs) { const tr = await PS.traceOf(k); traces[k] = { W: tr.W, H: tr.H, sw: tr.sw, paths: tr.paths, blobs: tr.blobs, inkBox: tr.inkBox, body: b64(tr.body) }; let runs = 1; for (let i = 1; i < tr.body.length; i++) if (tr.body[i] !== tr.body[i - 1]) runs++; bodyRle += runs * 2; }
    const b = await timed(run, `async (M, a) => {
      const dec = (x) => Uint8Array.from(atob(x), (c) => c.charCodeAt(0));
      for (const [k, tr] of Object.entries(a.traces)) M.PS.primeTrace(k, { ...tr, body: dec(tr.body) });
      const sc = M.FS.sceneFor(a.mode, {});
      const out = await M.PS.composeScene(sc);
      return { svg: out.svg, problems: out.problems, metrics: out.metrics };
    }`, { mode, traces });
    scenes.push({ mode, pictures: srcs.length, traceKB: +((JSON.stringify(traces).length - Object.values(traces).reduce((t, x) => t + x.body.length, 0)) / 1024).toFixed(0), bodyRleKB: +(bodyRle / 1024).toFixed(0), svgIdentical: norm(n.out.svg) === norm(b.out.svg), problems: [n.out.problems, b.out.problems], nodeMs: n.ms, browserMs: b.ms, browserMsThrottled: b.msThrottled, heapMB: b.heapMB });
    process.stderr.write('pt-scene ' + mode + ' ');
  }
  results.cases.ptScene = scenes;
  results.cases.pt = rows;
}

async function caseHtd(run) {
  const V = require(path.join(WG, 'lib', 'htd-vector.js'));
  const rows = [];
  for (const k of ['cat', 'dog', 'mushroom', 'bee']) {
    const src = require(path.join(WG, 'data', 'htdv', 'src', k + '.js'));
    const n = await nodeTimed(() => V.compile(src, { report: true }));
    const parts = src.parts.map((p) => ({ kind: 'shape', ...p }));
    const finalN = await V.raster(V.svgOf(parts));
    const b = await timed(run, `async (M, a) => {
      const S = await M.HV.compile(M.HTDV[a.k], { report: true });
      const parts = M.HTDV[a.k].parts.map((p) => ({ kind: 'shape', ...p }));
      const m = await M.HV.raster(M.HV.svgOf(parts));
      const enc = (u) => { let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); };
      return { S, final: enc(m) };
    }`, { k });
    const Sn = n.out, Sb = b.out.S;
    const g = (S) => S.stats.laws.guides.map((x) => ({ id: x.id, share: x.share, onInk: x.onInk, runs: x.runs }));
    rows.push({ k, fails: [Sn.stats.fails, Sb.stats.fails], failsIdentical: JSON.stringify(Sn.stats.fails) === JSON.stringify(Sb.stats.fails),
      guides: { node: g(Sn), browser: g(Sb) }, erase: [Sn.stats.laws.erase, Sb.stats.laws.erase], missing: [Sn.stats.missing, Sb.stats.missing], totalPx: [Sn.stats.totalPx, Sb.stats.totalPx],
      bbox: [Sn.bbox, Sb.bbox], shares: [Sn.steps.map((s) => s.share), Sb.steps.map((s) => s.share)], fullIdentical: Sn.full === Sb.full, stepsIdentical: Sn.steps.every((s, i) => Sb.steps[i] && s.d === Sb.steps[i].d),
      finalMask: agree(finalN, u8(b.out.final)), nodeMs: n.ms, browserMs: b.ms, browserMsThrottled: b.msThrottled, heapMB: b.heapMB, retainedMB: b.retainedMB });
    process.stderr.write('htd ' + k + ' ');
  }
  results.cases.htd = rows;
}

async function caseCbn(run) {
  const L = require(path.join(WG, 'lib', 'cbn-lineart.js'));
  const { LINEART } = require(path.join(WG, 'data', 'cbn', 'lineart-designs.js'));
  const rows = [];
  for (const id of ['cat', 'farm-sheep', 'airplane', 'pond-duck']) {
    const d = LINEART.find((x) => x.id === id); if (!d) { rows.push({ id, error: 'no such design' }); continue; }
    const n = await nodeTimed(async () => { const ink = await L.compose(d); const seg = L.segmentInk(ink, L.CW, L.CH, { unit: L.UNIT }); return { ink, seg }; });
    const b = await timed(run, `async (M, a) => {
      const d = M.LA.LINEART.find((x) => x.id === a.id);
      const t0 = performance.now(); const ink = await M.CL.compose(d); const composeMs = performance.now() - t0;
      const seg = M.CL.segmentInk(ink, M.CL.CW, M.CL.CH, { unit: M.CL.UNIT });
      const enc = (u) => { let s = ''; for (let i = 0; i < u.length; i += 8192) s += String.fromCharCode.apply(null, u.subarray(i, i + 8192)); return btoa(s); };
      return { ink: enc(ink), owner: enc(new Uint8Array(ink.owner.buffer)), composeMs: +composeMs.toFixed(1), regions: seg.regions.map((r) => ({ d: r.d, area: Math.round(r.area), r: +r.r.toFixed(1), outside: r.outside, orphan: !!r.orphan })), inkD: seg.ink };
    }`, { id });
    const inkB = u8(b.out.ink), ownerB = new Int16Array(u8(b.out.owner).buffer);
    let ownerEq = 0; for (let i = 0; i < ownerB.length; i++) if (ownerB[i] === n.out.ink.owner[i]) ownerEq++;
    const rn = n.out.seg.regions, rb = b.out.regions;
    const big = (rs) => rs.filter((r) => !r.outside && !r.orphan && r.area >= 100).length;
    let sameD = 0; for (let i = 0; i < Math.min(rn.length, rb.length); i++) if (rn[i].d === rb[i].d) sameD++;
    rows.push({ id, kind: d.kind, items: (d.items || []).length, ink: agree(n.out.ink, inkB), owner: +(ownerEq / ownerB.length).toFixed(5), regions: [rn.length, rb.length], bigRegions: [big(rn), big(rb)], identicalRegionPaths: sameD, inkPathIdentical: n.out.seg.ink === b.out.inkD,
      nodeMs: n.ms, browserMs: b.ms, browserComposeMs: b.out.composeMs, browserMsThrottled: b.msThrottled, heapMB: b.heapMB, retainedMB: b.retainedMB });
    process.stderr.write('cbn ' + id + ' ');
  }
  results.cases.cbn = rows;
}

async function caseFd(run) {
  const F = require(path.join(WG, 'lib', 'fd-scene.js'));
  const { SCENES } = require(path.join(WG, 'data', 'cbn', 'lineart-scenes.js'));
  const rows = [];
  for (const spec of [SCENES[0], SCENES[7]]) {
    const n = await nodeTimed(() => F.buildLayers(spec));
    const sn = n.out;
    const samplerN = await F.cbnSampler(spec.id);
    const probes = sn.items.flatMap((l) => l.regions.map((r) => [r.px, r.py]));
    const b = await timed(run, `async (M, a) => {
      const spec = M.SC.SCENES[a.i];
      const scene = await M.FD.buildLayers(spec);
      const sampler = await M.FD.cbnSampler(spec.id);
      const samples = a.probes.map(([x, y]) => sampler ? sampler(x, y) : null);
      const strip = JSON.parse(JSON.stringify(scene, (k, v) => (k.startsWith('_') ? undefined : v)));
      return { strip, samples, panel: M.FD.renderPanel(scene, [{ kind: 'remove', item: 0 }], { mode: 'colour' }), panelLine: M.FD.renderPanel(scene, [{ kind: 'mirror', item: scene.items.length - 1 }], { mode: 'line' }) };
    }`, { i: SCENES.indexOf(spec), probes });
    const sb = b.out.strip;
    // the maker path (ENGINES-ART §3.2): the SHIPPED scene (Node's layers, as data/fd/<id>.json carries them) composed and
    // rendered in the browser must be Node's panel byte for byte
    const shipped = JSON.parse(JSON.stringify(sn, (k, v) => (k.startsWith('_') ? undefined : v)));
    const ops = [{ kind: 'remove', item: 0 }, { kind: 'mirror', item: sn.items.length - 1 }, { kind: 'move', item: 1, dx: 30, dy: -12 }, { kind: 'colour', item: 2, region: 0, colour: 'red' }];
    const fromShipped = await timed(run, `async (M, a) => ({ colour: M.FD.renderPanel(a.scene, a.ops, { mode: 'colour', hotspots: [{ bbox: [10, 10, 60, 60], diff: true, label: 'x' }] }), line: M.FD.renderPanel(a.scene, a.ops.slice(0, 2), { mode: 'line', rings: [[100, 100, 200, 180]], ringHalo: true, ringIndex: true }) })`, { scene: shipped, ops });
    const shippedIdentical = fromShipped.out.colour === F.renderPanel(shipped, ops, { mode: 'colour', hotspots: [{ bbox: [10, 10, 60, 60], diff: true, label: 'x' }] }) && fromShipped.out.line === F.renderPanel(shipped, ops.slice(0, 2), { mode: 'line', rings: [[100, 100, 200, 180]], ringHalo: true, ringIndex: true });
    const panelN = F.renderPanel(sn, [{ kind: 'remove', item: 0 }], { mode: 'colour' });
    const panelLineN = F.renderPanel(sn, [{ kind: 'mirror', item: sn.items.length - 1 }], { mode: 'line' });
    const samplesN = probes.map(([x, y]) => (samplerN ? samplerN(x, y) : null));
    let sameSample = 0; samplesN.forEach((c, i) => { if (c === b.out.samples[i]) sameSample++; });
    const layers = sn.items.map((l, i) => { const m = sb.items[i]; return { src: l.src, regions: [l.regions.length, m ? m.regions.length : null], colours: m ? l.regions.filter((r, k) => m.regions[k] && m.regions[k].colour === r.colour).length : 0, asym: [l.asym, m ? m.asym : null], inkUnits: [l.inkUnits, m ? m.inkUnits : null], bboxSame: m ? JSON.stringify(l.bbox) === JSON.stringify(m.bbox) : false }; });
    rows.push({ id: spec.id, inherited: [sn.inherited, sb.inherited], bgRegions: [sn.bg.regions.length, sb.bg.regions.length], layers, samplerAgree: `${sameSample}/${probes.length}`, panelColourIdentical: panelN === b.out.panel, panelLineIdentical: panelLineN === b.out.panelLine,
      fromShippedLayers: { identical: shippedIdentical, sceneKB: +(JSON.stringify(shipped).length / 1024).toFixed(0), browserMs: fromShipped.ms, browserMsThrottled: fromShipped.msThrottled },
      nodeMs: n.ms, browserMs: b.ms, browserMsThrottled: b.msThrottled, heapMB: b.heapMB, retainedMB: b.retainedMB });
    process.stderr.write('fd ' + spec.id + ' ');
  }
  results.cases.fd = rows;
}

async function caseSil(run) {
  const Si = require(path.join(WG, 'image-cache', 'silhouette.js'));
  const { labelSafeNouns } = require(path.join(WG, 'image-cache', 'resolve.js'));
  const Pn = require(path.join(WG, 'lib', 'platform', 'index.js'));
  const rows = [];
  for (const theme of ['animals', 'fruits', 'toys']) {
    const nouns = labelSafeNouns(theme).slice(0, 14);
    const masksN = []; for (const nn of nouns) masksN.push(await Si.maskSignature(theme, nn.noun));
    const extN = []; for (const nn of nouns.slice(0, 6)) extN.push(await Si.artExtent(theme, nn.noun));
    const picksN = []; for (let seed = 1; seed <= 6; seed++) picksN.push((await Si.pickDistinctSilhouettes(theme, nouns, 6, makeRng(instanceSeed({ typeId: 'K-057', theme, difficulty: 2, seedEpoch: 1, variant: seed, unit: null })))).map((x) => x.noun));
    const b = await timed(run, `async (M, a) => {
      const nouns = M.RS.labelSafeNouns(a.theme).slice(0, 14);
      const masks = []; for (const nn of nouns) masks.push(await M.SI.maskSignature(a.theme, nn.noun));
      const ext = []; for (const nn of nouns.slice(0, 6)) ext.push(await M.SI.artExtent(a.theme, nn.noun));
      const picks = []; for (let seed = 1; seed <= 6; seed++) picks.push((await M.SI.pickDistinctSilhouettes(a.theme, nouns, 6, M.RNG.makeRng(M.RNG.instanceSeed({ typeId: 'K-057', theme: a.theme, difficulty: 2, seedEpoch: 1, variant: seed, unit: null })))).map((x) => x.noun));
      const png = await M.SI.silhouetteUri(a.theme, nouns[0].noun);
      return { masks, ext, picks, png, noun0: nouns[0].noun };
    }`, { theme });
    let bits = 0, same = 0; masksN.forEach((m, i) => m.forEach((v, j) => { bits++; if (v === b.out.masks[i][j]) same++; }));
    // the IoU every pair gets, Node vs browser: how far the distinctness decision can move
    let maxIouDelta = 0; for (let i = 0; i < nouns.length; i++) for (let j = i + 1; j < nouns.length; j++) maxIouDelta = Math.max(maxIouDelta, Math.abs(Si.maskIoU(masksN[i], masksN[j]) - Si.maskIoU(b.out.masks[i], b.out.masks[j])));
    let maxExt = 0; extN.forEach((e, i) => { for (const k of Object.keys(e)) maxExt = Math.max(maxExt, Math.abs(e[k] - b.out.ext[i][k])); });
    const samePicks = picksN.filter((p, i) => JSON.stringify(p) === JSON.stringify(b.out.picks[i])).length;
    // the silhouette PNG: the browser's data URL decoded beside the Node file
    const nodePng = await Si.silhouetteUri(theme, nouns[0].noun);
    const A = await Pn.picture.decode(fs.readFileSync(require('url').fileURLToPath(nodePng)));
    const B = await Pn.picture.decode(Buffer.from(b.out.png.split(',')[1], 'base64'));
    let eqPx = 0, maxD = 0, alphaEq = 0; const n = Math.min(A.width * A.height, B.width * B.height);
    for (let i = 0; i < n; i++) { let d = 0; for (let c = 0; c < 4; c++) d = Math.max(d, Math.abs(A.data[i * 4 + c] - B.data[i * 4 + c])); if (!d) eqPx++; if (A.data[i * 4 + 3] === B.data[i * 4 + 3]) alphaEq++; if (d > maxD) maxD = d; }
    rows.push({ theme, nouns: nouns.length, maskBitsEqual: +(same / bits).toFixed(5), maxIouDelta: r3(maxIouDelta), samePicks: `${samePicks}/6`, maxExtentDelta: +maxExt.toFixed(4), png: { size: `${A.width}×${A.height}` + (A.width === B.width && A.height === B.height ? '' : ` vs ${B.width}×${B.height}`), pixelsIdentical: +(eqPx / n).toFixed(4), alphaIdentical: +(alphaEq / n).toFixed(4), maxChannelDelta: maxD },
      browserMs: b.ms, browserMsThrottled: b.msThrottled, heapMB: b.heapMB, retainedMB: b.retainedMB });
    process.stderr.write('sil ' + theme + ' ');
  }
  results.cases.sil = rows;
}

/* ================================================================ main */
async function main() {
  const bundle = await buildBundle();
  results.bundle = { bytes: bundle.bytes, inputs: bundle.inputs };
  const server = await serve();
  const port = server.address().port;
  const browser = await puppeteer.launch({ args: ['--enable-precise-memory-info', '--js-flags=--expose-gc'] });
  const page = await browser.newPage();
  page.on('pageerror', (e) => console.log('pageerror', e.message));
  page.on('console', (m) => { if (m.type() === 'error') console.log('console', m.text()); });
  page.on('response', (r) => { if (r.status() === 404) console.log('404', r.url()); });
  await page.goto(`http://localhost:${port}/`);
  // the data the engines read (what a maker's data-manifest would preload)
  const preload = {};
  const lineartDir = path.join(WG, 'data', 'cbn', 'lineart');
  for (const f of ['cache/manifest.json', 'data/art-extents.json', 'data/hm/ink-boxes.json', 'data/cbn/labels.json', ...fs.readdirSync(lineartDir).map((x) => 'data/cbn/lineart/' + x)]) {
    const p = path.join(WG, f); if (fs.existsSync(p)) preload['scripts/worksheet-gen/' + f] = fs.readFileSync(p, 'utf8');
  }
  await page.evaluate(async (pre) => { window.__S6 = await import('/s6/s6-engines.js'); window.__S6.platform.preload(pre); }, preload);
  const run = browserRunner(page);
  const t0 = Date.now();
  if (CASES.includes('hm')) await caseHm(run, browser);
  if (CASES.includes('pt')) await casePt(run);
  if (CASES.includes('htd')) await caseHtd(run);
  if (CASES.includes('cbn')) await caseCbn(run);
  if (CASES.includes('fd')) await caseFd(run);
  if (CASES.includes('sil')) await caseSil(run);
  await browser.close(); server.close();
  results.seconds = +((Date.now() - t0) / 1000).toFixed(1);
  const file = path.join(OUT, `results-${ASSETS}.json`);
  // cases merge into an existing results file (a run of --cases=hm keeps the other cases' rows)
  if (fs.existsSync(file)) { try { const old = JSON.parse(fs.readFileSync(file, 'utf8')); results.cases = { ...(old.cases || {}), ...results.cases }; } catch (e) { /* a fresh file */ } }
  fs.writeFileSync(file, JSON.stringify(results, null, 1));
  console.log(`\nbundle ${(bundle.bytes / 1024).toFixed(0)} KB raw (${bundle.inputs} files) · assets ${ASSETS} · ${results.seconds} s → ${rel(file)}`);
  console.log(JSON.stringify(results.cases, null, 1));
}

main().catch((e) => { console.error(e); process.exit(1); });
