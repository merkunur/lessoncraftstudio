/* =====================================================================
   _number-line-strings.js — the 11-locale SoT for TOOL #1
   ---------------------------------------------------------------------
   ⚠ THIS FILE IS THE SOURCE OF TRUTH. Never hand-edit a locale inside
   `mini tools/number-line.js`; edit here and run
   `node scripts/apply-number-line-locales.js`.

   Produced by four native panels (§A.13.48), REBUILT not translated.
   Every panel was handed the English as a SOURCE TO AUDIT, and between
   them they found eleven defects in it — three of which were bugs in the
   MODEL, not the copy. All are fixed; the notes below record the rulings
   that are not obvious from the strings.

   ⚠⚠ THE NAME IS NOT NEGOTIABLE. Every other v4 tool's panels renamed
   their tool; this one may not. `number-line` and its eleven native
   slugs are indexed URLs with live search equity, so `title` is the
   established head term in each language and nothing else.

   ⭐ RULINGS THE PANELS MADE THAT YOU CANNOT SEE FROM THE STRINGS:

   · da/no — `hoppen` MUST NEVER BE WRITTEN. `en hoppe` is A MARE, and
     its definite is `hoppen`; in bokmål the plural collides too
     (`hoppene` = "the hops" AND "the mares"). Both languages therefore
     use the impersonal `Det gik lige op` / `Det gikk akkurat opp` and a
     singular `hvert hop` / `hvert hopp`, so neither form ever ships.
     This is the `banan`-class trap of this build and no English-side
     check could have found it.
   · fi — `hyppy` IS UNAVAILABLE. `open-number-line` ships the Finnish
     title `Piirrä hypyt` ("draw the hops"), so the hop noun is a
     sibling's NAME. Finnish uses `loikka`, which greps to zero hits
     across the repo and is what a hare actually does (`jänis loikkii`).
   · fi — `kani`, not `pupu`: `measurement-bench` already ships `kani`,
     and `Puput` is a rabbit TEAM NAME in `center-board`/`name-sticks`.
     Match the shipped lexicon, not the English.
   · fi — `jakoviiva` was drafted for the tick marks and REJECTED: in
     Finnish maths it is the FRACTION BAR. `asteikkoviiva` was rejected
     too (`asteikko` is a sibling's part). `tasavälein viivoja` needs
     neither and is additionally true.
   · sv — `biten` (a piece) is also "bitten"; replaced with
     `hur mycket som blev över`.
   · fr/it — the sibling owns the compound: `La ligne des sauts` /
     `La linea dei salti`. Resolved by keeping the plain indexed head
     term for the LINE and giving the unit of motion the animal-specific
     noun: fr `le bond` / `bondir`, it `il balzo` / `balzare`. Both grep
     clean as identity nouns.
   · de — `Sprungweite` (the hop's DISTANCE), because `Zieh den Sprung`
     is nonsense in German: you cannot drag a consequence. It stays
     inside the named part and names the quantity.
   · de — the census list was incomplete; the panel added `Leiste`
     (unroll-tape) and `Markierung` (Rechenstrich). Neither is used.
   · GENDER — ⭐ SETTLED 2026-08-03, OPERATOR-RULED: THE SPRITE IS
     UNMARKED. So the rabbit is grammatically whatever each language
     forces, and none of these may be "harmonised" by a later pass:
     fr `le lapin`, it `il coniglio` and de `der Hase` (masculine — no
     natural feminine exists for a story rabbit in either; `la coniglia`
     / `die Häsin` read as biology), nl `het konijn` (neuter, which is
     why the Dutch is written pronoun-light), es `la coneja`, pt
     `a coelha`, sv/da/no feminine, fi genderless, en "she".
     The ruling costs zero string changes, which is exactly why it was
     the recommendation. The art constraint it implies — no bow, lashes,
     hair, blush, skirt or colour-coding; an eye and a mouth and nothing
     else — is written into docs/character-art-spec.md, and NO CODE GATE
     CAN CHECK IT on a delivered PNG. Human review at delivery is the
     control.
   · gateCta — NOT authored by the panels. Taken verbatim from the
     shipped v4 tools, because consistency across 47 tools outranks any
     local preference and the panels cannot see the product lexicon.
   · hintGoing — de and the Nordic panel both argued for keeping the
     interrogative ("Wo wird der nächste landen?") as the pedagogical
     heart. OVERRULED, consistently, in all eleven: refuse 4 forbids a
     question with a single right answer, and the statement form still
     manufactures the conversation while leaving the asking to the
     teacher. Recorded because two panels disagreed.
   ===================================================================== */

'use strict';

/* the key order the tool declares them in; apply- asserts it */
const ORDER = [
  'title', 'instruction', 'sceneLabel',
  'hintSetHop', 'hintGoing', 'hintExact', 'hintWall', 'hintNoRoom',
  'hopBtn', 'allBtn', 'numsBtn', 'nextBtn', 'printBtn',
  'startAria', 'hopAria', 'rangeAria',
  'gateTitle', 'gateBody', 'gateCta'
];

const LOCALES = ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'no', 'fi'];

const STRINGS = {
  title: {
    en: 'Number Line',
    de: 'Zahlenstrahl',
    fr: 'Ligne numérique',
    it: 'Linea dei numeri',
    es: 'Recta numérica',
    pt: 'Reta numérica',
    nl: 'Getallenlijn',
    sv: 'Tallinjen',
    da: 'Tallinjen',
    no: 'Tallinjen',
    fi: 'Lukusuora'
  },

  instruction: {
    en: 'Set where the rabbit starts, then set how long one hop is. Every hop after that is exactly that length.',
    de: 'Stellen Sie ein, wo der Hase steht, und ziehen Sie dann die Sprungweite auf. Ab da ist jeder Sprung genau gleich lang.',
    fr: 'Placez le lapin à son point de départ, puis réglez la longueur d’un bond. Tous les bonds auront ensuite exactement cette longueur.',
    it: 'Scegli da dove parte il coniglio, poi regola la lunghezza di un balzo. Da quel momento tutti i balzi hanno esattamente quella lunghezza.',
    es: 'Elige dónde empieza la coneja y decide cuánto mide un salto. A partir de ahí, todos los saltos miden exactamente lo mismo.',
    pt: 'Escolha onde a coelha começa e decida o tamanho de um salto. Daí em diante, todos os saltos têm exatamente o mesmo tamanho.',
    nl: 'Kies waar het konijn begint en bepaal hoe groot één sprong is. Daarna is elke sprong precies even groot.',
    sv: 'Bestäm var kaninen börjar. Dra sedan i hoppet för att bestämma hur långt ett hopp är – sedan blir varje hopp precis lika långt.',
    da: 'Bestem, hvor kaninen starter. Træk så i hoppet for at bestemme, hvor langt ét hop er – derefter er hvert hop præcis lige langt.',
    no: 'Bestem hvor kaninen starter. Dra så i hoppet for å bestemme hvor langt ett hopp er – etterpå er hvert hopp nøyaktig like langt.',
    fi: 'Valitse, mistä kani aloittaa. Vedä sitten loikkaa ja päätä, kuinka pitkä yksi loikka on – sen jälkeen kaikki loikat ovat yhtä pitkiä.'
  },

  sceneLabel: {
    en: 'A number line with ticks and numerals. A rabbit stands on it, and every hop she takes is drawn as an arc above the line, all of them the same length. Below the line are three controls: where the rabbit starts, how long one hop is, and how far the line goes.',
    de: 'Ein Zahlenstrahl mit Teilstrichen und Zahlen. Darauf steht ein Hase, und jeder Sprung, den er macht, wird als Bogen über dem Strahl gezeichnet — alle gleich breit. Unter dem Strahl liegen drei Regler: wo der Hase steht, wie weit ein Sprung geht, und wie weit der Strahl reicht.',
    fr: 'Une ligne numérique avec ses graduations et ses nombres. Un lapin est posé dessus, et chaque bond qu’il fait est tracé comme un arc au-dessus de la ligne, tous de la même longueur. Sous la ligne, trois réglages : le point de départ du lapin, la longueur d’un bond, et jusqu’où va la ligne.',
    it: 'Una linea dei numeri con le tacche e i numeri. Sopra c’è un coniglio, e ogni balzo che fa viene disegnato come un arco sopra la linea, tutti della stessa lunghezza. Sotto la linea ci sono tre regolazioni: da dove parte il coniglio, quanto è lungo un balzo, e fin dove arriva la linea.',
    es: 'Una recta numérica con marcas y números. Sobre ella hay una coneja, y cada salto que da se dibuja como un arco encima de la recta, todos del mismo ancho. Debajo de la recta hay tres controles: dónde empieza la coneja, cuánto mide un salto y hasta dónde llega la recta.',
    pt: 'Uma reta numérica com marcas e números. Sobre ela está uma coelha, e cada salto que ela dá é desenhado como um arco acima da reta, todos com a mesma largura. Abaixo da reta há três controles: onde a coelha começa, o tamanho de um salto e até onde vai a reta.',
    nl: 'Een getallenlijn met streepjes en getallen. Daarop staat een konijn, en elke sprong die het maakt wordt als een boog boven de lijn getekend, allemaal even breed. Onder de lijn staan drie regelaars: waar het konijn begint, hoe groot één sprong is, en hoe ver de lijn loopt.',
    sv: 'En tallinje med streck och tal. En kanin står på linjen, och varje hopp hon gör ritas som en båge ovanför linjen. Alla bågar är lika breda. Under linjen finns tre reglage: var kaninen börjar, hur långt ett hopp är, och hur långt linjen går.',
    da: 'En tallinje med streger og tal. En kanin står på linjen, og hvert hop, hun tager, tegnes som en bue over linjen. Alle buer er lige brede. Under linjen er der tre indstillinger: hvor kaninen starter, hvor langt ét hop er, og hvor langt linjen går.',
    no: 'En tallinje med streker og tall. En kanin står på linjen, og hvert hopp hun tar, tegnes som en bue over linjen. Alle buene er like brede. Under linjen er det tre innstillinger: hvor kaninen starter, hvor langt ett hopp er, og hvor langt linjen går.',
    fi: 'Lukusuora, jossa on tasavälein viivoja ja lukuja. Kani seisoo suoralla, ja jokainen sen ottama loikka piirtyy kaarena suoran yläpuolelle. Kaikki kaaret ovat yhtä leveitä. Suoran alla on kolme säädintä: mistä kani aloittaa, kuinka pitkä yksi loikka on, ja kuinka pitkälle suora ulottuu.'
  },

  hintSetHop: {
    en: 'Set how long one hop is, then press Hop and watch where the rabbit lands.',
    de: 'Ziehen Sie die Sprungweite auf — so weit geht jeder Sprung. Dann auf „Springen“ tippen und schauen, wo der Hase landet.',
    fr: 'Réglez la longueur d’un bond, puis appuyez sur Bondir pour voir où le lapin arrive.',
    it: 'Regola la lunghezza di un balzo, poi premi Balza e guarda dove arriva il coniglio.',
    es: 'Fija cuánto mide un salto. Luego toca Saltar y mira dónde cae.',
    pt: 'Defina o tamanho de um salto. Depois toque em Saltar e veja onde ela cai.',
    nl: 'Bepaal hoe groot één sprong is. Druk daarna op Spring en kijk waar het konijn landt.',
    sv: 'Dra i hoppet för att bestämma hur långt varje hopp är. Tryck sedan på Hoppa och se var hon landar.',
    da: 'Træk i hoppet for at bestemme, hvor langt hvert hop er. Tryk så på Hop, og se hvor hun lander.',
    no: 'Dra i hoppet for å bestemme hvor langt hvert hopp er. Trykk så på Hopp og se hvor hun lander.',
    fi: 'Vedä loikkaa ja päätä, kuinka pitkä jokainen loikka on. Paina sitten Loikkaa ja katso, mihin kani laskeutuu.'
  },

  /* ⚠ STATEMENT, NOT QUESTION — see the ruling in the header. */
  hintGoing: {
    en: 'Every hop is the same length, so you can say where the next one will land before it goes.',
    de: 'Jeder Sprung ist gleich lang — man kann also vorher sagen, wo der nächste landet.',
    fr: 'Tous les bonds ont la même longueur : on peut donc dire à l’avance où le prochain va se poser.',
    it: 'Tutti i balzi hanno la stessa lunghezza: si può dire in anticipo dove arriverà il prossimo.',
    es: 'Todos los saltos miden lo mismo, así que se puede decir de antemano dónde caerá el siguiente.',
    pt: 'Todos os saltos têm o mesmo tamanho, então dá para dizer antes onde o próximo vai cair.',
    nl: 'Elke sprong is even groot, dus je kunt van tevoren zeggen waar de volgende landt.',
    sv: 'Varje hopp är precis lika långt — man kan alltså säga i förväg var nästa landar.',
    da: 'Hvert hop er lige langt — så man kan sige på forhånd, hvor det næste lander.',
    no: 'Hvert hopp er like langt — så man kan si på forhånd hvor det neste lander.',
    fi: 'Jokainen loikka on yhtä pitkä, joten voi sanoa etukäteen, mihin seuraava osuu.'
  },

  /* ⚠ DIRECTION-NEUTRAL, AND NOT "fits the line" — see the tool. */
  hintExact: {
    en: 'The hops came out exactly even. Nothing is left over.',
    de: 'Diese Sprungweite geht genau auf — es bleibt kein Rest übrig.',
    fr: 'Les bonds tombent juste : il ne reste rien.',
    it: 'I balzi tornano esatti: non avanza niente.',
    es: 'Los saltos salen justos. No queda nada.',
    pt: 'Os saltos deram certinho. Não sobrou nada.',
    nl: 'De sprongen komen precies uit. Er blijft niets over.',
    sv: 'Det gick jämnt ut — ingenting blev över.',
    da: 'Det gik lige op — der blev ikke noget tilbage.',
    no: 'Det gikk akkurat opp — ingenting ble til overs.',
    fi: 'Loikat menivät tasan — mitään ei jäänyt yli.'
  },

  /* ⚠ THE SPACE IS IN FRONT OF HER, NOT BEHIND. */
  hintWall: {
    en: 'The next hop would go off the line, so the rabbit stops. Look at the space left in front of her.',
    de: 'Der nächste Sprung würde über den Rand hinausgehen, darum bleibt der Hase stehen. Schauen Sie sich die Lücke an, die vor ihm übrig bleibt.',
    fr: 'Le bond suivant sortirait de la ligne, alors le lapin s’arrête. Regardez l’espace qui reste devant lui.',
    it: 'Il balzo successivo uscirebbe dalla linea, così il coniglio si ferma. Guardate lo spazio rimasto davanti a lui.',
    es: 'El siguiente salto se saldría de la recta, así que se detiene. Mira el hueco que queda por delante.',
    pt: 'O próximo salto passaria da reta, então ela para. Veja o espaço que sobrou à frente dela.',
    nl: 'De volgende sprong zou voorbij de lijn gaan, dus het konijn stopt. Kijk naar het stukje dat ervoor overblijft.',
    sv: 'Nästa hopp skulle hamna utanför linjen, så hon stannar. Titta på hur mycket som blev över framför henne.',
    da: 'Det næste hop ville lande uden for linjen, så hun stopper. Se, hvor meget der blev tilbage foran hende.',
    no: 'Det neste hoppet ville havnet utenfor linjen, så hun stopper. Se hvor mye som ble til overs foran henne.',
    fi: 'Seuraava loikka menisi lukusuoran ulkopuolelle, joten kani pysähtyy. Katso, kuinka paljon jäi yli sen eteen.'
  },

  /* ⚠ THE FIFTH BRANCH. Two panels found this state independently. */
  hintNoRoom: {
    en: 'This hop is too long for the line. Make it shorter, or start further back.',
    de: 'Diese Sprungweite ist zu groß für den Strahl. Machen Sie sie kleiner oder stellen Sie den Hasen weiter zurück.',
    fr: 'Ce bond est trop long pour la ligne. Raccourcissez-le, ou reculez le point de départ.',
    it: 'Questo balzo è troppo lungo per la linea. Accorcialo, oppure fai partire il coniglio più indietro.',
    es: 'Este salto es demasiado largo para la recta. Hazlo más corto o empieza más atrás.',
    pt: 'Este salto é comprido demais para a reta. Deixe-o menor ou comece mais atrás.',
    nl: 'Deze sprong is te groot voor de lijn. Maak hem kleiner of begin verder terug.',
    sv: 'Det här hoppet är för långt för linjen. Gör det kortare, eller börja längre bak.',
    da: 'Dette hop er for langt til linjen. Gør det kortere, eller start længere tilbage.',
    no: 'Dette hoppet er for langt for linjen. Gjør det kortere, eller start lenger bak.',
    fi: 'Tämä loikka on liian pitkä tälle suoralle. Tee siitä lyhyempi tai aloita kauempaa takaa.'
  },

  hopBtn: {
    en: 'Hop', de: 'Springen', fr: 'Bondir', it: 'Balza', es: 'Saltar', pt: 'Saltar',
    nl: 'Spring', sv: 'Hoppa', da: 'Hop', no: 'Hopp', fi: 'Loikkaa'
  },
  allBtn: {
    en: 'All the way', de: 'Ganz durch', fr: 'Jusqu’au bout', it: 'Fino in fondo',
    es: 'Hasta el final', pt: 'Até o fim', nl: 'Tot het eind', sv: 'Hela vägen',
    da: 'Hele vejen', no: 'Hele veien', fi: 'Loppuun'
  },
  numsBtn: {
    en: 'Numerals', de: 'Zahlen', fr: 'Nombres', it: 'Numeri', es: 'Números',
    pt: 'Números', nl: 'Getallen', sv: 'Tal', da: 'Tal', no: 'Tall', fi: 'Luvut'
  },
  nextBtn: {
    en: 'Another line', de: 'Neuer Strahl', fr: 'Autre ligne', it: 'Altra linea',
    es: 'Otra recta', pt: 'Outra reta', nl: 'Nieuwe lijn', sv: 'Ny linje',
    da: 'Ny linje', no: 'Ny linje', fi: 'Uusi suora'
  },
  printBtn: {
    en: 'Print', de: 'Drucken', fr: 'Imprimer', it: 'Stampa', es: 'Imprimir',
    pt: 'Imprimir', nl: 'Print', sv: 'Skriv ut', da: 'Print', no: 'Skriv ut', fi: 'Tulosta'
  },

  /* ⚠ SELF-CONTAINED AND CAPITALISED — `_grip` sets these as the whole
     accessible name, with no carrier phrase. And each carries the
     trail-wipe warning. */
  startAria: {
    en: 'Where the rabbit starts. Drag it along its rail, or use the arrow keys. Moving it clears the hops already drawn.',
    de: 'Wo der Hase steht. Ziehen Sie ihn an seiner Leiste entlang oder nehmen Sie die Pfeiltasten. Beim Verschieben werden die bisherigen Sprünge gelöscht.',
    fr: 'Point de départ du lapin. Faites glisser le curseur le long de son rail, ou utilisez les flèches du clavier. Le déplacer efface les bonds déjà tracés.',
    it: 'Punto di partenza del coniglio. Trascina il cursore lungo la sua guida, oppure usa i tasti freccia. Spostandolo, i balzi già fatti si cancellano.',
    es: 'Dónde empieza la coneja. Arrastra el mando por su carril o usa las flechas del teclado. Al moverlo se borran los saltos ya dibujados.',
    pt: 'Onde a coelha começa. Arraste o controle pelo trilho dele ou use as setas do teclado. Ao movê-lo, os saltos já desenhados são apagados.',
    nl: 'Waar het konijn begint. Sleep de regelaar over zijn rail of gebruik de pijltjestoetsen. Verschuiven wist de sprongen die er al staan.',
    sv: 'Var kaninen börjar. Dra reglaget längs sin list eller använd piltangenterna. När du flyttar det försvinner hoppen som redan är ritade.',
    da: 'Hvor kaninen starter. Træk grebet langs sin skinne, eller brug piletasterne. Når du flytter det, forsvinder de hop, der allerede er tegnet.',
    no: 'Hvor kaninen starter. Dra grepet langs sin skinne, eller bruk piltastene. Når du flytter det, forsvinner buene som allerede er tegnet.',
    fi: 'Mistä kani aloittaa. Vedä säädintä sen kiskoa pitkin tai käytä nuolinäppäimiä. Siirtäminen pyyhkii jo piirretyt loikat.'
  },
  hopAria: {
    en: 'How long one hop is. Drag it away from the start to make the hop longer, or past the start to hop backwards, or use the arrow keys. Changing it clears the hops already drawn.',
    de: 'Wie weit ein Sprung geht. Ziehen Sie vom Startpunkt weg, damit die Sprünge länger werden, oder auf die andere Seite, damit der Hase rückwärts springt. Die Pfeiltasten gehen auch. Beim Ändern werden die bisherigen Sprünge gelöscht.',
    fr: 'Longueur d’un bond. Faites glisser le curseur d’un côté pour allonger le bond, de l’autre côté pour bondir en arrière, ou utilisez les flèches du clavier. Changer la longueur efface les bonds déjà tracés.',
    it: 'Lunghezza di un balzo. Trascina il cursore da una parte per allungare il balzo, dall’altra per balzare all’indietro, oppure usa i tasti freccia. Cambiando la lunghezza, i balzi già fatti si cancellano.',
    es: 'Cuánto mide un salto. Aléjalo del inicio para alargar el salto, pásalo al otro lado para saltar hacia atrás, o usa las flechas del teclado. Al cambiarlo se borran los saltos ya dibujados.',
    pt: 'O tamanho de um salto. Afaste do início para aumentar o salto, passe para o outro lado para saltar para trás, ou use as setas do teclado. Ao mudá-lo, os saltos já desenhados são apagados.',
    nl: 'Hoe groot één sprong is. Sleep verder van het beginpunt om de sprong groter te maken, naar de andere kant om terug te springen, of gebruik de pijltjestoetsen. Veranderen wist de sprongen die er al staan.',
    sv: 'Hur långt ett hopp är. Dra bort från startpunkten för att göra hoppet längre, eller till andra sidan för att hoppa bakåt. Piltangenterna fungerar också. När du ändrar det försvinner hoppen som redan är ritade.',
    da: 'Hvor langt ét hop er. Træk væk fra starten for at gøre hoppet længere, eller over på den anden side for at hoppe baglæns. Piletasterne virker også. Når du ændrer det, forsvinder de hop, der allerede er tegnet.',
    no: 'Hvor langt ett hopp er. Dra bort fra starten for å gjøre hoppet lengre, eller over på den andre siden for å hoppe bakover. Piltastene virker også. Når du endrer det, forsvinner buene som allerede er tegnet.',
    fi: 'Kuinka pitkä yksi loikka on. Vedä poispäin aloituskohdasta, niin loikasta tulee pidempi, tai toiselle puolelle, niin kani loikkii taaksepäin. Myös nuolinäppäimet toimivat. Muuttaminen pyyhkii jo piirretyt loikat.'
  },
  rangeAria: {
    en: 'How far the line goes',
    de: 'Wie weit der Zahlenstrahl reicht',
    fr: 'Jusqu’où va la ligne',
    it: 'Fin dove arriva la linea',
    es: 'Hasta dónde llega la recta',
    pt: 'Até onde vai a reta',
    nl: 'Hoe ver de lijn loopt',
    sv: 'Hur långt linjen går',
    da: 'Hvor langt linjen går',
    no: 'Hvor langt linjen går',
    fi: 'Kuinka pitkälle lukusuora ulottuu'
  },

  gateTitle: {
    en: 'More lines', de: 'Mehr Zahlenstrahlen', fr: 'Encore des lignes',
    it: 'Altre linee', es: 'Más rectas', pt: 'Mais retas', nl: 'Meer lijnen',
    sv: 'Fler linjer', da: 'Flere linjer', no: 'Flere linjer', fi: 'Lisää suoria'
  },

  /* ⚠ SIX, NOT ELEVEN, IN EVERY LOCALE. All four panels caught the
     overclaim independently. */
  gateBody: {
    en: 'Six more lines, ordered so each one surprises after the one before — a start somewhere other than zero, lines that run to 1000, and hops that go backwards. Plus the sheet to print for working on paper.',
    de: 'Sechs weitere Zahlenstrahlen, so geordnet, dass jeder nach dem vorigen überrascht: ein Start abseits der Null, Strahlen bis 1000 und Sprünge rückwärts. Dazu die Druckvorlage für die Arbeit auf Papier.',
    fr: 'Six autres lignes, classées pour que chacune surprenne après la précédente : un départ ailleurs qu’à zéro, des lignes qui vont jusqu’à 1000, et des bonds en arrière. Avec la fiche à imprimer pour continuer sur papier.',
    it: 'Altre sei linee, ordinate perché ognuna sorprenda dopo la precedente: una partenza diversa da zero, linee che arrivano fino a 1000 e balzi all’indietro. C’è anche il foglio da stampare per lavorare su carta.',
    es: 'Seis rectas más, ordenadas para que cada una sorprenda después de la anterior: un inicio distinto de cero, rectas que llegan hasta 1000 y saltos hacia atrás. Además, la hoja para imprimir y trabajar en papel.',
    pt: 'Mais seis retas, na ordem em que cada uma surpreende depois da anterior: um início diferente de zero, retas que vão até 1000 e saltos para trás. Além da folha para imprimir e trabalhar no papel.',
    nl: 'Zes lijnen erbij, zo geordend dat elke lijn verrast na de vorige: een start ergens anders dan nul, lijnen tot 1000 en sprongen achteruit. Plus het blad om af te drukken en op papier verder te werken.',
    sv: 'Sex linjer till, ordnade så att varje ny linje överraskar efter den förra: en start någon annanstans än noll, linjer som går till 1000 och hopp bakåt. Dessutom arbetsbladet att skriva ut.',
    da: 'Seks linjer mere, sat i en rækkefølge hvor hver ny linje overrasker efter den forrige: en start et andet sted end nul, linjer der går til 1000 og hop baglæns. Plus arket til at printe.',
    no: 'Seks linjer til, satt opp slik at hver nye linje overrasker etter den forrige: en start et annet sted enn null, linjer som går til 1000 og hopp bakover. Pluss arket du kan skrive ut.',
    fi: 'Kuusi suoraa lisää, järjestyksessä jossa jokainen yllättää edellisen jälkeen: aloitus muualta kuin nollasta, suoria tuhanteen asti ja loikkia taaksepäin. Lisäksi tulostettava tehtäväpaperi.'
  },

  /* ⚠ VERBATIM FROM THE SHIPPED v4 TOOLS. Do not let a later pass
     "improve" these — consistency across 47 tools outranks preference. */
  gateCta: {
    en: 'See the Teacher plan',
    de: 'Lehrer-Paket ansehen',
    fr: 'Voir l’offre Enseignant',
    it: 'Il piano Insegnante',
    es: 'Ver el plan Docente',
    pt: 'Ver o plano Professor',
    nl: 'Bekijk het Leerkracht-pakket',
    sv: 'Se Lärarpaketet',
    da: 'Se Lærerabonnementet',
    no: 'Se Lærerabonnementet',
    fi: 'Tutustu Opettaja-tilaukseen'
  }
};

module.exports = { ORDER, LOCALES, STRINGS };
