#!/usr/bin/env node
/**
 * Gate: screen from the answer marks (INTERACTIVE-AND-SHARING §B.5, 2026-11-01) — every eligible template of every built
 * maker yields a WORKING screen, and every template has exactly one verdict.
 *
 * Per built maker × template with screen 'marks' × its screenLevels × en + fi (the long-word locale) × 2 copies:
 *   1. derivation — the page's screen build derives a plan that passes buildInteractive (every part its kind's rules)
 *   2. parity with the key — what the key marks is what the screen grades: the key's written answers, its ringed
 *      choices, its rings and badges, counted against the plan's type / choice / select / pair questions
 *   3. solvable — in a real browser, a bot fills every RIGHT answer by real clicks (pad keys, options, candidates,
 *      targets, bins) → Check → every question right, the celebration opens; then Try again and every WRONG candidate
 *      → every question wrong; then all but one → Check stays disabled
 *   4. no tell — the plan's items follow DOM order; the served page carries no data-lcs-* outside the structural
 *      allow-list and no key layer; its CSS keys nothing on a stripped attribute
 *   5. tap floor — at 768 and 1024 (a tablet, the page 1:1) every page item ≥ 34 px, every control ≥ 44 px; items inside
 *      the page; at 360 the smallest item is reported (the page scales to the phone; the child may pinch — reported, not failed)
 *   6. strings — the screen instruction resolves in every locale the template ships in; the runtime strings ×11
 *   7. classification — every template: exactly one of interactive / screen / writing / many-answers / material / later,
 *      with a reason for the paper-only ones; a template that derives a screen but is listed paper-only, or neither, fails
 * Poisoned on every run, both directions: a card with two right answers → (1) fails; a ring the engine ignores → (2);
 * a runtime whose judge marks everything right → (3); an answer attribute left on the served page → (4); a chip shrunk
 * to 20 px → (5); a correct template passes all of it.
 *
 *   node scripts/makers/gates/screen-from-marks.js [--makers=counting,ten-frames] [--quick]   (quick: en, copy 1)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const runtime = require('../runtime.js');
const screen = require('../screen.js');
const { runtimeStrings } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'emit', 'interactive-runtime.js'));
const { resolveStrings, withLevelInstruction } = require(path.join(REPO, 'scripts', 'worksheet-gen', 'i18n', 'strings.js'));
const VERDICTS = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'screen-verdicts.json'), 'utf8'));
const LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const args = Object.fromEntries(process.argv.slice(2).map((a) => { const m = a.match(/^--([^=]+)=(.*)$/); return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true]; }));
const QUICK = !!args.quick;
// --pool (flagship visual check 2026-11-08): every picture of the template's picker pool at the level (out/flagship-check/pools.json,
// the image library only) as the teacher's pick, copy 1; --templates=a,b; --locales=en
const POOL = args.pool ? JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'flagship-check', 'pools.json'), 'utf8')) : null;
const IDXP = args.pool ? JSON.parse(fs.readFileSync(path.join(REPO, 'scripts', 'worksheet-gen', 'data', 'fl', 'index.json'), 'utf8')).pictures : null;
const ONLY_T = args.templates ? new Set(String(args.templates).split(',')) : null;

const { keyMarks, bot } = require('./lib/marks-bot.js');

/** the visible ink of a page: invisible hit boxes (fill="none", no stroke) and bare <g> wrappers removed */
// an invisible hit box: a <rect> with no stroke, unpainted (fill="none") or painted at opacity 0 — the form that takes a
// tap (an unpainted svg box takes none; K-458, 2026-11-01). A visible fill or any stroke is ink and stays.
const sameInk = (html) => html.replace(/<rect(?![^>]*\sstroke=)(?=[^>]*\s(?:fill="none"|fill-opacity="0"))[^>]*\/?>/g, '').replace(/<g>|<\/g>/g, '');

(async () => {
  const versions = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', 'versions.json'), 'utf8'));
  const makers = String(args.makers || Object.keys(versions).join(',')).split(',');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'lcs-sfm-'));
  const browser = await puppeteer.launch({ args: ['--allow-file-access-from-files'] });
  const page = await browser.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  let fails = 0, screens = 0, classified = 0;
  const fail = (s) => { fails++; if (fails <= 40) console.log('FAIL ' + s); };
  const mountAt = async (html, w) => { if (w) await page.setViewport({ width: w, height: Math.round(w * 1.4) }); const f = path.join(tmp, 's.html'); fs.writeFileSync(f, html); await page.goto('file:///' + f.split(path.sep).join('/'), { waitUntil: 'load' }); await page.evaluate(async () => { await document.fonts.ready; }); return page; };
  const mount = (html) => mountAt(html, 703);

  /** run the whole check list on one served screen; returns the failures */
  async function checkScreen(tag, sc, keyHtml) {
    const out = [];
    const pl = sc.plan;
    // 2. parity with the key
    if (keyHtml) {
      await mount(keyHtml);
      const km = await page.evaluate(keyMarks);
      // a set's spare spaces are not answers: the set's numbers count
      // a blank box (optional, right when left empty) is not an answer the key writes
      const plType = pl.parts.filter((p) => p.cls === 'type').flatMap((p) => p.items).filter((it) => !it.meta['data-lcs-set'] && !it.meta['data-lcs-blank']).concat(Object.values(pl.ctx.sets || {}).flat(), Object.values(pl.ctx.wsets || {}).flat());
      const plChoice = pl.parts.filter((p) => p.cls === 'choice').flatMap((p) => p.items).length;
      const plSelTrue = pl.parts.filter((p) => p.cls === 'select').flatMap((p) => p.items).filter((it) => it.answer).length;
      const plPair = pl.parts.filter((p) => p.cls === 'pair').flatMap((p) => p.items).length;
      // a place target whose key WRITES its answer (the word glued into the box, K-545) counts as a written answer
      const plPlace = pl.parts.filter((p) => p.cls === 'place').flatMap((p) => p.items).length;
      const plSelGroups = pl.parts.some((p) => p.cls === 'select' && p.countGroups);
      // the key marks (written answers, ringed choices, ring marks, badges) are what the screen grades; a key that
      // draws a SAMPLE instead of marks (a painted chart, drawn arcs) may mark less, never more
      const marked = km.ringedChoices + km.rings, graded = plChoice + plSelTrue;
      if (km.written.length > plType.length + plPlace) out.push('key parity: the key writes ' + km.written.length + ' answers, the screen types ' + plType.length + (plPlace ? ' and places ' + plPlace : ''));
      if (km.written.length < plType.length && !km.samples) out.push('key parity: the screen types ' + plType.length + ' answers, the key writes ' + km.written.length + ' and draws no sample');
      if (marked > graded) out.push('key parity: the key rings ' + marked + ' things, the screen grades ' + graded + ' (' + plChoice + ' choices + ' + plSelTrue + ' selected rights)');
      if (marked < graded && !km.samples) out.push('key parity: the screen grades ' + graded + ' ringed things, the key rings ' + marked + ' and draws no sample');
      if (km.badges.length && km.badges.length !== plPair) out.push('key parity: the key badges ' + km.badges.length + ' items, the screen pairs ' + plPair);
      if (!km.badges.length && plPair && !km.samples) out.push('key parity: the screen pairs ' + plPair + ' items, the key badges none and draws no sample');
      if (plSelGroups && km.rings && km.rings !== plSelTrue) out.push('key parity (any N): the key rings ' + km.rings + ', the groups want ' + plSelTrue);
    }
    // 4. no tell
    for (const p of sc.model.parts) { const dom = p.items.map((it) => it.dom); for (let i = 1; i < dom.length; i++) if (!(dom[i] > dom[i - 1])) { out.push('items of a ' + p.cls + ' part not in DOM order'); break; } }
    const left = (sc.html.match(/\sdata-lcs-([a-z0-9-]+)(?=[\s=>/])/g) || []).map((m) => m.trim().slice(9)).filter((n) => !screen.ALLOW.has(n));
    if (left.length) out.push('served page keeps answer attributes: ' + [...new Set(left)].slice(0, 5).join(', '));
    if (/data-lcs-key>/.test(sc.html)) out.push('served page carries the key layer');
    const cssKeyed = (sc.html.match(/<style[^>]*>[\s\S]*?<\/style>/g) || []).join('').match(/\[data-lcs-([a-z0-9-]+)/g) || [];
    if (cssKeyed.some((m) => !screen.ALLOW.has(m.slice(10)))) out.push('page CSS keys on a stripped attribute');
    // 3. solvable (the served page, real clicks)
    await mount(sc.html);
    const right = await page.evaluate(bot, 'right');
    if (right.err) out.push('solvable: ' + right.err);
    else if (right.states.some((s) => s !== 'right' && s !== null)) out.push('solvable: the right answers were not all marked right (' + right.states.filter((s) => s && s !== 'right').length + ' not right)');
    await new Promise((r) => setTimeout(r, 600));
    if (!right.err && !(await page.evaluate(() => !document.getElementById('lcs-celebration').hidden))) out.push('solvable: no celebration on all right');
    await page.evaluate(() => window.__lcsMarks.reset());
    const wrong = await page.evaluate(bot, 'wrong');
    if (wrong.err) out.push('wrong bot: ' + wrong.err);
    else if (wrong.states.some((s) => s === 'right')) out.push('a wrong answer was marked right (' + wrong.states.filter((s) => s === 'right').length + ')');
    await page.evaluate(() => window.__lcsMarks.reset());
    const short = await page.evaluate(bot, 'short');
    if (!short.disabled) out.push('Check enabled with one question unanswered');
    // 5. tap floor, MEASURED on the rendered overlay buttons and controls at each width (the page scales with the
    //    viewport: k = min(1, (w − 16) / 703); the runtime grows a tap target under 34 px to 34 px around its box)
    const items = pl.parts.flatMap((p) => p.cls === 'choice' ? p.items.flatMap((it) => it.options) : p.cls === 'pair' ? p.items.concat(p.targets) : p.cls === 'place' ? p.items.concat(p.bins) : p.items);
    for (const it of items) if (it.x < -5 || it.y < -5 || it.x + it.w > 105 || it.y + it.h > 105) { out.push('an item outside the page'); break; }
    const measure = () => ({
      items: Array.from(document.querySelectorAll('#lcs-overlay button')).map((b) => { const r = b.getBoundingClientRect(); return Math.min(r.width, r.height); }),
      controls: Array.from(document.querySelectorAll('.lcs-btn, .lcs-key')).filter((b) => !b.hidden && b.offsetParent).map((b) => { const r = b.getBoundingClientRect(); return Math.min(r.width, r.height); }),
    });
    let min360 = Infinity;
    for (const [w, floor] of [[768, 34], [1024, 34], [360, null]]) {
      await mountAt(sc.html, w);
      const m = await page.evaluate(measure);
      if (!m.items.length) out.push(`tap floor at ${w}: no tap targets rendered`);
      if (m.controls.some((h) => h < 44)) out.push(`a control under 44 px at ${w}`);
      if (floor) { const small = m.items.filter((h) => h < floor); if (small.length) out.push(`tap floor at ${w}: ${small.length} items under ${floor} px (smallest ${Math.min(...small).toFixed(1)})`); }
      else min360 = Math.min(...m.items);
    }
    return { fails: out, min360 };
  }

  // ---- the templates
  const phoneReport = [];
  for (const maker of makers) {
    const v = versions[maker];
    const tj = JSON.parse(fs.readFileSync(path.join(REPO, 'out', 'makers', maker, v.current, 'templates.json'), 'utf8'));
    if (!tj.runtimeStrings || !tj.screenInstructions) { fail(`${maker}: templates.json has no runtimeStrings / screenInstructions — run build-screens.js`); continue; }
    // 6. strings ×11
    for (const loc of LOCALES) { if (!tj.runtimeStrings[loc] || !tj.runtimeStrings[loc].check) fail(`${maker}: no runtime strings for ${loc}`); for (const k of ['type', 'tap-choice', 'tap-select', 'tap-pair', 'tap-place']) if (!(tj.screenInstructions[loc] || {})[k]) fail(`${maker}: no ${k} screen instruction for ${loc}`); }
    for (const t of tj.templates) {
      // 7. classification
      classified++;
      const paper = ['writing', 'many-answers', 'material'].filter((k) => VERDICTS[k].ids.includes(t.id)).concat(VERDICTS.later.ids[t.id] ? ['later'] : []);
      const verdicts = (t.interactive ? ['interactive'] : []).concat(t.screen === 'marks' ? ['screen'] : []).concat(paper);
      if (verdicts.length !== 1) fail(`${t.id}: ${verdicts.length ? verdicts.join(' + ') : 'NO'} verdict (${t.verdict || '-'}${t.screenReason ? ': ' + String(t.screenReason).slice(0, 120) : ''})`);
      if (t.screen !== 'marks') continue;
      if (ONLY_T && !ONLY_T.has(t.id)) continue;
      const type = require(path.join(REPO, t.file));
      const locs = (args.locales ? String(args.locales).split(',') : QUICK ? ['en'] : ['en', 'fi']).filter((l) => t.locales.includes(l));
      for (const loc of locs) for (const d of t.screenLevels.filter((x) => ((t.localeLevels && t.localeLevels[loc]) || t.levels).includes(x))) for (const pick of (POOL ? ((((POOL[maker] || {})[t.id] || {})[d] || { pool: [] }).pool.filter((k) => args['with-new'] || !(IDXP[k] && IDXP[k].n === 1))) : QUICK ? [1] : [1, 2])) {
        const variant = POOL ? 1 : pick, ov = POOL ? { overrides: { art: [pick] } } : {};
        const s = withLevelInstruction(resolveStrings(t.id, loc, type), t.id, d, loc);
        const theme = t.themed ? ((t.localeThemes && t.localeThemes[loc]) || t.themes)[(variant - 1) % ((t.localeThemes && t.localeThemes[loc]) || t.themes).length] : null;
        const lu = ((t.units && t.units[loc]) || []).filter((u) => (!t.unitLevels || t.unitLevels[u.id] === d) && (!t.localeUnitLevels || !t.localeUnitLevels[loc] || (t.localeUnitLevels[loc][u.id] || []).includes(d)));   // the level's units
        const unit = lu.length ? lu[variant % lu.length].id : null;
        const tag = `${t.id} ${loc} L${d} ${POOL ? 'pick ' + pick : 'v' + variant}`;
        let r, sc;
        try {
          // the page the browser builds: a seed that misses is retried with fresh seeds (runtime.generate), so a build that
          // throws takes the same ladder here; a page no retry builds is a FAIL
          for (let k = 0; k <= 4 && !r; k++) {
            try { r = runtime.makePage({ type, strings: s, locale: loc, difficulty: d, theme, unit, variant, ...ov, answerKey: true, answerKeySuffix: tj.answerKey[loc], screen: true, ...(k ? { seedVariant: variant + '.' + k } : {}) }); } catch (e) { if (k === 4) throw e; }
          }
          sc = await screen.buildScreen({ html: r.screenHtml, locale: loc, strings: tj.runtimeStrings[loc], instruction: (pl) => tj.screenInstructions[loc][screen.instructionKey(pl)], mount });
        } catch (e) { fail(`${tag}: derivation — ${e.reasons ? e.reasons.join('; ') : e.message}`); continue; }
        if (!sc.instruction) fail(`${tag}: no screen instruction`);
        // the screen build adds marks only — attributes, and invisible hit boxes (a <rect fill="none"> without a stroke,
        // a <g> wrapper) over svg cells and ticks: with those removed, it is the printed page
        if (sameInk(screen.stripMarks(r.screenHtml)) !== sameInk(screen.stripMarks(r.html))) fail(`${tag}: the screen build changed the page beyond its marks`);
        screens++;
        const res = await checkScreen(tag, sc, r.keyHtml);
        res.fails.forEach((f) => fail(`${tag}: ${f}`));
        if (loc === 'en' && variant === 1) phoneReport.push([t.id, d, res.min360]);
      }
    }
  }

  // ---- poisons, both directions (a correct page: counting K-002 / K-006 en L2)
  const en = runtimeStrings('en');
  const K002 = require(path.join(REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js'));
  const K006 = require(path.join(REPO, 'scripts/worksheet-gen/types/k/K-006-count-scattered-write.js'));
  const base2 = runtime.makePage({ type: K002, strings: resolveStrings('K-002', 'en', K002), locale: 'en', difficulty: 2, theme: 'animals', variant: 1, answerKey: true, screen: true });
  const base6 = runtime.makePage({ type: K006, strings: resolveStrings('K-006', 'en', K006), locale: 'en', difficulty: 2, theme: 'animals', variant: 1, answerKey: true, screen: true });
  const mk = (html, loc = 'en') => screen.buildScreen({ html, locale: loc, strings: en, instruction: 'x', mount });
  // control: the correct pages pass everything
  for (const [name, b] of [['K-002', base2], ['K-006', base6]]) { const sc = await mk(b.screenHtml); const res = await checkScreen(name, sc, b.keyHtml); if (res.fails.length) fail(`poison control: a correct ${name} fails: ${res.fails.join('; ')}`); }
  // (1) two right answers in one chip row must fail derivation
  const two = base2.screenHtml.replace(/<span class="ws-chip"(?![^>]*data-lcs-correct)[^>]*>/, (m) => m.replace(/>$/, ' data-lcs-correct="1">'));
  try { await mk(two); fail('poison 1: a chip row with two right answers derived a screen'); } catch (e) { /* right */ }
  // (2) a ring the engine ignores: a key that rings one more thing than the screen grades must fail parity
  { const sc = await mk(base2.screenHtml); const k2 = base2.keyHtml.replace('<img class="ws-icon"', '<img class="ws-icon" data-lcs-key-ring="1"'); const res = await checkScreen('K-002', sc, k2); if (!res.fails.some((f) => /key parity/.test(f))) fail('poison 2: a key ring the screen ignores passed parity'); }
  // (3) a runtime whose judge marks everything right must fail the wrong bot
  { const sc = await mk(base6.screenHtml); sc.html = sc.html.replace('var R = function (x) { return x; };', 'var R = function (x) { return true; };'); if (!/return true; };/.test(sc.html)) fail('poison 3: the judge seam was not found'); const res = await checkScreen('K-006', sc, null); if (!res.fails.some((f) => /marked right/.test(f))) fail('poison 3: a runtime that marks everything right passed'); }
  // (4) an answer attribute left on the served page must fail
  { const sc = await mk(base6.screenHtml); sc.html = sc.html.replace('<span class="ws-answerbox"', '<span class="ws-answerbox" data-lcs-answer="7"'); const res = await checkScreen('K-006', sc, null); if (!res.fails.some((f) => /answer attributes/.test(f))) fail('poison 4: a served page with data-lcs-answer passed'); }
  // (5) a chip shrunk to 20 px must fail the tap floor
  { const sc = await mk(base2.screenHtml); sc.html = sc.html.replace('</head>', '<style>#lcs-overlay button[data-lcs-q="0"]{width:20px!important;height:20px!important}</style></head>'); const res = await checkScreen('K-002', sc, null); if (!res.fails.some((f) => /tap floor/.test(f))) fail('poison 5: a 20 px chip passed the tap floor'); }
  // (7) classification: a template with two verdicts, and one with none, must fail (the same rule, on synthetic entries)
  { const vs = (t) => (t.interactive ? ['interactive'] : []).concat(t.screen === 'marks' ? ['screen'] : []).concat(VERDICTS.writing.ids.includes(t.id) ? ['writing'] : []); if (vs({ id: 'K-005', screen: 'marks' }).length === 1) fail('poison 7: a writing template with a screen counted as one verdict'); if (vs({ id: 'K-002', screen: null }).length !== 0) fail('poison 7: a template with nothing counted as a verdict'); }

  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
  if (errs.length) fail('page errors: ' + errs.slice(0, 3).join(' | '));
  const smallest = phoneReport.filter((r) => Number.isFinite(r[2])).sort((a, b) => a[2] - b[2]).slice(0, 5).map((r) => `${r[0]} L${r[1]} ${r[2].toFixed(0)} px`);
  console.log(`phone (360 px, the page scaled 0.49): smallest page items ${smallest.join(', ')} — reported, not failed (the child pinches; a tablet shows the page 1:1)`);
  console.log(fails ? `screen from marks: ${screens} screens, ${classified} templates classified, ${fails} failing` : `screen from marks: ${screens} screens pass, ${classified} templates classified, poisons fire both ways`);
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('screen from marks: error — ' + e.stack); process.exit(1); });
