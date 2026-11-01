#!/usr/bin/env node
/**
 * Gate 9 `own-input` (ARCHITECTURE §15; task 4 of the ten, 2026-11-01): what a teacher types or swaps never breaks a
 * page and never slips past the gates. Own input = typed title / instruction + picture / word swaps from the reviewed
 * library (own-image upload is banned, operator 2026-11-01).
 *
 * A. Typed text, through the maker screen with real dialogs (per built maker: its first template, en; plus fi for the
 *    long-word check), each case either ACCEPTED — then the shown page passes an INDEPENDENT check in Node (the
 *    catalogue lints: overflow / footer / broken image / font; title and instruction ≤ 3 rendered lines; Print enabled)
 *    — or REFUSED with the sentence and the page unchanged:
 *      1. an 80-glyph word with no space       2. "Free printable …" (the free-claim ban must refuse it)
 *      3. HTML in the title (<b>, an <img onerror>) → shown as text, nothing injected, nothing runs
 *      4. a 220-character instruction           5. whitespace only → the original text comes back
 *      6. a three-line instruction that fits → accepted
 * B. Library swaps, through the maker's own generate() in the browser (the shell's path): for every template × level
 *    that exposes a slot, every k-th key of each role's pool (12 per role) on slot 0 → either applied (the slot shows
 *    the key, every other item unchanged, the page content (meta) unchanged, the page passes the independent lints)
 *    or refused (no page shown); a key outside the pool and a duplicate are refused. Non-vacuity: a slot role with
 *    no accepted swap at all fails; an "applied" swap whose page did not change fails.
 * Poisons, both directions, every run: the independent line counter must report 4 lines on a title squeezed to 4;
 * the shell must REFUSE case 2 and 4 and ACCEPT case 6 (a gate that never refuses, or never accepts, is broken).
 *
 *   node scripts/makers/gates/own-input.js [--makers=a,b] [--quick] [--per=12]
 */
'use strict';
const http = require('http');
const path = require('path');
const MP = require('./lib/maker-pages.js');
const { handler } = require('../serve.js');
const { runLints } = require(path.join(MP.REPO, 'scripts', 'worksheet-gen', 'qa', 'lints.js'));

const A = MP.args();
const QUICK = !!A.quick;
const PER = Number(A.per || (QUICK ? 4 : 12));

/** rendered line count of the title and instruction (runtime.js gatePage's rule, measured here independently) */
const lineCount = () => {
  const count = (el) => { if (!el) return 0; const r = document.createRange(); r.selectNodeContents(el); return new Set([...r.getClientRects()].filter((x) => x.width > 0).map((x) => Math.round(x.top))).size; };
  return { title: count(document.querySelector('[data-lcs-title]')), instruction: count(document.querySelector('[data-lcs-instruction]')), titleText: (document.querySelector('[data-lcs-title]') || {}).textContent || '', injected: !!document.querySelector('[data-lcs-title] b, [data-lcs-title] img, [data-lcs-page] img[onerror]'), pwned: !!window.__pwned };
};

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const set = (q) => new Promise((r) => http.get(`${base}/__dev/access?${q}`, (res) => { res.resume(); res.on('end', r); }));
  await set('as=sub&made=0&downloaded=0');
  const makers = MP.builtMakers(A.makers);
  const m = await new MP.Mounter({ base }).open();   // the independent Node-side check (pictures from the gate's own server)
  const puppeteer = require(path.join(MP.REPO, 'node_modules', 'puppeteer'));
  const browser = await puppeteer.launch();
  const p = await browser.newPage();
  const errs = [];
  p.on('pageerror', (e) => errs.push(e.message));
  await p.setViewport({ width: 1366, height: 900 });
  const settle = (ms = 700) => new Promise((r) => setTimeout(r, ms));
  let fails = 0, cases = 0, swaps = 0, accepted = 0, refused = 0;
  const fail = (s) => { fails++; if (fails <= 60) console.log('FAIL ' + s); };

  /** independent check of a shown page: lints + line counts */
  async function independent(html, gradeBand) {
    const page = await m.mount(html, 703);
    const lints = (await runLints(page, { gradeBand })).filter((x) => /overflow|footer|broken image|font too small|claims free/.test(x));
    const lines = await page.evaluate(lineCount);
    return { lints, lines };
  }

  // ---- A. typed text through the screen
  const shown = () => p.evaluate(() => document.querySelector('.mk-sheet iframe').getAttribute('srcdoc'));
  const textOf = (sel) => p.evaluate((sel) => document.querySelector('.mk-sheet iframe').contentDocument.querySelector(sel).textContent.trim(), sel);
  const openEditor = async (sel) => { await p.evaluate((sel) => document.querySelector('.mk-sheet iframe').contentDocument.querySelector(sel).dispatchEvent(new MouseEvent('click', { bubbles: true })), sel); await settle(400); };
  const submit = async (value) => { await p.evaluate((v) => { const i = document.querySelector('#mk-picker .mk-text-input'); i.value = v; document.querySelector('#mk-picker .mk-primary').click(); }, value); await settle(1600); return p.evaluate(() => { const d = document.getElementById('mk-picker'); return { refused: d.open, note: (document.getElementById('mk-pick-note') || {}).textContent || '', printOff: document.getElementById('mk-print').disabled }; }); };
  const closeDlg = () => p.evaluate(() => { const d = document.getElementById('mk-picker'); if (d && d.open) d.close(); });
  const restore = async (sel) => { await openEditor(sel); await p.evaluate(() => document.querySelector('#mk-picker .mk-text-actions .mk-link').click()); await settle(1200); };

  const CASES = [
    { n: 1, field: 'title', sel: '[data-lcs-title]', value: 'Ü' + 'supercalifragilisticexpialidocious'.repeat(3).slice(0, 79), expect: 'either' },
    { n: 2, field: 'title', sel: '[data-lcs-title]', value: 'Free printable worksheet', expect: 'refused', only: 'en' },
    { n: 3, field: 'title', sel: '[data-lcs-title]', value: '<b>bold</b> <img src=x onerror="window.__pwned=1"> title', expect: 'accepted-text' },
    { n: 4, field: 'instruction', sel: '[data-lcs-instruction]', value: 'Count every picture in every box very carefully and then circle the right number. '.repeat(3).slice(0, 220), expect: 'either' },
    { n: 5, field: 'title', sel: '[data-lcs-title]', value: '   ', expect: 'original' },
    { n: 6, field: 'instruction', sel: '[data-lcs-instruction]', value: 'Count the pictures in each box. Then circle the number that tells how many there are.', expect: 'accepted' },
  ];
  const textSets = [];
  for (const { maker, tj } of makers) {
    for (const loc of QUICK ? ['en'] : ['en', 'fi']) {
      const t = tj.templates.find((x) => x.locales.includes(loc));
      if (!t) continue;
      textSets.push({ maker, tj, t, loc });
    }
  }
  const must = { refused2: false, refused4: false, accepted6: false };
  for (const { maker, tj, t, loc } of textSets) {
    const type = MP.loadType(t);
    await p.goto(`${base}/makers/app/?maker=${maker}&lang=${loc}&t=${t.id}`, { waitUntil: 'networkidle0' }); await settle(1200);
    const h0 = await shown();
    if (!h0) { fail(`${maker} ${loc}: no page shown`); continue; }
    const t0 = await textOf('[data-lcs-title]'), i0 = await textOf('[data-lcs-instruction]');
    for (const c of CASES) {
      if (c.only && c.only !== loc) continue;
      cases++;
      const tag = `${maker} ${t.id} ${loc} case ${c.n} (${c.field})`;
      await openEditor(c.sel);
      const opened = await p.evaluate(() => !!(document.getElementById('mk-picker') || {}).open && !!document.querySelector('#mk-picker .mk-text-input'));
      if (!opened) { fail(`${tag}: the text editor did not open`); continue; }
      const r = await submit(c.value);
      const now = await textOf(c.sel);
      if (r.refused) {
        await closeDlg();
        if (!/\S/.test(r.note)) fail(`${tag}: refused without a sentence`);
        if ((c.field === 'title' ? now !== t0 : now !== i0)) fail(`${tag}: refused but the page changed`);
        if (c.expect === 'accepted' || c.expect === 'accepted-text') fail(`${tag}: refused ("${r.note}") — this text fits and must be accepted`);
        if (c.n === 2) must.refused2 = true; if (c.n === 4) must.refused4 = true;
        refused++;
        continue;
      }
      accepted++;
      if (c.expect === 'refused') fail(`${tag}: ACCEPTED "${c.value}" — must be refused`);
      if (c.n === 6) must.accepted6 = true;
      const html = await shown();
      const ind = await independent(html, type.gradeBand);
      if (ind.lints.length) fail(`${tag}: accepted, but the page fails ${ind.lints[0]}`);
      if (ind.lines.title > 3 || ind.lines.instruction > 3) fail(`${tag}: accepted, but the ${ind.lines.title > 3 ? 'title' : 'instruction'} runs to ${Math.max(ind.lines.title, ind.lines.instruction)} lines`);
      if (r.printOff) fail(`${tag}: accepted, but Print is disabled (a refused page is shown)`);
      if (c.expect === 'original') { if (now !== (c.field === 'title' ? t0 : i0)) fail(`${tag}: whitespace did not restore the original (${now})`); }
      else if (c.field === 'title' && now !== c.value.trim().replace(/\s+/g, ' ')) fail(`${tag}: the title shown is not the text typed ("${now.slice(0, 40)}")`);
      if (c.n === 3 && (ind.lines.injected || ind.lines.pwned)) fail(`${tag}: HTML typed into the title was INJECTED (${ind.lines.injected ? 'an element' : 'script ran'})`);
      if (c.n === 3) { const live = await p.evaluate(() => { const d = document.querySelector('.mk-sheet iframe').contentDocument; return { b: !!d.querySelector('[data-lcs-title] b'), img: d.querySelectorAll('img[onerror]').length, pwned: !!d.defaultView.__pwned }; }); if (live.b || live.img || live.pwned) fail(`${tag}: HTML typed into the title was injected in the LIVE preview`); }
      await restore(c.sel);
      const back = await textOf(c.sel);
      if (back !== (c.field === 'title' ? t0 : i0)) fail(`${tag}: "Original text" did not restore (${back.slice(0, 40)})`);
    }
    console.log(`${maker} ${t.id} ${loc}: typed-text cases done`);
  }
  if (!must.refused2) fail('poison (shell, must fire): "Free printable worksheet" was never refused');
  if (!must.refused4 && !QUICK) console.log('note the 220-character instruction fitted everywhere it was tried (nothing refused it) — the three-line rule was not exercised by case 4');
  if (!must.accepted6) fail('poison (shell, must pass): the fitting three-line instruction was never accepted');

  // poison of the independent counter: a title squeezed to 4+ lines must be counted as such
  {
    const K002 = require(path.join(MP.REPO, 'scripts/worksheet-gen/types/k/K-002-count-and-circle.js'));
    const r = MP.buildPage({ id: 'K-002' }, K002, { answerKey: { en: 'Answer key' } }, 'en', { difficulty: 2, theme: 'animals', unit: null, variant: 1 }, { strings: { title: 'Count and circle the pictures in every box of this worksheet', instruction: 'Count.' } });
    const ind = await independent(r.html.replace('</head>', '<style>[data-lcs-title]{display:block;width:150px}</style></head>'), 'K');
    if (ind.lines.title < 4) fail(`poison: a title squeezed into 150 px counted ${ind.lines.title} lines (want ≥ 4)`);
  }

  // ---- B. library swaps through the maker's own generate() (every slot-exposing template × level)
  for (const { maker, tj } of makers) {
    let n = 0;
    for (const loc of QUICK ? ['en'] : ['en', 'fi']) {
      await p.goto(`${base}/makers/app/?maker=${maker}&lang=${loc}`, { waitUntil: 'networkidle0' });
      await p.waitForFunction(() => window.__lcsMaker, { timeout: 60000 });
      const res = await p.evaluate(async ({ PER, sample }) => {
        const M = window.__lcsMaker;
        const out = [];
        for (const t of M.tj.templates.filter((x) => x.locales.includes(M.LANG))) {
          const type = await M.loadType(t.id);
          const units = (t.units && t.units[M.LANG]) || [];
          for (const d of t.levels) {
            const o = { type, strings: M.stringsFor(t.id, d), locale: M.LANG, difficulty: d, theme: t.themed ? t.themes[sample % t.themes.length] : null, unit: units.length ? units[sample % units.length].id : null, variant: 1 + sample, answerKey: false, answerKeySuffix: M.tj.answerKey[M.LANG] };
            const b = await M.mod.generate(o, M.mount);
            // the CONTENT is the same apart from the swapped picture's own name (a card may record its noun: K-002 cards carry
            // {count, noun, choices} — the counts and choices must not move, the noun does by design)
            const sameBut = (m1, k1, m0, k0) => JSON.stringify(m1).split(JSON.stringify(k1)).join('"§"') === JSON.stringify(m0).split(JSON.stringify(k0)).join('"§"');
            if (!b.ok) { out.push({ id: t.id, d, role: '-', base: false }); continue; }
            for (const role of Object.keys(b.slots || {})) {
              const s = b.slots[role];
              const pool = s.pool.filter((k) => !s.values.includes(k));
              const keys = pool.filter((_, i) => i % Math.max(1, Math.round(pool.length / PER)) === 0).slice(0, PER);
              const rows = [];
              for (const key of keys) {
                const r = await M.mod.generate({ ...o, overrides: { [role]: { 0: key } } }, M.mount);
                rows.push({ key, ok: r.ok, applied: r.ok && r.slots && r.slots[role] && r.slots[role].values[0] === key, others: r.ok ? JSON.stringify(r.slots[role].values.slice(1)) === JSON.stringify(s.values.slice(1)) : null, sameMeta: r.ok ? sameBut(r.meta, key, b.meta, s.values[0]) : null, changed: r.ok ? r.html !== b.html : null, retried: r.ok ? !!(r.attempt && r.attempt.seedVariant) : null, html: r.ok ? r.html : null, why: r.ok ? null : (r.fails || [])[0] });
              }
              const dup = s.values.length > 1 ? await M.mod.generate({ ...o, overrides: { [role]: { 0: s.values[1] } } }, M.mount) : null;
              const outside = await M.mod.generate({ ...o, overrides: { [role]: { 0: '__not_in_pool__' } } }, M.mount);
              out.push({ id: t.id, d, role, base: true, pool: pool.length, rows, dupApplied: dup ? dup.ok && dup.html !== b.html : false, outsideApplied: outside.ok && outside.html !== b.html, grade: type.gradeBand });
            }
          }
        }
        return out;
      }, { PER, sample: loc === 'en' ? 0 : 1 });
      for (const r of res) {
        if (!r.base) { console.log(`note ${maker} ${r.id} ${loc} L${r.d}: the base page is refused (live gate)`); continue; }
        n++;
        if (r.dupApplied) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}: a duplicate of another item was applied`);
        if (r.outsideApplied) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}: a key outside the pool was applied`);
        let acc = 0;
        for (const row of r.rows) {
          swaps++;
          if (!row.ok) { refused++; continue; }
          if (!row.applied) { if (row.retried) { refused++; continue; } fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: generate ok but the slot does not show the key`); continue; }
          if (row.retried) { refused++; continue; }   // the shell counts a seed retry as a refusal of the choice (choosePick)
          acc++; accepted++;
          if (!row.others) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: other items changed`);
          if (!row.sameMeta) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: the page CONTENT changed with the picture (meta)`);
          if (!row.changed) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: applied but the page did not change`);
          const ind = await independent(row.html, r.grade);
          if (ind.lints.length) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: applied but fails ${ind.lints[0]}`);
        }
        if (r.rows.length && !acc) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}: no swap of ${r.rows.length} tried was accepted (every key refused: ${(r.rows.find((x) => x.why) || {}).why || 'retried'})`);
      }
    }
    console.log(`${maker}: ${n} slot roles × levels swept`);
  }

  if (errs.length) fail('page errors: ' + errs.slice(0, 3).join(' | '));
  await set('as=sub&made=0&downloaded=0');
  await browser.close(); await m.close(); srv.close();
  console.log(`own input: ${cases} typed-text cases, ${swaps} library swaps (${accepted} accepted, ${refused} refused)` + (fails ? `; ${fails} failing` : '; all pass, poisons fire both ways'));
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('own input: error — ' + e.stack); process.exit(1); });
