/* =====================================================================
   _unroll-tape-strings.js — the SoT for TOOL #41's in-tool strings
   ---------------------------------------------------------------------
   `apply-unroll-tape-locales.js` rewrites the whole `strings:` block in
   `mini tools/unroll-tape.js` from this file. Never hand-edit a locale
   in the tool.

   EN is authored. The other ten were REBUILT — not translated — by a
   three-person native panel per locale (§A.13.48): a linguist, a primary
   teacher of the relevant grades, and a B2C marketer.

   ⭐⭐ ALL ELEVEN PANELS AUDITED THE ENGLISH, AND ALL ELEVEN FOUND THE
   SAME DEFECTS IN IT. The English is a locale too — the #38 lesson,
   arriving again unprompted:

     1. THE TITLE NAMED THE ONE NOUN THE TOOL FORBIDS. "The Unrolling
        TAPE" — while all fifteen other strings say STRAND, and while
        sibling #40 literally opens "Two tapes, one object". Six panels
        independently refused to translate it. Now "All the Way Round",
        which is the phrase a teacher actually uses.
     2. NOTHING UNROLLS. A cord lying round an edge SLIDES OFF and lies
        down; "unroll" describes a spool and re-imports the tape. Same
        for "wrap it back up" — it goes back AROUND, not into a bundle.
     3. "THE BENCH" WAS A FOURTH NAMED PART, in a tool whose whole rule
        is three. Inherited from measurement-bench/unit-handle, where it
        is the apparatus — and in sv/da/no it is a SIBLING TOOL'S NAME
        (Mätbänken, Målebænken, Målebenken). The printable thing is the
        RUNWAY.
     4. `benchLabel` WAS AN INCOMPLETE SCREEN-READER LABEL — it named the
        shape, the strand and the runway, and omitted the height bar and
        the flag, while the very next string tells that same user to drag
        the flag. An accessibility hole, not a wording preference.
     5. "how many of the shape's own WIDTHS" — a shape has one width; the
        meaning is how many TIMES its width fits. The plural is readable
        in English and misleads on rebuild.
     6. "the bench to print FOR paper" is not English.

   ⚠ AND ONE PANEL FOUND A REAL BUG IN THE MODEL, which I then reproduced
   and fixed: at 0 < t < 1 with no flag planted, the hint said "drag the
   flag" while `setFlag` refused and no handle was drawn — a control
   taking an answer to a question nobody asked (§23.6).

   ⭐ THE BEST CATCH OF THE ROUND, from the Swedish panel: the obvious
   Swedish word for the runway is `bana`, whose definite form is `banan`
   — spelt identically to the banana. "Skriv ut banan" would have shipped
   "print the banana" on a card for seven-year-olds. They used `spår`.

   ⚠ Each locale's cord noun and runway noun were chosen against the
   SHIPPED lexicon of the other 43 tools, not against English. That is
   why they are unrelated words rather than one word respelled eleven
   times: de Schnur/Leiste · fr ficelle/couloir · es cordón/pista ·
   pt barbante/trilha · it spago/pista · nl touwtje/lijn · sv snöre/spår ·
   da tråd/bane · no hyssing/spor · fi lanka/kaista.
   ===================================================================== */

'use strict';

module.exports = {
  /* ---- EN, corrected against the eleven panels' audit ---------------- */
  en: {
    title: "All the Way Round",
    instruction: "A strand lies all the way round the shape. Let it lie down straight on the runway, and see how many times the shape's own width fits along it.",
    benchLabel: "A shape with a strand around it, a runway ruled in the shape's own width, a bar showing the shape's height, and a flag for the guess",
    hintGuess: "How far is it all the way round? Drag the flag to where you think the strand will reach.",
    hintUnroll: "Now let the strand lie down.",
    hintLanded: "The strand came off the shape. Nothing was added and nothing was taken away.",
    unrollBtn: "Let it lie down",
    rollBackBtn: "Put it back round",
    nextShapeBtn: "Another shape",
    printBtn: "Print the runway",
    sizeAria: "Make the shape bigger or smaller",
    strandAria: "Lay the strand down",
    flagAria: "Move the flag",
    gateTitle: "More shapes",
    gateBody: "Seven more shapes, and the runway to print on paper.",
    gateCta: "See the Teacher plan"
  },

  /* ---- de · cord = die Schnur, runway = die Leiste.
     ⚠ `die Bahn` was unavailable — arrow-strip (#37, Der Käferplan) ships
     it. `Streifen` is unit-handle's. Paid plan normalised to the SHIPPED
     "Lehrer-Paket" (10 occurrences), not the brief's "Lehrer-Abo". ---- */
  de: {
    title: "Die Schnur rundherum",
    instruction: "Eine Schnur liegt einmal rundherum um die Form. Lass sie sich gerade auf die Leiste legen und schau, wie oft die Breite der Form hineinpasst.",
    benchLabel: "Eine Form mit einer Schnur rundherum, darunter eine Leiste, die in der Breite der Form eingeteilt ist, ein Balken für die Höhe der Form und eine Fahne zum Schätzen",
    hintGuess: "Wie weit ist es einmal rundherum? Zieh die Fahne dahin, wo die Schnur wohl ankommt.",
    hintUnroll: "Jetzt darf sich die Schnur hinlegen.",
    hintLanded: "Die Schnur ist von der Form gerutscht. Es wurde nichts dazugegeben und nichts weggenommen.",
    unrollBtn: "Hinlegen",
    rollBackBtn: "Aufwickeln",
    nextShapeBtn: "Neue Form",
    printBtn: "Leiste drucken",
    sizeAria: "Die Form größer oder kleiner machen",
    strandAria: "Die Schnur hinlegen",
    flagAria: "Die Fahne verschieben",
    gateTitle: "Mehr Formen",
    gateBody: "Sieben weitere Formen und die Leiste zum Ausdrucken.",
    gateCta: "Lehrer-Paket ansehen"
  },

  /* ---- fr · cord = la ficelle, runway = le couloir.
     ⚠ `piste` is arrow-strip's; `bande` is unit-handle's; `étalon` is
     unit-handle's name. `s'allonger` was rejected outright — it means
     GETS LONGER, the exact misconception hintLanded exists to kill. ---- */
  fr: {
    title: "La ficelle qui se couche",
    instruction: "Une ficelle fait tout le tour de la forme. Couchez-la bien droite dans le couloir, puis regardez combien de fois la largeur de la forme y tient.",
    benchLabel: "Une forme entourée d’une ficelle, un couloir marqué à la largeur de la forme, une barre qui montre la hauteur de la forme, et un repère pour l’estimation.",
    hintGuess: "Le tour de la forme ira jusqu’où dans le couloir ? Posez le repère là où vous pensez que la ficelle s’arrêtera.",
    hintUnroll: "Maintenant, couchez la ficelle.",
    hintLanded: "La ficelle a quitté la forme. On n’a rien ajouté, on n’a rien enlevé.",
    unrollBtn: "Coucher la ficelle",
    rollBackBtn: "Remettre autour",
    nextShapeBtn: "Une autre forme",
    printBtn: "Imprimer le couloir",
    sizeAria: "Agrandir ou réduire la forme",
    strandAria: "Faire glisser la ficelle pour la coucher",
    flagAria: "Déplacer le repère",
    gateTitle: "D’autres formes",
    gateBody: "Sept formes de plus et le couloir à imprimer sur papier.",
    gateCta: "Voir l’offre Enseignant"
  },

  /* ---- es · cord = el cordón, runway = la pista.
     ⚠ `cuerda` was vetoed by the linguist on mathematical grounds: it is
     the Spanish term for a CHORD of a circle, and this tool is full of
     circles — it would teach the word backwards. `unidad` is the
     sibling's. ---- */
  es: {
    title: "La vuelta a la figura",
    instruction: "Un cordón le da toda la vuelta a la figura. Deja que se acueste recto en la pista y mira cuántas veces cabe el ancho de la figura.",
    benchLabel: "Una figura con un cordón alrededor, una pista marcada con el ancho de la figura, una barra que muestra su altura y una bandera para la estimación",
    hintGuess: "¿Cuánto mide toda la vuelta? Arrastra la bandera hasta donde creas que llegará el cordón.",
    hintUnroll: "Ahora deja que el cordón se acueste en la pista.",
    hintLanded: "El cordón salió de la figura. Es el mismo cordón: no se le quitó ni se le puso nada.",
    unrollBtn: "Acostar el cordón",
    rollBackBtn: "Volver a enrollar",
    nextShapeBtn: "Otra figura",
    printBtn: "Imprimir la pista",
    sizeAria: "Hacer la figura más grande o más pequeña",
    strandAria: "Acostar el cordón en la pista",
    flagAria: "Mover la bandera",
    gateTitle: "Más figuras",
    gateBody: "Siete figuras más y la pista para imprimir en papel.",
    gateCta: "Ver el plan Docente"
  },

  /* ---- pt · cord = o barbante, runway = a trilha.
     ⚠ `pista` means CLUE in Brazilian classroom Portuguese and is used
     that way in three shipped tools — "deitar na pista" would read as
     "lie down on the clue". `trilha numérica` is already known to BR
     teachers as a marked track you count along. ---- */
  pt: {
    title: "O Barbante do Contorno",
    instruction: "Um barbante dá a volta inteira na figura. Deixe o barbante deitar reto na trilha e veja quantas vezes cabe a largura da própria figura.",
    benchLabel: "Uma figura com um barbante em volta, uma trilha marcada com a largura da figura, uma barra que mostra a altura da figura e uma bandeirinha para o palpite",
    hintGuess: "Até onde vai a volta inteira? Arraste a bandeirinha até onde você acha que o barbante vai chegar.",
    hintUnroll: "Agora deixe o barbante deitar na trilha.",
    hintLanded: "O barbante saiu da figura. Nada foi acrescentado e nada foi tirado.",
    unrollBtn: "Deitar o barbante",
    rollBackBtn: "Enrolar de novo",
    nextShapeBtn: "Outra figura",
    printBtn: "Imprimir a trilha",
    sizeAria: "Deixar a figura maior ou menor",
    strandAria: "Deitar o barbante na trilha",
    flagAria: "Mover a bandeirinha",
    gateTitle: "Mais figuras",
    gateBody: "Mais sete figuras e a trilha para imprimir em papel.",
    gateCta: "Ver o plano Professor"
  },

  /* ---- it · cord = lo spago, runway = la pista.
     ⚠ `il banco` is the sibling Il banco delle misure; `nastro` and the
     elastico/allungare axis belong to L'unità elastica. `filo` was
     blocked — story-line owns `il filo della storia`. ---- */
  it: {
    title: "Lo spago del contorno",
    instruction: "Uno spago fa tutto il giro della figura. Lasciatelo stendere dritto sulla pista e guardate quante volte ci sta la larghezza della figura stessa.",
    benchLabel: "Una figura con uno spago tutto intorno, una pista graduata con la larghezza della figura, una barra che mostra l’altezza della figura e una bandierina per la stima",
    hintGuess: "Fin dove arriva tutto il giro? Trascinate la bandierina dove pensate che arriverà lo spago.",
    hintUnroll: "Ora lasciate stendere lo spago sulla pista.",
    hintLanded: "Lo spago si è staccato dalla figura. Nulla è stato aggiunto e nulla è stato tolto.",
    unrollBtn: "Stendi lo spago",
    rollBackBtn: "Riavvolgi lo spago",
    nextShapeBtn: "Un’altra figura",
    printBtn: "Stampa la pista",
    sizeAria: "Rendere la figura più grande o più piccola",
    strandAria: "Stendere lo spago sulla pista",
    flagAria: "Spostare la bandierina",
    gateTitle: "Altre figure",
    gateBody: "Altre sette figure e la pista da stampare su carta.",
    gateCta: "Il piano Insegnante"
  },

  /* ---- nl · cord = het touwtje, runway = de lijn.
     ⚠ `de baan` is arrow-strip's (De Pijlenbaan, "Baan leegmaken");
     `strook` and `maat` are De Rekbare Maat's. `omtrek` is a groep-6
     term and would mis-shelve a groep-3/4 card. ---- */
  nl: {
    title: "Helemaal rondom",
    instruction: "Om de vorm heen ligt een touwtje. Laat het recht gaan liggen op de lijn en tel hoe vaak de breedte van de vorm erin past.",
    benchLabel: "Een vorm met een touwtje eromheen, een lijn die verdeeld is in breedtes van de vorm, een balkje zo hoog als de vorm, en een vlaggetje om te raden",
    hintGuess: "Hoe ver is het helemaal rondom? Sleep het vlaggetje naar de plek waar je denkt dat het touwtje komt.",
    hintUnroll: "Laat het touwtje nu gaan liggen.",
    hintLanded: "Het touwtje is van de vorm afgegleden. Er is niets bijgekomen en er is niets afgegaan.",
    unrollBtn: "Recht leggen",
    rollBackBtn: "Weer eromheen",
    nextShapeBtn: "Andere vorm",
    printBtn: "Lijn afdrukken",
    sizeAria: "De vorm groter of kleiner maken",
    strandAria: "Het touwtje recht leggen",
    flagAria: "Het vlaggetje verplaatsen",
    gateTitle: "Meer vormen",
    gateBody: "Nog zeven vormen, en de lijn om af te drukken op papier.",
    gateCta: "Bekijk het Leerkracht-pakket"
  },

  /* ---- sv · cord = snöret, runway = spåret.
     ⭐ `bana` was killed by a homograph: its definite is `banan`, which
     is also the banana — "Skriv ut banan" reads "print the banana".
     `räls` is Kommandorälsen's, `remsa` is Enhetsremsan's. `omkrets` is
     an åk 4–6 term in Lgr22 and stays out of the buttons. ---- */
  sv: {
    title: "Snöret runt",
    instruction: "Ett snöre ligger hela vägen runt figuren. Låt det lägga sig rakt på spåret och se hur många gånger figurens egen bredd får plats.",
    benchLabel: "En figur med ett snöre runt om, ett spår som är indelat i figurens egen bredd, en stapel som visar figurens höjd och en flagga för gissningen",
    hintGuess: "Hur långt är det hela vägen runt? Dra flaggan dit du tror att snöret når.",
    hintUnroll: "Låt snöret lägga sig ner.",
    hintLanded: "Snöret har lämnat figuren. Ingenting har lagts till och ingenting har tagits bort.",
    unrollBtn: "Lägg ner snöret",
    rollBackBtn: "Lägg tillbaka",
    nextShapeBtn: "Ny figur",
    printBtn: "Skriv ut spåret",
    sizeAria: "Gör figuren större eller mindre",
    strandAria: "Lägg ner snöret på spåret",
    flagAria: "Flytta flaggan",
    gateTitle: "Fler figurer",
    gateBody: "Sju figurer till, och spåret att skriva ut på papper.",
    gateCta: "Se Lärarpaketet"
  },

  /* ---- da · cord = tråden, runway = banen.
     ⚠ `snor` is Historiesnoren's and `spor` is Pilesporet's, so both
     obvious words were occupied. Danish takes SINGLE definite throughout
     (tråden, banen, figuren, flaget) — never a preposed article. ---- */
  da: {
    title: "Tråden om figuren",
    instruction: "En tråd ligger hele vejen rundt om figuren. Lad den lægge sig lige ned på banen, og se hvor mange gange figurens egen bredde fylder.",
    benchLabel: "En figur med en tråd rundt om, en bane der er inddelt i figurens egen bredde, en bjælke der viser figurens højde, og et flag til gættet",
    hintGuess: "Hvor langt er der hele vejen rundt? Træk flaget hen, hvor du tror, tråden når til.",
    hintUnroll: "Lad nu tråden lægge sig ned.",
    hintLanded: "Tråden er kommet af figuren. Der blev ikke lagt noget til, og der blev ikke taget noget fra.",
    unrollBtn: "Læg tråden ned",
    rollBackBtn: "Læg den tilbage",
    nextShapeBtn: "Ny figur",
    printBtn: "Print banen",
    sizeAria: "Gør figuren større eller mindre",
    strandAria: "Læg tråden ned på banen",
    flagAria: "Flyt flaget",
    gateTitle: "Flere figurer",
    gateBody: "Syv figurer mere, og banen til at printe på papir.",
    gateCta: "Se Lærerabonnementet"
  },

  /* ---- no · cord = hyssingen, runway = sporet.
     ⚠ `snor` is Fortellingssnora's and `bane` is Pilbanen's. `hyssing`
     is what a Norwegian teacher actually calls a short piece of string
     and is unmistakably Norwegian rather than pan-Scandinavian — which
     is the point, since sv/da/no must not be one word respelled. ---- */
  no: {
    title: "Hyssingsporet",
    instruction: "En hyssing ligger hele veien rundt figuren. La den legge seg rett ut på sporet, og se hvor mange ganger figurens egen bredde får plass.",
    benchLabel: "En figur med en hyssing rundt, et spor som er delt inn i figurens egen bredde, en stolpe som viser figurens høyde, og et flagg til gjettingen",
    hintGuess: "Hvor langt er det hele veien rundt? Dra flagget dit du tror hyssingen når.",
    hintUnroll: "La hyssingen legge seg ned.",
    hintLanded: "Hyssingen har gått av figuren. Ingenting ble lagt til, og ingenting ble tatt bort.",
    unrollBtn: "Legg den ned",
    rollBackBtn: "Legg den tilbake",
    nextShapeBtn: "Ny figur",
    printBtn: "Skriv ut sporet",
    sizeAria: "Gjør figuren større eller mindre",
    strandAria: "Legg hyssingen ned på sporet",
    flagAria: "Flytt flagget",
    gateTitle: "Flere figurer",
    gateBody: "Sju figurer til, og sporet til å skrive ut på papir.",
    gateCta: "Se Lærerabonnementet"
  },

  /* ---- fi · cord = lanka, runway = kaista.
     ⚠ `nauha` is Venyvä yksikkö's ("Kaksi nauhaa, yksi esine"), `naru`
     is Tarinanaru's, `yksikkö` is the sibling's. `suora` was rejected
     because a ruled horizontal line called `suora` reads as `lukusuora`
     — a number line, which this is not. Case government is written out
     literally, never assembled from a nominative token: langan asettua
     (gen. subject of infinitive), langan yltävän (referative), kuviosta
     (elative), levyisiin osiin (illative). ---- */
  fi: {
    title: "Ympäri ja suoraksi",
    instruction: "Lanka kulkee kuvion ympäri. Anna langan asettua suoraksi kaistalle ja katso, montako kertaa kuvion oma leveys siihen mahtuu.",
    benchLabel: "Kuvio, jonka ympäri kulkee lanka, kaista joka on jaettu kuvion levyisiin osiin, kuvion korkuinen palkki ja lippu arvausta varten",
    hintGuess: "Kuinka pitkä matka on kuvion ympäri? Vedä lippu kohtaan, johon arvelet langan yltävän.",
    hintUnroll: "Anna langan nyt asettua kaistalle.",
    hintLanded: "Lanka irtosi kuviosta. Mitään ei lisätty eikä otettu pois.",
    unrollBtn: "Suoraksi",
    rollBackBtn: "Takaisin ympäri",
    nextShapeBtn: "Toinen kuvio",
    printBtn: "Tulosta kaista",
    sizeAria: "Suurenna tai pienennä kuviota",
    strandAria: "Vedä lanka suoraksi kaistalle",
    flagAria: "Siirrä lippua",
    gateTitle: "Lisää kuvioita",
    gateBody: "Seitsemän kuviota lisää ja kaista, jonka voi tulostaa paperille.",
    gateCta: "Tutustu Opettaja-tilaukseen"
  }
};
