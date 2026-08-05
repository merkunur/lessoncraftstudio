#!/usr/bin/env node
/* =====================================================================
   apply-measurement-bench-locales.js — write the six native panels'
   output into `mini tools/measurement-bench.js`.

   Six three-person native ensembles (de · fr · sv/da/no · es/pt/it ·
   nl/en · fi) were briefed to treat my English as a SOURCE TO AUDIT and
   to READ THE MODEL, not to translate. Between them they found nine
   defects no gate could see, four of them in code written the same hour:

   ⭐⭐ `bothCountsLine` was labelled "With gaps" and a GAPPY CHAIN CAN
      NEVER REACH IT. Traced independently by the Nordic, Finnish, French
      and Romance panels: a gappy chain closes to FEWER units than the
      object needs, so `closed.length < need0` fires `_speakCover` and
      returns. The line renders only when MORE units were laid than fit —
      overlaps, or overhang past the end — where the first number is
      always the LARGER. The one case the label named is the one case
      that cannot produce it. Both labels are now defect-neutral.

   ⭐⭐ THREE LIVE CONTRACTION BUGS in my `startLine` drafts: es "de el
      tenedor", pt "de o garfo", it "di il martello". Every noun phrase
      carries its own article, so no contracting preposition may precede
      {noun} — and Portuguese contracts them all. All three panels
      rebuilt the shape preposition-free.

   ⭐⭐ FRENCH ELISION: "au bout de {noun}" produces "au bout de le
      crayon de cire" for ~17 of the 30 objects. `de + le` must become
      `du` and nothing can do that at runtime.

   ⭐⭐ FINNISH CASE: my capacity drafts used `vetää` with vessel phrases
      that are stored in the ILLATIVE — ungrammatical in every pair. The
      panel reused `mahtua`, which governs exactly the case already
      stored, so no new noun data was needed. `startLine` needed a
      genitive it does not have; the passive clause they wrote is also
      number-neutral, which keeps `tikkaat` (plurale tantum) working.

   ⭐ `setScale` "Beaker scale" collides with the BALANCE one tab away —
      and was factually wrong: the graduation ticks are drawn
      unconditionally, only the numerals are gated. It names the numbers
      now, in all eleven.

   ⭐ `{a}`/`{b}` were vessel NOUN PHRASES in two keys and bare INTEGERS
      in a third, under a `fmt` that is a blind global regex. Renamed to
      {n1}/{n2} in `bothCountsLine`.

   Run:  node scripts/apply-measurement-bench-locales.js [--dry-run]
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const TOOL = path.join(__dirname, '..', 'mini tools', 'measurement-bench.js');
const DRY = process.argv.includes('--dry-run');
const L = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

/* Panel output, verbatim. `bothCountsLine` placeholders re-keyed {a}/{b}
   -> {n1}/{n2} (the panels wrote against the old names; the rename is
   theirs, at their recommendation). */
const P = {
  compareLine: {
    en: 'Guessed: {g} · Measured: {n}', de: 'Geschätzt: {g} · Gemessen: {n}',
    fr: 'Estimation : {g} · Mesure : {n}', it: 'Stima: {g} · Misura: {n}',
    es: 'Estimación: {g} · Medición: {n}', pt: 'Estimativa: {g} · Medida: {n}',
    nl: 'Geschat: {g} · Gemeten: {n}', sv: 'Gissning: {g} · Mätning: {n}',
    da: 'Gæt: {g} · Måling: {n}', no: 'Gjetning: {g} · Måling: {n}',
    fi: 'Arvio: {g} · Mittaus: {n}'
  },
  measuredOnly: {
    en: 'Measured: {n}', de: 'Gemessen: {n}', fr: 'Mesure : {n}', it: 'Misura: {n}',
    es: 'Medición: {n}', pt: 'Medida: {n}', nl: 'Gemeten: {n}', sv: 'Mätning: {n}',
    da: 'Måling: {n}', no: 'Måling: {n}', fi: 'Mittaus: {n}'
  },
  lengthHint: {
    en: 'Drag paperclips or cubes from the pile and lay them along the object. Drag one back to the pile to take it away.',
    de: 'Zieh Büroklammern oder Würfel aus dem Stapel und leg sie am Gegenstand entlang. Zieh sie auf den Stapel zurück, um sie wieder wegzunehmen.',
    fr: 'Fais glisser les trombones ou les cubes du tas et pose-les le long de l’objet, puis appuie sur Compter.',
    it: 'Trascina i pezzi dal mucchietto e mettili lungo l’oggetto, uno dopo l’altro. Trascina un pezzo nel mucchietto per toglierlo.',
    es: 'Arrastra las piezas del montón y ponlas a lo largo del objeto, una detrás de otra. Arrastra una pieza al montón para quitarla.',
    pt: 'Arraste as peças do montinho e coloque-as ao longo do objeto, uma depois da outra. Arraste uma peça de volta para o montinho para tirá-la.',
    nl: 'Sleep paperclips of blokjes van de stapel en leg ze langs het voorwerp. Sleep er een terug naar de stapel om hem weg te halen.',
    sv: 'Dra en i taget från högen och lägg dem längs föremålet.',
    da: 'Træk én ad gangen fra bunken, og læg dem langs tingen.',
    no: 'Dra én om gangen fra haugen og legg dem langs gjenstanden.',
    fi: 'Vedä pinosta mittapaloja ja lado ne viivalle kuvan alle. Palan voi siirtää tai vetää takaisin pinoon.'
  },
  anotherPair: {
    en: 'Two new beakers', de: 'Zwei andere Gefäße', fr: 'Deux autres récipients',
    it: 'Altri due recipienti', es: 'Otros dos recipientes', pt: 'Outros dois recipientes',
    nl: 'Twee nieuwe bakjes', sv: 'Två nya kärl', da: 'To nye beholdere',
    no: 'To nye beholdere', fi: 'Uudet astiat'
  },
  capSameLine: {
    en: '{a} and {b} both hold {n} {unitP}. Two different shapes, the same number of {unitP}.',
    de: '{a} und {b} fassen beide {n} {unitP}. Sie sehen ganz verschieden aus, und die Zahl ist gleich.',
    fr: '{a} et {b} contiennent tous les deux {n} {unitP}. Ils ne se ressemblent pas du tout, et le nombre est le même.',
    it: '{a} e {b} contengono {n} {unitP}. Da fuori non si somigliano per niente, e il numero è lo stesso.',
    es: 'En {a} y en {b} caben {n} {unitP}. Por fuera no se parecen en nada, y el número es el mismo.',
    pt: '{a} e {b} guardam {n} {unitP}. Por fora não se parecem em nada, e o número é o mesmo.',
    nl: 'In {a} en in {b} passen allebei {n} {unitP}. Twee verschillende vormen, hetzelfde aantal {unitP}.',
    sv: '{a} och {b} rymmer båda {n} {unitP}. De ser helt olika ut, och ändå blir det lika många.',
    da: '{a} og {b} rummer begge {n} {unitP}. De ser helt forskellige ud, og alligevel bliver det lige mange.',
    no: '{a} og {b} rommer begge {n} {unitP}. De ser helt ulike ut, og likevel blir det like mange.',
    fi: '{a} mahtuu {n} {unitP} ja {b} mahtuu {n} {unitP}. Astiat näyttävät aivan erilaisilta, ja luku on sama.'
  },
  capDiffLine: {
    en: '{a} holds {na} {unitP} and {b} holds {nb} {unitP}.',
    de: '{a} fasst {na} {unitP}, {b} fasst {nb} {unitP}.',
    fr: '{a} contient {na} {unitP} et {b} en contient {nb}.',
    it: '{a} contiene {na} {unitP} e {b} ne contiene {nb}.',
    es: 'En {a} caben {na} {unitP} y en {b} caben {nb}.',
    pt: '{a} guarda {na} {unitP} e {b} guarda {nb}.',
    nl: 'In {a} passen {na} {unitP} en in {b} passen er {nb}.',
    sv: '{a} rymmer {na} {unitP} och {b} rymmer {nb}.',
    da: '{a} rummer {na} {unitP}, og {b} rummer {nb}.',
    no: '{a} rommer {na} {unitP} og {b} rommer {nb}.',
    fi: '{a} mahtuu {na} {unitP} ja {b} mahtuu {nb} {unitP}.'
  },
  startLine: {
    en: 'Let’s begin at the very start of {noun}, so nothing is missed.',
    de: 'Wir fangen ganz vorne an, da wo {noun} anfängt — dann fehlt nichts.',
    fr: 'On part juste du bord, là où {noun} commence, comme ça on n’oublie rien.',
    it: 'Il primo pezzo va proprio dove comincia {noun}, così non ci sfugge niente.',
    es: 'La primera pieza va justo donde empieza {noun}, así no nos dejamos nada.',
    pt: 'A primeira peça vai bem onde {noun} começa, assim não fica nada de fora.',
    nl: 'We beginnen helemaal bij het begin van {noun}, dan slaan we niets over.',
    sv: 'Vi börjar precis vid kanten på {noun}, så att ingenting missas.',
    da: 'Vi begynder helt ude ved kanten af {noun}, så vi får det hele med.',
    no: 'Vi starter helt ute ved kanten av {noun}, så får vi med alt sammen.',
    fi: '{noun} mitataan aivan päästä alkaen, niin mitään ei jää väliin.'
  },
  bothCountsLine: {
    en: 'First count: {n1} · End to end: {n2}',
    de: 'So gelegt: {n1} · Kante an Kante: {n2}',
    fr: 'D’abord : {n1} · Bout à bout : {n2}',
    it: 'Come stavano: {n1} · Tutti attaccati: {n2}',
    es: 'Tal como estaban: {n1} · Todas juntas: {n2}',
    pt: 'Do jeito que ficaram: {n1} · Bem juntinhas: {n2}',
    nl: 'Eerste telling: {n1} · Tegen elkaar: {n2}',
    sv: 'Som de låg: {n1} · Kant i kant: {n2}',
    da: 'Som de lå: {n1} · Kant mod kant: {n2}',
    no: 'Slik de lå: {n1} · Kant i kant: {n2}',
    fi: 'Näin ladottuna: {n1} · Kiinni toisissaan: {n2}'
  },
  takeOneOff: {
    en: 'The cubes are heavier now.',
    de: 'Jetzt ist die Waagschale mit den Würfeln schwerer.',
    fr: 'Maintenant, le plateau des cubes descend : il est plus lourd.',
    it: 'Adesso pesa di più il piatto dei cubetti.',
    es: 'Ahora pesa más el platillo de los cubos.',
    pt: 'Agora o prato dos cubinhos está mais pesado.',
    nl: 'Nu zijn de blokjes zwaarder.',
    sv: 'Nu är det kuberna som väger ner.',
    da: 'Nu er det terningerne, der vejer ned.',
    no: 'Nå er det kubene som veier ned.',
    fi: 'Nyt kuutioiden puoli painaa enemmän.'
  },
  setScale: {
    en: 'Numbers on the beakers', de: 'Zahlen an den Gefäßen',
    fr: 'Graduations des récipients', it: 'Tacche sui recipienti',
    es: 'Marcas en los recipientes', pt: 'Marcas nos recipientes',
    nl: 'Cijfers op de bakjes', sv: 'Siffror på kärlen',
    da: 'Tal på beholderne', no: 'Tall på beholderne', fi: 'Astioiden numerot'
  },
  scaleNone: {
    en: 'No numbers', de: 'Ohne Zahlen', fr: 'Sans chiffres', it: 'Senza numeri',
    es: 'Sin números', pt: 'Sem números', nl: 'Geen cijfers', sv: 'Utan siffror',
    da: 'Uden tal', no: 'Uten tall', fi: 'Ei numeroita'
  },
  scaleCups: {
    en: 'Cups', de: 'Becher', fr: 'Gobelets', it: 'Misurini', es: 'Tazas',
    pt: 'Copinhos', nl: 'Bekers', sv: 'Muggar', da: 'Kopper', no: 'Kopper',
    fi: 'Kupilliset'
  },
  scaleMl: {
    en: 'Milliliters', de: 'Milliliter', fr: 'Millilitres', it: 'Millilitri',
    es: 'Mililitros', pt: 'Mililitros', nl: 'Milliliters', sv: 'Milliliter',
    da: 'Milliliter', no: 'Milliliter', fi: 'Millilitrat'
  },
  printSheet: {
    en: 'Print the measuring pages', de: 'Arbeitsblatt drucken',
    fr: 'Imprimer la fiche', it: 'Stampa la scheda delle misure',
    es: 'Imprimir la ficha de medidas', pt: 'Imprimir a folha de medidas',
    nl: 'Meetbladen afdrukken', sv: 'Skriv ut arket', da: 'Print arket',
    no: 'Skriv ut arket', fi: 'Tulosta moniste'
  }
};

/* ---- validate before writing ---- */
let bad = 0;
const err = (m) => { bad++; console.error('  ERROR ' + m); };
for (const key of Object.keys(P)) {
  const en = P[key].en;
  if (!en) { err(key + ': no en'); continue; }
  const want = (en.match(/\{\w+\}/g) || []).filter((v, i, a) => a.indexOf(v) === i);
  for (const l of L) {
    const v = P[key][l];
    if (!v || !v.trim()) { err(key + '.' + l + ': empty'); continue; }
    for (const p of want) if (!v.includes(p)) err(key + '.' + l + ': drops ' + p);
    /* the contraction traps the Romance panel caught in MY drafts */
    if (l === 'es' && /\b(de|a)\s+\{(noun|a|b)\}/.test(v)) err(key + '.es: "de/a" before an articled placeholder -> "de el"');
    if (l === 'pt' && /\b(de|em|a|por)\s+\{(noun|a|b)\}/.test(v)) err(key + '.pt: preposition before an articled placeholder');
    if (l === 'it' && /\b(di|a|da|in|su)\s+\{(noun|a|b)\}/.test(v)) err(key + '.it: preposition before an articled placeholder -> "di il"');
    if (l === 'fr' && /\b(de|à)\s+\{(noun|a|b)\}/.test(v)) err(key + '.fr: "de/à" before an articled placeholder -> "de le"');
  }
}
if (bad) { console.error('\nFAIL — ' + bad + ' problem(s); nothing written.'); process.exit(1); }
console.log('  ok   ' + Object.keys(P).length + ' keys x ' + L.length + ' locales validated (placeholders + contraction traps)');

/* ---- write ---- */
let src = fs.readFileSync(TOOL, 'utf8');
let wrote = 0;
for (const key of Object.keys(P)) {
  const line = key + ': ' + '{' + L.map((l) => l + ':' + JSON.stringify(P[key][l])).join(',') + '}';
  /* match `    <key>:  {en:'...'},` up to the end of that logical entry */
  const re = new RegExp('(^[ \\t]*)' + key + ':\\s*\\{en:[^\\n]*?\\},$', 'm');
  if (!re.test(src)) { err('could not locate the ' + key + ' entry to replace'); continue; }
  src = src.replace(re, (m, indent) => indent + line + ',');
  wrote++;
}
if (bad) { console.error('\nFAIL — ' + bad + ' entr(ies) not found; nothing written.'); process.exit(1); }

if (DRY) { console.log('  dry-run: ' + wrote + ' entries would be rewritten'); process.exit(0); }
fs.writeFileSync(TOOL, src);
console.log('  ok   ' + wrote + ' string entries rewritten from the native panels');
