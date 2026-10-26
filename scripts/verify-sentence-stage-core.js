#!/usr/bin/env node
/* =====================================================================
   verify-sentence-stage-core.js — the gate for ACTIVITY #128, The
   Sentence Stage (Wiggles' Sentence Builder, L.1.1.j; all 11 locales).
   Its OWN ground truth, written here independently of the core:
     · each locale's colour words (stem → colour) and what every library
       picture really shows (read off the contact sheet), so a colour word
       is checked twice: the core's tag must match the word, and the word
       must be true of the picture (level 5: a false word must be false);
     · the live canonical sentences the rebuild keeps (level 1, en–sv);
     · its own reading of a script: the stage acts every word that can
       follow what it acted (the sentence's next word, or a later word when
       only describing words are skipped) and freezes at the first word
       that cannot; level 5 by its own templates (en de nl sv da no:
       det, at most one describing word, noun, verb, end mark; fr es pt it:
       det, noun, at most one describing word, verb, end mark — two after
       a noun need a conjunction; fi: describing word, noun, verb, end
       mark) and every word true of the photo (one true doing word: what
       the photo shows).
   It asserts:
     (a) every sentence: a capital start (es ¿ ¡ paired with ? !), only
         German nouns capitalised inside, one end mark, last; a naming
         word; number words agree with the actors; colour words true; no
         word twice; every picture exists (exact case, colour theme);
     (b) the model against the own reading: the canonical plays to the
         end; 300 random scripts per round freeze where the own reading
         freezes (and nothing else passes); level 5 by an exhaustive
         walk of the template space plus 300 random scripts per photo;
         empty / missing hints without a miss; the glow from miss 2;
     (c) the plan: every round once, a fresh order; a tray is never the
         sentence, never starts with its first block or ends with its last,
         and the bot "a capital first, the end mark last, the rest as
         given" never wins; the bot "the rest shortest to longest" wins
         only where the lengths force it; level 5's first-of-each bot never
         wins;
     (d) strings ×11, prose quotes, the manifest row.
   Usage: node scripts/verify-sentence-stage-core.js   (env SS_CORE_DIR / SS_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.SS_CORE_DIR || MT, ACT_DIR = process.env.SS_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'sentence-stage-core.js'));
const ACT = (() => { const ctx = { window: {}, SentenceStageCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'sentence-stage-activity.js'), 'utf8') + '\n;this.__A = window.SentenceStageActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;

/* ---------------- the own tables ---------------- */
/* what each picture shows (contact sheet 2026-10-26) */
const SHOWS = {
  'animals/dog': ['brown', 'white', 'orange'], 'animals/cat': ['orange'], 'beach/sun': ['yellow', 'orange'], 'birds 2/hen': ['white'], 'farm animals/hen': ['white'],
  'vehicles/bus': ['blue', 'grey'], 'camping/frog': ['green'], 'animals/pig': ['pink'], 'animals/bat': ['black', 'grey'], 'vehicles/van': ['orange'], 'animals/fish': ['red', 'orange'],
  'spring/flower': ['red'], 'animals/sheep': ['white'], 'spring/bird': ['orange', 'brown'], 'farm animals/cow': ['white'], 'At the Supermarket/apple': ['red'],
  'farm animals/duck': ['yellow'], 'toys/kite': ['red', 'yellow'], 'forest creatures/mouse': ['grey', 'blue'], 'farm animals/horse': ['brown'], 'farm animals/goose': ['white'],
  'farm animals/sheep': ['white'], 'activities/running': ['red'], 'forest creatures/snail': ['orange'], 'toys/ball': [], 'space/moon': [], 'vehicles/train': []
};
/* colour words per locale: a stem → its colour (any inflection) */
const COLOUR_WORDS = {
  en: { brown: 'brown', white: 'white', black: 'black', green: 'green', pink: 'pink', red: 'red', yellow: 'yellow', blue: 'blue', orange: 'orange', grey: 'grey' },
  de: { braun: 'brown', weiß: 'white', schwarz: 'black', grün: 'green', rosa: 'pink', rot: 'red', gelb: 'yellow', blau: 'blue', orange: 'orange', grau: 'grey' },
  fr: { brun: 'brown', roux: 'orange', blanc: 'white', blanch: 'white', noir: 'black', vert: 'green', rose: 'pink', roug: 'red', jaune: 'yellow', bleu: 'blue', gris: 'grey' },
  es: { café: 'brown', blanc: 'white', negr: 'black', verde: 'green', rosa: 'pink', roj: 'red', amarill: 'yellow', azul: 'blue', naranja: 'orange', gris: 'grey' },
  pt: { marrom: 'brown', marrons: 'brown', branc: 'white', pret: 'black', verde: 'green', rosa: 'pink', vermelh: 'red', amarel: 'yellow', azul: 'blue', laranja: 'orange', cinza: 'grey' },
  it: { marron: 'brown', bianc: 'white', ner: 'black', verd: 'green', rosa: 'pink', ross: 'red', giall: 'yellow', blu: 'blue', arancione: 'orange', grigi: 'grey' },
  nl: { bruin: 'brown', wit: 'white', zwart: 'black', groen: 'green', roze: 'pink', rod: 'red', geel: 'yellow', gele: 'yellow', blauw: 'blue', oranje: 'orange', grijs: 'grey' },
  sv: { brun: 'brown', vit: 'white', svart: 'black', grön: 'green', rosa: 'pink', röd: 'red', gul: 'yellow', blå: 'blue', orange: 'orange', grå: 'grey' },
  da: { brun: 'brown', hvid: 'white', sort: 'black', grøn: 'green', lyserød: 'pink', rød: 'red', gul: 'yellow', blå: 'blue', orange: 'orange', grå: 'grey' },
  no: { brun: 'brown', hvit: 'white', svart: 'black', grønn: 'green', rosa: 'pink', rød: 'red', gul: 'yellow', blå: 'blue', oransje: 'orange', grå: 'grey' },
  fi: { ruske: 'brown', valkoi: 'white', must: 'black', vihre: 'green', vaaleanpunai: 'pink', punai: 'red', keltai: 'yellow', sini: 'blue', oranssi: 'orange', harmaa: 'grey' }
};
const colourOf = (loc, w) => { w = w.toLowerCase(); let best = null, len = 0; for (const s in COLOUR_WORDS[loc]) if (w.startsWith(s) && s.length > len && !(loc === 'da' && s === 'rød' && w.startsWith('lyserød'))) { best = COLOUR_WORDS[loc][s]; len = s.length; } return best; };
/* the live level-1 sentences the rebuild keeps (manifest before the rebuild); da no fi are new. nl "De gladde vis" (smooth —
   nothing a picture can show) became "De rode vis" at the review. */
const KEPT_L1 = {
  en: ['The big dog runs.', 'A little cat naps.', 'The hot sun shines.', 'Six white hens peck.', 'The fast bus stops.', 'My green frog hops.', 'The pink pig digs.', 'Two black bats fly.', 'The old van honks.'],
  de: ['Der große Hund bellt.', 'Die kleine Katze schläft.', 'Die gelbe Sonne scheint.', 'Der blaue Bus fährt.', 'Der grüne Frosch hüpft.', 'Das kleine Schwein grunzt.', 'Die weiße Henne pickt.', 'Der bunte Fisch schwimmt.', 'Die rote Blume blüht.'],
  fr: ['Le chien brun aboie.', 'Le chat roux dort.', 'Le soleil jaune brille.', 'Le bus bleu roule.', 'La grenouille verte saute.', 'Le cochon rose grogne.', 'La poule blanche picore.', 'Le poisson rouge nage.', 'La fleur rouge pousse.'],
  es: ['El perro café ladra.', 'La gata naranja duerme.', 'El sol amarillo brilla.', 'El camión azul avanza.', 'La rana verde salta.', 'El cerdo rosa gruñe.', 'La gallina blanca picotea.', 'El pez rojo nada.', 'La flor roja crece.'],
  pt: ['O cachorro marrom late.', 'A gata laranja dorme.', 'O sol amarelo brilha.', 'O ônibus azul anda.', 'A rã verde pula.', 'O porco rosa grunhe.', 'A galinha branca bica.', 'O peixe vermelho nada.', 'A flor vermelha cresce.'],
  it: ['Il cane marrone abbaia.', 'La gatta arancione dorme.', 'Il sole giallo splende.', 'Il pulmino blu parte.', 'La rana verde salta.', 'Il maiale rosa grugnisce.', 'La gallina bianca becca.', 'Il pesce rosso nuota.', 'Il fiore rosso cresce.'],
  nl: ['De grote hond blaft.', 'De kleine kat slaapt.', 'De gele zon schijnt.', 'De snelle bus rijdt.', 'De groene kikker springt.', 'Het roze varken knort.', 'De witte kip pikt.', 'De rode vis zwemt.', 'De mooie bloem bloeit.'],
  sv: ['En brun hund skäller.', 'En gul sol skiner.', 'En blå buss tutar.', 'En grön groda kväker.', 'En rosa gris grymtar.', 'En vit höna pickar.', 'En röd fisk simmar.', 'En röd blomma doftar.', 'Ett vitt får bräker.']
};
const TPL_OWN = { en: 'dan', de: 'dan', nl: 'dan', sv: 'dan', da: 'dan', no: 'dan', fr: 'dna', es: 'dna', pt: 'dna', it: 'dna', fi: 'an' };
const isEnd = (b) => b.r === 'e' || /[.!?]$/.test(b.w);
/* the own reading of a build script: how many words act, and whether it is the sentence */
function ownBuild(rd, slots) {
  const canon = rd.canon; let p = 0;
  for (let k = 0; k < slots.length; k++) {
    let q = p; while (q < canon.length && slots[k] !== canon[q] && rd.blocks[canon[q]].r === 'a' && k > 0) q++;
    if (q < canon.length && slots[k] === canon[q]) { p = q + 1; continue; }
    return { ok: false, at: k };
  }
  return { ok: true };
}
/* the own reading of a level-5 script: the template, then the truth */
function ownWrite(rd, seq) {
  const t = TPL_OWN[rd.loc], b = seq.map((id) => rd.blocks[id]), roles = b.map((x) => x.r).join('');
  const re = t === 'dan' ? /^da?nve$/ : t === 'dna' ? /^dna?ve$/ : /^a?nve$/;
  return re.test(roles) && b.every((x) => x.t !== false);
}
/* every true sentence a level-5 bank can write, by the own template */
function trueSentences(rd) {
  const B = rd.blocks, ids = (f) => B.filter(f).map((b) => b.id), out = [];
  const D = ids((b) => b.r === 'd'), A = ids((b) => b.r === 'a' && b.t), n = ids((b) => b.r === 'n' && b.t)[0], V = ids((b) => b.r === 'v' && b.t), E = ids((b) => b.r === 'e');
  const adjSets = [[]].concat(A.map((a) => [a]));
  for (const as of adjSets) for (const v of V) for (const e of E) { const d = D[0]; out.push(TPL_OWN[rd.loc] === 'dna' ? [d, n].concat(as, [v, e]) : TPL_OWN[rd.loc] === 'an' ? as.concat([n, v, e]) : [d].concat(as, [n, v, e])); }
  return out;
}
const rnd = (() => { let s = 12345; return () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; })();
const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const fresh = (loc, lvl, r) => C.newState(loc, lvl, r);
const fill = (st, ids) => { ids.forEach((id) => C.put(st, id)); return st; };

/* ---------------- (a) the sentences ---------------- */
const picOk = (p) => { const d = p.slice(0, p.lastIndexOf('/')), f = p.slice(p.lastIndexOf('/') + 1); return fs.readdirSync(IMG).includes(d) && fs.readdirSync(path.join(IMG, d)).includes(f + '@2x.webp') && !BW.test(d); };
for (const loc of ALL) {
  for (const lvl of ['1', '2', '3', '4']) {
    is(C.rounds(lvl).length === 9, `${loc} L${lvl}: nine rounds`);
    for (const r of C.rounds(lvl)) {
      const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`, ws = rd.canon.map((id) => rd.blocks[id]), txt = C.canonText(rd);
      is(picOk(rd.pic) && SHOWS[rd.pic], `${tag}: the picture ${rd.pic} exists, in colour, and is on the contact sheet`);
      const st = ws[0].r === 'o' ? 1 : 0, last = ws[ws.length - 1];
      is(/^\p{Lu}/u.test(ws[st].w), `${tag}: a capital start «${txt}»`);
      ws.forEach((b, i) => { if (i > st) is(!/^\p{Lu}/u.test(b.w) || (loc === 'de' && b.r === 'n'), `${tag}: no capital inside (${b.w})`); });
      is(isEnd(last) && ws.slice(0, -1).every((b) => !isEnd(b)), `${tag}: one end mark, last`);
      is(lvl >= '3' ? last.r === 'e' : last.r !== 'e', `${tag}: the end mark is ${lvl >= '3' ? 'its own block' : 'on the last word'}`);
      if (loc === 'es') { const m = /[.!?]$/.exec(last.w)[0]; is(m === '.' ? ws[0].r !== 'o' : ws[0].w === { '?': '¿', '!': '¡' }[m], `${tag}: es ¿ ¡ pair with ? !`); }
      else is(ws[0].r !== 'o', `${tag}: no opening mark`);
      if (lvl < '4') is(/\.$/.test(last.w), `${tag}: levels 1–3 are statements`);
      is(ws.some((b) => b.r === 'n'), `${tag}: a naming word`);
      const q = ws.find((b) => b.r === 'q'), n = ws.find((b) => b.r === 'n'); if (q) is(n.n === q.n, `${tag}: the number word agrees with the actors`);
      ws.forEach((b) => { const c = colourOf(loc, b.w); if (b.r === 'a' && COLOUR_WORDS.en[b.a]) { is(c === b.a, `${tag}: «${b.w}» is tagged ${b.a} and reads ${c}`); is(SHOWS[rd.pic].includes(b.a), `${tag}: «${b.w}» is true of ${rd.pic}`); } else if (b.r === 'a') is(!c || (loc === 'fr' && c === 'orange'), `${tag}: «${b.w}» is a colour word tagged ${b.a}`); });
      is(new Set(ws.map((b) => b.w.toLowerCase())).size === ws.length, `${tag}: no word twice`);
      if (lvl === '1' && KEPT_L1[loc]) is(txt === KEPT_L1[loc][r].replace(/'/g, '’'), `${tag}: the live sentence kept («${txt}» / «${KEPT_L1[loc][r]}»)`);
      if (loc === 'fr' && /[?!]$/.test(last.w)) is(/ [?!]$/.test(txt), `${tag}: fr narrow space before ${last.w}`);
    }
  }
  const L5 = C.DATA[loc].l5; is(L5.tpl === TPL_OWN[loc], `${loc} L5: the template is the language's own order (${L5.tpl})`);
  for (const r of C.rounds('5')) {
    const rd = C.round(loc, '5', r), tag = `${loc} L5.${r + 1}`;
    is(picOk(rd.pic) && SHOWS[rd.pic], `${tag}: the photo ${rd.pic} exists, in colour`);
    const nouns = rd.blocks.filter((b) => b.r === 'n'); is(nouns.length === 2 && nouns.filter((b) => b.t).length === 1 && nouns.every((b) => picOk(b.pic)), `${tag}: two naming words, one true, both pictured`);
    is(nouns.find((b) => !b.t).pic !== rd.pic, `${tag}: the false naming word is not the photo`);
    rd.blocks.filter((b) => b.r === 'a').forEach((b) => { const c = colourOf(loc, b.w); if (COLOUR_WORDS.en[b.a]) { is(c === b.a, `${tag}: «${b.w}» tagged ${b.a} reads ${c}`); is(SHOWS[rd.pic].includes(b.a) === !!b.t, `${tag}: «${b.w}» is ${b.t ? 'true' : 'false'} of the photo`); } else is(!c, `${tag}: «${b.w}» is a colour word tagged ${b.a}`); });
    is(rd.blocks.filter((b) => b.r === 'a').length === 4 && rd.blocks.filter((b) => b.r === 'a' && b.t).length >= 1, `${tag}: four describing words, at least one true`);
    is(rd.blocks.filter((b) => b.r === 'v' && b.t).length === 1 && rd.blocks.filter((b) => b.r === 'v').length === 3, `${tag}: three doing words, one true (what the photo shows)`);
    is(rd.blocks.filter((b) => b.r === 'e').map((b) => b.w).join('') === '.!', `${tag}: the end marks . and !`);
    is((loc === 'fi') === !rd.blocks.some((b) => b.r === 'd'), `${tag}: a determiner (none in fi)`);
  }
}
/* ---------------- (b) the model against the own reading ---------------- */
for (const loc of ALL) for (const lvl of ['1', '2', '3', '4']) for (const r of C.rounds(lvl)) {
  const tag = `${loc} L${lvl}.${r + 1}`, rd0 = C.round(loc, lvl, r);
  let st = fresh(loc, lvl, r); is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', `${tag}: an empty Check → the hint, no miss`);
  st = fill(fresh(loc, lvl, r), rd0.canon.slice(0, -1)); is(C.check(st).result === 'missing' && st.misses === 0 && C.hint(st) === 'hintMissing', `${tag}: a part script → the hint, no miss`);
  st = fill(fresh(loc, lvl, r), rd0.canon); is(C.check(st).result === 'ok' && st.done && C.playable(st) === rd0.n, `${tag}: the sentence plays to the end`);
  let agree = 0, wrongPass = 0, stops = 0;
  for (let k = 0; k < 300; k++) {
    const perm = shuffle(rd0.canon); if (perm.join() === rd0.canon.join()) continue;
    st = fill(fresh(loc, lvl, r), perm); const res = C.check(st), own = ownBuild(rd0, perm);
    if (res.result === 'ok') wrongPass++;
    if (res.result === 'miss' && !own.ok && res.at === own.at && C.playable(st) === own.at) agree++; else stops++;
  }
  is(wrongPass === 0 && stops === 0, `${tag}: 300 scripts freeze where the own reading freezes (${stops} disagree, ${wrongPass} wrong passes)`);
  /* the reasons: a non-start first → start; the doing word before any actor → who */
  const notFirst = rd0.canon.find((id) => id !== rd0.canon[0]);
  st = fill(fresh(loc, lvl, r), [notFirst].concat(rd0.canon.filter((x) => x !== notFirst))); C.check(st); is(st.reason === 'start' && C.hint(st) === 'missStart', `${tag}: a wrong first word → the curtain hint`);
  const v = rd0.blocks.find((b) => b.r === 'v'), ni = rd0.canon.findIndex((id) => rd0.blocks[id].r === 'n');
  if (v && rd0.canon.indexOf(v.id) > ni && ni > 0) { const s2 = rd0.canon.slice(0, ni).concat([v.id], rd0.canon.slice(ni).filter((x) => x !== v.id)); st = fill(fresh(loc, lvl, r), s2); C.check(st); is(st.reason === 'who' && C.hint(st) === 'missWho', `${tag}: the doing word before the actor → who`); }
  /* miss 2 glows the block that belongs at the first place that differs */
  const sw = rd0.canon.slice(); [sw[1], sw[2]] = [sw[2], sw[1]]; st = fill(fresh(loc, lvl, r), sw); C.check(st);
  is(C.glow(st) == null && C.glowAt(st) == null && C.hint(st) !== 'missGlow', `${tag}: no glow after one miss`);
  C.check(st);
  is(st.misses === 2 && C.glow(st) === rd0.canon[1] && C.glowAt(st) === 1 && C.hint(st) === 'missGlow', `${tag}: miss 2 glows the right word for the first wrong place`);
  C.take(st, 1); is(C.glow(st) == null && C.hint(st) == null, `${tag}: a move takes the help away`);
}
for (const loc of ALL) for (const r of C.rounds('5')) {
  const tag = `${loc} L5.${r + 1}`, rd = C.round(loc, '5', r), B = rd.blocks, ids = (f) => B.filter(f).map((b) => b.id);
  const D = ids((b) => b.r === 'd'), A = ids((b) => b.r === 'a'), Nn = ids((b) => b.r === 'n'), V = ids((b) => b.r === 'v'), E = ids((b) => b.r === 'e');
  let tried = 0, bad = 0, okCount = 0;
  const adjSets = [[]].concat(A.map((a) => [a]), [].concat(...A.map((a) => A.filter((b) => b !== a).map((b) => [a, b]))));
  for (const d of (D.length ? D : [null])) for (const as of adjSets) for (const n of Nn) for (const vv of V) for (const e of E) for (const shape of ['tpl', 'swap']) {
    let seq = TPL_OWN[loc] === 'dna' ? [d, n].concat(as, [vv, e]) : TPL_OWN[loc] === 'an' ? as.concat([n, vv, e]) : [d].concat(as, [n, vv, e]);
    seq = seq.filter((x) => x != null); if (shape === 'swap') { if (seq.length < 3) continue; seq = seq.slice(); [seq[0], seq[1]] = [seq[1], seq[0]]; }
    const st = fill(fresh(loc, '5', r), seq), res = C.check(st), own = ownWrite(rd, seq); tried++;
    if ((res.result === 'ok') !== own) bad++; if (own) okCount++;
  }
  for (let k = 0; k < 300; k++) { const len = 2 + Math.floor(rnd() * 5), seq = shuffle(B.map((b) => b.id)).slice(0, len), st = fill(fresh(loc, '5', r), seq), res = C.check(st); tried++; if ((res.result === 'ok') !== ownWrite(rd, seq)) bad++; }
  is(bad === 0 && okCount >= 4, `${tag}: ${tried} scripts judged as the own reading judges them (${bad} disagree; ${okCount} right sentences)`);
  /* a false describing word → the false hint and the photo; miss 2 glows a true word */
  const fa = A.find((a) => !B[a].t), ta = A.find((a) => B[a].t), tn = Nn.find((a) => B[a].t), tv = V.find((a) => B[a].t);
  const mk = (a) => TPL_OWN[loc] === 'dna' ? [D[0], tn, a, tv, E[0]] : TPL_OWN[loc] === 'an' ? [a, tn, tv, E[0]] : [D[0], a, tn, tv, E[0]];
  let st = fill(fresh(loc, '5', r), mk(fa)); C.check(st); is(st.reason === 'false' && C.hint(st) === 'missFalse', `${tag}: a false word → «look at the photo»`);
  C.check(st); is(C.glow(st) != null && B[C.glow(st)].t === true && B[C.glow(st)].r === 'a', `${tag}: miss 2 glows a true describing word`);
  st = fill(fresh(loc, '5', r), mk(ta)); is(C.check(st).result === 'ok', `${tag}: a true sentence passes «${C.join(rd, st.slots)}»`);
  is(/^\p{Lu}/u.test(C.join(rd, st.slots)), `${tag}: the written sentence starts with a capital`);
  st = fill(fresh(loc, '5', r), mk(ta).slice(0, -1)); C.check(st); is(st.reason === 'end', `${tag}: no end mark → the end hint`);
  if (D.length) { st = fill(fresh(loc, '5', r), [D[0], tn, E[0]]); C.check(st); is(st.reason === 'verb', `${tag}: no doing word → the verb hint`); }
}
/* ---------------- (c) the plan ---------------- */
const forced = (rd) => { const s = rd.canon[0], e = rd.canon[rd.n - 1], mid = rd.canon.slice(1, -1).map((id) => rd.blocks[id].w.length); for (let i = 1; i < mid.length; i++) if (mid[i] <= mid[i - 1]) return false; return true; };
for (const loc of ALL) for (const lvl of C.levels()) {
  let bad = 0, rep = 0, prev = null, b1 = 0, b2 = 0, b3 = 0, b3f = 0, wb = 0;
  for (let k = 0; k < 120; k++) {
    const P = C.plan(loc, lvl, rnd, prev); if (P.order.slice().sort().join() !== '0,1,2,3,4,5,6,7,8') bad++; if (prev && P.order.join() === prev.join()) rep++; prev = P.order;
    for (const r of P.order) {
      const rd = C.round(loc, lvl, r, P.trays[r]), t = P.trays[r];
      is(t.slice().sort((a, b) => a - b).join() === rd.blocks.map((b) => b.id).join(), `${loc} L${lvl}.${r + 1}: the tray holds every block`);
      if (rd.kind === 'build') {
        const own = (s) => s.join() === rd.canon.join();
        if (own(t) || t[0] === rd.canon[0] || t[t.length - 1] === rd.canon[rd.n - 1]) b1++;
        const cap = t.find((id) => /^[¿¡\p{Lu}]/u.test(rd.blocks[id].w)), end = t.find((id) => isEnd(rd.blocks[id])), mid = t.filter((id) => id !== cap && id !== end);
        if (own([cap].concat(mid, [end]))) b2++;
        if (own([cap].concat(mid.map((x, i) => ({ x, i })).sort((p, q) => (rd.blocks[p.x].w.length - rd.blocks[q.x].w.length) || (p.i - q.i)).map((o) => o.x), [end]))) { b3++; if (forced(rd)) b3f++; }
      } else {
        const first = (role) => t.find((id) => rd.blocks[id].r === role), seq = (TPL_OWN[loc] === 'dna' ? [first('d'), first('n'), first('a'), first('v'), first('e')] : TPL_OWN[loc] === 'an' ? [first('a'), first('n'), first('v'), first('e')] : [first('d'), first('a'), first('n'), first('v'), first('e')]).filter((x) => x != null);
        if (ownWrite(rd, seq)) wb++;
      }
    }
  }
  is(bad === 0 && rep === 0, `${loc} L${lvl}: 120 plans — every round once, a fresh order (${bad}/${rep})`);
  if (lvl !== '5') {
    is(b1 === 0, `${loc} L${lvl}: a tray is never the sentence, never starts with its start or ends with its end (${b1})`);
    is(b2 === 0, `${loc} L${lvl}: "a capital first, the end mark last, the rest as given" never wins (${b2})`);
    is(b3 === b3f, `${loc} L${lvl}: "the rest shortest to longest" wins only where the lengths force it (${b3} wins, ${b3f} forced)`);
  } else is(wb === 0, `${loc} L5: the first-of-each bot never writes a true sentence (${wb})`);
}
/* ---------------- (d) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'sentence-stage-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'sentence-stage-core.js'), 'utf8');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 35, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok|^t\d/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(['title', 'instruction', 'instrBubble', 'okBubble'].indexOf(k) >= 0 || /^[tl]\d$/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || body.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'sentence-builder.build-a-sentence.l-1-1-j';
const norm = (s) => s.replace(/[  ]/g, ' ').replace(/’/g, "'").trim();
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every((k) => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  /* a quoted sentence is a sentence of the rounds, or (a wrong example) its blocks in another order that freezes */
  const right = new Set(), wrong = new Map(); const L = ['1', '2', '3', '4'];
  for (const lvl of L) for (const r of C.rounds(lvl)) { const rd = C.round(loc, lvl, r); right.add(norm(C.canonText(rd))); }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map((m) => norm(m[1])).filter((q) => /[.!?]$/.test(q));
  let known = 0;
  for (const q of qs) {
    let ok = right.has(q);
    if (!ok) for (const r of C.rounds('5')) { const rd = C.round(loc, '5', r); for (const seq of trueSentences(rd)) if (ownWrite(rd, seq) && norm(C.join(rd, seq)) === q) ok = true; }
    if (!ok) for (const lvl of L) for (const r of C.rounds(lvl)) { const rd = C.round(loc, lvl, r); for (let k = 0; k < 3000 && !ok; k++) { const p = shuffle(rd.canon); if (norm(C.join(rd, p)) === q && !ownBuild(rd, p).ok) ok = true; } }
    is(ok, `${loc}: the prose quote «${q}» is a sentence of the rounds (or a wrong order of one)`); if (ok) known++;
  }
  is(known >= 4, `${loc}: the prose quotes the activity (${known} of ${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.1/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'sentence-builder-activities.json'), 'utf8')).find((x) => x.id === ID);
is(row && row.tool === 'sentence-stage-activity', 'the manifest row points at the sentence stage');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.page_title.en === "Wiggles' Sentence Builder — Build a Sentence (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3', '4', '5'], speed: ['slow', 'quick'], rounds: { '1': 9, '2': 9, '3': 9, '4': 9, '5': 9 } }), "the row's params mirror the core");
console.log(`verify-sentence-stage-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
