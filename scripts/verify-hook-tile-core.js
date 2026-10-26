#!/usr/bin/env node
/* =====================================================================
   verify-hook-tile-core.js — the gate for ACTIVITY #122, The Hook Tile
   (Hattie's Whose-Is-It, L.1.1.b; all 11 locales). Its OWN ground truth:
   each locale's possessive rule and the owners' genders, written here
   independently of the core, so every round's right tile is DERIVED:
     en noun/name + 's (plural rounds: s) · de names + s, names in
     s/ß/x/z/tz + ', vom (m/n) / von der (f) · nl vowel name + 's (not an
     unstressed -e), consonant + s, s-sound + ' , van de / van het · sv
     names + s, names in s/x/z + nothing, definite nouns + s · da/no names
     + s, names in s/x/z + ', definite nouns + s · fi genitive n (plural t;
     no consonant gradation) · fr de / d' (vowel or mute h) with names,
     du / de la / de l' with nouns · es de with names, del / de la · it di
     with names, del / della / dello / dell' · pt da / do by the owner.
   It asserts:
     (a) 11 locales × 3 levels × 9 rounds; every picture exists with its
         exact case, in a colour theme; a lost thing is never an animal;
     (b) every right tile equals the rule; every other tile is not;
     (c) the model for every round and tile: the right hook hangs the
         thing, a wrong one slips, the plural makes one more owner (or the
         sentence's number), a hook in a plural round dangles; Check's
         reasons; the hints; the glow from miss 2; the clue at miss 1;
     (d) every level mixes its right tiles (no tile right more than 5 of
         9; 6 in en and fi level 3, where the plural's consequence shows);
     (e) the plan: a fresh order, never three rounds in a row with the same
         right tile, the right tile in every tray slot about equally;
     (f) the bots: always the first slot, always the longest tile;
     (g) the strings ×11, the prose quotes, the manifest row.
   Usage: node scripts/verify-hook-tile-core.js   (env HK_CORE_DIR / HK_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.HK_CORE_DIR || MT, ACT_DIR = process.env.HK_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'hook-tile-core.js'));
const ACT = (() => { const ctx = { window: {}, HookTileCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'hook-tile-activity.js'), 'utf8') + '\n;this.__A = window.HookTileActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const rnd = (() => { let s = 11; return () => { s = (s * 1103515245 + 12345) & 0x7fffffff; return s / 0x7fffffff; }; })();
const AP = '’', q = s => s.replace(/'/g, AP);

/* ---------------- this gate's truth ---------------- */
const ANIMALS = ['dog', 'rabbit', 'cat', 'squirrel', 'mouse', 'snail', 'bird', 'caterpillar', 'frog', 'pig', 'cow', 'horse', 'sheep', 'girl', 'baby'];
const GENDER = {
  de: { Hund: 'm', Vogel: 'm', Kaninchen: 'n', 'Eichhörnchen': 'n', Baby: 'n', Maus: 'f', Kuh: 'f', Schnecke: 'f', Katze: 'f' },
  nl: { hond: 'de', vogel: 'de', muis: 'de', koe: 'de', kat: 'de', konijn: 'het', meisje: 'het', paard: 'het', schaap: 'het' },
  fr: { chien: 'm', lapin: 'm', 'bébé': 'm', souris: 'f', vache: 'f', fille: 'f', 'écureuil': 'm', oiseau: 'm', escargot: 'm' },
  es: { perro: 'm', conejo: 'm', 'ratón': 'm', 'pájaro': 'm', 'bebé': 'm', 'niña': 'f', vaca: 'f', ardilla: 'f', rana: 'f' },
  it: { cane: 'm', coniglio: 'm', topo: 'm', maiale: 'm', scoiattolo: 'm', mucca: 'f', rana: 'f', bambina: 'f', lumaca: 'f', uccello: 'm' },
  pt: { cachorro: 'm', coelho: 'm', rato: 'm', passarinho: 'm', 'bebê': 'm', vaca: 'f', menina: 'f', 'rã': 'f', lagarta: 'f', esquilo: 'm',
    Ana: 'f', Bia: 'f', Lia: 'f', Nina: 'f', 'Téo': 'm', 'Léo': 'm', Caio: 'm', Gui: 'm', Davi: 'm' }
};
const WORDSLOT = ['fr', 'es', 'it', 'pt'];
/* the owner word: the name, or the word next to the slot */
function ownerWord(loc, rd) {
  if (rd.owner.name) return rd.owner.name;
  const b = C.bar(rd, null);
  return WORDSLOT.indexOf(loc) >= 0 || /^(vom|von der|van de|van het) $/.test(rd.right) ? b.post.trim().split(/[\s.]+/)[0] : b.pre.trim().split(/\s+/).pop();
}
function rule(loc, rd) {
  const w = ownerWord(loc, rd), name = !!rd.owner.name, plural = rd.kind === 'plural';
  switch (loc) {
    case 'en': return plural ? 's' : "'s";
    case 'fi': return plural ? 't' : 'n';
    case 'de': if (!name) return GENDER.de[w] === 'f' ? 'von der ' : 'vom '; return /(s|ß|x|z|tz)$/.test(w) ? "'" : 's';
    case 'nl': if (!name) return GENDER.nl[w] === 'het' ? 'van het ' : 'van de '; return /(s|x|z|ce|sch)$/i.test(w) ? "'" : /[aiouy]$/i.test(w) ? "'s" : 's';
    case 'sv': return name && /[sxz]$/i.test(w) ? '' : 's';
    case 'da': case 'no': return name && /[sxz]$/i.test(w) ? "'" : 's';
    case 'fr': if (name) return /^[aeiouyàâéèêëîïôûh]/i.test(w) ? q("d'") : 'de '; if (/^[aeiouyéèêh]/i.test(w)) return q("de l'"); return GENDER.fr[w] === 'f' ? 'de la ' : 'du ';
    case 'es': if (name) return 'de '; return GENDER.es[w] === 'f' ? 'de la ' : 'del ';
    case 'it': if (name) return 'di '; if (/^[aeiouy]/i.test(w)) return q("dell'"); if (/^(s[^aeiou]|z|gn|ps|x|y)/i.test(w)) return GENDER.it[w] === 'f' ? 'della ' : 'dello '; return GENDER.it[w] === 'f' ? 'della ' : 'del ';
    case 'pt': return GENDER.pt[w] === 'f' ? 'da ' : 'do ';
  }
}
const GRADATION = /(kk|pp|tt)|(nk|mp|nt|lt|rt|ht|k|p|t)[aeiouyäö]$/i;

/* ---------------- (a)(b) the rounds ---------------- */
const dirCase = {}; const exact = p => { const [d, f] = p.split('/'); if (!dirCase[d]) dirCase[d] = fs.existsSync(path.join(IMG, d)) ? fs.readdirSync(path.join(IMG, d)) : []; return dirCase[d].includes(f + '@2x.webp') && fs.readdirSync(IMG).includes(d); };
for (const loc of ALL) {
  const L = C.DATA[loc]; is(!!L && L.levels.length === 3, `${loc}: three levels`);
  for (let li = 0; li < 3; li++) {
    const lvl = String(li + 1);
    is(L.levels[li].rounds.length === 9, `${loc} L${lvl}: nine rounds`);
    for (const r of C.rounds()) {
      const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`, want = rule(loc, rd);
      is(rd.right === want, `${tag}: the right tile is the rule's «${want}» (shipped «${rd.right}», owner ${ownerWord(loc, rd)})`);
      is(rd.tiles.indexOf(rd.right) >= 0 && new Set(rd.tiles).size === rd.tiles.length, `${tag}: the tray holds the right tile once`);
      for (const p of [rd.owner.pic, rd.thing && rd.thing.pic].filter(Boolean)) { is(exact(p), `${tag}: picture ${p} exists (exact case)`); is(!BW.test(p.split('/')[0]), `${tag}: ${p} in a colour theme`); }
      if (rd.thing) is(ANIMALS.indexOf(rd.thing.key) < 0, `${tag}: the lost thing is an object, never a creature (${rd.thing.key})`);
      if (loc === 'fi') is(!GRADATION.test(ownerWord(loc, rd)), `${tag}: fi owner «${ownerWord(loc, rd)}» has no consonant gradation`);
      if (loc === 'en' && rd.owner.name) is(!/s$/i.test(rd.owner.name), `${tag}: no en name ends in s`);
      if (loc === 'nl' && rd.owner.name) is(!/e$/i.test(rd.owner.name), `${tag}: no nl name ends in an unstressed -e`);
      if (rd.kind === 'plural') is((loc === 'en' || loc === 'fi') && rd.n >= 2, `${tag}: a plural round only where a plural tile exists`);
      is(C.filled(rd, rd.right).indexOf('{s}') < 0, `${tag}: the slot fills`);
    }
    /* (d) the mix */
    const rights = C.rounds().map(r => C.round(loc, lvl, r).right), cnt = {}; rights.forEach(x => cnt[x] = (cnt[x] || 0) + 1);
    const cap = (loc === 'en' || loc === 'fi') && lvl === '3' ? 6 : 5;
    is(Object.keys(cnt).length >= 2 && Math.max(...Object.values(cnt)) <= cap, `${loc} L${lvl}: the right tiles mix (${JSON.stringify(cnt)}, cap ${cap})`);
  }
}

/* ---------------- (c) the model ---------------- */
for (const loc of ALL) for (const lvl of ['1', '2', '3']) for (const r of C.rounds()) {
  const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`;
  for (const t of rd.tiles) {
    const st = C.newState(loc, lvl, r);
    is(C.seat(st, t) === 'seated' && st.slot === t, `${tag}: «${t}» seats`);
    const ef = C.effect(st), ro = C.role(loc, t), right = t === rd.right;
    if (rd.kind === 'poss') {
      if (right) is(ef.thing === 'peg' && ef.owners === rd.n0, `${tag}: the right hook hangs the thing`);
      else if (ro === 'plural') is(ef.thing === 'basket' && ef.owners === rd.n0 + 1, `${tag}: the plural makes one more owner, the thing stays`);
      else is(ef.thing === 'slip' && ef.owners === rd.n0, `${tag}: a wrong hook slips`);
    } else {
      if (right) is(ef.owners === rd.n && !ef.dangle, `${tag}: the plural fills the shelf to ${rd.n}`);
      else if (ro === 'hook') is(ef.dangle && ef.owners === rd.n0, `${tag}: a hook dangles empty`);
    }
    const res = C.check(st);
    if (right) is(res.result === 'ok' && st.done && C.hint(st) === null, `${tag}: «${t}» solves`);
    else {
      const reason = rd.kind === 'poss' ? (ro === 'plural' ? 'twin' : 'rule') : 'dangle';
      is(res.result === 'miss' && st.reason === reason, `${tag}: «${t}» is a ${reason} miss`);
      const h = C.hint(st);
      is(reason === 'twin' ? h.key === 'missTwin' : reason === 'dangle' ? h.key === 'missDangle' : h.data === (rd.owner.name ? 'missName' : 'missNoun'), `${tag}: the hint names the reason`);
      if (reason === 'rule') { const cl = C.clue(st); is(rd.art ? cl && cl.art === rd.art : rd.owner.name && ['es', 'it', 'pt'].indexOf(loc) < 0 ? cl && cl.letter === (loc === 'fr' ? 0 : rd.owner.name.length - 1) : cl === null, `${tag}: miss 1 shows the reason (article or last letter)`); }
      is(!C.glow(st), `${tag}: no glow at miss 1`);
      C.seat(st, rd.right); C.seat(st, t); C.check(st); is(st.misses === 2 && C.glow(st) && C.hint(st).key === 'missGlow' && C.clue(st) === null, `${tag}: miss 2 → the right tile glows`);
      C.seat(st, rd.right); is(!C.glow(st), `${tag}: a new move takes the glow away`);
    }
  }
  const s0 = C.newState(loc, lvl, r); is(C.check(s0).result === 'empty' && s0.misses === 0 && C.hint(s0).key === 'hintEmpty', `${tag}: an empty Check is no miss`);
  C.seat(s0, rd.tiles[0]); is(C.seat(s0, rd.tiles[0]) === 'pulled' && s0.slot === null, `${tag}: a seated tile tapped again comes out`);
  C.seat(s0, rd.tiles[0]); is(C.pull(s0) === 'pulled' && s0.slot === null, `${tag}: the slot tile pulls out`);
}

/* ---------------- (e)(f) the plan and the bots ---------------- */
for (const loc of ALL) for (const lvl of ['1', '2', '3']) {
  let prev = null; const firstSlot = [], longest = [];
  const slotCount = {};
  for (let pass = 0; pass < 24; pass++) {
    const P = C.plan(loc, lvl, rnd, prev);
    is(P.order.length === 9 && new Set(P.order).size === 9, `${loc} L${lvl}: a pass is every round`);
    if (prev) is(P.order.join() !== prev.join(), `${loc} L${lvl} pass ${pass}: a fresh order`);
    is(!C.runs(loc, lvl, P.order), `${loc} L${lvl} pass ${pass}: never three in a row with the same right tile`);
    const per = {};
    P.order.forEach(r => { const rd = C.round(loc, lvl, r), tr = P.trays[r]; is(tr.slice().sort().join('|') === rd.tiles.slice().sort().join('|'), `${loc} L${lvl}: the tray holds the round's tiles`); const at = tr.indexOf(rd.right); per[tr.length] = per[tr.length] || []; per[tr.length].push(at); firstSlot.push(at === 0 ? 1 : 0);
      const lens = tr.map(t => t.trim().length), mx = Math.max(...lens); longest.push(lens.filter(x => x === mx).length === 1 && rd.right.trim().length === mx ? 1 : 0); });
    Object.keys(per).forEach(k => { const c = new Array(+k).fill(0); per[k].forEach(a => c[a]++); if (per[k].length >= +k) is(Math.max(...c) - Math.min(...c) <= 1, `${loc} L${lvl} pass ${pass}: the right tile spreads over the ${k} slots (${c})`); });
    prev = P.order;
  }
  const f1 = firstSlot.reduce((a, b) => a + b, 0) / firstSlot.length, lg = longest.reduce((a, b) => a + b, 0) / longest.length;
  is(f1 <= 0.56, `${loc} L${lvl}: "always the first tile" wins ${(f1 * 100).toFixed(0)} %`);
  is(lg <= ((loc === 'en' || loc === 'fi') && lvl === '3' ? 0.67 : 0.56), `${loc} L${lvl}: "always the longest tile" wins ${(lg * 100).toFixed(0)} %`);
}

/* ---------------- (g) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'hook-tile-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'hook-tile-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 30, 'the activity strings load');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
  }
  is(SH.indexOf(k) >= 0 || /^t[123]$/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '').indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ALL) { is(C.ruleText(loc, 'missName') && C.ruleText(loc, 'missNoun') && !/\d/.test(C.ruleText(loc, 'missName') + C.ruleText(loc, 'missNoun')), `${loc}: the rule hints`); }
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /«([^»]+)»/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+(?:’s?[^‘’]*)?)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'hattie-whose-is-it.possessive.l-1-1-b';
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every(k => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const known = new Set(); for (const lvl of ['1', '2', '3']) for (const r of C.rounds()) { const rd = C.round(loc, lvl, r); known.add(C.filled(rd, rd.right).replace(/[.!]$/, '').replace(/’/g, "'")); }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map(m => m[1].replace(/ /g, ' ').replace(/’/g, "'").replace(/[.!]$/, '').trim());
  const book = qs.filter(x => [...known].some(k => k.toLowerCase() === x.toLowerCase()));
  is(book.length >= 1, `${loc}: the prose quotes the activity (${book.length} of ${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.1/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'hattie-whose-is-it-activities.json'), 'utf8')).find(x => x.id === ID);
is(row && row.tool === 'hook-tile-activity', 'the manifest row points at the hook tile');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'hattie-whose-is-it' && row.page_title.en === "Hattie's Whose-Is-It — Possessive Nouns (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3'], hook: ['show', 'plain'], rounds: { '1': 9, '2': 9, '3': 9 } }), 'the row\'s params mirror the core');
console.log(`verify-hook-tile-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
