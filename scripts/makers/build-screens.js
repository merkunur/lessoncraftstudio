#!/usr/bin/env node
/**
 * Screen verdicts per template (screen-from-marks, 2026-11-01) — run by build-bundles.js after a maker's bundle is
 * written (before the thumbnails), or alone:
 *
 *   node scripts/makers/build-screens.js [--makers=counting,ten-frames]
 *
 * For every template of each maker, into its templates.json:
 *   screen        'declared' (the module declares interactive) | 'marks' (a screen derived from the page's answer marks,
 *                 scripts/makers/screen.js) | null
 *   screenLevels  the levels whose page derives a screen (en, the first theme, copy 1 — the structure of a page does not
 *                 change with the locale or the copy; the gate measures the rest)
 *   screenReason  why there is none: the verdict's reason (screen-verdicts.json: writing / many-answers / material /
 *                 later) or the engine's reasons per level
 *   verdict       interactive | screen | writing | many-answers | material | later
 * and once per templates.json: runtimeStrings (Check / Try again … ×11, interactive-runtime.js), screenInstructions
 * (the 5 generic sentences ×11) and screenUi (the preview's words ×11) from i18n/screen-instructions.json.
 */
'use strict';
// the page the maker would show: the page or one of its fresh-seed retries (runtime.generate's ladder, 2026-11-02 — a
// level whose first seed cannot be built is not a level without a screen)
const ladder = async (variant, fn) => { let err; for (const sv of [null, '.1', '.2', '.3', '.4']) { try { return await fn(sv); } catch (e) { err = err || e; } } throw err; };
const fs = require('fs');
const path = require('path');
const os = require('os');

const REPO = path.resolve(__dirname, '..', '..');
const OUT = path.join(REPO, 'out', 'makers');
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));

const VERDICTS = JSON.parse(fs.readFileSync(path.join(__dirname, 'screen-verdicts.json'), 'utf8'));
const STRINGS = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'screen-instructions.json'), 'utf8'));
const INTERACTIVE = JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'interactive-instructions.json'), 'utf8'));

/** the paper-only verdict of a template id, or null */
function paperVerdict(id) {
  for (const v of ['writing', 'many-answers', 'material']) if (VERDICTS[v].ids.includes(id)) return { verdict: v, reason: VERDICTS[v].reason };
  if (VERDICTS.later.ids[id]) return { verdict: 'later', reason: VERDICTS.later.ids[id] };
  return null;
}

/** the generic strings every templates.json carries */
function sharedStrings() {
  const { runtimeStrings } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'emit', 'interactive-runtime.js'));
  const runtime = {}, instructions = {}, ui = {};
  for (const loc of LOCALES) {
    runtime[loc] = runtimeStrings(loc);
    instructions[loc] = {};
    for (const [kind, by] of Object.entries(STRINGS._generic)) { if (!by[loc]) throw new Error('screen-instructions.json: ' + kind + ' has no ' + loc); instructions[loc][kind] = by[loc]; }
    ui[loc] = {};
    for (const [k, by] of Object.entries(STRINGS._ui)) { if (!by[loc]) throw new Error('screen-instructions.json: _ui.' + k + ' has no ' + loc); ui[loc][k] = by[loc]; }
  }
  return { runtimeStrings: runtime, screenInstructions: instructions, screenUi: ui };
}

async function main() {
  const versions = JSON.parse(fs.readFileSync(path.join(OUT, 'versions.json'), 'utf8'));
  const makers = String(args.makers || Object.keys(versions).join(',')).split(',');
  const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
  const runtime = require('./runtime.js');
  const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
  const shared = sharedStrings();
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-screens-'));
  const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 703, height: 945 });
  const mount = async (html) => { const f = path.join(tmp, 's.html'); fs.writeFileSync(f, html); await page.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'load' }); await page.evaluate(async () => { await document.fonts.ready; }); return page; };
  const report = [];
  for (const maker of makers) {
    const v = versions[maker];
    if (!v) throw new Error('no built maker ' + maker);
    const file = path.join(OUT, maker, v.current, 'templates.json');
    const tj = JSON.parse(fs.readFileSync(file, 'utf8'));
    let n = 0, counts = {};
    for (const t of tj.templates) {
      const paper = paperVerdict(t.id);
      if (t.interactive) {
        if (paper) throw new Error(t.id + ' declares interactive but is listed as ' + paper.verdict);
        // the declared screen (2026-11-01): built in the browser by screen.js buildDeclaredScreen — the native screen
        // instruction per locale and level (the catalogue's: strings.screenInstruction, else interactive-instructions.json)
        // and the levels whose en page measures into a working screen
        const type = require(path.join(REPO, t.file));
        const instr = {};
        if (!t.locales.length) {
          Object.assign(t, { screen: null, screenLevels: [], screenInstructions: {}, screenReason: 'the template ships in no language', verdict: 'interactive' });
          report.push(`   ${t.id}: no declared screen — the template ships in no language`);
          n++; counts[t.verdict] = (counts[t.verdict] || 0) + 1;
          continue;
        }
        for (const loc of t.locales) {
          instr[loc] = {};
          for (const d of t.levels) {
            const s = resolveStrings(t.id, loc, type);
            const fam = INTERACTIVE[type.exerciseType];
            const key = typeof type.interactive.instructionKey === 'function' ? type.interactive.instructionKey(d, type) : type.interactive.instructionKey;
            const text = (s && s.screenInstruction) || (fam && fam[key] && fam[key][loc]);
            if (!text) throw new Error(t.id + ': no screen instruction ' + type.exerciseType + '.' + key + ' for ' + loc);
            instr[loc][d] = text;
          }
        }
        const levels = [], reasons = [], paths = {};
        const loc0 = t.locales.includes('en') ? 'en' : t.locales[0];
        if (!runtime.screen.DECLARED_KINDS.has(type.interactive.kind)) reasons.push('the ' + type.interactive.kind + ' screen is built with its maker (picture capture)');
        else for (const d of t.levels) {
          // copy 1 (at level 2 the published face) AND copy 2 (a teacher's new page): both must yield a screen
          const s = withLevelInstruction(resolveStrings(t.id, loc0, type), t.id, d, loc0);
          const theme = t.themed ? t.themes[0] : null;
          const unit = t.units && t.units[loc0] && t.units[loc0][0] ? t.units[loc0][0].id : null;
          try {
            const got = [];
            for (const variant of [1, 2]) got.push((await ladder(variant, (sv) => runtime.screenFor({ type, strings: s, locale: loc0, difficulty: d, theme, unit, variant, ...(sv ? { seedVariant: variant + sv } : {}), tpl: { ...t, screenInstructions: instr }, runtimeStrings: shared.runtimeStrings[loc0], marksInstructions: shared.screenInstructions[loc0] }, mount))).path);
            levels.push(d); paths[d] = got;
          } catch (e) { reasons.push('L' + d + ': ' + (e.reasons ? e.reasons.join('; ') : e.message)); }
        }
        Object.assign(t, { screen: levels.length ? 'declared' : null, screenLevels: levels, screenPaths: paths, screenInstructions: instr, screenReason: levels.length === t.levels.length ? null : reasons.join(' | '), verdict: 'interactive' });
        if (!levels.length) report.push(`   ${t.id}: no declared screen — ${reasons.join(' | ').slice(0, 220)}`);
        else if (levels.length < t.levels.length) report.push(`   ${t.id}: declared screen on levels ${levels.join(',')} only — ${reasons.join(' | ').slice(0, 160)}`);
      } else if (paper) {
        Object.assign(t, { screen: null, screenLevels: [], screenReason: paper.reason, verdict: paper.verdict });
      } else {
        const type = require(path.join(REPO, t.file));
        const levels = [], reasons = [];
        for (const d of t.levels) {
          const s = withLevelInstruction(resolveStrings(t.id, 'en', type), t.id, d, 'en');
          const theme = t.themed ? t.themes[0] : null;
          const unit = t.units && t.units.en && t.units.en[0] ? t.units.en[0].id : null;
          try {
            const r = runtime.makePage({ type, strings: s, locale: 'en', difficulty: d, theme, unit, variant: 1, screen: true });
            await runtime.screen.buildScreen({ html: r.screenHtml, locale: 'en', strings: shared.runtimeStrings.en, instruction: 'x', mount });
            levels.push(d);
          } catch (e) { const lv = VERDICTS.levels && VERDICTS.levels[t.id] && VERDICTS.levels[t.id][d]; reasons.push('L' + d + ': ' + (lv || (e.reasons ? e.reasons.join('; ') : e.message))); }
        }
        Object.assign(t, { screen: levels.length ? 'marks' : null, screenLevels: levels, screenReason: levels.length === t.levels.length ? null : reasons.join(' | '), verdict: levels.length ? 'screen' : 'none' });
        // a marks screen whose generic sentence ("tap the answer you would circle") does not fit its page carries its own
        // (interactive-instructions.json <exerciseType>["marks:<id>"], 2026-11-02: the pattern train has nothing to circle)
        const own = (INTERACTIVE[type.exerciseType] || {})['marks:' + t.id];
        if (own && levels.length) {
          t.screenInstructions = {};
          for (const loc of t.locales) {
            if (!own[loc]) throw new Error(t.id + ': interactive-instructions.json ' + type.exerciseType + '.marks:' + t.id + ' has no ' + loc);
            t.screenInstructions[loc] = Object.fromEntries(levels.map((d) => [d, own[loc]]));
          }
        }
        if (!levels.length) report.push(`   ${t.id}: no screen — ${reasons.join(' | ').slice(0, 220)}`);
        else if (levels.length < t.levels.length) report.push(`   ${t.id}: screen on levels ${levels.join(',')} only — ${reasons.join(' | ').slice(0, 160)}`);
      }
      n++;
      counts[t.verdict] = (counts[t.verdict] || 0) + 1;
    }
    Object.assign(tj, shared);
    fs.writeFileSync(file, JSON.stringify(tj, null, 1));
    report.unshift(`${maker}: ${n} templates — ${Object.entries(counts).map(([k, c]) => k + ' ' + c).join(', ')}`);
  }
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(report.join('\n'));
}

main().catch((e) => { console.error('build-screens: ' + e.message); process.exit(1); });
