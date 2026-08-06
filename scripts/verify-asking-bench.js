#!/usr/bin/env node
/* =====================================================================
   verify-asking-bench.js — the measured gate for TOOL #36.

   ⚠ WHAT THIS GATE CAN AND CANNOT DO, STATED HONESTLY UP FRONT.
   It CANNOT prove the German is right. Nothing can, short of the native
   panel that authored it and the operator's eye. What it CAN do is make
   whole classes of wrongness structurally impossible, and then exhaust
   the authored cross-product looking for the rest:

     M-TOTALITY        every tuple renders; no `undefined` reaches a board
     M-CLOSURE ⭐      every surface string is AUTHORED, verbatim. Nothing
                       is concatenated, inflected or generated — which is
                       what lets a Finnish -ko form be DATA and vowel
                       harmony be a CHECK rather than a function
     M-CONSERVATION ⭐ the asking and the telling are the SAME CARDS, plus
                       exactly the ones the recipe declares it inserts
     M-ROUNDTRIP       tell(ask(t)) === t
     M-DERIVATION ⭐   the legend is computed from the recipe AND matches
                       what actually happened. Every `front` must move an
                       index; every `insert` must add a card; every
                       `reshape` must produce a GENUINELY different word —
                       the likeliest authoring bug in the whole tool is a
                       reshape whose target equals its base, so the tool
                       announces "a word changes its shape" and the class
                       sees nothing change. That is a lie on a board.
     M-CLAIM-INDEPENDENCE ⭐ the no-verdict THEOREM: for every tuple and
                       all SIXTEEN subsets of the claim set, the rendered
                       output is byte-identical. The output is not a
                       function of the claim, so the tool cannot grade.
     M-FENCE           no wh-word in any table (wren owns them); no hand
                       reorder (sentence-builder); no child-placed end
                       mark (sentence-clinic); no tasks/nextTask
     M-NOMINATIVE      no case forms anywhere; the subject never moves
     M-FI              -ko iff a back-vowel stem, AND the particle is
                       locked to the verb (fronting a noun would emit a
                       contrastive-focus question — a different meaning)
     M-TYPOGRAPHY      es opens ¿; fr uses U+202F before ?
     M-PARALLELISM     the frame/noun/verb id sets match across locales
     M-IDENTITY        two fetch URLs only; no exfil; no tasks

   Usage: node scripts/verify-asking-bench.js
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const TOOL_DIR = process.env.ABN_TOOL_DIR || path.join(ROOT, 'mini tools');
const SRC = fs.readFileSync(path.join(TOOL_DIR, 'asking-bench.js'), 'utf8');
const SRC_NC = SRC.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '');

let ERRORS = 0, WARNS = 0;
const err = (m) => { ERRORS++; console.error('  ERROR  ' + m); };
const warn = (m) => { WARNS++; console.log('  warn   ' + m); };

const sandbox = {
  document: { getElementById: () => null, createElement: () => ({ style: {}, setAttribute() {}, appendChild() {}, append() {} }),
    head: { appendChild() {} }, body: { classList: { add() {}, remove() {} } } },
  window: {}, localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console, module: { exports: {} }
};
vm.createContext(sandbox);
vm.runInContext(SRC + '\n;this.__T = AskingBench;', sandbox);
const T = sandbox.__T;

const ALL_LOCALES = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
/* only the locales whose grammar table exists yet — the en pilot runs
   first by design, and PARALLELISM is asserted over whatever is present */
const LOCALES = ALL_LOCALES.filter((l) => fs.existsSync(path.join(TOOL_DIR, `asking-bench-grammar-${l}.json`)));
const DATA = {};
LOCALES.forEach((l) => { DATA[l] = JSON.parse(fs.readFileSync(path.join(TOOL_DIR, `asking-bench-grammar-${l}.json`), 'utf8')); });
if (!LOCALES.length) { console.error('  FATAL no grammar tables found'); process.exit(1); }

/* every tuple the tool can reach, per locale */
function cases(d) {
  const out = [];
  (d.frames || []).forEach((f) => {
    const verbs = T.verbsFor(d, f.id);
    const adjs = f.slots.indexOf('adj') > -1 ? d.adjs : [null];
    const objs = f.slots.indexOf('obj') > -1 ? d.objs : [null];
    const mains = f.slots.indexOf('mainVerb') > -1 ? d.mains : [null];
    (d.nouns || []).forEach((n) => verbs.forEach((v) => adjs.forEach((a) => objs.forEach((o) => mains.forEach((m) => {
      (d.registers || []).forEach((r) => out.push({
        frameId: f.id, nounKey: n.key, verbId: v.id,
        adjKey: a ? a.key : null, objKey: o ? o.key : null, mainKey: m ? m.key : null,
        register: r.id, claim: [], asked: false, stack: []
      }));
    })))));
  });
  return out;
}

/* the complete set of strings a locale has AUTHORED */
function authored(d) {
  const s = new Set();
  (d.nouns || []).forEach((n) => Object.keys(n).forEach((k) => { if (k !== 'key') s.add(n[k]); }));
  (d.verbs || []).forEach((v) => Object.keys(v).forEach((k) => { if (k !== 'id' && k !== 'class') s.add(v[k]); }));
  (d.adjs || []).forEach((a) => s.add(a.form));
  (d.mains || []).forEach((m) => s.add(m.form));
  (d.objs || []).forEach((o) => s.add(o.form));
  Object.keys(d.decap || {}).forEach((k) => s.add(d.decap[k]));
  return s;
}

console.log('[the map]');
LOCALES.forEach((loc) => {
  const d = DATA[loc], C = cases(d), AUTH = authored(d);
  let n = 0;

  /* ---------------- M-TOTALITY ---------------- */
  for (const st of C) {
    const tell = T.tellTokens(d, st), ask = T.askTokens(d, st);
    if (!tell.length) { err(`M-TOTALITY ${loc} ${T.recipeKey(d, st)} rendered no telling`); break; }
    if (!ask.length) { err(`M-TOTALITY ${loc} ${T.recipeKey(d, st)} rendered no asking`); break; }
    if (!T.recipe(d, st)) { err(`M-TOTALITY ${loc} has no recipe for ${T.recipeKey(d, st)}`); break; }
    if (tell.concat(ask).some((t) => typeof t.text !== 'string' || !t.text)) {
      err(`M-TOTALITY ${loc} ${T.recipeKey(d, st)} produced an empty token`); break;
    }
    n++;
  }
  if (!ERRORS) console.log(`  M-TOTALITY ${loc}: ${n} tuples, every one renders both rails`);

  /* ---------------- M-CLOSURE ⭐ ---------------- */
  let bad = null;
  for (const st of C) {
    for (const t of T.tellTokens(d, st).concat(T.askTokens(d, st))) {
      if (!AUTH.has(t.text)) { bad = `${loc} "${t.text}" is not an authored string (${T.recipeKey(d, st)})`; break; }
    }
    if (bad) break;
  }
  if (bad) err('M-CLOSURE ' + bad);
  /* and the render path must contain no concatenation of word pieces */
  if (/\+\s*['"](?:ko|kö|s|es|ed|en|t|e)['"]/.test(SRC_NC)) err('M-CLOSURE a morpheme is concatenated in code');
  if (/toUpperCase|toLowerCase|slice\(0,\s*1\)/.test(SRC_NC)) err('M-CLOSURE the code case-shifts a word instead of looking one up');
  if (!ERRORS) console.log(`  M-CLOSURE ${loc}: every surface string is authored verbatim (${AUTH.size} in the table)`);

  /* ---------------- M-CONSERVATION ⭐ ---------------- */
  for (const st of C) {
    const r = T.recipe(d, st);
    const tellIds = T.tellTokens(d, st).map((t) => t.id).sort();
    const askIds = T.askTokens(d, st).map((t) => t.id).sort();
    const declared = (r.ops || []).filter((o) => o.op === 'insert').map((o) => o.slot).sort();
    const want = tellIds.concat(declared).sort();
    if (askIds.join('|') !== want.join('|')) {
      err(`M-CONSERVATION ${loc} ${T.recipeKey(d, st)}: asking holds [${askIds}] but the telling plus declared inserts is [${want}]`);
      break;
    }
  }
  if (!ERRORS) console.log(`  M-CONSERVATION ${loc}: the asking is the same cards, plus exactly what the recipe declares`);

  /* ---------------- M-ROUNDTRIP ---------------- */
  for (const st of C) {
    let s = st;
    for (let i = 0; i < 4; i++) { s = T.tellAgain(T.ask(d, s, false)); }
    const keys = ['frameId', 'nounKey', 'verbId', 'adjKey', 'objKey', 'register', 'asked'];
    if (keys.some((k) => JSON.stringify(s[k]) !== JSON.stringify(st[k]))) {
      err(`M-ROUNDTRIP ${loc} ${T.recipeKey(d, st)} was lossy over four flips`); break;
    }
  }
  if (!ERRORS) console.log(`  M-ROUNDTRIP ${loc}: tell(ask(t)) === t over four flips`);

  /* ---------------- M-DERIVATION ⭐ ---------------- */
  for (const st of C) {
    const r = T.recipe(d, st);
    const tell = T.tellTokens(d, st), ask = T.askTokens(d, st);
    const ops = T.opsOf(d, st);
    const legend = T.legend(d, st);
    if (!legend.length) { err(`M-DERIVATION ${loc} ${T.recipeKey(d, st)} lights no legend at all`); break; }

    if (ops.arrives) {
      if (!ask.some((t) => t.arrived)) { err(`M-DERIVATION ${loc} ${T.recipeKey(d, st)} claims a word arrives, none did`); break; }
    } else if (ask.some((t) => t.arrived)) {
      err(`M-DERIVATION ${loc} ${T.recipeKey(d, st)} a word arrived that the recipe never declared`); break;
    }

    if (ops.jumps) {
      const moved = ask.findIndex((t) => t.moved);
      const before = tell.findIndex((t) => t.id === (ask[moved] || {}).id);
      if (moved < 0 || !(moved < before)) {
        err(`M-DERIVATION ${loc} ${T.recipeKey(d, st)} claims a word jumps forward, index did not decrease`); break;
      }
    }

    if (ops.shape) {
      /* ⚠ GENUINELY different, not merely re-capitalised. A reshape whose
         target equals its base is the likeliest authoring mistake here,
         and it would have the tool announce a change the class cannot
         see. Case-folding is done in the GATE, never in the tool. */
      const real = ask.some((t) => t.was && t.was.toLowerCase() !== t.text.toLowerCase());
      if (!real) { err(`M-DERIVATION ${loc} ${T.recipeKey(d, st)} claims a word changes shape, but no word did`); break; }
    }

    if (ops.nothing) {
      if (ask.some((t) => t.arrived || t.moved)) { err(`M-DERIVATION ${loc} ${T.recipeKey(d, st)} says nothing moves, something did`); break; }
    }
    /* the end mark is never a claim: it lights on every case and so says nothing */
    if (legend.indexOf('wrap') > -1) { err('M-DERIVATION the end mark leaked into the legend'); break; }
  }
  if (!ERRORS) console.log(`  M-DERIVATION ${loc}: the legend matches what actually happened, every tuple`);

  /* ---------------- M-CLAIM-INDEPENDENCE ⭐ ---------------- */
  let checked = 0;
  for (const st of C) {
    const base = JSON.stringify({ a: T.askTokens(d, st), l: T.legend(d, st), e: T.endMark(d, st, true) });
    for (let mask = 0; mask < 16; mask++) {
      const s = T._clone(st);
      s.claim = T.CLAIMS.filter((c, i) => mask & (1 << i));
      const got = JSON.stringify({ a: T.askTokens(d, s), l: T.legend(d, s), e: T.endMark(d, s, true) });
      if (got !== base) {
        err(`M-CLAIM-INDEPENDENCE ${loc} ${T.recipeKey(d, st)} the output CHANGED with the claim (mask ${mask}) — the tool can grade`);
        mask = 16; break;
      }
      checked++;
    }
    if (ERRORS) break;
  }
  if (!ERRORS) console.log(`  M-CLAIM-INDEPENDENCE ${loc} ⭐: output identical across all 16 claim subsets — ${checked.toLocaleString('en-US')} checks`);

  /* ---------------- M-FENCE ---------------- */
  /* ⚠ A WH-WORD IS A FACT ABOUT A LANGUAGE, so the ban is per-locale AND
     narrowed to the tables where a question word has no business at all.
     The first draft banned all 24 tokens from every table and fired on
     English "was" — which is the past of *be*, not German *what*. Swedish
     "var" is the same trap (where / was). The structural guarantee that
     actually matters is below it: this tool builds YES/NO questions only,
     so no slot is ever a question word and no recipe can insert a free
     string. wren-question-window keeps the wh-set; we never go near it. */
  const WH_BY_LOCALE = {
    en: ['who', 'what', 'where', 'when', 'why', 'how'],
    de: ['wer', 'was', 'wo', 'wann', 'warum', 'wie'],
    fr: ['qui', 'où', 'quand', 'pourquoi', 'comment'],
    es: ['quién', 'qué', 'dónde', 'cuándo', 'cómo'],
    pt: ['quem', 'onde', 'quando', 'porque', 'como'],
    it: ['chi', 'dove', 'quando', 'perché', 'come'],
    nl: ['wie', 'wat', 'waar', 'wanneer', 'waarom', 'hoe'],
    sv: ['vem', 'vad', 'när', 'varför', 'hur'],
    da: ['hvem', 'hvad', 'hvornår', 'hvorfor', 'hvordan'],
    no: ['hvem', 'hva', 'når', 'hvorfor', 'hvordan'],
    fi: ['kuka', 'mikä', 'missä', 'milloin', 'miksi', 'miten']
  };
  const nonVerb = JSON.stringify({ n: d.nouns, a: d.adjs, o: d.objs }).toLowerCase();
  (WH_BY_LOCALE[loc] || []).forEach((w) => {
    if (new RegExp('"' + w + '"|\\b' + w + '\\b', 'i').test(nonVerb)) {
      err(`M-FENCE ${loc} a noun/adj/obj is the question word "${w}" — wren-question-window owns those`);
    }
  });
  /* the structural guarantee: no wh slot exists, and an insert can only
     ever produce a field authored on the VERB — never a free string */
  (d.frames || []).forEach((f) => {
    if (f.slots.some((s) => /^(wh|qword|question)/.test(s))) err(`M-FENCE ${loc} frame ${f.id} declares a question-word slot`);
  });
  Object.keys(d.recipes || {}).forEach((k) => {
    (d.recipes[k].ops || []).forEach((op) => {
      if (op.op !== 'insert') return;
      if (typeof op.text === 'string') err(`M-FENCE ${loc} recipe ${k} inserts a free string — inserts must name a field on the verb`);
      const bad2 = (d.verbs || []).filter((v) => typeof v[op.slot] !== 'string');
      if (bad2.length === (d.verbs || []).length) err(`M-FENCE ${loc} recipe ${k} inserts "${op.slot}", which no verb authors`);
    });
  });
  if (/reorder|dragToOrder|scramble/i.test(SRC_NC)) err('M-FENCE a reorder path exists — sentence-builder owns that');
  if (/endMarkChip|punctChip|markChip/i.test(SRC_NC)) err('M-FENCE a child-placed end mark exists — sentence-clinic owns that');

  /* ---------------- M-WELLFORMED ----------------
     ⚠ THE CHECK THAT CATCHES "The dog can." A frame's slot list and the
     verb classes it admits have to agree, and nothing else in the gate
     can see that a rendered sentence is nonsense. Born from a real bug
     in the pilot table: S-V admitted a modal, rendered cleanly, passed
     TOTALITY, CLOSURE, CONSERVATION and DERIVATION, and was not a
     sentence. Caught by reading the output. */
  (d.frames || []).forEach((f) => {
    const hasMain = f.slots.indexOf('mainVerb') > -1;
    const takesModal = (f.verbClasses || []).indexOf('modal') > -1;
    if (takesModal && !hasMain) err(`M-WELLFORMED ${loc} frame ${f.id} admits a modal but has no main verb after it — that renders "… can." and is not a sentence`);
    if (hasMain && !takesModal) err(`M-WELLFORMED ${loc} frame ${f.id} has a main-verb slot but admits no modal to license it`);
    if (hasMain && !(d.mains || []).length) err(`M-WELLFORMED ${loc} frame ${f.id} needs a main-verb list and the table has none`);
    if ((f.verbClasses || []).indexOf('beSg') > -1 && f.slots.indexOf('adj') === -1 && f.slots.indexOf('obj') === -1) {
      err(`M-WELLFORMED ${loc} frame ${f.id} admits *be* with nothing to be — that renders "… is."`);
    }
    (f.verbClasses || []).forEach((c) => {
      if (!(d.verbs || []).some((v) => v.class === c)) err(`M-WELLFORMED ${loc} frame ${f.id} admits class "${c}" and no verb has it`);
    });
  });
  /* every (frame, class, register) the tool can reach must have a recipe */
  (d.frames || []).forEach((f) => (f.verbClasses || []).forEach((c) => (d.registers || []).forEach((r) => {
    if (!(d.recipes || {})[f.id + '|' + c + '|' + r.id]) err(`M-WELLFORMED ${loc} no recipe for ${f.id}|${c}|${r.id}`);
  })));
  if (!ERRORS) console.log(`  M-WELLFORMED ${loc}: every frame's slots agree with the verb classes it admits`);

  /* ---------------- M-NOMINATIVE ---------------- */
  if (/"(acc|dat|gen|akkusativ|partitiv|genitiv|accusative|dative)"/i.test(JSON.stringify(d))) {
    err(`M-NOMINATIVE ${loc} a case form is authored — the subject is nominative and never moves`);
  }
  (d.nouns || []).forEach((nn) => {
    const extra = Object.keys(nn).filter((k) => k !== 'key' && k !== 'subjSg' && k !== 'subjPl');
    if (extra.length) err(`M-NOMINATIVE ${loc} noun "${nn.key}" carries a non-subject form: ${extra.join(', ')}`);
  });
  /* the subject must never be fronted or reshaped, in any recipe */
  Object.keys(d.recipes || {}).forEach((k) => {
    (d.recipes[k].ops || []).forEach((op) => {
      if (op.slot === 'subject' && op.op !== 'decap') err(`M-NOMINATIVE ${loc} recipe ${k} moves or reshapes the subject`);
    });
  });

  /* ---------------- M-FI ---------------- */
  if (loc === 'fi') {
    (d.verbs || []).forEach((v) => {
      Object.keys(v).forEach((k) => {
        if (!/_ko$/.test(k)) return;
        const form = v[k];
        const back = /[aou]/.test(String(v.finite || '').toLowerCase());
        const endsKo = /ko$/.test(form), endsKö = /kö$/.test(form);
        if (back && !endsKo) err(`M-FI ${v.id} has a back-vowel stem but the particle is not -ko: "${form}"`);
        if (!back && !endsKö) err(`M-FI ${v.id} has a front-vowel stem but the particle is not -kö: "${form}"`);
      });
    });
    Object.keys(d.recipes || {}).forEach((k) => {
      (d.recipes[k].ops || []).forEach((op) => {
        if (op.op === 'suffix' && op.slot !== 'verb') {
          err(`M-FI recipe ${k} attaches the particle to "${op.slot}" — it must be the VERB, or the asking becomes a contrastive-focus question`);
        }
      });
    });
  }

  /* ---------------- M-TYPOGRAPHY ---------------- */
  if (loc === 'es') {
    Object.keys(d.recipes || {}).forEach((k) => {
      if (d.recipes[k].open !== '¿') err(`M-TYPOGRAPHY es recipe ${k} does not open with ¿`);
    });
  }
  if (loc === 'fr') {
    Object.keys(d.recipes || {}).forEach((k) => {
      const w = d.recipes[k].wrap || '';
      if (w.indexOf('?') > -1 && w.indexOf(' ') === -1) {
        err(`M-TYPOGRAPHY fr recipe ${k} has no narrow no-break space before the question mark`);
      }
    });
  }
});

/* ---------------- M-PARALLELISM ---------------- */
console.log('');
console.log('[across locales]');
(function () {
  if (LOCALES.length < 2) { console.log(`  M-PARALLELISM skipped — only ${LOCALES.join(', ')} authored so far`); return; }
  const ref = LOCALES[0], key = (d, k, f) => (d[k] || []).map((x) => x[f]).sort().join(',');
  LOCALES.slice(1).forEach((loc) => {
    [['frames', 'id'], ['nouns', 'key'], ['verbs', 'id']].forEach(([k, f]) => {
      if (key(DATA[loc], k, f) !== key(DATA[ref], k, f)) {
        err(`M-PARALLELISM ${loc}.${k} ids differ from ${ref} — the side-by-side would be undefined`);
      }
    });
  });
  if (!ERRORS) console.log(`  M-PARALLELISM frame/noun/verb id sets identical across ${LOCALES.length} locales`);
}());

/* ---------------- M-IDENTITY ---------------- */
(function () {
  if (T.id !== 'asking-bench') err(`M-IDENTITY id is "${T.id}"`);
  if (T.STORE_KEY !== 'lcs:asking-bench:v1') err(`M-IDENTITY STORE_KEY is "${T.STORE_KEY}"`);
  if (T.tasks || T.nextTask) err('M-IDENTITY the tool declares tasks/nextTask — it would become a graded activity');
  if (/^\s*(tasks|nextTask)\s*:/m.test(SRC_NC)) err('M-IDENTITY a tasks/nextTask key is declared in source');
  if (/sendBeacon|WebSocket|XMLHttpRequest|\/track|analytics/.test(SRC_NC)) err('M-IDENTITY an exfiltration path exists');
  /* ⚠ EXACTLY TWO NETWORK CALLS, both named. The entitlement check every
     tool makes, and the sibling grammar file for this locale. A third
     would be something nobody decided to add. */
  const urls = [];
  SRC_NC.replace(/fetch\(\s*['"]([^'"]+)['"]/g, (_, u) => { urls.push(u); return _; });
  const tmpl = [];
  SRC_NC.replace(/fetch\(\s*'([^']*asking-bench-grammar-)'/g, (_, u) => { tmpl.push(u); return _; });
  const known = urls.concat(tmpl).filter((u) => /^\/api\/auth\/me$|asking-bench-grammar-/.test(u));
  if (known.length !== urls.length + tmpl.length || !known.length) {
    err(`M-IDENTITY unexpected network calls: ${urls.concat(tmpl).join(', ') || 'none'}`);
  }
  if (urls.indexOf('/api/auth/me') === -1) err('M-IDENTITY the entitlement check is missing');
  const BANNED = /\b(isCorrect|score|streak|stopwatch|countdown|winner|matched|mismatch)\b/;
  const hit = BANNED.exec(SRC_NC);
  if (hit) err(`M-IDENTITY verdict/timing machinery: "${hit[0]}"`);
  if (!ERRORS) console.log('  M-IDENTITY ok; NO tasks/nextTask — the tool claims no CCSS code at all');
}());

/* ---------------- strings ---------------- */
(function () {
  const keys = Object.keys(T.strings);
  keys.forEach((k) => ALL_LOCALES.forEach((loc) => {
    const v = T.strings[k][loc];
    if (!v || typeof v !== 'string' || !v.trim()) err(`strings ${loc}.${k} is missing`);
  }));
  (SRC_NC.match(/api\.t\('([a-zA-Z]+)'\)/g) || []).forEach((call) => {
    const k = /api\.t\('([a-zA-Z]+)'\)/.exec(call)[1];
    if (!T.strings[k]) err(`strings api.t('${k}') has no authored string`);
  });
  T.CLAIMS.forEach((c) => { if (!T.strings[T.CLAIM_LABEL[c]]) err(`strings claim "${c}" has no label`); });
  if (!ERRORS) console.log(`  strings ${keys.length} keys across ${ALL_LOCALES.length} locales`);
}());

console.log('');
console.log(ERRORS ? `FAIL — ${ERRORS} error(s), ${WARNS} warning(s)` : `PASS — 0 errors, ${WARNS} warning(s)`);
process.exit(ERRORS ? 1 : 0);
