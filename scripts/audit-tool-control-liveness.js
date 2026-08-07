#!/usr/bin/env node
/* =====================================================================
   audit-tool-control-liveness.js — EVERY CONTROL MUST DO SOMETHING.

   ⚠ WHY THIS EXISTS. Class Graph shipped with a dead "Add an answer"
   button past FIVE green suites: a model gate, a mutation run at 54/54,
   a 55-assertion browser DoD, an 11-locale smoke digest and a 6-viewport
   layout audit. The hole was exact and embarrassing —

       we proved every STRING RENDERS; nothing proved a CONTROL ACTS.

   `addCat` even appeared in the smoke digest marked as rendered, which
   read as coverage. The handler pushed '' into `setSetup`, `setSetup`
   drops blanks by design, so the click could not change anything.

   So: click every button the tool can reach and assert the world
   changed. "Changed" is deliberately generous — a control may act on
   the DOM, print, speak, or store — but it may not do NOTHING.

   ⚠ IT RUNS UNDER SEVERAL ENTITLEMENT STATES ON PURPOSE. The Class Graph
   defect was only reachable when the add chip rendered UNLOCKED, i.e.
   for a subscriber, or during the auth window for a signed-in free
   account. A single-state harness could pass forever without seeing it.

   ⚠ IT DISCOVERS CONTROLS, it does not take a list. Most interesting
   controls (the whole setup editor) do not exist until you open a panel,
   and a hand-written list is exactly the thing that forgets the one
   button nobody tested. Breadth-first to --depth, replaying the click
   path from a fresh page each time so every verdict starts from a known
   state.

   Tool controls that do nothing FAIL. Shared-shell controls WARN —
   lcs-shell is protected and not this commission's to change, but a
   silent shell regression should still be visible.

   ⚠ WHAT "DEAD" MEANS, AND WHY IT IS PER-STATE, NOT PER-PATH. A control
   is judged dead only if it acts on NO reachable path WITHIN ONE
   entitlement state. Judging per path cries wolf: "Show the children"
   correctly does nothing when the board is already showing children, and
   a gate that reports 33 honest idempotent no-ops is a gate you learn to
   scroll past. Aggregating per STATE (never globally) is what keeps the
   original defect caught — the old add chip acted in `free`, where it
   raised the upgrade line, and did nothing on every single path under
   `premium`. Collapse the states together and that bug walks straight
   back through. The cost is real and worth naming: a control that is
   dead on one path but alive on another is not flagged.

   Usage:
     node scripts/audit-tool-control-liveness.js --tool=class-graph
     node scripts/audit-tool-control-liveness.js --all
     node scripts/audit-tool-control-liveness.js --all --depth=3
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');
const puppeteer = require('puppeteer');

const ROOT = path.join(__dirname, '..');
const MINI = path.join(ROOT, 'mini tools');
/* ⚠ port 0 = let the OS choose. A fixed port made two overlapping runs
   die on EADDRINUSE, and a gate that cannot run twice at once is a gate
   people stop running. */
let PORT = 0;
const MIME = { '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.html': 'text/html', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };

/* ⚠ THE PREFIX IS DERIVED, NOT REGISTERED. A tool's class namespace is
   already written down in exactly one place — the wrapper it builds — so
   reading it there means a NEW TOOL NEEDS NO ENTRY HERE. The first
   version kept a hardcoded map and refused to run on tool #35 with
   "unknown tool", which is the same shape of defect as the registration
   step that 410'd a tool in all eleven locales: a list somebody has to
   remember. The `--all` roster below is scope, not registration. */
const ALL_TOOLS = ['class-graph', 'number-balance', 'pattern-bench', 'sorting-hoops',
  'reading-easel', 'folding-sheet', 'ten-frame',
  /* letter-studio was reachable only via an explicit --tool, so `--all` had
     never covered it. This gate is the ONLY instrument that can see a
     consequence-free control, and it is what caught the numeral strip on #39
     whose entire effect in 1067 lines was its own highlight class. */
  'letter-studio', 'number-sieve'];

function prefixOf(tool) {
  const f = path.join(MINI, tool + '.js');
  if (!fs.existsSync(f)) return null;
  const m = /api\.el\(['"]div['"],\s*['"]([a-z]+)-wrap['"]\)/.exec(fs.readFileSync(f, 'utf8'));
  return m ? m[1] : null;
}

/* ⚠ NAMED, NOT INFERRED. The only controls exempt from "must do
   something" are the ones whose entire effect is outside the document and
   unobservable in headless. Fullscreen calls app.requestFullscreen(),
   which a headless iframe rejects outright. Nothing else goes on this
   list without that same argument written down beside it. */
const OFF_DOM = ['Fullscreen'];

/* the three states a teacher can actually be in */
const STATES = [
  { id: 'anon',    token: false, premium: false },
  { id: 'free',    token: true,  premium: false },
  { id: 'premium', token: true,  premium: true }
];

const arg = (k, d) => {
  const hit = process.argv.find((a) => a.startsWith('--' + k + '='));
  return hit ? hit.split('=').slice(1).join('=') : d;
};
const DEPTH = parseInt(arg('depth', '2'), 10);
const WANT = process.argv.includes('--all')
  ? ALL_TOOLS
  : (arg('tool', '') ? arg('tool', '').split(',') : []);

if (!WANT.length) {
  console.error('  usage: --tool=<name>[,<name>] or --all');
  process.exit(2);
}
const PREFIX = {};
for (const t of WANT) {
  const pfx = prefixOf(t);
  if (!pfx) { console.error(`  cannot resolve a class prefix for "${t}" — is mini tools/${t}.js there, and does it build a <pfx>-wrap?`); process.exit(2); }
  PREFIX[t] = pfx;
}

let PASS = 0, FAIL = 0, WARN = 0;
const ok = (m) => { PASS++; console.log('  ok    ' + m); };
const bad = (m) => { FAIL++; console.error('  FAIL  ' + m); };
const warn = (m) => { WARN++; console.log('  warn  ' + m); };
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const server = http.createServer((req, res) => {
  const clean = req.url.split('?')[0];
  /* the image library, so picture costumes are real images and not
     broken <img> tags that still satisfy "an img exists" */
  const f = clean.startsWith('/image-library-webp/')
    ? path.join('C:', 'Users', 'rkgen', 'lessoncraftstudio', 'frontend', 'public', clean)
    : path.join(MINI, path.basename(clean));
  fs.readFile(f, (e, b) => {
    if (e) { res.writeHead(404); res.end('404'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' });
    res.end(b);
  });
});

/* ---------- in-page helpers, injected once per document ---------- */
function pageBoot(state) {
  try { localStorage.clear(); } catch (_) {}
  if (state.token) { try { localStorage.setItem('accessToken', 'harness'); } catch (_) {} }

  window.__printed = 0;
  window.__spoken = [];
  window.print = function () { window.__printed++; };

  const install = () => {
    if (!window.LCSAudio) return false;
    window.LCSAudio.speak = function (o) { window.__spoken.push(o); };
    window.LCSAudio.cancel = function () {};
    window.LCSAudio._loadInventory = function () { return Promise.resolve({}); };
    return true;
  };
  if (!install()) {
    const iv = setInterval(() => { if (install()) clearInterval(iv); }, 10);
    setTimeout(() => clearInterval(iv), 4000);
  }

  /* a control's identity: its visible label plus which same-labelled one
     it is. Stable across a replay, and readable in a failure message. */
  window.__controls = function () {
    const out = [];
    const seen = {};
    document.querySelectorAll('.lcs-app button, .lcs-drawer button').forEach((b) => {
      if (b.disabled) return;
      const r = b.getBoundingClientRect();
      if (!r.width || !r.height) return;                      /* not on screen */
      const label = (b.textContent || b.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ');
      const key = label || '(unlabelled)';
      seen[key] = (seen[key] || 0) + 1;
      out.push({ label: key, nth: seen[key], cls: b.className || '' });
    });
    return out;
  };

  window.__clickControl = function (d) {
    let n = 0;
    const all = Array.from(document.querySelectorAll('.lcs-app button, .lcs-drawer button'));
    for (const b of all) {
      if (b.disabled) continue;
      const r = b.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const label = (b.textContent || b.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ') || '(unlabelled)';
      if (label !== d.label) continue;
      n++;
      if (n === d.nth) { b.click(); return true; }
    }
    return false;
  };

  /* ⚠ CLICK IS NOT THE ONLY VERB. A first cut clicked everything and
     called 137 controls dead across the siblings — nearly all of them
     number-balance's tray tiles and sorting-hoops' blocks, which are
     driven by POINTER DRAG for the mouse and by Enter/Space for the
     keyboard (number-balance.js:590, sorting-hoops.js:881). A click is
     simply the wrong verb for them, and reporting that as a dead button
     is the gate lying. So: if a click does nothing, try the control's
     ACCESSIBLE path before condemning it — which has the happy side
     effect of proving every such control is keyboard-reachable. */
  window.__keyControl = function (d) {
    let n = 0;
    for (const b of Array.from(document.querySelectorAll('.lcs-app button, .lcs-drawer button'))) {
      if (b.disabled) continue;
      const r = b.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const label = (b.textContent || b.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ') || '(unlabelled)';
      if (label !== d.label) continue;
      n++;
      if (n !== d.nth) continue;
      try { b.focus(); } catch (_) {}
      for (const key of ['Enter', ' ']) {
        b.dispatchEvent(new KeyboardEvent('keydown', { key: key, bubbles: true, cancelable: true }));
      }
      return true;
    }
    return false;
  };

  /* everything that counts as "the world changed".
     ⚠ ATTRIBUTES ARE PART OF IT. A first cut compared only tags, classes
     and text, and reported the shell's sound toggle as dead — it is not,
     it swaps an icon and flips aria-pressed, which a text-only signature
     cannot see. A toggle that signals itself through aria-pressed /
     aria-expanded / an icon swap is the normal shape of a toggle, so the
     signature has to read them or it slanders every one of them. */
  window.__world = function () {
    const app = document.querySelector('.lcs-app') || document.body;
    const ATTR = ['aria-pressed', 'aria-expanded', 'aria-checked', 'aria-hidden',
      'aria-label', 'disabled', 'hidden', 'open', 'value', 'style'];
    const dom = Array.from(app.querySelectorAll('*')).map((e) => {
      const t = Array.from(e.childNodes).filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.trim()).join(' ').trim();
      const a = ATTR.map((k) => e.hasAttribute && e.hasAttribute(k) ? k + '=' + e.getAttribute(k) : '').join(',');
      /* an icon swap is an innerHTML change with no text and no attribute
         change; its length is a cheap, stable proxy */
      const svg = e.tagName === 'BUTTON' ? ':' + e.innerHTML.length : '';
      return e.tagName + '.' + (e.className || '') + (t ? '#' + t : '') + '{' + a + '}' + svg
        + (e.tagName === 'INPUT' ? '=' + e.value : '');
    }).join('|');
    let store = '';
    try { store = JSON.stringify(localStorage); } catch (_) {}
    return { dom: dom, printed: window.__printed, spoken: window.__spoken.length, store: store };
  };
}

async function openPage(browser, tool, state) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1024, height: 900 });
  await page.setCacheEnabled(false);
  await page.setRequestInterception(true);
  page.on('request', (r) => r.url().includes('/api/auth/me')
    ? r.respond({
        status: 200, contentType: 'application/json',
        body: JSON.stringify(state.premium
          ? { user: { subscriptionTier: 'full' }, subscription: { status: 'active' } }
          : { user: { subscriptionTier: 'free' }, subscription: null })
      })
    : r.continue());
  await page.evaluateOnNewDocument(pageBoot, state);
  const errs = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|net::ERR/.test(m.text())) errs.push(m.text()); });
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(`http://127.0.0.1:${PORT}/${tool}.html?lang=en&embed=1`, { waitUntil: 'domcontentloaded' });
  await page.waitForSelector(`.${PREFIX[tool]}-wrap`, { timeout: 9000 });
  await wait(500);
  page._errs = errs;
  return page;
}

const changed = (a, b) => a.dom !== b.dom || a.printed !== b.printed
  || a.spoken !== b.spoken || a.store !== b.store;

async function replay(page, pathArr) {
  for (const d of pathArr) {
    const hit = await page.evaluate((x) => window.__clickControl(x), d);
    if (!hit) return false;
    await wait(260);
  }
  return true;
}

async function auditTool(browser, tool, state) {
  const pre = PREFIX[tool];
  console.log(`\n[${tool} · ${state.id}]`);
  const tested = new Set();
  /* queue of paths; the last element of each is the control under test */
  let queue = [];

  const seed = await openPage(browser, tool, state);
  (await seed.evaluate(() => window.__controls())).forEach((d) => queue.push([d]));
  await seed.close();

  /* label -> { acted, isTool, tries, example } for THIS state only */
  const verdict = new Map();
  const note = (label, isTool, acted, via, how) => {
    const v = verdict.get(label) || { acted: false, isTool: isTool, tries: 0, example: '', how: '' };
    v.tries++;
    v.isTool = v.isTool || isTool;
    if (acted) { v.acted = true; v.how = v.how || how; } else if (!v.example) v.example = via;
    verdict.set(label, v);
  };

  let depth = 1;
  while (queue.length && depth <= DEPTH) {
    const next = [];
    for (const p of queue) {
      const target = p[p.length - 1];
      const id = p.map((x) => x.label + '#' + x.nth).join(' > ');
      if (tested.has(id)) continue;
      /* ⚠ once a label has acted we have our answer, and re-testing it on
         every remaining path is pure cost: number-balance has 20 tray
         tiles, so depth-2 is 400 page loads to re-learn what the first
         one proved. The verdict aggregates per label, so stopping here
         changes no outcome — it only stops the gate taking half an hour,
         which is the difference between a gate that runs and one nobody
         waits for. */
      const known = verdict.get(target.label);
      if (known && known.acted) continue;
      tested.add(id);

      const page = await openPage(browser, tool, state);
      try {
        if (!(await replay(page, p.slice(0, -1)))) { await page.close(); continue; }
        const before = await page.evaluate(() => window.__world());
        const hit = await page.evaluate((x) => window.__clickControl(x), target);
        if (!hit) { await page.close(); continue; }
        await wait(420);
        let after = await page.evaluate(() => window.__world());
        let acted = changed(before, after);
        let how = 'click';
        /* the accessible path, for the drag-driven controls */
        if (!acted) {
          await page.evaluate((x) => window.__keyControl(x), target);
          await wait(380);
          after = await page.evaluate(() => window.__world());
          acted = changed(before, after);
          if (acted) how = 'keyboard';
        }

        const isTool = new RegExp('(^|\\s)' + pre + '-').test(target.cls);
        const where = p.length > 1 ? `via ${p.slice(0, -1).map((x) => x.label).join(' > ')}` : 'at rest';
        note(target.label, isTool, acted, where, how);

        if (p.length < DEPTH) {
          const now = await page.evaluate(() => window.__controls());
          now.forEach((d) => {
            const nid = p.concat([d]).map((x) => x.label + '#' + x.nth).join(' > ');
            /* ⚠ only stop exploring a label once it has ACTED. A first cut
               skipped any label already tried at depth 1, which made a
               whole class of control untestable: "Colours" only acts
               after you have switched to Shapes, so refusing to try it
               deeper guaranteed it looked dead forever. Depth is exactly
               how an idempotent control gets to a state where it bites. */
            const kn = verdict.get(d.label);
            if (!tested.has(nid) && !(kn && kn.acted)) next.push(p.concat([d]));
          });
        }
        if (page._errs.length) bad(`console error while clicking "${target.label}": ${page._errs[0]}`);
      } catch (e) {
        bad(`${target.label}: ${String(e).slice(0, 120)}`);
      }
      await page.close();
    }
    queue = next;
    depth++;
  }

  /* ---- the verdict, per control, for THIS entitlement state ---- */
  const labels = Array.from(verdict.keys()).sort();
  labels.forEach((label) => {
    const v = verdict.get(label);
    if (v.acted) {
      ok(`"${label}" acts by ${v.how} (${v.tries} path${v.tries > 1 ? 's' : ''} tried)`);
      return;
    }
    if (OFF_DOM.indexOf(label) > -1) { ok(`"${label}" exempt — effect is off-document`); return; }
    const msg = `"${label}" DOES NOTHING on any of ${v.tries} reachable path(s)`
      + ` — not by click, not by keyboard; no DOM change, no print, no speech, no storage [e.g. ${v.example}]`;
    if (v.isTool) bad(msg); else warn('shell control ' + msg);
  });
  console.log(`  — ${labels.length} distinct control(s), ${tested.size} path(s) exercised`);
}

(async () => {
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  PORT = server.address().port;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  for (const tool of WANT) for (const state of STATES) await auditTool(browser, tool, state);
  await browser.close();
  server.close();
  console.log('');
  console.log(`${PASS} passed, ${FAIL} failed, ${WARN} warned`);
  process.exit(FAIL ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
