#!/usr/bin/env node
/**
 * The teacher's Classes screen (frontend/lib/class-results/teacher-app.ts), played by a robot on the local class
 * preview: the real screen, the real rules, an in-memory database.
 *
 *   node scripts/class-results/tests/teacher-app.js [--poison]
 *
 * A teacher's whole path by real clicks: make a class from a pasted list (one line refused), assign pages (a bad
 * address, a print-only page, a Level Set, a page, the same twice, hide one), rename a child, change a picture,
 * add and remove a child, copy the link, make a new link, read the dashboard by child and by level (compared with
 * what the children "played" through the rules), delete one child's results, and delete the class. Then the same
 * screen for a teacher whose plan is not active (read and delete only), for an account without a plan (the example
 * dashboard) and signed out. Phone width: no sideways scroll, buttons ≥ 44 px.
 *
 * Also: every text key the screen asks for exists in messages/classes/en.json, and no key in that file is unused.
 *
 * --poison: every result chip is drawn "almost all right"; the colour check must fail. And the view by curriculum
 *           lists the WRONG children under a result; its check must fail too.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const REPO = path.join(__dirname, '..', '..', '..');
const puppeteer = require(path.join(REPO, 'node_modules', 'puppeteer'));
const { start } = require('../dev-server.js');
const POISON = process.argv.includes('--poison');
const SHOTS = path.join(REPO, 'out', 'class-results', '_tests');
const EN = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'classes', 'en.json'), 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fails = 0;
const check = (name, ok, extra) => { if (!ok) fails++; console.log((ok ? 'ok    ' : 'FAIL  ') + name + (ok || extra === undefined ? '' : ' — ' + JSON.stringify(extra).slice(0, 600))); };

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });

  // ── the words: asked for = written ──
  const src = fs.readFileSync(path.join(REPO, 'frontend', 'lib', 'class-results', 'teacher-app.ts'), 'utf8');
  const asked = new Set([...src.matchAll(/\bt\('([A-Za-z]+)'/g)].map((m) => m[1]));
  const missing = [...asked].filter((k) => !(k in EN)), unused = Object.keys(EN).filter((k) => !asked.has(k));
  check('every text the screen asks for is written in en.json', !missing.length, missing);
  check('en.json has no text the screen never shows', !unused.length, unused);

  const S = await start({ seed: true });
  const { base, seeded, db, store, teacher } = S;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  await browser.defaultBrowserContext().overridePermissions(base, ['clipboard-read', 'clipboard-write']);

  async function open(width) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
    const errors = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('console', (m) => { if (m.type() === 'error' && !/Failed to load resource/.test(m.text())) errors.push(m.text()); });
    if (POISON) {
      await page.setRequestInterception(true);
      page.on('request', (r) => {
        if (r.url().endsWith('/__class/teacher-app.js')) return r.respond({ status: 200, contentType: 'text/javascript', body: fs.readFileSync(path.join(REPO, 'out', 'class-results', '_dev', 'teacher-app.js'), 'utf8').replace(/"data-band": f\.band \|\| "none"/, '"data-band": "high"').replace('g.bands[x.id] === band', 'g.bands[x.id] !== band') });
        r.continue();
      });
    }
    await page.goto(base + '/teacher', { waitUntil: 'networkidle0' });
    await page.waitForSelector('#lcs-classes-root h1');
    return { page, errors };
  }
  const text = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); return e ? e.textContent : null; }, sel);
  const clickText = async (page, label, scope = '#lcs-classes-root') => {
    const ok = await page.evaluate((l, sc) => { const b = [...document.querySelectorAll(sc + ' button, ' + sc + ' a.c-btn')].find((x) => x.textContent.trim() === l && x.getClientRects().length > 0); if (!b) return false; b.click(); return true; }, label, scope);
    if (!ok) throw new Error('no visible button "' + label + '"');
    await sleep(350);
  };
  const tab = async (page, k) => { await page.click('[data-tab-button="' + k + '"]'); await page.waitForSelector('[data-tab="' + k + '"]'); await sleep(350); };
  const rows = (page, attr) => page.evaluate((a) => [...document.querySelectorAll('.c-seatrow[' + a + ']')].map((r) => ({ text: r.textContent.replace(/\s+/g, ' ').trim(), value: (r.querySelector('input[type=text]') || {}).value || null, img: (() => { const i = r.querySelector('img'); return i ? { src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0 } : null; })() })), attr);
  const err = (page) => page.evaluate(() => [...document.querySelectorAll('#lcs-classes-root .c-err')].map((e) => e.textContent).filter(Boolean).join(' | '));
  const note = (page) => text(page, '[data-note]');

  try {
    const { page, errors } = await open(1280);

    // ── the list, and a new class from a pasted list ──
    check('the list: the title, the seeded class with its counts, a New class button', (await text(page, 'h1')) === EN.title && /Class 1B/.test(await text(page, '[data-class]')) && /8 children · 3 worksheets/.test(await text(page, '[data-class]')) && (await page.$('[data-act=new]')) !== null, await text(page, '[data-class]'));
    await page.click('[data-act=new]'); await page.waitForSelector('[data-form=new]');
    // this teacher holds the first-names permission: she is offered the choice, and numbers are what is ticked
    const kinds = await page.evaluate(() => [...document.querySelectorAll('input[name=lcsc-mode]')].map((r) => r.value + (r.checked ? '*' : '')));
    check('with the permission: the kind of class is a choice, numbers first and ticked', JSON.stringify(kinds) === JSON.stringify(['numbers*', 'names']) && (await page.$('#lcsc-count')) !== null && (await page.$('#lcsc-names')) === null, kinds);
    await page.click('input[name=lcsc-mode][value=names]'); await page.waitForSelector('#lcsc-names');
    await clickText(page, EN.formCreate);
    check('an empty class name is refused in words', (await err(page)) === EN.errClassName, await err(page));
    await page.type('#lcsc-name', 'Class "2A" & co');
    await page.type('#lcsc-names', 'Max\nAna María\nmax@example.com\nTom');
    await clickText(page, EN.formCreate);
    await page.waitForSelector('[data-tab=work]');
    check('the class is made; the page says which line was not added and why', (await text(page, 'h1')) === 'Class "2A" & co' && (await note(page)) === EN.refused.replace('{list}', 'max@example.com'), await note(page));
    const made = [...db.classes.values()].find((c) => c.name === 'Class "2A" & co');
    check('stored: three children, names as typed, nothing else about them', !!made && JSON.stringify([...db.seats.values()].filter((s) => s.classId === made.id).map((s) => Object.keys(s).sort().join(',') + ':' + s.displayName)) === JSON.stringify(['classId,displayName,icon,id,seatNo:Max', 'classId,displayName,icon,id,seatNo:Ana María', 'classId,displayName,icon,id,seatNo:Tom']), [...db.seats.values()].filter((s) => made && s.classId === made.id));

    // ── worksheets ──
    const addLink = async (v) => { await page.evaluate(() => { document.getElementById('lcsc-link').value = ''; }); await page.type('#lcsc-link', v); await clickText(page, EN.add, '[data-form=work]'); await sleep(250); };
    await addLink('https://example.com/en/decks/x/');
    check('an address of another site is refused in words', (await err(page)) === EN.errLink, await err(page));
    await addLink('https://www.lessoncraftstudio.com/en/decks/picture-tracing-k418/');
    check('a page for printing only is refused in words', (await err(page)) === EN.errPrintOnly, await err(page));
    await addLink('https://www.lessoncraftstudio.com/en/decks/no-such-page/');
    check('a page that does not exist is refused in words', (await err(page)) === EN.errLinkNotFound, await err(page));
    await addLink('https://www.lessoncraftstudio.com/en/worksheets/sets/g1116');
    await addLink('https://www.lessoncraftstudio.com/en/decks/telling-time-easy-g1148-2/');
    let w = await rows(page, 'data-assignment');
    check('a Level Set and a page are added, named and labelled', w.length === 2 && w[0].text.startsWith('1Number LinesLevel Set') && w[1].text.startsWith('2Telling TimeWorksheet'), w);
    await addLink('https://www.lessoncraftstudio.com/en/decks/telling-time-easy-g1148-2/');
    check('the same page twice: still two, and the page says so', (await rows(page, 'data-assignment')).length === 2 && (await note(page)) === EN.workExisting, await note(page));
    await clickText(page, EN.workHide);
    w = await rows(page, 'data-assignment');
    check('"Hide from children" marks the row Hidden and the class page no longer lists it', /Hidden/.test(w[0].text) && (await (await fetch(base + '/api/class/' + made.code)).json()).assignments.length === 1, w);
    await clickText(page, EN.workShow);
    await page.screenshot({ path: path.join(SHOTS, 'teacher-work-1280.png'), fullPage: true });

    // ── children ──
    await tab(page, 'children');
    let c = await rows(page, 'data-seat');
    check('three children with a picture each (all loaded, all different)', c.length === 3 && c.every((x) => x.img && x.img.ok) && new Set(c.map((x) => x.img.src)).size === 3 && c.map((x) => x.value).join('|') === 'Max|Ana María|Tom', c);
    const setName = async (i, v) => { await page.evaluate((k, val) => { const inp = document.querySelectorAll('.c-seatrow[data-seat] input[type=text]')[k]; inp.value = val; }, i, v); await page.evaluate((k) => document.querySelectorAll('.c-seatrow[data-seat] [data-act=rename]')[k].click(), i); await sleep(400); };
    await setName(0, 'a@b.c');
    check('an e-mail address as a name is refused in words', (await err(page)) === EN.errSeatName, await err(page));
    await setName(0, 'Maxi');
    check('a child is renamed', (await rows(page, 'data-seat'))[0].value === 'Maxi');
    const before = (await rows(page, 'data-seat'))[1].img.src;
    check('no picture chooser is open until a teacher asks for one', (await page.evaluate(() => [...document.querySelectorAll('.c-picker')].filter((p) => p.getClientRects().length > 0).length)) === 0);
    await page.evaluate(() => document.querySelectorAll('.c-seatrow[data-seat] [data-act=picture]')[1].click()); await sleep(200);
    const offered = await page.evaluate(() => { const p = document.querySelectorAll('.c-seatrow[data-seat] .c-picker')[1]; return { open: !p.hidden && p.getClientRects().length > 0 && [...document.querySelectorAll('.c-picker')].filter((x) => x.getClientRects().length > 0).length === 1, n: p.querySelectorAll('button').length, first: p.querySelector('button').getAttribute('data-icon') }; });
    check('"Change picture" offers the 37 pictures no child has', offered.open && offered.n === 37, offered);
    await page.evaluate(() => document.querySelectorAll('.c-seatrow[data-seat] .c-picker')[1].querySelector('button').click()); await sleep(400);
    c = await rows(page, 'data-seat');
    check('the child has the new picture; still no two children share one', c[1].img.src !== before && c[1].img.src.includes(encodeURIComponent(offered.first.split('/')[1])) && new Set(c.map((x) => x.img.src)).size === 3, c.map((x) => x.img.src));
    await page.type('#lcsc-names', 'Lena');
    await clickText(page, EN.add, '[data-form=seats]');
    check('a child is added at the next number', (await rows(page, 'data-seat')).map((x) => parseInt(x.text, 10) + ':' + x.value).join('|') === '1:Maxi|2:Ana María|3:Tom|4:Lena', await rows(page, 'data-seat'));
    await page.evaluate(() => document.querySelectorAll('.c-seatrow[data-seat]')[3].querySelector('[data-confirm] button').click()); await sleep(150);
    check('"Remove child" asks once more before anything happens', (await rows(page, 'data-seat')).length === 4 && (await text(page, '.c-confirm')).startsWith(EN.removeChildConfirm));
    await page.evaluate(() => document.querySelector('.c-confirm [data-yes]').click()); await sleep(400);
    check('after "Yes" the child is gone', (await rows(page, 'data-seat')).length === 3);
    await page.screenshot({ path: path.join(SHOTS, 'teacher-children-1280.png'), fullPage: true });

    // ── the class link ──
    await tab(page, 'link');
    const link1 = await text(page, '[data-class-link]');
    const qr = await page.evaluate(() => { const i = document.querySelector('.c-qr'); return i.complete && i.naturalWidth > 0; });
    check('the class link is this site + /c/ + the code; its QR code loads', link1 === base + '/c/' + made.code && qr, link1);
    await page.bringToFront();
    await page.click('[data-act=copy]'); await sleep(300);
    check('Copy puts the link on the clipboard and says "Copied!"', (await page.evaluate(() => navigator.clipboard.readText())) === link1 && (await text(page, '[data-act=copy]')) === EN.linkCopied);
    await page.evaluate((l) => [...document.querySelectorAll('[data-settings] [data-confirm] button')].find((b) => b.textContent === l).click(), EN.newLink); await sleep(150);
    await page.evaluate(() => document.querySelector('.c-confirm [data-yes]').click()); await sleep(500);
    const link2 = await text(page, '[data-class-link]');
    check('"Make a new link": a new address, and the old one no longer opens the class', link2 !== link1 && /\/c\/[a-z2-9]{10}$/.test(link2) && (await fetch(base + '/api/class/' + link1.split('/c/')[1])).status === 404 && (await fetch(base + '/api/class/' + link2.split('/c/')[1])).status === 200, link2);
    await page.evaluate(() => { document.getElementById('lcsc-rename').value = 'Class 2A'; }); await page.click('[data-act=save]'); await sleep(400);
    check('the class is renamed', (await text(page, 'h1')) === 'Class 2A' && (await note(page)) === EN.saved);
    await page.screenshot({ path: path.join(SHOTS, 'teacher-link-1280.png'), fullPage: true });
    await tab(page, 'results');
    check('a class nobody has played shows the way to the first result', /No results yet|Three steps/.test(await text(page, '[data-tab=results]')), await text(page, '[data-tab=results]'));

    // ── the dashboard of the seeded class (played through the rules by the seed) ──
    await page.click('[data-act=back]'); await page.waitForSelector('[data-class]');
    await page.evaluate((id) => document.querySelector('[data-class="' + id + '"] button').click(), seeded.id);
    await page.waitForSelector('[data-results] table');
    const table = await page.evaluate(() => [...document.querySelectorAll('[data-results] tbody tr')].map((tr) => ({ who: tr.querySelector('.c-who').textContent.trim(), cells: [...tr.querySelectorAll('td[data-cell]')].map((td) => [...td.querySelectorAll('.c-chip')].map((ch) => ch.textContent.trim() + '=' + ch.getAttribute('data-band') + (ch.getAttribute('data-now') ? '*' : '')).join(' ') + ([...td.querySelectorAll('.c-again')].map((x) => ' [' + x.textContent + ']').join('')) || td.textContent.trim()) })));
    const byName = Object.fromEntries(table.map((r) => [r.who, r.cells]));
    check('Max: Level 2 passed 5/5, Level 3 struggled 2/6, now back on Level 2; Telling Time 4/6 some wrong; the maze "Finished"', JSON.stringify(byName.Max) === JSON.stringify(['L2 5/5=high* L3 2/6=low', '4/6=mid', 'Finished=none']), byName.Max);
    check('Ana María: both levels passed and the set finished; Telling Time 6/6', JSON.stringify(byName['Ana María']) === JSON.stringify(['L2 6/6=high L3 5/5=high [✓ Finished the set]', '6/6=high', '–']), byName['Ana María']);
    check('Tom: struggled on Level 2, passed the easier page, back on Level 2; the maze "Tried"', JSON.stringify(byName.Tom) === JSON.stringify(['L1 5/6=high L2 2/6=low*', '–', 'Tried=none']), byName.Tom);
    check('Lena: still practicing on Level 2 (4/6); Telling Time 3/6 several wrong', JSON.stringify(byName.Lena) === JSON.stringify(['L2 4/6=mid*', '3/6=low', '–']), byName.Lena);
    check('a child who has played nothing shows dashes only', JSON.stringify(byName.Ben) === JSON.stringify(['–', '–', '–']), byName.Ben);
    // the same numbers straight from the rules
    const truth = (await store.classResults(db, { userId: teacher, usable: true }, seeded.id)).body;
    const maxSeat = truth.seats.find((s) => s.displayName === 'Max');
    check('the screen shows what the rules hold for Max (first Check 4 of 6 on Telling Time)', truth.cells[maxSeat.id][seeded.time].first.right === 4 && truth.cells[maxSeat.id][seeded.time].first.total === 6);
    await page.evaluate(() => [...document.querySelectorAll('[data-results] tbody .c-who button')].find((b) => b.textContent.trim() === 'Max').click()); await sleep(250);
    const detail = await page.evaluate(() => [...document.querySelectorAll('[data-detail] dt, [data-detail] dd')].map((e) => e.textContent));
    check('Max opened: the sentence a teacher wants — "Level 2: passed (5 of 5) · Level 3: found it hard (2 of 6) · Now on Level 2"', detail[0] === 'Number Lines' && detail[1] === 'Level 2: passed (5 of 5) · Level 3: found it hard (2 of 6) · Now on Level 2' && detail[3].startsWith('4 of 6 right on the first try — Some wrong') && detail[5].startsWith('Finished'), detail);
    await page.screenshot({ path: path.join(SHOTS, 'teacher-results-1280.png'), fullPage: true });
    await page.click('[data-mode=level]'); await sleep(250);
    const groups = await page.evaluate(() => Object.fromEntries([...document.querySelectorAll('[data-by-level] [data-group]')].map((g) => [g.getAttribute('data-group'), [...g.querySelectorAll('li')].map((li) => li.textContent.trim()).join(',')])));
    check('by level: who is on which level now, who has finished, who has not started', JSON.stringify(groups) === JSON.stringify({ easy: '', core: 'Max,Tom,Lena', hard: '', finished: 'Ana María', new: 'Omar,Yuki,Sofia,Ben' }), groups);
    await page.screenshot({ path: path.join(SHOTS, 'teacher-bylevel-1280.png'), fullPage: true });
    await page.click('[data-mode=child]'); await sleep(250);

    // ── by curriculum (release 2, step 9.6): the same class under the headings of the US curriculum ──
    await tab(page, 'skills');
    await page.waitForSelector('[data-skills-view] [data-group]');
    const skills = () => page.evaluate(() => [...document.querySelectorAll('[data-skills-view] [data-group]')].map((g) => {
      const h3 = g.querySelector('h3'), code = h3.querySelector('.c-code');
      const line = (b) => { const l = g.querySelector('[data-band-line="' + b + '"]'); return l ? [...l.children].map((x) => x.textContent.trim()) : null; };
      return { code: code ? code.textContent : null, title: [...h3.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(''), outside: !!g.querySelector('[data-outside]'), work: g.querySelector('[data-work]').textContent,
        low: line('low'), mid: line('mid'), rest: line('rest'), bands: [...g.querySelectorAll('.c-chip')].map((c) => c.getAttribute('data-band')),
        next: [...g.querySelectorAll('[data-next] [data-next-kind]')].map((n) => [n.getAttribute('data-next-kind'), n.tagName, n.textContent, n.getAttribute('href')]) };
    }));
    let sk = await skills();
    const lines = sk.find((g) => g.work === 'Number Lines'), time = sk.find((g) => g.work === 'Telling Time'), maze = sk.find((g) => g.work === 'Maze Puzzles');
    check('by curriculum: Number Lines stands under "Common Core 1.OA.C.5 · Operations and Algebraic Thinking"', !!lines && lines.code === 'Common Core 1.OA.C.5' && lines.title === 'Operations and Algebraic Thinking' && !lines.outside, lines);
    check('by curriculum: Max had many wrong on his last page, Lena some wrong; two almost all right; four have not played', !!lines && JSON.stringify([lines.low, lines.mid, lines.rest]) === JSON.stringify([['Many wrong: 1', 'Max'], ['Some wrong: 1', 'Lena'], ['Almost all right: 2', 'Not played yet: 4']]) && JSON.stringify(lines.bands) === JSON.stringify(['low', 'mid', 'high', 'none']), lines);
    check('by curriculum: a page the curriculum does not name stands under its domain and says so; a page with no marks reads "Played"', !!maze && maze.code === null && maze.outside && JSON.stringify(maze.rest) === JSON.stringify(['Played (this page is not scored): 2', 'Not played yet: 6']) && maze.next.length === 0, maze);
    check('by curriculum: the next step for number lines: an activity to add (a button), the tool and the unit lesson (links that open apart)', !!lines && JSON.stringify(lines.next.map((n) => [n[0], n[1]])) === JSON.stringify([['activity', 'BUTTON'], ['tool', 'A'], ['unit', 'A']]) && /^Add the activity “Hopper/.test(lines.next[0][2]) && lines.next[1][3] === '/en/tools/number-line' && lines.next[1][2] === 'Show it with the “Number Line” tool' && /^Teach lesson 4 of the unit “Addition and Subtraction Within 10”: /.test(lines.next[2][2]) && lines.next[2][3] === '/en/units/addition-and-subtraction-within-10-grade-1-unit', lines && lines.next);
    check('by curriculum: Telling Time stands under "Common Core 1.MD.B.3" with Lena under many wrong', !!time && time.code === 'Common Core 1.MD.B.3' && JSON.stringify(time.low) === JSON.stringify(['Many wrong: 1', 'Lena']), time);
    const truthSkills = (await store.classSkills(db, { userId: teacher, usable: true }, seeded.id, null, S.pick)).body;
    check('the screen shows what the rules hold (the same headings in the same order)', JSON.stringify(sk.map((g) => g.code)) === JSON.stringify(truthSkills.groups.map((g) => (g.fw ? g.fw + ' ' + g.code : null))), sk.map((g) => g.code));
    await page.screenshot({ path: path.join(SHOTS, 'teacher-skills-1280.png'), fullPage: true });

    // on paper: the class overview, and one page per child that names no other child
    await page.evaluate(() => {
      window.open = () => { const f = document.createElement('iframe'); f.style.display = 'none'; document.body.append(f); const w = f.contentWindow; w.print = () => { window.__printed = (window.__printed || 0) + 1; }; w.focus = () => {}; window.__paper = w.document; return w; };
    });
    await page.click('[data-act=print-class]'); await sleep(200);
    const paperClass = await page.evaluate(() => ({ printed: window.__printed, lang: window.__paper.documentElement.lang, h1: window.__paper.querySelector('h1').textContent, h2: [...window.__paper.querySelectorAll('h2')].map((x) => x.textContent), text: window.__paper.body.textContent }));
    check('print, class overview: the class name, the curriculum, every heading as one line, the children by result', paperClass.printed === 1 && paperClass.lang === 'en' && paperClass.h1 === 'Class 1B' && paperClass.h2.includes('Common Core 1.OA.C.5 · Operations and Algebraic Thinking') && /United States \(Common Core, NGSS\) · As of /.test(paperClass.text) && paperClass.text.includes('Many wrong (1): Max') && paperClass.text.includes('Not played yet (4): Omar, Yuki, Sofia, Ben'), paperClass);
    await page.click('[data-act=print-children]'); await sleep(200);
    const paperKids = await page.evaluate(() => [...window.__paper.querySelectorAll('.pg')].map((p) => ({ h1: p.querySelector('h1').textContent, text: p.textContent, rows: [...p.querySelectorAll('tr')].slice(1).map((tr) => [tr.children[0].children[0].textContent, tr.children[1].textContent]) })));
    const maxPage = paperKids.find((p) => p.h1 === 'What Max practiced');
    check('print, one page per child: only children with a result get a page (five)', paperKids.length === 5 && JSON.stringify(paperKids.map((p) => p.h1)) === JSON.stringify(['What Max practiced', 'What Ana María practiced', 'What Tom practiced', 'What Lena practiced', 'What Omar practiced']), paperKids.map((p) => p.h1));
    check("print, Max's page: his three headings with a word each, the note for parents, and no other child's name", !!maxPage && JSON.stringify(maxPage.rows) === JSON.stringify([[sk[0].code ? sk[0].code + ' · ' + sk[0].title : sk[0].title, 'Played (this page is not scored)'], ['Common Core 1.OA.C.5 · Operations and Algebraic Thinking', 'Many wrong'], ['Common Core 1.MD.B.3 · Measurement and Data', 'Some wrong']]) && maxPage.text.includes('It is one sign among many, not a grade.') && !/Ana|Tom|Lena|Omar|Yuki|Sofia|Ben/.test(maxPage.text), maxPage);

    // the other curriculum of the language: Texas
    const options = await page.evaluate(() => [...document.querySelectorAll('#c-curriculum option')].map((x) => [x.value, x.textContent, x.selected]));
    check('the curricula of the language are offered, the country\'s own chosen', JSON.stringify(options) === JSON.stringify([['en', 'United States (Common Core, NGSS)', true], ['en-tx', 'Texas (TEKS)', false]]), options);
    await page.select('#c-curriculum', 'en-tx');
    await page.waitForSelector('[data-skills-view="en-tx"] [data-group]');
    sk = await skills();
    check('read against Texas: Number Lines stands under a TEKS code', (sk.find((g) => g.work === 'Number Lines') || {}).code === 'TEKS 1.3.D', sk.map((g) => g.code));
    await tab(page, 'results'); await tab(page, 'skills');
    await page.waitForSelector('[data-skills-view] [data-group]');
    check('the chosen curriculum is remembered on this device', (await page.evaluate(() => document.querySelector('[data-skills-view]').getAttribute('data-skills-view'))) === 'en-tx');
    await page.select('#c-curriculum', 'en');
    await page.waitForSelector('[data-skills-view="en"] [data-group]');

    if (!POISON) {
      // the next step is one press: the activity joins the class's worksheets and is not offered again
      const before = [...db.assignments.values()].filter((a) => a.classId === seeded.id).length;
      await page.click('[data-group] [data-next-kind=activity]');
      await page.waitForSelector('[data-note]');
      await page.waitForSelector('[data-skills-view] [data-group]');
      const added = [...db.assignments.values()].filter((a) => a.classId === seeded.id);
      check('"Add the activity": the note says so, the class has one more assignment of the kind "activity"', /^“Hopper.*” was added to the class’s worksheets\.$/.test(await note(page)) && added.length === before + 1 && added[added.length - 1].kind === 'activity', await note(page));
      sk = await skills();
      const again2 = sk.find((g) => /Number Lines/.test(g.work));
      check('the added activity stands under the same heading and is not offered again', !!again2 && /Number Lines · Hopper/.test(again2.work) && !again2.next.some((n) => /Hopper/.test(n[2])), again2);
      await store.deleteAssignment(db, { userId: teacher, usable: true }, seeded.id, added[added.length - 1].id);
    }
    await tab(page, 'results');
    await page.waitForSelector('[data-results] table');

    if (!POISON) {
      // ── delete one child's results ──
      await page.evaluate(() => document.querySelector('[data-detail] [data-confirm] button').click()); await sleep(150);
      await page.evaluate(() => document.querySelector('.c-confirm [data-yes]').click()); await sleep(600);
      const maxRow = await page.evaluate(() => [...document.querySelectorAll('[data-results] tbody tr')].find((tr) => tr.querySelector('.c-who').textContent.trim() === 'Max').textContent.replace(/\s+/g, ' ').trim());
      check('"Delete this child\'s results": Max is still in the class, his cells are empty, his attempts are gone from the store', maxRow === 'Max–––' && ![...db.attempts.values()].some((a) => a.seatId === maxSeat.id) && db.seats.has(maxSeat.id), maxRow);

      // ── phone width ──
      const m = await open(390);
      await m.page.evaluate((id) => document.querySelector('[data-class="' + id + '"] button').click(), seeded.id);
      await m.page.waitForSelector('[data-results] table');
      const phone = await m.page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, small: [...document.querySelectorAll('#lcs-classes-root button, #lcs-classes-root a.c-btn')].filter((b) => b.getClientRects().length > 0).map((b) => ({ t: b.textContent.trim().slice(0, 20), h: Math.round(b.getBoundingClientRect().height) })).filter((b) => b.h < 40) }));
      check('390 px: the page does not scroll sideways (the table scrolls inside its card); every button ≥ 40 px high', phone.scrollW <= 390 && !phone.small.length, phone);
      await m.page.screenshot({ path: path.join(SHOTS, 'teacher-results-390.png'), fullPage: true });
      await tab(m.page, 'children');
      check('390 px, children tab: no sideways scroll', (await m.page.evaluate(() => document.documentElement.scrollWidth)) <= 390);
      await m.page.screenshot({ path: path.join(SHOTS, 'teacher-children-390.png'), fullPage: true });
      await tab(m.page, 'skills');
      await m.page.waitForSelector('[data-skills-view] [data-group]');
      const phoneSkills = await m.page.evaluate(() => ({ scrollW: document.documentElement.scrollWidth, small: [...document.querySelectorAll('[data-skills] button, [data-skills] select')].filter((b) => b.getClientRects().length > 0 && b.getBoundingClientRect().height < 40).map((b) => b.textContent.trim().slice(0, 24)), cut: [...document.querySelectorAll('[data-skills] button, [data-skills] a, [data-skills] select')].filter((b) => b.getClientRects().length > 0 && b.getBoundingClientRect().right > innerWidth + 1).map((b) => b.textContent.trim().slice(0, 24)) }));
      check('390 px, by curriculum: no sideways scroll, every button and the curriculum list ≥ 40 px high, nothing runs off the screen', phoneSkills.scrollW <= 390 && !phoneSkills.small.length && !phoneSkills.cut.length, phoneSkills);
      await m.page.screenshot({ path: path.join(SHOTS, 'teacher-skills-390.png'), fullPage: true });
      check('390 px: no script error', !m.errors.length, m.errors);
      await m.page.close();

      // ── a plan that is not active: read and delete, nothing else ──
      await fetch(base + '/__class/as?who=free');
      const l = await open(1280);
      check('lapsed: the list says so, shows the classes, offers no "New class"', (await text(l.page, '[data-lapsed]')) === EN.lapsedBanner.replace('{plan}', 'Teacher') && (await l.page.$('[data-class]')) !== null && (await l.page.$('[data-act=new]')) === null);
      await l.page.evaluate((id) => document.querySelector('[data-class="' + id + '"] button').click(), seeded.id);
      await l.page.waitForSelector('[data-results] table');
      check('lapsed: the results can still be read', (await l.page.$$('[data-results] tbody tr')).length === 8);
      await tab(l.page, 'children');
      const lc = await l.page.evaluate(() => ({ save: document.querySelectorAll('[data-act=rename]').length, pic: document.querySelectorAll('[data-act=picture]').length, remove: document.querySelectorAll('.c-seatrow [data-confirm]').length, add: !!document.querySelector('[data-form=seats]'), disabled: [...document.querySelectorAll('.c-seatrow input[type=text]')].every((i) => i.disabled) }));
      check('lapsed, children: no Save, no picture change, no adding; every child can still be removed', lc.save === 0 && lc.pic === 0 && !lc.add && lc.remove === 8 && lc.disabled, lc);
      await tab(l.page, 'work');
      check('lapsed, worksheets: no adding, no hiding; removing stays', (await l.page.$('[data-form=work]')) === null && (await l.page.$('[data-act=toggle]')) === null && (await l.page.$$('.c-seatrow [data-confirm]')).length === 3);
      await tab(l.page, 'link');
      check('lapsed, class link: says the link is closed; only "numbers only" and "delete" remain', /closed for children/.test(await text(l.page, '[data-link]')) && (await l.page.$('[data-act=save]')) === null && (await l.page.evaluate(() => [...document.querySelectorAll('[data-settings] [data-confirm]')].map((x) => x.getAttribute('data-confirm')).join('|'))) === EN.toNumbers + '|' + EN.deleteClass);
      await l.page.evaluate((lab) => [...document.querySelectorAll('[data-settings] [data-confirm] button')].find((b) => b.textContent === lab).click(), EN.toNumbers); await sleep(150);
      await l.page.evaluate(() => document.querySelector('.c-confirm [data-yes]').click()); await sleep(500);
      check('lapsed: switching to numbers only still works and erases every stored name', [...db.seats.values()].filter((s) => s.classId === seeded.id).every((s) => s.displayName === null));
      // delete both classes → an account without a plan and without classes sees the example
      for (const id of [seeded.id, made.id]) {
        await l.page.goto(base + '/teacher', { waitUntil: 'networkidle0' }); await l.page.waitForSelector('[data-class]');
        await l.page.evaluate((i) => document.querySelector('[data-class="' + i + '"] button').click(), id); await l.page.waitForSelector('[data-tab-button=link]');
        await tab(l.page, 'link');
        await l.page.evaluate((lab) => [...document.querySelectorAll('[data-settings] [data-confirm] button')].find((b) => b.textContent === lab).click(), EN.deleteClass); await sleep(150);
        await l.page.evaluate(() => document.querySelector('.c-confirm [data-yes]').click()); await sleep(600);
      }
      check('both classes deleted: nothing about any child is left in the store', db.classes.size === 0 && db.seats.size === 0 && db.assignments.size === 0 && db.attempts.size === 0, { classes: db.classes.size, seats: db.seats.size, attempts: db.attempts.size });
      const ex = await l.page.evaluate(() => ({ plan: !!document.querySelector('[data-plan]'), badge: (document.querySelector('[data-demo] .c-badge') || {}).textContent, rows: document.querySelectorAll('[data-demo] tbody tr').length, max: (() => { const tr = document.querySelector('[data-demo] tbody tr'); return tr ? tr.textContent.replace(/\s+/g, ' ').trim() : null; })(), cta: (document.querySelector('[data-plan] a') || {}).textContent }));
      check('no plan, no class: the plan card and an example dashboard marked "made-up children" (Max passed Level 2, struggled on Level 3)', ex.plan && ex.badge === EN.demoBadge && ex.rows === 6 && /^Max ?L2 5\/5 ?L3 2\/6/.test(ex.max) && ex.cta === EN.planCta.replace('{plan}', 'Teacher'), ex);
      await l.page.screenshot({ path: path.join(SHOTS, 'teacher-example-1280.png'), fullPage: true });
      check('lapsed: no script error', !l.errors.length, l.errors);
      await l.page.close();

      // ── signed out ──
      await fetch(base + '/__class/as?who=anon');
      const a = await open(1280);
      check('signed out: a sign-in card and the example, and no request for classes is answered with data', (await a.page.$('[data-signin]')) !== null && (await a.page.$('[data-demo]')) !== null && (await fetch(base + '/api/classes')).status === 401);
      await a.page.close();
      await fetch(base + '/__class/as?who=sub');
    }
    // ── a teacher WITHOUT the first-names permission (every teacher at launch): no choice, no names field, no way back to names ──
    if (!POISON) {
      await fetch(base + '/__class/as?who=sub&names=0');
      const n = await open(1280);
      await n.page.click('[data-act=new]'); await n.page.waitForSelector('[data-form=new]');
      const form = await n.page.evaluate(() => ({ radios: document.querySelectorAll('input[name=lcsc-mode]').length, names: !!document.querySelector('#lcsc-names'), count: !!document.querySelector('#lcsc-count') }));
      check('without the permission: the new-class form asks for a number of children and offers no first names', form.radios === 0 && !form.names && form.count, form);
      await n.page.type('#lcsc-name', 'Numbers class'); await n.page.type('#lcsc-count', '4');
      await clickText(n.page, EN.formCreate); await n.page.waitForSelector('[data-tab=work]');
      const numbersClass = [...db.classes.values()].find((c) => c.name === 'Numbers class');
      check('the class is a numbers class with four seats and no name stored', !!numbersClass && numbersClass.namesMode === 'numbers' && [...db.seats.values()].filter((s) => s.classId === numbersClass.id).length === 4 && [...db.seats.values()].filter((s) => s.classId === numbersClass.id).every((s) => s.displayName === null));
      await tab(n.page, 'link');
      check('its settings offer no switch to first names', (await n.page.$('[data-act=to-names]')) === null && (await n.page.$('[data-settings]')) !== null);
      const refused = await (await fetch(base + '/api/classes/' + numbersClass.id, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ namesMode: 'names' }) })).json();
      check('and the server refuses the switch when it is asked directly', refused.error === 'names_off', refused);
      check('without the permission: no script error', !n.errors.length, n.errors);
      await n.page.close();
      await fetch(base + '/__class/as?who=sub&names=1');
    }
    check('no script error on the teacher screen', !errors.length, errors);
    await page.close();
  } catch (e) { fails++; console.log('FAIL  the robot crashed: ' + (e.stack || e.message)); }
  await browser.close();
  await S.close();
  if (POISON) { console.log(fails ? `\npoison: the check FAILED ${fails} time(s), as it must` : '\npoison: the check did NOT fail — it proves nothing'); process.exit(fails ? 0 : 1); }
  console.log(fails ? `\n${fails} FAILURE(S)` : '\nteacher-app: no failures');
  process.exit(fails ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
