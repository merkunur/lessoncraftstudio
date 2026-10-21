#!/usr/bin/env node
/* =====================================================================
   verify-letter-magnet-core.js — build gate for ACTIVITY #59, The Letter
   Magnet (mini tools/letter-magnet-core.js, RF.K.3.a, 11 locales). Its OWN
   ground truth (never read off the core's answers):
     0. every word: its picture exists, is a colour drawing, is not a
        refused drawing, carries the library's own name for it in that
        locale; no two words share a picture
     1. the gate's own first-sound classifier (per locale: soft c/g, silent
        h, de V/St/Sp, Nordic soft k/g, es b = v, fi loan letters …):
        one / week — every picture that belongs starts with the magnet's
        letter AND its primary sound; every other picture starts with a
        different letter AND a different sound
     2. two magnets — each picture belongs to exactly one magnet by its own
        first sound, never to the other; both magnets have pictures
     3. which team — every word holds exactly one of the locale's letter
        teams, written literally, and that is its magnet
     4. team in the word — the strip is the word with its team taken out;
        read-and-match: each magnet word names exactly one picture, the
        other pictures share a first letter with a magnet word
     5. levels: the shown levels per locale, each ≥ 7 rounds, ids unique,
        no word twice in a round
     6. the switch: empty (no miss), stayed / hooks (miss), right → done;
        right pictures stay on the hooks; help only at miss 2; moves
     7. deals: no row holds all of one magnet's pictures; the right
        pictures spread over the slots; order() never repeats
     8. strings × 11, every hint key the core returns is authored, the same
        placeholders in every locale, nothing "free"; the manifest mirrors
        the core; frozen metadata present; url-safe slugs
   Usage: node scripts/verify-letter-magnet-core.js  (LMG_CORE_DIR = mutation dir)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ROOT = path.join(__dirname, '..'), MT = path.join(ROOT, 'mini tools'), IMG = path.join(ROOT, 'image-library-webp', 'themes');
const DIR = process.env.LMG_CORE_DIR || MT;
const C = (() => { const ctx = { module: { exports: {} } }; ctx.exports = ctx.module.exports; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(DIR, 'letter-magnet-core.js'), 'utf8'), ctx); return ctx.module.exports; })();
const A = (() => { const ctx = { window: {}, document: undefined, LetterMagnetCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(fs.existsSync(path.join(DIR, 'letter-magnet-activity.js')) ? DIR : MT, 'letter-magnet-activity.js'), 'utf8') + '\nthis.__A = LetterMagnetActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL <= 60) console.error('   FAIL: ' + m); } };
const LOCS = ['en', 'de', 'nl', 'da', 'sv', 'no', 'es', 'it', 'pt', 'fr', 'fi'];
const SHOWN = { en: 'one week two team gap', de: 'one week two team gap', nl: 'one week two team gap', no: 'one week two team gap', es: 'one week two team gap', it: 'one week two team gap', pt: 'one week two team gap', fr: 'one week two team gap', da: 'one week two', sv: 'one week two', fi: 'one week two' };
const BW = /\s(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const REFUSED = ['camping/lake', 'easter/egg', 'At the Supermarket/egg', 'zoo animals/bear', 'forest creatures/bear', 'bakery/cake', 'At the Supermarket/cake', 'At the Supermarket/plum', 'At the Supermarket/butter', 'shapes/moon', 'kitchen tools/pan', 'around the house/glass', 'farm animals/ox', 'At the Supermarket/water', 'weather/sun', 'body parts/lip', 'clothing/pants', 'spring/rain', 'shapes/cone', 'At the Supermarket/milk', 'At the Supermarket/juice', 'fruits/cherry', 'fruits/peach', 'fruits/plum', 'christmas/tree'];
const LABEL = {};
for (const f of fs.readdirSync(path.join(MT, 'pictures'))) { if (f[0] === '_') continue; const j = JSON.parse(fs.readFileSync(path.join(MT, 'pictures', f), 'utf8')); for (const [k, v] of Object.entries(j.nouns)) LABEL[j.dir + '/' + k] = v.labels || {}; }

/* the vocabulary names (pictures outside the picture-label files: balloon, reindeer, soccer …) */
const VOC = (() => { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ROOT, 'REFERENCE TRANSLATIONS', 'image-vocabulary.js'), 'utf8') + ';this.V = typeof IMAGE_VOCABULARY !== "undefined" ? IMAGE_VOCABULARY : window.IMAGE_VOCABULARY;', ctx); return ctx.V; })();
const names = (p, loc) => { const n = p.split('/').pop(), out = []; const lab = (LABEL[p] || {})[loc]; if (lab) out.push(lab[0]); if (VOC[n] && VOC[n][loc]) out.push(VOC[n][loc][0]); return out.map(x => x.toLocaleLowerCase()); };

/* ---- the gate's own first-sound classifier ---- */
const SOFT = { en: 'eiy', fr: 'eiyéèê', es: 'eiéí', it: 'ei', pt: 'eiéêí', sv: 'eiyäö', no: 'iy', da: '' };
const VOW = { en: 'aeiou', de: 'aeiouäöü', nl: 'aeiou', da: 'aeiouyæøå', sv: 'aeiouyåäö', no: 'aeiouyæøå', es: 'aeiouáéíóú', it: 'aeiou', pt: 'aeiouáâãéêíóôõú', fr: 'aeiouyéèêâîôûœ', fi: 'aeiouyäö' };
function first(loc, word) {
  const w = String(word).normalize('NFC').toLocaleLowerCase(), c = w[0], soft = (SOFT[loc] || '').includes(w[1] || '');
  const S = (unit, sound) => ({ unit, sound });
  if (VOW[loc].includes(c)) return S(null, 'V' + c);
  const lead = (t) => w.startsWith(t);
  switch (loc) {
    case 'en':
      if (lead('sh') || lead('ch') || lead('th')) return S(w.slice(0, 2), w.slice(0, 2));
      if (lead('kn') || lead('gn')) return S(null, 'n'); if (lead('wr')) return S(null, 'r'); if (lead('wh')) return S(null, 'w'); if (lead('ph')) return S(null, 'f'); if (lead('qu')) return S(null, 'kw');
      if (c === 'c') return soft ? S(null, 's') : S('c', 'k'); if (c === 'k') return S('k', 'k');
      if (c === 'g') return soft ? S(null, 'j?') : S('g', 'g'); if (c === 'x' || c === 'y') return S(null, c);
      return S(c, c);
    case 'de':
      if (lead('sch')) return S('sch', 'ʃ'); if (lead('st') || lead('sp')) return S(null, 'ʃ'); if (lead('ch')) return S(null, 'ch'); if (lead('qu')) return S(null, 'kv');
      if (c === 'v') return S(null, 'f'); if ('cyx'.includes(c)) return S(null, c); if (c === 'w') return S('w', 'v');
      if (['giraffe', 'gelee', 'genie', 'jongleur'].includes(w)) return S(null, 'ʒ');
      return S(c, c);
    case 'nl':
      if (lead('sch')) return S(null, 'sx'); if (lead('ch')) return S(null, 'x'); if (lead('ij')) return S(null, 'Vij'); if ('cqxy'.includes(c)) return S(null, c);
      if (c === 'g') return S('g', 'x'); if (c === 'v' || c === 'f') return S(c, 'f/v'); if (c === 'z' || c === 's') return S(c, 's/z');
      return S(c, c);
    case 'sv':
      if (['sch', 'skj', 'stj', 'sj'].some(lead)) return S('sj', 'ɧ'); if (lead('sk') && 'eiyäö'.includes(w[2] || '')) return S('sk', 'ɧ');
      if (lead('tj') || lead('kj')) return S('tj', 'ɕ'); if (c === 'k' && soft) return S(null, 'ɕ'); if (c === 'g' && soft) return S(null, 'j');
      if (['dj', 'gj', 'hj', 'lj'].some(lead)) return S(null, 'j'); if ('cqxzw'.includes(c)) return S(null, c);
      return S(c, c);
    case 'no':
      if (lead('skj') || lead('sj') || (lead('sk') && 'iy'.includes(w[2] || ''))) return S('skj', 'ʃ'); if (lead('kj') || lead('tj')) return S('kj', 'ç');
      if (c === 'k' && soft) return S(null, 'ç'); if (c === 'g' && (soft || lead('gei'))) return S(null, 'j'); if (['gj', 'hj', 'lj', 'hv'].some(lead)) return S(null, 'j');
      if ('cqxzw'.includes(c)) return S(null, c);
      return S(c, c);
    case 'da':
      if (lead('sj')) return S('sj', 'ɕ'); if (lead('hv')) return S(null, 'v'); if (lead('hj')) return S(null, 'j'); if ('cqxzw'.includes(c)) return S(null, c);
      return S(c, c);
    case 'es':
      if (lead('ch')) return S('ch', 'tʃ'); if (lead('ll')) return S('ll', 'ʝ'); if (lead('qu')) return S('qu', 'k');
      if (c === 'c') return soft ? S(null, 's') : S('c', 'k'); if (c === 'z') return S(null, 's'); if (c === 'g') return soft ? S(null, 'x') : S('g', 'g');
      if (c === 'j') return S('j', 'x'); if (c === 'b' || c === 'v') return S(c, 'b'); if (c === 'y') return S(null, 'ʝ'); if ('hkwx'.includes(c)) return S(null, c);
      return S(c, c);
    case 'it':
      if (lead('ch')) return S('ch', 'k'); if (lead('gn')) return S('gn', 'ɲ'); if (lead('sc') && 'ei'.includes(w[2] || '')) return S('sc', 'ʃ');
      if (lead('gh')) return S(null, 'g'); if (lead('gli')) return S(null, 'ʎ');
      if (c === 'c') return soft ? S(null, 'tʃ') : S('c', 'k'); if (c === 'g') return soft ? S(null, 'dʒ') : S('g', 'g'); if (c === 'q') return S(null, 'k');
      if ('hjkwxy'.includes(c)) return S(null, c);
      return S(c, c);
    case 'pt':
      if (lead('ch')) return S('ch', 'ʃ'); if (lead('qu')) return S(null, 'k');
      if ((c === 't' || c === 'd') && w[1] === 'i') return S(null, c === 't' ? 'tʃ' : 'dʒ');   /* Brazilian: tigre = «tchigre» */
      if (c === 'c') return soft ? S(null, 's') : S('c', 'k'); if (c === 'ç') return S(null, 's'); if (c === 'g') return soft ? S(null, 'ʒ') : S('g', 'g');
      if (c === 'j') return S('j', 'ʒ'); if (c === 'x') return S(null, 'ʃ'); if ('hkwy'.includes(c)) return S(null, c);
      return S(c, c);
    case 'fr':
      if (lead('ch')) return S('ch', 'ʃ'); if (lead('qu')) return S(null, 'k'); if (lead('ph')) return S(null, 'f');
      if (c === 'c') return soft ? S(null, 's') : S('c', 'k'); if (c === 'g') return soft ? S(null, 'ʒ') : S('g', 'g'); if (c === 'j') return S('j', 'ʒ');
      if ('hkwxy'.includes(c)) return S(null, c);
      return S(c, c);
    case 'fi':
      if ('bcdfgqwxzå'.includes(c)) return S(null, c);
      return S(c, c);
  }
}
/* the sound a magnet letter makes (its own primary sound) */
const magSound = (loc, u) => first(loc, u + 'a').sound;
/* DETECT: every letter team a word may hold (a word must hold exactly one); TEAMS: the team magnets each locale shows (es qu has too few pictures) */
const DETECT = { en: ['sh', 'ch', 'th'], de: ['sch', 'ch'], nl: ['ch', 'ng'], fr: ['ch', 'ou', 'on'], es: ['ch', 'll', 'qu'], it: ['ch', 'gn', 'sc'], pt: ['ch', 'lh', 'nh'], no: ['kj', 'ng'], sv: ['ng'], da: ['ng'], fi: [] };
const TEAMS = { en: ['sh', 'ch', 'th'], de: ['sch', 'ch'], nl: ['ch', 'ng'], fr: ['ch', 'ou', 'on'], es: ['ch', 'll'], it: ['ch', 'gn', 'sc'], pt: ['ch', 'lh', 'nh'], no: ['kj', 'ng'], sv: ['ng'], da: ['ng'], fi: [] };
/* the teams a word holds, literally (sch hides the ch inside it: one team, not two) */
function teamsIn(loc, word) {
  let w = String(word).toLocaleLowerCase(); const found = [];
  const ts = DETECT[loc].slice().sort((a, b) => b.length - a.length);
  for (const t of ts) { let i; while ((i = w.indexOf(t)) >= 0) { found.push(t); w = w.slice(0, i) + '#'.repeat(t.length) + w.slice(i + t.length); } }
  return found;
}

/* 0 — words and pictures */
for (const loc of LOCS) {
  const W = C.DATA[loc].words, seen = {};
  for (const [w, p] of Object.entries(W)) {
    is(fs.existsSync(path.join(IMG, p + '@2x.webp')), `${loc} ${w}: picture on disk (${p})`);
    is(!BW.test(p.split('/')[0]), `${loc} ${w}: a colour theme (${p})`);
    is(!REFUSED.includes(p), `${loc} ${w}: not a refused drawing (${p})`);
    is(names(p, loc).includes(w.toLocaleLowerCase()), `${loc} ${w}: the library's own name for ${p} (${names(p, loc)})`);
    is(!seen[p], `${loc} ${w}: picture ${p} not shared with ${seen[p]}`); seen[p] = w;
    is(loc === 'de' ? /^\p{Lu}\p{Ll}+$/u.test(w) : /^\p{Ll}+$/u.test(w), `${loc} ${w}: written as the locale writes it`);
  }
}

/* 1–5 — rounds */
for (const loc of LOCS) {
  is(C.levels(loc).join(' ') === SHOWN[loc], `${loc}: shown levels ${C.levels(loc).join(' ')} (want ${SHOWN[loc]})`);
  if (C.levels(loc).includes('team')) is(C.teamsOf(loc).slice().sort().join() === TEAMS[loc].slice().sort().join(), `${loc}: team magnets ${C.teamsOf(loc)} = ${TEAMS[loc]}`);
  for (const lv of C.levels(loc)) {
    const R = C.rounds(loc, lv), ids = new Set();
    is(R.length >= 7, `${loc} ${lv}: ${R.length} rounds ≥ 7`);
    R.forEach((r, ri) => {
      const tag = `${loc} ${lv} #${ri}`;
      is(!ids.has(r.id), `${tag}: id ${r.id} unique`); ids.add(r.id);
      const words = r.cards.map(c => c.word);
      is(new Set(words).size === words.length, `${tag}: no word twice (${words})`);
      is(r.magnets.every((m, mi) => r.cards.some(c => c.belongs === mi)) || r.level === 'gap', `${tag}: every magnet has a hook`);
      if (lv === 'one' || lv === 'week' || lv === 'two') {
        is(r.cards.length === (lv === 'one' ? 4 : 6), `${tag}: ${r.cards.length} pictures`);
        is(r.magnets.every(m => m.kind === 'letter'), `${tag}: letter magnets`);
        const need = lv === 'one' ? 1 : 3;
        if (lv !== 'two') is(r.cards.filter(c => c.belongs === 0).length === need, `${tag}: ${need} belong`);
        else is(r.cards.every(c => c.belongs === 0 || c.belongs === 1) && r.cards.filter(c => c.belongs === 0).length >= 2 && r.cards.filter(c => c.belongs === 1).length >= 2, `${tag}: each picture under one of two magnets`);
        for (const c of r.cards) {
          const f = first(loc, c.word), lc = c.word.toLocaleLowerCase();
          r.magnets.forEach((m, mi) => {
            const pulls = f.unit === m.label && f.sound === magSound(loc, m.label);
            if (c.belongs === mi) is(pulls, `${tag}: ${c.word} starts with the sound of ${m.label} (own: ${f.unit}/${f.sound})`);
            else {
              is(!pulls, `${tag}: ${c.word} is not pulled by ${m.label}`);
              if (lv !== 'two' || c.belongs < 0) is(!lc.startsWith(m.label) && f.sound !== magSound(loc, m.label), `${tag}: ${c.word} has neither the letter nor the sound of ${m.label}`);
            }
          });
        }
      }
      if (lv === 'team' || (lv === 'gap' && !r.read)) {
        is(r.magnets.every(m => m.kind === 'team' && TEAMS[loc].includes(m.label)), `${tag}: team magnets ${r.magnets.map(m => m.label)}`);
        for (const c of r.cards) {
          const ts = teamsIn(loc, c.word);
          is(ts.length === 1 && ts[0] === c.team, `${tag}: ${c.word} holds exactly the team ${c.team} (own: ${ts})`);
          is(c.belongs >= 0 && r.magnets[c.belongs].label === c.team, `${tag}: ${c.word} hangs on ${c.team}`);
          if (lv === 'gap') {
            const s = c.strip;
            is(s && s.before + s.gap + s.after === c.word && s.gap.toLocaleLowerCase() === c.team, `${tag}: strip ${s && s.before}_${s && s.after} rebuilds ${c.word}`);
          }
        }
        if (lv === 'team') is(r.cards.length === 6, `${tag}: six pictures`);
      }
      if (lv === 'gap' && r.read) {
        is(r.magnets.length === 3 && r.magnets.every(m => m.kind === 'word'), `${tag}: three word magnets`);
        r.magnets.forEach((m, mi) => is(r.cards.filter(c => c.word === m.label).length === 1 && r.cards.find(c => c.word === m.label).belongs === mi, `${tag}: ${m.label} names one picture`));
        r.cards.filter(c => c.belongs < 0).forEach(c => { const t = teamsIn(loc, c.word); is(t.length === 1 && r.magnets.some(m => teamsIn(loc, m.label)[0] === t[0]), `${tag}: decoy ${c.word} shares its letter team with a magnet word`); });
        is(r.cards.length === 6, `${tag}: six pictures`);
        is(r.cards.filter(c => c.belongs >= 0).length === 3 && r.cards.filter(c => c.belongs < 0).every(c => !r.magnets.some(m => m.label === c.word)), `${tag}: exactly the three named pictures hang; the decoys hang nowhere`);
      }
    });
    /* gap levels: the strips appear in the front and at the end */
    if (lv === 'gap') { const ps = R.filter(r => !r.read).flatMap(r => r.cards.map(c => c.strip.before ? 'end' : 'front')); const canFront = C.rounds(loc, 'team').some(r => r.cards.some(c => c.word.toLocaleLowerCase().startsWith(c.team))); is(ps.includes('end') && (!canFront || ps.includes('front')), `${loc} gap: teams inside (and at the front where the locale's words start with one)`); is(R.filter(r => r.read).length >= 2 && R.filter(r => !r.read).length >= 5, `${loc} gap: ≥ 5 strip rounds + ≥ 2 read-and-match`); }
  }
}

/* 6 — the switch */
for (const loc of LOCS) for (const lv of C.levels(loc)) {
  C.rounds(loc, lv).forEach((r, ri) => {
    const tag = `${loc} ${lv} #${ri}`;
    let st = C.newState(r, {});
    let res = C.flip(st); is(res.kase === 'empty' && st.misses === 0 && C.hint(st) && /^hintEmpty/.test(C.hint(st)), `${tag}: empty switch asks, no miss`);
    const right = r.cards.map((c, i) => [c, i]).filter(x => x[0].belongs >= 0), wrong = r.cards.map((c, i) => [c, i]).filter(x => x[0].belongs < 0);
    /* a wrong picture stays, the right one lifts and stays lifted */
    if (wrong.length || r.magnets.length > 1) {
      st = C.newState(r, {});
      const [rc, ri2] = right[0], many = right.length >= 2;
      if (many) C.toZone(st, ri2, rc.belongs);
      let wi = -1, wm = 0;
      if (wrong.length) { wi = wrong[0][1]; wm = 0; } else { const o = right.find(x => x[0].belongs !== rc.belongs); wi = o[1]; wm = rc.belongs; }
      C.toZone(st, wi, wm);
      res = C.flip(st);
      is(!res.ok && res.kase === 'stayed' && st.misses === 1, `${tag}: a wrong picture → stayed, miss 1`);
      if (many) is(st.hung[rc.belongs].includes(ri2), `${tag}: the right picture stays on its hook`);
      is(C.whereIs(st, wi).table === true, `${tag}: the wrong picture is back on the table`);
      is(!C.helpOn(st), `${tag}: no help at miss 1`);
      if (many) is(C.toZone(st, ri2, 0) === false, `${tag}: a hung picture cannot move`);
      C.toZone(st, wi, wm); C.flip(st);
      is(st.misses === 2 && C.helpOn(st) && /^hintHelp/.test(C.hint(st)), `${tag}: help at miss 2`);
      is(C.tabOf(st, wi).length >= 1, `${tag}: a tab`);
      C.toZone(st, wi, wm); is(!C.helpOn(st) && C.hint(st) === null, `${tag}: a move takes the help away`);
      C.toTable(st, wi);
      /* one hook: the right picture with a wrong one → done, the wrong one stays down and counts a miss */
      if (!many) { st = C.newState(r, {}); C.toZone(st, ri2, rc.belongs); C.toZone(st, wi, wm); res = C.flip(st); is(res.ok && st.done && st.misses === 1 && res.stayed.length === 1 && res.stayed[0].card === wi, `${tag}: one hook filled beside a wrong picture → done, the wrong one stayed (miss)`); }
    }
    /* partial → hooks (when a magnet has ≥ 2 hooks) */
    const big = r.magnets.findIndex((m, mi) => C.hooksOf(r, mi) >= 2);
    if (big >= 0) { st = C.newState(r, {}); C.toZone(st, r.cards.findIndex(c => c.belongs === big), big); res = C.flip(st); is(res.kase === 'hooks' && C.hint(st) === 'hintHooks' || (C.hint(st) || '').startsWith('hintHelp') === false && res.kase === 'hooks', `${tag}: one of several → hooks`); }
    /* all right → done */
    st = C.newState(r, {}); right.forEach(([c, i]) => C.toZone(st, i, c.belongs)); res = C.flip(st);
    is(res.ok && st.done, `${tag}: all right → done`);
    is(C.toZone(st, 0, 0) === false && C.toTable(st, 0) === false, `${tag}: nothing moves after done`);
  });
}

/* 7 — deals and order */
for (const loc of LOCS) for (const lv of C.levels(loc)) {
  const R = C.rounds(loc, lv), rnd = C.seeded(loc + lv);
  const cols = R[0].cards.length === 4 ? 2 : 3;
  const share = {}, tot = {};
  for (let p = 0; p < 40; p++) {
    const D = C.dealTables(R, rnd, cols);
    D.forEach((o, i) => {
      const r = R[i];
      is(o.length === r.cards.length && new Set(o).size === o.length, `${loc} ${lv}: deal is a permutation`);
      if (o.length > cols) for (let row = 0; row * cols < o.length; row++) { const cells = o.slice(row * cols, row * cols + cols).map(ci => r.cards[ci].belongs); r.magnets.forEach((m, mi) => { const all = r.cards.filter(c => c.belongs === mi).length; if (all > 1) is(cells.filter(b => b === mi).length < all, `${loc} ${lv} #${i}: magnet ${mi}'s pictures not all in one row`); }); }
      o.forEach((ci, slot) => { const k = o.length + ':' + slot; tot[k] = (tot[k] || 0) + 1; if (r.cards[ci].belongs >= 0) share[k] = (share[k] || 0) + 1; });
    });
  }
  /* the right pictures spread: no slot right more than 1.6× the average for its table size */
  const by = {}; Object.keys(tot).forEach(k => { const n = k.split(':')[0]; (by[n] = by[n] || []).push((share[k] || 0) / tot[k]); });
  Object.entries(by).forEach(([n, a]) => { const avg = a.reduce((x, y) => x + y, 0) / a.length; is(Math.max(...a) <= avg * 1.6 + 0.02, `${loc} ${lv}: slot shares ${a.map(x => x.toFixed(2))} spread`); });
  /* a deterministic draw: the same shuffle every time must still never repeat the previous order */
  const fixed = () => 0.37, o1 = C.order(R, fixed, null), o2 = C.order(R, fixed, o1);
  is(o1.join() !== o2.join() && new Set(o2).size === R.length, `${loc} ${lv}: order() refuses the previous order even when the draw repeats`);
  let prev = null; for (let t = 0; t < 200; t++) { const o = C.order(R, Math.random, prev); is(!prev || o.join() !== prev.join(), `${loc} ${lv}: order never repeats`); is(new Set(o).size === R.length, `${loc} ${lv}: order is a permutation`); prev = o; }
}

/* 8 — strings, manifest, metadata */
const S = A.strings, KEYS = Object.keys(S);
for (const k of KEYS) {
  const ph = (s) => (String(s).match(/\{\w+\}/g) || []).sort().join();
  for (const loc of LOCS) {
    is(typeof S[k][loc] === 'string' && S[k][loc].trim(), `strings.${k}.${loc} authored`);
    is(ph(S[k][loc]) === ph(S[k].en), `strings.${k}.${loc}: same placeholders as en`);
    is(!/\b(free|gratis|kostenlos|gratuit|gratuito|grátis|ilmainen|gratuita)\b/i.test(S[k][loc] || ''), `strings.${k}.${loc}: nothing "free"`);
  }
}
const HINTS = ['hintEmpty', 'hintEmptyTwo', 'hintEmptyTeam', 'hintEmptyRead', 'hintHelp', 'hintHelpTeam', 'hintHelpRead', 'hintStayed', 'hintStayedTeam', 'hintStayedRead', 'hintHooks'];
HINTS.forEach(h => is(KEYS.includes(h), `hint ${h} authored`));
['pOne', 'pWeek', 'pTwo', 'pTeam', 'pGap', 'pRead', 'okOne', 'okWeek', 'okTwo', 'okTeam', 'okRead', 'lvOne', 'lvWeek', 'lvTwo', 'lvTeam', 'lvGap'].forEach(k => is(KEYS.includes(k), `string ${k} authored`));
const SRC = fs.readFileSync(path.join(DIR, 'letter-magnet-core.js'), 'utf8');
HINTS.forEach(h => is(SRC.includes("'" + h + "'"), `core can return ${h}`));
const M = JSON.parse(fs.readFileSync(path.join(MT, 'choice-board-activities.json'), 'utf8')).find(r => r.id === 'choice-board.beginning-sound.rf-k-3-a');
is(M && M.tool === 'letter-magnet-activity', 'manifest row runs letter-magnet-activity');
for (const loc of LOCS) {
  const want = {}; C.levels(loc).forEach(v => { want[v] = C.rounds(loc, v).length; });
  is(M && JSON.stringify(M.params.byLocale[loc]) === JSON.stringify(want), `manifest mirrors the core for ${loc}`);
  is(M && /^[a-z0-9-]+$/.test(M.slug[loc] || ''), `slug ${loc} url-safe`);
  is(M && (M.page_intro || {})[loc], `page intro ${loc} present (frozen)`);
}

console.log(`verify-letter-magnet-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
