/* =====================================================================
   TOOL #54 — THE DOUBLING MIRROR
   =====================================================================
   ⚠⚠ IT IS NOT A MIRROR, AND THAT IS THE WHOLE RULING. A hinged tray
   with two leaves. Counters sit on the near leaf; the class says what
   the double will be; the hinge closes and the far leaf receives the
   SAME NUMBER OF REAL COUNTERS. Nothing is reflected, nothing is an
   image, and every object on the tray can be touched and counted once.

   ⚖️ THREE PANELS AND A FOUR-SURFACE FENCE ALL RULED AGAINST THE
   CATALOG'S VERSION, AND EVERY REASON IS RECORDED HERE RATHER THAN
   ANSWERED. #47's rule binds — redefining the deliverable is the
   operator's call, not a panel's — so the tool is built, around what
   the objections actually showed.

   ⭐⭐ THE RULING THAT CHANGED THE APPARATUS: A MIRROR DOUBLES AN
   APPEARANCE, NOT A QUANTITY.
   - It institutionalises the double-count. A child who counts twelve in
     front of a mirror has counted six objects and six appearances — and
     the catalog's OWN A3 entry already bans exactly this: "do not build
     virtual counting … a finger can double-count, and that
     1:1-correspondence failure IS the diagnostic." The pitch made the
     diagnostic failure the intended behaviour.
   - A reflection is CHIRAL. 6+6 is two identical addends; a mirror
     gives 6 and its enantiomorph. The model is only honest while the
     material is chosen to conceal the mirror's defining property — put
     an arrow or a numeral in front of it and it visibly stops copying.
   - The catalog's own 3→6→12→24 chain needs the reflections to become
     real, manipulable objects — at which point it is a duplicator
     wearing glass, and by the v5 anatomy's own rule a skin over a
     mechanism is a STICKER.
   - ⭐ And this platform already tried it: `folding-sheet.js` (#35) was
     "renamed from Mirror Bench by the operator once the design moved to
     the fold", it carries ZERO numerals, and it computes a cell count
     for its gate that it DELIBERATELY NEVER RENDERS. That refusal is
     correct design, and it is the same refusal made here.
   So the glass is gone and a HINGE is in its place — the dissenting
   teacher's own words, "a duplicator or a hinge as its apparatus, never
   glass" — and the fence measured `hinge` FREE in ten of eleven locales
   while `mirror`, `double`, `half`, `fold` and `line` are each taken in
   all eleven. THE PARTS: THE TRAY · THE LEAVES · THE HINGE · THE ODD
   ONE. "Mirror" survives in the product NAME only, which is the
   operator's.

   ⚠⚠ AND "FOR 9 THE LINE CANNOT REST" IS FALSE, WHICH IS WHY THE ODD
   CASE IS A CHOICE RATHER THAN A STALEMATE. Nine counters in a row are
   perfectly symmetric about the centre of the fifth: the line RESTS, it
   simply does not PARTITION. Getting the advertised behaviour would
   need a smuggled rule ("no counter may straddle") that has nothing to
   do with mirrors — and the gate would then have to encode the smuggled
   rule as its own ground truth, which is the gate marking its own
   homework.
   ⭐ So opening an odd tray does not refuse. One counter has no partner,
   and THE CLASS CHOOSES WHICH LEAF IT GOES ON: nine opens to five and
   four. That is true, it is the near-double read backwards, and it is a
   decision instead of a third stalemate — because "the apparatus
   refuses at the boundary" already shipped twice this week, in
   `rounding-hill` (#52) and `pair-gate` (#53), and a third would be a
   tic rather than an invention.

   ⚠ THE HEADLINE CLAIM WAS INVERTED, and the landing copy must not
   repeat it. CCSS 1.OA.C.6 names five strategies; "doubles" is not one
   of them, two of the five are ten-bridging, and the text reads "the
   KNOWN equivalent 6 + 6" — doubles are the INPUT a strategy consumes,
   not the strategy. Make-ten holds the place the pitch gave to doubles.
   ⚠ And "digitally nothing but flashcards" is false: Topmarks' Hit the
   Button ships Doubles and Halves as two of its six top-level
   categories. It is a timed drill, so a no-timer apparatus is still
   differentiated — but the whitespace is not what the pitch claimed.

   ⚠ NO WORDS ON THE APPARATUS (§23.2). Counters and numerals only.
   ⚠ NO SPIEGELBUCH. The hinged multi-mirror was already ruled an
   upgrade mode for its owner at `premium-tools-v5-ideas.md:279`, and
   entry 10 quietly took it back. It belongs to `folding-sheet`.

   FREE   the whole apparatus: every count, the closing, the opening,
          and the odd one's side.
   PAID   the paper tray to cut out and hinge.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* ⚠⚠ CAP = 9, AND IT IS DERIVED RATHER THAN CHOSEN. The art panel
       measured every input: the widest real viewport is 704px (the tool
       page pins the iframe at max-w-3xl less padding, at 1440/1920/2560
       alike); the narrowest usable is 296px; the minimum honest disc
       with no interior feature is 12px, certified by counting-cups' own
       minimum-feature law; and the gap is 0.22d, eleven times the
       house's certified separation. A row of 2a discs then measures
       d*(2.44a + 0.03), so nine fits 296px with 10.8% margin and TEN
       FITS WITH 1.0% — rejected on margin, not on arithmetic, because
       3px of slack at the worst viewport is not a shippable number.
       ⭐ And nine is PRINCIPLED, not merely fitted: it gives doubles
       1+1 through 9+9, near-doubles to 9+10, and every odd count for the
       no-halving case — the complete within-20 doubles family except
       10+10, which `folding-wall.js:134` already retired by its own
       argument: x10 is the place-value system, not a fact. Nobody needs
       a mirror for it. */
    CAP: 9,
    /* a leaf lays its counters out in rows of five, because five is the
       grouping every other tool on this shelf already uses */
    ROW: 5,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips. */
    T_CLOSE: 520,
    T_OPEN: 520,
    T_PLACE: 240,
    T_REFUSE: 200,
    /* ⚠⚠ THE BEAT does NOT pass through _dur(): the class must have
       said the double BEFORE the far leaf fills, and a wait is not
       movement. */
    T_BEAT: 700,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_PLACE: 520,
    SND_CLOSE: 780,
    SND_OPEN: 620,
    SND_SIDE: 880,
    SND_REFUSE: 300,
    /* ⚠ T_, NOT SND_. Every other SND_* here is a FREQUENCY and this
       one is MILLISECONDS — two units under one prefix, distinguishable
       only at the call site. `pair-gate.js:121` and `rounding-hill.js:194`
       both ship that defect and are filed; this tool does not repeat it. */
    T_SND_DEBOUNCE: 160
  };

  var DoublingMirror = {

    id: 'doubling-mirror',

    strings: {
      title: {
        en: 'The Doubling Mirror',
        de: 'Das Scharnier',
        fr: 'La charnière',
        es: 'La bisagra',
        pt: 'A dobradiça',
        it: 'La cerniera',
        nl: 'Het scharnier',
        sv: 'Gångjärnet',
        da: 'Hængslet',
        no: 'Hengslet',
        fi: 'Sarana'
      },
      instruction: {
        en: 'Set the near leaf to a number and say what the double will be. Close the hinge and the far leaf gets the same number again — then add one more and open it, and see what a double and one more looks like.',
        de: 'Stellt den nahen Flügel auf eine Zahl ein und sagt, wie viel das Doppelte sein wird. Schließt das Scharnier — der ferne Flügel bekommt noch einmal genauso viele. Legt dann eine Scheibe mehr dazu und öffnet es: So sieht ein Doppeltes und eins mehr aus.',
        fr: 'Réglez le battant proche sur un nombre et dites ce que fera le double. Fermez la charnière : le battant opposé en reçoit autant. Ajoutez ensuite un disque de plus et ouvrez — voilà à quoi ressemble un double et un de plus.',
        es: 'Pongan el ala cercana en un número y digan cuál será el doble. Cierren la bisagra: el ala lejana recibe otras tantas. Después añadan una chapa más y ábranla — así se ve el doble y una más.',
        pt: 'Coloque a aba da frente num número e diga quanto vai dar o dobro. Feche a dobradiça: a aba de trás recebe a mesma quantidade. Depois ponha mais uma pastilha e abra — é assim que fica o dobro e mais uma.',
        it: 'Portate l’anta vicina a un numero e dite quanto farà il doppio. Chiudete la cerniera: l’anta lontana ne riceve altrettanti. Poi aggiungete un disco in più e aprite — ecco com’è fatto un doppio e uno in più.',
        nl: 'Zet de klep aan jouw kant op een getal en zeg wat het dubbele wordt. Sluit het scharnier: de klep aan de overkant krijgt er net zo veel bij. Leg er daarna nog één schijf bij en open het — zo ziet een dubbele en nog eentje eruit.',
        sv: 'Ställ in den närmaste klaffen på ett tal och säg vad dubbelt så många blir. Stäng gångjärnet: den bortre klaffen får lika många till. Lägg sedan dit en skiva till och öppna — så ser dubbelt och en till ut.',
        da: 'Sæt den nærmeste fløj til et tal, og sig hvad det dobbelte bliver. Luk hængslet: den fjerneste fløj får lige så mange igen. Læg så en skive mere på, og åbn det — sådan ser et dobbelt og en mere ud.',
        no: 'Still den nærmeste klaffen på et tall, og si hva det dobbelte blir. Lukk hengslet: den borterste klaffen får like mange til. Legg så på en skive til og åpne — slik ser et dobbelt og en til ut.',
        fi: 'Asettakaa lähemmälle siivelle jokin määrä ja sanokaa, paljonko kaksinkertainen määrä on. Sulkekaa sarana: kauempi siipi saa yhtä monta lisää. Lisätkää sitten yksi kiekko ja avatkaa — noin näyttää kaksinkertainen määrä ja yksi lisää.'
      },

      ariaTray: {

        en: 'A tray with two leaves and a hinge between them.',

        de: 'Zwei Flügel mit einem Scharnier dazwischen.',

        fr: 'Deux battants reliés par une charnière.',

        es: 'Dos alas unidas por una bisagra.',

        pt: 'Duas abas ligadas por uma dobradiça.',

        it: 'Due ante unite da una cerniera.',

        nl: 'Twee kleppen met een scharnier ertussen.',

        sv: 'Två klaffar med ett gångjärn emellan.',

        da: 'To fløje med et hængsel imellem.',

        no: 'To klaffer med et hengsel imellom.',

        fi: 'Kaksi siipeä ja niiden välissä sarana.'

      },
      ariaNear: {
        en: 'the near leaf, {n}',
        de: 'der nahe Flügel, {n}',
        fr: 'le battant proche, {n}',
        es: 'el ala cercana, {n}',
        pt: 'a aba da frente, {n}',
        it: 'l’anta vicina, {n}',
        nl: 'de klep aan jouw kant, {n}',
        sv: 'den närmaste klaffen, {n}',
        da: 'den nærmeste fløj, {n}',
        no: 'den nærmeste klaffen, {n}',
        fi: 'lähempi siipi, {n}'
      },
      ariaFar: {
        en: 'the far leaf, {n}',
        de: 'der ferne Flügel, {n}',
        fr: 'le battant opposé, {n}',
        es: 'el ala lejana, {n}',
        pt: 'a aba de trás, {n}',
        it: 'l’anta lontana, {n}',
        nl: 'de klep aan de overkant, {n}',
        sv: 'den bortre klaffen, {n}',
        da: 'den fjerneste fløj, {n}',
        no: 'den borterste klaffen, {n}',
        fi: 'kauempi siipi, {n}'
      },
      ariaOdd: {
        en: 'one counter with no partner, waiting for a side',
        de: 'eine Scheibe ohne Partner, sie wartet auf einen Flügel',
        fr: 'un disque sans partenaire, qui attend un battant',
        es: 'una chapa sin pareja, esperando un ala',
        pt: 'uma pastilha sem par, à espera de uma aba',
        it: 'un disco senza compagno, in attesa di un’anta',
        nl: 'een schijf zonder maatje, die op een klep wacht',
        sv: 'en skiva utan par som väntar på en klaff',
        da: 'en skive uden makker, der venter på en fløj',
        no: 'en skive uten make som venter på en klaff',
        fi: 'yksi kiekko ilman paria, odottamassa siipeä'
      },

      setStart: {

        en: 'What the tray starts with',

        de: 'Womit das Scharnier anfängt',

        fr: 'Ce que la charnière a au départ',

        es: 'Con qué empieza la bisagra',

        pt: 'Com o que a dobradiça começa',

        it: 'Come comincia la cerniera',

        nl: 'Waarmee het scharnier begint',

        sv: 'Vad gångjärnet börjar med',

        da: 'Hvad hængslet begynder med',

        no: 'Hva hengslet begynner med',

        fi: 'Mistä sarana aloittaa'

      },
      startSmall: {
        en: 'three to start',
        de: 'mit drei Scheiben',
        fr: 'trois disques',
        es: 'tres chapas',
        pt: 'três pastilhas',
        it: 'tre dischi',
        nl: 'drie schijven',
        sv: 'tre skivor',
        da: 'tre skiver',
        no: 'tre skiver',
        fi: 'kolme kiekkoa'
      },
      startTen: {
        en: 'seven to start',
        de: 'mit sieben Scheiben',
        fr: 'sept disques',
        es: 'siete chapas',
        pt: 'sete pastilhas',
        it: 'sette dischi',
        nl: 'zeven schijven',
        sv: 'sju skivor',
        da: 'syv skiver',
        no: 'sju skiver',
        fi: 'seitsemän kiekkoa'
      },

      addOne: {

        en: 'Put another counter on the near leaf',

        de: 'Eine Scheibe mehr auf den nahen Flügel legen',

        fr: 'Poser un disque de plus sur le battant proche',

        es: 'Poner otra chapa en el ala cercana',

        pt: 'Pôr mais uma pastilha na aba da frente',

        it: 'Mettere un altro disco sull’anta vicina',

        nl: 'Nog een schijf op de klep aan jouw kant leggen',

        sv: 'Lägg en skiva till på den närmaste klaffen',

        da: 'Læg en skive mere på den nærmeste fløj',

        no: 'Legg en skive til på den nærmeste klaffen',

        fi: 'Aseta vielä yksi kiekko lähemmälle siivelle'

      },
      takeOne: {
        en: 'Take a counter off the near leaf',
        de: 'Eine Scheibe vom nahen Flügel nehmen',
        fr: 'Retirer un disque du battant proche',
        es: 'Quitar una chapa del ala cercana',
        pt: 'Tirar uma pastilha da aba da frente',
        it: 'Togliere un disco dall’anta vicina',
        nl: 'Een schijf van de klep aan jouw kant halen',
        sv: 'Ta bort en skiva från den närmaste klaffen',
        da: 'Tag en skive af den nærmeste fløj',
        no: 'Ta en skive av den nærmeste klaffen',
        fi: 'Ota yksi kiekko pois lähemmältä siiveltä'
      },
      close: {
        en: 'Close the hinge',
        de: 'Das Scharnier schließen',
        fr: 'Fermer la charnière',
        es: 'Cerrar la bisagra',
        pt: 'Fechar a dobradiça',
        it: 'Chiudere la cerniera',
        nl: 'Het scharnier sluiten',
        sv: 'Stäng gångjärnet',
        da: 'Luk hængslet',
        no: 'Lukk hengslet',
        fi: 'Sulje sarana'
      },
      open: {
        en: 'Open the hinge',
        de: 'Das Scharnier öffnen',
        fr: 'Ouvrir la charnière',
        es: 'Abrir la bisagra',
        pt: 'Abrir a dobradiça',
        it: 'Aprire la cerniera',
        nl: 'Het scharnier openen',
        sv: 'Öppna gångjärnet',
        da: 'Åbn hængslet',
        no: 'Åpne hengslet',
        fi: 'Avaa sarana'
      },
      sideLow: {
        en: 'Give the odd one to the near leaf',
        de: 'Die Scheibe ohne Partner auf den nahen Flügel legen',
        fr: 'Donner le disque sans partenaire au battant proche',
        es: 'Dar la chapa sin pareja al ala cercana',
        pt: 'Dar a pastilha sem par à aba da frente',
        it: 'Dare il disco senza compagno all’anta vicina',
        nl: 'De schijf zonder maatje aan de klep aan jouw kant geven',
        sv: 'Ge skivan utan par till den närmaste klaffen',
        da: 'Giv skiven uden makker til den nærmeste fløj',
        no: 'Gi skiven uten make til den nærmeste klaffen',
        fi: 'Anna ilman paria jäänyt kiekko lähemmälle siivelle'
      },
      sideHigh: {
        en: 'Give the odd one to the far leaf',
        de: 'Die Scheibe ohne Partner auf den fernen Flügel legen',
        fr: 'Donner le disque sans partenaire au battant opposé',
        es: 'Dar la chapa sin pareja al ala lejana',
        pt: 'Dar a pastilha sem par à aba de trás',
        it: 'Dare il disco senza compagno all’anta lontana',
        nl: 'De schijf zonder maatje aan de klep aan de overkant geven',
        sv: 'Ge skivan utan par till den bortre klaffen',
        da: 'Giv skiven uden makker til den fjerneste fløj',
        no: 'Gi skiven uten make til den borterste klaffen',
        fi: 'Anna ilman paria jäänyt kiekko kauemmalle siivelle'
      },
      again: {
        en: 'Start again',
        de: 'Von vorn anfangen',
        fr: 'Tout recommencer',
        es: 'Empezar de nuevo',
        pt: 'Começar de novo',
        it: 'Ricominciare',
        nl: 'Opnieuw beginnen',
        sv: 'Börja om',
        da: 'Begynd forfra',
        no: 'Begynn på nytt',
        fi: 'Aloita alusta'
      },

      saidPlace: {

        en: '{n} on the near leaf.',

        de: 'Auf dem nahen Flügel: {n}.',

        fr: 'Sur le battant proche : {n}.',

        es: 'En el ala cercana: {n}.',

        pt: 'Na aba da frente: {n}.',

        it: 'Sull’anta vicina: {n}.',

        nl: 'Op de klep aan jouw kant: {n}.',

        sv: 'På den närmaste klaffen: {n}.',

        da: 'På den nærmeste fløj: {n}.',

        no: 'På den nærmeste klaffen: {n}.',

        fi: 'Lähemmällä siivellä: {n}.'

      },
      saidClosed: {
        en: '{n} and {n} on the tray. {d} altogether.',
        de: '{n} und {n} auf den Flügeln. {d} zusammen.',
        fr: '{n} et {n} sur les battants. {d} en tout.',
        es: '{n} y {n} en las alas. {d} en total.',
        pt: '{n} e {n} nas abas. {d} ao todo.',
        it: '{n} e {n} sulle ante. {d} in tutto.',
        nl: '{n} en {n} op de kleppen. {d} bij elkaar.',
        sv: '{n} och {n} på klaffarna. {d} tillsammans.',
        da: '{n} og {n} på fløjene. {d} i alt.',
        no: '{n} og {n} på klaffene. {d} til sammen.',
        fi: 'Siivillä {n} ja {n}. Yhteensä {d}.'
      },
      saidOpened: {
        en: '{t} opens into {a} and {a}.',
        de: '{t} wird wieder zu {a} und {a}.',
        fr: '{t} redevient {a} et {a}.',
        es: '{t} vuelve a ser {a} y {a}.',
        pt: '{t} volta a ser {a} e {a}.',
        it: '{t} torna a essere {a} e {a}.',
        nl: '{t} wordt weer {a} en {a}.',
        sv: '{t} blir {a} och {a} igen.',
        da: '{t} bliver til {a} og {a} igen.',
        no: '{t} blir {a} og {a} igjen.',
        fi: '{t} jakautuu taas: {a} ja {a}.'
      },
      saidOddWaiting: {
        en: '{t} will not open into two equal leaves. One counter has no partner — which leaf should this class give it to?',
        de: '{t} lässt sich nicht auf zwei gleiche Flügel verteilen. Eine Scheibe hat keinen Partner — auf welchen Flügel soll die Klasse sie legen?',
        fr: '{t} ne se partage pas en deux battants égaux. Un disque n’a pas de partenaire — à quel battant la classe le donne-t-elle ?',
        es: '{t} no se reparte en dos alas iguales. Una chapa se queda sin pareja: ¿a qué ala se la da la clase?',
        pt: '{t} não se reparte em duas abas iguais. Uma pastilha ficou sem par — para qual aba a turma vai dá-la?',
        it: '{t} non si divide in due ante uguali. Un disco resta senza compagno: a quale anta lo dà la classe?',
        nl: '{t} gaat niet in twee gelijke kleppen. Eén schijf heeft geen maatje — aan welke klep geeft de klas hem?',
        sv: '{t} går inte jämnt upp på två klaffar. En skiva blir utan par — vilken klaff ska klassen ge den till?',
        da: '{t} går ikke op i to lige store fløje. En skive er uden makker — hvilken fløj skal klassen give den til?',
        no: '{t} går ikke opp i to like klaffer. En skive er uten make — hvilken klaff skal klassen gi den til?',
        fi: '{t} ei jakaudu kahdelle yhtä suurelle siivelle. Yksi kiekko jäi ilman paria — kummalle siivelle luokka antaa sen?'
      },
      saidOddPlaced: {
        en: '{t} opens into {a} and {b}. The odd one went to the {s} leaf, so this is a double and one more.',
        de: '{t} wird zu {a} und {b}. Die Scheibe ohne Partner liegt auf dem {s} Flügel — das ist ein Doppeltes und eins mehr.',
        fr: '{t} redevient {a} et {b}. Le disque sans partenaire est sur le battant {s} : c’est un double et un de plus.',
        es: '{t} vuelve a ser {a} y {b}. La chapa sin pareja está en el ala {s}: es el doble y una más.',
        pt: '{t} volta a ser {a} e {b}. A pastilha sem par está na aba {s}: é o dobro e mais uma.',
        it: '{t} torna a essere {a} e {b}. Il disco senza compagno è sull’anta {s}: è un doppio e uno in più.',
        nl: '{t} wordt {a} en {b}. De schijf zonder maatje ligt op de klep {s}: dit is een dubbele en nog eentje.',
        sv: '{t} blir {a} och {b}. Skivan utan par ligger på den {s} klaffen — det är dubbelt och en till.',
        da: '{t} bliver til {a} og {b}. Skiven uden makker ligger på den {s} fløj — det er et dobbelt og en mere.',
        no: '{t} blir {a} og {b}. Skiven uten make ligger på den {s} klaffen — det er et dobbelt og en til.',
        fi: '{t} jakautuu näin: {a} ja {b}. Ilman paria jäänyt kiekko on {s} siivellä — se on kaksinkertainen määrä ja yksi lisää.'
      },
      saidEmpty: {
        en: 'There is nothing on the tray yet.',
        de: 'Auf dem nahen Flügel liegt noch nichts.',
        fr: 'Il n’y a encore rien sur le battant proche.',
        es: 'Todavía no hay nada en el ala cercana.',
        pt: 'Ainda não há nada na aba da frente.',
        it: 'Sull’anta vicina non c’è ancora niente.',
        nl: 'Er ligt nog niets op de klep aan jouw kant.',
        sv: 'Det ligger ingenting på den närmaste klaffen än.',
        da: 'Der ligger ikke noget på den nærmeste fløj endnu.',
        no: 'Det ligger ingenting på den nærmeste klaffen ennå.',
        fi: 'Lähemmällä siivellä ei ole vielä mitään.'
      },
      saidFull: {
        en: 'The near leaf holds {n}, and that is as many as it holds.',
        de: 'Auf dem nahen Flügel liegen {n}, und mehr passen nicht darauf.',
        fr: 'Le battant proche en porte {n}, et il n’en tient pas davantage.',
        es: 'El ala cercana lleva {n}, y ya no caben más.',
        pt: 'A aba da frente tem {n}, e não cabem mais.',
        it: 'L’anta vicina ne porta {n}, e più di così non ce ne stanno.',
        nl: 'Op de klep aan jouw kant liggen er {n}, en meer passen er niet op.',
        sv: 'Den närmaste klaffen bär {n}, och fler får inte plats.',
        da: 'Den nærmeste fløj bærer {n}, og der er ikke plads til flere.',
        no: 'Den nærmeste klaffen bærer {n}, og det er ikke plass til flere.',
        fi: 'Lähemmällä siivellä on {n}, eikä enempää mahdu.'
      },
      /* ⚠ 'side' now has a branch; this is what it says. */
      saidNoOdd: {
        en: 'There is no odd counter waiting for a leaf.',
        de: 'Es wartet keine Scheibe ohne Partner auf einen Flügel.',
        fr: 'Aucun disque sans partenaire n’attend de battant.',
        es: 'No hay ninguna chapa sin pareja esperando un ala.',
        pt: 'Não há nenhuma pastilha sem par à espera de uma aba.',
        it: 'Non c’è nessun disco senza compagno in attesa di un’anta.',
        nl: 'Er wacht geen schijf zonder maatje op een klep.',
        sv: 'Det finns ingen skiva utan par som väntar på en klaff.',
        da: 'Der er ingen skive uden makker, der venter på en fløj.',
        no: 'Det er ingen skive uten make som venter på en klaff.',
        fi: 'Yksikään kiekko ei ole jäänyt ilman paria.'
      },
      sideNameNear: {
        en: 'near',
        de: 'nahen',
        fr: 'proche',
        es: 'cercana',
        pt: 'da frente',
        it: 'vicina',
        nl: 'aan jouw kant',
        sv: 'närmaste',
        da: 'nærmeste',
        no: 'nærmeste',
        fi: 'lähemmällä'
      },
      sideNameFar: {
        en: 'far',
        de: 'fernen',
        fr: 'opposé',
        es: 'lejana',
        pt: 'de trás',
        it: 'lontana',
        nl: 'aan de overkant',
        sv: 'bortre',
        da: 'fjerneste',
        no: 'borterste',
        fi: 'kauemmalla'
      },
      saidAlreadyClosed: {
        en: 'The hinge is already closed. Open it to take the tray apart again.',
        de: 'Das Scharnier ist schon geschlossen. Öffnet es, um die Flügel wieder auseinanderzunehmen.',
        fr: 'La charnière est déjà fermée. Ouvrez-la pour séparer les battants.',
        es: 'La bisagra ya está cerrada. Ábranla para separar las alas otra vez.',
        pt: 'A dobradiça já está fechada. Abra para separar as abas outra vez.',
        it: 'La cerniera è già chiusa. Apritela per separare di nuovo le ante.',
        nl: 'Het scharnier is al gesloten. Open het om de kleppen weer los te maken.',
        sv: 'Gångjärnet är redan stängt. Öppna det för att skilja klaffarna åt igen.',
        da: 'Hængslet er allerede lukket. Åbn det for at skille fløjene ad igen.',
        no: 'Hengslet er allerede lukket. Åpne det for å skille klaffene fra hverandre igjen.',
        fi: 'Sarana on jo kiinni. Avaa se, niin siivet erkanevat taas.'
      },
      saidAlreadyOpen: {
        en: 'The hinge is already open.',
        de: 'Das Scharnier ist schon offen.',
        fr: 'La charnière est déjà ouverte.',
        es: 'La bisagra ya está abierta.',
        pt: 'A dobradiça já está aberta.',
        it: 'La cerniera è già aperta.',
        nl: 'Het scharnier is al open.',
        sv: 'Gångjärnet är redan öppet.',
        da: 'Hængslet er allerede åbent.',
        no: 'Hengslet er allerede åpent.',
        fi: 'Sarana on jo auki.'
      },

      gateTitle: {

        en: 'The paper tray',

        de: 'Der Bastelbogen',

        fr: 'La charnière en papier',

        es: 'La bisagra de papel',

        pt: 'A dobradiça de papel',

        it: 'La cerniera di carta',

        nl: 'Het papieren scharnier',

        sv: 'Pappersgångjärnet',

        da: 'Papirhængslet',

        no: 'Papirhengslet',

        fi: 'Paperisarana'

      },
      gateBody: {
        en: 'The whole apparatus is free — every count, the closing and the opening. A Teacher plan adds the paper tray to cut out and hinge, so a child can lay real counters on both leaves and bend it shut themselves.',
        de: 'Das ganze Scharnier ist kostenlos — jedes Zählen, das Schließen und das Öffnen. Mit dem Lehrkraft-Abo kommt der Bastelbogen dazu: Flügel zum Ausschneiden und Anritzen, damit ein Kind echte Scheiben auf beide legen und das Scharnier selbst zuklappen kann.',
        fr: 'Toute la charnière est gratuite : chaque comptage, la fermeture et l’ouverture. L’Abonnement Enseignant y ajoute la charnière en papier à découper et à marquer, pour qu’un enfant pose de vrais disques sur les deux battants et la referme de ses mains.',
        es: 'Toda la bisagra es gratuita: cada recuento, el cierre y la apertura. El Plan Docente añade la bisagra de papel para recortar y marcar, de modo que un niño pueda poner chapas de verdad en las dos alas y cerrarla con sus propias manos.',
        pt: 'A dobradiça inteira é gratuita: cada contagem, o fechar e o abrir. O Plano Professor acrescenta a dobradiça de papel para recortar e marcar, para uma criança pôr pastilhas de verdade nas duas abas e fechá-la com as próprias mãos.',
        it: 'Tutta la cerniera è gratuita: ogni conteggio, la chiusura e l’apertura. Il Piano Insegnante aggiunge la cerniera di carta da ritagliare e incidere, così un bambino può mettere dischi veri su tutte e due le ante e chiuderla con le sue mani.',
        nl: 'Het hele scharnier is gratis: elk tellen, het sluiten en het openen. Bij het Leerkracht-abonnement komt het papieren scharnier om uit te knippen en aan te drukken, zodat een kind echte schijven op allebei de kleppen kan leggen en het zelf kan dichtdoen.',
        sv: 'Hela gångjärnet är gratis — varje räkning, stängningen och öppningen. Lärarplanen lägger till pappersgångjärnet att klippa ut och ritsa, så att ett barn kan lägga riktiga skivor på båda klaffarna och stänga det med egna händer.',
        da: 'Hele hængslet er gratis — hver optælling, lukningen og åbningen. Lærerabonnementet lægger papirhængslet oveni, som I klipper ud og ridser, så et barn kan lægge rigtige skiver på begge fløje og lukke det med sine egne hænder.',
        no: 'Hele hengslet er gratis — hver opptelling, lukkingen og åpningen. Lærerabonnementet legger til papirhengslet som dere klipper ut og risser opp, slik at et barn kan legge ekte skiver på begge klaffene og lukke det med sine egne hender.',
        fi: 'Koko sarana on ilmainen — jokainen laskeminen, sulkeminen ja avaaminen. Opettajatilaus tuo lisäksi paperisaranan, jonka leikkaatte irti ja uurratte, niin lapsi voi asettaa oikeita kiekkoja kummallekin siivelle ja sulkea sen omin käsin.'
      },
      gateCta: {
        en: 'See the Teacher plan',
        de: 'Das Lehrkraft-Abo ansehen',
        fr: 'Voir l’Abonnement Enseignant',
        es: 'Ver el Plan Docente',
        pt: 'Ver o Plano Professor',
        it: 'Scopri il Piano Insegnante',
        nl: 'Bekijk het Leerkracht-abonnement',
        sv: 'Se Lärarplanen',
        da: 'Se Lærerabonnementet',
        no: 'Se Lærerabonnementet',
        fi: 'Tutustu Opettajatilaukseen'
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

        en: 'Print the paper tray',

        de: 'Den Bastelbogen drucken',

        fr: 'Imprimer la charnière en papier',

        es: 'Imprimir la bisagra de papel',

        pt: 'Imprimir a dobradiça de papel',

        it: 'Stampare la cerniera di carta',

        nl: 'Het papieren scharnier afdrukken',

        sv: 'Skriv ut pappersgångjärnet',

        da: 'Print papirhængslet',

        no: 'Skriv ut papirhengslet',

        fi: 'Tulosta paperisarana'

      },
      sheetTitle: {
        en: 'Paper trays to cut out and hinge',
        de: 'Bastelbögen zum Ausschneiden und Anritzen',
        fr: 'Charnières en papier à découper et à marquer',
        es: 'Bisagras de papel para recortar y marcar',
        pt: 'Dobradiças de papel para recortar e marcar',
        it: 'Cerniere di carta da ritagliare e incidere',
        nl: 'Papieren scharnieren om uit te knippen',
        sv: 'Pappersgångjärn att klippa ut och ritsa',
        da: 'Papirhængsler til at klippe ud og ridse',
        no: 'Papirhengsler til å klippe ut og risse opp',
        fi: 'Paperisaranoita leikattavaksi ja uurrettavaksi'
      },
      sheetNote: {
        en: 'Cut out the tray and score along the middle so it bends. Lay counters on one leaf, say what the double will be, then bend the other leaf over and lay the same number again. Count them all — the tray never makes a counter, you do.',
        de: 'Schneidet die beiden Flügel aus und ritzt die Mittellinie an, damit sie sich zuklappen lassen. Legt Scheiben auf einen Flügel, sagt, wie viel das Doppelte sein wird, klappt den anderen Flügel darüber und legt noch einmal genauso viele hin. Zählt alle: Das Scharnier macht keine einzige Scheibe — das macht ihr.',
        fr: 'Découpez les deux battants et marquez bien la ligne du milieu pour qu’ils se referment. Posez des disques sur un battant, dites ce que fera le double, rabattez l’autre battant et posez-en autant. Comptez-les tous : la charnière ne fabrique aucun disque, c’est vous qui le faites.',
        es: 'Recorten las dos alas y marquen bien la línea del medio para que se cierren. Pongan chapas en un ala, digan cuál será el doble, cierren la otra ala encima y pongan otras tantas. Cuéntenlas todas: la bisagra no fabrica ni una chapa, la ponen ustedes.',
        pt: 'Recorte as duas abas e marque bem a linha do meio para elas fecharem. Ponha pastilhas numa aba, diga quanto vai dar o dobro, feche a outra aba por cima e ponha a mesma quantidade. Conte todas: a dobradiça não faz nenhuma pastilha — quem faz é você.',
        it: 'Ritagliate le due ante e incidete bene la linea di mezzo perché si chiudano. Mettete dei dischi su un’anta, dite quanto farà il doppio, chiudete l’altra anta sopra e mettetene altrettanti. Contateli tutti: la cerniera non fabbrica nemmeno un disco, lo fate voi.',
        nl: 'Knip de twee kleppen uit en druk de middellijn goed aan, zodat ze dichtgaan. Leg schijven op één klep, zeg wat het dubbele wordt, doe de andere klep erover en leg er net zo veel bij. Tel ze allemaal: het scharnier maakt geen enkele schijf, dat doe jij.',
        sv: 'Klipp ut de två klaffarna och ritsa mittlinjen så att de går att stänga. Lägg skivor på den ena klaffen, säg vad dubbelt så många blir, fäll den andra klaffen över och lägg lika många till. Räkna alla: gångjärnet gör inte en enda skiva — det gör ni.',
        da: 'Klip de to fløje ud, og rids midterlinjen, så de kan lukkes. Læg skiver på den ene fløj, sig hvad det dobbelte bliver, klap den anden fløj henover, og læg lige så mange igen. Tæl dem alle sammen: hængslet laver ikke en eneste skive — det gør I.',
        no: 'Klipp ut de to klaffene og riss opp midtlinjen, så de lar seg lukke. Legg skiver på den ene klaffen, si hva det dobbelte blir, legg den andre klaffen over og legg like mange til. Tell dem alle: hengslet lager ikke en eneste skive — det gjør dere.',
        fi: 'Leikatkaa molemmat siivet irti ja uurtakaa keskiviiva, jotta ne menevät kiinni. Asettakaa kiekkoja toiselle siivelle, sanokaa paljonko kaksinkertainen määrä on, kääntäkää toinen siipi päälle ja asettakaa yhtä monta lisää. Laskekaa kaikki: sarana ei tee yhtäkään kiekkoa — te teette.'
      }
    },

    settings: [
      { key: 'start', type: 'choice', labelKey: 'setStart', options: [
        { value: 'few', labelKey: 'startSmall' },
        { value: 'ten', labelKey: 'startTen' }
      ] }
    ],
    defaults: { start: 'few' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM. The tray holds ONE integer while the hinge is open (`near`)
       and derives everything else, so "seven on one leaf and six on the
       other after a clean close" cannot be produced by any sequence.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. */

    newState: function (start) {
      return {
        near: String(start) === 'ten' ? 7 : 3,
        closed: false,
        /* the odd one, only ever after an odd tray is opened:
           null when there is none, -1 near leaf, +1 far leaf, 0 waiting */
        odd: null,
        /* the total the tray was carrying when it was opened, so the
           odd case can describe itself honestly */
        opened: null
      };
    },

    _st: function (st) { return st || this.st; },

    /* ⭐ THE FAR LEAF IS REAL, AND IT IS DERIVED, so it can never
       disagree with the near one. */
    far: function (st) {
      var s = this._st(st);
      /* an OPENED tray still has counters on both leaves — `opened`
         records that it was taken apart rather than never closed. */
      if (!s.closed && s.opened === null) return 0;
      if (s.odd === null || s.odd === 0) return s.near;
      return s.near + (s.odd > 0 ? 1 : 0);
    },
    nearShown: function (st) {
      var s = this._st(st);
      return s.near + (s.odd !== null && s.odd < 0 ? 1 : 0);
    },
    total: function (st) {
      var s = this._st(st);
      if (!s.closed && s.opened === null) return s.near;
      return this.nearShown(s) + this.far(s) + (s.odd === 0 ? 1 : 0);
    },
    /* is there an odd counter still waiting for a side? */
    waiting: function (st) { return this._st(st).odd === 0; },

    /* ---- the moves ------------------------------------------------ */

    place: function (st, d) {
      var s = this._st(st);
      /* ⭐⭐ ON A CLOSED TRAY, ONE MORE COUNTER IS THE ODD ONE — and this
         is the path that was missing. Without it close() only ever made
         an even total, open() never saw an odd one, and the tool's
         entire headline (nine opens to five and four) was UNREACHABLE:
         five authored strings and two controls dead, in a build whose
         626-assertion gate and 16 pixel checks both passed — because
         both reached the model directly instead of pressing a button.
         ⚠ And it holds exactly ONE, so the tray says n+n and n+(n+1)
         and nothing else. */
      if (s.closed) {
        if (d > 0) {
          if (s.odd !== null) return null;
          if (this.total(s) + 1 > GEO.CAP * 2 + 1) return null;
          return { near: s.near, closed: true, odd: 0, opened: null };
        }
        if (s.odd === null) return null;
        return { near: s.near, closed: true, odd: null, opened: null };
      }
      var n = s.near + d;
      if (n < 0 || n > GEO.CAP) return null;
      return { near: n, closed: false, odd: null, opened: null };
    },

    /* close the hinge: the far leaf receives the SAME number of real
       counters. Nothing is reflected and nothing is an image. */
    close: function (st) {
      var s = this._st(st);
      if (s.closed) return null;
      if (s.near === 0) return null;
      return { near: s.near, closed: true, odd: null, opened: null };
    },

    /* ⭐⭐ OPEN. An even tray splits cleanly. An ODD tray does NOT refuse
       — one counter has no partner and the class chooses its leaf. */
    open: function (st, total) {
      var s = this._st(st);
      var t = total == null ? this.total(s) : total;
      if (!s.closed && total == null) return null;
      if (s.opened !== null && total == null) return null;   /* already open */
      /* ⚠ THE TWO CAPS MUST AGREE. place() admits CAP*2+1 (the double
         plus the odd one) while this refused anything over CAP*2, so a
         tray of nineteen could be BUILT and never OPENED — and pressing
         open then announced "the hinge is already open" on a closed
         tray. They disagreed by exactly one, which is the whole point
         of the odd counter. */
      if (t < 2 || t > GEO.CAP * 2 + 1) return null;
      var half = Math.floor(t / 2);
      /* ⚠⚠ closed:false. It returned TRUE, so "open the hinge" did not
         open the hinge and nothing in the DOM changed — a control that
         acts and has no consequence, which the shared liveness gate
         scores green because it only asks whether the DOM changed AT
         ALL. An opened tray shows both leaves side by side. */
      if (t % 2 === 0) return { near: half, closed: false, odd: null, opened: t };
      return { near: half, closed: false, odd: 0, opened: t };
    },

    /* ⭐⭐ THE ODD ONE GETS A LEAF, AND ONLY EVER ONE OF THEM. dir -1
       near, +1 far.
       ⚠ THE APPARATUS CAN EXPRESS n+n AND n+(n+1) AND NOTHING ELSE, and
       that is the art panel's best finding: it came out of the
       constraint rather than out of taste. A second outsider is REFUSED,
       so the material itself forbids the off-family sums — which is
       §23.2's "the material pushes back" stated as a fact about the
       furniture rather than as a rule about the child. */
    giveSide: function (st, dir) {
      var s = this._st(st);
      if (s.odd !== 0) return null;
      if (dir !== -1 && dir !== 1) return null;
      /* ⚠⚠ THE QUESTION MUST EXIST BEFORE THE ANSWER IS LIVE. The side
         buttons were gated on `waiting` alone, which is true the moment
         the odd counter lands on a CLOSED tray — before anything has been
         opened. On that path `opened` is null, so the announcement leaked
         a raw {t} token AND claimed the tray had opened while it was
         shut: "{t} opens into 7 and 6". Measured on 18 of 34 firings.
         ⭐ This is the recorded #39 shape — draw-bag, number-sieve,
         measurement-bench and estimation-jar all guard the REVEAL and
         leave the PREDICTION live over an empty apparatus — and gating it
         in the MODEL is what makes the leak unreachable rather than
         merely unlikely. */
      if (s.opened === null) return null;
      return { near: s.near, closed: s.closed, odd: dir, opened: s.opened };
    },

    /* how many counters are standing outside the pair-up. NEVER more
       than one, by construction: `odd` is a single token, so "two left
       over" is not a state this model can hold. */
    outside: function (st) { return this._st(st).odd === null ? 0 : 1; },

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('dbm-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. ⚠ `html,body.x{}` is a selector LIST whose
         html half applies unconditionally, which makes the class
         decorative and its mutation unkillable — two adds, one rule. */
      document.documentElement.classList.add('dbm-scroll');
      document.body.classList.add('dbm-scroll');
      this._lastSound = 0;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.start);
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () { this.st = this.newState(this.api.settings.start); this.render(); },
    onSettings: function () { this.reset(); },

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

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'dbm-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'dbm-card');
      var tray = api.el('div', 'dbm-tray');
      this._tray = tray;

      this._nearEl = api.el('div', 'dbm-leaf dbm-near');
      this._hinge = api.el('div', 'dbm-hinge');
      this._farEl = api.el('div', 'dbm-leaf dbm-far');
      this._oddEl = api.el('div', 'dbm-odd');
      tray.appendChild(this._nearEl);
      tray.appendChild(this._hinge);
      tray.appendChild(this._farEl);
      card.appendChild(tray);
      card.appendChild(this._oddEl);

      var bar = api.el('div', 'dbm-ctl');
      this._btn = {};
      this._btn.less = this._mk(bar, 'dbm-b-less', '−', 'takeOne');
      this._btn.more = this._mk(bar, 'dbm-b-more', '+', 'addOne');
      this._btn.close = this._mk(bar, 'dbm-b-close', '⇥', 'close');
      this._btn.open = this._mk(bar, 'dbm-b-open', '⇤', 'open');
      this._btn.low = this._mk(bar, 'dbm-b-low', '◧', 'sideLow');
      this._btn.high = this._mk(bar, 'dbm-b-high', '◨', 'sideHigh');
      this._btn.again = this._mk(bar, 'dbm-b-again', '↻', 'again');
      this._btn.print = this._mk(bar, 'dbm-b-print', '⎙', 'printBtn');

      this._btn.less.addEventListener('click', function () { self._place(-1); });
      this._btn.more.addEventListener('click', function () { self._place(1); });
      this._btn.close.addEventListener('click', function () { self._close(); });
      this._btn.open.addEventListener('click', function () { self._open(); });
      this._btn.low.addEventListener('click', function () { self._side(-1); });
      this._btn.high.addEventListener('click', function () { self._side(1); });
      this._btn.again.addEventListener('click', function () { self.reset(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);
      this._sheet = api.el('div', 'dbm-sheet');
      wrap.appendChild(this._sheet);
      api.stage.appendChild(wrap);
    },

    _mk: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'dbm-btn ' + cls);
      b.type = 'button';
      b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    _place: function (d) {
      var next = this.place(null, d);
      if (!next) { this._refuse(this.st.closed ? 'closed' : (d < 0 ? 'empty' : 'full')); return; }
      this.st = next;
      this._paint(GEO.T_PLACE);
      this._snd(GEO.SND_PLACE);
      this.api.announce(this._fmt(this.api.t('saidPlace'), { n: next.near }));
    },

    _close: function () {
      var api = this.api, self = this;
      var next = this.close(null);
      if (!next) { this._refuse(this.st.closed ? 'closed' : 'empty'); return; }
      var n = next.near;
      this.st = next;
      this._paint(GEO.T_CLOSE);
      this._snd(GEO.SND_CLOSE);
      /* ⭐ THE BEAT. The class must have said the double BEFORE the far
         leaf is countable, or the tray answered its own question.
         ⚠ Not through _dur(): a wait is not movement. */
      window.setTimeout(function () {
        api.announce(self._fmt(api.t('saidClosed'), { n: n, d: n * 2 }));
      }, GEO.T_BEAT);
    },

    _open: function () {
      var api = this.api;
      var next = this.open(null);
      if (!next) { this._refuse('open'); return; }
      var t = next.opened;
      this.st = next;
      this._paint(GEO.T_OPEN);
      this._snd(GEO.SND_OPEN);
      api.announce(this.waiting(next)
        ? this._fmt(api.t('saidOddWaiting'), { t: t })
        : this._fmt(api.t('saidOpened'), { t: t, a: next.near }));
    },

    _side: function (dir) {
      var api = this.api;
      var next = this.giveSide(null, dir);
      if (!next) { this._refuse('side'); return; }
      this.st = next;
      this._paint(GEO.T_PLACE);
      this._snd(GEO.SND_SIDE);
      api.announce(this._fmt(api.t('saidOddPlaced'), {
        t: next.opened, a: this.nearShown(next), b: this.far(next),
        s: api.t(dir < 0 ? 'sideNameNear' : 'sideNameFar')
      }));
    },

    _refuse: function (why) {
      var api = this.api, self = this, t = this._tray, s = this.st;
      this._snd(GEO.SND_REFUSE);
      if (t) {
        t.classList.add('is-refuse');
        window.setTimeout(function () { t.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (why === 'full') { api.announce(this._fmt(api.t('saidFull'), { n: GEO.CAP })); return; }
      if (why === 'empty') { api.announce(api.t('saidEmpty')); return; }
      if (why === 'closed') { api.announce(api.t('saidAlreadyClosed')); return; }
      if (why === 'open') { api.announce(api.t('saidAlreadyOpen')); return; }
      /* ⚠ 'side' had NO branch and fell through to the default, so
         pressing a side button on a closed tray announced "the hinge is
         already open" — false, and reachable. */
      if (why === 'side') { api.announce(api.t('saidNoOdd')); return; }
      api.announce(api.t('saidAlreadyOpen'));
    },

    /* ---- painting -------------------------------------------------- */

    _fill: function (host, n) {
      var api = this.api, i, row = null;
      while (host.firstChild) host.removeChild(host.firstChild);
      for (i = 0; i < n; i++) {
        if (i % GEO.ROW === 0) { row = api.el('div', 'dbm-row'); host.appendChild(row); }
        row.appendChild(api.el('span', 'dbm-c'));
      }
    },

    _paint: function (dur) {
      var api = this.api, s = this.st;
      this._tray.style.setProperty('--dbm-t', this._dur(dur || GEO.T_PLACE) + 'ms');
      this._tray.setAttribute('aria-label', api.t('ariaTray'));
      this._tray.classList.toggle('is-closed', s.closed);

      var nn = this.nearShown(s), nf = this.far(s);
      this._fill(this._nearEl, nn);
      this._fill(this._farEl, nf);
      this._nearEl.setAttribute('aria-label', this._fmt(api.t('ariaNear'), { n: nn }));
      this._farEl.setAttribute('aria-label', this._fmt(api.t('ariaFar'), { n: nf }));
      this._farEl.style.visibility = s.closed ? '' : 'hidden';

      /* ⭐ THE ODD ONE waits BETWEEN the leaves — not marked, not
         coloured, just unpartnered, because there is no red and no
         green in this palette and being odd is not being wrong. */
      var wait = this.waiting(s);
      this._oddEl.style.visibility = wait ? '' : 'hidden';
      this._fill(this._oddEl, wait ? 1 : 0);
      if (wait) this._oddEl.setAttribute('aria-label', api.t('ariaOdd'));

      this._btn.less.classList.toggle('is-off', !this.place(null, -1));
      this._btn.more.classList.toggle('is-off', !this.place(null, 1));
      this._btn.close.classList.toggle('is-off', !this.close(null));
      this._btn.open.classList.toggle('is-off', !this.open(null));
      this._btn.low.classList.toggle('is-off', !wait);
      this._btn.high.classList.toggle('is-off', !wait);
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
      var g = api.el('div', 'dbm-gate is-on');
      var box = api.el('div', 'dbm-gate-box');
      var h = api.el('h2', 'dbm-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'dbm-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'dbm-gate-cta'); a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'dbm-gate-x'); c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
    },

    /* ================= the paper tray =============================== */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('dbm-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('dbm-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('dbm-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'dbm-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'dbm-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      for (i = 0; i < 2; i++) s.appendChild(api.el('div', 'dbm-p-tray'));
    }
  };

  function injectCSS() {
    var css = ''
      + 'html.dbm-scroll{overflow-y:auto;}'
      + 'body.dbm-scroll{overflow-y:auto;}'

      + '.dbm-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.dbm-card{container-type:inline-size;width:100%;max-width:880px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(12px,2.6cqw,26px);--dbm-c:clamp(16px,3.6cqw,36px);--dbm-t:240ms;}'

      + '.dbm-tray{display:flex;align-items:center;justify-content:center;'
      + 'gap:calc(var(--dbm-c) * .3);min-height:calc(var(--dbm-c) * 4.6);}'
      + '.dbm-tray.is-refuse .dbm-leaf{border-color:#A34122;}'
      /* the two leaves are drawn IDENTICALLY, because the far one holds
         real counters and not an image of the near one */
      + '.dbm-leaf{display:flex;flex-direction:column;align-items:center;justify-content:center;'
      + 'gap:calc(var(--dbm-c) * .22);min-width:calc(var(--dbm-c) * 5.9);'
      + 'min-height:calc(var(--dbm-c) * 4.2);padding:calc(var(--dbm-c) * .3);'
      + 'border:2px solid #146B5E;border-radius:10px;background-color:#FBF3E4;}'
      + '.dbm-row{display:flex;gap:calc(var(--dbm-c) * .22);}'
      + '.dbm-c{width:var(--dbm-c);height:var(--dbm-c);border-radius:50%;'
      + 'background-color:#146B5E;flex:none;}'

      /* the hinge: shut when the tray is closed */
      + '.dbm-hinge{width:calc(var(--dbm-c) * .34);align-self:stretch;border-radius:4px;'
      + 'background-color:#E7DCC8;'
      + 'transition-property:background-color,width;transition-duration:var(--dbm-t);}'
      + '.dbm-tray.is-closed .dbm-hinge{background-color:#0D4E44;width:calc(var(--dbm-c) * .22);}'

      /* ⭐ the odd one sits under the hinge, unpartnered and unmarked */
      + '.dbm-odd{display:flex;justify-content:center;margin-top:calc(var(--dbm-c) * .4);'
      + 'min-height:var(--dbm-c);}'
      + '.dbm-odd .dbm-c{box-shadow:0 0 0 3px #F6EAD3, 0 0 0 5px #7A6A55;}'

      + '.dbm-ctl{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.dbm-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;font-weight:600;line-height:1;}'
      /* ⚠ the focus ring is DOUBLED: a panel measured #1E8FD4 on the
         working surface at 2.97:1, under the 3:1 non-text floor. */
      /* ⚠ THE PLATFORM FOCUS COLOUR FAILS ITS OWN FLOOR. Two panels now
         measure #1E8FD4 on the working surface at 2.97:1, under the 3:1
         non-text minimum, and it is almost certainly repo-wide across
         fifty tools. Deep teal carries the contrast at 8.05:1 and the
         cream offset is what separates it from the teal furniture. A
         focus ring nobody can see is not a focus ring. */
      + '.dbm-btn:focus-visible{outline:3px solid #0D4E44;outline-offset:2px;'
      + 'box-shadow:0 0 0 5px #FBF3E4;}'
      + '.dbm-btn.is-off{opacity:.42;}'
      + '.dbm-b-print{border-style:dashed;margin-left:10px;}'
      + '.dbm-b-print.is-paid{border-style:solid;}'

      + '.dbm-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.dbm-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.dbm-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.dbm-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.dbm-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.dbm-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.dbm-sheet{display:none;}'
      + '@media print{'
      + 'body.dbm-printing *{visibility:hidden;}'
      + 'body.dbm-printing .dbm-sheet,body.dbm-printing .dbm-sheet *{visibility:visible;}'
      + 'body.dbm-printing .dbm-wrap>.dbm-card,body.dbm-printing .dbm-ctl{display:none !important;}'
      + 'body.dbm-printing .dbm-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.dbm-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.dbm-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.dbm-p-tray{width:170mm;height:46mm;margin:0 0 12mm;border:1pt solid #000;'
      + 'border-left-width:1pt;position:relative;}'
      + '.dbm-p-tray::after{content:"";position:absolute;left:50%;top:0;bottom:0;'
      + 'border-left:1pt dashed #000;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-dbm', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.DoublingMirror = DoublingMirror;
  if (typeof module !== 'undefined' && module.exports) module.exports = DoublingMirror;
}());
