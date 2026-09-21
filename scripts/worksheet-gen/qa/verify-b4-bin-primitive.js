#!/usr/bin/env node
/**
 * verify-b4-bin-primitive.js — the node gate of primitives/bin.js (design
 * docs/worksheet-gen/b4-designs/K-357-recycling.md §2 "Node gate
 * qa/verify-b4-bin-primitive.js"). Pure node, no browser: parses the EMITTED
 * SVG, never a derived constant.
 *
 *   node scripts/worksheet-gen/qa/verify-b4-bin-primitive.js
 *
 * Asserts, per size in {44x66 (F1 chip), 56x84 (F1 key), 117x176 (base),
 * 117x260 (F4), 210x176 (es-MX)} x colour x mark x fill:
 *   - the four parts `<g data-lcs-bin-part="handle|lid|collar|body">` present,
 *     each ONE shape, in the draw order body < collar < lid < handle
 *   - ONE fill group `<g data-lcs-fill="<key>" data-lcs-bin-fillgroup>` naming
 *     the colour KEY (never the hex) and the fill mode
 *   - colour keys resolve: every codeColors key, 'inkSoft', 'teal'; an unknown
 *     key THROWS; the resolved hex is a token (qa/lints.js palette)
 *   - fill:'lid' → handle + lid + collar carry the colour hex, the body is
 *     white; fill:'all' → every part the colour; fill:'none' → NO non-white
 *     fill anywhere AND no mark (the F4 poison: a leaked lid colour)
 *   - mark 0 → no `[data-lcs-bin-mark]`; marks 1..4 → one group with the
 *     index and every feature >= 2 px (dot r, bar w/h, rounded bar h, zigzag
 *     stroke) AT w 44 (measured off the emitted attributes); a mark outside
 *     0..4 THROWS
 *   - the stroke is 3 px at w >= 64 and max(2, 3 * w / 117) below (44 → 2)
 *   - px geometry scales in width only: a 210 x 176 bin is 176 tall, its lid
 *     spans 0.06w..0.94w and 0.13h..0.28h, every part inside 0..w x 0..h
 * then the POISONS against their control: a doctored fill:'none' bin whose
 * lid carries codeBlue (the "no non-white fill" check fires), a doctored
 * fill:'none' bin with a mark group (the "no mark" check fires), an unknown
 * colour key (throws), a mark 5 (throws), and an emitted 44 px bin whose dot
 * radius is scaled below 2 (the feature floor fires on doctored markup).
 */
'use strict';
const tokens = require('../primitives/_tokens.js');
const { bin, colourFor, FILLS, MARKS } = require('../primitives/bin.js');

const PALETTE = new Set([...Object.values(tokens.color), ...Object.values(tokens.codeColors)].map((c) => c.toUpperCase()));
const WHITE = tokens.color.white.toUpperCase();
const SIZES = [[44, 66], [56, 84], [117, 176], [117, 260], [117, 270], [210, 176], [210, 270]];
const COLOURS = [...Object.keys(tokens.codeColors), 'inkSoft', 'teal'];
const PARTS = ['handle', 'lid', 'collar', 'body'];

let assertions = 0;
const fails = [];
function ok(c, m) { assertions++; if (!c) fails.push(m); return !!c; }
const num = (s, attr) => { const m = new RegExp(` ${attr}="([^"]+)"`).exec(s); return m ? +m[1] : NaN; };
function partMarkup(svg, part) {
  const m = new RegExp(`<g data-lcs-bin-part="${part}">([\\s\\S]*?)</g>`).exec(svg);
  return m ? m[1] : null;
}
function markGroup(svg) {
  const m = /<g data-lcs-bin-mark="(\d)">([\s\S]*?)<\/g>/.exec(svg);
  return m ? { index: +m[1], inner: m[2] } : null;
}
/** The smallest mark feature (px) read off the emitted attributes. */
function minFeature(mk) {
  const vals = [];
  for (const c of mk.inner.matchAll(/<circle [^>]*r="([^"]+)"/g)) vals.push(+c[1]);
  for (const r of mk.inner.matchAll(/<rect [^>]*width="([^"]+)" height="([^"]+)"/g)) vals.push(+r[1], +r[2]);
  for (const p of mk.inner.matchAll(/<polyline [^>]*stroke-width="([^"]+)"/g)) vals.push(+p[1]);
  return vals.length ? Math.min(...vals) : NaN;
}

function checkBin({ w, h, colour, mark, fill }) {
  const tag = `${w}x${h} ${colour} mark ${mark} fill ${fill}`;
  const r = bin({ w, h, colour, mark, fill });
  const svg = r.svg;
  ok(r.w === w && r.h === h, `${tag}: returned ${r.w}x${r.h}`);
  ok(new RegExp(`<svg [^>]*width="${w}" height="${h}"`).test(svg), `${tag}: svg width/height ≠ ${w}x${h} (no viewBox scaling)`);
  ok(new RegExp(`viewBox="0 0 ${w} ${h}"`).test(svg), `${tag}: viewBox ≠ 0 0 ${w} ${h}`);
  // parts + order
  const parts = PARTS.map((p) => ({ p, at: svg.indexOf(`data-lcs-bin-part="${p}"`), inner: partMarkup(svg, p) }));
  for (const x of parts) {
    ok(x.at >= 0 && x.inner !== null, `${tag}: part ${x.p} absent`);
    if (x.inner !== null) ok((x.inner.match(/<(rect|path)\b/g) || []).length === 1, `${tag}: part ${x.p} is not ONE shape`);
  }
  const at = Object.fromEntries(parts.map((x) => [x.p, x.at]));
  ok(at.body < at.collar && at.collar < at.lid && at.lid < at.handle, `${tag}: draw order is not body < collar < lid < handle`);
  // fill group
  const grp = new RegExp(`<g data-lcs-fill="${colour}" data-lcs-bin-fillgroup="1" data-lcs-fill-mode="${fill}">`).exec(svg);
  ok(!!grp, `${tag}: no fill group naming the colour KEY + mode`);
  ok((svg.match(/data-lcs-bin-fillgroup/g) || []).length === 1, `${tag}: ${(svg.match(/data-lcs-bin-fillgroup/g) || []).length} fill groups`);
  const hex = colourFor(colour).toUpperCase();
  ok(PALETTE.has(hex), `${tag}: colour ${hex} is not a token`);
  // fills per mode
  const fillOf = (p) => { const m = / fill="([^"]+)"/.exec(partMarkup(svg, p) || ''); return m ? m[1].toUpperCase() : null; };
  if (fill === 'lid') {
    for (const p of ['handle', 'lid', 'collar']) ok(fillOf(p) === hex, `${tag}: ${p} fill ${fillOf(p)} ≠ ${hex}`);
    ok(fillOf('body') === WHITE, `${tag}: body fill ${fillOf('body')} ≠ white`);
  } else if (fill === 'all') {
    for (const p of PARTS) ok(fillOf(p) === hex, `${tag}: ${p} fill ${fillOf(p)} ≠ ${hex}`);
  } else {
    const nonWhite = [...svg.matchAll(/ fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase()).filter((v) => v !== WHITE);
    ok(nonWhite.length === 0, `${tag}: fill:'none' carries a non-white fill ${nonWhite.join(',')}`);
    ok(!markGroup(svg), `${tag}: fill:'none' draws a mark`);
  }
  // strokes: every part teal, the clamp below 64
  const want = w < 64 ? Math.max(2, 3 * w / 117) : 3;
  for (const p of PARTS) {
    const inner = partMarkup(svg, p) || '';
    ok(new RegExp(` stroke="${tokens.color.teal}"`).test(inner), `${tag}: ${p} stroke is not teal`);
    ok(Math.abs(num(inner, 'stroke-width') - want) < 0.01, `${tag}: ${p} stroke ${num(inner, 'stroke-width')} ≠ ${want}`);
  }
  ok(Math.abs(r.strokePx - want) < 0.01, `${tag}: returned strokePx ${r.strokePx} ≠ ${want}`);
  // marks
  const mk = markGroup(svg);
  if (fill !== 'none') {
    if (mark === 0) ok(!mk, `${tag}: mark 0 draws a mark`);
    else {
      ok(!!mk && mk.index === mark, `${tag}: mark group ${mk && mk.index} ≠ ${mark}`);
      if (mk) {
        ok(minFeature(mk) >= 2 - 0.001, `${tag}: smallest mark feature ${minFeature(mk)} px < 2`);
        ok(!/fill="#(?!FFFFFF)/i.test(mk.inner) && !/stroke="#(?!FFFFFF)/i.test(mk.inner), `${tag}: the mark is not white`);
      }
    }
  }
  // geometry in px from w, h (no viewBox scaling)
  const lid = partMarkup(svg, 'lid') || '';
  ok(Math.abs(num(lid, 'x') - 0.06 * w) < 0.02 && Math.abs(num(lid, 'width') - 0.88 * w) < 0.02, `${tag}: lid x/width ${num(lid, 'x')}/${num(lid, 'width')} ≠ 0.06w..0.94w`);
  ok(Math.abs(num(lid, 'y') - 0.13 * h) < 0.02 && Math.abs(num(lid, 'height') - 0.15 * h) < 0.02, `${tag}: lid y/height ${num(lid, 'y')}/${num(lid, 'height')} ≠ 0.13h..0.28h`);
  const handle = partMarkup(svg, 'handle') || '';
  ok(Math.abs(num(handle, 'x') - 0.38 * w) < 0.02 && Math.abs(num(handle, 'y') - 0.07 * h) < 0.02, `${tag}: handle ≠ 0.38w / 0.07h`);
  const collar = partMarkup(svg, 'collar') || '';
  ok(Math.abs(num(collar, 'x') - 0.14 * w) < 0.02 && Math.abs(num(collar, 'y') - 0.27 * h) < 0.02 && Math.abs(num(collar, 'height') - 0.10 * h) < 0.02, `${tag}: collar ≠ 0.14w / 0.27h..0.37h`);
  const body = / d="([^"]+)"/.exec(partMarkup(svg, 'body') || '');
  const nums = body ? body[1].match(/-?\d*\.?\d+/g).map(Number) : [];
  const xs = nums.filter((_, i) => i % 2 === 0), ys = nums.filter((_, i) => i % 2 === 1);
  ok(nums.length && Math.min(...xs) >= 0.14 * w - 0.02 && Math.max(...xs) <= 0.86 * w + 0.02, `${tag}: body x outside 0.14w..0.86w`);
  ok(nums.length && Math.min(...ys) >= 0.27 * h - 0.02 && Math.max(...ys) <= 0.97 * h + 0.02, `${tag}: body y outside 0.27h..0.97h`);
  ok(nums.length && Math.max(...ys) <= h && Math.max(...xs) <= w, `${tag}: a part leaves the ${w}x${h} box`);
  return svg;
}

/* ------------------------------------------------------------------ main */
for (const [w, h] of SIZES) for (const colour of COLOURS) for (const mark of MARKS) for (const fill of FILLS) checkBin({ w, h, colour, mark, fill });
// the es-MX bin: width only
{ const r = bin({ w: 210, h: 176, colour: 'codeGreen', mark: 0 }); ok(r.h === 176 && / height="176"/.test(r.svg), 'a 210 x 176 bin is not 176 tall'); }
// throws
let threw = false; try { bin({ colour: 'codeTeal' }); } catch (e) { threw = /not a codeColors key/.test(e.message); } ok(threw, 'an unknown colour key did not throw');
threw = false; try { bin({ colour: 'codeBlue', mark: 5 }); } catch (e) { threw = /mark 5 is not 0\.\.4/.test(e.message); } ok(threw, 'mark 5 did not throw');
threw = false; try { bin({ colour: 'codeBlue', fill: 'body' }); } catch (e) { threw = /fill "body"/.test(e.message); } ok(threw, 'fill "body" did not throw');
threw = false; try { colourFor('#2E6DA4'); } catch (e) { threw = true; } ok(threw, 'a raw hex resolved as a colour key');

/* ------------------------------------------------------------------ poisons (doctored markup vs the control) */
const poison = [];
function collect(fn) { const before = fails.length, saved = assertions; fn(); const f = fails.splice(before); assertions = saved; return f; }
function judge(name, findings, re) { const hit = findings.some((x) => re.test(x)); poison.push(`  ${name}: ${hit ? 'KILLED' : findings.length ? 'WRONG REASON' : 'SILENT'}${hit ? '' : ' — ' + JSON.stringify(findings.slice(0, 2))}`); return hit; }
function control(name, findings) { const pass = !findings.length; poison.push(`  ${name}: ${pass ? 'PASSES (control)' : 'FAILS — ' + JSON.stringify(findings.slice(0, 2))}`); return pass; }
/** Re-run the mode checks over a DOCTORED svg (the same predicates checkBin applies). */
function checkNoneMarkup(svg, tag) {
  const nonWhite = [...svg.matchAll(/ fill="(#[0-9A-Fa-f]{6})"/g)].map((m) => m[1].toUpperCase()).filter((v) => v !== WHITE);
  ok(nonWhite.length === 0, `${tag}: fill:'none' carries a non-white fill ${nonWhite.join(',')}`);
  ok(!markGroup(svg), `${tag}: fill:'none' draws a mark`);
}
let killed = 0;
{ const good = bin({ w: 117, h: 260, colour: 'codeBlue', mark: 1, fill: 'none' }).svg;
  const c = control('PB0 fill:none control', collect(() => checkNoneMarkup(good, 'control')));
  const leaked = good.replace(/(<g data-lcs-bin-part="lid"><rect [^>]*fill=")#FFFFFF/, `$1${tokens.codeColors.codeBlue}`);
  const a = judge('PB1 leaked lid colour on fill:none', collect(() => checkNoneMarkup(leaked, 'PB1')), /carries a non-white fill #2E6DA4/);
  const marked = good.replace('</g></svg>', `<g data-lcs-bin-mark="1"><circle cx="35" cy="35" r="4" fill="#FFFFFF"/></g></g></svg>`);
  const b = judge('PB2 mark drawn on fill:none', collect(() => checkNoneMarkup(marked, 'PB2')), /fill:'none' draws a mark/);
  if (c && a) killed++; if (c && b) killed++; }
{ const good = bin({ w: 44, h: 66, colour: 'codeGreen', mark: 1 }).svg;
  const mk = markGroup(good);
  const c = control('PB3 44 px dots control', collect(() => ok(minFeature(mk) >= 2, 'x')));
  const small = { index: 1, inner: mk.inner.replace(/r="2"/g, 'r="1.58"') };
  const a = judge('PB3 44 px dots scaled below 2 px', collect(() => ok(minFeature(small) >= 2 - 0.001, `PB3: smallest mark feature ${minFeature(small)} px < 2`)), /smallest mark feature 1\.58 px < 2/);
  if (c && a) killed++; }
{ let msg = ''; try { bin({ colour: 'blue' }); } catch (e) { msg = e.message; }
  if (judge('PB4 unknown colour key', msg ? [msg] : [], /colour "blue" is not a codeColors key/)) killed++; }
{ let msg = ''; try { bin({ colour: 'codeBlue', mark: 7 }); } catch (e) { msg = e.message; }
  if (judge('PB5 mark 7', msg ? [msg] : [], /mark 7 is not 0\.\.4/)) killed++; }
ok(killed === 5, `poisons: ${killed}/5 killed`);

console.log('poisons:\n' + poison.join('\n'));
const pass = fails.length === 0;
if (!pass) console.log('FINDINGS:\n  ' + fails.join('\n  '));
console.log(pass ? `PASS (${assertions} assertions over ${SIZES.length} sizes x ${COLOURS.length} colours x ${MARKS.length} marks x ${FILLS.length} fills)` : `FAIL (${fails.length} findings)`);
process.exit(pass ? 0 : 1);
