/**
 * Room exhibit-row gate — alignment, label evenness, collisions.
 *
 * The operator hit a defect nothing measured: the museum labels in Room I
 * overlapped each other and their neighbouring exhibits, so two captions were
 * unreadable. Every existing gate passed — `audit-homepage-responsive.js`
 * checks that elements stay inside the VIEWPORT, which says nothing about two
 * elements sitting on top of each other, and the census gates only count
 * nodes.
 *
 * ⚠ MEASURED FIRST, AND IT CORRECTED ME. I assumed from the screenshot that
 * the labels were overlapping. They are not — they tile their columns exactly
 * (x = 125 / 410 / 695 / 980 at 1366). The real defect is ALIGNMENT: the label
 * text runs 2, 3, 5 and 2 lines because it was fed each tool's full-sentence
 * tagline, so with `align-items: end` the four cells are different heights and
 * the four exhibits and their four labels each sit at a different top. That is
 * the raggedness, and no gate saw it.
 *
 * So this asserts, in priority order:
 *   1. every exhibit shares one baseline, and every label shares one top;
 *   2. label heights do not vary wildly (the sentence-as-label root cause);
 *   3. no two labels overlap, and none overlaps a neighbouring exhibit
 *      (cheap, and it catches a regression even though it is clean today);
 *   4. no label overflows its own column;
 *   5. every label is rendered and non-empty;
 *   6. the touchable exhibit is not an enormous slab.
 *
 * Usage:
 *   node scripts/audit-room-labels.js --base=http://localhost:3000 \
 *     [--path=/en] [--label=.hv10-stand-plaque] [--art=.hv10-stand-art] \
 *     [--cell=.hv10-stand] [--widths=320,412,768,1024,1366,1920,2560]
 *
 * Exit 1 on any collision. Run it against a build you KNOW is broken first —
 * a gate that has only ever passed has proved nothing.
 */
const puppeteer = require('puppeteer');

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)(?:=(.*))?$/);
    return m ? [m[1], m[2] ?? true] : [a, true];
  }),
);
const BASE = args.base || 'http://localhost:3000';
const PATHNAME = args.path || '/en';
const LABEL = args.label || '.hv10-stand-plaque';
const ART = args.art || '.hv10-stand-art';
const CELL = args.cell || '.hv10-stand';
const WIDTHS = String(args.widths || '320,412,768,1024,1366,1920,2560')
  .split(',')
  .map(Number);
/* Sub-pixel touching is not a collision; anything a reader would notice is. */
const TOL = 1.5;

(async () => {
  console.log(`Room-label collisions — ${BASE}${PATHNAME}  labels ${LABEL}`);
  const browser = await puppeteer.launch({ headless: 'new' });
  let failed = false;
  let sawAny = false;

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    page.on('request', (r) => (/favicon/.test(r.url()) ? r.abort() : r.continue()));
    await page.setViewport({ width, height: 1000 });
    await page.goto(BASE + PATHNAME, { waitUntil: 'networkidle2', timeout: 120000 });
    // scroll through so lazy exhibits lay out before measuring
    await page.evaluate(async () => {
      await new Promise((res) => {
        let y = 0;
        const s = () => {
          y += 700;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(s, 60);
          else {
            window.scrollTo(0, 0);
            setTimeout(res, 400);
          }
        };
        s();
      });
    });

    const m = await page.evaluate(
      (labelSel, artSel, cellSel, tol) => {
        const vis = (el) => {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || cs.opacity === '0') return false;
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0;
        };
        const overlap = (a, b) => {
          const dx = Math.min(a.right, b.right) - Math.max(a.left, b.left);
          const dy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
          return dx > tol && dy > tol ? { dx: +dx.toFixed(1), dy: +dy.toFixed(1) } : null;
        };
        const labels = [...document.querySelectorAll(labelSel)].filter(vis);
        const arts = [...document.querySelectorAll(artSel)].filter(vis);
        const problems = [];

        // 1. ONE BASELINE PER ROW. This is the defect the operator saw.
        //    ⚠ Group into rows first: at narrow widths the grid collapses to a
        //    single column, where different tops are CORRECT. Comparing every
        //    exhibit to every other made this fire at 320 and 412 on a layout
        //    that was behaving exactly as intended — an over-firing gate is as
        //    useless as a blind one.
        const rowsOf = (els) => {
          const out = [];
          els
            .map((e) => ({ e, r: e.getBoundingClientRect() }))
            .sort((a, b) => a.r.top - b.r.top)
            .forEach((it) => {
              const row = out.find((g) => {
                const ov = Math.min(g.bottom, it.r.bottom) - Math.max(g.top, it.r.top);
                return ov > Math.min(g.bottom - g.top, it.r.height) * 0.5;
              });
              if (row) {
                row.items.push(it);
                row.top = Math.min(row.top, it.r.top);
                row.bottom = Math.max(row.bottom, it.r.bottom);
              } else out.push({ top: it.r.top, bottom: it.r.bottom, items: [it] });
            });
          return out.filter((g) => g.items.length > 1);
        };
        const spreadIn = (row, edge) => {
          const v = row.items.map((i) => i.r[edge]);
          return Math.max(...v) - Math.min(...v);
        };
        rowsOf(arts).forEach((row, n) => {
          const t = spreadIn(row, 'top');
          const b = spreadIn(row, 'bottom');
          if (t > 2 && b > 2)
            problems.push(`row ${n}: ${row.items.length} exhibits share no baseline (tops spread ${t.toFixed(0)}px, bottoms ${b.toFixed(0)}px)`);
        });
        rowsOf(labels).forEach((row, n) => {
          const t = spreadIn(row, 'top');
          if (t > 2) problems.push(`row ${n}: labels sit at ${t.toFixed(0)}px different heights`);
        });

        // 2. Label heights must not vary wildly — a 2-line label beside a
        //    5-line one is what dragged the whole row out of alignment.
        if (labels.length > 1) {
          const hs = labels.map((l) => l.getBoundingClientRect().height);
          const ratio = Math.max(...hs) / Math.max(1, Math.min(...hs));
          if (ratio > 1.6) problems.push(`label heights vary ${ratio.toFixed(1)}x (tallest ${Math.max(...hs).toFixed(0)}px vs ${Math.min(...hs).toFixed(0)}px)`);
        }

        for (let i = 0; i < labels.length; i++) {
          const li = labels[i];
          const ri = li.getBoundingClientRect();
          const text = (li.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 28);
          if (!text) problems.push(`label ${i} is EMPTY`);

          // 3. label vs label
          for (let j = i + 1; j < labels.length; j++) {
            const o = overlap(ri, labels[j].getBoundingClientRect());
            if (o) problems.push(`label "${text}" overlaps label ${j} by ${o.dx}x${o.dy}px`);
          }
          //    label vs an exhibit that is not its own
          const ownCell = li.closest(cellSel);
          for (const art of arts) {
            if (ownCell && ownCell.contains(art)) continue;
            const o = overlap(ri, art.getBoundingClientRect());
            if (o) problems.push(`label "${text}" overlaps a NEIGHBOURING exhibit by ${o.dx}x${o.dy}px`);
          }
          //    label spilling out of its own column
          if (ownCell) {
            const rc = ownCell.getBoundingClientRect();
            const spill = Math.max(rc.left - ri.left, ri.right - rc.right);
            if (spill > tol) problems.push(`label "${text}" spills ${spill.toFixed(1)}px out of its column`);
          }
        }
        // 5b. CLIPPED EXHIBITS. A niche with overflow:hidden hides its own
        //     defect: an exhibit wider than its box is simply cut, and every
        //     rect-based check still passes because the box is the right size.
        //     Compare scroll extent against client extent to see it.
        arts.forEach((a, i) => {
          const ox = a.scrollWidth - a.clientWidth;
          const oy = a.scrollHeight - a.clientHeight;
          if (ox > 2 || oy > 2) problems.push(`exhibit ${i} is CLIPPED by its frame (${ox}x${oy}px hidden)`);
        });

        // 6. The touchable exhibit must read as an exhibit, not a slab.
        const touch = document.querySelector('.hv10-touch');
        if (touch) {
          const r = touch.getBoundingClientRect();
          if (r.height > 620) problems.push(`the live exhibit is ${r.height.toFixed(0)}px tall — a slab, not an exhibit`);
        }
        return { count: labels.length, problems: problems.slice(0, 6), total: problems.length };
      },
      LABEL,
      ART,
      CELL,
      TOL,
    );
    await page.close();

    if (m.count > 0) sawAny = true;
    const ok = m.total === 0 && m.count > 0;
    if (!ok) failed = true;
    console.log(
      `  ${String(width).padStart(4)}  ${ok ? 'PASS' : 'FAIL'}  labels=${m.count}` +
        (m.total ? `  ${m.total} problem(s)` : '') +
        (m.problems.length ? `\n        ${m.problems.join('\n        ')}` : ''),
    );
  }
  await browser.close();

  // Non-vacuity: a run that found no labels at all proves nothing, and would
  // otherwise report a clean sweep. This is the trap that makes a gate look
  // green on a page it never actually inspected.
  if (!sawAny) {
    console.log(`\nFAIL: no elements matched ${LABEL} at any width — the gate inspected nothing.`);
    process.exit(1);
  }
  console.log(failed ? '\nFAIL: labels collide.' : '\nPASS: every label is clear of its neighbours and inside its column.');
  process.exit(failed ? 1 : 0);
})();
