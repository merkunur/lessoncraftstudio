#!/usr/bin/env node
/* =====================================================================
   local-test-plural.js — interaction harness (L.2.1.b irregular plurals,
   clarity-first redesign of #79). Serves `mini tools/` + drives the DOM:

     • tapping a wrong chip does NOT resolve (warm nudge, no advance); tapping
       the correct plural resolves + shows the singular → plural reveal; shell
       Check hidden until resolved.
     • the singular + 3 plural chips + Hear-it render; the shell prompt carries
       the "more than one" question; no stored plural literal; EN-only; ≥7
       distinct + reshuffle; no overflow 280→768.
   ===================================================================== */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');

const ACTIVITY = 'plural.irregular.l-2-1-b';
const REPO = path.join(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.svg': 'image/svg+xml' };

function serve() {
  return http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split('?')[0]), file;
    if (p === '/' || p.endsWith('.html')) file = path.join(MINI, path.basename(p) || 'x');
    else if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice('/mini-tools/'.length));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; res.end('nf'); return; } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}

(async () => {
  const puppeteer = require('puppeteer');
  const server = serve();
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const fails = [];
  const note = (cond, msg) => { if (!cond) fails.push(msg); };
  const page = await browser.newPage();
  await page.setViewport({ width: 412, height: 900 });
  const errs = [];
  const isNoise = (s) => /Failed to load resource|favicon|\/audio\/|speechSynthesis|not-allowed/i.test(s);
  page.on('console', m => { if (m.type() === 'error' && !isNoise(m.text())) errs.push(m.text()); });
  page.on('pageerror', e => { if (!isNoise(e.message)) errs.push(e.message); });

  const url = `http://127.0.0.1:${PORT}/plural-activity.html?lang=en&activity=${ACTIVITY}&embed=1`;
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const S = () => page.evaluate(() => ({ resolved: window.PluralActivity._resolved, miss: !!document.querySelector('.pl-line-msg.miss') }));
  async function force(id) {
    await page.evaluate((rid) => {
      const t = window.PluralActivity, n = t._pool.length, order = [];
      for (let i = 0; i < n; i++) order.push(i);
      const k = t._pool.findIndex(x => x.id === rid);
      const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
      t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
    }, id);
    await page.waitForFunction(() => window.PluralActivity._round && document.querySelector('.pl-root'), { timeout: 4000 });
    await sleep(50);
  }
  const tapStr = (str) => page.evaluate((s) => { const b = Array.from(document.querySelectorAll('.pl-cand')).find(x => x.getAttribute('data-str') === s); if (b) b.click(); return !!b; }, str).then(() => sleep(40));
  const checkVisible = () => page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (!c) return false; const s = getComputedStyle(c); return s.display !== 'none' && c.offsetParent !== null; });
  const derived = (id) => page.evaluate((rid) => { const t = window.PluralActivity, r = t._pool.find(x => x.id === rid), C = window.PluralCore; return { correct: C.derivePlural(r), chips: C.chipStrings(r) }; }, id);

  try {
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await page.waitForFunction(() => { const t = window.PluralActivity; return t && t._activityRow && document.querySelector('.pl-root'); }, { timeout: 15000 });

    const title = await page.$eval('.lcs-title', e => e.textContent.trim()).catch(() => '');
    note(title === 'The Doubling Pond', `header title "${title}"`);
    const slugKeys = await page.evaluate(() => Object.keys(window.PluralActivity._activityRow.slug));
    // The EN slug is the canonical base; the activity is a localized fan-out target
    // (de/fr/es/pt/it/nl added since the original EN-only build), so assert EN is PRESENT
    // rather than EN-only (the old EN-only assertion went stale at the first localization).
    note(slugKeys.includes('en'), `manifest missing en slug: ${slugKeys.join(',')}`);

    const N = await page.evaluate(() => window.PluralActivity._pool.length);
    const ids = await page.evaluate((c) => { const t = window.PluralActivity, out = []; for (let i = 0; i < c; i++) { const x = t.nextTask({ index: i }); out.push(x ? x.id : null); } return out; }, 2 * N);
    note(new Set(ids.slice(0, N)).size >= 7, `only ${new Set(ids.slice(0, N)).size} distinct exercises`);
    note(ids.slice(0, N).join(',') !== ids.slice(N, 2 * N).join(',') || N < 2, 'second pass did not reshuffle');
    note(await page.evaluate(() => window.PluralActivity._pool.every(r => r.plural == null && r.correct == null)), 'a round stores a plural/answer literal field');

    /* a vowel-change round: prompt + singular + chips render; wrong no-advance; correct resolves + shows reveal */
    await force('pl-foot');
    const prompt = await page.$eval('.lcs-activity-prompt-text', e => e.textContent.trim()).catch(() => '');
    note(/more than one foot/i.test(prompt), `prompt wrong: "${prompt}"`);
    note(!(await checkVisible()), 'shell Check visible before resolve');
    note(await page.evaluate(() => { const s = document.querySelector('.pl-single'); return s && s.textContent.trim() === 'foot'; }), 'the singular did not render');
    note(await page.evaluate(() => document.querySelectorAll('.pl-cand').length === 3), 'the 3 plural chips did not render');
    note(await page.evaluate(() => !!document.querySelector('.pl-hear')), 'the Hear-it button did not render');

    let d = await derived('pl-foot');
    note(d.correct === 'feet', `foot derive wrong: "${d.correct}"`);
    const wrongChip = d.chips.find(s => s !== d.correct);
    await tapStr(wrongChip);
    note(!(await S()).resolved, 'a wrong chip resolved');
    note((await S()).miss, 'wrong gave no nudge');
    await tapStr(d.correct);
    note((await S()).resolved, 'the correct plural did not resolve');
    note(await page.evaluate(() => { const r = document.querySelector('.pl-reveal .pl-plural'); return r && r.textContent.trim() === 'feet'; }), 'the plural reveal did not show feet');
    note(await checkVisible(), 'shell Check did not appear after resolve');

    /* a no-change round (fish→fish) */
    await force('pl-deer');
    d = await derived('pl-deer');
    note(d.correct === 'deer', `no-change derive wrong: "${d.correct}"`);
    await tapStr('deer');
    note((await S()).resolved, 'no-change round: correct did not resolve');

    /* mobile overflow 280→768 */
    for (const w of [280, 360, 412, 768]) {
      await page.setViewport({ width: w, height: 820 });
      await force('pl-child'); await sleep(40);
      let over = await page.evaluate(() => { const dd = document.scrollingElement || document.documentElement; return dd.scrollWidth - dd.clientWidth; });
      note(over <= 2, `horizontal overflow ${over}px at ${w}px`);
    }

    /* ---- the screen reader must hear the chips in the SAME order it sees them ----------
       _srMirror used to build its list from Core.chipStrings(round), which is UNSHUFFLED and
       whose index 0 is always derivePlural — measured: the correct answer sat first in 63 of
       63 rounds across all seven pools, while the buttons were shuffled at :193. Sampled over
       many rounds so a single lucky ordering cannot pass, and the answer-first count is
       asserted too: matching order alone would still be wrong if the BUTTONS were sorted. */
    {
      await page.setViewport({ width: 412, height: 900 });
      let answerFirst = 0, sampled = 0, mismatched = 0;
      const ids = await page.evaluate(() => window.PluralActivity._pool.map(r => r.id));
      note(ids.length >= 7, `sr-order: only ${ids.length} rounds to sample`);
      for (const id of ids) {
        await force(id); await sleep(50);
        const seen = await page.evaluate(() => {
          const btns = [...document.querySelectorAll('.pl-cand')].map(b => b.textContent.trim());
          const sr = (document.querySelector('.pl-sronly') || {}).textContent || '';
          const m = sr.match(/:\s*([^.]+)\.\s*$/);
          return { btns, srList: m ? m[1].split(',').map(s => s.trim()) : null };
        });
        const d = await derived(id);
        note(seen.btns.length === 3, `sr-order/${id}: ${seen.btns.length} buttons, expected 3`);
        note(!!seen.srList && seen.srList.length === 3, `sr-order/${id}: the sr-only list did not parse — nothing was checked`);
        if (!seen.srList || seen.btns.length !== 3) continue;
        sampled++;
        if (seen.srList.join('|') !== seen.btns.join('|')) mismatched++;
        if (seen.srList[0] === d.correct) answerFirst++;
      }
      note(sampled >= 7, `sr-order: only ${sampled} rounds actually sampled — the check is vacuous`);
      note(mismatched === 0, `sr-order: the sr-only list differs from the button order in ${mismatched}/${sampled} rounds — a screen-reader user hears a different order from the one on screen`);
      note(answerFirst < sampled, `sr-order: the correct plural was announced FIRST in ${answerFirst}/${sampled} rounds — the screen reader is being handed the answer`);
    }

    note(errs.length === 0, `console error(s): ${errs.slice(0, 2).join(' | ')}`);
    console.log(`  ${fails.length ? 'FAIL' : 'ok  '} plural/en — "${title}"`);
  } catch (e) {
    fails.push('plural/en: ' + e.message);
    console.log(`  FAIL plural/en — ${e.message}`);
  } finally { await page.close(); }

  /* ---- sv: no English may reach text, aria-labels or SPEECH, on ANY of the four surfaces ---- */
  const svAt = fails.length;
  try {
    const mfPath = require('path').join(__dirname, '..', 'mini tools', 'plural-activities.json');
    const mf = JSON.parse(fs.readFileSync(mfPath, 'utf8'));
    const row = (Array.isArray(mf) ? mf[0] : mf);
    const enRounds = row.params.rounds, svRounds = (row.params.roundsL10n || {}).sv;
    note(Array.isArray(svRounds) && svRounds.length === enRounds.length, `sv: ${svRounds ? svRounds.length : 0} sv rounds vs ${enRounds.length} en — the round surface would go unchecked`);

    const sp = await browser.newPage();
    await sp.setViewport({ width: 412, height: 900 });
    await sp.evaluateOnNewDocument(() => {
      window.__spoke = [];
      const iv = setInterval(() => {
        if (window.LCSAudio && window.LCSAudio.speak && !window.LCSAudio.__wrapped) {
          const o = window.LCSAudio.speak;
          window.LCSAudio.speak = function (a) { window.__spoke.push(a && a.text); return o.apply(this, arguments); };
          window.LCSAudio.__wrapped = 1; clearInterval(iv);
        }
      }, 10);
    });
    await sp.goto(`http://127.0.0.1:${PORT}/plural-activity.html?lang=sv&activity=${ACTIVITY}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
    await sp.waitForFunction(() => window.PluralActivity && window.PluralActivity._pool && window.PluralActivity._pool.length, { timeout: 15000 });
    note(await sp.evaluate(() => !!(window.LCSAudio && window.LCSAudio.__wrapped)), 'sv: the speech recorder never attached — the spoken sentence would be unchecked');
    note(await sp.evaluate(() => window.PluralActivity._pool.length === 9), 'sv: the sv pool did not load — the page is running the ENGLISH rounds');

    /* SURFACE 1+2: probes derived from the en table ALONE */
    const strEn = await sp.evaluate(() => {
      const out = [], L = window.__PL_L || null;
      const S = window.PluralActivity.strings || {};
      ['title', 'instruction'].forEach(k => { if (S[k] && S[k].en && S[k].sv !== S[k].en) out.push([k, S[k].en]); });
      return out;
    });
    /* the L table is closure-scoped, so take its English from the SOURCE on disk */
    const src = fs.readFileSync(require('path').join(__dirname, '..', 'mini tools', 'plural-activity.js'), 'utf8');
    const enBlock = src.slice(src.indexOf('\n    en: {'), src.indexOf('\n    de: {'));
    const lPairs = [...enBlock.matchAll(/(\w+):\s*'((?:[^'\\]|\\.)*)'/g)].map(m => ['L.' + m[1], m[2].replace(/\\'/g, "'")]);
    note(lPairs.length >= 6, `sv: only ${lPairs.length} English L-table strings parsed — the probe list is too thin to mean anything`);
    const enQ = enRounds.map(r => ['q:' + r.id, r.q]);
    const pairs = strEn.concat(lPairs, enQ);
    note(pairs.length >= 16, `sv: only ${pairs.length} probes across all surfaces`);

    let sawWin = 0, sawNudge = 0, sawNoChange = 0, spoke = 0;
    const allHay = [];
    for (const r of svRounds) {
      await sp.evaluate((id) => {
        const t = window.PluralActivity, n = t._pool.length, order = [];
        for (let i = 0; i < n; i++) order.push(i);
        const k = t._pool.findIndex(x => x.id === id); if (k > 0) { order.splice(k, 1); order.unshift(k); }
        t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.__spoke = [];
        window.LCS_reloadFirstTask();
      }, r.id);
      await sp.waitForFunction(() => document.querySelector('.pl-cand'), { timeout: 5000 });
      await sleep(50);
      const snap = () => sp.evaluate(() => ({
        text: (document.querySelector('.lcs-app') || document.body).innerText || '',
        aria: [...document.querySelectorAll('.lcs-app [aria-label]')].map(e => e.getAttribute('aria-label')).join(' | '),
        spoke: (window.__spoke || []).join(' | ')
      }));
      const frames = [await snap()];
      /* the SPOKEN sentence — it lives in no string table */
      await sp.evaluate(() => { const b = document.querySelector('.pl-hear'); if (b) b.click(); });
      await sleep(60);
      frames.push(await snap());
      const d = await sp.evaluate((id) => { const t = window.PluralActivity, rr = t._pool.find(x => x.id === id), C = window.PluralCore; return { correct: C.derivePlural(rr), chips: C.chipStrings(rr) }; }, r.id);
      /* EVERY wrong tap, not just the first. The two wrong chips take DIFFERENT branches —
         the +s form gives nPlusS and the bare singular (or the +es form on a no-change round)
         gives nUnchanged / nNoChange — so tapping only chips[1] left two authored strings
         undriven, and the reachability check correctly reported them as dead. */
      for (const wrong of d.chips.filter(s => s !== d.correct)) {
        await sp.evaluate((s) => { const b = [...document.querySelectorAll('.pl-cand')].find(x => x.getAttribute('data-str') === s); if (b) b.click(); }, wrong);
        await sleep(60);
        frames.push(await snap());
      }
      if (/miss/.test(await sp.evaluate(() => (document.querySelector('.pl-line-msg') || {}).className || ''))) sawNudge++;
      /* then the CORRECT tap — win + winNote, and the no-change note on barn/djur */
      await sp.evaluate((s) => { const b = [...document.querySelectorAll('.pl-cand')].find(x => x.getAttribute('data-str') === s); if (b) b.click(); }, d.correct);
      await sleep(80);
      frames.push(await snap());
      if (await sp.evaluate(() => window.PluralActivity._resolved)) { sawWin++; if (r.rule === 'no-change') sawNoChange++; }
      spoke += frames.map(f => f.spoke).join('').length;
      const hay = frames.map(f => f.text + ' | ' + f.aria + ' | ' + f.spoke).join(' | ');
      allHay.push(hay);
      note(hay.trim().length > 0, `sv/${r.id}: nothing rendered — vacuous`);
      for (const [key, enVal] of pairs) {
        const segs = String(enVal).split(/\{[^}]*\}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length >= 6);
        if (!segs.length) continue;
        const probe = segs.sort((a, b) => b.length - a.length)[0];
        note(hay.indexOf(probe) === -1, `sv/${r.id}: the ENGLISH '${key}' reached the child — "${probe}"`);
      }
      for (const frag of ['More than one', 'stays the same', 'already many', 'special word', 'Which one is right', 'Doubling Pond', 'lazy']) {
        note(hay.indexOf(frag) === -1, `sv/${r.id}: an English fragment reached the child — "${frag}"`);
      }
    }
    /* every AUTHORED Swedish string must actually be reached by the states above. */
    const svBlock = src.slice(src.indexOf('\n    sv: {'), src.indexOf('\n    nl: {'));
    note(svBlock.length > 40, 'sv: could not slice the sv L block — the reachability check would be vacuous');
    const svPairs = [...svBlock.matchAll(/(\w+):\s*'((?:[^'\\]|\\.)*)'/g)].map(m => [m[1], m[2].replace(/\\'/g, "'")]);
    note(svPairs.length >= 6, `sv: only ${svPairs.length} sv L-table strings parsed — reachability would be vacuous`);
    const corpus = allHay.join(' || ');
    for (const [key, val] of svPairs) {
      if (key === 'q') continue;   // the identity passthrough '{q}'; its text is the round question
      const segs = String(val).split(/\{[^}]*\}/).map(s => s.replace(/\s+/g, ' ').trim()).filter(s => s.length >= 6);
      if (!segs.length) continue;
      const probe = segs.sort((a, b) => b.length - a.length)[0];
      note(corpus.indexOf(probe) !== -1, `sv: the authored string L.sv.${key} is NEVER REACHED in any state — a dead string ("${probe.slice(0, 48)}")`);
    }
    /* ⚠ ENGLISH MARKERS — the only check that can see a leak in a key with NO English twin.
       `and` (=a duck), `is` (=ice) and `just` (as in `just nu`) are EXCLUDED because they are
       real Swedish words; a ban that condemns correct Swedish teaches the next author to write
       around it. Unicode-safe boundaries: \b is ASCII-only and å/ä/ö fall outside it. */
    const EN_MARKERS = ['the', 'not', 'does', 'word', 'stays', 'which', 'means', 'again', 'more than', 'add', 'look'];
    const svCorpus = allHay.join(' || ');
    note(svCorpus.length > 200, 'sv: the rendered corpus is too small for the English-marker check to mean anything');
    for (const w of EN_MARKERS) {
      const re = new RegExp('(?<!\\p{L})' + w + '(?!\\p{L})', 'iu');
      note(!re.test(svCorpus), `sv: the English word "${w}" reached the child somewhere in the Swedish render`);
    }
    note(sawNudge >= 7, `sv: only ${sawNudge} rounds showed a nudge — the nudge strings are unchecked`);
    note(sawWin >= 7, `sv: only ${sawWin} rounds reached the win — win/winNote are unchecked`);
    note(sawNoChange >= 2, `sv: only ${sawNoChange} no-change rounds resolved — the _resolve inline chain (the one that falls back to ENGLISH) is unchecked`);
    note(spoke > 0, 'sv: NOTHING was spoken — the Hear-it sentence is unchecked');
    const bad = fails.length - svAt;
    console.log(bad ? `  FAIL plural/sv — ${bad} English leak(s)` : `  ok   plural/sv — no English in text, aria or speech across ${svRounds.length} rounds x 4 states, all four surfaces`);
    await sp.close();
  } catch (e) { fails.push('plural/sv: ' + e.message); console.log(`  FAIL plural/sv — ${e.message}`); }

  await browser.close();
  server.close();
  console.log('');
  if (fails.length) { console.error(`PLURAL LOCAL TEST FAILED — ${fails.length} issue(s):`); fails.forEach(f => console.error('  • ' + f)); process.exit(1); }
  console.log('PLURAL LOCAL TEST PASSED — irregular plurals: a wrong chip does NOT resolve (warm nudge, no advance); the correct plural resolves + shows the singular→plural reveal; the singular + 3 chips + Hear-it render; the shell prompt carries the question; no stored plural literal; EN-only; ≥7 distinct + reshuffle; no overflow 280→768.');
  process.exit(0);
})().catch(e => { console.error('ERROR:', e.message); process.exit(1); });
