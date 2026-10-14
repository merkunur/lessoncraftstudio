#!/usr/bin/env node
/**
 * apply-lgp-review.js — the native + pedagogy review of the Logic Grid Puzzles Level Set (walk #69, 2026-10-15), applied
 * at the SOURCE. Exact-literal replacements in every file that carries the string: the bank (data/b3/logic-puzzles.js +
 * data/b3/locales/logic-puzzles.<loc>.json), the printed strings (i18n/strings.<loc>.json) and the drafts
 * (i18n/.draft-b3*-<loc>.json) — NEVER a landing file (metadata rule). Idempotent: a second run changes nothing.
 * A literal that is found nowhere (and whose replacement is found nowhere either) FAILS the run.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', '..');
const LOCS = ['en', 'de', 'es', 'fr', 'it', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];
const filesFor = (loc) => [
  ...(loc === 'en' ? [path.join(ROOT, 'data', 'b3', 'logic-puzzles.js')] : [path.join(ROOT, 'data', 'b3', 'locales', 'logic-puzzles.' + loc + '.json')]),
  path.join(ROOT, 'i18n', 'strings.' + loc + '.json'),
  ...fs.readdirSync(path.join(ROOT, 'i18n')).filter((f) => new RegExp('^\\.draft-b3(var)?-' + loc + '\\.json$').test(f)).map((f) => path.join(ROOT, 'i18n', f)),
].filter((f) => fs.existsSync(f));

// [locale, old, new] — live printed text (MUST FIX of the review)
const LIVE = [
  // en (US register): check mark / X / circled
  ['en', 'tick what must be true, then circle the picture each child has.', 'check what must be true, then circle the picture each child has.'],
  ['en', 'A yes clue gets a tick, a no clue gets a cross and an either-or clue', 'A yes clue gets a check mark, a no clue gets an X and an either-or clue'],
  ['en', 'then circle the tick if the sentence is true or the cross if it is false.', 'then circle the check mark if the sentence is true or the X if it is false.'],
  ['en', 'cross out what cannot be true and tick what must be true until each row has one answer.', 'cross out what cannot be true and check what must be true until each row has one answer.'],
  ['en', 'a ringed one means the child has it.', 'a circled one means the child has it.'],
  // es-MX: encierra (not rodea), palomita
  ['es', 'marca lo que tiene que ser y rodea el dibujo de cada niño.', 'pon palomita a lo que tiene que ser y encierra el dibujo de cada niño.'],
  ['es', 'Completa la cuadrícula y rodea cada respuesta.', 'Completa la cuadrícula y encierra cada respuesta.'],
  ['es', 'Léela y rodea la palomita si la oración es verdadera', 'Léela y encierra la palomita si la oración es verdadera'],
  ['es', 'tacha lo que no puede ser y marca lo que tiene que ser hasta que', 'tacha lo que no puede ser y pon palomita a lo que tiene que ser hasta que'],
  ['es', 'uno rodeado, que sí lo tiene. Tacha en la cuadrícula y rodea cada respuesta.', 'uno encerrado en un círculo, que sí lo tiene. Tacha en la cuadrícula y encierra cada respuesta.'],
  ['es', 'Si tiene {pic}, tiene {pic2}.', 'Quien tiene {pic} también tiene {pic2}.'],
  ['es', 'Si tiene {pic}, no tiene {pic2}.', 'El niño que tiene {pic} no tiene {pic2}.'],
  // it: the linking frames ("insieme a … c'è sempre" is unnatural and suggests many instances)
  ['it', "Insieme a {pic} c'è sempre {pic2}.", 'Il bambino che ha {pic} ha anche {pic2}.'],
  ['it', "Insieme a {pic} non c'è mai {pic2}.", 'Il bambino che ha {pic} non ha {pic2}.'],
  // da: "må passe" reads as "may" — the opposite of "must"
  ['da', 'og flueben ved det, der må passe.', 'og flueben ved det, der skal passe.'],
  ['da', 'og flueben ved det, der må passe, til hver række', 'og flueben ved det, der skal passe, til hver række'],
];

const esc = (s) => JSON.stringify(s).slice(1, -1);   // the JSON-escaped spelling (quotes / backslashes)
let changed = 0, bad = 0;
for (const [loc, a, b] of LIVE) {
  let hit = 0, already = 0;
  for (const f of filesFor(loc)) {
    let t = fs.readFileSync(f, 'utf8');
    const forms = f.endsWith('.js') ? [[a, b], [a.replace(/'/g, "\\'"), b.replace(/'/g, "\\'")]] : [[esc(a), esc(b)]];
    let n = 0;
    for (const [x, y] of forms) { if (t.includes(x)) { n += t.split(x).length - 1; t = t.split(x).join(y); } else if (t.includes(y)) already++; }
    if (n) { fs.writeFileSync(f, t); hit += n; console.log(`  ${loc} ${path.relative(ROOT, f)}: ${n}× "${a.slice(0, 50)}…"`); }
  }
  changed += hit;
  if (!hit && !already) { bad++; console.log(`FAIL ${loc}: "${a}" found nowhere (and its fix neither)`); }
}

// level texts (new pages) — i18n/level-instructions.json
const LI = path.join(ROOT, 'i18n', 'level-instructions.json');
const li = JSON.parse(fs.readFileSync(LI, 'utf8'));
const S = (loc) => JSON.parse(fs.readFileSync(path.join(ROOT, 'i18n', 'strings.' + loc + '.json'), 'utf8'));
// G2-319 level 1 prints TWO clues a case: its own title; the instruction = the (fixed) face instruction
const L1TITLE = { en: 'Logic Grid Puzzles: Two Clues, One Answer', de: 'Logicals: zwei Hinweise, eine Lösung', es: 'Acertijos de lógica: dos pistas, una respuesta', fr: 'Logigrammes : deux indices, une réponse', it: 'Logica a griglia: due indizi, una risposta', pt: 'Desafios de lógica: duas pistas, uma resposta', nl: 'Logicapuzzels: twee aanwijzingen, één antwoord', sv: 'Logikrutnät: två ledtrådar, ett svar', da: 'Logikopgaver: to spor, ét svar', no: 'Logikkoppgaver: to ledetråder, én løsning', fi: 'Päättelypulmat: kaksi vihjettä, yksi vastaus' };
li['G2-319'] = li['G2-319'] || {};
li['G2-319']['1'] = Object.fromEntries(LOCS.map((l) => [l, { title: L1TITLE[l], instruction: S(l)['G2-319'].instruction }]));
// G2-344 level 1 prints yes + either-or clues only (no "no" clue)
li['G2-344']['1'] = {
  en: 'A yes clue gets a check mark and an either-or clue crosses out the third picture. Finish the grid, then circle each answer.',
  de: 'Ein Ja-Hinweis bekommt einen Haken, ein Entweder-oder-Hinweis streicht das dritte Bild. Löse die Tabelle und kreise ein.',
  es: 'Una pista de sí lleva palomita y una pista con "o" tacha el tercer dibujo. Completa la cuadrícula y encierra cada respuesta.',
  fr: 'Un indice oui donne une coche, un indice « ou » barre la troisième image. Termine la grille, puis entoure chaque réponse.',
  it: 'Un indizio sì vuole una spunta e un indizio con "o" barra il terzo disegno. Completa la griglia e cerchia le risposte.',
  pt: 'Uma pista de sim ganha um certo e uma pista com "ou" risca a terceira figura. Complete a tabela e circule as respostas.',
  nl: 'Ja: zet een vinkje. Of: streep het derde plaatje door. Maak het rooster af en omcirkel elk antwoord.',
  sv: 'Ja ger en bock och antingen-eller stryker den tredje bilden. Gör rutnätet färdigt och ringa sedan in varje svar.',
  da: 'Et ja-spor får et flueben, og et enten-eller-spor streger det tredje billede ud. Gør skemaet færdigt, og sæt ring om hvert svar.',
  no: 'En ja-ledetråd får en hake, en enten-eller-ledetråd stryker det tredje bildet. Løs tabellen og sett ring.',
  fi: 'Kyllä-vihje saa väkäsen ja jompikumpi-vihje ruksaa kolmannen kuvan. Täytä ruudukko ja ympyröi sitten vastaukset.',
};
li['G2-344']['3'].es = 'Una pista de no lleva tacha y una pista con "o" tacha el tercer dibujo. Completa la cuadrícula y encierra cada respuesta.';
li['G2-344']['3'].en = 'A no clue gets an X and an either-or clue crosses out the third picture. Finish the grid, then circle each answer.';
li['G1-349']['1'].en = 'A circled picture means the child has it. Cross out on the grid, then circle each answer.';
li['G1-349']['1'].es = 'Un dibujo encerrado en un círculo quiere decir que el niño sí lo tiene. Tacha en la cuadrícula y encierra cada respuesta.';
li['G1-349']['3'].es = 'Un dibujo tachado quiere decir que el niño no lo tiene. Tacha en la cuadrícula y encierra cada respuesta.';
fs.writeFileSync(LI, JSON.stringify(li, null, 2) + '\n');

// screen texts — i18n/interactive-instructions.json
const II = path.join(ROOT, 'i18n', 'interactive-instructions.json');
const ii = JSON.parse(fs.readFileSync(II, 'utf8'));
const tap = {
  en: 'Tap a box once for a check mark, twice for an X, a third time to clear it.',
  de: 'Tippe einmal auf ein Kästchen für einen Haken, zweimal für ein Kreuz und ein drittes Mal zum Löschen.',
  es: 'Toca una casilla una vez para poner una palomita, dos veces para poner una tacha y una tercera vez para borrar.',
  fr: 'Touche une case une fois pour une coche, deux fois pour une croix, une troisième fois pour effacer.',
  pt: 'Toque um quadradinho uma vez para pôr um certo, duas vezes para um xis e uma terceira vez para apagar.',
  nl: 'Tik één keer op een vakje voor een vinkje, twee keer voor een kruisje en een derde keer om het weer leeg te maken.',
  sv: 'Tryck på en ruta en gång för en bock, två gånger för ett kryss och en tredje gång för att sudda ut den.',
  no: 'Trykk på en rute én gang for en hake, to ganger for et kryss og en tredje gang for å fjerne merket.',
};
const one = { en: 'Give each child one check mark.', de: 'Gib jedem Kind genau einen Haken.' };
const two = { en: 'Give each child one check mark in each of the two top grids.' };
for (const [l, t] of Object.entries(tap)) {
  const old1 = ii['logic-puzzles'].grid[l], old2 = ii['logic-puzzles']['grid-two'][l];
  const tail1 = one[l] || old1.slice(old1.lastIndexOf('.', old1.length - 2) + 2);
  const tail2 = two[l] || old2.slice(old2.lastIndexOf('.', old2.length - 2) + 2);
  ii['logic-puzzles'].grid[l] = t + ' ' + tail1;
  ii['logic-puzzles']['grid-two'][l] = t + ' ' + tail2;
}
ii['logic-puzzles'].read.en = 'Tap the check mark if the sentence is true, or the X if it is false.';
ii['logic-puzzles'].read.da = 'Tryk på fluebenet, hvis sætningen er rigtig, eller på krydset, hvis den er forkert.';
fs.writeFileSync(II, JSON.stringify(ii, null, 2) + '\n');

// names — data/b3/logic-puzzles-levelset.json (look-alikes of each other or of the bank's names)
const NM = path.join(ROOT, 'data', 'b3', 'logic-puzzles-levelset.json');
const nm = JSON.parse(fs.readFileSync(NM, 'utf8'));
const SWAP = { en: { Ella: 'Grace', Lucy: 'Zoe' }, de: { Hanna: 'Frida' }, es: { Paola: 'Ximena' }, fr: { 'Léo': 'Malo' }, pt: { Lara: 'Cecília', Lorena: 'Beatriz' }, nl: { Noor: 'Lieke' }, da: { Karla: 'Liva', Frida: 'Ellen' }, fi: { Elli: 'Venla', Eevi: 'Iida' } };
for (const [l, m] of Object.entries(SWAP)) nm[l] = nm[l].map((n) => {
  const to = m[n.nom];
  if (!to) return n;
  if (l !== 'fi') return { nom: to };
  const back = /[aou]/.test(to.toLowerCase());
  return { nom: to, ade: to + (back ? 'lla' : 'llä'), gen: to + 'n' };
});
for (const l of LOCS) if (new Set(nm[l].map((n) => n.nom)).size !== nm[l].length) { bad++; console.log('FAIL names ' + l + ': duplicate'); }
fs.writeFileSync(NM, JSON.stringify(nm, null, 1) + '\n');

console.log(`${changed} live replacements; level texts, screen texts, names written; ${bad} problems`);
process.exit(bad ? 1 : 0);
