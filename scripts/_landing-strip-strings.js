'use strict';
/* =====================================================================
   TOOL #51 — THE LANDING STRIP — the ten non-English string sets
   =====================================================================
   Rebuilt, never translated. 35 keys per locale, identical key set,
   identical {n} {a} {b} {t} {p} placeholders.

   ---------------------------------------------------------------------
   WHY THESE NOUNS — the fence, measured against the shipped lexicon
   ---------------------------------------------------------------------
   Every structural noun in this apparatus is contested. The fence in the
   tool's own docblock named nine forbidden terms; measuring the shipped
   `mini tools/*.js` found FOUR MORE collisions the docblock did not, all
   of them on the word the English calls THE WALLS:

     picture-word-wall owns the classroom-wall word in every locale it
       ships: it/es `muro`, fr `mur`, nl `muur`, sv `vägg`, da `væg`,
       de `Wand`, pt `mural`.
     folding-wall (#47) owns:  pt `parede`, it `parete`, sv `vikvägg`,
       da `foldevæg`, fi `sermi`, and — the one that forces a genuine
       per-locale divergence — **no `mur`** (`Brettemuren`).
     calendar-wall owns da `Klassevægge`, fi `Kalenteriseinä` (`seinä`).
     baking-tray owns **fr `la plaque`** — a baking tray IS "une plaque"
       in French, so the PLAQUE cannot be a `plaque` in French.
     center-board owns sv `skylt`, da/no `skilt` ("Ingen skylt"), so the
       plaque cannot be a sign in any Scandinavian locale either.
     counting-cups owns sv `bricka`, da `brik`, no/da `brikke`;
       place-value-lab owns fi `palikka` and fi `laatta`;
       unroll-tape owns **no `stolpe`** (the height post) — so Norwegian
       cannot use the post word its two neighbours use.

   The result is that no part-noun is one word respelled ten times; each
   was chosen against what that language already ships.

     locale | apparatus name    | POSTS    | WALLS         | PLAQUE   | WEDGE
     -------|-------------------|----------|---------------|----------|-------
     de     | Die drei Pfosten  | Pfosten  | Mauern        | Schild   | Keil
     fr     | Les trois piquets | piquets  | butoirs       | pancarte | pointe
     es     | Los tres postes   | postes   | topes         | cartel   | cuña
     pt     | Os três postes    | postes   | muros         | letreiro | cunha
     it     | I tre paletti     | paletti  | sponde        | targa    | cuneo
     nl     | De drie palen     | palen    | stootblokken  | bordje   | wig
     sv     | De tre stolparna  | stolpar  | stoppklossar  | lapp     | kil
     da     | De tre stolper    | stolper  | stopklodser   | seddel   | kil
     no     | De tre pålene     | påler    | stoppklosser  | lapp     | kil
     fi     | Kolme tolppaa     | tolpat   | muurit        | kilpi    | kiila

   Notes on the divergences that are NOT cosmetic:
   - **no takes `påle` where sv/da take `stolpe`**, because unroll-tape's
     Norwegian string already names a `stolpe` as the height post.
   - **no takes `vegg`-free ground by NOT using a wall word at all**;
     `mur` is the Norwegian folding wall's own name.
   - **de keeps `Mauer` and pt keeps `muro`** because in those two
     languages the built-barrier word and the room-wall word are
     different lexemes (Mauer/Wand, muro/parede) and only the room-wall
     one is taken. es/it cannot do this: picture-word-wall took `muro`
     itself, so they move to `topes` / `sponde` (stops / bed-rails).
   - **fr `butoirs`** (door-buffers) rather than `murs`; **fr `pancarte`**
     rather than `plaque` (baking-tray) or `étiquette` (our-day).
   - **Scandinavian definite forms checked** before committing:
     stolparna / stolperne (da takes no double definiteness after "de
     tre") / pålene, stoppklossarna / stopklodserne / stoppklossene,
     kilen, lappen, sedlen. None collides with an unrelated word — the
     `bana`→`banan` trap does not recur here. `lappen` (sv/no) carries a
     colloquial "driving licence" reading in isolation; it is always
     introduced with the number attached, which removes it.
   - **fi carries no case on a numeral slot.** Every {a} {b} {t} {n} {p}
     sits after a carrier noun (`kohdassa {t}`, `kohtaan {n}`, `luvut
     {a}–{b}`) or after `kuin`, so the numeral stays nominative and the
     case lives on a word that never changes. A bare `{a}:stä` would be
     wrong half the time — 10 → kymmenestä (-stä) but 100 → sadasta
     (-sta), and vowel harmony cannot be baked into a fixed suffix.

   ---------------------------------------------------------------------
   PAID-PLAN NAME — measured in frontend/messages/<loc>.json `planTag`
   ---------------------------------------------------------------------
   The brief's list was wrong in three places; these are the shipped
   values, and the ones used below:
     de Lehrkraft-Abo · fr Abonnement Enseignant · es Plan Docente ·
     pt Plano Professor · it Piano Insegnante · nl Leerkracht-abonnement ·
     sv **Lärarplanen** (brief said Lärarabonnemanget) ·
     da **Lærerabonnementet** (brief said Lærer-abonnement) ·
     no **Lærerabonnementet** (brief said Lærer-abonnement) ·
     fi Opettajatilaus
   ⚠ The shipped TOOLS disagree with `planTag` and with each other: sv
   alone appears as Lärarabonnemanget, Lärarpaketet, Lärarplanen,
   Lärarprenumeration and Lärarprenumerationen across six tools. `planTag`
   is what the pricing surface renders, so it is what is used here.

   ---------------------------------------------------------------------
   TWO DELIBERATE DIVERGENCES FROM THE ENGLISH (both are English defects)
   ---------------------------------------------------------------------
   1. less10/less1/more1/more10 do NOT say "ten" and "one". `nudge()`
      multiplies by `step()`, which is 0.1 inside a ten — so the "ten"
      button moves ONE and the "one" button moves a TENTH at depth 1.
      These are written size-relative ("a big step" / "a small step"),
      which is true at both depths. The English must be changed to match,
      and the hard-coded "−10"/"+10" glyphs with it.
   2. sheetNote never uses the WALLS noun for the classroom wall. The
      English says "put it up along the wall" three words after naming
      the apparatus's own walls. Each locale says "in the classroom".
   ===================================================================== */

module.exports = {

  /* ================================================================ de */
  de: {
    title:        'Die drei Pfosten',
    instruction:  'Eine Zahl kommt. Sagt, welchem Pfosten sie am nächsten ist, und legt sie erst dann hin — dann seht ihr, wo sie wirklich wohnt.',

    ariaStrip:    'An jedem Ende eine Mauer, dazwischen drei Pfosten: einer an jedem Ende, einer in der Mitte.',
    ariaPlaque:   'das Schild, bei {n}',
    ariaTruth:    'wo die Zahl wirklich wohnt',
    ariaTrace:    'welche Pfosten die Klasse bisher gewählt hat',

    setSpan:      'Wie weit es reicht',
    span100:      '0 bis 100',
    span20:       '0 bis 20',

    postLow:      'Am nächsten beim linken Pfosten',
    postMid:      'Am nächsten beim mittleren Pfosten',
    postHigh:     'Am nächsten beim rechten Pfosten',

    less10:       'Ein großer Schritt nach links',
    less1:        'Ein kleiner Schritt nach links',
    more1:        'Ein kleiner Schritt nach rechts',
    more10:       'Ein großer Schritt nach rechts',
    place:        'Hierhin legen',
    rerule:       'Den Zehner aufmachen, in dem sie wohnt',
    back:         'Zurück zum Ganzen',
    next:         'Noch eine Zahl',

    saidArrive:   '{n}. Welchem Pfosten ist sie am nächsten?',
    saidPost:     'Am nächsten bei {p}. Legt sie jetzt hin.',
    saidMoved:    '{n}',
    saidTruth:    'Sie wohnt bei {t}. Ihr habt sie auf {n} gelegt.',
    saidRerule:   'Jetzt geht es von {a} bis {b}. Die drei Pfosten sind wieder da.',
    saidBack:     'Zurück zum Ganzen, {a} bis {b}.',
    saidEnd:      'Weiter als {n} geht es nicht.',
    saidNoRerule: 'Das ist schon ein einzelner Zehner. Weiter aufmachen geht nicht.',

    gateTitle:    'Die Papiervorlagen',
    gateBody:     'Alles hier ist kostenlos — beide Tiefen, alle drei Pfosten, jedes Hinlegen und das Neueinteilen. Das Lehrkraft-Abo bringt zusätzlich die Papiervorlagen zum Selbsteinteilen und Aufhängen, damit im Klassenzimmer die ganze Woche eine mitläuft.',
    gateCta:      'Das Lehrkraft-Abo ansehen',
    gateClose:    'Jetzt nicht',

    printBtn:     'Papiervorlagen drucken',
    sheetTitle:   'Papiervorlagen zum Einteilen',
    sheetNote:    'Jede leere Vorlage hat an beiden Enden eine Mauer und drei Pfosten. Tragt die beiden Endzahlen ein, hängt sie im Klassenzimmer auf und lasst die Klasse die ganze Woche Zahlen dazulegen. Die nächste teilt ihr als einen einzelnen Zehner ein, um darin weiterzumachen.'
  },

  /* ================================================================ fr */
  fr: {
    title:        'Les trois piquets',
    instruction:  'Un nombre arrive. Dites de quel piquet il est le plus près, et posez-le seulement après — vous verrez alors où il habite vraiment.',

    ariaStrip:    'Un butoir à chaque bout et trois piquets : un à chaque bout, un au milieu.',
    ariaPlaque:   'la pancarte, à {n}',
    ariaTruth:    'où le nombre habite vraiment',
    ariaTrace:    'quels piquets la classe a choisis jusqu’ici',

    setSpan:      'Jusqu’où ça va',
    span100:      'De 0 à 100',
    span20:       'De 0 à 20',

    postLow:      'Le plus près du piquet de gauche',
    postMid:      'Le plus près du piquet du milieu',
    postHigh:     'Le plus près du piquet de droite',

    less10:       'Un grand pas vers la gauche',
    less1:        'Un petit pas vers la gauche',
    more1:        'Un petit pas vers la droite',
    more10:       'Un grand pas vers la droite',
    place:        'Le poser ici',
    rerule:       'Ouvrir la dizaine où il habite',
    back:         'Revenir à l’ensemble',
    next:         'Un autre nombre',

    saidArrive:   '{n}. De quel piquet est-il le plus près ?',
    saidPost:     'Le plus près de {p}. Posez-le maintenant.',
    saidMoved:    '{n}',
    saidTruth:    'Il habite au {t}. Vous l’avez posé au {n}.',
    saidRerule:   'Ça va maintenant de {a} à {b}. Les trois piquets sont de retour.',
    saidBack:     'Retour à l’ensemble, de {a} à {b}.',
    saidEnd:      'Ça ne va pas plus loin que {n}.',
    saidNoRerule: 'C’est déjà une seule dizaine. On ne peut pas l’ouvrir davantage.',

    gateTitle:    'Les modèles en papier',
    gateBody:     'Tout est gratuit ici — les deux profondeurs, les trois piquets, chaque pose et la nouvelle graduation. L’abonnement Enseignant ajoute les modèles en papier à graduer soi-même et à afficher dans la classe, pour en garder un en cours toute la semaine.',
    gateCta:      'Voir l’abonnement Enseignant',
    gateClose:    'Pas maintenant',

    printBtn:     'Imprimer les modèles en papier',
    sheetTitle:   'Modèles en papier à graduer',
    sheetNote:    'Chaque modèle vierge a un butoir à chaque bout et trois piquets. Écrivez les deux nombres des bouts, affichez-le dans la classe et laissez la classe y ajouter des nombres toute la semaine. Graduez le suivant comme une seule dizaine pour continuer à l’intérieur.'
  },

  /* ================================================================ es */
  es: {
    title:        'Los tres postes',
    instruction:  'Llega un número. Digan de qué poste está más cerca y solo entonces colóquenlo — así verán dónde vive de verdad.',

    ariaStrip:    'Un tope en cada extremo y tres postes: uno en cada extremo y uno en el medio.',
    ariaPlaque:   'el cartel, en {n}',
    ariaTruth:    'dónde vive de verdad el número',
    ariaTrace:    'qué postes ha elegido la clase hasta ahora',

    setSpan:      'Hasta dónde llega',
    span100:      'De 0 a 100',
    span20:       'De 0 a 20',

    postLow:      'Más cerca del poste de la izquierda',
    postMid:      'Más cerca del poste del medio',
    postHigh:     'Más cerca del poste de la derecha',

    less10:       'Un paso grande hacia la izquierda',
    less1:        'Un paso pequeño hacia la izquierda',
    more1:        'Un paso pequeño hacia la derecha',
    more10:       'Un paso grande hacia la derecha',
    place:        'Dejarlo aquí',
    rerule:       'Abrir la decena donde vive',
    back:         'Volver al conjunto',
    next:         'Otro número',

    saidArrive:   '{n}. ¿De qué poste está más cerca?',
    saidPost:     'Más cerca de {p}. Ahora colóquenlo.',
    saidMoved:    '{n}',
    saidTruth:    'Vive en el {t}. Ustedes lo dejaron en el {n}.',
    saidRerule:   'Ahora va de {a} a {b}. Los tres postes están de vuelta.',
    saidBack:     'De vuelta al conjunto, de {a} a {b}.',
    saidEnd:      'No llega más allá de {n}.',
    saidNoRerule: 'Esto ya es una sola decena. No se puede abrir más.',

    gateTitle:    'Las plantillas de papel',
    gateBody:     'Aquí todo es gratis: las dos profundidades, los tres postes, cada colocación y la nueva graduación. El plan Docente añade las plantillas de papel para graduarlas ustedes mismos y colgarlas en el aula, y así tener una funcionando toda la semana.',
    gateCta:      'Ver el plan Docente',
    gateClose:    'Ahora no',

    printBtn:     'Imprimir las plantillas de papel',
    sheetTitle:   'Plantillas de papel para graduar',
    sheetNote:    'Cada plantilla en blanco tiene un tope en cada extremo y tres postes. Escriban los dos números de los extremos, cuélguenla en el aula y dejen que la clase le agregue números toda la semana. Gradúen la siguiente como una sola decena para continuar dentro de ella.'
  },

  /* ================================================================ pt */
  pt: {
    title:        'Os três postes',
    instruction:  'Chega um número. Digam de qual poste ele está mais perto e só então coloquem — aí vocês veem onde ele mora de verdade.',

    ariaStrip:    'Um muro em cada ponta e três postes: um em cada ponta e um no meio.',
    ariaPlaque:   'o letreiro, em {n}',
    ariaTruth:    'onde o número mora de verdade',
    ariaTrace:    'quais postes a turma escolheu até agora',

    setSpan:      'Até onde vai',
    span100:      'De 0 a 100',
    span20:       'De 0 a 20',

    postLow:      'Mais perto do poste da esquerda',
    postMid:      'Mais perto do poste do meio',
    postHigh:     'Mais perto do poste da direita',

    less10:       'Um passo grande para a esquerda',
    less1:        'Um passo pequeno para a esquerda',
    more1:        'Um passo pequeno para a direita',
    more10:       'Um passo grande para a direita',
    place:        'Deixar aqui',
    rerule:       'Abrir a dezena onde ele mora',
    back:         'Voltar para o todo',
    next:         'Outro número',

    saidArrive:   '{n}. De qual poste ele está mais perto?',
    saidPost:     'Mais perto de {p}. Agora coloquem.',
    saidMoved:    '{n}',
    saidTruth:    'Ele mora no {t}. Vocês colocaram no {n}.',
    saidRerule:   'Agora vai de {a} a {b}. Os três postes voltaram.',
    saidBack:     'De volta ao todo, de {a} a {b}.',
    saidEnd:      'Não passa de {n}.',
    saidNoRerule: 'Isto já é uma dezena só. Não dá para abrir mais.',

    gateTitle:    'Os modelos de papel',
    gateBody:     'Aqui tudo é grátis — as duas profundidades, os três postes, cada colocação e a nova graduação. O plano Professor traz ainda os modelos de papel para vocês mesmos graduarem e pendurarem na sala, para deixar um funcionando a semana toda.',
    gateCta:      'Ver o plano Professor',
    gateClose:    'Agora não',

    printBtn:     'Imprimir os modelos de papel',
    sheetTitle:   'Modelos de papel para graduar',
    sheetNote:    'Cada modelo em branco tem um muro em cada ponta e três postes. Escrevam os dois números das pontas, pendurem na sala e deixem a turma acrescentar números a semana toda. Graduem o próximo como uma dezena só, para continuar dentro dela.'
  },

  /* ================================================================ it */
  it: {
    title:        'I tre paletti',
    instruction:  'Arriva un numero. Dite a quale paletto è più vicino e solo dopo posatelo — così vedrete dove abita davvero.',

    ariaStrip:    'Una sponda a ogni estremità e tre paletti: uno a ogni estremità e uno al centro.',
    ariaPlaque:   'la targa, a {n}',
    ariaTruth:    'dove abita davvero il numero',
    ariaTrace:    'quali paletti ha scelto la classe finora',

    setSpan:      'Fin dove arriva',
    span100:      'Da 0 a 100',
    span20:       'Da 0 a 20',

    postLow:      'Più vicino al paletto di sinistra',
    postMid:      'Più vicino al paletto in mezzo',
    postHigh:     'Più vicino al paletto di destra',

    less10:       'Un passo grande verso sinistra',
    less1:        'Un passo piccolo verso sinistra',
    more1:        'Un passo piccolo verso destra',
    more10:       'Un passo grande verso destra',
    place:        'Posarlo qui',
    rerule:       'Aprire la decina in cui abita',
    back:         'Tornare all’insieme',
    next:         'Un altro numero',

    saidArrive:   '{n}. A quale paletto è più vicino?',
    saidPost:     'Più vicino a {p}. Adesso posatelo.',
    saidMoved:    '{n}',
    saidTruth:    'Abita al {t}. Voi l’avete posato al {n}.',
    saidRerule:   'Adesso va da {a} a {b}. I tre paletti sono di nuovo qui.',
    saidBack:     'Di nuovo all’insieme, da {a} a {b}.',
    saidEnd:      'Non va oltre {n}.',
    saidNoRerule: 'Questa è già una sola decina. Non si apre oltre.',

    gateTitle:    'I modelli di carta',
    gateBody:     'Qui è tutto gratuito: entrambe le profondità, i tre paletti, ogni posa e la nuova graduazione. Il piano Insegnante aggiunge i modelli di carta da graduare voi stessi e appendere in aula, così ne resta uno in corso per tutta la settimana.',
    gateCta:      'Scopri il piano Insegnante',
    gateClose:    'Non ora',

    printBtn:     'Stampa i modelli di carta',
    sheetTitle:   'Modelli di carta da graduare',
    sheetNote:    'Ogni modello vuoto ha una sponda a entrambe le estremità e tre paletti. Scrivete i due numeri delle estremità, appendetelo in aula e lasciate che la classe ci aggiunga numeri per tutta la settimana. Graduate il successivo come una sola decina, per continuare al suo interno.'
  },

  /* ================================================================ nl */
  nl: {
    title:        'De drie palen',
    instruction:  'Er komt een getal. Zeg bij welke paal het het dichtst staat en leg het pas daarna neer — dan zie je waar het echt woont.',

    ariaStrip:    'Aan elk uiteinde een stootblok en drie palen: één aan elk uiteinde en één in het midden.',
    ariaPlaque:   'het bordje, op {n}',
    ariaTruth:    'waar het getal echt woont',
    ariaTrace:    'welke palen de klas tot nu toe gekozen heeft',

    setSpan:      'Hoe ver het reikt',
    span100:      '0 tot 100',
    span20:       '0 tot 20',

    postLow:      'Het dichtst bij de linkerpaal',
    postMid:      'Het dichtst bij de middelste paal',
    postHigh:     'Het dichtst bij de rechterpaal',

    less10:       'Een grote stap naar links',
    less1:        'Een kleine stap naar links',
    more1:        'Een kleine stap naar rechts',
    more10:       'Een grote stap naar rechts',
    place:        'Hier neerleggen',
    rerule:       'Het tiental openmaken waar het in woont',
    back:         'Terug naar het geheel',
    next:         'Nog een getal',

    saidArrive:   '{n}. Bij welke paal staat het het dichtst?',
    saidPost:     'Het dichtst bij {p}. Leg het nu neer.',
    saidMoved:    '{n}',
    saidTruth:    'Het woont op {t}. Jullie legden het op {n}.',
    saidRerule:   'Nu loopt het van {a} tot {b}. De drie palen zijn er weer.',
    saidBack:     'Terug naar het geheel, {a} tot {b}.',
    saidEnd:      'Verder dan {n} gaat het niet.',
    saidNoRerule: 'Dit is al één tiental. Verder openmaken kan niet.',

    gateTitle:    'De papieren sjablonen',
    gateBody:     'Alles hier is gratis — beide dieptes, alle drie de palen, elke plaatsing en het opnieuw indelen. Het Leerkracht-abonnement voegt de papieren sjablonen toe om zelf in te delen en in de klas op te hangen, zodat er de hele week één loopt.',
    gateCta:      'Bekijk het Leerkracht-abonnement',
    gateClose:    'Nu niet',

    printBtn:     'Papieren sjablonen afdrukken',
    sheetTitle:   'Papieren sjablonen om in te delen',
    sheetNote:    'Elk leeg sjabloon heeft aan beide uiteinden een stootblok en drie palen. Schrijf de twee getallen van de uiteinden erbij, hang het in de klas op en laat de klas er de hele week getallen bij zetten. Deel het volgende in als één tiental om daarbinnen verder te gaan.'
  },

  /* ================================================================ sv */
  sv: {
    title:        'De tre stolparna',
    instruction:  'Ett tal dyker upp. Säg vilken stolpe det är närmast, och lägg det först då — sedan ser ni var det egentligen bor.',

    ariaStrip:    'En stoppkloss i varje ände och tre stolpar: en i varje ände och en i mitten.',
    ariaPlaque:   'lappen, vid {n}',
    ariaTruth:    'var talet egentligen bor',
    ariaTrace:    'vilka stolpar klassen har valt hittills',

    setSpan:      'Hur långt det räcker',
    span100:      '0 till 100',
    span20:       '0 till 20',

    postLow:      'Närmast stolpen till vänster',
    postMid:      'Närmast stolpen i mitten',
    postHigh:     'Närmast stolpen till höger',

    less10:       'Ett stort steg åt vänster',
    less1:        'Ett litet steg åt vänster',
    more1:        'Ett litet steg åt höger',
    more10:       'Ett stort steg åt höger',
    place:        'Lägg det här',
    rerule:       'Öppna tiotalet där det bor',
    back:         'Tillbaka till det hela',
    next:         'Ett tal till',

    saidArrive:   '{n}. Vilken stolpe är det närmast?',
    saidPost:     'Närmast {p}. Lägg det nu.',
    saidMoved:    '{n}',
    saidTruth:    'Det bor på {t}. Ni la det på {n}.',
    saidRerule:   'Nu går det från {a} till {b}. De tre stolparna är tillbaka.',
    saidBack:     'Tillbaka till det hela, {a} till {b}.',
    saidEnd:      'Längre än {n} går det inte.',
    saidNoRerule: 'Det här är redan ett enda tiotal. Det går inte att öppna mer.',

    gateTitle:    'Pappersmallarna',
    gateBody:     'Allt här är gratis — båda djupen, alla tre stolparna, varje placering och den nya indelningen. Lärarplanen lägger till pappersmallarna som ni delar in själva och sätter upp i klassrummet, så att en får stå kvar hela veckan.',
    gateCta:      'Se Lärarplanen',
    gateClose:    'Inte nu',

    printBtn:     'Skriv ut pappersmallarna',
    sheetTitle:   'Pappersmallar att dela in',
    sheetNote:    'Varje tom mall har en stoppkloss i båda ändarna och tre stolpar. Skriv in de två talen i ändarna, sätt upp den i klassrummet och låt klassen lägga till tal hela veckan. Dela in nästa som ett enda tiotal för att fortsätta inuti det.'
  },

  /* ================================================================ da */
  da: {
    title:        'De tre stolper',
    instruction:  'Der kommer et tal. Sig, hvilken stolpe det er nærmest, og læg det først derefter — så ser I, hvor det i virkeligheden bor.',

    ariaStrip:    'En stopklods i hver ende og tre stolper: en i hver ende og en i midten.',
    ariaPlaque:   'sedlen, ved {n}',
    ariaTruth:    'hvor tallet i virkeligheden bor',
    ariaTrace:    'hvilke stolper klassen har valgt indtil nu',

    setSpan:      'Hvor langt det når',
    span100:      '0 til 100',
    span20:       '0 til 20',

    postLow:      'Nærmest stolpen til venstre',
    postMid:      'Nærmest stolpen i midten',
    postHigh:     'Nærmest stolpen til højre',

    less10:       'Et stort skridt til venstre',
    less1:        'Et lille skridt til venstre',
    more1:        'Et lille skridt til højre',
    more10:       'Et stort skridt til højre',
    place:        'Læg det her',
    rerule:       'Åbn tieren, det bor i',
    back:         'Tilbage til det hele',
    next:         'Et tal mere',

    saidArrive:   '{n}. Hvilken stolpe er det nærmest?',
    saidPost:     'Nærmest {p}. Læg det nu.',
    saidMoved:    '{n}',
    saidTruth:    'Det bor på {t}. I lagde det på {n}.',
    saidRerule:   'Nu går det fra {a} til {b}. De tre stolper er tilbage.',
    saidBack:     'Tilbage til det hele, {a} til {b}.',
    saidEnd:      'Længere end {n} går det ikke.',
    saidNoRerule: 'Det her er allerede én enkelt tier. Den kan ikke åbnes mere.',

    gateTitle:    'Papirskabelonerne',
    gateBody:     'Alt her er gratis — begge dybder, alle tre stolper, hver placering og den nye inddeling. Lærerabonnementet giver desuden papirskabelonerne, som I selv deler ind og hænger op i klassen, så en kan blive hængende hele ugen.',
    gateCta:      'Se Lærerabonnementet',
    gateClose:    'Ikke nu',

    printBtn:     'Print papirskabelonerne',
    sheetTitle:   'Papirskabeloner til at dele ind',
    sheetNote:    'Hver tom skabelon har en stopklods i begge ender og tre stolper. Skriv de to tal i enderne, hæng den op i klassen, og lad klassen føje tal til hele ugen. Del den næste ind som én enkelt tier for at fortsætte inde i den.'
  },

  /* ================================================================ no */
  no: {
    title:        'De tre pålene',
    instruction:  'Det kommer et tall. Si hvilken påle det er nærmest, og legg det først da — så ser dere hvor det egentlig bor.',

    ariaStrip:    'En stoppkloss i hver ende og tre påler: en i hver ende og en i midten.',
    ariaPlaque:   'lappen, ved {n}',
    ariaTruth:    'hvor tallet egentlig bor',
    ariaTrace:    'hvilke påler klassen har valgt hittil',

    setSpan:      'Hvor langt det rekker',
    span100:      '0 til 100',
    span20:       '0 til 20',

    postLow:      'Nærmest pålen til venstre',
    postMid:      'Nærmest pålen i midten',
    postHigh:     'Nærmest pålen til høyre',

    less10:       'Et stort skritt til venstre',
    less1:        'Et lite skritt til venstre',
    more1:        'Et lite skritt til høyre',
    more10:       'Et stort skritt til høyre',
    place:        'Legg det her',
    rerule:       'Åpne tieren det bor i',
    back:         'Tilbake til det hele',
    next:         'Et tall til',

    saidArrive:   '{n}. Hvilken påle er det nærmest?',
    saidPost:     'Nærmest {p}. Legg det nå.',
    saidMoved:    '{n}',
    saidTruth:    'Det bor på {t}. Dere la det på {n}.',
    saidRerule:   'Nå går det fra {a} til {b}. De tre pålene er tilbake.',
    saidBack:     'Tilbake til det hele, {a} til {b}.',
    saidEnd:      'Lenger enn {n} går det ikke.',
    saidNoRerule: 'Dette er allerede én enkelt tier. Den kan ikke åpnes mer.',

    gateTitle:    'Papirmalene',
    gateBody:     'Alt her er gratis — begge dybdene, alle tre pålene, hver plassering og den nye inndelingen. Lærerabonnementet gir i tillegg papirmalene som dere deler inn selv og henger opp i klasserommet, slik at en kan bli hengende hele uka.',
    gateCta:      'Se Lærerabonnementet',
    gateClose:    'Ikke nå',

    printBtn:     'Skriv ut papirmalene',
    sheetTitle:   'Papirmaler til å dele inn',
    sheetNote:    'Hver tomme mal har en stoppkloss i begge ender og tre påler. Skriv inn de to tallene i endene, heng den opp i klasserommet, og la klassen legge til tall hele uka. Del inn den neste som én enkelt tier for å fortsette inne i den.'
  },

  /* ================================================================ fi */
  fi: {
    title:        'Kolme tolppaa',
    instruction:  'Luku ilmestyy. Sanokaa, minkä tolpan lähellä se on, ja asettakaa se vasta sitten — sitten näette, missä se oikeasti asuu.',

    ariaStrip:    'Molemmissa päissä muuri ja kolme tolppaa: yksi kummassakin päässä ja yksi keskellä.',
    ariaPlaque:   'kilpi, kohdassa {n}',
    ariaTruth:    'missä luku oikeasti asuu',
    ariaTrace:    'mitkä tolpat luokka on tähän mennessä valinnut',

    setSpan:      'Kuinka pitkälle ulottuu',
    span100:      '0–100',
    span20:       '0–20',

    postLow:      'Lähinnä vasemmanpuoleista tolppaa',
    postMid:      'Lähinnä keskimmäistä tolppaa',
    postHigh:     'Lähinnä oikeanpuoleista tolppaa',

    less10:       'Iso askel vasemmalle',
    less1:        'Pieni askel vasemmalle',
    more1:        'Pieni askel oikealle',
    more10:       'Iso askel oikealle',
    place:        'Aseta tähän',
    rerule:       'Avaa kymmen, jossa se asuu',
    back:         'Takaisin kokonaisuuteen',
    next:         'Uusi luku',

    saidArrive:   '{n}. Minkä tolpan lähellä se on?',
    saidPost:     'Lähin tolppa: {p}. Asettakaa luku nyt.',
    saidMoved:    '{n}',
    saidTruth:    'Se asuu kohdassa {t}. Te asetitte sen kohtaan {n}.',
    saidRerule:   'Nyt tässä ovat luvut {a}–{b}. Kolme tolppaa on taas paikoillaan.',
    saidBack:     'Takaisin kokonaisuuteen, luvut {a}–{b}.',
    saidEnd:      'Pidemmälle kuin {n} ei pääse.',
    saidNoRerule: 'Tämä on jo yksi ainoa kymmen. Sitä ei voi avata enempää.',

    gateTitle:    'Paperipohjat',
    gateBody:     'Täällä kaikki on maksutonta — molemmat tasot, kaikki kolme tolppaa, jokainen asettaminen ja uudelleenjako. Opettajatilaus tuo lisäksi paperipohjat, jotka jaatte itse ja ripustatte luokkaan, niin yksi saa olla esillä koko viikon.',
    gateCta:      'Tutustu Opettajatilaukseen',
    gateClose:    'Ei nyt',

    printBtn:     'Tulosta paperipohjat',
    sheetTitle:   'Paperipohjat jaettaviksi',
    sheetNote:    'Jokaisessa tyhjässä pohjassa on muuri molemmissa päissä ja kolme tolppaa. Kirjoittakaa päiden luvut, ripustakaa pohja luokkaan ja antakaa luokan lisätä siihen lukuja koko viikon. Jakakaa seuraava yhdeksi ainoaksi kymmeneksi, niin voitte jatkaa sen sisällä.'
  }
};
