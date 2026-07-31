/* =====================================================================
   TOOL #39 — THE LIDS   (lids.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v4 catalog, build #4. Catalog slot A2, and the last
   of wave 1.

   THE TABLE · THE LIDS · THE TOTAL. Three named parts, and nothing else
   in this tool gets a noun.

   THE ROUTINE, which is what makes this an instrument and not a game:
     "Put two lids down. How many under each?"
      ... and then the move that matters:
     "Now put a third one down."

   THE ONE THESIS — ONE UNKNOWN REPEATED IS NOT THE SAME PROBLEM AS ONE
   UNKNOWN. With a single lid the answer is a subtraction any child in
   the room can already do. With three lids that must all hide the SAME
   amount, the total has to be shared out — and a total that will not
   share leaves its remainder sitting in plain sight on the table.

   THREE INVENTIONS:
     1. ⭐ THE VALUE LOCK. Every lid of a colour hides the same number,
        and that is enforced by MOTION, not by arithmetic: drop another
        lid and the counters re-settle underneath all of them until the
        shares are equal again. `total = visible + k*x` becomes a thing
        the table does, not a sentence anyone says.
     2. THE LIDS ARE DRAGGED, AND THEY LAND ANYWHERE. Every other cover
        on this platform is a chip you toggle. A lid you carry and put
        down is a lid whose position is yours, so the re-settle is
        something the class watches happen TO their arrangement.
     3. THE REMAINDER IS HONEST. When the total will not share, what is
        left over does not hide and is not apologised for — it stays on
        the table and is the most interesting thing on it.

   ⚠ THE FENCE — FOUR SURFACES, and it CHANGED THIS TOOL. The catalog
   entry claimed three things; two of them were already owned, so they
   are subtracted here rather than negotiated, and this file is built on
   the remainder.
   DEAD — "the covered objects genuinely leave the DOM". That is written
   house doctrine twice over: `number-balance.js:437-439` ("A COVERED PAN
   LEAVES THE DOM ENTIRELY — not hidden with CSS") and
   `part-whole-frame.js:517-520` ("a hidden count is still a count to
   anything that reads the tree"). This file honours it and never sells
   it. It is table stakes.
   DEAD — "cover part of a known total and ask what is under it".
   `part-whole-frame` ships THREE independent cloths over whole/a/b in
   its FREE tier (:257, :378, :533-576). `number-balance` has a cloth
   over a pan and the string "What must be under the cloth to make it
   level?" (:109). `rekenrek` owns "How many are hiding?" BY NAME (:24)
   and has it as authored content — `rekenrek-seqs.json:594-612`, round
   `q_hiding`. `number-talk-easel` owns flash-hide-reveal over
   "scattered identical objects (6-12)" (:27), which is this exact
   canvas. And the missing-addend cognition has THREE engines at
   1.OA.D.8 alone (`missing-part-core`, `make-fair-core`, `match-pairs`),
   plus `number-bond-core` at K.OA.A.4 and printable `G1-115`.
   ALIVE, and uncontested on all four surfaces — THE VALUE LOCK. Nothing
   on this platform drags a cover; nothing stores free 2-D positions
   (`letter-tiles` is 1-D-per-row); and nothing anywhere has two peer
   objects that renegotiate to a shared value. The lock is the tool.

   REFUSES, FOREVER — each one gated:
     1. NO SINGLE-LID-ONLY MODE. One lid over a known total IS the tool
        that part-whole-frame, number-balance and rekenrek already are.
        The second lid is not a feature here, it is the subject.
     2. NO "HOW MANY ARE HIDING" PHRASING, in any of eleven locales.
        rekenrek owns that sentence and ships it as content.
     3. NO VERDICT ON THE GUESS. The committed marker is never marked,
        coloured, scored, ranked or compared by the tool.
     4. NO SCORE, TIMER, STREAK, TICK, CROSS or "correct".
     5. NEVER THE BRAND WORD. Splat! is a living author's routine; this
        is a different name and a deliberately different geometry —
        circular lids, not irregular ink. ⚠ The gate's ban on it is
        word-boundary anchored, because the corpus already contains the
        Dutch `Koekjesplaten` (baking trays) and a bare substring ban
        would reject correct Dutch — the recorded `par`-rejects-French
        defect in a third dress.
     6. NO SPEECH. LCSAudio silently substitutes a missing voice and TTS
        is reliable in only 5 of 11 locales.

   ⚠ WHAT "UNREACHABLE" MEANS HERE, AND HOW IT DIFFERS FROM #38. In the
   Draw Bag the composition was genuinely unknowable before the reveal.
   Here `x` is DETERMINED by the total and the lid count, both of which
   are on screen — and that is the point: the class can work it out.
   Unreachability therefore means the tool never RENDERS x, and the
   covered counters are absent from the DOM so they cannot be counted
   one by one. The arithmetic is the child's; the tool just refuses to
   do it for them.
   ===================================================================== */

var Lids = {
  id: 'lids',

  /* ---------------------------------------------------------------
     STRINGS — GENERATED. EN is authored; the other ten were REBUILT (not
     translated) by a three-person NATIVE panel per locale, §A.13.48.
     ⚠ DO NOT HAND-EDIT A LOCALE HERE. The source of truth is
     scripts/_lids-strings.js; scripts/apply-lids-locales.js rewrites
     this whole block from it.

     ⭐ FOUR PANELS REJECTED THE OBVIOUS WORD, and every one was a
     collision no amount of care in English would have caught:
       es  "Las tapas" -> "Las tapaderas"  ("tapas" reads as bar food)
       fr  "la table"  -> "le plateau"     ("table" reads as *table de
           multiplication* — the very concept this tool builds toward,
           so "Autre table" would have read as "another times table")
       nl  "de tafel"  -> "het blad"       (same trap: in groep 3/4 "de
           tafels" ARE the times tables), and the tool renamed to
           "Onder de deksels" — the question, not the object
       pt  rejected "tampinhas" for the counters: a tampinha is a bottle
           cap, itself the classic improvised counter, so it would have
           collided head-on with the tampas covering them
       fi  "Kannet" -> "Kannen alla": bare "Kannet" reads first as book
           COVERS, so the tool is named after the routine instead
     Each locale also chose its own real classroom word for the
     counters: Wendeplättchen · jetons · fichas · gettoni · fiches ·
     brickor · brikker · brikker · laskunapit.
     --------------------------------------------------------------- */
  strings: {
    title:        { en: "The Lids", de: "Die Deckel", fr: "Les couvercles", es: "Las tapaderas", pt: "As tampas", it: "I coperchi", nl: "Onder de deksels", sv: "Locken", da: "Lågene", no: "Lokkene", fi: "Kannen alla" },
    instruction:  { en: "Put down two lids or more. Every lid of the same colour covers the same number of counters — so what one number fits under all of them?", de: "Legt zwei oder mehr Deckel hin. Unter jedem Deckel derselben Farbe liegen gleich viele Wendeplättchen – welche Zahl passt unter alle?", fr: "Posez deux couvercles ou plus : tous les couvercles de la même couleur cachent le même nombre de jetons, alors quel est ce nombre ?", es: "Pongamos dos tapaderas o más. Todas las del mismo color cubren la misma cantidad de fichas: ¿qué número cabe debajo de todas?", pt: "Coloquem duas tampas ou mais. Cada tampa da mesma cor cobre a mesma quantidade de fichas — então, que número cabe embaixo de todas elas?", it: "Metti due coperchi o più: ogni coperchio dello stesso colore copre lo stesso numero di gettoni, e allora quale numero sta sotto tutti quanti?", nl: "Leg twee of meer deksels neer. Onder elk deksel van dezelfde kleur liggen evenveel fiches — welk getal past er dan onder allemaal?", sv: "Lägg ut två lock eller fler. Alla lock i samma färg döljer lika många brickor – vilket tal passar under vart och ett?", da: "Læg to eller flere låg på bordet. Låg i samme farve dækker lige mange brikker – så hvilket tal ligger under dem alle?", no: "Legg to eller flere lokk på bordet. Alle lokk i samme farge dekker like mange brikker – hvilket tall passer under hvert av dem?", fi: "Asettakaa pöydälle vähintään kaksi kantta: samanvärisen kannen alla on aina yhtä monta laskunappia, joten mikä sama luku sopii jokaisen kannen alle?" },

    hintPlace:    { en: "Put down two lids.", de: "Legt zwei Deckel hin.", fr: "Posez deux couvercles.", es: "Pongamos dos tapaderas.", pt: "Coloquem duas tampas.", it: "Metti giù due coperchi.", nl: "Leg twee deksels neer.", sv: "Lägg ut två lock.", da: "Læg to låg på bordet.", no: "Legg to lokk på bordet.", fi: "Asettakaa pöydälle kaksi kantta." },
    hintShare:    { en: "The same number is under each one. Which number?", de: "Unter jedem Deckel liegen gleich viele Plättchen. Wie viele sind es?", fr: "Il y a le même nombre de jetons sous chaque couvercle. Lequel ?", es: "Debajo de cada una hay la misma cantidad. ¿Cuál es ese número?", pt: "Embaixo de cada tampa há a mesma quantidade. Que número será?", it: "Sotto ognuno c'è lo stesso numero. Quale?", nl: "Onder elk deksel liggen er evenveel. Welk getal is dat?", sv: "Det ligger lika många under varje lock. Vilket tal?", da: "Der ligger lige mange under hvert låg. Hvilket tal er det?", no: "Det er like mange under hvert lokk. Hvilket tall er det?", fi: "Jokaisen kannen alla on yhtä monta nappia. Mikä luku se on?" },
    hintMark:     { en: "Park the marker on the number you think it is.", de: "Setzt den Marker auf die Zahl, die ihr vermutet.", fr: "Placez le repère sur le nombre que vous proposez.", es: "Pongamos la marca en el número que creemos que está debajo.", pt: "Coloquem o marcador no número que a turma acha que é.", it: "Metti il segnalino sul numero che secondo voi c'è sotto.", nl: "Zet het pijltje op het getal dat de klas kiest.", sv: "Sätt markören på det tal ni tror det är.", da: "Sæt markøren på det tal, I gætter på.", no: "Sett markøren på det tallet dere tror.", fi: "Siirtäkää merkki sen luvun kohdalle, jonka luokka arvaa." },
    hintLift:     { en: "Lift the lids.", de: "Hebt die Deckel an.", fr: "Soulevez les couvercles.", es: "Levantemos las tapaderas.", pt: "Levantem as tampas.", it: "Ora alza i coperchi.", nl: "Til de deksels op.", sv: "Lyft på locken.", da: "Løft lågene.", no: "Løft lokkene.", fi: "Nyt voitte nostaa kannet." },
    hintLeftover: { en: "Some are left over. They do not fit under a lid.", de: "Einige Plättchen bleiben übrig – sie passen unter keinen Deckel.", fr: "Il reste des jetons : ils ne tiennent sous aucun couvercle.", es: "Sobran algunas fichas: no caben debajo de ninguna tapadera.", pt: "Sobraram algumas fichas. Elas não cabem embaixo de nenhuma tampa.", it: "Alcuni gettoni sono avanzati: non stanno sotto nessun coperchio.", nl: "Er blijven er over. Die passen niet onder een deksel.", sv: "Några blir över. De får inte plats under något lock.", da: "Nogle brikker er til overs. De kan ikke være under et låg.", no: "Noen brikker blir til overs. De får ikke plass under et lokk.", fi: "Osa napeista jäi yli. Ne eivät jakaudu tasan kansien alle." },

    addLid:       { en: "Another lid", de: "Deckel dazu", fr: "Ajouter", es: "Otra tapadera", pt: "Outra tampa", it: "Aggiungi coperchio", nl: "Nog een deksel", sv: "Ett lock till", da: "Et låg mere", no: "Ett lokk til", fi: "Lisää kansi" },
    takeLid:      { en: "Take one away", de: "Deckel weg", fr: "Retirer", es: "Quitar una", pt: "Tirar uma tampa", it: "Togli un coperchio", nl: "Deksel weghalen", sv: "Ta bort ett", da: "Tag et væk", no: "Ta bort ett", fi: "Poista kansi" },
    liftBtn:      { en: "Lift the lids", de: "Deckel anheben", fr: "Soulever", es: "Destapar", pt: "Destampar", it: "Alza i coperchi", nl: "Deksels optillen", sv: "Lyft på locken", da: "Løft lågene", no: "Løft lokkene", fi: "Nosta kannet" },
    againBtn:     { en: "Lids back on", de: "Deckel drauf", fr: "Recouvrir", es: "Volver a tapar", pt: "Tampar de novo", it: "Rimetti i coperchi", nl: "Deksels terug", sv: "Lock på igen", da: "Låg på igen", no: "Legg på lokkene", fi: "Kannet päälle" },
    newSetBtn:    { en: "Another table", de: "Neuer Tisch", fr: "Autre plateau", es: "Otra mesa", pt: "Outra mesa", it: "Un altro tavolo", nl: "Ander blad", sv: "Nytt bord", da: "Nyt bord", no: "Nytt bord", fi: "Vaihda pöytä" },
    printBtn:     { en: "Print the table", de: "Aufgabe drucken", fr: "Imprimer", es: "Imprimir la mesa", pt: "Imprimir a mesa", it: "Stampa il tavolo", nl: "Blad printen", sv: "Skriv ut bordet", da: "Print bordet", no: "Skriv ut bordet", fi: "Tulosta pöytä" },

    gateLine:     { en: "Bigger totals, the table book and printing are part of the Teacher plan.", de: "Größere Anzahlen, das Aufgabenheft und das Drucken gehören zum Lehrer-Paket.", fr: "Les plus grands totaux, le carnet de plateaux et l'impression font partie de l'offre Enseignant.", es: "Los totales más grandes, la colección de mesas y la impresión forman parte del plan Docente.", pt: "Totais maiores, o caderno de mesas prontas e a impressão fazem parte do plano Professor.", it: "I totali più grandi, la raccolta di tavoli e la stampa fanno parte del piano Insegnante.", nl: "Grotere aantallen, alle bladen en printen horen bij het Leerkracht-pakket.", sv: "Större antal, bordssamlingen och utskrift ingår i Lärarpaketet.", da: "Større tal, samlingen af borde og print er en del af Lærerabonnementet.", no: "Større tall, bordsamlingen og utskrift er en del av Lærerabonnementet.", fi: "Opettaja-tilaus sisältää suuremmat lukumäärät, valmiiden pöytien kokoelman ja tulostuksen." },
    unlock:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l'offre Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Scopri il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Katso Opettaja-tilaus" },

    totalLabel:   { en: "How many counters on the table", de: "Anzahl der Plättchen auf dem Tisch", fr: "Nombre de jetons sur le plateau", es: "Cuántas fichas hay en la mesa", pt: "Quantas fichas há na mesa", it: "Quanti gettoni ci sono sul tavolo", nl: "Hoeveel fiches er op het blad liggen", sv: "Hur många brickor på bordet", da: "Antal brikker på bordet", no: "Antall brikker på bordet", fi: "Montako nappia pöydällä on" },
    tableLabel:   { en: "the table", de: "Tisch", fr: "le plateau", es: "la mesa", pt: "a mesa", it: "il tavolo", nl: "het blad", sv: "bordet", da: "bordet", no: "bordet", fi: "pöytä" },
    lidAria:      { en: "lid {i}", de: "Deckel {i}", fr: "couvercle {i}", es: "tapadera {i}", pt: "tampa {i}", it: "coperchio {i}", nl: "deksel {i}", sv: "lock {i}", da: "låg {i}", no: "lokk {i}", fi: "kansi {i}" },
    counterAria:  { en: "a counter", de: "ein Wendeplättchen", fr: "un jeton", es: "una ficha", pt: "uma ficha", it: "un gettone", nl: "een fiche", sv: "en bricka", da: "en brik", no: "en brikke", fi: "nappi" },
    markStrip:    { en: "What the class thinks is under each lid", de: "Was die Klasse unter jedem Deckel vermutet", fr: "Ce que la classe pense qu'il y a sous chaque couvercle", es: "Lo que la clase cree que hay debajo de cada tapadera", pt: "O que a turma acha que há embaixo de cada tampa", it: "Il numero che la classe pensa ci sia sotto ogni coperchio", nl: "Wat de klas denkt dat er onder elk deksel ligt", sv: "Det klassen tror ligger under varje lock", da: "Det tal, klassen tror, der ligger under hvert låg", no: "Det klassen tror ligger under hvert lokk", fi: "Mitä luokka arvelee kunkin kannen alla olevan" },
    markAria:     { en: "mark {n}", de: "Marke {n}", fr: "repère {n}", es: "marca {n}", pt: "marcar {n}", it: "numero {n}", nl: "getal {n}", sv: "markera {n}", da: "markér {n}", no: "marker {n}", fi: "luku {n}" },
    revealAria:   { en: "under each lid", de: "unter jedem Deckel", fr: "sous chaque couvercle", es: "debajo de cada tapadera", pt: "embaixo de cada tampa", it: "sotto ogni coperchio", nl: "onder elk deksel", sv: "under varje lock", da: "under hvert låg", no: "under hvert lokk", fi: "jokaisen kannen alla" }
  },

  STORE_KEY: 'lcs:lids:v1',
  ENT_TRUST_DAYS: 14,

  defaults: {},
  settings: [],

  premium: false,
  premiumKnown: false,

  MAX_LIDS: 4,
  FREE_MAX_TOTAL: 20,
  PAID_MAX_TOTAL: 30,
  MIN_TOTAL: 4,
  DEFAULT_TOTAL: 12,
  /* the table is a 0..1000 x 0..620 model space; the view scales it */
  W: 1000,
  H: 620,

  /* =================================================================
     THE MODEL — pure, total, immutable. No DOM, no locale, no Date, and
     no unseeded randomness: the scatter is a seeded function of the
     total, so the same table looks the same in Oslo and Lisbon.
     ================================================================= */

  newState: function () {
    return {
      n: this.DEFAULT_TOTAL,
      seed: this.DEFAULT_TOTAL * 7919,
      lids: [],          /* [{cx, cy}] in model space, placement order */
      guess: null,       /* the committed prior for x */
      lifted: false
    };
  },

  /* ⚠ TOTAL MEANS TOTAL. Every reader below goes through this, because
     `st || newState()` catches null and 0 but hands `[]` or `{}` straight
     through to `s.lids.length` and crashes. A model that is total for the
     inputs I thought of is just a model with a narrower bug. */
  _st: function (st) {
    return (st && typeof st === 'object' &&
            typeof st.n === 'number' && isFinite(st.n) &&
            Object.prototype.toString.call(st.lids) === '[object Array]')
      ? st : this.newState();
  },

  _clone: function (st) {
    var s = this._st(st), i;
    var lids = [];
    for (i = 0; i < (s.lids || []).length; i++) lids.push({ cx: s.lids[i].cx, cy: s.lids[i].cy });
    return { n: s.n, seed: s.seed, lids: lids, guess: s.guess, lifted: !!s.lifted };
  },

  _mix: function (a, b) {
    var h = (a ^ Math.imul((b | 0) + 0x9E3779B9, 0x85EBCA6B)) | 0;
    h = Math.imul(h ^ (h >>> 13), 0xC2B2AE35) | 0;
    return (h ^ (h >>> 16)) >>> 0;
  },

  /* the counters' resting places — a seeded scatter, deliberately not a
     grid, because a grid can be counted in rows and the point is that
     the covered ones cannot be counted at all */
  scatter: function (st) {
    var s = this._st(st), out = [], i, h;
    for (i = 0; i < s.n; i++) {
      h = this._mix(s.seed, i);
      out.push({
        x: 70 + (h % 861),
        y: 70 + ((h >>> 9) % 481)
      });
    }
    return out;
  },

  /* ⭐ THE VALUE LOCK, in one line: every lid takes the same share, and
     the share is what the total will give when it is split k ways. */
  share: function (st) {
    var s = this._st(st);
    var k = s.lids.length;
    if (k < 1) return 0;
    return Math.floor(s.n / k);
  },

  hidden: function (st) {
    var s = this._st(st);
    return s.lids.length * this.share(s);
  },

  leftover: function (st) {
    var s = this._st(st);
    return s.n - this.hidden(s);
  },

  /* ⭐ THE RE-SETTLE. Which counters end up under which lid: each lid in
     placement order takes the `share` nearest counters that no earlier
     lid has taken. Deterministic, so the settle is identical everywhere
     — and because the share is recomputed for EVERY lid on every drop,
     adding a lid genuinely makes the earlier lids give some back. That
     giving-back is the invention; it is not an animation. */
  /* ⚠ BY REGRET, NOT BY TURN. The first version served the lids in
     placement order — lid 0 took its nearest `share`, then lid 1 took
     the nearest of what was left, and so on — which handed the LAST lid
     whatever was scattered across the whole table. Its claim was not a
     region, it was the leftovers, so the circle drawn round it swallowed
     everything and the picture turned to mush.

     Instead every counter ranks the lids and carries its REGRET: how
     much closer its first choice is than its second. Counters that
     clearly belong somewhere are placed first; the ambiguous ones settle
     for whatever still has room; the ones no lid particularly wants are
     the ones left on the table. Each lid ends up with a compact cluster,
     no lid is punished for being last, and the whole thing is still a
     deterministic function of the seed. */
  assignment: function (st) {
    var s = this._st(st);
    var pts = this.scatter(s), x = this.share(s), k = s.lids.length;
    var out = [], rows = [], i, j;
    for (i = 0; i < k; i++) out.push([]);
    if (!k || !x) return out;

    for (j = 0; j < pts.length; j++) {
      var order = [];
      for (i = 0; i < k; i++) {
        var dx = pts[j].x - s.lids[i].cx, dy = pts[j].y - s.lids[i].cy;
        order.push({ i: i, d: dx * dx + dy * dy });
      }
      /* ties broken by index so nothing depends on sort stability */
      order.sort(function (a, b) { return a.d - b.d || a.i - b.i; });
      rows.push({
        j: j, order: order,
        regret: order.length > 1 ? Math.sqrt(order[1].d) - Math.sqrt(order[0].d) : Infinity
      });
    }
    rows.sort(function (a, b) { return b.regret - a.regret || a.j - b.j; });

    for (var r = 0; r < rows.length; r++) {
      for (i = 0; i < rows[r].order.length; i++) {
        var lid = rows[r].order[i].i;
        if (out[lid].length < x) { out[lid].push(rows[r].j); break; }
      }
    }
    /* ⭐ THEN TIDY. The greedy is capacity-constrained, so a counter can
       be pushed onto a far lid once the near ones are full — and a lid
       holding one distant stray is drawn enormous, which reads as if it
       took MORE when in fact it took fewer. So: repeatedly swap a pair
       of counters between two lids whenever the swap shortens the total
       reach. Counts never change (a swap is one-for-one, so the value
       lock is untouched by construction), it is deterministic, and it
       converges — bounded here so the model can never sit spinning. */
    var d2 = function (j, li) {
      var ddx = pts[j].x - s.lids[li].cx, ddy = pts[j].y - s.lids[li].cy;
      return ddx * ddx + ddy * ddy;
    };
    var pass, a, b, ja, jb, improved = true;
    for (pass = 0; pass < 8 && improved; pass++) {
      improved = false;
      for (a = 0; a < k; a++) {
        for (b = a + 1; b < k; b++) {
          for (ja = 0; ja < out[a].length; ja++) {
            for (jb = 0; jb < out[b].length; jb++) {
              var now = d2(out[a][ja], a) + d2(out[b][jb], b);
              var swapped = d2(out[a][ja], b) + d2(out[b][jb], a);
              if (swapped < now - 1e-9) {
                var t = out[a][ja]; out[a][ja] = out[b][jb]; out[b][jb] = t;
                improved = true;
              }
            }
          }
        }
      }
    }

    for (i = 0; i < k; i++) out[i].sort(function (a, b) { return a - b; });
    return out;
  },

  /* ⭐ THE LID IS AS BIG AS WHAT IS UNDER IT, AND WHAT IS UNDER IT SITS
     THERE. Two earlier drafts got this wrong in opposite directions, and
     the second one is worth recording because it looked right.

     Draft 1 drew every lid at a fixed 132px. That is a picture a child
     can catch out: three small circles cannot have covered thirty
     counters scattered to the corners.

     Draft 2 made the radius reach the farthest counter the lid claimed.
     Honest — and illegible. Ten counters spread over a third of a table
     force a circle a third of a table wide, three of those overlap into
     one orange mass, and the enclosure the radius was bought for becomes
     impossible to read. It also refuted its own selling point: measured
     across the domain, 50 lids shrank when another went down, 77 held
     and 35 GREW.

     What is here instead: a lid is drawn big enough to HOLD its share
     packed in hexagonal rings, and on the lift its counters are shown
     sitting inside it in exactly that packing. Nothing is claimed that
     is not shown. And because every lid of a colour hides the same
     number, EVERY LID IS THE SAME SIZE — the value lock is not a
     sentence the teacher says, it is the first thing you notice — and
     when another lid goes down they all shrink together, which this
     time holds for every (n, k) and is gated as such.

     ⚠ Does the size give the share away? No more than the tool already
     does. The total and the lid count are both on screen by design and
     the whole point is that the class CAN work it out; reading it off
     an area is not easier than dividing. */
  MIN_R: 74,
  C_R: 28,             /* a counter's own radius in model units, plus a hair */
  RING: 2.15,          /* ring spacing in counter-radii — just clear of touching */

  /* where the m counters under a lid sit, relative to its centre: the
     middle first, then hexagonal rings outward. Deterministic, and the
     SAME list the renderer draws and the gate measures. */
  packing: function (m) {
    var out = [], ring = 1, i, cnt, ang, rad;
    if (!(m > 0)) return out;
    out.push({ dx: 0, dy: 0 });
    while (out.length < m) {
      /* ⚠ A PART-FILLED RING IS SPREAD ROUND THE WHOLE CIRCLE, not
         stopped partway. Filling 6*ring slots and breaking out early
         piles the leftovers into one quadrant, and ten counters under a
         lid then read as a lopsided smudge rather than a pile you can
         count. Spacing only ever grows when the ring is under-filled, so
         nothing can collide. */
      cnt = Math.min(6 * ring, m - out.length);
      rad = ring * this.RING * this.C_R;
      for (i = 0; i < cnt; i++) {
        ang = (Math.PI * 2 * i) / cnt + (ring % 2 ? 0 : Math.PI / cnt);
        out.push({ dx: rad * Math.cos(ang), dy: rad * Math.sin(ang) });
      }
      ring++;
      if (ring > 12) break;      /* the model can never sit spinning */
    }
    return out;
  },

  /* ONE radius for every lid, because every lid holds the same number */
  lidRadius: function (st) {
    var s = this._st(st);
    var p = this.packing(this.share(s)), r = 0, i, d;
    for (i = 0; i < p.length; i++) {
      d = Math.sqrt(p[i].dx * p[i].dx + p[i].dy * p[i].dy);
      if (d > r) r = d;
    }
    return Math.round(Math.max(this.MIN_R, r + this.C_R));
  },

  /* where "Another lid" puts the next one: the emptiest spot on the
     table. ⚠ The first version stepped W/(k+2) and marched every new lid
     TOWARDS the last one, so three lids landed in an overlapping heap —
     a convenience control that produces a broken arrangement is not a
     convenience. Deterministic grid search, ties by scan order. */
  _farPoint: function (st) {
    var s = this._st(st);
    if (!s.lids.length) return { cx: Math.round(this.W * 0.5), cy: Math.round(this.H * 0.5) };
    var best = null, bestD = -1, gx, gy, i, dx, dy, d, m;
    for (gy = 0; gy < 5; gy++) {
      for (gx = 0; gx < 7; gx++) {
        /* ⚠ INSET FAR ENOUGH THAT THE WHOLE LID LANDS ON THE TABLE. The
           grid ran [150,850] x [130,490] for one draft and the outer
           lids were shaved by the table's own edge, because the largest
           auto-placed lid has a radius of about 148 model units. The
           teacher can still DRAG a lid to the rim — that is their
           choice, and it is visibly their choice. */
        var cx = Math.round(200 + (600 / 6) * gx);
        var cy = Math.round(170 + (280 / 4) * gy);
        m = Infinity;
        for (i = 0; i < s.lids.length; i++) {
          dx = cx - s.lids[i].cx; dy = cy - s.lids[i].cy;
          d = dx * dx + dy * dy;
          if (d < m) m = d;
        }
        if (m > bestD) { bestD = m; best = { cx: cx, cy: cy }; }
      }
    }
    return best;
  },

  /* the counters still on the table — the ONLY ones the render may see
     before the lift */
  visibleIndices: function (st) {
    var s = this._st(st);
    var a = this.assignment(s), taken = {}, out = [], i, j;
    for (i = 0; i < a.length; i++) for (j = 0; j < a[i].length; j++) taken[a[i][j]] = 1;
    for (i = 0; i < s.n; i++) if (!taken[i]) out.push(i);
    return out;
  },

  /* ⚠ THROWS BEFORE THE LIDS ARE LIFTED — the estimate-jar-core idiom
     (getActual throws pre-reveal). Note what this does and does not
     claim: `x` is DERIVABLE from the total and the lid count, both of
     which are on screen, and that is the point — the class can work it
     out. What must not happen is the TOOL working it out for them, or
     the covered counters sitting in the tree to be counted one by one. */
  revealed: function (st) {
    var s = this._st(st);
    if (!s.lifted) throw new Error('the lids are still down');
    return { share: this.share(s), leftover: this.leftover(s) };
  },

  setTotal: function (st, n) {
    var s = this._clone(st);
    var v = Math.round(Number(n));
    if (!isFinite(v) || v < this.MIN_TOTAL || v > this.PAID_MAX_TOTAL) return null;
    if (v === s.n) return null;
    /* refuse rather than destroy: changing the total once lids are down
       would silently rewrite the question the class is looking at */
    if (s.lids.length) return null;
    s.n = v;
    s.seed = v * 7919;
    s.guess = null;
    s.lifted = false;
    return s;
  },

  addLid: function (st, cx, cy) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (s.lids.length >= this.MAX_LIDS) return null;
    var x = Math.round(Number(cx)), y = Math.round(Number(cy));
    if (!isFinite(x) || !isFinite(y)) return null;
    s.lids.push({ cx: Math.max(0, Math.min(this.W, x)), cy: Math.max(0, Math.min(this.H, y)) });
    return s;
  },

  moveLid: function (st, i, cx, cy) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (!(i >= 0 && i < s.lids.length)) return null;
    var x = Math.round(Number(cx)), y = Math.round(Number(cy));
    if (!isFinite(x) || !isFinite(y)) return null;
    s.lids[i] = { cx: Math.max(0, Math.min(this.W, x)), cy: Math.max(0, Math.min(this.H, y)) };
    return s;
  },

  removeLid: function (st) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (!s.lids.length) return null;
    s.lids.pop();
    return s;
  },

  /* ⭐ THE COMMITTED PRIOR. It moves freely until the lids come up, and
     never again — by REFUSAL, so no path in the file can move it.
     ⚠ Returns null on refusal, never an unchanged clone: the recorded
     number-sieve defect where a failure carried the old data forward and
     committed itself as a success. */
  placeGuess: function (st, v) {
    var s = this._clone(st);
    if (s.lifted) return null;
    var g = Math.round(Number(v));
    if (!isFinite(g) || g < 0 || g > this.PAID_MAX_TOTAL) return null;
    s.guess = (s.guess === g) ? null : g;
    return s;
  },

  lift: function (st) {
    var s = this._clone(st);
    if (s.lifted) return null;
    if (s.lids.length < 1) return null;
    s.lifted = true;
    return s;
  },

  lower: function (st) {
    var s = this._clone(st);
    if (!s.lifted) return null;
    s.lifted = false;
    return s;
  },

  maxTotal: function () { return this.premium ? this.PAID_MAX_TOTAL : this.FREE_MAX_TOTAL; },

  /* =================================================================
     ENTITLEMENT — the pattern from pattern-bench.js:239-265.
     ⚠ UNKNOWN IS PESSIMISTIC, and locking a control is not enough: the
     state it produced must be reset once we actually know. See render().
     ================================================================= */
  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 1;
    return s;
  },
  _saveStore: function () { try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {} },

  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        self.premium = (age <= self.ENT_TRUST_DAYS) ? ent.tier !== 'free' : false;
      } else self.premium = false;
      self.premiumKnown = true;
      if (self._wrap) self.render();
    };
    if (!token) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { self.premium = false; self.premiumKnown = true; if (self._wrap) self.render(); return; }
        var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        self.premiumKnown = true;
        if (self._wrap) self.render();
      })
      .catch(trustCache);
  },

  /* ---- THE TABLE BOOK. Locale-NEUTRAL by construction: a table is a
     total and a set of lid positions, so it carries no words in any
     language and can be grown and proven mechanically. ------------- */
  /* ⚠ THE FALLBACK CARRIES THE FREE TABLES INLINE, never an empty array:
     a 404 must degrade to the FREE TIER, not to nothing (the recorded
     arrow-strip Mat Book defect). */
  FALLBACK_SETUPS: {
    version: 1, freeMax: 8, premiumMax: 76,
    setups: [
      { id: 't-001', n: 12, k: 2, free: true },
      { id: 't-002', n: 12, k: 3, free: true },
      { id: 't-003', n: 13, k: 3, free: true },
      { id: 't-004', n: 10, k: 2, free: true },
      { id: 't-005', n: 15, k: 4, free: true },
      { id: 't-006', n: 16, k: 4, free: true },
      { id: 't-007', n: 9, k: 2, free: true },
      { id: 't-008', n: 20, k: 3, free: true }
    ]
  },

  _fetchSetups: function () {
    var self = this;
    fetch('/mini-tools/lids-setups.json', { cache: 'no-cache' })
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .catch(function () { return self.FALLBACK_SETUPS; })
      .then(function (d) {
        self.data = (d && d.setups && d.setups.length) ? d : self.FALLBACK_SETUPS;
        if (self._wrap) self.render();
      });
  },

  /* locked setups are ABSENT from the array, never merely hidden */
  setupsFor: function () {
    var all = (this.data && this.data.setups) || [], out = [], i;
    for (i = 0; i < all.length; i++) if (all[i].free || this.premium) out.push(all[i]);
    return out;
  },

  /* lay k lids out evenly across the table — a setup names a total and a
     lid COUNT, never positions, so the book stays tiny and locale-free */
  loadSetup: function (st, rec) {
    var s = this._clone(st);
    if (!rec || !(rec.n >= this.MIN_TOTAL) || !(rec.k >= 1)) return null;
    if (rec.n > this.PAID_MAX_TOTAL || rec.k > this.MAX_LIDS) return null;
    s.n = rec.n;
    s.seed = rec.n * 7919;
    s.guess = null;
    s.lifted = false;
    s.lids = [];
    var i, gap = this.W / (rec.k + 1);
    for (i = 0; i < rec.k; i++) s.lids.push({ cx: Math.round(gap * (i + 1)), cy: Math.round(this.H / 2) });
    return s;
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectLidsCSS();
    this._store = this._loadStore();
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';
    this.st = this.newState();
    this._timers = [];
    this._setupIdx = 0;
    this._fetchSetups();
    this._fetchEntitlement();
    this.render();
  },

  reset: function () {
    this.st = this.newState();
    this._setupIdx = 0;
    this.render();
  },

  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    /* ⚠ locking a control is not enough — reset the STATE it produced.
       If we learn the account is free while a paid-size total is on the
       table, put it back. (pattern-bench:290) */
    if (this.premiumKnown && !this.premium && this.st.n > this.FREE_MAX_TOTAL) {
      this.st.n = this.FREE_MAX_TOTAL;
      this.st.seed = this.FREE_MAX_TOTAL * 7919;
      this.st.lids = [];
      this.st.guess = null;
      this.st.lifted = false;
    }
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'lid-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    /* ⚠ THE HINT SITS ABOVE THE TABLE — the only instruction this tool
       gives, and below a tall table it can be off-screen at the moment
       it appears (the recorded number-sieve defect). */
    wrap.appendChild(this._buildHint());
    wrap.appendChild(this._buildTable());
    wrap.appendChild(this._buildStrip());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _buildBar: function () {
    var api = this.api, self = this, bar = api.el('div', 'lid-bar');

    var group = api.el('div', 'lid-group');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', api.t('totalLabel'));
    /* the total is a numeral, which the no-words law explicitly allows */
    [8, 12, 16, 20, 24, 30].forEach(function (n) {
      var open = n <= self.maxTotal();
      var b = api.el('button', 'lid-chip' + (self.st.n === n ? ' lid-on' : '') + (open ? '' : ' lid-locked'));
      b.type = 'button';
      b.textContent = String(n);
      b.setAttribute('aria-pressed', String(self.st.n === n));
      /* the option that IS the state cannot be chosen again — a live
         control that provably does nothing reads as broken */
      b.disabled = (open && self.st.n === n) || !!self.st.lids.length;
      b.addEventListener('click', function () {
        if (!open) { self._showGate(); return; }
        var next = self.setTotal(self.st, n);
        if (!next) return;
        self.st = next;
        self.render();
      });
      group.appendChild(b);
    });
    bar.appendChild(group);
    return bar;
  },

  _buildHint: function () {
    var api = this.api, s = this.st, hint = api.el('div', 'lid-hint');
    if (s.lifted) hint.textContent = this.leftover(s) > 0 ? api.t('hintLeftover') : '';
    else if (s.lids.length < 2) hint.textContent = api.t('hintPlace');
    else if (s.guess === null) hint.textContent = api.t('hintShare');
    else hint.textContent = api.t('hintLift');
    return hint;
  },

  /* =================================================================
     THE TABLE. Counters at seeded scatter points; lids dragged anywhere.
     ⚠ THE COVERED COUNTERS ARE NOT RENDERED AT ALL. They are not faded,
     not aria-hidden, not opacity:0 — they are simply not built. That is
     the house doctrine (number-balance.js:437-439,
     part-whole-frame.js:517-520) and this tool inherits it rather than
     claiming it.
     ================================================================= */
  _buildTable: function () {
    var api = this.api, self = this, s = this.st;
    var box = api.el('div', 'lid-table');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('tableLabel'));

    var pts = this.scatter(s);
    var vis = s.lifted ? null : this.visibleIndices(s);
    var i;

    if (s.lifted) {
      /* ⭐ THE COUNTERS ARE SHOWN WHERE THEY WERE — UNDER THEIR OWN LID,
         in the same packing the lid was sized to hold. So the class does
         not take "ten under each" on trust; they count ten under each.
         An earlier draft put every counter back at its scatter point,
         which answered the question with a shrug. What was never under a
         lid has not moved and does not move now. */
      var pack = this.packing(this.share(s));
      s.lids.forEach(function (lid) {
        for (var q = 0; q < pack.length; q++) {
          box.appendChild(self._counter({ x: lid.cx + pack[q].dx, y: lid.cy + pack[q].dy }, api));
        }
      });
      var rest = this.visibleIndices(s);
      for (i = 0; i < rest.length; i++) box.appendChild(this._counter(pts[rest[i]], api));
    } else {
      for (i = 0; i < vis.length; i++) box.appendChild(this._counter(pts[vis[i]], api));
    }

    s.lids.forEach(function (lid, idx) {
      var el = api.el('button', 'lid-lid' + (s.lifted ? ' lid-up' : ''));
      el.type = 'button';
      el.style.left = (lid.cx / self.W * 100) + '%';
      el.style.top = (lid.cy / self.H * 100) + '%';
      /* as wide as it reaches — see lidRadius(). A percentage of the
         table's WIDTH with aspect-ratio:1, so the circle stays a circle
         whatever the table's own scale; CSS min-width holds the 44px tap
         floor when the arithmetic asks for something smaller. */
      el.style.width = (self.lidRadius(s) * 2 / self.W * 100) + '%';
      el.setAttribute('aria-label', api.t('lidAria').replace('{i}', String(idx + 1)));
      self._wireLidDrag(el, idx, box);
      box.appendChild(el);
    });
    return box;
  },

  _counter: function (p, api) {
    var c = api.el('div', 'lid-counter');
    c.style.left = (p.x / this.W * 100) + '%';
    c.style.top = (p.y / this.H * 100) + '%';
    c.setAttribute('aria-label', api.t('counterAria'));
    return c;
  },

  /* free 2-D placement — no precedent on this platform (sort-bins-core
     is a DISCRETE drop-target drag with no stored coordinates, and
     letter-tiles is 1-D-per-row), so the choreography is copied as a
     PATTERN from sort-bins-core.js:350-408 and nothing is imported.
     ⚠ The keyboard fallback is not optional: the liveness gate drives
     controls by key when a click changes nothing. */
  _wireLidDrag: function (el, idx, box) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self.st.lifted) return;
      ev.preventDefault();
      el.setPointerCapture(ev.pointerId);
      var move = function (e) {
        var r = box.getBoundingClientRect();
        if (!r.width) return;
        var cx = (e.clientX - r.left) / r.width * self.W;
        var cy = (e.clientY - r.top) / r.height * self.H;
        var next = self.moveLid(self.st, idx, cx, cy);
        if (!next) return;
        self.st = next;
        el.style.left = (self.st.lids[idx].cx / self.W * 100) + '%';
        el.style.top = (self.st.lids[idx].cy / self.H * 100) + '%';
      };
      var up = function () {
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        self.render();
      };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
    });
    /* keyboard: nudge the lid across the table */
    el.addEventListener('keydown', function (ev) {
      var lid = self.st.lids[idx], next;
      if (!lid) return;
      /* ⭐ ENTER OR SPACE CARRIES IT SOMEWHERE CLEAR — the keyboard's
         version of picking a lid up and putting it down, using the same
         emptiest-spot rule as "Another lid".
         ⚠ It is here because the liveness gate condemned every lid as a
         dead control, and it was RIGHT to: arrows nudged, but the gate
         presses Enter and Space, and a drag handle that answers neither
         is unusable to anyone who cannot drag. ⚠ It is a MOVE and not a
         toggle on purpose — the gate presses both keys in one tick, so a
         toggle would flip on, flip back, and report itself dead. */
      if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'Spacebar') {
        ev.preventDefault();
        var without = self._clone(self.st);
        without.lids.splice(idx, 1);
        var p = self._farPoint(without);
        next = self.moveLid(self.st, idx, p.cx, p.cy);
        if (!next) return;
        self.st = next;
        self.render();
        var moved = self._wrap && self._wrap.querySelectorAll('.lid-lid')[idx];
        if (moved) { try { moved.focus(); } catch (_) {} }
        return;
      }
      var d = { ArrowLeft: [-60, 0], ArrowRight: [60, 0], ArrowUp: [0, -60], ArrowDown: [0, 60] }[ev.key];
      if (!d) return;
      ev.preventDefault();
      next = self.moveLid(self.st, idx, lid.cx + d[0], lid.cy + d[1]);
      if (!next) return;
      self.st = next;
      self.render();
    });
  },

  /* the committed prior: a strip of numerals the class parks a marker on */
  _buildStrip: function () {
    var api = this.api, self = this, s = this.st;
    var strip = api.el('div', 'lid-strip');
    strip.setAttribute('role', 'group');
    strip.setAttribute('aria-label', api.t('markStrip'));
    var top = Math.min(this.maxTotal(), 12), i;
    for (i = 0; i <= top; i++) {
      (function (v) {
        var b = api.el('button', 'lid-mark' + (s.guess === v ? ' lid-on' : ''));
        b.type = 'button';
        b.textContent = String(v);
        b.setAttribute('aria-label', api.t('markAria').replace('{n}', String(v)));
        b.setAttribute('aria-pressed', String(s.guess === v));
        b.disabled = !!s.lifted;
        b.addEventListener('click', function () {
          var next = self.placeGuess(self.st, v);
          if (!next) return;
          self.st = next;
          self.render();
        });
        strip.appendChild(b);
      }(i));
    }
    if (s.lifted) {
      /* the reveal sits beside the frozen marker and marks NOTHING */
      var r = this.revealed(s);
      var out = api.el('div', 'lid-reveal');
      out.setAttribute('aria-label', api.t('revealAria'));
      var j;
      for (j = 0; j < r.share; j++) out.appendChild(api.el('div', 'lid-rcell'));
      strip.appendChild(out);
    }
    return strip;
  },

  _buildFoot: function () {
    var api = this.api, self = this, s = this.st;
    var foot = api.el('div', 'lid-foot');

    /* ⭐ a noun-labelled control does what its label says — the recorded
       number-sieve "New cards" defect was a chip that armed a mode and
       dealt nothing, and it reached the operator. */
    var add = api.el('button', 'lid-chip');
    add.type = 'button';
    add.textContent = api.t('addLid');
    add.disabled = s.lifted || s.lids.length >= this.MAX_LIDS;
    add.addEventListener('click', function () {
      var p = self._farPoint(self.st);
      var next = self.addLid(self.st, p.cx, p.cy);
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(add);

    var take = api.el('button', 'lid-chip');
    take.type = 'button';
    take.textContent = api.t('takeLid');
    take.disabled = s.lifted || !s.lids.length;
    take.addEventListener('click', function () {
      var next = self.removeLid(self.st);
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(take);

    var lift = api.el('button', 'lid-chip lid-go');
    lift.type = 'button';
    lift.textContent = api.t(s.lifted ? 'againBtn' : 'liftBtn');
    lift.disabled = !s.lids.length;
    lift.addEventListener('click', function () {
      var next = self.st.lifted ? self.lower(self.st) : self.lift(self.st);
      if (!next) return;
      self.st = next;
      self.render();
    });
    foot.appendChild(lift);

    var other = api.el('button', 'lid-chip');
    other.type = 'button';
    other.textContent = api.t('newSetBtn');
    other.disabled = this.setupsFor().length < 2;
    other.addEventListener('click', function () { self._stepSetup(); });
    foot.appendChild(other);

    var pr = api.el('button', 'lid-chip' + (this.premium ? '' : ' lid-locked'));
    pr.type = 'button';
    pr.textContent = api.t('printBtn');
    pr.addEventListener('click', function () {
      if (!self.premium) { self._showGate(); return; }
      window.print();
    });
    foot.appendChild(pr);

    /* ⚠ TWO NODES, NEVER A CONCATENATION — the recorded localisation
       smell, and joining them makes the one actionable thing
       unclickable. Shape from folding-sheet.js:714-723. */
    if (this._gate) {
      var g = api.el('div', 'lid-gate');
      var sp = api.el('span');
      sp.textContent = api.t('gateLine');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-lids';
      a.target = '_top';
      a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.appendChild(sp);
      g.appendChild(a);
      foot.appendChild(g);
    }
    return foot;
  },

  /* ⚠ STEP PAST A SETUP THAT WOULD RENDER IDENTICALLY — the recorded
     number-sieve library defect and the arrow-strip Mat Book defect,
     which are the same defect twice. */
  _stepSetup: function () {
    var open = this.setupsFor();
    if (!open.length) return;
    var k, idx = 0, hit = null;
    for (k = 1; k <= open.length; k++) {
      idx = (this._setupIdx + k) % open.length;
      var c = open[idx];
      if (c.n !== this.st.n || c.k !== this.st.lids.length) { hit = c; break; }
    }
    if (!hit) return;
    var next = this.loadSetup(this.st, hit);
    if (!next) return;
    this._setupIdx = idx;
    this.st = next;
    this.render();
  },

  _showGate: function () {
    var self = this;
    this._gate = true;
    this.render();
    this._after(6000, function () { self._gate = false; if (self._wrap) self.render(); });
  }
};

/* =====================================================================
   THE STYLESHEET
   ⚠ TWO TAP FLOORS, MEASURED SEPARATELY AND NEITHER MOVES: every CONTROL
   holds 44px; a COUNTER is canvas and holds 34px. Collapsing them into
   one number waves a real defect through, and an or-shaped assertion has
   hidden a missing floor twice on this platform.
   ⚠ No `vh` anywhere: a manipulative's iframe grows to its content, so a
   vh rule inside it is a feedback loop the shell has no path for.
   ⚠ Never an inline `background` SHORTHAND — it resets background-image
   and beats the stylesheet.
   ===================================================================== */
function injectLidsCSS() {
  if (document.getElementById('lid-style')) return;
  var css = ''
    + '.lid-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;min-width:0;}'
    + '.lid-bar,.lid-foot{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;width:100%;}'
    + '.lid-group{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;}'
    + '.lid-chip{min-height:44px;min-width:44px;padding:8px 14px;border-radius:13px;border:2px solid #146B5E;'
    +   'background:#FBF3E4;color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:15px;line-height:1.15;cursor:pointer;}'
    + '.lid-chip.lid-on{background:#146B5E;color:#FBF3E4;}'
    + '.lid-chip.lid-locked{border-color:#F2784B;color:#C2562F;}'
    + '.lid-chip[disabled]{opacity:.5;cursor:default;}'
    + '.lid-chip.lid-go{background:#F2784B;border-color:#C2562F;color:#FFF;}'
    + '.lid-chip.lid-go[disabled]{background:#FBF3E4;color:#0E5147;border-color:#146B5E;}'
    + '.lid-gate{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:14px;color:#C2562F;'
    +   'display:flex;flex-wrap:wrap;justify-content:center;gap:6px;align-items:center;}'
    + '.lid-gate a{color:#C2562F;min-height:44px;display:inline-flex;align-items:center;}'
    + '.lid-hint{flex-basis:100%;text-align:center;font-family:Nunito,sans-serif;font-size:15px;color:#0E5147;min-height:20px;}'
    /* THE TABLE */
    + '.lid-table{position:relative;width:100%;max-width:620px;aspect-ratio:1000/620;'
    +   'border-radius:18px;border:2px solid rgba(20,107,94,.28);background-color:#FBF3E4;overflow:hidden;}'
    /* ⚠ THE COUNTER SCALES WITH THE TABLE, and it must. A fixed 34px
       counter whose SPACING is a percentage of the table looks fine at
       1024 and collapses into a blob at 320, because the gaps shrink
       with the table while the discs do not. 5.6% is exactly 2 x C_R in
       model units, so the packing's 60-unit spacing keeps its clearance
       at every width and overlap is structurally impossible rather than
       merely unobserved. */
    + '.lid-counter{position:absolute;width:5.6%;aspect-ratio:1;min-width:12px;min-height:12px;'
    +   'transform:translate(-50%,-50%);border-radius:50%;'
    +   'background-color:#146B5E;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12);}'
    /* the lid: a circle, deliberately NOT an irregular blob */
    /* ⚠ transform-centred, NOT negative margins: the width is set from
       the model at render time, so a fixed -66px offset would mis-centre
       every lid that is not exactly 132px. min-width/min-height hold the
       44px control floor when the claim is small. */
    + '.lid-lid{position:absolute;padding:0;border-radius:50%;aspect-ratio:1;'
    +   'min-width:44px;min-height:44px;transform:translate(-50%,-50%);'
    +   'border:3px solid #C2562F;background-color:#F2784B;cursor:grab;touch-action:none;'
    +   'box-shadow:0 4px 10px rgba(20,30,28,.22);'
    +   'transition:opacity .2s var(--lcs-ease,ease-out),width .18s var(--lcs-ease,ease-out);}'
    /* the grip ring scales with the lid so it never outgrows a small one */
    + '.lid-lid::after{content:"";position:absolute;left:50%;top:50%;width:32%;height:32%;'
    +   'min-width:16px;min-height:16px;transform:translate(-50%,-50%);'
    +   'border-radius:50%;border:3px solid rgba(255,255,255,.55);}'
    + '.lid-lid:active{cursor:grabbing;}'
    + '.lid-lid.lid-up{opacity:.32;cursor:default;}'
    /* THE STRIP — the committed prior */
    + '.lid-strip{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;'
    +   'width:100%;max-width:620px;padding:8px;border-radius:14px;border:2px dashed rgba(20,107,94,.30);}'
    + '.lid-mark{min-height:44px;min-width:44px;padding:0 6px;border-radius:11px;border:2px solid #146B5E;'
    +   'background:#FBF3E4;color:#0E5147;font-family:Baloo\\ 2,cursive;font-size:16px;cursor:pointer;}'
    + '.lid-mark.lid-on{background:#146B5E;color:#FBF3E4;}'
    + '.lid-mark[disabled]{cursor:default;opacity:.85;}'
    + '.lid-reveal{flex-basis:100%;display:flex;flex-wrap:wrap;justify-content:center;gap:5px;'
    +   'padding-top:8px;}'
    + '.lid-rcell{width:26px;height:26px;border-radius:50%;background-color:#146B5E;}'
    + '@media (min-width:760px){'
    +   '.lid-table{max-width:680px;}'
    +   '.lid-strip{max-width:680px;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){'
    +   '.lid-lid{transition:none;}'
    + '}';
  var st = document.createElement('style');
  st.id = 'lid-style';
  st.textContent = css;
  document.head.appendChild(st);
}

if (typeof window !== 'undefined' && window.LCS && window.LCS.register) window.LCS.register(Lids);
