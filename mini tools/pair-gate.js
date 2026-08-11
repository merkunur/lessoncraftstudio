/* =====================================================================
   TOOL #53 — THE PAIR GATE  (rebuilt 2026-08-11, the transformation)
   =====================================================================
   A parade of marchers, an archway in a real wall exactly N of them
   wide, and a courtyard on the far side. The class CHOOSES the parade
   from a numeral strip, COMMITS a numeral — how many will be left
   standing — and only then does the boom lift. Ranks are called one at
   a time; when fewer than N remain, THE ARCHWAY REFUSES, for ever,
   and what is drawn beside whoever is left standing is THE EMPTY SEAT,
   never a mark on the marcher.

   ⭐⭐ THE 2026-08-11 REBUILD ANSWERS THE RECORDED OBJECTIONS INSTEAD
   OF RESTATING THEM (premium-tools-v4.md:678; operator-ordered):
   - GATE 4 said "parity has no degrees of freedom; nothing the child
     chooses changes the answer." That was TRUE OF THIS FILE: the
     parade size was held by a random number generator. Now the class
     chooses N from a 1-20 numeral strip, the inverse problem ("find a
     parade that leaves exactly 2 at three abreast") exists, and the
     prediction is a NUMERAL 0..k-1 — a falsifiable computed claim,
     not a coin flip. Strachota 2023's structure-based definition
     ("odd means one is left when you pair") is the literal question
     the chips ask.
   - ⭐⭐ THE THEOREM WAS RIGGED AND IS NOW HONEST. The old second
     parade was silently nudged so it always left a remainder — an
     unfalsifiable theorem. The second parade is now CHOSEN, any
     number, multiples of k included; a child who brings 8 to a
     2-abreast archway watches it march clean through and finds
     NOTHING to put on the sill. Odd+odd=even is only an argument
     because odd+even can now be tried and seen to fail.
   - GATE 1 (apparatus shipped 3x): the moat is the GRAMMAR, not the
     pairing. ten-frame pairs / K-016 / lids all display a pairing
     after the fact; only here does the class commit a numeral claim
     about the remainder BEFORE the structure reveals it, then watch
     two remainders recombine into a rank. Choose -> commit -> reveal,
     three times per run: parade, second parade, sill.

   ⚠⚠ THE PRODUCT NAME IS BROKEN TWICE, WHICH IS WHY NO PART IS NAMED
   FOR IT. `gate` is this platform's PAYWALL WORD (fifty-one tools ship
   gateTitle/gateBody/gateCta), and ⭐⭐ `pair` LITERALLY MEANS "EVEN"
   in fr/es/pt (`pair`/`par`) and it (`pari`) — the product name is the
   ANSWER in four of eleven languages. The English product name is the
   operator's and stays; every locale names the apparatus for the
   archway; no part is called a pair or a gate in any language. Also
   taken: `counter` (lids), `leftover` (lids), `file` (arrow-strip's
   FRENCH NAME), `door` (number-hotel), `queue`/`rank`/`line-up` (mean
   ROW in the Romance/Germanic banks).
   PARTS: THE ARCHWAY - THE PARADE - THE MARCHERS - THE SILL.

   ⚠⚠ "LONER" MEASURED FREE IN ALL ELEVEN AND IS STILL FORBIDDEN.
   Naming the part delivers the verdict the drawing exists to remove.
   A marcher left standing is byte-identical to every other marcher;
   what is drawn is THE EMPTY SEAT BESIDE IT, dashed #7A6A55. There is
   no red and no green in this palette, deliberately — nothing about
   being left over may look like being wrong. The committed prediction
   chip stays pressed as the record of the claim and is NEVER marked
   right or wrong; the tableau reveals, the room compares.

   ⚠ THE CUTSCENE STAYS KILLED STRUCTURALLY. The boom is down until a
   numeral is committed; ranks are called one at a time by hand; the
   second parade auto-marches ONLY behind its own committed prediction
   (first parade by action, second by anticipation — the progression
   is the pedagogy); nothing is ever dragged.

   ⭐ NUMERAL REVEAL DISCIPLINE (the visible abstraction): k lives on
   the keystone always (the apparatus's own rule); N appears when
   chosen (a given, not an answer); the running through-count appears
   with the FIRST rank, never before (skip-counting made visible);
   the per-column counts and the standing count appear ONLY at
   standstill — at k=2, N=13 the tableau reads 13 -> columns 6 6 ->
   1 beside one dashed seat: CCSS 2.OA.C.3's two equal addends shown
   by the apparatus itself, with no operator glyph ever drawn.

   ⚠ ART LAWS BOUGHT ELSEWHERE AND HONOURED HERE: marchers are the
   house chip (coral body in its #A34122 ring — coral is 2.3-2.5:1
   bare and NEVER appears without the ring); ink never on teal; the
   sheen is resolution-gated; no gradients on apparatus; the refusal
   is the BUILDING answering (the wall thuds, the reveals light coral)
   never the traveller; a lifted boom stays opacity 1 (a boom that
   fades has stopped being a boom); the sill's full-plate recolour
   grey->teal states STRUCTURE ("this plate is now a rank"), and the
   plate then takes the byte-identical rank march every rank gets —
   no flourish, because production values can deliver a verdict and
   that counts as delivering a verdict.

   ⚠ THE MARCH IS A PERSISTENT-NODE FLY (the #58 measured trap: a
   re-appended node teleports under a CSS transition; this file moves
   the REAL row node under one rAF interpolator, so re-parenting is
   legal). All k marchers of a rank arrive in the SAME frame — one
   arrival of k things is a GROUPING; k arrivals at k times would be
   a count, and a rank is one thing.

   FREE   the whole apparatus: every width, every parade, the refusal,
          the theorem, the sill.
   PAID   the paper parade: a standable archway, twenty marchers, the
          fold-to-width plate and the yard mat, to cut out and run the
          same routine at a desk.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* CAP=20 is curriculum arithmetic: CCSS 2.OA.C.3 caps the parity
       repertoire at 20 in the standard's own text. */
    CAP: 20,
    MIN_N: 2,
    MAX_N: 5,

    /* motion, ms. Reduced motion COMPRESSES, never skips — except the
       T_SILL hold, which is a wait, not movement. */
    T_RANK: 420,
    T_BAR: 380,
    T_REFUSE: 200,
    T_SILL: 800,
    T_THUD: 90,
    T_RECOLOR: 200,
    T_STEP2: 300,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_CALL: 620,
    SND_THROUGH: 780,
    SND_BAR: 520,
    SND_SILL: 880,
    SND_REFUSE: 300,
    /* ⚠ T_, not SND_ — every other SND_* is a FREQUENCY and this one
       is milliseconds (#58 named this file for shipping it wrong). */
    T_SND_DEBOUNCE: 160
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
        en: 'Choose the parade, say how many will be left standing, then call them forward a rank at a time and find out.',
        de: 'Wählt den Umzug und sagt, wie viele stehen bleiben werden. Dann ruft sie nach vorn — immer so viele auf einmal — und seht nach.',
        fr: 'Choisissez le défilé, dites combien resteront debout, puis appelez-les en avant, autant à la fois, et voyez.',
        es: 'Elijan el desfile, digan cuántos se quedarán de pie y luego llámenlos hacia delante — tantos juntos cada vez — y compruébenlo.',
        pt: 'Escolham o desfile, digam quantos vão ficar de pé e depois chamem-nos para a frente, uma leva de cada vez, e confiram.',
        it: 'Scegliete la sfilata, dite quanti resteranno in piedi, poi chiamateli avanti, tanti affiancati per volta, e vedete.',
        nl: 'Kies de optocht, zeg hoeveel er blijven staan, roep ze dan naar voren, steeds zoveel tegelijk, en kijk wat er gebeurt.',
        sv: 'Välj paraden och säg hur många som blir stående. Ropa dem sedan fram, så många i bredd åt gången, och se efter.',
        da: 'Vælg optoget, sig hvor mange der bliver stående, kald dem så frem, så mange ad gangen, og se efter.',
        no: 'Velg opptoget, si hvor mange som blir stående, rop dem så fram, så mange om gangen, og se etter.',
        fi: 'Valitkaa kulkue, sanokaa, kuinka moni jää seisomaan, ja kutsukaa heidät sitten eteen, näin monta kerrallaan, ja katsokaa, miten käy.'
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
        de: 'Noch wartend: {n}',
        fr: 'encore en attente : {n}',
        es: 'En espera: {n}',
        pt: '{n} ainda esperando',
        it: 'In attesa: {n}',
        nl: 'Wachten nog: {n}',
        sv: '{n} väntar fortfarande',
        da: '{n} venter stadig',
        no: '{n} venter fortsatt',
        fi: '{n} odottaa vielä'
      },
      ariaThrough: {
        en: '{n} through, in {r} ranks',
        de: '{n} durch, {r} mal nebeneinander',
        fr: 'passés : {n}, appels : {r}',
        es: 'Al patio: {n}, llamadas: {r}',
        pt: '{n} passaram, chamadas: {r}',
        it: 'Passati: {n}, chiamate: {r}',
        nl: '{n} erdoor, in {r} keer',
        sv: '{n} igenom, på {r} rop',
        da: '{n} igennem, på {r} kald',
        no: '{n} gjennom, på {r} rop',
        fi: '{n} läpi, kutsuja {r}'
      },
      /* ⚠ A TALLY, NOT A PHRASE — '{e} empty places' renders '1 empty
         placeS' at two abreast, the DEFAULT width. ⚠⚠ The old note
         claimed Finnish partitive was "right at 1 as well as at 4" —
         the Finnish panel REFUTED it (after the numeral 1 Finnish
         takes the NOMINATIVE), so all ten locales now ride the tally
         shape. A grammar claim about a locale is a measurement, and
         only that locale's native can take it. */
      ariaStand: {
        en: '{n} left standing. Empty places beside them: {e}',
        de: 'Stehen geblieben: {n}, leere Plätze daneben: {e}',
        fr: 'Il en reste {n} debout, places vides à côté : {e}',
        es: 'De pie: {n}, lugares vacíos al lado: {e}',
        pt: 'De pé: {n}. Lugares vazios ao lado: {e}',
        it: 'In piedi: {n}, spazi vuoti accanto: {e}',
        nl: 'Blijven staan: {n}, lege plekken ernaast: {e}',
        sv: '{n} blir stående, tomma platser bredvid: {e}',
        da: '{n} bliver stående, tomme pladser ved siden af: {e}',
        no: '{n} blir stående, tomme plasser ved siden av: {e}',
        fi: '{n} jää seisomaan, tyhjiä paikkoja vieressä: {e}'
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
        en: 'two', de: 'zwei', fr: 'deux', es: 'dos', pt: 'dois',
        it: 'due', nl: 'twee', sv: 'två', da: 'to', no: 'to', fi: 'kaksi'
      },
      n3: {
        en: 'three', de: 'drei', fr: 'trois', es: 'tres', pt: 'três',
        it: 'tre', nl: 'drie', sv: 'tre', da: 'tre', no: 'tre', fi: 'kolme'
      },
      n4: {
        en: 'four', de: 'vier', fr: 'quatre', es: 'cuatro', pt: 'quatro',
        it: 'quattro', nl: 'vier', sv: 'fyra', da: 'fire', no: 'fire', fi: 'neljä'
      },
      n5: {
        en: 'five', de: 'fünf', fr: 'cinq', es: 'cinco', pt: 'cinco',
        it: 'cinque', nl: 'vijf', sv: 'fem', da: 'fem', no: 'fem', fi: 'viisi'
      },

      /* ---- the act strip ------------------------------------------ */
      sizeAsk: {
        en: 'Choose the parade',
        de: 'Wählt den Umzug',
        fr: 'Choisissez le défilé',
        es: 'Elijan el desfile',
        pt: 'Escolham o desfile',
        it: 'Scegliete la sfilata',
        nl: 'Kies de optocht',
        sv: 'Välj paraden',
        da: 'Vælg optoget',
        no: 'Velg opptoget',
        fi: 'Valitkaa kulkue'
      },
      sizeChip: {
        en: 'A parade of {n}',
        de: 'Ein Umzug mit {n}',
        fr: 'Un défilé de {n}',
        es: 'Un desfile de {n}',
        pt: 'Um desfile de {n}',
        it: 'Una sfilata di {n}',
        nl: 'Een optocht van {n}',
        sv: 'En parad på {n}',
        da: 'Et optog på {n}',
        no: 'Et opptog på {n}',
        fi: '{n} marssijan kulkue'
      },
      predAsk: {
        en: 'How many will be left standing?',
        de: 'Wie viele werden stehen bleiben?',
        fr: 'Combien resteront debout ?',
        es: '¿Cuántos se quedarán de pie?',
        pt: 'Quantos vão ficar de pé?',
        it: 'Quanti resteranno in piedi?',
        nl: 'Hoeveel blijven er staan?',
        sv: 'Hur många blir stående?',
        da: 'Hvor mange bliver stående?',
        no: 'Hvor mange blir stående?',
        fi: 'Kuinka moni jää seisomaan?'
      },
      predChip: {
        en: '{s} left standing',
        de: 'Stehen bleiben: {s}',
        fr: 'Il en restera {s} debout',
        es: '{s} de pie',
        pt: '{s} de pé',
        it: '{s} in piedi',
        nl: 'Blijven staan: {s}',
        sv: '{s} blir stående',
        da: '{s} bliver stående',
        no: '{s} blir stående',
        fi: '{s} jää seisomaan'
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

      /* ---- announcements (mirrored on the visible say-line) -------- */
      saidParade: {
        en: '{n} in the parade. How many will be left standing?',
        de: '{n} im Umzug. Wie viele werden stehen bleiben?',
        fr: '{n} dans le défilé. Combien resteront debout ?',
        es: 'Un desfile de {n}. ¿Cuántos se quedarán de pie?',
        pt: '{n} no desfile. Quantos vão ficar de pé?',
        it: '{n} nella sfilata. Quanti resteranno in piedi?',
        nl: '{n} in de optocht. Hoeveel blijven er staan?',
        sv: '{n} i paraden. Hur många blir stående?',
        da: '{n} i optoget. Hvor mange bliver stående?',
        no: '{n} i opptoget. Hvor mange blir stående?',
        fi: 'Marssijoita on {n}. Kuinka moni jää seisomaan?'
      },
      saidChooseFirst: {
        en: 'Choose the parade first — tap a number.',
        de: 'Wählt zuerst den Umzug — tippt auf eine Zahl.',
        fr: 'Choisissez d’abord le défilé — touchez un nombre.',
        es: 'Elijan primero el desfile: toquen un número.',
        pt: 'Escolham o desfile primeiro — toquem em um número.',
        it: 'Prima scegliete la sfilata: toccate un numero.',
        nl: 'Kies eerst de optocht — tik op een getal.',
        sv: 'Välj paraden först — tryck på ett tal.',
        da: 'Vælg først optoget — tryk på et tal.',
        no: 'Velg opptoget først — trykk på et tall.',
        fi: 'Valitkaa ensin kulkue — napauttakaa lukua.'
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
      saidPredN: {
        en: 'The class says {s} will be left standing. The bar is up.',
        de: 'Die Klasse sagt, wie viele stehen bleiben werden: {s}. Die Schranke ist oben.',
        fr: 'La classe dit qu’il en restera {s} debout. La barrière est levée.',
        es: 'La clase dice: {s} de pie. La barrera está levantada.',
        pt: 'A turma diz: {s} de pé. A barreira está levantada.',
        it: 'La classe dice: {s} in piedi. La sbarra è alzata.',
        nl: 'De klas zegt hoeveel er blijven staan: {s}. De slagboom staat omhoog.',
        sv: 'Klassen säger att {s} blir stående. Bommen är uppe.',
        da: 'Klassen siger, at {s} bliver stående. Bommen er oppe.',
        no: 'Klassen sier at {s} blir stående. Bommen er oppe.',
        fi: 'Luokka sanoo, että {s} jää seisomaan. Puomi on ylhäällä.'
      },
      saidPred2: {
        en: 'The class says {s} will be left standing. Bring them in.',
        de: 'Die Klasse sagt, wie viele stehen bleiben werden: {s}. Lasst sie einziehen.',
        fr: 'La classe dit qu’il en restera {s} debout. Faites venir le second défilé.',
        es: 'La clase dice: {s} de pie. Adelante el segundo desfile.',
        pt: 'A turma diz: {s} de pé. Podem entrar.',
        it: 'La classe dice: {s} in piedi. Fateli arrivare.',
        nl: 'De klas zegt hoeveel er blijven staan: {s}. Laat ze maar komen.',
        sv: 'Klassen säger att {s} blir stående. Låt dem marschera in.',
        da: 'Klassen siger, at {s} bliver stående. Lad dem komme ind.',
        no: 'Klassen sier at {s} blir stående. Nå kommer de inn.',
        fi: 'Luokka sanoo, että {s} jää seisomaan. Toinen kulkue saa tulla.'
      },
      saidPredSill: {
        en: 'The class has said. Put them both on the sill.',
        de: 'Die Klasse hat sich festgelegt. Stellt beide auf den Sims.',
        fr: 'La classe s’est prononcée. Mettez-les tous les deux sur le seuil.',
        es: 'La clase ya ha dicho. Pongan a los dos en el umbral.',
        pt: 'A turma já disse. Coloquem os dois na soleira.',
        it: 'La classe si è espressa. Metteteli tutti e due sulla soglia.',
        nl: 'De klas heeft zich uitgesproken. Zet ze allebei op de drempel.',
        sv: 'Klassen har sagt sitt. Ställ båda på tröskeln.',
        da: 'Klassen har sagt sit. Stil dem begge på tærsklen.',
        no: 'Klassen har sagt sitt. Sett dem begge på terskelen.',
        fi: 'Luokka on sanonut sanottavansa. Aseta molemmat kynnykselle.'
      },
      saidRank: {
        en: '{n} through, {w} still waiting.',
        de: '{n} durch, noch wartend: {w}.',
        fr: '{n} passés, {w} attendent encore.',
        es: 'Al patio: {n}. En espera: {w}.',
        pt: '{n} passaram, {w} ainda esperando.',
        it: '{n} passati, {w} in attesa.',
        nl: '{n} erdoor, wachten nog: {w}.',
        sv: '{n} igenom, {w} väntar fortfarande.',
        da: '{n} igennem, {w} venter stadig.',
        no: '{n} gjennom, {w} venter fortsatt.',
        fi: '{n} läpi, {w} odottaa vielä.'
      },
      saidClear: {
        en: 'All {n} went through, in {r} ranks of {k}. Nobody was left standing.',
        de: 'Alle {n} sind durch — {r} mal {k} nebeneinander. Niemand ist stehen geblieben.',
        fr: 'Les {n} sont tous passés — {r} fois {k} de front. Personne n’est resté debout.',
        es: 'El desfile de {n} pasó entero — de {k} en {k}, llamadas: {r}. Nadie se quedó de pie.',
        pt: 'Os {n} passaram todos — {k} lado a lado a cada chamada, {r} ao todo. Ninguém ficou de pé.',
        it: 'Tutti e {n} sono passati — {k} affiancati per volta, chiamate: {r}. Nessuno è rimasto in piedi.',
        nl: 'Alle {n} zijn erdoor — {r} keer {k} naast elkaar. Niemand bleef staan.',
        sv: 'Hela paraden på {n} kom igenom — {r} rop med {k} i bredd. Ingen blev stående.',
        da: 'Alle {n} kom igennem, {k} ved siden af hinanden — på {r} kald. Ingen blev stående.',
        no: 'Alle {n} kom gjennom — {r} rop med {k} ved siden av hverandre. Ingen ble stående.',
        fi: 'Kaikki {n} pääsivät läpi — {r} kertaa {k} rinnakkain. Kukaan ei jäänyt seisomaan.'
      },
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
        de: 'Stehen geblieben: {s} — {n} lässt sich nicht restlos zu {k} nebeneinander aufteilen. Der Rundbogen nimmt nur volle, nie angefangene.',
        fr: 'Il en reste {s} debout : {n} ne tombe pas juste à {k} de front. L’arche ne prend que des complets, jamais des entamés.',
        es: 'De pie: {s}. {n} no se reparte exactamente en {k} juntos. El pórtico solo acepta completos, nunca a medias.',
        pt: '{s} de pé: {n} não se divide exatamente em {k} lado a lado. O pórtico só aceita completos, nunca pela metade.',
        it: 'In piedi: {s}. {n} non si divide esattamente in {k} affiancati. L’arcata accetta solo chi è al completo, mai chi è a metà.',
        nl: 'Blijven staan: {s} — {n} gaat niet precies op in {k} naast elkaar. De doorgang neemt alleen volle, nooit halve.',
        sv: '{s} blir stående: {n} går inte jämnt upp i {k} i bredd. Valvet tar bara fulla, aldrig påbörjade.',
        da: '{s} bliver stående: {n} kan ikke deles ligeligt i {k} ved siden af hinanden. Hvælvingen tager kun fulde, aldrig halve.',
        no: '{s} blir stående: {n} lar seg ikke dele i {k} ved siden av hverandre. Hvelvingen tar bare fulle, aldri halve.',
        fi: '{s} jää seisomaan: marssijoita on {n}, eikä se jakaudu tasan. Holvista pääsee vain täydet {k} rinnakkain.'
      },
      saidMarchOn: {
        en: 'The first parade is still marching. Call the next rank forward.',
        de: 'Der erste Umzug ist noch unterwegs. Ruft die Nächsten nach vorn.',
        fr: 'Le premier défilé marche encore. Appelez les suivants en avant.',
        es: 'El primer desfile todavía está pasando. Llamen a los siguientes.',
        pt: 'O primeiro desfile ainda está passando. Chamem os próximos para a frente.',
        it: 'La prima sfilata sta ancora sfilando. Chiamate avanti i prossimi.',
        nl: 'De eerste optocht loopt nog. Roep de volgenden naar voren.',
        sv: 'Den första paraden marscherar fortfarande. Ropa fram de nästa.',
        da: 'Det første optog marcherer stadig. Kald de næste frem.',
        no: 'Det første opptoget marsjerer fortsatt. Rop fram de neste.',
        fi: 'Ensimmäinen kulkue marssii vielä. Kutsu seuraavat eteen.'
      },
      saidSecondHere: {
        en: 'The second parade is already here.',
        de: 'Der zweite Umzug ist schon da.',
        fr: 'Le second défilé est déjà là.',
        es: 'El segundo desfile ya está aquí.',
        pt: 'O segundo desfile já está aqui.',
        it: 'La seconda sfilata è già qui.',
        nl: 'De tweede optocht is er al.',
        sv: 'Den andra paraden är redan här.',
        da: 'Det andet optog er her allerede.',
        no: 'Det andre opptoget er her allerede.',
        fi: 'Toinen kulkue on jo täällä.'
      },
      saidSecond: {
        en: 'A second parade of {n}. It leaves {s} standing too.',
        de: 'Ein zweiter Umzug mit {n}. Auch dort stehen geblieben: {s}.',
        fr: 'Un second défilé de {n}. Lui aussi en laisse {s} debout.',
        es: 'Un segundo desfile de {n}. También deja a {s} de pie.',
        pt: 'Um segundo desfile de {n}. Ele também deixa {s} de pé.',
        it: 'Una seconda sfilata di {n}. Anche questa lascia {s} in piedi.',
        nl: 'Een tweede optocht van {n}. Ook daar blijven staan: {s}.',
        sv: 'En andra parad på {n}. Även den lämnar {s} stående.',
        da: 'Et andet optog på {n}. Det efterlader også {s} stående.',
        no: 'Et andre opptog på {n}. Det lar også {s} bli stående.',
        fi: 'Toinen kulkue — marssijoita on {n}. Siitäkin jää {s} seisomaan.'
      },
      /* ⭐ THE FIZZLE — the theorem tested and honestly failing to arm.
         The old tool could not reach this sentence, because the second
         parade was rigged to always leave a remainder. */
      /* ⚠ "nothing to bring" was FALSE — the first parade's remainder
         still stands in the yard, and three native panels caught the
         sentence erasing exactly the child the design refuses to
         erase. Nothing NEW arrives; the one still standing stays. */
      saidSecondClear: {
        en: 'The second parade of {n} went through with nobody left standing — so no one new arrives for the sill.',
        de: 'Der zweite Umzug mit {n} ist restlos durchgekommen — niemand ist stehen geblieben, und für den Sims bleibt nichts.',
        fr: 'Le second défilé de {n} est passé tout entier, sans laisser personne debout — il n’y a rien à porter sur le seuil.',
        es: 'El segundo desfile de {n} pasó entero, sin nadie de pie: no hay nada que llevar al umbral.',
        pt: 'O segundo desfile de {n} passou inteiro, sem ninguém de pé — não sobrou nada para levar à soleira.',
        it: 'La seconda sfilata di {n} è passata tutta — nessuno è rimasto in piedi, e non c’è niente da portare sulla soglia.',
        nl: 'De tweede optocht van {n} is er helemaal doorheen en niemand bleef staan — er komt dus niets bij voor de drempel.',
        sv: 'Den andra paraden på {n} gick igenom utan att någon blev stående — det finns ingen att ställa på tröskeln.',
        da: 'Det andet optog på {n} gik igennem, uden at nogen blev stående — der er ingen anden at stille på tærsklen.',
        no: 'Det andre opptoget på {n} kom gjennom uten at noen ble stående — det er ingenting å sette på terskelen.',
        fi: 'Toinen kulkue pääsi läpi kokonaan — marssijoita oli {n}, eikä kukaan jäänyt seisomaan. Kynnykselle ei ole mitään vietävää.'
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
         At two abreast two left-behinds always make a rank; at wider
         archways only sometimes. The refusal to pretend is what makes
         two special rather than merely typical.
         ⚠ "does not FILL" alone was FALSE at the reachable overshoot
         (k=3, 2+2=4 — the plate holds MORE than a rank and still may
         not pass); two panels caught it. The claim is exactness. */
      saidSillShort: {
        en: '{a} and {b} on the sill make {c} — and {c} does not fill ranks of {k} exactly, so they wait too. At two abreast two left-behinds always make a rank; at wider archways only sometimes.',
        de: '{a} und {b} auf dem Sims sind {c} — und {c} füllt {k} nebeneinander immer noch nicht, also warten auch sie. Bei zwei nebeneinander geht es jedes Mal auf; bei einem breiteren Rundbogen nur manchmal.',
        fr: '{a} et {b} sur le seuil font {c} — et {c} ne remplit toujours pas {k} de front, alors eux aussi attendent. À deux de front, cela tombe juste à chaque fois ; sous une arche plus large, seulement parfois.',
        es: '{a} y {b} en el umbral son {c} — y {c} sigue sin llenar {k} juntos, así que ellos también esperan. Con dos juntos sale justo todas las veces; con un pórtico más ancho, solo a veces.',
        pt: '{a} e {b} na soleira dão {c} — e {c} não fecha certinho em {k} lado a lado, então ainda fica gente de pé. Com dois lado a lado dá certo todas as vezes; com um pórtico mais largo, só às vezes.',
        it: '{a} e {b} sulla soglia fanno {c} — e {c} non riempie ancora {k} affiancati, quindi aspettano anche loro. Con due affiancati torna ogni volta; sotto un’arcata più larga, solo a volte.',
        nl: '{a} en {b} op de drempel zijn {c} — en {c} vult {k} naast elkaar nog steeds niet, dus zij wachten ook. Bij twee naast elkaar klopt het elke keer; bij een bredere doorgang alleen soms.',
        sv: '{a} och {b} på tröskeln blir {c} — och {c} fyller fortfarande inte {k} i bredd, så de får också vänta. Med två i bredd går det jämnt ut varje gång; med ett bredare valv bara ibland.',
        da: '{a} og {b} på tærsklen bliver {c} — og {c} passer stadig ikke præcis til {k} ved siden af hinanden, så de venter også. Med to ved siden af hinanden går det op hver gang; med en bredere hvælving kun nogle gange.',
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

      /* ---- the paywall + the paper parade -------------------------- */
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
      printAsk: {
        en: 'The paper parade — see the Teacher plan',
        de: 'Der Umzug aus Papier — Lehrkraft-Abo ansehen',
        fr: 'Le défilé en papier — voir l’Abonnement Enseignant',
        es: 'El desfile de papel — ver el Plan Docente',
        pt: 'O desfile de papel — ver o Plano Professor',
        it: 'La sfilata di carta — vedi il Piano Insegnante',
        nl: 'De papieren optocht — bekijk het Leerkracht-abonnement',
        sv: 'Pappersparaden — se Lärarplanen',
        da: 'Papiroptoget — se Lærerabonnementet',
        no: 'Papiropptoget — se Lærerabonnementet',
        fi: 'Paperikulkue — katso Opettajatilaus'
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
      /* ⚠ no fourth part name on paper: the folding strip IS the sill,
         and "standing archway" collided with "left standing" — the
         tool's one load-bearing word (both native-panel findings). */
      sheetNote: {
        en: 'Cut out the marchers and the archway that stands up, and fold the sill to your archway’s width. Choose a parade, circle how many you think will be left standing, then send them through, so many abreast at a time. When too few are left to fill the archway, never cross anyone out — draw the empty place beside them instead. That empty place is what the number is telling you.',
        de: 'Schneide die Marschierenden und den Rundbogen zum Hinstellen aus und falte den Sims genau auf die Breite deines Rundbogens. Wähle einen Umzug und kreise zuerst ein, wie viele wohl stehen bleiben werden. Dann schick sie hindurch — immer so viele nebeneinander. Wer durch ist, wird auf dem Hof abgelegt — jeder in einen gestrichelten Platz, damit du die Zahl wachsen siehst. Wenn zu wenige übrig sind, um den Rundbogen zu füllen, streiche niemanden durch — male stattdessen den leeren Platz daneben. Dieser leere Platz ist das, was die Zahl dir sagt.',
        fr: 'Découpe les marcheurs et l’arche — ses rabats la font tenir debout — puis plie le seuil à la largeur de ton arche. Choisis un défilé, entoure combien resteront debout à ton avis, puis fais-les passer, autant de front à chaque fois. À mesure qu’ils passent, pose les marcheurs sur la cour — les quinze places en pointillés — et regarde les colonnes se remplir. Quand il n’en reste pas assez pour remplir l’arche, ne raye jamais personne — dessine plutôt la place vide à côté. Cette place vide est ce que le nombre te dit.',
        es: 'Recorta a los desfilantes y el pórtico que se pone de pie, y dobla el umbral a la anchura de tu pórtico. Elige un desfile, rodea cuántos crees que se quedarán de pie y luego hazlos pasar, tantos juntos cada vez. El tapete del patio trae quince asientos punteados — de tres en tres, cinco tandas: ve colocando en ellos a los desfilantes que ya han pasado, tanda a tanda. Cuando queden muy pocos para llenar el pórtico, no taches a nadie: dibuja el lugar vacío a su lado. Ese lugar vacío es lo que el número te está diciendo.',
        pt: 'Recorte os desfilantes e o pórtico de armar, e dobre a soleira na largura do seu pórtico. Escolha um desfile, faça um círculo em quantos você acha que vão ficar de pé e depois faça-os passar, uma leva de cada vez. Quem passa se deita no tapete do pátio — lugares tracejados, três lado a lado em cinco levas — e assim a contagem fica à vista sobre a mesa. Quando sobrarem poucos demais para encher o pórtico, não risque ninguém — desenhe o lugar vazio ao lado de quem ficou. Esse lugar vazio é o que o número está dizendo.',
        it: 'Ritaglia i marciatori e l’arcata da mettere in piedi, e piega la soglia alla larghezza della tua arcata. Scegli una sfilata, cerchia quanti secondo te resteranno in piedi, poi falli passare, tanti affiancati per volta. Man mano che passano, appoggia i marciatori sul tappeto del cortile, dentro i posti tratteggiati — tre affiancati, per cinque chiamate. Quando ne restano troppo pochi per riempire l’arcata, non cancellare mai nessuno: disegna invece il posto vuoto accanto. Quel posto vuoto è ciò che il numero ti sta dicendo.',
        nl: 'Knip de lopers uit en zet de doorgang rechtop met de vouwflappen. Vouw de drempel tot hij precies zo breed is als jouw doorgang. Kies een optocht, omcirkel eerst hoeveel er volgens jou blijven staan, en stuur ze er dan doorheen, steeds zoveel naast elkaar. Wie erdoor is, leg je op de pleinmat: voor elke loper een eigen plek met stippellijn, netjes naast elkaar. Zijn er te weinig over om de doorgang te vullen? Streep dan nooit iemand door — teken de lege plek ernaast. Die lege plek is wat het getal je vertelt.',
        sv: 'Klipp ut marscherarna och valvet, och vik flikarna bakåt så att valvet står av sig självt. Vik tröskeln så att den blir lika bred som ert valv. Välj en parad, ringa in hur många ni tror blir stående, och skicka sedan igenom dem, så många i bredd åt gången. Lägg dem som kommit igenom på gårdsmattans streckade platser allteftersom de passerar — så syns det på bordet hur talet växer. När det blir för få kvar för att fylla valvet, stryk aldrig över någon — rita den tomma platsen bredvid i stället. Den tomma platsen är det som talet säger dig.',
        da: 'Klip de marcherende ud og hvælvingen, der kan stilles op, og fold tærsklen, så den er lige så bred som din hvælving. Gårdmåtten er gården på papir: tre gange fem stiplede pladser, hvor du lægger de marcherende, efterhånden som de kommer igennem. Vælg et optog, sæt ring om, hvor mange du tror, der bliver stående, og send dem så igennem, så mange ved siden af hinanden ad gangen. Når der er for få tilbage til at fylde hvælvingen, så streg aldrig nogen ud — tegn i stedet den tomme plads ved siden af dem. Den tomme plads er det, tallet fortæller dig.',
        no: 'Klipp ut de marsjerende og hvelvingen, og brett klaffene bakover så hvelvingen kan stå på bordet. Brett terskelplaten så den blir like bred som hvelvingen din, og legg gårdsmatten bak hvelvingen — de marsjerende legges på de stiplede plassene etter hvert som de kommer gjennom. Velg et opptog, sett ring rundt hvor mange du tror blir stående, og send dem så gjennom, så mange ved siden av hverandre om gangen. Når det er for få igjen til å fylle hvelvingen, stryk aldri ut noen — tegn heller den tomme plassen ved siden av. Den tomme plassen er det tallet forteller deg.',
        fi: 'Leikkaa irti marssijat ja pystyyn taittuva holvi, ja taita kynnys holvisi levyiseksi. Valitse kulkue, ympyröi, kuinka monen arvelet jäävän seisomaan, ja kuljeta heidät sitten läpi, näin monta rinnakkain kerrallaan. Läpi päässeet asetetaan pihalle — painetulle alustalle, jossa katkoviivapaikkoja on kolme rinnakkain ja viisi peräkkäin — kukin omalle paikalleen sitä mukaa kuin kulkue etenee. Kun jäljellä on liian vähän täyttämään holvia, älä koskaan yliviivaa ketään — piirrä sen sijaan tyhjä paikka hänen viereensä. Se tyhjä paikka kertoo, mitä luku sanoo.'
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
       THEM: `through` is derived from `ranks`, never stored beside it.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP.
       ⚠ total === 0 means NO PARADE YET — the choose phase is a real
       state, not a UI trick, so the gate can walk it. */

    newState: function (n, total) {
      var k = Math.max(GEO.MIN_N, Math.min(GEO.MAX_N, parseInt(n, 10) || 2));
      var t = Math.max(0, Math.min(GEO.CAP, total || 0));
      return {
        k: k, total: t, ranks: 0,
        pred: null,            /* null | 0..k-1 — the committed standing count */
        second: null,          /* the second parade's total, once chosen */
        ranks2: 0,
        pred2: null,           /* the second parade's committed standing count */
        sillPred: null,        /* the sill commit: 0 or a+b */
        onSill: 0,
        sillGone: false        /* the full plate has passed through */
      };
    },

    _st: function (st) { return st || this.st; },
    _copy: function (s) {
      return { k: s.k, total: s.total, ranks: s.ranks, pred: s.pred,
        second: s.second, ranks2: s.ranks2, pred2: s.pred2,
        sillPred: s.sillPred, onSill: s.onSill, sillGone: s.sillGone };
    },

    /* everything below is DERIVED, so nothing can disagree */
    through: function (st) { var s = this._st(st); return s.ranks * s.k; },
    waiting: function (st) { var s = this._st(st); return s.total - this.through(s); },
    standing: function (st) { var s = this._st(st); return s.total % s.k; },
    done: function (st) { var s = this._st(st); return s.total > 0 && this.waiting(s) < s.k; },
    fullRanks: function (st) { var s = this._st(st); return Math.floor(s.total / s.k); },

    through2: function (st) { var s = this._st(st); return s.ranks2 * s.k; },
    waiting2: function (st) { var s = this._st(st); return s.second === null ? 0 : s.second - this.through2(s); },
    standing2: function (st) { var s = this._st(st); return s.second === null ? 0 : s.second % s.k; },
    done2: function (st) { var s = this._st(st); return s.second !== null && this.waiting2(s) < s.k; },

    /* everybody who has passed the archway, sill included */
    yardCount: function (st) {
      var s = this._st(st);
      var y = this.through(s) + this.through2(s);
      if (s.sillGone) y += this.standing(s) + this.standing2(s);
      return y;
    },
    yardRanks: function (st) {
      var s = this._st(st);
      return s.ranks + s.ranks2 + (s.sillGone ? 1 : 0);
    },

    /* ---- the moves ------------------------------------------------ */

    /* the class CHOOSES the parade — the degrees of freedom live here.
       Re-choosing is allowed until the class commits; a committed
       parade can never be resized (structural, not conditional). */
    setTotal: function (st, t) {
      var s = this._st(st);
      if (s.pred !== null) return null;
      if (typeof t !== 'number' || t % 1 !== 0) return null;
      if (t < 1 || t > GEO.CAP) return null;
      var n = this._copy(s);
      n.total = t; n.ranks = 0;
      return n;
    },

    /* ⭐ THE PREDICTION IS A NUMERAL, 0..k-1 — a falsifiable computed
       claim, not a coin flip. The boom is down until it is committed,
       so the first thing that happens is a judgement. Its consequence
       is in ANOTHER element: the bar lifts.
       ⚠ A BOOLEAN IS REFUSED — the old binary shape is dead. */
    predict: function (st, n) {
      var s = this._st(st);
      if (s.total <= 0) return null;
      if (s.pred !== null) return null;
      if (typeof n !== 'number' || n % 1 !== 0) return null;
      if (n < 0 || n >= s.k) return null;
      var x = this._copy(s);
      x.pred = n;
      return x;
    },

    barUp: function (st) { return this._st(st).pred !== null; },

    /* call the next rank. THE ARCHWAY REFUSES a part-rank — that
       refusal IS the lesson, and the child may press for ever without
       anything calling them wrong. */
    sendRank: function (st) {
      var s = this._st(st);
      if (s.pred === null) return null;
      if (this.waiting(s) < s.k) return null;
      var x = this._copy(s);
      x.ranks = s.ranks + 1;
      return x;
    },

    /* ⭐⭐ the second parade is CHOSEN, and it may be ANY number —
       multiples of k included. Dimming them would display the parity
       answer key, and refusing them would rig the theorem (the old
       defect). Re-choosable until its own prediction is committed. */
    setSecond: function (st, t) {
      var s = this._st(st);
      if (!this.done(s)) return null;
      if (this.standing(s) === 0) return null;
      if (s.pred2 !== null) return null;
      if (typeof t !== 'number' || t % 1 !== 0) return null;
      if (t < 1 || t > GEO.CAP) return null;
      var x = this._copy(s);
      x.second = t; x.ranks2 = 0;
      return x;
    },

    predict2: function (st, n) {
      var s = this._st(st);
      if (s.second === null) return null;
      if (s.pred2 !== null) return null;
      if (typeof n !== 'number' || n % 1 !== 0) return null;
      if (n < 0 || n >= s.k) return null;
      var x = this._copy(s);
      x.pred2 = n;
      return x;
    },

    sendRank2: function (st) {
      var s = this._st(st);
      if (s.pred2 === null) return null;
      if (this.waiting2(s) < s.k) return null;
      var x = this._copy(s);
      x.ranks2 = s.ranks2 + 1;
      return x;
    },

    /* the sill's own commit: either nobody is left after it tries (0)
       or all of them are (a+b). Requires BOTH parades to have left
       somebody — a fizzled second parade leaves nothing to combine. */
    predictSill: function (st, n) {
      var s = this._st(st);
      if (!this.done2(s)) return null;
      if (this.standing(s) === 0 || this.standing2(s) === 0) return null;
      if (s.sillPred !== null) return null;
      if (s.onSill > 0 || s.sillGone) return null;
      var ab = this.standing(s) + this.standing2(s);
      if (n !== 0 && n !== ab) return null;
      var x = this._copy(s);
      x.sillPred = n;
      return x;
    },

    /* ⭐⭐ THE SILL. Both leftovers step onto one plate, and the plate
       is exactly as wide as the archway. A full plate is a rank. */
    toSill: function (st) {
      var s = this._st(st);
      if (s.sillPred === null) return null;
      if (s.onSill !== 0 || s.sillGone) return null;
      var a = this.standing(s), b = this.standing2(s);
      if (a + b === 0) return null;
      var x = this._copy(s);
      x.onSill = a + b;
      return x;
    },

    sillFull: function (st) {
      var s = this._st(st);
      return s.onSill > 0 && s.onSill % s.k === 0;
    },

    /* a full plate is a rank, and a rank goes through */
    sillThrough: function (st) {
      var s = this._st(st);
      if (!this.sillFull(s)) return null;
      var x = this._copy(s);
      x.onSill = 0; x.sillGone = true;
      return x;
    },

    /* ⚠⚠ THERE IS NO setWidth AND NO bringSecond. setWidth once
       shipped with zero call sites announcing an invariant it never
       enforced; bringSecond refused multiples of k, which RIGGED the
       theorem. The width path is the settings chip -> reset(); the
       second parade path is setSecond, which refuses nothing but
       nonsense. */

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('pgt-wide');
      /* ⚠ THE SCROLL ESCAPE, FULL FORM — `overflow-y:auto` alone is
         inert against the shell's html,body{height:100%}; a control
         row at y=558 in a 568px window is physically unreachable. */
      document.documentElement.classList.add('pgt-scroll');
      document.body.classList.add('pgt-scroll');

      this._lastSound = 0;
      this._seed = 11;
      this._flying = false;
      this._autoTimer = null;
      this._sillTimer = null;
      this._raf = null;
      this._chipSig = '';
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.n, 0);
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () {
      this._stopMotion();
      this.st = this.newState(this.api.settings.n, 0);
      this.render();
    },

    onSettings: function () { this.reset(); },

    _stopMotion: function () {
      if (this._raf) { window.cancelAnimationFrame(this._raf); this._raf = null; }
      if (this._autoTimer) { window.clearTimeout(this._autoTimer); this._autoTimer = null; }
      if (this._sillTimer) { window.clearTimeout(this._sillTimer); this._sillTimer = null; }
      if (this._fly) { while (this._fly.firstChild) this._fly.removeChild(this._fly.firstChild); }
      this._flying = false;
      this._auto = false;
    },

    /* ⚠ not Math.random: the gate, the probe and the classroom must
       see the same parades, and a screenshot must be reproducible. */
    _rand: function (n) {
      this._seed = (this._seed * 1103515245 + 12345) & 0x7fffffff;
      return this._seed % n;
    },

    /* the surprise parade — uniform, 3..CAP. ⚠ The old engineered
       one-third-even distribution is gone: it taught the probability
       behaviour of the apparatus, not the structure of numbers. */
    _pick: function () {
      return 3 + this._rand(GEO.CAP - 2);
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (f, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.T_SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(f);
    },

    _fmt: function (s, v) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (v && v[k] != null) ? String(v[k]) : m;
      });
    },

    /* ⭐ every announcement is ALSO shown to sighted eyes on the
       say-line — the teaching sentences were AT-only for a year.
       api.announce stays the single AT channel (the say-line is
       aria-hidden), so nothing is spoken twice. */
    _say: function (msg) {
      this.api.announce(msg);
      if (this._sayEl) this._sayEl.textContent = msg;
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _svgNS: 'http://www.w3.org/2000/svg',
    _svgEl: function (tag, attrs) {
      var el = document.createElementNS(this._svgNS, tag), k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) el.setAttribute(k, String(attrs[k]));
      return el;
    },
    /* a 26x26 miniature of the apparatus for a button glyph — wall
       #146B5E, bar #0D4E44, marcher coral-in-ring, seat dashed grey.
       ⚠ never an operator glyph, drawn or typed. */
    _mini: function (parts) {
      var svg = this._svgEl('svg', { viewBox: '0 0 26 26', width: 24, height: 24, 'aria-hidden': 'true', focusable: 'false' });
      var i, p, el;
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        if (p.t === 'wall') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, rx: 1, fill: '#146B5E' });
        else if (p.t === 'bar') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, rx: 1.25, fill: '#0D4E44' });
        else if (p.t === 'road') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, fill: '#FBF3E4', stroke: '#E7DCC8', 'stroke-width': 1 });
        else if (p.t === 'plate') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, rx: 2, fill: '#FBF3E4', stroke: '#7A6A55', 'stroke-width': 1.8 });
        else if (p.t === 'lip') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, fill: '#7A6A55' });
        else if (p.t === 'm') el = this._svgEl('circle', { cx: p.x, cy: p.y, r: 2.6, fill: '#F2784B', stroke: '#A34122', 'stroke-width': 1.2 });
        else if (p.t === 'seat') el = this._svgEl('circle', { cx: p.x, cy: p.y, r: 2.6, fill: 'none', stroke: '#7A6A55', 'stroke-width': 1.5, 'stroke-dasharray': '2.1 2.1' });
        else continue;
        svg.appendChild(el);
      }
      return svg;
    },

    /* a labeled action button: miniature (or text glyph) + VISIBLE
       localized label. The seven cryptic glyphs are gone. */
    _mkBtn: function (parent, cls, key, mini, glyph) {
      var b = this.api.el('button', 'pgt-btn ' + cls);
      b.type = 'button';
      if (mini) {
        var g = this.api.el('span', 'pgt-gly');
        g.setAttribute('aria-hidden', 'true');
        g.appendChild(mini);
        b.appendChild(g);
      } else if (glyph) {
        var g2 = this.api.el('span', 'pgt-gly pgt-gly-t');
        g2.setAttribute('aria-hidden', 'true');
        g2.textContent = glyph;
        b.appendChild(g2);
      }
      var t = this.api.el('span', 'pgt-lab');
      t.textContent = this.api.t(key);
      b.appendChild(t);
      b.setAttribute('aria-label', this.api.t(key));
      parent.appendChild(b);
      return b;
    },

    _mkGroup: function (parent, cls, legendKey) {
      var g = this.api.el('div', 'pgt-g ' + cls);
      if (legendKey) {
        var l = this.api.el('span', 'pgt-leg');
        l.textContent = this.api.t(legendKey);
        g.appendChild(l);
      }
      parent.appendChild(g);
      return g;
    },

    _build: function () {
      var api = this.api, self = this, i;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'pgt-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'pgt-card');
      this._card = card;
      var arena = api.el('div', 'pgt-arena');
      this._arena = arena;
      arena.setAttribute('role', 'img');

      /* --- the courtyard beyond ---------------------------------- */
      var far = api.el('div', 'pgt-far');
      this._far = far;
      this._numThru = api.el('span', 'pgt-num pgt-num-thru');
      far.appendChild(this._numThru);
      this._yard = api.el('div', 'pgt-yard');
      far.appendChild(this._yard);
      this._files = api.el('div', 'pgt-files');
      far.appendChild(this._files);
      arena.appendChild(far);

      /* --- the wall and the archway ------------------------------ */
      var wallrow = api.el('div', 'pgt-wallrow');
      this._wallrow = wallrow;
      var wingL = api.el('div', 'pgt-wing');
      wingL.appendChild(api.el('div', 'pgt-course'));
      var arch = api.el('div', 'pgt-arch');
      this._arch = arch;
      var open = api.el('div', 'pgt-open');
      arch.appendChild(open);
      var jambL = api.el('div', 'pgt-jamb pgt-jamb-l');
      var jambR = api.el('div', 'pgt-jamb pgt-jamb-r');
      arch.appendChild(jambL);
      arch.appendChild(jambR);
      this._bar = api.el('div', 'pgt-bar');
      arch.appendChild(this._bar);
      var wingR = api.el('div', 'pgt-wing');
      wingR.appendChild(api.el('div', 'pgt-course'));
      var head = api.el('div', 'pgt-head');
      this._key = api.el('div', 'pgt-key');
      wallrow.appendChild(wingL);
      wallrow.appendChild(arch);
      wallrow.appendChild(wingR);
      wallrow.appendChild(head);
      wallrow.appendChild(this._key);
      arena.appendChild(wallrow);

      /* --- the road: sill, first parade, second parade ----------- */
      var near = api.el('div', 'pgt-near');
      this._near = near;
      this._numSill = api.el('span', 'pgt-num pgt-num-sill');
      near.appendChild(this._numSill);
      this._sill = api.el('div', 'pgt-sill');
      near.appendChild(this._sill);
      var waitzone = api.el('div', 'pgt-waitzone');
      this._numN = api.el('span', 'pgt-num pgt-num-n');
      waitzone.appendChild(this._numN);
      this._wait = api.el('div', 'pgt-wait');
      waitzone.appendChild(this._wait);
      this._numStand = api.el('span', 'pgt-num pgt-num-stand');
      waitzone.appendChild(this._numStand);
      near.appendChild(waitzone);
      var seczone = api.el('div', 'pgt-seczone');
      this._sec = api.el('div', 'pgt-sec');
      seczone.appendChild(this._sec);
      this._numStand2 = api.el('span', 'pgt-num pgt-num-stand2');
      seczone.appendChild(this._numStand2);
      near.appendChild(seczone);
      arena.appendChild(near);

      /* --- the fly layer (persistent-node march) ----------------- */
      this._fly = api.el('div', 'pgt-fly');
      arena.appendChild(this._fly);

      card.appendChild(arena);
      wrap.appendChild(card);

      /* --- the say-line: the announce channel, visible ----------- */
      this._sayEl = api.el('p', 'pgt-say');
      this._sayEl.setAttribute('aria-hidden', 'true');
      wrap.appendChild(this._sayEl);

      /* --- the act strip ----------------------------------------- */
      var ctl = api.el('div', 'pgt-ctl');
      this._btn = {};

      this._gSize = this._mkGroup(ctl, 'pgt-g-size', 'sizeAsk');
      var strip = api.el('div', 'pgt-strip');
      this._strip = strip;
      this._sizeChips = [];
      for (i = 1; i <= GEO.CAP; i++) {
        (function (n) {
          var c = api.el('button', 'pgt-btn pgt-b-size pgt-b-size-' + n);
          c.type = 'button';
          c.textContent = String(n);
          c.setAttribute('aria-label', self._fmt(api.t('sizeChip'), { n: n }));
          c.addEventListener('click', function () { self._onSize(n); });
          strip.appendChild(c);
          self._sizeChips.push(c);
        }(i));
      }
      this._gSize.appendChild(strip);

      this._gPred = this._mkGroup(ctl, 'pgt-g-pred', 'predAsk');
      this._chips = api.el('div', 'pgt-chips');
      this._gPred.appendChild(this._chips);

      this._gMarch = this._mkGroup(ctl, 'pgt-g-march', null);
      this._btn.call = this._mkBtn(this._gMarch, 'pgt-b-call', 'call', this._mini([
        { t: 'wall', x: 0, y: 12, w: 7, h: 9 }, { t: 'wall', x: 19, y: 12, w: 7, h: 9 },
        { t: 'bar', x: 8, y: 9, w: 10, h: 2.5 },
        { t: 'm', x: 10, y: 17 }, { t: 'm', x: 16, y: 17 }
      ]));

      this._gTheorem = this._mkGroup(ctl, 'pgt-g-theorem', null);
      this._btn.second = this._mkBtn(this._gTheorem, 'pgt-b-second', 'second', this._mini([
        { t: 'road', x: 10, y: 2, w: 6, h: 22 },
        { t: 'm', x: 13, y: 21 }, { t: 'm', x: 13, y: 14.6 }
      ]));
      this._btn.sill = this._mkBtn(this._gTheorem, 'pgt-b-sill', 'sill', this._mini([
        { t: 'plate', x: 3, y: 10, w: 20, h: 9 },
        { t: 'lip', x: 4.5, y: 19, w: 17, h: 2 },
        { t: 'm', x: 9, y: 14.5 }, { t: 'seat', x: 17, y: 14.5 }
      ]));

      this._gHouse = this._mkGroup(ctl, 'pgt-g-house', null);
      this._btn.again = this._mkBtn(this._gHouse, 'pgt-b-again', 'again', null, '↻');
      this._btn.print = this._mkBtn(this._gHouse, 'pgt-b-print', 'printBtn', null, '⎙');

      this._btn.call.addEventListener('click', function () { self._call(); });
      this._btn.second.addEventListener('click', function () { self._second(); });
      this._btn.sill.addEventListener('click', function () { self._sillMove(); });
      this._btn.again.addEventListener('click', function () { self._again(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      wrap.appendChild(ctl);
      api.stage.appendChild(wrap);

      /* ⚠ the sheet is a SIBLING of the wrap — a hidden parent kills
         the whole subtree and measures 0mm on paper. */
      this._sheet = api.el('div', 'pgt-sheet');
      api.stage.appendChild(this._sheet);
    },

    /* the prediction chips rebuild when the question changes:
       0..k-1 for a parade, {0, a+b} for the sill. */
    _buildChips: function (mode, k, ab) {
      var api = this.api, self = this, host = this._chips, i;
      var sig = mode + ':' + k + ':' + ab;
      if (sig === this._chipSig) return;
      this._chipSig = sig;
      while (host.firstChild) host.removeChild(host.firstChild);
      this._predChips = [];
      var values = [];
      if (mode === 'sill') { values = [0, ab]; }
      else { for (i = 0; i < k; i++) values.push(i); }
      for (i = 0; i < values.length; i++) {
        (function (v, idx) {
          var cls = 'pgt-btn pgt-b-pred';
          if (mode !== 'sill' && v === 0) cls += ' pgt-b-yes';
          if (mode !== 'sill' && v === 1) cls += ' pgt-b-no';
          if (mode !== 'sill' && v >= 2) cls += ' pgt-b-pred' + v;
          if (mode === 'sill') cls += (v === 0 ? ' pgt-b-yes' : ' pgt-b-predsill');
          var c = api.el('button', cls);
          c.type = 'button';
          var num = api.el('span', 'pgt-num-chip');
          num.textContent = String(v);
          c.appendChild(num);
          /* the miniature outcome: v marchers left standing beside
             (k-v) dashed seats — chip 0 is a full rank. The chip IS
             the end-state photograph, so a non-reader can pick. */
          var mini = api.el('span', 'pgt-pmini');
          var j;
          for (j = 0; j < Math.min(k, 5); j++) {
            if (v === 0 || j < v) mini.appendChild(api.el('span', 'pgt-pmini-m'));
            else mini.appendChild(api.el('span', 'pgt-pmini-s'));
          }
          c.appendChild(mini);
          c.setAttribute('aria-label', v === 0 ? api.t('predYes') : self._fmt(api.t('predChip'), { s: v }));
          c.setAttribute('aria-pressed', 'false');
          c.addEventListener('click', function () { self._onPred(v); });
          host.appendChild(c);
          self._predChips.push({ el: c, v: v });
        }(values[i], i));
      }
    },

    /* ---- moves wired to chrome ------------------------------------ */

    _onSize: function (n) {
      if (this._flying) return;
      var s = this.st;
      var first = this.setTotal(null, n);
      if (first) {
        this.st = first;
        this._paint(GEO.T_BAR);
        this._snd(GEO.SND_CALL);
        this._say(this._fmt(this.api.t('saidParade'), { n: n }));
        return;
      }
      var two = this.setSecond(null, n);
      if (two) {
        this.st = two;
        this._paint(GEO.T_BAR);
        this._snd(GEO.SND_CALL);
        this._say(this._fmt(this.api.t('saidParade'), { n: n }));
        return;
      }
      if (!this.done(s)) { this._refuse('marchon'); return; }
      if (this.standing(s) === 0) { this._refuse('clear'); return; }
      if (s.pred2 !== null) { this._refuse('secondhere'); return; }
      this._refuse('pred');
    },

    _onPred: function (v) {
      if (this._flying) return;
      var s = this.st, next;
      next = this.predict(null, v);
      if (next) {
        this.st = next;
        this._paint(GEO.T_BAR);
        this._snd(GEO.SND_BAR);
        this._say(v === 0 ? this.api.t('saidPredYes') : this._fmt(this.api.t('saidPredN'), { s: v }));
        return;
      }
      next = this.predict2(null, v);
      if (next) {
        this.st = next;
        this._paint(GEO.T_BAR);
        this._snd(GEO.SND_BAR);
        this._say(this._fmt(this.api.t('saidPred2'), { s: v }));
        return;
      }
      next = this.predictSill(null, v);
      if (next) {
        this.st = next;
        this._paint(GEO.T_BAR);
        this._snd(GEO.SND_BAR);
        this._say(this.api.t('saidPredSill'));
        return;
      }
      if (s.total === 0) { this._refuse('choosefirst'); return; }
      this._refuse('pred');
    },

    _call: function () {
      if (this._flying) return;
      var api = this.api, self = this, s = this.st;
      var next = this.sendRank(null);
      if (!next) {
        if (s.total === 0) { this._refuse('choosefirst'); return; }
        if (s.pred === null) { this._refuse('bar'); return; }
        this._refuse(this.standing(s) === 0 ? 'clear' : 'stand');
        return;
      }
      this._flyRankFrom(this._wait, next, function () {
        if (self.done(null)) {
          var st = self.standing(null);
          self._say(st === 0
            ? self._fmt(api.t('saidClear'), { n: self.st.total, r: self.st.ranks, k: self.st.k })
            : self._fmt(api.t('saidStand'), { s: st, n: self.st.total, k: self.st.k }));
        } else {
          self._say(self._fmt(api.t('saidRank'), { n: self.through(null), w: self.waiting(null) }));
        }
      });
    },

    /* the second parade marches BEHIND ITS OWN COMMITTED PREDICTION —
       first parade by action, second by anticipation. */
    _second: function () {
      if (this._flying || this._auto) return;
      var api = this.api, self = this, s = this.st;
      if (s.pred2 === null || !this.sendRank2(null)) {
        if (s.total === 0) { this._refuse('choosefirst'); return; }
        if (!this.done(s)) { this._refuse('marchon'); return; }
        if (this.standing(s) === 0) { this._refuse('clear'); return; }
        if (s.second === null) { this._refuse('choosefirst'); return; }
        if (s.pred2 === null) { this._refuse('bar'); return; }
        if (this.done2(s)) { this._refuse('secondhere'); return; }
        this._refuse('pred');
        return;
      }
      this._auto = true;
      var step = function () {
        var next = self.sendRank2(null);
        if (!next) {
          self._auto = false;
          var b = self.standing2(null);
          self._paint();
          self._say(b > 0
            ? self._fmt(api.t('saidSecond'), { n: self.st.second, s: b })
            : self._fmt(api.t('saidSecondClear'), { n: self.st.second }));
          return;
        }
        self._flyRankFrom(self._sec, next, function () {
          self._autoTimer = window.setTimeout(step, self._dur(GEO.T_STEP2));
        });
      };
      step();
    },

    _sillMove: function () {
      if (this._flying) return;
      var api = this.api, self = this, s = this.st;
      var next = this.toSill(null);
      if (!next) {
        if (s.onSill > 0) { this._refuse('onsill'); return; }
        if (s.sillGone) { this._refuse('clear'); return; }
        if (s.second === null) { this._refuse('nosecond'); return; }
        if (!this.done2(s)) { this._refuse('marchon'); return; }
        if (this.standing2(s) === 0) { this._refuse('secondclear'); return; }
        if (s.sillPred === null) { this._refuse('bar'); return; }
        this._refuse('nosecond');
        return;
      }
      var a = this.standing(s), b = this.standing2(s);
      this.st = next;
      this._snd(GEO.SND_SILL);
      this._flyToSill(function () {
        /* ⚠ THE BEAT. The class must see two leftovers standing on
           ONE plate before it becomes a rank, or the theorem reads as
           a trick. Not through _dur(): a wait is not movement. */
        self._sillTimer = window.setTimeout(function () {
          if (self.sillFull(null)) {
            self._sill.classList.add('is-rank');
            self._sillTimer = window.setTimeout(function () {
              var after = self.sillThrough(null);
              if (!after) return;
              self.st = after;
              self._flySillThrough(function () {
                self._sill.classList.remove('is-rank');
                self._paint();
                self._snd(GEO.SND_THROUGH, true);
                self._say(self._fmt(api.t('saidSill'), { a: a, b: b }));
              });
            }, self._dur(GEO.T_RECOLOR) + 60);
          } else {
            self._say(self._fmt(api.t('saidSillShort'), { a: a, b: b, c: a + b, k: self.st.k }));
          }
        }, GEO.T_SILL);
      });
    },

    _again: function () {
      if (this._flying) return;
      this._stopMotion();
      var t = this._pick();
      this.st = this.newState(this.api.settings.n, t);
      this._chipSig = '';
      this._paint(GEO.T_BAR);
      this._snd(GEO.SND_CALL);
      this._say(this._fmt(this.api.t('saidParade'), { n: t }));
    },

    _refuse: function (why) {
      var api = this.api, self = this, a = this._arena;
      this._snd(GEO.SND_REFUSE, true);
      if (a) {
        a.classList.add('is-refuse');
        if (why === 'bar') this._bar.classList.add('is-hold');
        if (why === 'stand') this._wait.classList.add('is-point');
        window.setTimeout(function () {
          a.classList.remove('is-refuse');
          self._bar.classList.remove('is-hold');
          self._wait.classList.remove('is-point');
        }, self._dur(GEO.T_REFUSE));
      }
      if (why === 'bar') { this._say(api.t('saidBarDown')); return; }
      if (why === 'choosefirst') { this._say(api.t('saidChooseFirst')); return; }
      if (why === 'marchon') { this._say(api.t('saidMarchOn')); return; }
      if (why === 'secondhere') { this._say(api.t('saidSecondHere')); return; }
      if (why === 'secondclear') { this._say(this._fmt(api.t('saidSecondClear'), { n: this.st.second })); return; }
      if (why === 'nosecond') { this._say(api.t('saidNoSecond')); return; }
      if (why === 'onsill') { this._say(api.t('saidOnSill')); return; }
      if (why === 'clear') { this._say(api.t('saidAllThrough')); return; }
      if (why === 'pred') { this._say(api.t('saidBusy')); return; }
      var s = this.st;
      this._say(this._fmt(api.t('saidStand'), { s: this.standing(s), n: s.total, k: s.k }));
    },

    /* ---- the fly engine (persistent nodes, one interpolator) ------- */

    _ease: function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    /* move real marcher nodes from measured start rects to measured
       destination rects under ONE rAF interpolator; every item
       arrives in the SAME frame — a rank is one thing. */
    _flyNodes: function (items, dur, crossY, done, startSnd) {
      var self = this, i;
      if (!items.length) { if (done) done(); return; }
      this._flying = true;
      var arenaRect = this._arena.getBoundingClientRect();
      var flies = [];
      for (i = 0; i < items.length; i++) {
        var it = items[i];
        var holder = this.api.el('div', 'pgt-flyer');
        holder.style.left = (it.from.left - arenaRect.left) + 'px';
        holder.style.top = (it.from.top - arenaRect.top) + 'px';
        holder.appendChild(it.node);
        this._fly.appendChild(holder);
        flies.push({
          el: holder,
          dx: it.to.left - it.from.left,
          dy: it.to.top - it.from.top,
          y0: it.from.top - arenaRect.top
        });
      }
      var t0 = null, crossed = false;
      var frame = function (ts) {
        if (t0 === null) t0 = ts;
        var t = Math.min(1, (ts - t0) / dur);
        var e = self._ease(t), j;
        for (j = 0; j < flies.length; j++) {
          flies[j].el.style.transform = 'translate(' + (flies[j].dx * e) + 'px,' + (flies[j].dy * e) + 'px)';
        }
        if (!crossed && crossY !== null && flies[0].y0 + flies[0].dy * e < crossY) {
          crossed = true;
          self._snd(GEO.SND_THROUGH, true);
        }
        if (t < 1) { self._raf = window.requestAnimationFrame(frame); return; }
        self._raf = null;
        while (self._fly.firstChild) self._fly.removeChild(self._fly.firstChild);
        self._flying = false;
        if (done) done();
      };
      if (startSnd) this._snd(startSnd, true);
      this._raf = window.requestAnimationFrame(frame);
    },

    /* one rank leaves `host` (wait or sec) and lands in the yard */
    _flyRankFrom: function (host, nextState, done) {
      var self = this;
      var srcRow = host.firstChild;
      if (!srcRow) { this.st = nextState; this._paint(GEO.T_RANK); if (done) done(); return; }
      var srcMs = srcRow.querySelectorAll('.pgt-m');
      var froms = [], i;
      for (i = 0; i < srcMs.length; i++) froms.push(srcMs[i].getBoundingClientRect());
      this.st = nextState;
      this._paint(GEO.T_RANK);
      var destRow = this._yard.lastChild;
      if (!destRow) { if (done) done(); return; }
      var destMs = destRow.querySelectorAll('.pgt-m');
      destRow.style.visibility = 'hidden';
      var items = [];
      for (i = 0; i < destMs.length && i < srcMs.length; i++) {
        items.push({ node: srcMs[i], from: froms[i], to: destMs[i].getBoundingClientRect() });
      }
      var arenaRect = this._arena.getBoundingClientRect();
      var wallRect = this._wallrow.getBoundingClientRect();
      this._flyNodes(items, this._dur(GEO.T_RANK), wallRect.bottom - arenaRect.top, function () {
        destRow.style.visibility = '';
        if (done) done();
      }, GEO.SND_CALL);
    },

    /* both leftovers step onto the plate, same frame */
    _flyToSill: function (done) {
      var self = this, i;
      var srcA = this._wait.querySelectorAll('.pgt-m');
      var srcB = this._sec.querySelectorAll('.pgt-m');
      var froms = [], nodes = [];
      for (i = 0; i < srcA.length; i++) { nodes.push(srcA[i]); froms.push(srcA[i].getBoundingClientRect()); }
      for (i = 0; i < srcB.length; i++) { nodes.push(srcB[i]); froms.push(srcB[i].getBoundingClientRect()); }
      this._paint(GEO.T_RANK);
      var dest = this._sill.querySelectorAll('.pgt-m');
      var items = [];
      for (i = 0; i < dest.length && i < nodes.length; i++) {
        dest[i].style.visibility = 'hidden';
        items.push({ node: nodes[i], from: froms[i], to: dest[i].getBoundingClientRect() });
      }
      this._flyNodes(items, this._dur(GEO.T_RANK), null, function () {
        var d = self._sill.querySelectorAll('.pgt-m'), j;
        for (j = 0; j < d.length; j++) d[j].style.visibility = '';
        if (done) done();
      }, null);
    },

    /* the full plate takes the byte-identical rank march every rank
       gets — no flourish; production values can deliver a verdict. */
    _flySillThrough: function (done) {
      var self = this, i;
      var srcMs = this._sill.querySelectorAll('.pgt-m');
      var froms = [], nodes = [];
      for (i = 0; i < srcMs.length; i++) { nodes.push(srcMs[i]); froms.push(srcMs[i].getBoundingClientRect()); }
      this._paint(GEO.T_RANK);
      var destRow = this._yard.lastChild;
      if (!destRow) { if (done) done(); return; }
      var destMs = destRow.querySelectorAll('.pgt-m');
      destRow.style.visibility = 'hidden';
      var items = [];
      for (i = 0; i < destMs.length && i < nodes.length; i++) {
        items.push({ node: nodes[i], from: froms[i], to: destMs[i].getBoundingClientRect() });
      }
      var arenaRect = this._arena.getBoundingClientRect();
      var wallRect = this._wallrow.getBoundingClientRect();
      this._flyNodes(items, this._dur(GEO.T_RANK), wallRect.bottom - arenaRect.top, function () {
        destRow.style.visibility = '';
        if (done) done();
      }, null);
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
               byte-identically to every other marcher; what is drawn
               is the PLACE BESIDE IT that nobody filled. */
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
      this._card.style.setProperty('--pgt-k', String(s.k));
      this._key.textContent = String(s.k);

      var a = this.standing(s), b = this.standing2(s);
      var afterSill = s.onSill > 0 || s.sillGone;
      var yardN = this.yardCount(s);

      /* the yard: full ranks through, tight files */
      this._row(this._yard, yardN, s.k, null);
      this._yard.setAttribute('aria-label', this._fmt(api.t('ariaThrough'), { n: yardN, r: this.yardRanks(s) }));

      /* the waiting parade; its leftover leaves for the sill later */
      var waitShown = this.waiting(s) - (afterSill ? a : 0);
      if (waitShown < 0) waitShown = 0;
      var standNow = this.done(s) && s.pred !== null && !afterSill;
      this._row(this._wait, waitShown, s.k, { seats: standNow && a > 0 });
      this._wait.setAttribute('aria-label', standNow && a > 0
        ? this._fmt(api.t('ariaStand'), { n: a, e: s.k - a })
        : this._fmt(api.t('ariaWaiting'), { n: waitShown }));

      /* the second parade */
      var secShown = s.second === null ? 0 : this.waiting2(s) - (afterSill ? b : 0);
      if (secShown < 0) secShown = 0;
      var stand2Now = this.done2(s) && !afterSill;
      this._sec.parentNode.style.display = s.second === null ? 'none' : '';
      if (s.second !== null) {
        this._row(this._sec, secShown, s.k, { seats: stand2Now && b > 0 });
        this._sec.setAttribute('aria-label', stand2Now && b > 0
          ? this._fmt(api.t('ariaStand'), { n: b, e: s.k - b })
          : this._fmt(api.t('ariaWaiting'), { n: secShown }));
      }

      /* the sill */
      this._sill.style.display = s.onSill === 0 ? 'none' : '';
      if (s.onSill > 0) {
        this._row(this._sill, s.onSill, s.k, { seats: !this.sillFull(s) });
        this._sill.setAttribute('aria-label', api.t('ariaSill'));
      }
      this._sill.classList.toggle('is-full', this.sillFull(s));

      /* numerals — the reveal discipline */
      this._numThru.textContent = yardN > 0 ? String(yardN) : '';
      this._numN.textContent = (s.total > 0 && s.ranks === 0 && s.ranks2 === 0 && !(s.pred !== null && this.done(s)))
        ? String(s.total) : '';
      this._numStand.textContent = (standNow && a > 0) ? String(a) : '';
      this._numStand2.textContent = (stand2Now && b > 0) ? String(b) : '';
      this._numSill.textContent = s.onSill > 0 ? String(s.onSill) : '';
      /* the per-column counts, only at standstill */
      while (this._files.firstChild) this._files.removeChild(this._files.firstChild);
      if (s.pred !== null && this.done(s) && yardN > 0) {
        var perFile = this.yardRanks(s), i;
        for (i = 0; i < s.k; i++) {
          var f = api.el('span', 'pgt-file');
          f.textContent = String(perFile);
          this._files.appendChild(f);
        }
      }

      /* the boom */
      this._bar.classList.toggle('is-up', this.barUp(s));

      /* ---- the act strip: rails, dimming and prominence are all
         derived from the MOVES, never from a flag ----------------- */
      var canSize = !!(this.setTotal(null, 1) || this.setSecond(null, 1));
      var ab = a + b;
      var predMode = null;
      if (this.predict(null, 0) || this.predict2(null, 0)) predMode = 'k';
      else if (this.predictSill(null, 0)) predMode = 'sill';
      var canCall = !!this.sendRank(null);
      var canSecond = s.pred2 !== null && !!this.sendRank2(null);
      var canSill = !!this.toSill(null);

      /* the sill chips stay visible while the sill question is live,
         so the committed chip remains the on-record claim */
      var chipMode = (predMode === 'sill' || (s.sillPred !== null && !s.sillGone)) ? 'sill' : 'k';
      this._buildChips(chipMode, s.k, ab);

      var j;
      for (j = 0; j < this._sizeChips.length; j++) {
        this._sizeChips[j].classList.toggle('is-off', !canSize);
      }
      for (j = 0; j < this._predChips.length; j++) {
        var chip = this._predChips[j];
        chip.el.classList.toggle('is-off', predMode === null);
        var pressed = false;
        if (chipMode === 'sill') pressed = (s.sillPred !== null && chip.v === s.sillPred);
        else if (s.second !== null && s.pred2 !== null) pressed = (chip.v === s.pred2);
        else if (s.pred !== null) pressed = (chip.v === s.pred);
        chip.el.setAttribute('aria-pressed', pressed ? 'true' : 'false');
      }

      this._btn.call.classList.toggle('is-off', !canCall);
      this._btn.second.classList.toggle('is-off', !canSecond);
      this._btn.sill.classList.toggle('is-off', !canSill);

      this._gSize.classList.toggle('is-here', canSize);
      this._gPred.classList.toggle('is-here', predMode !== null);
      this._gMarch.classList.toggle('is-here', canCall);
      this._gTheorem.classList.toggle('is-here', canSecond || canSill);
      var anyNow = canSize || predMode !== null || canCall || canSecond || canSill;
      this._gHouse.classList.toggle('is-here', !anyNow);

      this._btn.call.classList.toggle('is-now', canCall);
      this._btn.second.classList.toggle('is-now', canSecond);
      this._btn.sill.classList.toggle('is-now', canSill);
      this._btn.again.classList.toggle('is-now', !anyNow);

      /* the print chip states its requirement */
      this._btn.print.classList.toggle('is-paid', !!this.premium);
      var pk = this.premium ? 'printBtn' : 'printAsk';
      this._btn.print.querySelector('.pgt-lab').textContent = api.t(pk);
      this._btn.print.setAttribute('aria-label', api.t(pk));
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

    /* the desk mat: a standable archway, twenty marchers, the
       fold-to-width plate, the yard mat, and the prediction row —
       the same choose -> commit -> march -> empty-seat grammar,
       plus the one thing the whiteboard never does: recording. */
    _buildSheet: function () {
      var api = this.api, self = this, s = this.st, i;
      var host = this._sheet;
      while (host.firstChild) host.removeChild(host.firstChild);
      var h = api.el('h2', 'pgt-sheet-h'); h.textContent = api.t('sheetTitle');
      var note = api.el('p', 'pgt-sheet-note'); note.textContent = api.t('sheetNote');
      host.appendChild(h); host.appendChild(note);

      function svg(w, hh, vw, vh) {
        var el = self._svgEl('svg', { viewBox: '0 0 ' + vw + ' ' + vh });
        el.setAttribute('class', 'pgt-p-svg');
        el.style.width = w + 'mm';
        el.style.height = hh + 'mm';
        return el;
      }
      function line(p, x1, y1, x2, y2, dash) {
        var l = self._svgEl('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: '#000', 'stroke-width': 0.35 });
        if (dash) l.setAttribute('stroke-dasharray', dash);
        p.appendChild(l);
      }
      function rect(p, x, y, w, hh, opts) {
        var r = self._svgEl('rect', { x: x, y: y, width: w, height: hh, fill: 'none', stroke: '#000', 'stroke-width': (opts && opts.sw) || 0.35 });
        if (opts && opts.rx) r.setAttribute('rx', opts.rx);
        if (opts && opts.dash) r.setAttribute('stroke-dasharray', opts.dash);
        p.appendChild(r);
      }
      function circle(p, cx, cy, r, dash) {
        var c = self._svgEl('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: '#000', 'stroke-width': 0.35 });
        if (dash) c.setAttribute('stroke-dasharray', dash);
        p.appendChild(c);
      }
      function text(p, x, y, str, size) {
        var t = self._svgEl('text', { x: x, y: y, 'font-family': "'Baloo 2',sans-serif", 'font-size': size || 4, fill: '#000', 'text-anchor': 'middle' });
        t.textContent = str;
        p.appendChild(t);
      }

      /* 1 — the standable archway (fold the flaps back and it stands) */
      var arch = svg(160, 82, 160, 82);
      rect(arch, 0, 20, 160, 34);                       /* wall band */
      rect(arch, 52, 20, 56, 34, { sw: 0.6 });          /* the opening */
      line(arch, 55, 20, 55, 54); line(arch, 105, 20, 105, 54);   /* jambs */
      line(arch, 0, 31, 52, 31); line(arch, 0, 42, 52, 42);       /* coursing L */
      line(arch, 108, 31, 160, 31); line(arch, 108, 42, 160, 42); /* coursing R */
      var crest = this._svgEl('path', { d: 'M 46 20 A 34 16 0 0 1 114 20', fill: 'none', stroke: '#000', 'stroke-width': 0.6 });
      arch.appendChild(crest);
      var key = this._svgEl('path', { d: 'M 75.5 4 L 84.5 4 L 83.25 14 L 76.75 14 Z', fill: 'none', stroke: '#000', 'stroke-width': 0.5 });
      arch.appendChild(key);                            /* keystone — teacher writes k */
      line(arch, 0, 54, 52, 54, '3 1.5'); line(arch, 108, 54, 160, 54, '3 1.5'); /* fold lines */
      rect(arch, 0, 54, 52, 22); rect(arch, 108, 54, 52, 22);     /* base flaps */
      text(arch, 26, 68, '✂', 6); text(arch, 134, 68, '✂', 6);
      host.appendChild(arch);

      /* 2 — twenty marchers on a dashed cut grid (K-2 scissors cut squares) */
      var band = svg(170, 36, 170, 36);
      for (i = 0; i < GEO.CAP; i++) {
        var cx = 8.5 + (i % 10) * 17, cy = 9 + Math.floor(i / 10) * 17;
        rect(band, cx - 8.5, cy - 8.5, 17, 17, { dash: '2 1.2' });
        circle(band, cx, cy, 7);
        circle(band, cx, cy + 0.4, 5.6);
      }
      host.appendChild(band);

      /* 3 — the fold-to-width plate: five seats, fold to your archway */
      var plate = svg(92, 26, 92, 26);
      rect(plate, 1, 5, 88, 20, { rx: 2, sw: 0.6 });
      for (i = 0; i < 5; i++) {
        circle(plate, 10 + i * 17.2, 15, 7, '2.5 1.5');
        if (i >= 1 && i <= 3) line(plate, 18.6 + i * 17.2, 5, 18.6 + i * 17.2, 25, '2 1.2');
        if (i >= 1) text(plate, 10 + i * 17.2, 3.6, String(i + 1), 3.4);
      }
      host.appendChild(plate);

      /* 4 — the prediction row: circle a numeral BEFORE placing */
      var pr = svg(92, 14, 92, 14);
      for (i = 0; i < s.k; i++) {
        rect(pr, 2 + i * 14, 2, 11, 11, { rx: 1.5 });
        text(pr, 7.5 + i * 14, 10, String(i), 5.5);
      }
      host.appendChild(pr);

      /* 5 — the yard mat: ranks to lay the cut-out marchers into */
      var mat = svg(96, 60, 96, 60);
      rect(mat, 1, 1, 94, 58, { rx: 4, sw: 0.6 });
      for (i = 0; i < 15; i++) {
        circle(mat, 13 + (i % 5) * 17.2, 13 + Math.floor(i / 5) * 17.2, 7, '2.5 1.5');
      }
      host.appendChild(mat);
    }
  };

  function injectCSS() {
    function M(x) { return 'calc(var(--pgt-m) * ' + x + ')'; }
    var AW = 'var(--pgt-aw)';
    function seatURI(color) {
      return 'url("data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
        '<circle cx="50" cy="50" r="46" fill="none" stroke="' + color + '" stroke-width="6" ' +
        'stroke-linecap="round" stroke-dasharray="12.04 12.04"/></svg>') + '")';
    }
    var css = ''
      /* ⚠ THE SCROLL ESCAPE, FULL FORM. `html,body.x{}` is a selector
         LIST whose html half applies unconditionally; and overflow
         alone is inert against the shell's height:100%. */
      + 'html.pgt-scroll{overflow-y:auto;height:auto;min-height:100%;}'
      + 'body.pgt-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'

      + '.pgt-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.pgt-card{container-type:inline-size;width:100%;max-width:860px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'box-shadow:0 1px 0 #E7DCC8,0 10px 24px rgba(20,107,94,.10);'
      + 'padding:clamp(12px,2.6cqw,26px);--pgt-m:clamp(15px,3.4cqw,34px);--pgt-t:420ms;'
      + '--pgt-aw:calc(var(--pgt-k,2) * var(--pgt-m) + (var(--pgt-k,2) - 1) * var(--pgt-m) * .3 + var(--pgt-m) * .7);}'

      + '.pgt-arena{position:relative;display:flex;flex-direction:column;align-items:center;}'

      /* --- the courtyard beyond the wall --------------------------- */
      + '.pgt-far{position:relative;z-index:0;width:calc(' + AW + ' + ' + M(3.2) + ');'
      + 'min-height:' + M(2.2) + ';box-sizing:border-box;'
      + 'background-color:#FBF3E4;border:1.5px solid #E7DCC8;border-bottom:0;'
      + 'border-radius:14px 14px 0 0;padding:' + M(0.5) + ' ' + M(0.5) + ' ' + M(0.9) + ';'
      /* tucks BEHIND the wall band: the wallrow's own top margin (for
         the crest) must be fully re-absorbed or a cream gap opens —
         measured 5px of daylight on the first render */
      + 'margin-bottom:' + M(-1.05) + ';display:flex;flex-direction:column;align-items:center;}'
      + '.pgt-yard{display:flex;flex-direction:column;align-items:center;gap:' + M(0.16) + ';}'
      + '.pgt-files{display:flex;gap:' + M(0.3) + ';margin-top:' + M(0.16) + ';}'
      /* ⚠ floored like the keystone — 0.55m alone measured ~8px at 360 */
      + '.pgt-file{width:var(--pgt-m);text-align:center;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;color:#0E5147;'
      + 'font-size:max(12px,' + M(0.55) + ');line-height:1.1;}'

      /* --- the wall row: wings, opening, jambs, boom, crest -------- */
      + '.pgt-wallrow{position:relative;z-index:auto;display:flex;align-items:flex-end;'
      + 'width:100%;height:' + M(2.1) + ';margin-top:' + M(0.95) + ';'
      + 'transition:transform ' + GEO.T_THUD + 'ms ease-out;}'
      + '.pgt-wing{position:relative;z-index:2;flex:1;height:' + M(2.1) + ';background-color:#146B5E;}'
      + '.pgt-wing::before,.pgt-wing::after{content:"";position:absolute;left:0;right:0;height:2px;'
      + 'background-color:#0D4E44;opacity:.55;}'
      + '.pgt-wing::before{top:' + M(0.68) + ';}'
      + '.pgt-wing::after{top:' + M(1.36) + ';}'
      + '.pgt-course{position:absolute;left:0;right:0;bottom:0;height:' + M(0.24) + ';background-color:#0D4E44;}'
      + '.pgt-arch{position:relative;width:' + AW + ';height:' + M(2.1) + ';flex:none;}'
      + '.pgt-open{position:absolute;inset:0;z-index:2;background-color:#FBF3E4;}'
      + '.pgt-jamb{position:absolute;top:0;bottom:0;width:' + M(0.14) + ';z-index:4;background-color:#0D4E44;}'
      + '.pgt-jamb-l{left:0;}'
      + '.pgt-jamb-r{right:0;}'
      + '.pgt-head{position:absolute;left:50%;transform:translateX(-50%);bottom:' + M(2.1) + ';z-index:4;'
      + 'width:calc(' + AW + ' + ' + M(0.6) + ');height:' + M(0.95) + ';'
      + 'background-color:#146B5E;border-radius:999px 999px 0 0;}'
      /* ⚠ the keystone numeral measured 9px on the first render —
         a floor rides the module so the width stays legible always */
      + '.pgt-key{position:absolute;left:50%;transform:translateX(-50%);bottom:' + M(2.2) + ';z-index:5;'
      + 'width:max(18px,' + M(0.8) + ');height:max(20px,' + M(0.85) + ');background-color:#0D4E44;'
      + 'clip-path:polygon(14% 0,86% 0,100% 100%,0 100%);'
      + 'display:flex;align-items:center;justify-content:center;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;color:#FBF3E4;'
      + 'font-size:max(12px,' + M(0.5) + ');padding-top:' + M(0.06) + ';box-sizing:border-box;}'

      /* the boom: a two-tone plate resting on the jambs. ⚠ a lifted
         boom stays opacity 1 — it is still solid and will come back.
         ⚠ 0.34m at the slot's foot measured as a 7px sliver that read
         as wall coursing — the boom now sits at chest height, thick
         enough to BLOCK. */
      + '.pgt-bar{position:absolute;left:0;right:0;bottom:' + M(0.8) + ';height:' + M(0.46) + ';z-index:4;'
      + 'background-color:#0D4E44;border-radius:' + M(0.17) + ';'
      + 'transition-property:transform;transition-duration:var(--pgt-t);'
      + 'transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.pgt-bar::after{content:"";position:absolute;top:' + M(0.06) + ';left:' + M(0.12) + ';right:' + M(0.12) + ';'
      + 'height:' + M(0.1) + ';background-color:#146B5E;border-radius:2px;}'
      + '.pgt-bar.is-up{transform:translateY(' + M(-0.84) + ');}'
      + '.pgt-bar.is-hold{background-color:#A34122;}'

      /* --- the road below ------------------------------------------ */
      /* the road holds some length even before a parade is chosen —
         at rest it measured a 10px stub and the scene read as a wall
         floating in cream */
      + '.pgt-near{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;'
      + 'width:100%;margin-top:' + M(0.3) + ';padding-bottom:' + M(0.2) + ';min-height:' + M(2.6) + ';}'
      + '.pgt-near::before{content:"";position:absolute;z-index:-1;left:50%;transform:translateX(-50%);'
      + 'width:' + AW + ';top:' + M(-2.4) + ';bottom:0;background-color:#FBF3E4;'
      + 'box-shadow:inset 1.5px 0 0 #E7DCC8,inset -1.5px 0 0 #E7DCC8;}'
      + '.pgt-waitzone,.pgt-seczone{position:relative;display:flex;flex-direction:column;align-items:center;'
      + 'min-height:' + M(0.3) + ';}'
      + '.pgt-wait,.pgt-sec{display:flex;flex-direction:column;align-items:center;gap:' + M(0.34) + ';'
      + 'min-height:' + M(0.3) + ';}'
      + '.pgt-seczone{margin-top:' + M(0.9) + ';}'
      + '.pgt-rank{display:flex;gap:' + M(0.3) + ';}'

      /* --- the marcher: the house chip ----------------------------- */
      + '.pgt-m{position:relative;width:var(--pgt-m);height:var(--pgt-m);border-radius:50%;'
      + 'background-color:#A34122;flex:none;}'
      + '.pgt-m::before{content:"";position:absolute;left:' + M(0.1) + ';top:' + M(0.13) + ';'
      + 'width:' + M(0.8) + ';height:' + M(0.8) + ';border-radius:50%;background-color:#F2784B;}'
      + '.pgt-m::after{content:"";display:none;position:absolute;left:' + M(0.22) + ';top:' + M(0.28) + ';'
      + 'width:' + M(0.38) + ';height:' + M(0.2) + ';border-radius:50%;background-color:#FFFFFF;opacity:.2;}'
      + '@container (min-width:768px){.pgt-m::after{display:block;}}'

      /* ⭐⭐ THE EMPTY SEAT — an evenly dashed place, not a thing. */
      + '.pgt-seat{width:var(--pgt-m);height:var(--pgt-m);flex:none;'
      + 'background:' + seatURI('#7A6A55') + ' center/100% no-repeat;}'
      + '.pgt-wait.is-point .pgt-seat{background-image:' + seatURI('#A34122') + ';}'

      /* --- the sill: a plate exactly as wide as the archway -------- */
      + '.pgt-sill{position:relative;width:' + AW + ';box-sizing:border-box;'
      + 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
      + 'min-height:' + M(1.32) + ';padding:' + M(0.16) + ';margin-bottom:' + M(0.6) + ';'
      + 'background-color:#FBF3E4;border-radius:' + M(0.24) + ';'
      + 'box-shadow:inset 0 0 0 2.5px #7A6A55;'
      + 'transition:box-shadow ' + GEO.T_RECOLOR + 'ms linear;}'
      + '.pgt-sill::after{content:"";position:absolute;left:' + M(0.12) + ';right:' + M(0.12) + ';'
      + 'bottom:' + M(-0.2) + ';height:' + M(0.2) + ';background-color:#7A6A55;'
      + 'border-radius:0 0 ' + M(0.18) + ' ' + M(0.18) + ';'
      + 'transition:background-color ' + GEO.T_RECOLOR + 'ms linear;}'
      + '.pgt-sill.is-full.is-rank{box-shadow:inset 0 0 0 3px #146B5E;}'
      + '.pgt-sill.is-full.is-rank::after{background-color:#0D4E44;}'

      /* --- numerals on stage --------------------------------------- */
      + '.pgt-num{position:absolute;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
      + 'color:#0E5147;font-size:clamp(16px,4cqw,24px);line-height:1;}'
      + '.pgt-num-thru{top:' + M(0.25) + ';right:' + M(0.35) + ';position:absolute;}'
      + '.pgt-num-n{left:calc(50% - ' + AW + ' / 2 - ' + M(1.3) + ');top:0;}'
      + '.pgt-num-stand{right:calc(50% - ' + AW + ' / 2 - ' + M(1.3) + ');bottom:0;}'
      + '.pgt-num-stand2{right:calc(50% - ' + AW + ' / 2 - ' + M(1.3) + ');bottom:0;}'
      + '.pgt-num-sill{top:' + M(-0.75) + ';left:calc(50% + ' + AW + ' / 2 + ' + M(0.3) + ');}'

      /* --- the fly layer ------------------------------------------- */
      + '.pgt-fly{position:absolute;inset:0;z-index:3;pointer-events:none;}'
      + '.pgt-flyer{position:absolute;display:flex;gap:' + M(0.3) + ';will-change:transform;}'

      /* --- the refusal: the building answers ----------------------- */
      + '.pgt-arena.is-refuse .pgt-wallrow{transform:translateY(3px);}'
      + '.pgt-arena.is-refuse .pgt-jamb{background-color:#F2784B;box-shadow:inset 0 0 0 1.5px #A34122;}'

      /* --- the act strip ------------------------------------------- */
      + '.pgt-say{width:100%;max-width:860px;box-sizing:border-box;text-align:center;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#2A2A35;'
      + 'min-height:2.6em;margin:10px 0 0;line-height:1.3;}'
      + '.pgt-ctl{display:flex;flex-direction:column;gap:10px;width:100%;max-width:860px;'
      + 'box-sizing:border-box;margin-top:6px;}'
      + '.pgt-g{display:flex;flex-wrap:wrap;align-items:center;gap:8px;'
      + 'padding-left:12px;border-left:4px solid transparent;}'
      + '.pgt-g.is-here{border-left-color:#146B5E;}'
      + '.pgt-leg{flex:none;width:100%;font-family:Nunito,system-ui,sans-serif;font-size:13px;'
      + 'font-weight:700;color:#2A2A35;}'
      + '.pgt-strip{display:flex;flex-wrap:wrap;gap:6px;}'
      + '.pgt-chips{display:flex;flex-wrap:wrap;gap:8px;}'

      + '.pgt-btn{display:inline-flex;align-items:center;gap:7px;min-height:44px;'
      + 'padding:9px 14px;border-radius:11px;border:1px solid #E7DCC8;'
      + 'background-color:#FBF3E4;color:#2A2A35;cursor:pointer;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:15px;line-height:1.25;'
      + 'max-width:280px;text-align:start;box-sizing:border-box;}'
      + '.pgt-gly{display:inline-flex;flex:none;}'
      + '.pgt-gly-t{font-size:17px;line-height:1;color:#146B5E;}'
      + '.pgt-lab{white-space:normal;}'
      /* ⚠ THE FOCUS RING IS DOUBLED: #1E8FD4 is 2.97:1 on the working
         surface, under the 3:1 floor — the deep-teal outer ring
         carries the contrast while the blue stays recognisable. */
      + '.pgt-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;'
      + 'box-shadow:0 0 0 6px #0D4E44;}'
      + '.pgt-btn.is-off{opacity:.42;}'
      + '.pgt-btn.is-now{border:2px solid #146B5E;padding:8px 13px;font-weight:700;}'
      + '.pgt-btn[aria-pressed="true"]{background-color:#146B5E;color:#FBF3E4;}'

      + '.pgt-b-size{min-width:44px;justify-content:center;padding:9px 8px;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:18px;font-weight:600;}'
      + '.pgt-b-pred,.pgt-b-predsill{flex-direction:column;gap:4px;min-width:56px;justify-content:center;'
      + 'padding:7px 10px;}'
      + '.pgt-num-chip{font-family:"Baloo 2",system-ui,sans-serif;font-size:21px;font-weight:600;'
      + 'line-height:1;color:#2A2A35;}'
      + '.pgt-pmini{display:flex;gap:2px;}'
      + '.pgt-pmini-m{width:8px;height:8px;border-radius:50%;background-color:#F2784B;'
      + 'box-shadow:inset 0 0 0 1.5px #A34122;}'
      + '.pgt-pmini-s{width:8px;height:8px;border-radius:50%;border:1.5px dashed #7A6A55;box-sizing:border-box;}'
      + '.pgt-b-pred[aria-pressed="true"] .pgt-num-chip{color:#FBF3E4;}'
      + '.pgt-b-predsill[aria-pressed="true"] .pgt-num-chip{color:#FBF3E4;}'

      + '.pgt-b-print{border-style:dashed;}'
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
      + 'body.pgt-printing .pgt-wrap{display:none !important;}'
      + 'body.pgt-printing .pgt-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.pgt-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.pgt-sheet-note{margin:0 0 4mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;line-height:1.4;}'
      + '.pgt-p-svg{display:block;margin:0 0 4mm;}'
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
