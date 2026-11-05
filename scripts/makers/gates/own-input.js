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
 *   node scripts/makers/gates/own-input.js [--makers=a,b] [--quick] [--per=12] [--ids=G1-242,K-486]   (--ids: part B on those templates only)
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
const IDS = A.ids ? String(A.ids).split(',') : null;

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
  let fails = 0, cases = 0, swaps = 0, accepted = 0, refused = 0, derivePoisons = 0, rowPoisons = 0, offered = 0, greyed = 0;
  // every failure is kept: the first 60 are printed as they come, and the run ends with ALL of them grouped by template
  // and kind (2026-11-04: 4825 failures printed 60 — the rest were invisible)
  const allFails = [];
  const fail = (s) => { fails++; allFails.push(s); if (fails <= 60) console.log('FAIL ' + s); };

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
    { n: 3, field: 'title', sel: '[data-lcs-title]', value: '<b>bold</b> <img src=x onerror="window.__pwned=true"> title', expect: 'accepted-text' },   // (no digit: a page that counts — Find the Differences — rightly refuses a number it does not carry)
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
      // a language no template ships in shows the "not in your language" note and no test hook (shell.js) — cursive has
      // no Finnish school script; waiting for the hook crashed every full run here, so part B never reached the makers
      // after cursive (2026-11-04)
      if (!tj.templates.some((x) => x.locales.includes(loc))) continue;
      await p.goto(`${base}/makers/app/?maker=${maker}&lang=${loc}`, { waitUntil: 'networkidle0' });
      await p.waitForFunction(() => window.__lcsMaker, { timeout: 60000 });
      const res = await p.evaluate(async ({ PER, sample, IDS }) => {
        const M = window.__lcsMaker;
        const out = [];
        for (const t of M.tj.templates.filter((x) => x.locales.includes(M.LANG) && (!IDS || IDS.includes(x.id)))) {
          const type = await M.loadType(t.id);
          const units = (t.units && t.units[M.LANG]) || [];
          for (const d of ((t.localeLevels && t.localeLevels[M.LANG]) || t.levels)) {
            const o = { type, strings: M.stringsFor(t.id, d), locale: M.LANG, difficulty: d, theme: t.themed ? ((t.localeThemes && t.localeThemes[M.LANG]) || t.themes)[sample % ((t.localeThemes && t.localeThemes[M.LANG]) || t.themes).length] : null, unit: (() => { const lu = units.filter((u) => (!t.unitLevels || t.unitLevels[u.id] === d) && (!t.localeUnitLevels || !t.localeUnitLevels[M.LANG] || (t.localeUnitLevels[M.LANG][u.id] || []).includes(d))); return lu.length ? lu[sample % lu.length].id : null; })(), variant: 1 + sample, answerKey: false, answerKeySuffix: M.tj.answerKey[M.LANG] };
            const b = await M.mod.generate(o, M.mount);
            // the CONTENT is the same apart from the swapped picture's own name (a card may record its noun: K-002 cards carry
            // {count, noun, choices} — the counts and choices must not move, the noun does by design)
            // (the name may also sit inside a recorded string — a graph's asks "rabbit:5" — so it is replaced wherever it stands
            // as a whole word, not only as a JSON value of its own; 2026-11-02)
            const esc = (x) => String(x).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            // ... and so is its VOCABULARY key (a type may record the picture by its key: K-039 rows carry main / odd keys,
            // and a picture "bat" may be the key "bat-animal"; 2026-11-02). A multi-theme key "theme/noun" is its noun too
            const names = (k, theme) => { const s = String(k), j = s.indexOf('/'), th = j > 0 ? s.slice(0, j) : theme, noun = j > 0 ? s.slice(j + 1) : s; return [s, noun, M.vocabOf && th ? M.vocabOf(th, noun) : null].filter(Boolean).sort((x, y) => y.length - x.length); };
            // both names are blanked in BOTH pages: the old picture may stand in another row too (rows draw independently —
            // K-039, 2026-11-02), and that row keeps it after the swap; anything else that moved is a content change
            const blank = (m, ks, theme) => ks.flatMap((k) => names(k, theme)).sort((x, y) => y.length - x.length).reduce((t, n) => t.replace(new RegExp('(?<![\\p{L}\\p{N}_])' + esc(n) + '(?![\\p{L}\\p{N}_])', 'gu'), '§'), JSON.stringify(m));
            // a slot item that brings a partner (a pair: the doctor and her thermometer) records it in slot.partners — both
            // items' partners are blanked too
            // content a slot declares BUILT from its item (slot.derives — K-437's own row, G1-474's whole puzzle) follows the
            // item by design: those paths ("{i}" = the swapped item, always 0 here) are left out of both pages (2026-11-04)
            const strip = (m, derives, i) => {
              if (!derives || !derives.length) return m;
              if (derives.includes('*')) return {};   // the item IS the page (one story, the month, the message): every other slot is still checked
              const c = JSON.parse(JSON.stringify(m));
              for (const p of derives) {
                const parts = p.replace('{i}', String(i)).split('.');
                let x = c;
                for (let k = 0; k < parts.length - 1 && x; k++) x = x[parts[k]];
                if (x && typeof x === 'object') delete x[parts[parts.length - 1]];
              }
              return c;
            };
            // the swapped item's OWN row (2026-11-04): every array with one entry per item of the slot may differ at the swapped
            // entry (index 0) — a row's sentence, syllables, article and letters follow its word (lib/slot.js: "the item the
            // teacher chose replaces item i") — and every other entry must stay; anything else that moved is a content change
            // … wherever the page keeps it: in EVERY array of the content at most ONE entry may differ — the swapped item's own
            // (its row, its place in a shuffled word bank, its sentence among the page's sentences); a reshuffle moves two or
            // more and still fails, as does any changed scalar (2026-11-04: index 0 alone missed G1-334's bank, G1-498's c1)
            const same = (x, y) => JSON.stringify(x) === JSON.stringify(y);
            const ownRowOnly = (a, b, n) => {
              // … and any entry that NAMES the swapped item in both versions (its name is blanked to §): the item's own entries
              // wherever the page keeps them — a word trading places with the decoy it was, a pair's two chips in the bank
              if (Array.isArray(a) && Array.isArray(b)) {
                if (a.length !== b.length) return false;
                let diff = a.map((x, i) => i).filter((i) => !same(a[i], b[i]));
                // an array with FEWER entries than the slot has items is not one entry per item: an entry of it that differs
                // holds several items' content (a puzzle's case: every row, the clues, the solution) and is compared inside,
                // never passed whole (2026-11-05: G3-379's one case held the whole puzzle — two of its names moved and passed)
                if (n > 1 && a.length < n) {
                  const box = (x) => x !== null && typeof x === 'object';
                  const inner = diff.filter((i) => box(a[i]) && box(b[i]));
                  if (inner.some((i) => !ownRowOnly(a[i], b[i], n))) return false;
                  diff = diff.filter((i) => !inner.includes(i));
                }
                const named = (i) => JSON.stringify(a[i]).includes('§') && JSON.stringify(b[i]).includes('§');
                if (diff.filter((i) => !named(i)).length <= 1) return true;
                // a list the page SORTS (ABC order, rows by syllable count): the same entries in a new order, apart from the
                // swapped item's own — every other entry is still there, unchanged
                const left = b.map((x) => JSON.stringify(x));
                const extra = [];
                for (const x of a) { const j = left.indexOf(JSON.stringify(x)); if (j >= 0) left.splice(j, 1); else extra.push(x); }
                return extra.length <= 1 && left.length <= 1;
              }
              if (a && b && typeof a === 'object' && typeof b === 'object') return [...new Set([...Object.keys(a), ...Object.keys(b)])].every((k) => ownRowOnly(a[k], b[k], n));
              return same(a, b);
            };
            const sameBut = (m1, k1, m0, k0, theme, partners, derives, n) => {
              const ks = [k1, k0].concat(...[k1, k0].map((k) => (partners && partners[k]) || []));
              const b1 = blank(strip(m1, derives, 0), ks, theme), b0 = blank(strip(m0, derives, 0), ks, theme);
              if (b1 === b0) return true;
              try { return ownRowOnly(JSON.parse(b1), JSON.parse(b0), n); } catch (e) { return false; }
            };
            // poisons for a declaring slot: an extra field on the page, and (for an "{i}" path) the same path moved on
            // ANOTHER item, must both still read as a content change
            // poison for the own-row rule: the same page with ANOTHER row (entry 1 of a per-item array) moved must still read as a
            // content change — null when the page has no per-item array to move
            // the own-row rule's poison: TWO entries of the page's first array of two or more moved (a reshuffle) must still read
            // as a content change — null when the content has no such array
            const rowPoisonOf = (m1, k1, m0, k0, theme, partners, derives, n) => {
              if (derives && derives.includes('*')) return null;
              // on the content the comparison actually reads (a declared derived path already left out)
              const c = JSON.parse(JSON.stringify(strip(m1, derives, 0))), c0 = strip(m0, derives, 0);
              let moved = false;
              const walk = (x) => { if (moved || !x || typeof x !== 'object') return; if (Array.isArray(x) && x.length >= 2) { x[x.length - 2] = ['__poison']; x[x.length - 1] = ['__poison2']; moved = true; return; } for (const v of Object.values(x)) walk(v); };
              walk(c);
              if (!moved) return null;
              return sameBut(c, k1, c0, k0, theme, partners, null, n) ? 'two entries moved and passed' : '';
            };
            const poisonDerives = (m1, k1, m0, k0, theme, partners, derives, n) => {
              const out = [];
              if (!derives.includes('*') && sameBut({ ...m1, __poison: 1 }, k1, m0, k0, theme, partners, derives, n)) out.push('an extra field passed');
              return out;
            };
            if (!b.ok) { out.push({ id: t.id, d, role: '-', base: false }); continue; }
            for (const role of Object.keys(b.slots || {})) {
              const s = b.slots[role];
              // keys on the page in no slot of the same kind (the picker greys every picture already on the page)
              const onPage = new Set(Object.values(b.slots).filter((x) => (x.theme || null) === (s.theme || null)).flatMap((x) => x.values));
              const pool = s.pool.filter((k) => !onPage.has(k));
              // a slot that records which choices FIT each item (lib/slot.js fits(): the picker greys the rest): the swaps are
              // drawn from item 0's fitting choices, and every one of them must be taken; up to 3 greyed choices are probed too,
              // and each must be refused — a fits list that greys a choice the page takes, or offers one it refuses, is wrong
              const fit0 = s.fits && Array.isArray(s.fits[0]) ? new Set(s.fits[0]) : typeof s.fitsFor === 'function' ? new Set(s.fitsFor(0)) : null;
              const offer = fit0 ? pool.filter((k) => fit0.has(k)) : pool;
              const keys = offer.filter((_, i) => i % Math.max(1, Math.round(offer.length / PER)) === 0).slice(0, PER)
                .concat(fit0 ? pool.filter((k) => !fit0.has(k)).filter((_, i, a) => i % Math.max(1, Math.floor(a.length / 3)) === 0).slice(0, 3) : []);
              const rows = [];
              for (const key of keys) {
                const r = await M.mod.generate({ ...o, overrides: { [role]: { 0: key } } }, M.mount);
                rows.push({ key, fitted: fit0 ? fit0.has(key) : null, ok: r.ok, applied: r.ok && r.slots && r.slots[role] && r.slots[role].values[0] === key, typeRefused: !!(r.ok && r.slots && r.slots[role] && r.slots[role].refused), others: r.ok ? JSON.stringify(r.slots[role].values.slice(1)) === JSON.stringify(s.values.slice(1)) : null, sameMeta: r.ok ? sameBut(r.meta, key, b.meta, s.values[0], s.theme, s.partners, s.derives, s.values.length) : null, derivePoison: r.ok && s.derives ? poisonDerives(r.meta, key, b.meta, s.values[0], s.theme, s.partners, s.derives, s.values.length) : null, rowPoison: r.ok ? rowPoisonOf(r.meta, key, b.meta, s.values[0], s.theme, s.partners, s.derives, s.values.length) : null, changed: r.ok ? r.html !== b.html : null, retried: r.ok ? JSON.stringify(r.attempt || {}) !== JSON.stringify(b.attempt || {}) : null, html: r.ok ? r.html : null, why: r.ok ? null : (r.fails || [])[0] });
              }
              // a FREE slot (typed text: a group's name, a key line) takes any text by design — the typed-text cases above
              // test it; the outside-the-pool and duplicate probes are for slots with a pool
              if (s.free) continue;
              const dup = s.values.length > 1 ? await M.mod.generate({ ...o, overrides: { [role]: { 0: s.values[1] } } }, M.mount) : null;
              const outside = await M.mod.generate({ ...o, overrides: { [role]: { 0: '__not_in_pool__' } } }, M.mount);
              out.push({ id: t.id, d, role, base: true, pool: pool.length, rows, dupApplied: dup ? dup.ok && dup.html !== b.html : false, outsideApplied: outside.ok && outside.html !== b.html, grade: type.gradeBand });
            }
          }
        }
        return out;
      }, { PER, sample: loc === 'en' ? 0 : 1, IDS });
      for (const r of res) {
        if (!r.base) { console.log(`note ${maker} ${r.id} ${loc} L${r.d}: the base page is refused (live gate)`); continue; }
        n++;
        if (r.dupApplied) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}: a duplicate of another item was applied`);
        if (r.outsideApplied) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}: a key outside the pool was applied`);
        let acc = 0;
        for (const row of r.rows) {
          swaps++;
          // the slot's fits list (lib/slot.js fits()) must be TRUE both ways: a greyed choice is one the page refuses, an
          // offered one is one it takes
          const took = row.ok && row.applied && !row.retried && !row.typeRefused;
          if (row.fitted === false) { greyed++; if (took) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: greyed as not fitting (slot fits) but the page takes it`); else refused++; continue; }
          if (row.fitted === true) { offered++; if (!took) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: offered as fitting (slot fits) but the page refuses it${row.why ? ' — ' + row.why : ''}`); }
          if (!row.ok) { refused++; continue; }
          // a type's own refusal (slot.refuse: two shadows alike, a conflicting pair) is a refusal the screen explains
          if (!row.applied) { if (row.retried || row.typeRefused) { refused++; continue; } fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: generate ok but the slot does not show the key`); continue; }
          if (row.retried) { refused++; continue; }   // the shell counts a seed retry as a refusal of the choice (choosePick)
          acc++; accepted++;
          if (!row.others) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: other items changed`);
          if (!row.sameMeta) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: the page CONTENT changed with the picture (meta)`);
          if (row.rowPoison != null) { rowPoisons++; if (row.rowPoison) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: poison — ${row.rowPoison} (the own-row rule hides other rows)`); }
          if (row.derivePoison) { derivePoisons++; if (row.derivePoison.length) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: poison — ${row.derivePoison.join('; ')} (the declared derived content hides other changes)`); }
          if (!row.changed) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: applied but the page did not change`);
          const ind = await independent(row.html, r.grade);
          if (ind.lints.length) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}=${row.key}: applied but fails ${ind.lints[0]}`);
        }
        const tried = r.rows.filter((x) => x.fitted !== false);
        if (tried.length && !acc) fail(`${maker} ${r.id} ${loc} L${r.d} ${r.role}: no swap of ${tried.length} tried was accepted (every key refused: ${(tried.find((x) => x.why) || {}).why || 'retried'})`);
      }
    }
    console.log(`${maker}: ${n} slot roles × levels swept`);
  }

  if (errs.length) fail('page errors: ' + errs.slice(0, 3).join(' | '));
  // the declared-derived poisons must have run where a declaring slot was swept (sight-words K-437, logic-puzzles G1-474)
  if (swaps > 200 && !rowPoisons) fail('poison: no page with a per-item array was swapped — the own-row rule was never checked (a vacuous run)');
  if (makers.some(({ maker }) => maker === 'sight-words' || maker === 'logic-puzzles') && !derivePoisons) fail('poison: no swap of a slot that declares derived content was checked (a vacuous run)');
  await set('as=sub&made=0&downloaded=0');
  await browser.close(); await m.close(); srv.close();
  if (allFails.length > 60) {
    const groups = {};
    for (const x of allFails) {
      // "<maker> <id> …[ <role>=<key>]: <what>" → "<maker> <id> <role>: <what>" (numbers and quoted text folded)
      const m = x.match(/^(\S+ \S+)[^:]*?(?: (\S+)=[^:]*)?: (.*)$/);
      const k = m ? `${m[1]}${m[2] ? ' ' + m[2] : ''}: ${m[3].replace(/"[^"]*"/g, '…').replace(/\d+/g, 'N').slice(0, 110)}` : x.slice(0, 140);
      groups[k] = (groups[k] || 0) + 1;
    }
    console.log('every failure, grouped (template · role: kind × count):');
    for (const [k, n] of Object.entries(groups).sort((a, b) => b[1] - a[1])) console.log(`  ${String(n).padStart(5)} × ${k}`);
  }
  console.log(`own input: ${cases} typed-text cases, ${swaps} library swaps (${accepted} accepted, ${refused} refused; fits lists: ${offered} offered choices taken, ${greyed} greyed refused)` + (fails ? `; ${fails} failing` : '; all pass, poisons fire both ways'));
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('own input: error — ' + e.stack); process.exit(1); });
