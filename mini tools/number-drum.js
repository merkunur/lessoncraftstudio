/* =====================================================================
   TOOL #50 — THE NUMBER DRUM
   =====================================================================
   Two rings of numerals standing side by side in a frame. Crank the
   right-hand ring and the numerals come round; crank it past 9 and the
   left-hand ring is DRAGGED round with it, because a tooth on the right
   ring catches a notch on the left one and there is nowhere else for
   either of them to go.

   ⭐⭐ THE INVENTION, and it is the ONE claim four tools' worth of fence
   does not touch: NOTHING ON THE SHELF MODELS THE ONES AS A CLOSED RING.
   `number-hotel`'s corridor ENDS at door 9 and draws a wall. `number-
   sieve`'s row ends. `choral-counting`'s column ends. Every numbered
   field on this platform stops at 9, so on every one of them 9→0 is a
   BREAK. On a ring it is a NEIGHBOUR: the numeral above the 9 is the 8
   and the numeral below the 9 is the 0, always, visibly, at rest. A
   child who says "thirty-nine, forty-TEN" has not learnt that the ones
   COME BACK ROUND — and no shipped tool shows them coming back round,
   because they all stop.

   ⚖️ THE PEDAGOGY PANEL RULED **DO NOT BUILD**, 3-1, AND THE RULING IS
   RECORDED HERE RATHER THAN ANSWERED. Its case was not #49 at all:
   `choral-counting.js:129-135` already ships per-locale boundary presets
   free in eleven locales (the "localisation moat" the catalog sells as
   this tool's paid differentiator); `learning-clock.js:1148` IS a gear
   engine with an unreachable decoupled state; `exchange-machine.js:20`
   owns "one machine running in two directions"; and
   `bundle-machine-core.js:8-13` states the house doctrine that condemns
   a crank outright — "the cognition lives in the gate-CONDITION, not
   the trigger act." Its sharpest point is not a fence point: "forty-ten"
   is a GENERATIVE NAMING error, it lives in the mouth, not the display,
   so "wrong states are unreachable" is this design's weakest boast and
   not its strongest.
   ⚠ #47's rule binds: redefining the deliverable is the operator's call,
   not a panel's. The objection goes on the record and the tool is built
   — and the panel's own dissent, which it dismissed as "one visual
   assertion", is what the tool was built around.

   ⭐ THE DECISION, because a free-play instrument with no decision is
   furniture. A ring has no unreadable state, so #49's "say it before you
   can read it" cannot be reused. The decision here is WHERE TO STOP.
   In SLOW the crank moves a HALF NOTCH, so the class can park the
   apparatus mid-engagement — 29 hanging on the edge of 30, both rings
   caught between two numerals — and argue about it.
   ⚠⚠ AND THE PANEL'S REFUSE-LIST IS RIGHT THAT A COUNTING NUMBER MUST
   NEVER HAVE AN IN-BETWEEN VALUE. Adjudicated: THE MID-ENGAGEMENT STATE
   IS A MACHINE STATE, NEVER A NUMBER. Which is why THIS TOOL HAS NO
   READOUT AT ALL — the rings ARE the number. Mid-turn the number is
   genuinely not yet determined, which is honest rather than fractional.
   A box reading "29.5" would be exactly the defect the panel names;
   there is no box.

   ⚠ EVERY NOUN THIS TOOL COULD HAVE USED IS OWNED. The fence returned:
   drum (`syllable-splitter.js:8` — a tapped drum is that instrument's
   only control, `tapDrum` in 11 locales), cog (~20 files call a round-
   type a cog), gear (`learning-clock.js:1148`), dial (`learning-clock`,
   plus the unbuilt A6 "Grouping Dial"), handle (TOOL #40 IS The Unit
   Handle), lever (`bundle-machine-core.js:63`), counter (banned as a
   material name in every locale by `exchange-machine.js:105`), tape
   (#40, #41), column (`place-value-core`; #45 renamed its own to LANE
   to clear it), roller (`measurement-bench` ships a rolling-pin in 11
   locales), tumbler (`draw-bag.js:2129`, a known art hazard).
   SO THE PARTS ARE: THE RINGS · THE FRAME · THE TOOTH · THE CRANK.
   "Drum" survives in the product NAME only, which is the operator's,
   and appears nowhere in the apparatus or in any locale's part-names.

   ⚠ NO WORDS ON THE APPARATUS (§23.2). The rings carry numerals; the
   frame carries nothing. Every authored string is chrome, a screen-
   reader label, or the paid sheet. Legible with the sound off.

   ⚠ THE TOOTH IS PART OF THE RING, NOT A SECOND PIECE OF ARITHMETIC.
   It is drawn on the ring's own 9-cells and rides the same transform,
   so it is at the linkage bar when the 9 is at the window BY
   CONSTRUCTION — there is no second formula that could disagree with
   the first (#43's two-circles defect, where a mark and its grip were
   positioned by two expressions that were never meant to agree).

   FREE   ALL THREE RINGS, 0-999, forward, back, the tens on its own,
          and the slow crank — including 99→100, where two teeth catch
          one after the other.
   PAID   the paper rings to cut out and roll.
   ⭐ THE TIER WAS INVERTED FROM THE CATALOG, on the interaction panel's
   reading of §23.1 ("free apparatus, paid depth and record"). The
   hundreds is APPARATUS — a third identical part, no new geometry and
   no new noun — and 99→100 is the best thing this tool does, so
   charging for it would gut the demonstration the tool exists to give.
   #49 had to REFUSE its hundreds because that would have been a second
   building; here it is one more ring on the same shaft.
   ⚠ NOT SOLD: a boundary preset shelf. `choral-counting.js:129-135`
   ships per-locale boundary presets free in eleven locales, and selling
   the same thing twice would be a lie.

   ===================================================================== */
(function () {
  'use strict';

  /* ================= geometry ========================================
     ⚠ EXPOSED so the gate reads the real measurements instead of
     carrying its own copy of the number it is checking (#44). The LAWS
     are re-derived in the gate; only these constants are shared.
     ⚠ AND EVERY ONE OF THEM MUST REACH A CALL SITE — `exchange-machine`
     ships five that nothing reads and #49 shipped three (verify L11). */
  var GEO = {
    /* the ring's alphabet and the strip that draws it ---------------
       A ring of ten numerals cannot be drawn by ten cells, because the
       window shows the numeral above and the numeral below and the ring
       has no first or last cell. The strip repeats: 14 cells whose
       digit is (i + 8) % 10, so index 0 is an 8 and index 13 is a 1,
       and the numeral BELOW the 9 is the 0 at every position. */
    STRIP: 14,
    STRIP_OFF: 8,       /* digit(i) = (i + STRIP_OFF) % 10 */
    /* the strip index standing AT the window is p + LEAD. With
       STRIP_OFF 8 that is p + 2, which leaves index 0 as headroom above
       and indices 12-13 as headroom below, so the seam between the 9
       and the 0 can be shown half-turned without running off either
       end of the strip. ⚠ Off by one here and every numeral in the tool
       is wrong by one, silently and consistently. */
    LEAD: 2,
    WINDOW: 3,          /* numerals visible per ring: above, at, below */

    RINGS_FREE: 2,
    RINGS_PAID: 3,
    TOP_FREE: 99,
    TOP_PAID: 999,

    /* a notch is one numeral; SLOW halves it. The model counts HALF
       notches so that "between two numerals" is representable exactly
       and "half a number" is not representable at all. */
    HALF: 2,
    JUMP: 10,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips — the turn
       IS the lesson. */
    T_TURN: 300,
    T_CARRY: 420,
    /* ⭐⭐ THE BEAT, and it is the art panel's most important number:
       the tooth SEATS, and then for 90ms NOTHING MOVES. Below about
       80ms two events read as simultaneous; above it, as succession.
       Without the beat a carry is magic — the tens numeral simply is
       different afterwards. With it, the class sees the catch happen
       and then the turn. ⚠ Under reduced motion the beat is already at
       the floor, so it becomes proportionally MORE prominent, which is
       the right direction. */
    T_CATCH: 90,
    T_REFUSE: 200,
    RM_F: 0.28,
    RM_FLOOR: 90,

    /* ⚠ DIRECTION is in the pitch and VALUE is in nothing. The seat
       tone sits BETWEEN the two travel tones, so no melodic contour can
       encode how big the number is — a carry sounds "clunk … ding",
       a plain turn sounds "ding". */
    SND_FWD: 880,
    SND_BACK: 440,
    SND_CATCH: 660,
    SND_REFUSE: 300,
    SND_DEBOUNCE: 160
  };

  function digitOfCell(i) { return (i + GEO.STRIP_OFF) % 10; }

  var NumberDrum = {

    id: 'number-drum',

    /* ================= strings ======================================
       Authored English, handed to every native panel as a SOURCE TO
       AUDIT rather than a target — on #48 and #49 the panels found
       eight and nine real defects in mine, several of them live model
       bugs.
       ⚠ No string may say drum, gear, cog, dial, handle, lever,
       counter, tape, column or roller: every one of those is another
       tool's part. */
    strings: {
      title: {
        en: 'The Number Drum',
        de: 'Der Zahlenring',
        fr: 'L’anneau des nombres',
        es: 'El anillo de los números',
        pt: 'O anel dos números',
        it: 'L’anello dei numeri',
        nl: 'De getallenring',
        sv: 'Talringen',
        da: 'Talringen',
        no: 'Tallringen',
        fi: 'Lukurengas'
      },
      instruction: {
        en: 'Turn the ring on the right. When its 9 comes round to the 0, a tooth catches the ring beside it and drags that one round too.',
        de: 'Dreh den rechten Ring. Wenn seine 9 zur 0 weiterrückt, greift ein Zahn in den Ring daneben und nimmt ihn mit.',
        fr: 'Fais tourner l’anneau de droite. Quand son 9 arrive sur le 0, une dent accroche l’anneau voisin et l’entraîne avec elle.',
        es: 'Gira el anillo de la derecha. Cuando su 9 pasa al 0, un diente engancha el anillo de al lado y lo arrastra con él.',
        pt: 'Gire o anel da direita. Quando o 9 dele passa para o 0, um dente engata no anel ao lado e leva esse anel junto.',
        it: 'Gira l’anello di destra. Quando il suo 9 passa allo 0, un dente aggancia l’anello accanto e se lo porta dietro.',
        nl: 'Draai de rechterring. Als zijn 9 doordraait naar de 0, pakt een tand de ring ernaast en neemt die mee.',
        sv: 'Vrid den högra ringen. När dess 9 går runt till 0 hakar en tand i ringen bredvid och drar med den.',
        da: 'Drej den højre ring. Når dens 9 kommer rundt til 0, griber en tand fat i ringen ved siden af og trækker den med.',
        no: 'Vri den høyre ringen. Når 9-tallet kommer rundt til 0, griper en tann tak i ringen ved siden av og drar den med.',
        fi: 'Pyöritä oikeanpuoleista rengasta. Kun sen 9 kiertyy nollaan, hammas tarttuu viereiseen renkaaseen ja vetää sen mukanaan.'
      },

      ariaFrame: {

        en: 'Two rings of numerals in a frame. The right ring counts ones, the left ring counts tens.',

        de: 'Zwei Zahlenringe in einem Rahmen. Der rechte Ring zählt die Einer, der linke die Zehner.',

        fr: 'Deux anneaux de chiffres dans un cadre. L’anneau de droite compte les unités, celui de gauche les dizaines.',

        es: 'Dos anillos de cifras en un marco. El anillo de la derecha cuenta las unidades y el de la izquierda las decenas.',

        pt: 'Dois anéis de algarismos numa moldura. O anel da direita conta as unidades e o da esquerda conta as dezenas.',

        it: 'Due anelli di cifre in una cornice. L’anello di destra conta le unità, quello di sinistra le decine.',

        nl: 'Twee ringen met cijfers in een kader. De rechterring telt de eenheden, de linkerring de tientallen.',

        sv: 'Två ringar med siffror i en ram. Den högra ringen räknar ental och den vänstra tiotal.',

        da: 'To ringe med tal i en ramme. Den højre ring tæller enere, og den venstre tæller tiere.',

        no: 'To ringer med siffer i en ramme. Den høyre ringen teller enere, og den venstre teller tiere.',

        fi: 'Kaksi numerorengasta kehyksessä. Oikea rengas laskee ykkösiä ja vasen kymmeniä.'

      },
      ariaOnes: {
        en: 'ones ring',
        de: 'Einerring',
        fr: 'anneau des unités',
        es: 'anillo de las unidades',
        pt: 'anel das unidades',
        it: 'anello delle unità',
        nl: 'ring van de eenheden',
        sv: 'entalsringen',
        da: 'enerringen',
        no: 'enerringen',
        fi: 'ykkösrengas'
      },
      ariaTens: {
        en: 'tens ring',
        de: 'Zehnerring',
        fr: 'anneau des dizaines',
        es: 'anillo de las decenas',
        pt: 'anel das dezenas',
        it: 'anello delle decine',
        nl: 'ring van de tientallen',
        sv: 'tiotalsringen',
        da: 'tierringen',
        no: 'tierringen',
        fi: 'kymmenrengas'
      },
      ariaHund: {
        en: 'hundreds ring',
        de: 'Hunderterring',
        fr: 'anneau des centaines',
        es: 'anillo de las centenas',
        pt: 'anel das centenas',
        it: 'anello delle centinaia',
        nl: 'ring van de honderdtallen',
        sv: 'hundratalsringen',
        da: 'hundredringen',
        no: 'hundrerringen',
        fi: 'sadasrengas'
      },

      setTop: {

        en: 'How far it counts',

        de: 'Wie weit gezählt wird',

        fr: 'Jusqu’où on compte',

        es: 'Hasta dónde cuenta',

        pt: 'Até onde conta',

        it: 'Fino a quanto conta',

        nl: 'Tot hoever hij telt',

        sv: 'Hur långt den räknar',

        da: 'Hvor langt den tæller',

        no: 'Hvor langt den teller',

        fi: 'Kuinka pitkälle lasketaan'

      },
      top99: {
        en: 'up to 99',
        de: 'bis 99',
        fr: 'jusqu’à 99',
        es: 'hasta 99',
        pt: 'até 99',
        it: 'fino a 99',
        nl: 'tot 99',
        sv: 'upp till 99',
        da: 'op til 99',
        no: 'opp til 99',
        fi: 'yhdeksäänkymmeneenyhdeksään asti'
      },
      top999: {
        en: 'up to 999',
        de: 'bis 999',
        fr: 'jusqu’à 999',
        es: 'hasta 999',
        pt: 'até 999',
        it: 'fino a 999',
        nl: 'tot 999',
        sv: 'upp till 999',
        da: 'op til 999',
        no: 'opp til 999',
        fi: 'yhdeksäänsataanyhdeksäänkymmeneenyhdeksään asti'
      },

      fwd: {

        en: 'Turn forward',

        de: 'Vorwärts drehen',

        fr: 'Tourner en avant',

        es: 'Girar hacia adelante',

        pt: 'Girar para a frente',

        it: 'Girare in avanti',

        nl: 'Vooruit draaien',

        sv: 'Vrid framåt',

        da: 'Drej fremad',

        no: 'Vri framover',

        fi: 'Pyöritä eteenpäin'

      },
      back: {
        en: 'Turn back',
        de: 'Zurückdrehen',
        fr: 'Tourner en arrière',
        es: 'Girar hacia atrás',
        pt: 'Girar para trás',
        it: 'Girare indietro',
        nl: 'Terugdraaien',
        sv: 'Vrid tillbaka',
        da: 'Drej tilbage',
        no: 'Vri tilbake',
        fi: 'Pyöritä taaksepäin'
      },
      fwdHalf: {
        en: 'Turn forward half a notch',
        de: 'Einen halben Schritt vorwärts drehen',
        fr: 'Tourner d’un demi-cran en avant',
        es: 'Girar medio paso hacia adelante',
        pt: 'Girar meio passo para a frente',
        it: 'Girare avanti di mezzo scatto',
        nl: 'Een halve stap vooruit draaien',
        sv: 'Vrid ett halvt hack framåt',
        da: 'Drej et halvt hak fremad',
        no: 'Vri et halvt hakk framover',
        fi: 'Pyöritä puoli pykälää eteenpäin'
      },
      backHalf: {
        en: 'Turn back half a notch',
        de: 'Einen halben Schritt zurückdrehen',
        fr: 'Tourner d’un demi-cran en arrière',
        es: 'Girar medio paso hacia atrás',
        pt: 'Girar meio passo para trás',
        it: 'Girare indietro di mezzo scatto',
        nl: 'Een halve stap terugdraaien',
        sv: 'Vrid ett halvt hack tillbaka',
        da: 'Drej et halvt hak tilbage',
        no: 'Vri et halvt hakk tilbake',
        fi: 'Pyöritä puoli pykälää taaksepäin'
      },
      up10: {
        en: 'Turn the tens ring forward',
        de: 'Den Zehnerring vorwärts drehen',
        fr: 'Tourner l’anneau des dizaines en avant',
        es: 'Girar el anillo de las decenas hacia adelante',
        pt: 'Girar o anel das dezenas para a frente',
        it: 'Girare in avanti l’anello delle decine',
        nl: 'De ring van de tientallen vooruit draaien',
        sv: 'Vrid tiotalsringen framåt',
        da: 'Drej tierringen fremad',
        no: 'Vri tierringen framover',
        fi: 'Pyöritä kymmenrengasta eteenpäin'
      },
      down10: {
        en: 'Turn the tens ring back',
        de: 'Den Zehnerring zurückdrehen',
        fr: 'Tourner l’anneau des dizaines en arrière',
        es: 'Girar el anillo de las decenas hacia atrás',
        pt: 'Girar o anel das dezenas para trás',
        it: 'Girare indietro l’anello delle decine',
        nl: 'De ring van de tientallen terugdraaien',
        sv: 'Vrid tiotalsringen tillbaka',
        da: 'Drej tierringen tilbage',
        no: 'Vri tierringen tilbake',
        fi: 'Pyöritä kymmenrengasta taaksepäin'
      },
      slow: {
        en: 'Slow turning',
        de: 'Langsam drehen',
        fr: 'Tourner lentement',
        es: 'Girar despacio',
        pt: 'Girar devagar',
        it: 'Girare piano',
        nl: 'Langzaam draaien',
        sv: 'Vrid långsamt',
        da: 'Drej langsomt',
        no: 'Vri sakte',
        fi: 'Pyöritä hitaasti'
      },

      saidAt: {

        en: '{n}',

        de: '{n}',

        fr: '{n}',

        es: '{n}',

        pt: '{n}',

        it: '{n}',

        nl: '{n}',

        sv: '{n}',

        da: '{n}',

        no: '{n}',

        fi: '{n}'

      },
      saidBetween: {
        en: 'between {a} and {b}',
        de: 'zwischen {a} und {b}',
        fr: 'entre {a} et {b}',
        es: 'entre {a} y {b}',
        pt: 'entre {a} e {b}',
        it: 'tra {a} e {b}',
        nl: 'tussen {a} en {b}',
        sv: 'mellan {a} och {b}',
        da: 'mellem {a} og {b}',
        no: 'mellom {a} og {b}',
        fi: '{a}:n ja {b}:n välissä'
      },
      saidCarry: {
        en: '{n}. Both rings turned.',
        de: '{n}. Beide Ringe haben sich gedreht.',
        fr: '{n}. Les deux anneaux ont tourné.',
        es: '{n}. Han girado los dos anillos.',
        pt: '{n}. Os dois anéis giraram.',
        it: '{n}. Hanno girato tutti e due gli anelli.',
        nl: '{n}. Allebei de ringen zijn gedraaid.',
        sv: '{n}. Båda ringarna vred sig.',
        da: '{n}. Begge ringe drejede.',
        no: '{n}. Begge ringene vred seg.',
        fi: '{n}. Molemmat renkaat pyörähtivät.'
      },
      saidTopEnd: {
        en: 'The rings will not go past {n}.',
        de: 'Weiter als {n} drehen die Ringe nicht.',
        fr: 'Les anneaux ne vont pas plus loin que {n}.',
        es: 'Los anillos no pasan de {n}.',
        pt: 'Os anéis não passam de {n}.',
        it: 'Gli anelli non vanno oltre {n}.',
        nl: 'Verder dan {n} draaien de ringen niet.',
        sv: 'Ringarna går inte längre än {n}.',
        da: 'Ringene går ikke længere end {n}.',
        no: 'Ringene går ikke lenger enn {n}.',
        fi: 'Renkaat eivät mene lukua {n} pidemmälle.'
      },
      saidZeroEnd: {
        en: 'The rings will not go below zero.',
        de: 'Unter null drehen die Ringe nicht.',
        fr: 'Les anneaux ne descendent pas en dessous de zéro.',
        es: 'Los anillos no bajan de cero.',
        pt: 'Os anéis não descem abaixo de zero.',
        it: 'Gli anelli non scendono sotto lo zero.',
        nl: 'Onder nul draaien de ringen niet.',
        sv: 'Ringarna går inte under noll.',
        da: 'Ringene går ikke under nul.',
        no: 'Ringene går ikke under null.',
        fi: 'Renkaat eivät mene nollan alle.'
      },

      gateTitle: {

        en: 'The paper rings',

        de: 'Die Ringe aus Papier',

        fr: 'Les anneaux en papier',

        es: 'Los anillos de papel',

        pt: 'Os anéis de papel',

        it: 'Gli anelli di carta',

        nl: 'De ringen van papier',

        sv: 'Ringarna av papper',

        da: 'Ringene af papir',

        no: 'Ringene av papir',

        fi: 'Paperiset renkaat'

      },
      gateBody: {
        en: 'All three rings are free, and so is every turn of them. A Teacher plan adds the paper rings to cut out and roll, so each child can hold the same apparatus in their hands and catch one ring on the next themselves.',
        de: 'Alle drei Ringe sind kostenlos, und jede Drehung auch. Mit dem Lehrkraft-Abo kommen die Ringe zum Ausschneiden und Zusammenkleben dazu, damit jedes Kind dasselbe Gerät in den Händen hat und selbst einen Ring in den nächsten greifen lässt.',
        fr: 'Les trois anneaux sont gratuits, et chaque tour aussi. L’abonnement Enseignant ajoute les anneaux en papier à découper et à rouler, pour que chaque enfant tienne le même appareil et fasse lui-même accrocher un anneau sur le suivant.',
        es: 'Los tres anillos son gratis, y cada giro también. El plan Docente añade los anillos de papel para recortar y enrollar, para que cada niño tenga el mismo aparato en las manos y enganche un anillo en el siguiente por sí mismo.',
        pt: 'Os três anéis são gratuitos, e cada giro também. O plano Professor acrescenta os anéis de papel para recortar e enrolar, para que cada criança tenha o mesmo aparelho nas mãos e faça um anel engatar no seguinte.',
        it: 'Tutti e tre gli anelli sono gratuiti, e lo è anche ogni giro. Il piano Insegnante aggiunge gli anelli di carta da ritagliare e arrotolare, così ogni bambino tiene in mano lo stesso apparecchio e fa agganciare da solo un anello a quello dopo.',
        nl: 'Alle drie de ringen zijn gratis, en elke draai ook. Met het Leerkracht-abonnement komen daar de papieren ringen bij om uit te knippen en op te rollen, zodat elk kind hetzelfde apparaat in handen heeft en zelf de ene ring in de volgende laat pakken.',
        sv: 'Alla tre ringarna är gratis, och varje vridning också. Med Lärarabonnemanget får du dessutom pappersringarna att klippa ut och rulla ihop, så att varje barn håller samma sak i händerna och själv låter en ring haka i nästa.',
        da: 'Alle tre ringe er gratis, og det er hver eneste drejning også. Med Lærer-abonnementet får du desuden papirringene til at klippe ud og rulle sammen, så hvert barn har det samme apparat i hænderne og selv lader den ene ring gribe fat i den næste.',
        no: 'Alle tre ringene er gratis, og det er hver eneste dreining også. Med Lærer-abonnementet får du i tillegg papirringene til å klippe ut og rulle sammen, slik at hvert barn holder det samme apparatet i hendene og selv lar den ene ringen gripe tak i den neste.',
        fi: 'Kaikki kolme rengasta ovat maksuttomia, ja niin on jokainen pyöräytyskin. Opettajatilaus tuo lisäksi paperiset renkaat, jotka leikataan irti ja rullataan kokoon, niin jokaisella lapsella on sama laite käsissään ja hän saa itse tarttua yhdellä renkaalla seuraavaan.'
      },
      gateCta: {
        en: 'See the Teacher plan',
        de: 'Zum Lehrkraft-Abo',
        fr: 'Découvrir l’abonnement Enseignant',
        es: 'Conoce el plan Docente',
        pt: 'Conheça o plano Professor',
        it: 'Scopri il piano Insegnante',
        nl: 'Bekijk het Leerkracht-abonnement',
        sv: 'Se Lärarabonnemanget',
        da: 'Se Lærer-abonnementet',
        no: 'Se Lærer-abonnementet',
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

        en: 'Print the paper rings',

        de: 'Die Ringe zum Ausschneiden drucken',

        fr: 'Imprimer les anneaux en papier',

        es: 'Imprimir los anillos de papel',

        pt: 'Imprimir os anéis de papel',

        it: 'Stampa gli anelli di carta',

        nl: 'De papieren ringen afdrukken',

        sv: 'Skriv ut pappersringarna',

        da: 'Print papirringene',

        no: 'Skriv ut papirringene',

        fi: 'Tulosta paperiset renkaat'

      },
      sheetTitle: {
        en: 'Paper rings to cut out and roll',
        de: 'Ringe zum Ausschneiden und Zusammenkleben',
        fr: 'Anneaux à découper et à rouler',
        es: 'Anillos para recortar y enrollar',
        pt: 'Anéis para recortar e enrolar',
        it: 'Anelli da ritagliare e arrotolare',
        nl: 'Ringen om uit te knippen en op te rollen',
        sv: 'Ringar att klippa ut och rulla ihop',
        da: 'Ringe til at klippe ud og rulle sammen',
        no: 'Ringer å klippe ut og rulle sammen',
        fi: 'Renkaat leikattavaksi ja rullattavaksi'
      },
      sheetNote: {
        en: 'Cut out each long strip, curl it round into a ring and stick the two ends together. Hold two rings side by side and turn the right one: every time its 9 comes round to its 0, turn the left one on by one.',
        de: 'Schneide jeden langen Streifen aus, roll ihn zu einem Ring und klebe die Enden zusammen. Halte zwei Ringe nebeneinander und dreh den rechten: Immer wenn seine 9 zur 0 weiterrückt, drehst du den linken um eins weiter.',
        fr: 'Découpe chaque longue pièce de papier, roule-la en anneau et colle les deux bouts. Tiens deux anneaux côte à côte et fais tourner celui de droite : chaque fois que son 9 arrive sur le 0, avance celui de gauche d’un cran.',
        es: 'Recorta cada tira larga, enróllala hasta formar un anillo y pega los dos extremos. Pon dos anillos juntos y gira el de la derecha: cada vez que su 9 pase al 0, adelanta el de la izquierda una posición.',
        pt: 'Recorte cada tira comprida, enrole até formar um anel e cole as duas pontas. Ponha dois anéis lado a lado e gire o da direita: sempre que o 9 dele passar para o 0, avance o da esquerda uma casa.',
        it: 'Ritaglia ogni striscia lunga, arrotolala fino a formare un anello e incolla le due estremità. Tieni due anelli affiancati e gira quello di destra: ogni volta che il suo 9 passa allo 0, fai avanzare di uno quello di sinistra.',
        nl: 'Knip elke lange strook uit, draai hem op tot een ring en plak de twee uiteinden aan elkaar. Houd twee ringen naast elkaar en draai de rechter: telkens als zijn 9 doordraait naar de 0, draai je de linker één verder.',
        sv: 'Klipp ut varje lång remsa, rulla ihop den till en ring och fäst ihop ändarna. Håll två ringar bredvid varandra och vrid den högra: varje gång dess 9 går runt till 0 vrider du den vänstra ett steg.',
        da: 'Klip hver lang strimmel ud, rul den sammen til en ring og sæt de to ender sammen. Hold to ringe ved siden af hinanden og drej den højre: hver gang dens 9 kommer rundt til 0, drejer du den venstre et hak frem.',
        no: 'Klipp ut hver lange remse, rull den sammen til en ring og fest de to endene. Hold to ringer ved siden av hverandre og vri den høyre: hver gang 9-tallet kommer rundt til 0, vrir du den venstre ett hakk fram.',
        fi: 'Leikkaa irti jokainen pitkä suikale, rullaa se renkaaksi ja kiinnitä päät yhteen. Pidä kahta rengasta vierekkäin ja pyöritä oikeanpuoleista: aina kun sen 9 kiertyy nollaan, pyöräytä vasenta yhden pykälän eteenpäin.'
      }
    },

    settings: [
      { key: 'top', type: 'choice', labelKey: 'setTop', options: [
        { value: '99',  labelKey: 'top99' },
        { value: '999', labelKey: 'top999' }
      ] }
    ],
    defaults: { top: '99' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       Pure, DOM-free and finite. One integer: `half`, the number of HALF
       notches the ones ring has been turned from zero.

       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM. There is no per-ring position to get out of step: the rings
       are DERIVED from the one integer, so "the tens ring says 3 while
       the ones ring says 9 in a 29" is not a state this tool can be put
       into, by any sequence of presses, in any order.

       ⚠ AND `half` IS ODD EXACTLY WHEN THE APPARATUS IS BETWEEN TWO
       NUMERALS. An odd `half` is a MACHINE state, never a number:
       nothing in this file ever divides it by two to show a value.

       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP (#49). A
       clamp would quietly answer a different question than the one the
       child asked. */

    newState: function (top) {
      var t = (String(top) === '999') ? GEO.TOP_PAID : GEO.TOP_FREE;
      return { half: 0, top: t };
    },

    _st: function (st) { return st || this.st; },

    settled: function (st) { return this._st(st).half % 2 === 0; },

    /* the two whole numbers the apparatus is standing on or between.
       When it is settled these are the same number. */
    lo: function (st) { return Math.floor(this._st(st).half / 2); },
    hi: function (st) { return Math.ceil(this._st(st).half / 2); },

    /* ⭐ hi is ALWAYS lo or lo + 1, which is what makes the ring
       position below total: two consecutive numbers differ in ring k by
       either nothing or exactly one step round. */
    digitOf: function (v, k) {
      return Math.floor(v / Math.pow(10, k)) % 10;
    },

    /* the continuous position of ring k, in numerals from its 0.
       An exact .5 means that ring is caught between two numerals. */
    ringPos: function (st, k) {
      var s = this._st(st);
      var a = this.digitOf(this.lo(s), k);
      if (s.half % 2 === 0) return a;
      var b = this.digitOf(this.hi(s), k);
      return (a === b) ? a : a + 0.5;
    },

    /* ⭐ THE CARRY LAW, and it is not written anywhere — it FALLS OUT.
       Ring k is turning iff every ring below it is coming round from
       its 9 to its 0, because that is the only way two consecutive
       numbers differ in digit k. Nothing in this file special-cases 9. */
    turning: function (st, k) {
      return this.ringPos(st, k) % 1 !== 0;
    },

    ringCount: function (st) {
      return this._st(st).top === GEO.TOP_PAID ? GEO.RINGS_PAID : GEO.RINGS_FREE;
    },

    /* ---- the moves ------------------------------------------------ */

    /* the crank. dir is +1 or -1; slow moves a HALF notch. */
    crank: function (st, dir, slow) {
      var s = this._st(st);
      var d = (dir > 0 ? 1 : -1) * (slow ? 1 : GEO.HALF);
      var nh = s.half + d;
      if (nh < 0 || nh > s.top * GEO.HALF) return null;
      return { half: nh, top: s.top };
    },

    /* the tens ring on its own. ⚠ It PRESERVES the half-notch, because
       a ring caught between two numerals does not tidy itself up when
       you turn a different ring. */
    jump: function (st, dir) {
      var s = this._st(st);
      var nh = s.half + (dir > 0 ? 1 : -1) * GEO.JUMP * GEO.HALF;
      if (nh < 0 || nh > s.top * GEO.HALF) return null;
      return { half: nh, top: s.top };
    },

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('ndr-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. The shell pins overflow:hidden on BOTH
         html and body (`lcs-shell.css:54`), so standalone on a phone
         there is no iframe to grow into and a control row can end up
         physically unreachable (#22, #47).
         ⚠ `html,body.x{...}` is a selector LIST whose html half applies
         unconditionally, which makes the class decorative and its
         mutation unkillable (#22's trap) — hence two class adds and one
         rule per element. */
      document.documentElement.classList.add('ndr-scroll');
      document.body.classList.add('ndr-scroll');

      this._anim = null;
      this._lastSound = 0;
      this._slow = false;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.top);
      this._checkEntitlement();
      this._bindPrint();
    },

    /* ⚠ reset() MUST EXIST or the shell's button is dead on every path
       (#43). It survives embed and embed=compact. */
    reset: function () {
      this._anim = null;
      this._slow = false;
      this.st = this.newState(this.api.settings.top);
      this.render();
    },

    onSettings: function () { this.reset(); },

    /* the requested ceiling, and the one actually in force. A free
       visitor who asks for 999 gets the gate and keeps two rings —
       ⚠ the apparatus never silently pretends the setting took. */
    _wantTop: function () {
      return String(this.api.settings.top) === '999' ? GEO.TOP_PAID : GEO.TOP_FREE;
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

    /* ⚠ `force` exists for the carry's two-tone pair only. The catch and
       the turn are T_CATCH apart, which is inside the debounce window,
       and swallowing the second one would deliver the carry as a single
       sound — the exact thing the beat exists to prevent. */
    _snd: function (freq, force) {
      var now = Date.now();
      if (!force && now - this._lastSound < GEO.SND_DEBOUNCE) return;
      this._lastSound = now;
      if (this.api && this.api.sound) this.api.sound(freq);
    },

    _fmt: function (s, vals) {
      return String(s).replace(/\{(\w+)\}/g, function (m, k) {
        return (vals && vals[k] != null) ? String(vals[k]) : m;
      });
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'ndr-wrap');
      this._wrap = wrap;

      var card = api.el('div', 'ndr-card');
      var frame = api.el('div', 'ndr-frame');
      frame.setAttribute('role', 'img');
      frame.setAttribute('aria-label', api.t('ariaFrame'));
      this._frame = frame;
      card.appendChild(frame);

      var bar = api.el('div', 'ndr-bar');
      this._bar = bar;

      this._btn = {};
      this._btn.down10 = this._mkBtn(bar, 'ndr-b-down10', '−' + GEO.JUMP, 'down10');
      this._btn.back   = this._mkBtn(bar, 'ndr-b-back',  '−', 'back');
      this._btn.slow   = this._mkBtn(bar, 'ndr-b-slow',  '½', 'slow');
      this._btn.fwd    = this._mkBtn(bar, 'ndr-b-fwd',   '+', 'fwd');
      this._btn.up10   = this._mkBtn(bar, 'ndr-b-up10',  '+' + GEO.JUMP, 'up10');
      this._btn.print  = this._mkBtn(bar, 'ndr-b-print', '⎙', 'printBtn');

      this._btn.down10.addEventListener('click', function () { self._move(self.jump(null, -1), true); });
      this._btn.up10.addEventListener('click',   function () { self._move(self.jump(null,  1), true); });
      this._btn.back.addEventListener('click',   function () { self._move(self.crank(null, -1, self._slow), false); });
      this._btn.fwd.addEventListener('click',    function () { self._move(self.crank(null,  1, self._slow), false); });
      this._btn.slow.addEventListener('click',   function () { self._toggleSlow(); });
      this._btn.print.addEventListener('click',  function () { self._print(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);

      this._sheet = api.el('div', 'ndr-sheet');
      wrap.appendChild(this._sheet);

      api.stage.appendChild(wrap);
    },

    _mkBtn: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'ndr-btn ' + cls);
      b.type = 'button';
      b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    /* ⭐ THE SLOW TOGGLE HAS A CONSEQUENCE ELSEWHERE, which is the whole
       point of §23.6's dead-control rule: a control whose only output
       is its own highlight is furniture. This one relabels the two
       crank buttons and marks the frame, all three of them visible
       before the child presses anything else. */
    _toggleSlow: function () {
      this._slow = !this._slow;
      this._syncSlow();
      this._snd(GEO.SND_CATCH);
    },

    _syncSlow: function () {
      var api = this.api, s = this._slow;
      this._btn.slow.setAttribute('aria-pressed', s ? 'true' : 'false');
      this._btn.slow.className = 'ndr-btn ndr-b-slow' + (s ? ' is-on' : '');
      this._btn.fwd.textContent = s ? '+½' : '+';
      this._btn.back.textContent = s ? '−½' : '−';
      this._btn.fwd.setAttribute('aria-label', api.t(s ? 'fwdHalf' : 'fwd'));
      this._btn.back.setAttribute('aria-label', api.t(s ? 'backHalf' : 'back'));
      this._btn.fwd.title = api.t(s ? 'fwdHalf' : 'fwd');
      this._btn.back.title = api.t(s ? 'backHalf' : 'back');
      if (this._frame) {
        this._frame.className = 'ndr-frame' + (s ? ' is-slow' : '');
      }
    },

    _move: function (next, isJump) {
      if (!next) { this._refuse(); return; }
      var wasCarry = false;
      var k, n = this.ringCount();
      var before = this.st;
      this.st = next;
      /* a carry has happened when a ring above the ones changed numeral */
      for (k = 1; k < n; k++) {
        if (this.digitOf(this.lo(before), k) !== this.digitOf(this.lo(next), k) ||
            this.digitOf(this.hi(before), k) !== this.digitOf(this.hi(next), k)) { wasCarry = true; }
      }
      var carry = wasCarry && !isJump;
      var fwd = next.half > before.half;
      if (carry) {
        /* ⭐ THE BEAT. The tooth is drawn seated, and then T_CATCH later
           the rings turn. ⚠ Two sounds in that order, because the catch
           and the turn are two events and the ear must be told so. */
        var changed = [];
        for (k = 1; k < n; k++) {
          changed[k] = (this.digitOf(this.lo(before), k) !== this.digitOf(this.lo(next), k) ||
                        this.digitOf(this.hi(before), k) !== this.digitOf(this.hi(next), k));
        }
        this._paint(true, changed);
        this._snd(GEO.SND_CATCH, true);
        var self2 = this;
        window.setTimeout(function () {
          self2._paint(true, null);
          self2._snd(fwd ? GEO.SND_FWD : GEO.SND_BACK, true);
          self2._say(true);
        }, this._dur(GEO.T_CATCH));
        return;
      }
      this._paint(false, null);
      this._snd(fwd ? GEO.SND_FWD : GEO.SND_BACK);
      this._say(false);
    },

    _refuse: function () {
      var api = this.api;
      this._snd(GEO.SND_REFUSE);
      if (this._frame) {
        var f = this._frame, self = this;
        f.classList.add('is-refuse');
        window.setTimeout(function () { f.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      var atTop = this.st.half >= this.st.top * GEO.HALF;
      api.announce(atTop
        ? this._fmt(api.t('saidTopEnd'), { n: this.st.top })
        : api.t('saidZeroEnd'));
    },

    _say: function (carry) {
      var api = this.api;
      if (!this.settled()) {
        api.announce(this._fmt(api.t('saidBetween'), { a: this.lo(), b: this.hi() }));
        return;
      }
      var n = this.lo();
      api.announce(carry
        ? this._fmt(api.t('saidCarry'), { n: n })
        : this._fmt(api.t('saidAt'), { n: n }));
    },

    /* ---- painting -------------------------------------------------
       The rings are rebuilt only when their COUNT changes; a turn moves
       a transform, so the numerals are never re-inked and the eye can
       follow one numeral round. */
    /* `held` is the beat frame: an array marking which rings are about
       to be dragged round. In that frame the linkage is drawn seated and
       NOTHING MOVES — which is the whole point of T_CATCH. */
    _paint: function (carry, held) {
      /* ⭐ THREE RINGS ARE FREE. §23.1 is "free apparatus, paid depth
         and record", and the third ring is APPARATUS — a third identical
         part, no new geometry and no new noun, unlike #49 which had to
         REFUSE its hundreds because that would have been a whole second
         building. And 99→100, two teeth catching one after the other, is
         the best thing this tool does; selling it would gut the demo it
         exists to give. The paid side is the paper rings, which is the
         record, exactly as the rule says. */
      var eff = this._wantTop();
      if (this.st.top !== eff) {
        this.st = { half: Math.min(this.st.half, eff * GEO.HALF), top: eff };
      }
      var n = this.ringCount();

      if (!this._rings || this._rings.length !== n) this._buildRings(n);

      var dur = this._dur(carry ? GEO.T_CARRY : GEO.T_TURN);
      var k, j;
      if (!held) {
        for (k = 0; k < n; k++) {
          var r = this._rings[k];
          var p = this.ringPos(this.st, k);
          r.strip.style.transitionDuration = dur + 'ms';
          /* the strip is translated in PERCENT OF ITS OWN HEIGHT, which
             is STRIP cells — so one cell is 100/STRIP. Index p+LEAD must
             land on the window's middle cell, one cell down from the
             ring's top edge, hence the -1. */
          r.strip.style.transform =
            'translateY(' + (-(p + GEO.LEAD - 1) * 100 / GEO.STRIP) + '%)';
          r.el.classList.toggle('is-turning', this.turning(this.st, k));
        }
      }
      /* the linkage between ring k and ring k+1 is engaged when ring
         k+1 is being dragged round — during the beat, and while a ring
         is parked between two numerals */
      for (j = 0; j < this._links.length; j++) {
        this._links[j].classList.toggle('is-on',
          held ? !!held[j + 1] : this.turning(this.st, j + 1));
      }
      if (held) return;

      this._btn.up10.classList.toggle('is-off', !this.jump(null, 1));
      this._btn.down10.classList.toggle('is-off', !this.jump(null, -1));
      this._btn.fwd.classList.toggle('is-off', !this.crank(null, 1, this._slow));
      this._btn.back.classList.toggle('is-off', !this.crank(null, -1, this._slow));
      this._btn.print.classList.toggle('is-paid', !!this.premium);
      this._syncSlow();
    },

    _buildRings: function (n) {
      var api = this.api, k, i;
      var ariaKeys = ['ariaOnes', 'ariaTens', 'ariaHund'];
      while (this._frame.firstChild) this._frame.removeChild(this._frame.firstChild);
      this._rings = [];
      this._links = [];
      /* drawn left to right, most significant first, so the numerals
         read the way they are written */
      for (k = n - 1; k >= 0; k--) {
        if (k < n - 1) {
          var link = api.el('div', 'ndr-link');
          this._frame.appendChild(link);
          this._links.unshift(link);
        }
        var ring = api.el('div', 'ndr-ring');
        ring.setAttribute('aria-label', api.t(ariaKeys[k]));
        var strip = api.el('div', 'ndr-strip');
        for (i = 0; i < GEO.STRIP; i++) {
          var d = digitOfCell(i);
          var cell = api.el('div', 'ndr-cell' + (k === 0 && d === 9 ? ' is-tooth' : ''));
          cell.textContent = String(d);
          strip.appendChild(cell);
        }
        ring.appendChild(strip);
        this._frame.appendChild(ring);
        this._rings.unshift({ el: ring, strip: strip });
      }
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
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) { /* free tier — ⚠ degrade to the FREE TIER, never to
                       nothing (#39): two rings still crank to 99. */ }
    },

    _gate: function () {
      var api = this.api, self = this;
      if (this._gateEl && this._gateEl.parentNode) return;
      var g = api.el('div', 'ndr-gate is-on');
      var box = api.el('div', 'ndr-gate-box');
      var h = api.el('h2', 'ndr-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'ndr-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'ndr-gate-cta');
      a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'ndr-gate-x');
      c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
    },

    /* ================= the paper rings ============================== */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      /* ⚠ Ctrl+P must not print a blank page for a free visitor, and it
         must not print the paid sheet either (#16: gating the CHIP is
         not gating the FEATURE). */
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('ndr-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('ndr-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('ndr-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'ndr-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'ndr-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      /* three strips of 0-9 to cut out and roll — the paper apparatus */
      for (var r = 0; r < GEO.RINGS_PAID; r++) {
        var row = api.el('div', 'ndr-p-strip');
        for (i = 0; i < 10; i++) {
          var c = api.el('span', 'ndr-p-cell');
          c.textContent = String(i);
          row.appendChild(c);
        }
        s.appendChild(row);
      }
    }
  };

  /* ================= CSS ==========================================
     ⚠ No `vh` inside a manipulative and no inline `background`
     shorthand (§23.6). Sizes are driven by one container query unit so
     the apparatus grows with the card rather than with the window,
     which is what makes it survive the 704px iframe the tool page pins
     every embed at. */
  function injectCSS() {
    var CH = 'var(--ndr-ch)';
    /* ⚠ THE WINDOW HEIGHT IS DERIVED FROM THE CONSTANT, NOT RETYPED.
       GEO.WINDOW was declared and the CSS said `3` — which is the dead-
       constant defect (#45 ships five, #49 shipped three), and the gate
       caught it here on the very next tool. Anything that hardcodes a
       number the model also names will drift the first time one of them
       changes. */
    var W = GEO.WINDOW;
    var BAND = (100 / W).toFixed(3);
    var css = ''
      + 'html.ndr-scroll{overflow-y:auto;}'
      + 'body.ndr-scroll{overflow-y:auto;}'

      + '.ndr-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.ndr-card{container-type:inline-size;width:100%;max-width:760px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(10px,2.4cqw,22px);display:flex;justify-content:center;'
      + '--ndr-ch:clamp(46px,16cqw,116px);}'

      + '.ndr-frame{display:flex;align-items:stretch;justify-content:center;gap:0;'
      + 'padding:calc(' + CH + ' * .16) calc(' + CH + ' * .20);border-radius:14px;'
      + 'background-color:#FBF3E4;border:2px solid #146B5E;position:relative;}'
      + '.ndr-frame.is-refuse{border-color:#A34122;}'

      + '.ndr-ring{position:relative;overflow:hidden;'
      + 'width:calc(' + CH + ' * .82);height:calc(' + CH + ' * ' + W + ');'
      + 'border-radius:10px;background-color:#FBF3E4;'
      + 'border:1.5px solid #E7DCC8;}'
      /* the rim shading that makes it read as something round rather
         than as a list — ⚠ NOT a background shorthand */
      + '.ndr-ring::before{content:"";position:absolute;inset:0;pointer-events:none;border-radius:9px;'
      + 'background-image:linear-gradient(180deg,rgba(42,42,53,.20) 0%,rgba(42,42,53,0) 26%,'
      + 'rgba(42,42,53,0) 74%,rgba(42,42,53,.20) 100%);z-index:2;}'
      /* the window line: the numeral AT the frame is the number */
      + '.ndr-ring::after{content:"";position:absolute;left:0;right:0;'
      + 'top:' + BAND + '%;height:' + BAND + '%;pointer-events:none;z-index:3;'
      + 'border-top:2px solid #146B5E;border-bottom:2px solid #146B5E;}'
      + '.ndr-ring.is-turning::after{border-top-color:#F2784B;border-bottom-color:#F2784B;}'

      + '.ndr-strip{position:absolute;left:0;right:0;top:0;'
      + 'transition-property:transform;transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.ndr-cell{position:relative;height:' + CH + ';display:flex;align-items:center;'
      + 'justify-content:center;font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
      + 'font-size:calc(' + CH + ' * .64);line-height:1;color:#0E5147;}'
      /* ⚠ THE TOOTH IS DRAWN ON THE RING'S OWN 9-CELLS, so it rides the
         same transform as the numeral and cannot disagree with it. */
      /* ⚠ ON THE LEFT EDGE, because the ring it catches is on the LEFT.
         It shipped on the right edge first — pointing out of the frame,
         away from the only thing it exists to reach — and every gate was
         green, because a model gate cannot see which side of a box a
         decoration is on and the probe was measuring numerals. Caught by
         reading the render.
         ⚠ And it is sized to be seen from the back of a classroom: the
         art panel's ruling is that if a child cannot see WHY the second
         ring moved, the tool has failed. */
      + '.ndr-cell.is-tooth::after{content:"";position:absolute;'
      /* ⚠ INSIDE the left edge, not protruding past it: the ring sets
         overflow:hidden to make the window, so anything outside is
         clipped and a tooth drawn beyond the rim is a tooth nobody
         sees. */
      + 'left:1px;bottom:calc(' + CH + ' * -.10);'
      + 'width:calc(' + CH + ' * .30);height:calc(' + CH + ' * .20);'
      + 'background-color:#F2784B;border:1.5px solid #A34122;'
      + 'border-radius:3px 0 0 3px;z-index:4;}'

      + '.ndr-link{position:relative;width:calc(' + CH + ' * .30);flex:none;}'
      + '.ndr-link::after{content:"";position:absolute;left:50%;transform:translateX(-50%);'
      + 'top:38%;height:24%;width:calc(' + CH + ' * .13);border-radius:3px;'
      + 'background-color:#E7DCC8;}'
      + '.ndr-link.is-on::after{background-color:#F2784B;width:calc(' + CH + ' * .20);}'

      + '.ndr-frame.is-slow .ndr-ring::after{border-top-style:dashed;border-bottom-style:dashed;}'

      + '.ndr-bar{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.ndr-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:20px;font-weight:600;line-height:1;}'
      + '.ndr-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.ndr-btn.is-off{opacity:.42;}'
      + '.ndr-b-slow.is-on{background-color:#146B5E;color:#FBF3E4;}'
      + '.ndr-b-print{border-style:dashed;margin-left:10px;}'
      + '.ndr-b-print.is-paid{border-style:solid;}'

      + '.ndr-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.ndr-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.ndr-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.ndr-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.ndr-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.ndr-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.ndr-sheet{display:none;}'
      /* ⚠ SCOPED to a class the sheet itself adds — an unscoped
         @media print block prints a BLANK PAGE for everybody who
         presses Ctrl+P (#40, #41, #47). */
      + '@media print{'
      + 'body.ndr-printing *{visibility:hidden;}'
      + 'body.ndr-printing .ndr-sheet,body.ndr-printing .ndr-sheet *{visibility:visible;}'
      + 'body.ndr-printing .ndr-wrap>.ndr-card,body.ndr-printing .ndr-bar{display:none !important;}'
      + 'body.ndr-printing .ndr-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.ndr-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.ndr-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.ndr-p-strip{display:flex;margin:0 0 8mm;border:1pt solid #000;width:170mm;}'
      + '.ndr-p-cell{flex:1 1 0;text-align:center;padding:6mm 0;border-right:1pt dashed #000;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:20pt;color:#000;}'
      + '.ndr-p-cell:last-child{border-right:0;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-ndr', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.NumberDrum = NumberDrum;
  if (typeof module !== 'undefined' && module.exports) module.exports = NumberDrum;
}());
