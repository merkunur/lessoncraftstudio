/* =====================================================================
   TOOL #54 — THE DOUBLING MIRROR  (rebuilt 2026-08-11, the transformation)
   =====================================================================
   ⚠⚠ IT IS NOT A MIRROR, AND THAT IS STILL THE WHOLE RULING. A hinged
   tray with two leaves. Counters sit on the near leaf; the class says
   what the double will be; the hinge closes and the far leaf receives
   the SAME NUMBER OF REAL COUNTERS, laid one at a time. Nothing is
   reflected, nothing is an image, and every object on the tray can be
   touched and counted once.

   ⭐⭐ THE 2026-08-11 REBUILD — WHAT THE THREE PANELS FOUND, AND WHAT
   THE OPERATOR'S VERDICT ACTUALLY WAS ABOUT.

   ⭐⭐ THE HEADLINE STATE WAS INVISIBLE, AND A GATE CERTIFIED IT.
   `_paint` set `farEl.style.visibility = s.closed ? '' : 'hidden'`, so
   after open() (closed:false) THE FAR LEAF WAS HIDDEN IN EXACTLY THE
   STATE THE TOOL EXISTS FOR. The model's own comment claimed the
   opposite verbatim — "an opened tray shows both leaves side by side".
   `nine opens into five and four` rendered as FIVE. And the probe
   asserted `far===4` by COUNTING `.dbm-c` NODES: querySelectorAll
   counts nodes inside a visibility:hidden parent, and its leaf-height
   check passed because a hidden element still has a bounding rect. The
   gate measured the wrong thing and certified an invisible leaf.

   ⭐⭐ AND THE TOOL DREW THE OPERATOR GLYPHS ITS OWN HEADER BANS —
   `_mk(bar,'dbm-b-less','−')` and `_mk(bar,'dbm-b-more','+')`, painted
   by `b.textContent = glyph`, in the file whose header records that
   exact defect class ("a + shipped into eleven locales because a
   stepper DREW it"). Both are gone; every control is a miniature of
   the apparatus.

   ⭐⭐ THE APPARATUS COULD NOT TELL ITS TWO OPERATIONS APART. close(3)
   and open(6) both computed 3|3. Doubling and halving are INVERSES and
   the tray drew them identically. The fix is structural rather than
   decorative:

       A SHUT TRAY IS THE UNDIVIDED WHOLE.  AN OPEN TRAY IS TWO PARTS.
       CLOSING COMPOSES.  OPENING DECOMPOSES.

   set 4 -> close (the far half receives 4; the tray holds 8) -> open
   (8 deals outward to 4 and 4) -> press + (5 and 4) -> close (9) ->
   open (4 and 4, and ONE ON THE SPINE PAD) -> give it a leaf, or
   fetch it a partner. The same counters, both ways round, never
   cleared — which is the moat AND the one thing the paper tray in the
   paid sheet cannot do.

   ⚠ THE FENCE (§23.3, all four surfaces) came back essentially EMPTY
   for the doubling MECHANIC: no tool, none of the ~204 activities,
   none of the 240 printable types and none of the 33 apps performs a
   doubling or a halving. `folding-wall.js:131` throws x2 off its own
   shelf in terms — "x2 is doubles imported wholesale from addition …
   NONE of the four is a multiplication fact". What IS occupied is
   subtracted and listed in the refuse-list below.

   ⛔ THE REFUSE-LIST, each item a shipped sibling's property:
   - `part-whole-frame.js:398` already draws a double as one full row
     of each colour under a LABELLED WHOLE. That picture is taken; the
     total here lives on the spine of a shut tray, never above two
     stacks.
   - `pair-gate.js` at k=2 owns halving-with-remainder, the committed
     numeral, and the leftover as a REFUSAL with an empty seat. So the
     odd one here is never refused — it is a CHOICE, and the choice is
     not which side (see below).
   - `folding-sheet.js` (#35) owns THE SHEET · THE CREASE · THE FOLD ·
     THE TWIN and THE INVOLUTION. No twin-highlight across the hinge,
     ever. Its fold is an in-plane 2D reflection; this one is a rigid
     dihedral swing in perspective — nothing is reflected, nothing
     overlays anything, the leaf is opaque and the counters ride it.
   - `folding-wall.js` already spent the mirror-closing gesture.
   - AND ITS ZERO-NUMERAL REFUSAL IS NOT INHERITABLE. folding-sheet is
     a GEOMETRY tool with nothing to count, and what it refuses is a
     SCORE-SHAPED count. This tool's whole subject is quantity, §23.2
     permits numerals explicitly, and gate 3 (visible abstraction)
     requires one. The numerals are here, under a reveal discipline.

   ⭐⭐ THE SIDE CHOICE IS CUT, AND THAT IS THE PEDAGOGY PANEL'S BEST
   CALL. "Which leaf does the odd one join" gives 5-and-4 or 4-and-5:
   ONE fact with the addends swapped, a coin flip dressed as a
   decision. And it is refuted by this tool's own founding ruling — an
   apparatus built on "a reflection is not a quantity" cannot offer a
   reflection as its central choice. What replaces it are two moves
   with genuinely different outcomes and genuinely different facts:
       GIVE IT A LEAF   -> 5 and 4.  Nine is a double AND ONE MORE.
       FETCH A PARTNER  -> 5 and 5.  Nine was a double ONE SHORT.
   Both true, both defensible, and two children will want opposite
   ones. `fetch` REFUSES at the ceiling — the material pushes back
   (gate 4) through the furniture rather than through a rule.

   ⚠ AND "FOR 9 THE LINE CANNOT REST" IS STILL FALSE. Nine counters in
   a row are perfectly symmetric about the fifth: the line RESTS, it
   simply does not PARTITION. Nothing here stalls, and no string says
   it does.

   ⚠ THE THREE CLAIMS THE OLD BUILD MADE AND DID NOT KEEP: the far leaf
   was hidden when opened; the landing copy sold "start from a full
   tray and open it instead" while `open()` required a prior close and
   its `total` parameter had NO CALLER, so halving-first was
   unreachable; and the `start` setting offered "ten" and delivered
   SEVEN, in eleven locales. All three are now true or gone.

   ⚠ NO WORDS ON THE APPARATUS (§23.2): numerals, icons and the
   material only. Every sentence is chrome — a button label, the
   shell's instruction, or the say-line under the card.
   ⚠ NO SPIEGELBUCH. The hinged multi-mirror belongs to
   `folding-sheet`; `premium-tools-v5-ideas.md:279` assigned it there.

   THE PARTS: THE TRAY · THE LEAVES · THE HINGE · THE ODD ONE.
   "Mirror" survives in the English product NAME only, which is the
   operator's.

   FREE   the whole apparatus: every count, the closing, the opening,
          the odd one, and both of its answers.
   PAID   the paper tray to cut, score and fold — whose leaves land
          counter-on-counter when it shuts.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* ⚠ CAP IS ARITHMETIC, NOT TASTE. Nine gives doubles 1+1 .. 9+9,
       near-doubles to 9+10, and every odd total for the no-halving
       case — the complete within-20 doubles family except 10+10, which
       `folding-wall.js:134` already retired by its own argument (x10 is
       the place-value system, not a fact). The `reach` setting moves
       the working cap DOWN to five; it never moves up, so the derived
       geometry is never stressed. */
    CAP: 9,
    CAP_LOW: 5,
    /* a leaf lays its counters out in rows of five, the grouping every
       other tool on this shelf already uses */
    ROW: 5,

    /* motion, ms. ⚠ Reduced motion COMPRESSES, never skips. */
    T_CLOSE: 520,
    T_OPEN: 520,
    T_PLACE: 240,
    T_DEAL_STEP: 132,
    T_REFUSE: 200,
    /* ⚠⚠ THE BEAT does NOT pass through _dur(): the class must have
       said the double BEFORE the far half fills, and a wait is not
       movement. It is held on a SHUT TRAY WITH A VISIBLY EMPTY FAR
       HALF — nothing is concealed, because the answer does not exist
       yet. That is a better withholding than hiding would be. */
    T_BEAT: 700,
    RM_F: 0.28,
    RM_FLOOR: 90,

    /* the fold, in degrees and in counter-modules */
    FOLD_DEG: 26,
    CHAN_OPEN: 1.44,
    CHAN_SHUT: 0.22,
    PERSP: 22,
    NUDGE_DEG: 2.6,
    /* the sheen is gated on REAL RENDERED SIZE, house law */
    SHEEN_AT: 560,

    SND_PLACE: 520,
    SND_CLOSE: 780,
    SND_OPEN: 620,
    SND_SIDE: 880,
    SND_REFUSE: 300,
    /* ⚠ T_, NOT SND_. Every other SND_* here is a FREQUENCY and this
       one is MILLISECONDS. This tool got that right and keeps it. */
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
      /* ⚠ the last clause used to end on "shares back out into two",
         unqualified — false for exactly the totals this rebuild exists
         to reach, and the first sentence a class reads should not hide
         the state the whole tool was built for. */
      instruction: {
        en: 'Put counters on the near leaf and say what the double will be. Close the hinge — the far leaf gets the same number again, laid one at a time. Then open it, and the whole shares back out into two — sometimes leaving one counter with no partner.',
        de: 'Legt Scheiben auf den nahen Flügel und sagt, wie viel das Doppelte sein wird. Schließt das Scharnier — der ferne Flügel bekommt noch einmal genauso viele, eine nach der anderen. Öffnet es dann wieder: Alles verteilt sich neu auf zwei Flügel — und manchmal bleibt eine Scheibe ohne Partner.',
        fr: 'Posez des disques sur le battant proche et dites ce que fera le double. Fermez la charnière : le battant opposé reçoit le même nombre de disques, posés un par un. Ouvrez-la ensuite, et le tout se repartage en deux — en laissant parfois un disque sans partenaire.',
        es: 'Pongan chapas en el ala cercana y digan cuál será el doble. Cierren la bisagra: el ala lejana recibe otras tantas, una a una. Después ábranla, y todo se reparte en dos, a veces dejando una chapa sin pareja.',
        pt: 'Ponha pastilhas na aba da frente e diga quanto vai dar o dobro. Feche a dobradiça: a aba de trás recebe a mesma quantidade, uma pastilha de cada vez. Depois abra, e tudo se reparte outra vez em duas abas — às vezes deixando uma pastilha sem par.',
        it: 'Mettete dei dischi sull’anta vicina e dite quanto farà il doppio. Chiudete la cerniera: l’anta lontana ne riceve altrettanti, posati uno alla volta. Poi apritela, e tutto quello che c’è dentro si divide di nuovo in due — e ogni tanto un disco resta senza compagno.',
        nl: 'Leg schijven op de klep aan jouw kant en zeg wat het dubbele wordt. Sluit het scharnier: de klep aan de overkant krijgt er één voor één net zo veel bij. Open het daarna, en alles gaat weer gelijk over de twee kleppen — en soms blijft er één schijf zonder maatje over.',
        sv: 'Lägg skivor på den närmaste klaffen och säg vad dubbelt så många blir. Stäng gångjärnet — den bortre klaffen får lika många till, en i taget. Öppna det sedan, så delas allt upp på två klaffar igen — och ibland blir en skiva utan par.',
        da: 'Læg skiver på den nærmeste fløj, og sig, hvad det dobbelte bliver. Luk hængslet — den fjerneste fløj får det samme antal igen, én skive ad gangen. Åbn det så, og det hele deles ud i to — og nogle gange bliver der én skive tilbage uden makker.',
        no: 'Legg skiver på den nærmeste klaffen og si hva det dobbelte blir. Lukk hengslet — den borterste klaffen får like mange til, lagt ned én om gangen. Åpne det så, og alt sammen deles ut på de to klaffene — noen ganger blir én skive stående uten make.',
        fi: 'Asettakaa kiekkoja lähemmälle siivelle ja sanokaa, paljonko kaksinkertainen määrä on. Sulkekaa sarana — kauempi siipi saa yhtä monta lisää, yksi kerrallaan. Avatkaa se sitten, niin koko määrä jakautuu takaisin kahdelle siivelle — ja joskus yksi kiekko jää ilman paria.'
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
        da: 'En bakke med to fløje og et hængsel imellem.',
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
      /* the shut tray is ONE bed holding the undivided whole */
      /* ⚠ THE CONCATENATION WAS FIXED IN THE CODE AND NOT IN THE
         STRING, so a locale authoring from this literal still produced
         a lowercase fragment. It now stands alone; it is a sentence. */
      ariaShut: {
        en: 'The tray is shut, holding {n} altogether.',
        de: 'Das Scharnier ist geschlossen und hält insgesamt {n}.',
        fr: 'La charnière est fermée, {n} en tout.',
        es: 'La bisagra está cerrada y lleva {n} dentro.',
        pt: 'A dobradiça está fechada e tem {n} ao todo.',
        it: 'La cerniera è chiusa e tiene {n} in tutto.',
        nl: 'Het scharnier is dicht en houdt {n} bij elkaar.',
        sv: 'Det stängda gångjärnet håller {n} sammanlagt.',
        da: 'Bakken er lukket og holder {n} i alt.',
        no: 'Hengslet er lukket og holder {n}.',
        fi: 'Sarana on kiinni, ja sisällä on yhteensä {n}.'
      },
      /* ⚠ "waiting for a side" survived the rebuild in eleven locales
         and was the last surface still offering the choice this build
         CUT — a screen-reader user was being told about a decision the
         model no longer has. Caught by a native panel reading the
         model, not by any gate. */
      ariaOdd: {
        en: 'one counter with no partner',
        de: 'eine Scheibe ohne Partner',
        fr: 'un disque sans partenaire',
        es: 'una chapa sin pareja',
        pt: 'uma pastilha sem par',
        it: 'un disco senza compagno',
        nl: 'een schijf zonder maatje',
        sv: 'en skiva utan par',
        da: 'en skive uden makker',
        no: 'en skive uten make',
        fi: 'yksi kiekko ilman paria'
      },

      /* ---- settings ------------------------------------------------ */
      setReach: {
        en: 'How far the tray goes',
        de: 'Wie weit das Scharnier geht',
        fr: 'Jusqu’où va la charnière',
        es: 'Hasta dónde llega la bisagra',
        pt: 'Até onde vão os dobros',
        it: 'Fin dove arriva la cerniera',
        nl: 'Hoe ver het scharnier gaat',
        sv: 'Hur långt gångjärnet räcker',
        da: 'Hvor langt bakken går',
        no: 'Hvor langt hengslet går',
        fi: 'Kuinka pitkälle sarana yltää'
      },
      /* ⚠⚠ NAME WHAT THE TRAY DOES, NOT A ROUND NUMBER NEAR IT. "inside
         twenty" advertises a family whose last member (10+10) the tray
         refuses by design, and "inside ten" tops out AT ten — which is
         the retired `start` defect ("offered ten, delivered seven")
         wearing a new coat. A native panel caught it. */
      reachTwenty: {
        en: 'doubles up to nine and nine',
        de: 'Verdoppeln bis neun und neun',
        fr: 'les doubles jusqu’à neuf et neuf',
        es: 'dobles hasta nueve y nueve',
        pt: 'até 9 e 9',
        it: 'doppi fino a nove e nove',
        nl: 'verdubbelen tot negen en negen',
        sv: 'dubbelt upp till nio och nio',
        da: 'det dobbelte op til ni og ni',
        no: 'det dobbelte opp til ni og ni',
        fi: 'yhdeksään ja yhdeksään asti'
      },
      reachTen: {
        en: 'doubles up to five and five',
        de: 'Verdoppeln bis fünf und fünf',
        fr: 'les doubles jusqu’à cinq et cinq',
        es: 'dobles hasta cinco y cinco',
        pt: 'até 5 e 5',
        it: 'doppi fino a cinque e cinque',
        nl: 'verdubbelen tot vijf en vijf',
        sv: 'dubbelt upp till fem och fem',
        da: 'det dobbelte op til fem og fem',
        no: 'det dobbelte opp til fem og fem',
        fi: 'viiteen ja viiteen asti'
      },
      setPredict: {
        en: 'Say the number first',
        de: 'Zuerst die Zahl sagen',
        fr: 'Annoncer le nombre d’abord',
        es: 'Decir el número primero',
        pt: 'Dizer o número primeiro',
        it: 'Prima dite il numero',
        nl: 'Eerst het getal zeggen',
        sv: 'Säg talet först',
        da: 'Sig tallet først',
        no: 'Si tallet først',
        fi: 'Luku sanotaan ensin'
      },
      /* ⚠ the pair must be parallel: fixing the first-person voice in
         `predictOff` left one option describing the tool and the other
         instructing it. */
      predictOn: {
        en: 'ask before it moves',
        de: 'vorher fragen',
        fr: 'demander avant que ça bouge',
        es: 'preguntar antes de que se mueva',
        pt: 'perguntar antes de mexer',
        it: 'chiedere prima che si muova',
        nl: 'eerst vragen',
        sv: 'fråga innan det rör sig',
        da: 'spørg, før det rører sig',
        no: 'spør før noe beveger seg',
        fi: 'kysytään ennen kuin sarana liikkuu'
      },
      /* ⚠ "just show me" was the tool's only first-person string; every
         other sentence addresses, or reports, the class. */
      predictOff: {
        en: 'move without asking',
        de: 'sofort zeigen',
        fr: 'montrer tout de suite',
        es: 'enseñarlo directamente',
        pt: 'mostrar na hora',
        it: 'mostrare subito',
        nl: 'zonder vragen bewegen',
        sv: 'visa det med en gång',
        da: 'vis det med det samme',
        no: 'vis det med en gang',
        fi: 'näytetään heti'
      },

      /* ---- the act strip ------------------------------------------- */
      /* ⚠ this used to be a QUESTION ("How many counters?") sitting a
         few pixels from a genuine question over the chip strip, above a
         stepper that accepts no number. A legend names what its pair of
         buttons controls; it does not ask. */
      setAsk: {
        en: 'Counters',
        de: 'Scheiben',
        fr: 'Les disques',
        es: 'Chapas',
        pt: 'Pastilhas na dobradiça',
        it: 'Dischi sulla cerniera',
        nl: 'Schijven',
        sv: 'Skivor',
        da: 'Skiver på bakken',
        no: 'Skiver på hengslet',
        fi: 'Kiekkojen määrä'
      },
      /* ⚠ parallel imperatives, and NO container noun: ten of the
         eleven locales deliberately have no tray word (the tray noun is
         owned by a neighbouring tool in almost every language), so the
         English must not lean on one. Where the counter LANDS is
         carried by the say-line, which names the near leaf or the shut
         tray explicitly. */
      addOne: {
        en: 'Put one more counter down',
        de: 'Eine Scheibe mehr hinlegen',
        fr: 'Poser un disque de plus',
        es: 'Poner una chapa más',
        pt: 'Pôr mais uma pastilha',
        it: 'Posare un altro disco',
        nl: 'Nog een schijf neerleggen',
        sv: 'Lägg ner en skiva till',
        da: 'Læg én skive mere',
        no: 'Legg ned en skive til',
        fi: 'Aseta vielä yksi kiekko'
      },
      takeOne: {
        en: 'Take one counter away',
        de: 'Eine Scheibe wegnehmen',
        fr: 'Retirer un disque',
        es: 'Quitar una chapa',
        pt: 'Tirar uma pastilha',
        it: 'Portare via un disco',
        nl: 'Een schijf weghalen',
        sv: 'Ta bort en skiva',
        da: 'Tag én skive væk',
        no: 'Ta bort en skive',
        fi: 'Ota yksi kiekko pois'
      },
      /* ⚠ "Say what the double will be" promised a free commitment the
         apparatus does not accept — the strip offers the doubles only,
         which is the material pushing back through the candidate set.
         Choosing from what is offered is what actually happens. */
      /* ⚠ HARMONISED BACK TO "SAY". A Swedish panel counted three verbs
         for one act — the setting says *say*, the refusal says *said*,
         and I had just changed the ask to *choose*. The class SAYS the
         number aloud and the chip records it, so "say" is the true
         verb; and a class that says nine and finds no nine chip has met
         the material pushing back, which is better than a string
         promising less. */
      predAsk: {
        en: 'Say what the double will be.',
        de: 'Wählt, wie viel das Doppelte sein wird.',
        fr: 'Choisissez ce que fera le double.',
        es: 'Elijan cuál será el doble.',
        pt: 'Escolham quanto vai dar o dobro.',
        it: 'Scegliete quanto farà il doppio.',
        nl: 'Zeg wat het dubbele wordt.',
        sv: 'Välj vad dubbelt så många blir.',
        da: 'Vælg, hvad det dobbelte bliver.',
        no: 'Velg hva det dobbelte blir.',
        fi: 'Valitkaa, paljonko kaksinkertainen määrä on.'
      },
      /* ⚠⚠ THE SPLIT QUESTION HAD TO NAME THE SETTLE, AND FOUR PANELS
         PROVED IT BY READING THE MODEL: `open` sets near = far = h, so
         the two leaves are ALWAYS equal the moment the tray opens and
         "two numbers if they will not be the same" described a state
         opening can never produce. The class's likeliest answer for
         nine — five and four — is the reading one move later, after the
         odd one is given a leaf. So the ask says so. */
      /* ⚠⚠ AND IT MUST NOT NAME AN OUTCOME. "one leaf will end up with
         one more" is the GIVE result, and `_paint` carries an explicit
         invariant that the apparatus never recommends give over fetch —
         it strips `is-now` from both buttons to enforce it. A German
         panel caught the ask doing in words what the buttons are
         forbidden to do in prominence. "will not match" is neutral
         between the two and true of both. */
      predSplitAsk: {
        en: 'Say what one leaf will hold — one number if it shares out evenly, and two if the two leaves will not match.',
        de: 'Wählt, wie viele Scheiben auf einen Flügel kommen — eine Zahl, wenn es glatt aufgeht, und zwei, wenn ein Flügel am Ende eine mehr hat.',
        fr: 'Choisissez ce qu’un battant va porter — un seul nombre si le partage tombe juste, deux si un battant se retrouve avec un de plus.',
        es: 'Elijan cuánto llevará un ala: un número si se reparte por igual, y dos si un ala va a llevar una más.',
        pt: 'Escolham quanto vai ficar em uma aba — um número, se repartir certinho; dois, se uma aba acabar com uma a mais.',
        it: 'Scegliete quanti ne avrà un’anta: un numero solo se si divide in parti uguali, due se un’anta finirà con uno in più.',
        nl: 'Zeg hoeveel er op één klep komen: één getal als het gelijk verdeeld kan worden, en twee als er op één klep eentje meer komt.',
        sv: 'Välj vad en klaff kommer att bära — ett tal om det går att dela lika, och två om den ena klaffen får en till.',
        da: 'Vælg, hvad der kommer til at ligge på den ene fløj — ét tal, hvis det går lige op, og to tal, hvis den ene fløj ender med én mere.',
        no: 'Velg hvor mange den ene klaffen får — ett tall hvis det går opp, og to hvis den ene klaffen ender med én mer.',
        fi: 'Valitkaa, paljonko yhdelle siivelle tulee — yksi luku, jos määrä jakautuu tasan, ja kaksi lukua, jos toiselle siivelle jää yksi enemmän.'
      },
      predChip: {
        en: '{n} altogether',
        de: 'insgesamt {n}',
        fr: '{n} en tout',
        es: '{n} en total',
        pt: '{n} ao todo',
        it: '{n} in tutto',
        nl: '{n} bij elkaar',
        sv: '{n} sammanlagt',
        da: '{n} i alt',
        no: '{n} til sammen',
        fi: 'yhteensä {n}'
      },
      predChipLeaf: {
        en: '{n} on a leaf',
        de: '{n} auf einem Flügel',
        fr: '{n} sur un battant',
        es: '{n} en un ala',
        pt: '{n} numa aba',
        it: '{n} su un’anta',
        nl: '{n} op een klep',
        sv: '{n} på en klaff',
        da: '{n} på en fløj',
        no: '{n} på en klaff',
        fi: 'yhdelle siivelle {n}'
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
      /* ⚠⚠ A LEGEND NAMES ITS GROUP; IT DOES NOT ASSERT A STATE. This
         read "One counter has no partner." — true only while one does,
         and the group is now rendered-and-dimmed at all times (it used
         to be display:none, which made `saidNoOdd` unreachable in the
         product while a model walk certified it). So the assertion sat
         on screen being false most of the time. I found it by reading
         the 704px render, not from any gate: every gate was green.
         `setAsk` had already set the shape — a legend is a label. */
      oddAsk: {
        en: 'The counter with no partner',
        de: 'Die Scheibe ohne Partner',
        fr: 'Le disque sans partenaire',
        es: 'La chapa sin pareja',
        pt: 'A pastilha sem par',
        it: 'Il disco senza compagno',
        nl: 'De schijf zonder maatje',
        sv: 'Skivan utan par',
        da: 'Skiven uden makker',
        no: 'Skiven uten make',
        fi: 'Kiekko ilman paria'
      },
      giveLeaf: {
        en: 'Give it to the near leaf',
        de: 'Die Scheibe auf den nahen Flügel legen',
        fr: 'Le donner au battant proche',
        es: 'Dar la chapa sin pareja al ala cercana',
        pt: 'Pôr na aba da frente',
        it: 'Darlo all’anta vicina',
        nl: 'Op de klep aan jouw kant leggen',
        sv: 'Ge den till den närmaste klaffen',
        da: 'Giv skiven til den nærmeste fløj',
        no: 'Gi den til den nærmeste klaffen',
        fi: 'Anna se lähemmälle siivelle'
      },
      fetchOne: {
        en: 'Fetch it a partner',
        de: 'Einen Partner dazuholen',
        fr: 'Lui chercher un partenaire',
        es: 'Buscarle una pareja',
        pt: 'Buscar um par para ela',
        it: 'Trovargli un compagno',
        nl: 'Er een maatje bij halen',
        sv: 'Hämta en parkompis åt den',
        da: 'Hent en makker til den',
        no: 'Hent en make til den',
        fi: 'Hae sille pari'
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

      /* ---- announcements (mirrored on the visible say-line) --------- */
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
      saidPlaceShut: {
        en: '{n} on the shut tray.',
        de: 'Das Scharnier ist geschlossen. Jetzt insgesamt: {n}.',
        fr: 'Sur la charnière fermée : {n}.',
        es: 'En la bisagra cerrada: {n}.',
        pt: 'Na dobradiça fechada: {n}.',
        it: 'Nella cerniera chiusa: {n}.',
        nl: 'Op het gesloten scharnier: {n}.',
        sv: 'I det stängda gångjärnet: {n}.',
        da: '{n} på den lukkede bakke.',
        no: 'I det lukkede hengslet: {n}.',
        fi: 'Suljetussa saranassa: {n}.'
      },
      saidPredict: {
        en: 'The class says {n}.',
        de: 'Die Klasse sagt: {n}.',
        fr: 'La classe annonce {n} en tout.',
        es: 'La clase dice {n}.',
        pt: 'A turma diz {n}.',
        it: 'La classe dice {n}.',
        nl: 'De klas zegt {n}.',
        sv: 'Klassen säger {n}.',
        da: 'Klassen siger {n}.',
        no: 'Klassen sier {n}.',
        fi: 'Luokka sanoo: {n}.'
      },
      /* ⚠ THE ONE CLAIM STRING THAT DID NOT SAY WHAT IT WAS A CLAIM
         ABOUT. `saidPredict` was split into a whole-claim and a
         leaf-claim precisely because the room could not tell which
         question had been answered — and this, its two-chip sibling,
         was left bare. It fires EXCLUSIVELY on the split question, so
         it is always about the two leaves. A Spanish panel caught the
         half-finished fix on the round that made it. */
      saidPredictTwo: {
        en: 'The class says {a} on one leaf and {b} on the other.',
        de: 'Die Klasse sagt: {a} und {b}.',
        fr: 'La classe annonce {a} et {b}.',
        es: 'La clase dice {a} en un ala y {b} en la otra.',
        pt: 'A turma diz {a} numa aba e {b} na outra.',
        it: 'La classe dice {a} e {b}.',
        nl: 'De klas zegt {a} op de ene klep en {b} op de andere.',
        sv: 'Klassen säger {a} och {b}.',
        da: 'Klassen siger {a} og {b}.',
        no: 'Klassen sier {a} og {b}.',
        fi: 'Luokka sanoo: {a} ja {b}.'
      },
      /* ⚠ fired when the LAST counter lands, never at the beat — the
         tray must not say the double before the double exists. */
      saidClosed: {
        en: '{n} and {n} on the tray. {d} altogether.',
        de: '{n} und noch einmal {n}. Insgesamt: {d}.',
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
      saidGathered: {
        en: 'The tray is shut, holding {d}.',
        de: 'Alles liegt jetzt beisammen. Das Scharnier hält insgesamt {d}.',
        fr: 'La charnière est fermée : {d} en tout.',
        es: 'La bisagra está cerrada, con {d} dentro.',
        pt: 'A dobradiça está fechada, com {d} ao todo.',
        it: 'La cerniera è chiusa: {d} in tutto.',
        nl: 'Het scharnier is dicht. Bij elkaar: {d}.',
        sv: 'Gångjärnet är stängt, med {d} inuti.',
        da: 'Bakken er lukket med {d} i alt.',
        no: 'Hengslet er lukket, med {d} til sammen.',
        fi: 'Sarana on kiinni, sisällä yhteensä {d}.'
      },
      saidOpened: {
        en: '{t} opens into {a} and {a}.',
        de: '{t} verteilt sich auf {a} und {a}.',
        fr: '{t} se partage en {a} et {a}.',
        es: '{t} se reparte en {a} y {a}.',
        pt: '{t} se reparte em {a} e {a}.',
        it: '{t} si divide in {a} e {a}.',
        nl: '{t} gaat uit elkaar in {a} en {a}.',
        sv: '{t} delas upp i {a} och {a}.',
        da: '{t} deles ud i {a} og {a}.',
        no: '{t} går opp i {a} og {a}.',
        fi: '{t} jakautuu kahtia: {a} ja {a}.'
      },
      /* ⚠ the question is now the two MOVES, not the two sides — and it
         NAMES the near leaf, because "a leaf" is indefinite and a class
         hearing it will ask which one, which is the exact conversation
         this rebuild removed. */
      /* ⚠ "does not share out into two EQUAL leaves" was false: the
         leaves ARE equal (4 and 4) and what fails is that the whole is
         not used up. One word, and the sentence stops contradicting the
         picture the class is looking at. */
      saidOddWaiting: {
        en: '{t} does not share out completely into two leaves. One counter has no partner — does it join the near leaf, or does the class fetch it a partner?',
        de: '{t} lässt sich nicht restlos auf zwei Flügel verteilen. Eine Scheibe hat keinen Partner — kommt sie auf den nahen Flügel, oder holt die Klasse ihr einen Partner?',
        fr: '{t} ne se partage pas entièrement en deux battants. Un disque n’a pas de partenaire : est-ce qu’il rejoint le battant proche, ou est-ce que la classe lui cherche un partenaire ?',
        es: '{t} no se reparte del todo en dos alas. Una chapa se queda sin pareja: ¿pasa al ala cercana, o le busca la clase una pareja?',
        pt: '{t} não se reparte todo em duas abas. Uma pastilha ficou sem par — ela entra na aba da frente, ou a turma busca um par para ela?',
        it: '{t} non si divide del tutto in due ante. Un disco resta senza compagno: lo diamo all’anta vicina, oppure gli troviamo un compagno?',
        nl: '{t} gaat niet helemaal op in twee kleppen. Eén schijf heeft geen maatje — komt hij op de klep aan jouw kant, of haalt de klas er een maatje bij?',
        sv: '{t} går inte att dela upp helt på två klaffar. En skiva blir utan par — ska den läggas på den närmaste klaffen, eller ska klassen hämta en parkompis åt den?',
        da: '{t} kan ikke deles helt ud på de to fløje. Én skive er uden makker — skal den lægges over på den nærmeste fløj, eller skal klassen hente en makker til den?',
        no: '{t} går ikke helt opp i to klaffer. En skive er uten make — skal den få plass på den nærmeste klaffen, eller skal klassen hente en make til den?',
        fi: '{t} ei jakaudu kokonaan kahdelle siivelle. Yksi kiekko jäi ilman paria — meneekö se lähemmälle siivelle, vai hakeeko luokka sille parin?'
      },
      /* ⚠ this describes the move that JUST happened. Saying "{t}
         shares out into…" repeated saidOpened word for word at the same
         total, so the say-line read as if the tray had stuttered. */
      saidGave: {
        en: 'The leaves now read {a} and {b}, and {t} is a double and one more.',
        de: 'Die Flügel zeigen jetzt {a} und {b}, und {t} ist ein Doppeltes und eins mehr.',
        fr: 'Les battants portent maintenant {a} et {b} : {t}, c’est un double et un de plus.',
        es: 'Las alas llevan ahora {a} y {b}: {t} es el doble y una más.',
        pt: 'Agora as abas têm {a} e {b}: {t} é um dobro e mais uma.',
        it: 'Adesso le ante portano {a} e {b}: {t} è un doppio e uno in più.',
        nl: 'Op de kleppen: {a} en {b}. {t} is een dubbele en nog eentje.',
        sv: 'Klaffarna visar nu {a} och {b}, och {t} är dubbelt och en till.',
        da: 'Nu står der {a} og {b} på fløjene, og {t} er det dobbelte og én mere.',
        no: 'Nå står det {a} og {b} på klaffene, og {t} er et dobbelt og én til.',
        fi: 'Siivillä on nyt {a} ja {b}, ja {t} on kaksinkertainen määrä ja yksi lisää.'
      },
      /* ⚠ THE HISTORY GOES FIRST. Stating the new total before the old
         one reads to a six-year-old as a contradiction — the tray says
         ten while the sentence says nine. */
      saidFetched: {
        en: '{o} was a double one short. A partner arrives, so the tray holds {t}: {a} and {a}.',
        de: 'Bei {o} hat genau eine Scheibe zum Doppelten gefehlt. Jetzt kommt ein Partner dazu, und das Scharnier hält {t}: {a} und {a}.',
        fr: 'Il manquait un disque à {o} pour faire un double. Un partenaire arrive : la charnière porte maintenant {t}, soit {a} et {a}.',
        es: 'A {o} le faltaba una para ser el doble. Llega una pareja, así que la bisagra lleva {t}: {a} y {a}.',
        pt: 'Faltava uma pastilha para {o} ser um dobro. Chega um par para ela, e a dobradiça fica com {t}: {a} e {a}.',
        it: 'A {o} mancava uno per fare un doppio. Arriva un compagno, così la cerniera tiene {t}: {a} e {a}.',
        nl: '{o} kwam één schijf tekort voor een dubbele. Er komt een maatje bij, dus nu liggen er {t}: {a} en {a}.',
        sv: '{o} saknade bara en skiva för att bli dubbelt. En parkompis kommer, så gångjärnet håller {t}: {a} och {a}.',
        da: '{o} manglede én i at være det dobbelte. Der kommer en makker, så der er {t} i bakken: {a} og {a}.',
        no: '{o} var et dobbelt som manglet én. En make kommer til, så hengslet holder {t}: {a} og {a}.',
        fi: '{o} oli yhtä vaille kaksinkertainen määrä. Pari saapui, ja nyt saranassa on {t}: {a} ja {a}.'
      },
      /* ⚠ this fires ONLY on an open tray whose near leaf is empty —
         which is what the ten locale values have always said and what
         the English did not. */
      saidEmpty: {
        en: 'There is nothing on the near leaf yet.',
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
      /* ⭐ THE MATERIAL PUSHES BACK: the tray makes a double and a
         double-and-one-more, and nothing else. */
      saidOnlyDoubles: {
        en: 'This tray holds the same on both leaves, or one more on the near leaf — nothing else.',
        de: 'Das Scharnier kann nur zweierlei: auf beiden Flügeln gleich viele, oder auf dem nahen Flügel eine mehr.',
        fr: 'La charnière porte autant sur les deux battants, ou un de plus sur le battant proche — rien d’autre.',
        es: 'Esta bisagra lleva lo mismo en las dos alas, o una más en el ala cercana. Nada más.',
        pt: 'A dobradiça só aceita a mesma quantidade nas duas abas, ou mais uma na aba da frente — nada além disso.',
        it: 'Su queste ante ci può stare lo stesso numero da tutte e due le parti, oppure uno in più sull’anta vicina: nient’altro.',
        nl: 'Op dit scharnier ligt op allebei de kleppen net zo veel, of eentje meer op de klep aan jouw kant. Anders kan het niet.',
        sv: 'Gångjärnet håller lika många på båda klaffarna, eller en till på den närmaste — inget annat.',
        da: 'Bakken kan have det samme på begge fløje eller én mere på den nærmeste fløj — og ikke andet.',
        no: 'Hengslet tar like mange på begge klaffene, eller én mer på den nærmeste — ikke noe annet.',
        fi: 'Tähän saranaan tulee kummallekin siivelle yhtä paljon tai lähemmälle siivelle yksi lisää — ei muuta.'
      },
      /* ⚠ the English said "no ODD counter" — the parity adjective this
         tool bans in all eleven locales, because parity is a sibling's
         subject. The ten locale values never used it. */
      saidNoOdd: {
        en: 'No counter is without a partner just now.',
        de: 'Im Moment ist keine Scheibe ohne Partner.',
        fr: 'Aucun disque n’est sans partenaire pour l’instant.',
        es: 'Ninguna chapa está sin pareja en este momento.',
        pt: 'Nenhuma pastilha está sem par agora.',
        it: 'In questo momento nessun disco è senza compagno.',
        nl: 'Er is nu geen enkele schijf zonder maatje.',
        sv: 'Just nu är ingen skiva utan par.',
        da: 'Der er ingen skive uden makker lige nu.',
        no: 'Ingen skive er uten make akkurat nå.',
        fi: 'Yksikään kiekko ei ole nyt ilman paria.'
      },
      /* ⚠ the second clause used to elide its own object ("once the
         class has") — an ellipsis a teacher has to read twice, in
         chrome she says aloud mid-lesson. */
      saidPredictFirst: {
        en: 'Say the number first. The hinge moves once the class has said it.',
        de: 'Sagt zuerst die Zahl. Das Scharnier bewegt sich, sobald die Klasse sie gesagt hat.',
        fr: 'Annoncez d’abord le nombre. La charnière bouge une fois que la classe l’a dit.',
        es: 'Primero digan el número. La bisagra se mueve cuando la clase lo haya dicho.',
        pt: 'Digam o número primeiro. A dobradiça só se mexe depois que a turma disser.',
        it: 'Prima dite il numero. La cerniera si muove quando la classe l’ha detto.',
        nl: 'Zeg eerst het getal. Het scharnier beweegt pas als de klas dat gezegd heeft.',
        sv: 'Säg talet först. Gångjärnet rör sig när klassen har sagt det.',
        da: 'Sig tallet først. Hængslet rører sig, når klassen har sagt det.',
        no: 'Si tallet først. Hengslet beveger seg når klassen har sagt det.',
        fi: 'Sanokaa luku ensin. Sarana liikkuu vasta kun luokka on sanonut sen.'
      },
      /* ⭐ THE FIVE KEYS BELOW EXIST BECAUSE TEN NATIVE PANELS, READING
         THE MODEL RATHER THAN THE COPY, PROVED THAT ONE SENTENCE CANNOT
         BE TRUE OF TWO STATES. Each was previously collapsed onto a
         sibling that then asserted the opposite of the state it fired
         in. They are not translations of anything — they are the
         missing causes. */
      saidSettleFirst: {
        en: 'One counter still has no partner — settle that before changing how many there are.',
        de: 'Eine Scheibe hat noch keinen Partner. Die kommt zuerst dran.',
        fr: 'Un disque n’a toujours pas de partenaire. Occupez-vous d’abord de celui-là.',
        es: 'Todavía hay una chapa sin pareja. Decidan primero qué hacer con ella.',
        pt: 'Uma pastilha ainda está sem par. Resolva essa primeiro.',
        it: 'Un disco è ancora senza compagno. Prima sistemate quello.',
        nl: 'Eén schijf heeft nog geen maatje — regel dat eerst, voordat je het aantal verandert.',
        sv: 'En skiva är fortfarande utan par. Ta hand om den först.',
        da: 'Der er stadig én skive uden makker. Tag stilling til den først.',
        no: 'En skive er fortsatt uten make. Den må få en plass først.',
        fi: 'Yksi kiekko on yhä ilman paria. Ratkaiskaa ensin se.'
      },
      saidTrayFull: {
        en: 'The tray holds {n}, and that is as many as it holds.',
        de: 'Das Scharnier hält {n}, und mehr passen nicht hinein.',
        fr: 'La charnière en porte {n}, et elle n’en tient pas davantage.',
        es: 'La bisagra lleva {n}, y ya no caben más.',
        pt: 'A dobradiça tem {n}, e não cabem mais.',
        it: 'La cerniera ne tiene {n}, e più di così non ce ne stanno.',
        nl: '{n} is het meeste dat op het scharnier past.',
        sv: 'Gångjärnet håller {n}, och fler får inte plats.',
        da: 'Der er {n} i bakken, og mere kan den ikke rumme.',
        no: 'Hengslet holder {n}, og flere er det ikke plass til.',
        fi: 'Saranassa on {n}, eikä enempää mahdu.'
      },
      saidTrayFloor: {
        en: 'The tray cannot go below two counters.',
        de: 'Zwei Scheiben sind das Wenigste, was sich auf zwei Flügel verteilen lässt.',
        fr: 'Deux disques, c’est le moins que la charnière puisse partager.',
        es: 'La bisagra no puede repartir menos de dos chapas.',
        pt: 'Duas pastilhas é o mínimo que a dobradiça consegue repartir.',
        it: 'Due dischi sono il minimo che la cerniera può dividere in due.',
        nl: 'Het scharnier kan niet onder twee schijven komen.',
        sv: 'Två skivor är det minsta gångjärnet kan dela upp.',
        da: 'To skiver er det mindste, bakken kan dele ud.',
        no: 'To skiver er det minste hengslet kan dele i to.',
        fi: 'Kaksi on vähiten, minkä sarana voi jakaa kahtia.'
      },
      saidSameTwice: {
        en: 'One number already says both leaves hold the same.',
        de: 'Eine Zahl sagt schon, dass auf beiden Flügeln gleich viele liegen.',
        fr: 'Un seul nombre dit déjà que les deux battants en portent autant.',
        es: 'Con un solo número ya están diciendo que las dos alas llevan lo mismo.',
        pt: 'Um número só já diz que as duas abas ficam iguais.',
        it: 'Un numero solo dice già che le due ante ne portano lo stesso numero.',
        nl: 'Met één getal zeg je al dat de kleppen hetzelfde krijgen.',
        sv: 'Ett enda tal säger redan att båda klaffarna får lika många.',
        da: 'Ét tal siger allerede, at der kommer det samme på begge fløje.',
        no: 'Ett tall sier allerede at begge klaffene får like mange.',
        fi: 'Yksi luku sanoo jo, että kummallakin siivellä on yhtä paljon.'
      },
      saidPredictLeaf: {
        en: 'The class says {n} on a leaf.',
        de: 'Die Klasse sagt: {n} auf jedem Flügel.',
        fr: 'La classe annonce {n} sur un battant.',
        es: 'La clase dice {n} en cada ala.',
        pt: 'A turma diz {n} em cada aba.',
        it: 'La classe dice {n} su ogni anta.',
        nl: 'De klas zegt {n} op een klep.',
        sv: 'Klassen säger {n} på varje klaff.',
        da: 'Klassen siger {n} på hver fløj.',
        no: 'Klassen sier {n} på hver klaff.',
        fi: 'Luokka sanoo: kummallekin siivelle {n}.'
      },
      saidClaimIsIn: {
        en: 'The class has already said what it thinks.',
        de: 'Die Klasse hat schon gesagt, was sie denkt.',
        fr: 'La classe a déjà dit ce qu’elle pense.',
        es: 'La clase ya ha dicho lo que piensa.',
        pt: 'A turma já disse o que acha.',
        it: 'La classe ha già detto quello che pensa.',
        nl: 'De klas heeft al gezegd wat ze denkt.',
        sv: 'Klassen har redan sagt vad den tror.',
        da: 'Klassen har allerede sagt, hvad den tror.',
        no: 'Klassen har allerede sagt hva den tror.',
        fi: 'Luokka on jo sanonut, mitä se ajattelee.'
      },
      saidAlreadyClosed: {
        en: 'The hinge is already closed. Open it to share the tray out again.',
        de: 'Das Scharnier ist schon geschlossen. Öffnet es, damit sich alles wieder auf zwei Flügel verteilt.',
        fr: 'La charnière est déjà fermée. Ouvrez-la pour séparer les battants.',
        es: 'La bisagra ya está cerrada. Ábranla para repartir en dos lo que lleva dentro.',
        pt: 'A dobradiça já está fechada. Abra para separar as abas outra vez.',
        it: 'La cerniera è già chiusa. Apritela per dividere in due quello che c’è dentro.',
        nl: 'Het scharnier is al gesloten. Open het om de kleppen weer los te maken.',
        sv: 'Gångjärnet är redan stängt. Öppna det, så delas allt upp på två klaffar.',
        da: 'Hængslet er allerede lukket. Åbn det, og del skiverne ud på de to fløje.',
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
      /* ⚠⚠ THE DEFAULT MUST BE TRUE IN EVERY STATE. The old default
         asserted "the hinge is already open", which was FALSE and
         reachable — a refusal with no branch fell through to it. */
      saidNothingToDo: {
        en: 'Nothing on the tray can change just now.',
        de: 'Im Moment lässt sich hier nichts verändern.',
        fr: 'Rien ne peut changer sur la charnière pour l’instant.',
        es: 'Ahora mismo no hay nada que cambiar en la bisagra.',
        pt: 'Agora não dá para mudar nada na dobradiça.',
        it: 'In questo momento sulla cerniera non c’è niente da cambiare.',
        nl: 'Er kan nu niets veranderen aan het scharnier.',
        sv: 'Just nu går det inte att ändra något i gångjärnet.',
        da: 'Der er ikke noget på bakken, der kan ændre sig i øjeblikket.',
        no: 'Ingenting på hengslet kan forandre seg akkurat nå.',
        fi: 'Nyt saranassa ei voi muuttua mitään.'
      },

      /* ---- the paywall + the paper tray ---------------------------- */
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
      printAsk: {
        en: 'The paper tray — with a Teacher plan',
        de: 'Der Bastelbogen — mit dem Lehrkraft-Abo',
        fr: 'La charnière en papier — avec l’Abonnement Enseignant',
        es: 'La bisagra de papel — con el Plan Docente',
        pt: 'A dobradiça de papel — com o Plano Professor',
        it: 'La cerniera di carta — con il Piano Insegnante',
        nl: 'Het papieren scharnier — bij het Leerkracht-abonnement',
        sv: 'Skriv ut pappersgångjärnet — ingår i Lärarplanen',
        da: 'Papirhængslet — med Lærerabonnementet',
        no: 'Papirhengslet — med Lærerabonnementet',
        fi: 'Paperisarana — sen tuo Opettajatilaus.'
      },
      /* ⚠ PLURAL IN ALL ELEVEN, AND THE SHEET PRINTS ONE TRAY. The
         plural is a fossil of a rev-2 note claiming two nets; the net
         runs y 0..156 and there is exactly one. Two panels found it by
         reading `_buildSheet` rather than the string. */
      sheetTitle: {
        en: 'A paper tray to cut out and build',
        de: 'Ein Bastelbogen zum Ausschneiden und Anritzen',
        fr: 'Une charnière en papier à découper et à marquer',
        es: 'Una bisagra de papel para recortar y marcar',
        pt: 'Dobradiça de papel para recortar e montar',
        it: 'Una cerniera di carta da ritagliare e incidere',
        nl: 'Een papieren scharnier om uit te knippen',
        sv: 'Ett pappersgångjärn att klippa ut och fälla',
        da: 'Et papirhængsel til at klippe ud og ridse',
        no: 'Et papirhengsel til å klippe ut og risse opp',
        fi: 'Paperisarana leikattavaksi ja uurrettavaksi'
      },
      /* ⚠ the paper instructions may not say fold, crease or score:
         the first two belong to `folding-sheet` and the third reads as
         a tally. Paper bends, and lines are pressed. */
      sheetNote: {
        en: 'Cut out the tray and the counters, then press hard along the four long dashed lines that run right across it — the two in the middle so the leaves bend up, and the one at each end so the edges stand as walls. Tuck the corner tabs behind and the tray stands on its own. Lay counters on the near leaf, say what the double will be, and lay the same number on the far leaf. Now bend it shut: every counter comes down exactly on the counter opposite, and that is how you can see there are the same number on both. At the foot are five boxes, each split down the middle: one round to a box, one leaf on each side.',
        de: 'Schneidet das Scharnier und die Scheiben aus. Ritzt dann die vier langen gestrichelten Linien an, die quer über den ganzen Bogen laufen — die beiden in der Mitte, damit sich die Flügel aufstellen lassen, und die eine an jedem Ende, damit die Ränder als Wände hochstehen. Steckt die Ecklaschen nach hinten, dann steht alles von allein. Legt Scheiben auf den nahen Flügel, sagt, wie viel das Doppelte sein wird, und legt auf den fernen Flügel genauso viele. Klappt es jetzt zu: Jede Scheibe kommt genau auf der Scheibe gegenüber zu liegen, und so seht ihr, dass auf beiden Flügeln gleich viele sind. Unten stehen fünf Kästchen, jedes in der Mitte geteilt: ein Scharnier pro Kästchen, ein Flügel auf jeder Seite.',
        fr: 'Découpez la charnière et les disques, puis appuyez fort sur les quatre grands traits en pointillé qui traversent la charnière de part en part : les deux du milieu pour que les battants se relèvent, celui de chaque bout pour que les bords tiennent debout comme des parois. Glissez les languettes des coins par-derrière et la charnière tient toute seule. Posez des disques sur le battant proche, dites ce que fera le double, et posez-en autant sur le battant opposé. Rabattez-la maintenant : chaque disque vient se poser exactement sur le disque d’en face, et c’est comme ça qu’on voit qu’il y en a autant des deux côtés. En bas, cinq cases partagées en deux par un trait : une charnière par case, un battant de chaque côté.',
        es: 'Recorten la bisagra y las chapas, y marquen bien las cuatro líneas de puntos que la cruzan de lado a lado: las dos del medio, para que las alas se levanten, y la de cada extremo, para que los bordes queden de pie como paredes. Metan hacia atrás las pestañas de las esquinas y la bisagra se sostiene sola. Pongan chapas en el ala cercana, digan cuál será el doble y pongan otras tantas en el ala lejana. Ciérrenla ahora: cada chapa cae justo encima de la de enfrente, y así se ve que las dos alas llevan lo mismo. Abajo hay cinco casillas partidas por la mitad: una bisagra en cada casilla, un ala a cada lado.',
        pt: 'Recorte a dobradiça e as pastilhas. Aperte bem com a unha as quatro linhas pontilhadas compridas, as que atravessam a folha inteira: as duas do meio, para as abas levantarem, e a de cada ponta, para as bordas ficarem em pé como paredes. Enfie as linguetas dos cantos por trás e a dobradiça se sustenta sozinha. Ponha pastilhas na aba da frente, diga quanto vai dar o dobro e ponha a mesma quantidade na aba de trás. Agora feche a dobradiça: cada pastilha desce exatamente em cima da pastilha da outra aba, e é assim que dá para ver que há a mesma quantidade nas duas. No pé da folha há cinco quadros, cada um dividido ao meio: uma dobradiça por quadro, uma aba de cada lado.',
        it: 'Ritagliate la cerniera e i dischi, poi premete bene lungo le quattro righe tratteggiate lunghe che l’attraversano da parte a parte: le due in mezzo, così le ante si alzano, e quella a ciascuna estremità, così i bordi diventano sponde. Rimboccate dietro le linguette agli angoli e la cerniera sta in piedi da sola. Mettete dei dischi sull’anta vicina, dite quanto farà il doppio, e mettetene altrettanti sull’anta lontana. Adesso chiudetela: ogni disco viene giù esattamente sopra il disco di fronte, ed è così che si vede che sono lo stesso numero da tutte e due le parti. In fondo ci sono cinque caselle divise a metà: una cerniera per casella, un’anta per parte.',
        nl: 'Knip het scharnier en de schijven uit en druk hard langs de vier lange stippellijnen die er helemaal overheen lopen — de twee in het midden, zodat de kleppen omhoog komen, en die aan de uiteinden, zodat de randen als wandjes omhoog staan. Stop de hoeklipjes naar achteren weg, dan blijft het scharnier vanzelf staan. Leg schijven op de klep aan jouw kant, zeg wat het dubbele wordt, en leg er op de klep aan de overkant net zo veel neer. Klap het nu dicht: elke schijf komt precies op de schijf aan de overkant terecht, en zo zie je dat het er op allebei net zo veel zijn. Onderaan staan vijf hokjes, elk met een streep door het midden: één hokje per keer, één klep aan elke kant.',
        sv: 'Klipp ut gångjärnet och skivorna, och tryck sedan hårt längs de fyra långa streckade linjerna som går tvärs över hela arket — de två i mitten så att klaffarna böjs upp, och den i var ände så att kanterna står som väggar. Stoppa in hörnflikarna bakom, så står gångjärnet av sig självt. Lägg skivor på den närmaste klaffen, säg vad dubbelt så många blir, och lägg lika många på den bortre klaffen. Fäll sedan ihop det: varje skiva kommer ner precis på skivan mitt emot, och det är så ni kan se att det är lika många på båda. Längst ned finns fem rutor, var och en delad på mitten: ett gångjärn per ruta, en klaff på varje sida.',
        da: 'Klip bakken og skiverne ud, og tryk hårdt langs de fire lange stiplede streger, der går helt tværs over arket — de to i midten, så fløjene kan bukkes op, og den i hver ende, så kanterne står som vægge. Buk hjørnetapperne om bagpå, så bakken står selv. Læg skiver på den nærmeste fløj, sig hvad det dobbelte bliver, og læg det samme antal på den fjerneste fløj. Luk så bakken sammen: hver skive kommer ned præcis oven på skiven over for sig, og sådan kan man se, at der er det samme antal på begge. Nederst er der fem felter, der hver er delt på midten: én bakke i hvert felt, én fløj på hver side.',
        no: 'Klipp ut hengslet og skivene, og trykk hardt langs de fire lange stiplede linjene som går tvers over — de to i midten, så klaffene reiser seg, og den ene i hver ende, så kantene står som vegger. Stikk hjørneflikene inn bak, så står hengslet av seg selv. Legg skiver på den nærmeste klaffen, si hva det dobbelte blir, og legg like mange på den borterste klaffen. Bøy det så sammen: hver skive kommer ned nøyaktig oppå skiven rett imot, og slik ser dere at det er like mange på begge. Nederst står det fem ruter, hver delt på midten: ett hengsel i hver rute, én klaff på hver side.',
        fi: 'Leikatkaa sarana ja kiekot irti ja painakaa lujaa niitä neljää pitkää katkoviivaa pitkin, jotka kulkevat koko saranan poikki — kahta keskimmäistä, jotta siivet nousevat pystyyn, ja kummankin pään viivaa, jotta reunat jäävät seisomaan. Työntäkää kulmakielekkeet taakse, niin sarana seisoo itsekseen. Asettakaa kiekkoja lähemmälle siivelle, sanokaa paljonko kaksinkertainen määrä on, ja asettakaa kauemmalle siivelle yhtä monta. Sulkekaa sarana vasta sitten: jokainen kiekko laskeutuu täsmälleen vastapäisen kiekon päälle, ja juuri siitä näkee, että kummallakin siivellä on yhtä monta. Alareunassa on viisi ruutua, joista jokainen on jaettu keskeltä kahtia: yksi sarana yhteen ruutuun, toinen siipi kummallekin puolelle.'
      }
    },

    settings: [
      { key: 'reach', type: 'choice', labelKey: 'setReach', options: [
        { value: 'twenty', labelKey: 'reachTwenty' },
        { value: 'ten', labelKey: 'reachTen' }
      ] },
      { key: 'predict', type: 'choice', labelKey: 'setPredict', options: [
        { value: 'on', labelKey: 'predictOn' },
        { value: 'off', labelKey: 'predictOff' }
      ] }
    ],
    defaults: { reach: 'twenty', predict: 'on' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       ⚠⚠ A SHUT TRAY IS THE UNDIVIDED WHOLE; AN OPEN TRAY IS TWO PARTS.
       The invariant `shut ? (near|far|odd all 0) : inTray === 0` makes
       "three on a leaf of a shut tray" unexpressible, and conservation
       across close/open is a theorem rather than a hope.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. */

    newState: function (reach, predict) {
      return {
        cap: String(reach) === 'ten' ? GEO.CAP_LOW : GEO.CAP,
        ask: String(predict) !== 'off',
        inTray: 0,
        near: 3,
        far: 0,
        odd: 0,
        shut: false,
        /* the class's latched numerals. NEVER influences another field. */
        claim: []
      };
    },

    _st: function (st) { return st || this.st; },
    _copy: function (s) {
      return { cap: s.cap, ask: s.ask, inTray: s.inTray, near: s.near,
        far: s.far, odd: s.odd, shut: s.shut, claim: s.claim.slice() };
    },

    /* ---- derived, so nothing can disagree -------------------------- */
    total: function (st) {
      var s = this._st(st);
      return s.shut ? s.inTray : s.near + s.far + s.odd;
    },
    waiting: function (st) { return this._st(st).odd === 1; },
    outside: function (st) { return this._st(st).odd; },
    /* what one leaf gets when the whole is shared out */
    half: function (st) { return Math.floor(this._st(st).inTray / 2); },
    /* ⚠ A CLAIM IS ONLY REQUIRED WHERE THERE IS A QUESTION. Closing a
       tray that already holds counters on BOTH leaves merely gathers
       what the class can already see — there is no hidden answer, so
       demanding a numeral there would be ceremony, and (measured on
       the first run) it also made a gathered tray impossible to shut. */
    needsClaim: function (st) {
      var s = this._st(st);
      return s.shut ? s.inTray >= 2 : (s.far === 0 && s.near >= 1);
    },
    claimed: function (st) {
      var s = this._st(st);
      return !s.ask || !this.needsClaim(s) || s.claim.length > 0;
    },

    /* ---- the moves ------------------------------------------------- */

    /* one more counter on the tray. Where it goes is never ambiguous:
       a shut tray has ONE bed, an open tray takes them on the near
       leaf. ⭐ AND THE MATERIAL PUSHES BACK — on an opened tray the
       near leaf may only match the far leaf or beat it by one, so the
       apparatus can express n+n and n+(n+1) AND NOTHING ELSE. */
    place: function (st, d) {
      var s = this._st(st), x;
      if (d !== 1 && d !== -1) return null;
      if (s.shut) {
        var t = s.inTray + d;
        /* ⚠⚠ THE TRAY HOLDS AT MOST 2*cap, AND THAT IS A STALL FIX,
           NOT A ROUNDING. At 2*cap+1 the split gives cap|cap plus one
           on the pad — and then BOTH settle moves refuse, because
           neither leaf can take a tenth counter. The odd one would sit
           there for ever with two dead buttons, which is the one thing
           this tool's header promises never happens. */
        if (t < 2 || t > s.cap * 2) return null;
        x = this._copy(s); x.inTray = t; x.claim = [];
        return x;
      }
      if (s.odd !== 0) return null;                 /* settle the odd one first */
      var n = s.near + d;
      if (n < 0 || n > s.cap) return null;
      if (s.far > 0 && (n < s.far || n > s.far + 1)) return null;
      x = this._copy(s); x.near = n; x.claim = [];
      return x;
    },

    /* the class latches a numeral. At most two; a third refuses. */
    claimNum: function (st, v) {
      var s = this._st(st);
      if (!s.ask) return null;
      if (this.predMode(s) === null) return null;
      if (typeof v !== 'number' || v % 1 !== 0) return null;
      if (this.predValues(s).indexOf(v) < 0) return null;
      if (s.claim.length >= 2) return null;
      if (s.claim.indexOf(v) >= 0) return null;
      var x = this._copy(s);
      x.claim = s.claim.concat([v]);
      return x;
    },

    /* which question the chip strip is asking, if any */
    predMode: function (st) {
      var s = this._st(st);
      if (!s.ask) return null;
      if (!s.shut && s.far === 0 && s.near >= 1 && s.claim.length === 0) return 'double';
      if (s.shut && s.claim.length < 2) return 'split';
      return null;
    },
    predValues: function (st) {
      var s = this._st(st), out = [], i;
      if (s.shut) { for (i = 1; i <= s.cap; i++) out.push(i); return out; }
      for (i = 1; i <= s.cap; i++) out.push(i * 2);
      return out;
    },

    /* ⭐⭐ CLOSING COMPOSES. When the far leaf is empty it RECEIVES the
       same number as the near leaf — that is the doubling, and the
       counters are real and arrive one at a time. When both leaves
       already hold counters, closing simply gathers them. */
    close: function (st) {
      var s = this._st(st);
      if (s.shut) return null;
      if (s.near < 1) return null;
      if (!this.claimed(s)) return null;
      var t = s.far === 0 ? s.near * 2 : s.near + s.far + s.odd;
      if (t < 2 || t > s.cap * 2) return null;
      var x = this._copy(s);
      x.shut = true; x.inTray = t; x.near = 0; x.far = 0; x.odd = 0; x.claim = [];
      return x;
    },
    /* how many counters the far leaf must receive when the hinge shuts */
    incoming: function (st) {
      var s = this._st(st);
      return s.far === 0 ? s.near : 0;
    },

    /* ⭐⭐ OPENING DECOMPOSES. The whole shares out to the two leaves,
       and an odd total leaves exactly one counter on the spine pad —
       never a refusal, never an empty seat: those belong to #53. */
    open: function (st) {
      var s = this._st(st);
      if (!s.shut) return null;
      if (s.inTray < 2) return null;
      if (!this.claimed(s)) return null;
      var h = Math.floor(s.inTray / 2);
      var x = this._copy(s);
      x.shut = false; x.near = h; x.far = h; x.odd = s.inTray % 2;
      x.inTray = 0; x.claim = [];
      return x;
    },

    /* the odd one joins the NEAR leaf — the leaf nearer the class, by
       the apparatus's own rule. Which SIDE was never a decision. */
    give: function (st) {
      var s = this._st(st);
      if (s.odd !== 1) return null;
      if (s.near + 1 > s.cap) return null;
      var x = this._copy(s);
      x.near = s.near + 1; x.odd = 0;
      return x;
    },

    /* ⭐ or a partner ARRIVES and the leaves match.
       ⚠⚠ AND BOTH MOVES ARE ALWAYS AVAILABLE WHEN ONE WAITS — that is
       a THEOREM of the 2*cap tray, not a hope: the largest odd total
       is 2*cap-1, which halves to cap-1, so a leaf always has room for
       one more. The cap guards below therefore never fire through any
       public path; they are here only so the mutators stay total
       against a hand-built state, and the gate asserts the theorem
       rather than pretending the guards are reachable. */
    fetch: function (st) {
      var s = this._st(st);
      if (s.odd !== 1) return null;
      if (s.far + 1 > s.cap) return null;
      var x = this._copy(s);
      x.near = s.near + 1; x.far = s.far + 1; x.odd = 0;
      return x;
    },

    /* ⚠⚠ THERE IS NO giveSide. "Which leaf does the odd one join" gave
       5-and-4 or 4-and-5 — one fact with the addends swapped, and a
       reflection offered as the central choice by a tool founded on
       "a reflection is not a quantity". */

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('dbm-wide');
      /* ⚠⚠ THE SCROLL ESCAPE, FULL FORM. `overflow-y` alone is inert
         against the shell's html,body{height:100%} — measured
         elsewhere as "the page can scroll and the child cannot". */
      document.documentElement.classList.add('dbm-scroll');
      document.body.classList.add('dbm-scroll');
      this._lastSound = 0;
      this._raf = null;
      this._timer = null;
      this._busy = false;
      this._chipSig = '';
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.reach, api.settings.predict);
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () {
      this._stopMotion();
      this.st = this.newState(this.api.settings.reach, this.api.settings.predict);
      this._chipSig = '';
      this.render();
    },
    onSettings: function () { this.reset(); },

    _stopMotion: function () {
      if (this._raf) { window.cancelAnimationFrame(this._raf); this._raf = null; }
      if (this._timer) { window.clearTimeout(this._timer); this._timer = null; }
      this._busy = false;
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
       say-line. api.announce stays the single AT channel (the say-line
       is aria-hidden), so nothing is spoken twice. */
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
    /* a 26x26 miniature of the apparatus for a button glyph. ⚠ NEVER an
       operator glyph, typed or drawn — chevrons say fewer/more without
       naming an operation. */
    _mini: function (parts) {
      var svg = this._svgEl('svg', { viewBox: '0 0 26 26', width: 26, height: 26, 'aria-hidden': 'true', focusable: 'false' });
      var i, p, el;
      for (i = 0; i < parts.length; i++) {
        p = parts[i];
        if (p.t === 'leaf') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, rx: 1.2, fill: '#FBF3E4', stroke: '#146B5E', 'stroke-width': 1.4 });
        else if (p.t === 'trap') el = this._svgEl('path', { d: p.d, fill: '#FBF3E4', stroke: '#146B5E', 'stroke-width': 1.4 });
        else if (p.t === 'chan') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, rx: 0.8, fill: '#0D4E44' });
        else if (p.t === 'pin') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, fill: '#FBF3E4' });
        else if (p.t === 'pad') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, rx: 1, fill: '#FBF3E4', stroke: '#146B5E', 'stroke-width': 0.9 });
        else if (p.t === 'seam') el = this._svgEl('line', { x1: p.x, y1: p.y, x2: p.x2, y2: p.y2, stroke: '#0D4E44', 'stroke-width': 1.4, 'stroke-dasharray': '2 2' });
        else if (p.t === 'lip') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, fill: '#146B5E' });
        else if (p.t === 'mouth') el = this._svgEl('rect', { x: p.x, y: p.y, width: p.w, height: p.h, fill: '#0A3F38' });
        else if (p.t === 'm') el = this._svgEl('circle', { cx: p.x, cy: p.y, r: 2.4, fill: '#F2784B', stroke: '#A34122', 'stroke-width': 1.1 });
        else if (p.t === 'seat') el = this._svgEl('circle', { cx: p.x, cy: p.y, r: 2.4, fill: 'none', stroke: '#7A6A55', 'stroke-width': 1.3, 'stroke-dasharray': '2.1 2.1' });
        else if (p.t === 'chev') el = this._svgEl('polyline', { points: p.p, fill: 'none', stroke: '#146B5E', 'stroke-width': 2.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' });
        else continue;
        svg.appendChild(el);
      }
      return svg;
    },

    /* a labeled action button: miniature + VISIBLE localized label */
    _mkBtn: function (parent, cls, key, mini) {
      var b = this.api.el('button', 'dbm-btn ' + cls);
      b.type = 'button';
      var g = this.api.el('span', 'dbm-gly');
      g.setAttribute('aria-hidden', 'true');
      g.appendChild(mini);
      b.appendChild(g);
      var t = this.api.el('span', 'dbm-lab');
      t.textContent = this.api.t(key);
      b.appendChild(t);
      b.setAttribute('aria-label', this.api.t(key));
      parent.appendChild(b);
      return b;
    },

    _mkGroup: function (parent, cls, legendKey) {
      var g = this.api.el('div', 'dbm-g ' + cls);
      if (legendKey) {
        var l = this.api.el('span', 'dbm-leg');
        l.textContent = this.api.t(legendKey);
        g.appendChild(l);
      }
      parent.appendChild(g);
      return g;
    },

    /* one leaf: face, four walls, a lip with a mouth cut in it, a bed
       and a numeral plate. ⚠ WALLS ARE CHILDREN, NEVER A BORDER, so the
       bed's content box is its border box and every counter, seat and
       numeral shares one coordinate space. */
    _mkLeaf: function (cls) {
      var api = this.api;
      var leaf = api.el('div', 'dbm-leaf ' + cls);
      leaf.appendChild(api.el('div', 'dbm-wall dbm-wall-l'));
      leaf.appendChild(api.el('div', 'dbm-wall dbm-wall-r'));
      leaf.appendChild(api.el('div', 'dbm-wall dbm-wall-in'));
      var lip = api.el('div', 'dbm-lip');
      lip.appendChild(api.el('div', 'dbm-mouth'));
      leaf.appendChild(lip);
      var plate = api.el('div', 'dbm-plate');
      var num = api.el('span', 'dbm-num');
      plate.appendChild(num);
      leaf.appendChild(plate);
      var bed = api.el('div', 'dbm-bed');
      leaf.appendChild(bed);
      leaf._bed = bed;
      leaf._num = num;
      return leaf;
    },

    _build: function () {
      var api = this.api, self = this, i;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'dbm-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'dbm-card');
      this._card = card;

      var stage = api.el('div', 'dbm-stage');
      var tray = api.el('div', 'dbm-tray');
      this._tray = tray;
      tray.setAttribute('role', 'img');

      /* the far leaf is the UPPER slab and it rides the fold */
      this._farEl = this._mkLeaf('dbm-far');
      tray.appendChild(this._farEl);

      /* the hinge is a real barrel: channel, pin, knuckles, spine pad */
      var hinge = api.el('div', 'dbm-hinge');
      this._hinge = hinge;
      hinge.appendChild(api.el('div', 'dbm-pin'));
      for (i = 0; i < 4; i++) {
        hinge.appendChild(api.el('div', 'dbm-knuckle dbm-k' + i));
      }
      var pad = api.el('div', 'dbm-pad');
      this._pad = pad;
      this._oddEl = api.el('div', 'dbm-odd');
      pad.appendChild(this._oddEl);
      hinge.appendChild(pad);
      var tot = api.el('span', 'dbm-num dbm-num-total');
      this._totEl = tot;
      hinge.appendChild(tot);
      tray.appendChild(hinge);

      /* the near leaf is the LOWER slab, nearer the class */
      this._nearEl = this._mkLeaf('dbm-near');
      tray.appendChild(this._nearEl);

      tray.appendChild(api.el('div', 'dbm-plinth'));
      stage.appendChild(tray);
      card.appendChild(stage);
      wrap.appendChild(card);

      /* the say-line: the announce channel, made visible */
      this._sayEl = api.el('p', 'dbm-say');
      this._sayEl.setAttribute('aria-hidden', 'true');
      wrap.appendChild(this._sayEl);

      /* --- the act strip ----------------------------------------- */
      var ctl = api.el('div', 'dbm-ctl');
      this._btn = {};

      this._gSet = this._mkGroup(ctl, 'dbm-g-set', 'setAsk');
      this._btn.less = this._mkBtn(this._gSet, 'dbm-b-less', 'takeOne', this._mini([
        { t: 'leaf', x: 3, y: 3, w: 20, h: 13 },
        { t: 'lip', x: 3, y: 16, w: 20, h: 2 }, { t: 'mouth', x: 10, y: 16, w: 6, h: 2 },
        { t: 'm', x: 9, y: 9 }, { t: 'm', x: 15, y: 9 }, { t: 'm', x: 13, y: 22 },
        { t: 'chev', p: '9.6,18.8 13,21.4 16.4,18.8' }
      ]));
      this._btn.more = this._mkBtn(this._gSet, 'dbm-b-more', 'addOne', this._mini([
        { t: 'leaf', x: 3, y: 3, w: 20, h: 13 },
        { t: 'lip', x: 3, y: 16, w: 20, h: 2 }, { t: 'mouth', x: 10, y: 16, w: 6, h: 2 },
        { t: 'm', x: 8, y: 9 }, { t: 'm', x: 13, y: 9 }, { t: 'm', x: 18, y: 9 },
        { t: 'm', x: 13, y: 22 }, { t: 'chev', p: '9.6,21.4 13,18.8 16.4,21.4' }
      ]));

      this._gPred = this._mkGroup(ctl, 'dbm-g-pred', 'predAsk');
      this._legPred = this._gPred.firstChild;
      this._chips = api.el('div', 'dbm-chips');
      this._gPred.appendChild(this._chips);

      this._gHinge = this._mkGroup(ctl, 'dbm-g-hinge', null);
      /* ⭐ close = ONE SLAB with a seam. open = TWO SLABS, a dark
         channel, a bright pin and a tilted far leaf. The buttons draw
         the state they produce, which is the same fact the stage
         draws. */
      this._btn.close = this._mkBtn(this._gHinge, 'dbm-b-close', 'close', this._mini([
        { t: 'leaf', x: 2, y: 3.5, w: 22, h: 8.4 },
        { t: 'seam', x: 2, y: 12.4, x2: 24, y2: 12.4 },
        { t: 'leaf', x: 2, y: 13.1, w: 22, h: 8.4 },
        { t: 'm', x: 9, y: 8 }, { t: 'm', x: 15, y: 8 },
        { t: 'm', x: 9, y: 17 }, { t: 'm', x: 15, y: 17 }
      ]));
      this._btn.open = this._mkBtn(this._gHinge, 'dbm-b-open', 'open', this._mini([
        { t: 'trap', d: 'M4 2.6 L22 2.6 L23.4 8.8 L2.6 8.8 Z' },
        { t: 'chan', x: 2, y: 10.4, w: 22, h: 4 },
        { t: 'pin', x: 2, y: 12.2, w: 22, h: 0.8 },
        { t: 'pad', x: 10.4, y: 11, w: 5.2, h: 2.8 },
        { t: 'leaf', x: 2, y: 15.4, w: 22, h: 7 },
        { t: 'm', x: 9, y: 5.7 }, { t: 'm', x: 15, y: 5.7 },
        { t: 'm', x: 9, y: 18.9 }, { t: 'm', x: 15, y: 18.9 }
      ]));

      this._gOdd = this._mkGroup(ctl, 'dbm-g-odd', 'oddAsk');
      /* give: the odd one lands in the near bed, and the far bed keeps
         its empty place. fetch: a NEW counter arrives and both beds
         match. Two different pictures, two different facts. */
      this._btn.give = this._mkBtn(this._gOdd, 'dbm-b-give', 'giveLeaf', this._mini([
        { t: 'trap', d: 'M4 2.6 L22 2.6 L23.4 8.8 L2.6 8.8 Z' },
        { t: 'chan', x: 2, y: 10.4, w: 22, h: 4 },
        { t: 'pin', x: 2, y: 12.2, w: 22, h: 0.8 },
        { t: 'pad', x: 10.4, y: 11, w: 5.2, h: 2.8 },
        { t: 'leaf', x: 2, y: 15.4, w: 22, h: 7 },
        { t: 'm', x: 9, y: 5.7 }, { t: 'seat', x: 16.5, y: 5.7 },
        { t: 'm', x: 9, y: 18.9 }, { t: 'm', x: 16.5, y: 18.9 }
      ]));
      this._btn.fetch = this._mkBtn(this._gOdd, 'dbm-b-fetch', 'fetchOne', this._mini([
        { t: 'trap', d: 'M4 2.6 L22 2.6 L23.4 8.8 L2.6 8.8 Z' },
        { t: 'chan', x: 2, y: 10.4, w: 22, h: 4 },
        { t: 'pin', x: 2, y: 12.2, w: 22, h: 0.8 },
        { t: 'pad', x: 10.4, y: 11, w: 5.2, h: 2.8 },
        { t: 'leaf', x: 2, y: 15.4, w: 22, h: 7 },
        { t: 'm', x: 9, y: 5.7 }, { t: 'm', x: 16.5, y: 5.7 },
        { t: 'm', x: 9, y: 18.9 }, { t: 'm', x: 16.5, y: 18.9 }
      ]));

      this._gHouse = this._mkGroup(ctl, 'dbm-g-house', null);
      this._btn.again = this._mkBtn(this._gHouse, 'dbm-b-again', 'again', this._mini([
        { t: 'trap', d: 'M4 1.6 L22 1.6 L23.4 7.4 L2.6 7.4 Z' },
        { t: 'chan', x: 2, y: 9, w: 22, h: 5.4 },
        { t: 'pin', x: 2, y: 11.4, w: 22, h: 0.8 },
        { t: 'pad', x: 10.4, y: 10, w: 5.2, h: 3.4 },
        { t: 'leaf', x: 2, y: 16, w: 22, h: 7.6 }
      ]));
      this._btn.print = this._mkBtn(this._gHouse, 'dbm-b-print', 'printBtn', this._mini([
        { t: 'leaf', x: 4, y: 2, w: 18, h: 22 },
        { t: 'seam', x: 13, y: 2, x2: 13, y2: 24 },
        { t: 'seat', x: 8, y: 19 }, { t: 'seat', x: 18, y: 19 }
      ]));

      this._btn.less.addEventListener('click', function () { self._place(-1); });
      this._btn.more.addEventListener('click', function () { self._place(1); });
      this._btn.close.addEventListener('click', function () { self._close(); });
      this._btn.open.addEventListener('click', function () { self._open(); });
      this._btn.give.addEventListener('click', function () { self._settle('give'); });
      this._btn.fetch.addEventListener('click', function () { self._settle('fetch'); });
      this._btn.again.addEventListener('click', function () { self.reset(); });
      this._btn.print.addEventListener('click', function () { self._print(); });

      wrap.appendChild(ctl);
      api.stage.appendChild(wrap);

      /* ⚠ the sheet is a SIBLING of the wrap — a hidden parent kills
         the whole subtree and measures 0mm on paper. */
      this._sheet = api.el('div', 'dbm-sheet');
      api.stage.appendChild(this._sheet);
    },

    /* the prediction chips rebuild only when the question changes */
    _buildChips: function (mode, values) {
      var api = this.api, self = this, host = this._chips, i;
      var sig = mode + ':' + values.join(',');
      if (sig === this._chipSig) return;
      this._chipSig = sig;
      while (host.firstChild) host.removeChild(host.firstChild);
      this._predChips = [];
      for (i = 0; i < values.length; i++) {
        (function (v) {
          var c = api.el('button', 'dbm-btn dbm-b-pred dbm-b-pred-' + v);
          c.type = 'button';
          var num = api.el('span', 'dbm-num-chip');
          num.textContent = String(v);
          c.appendChild(num);
          /* the chip draws its own outcome: two clusters that make v,
             so a non-reader picks "12" because the picture is six and
             six. */
          var mini = api.el('span', 'dbm-pmini');
          var hiA = api.el('span', 'dbm-pmini-h'), hiB = api.el('span', 'dbm-pmini-h');
          var a = mode === 'split' ? v : Math.ceil(v / 2);
          var b = mode === 'split' ? v : Math.floor(v / 2);
          var j;
          for (j = 0; j < a; j++) hiA.appendChild(api.el('span', 'dbm-pmini-c'));
          for (j = 0; j < b; j++) hiB.appendChild(api.el('span', 'dbm-pmini-c'));
          mini.appendChild(hiA); mini.appendChild(hiB);
          c.appendChild(mini);
          c.setAttribute('aria-label', self._fmt(api.t(mode === 'split' ? 'predChipLeaf' : 'predChip'), { n: v }));
          c.setAttribute('aria-pressed', 'false');
          c.addEventListener('click', function () { self._claim(v); });
          host.appendChild(c);
          self._predChips.push({ el: c, v: v });
        }(values[i]));
      }
    },

    /* ---- moves wired to chrome ------------------------------------- */

    _place: function (d) {
      if (this._busy) return;
      var next = this.place(null, d);
      if (!next) { this._refuse(this._whyPlace(d)); return; }
      var wasShut = this.st.shut;
      this.st = next;
      this._paint();
      this._snd(GEO.SND_PLACE);
      this._say(wasShut
        ? this._fmt(this.api.t('saidPlaceShut'), { n: next.inTray })
        : this._fmt(this.api.t('saidPlace'), { n: next.near }));
    },

    _claim: function (v) {
      if (this._busy) return;
      var next = this.claimNum(null, v);
      /* ⚠⚠ THE THRESHOLD IS THE QUESTION'S OWN CAPACITY, NEVER A
         HARD-CODED 2. The double question latches at ONE chip
         (predMode goes null the moment claim is non-empty), so a second
         press used to fall through to "nothing can change just now" —
         false, at a moment when the hinge can be closed. And a class
         pressing five twice to mean "five and five" got the same dead
         sentence, when one chip already IS that claim. Four panels
         found this independently; it is the #39 consequence-free
         control wearing a refusal. */
      if (!next) { this._refuse(this._whyClaim(v)); return; }
      this.st = next;
      this._paint();
      this._snd(GEO.SND_PLACE);
      /* ⚠ a claim about the WHOLE and a claim about ONE LEAF are
         different assertions and used to be announced in one sentence
         ("The class says 4"), so the room could not tell which
         question had been answered. */
      this._say(next.claim.length > 1
        ? this._fmt(this.api.t('saidPredictTwo'), { a: next.claim[0], b: next.claim[1] })
        : this._fmt(this.api.t(next.shut ? 'saidPredictLeaf' : 'saidPredict'), { n: next.claim[0] }));
    },

    /* ⭐ CLOSING: the fall, then THE BEAT on a shut tray with a visibly
       empty far half, then the deal — n real counters, one at a time,
       so the class counts them in. */
    _close: function () {
      if (this._busy) return;
      var api = this.api, self = this, s = this.st;
      var next = this.close(null);
      if (!next) { this._refuse(this._whyClose()); return; }
      var arriving = this.incoming(s);
      var nearWas = s.near;
      this.st = next;
      this._busy = true;
      this._dealing = arriving;                 /* held back until the deal */
      this._paint(0);
      this._snd(GEO.SND_CLOSE);
      this._fold(GEO.FOLD_DEG, 0, this._dur(GEO.T_CLOSE), function () {
        self._timer = window.setTimeout(function () {
          self._dealing = 0;
          self._paint(1);                        /* 1 = deal them in */
          var last = self._dur(GEO.T_DEAL_STEP) * Math.max(0, arriving - 1) + self._dur(GEO.T_PLACE);
          self._timer = window.setTimeout(function () {
            self._busy = false;
            self._paint();
            self._say(arriving > 0
              ? self._fmt(api.t('saidClosed'), { n: nearWas, d: self.total(null) })
              : self._fmt(api.t('saidGathered'), { d: self.total(null) }));
          }, last + 30);
        }, GEO.T_BEAT);                          /* ⚠ never through _dur */
      });
    },

    /* ⭐ OPENING: nothing arrives — the two groups SEPARATE, riding
       their leaves. A grouping, against closing's count. */
    _open: function () {
      if (this._busy) return;
      var api = this.api, self = this;
      var t = this.total(null);
      var next = this.open(null);
      if (!next) { this._refuse(this._whyOpen()); return; }
      this.st = next;
      this._busy = true;
      this._paint();
      this._snd(GEO.SND_OPEN);
      this._fold(0, GEO.FOLD_DEG, this._dur(GEO.T_OPEN), function () {
        self._busy = false;
        self._paint();
        self._say(self.waiting(null)
          ? self._fmt(api.t('saidOddWaiting'), { t: t })
          : self._fmt(api.t('saidOpened'), { t: t, a: next.near }));
      });
    },

    _settle: function (how) {
      if (this._busy) return;
      var api = this.api, before = this.total(null);
      var next = how === 'give' ? this.give(null) : this.fetch(null);
      if (!next) { this._refuse(this._whySettle()); return; }
      this.st = next;
      this._paint(1);
      this._snd(GEO.SND_SIDE);
      this._say(how === 'give'
        ? this._fmt(api.t('saidGave'), { t: before, a: next.near, b: next.far })
        : this._fmt(api.t('saidFetched'), { t: this.total(next), a: next.near, o: before }));
    },

    /* ---- why a move was refused (a pure resolver, not a guess) ------ */
    /* ⚠⚠ ONE CAUSE PER REFUSAL, AND THE CAUSE IS DERIVED FROM THE SAME
       ARITHMETIC `place` USES — never from a coarser test. Four panels
       independently found this resolver collapsing distinct causes onto
       a string that then ASSERTED THE OPPOSITE OF THE STATE: pressing −
       on an opened 4|4 said "there is nothing on the tray yet" over
       eight counters, a shut tray at its ceiling said "the near leaf is
       full" about a leaf the invariant sets to 0, and an odd counter
       waiting was announced as "there is no counter without a partner".
       A refusal is where a class looks when it is confused, so it is
       the worst possible place to be wrong. */
    _whyPlace: function (d) {
      var s = this.st;
      if (s.odd === 1) return 'settleFirst';
      if (s.shut) return d > 0 ? 'trayFull' : 'trayFloor';
      var n = s.near + d;
      if (s.far > 0 && (n < s.far || n > s.far + 1)) return 'onlyDoubles';
      if (n < 0) return 'empty';
      return 'full';
    },
    /* ⚠ A RESOLVER, NOT AN INLINE TERNARY — because a cause computed
       inside its handler must be RE-IMPLEMENTED by any gate that wants
       to check it, and a gate that reimplements the thing it checks is
       testing a copy. Here the tool and the gate read one function. */
    _whyClaim: function (v) {
      var s = this.st;
      if (this.predMode(s) === null) return 'claimIn';
      if (s.claim.indexOf(v) >= 0) return 'sameTwice';
      return 'nothing';
    },
    _whyClose: function () {
      var s = this.st;
      if (s.shut) return 'closed';
      if (s.near < 1) return 'empty';
      if (!this.claimed(s)) return 'predFirst';
      /* ⚠ 'nothing', not 'full'. This was the last resolver whose
         DEFAULT asserted a quantity, which is the shape every other one
         had removed this round; unreachable today, and silently
         reopened by the next change to `place`'s guards. */
      return 'nothing';
    },
    _whyOpen: function () {
      var s = this.st;
      if (!s.shut) return 'open';
      if (!this.claimed(s)) return 'predFirst';
      return 'nothing';
    },
    /* ⚠ there is no ceiling branch here, because there is no reachable
       ceiling: when a counter waits, both moves always exist. */
    _whySettle: function () {
      var s = this.st;
      if (s.odd !== 1) return 'noOdd';
      return 'nothing';
    },

    /* ⚠⚠ THE CAUSE TABLE IS DATA, AND ITS DEFAULT IS TRUE IN EVERY
       STATE. The old default asserted "the hinge is already open" —
       false, and reachable, because 'side' had no branch. */
    _WHY: {
      empty: 'saidEmpty',
      full: 'saidFull',
      onlyDoubles: 'saidOnlyDoubles',
      closed: 'saidAlreadyClosed',
      open: 'saidAlreadyOpen',
      predFirst: 'saidPredictFirst',
      claimIn: 'saidClaimIsIn',
      sameTwice: 'saidSameTwice',
      noOdd: 'saidNoOdd',
      settleFirst: 'saidSettleFirst',
      trayFull: 'saidTrayFull',
      trayFloor: 'saidTrayFloor',
      nothing: 'saidNothingToDo'
    },

    /* ⭐ THE APPARATUS ANSWERS, ANATOMICALLY: the hinge flexes and the
       knuckles flash. The counters never move and no leaf is
       recoloured — recolouring a leaf is a verdict on the surface a
       child's counters are sitting on. */
    _refuse: function (why) {
      var api = this.api, self = this, t = this._tray;
      this._snd(GEO.SND_REFUSE, true);
      if (t && !this._busy) {
        t.classList.add('is-refuse');
        var base = this.st.shut ? 0 : GEO.FOLD_DEG;
        this._flex(base, this._dur(GEO.T_REFUSE), function () {
          t.classList.remove('is-refuse');
        });
      }
      var key = this._WHY[why] || 'saidNothingToDo';
      /* ⚠ {n} now means ONE thing per string: saidFull is the OPEN
         tray's leaf ceiling, saidTrayFull is the SHUT tray's whole. The
         single string taking both was how a leaf ceiling got announced
         over a tray that has no leaves. */
      this._say(key === 'saidFull' ? this._fmt(api.t(key), { n: this.st.cap })
        : key === 'saidTrayFull' ? this._fmt(api.t(key), { n: this.st.inTray })
        : api.t(key));
    },

    /* ---- the fold engine (one interpolator, named phases) ---------- */

    _ease: function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },

    _setFold: function (deg) {
      var open = deg / GEO.FOLD_DEG;
      this._tray.style.setProperty('--dbm-fold', deg + 'deg');
      this._tray.style.setProperty('--dbm-chan',
        (GEO.CHAN_SHUT + (GEO.CHAN_OPEN - GEO.CHAN_SHUT) * open).toFixed(3));
    },

    _fold: function (from, to, dur, done) {
      var self = this, t0 = null;
      if (this._raf) { window.cancelAnimationFrame(this._raf); this._raf = null; }
      var frame = function (ts) {
        if (t0 === null) t0 = ts;
        var t = Math.min(1, (ts - t0) / dur);
        self._setFold(from + (to - from) * self._ease(t));
        if (t < 1) { self._raf = window.requestAnimationFrame(frame); return; }
        self._raf = null;
        if (done) done();
      };
      this._raf = window.requestAnimationFrame(frame);
    },

    /* the refusal flex rides the SAME property every other motion uses */
    _flex: function (base, dur, done) {
      var self = this, t0 = null;
      var frame = function (ts) {
        if (t0 === null) t0 = ts;
        var t = Math.min(1, (ts - t0) / dur);
        self._setFold(base + GEO.NUDGE_DEG * Math.sin(Math.PI * t));
        if (t < 1) { self._raf = window.requestAnimationFrame(frame); return; }
        self._raf = null;
        self._setFold(base);
        if (done) done();
      };
      this._raf = window.requestAnimationFrame(frame);
    },

    /* ---- painting -------------------------------------------------- */

    /* ⚠⚠ _sync, NEVER _fill. The old code destroyed and rebuilt every
       counter on every paint, so every counter teleported and no
       transition could ever fire. Here: append the missing, remove the
       surplus from the tail, and NEVER touch a counter that stays. */
    _sync: function (leaf, n, k, dealFrom) {
      var api = this.api, bed = leaf._bed, i;
      var have = bed.querySelectorAll('.dbm-c').length;
      if (have > n) {
        var kill = have - n;
        for (i = 0; i < kill; i++) {
          var rows = bed.querySelectorAll('.dbm-row');
          var lastRow = rows[rows.length - 1];
          if (!lastRow) break;
          lastRow.removeChild(lastRow.lastChild);
          if (!lastRow.firstChild) bed.removeChild(lastRow);
        }
        have = n;
      }
      for (i = have; i < n; i++) {
        var rows2 = bed.querySelectorAll('.dbm-row');
        var row = rows2[rows2.length - 1];
        if (!row || row.querySelectorAll('.dbm-c').length >= GEO.ROW) {
          row = api.el('div', 'dbm-row');
          bed.appendChild(row);
        }
        var c = api.el('span', 'dbm-c');
        if (dealFrom) {
          /* two computed styles of ONE element: it really transitions */
          c.classList.add('is-arriving');
          c.style.transitionDelay = (this._dur(GEO.T_DEAL_STEP) * (i - dealFrom.from)) + 'ms';
          row.appendChild(c);
          (function (el) {
            window.requestAnimationFrame(function () {
              window.requestAnimationFrame(function () { el.classList.remove('is-arriving'); });
            });
          }(c));
        } else {
          row.appendChild(c);
        }
      }
      /* the seat marks the odd one's empty place — never the counter */
      var seats = bed.querySelectorAll('.dbm-seat'), j;
      for (j = 0; j < seats.length; j++) seats[j].parentNode.removeChild(seats[j]);
      if (k) {
        var rows3 = bed.querySelectorAll('.dbm-row');
        var r2 = rows3[rows3.length - 1];
        if (!r2 || r2.childNodes.length >= GEO.ROW) { r2 = api.el('div', 'dbm-row'); bed.appendChild(r2); }
        r2.appendChild(api.el('span', 'dbm-seat'));
      }
    },

    _paint: function (mode) {
      var api = this.api, s = this.st, i;
      this._card.style.setProperty('--dbm-cap', String(s.cap));
      this._tray.classList.toggle('is-closed', s.shut);
      this._tray.setAttribute('aria-label', api.t('ariaTray'));
      if (!this._raf) this._setFold(s.shut ? 0 : GEO.FOLD_DEG);

      /* the shut tray is ONE bed: the near leaf carries the whole and
         the far leaf carries what it has been dealt so far. */
      var nearN, farN, held = this._dealing || 0;
      if (s.shut) {
        var whole = s.inTray - held;
        nearN = Math.min(whole, Math.ceil(s.inTray / 2));
        farN = Math.max(0, whole - nearN);
      } else {
        nearN = s.near; farN = s.far;
      }
      var dealNow = (mode === 1 && s.shut);
      this._sync(this._nearEl, nearN, false, null);
      this._sync(this._farEl, farN, false, dealNow ? { from: Math.max(0, farN - (s.inTray - Math.ceil(s.inTray / 2))) } : null);

      /* ⚠⚠ THE REVEAL DISCIPLINE WAS SIGHTED-ONLY, AND SIX PANELS FOUND
         IT. The visible numerals are correctly blank on a shut tray —
         and these two labels were set unconditionally from the same
         computed halves, so a shut nine announced "the near leaf, 5 /
         the far leaf, 4" to the one user who cannot see the tray, at
         the exact moment the class is being asked to predict it. It
         also contradicted the founding invariant: a shut tray is ONE
         bed and has no leaves to label. While shut, the tray's own
         label is the whole description. */
      if (s.shut) {
        this._nearEl.setAttribute('aria-hidden', 'true');
        this._farEl.setAttribute('aria-hidden', 'true');
        this._nearEl.removeAttribute('aria-label');
        this._farEl.removeAttribute('aria-label');
      } else {
        this._nearEl.removeAttribute('aria-hidden');
        this._farEl.removeAttribute('aria-hidden');
        this._nearEl.setAttribute('aria-label', this._fmt(api.t('ariaNear'), { n: nearN }));
        this._farEl.setAttribute('aria-label', this._fmt(api.t('ariaFar'), { n: farN }));
      }

      /* the odd one waits on the spine pad, drawn byte-identically to
         every other counter — being odd is not being wrong. */
      var wait = this.waiting(s);
      this._pad.classList.toggle('is-holding', wait);
      while (this._oddEl.firstChild) this._oddEl.removeChild(this._oddEl.firstChild);
      if (wait) {
        var oc = api.el('span', 'dbm-c');
        if (mode === 1) { oc.classList.add('is-arriving'); }
        this._oddEl.appendChild(oc);
        this._oddEl.setAttribute('aria-label', api.t('ariaOdd'));
        if (mode === 1) {
          (function (el) {
            window.requestAnimationFrame(function () {
              window.requestAnimationFrame(function () { el.classList.remove('is-arriving'); });
            });
          }(oc));
        }
      }

      /* ⭐ THE NUMERAL REVEAL DISCIPLINE. A numeral is the count of a
         group that exists RIGHT NOW. The total appears only on a shut
         tray, and only once the deal has finished — the tray must not
         say the double before the double exists. */
      this._nearEl._num.textContent = (!s.shut && nearN > 0) ? String(nearN) : '';
      this._farEl._num.textContent = (!s.shut && farN > 0) ? String(farN) : '';
      this._totEl.textContent = (s.shut && !held) ? String(s.inTray) : '';
      /* ⚠ `whole`, not `inTray` — during the beat and the deal the
         undealt counters DO NOT EXIST YET, and announcing the finished
         total there is the same leak the numeral above refuses. And
         ariaShut stands ALONE: concatenating it after ariaTray produced
         a lower-case fragment after a full stop AND asserted two leaves
         on a tray that currently has one bed. */
      if (s.shut) this._tray.setAttribute('aria-label',
        this._fmt(api.t('ariaShut'), { n: whole }));

      /* --- the act strip: rails, dimming and prominence, all derived
         from the SAME move probes, so they can never disagree ------- */
      var canLess = !!this.place(null, -1);
      var canMore = !!this.place(null, 1);
      var mode2 = this.predMode(s);
      var canClose = !!this.close(null);
      var canOpen = !!this.open(null);
      var canGive = !!this.give(null);
      var canFetch = !!this.fetch(null);

      if (mode2) {
        this._buildChips(mode2, this.predValues(s));
        this._legPred.textContent = api.t(mode2 === 'split' ? 'predSplitAsk' : 'predAsk');
      }
      this._gPred.style.display = (s.ask && (mode2 || s.claim.length)) ? '' : 'none';
      if (this._predChips) {
        for (i = 0; i < this._predChips.length; i++) {
          var ch = this._predChips[i];
          ch.el.classList.toggle('is-off', !mode2);
          ch.el.setAttribute('aria-pressed', s.claim.indexOf(ch.v) >= 0 ? 'true' : 'false');
        }
      }

      this._btn.less.classList.toggle('is-off', !canLess);
      this._btn.more.classList.toggle('is-off', !canMore);
      this._btn.close.classList.toggle('is-off', !canClose);
      this._btn.open.classList.toggle('is-off', !canOpen);
      this._btn.give.classList.toggle('is-off', !canGive);
      this._btn.fetch.classList.toggle('is-off', !canFetch);
      /* ⚠⚠ NOT display:none. Every other group in this strip stays
         RENDERED and merely dims, because `.is-off` is clickable on
         purpose — a class that presses a dimmed control HEARS why it
         will not go, and that is how the apparatus teaches its own
         rules. Hiding this group made `saidNoOdd` unreachable in the
         product while a model-level walk certified it as covered: the
         `saidFetchFull` dead-string class, one key over, created by
         the very gate that was meant to close it. Found by a German
         panel reading `_paint` rather than the strings. */
      this._gOdd.classList.toggle('is-off', !wait);

      var anyNow = canLess || canMore || mode2 || canClose || canOpen || canGive || canFetch;
      this._gSet.classList.toggle('is-here', (canLess || canMore) && !mode2 && !wait);
      this._gPred.classList.toggle('is-here', !!mode2);
      this._gHinge.classList.toggle('is-here', (canClose || canOpen) && !mode2);
      this._gOdd.classList.toggle('is-here', wait);
      this._gHouse.classList.toggle('is-here', !anyNow);

      /* ⚠ AT MOST ONE is-now — AND ZERO WHILE THE ODD ONE WAITS. The
         apparatus must never recommend give over fetch; both are true
         and the class decides. */
      this._btn.close.classList.toggle('is-now', canClose && !mode2 && !wait);
      this._btn.open.classList.toggle('is-now', canOpen && !mode2 && !wait);
      this._btn.give.classList.remove('is-now');
      this._btn.fetch.classList.remove('is-now');
      this._btn.again.classList.toggle('is-now', !anyNow);

      /* the print chip states its requirement */
      this._btn.print.classList.toggle('is-paid', !!this.premium);
      var pk = this.premium ? 'printBtn' : 'printAsk';
      this._btn.print.querySelector('.dbm-lab').textContent = api.t(pk);
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
      var g = api.el('div', 'dbm-gate is-on');
      var box = api.el('div', 'dbm-gate-box');
      var h = api.el('h2', 'dbm-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'dbm-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'dbm-gate-cta'); a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'dbm-gate-x'); c.type = 'button'; c.textContent = api.t('gateClose');
      c.addEventListener('click', function () {
        if (g.parentNode) g.parentNode.removeChild(g);
        self._gateEl = null;
        if (self._btn && self._btn.print) self._btn.print.focus();
      });
      box.appendChild(h); box.appendChild(p); box.appendChild(a); box.appendChild(c);
      g.appendChild(box);
      this._wrap.appendChild(g);
      this._gateEl = g;
      a.focus();
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

    /* ⭐ THE PAPER TRAY. Two score lines twelve millimetres apart, so
       it folds flat AND stands; fold-up lips with the mouth cut into
       them and end tabs to tuck; and — the property the screen cannot
       have — circle k on each leaf is the same distance from the
       spine, so shutting the tray lands counter on counter. */
    _buildSheet: function () {
      var api = this.api, self = this, i;
      var host = this._sheet;
      while (host.firstChild) host.removeChild(host.firstChild);
      var h = api.el('h2', 'dbm-sheet-h'); h.textContent = api.t('sheetTitle');
      var note = api.el('p', 'dbm-sheet-note'); note.textContent = api.t('sheetNote');
      host.appendChild(h); host.appendChild(note);

      var svg = this._svgEl('svg', { viewBox: '0 0 180 243' });
      svg.setAttribute('class', 'dbm-p-svg');
      function rect(x, y, w, hh, dash, rx) {
        var r = self._svgEl('rect', { x: x, y: y, width: w, height: hh, fill: 'none', stroke: '#000', 'stroke-width': 0.5 });
        if (dash) r.setAttribute('stroke-dasharray', dash);
        if (rx) r.setAttribute('rx', rx);
        svg.appendChild(r);
      }
      function line(x1, y1, x2, y2, dash) {
        var l = self._svgEl('line', { x1: x1, y1: y1, x2: x2, y2: y2, stroke: '#000', 'stroke-width': 0.5 });
        if (dash) l.setAttribute('stroke-dasharray', dash);
        svg.appendChild(l);
      }
      function circ(cx, cy, r, dash) {
        var c = self._svgEl('circle', { cx: cx, cy: cy, r: r, fill: 'none', stroke: '#000', 'stroke-width': 0.5 });
        if (dash) c.setAttribute('stroke-dasharray', dash);
        svg.appendChild(c);
      }

      /* --- the tray net, y 0..156 ------------------------------- */
      rect(6, 0, 168, 10);                       /* far lip, folds up */
      rect(78, 0, 24, 10);                       /* its mouth */
      line(6, 10, 174, 10, '3 2');               /* score */
      rect(6, 10, 168, 62);                      /* far leaf panel */
      line(6, 72, 174, 72, '3 2');               /* score 1 */
      rect(6, 72, 168, 12);                      /* the spine floor */
      rect(79, 73, 22, 10, null, 2);             /* the spine pad */
      line(6, 84, 174, 84, '3 2');               /* score 2 */
      rect(6, 84, 168, 62);                      /* near leaf panel */
      line(6, 146, 174, 146, '3 2');             /* score */
      rect(6, 146, 168, 10);                     /* near lip */
      rect(78, 146, 24, 10);                     /* its mouth */
      /* end tabs, tucked behind the panel ends */
      rect(6, 0, 10, 10, '3 2'); rect(164, 0, 10, 10, '3 2');
      rect(6, 146, 10, 10, '3 2'); rect(164, 146, 10, 10, '3 2');
      /* ⭐ the receiving circles, ordered FROM THE SPINE OUTWARD and
         mirrored across it, so folding lands circle k on circle k */
      /* ⚠⚠ TEN SEATS A LEAF, WHICH IS WHAT THE SCREEN BED HOLDS.
         It printed FIVE COLUMNS MIRRORED ACROSS THE SPINE ON TWO ROWS
         = TWENTY a leaf, against a leaf ceiling of nine — so half the
         printed seats could never be filled, while the comment above
         them claimed ten. A Swedish panel counted them. The mirroring
         that matters is across the FOLD (the y axis): x is unchanged by
         bending the tray, so a plain five-across row is free to be
         five-across, and 60 <-> 96 and 38 <-> 118 still reflect exactly
         about the spine centre at 78. */
      var cols = [42, 66, 90, 114, 138];
      for (i = 0; i < cols.length; i++) {
        circ(cols[i], 38, 7, '2.5 1.5'); circ(cols[i], 60, 7, '2.5 1.5');
        circ(cols[i], 96, 7, '2.5 1.5'); circ(cols[i], 118, 7, '2.5 1.5');
      }

      /* --- EIGHTEEN counters to cut, y 162..226 ------------------
         ⚠⚠ IT PRINTED TWENTY, AND THAT HANDED A CHILD THE ONE DOUBLE
         THE SCREEN REFUSES BY ARGUMENT. GEO.CAP is 9 because ten-and-
         ten belongs to `folding-wall`; the paper quietly allowed it,
         so the fix that corrected `reachTwenty` on screen would have
         left the contradiction sitting on the desk. Eighteen is the
         ceiling exactly, and the supply of counters is how the paper
         pushes back. ⚠ AND IT TRACKS `cap`, NOT A CONSTANT: eighteen
         was hard-coded, so a class set to "up to five and five" was
         handed enough paper for nine and nine — the same contradiction
         one setting down, found by the same panel — the seat grid stays a full mirrored 10 a leaf,
         because seats are where a counter MAY go, not how many
         exist. */
      var supply = 2 * ((this.st && this.st.cap) || GEO.CAP);
      for (i = 0; i < supply; i++) {
        var cx = 22 + (i % 5) * 34, cy = 169 + Math.floor(i / 5) * 17;
        circ(cx, cy, 7);                          /* the ring, cut line */
        circ(cx, cy + 0.4, 4.5);                  /* the body inside it */
      }

      /* --- the recording strip, y 231..243 -----------------------
         ⚠ the divider ran 231..236 — five units down a twelve-unit
         box, so a teacher told the boxes were "split down the middle"
         looked for a line that was not printed. The box is the tray;
         the line is its spine; it goes all the way. And the strip is
         inset to 6 so its first box lines up with the tray net above
         it instead of hanging six millimetres off the left. */
      for (i = 0; i < 5; i++) {
        var bx = 6 + i * 34;
        rect(bx, 231, 30, 12);
        line(bx + 15, 231, bx + 15, 243);         /* the spine */
      }
      host.appendChild(svg);
    }
  };

  function injectCSS() {
    function M(x) { return 'calc(var(--dbm-c) * ' + x + ')'; }
    function seatURI(color) {
      return 'url("data:image/svg+xml,' + encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">' +
        '<circle cx="50" cy="50" r="46" fill="none" stroke="' + color + '" stroke-width="6" ' +
        'stroke-linecap="round" stroke-dasharray="12.04 12.04"/></svg>') + '")';
    }
    var css = ''
      /* ⚠⚠ THE SCROLL ESCAPE, FULL FORM (four declarations, two rules) */
      + 'html.dbm-scroll{overflow-y:auto;height:auto;min-height:100%;}'
      + 'body.dbm-scroll{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}'

      + '.dbm-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.dbm-card{container-type:inline-size;width:100%;max-width:880px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'box-shadow:0 1px 0 #E7DCC8,0 10px 24px rgba(20,107,94,.10);'
      + 'padding:clamp(12px,2.6cqw,26px);--dbm-c:clamp(19px,7.0cqw,54px);'
      + '--dbm-fold:' + GEO.FOLD_DEG + 'deg;--dbm-chan:' + GEO.CHAN_OPEN + ';}'

      + '.dbm-stage{display:flex;align-items:center;justify-content:center;width:100%;'
      + 'min-height:' + M(8.2) + ';}'
      + '.dbm-tray{position:relative;display:flex;flex-direction:column;align-items:center;'
      + 'perspective:' + M(GEO.PERSP) + ';}'

      /* --- a leaf: face, walls as children, a lip with a mouth ----- */
      + '.dbm-leaf{position:relative;box-sizing:border-box;'
      + 'width:calc(var(--dbm-c) * 6.64 + var(--dbm-c) * 3.8);height:' + M(3.3) + ';'
      + 'background-color:#FBF3E4;}'
      + '.dbm-far{transform-origin:50% 100%;transform:rotateX(var(--dbm-fold));}'
      + '.dbm-wall{position:absolute;background-color:#146B5E;}'
      + '.dbm-wall-l{left:0;top:0;bottom:0;width:' + M(0.14) + ';}'
      + '.dbm-wall-r{right:0;top:0;bottom:0;width:' + M(0.14) + ';}'
      + '.dbm-far .dbm-wall-in{left:0;right:0;bottom:0;height:' + M(0.14) + ';}'
      + '.dbm-near .dbm-wall-in{left:0;right:0;top:0;height:' + M(0.14) + ';}'
      + '.dbm-lip{position:absolute;left:0;right:0;height:' + M(0.44) + ';background-color:#146B5E;'
      + 'display:flex;justify-content:center;}'
      + '.dbm-far .dbm-lip{top:0;}'
      + '.dbm-near .dbm-lip{bottom:0;}'
      /* ⭐ the mouth is a BREAK IN THE SILHOUETTE, never a darker patch
         inside an unbroken bar — every counter enters and leaves here */
      + '.dbm-mouth{width:' + M(1.5) + ';height:100%;background-color:#0A3F38;}'
      + '.dbm-bed{position:absolute;left:' + M(1.9) + ';right:' + M(1.9) + ';'
      + 'top:' + M(0.44) + ';bottom:' + M(0.44) + ';'
      + 'display:flex;flex-direction:column;align-items:center;justify-content:center;'
      + 'gap:' + M(0.26) + ';}'
      + '.dbm-far .dbm-bed{flex-direction:column-reverse;}'
      + '.dbm-plate{position:absolute;left:0;width:' + M(1.9) + ';top:' + M(0.44) + ';bottom:' + M(0.44) + ';'
      + 'display:flex;align-items:center;justify-content:center;'
      + 'border-right:1px solid #E7DCC8;}'
      + '.dbm-row{display:flex;gap:' + M(0.26) + ';}'

      /* --- the counter: ring, body, resolution-gated sheen --------- */
      + '.dbm-c{position:relative;width:var(--dbm-c);height:var(--dbm-c);border-radius:50%;'
      + 'background-color:#A34122;flex:none;'
      + 'transition-property:transform,opacity;transition-duration:' + GEO.T_PLACE + 'ms;'
      + 'transition-timing-function:cubic-bezier(.2,.7,.3,1);}'
      + '.dbm-c::before{content:"";position:absolute;left:' + M(0.1) + ';top:' + M(0.13) + ';'
      + 'width:' + M(0.8) + ';height:' + M(0.8) + ';border-radius:50%;background-color:#F2784B;}'
      + '.dbm-c::after{content:"";display:none;position:absolute;left:' + M(0.22) + ';top:' + M(0.28) + ';'
      + 'width:' + M(0.38) + ';height:' + M(0.2) + ';border-radius:50%;background-color:#FFFFFF;opacity:.2;}'
      + '@container (min-width:' + GEO.SHEEN_AT + 'px){.dbm-c::after{display:block;}}'
      /* a counter arriving through the mouth */
      + '.dbm-c.is-arriving{transform:translateY(' + M(1.9) + ');opacity:0;}'
      + '.dbm-far .dbm-c.is-arriving{transform:translateY(' + M(-1.9) + ');opacity:0;}'
      /* the empty place beside the odd one — a place, not a thing */
      + '.dbm-seat{width:var(--dbm-c);height:var(--dbm-c);flex:none;'
      + 'background:' + seatURI('#7A6A55') + ' center/100% no-repeat;}'

      /* --- the hinge: a real barrel ------------------------------- */
      + '.dbm-hinge{position:relative;width:calc(var(--dbm-c) * 6.64 + var(--dbm-c) * 3.8);'
      + 'height:calc(var(--dbm-c) * var(--dbm-chan));background-color:#0D4E44;'
      + 'border-radius:' + M(0.1) + ';overflow:hidden;flex:none;}'
      + '.dbm-pin{position:absolute;left:0;right:0;top:50%;height:' + M(0.16) + ';'
      + 'margin-top:' + M(-0.08) + ';background-color:#FBF3E4;}'
      + '.dbm-knuckle{position:absolute;width:' + M(1.4) + ';height:60%;border-radius:' + M(0.08) + ';}'
      + '.dbm-k0{left:' + M(1.1) + ';top:0;background-color:#146B5E;}'
      + '.dbm-k1{left:' + M(7.94) + ';top:0;background-color:#146B5E;}'
      + '.dbm-k2{left:' + M(2.7) + ';bottom:0;background-color:#0E5147;}'
      + '.dbm-k3{left:' + M(6.34) + ';bottom:0;background-color:#0E5147;}'
      /* ⭐ THE SPINE PAD — the one flat place a counter can stand
         alone, present at rest. It is also the contrast solution: a
         coral counter on the dark channel measures 1.52:1. */
      + '.dbm-pad{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);'
      + 'width:' + M(2) + ';height:' + M(1.1) + ';border-radius:' + M(0.16) + ';'
      + 'background-color:#FBF3E4;box-shadow:inset 0 0 0 ' + M(0.08) + ' #146B5E;'
      + 'display:flex;align-items:center;justify-content:center;}'
      + '.dbm-odd{display:flex;align-items:center;justify-content:center;}'
      + '.dbm-num-total{position:absolute;left:' + M(0.5) + ';top:50%;transform:translateY(-50%);'
      + 'color:#FBF3E4;}'

      + '.dbm-plinth{width:calc(var(--dbm-c) * 6.64 + var(--dbm-c) * 3.8);height:' + M(0.3) + ';'
      + 'background-color:#0D4E44;border-radius:0 0 ' + M(0.1) + ' ' + M(0.1) + ';flex:none;}'

      /* --- numerals ----------------------------------------------- */
      + '.dbm-num{font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;line-height:1;'
      + 'font-variant-numeric:tabular-nums;color:#0E5147;'
      + 'font-size:max(22px,' + M(1.05) + ');}'

      /* --- the refusal: the apparatus answers --------------------- */
      + '.dbm-tray.is-refuse .dbm-knuckle{background-color:#A34122;}'

      /* --- the act strip ------------------------------------------ */
      + '.dbm-say{width:100%;max-width:860px;box-sizing:border-box;text-align:center;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#2A2A35;'
      + 'min-height:2.6em;margin:10px 0 0;line-height:1.3;}'
      + '.dbm-ctl{display:flex;flex-direction:column;gap:10px;width:100%;max-width:860px;'
      + 'box-sizing:border-box;margin-top:6px;}'
      + '.dbm-g{display:flex;flex-wrap:wrap;align-items:center;gap:8px;'
      + 'padding-left:12px;border-left:4px solid transparent;}'
      + '.dbm-g.is-here{border-left-color:#146B5E;}'
      + '.dbm-leg{flex:none;width:100%;font-family:Nunito,system-ui,sans-serif;font-size:13px;'
      + 'font-weight:700;color:#2A2A35;}'
      + '.dbm-chips{display:flex;flex-wrap:wrap;gap:8px;}'

      + '.dbm-btn{display:inline-flex;align-items:center;gap:7px;min-height:44px;'
      + 'padding:9px 14px;border-radius:11px;border:1px solid #E7DCC8;'
      + 'background-color:#FBF3E4;color:#2A2A35;cursor:pointer;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:15px;line-height:1.25;'
      + 'max-width:300px;text-align:start;box-sizing:border-box;}'
      + '.dbm-gly{display:inline-flex;flex:none;}'
      + '.dbm-lab{white-space:normal;}'
      /* ⚠ THE PLATFORM FOCUS COLOUR FAILS ITS OWN FLOOR — #1E8FD4
         measures 2.97:1 on the working surface. Deep teal carries the
         contrast at 8.02:1 and the cream offset separates it from the
         teal furniture. Kept exactly as shipped. */
      + '.dbm-btn:focus-visible{outline:3px solid #0D4E44;outline-offset:2px;'
      + 'box-shadow:0 0 0 5px #FBF3E4;}'
      + '.dbm-btn.is-off{opacity:.42;}'
      + '.dbm-btn.is-now{border:2px solid #146B5E;padding:8px 13px;font-weight:700;}'
      + '.dbm-btn[aria-pressed="true"]{background-color:#146B5E;color:#FBF3E4;}'

      + '.dbm-b-pred{flex-direction:column;gap:4px;min-width:58px;justify-content:center;padding:7px 10px;}'
      + '.dbm-num-chip{font-family:"Baloo 2",system-ui,sans-serif;font-size:21px;font-weight:600;'
      + 'line-height:1;color:#2A2A35;}'
      + '.dbm-b-pred[aria-pressed="true"] .dbm-num-chip{color:#FBF3E4;}'
      + '.dbm-pmini{display:flex;gap:4px;}'
      + '.dbm-pmini-h{display:grid;grid-template-columns:repeat(5,4px);gap:1px;}'
      + '.dbm-pmini-c{width:4px;height:4px;border-radius:50%;background-color:#F2784B;'
      + 'box-shadow:inset 0 0 0 1px #A34122;}'

      + '.dbm-b-print{border-style:dashed;}'
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
      + 'body.dbm-printing .dbm-wrap{display:none !important;}'
      + 'body.dbm-printing .dbm-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.dbm-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.dbm-sheet-note{margin:0 0 4mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;line-height:1.4;}'
      + '.dbm-p-svg{display:block;width:180mm;height:243mm;}'
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
