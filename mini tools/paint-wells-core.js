/* =====================================================================
   paint-wells-core.js — the model for ACTIVITY #110 of the one-by-one
   rebuild: "Build Blend and Digraph Words" → THE PAINT WELLS (RF.1.3).
   Design: docs/activities-rebuild/designs/110-cvc-builder.md
   ---------------------------------------------------------------------
   Every letter is a drop of its own colour of paint. Pour the letters of
   the picture's word into six wells, one well for each sound: letters
   that make ONE sound together (sh, ch, ck, ng, sch, ll…) share a well
   and mix into one new colour; letters that keep their own sounds (the
   f and r of frog) refuse to mix — poured into one well, they split.
   Three clues: Pour the word (a tray of droppers: the word's letters plus
   three traps), Team jars (the word poured but one team; pick the jar),
   Sentence (tap every word that holds sh; en only).
   · Every word is a row of mini tools/sound-boxes-bank-<loc>.json, split
     exactly as the bank splits it (DATA is generated from the banks by a
     build script; the gate re-reads the banks). Whether two letters share
     a well is decided by THAT WORD's split, never by a pair list (nl schip
     = s · ch · i · p: the s refuses to mix with the ch).
   · Shipped: en de nl sv no es it pt. da / fr have too few consonant-team
     rows with checked pictures; fi has no consonant digraphs to teach.
   Pure and DOM-free; UMD (window.PaintWellsCore / require()).
   ===================================================================== */
(function (root, factory) {
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PaintWellsCore = api;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /*DATA-BEGIN*/var DATA = {"LOCALES":["en","de","nl","sv","no","es","it","pt"],"CLUES":{"en":["pour","jars","sentence"],"de":["pour","jars"],"nl":["pour"],"sv":["pour"],"no":["pour"],"es":["pour"],"it":["pour"],"pt":["pour"]},"words":{"en":{"ship":{"display":"ship","noun":"ship","themeDir":"vehicles","boxes":["sh","i","p"],"traps":["c","e","t"]},"fish":{"display":"fish","noun":"fish","themeDir":"animals","boxes":["f","i","sh"],"traps":["c","e","t"]},"chick":{"display":"chick","noun":"chick","themeDir":"farm animals","boxes":["ch","i","ck"],"traps":["s","e","t"]},"duck":{"display":"duck","noun":"duck","themeDir":"animals","boxes":["d","u","ck"],"traps":["h","o","t"]},"bench":{"display":"bench","noun":"bench","themeDir":"furniture","boxes":["b","e","n","ch"],"traps":["s","i","t"]},"frog":{"display":"frog","noun":"frog","themeDir":"reptiles and Amphibians","boxes":["f","r","o","g"],"traps":["l","h","u"]},"flag":{"display":"flag","noun":"flag","themeDir":"4th of July","boxes":["f","l","a","g"],"traps":["r","h","e"]},"drum":{"display":"drum","noun":"drum","themeDir":"music","boxes":["d","r","u","m"],"traps":["l","h","o"]},"crab":{"display":"crab","noun":"crab","themeDir":"beach","boxes":["c","r","a","b"],"traps":["l","h","e"]},"sock":{"display":"sock","noun":"sock","themeDir":"accessories","boxes":["s","o","ck"],"traps":["h","u","t"]},"ring":{"display":"ring","noun":"ring","themeDir":"accessories","boxes":["r","i","ng"],"traps":["h","e","t"]},"bell":{"display":"bell","noun":"bell","themeDir":"christmas","boxes":["b","e","ll"],"traps":["h","i","t"]},"lock":{"display":"lock","noun":"lock","themeDir":"around the house","boxes":["l","o","ck"],"traps":["h","u","t"]},"vest":{"display":"vest","noun":"vest","themeDir":"accessories","boxes":["v","e","s","t"],"traps":["d","h","i"]},"lamp":{"display":"lamp","noun":"lamp","themeDir":"furniture","boxes":["l","a","m","p"],"traps":["b","h","e"]},"belt":{"display":"belt","noun":"belt","themeDir":"clothing","boxes":["b","e","l","t"],"traps":["d","h","i"]},"mask":{"display":"mask","noun":"mask","themeDir":"accessories","boxes":["m","a","s","k"],"traps":["g","h","e"]},"milk":{"display":"milk","noun":"milk","themeDir":"At the Supermarket","boxes":["m","i","l","k"],"traps":["g","h","e"]},"sheep":{"display":"sheep","noun":"sheep","themeDir":"farm animals","boxes":["sh","ee","p"],"traps":["c","i","t"]}},"de":{"fish":{"display":"Fisch","noun":"fish","themeDir":"animals","boxes":["F","i","sch"],"traps":["e","t","n"]},"ship":{"display":"Schiff","noun":"ship","themeDir":"vehicles","boxes":["Sch","i","ff"],"traps":["e","t","n"]},"sheep":{"display":"Schaf","noun":"sheep","themeDir":"farm animals","boxes":["Sch","a","f"],"traps":["e","t","n"]},"scarf":{"display":"Schal","noun":"scarf","themeDir":"accessories","boxes":["Sch","a","l"],"traps":["e","t","n"]},"book":{"display":"Buch","noun":"book","themeDir":"classroom","boxes":["B","u","ch"],"traps":["s","o","t"]},"milk":{"display":"Milch","noun":"milk","themeDir":"At the Supermarket","boxes":["M","i","l","ch"],"traps":["s","e","t"]},"moose":{"display":"Elch","noun":"moose","themeDir":"animals","boxes":["E","l","ch"],"traps":["s","i","t"]},"glass":{"display":"Glas","noun":"glass","themeDir":"kitchen tools","boxes":["G","l","a","s"],"traps":["r","h","e"]},"bread":{"display":"Brot","noun":"bread","themeDir":"At the Supermarket","boxes":["B","r","o","t"],"traps":["l","h","u"]},"jug":{"display":"Krug","noun":"jug","themeDir":"kitchen tools","boxes":["K","r","u","g"],"traps":["l","h","o"]},"bell":{"display":"Glocke","noun":"bell","themeDir":"christmas","boxes":["G","l","o","ck","e"],"traps":["r","h","u"]},"sock":{"display":"Socke","noun":"sock","themeDir":"accessories","boxes":["S","o","ck","e"],"traps":["h","u","t"]},"jacket":{"display":"Jacke","noun":"jacket","themeDir":"clothing","boxes":["J","a","ck","e"],"traps":["h","t","n"]},"skirt":{"display":"Rock","noun":"skirt","themeDir":"clothing","boxes":["R","o","ck"],"traps":["h","u","t"]},"tisch":{"display":"Tisch","noun":"table","themeDir":"around the house","boxes":["T","i","sch"],"traps":["e","n","m"]},"ball":{"display":"Ball","noun":"ball","themeDir":"toys","boxes":["B","a","ll"],"traps":["h","e","t"]},"bed":{"display":"Bett","noun":"bed","themeDir":"around the house","boxes":["B","e","tt"],"traps":["h","i","n"]},"comb":{"display":"Kamm","noun":"comb","themeDir":"around the house","boxes":["K","a","mm"],"traps":["h","e","t"]}},"nl":{"schip":{"display":"schip","noun":"ship","themeDir":"vehicles","boxes":["s","ch","i","p"],"traps":["e","t","n"]},"ring":{"display":"ring","noun":"ring","themeDir":"accessories","boxes":["r","i","ng"],"traps":["h","e","t"]},"slak":{"display":"slak","noun":"snail","themeDir":"insects and bugs","boxes":["s","l","a","k"],"traps":["r","h","e"]},"vlag":{"display":"vlag","noun":"flag","themeDir":"4th of July","boxes":["v","l","a","g"],"traps":["r","h","e"]},"klok":{"display":"klok","noun":"clock","themeDir":"around the house","boxes":["k","l","o","k"],"traps":["r","h","u"]},"melk":{"display":"melk","noun":"milk","themeDir":"At the Supermarket","boxes":["m","e","l","k"],"traps":["g","h","i"]},"vork":{"display":"vork","noun":"fork","themeDir":"around the house","boxes":["v","o","r","k"],"traps":["g","h","u"]},"lamp":{"display":"lamp","noun":"lamp","themeDir":"furniture","boxes":["l","a","m","p"],"traps":["b","h","e"]},"wolf":{"display":"wolf","noun":"wolf","themeDir":"animals","boxes":["w","o","l","f"],"traps":["v","h","u"]}},"sv":{"katt":{"display":"katt","noun":"cat","themeDir":"animals","boxes":["k","a","tt"],"traps":["h","e","n"]},"tupp":{"display":"tupp","noun":"rooster","themeDir":"farm animals","boxes":["t","u","pp"],"traps":["h","o","n"]},"mugg":{"display":"mugg","noun":"mug","themeDir":"kitchen tools","boxes":["m","u","gg"],"traps":["h","o","t"]},"dorr":{"display":"dörr","noun":"door","themeDir":"around the house","boxes":["d","ö","rr"],"traps":["h","o","t"]},"boll":{"display":"boll","noun":"ball","themeDir":"toys","boxes":["b","o","ll"],"traps":["h","u","t"]},"kopp":{"display":"kopp","noun":"cup","themeDir":"around the house","boxes":["k","o","pp"],"traps":["h","u","t"]},"buss":{"display":"buss","noun":"bus","themeDir":"vehicles","boxes":["b","u","ss"],"traps":["h","o","t"]},"ring":{"display":"ring","noun":"ring","themeDir":"accessories","boxes":["r","i","ng"],"traps":["h","e","t"]},"sang":{"display":"säng","noun":"bed","themeDir":"around the house","boxes":["s","ä","ng"],"traps":["h","e","t"]}},"no":{"fisk":{"display":"fisk","noun":"fish","themeDir":"animals","boxes":["f","i","s","k"],"traps":["g","h","e"]},"hest":{"display":"hest","noun":"horse","themeDir":"farm animals","boxes":["h","e","s","t"],"traps":["d","i","n"]},"gris":{"display":"gris","noun":"pig","themeDir":"animals","boxes":["g","r","i","s"],"traps":["l","h","e"]},"melk":{"display":"melk","noun":"milk","themeDir":"At the Supermarket","boxes":["m","e","l","k"],"traps":["g","h","i"]},"katt":{"display":"katt","noun":"cat","themeDir":"animals","boxes":["k","a","tt"],"traps":["h","e","n"]},"penn":{"display":"penn","noun":"pen","themeDir":"classroom","boxes":["p","e","nn"],"traps":["h","i","t"]},"ring":{"display":"ring","noun":"ring","themeDir":"accessories","boxes":["r","i","ng"],"traps":["h","e","t"]},"sokk":{"display":"sokk","noun":"sock","themeDir":"accessories","boxes":["s","o","kk"],"traps":["h","u","t"]},"seng":{"display":"seng","noun":"bed","themeDir":"around the house","boxes":["s","e","ng"],"traps":["h","i","t"]}},"es":{"queso":{"display":"queso","noun":"cheese","themeDir":"At the Supermarket","boxes":["qu","e","s","o"],"traps":["h","t","n"]},"perro":{"display":"perro","noun":"dog","themeDir":"animals","boxes":["p","e","rr","o"],"traps":["h","i","t"]},"carro":{"display":"carro","noun":"car","themeDir":"toys","boxes":["c","a","rr","o"],"traps":["h","e","t"]},"burro":{"display":"burro","noun":"donkey","themeDir":"animals","boxes":["b","u","rr","o"],"traps":["h","t","n"]},"gallo":{"display":"gallo","noun":"rooster","themeDir":"farm animals","boxes":["g","a","ll","o"],"traps":["h","e","t"]},"silla":{"display":"silla","noun":"chair","themeDir":"around the house","boxes":["s","i","ll","a"],"traps":["h","e","t"]},"llave":{"display":"llave","noun":"key","themeDir":"around the house","boxes":["ll","a","v","e"],"traps":["h","t","n"]},"leche":{"display":"leche","noun":"milk","themeDir":"At the Supermarket","boxes":["l","e","ch","e"],"traps":["s","i","t"]}},"it":{"chiave":{"display":"chiave","noun":"key","themeDir":"around the house","boxes":["ch","i","a","v","e"],"traps":["s","t","n"]},"pesce":{"display":"pesce","noun":"fish","themeDir":"animals","boxes":["p","e","sc","e"],"traps":["h","i","t"]},"agnello":{"display":"agnello","noun":"lamb","themeDir":"easter","boxes":["a","gn","e","ll","o"],"traps":["h","t","m"]},"treno":{"display":"treno","noun":"train","themeDir":"toys","boxes":["t","r","e","n","o"],"traps":["l","h","i"]},"gatto":{"display":"gatto","noun":"cat","themeDir":"animals","boxes":["g","a","tt","o"],"traps":["h","e","n"]},"palla":{"display":"palla","noun":"ball","themeDir":"toys","boxes":["p","a","ll","a"],"traps":["h","e","t"]},"ragno":{"display":"ragno","noun":"spider","themeDir":"forest creatures","boxes":["r","a","gn","o"],"traps":["h","e","t"]},"pigna":{"display":"pigna","noun":"pinecone","themeDir":"camping","boxes":["p","i","gn","a"],"traps":["h","e","t"]},"mucca":{"display":"mucca","noun":"cow","themeDir":"farm animals","boxes":["m","u","cc","a"],"traps":["h","o","t"]}},"pt":{"chave":{"display":"chave","noun":"key","themeDir":"around the house","boxes":["ch","a","v","e"],"traps":["s","t","n"]},"chuva":{"display":"chuva","noun":"rain","themeDir":"spring","boxes":["ch","u","v","a"],"traps":["s","o","t"]},"olho":{"display":"olho","noun":"eye","themeDir":"body parts","boxes":["o","lh","o"],"traps":["n","u","t"]},"folha":{"display":"folha","noun":"leaf","themeDir":"miscellaneous","boxes":["f","o","lh","a"],"traps":["n","u","t"]},"ovelha":{"display":"ovelha","noun":"sheep","themeDir":"farm animals","boxes":["o","v","e","lh","a"],"traps":["n","u","t"]},"carro":{"display":"carro","noun":"car","themeDir":"toys","boxes":["c","a","rr","o"],"traps":["h","e","t"]},"burro":{"display":"burro","noun":"donkey","themeDir":"animals","boxes":["b","u","rr","o"],"traps":["h","t","n"]}}},"pour":{"en":[["ship","fish","chick","duck","bench","frog","flag","drum","crab"],["sock","ring","bell","lock","vest","lamp","belt","mask","milk"]],"de":[["fish","ship","sheep","scarf","book","milk","moose","glass","bread"],["jug","bell","sock","jacket","skirt","tisch","ball","bed","comb"]],"nl":[["schip","ring","slak","vlag","klok","melk","vork","lamp","wolf"]],"sv":[["katt","tupp","mugg","dorr","boll","kopp","buss","ring","sang"]],"no":[["fisk","hest","gris","melk","katt","penn","ring","sokk","seng"]],"es":[["queso","perro","carro","burro","gallo","silla","llave","leche"]],"it":[["chiave","pesce","agnello","treno","gatto","palla","ragno","pigna","mucca"]],"pt":[["chave","chuva","olho","folha","ovelha","carro","burro"]]},"jars":{"en":{"teams":["sh","ch","ck"],"rounds":[["ship",0],["sheep",0],["fish",2],["chick",0],["bench",3],["duck",2],["sock",2],["lock",2]]},"de":{"teams":["sch","ch","ck"],"rounds":[["ship",0],["sheep",0],["fish",2],["book",2],["milk",3],["moose",2],["sock",2],["skirt",2],["jacket",2]]}},"sentence":{"en":["The fish swim past the big ship.","She has a red brush.","Shake the dish and wash it.","A sheep is in the shed.","Push the shell into the shop.","Shh! The fish is in a dish.","She shut the shed and the shop."]}};/*DATA-END*/

  var WELLS = 6, WELL_MAX = 3;
  /* a doubled letter that is NOT the same sound twice but a sound of its own (es ll / rr, pt rr) is a team */
  var OWN_SOUND_DOUBLES = { es: ['ll', 'rr'], pt: ['rr'] };
  function locale(l) { l = String(l || 'en').slice(0, 2).toLowerCase(); return DATA.LOCALES.indexOf(l) >= 0 ? l : 'en'; }
  function clues(loc) { return DATA.CLUES[locale(loc)].slice(); }
  function clueOf(loc, v) { var c = clues(loc); return c.indexOf(v) >= 0 ? v : c[0]; }
  function word(loc, id) { return DATA.words[locale(loc)][id]; }
  function graphemes(loc, id) { return word(loc, id).boxes.map(function (b) { return b.toLowerCase(); }); }
  /* single · double (the same letter twice, one sound) · team (letters that make one new sound) */
  function gKind(loc, g) {
    g = String(g).toLowerCase();
    if (g.length < 2) return 'single';
    var same = true; for (var i = 1; i < g.length; i++) if (g[i] !== g[0]) same = false;
    if (same && (OWN_SOUND_DOUBLES[locale(loc)] || []).indexOf(g) < 0) return 'double';
    return 'team';
  }
  function sets(loc) { return DATA.pour[locale(loc)].length; }
  /* the rounds of a clue: Pour — the word ids of set s; Team jars — indexes into the jar rounds; Sentence — sentence indexes */
  function rounds(loc, clue, set) {
    loc = locale(loc); clue = clueOf(loc, clue);
    if (clue === 'pour') return DATA.pour[loc][(set || 0) % sets(loc)].slice();
    if (clue === 'jars') return DATA.jars[loc].rounds.map(function (r, i) { return i; });
    return DATA.sentence[loc].map(function (s, i) { return i; });
  }

  /* ---------------- the tray: the word's letters + its three traps, never in spelling order ---------------- */
  function shuffle(a, rnd) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)), x = a[i]; a[i] = a[j]; a[j] = x; } return a; }
  function trayFair(t) { for (var k = 1; k < t.length; k++) if (t[k - 1].wi >= 0 && t[k].wi === t[k - 1].wi + 1) return false; return true; }
  function tray(loc, id, rnd) {
    rnd = rnd || Math.random; var w = word(loc, id), base = [];
    w.display.split('').forEach(function (c, i) { base.push({ c: c, wi: i }); });
    w.traps.forEach(function (c) { base.push({ c: c, wi: -1 }); });
    for (var k = 0; k < 400; k++) { var t = shuffle(base, rnd); if (trayFair(t)) return t; }
    /* a deterministic fair fallback: every second place first */
    var ev = [], od = []; base.forEach(function (x, i) { (i % 2 ? od : ev).push(x); }); return ev.concat(od);
  }

  /* ---------------- the state ---------------- */
  function newState(loc, clue, set, r, opts) {
    opts = opts || {}; loc = locale(loc); clue = clueOf(loc, clue);
    var st = { loc: loc, clue: clue, set: set || 0, misses: 0, show: 0, last: null, marks: null, done: false };
    if (clue === 'pour') {
      st.id = r; st.g = graphemes(loc, r); st.tray = tray(loc, r, opts.rnd); st.wells = []; for (var i = 0; i < WELLS; i++) st.wells.push([]);
      st.locked = null;
      if (opts.help === 'first') { for (var d = 0; d < st.tray.length; d++) if (st.tray[d].wi === 0) { st.wells[0].push(d); st.locked = d; break; } }
    } else if (clue === 'jars') {
      var J = DATA.jars[loc], R = J.rounds[r], right = J.teams.indexOf(word(loc, R[0]).boxes[R[1]].toLowerCase()), pos = opts.pos == null ? right : opts.pos;
      var others = J.teams.filter(function (t, k) { return k !== right; });
      st.id = R[0]; st.g = graphemes(loc, R[0]); st.e = R[1]; st.jars = others.slice(0, pos).concat([J.teams[right]], others.slice(pos)); st.right = pos; st.picked = null;
    } else {
      st.text = DATA.sentence[loc][r]; st.words = st.text.split(' ').map(function (t) { return { t: t, has: /sh/i.test(t) }; }); st.tapped = st.words.map(function () { return false; });
    }
    return st;
  }
  function used(st, d) { for (var i = 0; i < st.wells.length; i++) if (st.wells[i].indexOf(d) >= 0) return i; return -1; }
  function firstEmpty(st) { for (var i = 0; i < st.wells.length; i++) if (!st.wells[i].length) return i; return -1; }
  /* pour dropper d: a tap pours into the first EMPTY well; only a drag (an explicit well) can share a well */
  function pour(st, d, w) {
    if (st.done || st.clue !== 'pour' || d == null || d < 0 || d >= st.tray.length || used(st, d) >= 0) return 'no';
    if (w == null || w === 'next') { w = firstEmpty(st); if (w < 0) return 'full'; }
    if (w < 0 || w >= st.wells.length) return 'no';
    if (st.wells[w].length >= WELL_MAX) return 'full';
    st.wells[w].push(d); st.marks = null; st.last = null;
    return 'poured';
  }
  function take(st, w, k) {
    if (st.done || st.clue !== 'pour' || !st.wells[w] || k == null || k < 0 || k >= st.wells[w].length) return 'no';
    if (st.wells[w][k] === st.locked) return 'locked';
    st.wells[w].splice(k, 1); st.marks = null; st.last = null;
    return 'taken';
  }
  function move(st, w, k, to) {
    if (st.done || st.clue !== 'pour' || !st.wells[w] || !st.wells[to] || to === w || k == null || k < 0 || k >= st.wells[w].length) return 'no';
    var d = st.wells[w][k];
    if (d === st.locked) return 'locked';
    if (st.wells[to].length >= WELL_MAX) return 'full';
    st.wells[w].splice(k, 1); st.wells[to].push(d); st.marks = null; st.last = null;
    return 'moved';
  }
  function wellText(st, i) { return st.wells[i].map(function (d) { return st.tray[d].c.toLowerCase(); }).join(''); }

  /* the stir: what each poured well does — ok (one sound of the word: it mixes or deepens), split (two or more
     whole sounds in one well: they refuse to mix), lean (a sound broken across two wells: the paints lean
     toward each other), wrong (a letter the word does not have here), gap (a letter missing after this well) */
  function stir(st) {
    var full = [], S = '', T = st.g.join('');
    st.wells.forEach(function (x, i) { if (x.length) { var s = wellText(st, i); full.push({ w: i, a: S.length, b: S.length + s.length, s: s }); S += s; } });
    var out = st.wells.map(function () { return null; });
    if (!full.length) return { kind: 'tray', wells: out };
    if (S !== T) {
      var p = 0; while (p < S.length && p < T.length && S[p] === T[p]) p++;
      var q = 0; while (q < S.length - p && q < T.length - p && S[S.length - 1 - q] === T[T.length - 1 - q]) q++;
      var lo = p, hi = S.length - q, kind = hi > lo ? 'wrong' : 'gap';
      full.forEach(function (f) {
        if (kind === 'wrong' && f.a < hi && f.b > lo) out[f.w] = 'wrong';
        else if (kind === 'gap' && ((p > 0 && f.a < p && f.b >= p) || (p === 0 && f.a === 0))) out[f.w] = 'gap';
        else out[f.w] = 'ok';
      });
      return { kind: kind, wells: out, want: p < T.length ? T[p] : null, got: p < S.length ? S[p] : null, p: p };
    }
    var B = [0]; st.g.forEach(function (g) { B.push(B[B.length - 1] + g.length); });
    var lean = false, split = false;
    full.forEach(function (f) {
      var ia = B.indexOf(f.a), ib = B.indexOf(f.b);
      if (ia < 0 || ib < 0) { out[f.w] = 'lean'; lean = true; }
      else if (ib - ia === 1) out[f.w] = 'ok';
      else { out[f.w] = 'split'; split = true; }
    });
    return { kind: lean ? 'lean' : split ? 'split' : 'ok', wells: out };
  }
  function pourJar(st, k) { if (st.done || st.clue !== 'jars' || k < 0 || k > 2) return 'no'; st.picked = k; st.marks = null; st.last = null; return 'poured'; }
  function tapWord(st, i) { if (st.done || st.clue !== 'sentence' || i < 0 || i >= st.words.length) return 'no'; st.tapped[i] = !st.tapped[i]; st.marks = null; st.last = null; return st.tapped[i] ? 'on' : 'off'; }
  function judge(st) {
    if (st.clue === 'pour') return stir(st);
    if (st.clue === 'jars') return st.picked == null ? { kind: 'tray' } : { kind: st.picked === st.right ? 'ok' : 'jar' };
    if (!st.tapped.some(Boolean)) return { kind: 'tray' };
    var miss = st.words.some(function (w, i) { return w.has && !st.tapped[i]; }), extra = st.words.some(function (w, i) { return !w.has && st.tapped[i]; });
    return { kind: extra ? 'extra' : miss ? 'missed' : 'ok' };
  }
  function check(st) {
    if (st.done) return { result: 'done' };
    var j = judge(st); st.last = j.kind;
    if (j.kind === 'tray') return { result: 'tray' };
    if (j.kind === 'ok') { st.done = true; st.marks = j; return { result: 'ok' }; }
    st.misses++; st.show = Math.min(3, st.misses); st.marks = j;
    return { result: 'miss', kind: j.kind };
  }
  function place(st) { return st.e === 0 ? 'Start' : st.e === st.g.length - 1 ? 'End' : 'Mid'; }
  function hint(st) {
    var k = st.last;
    if (k === 'tray') return { key: st.clue === 'pour' ? 'hintEmpty' : st.clue === 'jars' ? 'hintJarEmpty' : 'hintSentEmpty' };
    if (!st.show || !k || k === 'ok') return null;
    var two = st.show >= 2;
    if (k === 'wrong') return { key: two ? 'hintWrong2' : 'hintWrong' };
    if (k === 'gap') return { key: two ? 'hintGap2' : 'hintGap' };
    if (k === 'lean') return { key: two ? 'hintLean2' : 'hintLean' };
    if (k === 'split') return { key: two ? 'hintSplit2' : 'hintSplit' };
    if (k === 'jar') return { key: two ? 'hintJar' + place(st) : 'hintJar' };
    if (k === 'extra') return { key: 'hintSentExtra' };
    return { key: 'hintSentMiss' };
  }
  /* miss 2 on a wrong letter: only two droppers stay bright — the one the word needs and the one chosen */
  function bright(st) {
    if (st.clue !== 'pour' || st.show < 2 || !st.marks || st.marks.kind !== 'wrong') return null;
    var a = st.marks.want, b = st.marks.got; return [a, b].filter(function (x) { return x != null; });
  }
  /* miss 3+: the word's sounds as ghost letters, one per well (the child still pours) */
  function ghosts(st) { return st.clue === 'pour' && st.show >= 3 && !st.done ? st.g.slice() : null; }
  /* the word's own colour code: one tile per sound */
  function strip(loc, id) { var g = graphemes(loc, id); return g.map(function (x) { return { g: x, kind: gKind(loc, x) }; }); }
  /* the team the success line names: the first team, else the first double, else null (a word of single letters) */
  function lead(loc, id) {
    var s = strip(loc, id), t = s.filter(function (x) { return x.kind === 'team'; })[0] || s.filter(function (x) { return x.kind === 'double'; })[0];
    return t ? { g: t.g, kind: t.kind } : null;
  }

  /* ---------------- the plan ---------------- */
  function eq(a, b) { if (!a || !b || a.length !== b.length) return false; for (var i = 0; i < a.length; i++) if (a[i] !== b[i]) return false; return true; }
  /* Team jars: the right jar sits left / middle / right in turn (balanced per pass, never twice running in one
     place), and the empty well's place (start / middle / end) never three times running */
  function fair(loc, clue, o) {
    loc = locale(loc);
    if (clue === 'jars') { var R = DATA.jars[loc].rounds, P = o.map(function (i) { var r = R[i], n = DATA.words[loc][r[0]].boxes.length; return r[1] === 0 ? 's' : r[1] === n - 1 ? 'e' : 'm'; }); for (var j = 2; j < P.length; j++) if (P[j] === P[j - 1] && P[j] === P[j - 2]) return false; return true; }
    if (clue === 'pour') { var D = DATA.words[loc]; for (var k = 1; k < o.length; k++) if (D[o[k]].boxes[0].toLowerCase() === D[o[k - 1]].boxes[0].toLowerCase()) return false; return true; }
    return true;
  }
  function plan(loc, clue, rnd, prev, pass) {
    rnd = rnd || Math.random; loc = locale(loc); clue = clueOf(loc, clue); var set = clue === 'pour' ? (pass || 0) % sets(loc) : 0, ids = rounds(loc, clue, set), o = null;
    for (var k = 0; k < 600; k++) { var c = shuffle(ids, rnd); if (!eq(c, prev) && fair(loc, clue, c)) { o = c; break; } }
    if (!o) o = ids;
    var pos = null;
    if (clue === 'jars') {
      var n = o.length, base = []; for (var b = 0; b < n; b++) base.push(b % 3);
      for (var t = 0; t < 400; t++) { var p = shuffle(base, rnd), ok = true; for (var q = 1; q < p.length; q++) if (p[q] === p[q - 1]) ok = false; if (ok) { pos = p; break; } }
      if (!pos) pos = base;
    }
    return { order: o, pos: pos, set: set };
  }
  function band(w) { return { wide: w >= 560, tiny: w < 300 }; }

  return {
    locale: locale, clues: clues, clueOf: clueOf, word: word, graphemes: graphemes, gKind: gKind, sets: sets, rounds: rounds,
    tray: tray, trayFair: trayFair, newState: newState, used: used, firstEmpty: firstEmpty, pour: pour, take: take, move: move,
    wellText: wellText, stir: stir, pourJar: pourJar, tapWord: tapWord, judge: judge, check: check, hint: hint, place: place,
    bright: bright, ghosts: ghosts, strip: strip, lead: lead, plan: plan, fair: fair, band: band,
    DATA: DATA, WELLS: WELLS, WELL_MAX: WELL_MAX
  };
});
