/* =====================================================================
   TOOL #51 — THE LANDING STRIP
   =====================================================================
   A bare strip with a wall at each end and three posts on it — one at
   each end and one in the middle. A number appears. The class says
   which post it is NEAREST, and only then puts it on the strip. The
   true place is shown. Then the strip RE-RULES ITSELF into the ten the
   number lives in — and the same three posts are there again.

   ⭐⭐ THE INVENTION: THE QUESTION RECURS, NOT THE AXIS. Zooming a number
   line is a rescaling, and a rescaling on its own is refuted evidence
   (Nuraydin, Stricker & Schneider 2022, RCT N=188: number-line training
   FAILED TO TRANSFER across a single axis rescaling). What survives is
   the strip re-ruling into 40-50 and ASKING THE SAME THREE-POST
   QUESTION at the new depth: nearer 40, nearer 45, or nearer 50. The
   self-similarity is a question that keeps working, which a child can
   check, rather than an axis that changed, which they cannot.

   ⚖️ THE PEDAGOGY PANEL RULED **DO NOT BUILD**, 3-0, WITH THE STRONGEST
   EVIDENCE ANY PANEL HAS PRODUCED, AND IT IS RECORDED HERE RATHER THAN
   ANSWERED:
   - ⚠⚠ THE CATALOG'S HEADLINE CLAIM IS BACKWARDS. Maximum placement
     error sits at x ~ 21.7: a child puts TEN IN THE MIDDLE of a 0-100
     line. By 90 the error has collapsed to about +7.7. The top of the
     strip is where children are MOST accurate, and the squeeze up there
     is a side effect of small numbers being shoved right. "Everyone
     crams 60-90 into the last inch" aims a class at the wrong end.
   - ⚠ "Magnitude sense is the single best predictor of later
     arithmetic" is FALSE. Geary 2011, N=177: number-line estimation
     predicts at 0.14, t < 1, NOT SIGNIFICANT — outranked by addition
     decomposition (0.67), visuospatial working memory (0.49) and IQ
     (0.38).
   - ⚠ Variance is SMALLEST at 0, 50 and 100 and GREATEST at 25 and 75.
   - ⚠ There is no unclaimed K-2 CCSS code for number-line estimation;
     it is a research instrument, not a curriculum object.
   ⚠ #47's rule binds: redefining the deliverable is the operator's
   call, not a panel's. The objection is on the record and the tool is
   built — and the panel's OWN "remainder worth having" is what it was
   built around.

   ⭐ WHAT THE PANEL HANDED OVER WHILE REFUSING: "Nearer 0, nearer 50, or
   nearer 100? — commit to a benchmark BEFORE placing." The catalog
   states its dread in BENCHMARK form ("Is 71 nearer 20 or nearer 90?")
   and then builds a PLACEMENT tool. That mismatch is the design. The
   benchmark is where accuracy actually lives, the documented
   progression stops at exactly three anchors, and the hard cases are 25
   and 75 — which is why the strip offers 25 and 75 rounds at all.

   ⚠⚠ THERE IS NO ACCURACY GHOST, AND THAT IS NOT AN OVERSIGHT.
   `verify-estimation-jar.js` P14 bans it BY NAME, gate-enforced and
   poison-tested in eleven locales: "THE SAVED RITUAL MUST NOT BE ABLE
   TO CARRY A TREND. 'We're getting closer week by week' is an accuracy
   gradient in slow motion, and it is the single most likely thing to be
   added to this feature next." The art panel's segment-ghost — a line
   joining guess to truth — is the best single idea any panel produced
   and it is precisely what that gate forbids. So the trace here records
   ONLY WHICH POST WAS CHOSEN: three columns, sign-only, no distance, no
   rank, no order, no closest and no winner. That is the shape
   `estimation-jar.spread()` already ships and its own gate already
   permits.

   ⚠ NO TICKS ON THE STRIP, and the reason is structural rather than
   pedagogical: a ticked strip would carry DIFFERENT furniture after the
   re-rule, which is the exact opposite of self-similarity. A bare strip
   is identical at every depth, and that identity IS the proof the tool
   is making.

   ⚠ NO GLIDER. The catalog says the number "flies in as a small
   glider", but the number lands where the class SAID and the truth is
   then revealed somewhere else — so the aircraft ends up in the wrong
   place, which is a crash. That is a right/wrong verdict delivered as a
   pictogram, and a funny one, which is worse than any colour could
   manage. The number arrives AS ITSELF.

   ⚠ EVERY STRUCTURAL NOUN IS OWNED. The fence returned: strip
   (`pattern-bench`, in every locale), line (`number-line` owns the head
   term in all 11 and MUST NOT be renamed), track and rail (`arrow-strip`
   in every NON-EN locale — it reads free in English only), runway (a
   NAMED PART of `unroll-tape`), ghost (`arrow-strip`'s invention 2, and
   `draw-bag` refuses it by name), trail, mark (`cold-line`'s named
   part), peg, stretch (`unit-handle`). FREE and used here: THE POSTS ·
   THE WALLS · THE PLAQUE · THE WEDGE. "Strip" survives in the product
   NAME only, which is the operator's.

   FREE   the whole apparatus: both depths, all three posts, every
          placement, the re-rule, and the post trace.
   PAID   the paper strips to rule up and use on the wall.

   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    /* the strip is drawn in percent of its own width, so it is the SAME
       DRAWING at every depth — which is the tool's whole argument and
       the reason there is no tick anywhere in this file. */
    POSTS: 3,                  /* nearer-low, nearer-middle, nearer-high */
    DEPTH_MAX: 2,              /* 0-100, then one ten. Deeper is Grade 3+ */
    SPAN_TOP: 100,
    DECADE: 10,

    /* placement resolution. ⚠ A 0-100 strip at ~700px is ~7px a unit,
       and a six-year-old's finger on a whiteboard is not a 7px
       instrument. The tool ROUNDS placement to STEP and never pretends
       to a precision it cannot render or a child cannot express. */
    STEP_TOP: 1,
    NUDGE_BIG: 10,
    NUDGE_SMALL: 1,

    /* the trace: which post the class chose, never how far off it was */
    TRACE_MAX: 20,             /* ⚠ P14: a long enough series IS a trend */

    /* motion, ms */
    T_ARRIVE: 380,
    T_COMMIT: 260,
    /* ⚠⚠ THE BEAT does NOT pass through _dur(). Reduced motion is about
       MOVEMENT, and a wait is not movement; a blanket wrapper would
       silently delete the pedagogy for the users least able to complain
       about it. */
    T_BEAT: 900,
    /* ⚠⚠ AND THE REVEAL MUST NOT SCALE WITH THE ERROR. If a bad guess
       took longer to resolve, the verdict would leak into the TIME
       channel, where no colour audit, no contrast audit and no shape
       audit can see it. One duration, always. */
    T_REVEAL: 640,
    T_RERULE: 760,
    T_REFUSE: 200,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_POST: 620,
    SND_PLACE: 500,
    SND_REVEAL: 780,
    SND_RERULE: 880,
    SND_REFUSE: 300,
    SND_DEBOUNCE: 160
  };

  var LandingStrip = {

    id: 'landing-strip',

    strings: {
      title: {
        en: 'The Landing Strip',
        de: 'Die drei Pfosten',
        fr: 'Les trois piquets',
        es: 'Los tres postes',
        pt: 'Os três postes',
        it: 'I tre paletti',
        nl: 'De drie palen',
        sv: 'De tre stolparna',
        da: 'De tre stolper',
        no: 'De tre pålene',
        fi: 'Kolme tolppaa'
      },
      instruction: {
        en: 'A number appears. Say which post it is nearest to, then put it on the strip — and see where it really lives.',
        de: 'Eine Zahl kommt. Sagt, welchem Pfosten sie am nächsten ist, und legt sie erst dann hin — dann seht ihr, wo sie wirklich wohnt.',
        fr: 'Un nombre arrive. Dites de quel piquet il est le plus près, et posez-le seulement après — vous verrez alors où il habite vraiment.',
        es: 'Llega un número. Digan de qué poste está más cerca y solo entonces colóquenlo — así verán dónde vive de verdad.',
        pt: 'Chega um número. Digam de qual poste ele está mais perto e só então coloquem — aí vocês veem onde ele mora de verdade.',
        it: 'Arriva un numero. Dite a quale paletto è più vicino e solo dopo posatelo — così vedrete dove abita davvero.',
        nl: 'Er komt een getal. Zeg bij welke paal het het dichtst staat en leg het pas daarna neer — dan zie je waar het echt woont.',
        sv: 'Ett tal dyker upp. Säg vilken stolpe det är närmast, och lägg det först då — sedan ser ni var det egentligen bor.',
        da: 'Der kommer et tal. Sig, hvilken stolpe det er nærmest, og læg det først derefter — så ser I, hvor det i virkeligheden bor.',
        no: 'Det kommer et tall. Si hvilken påle det er nærmest, og legg det først da — så ser dere hvor det egentlig bor.',
        fi: 'Luku ilmestyy. Sanokaa, minkä tolpan lähellä se on, ja asettakaa se vasta sitten — sitten näette, missä se oikeasti asuu.'
      },

      ariaStrip: {

        en: 'A strip with a wall at each end and three posts on it: one at each end and one in the middle.',

        de: 'An jedem Ende eine Mauer, dazwischen drei Pfosten: einer an jedem Ende, einer in der Mitte.',

        fr: 'Un butoir à chaque bout et trois piquets : un à chaque bout, un au milieu.',

        es: 'Un tope en cada extremo y tres postes: uno en cada extremo y uno en el medio.',

        pt: 'Um muro em cada ponta e três postes: um em cada ponta e um no meio.',

        it: 'Una sponda a ogni estremità e tre paletti: uno a ogni estremità e uno al centro.',

        nl: 'Aan elk uiteinde een stootblok en drie palen: één aan elk uiteinde en één in het midden.',

        sv: 'En stoppkloss i varje ände och tre stolpar: en i varje ände och en i mitten.',

        da: 'En stopklods i hver ende og tre stolper: en i hver ende og en i midten.',

        no: 'En stoppkloss i hver ende og tre påler: en i hver ende og en i midten.',

        fi: 'Molemmissa päissä muuri ja kolme tolppaa: yksi kummassakin päässä ja yksi keskellä.'

      },
      ariaPlaque: {
        en: 'the number, at {n}',
        de: 'das Schild, bei {n}',
        fr: 'la pancarte, à {n}',
        es: 'el cartel, en {n}',
        pt: 'o letreiro, em {n}',
        it: 'la targa, a {n}',
        nl: 'het bordje, op {n}',
        sv: 'lappen, vid {n}',
        da: 'sedlen, ved {n}',
        no: 'lappen, ved {n}',
        fi: 'kilpi, kohdassa {n}'
      },
      ariaTruth: {
        en: 'where the number really lives',
        de: 'wo die Zahl wirklich wohnt',
        fr: 'où le nombre habite vraiment',
        es: 'dónde vive de verdad el número',
        pt: 'onde o número mora de verdade',
        it: 'dove abita davvero il numero',
        nl: 'waar het getal echt woont',
        sv: 'var talet egentligen bor',
        da: 'hvor tallet i virkeligheden bor',
        no: 'hvor tallet egentlig bor',
        fi: 'missä luku oikeasti asuu'
      },
      ariaTrace: {
        en: 'how often the class has chosen each post',
        de: 'welche Pfosten die Klasse bisher gewählt hat',
        fr: 'quels piquets la classe a choisis jusqu’ici',
        es: 'qué postes ha elegido la clase hasta ahora',
        pt: 'quais postes a turma escolheu até agora',
        it: 'quali paletti ha scelto la classe finora',
        nl: 'welke palen de klas tot nu toe gekozen heeft',
        sv: 'vilka stolpar klassen har valt hittills',
        da: 'hvilke stolper klassen har valgt indtil nu',
        no: 'hvilke påler klassen har valgt hittil',
        fi: 'mitkä tolpat luokka on tähän mennessä valinnut'
      },

      setSpan: {

        en: 'How far the strip reaches',

        de: 'Wie weit es reicht',

        fr: 'Jusqu’où ça va',

        es: 'Hasta dónde llega',

        pt: 'Até onde vai',

        it: 'Fin dove arriva',

        nl: 'Hoe ver het reikt',

        sv: 'Hur långt det räcker',

        da: 'Hvor langt det når',

        no: 'Hvor langt det rekker',

        fi: 'Kuinka pitkälle ulottuu'

      },
      span100: {
        en: '0 to 100',
        de: '0 bis 100',
        fr: 'De 0 à 100',
        es: 'De 0 a 100',
        pt: 'De 0 a 100',
        it: 'Da 0 a 100',
        nl: '0 tot 100',
        sv: '0 till 100',
        da: '0 til 100',
        no: '0 til 100',
        fi: '0–100'
      },
      span20: {
        en: '0 to 20',
        de: '0 bis 20',
        fr: 'De 0 à 20',
        es: 'De 0 a 20',
        pt: 'De 0 a 20',
        it: 'Da 0 a 20',
        nl: '0 tot 20',
        sv: '0 till 20',
        da: '0 til 20',
        no: '0 til 20',
        fi: '0–20'
      },

      postLow: {

        en: 'Nearest the post on the left',

        de: 'Am nächsten beim linken Pfosten',

        fr: 'Le plus près du piquet de gauche',

        es: 'Más cerca del poste de la izquierda',

        pt: 'Mais perto do poste da esquerda',

        it: 'Più vicino al paletto di sinistra',

        nl: 'Het dichtst bij de linkerpaal',

        sv: 'Närmast stolpen till vänster',

        da: 'Nærmest stolpen til venstre',

        no: 'Nærmest pålen til venstre',

        fi: 'Lähinnä vasemmanpuoleista tolppaa'

      },
      postMid: {
        en: 'Nearest the post in the middle',
        de: 'Am nächsten beim mittleren Pfosten',
        fr: 'Le plus près du piquet du milieu',
        es: 'Más cerca del poste del medio',
        pt: 'Mais perto do poste do meio',
        it: 'Più vicino al paletto in mezzo',
        nl: 'Het dichtst bij de middelste paal',
        sv: 'Närmast stolpen i mitten',
        da: 'Nærmest stolpen i midten',
        no: 'Nærmest pålen i midten',
        fi: 'Lähinnä keskimmäistä tolppaa'
      },
      postHigh: {
        en: 'Nearest the post on the right',
        de: 'Am nächsten beim rechten Pfosten',
        fr: 'Le plus près du piquet de droite',
        es: 'Más cerca del poste de la derecha',
        pt: 'Mais perto do poste da direita',
        it: 'Più vicino al paletto di destra',
        nl: 'Het dichtst bij de rechterpaal',
        sv: 'Närmast stolpen till höger',
        da: 'Nærmest stolpen til højre',
        no: 'Nærmest pålen til høyre',
        fi: 'Lähinnä oikeanpuoleista tolppaa'
      },

      /* ⚠ NOT 'ten' and 'one'. nudge() multiplies by step(), which is a
         TENTH inside a ten — measured: at 80-90 the big nudge moves 1.000
         and the small one moves 0.100. A label naming a fixed quantity is
         FALSE in half the tool's states, and the glyphs were false in the
         visual channel too, where no string could reach them. */
      less10: {
        en: 'A big step to the left',
        de: 'Ein großer Schritt nach links',
        fr: 'Un grand pas vers la gauche',
        es: 'Un paso grande hacia la izquierda',
        pt: 'Um passo grande para a esquerda',
        it: 'Un passo grande verso sinistra',
        nl: 'Een grote stap naar links',
        sv: 'Ett stort steg åt vänster',
        da: 'Et stort skridt til venstre',
        no: 'Et stort skritt til venstre',
        fi: 'Iso askel vasemmalle'
      },
      less1: {
        en: 'A small step to the left',
        de: 'Ein kleiner Schritt nach links',
        fr: 'Un petit pas vers la gauche',
        es: 'Un paso pequeño hacia la izquierda',
        pt: 'Um passo pequeno para a esquerda',
        it: 'Un passo piccolo verso sinistra',
        nl: 'Een kleine stap naar links',
        sv: 'Ett litet steg åt vänster',
        da: 'Et lille skridt til venstre',
        no: 'Et lite skritt til venstre',
        fi: 'Pieni askel vasemmalle'
      },
      more1: {
        en: 'A small step to the right',
        de: 'Ein kleiner Schritt nach rechts',
        fr: 'Un petit pas vers la droite',
        es: 'Un paso pequeño hacia la derecha',
        pt: 'Um passo pequeno para a direita',
        it: 'Un passo piccolo verso destra',
        nl: 'Een kleine stap naar rechts',
        sv: 'Ett litet steg åt höger',
        da: 'Et lille skridt til højre',
        no: 'Et lite skritt til høyre',
        fi: 'Pieni askel oikealle'
      },
      more10: {
        en: 'A big step to the right',
        de: 'Ein großer Schritt nach rechts',
        fr: 'Un grand pas vers la droite',
        es: 'Un paso grande hacia la derecha',
        pt: 'Um passo grande para a direita',
        it: 'Un passo grande verso destra',
        nl: 'Een grote stap naar rechts',
        sv: 'Ett stort steg åt höger',
        da: 'Et stort skridt til højre',
        no: 'Et stort skritt til høyre',
        fi: 'Iso askel oikealle'
      },
      place: {
        en: 'Put it here',
        de: 'Hierhin legen',
        fr: 'Le poser ici',
        es: 'Dejarlo aquí',
        pt: 'Deixar aqui',
        it: 'Posarlo qui',
        nl: 'Hier neerleggen',
        sv: 'Lägg det här',
        da: 'Læg det her',
        no: 'Legg det her',
        fi: 'Aseta tähän'
      },
      rerule: {
        en: 'Open up the ten it lives in',
        de: 'Den Zehner aufmachen, in dem sie wohnt',
        fr: 'Ouvrir la dizaine où il habite',
        es: 'Abrir la decena donde vive',
        pt: 'Abrir a dezena onde ele mora',
        it: 'Aprire la decina in cui abita',
        nl: 'Het tiental openmaken waar het in woont',
        sv: 'Öppna tiotalet där det bor',
        da: 'Åbn tieren, det bor i',
        no: 'Åpne tieren det bor i',
        fi: 'Avaa kymmen, jossa se asuu'
      },
      back: {
        en: 'Go back out to the whole strip',
        de: 'Zurück zum Ganzen',
        fr: 'Revenir à l’ensemble',
        es: 'Volver al conjunto',
        pt: 'Voltar para o todo',
        it: 'Tornare all’insieme',
        nl: 'Terug naar het geheel',
        sv: 'Tillbaka till det hela',
        da: 'Tilbage til det hele',
        no: 'Tilbake til det hele',
        fi: 'Takaisin kokonaisuuteen'
      },
      next: {
        en: 'Another number',
        de: 'Noch eine Zahl',
        fr: 'Un autre nombre',
        es: 'Otro número',
        pt: 'Outro número',
        it: 'Un altro numero',
        nl: 'Nog een getal',
        sv: 'Ett tal till',
        da: 'Et tal mere',
        no: 'Et tall til',
        fi: 'Uusi luku'
      },

      saidArrive: {

        en: '{n}. Which post is it nearest to?',

        de: '{n}. Welchem Pfosten ist sie am nächsten?',

        fr: '{n}. De quel piquet est-il le plus près ?',

        es: '{n}. ¿De qué poste está más cerca?',

        pt: '{n}. De qual poste ele está mais perto?',

        it: '{n}. A quale paletto è più vicino?',

        nl: '{n}. Bij welke paal staat het het dichtst?',

        sv: '{n}. Vilken stolpe är det närmast?',

        da: '{n}. Hvilken stolpe er det nærmest?',

        no: '{n}. Hvilken påle er det nærmest?',

        fi: '{n}. Minkä tolpan lähellä se on?'

      },
      saidPost: {
        en: 'Nearest {p}. Now move it to where it really goes.',
        de: 'Am nächsten bei {p}. Legt sie jetzt hin.',
        fr: 'Le plus près de {p}. Posez-le maintenant.',
        es: 'Más cerca de {p}. Ahora colóquenlo.',
        pt: 'Mais perto de {p}. Agora coloquem.',
        it: 'Più vicino a {p}. Adesso posatelo.',
        nl: 'Het dichtst bij {p}. Leg het nu neer.',
        sv: 'Närmast {p}. Lägg det nu.',
        da: 'Nærmest {p}. Læg det nu.',
        no: 'Nærmest {p}. Legg det nå.',
        fi: 'Lähin tolppa: {p}. Asettakaa luku nyt.'
      },
      saidMoved: {
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
      saidTruth: {
        en: 'It lives at {t}. You put it at {n}.',
        de: 'Sie wohnt bei {t}. Ihr habt sie auf {n} gelegt.',
        fr: 'Il habite au {t}. Vous l’avez posé au {n}.',
        es: 'Vive en el {t}. Ustedes lo dejaron en el {n}.',
        pt: 'Ele mora no {t}. Vocês colocaram no {n}.',
        it: 'Abita al {t}. Voi l’avete posato al {n}.',
        nl: 'Het woont op {t}. Jullie legden het op {n}.',
        sv: 'Det bor på {t}. Ni la det på {n}.',
        da: 'Det bor på {t}. I lagde det på {n}.',
        no: 'Det bor på {t}. Dere la det på {n}.',
        fi: 'Se asuu kohdassa {t}. Te asetitte sen kohtaan {n}.'
      },
      saidRerule: {
        en: 'The strip now runs from {a} to {b}. The three posts are back.',
        de: 'Jetzt geht es von {a} bis {b}. Die drei Pfosten sind wieder da.',
        fr: 'Ça va maintenant de {a} à {b}. Les trois piquets sont de retour.',
        es: 'Ahora va de {a} a {b}. Los tres postes están de vuelta.',
        pt: 'Agora vai de {a} a {b}. Os três postes voltaram.',
        it: 'Adesso va da {a} a {b}. I tre paletti sono di nuovo qui.',
        nl: 'Nu loopt het van {a} tot {b}. De drie palen zijn er weer.',
        sv: 'Nu går det från {a} till {b}. De tre stolparna är tillbaka.',
        da: 'Nu går det fra {a} til {b}. De tre stolper er tilbage.',
        no: 'Nå går det fra {a} til {b}. De tre pålene er tilbake.',
        fi: 'Nyt tässä ovat luvut {a}–{b}. Kolme tolppaa on taas paikoillaan.'
      },
      saidBack: {
        en: 'Back to the whole strip, {a} to {b}.',
        de: 'Zurück zum Ganzen, {a} bis {b}.',
        fr: 'Retour à l’ensemble, de {a} à {b}.',
        es: 'De vuelta al conjunto, de {a} a {b}.',
        pt: 'De volta ao todo, de {a} a {b}.',
        it: 'Di nuovo all’insieme, da {a} a {b}.',
        nl: 'Terug naar het geheel, {a} tot {b}.',
        sv: 'Tillbaka till det hela, {a} till {b}.',
        da: 'Tilbage til det hele, {a} til {b}.',
        no: 'Tilbake til det hele, {a} til {b}.',
        fi: 'Takaisin kokonaisuuteen, luvut {a}–{b}.'
      },
      saidEnd: {
        en: 'The strip does not go past {n}.',
        de: 'Weiter als {n} geht es nicht.',
        fr: 'Ça ne va pas plus loin que {n}.',
        es: 'No llega más allá de {n}.',
        pt: 'Não passa de {n}.',
        it: 'Non va oltre {n}.',
        nl: 'Verder dan {n} gaat het niet.',
        sv: 'Längre än {n} går det inte.',
        da: 'Længere end {n} går det ikke.',
        no: 'Lenger enn {n} går det ikke.',
        fi: 'Pidemmälle kuin {n} ei pääse.'
      },
      saidNoRerule: {
        en: 'This is already one ten. It does not open up any further.',
        de: 'Das ist schon ein einzelner Zehner. Weiter aufmachen geht nicht.',
        fr: 'C’est déjà une seule dizaine. On ne peut pas l’ouvrir davantage.',
        es: 'Esto ya es una sola decena. No se puede abrir más.',
        pt: 'Isto já é uma dezena só. Não dá para abrir mais.',
        it: 'Questa è già una sola decina. Non si apre oltre.',
        nl: 'Dit is al één tiental. Verder openmaken kan niet.',
        sv: 'Det här är redan ett enda tiotal. Det går inte att öppna mer.',
        da: 'Det her er allerede én enkelt tier. Den kan ikke åbnes mere.',
        no: 'Dette er allerede én enkelt tier. Den kan ikke åpnes mer.',
        fi: 'Tämä on jo yksi ainoa kymmen. Sitä ei voi avata enempää.'
      },

      gateTitle: {

        en: 'The paper strips',

        de: 'Die Papiervorlagen',

        fr: 'Les modèles en papier',

        es: 'Las plantillas de papel',

        pt: 'Os modelos de papel',

        it: 'I modelli di carta',

        nl: 'De papieren sjablonen',

        sv: 'Pappersmallarna',

        da: 'Papirskabelonerne',

        no: 'Papirmalene',

        fi: 'Paperipohjat'

      },
      gateBody: {
        en: 'The whole apparatus is free — both depths, all three posts, every placement and the re-rule. A Teacher plan adds the paper strips to rule up and pin along the wall, so the class can keep one running all week.',
        de: 'Alles hier ist kostenlos — beide Tiefen, alle drei Pfosten, jedes Hinlegen und das Neueinteilen. Das Lehrkraft-Abo bringt zusätzlich die Papiervorlagen zum Selbsteinteilen und Aufhängen, damit im Klassenzimmer die ganze Woche eine mitläuft.',
        fr: 'Tout est gratuit ici — les deux profondeurs, les trois piquets, chaque pose et la nouvelle graduation. L’abonnement Enseignant ajoute les modèles en papier à graduer soi-même et à afficher dans la classe, pour en garder un en cours toute la semaine.',
        es: 'Aquí todo es gratis: las dos profundidades, los tres postes, cada colocación y la nueva graduación. El plan Docente añade las plantillas de papel para graduarlas ustedes mismos y colgarlas en el aula, y así tener una funcionando toda la semana.',
        pt: 'Aqui tudo é grátis — as duas profundidades, os três postes, cada colocação e a nova graduação. O plano Professor traz ainda os modelos de papel para vocês mesmos graduarem e pendurarem na sala, para deixar um funcionando a semana toda.',
        it: 'Qui è tutto gratuito: entrambe le profondità, i tre paletti, ogni posa e la nuova graduazione. Il piano Insegnante aggiunge i modelli di carta da graduare voi stessi e appendere in aula, così ne resta uno in corso per tutta la settimana.',
        nl: 'Alles hier is gratis — beide dieptes, alle drie de palen, elke plaatsing en het opnieuw indelen. Het Leerkracht-abonnement voegt de papieren sjablonen toe om zelf in te delen en in de klas op te hangen, zodat er de hele week één loopt.',
        sv: 'Allt här är gratis — båda djupen, alla tre stolparna, varje placering och den nya indelningen. Lärarplanen lägger till pappersmallarna som ni delar in själva och sätter upp i klassrummet, så att en får stå kvar hela veckan.',
        da: 'Alt her er gratis — begge dybder, alle tre stolper, hver placering og den nye inddeling. Lærerabonnementet giver desuden papirskabelonerne, som I selv deler ind og hænger op i klassen, så en kan blive hængende hele ugen.',
        no: 'Alt her er gratis — begge dybdene, alle tre pålene, hver plassering og den nye inndelingen. Lærerabonnementet gir i tillegg papirmalene som dere deler inn selv og henger opp i klasserommet, slik at en kan bli hengende hele uka.',
        fi: 'Täällä kaikki on maksutonta — molemmat tasot, kaikki kolme tolppaa, jokainen asettaminen ja uudelleenjako. Opettajatilaus tuo lisäksi paperipohjat, jotka jaatte itse ja ripustatte luokkaan, niin yksi saa olla esillä koko viikon.'
      },
      gateCta: {
        en: 'See the Teacher plan',
        de: 'Das Lehrkraft-Abo ansehen',
        fr: 'Voir l’abonnement Enseignant',
        es: 'Ver el plan Docente',
        pt: 'Ver o plano Professor',
        it: 'Scopri il piano Insegnante',
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

        en: 'Print the paper strips',

        de: 'Papiervorlagen drucken',

        fr: 'Imprimer les modèles en papier',

        es: 'Imprimir las plantillas de papel',

        pt: 'Imprimir os modelos de papel',

        it: 'Stampa i modelli di carta',

        nl: 'Papieren sjablonen afdrukken',

        sv: 'Skriv ut pappersmallarna',

        da: 'Print papirskabelonerne',

        no: 'Skriv ut papirmalene',

        fi: 'Tulosta paperipohjat'

      },
      sheetTitle: {
        en: 'Paper strips to rule up',
        de: 'Papiervorlagen zum Einteilen',
        fr: 'Modèles en papier à graduer',
        es: 'Plantillas de papel para graduar',
        pt: 'Modelos de papel para graduar',
        it: 'Modelli di carta da graduare',
        nl: 'Papieren sjablonen om in te delen',
        sv: 'Pappersmallar att dela in',
        da: 'Papirskabeloner til at dele ind',
        no: 'Papirmaler til å dele inn',
        fi: 'Paperipohjat jaettaviksi'
      },
      sheetNote: {
        en: 'Each blank strip has a wall at both ends and three posts. Write the two end numbers in, put it up in the classroom, and let the class add numbers to it all week. Rule the next one up as a single ten to carry on inside it.',
        de: 'Jede leere Vorlage hat an beiden Enden eine Mauer und drei Pfosten. Tragt die beiden Endzahlen ein, hängt sie im Klassenzimmer auf und lasst die Klasse die ganze Woche Zahlen dazulegen. Die nächste teilt ihr als einen einzelnen Zehner ein, um darin weiterzumachen.',
        fr: 'Chaque modèle vierge a un butoir à chaque bout et trois piquets. Écrivez les deux nombres des bouts, affichez-le dans la classe et laissez la classe y ajouter des nombres toute la semaine. Graduez le suivant comme une seule dizaine pour continuer à l’intérieur.',
        es: 'Cada plantilla en blanco tiene un tope en cada extremo y tres postes. Escriban los dos números de los extremos, cuélguenla en el aula y dejen que la clase le agregue números toda la semana. Gradúen la siguiente como una sola decena para continuar dentro de ella.',
        pt: 'Cada modelo em branco tem um muro em cada ponta e três postes. Escrevam os dois números das pontas, pendurem na sala e deixem a turma acrescentar números a semana toda. Graduem o próximo como uma dezena só, para continuar dentro dela.',
        it: 'Ogni modello vuoto ha una sponda a entrambe le estremità e tre paletti. Scrivete i due numeri delle estremità, appendetelo in aula e lasciate che la classe ci aggiunga numeri per tutta la settimana. Graduate il successivo come una sola decina, per continuare al suo interno.',
        nl: 'Elk leeg sjabloon heeft aan beide uiteinden een stootblok en drie palen. Schrijf de twee getallen van de uiteinden erbij, hang het in de klas op en laat de klas er de hele week getallen bij zetten. Deel het volgende in als één tiental om daarbinnen verder te gaan.',
        sv: 'Varje tom mall har en stoppkloss i båda ändarna och tre stolpar. Skriv in de två talen i ändarna, sätt upp den i klassrummet och låt klassen lägga till tal hela veckan. Dela in nästa som ett enda tiotal för att fortsätta inuti det.',
        da: 'Hver tom skabelon har en stopklods i begge ender og tre stolper. Skriv de to tal i enderne, hæng den op i klassen, og lad klassen føje tal til hele ugen. Del den næste ind som én enkelt tier for at fortsætte inde i den.',
        no: 'Hver tomme mal har en stoppkloss i begge ender og tre påler. Skriv inn de to tallene i endene, heng den opp i klasserommet, og la klassen legge til tall hele uka. Del inn den neste som én enkelt tier for å fortsette inne i den.',
        fi: 'Jokaisessa tyhjässä pohjassa on muuri molemmissa päissä ja kolme tolppaa. Kirjoittakaa päiden luvut, ripustakaa pohja luokkaan ja antakaa luokan lisätä siihen lukuja koko viikon. Jakakaa seuraava yhdeksi ainoaksi kymmeneksi, niin voitte jatkaa sen sisällä.'
      }
    },

    settings: [
      { key: 'span', type: 'choice', labelKey: 'setSpan', options: [
        { value: '100', labelKey: 'span100' },
        { value: '20', labelKey: 'span20' }
      ] }
    ],
    defaults: { span: '100' },

    premium: false,
    GEO: GEO,

    /* ================= the model ====================================
       Pure, DOM-free, and small enough to enumerate.

       ⚠ WRONG STATES ARE UNREACHABLE BECAUSE THE MODEL CANNOT EXPRESS
       THEM. `phase` is a single token and every mutator is guarded on
       it, so "revealed before a post was chosen" is not a state this
       tool can be put into by any sequence of presses in any order.
       ⚠ EVERY MUTATOR RETURNS null ON REFUSAL, NEVER A CLAMP. A clamp
       would quietly answer a different question than the one asked. */

    newState: function (span) {
      var top = String(span) === '20' ? 20 : GEO.SPAN_TOP;
      return {
        lo: 0, hi: top, top: top,
        n: null,                 /* the number that arrived */
        phase: 'empty',          /* empty | post | place | shown */
        post: null,              /* 0 | 1 | 2 */
        guess: null,
        depth: 0,
        trace: [0, 0, 0]         /* ⚠ counts per POST. Never distances. */
      };
    },

    _st: function (st) { return st || this.st; },

    /* the three posts, at the two ends and the middle — at EVERY depth,
       which is the whole point */
    postValue: function (st, i) {
      var s = this._st(st);
      return s.lo + (s.hi - s.lo) * (i / (GEO.POSTS - 1));
    },

    /* which post a value is truly nearest to. ⚠ Ties go to the middle,
       stated rather than left to floating point. */
    nearestPost: function (st, v) {
      /* ⚠ THE MIDDLE IS TRIED FIRST, so a tie really does go to it. The
           previous loop initialised best=1 and then overwrote it at i=0,
           so the comment was false: 25 resolved to the LOW post and 75 to
           the middle — the two quarter points, which are exactly the hard
           cases this tool deals most often, resolving asymmetrically. */
      var s = this._st(st), i, best = 1, bd = Infinity;
      var order = [1, 0, 2];
      for (i = 0; i < order.length; i++) {
        var d = Math.abs(v - this.postValue(s, order[i]));
        if (d < bd - 1e-9) { bd = d; best = order[i]; }
      }
      return best;
    },

    /* a value's position along the strip, 0..1 */
    frac: function (st, v) {
      var s = this._st(st);
      return (v - s.lo) / (s.hi - s.lo);
    },

    /* ---- the moves ------------------------------------------------ */

    /* a number arrives. ⚠ It is drawn from the CURRENT span, so after a
       re-rule the numbers that arrive live inside the ten. */
    arrive: function (st, v) {
      var s = this._st(st);
      if (s.phase !== 'empty' && s.phase !== 'shown') return null;
      if (v < s.lo || v > s.hi) return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: v, phase: 'post',
        post: null, guess: null, depth: s.depth, trace: s.trace.slice()
      };
    },

    /* the DECISION: which post is it nearest to. This is a
       gate-CONDITION and not a trigger — the child must judge the
       number against three fixed landmarks before the strip will let
       them place anything at all. */
    choosePost: function (st, i) {
      var s = this._st(st);
      if (s.phase !== 'post') return null;
      if (!(i >= 0 && i < GEO.POSTS)) return null;
      var tr = s.trace.slice();
      tr[i] = tr[i] + 1;
      /* ⚠ P14: the trace is capped, because a long enough series is a
         trend even when every single entry is innocent. */
      var total = tr[0] + tr[1] + tr[2];
      if (total > GEO.TRACE_MAX) {
        /* ⚠ TAKE FROM THE LARGEST, never from the first. Subtracting
           from tr[0] first emptied the LEFT column: measured, 26 even
           choices (9/9/8) read [3, 9, 8] — a 3x understatement always on
           the same column, and that column is the low-number end. Taking
           from whichever is currently largest keeps the SHAPE, which is
           the only thing this trace is for. */
        var over = total - GEO.TRACE_MAX;
        while (over > 0) {
          var big = 0, k;
          for (k = 1; k < GEO.POSTS; k++) if (tr[k] > tr[big]) big = k;
          if (tr[big] <= 0) break;
          tr[big] -= 1; over -= 1;
        }
      }
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'place',
        post: i, guess: this.postValue(s, i), depth: s.depth, trace: tr
      };
    },

    /* move the plaque along the strip. Rounded to STEP_TOP at the top
       depth and to a tenth of that inside a ten, so the resolution
       always matches what the strip can actually draw. */
    step: function (st) {
      var s = this._st(st);
      return (s.hi - s.lo) <= GEO.DECADE ? GEO.STEP_TOP / GEO.DECADE : GEO.STEP_TOP;
    },

    nudge: function (st, units) {
      var s = this._st(st);
      if (s.phase !== 'place') return null;
      var v = s.guess + units * this.step(s);
      v = Math.round(v / this.step(s)) * this.step(s);
      if (v < s.lo || v > s.hi) return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'place',
        post: s.post, guess: v, depth: s.depth, trace: s.trace.slice()
      };
    },

    /* put it down anywhere on the strip, by fraction of the strip's
       width — the pointer path. Same rounding as the nudge. */
    aim: function (st, f) {
      var s = this._st(st);
      if (s.phase !== 'place') return null;
      if (!(f >= 0 && f <= 1)) return null;
      var stp = this.step(s);
      var v = Math.round((s.lo + f * (s.hi - s.lo)) / stp) * stp;
      if (v < s.lo || v > s.hi) return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'place',
        post: s.post, guess: v, depth: s.depth, trace: s.trace.slice()
      };
    },

    commit: function (st) {
      var s = this._st(st);
      if (s.phase !== 'place') return null;
      return {
        lo: s.lo, hi: s.hi, top: s.top, n: s.n, phase: 'shown',
        post: s.post, guess: s.guess, depth: s.depth, trace: s.trace.slice()
      };
    },

    /* ⭐ THE RE-RULE. The strip becomes the ten the number lives in, and
       the same three posts come back. Only after the truth is shown, so
       the class has something to carry inward. */
    rerule: function (st) {
      var s = this._st(st);
      if (s.phase !== 'shown') return null;
      if (s.depth >= GEO.DEPTH_MAX - 1) return null;
      if ((s.hi - s.lo) <= GEO.DECADE) return null;
      var lo = Math.floor(s.n / GEO.DECADE) * GEO.DECADE;
      /* ⭐⭐ THE QUESTION RECURS. The re-rule returns to the POST phase
         with the post and the guess cleared, so the class answers the
         same three-post question at the new depth — nearer 80, nearer 85
         or nearer 90. That IS the invention; carrying the old guess
         forward would have left it OUTSIDE the new strip (measured: a
         guess of 60 inside an 80-90 strip put the plaque at -200%, off
         screen), which is how reading the render found this. */
      return {
        lo: lo, hi: lo + GEO.DECADE, top: s.top, n: s.n, phase: 'post',
        post: null, guess: null, depth: s.depth + 1, trace: s.trace.slice()
      };
    },

    back: function (st) {
      var s = this._st(st);
      if (s.depth <= 0) return null;
      /* ⚠⚠ PHASE 'post', NOT 'shown'. Guarding only on depth let
         commit -> rerule -> back resurrect the 'shown' phase with post
         and guess both null: the truth wedge drawn while nobody had
         committed to anything, in TWO presses. The docblock claimed that
         state was unreachable and it was not. Coming back out asks the
         question again, exactly as going in does. */
      return {
        lo: 0, hi: s.top, top: s.top, n: s.n, phase: 'post',
        post: null, guess: null, depth: 0, trace: s.trace.slice()
      };
    },

    /* ================= life cycle =================================== */

    init: function (api) {
      this.api = api;
      document.body.classList.add('lds-wide');
      /* ⚠⚠ THE SCROLL ESCAPE. The shell pins overflow:hidden on BOTH
         html and body, so standalone on a phone there is no iframe to
         grow into and a control row can end up physically unreachable.
         ⚠ `html,body.x{...}` is a selector LIST whose html half applies
         unconditionally, which makes the class decorative and its
         mutation unkillable — hence two adds and one rule per element. */
      document.documentElement.classList.add('lds-scroll');
      document.body.classList.add('lds-scroll');

      this._lastSound = 0;
      this._seed = 1;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.span);
      this._deal();
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () {
      this.st = this.newState(this.api.settings.span);
      this._deal();
      this.render();
    },

    onSettings: function () { this.reset(); },

    /* ⚠ NOT Math.random: a deterministic walk means the gate and the
       render probe see the same numbers the classroom does, and a
       screenshot is reproducible. */
    _rand: function (n) {
      this._seed = (this._seed * 1103515245 + 12345) & 0x7fffffff;
      return this._seed % n;
    },

    /* deal a number worth asking about. ⭐ The hard cases are 25 and 75
       — variance is smallest at 0, 50 and 100 and greatest at the
       quarter points — so the deal leans on the quarters rather than
       spreading flat, which would waste most rounds on the easy band. */
    _deal: function () {
      var s = this.st, span = s.hi - s.lo, v;
      if (span <= GEO.DECADE) {
        v = s.lo + 1 + this._rand(GEO.DECADE - 1);
      } else {
        var quarter = this._rand(3) < 2;
        if (quarter) {
          var mid = s.lo + span * (this._rand(2) ? 0.25 : 0.75);
          v = Math.round(mid + (this._rand(2 * span / 10 + 1) - span / 10));
        } else {
          v = s.lo + 1 + this._rand(span - 1);
        }
        v = Math.max(s.lo + 1, Math.min(s.hi - 1, v));
      }
      var next = this.arrive(s, v);
      if (next) this.st = next;
    },

    _dur: function (ms) {
      if (!this._reduced) return ms;
      return Math.max(GEO.RM_FLOOR, Math.round(ms * GEO.RM_F));
    },

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

    _num: function (v) {
      return (Math.round(v * 10) / 10).toString();
    },

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      if (this._wrap && this._wrap.parentNode) return;

      var wrap = api.el('div', 'lds-wrap');
      this._wrap = wrap;
      var card = api.el('div', 'lds-card');

      /* the parent strip, drawn identically at a tenth the height —
         ⭐ a PICTURE of self-similarity rather than a claim about it,
         and it doubles as the way back out */
      this._mini = api.el('div', 'lds-mini');
      card.appendChild(this._mini);

      var arena = api.el('div', 'lds-arena');
      this._arena = arena;

      this._plaque = api.el('button', 'lds-plaque');
      this._plaque.type = 'button';
      arena.appendChild(this._plaque);

      var strip = api.el('div', 'lds-strip');
      strip.setAttribute('role', 'img');
      this._strip = strip;
      strip.appendChild(api.el('div', 'lds-wall lds-wall-a'));
      strip.appendChild(api.el('div', 'lds-wall lds-wall-b'));
      /* the three posts, and NOTHING else on the strip */
      this._posts = [];
      for (var i = 0; i < GEO.POSTS; i++) {
        var p = api.el('div', 'lds-post');
        p.style.left = (i / (GEO.POSTS - 1) * 100) + '%';
        strip.appendChild(p);
        this._posts.push(p);
      }
      this._wedge = api.el('div', 'lds-wedge');
      arena.appendChild(strip);
      arena.appendChild(this._wedge);

      this._ends = [api.el('div', 'lds-end lds-end-a'), api.el('div', 'lds-end lds-end-b')];
      arena.appendChild(this._ends[0]);
      arena.appendChild(this._ends[1]);

      /* tap anywhere on the strip — with real buttons under it so the
         same act is reachable by keyboard and by assistive tech */
      strip.addEventListener('pointerdown', function (e) {
        var r = strip.getBoundingClientRect();
        if (!r.width) return;
        self._move(self.aim(null, (e.clientX - r.left) / r.width), GEO.SND_PLACE);
      });

      card.appendChild(arena);

      /* the trace: three columns, one per post. Counts only. */
      this._trace = api.el('div', 'lds-trace');
      this._traceCols = [];
      for (var k = 0; k < GEO.POSTS; k++) {
        var col = api.el('div', 'lds-tcol');
        var fill = api.el('div', 'lds-tfill');
        col.appendChild(fill);
        this._trace.appendChild(col);
        this._traceCols.push(fill);
      }
      card.appendChild(this._trace);

      var bar = api.el('div', 'lds-bar');
      this._btn = {};
      this._btn.p0 = this._mk(bar, 'lds-b-p0 lds-b-post', '', 'postLow');
      this._btn.p1 = this._mk(bar, 'lds-b-p1 lds-b-post', '', 'postMid');
      this._btn.p2 = this._mk(bar, 'lds-b-p2 lds-b-post', '', 'postHigh');
      this._btn.l10 = this._mk(bar, 'lds-b-l10', '«', 'less10');
      this._btn.l1 = this._mk(bar, 'lds-b-l1', '‹', 'less1');
      this._btn.r1 = this._mk(bar, 'lds-b-r1', '›', 'more1');
      this._btn.r10 = this._mk(bar, 'lds-b-r10', '»', 'more10');
      this._btn.place = this._mk(bar, 'lds-b-place', '▼', 'place');
      this._btn.rerule = this._mk(bar, 'lds-b-rerule', '⌗', 'rerule');
      this._btn.back = this._mk(bar, 'lds-b-back', '↰', 'back');
      this._btn.next = this._mk(bar, 'lds-b-next', '↻', 'next');
      this._btn.print = this._mk(bar, 'lds-b-print', '⎙', 'printBtn');

      /* each post button draws the strip in miniature with ITS post
         filled — no words, and the child can see which one is which */
      [0, 1, 2].forEach(function (i) {
        var b = self._btn['p' + i];
        var mini = api.el('span', 'lds-pmini');
        var dot = api.el('span', 'lds-pdot');
        dot.style.left = (i / (GEO.POSTS - 1) * 100) + '%';
        mini.appendChild(dot);
        b.appendChild(mini);
        b.addEventListener('click', function () { self._move(self.choosePost(null, i), GEO.SND_POST); });
      });
      this._btn.l10.addEventListener('click', function () { self._move(self.nudge(null, -GEO.NUDGE_BIG), GEO.SND_PLACE, 0, 'low'); });
      this._btn.l1.addEventListener('click', function () { self._move(self.nudge(null, -GEO.NUDGE_SMALL), GEO.SND_PLACE, 0, 'low'); });
      this._btn.r1.addEventListener('click', function () { self._move(self.nudge(null, GEO.NUDGE_SMALL), GEO.SND_PLACE, 0, 'high'); });
      this._btn.r10.addEventListener('click', function () { self._move(self.nudge(null, GEO.NUDGE_BIG), GEO.SND_PLACE, 0, 'high'); });
      this._btn.place.addEventListener('click', function () { self._commit(); });
      this._btn.rerule.addEventListener('click', function () { self._move(self.rerule(null), GEO.SND_RERULE, GEO.T_RERULE, 'rerule'); });
      this._btn.back.addEventListener('click', function () { self._move(self.back(null), GEO.SND_RERULE, GEO.T_RERULE, 'back'); });
      this._btn.next.addEventListener('click', function () { self._next(); });
      this._btn.print.addEventListener('click', function () { self._print(); });
      this._plaque.addEventListener('click', function () { if (self.st.phase === 'place') self._commit(); });

      wrap.appendChild(card);
      wrap.appendChild(bar);
      this._bar = bar;
      this._sheet = api.el('div', 'lds-sheet');
      wrap.appendChild(this._sheet);
      api.stage.appendChild(wrap);
    },

    _mk: function (parent, cls, glyph, key) {
      var b = this.api.el('button', 'lds-btn ' + cls);
      b.type = 'button';
      if (glyph) b.textContent = glyph;
      b.setAttribute('aria-label', this.api.t(key));
      b.title = this.api.t(key);
      parent.appendChild(b);
      return b;
    },

    /* ⚠ `why` is passed EXPLICITLY. Deriving the announcement from the
       phase alone made `saidRerule` unreachable — the re-rule leaves the
       tool in the 'post' phase, so it announced 'which post is it nearest
       to?' and the one sentence describing the invention (the span has
       changed and the three posts are back) was never spoken on any path.
       That is the dead-string class, and a source scan cannot see it. */
    _move: function (next, snd, dur, why) {
      if (!next) { this._refuse(why); return; }
      this.st = next;
      this._paint(dur);
      this._snd(snd);
      this._say(why);
    },

    _commit: function () {
      var api = this.api, self = this;
      var next = this.commit(null);
      if (!next) { this._refuse(); return; }
      var guess = this.st.guess;
      this.st = next;
      this._paint();
      this._snd(GEO.SND_PLACE);
      /* ⭐ THE BEAT, and it does NOT go through _dur(): the class has to
         commit out loud before the strip answers, and a wait is not
         movement. ⚠ And the reveal that follows is ONE duration for
         every guess — a reveal that took longer for a worse guess would
         put the verdict in the time channel, where no colour, shape or
         contrast audit could ever see it. */
      this._wedge.classList.remove('is-on');
      window.setTimeout(function () {
        self._wedge.classList.add('is-on');
        self._snd(GEO.SND_REVEAL, true);
        api.announce(self._fmt(api.t('saidTruth'), { t: self._num(self.st.n), n: self._num(guess) }));
      }, GEO.T_BEAT);
    },

    _next: function () {
      var s = this.st;
      this.st = {
        lo: s.lo, hi: s.hi, top: s.top, n: null, phase: 'empty',
        post: null, guess: null, depth: s.depth, trace: s.trace.slice()
      };
      this._deal();
      this._wedge.classList.remove('is-on');
      this._paint(GEO.T_ARRIVE);
      this._snd(GEO.SND_POST);
      this._say();
    },

    _refuse: function (why) {
      var api = this.api, self = this, a = this._arena;
      this._snd(GEO.SND_REFUSE);
      if (a) {
        a.classList.add('is-refuse');
        window.setTimeout(function () { a.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      /* ⚠ NAME THE END THAT WAS ACTUALLY HIT. It always announced the
         HIGH end, so nudging past the LOW end said 'does not go past 100'.
         And the buttons are never  — only dimmed — so a mis-tap
         on a greyed control announced the same irrelevant sentence. */
      var s = this.st;
      /* ⚠ ONLY for a refused RE-RULE. Gating this on 'we are inside a
         ten' made EVERY refusal there — including a nudge at the end —
         announce 'this is already one ten', which is irrelevant, and it
         left saidEnd dead in eleven locales. The smoke gate's
         reachability check found it; no model assertion could. */
      if (why === 'rerule') { api.announce(api.t('saidNoRerule')); return; }
      if (why === 'low') { api.announce(this._fmt(api.t('saidEnd'), { n: this._num(s.lo) })); return; }
      if (why === 'high') { api.announce(this._fmt(api.t('saidEnd'), { n: this._num(s.hi) })); return; }
      api.announce(this._fmt(api.t('saidArrive'), { n: this._num(s.n) }));
    },

    _say: function (why) {
      var api = this.api, s = this.st;
      if (why === 'rerule') { api.announce(this._fmt(api.t('saidRerule'), { a: this._num(s.lo), b: this._num(s.hi) })); return; }
      if (why === 'back') { api.announce(this._fmt(api.t('saidBack'), { a: this._num(s.lo), b: this._num(s.hi) })); return; }
      if (s.phase === 'post') { api.announce(this._fmt(api.t('saidArrive'), { n: this._num(s.n) })); return; }
      if (s.phase === 'place' && s.guess === this.postValue(s, s.post)) {
        api.announce(this._fmt(api.t('saidPost'), { p: this._num(this.postValue(s, s.post)) }));
        return;
      }
      if (s.phase === 'place') { api.announce(this._fmt(api.t('saidMoved'), { n: this._num(s.guess) })); return; }
      if (s.depth > 0) { api.announce(this._fmt(api.t('saidRerule'), { a: this._num(s.lo), b: this._num(s.hi) })); return; }
      api.announce(this._fmt(api.t('saidBack'), { a: this._num(s.lo), b: this._num(s.hi) }));
    },

    /* ---- painting -------------------------------------------------- */

    _paint: function (dur) {
      var api = this.api, s = this.st, i;
      var d = this._dur(dur || GEO.T_COMMIT);

      this._strip.setAttribute('aria-label', api.t('ariaStrip'));
      this._ends[0].textContent = this._num(s.lo);
      this._ends[1].textContent = this._num(s.hi);

      /* the plaque: hollow while it is only a guess */
      var showPlaque = s.n != null;
      this._plaque.style.display = showPlaque ? '' : 'none';
      if (showPlaque) {
        this._plaque.textContent = this._num(s.n);
        var at = s.guess == null ? 0.5 : this.frac(s, s.guess);
        this._plaque.style.transitionDuration = d + 'ms';
        this._plaque.style.left = (at * 100) + '%';
        this._plaque.classList.toggle('is-free', s.phase === 'post');
        this._plaque.setAttribute('aria-label',
          this._fmt(api.t('ariaPlaque'), { n: this._num(s.guess == null ? s.n : s.guess) }));
      }

      /* the truth: a SOLID wedge BELOW the strip. ⚠ Side and fill carry
         the difference, never hue — `#A34122` and `#146B5E` differ by
         1.01:1 and are metamers in greyscale, so a design that told
         guess from truth by colour would be invisible in monochrome
         while passing every per-mark contrast check. */
      var shown = s.phase === 'shown';
      this._wedge.style.display = shown ? '' : 'none';
      if (shown) {
        this._wedge.style.transitionDuration = this._dur(GEO.T_REVEAL) + 'ms';
        this._wedge.style.left = (this.frac(s, s.n) * 100) + '%';
        this._wedge.setAttribute('aria-label', api.t('ariaTruth'));
      }

      /* the trace — counts per post, and nothing else */
      var total = Math.max(1, s.trace[0] + s.trace[1] + s.trace[2]);
      this._trace.setAttribute('aria-label', api.t('ariaTrace'));
      for (i = 0; i < GEO.POSTS; i++) {
        this._traceCols[i].style.height = (s.trace[i] / total * 100) + '%';
        this._traceCols[i].classList.toggle('is-some', s.trace[i] > 0);
      }

      /* the parent strip in miniature, only when we are inside a ten */
      this._mini.classList.toggle('is-on', s.depth > 0);
      if (s.depth > 0) {
        this._mini.textContent = '';
        var band = api.el('span', 'lds-mband');
        band.style.left = (s.lo / s.top * 100) + '%';
        band.style.width = ((s.hi - s.lo) / s.top * 100) + '%';
        this._mini.appendChild(band);
      }

      for (i = 0; i < GEO.POSTS; i++) {
        this._btn['p' + i].classList.toggle('is-on', s.post === i);
        this._btn['p' + i].classList.toggle('is-off', s.phase !== 'post');
        this._btn['p' + i].setAttribute('aria-pressed', s.post === i ? 'true' : 'false');
      }
      this._btn.l10.classList.toggle('is-off', !this.nudge(null, -GEO.NUDGE_BIG));
      this._btn.l1.classList.toggle('is-off', !this.nudge(null, -GEO.NUDGE_SMALL));
      this._btn.r1.classList.toggle('is-off', !this.nudge(null, GEO.NUDGE_SMALL));
      this._btn.r10.classList.toggle('is-off', !this.nudge(null, GEO.NUDGE_BIG));
      this._btn.place.classList.toggle('is-off', s.phase !== 'place');
      this._btn.rerule.classList.toggle('is-off', !this.rerule(null));
      this._btn.back.classList.toggle('is-off', !this.back(null));
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
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            self.premium = tier !== 'free';
            if (self._wrap) self._paint();
          })['catch'](function () {});
      } catch (e) { /* ⚠ degrade to the FREE TIER, never to nothing —
                       the whole apparatus is free anyway. */ }
    },

    _gate: function () {
      var api = this.api, self = this;
      if (this._gateEl && this._gateEl.parentNode) return;
      var g = api.el('div', 'lds-gate is-on');
      var box = api.el('div', 'lds-gate-box');
      var h = api.el('h2', 'lds-gate-h'); h.textContent = api.t('gateTitle');
      var p = api.el('p', 'lds-gate-p'); p.textContent = api.t('gateBody');
      var a = api.el('a', 'lds-gate-cta');
      a.href = '/pricing'; a.textContent = api.t('gateCta');
      var c = api.el('button', 'lds-gate-x');
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

    /* ================= the paper strips ============================= */

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      window.addEventListener('beforeprint', function () {
        if (self.premium) { self._buildSheet(); document.body.classList.add('lds-printing'); }
      });
      window.addEventListener('afterprint', function () {
        document.body.classList.remove('lds-printing');
      });
    },

    _print: function () {
      if (!this.premium) { this._gate(); return; }
      this._buildSheet();
      document.body.classList.add('lds-printing');
      window.print();
    },

    _buildSheet: function () {
      var api = this.api, i, k;
      var s = this._sheet;
      while (s.firstChild) s.removeChild(s.firstChild);
      var h = api.el('h2', 'lds-sheet-h'); h.textContent = api.t('sheetTitle');
      var n = api.el('p', 'lds-sheet-note'); n.textContent = api.t('sheetNote');
      s.appendChild(h); s.appendChild(n);
      for (i = 0; i < 4; i++) {
        var row = api.el('div', 'lds-p-strip');
        for (k = 0; k < GEO.POSTS; k++) {
          var post = api.el('span', 'lds-p-post');
          post.style.left = (k / (GEO.POSTS - 1) * 100) + '%';
          row.appendChild(post);
        }
        s.appendChild(row);
      }
    }
  };

  function injectCSS() {
    var css = ''
      + 'html.lds-scroll{overflow-y:auto;}'
      + 'body.lds-scroll{overflow-y:auto;}'

      + '.lds-wrap{position:relative;display:flex;flex-direction:column;align-items:center;width:100%;}'
      + '.lds-card{container-type:inline-size;width:100%;max-width:860px;box-sizing:border-box;'
      + 'background-color:#F6EAD3;border:1.5px solid #E7DCC8;border-radius:18px;'
      + 'padding:clamp(14px,3cqw,30px);--lds-h:clamp(30px,7cqw,58px);}'

      /* the parent strip, drawn identically at a tenth the height */
      + '.lds-mini{position:relative;height:10px;margin:0 0 10px;border-radius:3px;'
      + 'background-color:#EFE2C9;visibility:hidden;}'
      + '.lds-mini.is-on{visibility:visible;}'
      + '.lds-mband{position:absolute;top:0;bottom:0;background-color:#146B5E;border-radius:3px;}'

      + '.lds-arena{position:relative;padding:calc(var(--lds-h) * 1.5) 0 calc(var(--lds-h) * 1.3);}'
      + '.lds-arena.is-refuse .lds-strip{border-color:#A34122;}'

      /* ⚠ NO TICKS. A ticked strip would carry different furniture after
         the re-rule, which is the opposite of self-similarity. */
      /* ⚠⚠ THE WALLS ARE CHILDREN, NOT BORDERS. A thick left/right
         border shrinks the strip's CONTENT box, so a post at `left:0%`
         lands inside the wall while the plaque and the wedge — which are
         positioned against the ARENA — do not. That is two expressions
         that were never meant to agree, and it measured as a 2.3% drift
         at 360px: #43's two-circles defect in a new dress. One
         coordinate space for every mark. */
      + '.lds-strip{position:relative;height:var(--lds-h);border-radius:6px;'
      /* ⚠ AN INSET SHADOW, NOT A BORDER. Even a 2px border shrinks the
         content box, so a post at left:0% sits 2px inside where the
         plaque at left:0% sits. Two numbers agreeing to within a
         tolerance is a coincidence waiting to end (#43); an inset
         shadow makes the content box and the border box IDENTICAL, so
         every mark on this apparatus shares one coordinate space
         exactly rather than approximately. */
      + 'box-shadow:inset 0 0 0 2px #146B5E;'
      + 'background-color:#FBF3E4;}'
      + '.lds-wall{position:absolute;top:0;bottom:0;width:7px;'
      + 'background-color:#0D4E44;border-radius:3px;}'
      + '.lds-wall-a{left:0;}'
      + '.lds-wall-b{right:0;}'
      + '.lds-post{position:absolute;top:12%;bottom:12%;width:3px;margin-left:-1.5px;'
      + 'background-color:#146B5E;border-radius:2px;}'

      /* ⚠ BELOW the wedge's row, not in it. The wedge for a number at an
         END of the strip lands exactly where that end's numeral sits, and
         the two drew on top of each other — a truth mark hidden behind a
         label. Found by reading the render; no per-box gate can see a
         COLLISION between two boxes that each pass on their own. */
      + '.lds-end{position:absolute;bottom:0;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;color:#0E5147;'
      + 'font-size:calc(var(--lds-h) * .46);line-height:1;}'
      + '.lds-end-a{left:0;}'
      + '.lds-end-b{right:0;}'

      /* the class's guess: HOLLOW plaque ABOVE the strip */
      + '.lds-plaque{position:absolute;top:calc(var(--lds-h) * .10);transform:translateX(-50%);'
      + 'min-width:calc(var(--lds-h) * 1.25);min-height:44px;padding:2px 8px;'
      + 'border:2.5px solid #146B5E;border-radius:10px;background-color:#FBF3E4;color:#0E5147;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
      + 'font-size:calc(var(--lds-h) * .52);line-height:1.1;cursor:pointer;'
      + 'transition-property:left;transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.lds-plaque::after{content:"";position:absolute;left:50%;top:100%;transform:translateX(-50%);'
      + 'border-left:7px solid transparent;border-right:7px solid transparent;'
      + 'border-top:9px solid #146B5E;}'
      + '.lds-plaque.is-free{border-style:dashed;}'
      + '.lds-plaque:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'

      /* the truth: a SOLID wedge BELOW the strip. Side + fill, never hue. */
      + '.lds-wedge{position:absolute;left:50%;bottom:calc(var(--lds-h) * .34);'
      + 'transform:translateX(-50%);width:0;height:0;opacity:0;'
      + 'border-left:11px solid transparent;border-right:11px solid transparent;'
      + 'border-bottom:15px solid #0D4E44;'
      + 'transition-property:left,opacity;transition-timing-function:cubic-bezier(.34,.06,.2,1);}'
      + '.lds-wedge.is-on{opacity:1;}'

      /* the trace: three columns, counts only — no distance, no rank */
      + '.lds-trace{display:flex;align-items:flex-end;justify-content:space-between;'
      + 'height:34px;margin-top:10px;padding:0 2px;}'
      + '.lds-tcol{position:relative;width:22%;height:100%;display:flex;align-items:flex-end;}'
      + '.lds-tfill{width:100%;background-color:#E7DCC8;border-radius:3px 3px 0 0;}'
      /* ⚠ a zero column draws NOTHING. With a min-height and a border it
         drew three little rules under the strip that read as broken
         furniture rather than as a tally of nothing. */
      + '.lds-tfill.is-some{min-height:3px;border-bottom:2px solid #146B5E;}'

      + '.lds-bar{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;'
      + 'gap:8px;margin-top:12px;}'
      + '.lds-btn{display:inline-flex;align-items:center;justify-content:center;'
      + 'min-width:52px;height:48px;padding:0 10px;border-radius:12px;'
      + 'border:1.5px solid #146B5E;background-color:#FBF3E4;color:#146B5E;cursor:pointer;'
      + 'font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;font-weight:600;line-height:1;}'
      + '.lds-btn:focus-visible{outline:3px solid #1E8FD4;outline-offset:2px;}'
      + '.lds-btn.is-off{opacity:.42;}'
      + '.lds-b-post{min-width:64px;}'
      + '.lds-b-post.is-on{background-color:#146B5E;}'
      + '.lds-b-post.is-on .lds-pmini{background-color:#FBF3E4;}'
      + '.lds-pmini{position:relative;display:block;width:44px;height:9px;border-radius:3px;'
      + 'background-color:#E7DCC8;border:1px solid #146B5E;}'
      + '.lds-pdot{position:absolute;top:-3px;bottom:-3px;width:5px;margin-left:-2.5px;'
      + 'background-color:#F2784B;border:1px solid #A34122;border-radius:2px;}'
      + '.lds-b-print{border-style:dashed;margin-left:10px;}'
      + '.lds-b-print.is-paid{border-style:solid;}'

      + '.lds-gate{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;'
      + 'background-color:rgba(42,42,53,.42);border-radius:18px;padding:12px;z-index:9;}'
      + '.lds-gate-box{background-color:#FBF3E4;border:1.5px solid #146B5E;border-radius:16px;'
      + 'padding:16px;max-width:340px;text-align:center;}'
      + '.lds-gate-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19px;color:#146B5E;margin:0 0 6px;}'
      + '.lds-gate-p{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#2A2A35;margin:0 0 12px;line-height:1.45;}'
      + '.lds-gate-cta{display:inline-block;background-color:#146B5E;color:#FBF3E4;text-decoration:none;'
      + 'padding:10px 16px;border-radius:10px;font-family:Nunito,system-ui,sans-serif;font-weight:700;'
      + 'min-height:44px;box-sizing:border-box;}'
      + '.lds-gate-x{display:block;margin:10px auto 0;background-color:transparent;border:0;color:#146B5E;'
      + 'font-family:Nunito,system-ui,sans-serif;font-size:14px;cursor:pointer;min-height:44px;}'

      + '.lds-sheet{display:none;}'
      /* ⚠ SCOPED to a class the sheet itself adds — an unscoped
         @media print block prints a BLANK PAGE for everybody who
         presses Ctrl+P. */
      + '@media print{'
      + 'body.lds-printing *{visibility:hidden;}'
      + 'body.lds-printing .lds-sheet,body.lds-printing .lds-sheet *{visibility:visible;}'
      + 'body.lds-printing .lds-wrap>.lds-card,body.lds-printing .lds-bar{display:none !important;}'
      + 'body.lds-printing .lds-sheet{display:block !important;position:static;width:100%;margin:0;padding:0;}'
      + '.lds-sheet-h{margin:0 0 2mm;font-family:"Baloo 2",system-ui,sans-serif;font-size:16pt;color:#000;}'
      + '.lds-sheet-note{margin:0 0 6mm;font-family:Nunito,system-ui,sans-serif;font-size:9pt;color:#000;}'
      + '.lds-p-strip{position:relative;height:14mm;width:170mm;margin:0 0 10mm;'
      + 'border:1pt solid #000;border-left-width:3pt;border-right-width:3pt;}'
      + '.lds-p-post{position:absolute;top:2mm;bottom:2mm;width:1pt;margin-left:-0.5pt;background-color:#000;}'
      + '@page{margin:15mm;}'
      + '}';
    var s = document.createElement('style');
    s.setAttribute('data-lds', '1');
    s.appendChild(document.createTextNode(css));
    document.head.appendChild(s);
  }
  if (typeof document !== 'undefined' && document.head) injectCSS();

  if (typeof window !== 'undefined') window.LandingStrip = LandingStrip;
  if (typeof module !== 'undefined' && module.exports) module.exports = LandingStrip;
}());
