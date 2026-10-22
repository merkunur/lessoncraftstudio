/* =====================================================================
   rewind-rail-core.js — the model of ACTIVITY #74 of the one-by-one
   rebuild: "Snippy's Letter Trace" → THE REWIND RAIL (L.K.1.a, 11 locales).
   Design sheet: docs/activities-rebuild/designs/074-snippy.md
   ---------------------------------------------------------------------
   THE INVENTION: the child's letter is RECORDED as it is written, and it
   plays back beside Snippy's model. The snail on the rail is the knob of
   both replays: drag it and the two letters un-write and re-write in step.
   The rail fills with one colour band per stroke — the child's on the top
   track, Snippy's below — so a wrong start, a stroke the other way or the
   strokes in another order are SEEN, like two barcodes that do not match.
   A wobbly letter with the right start, direction and order is a perfect
   letter here. Letters only (both cases); words and sentences belong to
   New #218 Word Ribbon (RULINGS: row 73 owns the letters, #218 the words).

   THREE STEPS per letter: guided (road + numbered start dots + arrows) →
   checkpointed (road, the next start dot, no numbers) → on my own (no road;
   EVERY start dot shown, unnumbered and unordered — the old Snippy
   anti-cheat). The first two are judged by the shared live tracer
   (stroke-trace-core.js, read-only) and end with the rewind as a showing;
   only "on my own" is graded, by the ALIGNMENT below.
   ALIGNMENT: every recorded stroke is matched to the model stroke it lies on
   (mean distance over the flattened model path); its direction is the sign
   of the arc length it walked along that stroke (unwrapped on a ring); its
   start is its first point; the order is the drawing order. The first
   disagreement in time is the one the bubble names.
   GLYPHS: the 52 of alphabet-trace-core.js + the locale letters composed by
   writing-carriage-core.js (both read-only). WORDS: one library picture per
   letter and locale whose label carries the letter (built at build time).
   No DOM. UMD: window.RewindRailCore / module.exports.
   ===================================================================== */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    var W = root && root.WritingCarriageCore, S = root && root.StrokeTraceCore;
    if (!W) W = require('./writing-carriage-core.js');
    if (!S) S = W.Trace || require('./stroke-trace-core.js').StrokeTraceCore;
    module.exports = factory(W, S);
  } else root.RewindRailCore = factory(root.WritingCarriageCore, root.StrokeTraceCore);
}(typeof self !== 'undefined' ? self : this, function (W, S) {
  'use strict';

  /*DATA-BEGIN*/
  /* one library picture per letter and locale whose label carries the letter: [theme dir, key] (capitals: the label starts with it; lowercase: it starts the lowercased label, in de it stands inside the noun) */
  var WORDS = {"en":{"A":["fruits","apple"],"B":["animals","bat"],"C":["animals","cat"],"D":["animals","dog"],"E":["animals","elephant"],"F":["animals","fox"],"G":["farm animals","goat"],"H":["farm animals","hen"],"I":["animals","iguana"],"J":["kitchen tools","jar"],"K":["toys","kite"],"L":["animals","leopard"],"M":["pets","mouse"],"N":["spring","nest"],"O":["fruits","orange"],"P":["animals","pig"],"Q":["birds 2","quail"],"R":["animals","rabbit"],"S":["animals","swan"],"T":["animals","turtle"],"U":["accessories","umbrella"],"V":["music","violin"],"W":["animals","wolf"],"X":["music","xylophone"],"Y":["vehicles","yacht"],"Z":["animals","zebra"],"a":["fruits","apple"],"b":["animals","bat"],"c":["animals","cat"],"d":["animals","dog"],"e":["animals","elephant"],"f":["animals","fox"],"g":["farm animals","goat"],"h":["farm animals","hen"],"i":["animals","iguana"],"j":["kitchen tools","jar"],"k":["toys","kite"],"l":["animals","leopard"],"m":["pets","mouse"],"n":["spring","nest"],"o":["fruits","orange"],"p":["animals","pig"],"q":["birds 2","quail"],"r":["animals","rabbit"],"s":["animals","swan"],"t":["animals","turtle"],"u":["accessories","umbrella"],"v":["music","violin"],"w":["animals","wolf"],"x":["music","xylophone"],"y":["vehicles","yacht"],"z":["animals","zebra"]},"de":{"A":["fruits","apple"],"B":["farm animals","bee"],"C":["around the house","computer"],"D":["animals","dolphin"],"E":["animals","elephant"],"F":["animals","fox"],"G":["animals","giraffe"],"H":["animals","dog"],"I":["forest creatures","hedgehog"],"J":["animals","jaguar"],"K":["animals","camel"],"L":["animals","iguana"],"M":["pets","mouse"],"N":["animals","hippopotamus"],"O":["fruits","orange"],"P":["animals","penguin"],"Q":["ocean life","jellyfish"],"R":["toys","robot"],"T":["animals","tiger"],"U":["around the house","clock"],"V":["spring","bird"],"W":["animals","whale"],"X":["music","xylophone"],"Z":["animals","zebra"],"a":["animals","whale"],"b":["animals","zebra"],"d":["animals","dog"],"e":["animals","dolphin"],"f":["animals","horse"],"g":["animals","tiger"],"i":["animals","fish"],"j":["camping","kayak"],"k":["farm animals","chick"],"l":["animals","moose"],"m":["animals","camel"],"n":["animals","duck"],"o":["animals","wolf"],"p":["animals","woodpecker"],"r":["pets","frog"],"s":["animals","donkey"],"t":["farm animals","bull"],"u":["animals","dog"],"v":["fruits","avocado"],"w":["vegetables","onion"],"x":["vehicles","taxi"],"y":["toys","baby"],"z":["animals","cat"],"ä":["toys","girl"],"ö":["animals","seagull"],"ü":["farm animals","chick"],"ß":["birds","ostrich"]},"nl":{"A":["fruits","apple"],"B":["farm animals","bee"],"C":["fruits","lemon"],"D":["animals","dolphin"],"E":["animals","donkey"],"F":["pets","ferret"],"G":["farm animals","goat"],"H":["animals","dog"],"I":["winter","igloo"],"J":["animals","jaguar"],"K":["animals","cat"],"L":["animals","iguana"],"M":["pets","mouse"],"N":["spring","nest"],"O":["animals","elephant"],"P":["animals","horse"],"R":["vegetables","radish"],"S":["animals","sheep"],"T":["animals","tiger"],"U":["animals","owl"],"V":["animals","fish"],"W":["animals","wolf"],"X":["music","xylophone"],"Z":["animals","zebra"],"a":["fruits","apple"],"b":["farm animals","bee"],"c":["fruits","lemon"],"d":["animals","dolphin"],"e":["animals","donkey"],"f":["pets","ferret"],"g":["farm animals","goat"],"h":["animals","dog"],"i":["winter","igloo"],"j":["animals","jaguar"],"k":["animals","cat"],"l":["animals","iguana"],"m":["pets","mouse"],"n":["spring","nest"],"o":["animals","elephant"],"p":["animals","horse"],"r":["vegetables","radish"],"s":["animals","sheep"],"t":["animals","tiger"],"u":["animals","owl"],"v":["animals","fish"],"w":["animals","wolf"],"x":["music","xylophone"],"z":["animals","zebra"]},"da":{"A":["animals","duck"],"B":["farm animals","bee"],"C":["fruits","lemon"],"D":["animals","dolphin"],"E":["animals","elephant"],"F":["animals","sheep"],"G":["animals","pig"],"H":["animals","dog"],"I":["winter","igloo"],"J":["animals","jaguar"],"K":["animals","cat"],"L":["animals","iguana"],"M":["pets","mouse"],"N":["ocean life","narwhal"],"O":["farm animals","ox"],"P":["animals","panda"],"R":["animals","fox"],"S":["animals","swan"],"T":["animals","tiger"],"U":["animals","wolf"],"V":["vehicles","van"],"X":["music","xylophone"],"Z":["animals","zebra"],"Æ":["animals","donkey"],"Ø":["forest creatures","eagle"],"a":["animals","duck"],"b":["farm animals","bee"],"c":["fruits","lemon"],"d":["animals","dolphin"],"e":["animals","elephant"],"f":["animals","sheep"],"g":["animals","pig"],"h":["animals","dog"],"i":["winter","igloo"],"j":["animals","jaguar"],"k":["animals","cat"],"l":["animals","iguana"],"m":["pets","mouse"],"n":["ocean life","narwhal"],"o":["farm animals","ox"],"p":["animals","panda"],"r":["animals","fox"],"s":["animals","swan"],"t":["animals","tiger"],"u":["animals","wolf"],"v":["vehicles","van"],"x":["music","xylophone"],"z":["animals","zebra"],"æ":["animals","donkey"],"ø":["forest creatures","eagle"]},"sv":{"A":["animals","duck"],"B":["fruits","banana"],"C":["fruits","lemon"],"D":["animals","dolphin"],"E":["animals","elephant"],"F":["animals","sheep"],"G":["animals","vulture"],"H":["animals","dog"],"I":["forest creatures","hedgehog"],"J":["animals","jaguar"],"K":["animals","cat"],"L":["animals","iguana"],"M":["pets","mouse"],"N":["ocean life","narwhal"],"O":["breakfast","cheese"],"P":["animals","panda"],"R":["animals","fox"],"S":["animals","swan"],"T":["animals","tiger"],"U":["animals","owl"],"V":["animals","whale"],"X":["music","xylophone"],"Å":["animals","donkey"],"Ä":["animals","moose"],"Ö":["pets","lizard"],"a":["animals","duck"],"b":["fruits","banana"],"c":["fruits","lemon"],"d":["animals","dolphin"],"e":["animals","elephant"],"f":["animals","sheep"],"g":["animals","vulture"],"h":["animals","dog"],"i":["forest creatures","hedgehog"],"j":["animals","jaguar"],"k":["animals","cat"],"l":["animals","iguana"],"m":["pets","mouse"],"n":["ocean life","narwhal"],"o":["breakfast","cheese"],"p":["animals","panda"],"r":["animals","fox"],"s":["animals","swan"],"t":["animals","tiger"],"u":["animals","owl"],"v":["animals","whale"],"x":["music","xylophone"],"å":["animals","donkey"],"ä":["animals","moose"],"ö":["pets","lizard"]},"no":{"A":["animals","duck"],"B":["farm animals","bee"],"C":["breakfast","croissant"],"D":["animals","dolphin"],"E":["animals","elephant"],"F":["animals","fish"],"G":["farm animals","goat"],"H":["animals","dog"],"I":["winter","igloo"],"J":["animals","jaguar"],"K":["animals","cat"],"L":["animals","iguana"],"M":["pets","mouse"],"N":["ocean life","narwhal"],"O":["farm animals","bull"],"P":["animals","panda"],"R":["animals","fox"],"S":["animals","sheep"],"T":["animals","tiger"],"U":["animals","wolf"],"V":["fruits","watermelon"],"X":["music","xylophone"],"Ø":["pets","lizard"],"a":["animals","duck"],"b":["farm animals","bee"],"c":["breakfast","croissant"],"d":["animals","dolphin"],"e":["animals","elephant"],"f":["animals","fish"],"g":["farm animals","goat"],"h":["animals","dog"],"i":["winter","igloo"],"j":["animals","jaguar"],"k":["animals","cat"],"l":["animals","iguana"],"m":["pets","mouse"],"n":["ocean life","narwhal"],"o":["farm animals","bull"],"p":["animals","panda"],"r":["animals","fox"],"s":["animals","sheep"],"t":["animals","tiger"],"u":["animals","wolf"],"v":["fruits","watermelon"],"x":["music","xylophone"],"ø":["pets","lizard"]},"es":{"A":["animals","moose"],"B":["animals","owl"],"C":["animals","rabbit"],"D":["animals","dolphin"],"E":["animals","elephant"],"F":["fruits","strawberry"],"G":["animals","cat"],"H":["pets","ferret"],"I":["animals","iguana"],"J":["animals","giraffe"],"K":["animals","koala"],"L":["animals","wolf"],"M":["animals","raccoon"],"N":["fruits","orange"],"O":["animals","sheep"],"P":["animals","duck"],"Q":["breakfast","cheese"],"R":["pets","frog"],"S":["fruits","watermelon"],"T":["animals","turtle"],"V":["farm animals","cow"],"W":["bakery","waffle"],"X":["music","xylophone"],"Y":["vehicles","yacht"],"Z":["animals","fox"],"a":["animals","moose"],"b":["animals","owl"],"c":["animals","rabbit"],"d":["animals","dolphin"],"e":["animals","elephant"],"f":["fruits","strawberry"],"g":["animals","cat"],"h":["pets","ferret"],"i":["animals","iguana"],"j":["animals","giraffe"],"k":["animals","koala"],"l":["animals","wolf"],"m":["animals","raccoon"],"n":["fruits","orange"],"o":["animals","sheep"],"p":["animals","duck"],"q":["breakfast","cheese"],"r":["pets","frog"],"s":["fruits","watermelon"],"t":["animals","turtle"],"v":["farm animals","cow"],"w":["bakery","waffle"],"x":["music","xylophone"],"y":["vehicles","yacht"],"z":["animals","fox"]},"it":{"A":["animals","moose"],"B":["animals","whale"],"C":["animals","dog"],"D":["animals","dolphin"],"E":["animals","elephant"],"F":["pets","ferret"],"G":["animals","owl"],"H":["winter","hockey"],"I":["animals","iguana"],"J":["vehicles","jet"],"K":["animals","koala"],"L":["animals","wolf"],"M":["animals","pig"],"N":["vehicles","ship"],"O":["forest creatures","bear"],"P":["animals","fish"],"Q":["birds 2","quail"],"R":["pets","frog"],"S":["ocean life","shark"],"T":["animals","turtle"],"U":["spring","bird"],"V":["animals","fox"],"W":["bakery","waffle"],"X":["music","xylophone"],"Y":["vehicles","yacht"],"Z":["animals","zebra"],"a":["animals","moose"],"b":["animals","whale"],"c":["animals","dog"],"d":["animals","dolphin"],"e":["animals","elephant"],"f":["pets","ferret"],"g":["animals","owl"],"h":["winter","hockey"],"i":["animals","iguana"],"j":["vehicles","jet"],"k":["animals","koala"],"l":["animals","wolf"],"m":["animals","pig"],"n":["vehicles","ship"],"o":["forest creatures","bear"],"p":["animals","fish"],"q":["birds 2","quail"],"r":["pets","frog"],"s":["ocean life","shark"],"t":["animals","turtle"],"u":["spring","bird"],"v":["animals","fox"],"w":["bakery","waffle"],"x":["music","xylophone"],"y":["vehicles","yacht"],"z":["animals","zebra"]},"pt":{"A":["animals","moose"],"B":["animals","donkey"],"C":["animals","koala"],"D":["Things That Fly","dragon"],"E":["animals","elephant"],"F":["pets","ferret"],"G":["animals","cat"],"I":["animals","iguana"],"J":["vehicles","jeep"],"K":["fruits","kiwi"],"L":["animals","wolf"],"M":["animals","bat"],"N":["vehicles","ship"],"O":["animals","sheep"],"P":["animals","pig"],"Q":["breakfast","cheese"],"R":["animals","fox"],"S":["vehicles","submarine"],"T":["animals","turtle"],"U":["forest creatures","bear"],"V":["farm animals","cow"],"W":["bakery","waffle"],"X":["music","xylophone"],"Z":["animals","zebra"],"a":["animals","moose"],"b":["animals","donkey"],"c":["animals","koala"],"d":["Things That Fly","dragon"],"e":["animals","elephant"],"f":["pets","ferret"],"g":["animals","cat"],"i":["animals","iguana"],"j":["vehicles","jeep"],"k":["fruits","kiwi"],"l":["animals","wolf"],"m":["animals","bat"],"n":["vehicles","ship"],"o":["animals","sheep"],"p":["animals","pig"],"q":["breakfast","cheese"],"r":["animals","fox"],"s":["vehicles","submarine"],"t":["animals","turtle"],"u":["forest creatures","bear"],"v":["farm animals","cow"],"w":["bakery","waffle"],"x":["music","xylophone"],"z":["animals","zebra"]},"fr":{"A":["farm animals","bee"],"B":["animals","whale"],"D":["animals","dolphin"],"E":["insects and bugs","snail"],"F":["pets","ferret"],"G":["animals","giraffe"],"H":["animals","owl"],"I":["animals","iguana"],"J":["animals","jaguar"],"K":["animals","koala"],"L":["animals","wolf"],"M":["animals","sheep"],"N":["beach","cloud"],"O":["fruits","orange"],"P":["animals","fish"],"R":["animals","fox"],"S":["pets","mouse"],"T":["animals","turtle"],"V":["farm animals","cow"],"X":["music","xylophone"],"Y":["vehicles","yacht"],"Z":["animals","zebra"],"a":["farm animals","bee"],"b":["animals","whale"],"d":["animals","dolphin"],"e":["insects and bugs","snail"],"f":["pets","ferret"],"g":["animals","giraffe"],"h":["animals","owl"],"i":["animals","iguana"],"j":["animals","jaguar"],"k":["animals","koala"],"l":["animals","wolf"],"m":["animals","sheep"],"n":["beach","cloud"],"o":["fruits","orange"],"p":["animals","fish"],"r":["animals","fox"],"s":["pets","mouse"],"t":["animals","turtle"],"v":["farm animals","cow"],"x":["music","xylophone"],"y":["vehicles","yacht"],"z":["animals","zebra"]},"fi":{"A":["animals","donkey"],"B":["fruits","banana"],"C":["breakfast","croissant"],"D":["animals","dolphin"],"E":["insects and bugs","snail"],"F":["pets","ferret"],"G":["pets","gecko"],"H":["animals","moose"],"I":["around the house","window"],"J":["animals","swan"],"K":["animals","fish"],"L":["animals","seagull"],"M":["fruits","strawberry"],"N":["animals","elephant"],"O":["animals","orangutan"],"P":["animals","penguin"],"R":["vegetables","radish"],"S":["animals","pig"],"T":["vegetables","tomato"],"U":["around the house","oven"],"V":["animals","whale"],"Y":["around the house","nightstand"],"Ä":["toys","bucket"],"a":["animals","donkey"],"b":["fruits","banana"],"c":["breakfast","croissant"],"d":["animals","dolphin"],"e":["insects and bugs","snail"],"f":["pets","ferret"],"g":["pets","gecko"],"h":["animals","moose"],"i":["around the house","window"],"j":["animals","swan"],"k":["animals","fish"],"l":["animals","seagull"],"m":["fruits","strawberry"],"n":["animals","elephant"],"o":["animals","orangutan"],"p":["animals","penguin"],"r":["vegetables","radish"],"s":["animals","pig"],"t":["vegetables","tomato"],"u":["around the house","oven"],"v":["animals","whale"],"y":["around the house","nightstand"],"ä":["toys","bucket"]}};
  /*DATA-END*/

  /* the eight letter sets (design §6): lowercase by family, capitals by line kind; a locale letter joins the set of its base letter */
  var SETS = {
    s1: { level: 'lower', base: ['c', 's', 'i', 't', 'a', 'd', 'j', 'b', 'f'], extra: ['ä', 'å', 'æ', 'ß'] },
    s2: { level: 'lower', base: ['o', 'g', 'q', 'e', 'u', 'l', 'h'], extra: ['ö', 'ø', 'ü'] },
    s3: { level: 'lower', base: ['n', 'm', 'r', 'p', 'k', 'v', 'w'], extra: ['ñ'] },
    s4: { level: 'lower', base: ['b', 'd', 'p', 'q', 'x', 'y', 'z'], extra: [] },
    st: { level: 'upper', base: ['L', 'T', 'I', 'E', 'F', 'H', 'N'], extra: ['Ñ'] },
    sl: { level: 'upper', base: ['A', 'K', 'M', 'V', 'W', 'X', 'Y', 'Z'], extra: ['Ä', 'Å', 'Æ'] },
    cu: { level: 'upper', base: ['C', 'O', 'Q', 'G', 'S', 'U', 'J'], extra: ['Ö', 'Ø', 'Ü'] },
    bs: { level: 'upper', base: ['B', 'D', 'P', 'R', 'J', 'N', 'Z'], extra: [] }
  };
  var SET_KEYS = ['s1', 's2', 's3', 's4', 'st', 'sl', 'cu', 'bs'];
  var STEPS = { all: ['guided', 'ckpt', 'own'], p: ['guided', 'own'], own: ['own'] };
  /* the stroke colours: the same colour for stroke k on both pads and both tracks */
  var COLORS = ['#146B5E', '#F2784B', '#E8A53A', '#8E5BA8', '#3A7BD5', '#5B9E3A'];
  var MATCH = 14;        /* a recorded stroke lies on a model stroke when its mean distance to it is ≤ 14 units (glyph box 100) */
  var START_TOL = 12;    /* "started at its own start": within 0.12 of the box (design §7) */
  var COVER_R = 12;      /* a model point is covered when a matched recorded point passes within 12 units */
  var COVER_MIN = 0.75;  /* a stroke is drawn when ≥ 75 % of it is covered */
  var GAP = 7;           /* the pen lift between two strokes on a timeline, in arc-length units */

  function locale(l) { l = String(l || 'en').slice(0, 2); return W.DATA.ALPHA[l] ? l : 'en'; }
  function setOf(v) { return SETS[v] ? v : 's1'; }
  function stepsOf(v) { return STEPS[v] ? v : 'all'; }
  function dist(a, b) { var dx = a.x - b.x, dy = a.y - b.y; return Math.sqrt(dx * dx + dy * dy); }
  function shuffle(a, rnd) { for (var j = a.length - 1; j > 0; j--) { var k = Math.floor(rnd() * (j + 1)), x = a[j]; a[j] = a[k]; a[k] = x; } return a; }

  /* ---------------- the letters ---------------- */
  /* the letters a set teaches in this locale: its base letters, then the locale letters of its family */
  function letters(loc, set) {
    loc = locale(loc); set = setOf(set);
    var S0 = SETS[set], alpha = W.alphabet(loc, S0.level);
    return S0.base.concat(S0.extra.filter(function (c) { return alpha.indexOf(c) >= 0; }));
  }
  function levelOf(set) { return SETS[setOf(set)].level; }
  function word(loc, ch) { var w = WORDS[locale(loc)]; return (w && w[ch]) ? { theme: w[ch][0], key: w[ch][1] } : null; }
  /* a round: one letter and its steps */
  function round(loc, set, id, steps) {
    loc = locale(loc); set = setOf(set); steps = stepsOf(steps);
    var ch = String(id), g = W.glyph(ch);
    if (!g) throw new Error('no glyph for ' + ch);
    return { id: ch, loc: loc, set: set, level: SETS[set].level, letter: ch, strokes: g, box: W.bbox(g), kinds: STEPS[steps].slice(), word: word(loc, ch) };
  }
  /* every pass is an order-only reshuffle: never the last order, never its last letter first */
  function plan(loc, set, rnd, prev) {
    var all = letters(loc, set);
    for (var t = 0; t < 2000; t++) {
      var o = shuffle(all.slice(), rnd);
      if (prev && prev.length && (prev.join() === o.join() || prev[prev.length - 1] === o[0])) continue;
      return o;
    }
    return shuffle(all.slice(), rnd);
  }

  /* ---------------- the model and its timeline ---------------- */
  var LANE_CACHE = {};
  function lanes(strokes) { var k = JSON.stringify(strokes); return LANE_CACHE[k] || (LANE_CACHE[k] = S.prepare(strokes)); }
  function isRing(L) { return !L.isDot && L.pts.length > 3 && dist(L.pts[0], L.pts[L.pts.length - 1]) < 1.2; }
  function polyLen(pts) { var s = 0; for (var i = 1; i < pts.length; i++) s += dist(pts[i - 1], pts[i]); return s; }
  /* a timeline: each stroke's arc length in turn, a pen lift (GAP) between strokes, normalised to 0..1 */
  function timeline(polys) {
    var segs = [], t = 0;
    polys.forEach(function (p, i) { var len = Math.max(polyLen(p), 3); if (i) t += GAP; segs.push({ i: i, from: t, to: t + len, len: len }); t += len; });
    var T = t || 1;
    segs.forEach(function (s) { s.u0 = s.from / T; s.u1 = s.to / T; });
    return { segs: segs, total: T };
  }
  function modelPolys(strokes) { return lanes(strokes).map(function (L) { return L.pts; }); }
  /* the point a polyline has reached after f (0..1) of its length */
  function along(pts, f) {
    if (!pts.length) return null;
    var want = polyLen(pts) * Math.max(0, Math.min(1, f)), s = 0;
    for (var i = 1; i < pts.length; i++) { var d = dist(pts[i - 1], pts[i]); if (s + d >= want) { var k = d ? (want - s) / d : 0; return { x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * k, y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * k, i: i }; } s += d; }
    return { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y, i: pts.length };
  }
  /* scrub: at u (0..1) which strokes are whole, which one is partial and where its spark is */
  function scrub(polys, u) {
    var tl = timeline(polys), out = { done: [], cur: null, frac: 0, spark: null };
    for (var k = 0; k < tl.segs.length; k++) {
      var s = tl.segs[k];
      if (u >= s.u1 - 1e-9) { out.done.push(s.i); continue; }
      if (u > s.u0) { out.cur = s.i; out.frac = (u - s.u0) / (s.u1 - s.u0); out.spark = along(polys[s.i], out.frac); }
      break;
    }
    if (out.cur === null && out.done.length) { var lp = polys[out.done[out.done.length - 1]]; out.spark = lp.length ? { x: lp[lp.length - 1].x, y: lp[lp.length - 1].y } : null; }
    if (out.cur === null && !out.done.length && polys.length && polys[0].length) out.spark = { x: polys[0][0].x, y: polys[0][0].y };
    return out;
  }
  /* a part of a polyline (0..f) for drawing the partial stroke */
  function partial(pts, f) { var a = along(pts, f); if (!a) return []; return pts.slice(0, Math.max(1, a.i)).concat([{ x: a.x, y: a.y }]); }

  /* ---------------- the alignment ---------------- */
  function nearestOn(L, p) {
    var best = Infinity, bi = 0;
    for (var i = 0; i < L.pts.length; i++) { var d = dist(L.pts[i], p); if (d < best) { best = d; bi = i; } }
    return { d: best, i: bi, u: L.cum[bi] };
  }
  function resample(pts, n) {
    if (pts.length < 2) return pts.slice();
    var len = polyLen(pts), out = [];
    for (var k = 0; k < n; k++) { var a = along(pts, k / (n - 1)); out.push({ x: a.x, y: a.y }); }
    return len ? out : [pts[0]];
  }
  /* match each recorded stroke to the model stroke it lies on, with its direction, start and coverage */
  function align(strokes, rec) {
    var Ls = lanes(strokes);
    return rec.map(function (raw) {
      var pts = resample(raw, 32), len = polyLen(raw), best = null;
      Ls.forEach(function (L, m) {
        var s = 0; pts.forEach(function (p) { s += nearestOn(L, p).d; });
        var d = s / pts.length;
        /* a dot is matched only by a short mark; a long line is never a dot */
        if (L.isDot && len > 16) d += 100;
        if (!L.isDot && len < Math.min(8, L.total * 0.25)) d += 100;
        if (!best || d < best.d) best = { m: m, d: d };
      });
      if (!best || best.d > MATCH) return { match: -1, d: best ? best.d : Infinity, len: len };
      var L = Ls[best.m], ring = isRing(L), walk = 0, prev = null;
      pts.forEach(function (p) {
        var u = nearestOn(L, p).u;
        if (prev !== null) { var du = u - prev; if (ring && Math.abs(du) > L.total / 2) du -= (du > 0 ? 1 : -1) * L.total; walk += du; }
        prev = u;
      });
      var reversed = !L.isDot && walk < 0;
      var startOk = dist(raw[0], L.pts[0]) <= START_TOL;
      var cov = 0; L.pts.forEach(function (q) { for (var j = 0; j < pts.length; j++) if (dist(pts[j], q) <= COVER_R) { cov++; return; } });
      return { match: best.m, d: best.d, len: len, reversed: reversed, startOk: startOk, cover: cov / L.pts.length };
    });
  }
  /* the grade of an "on my own" letter: the first disagreement IN TIME (drawing order), else ok */
  function grade(strokes, rec) {
    var n = lanes(strokes).length, al = align(strokes, rec), want = 0, covered = [];
    for (var i = 0; i < al.length; i++) {
      var a = al[i];
      if (a.match < 0) return { ok: false, kind: 'shape', child: i, model: want, al: al };
      if (a.match < want) { covered[a.match] = Math.max(covered[a.match] || 0, a.cover); continue; }   /* going over a finished stroke again: no harm */
      if (a.match > want) return { ok: false, kind: 'order', child: i, model: want, al: al };
      if (a.reversed) return { ok: false, kind: 'direction', child: i, model: want, al: al };
      if (!a.startOk) return { ok: false, kind: 'start', child: i, model: want, al: al };
      if (a.cover < COVER_MIN) return { ok: false, kind: 'shape', child: i, model: want, al: al };
      covered[want] = a.cover; want++;
    }
    if (want < n) return { ok: false, kind: 'shape', child: al.length, model: want, al: al };
    return { ok: true, kind: null, child: -1, model: -1, al: al };
  }
  /* the rail bands of a timeline: colour = the model stroke a band lies on, chevrons when it went the other way */
  function bands(polys, al) {
    var tl = timeline(polys);
    return tl.segs.map(function (s) {
      var a = al ? al[s.i] : { match: s.i, reversed: false };
      return { i: s.i, u0: s.u0, u1: s.u1, color: a && a.match >= 0 ? COLORS[a.match % COLORS.length] : null, reversed: !!(a && a.reversed), lost: !(a && a.match >= 0) };
    });
  }
  /* where the rewind stops on a miss: inside the child's offending stroke (a third in), or at the end */
  function stopAt(rec, g) {
    if (g.ok) return 1;
    var tl = timeline(rec);
    if (g.child >= tl.segs.length) return 1;
    var s = tl.segs[g.child], f = g.kind === 'start' ? 0.06 : 0.35;
    return s.u0 + (s.u1 - s.u0) * f;
  }

  /* ---------------- the hand ---------------- */
  function newStep(st) {
    var k = st.kinds[st.step];
    st.tr = k === 'own' ? null : S.newTrace(st.r.strokes, { corridor: S.CORRIDOR });
    st.ink = []; st.cur = null; st.graded = null; st.cleared = false; st.tries = 0;
  }
  function newState(r) {
    var st = { r: r, kinds: r.kinds.slice(), step: 0, misses: 0, help: 0, last: null, done: false, shown: null, ghost: false };
    newStep(st);
    return st;
  }
  function kind(st) { return st.kinds[st.step]; }
  /* the recording: every kept stroke of this step, as points */
  function recording(st) { return st.ink.filter(function (s) { return !s.pale; }).map(function (s) { return s.pts.map(function (p) { return { x: p.x, y: p.y }; }); }); }
  /* finger down. In "on my own" anything may be written (it is recorded and the rewind shows it); the first stroke after a graded miss starts a clean page */
  function down(st, pt) {
    if (st.done || st.shown) return null;
    st.last = null;
    if (kind(st) === 'own') {
      if (st.graded && !st.graded.ok) { st.ink = []; st.graded = null; st.cleared = true; }
      st.help = 0;
      st.cur = { pts: [{ x: pt.x, y: pt.y }] }; st.ink.push(st.cur);
      return { on: true };
    }
    var sp = S.startPoint(st.tr), L = st.tr.lanes[st.tr.idx];
    var at = st.tr.u > 0 ? S.cursorPoint(st.tr) : sp, far = !!at && dist(pt, at) > st.tr.corridor * 1.5;
    st.cur = { pts: [{ x: pt.x, y: pt.y }], from: st.tr.u, idx: st.tr.idx, far: far && !!L && !L.isDot };
    st.ink.push(st.cur);
    return S.sample(st.tr, pt);
  }
  function move(st, pt) {
    if (st.done || st.shown || !st.cur) return null;
    var p0 = st.cur.pts[st.cur.pts.length - 1];
    if (dist(p0, pt) < 0.6) return null;
    st.cur.pts.push({ x: pt.x, y: pt.y });
    return kind(st) === 'own' ? { on: true } : S.sample(st.tr, pt);
  }
  /* finger up: 'stroke' / 'letter' (a guided or checkpointed letter is formed — the rewind shows it) / 'incomplete' / 'recorded' (on my own) */
  function up(st) {
    if (st.done || st.shown || !st.cur) return null;
    var cur = st.cur; st.cur = null;
    if (kind(st) === 'own') { if (st.ink.length > 14) st.ink.shift(); return { res: 'recorded' }; }
    var res = S.endStroke(st.tr);
    if (res === 'incomplete') {
      var Ln = st.tr.lanes[st.tr.idx];
      if (cur.idx === st.tr.idx && cur.pts.length > 3 && Ln && !Ln.isDot && (cur.far || wrongWay(cur, Ln, cur.from))) {
        /* a line begun away from the dot or set off against the arrow keeps no credit (the #73 trap) */
        st.tr.u = cur.from; while (st.tr.i > 0 && Ln.cum[st.tr.i] > cur.from) st.tr.i--; if (!cur.from) st.tr.n = 0;
        cur.pale = true; st.last = { reason: 'wrongEnd' };
      }
      return { res: 'incomplete' };
    }
    if (res === 'stroke-ok') return { res: 'stroke' };
    st.shown = { kind: kind(st), rec: recording(st) };
    return { res: 'letter' };
  }
  function wrongWay(cur, L, u) {
    var p0 = cur.pts[0], v = null, i, k = 0;
    for (i = 1; i < cur.pts.length; i++) { var dx = cur.pts[i].x - p0.x, dy = cur.pts[i].y - p0.y; if (dx * dx + dy * dy >= 36) { v = { x: dx, y: dy }; break; } }
    if (!v) return false;
    while (k + 1 < L.pts.length && L.cum[k] < u) k++;
    var a = L.pts[k], b = L.pts[Math.min(L.pts.length - 1, k + 5)];
    return v.x * (b.x - a.x) + v.y * (b.y - a.y) < 0;
  }
  /* after the showing rewind of a guided/checkpointed letter: the next step */
  function advance(st) {
    if (!st.shown) return false;
    st.shown = null; st.help = 0; st.ghost = false;
    if (st.step + 1 >= st.kinds.length) { st.done = true; st.last = { reason: 'right' }; return true; }
    st.step++; newStep(st);
    return true;
  }
  /* rub out: a clean page; the tries on this letter are kept (rubbing out never dodges the second-miss help) */
  function erase(st) { if (st.done || st.shown) return false; var t = st.tries; newStep(st); st.tries = t; st.last = null; st.help = 0; return true; }
  /* Check. Nothing drawn → a hint, no miss. A guided/checkpointed letter not finished → a hint, no miss (only "on my own" is graded).
     On my own: the grade; a miss names the first disagreement; a second miss turns this letter back into a checkpointed step with the teal spark */
  function check(st) {
    if (st.done) return { ok: true };
    if (st.shown) return { ok: false, reason: 'busy' };
    var drawn = st.ink.length > 0 || (st.tr && st.tr.strokesDone > 0);
    if (!drawn) { st.last = { reason: 'empty' }; return { ok: false, reason: 'empty' }; }
    if (kind(st) !== 'own') { st.last = { reason: 'unfinished' }; return { ok: false, reason: 'unfinished' }; }
    var rec = recording(st), g = grade(st.r.strokes, rec);
    st.graded = { ok: g.ok, kind: g.kind, child: g.child, model: g.model, al: g.al, rec: rec, stop: stopAt(rec, g) };
    if (g.ok) { st.done = true; st.last = { reason: 'right' }; return { ok: true, graded: st.graded }; }
    st.misses++; st.tries++; st.help = Math.min(2, st.tries);
    st.last = { reason: g.kind };
    if (st.tries >= 2) { var keep = st.graded; st.kinds.splice(st.step, 0, 'ckpt'); newStep(st); st.graded = keep; st.ghost = true; st.last = { reason: 'toCkpt', kind: g.kind }; }
    return { ok: false, reason: g.kind, graded: st.graded, back: st.last.reason === 'toCkpt' };
  }
  function hint(st) {
    if (!st.last) return null;
    var L = st.last.reason;
    return ({ empty: 'hEmpty', unfinished: 'hUnfinished', wrongEnd: 'hWrongEnd', start: 'hStart', direction: 'hDirection', order: 'hOrder', shape: 'hShape', toCkpt: 'hMiss2' })[L] || null;
  }
  /* the start dots the pad shows: guided = the next one, numbered, with its arrow; checkpointed = the next one; on my own = every start, unnumbered */
  function startDots(st) {
    if (st.done || st.shown) return [];
    var k = kind(st), Ls = lanes(st.r.strokes);
    if (k === 'own') {
      var out = [];
      Ls.forEach(function (L) { var p = L.pts[0]; if (!out.some(function (q) { return dist(q, p) < 4; })) out.push({ x: p.x, y: p.y }); });
      return out;
    }
    if (st.tr.formed) return [];
    var L = Ls[st.tr.idx]; if (!L) return [];
    var p0 = st.tr.u > 0 ? S.cursorPoint(st.tr) : L.pts[0], q = L.pts[Math.min(L.pts.length - 1, 6)];
    return [{ x: L.pts[0].x, y: L.pts[0].y, n: k === 'guided' ? st.tr.idx + 1 : null, dx: q.x - L.pts[0].x, dy: q.y - L.pts[0].y, arrow: k === 'guided' && !L.isDot, isDot: L.isDot, cursor: p0 }];
  }
  /* the roads a step shows: guided + checkpointed show every stroke not yet traced; on my own shows none */
  function roads(st) {
    if (st.done || st.shown || kind(st) === 'own') return [];
    var Ls = lanes(st.r.strokes), out = [];
    Ls.forEach(function (L, i) { if (i >= st.tr.idx) out.push(i); });
    return out;
  }

  /* the sizes: the glyph box is 0..100 units; one pad per side at ≥ 520 px, one shared pad below */
  function layout(W) {
    var wide = W >= 520, tiny = W < 300, gap = 14;
    var pw = wide ? Math.floor((W - gap) / 2) : W;
    var scale = Math.min(pw / 104, (wide ? 300 : tiny ? 180 : 214) / 102);
    return { mode: wide ? 'wide' : 'narrow', tiny: tiny, W: W, gap: gap, pw: pw, ph: Math.round(102 * scale), scale: scale, vbW: pw / scale, knob: wide ? 96 : 64, pic: wide ? 120 : 64, dot: 9 };
  }

  return {
    DATA: { WORDS: WORDS, SETS: SETS, STEPS: STEPS, COLORS: COLORS }, SET_KEYS: SET_KEYS, MATCH: MATCH, START_TOL: START_TOL, COVER_R: COVER_R, COVER_MIN: COVER_MIN, GAP: GAP,
    locale: locale, setOf: setOf, stepsOf: stepsOf, levelOf: levelOf, letters: letters, word: word, round: round, plan: plan, shuffle: shuffle,
    lanes: lanes, modelPolys: modelPolys, timeline: timeline, scrub: scrub, along: along, partial: partial, polyLen: polyLen, isRing: isRing,
    align: align, grade: grade, bands: bands, stopAt: stopAt,
    newState: newState, kind: kind, recording: recording, down: down, move: move, up: up, advance: advance, erase: erase, check: check, hint: hint, startDots: startDots, roads: roads,
    layout: layout, ruling: W.ruling, Carriage: W, Trace: S
  };
}));
