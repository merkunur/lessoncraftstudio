#!/usr/bin/env node
/**
 * Visual + measured QA for /[locale]/workspace.
 *
 * The workspace sits behind an auth AND a subscription gate, so it cannot be
 * shot the way a public page can. This harness drives a real browser against a
 * local Next server with the auth handshake and all five data slices
 * intercepted, then MEASURES the rendered DOM rather than inspecting source.
 *
 * What it proves (each an assertion, not an eyeball):
 *   A. the surfaces are the intended hexes: the desk ground, and EVERY
 *      [data-workspace-card] is paper #FFFDF8 ("desk & cards" 2026-08-22 —
 *      the single sheet is gone; non-vacuity: >= 2 cards on the overview)
 *   B. NO text on the page computes to a teal fill — the standing rule is
 *      that teal #146B5E is interactive-only and never a text color.
 *      This is the assertion that would have caught the old six-opacity mush.
 *   C. zero terracotta (the fourth chromatic family) anywhere in the tree
 *   D. no horizontal overflow at any viewport
 *   E. every interactive control is >= 44px on its smaller axis (K-2 / touch)
 *   F. no two rendered boxes COLLIDE (the class that 141 single-box assertions
 *      could not see on a prior tool)
 *   G. the action hierarchy is real: ZERO filled controls per row at rest
 *      (Share is a ghost button that fills only on hover/focus), every row
 *      still carries >= 2 visible controls (nothing was hidden to get quiet),
 *      and the page has exactly ONE coral-filled control per view where the
 *      "+ New collection" CTA renders (overview, collections) and zero
 *      elsewhere
 *   H. the portaled dialogs (rename / delete-confirm) follow the same
 *      contract: paper card, no terracotta, no teal text, brick confirm —
 *      the overlay layer was invisible to root-scoped scans and shipped
 *      terracotta for two weeks
 *
 * Usage:  node scripts/visual-qa-workspace.js [--base=http://localhost:3000]
 *                                             [--locale=en] [--keep]
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const arg = (k, d) => {
  const hit = process.argv.find((a) => a.startsWith(`--${k}=`));
  return hit ? hit.slice(k.length + 3) : d;
};
const BASE = arg('base', 'http://localhost:3000');
const LOCALE = arg('locale', 'en');
const OUT = path.join(__dirname, '..', 'docs', 'audit-results', 'workspace', 'qa');

// QUICK=1 trims the sweep to one narrow + one wide viewport, overview only.
// Used by the poison matrix, which needs ~16 runs and would otherwise take
// half an hour. 360 is below the md breakpoint so the touch assertions still
// run; 1024 exercises the surface + desktop-density assertions.
const QUICK = process.env.QUICK === '1';
// 1920 is in the sweep because the OPERATOR VIEWS AT ~2000px. Gates that
// stopped at 1366 have shipped defects on this project before; a max-w
// container behaves differently against a very wide ground than a narrow one.
const VIEWPORTS = QUICK ? [360, 1024] : [320, 360, 412, 768, 1024, 1440, 1920];
const TABS = QUICK
  ? ['overview', 'worksheets']
  : ['overview', 'worksheets', 'activities', 'collections', 'favorites'];

/* ---------------------------------------------------------------- palette -- */
const DESK = 'rgb(221, 212, 194)'; // #DDD4C2 — warm stone (2026-08-22)
const CARD = 'rgb(255, 253, 248)'; // #FFFDF8 — every [data-workspace-card]
const WELL = 'rgb(245, 241, 230)'; // #F5F1E6
const BRICK = 'rgb(179, 57, 43)'; // #B3392B — destruction only
const CORAL = 'rgb(242, 120, 75)'; // #F2784B — the ONE filled CTA per view
// Teal as a TEXT fill is the defect. Any alpha of it, at any opacity.
const TEAL_RE = /^rgba?\(20,\s*107,\s*94/;

/* ------------------------------------------------------------- mock state -- */
const iso = (daysAgo) =>
  new Date(Date.UTC(2026, 7, 7) - daysAgo * 86400000).toISOString();

const USER = {
  id: 'qa-user',
  email: 'qa@lcs.internal',
  firstName: 'QA',
  emailVerified: true,
  subscriptionTier: 'full',
  isAdmin: false,
  language: LOCALE,
  subscription: {
    id: 'sub-qa',
    planName: 'Teacher',
    status: 'active',
    currentPeriodStart: iso(30),
    currentPeriodEnd: iso(-335),
    cancelAtPeriodEnd: false,
    lsSubscriptionId: 'ls-qa-1',
  },
};

const hosted = (n) =>
  Array.from({ length: n }, (_, i) => ({
    id: `hw-${i}`,
    linkId: `lnk${i}`,
    appId: ['addition', 'wordsearch', 'crossword', 'sudoku', 'matching'][i % 5],
    title: `Addition Practice — Set ${i + 1}`,
    locale: LOCALE,
    viewCount: (i * 7) % 40,
    updatedAt: iso(i * 3),
    url: `${BASE}/play/lnk${i}`,
    qrUrl: `${BASE}/api/qr/lnk${i}`,
  }));

const shares = (n) =>
  Array.from({ length: n }, (_, i) => ({
    id: `sa-${i}`,
    linkId: `slnk${i}`,
    activityId: `act-${i}`,
    title: `Ten Frame Count ${i + 1}`,
    locale: ['en', 'de', 'es'][i % 3],
    viewCount: (i * 5) % 30,
    updatedAt: iso(i * 4),
    url: `${BASE}/play/slnk${i}`,
    qrUrl: `${BASE}/api/qr/slnk${i}`,
    activitySlug: `ten-frame-${i}`,
  }));

const collections = (n) =>
  Array.from({ length: n }, (_, i) => ({
    id: `col-${i}`,
    name: ['Addition', 'Animals', 'Week 3 — shapes', 'Phonics warm-ups'][i % 4],
    description:
      i % 3 === 0
        ? null
        : 'Decks I use for the Monday morning carpet session, in order.',
    // exercises the rail: 0 (empty CTA), small, exactly 5, and over 5
    deckCount: [0, 3, 5, 12][i % 4],
    createdAt: iso(40 + i),
    updatedAt: iso(i * 2),
  }));

const favorites = (n) =>
  Array.from({ length: n }, (_, i) => ({
    deckId: `d-${i}`,
    slug: `deck-${i}`,
    language: LOCALE,
    title: { [LOCALE]: `Counting to Ten — Farm Animals ${i + 1}`, en: `Counting ${i}` },
    favoritedAt: iso(i),
    url: `${BASE}/${LOCALE}/decks/deck-${i}/`,
  }));

const RECENT = [
  { type: 'collected', when: iso(0), deckTitle: { en: 'Alphabet Train' }, deckLanguage: 'en', deckSlug: 'alphabet-train', collectionId: 'col-0', collectionName: 'Addition' },
  { type: 'modified', when: iso(2), collectionId: 'col-1', collectionName: 'Animals' },
  { type: 'shared', when: iso(9), deckTitle: { en: 'More or Less Practice' }, deckLanguage: 'en', deckSlug: 'more-or-less' },
  { type: 'collected', when: iso(35), deckTitle: { en: 'Shadow Match' }, deckLanguage: 'en', deckSlug: 'shadow-match', collectionId: 'col-2', collectionName: 'Week 3 — shapes' },
  { type: 'modified', when: iso(120), collectionId: 'col-3', collectionName: 'Phonics warm-ups' },
];

/** The scenarios. `empty` proves the empty states; `full` is the real page. */
const SCENARIOS = {
  full: {
    '/api/worksheets/hosted': { worksheets: hosted(9), quota: { count: 9, maxCount: 10, totalBytes: 1, maxTotalBytes: 9 } },
    '/api/activities/share': { shares: shares(6), limit: { count: 6, maxCount: 25 } },
    '/api/collections': { collections: collections(7) },
    '/api/favorites': { favorites: favorites(5) },
    '/api/workspace': { recentActivity: RECENT },
  },
  empty: {
    '/api/worksheets/hosted': { worksheets: [], quota: { count: 0, maxCount: 10, totalBytes: 0, maxTotalBytes: 9 } },
    '/api/activities/share': { shares: [], limit: { count: 0, maxCount: 25 } },
    '/api/collections': { collections: [] },
    '/api/favorites': { favorites: [] },
    '/api/workspace': { recentActivity: [] },
  },
};

/* ------------------------------------------------------------- assertions -- */
const results = [];
let pass = 0;
let fail = 0;
function check(ok, label, detail) {
  results.push({ ok, label, detail });
  if (ok) pass++;
  else {
    fail++;
    console.log(`  FAIL  ${label}${detail ? ` — ${detail}` : ''}`);
  }
}

async function install(page, scenario) {
  await page.setRequestInterception(true);
  page.removeAllListeners('request');
  page.on('request', (req) => {
    const u = new URL(req.url(), BASE);
    if (u.origin !== new URL(BASE).origin) {
      // No external fonts/analytics in a measurement run.
      return req.respond({ status: 200, body: '' });
    }
    if (u.pathname === '/api/auth/me') {
      return req.respond({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ user: USER, subscription: USER.subscription }),
      });
    }
    const hit = SCENARIOS[scenario][u.pathname];
    if (hit) {
      return req.respond({ status: 200, contentType: 'application/json', body: JSON.stringify(hit) });
    }
    if (u.pathname.startsWith('/api/')) {
      return req.respond({ status: 200, contentType: 'application/json', body: '{}' });
    }
    req.continue();
  });
}

async function seed(page) {
  await page.evaluateOnNewDocument(
    (u, audit) => {
      localStorage.setItem('accessToken', 'qa-token');
      localStorage.setItem('user', JSON.stringify(u));
      window.__QA_NO_SCROLLER_EXCLUSION = audit;
    },
    USER,
    process.env.AUDIT === '1'
  );
}

/**
 * Everything the page can tell us, measured in one pass.
 *
 * SCOPED to [data-workspace-root]. The first version queried the whole
 * document and dutifully reported the SITE HEADER's controls — "Toggle menu"
 * 40x40, the locale switcher, the header search input — as workspace defects.
 * Three confident FAILs against code that was not mine and not on trial. The
 * rule this cost: verify WHAT the selector matched before believing the number.
 */
async function measure(page, vw) {
  return page.evaluate(
    (TEAL_SRC, VW) => {
      const tealRe = new RegExp(TEAL_SRC);
      const root = document.querySelector('[data-workspace-root]');
      if (!root) return { fatal: 'no [data-workspace-root] on the page' };
      const out = {
        tealText: [],
        terracotta: [],
        smallTargets: [],
        collisions: [],
        overflow: 0,
        overflowing: [],
        surfaces: {},
        filledPerRow: [],
        ctrlsPerRow: [],
        rowCount: 0,
        coralControls: 0,
        bodyScrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      };

      const vis = (el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none' && cs.opacity !== '0';
      };
      const hasOwnText = (el) =>
        Array.from(el.childNodes).some((n) => n.nodeType === 3 && n.textContent.trim().length > 0);

      // --- B: teal must never be a TEXT fill -------------------------------
      for (const el of root.querySelectorAll('*')) {
        if (!hasOwnText(el) || !vis(el)) continue;
        const c = getComputedStyle(el).color;
        if (tealRe.test(c)) {
          // Interactive nodes are allowed teal; static copy is not.
          const interactive = el.closest('a,button,[role="menuitem"],label,input,summary');
          if (!interactive) {
            out.tealText.push({ tag: el.tagName, cls: el.className.toString().slice(0, 60), text: el.textContent.trim().slice(0, 40), color: c });
          }
        }
      }

      // --- C: terracotta is deleted from this surface -----------------------
      for (const el of root.querySelectorAll('*')) {
        const cls = el.className && el.className.toString ? el.className.toString() : '';
        if (/terracotta/.test(cls)) out.terracotta.push(cls.slice(0, 80));
      }

      // --- A: the surfaces --------------------------------------------------
      // Cards are addressed by their OWN attribute, not by walking up from the
      // tab nav — the tabs sit on the desk now, so "the nav's parent" would
      // silently measure the transparent shell wrapper (a false-pass shape).
      out.surfaces.ground = getComputedStyle(root).backgroundColor;
      out.surfaces.cards = Array.from(root.querySelectorAll('[data-workspace-card]')).map(
        (c) => getComputedStyle(c).backgroundColor
      );

      // --- E: tap targets ---------------------------------------------------
      // The 44px floor is a TOUCH guideline, so it is asserted below md (768)
      // where a finger is the pointer; desktop deliberately runs 36px list
      // density. Inline links inside flowing copy are excluded — they are text,
      // not controls, and demanding 44px of them is how a correct page gets
      // condemned.
      if (VW < 768) {
        for (const el of root.querySelectorAll('a,button,input,select,textarea,[role="menuitem"]')) {
          if (!vis(el)) continue;
          const cs = getComputedStyle(el);
          if (cs.display === 'inline') continue;
          const r = el.getBoundingClientRect();
          const text = (el.textContent || '').trim();
          // Height always; width only for icon-only controls (a text control's
          // width is content-driven and a narrow label is not a defect).
          const tooShort = r.height < 44;
          const tooNarrow = text.length === 0 && r.width < 44;
          if (tooShort || tooNarrow) {
            out.smallTargets.push({ tag: el.tagName, cls: el.className.toString().slice(0, 50), text: (text || el.getAttribute('aria-label') || '').slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) });
          }
        }
      }

      // --- D: overflow ------------------------------------------------------
      // An element inside a deliberately scrollable ancestor (the tab strip is
      // overflow-x-auto by design, so five Finnish labels scroll rather than
      // wrap) is NOT overflowing the page — it is inside its own scroller.
      // Report what overflowed, so a count is never taken on trust.
      // AUDIT=1 disables the exclusion so you can SEE what it was excluding.
      // Added because the exclusion and the reporting landed in the same edit,
      // which meant the failures disappeared without the evidence ever being
      // looked at — indistinguishable from switching the gate off.
      const inScroller = (el) => {
        if (window.__QA_NO_SCROLLER_EXCLUSION) return false;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          const ox = getComputedStyle(p).overflowX;
          if (ox === 'auto' || ox === 'scroll') return true;
        }
        return false;
      };
      for (const el of root.querySelectorAll('*')) {
        if (!vis(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.right > document.documentElement.clientWidth + 1 && !inScroller(el)) {
          out.overflow++;
          if (out.overflowing.length < 5) {
            out.overflowing.push(
              `${el.tagName}.${el.className.toString().slice(0, 30)}:${(el.textContent || '').trim().slice(0, 24)}@right=${Math.round(r.right)}`
            );
          }
        }
      }

      // --- F: collisions between rendered boxes ----------------------------
      // Only leaf-ish text/control nodes, only siblings-in-spirit: a parent
      // legitimately contains its child, so compare non-ancestor pairs.
      const boxes = Array.from(root.querySelectorAll('p, h1, h2, h3, span, time, button, a'))
        .filter((el) => vis(el) && (hasOwnText(el) || el.tagName === 'BUTTON'))
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter((b) => b.r.width > 4 && b.r.height > 4);
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i];
          const b = boxes[j];
          if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
          const ov =
            Math.max(0, Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left)) *
            Math.max(0, Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top));
          // Tolerate a hairline of antialiasing overlap.
          if (ov > 12) {
            out.collisions.push({
              a: `${a.el.tagName}.${a.el.className.toString().slice(0, 24)}:${(a.el.textContent || '').trim().slice(0, 20)}`,
              b: `${b.el.tagName}.${b.el.className.toString().slice(0, 24)}:${(b.el.textContent || '').trim().slice(0, 20)}`,
              area: Math.round(ov),
            });
          }
        }
      }

      // --- G: quiet-at-rest action hierarchy --------------------------------
      // "Filled" = a solid non-transparent background that is not the paper
      // card. Rows must have ZERO at rest (Share is a ghost) but still >= 2
      // visible controls — quietness must not be achieved by hiding anything.
      const isFilled = (c) => {
        const bg = getComputedStyle(c).backgroundColor;
        const m = bg.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?/);
        if (!m) return false;
        const alpha = m[4] === undefined ? 1 : parseFloat(m[4]);
        if (alpha < 0.5) return false;
        const [r, g, b] = [+m[1], +m[2], +m[3]];
        return !(r > 240 && g > 240 && b > 235); // not the paper card
      };
      for (const li of root.querySelectorAll('ul li.group')) {
        const ctrls = Array.from(li.querySelectorAll('button,a')).filter(vis);
        out.rowCount++;
        out.ctrlsPerRow.push(ctrls.length);
        out.filledPerRow.push(ctrls.filter(isFilled).length);
      }

      // The ONE coral-filled control per view (the "+ New collection" CTA on
      // views that render the collections section; zero everywhere else).
      for (const c of root.querySelectorAll('button,a')) {
        if (!vis(c)) continue;
        if (getComputedStyle(c).backgroundColor === 'rgb(242, 120, 75)') out.coralControls++;
      }

      return out;
    },
    TEAL_RE.source,
    vw
  );
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--font-render-hinting=none'] });

  console.log(`\nvisual-qa-workspace  base=${BASE}  locale=${LOCALE}\n`);

  for (const scenario of QUICK ? ['full'] : ['full', 'empty']) {
    for (const tab of scenario === 'full' ? TABS : ['overview']) {
      for (const w of VIEWPORTS) {
        const page = await browser.newPage();
        await page.setViewport({ width: w, height: 1000, deviceScaleFactor: 1 });
        await seed(page);
        await install(page, scenario);
        await page.goto(`${BASE}/${LOCALE}/workspace`, { waitUntil: 'networkidle0', timeout: 60000 });

        // Wait for the panel (i.e. past both gates and the first slice paint).
        await page
          .waitForFunction(() => !!document.querySelector('nav[aria-label]') || !!document.querySelector('main h1'), { timeout: 20000 })
          .catch(() => {});

        if (tab !== 'overview') {
          const clicked = await page.evaluate((t) => {
            // Scope to the WORKSPACE's own tab nav. `document.querySelectorAll
            // ('nav button')` also matched the SITE header's nav, so index 1
            // was a site-nav button — the click navigated away and destroyed
            // the execution context, which read as a harness crash rather than
            // as the selector fault it was. Reaching by index is right; reaching
            // by index into the wrong collection is not.
            const root = document.querySelector('[data-workspace-root]');
            const nav = root && root.querySelector('nav[aria-label]');
            if (!nav) return false;
            const btns = Array.from(nav.querySelectorAll('button'));
            const order = ['overview', 'worksheets', 'activities', 'collections', 'favorites'];
            const el = btns[order.indexOf(t)];
            if (!el) return false;
            el.click();
            return true;
          }, tab);
          if (!clicked) {
            check(false, `${scenario}/${tab}@${w} tab reachable`, 'tab button not found');
            await page.close();
            continue;
          }
          await new Promise((r) => setTimeout(r, 350));
        }

        // POISON=<name> injects one synthetic defect before measuring, so each
        // assertion can be shown to FAIL on a broken page. An assertion that
        // has only ever been observed passing is not known to be capable of
        // failing — see scripts/visual-qa-workspace.poison.md for the matrix.
        if (process.env.POISON) {
          await page.evaluate((kind) => {
            const root = document.querySelector('[data-workspace-root]');
            const card = root.querySelector('[data-workspace-card]');
            const mk = (css, text) => {
              const d = document.createElement('p');
              d.style.cssText = css;
              d.textContent = text;
              (card || root).appendChild(d);
              return d;
            };
            if (kind === 'teal-text') mk('color: rgb(20,107,94)', 'poisoned teal body copy');
            if (kind === 'teal-text-alpha') mk('color: rgba(20,107,94,0.6)', 'poisoned teal at 60%');
            if (kind === 'terracotta') mk('', 'x').className = 'text-terracotta-500';
            if (kind === 'tiny-target') {
              const b = document.createElement('button');
              b.style.cssText = 'display:block;height:20px;width:20px';
              b.setAttribute('aria-label', 'poisoned tiny control');
              (card || root).appendChild(b);
            }
            if (kind === 'collision') {
              const a = mk('position:absolute;top:200px;left:40px;width:120px;height:40px', 'AAAA');
              mk('position:absolute;top:210px;left:60px;width:120px;height:40px', 'BBBB');
              a.style.zIndex = '5';
            }
            if (kind === 'overflow') mk('position:relative;left:0;width:4000px', 'wide');
            // Violates the NEW row truth (zero filled controls at rest): a
            // solid-filled button injected into a row.
            if (kind === 'two-filled') {
              const li = root.querySelector('ul li.group');
              if (li) {
                const b = document.createElement('button');
                b.style.cssText = 'background:rgb(20,107,94);height:44px;width:60px';
                b.textContent = 'X';
                li.appendChild(b);
              }
            }
            // Violates the one-coral-CTA-per-view rule.
            if (kind === 'extra-coral') {
              const b = document.createElement('button');
              b.style.cssText = 'background:rgb(242,120,75);height:44px;width:80px';
              b.textContent = 'X';
              (card || root).appendChild(b);
            }
            if (kind === 'wrong-panel-bg' && card) card.style.background = 'rgb(255,0,0)';
          }, process.env.POISON);
          await new Promise((r) => setTimeout(r, 80));
        }

        const m = await measure(page, w);
        const id = `${scenario}-${tab}-${w}`;

        if (m.fatal) {
          check(false, `${id} measurable`, m.fatal);
          await page.close();
          continue;
        }

        check(m.tealText.length === 0, `${id} no teal TEXT fill`, m.tealText.slice(0, 3).map((t) => `${t.tag}"${t.text}"`).join(' | '));
        check(m.terracotta.length === 0, `${id} no terracotta`, m.terracotta.slice(0, 2).join(' | '));
        check(m.bodyScrollW <= m.clientW + 1, `${id} no page h-scroll`, `scrollW=${m.bodyScrollW} clientW=${m.clientW}`);
        check(m.overflow === 0, `${id} no element overflow`, `${m.overflow} past the right edge: ${m.overflowing.join(' | ')}`);
        check(m.smallTargets.length === 0, `${id} tap targets >= 44px`, m.smallTargets.slice(0, 3).map((t) => `${t.tag}"${t.text}"=${t.w}x${t.h}`).join(' | '));
        check(m.collisions.length === 0, `${id} no box collisions`, m.collisions.slice(0, 2).map((c) => `${c.a} X ${c.b} (${c.area}px2)`).join(' | '));

        if (scenario === 'full' && (tab === 'worksheets' || tab === 'activities')) {
          const filledBad = m.filledPerRow.filter((n) => n !== 0).length;
          const thinBad = m.ctrlsPerRow.filter((n) => n < 2).length;
          check(m.rowCount > 0, `${id} rows rendered`, `rowCount=${m.rowCount}`);
          check(filledBad === 0, `${id} ZERO filled controls per row at rest`, `rows with >0: ${filledBad} of ${m.rowCount} (${m.filledPerRow.join(',')})`);
          check(thinBad === 0, `${id} every row keeps >= 2 visible controls`, `rows with <2: ${thinBad} (${m.ctrlsPerRow.join(',')})`);
        }

        // The ONE coral CTA: present exactly once on views that render the
        // collections section — including the empty overview, where the
        // first-run empty-preview cards render and "+ New collection" is the
        // page's invitation to act — zero elsewhere.
        {
          const wantCoral = tab === 'overview' || tab === 'collections' ? 1 : 0;
          check(
            m.coralControls === wantCoral,
            `${id} exactly ${wantCoral} coral-filled control(s)`,
            `got ${m.coralControls}`
          );
        }

        if (w === 1024 && tab === 'overview') {
          check(m.surfaces.ground === DESK, `${id} ground is desk #DDD4C2`, `got ${m.surfaces.ground}`);
          // Non-vacuity first: a selector matching nothing must FAIL, not
          // certify (the querySelectorAll-compared-two-empty-NodeLists trap).
          check(
            m.surfaces.cards.length >= 2,
            `${id} >= 2 cards rendered (non-vacuous)`,
            `got ${m.surfaces.cards.length}`
          );
          check(
            m.surfaces.cards.every((c) => c === CARD),
            `${id} every card is paper #FFFDF8`,
            `got ${[...new Set(m.surfaces.cards)].join(' | ')}`
          );
        }

        if ([360, 768, 1024, 1440, 1920].includes(w)) {
          await page.screenshot({ path: path.join(OUT, `${id}.png`), fullPage: true });
        }
        await page.close();
      }
    }
  }

  /* ------------------------------------------------------ interaction ----- */
  // Screenshots cannot show that a control DOES anything, and the shared
  // liveness idiom ("did the DOM change?") scores a control green when its only
  // effect is its own highlight. These assert CONSEQUENCE: the menu opens, its
  // items actually raise the rename/delete dialogs, and Escape closes it.
  if (!QUICK) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 1000 });
    await seed(page);
    await install(page, 'full');
    await page.goto(`${BASE}/${LOCALE}/workspace`, { waitUntil: 'networkidle0', timeout: 60000 });
    await page.evaluate(() => {
      const root = document.querySelector('[data-workspace-root]');
      root.querySelector('nav[aria-label] button:nth-child(2)').click();
    });
    await new Promise((r) => setTimeout(r, 400));

    const trigger = '[data-workspace-root] ul li.group button[aria-haspopup="menu"]';
    const t0 = await page.$(trigger);
    check(!!t0, 'interaction: overflow trigger exists');

    if (t0) {
      // 1. opens
      await t0.click();
      await new Promise((r) => setTimeout(r, 200));
      const items = await page.$$eval('[role="menu"] [role="menuitem"]', (els) => els.map((e) => e.textContent.trim()));
      check(items.length === 2, 'interaction: menu opens with 2 items', `got ${items.length}: ${items.join(',')}`);

      // 2. the DESTRUCTIVE item is brick, and it is the only red thing
      const delColor = await page.$$eval('[role="menu"] [role="menuitem"]', (els) => getComputedStyle(els[els.length - 1]).color);
      check(delColor === 'rgb(179, 57, 43)', 'interaction: delete item is brick #B3392B', `got ${delColor}`);

      // 3. Escape closes and focus returns to the trigger
      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 150));
      const closed = await page.$('[role="menu"]');
      check(!closed, 'interaction: Escape closes the menu');
      const refocused = await page.evaluate(() => document.activeElement?.getAttribute('aria-haspopup') === 'menu');
      check(refocused, 'interaction: Escape returns focus to the trigger');

      // 4. CONSEQUENCE — Rename raises the rename dialog
      await page.click(trigger);
      await new Promise((r) => setTimeout(r, 200));
      // POISON=menu-inert replaces each item with a listener-less clone (React
      // dispatches via the fiber tree, so a cloned node is dead). If the
      // consequence checks still pass against inert items, they are vacuous.
      if (process.env.POISON === 'menu-inert') {
        await page.evaluate(() => {
          document.querySelectorAll('[role="menu"] [role="menuitem"]').forEach((el) => {
            el.replaceWith(el.cloneNode(true));
          });
        });
      }
      await page.evaluate(() => document.querySelectorAll('[role="menu"] [role="menuitem"]')[0].click());
      await new Promise((r) => setTimeout(r, 300));
      const dlg = await page.$$eval('[role="dialog"]', (els) => els.length);
      check(dlg > 0, 'interaction: Rename opens a dialog', `dialogs=${dlg}`);
      const hasInput = await page.$('[role="dialog"] input');
      check(!!hasInput, 'interaction: rename dialog carries a text field');

      // H. The dialogs portal to <body> — OUTSIDE [data-workspace-root] — so
      // the root-scoped assertions B/C/A never see them. That blind spot is
      // exactly how the overlay layer stayed on terracotta + teal-text for two
      // weeks after the in-page surface migrated. Assert the same contract
      // inside the open dialog.
      if (process.env.POISON === 'dialog-terracotta') {
        await page.evaluate(() => {
          const d = document.querySelector('[role="dialog"]');
          if (d && d.firstElementChild) {
            const p = document.createElement('p');
            p.className = 'text-terracotta-500';
            p.textContent = 'x';
            d.firstElementChild.appendChild(p);
          }
        });
      }
      if (process.env.POISON === 'dialog-teal-text') {
        await page.evaluate(() => {
          const d = document.querySelector('[role="dialog"]');
          if (d && d.firstElementChild) {
            const p = document.createElement('p');
            p.style.color = 'rgb(20,107,94)';
            p.textContent = 'poisoned teal dialog copy';
            d.firstElementChild.appendChild(p);
          }
        });
      }
      const dlgM = await page.evaluate((TEAL_SRC) => {
        const tealRe = new RegExp(TEAL_SRC);
        const d = document.querySelector('[role="dialog"]');
        if (!d) return null;
        const cardEl = d.firstElementChild;
        const out = {
          bg: cardEl ? getComputedStyle(cardEl).backgroundColor : null,
          terra: 0,
          teal: [],
        };
        for (const el of d.querySelectorAll('*')) {
          const cls = el.className && el.className.toString ? el.className.toString() : '';
          if (/terracotta/.test(cls)) out.terra++;
          const hasOwnText = Array.from(el.childNodes).some(
            (n) => n.nodeType === 3 && n.textContent.trim().length > 0
          );
          if (hasOwnText && tealRe.test(getComputedStyle(el).color)) {
            if (!el.closest('a,button,[role="menuitem"],label,input')) {
              out.teal.push(el.textContent.trim().slice(0, 30));
            }
          }
        }
        return out;
      }, TEAL_RE.source);
      check(!!dlgM, 'dialog: rename dialog measurable');
      if (dlgM) {
        check(dlgM.bg === CARD, 'dialog: card is paper #FFFDF8', `got ${dlgM.bg}`);
        check(dlgM.terra === 0, 'dialog: no terracotta class', `${dlgM.terra} node(s)`);
        check(dlgM.teal.length === 0, 'dialog: no teal text fill', dlgM.teal.join(' | '));
      }

      await page.keyboard.press('Escape');
      await new Promise((r) => setTimeout(r, 250));

      // 5. CONSEQUENCE — Delete raises the confirm dialog
      await page.click(trigger);
      await new Promise((r) => setTimeout(r, 200));
      await page.evaluate(() => {
        const it = document.querySelectorAll('[role="menu"] [role="menuitem"]');
        it[it.length - 1].click();
      });
      await new Promise((r) => setTimeout(r, 300));
      const dlg2 = await page.$$eval('[role="dialog"]', (els) => els.length);
      check(dlg2 > 0, 'interaction: Delete opens a confirm dialog', `dialogs=${dlg2}`);

      // H. The confirm dialog's destructive button is BRICK — never coral (a
      // delete must not look like the page's call to action) and never the
      // banned terracotta.
      if (process.env.POISON === 'dialog-confirm-not-brick') {
        await page.evaluate(() => {
          const d = document.querySelector('[role="dialog"]');
          const btns = d ? d.querySelectorAll('button') : [];
          if (btns.length) {
            // transition:none first — the button has transition-all, and a
            // computed read milliseconds after an inline background change
            // reports the STILL-TRANSITIONING (near-brick) value, which let
            // this poison survive its first run.
            btns[btns.length - 1].style.transition = 'none';
            btns[btns.length - 1].style.background = 'rgb(242,120,75)';
          }
        });
      }
      const confirmBg = await page.evaluate(() => {
        const d = document.querySelector('[role="dialog"]');
        if (!d) return null;
        const btns = d.querySelectorAll('button');
        return btns.length ? getComputedStyle(btns[btns.length - 1]).backgroundColor : null;
      });
      check(confirmBg === BRICK, 'dialog: confirm button is brick #B3392B', `got ${confirmBg}`);
    }
    await page.close();
  }

  await browser.close();

  console.log(`\n${pass} passed, ${fail} failed`);
  console.log(`screenshots -> ${OUT}`);
  process.exit(fail ? 1 : 0);
})().catch((e) => {
  console.error('HARNESS CRASHED:', e);
  process.exit(2);
});
