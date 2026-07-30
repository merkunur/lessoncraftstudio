/* =====================================================================
   TOOL #34 — CLASS GRAPH   (class-graph.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v3 catalog, build #5. The M3 entry.

   The teacher asks the class a question. Each child walks up and taps
   their answer; a child-stamp joins that column. Then the teacher taps
   once and the pile of children BECOMES A BAR — and taps again and it
   comes back.

   THE ONE THESIS — THE ABSTRACTION IS THE LESSON, SO IT MUST BE WATCHED.
   Going from "a picture for each of us" to "a bar this tall" is the
   single biggest jump in early data work, and every worksheet in the
   world presents it as already done. Here the class watches it happen,
   to their own data, and can flip it back.

   ⚠ WHAT THIS TOOL IS NOT, AND WHY. The fence came back PARTIALLY
   OCCUPIED and this tool is deliberately narrow as a result:
     graph-it.bar-graph      2.MD.D.10 — owns TAP-A-COLUMN-TO-BUILD-A-BAR
     .2-md-d-10              and the graded "how many more?" answer rail.
                             So this tool never asks a graded question,
                             and a child never builds a bar by tapping.
     calendar-wall (#7)      owns the 1:1 stacked pictograph WITH
                             most/compare/total talk prompts; its header
                             calls itself "the K.MD.B.3 -> 2.MD.D.10
                             bridge (strict 1:1 icons)".
                             ⚠ THE BOUNDARY: calendar-wall accumulates
                             one observation per DAY over a month and
                             stays a pictograph. Class Graph accumulates
                             one vote per CHILD in one sitting and
                             TRANSFORMS.
     choice-board.sort-count K.MD.B.3 — owns classify-and-count, 11/11.
     .k-md-b-3
     chart-count / line-plot own reading or completing a chart that
                             somebody else made.
   Only two things were free, and they are the whole tool: **the children
   generate the data**, and **the transformation**. No tool or activity
   on this platform had ever animated a representation change.

   ⚠ IT IS A TOOL, NEVER AN ACTIVITY. An activity at 2.MD.D.10 would be a
   same-code collision with graph-it. A free-play tool declares no
   `tasks`, so it carries no CCSS alignment and cannot collide.

   THREE INVENTIONS:
     1. THE BAR *IS* THE PILE, BY CONSTRUCTION. The bar is real DOM that
        lives inside the same wrapper as the stamps, position:absolute
        inset:0, and the stamps are never removed — only faded. So the
        bar's height is not computed, it is the layout's own answer.
        MEASURED (scripts/_probe-classgraph-morph.js): |bar - pile| = 0px
        across 90 columns, five viewports, both states, lossless over
        four flips. Same trick as place-value-lab.js:2298 `pvl-incoming`.
     2. THE DATA IS US. Every stamp is one child and they are identical —
        anonymous, following estimation-jar's "drops as an ANONYMOUS dot".
        The bar is not an example of data; it is the room.
     3. THE NUMERALS ARE BEHIND A CURTAIN. While voting, a column shows
        only its pile, so the class compares by LENGTH. The count appears
        only when the teacher reveals it. (number-talk-easel's curtain
        doctrine and its numeral-leak gate: if the number is on screen
        from the start, nobody looks at the graph.)

   ⚠ NOTHING IS PERSISTED. The votes live in the JS heap and die on
   reload; the store holds only settings and the entitlement cache.
   estimation-jar made the same choice for the same reason, and it is a
   choice rather than an omission: a class's answers are a moment, not a
   record, and a record of them is one step from a record about a child.

   ⚠ A REPEAT TAP IS INDISTINGUISHABLE FROM A SECOND CHILD, and that is
   the honest price of anonymity rather than something to engineer around
   (feelings-check-in.js:223 says it in those words). Undo is there for
   when the class notices. There is no "12 of 24 have answered" counter —
   the pile is the data, never a progress meter.

   SINGLE DEVICE, PASSED AROUND. There is no multi-device anything on
   this platform: the only /api/ endpoint in the whole mini-tools layer
   is /api/auth/me, there are zero POSTs, and CLAUDE.md:294 defers
   student accounts, class management and real-time collaboration. So
   "the class votes" is the proven estimation-jar ritual — children walk
   up to one shared screen.

   REFUSES, FOREVER: no winner, no ranking, no sort-by-size, no "most
   popular" celebration — a class survey is a portrait, not a contest
   (the no-competition lock, CLAUDE.md:25) · no timer, no score · NO
   GRADED QUESTION of any kind, because graph-it owns that and owns it
   well · no child identity: it never reads the roster and never stores
   a name · no speech, because the teacher reads the question aloud and
   nine of eleven locales have no voice on a normal school laptop.
   ===================================================================== */
var ClassGraph = {
  id: 'class-graph',

  /* ⚠ CURATION: en authored; the other ten come from the per-locale
     native 3-agent ensembles (§A.13.48), never machine-translated.
     [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6. */
  strings: {
    title:        { en: "Class Graph", de: "Klassendiagramm", fr: "Le graphique de la classe", es: "La gráfica del salón", pt: "O gráfico da turma", it: "Il grafico della classe", nl: "Klassengrafiek", sv: "Klassens diagram", da: "Klassens diagram", no: "Klassens diagram", fi: "Luokan diagrammi" },
    instruction:  { en: "Ask the class a question, let everyone add themselves, then watch the pictures become a bar.", de: "Stellen Sie der Klasse eine Frage, jedes Kind trägt sich selbst ein, und dann wird aus den Bildern eine Säule.", fr: "Posez une question à la classe, laissez chacun s’ajouter, puis regardez les images devenir une barre.", es: "Hazle una pregunta al grupo, deja que cada quien se agregue y observen cómo los dibujos se vuelven una barra.", pt: "Faça uma pergunta para a turma, deixe cada um se colocar e vejam os desenhos virarem uma barra.", it: "Fai una domanda alla classe, lascia che ognuno si aggiunga e guardate le figure diventare una barra.", nl: "Stel de klas een vraag, iedereen zet zichzelf erbij, en dan zie je hoe de kinderen een staaf worden.", sv: "Ställ en fråga till klassen, alla får lägga till sig själva, och sedan blir bilderna en stapel.", da: "Stil klassen et spørgsmål, lad alle tilføje sig selv, og se så billederne blive til en søjle.", no: "Still klassen et spørsmål, la alle legge seg selv til, og se bildene bli til en søyle.", fi: "Kysy luokalta kysymys, anna jokaisen lisätä itsensä ja katsokaa, miten kuvista kasvaa pylväs." },
    askLabel:     { en: "The question", de: "Die Frage", fr: "La question", es: "La pregunta", pt: "A pergunta", it: "La domanda", nl: "De vraag", sv: "Frågan", da: "Spørgsmålet", no: "Spørsmålet", fi: "Kysymys" },
    editQuestion: { en: "Change the question", de: "Frage ändern", fr: "Changer la question", es: "Cambiar la pregunta", pt: "Trocar a pergunta", it: "Cambia domanda", nl: "Vraag wijzigen", sv: "Ändra frågan", da: "Skift spørgsmål", no: "Bytt spørsmål", fi: "Vaihda kysymys" },
    questionHint: { en: "What do you want to ask the class?", de: "Was möchten Sie die Klasse fragen?", fr: "Que voulez-vous demander à la classe ?", es: "¿Qué quieres preguntarle al grupo?", pt: "O que você quer perguntar para a turma?", it: "Che cosa vuoi chiedere alla classe?", nl: "Wat wil je de klas vragen?", sv: "Vad vill du fråga klassen?", da: "Hvad vil du spørge klassen om?", no: "Hva vil du spørre klassen om?", fi: "Mitä haluat kysyä luokalta?" },
    catsHint:     { en: "The answers they can choose", de: "Die Antworten zur Auswahl", fr: "Les réponses possibles", es: "Las respuestas que pueden elegir", pt: "As respostas para escolher", it: "Le risposte tra cui scegliere", nl: "De antwoorden om uit te kiezen", sv: "Svaren de kan välja mellan", da: "De svar, børnene kan vælge", no: "Svarene barna kan velge", fi: "Vastaukset, joista voi valita" },
    addCat:       { en: "Add an answer", de: "Antwort ergänzen", fr: "Ajouter une réponse", es: "Agregar respuesta", pt: "Adicionar resposta", it: "Aggiungi risposta", nl: "Antwoord erbij", sv: "Lägg till svar", da: "Tilføj et svar", no: "Legg til et svar", fi: "Lisää vastaus" },
    removeCat:    { en: "Remove", de: "Entfernen", fr: "Retirer", es: "Quitar", pt: "Tirar", it: "Togli", nl: "Weghalen", sv: "Ta bort", da: "Fjern", no: "Fjern", fi: "Poista" },
    useSetup:     { en: "Put it on the board", de: "An die Tafel bringen", fr: "Afficher au tableau", es: "Ponerla en el pizarrón", pt: "Colocar na lousa", it: "Portala alla lavagna", nl: "Op het bord zetten", sv: "Sätt upp på tavlan", da: "Sæt det på tavlen", no: "Sett det på tavla", fi: "Vie taululle" },
    starterLabel: { en: "Or start from one of these", de: "Oder mit einer dieser Fragen beginnen", fr: "Ou partez de l’une de ces questions", es: "O empieza con una de estas", pt: "Ou comece por uma destas", it: "Oppure parti da una di queste", nl: "Of begin met een van deze", sv: "Eller börja med någon av dessa", da: "Eller start med en af disse", no: "Eller start med en av disse", fi: "Tai aloita jostakin näistä" },
    asPictures:   { en: "Show the children", de: "Kinder zeigen", fr: "Voir les enfants", es: "Ver a los niños", pt: "Ver as crianças", it: "Mostra i bambini", nl: "Kinderen tonen", sv: "Visa barnen", da: "Vis børnene", no: "Vis barna", fi: "Näytä lapset" },
    asBars:       { en: "Show the bars", de: "Säulen zeigen", fr: "Voir les barres", es: "Ver las barras", pt: "Ver as barras", it: "Mostra le barre", nl: "Staven tonen", sv: "Visa staplarna", da: "Vis søjlerne", no: "Vis søylene", fi: "Näytä pylväät" },
    showCounts:   { en: "Show the numbers", de: "Zahlen zeigen", fr: "Voir les nombres", es: "Ver los números", pt: "Ver os números", it: "Mostra i numeri", nl: "Getallen tonen", sv: "Visa siffrorna", da: "Vis tallene", no: "Vis tallene", fi: "Näytä luvut" },
    hideCounts:   { en: "Hide the numbers", de: "Zahlen verstecken", fr: "Cacher les nombres", es: "Ocultar números", pt: "Esconder números", it: "Nascondi i numeri", nl: "Getallen weg", sv: "Göm siffrorna", da: "Skjul tallene", no: "Skjul tallene", fi: "Piilota luvut" },
    undo:         { en: "Take one back", de: "Eins zurück", fr: "Retirer un enfant", es: "Quitar uno", pt: "Tirar uma criança", it: "Togli un bambino", nl: "Eentje terug", sv: "Ta tillbaka en", da: "Tag en tilbage", no: "Ta en tilbake", fi: "Ota yksi pois" },
    voteHint:     { en: "Tap your answer. One tap each.", de: "Tippe deine Antwort an. Einmal pro Kind.", fr: "Touche ta réponse. Une seule fois chacun.", es: "Toca tu respuesta. Una vez cada quien.", pt: "Toque na sua resposta. Uma vez cada um.", it: "Tocca la tua risposta. Una volta per ciascuno.", nl: "Tik je antwoord aan. Eén tik per kind.", sv: "Tryck på ditt svar. En tryckning var.", da: "Tryk på dit svar. Ét tryk hver.", no: "Trykk på svaret ditt. Ett trykk hver.", fi: "Napauta omaa vastaustasi. Yksi napautus jokaiselta." },
    tapToVote:    { en: "Add yourself to {label}", de: "Dich bei {label} eintragen", fr: "Ajoute-toi à {label}", es: "Agrégate a {label}", pt: "Coloque-se em {label}", it: "Aggiungiti a {label}", nl: "Zet jezelf bij {label}", sv: "Lägg till dig i {label}", da: "Føj dig selv til {label}", no: "Legg deg selv til {label}", fi: "Lisää itsesi tähän vastaukseen: {label}" },
    emptyNote:    { en: "Nobody has answered yet.", de: "Noch hat niemand geantwortet.", fr: "Personne n’a encore répondu.", es: "Todavía nadie ha respondido.", pt: "Ninguém respondeu ainda.", it: "Non ha ancora risposto nessuno.", nl: "Nog niemand heeft geantwoord.", sv: "Ingen har svarat än.", da: "Ingen har svaret endnu.", no: "Ingen har svart ennå.", fi: "Kukaan ei ole vielä vastannut." },
    gateCats:     { en: "More than three answers is part of the Teacher plan.", de: "Mehr als drei Antworten gehören zum Lehrer-Paket.", fr: "Plus de trois réponses font partie de l’offre Enseignant.", es: "Más de tres respuestas forman parte del plan Docente.", pt: "Mais de três respostas fazem parte do plano Professor.", it: "Più di tre risposte fanno parte del piano Insegnante.", nl: "Meer dan drie antwoorden horen bij het Leerkracht-pakket.", sv: "Fler än tre svar ingår i Lärarpaketet.", da: "Mere end tre svar er en del af Lærerpakken.", no: "Mer enn tre svar er en del av Lærerpakken.", fi: "Yli kolme vastausta kuuluu Opettaja-tilaukseen." },
    gatePrint:    { en: "Printing is part of the Teacher plan.", de: "Drucken gehört zum Lehrer-Paket.", fr: "L’impression fait partie de l’offre Enseignant.", es: "Imprimir forma parte del plan Docente.", pt: "Imprimir faz parte do plano Professor.", it: "La stampa fa parte del piano Insegnante.", nl: "Printen hoort bij het Leerkracht-pakket.", sv: "Att skriva ut ingår i Lärarpaketet.", da: "Udskrivning er en del af Lærerpakken.", no: "Utskrift er en del av Lærerpakken.", fi: "Tulostus kuuluu Opettaja-tilaukseen." },
    printBtn:     { en: "Print the graph", de: "Diagramm drucken", fr: "Imprimer le graphique", es: "Imprimir la gráfica", pt: "Imprimir o gráfico", it: "Stampa il grafico", nl: "Grafiek printen", sv: "Skriv ut diagrammet", da: "Udskriv diagrammet", no: "Skriv ut diagrammet", fi: "Tulosta diagrammi" },
    unlock:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Découvrir l’offre Enseignant", es: "Conocer el plan Docente", pt: "Conhecer o plano Professor", it: "Scopri il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerpakken", no: "Se Lærerpakken", fi: "Katso Opettaja-tilaus" },
    privacyLine:  { en: "Nothing here is saved, recorded or sent anywhere. No names, ever.", de: "Nichts davon wird gespeichert, ausgewertet oder irgendwohin gesendet. Keine Namen, niemals.", fr: "Rien n’est enregistré, ni comptabilisé, ni envoyé où que ce soit. Aucun nom, jamais.", es: "Aquí nada se guarda, se contabiliza ni se envía a ningún lado. Nunca hay nombres.", pt: "Aqui nada é salvo, registrado nem enviado para lugar nenhum. Nenhum nome, nunca.", it: "Qui non si salva, non si registra e non si invia niente. Nessun nome, mai.", nl: "Er wordt hier niets bewaard, beoordeeld of ergens naartoe gestuurd. Nooit namen.", sv: "Ingenting här sparas, bedöms eller skickas någonstans. Inga namn, aldrig.", da: "Intet her bliver gemt, registreret eller sendt nogen steder hen. Aldrig navne.", no: "Ingenting her blir lagret, registrert eller sendt noe sted. Aldri navn.", fi: "Täällä ei tallenneta, kirjata eikä lähetetä mitään. Ei koskaan nimiä." },
    setStamp:     { en: "Pop each answer as it lands", de: "Jede Antwort hüpft kurz, wenn sie landet", fr: "Un petit bond à chaque réponse", es: "Un brinquito al llegar cada respuesta", pt: "Um pulinho a cada resposta que chega", it: "Un saltello a ogni risposta che arriva", nl: "Elk antwoord even laten wippen als het landt", sv: "Låt varje svar studsa till när det landar", da: "Pop, når svar lander", no: "Popp når svar lander", fi: "Poksahdus, kun vastaus tulee" },
    clear:        { en: "Start again", de: "Neu beginnen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Começar de novo", it: "Ricomincia", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" }
  },

  /* ⚠ Authored per locale by the native ensembles, NOT translated: a
     starter must be a question a real K-1 class would vote on, with
     answers short enough to sit under a column. */
  starters: {
    en: [
      { q: "How did you get to school today?", cats: ["Walked", "Car", "Bus"] },
      { q: "Which do you like best?", cats: ["Cats", "Dogs", "Fish"] },
      { q: "What is the weather doing right now?", cats: ["Sun", "Cloud", "Rain"] },
      { q: "Which fruit would you choose?", cats: ["Apple", "Banana", "Pear"] }
    ],
    de: [
      { q: "Wie bist du heute zur Schule gekommen?", cats: ["Zu Fuß", "Mit dem Rad", "Mit dem Bus"] },
      { q: "Was isst du am liebsten zum Frühstück?", cats: ["Brot", "Müsli", "Obst"] },
      { q: "Wie ist das Wetter heute draußen?", cats: ["Sonne", "Wolken", "Regen"] },
      { q: "Was machst du am liebsten in der Pause?", cats: ["Rennen", "Schaukeln", "Fußball"] }
    ],
    fr: [
      { q: "Comment es-tu venu à l’école aujourd’hui ?", cats: ["À pied", "En voiture", "En bus"] },
      { q: "Quel temps fait-il ce matin ?", cats: ["Soleil", "Nuages", "Pluie"] },
      { q: "Qu’est-ce que tu préfères à la récréation ?", cats: ["Courir", "Le ballon", "Dessiner"] },
      { q: "Quel fruit préfères-tu ?", cats: ["La pomme", "La banane", "Le raisin"] }
    ],
    es: [
      { q: "¿Cómo llegaste hoy a la escuela?", cats: ["Caminando", "En coche", "En camión"] },
      { q: "¿Cómo está el día hoy?", cats: ["Soleado", "Nublado", "Lluvioso"] },
      { q: "¿Qué te gusta más en el recreo?", cats: ["Correr", "La pelota", "Dibujar"] },
      { q: "¿Qué fruta te gusta más?", cats: ["La manzana", "El plátano", "La naranja"] }
    ],
    pt: [
      { q: "Como você veio para a escola hoje?", cats: ["A pé", "De carro", "De ônibus"] },
      { q: "Como está o tempo hoje?", cats: ["Sol", "Nuvens", "Chuva"] },
      { q: "O que você gosta de fazer no recreio?", cats: ["Correr", "Bola", "Desenhar"] },
      { q: "Qual fruta você gosta mais?", cats: ["Maçã", "Banana", "Uva"] }
    ],
    it: [
      { q: "Come sei arrivato a scuola oggi?", cats: ["A piedi", "In auto", "In autobus"] },
      { q: "Che tempo fa stamattina?", cats: ["Sole", "Nuvole", "Pioggia"] },
      { q: "Che cosa ti piace fare in cortile?", cats: ["Correre", "Il pallone", "Disegnare"] },
      { q: "Quale frutto ti piace di più?", cats: ["La mela", "La banana", "L’uva"] }
    ],
    nl: [
      { q: "Hoe ben je vandaag naar school gekomen?", cats: ["Met de fiets", "Lopend", "Met de auto"] },
      { q: "Welk fruit eet je het liefst?", cats: ["Appel", "Banaan", "Peer"] },
      { q: "Wat voor weer is het buiten?", cats: ["Zon", "Wolken", "Regen"] },
      { q: "Wat doe je het liefst in de pauze?", cats: ["Rennen", "Voetballen", "Klimmen"] }
    ],
    sv: [
      { q: "Hur tog du dig till skolan i dag?", cats: ["Gick", "Cyklade", "Åkte buss"] },
      { q: "Vad tycker du bäst om till mellanmål?", cats: ["Frukt", "Smörgås", "Yoghurt"] },
      { q: "Hur är vädret ute i dag?", cats: ["Sol", "Moln", "Regn"] },
      { q: "Vad gör du helst på rasten?", cats: ["Springer", "Gungar", "Spelar boll"] }
    ],
    da: [
      { q: "Hvordan kom du i skole i dag?", cats: ["Gik", "På cykel", "I bil"] },
      { q: "Hvilken frugt kan du bedst lide?", cats: ["Æble", "Banan", "Pære"] },
      { q: "Hvordan er vejret udenfor i dag?", cats: ["Sol", "Skyer", "Regn"] },
      { q: "Hvad har du med i madpakken i dag?", cats: ["Rugbrød", "Frugt", "Grønt"] }
    ],
    no: [
      { q: "Hvordan kom du deg til skolen i dag?", cats: ["Gikk", "Syklet", "Kjørte bil"] },
      { q: "Hvilken frukt liker du best?", cats: ["Eple", "Banan", "Pære"] },
      { q: "Hvordan er været ute i dag?", cats: ["Sol", "Skyer", "Regn"] },
      { q: "Hva har du i matpakka i dag?", cats: ["Brødskive", "Frukt", "Grønnsaker"] }
    ],
    fi: [
      { q: "Miten tulit kouluun tänään?", cats: ["Kävellen", "Pyörällä", "Autolla"] },
      { q: "Mikä hedelmä on sinusta paras?", cats: ["Omena", "Banaani", "Päärynä"] },
      { q: "Millainen sää ulkona on tänään?", cats: ["Aurinkoista", "Pilvistä", "Sateista"] },
      { q: "Mitä juot koulussa ruoan kanssa?", cats: ["Maitoa", "Vettä", "Piimää"] }
    ]
  },

  STORE_KEY: 'lcs:class-graph:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { pop: true },
  settings: [
    { key: 'pop', type: 'toggle', labelKey: 'setStamp' }
  ],

  premium: false,
  premiumKnown: false,

  /* 1.MD.C.4 is literally "up to three categories", which is where the
     free line sits; more than three is the extension. */
  FREE_CATS: 3,
  MAX_CATS: 6,
  MIN_CATS: 2,
  MAX_LABEL: 18,
  MAX_QUESTION: 70,
  /* beyond this a column is taller than any classroom screen; the stamp
     shrinks instead (the calendar-wall density ladder) */
  DENSE_AT: 12,
  VERY_DENSE_AT: 18,

  /* ⚠ NEVER VERDICT COLOURS. choral-counting.js:106 states the rule for
     the whole platform — "never verdict colors" — because a category
     tinted red reads as the wrong answer and a green one as the right
     one, and this tool has no right answer. So no red and no green: the
     first four are wodb.js:89's Direction A set, the last two extend it
     in the same register. Hue is never the only differentiator either
     (graph-it-activity.js:29 "distinguished by SHAPE + LABEL, never hue
     alone") — every column carries the answer's own words beneath it.
     ⚠ CORAL #F2784B IS DELIBERATELY ABSENT even though wodb.js:89 uses
     it as a category colour: in THIS tool coral is already the locked
     affordance and the gate banner, so a category wearing it would read
     as something the teacher has to pay for. */
  COLOURS: ['#146B5E', '#F2C879', '#6B4C9A', '#3E7CB1', '#9C6B43', '#C2569B'],

  /* =================================================================
     THE MODEL — a question, some answers, and a list of taps.
     Votes are stored as an ORDERED LIST OF CATEGORY INDICES, not as
     counts, so "one tap = one vote" and "undo removes exactly one" are
     both true by construction rather than by arithmetic.
     ================================================================= */
  newState: function () {
    return { question: '', cats: [], votes: [], mode: 'pile', revealed: false };
  },

  setSetup: function (st, question, labels) {
    var next = this._clone(st);
    next.question = this.cleanText(question, this.MAX_QUESTION);
    next.cats = [];
    var seen = {}, i;
    for (i = 0; i < labels.length && next.cats.length < this.MAX_CATS; i++) {
      var lab = this.cleanText(labels[i], this.MAX_LABEL);
      /* an empty or duplicate answer would give the class two identical
         columns to choose between */
      if (!lab || Object.prototype.hasOwnProperty.call(seen, lab.toLowerCase())) continue;
      seen[lab.toLowerCase()] = 1;
      next.cats.push({ label: lab, colour: this.COLOURS[next.cats.length % this.COLOURS.length] });
    }
    /* a new question starts with no votes — the old class's answers must
       never carry over onto a different question */
    next.votes = [];
    next.mode = 'pile';
    next.revealed = false;
    return next;
  },

  /* ⚠ PURE and TOTAL. Collapses whitespace, caps the length, and never
     throws — the teacher types this. */
  cleanText: function (s, max) {
    if (s == null) return '';
    var t = String(s).replace(/\s+/g, ' ').trim();
    if (typeof max === 'number' && t.length > max) t = t.slice(0, max).trim();
    return t;
  },

  vote: function (st, catIndex) {
    var next = this._clone(st);
    if (!(catIndex >= 0 && catIndex < next.cats.length)) return next;
    next.votes.push(catIndex);
    return next;
  },

  undo: function (st) {
    var next = this._clone(st);
    next.votes.pop();
    return next;
  },

  clearVotes: function (st) {
    var next = this._clone(st);
    next.votes = [];
    next.revealed = false;
    return next;
  },

  /* ⚠ THE VIEW CANNOT WRITE TO THE DATA. Switching representation only
     ever touches `mode`; counts are derived. That is what makes "is it
     still the same?" answerable with yes. */
  setMode: function (st, mode) {
    var next = this._clone(st);
    if (mode !== 'pile' && mode !== 'bar') return next;
    next.mode = mode;
    return next;
  },

  setRevealed: function (st, on) {
    var next = this._clone(st);
    next.revealed = !!on;
    return next;
  },

  /* derived, never stored */
  counts: function (st) {
    var out = [], i;
    if (!st || !st.cats) return out;
    for (i = 0; i < st.cats.length; i++) out.push(0);
    for (i = 0; i < st.votes.length; i++) {
      var c = st.votes[i];
      if (c >= 0 && c < out.length) out[c]++;
    }
    return out;
  },
  total: function (st) { return st && st.votes ? st.votes.length : 0; },

  /* ⚠ NO RANKING ANYWHERE. There is deliberately no `most()`, no
     `winner()`, no sort. A class survey is a portrait, not a contest. */

  _clone: function (st) {
    return {
      question: st.question,
      cats: st.cats.map(function (c) { return { label: c.label, colour: c.colour }; }),
      votes: st.votes.slice(),
      mode: st.mode,
      revealed: st.revealed
    };
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectClassGraphCSS();
    document.body.classList.add('cgr-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    var s0 = this.starterAt(0);
    this.st = this.setSetup(this.newState(), s0.q, s0.cats);
    this._editing = false;
    this._timers = [];
    this._fetchEntitlement();
    this.render();
  },

  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },

  reset: function () {
    var s0 = this.starterAt(0);
    this.st = this.setSetup(this.newState(), s0.q, s0.cats);
    this._editing = false;
    this.render();
  },

  destroy: function () {
    this._clearTimers();
    try { document.body.classList.remove('cgr-wide'); } catch (_) {}
  },

  starterAt: function (i) {
    var pool = this.starters[this.api ? this.api.lang : 'en'] || this.starters.en;
    if (!pool || !pool.length) return { q: '', cats: [] };
    return pool[((i % pool.length) + pool.length) % pool.length];
  },

  /* the identical helper 13 other tools use */
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },
  _clearTimers: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
  },

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

  catCap: function () { return (this.premium || !this.premiumKnown) ? this.MAX_CATS : this.FREE_CATS; },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'cgr-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildQuestion());
    wrap.appendChild(this._buildBoard());
    /* the true opening state, and the one every session starts in */
    if (!this.total(this.st)) {
      var empty = api.el('div', 'cgr-note');
      empty.textContent = api.t('emptyNote');
      wrap.appendChild(empty);
    }
    wrap.appendChild(this._buildVoteRow());
    wrap.appendChild(this._buildBar());
    if (this._editing) wrap.appendChild(this._buildEditor());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
  },

  _chip: function (label, on, fn, extra) {
    var b = this.api.el('button', 'cgr-chip' + (on ? ' cgr-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  _buildQuestion: function () {
    var api = this.api;
    var box = api.el('div', 'cgr-qbox');
    var q = api.el('h2', 'cgr-question');
    /* ⚠ textContent — the teacher typed this */
    q.textContent = this.st.question;
    box.appendChild(q);
    return box;
  },

  /* the chart: one column per answer, each a stack of child-stamps with
     the real bar hidden inside the same wrapper */
  _buildBoard: function () {
    var api = this.api, self = this;
    var board = api.el('div', 'cgr-board');
    board.setAttribute('role', 'group');
    board.setAttribute('aria-label', api.t('askLabel'));
    var counts = this.counts(this.st);
    var maxN = counts.reduce(function (a, b) { return Math.max(a, b); }, 0);
    /* the calendar-wall density ladder: shrink the stamp rather than let
       a column run off a classroom screen */
    /* the density ladder lives on the BOARD, because --cgr-unit drives the
       stamp AND the ground ruling together */
    var dens = maxN >= this.VERY_DENSE_AT ? 'cgr-vdense' : maxN >= this.DENSE_AT ? 'cgr-dense' : '';
    if (dens) board.classList.add(dens);

    this.st.cats.forEach(function (cat, ci) {
      var col = api.el('div', 'cgr-col');
      var stackWrap = api.el('div', 'cgr-stackwrap');

      var stack = api.el('div', 'cgr-stack' + (self.st.mode === 'bar' ? ' cgr-asbar' : ''));
      stack.setAttribute('data-cat', String(ci));
      var n = counts[ci];
      for (var i = 0; i < n; i++) {
        var st = api.el('span', 'cgr-stamp');
        st.style.color = cat.colour;
        st.innerHTML = self.STAMP_SVG;
        /* the newest stamp pops; the rest are already settled */
        if (i === n - 1 && self._justVoted === ci && self.api.settings.pop && !self._reducedMotion()) {
          st.classList.add('cgr-pop');
        }
        stack.appendChild(st);
      }
      /* ⚠ THE BAR IS REAL DOM, ALWAYS PRESENT, INSIDE THE SAME WRAPPER.
         Its height is never computed — position:absolute inset:0 makes
         the layout answer, so it is exactly the pile. Measured 0px. */
      var bar = api.el('span', 'cgr-bar');
      bar.style.background = cat.colour;
      bar.setAttribute('aria-hidden', 'true');
      stack.appendChild(bar);

      stackWrap.appendChild(stack);
      col.appendChild(stackWrap);
      /* the plinth: the axis segment this column stands on */
      var base = api.el('div', 'cgr-base');
      col.appendChild(base);

      /* ⚠ THE NUMERAL CURTAIN. Before the reveal the count is absent from
         the DOM and from aria — not hidden with CSS, absent. */
      if (self.st.revealed) {
        var num = api.el('div', 'cgr-count');
        num.textContent = String(n);
        base.appendChild(num);
      }

      var lab = api.el('div', 'cgr-catlabel');
      lab.textContent = cat.label;
      base.appendChild(lab);
      board.appendChild(col);
    });
    this._justVoted = null;

    return board;
  },

  /* the children's row — one button per answer */
  _buildVoteRow: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'cgr-voterow');
    this.st.cats.forEach(function (cat, ci) {
      var b = api.el('button', 'cgr-vote');
      b.type = 'button';
      b.style.borderColor = cat.colour;
      var dot = api.el('span', 'cgr-dot');
      dot.style.background = cat.colour;
      var t = api.el('span', 'cgr-votelabel');
      t.textContent = cat.label;
      b.append(dot, t);
      b.setAttribute('aria-label', self.fmt('tapToVote', { label: cat.label }));
      b.addEventListener('click', function () {
        self.st = self.vote(self.st, ci);
        self._justVoted = ci;
        self.render();
      });
      row.appendChild(b);
    });
    if (this.st.cats.length) {
      var hint = api.el('div', 'cgr-hint');
      hint.textContent = api.t('voteHint');
      row.appendChild(hint);
    }
    return row;
  },

  fmt: function (key, vars) {
    var s = this.api.t(key);
    for (var k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  },

  _buildBar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'cgr-toolbar');
    var isBar = this.st.mode === 'bar';
    /* the two representations, as a pair of chips so neither reads as
       the "answer" the other was leading up to */
    bar.appendChild(this._chip(api.t('asPictures'), !isBar, function () {
      self.st = self.setMode(self.st, 'pile');
      self.render();
    }));
    bar.appendChild(this._chip(api.t('asBars'), isBar, function () {
      self.st = self.setMode(self.st, 'bar');
      self.render();
    }));
    var sep = api.el('span', 'cgr-sep');
    bar.appendChild(sep);
    bar.appendChild(this._chip(api.t(this.st.revealed ? 'hideCounts' : 'showCounts'), this.st.revealed, function () {
      self.st = self.setRevealed(self.st, !self.st.revealed);
      self.render();
    }));
    if (this.total(this.st)) {
      bar.appendChild(this._chip(api.t('undo'), false, function () {
        self.st = self.undo(self.st);
        self.render();
      }));
    }
    bar.appendChild(this._chip(api.t('editQuestion'), this._editing, function () {
      self._editing = !self._editing;
      self.render();
    }));
    return bar;
  },

  _buildEditor: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'cgr-editor');
    var qlab = api.el('label', 'cgr-lab');
    qlab.textContent = api.t('questionHint');
    qlab.setAttribute('for', 'cgr-q');
    var qin = document.createElement('input');
    qin.type = 'text'; qin.className = 'cgr-input'; qin.id = 'cgr-q';
    qin.maxLength = this.MAX_QUESTION;
    qin.value = this.st.question;
    box.append(qlab, qin);

    var clab = api.el('div', 'cgr-lab');
    clab.textContent = api.t('catsHint');
    box.appendChild(clab);

    var cap = this.catCap();
    var rows = api.el('div', 'cgr-catrows');
    var draft = this.st.cats.map(function (c) { return c.label; });
    if (draft.length < this.MIN_CATS) while (draft.length < this.MIN_CATS) draft.push('');
    var inputs = [];
    draft.forEach(function (lab, i) {
      var r = api.el('div', 'cgr-catrow');
      var sw = api.el('span', 'cgr-swatch');
      sw.style.background = self.COLOURS[i % self.COLOURS.length];
      var inp = document.createElement('input');
      inp.type = 'text'; inp.className = 'cgr-input cgr-catinput';
      inp.maxLength = self.MAX_LABEL;
      inp.value = lab;
      inp.setAttribute('aria-label', api.t('catsHint'));
      inputs.push(inp);
      r.append(sw, inp);
      if (draft.length > self.MIN_CATS) {
        r.appendChild(self._chip(api.t('removeCat'), false, function () {
          var vals = inputs.map(function (x) { return x.value; });
          vals.splice(i, 1);
          self.st = self.setSetup(self.st, qin.value, vals);
          self.render();
        }, 'cgr-tiny-chip'));
      }
      rows.appendChild(r);
    });
    box.appendChild(rows);

    if (draft.length < cap) {
      box.appendChild(this._chip(api.t('addCat'), false, function () {
        var vals = inputs.map(function (x) { return x.value; });
        vals.push('');
        self.st = self.setSetup(self.st, qin.value, vals);
        self._editing = true;
        self.render();
      }));
    } else if (draft.length < this.MAX_CATS) {
      /* the free cap, not the real one */
      box.appendChild(this._chip(api.t('addCat'), false, function () {
        self._gateInline(box, 'gateCats');
      }, 'cgr-locked'));
    }

    var apply = function () {
      var vals = inputs.map(function (x) { return x.value; });
      if (self.cleanText(vals[0], self.MAX_LABEL) === '' && self.cleanText(vals[1], self.MAX_LABEL) === '') return;
      self.st = self.setSetup(self.st, qin.value, vals);
      self._editing = false;
      self.render();
    };
    qin.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); apply(); } });
    inputs.forEach(function (x) {
      x.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); apply(); } });
    });
    box.appendChild(this._chip(api.t('useSetup'), false, apply));

    var sl = api.el('div', 'cgr-lab');
    sl.textContent = api.t('starterLabel');
    box.appendChild(sl);
    var srow = api.el('div', 'cgr-starters');
    (this.starters[this.api.lang] || this.starters.en).forEach(function (s) {
      srow.appendChild(self._chip(s.q, false, function () {
        self.st = self.setSetup(self.st, s.q, s.cats);
        self._editing = false;
        self.render();
      }, 'cgr-starter'));
    });
    box.appendChild(srow);
    return box;
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'cgr-foot');
    foot.appendChild(this._chip(api.t('clear'), false, function () { self.reset(); }));
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'cgr-locked');
    foot.appendChild(pr);
    var pv = api.el('div', 'cgr-privacy');
    pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.cgr-gate');
    if (old) old.remove();
    var g = api.el('div', 'cgr-gate');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-class-graph';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  },

  /* one child, drawn once, tinted per answer. currentColor so a single
     path serves every column. */
  /* ⚠ the head and the shoulders must OVERLAP. Drawn apart they read as a
     dot above a hill, and the whole point is that a child can see this is
     a person — one person, theirs. Both are currentColor, so any overlap
     merges into a single silhouette. */
  STAMP_SVG: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
    + '<circle cx="12" cy="6.4" r="4.1" fill="currentColor"/>'
    + '<path d="M3.6 21.6c0-6.6 3.8-11.4 8.4-11.4s8.4 4.8 8.4 11.4z" fill="currentColor"/>'
    + '</svg>'
};

function injectClassGraphCSS() {
  if (document.getElementById('cgr-style')) return;
  var st = document.createElement('style');
  st.id = 'cgr-style';
  st.textContent = ''
    + '.cgr-wrap{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;}'
    + '.cgr-qbox{width:min(100%,860px);text-align:center;}'
    + '.cgr-question{margin:0;font-family:var(--lcs-font-display),"Baloo 2",Nunito,system-ui,sans-serif;'
    +   'font-weight:700;font-size:clamp(19px,3.4vmin,30px);line-height:1.2;color:#146B5E;'
    +   'overflow-wrap:anywhere;}'
    /* the chart. column-reverse so a column grows UPWARD from a shared
       baseline, the calendar-wall .cwl-chart shape. */
    /* ONE unit for the stamp, the ruling and the ladder. A child has to
       read as a child from the back of the room, so it scales with the
       viewport and then steps down only when a column gets tall. */
    + '.cgr-board{--cgr-unit:clamp(26px,4.4vmin,44px);'
    +   'display:flex;justify-content:center;align-items:flex-end;'
    +   'gap:clamp(8px,2.2vmin,26px);width:min(100%,860px);min-height:150px;padding:10px 8px 0;'
    /* the ruling is one line per STAMP, so the pictograph's rows are
       already the bar's units — calendar-wall.js:1569. --cgr-unit is set
       from the density class so the two never drift apart. */
    +   'background-image:repeating-linear-gradient(to top,transparent 0 calc(var(--cgr-unit) - 1px),'
    +     'rgba(20,107,94,.07) calc(var(--cgr-unit) - 1px) var(--cgr-unit));'
    +   '}'
    + '.cgr-board.cgr-dense{--cgr-unit:clamp(19px,3.1vmin,30px);}'
    + '.cgr-board.cgr-vdense{--cgr-unit:clamp(15px,2.3vmin,22px);}'
    + '.cgr-col{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;'
    +   'min-width:calc(var(--cgr-unit) * 2);}'
    + '.cgr-base{width:100%;display:flex;flex-direction:column;align-items:center;gap:3px;'
    +   'border-top:2.5px solid rgba(20,107,94,.28);padding-top:5px;}'
    + '.cgr-stackwrap{display:flex;align-items:flex-end;}'
    /* ⚠ position:relative + the absolutely-placed bar is the honesty
       guarantee: the bar cannot be a different height from the pile. */
    + '.cgr-stack{position:relative;display:flex;flex-direction:column-reverse;align-items:center;}'
    + '.cgr-stamp{width:var(--cgr-unit);height:var(--cgr-unit);display:block;'
    +   'transition:opacity .3s var(--lcs-ease);}'
    + '.cgr-stamp svg{width:100%;height:100%;display:block;}'
    + '.cgr-bar{position:absolute;inset:0;border-radius:6px 6px 0 0;opacity:0;'
    +   'transition:opacity .3s var(--lcs-ease);pointer-events:none;}'
    + '.cgr-asbar .cgr-stamp{opacity:0;}'
    + '.cgr-asbar .cgr-bar{opacity:1;}'
    /* each stamp fades a beat after the one below, so the class sees the
       pile JOIN the bar rather than dissolve into it */
    + '.cgr-stamp:nth-child(2){transition-delay:.02s;}'
    + '.cgr-stamp:nth-child(3){transition-delay:.04s;}'
    + '.cgr-stamp:nth-child(4){transition-delay:.06s;}'
    + '.cgr-stamp:nth-child(5){transition-delay:.08s;}'
    + '.cgr-stamp:nth-child(6){transition-delay:.1s;}'
    + '@keyframes cgrPop{0%{transform:scale(.2);}100%{transform:scale(1);}}'
    + '.cgr-pop{animation:cgrPop .18s var(--lcs-ease);}'
    + '.cgr-count{font-family:var(--lcs-font-display),"Baloo 2",Nunito,system-ui,sans-serif;'
    +   'font-weight:700;font-size:19px;color:#2B2118;}'
    + '.cgr-catlabel{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;'
    +   'text-align:center;max-width:96px;overflow-wrap:anywhere;line-height:1.2;}'
    + '.cgr-note{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#8A6A4B;align-self:center;}'
    /* the children s row */
    + '.cgr-voterow{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;'
    +   'width:min(100%,860px);}'
    + '.cgr-vote{display:flex;align-items:center;gap:8px;min-height:48px;padding:9px 16px;'
    +   'border-radius:999px;border:2.5px solid rgba(20,107,94,.3);background:#FFFDF7;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:16px;color:#2B2118;cursor:pointer;}'
    + '.cgr-vote:hover{background:#F3EADA;}'
    + '.cgr-dot{width:16px;height:16px;border-radius:50%;flex:none;}'
    + '.cgr-votelabel{overflow-wrap:anywhere;}'
    + '.cgr-hint{width:100%;text-align:center;font-family:Nunito,system-ui,sans-serif;'
    +   'font-size:14px;color:#8A6A4B;}'
    + '.cgr-toolbar{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;align-items:center;}'
    + '.cgr-sep{width:1px;height:26px;background:rgba(20,107,94,.22);margin:0 3px;}'
    + '.cgr-chip{min-height:44px;padding:8px 14px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.cgr-chip:hover{background:#F3EADA;}'
    + '.cgr-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E;}'
    + '.cgr-locked{border-style:dashed;color:#F2784B;border-color:rgba(242,120,75,.5);}'
    + '.cgr-editor{display:flex;flex-direction:column;gap:8px;align-items:center;'
    +   'width:min(100%,640px);padding:12px;border-radius:16px;background:rgba(20,107,94,.06);}'
    + '.cgr-lab{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;align-self:flex-start;}'
    + '.cgr-input{width:100%;min-height:44px;padding:9px 12px;border-radius:12px;'
    +   'border:1.5px solid rgba(20,107,94,.3);background:#FFFDF7;color:#2B2118;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:16px;box-sizing:border-box;}'
    + '.cgr-catrows{display:flex;flex-direction:column;gap:7px;width:100%;}'
    + '.cgr-catrow{display:flex;align-items:center;gap:8px;width:100%;}'
    + '.cgr-swatch{width:18px;height:18px;border-radius:5px;flex:none;}'
    + '.cgr-catinput{flex:1;}'
    + '.cgr-tiny-chip{min-height:44px;padding:6px 10px;font-size:14px;flex:none;}'
    + '.cgr-starters{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}'
    + '.cgr-starter{font-size:14px;padding:7px 11px;}'
    + '.cgr-foot{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;align-items:center;}'
    + '.cgr-privacy{width:100%;text-align:center;font-family:Nunito,system-ui,sans-serif;'
    +   'font-size:14px;color:#6B6558;}'
    + '.cgr-gate{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#8A5A3B;'
    +   'background:rgba(242,120,75,.12);border-radius:12px;padding:8px 14px;margin:4px 0;}'
    + '.cgr-gate a{color:#146B5E;font-weight:700;}'
    + 'body.cgr-wide .lcs-header{flex-direction:column;}'
    + '@media (max-height:960px) and (min-width:768px){.cgr-question{font-size:clamp(19px,3vh,26px);}'
    +   '.cgr-wrap{gap:8px;}}'
    + '@media (max-width:700px){body.cgr-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'
    + '@media (max-width:420px){.cgr-chip{padding:7px 9px;font-size:14px;}.cgr-toolbar{gap:5px;}'
    +   '.cgr-wrap{gap:8px;}.cgr-sep{display:none;}.cgr-vote{padding:8px 12px;font-size:15px;}'
    +   '.cgr-board{gap:7px;min-height:120px;}.cgr-catlabel{font-size:14px;max-width:74px;}}'
    /* ⚠ REDUCED MOTION COMPRESSES, IT DOES NOT SKIP. The transformation
       IS the content here, so cutting it to nothing would cut the lesson
       out for the children who most need a steady one. estimation-jar
       does the same with its counted reveal (350ms instead of 700, never
       skipped); rekenrek.js:2124 calls it degrade-rather-than-delete. */
    + '@media (prefers-reduced-motion:reduce){'
    +   '.cgr-stamp,.cgr-bar{transition-duration:.12s;transition-delay:0s;}'
    +   '.cgr-pop{animation:none;}}'
    + '@media print{.cgr-toolbar,.cgr-voterow,.cgr-editor,.cgr-foot,.cgr-gate,.cgr-hint{display:none!important;}'
    +   '.cgr-board{border-bottom:2px solid #333;}}';
  document.head.appendChild(st);
}
