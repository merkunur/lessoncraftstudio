#!/usr/bin/env node
/**
 * Spike S3 — cross-browser layout (ARCHITECTURE §16).
 *
 * What is measured: a fixed set of 13 maker pages (every template family of the three pilot makers: ten-frame,
 * tally, subitizing, scattered/scene counting, I-spy scene, category counting, sight-word writing lines, trace
 * sentences, missing letters, flash cards; a Finnish page with a 38-character title, German and Nordic pages) is made
 * IN EACH BROWSER through the served maker screen (/makers/app/), exactly as the screen makes it (generate(): build +
 * live lints + the type's verify, with the §6.2 retry ladder). Each browser's page is then mounted in a 703×945 frame
 * (the gate frame's box), after every <img> settles and document.fonts.ready, and for every element carrying a
 * data-lcs-* attribute, every direct child of .ws-page and every direct child of .ws-body (the cards) the
 * box relative to [data-lcs-page] is recorded: getBoundingClientRect() for HTML elements (and for an outer <svg>,
 * which is a CSS box); for SVG graphics elements inside an <svg> the GEOMETRY box (getBBox() mapped through
 * getScreenCTM()), because Firefox's getBoundingClientRect of an SVG element includes the stroke and Chromium/WebKit's
 * does not — a measuring difference, not a layout one (measured 2026-10-31: 1.5 px on K-391's writing-line groups
 * whose geometry agreed within 0.24 px). Browsers: Chromium, Firefox, WebKit (Playwright).
 * WebKit-on-Windows is a PROXY for Safari, not Safari (no CoreText) — the real Safari/iPad run is still owed.
 *
 * Also compared: the page HTML (must be byte-identical — §16 point 1), the retry attempt the ladder landed on, and the
 * gate result (lints + verify) on the measured page.
 *
 * Pass line (§16): every rect within 1.0 px on every browser pair; every lint and verify result identical. The line is
 * reported as measured, never loosened.
 *
 * Poison (--poison): (a) shifts [data-lcs-title] by 2 px in Firefox only (an HTML rect); (b) shifts one K-391
 * writing-line SVG group by 2 px in WebKit only (an SVG geometry box); the run must report both (exit 1 if not).
 * Without --poison the report is written to docs/makers/spikes/S3-layout.md.
 *
 *   node scripts/makers/spikes/s3-layout.js [--poison]
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const pw = require('C:/Users/rkgen/lessoncraftstudio/frontend/node_modules/playwright');
const { handler } = require('../serve.js');

const POISON = process.argv.includes('--poison');
const REPORT = path.join(__dirname, '..', '..', '..', 'docs', 'makers', 'spikes', 'S3-layout.md');
const TOL = 1.0;

// maker, locale, template, level, theme (null = first offered / themeless), variant
const PAGES = [
  ['ten-frames', 'en', 'K-004', 2, 'animals', 1],     // ten-frame counting, pictures
  ['ten-frames', 'de', 'K-024', 2, null, 1],          // match frame to numeral
  ['ten-frames', 'fi', 'G1-105', 3, null, 1],         // ten-frame addition
  ['ten-frames', 'sv', 'K-014', 1, 'fruits', 1],      // tally
  ['ten-frames', 'no', 'K-017', 2, null, 2],          // subitizing dots
  ['counting', 'en', 'K-006', 2, 'animals', 1],       // scattered count-and-write
  ['counting', 'fi', 'K-060', 3, 'vehicles', 1],      // I-spy scene
  ['counting', 'de', 'K-013', 2, 'farm animals', 1],  // count by category
  ['counting', 'fr', 'K-011', 2, null, 1],            // count and colour (B&W themes)
  ['sight-words', 'fi', 'K-239', 2, null, 1],         // 38-character Finnish title
  ['sight-words', 'en', 'K-433', 1, null, 1],         // read, trace, write — writing lines
  ['sight-words', 'de', 'K-391', 2, null, 1],         // trace sentences
  ['sight-words', 'nl', 'K-437', 2, null, 1],         // missing letters
];

/** Runs inside the maker screen: make the page, mount it in a fresh 703×945 frame, gate it, measure it. */
async function measureInBrowser([id, level, theme, variant, poison, poisonSvg]) {
  const M = window.__lcsMaker;
  const t = M.tj.templates.find((x) => x.id === id);
  if (!t || !t.locales.includes(M.LANG)) return { error: 'template not offered: ' + id };
  const type = await M.loadType(id);
  const units = (t.units && t.units[M.LANG]) || [];
  const o = { type, strings: M.strings[id], locale: M.LANG, difficulty: level, theme: t.themed ? (theme && t.themes.includes(theme) ? theme : t.themes[0]) : null, unit: units.length ? units[0].id : null, variant };
  // our own 703×945 frame (the gate frame's box), so the screen's own background generation never shares it
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:fixed;left:-10000px;top:0;width:703px;height:945px;border:0';
  document.body.append(frame);
  const r = await M.mod.generate(o, (html) => M.mod.mountHtml(frame, html));
  if (!r.ok) { frame.remove(); return { error: 'refused: ' + r.fails.slice(0, 2).join(' | ') }; }
  const page = await M.mod.mountHtml(frame, r.html);
  const d = frame.contentDocument;
  if (poison) d.querySelector('[data-lcs-title]').style.cssText += ';position:relative;left:2px';
  if (poisonSvg) { const g = d.querySelector('.ws-trace-lane svg > g:nth-of-type(2)'); g.setAttribute('transform', ('translate(2,0) ' + (g.getAttribute('transform') || '')).trim()); }
  const gate = await M.mod.gatePage(type, page);
  const root = d.querySelector('[data-lcs-page]');
  const R = root.getBoundingClientRect();
  const pathOf = (el) => { const p = []; for (let e = el; e && e !== root; e = e.parentElement) { const sib = [...e.parentElement.children].filter((s) => s.tagName === e.tagName); p.unshift(e.tagName.toLowerCase() + (e.classList[0] ? '.' + e.classList[0] : '') + (sib.length > 1 ? ':nth-of-type(' + (sib.indexOf(e) + 1) + ')' : '')); } return p.join(' > ') || '[data-lcs-page]'; };
  const set = new Set([root, ...root.children, ...(d.querySelector('.ws-body') ? d.querySelector('.ws-body').children : [])]);
  for (const el of d.querySelectorAll('*')) if ([...el.attributes].some((a) => a.name.startsWith('data-lcs-'))) set.add(el);
  // SVG graphics inside an <svg> are measured by their GEOMETRY box (getBBox through the screen CTM): engines disagree
  // on whether getBoundingClientRect of an SVG element includes its stroke — a measuring difference, not a layout one.
  // An outer <svg> is a CSS box and keeps getBoundingClientRect.
  const geoOf = (el) => {
    if (!(el instanceof d.defaultView.SVGGraphicsElement) || !el.ownerSVGElement) return null;
    const bb = el.getBBox(), m = el.getScreenCTM();
    const pts = [[bb.x, bb.y], [bb.x + bb.width, bb.y], [bb.x, bb.y + bb.height], [bb.x + bb.width, bb.y + bb.height]].map(([x, y]) => [m.a * x + m.c * y + m.e, m.b * x + m.d * y + m.f]);
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    return { x: Math.min(...xs) - R.left, y: Math.min(...ys) - R.top, w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
  };
  const rects = [...set].map((el) => { const geo = geoOf(el); if (geo) return { sel: pathOf(el), svg: true, ...geo }; const b = el.getBoundingClientRect(); return { sel: pathOf(el), x: b.left - R.left, y: b.top - R.top, w: b.width, h: b.height }; });
  frame.remove();
  return { htmlSha: r.html, attempt: JSON.stringify(r.attempt), gate, rects, title: M.strings[id].title };
}

(async () => {
  const srv = http.createServer(handler); await new Promise((r) => srv.listen(0, r));
  const port = srv.address().port;
  const res = {}; // browser -> page key -> result
  for (const name of ['chromium', 'firefox', 'webkit']) {
    const browser = await pw[name].launch();
    res[name] = {};
    try {
      for (const [maker, lang, id, level, theme, variant] of PAGES) {
        const key = `${maker} ${lang} ${id} L${level}`;
        const p = await browser.newPage({ viewport: { width: 1280, height: 1000 } });
        const errs = [];
        p.on('pageerror', (e) => errs.push(e.message));
        await p.goto(`http://localhost:${port}/makers/app/?maker=${maker}&lang=${lang}&t=${id}`, { waitUntil: 'networkidle' });
        await p.waitForFunction(() => window.__lcsMaker, null, { timeout: 60000 });
        let r;
        try { r = await p.evaluate(measureInBrowser, [id, level, theme, variant, POISON && name === 'firefox', POISON && name === 'webkit' && id === 'K-391']); } catch (e) { r = { error: e.message.split('\n')[0] }; }
        if (r.htmlSha) r.htmlSha = crypto.createHash('sha1').update(r.htmlSha).digest('hex').slice(0, 12);
        if (errs.length) r.pageErrors = errs.slice(0, 2);
        res[name][key] = r;
        await p.close();
        process.stderr.write(`${name} ${key}: ${r.error || r.rects.length + ' rects, gate ' + (r.gate.length ? 'FAIL' : 'pass')}\n`);
      }
    } finally { await browser.close(); }
  }
  srv.close();

  const pairs = [['chromium', 'firefox'], ['chromium', 'webkit'], ['firefox', 'webkit']];
  const out = [];
  const L = (s) => out.push(s);
  let layoutPass = true, gatePass = true, htmlPass = true;
  const over = [];
  const pairMax = Object.fromEntries(pairs.map((p) => [p.join('-'), 0]));
  L('# Spike S3 — cross-browser layout' + (POISON ? ' (POISON RUN: title shifted 2 px in Firefox, a K-391 writing-line group 2 px in WebKit)' : ''));
  L('');
  L(`Run ${new Date().toISOString().slice(0, 16).replace('T', ' ')} UTC on the operator PC (Windows 11) with Playwright ${require('C:/Users/rkgen/lessoncraftstudio/frontend/node_modules/playwright/package.json').version}: Chromium, Firefox, WebKit. Script: \`node scripts/makers/spikes/s3-layout.js\`.`);
  L('');
  L('**WebKit on Windows is a proxy for Safari, not Safari**: it shares WebKit layout but not CoreText font shaping or the macOS/iPadOS font stack. The Safari/macOS, Safari/iPad and Chrome/ChromeOS rows of §16 are still owed on real hardware.');
  L('');
  L(`Each page is made in each browser through the served maker screen (generate(): build + live lints + verify, §6.2 ladder), mounted in a 703×945 frame after images settle and \`document.fonts.ready\`; boxes (relative to \`[data-lcs-page]\`) of every \`data-lcs-*\` element, every \`.ws-page\` child and every \`.ws-body\` child are compared — \`getBoundingClientRect\` for HTML elements and outer \`<svg>\` boxes, the geometry box (\`getBBox\` through \`getScreenCTM\`) for SVG graphics inside an \`<svg>\`, because Firefox's \`getBoundingClientRect\` of an SVG element includes the stroke and Chromium/WebKit's does not (the previous run read 1.52 px on K-391's writing-line groups whose geometry agreed within 0.24 px). Pass line: every rect within ${TOL.toFixed(1)} px, every lint/verify identical.`);
  L('');
  L('| page | rects | HTML identical | attempt | gate (C / F / W) | max Δ C–F | max Δ C–W | max Δ F–W |');
  L('|---|---|---|---|---|---|---|---|');
  for (const [maker, lang, id, level] of PAGES) {
    const key = `${maker} ${lang} ${id} L${level}`;
    const rs = pairs.flat().filter((v, i, a) => a.indexOf(v) === i).map((b) => res[b][key]);
    if (rs.some((r) => r.error)) { layoutPass = gatePass = false; L(`| ${key} | — | — | — | ${rs.map((r) => r.error || 'ok').join(' / ')} | — | — | — |`); continue; }
    const sameHtml = rs.every((r) => r.htmlSha === rs[0].htmlSha);
    const sameAttempt = rs.every((r) => r.attempt === rs[0].attempt);
    const gateStr = rs.map((r) => (r.gate.length ? 'FAIL' : 'pass')).join(' / ');
    if (!sameHtml) htmlPass = false;
    if (!rs.every((r) => JSON.stringify(r.gate) === JSON.stringify(rs[0].gate)) || !sameAttempt) gatePass = false;
    const cells = pairs.map(([a, b]) => {
      const A = res[a][key].rects, B = res[b][key].rects;
      if (A.length !== B.length) { layoutPass = false; return `rect count ${A.length}≠${B.length}`; }
      let m = 0;
      A.forEach((ra, i) => {
        const rb = B[i];
        const d = Math.max(...['x', 'y', 'w', 'h'].map((k) => Math.abs(ra[k] - rb[k])));
        m = Math.max(m, d);
        if (d > TOL) {
          layoutPass = false;
          over.push({ key, pair: a + '–' + b, sel: ra.sel, a: ra, b: rb, d });
        }
      });
      pairMax[a + '-' + b] = Math.max(pairMax[a + '-' + b], m);
      return (m > TOL ? '**' : '') + m.toFixed(2) + (m > TOL ? '**' : '');
    });
    L(`| ${key} | ${rs[0].rects.length} | ${sameHtml ? 'yes' : '**no**'} | ${sameAttempt ? rs[0].attempt : '**' + rs.map((r) => r.attempt).join(' / ') + '**'} | ${gateStr} | ${cells.join(' | ')} |`);
  }
  L('');
  L(`**Max |Δ| over all pages:** Chromium–Firefox ${pairMax['chromium-firefox'].toFixed(2)} px · Chromium–WebKit ${pairMax['chromium-webkit'].toFixed(2)} px · Firefox–WebKit ${pairMax['firefox-webkit'].toFixed(2)} px.`);
  L('');
  if (over.length) {
    L(`### Elements over ${TOL.toFixed(1)} px (${over.length})`);
    L('');
    L('| page | pair | element | box | x/y/w/h A | x/y/w/h B | max Δ |');
    L('|---|---|---|---|---|---|---|');
    const f = (r) => [r.x, r.y, r.w, r.h].map((v) => v.toFixed(1)).join(' / ');
    for (const o of over.slice(0, 80)) L(`| ${o.key} | ${o.pair} | \`${o.sel}\` | ${o.a.svg ? 'SVG geometry' : 'HTML rect'} | ${f(o.a)} | ${f(o.b)} | ${o.d.toFixed(2)} |`);
    if (over.length > 80) L(`| … ${over.length - 80} more | | | | | | |`);
    L('');
  }
  const gateDiffs = [];
  for (const [maker, lang, id, level] of PAGES) {
    const key = `${maker} ${lang} ${id} L${level}`;
    for (const b of ['chromium', 'firefox', 'webkit']) if (res[b][key].gate && res[b][key].gate.length) gateDiffs.push(`- ${b} ${key}: ${res[b][key].gate.slice(0, 3).join(' | ')}`);
  }
  if (gateDiffs.length) { L('### Gate failures on the measured page'); L(''); gateDiffs.forEach(L); L(''); }
  L(`**Result:** layout ${layoutPass ? "PASS" : "MISS"} (pass line: every rect ≤ ${TOL.toFixed(1)} px) · lints/verify ${gatePass ? 'PASS (identical in all three)' : 'MISS'} · HTML ${htmlPass ? 'byte-identical in all three' : 'DIFFERS'}.`);
  const md = out.join('\n') + '\n';
  process.stdout.write(md);
  if (POISON) {
    const pa = over.some((o) => o.sel.includes('ws-title') && o.pair.includes('firefox') && !o.a.svg);
    const pb = over.some((o) => o.key.includes('K-391') && o.pair.includes('webkit') && o.a.svg && o.sel.includes('ws-trace-lane'));
    console.log(pa ? 'poison (a) caught: the 2-px HTML title shift in Firefox is reported' : 'POISON (a) NOT CAUGHT');
    console.log(pb ? 'poison (b) caught: the 2-px SVG writing-line shift in WebKit is reported' : 'POISON (b) NOT CAUGHT');
    const caught = pa && pb;
    if (!caught) process.exitCode = 1;
  } else {
    fs.mkdirSync(path.dirname(REPORT), { recursive: true });
    fs.writeFileSync(REPORT, md);
  }
})().catch((e) => { console.error(e); process.exitCode = 1; });
