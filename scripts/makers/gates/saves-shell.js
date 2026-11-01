#!/usr/bin/env node
/**
 * Gate: saving, reopening and sharing worksheets in the maker screen (ARCHITECTURE §5, §8; P4), with real clicks,
 * against the local store (scripts/makers/local-store.js — the same contract as the website's /api/makers/*).
 *
 *   store contract: sign-in required; 409 on a stale save; 413 over the cap; a link per recipe; a deleted worksheet's link is gone
 *   save: a subscriber's worksheet with a new level, a second page, a drawing and a typed title → Save → "Saved"; the
 *     address now reopens it; a reload rebuilds every page BYTE FOR BYTE on the version it was saved with
 *   a change makes Save live again; saving again updates the same worksheet (no copy)
 *   changed in another window → saved as a new copy, nothing overwritten
 *   share → a colleague link; opened signed out: the whole worksheet, read-only (no gallery, no controls, nothing to tap,
 *     no Save), the same pages byte for byte, Print offered
 *   a free colleague's "Save a copy" spends one make and opens her own editable copy
 *   My worksheets lists the saved worksheets; Delete removes one
 *   a recipe pinned to a version the ledger does not know opens the current version (never a missing bundle)
 *   anonymous: no Save, Share or My worksheets
 *
 *   node scripts/makers/gates/saves-shell.js
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require(path.join(__dirname, '..', '..', '..', 'node_modules', 'puppeteer'));
const { handler } = require('../serve.js');
const { FILE } = require('../local-store.js');

(async () => {
  const backup = fs.existsSync(FILE) ? fs.readFileSync(FILE) : null;
  fs.rmSync(FILE, { force: true });
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const base = `http://localhost:${srv.address().port}`;
  const access = (q) => fetch(`${base}/__dev/access?${q}`).then((r) => r.json());
  const api = (method, p, body) => fetch(base + p, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }).then(async (r) => ({ s: r.status, j: await r.json().catch(() => null) }));
  const store = () => (fs.existsSync(FILE) ? JSON.parse(fs.readFileSync(FILE, 'utf8')) : { recipes: {}, links: {} });
  const live = () => Object.values(store().recipes).filter((r) => !r.deletedAt);
  const browser = await puppeteer.launch();
  let fails = 0;
  const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 300))); };
  const settle = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
  const errs = [];
  const page = async () => { const p = await browser.newPage(); p.on('pageerror', (e) => errs.push(e.message)); p.on('dialog', (d) => d.accept()); await p.setViewport({ width: 1366, height: 900 }); return p; };
  const pages = (p) => p.evaluate(() => [...document.querySelectorAll('.mk-sheet iframe')].map((f) => f.getAttribute('srcdoc')));
  const btn = (p, id) => p.$eval(id, (b) => ({ hidden: b.hidden, disabled: b.disabled, text: b.textContent }));

  try {
    // ---- the store contract (signed out → 401)
    await access('as=anon');
    check('store: saving needs a signed-in account', (await api('POST', '/api/makers/recipes', { recipe: { v: 1 } })).s === 401);

    // ---- save a worksheet (subscriber)
    await access('as=sub&made=0&downloaded=0');
    let p = await page();
    await p.goto(`${base}/makers/app/?maker=counting&lang=de&t=K-002`, { waitUntil: 'networkidle0' }); await settle(1400);
    let s = await btn(p, '#mk-save');
    check('a new worksheet offers Save ("Speichern"), Share and My worksheets', !s.hidden && !s.disabled && s.text === 'Speichern' && !(await btn(p, '#mk-share')).hidden && !(await btn(p, '#mk-mine')).hidden, s);
    await p.evaluate(() => [...document.querySelectorAll('.mk-chip')].find((x) => x.textContent === '3').click()); await settle();
    await p.click('#mk-add'); await settle(1500);
    // page 2 becomes another template (a worksheet may mix them, operator 2026-11-01): the new page is selected, the gallery changes it
    const other2 = await p.evaluate(() => [...document.querySelectorAll('.mk-card')].map((c) => c.dataset.id).find((id) => id !== 'K-002'));
    await p.evaluate((id) => document.querySelector('.mk-card[data-id="' + id + '"]').click(), other2); await settle(1500);
    // a drawing on page 1 (real mouse)
    await p.evaluate(() => document.querySelector('.mk-page [data-act=draw]').click()); await settle();
    const r = await p.evaluate(() => { const f = document.querySelector('.mk-sheet iframe'); f.scrollIntoView({ block: 'center' }); const b = f.getBoundingClientRect(); return { x: b.left, y: b.top, w: b.width, h: b.height }; });
    await p.mouse.move(r.x + r.w * 0.3, r.y + r.h * 0.45); await p.mouse.down();
    for (let k = 1; k <= 20; k++) await p.mouse.move(r.x + r.w * (0.3 + 0.1 * Math.cos(k / 3)), r.y + r.h * (0.45 + 0.06 * Math.sin(k / 3)));
    await p.mouse.up(); await settle(200);
    await p.evaluate(() => document.querySelector('.mk-page [data-act=draw]').click()); await settle();
    // a typed title on page 2
    await p.evaluate(() => document.querySelectorAll('.mk-sheet iframe')[1].contentDocument.querySelector('[data-lcs-title]').dispatchEvent(new MouseEvent('click', { bubbles: true }))); await settle(400);
    await p.evaluate(() => { const i = document.querySelector('#mk-picker .mk-text-input'); i.value = 'Zählen mit Tieren'; document.querySelector('#mk-picker .mk-primary').click(); }); await settle(1400);
    const before = await pages(p);
    await p.click('#mk-save'); await settle(800);
    s = await btn(p, '#mk-save');
    const url = p.url();
    check('Save → "Gespeichert", greyed; the address now names the saved worksheet', s.text === 'Gespeichert' && s.disabled && /[?&]r=r[a-z2-9]{15}/.test(url), { s, url });
    const rec = live()[0];
    check('the store holds one worksheet: 2 pages, level 3, the drawing, the typed title', live().length === 1 && rec.recipe.pages.length === 2 && rec.recipe.pages[0].level === 3 && (rec.recipe.pages[0].ink || []).length === 1 && rec.recipe.pages[1].strings.title === 'Zählen mit Tieren', rec && rec.recipe.pages.map((x) => ({ l: x.level, ink: (x.ink || []).length, t: x.strings })));
    const savedVersion = await p.evaluate(() => window.__lcsMaker.version());
    check('page 1 keeps its template, page 2 is the other one', rec.recipe.pages[0].template === 'K-002' && rec.recipe.pages[1].template === other2, rec.recipe.pages.map((x) => x.template));
    check('it is pinned to the version it was made with', rec.recipe.makerVersion === savedVersion.makerVersion && rec.recipe.dataVersion === savedVersion.dataVersion, { rec: [rec.recipe.makerVersion, rec.recipe.dataVersion], savedVersion });

    // ---- reopen: byte for byte
    await p.goto(url, { waitUntil: 'networkidle0' }); await settle(1600);
    const after = await pages(p);
    check('reopening rebuilds every page byte for byte (2 pages, drawing included)', after.length === 2 && after.every((h, i) => h === before[i]) && /<svg data-lcs-ink[\s\S]*?<path/.test(after[0]), { n: after.length, same: after.map((h, i) => h === before[i]) });
    s = await btn(p, '#mk-save');
    check('a reopened, unchanged worksheet shows "Gespeichert"', s.text === 'Gespeichert' && s.disabled, s);
    // a change → Save again updates the same worksheet
    await p.evaluate(() => [...document.querySelectorAll('.mk-chip')].find((x) => x.textContent === '2').click()); await settle();
    s = await btn(p, '#mk-save');
    check('a change makes Save live again', s.text === 'Speichern' && !s.disabled, s);
    await p.click('#mk-save'); await settle(800);
    check('saving again updates the same worksheet (rev 2, no copy)', live().length === 1 && live()[0].rev === 2, live().map((x) => x.rev));

    // ---- changed in another window → a new copy, nothing overwritten
    const id = live()[0].id;
    const other = (await api('GET', `/api/makers/recipes/${id}`)).j;
    await api('PUT', `/api/makers/recipes/${id}`, { recipe: { ...other.recipe, title: 'Anderes Fenster' }, rev: other.rev });
    await p.evaluate(() => [...document.querySelectorAll('.mk-chip')].find((x) => x.textContent === '1').click()); await settle();
    await p.click('#mk-save'); await settle(900);
    const note = await p.evaluate(() => (document.querySelector('[data-note="save"]') || {}).textContent || '');
    check('changed in another window: saved as a new copy, the other kept', live().length === 2 && store().recipes[id].recipe.title === 'Anderes Fenster' && /neue Kopie/.test(note), { n: live().length, note });

    // ---- share with a colleague
    await p.click('#mk-share'); await settle(800);
    // the share sheet (2026-11-01) lists the student link first; the colleague link is the field before its Copy button
    const link = await p.evaluate(() => document.querySelector('#mk-picker [data-act=copy]').previousElementSibling.value);
    check('Share opens a colleague link', /[?&]m=[a-z2-9]{12}$/.test(link), link);
    const ownPages = await pages(p);
    await p.close();
    await access('as=anon');
    const q = await page();
    await q.goto(link, { waitUntil: 'networkidle0' }); await settle(1600);
    const view = await q.evaluate(() => ({
      gallery: document.getElementById('mk-gallery').hidden, card: !!document.querySelector('[data-act=save-copy]'), groups: document.querySelectorAll('#mk-controls .mk-group').length,
      tools: document.querySelectorAll('.mk-page-tools').length, tap: [...document.querySelectorAll('.mk-sheet iframe')].reduce((n, f) => n + f.contentDocument.querySelectorAll('[role=button]').length, 0),
      save: document.getElementById('mk-save').hidden, print: !document.getElementById('mk-print').hidden, mine: document.getElementById('mk-mine').hidden,
    }));
    check('the link signed out: read-only (no gallery, controls, page tools or tapping; no Save), Print offered', view.gallery && view.card && !view.groups && !view.tools && !view.tap && view.save && view.print && view.mine, view);
    check('the colleague sees the same pages byte for byte', JSON.stringify(await pages(q)) === JSON.stringify(ownPages));
    await q.close();

    // ---- a free colleague saves a copy: one make
    await access('as=free&made=0&downloaded=0');
    const f = await page();
    await f.goto(link, { waitUntil: 'networkidle0' }); await settle(1400);
    const n0 = live().length;
    await f.click('[data-act=save-copy]'); await f.waitForNavigation({ waitUntil: 'networkidle0' }).catch(() => null); await settle(1600);
    const made = (await access('')).made;
    const own = await f.evaluate(() => ({ url: location.search, groups: document.querySelectorAll('#mk-controls .mk-group').length, save: document.getElementById('mk-save').textContent }));
    check('a free colleague\'s "Save a copy" spends one make and opens her own editable copy', made === 1 && live().length === n0 + 1 && /r=r/.test(own.url) && !/m=/.test(own.url) && own.groups > 0 && own.save === 'Gespeichert', { made, own });
    await f.close();

    // ---- My worksheets + delete
    await access('as=sub');
    const m = await page();
    await m.goto(`${base}/makers/app/?maker=counting&lang=de`, { waitUntil: 'networkidle0' }); await settle(1200);
    await m.click('#mk-mine'); await settle(600);
    const listed = await m.$$eval('.mk-mine-item', (li) => li.length);
    check(`My worksheets lists every saved worksheet (${listed})`, listed === live().length, { listed, store: live().length });
    await m.evaluate(() => document.querySelector('.mk-mine-item [data-act=delete]').click()); await settle(700);
    check('Delete removes one (list and store)', (await m.$$eval('.mk-mine-item', (li) => li.length)) === listed - 1 && live().length === listed - 1);
    // ---- a recipe pinned to an unknown version opens the current one
    const anyRec = live()[0];
    const ghost = (await api('POST', '/api/makers/recipes', { recipe: { ...anyRec.recipe, makerVersion: 'ffffffffffff', dataVersion: 'eeeeeeeeeeee' } })).j.id;
    await m.goto(`${base}/makers/app/?maker=counting&lang=de&r=${ghost}`, { waitUntil: 'networkidle0' }); await settle(1400);
    const v = await m.evaluate(() => ({ v: window.__lcsMaker && window.__lcsMaker.version(), sheets: document.querySelectorAll('.mk-sheet iframe').length }));
    const cur = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', '..', 'out', 'makers', 'versions.json'), 'utf8')).counting.current;
    check('a recipe pinned to an unknown version opens the current version', v.v && v.v.makerVersion === cur && v.sheets > 0, v);
    // ---- a corrected template (ruling #5): a worksheet saved before the fix opens the fixed version, with the note.
    // A temporary ledger entry for an older version + a fix record at the current one (both restored below).
    const VJ = path.join(__dirname, '..', '..', '..', 'out', 'makers', 'versions.json');
    const MIG = path.join(__dirname, '..', '..', '..', 'docs', 'makers', 'migrations', 'counting.json');
    const vjBackup = fs.readFileSync(VJ), migBackup = fs.existsSync(MIG) ? fs.readFileSync(MIG) : null;
    try {
      const vj = JSON.parse(vjBackup);
      const c = vj.counting;
      c.history = [{ n: 0, hash: 'aaaaaaaaaaaa', data: 'bbbbbbbbbbbb', at: '2026-10-01T00:00:00Z' }, ...c.history];
      fs.writeFileSync(VJ, JSON.stringify(vj));
      fs.mkdirSync(path.dirname(MIG), { recursive: true });
      fs.writeFileSync(MIG, JSON.stringify([{ at: c.current, atData: c.currentData, templates: [anyRec.template], kind: 'content-fix', note: 'test', date: '2026-11-20' }]));
      const old = (await api('POST', '/api/makers/recipes', { recipe: { ...anyRec.recipe, makerVersion: 'aaaaaaaaaaaa', dataVersion: 'bbbbbbbbbbbb' } })).j.id;
      const k = await page();
      await k.goto(`${base}/makers/app/?maker=counting&lang=de&r=${old}`, { waitUntil: 'networkidle0' }); await settle(1400);
      const got = await k.evaluate(() => ({ v: window.__lcsMaker.version(), note: (document.querySelector('[data-note="corrected"]') || {}).textContent || null }));
      check('a worksheet saved before a correction opens the corrected version, with the note', got.v.makerVersion === c.current && /20\. November 2026/.test(got.note || ''), got);
      // the same worksheet saved AFTER the fix stays on its version, no note
      const fresh = (await api('POST', '/api/makers/recipes', { recipe: { ...anyRec.recipe, makerVersion: c.current, dataVersion: c.currentData } })).j.id;
      await k.goto(`${base}/makers/app/?maker=counting&lang=de&r=${fresh}`, { waitUntil: 'networkidle0' }); await settle(1400);
      check('a worksheet saved after the correction opens with no note', !(await k.$('[data-note="corrected"]')));
      await k.close();
    } finally {
      fs.writeFileSync(VJ, vjBackup);
      if (migBackup) fs.writeFileSync(MIG, migBackup); else { fs.rmSync(MIG, { force: true }); try { fs.rmdirSync(path.dirname(MIG)); } catch (e) { /* not empty */ } }
    }
    await m.close();

    // ---- anonymous: nothing to save
    await access('as=anon');
    const a = await page();
    await a.goto(`${base}/makers/app/?maker=counting&lang=de`, { waitUntil: 'networkidle0' }); await settle(1200);
    check('anonymous: no Save, Share or My worksheets', (await btn(a, '#mk-save')).hidden && (await btn(a, '#mk-share')).hidden && (await btn(a, '#mk-mine')).hidden);
    await a.close();
    if (errs.length) { fails++; console.log('FAIL page errors: ' + errs.slice(0, 3).join(' | ')); }
  } finally {
    await access('as=sub&made=0&downloaded=0');
    await browser.close(); srv.close();
    if (backup) fs.writeFileSync(FILE, backup); else fs.rmSync(FILE, { force: true });
  }
  console.log(fails ? `saves gate: ${fails} failing` : 'saves gate: all pass');
  if (fails) process.exitCode = 1;
})().catch((e) => { console.error('saves gate: error — ' + e.message); process.exit(1); });
