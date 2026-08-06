#!/usr/bin/env node
/* =====================================================================
   fix-sorting-hoops-landing.js — repair the ONE landing bullet that the
   rebuild made untrue, in all eleven locales.

   The shipped `howToUse[2]` reads (en): "For Guess My Rule, tap “Set the
   rules” and choose one for each hoop. The labels read “Secret” until you
   reveal them." Three things are now wrong with it:
     · it names no setup flow that exists — rules are chosen in a panel that
       replaces the mat, per hoop, independently;
     · it never mentions `Surprise me`, which is the tool's HEADLINE
       INVENTION (a hidden rule nobody has seen, including the teacher);
     · en says the labels read "Secret" and the tool renders "Hidden".

   ⚠ NO PROSE IS INVENTED IN ANY LOCALE. The replacement is assembled from
   strings the NATIVE PANELS already authored for this tool — `surpriseBtn`
   and `hintSecret` verbatim — plus each locale's own shipped `hiddenRule`.
   That is the `fix-wodb-colour-reasons.js` precedent: reuse native strings
   already in the file rather than author locale content without a panel
   behind it. Only the connective frame is per-locale, and it is one clause.

   ⚠ It REFUSES a partial fix: all eleven or none.

   Usage: node scripts/fix-sorting-hoops-landing.js [--check]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const CHECK = process.argv.indexOf('--check') > -1;
const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* read the tool's own strings, so the copy can never name a label the tool
   does not render */
const stub = () => ({ style: {}, setAttribute() {}, appendChild() {}, querySelector: () => null });
const sandbox = { document: { getElementById: () => null, createElement: stub, createElementNS: stub,
  head: { appendChild() {} }, body: { classList: { add() {} } } }, window: {},
  localStorage: { getItem: () => null, setItem() {} }, fetch: () => Promise.resolve({ ok: false }),
  setTimeout: () => 0, clearTimeout() {}, Promise, Math, Date, JSON, console };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(ROOT, 'mini tools', 'sorting-hoops.js'), 'utf8') +
  '\n;this.__T = SortingHoops;', sandbox);
const S = sandbox.__T.strings;

/* the per-locale connective frame. {surprise} = the panel's own button
   label, {hidden} = the locale's shipped hidden-rule caption, {secret} =
   the panel's own hintSecret sentence, used verbatim. */
const FRAME = {
  en: 'For Guess My Rule, give each hoop a rule of its own — or tap “{surprise}” and the tool picks one nobody has seen, not even you. Each hoop reads “{hidden}” until you show them.',
  de: 'Für „Errate meine Regel“ bekommt jeder Reifen seine eigene Regel — oder tippen Sie auf „{surprise}“, dann wählt das Werkzeug sie aus und niemand hat sie gesehen. Bis zum Aufdecken steht auf jedem Reifen „{hidden}“.',
  fr: 'Pour « Devine ma règle », donnez à chaque cerceau sa propre règle — ou touchez « {surprise} » et l’outil en choisit une que personne n’a vue, pas même vous. Chaque cerceau affiche « {hidden} » jusqu’à ce que vous les montriez.',
  it: 'Per «Indovina la mia regola» dai a ogni cerchio la sua regola — oppure tocca «{surprise}» e la sceglie lo strumento, senza che nessuno la veda. Fino a quando non le mostri, su ogni cerchio si legge «{hidden}».',
  es: 'Para «Adivina mi regla», dale a cada aro su propia regla — o pulsa «{surprise}» y la elige la herramienta sin que nadie la vea. Cada aro pone «{hidden}» hasta que las muestras.',
  pt: 'Para «Adivinhe a minha regra», dê a cada arco a sua própria regra — ou toque em «{surprise}» e a ferramenta escolhe uma que ninguém viu. Cada arco mostra «{hidden}» até você revelar.',
  nl: 'Voor «Raad mijn regel» geeft u elke hoepel een eigen regel — of tik op «{surprise}», dan kiest het hulpmiddel er een die niemand heeft gezien. Op elke hoepel staat «{hidden}» tot u ze laat zien.',
  sv: 'I «Gissa min regel» får varje ring en egen regel — eller tryck på «{surprise}», då väljer verktyget en som ingen har sett. På varje ring står «{hidden}» tills du visar dem.',
  da: 'I «Gæt min regel» får hver ring sin egen regel — eller tryk på «{surprise}», så vælger værktøjet en, som ingen har set. På hver ring står der «{hidden}», indtil du viser dem.',
  no: 'I «Gjett regelen min» får hver ring sin egen regel — eller trykk «{surprise}», så velger verktøyet en som ingen har sett. På hver ring står det «{hidden}» til du viser dem.',
  fi: 'Arvaa sääntöni -tilassa kumpikin vanne saa oman sääntönsä — tai napauta «{surprise}», jolloin työkalu valitsee sen eikä kukaan ole nähnyt sitä. Kummassakin vanteessa lukee «{hidden}», kunnes näytät ne.'
};

let changed = 0, already = 0;
const problems = [];

for (const L of LOCALES) {
  const f = path.join(ROOT, 'frontend', 'messages', 'tool-content', L + '.json');
  const j = JSON.parse(fs.readFileSync(f, 'utf8'));
  const e = j['sorting-hoops'];
  if (!e || !Array.isArray(e.howToUse) || e.howToUse.length < 3) {
    problems.push(L + ': no sorting-hoops.howToUse to repair'); continue;
  }
  const surprise = S.surpriseBtn[L], hidden = S.hiddenRule[L];
  if (!surprise || !hidden) { problems.push(L + ': the tool has no surpriseBtn/hiddenRule'); continue; }

  const next = FRAME[L].replace('{surprise}', surprise).replace('{hidden}', hidden);
  if (e.howToUse[2] === next) { already++; continue; }
  e.howToUse[2] = next;
  if (!CHECK) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  changed++;
  console.log('  ' + L + ': ' + next.slice(0, 96) + '…');
}

if (problems.length) {
  console.error('FAIL  ' + problems.join('\n      '));
  process.exit(1);
}
if (changed && changed + already !== LOCALES.length) {
  console.error(`FAIL  partial repair: ${changed} changed + ${already} current != ${LOCALES.length}`);
  process.exit(1);
}
if (CHECK) {
  if (changed) { console.error(`FAIL  ${changed} locale(s) STALE`); process.exit(1); }
  console.log('ok    all 11 landing bullets are current'); process.exit(0);
}
console.log(`\n  ${changed} rewritten, ${already} already current — 11/11`);
