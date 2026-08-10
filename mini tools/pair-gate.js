/* =====================================================================
   TOOL #53 — THE PAIR GATE
   =====================================================================
   A parade of marchers, an archway wide enough for exactly N of them,
   and a yard on the far side. The class predicts whether everybody will
   get through; only then does the bar lift. Ranks are called one at a
   time, and when fewer than N are left, THE ARCHWAY REFUSES. What is
   left standing is not marked in any way — instead the EMPTY SEAT beside
   it is drawn, which is the whole difference between "left over" and
   "wrong".

   ⭐⭐ THEN THE THEOREM. A second parade arrives from below. Both
   leftovers step onto THE SILL — a plate exactly as wide as the archway
   and as every rank plate, drawn from the first frame. A full plate is a
   rank, and a rank goes through. Odd + odd = even, and the child watched
   the reason rather than the result.

   ⚖️ THE FENCE RETURNED "NOTHING SURVIVES", AND SO DID THE v4 REJECTED
   LIST TWO YEARS EARLIER. Both are recorded here rather than answered.
   `docs/claude-md/premium-tools-v4.md:678` already refused this idea by
   name — "The Pairing Rail … odd/even is a UNIT, NOT A YEAR (gate 2),
   and the repertoire tops out around 30" — and the fence found the
   shelf-life objection was the LESSER one:
   - ⭐⭐ `lids.js` (#39) IS the N-abreast gate with a different skin.
     MIN_LIDS 2, MAX_LIDS 4, `Math.floor(s.n / k)`, and its own docblock:
     "THE REMAINDER IS HONEST… it stays on the table and is the most
     interesting thing on it." My escape from the rejection was built.
   - ⭐ Printable K-016 already ships the pairing WITH the visible loner
     in eleven languages — "two-column pairing layout makes the leftover
     visible", `data-lcs-leftover="1"`. So the pitch's claim that
     "nothing anywhere animates the pairing" is FALSE on two surfaces and
     true only of the word "animates".
   - `compare-balance-core` owns child-made 1:1 pairing whose leftover IS
     the answer; 2.OA.C.3 is choice-board's, in eleven locales.
   ⚠ #47's rule binds: redefining the deliverable is the operator's call.
   The objections are on the record and the tool is built around what
   they actually showed.

   ⚠⚠ AND THE PRODUCT NAME IS BROKEN TWICE, WHICH IS WHY NO PART IS
   NAMED FOR IT.
   - `gate` is this platform's PAYWALL WORD: fifty-one tools ship
     `gateTitle`/`gateBody`/`gateCta` string keys. A part called the gate
     would be named after the thing that sells the subscription.
   - ⭐⭐ `pair` LITERALLY MEANS "EVEN" IN FRENCH — `choice-board-
     activity.js:142` ships "Ce nombre est-il pair ou impair ?" — and es
     `par`, pt `par`, it `pari` the same. The product name is the ANSWER,
     in four of the eleven languages, in a tool whose question is
     odd-or-even. The English product name is the operator's and stays;
     every locale names the apparatus for the archway instead, and no
     part is called a pair or a gate in any language.
   Also taken: `counter` (lids, all 11), `leftover` (lids' hintLeftover
   ×11), `file` (arrow-strip's FRENCH NAME), `door` (number-hotel),
   `queue`/`rank`/`line-up` (all mean ROW in the Romance and Germanic
   banks). PARTS: THE ARCHWAY · THE PARADE · THE MARCHERS · THE SILL.

   ⚠⚠ "LONER" MEASURED FREE IN ALL ELEVEN AND IS STILL FORBIDDEN.
   Naming the part delivers the verdict the drawing exists to remove. A
   marcher left standing is byte-identical to every other marcher; what
   is drawn is THE EMPTY SEAT BESIDE IT, dashed, in muted `#7A6A55` at
   4.38:1. There is no red and no green in this palette, deliberately —
   so nothing about being left over may look like being wrong.

   ⚠ THE CUTSCENE IS KILLED STRUCTURALLY, not by adding a button.
   The bar is DOWN until the class commits a prediction, so the first
   thing that happens is a judgement rather than an animation; the child
   then calls ONE RANK AT A TIME; and nothing is ever dragged (#41's
   flag scored DEAD on all nine liveness paths, and dragging would also
   collide with `compare-balance-core`'s dragged pairing).
   ⭐ The prediction control would otherwise be #39's consequence-free
   furniture — a control whose only output is its own highlight. Its
   consequence is in ANOTHER element: the bar lifts.

   ⚠ AND THE ART PANEL FOUND TWO DEFECTS WIDER THAN THIS TOOL, recorded
   here because they are worth more than this file:
   - ⭐⭐ `#1E8FD4` on the working surface `#F6EAD3` measures 2.97:1 — the
     palette's own FOCUS colour fails the 3:1 non-text floor on the
     palette's own working surface, almost certainly repo-wide.
   - ⭐ `K-016-odd-or-even-pairs.js:63` draws its leftover in 2.5px
     dashed `#F2784B` = 2.52:1. The one mark carrying that sheet's whole
     point is the least visible thing on it.
   - `#E7DCC8` is 1.23:1 on cream and can never be a load-bearing
     boundary in any tool.

   FREE   the whole apparatus: every width, every rank, the refusal, and
          the sill.
   PAID   the paper parade to cut out and line up.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* ⚠ CAP IS ARITHMETIC, NOT TASTE. The art panel derived it: at a
       row pitch of 82 and a column pitch of 112 in a 1000x1180 field,
       twenty marchers are 18.4px across with a 5.9px row gap at a 320px
       card, and an eleventh row breaks the thumbnail's aspect. The 34px
       canvas floor is a TAP floor and does not bind here, because
       marchers are not tap targets (the #48 ruling).
       ⚠⚠ AND THE FIVE viewBox CONSTANTS THAT DERIVED IT ARE NOT KEPT.
       I declared ROW_PITCH, COL_PITCH, MARCHER, VB_W and VB_H from the
       panel's spec and then built the apparatus in CSS flex rather than
       SVG, so nothing ever read them. That is precisely the
       `exchange-machine` ceremony — five constants no call site reaches,
       made to look shipped by the named-constants convention — and the
       dead-constant law caught all five. The DERIVATION belongs in this
       comment; only the number that is used belongs in the object. */
    CAP: 20,
    MIN_N: 2,
    MAX_N: 5,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips. */
    T_RANK: 420,
    T_BAR: 380,
    T_REFUSE: 200,
    /* ⚠⚠ THE SILL BEAT does NOT pass through _dur(): a wait is not
       movement, and the class must see two leftovers standing on one
       plate BEFORE it becomes a rank, or the theorem reads as a trick. */
    T_SILL: 800,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_CALL: 620,
    SND_THROUGH: 780,
    SND_BAR: 520,
    SND_SILL: 880,
    SND_REFUSE: 300,
    SND_DEBOUNCE: 160
  };

  var PairGate = {

    id: 'pair-gate',

    strings: {
      title: {
        en: 'The Pair Gate',
        de: 'Der Rundbogen',
        fr: 'L’arche',
        es: 'El pórtico',
        pt: 'O pórtico',
        it: 'L’arcata',
        nl: 'De doorgang',
        sv: 'Valvet',
        da: 'Hvælvingen',
        no: 'Hvelvingen',
        fi: 'Holvi'
      },
      instruction: {
        en: 'The archway takes exactly this many abreast. Say first whether everybody will get through, then call them forward a rank at a time and find out.',
        de: 'Der Rundbogen lässt genau so viele nebeneinander durch. Sagt zuerst, ob alle durchkommen, und ruft sie dann nach vorn — immer so viele auf einmal — und seht nach.',
        fr: 'L’arche laisse passer exactement ce nombre-là de front. Dites d’abord si tout le monde passera, puis appelez-les en avant, autant à la fois, et voyez.',
        es: 'El pórtico deja pasar exactamente a esta cantidad juntos. Digan primero si pasarán todos y luego llámenlos hacia delante, tantos cada vez, y compruébenlo.',
        pt: 'O pórtico deixa passar exatamente esta quantidade lado a lado. Digam primeiro se todos vão passar e depois chamem-nos para a frente, tantos por vez, e confiram.',
        it: 'L’arcata lascia passare esattamente questo numero di persone affiancate. Dite prima se passeranno tutti, poi chiamateli avanti, tanti alla volta, e vedete.',
        nl: 'De doorgang laat er precies zoveel naast elkaar door. Zeg eerst of iedereen erdoor komt, roep ze dan naar voren, steeds zoveel tegelijk, en kijk wat er gebeurt.',
        sv: 'Valvet släpper igenom precis så många i bredd. Säg först om alla kommer igenom, ropa dem sedan fram, så många åt gången, och se efter.',
        da: 'Hvælvingen lukker præcis så mange igennem ved siden af hinanden. Sig først, om alle kommer igennem, kald dem så frem, så mange ad gangen, og se efter.',
        no: 'Hvelvingen slipper gjennom nøyaktig så mange ved siden av hverandre. Si først om alle kommer gjennom, rop dem så fram, så mange om gangen, og se etter.',
        fi: 'Holvista mahtuu kerralla juuri näin monta rinnakkain. Sanokaa ensin, pääsevätkö kaikki läpi, ja kutsukaa heidät sitten eteen, näin monta kerrallaan, ja katsokaa.'
      },

      ariaYard: {

        en: 'The parade waiting, the archway, and the yard beyond it.',

        de: 'Der wartende Umzug, der Rundbogen und der Hof dahinter.',

        fr: 'Le défilé qui attend, l’arche, et la cour au-delà.',

        es: 'El desfile esperando, el pórtico y el patio del otro lado.',

        pt: 'O desfile esperando, o pórtico e o pátio do outro lado.',

        it: 'La sfilata che aspetta, l’arcata e il cortile oltre.',

        nl: 'De optocht die wacht, de doorgang en het plein erachter.',

        sv: 'Paraden som väntar, valvet och gården bakom.',

        da: 'Optoget der venter, hvælvingen og gården bagved.',

        no: 'Opptoget som venter, hvelvingen og gården bak.',

        fi: 'Odottava kulkue, holvi ja piha sen takana.'

      },
      ariaWaiting: {
        en: '{n} still waiting',
        de: '{n} warten noch',
        fr: '{n} attendent encore',
        es: '{n} siguen esperando',
        pt: '{n} ainda esperando',
        it: '{n} aspettano ancora',
        nl: '{n} wachten nog',
        sv: '{n} väntar fortfarande',
        da: '{n} venter stadig',
        no: '{n} venter fortsatt',
        fi: '{n} odottaa vielä'
      },
      ariaThrough: {
        en: '{n} through, in {r} ranks',
        de: '{n} durch, {r} mal nebeneinander',
        fr: '{n} passés, en {r} appels',
        es: '{n} han pasado, en {r} llamadas',
        pt: '{n} passaram, em {r} chamadas',
        it: '{n} passati, in {r} chiamate',
        nl: '{n} erdoor, in {r} keer',
        sv: '{n} igenom, på {r} rop',
        da: '{n} igennem, på {r} kald',
        no: '{n} gjennom, på {r} rop',
        fi: '{n} läpi, kutsuja {r}'
      },
      /* ⚠⚠ A TALLY, NOT A PHRASE — and this is the THIRD generation of
         the same defect in this tool. '{e} empty places' renders '1 empty
         placeS' at two abreast, which is the DEFAULT width, so the
         commonest state read wrong. Nine locales force the same
         agreement (de '1 leere Plätze', sv '1 tomma platser'), so all
         nine use this shape; Finnish alone keeps the natural phrase,
         because its partitive singular after a numeral is right at 1 as
         well as at 4. */
      ariaStand: {
        en: '{n} left standing. Empty places beside them: {e}',
        de: '{n} bleiben stehen, leere Plätze daneben: {e}',
        fr: '{n} restent debout, places vides à côté : {e}',
        es: '{n} se quedan de pie, lugares vacíos al lado: {e}',
        pt: '{n} ficam de pé, lugares vazios ao lado: {e}',
        it: '{n} restano in piedi, spazi vuoti accanto: {e}',
        nl: '{n} blijven staan, lege plekken ernaast: {e}',
        sv: '{n} blir stående, tomma platser bredvid: {e}',
        da: '{n} bliver stående, tomme pladser ved siden af: {e}',
        no: '{n} blir stående, tomme plasser ved siden av: {e}',
        fi: '{n} jää seisomaan, vieressä {e} tyhjää paikkaa'
      },
      ariaSill: {
        en: 'the sill, as wide as the archway',
        de: 'der Sims, so breit wie der Rundbogen',
        fr: 'le seuil, aussi large que l’arche',
        es: 'el umbral, tan ancho como el pórtico',
        pt: 'a soleira, tão larga quanto o pórtico',
        it: 'la soglia, larga quanto l’arcata',
        nl: 'de drempel, zo breed als de doorgang',
        sv: 'tröskeln, lika bred som valvet',
        da: 'tærsklen, lige så bred som hvælvingen',
        no: 'terskelen, like bred som hvelvingen',
        fi: 'kynnys, yhtä leveä kuin holvi'
      },

      setN: {

        en: 'How many abreast',

        de: 'Wie viele nebeneinander',

        fr: 'Combien de front',

        es: 'Cuántos juntos',

        pt: 'Quantos lado a lado',

        it: 'Quanti affiancati',

        nl: 'Hoeveel naast elkaar',

        sv: 'Hur många i bredd',

        da: 'Hvor mange ved siden af hinanden',

        no: 'Hvor mange ved siden av hverandre',

        fi: 'Montako rinnakkain'

      },
      n2: {
        en: 'two',
        de: 'zwei',
        fr: 'deux',
        es: 'dos',
        pt: 'dois',
        it: 'due',
        nl: 'twee',
        sv: 'två',
        da: 'to',
        no: 'to',
        fi: 'kaksi'
      },
      n3: {
        en: 'three',
        de: 'drei',
        fr: 'trois',
        es: 'tres',
        pt: 'três',
        it: 'tre',
        nl: 'drie',
        sv: 'tre',
        da: 'tre',
        no: 'tre',
        fi: 'kolme'
      },
      n4: {
        en: 'four',
        de: 'vier',
        fr: 'quatre',
        es: 'cuatro',
        pt: 'quatro',
        it: 'quattro',
        nl: 'vier',
        sv: 'fyra',
        da: 'fire',
        no: 'fire',
        fi: 'neljä'
      },
      n5: {
        en: 'five',
        de: 'fünf',
        fr: 'cinq',
        es: 'cinco',
        pt: 'cinco',
        it: 'cinque',
        nl: 'vijf',
        sv: 'fem',
        da: 'fem',
        no: 'fem',
        fi: 'viisi'
      },

      predYes: {

        en: 'Everybody will get through',

        de: 'Alle kommen durch',

        fr: 'Tout le monde passera',

        es: 'Pasarán todos',

        pt: 'Todos vão passar',

        it: 'Passeranno tutti',

        nl: 'Iedereen komt erdoor',

        sv: 'Alla kommer igenom',

        da: 'Alle kommer igennem',

        no: 'Alle kommer gjennom',

        fi: 'Kaikki pääsevät läpi'

      },
      predNo: {
        en: 'Somebody will be left standing',
        de: 'Jemand bleibt stehen',
        fr: 'Quelqu’un restera debout',
        es: 'Alguien se quedará de pie',
        pt: 'Alguém vai ficar de pé',
        it: 'Qualcuno resterà in piedi',
        nl: 'Er blijft iemand staan',
        sv: 'Någon blir stående',
        da: 'Nogen bliver stående',
        no: 'Noen blir stående',
        fi: 'Joku jää seisomaan'
      },
      call: {
        en: 'Call the next rank forward',
        de: 'Die Nächsten nach vorn rufen',
        fr: 'Appeler les suivants en avant',
        es: 'Llamar a los siguientes',
        pt: 'Chamar os próximos',
        it: 'Chiamare avanti i prossimi',
        nl: 'De volgenden naar voren roepen',
        sv: 'Ropa fram de nästa',
        da: 'Kald de næste frem',
        no: 'Rop fram de neste',
        fi: 'Kutsu seuraavat eteen'
      },
      second: {
        en: 'Bring the second parade',
        de: 'Den zweiten Umzug holen',
        fr: 'Faire venir le second défilé',
        es: 'Traer el segundo desfile',
        pt: 'Trazer o segundo desfile',
        it: 'Far arrivare la seconda sfilata',
        nl: 'De tweede optocht halen',
        sv: 'Hämta den andra paraden',
        da: 'Hent det andet optog',
        no: 'Hent det andre opptoget',
        fi: 'Hae toinen kulkue'
      },
      sill: {
        en: 'Put them both on the sill',
        de: 'Beide auf den Sims stellen',
        fr: 'Les mettre tous les deux sur le seuil',
        es: 'Poner a los dos en el umbral',
        pt: 'Colocar os dois na soleira',
        it: 'Metterli tutti e due sulla soglia',
        nl: 'Ze allebei op de drempel zetten',
        sv: 'Ställ båda på tröskeln',
        da: 'Stil dem begge på tærsklen',
        no: 'Sett dem begge på terskelen',
        fi: 'Aseta molemmat kynnykselle'
      },
      again: {
        en: 'A new parade',
        de: 'Ein neuer Umzug',
        fr: 'Un nouveau défilé',
        es: 'Un desfile nuevo',
        pt: 'Um desfile novo',
        it: 'Una nuova sfilata',
        nl: 'Een nieuwe optocht',
        sv: 'En ny parad',
        da: 'Et nyt optog',
        no: 'Et nytt opptog',
        fi: 'Uusi kulkue'
      },

      saidPredYes: {

        en: 'The class says everybody gets through. The bar is up.',

        de: 'Die Klasse sagt: Alle kommen durch. Die Schranke ist oben.',

        fr: 'La classe dit que tout le monde passera. La barrière est levée.',

        es: 'La clase dice que pasarán todos. La barrera está levantada.',

        pt: 'A turma diz que todos vão passar. A barreira está levantada.',

        it: 'La classe dice che passeranno tutti. La sbarra è alzata.',

        nl: 'De klas zegt dat iedereen erdoor komt. De slagboom staat omhoog.',

        sv: 'Klassen säger att alla kommer igenom. Bommen är uppe.',

        da: 'Klassen siger, at alle kommer igennem. Bommen er oppe.',

        no: 'Klassen sier at alle kommer gjennom. Bommen er oppe.',

        fi: 'Luokka sanoo, että kaikki pääsevät läpi. Puomi on ylhäällä.'

      },
      saidPredNo: {
        en: 'The class says somebody will be left standing. The bar is up.',
        de: 'Die Klasse sagt: Jemand bleibt stehen. Die Schranke ist oben.',
        fr: 'La classe dit que quelqu’un restera debout. La barrière est levée.',
        es: 'La clase dice que alguien se quedará de pie. La barrera está levantada.',
        pt: 'A turma diz que alguém vai ficar de pé. A barreira está levantada.',
        it: 'La classe dice che qualcuno resterà in piedi. La sbarra è alzata.',
        nl: 'De klas zegt dat er iemand blijft staan. De slagboom staat omhoog.',
        sv: 'Klassen säger att någon blir stående. Bommen är uppe.',
        da: 'Klassen siger, at nogen bliver stående. Bommen er oppe.',
        no: 'Klassen sier at noen blir stående. Bommen er oppe.',
        fi: 'Luokka sanoo, että joku jää seisomaan. Puomi on ylhäällä.'
      },
      saidRank: {
        en: '{n} through, {w} still waiting.',
        de: '{n} durch, {w} warten noch.',
        fr: '{n} passés, {w} attendent encore.',
        es: '{n} han pasado, {w} siguen esperando.',
        pt: '{n} passaram, {w} ainda esperando.',
        it: '{n} passati, {w} aspettano ancora.',
        nl: '{n} erdoor, {w} wachten nog.',
        sv: '{n} igenom, {w} väntar fortfarande.',
        da: '{n} igennem, {w} venter stadig.',
        no: '{n} gjennom, {w} venter fortsatt.',
        fi: '{n} läpi, {w} odottaa vielä.'
      },
      saidClear: {
        en: 'All {n} went through, in {r} ranks of {k}. Nobody was left standing.',
        de: 'Alle {n} sind durch — {r} mal {k} nebeneinander. Niemand ist stehen geblieben.',
        fr: 'Les {n} sont tous passés — {r} fois {k} de front. Personne n’est resté debout.',
        es: 'Los {n} pasaron todos — {r} veces {k} juntos. Nadie se quedó de pie.',
        pt: 'Os {n} passaram todos — {r} vezes {k} lado a lado. Ninguém ficou de pé.',
        it: 'Tutti e {n} sono passati — {r} volte {k} affiancati. Nessuno è rimasto in piedi.',
        nl: 'Alle {n} zijn erdoor — {r} keer {k} naast elkaar. Niemand bleef staan.',
        sv: 'Alla {n} kom igenom — {r} gånger {k} i bredd. Ingen blev stående.',
        da: 'Alle {n} kom igennem — {r} gange {k} ved siden af hinanden. Ingen blev stående.',
        no: 'Alle {n} kom gjennom — {r} ganger {k} ved siden av hverandre. Ingen ble stående.',
        fi: 'Kaikki {n} pääsivät läpi — {r} kertaa {k} rinnakkain. Kukaan ei jäänyt seisomaan.'
      },
      /* ⚠ pressing on after a parade that CLEARED used to announce
         saidStand with s=0 — "0 left standing, because 12 does not fill
         a rank of 2" — which contradicts itself, since 12 fills ranks of
         two perfectly. */
      saidAllThrough: {
        en: 'Everybody is already through. Start a new parade.',
        de: 'Alle sind schon durch. Fang einen neuen Umzug an.',
        fr: 'Tout le monde est déjà passé. Commence un nouveau défilé.',
        es: 'Ya pasaron todos. Empieza un desfile nuevo.',
        pt: 'Todos já passaram. Comece um desfile novo.',
        it: 'Sono già passati tutti. Comincia una nuova sfilata.',
        nl: 'Iedereen is er al door. Begin een nieuwe optocht.',
        sv: 'Alla har redan kommit igenom. Börja en ny parad.',
        da: 'Alle er allerede kommet igennem. Start et nyt optog.',
        no: 'Alle har allerede kommet gjennom. Start et nytt opptog.',
        fi: 'Kaikki ovat jo päässeet läpi. Aloita uusi kulkue.'
      },
      saidStand: {
        en: '{s} left standing, because {n} does not fill a rank of {k}. The archway will not take a part-rank.',
        de: '{s} bleiben stehen: {n} lässt sich nicht restlos zu {k} nebeneinander aufteilen. Der Rundbogen nimmt nur volle, nie angefangene.',
        fr: '{s} restent debout : {n} ne tombe pas juste à {k} de front. L’arche ne prend que des complets, jamais des entamés.',
        es: '{s} se quedan de pie: {n} no se reparte exactamente en {k} juntos. El pórtico solo acepta completos, nunca a medias.',
        pt: '{s} ficam de pé: {n} não se divide exatamente em {k} lado a lado. O pórtico só aceita completos, nunca pela metade.',
        it: '{s} restano in piedi: {n} non si divide esattamente in {k} affiancati. L’arcata accetta solo chi è al completo, mai chi è a metà.',
        nl: '{s} blijven staan: {n} gaat niet precies op in {k} naast elkaar. De doorgang neemt alleen volle, nooit halve.',
        sv: '{s} blir stående: {n} går inte jämnt upp i {k} i bredd. Valvet tar bara fulla, aldrig påbörjade.',
        da: '{s} bliver stående: {n} går ikke op i {k} ved siden af hinanden. Hvælvingen tager kun fulde, aldrig halve.',
        no: '{s} blir stående: {n} går ikke opp i {k} ved siden av hverandre. Hvelvingen tar bare fulle, aldri halve.',
        fi: '{s} jää seisomaan: marssijoita on {n}, eikä se jakaudu tasan. Holvista pääsee vain täydet {k} rinnakkain.'
      },
      saidSecond: {
        en: 'A second parade of {n}. It leaves {s} standing too.',
        de: 'Ein zweiter Umzug mit {n}. Auch dort bleiben {s} stehen.',
        fr: 'Un second défilé de {n}. Lui aussi laisse {s} debout.',
        es: 'Un segundo desfile de {n}. También deja a {s} de pie.',
        pt: 'Um segundo desfile de {n}. Ele também deixa {s} de pé.',
        it: 'Una seconda sfilata di {n}. Anche questa lascia {s} in piedi.',
        nl: 'Een tweede optocht van {n}. Daar blijven er ook {s} staan.',
        sv: 'En andra parad på {n}. Även den lämnar {s} stående.',
        da: 'Et andet optog på {n}. Det efterlader også {s} stående.',
        no: 'Et andre opptog på {n}. Det lar også {s} bli stående.',
        fi: 'Toinen kulkue, {n} marssijaa. Siitäkin jää {s} seisomaan.'
      },
      saidSill: {
        en: 'Both of them on the sill — and the sill is a full rank, so it goes through. {a} and {b} together made a number that fills the archway exactly.',
        de: 'Beide auf dem Sims — und der Sims ist voll, also darf er hindurch. {a} und {b} zusammen füllen den Rundbogen genau.',
        fr: 'Tous les deux sur le seuil — et le seuil est complet, donc il passe. {a} et {b} ensemble remplissent l’arche exactement.',
        es: 'Los dos en el umbral — y el umbral está lleno, así que pasa. {a} y {b} juntos llenan el pórtico exactamente.',
        pt: 'Os dois na soleira — e a soleira está cheia, então passa. {a} e {b} juntos enchem o pórtico exatamente.',
        it: 'Tutti e due sulla soglia — e la soglia è piena, quindi passa. {a} e {b} insieme riempiono l’arcata esattamente.',
        nl: 'Allebei op de drempel — en de drempel is vol, dus die mag erdoor. {a} en {b} samen vullen de doorgang precies.',
        sv: 'Båda på tröskeln — och tröskeln är full, så den får gå igenom. {a} och {b} tillsammans fyller valvet precis.',
        da: 'Dem begge på tærsklen — og tærsklen er fuld, så den må komme igennem. {a} og {b} tilsammen fylder hvælvingen præcis.',
        no: 'Begge på terskelen — og terskelen er full, så den får gå gjennom. {a} og {b} til sammen fyller hvelvingen nøyaktig.',
        fi: 'Molemmat kynnyksellä — ja kynnys on täysi, joten se pääsee läpi. {a} ja {b} yhdessä täyttävät holvin tarkalleen.'
      },
      /* ⭐⭐ AND SOMETIMES IT DOES NOT FILL, WHICH IS THE BETTER LESSON.
         At an archway two abreast, two leftovers ALWAYS make a rank —
         that is odd + odd = even. At three abreast, two leftovers of two
         make four, and four does not fill a rank of three. Hand-driving
         the model found saidSill claiming "fills the archway exactly"
         in a case where sillFull() is false: the model knew and the
         sentence lied. The refusal to pretend is what makes the two-case
         special rather than merely typical. */
      saidSillShort: {
        en: '{a} and {b} on the sill make {c} — and {c} still does not fill a rank of {k}, so they wait too. At two abreast two left-behinds always make a rank; at wider archways only sometimes.',
        de: '{a} und {b} auf dem Sims sind {c} — und {c} füllt {k} nebeneinander immer noch nicht, also warten auch sie. Bei zwei nebeneinander geht es jedes Mal auf; bei einem breiteren Rundbogen nur manchmal.',
        fr: '{a} et {b} sur le seuil font {c} — et {c} ne remplit toujours pas {k} de front, alors eux aussi attendent. À deux de front, cela tombe juste à chaque fois ; sous une arche plus large, seulement parfois.',
        es: '{a} y {b} en el umbral son {c} — y {c} sigue sin llenar {k} juntos, así que ellos también esperan. Con dos juntos sale justo todas las veces; con un pórtico más ancho, solo a veces.',
        pt: '{a} e {b} na soleira dão {c} — e {c} ainda não enche {k} lado a lado, então eles também esperam. Com dois lado a lado dá certo todas as vezes; com um pórtico mais largo, só às vezes.',
        it: '{a} e {b} sulla soglia fanno {c} — e {c} non riempie ancora {k} affiancati, quindi aspettano anche loro. Con due affiancati torna ogni volta; sotto un’arcata più larga, solo a volte.',
        nl: '{a} en {b} op de drempel zijn {c} — en {c} vult {k} naast elkaar nog steeds niet, dus zij wachten ook. Bij twee naast elkaar klopt het elke keer; bij een bredere doorgang alleen soms.',
        sv: '{a} och {b} på tröskeln blir {c} — och {c} fyller fortfarande inte {k} i bredd, så de får också vänta. Med två i bredd går det jämnt ut varje gång; med ett bredare valv bara ibland.',
        da: '{a} og {b} på tærsklen bliver {c} — og {c} fylder stadig ikke {k} ved siden af hinanden, så de venter også. Med to ved siden af hinanden går det op hver gang; med en bredere hvælving kun nogle gange.',
        no: '{a} og {b} på terskelen blir {c} — og {c} fyller fortsatt ikke {k} ved siden av hverandre, så de venter også. Med to ved siden av hverandre går det opp hver gang; med en bredere hvelving bare noen ganger.',
        fi: '{a} ja {b} kynnyksellä ovat {c} — eikä {c} täytä holvia, johon mahtuu {k} rinnakkain, joten hekin jäävät odottamaan. Kun rinnakkain mahtuu kaksi, se osuu tasan joka kerta; leveämmässä holvissa vain joskus.'
      },
      saidBarDown: {
        en: 'Say first what the class thinks will happen. The bar goes up when you have.',
        de: 'Sagt zuerst, was ihr glaubt. Dann geht die Schranke hoch.',
        fr: 'Dites d’abord ce que vous pensez. La barrière se lève ensuite.',
        es: 'Digan primero lo que creen. Después se levanta la barrera.',
        pt: 'Digam primeiro o que vocês acham. Depois a barreira sobe.',
        it: 'Dite prima che cosa pensate. Poi la sbarra si alza.',
        nl: 'Zeg eerst wat je denkt. Daarna gaat de slagboom omhoog.',
        sv: 'Säg först vad ni tror. Sedan går bommen upp.',
        da: 'Sig først, hvad I tror. Så går bommen op.',
        no: 'Si først hva dere tror. Så går bommen opp.',
        fi: 'Sanokaa ensin, mitä uskotte. Sitten puomi nousee.'
      },
      /* ⚠ the old text named `a+b===0`, which is reachable in ZERO
         states because bringSecond already guarantees somebody is
         standing. These two are the refusals a child can actually
         cause. */
      saidNoSecond: {
        en: 'Bring the second parade first — the sill is for two lots of left-behinds.',
        de: 'Hol zuerst den zweiten Umzug — auf den Sims kommen die, die aus beiden Umzügen stehen geblieben sind.',
        fr: 'Fais d’abord venir le second défilé — le seuil est pour ceux qui sont restés debout dans les deux défilés.',
        es: 'Trae primero el segundo desfile: al umbral suben los que se quedaron de pie en los dos desfiles.',
        pt: 'Traga primeiro o segundo desfile — na soleira sobem os que ficaram de pé nos dois desfiles.',
        it: 'Fai arrivare prima la seconda sfilata — sulla soglia salgono quelli rimasti in piedi nelle due sfilate.',
        nl: 'Haal eerst de tweede optocht — op de drempel komen wie in allebei de optochten is blijven staan.',
        sv: 'Hämta den andra paraden först — på tröskeln ställer sig de som blev stående i båda paraderna.',
        da: 'Hent først det andet optog — på tærsklen stiller dem, der blev stående i begge optog, sig op.',
        no: 'Hent det andre opptoget først — på terskelen stiller de som ble stående i begge opptogene seg opp.',
        fi: 'Hae ensin toinen kulkue — kynnykselle asettuvat ne, jotka jäivät seisomaan kummastakin kulkueesta.'
      },
      saidOnSill: {
        en: 'They are already on the sill.',
        de: 'Sie stehen schon auf dem Sims.',
        fr: 'Ils sont déjà sur le seuil.',
        es: 'Ya están en el umbral.',
        pt: 'Eles já estão na soleira.',
        it: 'Sono già sulla soglia.',
        nl: 'Ze staan al op de drempel.',
        sv: 'De står redan på tröskeln.',
        da: 'De står allerede på tærsklen.',
        no: 'De står allerede på terskelen.',
        fi: 'He seisovat jo kynnyksellä.'
      },
      saidBusy: {
        en: 'The class has already said what it thinks. Call them forward and find out.',
        de: 'Die Klasse hat sich schon festgelegt. Ruft sie nach vorn und findet es heraus.',
        fr: 'La classe s’est déjà prononcée. Appelez-les en avant et voyez.',
        es: 'La clase ya ha dicho lo que cree. Llámenlos hacia delante y compruébenlo.',
        pt: 'A turma já disse o que acha. Chamem-nos para a frente e confiram.',
        it: 'La classe si è già espressa. Chiamateli avanti e vedete.',
        nl: 'De klas heeft zich al uitgesproken. Roep ze naar voren en kijk wat er gebeurt.',
        sv: 'Klassen har redan sagt sitt. Ropa fram dem och se efter.',
        da: 'Klassen har allerede sagt sit. Kald dem frem, og se efter.',
        no: 'Klassen har allerede sagt sitt. Rop dem fram og se etter.',
        fi: 'Luokka on jo sanonut sanottavansa. Kutsu heidät eteen ja katso.'
      },

      gateTitle: {

        en: 'The paper parade',

        de: 'Der Umzug aus Papier',

        fr: 'Le défilé en papier',

        es: 'El desfile de papel',

        pt: 'O desfile de papel',

        it: 'La sfilata di carta',

        nl: 'De papieren optocht',

        sv: 'Pappersparaden',

        da: 'Papiroptoget',

        no: 'Papiropptoget',

        fi: 'Paperikulkue'

      },
      gateBody: {
        en: 'The whole apparatus is free — every width, every rank, the refusal and the sill. A Teacher plan adds the paper parade to cut out and line up on a desk, so a child can walk the marchers through an archway they cut themselves.',
        de: 'Der ganze Rundbogen ist frei — jede Breite, jeder Aufruf, die Verweigerung und der Sims. Das Lehrkraft-Abo legt den Umzug aus Papier dazu: zum Ausschneiden und Aufstellen auf dem Tisch, damit ein Kind die Marschierenden durch einen selbst geschnittenen Rundbogen schicken kann.',
        fr: 'Toute l’arche est libre — chaque largeur, chaque appel, le refus et le seuil. L’Abonnement Enseignant ajoute le défilé en papier à découper et à aligner sur la table, pour qu’un enfant fasse passer les marcheurs sous une arche qu’il a découpée lui-même.',
        es: 'Todo el pórtico es gratis: cada anchura, cada llamada, el rechazo y el umbral. El Plan Docente añade el desfile de papel para recortar y alinear sobre la mesa, para que un niño haga pasar a los desfilantes por un pórtico recortado por él mismo.',
        pt: 'O pórtico inteiro é gratuito: cada largura, cada chamada, a recusa e a soleira. O Plano Professor acrescenta o desfile de papel para recortar e alinhar sobre a mesa, para que a criança faça os desfilantes passarem por um pórtico recortado por ela mesma.',
        it: 'Tutta l’arcata è gratuita: ogni larghezza, ogni chiamata, il rifiuto e la soglia. Il Piano Insegnante aggiunge la sfilata di carta da ritagliare e allineare sul tavolo, così un bambino può far passare i marciatori sotto un’arcata ritagliata da lui.',
        nl: 'De hele doorgang is gratis: elke breedte, elke oproep, de weigering en de drempel. Het Leerkracht-abonnement voegt de papieren optocht toe om uit te knippen en op tafel te zetten, zodat een kind de lopers door een zelfgeknipte doorgang kan sturen.',
        sv: 'Hela valvet är gratis: varje bredd, varje rop, vägran och tröskeln. Lärarplanen lägger till pappersparaden att klippa ut och ställa upp på bordet, så att ett barn kan skicka marscherarna genom ett valv som det klippt själv.',
        da: 'Hele hvælvingen er gratis: hver bredde, hvert kald, afvisningen og tærsklen. Lærerabonnementet lægger papiroptoget til, som klippes ud og stilles op på bordet, så et barn kan sende de marcherende gennem en hvælving, det selv har klippet.',
        no: 'Hele hvelvingen er gratis: hver bredde, hvert rop, avvisningen og terskelen. Lærerabonnementet legger til papiropptoget som klippes ut og stilles opp på bordet, slik at et barn kan sende de marsjerende gjennom en hvelving det har klippet selv.',
        fi: 'Koko holvi on ilmainen: jokainen leveys, jokainen kutsu, torjuminen ja kynnys. Opettajatilaus tuo lisäksi paperikulkueen, jonka voi leikata irti ja asettaa pöydälle, niin lapsi voi kuljettaa marssijat itse leikkaamansa holvin läpi.'
      },
      gateCta: {
        en: 'See the Teacher plan',
        de: 'Lehrkraft-Abo ansehen',
        fr: 'Voir l’Abonnement Enseignant',
        es: 'Ver el Plan Docente',
        pt: 'Ver o Plano Professor',
        it: 'Vedi il Piano Insegnante',
        nl: 'Bekijk het Leerkracht-abonnement',
        sv: 'Se Lärarplanen',
        da: 'Se Lærerabonnementet',
        no: 'Se Lærerabonnementet',
        fi: 'Katso Opettajatilaus'
      },
      gateClose: {
        en: 'Not now',
        de: 'Jetzt nicht',
        fr: 'Pas maintenant',
        es: 'Ahora no',
        pt: 'Agora não',
        it: 'Non ora',
        nl: 'Nu niet',
        sv: 'Inte nu',
        da: 'Ikke nu',
        no: 'Ikke nå',
        fi: 'Ei nyt'
      },

      printBtn: {

        en: 'Print the paper parade',

        de: 'Den Umzug aus Papier drucken',

        fr: 'Imprimer le défilé en papier',

        es: 'Imprimir el desfile de papel',

        pt: 'Imprimir o desfile de papel',

        it: 'Stampa la sfilata di carta',

        nl: 'De papieren optocht afdrukken',

        sv: 'Skriv ut pappersparaden',

        da: 'Udskriv papiroptoget',

        no: 'Skriv ut papiropptoget',

        fi: 'Tulosta paperikulkue'

      },
      sheetTitle: {
        en: 'Paper parade to cut out',
        de: 'Umzug aus Papier zum Ausschneiden',
        fr: 'Défilé en papier à découper',
        es: 'Desfile de papel para recortar',
        pt: 'Desfile de papel para recortar',
        it: 'Sfilata di carta da ritagliare',
        nl: 'Papieren optocht om uit te knippen',
        sv: 'Pappersparad att klippa ut',
        da: 'Papiroptog til at klippe ud',
        no: 'Papiropptog til å klippe ut',
        fi: 'Paperikulkue leikattavaksi'
      },
      sheetNote: {
        en: 'Cut out the marchers and the archway. Line the marchers up and send them through in ranks. When too few are left to fill the archway, leave them standing and draw the empty place beside them — that empty place is what the number is telling you.',
        de: 'Schneide die Marschierenden und den Rundbogen aus. Stell die Marschierenden hintereinander auf und schick sie hindurch, immer so viele nebeneinander. Wenn zu wenige da sind, um den Rundbogen zu füllen, lass sie stehen und male die leeren Plätze daneben — diese leeren Plätze sind das, was die Zahl dir sagt.',
        fr: 'Découpe les marcheurs et l’arche. Aligne les marcheurs les uns derrière les autres et fais-les passer, autant de front à chaque fois. Quand il n’en reste pas assez pour remplir l’arche, laisse-les debout et dessine les places vides à côté — ces places vides sont ce que le nombre te dit.',
        es: 'Recorta a los desfilantes y el pórtico. Colócalos uno detrás de otro y hazlos pasar, tantos juntos cada vez. Cuando queden muy pocos para llenar el pórtico, déjalos de pie y dibuja los lugares vacíos a su lado: esos lugares vacíos son lo que el número te está diciendo.',
        pt: 'Recorte os desfilantes e o pórtico. Coloque-os um atrás do outro e faça-os passar, tantos lado a lado por vez. Quando sobrarem poucos demais para encher o pórtico, deixe-os de pé e desenhe os lugares vazios ao lado deles — esses lugares vazios são o que o número está dizendo.',
        it: 'Ritaglia i marciatori e l’arcata. Mettili uno dietro l’altro e falli passare, tanti affiancati per volta. Quando ne restano troppo pochi per riempire l’arcata, lasciali in piedi e disegna accanto gli spazi vuoti: quegli spazi vuoti sono ciò che il numero ti sta dicendo.',
        nl: 'Knip de lopers en de doorgang uit. Zet de lopers achter elkaar en stuur ze erdoor, steeds zoveel naast elkaar. Als er te weinig zijn om de doorgang te vullen, laat ze dan staan en teken de lege plekken ernaast — die lege plekken zijn wat het getal je vertelt.',
        sv: 'Klipp ut marscherarna och valvet. Ställ upp marscherarna efter varandra och skicka igenom dem, så många i bredd åt gången. När det blir för få kvar för att fylla valvet, låt dem stå och rita de tomma platserna bredvid — de tomma platserna är det som talet säger dig.',
        da: 'Klip de marcherende og hvælvingen ud. Stil de marcherende op efter hinanden og send dem igennem, så mange ved siden af hinanden ad gangen. Når der er for få tilbage til at fylde hvælvingen, så lad dem stå og tegn de tomme pladser ved siden af — de tomme pladser er det, tallet fortæller dig.',
        no: 'Klipp ut de marsjerende og hvelvingen. Still de marsjerende opp etter hverandre og send dem gjennom, så mange ved siden av hverandre om gangen. Når det er for få igjen til å fylle hvelvingen, la dem bli stående og tegn de tomme plassene ved siden av — de tomme plassene er det tallet forteller deg.',
        fi: 'Leikkaa marssijat ja holvi irti. Aseta marssijat peräkkäin ja kuljeta heidät läpi, näin monta rinnakkain kerrallaan. Kun jäljellä on liian vähän täyttämään holvia, jätä heidät seisomaan ja piirrä tyhjät paikat heidän viereensä — nuo tyhjät paikat kertovat, mitä luku sanoo.'
      }
    },

    settings: [
      { key: 'n', type: 'choice', labelKey: 'setN', options: [
        { value: '2', labelKey: 'n2' }, { value: '3', labelKey: 'n3' },
        { value: '4', labelKey: 'n4' }, { value: '5', labelKey: 'n5' }
      ] }
    ],
    defaults: { n: '2' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM: `through` is derived from `ranks`, never stored beside it,
       so "seven through in three ranks of two" is not a state any
       sequence of presses can produce.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. */

    newState: function (n, total) {
      var k = Math.max(GEO.MIN_N, Math.min(GEO.MAX_N, parseInt(n, 10) || 2));
      var t = Math.max(1, Math.min(GEO.CAP, total || 7));
      return {
        k: k, total: t, ranks: 0,
        pred: null,            /* null | true | false — the class's call */
        second: null,          /* the second parade's total, once brought */
        onSill: 0              /* how many leftovers are standing on the sill */
      };
    },

    _st: function (st) { return st || this.st; },

    /* everything below is DERIVED from ranks, so nothing can disagree */
    through: function (st) { var s = this._st(st); return s.ranks * s.k; },
    waiting: function (st) { var s = this._st(st); return s.total - this.through(s); },
    /* how many will be left standing when the parade can go no further */
    standing: function (st) { var s = this._st(st); return s.total % s.k; },
    done: function (st) { return this.waiting(st) < this._st(st).k; },
    fullRanks: function (st) { var s = this._st(st); return Math.floor(s.total / s.k); },

    /* ---- the moves ------------------------------------------------ */

    /* ⭐ THE PREDICTION IS THE GATE-CONDITION. The bar is down until the
       class commits, so the first thing that happens is a judgement and
       not an animation. And this control is not furniture: its
       consequence is in ANOTHER element — the bar lifts. */
    predict: function (st, yes) {
      var s = this._st(st);
      if (s.pred !== null) return null;
      if (yes !== true && yes !== false) return null;
      return { k: s.k, total: s.total, ranks: 0, pred: yes, second: s.second, onSill: s.onSill };
    },

    barUp: function (st) { return this._st(st).pred !== null; },

    /* call the next rank. ⚠ THE ARCHWAY REFUSES a part-rank — that
       refusal IS the lesson, and the child may press for ever without
       anything calling them wrong. */
    sendRank: function (st) {
      var s = this._st(st);
      if (s.pred === null) return null;
      if (this.waiting(s) < s.k) return null;
      return { k: s.k, total: s.total, ranks: s.ranks + 1, pred: s.pred, second: s.second, onSill: s.onSill };
    },

    /* the second parade, only once the first has gone as far as it can
       and has actually left somebody standing */
    bringSecond: function (st, total) {
      var s = this._st(st);
      if (!this.done(s)) return null;
      if (this.standing(s) === 0) return null;
      if (s.second !== null) return null;
      var t = Math.max(1, Math.min(GEO.CAP, total));
      if (t % s.k === 0) return null;          /* it must leave one too */
      return { k: s.k, total: s.total, ranks: s.ranks, pred: s.pred, second: t, onSill: 0 };
    },

    secondStanding: function (st) {
      var s = this._st(st);
      return s.second === null ? 0 : s.second % s.k;
    },

    /* ⭐⭐ THE SILL. Both leftovers step onto one plate, and the plate is
       exactly as wide as the archway. A full plate is a rank. */
    toSill: function (st) {
      var s = this._st(st);
      if (s.second === null) return null;
      if (s.onSill !== 0) return null;
      var a = this.standing(s), b = this.secondStanding(s);
      if (a + b === 0) return null;
      return { k: s.k, total: s.total, ranks: s.ranks, pred: s.pred, second: s.second, onSill: a + b };
    },

    /* does what is on the sill fill the archway exactly? */
    sillFull: function (st) {
      var s = this._st(st);
      return s.onSill > 0 && s.onSill % s.k === 0;
    },

    /* ⚠⚠ THERE IS NO setWidth, AND THAT IS THE FIX. One shipped here
       with the docblock's proudest guard in it — "the width cannot
       change mid-parade, reflowing marchers who already went through as
       pairs into ranks of three would be a lie about what happened" —
       and it had ZERO CALL SITES, so the invariant it announced was
       never in force. The real width path is the settings chip, which
       goes through onSettings() -> reset() and starts a fresh parade, so
       a part-marched parade can never be re-flowed: the guarantee is
       structural, not conditional. A guard that looks shipped and never
       runs is worse than no guard, because the docblock cites it. */

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('pgt-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. ⚠ `html,body.x{}` is a selector LIST whose
         html half applies unconditionally, which makes the class
         decorative and its mutation unkillable — two adds, one rule
         each. */
      document.documentElement.classList.add('pgt-scroll');
      document.body.classList.add('pgt-scroll');

      this._lastSound = 0;
      this._seed = 11;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.n, this._pick(api.settings.n));
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () {
      this.st = this.newState(this.api.settings.n, this._pick(this.api.settings.n));
      this.render();
    },

    onSettings: function () { this.reset(); },

    /* ⚠ not Math.random: the gate, the probe and the classroom must see
       the same parades, and a screenshot must be reproducible. */
    _rand: function (n) {
      this._seed = (this._seed * 1103515245 + 12345) & 0x7fffffff;
      return this._seed % n;
    },

    /* ⭐ TWO PARADES IN THREE LEAVE SOMEBODY STANDING. A parade that
       always came out even would teach that the archway always works;
       one that never did would teach the opposite. */
    _pick: function (n) {
      var k = Math.max(GEO.MIN_N, Math.min(GEO.MAX_N, parseInt(n, 10) || 2));
      var lo = k + 1, hi = GEO.CAP;
      var v = lo + this._rand(hi - lo + 1);
      if (this._rand(3) === 0 && v % k !== 0) v = v - (v % k);   /* an even one */
      if (v < lo) v = lo;
      return v;
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (f, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(f);
    },

    _fmt: function (s, v) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (v && v[k] != null) ? String(v[k]) : m;
      });
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'pgt-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'pgt-card');
      var arena = api.el('div', 'pgt-arena');
      this._arena = arena;
      arena.setAttribute('role', 'img');

      this._yard = api.el('div', 'pgt-yard');       /* through, beyond the arch */
      this._arch = api.el('div', 'pgt-arch');
      this._bar = api.el('div', 'pgt-bar');
      this._arch.appendChild(this._bar);
      this._wait = api.el('div', 'pgt-wait');       /* still waiting */
      this._sill = api.el('div', 'pgt-sill');
      this._sec = api.el('div', 'pgt-sec');         /* the second parade */

      arena.appendChild(this._yard);
      arena.appendChild(this._arch);
      arena.appendChild(this._wait);
      arena.appendChild(this._sill);
      arena.appendChild(this._sec);
      card.appendChild(arena);

      var bar = api.el('div', 'pgt-ctl');
      this._btn = {};
      this._btn.yes = this._mk(bar, 'pgt-b-yes', '✓', 'predYes');
      this._btn.no = this._mk(bar, 'pgt-b-no', '◦', 'predNo');
      this._btn.call = this._mk(bar, 'pgt-b-call', '▸', 'call');
      this._btn.second = this._mk(bar, 'pgt-b-second', '⇤', 'second');
      this._btn.sill = this._mk(bar, 'pgt-b-sill', '▭', 'sill');
      this._btn.again = this._mk(bar, 'pgt-b-again', '↻', 'again');
      this._btn.print = this._mk(bar, 'pgt-b-print', '⎙', 'printBtn');

      this._btn.yes.addEventListener('click', function () { self._predict(true); });
      this._btn.no.addEventListener('click', function () { self._predict(false); });
      this._btn.call.addEventListener('click', function () { self._call(); });
      this._btn.second.addEventListener('click', function () { self._second(); });
      this._btn.sill.addEventListener('click', function () { self._sillMove(); });
      this._btn.again.addEventListener('click', function () { self.reset(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);
      this._sheet = api.el('div', 'pgt-sheet');
      wrap.appendChild(this._sheet);
      api.stage.appendChild(wrap);
    },

    _mk: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'pgt-btn ' + cls);
      b.type = 'button';
      b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    _predict: function (yes) {
      var next = this.predict(null, yes);
      if (!next) { this._refuse('pred'); return; }
      this.st = next;
      this._paint(GEO.T_BAR);
      this._snd(GEO.SND_BAR);
      this.api.announce(this.api.t(yes ? 'saidPredYes' : 'saidPredNo'));
    },

    _call: function () {
      var api = this.api;
      var next = this.sendRank(null);
      if (!next) {
        this._refuse(this.st.pred === null ? 'bar'
          : (this.standing(this.st) === 0 ? 'clear' : 'stand'));
        return;
      }
      this.st = next;
      this._paint(GEO.T_RANK);
      this._snd(GEO.SND_THROUGH);
      if (this.done(next)) {
        var s = this.standing(next);
        api.announce(s === 0
          ? this._fmt(api.t('saidClear'), { n: next.total, r: next.ranks, k: next.k })
          : this._fmt(api.t('saidStand'), { s: s, n: next.total, k: next.k }));
      } else {
        api.announce(this._fmt(api.t('saidRank'), { n: this.through(next), w: this.waiting(next) }));
      }
    },

    _second: function () {
      var api = this.api;
      var t = this._pick(String(this.st.k));
      if (t % this.st.k === 0) t = t + 1 > GEO.CAP ? t - 1 : t + 1;
      var next = this.bringSecond(null, t);
      if (!next) { this._refuse('second'); return; }
      this.st = next;
      this._paint(GEO.T_RANK);
      this._snd(GEO.SND_CALL);
      api.announce(this._fmt(api.t('saidSecond'), { n: next.second, s: this.secondStanding(next) }));
    },

    _sillMove: function () {
      var api = this.api, self = this;
      var next = this.toSill(null);
      if (!next) { this._refuse(this.st.onSill > 0 ? 'onsill' : 'nosecond'); return; }
      var a = this.standing(this.st), b = this.secondStanding(this.st);
      this.st = next;
      this._paint(GEO.T_RANK);
      this._snd(GEO.SND_SILL);
      /* ⭐ THE BEAT. The class must see two leftovers standing on ONE
         plate before it becomes a rank, or the theorem reads as a trick.
         ⚠ Not through _dur(): a wait is not movement. */
      window.setTimeout(function () {
        self._paint(GEO.T_RANK);
        self._snd(GEO.SND_THROUGH, true);
        api.announce(self.sillFull(self.st)
          ? self._fmt(api.t('saidSill'), { a: a, b: b })
          : self._fmt(api.t('saidSillShort'), { a: a, b: b, c: a + b, k: self.st.k }));
      }, GEO.T_SILL);
    },

    _refuse: function (why) {
      var api = this.api, self = this, a = this._arena;
      this._snd(GEO.SND_REFUSE);
      if (a) {
        a.classList.add('is-refuse');
        window.setTimeout(function () { a.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (why === 'bar') { api.announce(api.t('saidBarDown')); return; }
      if (why === 'nosecond') { api.announce(api.t('saidNoSecond')); return; }
      if (why === 'onsill') { api.announce(api.t('saidOnSill')); return; }
      if (why === 'clear') { api.announce(api.t('saidAllThrough')); return; }
      if (why === 'pred') { api.announce(api.t('saidBusy')); return; }
      var s = this.st;
      api.announce(this._fmt(api.t('saidStand'), { s: this.standing(s), n: s.total, k: s.k }));
    },

    /* ---- painting -------------------------------------------------- */

    _row: function (host, count, k, opts) {
      var api = this.api, i, j;
      while (host.firstChild) host.removeChild(host.firstChild);
      var rows = Math.ceil(count / k) || 0;
      for (i = 0; i < rows; i++) {
        var row = api.el('div', 'pgt-rank');
        for (j = 0; j < k; j++) {
          var idx = i * k + j;
          if (idx < count) {
            row.appendChild(api.el('span', 'pgt-m'));
          } else if (opts && opts.seats) {
            /* ⭐⭐ THE EMPTY SEAT. The marcher left standing is drawn
               byte-identically to every other marcher; what is drawn is
               the PLACE BESIDE IT that nobody filled. Differentiating
               the marcher itself would be the verdict delivered by
               shape, in a palette that deliberately has no red. */
            row.appendChild(api.el('span', 'pgt-seat'));
          }
        }
        host.appendChild(row);
      }
    },

    _paint: function (dur) {
      var api = this.api, s = this.st;
      var d = this._dur(dur || GEO.T_RANK);
      this._arena.style.setProperty('--pgt-t', d + 'ms');
      this._arena.setAttribute('aria-label', api.t('ariaYard'));
      this._arch.style.setProperty('--pgt-k', String(s.k));

      var thru = this.through(s), wait = this.waiting(s);
      this._row(this._yard, thru, s.k, null);
      /* the waiting parade shows the empty seats only on its last,
         short rank — which is exactly where the leftover lives */
      this._row(this._wait, wait, s.k, { seats: this.done(s) });
      this._yard.setAttribute('aria-label', this._fmt(api.t('ariaThrough'), { n: thru, r: s.ranks }));
      this._wait.setAttribute('aria-label', this.done(s) && this.standing(s)
        ? this._fmt(api.t('ariaStand'), { n: this.standing(s), e: s.k - this.standing(s) })
        : this._fmt(api.t('ariaWaiting'), { n: wait }));

      this._sec.style.display = s.second === null ? 'none' : '';
      if (s.second !== null) this._row(this._sec, this.secondStanding(s), s.k, { seats: true });

      this._sill.style.display = s.onSill === 0 ? 'none' : '';
      if (s.onSill > 0) {
        this._row(this._sill, s.onSill, s.k, { seats: !this.sillFull(s) });
        this._sill.setAttribute('aria-label', api.t('ariaSill'));
      }
      this._sill.classList.toggle('is-full', this.sillFull(s));

      this._bar.classList.toggle('is-up', this.barUp(s));
      this._btn.yes.classList.toggle('is-off', s.pred !== null);
      this._btn.no.classList.toggle('is-off', s.pred !== null);
      this._btn.yes.setAttribute('aria-pressed', s.pred === true ? 'true' : 'false');
      this._btn.no.setAttribute('aria-pressed', s.pred === false ? 'true' : 'false');
      this._btn.call.classList.toggle('is-off', !this.sendRank(null));
      this._btn.second.classList.toggle('is-off', !this.bringSecond(null, s.k + 1));
      this._btn.sill.classList.toggle('is-off', !this.toSill(null));
      this._btn.print.classList.toggle('is-paid', !!this.premium);
    },

    /* ================= entitlement ================================== */

    _checkEntitlement: function () {
      var self = this;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var t = j.tier || (j.entitlement && j.entitlement.tier);
            if (!t) return;
            self.premium = t !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) { /* ⚠ degrade to the FREE TIER, never to nothing */ }
    },

    _gate: function () {
      var api = this.api, self = this;
      if (this._gateEl && this._gateEl.parentNode) return;
      var g = api.el('div', 'pgt-gate is-on');
      var box = api.el('div', 'pgt-gate-box');
      var h = api.el('h2', 'pgt-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'pgt-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'pgt-gate-cta'); a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'pgt-gate-x'); c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
    },

    /* ================= the paper parade ============================= */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('pgt-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('pgt-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('pgt-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'pgt-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'pgt-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      for (i = 0; i < GEO.CAP; i++) s.appendChild(api.el('span', 'pgt-p-m'));
      var arch = api.el('div', 'pgt-p-arch');
      s.appendChild(arch);
    }
  };

  function injectCSS() {
    var css = ''
      + 'html.pgt-scroll{overflow-y:auto;}'
      + 'body.pgt-scroll{overflow-y:auto;}'

      + '.pgt-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.pgt-card{container-type:inline-size;width:100%;max-width:860px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(12px,2.6cqw,26px);--pgt-m:clamp(15px,3.4cqw,34px);--pgt-t:420ms;}'

      + '.pgt-arena{position:relative;display:flex;flex-direction:column;align-items:center;'
      + 'gap:calc(var(--pgt-m) * .34);}'
      + '.pgt-arena.is-refuse .pgt-arch{border-color:#A34122;}'

      + '.pgt-yard,.pgt-wait,.pgt-sec,.pgt-sill{display:flex;flex-direction:column;'
      + 'align-items:center;gap:calc(var(--pgt-m) * .26);min-height:calc(var(--pgt-m) * .3);}'
      + '.pgt-rank{display:flex;gap:calc(var(--pgt-m) * .3);}'
      + '.pgt-m{width:var(--pgt-m);height:var(--pgt-m);border-radius:50%;'
      + 'background-color:#146B5E;flex:none;}'
      /* ⭐⭐ THE EMPTY SEAT — dashed, muted, 4.38:1. NOT the marcher. */
      + '.pgt-seat{width:var(--pgt-m);height:var(--pgt-m);border-radius:50%;flex:none;'
      + 'border:2px dashed #7A6A55;box-sizing:border-box;}'

      /* the archway: its opening is exactly k marchers wide */
      + '.pgt-arch{position:relative;width:calc(var(--pgt-k) * var(--pgt-m) '
      + '+ (var(--pgt-k) - 1) * var(--pgt-m) * .3 + var(--pgt-m) * .7);'
      + 'height:calc(var(--pgt-m) * 1.15);border:3px solid #146B5E;border-bottom:0;'
      + 'border-radius:calc(var(--pgt-m) * .6) calc(var(--pgt-m) * .6) 0 0;}'
      + '.pgt-bar{position:absolute;left:-3px;right:-3px;bottom:0;height:calc(var(--pgt-m) * .22);'
      + 'background-color:#0D4E44;border-radius:3px;'
      + 'transition-property:transform,opacity;transition-duration:var(--pgt-t);'
      + 'transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.pgt-bar.is-up{transform:translateY(calc(var(--pgt-m) * -.95));opacity:.25;}'

      /* the sill: a plate exactly as wide as the archway */
      + '.pgt-sill{padding:calc(var(--pgt-m) * .16);border-radius:8px;'
      + 'border:2px solid #7A6A55;}'
      + '.pgt-sill.is-full{border-color:#146B5E;border-width:3px;}'

      + '.pgt-ctl{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.pgt-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;font-weight:600;line-height:1;}'
      /* ⚠ THE FOCUS RING IS DOUBLED. The art panel measured the palette's
         own focus colour #1E8FD4 at 2.97:1 on the working surface —
         under the 3:1 non-text floor, on the palette's own surface, and
         almost certainly repo-wide. A deep-teal outer ring carries the
         contrast while the blue stays the recognisable focus colour. */
      + '.pgt-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;'
      + 'box-shadow:0 0 0 6px #0D4E44;}'
      + '.pgt-btn.is-off{opacity:.42;}'
      + '.pgt-btn[aria-pressed="true"]{background-color:#146B5E;color:#FBF3E4;}'
      + '.pgt-b-print{border-style:dashed;margin-left:10px;}'
      + '.pgt-b-print.is-paid{border-style:solid;}'

      + '.pgt-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.pgt-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.pgt-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.pgt-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.pgt-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.pgt-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.pgt-sheet{display:none;}'
      + '@media print{'
      + 'body.pgt-printing *{visibility:hidden;}'
      + 'body.pgt-printing .pgt-sheet,body.pgt-printing .pgt-sheet *{visibility:visible;}'
      + 'body.pgt-printing .pgt-wrap>.pgt-card,body.pgt-printing .pgt-ctl{display:none !important;}'
      + 'body.pgt-printing .pgt-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.pgt-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.pgt-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.pgt-p-m{display:inline-block;width:14mm;height:14mm;border-radius:50%;'
      + 'border:1pt solid #000;margin:0 3mm 3mm 0;}'
      + '.pgt-p-arch{width:80mm;height:30mm;border:1.5pt solid #000;border-bottom:0;'
      + 'border-radius:12mm 12mm 0 0;margin:8mm 0 0;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-pgt', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.PairGate = PairGate;
  if (typeof module !== 'undefined' && module.exports) module.exports = PairGate;
}());
