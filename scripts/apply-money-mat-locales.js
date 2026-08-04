#!/usr/bin/env node
/* =====================================================================
   apply-money-mat-locales.js — apply the native panels' landing copy.

   ⚠ The old apply-money-mat-fanout.js hard-codes a scratchpad path from a
   session that no longer exists; it is one-shot and unusable. This one
   carries its data inline and REFUSES TO WRITE on anything suspicious.

   Scope: the `money-mat` ToolEntry in frontend/messages/tool-content/*.json
     · howToUse[4] — the old bullet describes a change flow that no longer
       exists (keeper offers coins, child taps to accept). Every locale is
       rewritten by its own panel, not translated from the English.
     · two shipped-copy defects the panels found while reading:
         no  howToUse[1] & [2] say bare `pungen` — neutral in Danish, but
             playground slang for scrotum in Norwegian, and this is text
             projected on a board for 6-8 year olds → `pengepungen`
         pt  howToUse[2] says `carteira` — the pupil's DESK in Brazilian
             classroom register, and dictation-desk owns it → `bolsinha`

   Usage: node scripts/apply-money-mat-locales.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const DRY = process.argv.includes('--dry-run');
const REPO = path.join(__dirname, '..');
const DIR = path.join(REPO, 'frontend', 'messages', 'tool-content');
const KEY = 'money-mat';

/* every bullet states all four facts the old one got wrong or omitted: the
   tender STAYS, the CHILD builds it, only fitting coins are offered (so the
   no-wrong-tap guarantee is stated rather than implied), and the amount is
   named at the END. */
const BULLET5 = {
  en: 'In Premium, switch to Get change: the money paid stays beside the price, the purse offers only the coins that still fit, and each tap the child makes draws its own hop on the line, which the keeper says aloud — the change is named at the end.',
  de: 'Mit Premium: Im Rückgeld-Modus wählt das Kind, womit es bezahlt — das Geld bleibt neben dem Preis liegen. Dann legt es sein Rückgeld selbst; angeboten wird nur, was noch passt, jede Münze zeichnet ihren Sprung auf dem Zahlenstrahl, und der Betrag zeigt sich erst am Schluss.',
  fr: 'Avec Premium, passez en « Recevoir la monnaie » : l’enfant choisit avec quoi payer, et ce qu’il a donné reste sur le comptoir, à côté du prix. C’est lui qui construit la monnaie, pièce après pièce — seules les pièces qui entrent encore dans l’écart lui sont proposées, donc chaque geste avance — et chaque pièce trace sur la ligne un bond long comme sa valeur. Le montant rendu s’affiche à la fin.',
  it: 'Con Premium passa a «Ricevere il resto»: il bambino sceglie con che cosa pagare e quello che ha dato resta sul banco, accanto al prezzo. Il resto lo costruisce lui, moneta dopo moneta — nel borsellino compaiono solo le monete che ci stanno ancora, così ogni tocco fa un passo avanti — e ogni moneta disegna sulla linea un salto lungo quanto il suo valore. La cifra del resto compare alla fine.',
  es: 'Con Premium, activa «Recibir la vuelta»: el niño elige con qué pagar y lo que entregó se queda en el mostrador, al lado del precio. La vuelta la arma él, moneda a moneda — en el monedero solo aparecen las monedas que todavía caben, así que cada toque avanza — y cada moneda dibuja en la recta un salto tan largo como su valor. La cantidad de la vuelta se muestra al final.',
  pt: 'No Premium, ative o modo Receber troco: a criança escolhe com o que pagar e o que ela entregou fica no balcão, ao lado do preço. O troco quem monta é ela, moeda por moeda — a bolsinha só oferece as moedas que ainda cabem, então cada toque avança — e cada moeda desenha na reta um pulo do tamanho do seu valor. O valor do troco aparece no fim.',
  nl: 'Met Premium: zet ‘Wisselgeld krijgen’ aan en kies waarmee je betaalt — dat geld blijft naast de prijs liggen. Het kind legt het wisselgeld zelf: alleen munten die nog passen worden aangeboden, elke munt tekent zijn eigen sprong op de getallenlijn, en pas op het eind staat het bedrag er.',
  sv: 'I Premium byter du till växelläget: välj vad du betalar med — pengarna ligger kvar bredvid priset. Sedan lägger barnet växeln själv; bara mynt som får plats erbjuds, varje mynt ritar sitt eget hopp på tallinjen, och summan visas först på slutet.',
  da: 'I Premium skifter du til Få byttepenge: Vælg, hvad der betales med — pengene bliver liggende ved siden af prisen. Så lægger barnet selv byttepengene; kun de mønter, der er plads til, bliver tilbudt, hver mønt tegner sit eget hop på tallinjen, og beløbet står der først til sidst.',
  no: 'Med Premium: bytt til «Få igjen penger». Barnet velger hva det vil betale med, og pengene blir liggende ved siden av prisen. Pengepungen tilbyr bare mynter som fortsatt får plass, og hvert trykk tegner et hopp like langt som mynten, mens selgeren sier høyt hva barnet nettopp gjorde — beløpet vises til slutt.',
  fi: 'Premiumissa voit vaihtaa Saat vaihtorahaa -tilaan: lapsi valitsee, millä maksaa, ja maksu jää näkyviin hinnan viereen. Kukkarosta tarjotaan vain ne kolikot, jotka vielä sopivat, ja jokainen napautus piirtää kolikon mittaisen loikan, jonka myyjä sanoo ääneen — vaihtorahan määrä kerrotaan vasta lopuksi.'
};

/* word-level repairs to ALREADY-SHIPPED bullets, flagged by the panels */
const REPAIRS = {
  no: [[/\bpungen\b/g, 'pengepungen']],
  pt: [[/\bcarteira\b/g, 'bolsinha']]
};

const LOCALES = Object.keys(BULLET5);
const errors = [];
const E = (m) => { errors.push(m); console.log('  ✗ ' + m); };

/* ---- refuse-to-write guards, run BEFORE anything is touched ---- */
if (LOCALES.length !== 11) E(`${LOCALES.length} locales, want 11`);
const seen = {};
for (const L of LOCALES) {
  const s = BULLET5[L];
  if (!s || !s.trim()) { E(`${L}: empty bullet`); continue; }
  if (L !== 'en' && s === BULLET5.en) E(`${L}: identical to English — that is a translation gap, not a rebuild`);
  if (seen[s]) E(`${L}: identical to ${seen[s]}`);
  seen[s] = L;
  /* the four facts the old bullet got wrong. A bullet that does not carry
     them is the old bullet in new words. */
  if (!/\d|premium|premiumissa/i.test(s)) E(`${L}: does not name the tier`);
  if (s.length < 120) E(`${L}: ${s.length} chars — too short to carry all four facts`);
  if (/[!]/.test(s)) E(`${L}: exclamation mark`);
}
/* no-verdict ban, the same stems the build gate uses */
const w = (b) => new RegExp('(?<!\\p{L})(?:' + b + ')', 'iu');
const BAN = {
  en: w('correct|incorrect|wrong|oops'), de: w('richtig|falsch'), fr: w('correct|faux|fauss'),
  it: w('giust|sbagliat|corrett'), es: w('correct|incorrect|equivocad'), pt: w('corret|incorret|errad'),
  nl: w('fout|onjuist|goed antwoord'), sv: w('rätt svar|fel(?!\\p{L})'), da: w('forkert|rigtigt svar'),
  no: w('riktig svar|feil(?!\\p{L})'), fi: w('oikein|vääri|väärä')
};
for (const L of LOCALES) if (BAN[L] && BAN[L].test(BULLET5[L])) E(`${L}: verdict vocabulary in the bullet`);

if (errors.length) { console.log(`\nREFUSING TO WRITE — ${errors.length} problem(s)`); process.exit(1); }

/* ---- apply ---- */
let changed = 0;
for (const L of LOCALES) {
  const f = path.join(DIR, `${L}.json`);
  const raw = fs.readFileSync(f, 'utf8');
  const j = JSON.parse(raw);
  const entry = j[KEY];
  if (!entry) { console.log(`  ⚠ ${L}: no ${KEY} entry, skipped`); continue; }
  if (!Array.isArray(entry.howToUse) || entry.howToUse.length !== 5) {
    console.log(`  ⚠ ${L}: howToUse has ${entry.howToUse ? entry.howToUse.length : 0} bullets, want 5 — skipped`);
    continue;
  }
  const before = JSON.stringify(entry.howToUse);
  entry.howToUse[4] = BULLET5[L];
  if (REPAIRS[L]) {
    for (let i = 0; i < entry.howToUse.length; i++) {
      for (const [re, to] of REPAIRS[L]) entry.howToUse[i] = entry.howToUse[i].replace(re, to);
    }
  }
  if (JSON.stringify(entry.howToUse) === before) { console.log(`  = ${L}: already current`); continue; }
  if (!DRY) fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');
  changed++;
  console.log(`  ✓ ${L}${REPAIRS[L] ? ' (+ word repairs)' : ''}`);
}
console.log(`\n${DRY ? 'DRY RUN — ' : ''}${changed} locale(s) ${DRY ? 'would change' : 'updated'}`);
