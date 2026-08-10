/* =====================================================================
   TOOL #49 — THE NUMBER HOTEL   (number-hotel.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v5 catalog entry #5, one of that batch's three
   named heroes. PREV = 'counting-cups'.

   THE CORRIDOR · THE ELEVATOR · THE STAIRS. Three named parts, and
   nothing else in this tool gets a noun. (A room is what a corridor is
   made of, not a fourth part.)

   ⚠⚠ THE INTERACTION PANEL FOUND A BUG IN THE MODEL AS FIRST WRITTEN,
   AND FIXING IT PRODUCED THE BEST THING IN THE TOOL.
       49 --elevator--> 59.  NOT 50.
   The elevator preserves the door position, so it CANNOT be the escape
   from the dead end: escaping the dead end is exactly the move that
   changes the ones digit (9->0) AND the tens digit together, while the
   elevator's whole job is to leave the ones alone. The first draft
   welded two different moves onto one part. The catalog said
   "stairwell" and this build read it as the lift.
   ⭐ THE STAIRS EXIST ONLY AT A CORRIDOR'S END, AND THEY GO UP *AND ALL
   THE WAY BACK* TO DOOR 0. That across-leg is the longest single motion
   in the tool and traverses the whole width of the hotel — AND THAT LEG
   IS THE CARRY. A child watching 49 -> 50 sees that one step of
   counting costs a journey back to the start of a new corridor, which
   is precisely what 9 -> 0 costs.
   So +1 is ALWAYS room+1 — but sometimes it is a walk and sometimes it
   is a climb, and WHICH ONE depends on where you are standing. That is
   the lesson, stated as a fact about the building.

   THE PROMISE: the hundred chart's row break stops being a printing
   convention and becomes a WALL — and the wall is the reason a digit
   changes.

   =====================================================================
   ⚠⚠ THE FENCE CAME BACK THE MOST OCCUPIED IN THE PROGRAMME, AND AN
   ADVERSARIAL SWEEP CONCLUDED "the remainder is one visual assertion,
   not a tool". A four-person pedagogy panel then ruled DO NOT BUILD,
   3-1. Both verdicts are on the record and both were partly right.
   What is already owned, verified with citations:
     - a 10-wide field of 1-100: `number-sieve.js:190` (a structural
       refusal, not a setting) and `choral-counting.js:102`;
     - this tool's own thesis, in prose, inside a shipped tool —
       `number-sieve.js:676-679`: "On a ten-column field a tens digit IS
       a row, and that geometry is the single cleanest place-value
       demonstration in the tool";
     - +10 as one keystroke up a row: `number-sieve.js:1633`;
     - "ones repeat, TENS CLIMB" with Tint-the-tens shipped in eleven
       locales, free tier: `choral-counting.js:9-11,61-62`;
     - "a ten-jump never moves the ones" as a MACHINE-GATED invariant:
       `jump-tens-core.js:38`;
     - "the number after 39", shipped: `track-repair-activities.json:12`;
     - a multi-storey building with floor slabs and a skyline:
       `parking-tower-activity.js:4-8,166`, and `build-plan.js:77`
       FORMALLY DECLARES it owns tower, building, skyline, floor, level;
     - a grid of numerals that IS a building: `build-plan.js:8-9`;
     - a building with named storeys, in eleven locales, in LITERACY:
       `letter-studio.js:220-236` (the Danish skrivehus);
     - and the SAME DREAD, claimed hours earlier by `counting-cups.js`.

   ⭐ THE ONE THING NOTHING OWNS, and it is the join rather than either
   half. The numbered field WRAPS SILENTLY — `number-sieve._fieldKey`
   guards only `next < 1 || next > max`, a bound on the whole field and
   not on a row, so ArrowRight at 10 lands on 11 with no event at all.
   The blank mat REFUSES TO WRAP but means nothing by it —
   `arrow-strip.js:427`: "A BLOCKED MOVE LEAVES THE POSE UNCHANGED. It
   never bounces and it never wraps... 'It is up against the side' is a
   state of the mat, not an error." Nobody refuses to wrap ON A NUMBERED
   FIELD and makes the refusal the lesson. Here the wall is not the edge
   of the apparatus. It is the reason the tens digit changes.

   ⚠ A PANEL SAYING "BUILD SOMETHING ELSE" IS NOT AUTHORITY TO BUILD
   SOMETHING ELSE. That is #47's failure in an expert's coat: there a
   fence argument talked this build out of the commissioned gesture, a
   differently-named tool shipped, and the operator had to correct it.
   Redefining the deliverable is the operator's call. The concern is
   recorded here; the tool is built.

   ⭐⭐ BUT THE PANEL'S REAL OBJECTION WAS RIGHT, AND IT CHANGED THE
   DESIGN: "there is no decision — the child taps, the token goes where
   the rule says, fully predictable from repetition two." As pitched
   that is true, and it would have shipped a demonstration.
   THE REPAIR: THE ROOMS ARE ONLY NUMBERED ON THE CORRIDOR YOU ARE
   STANDING IN. It is physically true of a hotel — you cannot read door
   numbers from the far end of a building — and it fixes everything at
   once:
     - the lift lands you on a BLANK corridor, so the class must SAY the
       room before the doors light. That is the decision, and it is
       1.NBT.C.5 as a spoken prediction rather than a tap;
     - the dead end becomes the child's own discovery instead of a wall
       somebody drew: walking 47, 48, 49 — there simply IS no next door;
     - the routine gets its silence, between "where will we be?" and the
       doors lighting;
     - and it cannot be mistaken for a flat colouring surface at any
       size, because YOU CANNOT SEE THE WHOLE CHART AT ONCE.

   ⚠ AND IT IS NOT `number-talk-easel`'s CURTAIN, which was read rather
   than assumed (`number-talk-easel.js:5-20`): that is a ~3-second TIMED
   FLASH for subitizing, hiding a QUANTITY to force structure-seeing,
   with press-and-hold and a re-flash of an identical seed. This hides
   the DERIVABLE, not the glanceable, and has NO flash, NO timer and NO
   reveal clock. The blankness is structural, not staged.

   ⚠ THE TOOL GRADES NOTHING. The class says the number aloud, the doors
   light, and nobody is marked right or wrong. `jump-tens-core` owns the
   graded +-10 and keeps it.

   =====================================================================
   ⚠⚠ THE CATALOG SPEC WAS INTERNALLY INCONSISTENT, AND FIXING IT IS THE
   DESIGN. The pitch says "rooms 1-100" and, two sentences later, "you
   cannot walk from 49 to 50". Those cannot both be true: with floors of
   41-50, rooms 49 and 50 are on the SAME floor and the corridor walks
   straight between them. The dead end does not exist in a 1-100
   building.
   So the hotel is ROOMS 0-99 ON TEN CORRIDORS 0-9 — and that is not a
   patch, it is the thesis arriving:
     THE CORRIDOR NUMBER IS THE TENS DIGIT, exactly and always. Every
     room on corridor 4 is a forty-something. "The lift ticks the tens
     digit as you rise" becomes literally true rather than metaphorical,
     because the lift's indicator and the tens digit ARE THE SAME
     NUMERAL.
   On a 1-100 building it is false: corridor 1 would hold nine rooms
   with tens digit 0 and one with tens digit 1, and the corridor number
   would name nothing.
   ⚠ NO 1-100 TOGGLE. A setting that lets a teacher put the tool into
   the state where its own thesis is false is the recorded #46 defect
   (the comb that had to be removed because the tray itself was the
   control).
   ⭐ A third argument arrived from the render side: on 0-99 the largest
   numeral is 99 — TWO DIGITS. `folding-wall` needs textLength +
   lengthAdjust for its single `100`; that whole condensation mechanism
   is unnecessary here and one class of render defect cannot occur.

   =====================================================================
   ⚠ EVERY STRUCTURAL NOUN IS OWNED, SO EVERY ONE IS RENAMED. Forbidden
   in this tool, in code and in copy: floor, building, tower, storey,
   level, skyline (all `build-plan.js:77` / `letter-studio.js:224`),
   grid, row, column, line, frame, cell, board, stack, shelf. The
   vertical stack of corridors is just "the hotel"; the lift's indicator
   names the corridor. ⚠ "lift" is a DRAG VERB in sixteen shipped tools,
   so no aria-label may use it as a verb here — it is only ever the
   noun, and the acts are "ride up" and "ride down".

   ⚠ NOT IN v1: the second tower / hundreds skyline. It is triple-owned
   (exchange-machine, counting-cups, place-value-lab), it is a fourth
   named part, and it is a whole second geometry with its own viewport
   arithmetic.
   ⚠ NEVER: a place-value tint. `choral-counting` owns "Tint the ones /
   Tint the tens" in eleven locales, and `number-sieve:92` independently
   refuses it on the grounds that a clue must darken whole cells rather
   than parts of a numeral.

   =====================================================================
   THE MEASURED ARITHMETIC.
   M1  At a 320px viewport the arena is 296px (measured on #47/#48).
       The shaft costs 110 of 1000 viewBox units, leaving 880 for ten
       rooms: a pitch of 88u = 26.0px, and a numeral at 0.60 x pitch =
       15.6px, clear of the 14px legibility floor.
   M2  A ROOM IS THEREFORE NEVER ITS OWN TAP TARGET: 26.0px against a
       34px canvas floor. The house answer is ONE pointer region
       resolving to whatever is under the finger, with invisible
       pointer-events:none buttons beneath for keyboard, AT and the
       liveness gate, as ONE roving-tabindex group rather than a hundred
       tab stops. ⚠ The pad layer must not eat the pointer (#46 shipped
       an inset:0 container that made a tool undriveable by pointer
       while every model assertion passed).
   M3  The four ledge chips carry the movement, and THEY are the tap
       targets, at the 44px chrome floor. The apparatus is read, not
       poked — which is also why a hundred blank doors cost nothing.
   ===================================================================== */
(function () {
  'use strict';

  /* ================= geometry ========================================
     ⚠ EXPOSED so the gate reads the real constants instead of carrying
     its own copy of the number it is checking (#44). The LAWS are
     re-derived in the gate; only these measurements are shared. */
  var GEO = {
    VB_W: 1000, VB_H: 1000,

    SHAFT_X: 0, SHAFT_W: 110,      /* the lift shaft, on the left */
    MARGIN: 10,
    ROOMS: 10, CORRIDORS: 10,

    /* a room's box, in viewBox units */
    ROOM_W: 88,                    /* (1000 - 110 - 10) / 10 */
    CORR_H: 98,                    /* (1000 - 20) / 10 */

    DOOR_F: 0.80,                  /* door width as a fraction of ROOM_W */
    DOOR_H: 0.78,                  /* door height as a fraction of CORR_H */
    NUM_F: 0.60,                   /* numeral size as a fraction of ROOM_W */
    KNOB_F: 0.055,                 /* the door handle */

    /* ⭐ THE MINIMUM-FEATURE LAW: nothing smaller than 0.05 x ROOM_W.
       At a 296px arena that is 1.3px. A hundred doors at a repeating
       pitch will moire on a 1.25-DPR projector if any feature falls
       under it, and a sibling tool measured that a stroke-width:1
       hairline at this size shimmers while two filled shapes antialias
       identically at every scale. */
    MIN_FEATURE: 0.05,

    /* the wall at the end of a corridor */
    WALL_W: 0.16,                  /* as a fraction of ROOM_W */

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips — the
       movement IS the lesson. */
    T_WALK: 260,
    T_REFUSE: 220,                 /* the walk that does not happen */
    T_RIDE: 620,                   /* one corridor, and it TRAVELS */
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_WALK: 660,
    SND_RIDE: 880,
    SND_WALL: 440,
    SND_DEBOUNCE: 220
  };

  var ROOMS = GEO.ROOMS;              /* 10 rooms per corridor */
  var CORRIDORS = GEO.CORRIDORS;      /* 10 corridors, numbered 0..9 */
  var MAX_ROOM = ROOMS * CORRIDORS - 1;   /* 99 */

  var NumberHotel = {

    id: 'number-hotel',

    /* ================= strings ======================================
       Authored English, handed to every native panel as a SOURCE TO
       AUDIT rather than a target. ⚠ No string may say floor, building,
       tower, storey, level or skyline. */
    strings: {
      title:        {
        en: 'The Number Hotel',
        de: 'Das Zahlenhotel',
        fr: 'L’hôtel des cent chambres',
        es: 'El hotel de los números',
        pt: 'O Hotel dos Números',
        it: 'L’albergo dei cento numeri',
        nl: 'Het Getallenhotel',
        sv: 'Talhotellet',
        da: 'Talhotellet',
        no: 'Tallhotellet',
        fi: 'Lukuhotelli'
      },
      /* ⚠ The only explanatory string omitted the stairs AND that the
         corridor ends — the carry is the reason this tool exists, and
         all five panels flagged it. It also still said "lift" while
         every button said "elevator". */
      instruction:  {
        en: 'Every room is a number. One step takes you to the next door along the corridor. The elevator takes you one corridor up, and you can only read the doors on the corridor you are standing in. The corridor ends — from there the stairs carry on.',
        de: 'Jedes Zimmer ist eine Zahl. Ein Schritt bringt uns eine Tür weiter den Flur entlang, der Fahrstuhl einen Flur höher oder tiefer, ohne die Tür zu wechseln, und die Treppe gibt es nur an den beiden Enden eines Flurs. Lesen können wir nur die Türen auf dem Flur, auf dem wir gerade stehen.',
        fr: 'Chaque chambre est un nombre. On marche d’une porte à la suivante le long de la galerie. L’ascenseur monte ou descend d’une galerie et s’arrête toujours devant la même porte. Au bout de la galerie, il n’y a plus de porte, et ce sont les escaliers qui mènent plus loin. On ne lit les numéros que sur la galerie où l’on se tient.',
        es: 'Cada habitación es un número. Al caminar avanzamos una puerta por el pasillo. El ascensor nos sube o nos baja un pasillo entero y siempre nos deja en la misma puerta, y las escaleras están solo en los dos extremos. Solo podemos leer las puertas del pasillo en el que estamos.',
        pt: 'Cada quarto é um número. Um passo leva uma porta adiante no corredor; o elevador leva um corredor para cima ou para baixo e nunca muda a porta. Quando o corredor acaba, quem continua é a escada. E só dá para ler os números do corredor em que a turma está.',
        it: 'Ogni camera è un numero. Un passo ti porta avanti di una porta, l’ascensore ti porta su o giù di un corridoio intero e ti lascia davanti alla stessa porta, e le scale ci sono soltanto alle due estremità. I numeri si leggono solo sul corridoio dove siamo.',
        nl: 'Elke kamer is een getal. Eén stap brengt je naar de volgende deur in de gang. De lift brengt je één gang hoger en laat de deur op zijn plek, en je kunt alleen de deuren lezen van de gang waarin je staat. Aan het eind van de gang houdt het op — daar gaat de trap verder.',
        sv: 'Varje rum är ett tal. Ett steg tar dig till nästa dörr i korridoren. Hissen tar dig en korridor uppåt och lämnar dig vid samma dörr, och du kan bara läsa dörrarna i den korridor du står i. Korridoren tar slut — där fortsätter trappan.',
        da: 'Hvert værelse er et tal. Et skridt fører dig til næste dør i korridoren. Elevatoren fører dig én korridor op og sætter dig af ved den samme dør, og du kan kun læse dørene i den korridor, du står i. Korridoren slutter — dér fortsætter trappen.',
        no: 'Hvert rom er et tall. Ett steg tar deg til neste dør i korridoren. Heisen tar deg én korridor opp og setter deg av ved den samme døra, og du kan bare lese dørene i den korridoren du står i. Korridoren tar slutt — der fortsetter trappa.',
        fi: 'Jokainen huone on luku. Yksi askel vie käytävällä seuraavalle ovelle. Hissi vie yhden käytävän ylöspäin ja jättää saman oven kohdalle, ja ovien numerot näkyvät vain sillä käytävällä, jolla seisot. Käytävä loppuu — siitä eteenpäin mennään portaita.'
      },

      setStart:     {
        en: 'Where the walker starts',
        de: 'Wo wir starten',
        fr: 'Où l’on commence',
        es: 'Dónde empezamos',
        pt: 'Por onde começar',
        it: 'Da dove partiamo',
        nl: 'Waar de gast begint',
        sv: 'Var gästen börjar',
        da: 'Hvor gæsten begynder',
        no: 'Der gjesten starter',
        fi: 'Mistä vieras aloittaa'
      },
      startZero:    {
        en: 'At the very first room',
        de: 'Im allerersten Zimmer',
        fr: 'À la toute première chambre de l’hôtel',
        es: 'En la primera habitación de todas',
        pt: 'No primeiro quarto de todos',
        it: 'Dalla primissima camera dell’albergo',
        nl: 'Bij de allereerste kamer',
        sv: 'Vid allra första rummet',
        da: 'Ved det allerførste værelse',
        no: 'Ved det aller første rommet',
        fi: 'Aivan ensimmäisestä huoneesta'
      },
      startMid:     {
        en: 'Somewhere in the middle',
        de: 'Mitten im Hotel',
        fr: 'Au milieu de l’hôtel',
        es: 'En mitad del hotel',
        pt: 'Bem no meio do hotel',
        it: 'Nel mezzo dell’albergo',
        nl: 'Midden in het hotel',
        sv: 'Mitt i hotellet',
        da: 'Midt i hotellet',
        no: 'Midt i hotellet',
        fi: 'Keskeltä hotellia'
      },

      /* ⚠⚠ THE FOUR DIRECTIONAL CHIPS ARE NEVER DISABLED, and that is a
         ruling, not an oversight. Greying out "walk on" at room 49
         DELETES THE LESSON: the wall has to be MET. A child who cannot
         press the button never discovers that the corridor ends, and
         the whole tool becomes a demonstration again. So these have no
         *Off label — they have a REFUSAL, announced by the building. */
      walkRight:    {
        en: 'Walk on to the next door',
        de: 'Einen Schritt weiter zur nächsten Tür',
        fr: 'Avancer jusqu’à la porte suivante',
        es: 'Caminar hasta la siguiente puerta',
        pt: 'Dar um passo até a próxima porta',
        it: 'Vai avanti di una porta',
        nl: 'Eén deur verder lopen',
        sv: 'Gå vidare till nästa dörr',
        da: 'Gå videre til næste dør',
        no: 'Gå videre til neste dør',
        fi: 'Kävele seuraavalle ovelle'
      },
      walkLeft:     {
        en: 'Walk back to the door before',
        de: 'Einen Schritt zurück zur Tür davor',
        fr: 'Revenir à la porte précédente',
        es: 'Volver hasta la puerta anterior',
        pt: 'Dar um passo de volta, até a porta anterior',
        it: 'Torna indietro di una porta',
        nl: 'Eén deur terug lopen',
        sv: 'Gå tillbaka till dörren innan',
        da: 'Gå tilbage til døren før',
        no: 'Gå tilbake til døra før',
        fi: 'Kävele takaisin edelliselle ovelle'
      },
      liftUp:       {
        en: 'Take the elevator up one corridor',
        de: 'Mit dem Fahrstuhl einen Flur höher — dieselbe Tür',
        fr: 'Prendre l’ascenseur, une galerie plus haut — la même porte',
        es: 'Subir un pasillo en el ascensor — la misma puerta',
        pt: 'Subir um corredor de elevador — a mesma porta',
        it: 'Sali di un corridoio con l’ascensore — la stessa porta',
        nl: 'Met de lift één gang omhoog — dezelfde deur',
        sv: 'Ta hissen en korridor uppåt — samma dörr',
        da: 'Tag elevatoren én korridor op — den samme dør',
        no: 'Ta heisen én korridor opp — den samme døra',
        fi: 'Hissillä yksi käytävä ylöspäin — sama ovi'
      },
      liftDown:     {
        en: 'Take the elevator down one corridor',
        de: 'Mit dem Fahrstuhl einen Flur tiefer — dieselbe Tür',
        fr: 'Prendre l’ascenseur, une galerie plus bas — la même porte',
        es: 'Bajar un pasillo en el ascensor — la misma puerta',
        pt: 'Descer um corredor de elevador — a mesma porta',
        it: 'Scendi di un corridoio con l’ascensore — la stessa porta',
        nl: 'Met de lift één gang omlaag — dezelfde deur',
        sv: 'Ta hissen en korridor nedåt — samma dörr',
        da: 'Tag elevatoren én korridor ned — den samme dør',
        no: 'Ta heisen én korridor ned — den samme døra',
        fi: 'Hissillä yksi käytävä alaspäin — sama ovi'
      },
      /* ⚠ ENGLISH SAYS "ELEVATOR", NOT "LIFT". `lift` is a DRAG VERB in
         sixteen shipped tools ("lift the piece", "lifted counters"), so
         an aria-label saying "the lift" reads ambiguously against all
         of their copy. Other locales are free to use their own ordinary
         word — this collision is English-only. */

      /* the stairs are the ONE conditional control, and even then they
         are aria-disabled rather than disabled: focusable, and they
         state their requirement out loud. */
      stairsUpAt:   {
        en: 'Take the stairs up to the first door of the next corridor',
        de: 'Die Treppe hinauf zur ersten Tür des nächsten Flurs',
        fr: 'Prendre les escaliers jusqu’à la première porte de la galerie du dessus',
        es: 'Subir por las escaleras hasta la primera puerta del pasillo de arriba',
        pt: 'Subir pela escada até a primeira porta do corredor de cima',
        it: 'Sali le scale fino alla prima porta del corridoio di sopra',
        nl: 'Met de trap omhoog, naar de eerste deur van de volgende gang',
        sv: 'Ta trappan upp till första dörren i nästa korridor',
        da: 'Tag trappen op til den første dør i næste korridor',
        no: 'Ta trappa opp til den første døra i neste korridor',
        fi: 'Mene portaita ylös seuraavan käytävän ensimmäiselle ovelle'
      },
      stairsDownAt: {
        en: 'Take the stairs down to the last door of the corridor below',
        de: 'Die Treppe hinunter zur letzten Tür des Flurs darunter',
        fr: 'Prendre les escaliers jusqu’à la dernière porte de la galerie du dessous',
        es: 'Bajar por las escaleras hasta la última puerta del pasillo de abajo',
        pt: 'Descer pela escada até a última porta do corredor de baixo',
        it: 'Scendi le scale fino all’ultima porta del corridoio di sotto',
        nl: 'Met de trap omlaag, naar de laatste deur van de gang eronder',
        sv: 'Ta trappan ner till sista dörren i korridoren under',
        da: 'Tag trappen ned til den sidste dør i korridoren nedenunder',
        no: 'Ta trappa ned til den siste døra i korridoren under',
        fi: 'Mene portaita alas alemman käytävän viimeiselle ovelle'
      },
      /* ⚠ "this room is in the middle of one" was FALSE at rooms 0 and
         99, which are ends. This wording is true everywhere. */
      stairsOff:    {
        en: 'Take the stairs — there are stairs only at the two ends of a corridor, and none leads away from this room.',
        de: 'Die Treppe nehmen — Treppen gibt es nur an den beiden Enden eines Flurs, und von hier aus führt keine weg.',
        fr: 'Prendre les escaliers — il y a des escaliers seulement aux deux bouts d’une galerie, et d’ici on ne peut pas les rejoindre.',
        es: 'Ir por las escaleras: las escaleras están solo en los dos extremos de cada pasillo, y de esta habitación no sale ninguna.',
        pt: 'Ir pela escada — só existe escada nas duas pontas de um corredor, e deste quarto não sai nenhuma.',
        it: 'Prendi le scale — le scale ci sono soltanto alle due estremità del corridoio, e da questa camera non ne parte nessuna.',
        nl: 'De trap — een trap is er alleen aan de twee uiteinden van een gang, en vanaf hier gaat er geen weg.',
        sv: 'Ta trappan — trappor finns bara i korridorens två ändar, och härifrån leder ingen bort.',
        da: 'Tag trappen — der er kun trapper i korridorens to ender, og herfra fører ingen væk.',
        no: 'Ta trappa — det er bare trapper i de to endene av en korridor, og herfra fører ingen bort.',
        fi: 'Portaat — portaita on vain käytävän molemmissa päissä, eikä täältä lähde yhtään.'
      },

      printBtn:     {
        en: 'Print the hotel sheet',
        de: 'Das Hotelblatt ausdrucken',
        fr: 'Imprimer la feuille de l’hôtel',
        es: 'Imprimir la hoja del hotel',
        pt: 'Imprimir a folha do hotel',
        it: 'Stampa il foglio dell’albergo',
        nl: 'Het hotelblad afdrukken',
        sv: 'Skriv ut hotellbladet',
        da: 'Udskriv hotelarket',
        no: 'Skriv ut hotellarket',
        fi: 'Tulosta hotellipohja'
      },
      printLocked:  {
        en: 'Print the hotel sheet — this one needs a Teacher plan.',
        de: 'Das Hotelblatt ausdrucken — dafür braucht es das Lehrkraft-Abo.',
        fr: 'Imprimer la feuille de l’hôtel — il faut un abonnement Enseignant.',
        es: 'Imprimir la hoja del hotel: esta hoja va con el plan Docente.',
        pt: 'Imprimir a folha do hotel — esta precisa do plano Professor.',
        it: 'Stampa il foglio dell’albergo — per questo serve il piano Insegnante.',
        nl: 'Het hotelblad afdrukken — hiervoor is een Leerkracht-abonnement nodig.',
        sv: 'Skriv ut hotellbladet — det kräver en Lärarprenumeration.',
        da: 'Udskriv hotelarket — det kræver et Lærerabonnement.',
        no: 'Skriv ut hotellarket — det krever et Lærerabonnement.',
        fi: 'Tulosta hotellipohja — tähän tarvitaan Opettajatilaus.'
      },

      roomPad:      {
        en: 'Room {n}, on this corridor.',
        de: 'Zimmer {n}, auf diesem Flur.',
        fr: 'Chambre {n}, sur cette galerie.',
        es: 'Habitación {n}, en este pasillo.',
        pt: 'Quarto {n}, neste corredor.',
        it: 'Camera {n}, in questo corridoio.',
        nl: 'Kamer {n}, in deze gang.',
        sv: 'Rum {n}, i den här korridoren.',
        da: 'Værelse {n}, i denne korridor.',
        no: 'Rom {n}, i denne korridoren.',
        fi: 'Huone {n}, tällä käytävällä.'
      },
      roomPadDark:  {
        en: 'A door on another corridor. Its number cannot be read from here.',
        de: 'Eine Tür auf einem anderen Flur. Ihre Nummer ist von hier aus nicht zu lesen.',
        fr: 'Une porte sur une autre galerie. D’ici, son numéro ne se lit pas.',
        es: 'Una puerta de otro pasillo. Su número no se puede leer desde aquí.',
        pt: 'Uma porta de outro corredor. Daqui não dá para ler o número dela.',
        it: 'Una porta di un altro corridoio. Da qui il suo numero non si legge.',
        nl: 'Een deur in een andere gang. Dit nummer is hiervandaan niet te lezen.',
        sv: 'En dörr i en annan korridor. Numret går inte att läsa härifrån.',
        da: 'En dør i en anden korridor. Nummeret kan ikke læses herfra.',
        no: 'Ei dør i en annen korridor. Nummeret kan ikke leses herfra.',
        fi: 'Ovi toisella käytävällä. Sen numero ei näy tänne.'
      },
      roomHere:     {
        en: 'Room {n}. This is where we are standing.',
        de: 'Zimmer {n}. Hier stehen wir.',
        fr: 'Chambre {n}. C’est ici que nous sommes.',
        es: 'Habitación {n}. Aquí estamos.',
        pt: 'Quarto {n}. É aqui que a gente está.',
        it: 'Camera {n}. È qui che siamo.',
        nl: 'Kamer {n}. Hier staan we.',
        sv: 'Rum {n}. Här står vi.',
        da: 'Værelse {n}. Her står vi.',
        no: 'Rom {n}. Her står vi.',
        fi: 'Huone {n}. Tässä me seisomme.'
      },
      shaftLabel:   {
        en: 'The elevator. Its indicator reads {c}, and that is the corridor it is standing on.',
        de: 'Der Fahrstuhl. Seine Anzeige zeigt {c}, und das ist der Flur, auf dem er steht.',
        fr: 'L’ascenseur. Son cadran indique {c}, et c’est la galerie devant laquelle il est arrêté.',
        es: 'El ascensor. Su indicador marca {c}, que es el pasillo en el que está parado.',
        pt: 'O elevador. O número aceso nele é {c}, o corredor em que ele está parado.',
        it: 'L’ascensore. Il suo indicatore segna {c}, cioè il corridoio dove si trova adesso.',
        nl: 'De lift. De teller staat op {c}, en dat is de gang waar de lift nu is.',
        sv: 'Hissen. Visaren står på {c}, och det är korridoren hissen står i.',
        da: 'Elevatoren. Viseren står på {c}, og det er den korridor, elevatoren står i.',
        no: 'Heisen. Viseren står på {c}, og det er korridoren heisen står i.',
        fi: 'Hissi. Näytössä lukee {c}, ja sillä käytävällä hissi on.'
      },

      saidWalk:     {
        en: 'Room {n}.',
        de: 'Zimmer {n}.',
        fr: 'Chambre {n}.',
        es: 'Habitación {n}.',
        pt: 'Quarto {n}.',
        it: 'Camera {n}.',
        nl: 'Kamer {n}.',
        sv: 'Rum {n}.',
        da: 'Værelse {n}.',
        no: 'Rom {n}.',
        fi: 'Huone {n}.'
      },
      /* ⭐ THE REFUSAL IS THE BUILDING ANSWERING, NOT A CORRECTION. It
         never says "no" and never says "wrong" — it states a fact about
         the corridor, and the stairs are named as the way on. */
      /* ⚠⚠ THIS SENTENCE WAS FALSE AT EXACTLY TWO ROOMS, AND THE TOOL
         OPENS ONE TAP AWAY FROM ONE OF THEM. At room 99 canWalkRight
         and canStairs are BOTH false, and at room 0 so are canWalkLeft
         and canStairs — yet the refusal promised "the stairs are the
         way on". `newState()` starts at room 0. Found by a native panel
         reading the model, not the copy.
         The fix is to state a GENERAL FACT about the hotel rather than
         a promise about here: it is true at all 100 rooms that the only
         way between corridors is the stairs, including where no
         staircase leads anywhere. */
      saidWallEnd:  {
        en: 'The corridor ends here. There is no door after room {n} — from one corridor to the next, the only way is the stairs.',
        de: 'Hier endet der Flur. Nach Zimmer {n} kommt keine Tür mehr — von einem Flur zum nächsten geht es nur über die Treppe.',
        fr: 'La galerie s’arrête ici. Il n’y a pas de porte après la chambre {n} — d’une galerie à l’autre, on ne passe que par les escaliers.',
        es: 'El pasillo se acaba aquí. Después de la habitación {n} no hay ninguna puerta más: de un pasillo a otro solo se pasa por las escaleras.',
        pt: 'O corredor termina aqui. Depois do quarto {n} não existe porta — de um corredor para o outro, só pela escada.',
        it: 'Qui il corridoio finisce. Dopo la camera {n} non c’è nessun’altra porta: da un corridoio all’altro si passa soltanto per le scale.',
        nl: 'Hier houdt de gang op. Na kamer {n} komt geen deur meer — van de ene gang naar de andere gaat het alleen via de trap.',
        sv: 'Här tar korridoren slut. Efter rum {n} finns ingen dörr — från en korridor till nästa kommer man bara via trappan.',
        da: 'Her slutter korridoren. Efter værelse {n} er der ingen dør — fra én korridor til den næste kommer man kun ad trappen.',
        no: 'Her tar korridoren slutt. Etter rom {n} er det ingen dør — fra én korridor til den neste kommer man bare opp trappa.',
        fi: 'Käytävä loppuu tähän. Huoneen {n} jälkeen ei ole enää ovea — käytävältä toiselle pääsee vain portaita.'
      },
      saidWallStart:{
        en: 'The corridor starts here. There is no door before room {n} — from one corridor to the next, the only way is the stairs.',
        de: 'Hier beginnt der Flur. Vor Zimmer {n} gibt es keine Tür — von einem Flur zum nächsten geht es nur über die Treppe.',
        fr: 'La galerie commence ici. Il n’y a pas de porte avant la chambre {n} — d’une galerie à l’autre, on ne passe que par les escaliers.',
        es: 'El pasillo empieza aquí. Antes de la habitación {n} no hay ninguna puerta: de un pasillo a otro solo se pasa por las escaleras.',
        pt: 'O corredor começa aqui. Antes do quarto {n} não existe porta — de um corredor para o outro, só pela escada.',
        it: 'Qui il corridoio comincia. Prima della camera {n} non c’è nessuna porta: da un corridoio all’altro si passa soltanto per le scale.',
        nl: 'Hier begint de gang. Vóór kamer {n} komt geen deur — van de ene gang naar de andere gaat het alleen via de trap.',
        sv: 'Här börjar korridoren. Före rum {n} finns ingen dörr — från en korridor till nästa kommer man bara via trappan.',
        da: 'Her begynder korridoren. Før værelse {n} er der ingen dør — fra én korridor til den næste kommer man kun ad trappen.',
        no: 'Her begynner korridoren. Før rom {n} er det ingen dør — fra én korridor til den neste kommer man bare opp trappa.',
        fi: 'Käytävä alkaa tästä. Ennen huonetta {n} ei ole ovea — käytävältä toiselle pääsee vain portaita.'
      },
      /* ⚠ A refusal that never says nothing moved leaves a screen-reader
         user unable to tell whether they travelled. */
      saidTop:      {
        en: 'This is the highest corridor in the hotel. The elevator stays where it is.',
        de: 'Das ist der oberste Flur im Hotel. Der Fahrstuhl bleibt, wo er ist.',
        fr: 'C’est la galerie la plus haute de l’hôtel. L’ascenseur reste où il est.',
        es: 'Este es el pasillo más alto del hotel. El ascensor se queda donde está.',
        pt: 'Este é o corredor mais alto do hotel. O elevador fica onde está.',
        it: 'Questo è il corridoio più in alto dell’albergo. L’ascensore resta dov’è.',
        nl: 'Dit is de hoogste gang van het hotel. De lift blijft staan.',
        sv: 'Det här är hotellets översta korridor. Hissen står kvar.',
        da: 'Det er hotellets øverste korridor. Elevatoren bliver stående.',
        no: 'Dette er den øverste korridoren i hotellet. Heisen blir stående.',
        fi: 'Tämä on hotellin ylin käytävä. Hissi jää paikalleen.'
      },
      saidBottom:   {
        en: 'This is the lowest corridor in the hotel. The elevator stays where it is.',
        de: 'Das ist der unterste Flur im Hotel. Der Fahrstuhl bleibt, wo er ist.',
        fr: 'C’est la galerie la plus basse de l’hôtel. L’ascenseur reste où il est.',
        es: 'Este es el pasillo más bajo del hotel. El ascensor se queda donde está.',
        pt: 'Este é o corredor mais baixo do hotel. O elevador fica onde está.',
        it: 'Questo è il corridoio più in basso dell’albergo. L’ascensore resta dov’è.',
        nl: 'Dit is de laagste gang van het hotel. De lift blijft staan.',
        sv: 'Det här är hotellets nedersta korridor. Hissen står kvar.',
        da: 'Det er hotellets nederste korridor. Elevatoren bliver stående.',
        no: 'Dette er den nederste korridoren i hotellet. Heisen blir stående.',
        fi: 'Tämä on hotellin alin käytävä. Hissi jää paikalleen.'
      },
      saidRideUp:   {
        en: 'Going up one corridor. The doors up there cannot be read until we arrive.',
        de: 'Wir fahren einen Flur höher. Die Tür bleibt dieselbe, aber die Türen dort oben können wir erst lesen, wenn wir angekommen sind.',
        fr: 'On monte d’une galerie. La porte reste la même, mais là-haut les numéros ne se liront qu’en arrivant.',
        es: 'Subimos un pasillo. La puerta es la misma, pero las de arriba no se pueden leer hasta llegar.',
        pt: 'Subindo um corredor. A porta é a mesma, mas só dá para ler os números de lá quando a gente chegar.',
        it: 'Saliamo di un corridoio. Restiamo davanti alla stessa porta, ma i numeri lassù si leggeranno solo quando saremo arrivati.',
        nl: 'We gaan één gang omhoog. De deur blijft dezelfde, maar de deuren daarboven kun je pas lezen als we er zijn.',
        sv: 'Vi åker upp en korridor. Dörren är densamma, men dörrarna där uppe går inte att läsa förrän vi är framme.',
        da: 'Vi kører én korridor op. Døren er den samme, men dørene deroppe kan først læses, når vi er fremme.',
        no: 'Vi kjører én korridor opp. Døra er den samme, men dørene der oppe kan ikke leses før vi er framme.',
        fi: 'Noustaan yksi käytävä ylöspäin. Ovi on sama, mutta ylempien ovien numerot näkyvät vasta perillä.'
      },
      saidRideDown: {
        en: 'Going down one corridor. The doors down there cannot be read until we arrive.',
        de: 'Wir fahren einen Flur tiefer. Die Tür bleibt dieselbe, aber die Türen dort unten können wir erst lesen, wenn wir angekommen sind.',
        fr: 'On descend d’une galerie. La porte reste la même, mais en bas les numéros ne se liront qu’en arrivant.',
        es: 'Bajamos un pasillo. La puerta es la misma, pero las de abajo no se pueden leer hasta llegar.',
        pt: 'Descendo um corredor. A porta é a mesma, mas só dá para ler os números de lá quando a gente chegar.',
        it: 'Scendiamo di un corridoio. Restiamo davanti alla stessa porta, ma i numeri laggiù si leggeranno solo quando saremo arrivati.',
        nl: 'We gaan één gang omlaag. De deur blijft dezelfde, maar de deuren daarbeneden kun je pas lezen als we er zijn.',
        sv: 'Vi åker ner en korridor. Dörren är densamma, men dörrarna där nere går inte att läsa förrän vi är framme.',
        da: 'Vi kører én korridor ned. Døren er den samme, men dørene dernede kan først læses, når vi er fremme.',
        no: 'Vi kjører én korridor ned. Døra er den samme, men dørene der nede kan ikke leses før vi er framme.',
        fi: 'Laskeudutaan yksi käytävä alaspäin. Ovi on sama, mutta alempien ovien numerot näkyvät vasta perillä.'
      },
      saidStairsUp: {
        en: 'Up the stairs and all the way back along the new corridor, to room {n}.',
        de: 'Die Treppe hinauf und dann den ganzen neuen Flur zurück bis zur ersten Tür: Zimmer {n}.',
        fr: 'Les escaliers, puis tout le chemin en sens inverse le long de la nouvelle galerie, jusqu’à la chambre {n}.',
        es: 'Escaleras arriba y de vuelta por todo el pasillo nuevo, hasta la habitación {n}.',
        pt: 'Escada acima e depois o corredor novo inteiro de volta, até o quarto {n}.',
        it: 'Su per le scale e poi tutto indietro lungo il corridoio nuovo, fino alla camera {n}.',
        nl: 'De trap op en dan de hele nieuwe gang terug, tot kamer {n}.',
        sv: 'Upp för trappan och hela nya korridoren tillbaka, till rum {n}.',
        da: 'Op ad trappen og hele den nye korridor tilbage, til værelse {n}.',
        no: 'Opp trappa og hele den nye korridoren tilbake, til rom {n}.',
        fi: 'Portaita ylös ja koko uusi käytävä takaisin alkuun: huone {n}.'
      },
      saidStairsDn: {
        en: 'Down the stairs and all the way along to the far end, to room {n}.',
        de: 'Die Treppe hinunter und dann den ganzen Flur entlang bis ans andere Ende: Zimmer {n}.',
        fr: 'Les escaliers, puis tout le chemin le long de la galerie du dessous, jusqu’à sa dernière porte, la chambre {n}.',
        es: 'Escaleras abajo y por todo el pasillo hasta el otro extremo, la habitación {n}.',
        pt: 'Escada abaixo e depois o corredor inteiro até a outra ponta, no quarto {n}.',
        it: 'Giù per le scale e poi tutto avanti fino in fondo, alla camera {n}.',
        nl: 'De trap af en dan de hele gang door tot het eind, tot kamer {n}.',
        sv: 'Ner för trappan och hela korridoren bort till andra änden, till rum {n}.',
        da: 'Ned ad trappen og hele korridoren hen til den anden ende, til værelse {n}.',
        no: 'Ned trappa og hele korridoren bort til den andre enden, til rom {n}.',
        fi: 'Portaita alas ja koko käytävä toiseen päähän: huone {n}.'
      },
      /* ⚠⚠ THIS WAS BYTE-IDENTICAL TO saidWalk, so arriving by elevator
         or stairs sounded exactly like one step — and the arrival is
         the one moment the dark corridor becomes readable, which is the
         tool's central idea. It had no voice. */
      saidArrive:   {
        en: 'Room {n}. Now this corridor can be read.',
        de: 'Zimmer {n}. Jetzt können wir diesen Flur lesen.',
        fr: 'Chambre {n}. Maintenant, cette galerie se lit.',
        es: 'Habitación {n}. Ahora ya se pueden leer las puertas de este pasillo.',
        pt: 'Quarto {n}. Agora dá para ler os números deste corredor.',
        it: 'Camera {n}. Adesso questo corridoio si può leggere.',
        nl: 'Kamer {n}. Nu is deze gang te lezen.',
        sv: 'Rum {n}. Nu går den här korridoren att läsa.',
        da: 'Værelse {n}. Nu kan denne korridor læses.',
        no: 'Rom {n}. Nå kan denne korridoren leses.',
        fi: 'Huone {n}. Nyt tämän käytävän numerot näkyvät.'
      },
      readState:    {
        en: 'Corridor {c}. Room {n}. The doors on every other corridor cannot be read from here.',
        de: 'Flur {c}. Zimmer {n}. Die Türen auf allen anderen Fluren sind von hier aus nicht zu lesen.',
        fr: 'Galerie {c}. Chambre {n}. D’ici, les portes des autres galeries ne se lisent pas.',
        es: 'Pasillo {c}. Habitación {n}. Las puertas de los demás pasillos no se pueden leer desde aquí.',
        pt: 'Corredor {c}. Quarto {n}. Daqui não dá para ler os números dos outros corredores.',
        it: 'Corridoio {c}. Camera {n}. Da qui i numeri degli altri corridoi non si leggono.',
        nl: 'Gang {c}. Kamer {n}. De deuren van alle andere gangen zijn hiervandaan niet te lezen.',
        sv: 'Korridor {c}. Rum {n}. Dörrarna i alla andra korridorer går inte att läsa härifrån.',
        da: 'Korridor {c}. Værelse {n}. Dørene i alle andre korridorer kan ikke læses herfra.',
        no: 'Korridor {c}. Rom {n}. Dørene i alle andre korridorer kan ikke leses herfra.',
        fi: 'Käytävä {c}. Huone {n}. Muiden käytävien ovet eivät näy tänne.'
      },

      gateTitle:    {
        en: 'The hotel sheet',
        de: 'Das Hotelblatt',
        fr: 'La feuille de l’hôtel',
        es: 'La hoja del hotel',
        pt: 'A folha do hotel',
        it: 'Il foglio dell’albergo',
        nl: 'Het hotelblad',
        sv: 'Hotellbladet',
        da: 'Hotelarket',
        no: 'Hotellarket',
        fi: 'Hotellipohja'
      },
      /* ⚠⚠ THIS CONTRADICTED sheetNote. The gate sold "every door blank";
         the sheet says one corridor is filled in — and _buildSheet really
         does fill one. Two strings, two different pieces of paper. */
      gateBody:     {
        en: 'A paper hotel with the doors left empty, so the class writes the room numbers in themselves. One corridor is filled in to start them off.',
        de: 'Ein Hotel auf Papier: Ein Flur ist schon ausgefüllt, alle anderen Türen sind leer, und die Klasse schreibt die Zimmernummern selbst hinein.',
        fr: 'Un hôtel de papier où une seule galerie est déjà remplie, toutes les autres portes attendant d’être numérotées par la classe.',
        es: 'Un hotel en papel con las puertas en blanco y un solo pasillo ya escrito para arrancar, para que la clase escriba a mano todas las demás habitaciones.',
        pt: 'Um hotel no papel com um corredor já preenchido e as outras portas em branco, para a turma escrever os números que faltam.',
        it: 'Un albergo di carta con le porte da riempire: un corridoio è già scritto come esempio, tutti gli altri li completa la classe.',
        nl: 'Een hotel op papier met lege deuren, zodat de klas de kamernummers zelf invult. Eén gang is al ingevuld als voorbeeld.',
        sv: 'Ett hotell på papper med tomma dörrar, så att klassen skriver in rummen själva. En korridor är ifylld som start.',
        da: 'Et hotel på papir med tomme døre, så klassen selv skriver værelserne ind. Én korridor er udfyldt som start.',
        no: 'Et hotell på papir med tomme dører, så klassen skriver inn rommene selv. Én korridor er fylt ut som start.',
        fi: 'Paperinen hotelli, jonka ovet ovat tyhjiä, niin luokka kirjoittaa huoneiden numerot itse. Yksi käytävä on täytetty valmiiksi.'
      },
      gateCta:      {
        en: 'See the Teacher plan',
        de: 'Das Lehrkraft-Abo ansehen',
        fr: 'Voir l’abonnement Enseignant',
        es: 'Ver el plan Docente',
        pt: 'Conhecer o plano Professor',
        it: 'Scopri il piano Insegnante',
        nl: 'Bekijk het Leerkracht-abonnement',
        sv: 'Se Lärarprenumerationen',
        da: 'Se Lærerabonnementet',
        no: 'Se Lærerabonnementet',
        fi: 'Tutustu Opettajatilaukseen'
      },
      gateClose:    {
        en: 'Close',
        de: 'Schließen',
        fr: 'Fermer',
        es: 'Cerrar',
        pt: 'Fechar',
        it: 'Chiudi',
        nl: 'Sluiten',
        sv: 'Stäng',
        da: 'Luk',
        no: 'Lukk',
        fi: 'Sulje'
      },

      sheetTitle:   {
        en: 'Our hotel',
        de: 'Unser Hotel',
        fr: 'Notre hôtel',
        es: 'Nuestro hotel',
        pt: 'Nosso hotel',
        it: 'Il nostro albergo',
        nl: 'Ons hotel',
        sv: 'Vårt hotell',
        da: 'Vores hotel',
        no: 'Hotellet vårt',
        fi: 'Meidän hotelli'
      },
      sheetNote:    {
        en: 'Write the number on every door. One corridor is filled in to start you off.',
        de: 'Schreibt auf jede Tür die Zahl. Ein Flur ist schon ausgefüllt.',
        fr: 'Écris le numéro sur chaque porte. Une galerie est déjà remplie, pour te donner le départ.',
        es: 'Escribe el número en cada puerta. Un pasillo ya está escrito para empezar.',
        pt: 'Um corredor já está preenchido. Escreva o número nas outras portas.',
        it: 'Scrivi il numero su ogni porta. Un corridoio è già completo, per cominciare.',
        nl: 'Schrijf op elke deur het nummer. Eén gang is al ingevuld om te beginnen.',
        sv: 'Skriv numret på varje dörr. En korridor är ifylld så att ni kommer igång.',
        da: 'Skriv nummeret på hver dør. Én korridor er udfyldt, så I kommer i gang.',
        no: 'Skriv nummeret på hver dør. Én korridor er fylt ut så dere kommer i gang.',
        fi: 'Kirjoita numero jokaiseen oveen. Yksi käytävä on täytetty valmiiksi alkuun.'
      }
    },

    /* ⚠ EXACTLY ONE SETTING, and it is a START STATE, not memory.
       ⚠ THERE IS NO 1-100 TOGGLE. A setting that lets a teacher put the
       tool into the state where its own thesis is false is the #46
       defect. */
    settings: [
      { key: 'start', type: 'choice', labelKey: 'setStart', options: [
        { value: 'zero', labelKey: 'startZero' },
        { value: 'mid',  labelKey: 'startMid' }
      ] }
    ],
    defaults: { start: 'zero' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       Pure, DOM-free, finite and small: 100 rooms x 4 moves = 400
       transitions, so the gate enumerates the whole space rather than
       sampling it.

       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM: `room` is a single integer in 0..99, so there is no way to
       be in two rooms, on no corridor, or between corridors. */

    /* ⚠ TOTAL. Must survive null, 0, NaN, a string and an array.
       #39 shipped `st || newState()`, which passes 0 and hands [] to
       .length. */
    _st: function (st) {
      var o = (st && typeof st === 'object' && !Array.isArray(st)) ? st : {};
      var room = (typeof o.room === 'number' && isFinite(o.room)) ? Math.floor(o.room) : 0;
      if (room < 0) room = 0;
      if (room > MAX_ROOM) room = MAX_ROOM;
      var visited = Array.isArray(o.visited) ? o.visited : [];
      return { room: room, visited: visited };
    },

    /* ⭐ THE CORRIDOR NUMBER IS THE TENS DIGIT. Not "corresponds to" —
       IS. This one line is the whole tool's claim, and the gate proves
       it for all 100 rooms against its own independently derived
       arithmetic. */
    corridorOf: function (room) { return Math.floor(this._st({ room: room }).room / ROOMS); },
    doorOf:     function (room) { return this._st({ room: room }).room % ROOMS; },

    /* ---- what each move is allowed to do -----------------------------
       ⚠ THE REFUSALS ARE THE TOOL. A blocked move leaves the state
       IDENTICAL — it never bounces, never wraps, and never nudges.
       Wrapping is what every other numbered field does silently, and it
       is precisely the thing this tool exists to refuse:
       `arrow-strip.js:427` — "a beetle does not leave one edge and
       appear at the other". */
    canWalkRight: function (st) { return this.doorOf(this._st(st).room) < ROOMS - 1; },
    canWalkLeft:  function (st) { return this.doorOf(this._st(st).room) > 0; },
    canRideUp:    function (st) { return this.corridorOf(this._st(st).room) < CORRIDORS - 1; },
    canRideDown:  function (st) { return this.corridorOf(this._st(st).room) > 0; },

    /* ⭐ THE STAIRS: the ONLY move that changes both digits at once, and
       the only one that exists at just two places on a corridor.
       At the last door they climb to the FIRST door of the next
       corridor; at the first door they descend to the LAST door of the
       one below. Everywhere else there are no stairs to take. */
    canStairs: function (st) {
      st = this._st(st);
      var d = this.doorOf(st.room), c = this.corridorOf(st.room);
      if (d === ROOMS - 1) return c < CORRIDORS - 1;
      if (d === 0) return c > 0;
      return false;
    },

    /* ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. */
    walkRight: function (st) {
      st = this._st(st);
      if (!this.canWalkRight(st)) return null;
      return { st: this._go(st, st.room + 1), kind: 'walk' };
    },
    walkLeft: function (st) {
      st = this._st(st);
      if (!this.canWalkLeft(st)) return null;
      return { st: this._go(st, st.room - 1), kind: 'walk' };
    },
    rideUp: function (st) {
      st = this._st(st);
      if (!this.canRideUp(st)) return null;
      return { st: this._go(st, st.room + ROOMS), kind: 'ride' };
    },
    rideDown: function (st) {
      st = this._st(st);
      if (!this.canRideDown(st)) return null;
      return { st: this._go(st, st.room - ROOMS), kind: 'ride' };
    },
    stairs: function (st) {
      st = this._st(st);
      if (!this.canStairs(st)) return null;
      var d = this.doorOf(st.room);
      var to = (d === ROOMS - 1) ? st.room + 1 : st.room - 1;
      return { st: this._go(st, to), kind: 'stairs', up: d === ROOMS - 1 };
    },

    _go: function (st, room) {
      var v = st.visited.slice();
      v[room] = true;
      return { room: room, visited: v };
    },

    /* ⭐ THE READABILITY RULE, and it is the whole repair to "there is
       no decision": A DOOR'S NUMBER IS READABLE ONLY FROM ITS OWN
       CORRIDOR. The lift therefore lands the class somewhere they must
       NAME before they can read it. */
    canRead: function (st, room) {
      st = this._st(st);
      return this.corridorOf(room) === this.corridorOf(st.room);
    },

    newState: function (start) {
      var room = 0;
      if (start === 'mid') room = 44;
      var v = [];
      v[room] = true;
      return { room: room, visited: v };
    },

    /* ================= lifecycle ===================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('nhl-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. The shell pins overflow:hidden on BOTH
         html and body (`lcs-shell.css:54`), so on a standalone phone
         there is no iframe to grow into and scrollY is stuck at 0 —
         #47 measured a control row beginning at y=558 in a 568px window
         and PHYSICALLY UNREACHABLE.
         ⚠ TWO RULES. `html,body.x{...}` is a selector LIST whose html
         half applies unconditionally, which makes the class decorative
         and its mutation unkillable (#22's trap). */
      document.documentElement.classList.add('nhl-scroll');
      document.body.classList.add('nhl-scroll');

      this._anim = null;
      this._lastSound = 0;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.start);
      this._checkEntitlement();
      this._bindPrint();
    },

    /* ⚠ reset() MUST EXIST or the shell's button is dead on every path
       (#43). It survives embed and embed=compact. */
    reset: function () {
      this._anim = null;
      this.st = this.newState(this.api.settings.start);
      this.render();
    },

    onSettings: function () { this.reset(); },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    _snd: function (freq) {
      var now = Date.now();
      if (now - this._lastSound < GEO.SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(freq);
    },

    _fmt: function (s, vals) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (vals && vals[k] != null) ? String(vals[k]) : m;
      });
    },

    render: function () { this._build(); this._paint(); },

    /* ---- geometry helpers, shared by the screen AND the print sheet
       so there is never a second copy of the arithmetic -------------- */
    roomX: function (door) { return GEO.SHAFT_W + door * GEO.ROOM_W; },
    /* ⭐ corridor 0 is at the BOTTOM. A building requires it and a chart
       does not — which is exactly the difference this tool is making. */
    corrY: function (corr) { return GEO.MARGIN + (CORRIDORS - 1 - corr) * GEO.CORR_H; },

    _svg: function (tag, attrs) {
      var n = document.createElementNS('http://www.w3.org/2000/svg', tag);
      if (attrs) for (var k in attrs) if (attrs.hasOwnProperty(k)) n.setAttribute(k, attrs[k]);
      return n;
    },

    /* ================= DOM ========================================== */
    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'nhl-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'nhl-card');
      var arena = api.el('div', 'nhl-arena');
      this._arena = arena;

      var svg = this._svg('svg', {
        viewBox: '0 0 ' + GEO.VB_W + ' ' + GEO.VB_H, class: 'nhl-svg', role: 'img'
      });
      this._svgRoot = svg;
      arena.appendChild(svg);

      var pads = api.el('div', 'nhl-pads');
      this._pads = pads;
      arena.appendChild(pads);
      card.appendChild(arena);

      var ledge = api.el('div', 'nhl-ledge');
      this._btnLeft  = this._chip(ledge, 'nhl-b-left',  this._gArrow('left'),  function () { self._do('walkLeft'); });
      this._btnRight = this._chip(ledge, 'nhl-b-right', this._gArrow('right'), function () { self._do('walkRight'); });
      this._btnStair = this._chip(ledge, 'nhl-b-stair', this._gStairs(),       function () { self._do('stairs'); });
      this._btnUp    = this._chip(ledge, 'nhl-b-up',    this._gLift('up'),     function () { self._do('rideUp'); });
      this._btnDown  = this._chip(ledge, 'nhl-b-down',  this._gLift('down'),   function () { self._do('rideDown'); });
      this._btnPrint = this._chip(ledge, 'nhl-b-print', this._gPrint(), function () {
        if (!self.premium) { self._showGate(); return; }
        self._buildSheet(); window.print();
      });
      card.appendChild(ledge);
      wrap.appendChild(card);
      api.stage.appendChild(wrap);

      /* ⚠ THE SHEET IS A SIBLING OF THE WRAP, NEVER A CHILD — the print
         block sets `.nhl-wrap{display:none}` and a hidden parent kills
         the whole subtree, so a sheet built inside it measures 0mm on
         paper while every assertion stays green (#40, #41, #46, #47). */
      this._sheet = api.el('div', 'nhl-sheet');
      api.stage.appendChild(this._sheet);

      this._bindKeys();
    },

    _chip: function (parent, cls, glyph, fn) {
      var b = this.api.el('button', 'nhl-btn ' + cls);
      b.type = 'button';
      b.innerHTML = glyph;
      /* ⚠ A SYNTHETIC .click() NEVER FIRES pointerdown, and the shared
         liveness gate drives controls that way — #41 scored DEAD on all
         nine paths because its only handler was a pointer one. */
      b.addEventListener('click', fn);
      parent.appendChild(b);
      return b;
    },

    /* ⚠ NO OPERATOR GLYPH ANYWHERE, INCLUDING ONE DRAWN BY CODE (#46
       shipped a literal "+" into eleven locales because the stepper
       DREW it, surviving every string ban). These are arrows, a stair
       profile and a car. */
    _gArrow: function (dir) {
      var d = dir === 'left' ? 'M15 5 L8 12 L15 19' : 'M9 5 L16 12 L9 19';
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + d
        + '" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    },
    _gLift: function (dir) {
      var a = dir === 'up' ? 'M12 18 V6 M7 11 L12 6 L17 11' : 'M12 6 V18 M7 13 L12 18 L17 13';
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
        + '<rect x="4" y="3" width="16" height="18" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>'
        + '<path d="' + a + '" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    },
    _gStairs: function () {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
        + '<path d="M3 20 h5 v-4 h5 v-4 h5 v-4 h3" fill="none" stroke="currentColor" '
        + 'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    },
    _gPrint: function () {
      return '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
        + '<path d="M7 9V4h10v5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>'
        + '<rect x="4" y="9" width="16" height="7" rx="1.6" fill="none" stroke="currentColor" stroke-width="2.2"/>'
        + '<rect x="7" y="15" width="10" height="5" rx="1" fill="none" stroke="currentColor" stroke-width="2.2"/></svg>';
    },

    /* ================= paint ======================================== */
    _paint: function () {
      var svg = this._svgRoot;
      if (!svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var st = this.st, api = this.api;
      var here = this.corridorOf(st.room);
      var anim = this._anim;

      /* the hotel's own body */
      svg.appendChild(this._svg('rect', {
        x: 0, y: 0, width: GEO.VB_W, height: GEO.VB_H, rx: 14, class: 'nhl-body'
      }));

      this._paintShaft(svg, st, here, anim);
      this._paintCorridors(svg, st, here, anim);

      svg.setAttribute('aria-label', this._fmt(api.t('readState'), { c: here, n: st.room }));
      this._syncChips();
      this._syncPads(st, here);
    },

    _paintShaft: function (svg, st, here, anim) {
      /* ⚠⚠ shaftLabel WAS A DEAD STRING — the only name for the
         elevator's indicator, i.e. the tool's central claim (the
         indicator IS the tens digit), had no accessible name at all. */
      var g = this._svg('g', { class: 'nhl-shaft', role: 'img' });
      g.setAttribute('aria-label', this._fmt(this.api.t('shaftLabel'), { c: here }));
      g.appendChild(this._svg('rect', {
        x: GEO.SHAFT_X, y: 0, width: GEO.SHAFT_W, height: GEO.VB_H, class: 'nhl-shaft-bed'
      }));
      /* the car, on the corridor it serves */
      var carC = here;
      if (anim && anim.kind === 'ride') carC = anim.from + (anim.to - anim.from) * anim.t;
      var cy = this.corrY(carC) + GEO.CORR_H * 0.5;
      var ch = GEO.CORR_H * 0.72, cw = GEO.SHAFT_W * 0.62;
      g.appendChild(this._svg('rect', {
        x: GEO.SHAFT_W * 0.19, y: cy - ch / 2, width: cw, height: ch,
        rx: 6, class: 'nhl-car'
      }));
      /* ⭐ THE INDICATOR IS THE TENS DIGIT. Not "shows" it — IS it. It
         is drawn in the same ink and the same weight as a room numeral,
         because they are the same numeral.
         ⚠ NO PLACE-VALUE TINT — `choral-counting` owns "Tint the tens"
         in eleven locales and `number-sieve:92` independently refuses
         the same thing. */
      var ind = this._svg('text', {
        x: GEO.SHAFT_W * 0.5, y: cy, 'text-anchor': 'middle',
        'dominant-baseline': 'central', class: 'nhl-ind',
        'font-size': GEO.ROOM_W * GEO.NUM_F
      });
      ind.appendChild(document.createTextNode(String(Math.round(carC))));
      g.appendChild(ind);
      svg.appendChild(g);
    },

    _paintCorridors: function (svg, st, here, anim) {
      var g = this._svg('g', { class: 'nhl-corrs' });
      var c, d, i;
      for (c = 0; c < CORRIDORS; c++) {
        var y = this.corrY(c);
        var lit = (c === here);
        /* the corridor's own floor line */
        g.appendChild(this._svg('rect', {
          x: GEO.SHAFT_W, y: y, width: GEO.ROOM_W * ROOMS, height: GEO.CORR_H,
          class: 'nhl-corr' + (lit ? ' is-here' : '')
        }));

        /* ⭐⭐ THE END WALLS. Visible AT REST at 40% opacity, so the
           explanation is on screen BEFORE a child ever presses into
           them — the refusal then confirms something already seen
           rather than springing a surprise. */
        var wpx = GEO.ROOM_W * GEO.WALL_W;
        g.appendChild(this._svg('rect', {
          x: GEO.SHAFT_W - wpx * 0.5, y: y, width: wpx, height: GEO.CORR_H,
          class: 'nhl-wall' + (lit ? ' is-here' : '')
            + (lit && anim && anim.kind === 'refuse' && anim.side === 'left' ? ' is-lit' : '')
        }));
        g.appendChild(this._svg('rect', {
          x: GEO.SHAFT_W + GEO.ROOM_W * ROOMS - wpx * 0.5, y: y, width: wpx, height: GEO.CORR_H,
          class: 'nhl-wall' + (lit ? ' is-here' : '')
            + (lit && anim && anim.kind === 'refuse' && anim.side === 'right' ? ' is-lit' : '')
        }));

        for (d = 0; d < ROOMS; d++) {
          var room = c * ROOMS + d;
          var x = this.roomX(d);
          var dw = GEO.ROOM_W * GEO.DOOR_F, dh = GEO.CORR_H * GEO.DOOR_H;
          var dx = x + (GEO.ROOM_W - dw) / 2, dy = y + (GEO.CORR_H - dh) / 2;
          /* ⚠⚠ THE WALK AND THE STAIRS ANIMATED NOTHING. `_paint`
             branched on anim.kind only for 'ride' and 'refuse', so
             kind:'walk' and kind:'stairs' reached `_run` and rendered
             a FREEZE followed by a jump — and the docblock calls the
             stairs leg "THAT LEG IS THE CARRY". The carry was
             invisible. The marker now travels for both. */
          var isHere = (room === st.room);
          if (anim && (anim.kind === 'walk' || anim.kind === 'stairs')) {
            isHere = (room === anim.from);
          }
          g.appendChild(this._svg('rect', {
            x: dx, y: dy, width: dw, height: dh, rx: 4,
            class: 'nhl-door' + (lit ? ' is-lit' : '') + (isHere ? ' is-here' : '')
              + (st.visited[room] && !lit ? ' is-seen' : '')
          }));
          /* the handle — the one thing that makes a rectangle a door */
          g.appendChild(this._svg('circle', {
            cx: dx + dw * 0.84, cy: dy + dh * 0.5, r: GEO.ROOM_W * GEO.KNOB_F,
            class: 'nhl-knob' + (lit ? ' is-lit' : '')
          }));

          /* ⭐⭐ THE READABILITY RULE, RENDERED: a numeral exists ONLY on
             the corridor we are standing on. This is the decision the
             pedagogy panel said the tool lacked — the elevator lands the
             class somewhere they must NAME before they can read it. */
          if (lit) {
            var t = this._svg('text', {
              x: dx + dw * 0.44, y: dy + dh * 0.5, 'text-anchor': 'middle',
              'dominant-baseline': 'central',
              class: 'nhl-num' + (isHere ? ' is-here' : ''),
              'font-size': GEO.ROOM_W * GEO.NUM_F
            });
            t.appendChild(document.createTextNode(String(room)));
            g.appendChild(t);
          }
        }
      }
      /* the traveller in flight: a walk slides one pitch, the stairs
         climb AND run the whole width back — the long leg is the carry,
         and it has to be seen to be the point. */
      if (anim && (anim.kind === 'walk' || anim.kind === 'stairs') && anim.from != null) {
        var fx = this.roomX(anim.from % ROOMS) + GEO.ROOM_W / 2;
        var fy = this.corrY(Math.floor(anim.from / ROOMS)) + GEO.CORR_H / 2;
        var tx = this.roomX(anim.to % ROOMS) + GEO.ROOM_W / 2;
        var ty = this.corrY(Math.floor(anim.to / ROOMS)) + GEO.CORR_H / 2;
        var e = anim.t;
        g.appendChild(this._svg('circle', {
          cx: fx + (tx - fx) * e, cy: fy + (ty - fy) * e,
          r: GEO.ROOM_W * 0.16, class: 'nhl-trav'
        }));
      }
      svg.appendChild(g);
    },

    /* ================= motion =======================================
       ⭐ ONE INTERPOLATOR, one rAF loop, one `t`. A completion callback
       would show cause between two objects instead of one object
       changing.
       ⭐ THE STAIRS AND THE ELEVATOR TAKE THE SAME TIME TO WITHIN 20ms,
       and that is deliberate: the difference between the two moves is
       THE SHAPE OF THE PATH, never the cost. A first draft had the
       stairs slower, which would have taught that +1 is more work than
       +10. */
    _run: function (spec, done) {
      var self = this, t0 = null, total = spec.total;
      this._anim = spec;
      spec.t = 0;
      function frame(ts) {
        if (t0 === null) t0 = ts;
        var el = ts - t0;
        spec.t = Math.min(1, el / total);
        self._paint();
        if (el < total) window.requestAnimationFrame(frame);
        else { self._anim = null; if (done) done(); self._paint(); }
      }
      window.requestAnimationFrame(frame);
    },

    /* ================= acts ========================================= */
    _do: function (move) {
      if (this._anim) return;
      var api = this.api, self = this, st = this.st;
      var res = this[move] ? this[move](st) : null;

      if (!res) { this._refuse(move); return; }

      if (res.kind === 'ride') {
        var from = this.corridorOf(st.room), to = this.corridorOf(res.st.room);
        this._snd(GEO.SND_RIDE);
        api.announce(api.t(to > from ? 'saidRideUp' : 'saidRideDown'));
        this._run({ kind: 'ride', from: from, to: to, total: this._dur(GEO.T_RIDE) }, function () {
          self.st = res.st;
          api.announce(self._fmt(api.t('saidArrive'), { n: res.st.room }));
          self._paint();
        });
        return;
      }

      if (res.kind === 'stairs') {
        this._snd(GEO.SND_RIDE);
        this._run({ kind: 'stairs', from: st.room, to: res.st.room, total: this._dur(GEO.T_RIDE) }, function () {
          self.st = res.st;
          api.announce(self._fmt(api.t(res.up ? 'saidStairsUp' : 'saidStairsDn'), { n: res.st.room }));
          self._paint();
        });
        return;
      }

      /* ⚠ T_WALK USED TO BE DECLARED AND NEVER READ. The art panel found
         that `exchange-machine.js:197-203` ships FIVE motion constants
         that no call site reaches — a ceremony documented and never
         implemented, made to look shipped by the named-constants
         convention. This file had three of its own, and a gate now
         proves every one reaches a call site (verify L11). */
      this._snd(GEO.SND_WALK);
      var from = st.room;
      this._run({ kind: 'walk', from: from, to: res.st.room, total: this._dur(GEO.T_WALK) }, function () {
        self.st = res.st;
        api.announce(self._fmt(api.t('saidWalk'), { n: res.st.room }));
        self._paint();
      });
    },

    /* ⭐⭐ THE BUILDING ANSWERS, NOT THE TRAVELLER. The guest does not
       move at all: the end wall of the corridor lights, holds and
       fades. NO BOUNCE and NO RECOIL — those are bounces in costume,
       and `arrow-strip.js:427` is explicit that a blocked move leaves
       the pose unchanged, because "it is up against the side" is a
       state of the mat, not an error.
       ⚠ And the announcement never says "no" or "wrong". It states a
       fact about the corridor and names the stairs as the way on. */
    _refuse: function (move) {
      var api = this.api, self = this, st = this.st;
      var n = st.room, msg, side = null;
      if (move === 'walkRight') { side = 'right'; msg = this._fmt(api.t('saidWallEnd'), { n: n }); }
      else if (move === 'walkLeft') { side = 'left'; msg = this._fmt(api.t('saidWallStart'), { n: n }); }
      else if (move === 'rideUp') { msg = api.t('saidTop'); }
      else if (move === 'rideDown') { msg = api.t('saidBottom'); }
      else { msg = api.t('stairsOff'); }
      this._snd(GEO.SND_WALL);
      api.announce(msg);
      if (!side) { return; }
      this._run({ kind: 'refuse', side: side, total: this._dur(GEO.T_REFUSE) });
    },

    /* ================= chips ======================================== */
    _syncChips: function () {
      var api = this.api, st = this.st;
      /* ⚠ THE FOUR DIRECTIONAL CHIPS ARE NEVER DISABLED. The wall has to
         be MET; a child who cannot press the button never discovers the
         corridor ends. */
      this._btnLeft.setAttribute('aria-label', api.t('walkLeft'));
      this._btnRight.setAttribute('aria-label', api.t('walkRight'));
      this._btnUp.setAttribute('aria-label', api.t('liftUp'));
      this._btnDown.setAttribute('aria-label', api.t('liftDown'));

      /* the stairs are the one conditional control, and even then they
         are aria-disabled: focusable, and they state their requirement */
      var can = this.canStairs(st), d = this.doorOf(st.room);
      this._btnStair.setAttribute('aria-disabled', can ? 'false' : 'true');
      this._btnStair.className = 'nhl-btn nhl-b-stair' + (can ? '' : ' is-off');
      this._btnStair.setAttribute('aria-label',
        can ? api.t(d === ROOMS - 1 ? 'stairsUpAt' : 'stairsDownAt') : api.t('stairsOff'));

      this._btnPrint.setAttribute('aria-label', api.t(this.premium ? 'printBtn' : 'printLocked'));
      this._btnPrint.className = 'nhl-btn nhl-b-print' + (this.premium ? ' is-paid' : '');
    },

    /* ================= keyboard / AT =================================
       ⚠ ONE ROVING-TABINDEX GROUP, NOT A HUNDRED TAB STOPS. A screen-
       reader user tabbing through a hundred doors is reading a chart
       aloud, which is the thing this tool exists to replace.
       ⚠ The pad layer is pointer-events:none — #46 shipped an inset:0
       container that made a tool undriveable by pointer while every
       model assertion passed. */
    _syncPads: function (st, here) {
      var pads = this._pads, api = this.api, self = this;
      if (!pads) return;
      if (pads.childNodes.length !== ROOMS * CORRIDORS) {
        while (pads.firstChild) pads.removeChild(pads.firstChild);
        for (var c = 0; c < CORRIDORS; c++) {
          for (var d = 0; d < ROOMS; d++) {
            (function (room) {
              var b = api.el('button', 'nhl-pad');
              b.type = 'button';
              b.setAttribute('data-room', String(room));
              b.style.left = (100 * self.roomX(room % ROOMS) / GEO.VB_W) + '%';
              b.style.top = (100 * self.corrY(Math.floor(room / ROOMS)) / GEO.VB_H) + '%';
              b.style.width = (100 * GEO.ROOM_W / GEO.VB_W) + '%';
              b.style.height = (100 * GEO.CORR_H / GEO.VB_H) + '%';
              pads.appendChild(b);
            }(c * ROOMS + d));
          }
        }
      }
      for (var i = 0; i < pads.childNodes.length; i++) {
        var pad = pads.childNodes[i];
        if (!pad.setAttribute) continue;
        var room = parseInt(pad.getAttribute('data-room'), 10);
        var readable = this.canRead(st, room);
        pad.tabIndex = (room === st.room) ? 0 : -1;
        pad.setAttribute('aria-label', room === st.room
          ? this._fmt(api.t('roomHere'), { n: room })
          : (readable ? this._fmt(api.t('roomPad'), { n: room }) : api.t('roomPadDark')));
      }
    },

    _bindKeys: function () {
      var self = this;
      if (!this._pads) return;
      this._pads.addEventListener('keydown', function (e) {
        var map = { ArrowRight: 'walkRight', ArrowLeft: 'walkLeft', ArrowUp: 'rideUp', ArrowDown: 'rideDown' };
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') { e.preventDefault(); self._do('stairs'); return; }
        if (!map[e.key]) return;
        e.preventDefault();
        self._do(map[e.key]);
        var cur = self._pads.querySelector('.nhl-pad[data-room="' + self.st.room + '"]');
        if (cur && cur.focus) cur.focus();
      });
    },

    /* ================= paywall + entitlement ======================== */
    _showGate: function () {
      var api = this.api;
      if (this._gate) { this._gate.classList.add('is-on'); return; }
      var g = api.el('div', 'nhl-gate is-on');
      var box = api.el('div', 'nhl-gate-box');
      var h = api.el('h2', 'nhl-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'nhl-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'nhl-gate-cta');
      a.href = '/' + (api.lang || 'en') + '/pricing';
      a.textContent = api.t('gateCta');
      var c = api.el('button', 'nhl-gate-x');
      c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () { g.classList.remove('is-on'); });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box); this._wrap.appendChild(g); this._gate = g;
    },

    /* ⚠ UNKNOWN ENTITLEMENT IS PESSIMISTIC — free-tier-locked, never
       optimistically unlocked, and offline degrades to the free tier. */
    _checkEntitlement: function () {
      var self = this;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            if (self._wrap) self._syncChips();
          })['catch'](function () {});
      } catch (e) { /* free tier */ }
    },

    /* ================= print ========================================
       ⭐ THE PAPER HOTEL HAS EVERY DOOR BLANK BUT ONE CORRIDOR, so the
       class writes the rooms in themselves. Ink inverts: the screen
       fills, the paper outlines. */
    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () { if (self.premium) self._buildSheet(); });
      window.addEventListener('afterprint', function () { document.body.classList.remove('nhl-printing'); });
    },

    _buildSheet: function () {
      var api = this.api, sheet = this._sheet;
      if (!sheet) return;
      while (sheet.firstChild) sheet.removeChild(sheet.firstChild);
      var h = api.el('h2', 'nhl-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'nhl-sheet-note'); n.textContent = api.t('sheetNote');
      sheet.appendChild(h); sheet.appendChild(n);

      var svg = this._svg('svg', { viewBox: '0 0 1000 1000', class: 'nhl-sheet-svg' });
      var given = this.corridorOf(this.st.room);
      for (var c = 0; c < CORRIDORS; c++) {
        var y = this.corrY(c);
        for (var d = 0; d < ROOMS; d++) {
          var x = this.roomX(d), room = c * ROOMS + d;
          var dw = GEO.ROOM_W * GEO.DOOR_F, dh = GEO.CORR_H * GEO.DOOR_H;
          svg.appendChild(this._svg('rect', {
            x: x + (GEO.ROOM_W - dw) / 2, y: y + (GEO.CORR_H - dh) / 2,
            width: dw, height: dh, rx: 4, class: 'nhl-p-door'
          }));
          if (c === given) {
            var t = this._svg('text', {
              x: x + GEO.ROOM_W / 2, y: y + GEO.CORR_H / 2, 'text-anchor': 'middle',
              'dominant-baseline': 'central', class: 'nhl-p-num',
              'font-size': GEO.ROOM_W * GEO.NUM_F
            });
            t.appendChild(document.createTextNode(String(room)));
            svg.appendChild(t);
          }
        }
      }
      svg.appendChild(this._svg('rect', {
        x: 2, y: 2, width: GEO.SHAFT_W, height: 996, class: 'nhl-p-shaft'
      }));
      sheet.appendChild(svg);
      document.body.classList.add('nhl-printing');
    }
  };

  /* ================= CSS ==========================================
     Two hues and no third. ⚠ NO GREEN AND NO RED IN THE PALETTE, so no
     colour is available to encode correctness even by accident — and
     this tool refuses nothing as an error, it only states facts about
     the building.
     ⚠ INK NEVER APPEARS ON TEAL (2.22:1). ⚠ BARE CORAL NEVER CARRIES A
     FINE MARK (2.52:1 on cream). */
  function injectCSS() {
    if (document.querySelector('style[data-nhl]')) return;
    var css = ''
      /* ⚠ TWO RULES, never `html,body.nhl-scroll{...}` — that is a
         selector LIST whose html half applies unconditionally, which
         makes the class decorative and its mutation unkillable (#22). */
      + 'html.nhl-scroll{overflow-y:auto;height:auto;min-height:100%;}'
      + 'body.nhl-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'

      + '.nhl-wrap{display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.nhl-card{width:100%;max-width:600px;background:#FBF3E4;border:1.5px solid #E7DCC8;'
      + 'border-radius:18px;padding:10px 10px 8px;box-sizing:border-box;'
      + 'box-shadow:0 1px 0 #E7DCC8,0 10px 24px rgba(20,107,94,.10);}'

      /* ⚠ WIDTH-CAPPED INSIDE HEIGHT QUERIES, NEVER A max-height on an
         aspect-ratio box — that letterboxes the SVG while the
         %-positioned pads stay bound to the box (#43). */
      + '.nhl-arena{position:relative;width:100%;max-width:560px;margin:0 auto;aspect-ratio:1/1;}'
      + '@media (max-height:780px){.nhl-arena{max-width:460px;}}'
      + '@media (max-height:660px){.nhl-arena{max-width:380px;}}'
      + '@media (max-height:560px){.nhl-arena{max-width:300px;}}'
      + '@media (min-width:1367px) and (min-height:820px){.nhl-arena{max-width:640px;}}'
      + '@media (min-width:1800px) and (min-height:1000px){.nhl-arena{max-width:780px;}}'
      + '.nhl-svg{display:block;width:100%;height:100%;}'

      + '.nhl-body{fill:#146B5E;}'
      + '.nhl-shaft-bed{fill:#0D4E44;}'
      + '.nhl-car{fill:#FBF3E4;stroke:#E7DCC8;stroke-width:2;}'
      + '.nhl-ind{fill:#2A2A35;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;}'

      /* an unlit corridor is the building seen from outside: you can
         make out that there are doors, and nothing more */
      + '.nhl-corr{fill:#0D4E44;}'
      + '.nhl-corr.is-here{fill:#F6EAD3;}'
      + '.nhl-door{fill:#125F54;}'
      + '.nhl-door.is-seen{fill:#17705F;}'
      + '.nhl-door.is-lit{fill:#FBF3E4;stroke:#E7DCC8;stroke-width:1.5;}'
      + '.nhl-door.is-here{fill:#F2784B;stroke:#A34122;stroke-width:2.5;}'
      + '.nhl-knob{fill:#0A3F38;}'
      + '.nhl-knob.is-lit{fill:#DCCBA8;}'
      + '.nhl-num{fill:#2A2A35;font-family:"Baloo 2",system-ui,sans-serif;font-weight:600;}'
      + '.nhl-num.is-here{fill:#FBF3E4;font-weight:700;}'

      /* ⭐⭐ THE END WALL. Visible AT REST so the explanation is on
         screen before a child ever presses into it; it lights when the
         corridor answers. */
      + '.nhl-wall{fill:#FBF3E4;opacity:.22;}'
      + '.nhl-wall.is-here{opacity:.40;}'
      + '.nhl-wall.is-lit{fill:#F2784B;opacity:1;}'
      + '.nhl-trav{fill:#F2784B;stroke:#A34122;stroke-width:4;}'

      + '.nhl-pads{position:absolute;inset:0;pointer-events:none;}'
      + '.nhl-pad{position:absolute;margin:0;padding:0;border:0;background:transparent;'
      + 'opacity:0;pointer-events:none;cursor:default;}'
      + '.nhl-pad:focus-visible{opacity:1;outline:3px solid #1E8FD4;outline-offset:-3px;border-radius:6px;}'

      + '.nhl-ledge{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:8px;}'
      + '.nhl-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'width:48px;height:48px;min-width:48px;border-radius:12px;border:1.5px solid #146B5E;'
      + 'background:#FBF3E4;color:#146B5E;cursor:pointer;padding:0;}'
      + '.nhl-btn svg{width:24px;height:24px;}'
      + '.nhl-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.nhl-b-stair.is-off{opacity:.42;}'
      + '.nhl-b-print{border-style:dashed;margin-left:10px;}'
      + '.nhl-b-print.is-paid{border-style:solid;}'

      + '.nhl-gate{position:absolute;inset:0;display:none;align-items:center;justify-content:center;'
      + 'background:rgba(42,42,53,.42);border-radius:18px;padding:12px;}'
      + '.nhl-gate.is-on{display:flex;}'
      + '.nhl-gate-box{background:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.nhl-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.nhl-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.nhl-gate-cta{display:inline-block;background:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.nhl-gate-x{display:block;margin:10px auto 0;background:none;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.nhl-sheet{display:none;}'
      /* ⚠ SCOPED to a class the sheet itself adds — an unscoped
         @media print block prints a BLANK PAGE for everybody who
         presses Ctrl+P (#40, #41, #47). */
      + '@media print{'
      + 'body.nhl-printing *{visibility:hidden;}'
      + 'body.nhl-printing .nhl-sheet,body.nhl-printing .nhl-sheet *{visibility:visible;}'
      + 'body.nhl-printing .nhl-wrap{display:none !important;}'
      + 'body.nhl-printing .nhl-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.nhl-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.nhl-sheet-note{margin:0 0 4mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.nhl-sheet-svg{display:block;width:170mm;height:auto;margin:0 auto;}'
      + '.nhl-p-door{fill:none;stroke:#000;stroke-width:3;}'
      + '.nhl-p-shaft{fill:none;stroke:#000;stroke-width:3;}'
      + '.nhl-p-num{fill:#000;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-nhl', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.NumberHotel = NumberHotel;
  if (typeof module !== 'undefined' && module.exports) module.exports = NumberHotel;
}());
