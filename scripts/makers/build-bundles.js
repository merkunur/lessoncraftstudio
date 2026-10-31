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
  return { maker: m, types: inv.filter((r) => !r.science && (m.families.includes(r.family) || (m.extraIds || []).includes(r.id))) };
}

function themesFor(spec) {
  if (!spec.themeAxis || !spec.themeAxis.applicable) return [null];
  const man = JSON.parse(fs.readFileSync(path.join(WG, 'cache', 'manifest.json'), 'utf8')).themes;
  const ok = Object.keys(man).filter((t) => !/bw(\s+\d+)?$/i.test(t) && Object.values(man[t].nouns).filter((n) => n.vocabKey).length >= ((spec.themeAxis && spec.themeAxis.minNouns) || 6));
  return ok;
}

/** Step 1 + 2: record reads and resolve strings in Node. */
function record(types) {
  // a fresh module cache per maker: engine modules cache what they read, so a file read while recording an EARLIER
  // maker would otherwise never be recorded for this one
  for (const k of Object.keys(require.cache)) if (k.startsWith(path.join(REPO, 'scripts'))) delete require.cache[k];
  const platform = require(path.join(WG, 'lib', 'platform', 'index.js'));
  const { resolveStrings } = require(path.join(WG, 'i18n', 'strings.js'));
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
      for (const d of entry.levels) {
        for (const theme of themes.slice(0, 2)) {
          for (const variant of [1, 2]) {
            try { makePage({ type: spec, strings: s, locale: loc, difficulty: d, theme, variant, answerKey: true, answerKeySuffix: ANSWER_KEY[loc] }); }
            catch (e) { ok = false; entry.refused[loc] = 'build failed: ' + String(e.message).slice(0, 160); }
          }
        }
      }
      current = null;
      if (!ok) continue;
      entry.locales.push(loc);
      (strings[loc] = strings[loc] || {})[spec.id] = { title: s.title, instruction: s.instruction, ...(s.printTitle ? { printTitle: s.printTitle } : {}) };
    }
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
  fs.writeFileSync(entryFile, `// generated by scripts/makers/build-bundles.js — do not edit\nimport R from ${JSON.stringify(path.join(__dirname, 'runtime.js').replace(/\\/g, '/'))};\nexport const makePage = R.makePage;\nexport const platform = R.platform;\nexport const templates = {\n${lines.join('\n')}\n};\n`);
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

async function main() {
  const makers = String(args.makers || 'ten-frames,counting,sight-words').split(',');
  fs.mkdirSync(OUT, { recursive: true });
  const allData = new Set();
  const report = [];
  for (const id of makers) {
    const { types } = makerTypes(id);
    const rec = record(types);
    const tmp = path.join(OUT, id, '.build');
    fs.rmSync(tmp, { recursive: true, force: true });
    const meta = await bundle(id, rec.templates, tmp);
    const version = sha(fs.readdirSync(tmp).sort().map((f) => f + fs.readFileSync(path.join(tmp, f))).join('') + JSON.stringify(rec));
    const dir = path.join(OUT, id, version);
    fs.rmSync(dir, { recursive: true, force: true });
    fs.renameSync(tmp, dir);
    fs.writeFileSync(path.join(dir, 'templates.json'), JSON.stringify({ maker: id, version, answerKey: ANSWER_KEY, templates: rec.templates }, null, 1));
    fs.writeFileSync(path.join(dir, 'data-manifest.json'), JSON.stringify(rec.manifest, null, 1));
    for (const [loc, s] of Object.entries(rec.strings)) fs.writeFileSync(path.join(dir, 'strings.' + loc + '.json'), JSON.stringify(s));
    rec.manifest.files.forEach((f) => allData.add(f));
    const js = Object.entries(meta.outputs).filter(([f]) => f.endsWith('.js'));
    const total = js.reduce((s, [, o]) => s + o.bytes, 0);
    const offered = rec.templates.map((t) => t.locales.length).reduce((a, b) => a + b, 0);
    report.push(`${id}@${version}: ${rec.templates.length} templates, ${offered} template×locale offered, JS ${(total / 1024).toFixed(0)} KB raw in ${js.length} files`);
    for (const t of rec.templates) if (Object.keys(t.refused).length) report.push(`   ${t.id} refused: ${Object.entries(t.refused).map(([l, r]) => l + ' (' + r + ')').join(', ')}`);
    fs.writeFileSync(path.join(OUT, id, 'current.txt'), version);
  }
  // data: vocab as JSON once, every other recorded file as is; versioned by content
  const vocab = require(path.join(REPO, 'scripts', 'publish-cli', 'deck-rich-alt.js')).loadVocab();
  const files = [...allData].sort();
  const blobs = files.map((f) => [f, f === 'REFERENCE TRANSLATIONS/image-vocabulary.json' ? JSON.stringify(vocab) : fs.readFileSync(path.join(REPO, f), 'utf8')]);
  const dv = sha(blobs.map(([f, c]) => f + '\0' + c).join('\0'));
  for (const [f, c] of blobs) { const p = path.join(OUT, 'data', dv, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, c); }
  fs.writeFileSync(path.join(OUT, 'data', 'current.txt'), dv);
  report.push(`data@${dv}: ${files.length} files, ${(blobs.reduce((s, [, c]) => s + Buffer.byteLength(c), 0) / 1024).toFixed(0)} KB`);
  console.log(report.join('\n'));
}

main().catch((e) => { console.error(e.message); process.exit(1); });
