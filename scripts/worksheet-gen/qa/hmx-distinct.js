#!/usr/bin/env node
/**
 * hmx-distinct.js — the DISTINCTNESS + PICTURE gate of the Maze Puzzles Level Set scenes (2026-10-12).
 *
 * Operator: "You should create original scenes, the scenes shouldn't be similar." Checked on the scene DATA (the
 * renders are read by a person on review sheets as well):
 *   1  every picture exists in the cache with an ink box;
 *   2  colour and black-and-white are never mixed: the colouring face uses B&W themes only, every other face colour only
 *      (the B&W test is `bw(\s+\d+)?$`, numbered themes included);
 *   3  a noun appears once per page (hero, goal, cast, band art, chamber bugs, babies / mothers, holders / flyers, the
 *      collect item, the avoid obstacles) — two snails on one page read as a mistake;
 *   3c a GENERIC name ("the flower", "the tree", "the dinosaur") has no other picture of its kind on the page;
 *   3b no LOOK-ALIKE of the hero or goal shares its page (a sea lion beside "the seal");
 *   4  a hero is used at most twice in the whole set, and never twice on one face; a (hero, goal) pair never twice;
 *      no hero of a PUBLISHED face's scene is reused as a hero;
 *   5  a goal is used at most three times;
 *   6  within one face no two scenes share setting + variant + mirror (the drawn world), and their casts overlap at
 *      most 30 % (Jaccard on nouns);
 *   7  the English titles are unique.
 *   node qa/hmx-distinct.js [--poison]   (--poison: each rule must fire on a deliberately broken copy)
 */
'use strict';
const path = require('path');
const { allSkins, resolveHmx } = require('../lib/hmx.js');
const { SCENES } = require('../data/hm/scenes.js');
const INK = require('../data/hm/ink-boxes.json');
const BW = /\bbw(\s+\d+)?$/i;

const GENERIC = { flower: /^flowers\//, tree: /^tree\//, dinosaur: /^dinosaurs\//, bird: /^birds( 2)?\//, fish: /\/fish$/, boat: /\/(boat|yacht|sailboat|ship|tugboat|canoe|kayak)$/ };
const LOOKALIKE = [['seal', 'sea_lion'], ['turtle', 'tortoise', 'sea_turtle'], ['frog', 'toad'], ['alligator', 'crocodile'], ['rabbit', 'bunny', 'hare'], ['chicken', 'hen', 'rooster'], ['airplane', 'jet', 'paper_airplane'], ['pelican', 'stork'], ['hedgehog', 'porcupine'], ['dog', 'puppy'], ['cat', 'kitten'], ['mouse', 'rat'], ['donkey', 'mule'], ['goat', 'sheep', 'lamb'], ['deer', 'reindeer', 'moose'], ['puffin', 'penguin'], ['duck', 'duckling', 'goose'], ['swan', 'goose']];
const nounOf = (src) => { const [t, n] = String(src).split('/'); const b = n.replace(/_\d+$/, '').replace(/s$/, ''); return t === 'tree' ? b + ' tree' : b; };
function picturesOf(sk) {
  const r = require('../lib/hmx.js').resolveHmx(sk.id, 2);
  const out = [];
  const add = (src, role) => { if (src && String(src).includes('/')) out.push({ src, role }); };
  if (!r.pairs && !r.holders) { add(r.hero && r.hero.src, 'hero'); add(r.goal && r.goal.src, 'goal'); }
  for (const c of r.cast || []) add(c.src, 'cast');
  for (const b of r.bandArt || []) add(b.src, 'band');
  for (const b of (r.chambers && r.chambers.bugs) || []) add(b, 'bug');
  for (const p of r.pairs || []) { add(p.baby, 'baby'); add(p.mother, 'mother'); }
  for (const g of (r.goals || [])) add(g.src, 'flyer');
  for (const hh of (r.holders || [])) add(hh.src, 'holder');
  if (r.labels && r.labels.item) add(r.labels.item, 'item');
  for (const k of (r.labels && r.labels.kinds) || []) add(k, 'obstacle');
  return { r, pics: out };
}

function check(skins, publishedHeroes) {
  const errs = []; const heroUse = new Map(), pairUse = new Set(), goalUse = new Map(), titles = new Map(), worlds = new Map();
  const en = require('../data/hmx/text/en.js');
  const byFace = {};
  for (const sk of skins) {
    const { r, pics } = picturesOf(sk);
    for (const p of pics) if (!INK[p.src]) errs.push(`1 ${sk.id}: no picture ${p.src}`);
    const line = sk.face === 'maze-colouring';
    for (const p of pics) { const theme = p.src.split('/')[0]; if (line !== BW.test(theme)) errs.push(`2 ${sk.id}: ${line ? 'colour' : 'B&W'} picture ${p.src} on a ${line ? 'B&W' : 'colour'} page`); }
    // a flyer repeats on a tangled-lines page only as a different drawing (four kites); a holder once
    const seen = new Map();
    for (const p of pics) { if (p.role === 'flyer') continue; const n = nounOf(p.src); if (seen.has(n)) errs.push(`3 ${sk.id}: "${n}" twice on the page (${seen.get(n)} + ${p.src})`); seen.set(n, p.src); }
    // 3c a GENERIC name ("the flower", "the tree", "the dinosaur") names ONE thing on the page: no other picture of that
    //    kind is drawn (ten-brachio said "the dinosaur" beside three more dinosaurs)
    { const N = require('../tools/level-set/hmx-en-text.js').N[sk.id] || [];
      for (const [i, role] of [[0, 'hero'], [1, 'goal']]) {
        const word = N[i]; const x = r[role] && r[role].src; const kind = word && GENERIC[word.replace(/^(big|tall|little) /, '')]; if (!kind || !x) continue;
        for (const q of pics) if (q.src !== x && q.role !== 'obstacle' && kind.test(q.src)) errs.push(`3 ${sk.id}: "the ${word}" but ${q.src} is one too`);
      } }
    // 3b a LOOK-ALIKE of the hero or goal on the same page (a sea lion beside "the seal", a toad beside "the frog")
    //    leaves a child asking which one the sentence means
    if (!/^(babies|tangled)/.test(sk.face) && !r.pairs) for (const role of ['hero', 'goal']) {
      const x = r[role] && r[role].src; if (!x) continue; const g = LOOKALIKE.find((grp) => grp.includes(nounOf(x))); if (!g) continue;
      for (const p of pics) if (p.src !== x && p.role !== role && g.includes(nounOf(p.src)) && nounOf(p.src) !== nounOf(x)) errs.push(`3 ${sk.id}: ${p.src} looks like the ${role} ${x}`);
    }
    if (r.hero && r.hero.src && !/^(babies|tangled)/.test(sk.face) && !r.pairs) {
      const h = r.hero.src; const u = heroUse.get(h) || []; u.push(sk); heroUse.set(h, u);
      if (publishedHeroes.has(h)) errs.push(`4 ${sk.id}: hero ${h} is a published face's hero`);
      const pk = h + '>' + (r.goal && r.goal.src); if (pairUse.has(pk)) errs.push(`4 ${sk.id}: hero/goal pair ${pk} twice`); pairUse.add(pk);
      if (r.goal && r.goal.src) goalUse.set(r.goal.src, (goalUse.get(r.goal.src) || 0) + 1);
    }
    const t = en[sk.id] && en[sk.id].title; if (t) { if (titles.has(t)) errs.push(`7 ${sk.id}: title "${t}" also on ${titles.get(t)}`); titles.set(t, sk.id); }
    const world = sk.face + '|' + sk.setting + '|' + JSON.stringify(sk.motifs || '') + '|' + JSON.stringify(sk.band || '') + '|' + sk.field;
    if (worlds.has(world)) errs.push(`6 ${sk.id}: the same drawn world as ${worlds.get(world)}`); worlds.set(world, sk.id);
    (byFace[sk.face] = byFace[sk.face] || []).push({ id: sk.id, nouns: new Set(pics.filter((p) => p.role === 'cast').map((p) => nounOf(p.src))) });
  }
  for (const [h, u] of heroUse) {
    if (u.length > 2) errs.push(`4 hero ${h} used ${u.length} times (${u.map((s) => s.id).join(', ')})`);
    const faces = u.map((s) => s.face); if (new Set(faces).size < faces.length) errs.push(`4 hero ${h} twice on one face`);
  }
  for (const [g, n] of goalUse) if (n > 3) errs.push(`5 goal ${g} used ${n} times`);
  for (const [face, list] of Object.entries(byFace)) for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) {
    const a = list[i].nouns, b = list[j].nouns; if (!a.size || !b.size) continue;
    const inter = [...a].filter((x) => b.has(x)).length, uni = new Set([...a, ...b]).size;
    if (inter / uni > 0.3) errs.push(`6 ${face}: ${list[i].id} and ${list[j].id} share ${Math.round(100 * inter / uni)}% of their cast`);
  }
  return errs;
}

const PUBLISHED_HEROES = new Set(Object.values(SCENES).map((s) => s.hero && s.hero.src).filter(Boolean));
const skins = allSkins();
if (process.argv.includes('--poison')) {
  // every rule must fire on a broken copy
  const b = JSON.parse(JSON.stringify(skins.slice(0, 40)));
  const k0 = b.find((s) => s.face === 'base');
  const cases = [
    ['1', (x) => { x.find((s) => s.face === 'base').cast.push({ src: 'animals/unicorn', h: 40 }); }],
    ['2', (x) => { x.find((s) => s.face === 'base').cast.push({ src: 'animals bw 5/bee', h: 40 }); }],
    ['3', (x) => { const s = x.find((q) => q.face === 'base'); s.cast.push({ src: s.hero.src, h: 40 }); }],
    ['3', (x) => { const s = x.find((q) => q.face === 'base'); s.hero = { src: 'winter/seal', h: 60 }; s.cast.push({ src: 'zoo animals/sea_lion', h: 40 }); }],
    ['3', (x) => { const s = x.find((q) => q.id === 'hmx-jungle-sloth'); s.cast.push({ src: 'tree/oak', h: 60 }); }],
    ['4', (x) => { const s = x.filter((q) => q.face === 'base'); s[1].hero = { ...s[0].hero }; }],
    ['6', (x) => { const s = x.filter((q) => q.face === 'base'); s[1].setting = s[0].setting; s[1].motifs = s[0].motifs; s[1].band = s[0].band; s[1].field = s[0].field; }],
  ];
  let bad = 0;
  for (const [rule, mut] of cases) {
    const copy = JSON.parse(JSON.stringify(b)); mut(copy);
    const m = require('../lib/hmx.js'); const orig = m.allSkins; const mods = new Map(copy.map((s) => [s.id, s]));
    // check() resolves through lib/hmx.js: lend it the broken copies
    const hm = require.cache[require.resolve('../lib/hmx.js')].exports; const r0 = hm.resolveHmx;
    hm.resolveHmx = (u, d) => { const s = mods.get(u); if (!s) return r0(u, d); const base = SCENES[require('../data/b8/maze-puzzles.js').FACES[s.face].scene]; return { ...base, ...s, bandArt: s.bandArt || [] }; };
    const errs = check(copy, PUBLISHED_HEROES).filter((e) => e.startsWith(rule + ' '));
    hm.resolveHmx = r0; void orig;
    console.log('poison rule ' + rule + ': ' + (errs.length ? 'fires (' + errs[0].slice(0, 90) + ')' : 'DID NOT FIRE'));
    if (!errs.length) bad++;
  }
  process.exit(bad ? 1 : 0);
}
const errs = check(skins, PUBLISHED_HEROES);
errs.forEach((e) => console.log(' - ' + e));
console.log(skins.length + ' scenes: ' + (errs.length ? errs.length + ' problems' : 'distinct, pictures clean'));
process.exit(errs.length ? 1 : 0);
