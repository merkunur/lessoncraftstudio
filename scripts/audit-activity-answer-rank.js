#!/usr/bin/env node
/* =====================================================================
   audit-activity-answer-rank.js — "the right answer is always the middle number"

   WHY (2026-10-17): the pattern "options = answer−step, answer, answer+step"
   was found in 5+ live activities (clock-digital ×2, clock-elapsed ×2,
   maple-bakery, patchwork-meadow, mending-fences …). A child who learns
   "pick the middle one" (or "pick the smallest") wins without doing the maths.
   Shuffling the DISPLAY order does not help — the tell is the RANK of the
   right value among the offered values, not its screen position.

   WHAT: for every activity, every round, every locale pool, compute the rank
   (lowest … highest) of the correct option among its NUMERIC options and flag
   the activity when one rank wins MORE THAN HALF of the rounds (≥ 4 rounds).

   TWO PASSES
     static  (default, browser-free, fast): rounds whose options are authored in
             mini tools/*-activities.json. Each engine's "which option is right"
             rule lives in an ADAPTER below — an engine with numeric options and
             no adapter is reported as UNCHECKED, never silently passed.
     --runtime (puppeteer): options BUILT IN CODE (wrappers/cores). Every
             activity is mounted locally, every round forced, each numeric card
             tapped + Check pressed until the round celebrates; the celebrating
             card is the right one. Slow (minutes); a dev run, not a deploy gate.

   USAGE
     node scripts/audit-activity-answer-rank.js            # static, exit 1 on any flag
     node scripts/audit-activity-answer-rank.js --runtime  # + code-built options (en)
     node scripts/audit-activity-answer-rank.js --runtime --only=maple-bakery
     node scripts/audit-activity-answer-rank.js --json=out.json
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const http = require('http');

const REPO = path.resolve(__dirname, '..');
const MINI = path.join(REPO, 'mini tools');
const IMG = path.join(REPO, 'image-library-webp');
const args = process.argv.slice(2);
const RUNTIME = args.includes('--runtime');
const ONLY = (args.find(a => a.startsWith('--only=')) || '').slice(7) || null;
const JSON_OUT = (args.find(a => a.startsWith('--json=')) || '').slice(7) || null;
const MIN_ROUNDS = 4;
const MAX_SHARE = 0.5;

/* ---------- value helpers ---------- */
/* one scale per dimension so "40 cm" < "4 m" (lengths in cm, masses in g, volumes in ml, time in min) */
const UNIT = { mm: 0.1, cm: 1, m: 100, km: 100000, g: 1, kg: 1000, ml: 1, cl: 10, dl: 100, l: 1000, min: 1, h: 60 };
const hm = t => (t && typeof t === 'object' && 'h' in t) ? ((t.h % 12) * 60 + (t.m || 0)) : null;
function num(x) {
  if (typeof x === 'number') return x;
  if (x && typeof x === 'object') {
    if ('h' in x) return hm(x);
    for (const k of ['value', 'n', 'v', 'amount', 'num']) if (typeof x[k] === 'number') return x[k];
    if (typeof x.text === 'string') return num(x.text);
    if (typeof x.word === 'string') return num(x.word);
    return null;
  }
  if (typeof x === 'string') {
    const s = x.trim();
    let m = s.match(/^(\d{1,2}):(\d{2})$/); if (m) return (Number(m[1]) % 12) * 60 + Number(m[2]);
    m = s.replace(/\s/g, '').match(/^[$€£]?(-?\d+(?:[.,]\d+)?)(¢|€|kr|mm|cm|km|m|kg|g|dl|ml|cl|l|min|h)?$/i);
    if (m) return Number(m[1].replace(',', '.')) * (UNIT[(m[2] || '').toLowerCase()] || 1);
  }
  return null;
}
/* rank of `c` among `vals`: 0 = lowest … k-1 = highest; labelled lo/mid/hi for 3 */
function rankOf(vals, c) {
  const sorted = [...new Set(vals)].sort((a, b) => a - b);
  const i = sorted.indexOf(c);
  if (i < 0) return null;
  if (sorted.length === 1) return null;
  if (i === 0) return 'lo';
  if (i === sorted.length - 1) return 'hi';
  return sorted.length === 3 ? 'mid' : 'mid' + i;
}

/* load a mini-tools core under a window shim (cached) */
const CORES = {};
function core(file, name) {
  if (name in CORES) return CORES[name];
  try {
    const src = fs.readFileSync(path.join(MINI, file), 'utf8');
    const win = {};
    new Function('window', 'global', 'self', src)(win, win, win);
    CORES[name] = win[name] || null;
  } catch (e) { CORES[name] = null; }
  return CORES[name];
}

/* ---------- static adapters: (row, round) -> {options:[num], correct:num} | null ---------- */
const DEN = { penny: 1, nickel: 5, dime: 10, quarter: 25, halfdollar: 50, dollar: 100, cent1: 1, cent2: 2, cent5: 5, cent10: 10, cent20: 20, cent50: 50, euro1: 100, euro2: 200 };
const ADAPTERS = {
  'clock-digital': (row, r) => r.options && r.target ? { options: r.options.map(hm), correct: hm(r.target) } : null,
  'clock-elapsed': (row, r) => {
    if (!r.options || !r.start) return null;
    /* order the options as the child does: minutes from the START time, in (-6h, +6h] (so 12:10 is after 11:40) */
    const s0 = hm(r.start), rel = t => ((hm(t) - s0 + 720 + 360) % 720) - 360;
    return { options: r.options.map(rel), correct: (((r.deltaMin + 360) % 720) + 720) % 720 - 360 };
  },
  'clock-convert': (row, r) => {
    if (!Array.isArray(r.options)) return null;
    return { options: r.options, correct: r.h24 };   /* core: the answer is always the option === h24 (24to12 shows it as a 12-h + time-of-day string) */
  },
  'coin-stall': (row, r) => {
    if (!Array.isArray(r.options) || !Array.isArray(r.pile)) return null;
    let sum = 0;
    for (const p of r.pile) { const v = DEN[p.den]; if (v == null) return null; sum += v * (p.count || 1); }
    return r.options.includes(sum) ? { options: r.options, correct: sum } : null;
  },
  'skipcount': (row, r) => {
    if (!Array.isArray(r.foils) || r.unknownIndex == null) return null;
    const c = r.start + r.step * r.unknownIndex;
    return { options: [c, ...r.foils], correct: c };
  },
  'halfway-harbors': (row, r) => {
    if (r.cog !== 'nearest' || !Array.isArray(r.harbors)) return null;
    const c = Math.round(r.target / r.place) * r.place;
    return { options: r.harbors, correct: c };
  },
  'mending-fences': (row, r) => {
    if (!Array.isArray(r.candidates)) return null;
    const c = r.shownSide === 'w' ? r.h : r.w;
    return r.candidates.includes(c) ? { options: r.candidates, correct: c } : null;
  },
  'patchwork-meadow': (row, r) => {
    if (r.cog !== 'estimate' || !Array.isArray(r.choices)) return null;
    const area = (r.region || []).join('').split('').filter(c => c === '1').length;
    return { options: r.choices.map(c => c.value), correct: area };
  },
  'fraction-equiv': (row, r) => {
    if (!r.ref || !Array.isArray(r.candidates)) return null;
    return { options: r.candidates.map(c => c.num / c.den), correct: r.ref.num / r.ref.den };
  },
  /* engines whose options are BUILT by their (single-activity) core: run the real core */
  'maple-bakery': (row, r) => { const C = core('maple-bakery-core.js', 'MapleBakeryCore'); return C ? { options: C.choices(r), correct: C.answerValue(r) } : null; },
  'line-plot': (row, r) => { const C = core('line-plot-core.js', 'LinePlotCore'); return C ? { options: C.choices(r), correct: C.oracle(r) } : null; },
  /* generic: authored options + an explicit correct value */
  '*': (row, r) => {
    const opts = r.options || r.choices;
    if (!Array.isArray(opts) || opts.length < 3) return null;
    const vals = opts.map(num);
    if (vals.some(v => v == null)) return null;
    let c = null;
    for (const k of ['answer', 'correct', 'target', 'expected']) { const v = num(r[k]); if (v != null && vals.includes(v)) { c = v; break; } }
    if (c == null) {
      const i = opts.findIndex(o => o && typeof o === 'object' && (o.correct === true || o.kind === 'correct' || o.isAnswer === true));
      if (i >= 0) c = vals[i];
    }
    return c == null ? null : { options: vals, correct: c };
  }
};

function poolsOf(row) {
  const p = row.params || {};
  const out = [];
  if (Array.isArray(p.rounds) && p.rounds.length) out.push(['en', p.rounds]);
  for (const [loc, rs] of Object.entries(p.roundsL10n || {})) if (Array.isArray(rs)) out.push([loc, rs]);
  return out;
}
function engineOf(file) { return file.replace(/-activities\.json$/, ''); }

function staticPass() {
  const results = [], unchecked = [];
  for (const f of fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json')).sort()) {
    if (ONLY && !f.startsWith(ONLY)) continue;
    let rows; try { rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    if (!Array.isArray(rows)) continue;
    const eng = engineOf(f);
    for (const row of rows) {
      for (const [loc, rounds] of poolsOf(row)) {
        const ranks = []; let numericNoRule = 0;
        for (const r of rounds) {
          if (!r || typeof r !== 'object') continue;
          const ad = ADAPTERS[eng] || ADAPTERS['*'];
          let got = ad(row, r);
          if (!got && ADAPTERS[eng]) got = ADAPTERS['*'](row, r);
          if (got) { const k = rankOf(got.options, got.correct); if (k) ranks.push(k); }
          else {
            const o = r.options || r.choices || r.candidates;
            if (Array.isArray(o) && o.length >= 3 && o.every(x => num(x) != null)) numericNoRule++;
          }
        }
        if (ranks.length) results.push(summarise('static', row.id, loc, ranks));
        if (numericNoRule) unchecked.push(`${row.id} [${loc}] — ${numericNoRule} round(s) with numeric options and no adapter`);
      }
    }
  }
  return { results, unchecked };
}

function summarise(pass, id, loc, ranks) {
  const tally = {};
  ranks.forEach(k => { tally[k] = (tally[k] || 0) + 1; });
  const [topK, topN] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0];
  const share = topN / ranks.length;
  return { pass, id, loc, n: ranks.length, tally, top: topK, share, flagged: ranks.length >= MIN_ROUNDS && share > MAX_SHARE };
}

/* ---------- runtime pass ---------- */
function serve() {
  const MIME = { '.html': 'text/html', '.js': 'application/javascript', '.json': 'application/json', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml' };
  return http.createServer((req, res) => {
    const p = decodeURIComponent(req.url.split('?')[0]); let file;
    if (p.startsWith('/mini-tools/')) file = path.join(MINI, p.slice(12));
    else if (p.startsWith('/image-library-webp/')) file = path.join(IMG, p.slice(20));
    else file = path.join(MINI, p.replace(/^\//, ''));
    fs.readFile(file, (err, buf) => { if (err) { res.statusCode = 404; return res.end(); } res.setHeader('Content-Type', MIME[path.extname(file)] || 'application/octet-stream'); res.end(buf); });
  });
}
async function runtimePass(skipIds) {
  const puppeteer = require('puppeteer');
  const server = serve(); await new Promise(r => server.listen(0, '127.0.0.1', r));
  const BASE = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  const results = [], skipped = [];
  const files = fs.readdirSync(MINI).filter(f => f.endsWith('-activities.json')).sort();
  for (const f of files) {
    if (ONLY && !f.startsWith(ONLY)) continue;
    let rows; try { rows = JSON.parse(fs.readFileSync(path.join(MINI, f), 'utf8')); } catch (e) { continue; }
    if (!Array.isArray(rows)) continue;
    for (const row of rows) {
      if (skipIds.has(row.id)) continue;
      const html = (row.tool || '') + '.html';
      if (!fs.existsSync(path.join(MINI, html))) continue;
      const m = fs.readFileSync(path.join(MINI, html), 'utf8').match(/LCS\.mount\(\s*([A-Za-z0-9_$]+)/);
      if (!m) continue;
      const G = m[1];
      const page = await browser.newPage();
      try {
        await page.setViewport({ width: 900, height: 1000 });
        await page.goto(`${BASE}/${html}?lang=en&activity=${encodeURIComponent(row.id)}&embed=1`, { waitUntil: 'networkidle2', timeout: 30000 });
        await page.waitForFunction(g => window[g] && window[g]._pool && window[g]._pool.length && document.querySelector('.lcs-activity-check'), { timeout: 8000 }, G);
        const N = Math.min(await page.evaluate(g => window[g]._pool.length, G), 30);
        const ranks = [];
        for (let k = 0; k < N; k++) {
          await page.evaluate((g, k) => {
            const t = window[g], n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
            const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
            t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
          }, G, k);
          await new Promise(r => setTimeout(r, 120));
          const opts = await page.evaluate(() => {
            const stage = document.querySelector('.lcs-activity-stage') || document.querySelector('.lcs-app');
            const parse = s => { s = s.trim(); let m = s.match(/^(\d{1,2}):(\d{2})$/); if (m) return (Number(m[1]) % 12) * 60 + Number(m[2]); m = s.replace(/\s/g, '').match(/^[$€£]?(-?\d+(?:[.,]\d+)?)(¢|€|kr|mm|cm|km|m|kg|g|dl|ml|cl|l|min|h)?$/i); const U = { mm: 0.1, cm: 1, m: 100, km: 100000, g: 1, kg: 1000, ml: 1, cl: 10, dl: 100, l: 1000, min: 1, h: 60 }; return m ? Number(m[1].replace(',', '.')) * (U[(m[2] || '').toLowerCase()] || 1) : null; };
            const btns = [...stage.querySelectorAll('button')].filter(b => !b.closest('.lcs-activity-keypad') && !b.classList.contains('lcs-activity-check') && b.offsetParent);
            return btns.map((b, i) => { b.setAttribute('data-arank', i); return { i, v: parse(b.textContent || '') }; }).filter(o => o.v != null);
          });
          if (opts.length < 3) continue;
          let correct = null;
          for (const o of opts) {
            /* fresh round per probe: a wrong tap may re-render the stage (attributes lost) or spend a commit */
            await page.evaluate((g, k) => {
              const t = window[g], n = t._pool.length, order = []; for (let i = 0; i < n; i++) order.push(i);
              const at = order.indexOf(k); if (at > 0) { order.splice(at, 1); order.unshift(k); }
              t._order = order; t._orderForPool = t._pool; t._curPass = 0; window.LCS_reloadFirstTask();
            }, G, k);
            await new Promise(r => setTimeout(r, 120));
            const clicked = await page.evaluate((val) => {
              const stage = document.querySelector('.lcs-activity-stage') || document.querySelector('.lcs-app');
              const parse = s => { s = s.trim(); let m = s.match(/^(\d{1,2}):(\d{2})$/); if (m) return (Number(m[1]) % 12) * 60 + Number(m[2]); m = s.replace(/\s/g, '').match(/^[$€£]?(-?\d+(?:[.,]\d+)?)(¢|€|kr|mm|cm|km|m|kg|g|dl|ml|cl|l|min|h)?$/i); const U = { mm: 0.1, cm: 1, m: 100, km: 100000, g: 1, kg: 1000, ml: 1, cl: 10, dl: 100, l: 1000, min: 1, h: 60 }; return m ? Number(m[1].replace(',', '.')) * (U[(m[2] || '').toLowerCase()] || 1) : null; };
              const b = [...stage.querySelectorAll('button')].find(x => !x.closest('.lcs-activity-keypad') && !x.classList.contains('lcs-activity-check') && x.offsetParent && parse(x.textContent || '') === val);
              if (!b) return false; b.click(); return true;
            }, o.v);
            if (!clicked) continue;
            await new Promise(r => setTimeout(r, 80));
            const won = () => page.evaluate(g => { const p = document.querySelector('.lcs-activity-prompt'); const t = window[g]; return !!((p && p.classList.contains('celebrate')) || (t && t._resolved === true)); }, G);
            if (!(await won())) {
              await page.evaluate(() => { const c = document.querySelector('.lcs-activity-check'); if (c && !c.hidden && !c.disabled) c.click(); });
              await new Promise(r => setTimeout(r, 80));
            }
            if (await won()) { correct = o.v; break; }
          }
          if (correct == null) continue;
          const kk = rankOf(opts.map(o => o.v), correct); if (kk) ranks.push(kk);
        }
        if (ranks.length) results.push(summarise('runtime', row.id, 'en', ranks));
      } catch (e) { skipped.push(row.id + ': ' + e.message.split('\n')[0].slice(0, 80)); }
      await page.close();
    }
  }
  await browser.close(); server.close();
  return { results, skipped };
}

(async () => {
  const S = staticPass();
  let all = S.results.slice(), R = null;
  if (RUNTIME) {
    const covered = new Set(S.results.map(r => r.id));
    R = await runtimePass(covered);
    all = all.concat(R.results);
  }
  const flagged = all.filter(r => r.flagged);
  const fmt = r => `${r.flagged ? 'FLAG' : 'ok  '} ${r.pass.padEnd(7)} ${(r.id + ' [' + r.loc + ']').padEnd(62)} n=${String(r.n).padStart(2)}  ${Object.entries(r.tally).map(([k, v]) => k + ':' + v).join(' ')}  top=${r.top} ${(r.share * 100).toFixed(0)}%`;
  all.forEach(r => console.log(fmt(r)));
  if (S.unchecked.length) { console.log('\nUNCHECKED (numeric options, no adapter):'); S.unchecked.forEach(u => console.log('  ' + u)); }
  if (R && R.skipped.length) console.log(`\nruntime skipped ${R.skipped.length} activit(ies) (no pool / no Check / no numeric cards) — not judged.`);
  if (JSON_OUT) fs.writeFileSync(JSON_OUT, JSON.stringify({ all, unchecked: S.unchecked, skipped: R && R.skipped }, null, 1));
  console.log(`\n${flagged.length ? 'ANSWER-RANK AUDIT FAILED' : 'ANSWER-RANK AUDIT PASSED'} — ${all.length} pool(s) measured, ${flagged.length} flagged (one rank wins > ${MAX_SHARE * 100}% of ≥${MIN_ROUNDS} rounds).`);
  process.exit(flagged.length ? 1 : 0);
})();
