#!/usr/bin/env node
/* =====================================================================
   sep-generate.js — the PROGRAMMATIC (headless) SEP-exercise pipeline.

   Takes an exercise SPEC (app, family, params, vocabKeys, seed, locale) and
   emits a Storybook Exercise Package — transparent-alpha visual + crop-space
   sep-1 descriptor — with NO human in the loop, via each app's additive
   `window.__sepGenerate(spec)` hook (seeded RNG override → reproducible;
   window.currentLocale → locale-parameterized). Writes into a story's
   exercises/<exId>/.

   The local server stubs /api/images with LOCALE-LOCALIZED names from
   image-vocabulary.js (the es name for 'cat' = 'gato') — this is what makes
   the same spec yield an English vs Spanish exercise.

   USAGE:
     node scripts/storybook/sep-generate.js --spec '<json>' --story <id>
     node scripts/storybook/sep-generate.js --from-blueprint <id>   (materializes every page exerciseSpec)
   Spec: {app, family, params:{theme,count}, vocabKeys?:[], seed, locale, exId}
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const http = require('http');
const vm = require('vm');
const puppeteer = require('puppeteer');

const REPO = path.join(__dirname, '..', '..');
const PUB = path.join(REPO, 'frontend', 'public');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

/* ---- IMAGE_VOCABULARY for localized image names ---- */
let VOCAB = null;
function loadVocab() {
  if (VOCAB) return VOCAB;
  try {
    const src = fs.readFileSync(path.join(REPO, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8');
    const sb = {}; sb.window = sb; vm.createContext(sb);
    /* IMAGE_VOCABULARY is a top-level `const` (not a context property) — extract it explicitly */
    vm.runInContext(src + '\n;globalThis.__VOCAB = (typeof IMAGE_VOCABULARY !== "undefined") ? IMAGE_VOCABULARY : (this.ImageVocab && this.ImageVocab.DATA) || {};', sb, { filename: 'image-vocabulary.js' });
    VOCAB = sb.__VOCAB || {};
  } catch (e) { VOCAB = {}; }
  return VOCAB;
}
function localizedName(fileKey, locale) {
  const v = loadVocab();
  const e = v[fileKey.toLowerCase()];
  if (e && e[locale] && e[locale][0]) return e[locale][0];
  return fileKey;
}

function apiImages(u, res) {
  const theme = u.searchParams.get('theme') || '';
  const locale = u.searchParams.get('locale') || 'en';
  const search = u.searchParams.get('search') || '';
  let images = [];
  function fromTheme(t) {
    const d = path.join(PUB, 'images', t);
    if (!fs.existsSync(d)) return [];
    return fs.readdirSync(d).filter(f => /\.(png|webp|jpg)$/i.test(f)).map(f => {
      const key = f.replace(/\.\w+$/, '').replace(/\s*\d+$/, '');
      const nm = localizedName(key, locale);
      return { path: '/images/' + t + '/' + f, name: nm, word: nm, theme: t };
    });
  }
  if (theme) images = fromTheme(theme);
  else if (search) ['animals', 'food'].forEach(t => { images = images.concat(fromTheme(t).filter(i => i.word.toLowerCase().includes(search.toLowerCase()))); });
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ images, hasMore: false, total: images.length }));
}
function apiThemes(res, sub) {
  const r = path.join(PUB, sub); let th = [];
  if (fs.existsSync(r)) th = fs.readdirSync(r).filter(f => { try { return fs.statSync(path.join(r, f)).isDirectory(); } catch (e) { return false; } }).map(t => ({ value: t, id: t, name: t, displayName: t, theme: t, folderName: t, count: 1 }));
  res.writeHead(200, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(th));
}
function serve() {
  return new Promise(resolve => {
    const srv = http.createServer((req, res) => {
      const u = new URL(req.url, 'http://127.0.0.1'); let p = decodeURIComponent(u.pathname);
      if (p === '/api/images') return apiImages(u, res);
      // cryptogram's autoAssignImages fetches this + pulls the pool for its cipher symbols; return a
      // SMALL set (alphabet only — 34 imgs, enough for 26 letters) so headless assign is fast.
      if (p === '/api/themes-translated') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify([{ value: 'alphabet', id: 'alphabet', name: 'alphabet', displayName: 'Alphabet', translatedName: 'Alphabet', theme: 'alphabet', folderName: 'alphabet', count: 34 }]));
      }
      if (/\/themes$/.test(p)) return apiThemes(res, p.split('/')[2]);
      if (p.startsWith('/api/')) { res.writeHead(200, { 'Content-Type': 'application/json' }); return res.end(p.indexOf('verify') >= 0 ? '{"hasAccess":true}' : '[]'); }
      if (p === '/') p = '/index.html';
      let f = path.join(PUB, p.replace(/^\//, '')); if (p.startsWith('/image-library-webp/') && !fs.existsSync(f)) f = path.join(REPO, p.replace(/^\//, ''));
      if (fs.existsSync(f) && fs.statSync(f).isFile()) { res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' }); fs.createReadStream(f).pipe(res); }
      else { res.writeHead(404); res.end('404 ' + p); }
    });
    srv.listen(0, '127.0.0.1', () => resolve(srv));
  });
}

/* ---- generate ONE spec → package written into stories/<story>/exercises/<exId>/ ---- */
async function generateOne(browser, base, spec, storyDir) {
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(String(e).slice(0, 160)));
  await page.setViewport({ width: 1400, height: 1000 });
  // ?__sbHeadless=1 → apps that support it skip their concurrent init tail so __sepGenerate runs in
  // isolation (no concurrent Math.random consumption → seed-reproducible). Apps without the flag ignore it.
  await page.goto(base + '/worksheet-generators/' + spec.app + '.html?__sbHeadless=1', { waitUntil: 'networkidle2', timeout: 60000 });
  await page.waitForFunction('typeof window.__sepGenerate === "function"', { timeout: 30000 });
  const got = await page.evaluate(async (s) => {
    try {
      const p = await window.__sepGenerate(s);
      if (!p) return { error: 'no package' };
      const files = {};
      for (const name of Object.keys(p.files)) {
        files[name] = await new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(p.files[name]); });
      }
      return { descriptor: p.descriptor, files };
    } catch (e) { return { error: String(e).slice(0, 200) }; }
  }, spec);
  await page.close();
  if (!got || got.error) throw new Error(spec.app + '/' + spec.exId + ': ' + ((got && got.error) || 'null') + (errs.length ? ' | ' + errs[0] : ''));

  const exDir = path.join(storyDir, 'exercises', spec.exId);
  fs.mkdirSync(path.join(exDir, 'assets'), { recursive: true });
  fs.writeFileSync(path.join(exDir, 'descriptor.json'), JSON.stringify(got.descriptor, null, 2));
  for (const name of Object.keys(got.files)) {
    fs.writeFileSync(path.join(exDir, name), Buffer.from(got.files[name].split(',')[1], 'base64'));
  }
  return got.descriptor;
}

async function run(specs, storyId) {
  const storyDir = path.join(STORIES, storyId);
  fs.mkdirSync(storyDir, { recursive: true });
  const srv = await serve();
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const out = [];
  for (const spec of specs) {
    const d = await generateOne(browser, base, spec, storyDir);
    console.log('  ✓ ' + spec.exId + ' (' + spec.app + '/' + spec.family + ', ' + spec.locale + ', seed ' + spec.seed + ') — ' +
      (spec.family === 'A' ? (d.elements.slots || []).length + ' slots' : 'family ' + d.family));
    out.push({ spec, descriptor: d });
  }
  await browser.close(); srv.close();
  return out;
}

if (require.main === module) {
  const arg = (k) => { const i = process.argv.indexOf('--' + k); return i >= 0 ? process.argv[i + 1] : null; };
  const specArg = arg('spec'), story = arg('story'), bp = arg('from-blueprint');
  (async () => {
    let specs = [];
    if (specArg) specs = [JSON.parse(specArg)];
    else if (bp) {
      const b = JSON.parse(fs.readFileSync(path.join(STORIES, bp, 'blueprint.json'), 'utf8'));
      (b.pages || []).forEach((pg, i) => {
        // exerciseSpec lives on the page's interaction (blueprint-1); exId matches
        // blueprint-to-skeleton's taskData.package "exercises/ex-p<NN>" (NN zero-padded).
        const spec = (pg.interaction && pg.interaction.exerciseSpec) || pg.exerciseSpec;
        if (spec) specs.push(Object.assign({ exId: 'ex-p' + String(i + 1).padStart(2, '0') }, spec));
      });
    } else { console.error('need --spec <json> --story <id>  OR  --from-blueprint <id>'); process.exit(1); }
    await run(specs, story || bp);
    console.log('[sep-generate] done → mini tools/stories/' + (story || bp) + '/exercises/');
  })().catch(e => { console.error('[sep-generate] FAIL: ' + e.message); process.exit(1); });
}
module.exports = { run };
