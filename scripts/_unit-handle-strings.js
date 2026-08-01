/* =====================================================================
   _unit-handle-strings.js — the in-tool string set for TOOL #40
   ---------------------------------------------------------------------
   Data only. `apply-unit-handle-locales.js` reads this and rewrites the
   `strings: { ... }` block in `mini tools/unit-handle.js`.

   EN is authored. The other ten come from a three-person NATIVE panel
   per locale (§A.13.48) — a linguist, a K-2 maths teacher on that
   country's own curriculum, and a B2C education marketer — who REBUILT
   the tool in their language rather than translating it. Every one of
   the ten renamed it.

   ⭐ THE CATCHES, because they are the reason panels exist:
     fr  rejected `unité` outright — in CP/CE1 it reads as PLACE VALUE
         ("dizaines et unités"), so the tool would have looked like a
         base-ten tool. The cycle-2 word for a measuring unit that has a
         size and no name is `étalon`. This is the `table de
         multiplication` trap in a second dress, and no brief predicted
         it.
     de + es  both refused the obvious word for the bench: `Bank` and
         `banco` read first as a FINANCIAL bank. They landed on
         `Messtisch` and `la mesa de medir`.
     nl  `tafel` is the times tables in groep 3/4, so the surface is
         `het blad` — the same ruling a sibling tool reached.
     da + no  both refused `målebånd`: a real tape measure carries
         printed centimetres, which would smuggle a named unit back in
         through the picture. They coined `Strækbåndet` / `Strekkbåndet`.
     sv  refused `måttband` and `linjal` for the same reason.
     pt  kept `unidade` (BNCC uses it generically for non-standard units)
         but rejected the teacher's spoken `cabe certinho`, because
         `certinho` derives from `certo` and edges toward a verdict.
   Each locale also chose its own classroom word for the tile:
   Plättchen · case · pieza · peça · blokje · bit · brik · bit.
   ===================================================================== */

'use strict';

module.exports = {
  en: {
    title: "The Unit Handle",
    instruction: "Two tapes, one object. Stretch a tape's unit and watch its number change — while the object, and the other tape, stay exactly where they are.",
    hintStretch: "Drag the end of a first tile to make its unit bigger or smaller.",
    hintCompare: "The two tapes measure the same object. Why are the numbers different?",
    hintOver: "That unit does not fit a whole number of times. The last piece is left over.",
    fitBtn: "Make it come out even",
    matchBtn: "Same unit on both",
    newObjBtn: "Another object",
    printBtn: "Print the bench",
    gateLine: "The whole object shelf and printing are part of the Teacher plan.",
    unlock: "See the Teacher plan",
    benchLabel: "the bench",
    objectAria: "the object being measured",
    tapeAria: "tape {i}",
    handleAria: "the unit on tape {i} — drag to resize",
    countAria: "tape {i} holds {n}",
    overAria: "and a piece left over"
  },

  /* renamed "Die dehnbare Einheit" — Einheitsgriff reads as hardware,
     while dehnbar names the invention. Messtisch, not Bank (bench/bank).
     Tiles are Plättchen, the Grundschule manipulative word; "aufgehen /
     ohne Rest" is the native maths idiom and carries no verdict. */
  de: {
    title: "Die dehnbare Einheit",
    instruction: "Zwei Streifen, ein Gegenstand: Zieh die Einheit eines Streifens größer oder kleiner – die Zahl am Ende verändert sich, während der Gegenstand und der andere Streifen genau dort bleiben, wo sie sind.",
    hintStretch: "Zieh am Ende des ersten Plättchens – so wird seine Einheit größer oder kleiner.",
    hintCompare: "Beide Streifen messen denselben Gegenstand. Warum sind die Zahlen verschieden?",
    hintOver: "Diese Einheit geht nicht ganz auf. Das letzte Stück bleibt übrig.",
    fitBtn: "Ohne Rest messen",
    matchBtn: "Gleiche Einheit",
    newObjBtn: "Anderer Gegenstand",
    printBtn: "Messtisch drucken",
    gateLine: "Das ganze Regal mit Gegenständen und das Drucken gehören zum Lehrer-Paket.",
    unlock: "Lehrer-Paket ansehen",
    benchLabel: "der Messtisch",
    objectAria: "der Gegenstand, der gemessen wird",
    tapeAria: "Streifen {i}",
    handleAria: "die Einheit auf Streifen {i} – zum Ändern ziehen",
    countAria: "Streifen {i} enthält {n}",
    overAria: "und ein Stück bleibt übrig"
  },

  /* ⭐ étalon, NEVER unité — in CP/CE1 "unité" reads as place value.
     le plateau, never la table (table de multiplication). "tomber
     juste" is the ordinary French idiom for a unit dividing evenly and
     judges the FIT, never the child or either measurement. */
  fr: {
    title: "L'étalon élastique",
    instruction: "Deux bandes, un seul objet. Étire l'étalon d'une bande : son nombre change, alors que l'objet et l'autre bande, eux, ne bougent pas.",
    hintStretch: "Fais glisser le bord de la première case pour agrandir ou réduire l'étalon.",
    hintCompare: "Les deux bandes mesurent le même objet. Pourquoi les nombres sont-ils différents ?",
    hintOver: "Cet étalon ne tient pas un nombre entier de fois : il reste un morceau.",
    fitBtn: "Faire tomber juste",
    matchBtn: "Le même étalon",
    newObjBtn: "Un autre objet",
    printBtn: "Imprimer le plateau",
    gateLine: "La collection complète d'objets et l'impression font partie de l'offre Enseignant.",
    unlock: "Voir l'offre Enseignant",
    benchLabel: "le plateau",
    objectAria: "l'objet à mesurer",
    tapeAria: "bande {i}",
    handleAria: "l'étalon de la bande {i} — faire glisser pour changer sa taille",
    countAria: "la bande {i} en contient {n}",
    overAria: "et un morceau qui dépasse"
  },

  /* "la mesa de medir", never "el banco" (bank). tira, not cinta —
     tira is what Spanish primary teachers call paper measuring strips;
     cinta pulls toward ribbon or adhesive tape. Title rebuilt as an
     imperative that names the action without naming a unit. */
  es: {
    title: "Estira la unidad",
    instruction: "Dos tiras, un solo objeto. Estira la unidad de una tira y mira cómo cambia su número: el objeto y la otra tira se quedan donde están.",
    hintStretch: "Arrastra el borde de la primera pieza para hacer su unidad más grande o más pequeña.",
    hintCompare: "Las dos tiras miden el mismo objeto. ¿Por qué los números son distintos?",
    hintOver: "Esa unidad no cabe un número exacto de veces: el último trozo sobra.",
    fitBtn: "Que salga exacto",
    matchBtn: "Igualar las unidades",
    newObjBtn: "Otro objeto",
    printBtn: "Imprimir la mesa",
    gateLine: "El estante completo de objetos y la impresión forman parte del plan Docente.",
    unlock: "Ver el plan Docente",
    benchLabel: "la mesa de medir",
    objectAria: "el objeto que se mide",
    tapeAria: "tira {i}",
    handleAria: "la unidad de la tira {i}: arrastra para cambiar su tamaño",
    countAria: "la tira {i} tiene {n}",
    overAria: "y sobra un trozo"
  },

  /* unidade is BNCC's generic word for a non-standard unit, so it names
     nothing. "cabe certinho" was rejected: certinho derives from certo
     and edges toward a verdict. */
  pt: {
    title: "A Unidade que Estica",
    instruction: "Duas fitas, um só objeto. Estique a unidade de uma fita e veja o número dela mudar — enquanto o objeto e a outra fita ficam exatamente onde estão.",
    hintStretch: "Arraste a ponta da primeira peça para deixar a unidade maior ou menor.",
    hintCompare: "As duas fitas medem o mesmo objeto. Por que os números são diferentes?",
    hintOver: "Essa unidade não cabe um número exato de vezes: o último pedaço sobra.",
    fitBtn: "Caber sem sobra",
    matchBtn: "Igualar as unidades",
    newObjBtn: "Outro objeto",
    printBtn: "Imprimir a bancada",
    gateLine: "A prateleira completa de objetos e a impressão fazem parte do plano Professor.",
    unlock: "Ver o plano Professor",
    benchLabel: "a bancada",
    objectAria: "o objeto que está sendo medido",
    tapeAria: "fita {i}",
    handleAria: "a unidade da fita {i} — arraste para mudar o tamanho",
    countAria: "a fita {i} tem {n}",
    overAria: "e sobra um pedaço"
  },

  /* ⭐ "il tavolo", NEVER "il banco" — the live Italian catalogue already
     ships *Il banco delle misure*, a different length tool that measures
     with NAMED units (graffette, cubetti), so reusing banco here would
     read as that tool. The panel caught a collision inside our own
     shipped product that no brief mentioned. "piastrella" for the tile,
     because tiling is what carries unit-iteration in Italian primary
     didactics — which leaves "unità" free to mean the size that changes.
     Register follows the shipped house style: voi to the room, bare
     tu-imperative on control labels. */
  it: {
    title: "L'unità elastica",
    instruction: "Due strisce, un solo oggetto. Allungate l'unità di una striscia e guardate come cambia il suo numero: l'oggetto e l'altra striscia restano esattamente dove sono.",
    hintStretch: "Trascinate l'estremità della prima piastrella per rendere l'unità più grande o più piccola.",
    hintCompare: "Le due strisce misurano lo stesso oggetto. Perché i numeri sono diversi?",
    hintOver: "Quest'unità non ci sta un numero intero di volte: l'ultimo pezzo avanza.",
    fitBtn: "Togli l'avanzo",
    matchBtn: "Stessa unità",
    newObjBtn: "Un altro oggetto",
    printBtn: "Stampa il tavolo",
    gateLine: "Lo scaffale completo degli oggetti e la stampa fanno parte del piano Insegnante.",
    unlock: "Il piano Insegnante",
    benchLabel: "il tavolo",
    objectAria: "l'oggetto da misurare",
    tapeAria: "striscia {i}",
    handleAria: "l'unità della striscia {i} — trascina per cambiarne la grandezza",
    countAria: "striscia {i}: contiene {n}",
    overAria: "e un pezzo che avanza"
  },

  /* renamed "De Rekbare Maat" — maat is the everyday Dutch word for a
     unit's SIZE without naming a unit. het blad, never de tafel (in
     groep 3/4 "de tafels" ARE the times tables). "passen" over
     "uitkomen", which can be heard as coming out RIGHT — a verdict. */
  nl: {
    title: "De Rekbare Maat",
    instruction: "Twee stroken, één voorwerp. Rek de maat van één strook uit en kijk hoe het getal verandert — het voorwerp en de andere strook blijven precies waar ze zijn.",
    hintStretch: "Sleep aan het einde van het eerste blokje om de maat groter of kleiner te maken.",
    hintCompare: "Beide stroken meten hetzelfde voorwerp. Waarom staan er verschillende getallen?",
    hintOver: "Deze maat past niet een heel aantal keer. Het laatste stukje blijft over.",
    fitBtn: "Precies laten passen",
    matchBtn: "Zelfde maat op beide",
    newObjBtn: "Ander voorwerp",
    printBtn: "Blad afdrukken",
    gateLine: "Alle voorwerpen en het afdrukken horen bij het Leerkracht-pakket.",
    unlock: "Bekijk het Leerkracht-pakket",
    benchLabel: "het blad",
    objectAria: "het voorwerp dat gemeten wordt",
    tapeAria: "strook {i}",
    handleAria: "de maat op strook {i} — sleep om te vergroten of te verkleinen",
    countAria: "strook {i} bevat {n}",
    overAria: "en er blijft een stukje over"
  },

  /* renamed "Enhetsremsan". måttband and linjal were both refused —
     each presupposes named, fixed units, which is what this tool
     denies. "går jämnt upp" is the standard grundskola phrase. */
  sv: {
    title: "Enhetsremsan",
    instruction: "Två remsor, ett föremål. Dra i en remsas enhet och se hur talet ändras – medan föremålet och den andra remsan står kvar precis som de är.",
    hintStretch: "Dra i kanten på den första biten – då blir enheten större eller mindre.",
    hintCompare: "Remsorna mäter samma föremål. Varför blir talen olika?",
    hintOver: "Den enheten går inte jämnt upp. Det blir en bit över.",
    fitBtn: "Så det går jämnt upp",
    matchBtn: "Samma enhet på båda",
    newObjBtn: "Ett annat föremål",
    printBtn: "Skriv ut bänken",
    gateLine: "Hela föremålshyllan och utskrifterna ingår i Lärarpaketet.",
    unlock: "Se Lärarpaketet",
    benchLabel: "bänken",
    objectAria: "föremålet som mäts",
    tapeAria: "remsa {i}",
    handleAria: "enheten på remsa {i} – dra för att ändra storlek",
    countAria: "remsa {i} visar {n}",
    overAria: "och en bit över"
  },

  /* renamed "Strækbåndet" — målebånd was refused because a real tape
     measure carries printed centimetres, smuggling a named unit back in
     through the picture. bordet, not bænk (which reads as seating). */
  da: {
    title: "Strækbåndet",
    instruction: "To bånd, én genstand. Stræk enheden på det ene bånd, og se tallet ændre sig – mens genstanden og det andet bånd ligger helt stille.",
    hintStretch: "Træk i kanten af den første brik for at gøre enheden større eller mindre.",
    hintCompare: "De to bånd måler den samme genstand. Hvorfor er tallene forskellige?",
    hintOver: "Den enhed går ikke op. Det sidste stykke bliver til overs.",
    fitBtn: "Få det til at gå op",
    matchBtn: "Samme enhed på begge",
    newObjBtn: "Ny genstand",
    printBtn: "Udskriv bordet",
    gateLine: "Hele hylden med genstande og udskrivning er en del af Lærerabonnementet.",
    unlock: "Se Lærerabonnementet",
    benchLabel: "bordet",
    objectAria: "genstanden, der måles",
    tapeAria: "bånd {i}",
    handleAria: "enheden på bånd {i} – træk for at ændre størrelsen",
    countAria: "bånd {i} rummer {n}",
    overAria: "og et stykke til overs"
  },

  /* renamed "Strekkbåndet", målebånd refused for the same reason as da.
     Tiles are "biter", not "ruter" — they are not squares. */
  no: {
    title: "Strekkbåndet",
    instruction: "To bånd, én gjenstand. Strekk enheten på det ene båndet og se hvordan tallet endrer seg – mens gjenstanden og det andre båndet står helt i ro.",
    hintStretch: "Dra i enden av den første biten for å gjøre enheten større eller mindre.",
    hintCompare: "Begge båndene måler den samme gjenstanden. Hvorfor er tallene forskjellige?",
    hintOver: "Denne enheten går ikke opp. Den siste biten blir til overs.",
    fitBtn: "Få det til å gå opp",
    matchBtn: "Samme enhet på begge",
    newObjBtn: "Ny gjenstand",
    printBtn: "Skriv ut benken",
    gateLine: "Hele hylla med gjenstander og utskrift er en del av Lærerabonnementet.",
    unlock: "Se Lærerabonnementet",
    benchLabel: "benken",
    objectAria: "gjenstanden som måles",
    tapeAria: "bånd {i}",
    handleAria: "enheten på bånd {i} – dra for å endre størrelse",
    countAria: "bånd {i} rommer {n}",
    overAria: "og en bit til overs"
  },

  /* ⭐ BOTH PLACEHOLDERS SIT IMMEDIATELY AFTER A NOMINATIVE NOUN
     ("nauha {i}", "luku {n}") so the bare numeral never has to inflect
     and never governs a following noun. The obvious "{n} palaa" breaks
     at n = 1 — "1 palaa" is ungrammatical — which is the Finnish case
     trap this platform keeps paying for, caught here before it shipped.
     mittauspöytä, not penkki, which reads as a seat. */
  fi: {
    title: "Venyvä yksikkö",
    instruction: "Kaksi nauhaa, yksi esine. Venytä toisen nauhan yksikköä ja katso, miten sen luku muuttuu – esine ja toinen nauha pysyvät paikoillaan.",
    hintStretch: "Vedä ensimmäisen palan reunasta: yksikkö suurenee tai pienenee.",
    hintCompare: "Molemmat nauhat mittaavat samaa esinettä. Miksi luvut ovat erilaiset?",
    hintOver: "Tämä yksikkö ei mahdu tasan. Viimeinen pala jää yli.",
    fitBtn: "Tasan menevä yksikkö",
    matchBtn: "Yhtä suuret yksiköt",
    newObjBtn: "Toinen esine",
    printBtn: "Tulosta mittauspöytä",
    gateLine: "Koko esinevalikoima ja tulostus kuuluvat Opettaja-tilaukseen.",
    unlock: "Tutustu Opettaja-tilaukseen",
    benchLabel: "mittauspöytä",
    objectAria: "mitattava esine",
    tapeAria: "nauha {i}",
    handleAria: "nauha {i}: yksikkö – vedä ja muuta kokoa",
    countAria: "nauha {i}: luku {n}",
    overAria: "ja yksi pala jää yli"
  }
};
