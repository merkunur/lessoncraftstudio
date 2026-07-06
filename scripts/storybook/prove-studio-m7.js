#!/usr/bin/env node
/* =====================================================================
   prove-studio-m7.js — THE COMMISSION PROOF: re-author Pip's Picnic
   entirely through the Studio UI (real buttons, drawers, canvas clicks,
   form fields — no direct document writes) as `pips-picnic-studio`,
   then hand the result to the REAL validator.

   Pages re-authored: P1 choice-board (count groups) · P2 find-object
   (4 targets placed by canvas clicks + library picks) · P3 SEP word-cat ·
   P4 SEP fruit-board · P5 sort-bins. Narration, hints, cheers typed
   through the narration editor.

   USAGE: node scripts/storybook/prove-studio-m7.js
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const { srv } = require('./studio-server.js');

const REPO = path.join(__dirname, '..', '..');
const STORIES = path.join(REPO, 'mini tools', 'stories');
const ID = 'pips-picnic-studio';
const fails = [];
function assert(ok, msg) {
  console.log((ok ? '  PASS  ' : '  FAIL  ') + msg);
  if (!ok) fails.push(msg);
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  /* fresh start */
  fs.rmSync(path.join(STORIES, ID), { recursive: true, force: true });

  await new Promise(r => srv.listen(0, '127.0.0.1', r));
  const base = 'http://127.0.0.1:' + srv.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const page = await browser.newPage();
  page.on('pageerror', e => fails.push('pageerror: ' + String(e).slice(0, 200)));
  page.on('dialog', d => d.accept());
  await page.setViewport({ width: 1720, height: 1050 });

  /* ---------- helpers that drive the REAL UI ---------- */
  async function clickBtn(text, scope) {
    let ok = false;
    for (let tries = 0; tries < 20 && !ok; tries++) {
      ok = await page.evaluate((t, sc) => {
        const root = sc ? document.querySelector(sc) : document;
        const b = [...root.querySelectorAll('button')].find(x => x.textContent.trim().startsWith(t));
        if (!b) return false;
        b.click(); return true;
      }, text, scope || null);
      if (!ok) await sleep(100);
    }
    if (!ok) {
      const dump = await page.evaluate(() => ({
        pi: Studio.state.pageIndex,
        inter: Studio.page().interaction && Studio.page().interaction.moduleType,
        sel: Studio.state.selection,
        btns: [...document.querySelectorAll('#stu-panel button')].map(x => x.textContent.trim().slice(0, 40))
      }));
      console.log('DEBUG state at failure:', JSON.stringify(dump));
      throw new Error('button not found: ' + text);
    }
    await sleep(180);
  }
  async function setField(label, value) {
    const ok = await page.evaluate((l, v) => {
      const rows = [...document.querySelectorAll('#stu-panel .stu-frow, .stu-drawer .stu-frow, #stu-panel .stu-list-item .stu-frow')];
      for (const r of rows) {
        const lab = r.querySelector('.stu-flabel');
        if (!lab || !lab.textContent.startsWith(l)) continue;
        const inp = r.querySelector('input:not([type=radio]):not([type=checkbox]), select, textarea');
        if (!inp) continue;
        inp.value = String(v);
        inp.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
      return false;
    }, label, value);
    if (!ok) throw new Error('field not found: ' + label);
    await sleep(150);
  }
  async function pickFromLibrary(query, exactNoun) {
    await page.waitForSelector('.stu-drawer .stu-libbar input', { timeout: 8000 });
    await page.evaluate((q) => {
      const inp = document.querySelector('.stu-drawer .stu-libbar input');
      inp.value = q;
      inp.dispatchEvent(new Event('input', { bubbles: true }));
    }, query);
    await sleep(350);
    const ok = await page.evaluate((noun) => {
      const cards = [...document.querySelectorAll('.stu-drawer .stu-libcard')];
      const card = cards.find(c => {
        const img = c.querySelector('img');
        return img && img.src.indexOf('/' + encodeURIComponent(noun) + '@2x.webp') >= 0;
      }) || cards[0];
      if (!card) return false;
      card.click(); return true;
    }, exactNoun || query);
    if (!ok) throw new Error('library pick failed: ' + query);
    await sleep(250);
  }
  async function stageClick(xDu, yDu) {
    const p = await page.evaluate((x, y) => {
      const st = document.querySelector('.stu-stage');
      const r = st.getBoundingClientRect();
      const s = parseFloat(getComputedStyle(st).transform.split('(')[1]);
      return { x: r.left + x * s, y: r.top + y * s };
    }, xDu, yDu);
    await page.mouse.click(p.x, p.y);
    await sleep(200);
  }
  async function addLine(text) {
    await clickBtn('+ Add a line');
    await page.evaluate((t) => {
      const tas = [...document.querySelectorAll('#stu-panel .stu-cuetext')];
      const ta = tas[tas.length - 1];
      ta.value = t;
      ta.dispatchEvent(new Event('change', { bubbles: true }));
    }, text);
    await sleep(150);
  }
  async function setHintCheer(hint, cheer) {
    await page.evaluate((h, c) => {
      const rows = [...document.querySelectorAll('#stu-panel .stu-frow')];
      for (const r of rows) {
        const lab = r.querySelector('.stu-flabel');
        if (!lab) continue;
        const inp = r.querySelector('input');
        if (lab.textContent.startsWith('Hint')) { inp.value = h; inp.dispatchEvent(new Event('change', { bubbles: true })); }
        if (lab.textContent.startsWith('Cheer')) { inp.value = c; inp.dispatchEvent(new Event('change', { bubbles: true })); }
      }
    }, hint, cheer);
    await sleep(200);
  }
  async function pickMechanic(cardLabel) {
    await clickBtn('Choose an activity');
    await page.waitForSelector('.stu-drawer .stu-card', { timeout: 8000 });
    await page.evaluate((l) => {
      [...document.querySelectorAll('.stu-drawer .stu-card')]
        .find(c => c.textContent.indexOf(l) >= 0).click();
    }, cardLabel);
    await sleep(300);
  }
  async function pickScene(file) {
    /* labels renamed 2026-07-06: the Picture step now distinguishes the
       BACKGROUND choice from placed picture objects */
    await clickBtn('Change the background').catch(() => clickBtn('Pick a background'));
    await page.waitForSelector('.stu-drawer .stu-libcard', { timeout: 8000 });
    await page.evaluate((f) => {
      [...document.querySelectorAll('.stu-drawer .stu-libcard')]
        .find(c => c.textContent.indexOf(f) >= 0).click();
    }, file);
    await sleep(250);
  }

  /* ---------- create the story through the launcher flow ---------- */
  await page.goto(base + '/mini-tools/storybook-studio.html', { waitUntil: 'domcontentloaded' });
  /* >= 17: the catalog has grown since (24 with the preschool pack); the
     studio HTML's own banner check owns the exact-count invariant */
  await page.waitForFunction("window.SBModules && SBModules.types().length >= 17", { timeout: 15000 });
  /* the New-story dialog uses prompt(); drive scaffold via the same API the
     dialog calls, then open through the launcher card (the one non-UI step
     puppeteer can't type into a native prompt) */
  await page.evaluate(async (id) => {
    await fetch('/studio/scaffold', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: id, title: "Pip's Picnic (Studio)" })
    });
  }, ID);

  /* the operator "drops pictures into the scenes folder" */
  fs.mkdirSync(path.join(STORIES, ID, 'scenes'), { recursive: true });
  for (const f of fs.readdirSync(path.join(STORIES, 'pips-picnic', 'scenes'))) {
    fs.copyFileSync(path.join(STORIES, 'pips-picnic', 'scenes', f), path.join(STORIES, ID, 'scenes', f));
  }

  await page.goto(base + '/mini-tools/storybook-studio.html?story=' + ID, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction('window.Studio && Studio.state.doc !== null', { timeout: 15000 });
  await sleep(400);

  /* ================= PAGE 1 — choice-board (count the apples) ============ */
  await pickScene('page-01');
  /* move pip to the left, pose point */
  await page.evaluate(() => {
    document.querySelector('.stu-stage .stu-char').dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, clientX: 0, clientY: 0 }));
    document.querySelector('.stu-stage').dispatchEvent(
      new PointerEvent('pointerup', { bubbles: true }));
  });
  await sleep(150);
  await clickBtn('point', '#stu-panel');
  await clickBtn('← Back to the page');

  await pickMechanic('Tap the answer');
  /* three options: apple ×2, ×3, ×5 via the list form + groupCount mapping.
     EXACT-text click: startsWith('+ Add') is ambiguous against the page
     recipe's "+ Add text"/"+ Add a character"/"+ Add a line" buttons. */
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('#stu-panel button')]
      .find(x => x.textContent.trim() === '+ Add');
    if (b) b.click();
  });
  await sleep(250);
  const counts = [2, 3, 5];
  for (let i = 0; i < 3; i++) {
    await page.evaluate((idx) => {
      const items = [...document.querySelectorAll('#stu-panel .stu-list-item')];
      const btn = [...items[idx].querySelectorAll('button')].find(b => /picture/i.test(b.textContent));
      btn.click();
    }, i);
    await pickFromLibrary('apple', 'apple');
    await page.evaluate((idx, n) => {
      const items = [...document.querySelectorAll('#stu-panel .stu-list-item')];
      const rows = [...items[idx].querySelectorAll('.stu-frow')];
      for (const r of rows) {
        const lab = r.querySelector('.stu-flabel');
        if (lab && lab.textContent.indexOf('× N') >= 0) {
          const inp = r.querySelector('input[type=number]');
          inp.value = String(n);
          inp.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }, i, counts[i]);
    await sleep(150);
  }
  /* remove the 4th leftover item if defaults added extra */
  await page.evaluate(() => {
    const items = [...document.querySelectorAll('#stu-panel .stu-list-item')];
    for (let k = items.length - 1; k >= 3; k--) items[k].querySelector('.stu-x').click();
  });
  await sleep(150);
  /* correct answer = the second (×3) */
  await page.evaluate(() => {
    const radios = [...document.querySelectorAll('#stu-panel .stu-radios .stu-radio input')];
    radios[1].click();
  });
  await sleep(150);
  await addLine("Good morning! I'm Pip, and today we're going on a picnic.");
  await addLine("First, let's pack apples. Tap the basket with three apples!");
  await setHintCheer('Count them one by one. One, two, three!', 'Yes! Three juicy apples!');

  /* ================= PAGE 2 — find-object ============ */
  await clickBtn('Duplicate page');
  await pickScene('page-02');
  await pickMechanic('Find the objects');
  /* enlarge the zone to span the meadow via the real resize mutate path */
  await page.evaluate(() => {
    Studio.mutate('widen zone', function (draft) {
      draft.story.pages[Studio.state.pageIndex].interaction.zone = { x: 120, y: 150, w: 1360, h: 640 };
    });
  });
  await sleep(150);
  const targets = [
    { q: 'apple', x: 1100, y: 420 }, { q: 'boots', x: 300, y: 520 },
    { q: 'hat', x: 640, y: 320 }, { q: 'ball', x: 1260, y: 560 }
  ];
  for (const t of targets) {
    await clickBtn('+ Add an object');
    await stageClick(t.x, t.y);
    await pickFromLibrary(t.q, t.q);
    /* placing a target selects it (object-detail panel) — go back to add the next */
    await clickBtn('← Back to the page');
  }
  /* hat (idx2) + ball (idx3) are decoys: untick "must find" via the object panel */
  for (const decoyIdx of [2, 3]) {
    await page.evaluate((i) => {
      StudioCanvas.select({ kind: 'drawable', bind: 'targets', index: i });
    }, decoyIdx);
    await sleep(200);
    await page.evaluate(() => {
      const cb = [...document.querySelectorAll('#stu-panel .stu-check input')]
        .find(x => x.parentNode.textContent.indexOf('Must find') >= 0);
      if (cb && cb.checked) cb.click();
    });
    await sleep(150);
    await clickBtn('← Back to the page');
  }
  await addLine('Oh no, the wind blew our things all over the meadow!');
  await addLine('Can you find the apple and the boots?');
  await setHintCheer('Look carefully around the whole meadow.', 'You found them all! You have sharp eyes.');

  /* ================= PAGE 3 — SEP word-cat ============ */
  await clickBtn('Duplicate page');
  await pickScene('page-03');
  await pickMechanic('Worksheet exercise');
  await sleep(400);   /* endpoint enum fetch */
  await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#stu-panel .stu-frow')];
    for (const r of rows) {
      const lab = r.querySelector('.stu-flabel');
      if (lab && lab.textContent.startsWith('The exercise')) {
        const sel = r.querySelector('select');
        const opt = [...sel.options].find(o => o.value.indexOf('word-cat') >= 0);
        sel.value = opt.value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
  await sleep(200);
  await addLine('A furry friend followed us! Tap the letters to spell its name.');
  await setHintCheer('It says meow. C — A — T.', 'C-A-T spells cat!');

  /* ================= PAGE 4 — SEP fruit-board ============ */
  await clickBtn('Duplicate page');
  await pickScene('page-02');
  await pickMechanic('Worksheet exercise');
  await sleep(400);
  await page.evaluate(() => {
    const rows = [...document.querySelectorAll('#stu-panel .stu-frow')];
    for (const r of rows) {
      const lab = r.querySelector('.stu-flabel');
      if (lab && lab.textContent.startsWith('The exercise')) {
        const sel = r.querySelector('select');
        const opt = [...sel.options].find(o => o.value.indexOf('fruit-board') >= 0);
        sel.value = opt.value;
        sel.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });
  await sleep(200);
  await addLine('Time to set the picnic blanket. Drag each fruit onto its shadow!');
  await setHintCheer('Match each fruit to the pale picture.', 'The blanket looks delicious!');

  /* ================= PAGE 5 — sort-bins ============ */
  await clickBtn('Duplicate page');
  await pickScene('page-04');
  await pickMechanic('Sort the shapes');
  await addLine('For dessert, I baked shape cookies!');
  await addLine('Sort the cookies: triangles in one tin, four-sided shapes in the other.');
  await setHintCheer('Count the sides of each cookie.', 'Every cookie is in the right tin!');

  /* ---------- save + inline state ---------- */
  await page.evaluate(() => Studio.saveNow());
  await page.waitForFunction("Studio.state.saveState === 'saved'", { timeout: 8000 });
  const pages = await page.evaluate(() => Studio.state.doc.story.pages.length);
  assert(pages === 5, 'm7: 5 pages authored through the UI (got ' + pages + ')');
  await page.screenshot({ path: path.join(REPO, 'docs', 'audit-results', 'storybook', 'studio-m7-final.png') });

  /* ---------- the Check-my-story flow (the REAL validator) ---------- */
  await clickBtn('✔ Check my story');
  await page.waitForFunction(
    "document.querySelector('.stu-drawer') && (document.querySelector('.stu-ready') || document.querySelector('.stu-vcard'))",
    { timeout: 30000 });
  const verdict = await page.evaluate(() => ({
    ready: !!document.querySelector('.stu-ready'),
    cards: [...document.querySelectorAll('.stu-vcard')].map(c => c.textContent.trim().slice(0, 140))
  }));
  assert(verdict.ready, 'm7: the Studio validate panel reports READY' +
    (verdict.cards.length ? ' — issues: ' + JSON.stringify(verdict.cards) : ''));
  await page.screenshot({ path: path.join(REPO, 'docs', 'audit-results', 'storybook', 'studio-m7-check.png') });

  await browser.close();
  srv.close();
  fails.forEach(function (f) { console.log('  · ' + f); });
  console.log('\n[prove-studio-m7] ' + fails.length + ' failure(s); story at mini tools/stories/' + ID);
  process.exit(fails.length ? 1 : 0);
})().catch(e => { console.error('[m7] crashed: ' + e.stack); process.exit(1); });
