/* =====================================================================
   TOOL #58 — THE QUEUE   (the-queue.js)   ·   COUNTING & CARDINALITY
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). REBUILT 2026-08-16 from the austere ordinal tool the
   operator rejected, on the ruling of four expert panels (pedagogy /
   interaction / art / fence).

   THE WELL · THE SHELF · THE FRIENDS · THE HAND.

   THE ROUTINE — "COUNT BOTH WAYS":
     "Pick an end and slide the hand — how many?"   (the last number)
     "Now the OTHER end. Did anybody move?"         (same total)
     "This friend wore 2, now wears 3 — but it didn't move."
     "The middle one wears the same number both ways — why only that one?"

   ---------------------------------------------------------------------
   THE INVENTION (fence: unowned on all four surfaces)
   ---------------------------------------------------------------------
   A line of distinct, countable FRIENDS. A coral counting HAND sweeps
   from a CHOSEN end; each friend it passes wears its RUNNING-COUNT
   numeral (1,2,3,4…). The last number = HOW MANY. Count the SAME line
   from the OTHER end: each friend wears a DIFFERENT running numeral, but
   the total is IDENTICAL — cardinality is invariant, position is not
   (CCSS K.CC.B.4b, the order-of-count clause, verbatim). On an odd line
   the MIDDLE friend wears the same numeral from both ends.

   ---------------------------------------------------------------------
   THE THREE TRAP-DEFEATERS (binding — the running numeral is curative
   only with ALL THREE; drop one and it becomes the cardinal/ordinal
   confusion it treats)
   ---------------------------------------------------------------------
   1. TRANSIENCE. Tags are the trace of a sweep. A friend not yet swept
      wears NO numeral; picking an end / a new line wipes them. The badges
      shown === the slots below the hand (a pure function of k), so
      dragging back un-accretes.
   2. THE TOTAL IS A WHOLE-LINE PROPERTY. "How many" is a spanning bar +
      pill BENEATH the whole line, visually distinct from the per-member
      badges — NEVER a stamp on the last friend (the last-word-rule trap).
   3. THE REVERSAL IS MANDATORY AND IS THE CURE. A motionless friend
      visibly wearing a different number from the other end is the
      strongest refutation of "the number is the friend's name."

   ---------------------------------------------------------------------
   THE REFUSE-LIST, BINDING
   ---------------------------------------------------------------------
   No WORD for a position, ever (position is shown only by which friend
   wears which transient numeral). No PERMANENT numeral / letter / size-
   rank / facing / colour-rank on a friend. No tag at rest. The total is a
   whole-line span, never the last friend's badge. No state where the two
   ends give a different total. NO DEFAULT END / no "front" — the hand is
   parked off the shelf until an end is chosen (`endOf` returns null), and
   that absence is the thesis. Nothing marked right/wrong; no timer, score
   or streak. ⚠ CORAL IS BANNED AS A BARE MARK (2.33:1 on the working
   surface, under the 3:1 non-text floor) — every warm fill is bounded by
   an outline that itself measures ≥3:1, which is what finally lets the
   friends be colourful and the hand be genuine coral (the number-hotel
   is-here precedent). Compared quantities differ in KIND, never HUE. No
   efficacy claim in any landing; claim ORDER-OF-COUNT invariance, never
   conservation/rearrangement (that is `necklace`'s).

   It loads NO ART and NO AUDIO beyond the shell's own pop. Numerals carry
   the whole lesson — the tool is legible with the sound off.
   ===================================================================== */
(function () {
  'use strict';

  var GEO = {
    MIN: 3,            /* below three there is no middle to reverse about */
    CAP: 6,            /* ⚠ SIX distinguishable friends — the old 4 was a
                          MONOCHROME ceiling (silhouettes differ 1.71px at
                          34px); COLOUR is the strongest back-of-room
                          discriminator, so six are trivially tellable. */

    /* viewBox 0 0 400 184.  the shelf, the friends, the hand, the total. */
    VW: 400, VH: 184,
    RAIL_X0: 20, RAIL_X1: 380,
    SHELF_Y: 128, SHELF_H: 11,
    BASE_Y: 128,       /* the friends stand here */
    BODY_W: 40,        /* shared body width — equal for every friend */
    BODY_TOP: 52,      /* the dome peak — equal for every friend */
    SHOULDER_Y: 98,    /* where the straight side meets the dome */
    CROWN_Y: 50,       /* toppers sit here, INSIDE the box (no height ramp) */
    EYE_Y: 78, SMILE_Y: 92, BADGE_Y: 108,
    HAND_Y: 150,       /* the caret rides under the shelf */
    TOTAL_Y: 166,      /* the whole-line total, BENEATH everything */

    /* motion, ms. ⚠ Reduced motion COMPRESSES the JS-driven travel (via
       _dur) and DISABLES the decorative pops (a CSS media query). Every one
       of these reaches a call site. */
    T_STEP: 300,
    T_REFUSE: 200,
    RM_F: 0.28,
    RM_FLOOR: 90,

    SND_STEP: 560,
    SND_TOTAL: 720,
    SND_SAME: 690,
    SND_JOIN: 610,
    SND_LEAVE: 470,
    SND_REFUSE: 300,
    /* ⚠ T_, NOT SND_: this one is MILLISECONDS, every other SND_* is a Hz. */
    T_SND_DEBOUNCE: 150
  };

  /* Six friends: ONE shared body, distinguished by COLOUR + a symmetric
     TOPPER + a face. Every fill AND every outline measures ≥3:1 vs the
     well #F6EAD3; the palette is equal-value, non-spectral, and AVOIDS the
     semantic coral / green / structural teal so no friend can be misread
     as "the live one" or "the right one". Colour is bound to a POSITION by
     the per-session Fisher-Yates deal, so hue never encodes order. */
  var FRIENDS = [
    { fill: '#EFB13C', line: '#A9781A', top: 'tuft' },      /* marigold */
    { fill: '#E08993', line: '#A24E58', top: 'ears' },      /* clay-rose */
    { fill: '#A66397', line: '#6F3F64', top: 'star' },      /* plum */
    { fill: '#7E8BD0', line: '#4C589C', top: 'antennae' },  /* periwinkle */
    { fill: '#D69A55', line: '#94602A', top: 'leaf' },      /* butterscotch */
    { fill: '#B98BC4', line: '#7E568A', top: 'crown' }      /* dusty-lilac */
  ];

  var NS = 'http://www.w3.org/2000/svg';

  var TheQueue = {

    id: 'the-queue',

    strings: {
      title: { en: "The Counting Line", de: "Die Zählreihe", fr: "La rangée à compter", es: "La fila para contar", pt: "A fila de contar", it: "La fila da contare", nl: "De telrij", sv: "Räkneraden", da: "Tællerækken", no: "Telleraden", fi: "Laskurivi" },
      instruction: { en: "Stand some friends in a line. Pick an end and slide the hand to count them — the last number tells how many. Now count from the other end: each friend wears a different number, but how many stays the same.", de: "Stell ein paar Freunde in eine Reihe. Wähl ein Ende und schieb die Hand, um sie zu zählen — die letzte Zahl sagt, wie viele es sind. Zähl jetzt vom anderen Ende: jeder trägt eine andere Zahl, aber wie viele es sind, bleibt gleich.", fr: "Mets quelques amis en rangée. Choisis un bout et fais glisser la main pour les compter — le dernier nombre dit combien il y en a. Compte maintenant depuis l’autre bout : chacun porte un nombre différent, mais le combien ne change pas.", es: "Pon a unos amigos en fila. Elige un lado y desliza la mano para contarlos: el último número dice cuántos hay. Cuenta ahora desde el otro lado: cada uno lleva un número distinto, pero cuántos hay no cambia.", pt: "Coloque alguns amigos em fila. Escolha uma ponta e deslize a mão para contá-los — o último número diz quantos são. Agora conte da outra ponta: cada um recebe um número diferente, mas quantos são não muda.", it: "Metti alcuni amici in fila. Scegli una parte e fai scorrere la mano per contarli: l’ultimo numero dice quanti sono. Ora conta dall’altra parte: ognuno porta un numero diverso, ma quanti sono resta uguale.", nl: "Zet een paar vriendjes op een rij. Kies een kant en schuif de hand om ze te tellen — het laatste getal zegt hoeveel het er zijn. Tel nu vanaf de andere kant: ieder krijgt een ander getal, maar hoeveel het er zijn blijft gelijk.", sv: "Ställ några kompisar på rad. Välj en ände och dra handen för att räkna dem — sista talet säger hur många. Räkna nu från andra änden: var och en får ett annat tal, men hur många det är blir samma.", da: "Stil et par venner på en række. Vælg en ende, og træk hånden for at tælle dem — det sidste tal siger, hvor mange der er. Tæl nu fra den anden ende: hver får et andet tal, men hvor mange der er, bliver det samme.", no: "Sett noen venner på rekke. Velg en ende og dra hånden for å telle dem — det siste tallet sier hvor mange det er. Tell nå fra den andre enden: hver får et annet tall, men hvor mange det er, blir det samme.", fi: "Aseta muutama kaveri riviin. Valitse pää ja liu’uta kättä laskeaksesi heidät — viimeinen luku kertoo, montako heitä on. Laske nyt toisesta päästä: kukin saa eri luvun, mutta montako heitä on, pysyy samana." },

      /* controls */
      endLeft: { en: "Count from this end", de: "Von diesem Ende zählen", fr: "Compter de ce bout-ci", es: "Contar desde este lado", pt: "Contar desta ponta", it: "Contare da questa parte", nl: "Van deze kant tellen", sv: "Räkna från den här änden", da: "Tæl fra denne ende", no: "Tell fra denne enden", fi: "Laske tästä päästä" },
      endRight: { en: "Count from the other end", de: "Vom anderen Ende zählen", fr: "Compter de l’autre bout", es: "Contar desde el otro lado", pt: "Contar da outra ponta", it: "Contare dall’altra parte", nl: "Van de andere kant tellen", sv: "Räkna från andra änden", da: "Tæl fra den anden ende", no: "Tell fra den andre enden", fi: "Laske toisesta päästä" },
      newLine: { en: "A new line", de: "Eine neue Reihe", fr: "Une nouvelle rangée", es: "Una fila nueva", pt: "Uma fila nova", it: "Una nuova fila", nl: "Een nieuwe rij", sv: "En ny rad", da: "En ny række", no: "En ny rekke", fi: "Uusi rivi" },
      join: { en: "One more joins", de: "Einer kommt dazu", fr: "Un de plus arrive", es: "Llega uno más", pt: "Chega mais um", it: "Ne arriva uno in più", nl: "Er komt er één bij", sv: "En till kommer", da: "Én mere kommer", no: "Én til kommer", fi: "Yksi lisää tulee" },
      leave: { en: "One leaves", de: "Einer geht weg", fr: "Un s’en va", es: "Se va uno", pt: "Um vai embora", it: "Uno se ne va", nl: "Er gaat er één weg", sv: "En går härifrån", da: "Én går sin vej", no: "Én går sin vei", fi: "Yksi lähtee" },
      print: { en: "Print the record", de: "Das Blatt drucken", fr: "Imprimer la fiche", es: "Imprimir la hoja", pt: "Imprimir a folha", it: "Stampa la scheda", nl: "Het blad afdrukken", sv: "Skriv ut arbetsbladet", da: "Udskriv arket", no: "Skriv ut arket", fi: "Tulosta arkki" },

      /* aria — nothing on the shelf is a tap target; the rail is */
      ariaLine: { en: "A line of {n} friends.", de: "Eine Reihe mit {n} Freunden.", fr: "Une rangée de {n} amis.", es: "Una fila de {n} amigos.", pt: "Uma fila de {n} amigos.", it: "Una fila di {n} amici.", nl: "Een rij van {n} vriendjes.", sv: "En rad med {n} kompisar.", da: "En række med {n} venner.", no: "En rekke med {n} venner.", fi: "Rivi, jossa on {n} kaveria." },
      ariaNoEnd: { en: "No end has been chosen yet, so the hand is off the shelf.", de: "Es ist noch kein Ende gewählt, darum steht die Hand noch nicht an der Reihe.", fr: "Aucun bout n’est encore choisi : la main est restée à côté de la rangée.", es: "Todavía no se ha elegido ningún lado, así que la mano está fuera de la fila.", pt: "Nenhuma ponta foi escolhida ainda, por isso a mão está fora da fila.", it: "Non è ancora stata scelta la parte da cui contare, e la mano è rimasta fuori dalla fila.", nl: "Er is nog geen kant gekozen, dus de hand staat naast de rij.", sv: "Ingen ände är vald än, så handen står utanför raden.", da: "Der er ikke valgt nogen ende endnu, så hånden er ved siden af rækken.", no: "Ingen ende er valgt ennå, så hånden står utenfor rekka.", fi: "Kumpaakaan päätä ei ole vielä valittu, joten käsi on rivin ulkopuolella." },
      ariaCounted: { en: "Counted {k} so far, from the chosen end.", de: "Bis hierher {k} gezählt, vom gewählten Ende aus.", fr: "{k} comptés jusqu’ici, depuis le bout choisi.", es: "Contados {k} hasta ahora, desde el lado elegido.", pt: "Contados {k} até agora, a partir da ponta escolhida.", it: "Contati {k} finora, dalla parte scelta.", nl: "Tot nu toe {k} geteld, vanaf de gekozen kant.", sv: "Räknat {k} hittills, från den valda änden.", da: "Talt {k} indtil nu, fra den valgte ende.", no: "Talt {k} så langt, fra den valgte enden.", fi: "Laskettu {k} tähän mennessä valitusta päästä." },
      ariaTotal: { en: "All counted. The last number is {n} — that is how many.", de: "Alle gezählt. Die letzte Zahl ist {n} — so viele sind es.", fr: "Tous comptés. Le dernier nombre est {n} — c’est le combien.", es: "Contados todos. El último número es {n}: eso es cuántos hay.", pt: "Todos contados. O último número é {n} — é quantos são.", it: "Contati tutti. L’ultimo numero è {n}: ecco quanti sono.", nl: "Allemaal geteld. Het laatste getal is {n} — zoveel zijn het er.", sv: "Alla räknade. Sista talet är {n} — så många är det.", da: "Alle talt. Det sidste tal er {n} — så mange er der.", no: "Alle talt. Det siste tallet er {n} — så mange er det.", fi: "Kaikki laskettu. Viimeinen luku on {n} — niin monta heitä on." },
      ariaSelfSame: { en: "This one is counted {k} from either end.", de: "Bei diesem kommt von beiden Enden aus {k} heraus.", fr: "Celui-ci fait {k} qu’on parte d’un bout ou de l’autre.", es: "En este sale {k} se cuente desde donde se cuente.", pt: "Neste dá {k} contando de qualquer uma das pontas.", it: "Su questo viene {k} partendo da una parte o dall’altra.", nl: "Bij deze kom je van beide kanten op {k} uit.", sv: "Den här blir {k} från vilken ände man än räknar.", da: "Denne bliver {k} uanset hvilken ende man tæller fra.", no: "Denne blir {k} uansett hvilken ende man teller fra.", fi: "Tämä on {k} kummastakin päästä laskien." },

      /* said aloud / status — numerals are honest running counts, never
         a position-word */
      sayPickEnd: { en: "Pick an end to count from.", de: "Wähl ein Ende, von dem aus du zählst.", fr: "Choisis un bout d’où compter.", es: "Elige un lado desde donde contar.", pt: "Escolha uma ponta de onde contar.", it: "Scegli una parte da cui contare.", nl: "Kies een kant om vanaf te tellen.", sv: "Välj en ände att räkna från.", da: "Vælg en ende at tælle fra.", no: "Velg en ende å telle fra.", fi: "Valitse pää, josta lasket." },
      sayTotal: { en: "How many? {n}.", de: "Wie viele? {n}.", fr: "Combien ? {n}.", es: "¿Cuántos? {n}.", pt: "Quantos? {n}.", it: "Quanti? {n}.", nl: "Hoeveel? {n}.", sv: "Hur många? {n}.", da: "Hvor mange? {n}.", no: "Hvor mange? {n}.", fi: "Montako? {n}." },
      sayReversed: { en: "The same many — counted from either end.", de: "Genauso viele — egal von welchem Ende.", fr: "Le même combien — d’un bout ou de l’autre.", es: "La misma cantidad, se cuente desde donde se cuente.", pt: "A mesma quantidade — contando de qualquer ponta.", it: "Lo stesso quanti — da una parte o dall’altra.", nl: "Evenveel — van welke kant je ook telt.", sv: "Lika många — från vilken ände man än räknar.", da: "Lige så mange — uanset hvilken ende.", no: "Like mange — uansett hvilken ende.", fi: "Yhtä monta — kummasta päästä tahansa laskien." },
      sayLandedSame: { en: "The same number from either end.", de: "Dieselbe Zahl von beiden Enden.", fr: "Le même nombre des deux bouts.", es: "El mismo número desde los dos lados.", pt: "O mesmo número das duas pontas.", it: "Lo stesso numero da tutte e due le parti.", nl: "Hetzelfde getal van beide kanten.", sv: "Samma tal från båda ändarna.", da: "Det samme tal fra begge ender.", no: "Det samme tallet fra begge ender.", fi: "Sama luku molemmista päistä." },
      sayJoined: { en: "One more. Count again.", de: "Einer mehr. Zähl noch mal.", fr: "Un de plus. Recompte.", es: "Uno más. Cuenta otra vez.", pt: "Mais um. Conte de novo.", it: "Uno in più. Riconta.", nl: "Eén erbij. Tel opnieuw.", sv: "En till. Räkna om.", da: "Én mere. Tæl igen.", no: "Én til. Tell på nytt.", fi: "Yksi lisää. Laske uudelleen." },
      sayLeft: { en: "One fewer. Count again.", de: "Einer weniger. Zähl noch mal.", fr: "Un de moins. Recompte.", es: "Uno menos. Cuenta otra vez.", pt: "Menos um. Conte de novo.", it: "Uno in meno. Riconta.", nl: "Eén minder. Tel opnieuw.", sv: "En mindre. Räkna om.", da: "Én færre. Tæl igen.", no: "Én færre. Tell på nytt.", fi: "Yksi vähemmän. Laske uudelleen." },
      sayDealt: { en: "A new line. Pick an end to count from.", de: "Eine neue Reihe. Wähl ein Ende, von dem aus du zählst.", fr: "Une nouvelle rangée. Choisis un bout d’où compter.", es: "Una fila nueva. Elige un lado desde donde contar.", pt: "Uma fila nova. Escolha uma ponta de onde contar.", it: "Una nuova fila. Scegli una parte da cui contare.", nl: "Een nieuwe rij. Kies een kant om vanaf te tellen.", sv: "En ny rad. Välj en ände att räkna från.", da: "En ny række. Vælg en ende at tælle fra.", no: "En ny rekke. Velg en ende å telle fra.", fi: "Uusi rivi. Valitse pää, josta lasket." },
      sayEndOfLine: { en: "That is the whole line.", de: "Das ist die ganze Reihe.", fr: "C’est toute la rangée.", es: "Esa es la fila entera.", pt: "É a fila inteira.", it: "È tutta la fila.", nl: "Dat is de hele rij.", sv: "Det är hela raden.", da: "Det er hele rækken.", no: "Det er hele rekka.", fi: "Se on koko rivi." },

      /* settings */
      sizeLabel: { en: "How many friends", de: "Wie viele Freunde", fr: "Combien d’amis", es: "Cuántos amigos", pt: "Quantos amigos", it: "Quanti amici", nl: "Hoeveel vriendjes", sv: "Hur många kompisar", da: "Hvor mange venner", no: "Hvor mange venner", fi: "Montako kaveria" },
      sizeFour: { en: "four", de: "vier", fr: "quatre", es: "cuatro", pt: "quatro", it: "quattro", nl: "vier", sv: "fyra", da: "fire", no: "fire", fi: "neljä" },
      sizeFive: { en: "five", de: "fünf", fr: "cinq", es: "cinco", pt: "cinco", it: "cinque", nl: "vijf", sv: "fem", da: "fem", no: "fem", fi: "viisi" },

      /* paid sheet */
      sheetTitle: { en: "The line as the class left it, and room to write", de: "Die Reihe, wie die Klasse sie stehen ließ — und Platz zum Schreiben", fr: "La rangée telle qu’elle est à l’écran, et de quoi écrire", es: "La fila tal como la dejó la clase, y espacio para escribir", pt: "A fila do jeito que a turma deixou, e espaço para escrever", it: "La fila come l’ha lasciata la classe, e lo spazio per scrivere", nl: "De rij zoals de klas hem achterliet, en ruimte om te schrijven", sv: "Raden som klassen lämnade den, och plats att skriva", da: "Rækken, sådan som klassen forlod den — med plads til at skrive", no: "Rekka slik klassen forlot den, og plass til å skrive", fi: "Rivi sellaisena kuin luokka sen jätti — ja tilaa kirjoittaa" },
      sheetHint: { en: "On each line, one count the class made: from which end, and how many.", de: "In jede Zeile eine Zählung der Klasse: von welchem Ende — und wie viele.", fr: "Sur chaque ligne, un comptage fait par la classe : de quel bout, et combien.", es: "En cada línea, una cuenta que hizo la clase: desde qué lado y cuántos.", pt: "Em cada linha, uma contagem que a turma fez: de que ponta e quantos.", it: "Su ogni riga, un conteggio fatto dalla classe: da che parte e quanti.", nl: "Op elke regel: een telling van de klas — van welke kant, en hoeveel.", sv: "På varje rad: en räkning klassen gjorde — från vilken ände och hur många.", da: "På hver linje: en optælling, klassen lavede — fra hvilken ende, og hvor mange.", no: "På hver linje: en telling klassen gjorde — fra hvilken ende, og hvor mange.", fi: "Yhdelle riville yksi luokan laskeminen: mistä päästä ja montako." },
      lockedTitle: { en: "The sheet is part of a Teacher plan", de: "Das Blatt gehört zum Lehrkraft-Abo", fr: "La fiche fait partie de l’abonnement Enseignant", es: "La hoja es parte del plan Docente", pt: "A folha faz parte do plano Professor", it: "La scheda fa parte del Piano Insegnante", nl: "Het blad hoort bij het Leerkracht-abonnement", sv: "Arbetsbladet ingår i Lärarplanen", da: "Arket er en del af Lærerabonnementet", no: "Arket hører til Lærerabonnementet", fi: "Arkki kuuluu Opettajatilaukseen" },
      lockedBody: { en: "The whole apparatus is free — every line, both ends, sliding the hand, and the count from either way. A Teacher plan adds one more joining and one leaving to count on and back, and the printed sheet: the line the class was looking at, with lines to write on.", de: "Der ganze Aufbau ist kostenlos — jede Reihe, beide Enden, das Schieben der Hand und das Zählen von beiden Seiten. Mit dem Lehrkraft-Abo kommen das Dazukommen und das Weggehen dazu (Weiterzählen und Zurückzählen) sowie das Blatt zum Ausdrucken: die Reihe, die die Klasse gerade vor Augen hatte, mit Linien zum Schreiben.", fr: "Tout l’appareil est gratuit : chaque rangée, les deux bouts, la main qui glisse et le comptage des deux côtés. L’abonnement Enseignant ajoute l’arrivée et le départ (pour compter en avant et en arrière) et la fiche imprimée : la rangée affichée à l’écran, avec des lignes pour écrire.", es: "Todo el aparato es gratis: cada fila, los dos lados, deslizar la mano y contar desde cualquiera de los dos. El plan Docente añade que llegue uno y que se vaya uno (para contar hacia adelante y hacia atrás) y la hoja impresa: la fila que miraba la clase, con líneas para escribir.", pt: "Aqui tudo é grátis — todas as filas, as duas pontas, deslizar a mão e contar dos dois lados. O plano Professor acrescenta o chegar e o sair (para contar adiante e para trás) e a folha impressa: a fila que a turma estava vendo, com linhas para escrever.", it: "Lo strumento è gratuito tutto intero: ogni fila, tutte e due le parti, la mano che scorre e il conteggio dai due lati. Il Piano Insegnante aggiunge l’arrivo e la partenza (per contare avanti e indietro) e la scheda da stampare: la fila che la classe stava guardando, con le righe per scrivere.", nl: "Het hele apparaat is gratis: elke rij, allebei de kanten, de hand schuiven en tellen vanaf beide kanten. Met het Leerkracht-abonnement komen erbij komen en weggaan (om door te tellen en terug te tellen) en het blad om af te drukken: de rij waar de klas naar keek, met lijnen om op te schrijven.", sv: "Hela apparaten är gratis — varje rad, båda ändarna, att dra handen och att räkna från båda hållen. Lärarplanen lägger till att en till kommer och att en går (för att räkna vidare och bakåt) och arbetsbladet: raden klassen tittade på, med rader att skriva på.", da: "Hele apparatet er gratis — hver række, begge ender, at trække hånden og at tælle fra begge sider. Lærerabonnementet føjer til, at én kommer, og at én går (så man kan tælle videre og tilbage), og udskriften: rækken, klassen så på, med linjer til at skrive på.", no: "Hele apparatet er gratis: hver rekke, begge ender, å dra hånden og å telle fra begge sider. Lærerabonnementet legger til at én kommer og at én går (for å telle videre og tilbake), og arket til utskrift: rekka klassen så på, med linjer å skrive på.", fi: "Koko väline on ilmainen: jokainen rivi, molemmat päät, käden liu’uttaminen ja laskeminen kummastakin suunnasta. Opettajatilaus lisää sen, että yksi tulee ja yksi lähtee (eteen- ja taaksepäin laskemiseen), sekä tulostettavan arkin: rivin, jota luokka katsoi, ja rivit kirjoittamista varten." },
      gateCta: { en: "See the Teacher plan", de: "Das Lehrkraft-Abo ansehen", fr: "Voir l’abonnement Enseignant", es: "Ver el plan Docente", pt: "Ver o plano Professor", it: "Scopri il Piano Insegnante", nl: "Bekijk het Leerkracht-abonnement", sv: "Läs om Lärarplanen", da: "Se Lærerabonnementet", no: "Se Lærerabonnementet", fi: "Tutustu Opettajatilaukseen" }
    },

    settings: [
      { key: 'size', type: 'choice', labelKey: 'sizeLabel',
        options: [ { value: 'five', labelKey: 'sizeFive' }, { value: 'four', labelKey: 'sizeFour' } ] }
    ],

    defaults: { size: 'five' },

    premium: false,

    /* ================= THE MODEL ===================================
       st = { members:[friendIndex…], end:null|'a'|'b', k:0 }
       `end` is NULL until chosen — no default, no "front"; that absence is
       the thesis. `k` = how many friends have been swept from the active
       end; slots 0..k-1 wear numerals 1..k. Tags are a pure function of k
       (dragging back un-accretes), so nothing is remembered. */

    size: function (s) { return s === 'four' ? 4 : 5; },

    _pool: function () {
      /* the 6 distinguishable friend identities, shuffled */
      var idx = [], i;
      for (i = 0; i < GEO.CAP; i++) idx.push(i);
      return idx;
    },

    newState: function (size, pick) {
      var n = this.size(size), r = pick || Math.random, pool = this._pool(), out = [], i, j;
      for (i = 0; i < n; i++) {
        j = Math.floor(r() * pool.length);
        out.push(pool[j]);
        pool.splice(j, 1);
      }
      return { members: out, end: null, k: 0 };
    },

    _st: function (st) { return st || this.st; },

    n: function (st) { return this._st(st).members.length; },

    /* ⚠ null until an end is chosen — the gate asserts this */
    endOf: function (st) { return this._st(st).end; },

    /* the friend index the hand stands on, or null. Counting k from end
       'a' lands on member k-1; from end 'b' on n-k. */
    landedIndex: function (st) {
      var s = this._st(st);
      if (!s.end || s.k < 1) return null;
      return s.end === 'a' ? s.k - 1 : this.n(s) - s.k;
    },

    /* which member index sits at slot j (0-indexed from the active end) */
    memberAtSlot: function (st, j) {
      var s = this._st(st);
      return s.end === 'a' ? j : this.n(s) - 1 - j;
    },

    /* ⭐⭐ THE EXACT ARITHMETIC: counting k from one end lands on the member
       that is (n+1-k) from the other. They coincide iff k===(n+1)/2, which
       exists only for ODD n — so the self-same friend is a reachable,
       countable event, never a fluke. */
    mirrorK: function (st, k) { return this.n(st) + 1 - k; },

    isSelfSame: function (st, k) {
      var n = this.n(st);
      return n % 2 === 1 && k >= 1 && k === (n + 1) / 2;
    },

    /* ---- the moves. null is the single refusal channel. ---- */

    pickEnd: function (st, e) {
      var s = this._st(st);
      if (e !== 'a' && e !== 'b') return null;
      if (s.end === e && s.k === 0) return null;   /* nothing to change */
      return { members: s.members.slice(), end: e, k: 0 };  /* a fresh sweep */
    },

    /* set the sweep to an absolute count kk (0..n) — the drag/tap target */
    sweepTo: function (st, kk) {
      var s = this._st(st), n = this.n(s);
      if (!s.end) return null;
      kk = Math.round(kk);
      if (kk < 0) kk = 0; else if (kk > n) kk = n;
      if (kk === s.k) return null;
      return { members: s.members.slice(), end: s.end, k: kk };
    },

    step: function (st, dir) {
      var s = this._st(st);
      if (!s.end) return null;
      return this.sweepTo(s, s.k + (dir < 0 ? -1 : 1));
    },

    /* ⭐ PREMIUM — count on: one more distinct friend joins, re-count */
    join: function (st) {
      var s = this._st(st), n = this.n(s);
      if (n >= GEO.CAP) return null;
      var used = {}, i, avail = [];
      for (i = 0; i < s.members.length; i++) used[s.members[i]] = 1;
      for (i = 0; i < GEO.CAP; i++) if (!used[i]) avail.push(i);
      if (!avail.length) return null;
      var pick = avail[Math.floor((this._rng ? this._rng() : Math.random()) * avail.length)];
      var m = s.members.slice();
      /* joins at the 'b' end so a friend visibly appears on the right */
      m.push(pick);
      return { members: m, end: s.end, k: 0 };  /* re-count from the same end */
    },

    /* ⭐ PREMIUM — count back: one leaves, re-count */
    leave: function (st) {
      var s = this._st(st);
      if (this.n(s) <= GEO.MIN) return null;
      var m = s.members.slice();
      m.pop();                                    /* leaves from the 'b' end */
      return { members: m, end: s.end, k: 0 };
    },

    /* ================= LIFECYCLE ==================================== */

    init: function (api) {
      this.api = api;
      /* THE HOUSE SCROLL FORM — two rules, height:auto + min-height:100%.
         `overflow-y:auto` alone is inert against a shell that pins
         html,body{height:100%}. */
      document.documentElement.classList.add('que-scroll');
      document.body.classList.add('que-scroll');
      this._lastSound = 0;
      this._rng = Math.random;
      this._reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      this.st = this.newState(api.settings.size);
      this._checkEntitlement();
      this._bindPrint();
    },

    reset: function () { this.st = this.newState(this.api.settings.size); this.render(); },
    onSettings: function () { this.reset(); },

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

    render: function () { this._build(); this._paint(); },

    /* ================= DOM ========================================== */

    _build: function () {
      var api = this.api, self = this;
      this.injectCSS();
      var host = api.stage || api.root;
      host.innerHTML = '';

      var wrap = api.el('div', 'que-wrap');
      host.appendChild(wrap);

      this._stage = api.el('div', 'que-stage');
      wrap.appendChild(this._stage);

      this._svg = document.createElementNS(NS, 'svg');
      this._svg.setAttribute('viewBox', '0 0 ' + GEO.VW + ' ' + GEO.VH);
      this._svg.setAttribute('class', 'que-svg');
      this._stage.appendChild(this._svg);

      /* layered <g>s: static furniture, then the friends, then the badges,
         then the total/self-same marks, and LAST the persistent hand so it
         paints on top and can transition without being re-inserted. */
      this._gShelf = document.createElementNS(NS, 'g'); this._svg.appendChild(this._gShelf);
      this._gFriends = document.createElementNS(NS, 'g'); this._svg.appendChild(this._gFriends);
      this._gMarks = document.createElementNS(NS, 'g'); this._svg.appendChild(this._gMarks);

      /* ⚠⚠ THE HAND IS BUILT ONCE AND NEVER RE-INSERTED. A transition fires
         only between two computed styles OF THE SAME ELEMENT; a fresh or a
         re-appended node teleports. So every other child lives in a <g>
         that is emptied and refilled, and the hand is left in place. */
      this._hand = document.createElementNS(NS, 'path');
      /* a rounded upward caret, drawn at the origin and MOVED by transform */
      this._hand.setAttribute('d', 'M0,' + GEO.HAND_Y + ' l-8,13 q8,4 16,0 z');
      this._hand.setAttribute('class', 'que-hand');
      this._hand.style.display = 'none';
      this._svg.appendChild(this._hand);

      /* the rail: a transparent slider over the shelf carries the drag,
         the tap and the keyboard twin — a drag-only handle is dead to a
         keyboard, to AT and to the liveness gate. */
      this._rail = api.el('div', 'que-rail');
      this._rail.setAttribute('role', 'slider');
      this._rail.setAttribute('tabindex', '0');
      this._rail.setAttribute('aria-label', api.t('sizeLabel'));
      this._stage.appendChild(this._rail);
      this._wireRail();

      this._say = api.el('p', 'que-say');
      this._say.setAttribute('role', 'status');
      wrap.appendChild(this._say);

      var ends = api.el('div', 'que-row');
      wrap.appendChild(ends);
      this._btn = {};
      this._btn.endA = this._mk(ends, 'que-b-enda', '⇤', 'endLeft');
      this._btn.endB = this._mk(ends, 'que-b-endb', '⇥', 'endRight');

      var row = api.el('div', 'que-row');
      wrap.appendChild(row);
      this._btn.again = this._mk(row, 'que-b-again', '↻', 'newLine');
      if (this.premium) {
        this._btn.join = this._mk(row, 'que-b-join', '+', 'join');
        this._btn.leave = this._mk(row, 'que-b-leave', '−', 'leave');
        this._btn.print = this._mk(row, 'que-b-print', '⎙', 'print');
      }

      this._btn.endA.addEventListener('click', function () { self._pick('a'); });
      this._btn.endB.addEventListener('click', function () { self._pick('b'); });
      this._btn.again.addEventListener('click', function () { self._deal(); });
      if (this._btn.join) this._btn.join.addEventListener('click', function () { self._join(); });
      if (this._btn.leave) this._btn.leave.addEventListener('click', function () { self._leave(); });
      if (this._btn.print) this._btn.print.addEventListener('click', function () { self._print(); });

      this._gateHost = api.el('div', 'que-gate');
      wrap.appendChild(this._gateHost);

      this._sheet = api.el('div', 'que-sheet');
      host.appendChild(this._sheet);

      this._gate();
    },

    _mk: function (parent, cls, glyph, key) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'que-btn ' + cls;
      var g = document.createElement('span');
      g.className = 'que-glyph';
      g.setAttribute('aria-hidden', 'true');
      g.textContent = glyph;
      var t = document.createElement('span');
      t.className = 'que-label';
      t.textContent = this.api.t(key);
      b.appendChild(g); b.appendChild(t);
      parent.appendChild(b);
      return b;
    },

    /* ---- the rail: drag + tap + keyboard, one place ------------------
       Hand-rolled to the shipped number-line.js:_wireDrags shape — pointer
       bound to WINDOW (a repaint that removes the node releases capture),
       the terminating click of a real drag swallowed, and a full keyboard
       twin. */
    _wireRail: function () {
      var self = this, el = this._rail, active = false, moved = false;

      el.addEventListener('pointerdown', function (ev) {
        if (ev.button !== undefined && ev.button !== 0) return;
        active = true; moved = false;
        self._grab(ev.clientX);
        ev.preventDefault();
      });
      window.addEventListener('pointermove', function (ev) {
        if (!active) return;
        moved = true;
        self._grab(ev.clientX);
        ev.preventDefault();
      });
      window.addEventListener('pointerup', function () { active = false; });
      window.addEventListener('pointercancel', function () { active = false; moved = false; });
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        if (moved) { moved = false; return; }
        self._grab(ev.clientX);       /* a bare tap sweeps to that friend */
      });
      el.addEventListener('keydown', function (ev) {
        var k = ev.key;
        if (k === 'ArrowRight' || k === 'ArrowUp') { ev.preventDefault(); self._key(1); }
        else if (k === 'ArrowLeft' || k === 'ArrowDown') { ev.preventDefault(); self._key(-1); }
        else if (k === 'Home') { ev.preventDefault(); self._keyTo(0); }
        else if (k === 'End') { ev.preventDefault(); self._keyTo(self.n()); }
      });
    },

    /* map a clientX on the rail to a count k in [0,n], picking the nearest
       end first if none is chosen (grabbing physically chooses the end). */
    _kFromClientX: function (clientX) {
      var r = this._rail.getBoundingClientRect();
      if (!r.width) return { end: null, k: 0 };
      var xv = ((clientX - r.left) / r.width) * GEO.VW;     /* into viewBox x */
      var n = this.n(), step = 360 / (n + 1);
      var q = (xv - GEO.RAIL_X0) / step - 1;                /* member position */
      var end = this.st.end;
      if (!end) end = (clientX - r.left) < r.width / 2 ? 'a' : 'b';
      var rawK = (end === 'a') ? (q + 1) : (n - q);
      var k = Math.round(rawK);
      if (k < 0) k = 0; else if (k > n) k = n;
      return { end: end, k: k };
    },

    _grab: function (clientX) {
      var got = this._kFromClientX(clientX);
      if (!this.st.end) {
        var pe = this.pickEnd(null, got.end);
        if (pe) { this.st = pe; this._snd(GEO.SND_STEP); }
      }
      var ns = this.sweepTo(null, got.k);
      if (ns) { this.st = ns; this._afterSweep(); }
      else this._paint(0);
    },

    _key: function (dir) {
      if (!this.st.end) { this._refuse('rail', 'sayPickEnd'); return; }
      var ns = this.step(null, dir);
      if (!ns) { this._refuse('rail', dir > 0 ? 'sayEndOfLine' : null); this._paint(GEO.T_STEP); return; }
      this.st = ns; this._afterSweep();
    },
    _keyTo: function (kk) {
      if (!this.st.end) { this._refuse('rail', 'sayPickEnd'); return; }
      var ns = this.sweepTo(null, kk);
      if (ns) { this.st = ns; this._afterSweep(); } else this._paint(GEO.T_STEP);
    },

    _afterSweep: function () {
      var s = this.st, same = this.isSelfSame(s, s.k), full = s.k >= 1 && s.k === this.n(s);
      this._snd(same ? GEO.SND_SAME : full ? GEO.SND_TOTAL : GEO.SND_STEP);
      if (same) this.api.announce(this._fmt(this.api.t('sayLandedSame'), {}));
      else if (full) this.api.announce(this._fmt(this.api.t('sayTotal'), { n: this.n(s) }));
      else if (s.k >= 1) this.api.announce(this._fmt(this.api.t('ariaCounted'), { k: s.k }));
      this._paint(GEO.T_STEP);
    },

    /* ---- the acts ---------------------------------------------------- */

    _pick: function (e) {
      var n = this.pickEnd(null, e);
      if (!n) { this._refuse(e === 'a' ? 'endA' : 'endB'); return; }
      var reversed = this.st.end && this.st.end !== e && this.st.k >= 1;
      this.st = n;
      this._snd(GEO.SND_STEP);
      if (reversed) this.api.announce(this.api.t('sayReversed'));
      this._paint(GEO.T_STEP);
    },

    _deal: function () {
      this.st = this.newState(this.api.settings.size);
      this._snd(GEO.SND_STEP);
      this.api.announce(this.api.t('sayDealt'));
      this._paint(GEO.T_STEP);
    },

    _join: function () {
      if (!this.premium) { this._refuse('join'); return; }
      var n = this.join(null);
      if (!n) { this._refuse('join'); return; }
      this.st = n;
      this._snd(GEO.SND_JOIN);
      this.api.announce(this.api.t('sayJoined'));
      this._paint(GEO.T_STEP);
    },

    _leave: function () {
      if (!this.premium) { this._refuse('leave'); return; }
      var n = this.leave(null);
      if (!n) { this._refuse('leave'); return; }
      this.st = n;
      this._snd(GEO.SND_LEAVE);
      this.api.announce(this.api.t('sayLeft'));
      this._paint(GEO.T_STEP);
    },

    _refuse: function (which, sayKey) {
      var self = this, el = this._btn ? this._btn[which] : null;
      if (which === 'rail') el = this._rail;
      this._snd(GEO.SND_REFUSE, true);
      if (el) {
        el.classList.add('is-refuse');
        window.setTimeout(function () { el.classList.remove('is-refuse'); }, self._dur(GEO.T_REFUSE));
      }
      if (sayKey) this.api.announce(this.api.t(sayKey));
    },

    /* ================= PAINT ======================================== */

    _svgEl: function (tag, attrs) {
      var e = document.createElementNS(NS, tag), k;
      for (k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]);
      return e;
    },

    /* a symmetric topper, drawn INSIDE the box (nothing protrudes → no
       height ramp), in the friend's outline colour */
    _topper: function (g, kind, cx, color) {
      var y = GEO.CROWN_Y, e;
      if (kind === 'tuft') {
        g.appendChild(this._svgEl('circle', { cx: cx, cy: y - 1, r: 5, fill: color }));
      } else if (kind === 'ears') {
        g.appendChild(this._svgEl('circle', { cx: cx - 9, cy: y, r: 4.5, fill: color }));
        g.appendChild(this._svgEl('circle', { cx: cx + 9, cy: y, r: 4.5, fill: color }));
      } else if (kind === 'star') {
        e = this._svgEl('path', { fill: color, d: this._starPath(cx, y - 1, 8) });
        g.appendChild(e);
      } else if (kind === 'antennae') {
        g.appendChild(this._svgEl('line', { x1: cx - 5, y1: y + 6, x2: cx - 8, y2: y - 6, stroke: color, 'stroke-width': 2, 'stroke-linecap': 'round' }));
        g.appendChild(this._svgEl('line', { x1: cx + 5, y1: y + 6, x2: cx + 8, y2: y - 6, stroke: color, 'stroke-width': 2, 'stroke-linecap': 'round' }));
        g.appendChild(this._svgEl('circle', { cx: cx - 8, cy: y - 7, r: 2.5, fill: color }));
        g.appendChild(this._svgEl('circle', { cx: cx + 8, cy: y - 7, r: 2.5, fill: color }));
      } else if (kind === 'leaf') {
        g.appendChild(this._svgEl('path', { fill: color, d: 'M' + cx + ',' + (y - 8) + ' q7,7 0,15 q-7,-8 0,-15 z' }));
      } else { /* crown: three symmetric bumps */
        g.appendChild(this._svgEl('path', { fill: color, d:
          'M' + (cx - 10) + ',' + (y + 4) + ' L' + (cx - 10) + ',' + (y - 3) +
          ' L' + (cx - 5) + ',' + (y + 1) + ' L' + cx + ',' + (y - 6) +
          ' L' + (cx + 5) + ',' + (y + 1) + ' L' + (cx + 10) + ',' + (y - 3) +
          ' L' + (cx + 10) + ',' + (y + 4) + ' z' }));
      }
    },

    _starPath: function (cx, cy, R) {
      var pts = [], i, a, r;
      for (i = 0; i < 10; i++) {
        a = -Math.PI / 2 + i * Math.PI / 5;
        r = (i % 2 === 0) ? R : R * 0.44;
        pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
      }
      return 'M' + pts.join(' L') + ' z';
    },

    /* one friend at cx: cast shadow, body (fill bounded by an ≥3:1
       outline), sheen, face, topper. landed adds a soft #A34122 ground
       tick — never a recolour of the body. */
    _friend: function (g, friend, cx, landed) {
      var hw = GEO.BODY_W / 2, by = GEO.BASE_Y, sh = GEO.SHOULDER_Y, top = GEO.BODY_TOP;
      /* cast shadow — grounds the friend on the shelf */
      g.appendChild(this._svgEl('ellipse', { cx: cx, cy: by + 4, rx: hw + 1, ry: 3.4, fill: '#146B5E', 'fill-opacity': 0.10 }));
      /* the domed body: flat base, straight sides, a symmetric dome */
      var d = 'M' + (cx - hw) + ',' + by +
              ' L' + (cx - hw) + ',' + sh +
              ' Q' + (cx - hw) + ',' + top + ' ' + cx + ',' + top +
              ' Q' + (cx + hw) + ',' + top + ' ' + (cx + hw) + ',' + sh +
              ' L' + (cx + hw) + ',' + by + ' z';
      g.appendChild(this._svgEl('path', { 'class': 'que-body', d: d, fill: friend.fill, stroke: friend.line, 'stroke-width': 2, 'stroke-linejoin': 'round' }));
      /* soft top-left sheen (the jar's specular idiom, dialled down) */
      g.appendChild(this._svgEl('path', { d: 'M' + (cx - hw + 5) + ',' + (sh - 4) + ' Q' + (cx - hw + 3) + ',' + (top + 6) + ' ' + (cx - 5) + ',' + (top + 3), fill: 'none', stroke: '#FFFFFF', 'stroke-opacity': 0.35, 'stroke-width': 3, 'stroke-linecap': 'round' }));
      /* the identical friendly face — two symmetric dot eyes + a centred
         smile (no sideways pupils → no gaze → no end) */
      g.appendChild(this._svgEl('circle', { cx: cx - 7, cy: GEO.EYE_Y, r: 2.4, fill: '#2A2A35' }));
      g.appendChild(this._svgEl('circle', { cx: cx + 7, cy: GEO.EYE_Y, r: 2.4, fill: '#2A2A35' }));
      g.appendChild(this._svgEl('path', { d: 'M' + (cx - 6) + ',' + GEO.SMILE_Y + ' q6,5 12,0', fill: 'none', stroke: '#2A2A35', 'stroke-width': 2, 'stroke-linecap': 'round' }));
      this._topper(g, friend.top, cx, friend.line);
      if (landed) {
        g.appendChild(this._svgEl('rect', { x: cx - hw + 3, y: by + 1.5, width: GEO.BODY_W - 6, height: 3, rx: 1.5, fill: '#A34122' }));
      }
    },

    /* a cream count-badge on the belly: fill bounded by #A34122, ink
       numeral. An ATTRIBUTE of the friend — the running count. */
    _badge: function (g, cx, num, pop) {
      var w = 24, h = 22, x = cx - w / 2, y = GEO.BADGE_Y - h / 2;
      var bg = this._svgEl('g', { 'class': 'que-badge' + (pop ? ' is-pop' : '') });
      bg.appendChild(this._svgEl('rect', { x: x, y: y, width: w, height: h, rx: 7, fill: '#FBF3E4', stroke: '#A34122', 'stroke-width': 2 }));
      var t = this._svgEl('text', { x: cx, y: GEO.BADGE_Y + 6.5, 'text-anchor': 'middle', 'class': 'que-num' });
      t.textContent = String(num);
      bg.appendChild(t);
      g.appendChild(bg);
    },

    _paint: function (dur) {
      var s = this.st, api = this.api, t = api.t.bind(api), self = this;
      var n = this.n(s), i, step = 360 / (n + 1), landed = this.landedIndex(s);
      var hand = this._hand;

      /* ---- static furniture (safe to rebuild; the hand is untouched) ---- */
      this._gShelf.textContent = '';
      /* the shelf: a rounded ledge with a lighter top-lip and a soft
         under-shadow, so the crowd stands ON it */
      this._gShelf.appendChild(this._svgEl('rect', { x: GEO.RAIL_X0 - 4, y: GEO.SHELF_Y + GEO.SHELF_H - 2, width: (GEO.RAIL_X1 - GEO.RAIL_X0) + 8, height: 4, rx: 2, fill: '#0D4E44', 'fill-opacity': 0.5 }));
      this._gShelf.appendChild(this._svgEl('rect', { x: GEO.RAIL_X0, y: GEO.SHELF_Y, width: GEO.RAIL_X1 - GEO.RAIL_X0, height: GEO.SHELF_H, rx: 4, fill: '#146B5E' }));
      this._gShelf.appendChild(this._svgEl('rect', { x: GEO.RAIL_X0 + 2, y: GEO.SHELF_Y + 1.5, width: GEO.RAIL_X1 - GEO.RAIL_X0 - 4, height: 2.5, rx: 1.25, fill: '#1A7E70' }));
      /* two IDENTICAL end-caps — "neither end is home"; the chosen one lights */
      var caps = [ { x: GEO.RAIL_X0 - 6, e: 'a' }, { x: GEO.RAIL_X1 - 6, e: 'b' } ];
      for (i = 0; i < 2; i++) {
        var on = s.end === caps[i].e;
        this._gShelf.appendChild(this._svgEl('rect', {
          x: caps[i].x, y: GEO.SHELF_Y - 10, width: 12, height: GEO.SHELF_H + 10, rx: 4,
          fill: on ? '#F2784B' : '#146B5E', stroke: on ? '#A34122' : '#0D4E44', 'stroke-width': 2 }));
      }

      /* ---- the friends ---- */
      this._gFriends.textContent = '';
      for (i = 0; i < n; i++) {
        var cx = GEO.RAIL_X0 + step * (i + 1);
        this._friend(this._gFriends, FRIENDS[s.members[i]], cx, landed === i);
      }

      /* ---- badges (transient; a pure function of k → drag un-accretes),
         the whole-line total, and the self-same mark ---- */
      this._gMarks.textContent = '';
      for (i = 0; i < s.k; i++) {
        var mi = this.memberAtSlot(s, i);
        var mcx = GEO.RAIL_X0 + step * (mi + 1);
        this._badge(this._gMarks, mcx, i + 1, i === s.k - 1);
      }
      if (s.k >= 1 && s.k === n) this._total(this._gMarks, n, step);
      if (this.isSelfSame(s, s.k) && landed !== null) {
        this._selfSame(this._gMarks, GEO.RAIL_X0 + step * (landed + 1));
      }

      /* ---- the persistent hand ---- */
      if (s.end && s.k >= 1 && landed !== null) {
        var wx = GEO.RAIL_X0 + step * (landed + 1);
        hand.setAttribute('transform', 'translate(' + wx.toFixed(1) + ',0)');
        hand.style.display = '';
      } else {
        hand.style.display = 'none';
      }

      /* ---- control + rail state ---- */
      this._btn.endA.classList.toggle('is-on', s.end === 'a');
      this._btn.endB.classList.toggle('is-on', s.end === 'b');
      if (this._btn.join) this._btn.join.classList.toggle('is-off', !this.join(null));
      if (this._btn.leave) this._btn.leave.classList.toggle('is-off', !this.leave(null));
      this._rail.setAttribute('aria-valuemin', '0');
      this._rail.setAttribute('aria-valuemax', String(n));
      this._rail.setAttribute('aria-valuenow', String(s.k));

      /* ---- the visible status line + the stage aria ---- */
      if (!s.end) this._say.textContent = t('sayPickEnd');
      else if (s.k >= 1 && this.isSelfSame(s, s.k)) this._say.textContent = t('sayLandedSame');
      else if (s.k >= 1 && s.k === n) this._say.textContent = this._fmt(t('sayTotal'), { n: n });
      else this._say.textContent = '';

      var key = !s.end ? 'ariaNoEnd'
        : this.isSelfSame(s, s.k) ? 'ariaSelfSame'
        : (s.k >= 1 && s.k === n) ? 'ariaTotal'
        : s.k >= 1 ? 'ariaCounted' : 'ariaLine';
      this._stage.setAttribute('role', 'group');
      var lead = this._fmt(t('ariaLine'), { n: n });
      this._stage.setAttribute('aria-label',
        key === 'ariaLine' ? lead : lead + ' ' + this._fmt(t(key), { n: n, k: s.k }));

      this._stage.style.setProperty('--que-dur', (dur ? this._dur(dur) : 0) + 'ms');
    },

    /* the whole-line total: a spanning bar under the crowd + a pill with a
       double-ring — the "how many" belongs to the LINE, never to the last
       friend's badge */
    _total: function (g, n, step) {
      var x0 = GEO.RAIL_X0 + step, x1 = GEO.RAIL_X0 + step * n, y = GEO.TOTAL_Y;
      var mid = (x0 + x1) / 2;
      g.appendChild(this._svgEl('path', { d: 'M' + x0 + ',' + (y - 6) + ' L' + x0 + ',' + y + ' L' + x1 + ',' + y + ' L' + x1 + ',' + (y - 6), fill: 'none', stroke: '#0D4E44', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
      var pill = this._svgEl('g', { 'class': 'que-total is-pop' });
      pill.appendChild(this._svgEl('circle', { cx: mid, cy: y + 3, r: 13, fill: '#FBF3E4', stroke: '#0D4E44', 'stroke-width': 2 }));
      pill.appendChild(this._svgEl('circle', { cx: mid, cy: y + 3, r: 9.5, fill: 'none', stroke: '#0D4E44', 'stroke-width': 1 }));
      var tx = this._svgEl('text', { x: mid, y: y + 8.5, 'text-anchor': 'middle', 'class': 'que-num' });
      tx.textContent = String(n);
      pill.appendChild(tx);
      g.appendChild(pill);
    },

    /* self-same middle: two mirrored arrival ticks meeting on the friend +
       a symmetric pulse-ring — KIND, never HUE */
    _selfSame: function (g, cx) {
      var y = GEO.BASE_Y - 34;
      g.appendChild(this._svgEl('path', { d: 'M' + (cx - 22) + ',' + y + ' l8,-5 v10 z', fill: '#A34122' }));
      g.appendChild(this._svgEl('path', { d: 'M' + (cx + 22) + ',' + y + ' l-8,-5 v10 z', fill: '#A34122' }));
      g.appendChild(this._svgEl('circle', { cx: cx, cy: GEO.SMILE_Y - 6, r: 26, fill: 'none', stroke: '#A34122', 'stroke-width': 2, 'class': 'que-ring' + (this._reduced ? '' : ' is-pulse') }));
    },

    /* ================= ENTITLEMENT + PRINT ========================== */

    _checkEntitlement: function () {
      var self = this;
      this.premium = false;
      try {
        if (typeof fetch !== 'function') return;
        fetch('/api/entitlement', { credentials: 'include' })
          .then(function (r) { return r.ok ? r.json() : null; })
          .then(function (j) {
            if (!j) return;
            var tier = j.tier || (j.entitlement && j.entitlement.tier);
            if (!tier) return;
            var was = self.premium;
            self.premium = tier !== 'free';
            if (self.premium !== was && self._stage) {
              /* entitlement changed after first paint → rebuild so the paid
                 chips are ABSENT/present in the DOM, and RESET the line so a
                 lost entitlement drops the state a premium control produced */
              self.st = self.newState(self.api.settings.size);
              self.render();
            } else {
              self._gate();
            }
          })['catch'](function () { /* degrades to the FREE tier, never to nothing */ });
      } catch (e) { this.premium = false; }
    },

    _gate: function () {
      if (!this._gateHost) return;
      var t = this.api.t.bind(this.api);
      this._gateHost.textContent = '';
      if (this.premium) { this._gateHost.classList.remove('is-on'); return; }
      this._gateHost.classList.add('is-on');
      var h = this.api.el('p', 'que-gate-h'); h.textContent = t('lockedTitle');
      var b = this.api.el('p', 'que-gate-b'); b.textContent = t('lockedBody');
      var a = document.createElement('a');
      a.className = 'que-gate-cta'; a.href = '/' + (this.api.lang || 'en') + '/pricing'; a.textContent = t('gateCta');
      this._gateHost.appendChild(h); this._gateHost.appendChild(b); this._gateHost.appendChild(a);
    },

    _bindPrint: function () {
      var self = this;
      if (typeof window.addEventListener !== 'function') return;
      /* ⚠⚠ Ctrl+P IS A PRINT PATH TOO — the guard belongs on the SHEET, or
         the browser's own print command hands the paid sheet to every
         non-subscriber. */
      window.addEventListener('beforeprint', function () {
        if (!self.premium) { if (self._sheet) self._sheet.textContent = ''; return; }
        self._buildSheet();
      });
    },

    _print: function () {
      if (!this.premium) { this._refuse('print'); return; }
      this._buildSheet();
      window.print();
    },

    _buildSheet: function () {
      if (!this._sheet) return;
      var t = this.api.t.bind(this.api), s = this.st, i, n = this.n(s), step = 360 / (n + 1);
      this._sheet.textContent = '';
      var h = this.api.el('h2', 'que-sh-h'); h.textContent = t('sheetTitle');
      this._sheet.appendChild(h);

      var frame = this.api.el('div', 'que-sh-frame');
      var svg = document.createElementNS(NS, 'svg');
      svg.setAttribute('viewBox', '0 0 400 120');
      svg.setAttribute('class', 'que-sh-svg');
      var gShelf = document.createElementNS(NS, 'g'), gF = document.createElementNS(NS, 'g');
      svg.appendChild(gShelf); svg.appendChild(gF);
      /* outline-only friends for ink economy */
      for (i = 0; i < n; i++) {
        var cx = GEO.RAIL_X0 + step * (i + 1);
        this._friend(gF, FRIENDS[s.members[i]], cx, false);
      }
      frame.appendChild(svg);
      this._sheet.appendChild(frame);

      var hint = this.api.el('p', 'que-sh-hint'); hint.textContent = t('sheetHint');
      this._sheet.appendChild(hint);

      var lines = this.api.el('div', 'que-sh-lines');
      for (i = 0; i < 6; i++) lines.appendChild(this.api.el('div', 'que-sh-line'));
      this._sheet.appendChild(lines);
    },

    /* ================= CSS ========================================== */

    injectCSS: function () {
      if (document.getElementById('que-css')) return;
      var st = document.createElement('style');
      st.id = 'que-css';
      st.textContent = [
        'html.que-scroll{overflow-y:auto;height:auto;min-height:100%}',
        'body.que-scroll{overflow-y:auto;height:auto;min-height:100%}',
        '.que-wrap{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;max-width:660px;margin:0 auto;padding:8px 10px 14px}',
        '.que-stage{position:relative;width:100%;background:#F6EAD3;border:1px solid #E7DCC8;border-radius:16px;padding:10px}',
        '.que-svg{display:block;width:100%;height:auto}',
        /* the rail slider covers the shelf band; transparent, ≥44px tall */
        '.que-rail{position:absolute;left:6%;right:6%;bottom:8%;height:30%;min-height:48px;cursor:pointer;touch-action:none;border-radius:12px}',
        '.que-rail:focus-visible{outline:3px solid #0D4E44;outline-offset:2px}',
        '.que-rail.is-refuse{outline:3px solid #A34122;outline-offset:2px}',
        /* the counting hand: GENUINE coral, bounded by its ≥3:1 shadow-stroke */
        '.que-hand{fill:#F2784B;stroke:#A34122;stroke-width:2;stroke-linejoin:round;transition:transform var(--que-dur,0ms) ease-in-out}',
        '.que-num{font-family:"Baloo 2","Trebuchet MS",system-ui,sans-serif;font-weight:700;font-size:15px;fill:#2A2A35}',
        '.que-badge.is-pop{animation:que-pop 180ms cubic-bezier(.34,.06,.2,1)}',
        '.que-total.is-pop{animation:que-pop 180ms cubic-bezier(.34,.06,.2,1)}',
        '.que-ring.is-pulse{animation:que-ring 500ms ease-out}',
        '@keyframes que-pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}',
        '@keyframes que-ring{from{opacity:.7;transform:scale(.7)}to{opacity:1;transform:scale(1)}}',
        '@media (prefers-reduced-motion: reduce){.que-badge.is-pop,.que-total.is-pop{animation:none}.que-ring.is-pulse{animation:none}}',
        '.que-say{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#2A2A35;text-align:center;margin:0;min-height:1.3em}',
        '.que-row{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;width:100%}',
        '.que-btn{display:inline-flex;align-items:center;gap:7px;min-height:44px;padding:9px 14px;border-radius:12px;border:1px solid #E7DCC8;background:#FBF3E4;color:#2A2A35;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer}',
        '.que-btn:focus-visible{outline:3px solid #0D4E44;outline-offset:2px}',
        '.que-btn.is-off{opacity:.45;cursor:default}',
        '.que-btn.is-on{background:#146B5E;color:#FBF3E4;border-color:#146B5E}',
        '.que-btn.is-refuse{transform:translateX(-3px)}',
        '.que-glyph{font-size:18px;line-height:1}',
        '.que-gate{display:none;width:100%;background:#FBF3E4;border:1px dashed #E7DCC8;border-radius:12px;padding:12px 14px}',
        '.que-gate.is-on{display:block}',
        '.que-gate-h{margin:0 0 5px;font-family:"Baloo 2",system-ui,sans-serif;font-size:16px;color:#0D4E44}',
        '.que-gate-b{margin:0 0 8px;font-family:Nunito,system-ui,sans-serif;font-size:14px;color:#7A6A55;line-height:1.45}',
        '.que-gate-cta{display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border-radius:10px;background:#146B5E;color:#FBF3E4;font-family:Nunito,system-ui,sans-serif;font-size:14px;text-decoration:none}',
        '.que-sheet{display:none}',
        '@media print{.lcs-header,.lcs-controls,.que-wrap{display:none !important}',
        '.que-sheet{display:block !important;padding:0}',
        '.que-sh-h{font-family:"Baloo 2",system-ui,sans-serif;font-size:19pt;color:#000;margin:0 0 10pt}',
        '.que-sh-frame{border:1pt solid #000;border-radius:6pt;padding:8pt;margin:0 0 10pt}',
        '.que-sh-svg{width:100%;height:auto}',
        '.que-sh-frame path{stroke:#000 !important}',
        '.que-sh-frame path[fill^="#F"],.que-sh-frame path[fill^="#E"],.que-sh-frame path[fill^="#A"],.que-sh-frame path[fill^="#7"],.que-sh-frame path[fill^="#B"],.que-sh-frame path[fill^="#D"]{fill:#fff !important}',
        '.que-sh-hint{font-family:Nunito,system-ui,sans-serif;font-size:10pt;margin:0 0 8pt}',
        '.que-sh-line{border-bottom:0.75pt solid #000;height:26pt}}'
      ].join('');
      document.head.appendChild(st);
    }
  };

  if (typeof window !== 'undefined') window.TheQueue = TheQueue;
  if (typeof module !== 'undefined' && module.exports) module.exports = TheQueue;
})();
