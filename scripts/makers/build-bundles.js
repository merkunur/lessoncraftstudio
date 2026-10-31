#!/usr/bin/env node
/**
 * Build the worksheet makers' browser bundles (ARCHITECTURE §2.2–§2.3).
 *
 *   node scripts/makers/build-bundles.js [--makers=ten-frames,counting,sight-words] [--out=out/makers]
 *
 * Per maker:
 *   1. RECORD — build every template × 11 locales × levels 1-3 × 2 themes × 2 copies in Node through the platform
 *      layer with a recording wrapper: the files each (template, locale) reads become data-manifest.json. The shell
 *      preloads exactly those files before it builds a page, so a page is never built from a missing file.
 *   2. STRINGS — title + instruction per (template, locale) from i18n/strings.<loc>.json. A locale whose strings fall
 *      back to English does NOT get the template (no English on a non-English page; OLD-APP-LESSONS F5).
 *   3. BUNDLE — esbuild, ESM, one lazy chunk per template, shared chunks across templates; the platform swapped for
 *      lib/platform/browser.js, `path` for a posix shim, Node-only modules refused at build time.
 *   4. DATA — every recorded file copied once under <out>/data/<dataVersion>/ (content-hashed version).
 *
 * Output: <out>/<maker>/<version>/{index.js, chunks…, templates.json, data-manifest.json, strings.<loc>.json}
 *         <out>/data/<dataVersion>/<repo-relative path>
 *         <out>/versions.json — the version ledger (lib/versions.js): one history entry per new (maker hash, data hash)
 *         pair, never removed; saved recipes pin both hashes and shell/resolve-version.js re-routes them after a
 *         content fix recorded with record-fix.js. Old version folders are never deleted.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const esbuild = require('esbuild');

const REPO = path.resolve(__dirname, '..', '..');
const WG = path.join(REPO, 'scripts', 'worksheet-gen');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const NODE_ONLY = /^(fs|crypto|vm|sharp|child_process|puppeteer|url|os|zlib|http|https|stream|util|worker_threads)$/;
const MINI_CORES = ['alphabet-trace-core.js'];
const ANSWER_KEY = { en: 'Answer Key', de: 'Lösungen', fr: 'Corrigé', es: 'Respuestas', pt: 'Respostas', it: 'Soluzioni', nl: 'Antwoorden', sv: 'Facit', da: 'Facit', no: 'Fasit', fi: 'Vastaukset' };

const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const OUT = path.resolve(REPO, args.out || 'out/makers');
const rel = (p) => path.relative(REPO, p).replace(/\\/g, '/');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 12);

function makerTypes(id) {
  const { MAKERS } = require('./topic-map.js');
  const m = MAKERS.find((x) => x.id === id);
  if (!m) throw new Error('no maker ' + id);
  const inv = JSON.parse(fs.readFileSync(path.join(REPO, 'docs', 'makers', 'inventory', 'types.json'), 'utf8')).rows;
  return { maker: m, types: inv.filter((r) => !r.science && (m.families.includes(r.family) || (m.extraIds || []).includes(r.id)) && !(m.hideIds || []).includes(r.id)) };
}

const isBwTheme = (t) => /bw(\s+\d+)?$/i.test(t);
function themesFor(spec) {
  if (!spec.themeAxis || !spec.themeAxis.applicable) return [null];
  const man = JSON.parse(fs.readFileSync(path.join(WG, 'cache', 'manifest.json'), 'utf8')).themes;
  // colour AND black-and-white themes (operator 2026-10-31: the teacher may pick any theme; a page uses one theme, so it
  // is never a mix); colour first, so the recording and the default theme stay colour
  const ok = Object.keys(man).sort((x, y) => isBwTheme(x) - isBwTheme(y)).filter((t) => Object.values(man[t].nouns).filter((n) => n.vocabKey).length >= ((spec.themeAxis && spec.themeAxis.minNouns) || 6));
  // a colouring template prints outlines whatever theme it is given (themeAxis.needsBwSibling): offer it the black-and-white
  // themes only, so the theme tiles show what the child will colour (a colour tile would print its outline sibling)
  return spec.themeAxis.needsBwSibling ? ok.filter(isBwTheme) : ok;
}

/** Step 1 + 2: record reads and resolve strings in Node. */
function record(types) {
  // a fresh module cache per maker: engine modules cache what they read, so a file read while recording an EARLIER
  // maker would otherwise never be recorded for this one
  for (const k of Object.keys(require.cache)) if (k.startsWith(path.join(REPO, 'scripts'))) delete require.cache[k];
  const platform = require(path.join(WG, 'lib', 'platform', 'index.js'));
  const { resolveStrings, withLevelInstruction } = require(path.join(WG, 'i18n', 'strings.js'));
  const { makePage } = require('./runtime.js');
  const reads = {};
  let current = null;
  const orig = { readText: platform.readText, readJson: platform.readJson, exists: platform.exists, vocab: platform.vocab };
  const note = (p) => { if (current) { const k = rel(p); if (!k.startsWith('..')) (reads[current] = reads[current] || new Set()).add(k); } };
  platform.readText = (p) => { note(p); return orig.readText(p); };
  platform.readJson = (p) => { note(p); return orig.readJson(p); };
  platform.exists = (p) => { const r = orig.exists(p); if (r && !/cache[\\/]themes/.test(p)) note(p); return r; };
  platform.vocab = () => { if (current) (reads[current] = reads[current] || new Set()).add('REFERENCE TRANSLATIONS/image-vocabulary.json'); return orig.vocab(); };

  const templates = [];
  const strings = {};
  for (const t of types) {
    const spec = require(path.join(REPO, t.file));
    const themes = themesFor(spec);
    const entry = { id: spec.id, file: t.file, family: t.family, grade: spec.gradeBand, levels: Object.keys(spec.difficulty || { 2: 1 }).map(Number), themed: !!(spec.themeAxis && spec.themeAxis.applicable), interactive: !!spec.interactive, locales: [], refused: {} };
    for (const loc of LOCALES) {
      const s = resolveStrings(spec.id, loc, spec);
      if (loc !== 'en' && s.source !== 'locale') { entry.refused[loc] = 'no native strings'; continue; }
      current = spec.id + '|' + loc;
      let ok = true;
      // a level may print its own instruction (and title): i18n/level-instructions.json — the pages are built with it
      const byLevel = {};
      for (const d of entry.levels) {
        const sd = withLevelInstruction(s, spec.id, d, loc);
        if (sd !== s) byLevel[d] = { instruction: sd.instruction, ...(sd.title !== s.title ? { title: sd.title } : {}) };
        for (const theme of themes.slice(0, 2)) {
          for (const variant of [1, 2]) {
            try { makePage({ type: spec, strings: sd, locale: loc, difficulty: d, theme, variant, answerKey: true, answerKeySuffix: ANSWER_KEY[loc] }); }
            catch (e) { ok = false; entry.refused[loc] = 'build failed: ' + String(e.message).slice(0, 160); }
          }
        }
      }
      current = null;
      if (!ok) continue;
      entry.locales.push(loc);
      // a template's own axis (the sight word of the page …): the values a teacher may pick, per locale
      if (spec.unitAxis && spec.unitAxis.applicable) {
        const { unitTokens } = require(path.join(WG, 'lib', 'unit-axis.js'));
        (entry.units = entry.units || {})[loc] = (spec.unitAxis.units(loc) || []).map((id) => ({ id, word: String(unitTokens(spec, id, loc).UNIT) }));
      }
      (strings[loc] = strings[loc] || {})[spec.id] = { title: s.title, instruction: s.instruction, ...(s.printTitle ? { printTitle: s.printTitle } : {}), ...(Object.keys(byLevel).length ? { levels: byLevel } : {}) };
    }
    // does the template have an answer key? (an interactive one draws its own; a print-only one when its page carries
    // answers — runtime.js keyMarks — or draws an example for the key)
    // per level: a level may have nothing to mark (K-438 level 1 prints the letters) — the switch is offered only there
    entry.keyLevels = entry.levels.filter((d) => {
      try { return !!makePage({ type: spec, strings: withLevelInstruction(resolveStrings(spec.id, 'en', spec), spec.id, d, 'en'), locale: 'en', difficulty: d, theme: themes[0], unit: entry.units && entry.units.en && entry.units.en[0] ? entry.units.en[0].id : null, variant: 1, answerKey: true, answerKeySuffix: ANSWER_KEY.en }).keyHtml; } catch (e) { return false; }
    });
    entry.hasKey = entry.keyLevels.length > 0;
    // does a new copy (seed) change the page? Some templates are fixed by their settings (a sight word of the day is
    // the same page every time) — there "New version" would do nothing, so the screen must not offer it (measured, not
    // assumed: three copies at every level, in English)
    try {
      const enS = resolveStrings(spec.id, 'en', spec);
      const th0 = themes[0];
      const u0 = spec.unitAxis && spec.unitAxis.applicable ? (spec.unitAxis.units('en') || [])[0] : null;
      entry.copiesDiffer = entry.levels.filter((d) => new Set([1, 2, 3].map((v) => makePage({ type: spec, strings: enS, locale: 'en', difficulty: d, theme: th0, unit: u0, variant: v }).html)).size > 1);
    } catch (e) { entry.copiesDiffer = entry.levels.slice(); }
    // only themes this template can actually build (some need a black-and-white sibling, enough nouns, …): a theme
    // that throws is never offered
    entry.themes = entry.themed ? themes.filter((th) => {
      try { makePage({ type: spec, strings: resolveStrings(spec.id, 'en', spec), locale: 'en', difficulty: entry.levels[0], theme: th, variant: 1 }); return true; } catch (e) { return false; }
    }) : [];
    templates.push(entry);
  }
  Object.assign(platform, orig);
  // ONE list per maker: engine modules cache what they read (the picture manifest, a bank), so a file is recorded only
  // under the first (template, locale) that read it — a per-template list would miss it. The shell preloads them all.
  const all = new Set(); for (const set of Object.values(reads)) set.forEach((f) => all.add(f));
  const manifest = { files: [...all].sort() };
  return { templates, strings, manifest };
}

/** Step 3: esbuild with the browser platform. */
async function bundle(makerId, templates, outDir) {
  const entryDir = path.join(OUT, '.entries');
  fs.mkdirSync(entryDir, { recursive: true });
  const entryFile = path.join(entryDir, makerId + '.js');
  const lines = templates.map((t) => `  ${JSON.stringify(t.id)}: () => import(${JSON.stringify(path.join(REPO, t.file).replace(/\\/g, '/'))}),`);
  fs.writeFileSync(entryFile, `// generated by scripts/makers/build-bundles.js — do not edit\nimport R from ${JSON.stringify(path.join(__dirname, 'runtime.js').replace(/\\/g, '/'))};\nexport const makePage = R.makePage;\nexport const generate = R.generate;\nexport const gatePage = R.gatePage;\nexport const mountHtml = R.mountHtml;\nexport const platform = R.platform;\nexport const templates = {\n${lines.join('\n')}\n};\n`);
  const offenders = [];
  const plugin = {
    name: 'lcs-makers',
    setup(b) {
      b.onResolve({ filter: /platform[\\/]index\.js$/ }, (a) => ({ path: path.join(WG, 'lib', 'platform', 'browser.js') }));
      b.onResolve({ filter: /^path$/ }, () => ({ path: path.join(WG, 'lib', 'platform', 'path-shim.js') }));
      b.onResolve({ filter: NODE_ONLY }, (a) => { offenders.push(a.path + ' ← ' + rel(a.importer)); return { path: a.path, namespace: 'refused' }; });
      b.onLoad({ filter: /.*/, namespace: 'refused' }, () => ({ contents: 'throw new Error("node-only module in a maker bundle")', loader: 'js' }));
      b.onResolve({ filter: /^lcs-mini-cores$/ }, () => ({ path: 'lcs-mini-cores', namespace: 'minicores' }));
      b.onLoad({ filter: /.*/, namespace: 'minicores' }, () => ({
        loader: 'js',
        contents: 'module.exports = {\n' + MINI_CORES.map((f) => JSON.stringify(f) + ': function (window) {\n' + fs.readFileSync(path.join(REPO, 'mini tools', f), 'utf8') + '\n}').join(',\n') + '\n};',
      }));
      // every module gets a repo-relative __dirname ('/scripts/worksheet-gen/…') for path.join(__dirname, …)
      b.onLoad({ filter: /\.js$/ }, (a) => {
        const src = fs.readFileSync(a.path, 'utf8');
        if (!/__dirname/.test(src)) return null;
        return { loader: 'js', contents: 'var __dirname = ' + JSON.stringify('/' + rel(path.dirname(a.path))) + ';\n' + src };
      });
    },
  };
  const r = await esbuild.build({
    entryPoints: { index: entryFile }, bundle: true, format: 'esm', splitting: true, minify: true, sourcemap: 'external',
    target: ['chrome100', 'safari15', 'firefox100'], outdir: outDir, metafile: true, plugins: [plugin], logLevel: 'error',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  if (offenders.length) throw new Error('Node-only modules reachable from ' + makerId + ':\n  ' + [...new Set(offenders)].join('\n  '));
  const lint = require('./lint-browser-safe.js').check(Object.keys(r.metafile.inputs).filter((k) => !k.includes(':')), REPO);
  if (lint.length) throw new Error('browser-safety lint failed for ' + makerId + ':\n  ' + lint.join('\n  '));
  return r.metafile;
}

/** Seed the ledger from the current.txt files (one entry each) when it does not exist yet. */
function seedVersions() {
  const { appendHistory } = require('./lib/versions.js');
  let v = {};
  const dataCur = path.join(OUT, 'data', 'current.txt');
  const dv = fs.existsSync(dataCur) ? fs.readFileSync(dataCur, 'utf8').trim() : null;
  for (const d of fs.readdirSync(OUT).sort()) {
    const cur = path.join(OUT, d, 'current.txt');
    if (d === 'data' || !fs.existsSync(cur)) continue;
    const h = fs.readFileSync(cur, 'utf8').trim();
    const dir = path.join(OUT, d, h);
    if (!h || !fs.existsSync(dir)) continue;
    v = appendHistory(v, d, h, dv, fs.statSync(dir).mtime.toISOString());
  }
  return v;
}

/** Append this run's (maker hash, data hash) pairs to out/makers/versions.json; never removes an entry. */
function writeVersions(built, dv, seed) {
  const { appendHistory } = require('./lib/versions.js');
  const file = path.join(OUT, 'versions.json');
  let v = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : (seed || {});
  const now = new Date().toISOString();
  for (const [id, hash] of Object.entries(built)) v = appendHistory(v, id, hash, dv, now);
  fs.writeFileSync(file + '.tmp', JSON.stringify(v, null, 1));
  fs.renameSync(file + '.tmp', file);
}

async function main() {
  const makers = String(args.makers || 'ten-frames,counting,sight-words').split(',');
  fs.mkdirSync(OUT, { recursive: true });
  // seed the ledger BEFORE this run overwrites any current.txt, so the seed records what was current until now
  const seed = fs.existsSync(path.join(OUT, 'versions.json')) ? null : seedVersions();
  // the screen's own words (frontend/messages/makers/<loc>.json, checked: parity, no empty, no untranslated)
  const ui = require('./build-ui-strings.js').build();
  console.log(`ui strings: ${ui.keys} keys × ${ui.locales} languages`);
  // pdf-lib for the raster PDF (ARCHITECTURE §3), loaded by the screen only when a PDF is downloaded
  const vendor = path.join(OUT, 'vendor');
  fs.mkdirSync(vendor, { recursive: true });
  await esbuild.build({ stdin: { contents: "export { PDFDocument } from 'pdf-lib';", resolveDir: REPO }, bundle: true, format: 'esm', platform: 'browser', minify: true, outfile: path.join(vendor, 'pdf-lib.js'), logLevel: 'warning' });
  const allData = new Set();
  const report = [];
  const built = {};
  for (const id of makers) {
    const { types } = makerTypes(id);
    const rec = record(types);
    const tmp = path.join(OUT, id, '.build');
    fs.rmSync(tmp, { recursive: true, force: true });
    const meta = await bundle(id, rec.templates, tmp);
    const version = sha(fs.readdirSync(tmp).sort().map((f) => f + fs.readFileSync(path.join(tmp, f))).join('') + JSON.stringify(rec));
    const dir = path.join(OUT, id, version);
    // the same version rebuilt: its thumbnails (build-thumbs.js) belong to the same content — keep them across the swap
    const thumbs = path.join(dir, 'thumbs'), keep = path.join(OUT, id, '.thumbs-keep');
    fs.rmSync(keep, { recursive: true, force: true });
    if (fs.existsSync(thumbs)) fs.renameSync(thumbs, keep);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.renameSync(tmp, dir);
    if (fs.existsSync(keep)) fs.renameSync(keep, thumbs);
    // theme names per locale, from the topic taxonomy (all 100 picture themes have an entry in all 11 languages)
    const tax = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'config', 'topics-taxonomy.json'), 'utf8')).axes.theme;
    const norm = (s) => s.toLowerCase().replace(/[\s-]+/g, '_');
    const themeNames = {};
    for (const th of new Set(rec.templates.flatMap((t) => t.themes))) {
      const k = Object.keys(tax).find((x) => norm(x) === norm(th));
      if (!k) throw new Error('theme without a taxonomy name: ' + th);
      for (const loc of LOCALES) (themeNames[loc] = themeNames[loc] || {})[th] = tax[k].name[loc];
    }
    fs.writeFileSync(path.join(dir, 'templates.json'), JSON.stringify({ maker: id, version, answerKey: ANSWER_KEY, themeNames, templates: rec.templates }, null, 1));
    fs.writeFileSync(path.join(dir, 'data-manifest.json'), JSON.stringify(rec.manifest, null, 1));
    for (const [loc, s] of Object.entries(rec.strings)) fs.writeFileSync(path.join(dir, 'strings.' + loc + '.json'), JSON.stringify(s));
    rec.manifest.files.forEach((f) => allData.add(f));
    const js = Object.entries(meta.outputs).filter(([f]) => f.endsWith('.js'));
    const total = js.reduce((s, [, o]) => s + o.bytes, 0);
    const offered = rec.templates.map((t) => t.locales.length).reduce((a, b) => a + b, 0);
    report.push(`${id}@${version}: ${rec.templates.length} templates, ${offered} template×locale offered, JS ${(total / 1024).toFixed(0)} KB raw in ${js.length} files`);
    for (const t of rec.templates) if (Object.keys(t.refused).length) report.push(`   ${t.id} refused: ${Object.entries(t.refused).map(([l, r]) => l + ' (' + r + ')').join(', ')}`);
    fs.writeFileSync(path.join(OUT, id, 'current.txt'), version);
    built[id] = version;
  }
  // data: vocab as JSON once, every other recorded file as is; versioned by content
  const vocab = require(path.join(REPO, 'scripts', 'publish-cli', 'deck-rich-alt.js')).loadVocab();
  const files = [...allData].sort();
  const blobs = files.map((f) => [f, f === 'REFERENCE TRANSLATIONS/image-vocabulary.json' ? JSON.stringify(vocab) : fs.readFileSync(path.join(REPO, f), 'utf8')]);
  const dv = sha(blobs.map(([f, c]) => f + '\0' + c).join('\0'));
  for (const [f, c] of blobs) { const p = path.join(OUT, 'data', dv, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c); }
  fs.writeFileSync(path.join(OUT, 'data', 'current.txt'), dv);
  writeVersions(built, dv, seed);
  report.push(`data@${dv}: ${files.length} files, ${(blobs.reduce((s, [, c]) => s + Buffer.byteLength(c), 0) / 1024).toFixed(0)} KB`);
  console.log(report.join('\n'));
  // gallery thumbnails for what was just built (cached by page html: only changed pages are drawn) — a version without
  // them falls back to live miniatures, so they are made here rather than left to a separate step. --no-thumbs skips.
  if (!process.argv.includes('--no-thumbs')) {
    const r = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'build-thumbs.js'), '--makers=' + makers.join(',')], { stdio: 'inherit' });
    if (r.status !== 0) throw new Error('thumbnails failed');
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); });
