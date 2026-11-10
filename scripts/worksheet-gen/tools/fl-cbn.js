#!/usr/bin/env node
/**
 * fl-cbn.js — Color by Number from every library picture (docs/makers/FLAGSHIP.md). For each data/fl/cbn/<id>.json: gives
 * every part its crayon (data/fl/crayons.js: the biggest parts the main colour, then the accents by size), then numbers and
 * gates it in a real browser with the same code as the 200 reviewed designs (lib/cbn-render.js), and writes the result
 * back into the record: hero (crayons) · labels · num (colour → number) · ok · fails · level.
 *   node tools/fl-cbn.js [--workers=6] [--only=a,b]
 */
'use strict';
const fs = require('fs'); const path = require('path'); const { spawn } = require('child_process');
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
const DIR = path.join(__dirname, '..', 'data', 'fl', 'cbn');

/** the crayons of the parts, largest first. The parts that make up the body (a big share of the picture) take the main
 *  colour; the next take the accents in turn, so a page uses few colours; a white part stays white where the drawing has
 *  many parts (a level never asks for more than 8 colours) */
function heroOf(rec, list) {
  const own = rec.parts.filter((p) => p.hero && !p.fixed && !p.outside);
  const total = own.reduce((a, p) => a + p.area, 0) || 1;
  let acc = 0;
  const out = [];
  // two parts of one shape (the cuffs of a pair of mittens, the soles of two shoes) always share a colour: read on the
  // keys 2026-11-08, handing out accents in turn gave one mitten a green cuff and the other a yellow one
  const box = own.map((p) => boxOf(p.d));
  const same = (i, j) => { const r = (a, b) => Math.min(a, b) / Math.max(a, b); return r(own[i].area, own[j].area) >= 0.7 && r(box[i].w, box[j].w) >= 0.7 && r(box[i].h, box[j].h) >= 0.7; };
  own.forEach((p, i) => {
    const share = p.area / total;
    if (i === 0 || share >= 0.07) { out.push(list[0]); return; }
    const twin = own.findIndex((q, j) => j < i && out[j] !== list[0] && same(i, j));
    out.push(twin >= 0 ? out[twin] : list[1 + (acc++ % (list.length - 1))]);
  });
  // a page has at least three colours (lib/cbn-render.js LEVEL_CAPS): the smallest body parts take the accents
  // (with every twin of it, so a pair never splits)
  for (let i = out.length - 1; i > 0 && new Set(out).size < 3; i--) {
    if (out[i] !== list[0] || same(i, 0)) continue;   // a twin of the largest part keeps the main colour with it
    const c = list.slice(1).find((k) => !out.includes(k));
    for (let j = 1; j < out.length; j++) if (out[j] === list[0] && (j === i || same(i, j))) out[j] = c;
  }
  return out;
}

/** the box of a traced part (its path's numbers are x y pairs) */
function boxOf(d) {
  const n = (String(d).match(/-?\d+(?:\.\d+)?/g) || []).map(Number);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i + 1 < n.length; i += 2) { x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]); y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]); }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}
/** the creatures whose feet are their own colour (a duck's orange feet); every other animal is its body colour down to
 *  the ground — read at full size 2026-11-08, a far leg half hidden behind a near one is as flat as a hoof and came out
 *  brown on a pink pig */
const BIRD = /(^|_)(chick|chicken|duck|duckling|goose|gosling|hen|rooster|owl|eagle|hawk|falcon|parrot|swan|turkey|penguin|flamingo|peacock|ostrich|pigeon|dove|crow|raven|woodpecker|toucan|bird|robin|sparrow|canary|kiwi|vulture|pelican|stork|seagull|gull|puffin|hummingbird|cardinal|jay|macaw|cockatoo|emu|heron|bluebird)(_|$)/;
/** animals that also live in other themes (holidays, toys, nature, the beach) */
const ANIMAL_ELSEWHERE = /^(reindeer|bird|bunny|butterfly|rabbit|chick|chicken|sheep|crab|starfish|dragon|unicorn|ladybug|dinosaur|duck|dog|teddy_bear|fish|turkey)$/;
const CREATURES = new Set(['animals', 'pets', 'farm', 'safari', 'forest', 'ocean', 'polar', 'birds', 'bugs', 'dinosaurs']);
/**
 * which small white pieces are really an eye white or a shine. designs.js (and cbn-unpainted.js) left a piece white when
 * the thickest ink NEAR it was pupil-thick (`thick` ≥ 10) — but a piece beside a heavy junction or a heavy stroke reads
 * the same, so read on the keys 2026-11-08 a duck's foot, a lion's mane tuft and many specks stayed white (the
 * segmenter's thickShare is 0 even for real eyes, so it cannot decide). Measured here on the drawing's ink instead: the
 * DEPTH of the deepest ink the piece touches within its own box (+6 units) — the distance from that ink's edge, in
 * picture units. Measured 2026-11-08: pupils (and the ink round a shine) 9.4-11.2 deep on a cat, a koala and a duck;
 * a mane tuft, a duck's foot, heavy strokes and junctions 5.4-7.4. An eye is 7.5 or deeper (the line errs toward
 * keeping a real eye white white). Writes p.eye + p.eyeDepth on every piece the old test called an eye; pieceColours
 * paints the ones that are not.
 */
const EYE_DEPTH = 7.5;
async function eyeFlags(page, rec) {
  const cand = [];
  for (const kind of ['mid', 'small']) (rec[kind] || []).forEach((p, i) => { if (p.hero && p.thick >= 10) cand.push([kind, i, p.d, boxOf(p.d)]); });
  if (!cand.length) return 0;
  const depth = await page.evaluate((ink, ps, W, H) => {
    const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c.getContext('2d', { willReadFrequently: true }); };
    const g = mk(); g.fillStyle = '#000'; g.fill(new Path2D(ink));
    const a = g.getImageData(0, 0, W, H).data, N = W * H, inkm = new Uint8Array(N);
    for (let i = 0; i < N; i++) inkm[i] = a[i * 4 + 3] > 128 ? 1 : 0;
    // chamfer distance (x10: 10 straight, 14 diagonal) of every ink pixel from the nearest paper pixel
    const d = new Float32Array(N); for (let i = 0; i < N; i++) d[i] = inkm[i] ? 1e9 : 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const i = y * W + x; let v = d[i]; if (x > 0) v = Math.min(v, d[i - 1] + 10); if (y > 0) { v = Math.min(v, d[i - W] + 10); if (x > 0) v = Math.min(v, d[i - W - 1] + 14); if (x < W - 1) v = Math.min(v, d[i - W + 1] + 14); } d[i] = v; }
    for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) { const i = y * W + x; let v = d[i]; if (x < W - 1) v = Math.min(v, d[i + 1] + 10); if (y < H - 1) { v = Math.min(v, d[i + W] + 10); if (x < W - 1) v = Math.min(v, d[i + W + 1] + 14); if (x > 0) v = Math.min(v, d[i + W - 1] + 14); } d[i] = v; }
    return ps.map(([pd, bx]) => {
      const w = mk(); w.strokeStyle = '#000'; w.lineWidth = 20; w.stroke(new Path2D(pd));   // reaches the middle of a pupil
      const m = w.getImageData(0, 0, W, H).data; let best = 0;
      for (let i = 0; i < N; i++) { if (!inkm[i] || !(m[i * 4 + 3] > 128) || d[i] <= best) continue; const x = i % W, y = (i / W) | 0; if (x >= bx.x0 - 6 && x <= bx.x1 + 6 && y >= bx.y0 - 6 && y <= bx.y1 + 6) best = d[i]; }
      return best / 10;
    });
  }, rec.ink, cand.map((c) => [c[2], c[3]]), rec.w || 600, rec.h || 560);
  let eyes = 0;
  cand.forEach(([kind, i], k) => { const p = rec[kind][i]; p.eyeDepth = +depth[k].toFixed(1); p.eye = depth[k] >= EYE_DEPTH; delete p.eyeShare; delete p.eyeHolds; if (p.eye) eyes++; });
  return eyes;
}

/**
 * which of the parts touch the paper around the animal or the ground it stands on (a paw, a hoof, a beak, an ear tip do;
 * a spot, an inner ear, a belly patch do not): each part's outline, widened past the drawing's ink, is laid over the
 * outside and the ground, read in the browser
 */
async function touchingExterior(page, rec, own) {
  const ext = rec.parts.filter((q) => q.outside || q.fixed).map((q) => q.d);
  return page.evaluate((ext, ds, W, H) => {
    const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c.getContext('2d', { willReadFrequently: true }); };
    const g = mk(); g.fillStyle = '#000';
    for (const d of ext) g.fill(new Path2D(d), 'evenodd');
    const base = g.getImageData(0, 0, W, H).data;
    return ds.map((d) => {
      const h = mk(); const p = new Path2D(d);
      h.fillStyle = '#000'; h.strokeStyle = '#000'; h.lineWidth = 16; h.lineJoin = 'round';
      h.fill(p, 'evenodd'); h.stroke(p);
      const m = h.getImageData(0, 0, W, H).data;
      let n = 0; for (let k = 3; k < m.length; k += 4) if (m[k] > 128 && base[k] > 128 && ++n > 6) return true;
      return false;
    });
  }, ext, own.map((q) => q.d), rec.w || 600, rec.h || 600);
}

/**
 * an animal's crayons (2026-11-08, read on every key): the animal is its main colour, and so is every part shaped like a
 * big one (the far leg of a four-legged animal). Its markings — small parts enclosed by the animal (spots, inner ears, a
 * belly patch, a nose) — share ONE accent; its small outer parts — those touching the paper or the ground (paws, hooves, a
 * beak, feet) — share ONE second accent (crayons.js NOUN_ACCENT can fix it per animal). Two parts of one kind can therefore
 * never differ (one yellow ear, one orange), and a paw is never mistaken for a marking (one pink paw) — the box test used
 * before counted a paw at the edge of the body as "inside" it.
 */
function creatureHero(own, list, touch, bird) {
  const total = own.reduce((a, q) => a + q.area, 0) || 1;
  const box = own.map((q) => boxOf(q.d));
  const alike = (i, j) => { const ra = Math.min(own[i].area, own[j].area) / Math.max(own[i].area, own[j].area); const rw = Math.min(box[i].w, box[j].w) / Math.max(box[i].w, box[j].w); const rh = Math.min(box[i].h, box[j].h) / Math.max(box[i].h, box[j].h); return ra >= 0.5 && rw >= 0.5 && rh >= 0.5; };
  const big0 = own.map((q, i) => i === 0 || q.area / total >= 0.03);
  // a small part shaped like a big one (the far leg of a four-legged animal) is the same kind of part: body colour
  const big = own.map((q, i) => big0[i] || own.some((p, j) => j !== i && big0[j] && alike(i, j)));
  const out = own.map((q, i) => (big[i] ? list[0] : null));
  let next = 1;
  // an enclosed part down at foot level is a limb seen between other limbs (a far leg under the belly), not a marking:
  // read on the keys, as a marking it came out as one pink leg on elephants, hippos and koalas
  const top = Math.min(...box.map((b) => b.y0)), bottom = Math.max(...box.map((b) => b.y1));
  const atFeet = (i) => box[i].y1 >= bottom - 0.1 * (bottom - top);
  // ...and so is a TALL part reaching the ground (a far leg); a flat one (a hoof, a paw, a duck's foot) keeps its accent
  const tallLeg = (i) => box[i].h >= 0.12 * (bottom - top) && box[i].h >= 0.8 * box[i].w;
  own.forEach((q, i) => { if (!big[i] && atFeet(i) && (!touch[i] || tallLeg(i) || !bird)) { big[i] = true; out[i] = list[0]; } });
  const marking = own.map((q, i) => !big[i] && !touch[i]);
  if (marking.some(Boolean)) { const c = list[next++]; own.forEach((q, i) => { if (marking[i]) out[i] = c; }); }
  // every small outer part (ears, paws, a beak, hooves) shares ONE second accent, so a pair can never differ
  if (own.some((q, i) => !out[i])) { const c = list.outer || list[Math.min(next++, list.length - 1)]; own.forEach((q, i) => { if (!out[i]) out[i] = c; }); }
  return out;
}

async function worker(ids) {
  const puppeteer = require('puppeteer');
  const { build, levelOf, clearCache } = require('../data/cbn/designs.js');
  const R = require('../lib/cbn-render.js');
  const { crayonsFor } = require('../data/fl/crayons.js');
  const { groupOfTheme } = require('../data/fl/groups.js');
  const { LINEART } = require('../data/fl/designs-all.js');
  const srcOf = new Map(LINEART.map((d) => [d.id, d.items[0].src]));
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent('<html><body></body></html>');
  let ok = 0, bad = 0;
  for (const id of ids) {
    const f = path.join(DIR, id + '.json');
    const rec = JSON.parse(fs.readFileSync(f, 'utf8'));
    const src = srcOf.get(id); const j = src.indexOf('/'), theme = src.slice(0, j), noun = src.slice(j + 1);
    const grp = groupOfTheme.get(theme);
    const own = rec.parts.filter((q) => q.hero && !q.fixed && !q.outside);
    const base = noun.replace(/_\d+$/, '');
    // an animal is coloured as an animal in any theme (an Easter sheep, a Christmas reindeer, a toy duck) — read on the keys
    // 2026-11-08, the object rule gave the Easter sheep pink legs; food stays food (a roast turkey)
    const animal = CREATURES.has(grp) || (grp !== 'food' && ANIMAL_ELSEWHERE.test(base));
    rec.hero = animal ? creatureHero(own, crayonsFor(noun, grp), await touchingExterior(page, rec, own), grp === 'birds' || BIRD.test(base)) : heroOf(rec, crayonsFor(noun, grp));
    await eyeFlags(page, rec);
    delete rec.fewColours;
    delete rec.labels; delete rec.num; delete rec.ok; delete rec.fails; delete rec.level;
    fs.writeFileSync(f, JSON.stringify(rec));
    clearCache();
    const d = { id, kind: 'picture' };
    try {
      const art = build(d);
      const level = levelOf(d);
      const pieces = await R.labelArt(page, art);
      const g = R.labelsAndGate(art, pieces, level);
      const solid = await R.checkSolid(page, art);
      for (const sf of solid) g.fails.push(sf.msg);
      rec.labels = g.labels.map((l) => [+l.x.toFixed(1), +l.y.toFixed(1), +l.r.toFixed(1), l.n]);
      rec.num = g.num; rec.level = level; rec.ok = !g.fails.length; rec.fails = g.fails.slice(0, 3);
      if (rec.ok) ok++; else bad++;
    } catch (e) { rec.ok = false; rec.fails = [String(e.message).slice(0, 120)]; bad++; }
    fs.writeFileSync(f, JSON.stringify(rec));
  }
  await browser.close();
  console.log(`worker: ${ok} ok, ${bad} failed`);
}

const list = arg('list');
if (list) worker(fs.readFileSync(list, 'utf8').split(',').filter(Boolean)).catch((e) => { console.error(e); process.exit(1); });
else {
  const N = +arg('workers', 6);
  const only = arg('only') ? arg('only').split(',') : null;
  const ids = only || fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => f.slice(0, -5));
  for (let w = 0; w < N; w++) {
    const lf = path.join(process.env.TEMP || '/tmp', `fl-cbn2-${w}.txt`);
    fs.writeFileSync(lf, ids.filter((_, i) => i % N === w).join(','));
    const c = spawn(process.execPath, [__filename, '--list=' + lf], { stdio: ['ignore', fs.openSync(lf + '.log', 'w'), fs.openSync(lf + '.err', 'w')] });
    c.on('exit', (code) => console.log(`worker ${w} done (${code})`));
  }
}
