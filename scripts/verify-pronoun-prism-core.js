#!/usr/bin/env node
/* =====================================================================
   verify-pronoun-prism-core.js — the gate for ACTIVITY #124, The Pronoun
   Prism (The Borrowed Hat, L.1.1.d; all 11 locales). Its OWN ground
   truth, written here independently of the core:
     · every name's gender (and which subjects are more than one), so the
       referent block DERIVES the person (★ = I, ★ + a name = we, two
       names or a plural noun = they, one boy = he, one girl = she — fi
       has no he/she: one is hän);
     · the job DERIVED from the sentence: a thing after the gap = owner
       (owner on its own in the owner-alone level), the gap after the verb
       = done-to, the gap before the verb = doer — except a clitic object
       before its verb in fr/es/it/pt (a subject already stands before the
       gap, or the two listed sentence-initial clitics);
     · each locale's pronoun forms (doer · done-to · owner · owner on its
       own) and the owner word's agreement with the THING (de case +
       gender, fr/it/es/pt gender + number, sv/da/no en/ett/plural, nl
       de/het), with its own gender tables for the things;
   so every right prism, face and word is DERIVED. It asserts:
     (a) 11 locales × their levels (de, it, nl five; the rest six) × 9;
         every tray holds the right person, three prisms, and NO other
         prism shows the right word (one right answer);
     (b) the model for every round: only the right prism with the right
         face up passes; the reasons (count / who / cover / the job) are
         derived; the hints, the glow from miss 2; place / take out /
         turn; threads (tie / untie, rings / who); sorting (wrong cards
         come back);
     (c) thread rounds: the pronoun's number = the answer count, its
         gender = the answer's; sort rounds: every card's bin derived;
     (d) every prism level: no job right more than 5 of 9; the plan: a
         fresh order, never three alike in a row, never the same person
         and face twice;
     (e) the strings ×11, the prose quotes, the manifest row.
   Usage: node scripts/verify-pronoun-prism-core.js   (env VP_CORE_DIR / VP_ACT_DIR for the mutation run)
   ===================================================================== */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const REPO = path.join(__dirname, '..'), MT = path.join(REPO, 'mini tools');
const CORE_DIR = process.env.VP_CORE_DIR || MT, ACT_DIR = process.env.VP_ACT_DIR || CORE_DIR;
const C = require(path.join(CORE_DIR, 'pronoun-prism-core.js'));
const ACT = (() => { const ctx = { window: {}, PronounPrismCore: C }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(ACT_DIR, 'pronoun-prism-activity.js'), 'utf8') + '\n;this.__A = window.PronounPrismActivity;', ctx); return ctx.__A; })();
let PASS = 0, FAIL = 0;
const is = (c, m) => { if (c) PASS++; else { FAIL++; if (FAIL < 80) console.error('  FAIL: ' + m); } };
const ALL = ['en', 'de', 'fr', 'es', 'pt', 'it', 'nl', 'sv', 'da', 'no', 'fi'];
const LEVELS = { de: 5, it: 5, nl: 5 };

/* ---------------- the own tables ---------------- */
const GIRL = new Set(('Mia Lily Ava Ella Emma Zoe Lina Jade Chloé Léa Zoé Sofía Valeria Lucía Camila Regina Lia Alice Helena Laura Valentina Sofia Sara Giulia Anna Lena Lara Lea Tess Lotte Julia Noor Maja Saga Wilma Alma Ida Freja Clara Nora Sofie Ingrid Aino Venla Lilja Helmi Ana' +
  '|Grandma|Mom|Aunt Lily|Oma|Mama|Tante Lena|Mamie|Maman|Tata Lina|la abuela|mamá|la tía Lucía|a vovó|mamãe|a tia Lia|la nonna|mamma|la zia Anna|oma|mama|tante Julia|mormor|moster Saga|mor|moster Ida|bestemor|tante Sofie|mummo|äiti|Sofia-täti').split(/\||(?<=^[^|]*) /).map(s => s.toLowerCase()));
const BOY = new Set(('Ben Leo Tom Max Jack Paul Jonas Léo Hugo Louis Jules Diego Tomás Mateo Santiago Davi Pedro Gael Miguel Luca Marco Matteo Pietro Lorenzo Daan Sem Bram Finn Lucas Jesse Elias Noah Liam Oscar William Viggo Carl Jakob Emil Lukas Filip Henrik Eino Onni Eetu Väinö Pat' +
  '|Dad|Grandpa|Uncle Tom|Papa|Opa|Onkel Tom|Papi|Tonton Tom|papá|el abuelo|el tío Tomás|papai|o vovô|o tio Pedro|papà|il nonno|lo zio Marco|papa|opa|oom Bram|pappa|farfar|morbror Elias|far|onkel William|bestefar|onkel Jakob|isä|ukki|Matti-setä').split(/\||(?<=^[^|]*) /).map(s => s.toLowerCase()));
/* subjects that are more than one: "A and B", or a plural noun */
const AND = { en: ' and ', de: ' und ', fr: ' et ', es: ' y ', pt: ' e ', it: ' e ', nl: ' en ', sv: ' och ', da: ' og ', no: ' og ', fi: ' ja ' };
const PLURAL = new Set(['the twins', 'the dogs', 'the kids', 'the girls', 'the cats', 'die zwillinge', 'die hunde', 'die kinder', 'die mädchen', 'die katzen', 'les jumeaux', 'les chiens', 'les enfants', 'les filles', 'les chats',
  'los gemelos', 'los perros', 'los niños', 'las niñas', 'los gatos', 'os gêmeos', 'os cachorros', 'as crianças', 'as meninas', 'os gatos', 'i gemelli', 'i cani', 'i bambini', 'le bambine', 'i gatti',
  'de tweeling', 'de kinderen', 'de honden', 'de jongens', 'de meisjes', 'de katten', 'tvillingarna', 'hundarna', 'barnen', 'flickorna', 'katterna', 'tvillingerne', 'hundene', 'børnene', 'pigerne', 'kattene',
  'tvillingene', 'barna', 'jentene', 'kaksoset', 'koirat', 'lapset', 'tytöt', 'kissat']);
function personOf(loc, ref) {
  if (ref === '★') return 'I';
  if (/^★ \+ /.test(ref)) return 'we';
  const r = ref.toLowerCase();
  if (r.indexOf(AND[loc]) >= 0 || PLURAL.has(r)) return 'they';
  if (loc === 'fi') return (GIRL.has(r) || BOY.has(r)) ? 'he' : null;
  return GIRL.has(r) ? 'she' : BOY.has(r) ? 'he' : null;
}
/* the pronoun forms: doer · done-to · owner (base) · owner on its own */
const FORMS = {
  en: { he: ['he', 'him', 'his', 'his'], she: ['she', 'her', 'her', 'hers'], they: ['they', 'them', 'their', 'theirs'], I: ['i', 'me', 'my', 'mine'], we: ['we', 'us', 'our', 'ours'] },
  de: { he: ['er', 'ihn', 'sein'], she: ['sie', 'sie', 'ihr'], they: ['sie', 'sie', 'ihr'], I: ['ich', 'mich', 'mein'], we: ['wir', 'uns', 'unser'] },
  fr: { he: ['il', 'le', 'son', 'à lui'], she: ['elle', 'la', 'son', 'à elle'], they: ['ils', 'les', 'leur', 'à eux'], I: ['je', 'me', 'mon', 'à moi'], we: ['nous', 'nous', 'notre', 'à nous'] },
  es: { he: ['él', 'lo', 'su', 'de él'], she: ['ella', 'la', 'su', 'de ella'], they: ['ellos', 'los', 'su', 'de ellos'], I: ['yo', 'me', 'mi', 'mío'], we: ['nosotros', 'nos', 'nuestro', 'nuestro'] },
  pt: { he: ['ele', 'o', 'dele', 'dele'], she: ['ela', 'a', 'dela', 'dela'], they: ['eles', 'os', 'deles', 'deles'], I: ['eu', 'me', 'meu', 'meu'], we: ['nós', 'nos', 'nosso', 'nosso'] },
  it: { he: ['lui', 'lo', 'suo'], she: ['lei', 'la', 'suo'], they: ['loro', 'li', 'loro'], I: ['io', 'mi', 'mio'], we: ['noi', 'ci', 'nostro'] },
  nl: { he: ['hij', 'hem', 'zijn'], she: ['zij', 'haar', 'haar'], they: ['zij', 'hen', 'hun'], I: ['ik', 'mij', 'mijn'], we: ['wij', 'ons', 'ons'] },
  sv: { he: ['han', 'honom', 'hans', 'hans'], she: ['hon', 'henne', 'hennes', 'hennes'], they: ['de', 'dem', 'deras', 'deras'], I: ['jag', 'mig', 'min', 'min'], we: ['vi', 'oss', 'vår', 'vår'] },
  da: { he: ['han', 'ham', 'hans', 'hans'], she: ['hun', 'hende', 'hendes', 'hendes'], they: ['de', 'dem', 'deres', 'deres'], I: ['jeg', 'mig', 'min', 'min'], we: ['vi', 'os', 'vores', 'vores'] },
  no: { he: ['han', 'ham', 'hans', 'hans'], she: ['hun', 'henne', 'hennes', 'hennes'], they: ['de', 'dem', 'deres', 'deres'], I: ['jeg', 'meg', 'min', 'min'], we: ['vi', 'oss', 'vår', 'vår'] },
  fi: { he: ['hän', 'hänet', 'hänen', 'hänen'], they: ['he', 'heidät', 'heidän', 'heidän'], I: ['minä', 'minut', 'minun', 'minun'], we: ['me', 'meidät', 'meidän', 'meidän'] }
};
/* the things' gender (m f n / c(ommon) t(neuter) / pl) */
const THING = {
  de: { Ball: 'm', Mützen: 'pl', Tasche: 'f', Hut: 'm', Klasse: 'f', Fahrrad: 'n' },
  fr: { ballon: 'm', chapeaux: 'pl', sac: 'm', classe: 'f', maison: 'f', 'cerf-volant': 'm', cabane: 'f', tasse: 'f', vélo: 'm', coquillages: 'pl' },
  es: { pelota: 'f', salón: 'm', bici: 'f', mochila: 'f', papalote: 'm', fuerte: 'm', taza: 'f', conchas: 'pl', casa: 'f', sombreros: 'pl' },
  pt: { chapéu: 'm', casa: 'f', bicicleta: 'f', forte: 'm', caneca: 'f' },
  it: { pallone: 'm', cappelli: 'mpl', borsa: 'f', palla: 'f', classe: 'f', bici: 'f' },
  nl: { klas: 'de', hoed: 'de', fiets: 'de', bal: 'de', tas: 'de', hond: 'de' },
  sv: { boll: 'c', äpple: 't', vantar: 'pl', Kojan: 'c', Koppen: 'c', Huset: 't' },
  da: { bold: 'c', æble: 't', vanter: 'pl', Hulen: 'c', Koppen: 'c', Huset: 't' },
  no: { ball: 'c', eple: 't', votter: 'pl', Hytta: 'c', Koppen: 'c', Huset: 't' }
};
function agree(loc, base, thing, job, sentence) {
  const g = THING[loc] && THING[loc][thing];
  if (loc === 'de') {
    const nom = /^(Das ist|Hier ist)/.test(sentence), end = { m: nom ? '' : 'en', f: 'e', n: '', pl: 'e' }[g];
    return base === 'unser' && end === 'en' ? 'unseren' : base + end;
  }
  if (loc === 'fr') {
    if (job === 'alone') return base;
    const T = { mon: { m: 'mon', f: 'ma', pl: 'mes' }, son: { m: 'son', f: 'sa', pl: 'ses' }, notre: { m: 'notre', f: 'notre', pl: 'nos' }, leur: { m: 'leur', f: 'leur', pl: 'leurs' } };
    return T[base][g];
  }
  if (loc === 'it') { const T = { mio: { m: 'mio', f: 'mia', mpl: 'miei' }, suo: { m: 'suo', f: 'sua', mpl: 'suoi' }, nostro: { m: 'nostro', f: 'nostra', mpl: 'nostri' }, loro: { m: 'loro', f: 'loro', mpl: 'loro' } }; return T[base][g]; }
  if (loc === 'es') { if (/^de /.test(base)) return base; const T = { mi: { m: 'mi', f: 'mi' }, su: { m: 'su', f: 'su' }, nuestro: { m: 'nuestro', f: 'nuestra' }, mío: { m: 'mío', f: 'mía' } }; return T[base][g]; }
  if (loc === 'pt') { if (/^de/.test(base)) return base; const T = { meu: { m: 'meu', f: 'minha' }, nosso: { m: 'nosso', f: 'nossa' } }; return T[base][g]; }
  if (loc === 'nl') return base === 'ons' && g === 'de' ? 'onze' : base;
  if (loc === 'sv' || loc === 'no' || loc === 'da') {
    const T = loc === 'sv' ? { min: { c: 'min', t: 'mitt', pl: 'mina' }, vår: { c: 'vår', t: 'vårt', pl: 'våra' } } : loc === 'no' ? { min: { c: 'min', t: 'mitt', pl: 'mine' }, vår: { c: 'vår', t: 'vårt', pl: 'våre' } } : { min: { c: 'min', t: 'mit', pl: 'mine' } };
    return T[base] && g ? T[base][g] : base;
  }
  return base;
}
/* the job, derived from the sentence */
const CLITIC = ['fr', 'es', 'it', 'pt'];
const INITIAL_CLITIC = { es: ['{p} [saludamos].'], it: ['{p} [salutiamo].'] };
function jobOf(loc, s, alone) {
  if (/<[^>]+>/.test(s)) return alone ? 'alone' : 'own';
  const gi = s.indexOf('{p}'), vi = s.indexOf('[');
  if (gi > vi) return 'obj';
  if ((INITIAL_CLITIC[loc] || []).indexOf(s) >= 0) return 'obj';
  const before = s.slice(0, gi).trim();
  if (CLITIC.indexOf(loc) >= 0 && before && !new RegExp(AND[loc].trim() + '$').test(before)) return 'obj';
  return 'doer';
}
const JI = { doer: 0, obj: 1, own: 2, alone: 2 };
const lc = (w) => String(w).toLowerCase();

/* ---------------- (a) (b) (c) the rounds ---------------- */
for (const loc of ALL) {
  const LV = C.levels(loc);
  is(LV.length === (LEVELS[loc] || 6), `${loc}: ${LV.length} levels`);
  for (const lvl of LV) {
    const kind = C.kind(loc, lvl), jobs = {};
    for (const r of C.rounds()) {
      const rd = C.round(loc, lvl, r), tag = `${loc} L${lvl}.${r + 1}`;
      if (kind === 'prism') {
        const person = personOf(loc, rd.ref), alone = rd.alone, job = jobOf(loc, rd.sentence, alone);
        is(!!person && rd.person === person, `${tag} «${rd.sentence}» ${rd.ref}: person ${rd.person} = ${person}`);
        is(rd.job === job, `${tag} «${rd.sentence}»: job ${rd.job} = ${job}`);
        jobs[job] = (jobs[job] || 0) + 1;
        is(rd.tray.length === 3 && rd.tray.indexOf(rd.person) >= 0, `${tag}: three prisms, the right one among them`);
        if (loc === 'fi') is(rd.tray.indexOf('she') < 0, `${tag}: fi has no she-prism`);
        /* the derived right word */
        const F = FORMS[loc][person] || [], thing = (rd.sentence.match(/<([^>]+)>/) || [])[1];
        let want = job === 'alone' ? F[3] : F[JI[job]];
        if (job === 'own' || job === 'alone') want = agree(loc, want, thing, job, rd.sentence);
        const got = C.rightWord(rd);
        is(!!want && lc(got) === lc(want), `${tag} «${rd.sentence}»: the right word ${got} = ${want}`);
        is(job !== 'alone' || ['de', 'it', 'nl'].indexOf(loc) < 0, `${tag}: no owner-alone level in ${loc}`);
        /* every prism's owner face agrees with the thing too — a distractor must be a real form, never a mis-agreed one */
        if (job === 'own' || job === 'alone') for (const p of rd.tray) { const B = FORMS[loc][p] && FORMS[loc][p][job === 'alone' ? 3 : 2]; if (B) is(lc(C.faceWord(rd, p, 2)) === lc(agree(loc, B, thing, job, rd.sentence)), tag + ': prism ' + p + ' owner face ' + C.faceWord(rd, p, 2) + ' agrees with ' + thing); }
        /* one right answer: no other prism shows the right word on any face */
        for (const p of rd.tray) if (p !== rd.person) for (let f = 0; f < 3; f++) is(lc(C.faceWord(rd, p, f) || '') !== lc(got), `${tag}: prism ${p} face ${f} does not also read «${got}»`);
        /* the referent, the person: never a unisex name where gender decides */
        is(['sam', 'alex', 'kim', 'robin', 'charlie', 'camille'].indexOf(lc(rd.ref)) < 0, `${tag}: no unisex referent`);
        /* the model */
        const N = C.newState(loc, lvl, r);
        is(C.check(N).result === 'empty' && N.misses === 0 && C.hint(N) === 'hintEmpty', `${tag}: an empty gap is no miss`);
        for (const p of rd.tray) for (let f = 0; f < 3; f++) {
          const st = C.newState(loc, lvl, r); C.place(st, p); while (st.face[p] !== f) C.spin(st, p, 1);
          const res = C.check(st), right = p === rd.person && (f === rd.ji || lc(C.faceWord(rd, p, f)) === lc(C.rightWord(rd)));
          is((res.result === 'ok') === right, `${tag}: ${p}/${f} ${right ? 'passes' : 'fails'}`);
          if (right) continue;
          const reason = p !== rd.person ? (C.COUNT[p] !== C.COUNT[rd.person] ? 'count' : 'who') : rd.comp && rd.ji === 0 && f === 1 ? 'cover' : ['needDoer', 'needObj', 'needOwn'][rd.ji];
          is(res.reason === reason, `${tag}: ${p}/${f} reason ${res.reason} = ${reason}`);
          const hk = { count: 'missCount', who: 'missWho', cover: 'missCover', needDoer: 'missDoer', needObj: 'missObj', needOwn: rd.alone ? 'missAlone' : 'missOwn' }[reason];
          is(C.hint(st) === hk && !C.glow(st), `${tag}: ${p}/${f} hint ${C.hint(st)}`);
          C.check(st); is(C.hint(st) === 'missGlow' && C.glow(st), `${tag}: miss 2 glows`);
          C.spin(st, p, 1); is(!C.glow(st) && C.hint(st) === null, `${tag}: a turn takes the help away`);
        }
        const S2 = C.newState(loc, lvl, r);
        is(C.place(S2, rd.person) === 'in' && C.place(S2, rd.person) === 'out' && S2.placed === null, `${tag}: placing the same prism again takes it out`);
        C.place(S2, rd.tray[0]); C.place(S2, rd.tray[1]); is(S2.placed === rd.tray[1], `${tag}: a new prism replaces the one in the gap`);
        is(C.spin(S2, rd.tray[1], 1) === 1 && C.spin(S2, rd.tray[1], -1) === 0 && C.spin(S2, rd.tray[1], -1) === 2, `${tag}: turning rolls the faces round`);
      } else if (kind === 'thread') {
        is(rd.ans.length >= 1 && rd.ans.every(a => rd.names.indexOf(a) >= 0), `${tag}: the answers are name blocks`);
        const s2text = rd.s2.filter(k => k.t !== 'pro').map(k => k.s).join(' ');
        is(rd.ans.every(a => !new RegExp('(?<!\\p{L})' + a + '(?!\\p{L})', 'iu').test(s2text)), `${tag}: the pronoun never stands for a name its own sentence already names`);
        const pro = lc(rd.pro), many = { en: ['they', 'them', 'we'], de: ['ihnen', 'wir'], fr: ['ils', 'elles', 'leur', 'nous'], es: ['ellos', 'ellas', 'les', 'nosotros'], pt: ['eles', 'elas', 'nós'], it: ['loro', 'noi'], nl: ['hun', 'wij'], sv: ['de', 'dem', 'vi'], da: ['de', 'dem', 'vi'], no: ['de', 'dem', 'vi'], fi: ['he', 'heille', 'me'] }[loc];
        /* de "Sie" in a thread is plural only when its verb is (spielten / teilten) */
        const plural = many.indexOf(pro) >= 0 || (loc === 'de' && pro === 'sie' && /^\*Sie\* \S+(t|t)en /.test(rd.s2.map(k => k.t === 'pro' ? '*' + k.s + '*' : k.s).join(''))) || (loc === 'nl' && pro === 'zij' && /^\*Zij\* \S+en /.test(rd.s2.map(k => k.t === 'pro' ? '*' + k.s + '*' : k.s).join('')));
        const answerCount = rd.ans.reduce((n, a) => n + (PLURAL.has(lc(a)) ? 2 : 1), 0);
        is((answerCount >= 2) === plural, `${tag}: «${rd.pro}» stands for ${rd.ans.join(' + ')}`);
        if (loc !== 'fi' && !plural) {
          const fem = { en: ['she', 'her'], de: ['sie'], fr: ['elle'], es: ['ella', 'la'], pt: ['ela'], it: ['lei', 'la'], nl: ['zij', 'haar'], sv: ['hon', 'henne'], da: ['hun', 'hende'], no: ['hun', 'henne'] }[loc];
          const g = GIRL.has(lc(rd.ans[0])) ? 'f' : BOY.has(lc(rd.ans[0])) ? 'm' : null;
          is(g === (fem.indexOf(pro) >= 0 ? 'f' : 'm'), `${tag}: «${rd.pro}» matches ${rd.ans[0]}`);
        }
        const st = C.newState(loc, lvl, r);
        is(C.check(st).result === 'empty' && C.hint(st) === 'hintTie', `${tag}: no thread tied — the tie hint, no miss`);
        const other = rd.names.find(n => rd.ans.indexOf(n) < 0);
        if (other) { C.tie(st, other); const c1 = C.check(st); is(c1.result === 'miss' && c1.reason === (rd.ans.length === 1 ? 'twho' : 'rings'), `${tag}: a wrong name → ${c1.reason}`); C.check(st); is(C.glow(st) && C.hint(st) === 'missGlowT', `${tag}: miss 2 glows`); C.tie(st, other); }
        rd.ans.forEach(a => C.tie(st, a)); is(C.check(st).result === 'ok' && st.done, `${tag}: the right names solve`);
      } else {
        const bins = rd.bins.map(b => b.b);
        is(JSON.stringify(bins) === JSON.stringify(loc === 'fi' ? ['he', 'they'] : ['he', 'she', 'they']), `${tag}: the bins`);
        rd.cards.forEach(c => { const want = personOf(loc, c.n); is(want === c.b, `${tag}: «${c.n}» → ${c.b} = ${want}`); });
        bins.forEach(b => is(rd.cards.some(c => c.b === b), `${tag}: a card for bin ${b}`));
        const st = C.newState(loc, lvl, r);
        rd.cards.forEach((c, i) => { if (st.sel !== i) C.pick(st, i); C.drop(st, bins.find(b => b !== c.b)); });
        const c1 = C.check(st); is(c1.result === 'miss' && st.at.every(x => x === null) && st.bounced.length === 3, `${tag}: wrong bins — the cards come back`);
        rd.cards.forEach((c, i) => { if (st.sel !== i) C.pick(st, i); C.drop(st, c.b); }); is(C.check(st).result === 'ok', `${tag}: the right bins solve`);
      }
    }
    if (kind === 'prism') for (const j of Object.keys(jobs)) is(jobs[j] <= 5 || j === 'alone', `${loc} L${lvl}: job ${j} right ${jobs[j]} of 9`);
  }
}

/* ---------------- (d) the plan ---------------- */
let seed = 11; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
for (const loc of ALL) for (const lvl of C.levels(loc)) {
  let prev = null, bad = 0, rep = 0;
  for (let i = 0; i < 200; i++) {
    const o = C.plan(loc, lvl, rnd, prev);
    if (o.slice().sort((a, b) => a - b).join() !== '0,1,2,3,4,5,6,7,8') bad++;
    if (C.kind(loc, lvl) === 'prism') for (let j = 1; j < o.length; j++) { const a = C.round(loc, lvl, o[j]), b = C.round(loc, lvl, o[j - 1]); if (a.person === b.person && a.ji === b.ji) bad++; if (j >= 2 && !a.alone && a.ji === b.ji && a.ji === C.round(loc, lvl, o[j - 2]).ji) bad++; }
    if (prev && prev.join() === o.join()) rep++; prev = o;
  }
  is(bad === 0 && rep === 0, `${loc} L${lvl}: 200 plans — every round once, no three alike, no person+face twice, a fresh order (${bad}/${rep})`);
}

/* ---------------- (e) strings, prose, manifest ---------------- */
const SRC = fs.readFileSync(path.join(ACT_DIR, 'pronoun-prism-activity.js'), 'utf8'), CSRC = fs.readFileSync(path.join(CORE_DIR, 'pronoun-prism-core.js'), 'utf8');
const body = SRC.replace(/\/\*STRINGS-BEGIN\*\/[\s\S]*\/\*STRINGS-END\*\//, '');
is(ACT && ACT.strings && Object.keys(ACT.strings).length >= 45, 'the activity strings load');
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
for (const loc of ALL) for (const lvl of C.levels(loc)) is(ACT.strings['l' + lvl][loc] !== '–' && ACT.strings['t' + lvl][loc], `${loc}: level ${lvl} has a label and a task line`);
const QUOTE = { en: /"([^"]+)"/g, de: /„([^“]+)“/g, fr: /« ?([^»]+?) ?»/g, es: /«([^»]+)»/g, pt: /“([^”]+)”/g, it: /«([^»]+)»/g, nl: /‘([^‘’]+)’/g, sv: /”([^”]+)”/g, da: /”([^”]+)”/g, no: /«([^»]+)»/g, fi: /”([^”]+)”/g };
const ID = 'pronoun.case.l-1-1-d';
for (const loc of ALL) {
  const pr = JSON.parse(fs.readFileSync(path.join(REPO, 'frontend', 'messages', 'activity-content', loc + '.json'), 'utf8')).prose[ID];
  is(!!pr && ['about', 'practices', 'howToPlay', 'learningGoals'].every(k => Array.isArray(pr[k]) && pr[k].length >= 3), `${loc}: the prose entry`);
  const known = new Set(); for (const lvl of C.levels(loc)) if (C.kind(loc, lvl) === 'prism') for (const r of C.rounds()) { const rd = C.round(loc, lvl, r); known.add(lc(C.filled(rd, C.rightWord(rd)).replace(/[.!]$/, '')).replace(/’/g, "'")); }
  const text = pr ? Object.values(pr).flat().join(' ') : '', qs = [...text.matchAll(QUOTE[loc])].map(m => lc(m[1].replace(/ /g, ' ').replace(/[.!]$/, '').trim()).replace(/’/g, "'"));
  is(qs.filter(x => known.has(x)).length >= 1, `${loc}: the prose quotes the activity (${qs.filter(x => known.has(x)).length} of ${qs.length})`);
  if (loc !== 'en') is(!/common core|L\.1\.1/i.test(text), `${loc}: no Common Core in the prose`);
}
const row = JSON.parse(fs.readFileSync(path.join(MT, 'pronoun-activities.json'), 'utf8')).find(x => x.id === ID);
is(row && row.tool === 'pronoun-prism-activity', 'the manifest row points at the pronoun prism');
is(row && Object.keys(row.slug).length === 11 && Object.keys(row.page_title).length === 11 && Object.keys(row.page_intro).length === 11, 'the row ships in all 11 locales');
is(row && row.slug.en === 'personal-pronouns' && row.page_title.en === 'The Borrowed Hat — Personal Pronouns (Grade 1)', 'the en metadata is frozen');
is(row && JSON.stringify(row.params) === JSON.stringify({ level: ['1', '2', '3', '4', '5', '6'], marks: ['show', 'words'], rounds: { '1': 9, '2': 9, '3': 9, '4': 9, '5': 9, '6': 9 } }), "the row's params mirror the core");
console.log(`verify-pronoun-prism-core: ${PASS} pass, ${FAIL} fail`);
process.exit(FAIL ? 1 : 0);
