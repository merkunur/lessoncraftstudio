/* =====================================================================
   TOOL #33 — READING EASEL   (reading-easel.js)
   ---------------------------------------------------------------------
   Free-play teacher instrument (no `tasks` — the shell renders zero
   activity chrome). v3 catalog, build #4. The L1 entry.

   One line of text, projector-large. Tap the gap between two words to
   put a SCOOP boundary there. Then hear the line read two ways.

   THE ONE THESIS — A CHILD READING WORD-BY-WORD HAS DECODED BUT HAS NOT
   READ. The move that fixes it is phrase-cued text: mark the sentence
   into meaning groups and read the groups, not the words. Teachers do
   this on a whiteboard with a marker. Nothing digital does it, and
   nothing does it with a voice.

   ⚠ THE MARKET TIMES CHILDREN AND WE NEVER WILL. Fluency is the one
   strand the whole market gamifies — words per minute, a stopwatch, a
   score. That is the part of fluency that is not reading. This tool has
   no timer, no rate meter, no count of any kind, and it never will.
   Phrasing is the part of fluency worth teaching, and it is not speed.

   THREE INVENTIONS:
     1. THE SCOOPS ALWAYS PARTITION THE LINE, STRUCTURALLY. The model is
        a set of BOUNDARY indices, never a list of free-floating scoops.
        Every word therefore belongs to exactly one group; overlaps and
        gaps are UNREPRESENTABLE rather than merely prevented.
     2. TWO READINGS OF THE SAME WORDS. Robot = a separator between every
        word. Scooped = a separator only at your boundaries. Both are ONE
        utterance; the pauses are the synthesiser's own prosodic breaks.
        MEASURED (scripts/_probe-tts-phrasing.js, en + sv): robot runs
        1.68-1.76x the plain line, scooped only 1.14-1.17x — a ~1.4s gap
        on a six-word line. The difference is unmistakably audible.
        ⚠ THE INVARIANT THAT KEEPS IT HONEST: strip the separators and
        both strings are the line, verbatim. Same words, new grouping.
     3. SCOOP BY SCOOP, ON THE TEACHER'S TAP. One group per tap, lit as
        it speaks. Exact audio/visual sync BY CONSTRUCTION — no timers.

   WHY NO TIMERS ANYWHERE (this is forced, not preferred): LCSAudio has
   no end event (story-line.js:637 says so in a comment) AND speak()
   calls cancel() as its first act (lcs-shell.js:250), so any timed
   sequence gets cut off mid-word. A guessed timer is exactly the wrong
   mechanism for a phrasing tool. Hence: one utterance per reading, and
   taps for the step-through.

   ⚠ NO VOICE MEANS NO CONTENT. LCSAudio never calls getVoices(); it
   sets u.lang and hopes, and a missing voice is SILENTLY SUBSTITUTED —
   a Finnish line read with German phonology. Measured on this build
   machine: 7 voices, en + sv only; nine locales silent. So hasVoice()
   is copied from home-language-bridge.js:214-224 and the line is SHOWN
   but never spoken when the device cannot say it. Worse than silence is
   a wrong model.

   FENCES — activity fence checked BEFORE a line was written:
     mending-basket.mend-page   RF.1.4.a — the ONLY RF.*.4 activity on
     .rf-1-4-a                  the platform, and it is SILENT
                                comprehension-monitoring, not oral
                                reading. RF.1.4.b/c + RF.2.4.b/c (oral
                                reading, rate, expression, rereading)
                                have zero activities and zero tools.
     cleo-packing-list L.1.2.b  the four punctuation activities are all
     wally-capital-crane L.2.2.a  SILENT tap-a-card; two say "no audio
     pim-comma-mail L.2.2.b     dependency" in their own headers. No
     contraction L.2.2.c        end-punctuation activity exists at all.
   ADJACENCIES (checked, none is an overlap): syllable-splitter #22 owns
   arc-under-text but at SYLLABLE level inside ONE word, tap-driven —
   this scoop spans WORDS, so the class reads it as a bigger Silbenbogen,
   which is a feature. story-line #10 owns a travelling spotlight, but
   over illustrated CARDS. heart-words #21 owns the only sentence-level
   TTS — precedent, not competition. `onboundary` appears nowhere on the
   platform: speech has never been synchronised to text here.

   ⚠ THE EASEL FAMILY IS DELIBERATE. number-talk-easel #8 already holds
   "Easel" and is one of the five tools the operator named as the bar.
   The family means: a teacher-controlled whole-class display that
   WITHHOLDS THE ANSWER. That easel puts a curtain over a quantity; this
   one puts a scoop under a line.

   REFUSES, FOREVER: no timer, no words-per-minute, no stopwatch — the
   tool never times a child · it never marks a scoop right or wrong,
   because where the scoop goes is genuinely arguable and that argument
   IS the lesson · it never proposes where the scoops belong, not even
   at the commas — the class discovers that by ear · no score, no
   streak, no celebration.
   ===================================================================== */
var ReadingEasel = {
  id: 'reading-easel',

  /* ⚠ CURATION: en authored; the other ten come from the per-locale
     native 3-agent ensembles (§A.13.48), never machine-translated.
     [NSR-FLAG] sv/da/no/fi. pt Brazilian per §6. */
  strings: {
    title:        { en: "Reading Easel", de: "Sinnschritt-Tafel", fr: "Lire par groupes de mots", es: "Leer por grupos de palabras", pt: "Ler por grupos de palavras", it: "Leggere a gruppi di parole", nl: "Leesboogjes", sv: "Läsbågar", da: "Sætningsbuer", no: "Lesebuer", fi: "Lukukaaret" },
    instruction:  { en: "Tap between two words to scoop them together. Then hear the line both ways.", de: "Tippe zwischen zwei Wörter, dann fasst ein Bogen sie zusammen. Danach hört ihr die Zeile auf beide Arten.", fr: "Appuyez entre deux mots pour les regrouper sous un arc, puis écoutez la phrase des deux façons.", es: "Toca entre dos palabras para unirlas bajo un arco, y después escucha la oración de las dos maneras.", pt: "Toque entre duas palavras para juntá-las embaixo de um arco, depois ouça a frase dos dois jeitos.", it: "Tocca fra due parole per unirle sotto un arco, poi ascolta la frase nei due modi.", nl: "Tik tussen twee woorden, dan komen ze samen onder één boogje. Daarna hoor je de zin op twee manieren.", sv: "Tryck mellan två ord, så samlas de under en båge. Sedan får ni höra raden på båda sätten.", da: "Tryk mellem to ord for at samle dem i en bue. Hør så linjen på begge måder.", no: "Trykk mellom to ord for å samle dem i en bue. Hør så linja på begge måter.", fi: "Napauta kahden sanan väliä, niin ne yhdistyvät samaan kaareen. Kuunnelkaa lause sitten molemmilla tavoilla." },
    readRobot:    { en: "Read it like a robot", de: "Wie ein Roboter", fr: "Comme un robot", es: "Como robot", pt: "Como um robô", it: "Come un robot", nl: "Als een robot", sv: "Som en robot", da: "Læs som en robot", no: "Les som en robot", fi: "Lue robottina" },
    readScooped:  { en: "Read it in scoops", de: "In Bögen lesen", fr: "Par groupes", es: "Por grupos", pt: "Por grupos", it: "A gruppi", nl: "Met boogjes", sv: "Med bågar", da: "Læs i buer", no: "Les i buer", fi: "Lue kaarissa" },
    stepScoop:    { en: "Scoop by scoop", de: "Bogen für Bogen", fr: "Groupe par groupe", es: "Grupo por grupo", pt: "Grupo por grupo", it: "Gruppo per gruppo", nl: "Boogje voor boogje", sv: "Båge för båge", da: "Bue for bue", no: "Bue for bue", fi: "Kaari kerrallaan" },
    nextScoop:    { en: "Next scoop", de: "Nächster Bogen", fr: "Groupe suivant", es: "Siguiente grupo", pt: "Próximo grupo", it: "Prossimo gruppo", nl: "Volgend boogje", sv: "Nästa båge", da: "Næste bue", no: "Neste bue", fi: "Seuraava kaari" },
    clearScoops:  { en: "Take the scoops off", de: "Bögen entfernen", fr: "Enlever les arcs", es: "Quitar los arcos", pt: "Tirar os arcos", it: "Togliere gli archi", nl: "Boogjes weghalen", sv: "Ta bort bågarna", da: "Fjern buerne", no: "Ta bort buene", fi: "Poista kaaret" },
    changeLine:   { en: "Change the line", de: "Zeile ändern", fr: "Changer de phrase", es: "Cambiar la oración", pt: "Trocar a frase", it: "Cambiare frase", nl: "Andere zin", sv: "Byt rad", da: "Skift linje", no: "Bytt linje", fi: "Vaihda lause" },
    lineLabel:    { en: "The line", de: "Die Zeile", fr: "La phrase", es: "La oración", pt: "A frase", it: "La frase", nl: "De zin", sv: "Raden", da: "Linjen", no: "Linja", fi: "Lause" },
    typeHint:     { en: "Type a line for the class", de: "Schreib eine Zeile für die Klasse", fr: "Écrivez une phrase pour la classe", es: "Escribe una oración para la clase", pt: "Escreva uma frase para a turma", it: "Scrivi una frase per la classe", nl: "Typ een zin voor de klas", sv: "Skriv en rad till klassen", da: "Skriv en linje til klassen", no: "Skriv en linje til klassen", fi: "Kirjoita luokalle oma lause" },
    useLine:      { en: "Put it on the easel", de: "Auf die Tafel legen", fr: "Afficher la phrase", es: "Ponerla en el pizarrón", pt: "Colocar na lousa", it: "Mettila sulla lavagna", nl: "Op het bord zetten", sv: "Sätt upp raden", da: "Sæt den på tavlen", no: "Sett den på tavla", fi: "Nosta se taululle" },
    starterLabel: { en: "Or start from one of these", de: "Oder nimm eine von diesen", fr: "Ou commencez par l’une de celles-ci", es: "O empieza con una de estas", pt: "Ou comece por uma destas", it: "Oppure parti da una di queste", nl: "Of begin met een van deze", sv: "Eller börja med någon av dessa", da: "Eller start med en af disse", no: "Eller start med en av disse", fi: "Tai valitse jokin näistä" },
    gapHint:      { en: "Tap between two words to scoop them together.", de: "Tippe zwischen zwei Wörter, dann fasst ein Bogen sie zusammen.", fr: "Appuyez entre deux mots pour les regrouper.", es: "Toca entre dos palabras para unirlas en un grupo.", pt: "Toque entre duas palavras para juntá-las em um grupo.", it: "Tocca fra due parole per unirle in un gruppo.", nl: "Tik tussen twee woorden, dan komen ze samen onder één boogje.", sv: "Tryck mellan två ord, så samlas de under en båge.", da: "Tryk mellem to ord for at samle dem i en bue.", no: "Trykk mellom to ord for å samle dem i en bue.", fi: "Napauta kahden sanan väliä, niin ne yhdistyvät samaan kaareen." },
    scoopHere:    { en: "Scoop between {a} and {b}", de: "Bogen zwischen {a} und {b}", fr: "Regrouper {a} et {b}", es: "Unir {a} y {b} en un grupo", pt: "Juntar {a} e {b} em um grupo", it: "Unire {a} e {b} in un gruppo", nl: "Boogje tussen {a} en {b}", sv: "Båge mellan {a} och {b}", da: "Sæt en bue mellem {a} og {b}", no: "Sett en bue mellom {a} og {b}", fi: "Tee kaari tähän väliin: {a} ja {b}" },
    voiceMissing: { en: "This device has no voice for this language, so the line is shown but not read.", de: "Dieses Gerät hat keine Stimme für diese Sprache. Die Zeile steht da, wird aber nicht vorgelesen.", fr: "Cet appareil n’a pas de voix dans cette langue : la phrase s’affiche, mais elle n’est pas lue.", es: "Este dispositivo no tiene voz en este idioma, así que la oración se muestra pero no se lee.", pt: "Este aparelho não tem voz para este idioma, então a frase aparece mas não é lida.", it: "Questo dispositivo non ha una voce per questa lingua: la frase si vede, ma non viene letta.", nl: "Dit apparaat heeft geen stem voor deze taal. De zin staat er wel, maar wordt niet voorgelezen.", sv: "Den här enheten har ingen röst för det här språket, så raden visas men läses inte upp.", da: "Denne enhed har ingen stemme til dette sprog, så linjen vises, men den bliver ikke læst op.", no: "Denne enheten har ingen stemme for dette språket, så linja vises, men den blir ikke lest opp.", fi: "Tässä laitteessa ei ole ääntä tälle kielelle, joten lause näkyy mutta sitä ei lueta ääneen." },
    gateLibrary:  { en: "The full line library is part of the Teacher plan.", de: "Die ganze Zeilensammlung gehört zum Lehrer-Paket.", fr: "La bibliothèque complète de phrases fait partie de l’offre Enseignant.", es: "La biblioteca completa de oraciones es parte del plan Docente.", pt: "A biblioteca completa de frases faz parte do plano Professor.", it: "La raccolta completa di frasi fa parte del piano Insegnante.", nl: "De hele zinnenbibliotheek hoort bij het Leerkracht-pakket.", sv: "Hela samlingen med rader ingår i Lärarpaketet.", da: "Hele linjebiblioteket er en del af Lærerpakken.", no: "Hele linjebiblioteket er en del av Lærerpakken.", fi: "Koko lausekirjasto kuuluu Opettaja-tilaukseen." },
    gatePrint:    { en: "Printing is part of the Teacher plan.", de: "Das Drucken gehört zum Lehrer-Paket.", fr: "L’impression fait partie de l’offre Enseignant.", es: "Imprimir es parte del plan Docente.", pt: "A impressão faz parte do plano Professor.", it: "La stampa fa parte del piano Insegnante.", nl: "Printen hoort bij het Leerkracht-pakket.", sv: "Utskrift ingår i Lärarpaketet.", da: "Udskrivning er en del af Lærerpakken.", no: "Utskrift er en del av Lærerpakken.", fi: "Tulostus kuuluu Opettaja-tilaukseen." },
    printBtn:     { en: "Print the scooped line", de: "Zeile mit Bögen drucken", fr: "Imprimer la phrase avec les arcs", es: "Imprimir la oración con arcos", pt: "Imprimir a frase com os arcos", it: "Stampa la frase con gli archi", nl: "Zin met boogjes printen", sv: "Skriv ut raden med bågar", da: "Udskriv linjen med buer", no: "Skriv ut linja med buer", fi: "Tulosta lause kaarineen" },
    unlock:       { en: "See the Teacher plan", de: "Lehrer-Paket ansehen", fr: "Voir l’offre Enseignant", es: "Ver el plan Docente", pt: "Conhecer o plano Professor", it: "Scopri il piano Insegnante", nl: "Bekijk het Leerkracht-pakket", sv: "Se Lärarpaketet", da: "Se Lærerpakken", no: "Se Lærerpakken", fi: "Katso Opettaja-tilaus" },
    privacyLine:  { en: "Nothing here is saved, counted or sent anywhere.", de: "Hier wird nichts gespeichert, gezählt oder weitergegeben.", fr: "Rien n’est enregistré, compté ni envoyé nulle part.", es: "Aquí nada se guarda, se cuenta ni se envía a ningún lado.", pt: "Aqui nada é salvo, contado nem enviado para lugar nenhum.", it: "Qui niente viene salvato, contato o inviato da qualche parte.", nl: "Hier wordt niets bewaard, geteld of doorgestuurd.", sv: "Ingenting här sparas, räknas eller skickas vidare.", da: "Intet her bliver gemt, talt eller sendt nogen steder hen.", no: "Ingenting her blir lagret, talt eller sendt noe sted.", fi: "Täällä ei tallenneta, lasketa eikä lähetetä mitään." },
    setVoice:     { en: "Read the line out loud", de: "Die Zeile vorlesen", fr: "Lire la phrase à voix haute", es: "Leer la oración en voz alta", pt: "Ler a frase em voz alta", it: "Leggere la frase ad alta voce", nl: "De zin hardop voorlezen", sv: "Läs upp raden", da: "Læs linjen højt", no: "Les linja høyt", fi: "Lue lause ääneen" },
    clear:        { en: "Start again", de: "Neu anfangen", fr: "Recommencer", es: "Empezar de nuevo", pt: "Começar de novo", it: "Ricominciare", nl: "Opnieuw beginnen", sv: "Börja om", da: "Start forfra", no: "Start på nytt", fi: "Aloita alusta" }
  },

  /* ⚠ Authored per locale by the native ensembles, NOT translated: each
     line must carry a real phrase boundary (a prepositional phrase, a
     comma) or there is nothing to scoop. heart-words-*.json was the
     obvious source and was REJECTED — it ships 10 locales, no fi. */
  starters: {
    en: [
      "The cat sat on my lap",
      "After lunch, we went outside",
      "My little brother can run very fast",
      "The old blue boat sailed away",
      "When it rains, the ducks are happy",
      "We keep our boots by the door",
      "The moon came up behind the hill",
      "Grandma made soup for all of us"
    ],
    de: [
      "Am Morgen läuft die Katze durch den Garten.",
      "Wenn es regnet, bleiben wir im Klassenzimmer.",
      "Mein kleiner Bruder isst sein Brot mit Honig.",
      "Nach dem Frühstück packe ich meine Tasche.",
      "Der Hund schläft unter dem Tisch in der Küche.",
      "Heute Nachmittag spielen wir draußen auf dem Hof.",
      "Meine Oma bringt uns Äpfel, Birnen und Nüsse.",
      "Der kleine Vogel sitzt still auf dem Ast."
    ],
    fr: [
      "Le chat dort sur le lit de maman.",
      "Ce matin, il y a du vent.",
      "Nous mangeons de la soupe dans la cuisine.",
      "Quand il pleut, on reste à la maison.",
      "Mon petit frère joue avec le ballon rouge.",
      "Les oiseaux chantent devant la fenêtre de l’école.",
      "Papa prépare le goûter avant de partir.",
      "Elle range ses crayons dans la boîte bleue."
    ],
    es: [
      "El perro duerme debajo de la mesa.",
      "En la mañana, tomamos leche con pan.",
      "Mi hermana juega con la pelota en el patio.",
      "Cuando llueve, nos quedamos en la casa.",
      "Guardo mis colores en la caja azul.",
      "Los pájaros cantan afuera de la ventana.",
      "Vamos a la escuela con mi mamá.",
      "Hoy comimos sopa de verduras en la cocina."
    ],
    pt: [
      "O gato dorme embaixo da mesa da cozinha.",
      "De manhã, tomamos leite com pão.",
      "Minha irmã brinca com a bola no quintal.",
      "Quando chove, ficamos dentro de casa.",
      "Guardo os lápis de cor na caixa azul.",
      "Os passarinhos cantam na janela da escola.",
      "Vamos para a escola com a minha mãe.",
      "Hoje comemos sopa de legumes no almoço."
    ],
    it: [
      "Il gatto dorme sul divano della nonna.",
      "Stamattina, c’è il sole in giardino.",
      "La mia amica gioca con la palla rossa.",
      "Quando piove, restiamo dentro a casa.",
      "Beviamo un bicchiere d’acqua prima di mangiare.",
      "Gli uccelli cantano sopra il tetto della scuola.",
      "Metto i colori dentro l’astuccio blu.",
      "Andiamo a scuola con la mia mamma."
    ],
    nl: [
      "In de ochtend loopt de poes door de tuin.",
      "Als het regent, blijven wij binnen spelen.",
      "Mijn kleine broertje eet zijn boterham met honing.",
      "Na het ontbijt pak ik mijn tas in.",
      "De hond slaapt onder de tafel in de keuken.",
      "Vanmiddag spelen wij buiten op het schoolplein.",
      "Oma brengt appels, peren en noten mee.",
      "Het kleine vogeltje zit stil op de tak."
    ],
    sv: [
      "På morgonen går katten ut i trädgården.",
      "När det regnar, stannar vi inne på rasten.",
      "Min lillebror äter sin smörgås med honung.",
      "Efter frukosten packar jag min väska.",
      "Hunden sover under bordet i köket.",
      "I eftermiddag leker vi ute på skolgården.",
      "Mormor tar med äpplen, päron och nötter.",
      "Den lilla fågeln sitter stilla på grenen."
    ],
    da: [
      "Om morgenen spiser vi havregryn i køkkenet.",
      "Katten sover i vindueskarmen, når solen skinner.",
      "Efter skole løber vi ned til den store legeplads.",
      "Min lillesøster tegner en blå fisk med kridt.",
      "Når det regner, tager vi gummistøvler på.",
      "Vi hænger vores våde jakker op i garderoben.",
      "Hunden ligger under bordet med sin gamle bold.",
      "I dag har vi æbler med til frokost."
    ],
    no: [
      "På vei til skolen møtte jeg naboens hund.",
      "Når vi spiser frokost, sitter katten under bordet.",
      "Bestemor baker boller i det store kjøkkenet.",
      "Etter friminuttet leser vi høyt for hverandre.",
      "Om kvelden, når det er mørkt, tenner vi lampa.",
      "Lillebror sover med bamsen sin under dyna.",
      "Vi henger de våte vottene på varmeovnen.",
      "I dag har vi eple og brød i matpakka."
    ],
    fi: [
      "Aamulla syömme puuroa keittiön pöydän ääressä.",
      "Kun sataa, puemme kumisaappaat jalkaan.",
      "Kissa nukkuu ikkunalaudalla auringon paisteessa.",
      "Välitunnin jälkeen luemme yhdessä isoja kirjoja.",
      "Iltaisin, kun on pimeää, luemme satua.",
      "Pikkuveli nukkuu nallen kanssa peiton alla.",
      "Ripustamme märät takit naulakkoon eteisessä.",
      "Tänään meillä on omenoita eväsrasiassa."
    ]
  },

  STORE_KEY: 'lcs:reading-easel:v1',
  ENT_TRUST_DAYS: 14,

  defaults: { voice: true },
  settings: [
    { key: 'voice', type: 'toggle', labelKey: 'setVoice' }
  ],

  premium: false,
  premiumKnown: false,

  /* how many starter lines a free teacher gets; the rest is the library */
  FREE_STARTERS: 3,
  /* a LINE, not a passage — beyond this there is nothing to scoop, only to scroll */
  MAX_WORDS: 14,
  /* the separator that becomes a pause. A comma is what every engine
     renders as a phrase break WITH a pitch contour, which is more
     pedagogically correct than a silent gap. */
  SEP: ', ',

  /* =================================================================
     THE MODEL — a line of words plus a set of BOUNDARIES.
     The scoops are DERIVED. Nothing here can represent an overlapping
     or a gapped scoop, which is why the gate can prove the partition
     exhaustively instead of testing for the absence of a bug.
     ================================================================= */
  newState: function () {
    return { words: [], breaks: [], step: -1 };
  },

  /* ⚠ PURE and TOTAL. Unicode-aware: apostrophes and hyphens keep a word
     together (l’ami, jack-in-the-box), everything else splits on
     whitespace and punctuation RIDES WITH its word, because the comma is
     the very thing the class is learning to hear. */
  tokenize: function (text) {
    if (text == null) return [];
    var raw = String(text).replace(/\s+/g, ' ').trim();
    if (!raw) return [];
    var parts = raw.split(' ');
    var out = [], i;
    for (i = 0; i < parts.length; i++) {
      if (parts[i]) out.push(parts[i]);
      if (out.length >= this.MAX_WORDS) break;
    }
    return out;
  },

  setLine: function (st, text) {
    var next = this._clone(st);
    next.words = this.tokenize(text);
    next.breaks = [];        /* a new line has no scoops on it */
    next.step = -1;
    return next;
  },

  /* a boundary sits AFTER word i, so it is only meaningful for
     0 <= i < words.length - 1 */
  toggleBreak: function (st, i) {
    var next = this._clone(st);
    if (!(i >= 0 && i < next.words.length - 1)) return next;
    var at = next.breaks.indexOf(i);
    if (at > -1) next.breaks.splice(at, 1); else next.breaks.push(i);
    next.breaks.sort(function (a, b) { return a - b; });
    next.step = -1;
    return next;
  },

  clearBreaks: function (st) {
    var next = this._clone(st);
    next.breaks = [];
    next.step = -1;
    return next;
  },

  /* ⚠ THE PARTITION. Derived, total, and by construction every word
     index appears in exactly one group, in order, with no gaps. */
  groups: function (st) {
    if (!st || !st.words || !st.words.length) return [];
    var out = [], cur = [], i;
    for (i = 0; i < st.words.length; i++) {
      cur.push(i);
      if (this.isBreak(st, i) && i < st.words.length - 1) { out.push(cur); cur = []; }
    }
    if (cur.length) out.push(cur);
    return out;
  },

  isBreak: function (st, i) { return !!st && st.breaks.indexOf(i) > -1; },

  groupTexts: function (st) {
    var self = this;
    return this.groups(st).map(function (g) {
      return g.map(function (i) { return st.words[i]; }).join(' ');
    });
    void self;
  },

  /* ⚠ THE READINGS ARE CHUNK LISTS FIRST, STRINGS SECOND. Keeping the
     chunks addressable is what lets the gate prove "same words, new
     grouping" by exact array comparison instead of by re-parsing a
     string — and re-parsing is exactly what broke: a line that already
     contains a comma is indistinguishable from one we punctuated. */
  robotChunks: function (st) { return (st && st.words ? st.words : []).slice(); },
  scoopedChunks: function (st) { return this.groupTexts(st); },

  /* punctuation that ALREADY asks for a pause. The teacher's comma is
     the very thing the class is learning to hear, so we must not double
     it — "lunch,, we" is both ugly and a worse prosodic cue than the
     comma the teacher already typed. */
  PAUSE_MARK: /[,;:.!?…—]$/,

  joinForSpeech: function (chunks) {
    var out = '', i;
    for (i = 0; i < chunks.length; i++) {
      if (i) out += this.PAUSE_MARK.test(chunks[i - 1]) ? ' ' : this.SEP;
      out += chunks[i];
    }
    return out;
  },

  robotText: function (st) { return this.joinForSpeech(this.robotChunks(st)); },
  scoopedText: function (st) { return this.joinForSpeech(this.scoopedChunks(st)); },
  plainText: function (st) {
    return (st && st.words ? st.words : []).join(' ');
  },

  /* ⚠ THE HONESTY CHECK: the same words in the same order, whatever the
     punctuation. Used by the gate and by the browser test, and it must
     treat OUR separator and the TEACHER's comma identically — otherwise
     the check quietly passes on lines that have no punctuation and
     quietly fails on the ones that do. */
  wordsOnly: function (s) {
    return String(s == null ? '' : s)
      .replace(/[,;:.!?…—]+/g, ' ').replace(/\s+/g, ' ').trim();
  },

  _clone: function (st) {
    return { words: st.words.slice(), breaks: st.breaks.slice(), step: st.step };
  },

  /* =================================================================
     VOICE — a reading tool with no voice has no content
     ================================================================= */
  _voices: function () {
    try { return (window.speechSynthesis && window.speechSynthesis.getVoices()) || []; }
    catch (_) { return []; }
  },
  /* ⚠ generalised from home-language-bridge.js:214-224. Permissive when
     the device reports NO voices at all — they load asynchronously, and
     muting a whole tool on a race would be worse. */
  hasVoice: function (lang, voices) {
    if (!voices || !voices.length) return true;
    var want = ({ no: 'nb', pt: 'pt' }[lang] || lang).toLowerCase();
    for (var i = 0; i < voices.length; i++) {
      if (String(voices[i].lang || '').toLowerCase().indexOf(want) === 0) return true;
    }
    if (lang === 'no') {
      for (var j = 0; j < voices.length; j++) {
        if (String(voices[j].lang || '').toLowerCase().indexOf('no') === 0) return true;
      }
    }
    return false;
  },
  _canSpeak: function () { return this.hasVoice(this.api.lang, this._voices()); },

  /* ⚠ type:'ui' on BOTH readings, deliberately. Today the audio
     inventory is empty so everything is TTS — but when recorded audio
     lands, type:'word' chunks would start hitting the FILE path, which
     has no queue and overlaps on concurrent plays. A separator-joined
     whole line never matches a slug, so 'ui' stays on TTS forever. */
  _sayRobot: function (st) {
    if (!this.api.settings.voice || !this._canSpeak()) return;
    var text = this.robotText(st);
    if (!text) return;
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.85 }); } catch (_) {}
    this.api.announce(this.plainText(st));
  },
  _sayScooped: function (st) {
    if (!this.api.settings.voice || !this._canSpeak()) return;
    var text = this.scoopedText(st);
    if (!text) return;
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
    this.api.announce(this.plainText(st));
  },
  _sayGroup: function (text) {
    if (!this.api.settings.voice || !this._canSpeak()) return;
    if (!text) return;
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.95 }); } catch (_) {}
    this.api.announce(text);
  },

  /* =================================================================
     LIFECYCLE
     ================================================================= */
  init: function (api) {
    this.api = api;
    injectReadingEaselCSS();
    document.body.classList.add('rde-wide');

    this._store = this._loadStore();
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    var ent = this._store.ent;
    if (ent && ent.tier) this.premium = ent.tier !== 'free';

    this.st = this.newState();
    this.st = this.setLine(this.st, this.starterAt(0));
    this._starter = 0;
    this._editing = false;
    this._timers = [];
    /* the first speak() awaits fetch('/audio/inventory.json'), so warm it
       now rather than making the first reading late (lcs-shell.js:200) */
    try { LCSAudio._loadInventory(); } catch (_) {}
    /* voices arrive asynchronously; repaint once they do so the 🔇
       affordance is not shown on a race */
    try {
      var self = this;
      if (window.speechSynthesis && 'onvoiceschanged' in window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = function () { self.render(); };
      }
    } catch (_) {}
    this._fetchEntitlement();
    this.render();
  },

  onSettings: function () { this._store.settings = this.api.settings; this._saveStore(); this.render(); },

  reset: function () {
    this.st = this.setLine(this.newState(), this.starterAt(this._starter));
    this._editing = false;
    this.render();
  },

  destroy: function () {
    this._clearTimers();
    try { document.body.classList.remove('rde-wide'); } catch (_) {}
    try { LCSAudio.cancel(); } catch (_) {}
  },

  starterAt: function (i) {
    var pool = this.starters[this.api ? this.api.lang : 'en'] || this.starters.en;
    if (!pool || !pool.length) return '';
    return pool[((i % pool.length) + pool.length) % pool.length];
  },
  /* free teachers get the first few; the rest is the library */
  visibleStarters: function () {
    var pool = this.starters[this.api.lang] || this.starters.en;
    if (this.premium || !this.premiumKnown) return pool.slice();
    return pool.slice(0, this.FREE_STARTERS);
  },

  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },
  _clearTimers: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY) || '{}') || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store || {})); } catch (_) {}
  },

  _fetchEntitlement: function () {
    var self = this, tok = null;
    try { tok = localStorage.getItem('accessToken'); } catch (_) {}
    var ent = this._store.ent;
    if (ent && ent.at && (Date.now() - ent.at) < this.ENT_TRUST_DAYS * 864e5) {
      this.premium = ent.tier !== 'free';
      this.premiumKnown = true;
    }
    if (!tok) { this.premiumKnown = true; this.render(); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + tok } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var tier = (j && j.user && j.user.subscriptionTier) || 'free';
        var active = !!(j && j.subscription && j.subscription.status === 'active');
        self.premium = active && tier !== 'free';
        self.premiumKnown = true;
        self._store.ent = { tier: self.premium ? tier : 'free', at: Date.now() };
        self._saveStore();
        self.render();
      })
      .catch(function () { self.premiumKnown = true; self.render(); });
  },

  /* =================================================================
     RENDER
     ================================================================= */
  render: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'rde-wrap');
    this._wrap = wrap;
    wrap.appendChild(this._buildBar());
    if (!this._canSpeak() && api.settings.voice) wrap.appendChild(this._buildVoiceMissing());
    wrap.appendChild(this._buildLine());
    var hint = api.el('div', 'rde-hint');
    hint.textContent = api.t('gapHint');
    wrap.appendChild(hint);
    if (this._editing) wrap.appendChild(this._buildEditor());
    wrap.appendChild(this._buildFoot());
    api.stage.appendChild(wrap);
    this._paintScoops();
  },

  _chip: function (label, on, fn, extra) {
    var b = this.api.el('button', 'rde-chip' + (on ? ' rde-on' : '') + (extra ? ' ' + extra : ''));
    b.type = 'button';
    b.textContent = label;
    b.addEventListener('click', fn);
    return b;
  },

  _buildVoiceMissing: function () {
    var api = this.api;
    var d = api.el('div', 'rde-voicemiss');
    d.textContent = '🔇 ' + api.t('voiceMissing');
    return d;
  },

  _buildBar: function () {
    var api = this.api, self = this;
    var bar = api.el('div', 'rde-bar');
    bar.appendChild(this._chip(api.t('readRobot'), false, function () { self._sayRobot(self.st); }));
    bar.appendChild(this._chip(api.t('readScooped'), false, function () { self._sayScooped(self.st); }));
    var sep = api.el('span', 'rde-sep');
    bar.appendChild(sep);
    /* step-through: one group per tap, lit as it speaks. No timers. */
    var stepping = this.st.step >= 0;
    bar.appendChild(this._chip(api.t(stepping ? 'nextScoop' : 'stepScoop'), stepping, function () {
      self._stepScoop();
    }));
    if (this.st.breaks.length) {
      bar.appendChild(this._chip(api.t('clearScoops'), false, function () {
        self.st = self.clearBreaks(self.st);
        self.render();
      }));
    }
    bar.appendChild(this._chip(api.t('changeLine'), this._editing, function () {
      self._editing = !self._editing;
      self.render();
    }));
    return bar;
  },

  _stepScoop: function () {
    var g = this.groupTexts(this.st);
    if (!g.length) return;
    var next = this.st.step + 1;
    if (next >= g.length) { this.st.step = -1; this.render(); return; }
    this.st.step = next;
    this.render();
    this._sayGroup(g[next]);
  },

  _buildLine: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'rde-linebox');
    box.setAttribute('role', 'group');
    box.setAttribute('aria-label', api.t('lineLabel'));
    var line = api.el('div', 'rde-line');
    this._lineEl = line;
    this._wordEls = [];
    var groups = this.groups(this.st);
    /* which group each word belongs to — for the step-through light */
    var gOf = {};
    groups.forEach(function (g, gi) { g.forEach(function (i) { gOf[i] = gi; }); });

    this.st.words.forEach(function (w, i) {
      var lit = (self.st.step >= 0 && gOf[i] === self.st.step);
      var litStart = lit && gOf[i - 1] !== self.st.step;
      var litEnd = lit && gOf[i + 1] !== self.st.step;
      var sp = api.el('span', 'rde-word' + (lit ? ' rde-lit' : '')
        + (litStart ? ' rde-lit-a' : '') + (litEnd ? ' rde-lit-z' : ''));
      /* ⚠ textContent, never innerHTML — this string came from a teacher */
      sp.textContent = w;
      line.appendChild(sp);
      self._wordEls.push(sp);
      if (i < self.st.words.length - 1) {
        var gapLit = (self.st.step >= 0 && gOf[i] === self.st.step && gOf[i + 1] === self.st.step);
        var gap = api.el('button', 'rde-gap' + (self.isBreak(self.st, i) ? ' rde-cut' : '')
          + (gapLit ? ' rde-lit' : ''));
        gap.type = 'button';
        gap.setAttribute('aria-label', self.fmt('scoopHere', { a: w, b: self.st.words[i + 1] }));
        gap.addEventListener('click', function () {
          self.st = self.toggleBreak(self.st, i);
          self.render();
        });
        line.appendChild(gap);
      }
    });
    box.appendChild(line);
    return box;
  },

  fmt: function (key, vars) {
    var s = this.api.t(key);
    for (var k in vars) s = s.split('{' + k + '}').join(vars[k]);
    return s;
  },

  /* ⚠ the scoop arcs. Generalised from syllable-splitter.js:595-617,
     which draws one arc per syllable inside ONE word on ONE row. A
     phrase group can WRAP, so a group draws one segment PER VISUAL ROW
     (word rects bucketed by their top). Without that, a wrapped group
     draws one absurd arc straight across the line break. */
  _paintScoops: function () {
    var line = this._lineEl;
    if (!line || !this._wordEls || !this._wordEls.length) return;
    if (this._arcEl) { this._arcEl.remove(); this._arcEl = null; }
    /* ⚠ NOTHING IS DRAWN UNTIL THE TEACHER SCOOPS. The model says an
       unscooped line is one group, and drawing that would put a
       full-width arc under the line before anyone has decided anything
       — the tool asserting "this whole line is one phrase", which is
       exactly the claim it refuses to make. An unmarked line also makes
       the first tap visibly DO something. */
    if (!this.st.breaks.length) return;
    var lineR = line.getBoundingClientRect();
    if (!lineR.width) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'rde-arcs');
    svg.setAttribute('width', lineR.width);
    svg.setAttribute('height', lineR.height);
    svg.setAttribute('aria-hidden', 'true');
    var self = this;
    this.groups(this.st).forEach(function (g) {
      var rows = {};
      g.forEach(function (i) {
        var el = self._wordEls[i];
        if (!el) return;
        var r = el.getBoundingClientRect();
        var key = Math.round(r.top);
        if (!rows[key]) rows[key] = { l: r.left, r: r.right, b: r.bottom };
        else {
          if (r.left < rows[key].l) rows[key].l = r.left;
          if (r.right > rows[key].r) rows[key].r = r.right;
          if (r.bottom > rows[key].b) rows[key].b = r.bottom;
        }
      });
      Object.keys(rows).forEach(function (k) {
        var seg = rows[k];
        var x1 = seg.l - lineR.left + 2, x2 = seg.r - lineR.left - 2;
        var y = seg.b - lineR.top + 2;
        if (!(x2 > x1)) return;
        var mid = (x1 + x2) / 2;
        var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        p.setAttribute('d', 'M' + x1 + ' ' + y + ' Q' + mid + ' ' + (y + 15) + ' ' + x2 + ' ' + y);
        p.setAttribute('class', 'rde-arc');
        svg.appendChild(p);
      });
    });
    line.appendChild(svg);
    this._arcEl = svg;
  },

  _buildEditor: function () {
    var api = this.api, self = this;
    var box = api.el('div', 'rde-editor');
    var lab = api.el('label', 'rde-lab');
    lab.textContent = api.t('typeHint');
    var input = document.createElement('input');
    input.type = 'text';
    input.className = 'rde-input';
    input.value = this.plainText(this.st);
    input.setAttribute('aria-label', api.t('typeHint'));
    lab.setAttribute('for', 'rde-input-el');
    input.id = 'rde-input-el';
    var apply = function () {
      var v = input.value;
      if (!self.tokenize(v).length) return;
      self.st = self.setLine(self.st, v);
      self._editing = false;
      self.render();
    };
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); apply(); } });
    box.append(lab, input);
    box.appendChild(this._chip(api.t('useLine'), false, apply));

    var sl = api.el('div', 'rde-lab');
    sl.textContent = api.t('starterLabel');
    box.appendChild(sl);
    var row = api.el('div', 'rde-starters');
    var pool = this.visibleStarters();
    pool.forEach(function (s, i) {
      row.appendChild(self._chip(s, false, function () {
        self._starter = i;
        self.st = self.setLine(self.st, s);
        self._editing = false;
        self.render();
      }, 'rde-starter'));
    });
    var all = (this.starters[this.api.lang] || this.starters.en) || [];
    if (pool.length < all.length) {
      row.appendChild(this._chip('+ ' + (all.length - pool.length), false, function () {
        self._gateInline(row, 'gateLibrary');
      }, 'rde-locked'));
    }
    box.appendChild(row);
    return box;
  },

  _buildFoot: function () {
    var api = this.api, self = this;
    var foot = api.el('div', 'rde-foot');
    foot.appendChild(this._chip(api.t('clear'), false, function () { self.reset(); }));
    var pr = this._chip(api.t('printBtn'), false, function () {
      if (!self.premium) { self._gateInline(foot, 'gatePrint'); return; }
      try { window.print(); } catch (_) {}
    }, this.premium ? '' : 'rde-locked');
    foot.appendChild(pr);
    var pv = api.el('div', 'rde-privacy');
    pv.textContent = api.t('privacyLine');
    foot.appendChild(pv);
    return foot;
  },

  _gateInline: function (host, key) {
    var api = this.api;
    if (!host || !this._wrap) return;
    var old = this._wrap.querySelector('.rde-gate');
    if (old) old.remove();
    var g = api.el('div', 'rde-gate');
    var s = api.el('span');
    s.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-reading-easel';
    a.target = '_top'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(s, a);
    host.insertAdjacentElement('beforebegin', g);
    this._after(12000, function () { if (g.parentNode) g.remove(); });
  }
};

function injectReadingEaselCSS() {
  if (document.getElementById('rde-style')) return;
  var st = document.createElement('style');
  st.id = 'rde-style';
  st.textContent = ''
    + '.rde-wrap{display:flex;flex-direction:column;align-items:center;gap:11px;width:100%;}'
    + '.rde-bar{display:flex;flex-wrap:wrap;gap:7px;justify-content:center;align-items:center;}'
    + '.rde-sep{width:1px;height:26px;background:rgba(20,107,94,.22);margin:0 3px;}'
    + '.rde-chip{min-height:44px;padding:8px 14px;border-radius:999px;border:1.5px solid rgba(20,107,94,.3);'
    +   'background:#FFFDF7;color:#146B5E;font-family:Nunito,system-ui,sans-serif;font-size:15px;cursor:pointer;}'
    + '.rde-chip:hover{background:#F3EADA;}'
    + '.rde-on{background:#146B5E;color:#FFFDF7;border-color:#146B5E;}'
    + '.rde-locked{border-style:dashed;color:#F2784B;border-color:rgba(242,120,75,.5);}'
    + '.rde-voicemiss{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#8A6A4B;'
    +   'background:rgba(242,120,75,.1);border-radius:12px;padding:7px 14px;max-width:640px;text-align:center;}'
    /* the line: projector-large, but it must still fit a 320px phone */
    + '.rde-linebox{width:min(100%,760px);padding:14px 12px 20px;border-radius:18px;'
    +   'background:rgba(255,253,247,.9);border:2px solid rgba(20,107,94,.2);}'
    + '.rde-line{position:relative;display:flex;flex-wrap:wrap;align-items:flex-end;'
    +   'justify-content:center;row-gap:22px;}'
    /* ⚠ vmin, not vw: on a wide-but-short projector vw explodes the text
       off the bottom. overflow-wrap because German and Finnish compounds
       are unbreakable and would otherwise push the line sideways. */
    + '.rde-word{font-family:var(--lcs-font-display),"Baloo 2",Nunito,system-ui,sans-serif;'
    +   'font-weight:700;font-size:clamp(24px,6.4vmin,56px);line-height:1.08;color:#2B2118;'
    +   'padding:2px 0;border-radius:6px;overflow-wrap:anywhere;transition:background .12s ease;'
    +   'align-self:stretch;display:flex;align-items:center;}'
    /* ⚠ the gap IS the tap target — 44px tall, and wide enough to hit
       between two words without hitting the words themselves */
    + '.rde-gap{width:26px;align-self:stretch;min-height:44px;padding:0;margin:0 1px;'
    +   'background:transparent;border:none;cursor:pointer;position:relative;border-radius:6px;}'
    + '.rde-gap:hover{background:rgba(20,107,94,.07);}'
    + '.rde-gap::after{content:"";position:absolute;left:50%;top:22%;bottom:22%;width:2px;'
    +   'transform:translateX(-50%);background:transparent;border-radius:2px;}'
    + '.rde-cut::after{background:rgba(20,107,94,.34);}'
    + '.rde-lit{background:rgba(242,120,75,.22);border-radius:0;}'
    + '.rde-lit-a{border-top-left-radius:8px;border-bottom-left-radius:8px;}'
    + '.rde-lit-z{border-top-right-radius:8px;border-bottom-right-radius:8px;}'
    + '.rde-arcs{position:absolute;left:0;top:0;pointer-events:none;overflow:visible;}'
    + '.rde-arc{fill:none;stroke:#F2784B;stroke-width:3;stroke-linecap:round;}'
    + '.rde-hint{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#8A6A4B;text-align:center;}'
    + '.rde-editor{display:flex;flex-direction:column;gap:8px;align-items:center;'
    +   'width:min(100%,640px);padding:12px;border-radius:16px;background:rgba(20,107,94,.06);}'
    + '.rde-lab{font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#3C7C72;}'
    + '.rde-input{width:100%;min-height:44px;padding:9px 12px;border-radius:12px;'
    +   'border:1.5px solid rgba(20,107,94,.3);background:#FFFDF7;color:#2B2118;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:17px;}'
    + '.rde-starters{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;}'
    + '.rde-starter{font-size:14px;padding:7px 11px;}'
    + '.rde-foot{display:flex;flex-wrap:wrap;gap:9px;justify-content:center;align-items:center;}'
    + '.rde-privacy{width:100%;text-align:center;font-family:Nunito,system-ui,sans-serif;'
    +   'font-size:14px;color:#6B6558;}'
    + '.rde-gate{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;'
    +   'font-family:Nunito,system-ui,sans-serif;font-size:15px;color:#8A5A3B;'
    +   'background:rgba(242,120,75,.12);border-radius:12px;padding:8px 14px;margin:4px 0;}'
    + '.rde-gate a{color:#146B5E;font-weight:700;}'
    + 'body.rde-wide .lcs-header{flex-direction:column;}'
    /* the 1024x768 projector is short, not narrow — swap to vh there */
    + '@media (max-height:960px) and (min-width:768px){'
    +   '.rde-word{font-size:clamp(24px,5.4vh,48px);}.rde-wrap{gap:8px;}}'
    + '@media (max-width:700px){body.rde-wide{overflow-y:auto;overflow-x:hidden;height:auto;min-height:100%;}}'
    /* ⚠ TUNED FOR THE WORDIEST LOCALE, NOT FOR ENGLISH. At 320px the
       German and Dutch chips ("Bögen entfernen", "Boogje voor boogje")
       wrap the bar to four rows and the foot to three, pushing the tool
       75px past the fold — a defect an English-only sweep cannot see.
       Font stays at 14px (the legibility floor); the savings come from
       padding, gaps and the line row-gap, which the arcs only need 17px
       of. Measured: 653px -> fits. */
    + '@media (max-width:420px){.rde-chip{padding:7px 8px;font-size:14px;}'
    +   '.rde-bar{gap:5px;}.rde-wrap{gap:7px;}.rde-sep{display:none;}.rde-gap{width:22px;}'
    +   '.rde-foot{gap:6px;}.rde-hint{font-size:14px;}'
    +   '.rde-linebox{padding:10px 8px 14px;}'
    +   '.rde-line{row-gap:18px;}'
    +   '.rde-word{font-size:clamp(21px,6.4vmin,56px);}}'
    + '@media print{.rde-bar,.rde-hint,.rde-editor,.rde-foot,.rde-gate,.rde-voicemiss{display:none!important;}'
    +   '.rde-linebox{border:none;background:none;}}'
    + '@media (prefers-reduced-motion:reduce){.rde-word{transition:none;}}';
  document.head.appendChild(st);
}
