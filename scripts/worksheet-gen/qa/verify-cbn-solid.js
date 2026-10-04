#!/usr/bin/env node
/**
 * qa/verify-cbn-solid.js — poison test for lib/cbn-render.js checkSolid (the "every object is ONE piece" gate,
 * operator 2026-10-05: a flower stem stopped above its pot; a duck head only touched its body). Each case must
 * land on the stated side; a gate that passes everything (or fails everything) is caught by the controls.
 */
'use strict';
const puppeteer = require('puppeteer');
const { Art, circle, rrect, curve } = require('../primitives/cbn-art/core.js');
const P = require('../primitives/cbn-art/parts.js');
const R = require('../lib/cbn-render.js');

const at = (fn, o = { x: 300, y: 300 }) => { const a = new Art(); a.at(o, (b) => fn(b)); return a; };
const CASES = [
  // the operator's two findings, drawn as they shipped in the pilot
  { name: 'pilot flower pot (stem stops above the rim)', want: 'fail', art: at((a) => a.group('flowerPot', () => {
    a.region(rrect(-12, 0, 24, 96, 8), 'green', 'stem'); a.region(circle(0, -60, 48), 'yellow', 'face');
    a.region(rrect(-74, 140, 148, 96, 8), 'orange', 'pot'); a.region(rrect(-86, 110, 172, 36, 10), 'brown', 'rim'); })) },
  { name: 'pilot duck (head only touches the body)', want: 'fail', art: at((a) => a.group('duck', () => {
    a.region(rrect(-120, -32, 230, 110, 50), 'yellow', 'body'); a.region(circle(36, -96, 64), 'yellow', 'head'); })) },
  { name: 'two circles touching at a point', want: 'fail', art: at((a) => a.group('pair', () => { a.region(circle(-60, 0, 60), 'red'); a.region(circle(60, 0, 60), 'red'); })) },
  { name: 'a limb on a hairline joint', want: 'fail', art: at((a) => a.group('limb', () => { a.region(circle(0, 0, 70), 'red'); a.region(rrect(66, -4, 10, 8, 2), 'red'); a.region(circle(110, 0, 36), 'red'); })) },
  { name: 'a character running off the frame', want: 'fail', art: at((a) => P.bunny(a), { x: 20, y: 300 }) },
  // controls
  { name: 'two overlapping circles', want: 'pass', art: at((a) => a.group('pair', () => { a.region(circle(-40, 0, 60), 'red'); a.region(circle(40, 0, 60), 'red'); })) },
  { name: 'a ball on an ink stalk (a drawn connection)', want: 'pass', art: at((a) => a.group('stalk', () => { a.region(circle(0, 0, 60), 'red'); a.line(curve([[0, -58], [0, -90], [0, -110]]), 2.6); a.region(circle(0, -122, 14), 'red'); })) },
  { name: 'sun with detached rays', want: 'pass', art: at((a) => P.sun(a)) },
  { name: 'the fixed flower pot', want: 'pass', art: at((a) => P.flowerPot(a)) },
  { name: 'the fixed duck', want: 'pass', art: at((a) => P.duck(a)) },
  { name: 'a tree running off the frame (scenery may)', want: 'pass', art: at((a) => P.tree(a), { x: 10, y: 300 }) },
];
(async () => {
  const b = await puppeteer.launch(); const page = await b.newPage(); await page.setContent('<html><body></body></html>');
  let bad = 0;
  for (const c of CASES) {
    const f = await R.checkSolid(page, c.art);
    const got = f.length ? 'fail' : 'pass';
    if (got !== c.want) bad++;
    console.log(`${got === c.want ? '✓' : '✗'} ${c.name}: ${got}${f.length ? ' — ' + f.map((x) => x.msg).join('; ') : ''}`);
  }
  await b.close();
  console.log(bad ? `${bad} WRONG` : `all ${CASES.length} cases land on the right side`);
  process.exitCode = bad ? 1 : 0;
})();
