// Grammar harness — loads find-and-count.html + prepositions.html locally,
// drives the exposed pure seams across the full locale matrix, DUMPS every
// rendered sentence per locale (for the native audits), and asserts the
// structural invariants. No deploy, no /api/images, no CDN.
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join('C:/Users/rkgen/lessoncraftstudio', 'node_modules', 'puppeteer'));

const REPO = 'C:/Users/rkgen/lessoncraftstudio';
const APPS = path.join(REPO, 'REFERENCE APPS');
const TRANS = path.join(REPO, 'REFERENCE TRANSLATIONS');
const MIRROR = path.join(REPO, 'frontend/public/worksheet-generators/js');
const OUTDIR = path.join(__dirname, 'dumps');
fs.mkdirSync(OUTDIR, { recursive: true });

const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const TASKS = ['circle', 'square', 'cross', 'count'];
const PREPS = ['in', 'on top of', 'under', 'next to', 'behind', 'between', 'above', 'in front of'];
const SHAPES = ['circle', 'cube', 'cylinder', 'heart', 'hexagon', 'square', 'star', 'triangle'];

// Trap-class noun sets for find-and-count (paths → ImageVocab.keyFromPath).
const FAC_SETS = [
  { name: 'single', paths: ['/images/animals/cat.png'] },
  { name: 'pair-mixed-gender', paths: ['/images/animals/cat.png', '/images/space/star.png'] },
  { name: 'triple', paths: ['/images/animals/dog.png', '/images/food/apple.png', '/images/animals/cat.png'] },
  { name: 'it-vowel', paths: ['/images/animals/elephant.png'] },
  { name: 'it-z', paths: ['/images/school/backpack.png'] },
  { name: 'it-s-impura', paths: ['/images/fruits/strawberry.png'] },
  { name: 'it-s-impura-masc', paths: ['/images/animals/ostrich.png'] },
  { name: 'fr-h-aspire', paths: ['/images/animals/hedgehog.png'] },
  { name: 'fr-h-owl', paths: ['/images/animals/owl.png'] },
  { name: 'fr-vowel', paths: ['/images/space/star.png', '/images/animals/elephant.png'] },
  { name: 'es-i-conj', paths: ['/images/animals/cat.png', '/images/animals/iguana.png'] },
  { name: 'pluralia', paths: ['/images/school/scissors.png'] },
  { name: 'vocab-miss (MUST be null)', paths: ['/images/things/zzz-not-a-word.png'], expectNull: true }
];
// Custom prepositions landmarks (non-default shapes)
const PREP_CUSTOM = [
  { name: 'custom-cat', shape: { isDefault: false, path: '/images/animals/cat.png' } },
  { name: 'custom-star', shape: { isDefault: false, path: '/images/space/star.png' } },
  { name: 'custom-flower', shape: { isDefault: false, path: '/images/flowers/tulip.png' } },
  { name: 'custom-elephant', shape: { isDefault: false, path: '/images/animals/elephant.png' } },
  { name: 'custom-boiled-egg', shape: { isDefault: false, path: '/images/food/boiled-egg.png' } },
  { name: 'upload (MUST be null)', shape: { isDefault: false, path: 'data:image/png;base64,AAA' }, expectNull: true },
  { name: 'vocab-miss (MUST be null)', shape: { isDefault: false, path: '/images/x/zzz-not-a-word.png' }, expectNull: true }
];

function serve() {
  return http.createServer((req, res) => {
    const url = req.url.split('?')[0];
    let fp = null;
    if (url.endsWith('.html')) fp = path.join(APPS, path.basename(url));
    else if (url.includes('/js/')) {
      const base = path.basename(url);
      const a = path.join(TRANS, base);
      const b = path.join(MIRROR, base);
      fp = fs.existsSync(a) ? a : (fs.existsSync(b) ? b : null);
      if (!fp) { // benign stub for helper scripts we don't need
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end('/* harness stub for ' + base + ' */');
        return;
      }
    }
    if (fp && fs.existsSync(fp)) {
      const type = fp.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/javascript; charset=utf-8';
      res.writeHead(200, { 'Content-Type': type });
      res.end(fs.readFileSync(fp));
    } else {
      res.writeHead(404); res.end('');
    }
  });
}

let failures = 0;
function fail(msg) { failures++; console.error('ASSERT FAIL: ' + msg); }

(async () => {
  const server = serve();
  await new Promise(r => server.listen(0, r));
  const port = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', (r) => {
    const u = r.url();
    if (u.startsWith('http://localhost:' + port)) r.continue();
    else r.respond({ status: 200, contentType: 'application/javascript', body: '/* blocked */' });
  });
  page.on('pageerror', e => console.log('[pageerror]', String(e).slice(0, 160)));

  const dumps = {};
  LOCALES.forEach(l => dumps[l] = []);
  const D = (loc, line) => dumps[loc].push(line);

  // ---------- FIND AND COUNT ----------
  await page.goto(`http://localhost:${port}/find-and-count.html`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction('typeof window.__lcsBuildFacInstruction === "function" && typeof window.LCSGrammar === "object"', { timeout: 15000 });

  for (const loc of LOCALES) {
    D(loc, '== FIND AND COUNT — worksheet instructions ==');
    for (const set of FAC_SETS) {
      for (const task of TASKS) {
        const out = await page.evaluate((t, paths, l) =>
          window.__lcsBuildFacInstruction(t, paths.map(p => ({ path: p })), l), task, set.paths, loc);
        if (set.expectNull) {
          if (out !== null) fail(`FaC ${loc}/${task}/${set.name}: expected null, got "${out}"`);
        } else if (out === null) {
          fail(`FaC ${loc}/${task}/${set.name}: unexpectedly null`);
        } else {
          if (/\s\s/.test(out)) fail(`FaC ${loc}/${task}/${set.name}: double space in "${out}"`);
          if (/\bundefined\b|\bnull\b|\{|\}/.test(out)) fail(`FaC ${loc}/${task}/${set.name}: template residue in "${out}"`);
          D(loc, `[${task} | ${set.name}] ${out}`);
        }
      }
    }
    D(loc, '');
    D(loc, '== FIND AND COUNT — legend "How many" questions (deck aria) ==');
    for (const p of ['/images/animals/cat.png', '/images/space/star.png', '/images/animals/elephant.png', '/images/animals/hedgehog.png', '/images/school/scissors.png']) {
      const q = await page.evaluate((pp, l) => {
        const key = ImageVocab.keyFromPath(pp);
        const entry = IMAGE_VOCABULARY[key];
        const forms = entry ? entry[l] : null;
        if (!forms || !forms[1]) return LCSGrammar.howManyShort(l);
        return LCSGrammar.howManyQuestion(l, { plural: forms[1], gender: forms[2] || null }) || LCSGrammar.howManyShort(l);
      }, p, loc);
      D(loc, `[howMany ${p.split('/').pop()}] ${q}`);
    }
    // static fallbacks + letter template for the audit
    D(loc, '');
  }

  // pull the static per-locale strings (generic fallback + letter template + headers)
  const facStatics = await page.evaluate(() => {
    const src = document.documentElement.outerHTML;
    return null; // statics are read file-side below
  });

  // ---------- PREPOSITIONS ----------
  await page.goto(`http://localhost:${port}/prepositions.html`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForFunction('typeof window.__lcsPrepSentence === "function" && typeof window.LCSGrammar === "object"', { timeout: 15000 });

  for (const loc of LOCALES) {
    D(loc, '== PREPOSITIONS — fill-in sentences (worksheet ⇒ answer key ⇒ typed answer ⇒ tap options) ==');
    const landmarks = SHAPES.map(s => ({ name: 'shape:' + s, shape: { isDefault: true, name: s } })).concat(PREP_CUSTOM);
    for (const lmDef of landmarks) {
      for (const prep of PREPS) {
        const r = await page.evaluate((l, pk, shape) => {
          const parts = window.__lcsPrepSentence(l, pk, shape);
          if (!parts) return null;
          const lm = window.__lcsResolveLandmark(shape, l);
          const labels = LCSGrammar.prepDistractorLabels(l, pk, lm);
          return { parts, labels };
        }, loc, prep, lmDef.shape);
        if (lmDef.expectNull) {
          if (r !== null) fail(`Prep ${loc}/${prep}/${lmDef.name}: expected null, got ${JSON.stringify(r && r.parts)}`);
          continue;
        }
        if (r === null) { fail(`Prep ${loc}/${prep}/${lmDef.name}: unexpectedly null`); continue; }
        const { parts, labels } = r;
        const ws = parts.prefix + '__________' + parts.suffix;
        const ans = parts.prefix + parts.expected + parts.suffix;
        if (ws.replace('__________', parts.expected) !== ans) fail(`Prep ${loc}/${prep}/${lmDef.name}: worksheet+expected ≠ answer key`);
        if ((ws.match(/_+/g) || []).length !== 1) fail(`Prep ${loc}/${prep}/${lmDef.name}: not exactly one blank run`);
        if (/\s\s/.test(ans.replace('{img} ', 'X '))) fail(`Prep ${loc}/${prep}/${lmDef.name}: double space in "${ans}"`);
        if (labels.length < 2) fail(`Prep ${loc}/${prep}/${lmDef.name}: distractor pool ${labels.length} < 2`);
        if (labels.indexOf(parts.expected) >= 0) fail(`Prep ${loc}/${prep}/${lmDef.name}: expected among distractors`);
        D(loc, `[${prep} | ${lmDef.name}]`);
        D(loc, `  worksheet: ${ws}`);
        D(loc, `  answered:  ${ans}   (child types: "${parts.expected}")`);
        D(loc, `  tap options: ${[parts.expected].concat(labels.slice(0, 2)).join(' / ')}`);
      }
      D(loc, '');
    }
  }

  await browser.close();
  server.close();

  // append the static strings for audit (headers, fallbacks, letter templates, sr tables)
  const facSrc = fs.readFileSync(path.join(APPS, 'find-and-count.html'), 'utf8');
  const prepSrc = fs.readFileSync(path.join(APPS, 'prepositions.html'), 'utf8');
  function grab(src, re) { const m = src.match(re); return m ? m[0] : '(NOT FOUND)'; }
  const staticsBlock = [
    '== STATIC STRINGS (review these too) ==',
    '--- find-and-count letter-spotting templates ---',
    grab(facSrc, /const blInstructions = \{[\s\S]*?\};/),
    '--- find-and-count generic fallback ---',
    grab(facSrc, /const defaultInstruction = [\s\S]*?below:';/),
    '--- find-and-count headers ---',
    grab(facSrc, /const defaultHeaders = \{[\s\S]*?\};/),
    '--- find-and-count STRINGS_ALL (deck runtime UI) ---',
    grab(facSrc, /'  var STRINGS_ALL = \{[\s\S]*?;',/),
    '--- find-and-count SR_Q_PREFIX ---',
    grab(facSrc, /var SR_Q_PREFIX = \{[\s\S]*?\};/),
    '--- prepositions headers ---',
    grab(prepSrc, /const defaultHeaders = \{[\s\S]*?\n            \};/),
    '--- prepositions sr templates ---',
    grab(prepSrc, /var SR_PREP_TPL = \{[\s\S]*?\};/),
    '--- prepositions STRINGS_ALL (deck runtime UI) ---',
    grab(prepSrc, /'  var STRINGS_ALL = \{[\s\S]*?;',/),
    '--- prepositions vocab-filter warning (translations-prepositions.js) ---',
    (fs.readFileSync(path.join(TRANS, 'translations-prepositions.js'), 'utf8').match(/"prepositions\.msg\.shape\.vocabfiltered": "[^"]*"/g) || []).join('\n')
  ].join('\n');

  for (const loc of LOCALES) {
    fs.writeFileSync(path.join(OUTDIR, `dump-${loc}.txt`), dumps[loc].join('\n') + '\n\n' + staticsBlock, 'utf8');
  }
  console.log(`\nDumps written to ${OUTDIR} (${LOCALES.length} locales).`);
  console.log(failures ? `${failures} ASSERTION FAILURES` : 'ALL STRUCTURAL ASSERTIONS PASSED');
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
