#!/usr/bin/env node
/* =====================================================================
   verify-verb-gates-core.js — the gate for ACTIVITY #123, The Verb Gates
   (Vera's Verb Match, L.1.1.c; all 11 locales). Its OWN ground truth,
   written here independently of the core:
     · every subject of every round, classified: I · we · one · many
       (and, in sv/da/no, its gender: en/et-word or ett/et-word), with the
       picture that must walk for it;
     · each locale's forms of be (present + past), its singular/plural
       verb pairs, and the sv/da/no adjective inflection (common · neuter
       · plural) as rules;
     · where "we" may appear at all (only where we and they share the verb
       form: en de nl sv da no — fr nous sommes, es estamos, pt estamos,
       it stiamo, fi olemme would need a fourth gate).
   So every round's right gate and every gate's word are DERIVED.
   It asserts:
     (a) 11 locales × 5 levels (sv/da/no 3) × 9 rounds; every picture
         exists with its exact case, in a colour theme; the crowd is the
         subject (I = the star alone, we = the star + one, one = one
         picture, many = two to four);
     (b) the gates on the rack are the derived forms; the right gate is
         the derived one; the subject is in the sentence;
     (c) the walk: only the right gate lets the whole crowd through, for
         every round and gate; Check's reasons (derived), the hints, the
         glow from miss 2, the clue at miss 1 (sv/da/no: the article);
         hang / take; the success line's case;
     (d) every level mixes its right gates (each 2–5 of 9);
     (e) the plan: a fresh order, never three rounds in a row with the
         same right gate, never the same subject twice in a row;
     (f) the bots: always the turnstile ≤ 5/9; en levels 4–5 "an s on
         the verb when the subject ends in s" ≤ 1/9;
     (g) the strings ×11, the prose quotes, the manifest row.
   Usage: node scripts/verify-verb-gates-core.js   (env VG_CORE_DIR / VG_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools'), IMG = path.join(REPO, 'image-library-webp', 'themes');
const CORE_DIR = process.env.VG_CORE_DIR || MT, ACT_DIR = process.env.VG_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'verb-gates-core.js'));
const ACT = (() => { const ctx = { window: {}, VerbGatesCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'verb-gates-activity.js'), 'utf8') + '\n;this.__A = window.VerbGatesActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'], NORD = ['sv', 'da', 'no'];
const BW = /(?:^|\s)(bw|sw|bn|nb|zw|sh|pb|mv|sv)(\s+\d+)?$/i;
const WE_OK = ['en', 'de', 'nl', 'sv', 'da', 'no'];

/* ---------------- the own tables ---------------- */
/* subjects: [kind, picture, nordic gender] — kind I / we / one / many; the picture that must walk; t = ett/et-word */
const S = (o) => o;
const SUBJ = {
  en: S({ 'i': ['I'], 'we': ['we'], 'the dog': ['one', 'dog'], 'the dogs': ['many', 'dog'], 'the cat': ['one', 'cat'], 'the cats': ['many', 'cat'], 'the bird': ['one', 'bird'], 'the birds': ['many', 'bird'],
    'the pig': ['one', 'pig'], 'the pigs': ['many', 'pig'], 'the frog': ['one', 'frog'], 'the frogs': ['many', 'frog'], 'the rabbit': ['one', 'rabbit'], 'the rabbits': ['many', 'rabbit'],
    'she': ['one', 'girl'], 'it': ['one', 'dog'], 'they': ['many', 'girl'], 'mia and zoe': ['many', 'girl'], 'the farmer': ['one', 'farmer'] }),
  de: S({ 'ich': ['I'], 'wir': ['we'], 'der hund': ['one', 'dog'], 'die hunde': ['many', 'dog'], 'die katze': ['one', 'cat'], 'die katzen': ['many', 'cat'], 'der vogel': ['one', 'bird'], 'die vögel': ['many', 'bird'],
    'der frosch': ['one', 'frog'], 'die frösche': ['many', 'frog'], 'die schweine': ['many', 'pig'], 'das schwein': ['one', 'pig'], 'das pferd': ['one', 'horse'], 'das kaninchen': ['one', 'rabbit'], 'die kaninchen': ['many', 'rabbit'],
    'mia': ['one', 'girl'], 'mia und lena': ['many', 'girl'], 'es': ['one', 'dog'], 'die mädchen': ['many', 'girl'], 'der bauer': ['one', 'farmer'] }),
  fr: S({ 'je': ['I'], "j'": ['I'], 'le chien': ['one', 'dog'], 'les chiens': ['many', 'dog'], 'le chat': ['one', 'cat'], 'les chats': ['many', 'cat'], "l'oiseau": ['one', 'bird'], 'les oiseaux': ['many', 'bird'],
    'la grenouille': ['one', 'frog'], 'les grenouilles': ['many', 'frog'], 'les cochons': ['many', 'pig'], 'le cochon': ['one', 'pig'], 'le cheval': ['one', 'horse'], 'le lapin': ['one', 'rabbit'], 'les lapins': ['many', 'rabbit'],
    'mia': ['one', 'girl'], 'les filles': ['many', 'girl'], 'mia et léa': ['many', 'girl'], 'il': ['one', 'dog'], 'le fermier': ['one', 'farmer'], 'elles': ['many', 'girl'], 'elle': ['one', 'girl'], 'la vache': ['one', 'cow'] }),
  es: S({ 'yo': ['I'], 'el perro': ['one', 'dog'], 'los perros': ['many', 'dog'], 'el gato': ['one', 'cat'], 'los gatos': ['many', 'cat'], 'el pájaro': ['one', 'bird'], 'los pájaros': ['many', 'bird'],
    'la rana': ['one', 'frog'], 'las ranas': ['many', 'frog'], 'los cerdos': ['many', 'pig'], 'el cerdo': ['one', 'pig'], 'el caballo': ['one', 'horse'], 'el conejo': ['one', 'rabbit'], 'los conejos': ['many', 'rabbit'],
    'mia': ['one', 'girl'], 'las niñas': ['many', 'girl'], 'mia y lía': ['many', 'girl'], 'el granjero': ['one', 'farmer'], 'ellas': ['many', 'girl'], 'mi amiga': ['one', 'girl'], 'ella': ['one', 'girl'], 'las vacas': ['many', 'cow'] }),
  pt: S({ 'eu': ['I'], 'o cachorro': ['one', 'dog'], 'os cachorros': ['many', 'dog'], 'o gato': ['one', 'cat'], 'os gatos': ['many', 'cat'], 'o passarinho': ['one', 'bird'], 'os passarinhos': ['many', 'bird'],
    'o sapo': ['one', 'frog'], 'os sapos': ['many', 'frog'], 'os porcos': ['many', 'pig'], 'o porco': ['one', 'pig'], 'o cavalo': ['one', 'horse'], 'o coelho': ['one', 'rabbit'], 'os coelhos': ['many', 'rabbit'],
    'mia': ['one', 'girl'], 'as meninas': ['many', 'girl'], 'mia e lia': ['many', 'girl'], 'o fazendeiro': ['one', 'farmer'], 'elas': ['many', 'girl'], 'minha amiga': ['one', 'girl'], 'ela': ['one', 'girl'], 'as vacas': ['many', 'cow'] }),
  it: S({ 'io': ['I'], 'il cane': ['one', 'dog'], 'i cani': ['many', 'dog'], 'il gatto': ['one', 'cat'], 'i gatti': ['many', 'cat'], "l'uccellino": ['one', 'bird'], 'gli uccellini': ['many', 'bird'],
    'la rana': ['one', 'frog'], 'le rane': ['many', 'frog'], 'i maiali': ['many', 'pig'], 'il maiale': ['one', 'pig'], 'il cavallo': ['one', 'horse'], 'il coniglio': ['one', 'rabbit'], 'i conigli': ['many', 'rabbit'],
    'mia': ['one', 'girl'], 'le bambine': ['many', 'girl'], 'mia e lia': ['many', 'girl'], 'il contadino': ['one', 'farmer'], 'loro': ['many', 'girl'], 'la bambina': ['one', 'girl'], 'lei': ['one', 'girl'], 'le mucche': ['many', 'cow'] }),
  nl: S({ 'ik': ['I'], 'wij': ['we'], 'de hond': ['one', 'dog'], 'de honden': ['many', 'dog'], 'de kat': ['one', 'cat'], 'de katten': ['many', 'cat'], 'de vogel': ['one', 'bird'], 'de vogels': ['many', 'bird'],
    'de kikker': ['one', 'frog'], 'de kikkers': ['many', 'frog'], 'de varkens': ['many', 'pig'], 'het varken': ['one', 'pig'], 'het paard': ['one', 'horse'], 'het konijn': ['one', 'rabbit'], 'de konijnen': ['many', 'rabbit'],
    'mia': ['one', 'girl'], 'mia en lisa': ['many', 'girl'], 'hij': ['one', 'dog'], 'de meisjes': ['many', 'girl'], 'de boer': ['one', 'farmer'] }),
  fi: S({ 'minä': ['I'], 'koira': ['one', 'dog'], 'koirat': ['many', 'dog'], 'kissa': ['one', 'cat'], 'kissat': ['many', 'cat'], 'lintu': ['one', 'bird'], 'linnut': ['many', 'bird'],
    'sammakko': ['one', 'frog'], 'sammakot': ['many', 'frog'], 'siat': ['many', 'pig'], 'sika': ['one', 'pig'], 'hevonen': ['one', 'horse'], 'kani': ['one', 'rabbit'], 'kanit': ['many', 'rabbit'],
    'mia': ['one', 'girl'], 'tytöt': ['many', 'girl'], 'mia ja liisa': ['many', 'girl'], 'se': ['one', 'dog'], 'maanviljelijä': ['one', 'farmer'], 'he': ['many', 'girl'], 'hän': ['one', 'girl'], 'lehmät': ['many', 'cow'] }),
  sv: S({ 'jag': ['I'], 'vi': ['we'], 'björnen': ['one', 'bear', 'n'], 'gräset': ['one', 'grass', 't'], 'blommorna': ['many', 'flower'], 'hallonet': ['one', 'raspberry', 't'], 'hundarna': ['many', 'dog'], 'bina': ['many', 'bee'],
    'bollen': ['one', 'ball', 'n'], 'katten': ['one', 'cat', 'n'], 'huset': ['one', 'cabin', 't'], 'hon': ['one', 'girl', 'n'], 'de': ['many', 'girl'], 'mia och elsa': ['many', 'girl'], 'han': ['one', 'farmer', 'n'] }),
  da: S({ 'jeg': ['I'], 'vi': ['we'], 'bjørnen': ['one', 'bear', 'n'], 'græsset': ['one', 'grass', 't'], 'blomsterne': ['many', 'flower'], 'hindbærret': ['one', 'raspberry', 't'], 'hundene': ['many', 'dog'], 'bierne': ['many', 'bee'],
    'bolden': ['one', 'ball', 'n'], 'katten': ['one', 'cat', 'n'], 'huset': ['one', 'cabin', 't'], 'hun': ['one', 'girl', 'n'], 'de': ['many', 'girl'], 'mia og ella': ['many', 'girl'], 'han': ['one', 'farmer', 'n'] }),
  no: S({ 'jeg': ['I'], 'vi': ['we'], 'bjørnen': ['one', 'bear', 'n'], 'gresset': ['one', 'grass', 't'], 'blomstene': ['many', 'flower'], 'bringebæret': ['one', 'raspberry', 't'], 'hundene': ['many', 'dog'], 'biene': ['many', 'bee'],
    'ballen': ['one', 'ball', 'n'], 'katten': ['one', 'cat', 'n'], 'huset': ['one', 'cabin', 't'], 'hun': ['one', 'girl', 'n'], 'de': ['many', 'girl'], 'mia og ella': ['many', 'girl'], 'han': ['one', 'farmer', 'n'] })
};
/* den / det point at the picture: den = an en-word (the cat), det = an ett/et-word (the house, the nest, the raspberry) */
const POINT = { den: ['one', null, 'n'], det: ['one', null, 't'] };
const PIC_OK = { dog: 'pets/dog', cat: 'pets/cat', rabbit: 'pets/rabbit', bird: 'spring/bird', bee: 'spring/bee', grass: 'spring/grass', flower: 'spring/flower', nest: 'spring/nest', frog: 'camping/frog', bear: 'camping/bear', cabin: 'camping/cabin',
  girl: 'toys/girl', ball: 'toys/ball', farmer: 'occupations/farmer', pig: 'farm animals/pig', cow: 'farm animals/cow', horse: 'farm animals/horse', raspberry: 'At the Supermarket/raspberry' };
/* nouns the pronoun points at (sv/da/no "Det/Den är …"): the picture and its gender */
const POINTED = { cabin: 't', nest: 't', raspberry: 't', cat: 'n' };
/* be: present (levels 1–2) and past (level 3) */
const BE = {
  en: [{ star: 'am', one: 'is', many: 'are' }, { one: 'was', many: 'were' }], de: [{ star: 'bin', one: 'ist', many: 'sind' }, { one: 'war', many: 'waren' }],
  fr: [{ star: 'suis', one: 'est', many: 'sont' }, { star: 'étais', one: 'était', many: 'étaient' }], es: [{ star: 'estoy', one: 'está', many: 'están' }, { one: 'estaba', many: 'estaban' }],
  pt: [{ star: 'estou', one: 'está', many: 'estão' }, { one: 'estava', many: 'estavam' }], it: [{ star: 'sto', one: 'sta', many: 'stanno' }, { star: 'stavo', one: 'stava', many: 'stavano' }],
  nl: [{ star: 'ben', one: 'is', many: 'zijn' }, { one: 'was', many: 'waren' }], fi: [{ star: 'olen', one: 'on', many: 'ovat' }, { star: 'olin', one: 'oli', many: 'olivat' }]
};
/* the singular / plural verb pairs (levels 4–5): the third-person singular → the third-person plural */
const VERB = {
  en: { has: 'have', goes: 'go', does: 'do', runs: 'run', sings: 'sing', drinks: 'drink', hops: 'hop', rolls: 'roll' },
  de: { hat: 'haben', geht: 'gehen', macht: 'machen', 'läuft': 'laufen', singt: 'singen', trinkt: 'trinken', 'hüpft': 'hüpfen', liegt: 'liegen' },
  fr: { a: 'ont', va: 'vont', fait: 'font', court: 'courent', chante: 'chantent', boit: 'boivent', saute: 'sautent', joue: 'jouent' },
  es: { tiene: 'tienen', va: 'van', hace: 'hacen', corre: 'corren', canta: 'cantan', toma: 'toman', salta: 'saltan', juega: 'juegan' },
  pt: { tem: 'têm', vai: 'vão', faz: 'fazem', corre: 'correm', canta: 'cantam', bebe: 'bebem', pula: 'pulam', brinca: 'brincam' },
  it: { ha: 'hanno', va: 'vanno', fa: 'fanno', corre: 'corrono', canta: 'cantano', beve: 'bevono', salta: 'saltano', gioca: 'giocano' },
  nl: { heeft: 'hebben', gaat: 'gaan', doet: 'doen', rent: 'rennen', zingt: 'zingen', drinkt: 'drinken', springt: 'springen', speelt: 'spelen' },
  fi: { menee: 'menevät', tekee: 'tekevät', juoksee: 'juoksevat', laulaa: 'laulavat', juo: 'juovat', 'hyppää': 'hyppäävät', leikkii: 'leikkivät' }
};
/* the adjective: common → [neuter, plural], by rule */
const V = 'aeiouyåäöæø';
const IRREG = { sv: { liten: ['litet', 'små'] } }, DOUBLE_N = { da: ['grøn'] };
function adj(loc, a) {
  if (IRREG[loc] && IRREG[loc][a]) return IRREG[loc][a];
  if (loc === 'sv') {
    if (/[^aeiouyåäö]d$/.test(a) && /nd$/.test(a)) return [a.slice(0, -1) + 't', a + 'a'];
    if (new RegExp('[' + V + '][dt]$').test(a)) return [a.slice(0, -1) + 'tt', a + 'a'];
    return [a + 't', a + 'a'];
  }
  if (loc === 'da') return [a + 't', DOUBLE_N.da.indexOf(a) >= 0 ? a + 'ne' : a + 'e'];
  if (loc === 'no') {
    if (/(.)\1$/.test(a)) return [a.slice(0, -1) + 't', a + 'e'];
    if (new RegExp('[' + V + ']t$').test(a)) return [a + 't', a + 'e'];
    return [a + 't', a + 'e'];
  }
}
const ADJ_PROBE = { sv: { stor: ['stort', 'stora'], fin: ['fint', 'fina'], liten: ['litet', 'små'], röd: ['rött', 'röda'], glad: ['glatt', 'glada'], rund: ['runt', 'runda'], söt: ['sött', 'söta'], grön: ['grönt', 'gröna'], hungrig: ['hungrigt', 'hungriga'] },
  da: { stor: ['stort', 'store'], fin: ['fint', 'fine'], grøn: ['grønt', 'grønne'], rød: ['rødt', 'røde'], rolig: ['roligt', 'rolige'] }, no: { grønn: ['grønt', 'grønne'], snill: ['snilt', 'snille'], våt: ['vått', 'våte'], stor: ['stort', 'store'] } };
for (const loc of NORD) for (const [a, r] of Object.entries(ADJ_PROBE[loc])) is(JSON.stringify(adj(loc, a)) === JSON.stringify(r), `own adjective rule ${loc} ${a} → ${r}`);

/* ---------------- (a) (b) the rounds ---------------- */
const lc = (s) => s.toLowerCase().replace(/’/g, "'");
const pictures = new Set();
const derived = {};
for (const loc of ALL) {
  const LV = C.levels(loc);
  is(LV.length === (NORD.indexOf(loc) >= 0 ? 3 : 5), `${loc}: ${LV.length} levels`);
  for (const lvl of LV) {
    const rights = {};
    for (const r of C.rounds()) {
      const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1} «${rd.tmpl}»`, sign = lc(rd.sign);
      let sub = SUBJ[loc][sign] || (NORD.indexOf(loc) >= 0 && POINT[sign]);
      is(!!sub, `${tag}: the subject «${rd.sign}» is classified`);
      if (!sub) continue;
      const kind = sub[0], pic = sub[1] || rd.crowd.key;
      /* the crowd is the subject */
      if (kind === 'I') is(rd.crowd.star && rd.crowd.n === 0, `${tag}: I is the star alone`);
      else if (kind === 'we') { is(rd.crowd.star && rd.crowd.n === 1, `${tag}: we is the star + one`); is(WE_OK.indexOf(loc) >= 0, `${tag}: "we" only where we and they share the verb`); }
      else { is(!rd.crowd.star, `${tag}: no star`); is(rd.crowd.key === pic, `${tag}: the crowd is ${pic}`); is(kind === 'one' ? rd.crowd.n === 1 : rd.crowd.n >= 2 && rd.crowd.n <= 4, `${tag}: ${kind} → n ${rd.crowd.n}`); }
      if (rd.crowd.key) { is(PIC_OK[rd.crowd.key] === rd.crowd.pic, `${tag}: picture ${rd.crowd.pic}`); pictures.add(rd.crowd.pic); }
      if (POINT[sign]) is(POINTED[rd.crowd.key] === POINT[sign][2], `${tag}: ${sign} points at a ${POINT[sign][2] === 't' ? 'neuter' : 'common'} noun (${rd.crowd.key})`);
      is(lc(rd.tmpl).indexOf(sign) >= 0, `${tag}: the subject is in the sentence`);
      /* the derived gates and right gate */
      let want, right;
      if (NORD.indexOf(loc) >= 0) {
        const one = C.word(rd, 'one'), f = adj(loc, one || '');
        want = { one: one, oneT: f && f[0], many: f && f[1] };
        const g = sub[2] || (POINT[sign] && POINT[sign][2]) || (kind === 'I' ? 'n' : null);
        right = kind === 'many' || kind === 'we' ? 'many' : g === 't' ? 'oneT' : 'one';
        is(rd.neuter === (g === 't'), `${tag}: neuter = ${g === 't'}`);
        if (rd.art) is((g === 't') === /^(ett|et) /.test(rd.art), `${tag}: the clue «${rd.art}» has the noun's own article`);
        if (kind === 'one' && !POINT[sign] && ['hon', 'han', 'hun'].indexOf(sign) < 0) is(!!rd.art, `${tag}: a noun round carries its article`);
      } else if (+lvl <= 3) {
        want = Object.assign({}, BE[loc][lvl === '3' ? 1 : 0]);
        right = kind === 'I' ? (want.star ? 'star' : 'one') : kind === 'one' ? 'one' : 'many';
      } else {
        const sg = C.word(rd, 'one'); want = { one: sg, many: VERB[loc][sg] };
        is(!!VERB[loc][sg], `${tag}: ${sg} is a known verb`);
        right = kind === 'one' ? 'one' : 'many';
        is(kind === 'one' || kind === 'many', `${tag}: levels 4–5 have no I or we`);
      }
      const got = {}; rd.gates.forEach(g => got[g.shape] = g.w);
      is(JSON.stringify(Object.keys(want).sort().map(k => [k, want[k]])) === JSON.stringify(Object.keys(got).sort().map(k => [k, got[k]])), `${tag}: the rack ${JSON.stringify(got)} = ${JSON.stringify(want)}`);
      is(rd.right === right, `${tag}: right ${rd.right} = ${right}`);
      rights[right] = (rights[right] || 0) + 1;
      derived[loc + lvl + r] = { kind, right };
    }
    /* (d) */
    for (const g of C.round(loc, lvl, 0).gates) { const n = rights[g.shape] || 0; is(n >= 2 && n <= 5, `${loc} L${lvl}: gate ${g.shape} right ${n} of 9`); }
  }
}
for (const p of pictures) { const d = p.slice(0, p.lastIndexOf('/')), f = p.slice(p.lastIndexOf('/') + 1); is(fs.readdirSync(IMG).includes(d) && fs.readdirSync(path.join(IMG, d)).includes(f + '@2x.webp'), `picture ${p} exists (exact case)`); is(!BW.test(d), `${p}: a colour theme`); }

/* ---------------- (c) the walk and the model ---------------- */
for (const loc of ALL) for (const lvl of C.levels(loc)) for (const r of C.rounds()) {
  const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`, N = C.size(rd);
  for (const g of rd.gates) {
    const w = C.walk(rd, g.shape);
    is(w.all === (g.shape === rd.right), `${tag} gate ${g.shape}: ${w.all ? 'all' : 'not all'} through`);
    is(w.through + w.stuck + w.waiting + w.bounce === N, `${tag} gate ${g.shape}: everyone is somewhere`);
    if (g.shape === rd.right) continue;
    /* the derived reason */
    let want;
    if (g.shape === 'star') want = 'stardoor';
    else if (g.shape === 'many') want = rd.crowd.star ? 'me' : 'two';
    else if (N >= 2) want = 'one';
    else if (rd.crowd.star) want = rd.starDoor ? 'me' : 'gender';
    else want = 'gender';
    is(w.reason === want, `${tag} gate ${g.shape}: reason ${w.reason} = ${want}`);
    if (want === 'one') is(w.through === 1 && w.stuck === N - 1, `${tag}: the turnstile lets exactly one through`);
    if (want === 'two') is(w.waiting === 1 && w.through === 0, `${tag}: one alone waits at the double gate`);
    /* Check: miss 1 → its hint (and the clue); miss 2 → the glow */
    const st = C.newState(loc, lvl, r);
    is(C.check(st).result === 'empty' && st.misses === 0 && C.hint(st) === 'hintEmpty', `${tag}: an empty Check is no miss`);
    is(C.hang(st, g.shape) === 'hung' && st.hung === g.shape, `${tag}: hang ${g.shape}`);
    const c1 = C.check(st);
    is(c1.result === 'miss' && st.misses === 1 && C.hint(st) === { one: 'missOne', two: 'missTwo', stardoor: 'missStar', me: 'missMe', gender: 'missGender' }[want], `${tag} ${g.shape}: miss 1 hint ${C.hint(st)}`);
    is(!C.glow(st), `${tag}: no glow at miss 1`);
    const cl = C.clue(st);
    is(want === 'gender' && rd.art ? cl && cl.art === rd.art : cl === null, `${tag} ${g.shape}: the clue ${JSON.stringify(cl)}`);
    C.check(st); is(C.hint(st) === 'missGlow' && C.glow(st), `${tag}: miss 2 glows`);
    is(C.hang(st, rd.right) === 'hung' && !C.glow(st) && C.hint(st) === null, `${tag}: a new move takes the help away`);
    is(C.check(st).result === 'ok' && st.done, `${tag}: the right gate solves`);
    is(C.hang(st, g.shape) === 'no' && C.check(st).result === 'done', `${tag}: a solved round is closed`);
  }
  const s2 = C.newState(loc, lvl, r); C.hang(s2, rd.right); is(C.hang(s2, rd.right) === 'removed' && s2.hung === null, `${tag}: hanging the same gate again takes it down`);
  C.hang(s2, rd.right); is(C.unhang(s2) === 'removed' && s2.hung === null && C.unhang(s2) === 'no', `${tag}: take it down`);
  const k = C.okKey(rd), d = derived[loc + lvl + r];
  is(k === (d.kind === 'I' ? 'okMe' : d.right === 'many' ? 'okMany' : d.right === 'oneT' ? 'okT' : NORD.indexOf(loc) >= 0 && rd.art ? 'okOneN' : 'okOne'), `${tag}: success line ${k}`);
}

/* ---------------- (e) the plan, (f) the bots ---------------- */
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (const loc of ALL) for (const lvl of C.levels(loc)) {
  let prev = null, bad = 0, repeat = 0;
  for (let i = 0; i < 300; i++) {
    const o = C.plan(loc, lvl, rnd, prev);
    if (o.slice().sort((a, b) => a - b).join() !== '0,1,2,3,4,5,6,7,8') bad++;
    for (let j = 1; j < o.length; j++) { const a = C.round(loc, lvl, o[j]), b = C.round(loc, lvl, o[j - 1]); if (lc(a.sign) === lc(b.sign)) bad++; if (j >= 2 && a.right === b.right && a.right === C.round(loc, lvl, o[j - 2]).right) bad++; }
    if (prev && prev.join() === o.join()) repeat++; prev = o;
  }
  is(bad === 0 && repeat === 0, `${loc} L${lvl}: 300 plans — every round once, no three alike in a row, no subject twice in a row, never the last pass's order (${bad}/${repeat})`);
  const turn = C.rounds().filter(r => C.round(loc, lvl, r).right === 'one').length;
  is(turn <= 5, `${loc} L${lvl}: always the turnstile wins ${turn}/9`);
}
for (const lvl of ['4', '5']) { const sbot = C.rounds().filter(r => { const rd = C.round('en', lvl, r), pick = /s$/i.test(rd.sign) ? 'one' : 'many'; return pick === rd.right; }).length; is(sbot <= 1, `en L${lvl}: the s-bot wins ${sbot}/9`); }

/* ---------------- (g) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'verb-gates-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'verb-gates-core.js'), 'utf8');
const SH = ['title', 'instruction', 'instrBubble', 'okBubble'];
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 35, 'the activity strings load');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
for (const k of Object.keys((ACT && ACT.strings) || {})) {
  for (const loc of ALL) {
    const v = ACT.strings[k][loc]; is(typeof v === 'string' && v.length > 0, `${k}.${loc} authored`);
    if (/^hint|^miss|^ok|^t\d/.test(k)) is(!/\d/.test(v), `${k}.${loc}: no digit in a hint`);
    is(!/(?<!\p{L})(free|gratis|kostenlos|gratuit|ilmai\p{L}*|gratuito|grátis)(?!\p{L})/iu.test(v), `${k}.${loc}: never "free"`);
    if (loc === 'fr') is(!/ [:!?;»]/.test(v) && !/'/.test(v), `${k}.fr: narrow spaces and ’`);
    if (loc === 'it') is(!/'/.test(v), `${k}.it: ’`);
    if (/^ok[A-Z]/.test(k) && k !== 'okBubble') is(v.indexOf('{s}') >= 0 && v.indexOf('{W}') >= 0, `${k}.${loc}: names the sentence and the gate`);
  }
  is(SH.indexOf(k) >= 0 || /^[tl]\d$/.test(k) || CSRC.indexOf("'" + k + "'") >= 0 || body.indexOf("'" + k + "'") >= 0, `string ${k} is asked for`);
}
for (const loc of ALL) for (const lvl of C.levels(loc)) is(!!ACT.strings['t' + lvl] && !!ACT.strings['l' + lvl], `${loc}: level ${lvl} has a task line and a label`);
for (const k of ['missOne', 'missTwo', 'missStar', 'missMe', 'missGender', 'missGlow', 'hintEmpty', 'okMe', 'okOne', 'okOneN', 'okT', 'okMany']) is(!!(ACT.strings[k]), `string ${k} exists`);
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'vera-verb-match.be-agreement.l-1-1-c';
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every(k => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const known = new Set(); for (const lvl of C.levels(loc)) for (const r of C.rounds()) { const rd = C.round(loc, lvl, r); known.add(lc(C.filled(rd, rd.right).replace(/[.!]$/, ''))); }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map(m => lc(m[1].replace(/ /g, ' ').replace(/[.!]$/, '').trim()));
  const inBook = qs.filter(x => known.has(x));
  is(inBook.length >= 1, `${loc}: the prose quotes the activity (${inBook.length} of ${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.1/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'vera-verb-match-activities.json'), 'utf8')).find(x => x.id === ID);
is(row && row.tool === 'verb-gates-activity', 'the manifest row points at the verb gates');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'vera-verb-match' && row.page_title.en === "Vera's Verb Match — Am, Is, or Are? (Grade 1)", 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3', '4', '5'], show: ['hide', 'show'], rounds: { '1': 9, '2': 9, '3': 9, '4': 9, '5': 9 } }), 'the row\'s params mirror the core');
console.log(`verify-verb-gates-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
