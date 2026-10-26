/* =====================================================================
   sentence-stage-activity.js — ACTIVITY #128 of the one-by-one rebuild:
   "Wiggles' Sentence Builder" → THE SENTENCE STAGE (L.1.1.j; all 11
   locales). Model: sentence-stage-core.js (SentenceStageCore).
   Design: docs/activities-rebuild/designs/128-sentence-builder.md
   ---------------------------------------------------------------------
   A toy theatre over a script line. The word blocks wait in the wings;
   tap one and it goes onto the first empty place of the script line (tap
   it there and it goes back). Check plays the script word by word: the
   start word opens the curtain, a number word lights that many spotlights,
   a describing word sizes or colours the light, the naming word brings the
   library actor on, the doing word makes it act, the end mark closes the
   curtain. The show freezes at the first word that is out of place, and
   that place flickers. Level 5 hangs a photo beside the stage: the child
   writes a sentence about it from a word bank, and the stage shows what
   the sentence says next to what the photo shows. No timer, no score.
   Test seams: window.SentenceStageActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._block / ._slot /
   ._check / .FAST / .OK_MS.
   ===================================================================== */
var SentenceStageActivity = {
  id: 'sentence-stage',
  /* the drawn apparatus (the hierarchy gate): the theatre, its curtains, floor, spotlights and the photo frame */
  apparatusClasses: ['ss-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Wiggles' Sentence Builder",de:"Wiggles baut Sätze",fr:"Wiggles construit des phrases",es:"Wiggles arma oraciones",pt:"Wiggles Monta Frases",it:"Wiggles costruisce le frasi",nl:"Wiggles bouwt zinnen",sv:"Krumelur bygger meningar",da:"Wiggles bygger sætninger",no:"Wiggles bygger setninger",fi:"Wiggles rakentaa lauseita"},
    instruction: {en:"Put the words in order, then watch the stage act out your sentence.",de:"Bring die Wörter in die richtige Reihenfolge und sieh zu, wie die Bühne deinen Satz vorspielt.",fr:"Mets les mots dans l’ordre, puis regarde la scène jouer ta phrase.",es:"Pon las palabras en orden y mira cómo el escenario actúa tu oración.",pt:"Coloque as palavras em ordem e veja o palco encenar a sua frase.",it:"Metti le parole in ordine e guarda il palco recitare la tua frase.",nl:"Zet de woorden in de goede volgorde en kijk hoe het toneel je zin speelt.",sv:"Sätt orden i rätt ordning och se scenen spela upp din mening.",da:"Sæt ordene i den rigtige rækkefølge, og se scenen spille din sætning.",no:"Sett ordene i riktig rekkefølge, og se scenen spille setningen din.",fi:"Laita sanat oikeaan järjestykseen ja katso, kun näyttämö esittää lauseesi."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Build the sentence. The stage will act it out.",de:"Bau den Satz. Die Bühne spielt ihn vor.",fr:"Construis la phrase. La scène va la jouer.",es:"Arma la oración. El escenario la va a actuar.",pt:"Monte a frase. O palco vai encenar.",it:"Costruisci la frase. Il palco la reciterà.",nl:"Bouw de zin. Het toneel speelt hem.",sv:"Bygg meningen. Scenen spelar upp den.",da:"Byg sætningen. Scenen spiller den.",no:"Bygg setningen. Scenen spiller den.",fi:"Rakenna lause. Näyttämö esittää sen."},
    t2: {en:"Build it. Who will come on stage?",de:"Bau den Satz. Wer kommt auf die Bühne?",fr:"Construis la phrase. Qui va monter sur scène ?",es:"Arma la oración. ¿Quién va a salir al escenario?",pt:"Monte a frase. Quem vai entrar no palco?",it:"Costruisci la frase. Chi entrerà in scena?",nl:"Bouw de zin. Wie komt er op het toneel?",sv:"Bygg meningen. Vem kommer upp på scenen?",da:"Byg sætningen. Hvem kommer på scenen?",no:"Bygg setningen. Hvem kommer på scenen?",fi:"Rakenna lause. Kuka tulee näyttämölle?"},
    t3: {en:"Find the start and the end.",de:"Finde den Anfang und das Ende.",fr:"Trouve le début et la fin.",es:"Encuentra el principio y el final.",pt:"Encontre o começo e o fim.",it:"Trova l’inizio e la fine.",nl:"Zoek het begin en het einde.",sv:"Hitta början och slutet.",da:"Find begyndelsen og slutningen.",no:"Finn begynnelsen og slutten.",fi:"Etsi alku ja loppu."},
    t4: {en:"Ask it or shout it.",de:"Frag es oder ruf es.",fr:"Pose une question ou pousse un cri.",es:"Pregúntalo o exclámalo.",pt:"Pergunte ou exclame.",it:"Fai una domanda o un’esclamazione.",nl:"Vraag het of roep het.",sv:"Fråga eller ropa.",da:"Spørg eller råb.",no:"Spør eller rop.",fi:"Kysy tai huudahda."},
    t5: {en:"Write a sentence about the photo.",de:"Schreib einen Satz über das Foto.",fr:"Écris une phrase sur la photo.",es:"Escribe una oración sobre la foto.",pt:"Escreva uma frase sobre a foto.",it:"Scrivi una frase sulla foto.",nl:"Schrijf een zin over de foto.",sv:"Skriv en mening om fotot.",da:"Skriv en sætning om billedet.",no:"Skriv en setning om bildet.",fi:"Kirjoita lause kuvasta."},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    setLevel: {en:"Sentences",de:"Sätze",fr:"Phrases",es:"Oraciones",pt:"Frases",it:"Frasi",nl:"Zinnen",sv:"Meningar",da:"Sætninger",no:"Setninger",fi:"Lauseet"},
    l1: {en:"With clues",de:"Mit Hilfe",fr:"Avec indice",es:"Con pista",pt:"Com pista",it:"Con aiuto",nl:"Met hulp",sv:"Med ledtråd",da:"Med hjælp",no:"Med hjelp",fi:"Vihjeen kanssa"},
    l2: {en:"No clues",de:"Ohne Hilfe",fr:"Sans indice",es:"Sin pista",pt:"Sem pista",it:"Senza aiuto",nl:"Zonder hulp",sv:"Utan ledtråd",da:"Uden hjælp",no:"Uten hjelp",fi:"Ilman vihjettä"},
    l3: {en:"Beginning and end",de:"Anfang und Ende",fr:"Début et fin",es:"Principio y final",pt:"Começo e fim",it:"Inizio e fine",nl:"Begin en einde",sv:"Början och slut",da:"Begyndelse og slutning",no:"Begynnelse og slutt",fi:"Alku ja loppu"},
    l4: {en:"Ask and shout",de:"Fragen und rufen",fr:"Questions et cris",es:"Preguntas y exclamaciones",pt:"Perguntas e exclamações",it:"Domande ed esclamazioni",nl:"Vragen en roepen",sv:"Frågor och utrop",da:"Spørgsmål og udråb",no:"Spørsmål og utrop",fi:"Kysymykset ja huudahdukset"},
    l5: {en:"About the photo",de:"Zum Foto",fr:"Sur la photo",es:"Sobre la foto",pt:"Sobre a foto",it:"Sulla foto",nl:"Over de foto",sv:"Om fotot",da:"Om billedet",no:"Om bildet",fi:"Kuvasta"},
    setSpeed: {en:"Speed of the show",de:"Tempo der Vorstellung",fr:"Vitesse du spectacle",es:"Velocidad de la función",pt:"Velocidade do espetáculo",it:"Velocità dello spettacolo",nl:"Snelheid van de voorstelling",sv:"Föreställningens fart",da:"Forestillingens fart",no:"Forestillingens fart",fi:"Esityksen nopeus"},
    slow: {en:"Slow",de:"Langsam",fr:"Lent",es:"Lenta",pt:"Devagar",it:"Lenta",nl:"Langzaam",sv:"Långsam",da:"Langsom",no:"Langsom",fi:"Hidas"},
    quick: {en:"Quick",de:"Schnell",fr:"Rapide",es:"Rápida",pt:"Rápido",it:"Veloce",nl:"Snel",sv:"Snabb",da:"Hurtig",no:"Rask",fi:"Nopea"},
    hintEmpty: {en:"Put the words on the script line. Which word can open the curtain?",de:"Leg die Wörter auf die Textzeile. Welches Wort kann den Vorhang öffnen?",fr:"Pose les mots sur la ligne du texte. Quel mot peut ouvrir le rideau ?",es:"Pon las palabras en la línea del guion. ¿Qué palabra puede abrir el telón?",pt:"Coloque as palavras na linha do roteiro. Qual palavra pode abrir a cortina?",it:"Metti le parole sulla riga del copione. Quale parola può aprire il sipario?",nl:"Leg de woorden op de tekstregel. Welk woord kan het doek openen?",sv:"Lägg orden på manusraden. Vilket ord kan öppna ridån?",da:"Læg ordene på manuslinjen. Hvilket ord kan åbne tæppet?",no:"Legg ordene på manuslinjen. Hvilket ord kan åpne teppet?",fi:"Laita sanat käsikirjoitusriville. Mikä sana voi avata esiripun?"},
    hintMissing: {en:"Put all the words on the script line first.",de:"Leg zuerst alle Wörter auf die Textzeile.",fr:"Pose d’abord tous les mots sur la ligne du texte.",es:"Primero pon todas las palabras en la línea del guion.",pt:"Primeiro coloque todas as palavras na linha do roteiro.",it:"Prima metti tutte le parole sulla riga del copione.",nl:"Leg eerst alle woorden op de tekstregel.",sv:"Lägg först alla ord på manusraden.",da:"Læg først alle ordene på manuslinjen.",no:"Legg først alle ordene på manuslinjen.",fi:"Laita ensin kaikki sanat käsikirjoitusriville."},
    missStart: {en:"The curtain only opens for the word that starts the sentence. It has a capital letter.",de:"Der Vorhang geht nur für das Wort auf, mit dem der Satz anfängt.",fr:"Le rideau ne s’ouvre que pour le mot qui commence la phrase. Il a une majuscule.",es:"El telón solo se abre con lo que empieza la oración: la mayúscula, o ¿ y ¡ al principio de una pregunta o exclamación.",pt:"A cortina só abre para a palavra que começa a frase. Ela tem letra maiúscula.",it:"Il sipario si apre solo per la parola che inizia la frase. Ha la lettera maiuscola.",nl:"Het doek gaat alleen open voor het woord waarmee de zin begint. Het heeft een hoofdletter.",sv:"Ridån går bara upp för ordet som börjar meningen. Det har stor bokstav.",da:"Tæppet går kun op for det ord, sætningen begynder med. Det har stort bogstav.",no:"Teppet går bare opp for ordet setningen begynner med. Det har stor forbokstav.",fi:"Esirippu aukeaa vain sanalle, joka aloittaa lauseen. Siinä on iso alkukirjain."},
    missEnd: {en:"The end mark closes the curtain, so it comes last. How does your sentence end?",de:"Das Satzzeichen am Ende schließt den Vorhang. Es kommt zuletzt. Wie endet dein Satz?",fr:"Le point à la fin ferme le rideau : il vient en dernier. Comment finit ta phrase ?",es:"El signo del final cierra el telón: va al final. ¿Cómo termina tu oración?",pt:"O sinal do final fecha a cortina: ele vem por último. Como termina a sua frase?",it:"Il segno alla fine chiude il sipario: viene per ultimo. Come finisce la tua frase?",nl:"Het leesteken aan het eind sluit het doek: het komt als laatste. Hoe eindigt je zin?",sv:"Skiljetecknet i slutet drar för ridån, så det kommer sist. Hur slutar din mening?",da:"Tegnet til sidst lukker tæppet, så det kommer sidst. Hvordan slutter din sætning?",no:"Tegnet til slutt lukker teppet, så det kommer sist. Hvordan slutter setningen din?",fi:"Lopetusmerkki sulkee esiripun, joten se tulee viimeisenä. Miten lauseesi loppuu?"},
    missWho: {en:"Who is doing it? The actor comes on before the doing word.",de:"Wer macht es? Erst kommt der Schauspieler, dann das Tunwort.",fr:"Qui le fait ? L’acteur entre avant le verbe.",es:"¿Quién lo hace? El actor sale antes que el verbo.",pt:"Quem faz isso? O ator entra antes do verbo.",it:"Chi lo fa? L’attore entra prima del verbo.",nl:"Wie doet het? De acteur komt op vóór het werkwoord.",sv:"Vem gör det? Skådespelaren kommer in före verbet.",da:"Hvem gør det? Skuespilleren kommer ind før udsagnsordet.",no:"Hvem gjør det? Skuespilleren kommer inn før verbet.",fi:"Kuka sen tekee? Näyttelijä tulee lavalle ennen teonsanaa."},
    missOrder: {en:"The show stopped at “{w}”. Read your sentence aloud: which word belongs there?",de:"Die Vorstellung hielt bei „{w}“ an. Lies deinen Satz laut: Welches Wort gehört dorthin?",fr:"Le spectacle s’est arrêté sur « {w} ». Lis ta phrase à voix haute : quel mot va là ?",es:"La función se detuvo en «{w}». Lee tu oración en voz alta: ¿qué palabra va ahí?",pt:"O espetáculo parou em “{w}”. Leia a sua frase em voz alta: que palavra vai ali?",it:"Lo spettacolo si è fermato su «{w}». Leggi la frase ad alta voce: quale parola va lì?",nl:"De voorstelling stopte bij ‘{w}’. Lees je zin hardop: welk woord hoort daar?",sv:"Föreställningen stannade vid ”{w}”. Läs meningen högt: vilket ord ska stå där?",da:"Forestillingen stoppede ved ”{w}”. Læs sætningen højt: hvilket ord skal stå der?",no:"Forestillingen stoppet ved «{w}». Les setningen høyt: hvilket ord skal stå der?",fi:"Esitys pysähtyi sanaan ”{w}”. Lue lauseesi ääneen: mikä sana kuuluu siihen?"},
    missVerb: {en:"What does it do? The show needs a doing word.",de:"Was macht es? Die Vorstellung braucht ein Tunwort.",fr:"Que fait-il ? Le spectacle a besoin d’un verbe.",es:"¿Qué hace? La función necesita un verbo.",pt:"O que ele faz? O espetáculo precisa de um verbo.",it:"Che cosa fa? Lo spettacolo ha bisogno di un verbo.",nl:"Wat doet het? De voorstelling heeft een werkwoord nodig.",sv:"Vad gör den? Föreställningen behöver ett verb.",da:"Hvad gør den? Forestillingen mangler et udsagnsord.",no:"Hva gjør den? Forestillingen trenger et verb.",fi:"Mitä se tekee? Esitys tarvitsee teonsanan."},
    missFalse: {en:"The stage shows “{w}”, but the photo does not. Look at the photo again.",de:"Die Bühne zeigt „{w}“, aber das Foto nicht. Schau dir das Foto noch einmal an.",fr:"La scène montre « {w} », mais pas la photo. Regarde encore la photo.",es:"El escenario muestra «{w}», pero la foto no. Mira otra vez la foto.",pt:"O palco mostra “{w}”, mas a foto não. Olhe a foto de novo.",it:"Il palco mostra «{w}», ma la foto no. Guarda di nuovo la foto.",nl:"Het toneel laat ‘{w}’ zien, maar de foto niet. Kijk nog eens naar de foto.",sv:"Scenen visar ”{w}”, men fotot gör det inte. Titta på fotot igen.",da:"Scenen viser ”{w}”, men det gør billedet ikke. Se på billedet igen.",no:"Scenen viser «{w}», men bildet gjør det ikke. Se på bildet igjen.",fi:"Näyttämöllä on ”{w}”, mutta kuvassa ei. Katso kuvaa uudestaan."},
    missGlow: {en:"Try the glowing word where the show stopped.",de:"Probier das leuchtende Wort dort, wo die Vorstellung anhielt.",fr:"Essaie le mot qui brille là où le spectacle s’est arrêté.",es:"Prueba la palabra que brilla donde se detuvo la función.",pt:"Experimente a palavra que brilha onde o espetáculo parou.",it:"Prova la parola che brilla dove lo spettacolo si è fermato.",nl:"Probeer het oplichtende woord waar de voorstelling stopte.",sv:"Prova ordet som lyser där föreställningen stannade.",da:"Prøv det ord, der lyser, der hvor forestillingen stoppede.",no:"Prøv ordet som lyser, der forestillingen stoppet.",fi:"Kokeile hehkuvaa sanaa siihen, missä esitys pysähtyi."},
    okSentence: {en:"{s} — a capital to start, someone, what they do, and a full stop!",de:"{s} – großer Anfangsbuchstabe, jemand, was er tut, und am Ende ein Punkt!",fr:"{s} — une majuscule au début, quelqu’un, ce qu’il fait et un point à la fin !",es:"{s} — mayúscula al principio, alguien, lo que hace y un punto al final.",pt:"{s} — maiúscula no começo, alguém, o que ele faz e um ponto no final!",it:"{s} — la maiuscola all’inizio, qualcuno, che cosa fa e il punto alla fine!",nl:"{s} — een hoofdletter vooraan, iemand, wat hij doet en een punt aan het eind!",sv:"{s} – stor bokstav först, någon, vad den gör och punkt sist!",da:"{s} – stort bogstav først, nogen, hvad de gør, og punktum til sidst!",no:"{s} – stor forbokstav først, noen, hva de gjør, og punktum til slutt!",fi:"{s} – iso alkukirjain, joku, mitä se tekee, ja piste lopussa!"},
    okQuestion: {en:"{s} — a question ends with a question mark!",de:"{s} – eine Frage endet mit einem Fragezeichen!",fr:"{s} — une question finit par un point d’interrogation !",es:"{s} — una pregunta va entre ¿ y ?",pt:"{s} — uma pergunta termina com ponto de interrogação!",it:"{s} — una domanda finisce con il punto interrogativo!",nl:"{s} — een vraag eindigt met een vraagteken!",sv:"{s} – en fråga slutar med frågetecken!",da:"{s} – et spørgsmål slutter med spørgsmålstegn!",no:"{s} – et spørsmål slutter med spørsmålstegn!",fi:"{s} – kysymys loppuu kysymysmerkkiin!"},
    okShout: {en:"{s} — a shout ends with an exclamation mark!",de:"{s} – ein Ausruf endet mit einem Ausrufezeichen!",fr:"{s} — une exclamation finit par un point d’exclamation !",es:"{s} — una exclamación va entre ¡ y !",pt:"{s} — uma exclamação termina com ponto de exclamação!",it:"{s} — un’esclamazione finisce con il punto esclamativo!",nl:"{s} — een uitroep eindigt met een uitroepteken!",sv:"{s} – ett utrop slutar med utropstecken!",da:"{s} – et udråb slutter med udråbstegn!",no:"{s} – et utrop slutter med utropstegn!",fi:"{s} – huudahdus loppuu huutomerkkiin!"},
    okPicture: {en:"{s} — that is just what the photo shows!",de:"{s} – genau das zeigt das Foto!",fr:"{s} — c’est exactement ce que montre la photo !",es:"{s} — ¡eso es justo lo que muestra la foto!",pt:"{s} — é exatamente o que a foto mostra!",it:"{s} — è proprio quello che mostra la foto!",nl:"{s} — dat is precies wat de foto laat zien!",sv:"{s} – precis det som fotot visar!",da:"{s} – det er præcis det, billedet viser!",no:"{s} – det er akkurat det bildet viser!",fi:"{s} – juuri sitä kuva näyttää!"},
    aBlock: {en:"Word: {w}",de:"Wort: {w}",fr:"Mot : {w}",es:"Palabra: {w}",pt:"Palavra: {w}",it:"Parola: {w}",nl:"Woord: {w}",sv:"Ord: {w}",da:"Ord: {w}",no:"Ord: {w}",fi:"Sana: {w}"},
    aSlot: {en:"Script line, place {i}: {w}",de:"Textzeile, Platz {i}: {w}",fr:"Ligne du texte, place {i} : {w}",es:"Línea del guion, lugar {i}: {w}",pt:"Linha do roteiro, lugar {i}: {w}",it:"Riga del copione, posto {i}: {w}",nl:"Tekstregel, plaats {i}: {w}",sv:"Manusraden, plats {i}: {w}",da:"Manuslinjen, plads {i}: {w}",no:"Manuslinjen, plass {i}: {w}",fi:"Käsikirjoitusrivi, paikka {i}: {w}"},
    aStage: {en:"The stage: play the show again",de:"Die Bühne: die Vorstellung noch einmal spielen",fr:"La scène : rejouer le spectacle",es:"El escenario: repetir la función",pt:"O palco: repetir o espetáculo",it:"Il palco: rifare lo spettacolo",nl:"Het toneel: de voorstelling nog eens spelen",sv:"Scenen: spela föreställningen igen",da:"Scenen: spil forestillingen igen",no:"Scenen: spill forestillingen igjen",fi:"Näyttämö: esitä uudestaan"},
    srStop: {en:"The show stopped at {w}.",de:"Die Vorstellung hielt bei {w} an.",fr:"Le spectacle s’est arrêté sur {w}.",es:"La función se detuvo en {w}.",pt:"O espetáculo parou em {w}.",it:"Lo spettacolo si è fermato su {w}.",nl:"De voorstelling stopte bij {w}.",sv:"Föreställningen stannade vid {w}.",da:"Forestillingen stoppede ved {w}.",no:"Forestillingen stoppet ved {w}.",fi:"Esitys pysähtyi sanaan {w}."},
  },/*STRINGS-END*/

  defaults: { level: '1', speed: 'slow' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }, { value: '5', labelKey: 'l5' }] },
    { key: 'speed', type: 'choice', labelKey: 'setSpeed', options: [{ value: 'slow', labelKey: 'slow' }, { value: 'quick', labelKey: 'quick' }] }
  ],
  OK_MS: 500, FAST: false,
  STEP: { slow: 450, quick: 250 },
  POOL: { brown: '#B07A4A', white: '#FFFFFF', black: '#4A4356', green: '#7ACB6E', pink: '#F7AECB', red: '#EA6A5E', yellow: '#FBDD6A', blue: '#6FA8E6', orange: '#F5A45A', grey: '#B3BAC4' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {};
    this._timers = []; this._ro = null; this._view = {}; this._posters = 0;
    injectSentenceStageCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return SentenceStageCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return SentenceStageCore.levelOf(this._setting('level')); },
  _speed: function () { return this._setting('speed') === 'quick' ? 'quick' : 'slow'; },
  _step: function () { return this.FAST ? 0 : this.STEP[this._speed()]; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SentenceStageCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {}; this._posters = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SentenceStageCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._trays = P.trays; this._orderForPool = pool; if (pass > this._pass) this._posters = 0; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'sentencestage.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers();
    this.st = SentenceStageCore.newState(this._loc(), this._level(), r, this._trays && this._trays[r]);
    this._view = { note: '', ok: '', play: null, bow: false, frozen: null };
    this._setPrompt();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : this._pool[0], 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ss-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ss-main"></div><div class="ss-foot"></div><p class="ss-note" aria-live="polite"></p><p class="ss-sr" aria-live="polite"></p>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _el: function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; },
  _dims: function () {
    var W = this._width(), B = SentenceStageCore.band(W);
    return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, one: B.wide ? 128 : 96, few: B.wide ? 112 : 72, six: B.wide ? 96 : 64, photo: B.wide ? 128 : B.tiny ? 72 : 80 };
  },
  _img: function (path, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.ss-sr'); if (el) el.textContent = s; },
  _blockText: function (id) { var st = this.st, i = st.slots.indexOf(id), first = i >= 0 && SentenceStageCore.filled(st)[0] === id; return SentenceStageCore.text(st.rd, id, first); },

  /* what the stage shows now: a play in progress, the finished show, or the stage at rest */
  _scene: function () {
    var C = SentenceStageCore, st = this.st, v = this._view, rd = st.rd;
    if (v.play) { var S = C.stage(st, v.play.k); S.curtain = v.play.k === 0 || S.closed ? 'shut' : 'open'; S.frozen = !!v.play.frozen; return S; }
    if (v.frozen && st.last === 'miss') { var F = C.stage(st, v.frozen.k); F.curtain = v.frozen.k === 0 ? 'shut' : 'open'; F.frozen = true; return F; }
    if (st.done) { var D = C.stage(st, C.filled(st).length); D.curtain = 'open'; D.bow = v.bow; D.acting = true; return D; }
    var R = { curtain: 'open', lights: 1, actors: 0, rest: true };
    if (rd.kind === 'build' && rd.clue) { R.actors = 1; R.pic = rd.pic; R.clue = true; }
    return R;
  },
  _paint_: function () {
    var C = SentenceStageCore, st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, gid = C.glow(st), gat = C.glowAt(st);
    this._wrap.className = 'ss-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' k-' + rd.kind + ' sp-' + this._speed();
    var main = this._qs('.ss-main'); main.innerHTML = '';
    /* the theatre (and level 5's photo) */
    var th = this._el('div', 'ss-theatre ss-art');
    if (rd.kind === 'write') th.appendChild(this._el('div', 'ss-photo ss-art' + (st.freeze && st.reason === 'false' && !v.play ? ' is-pulse' : '') + (st.done ? ' is-ok' : ''), this._img(rd.pic, D.photo, 'ss-photoimg')));
    var S = this._scene(), n = Math.min(6, Math.max(S.lights || 0, S.actors || 0));
    var cls = 'ss-stage ss-art c-' + S.curtain + (S.frozen && !S.open ? ' is-locked' : '') + (S.rest ? ' is-rest' : '') + (S.clue ? ' is-clue' : '') + (S.frozen ? ' is-frozen' : '') + (S.acting && S.act ? ' act-' + S.act : '') + (S.more ? ' is-more' : '') + (S.q ? ' is-q' : '') + (S.mark === '!' ? ' is-shout' : '') + (S.mark === '?' ? ' is-ask' : '') + (S.size ? ' sz-' + S.size : '') + (S.fx ? ' is-fx' : '') + (S.bow ? ' is-bow' : '') + (n > 3 ? ' is-six' : '');
    var stage = this._btn(cls, 'stage', this._t('aStage'));
    stage.disabled = !st.done || !!v.play;
    var pool = S.colour ? this.POOL[S.colour] : null, size = n > 3 ? D.six : n > 1 ? D.few : D.one, spots = '';
    for (var i = 0; i < Math.max(1, n); i++) {
      var on = i < (S.lights || 0) || S.rest;
      spots += '<span class="ss-spot' + (on ? ' is-on' : '') + '"><i class="ss-pool"' + (pool ? ' style="background:radial-gradient(ellipse at 50% 50%,' + pool + ' 0%,' + pool + ' 55%,rgba(255,255,255,0) 72%)"' : '') + '></i>' + (i < (S.actors || 0) && S.pic ? '<span class="ss-actor">' + this._img(S.pic, size, 'ss-actimg') + '</span>' : '') + '</span>';
    }
    stage.innerHTML = '<span class="ss-back"></span><span class="ss-floor"></span><span class="ss-beam"></span><span class="ss-spots">' + spots + '</span><span class="ss-shimmer"></span><span class="ss-stars"><i></i><i></i><i></i><i></i></span>'
      + '<span class="ss-curtain l"></span><span class="ss-curtain r"></span><span class="ss-valance"></span>'
      + (this._posters ? '<span class="ss-posters">' + new Array(Math.min(9, this._posters) + 1).join('<i></i>') + '</span>' : '');
    stage.addEventListener('click', function () { self._replay(); });
    th.appendChild(stage);
    main.appendChild(th);
    /* the script line */
    var rail = this._el('div', 'ss-rail'), fr = st.freeze, frozenAt = fr && st.last === 'miss' && !v.play ? fr.at : (v.play && v.play.frozen ? v.play.at : null);
    st.slots.forEach(function (id, i) {
      var hot = frozenAt === i, gl = gat === i && !v.play;
      if (id == null) { rail.appendChild(self._el('span', 'ss-slot is-empty' + (hot ? ' is-stop' : '') + (gl ? ' is-glow' : ''), '')); return; }
      var w = self._blockText(id), b = self._btn('ss-slot is-full' + (hot ? ' is-stop' : '') + (gl ? ' is-glow' : '') + (st.done ? ' is-ok' : ''), 'slot-' + i, self._t('aSlot', { i: i + 1, w: w }), esc(w));
      b.disabled = st.done || !!v.play; b.addEventListener('click', function () { self._slot(i); }); rail.appendChild(b);
    });
    rail.appendChild(this._el('i', 'ss-metro ss-art', ''));
    main.appendChild(rail);
    /* the wings */
    var wings = this._el('div', 'ss-wings');
    C.wings(st).forEach(function (id) {
      var w = C.text(rd, id, false), b = self._btn('ss-block' + (rd.blocks[id].r === 'e' || rd.blocks[id].r === 'o' ? ' is-mark' : '') + (gid === id ? ' is-glow' : ''), 'block-' + id, self._t('aBlock', { w: w }), esc(w));
      b.disabled = st.done || !!v.play; b.addEventListener('click', function () { self._block(id); }); wings.appendChild(b);
    });
    if (!wings.children.length) wings.appendChild(this._el('span', 'ss-wingsempty', ''));
    main.appendChild(wings);
    var foot = this._qs('.ss-foot'); foot.innerHTML = '';
    var chk = this._btn('ss-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done || !!v.play; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.ss-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'ss-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'ss-note is-hint'; }
    else { note.textContent = ''; note.className = 'ss-note'; }
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.play = null; this._view.frozen = null; },
  _block: function (id) { var r = SentenceStageCore.put(this.st, id); if (r === 'no' || r === 'full') return; this._moved(); this.api.sound(520); this._paint(); },
  _slot: function (i) { var r = SentenceStageCore.take(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(320); this._paint(); },
  /* play the script word by word up to k; then call done */
  _play: function (k, frozenAt, done) {
    var self = this, st = this.st, ms = this._step();
    this._view.play = { k: 0, frozen: false, at: null }; this._paint();
    if (!ms) { this._view.play = { k: k, frozen: frozenAt != null, at: frozenAt }; this._paint(); done(); return; }
    for (var i = 1; i <= k; i++) (function (j) { self._later(function () { if (self.st !== st) return; self._view.play.k = j; self.api.sound(380 + j * 40); self._paint(); }, j * ms); })(i);
    this._later(function () { if (self.st !== st) return; if (frozenAt != null) { self._view.play.frozen = true; self._view.play.at = frozenAt; self.api.sound(180); } self._paint(); done(); }, (k + 1) * ms);
  },
  _check: function () {
    var C = SentenceStageCore, st = this.st, v = this._view, self = this; if (st.done || v.play) return;
    this._clearTimers();
    var res = C.check(st);
    if (res.result === 'empty' || res.result === 'missing') { v.ok = ''; v.note = this._t(C.hint(st)); this.api.sound(400); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { v.note = ''; v.ok = ''; this._play(C.filled(st).length, null, function () { self._success(); }); return; }
    var k = C.playable(st), fr = st.freeze, wid = fr && fr.at < st.slots.length ? st.slots[fr.at] : null, w = wid != null ? this._blockText(wid) : '';
    var note = this._t(C.hint(st), { w: w });
    v.ok = ''; v.note = '';
    this._play(k, fr.at, function () { v.play = null; v.frozen = { k: k, at: fr.at }; v.note = note; self._paint(); self.api.announce(note); if (w) self._sr(self._t('srStop', { w: w })); });
  },
  _replay: function () { var st = this.st, self = this; if (!st.done || this._view.play) return; var ok = this._view.ok; this._view.bow = false; this._play(SentenceStageCore.filled(st).length, null, function () { self._view.play = null; self._view.bow = true; self._view.ok = ok; self._paint(); }); },
  _success: function () {
    var C = SentenceStageCore, st = this.st, rd = st.rd, v = this._view, s = C.join(rd, st.slots), msg = this._t(C.okKey(st), { s: s }), self = this;
    v.play = null; v.bow = true; v.note = ''; v.ok = msg; this._posters++;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: s, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectSentenceStageCSS() {
  if (typeof document === 'undefined' || document.getElementById('ss-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ss-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .ss-wrap:focus{outline:none;}'
  + '.ss-main{display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the theatre */
  + '.ss-theatre{display:flex;align-items:stretch;gap:10px;}'
  + '.ss-photo{flex:none;display:flex;align-items:center;justify-content:center;padding:10px;border-radius:10px;background:#FFFDF4;box-shadow:inset 0 0 0 6px #8C6239,inset 0 0 0 9px #D9B98A,0 4px 0 #6E4B2A;} .ss-photoimg{display:block;object-fit:contain;}'
  + '.ss-photo.is-pulse{animation:ssPulse 1s ease-in-out 2;} .ss-photo.is-ok{box-shadow:inset 0 0 0 6px #2E8C7E,inset 0 0 0 9px #9ED8CB,0 0 16px rgba(255,201,60,.8);} @keyframes ssPulse{50%{transform:scale(1.04);}}'
  + '.ss-stage{position:relative;flex:1 1 auto;min-width:0;min-height:236px;margin:0;padding:0;border:0;border-radius:14px;overflow:hidden;background:#3B2F4A;box-shadow:inset 0 0 0 6px #2F2A3B;font:inherit;cursor:default;} .ss-stage:not(:disabled){cursor:pointer;}'
  + '.ss-stage.is-six{min-height:252px;}'
  + '.ss-back{position:absolute;left:6px;right:6px;top:6px;bottom:44px;background:linear-gradient(180deg,#4C3D5E,#6A577E);}'
  + '.ss-floor{position:absolute;left:6px;right:6px;bottom:6px;height:52px;background:repeating-linear-gradient(90deg,#E9C99B 0 46px,#D9B585 46px 48px);box-shadow:inset 0 4px 0 #C59C68;}'
  + '.ss-beam{position:absolute;left:50%;top:6px;width:0;height:0;}'
  + '.ss-spots{position:absolute;left:20px;right:20px;bottom:14px;top:30px;display:flex;flex-wrap:wrap;align-content:flex-end;justify-content:center;column-gap:8px;row-gap:0;z-index:1;}'
  + '.ss-stage.is-six .ss-spots{left:12%;right:12%;} .ss-stage.is-six .ss-spot{flex:0 0 31%;min-width:0;}'
  + '.ss-spot{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-width:96px;padding-bottom:6px;}'
  + '.ss-wrap.is-narrow .ss-spot{min-width:64px;}'
  + '.ss-pool{position:absolute;left:50%;bottom:0;width:150px;height:40px;margin-left:-75px;border-radius:50%;background:radial-gradient(ellipse at 50% 50%,#FFF6C8 0%,#FFE9A0 55%,rgba(255,240,180,0) 72%);opacity:0;transition:opacity .2s,transform .25s;}'
  + '.ss-spot.is-on .ss-pool{opacity:1;} .ss-stage.is-rest .ss-pool{opacity:.45;} .ss-stage.sz-big .ss-pool{transform:scale(1.35,1.2);} .ss-stage.sz-small .ss-pool{transform:scale(.6,.7);}'
  + '.ss-stage.is-six .ss-pool{width:110px;margin-left:-55px;height:30px;}'
  + '.ss-actor{position:relative;z-index:1;display:block;line-height:0;} .ss-actimg{display:block;object-fit:contain;}'
  + '.ss-stage.is-clue .ss-actor{opacity:.72;}'
  /* the acts */
  + '.ss-stage.act-run .ss-actor{animation:ssRun .9s ease-in-out infinite alternate;} @keyframes ssRun{0%{transform:translateX(-18px);}100%{transform:translateX(18px);}}'
  + '.ss-stage.act-nap .ss-actor{transform:rotate(-12deg);transition:transform .3s;} .ss-stage.act-nap .ss-back{filter:brightness(.7);}'
  + '.ss-stage.act-glow .ss-actor{animation:ssGlow 1s ease-in-out infinite;} @keyframes ssGlow{50%{filter:drop-shadow(0 0 14px #FFD45E);}}'
  + '.ss-stage.act-peck .ss-actor{animation:ssPeck .6s ease-in-out infinite;transform-origin:50% 100%;} @keyframes ssPeck{50%{transform:rotate(14deg);}}'
  + '.ss-stage.act-shake .ss-actor{animation:ssShake .25s linear infinite;} @keyframes ssShake{25%{transform:translate(-3px,1px);}75%{transform:translate(3px,-1px);}}'
  + '.ss-stage.act-hop .ss-actor{animation:ssHop .55s ease-in-out infinite;} @keyframes ssHop{50%{transform:translateY(-22px);}}'
  + '.ss-stage.act-dig .ss-actor{animation:ssDig .5s ease-in-out infinite;} @keyframes ssDig{50%{transform:translateY(8px) rotate(-6deg);}}'
  + '.ss-stage.act-rise .ss-actor{animation:ssRise 1.1s ease-in-out infinite alternate;} @keyframes ssRise{100%{transform:translateY(-30px);}}'
  + '.ss-stage.act-fall .ss-actor{animation:ssFall .9s ease-in infinite;} @keyframes ssFall{0%{transform:translateY(-26px);}100%{transform:translateY(0);}}'
  + '.ss-stage.is-q .ss-actor{transform:rotate(8deg);} .ss-stage.is-ask .ss-actor{animation:ssAsk 1.2s ease-in-out infinite;} @keyframes ssAsk{50%{transform:rotate(-10deg);}}'
  + '.ss-stage.is-frozen .ss-actor{animation-play-state:paused !important;filter:grayscale(.35);}'
  + '.ss-stage.is-bow .ss-actor{animation:ssBow .7s ease-in-out 2;transform-origin:50% 100%;} @keyframes ssBow{50%{transform:rotate(18deg) translateY(4px);}}'
  + '.ss-shimmer{position:absolute;inset:6px;pointer-events:none;opacity:0;background:repeating-linear-gradient(115deg,rgba(255,220,140,0) 0 18px,rgba(255,220,140,.28) 18px 26px);} .ss-stage.is-fx .ss-shimmer{opacity:1;animation:ssShim 1.6s linear infinite;} @keyframes ssShim{100%{background-position:60px 0;}}'
  + '.ss-stars{position:absolute;inset:6px;pointer-events:none;opacity:0;} .ss-stars i{position:absolute;width:26px;height:26px;background:#FFD45E;clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%);}'
  + '.ss-stars i:nth-child(1){left:14%;top:16%;} .ss-stars i:nth-child(2){right:16%;top:12%;} .ss-stars i:nth-child(3){left:30%;top:40%;transform:scale(.7);} .ss-stars i:nth-child(4){right:28%;top:44%;transform:scale(.8);}'
  + '.ss-stage.is-shout .ss-stars{opacity:1;animation:ssStars .8s ease-out infinite alternate;} @keyframes ssStars{100%{transform:scale(1.12);}}'
  /* the curtains */
  + '.ss-curtain{position:absolute;top:6px;bottom:6px;width:52%;z-index:3;background:repeating-linear-gradient(90deg,#E0663A 0 18px,#C9532B 18px 22px);box-shadow:inset 0 0 0 3px #A8431F;transition:transform .35s ease-in-out;}'
  + '.ss-curtain.l{left:6px;border-radius:8px 0 0 8px;transform-origin:0 0;} .ss-curtain.r{right:6px;border-radius:0 8px 8px 0;transform-origin:100% 0;}'
  + '.ss-stage.c-open .ss-curtain.l{transform:translateX(-82%);} .ss-stage.c-open .ss-curtain.r{transform:translateX(82%);}'
  + '.ss-valance{position:absolute;left:6px;right:6px;top:6px;height:22px;z-index:4;background:radial-gradient(circle at 12px -2px,#C9532B 13px,transparent 14px) 0 0/24px 22px repeat-x,#E0663A;box-shadow:inset 0 -3px 0 #A8431F;}'
  + '.ss-posters{position:absolute;z-index:5;right:12px;top:30px;display:flex;gap:3px;} .ss-posters i{display:block;width:11px;height:15px;border-radius:2px;background:#FFFDF4;box-shadow:inset 0 0 0 2px #E0A15E;}'
  /* the script line */
  + '.ss-rail{position:relative;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:8px;padding:10px 26px 10px 10px;border-radius:12px;background:#C79A63;box-shadow:inset 0 0 0 3px #8C6239,0 4px 0 #8C6239;min-height:76px;}'
  + '.ss-slot{display:inline-flex;align-items:center;justify-content:center;min-width:72px;min-height:56px;padding:4px 12px;box-sizing:border-box;border-radius:10px;font-family:' + H + ';font-weight:800;font-size:24px;line-height:1.1;color:' + INK + ';}'
  + '.ss-slot.is-empty{border:3px dashed #FFF1D6;background:rgba(255,241,214,.18);}'
  + '.ss-slot.is-full{border:0;background:#FFF8E8;box-shadow:inset 0 0 0 3px #C9B48E,0 3px 0 #8C6239;cursor:pointer;} .ss-slot.is-full:disabled{cursor:default;}'
  + '.ss-slot.is-ok{background:#DDF1EC;box-shadow:inset 0 0 0 3px #2E8C7E,0 3px 0 #1B5F55;}'
  + '.ss-slot.is-stop{box-shadow:inset 0 0 0 4px #F2784B,0 3px 0 #8C6239;animation:ssFlick .5s ease-in-out 3;} .ss-slot.is-empty.is-stop{border-color:#F2784B;} @keyframes ssFlick{50%{transform:translateY(-3px) rotate(-2deg);}}'
  + '.ss-slot.is-glow{border-color:#2E8C7E;box-shadow:0 0 0 4px rgba(46,140,126,.35);}'
  + '.ss-metro{position:absolute;right:9px;top:50%;width:10px;height:10px;margin-top:-5px;border-radius:50%;background:#FFF1D6;box-shadow:0 0 0 2px #8C6239;animation:ssMetro .9s ease-in-out infinite;} .ss-wrap.sp-quick .ss-metro{background:#F2784B;animation-duration:.5s;} @keyframes ssMetro{50%{transform:scale(.45);}}'
  /* the wings */
  + '.ss-wings{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;padding:10px;border-radius:12px;background:#EFE3C8;box-shadow:inset 0 0 0 3px #D9C29A;min-height:60px;}'
  + '.ss-block{display:inline-flex;align-items:center;justify-content:center;min-width:56px;min-height:56px;padding:4px 14px;border:0;border-radius:10px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #C9B48E;font-family:' + H + ';font-weight:800;font-size:24px;line-height:1.1;color:' + INK + ';cursor:pointer;} .ss-block:disabled{cursor:default;}'
  + '.ss-block.is-mark{min-width:56px;font-size:28px;color:#8C4A1E;}'
  + '.ss-block.is-glow{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 5px rgba(46,140,126,.3),0 4px 0 #1B5F55;}'
  + '.ss-wingsempty{display:block;height:40px;}'
  + '.ss-foot{display:flex;justify-content:center;} .ss-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;box-shadow:0 5px 0 #0E4A41;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .ss-check:disabled{opacity:.5;cursor:default;}'
  + '.ss-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .ss-note.is-hint{color:#9A3D1C;}'
  + '.ss-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.ss-wrap.is-narrow,.ss-wrap.is-narrow .ss-main{gap:9px;} .ss-wrap.is-narrow .ss-theatre{gap:6px;}'
  + '.ss-wrap.is-narrow .ss-stage{min-height:168px;} .ss-wrap.is-narrow .ss-stage.is-six{min-height:174px;} .ss-wrap.is-narrow .ss-floor{height:38px;} .ss-wrap.is-narrow .ss-back{bottom:32px;} .ss-wrap.is-narrow .ss-spots{left:10px;right:10px;top:26px;bottom:8px;column-gap:4px;}'
  + '.ss-wrap.is-narrow .ss-stage.is-six .ss-spots{left:14%;right:14%;} .ss-wrap.is-narrow .ss-pool{width:104px;margin-left:-52px;height:28px;} .ss-wrap.is-narrow .ss-stage.is-six .ss-pool{width:76px;margin-left:-38px;height:22px;} .ss-wrap.is-narrow .ss-valance{height:18px;background-size:20px 18px;}'
  + '.ss-wrap.is-narrow .ss-photo{padding:7px;} .ss-wrap.is-narrow .ss-curtain{width:52%;}'
  + '.ss-wrap.is-narrow .ss-rail{gap:6px;padding:8px 22px 8px 8px;min-height:64px;} .ss-wrap.is-narrow .ss-slot{min-width:56px;min-height:48px;padding:2px 9px;font-size:20px;}'
  + '.ss-wrap.is-narrow .ss-wings{gap:6px;padding:8px;} .ss-wrap.is-narrow .ss-block{min-width:48px;min-height:48px;padding:2px 10px;font-size:20px;} .ss-wrap.is-narrow .ss-block.is-mark{font-size:24px;}'
  + '.ss-wrap.is-narrow .ss-check{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .ss-wrap.is-narrow .ss-note{font-size:17px;}'
  + '.ss-wrap.is-tiny,.ss-wrap.is-tiny .ss-main{gap:6px;} .ss-wrap.is-tiny .ss-stage{min-height:140px;} .ss-wrap.is-tiny.k-write .ss-stage{min-height:124px;} .ss-wrap.is-tiny .ss-valance{display:none;} .ss-wrap.is-tiny .ss-spots{top:10px;}'
  + '.ss-wrap.is-tiny .ss-slot{min-width:46px;min-height:44px;padding:2px 7px;font-size:18px;} .ss-wrap.is-tiny .ss-block{min-width:44px;min-height:44px;padding:2px 8px;font-size:18px;} .ss-wrap.is-tiny .ss-rail,.ss-wrap.is-tiny .ss-wings{gap:5px;padding:6px 20px 6px 6px;} .ss-wrap.is-tiny .ss-wings{padding:6px;}'
  /* a solved round on a phone: the wings and Check give their room to the shell's Next */
  + '.ss-wrap.is-narrow.is-done .ss-wings,.ss-wrap.is-narrow.is-done .ss-foot{display:none;}'
  + '.ss-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.ss-wrap *{animation:none !important;transition:none !important;}}'
  + '.ss-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'ss-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.SentenceStageActivity = SentenceStageActivity;
