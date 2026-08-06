/* =====================================================================
   TOOL #30 — SORTING HOOPS   (sorting-hoops.js)   REBUILT TO THE v4 BAR
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome).

   Two overlapping hoops on a mat. Four regions: A only, B only, the
   OVERLAP, and the rest of the mat. Children bring things to them. The
   overlap is the whole pedagogy — a thing that is both has nowhere else
   to go.

   THE ONE THESIS — THE HOOP DECIDES, SO THE TEACHER CAN GO QUIET.
   In the carpet version a grown-up says "no, not that one", and children
   stop thinking and start reading the grown-up's face. Here the HOOP
   accepts or releases.

   ⚠ WHAT THE CLASS TALKS ABOUT (the gate-5 test): they argue about why
   the hoop kept that one and let this one go, reading the rule off the
   two growing sets on either side of the ring.

   THE TWO INVENTIONS. (The previous header claimed attribute hoops and
   Venn/Carroll sorting were "absent even in English" from eight named
   products. Carroll and Venn sorting with attribute blocks is a
   long-standing staple of UK primary software and of the Dienes
   tradition; that negative cannot be verified and is withdrawn. These
   two are real and are enough.)
     1. NOBODY KNOWS THE RULE — not even the teacher. `Surprise me` draws
        a hidden rule the tool never displays. A teacher who does not know
        it can genuinely go quiet, and reads the two sets alongside the
        class. It is also the only honest answer to "how do you choose a
        secret on a projector with 25 children watching".
     2. THE MULTILINGUAL PHONOLOGICAL ATTRIBUTES. Sorting the same
        pictures by syllable count and by initial SOUND, in eleven
        languages, off gate-checked word data. It cannot be translated
        into existence; it has to be rebuilt per language.

   ⚠⚠ WHAT THE REBUILD FIXED, EACH MEASURED ON PRODUCTION FIRST:
     · Clicking "Guess my rule" appeared to do nothing. The picker
       rendered ~987px down the page and NOTHING scrolled to it: at
       1920x937, 1536x730 and 1366x650 it was entirely below the fold with
       scrollY 0. On the standalone embed it was worse — trapped under
       html,body{overflow:hidden}. Hoop 2 was only reachable through that
       invisible panel, which is exactly why the operator reported "there
       is no option to make rules for hoop 2".
       => THE SETUP PANEL NOW REPLACES THE MAT, in the mat's own footprint.
     · Committing the second rule SWEPT THE MAT BACK INTO THE TRAY.
       Measured: {tray:10,a:1,out:1} -> {tray:12,a:0,out:0}. `_fillTray`
       re-dealt and re-stamped every uid. That is "the objects randomly
       disappear".  => the tray is a VIEW over `dealt`; committing a rule
       never re-deals.
     · THE RELEASE ANIMATION HAD NEVER ONCE FIRED. `_tile(it, where ===
       this._released)` compared a region string to a uid, and the timer
       that would have cleared it was killed by the render() that followed.
       => FLIP, because a class applied after innerHTML='' animates from
       the destination to the destination.
     · THE OUTSIDE PILE WAS POISONED. Any mismatch wrote 'out'. Measured:
       a whale, under (A=people made it, B=it is alive), TRUE region b,
       dropped into A, was filed OUTSIDE. The header called that pile "the
       other half of the evidence" while filling it with things that are
       not counter-examples.  => `landingFor` below. Only a true
       counter-example accumulates outside; anything merely misplaced goes
       back to the tray.
     · THE HOOPS WERE PAINTED 0.55 CSS PX WIDE at every viewport including
       2560 — `vector-effect:non-scaling-stroke` resolves stroke-width in
       viewport units, and the three wide tiers ramped everything except
       the stroke. They also rendered at 2.5-2.9:1, not circles.
     · Ring A was BYTE-IDENTICAL to block blue (#2F6FB5) and ring B sat
       dE00 2.0 from block red under deuteranopia. Both hoops punned on
       colours the child is sorting BY.  => one achromatic ink.
     · Ctrl+P PRINTED THE PAID SHEET FOR ANYONE (the chip was gated, the
       @media print block was not), and what it printed was four headings.
     · Both hoops could be given the SAME rule, after which every card
       landed in the lens and A and B could never be used.
     · "Anything" set the rule to null, which accepted NOTHING.

   TWO ITEM WORLDS, both deliberate:
     · LOGIC BLOCKS — drawn here, 4 shapes x 4 colours x 2 sizes = 32. The
       classic Dienes attribute set. Language-free, and EXACT BY
       CONSTRUCTION, so no artwork can contradict a colour or shape rule.
     · PICTURE CARDS — the illustrated nouns, carrying the conceptual tags
       from `object-attributes.json` plus the linguistic attributes,
       narrowed to a K-2 pool (`sorting-hoops-pool.json`).

   FENCES — adjacent to four shipped things, must not drift into any:
     sort-bins-core.js   drag into a LABELLED bin, deferred CHECK, graded.
     (E3, 2 activities   Here the label may be HIDDEN, the regions
      ride it — FROZEN)  OVERLAP, and nothing is ever marked. Choreography
                         is copied as a PATTERN; zero lines imported.
     wodb (tool #22)     tap-to-lift a 2x2, DIVERGENT. Here it is
                         CONVERGENT: membership is a fact.
     mims-baskets / olive-kind-of / ziggy-odd-one-out — graded child
                         activities that NAME the category up front.
     picture-sort app    printable, draw-a-line-to-the-bin.

   REFUSES, FOREVER: no score, no "found it in N tries", no timer, no
   streak · NO tick, NO cross, NO red anywhere — a released item is a fact
   about the rule, not a mistake · the outside pile is never counted or
   tallied · no voting widget · the tool never names the rule before the
   teacher reveals it · nothing depends on hearing (TTS is reliable in
   only 5 of 11 locales).
   ===================================================================== */
var SortingHoops = {
  id: 'sorting-hoops',

  /* ⚠ CURATION: en authored here. The other ten come from the per-locale
     native 3-agent ensembles (§A.13.48), briefed to treat this English as
     a SOURCE TO AUDIT. api.t falls back to en, so an unfilled locale
     degrades to English rather than to a raw key. */
  strings: {
    title:        { en: 'Sorting Hoops', de: 'Sortierreifen', fr: 'Cerceaux de tri', it: 'Cerchi per classificare', es: 'Aros para clasificar', pt: 'Arcos de classificação', nl: 'Sorteerhoepels', sv: 'Sorteringsringar', da: 'Sorteringsringe', no: 'Sorteringsringer', fi: 'Lajitteluvanteet' },
    instruction:  { en: 'Bring things to the hoops. Something that belongs in both goes where they cross.', de: 'Bringt Dinge zu den Reifen. Was in beide gehört, kommt in die Mitte.', fr: 'Apportez les objets aux cerceaux. Ce qui appartient aux deux va là où ils se croisent.', it: 'Portate le cose ai cerchi. Quello che appartiene a entrambi va dove si incrociano.', es: 'Llevad las cosas a los aros. Lo que pertenece a los dos va donde se cruzan.', pt: 'Levem as coisas até os arcos. O que pertence aos dois vai onde eles se cruzam.', nl: 'Breng dingen naar de hoepels. Wat in allebei hoort, gaat waar ze elkaar kruisen.', sv: 'Ta sakerna till ringarna. Det som hör hemma i båda hamnar där de korsar varandra.', da: 'Tag tingene hen til ringene. Det, der hører til i begge, kommer der, hvor de krydser hinanden.', no: 'Ta tingene bort til ringene. Det som hører hjemme i begge, havner der de krysser hverandre.', fi: 'Tuo esineet vanteille. Se mikä kuuluu molempiin, tulee kohtaan jossa vanteet risteävät.' },

    /* --- modes --- */
    modeLabelled: { en: 'Labelled sort', de: 'Regeln sichtbar', fr: 'Règles visibles', it: 'Regole in vista', es: 'Reglas a la vista', pt: 'Regras à vista', nl: 'Regels zichtbaar', sv: 'Synliga regler', da: 'Synlige regler', no: 'Synlige regler', fi: 'Säännöt näkyvissä' },
    modeGuess:    { en: 'Guess my rule', de: 'Errate meine Regel', fr: 'Devine ma règle', it: 'Indovina la mia regola', es: 'Adivina mi regla', pt: 'Adivinhe a minha regra', nl: 'Raad mijn regel', sv: 'Gissa min regel', da: 'Gæt min regel', no: 'Gjett regelen min', fi: 'Arvaa sääntöni' },
    modeChild:    { en: 'A child sets it', de: 'Ein Kind wählt', fr: 'Un élève choisit', it: 'Sceglie un bambino', es: 'La pone un alumno', pt: 'A criança escolhe', nl: 'Een kind kiest', sv: 'Barnet väljer', da: 'Et barn vælger', no: 'Et barn bestemmer', fi: 'Lapsi valitsee' },

    /* --- worlds --- */
    /* ⚠ THE BLOCK WORLD WAS NAMED AFTER ONE OF ITS OWN SORTABLE ATTRIBUTES.
       Every non-EN locale shipped the word for SHAPE — Formen / Formas /
       Formes / Vormen / Former / Muodot — while `famShape` asks "what shape
       is it?". The world and one of its three rules carried the same word.
       Three native panels flagged it independently; the material's real name
       is the Dienes logic block. */
    trayBlocks:   { en: 'Blocks', de: 'Blöcke', fr: 'Blocs', it: 'Blocchi', es: 'Bloques', pt: 'Blocos', nl: 'Blokken', sv: 'Klossar', da: 'Klodser', no: 'Klosser', fi: 'Palikat' },
    trayPictures: { en: 'Pictures', de: 'Bilder', fr: 'Images', it: 'Immagini', es: 'Imágenes', pt: 'Imagens', nl: 'Plaatjes', sv: 'Bilder', da: 'Billeder', no: 'Bilder', fi: 'Kuvat' },

    /* --- regions --- */
    trayLabel:    { en: 'Things to sort', de: 'Dinge zum Sortieren', fr: 'Objets à trier', it: 'Cose da classificare', es: 'Cosas para clasificar', pt: 'Coisas para classificar', nl: 'Dingen om te sorteren', sv: 'Saker att sortera', da: 'Ting at sortere', no: 'Ting å sortere', fi: 'Lajiteltavaa' },
    outsideLabel: { en: 'Outside the hoops', de: 'Außerhalb der Reifen', fr: 'En dehors des cerceaux', it: 'Fuori dai cerchi', es: 'Fuera de los aros', pt: 'Fora dos arcos', nl: 'Buiten de hoepels', sv: 'Utanför ringarna', da: 'Uden for ringene', no: 'Utenfor ringene', fi: 'Vanteiden ulkopuolella' },
    hoopA:        { en: 'Hoop 1', de: 'Reifen 1', fr: 'Cerceau 1', it: 'Cerchio 1', es: 'Aro 1', pt: 'Arco 1', nl: 'Hoepel 1', sv: 'Ring 1', da: 'Ring 1', no: 'Ring 1', fi: 'Vanne 1' },
    hoopB:        { en: 'Hoop 2', de: 'Reifen 2', fr: 'Cerceau 2', it: 'Cerchio 2', es: 'Aro 2', pt: 'Arco 2', nl: 'Hoepel 2', sv: 'Ring 2', da: 'Ring 2', no: 'Ring 2', fi: 'Vanne 2' },
    /* ⚠ THE LENS HAD NO STRING AT ALL. _capFor('both') returned '' — the
       one region the whole instrument is named for was the only unlabelled
       one on the mat. */
    capBoth:      { en: 'Both', de: 'In beiden', fr: 'Les deux', it: 'Tutti e due', es: 'Los dos', pt: 'Os dois', nl: 'In allebei', sv: 'Båda', da: 'Begge', no: 'I begge', fi: 'Molemmat' },

    /* --- setup --- */
    setRule:      { en: 'Set the rules', de: 'Regeln festlegen', fr: 'Choisir les règles', it: 'Scegli le regole', es: 'Elegir las reglas', pt: 'Escolher as regras', nl: 'Regels instellen', sv: 'Välj reglerna', da: 'Vælg reglerne', no: 'Velg reglene', fi: 'Aseta säännöt' },
    changeRules:  { en: 'Change the rules', de: 'Regeln ändern', fr: 'Changer de règle', it: 'Cambia le regole', es: 'Cambiar reglas', pt: 'Mudar as regras', nl: 'Andere regels', sv: 'Byt regler', da: 'Skift reglerne', no: 'Bytt regler', fi: 'Vaihda säännöt' },
    surpriseBtn:  { en: 'Surprise me', de: 'Regel auslosen', fr: 'Personne ne sait', it: 'A sorpresa', es: 'Sorpréndeme', pt: 'Me surpreenda', nl: 'Verras mij', sv: 'Överraska mig', da: 'Overrask mig', no: 'Overrask meg', fi: 'Yllätä minut' },
    chooseBtn:    { en: 'I will choose', de: 'Selbst wählen', fr: 'Je choisis', it: 'Scelgo io', es: 'La elijo yo', pt: 'Eu escolho', nl: 'Ik kies zelf', sv: 'Jag väljer', da: 'Jeg vælger', no: 'Jeg velger', fi: 'Valitsen itse' },
    backBtn:      { en: 'Back', de: 'Zurück', fr: 'Retour', it: 'Indietro', es: 'Atrás', pt: 'Voltar', nl: 'Terug', sv: 'Tillbaka', da: 'Tilbage', no: 'Tilbake', fi: 'Takaisin' },
    startBtn:     { en: 'Start sorting', de: 'Jetzt sortieren', fr: 'On trie !', it: 'Si comincia', es: 'A clasificar', pt: 'Começar', nl: 'Sorteren maar', sv: 'Börja sortera', da: 'Start sorteringen', no: 'Start sorteringen', fi: 'Aloita luokittelu' },
    ruleSet:      { en: 'Ready and hidden', de: 'Gesetzt — geheim', fr: 'Prête et secrète', it: 'Pronta — segreta', es: 'Lista y secreta', pt: 'Pronta — secreta', nl: 'Ingesteld — geheim', sv: 'Vald – hemlig', da: 'Valgt — skjult', no: 'Valgt – skjult', fi: 'Salainen sääntö' },
    hiddenRule:   { en: 'Hidden', de: 'Geheim', fr: 'Secrète', it: 'Segreta', es: 'Secreta', pt: 'Secreta', nl: 'Geheim', sv: 'Hemlig', da: 'Hemmelig', no: 'Hemmelig', fi: 'Salainen' },
    /* ⚠ THIS SAID "Anything" IN ELEVEN LOCALES AND MEANT ITS OPPOSITE.
       `regionFor` treats a null rule as satisfied by NOTHING, so a hoop
       labelled "Anything" accepted nothing at all — the header records the
       original bug and the label survived the fix. The Norwegian panel put
       it plainly: the shipped value is "a straight falsehood". It now says
       what is true — that hoop has no rule. */
    noRule:       { en: 'No rule', de: 'Keine Regel', fr: 'Aucune règle', it: 'Nessuna regola', es: 'Sin regla', pt: 'Sem regra', nl: 'Geen regel', sv: 'Ingen regel', da: 'Ingen regel', no: 'Ingen regel', fi: 'Ei sääntöä' },
    reveal:       { en: 'Show the rules', de: 'Regeln zeigen', fr: 'Montrer les règles', it: 'Mostra le regole', es: 'Mostrar las reglas', pt: 'Mostrar as regras', nl: 'Regels laten zien', sv: 'Visa reglerna', da: 'Vis reglerne', no: 'Vis reglene', fi: 'Näytä säännöt' },
    hide:         { en: 'Hide the rules again', de: 'Regeln wieder verstecken', fr: 'Cacher les règles', it: 'Nascondi di nuovo le regole', es: 'Esconder las reglas otra vez', pt: 'Esconder as regras de novo', nl: 'Regels weer verbergen', sv: 'Dölj reglerna igen', da: 'Skjul reglerne igen', no: 'Skjul reglene igjen', fi: 'Piilota säännöt taas' },
    lessonsTab:   { en: 'Ready-made rules', de: 'Fertige Beispiele', fr: 'Tris tout prêts', it: 'Regole pronte', es: 'Reglas listas', pt: 'Regras prontas', nl: 'Kant-en-klare regels', sv: 'Färdiga regler', da: 'Færdige oplæg', no: 'Ferdige opplegg', fi: 'Valmiit säännöt' },

    /* --- actions --- */
    moreThings:   { en: 'More things', de: 'Mehr Dinge', fr: 'Encore des objets', it: 'Altre cose', es: 'Más cosas', pt: 'Mais coisas', nl: 'Meer dingen', sv: 'Fler saker', da: 'Flere ting', no: 'Hent flere ting', fi: 'Lisää lajiteltavaa' },
    clearMat:     { en: 'Clear the mat', de: 'Matte leeren', fr: 'Vider le tapis', it: 'Svuota il tappeto', es: 'Vaciar la alfombra', pt: 'Esvaziar o tapete', nl: 'Mat leegmaken', sv: 'Töm mattan', da: 'Tøm måtten', no: 'Tøm matta', fi: 'Tyhjennä matto' },
    confirmClear: { en: 'Clear the mat? Press again to put everything back in the tray.', de: 'Matte wirklich leeren? Noch einmal drücken, dann liegt alles wieder zum Sortieren bereit.', fr: 'Vider le tapis ? Touchez encore pour tout remettre à trier.', it: 'Svuoto il tappeto? Premi ancora: tutto torna tra le cose da classificare.', es: '¿Vaciar la alfombra? Pulsa otra vez y todo vuelve a la bandeja.', pt: 'Esvaziar o tapete? Toque de novo e tudo volta para a bandeja.', nl: 'Mat leegmaken? Druk nog een keer, dan gaat alles terug.', sv: 'Töm mattan? Tryck igen så åker allt tillbaka till sakerna att sortera.', da: 'Skal måtten tømmes? Tryk igen, så lægges alt tilbage, hvor det kom fra.', no: 'Tøm matta? Trykk en gang til, så går alle tingene tilbake.', fi: 'Tyhjennetäänkö matto? Paina uudelleen, niin kaikki palaa takaisin lajiteltavaksi.' },
    printBtn:     { en: 'Print the mat', de: 'Matte drucken', fr: 'Imprimer le tapis', it: 'Stampa il tappeto', es: 'Imprimir la alfombra', pt: 'Imprimir o tapete', nl: 'Mat afdrukken', sv: 'Skriv ut mattan', da: 'Udskriv måtten', no: 'Skriv ut matta', fi: 'Tulosta matto' },

    /* --- the hint band. The tool's ONLY explanation: strings.instruction
       is display:none in every embed (lcs-shell.css:261), and every
       production surface is an embed. --- */
    hintOpenStart:  { en: 'Bring anything to a hoop. Something that belongs in both goes where they cross.', de: 'Bringt etwas zu einem Reifen. Was in beide gehört, kommt in die Mitte.', fr: 'Apportez un objet dans un cerceau. Ce qui va dans les deux se pose là où ils se croisent.', it: 'Portate una cosa a un cerchio. Quello che sta in tutti e due va dove si incrociano.', es: 'Trae cualquier cosa a un aro. Lo que vale para los dos va donde se cruzan.', pt: 'Tragam qualquer coisa até um arco. O que pertence aos dois vai onde eles se cruzam.', nl: 'Breng iets naar een hoepel. Wat in allebei hoort, gaat waar ze elkaar kruisen.', sv: 'Ta vilken sak som helst till en ring. Det som hör hemma i båda hamnar där ringarna möts.', da: 'Læg noget i en ring. Det, der hører til i begge, skal ligge der, hvor ringene krydser hinanden.', no: 'Legg hva du vil i en ring. Det som passer i begge, havner der ringene krysser.', fi: 'Tuo mikä tahansa vanteeseen. Se, mikä kuuluu molempiin, tulee kohtaan, jossa vanteet risteävät.' },
    hintOpenLens:   { en: 'Is there anything that belongs in both? It goes where the hoops cross.', de: 'Gibt es etwas, das in beide Reifen gehört? Das kommt in die Mitte.', fr: 'Y a-t-il un objet qui va dans les deux ? Il se pose là où les cerceaux se croisent.', it: 'C’è qualcosa che sta in tutti e due? Va dove i cerchi si incrociano.', es: '¿Hay algo que valga para los dos aros? Va donde se cruzan.', pt: 'Tem alguma coisa que pertence aos dois? Ela vai onde os arcos se cruzam.', nl: 'Is er iets dat in allebei hoort? Dat gaat waar de hoepels elkaar kruisen.', sv: 'Finns det något som hör hemma i båda? Då hamnar det där ringarna möts.', da: 'Er der noget, der hører til i begge ringe? Så skal det ligge der, hvor ringene krydser hinanden.', no: 'Er det noe som passer i begge? Da skal det dit ringene krysser.', fi: 'Kuuluuko jokin molempiin vanteisiin? Se tulee kohtaan, jossa vanteet risteävät.' },
    hintOpenBoth:   { en: 'Read a hoop’s label out loud. Does everything inside it really fit?', de: 'Lest einen Reifen laut vor. Passt wirklich alles hinein, was darin liegt?', fr: 'Lisez un cerceau à voix haute. Est-ce que tout ce qui est dedans y a bien sa place ?', it: 'Leggete l’etichetta di un cerchio. Tutto quello che c’è dentro ci sta davvero?', es: 'Lee la regla de un aro en voz alta. ¿Encaja todo lo que hay dentro?', pt: 'Leiam a etiqueta de um arco e olhem o que está lá dentro: tudo combina com ela?', nl: 'Lees de regel van een hoepel hardop voor. Past alles wat erin ligt?', sv: 'Läs upp allt som ligger i en ring. Passar allt ihop med regeln?', da: 'Læs den ene ring højt. Passer alt det, der ligger i den, til reglen?', no: 'Les opp det som ligger i én ring. Passer alt sammen med regelen?', fi: 'Lukekaa ääneen, mitä yhdessä vanteessa on. Sopiiko kaikki sen sääntöön?' },
    hintChoose:     { en: 'Choose a rule for each hoop, or tap Surprise me.', de: 'Für jeden Reifen eine Regel festlegen – selbst gewählt oder ausgelost.', fr: 'Choisissez la règle de ce cerceau, ou touchez « Personne ne sait ».', it: 'Scegli una regola per ogni cerchio, oppure tocca «A sorpresa».', es: 'Elige la regla de cada aro o pulsa Sorpréndeme.', pt: 'Escolha uma regra para este arco, ou toque em Me surpreenda.', nl: 'Kies een regel voor elke hoepel, of tik op Verras mij.', sv: 'Välj en regel för varje ring, eller tryck på Överraska mig.', da: 'Vælg en regel til hver ring — eller tryk på Overrask mig.', no: 'Velg en regel for hver ring, eller trykk «Overrask meg».', fi: 'Valitse sääntö kummallekin vanteelle tai napauta Yllätä minut.' },
    hintSecret:     { en: 'The rules are set. The class will not see them.', de: 'Die Regeln stehen fest. Auf dem Brett sind sie nicht zu sehen.', fr: 'Les règles sont en place. La classe ne les verra pas.', it: 'Le regole sono pronte e sul tappeto non si vedono.', es: 'Las reglas ya están puestas. La clase no las ve.', pt: 'As regras estão prontas e ficam escondidas da turma.', nl: 'De regels staan klaar. Niemand in de klas heeft ze gezien.', sv: 'Reglerna är valda och syns inte för klassen.', da: 'Reglerne er valgt. Klassen kan ikke se dem.', no: 'Reglene er satt. Klassen får ikke se dem.', fi: 'Säännöt on asetettu, eivätkä ne näy luokalle.' },
    hintGuessStart: { en: 'Bring one thing to a hoop. The hoop keeps it or lets it go — the hoop decides.', de: 'Bringt ein Ding zu einem Reifen. Der Reifen entscheidet – nicht die Erwachsenen.', fr: 'Apportez un objet dans un cerceau. Le cerceau le garde ou le laisse repartir. C’est lui qui décide.', it: 'Portate una cosa a un cerchio. Il cerchio la tiene o la lascia andare: decide lui.', es: 'Trae una cosa a un aro. El aro se queda con ella o la suelta: decide el aro.', pt: 'Tragam uma coisa até um arco: ele guarda ou devolve. Quem decide é o arco.', nl: 'Breng één ding naar een hoepel. De hoepel houdt het vast of laat het los.', sv: 'Ta en sak till en ring. Ringen bestämmer om den får stanna, inte du.', da: 'Læg én ting i en ring. Ringen beholder den eller giver slip. Det er ringen, der bestemmer.', no: 'Legg én ting i en ring. Ringen beholder den, eller slipper den. Ringen bestemmer.', fi: 'Tuokaa yksi esine vanteeseen. Vanne joko pitää sen tai päästää sen pois. Vanne päättää.' },
    hintGuessOut:   { en: 'That one is outside the hoops now. What no hoop will keep tells you as much as what they keep.', de: 'Dieses Ding gehört in keinen Reifen. Auch das verrät etwas über die Regel.', fr: 'Le cerceau l’a laissé repartir. Ce qu’un cerceau refuse en dit autant que ce qu’il garde.', it: 'Il cerchio ha lasciato andare questa. Anche quello che non tiene ci dice tanto.', es: 'El aro la ha soltado. Lo que no se queda ningún aro también dice mucho.', pt: 'O arco devolveu essa. O que um arco não guarda também é pista.', nl: 'Die ligt buiten de hoepels. Wat er niet in mag, vertelt net zoveel.', sv: 'Ringen släppte den. Det som ingen ring vill behålla är halva svaret.', da: 'Ringen gav slip på den. Det, ingen ring vil beholde, er halvdelen af svaret.', no: 'Ringen slapp den. Det ingen ring vil ha, er halve svaret.', fi: 'Vanne päästi sen pois. Sekin, mitä vanne ei pidä, kertoo säännöstä.' },
    hintGuessRead:  { en: 'Read what each hoop has kept, then ask what its rule might be.', de: 'Lest vor, was jeder Reifen behalten hat. Was könnte seine Regel sein?', fr: 'Regardez ce que chaque cerceau a gardé, puis demandez quelle peut être sa règle.', it: 'Guardate che cosa ha tenuto ogni cerchio. Quale sarà la sua regola?', es: 'Mira con qué se ha quedado cada aro y pregunta cuál puede ser su regla.', pt: 'Leiam o que cada arco guardou e pensem: qual pode ser a regra dele?', nl: 'Lees wat elke hoepel heeft gehouden. Wat zou de regel kunnen zijn?', sv: 'Läs vad varje ring har behållit. Fråga sedan vad regeln kan vara.', da: 'Læs, hvad hver ring har beholdt. Hvad kan reglen mon være?', no: 'Les hva hver ring har beholdt. Hva kan regelen være?', fi: 'Lukekaa, mitä kumpikin vanne on pitänyt. Kysykää sitten, mikä sen sääntö voisi olla.' },
    hintRevealed:   { en: 'The rules are showing now.', de: 'Jetzt sind die Regeln zu sehen.', fr: 'Les règles sont maintenant affichées.', it: 'Adesso le regole si vedono.', es: 'Ahora se ven las reglas.', pt: 'Agora as regras estão à vista.', nl: 'De regels staan er nu bij.', sv: 'Nu syns reglerna.', da: 'Nu kan I se reglerne.', no: 'Nå vises reglene.', fi: 'Säännöt ovat nyt näkyvissä.' },
    hintTrayEmpty:  { en: 'Everything has been sorted. Read the two sets, then bring more things.', de: 'Alles ist sortiert. Lest die beiden Reifen – dann holt mehr Dinge.', fr: 'Tout est trié. Regardez les deux cerceaux, puis touchez « Encore des objets ».', it: 'Avete classificato tutto. Guardate i due cerchi, poi prendete altre cose.', es: 'Ya está todo clasificado. Lee los dos aros y trae más cosas.', pt: 'Já classificaram tudo. Leiam os dois grupos e depois peçam mais coisas.', nl: 'Alles is gesorteerd. Lees de twee groepen en haal dan meer dingen.', sv: 'Allt är sorterat. Läs de två grupperna och hämta sedan fler saker.', da: 'Alt er sorteret. Læs de to ringe, og hent så flere ting.', no: 'Alt er lagt ut. Les de to ringene, og hent så flere ting.', fi: 'Kaikki on lajiteltu. Lukekaa molemmat joukot ja tuokaa sitten lisää lajiteltavaa.' },
    hintCarry:      { en: 'Now tap where it goes, or choose with the arrow keys and press Enter.', de: 'Tippt jetzt auf den Platz, wo es hingehört. Mit der Tastatur: ← → und Enter.', fr: 'Touchez l’endroit où le poser, ou choisissez avec les flèches puis Entrée.', it: 'Adesso toccate il posto dove va. Con la tastiera: frecce e poi Invio.', es: 'Ahora toca el sitio donde va, o muévete con las flechas y pulsa Intro.', pt: 'Toque no lugar onde ela vai. Com o teclado: setas e Enter.', nl: 'Tik waar het heen moet, of kies met de pijltjestoetsen en Enter.', sv: 'Tryck där den ska ligga, eller välj med piltangenterna och Enter.', da: 'Tryk der, hvor tingen skal hen — eller vælg med piletasterne og tryk på Enter.', no: 'Trykk der den skal ligge – eller bruk piltastene og Enter.', fi: 'Napauta paikkaa, johon esine kuuluu — tai valitse nuolinäppäimillä ja paina Enter.' },
    hintRuleChanged:{ en: 'The rules changed. Some things went back to the tray or outside.', de: 'Die Regeln sind neu. Manche Dinge mussten die Reifen wieder verlassen.', fr: 'Les règles ont changé. Certains objets sont ressortis des cerceaux.', it: 'Le regole sono cambiate. Qualche cosa è tornata indietro.', es: 'Han cambiado las reglas. Algunas cosas han salido de los aros.', pt: 'As regras mudaram e algumas coisas saíram dos arcos.', nl: 'De regels zijn veranderd. Sommige dingen zijn teruggekomen.', sv: 'Reglerna har ändrats. Några saker har lämnat ringarna.', da: 'Reglerne er skiftet. Nogle ting er kommet ud af ringene igen.', no: 'Reglene er endret. Noen ting måtte ut av ringene igjen.', fi: 'Säännöt vaihtuivat. Osa esineistä palasi takaisin.' },
    hintChildTurn:  { en: 'Hand the board to a child. They choose the rules; the class works them out.', de: 'Ein Kind legt die Regeln fest – die Klasse findet sie heraus.', fr: 'Passez la main à un élève. Il choisit les règles, la classe les devine.', it: 'Lascia scegliere le regole a un bambino: la classe deve indovinarle.', es: 'Dale la pizarra a alguien de la clase: pone las reglas y los demás las adivinan.', pt: 'Passe a vez para uma criança: ela escolhe as regras e a turma descobre quais são.', nl: 'Geef de beurt aan een kind. Het kind kiest de regels, de klas raadt ze.', sv: 'Låt ett barn ta över. Barnet väljer reglerna och klassen listar ut dem.', da: 'Lad et barn vælge reglerne. Resten af klassen regner dem ud.', no: 'Gi brettet til et barn. Barnet velger reglene, og klassen finner dem ut.', fi: 'Anna vuoro lapselle. Lapsi valitsee säännöt, ja muu luokka päättelee ne.' },

    /* --- refusals --- */
    refuseNoRule:   { en: 'Set a rule for at least one hoop first.', de: 'Zuerst braucht mindestens ein Reifen eine Regel.', fr: 'Choisissez d’abord une règle pour au moins un cerceau.', it: 'Prima scegli una regola per almeno un cerchio.', es: 'Pon primero una regla en algún aro.', pt: 'Escolha uma regra para pelo menos um arco.', nl: 'Stel eerst voor minstens één hoepel een regel in.', sv: 'Välj en regel för minst en ring först.', da: 'Vælg først en regel til mindst én af ringene.', no: 'Velg først en regel for minst én ring.', fi: 'Aseta ensin sääntö ainakin toiselle vanteelle.' },
    refuseSameRule: { en: 'Both hoops would be asking about the same thing. Choose a different question.', de: 'Der andere Reifen sortiert schon nach dieser Eigenschaft. Bitte eine andere wählen.', fr: 'L’autre cerceau trie déjà là-dessus. Choisissez une autre question.', it: 'L’altro cerchio usa già questa domanda. Scegline un’altra.', es: 'El otro aro ya usa esa pregunta. Elige otra distinta.', pt: 'O outro arco já usa esse mesmo tipo de regra. Escolha outro tipo.', nl: 'Beide hoepels vragen naar hetzelfde. Kies iets anders.', sv: 'Den andra ringen sorterar redan efter samma fråga. Välj en annan fråga.', da: 'Den anden ring bruger allerede det spørgsmål. Vælg et andet.', no: 'Den andre ringen sorterer allerede etter dette. Velg et annet spørsmål.', fi: 'Toisessa vanteessa on jo tämä kysymys. Valitse toinen kysymys.' },
    refuseNoPair:   { en: 'With those two rules one part of the mat would stay empty. Choose another.', de: 'Diese beiden Regeln passen nicht zusammen. Bitte eine andere wählen.', fr: 'Avec cette règle, un des quatre espaces du tapis resterait vide. Choisissez-en une autre.', it: 'Queste due regole non stanno bene insieme. Scegline un’altra.', es: 'Con esas dos reglas algún hueco se quedaría vacío. Elige otra.', pt: 'Essas duas regras não formam um bom par. Tente outra.', nl: 'Met deze twee regels blijft een deel van de mat leeg. Kies iets anders.', sv: 'Med de två reglerna blir någon del av mattan tom. Välj en annan.', da: 'Med de to regler bliver et af felterne tomt. Vælg en anden.', no: 'Disse to reglene fyller ikke alle fire feltene. Velg en annen regel.', fi: 'Nämä kaksi sääntöä eivät jaa esineitä kunnolla. Valitse toinen.' },
    putBack:        { en: 'Nothing moved', de: 'Zurückgelegt', fr: 'Rien n’a bougé', it: 'Non si è mosso niente', es: 'No se ha movido nada', pt: 'Continua no lugar', nl: 'Blijft liggen', sv: 'Ingenting flyttades', da: 'Fortrudt', no: 'Tilbake der den lå', fi: 'Peruttu' },

    /* --- rule family questions. Spoken ONCE, in the panel heading; never
       repeated on the value. That is what collapses 26 chips reading
       "The word starts with <letter>" into an alphabet strip. --- */
    famColour:    { en: 'What colour is it?', de: 'Welche Farbe hat es?', fr: 'Quelle est sa couleur ?', it: 'Di che colore è?', es: '¿De qué color es?', pt: 'Qual é a cor?', nl: 'Welke kleur is het?', sv: 'Vilken färg har den?', da: 'Hvilken farve har den?', no: 'Hvilken farge har den?', fi: 'Minkä värinen se on?' },
    famShape:     { en: 'What shape is it?', de: 'Welche Form hat es?', fr: 'Quelle est sa forme ?', it: 'Che forma ha?', es: '¿Qué forma tiene?', pt: 'Qual é a forma?', nl: 'Welke vorm is het?', sv: 'Vilken form har den?', da: 'Hvilken form har den?', no: 'Hvilken form har den?', fi: 'Minkä muotoinen se on?' },
    famSize:      { en: 'How big is the block?', de: 'Wie groß ist die Form?', fr: 'Quelle taille fait la pièce ?', it: 'Quanto è grande il blocco?', es: '¿Es grande o pequeño el bloque?', pt: 'O bloco é grande ou pequeno?', nl: 'Hoe groot is het?', sv: 'Hur stor är klossen?', da: 'Hvor stor er klodsen?', no: 'Hvor stor er brikken?', fi: 'Kuinka iso palikka on?' },
    famSyll:      { en: 'How many beats does the word have?', de: 'Wie viele Silben hat das Wort?', fr: 'Combien de syllabes ?', it: 'Quante sillabe ha la parola?', es: '¿Cuántas sílabas tiene la palabra?', pt: 'Quantas sílabas tem a palavra?', nl: 'Hoeveel klankgroepen heeft het woord?', sv: 'Hur många stavelser har ordet?', da: 'Hvor mange stavelser har ordet?', no: 'Hvor mange stavelser har ordet?', fi: 'Montako tavua sanassa on?' },
    famInitial:   { en: 'What sound does the word start with?', de: 'Welchen Anlaut hat das Wort?', fr: 'Par quel son commence le mot ?', it: 'Con che suono comincia la parola?', es: '¿Por qué sonido empieza la palabra?', pt: 'Com que som a palavra começa?', nl: 'Met welke klank begint het woord?', sv: 'Vilket ljud börjar ordet på?', da: 'Hvilken lyd begynder ordet med?', no: 'Hvilken lyd begynner ordet med?', fi: 'Millä äänteellä sana alkaa?' },
    famLiving:    { en: 'Is it alive, was it once, or never?', de: 'Lebt es?', fr: 'Est-ce vivant ?', it: 'È vivo?', es: '¿Está vivo, lo estuvo o nunca lo estuvo?', pt: 'Isso está vivo, já esteve ou nunca esteve?', nl: 'Leeft het, of heeft het geleefd?', sv: 'Lever den?', da: 'Lever den, eller har den levet?', no: 'Lever den?', fi: 'Onko se elossa?' },
    famNatural:   { en: 'Who made it?', de: 'Haben Menschen es gemacht?', fr: 'Qui l’a fabriqué ?', it: 'L’hanno fatto le persone?', es: '¿Lo han hecho las personas?', pt: 'Quem fez isso?', nl: 'Wie heeft het gemaakt?', sv: 'Har människor gjort den?', da: 'Har mennesker lavet den?', no: 'Hvem har laget den?', fi: 'Ovatko ihmiset tehneet sen?' },
    famEdible:    { en: 'Can we eat it?', de: 'Kann man es essen?', fr: 'Est-ce que ça se mange ?', it: 'Si può mangiare?', es: '¿Se puede comer?', pt: 'Dá para comer?', nl: 'Kun je het opeten?', sv: 'Kan man äta den?', da: 'Kan man spise den?', no: 'Kan vi spise den?', fi: 'Voiko sen syödä?' },
    famMoves:     { en: 'How does it move?', de: 'Wie bewegt es sich?', fr: 'Comment ça bouge ?', it: 'Si muove da solo?', es: '¿Se mueve solo, lo mueven o no se mueve?', pt: 'Como isso se move?', nl: 'Hoe komt het in beweging?', sv: 'Hur rör den sig?', da: 'Hvordan bevæger den sig?', no: 'Hvordan beveger den seg?', fi: 'Liikkuuko se itsestään?' },
    famSizeBand:  { en: 'How big is the real thing?', de: 'Wie groß ist es in Wirklichkeit?', fr: 'Quelle taille fait l’objet en vrai ?', it: 'Nella realtà, quanto è grande?', es: '¿De qué tamaño es de verdad?', pt: 'Que tamanho isso tem de verdade?', nl: 'Hoe groot is het in het echt?', sv: 'Hur stor är den på riktigt?', da: 'Hvor stor er den i virkeligheden?', no: 'Hvor stor er den i virkeligheten?', fi: 'Kuinka iso se on oikeasti?' },
    famHabitat:   { en: 'Where does it live?', de: 'Wo lebt es?', fr: 'Où est-ce que ça vit ?', it: 'Dove vive?', es: '¿Dónde vive?', pt: 'Onde isso vive?', nl: 'Waar leeft het?', sv: 'Var lever den?', da: 'Hvor lever den?', no: 'Hvor lever den?', fi: 'Missä se elää?' },

    /* --- rule sentences; {v} is the value label. These are what the class
       hears at the reveal, so they stay whole sentences. --- */
    rColour:      { en: 'It is {v}', de: 'Es ist {v}', fr: 'C’est {v}', it: 'È {v}', es: 'Es {v}', pt: 'É {v}', nl: 'Het is {v}', sv: 'Den är {v}', da: 'Den er {v}', no: 'Den er {v}', fi: 'Se on {v}' },
    rShape:       { en: 'It is a {v}', de: 'Es ist ein {v}', fr: 'C’est un {v}', it: 'È un {v}', es: 'Es un {v}', pt: 'É um {v}', nl: 'Het is een {v}', sv: 'Det är en {v}', da: 'Det er en {v}', no: 'Det er en {v}', fi: 'Se on {v}' },
    rSize:        { en: 'It is {v}', de: 'Es ist {v}', fr: 'C’est {v}', it: 'È {v}', es: 'Es {v}', pt: 'É {v}', nl: 'Het is {v}', sv: 'Den är {v}', da: 'Den er {v}', no: 'Den er {v}', fi: 'Se on {v}' },
    rLiving:      { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rNatural:     { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rEdible:      { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rMoves:       { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rSizeBand:    { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rHabitat:     { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    /* ⚠ ONE BEAT AND TWO BEATS ARE TWO STRINGS. The shipped tool read
       "The word has 1 beats" in English, and Silbe/Silben, sílaba/sílabas
       and tavu/tavua all inflect. */
    rSyll1:       { en: 'The word has 1 beat', de: 'Das Wort hat 1 Silbe', fr: 'Le mot a 1 syllabe', it: 'La parola ha 1 sillaba', es: 'La palabra tiene 1 sílaba', pt: 'A palavra tem 1 sílaba', nl: 'Het woord heeft 1 klankgroep', sv: 'Ordet har 1 stavelse', da: 'Ordet har 1 stavelse', no: 'Ordet har 1 stavelse', fi: 'Sanassa on 1 tavu' },
    rSyll:        { en: 'The word has {v} beats', de: 'Das Wort hat {v} Silben', fr: 'Le mot a {v} syllabes', it: 'La parola ha {v} sillabe', es: 'La palabra tiene {v} sílabas', pt: 'A palavra tem {v} sílabas', nl: 'Het woord heeft {v} klankgroepen', sv: 'Ordet har {v} stavelser', da: 'Ordet har {v} stavelser', no: 'Ordet har {v} stavelser', fi: 'Sanassa on {v} tavua' },
    rInitial:     { en: 'The word starts with {v}', de: 'Das Wort fängt mit {v} an', fr: 'Le mot commence par {v}', it: 'La parola comincia con {v}', es: 'La palabra empieza por {v}', pt: 'A palavra começa com {v}', nl: 'Het woord begint met {v}', sv: 'Ordet börjar på {v}', da: 'Ordet begynder med {v}', no: 'Ordet begynner med {v}', fi: 'Sana alkaa äänteellä {v}' },

    /* --- value labels --- */
    vRed:         { en: 'red', de: 'rot', fr: 'rouge', it: 'rosso', es: 'rojo', pt: 'vermelho', nl: 'rood', sv: 'röd', da: 'rød', no: 'rød', fi: 'punainen' },
    vBlue:        { en: 'blue', de: 'blau', fr: 'bleu', it: 'blu', es: 'azul', pt: 'azul', nl: 'blauw', sv: 'blå', da: 'blå', no: 'blå', fi: 'sininen' },
    vYellow:      { en: 'yellow', de: 'gelb', fr: 'jaune', it: 'giallo', es: 'amarillo', pt: 'amarelo', nl: 'geel', sv: 'gul', da: 'gul', no: 'gul', fi: 'keltainen' },
    vGreen:       { en: 'green', de: 'grün', fr: 'vert', it: 'verde', es: 'verde', pt: 'verde', nl: 'groen', sv: 'grön', da: 'grøn', no: 'grønn', fi: 'vihreä' },
    vCircle:      { en: 'circle', de: 'Kreis', fr: 'cercle', it: 'cerchio', es: 'círculo', pt: 'círculo', nl: 'cirkel', sv: 'cirkel', da: 'cirkel', no: 'sirkel', fi: 'ympyrä' },
    vSquare:      { en: 'square', de: 'Quadrat', fr: 'carré', it: 'quadrato', es: 'cuadrado', pt: 'quadrado', nl: 'vierkant', sv: 'kvadrat', da: 'kvadrat', no: 'kvadrat', fi: 'neliö' },
    vTriangle:    { en: 'triangle', de: 'Dreieck', fr: 'triangle', it: 'triangolo', es: 'triángulo', pt: 'triângulo', nl: 'driehoek', sv: 'triangel', da: 'trekant', no: 'trekant', fi: 'kolmio' },
    vHexagon:     { en: 'hexagon', de: 'Sechseck', fr: 'hexagone', it: 'esagono', es: 'hexágono', pt: 'hexágono', nl: 'zeshoek', sv: 'sexhörning', da: 'sekskant', no: 'sekskant', fi: 'kuusikulmio' },
    vBig:         { en: 'big', de: 'groß', fr: 'grand', it: 'grande', es: 'grande', pt: 'grande', nl: 'groot', sv: 'stor', da: 'stor', no: 'stor', fi: 'iso' },
    vSmall:       { en: 'small', de: 'klein', fr: 'petit', it: 'piccolo', es: 'pequeño', pt: 'pequeno', nl: 'klein', sv: 'liten', da: 'lille', no: 'liten', fi: 'pieni' },
    vLiving:      { en: 'It is alive', de: 'Es lebt', fr: 'C’est vivant', it: 'È vivo', es: 'Está vivo', pt: 'Está vivo', nl: 'Het leeft', sv: 'Den lever', da: 'Den lever', no: 'Den lever', fi: 'Se elää' },
    vOnceLiving:  { en: 'It was alive once', de: 'Es hat einmal gelebt', fr: 'C’était vivant autrefois', it: 'Una volta era vivo', es: 'Estuvo vivo alguna vez', pt: 'Já esteve vivo', nl: 'Het heeft ooit geleefd', sv: 'Den har levt en gång', da: 'Den har levet engang', no: 'Den har levd en gang', fi: 'Se on joskus elänyt' },
    vNeverLiving: { en: 'It was never alive', de: 'Es hat nie gelebt', fr: 'Ça n’a jamais été vivant', it: 'Non è mai stato vivo', es: 'Nunca estuvo vivo', pt: 'Nunca esteve vivo', nl: 'Het heeft nooit geleefd', sv: 'Den har aldrig levt', da: 'Den har aldrig levet', no: 'Den har aldri levd', fi: 'Se ei ole koskaan elänyt' },
    vNatural:     { en: 'Nobody made it', de: 'Niemand hat es gemacht', fr: 'Personne ne l’a fabriqué', it: 'Non l’ha fatto nessuno', es: 'Nadie lo ha hecho', pt: 'Ninguém o fez', nl: 'Niemand heeft het gemaakt', sv: 'Ingen har gjort den', da: 'Ingen har lavet den', no: 'Ingen har laget den', fi: 'Kukaan ei ole tehnyt sitä' },
    vMade:        { en: 'People made it', de: 'Menschen haben es gemacht', fr: 'Ce sont les gens qui l’ont fabriqué', it: 'L’hanno fatto le persone', es: 'Lo han hecho las personas', pt: 'As pessoas é que o fizeram', nl: 'Mensen hebben het gemaakt', sv: 'Människor har gjort den', da: 'Mennesker har lavet den', no: 'Mennesker har laget den', fi: 'Ihmiset ovat tehneet sen' },
    vEdible:      { en: 'We can eat it', de: 'Man kann es essen', fr: 'On peut le manger', it: 'Si può mangiare', es: 'Se puede comer', pt: 'Dá para comer', nl: 'Je kunt het opeten', sv: 'Man kan äta den', da: 'Man kan spise den', no: 'Man kan spise den', fi: 'Sen voi syödä' },
    vNotEdible:   { en: 'We do not eat it', de: 'Man isst es nicht', fr: 'On ne le mange pas', it: 'Non si mangia', es: 'No se come', pt: 'Não se come', nl: 'Je eet het niet op', sv: 'Man äter inte den', da: 'Man spiser den ikke', no: 'Man spiser den ikke', fi: 'Sitä ei syödä' },
    vSelf:        { en: 'It moves by itself', de: 'Es bewegt sich von allein', fr: 'Ça bouge tout seul', it: 'Si muove da solo', es: 'Se mueve solo', pt: 'Move-se sozinho', nl: 'Het beweegt uit zichzelf', sv: 'Den rör sig själv', da: 'Den bevæger sig selv', no: 'Den beveger seg selv', fi: 'Se liikkuu itsestään' },
    vMoved:       { en: 'Something else moves it', de: 'Etwas anderes bewegt es', fr: 'C’est autre chose qui le fait bouger', it: 'Lo muove qualcos’altro', es: 'Lo mueve otra cosa', pt: 'Outra coisa é que o move', nl: 'Iets anders beweegt het', sv: 'Något annat flyttar den', da: 'Noget andet flytter den', no: 'Noe annet flytter den', fi: 'Jokin muu liikuttaa sitä' },
    vStill:       { en: 'It stays where it is', de: 'Es bleibt, wo es ist', fr: 'Ça reste où c’est', it: 'Sta dov’è', es: 'Se queda donde está', pt: 'Fica onde está', nl: 'Het blijft waar het is', sv: 'Den står kvar där den är', da: 'Den bliver, hvor den er', no: 'Den blir der den er', fi: 'Se pysyy paikallaan' },
    vHand:        { en: 'It fits in your hand', de: 'Es passt in deine Hand', fr: 'Ça tient dans ta main', it: 'Sta nella tua mano', es: 'Cabe en tu mano', pt: 'Cabe na tua mão', nl: 'Het past in je hand', sv: 'Den får plats i din hand', da: 'Den kan være i din hånd', no: 'Den får plass i hånda di', fi: 'Se mahtuu kämmenelle' },
    vPerson:      { en: 'It is about as big as you', de: 'Es ist ungefähr so groß wie du', fr: 'C’est à peu près grand comme toi', it: 'È grande più o meno come te', es: 'Es más o menos así de grande como tú', pt: 'É mais ou menos do teu tamanho', nl: 'Het is ongeveer even groot als jij', sv: 'Den är ungefär lika stor som du', da: 'Den er cirka lige så stor som dig', no: 'Den er omtrent så stor som deg', fi: 'Se on suunnilleen sinun kokoisesi' },
    vBigger:      { en: 'It is bigger than a grown-up', de: 'Es ist größer als ein Erwachsener', fr: 'C’est plus grand qu’un adulte', it: 'È più grande di un adulto', es: 'Es más grande que una persona mayor', pt: 'É maior do que um adulto', nl: 'Het is groter dan een volwassene', sv: 'Den är större än en vuxen', da: 'Den er større end en voksen', no: 'Den er større enn en voksen', fi: 'Se on isompi kuin aikuinen' },
    vLand:        { en: 'It lives on land', de: 'Es lebt an Land', fr: 'Ça vit sur la terre', it: 'Vive sulla terra', es: 'Vive en la tierra', pt: 'Vive em terra', nl: 'Het leeft op het land', sv: 'Den lever på land', da: 'Den lever på land', no: 'Den lever på land', fi: 'Se elää maalla' },
    vWater:       { en: 'It lives in water', de: 'Es lebt im Wasser', fr: 'Ça vit dans l’eau', it: 'Vive nell’acqua', es: 'Vive en el agua', pt: 'Vive na água', nl: 'Het leeft in het water', sv: 'Den lever i vatten', da: 'Den lever i vand', no: 'Den lever i vann', fi: 'Se elää vedessä' },
    vAir:         { en: 'It flies in the air', de: 'Es fliegt in der Luft', fr: 'Ça vole dans les airs', it: 'Vola nell’aria', es: 'Vuela por el aire', pt: 'Voa pelo ar', nl: 'Het vliegt door de lucht', sv: 'Den flyger i luften', da: 'Den flyver i luften', no: 'Den flyr i lufta', fi: 'Se lentää ilmassa' },

    /* --- settings + gates --- */
    setSpeak:     { en: 'Say the word when a picture is tapped', de: 'Das Wort sagen, wenn ein Bild angetippt wird', fr: 'Dire le mot quand on touche une image', it: 'Di’ la parola quando si tocca un’immagine', es: 'Decir la palabra al tocar una imagen', pt: 'Dizer a palavra ao tocar numa imagem', nl: 'Het woord zeggen als je op een plaatje tikt', sv: 'Säg ordet när man trycker på en bild', da: 'Sig ordet, når man trykker på et billede', no: 'Si ordet når man trykker på et bilde', fi: 'Sano sana, kun kuvaa napautetaan' },
    gatePrint:    { en: 'Printing is part of the Teacher plan.', de: 'Das Drucken gehört zum Lehrer-Paket.', fr: 'L’impression fait partie de l’offre Enseignant.', it: 'La stampa fa parte del piano Insegnante.', es: 'La impresión es parte del plan Docente.', pt: 'A impressão faz parte do plano Professor.', nl: 'Afdrukken hoort bij het Leerkracht-pakket.', sv: 'Utskrift ingår i Lärarpaketet.', da: 'Udskrivning er en del af Lærerpakken.', no: 'Utskrift er en del av Lærerpakken.', fi: 'Tulostus kuuluu Opettaja-tilaukseen.' },
    gateRules:    { en: 'The picture rules are part of the Teacher plan.', de: 'Die Bildregeln gehören zum Lehrer-Paket.', fr: 'Les règles sur les images font partie de l’offre Enseignant.', it: 'Le regole sulle immagini fanno parte del piano Insegnante.', es: 'Las reglas sobre las imágenes son parte del plan Docente.', pt: 'As regras sobre as imagens fazem parte do plano Professor.', nl: 'De regels bij de plaatjes horen bij het Leerkracht-pakket.', sv: 'Bildreglerna ingår i Lärarpaketet.', da: 'Billedreglerne er en del af Lærerpakken.', no: 'Bildereglene er en del av Lærerpakken.', fi: 'Kuvasäännöt kuuluvat Opettaja-tilaukseen.' },
    unlock:       { en: 'See the Teacher plan', de: 'Lehrer-Paket ansehen', fr: 'Voir l’offre Enseignant', it: 'Vedi il piano Insegnante', es: 'Ver el plan Docente', pt: 'Ver o plano Professor', nl: 'Bekijk het Leerkracht-pakket', sv: 'Se Lärarpaketet', da: 'Se Lærerpakken', no: 'Se Lærerpakken', fi: 'Katso Opettaja-tilaus' },
    privacyLine:  { en: 'Nothing here is saved, counted or sent anywhere.', de: 'Hier wird nichts gespeichert, gezählt oder irgendwohin gesendet.', fr: 'Rien ici n’est enregistré, compté ni envoyé où que ce soit.', it: 'Qui non si salva, non si conta e non si invia nulla.', es: 'Aquí no se guarda, no se cuenta ni se envía nada.', pt: 'Aqui nada é guardado, contado nem enviado para lugar nenhum.', nl: 'Hier wordt niets bewaard, geteld of ergens naartoe gestuurd.', sv: 'Ingenting här sparas, räknas eller skickas någonstans.', da: 'Intet her bliver gemt, talt eller sendt nogen steder hen.', no: 'Ingenting her blir lagret, talt eller sendt noe sted.', fi: 'Täällä ei tallenneta, lasketa eikä lähetetä mitään.' }
  },

  STORE_KEY: 'lcs:sorting-hoops:v2',
  ENT_TRUST_DAYS: 14,

  /* ⚠ `patterns` DEFAULTS ON. It is not a preference. Measured: yellow is
     1.94:1 on the cream ground and 1.10:1 over the lens tint, and under
     protanopia red and green collapse to dE 14.5. Colour is a SORTABLE
     ATTRIBUTE in this tool, so the redundant channel is the second half of
     the attribute, not an accessibility extra. Shipping it false shipped a
     tool unusable for roughly one boy in twelve. */
  defaults: { speak: true, patterns: true },
  settings: [
    { key: 'speak', type: 'toggle', labelKey: 'setSpeak' }
  ],

  premium: false,
  premiumKnown: false,

  /* =================================================================
     THE PALETTE — ONE TABLE. Eleven values that used to be spread over
     COLOURS[] in JS and eight string-concatenated CSS rules, where no
     reviewer and no locale panel could find them, and no gate could
     check them.
     ⚠ THE RING IS ACHROMATIC AND IT HAS TO BE. Measured dE00 from each
     candidate to the nearest block ink, worst across normal/protan/
     deutan/tritan: the shipped ring A was 0.0 (it was byte-identical to
     block blue), house teal 6.7, violet 4.5, brown 4.9, magenta 13.4,
     slate 13.7. Every hue is either an attribute or a dichromatic alias
     of one. #2A2A35 is 26.1 and 12.86:1 on cream.
     ONE ink for BOTH hoops: any lighter second neutral drifts into the
     protan olive band where red and green land. Hoop identity is
     position + caption, never hue — and never a NUMBER on the ring,
     because 1/2/3 are live syllable-rule values.
     ================================================================= */
  PALETTE: {
    ink:      '#2A2A35',
    inkSoft:  'rgba(42,42,53,.055)',
    inkLens:  'rgba(42,42,53,.115)',
    inkOver:  'rgba(42,42,53,.10)',
    blocks: {
      red:    { fill: '#A8271F', line: '#5E120D' },
      blue:   { fill: '#2E63B0', line: '#173A6C' },
      yellow: { fill: '#F2C63A', line: '#7A5A0C' },
      green:  { fill: '#5AA36A', line: '#1F5C36' }
    }
  },

  /* THE GEOMETRY — true circles, d = r so each centre sits on the other's
     rim. viewBox aspect 3:2, and the BOX is aspect-bound in CSS.
     ⚠ Capping the height of an unbound box yields a rectangle, the SVG
     letterboxes, and every %-positioned control drifts off what it drives
     — #43 cold-line shipped exactly that and drew each mark twice. */
  GEO: { w: 330, h: 220, r: 105, cxA: 112.5, cxB: 217.5, cy: 110 },

  COLOURS: [
    { k: 'red',    label: 'vRed' },
    { k: 'blue',   label: 'vBlue' },
    { k: 'yellow', label: 'vYellow' },
    { k: 'green',  label: 'vGreen' }
  ],
  SHAPES: [
    { k: 'circle',   label: 'vCircle' },
    { k: 'square',   label: 'vSquare' },
    { k: 'triangle', label: 'vTriangle' },
    { k: 'hexagon',  label: 'vHexagon' }
  ],
  SIZES: [
    { k: 'big',   label: 'vBig',   scale: 1 },
    { k: 'small', label: 'vSmall', scale: 0.62 }
  ],

  /* ⚠ PATHS CORRECTED FOR OPTICAL AREA, because SIZE is a sortable
     attribute. Measured areas of the shipped paths: circle 1018, square
     1156 (+13.6%), hexagon 1020, triangle 740 (-27.3%) — so a BIG
     triangle read "medium" and a size rule became a judgement call.
     Square 34->32 with r3 corners; triangle re-cut to base 46 x height 42.
     With the permanent 2.4u outline the four effective areas land within
     2.7% of each other. */
  GLYPH: {
    circle:   'M24 6a18 18 0 1 1 0 36 18 18 0 0 1 0-36z',
    square:   'M11 8h26a3 3 0 0 1 3 3v26a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3V11a3 3 0 0 1 3-3z',
    triangle: 'M24 2.5 47 44.5H1z',
    hexagon:  'M24 4 41 14v20L24 44 7 34V14z'
  },

  /* every block, deterministic order */
  blockSet: function () {
    var out = [], self = this;
    this.SHAPES.forEach(function (sh) {
      self.COLOURS.forEach(function (co) {
        self.SIZES.forEach(function (sz) {
          out.push({
            uid: 'b:' + sh.k + ':' + co.k + ':' + sz.k,
            kind: 'block', shape: sh.k, colour: co.k, size: sz.k
          });
        });
      });
    });
    return out;
  },

  /* =================================================================
     THE RULES. `satisfies` is PURE: no DOM, no storage, no locale. That
     is what lets the gate exhaust it over every (rule x item) pair.
     A rule is { f: <field>, v: <value> }.
     ⚠ THE `theme` FAMILY IS GONE. "It is a kind of Around the House" /
     "Miscellaneous" / "4th of July" are CMS folder names, not attributes
     a child can perceive. 47 of the 93 chips were that.
     ================================================================= */
  RULE_FAMILIES: [
    { f: 'colour',    tier: 'free',    world: 'block',   label: 'rColour',   q: 'famColour' },
    { f: 'shape',     tier: 'free',    world: 'block',   label: 'rShape',    q: 'famShape' },
    { f: 'size',      tier: 'free',    world: 'block',   label: 'rSize',     q: 'famSize' },
    { f: 'syllables', tier: 'free',    world: 'picture', label: 'rSyll',     q: 'famSyll' },
    { f: 'initial',   tier: 'free',    world: 'picture', label: 'rInitial',  q: 'famInitial' },
    { f: 'living',    tier: 'premium', world: 'picture', label: 'rLiving',   q: 'famLiving' },
    { f: 'natural',   tier: 'premium', world: 'picture', label: 'rNatural',  q: 'famNatural' },
    { f: 'edible',    tier: 'premium', world: 'picture', label: 'rEdible',   q: 'famEdible' },
    { f: 'moves',     tier: 'premium', world: 'picture', label: 'rMoves',    q: 'famMoves' },
    { f: 'size_band', tier: 'premium', world: 'picture', label: 'rSizeBand', q: 'famSizeBand' },
    { f: 'habitat',   tier: 'premium', world: 'picture', label: 'rHabitat',  q: 'famHabitat' }
  ],

  FIELD_VALUES: {
    living:    ['living', 'once_living', 'never_living'],
    natural:   ['natural', 'made'],
    edible:    ['yes', 'no'],
    moves:     ['self', 'moved', 'still'],
    size_band: ['hand', 'person', 'bigger'],
    /* `none` is deliberately absent: 604 of 933 carry it, it is not a
       place, and it is not offerable as "where does it live". */
    habitat:   ['land', 'water', 'air']
  },

  VALUE_LABEL: {
    'living:living': 'vLiving', 'living:once_living': 'vOnceLiving', 'living:never_living': 'vNeverLiving',
    'natural:natural': 'vNatural', 'natural:made': 'vMade',
    'edible:yes': 'vEdible', 'edible:no': 'vNotEdible',
    'moves:self': 'vSelf', 'moves:moved': 'vMoved', 'moves:still': 'vStill',
    'size_band:hand': 'vHand', 'size_band:person': 'vPerson', 'size_band:bigger': 'vBigger',
    'habitat:land': 'vLand', 'habitat:water': 'vWater', 'habitat:air': 'vAir',
    'size:big': 'vBig', 'size:small': 'vSmall'
  },

  /* ⚠ TOTAL by construction: an unknown field, or a field the item does
     not carry, is FALSE — never undefined and never a throw. */
  satisfies: function (rule, item) {
    if (!rule || !rule.f || !item) return false;
    switch (rule.f) {
      case 'colour':    return item.kind === 'block' && item.colour === rule.v;
      case 'shape':     return item.kind === 'block' && item.shape === rule.v;
      case 'size':      return item.kind === 'block' && item.size === rule.v;
      case 'syllables': return item.kind === 'picture' && item.syl === rule.v;
      case 'initial':   return item.kind === 'picture' && !!item.onset && item.onset === rule.v;
      case 'living': case 'natural': case 'edible':
      case 'moves': case 'size_band': case 'habitat':
        return item.kind === 'picture' && !!item.attr && item.attr[rule.f] === rule.v;
      default:          return false;
    }
  },

  /* which region an item TRULY belongs in. A null rule is an empty hoop,
     not a hoop that accepts everything and not one that accepts nothing —
     see `landingFor`, where a null rule means that hoop is not in play. */
  regionFor: function (item, ruleA, ruleB) {
    var a = ruleA ? this.satisfies(ruleA, item) : false;
    var b = ruleB ? this.satisfies(ruleB, item) : false;
    if (a && b) return 'both';
    if (a) return 'a';
    if (b) return 'b';
    return 'out';
  },

  /* =================================================================
     ⭐⭐ THE REFUSAL TABLE. The shipped tool wrote 'out' on ANY mismatch,
     so a whale that truly belonged in hoop B was filed OUTSIDE when a
     child dropped it into hoop A — and the outside pile is the tool's
     stated "other half of the evidence". A child reading it to deduce the
     rule was reading corrupted data.
       "Not where you put it" is NOT the same as "outside".
     PURE, so the gate can exhaust it.
     ================================================================= */
  landingFor: function (item, target, ruleA, ruleB) {
    var truth = this.regionFor(item, ruleA, ruleB);
    if (truth === target) return { land: target, kept: true };
    /* a genuine counter-example: it belongs nowhere, and the growing
       outside set is half the evidence */
    if (truth === 'out') return { land: 'out', kept: false };
    /* it belongs SOMEWHERE, just not here. It is undecided, not outside. */
    return { land: 'tray', kept: false };
  },

  /* a rule is only posable if it splits the pool */
  splits: function (rule, pool) {
    var yes = 0, no = 0, i;
    for (i = 0; i < pool.length; i++) {
      if (this.satisfies(rule, pool[i])) yes++; else no++;
      if (yes && no) return true;
    }
    return false;
  },

  /* ⚠ SPLITTING IS NOT ENOUGH. `habitat:water` splits 933 with 48 members,
     and with a 12-card tray that hoop is usually empty. The floor is two
     tray-fuls so the stratified dealer can always find three.
     ⚠⚠ BUT THE FLOOR IS RELATIVE TO THE POOL, NOT ABSOLUTE. A flat 24
     silently deleted the ENTIRE BLOCK WORLD: the Dienes set is 32 blocks
     and a colour rule has exactly 8 of them, so every block rule failed
     the floor and the family list rendered empty — the teacher clicked
     "I will choose" and got a blank panel. Caught by the gate, and the
     lesson is that a floor calibrated on a big SAMPLED pool cannot be
     applied unchanged to a small EXHAUSTIVE one. A quarter of the pool is
     the cap: 8 of 32 is a perfectly guessable rule. */
  RULE_FLOOR: 24,

  ruleFloor: function (pool) {
    return Math.max(3, Math.min(this.RULE_FLOOR, Math.ceil(pool.length / 4)));
  },

  ruleViable: function (rule, pool) {
    if (!rule) return true;
    var yes = 0, i;
    for (i = 0; i < pool.length; i++) if (this.satisfies(rule, pool[i])) yes++;
    return yes >= this.ruleFloor(pool) && yes < pool.length;
  },

  /* =================================================================
     ⭐ PAIR VIABILITY — five parts, all required.
     Two rules used to be chosen independently with no check that any card
     could satisfy both. Measured on the shipped tool: "it is alive" x "it
     was never alive" was freely offerable and its overlap is empty BY
     LOGICAL NECESSITY; `edible:yes` x `habitat:none` has ZERO A-only, so
     the diagram asserts an A-only region that can never fill; and both
     hoops could be given the IDENTICAL rule, after which every card landed
     in the lens and A and B could never be used at all.
     ================================================================= */
  pairStats: function (rA, rB, pool) {
    var both = 0, aOnly = 0, bOnly = 0, neither = 0, i, a, b;
    for (i = 0; i < pool.length; i++) {
      a = rA ? this.satisfies(rA, pool[i]) : false;
      b = rB ? this.satisfies(rB, pool[i]) : false;
      if (a && b) both++; else if (a) aOnly++; else if (b) bOnly++; else neither++;
    }
    return { both: both, aOnly: aOnly, bOnly: bOnly, neither: neither };
  },

  pairOK: function (rA, rB, pool) {
    if (!rA || !rB) return true;                    /* one-hoop lessons are fine */
    if (rA.f === rB.f) return false;                /* same field: contradiction, nesting or identity */
    var s = this.pairStats(rA, rB, pool);
    return s.both >= 2 && s.aOnly >= 2 && s.bOnly >= 2 && s.neither >= 2;
  },

  ruleLabel: function (rule) {
    if (!rule) return this.api.t('noRule');
    var fam = null, i;
    for (i = 0; i < this.RULE_FAMILIES.length; i++) if (this.RULE_FAMILIES[i].f === rule.f) fam = this.RULE_FAMILIES[i];
    if (!fam) return '';
    /* one beat and two beats are two sentences */
    if (rule.f === 'syllables' && rule.v === 1) return this.api.t('rSyll1');
    var vkey = this.VALUE_LABEL[rule.f + ':' + rule.v];
    var v = vkey ? this.api.t(vkey) : String(rule.v);
    if (rule.f === 'colour' || rule.f === 'shape') {
      var t = rule.f === 'colour' ? this.COLOURS : this.SHAPES, j;
      for (j = 0; j < t.length; j++) if (t[j].k === rule.v) v = this.api.t(t[j].label);
    }
    /* ⚠ a SOUND is written lower case. Upper case invites the letter's
       NAME ("ess") instead of the sound, which is the whole distinction
       this rule family exists to teach. Found by the sv panel. */
    if (rule.f === 'initial') v = String(rule.v).toLocaleLowerCase();
    return this.api.t(fam.label).replace('{v}', v);
  },

  /* the short value label used INSIDE the picker, where the family
     question is already the heading and the sentence must not repeat */
  valueLabel: function (rule) {
    if (rule.f === 'syllables') return String(rule.v);
    if (rule.f === 'initial') return String(rule.v).toLocaleLowerCase();
    var vkey = this.VALUE_LABEL[rule.f + ':' + rule.v];
    if (rule.f === 'colour' || rule.f === 'shape' || rule.f === 'size') {
      var t = rule.f === 'colour' ? this.COLOURS : rule.f === 'shape' ? this.SHAPES : this.SIZES, j;
      for (j = 0; j < t.length; j++) if (t[j].k === rule.v) return this.api.t(t[j].label);
    }
    return vkey ? this.api.t(vkey) : String(rule.v);
  },

  /* =================================================================
     ⭐ PER-LOCALE SYLLABLE VALUES, COMPUTED, NEVER HARDCODED.
     The shipped tool offered [1,2,3] in every language. Measured over the
     corpus: Italian has EIGHT one-syllable words in 933 (es 19, pt 17,
     fi 10), so a hidden "the word has 1 beat" rule in Italian is a hoop
     with no positive instance and a class that fails for ten minutes.
     Finnish meanwhile has 205 four-syllable words the tool never offered.
     ================================================================= */
  SYLL_FLOOR: 25,

  syllableValues: function (pool) {
    var count = {}, i, v, out = [];
    for (i = 0; i < pool.length; i++) {
      v = pool[i].syl;
      if (typeof v === 'number') count[v] = (count[v] || 0) + 1;
    }
    for (v = 1; v <= 6; v++) if ((count[v] || 0) >= this.SYLL_FLOOR) out.push(v);
    return out;
  },

  /* ⚠ INITIAL LETTER IS A LIE IN TEN OF ELEVEN LANGUAGES. `charAt(0)` put
     `cat` /k/, `city` /s/ and `chair` /tʃ/ in one hoop — and `c` is the
     LARGEST English bucket at 172 cards, which is exactly why it is
     excluded rather than kept. German Sch, Dutch sch, Spanish qu/ll,
     Italian ch/gl/gn/sc, Swedish sj/kj/stj are single sounds taught as
     units, so they are matched longest-first as single VALUES.
     ⚠ This table is a first pass by construction and is flagged for the
     native panels; the >=8 floor prunes whatever they leave. */
  ONSETS: {
    en: ['sh', 'ch', 'th', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'],
    /* ⚠ 'qu', 'v' and 'j' ADDED — Quark, Vogel and Jacke are ordinary German
       Anlaute and were silently dropped. Found by the de panel. */
    de: ['sch', 'sp', 'st', 'ch', 'pf', 'qu', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'],
    nl: ['sch', 'ch', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'],
    /* ⚠ 'g' REMOVED: /ʒ/ in girafe and /g/ in gâteau — the identical defect
       that excludes English 'c'. 'qu' and 'ph' ADDED: without them quatre got
       no onset at all and phare filed under P. Found by the fr panel. */
    fr: ['ch', 'ph', 'qu', 'gn', 'b', 'd', 'f', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v'],
    /* ⚠ 'v' and 'z' REMOVED. b and v are ONE sound in every variety of
       Spanish, and z/s are one under seseo (all of Latin America) — offering
       them as separate hoops asks a child to sort by SPELLING under a question
       that says "sound", and a class that hears vaca and barco as the same
       onset would be right while the hoop contradicted them. Found by the es
       panel. (c/g/k stay out: each spans two sounds, like English c.) */
    es: ['ch', 'll', 'qu', 'b', 'd', 'f', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't'],
    /* ⚠ 'sc' and 'gl' REMOVED, 'qu' ADDED. sc is /ʃ/ in scimmia and /sk/ in
       scuola; gl is /ʎ/ in aglio and /gl/ in globo — the English-'c' defect
       twice over, under a question that says "sound". ch/gh/gn are safe.
       Found by the it panel. */
    it: ['ch', 'gh', 'gn', 'qu', 'b', 'd', 'f', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'z'],
    /* ⚠ 'lh' and 'nh' REMOVED — neither can begin a Portuguese word, so both
       were dead values. 'qu' ADDED (always /k/). Found by the pt panel.
       (Vowel onsets stay out across every locale: they are a harder task and
       are excluded at K by the pedagogy ruling, not by oversight.) */
    pt: ['ch', 'qu', 'b', 'd', 'f', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'z'],
    /* ⚠ 'sk', 'k' and 'g' REMOVED — in Swedish each spells TWO sounds
       (sked /ɧ/ vs sko /sk/; kul /k/ vs kil /ɕ/; gata /g/ vs gilla /j/), which
       is the identical defect that excludes English 'c'. A hidden "starts
       with K" hoop would keep *ko* and *kil* together while a Swedish
       six-year-old sounding them out hears two different sounds — a phonics
       error inside the tool's own headline invention. Found by the sv panel.
       (skj/stj/sj are all /ɧ/ and want merging to ONE value; the >=8 floor
       prunes them for now. Flagged for the phonics pass.) */
    sv: ['sj', 'kj', 'tj', 'b', 'd', 'f', 'h', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v'],
    /* ⚠ THE DANISH TABLE WAS PART NORWEGIAN AND HAD NO BARE 'k'. 'skj' is not
       Danish orthography at all (Norwegian skje; Danish is ske), 'kj' survives
       in a handful of words where Danish says plain [k], and Danish <sk> is
       two sounds [sg̥] rather than the Swedish/Norwegian unit — while kat, ko,
       kage and kop, one of the largest buckets in the corpus, resolved to NO
       ONSET and were silently excluded from the whole family. `initial` is a
       FREE rule, so this shipped to every unpaying Danish classroom. Found by
       the da panel. */
    da: ['b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v'],
    no: ['skj', 'sk', 'kj', 'b', 'd', 'f', 'g', 'h', 'j', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v'],
    /* ⚠ FINNISH IS THE ONE LOCALE WHERE THE VOWELS BELONG, and leaving them
       out deleted roughly a quarter of the Finnish pool AND the lessons
       Finnish eskari does FIRST: alkuäänne teaching starts with a/i/o/u
       precisely because vowels are the easiest sound to isolate, so a teacher
       could not pose the most natural Finnish version of the rule at all.
       auto, omena, ikkuna, avain, oksa all resolved to NO onset. b/d/g/f added
       for the loanwords (banaani, delfiini, gorilla); the >=8 floor prunes
       whatever the pool cannot carry. Found by the fi panel.
       (Vowel onsets stay OUT of the other ten: there they are a harder task
       than consonants and are excluded at K by the pedagogy ruling. Finnish is
       the exception because its orthography is one-to-one.) */
    fi: ['a', 'e', 'i', 'o', 'u', 'y', 'ä', 'ö', 'b', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v']
  },
  ONSET_FLOOR: 8,

  /* PURE: give it a word and a locale's onset list, get the onset or null */
  onsetOf: function (word, list) {
    if (!word || !list) return null;
    var w = String(word).toLocaleLowerCase(), i;
    for (i = 0; i < list.length; i++) if (w.indexOf(list[i]) === 0) return list[i];
    return null;
  },

  onsetValues: function (pool) {
    var count = {}, i, o, out = [];
    for (i = 0; i < pool.length; i++) {
      o = pool[i].onset;
      if (o) count[o] = (count[o] || 0) + 1;
    }
    for (o in count) if (Object.prototype.hasOwnProperty.call(count, o) && count[o] >= this.ONSET_FLOOR) out.push(o);
    return out.sort();
  },

  /* =================================================================
     THE LESSON PRESETS — the first drawer. Ordered by difficulty, from
     the first time a child meets `neither` to the Grade-2 capstone whose
     overlap is empty and whose whole point is the argument about the car.
     `sep:true` marks a DISJOINT pair: it bypasses pairOK deliberately and
     the mat draws two SEPARATE rings, because an empty lens is only a
     lesson when it was chosen, never when it was stumbled into.
     ================================================================= */
  PRESETS: [
    { id: 'p1',  w: 'block',   a: { f: 'colour', v: 'red' },        b: { f: 'colour', v: 'blue' },        sep: true },
    { id: 'p2',  w: 'block',   a: { f: 'shape', v: 'circle' },      b: { f: 'colour', v: 'red' } },
    { id: 'p3',  w: 'block',   a: { f: 'size', v: 'big' },          b: { f: 'shape', v: 'triangle' } },
    { id: 'p4',  w: 'block',   a: { f: 'size', v: 'small' },        b: { f: 'colour', v: 'yellow' } },
    { id: 'p5',  w: 'block',   a: { f: 'shape', v: 'hexagon' },     b: { f: 'colour', v: 'green' } },
    { id: 'p6',  w: 'picture', a: { f: 'syllables', v: 2 },         b: { f: 'initial', v: 'b' } },
    { id: 'p7',  w: 'picture', a: { f: 'syllables', v: 1 },         b: { f: 'initial', v: 's' } },
    { id: 'p8',  w: 'picture', a: { f: 'syllables', v: 3 },         b: { f: 'initial', v: 'p' } },
    { id: 'p9',  w: 'picture', a: { f: 'living', v: 'living' },     b: { f: 'habitat', v: 'water' } },
    { id: 'p10', w: 'picture', a: { f: 'moves', v: 'self' },        b: { f: 'size_band', v: 'bigger' } },
    { id: 'p11', w: 'picture', a: { f: 'edible', v: 'yes' },        b: { f: 'natural', v: 'natural' } },
    { id: 'p12', w: 'picture', a: { f: 'living', v: 'once_living' },b: { f: 'edible', v: 'yes' } },
    { id: 'p13', w: 'picture', a: { f: 'natural', v: 'made' },      b: { f: 'size_band', v: 'hand' } },
    { id: 'p14', w: 'picture', a: { f: 'moves', v: 'still' },       b: { f: 'natural', v: 'natural' } },
    { id: 'p15', w: 'picture', a: { f: 'natural', v: 'made' },      b: { f: 'moves', v: 'self' },        sep: true }
  ],

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectSortingHoopsCSS();
    document.body.classList.add('hp-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.mode = 'labelled';      /* 'labelled' | 'guess' | 'child' */
    this.world = 'block';        /* 'block' | 'picture' */
    this.phase = 'sort';         /* 'setup' | 'sort' */
    this.cursor = { hoop: null, family: null };
    this.ruleA = null;
    this.ruleB = null;
    this.sep = false;
    this.revealed = false;
    this.armClear = false;
    this.carry = null;           /* uid being carried */
    this.carryTarget = null;
    this._said = null;
    this.dealt = [];             /* everything dealt this round, wherever it sits */
    this.placement = {};         /* uid -> 'tray'|'a'|'b'|'both'|'out' */
    this.pool = [];
    this._pictures = null;
    this._flip = null;           /* {uid, rect} for the FLIP release */
    this._timers = [];

    this._fetchEntitlement();
    this._newRound();
    this.render();
  },

  /* the shell's reset control is TOTAL — mode, rules and mat. `Clear the
     mat` is placements only. Otherwise the tool ships two controls with
     one behaviour and one of them is mislabelled. */
  reset: function () {
    this.mode = 'labelled';
    this.phase = 'sort';
    this.cursor = { hoop: null, family: null };
    this.ruleA = null; this.ruleB = null; this.sep = false;
    this.revealed = false; this.armClear = false;
    this.carry = null; this.carryTarget = null; this._said = null;
    this._sawRelease = false;
    this._newRound();
    this.render();
  },

  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); },

  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 2;
    return s;
  },
  _saveStore: function () {
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
  },

  /* ⚠ UNKNOWN ENTITLEMENT IS PESSIMISTIC, but a pessimistic unknown must
     not render as a FALSE LOCK: while premiumKnown is false the locked
     families render in a neutral pending state, because a paying teacher
     would otherwise watch the list re-render under them. */
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
    if (!token) { self.premium = false; self.premiumKnown = true; return; }
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

  /* =================================================================
     DATA. Pictures are a runtime join of the picture index, the attribute
     corpus, the syllable corpus and the K-2 pool. All four are already
     served; none is written here.
     ⚠ AN OFFLINE FALLBACK DEGRADES TO THE FREE TIER, NEVER TO NOTHING:
     a missing pool file means every attribute-carrying card, which is
     what shipped before, not an empty tray.
     ================================================================= */
  _loadPictures: function (then) {
    var self = this;
    if (this._pictures) { then(); return; }
    var loc = (this.api.lang || 'en');
    var get = function (u) { return fetch(u).then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; }); };
    Promise.all([
      get('/mini-tools/pww-index-' + loc + '.json'),
      get('/mini-tools/object-attributes.json'),
      get('/mini-tools/syllable-counts.json'),
      get('/mini-tools/sorting-hoops-pool.json')
    ]).then(function (res) {
      var syl = {};
      if (res[2] && res[2].keys) {
        Object.keys(res[2].keys).forEach(function (k) {
          if (res[2].keys[k][loc]) syl[k] = res[2].keys[k][loc];
        });
      }
      self._pictures = self.buildPictures(res[0], res[1], syl, res[3], self.ONSETS[loc] || self.ONSETS.en);
      then();
    }).catch(function () { self._pictures = []; then(); });
  },

  /* ⚠ PURE — the gate calls this with fixtures and no `init`, so it must
     touch no instance state and return everything the caller assigns.
     Keys with no attribute row are dropped rather than carried with holes,
     so a conceptual rule can never silently return false for a card the
     tray is actually showing. */
  buildPictures: function (idx, attrs, syl, pool, onsets) {
    if (!idx || !idx.themes || !attrs || !attrs.keys) return [];
    var allow = null, self = this;
    if (pool && pool.keys && pool.keys.length) {
      allow = {};
      pool.keys.forEach(function (k) { allow[k] = 1; });
    }
    var byKey = {};
    idx.themes.forEach(function (t) {
      t.c.forEach(function (c) {
        if (c.na) return;
        if (!attrs.keys[c.k]) return;
        if (allow && !allow[c.k]) return;
        if (byKey[c.k]) return;
        byKey[c.k] = {
          uid: 'p:' + c.k, kind: 'picture', key: c.k, word: c.s,
          file: c.f, dir: t.d, attr: attrs.keys[c.k],
          syl: (syl && syl[c.k]) || null,
          onset: self.onsetOf(c.s, onsets)
        };
      });
    });
    return Object.keys(byKey).sort().map(function (k) { return byKey[k]; });
  },

  /* =================================================================
     ROUNDS. `dealt` is the store; the tray is a VIEW over it.
     The shipped tool made `this.tray` both, and `_itemByUid` searched only
     it — so a refill could not append and a re-deal orphaned everything on
     the mat while stale uids piled up in `placement`.
     ================================================================= */
  TRAY_SIZE: 12,

  trayItems: function () {
    var self = this;
    return this.dealt.filter(function (it) { return self.placement[it.uid] === 'tray'; });
  },

  _newRound: function () {
    var self = this;
    this.dealt = [];
    this.placement = {};
    this.revealed = false;
    this._sawRelease = false;
    if (this.world === 'block') {
      this.pool = this.blockSet();
      this._deal(this.TRAY_SIZE);
      return;
    }
    this._loadPictures(function () {
      self.pool = self._pictures.slice();
      self._deal(self.TRAY_SIZE);
      if (self._wrap) self.render();
    });
  },

  /* a rule may only be posed over items that CARRY the field it reads */
  _applicable: function (item, rule) {
    if (!rule) return true;
    if (rule.f === 'syllables') return item.kind !== 'picture' || !!item.syl;
    if (rule.f === 'initial') return item.kind !== 'picture' || !!item.onset;
    return true;
  },

  /* ⚠ THE STRATIFIED DEALER RUNS IN EVERY MODE. The shipped one balanced
     only `if (mode==='guess' && (ruleA||ruleB))`; everything else took
     `p.slice(0,12)` off a shuffle, and that uniform path is what handed a
     five-year-old Dimetrodon, Parasaurolophus and a Vacuum Cleaner.
     With rules set it deals round-robin across the four regions so every
     region the rules can produce is represented. With no rules it strates
     across `living`, so every tray is sortable on at least one axis. */
  _deal: function (n) {
    var self = this, i, j, t;
    var already = {};
    this.dealt.forEach(function (it) { already[it.uid] = 1; });
    var p = this.pool.filter(function (it) {
      return !already[it.uid] && self._applicable(it, self.ruleA) && self._applicable(it, self.ruleB);
    });
    for (i = p.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1)); t = p[i]; p[i] = p[j]; p[j] = t;
    }

    var buckets, order;
    if (this.ruleA || this.ruleB) {
      buckets = { both: [], a: [], b: [], out: [] };
      for (i = 0; i < p.length; i++) buckets[this.regionFor(p[i], this.ruleA, this.ruleB)].push(p[i]);
      order = ['both', 'a', 'b', 'out'];
    } else if (this.world === 'picture') {
      buckets = {};
      order = [];
      for (i = 0; i < p.length; i++) {
        var key = (p[i].attr && p[i].attr.living) || 'x';
        if (!buckets[key]) { buckets[key] = []; order.push(key); }
        buckets[key].push(p[i]);
      }
    } else {
      buckets = {};
      order = [];
      for (i = 0; i < p.length; i++) {
        if (!buckets[p[i].shape]) { buckets[p[i].shape] = []; order.push(p[i].shape); }
        buckets[p[i].shape].push(p[i]);
      }
    }

    var out = [], round = 0;
    while (out.length < n && round < n + 2) {
      var took = false;
      for (i = 0; i < order.length && out.length < n; i++) {
        var b = buckets[order[i]];
        if (b && round < b.length) { out.push(b[round]); took = true; }
      }
      if (!took) break;
      round++;
    }
    for (i = 0; i < out.length; i++) {
      this.dealt.push(out[i]);
      this.placement[out[i].uid] = 'tray';
    }
  },

  _itemByUid: function (uid) {
    var i;
    for (i = 0; i < this.dealt.length; i++) if (this.dealt[i].uid === uid) return this.dealt[i];
    return null;
  },

  /* how many pool items have not been dealt this round — the thing that
     decides whether `More things` can act at all */
  _undealt: function () {
    var already = {}, self = this, n = 0;
    this.dealt.forEach(function (it) { already[it.uid] = 1; });
    this.pool.forEach(function (it) {
      if (!already[it.uid] && self._applicable(it, self.ruleA) && self._applicable(it, self.ruleB)) n++;
    });
    return n;
  },

  _availableRules: function (field) {
    var self = this, out = [];
    this.RULE_FAMILIES.forEach(function (fam) {
      if (fam.world !== self.world) return;
      if (field && fam.f !== field) return;
      if (fam.tier === 'premium' && !self.premium) return;
      var vals = [];
      if (fam.f === 'colour') vals = self.COLOURS.map(function (c) { return c.k; });
      else if (fam.f === 'shape') vals = self.SHAPES.map(function (s) { return s.k; });
      else if (fam.f === 'size') vals = self.SIZES.map(function (s) { return s.k; });
      else if (fam.f === 'syllables') vals = self.syllableValues(self.pool);
      else if (fam.f === 'initial') vals = self.onsetValues(self.pool);
      else vals = self.FIELD_VALUES[fam.f] || [];
      vals.forEach(function (v) {
        var rule = { f: fam.f, v: v };
        if (self.ruleViable(rule, self.pool)) out.push(rule);
      });
    });
    return out;
  },

  /* families offered in the picker, with their tier so a locked one can be
     shown IN POSITION with its real question rather than hidden */
  _families: function () {
    var self = this, out = [];
    this.RULE_FAMILIES.forEach(function (fam) {
      if (fam.world !== self.world) return;
      var locked = fam.tier === 'premium' && !self.premium;
      var pending = fam.tier === 'premium' && !self.premiumKnown;
      var n = locked || pending ? 1 : self._availableRules(fam.f).length;
      if (!locked && !pending && !n) return;
      out.push({ fam: fam, locked: locked && self.premiumKnown, pending: pending, n: n });
    });
    return out;
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },
  _clearTimers: function () { this._timers.forEach(clearTimeout); this._timers = []; },

  _say: function (text) {
    if (!this.api.settings.speak || !text) return;
    try { LCSAudio.speak({ type: 'word', text: String(text), lang: this.api.lang, rate: 0.9 }); } catch (_) {}
  },

  /* ⚠ THE ARM DIES WITH ITS WARNING. `confirmClear` used to vanish after
     4.2s while `armClear` stayed set indefinitely — so a teacher who
     tapped Clear, got distracted, and tapped it again ten minutes later
     wiped the class's work with no prompt on screen at all. The English
     promises a two-press gesture; after the warning goes it was a
     one-press gesture. Three native panels found this independently. */
  _refuse: function (key) {
    this._said = key;
    var self = this;
    this.render();
    this._after(4200, function () {
      if (self._said !== key) return;
      self._said = null;
      if (key === 'confirmClear') self.armClear = false;
      self.render();
    });
  },

  /* =================================================================
     THE DROP — the whole instrument is in here.
     ================================================================= */
  _place: function (uid, target) {
    var item = this._itemByUid(uid);
    if (!item) return;
    var from = this.placement[uid];
    if (from === target) { this.carry = null; this.carryTarget = null; this.render(); return; }

    /* FLIP, half one: where is it NOW, on screen */
    var node = this._wrap && this._wrap.querySelector('.hp-tile[data-uid="' + cssEsc(uid) + '"]');
    var was = node ? node.getBoundingClientRect() : null;

    var kept = true, land = target;
    /* Only guess-my-rule and the child mode enforce. A LABELLED sort shows
       the rules and accepts whatever is dropped — the class is the
       corrector, and that is the activity that comes BEFORE guess-my-rule
       in every scheme of work. */
    if (this.mode !== 'labelled' && (this.ruleA || this.ruleB) && target !== 'tray') {
      var r = this.landingFor(item, target, this.ruleA, this.ruleB);
      land = r.land; kept = r.kept;
    }

    this.placement[uid] = land;
    this.carry = null;
    this.carryTarget = null;
    if (kept) { this.api.sound(660); this._pulse = land; }
    else { this.api.sound(330); if (land === 'out') this._sawRelease = true; }
    this._flip = was ? { uid: uid, rect: was, kept: kept } : null;

    this.api.announce(this._regionName(land) + ': ' + this._itemName(item));
    this.render();
  },

  _itemName: function (item) {
    if (item.kind === 'picture') return item.word || item.key;
    return this.api.t(this._labelOf('size', item.size)) + ' ' +
           this.api.t(this._labelOf('colour', item.colour)) + ' ' +
           this.api.t(this._labelOf('shape', item.shape));
  },

  /* ⚠ THE ANNOUNCEMENT STATES WHERE IT IS, NEVER WHETHER IT WAS RIGHT.
     The accessible layer must be identical in KIND to the visual one, and
     the visual one never says right or wrong. */
  _regionName: function (r) {
    if (r === 'a') return this.api.t('hoopA');
    if (r === 'b') return this.api.t('hoopB');
    if (r === 'both') return this.api.t('hoopA') + ' + ' + this.api.t('hoopB');
    if (r === 'out') return this.api.t('outsideLabel');
    return this.api.t('trayLabel');
  },

  /* =================================================================
     RENDER — dispatches on phase. The setup panel REPLACES THE MAT, in
     the mat's own footprint, so it appears where the teacher is already
     looking and can never be the thing below the fold.
     ================================================================= */
  _FALLBACK: function (key) {
    if (key.indexOf('tile:') === 0) return 'mode:guess';
    if (key.indexOf('val:') === 0) return 'back';
    if (key.indexOf('fam:') === 0) return 'back';
    if (key.indexOf('hoop:') === 0) return 'start';
    return 'mode:guess';
  },

  render: function () {
    var api = this.api;
    /* ⚠⚠ render() MUST NOT CLEAR THE TIMERS, and this is the same defect
       this rebuild was commissioned to fix — reproduced inside its own fix.
       The shipped tool set a 900ms timer in `_drop` and then called
       `render()`, whose first act was `_clearTimers()`, so the release
       animation never once fired in production.
       I wrote `_clearTimers()` at the head of render() and then armed a
       5000ms `_ruleChanged` timer in `_startSorting` immediately before its
       own `render()` — killing it, so the "the rules changed" band was
       STUCK ON permanently and masked every other guess-mode hint.
       Measured: 1 timer armed, 0 alive, `_ruleChanged` true forever. A
       Norwegian panel found it by reading the model.
       Every timer here already guards on the state it is about to clear
       (`if (self._said !== key) return`), so outliving a render is safe and
       is what makes a timed hint a timed hint. */

    /* focus, half one — ⚠ only ever restores focus that was ALREADY inside
       .hp-wrap, so it cannot steal focus at boot and cannot yank a teacher
       out of the shell's settings drawer when commitSettings re-renders. */
    var prev = document.activeElement;
    var key = (this._wrap && prev && this._wrap.contains(prev))
      ? prev.getAttribute('data-fk') : null;
    if (this._focusNext) { key = this._focusNext; this._focusNext = null; }

    api.stage.innerHTML = '';
    var wrap = api.el('div', 'hp-wrap');
    this._wrap = wrap;

    wrap.appendChild(this._buildBar());
    wrap.appendChild(this._buildHint());
    var board = api.el('div', 'hp-board');
    if (this.phase === 'setup') board.appendChild(this._buildSetup());
    else board.appendChild(this._buildMat());
    board.appendChild(this._buildTray());
    wrap.appendChild(board);
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);

    /* the printable lives OUTSIDE the wrap: print hides .hp-wrap entirely
       and a sheet inside it would inherit that */
    this._ensureSheet(api.stage);

    this._wireInput();
    this._runFlip();

    /* focus, half two */
    if (key) {
      var el = wrap.querySelector('[data-fk="' + cssEsc(key) + '"]') ||
               wrap.querySelector('[data-fk="' + cssEsc(this._FALLBACK(key)) + '"]');
      if (el) { try { el.focus(); } catch (_) {} }
    }
  },

  _chip: function (label, on, fn, extra, fk) {
    var b = this.api.el('button', 'hp-chip' + (on ? ' hp-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    if (fk) b.setAttribute('data-fk', fk);
    b.addEventListener('click', fn);
    return b;
  },

  /* ---------------- the control bar ---------------- */
  _buildBar: function () {
    var self = this, api = this.api;
    var bar = api.el('div', 'hp-bar');

    var modes = api.el('div', 'hp-seg');
    modes.setAttribute('role', 'radiogroup');
    modes.setAttribute('aria-label', api.t('setRule'));
    [['labelled', 'modeLabelled'], ['guess', 'modeGuess'], ['child', 'modeChild']].forEach(function (m) {
      var b = self._chip(api.t(m[1]), self.mode === m[0], function () { self._setMode(m[0]); }, '', 'mode:' + m[0]);
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', self.mode === m[0] ? 'true' : 'false');
      modes.appendChild(b);
    });
    bar.appendChild(modes);

    var worlds = api.el('div', 'hp-seg');
    worlds.setAttribute('role', 'radiogroup');
    worlds.setAttribute('aria-label', api.t('trayLabel'));
    [['block', 'trayBlocks'], ['picture', 'trayPictures']].forEach(function (w) {
      var b = self._chip(api.t(w[1]), self.world === w[0], function () { self._setWorld(w[0]); }, '', 'world:' + w[0]);
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', self.world === w[0] ? 'true' : 'false');
      worlds.appendChild(b);
    });
    bar.appendChild(worlds);
    return bar;
  },

  /* ⚠ CLICKING THE ALREADY-SELECTED MODE IS NOT A NO-OP. The first version
     returned early, so "Labelled sort" while already in a labelled sort did
     nothing at all and the liveness gate scored it DEAD — correctly. A
     control that is on screen and enabled has to act. Re-selecting the
     current mode re-opens its setup, which is what a teacher pressing the
     mode they are already in is asking for. */
  _setMode: function (m) {
    this.mode = m;
    this.revealed = false;
    this.armClear = false;
    /* ⚠ Every mode needs rules, so every mode enters through setup. The
       shipped tool let guess-mode run with ruleA and ruleB both null,
       printed "Hidden" over rules that did not exist, and then released
       EVERY card that was dropped into a hoop. That state is now
       unreachable. */
    this.phase = 'setup';
    this.cursor = { hoop: null, family: null };
    this._focusNext = 'surprise:a';
    this.render();
  },

  _setWorld: function (w) {
    /* ⚠ same reason as _setMode: an enabled control that does nothing is
       dead, and the liveness gate is right to say so. Re-selecting the
       world you are already in opens its setup — it does NOT re-deal and
       does NOT clear the rules, because nothing about the material changed
       and the mat must survive. */
    if (this.world === w) {
      this.phase = 'setup';
      this.cursor = { hoop: null, family: null };
      this._focusNext = 'setuphead';
      this.render();
      return;
    }
    this.world = w;
    this.ruleA = null; this.ruleB = null; this.sep = false;
    this.revealed = false;
    this.phase = 'setup';
    this.cursor = { hoop: null, family: null };
    this._focusNext = 'surprise:a';
    this._newRound();
    this.render();
  },

  /* ---------------- the hint band ----------------
     ⚠ THE TOOL'S ONLY EXPLANATION. `strings.instruction` is rendered by
     the shell under the <h1> and hidden by `.lcs-app.embed
     .lcs-instruction{display:none}` — and `.embed` is set on ANY iframed
     load, so every production surface hides it. It survives in the
     role="application" accessible name, which is why it is duplicated
     here rather than moved.
     No ARIA role: the shell already owns a polite live region and a second
     one would double every announcement. The room reads the band; the
     screen reader gets api.announce. */
  _buildHint: function () {
    var api = this.api;
    var h = api.el('div', 'hp-hint' + (this._said ? ' hp-hint-refuse' : ''));
    h.textContent = api.t(this._hintKey());
    return h;
  },

  _hintKey: function () {
    if (this._said) return this._said;
    if (this.phase === 'setup') {
      if (this.mode === 'child' && !this.ruleA && !this.ruleB) return 'hintChildTurn';
      /* ⚠ hintSecret is checked BEFORE hintChoose. The first version put
         hintChoose first, so the moment a teacher tapped "I will choose" in
         guess mode the band promised "the class will see this rule" two
         lines from hintSecret promising the opposite — one panel called it
         "the same panel contradicting itself", and three found it. */
      if (this.mode !== 'labelled' && (this.ruleA || this.ruleB) && !this.cursor.hoop) return 'hintSecret';
      return 'hintChoose';
    }
    if (this.carry) return 'hintCarry';
    if (this._ruleChanged) return 'hintRuleChanged';
    if (!this.trayItems().length && this.dealt.length) return 'hintTrayEmpty';
    if (this.mode === 'labelled') {
      var placed = this._countPlaced();
      if (!placed.total) return 'hintOpenStart';
      /* ⚠ A SEPARATED-RINGS LESSON HAS NO LENS, so the lens rung would pin
         forever. `sep` draws two regions only and `_regionAt` never returns
         'both', so placed.both is 0 by construction — and p1 and p15, the
         two presets whose whole pedagogy is that the overlap is empty on
         purpose, are exactly the `sep` ones. Four panels found this. */
      if (!this.sep && !placed.both) return 'hintOpenLens';
      return 'hintOpenBoth';
    }
    if (this.revealed) return 'hintRevealed';
    var c = this._countPlaced();
    /* ⚠ THE RELEASE IS A RECORDED EVENT, NOT AN INFERENCE FROM THE PILE.
       Counting the outside pile said "the hoop let that one go" about a
       card the child had deliberately and CORRECTLY dropped outside, where
       landingFor returns kept:true. The model stores WHERE a card is; it
       now also remembers that a release happened. */
    if (c.kept && this._sawRelease) return 'hintGuessRead';
    if (this._sawRelease) return 'hintGuessOut';
    return 'hintGuessStart';
  },

  _countPlaced: function () {
    var self = this, c = { total: 0, both: 0, out: 0, kept: 0 };
    this.dealt.forEach(function (it) {
      var w = self.placement[it.uid];
      if (!w || w === 'tray') return;
      c.total++;
      if (w === 'both') { c.both++; c.kept++; }
      else if (w === 'out') c.out++;
      else c.kept++;
    });
    return c;
  },

  /* ---------------- the mat ----------------
     ⚠ HIT-TESTING AND DRAWING ARE THE SAME EQUATION. The shipped tool laid
     three absolutely-positioned rectangles over two stretched ellipses;
     measured along the midline at 1024px, FOUR BANDS totalling ~14% of the
     ring width hit nothing at all (34-38% and 62-64% among them — exactly
     where a child aiming at the middle aims), and a drop there silently
     did nothing. The zone corners also fell OUTSIDE the ring they belonged
     to, so the drawing and the model disagreed in a tool whose one thesis
     is that the hoop decides. */
  _buildMat: function () {
    var api = this.api, self = this, G = this.GEO;
    var mat = api.el('div', 'hp-mat');

    var rings = api.el('div', 'hp-rings');
    rings.setAttribute('data-hit', '1');

    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'hp-svg');
    svg.setAttribute('viewBox', '0 0 ' + G.w + ' ' + G.h);
    svg.setAttribute('aria-hidden', 'true');

    /* ⚠ instance-unique ids: two tools on one page, or the tool plus its
       own print sheet, sharing a clipPath id clip against whichever was
       parsed last. */
    /* ⚠ the centres are computed BEFORE the defs, because _lensClip reads
       them. Computing them after left the clip path on the PREVIOUS
       render's geometry — invisible until the separated-rings preset, and
       then wrong by 26 units. */
    var sepShift = this.sep ? 26 : 0;
    var cxA = G.cxA - sepShift, cxB = G.cxB + sepShift;
    this._cx = { a: cxA, b: cxB };

    var uid = 'hp' + (SortingHoops._svgSeq = (SortingHoops._svgSeq || 0) + 1);
    var defs = document.createElementNS(SVGNS, 'defs');
    defs.appendChild(this._lensClip(uid));
    defs.appendChild(this._wellFilter(uid));
    svg.appendChild(defs);

    mkCircle(svg, cxA, G.cy, G.r, 'hp-fill');
    mkCircle(svg, cxB, G.cy, G.r, 'hp-fill');
    if (!this.sep) {
      var lens = mkCircle(svg, cxB, G.cy, G.r, 'hp-lens');
      lens.setAttribute('clip-path', 'url(#' + uid + 'clip)');
      lens.setAttribute('filter', 'url(#' + uid + 'well)');
    }
    /* the rings LAST, so the two arcs read as one continuous hoop */
    mkCircle(svg, cxA, G.cy, G.r, 'hp-ring');
    mkCircle(svg, cxB, G.cy, G.r, 'hp-ring');
    /* the specular highlight that makes a flat ink ring read as a round
       tube rather than a drawn circle */
    mkCircle(svg, cxA, G.cy - 1.5, G.r, 'hp-ring-hi');
    mkCircle(svg, cxB, G.cy - 1.5, G.r, 'hp-ring-hi');
    rings.appendChild(svg);

    /* the caption plates + the tile shelves. These LAY OUT; they do not
       receive the pointer. */
    var regions = this.sep ? ['a', 'b'] : ['a', 'both', 'b'];
    regions.forEach(function (r) {
      var z = api.el('div', 'hp-zone hp-zone-' + r + (self.sep ? ' hp-zone-sep' : ''));
      z.setAttribute('role', 'group');
      z.setAttribute('aria-label', self._capName(r));
      var cap = api.el('div', 'hp-cap');
      cap.textContent = self._capFor(r);
      z.appendChild(cap);
      var slot = api.el('div', 'hp-slot');
      slot.setAttribute('data-slot', r);
      z.appendChild(slot);
      rings.appendChild(z);
    });
    mat.appendChild(rings);

    /* ⚠ OUTSIDE IS THE REST OF THE MAT, NOT A FIFTH BOX. The shipped one
       was a rounded, tinted, separate container below the rings — which
       teaches that there are three sets rather than two sets inside a
       universe, and children who learn "neither" as a box do not later
       generalise to the complement. */
    var out = api.el('div', 'hp-out');
    out.setAttribute('role', 'group');
    out.setAttribute('aria-label', api.t('outsideLabel'));
    var ol = api.el('div', 'hp-outlabel');
    ol.textContent = api.t('outsideLabel');
    out.appendChild(ol);
    var oslot = api.el('div', 'hp-slot hp-slot-out');
    oslot.setAttribute('data-slot', 'out');
    out.appendChild(oslot);
    mat.appendChild(out);

    this.dealt.forEach(function (it) {
      var where = self.placement[it.uid];
      if (!where || where === 'tray') return;
      if (self.sep && where === 'both') where = 'a';
      var host = mat.querySelector('[data-slot="' + where + '"]');
      if (host) host.appendChild(self._tile(it));
    });

    /* an empty hoop draws a dotted placeholder — the apparatus giving its
       own instruction without a word */
    regions.forEach(function (r) {
      var host = mat.querySelector('[data-slot="' + r + '"]');
      if (host && !host.children.length) {
        var g = api.el('div', 'hp-ghost-card');
        g.setAttribute('aria-hidden', 'true');
        host.appendChild(g);
      }
    });
    return mat;
  },

  /* ⚠ the lens aria-label used to be the bare word "Both", which a screen
     reader announced with no antecedent. It names both hoops instead. */
  _capName: function (r) {
    if (r === 'a') return this.api.t('hoopA');
    if (r === 'b') return this.api.t('hoopB');
    return this.api.t('hoopA') + ' + ' + this.api.t('hoopB');
  },

  /* ⚠ THE LENS IS CAPTIONED. _capFor('both') used to return '' — the one
     region the tool is named for was the only unlabelled one on the mat. */
  _capFor: function (r) {
    var api = this.api;
    var hidden = this.mode !== 'labelled' && !this.revealed;
    if (r === 'both') {
      if (hidden) return api.t('capBoth');
      var la = this.ruleA ? this.ruleLabel(this.ruleA) : null;
      var lb = this.ruleB ? this.ruleLabel(this.ruleB) : null;
      if (la && lb) return la + ' + ' + lb;
      return api.t('capBoth');
    }
    var rule = r === 'a' ? this.ruleA : this.ruleB;
    var name = api.t(r === 'a' ? 'hoopA' : 'hoopB');
    if (hidden) return name + ' — ' + api.t('hiddenRule');
    if (!rule) return name + ' — ' + api.t('noRule');
    return this.ruleLabel(rule);
  },

  /* ---------------- the tray ---------------- */
  _buildTray: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'hp-tray');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('trayLabel'));
    var lab = api.el('div', 'hp-traylabel');
    lab.textContent = api.t('trayLabel');
    box.appendChild(lab);
    var slot = api.el('div', 'hp-slot hp-slot-tray');
    slot.setAttribute('data-slot', 'tray');
    var items = this.trayItems();
    items.forEach(function (it) { slot.appendChild(self._tile(it)); });
    /* ⚠ AN EMPTY TRAY KEEPS ITS BOX. A container that vanishes is the
       "objects randomly disappear" complaint in a new dress. */
    if (!items.length) {
      var g = api.el('div', 'hp-ghost-card hp-ghost-wide');
      g.setAttribute('aria-hidden', 'true');
      slot.appendChild(g);
    }
    box.appendChild(slot);
    return box;
  },

  _tile: function (item) {
    var api = this.api;
    var carried = this.carry === item.uid;
    var t = api.el('button', 'hp-tile' + (item.kind === 'block' ? ' hp-tile-block' : '') +
      (carried ? ' hp-carry' : ''));
    t.type = 'button';
    t.setAttribute('data-uid', item.uid);
    t.setAttribute('data-fk', 'tile:' + item.uid);
    if (carried) t.setAttribute('aria-grabbed', 'true');
    if (item.kind === 'block') {
      t.appendChild(this._blockGlyph(item));
      t.setAttribute('aria-label', this._itemName(item));
    } else {
      var img = document.createElement('img');
      img.className = 'hp-pic';
      img.src = '/image-library-webp/themes/' + item.dir + '/' + item.file + '@2x.webp';
      img.alt = '';
      img.loading = 'lazy';
      t.appendChild(img);
      var cap = api.el('span', 'hp-word');
      cap.textContent = item.word || item.key;
      t.appendChild(cap);
      /* ⚠ the picture tile's only accessible name used to be the <img alt> */
      t.setAttribute('aria-label', item.word || item.key);
    }
    return t;
  },

  _labelOf: function (fam, v) {
    var t = fam === 'colour' ? this.COLOURS : fam === 'shape' ? this.SHAPES : this.SIZES, i;
    for (i = 0; i < t.length; i++) if (t[i].k === v) return t[i].label;
    return 'vSmall';
  },

  /* ⚠ THE PATTERN CHANNEL IS A FILL TEXTURE, NOT A STROKE. The shipped one
     applied width 0/3/5/7 white dashed STROKES to the shape path: a 7-unit
     stroke on a 48-unit hexagon eats 3.5 units inward and rounds the
     vertices (SHAPE is sortable), the differing widths made green blocks
     visibly larger than red ones (SIZE is sortable), and red was coded by
     ABSENCE, which is indistinguishable from the setting being off.
     Two attributes damaged to protect a third.
     ⚠ stroke-width is 2.4/sc: transform:scale() multiplies the stroke, so
     a naive constant thins the small block's outline by 38% at exactly the
     size that needs it most. */
  _blockGlyph: function (item) {
    var C = this.PALETTE.blocks[item.colour] || { fill: '#888', line: '#333' };
    var sc = item.size === 'small' ? 0.62 : 1;
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'hp-block');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('aria-hidden', 'true');
    if (this.api.settings.patterns !== false) {
      var defs = document.createElementNS(SVGNS, 'defs');
      this._texturePatterns(defs, item.colour);
      svg.appendChild(defs);
    }
    var p = document.createElementNS(SVGNS, 'path');
    p.setAttribute('d', this.GLYPH[item.shape]);
    p.setAttribute('transform', 'translate(24 24) scale(' + sc + ') translate(-24 -24)');
    p.setAttribute('fill', this.api.settings.patterns !== false
      ? 'url(#hpTex-' + item.colour + ')' : C.fill);
    /* the permanent outline — always on, patterns or not. Yellow over the
       lens tint measures 1.10:1 without it and 4.30:1 with it. */
    p.setAttribute('stroke', C.line);
    p.setAttribute('stroke-width', (2.4 / sc).toFixed(3));
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('stroke-linecap', 'round');
    svg.appendChild(p);
    return svg;
  },

  _texturePatterns: function (defs, only) {
    var self = this;
    var mk = function (k) {
      if (defs.querySelector('#hpTex-' + k)) return;
      var C = self.PALETTE.blocks[k];
      var pat = document.createElementNS(SVGNS, 'pattern');
      pat.setAttribute('id', 'hpTex-' + k);
      pat.setAttribute('width', '6'); pat.setAttribute('height', '6');
      /* userSpaceOnUse so a SMALL block shows fewer repeats at the same
         weight — the period must never become a size cue */
      pat.setAttribute('patternUnits', 'userSpaceOnUse');
      if (k === 'blue') pat.setAttribute('patternTransform', 'rotate(45)');
      var bg = document.createElementNS(SVGNS, 'rect');
      bg.setAttribute('width', '6'); bg.setAttribute('height', '6');
      bg.setAttribute('fill', C.fill);
      pat.appendChild(bg);
      var marks = {
        red:    [['rect', { width: 6, height: 2 }]],
        blue:   [['rect', { width: 2, height: 6 }]],
        yellow: [['circle', { cx: 3, cy: 3, r: 1.5 }]],
        green:  [['rect', { width: 6, height: 1.6 }], ['rect', { width: 1.6, height: 6 }]]
      }[k] || [];
      marks.forEach(function (m) {
        var e = document.createElementNS(SVGNS, m[0]);
        for (var a in m[1]) if (Object.prototype.hasOwnProperty.call(m[1], a)) e.setAttribute(a, m[1][a]);
        e.setAttribute('fill', C.line);
        pat.appendChild(e);
      });
      defs.appendChild(pat);
    };
    if (only) mk(only);
    else ['red', 'blue', 'yellow', 'green'].forEach(mk);
  },

  _lensClip: function (uid) {
    var G = this.GEO;
    var cp = document.createElementNS(SVGNS, 'clipPath');
    cp.setAttribute('id', uid + 'clip');
    var c = document.createElementNS(SVGNS, 'circle');
    c.setAttribute('cx', this._cx ? this._cx.a : G.cxA);
    c.setAttribute('cy', G.cy); c.setAttribute('r', G.r);
    cp.appendChild(c);
    return cp;
  },

  /* the lens is made prominent by STRUCTURE, not ink: tint alone cannot
     carry it, because deepening it destroys the yellow block sitting in
     it (measured 1.10:1 at the shipped lens value already). */
  _wellFilter: function (uid) {
    var f = document.createElementNS(SVGNS, 'filter');
    f.setAttribute('id', uid + 'well');
    f.setAttribute('x', '-20%'); f.setAttribute('y', '-20%');
    f.setAttribute('width', '140%'); f.setAttribute('height', '140%');
    var seq = [
      ['feOffset', { dx: 0, dy: 2.5, 'in': 'SourceAlpha', result: 'o' }],
      ['feGaussianBlur', { stdDeviation: 3, 'in': 'o', result: 'b' }],
      ['feComposite', { operator: 'out', 'in': 'b', in2: 'SourceAlpha', result: 'sh' }],
      ['feFlood', { 'flood-color': this.PALETTE.ink, 'flood-opacity': '.38' }],
      ['feComposite', { operator: 'in', in2: 'sh' }],
      ['feComposite', { operator: 'over', in2: 'SourceGraphic' }]
    ];
    seq.forEach(function (s) {
      var e = document.createElementNS(SVGNS, s[0]);
      for (var a in s[1]) if (Object.prototype.hasOwnProperty.call(s[1], a)) e.setAttribute(a, s[1][a]);
      f.appendChild(e);
    });
    return f;
  },

  /* =================================================================
     THE SETUP PANEL. Occupies the mat's footprint, so it appears where
     the teacher is already looking.
     ================================================================= */
  _buildSetup: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'hp-setup');

    if (this.cursor.hoop && this.cursor.family) return this._buildValueStep(box);
    if (this.cursor.hoop) return this._buildFamilyStep(box);

    var head = api.el('div', 'hp-setuphead');
    head.textContent = api.t('setRule');
    head.setAttribute('tabindex', '-1');
    head.setAttribute('data-fk', 'setuphead');
    box.appendChild(head);

    /* the ready-made lessons — the first drawer, ordered by difficulty */
    var presets = this._validPresets();
    if (presets.length) {
      var lw = api.el('div', 'hp-lessons');
      var ll = api.el('div', 'hp-lessonlabel');
      ll.textContent = api.t('lessonsTab');
      lw.appendChild(ll);
      var lg = api.el('div', 'hp-lessongrid');
      presets.forEach(function (pr) {
        lg.appendChild(self._chip(
          self.ruleLabel(pr.a) + ' + ' + self.ruleLabel(pr.b), false,
          function () { self._applyPreset(pr); }, '', 'preset:' + pr.id));
      });
      lw.appendChild(lg);
      box.appendChild(lw);
    }

    var cards = api.el('div', 'hp-hoopcards');
    ['a', 'b'].forEach(function (h) {
      cards.appendChild(self._hoopCard(h));
    });
    box.appendChild(cards);

    var go = this._chip(api.t('startBtn'), false, function () { self._startSorting(); }, 'hp-primary', 'start');
    box.appendChild(go);
    return box;
  },

  _hoopCard: function (h) {
    var api = this.api, self = this;
    var rule = h === 'a' ? this.ruleA : this.ruleB;
    var card = api.el('div', 'hp-hoopcard hp-hoopcard-' + h);
    var t = api.el('div', 'hp-hooptitle');
    t.textContent = api.t(h === 'a' ? 'hoopA' : 'hoopB');
    card.appendChild(t);

    var state = api.el('div', 'hp-hoopstate');
    /* ⚠ NEVER THE RULE TEXT IN GUESS MODE, even in setup: the class is
       looking at the board. In a LABELLED sort it is shown, because the
       whole point of that mode is that the labels are visible. */
    state.textContent = !rule ? api.t('noRule')
      : (this.mode === 'labelled' ? this.ruleLabel(rule) : api.t('ruleSet'));
    card.appendChild(state);

    /* ⚠ "A child sets it" had NO behaviour — every branch tested
       mode !== 'labelled', so it was byte-for-byte Guess-my-rule plus one
       sentence. Three panels said a teacher will look for a difference that
       is not there. The difference is now real and it is the honest one:
       the whole point of that mode is that a CHILD chooses, so the tool
       does not offer to choose for them. */
    if (this.mode !== 'child') {
      card.appendChild(this._chip(api.t('surpriseBtn'), false, function () { self._surprise(h); },
        'hp-primary', 'surprise:' + h));
    }
    card.appendChild(this._chip(api.t('chooseBtn'), false, function () {
      self.cursor = { hoop: h, family: null }; self._focusNext = 'back'; self.render();
    }, '', 'choose:' + h));
    card.appendChild(this._chip(api.t('noRule'), false, function () {
      if (h === 'a') self.ruleA = null; else self.ruleB = null;
      self.render();
    }, '', 'none:' + h));
    return card;
  },

  /* ⚠ A PRESET IS OFFERED ONLY IF THE CURRENT POOL CAN CARRY IT. A hidden
     "the word has 1 beat" lesson is fine in English and impossible in
     Italian, where the corpus holds eight such words — so the preset list
     is filtered against the same viability the picker uses, not shipped as
     a fixed menu that is a lie in four locales. `sep` presets bypass the
     pair check DELIBERATELY: their empty lens is the lesson. */
  _validPresets: function () {
    var self = this;
    if (!this.pool || !this.pool.length) return [];
    return this.PRESETS.filter(function (p) {
      if (p.w !== self.world) return false;
      if (!self.ruleViable(p.a, self.pool) || !self.ruleViable(p.b, self.pool)) return false;
      return p.sep ? true : self.pairOK(p.a, p.b, self.pool);
    });
  },

  _applyPreset: function (p) {
    this.ruleA = p.a; this.ruleB = p.b; this.sep = !!p.sep;
    this.cursor = { hoop: null, family: null };
    this._focusNext = 'start';
    this._startSorting();
  },

  _buildFamilyStep: function (box) {
    var api = this.api, self = this, h = this.cursor.hoop;
    box.appendChild(this._backRow(api.t(h === 'a' ? 'hoopA' : 'hoopB')));
    var list = api.el('div', 'hp-famlist');
    var other = h === 'a' ? this.ruleB : this.ruleA;
    this._families().forEach(function (f) {
      /* ⚠ THE PANEL MUST NOT OFFER A GUARANTEED DEAD END. pairOK rejects on
         the same FIELD, so opening the question the other hoop already uses
         showed a grid in which every single chip was dimmed, and the only
         feedback was a refusal after tapping a dead one. Found by the sv
         panel reading the model. */
      var spent = !!(other && other.f === f.fam.f);
      var row = api.el('button', 'hp-famrow' + (f.locked ? ' hp-locked' : '') +
        (f.pending ? ' hp-pending' : '') + (spent ? ' hp-dim' : ''));
      if (spent) row.setAttribute('aria-disabled', 'true');
      row.type = 'button';
      row.setAttribute('data-fk', 'fam:' + f.fam.f);
      var lab = api.el('span', 'hp-famq');
      lab.textContent = api.t(f.fam.q);
      row.appendChild(lab);
      if (f.locked) {
        var lk = api.el('span', 'hp-lockglyph');
        lk.textContent = '🔒';
        lk.setAttribute('aria-hidden', 'true');
        row.appendChild(lk);
        row.setAttribute('aria-disabled', 'true');
      }
      row.addEventListener('click', function () {
        if (spent) { self._refuse('refuseSameRule'); return; }
        /* ⚠ a locked row does not navigate: it expands the gate line IN
           PLACE, below that row. One row moves; the panel does not. */
        if (f.locked) { self._gateRow = f.fam.f; self.render(); return; }
        if (f.pending) return;
        self.cursor = { hoop: h, family: f.fam.f };
        self._focusNext = 'back';
        self.render();
      });
      list.appendChild(row);
      if (self._gateRow === f.fam.f && f.locked) list.appendChild(self._gateLine('gateRules'));
    });
    box.appendChild(list);
    return box;
  },

  /* ⚠ THE FAMILY SENTENCE IS SPOKEN ONCE, IN THE HEADING, AND NEVER
     REPEATED ON THE VALUE. That is what collapses 26 chips each reading
     "The word starts with <letter>" into an alphabet strip, and the
     shipped premium menu of 93 undifferentiated chips (1494px of content
     in a 168px box) into four short grids. The sentence form survives
     where the class actually hears it — the reveal caption. */
  _buildValueStep: function (box) {
    var api = this.api, self = this, h = this.cursor.hoop, f = this.cursor.family;
    var fam = null, i;
    for (i = 0; i < this.RULE_FAMILIES.length; i++) if (this.RULE_FAMILIES[i].f === f) fam = this.RULE_FAMILIES[i];
    box.appendChild(this._backRow(api.t(fam ? fam.q : 'setRule')));

    var other = h === 'a' ? this.ruleB : this.ruleA;
    var grid = api.el('div', 'hp-valgrid' + (f === 'initial' ? ' hp-valgrid-tight' : ''));
    grid.setAttribute('role', 'radiogroup');
    grid.setAttribute('aria-label', api.t(fam ? fam.q : 'setRule'));
    var rules = this._availableRules(f);
    rules.forEach(function (rule) {
      /* ⚠ HOOP B's VALUES ARE FILTERED AGAINST HOOP A. Contradiction,
         nesting, identity and the empty overlap all become UNREACHABLE
         rather than policed. */
      var ok = self.pairOK(h === 'a' ? rule : other, h === 'a' ? other : rule, self.pool);
      var b = self._chip(self.valueLabel(rule), false, function () {
        if (!ok) { self._refuse(rule.f === (other && other.f) ? 'refuseSameRule' : 'refuseNoPair'); return; }
        self._commit(h, rule);
      }, ok ? '' : 'hp-dim', 'val:' + rule.f + ':' + rule.v);
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', 'false');
      if (!ok) b.setAttribute('aria-disabled', 'true');
      grid.appendChild(b);
    });
    box.appendChild(grid);
    return box;
  },

  _backRow: function (title) {
    var api = this.api, self = this;
    var row = api.el('div', 'hp-backrow');
    row.appendChild(this._chip('◂ ' + api.t('backBtn'), false, function () {
      if (self.cursor.family) self.cursor.family = null;
      else self.cursor.hoop = null;
      self._focusNext = 'setuphead';
      self.render();
    }, '', 'back'));
    var t = api.el('div', 'hp-setuphead');
    t.textContent = title;
    t.setAttribute('tabindex', '-1');
    t.setAttribute('data-fk', 'setuphead');
    row.appendChild(t);
    return row;
  },

  _commit: function (h, rule) {
    if (h === 'a') this.ruleA = rule; else this.ruleB = rule;
    this.sep = false;
    this.cursor = { hoop: null, family: null };
    this._focusNext = 'start';
    this.api.announce(this.api.t(h === 'a' ? 'hoopA' : 'hoopB') + ': ' +
      (this.mode === 'labelled' ? this.ruleLabel(rule) : this.api.t('hiddenRule')));
    this.render();
  },

  /* ⭐ SURPRISE ME — the invention. Nobody sees the rule, including the
     teacher, so the teacher can genuinely go quiet and read the two sets
     alongside the class. It also removes the 30-chip problem for the
     common case, and it is the only honest answer to choosing a secret in
     front of 25 children.
     ⚠ It draws ONLY from the tier the account actually has. A refactor
     that let a free surprise pick a locked rule would release every card
     and look exactly like the null-rule dead end. */
  _surprise: function (h) {
    var other = h === 'a' ? this.ruleB : this.ruleA;
    var self = this;
    var cand = this._availableRules().filter(function (r) {
      return self.pairOK(h === 'a' ? r : other, h === 'a' ? other : r, self.pool);
    });
    if (!cand.length) { this._refuse('refuseNoPair'); return; }
    this._commit(h, cand[Math.floor(Math.random() * cand.length)]);
  },

  _startSorting: function () {
    if (!this.ruleA && !this.ruleB) { this._refuse('refuseNoRule'); return; }
    this.phase = 'sort';
    this.cursor = { hoop: null, family: null };
    this._gateRow = null;
    this._focusNext = 'more';

    /* ⚠ COMMITTING A RULE NEVER RE-DEALS AND NEVER SWEEPS THE MAT. Cards
       the new rules now disagree with come back out VISIBLY instead. */
    var self = this, moved = 0;
    if (this.mode !== 'labelled') {
      this.dealt.forEach(function (it) {
        var w = self.placement[it.uid];
        if (!w || w === 'tray') return;
        var truth = self.regionFor(it, self.ruleA, self.ruleB);
        if (truth !== w) { self.placement[it.uid] = (truth === 'out') ? 'out' : 'tray'; moved++; }
      });
    }
    this._ruleChanged = moved > 0;
    if (this._ruleChanged) this._after(5000, function () { self._ruleChanged = false; self.render(); });

    /* ⚠ splits() is measured against the POOL, but the class only sees the
       TRAY: a rule that splits 380 items can be constant over the twelve
       dealt, so the round needs a fresh deal.
       ⚠⚠ BUT IT MUST NEVER DELETE THE CLASS'S WORK, and the first version
       did. It re-dealt whenever `_traySplits()` was false — and that is
       false for an EMPTY tray, which is exactly the state a finished round
       is in. Sort the whole tray, tap "Change the rules", tap "Start
       sorting", and the entire mat AND the outside pile were discarded
       with no warning. Measured: mat 12 -> 0. That is the operator's
       original "the objects randomly disappear" report, reappearing on a
       new path inside its own fix. THREE native panels found it
       independently while reading the model.
       A re-deal is only legitimate when there is nothing to lose. */
    var onMat = 0;
    this.dealt.forEach(function (it) {
      var w = self.placement[it.uid];
      if (w && w !== 'tray') onMat++;
    });
    if (!this._traySplits()) {
      if (!onMat) { this.dealt = []; this.placement = {}; this._deal(this.TRAY_SIZE); }
      else this._deal(this.TRAY_SIZE - this.trayItems().length);
    }
    this.render();
  },

  _traySplits: function () {
    var self = this, seen = {}, n = 0, items = this.trayItems();
    if (!items.length) return false;
    items.forEach(function (it) {
      var r = self.regionFor(it, self.ruleA, self.ruleB);
      if (!seen[r]) { seen[r] = 1; n++; }
    });
    return n >= 2;
  },

  /* ---------------- the foot ---------------- */
  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'hp-foot');

    if (this.phase === 'sort') {
      if (this.mode !== 'labelled') {
        foot.appendChild(this._chip(api.t(this.revealed ? 'hide' : 'reveal'), false, function () {
          self.revealed = !self.revealed;
          if (self.revealed) self.api.announce(self._capFor('a') + '. ' + self._capFor('b'));
          self.render();
        }, 'hp-primary', 'reveal'));
      }
      foot.appendChild(this._chip(api.t('changeRules'), false, function () {
        self.phase = 'setup'; self.cursor = { hoop: null, family: null };
        self._focusNext = 'setuphead'; self.render();
      }, '', 'change'));
      foot.appendChild(this._chip(api.t('moreThings'), false, function () {
        /* ⚠ tops the tray UP. The shipped `New things` called _newRound(),
           which also did placement = {} — its label promised a new set and
           it silently wiped the mat.
           ⚠⚠ AND IT MUST NEVER GO SILENTLY DEAD. `_deal` skips anything
           already dealt, and the block world is 32 items against a tray of
           12 — so measured, the THIRD press dealt nothing, the fourth
           nothing, forever, while the chip was still painted primary and
           `hintTrayEmpty` was actively telling the teacher to press it. A
           bright control that cannot act, advertised by the hint band, is
           the recorded #39 defect exactly. When the pool is spent the
           round is over, so it starts a new one — which is the reading a
           teacher already has, because everything is sorted. */
        var short = self.TRAY_SIZE - self.trayItems().length;
        if (!self._undealt()) { self._newRound(); }
        else if (short > 0) self._deal(short);
        else {
          /* ⚠ AND IT MUST ACT ON A FULL TRAY TOO. `_deal(0)` runs a loop that
             cannot execute, so the chip was a silent no-op at rest — three
             panels flagged it and the liveness gate scored it DEAD. With a
             full tray "more things" means DIFFERENT things: the untouched
             tray is returned to the pool and twelve fresh ones dealt. The
             mat is not touched, which is the guarantee this control exists
             to make. */
          var keep = {};
          self.dealt.forEach(function (it) {
            if (self.placement[it.uid] !== 'tray') keep[it.uid] = 1;
          });
          self.dealt = self.dealt.filter(function (it) { return keep[it.uid]; });
          Object.keys(self.placement).forEach(function (u) { if (!keep[u]) delete self.placement[u]; });
          self._deal(self.TRAY_SIZE);
        }
        self.armClear = false;
        self._said = null;
        self.render();
      }, !self.trayItems().length ? 'hp-primary' : '', 'more'));

      /* ⚠ TWO-PRESS ARM. One press used to sweep the class's work back
         into the tray with no warning and no undo. */
      foot.appendChild(this._chip(api.t('clearMat'), this.armClear, function () {
        if (!self.armClear) {
          self.armClear = true;
          self._refuse('confirmClear');
          return;
        }
        self.armClear = false;
        self.dealt.forEach(function (it) { self.placement[it.uid] = 'tray'; });
        self._said = null;
        self.api.announce(api.t('clearMat'));
        self.render();
      }, this.armClear ? 'hp-arm' : '', 'clear'));
    }

    var sep = api.el('span', 'hp-sep');
    foot.appendChild(sep);
    var pr = this._chip((this.premium ? '' : '🔒 ') + api.t('printBtn'), false, function () {
      if (!self.premium) { self._refuse('gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'hp-locked', 'print');
    if (!this.premium) {
      var hid = api.el('span', 'hp-srhint');
      hid.id = 'hp-gateprint';
      hid.textContent = api.t('gatePrint');
      foot.appendChild(hid);
      pr.setAttribute('aria-describedby', 'hp-gateprint');
    }
    foot.appendChild(pr);

    if (!this.premium && this.premiumKnown && this._said === 'gatePrint') {
      foot.appendChild(this._gateLine('gatePrint'));
    }

    var pv = api.el('div', 'hp-privacy');
    pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _gateLine: function (key) {
    var api = this.api;
    var g = api.el('div', 'hp-gate');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-sorting-hoops';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    return g;
  },

  /* =================================================================
     THE PRINT SHEET.
     ⚠ THE PAYWALL WAS BYPASSED BY Ctrl+P. The chip was gated; the
     @media print block was unconditional and the sheet was appended on
     every render — so measured as an anonymous free visitor with
     emulateMediaType('print'), the paid sheet rendered. Gating the CHIP
     is not gating the FEATURE. The sheet is now only in the DOM when the
     account carries it.
     ⚠ AND IT DRAWS THE HOOPS. What it printed before was four headings
     over four empty rows — a teacher who paid for "Print the mat" got a
     page with five words on it. Same geometry constants as the screen,
     one source of truth.
     ⚠ Paper leaves the room, so the sheet always prints the REVEALED
     labels: the secrecy constraint is a projection constraint. */
  _ensureSheet: function (host) {
    var old = document.getElementById('hp-printsheet');
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (!this.premium) return;

    var api = this.api, self = this, G = this.GEO;
    var sheet = api.el('div', 'hp-printsheet');
    sheet.id = 'hp-printsheet';

    var h = api.el('div', 'hp-printhead');
    h.textContent = api.t('title');
    sheet.appendChild(h);

    var caps = api.el('div', 'hp-printcaps');
    caps.textContent = (this.ruleA ? this.ruleLabel(this.ruleA) : api.t('noRule')) + '   |   ' +
                       (this.ruleB ? this.ruleLabel(this.ruleB) : api.t('noRule'));
    sheet.appendChild(caps);

    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('class', 'hp-printsvg');
    svg.setAttribute('viewBox', '0 0 ' + G.w + ' ' + G.h);
    var sepShift = this.sep ? 26 : 0;
    [G.cxA - sepShift, G.cxB + sepShift].forEach(function (cx) {
      var c = document.createElementNS(SVGNS, 'circle');
      c.setAttribute('cx', cx); c.setAttribute('cy', G.cy); c.setAttribute('r', G.r);
      c.setAttribute('fill', 'none'); c.setAttribute('stroke', '#000');
      c.setAttribute('stroke-width', '2');
      svg.appendChild(c);
    });
    sheet.appendChild(svg);

    /* the words, by region, including the unsorted remainder so the sheet
       is a complete record of the lesson */
    /* ⚠ no lens row when the rings are drawn apart: the sheet would carry a
       heading for a region the picture above it does not contain. */
    var rows = this.sep
      ? [['a', this._capFor('a')], ['b', this._capFor('b')]]
      /* ⚠ _capFor, not the bare capBoth: with both rules revealed the screen
         shows "rule A + rule B" and the sheet showed "Both". The paper and the
         mat must name the same region the same way. */
      : [['a', this._capFor('a')], ['both', this._capFor('both')], ['b', this._capFor('b')]];
    rows.concat([['out', api.t('outsideLabel')], ['tray', api.t('trayLabel')]]).forEach(function (r) {
      var row = api.el('div', 'hp-printrow');
      var lab = api.el('div', 'hp-printcap');
      lab.textContent = r[1];
      row.appendChild(lab);
      var body = api.el('div', 'hp-printbody');
      body.textContent = self.dealt.filter(function (it) { return self.placement[it.uid] === r[0]; })
        .map(function (it) { return self._itemName(it); }).join(' · ');
      row.appendChild(body);
      sheet.appendChild(row);
    });
    host.appendChild(sheet);
  },

  /* =================================================================
     INPUT — ONE GRAB-AND-PLACE MODEL for keyboard, touch and mouse.
     ⚠ The shipped keyboard path was Enter/Space CYCLING a tile through
     tray->a->both->b->out, calling _place at every step — so in guess mode
     a keyboard child's card was adjudicated by every region in turn and
     they could express no CHOICE, only a traversal. Nothing was announced.
     ⚠ AND A PICK-UP/PUT-DOWN PAIR MUST NOT NET TO ZERO: the liveness gate
     presses Enter and Space in one tick, so a toggle scores DEAD. Pick-up
     pre-targets the NEXT region, which makes the pair a genuine MOVE.
     ================================================================= */
  REGION_ORDER: ['a', 'both', 'b', 'out', 'tray'],

  _wireInput: function () {
    var self = this;
    var tiles = this._wrap.querySelectorAll('.hp-tile');
    Array.prototype.forEach.call(tiles, function (tile) {
      tile.addEventListener('pointerdown', function (e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        self._startDrag(tile, e);
      });
      tile.addEventListener('keydown', function (e) { self._onTileKey(tile, e); });
    });
    /* a drop anywhere on the mat, for the tap-then-tap path */
    var hit = this._wrap.querySelector('[data-hit]');
    if (hit) {
      hit.addEventListener('click', function (e) {
        if (!self.carry) return;
        var r = self._regionAt(e.clientX, e.clientY);
        if (r) self._place(self.carry, r);
      });
    }
    var outz = this._wrap.querySelector('.hp-out');
    if (outz) outz.addEventListener('click', function () { if (self.carry) self._place(self.carry, 'out'); });
    var trayz = this._wrap.querySelector('.hp-slot-tray');
    if (trayz) trayz.addEventListener('click', function () { if (self.carry) self._place(self.carry, 'tray'); });
  },

  _regionsHere: function () {
    return this.sep ? ['a', 'b', 'out', 'tray'] : this.REGION_ORDER;
  },

  _onTileKey: function (tile, e) {
    var uid = tile.getAttribute('data-uid');
    var order = this._regionsHere();
    var here = this.placement[uid] || 'tray';
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (this.carry === uid) { this._place(uid, this.carryTarget || order[0]); return; }
      this.carry = uid;
      /* pre-target the NEXT region, so pick-up + put-down is a MOVE */
      var i = order.indexOf(here);
      this.carryTarget = order[(i + 1) % order.length];
      this._focusNext = 'tile:' + uid;
      this.api.announce(this._regionName(this.carryTarget));
      this.render();
      return;
    }
    if (e.key === 'Escape' && this.carry === uid) {
      e.preventDefault();
      this.carry = null; this.carryTarget = null;
      this.api.announce(this.api.t('putBack'));
      this._focusNext = 'tile:' + uid;
      this.render();
      return;
    }
    if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && this.carry === uid) {
      e.preventDefault();
      var j = order.indexOf(this.carryTarget || here);
      j = (j + (e.key === 'ArrowRight' ? 1 : order.length - 1)) % order.length;
      this.carryTarget = order[j];
      this.api.announce(this._regionName(this.carryTarget));
      this._focusNext = 'tile:' + uid;
      this.render();
    }
  },

  _startDrag: function (tile, e) {
    var self = this;
    var uid = tile.getAttribute('data-uid');
    var rect = tile.getBoundingClientRect();
    var x0 = e.clientX, y0 = e.clientY, t0 = Date.now(), moved = 0;
    var ghost = document.createElement('div');
    ghost.className = 'hp-ghost';
    ghost.style.width = rect.width + 'px';
    ghost.style.height = rect.height + 'px';
    ghost.innerHTML = tile.innerHTML;
    ghost.style.left = x0 + 'px'; ghost.style.top = y0 + 'px';
    document.body.appendChild(ghost);

    var move = function (ev) {
      moved = Math.max(moved, Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0));
      ghost.style.left = ev.clientX + 'px';
      ghost.style.top = ev.clientY + 'px';
      self._hover(ev.clientX, ev.clientY);
    };
    var done = function (ev) {
      tile.removeEventListener('pointermove', move);
      tile.removeEventListener('pointerup', done);
      tile.removeEventListener('pointercancel', done);
      try { tile.releasePointerCapture(ev.pointerId); } catch (_) {}
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      tile.classList.remove('hp-dragging');
      self._clearHover();

      /* ⚠ ONE THRESHOLD disambiguates. A tap LIFTS and waits (the primary
         on an interactive whiteboard, where a child cannot hold a press
         while walking sideways); a drag lands on release. Same state
         machine as the keyboard. */
      var isTap = moved < 8 && (Date.now() - t0) < 500;
      if (isTap) {
        if (self.carry === uid) { self.carry = null; self.carryTarget = null; }
        else {
          self.carry = uid;
          var order = self._regionsHere();
          self.carryTarget = order[(order.indexOf(self.placement[uid] || 'tray') + 1) % order.length];
          var it = self._itemByUid(uid);
          if (it && it.kind === 'picture') self._say(it.word);
        }
        self._focusNext = 'tile:' + uid;
        self.render();
        return;
      }
      var target = self._regionAt(ev.clientX, ev.clientY);
      if (target) self._place(uid, target);
      else { self.api.announce(self.api.t('putBack')); self.render(); }
    };
    tile.classList.add('hp-dragging');
    try { tile.setPointerCapture(e.pointerId); } catch (_) {}
    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', done);
    tile.addEventListener('pointercancel', done);
  },

  /* ⭐ THE TOTAL PARTITION. Every point inside the mat is exactly one of
     four regions, computed from the SAME ellipse inequality that draws the
     picture — so a child aiming at the visible ink hits the region the ink
     represents, and the four dead bands cannot exist. Only a drop outside
     the mat's box is null, and that cancels visibly. */
  _regionAt: function (x, y) {
    var wrap = this._wrap;
    if (!wrap) return null;
    var tray = wrap.querySelector('.hp-slot-tray');
    if (tray && inRect(tray.getBoundingClientRect(), x, y)) return 'tray';
    var outz = wrap.querySelector('.hp-out');
    if (outz && inRect(outz.getBoundingClientRect(), x, y)) return 'out';
    var rings = wrap.querySelector('.hp-rings');
    if (!rings) return null;
    var r = rings.getBoundingClientRect();
    if (!inRect(r, x, y)) {
      var mat = wrap.querySelector('.hp-mat');
      return (mat && inRect(mat.getBoundingClientRect(), x, y)) ? 'out' : null;
    }
    var G = this.GEO;
    var sx = (x - r.left) / r.width * G.w;
    var sy = (y - r.top) / r.height * G.h;
    var cx = this._cx || { a: G.cxA, b: G.cxB };
    var inA = sq(sx - cx.a) + sq(sy - G.cy) <= sq(G.r);
    var inB = sq(sx - cx.b) + sq(sy - G.cy) <= sq(G.r);
    if (inA && inB) return this.sep ? 'a' : 'both';
    if (inA) return 'a';
    if (inB) return 'b';
    return 'out';
  },

  /* ⚠ THE PREVIEW SAYS WHERE, NEVER WHETHER. The highlighted DOM is
     identical for an item that satisfies the rule and one that does not —
     that is invention 1, and it is gate-asserted. */
  _hover: function (x, y) {
    var z = this._regionAt(x, y);
    this._clearHover();
    if (!z || !this._wrap) return;
    var el = z === 'tray' ? this._wrap.querySelector('.hp-slot-tray')
      : z === 'out' ? this._wrap.querySelector('.hp-out')
        : this._wrap.querySelector('.hp-zone-' + z);
    if (el) el.classList.add('hp-over');
  },

  _clearHover: function () {
    if (!this._wrap) return;
    var over = this._wrap.querySelectorAll('.hp-over');
    Array.prototype.forEach.call(over, function (e) { e.classList.remove('hp-over'); });
  },

  /* ⚠ FLIP IS THE ONLY CORRECT MECHANISM WHEN render() DESTROYS THE DOM.
     The shipped tool applied a CSS class AFTER stage.innerHTML='' — which
     animates from the destination to the destination — and compared a
     region string to a uid so the class never applied at all, and set a
     900ms timer that the very next render() cleared. The release, which is
     the only moment the hoop speaks, had never once fired in production. */
  _runFlip: function () {
    var f = this._flip, pulse = this._pulse;
    this._flip = null; this._pulse = null;
    if (pulse && this._wrap) {
      var z = this._wrap.querySelector('.hp-zone-' + pulse) ||
              (pulse === 'out' ? this._wrap.querySelector('.hp-out') : null);
      var svg = this._wrap.querySelector('.hp-svg');
      if (svg && pulse !== 'out' && pulse !== 'tray') svg.classList.add('hp-pulse');
      void z;
    }
    if (!f || !this._wrap) return;
    var node = this._wrap.querySelector('.hp-tile[data-uid="' + cssEsc(f.uid) + '"]');
    if (!node) return;
    var now = node.getBoundingClientRect();
    var dx = f.rect.left - now.left, dy = f.rect.top - now.top;
    if (!dx && !dy) return;
    node.style.transition = 'none';
    node.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
    node.classList.add(f.kept ? 'hp-settle' : 'hp-travel');
    /* force a reflow so the inverse transform is the START of the
       transition rather than being coalesced away */
    void node.offsetWidth;
    node.style.transition = '';
    node.style.transform = '';
  }
};

/* --------------------------------------------------------------------
   helpers kept OUT of the tool object so the gate's sandbox can evaluate
   the file without a DOM
   -------------------------------------------------------------------- */
var SVGNS = 'http://www.w3.org/2000/svg';
function sq(n) { return n * n; }
function inRect(r, x, y) { return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom; }
function cssEsc(s) { return String(s).replace(/["\\]/g, '\\$&'); }
function mkCircle(svg, cx, cy, r, cls) {
  var c = document.createElementNS(SVGNS, 'circle');
  c.setAttribute('cx', cx); c.setAttribute('cy', cy); c.setAttribute('r', r);
  c.setAttribute('class', cls);
  svg.appendChild(c);
  return c;
}

function injectSortingHoopsCSS() {
  if (document.getElementById('hp-style')) return;
  var P = SortingHoops.PALETTE;
  var st = document.createElement('style');
  st.id = 'hp-style';
  st.textContent = ''
    + '.hp-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
    /* --- bar --- */
    + '.hp-bar{display:flex;flex-wrap:wrap;gap:10px;justify-content:center;align-items:center;}'
    /* ⚠⚠ THE STRIP WRAPS, AND IT MUST. The first version was
       `display:flex; overflow:hidden` with no wrap — so at 320px the three
       mode chips were CLIPPED, and `overflow:hidden` absorbed the evidence so
       neither the containment check nor the clipped-text check could see it.
       That is the recorded overflow-absorbs-the-evidence trap exactly, and an
       Italian panel found it by reading the CSS rather than the render. The
       English three already total 41 characters before any locale is
       involved; German and Portuguese are longer. */
    + '.hp-seg{display:flex;flex-wrap:wrap;gap:0;border-radius:999px;'
    +   'border:1.5px solid rgba(42,42,53,.22);background:#FFFDF7;}'
    + '.hp-seg .hp-chip{border:none;border-radius:999px;margin:0;}'
    + '.hp-seg .hp-chip+.hp-chip{box-shadow:inset 1.5px 0 0 rgba(42,42,53,.16);}'
    + '.hp-sep{width:1px;height:26px;background:rgba(42,42,53,.18);margin:0 4px;}'
    + '.hp-chip{min-height:44px;padding:9px 15px;border-radius:999px;'
    +   'border:1.5px solid rgba(42,42,53,.26);background:#FFFDF7;color:' + P.ink + ';'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:15px;font-weight:600;cursor:pointer;}'
    + '.hp-chip:hover{background:#F3EADA;}'
    + '.hp-chip.hp-on{background:' + P.ink + ';border-color:' + P.ink + ';color:#FFFDF7;}'
    + '.hp-chip.hp-primary{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
    + '.hp-chip.hp-arm{background:#C2562F;border-color:#C2562F;color:#FFFDF7;}'
    + '.hp-chip.hp-dim{opacity:.38;}'
    /* ⚠ the focus ring is the HOOP INK, not the shell's blue and not the
       house teal: teal sits 6.7 dE00 from block blue under tritanopia, and
       the shell default #1E8FD4 is literally a blue. */
    + '.hp-chip:focus-visible,.hp-tile:focus-visible,.hp-famrow:focus-visible{'
    +   'outline:3px solid ' + P.ink + ';outline-offset:3px;}'
    /* --- the hint band --- */
    + '.hp-hint{width:min(100%,760px);min-height:2.6em;display:flex;align-items:center;'
    +   'justify-content:center;text-align:center;font-family:Nunito,system-ui,sans-serif;'
    +   'font-size:clamp(15px,2.1vw,17px);line-height:1.25;color:#3C7C72;padding:2px 10px;}'
    + '.hp-hint-refuse{color:#8A4A2E;font-weight:700;}'
    /* --- the board: mat above, tray below, full width at every size.
       ⚠ THE RIGHT-HAND RAIL WAS TRIED AND MEASURED WORSE. The art panel
       proposed it to buy vertical room for true circles, and reading the
       1024 render showed the opposite: twelve tiles in a 156px rail wrap
       to two columns and SIX ROWS, so the tray stood 640px tall beside a
       410px mat — a dead column beside the apparatus, and the rings shrank
       to 306px to pay for it. Full-width row: the rings get 636 x 424 on
       the production frame instead of 306, and the supply is two tidy rows
       under the mat. The apparatus is the thing the tool is named for; it
       gets the width. --- */
    + '.hp-board{display:flex;flex-direction:column;gap:10px;width:min(100%,760px);'
    +   'align-items:stretch;}'
    + '.hp-mat,.hp-setup{width:100%;}'
    + '.hp-tray{width:100%;display:flex;flex-direction:column;gap:6px;}'
    /* --- THE MAT: the universe. Solid, opaque, recessed, ONE object.
       The shipped mat was rgba(255,253,247,.6) over the shell's two radial
       gradients, so it was cooler at top-left and warmer at bottom-right —
       on a projector that reads as a stain. And its border was DASHED,
       which in this codebase already means ghost-slot or locked. --- */
    + '.hp-mat{border-radius:20px;padding:12px;display:flex;flex-direction:column;gap:8px;'
    +   'background-color:#FDF8EE;'
    +   'background-image:radial-gradient(120% 70% at 50% -12%,rgba(255,255,255,.55) 0%,rgba(255,255,255,0) 34%),'
    +     'radial-gradient(112% 128% at 50% 44%,rgba(214,193,155,0) 0%,rgba(214,193,155,0) 56%,'
    +     'rgba(214,193,155,.16) 82%,rgba(176,148,102,.22) 100%);'
    +   'border:2px solid rgba(42,42,53,.22);'
    +   'box-shadow:inset 0 0 0 1px rgba(255,255,255,.6),inset 0 3px 7px -3px rgba(93,72,45,.24),'
    +     '0 1px 0 rgba(255,255,255,.85);}'
    /* ⚠⚠ THE BOX IS ASPECT-BOUND. Without this the SVG letterboxes while
       the %-positioned zones do not, and every zone drifts off the ring it
       drives — #43 cold-line shipped exactly that and drew each mark as
       two circles. */
    + '.hp-rings{position:relative;width:100%;aspect-ratio:3 / 2;touch-action:none;}'
    + '.hp-svg{position:absolute;inset:0;width:100%;height:100%;display:block;}'
    + '.hp-fill{fill:' + P.inkSoft + ';}'
    + '.hp-lens{fill:' + P.inkLens + ';}'
    /* ⚠⚠ stroke-width 5, NOT .55. vector-effect:non-scaling-stroke resolves
       the width in the VIEWPORT coordinate system, so .55 was 0.55 CSS
       PIXELS — a sub-pixel hairline at every viewport including 2560, and
       the three wide tiers ramped the mat, the tiles, the glyphs and every
       type size while never once touching the stroke. The thing the tool is
       named for was the one thing that never scaled. */
    + '.hp-ring{fill:none;stroke:' + P.ink + ';stroke-width:5;vector-effect:non-scaling-stroke;}'
    + '.hp-ring-hi{fill:none;stroke:rgba(255,255,255,.55);stroke-width:1.5;'
    +   'vector-effect:non-scaling-stroke;}'
    + '.hp-svg.hp-pulse .hp-ring{animation:hp-ringpulse .26s ease-out;}'
    + '@keyframes hp-ringpulse{0%{stroke-width:5;}50%{stroke-width:9;}100%{stroke-width:5;}}'
    /* the zones LAY OUT; the rings receive the pointer */
    + '.hp-zone{position:absolute;display:flex;flex-direction:column;align-items:center;gap:3px;'
    +   'border-radius:12px;pointer-events:none;}'
    /* largest rectangles INSCRIBED in their own circles — the shipped ones
       had corners outside the ring they belonged to */
    + '.hp-zone-a{left:6.5%;width:26%;top:26.5%;height:47%;}'
    + '.hp-zone-b{left:67.5%;width:26%;top:26.5%;height:47%;}'
    + '.hp-zone-both{left:39.7%;width:20.6%;top:23%;height:54%;}'
    + '.hp-zone-sep.hp-zone-a{left:4%;width:30%;}'
    + '.hp-zone-sep.hp-zone-b{left:66%;width:30%;}'
    + '.hp-zone.hp-over{background:' + P.inkOver + ';}'
    + '.hp-cap{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:600;'
    +   'font-size:clamp(15px,2.4vw,19px);color:' + P.ink + ';text-align:center;'
    +   'min-height:2.4em;line-height:1.2;padding:0 4px;text-wrap:balance;}'
    + '.hp-slot{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-content:flex-start;'
    +   'width:100%;flex:1 1 auto;min-height:44px;pointer-events:none;}'
    + '.hp-slot .hp-tile{pointer-events:auto;}'
    /* OUTSIDE: a rule, not a container */
    + '.hp-out{display:flex;align-items:flex-start;gap:10px;padding:8px 6px 4px;'
    +   'border-top:1px solid rgba(42,42,53,.14);background:none;}'
    + '.hp-out.hp-over{background:rgba(42,42,53,.07);border-radius:12px;}'
    + '.hp-outlabel{flex:0 0 auto;align-self:center;max-width:120px;'
    +   'font-family:Nunito,system-ui,sans-serif;font-weight:700;'
    +   'font-size:clamp(14px,2vw,16px);line-height:1.15;color:#5D5A52;}'
    + '.hp-slot-out{flex:1 1 auto;min-height:56px;}'
    /* --- TILES --- */
    + '.hp-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;'
    +   'min-width:68px;min-height:88px;padding:5px 4px;border-radius:14px;'
    +   'border:1.5px solid rgba(42,42,53,.16);background-color:#FFFDF7;cursor:grab;font:inherit;'
    +   'touch-action:none;user-select:none;'
    +   'box-shadow:0 1px 0 rgba(255,255,255,.9),0 2px 5px -2px rgba(93,72,45,.30);}'
    /* ⚠ A BLOCK IS AN OBJECT, NOT A CARD. Twelve white cards on the mat
       make a grid of rectangles, and SHAPE — the thing being sorted —
       becomes the small mark inside a bigger, louder rectangle. */
    + '.hp-tile-block{background-color:transparent;border-color:transparent;box-shadow:none;'
    +   'min-height:68px;}'
    + '.hp-tile-block .hp-block{filter:drop-shadow(0 2px 3px rgba(58,32,14,.24));}'
    + '.hp-tile.hp-dragging{opacity:.32;}'
    + '.hp-tile.hp-carry{outline:3px solid ' + P.ink + ';outline-offset:3px;transform:scale(1.08);}'
    + '.hp-block,.hp-pic{width:52px;height:52px;display:block;}'
    + '.hp-pic{object-fit:contain;}'
    /* ⚠ THE CAPTION WRAPS AND NEVER TRUNCATES. The two FREE picture rules
       are "how many beats the word has" and "what sound it starts with" —
       the word IS the datum. The shipped ellipsis at max-width:76px clipped
       a measured p90 of 11 (en) / 12 (de) characters into "Pachyce…". */
    /* ⚠ the floor is 14px, not 13. The art panel proposed 13 at 360px and
       the text floor is 14 — fix the layout, never the gate. */
    + '.hp-word{font-family:Nunito,system-ui,sans-serif;font-weight:600;'
    +   'font-size:clamp(14px,1.9vw,15px);line-height:1.15;color:' + P.ink + ';'
    +   'max-width:none;white-space:normal;overflow-wrap:anywhere;hyphens:auto;'
    +   'text-align:center;max-height:2.4em;overflow:hidden;}'
    + '.hp-ghost{position:fixed;z-index:99999;pointer-events:none;transform:translate(-50%,-50%);'
    +   'display:flex;align-items:center;justify-content:center;opacity:.9;}'
    + '.hp-ghost-card{width:64px;height:64px;border-radius:14px;border:2px dashed rgba(42,42,53,.22);'
    +   'opacity:.4;}'
    + '.hp-ghost-wide{width:100%;height:56px;}'
    /* --- release + accept. They differ in KIND, not hue. --- */
    + '.hp-tile.hp-settle{transition:transform .18s cubic-bezier(.2,.8,.2,1);}'
    + '.hp-tile.hp-travel{transition:transform .42s cubic-bezier(.4,0,.6,1),opacity .42s linear;}'
    /* --- TRAY --- */
    + '.hp-traylabel{font-family:Nunito,system-ui,sans-serif;font-weight:700;'
    +   'font-size:clamp(14px,2vw,16px);color:#5D5A52;text-align:center;}'
    + '.hp-slot-tray{min-height:56px;padding:8px;border-radius:14px;background-color:#F4EBD9;'
    +   'box-shadow:inset 0 2px 4px -2px rgba(93,72,45,.22),inset 0 -1px 0 rgba(255,255,255,.85);}'
    + '.hp-slot-tray.hp-over{background-color:#EADDC4;}'
    /* --- SETUP PANEL — occupies the mat's footprint --- */
    + '.hp-setup{display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px 12px;'
    +   'border-radius:20px;background-color:#FDF8EE;border:2px solid rgba(42,42,53,.22);'
    +   'min-height:clamp(280px,42vw,420px);}'
    + '.hp-setuphead{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:600;'
    +   'font-size:clamp(16px,2.4vw,20px);color:' + P.ink + ';text-align:center;}'
    + '.hp-setuphead:focus{outline:none;}'
    + '.hp-lessons{width:100%;display:flex;flex-direction:column;gap:6px;align-items:center;}'
    + '.hp-lessonlabel{font-family:Nunito,system-ui,sans-serif;font-weight:700;font-size:15px;'
    +   'color:#5D5A52;}'
    /* ⚠ tall enough that a preset is not cut through the middle. At 132px a
       third chip was sliced in half and the fade read as breakage rather
       than as "there is more" — and the layout gate could not see it,
       because an `overflow-y:auto` box is legitimately scrollable and its
       contents are not "clipped text". I found it by reading the render.
       The Finnish panel had warned these chips are the longest string the
       tool renders (two whole rule sentences joined). */
    + '.hp-lessongrid{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;'
    +   'max-height:clamp(112px,26vh,260px);overflow-y:auto;width:100%;padding-bottom:6px;'
    /* a bottom fade, so a teacher at the board can SEE there is more —
       a silent scroll box is a menu with a hidden half */
    +   '-webkit-mask-image:linear-gradient(180deg,#000 0,#000 86%,transparent 100%);'
    +   'mask-image:linear-gradient(180deg,#000 0,#000 86%,transparent 100%);}'
    + '.hp-lessongrid .hp-chip{font-size:14px;padding:8px 12px;min-height:44px;}'
    + '.hp-hoopcards{display:flex;gap:12px;flex-wrap:wrap;justify-content:center;width:100%;}'
    + '.hp-hoopcard{flex:1 1 200px;max-width:280px;display:flex;flex-direction:column;gap:8px;'
    +   'align-items:stretch;padding:12px;border-radius:16px;'
    +   'border:2px solid rgba(42,42,53,.18);background:rgba(42,42,53,.045);}'
    + '.hp-hoopcard-b{background:rgba(42,42,53,.085);}'
    + '.hp-hooptitle{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-weight:600;'
    +   'font-size:clamp(15px,2.2vw,18px);color:' + P.ink + ';text-align:center;}'
    + '.hp-hoopstate{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#5D5A52;'
    +   'text-align:center;min-height:2.4em;line-height:1.2;}'
    + '.hp-backrow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;justify-content:center;'
    +   'width:100%;}'
    + '.hp-famlist{display:flex;flex-direction:column;gap:6px;width:min(100%,420px);}'
    + '.hp-famrow{display:flex;align-items:center;justify-content:space-between;gap:10px;'
    +   'min-height:48px;padding:10px 14px;border-radius:12px;cursor:pointer;'
    +   'border:1.5px solid rgba(42,42,53,.2);background:#FFFDF7;text-align:start;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:16px;font-weight:600;color:' + P.ink + ';}'
    + '.hp-famrow:hover{background:#F3EADA;}'
    + '.hp-famrow.hp-locked{color:#8A4A2E;border-color:rgba(194,86,47,.4);}'
    + '.hp-famrow.hp-pending{opacity:.55;cursor:default;}'
    + '.hp-valgrid{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;'
    +   'width:min(100%,520px);}'
    + '.hp-valgrid-tight .hp-chip{min-width:48px;padding:9px 10px;text-align:center;}'
    /* --- FOOT --- */
    + '.hp-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;'
    +   'width:min(100%,760px);}'
    + '.hp-privacy{font-family:Nunito,system-ui,sans-serif;font-size:13px;color:#6B6558;'
    +   'text-align:center;width:100%;}'
    + '.hp-locked{border-color:rgba(194,86,47,.55);color:#8A4A2E;}'
    + '.hp-gate{display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:center;'
    +   'padding:9px 12px;border-radius:12px;background:rgba(242,120,75,.1);'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#8A4A2E;width:100%;}'
    + '.hp-gate a{color:#C2562F;font-weight:700;}'
    + '.hp-srhint{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;'
    +   'clip:rect(0 0 0 0);white-space:nowrap;border:0;}'
    + '.hp-printsheet{display:none;}'
    /* ⚠⚠ THE OVERFLOW ESCAPE IS UNCONDITIONAL, and that is the point.
       The shell sets html,body{height:100%;overflow:hidden}. The shipped
       tool lifted it only at `@media (max-width:700px)` — and the
       production embed measures 704px wide, so the escape MISSED BY FOUR
       PIXELS and every desktop width was trapped: measured at 1024x900,
       body scrollHeight 1032 against clientHeight 900 with overflow
       hidden, and a real mouse wheel moved nothing at all.
       A width is the wrong key. Twelve tiles stacked on a 320px phone are
       legitimately taller than the frame no matter how wide it is, so the
       content scrolls whenever it needs to and never otherwise.
       (On /[locale]/tools/ the iframe is content-driven and grows, so this
       never engages there; it is the standalone and third-party embed
       surface that needs it.) */
    + 'html,body.hp-wide{overflow-y:auto;height:auto;min-height:100%;}'
    + 'body.hp-wide{overflow-x:hidden;}'
    /* --- reduced motion. ⚠ THE DELAY IS KEPT even with motion off: a
       teacher must still see TWO events — it went in, then it came out —
       not one teleport. Motion-off must never mean information-off. --- */
    + '@media (prefers-reduced-motion:reduce){'
    +   '.hp-tile.hp-settle,.hp-tile.hp-travel{transition:opacity .15s linear !important;'
    +     'transform:none !important;}'
    +   '.hp-svg.hp-pulse .hp-ring{animation:none;stroke-width:9;}'
    +   '.hp-tile.hp-carry{transform:none;}'
    + '}'
    /* --- wide viewports. ⚠ THE PROJECTOR SIZES ARE IN THE BASE RULES.
       The shipped tiers were keyed (min-width:1367px) and (min-height:880px)
       against an iframe measured at 704 x 807 on every desktop, so all
       three were dead code and the instrument rendered at its phone size on
       a 2000px screen. These are a bonus, never the mechanism. --- */
    + '@media (min-width:900px){'
    +   'body.hp-wide .hp-board,body.hp-wide .hp-hint,body.hp-wide .hp-foot{width:min(100%,900px);}'
    +   'body.hp-wide .hp-tray{flex-basis:180px;}'
    +   'body.hp-wide .hp-tile{min-width:76px;min-height:96px;}'
    +   'body.hp-wide .hp-block,body.hp-wide .hp-pic{width:58px;height:58px;}'
    + '}'
    + '@media (min-width:1280px){'
    +   'body.hp-wide .hp-board,body.hp-wide .hp-hint,body.hp-wide .hp-foot{width:min(100%,1120px);}'
    +   'body.hp-wide .hp-tray{flex-basis:210px;}'
    +   'body.hp-wide .hp-tile{min-width:86px;min-height:108px;}'
    +   'body.hp-wide .hp-block,body.hp-wide .hp-pic{width:66px;height:66px;}'
    + '}'
    /* --- print. ⚠ SCOPED TO THE PAID SHEET, which is only in the DOM when
       the account carries it, so Ctrl+P cannot bypass the chip. --- */
    + '@media print{'
    +   '.hp-wrap{display:none !important;}'
    /* the SHELL's own header prints too if nobody hides it — the title, the
       settings/sound/fullscreen/reset controls and the instruction all sit
       OUTSIDE .hp-wrap. Every sibling tool with a sheet hides them. */
    +   '.lcs-header,.lcs-controls,.lcs-instruction{display:none !important;}'
    +   '.hp-printsheet{display:block !important;padding:10mm;}'
    +   '.hp-printhead{font-size:16pt;color:#000;margin-bottom:3mm;font-weight:700;}'
    +   '.hp-printcaps{font-size:11pt;color:#000;margin-bottom:4mm;}'
    +   '.hp-printsvg{width:100%;max-width:170mm;height:auto;margin-bottom:6mm;}'
    +   '.hp-printrow{margin-bottom:5mm;page-break-inside:avoid;break-inside:avoid;'
    +     'border-bottom:1px solid #000;padding-bottom:2mm;}'
    +   '.hp-printcap{font-size:12pt;color:#000;font-weight:700;}'
    +   '.hp-printbody{font-size:11pt;color:#000;}'
    + '}';
  document.head.appendChild(st);
}
