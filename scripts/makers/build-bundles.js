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

// a build that fails because a bank disagrees with the vocabulary is a DATA DEFECT, never an honest refusal: the
// languages' theme / level checks would otherwise drop that theme silently (2026-11-03: fourteen sound-boxes rows still
// spelled the picture words the vocabulary reviews had replaced, and those themes vanished from the maker)
const DATA_DEFECT = /fix data\/|data defect/i;
const dataDefects = new Set();
const noteDefect = (e, where) => { if (e && DATA_DEFECT.test(String(e.message))) dataDefects.add(where + ': ' + String(e.message).slice(0, 200)); };
const isBwTheme = (t) => /bw(\s+\d+)?$/i.test(t);
// a gallery card names the worksheet TYPE (shell.js cardTitle): where the title's word slot sits mid-sentence, dropping it
// broke the label ("Circle the in the Words and Count"), so those cards carry their own native label (2026-11-09)
const CARD_TITLES = JSON.parse(fs.readFileSync(path.join(__dirname, 'card-titles.json'), 'utf8'));
function themesFor(spec) {
  if (!spec.themeAxis || !spec.themeAxis.applicable) return [null];
  const man = JSON.parse(fs.readFileSync(path.join(WG, 'cache', 'manifest.json'), 'utf8')).themes;
  // colour AND black-and-white themes (operator 2026-10-31: the teacher may pick any theme; a page uses one theme, so it
  // is never a mix); colour first, so the recording and the default theme stay colour
  const ok = Object.keys(man).sort((x, y) => isBwTheme(x) - isBwTheme(y)).filter((t) => Object.values(man[t].nouns).filter((n) => n.vocabKey).length >= ((spec.themeAxis && spec.themeAxis.minNouns) || 6));
  // a colouring template prints outlines whatever theme it is given (themeAxis.needsBwSibling): offer it the black-and-white
  // themes only, so the theme tiles show what the child will colour (a colour tile would print its outline sibling)
  // (and the flagship drawings' themes, which no word-based maker offers: their pictures have no vocabulary key)
  return spec.themeAxis.needsBwSibling ? ok.filter(isBwTheme).concat(Object.keys(man).filter((t) => man[t].fl)) : ok;
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
  const orig = { readText: platform.readText, readJson: platform.readJson, exists: platform.exists, vocab: platform.vocab, requireData: platform.requireData };
  const modules = new Set();   // JS data modules (platform.requireData): bundled into the maker, not preloaded
  const note = (p) => { if (current) { const k = rel(p); if (!k.startsWith('..')) (reads[current] = reads[current] || new Set()).add(k); } };
  platform.readText = (p) => { note(p); return orig.readText(p); };
  platform.readJson = (p) => { note(p); return orig.readJson(p); };
  platform.exists = (p) => { const r = orig.exists(p); if (r && !/cache[\\/]themes/.test(p)) note(p); return r; };
  platform.requireData = (p) => { const k = rel(p); if (!k.startsWith('..')) modules.add(k); return orig.requireData(p); };
  platform.vocab = () => { if (current) (reads[current] = reads[current] || new Set()).add('REFERENCE TRANSLATIONS/image-vocabulary.json'); return orig.vocab(); };

  const templates = [];
  const strings = {};
  for (const t of types) {
    const spec = require(path.join(REPO, t.file));
    // only themes this template can actually build (some need a black-and-white sibling, enough nouns, a curated set …):
    // a theme that throws is never offered — and never decides whether a language is offered (the G2-319 logic puzzles
    // build on seven curated themes; trying the manifest's first two dropped the template from every language)
    // (recorded like every other build: an engine module caches what it reads, so a file first read here — the picture
    // manifest — is read only here)
    const themed = !!(spec.themeAxis && spec.themeAxis.applicable);
    const allLevels = Object.keys(spec.difficulty || { 2: 1 }).map(Number);
    // the candidate themes (never filtered in one language: each language finds its own — the G2-319 logic puzzles
    // build on seven curated themes, adjective agreement in no gender-less language, …)
    current = spec.id + '|themes';
    const candidates = themesFor(spec);
    current = null;
    const entry = { id: spec.id, file: t.file, family: t.family, grade: spec.gradeBand, levels: allLevels.slice(), themed, interactive: !!spec.interactive, locales: [], refused: {} };
    const { makeRng } = require(path.join(WG, 'lib', 'rng.js'));
    const fast = themed && !(spec.unitAxis && spec.unitAxis.applicable);
    const goodOf = {}, levelsOf = {};
    for (const loc of LOCALES) {
      if (spec.onlyLocales && !spec.onlyLocales.includes(loc)) { entry.refused[loc] = 'not taught in this language'; continue; }
      const s = resolveStrings(spec.id, loc, spec);
      if (loc !== 'en' && s.source !== 'locale') { entry.refused[loc] = 'no native strings'; continue; }
      current = spec.id + '|' + loc;
      const why = {};
      // a level may print its own instruction (and title): i18n/level-instructions.json — the pages are built with it;
      // a level without its instruction in this language is not offered here
      const byLevel = {}, sdOf = {};
      let lvls = [];
      for (const d of allLevels) {
        let sd;
        try { sd = withLevelInstruction(s, spec.id, d, loc); } catch (e) { why[d] = e.message; continue; }
        sdOf[d] = sd; lvls.push(d);
        if (sd !== s) byLevel[d] = { instruction: sd.instruction, ...(sd.title !== s.title ? { title: sd.title } : {}) };
      }
      // the themes that build at each level (copies 1 and 2; the page or one of the maker's fresh-seed retries): the
      // type's own build for a themed template (< 1 ms), the full page for one with a unit axis (its build needs the
      // unit the page resolves)
      let lastErr = null;
      const builds = (theme, d, variant, sv) => { try { spec.build({ theme, difficulty: d, locale: loc, unit: null }, { rng: makeRng(`fits|${spec.id}|${loc}|${theme}|${d}|${variant}|${sv || ''}`), variant, ...(sv ? { retry: variant + sv } : {}) }); return true; } catch (e) { lastErr = e; noteDefect(e, spec.id + ' ' + loc + ' ' + theme); return false; } };
      const pageBuilds = (theme, d, variant) => [null, '.1', '.2', '.3', '.4'].some((sv) => { try { makePage({ type: spec, strings: sdOf[d], locale: loc, difficulty: d, theme, variant, ...(sv ? { seedVariant: variant + sv } : {}), answerKey: true, answerKeySuffix: ANSWER_KEY[loc] }); return true; } catch (e) { lastErr = e; noteDefect(e, spec.id + ' ' + loc + ' ' + theme); return false; } });
      const fitsAt = (theme, d) => fast ? [1, 2].every((variant) => [null, '.1', '.2', '.3', '.4'].some((sv) => builds(theme, d, variant, sv))) : pageBuilds(theme, d, 1);
      let good = candidates.slice();
      if (themed) {
        const at = Object.fromEntries(lvls.map((d) => [d, candidates.filter((th) => fitsAt(th, d))]));
        for (const d of lvls) if (!at[d].length) why[d] = 'no theme builds: ' + String(lastErr && lastErr.message).slice(0, 140);
        lvls = lvls.filter((d) => at[d].length);
        // the themes good at every level offered; a level that leaves fewer than three (or than its best level has)
        // is dropped first — a teacher's theme must give every level she can pick
        const both = () => candidates.filter((th) => lvls.every((d) => at[d].includes(th)));
        while (lvls.length > 1 && both().length < Math.min(3, Math.max(...lvls.map((d) => at[d].length)))) {
          const worst = lvls.reduce((x, d) => (at[d].length < at[x].length ? d : x), lvls[0]);
          why[worst] = `only ${at[worst].length} themes build at this level`;
          lvls = lvls.filter((d) => d !== worst);
        }
        good = both();
      }
      // the full page (makePage), every level, copies 1 and 2, on the first two good themes: a level that fails is not
      // offered in this language
      for (const d of lvls.slice()) {
        for (const theme of good.slice(0, 2)) for (const variant of [1, 2]) {
          if (!lvls.includes(d)) break;
          if (!pageBuilds(theme, d, variant)) { why[d] = 'build failed: ' + String(lastErr && lastErr.message).slice(0, 160); lvls = lvls.filter((x) => x !== d); }
        }
      }
      if (themed && good.length && lvls.length) good = candidates.filter((th) => lvls.every((d) => fitsAt(th, d)));
      // a page that fails its gates in the browser is retried with fresh seeds (runtime.generate): a retry may read data
      // the plain build never touches (a Level Set pool), so one retry per level is built here — only to RECORD what it
      // reads (2026-11-03: G2-272's Danish story pool was never shipped, and its retries failed "no level data")
      for (const d of lvls) for (const theme of good.slice(0, 1)) {
        try { makePage({ type: spec, strings: sdOf[d], locale: loc, difficulty: d, theme, variant: 1, seedVariant: '1.1', answerKey: true, answerKeySuffix: ANSWER_KEY[loc] }); } catch (e) { noteDefect(e, spec.id + ' ' + loc + ' ' + theme); }
      }
      current = null;
      if (!lvls.length || (themed && !good.length)) { entry.refused[loc] = Object.entries(why).map(([d, w]) => 'L' + d + ': ' + w).join(' | ').slice(0, 300) || 'no theme builds'; continue; }
      entry.locales.push(loc);
      goodOf[loc] = good; levelsOf[loc] = lvls;
      if (lvls.length < allLevels.length) {
        (entry.localeLevels = entry.localeLevels || {})[loc] = lvls;
        (entry.levelRefused = entry.levelRefused || {})[loc] = Object.fromEntries(allLevels.filter((d) => !lvls.includes(d)).map((d) => [d, String(why[d] || '').slice(0, 200)]));
      }
      // a template's own axis (the sight word of the page …): the values a teacher may pick, per locale
      // (unitAxis.makerCopies: no list — a copy picks its own unit, a published scene first, then the Level Set's:
      // Find the Differences, How to Draw; a list would offer a drawing the face cannot use)
      if (spec.unitAxis && spec.unitAxis.applicable && !spec.unitAxis.makerCopies) {
        const { unitTokens } = require(path.join(WG, 'lib', 'unit-axis.js'));
        (entry.units = entry.units || {})[loc] = (spec.unitAxis.units(loc) || []).map((id) => ({ id, word: String(unitTokens(spec, id, loc).UNIT) }));
        // a unit drawn for one level (Color by Number's designs): the screen lists a page's level's units only
        if (spec.unitAxis.hideInMaker) entry.hideUnits = true;
        // a calendar month axis (K-613 Color the Days, 2026-11-10): the screen opens on the visitor's current month and
        // names the choice "Month", not "Word"
        if (spec.unitAxis.now === 'month') { entry.unitNow = 'month'; entry.unitLabel = 'month'; }
        if (spec.unitAxis.levelOf) entry.unitLevels = Object.assign(entry.unitLevels || {}, Object.fromEntries(entry.units[loc].map((u) => [u.id, spec.unitAxis.levelOf(u.id)])));
        // a unit is offered at the levels where a page builds with it (2026-11-03: the level checks above build the
        // DEFAULT unit only — the sv G1-343 sample drew the rhyme family "att", which cannot carry the sort face, and en
        // G1-343 refused 54 of its 90 unit × level pages). A unit no level builds is not offered; where some unit builds
        // at fewer levels than the language offers, localeUnitLevels[loc] lists each unit's levels (the screen and the
        // gates read it beside unitLevels)
        const ul = {};
        // recorded too: a page WITH a unit may read what no unit-less page touches (2026-11-04: K-237 / K-238's per-number
        // and per-letter Level Set titles, read by copyStrings only when a unit is set, were never shipped — the browser
        // printed the published title "Trace the Numbers 0 to 9" over a page of 0 while Node printed the copy's own)
        current = spec.id + '|' + loc;
        for (const u of entry.units[loc]) {
          ul[u.id] = lvls.filter((d) => (!entry.unitLevels || entry.unitLevels[u.id] === d) && [1, 2].some((variant) => {
            try { makePage({ type: spec, strings: sdOf[d], locale: loc, difficulty: d, theme: themed ? good[0] : null, unit: u.id, variant }); return true; } catch (e) { noteDefect(e, spec.id + ' ' + loc + ' unit ' + u.id); return false; }
          }));
        }
        current = null;
        entry.units[loc] = entry.units[loc].filter((u) => ul[u.id].length);
        if (entry.units[loc].some((u) => ul[u.id].length < lvls.filter((d) => !entry.unitLevels || entry.unitLevels[u.id] === d).length)) {
          (entry.localeUnitLevels = entry.localeUnitLevels || {})[loc] = Object.fromEntries(entry.units[loc].map((u) => [u.id, ul[u.id]]));
        }
      }
      const card = (CARD_TITLES[spec.id] || {})[loc];
      (strings[loc] = strings[loc] || {})[spec.id] = { title: s.title, instruction: s.instruction, ...(s.printTitle ? { printTitle: s.printTitle } : {}), ...(card ? { cardTitle: card } : {}), ...(Object.keys(byLevel).length ? { levels: byLevel } : {}) };
    }
    // the levels offered in some language (in order); the themes good in some language — a language whose own list
    // differs gets localeThemes
    entry.levels = allLevels.filter((d) => entry.locales.some((loc) => levelsOf[loc].includes(d)));
    if (!entry.levels.length) entry.levels = allLevels.slice();
    const themes = themed ? candidates.filter((th) => entry.locales.some((loc) => goodOf[loc].includes(th))) : candidates;
    if (themed) for (const loc of entry.locales) if (goodOf[loc].length !== themes.length) (entry.localeThemes = entry.localeThemes || {})[loc] = goodOf[loc];
    // a level's own checks (answer key, new copies) run in a language that offers it — English first
    const probeAt = (d) => ['en', ...entry.locales].find((loc) => entry.locales.includes(loc) && levelsOf[loc].includes(d));
    // a unit a page of level d may use in loc: its own level (unitLevels) and the levels it builds at (localeUnitLevels)
    const unitOk = (loc, u, d) => (!entry.unitLevels || entry.unitLevels[u.id] === d) && !(entry.localeUnitLevels && entry.localeUnitLevels[loc] && !(entry.localeUnitLevels[loc][u.id] || []).includes(d));
    const unitAt = (loc, d) => (entry.units && entry.units[loc] ? ((entry.units[loc].find((u) => unitOk(loc, u, d)) || {}).id || null) : null);
    // does the template have an answer key? (an interactive one draws its own; a print-only one when its page carries
    // answers — runtime.js keyMarks — or draws an example for the key)
    // per level: a level may have nothing to mark (K-438 level 1 prints the letters) — the switch is offered only there
    entry.keyLevels = entry.levels.filter((d) => {
      const loc = probeAt(d);
      if (!loc) return false;
      try { return !!makePage({ type: spec, strings: withLevelInstruction(resolveStrings(spec.id, loc, spec), spec.id, d, loc), locale: loc, difficulty: d, theme: themed ? goodOf[loc][0] : candidates[0], unit: unitAt(loc, d), variant: 1, answerKey: true, answerKeySuffix: ANSWER_KEY[loc] }).keyHtml; } catch (e) { return false; }
    });
    entry.hasKey = entry.keyLevels.length > 0;
    // does a new copy (seed) change the page? Some templates are fixed by their settings (a sight word of the day is
    // the same page every time) — there "New version" would do nothing, so the screen must not offer it (measured, not
    // assumed: three copies at every level)
    try {
      entry.copiesDiffer = entry.levels.filter((d) => {
        const loc = probeAt(d);
        if (!loc) return true;
        const sl = resolveStrings(spec.id, loc, spec), th0 = themed ? goodOf[loc][0] : candidates[0];
        const u0 = unitAt(loc, d);   // the level's first offered unit (null: the template has no unit list)
        return new Set([1, 2, 3].map((v) => makePage({ type: spec, strings: sl, locale: loc, difficulty: d, theme: th0, unit: u0, variant: v }).html)).size > 1;
      });
    } catch (e) { entry.copiesDiffer = entry.levels.slice(); }
    entry.themes = entry.themed ? themes : [];
    templates.push(entry);
  }
  Object.assign(platform, orig);
  // ONE list per maker: engine modules cache what they read (the picture manifest, a bank), so a file is recorded only
  // under the first (template, locale) that read it — a per-template list would miss it. The shell preloads them all.
  const all = new Set(); for (const set of Object.values(reads)) set.forEach((f) => all.add(f));
  modules.forEach((m) => all.delete(m));   // a data module is bundled, not preloaded as a file
  const manifest = { files: [...all].sort() };
  return { templates, strings, manifest, modules: [...modules].sort() };
}

/**
 * The esbuild plugin that turns the Node engine into a browser bundle: the platform swap, the posix `path`, Node-only
 * modules refused (collected in `offenders`), the mini cores, the recorded data modules, the component namespaces, the
 * screen runtimes as literals, a repo-relative __dirname. Shared with scripts/makers/spikes/ (S6) — the makers' bundles
 * and a spike bundle must be the same transformation.
 */
function makerPlugin(modules, offenders) {
  return {
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
      // the JS data modules this maker's templates load through platform.requireData (recorded above)
      b.onResolve({ filter: /^lcs-data-modules$/ }, () => ({ path: 'lcs-data-modules', namespace: 'datamods' }));
      b.onLoad({ filter: /.*/, namespace: 'datamods' }, () => ({
        loader: 'js',
        resolveDir: REPO,
        // getters: a data module is evaluated when first asked for, never while lib/platform/browser.js (which requires
        // this table) is still starting — a data module that requires the platform back would otherwise keep the
        // platform's half-built exports for good ("platform.exists is not a function", the FD maker 2026-11-02)
        contents: 'module.exports = {\n' + modules.map((m) => 'get ' + JSON.stringify(m) + '() { return require(' + JSON.stringify(path.join(REPO, m).replace(/\\/g, '/')) + '); }').join(',\n') + '\n};',
      }));
      // a component namespace (templates/components-bN.js) merges every file of its folder, found with readdirSync in
      // Node: here the folder is listed at build time and the same merge is generated (a duplicate export is an error)
      b.onLoad({ filter: /templates[\\/]components-b\d+\.js$/ }, (a) => {
        const dir = a.path.replace(/\.js$/, '');
        if (!fs.existsSync(dir)) return null;   // components-b2.js is a plain module, not a folder namespace
        const files = fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort();
        const list = files.map((f) => '[' + JSON.stringify(f) + ', require(' + JSON.stringify('./' + path.basename(dir) + '/' + f) + ')]').join(',\n');
        return {
          loader: 'js',
          resolveDir: path.dirname(a.path),
          contents: 'const out = {}, owner = {};\n[' + list + '].forEach(([f, mod]) => {\n  for (const [name, fn] of Object.entries(mod)) {\n'
            + '    if (owner[name]) throw new Error("components: " + name + " exported by both " + owner[name] + " and " + f);\n'
            + '    owner[name] = f; out[name] = fn;\n  }\n});\nout.__owner = owner;\nmodule.exports = out;\n',
        };
      });
      // the screen runtimes shipped as FUNCTION SOURCE (emit/interactive-type-plus.js, interactive-set-clock.js) assert at
      // load that their judge seam is intact — minification would rewrite it and throw at boot. The bundle gets their
      // Node-computed strings as literals (what the catalogue ships), never a minified re-serialisation.
      b.onLoad({ filter: /emit[\\/]interactive-(type-plus|set-clock)\.js$/ }, (a) => {
        const m = require(a.path);
        return { loader: 'js', contents: 'module.exports = ' + JSON.stringify(Object.fromEntries(Object.entries(m).filter(([, v]) => typeof v === 'string'))) + ';' };
      });
      // every module gets a repo-relative __dirname ('/scripts/worksheet-gen/…') for path.join(__dirname, …)
      b.onLoad({ filter: /\.js$/ }, (a) => {
        const src = fs.readFileSync(a.path, 'utf8');
        if (!/__dirname/.test(src)) return null;
        return { loader: 'js', contents: 'var __dirname = ' + JSON.stringify('/' + rel(path.dirname(a.path))) + ';\n' + src };
      });
    },
  };
}

/** Step 3: esbuild with the browser platform. */
async function bundle(makerId, templates, outDir, modules = []) {
  const entryDir = path.join(OUT, '.entries');
  fs.mkdirSync(entryDir, { recursive: true });
  const entryFile = path.join(entryDir, makerId + '.js');
  const lines = templates.map((t) => `  ${JSON.stringify(t.id)}: () => import(${JSON.stringify(path.join(REPO, t.file).replace(/\\/g, '/'))}),`);
  fs.writeFileSync(entryFile, `// generated by scripts/makers/build-bundles.js — do not edit\nimport R from ${JSON.stringify(path.join(__dirname, 'runtime.js').replace(/\\/g, '/'))};\nexport const makePage = R.makePage;\nexport const generate = R.generate;\nexport const gatePage = R.gatePage;\nexport const mountHtml = R.mountHtml;\nexport const platform = R.platform;\nexport const screen = R.screen;\nexport const screenFor = R.screenFor;\nexport const templates = {\n${lines.join('\n')}\n};\n`);
  const offenders = [];
  const plugin = makerPlugin(modules, offenders);
  const r = await esbuild.build({
    entryPoints: { index: entryFile }, bundle: true, format: 'esm', splitting: true, minify: true, sourcemap: 'external',
    target: ['chrome100', 'safari15', 'firefox100'], outdir: outDir, metafile: true, plugins: [plugin], logLevel: 'error',
    define: { 'process.env.NODE_ENV': '"production"' },
  });
  if (offenders.length) throw new Error('Node-only modules reachable from ' + makerId + ':\n  ' + [...new Set(offenders)].join('\n  '));
  // a component namespace is GENERATED above (its Node source with readdirSync is not what the bundle holds)
  const generated = (k) => /templates[\\/]components-b\d+\.js$/.test(k) && fs.existsSync(path.join(REPO, k.replace(/\.js$/, '')));
  const lint = require('./lint-browser-safe.js').check(Object.keys(r.metafile.inputs).filter((k) => !k.includes(':') && !generated(k)), REPO);
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
  // default: every maker built so far (out/makers/versions.json); a NEW maker is built once with --makers=<id>
  const VF = path.join(OUT, 'versions.json');
  const makers = String(args.makers || (fs.existsSync(VF) ? Object.keys(JSON.parse(fs.readFileSync(VF, 'utf8'))).join(',') : 'ten-frames,counting,sight-words')).split(',');
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
  const artData = new Set();   // ART files: copied with the data, never preloaded (fetched one picture at a time)
  for (const id of makers) {
    const { types, maker: mk } = makerTypes(id);
    const rec = record(types);
    // a picture family (topic-map `art`, 2026-11-02): its index is preloaded, every picture file is copied for the
    // browser to fetch when a page draws it (lib/platform/browser.js LAZY + runtime.generate)
    for (const art of (mk && mk.art) || []) {
      // an entry may name the files a maker can reach (`{ dir, only: [module, fn] }`: Find the Differences ships the
      // scenes its faces and Level Set copies use, not every scene in the folder)
      const dirRel = typeof art === 'string' ? art : art.dir;
      const abs = path.join(REPO, dirRel);
      const only = typeof art === 'string' || !art.only ? null : new Set(require(path.join(REPO, art.only[0]))[art.only[1]]().map((id) => id + '.json'));
      const files = fs.readdirSync(abs).filter((f) => f.endsWith('.json') && (!only || only.has(f) || f === 'index.json')).sort().map((f) => dirRel.replace(/\\/g, '/') + '/' + f);
      const index = dirRel.replace(/\\/g, '/') + '/index.json';
      // an index is optional (dot-to-dot has one; colour-by-number's designs are listed in code)
      const hasIndex = files.includes(index);
      rec.manifest.files = [...new Set(rec.manifest.files.filter((f) => !files.includes(f) || f === index).concat(hasIndex ? [index] : []))].sort();
      files.filter((f) => f !== index).forEach((f) => artData.add(f));
    }
    const tmp = path.join(OUT, id, '.build');
    fs.rmSync(tmp, { recursive: true, force: true });
    const meta = await bundle(id, rec.templates, tmp, rec.modules);
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
      // a flagship theme is named by its picture group (data/fl/groups.js)
      const grp = !k && require(path.join(WG, 'data', 'fl', 'groups.js')).GROUPS.find((g) => g.themes.includes(th));
      if (!k && !grp) throw new Error('theme without a taxonomy name: ' + th);
      for (const loc of LOCALES) (themeNames[loc] = themeNames[loc] || {})[th] = k ? tax[k].name[loc] : grp.names[loc];
    }
    // the flagship picture makers: the teacher's picture groups (data/fl/groups.js), read by the theme tiles and the picker
    const flGroups = mk && mk.flagship ? (() => { const { GROUPS } = require(path.join(WG, 'data', 'fl', 'groups.js')); return { order: GROUPS.map((g) => g.id), themes: Object.fromEntries(GROUPS.flatMap((g) => g.themes.map((t) => [t, g.id]))), names: Object.fromEntries(GROUPS.map((g) => [g.id, g.names])) }; })() : null;
    fs.writeFileSync(path.join(dir, 'templates.json'), JSON.stringify({ maker: id, version, answerKey: ANSWER_KEY, themeNames, ...(flGroups ? { artGroups: flGroups } : {}), templates: rec.templates }, null, 1));
    fs.writeFileSync(path.join(dir, 'data-manifest.json'), JSON.stringify(rec.manifest, null, 1));
    for (const [loc, s] of Object.entries(rec.strings)) fs.writeFileSync(path.join(dir, 'strings.' + loc + '.json'), JSON.stringify(s));
    rec.manifest.files.forEach((f) => allData.add(f));
    const js = Object.entries(meta.outputs).filter(([f]) => f.endsWith('.js'));
    const total = js.reduce((s, [, o]) => s + o.bytes, 0);
    const offered = rec.templates.map((t) => t.locales.length).reduce((a, b) => a + b, 0);
    report.push(`${id}@${version}: ${rec.templates.length} templates, ${offered} template×locale offered, JS ${(total / 1024).toFixed(0)} KB raw in ${js.length} files`);
    for (const t of rec.templates) if (Object.keys(t.refused).length) report.push(`   ${t.id} refused: ${Object.entries(t.refused).map(([l, r]) => l + ' (' + r + ')').join(', ')}`);
    // a level a language cannot build is not offered there (the rest of the template is): named, never silent
    for (const t of rec.templates) if (t.levelRefused) report.push(`   ${t.id} levels: ${Object.entries(t.levelRefused).map(([l, by]) => l + ' ' + Object.entries(by).map(([d, w]) => 'L' + d + (w ? ' (' + w.slice(0, 90) + ')' : '')).join(' ')).join(', ')}`);
    if (dataDefects.size) throw new Error(id + ': ' + dataDefects.size + ' data defect(s) — a bank disagrees with the vocabulary, fix the data:\n  ' + [...dataDefects].join('\n  '));
    // a title whose word slot sits mid-sentence needs its gallery label (card-titles.json): the card would read "Circle the in…"
    const noCard = [];
    for (const [loc, byId] of Object.entries(rec.strings)) for (const [tid, s] of Object.entries(byId)) {
      const raw = s.printTitle || s.title || '';
      if (/\{/.test(raw.replace(/\s*[:–—-]\s*[«“„‘”']?\{(UNIT|U|L|N)\}[»”“’']?\s*$/, '')) && !s.cardTitle) noCard.push(`${tid} ${loc}: ${raw}`);
      if (s.cardTitle && /[{}]/.test(s.cardTitle)) noCard.push(`${tid} ${loc}: card label keeps a slot: ${s.cardTitle}`);
    }
    if (noCard.length) throw new Error(id + ': ' + noCard.length + ' gallery card(s) without a label — add them to scripts/makers/card-titles.json:\n  ' + noCard.join('\n  '));
    fs.writeFileSync(path.join(OUT, id, 'current.txt'), version);
    built[id] = version;
  }
  // data: vocab as JSON once, every other recorded file as is; versioned by content
  const vocab = require(path.join(REPO, 'scripts', 'publish-cli', 'deck-rich-alt.js')).loadVocab();
  artData.forEach((f) => allData.add(f));
  const files = [...allData].sort();
  // hashed file by file and copied file by file (2026-11-03: all 59 makers' data joined into one string passed V8's
  // longest string — "Invalid string length"); the digest is the one the joined string gave
  const vocabJson = JSON.stringify(vocab);
  const contentOf = (f) => (f === 'REFERENCE TRANSLATIONS/image-vocabulary.json' ? vocabJson : fs.readFileSync(path.join(REPO, f), 'utf8'));
  const hash = crypto.createHash('sha256');
  let bytes = 0;
  files.forEach((f, i) => { const c = contentOf(f); hash.update((i ? '\0' : '') + f + '\0'); hash.update(c); bytes += Buffer.byteLength(c); });
  const dv = hash.digest('hex').slice(0, 12);
  for (const f of files) { const p = path.join(OUT, 'data', dv, f); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, contentOf(f)); }
  fs.writeFileSync(path.join(OUT, 'data', 'current.txt'), dv);
  writeVersions(built, dv, seed);
  report.push(`data@${dv}: ${files.length} files, ${(bytes / 1024).toFixed(0)} KB`);
  console.log(report.join('\n'));
  // screen verdicts per template (screen-from-marks, 2026-11-01): which templates get a screen built from their answer
  // marks, on which levels, and the runtime / instruction strings the screen needs — into templates.json. --no-screens skips.
  if (!process.argv.includes('--no-screens')) {
    const r = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'build-screens.js'), '--makers=' + makers.join(',')], { stdio: 'inherit' });
    if (r.status !== 0) throw new Error('screen verdicts failed');
  }
  // gallery thumbnails for what was just built (cached by page html: only changed pages are drawn) — a version without
  // them falls back to live miniatures, so they are made here rather than left to a separate step. --no-thumbs skips.
  if (!process.argv.includes('--no-thumbs')) {
    const r = require('child_process').spawnSync(process.execPath, [path.join(__dirname, 'build-thumbs.js'), '--makers=' + makers.join(',')], { stdio: 'inherit' });
    if (r.status !== 0) throw new Error('thumbnails failed');
  }
}

module.exports = { makerPlugin, NODE_ONLY, LOCALES };

if (require.main === module) main().catch((e) => { console.error(e.message); process.exit(1); });
