/* =====================================================================
   TOOL #30 — SORTING HOOPS   (sorting-hoops.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v3 catalog, build #1.

   Two overlapping hoops on a mat. Four regions: A only, B only, the
   OVERLAP, and outside. Children drag things in. The overlap is the whole
   pedagogy — a thing that is both has nowhere else to go.

   THE ONE THESIS — THE HOOP DECIDES, SO THE TEACHER CAN GO QUIET.
   In the carpet version of this game a grown-up says "no, that one
   doesn't belong", and children stop thinking and start reading the
   grown-up's face. Here the HOOP accepts or releases. The teacher is
   freed to say nothing and watch the reasoning happen.

   ⚠ WHAT THE CLASS TALKS ABOUT (the gate-5 test — if a tool cannot answer
   this in one sentence it is not finished): they argue about why the hoop
   kept that one and let this one go, reading the rule off the two growing
   sets on either side of the ring.

   THREE INVENTIONS, none of which exists in any competing product
   (verified absent from Polypad, Gynzy, Toy Theater, Didax, Math Learning
   Center, Braining Camp, ReadWriteThink and Twinkl — attribute hoops,
   Venn/Carroll sorting and guess-my-rule are absent even in English):
     1. THE HOOP ACCEPTS OR RELEASES; NOBODY JUDGES. An item that fails the
        hidden rule drifts back out on its own.
     2. REJECTED ITEMS STAY ON THE MAT AND ACCUMULATE OUTSIDE THE RING.
        The "not" set is the other half of the evidence — which is exactly
        how children actually crack these. Failure BUILDS THE DATA. It is
        never cleared, never counted, never coloured.
     3. NO TELL BEFORE RELEASE. Nothing highlights on hover in guess-my-
        rule mode, so "do you think this one will go in?" is a real
        question with a real pause. Gate-asserted: the hovered DOM is
        identical whether or not the item satisfies the rule.

   TWO ITEM WORLDS, and both are deliberate:
     · LOGIC BLOCKS — drawn here, 4 shapes x 4 colours x 2 sizes = 32. The
       classic Dienes attribute set. Language-free, and the attributes are
       EXACT BY CONSTRUCTION, which is why no artwork ever contradicts a
       colour or shape rule.
     · PICTURE CARDS — the illustrated nouns, carrying the conceptual tags
       from `object-attributes.json` plus the linguistic attributes. THIS
       IS THE MOAT: sorting by syllable count, by initial letter and (at
       the locale pass) by der/die/das is a daily European K-1 activity
       that no product anywhere offers, and it cannot be translated into
       existence — it has to be rebuilt per language.

   FENCES — this tool is adjacent to four shipped things and must not
   drift into any of them:
     sort-bins-core.js   drag into a LABELLED bin, deferred CHECK, graded,
     (E3, 2 activities   sb-correct/sb-wrong. Here the label may be HIDDEN,
      ride it — FROZEN)  the regions OVERLAP, and nothing is ever marked.
                         Drag choreography is copied as a PATTERN only —
                         zero lines imported.
     wodb (tool #22)     tap-to-lift a 2x2, DIVERGENT: all four answers are
                         defensible, there is no correct one. Here it is
                         drag into a topology, CONVERGENT: membership is a
                         fact and one hidden rule decides it. Never let the
                         copy drift into "which one doesn't belong".
     mims-baskets L.K.5.A / olive-kind-of L.1.5.b / ziggy-odd-one-out
     L.1.5.a             graded child activities that NAME the category up
                         front. Here naming it is the child's job.
     picture-sort app    printable, draw-a-line-to-the-bin.

   REFUSES, FOREVER: no score, no "found it in N tries", no timer, no
   streak · NO tick, NO cross, NO red anywhere — a released item is a fact
   about the rule, not a mistake · the outside pile is never counted or
   tallied · no voting widget (wodb's lock: a winner implies losers — the
   prediction happens out loud, in the room) · the tool never names the
   rule before the teacher reveals it.
   ===================================================================== */
var SortingHoops = {
  id: 'sorting-hoops',

  /* ⚠ CURATION: en authored here. The other ten are added by the locale
     pass and corrected in place by the per-locale native 3-agent
     ensembles (§A.13.48); sv/da/no/fi carry [NSR-FLAG]. api.t falls back
     to en, so an unfilled locale degrades to English rather than to a
     raw key. */
  strings: {
    title:        { en: 'Sorting Hoops', de: 'Sortierreifen', fr: 'Cerceaux de tri', it: 'Cerchi per classificare', es: 'Aros para clasificar', pt: 'Arcos de classificação', nl: 'Sorteerhoepels', sv: 'Sorteringsringar', da: 'Sorteringsringe', no: 'Sorteringsringer', fi: 'Lajitteluvanteet' },
    instruction:  { en: 'Drag things into the hoops. Something that belongs in both goes where they overlap.', de: 'Zieht Dinge in die Reifen. Was in beide gehört, kommt in die Schnittmenge.', fr: 'Faites glisser les objets dans les cerceaux. Ce qui appartient aux deux va là où ils se croisent.', it: 'Trascinate le cose dentro i cerchi. Quello che appartiene a entrambi va dove si sovrappongono.', es: 'Arrastrad las cosas a los aros. Lo que pertenece a los dos va donde se cruzan.', pt: 'Arrastem as coisas para dentro dos arcos. O que pertence aos dois vai onde eles se cruzam.', nl: 'Sleep dingen in de hoepels. Wat in allebei hoort, gaat waar ze elkaar overlappen.', sv: 'Dra saker in i ringarna. Det som hör hemma i båda hamnar där de överlappar.', da: 'Træk ting ind i ringene. Det, der hører til i begge, kommer der, hvor de overlapper.', no: 'Dra ting inn i ringene. Det som hører hjemme i begge, havner der de overlapper.', fi: 'Vedä esineet vanteisiin. Se mikä kuuluu molempiin, tulee kohtaan jossa vanteet menevät päällekkäin.' },
    modeOpen:     { en: 'Open sort', de: 'Frei sortieren', fr: 'Tri libre', it: 'Classifica libera', es: 'Clasificar libre', pt: 'Classificar livre', nl: 'Vrij sorteren', sv: 'Fri sortering', da: 'Fri sortering', no: 'Fri sortering', fi: 'Vapaa lajittelu' },
    modeGuess:    { en: 'Guess my rule', de: 'Errate meine Regel', fr: 'Devine ma règle', it: 'Indovina la mia regola', es: 'Adivina mi regla', pt: 'Adivinhe a minha regra', nl: 'Raad mijn regel', sv: 'Gissa min regel', da: 'Gæt min regel', no: 'Gjett regelen min', fi: 'Arvaa sääntöni' },
    trayLabel:    { en: 'Things to sort', de: 'Dinge zum Sortieren', fr: 'Objets à trier', it: 'Cose da classificare', es: 'Cosas para clasificar', pt: 'Coisas para classificar', nl: 'Dingen om te sorteren', sv: 'Saker att sortera', da: 'Ting at sortere', no: 'Ting å sortere', fi: 'Lajiteltavaa' },
    outsideLabel: { en: 'Outside the hoops', de: 'Außerhalb der Reifen', fr: 'En dehors des cerceaux', it: 'Fuori dai cerchi', es: 'Fuera de los aros', pt: 'Fora dos arcos', nl: 'Buiten de hoepels', sv: 'Utanför ringarna', da: 'Uden for ringene', no: 'Utenfor ringene', fi: 'Vanteiden ulkopuolella' },
    hoopA:        { en: 'Hoop 1', de: 'Reifen 1', fr: 'Cerceau 1', it: 'Cerchio 1', es: 'Aro 1', pt: 'Arco 1', nl: 'Hoepel 1', sv: 'Ring 1', da: 'Ring 1', no: 'Ring 1', fi: 'Vanne 1' },
    hoopB:        { en: 'Hoop 2', de: 'Reifen 2', fr: 'Cerceau 2', it: 'Cerchio 2', es: 'Aro 2', pt: 'Arco 2', nl: 'Hoepel 2', sv: 'Ring 2', da: 'Ring 2', no: 'Ring 2', fi: 'Vanne 2' },
    setRule:      { en: 'Set the rules', de: 'Regeln festlegen', fr: 'Choisir les règles', it: 'Scegli le regole', es: 'Elegir las reglas', pt: 'Escolher as regras', nl: 'Regels instellen', sv: 'Välj reglerna', da: 'Vælg reglerne', no: 'Velg reglene', fi: 'Aseta säännöt' },
    hiddenRule:   { en: 'Hidden', de: 'Geheim', fr: 'Secrète', it: 'Segreta', es: 'Secreta', pt: 'Secreta', nl: 'Geheim', sv: 'Hemlig', da: 'Hemmelig', no: 'Hemmelig', fi: 'Salainen' },
    noRule:       { en: 'Anything', de: 'Alles', fr: 'Tout', it: 'Qualsiasi cosa', es: 'Cualquier cosa', pt: 'Qualquer coisa', nl: 'Alles', sv: 'Vad som helst', da: 'Hvad som helst', no: 'Hva som helst', fi: 'Mikä tahansa' },
    reveal:       { en: 'Show the rules', de: 'Regeln zeigen', fr: 'Montrer les règles', it: 'Mostra le regole', es: 'Mostrar las reglas', pt: 'Mostrar as regras', nl: 'Regels laten zien', sv: 'Visa reglerna', da: 'Vis reglerne', no: 'Vis reglene', fi: 'Näytä säännöt' },
    hide:         { en: 'Hide the rules again', de: 'Regeln wieder verstecken', fr: 'Cacher les règles', it: 'Nascondi di nuovo le regole', es: 'Esconder las reglas otra vez', pt: 'Esconder as regras de novo', nl: 'Regels weer verbergen', sv: 'Dölj reglerna igen', da: 'Skjul reglerne igen', no: 'Skjul reglene igjen', fi: 'Piilota säännöt taas' },
    newThings:    { en: 'New things', de: 'Neue Dinge', fr: 'De nouveaux objets', it: 'Cose nuove', es: 'Cosas nuevas', pt: 'Coisas novas', nl: 'Nieuwe dingen', sv: 'Nya saker', da: 'Nye ting', no: 'Nye ting', fi: 'Uudet esineet' },
    clearMat:     { en: 'Clear the mat', de: 'Matte leeren', fr: 'Vider le tapis', it: 'Svuota il tappeto', es: 'Vaciar la alfombra', pt: 'Esvaziar o tapete', nl: 'Mat leegmaken', sv: 'Töm mattan', da: 'Tøm måtten', no: 'Tøm matta', fi: 'Tyhjennä matto' },
    trayBlocks:   { en: 'Blocks', de: 'Formen', fr: 'Formes', it: 'Forme', es: 'Formas', pt: 'Formas', nl: 'Vormen', sv: 'Former', da: 'Former', no: 'Former', fi: 'Muodot' },
    trayPictures: { en: 'Pictures', de: 'Bilder', fr: 'Images', it: 'Immagini', es: 'Imágenes', pt: 'Imagens', nl: 'Plaatjes', sv: 'Bilder', da: 'Billeder', no: 'Bilder', fi: 'Kuvat' },
    printBtn:     { en: 'Print the mat', de: 'Matte drucken', fr: 'Imprimer le tapis', it: 'Stampa il tappeto', es: 'Imprimir la alfombra', pt: 'Imprimir o tapete', nl: 'Mat afdrukken', sv: 'Skriv ut mattan', da: 'Udskriv måtten', no: 'Skriv ut matta', fi: 'Tulosta matto' },
    gatePrint:    { en: 'Printing is part of the Teacher plan.', de: 'Das Drucken gehört zum Lehrer-Paket.', fr: 'L’impression fait partie de l’offre Enseignant.', it: 'La stampa fa parte del piano Insegnante.', es: 'La impresión es parte del plan Docente.', pt: 'A impressão faz parte do plano Professor.', nl: 'Afdrukken hoort bij het Leerkracht-pakket.', sv: 'Utskrift ingår i Lärarpaketet.', da: 'Udskrivning er en del af Lærerpakken.', no: 'Utskrift er en del av Lærerpakken.', fi: 'Tulostus kuuluu Opettaja-tilaukseen.' },
    gateRules:    { en: 'The picture rules are part of the Teacher plan.', de: 'Die Bildregeln gehören zum Lehrer-Paket.', fr: 'Les règles sur les images font partie de l’offre Enseignant.', it: 'Le regole sulle immagini fanno parte del piano Insegnante.', es: 'Las reglas sobre las imágenes son parte del plan Docente.', pt: 'As regras sobre as imagens fazem parte do plano Professor.', nl: 'De regels bij de plaatjes horen bij het Leerkracht-pakket.', sv: 'Bildreglerna ingår i Lärarpaketet.', da: 'Billedreglerne er en del af Lærerpakken.', no: 'Bildereglene er en del av Lærerpakken.', fi: 'Kuvasäännöt kuuluvat Opettaja-tilaukseen.' },
    unlock:       { en: 'See the Teacher plan', de: 'Lehrer-Paket ansehen', fr: 'Voir l’offre Enseignant', it: 'Vedi il piano Insegnante', es: 'Ver el plan Docente', pt: 'Ver o plano Professor', nl: 'Bekijk het Leerkracht-pakket', sv: 'Se Lärarpaketet', da: 'Se Lærerpakken', no: 'Se Lærerpakken', fi: 'Katso Opettaja-tilaus' },
    privacyLine:  { en: 'Nothing here is saved, counted or sent anywhere.', de: 'Hier wird nichts gespeichert, gezählt oder irgendwohin gesendet.', fr: 'Rien ici n’est enregistré, compté ni envoyé où que ce soit.', it: 'Qui non si salva, non si conta e non si invia nulla.', es: 'Aquí no se guarda, no se cuenta ni se envía nada.', pt: 'Aqui nada é guardado, contado nem enviado para lugar nenhum.', nl: 'Hier wordt niets bewaard, geteld of ergens naartoe gestuurd.', sv: 'Ingenting här sparas, räknas eller skickas någonstans.', da: 'Intet her bliver gemt, talt eller sendt nogen steder hen.', no: 'Ingenting her blir lagret, talt eller sendt noe sted.', fi: 'Täällä ei tallenneta, lasketa eikä lähetetä mitään.' },
    setSpeak:     { en: 'Say the word when a picture is tapped', de: 'Das Wort sagen, wenn ein Bild angetippt wird', fr: 'Dire le mot quand on touche une image', it: 'Di’ la parola quando si tocca un’immagine', es: 'Decir la palabra al tocar una imagen', pt: 'Dizer a palavra ao tocar numa imagem', nl: 'Het woord zeggen als je op een plaatje tikt', sv: 'Säg ordet när man trycker på en bild', da: 'Sig ordet, når man trykker på et billede', no: 'Si ordet når man trykker på et bilde', fi: 'Sano sana, kun kuvaa napautetaan' },
    setPatterns:  { en: 'Add patterns as well as colours', de: 'Muster zusätzlich zu den Farben', fr: 'Ajouter des motifs en plus des couleurs', it: 'Aggiungi motivi oltre ai colori', es: 'Añadir tramas además de los colores', pt: 'Adicionar padrões além das cores', nl: 'Patronen naast de kleuren', sv: 'Mönster utöver färgerna', da: 'Mønstre ud over farverne', no: 'Mønstre i tillegg til fargene', fi: 'Kuviot värien lisäksi' },
    /* rule-family labels; {v} is filled with the value label */
    rColour:      { en: 'It is {v}', de: 'Es ist {v}', fr: 'C’est {v}', it: 'È {v}', es: 'Es {v}', pt: 'É {v}', nl: 'Het is {v}', sv: 'Den är {v}', da: 'Den er {v}', no: 'Den er {v}', fi: 'Se on {v}' },
    rShape:       { en: 'It is a {v}', de: 'Es ist ein {v}', fr: 'C’est un {v}', it: 'È un {v}', es: 'Es un {v}', pt: 'É um {v}', nl: 'Het is een {v}', sv: 'Det är en {v}', da: 'Det er en {v}', no: 'Det er en {v}', fi: 'Se on {v}' },
    rSize:        { en: 'It is {v}', de: 'Es ist {v}', fr: 'C’est {v}', it: 'È {v}', es: 'Es {v}', pt: 'É {v}', nl: 'Het is {v}', sv: 'Den är {v}', da: 'Den er {v}', no: 'Den er {v}', fi: 'Se on {v}' },
    rTheme:       { en: 'It is a kind of {v}', de: 'Es gehört zu {v}', fr: 'Ça fait partie de {v}', it: 'Fa parte di {v}', es: 'Es de {v}', pt: 'É de {v}', nl: 'Het hoort bij {v}', sv: 'Det hör till {v}', da: 'Det hører til {v}', no: 'Det hører til {v}', fi: 'Se kuuluu ryhmään {v}' },
    rLiving:      { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rNatural:     { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rEdible:      { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rMoves:       { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rSizeBand:    { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rHabitat:     { en: '{v}', de: '{v}', fr: '{v}', it: '{v}', es: '{v}', pt: '{v}', nl: '{v}', sv: '{v}', da: '{v}', no: '{v}', fi: '{v}' },
    rSyll:        { en: 'The word has {v} beats', de: 'Das Wort hat {v} Silben', fr: 'Le mot a {v} syllabes', it: 'La parola ha {v} sillabe', es: 'La palabra tiene {v} sílabas', pt: 'A palavra tem {v} sílabas', nl: 'Het woord heeft {v} klankgroepen', sv: 'Ordet har {v} stavelser', da: 'Ordet har {v} stavelser', no: 'Ordet har {v} stavelser', fi: 'Sanassa on {v} tavua' },
    rInitial:     { en: 'The word starts with {v}', de: 'Das Wort fängt mit {v} an', fr: 'Le mot commence par {v}', it: 'La parola comincia con {v}', es: 'La palabra empieza por {v}', pt: 'A palavra começa com {v}', nl: 'Het woord begint met {v}', sv: 'Ordet börjar på {v}', da: 'Ordet begynder med {v}', no: 'Ordet begynner med {v}', fi: 'Sana alkaa kirjaimella {v}' },
    /* value labels */
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
  },

  STORE_KEY: 'lcs:sorting-hoops:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { speak: true, patterns: false },
  settings: [
    { key: 'speak', type: 'toggle', labelKey: 'setSpeak' },
    { key: 'patterns', type: 'toggle', labelKey: 'setPatterns' }
  ],

  premium: false,
  premiumKnown: false,

  /* =================================================================
     THE LOGIC BLOCKS — 4 x 4 x 2 = 32, drawn, never fetched.
     Colour is the attribute, so it must be true colour; these are the
     primaries warmed a little to sit on the cream ground.
     ================================================================= */
  COLOURS: [
    { k: 'red',    hex: '#D6453C', label: 'vRed' },
    { k: 'blue',   hex: '#2F6FB5', label: 'vBlue' },
    { k: 'yellow', hex: '#E2A72E', label: 'vYellow' },
    { k: 'green',  hex: '#3F8F5E', label: 'vGreen' }
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

  /* every block, deterministic order — the tray samples from this */
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
     THE RULES — `satisfies` is PURE: no DOM, no storage, no locale.
     That is what lets the gate exhaust it over every (rule x item) pair.
     A rule is { f: <field>, v: <value> }.
     ================================================================= */
  RULE_FAMILIES: [
    { f: 'colour',    tier: 'free',    world: 'block',   label: 'rColour' },
    { f: 'shape',     tier: 'free',    world: 'block',   label: 'rShape' },
    { f: 'size',      tier: 'free',    world: 'block',   label: 'rSize' },
    { f: 'syllables', tier: 'free',    world: 'picture', label: 'rSyll' },
    { f: 'initial',   tier: 'free',    world: 'picture', label: 'rInitial' },
    { f: 'theme',     tier: 'premium', world: 'picture', label: 'rTheme' },
    { f: 'living',    tier: 'premium', world: 'picture', label: 'rLiving' },
    { f: 'natural',   tier: 'premium', world: 'picture', label: 'rNatural' },
    { f: 'edible',    tier: 'premium', world: 'picture', label: 'rEdible' },
    { f: 'moves',     tier: 'premium', world: 'picture', label: 'rMoves' },
    { f: 'size_band', tier: 'premium', world: 'picture', label: 'rSizeBand' },
    { f: 'habitat',   tier: 'premium', world: 'picture', label: 'rHabitat' }
  ],

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
     not carry, is FALSE — never undefined and never a throw. The gate
     exhausts every pair to prove it. */
  satisfies: function (rule, item) {
    if (!rule || !rule.f || !item) return false;
    switch (rule.f) {
      case 'colour':    return item.kind === 'block' && item.colour === rule.v;
      case 'shape':     return item.kind === 'block' && item.shape === rule.v;
      case 'size':      return item.kind === 'block' && item.size === rule.v;
      case 'theme':     return item.kind === 'picture' && (item.themes || []).indexOf(rule.v) > -1;
      case 'syllables': return item.kind === 'picture' && item.syl === rule.v;
      case 'initial':   return item.kind === 'picture' && !!item.word &&
                               item.word.charAt(0).toLocaleLowerCase() === String(rule.v).toLocaleLowerCase();
      case 'living': case 'natural': case 'edible':
      case 'moves': case 'size_band': case 'habitat':
        return item.kind === 'picture' && !!item.attr && item.attr[rule.f] === rule.v;
      default:          return false;
    }
  },

  /* which region an item belongs in, given both hoops' rules. In open
     sort there are no rules, so the child decides and this is not called. */
  regionFor: function (item, ruleA, ruleB) {
    var a = ruleA ? this.satisfies(ruleA, item) : false;
    var b = ruleB ? this.satisfies(ruleB, item) : false;
    if (a && b) return 'both';
    if (a) return 'a';
    if (b) return 'b';
    return 'out';
  },

  /* a rule is only posable if it splits the pool — a rule that admits
     everything, or nothing, cannot be guessed. */
  splits: function (rule, pool) {
    var yes = 0, no = 0, i;
    for (i = 0; i < pool.length; i++) {
      if (this.satisfies(rule, pool[i])) yes++; else no++;
      if (yes && no) return true;
    }
    return false;
  },

  ruleLabel: function (rule) {
    if (!rule) return this.api.t('noRule');
    var fam = null, i;
    for (i = 0; i < this.RULE_FAMILIES.length; i++) if (this.RULE_FAMILIES[i].f === rule.f) fam = this.RULE_FAMILIES[i];
    if (!fam) return '';
    var vkey = this.VALUE_LABEL[rule.f + ':' + rule.v];
    var v = vkey ? this.api.t(vkey) : String(rule.v);
    if (rule.f === 'colour' || rule.f === 'shape') {
      var t = rule.f === 'colour' ? this.COLOURS : this.SHAPES, j;
      for (j = 0; j < t.length; j++) if (t[j].k === rule.v) v = this.api.t(t[j].label);
    }
    if (rule.f === 'theme') v = (this.themeName && this.themeName[rule.v]) || rule.v;
    return this.api.t(fam.label).replace('{v}', v);
  },

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

    this.mode = 'open';          /* 'open' | 'guess' */
    this.world = 'block';        /* 'block' | 'picture' */
    this.ruleA = null;
    this.ruleB = null;
    this.revealed = false;
    this.picking = null;         /* 'a' | 'b' | null */
    this.placement = {};         /* uid -> 'tray'|'a'|'b'|'both'|'out' */
    this.pool = [];
    this.tray = [];
    this._pictures = null;
    this.themeName = {};
    this._timers = [];

    this._fetchEntitlement();
    this._newRound();
    this.render();
  },

  reset: function () {
    this.picking = null;
    this.revealed = false;
    this._newRound();
    this.render();
  },

  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },

  /* ---------------- data ---------------- */
  _loadStore: function () {
    var s = null;
    try { s = JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) {}
    if (!s || typeof s !== 'object') s = {};
    if (!s.v) s.v = 1;
    return s;
  },
  _saveStore: function () {
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
  },

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

  /* pictures are a runtime join of the picture index and the attribute
     corpus; both are already served, neither is written by this tool */
  _loadPictures: function (then) {
    var self = this;
    if (this._pictures) { then(); return; }
    var loc = (this.api.lang || 'en');
    Promise.all([
      fetch('/mini-tools/pww-index-' + loc + '.json').then(function (r) { return r.ok ? r.json() : null; }),
      fetch('/mini-tools/object-attributes.json').then(function (r) { return r.ok ? r.json() : null; }),
      fetch('/mini-tools/syllable-counts.json').then(function (r) { return r.ok ? r.json() : null; })
    ]).then(function (res) {
      var syl = {};
      if (res[2] && res[2].keys) {
        Object.keys(res[2].keys).forEach(function (k) {
          if (res[2].keys[k][loc]) syl[k] = res[2].keys[k][loc];
        });
      }
      var built = self.buildPictures(res[0], res[1], syl);
      self._pictures = built.items;
      self.themeName = built.themes;
      then();
    }).catch(function () { self._pictures = []; then(); });
  },

  /* ⚠ PURE — the gate calls this with fixtures and no `init`, so it must
     touch no instance state. It returns {items, themes} and the CALLER
     assigns; an earlier version wrote straight to this.themeName and blew
     up outside a browser, which is exactly the coupling a pure function
     is supposed to prevent.
     Keys with no attribute row are dropped rather than carried with holes,
     so a conceptual rule can never silently return false for a card the
     tray is actually showing. */
  buildPictures: function (idx, attrs, syl) {
    if (!idx || !idx.themes || !attrs || !attrs.keys) return { items: [], themes: {} };
    var byKey = {}, themes = {};
    idx.themes.forEach(function (t) {
      themes[t.k] = t.n || t.k;
      t.c.forEach(function (c) {
        if (c.na) return;
        if (!attrs.keys[c.k]) return;
        if (!byKey[c.k]) {
          byKey[c.k] = {
            uid: 'p:' + c.k, kind: 'picture', key: c.k, word: c.s,
            file: c.f, dir: t.d, themes: [], attr: attrs.keys[c.k],
            syl: (syl && syl[c.k]) || null
          };
        }
        byKey[c.k].themes.push(t.k);
      });
    });
    /* ⚠ Drop any theme with no usable item. `activities`, `colors` and
       `emotions` are entirely non-object cards (gerunds, colour words,
       feeling words), so a rule naming one of them would match nothing and
       could never be guessed. The runtime rule filter catches that too,
       but an empty theme should not reach the picker in the first place. */
    var items = Object.keys(byKey).sort().map(function (k) { return byKey[k]; });
    var live = {};
    items.forEach(function (it) { it.themes.forEach(function (t) { live[t] = themes[t]; }); });
    return { items: items, themes: live };
  },

  /* ---------------- rounds ---------------- */
  TRAY_SIZE: 12,

  _newRound: function () {
    var self = this;
    this.placement = {};
    this.revealed = false;
    if (this.world === 'block') {
      this.pool = this.blockSet();
      this._fillTray();
      return;
    }
    this._loadPictures(function () {
      self.pool = self._pictures.slice();
      self._fillTray();
      if (self._wrap) self.render();
    });
  },

  /* ⚠ A rule may only be posed over items that CARRY the field it reads.
     The gated syllable corpus covers 596-837 keys per locale, so some
     cards have no count; putting one in the tray under a "how many beats?"
     rule would have the hoop release it silently, which is a lie rather
     than a lesson. Items the rule cannot speak about stay out of the tray. */
  _applicable: function (item, rule) {
    if (!rule) return true;
    if (rule.f === 'syllables') return item.kind === 'picture' && !!item.syl;
    if (rule.f === 'initial') return item.kind === 'picture' && !!item.word;
    return true;
  },

  _fillTray: function () {
    /* a working subset, not the whole world — twelve is what a class can
       hold in mind, and it is what makes the pacing "bring me one" */
    var self = this;
    var p = this.pool.filter(function (it) {
      return self._applicable(it, self.ruleA) && self._applicable(it, self.ruleB);
    });
    var out = [], i;
    for (i = p.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = p[i]; p[i] = p[j]; p[j] = t;
    }
    /* ⚠ BALANCE THE TRAY ACROSS ALL FOUR REGIONS, not merely hit-vs-miss.
       An earlier version guaranteed "some that fit, some that do not", and
       with two rules set it handed over twelve things of which none was
       aquatic and none was both — so the second hoop and THE LENS never
       got used, and the lens is the entire pedagogy. Bucket by region and
       deal round-robin, so every region the rules can produce is
       represented while any remains. */
    if (this.mode === 'guess' && (this.ruleA || this.ruleB)) {
      var bucket = { both: [], a: [], b: [], out: [] };
      for (i = 0; i < p.length; i++) bucket[this.regionFor(p[i], this.ruleA, this.ruleB)].push(p[i]);
      var order = ['both', 'a', 'b', 'out'], round = 0;
      while (out.length < this.TRAY_SIZE && round < this.TRAY_SIZE) {
        var tookAny = false;
        for (i = 0; i < order.length && out.length < this.TRAY_SIZE; i++) {
          var b = bucket[order[i]];
          if (round < b.length) { out.push(b[round]); tookAny = true; }
        }
        if (!tookAny) break;
        round++;
      }
    } else {
      out = p.slice(0, this.TRAY_SIZE);
    }
    this.tray = out.slice(0, this.TRAY_SIZE);
    this.tray.forEach(function (it) { self.placement[it.uid] = 'tray'; });
  },

  _availableRules: function () {
    var self = this, out = [];
    this.RULE_FAMILIES.forEach(function (fam) {
      if (fam.world !== self.world) return;
      if (fam.tier === 'premium' && !self.premium) return;
      var vals = [];
      if (fam.f === 'colour') vals = self.COLOURS.map(function (c) { return c.k; });
      else if (fam.f === 'shape') vals = self.SHAPES.map(function (s) { return s.k; });
      else if (fam.f === 'size') vals = self.SIZES.map(function (s) { return s.k; });
      else if (fam.f === 'syllables') vals = [1, 2, 3];
      else if (fam.f === 'initial') vals = self._initials();
      else if (fam.f === 'theme') vals = Object.keys(self.themeName).slice(0, 50);
      else vals = ['living', 'once_living', 'never_living', 'natural', 'made', 'yes', 'no',
        'self', 'moved', 'still', 'hand', 'person', 'bigger', 'land', 'water', 'air'];
      vals.forEach(function (v) {
        var rule = { f: fam.f, v: v };
        if (self.splits(rule, self.pool)) out.push(rule);
      });
    });
    return out;
  },

  _initials: function () {
    var seen = {}, out = [];
    this.pool.forEach(function (it) {
      if (it.kind !== 'picture' || !it.word) return;
      var c = it.word.charAt(0).toLocaleLowerCase();
      if (!seen[c]) { seen[c] = 1; out.push(c); }
    });
    return out.sort();
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },
  _clearTimers: function () { this._timers.forEach(clearTimeout); this._timers = []; },

  _say: function (text) {
    if (!this.api.settings.speak || !text) return;
    try { LCSAudio.speak({ type: 'word', text: String(text), lang: this.api.lang, rate: 0.9 }); } catch (_) {}
  },

  /* =================================================================
     THE DROP — the whole instrument is in here.
     ================================================================= */
  _drop: function (uid, target) {
    var item = this._itemByUid(uid);
    if (!item) return;
    if (this.mode === 'open' || target === 'tray' || target === 'out') {
      this.placement[uid] = target;
      this.render();
      return;
    }
    /* guess-my-rule: the HOOP decides, not the child and not the teacher */
    var truth = this.regionFor(item, this.ruleA, this.ruleB);
    if (truth === target) {
      this.placement[uid] = target;
      this.api.sound(660);
    } else {
      /* ⚠ RELEASED, NOT REJECTED. It settles outside the ring and stays on
         the mat, because the growing outside set is the other half of the
         evidence. Nothing is marked, nothing is counted, nothing reddens. */
      this.placement[uid] = 'out';
      this._released = uid;
      var self = this;
      this._after(900, function () { if (self._released === uid) { self._released = null; self.render(); } });
    }
    this.render();
  },

  _itemByUid: function (uid) {
    var i;
    for (i = 0; i < this.tray.length; i++) if (this.tray[i].uid === uid) return this.tray[i];
    return null;
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api, self = this;
    this._clearTimers();
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'hp-wrap');
    this._wrap = wrap;

    wrap.appendChild(this._buildTopBar());
    wrap.appendChild(this._buildMat());
    wrap.appendChild(this._buildTray());
    if (this.picking) wrap.appendChild(this._buildRulePicker());
    wrap.appendChild(this._buildFoot());
    wrap.appendChild(this._buildPrintSheet());

    api.stage.appendChild(wrap);
    this._wireDrag();
    void self;
  },

  _chip: function (label, on, fn, extra) {
    var b = this.api.el('button', 'hp-chip' + (on ? ' hp-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  _buildTopBar: function () {
    var self = this, api = this.api;
    var bar = api.el('div', 'hp-bar');
    bar.appendChild(this._chip(api.t('modeOpen'), this.mode === 'open', function () {
      self.mode = 'open'; self.picking = null; self.revealed = false; self.render();
    }));
    bar.appendChild(this._chip(api.t('modeGuess'), this.mode === 'guess', function () {
      self.mode = 'guess'; self.revealed = false; self.picking = 'a'; self.render();
    }));
    var sp = api.el('span', 'hp-sep');
    bar.appendChild(sp);
    bar.appendChild(this._chip(api.t('trayBlocks'), this.world === 'block', function () {
      self.world = 'block'; self.ruleA = null; self.ruleB = null; self._newRound(); self.render();
    }));
    bar.appendChild(this._chip(api.t('trayPictures'), this.world === 'picture', function () {
      self.world = 'picture'; self.ruleA = null; self.ruleB = null; self._newRound(); self.render();
    }));
    return bar;
  },

  /* the mat is the universe; the two rings are the sets; everything else
     on the mat is `outside`, which is where the counter-examples live */
  _buildMat: function () {
    var api = this.api, self = this;
    var mat = api.el('div', 'hp-mat');

    var rings = api.el('div', 'hp-rings');

    /* ⚠ THE RINGS ARE DRAWN, THE REGIONS ARE INVISIBLE BOXES OVER THEM.
       A first attempt laid the three regions out as flex siblings and the
       result read as ONE pill in three stripes — no overlap visible, and
       the overlap IS the pedagogy. Two real intersecting ellipses behind,
       absolutely-positioned drop zones on top.
       Geometry, as % of the container: ring A spans 0-62, ring B spans
       38-100, so the lens is 38-62. The zones sit inside those bands with
       an inset so a tile never straddles a curve. */
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'hp-svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    [['hp-ringa', 31], ['hp-ringb', 69]].forEach(function (r) {
      var el = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
      el.setAttribute('cx', r[1]); el.setAttribute('cy', 50);
      el.setAttribute('rx', 31); el.setAttribute('ry', 49);
      el.setAttribute('class', r[0]);
      svg.appendChild(el);
    });
    rings.appendChild(svg);

    ['a', 'both', 'b'].forEach(function (r) {
      var z = api.el('div', 'hp-zone hp-zone-' + r);
      z.setAttribute('data-zone', r);
      var cap = api.el('div', 'hp-cap');
      cap.textContent = self._capFor(r);
      z.appendChild(cap);
      var slot = api.el('div', 'hp-slot');
      slot.setAttribute('data-slot', r);
      z.appendChild(slot);
      rings.appendChild(z);
    });
    mat.appendChild(rings);

    var out = api.el('div', 'hp-out');
    out.setAttribute('data-zone', 'out');
    var ol = api.el('div', 'hp-outlabel');
    ol.textContent = api.t('outsideLabel');
    out.appendChild(ol);
    var oslot = api.el('div', 'hp-slot hp-slot-out');
    oslot.setAttribute('data-slot', 'out');
    out.appendChild(oslot);
    mat.appendChild(out);

    /* place every item that is not in the tray */
    this.tray.forEach(function (it) {
      var where = self.placement[it.uid];
      if (!where || where === 'tray') return;
      var host = mat.querySelector('[data-slot="' + where + '"]');
      if (host) host.appendChild(self._tile(it, where === self._released));
    });
    return mat;
  },

  _capFor: function (r) {
    var api = this.api;
    if (r === 'both') return '';
    var rule = r === 'a' ? this.ruleA : this.ruleB;
    if (this.mode === 'open') return api.t(r === 'a' ? 'hoopA' : 'hoopB');
    /* ⚠ NEVER the rule text before reveal — the numeral-leak discipline */
    if (!this.revealed) return api.t('hiddenRule');
    return this.ruleLabel(rule);
  },

  _buildTray: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'hp-tray');
    var lab = api.el('div', 'hp-traylabel');
    lab.textContent = api.t('trayLabel');
    box.appendChild(lab);
    var slot = api.el('div', 'hp-slot hp-slot-tray');
    slot.setAttribute('data-slot', 'tray');
    this.tray.forEach(function (it) {
      if (self.placement[it.uid] !== 'tray') return;
      slot.appendChild(self._tile(it, false));
    });
    box.appendChild(slot);
    return box;
  },

  _tile: function (item, released) {
    var api = this.api, self = this;
    var t = api.el('button', 'hp-tile' + (released ? ' hp-released' : ''));
    t.type = 'button';
    t.setAttribute('data-uid', item.uid);
    if (item.kind === 'block') {
      t.appendChild(this._blockGlyph(item));
      t.setAttribute('aria-label', api.t(this._labelOf('size', item.size)) + ' ' +
        api.t(this._labelOf('colour', item.colour)) + ' ' + api.t(this._labelOf('shape', item.shape)));
    } else {
      var img = document.createElement('img');
      img.className = 'hp-pic';
      img.src = '/image-library-webp/themes/' + item.dir + '/' + item.file + '@2x.webp';
      img.alt = item.word || item.key;
      img.loading = 'lazy';
      t.appendChild(img);
      var cap = api.el('span', 'hp-word');
      cap.textContent = item.word || item.key;
      t.appendChild(cap);
      t.addEventListener('click', function (e) { if (!self._dragged) self._say(item.word); void e; });
    }
    return t;
  },

  _labelOf: function (fam, v) {
    var t = fam === 'colour' ? this.COLOURS : fam === 'shape' ? this.SHAPES : this.SIZES, i;
    for (i = 0; i < t.length; i++) if (t[i].k === v) return t[i].label;
    return 'vSmall';
  },

  _blockGlyph: function (item) {
    var C = null, i;
    for (i = 0; i < this.COLOURS.length; i++) if (this.COLOURS[i].k === item.colour) C = this.COLOURS[i];
    var sc = item.size === 'small' ? 0.62 : 1;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'hp-block');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('aria-hidden', 'true');
    var d = {
      circle:   'M24 6a18 18 0 1 1 0 36 18 18 0 0 1 0-36z',
      square:   'M7 7h34v34H7z',
      triangle: 'M24 5 44 42H4z',
      hexagon:  'M24 4 41 14v20L24 44 7 34V14z'
    }[item.shape];
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('d', d);
    p.setAttribute('transform', 'translate(24 24) scale(' + sc + ') translate(-24 -24)');
    p.setAttribute('fill', C ? C.hex : '#888');
    /* redundant channel for a colour-blind child — a texture per colour,
       which adds NO attribute the rules can see */
    if (this.api.settings.patterns) {
      p.setAttribute('stroke', 'rgba(255,255,255,.85)');
      p.setAttribute('stroke-width', ({ red: 0, blue: 3, yellow: 5, green: 7 })[item.colour] || 0);
      p.setAttribute('stroke-dasharray', ({ red: '', blue: '2 5', yellow: '6 4', green: '1 4' })[item.colour] || '');
    }
    svg.appendChild(p);
    return svg;
  },

  _buildRulePicker: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'hp-picker');
    var h = api.el('div', 'hp-hint');
    h.textContent = api.t('setRule') + ' — ' + api.t(this.picking === 'a' ? 'hoopA' : 'hoopB');
    box.appendChild(h);
    var grid = api.el('div', 'hp-rulegrid');
    var none = this._chip(api.t('noRule'), false, function () { self._setRule(null); });
    grid.appendChild(none);
    this._availableRules().forEach(function (rule) {
      grid.appendChild(self._chip(self.ruleLabel(rule), false, function () { self._setRule(rule); }));
    });
    box.appendChild(grid);
    if (!this.premium && this.premiumKnown && this.world === 'picture') {
      var g = api.el('div', 'hp-gate');
      var s = api.el('span');
      s.textContent = api.t('gateRules');
      var a = document.createElement('a');
      a.href = '/' + api.lang + '/pricing?from=tool-sorting-hoops';
      a.target = '_top'; a.rel = 'noopener';
      a.textContent = api.t('unlock');
      g.append(s, a);
      box.appendChild(g);
    }
    return box;
  },

  _setRule: function (rule) {
    if (this.picking === 'a') { this.ruleA = rule; this.picking = 'b'; }
    else { this.ruleB = rule; this.picking = null; this._fillTray(); }
    this.render();
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'hp-foot');
    if (this.mode === 'guess') {
      foot.appendChild(this._chip(api.t(this.revealed ? 'hide' : 'reveal'), false, function () {
        self.revealed = !self.revealed; self.render();
      }));
      foot.appendChild(this._chip(api.t('setRule'), false, function () { self.picking = 'a'; self.render(); }));
    }
    foot.appendChild(this._chip(api.t('newThings'), false, function () { self._newRound(); self.render(); }));
    foot.appendChild(this._chip(api.t('clearMat'), false, function () {
      self.tray.forEach(function (it) { self.placement[it.uid] = 'tray'; });
      self.render();
    }));
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'hp-locked');
    foot.appendChild(pr);
    var pv = api.el('div', 'hp-privacy');
    pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.hp-gate');
    if (old) old.remove();
    var g = api.el('div', 'hp-gate');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-sorting-hoops';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  },

  _buildPrintSheet: function () {
    var api = this.api, self = this;
    var sheet = api.el('div', 'hp-printsheet');
    var h = api.el('div', 'hp-printhead');
    h.textContent = api.t('title');
    sheet.appendChild(h);
    ['a', 'both', 'b', 'out'].forEach(function (r) {
      var row = api.el('div', 'hp-printrow');
      var lab = api.el('div', 'hp-printcap');
      lab.textContent = r === 'out' ? api.t('outsideLabel')
        : r === 'both' ? api.t('hoopA') + ' + ' + api.t('hoopB')
          : self._capFor(r) || api.t(r === 'a' ? 'hoopA' : 'hoopB');
      row.appendChild(lab);
      var body = api.el('div', 'hp-printbody');
      var names = self.tray.filter(function (it) { return self.placement[it.uid] === r; })
        .map(function (it) { return it.kind === 'picture' ? it.word : it.uid.split(':').slice(1).join(' '); });
      body.textContent = names.join(' · ');
      row.appendChild(body);
      sheet.appendChild(row);
    });
    return sheet;
  },

  /* =================================================================
     DRAG — pattern from sort-bins-core.js:350-435 (body-level ghost,
     pointer capture, rect hit-test, re-parent). ZERO lines imported.
     ⚠ NO HOVER TELL. `_hover` toggles a class that is identical for a
     satisfying and a non-satisfying item — the hoop must not answer until
     you let go.
     ================================================================= */
  _wireDrag: function () {
    var self = this;
    var tiles = this._wrap.querySelectorAll('.hp-tile');
    Array.prototype.forEach.call(tiles, function (tile) {
      tile.addEventListener('pointerdown', function (e) {
        if (e.button !== 0 && e.pointerType === 'mouse') return;
        e.preventDefault();
        self._startDrag(tile, e);
      });
      tile.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        var order = ['tray', 'a', 'both', 'b', 'out'];
        var uid = tile.getAttribute('data-uid');
        var cur = order.indexOf(self.placement[uid] || 'tray');
        self._drop(uid, order[(cur + 1) % order.length]);
      });
    });
  },

  _startDrag: function (tile, e) {
    var self = this;
    var rect = tile.getBoundingClientRect();
    var ghost = document.createElement('div');
    ghost.className = 'hp-ghost';
    ghost.style.width = rect.width + 'px';
    ghost.style.height = rect.height + 'px';
    ghost.innerHTML = tile.innerHTML;
    document.body.appendChild(ghost);
    var move = function (ev) {
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
      var target = self._zoneAt(ev.clientX, ev.clientY);
      self._dragged = true;
      setTimeout(function () { self._dragged = false; }, 0);
      if (target) self._drop(tile.getAttribute('data-uid'), target);
    };
    tile.classList.add('hp-dragging');
    try { tile.setPointerCapture(e.pointerId); } catch (_) {}
    tile.addEventListener('pointermove', move);
    tile.addEventListener('pointerup', done);
    tile.addEventListener('pointercancel', done);
    move(e);
  },

  _zoneAt: function (x, y) {
    var zones = this._wrap.querySelectorAll('[data-slot]');
    var i, r;
    for (i = 0; i < zones.length; i++) {
      r = zones[i].getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return zones[i].getAttribute('data-slot');
    }
    return null;
  },

  _hover: function (x, y) {
    var z = this._zoneAt(x, y);
    this._clearHover();
    if (!z) return;
    var el = this._wrap.querySelector('[data-slot="' + z + '"]');
    /* identical for every item — the hoop gives nothing away */
    if (el) el.classList.add('hp-over');
  },

  _clearHover: function () {
    var over = this._wrap.querySelectorAll('.hp-over');
    Array.prototype.forEach.call(over, function (e) { e.classList.remove('hp-over'); });
  }
};

function injectSortingHoopsCSS() {
  if (document.getElementById('hp-style')) return;
  var st = document.createElement('style');
  st.id = 'hp-style';
  st.textContent = ''
    + '.hp-wrap{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
    + '.hp-bar{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;align-items:center;}'
    + '.hp-sep{width:1px;height:26px;background:rgba(20,107,94,.22);margin:0 4px;}'
    + '.hp-chip{min-height:44px;padding:8px 14px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.hp-chip:hover{background:#F3EADA;}'
    + '.hp-chip.hp-on{background:#146B5E;border-color:#146B5E;color:#FFFDF7;}'
    + '.hp-chip:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    /* THE MAT — the universe. The rings are sets inside it; the band below
       them is `outside`, which is where released items accumulate. */
    + '.hp-mat{width:min(100%,700px);border:2px dashed rgba(20,107,94,.28);border-radius:20px;'
    +   'background:rgba(255,253,247,.6);padding:10px;display:flex;flex-direction:column;gap:8px;}'
    + '.hp-rings{position:relative;width:100%;height:clamp(200px,32vw,260px);}'
    + '.hp-svg{position:absolute;inset:0;width:100%;height:100%;}'
    + '.hp-ringa{fill:rgba(47,111,181,.10);stroke:#2F6FB5;stroke-width:.55;vector-effect:non-scaling-stroke;}'
    + '.hp-ringb{fill:rgba(242,120,75,.10);stroke:#C2562F;stroke-width:.55;vector-effect:non-scaling-stroke;}'
    /* zones are invisible; the drawn ellipses carry the whole meaning */
    + '.hp-zone{position:absolute;top:6%;height:88%;display:flex;flex-direction:column;align-items:center;'
    +   'gap:3px;border-radius:12px;}'
    + '.hp-zone-a{left:3%;width:31%;}'
    + '.hp-zone-both{left:39.5%;width:21%;}'
    + '.hp-zone-b{left:66%;width:31%;}'
    + '.hp-zone.hp-over{background:rgba(20,107,94,.14);}'
    + '.hp-cap{font-family:"Baloo 2",Nunito,system-ui,sans-serif;font-size:15px;color:#146B5E;text-align:center;'
    +   'min-height:19px;line-height:1.2;padding:0 6px;}'
    + '.hp-slot{display:flex;flex-wrap:wrap;gap:5px;justify-content:center;align-content:flex-start;'
    +   'width:100%;flex:1 1 auto;min-height:44px;}'
    + '.hp-out{display:flex;flex-direction:column;gap:4px;padding:6px;border-radius:12px;'
    +   'background:rgba(107,101,88,.06);}'
    + '.hp-out.hp-over{background:rgba(20,107,94,.16);}'
    + '.hp-outlabel{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;}'
    + '.hp-slot-out{min-height:52px;}'
    /* TILES */
    + '.hp-tile{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;'
    +   'min-width:52px;min-height:52px;padding:4px;border-radius:12px;border:1.5px solid rgba(20,107,94,.2);'
    +   'background:#FFFDF7;cursor:grab;font:inherit;touch-action:none;user-select:none;}'
    + '.hp-tile:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
    + '.hp-tile.hp-dragging{opacity:.32;}'
    /* the released item drifts out — a movement, never a colour */
    + '.hp-tile.hp-released{animation:hp-drift .5s var(--lcs-ease,ease-out);}'
    + '@keyframes hp-drift{from{transform:translateY(-14px);opacity:.45;}to{transform:none;opacity:1;}}'
    + '.hp-block{width:38px;height:38px;display:block;}'
    + '.hp-pic{width:40px;height:40px;object-fit:contain;display:block;}'
    + '.hp-word{font-family:Nunito,system-ui,sans-serif;font-size:14px;line-height:1.1;color:#146B5E;'
    +   'max-width:76px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}'
    + '.hp-ghost{position:fixed;z-index:99999;pointer-events:none;transform:translate(-50%,-50%);'
    +   'display:flex;align-items:center;justify-content:center;opacity:.9;}'
    /* TRAY + PICKER + FOOT */
    + '.hp-tray{width:min(100%,700px);display:flex;flex-direction:column;gap:5px;}'
    + '.hp-traylabel{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;text-align:center;}'
    + '.hp-slot-tray{min-height:56px;padding:6px;border-radius:14px;background:rgba(243,234,218,.6);}'
    + '.hp-picker{width:min(100%,700px);display:flex;flex-direction:column;align-items:center;gap:8px;'
    +   'padding:10px;border-radius:16px;background:rgba(243,234,218,.75);}'
    + '.hp-hint{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;text-align:center;}'
    + '.hp-rulegrid{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-height:168px;overflow-y:auto;}'
    + '.hp-foot{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;}'
    + '.hp-privacy{font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#6B6558;'
    +   'text-align:center;width:100%;}'
    + '.hp-locked{border-color:rgba(242,120,75,.55);color:#C2562F;}'
    + '.hp-gate{display:flex;align-items:center;gap:9px;flex-wrap:wrap;justify-content:center;padding:9px 12px;'
    +   'border-radius:12px;background:rgba(242,120,75,.1);font-family:Nunito,system-ui,sans-serif;font-size:14px;'
    +   'color:#8A4A2E;}'
    + '.hp-gate a{color:#C2562F;font-weight:700;}'
    + '.hp-printsheet{display:none;}'
    + '@media (max-width:560px){'
    +   '.hp-zone-both{flex:0 0 30%;}'
    +   '.hp-cap{font-size:14px;}'
    +   '.hp-word{font-size:14px;max-width:60px;}'
    + '}'
    + 'body.hp-wide .lcs-header{flex-direction:column;}'
    /* the shell sets html,body{overflow:hidden} — past the fold on a phone
       is UNREACHABLE, not merely off-screen (letter-studio precedent) */
    + '@media (max-width:700px){body.hp-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'
    /* =====================================================================
       WIDE VIEWPORTS — GEOMETRY, and the two-branch shape number-balance
       taught. CARD-MAXED: the shell already gives an 1800px card at 2560 and
       the instrument was 27.3% of the screen. The chain-walk names FOUR
       binders across TWO branches:
         apparatus   .hp-mat   700  <== width:min(100%,700px)
                     .hp-rings 260  <== height:clamp(200px,32vw,260px)
         supply      .hp-tray  700  <== width:min(100%,700px)
                     .hp-tile   52  <== min-width/min-height
       Ramping only the repeated unit would have widened the tile row and
       left the HOOPS — the thing the tool is named for — at 700x260, which
       is exactly the defect number-balance shipped and I caught in its
       render. The single-branch walker would have led me there again.
       ⚠ `.hp-rings` is a HEIGHT and its `32vw` term is pinned at the 260px
       ceiling from 813px of viewport up, so the ceiling is what moves. The
       hoops are ellipses in a non-scaling-stroke SVG, so they follow the
       box in both axes for free — the ring geometry needs nothing.
       ⚠⚠ AND THE GLYPH INSIDE THE TILE, WHICH THE HOLLOW-WIDENING
       ASSERTION CANNOT SEE. `.hp-block` is a fixed 38px and `.hp-pic` a
       fixed 40px, so ramping the tile alone took the shape from 33% of
       its tile to 20% — a bigger box around the same small shape, which
       is the rekenrek defect one level DEEPER. The assertion compares
       the most-REPEATED unit (`.hp-tile`), and that genuinely grew, so
       it passed. The 2560 render is what showed it. The glyph, the
       picture and the word now ramp with the tile at roughly the 0.73
       ratio the base sizes use.
       ⚠ THE CAPTIONS CARRY COUNTS, so they are NUMERALS to the shared
       gate's 22px floor at 2560 — my first ramp took `.hp-cap` only to
       19px and TYPE failed. A caption is not chrome when it holds the
       number the child is reading off the mat.
       ⚠ TIER A's RINGS ARE 320, NOT THE 340 THE HEIGHT BUDGET ALLOWS.
       At 340 the Tier-A floor measured 860 of 880 — and identically in
       de, it, fi, nl AND sv, because the mat's height is geometry, not
       text. That stability is exactly what makes 20px the wrong margin
       to keep: `.hp-cap` IS text, at 17px with line-height 1.2, so a
       two-line caption in one of the six locales I did not measure adds
       ~21px and the floor is gone. 320 buys that line back. A margin
       that survives every locale you tested is not a margin that
       survives the ones you did not.
       ⚠ `min-width`/`min-height` on the tile are RAISED, never replaced;
       52px stays the floor at every width these rules do not reach.
       ===================================================================== */
    + '@media (min-width:1367px) and (min-height:880px){'
    +   'body.hp-wide .hp-mat,body.hp-wide .hp-tray{width:min(100%,900px);}'
    +   'body.hp-wide .hp-rings{height:clamp(200px,32vw,320px);}'
    +   'body.hp-wide .hp-tile{min-width:64px;min-height:64px;}'
    +   'body.hp-wide .hp-block{width:47px;height:47px;}'
    +   'body.hp-wide .hp-pic{width:49px;height:49px;}'
    +   'body.hp-wide .hp-word{font-size:15px;}'
    +   'body.hp-wide .hp-cap{font-size:18px;}'
    +   'body.hp-wide .hp-outlabel{font-size:16px;}'
    + '}'
    + '@media (min-width:1800px) and (min-height:1080px){'
    +   'body.hp-wide .hp-mat,body.hp-wide .hp-tray{width:min(100%,1120px);}'
    +   'body.hp-wide .hp-rings{height:clamp(200px,32vw,420px);}'
    +   'body.hp-wide .hp-tile{min-width:72px;min-height:72px;}'
    +   'body.hp-wide .hp-block{width:53px;height:53px;}'
    +   'body.hp-wide .hp-pic{width:55px;height:55px;}'
    +   'body.hp-wide .hp-word{font-size:16px;}'
    +   'body.hp-wide .hp-cap{font-size:20px;}'
    +   'body.hp-wide .hp-outlabel{font-size:18px;}'
    + '}'
    + '@media (min-width:2400px) and (min-height:1150px){'
    +   'body.hp-wide .hp-mat,body.hp-wide .hp-tray{width:min(100%,1320px);}'
    +   'body.hp-wide .hp-rings{height:clamp(200px,32vw,470px);}'
    +   'body.hp-wide .hp-tile{min-width:80px;min-height:80px;}'
    +   'body.hp-wide .hp-block{width:58px;height:58px;}'
    +   'body.hp-wide .hp-pic{width:61px;height:61px;}'
    +   'body.hp-wide .hp-word{font-size:17px;}'
    +   'body.hp-wide .hp-cap{font-size:23px;}'
    +   'body.hp-wide .hp-outlabel{font-size:20px;}'
    + '}'
    + '@media (prefers-reduced-motion:reduce){.hp-tile.hp-released{animation:none;}}'
    + '@media print{'
    +   '.hp-bar,.hp-mat,.hp-tray,.hp-picker,.hp-foot,.hp-gate{display:none !important;}'
    +   '.hp-printsheet{display:block !important;padding:10mm;}'
    +   '.hp-printhead{font-size:16pt;color:#000;margin-bottom:6mm;}'
    +   '.hp-printrow{margin-bottom:6mm;page-break-inside:avoid;break-inside:avoid;'
    +     'border-bottom:1px solid #000;padding-bottom:3mm;}'
    +   '.hp-printcap{font-size:12pt;color:#000;font-weight:700;}'
    +   '.hp-printbody{font-size:11pt;color:#000;}'
    + '}';
  document.head.appendChild(st);
}
