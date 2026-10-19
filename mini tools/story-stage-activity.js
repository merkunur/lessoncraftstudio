/* =====================================================================
   story-stage-activity.js — ACTIVITY #24 of the one-by-one rebuild:
   "Solve the Story" (K.OA.A.2) — THE STORY STAGE.
   Design sheet: docs/activities-rebuild/designs/024-ten-frame.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: every sentence of the story is a stage direction. The
   narrator's line acts itself out — its things arrive on a ten-frame stage
   one by one. Then it is the child's line: the child performs it — brings
   more birds from the pile, or taps balloons so they pop and stay behind as
   a crossed outline. Only after the child has acted does the question wake
   the keypad. A wrong number replays the story at its TRUE numbers (each
   arriving or leaving thing numbered as it moves) and leaves the stage
   telling the true story; a second miss numbers the things still there up
   to a question mark. The operation comes from what happens, never from a
   sign. "Tell your own" is free play: a pile, the stage and a sentence that
   writes itself.
   No mascot: library pictures on a ten-frame, a pile, a story card, keys.

   ACTIVITY LAYER ONLY: the model is story-stage-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by the stage when the answer
   is right). Test seams: window.StoryStageActivity.st / ._order / ._pool /
   .FAST (short pauses for the gates).
   ===================================================================== */
'use strict';

var StoryStageActivity = {
  id: 'story-stage',
  apparatusClasses: ['ss-'],

  strings: {
    title:        {en:'The Story Stage',de:'Die Geschichtenbühne',fr:'La scène des histoires',it:'Il palco delle storie',es:'El escenario de los cuentos',pt:'O palco das histórias',nl:'Het verhalenpodium',sv:'Berättelsescenen',da:'Historiescenen',no:'Fortellingsscenen',fi:'Tarinanäyttämö'},
    instruction:  {en:'Act out each line of the story on the stage. Then type how many there are.',de:'Spiel jede Zeile der Geschichte auf der Bühne nach. Dann tippe ein, wie viele es sind.',fr:'Joue chaque ligne de l’histoire sur la scène. Puis tape combien il y en a.',it:'Recita ogni riga della storia sul palco. Poi scrivi quanti sono.',es:'Actúa cada línea del cuento en el escenario. Luego escribe cuántos hay.',pt:'Encene cada frase da história no palco. Depois digite quantos são.',nl:'Speel elke zin van het verhaal na op het podium. Typ dan hoeveel het er zijn.',sv:'Spela upp varje rad i berättelsen på scenen. Skriv sedan hur många det är.',da:'Spil hver linje i historien på scenen. Skriv så, hvor mange der er.',no:'Spill hver linje i fortellingen på scenen. Skriv så hvor mange det er.',fi:'Näyttele tarinan jokainen rivi näyttämöllä. Kirjoita sitten, montako niitä on.'},
    taskLine:     {en:'Act out the story, then type how many.',de:'Spiel die Geschichte nach und tippe, wie viele.',fr:'Joue l’histoire, puis tape combien.',it:'Recita la storia, poi scrivi quanti.',es:'Actúa el cuento y escribe cuántos.',pt:'Encene a história e digite quantos.',nl:'Speel het verhaal na en typ hoeveel.',sv:'Spela upp berättelsen och skriv hur många.',da:'Spil historien, og skriv hvor mange.',no:'Spill fortellingen og skriv hvor mange.',fi:'Näyttele tarina ja kirjoita, montako.'},
    nextLine:     {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próxima',nl:'Verder',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    wholeStory:   {en:'Show the whole story',de:'Ganze Geschichte zeigen',fr:'Voir toute l’histoire',it:'Mostra tutta la storia',es:'Ver todo el cuento',pt:'Ver a história inteira',nl:'Hele verhaal tonen',sv:'Visa hela berättelsen',da:'Vis hele historien',no:'Vis hele fortellingen',fi:'Näytä koko tarina'},
    speak:        {en:'Read the story aloud',de:'Geschichte vorlesen',fr:'Lire l’histoire à voix haute',it:'Leggi la storia ad alta voce',es:'Leer el cuento en voz alta',pt:'Ler a história em voz alta',nl:'Verhaal voorlezen',sv:'Läs upp berättelsen',da:'Læs historien højt',no:'Les fortellingen høyt',fi:'Lue tarina ääneen'},
    supply:       {en:'Bring one more',de:'Noch eins dazuholen',fr:'En ajouter un',it:'Aggiungine uno',es:'Agregar uno más',pt:'Trazer mais um',nl:'Er eentje bij doen',sv:'Ta en till',da:'Hent én mere',no:'Hent én til',fi:'Tuo yksi lisää'},
    check:        {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Verifica',es:'Comprobar',pt:'Verificar',nl:'Controleer',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    hintAct:      {en:'Act out this line first.',de:'Spiel zuerst diese Zeile nach.',fr:'Joue d’abord cette ligne.',it:'Prima recita questa riga.',es:'Primero actúa esta línea.',pt:'Primeiro encene esta frase.',nl:'Speel eerst deze zin na.',sv:'Spela upp den här raden först.',da:'Spil først denne linje.',no:'Spill denne linjen først.',fi:'Näyttele ensin tämä rivi.'},
    hintTurnAdd:  {en:'Your turn: bring them onto the stage.',de:'Du bist dran: Hol sie auf die Bühne.',fr:'À toi : amène-les sur la scène.',it:'Tocca a te: porta altre figure sul palco.',es:'Te toca: trae más dibujos al escenario.',pt:'Sua vez: traga mais figuras para o palco.',nl:'Jouw beurt: haal ze op het podium.',sv:'Din tur: hämta dem till scenen.',da:'Din tur: hent dem op på scenen.',no:'Din tur: hent dem opp på scenen.',fi:'Sinun vuorosi: tuo ne näyttämölle.'},
    hintTurnTake: {en:'Your turn: tap the ones that go away.',de:'Du bist dran: Tipp die an, die weggehen.',fr:'À toi\u00a0: touche les images qui s’en vont.',it:'Tocca a te: tocca quelli che vanno via.',es:'Te toca: toca los dibujos que se van.',pt:'Sua vez: toque nas figuras que vão embora.',nl:'Jouw beurt: tik op wat er weggaat.',sv:'Din tur: tryck på dem som försvinner.',da:'Din tur: tryk på dem, der forsvinder.',no:'Din tur: trykk på dem som forsvinner.',fi:'Sinun vuorosi: napauta niitä, jotka lähtevät.'},
    hintAsk:      {en:'Count what is on the stage and type the number.',de:'Zähl, was auf der Bühne ist, und tippe die Zahl.',fr:'Compte ce qu’il y a sur la scène et tape le nombre.',it:'Conta quello che c’è sul palco e scrivi il numero.',es:'Cuenta lo que hay en el escenario y escribe el número.',pt:'Conte o que tem no palco e digite o número.',nl:'Tel wat er op het podium staat en typ het getal.',sv:'Räkna det som finns på scenen och skriv talet.',da:'Tæl det, der er på scenen, og skriv tallet.',no:'Tell det som er på scenen, og skriv tallet.',fi:'Laske, mitä näyttämöllä on, ja kirjoita luku.'},
    hintAskLeft:  {en:'Count what is still on the stage and type the number.',de:'Zähl, was noch auf der Bühne ist, und tippe die Zahl.',fr:'Compte ce qui reste sur la scène et tape le nombre.',it:'Conta quello che è ancora sul palco e scrivi il numero.',es:'Cuenta lo que sigue en el escenario y escribe el número.',pt:'Conte o que ainda está no palco e digite o número.',nl:'Tel wat er nog op het podium staat en typ het getal.',sv:'Räkna det som är kvar på scenen och skriv talet.',da:'Tæl det, der stadig er på scenen, og skriv tallet.',no:'Tell det som fortsatt er på scenen, og skriv tallet.',fi:'Laske, mitä näyttämöllä on vielä, ja kirjoita luku.'},
    hintReplayLeft:{en:'Watch the story again. Count what is still on the stage.',de:'Schau dir die Geschichte noch einmal an. Zähl, was noch auf der Bühne ist.',fr:'Regarde encore l’histoire. Compte ce qui reste sur la scène.',it:'Guarda di nuovo la storia. Conta quello che è ancora sul palco.',es:'Mira el cuento otra vez. Cuenta lo que sigue en el escenario.',pt:'Veja a história de novo. Conte o que ainda está no palco.',nl:'Kijk nog eens naar het verhaal. Tel wat er nog op het podium staat.',sv:'Titta på berättelsen igen. Räkna det som är kvar på scenen.',da:'Se historien igen. Tæl det, der stadig er på scenen.',no:'Se fortellingen igjen. Tell det som fortsatt er på scenen.',fi:'Katso tarina uudelleen. Laske, mitä näyttämöllä on vielä.'},
    hintReplayAll:{en:'Watch the story again. Count everything on the stage.',de:'Schau dir die Geschichte noch einmal an. Zähl alles auf der Bühne.',fr:'Regarde encore l’histoire. Compte tout ce qu’il y a sur la scène.',it:'Guarda di nuovo la storia. Conta tutto quello che c’è sul palco.',es:'Mira el cuento otra vez. Cuenta todo lo que hay en el escenario.',pt:'Veja a história de novo. Conte tudo o que está no palco.',nl:'Kijk nog eens naar het verhaal. Tel alles op het podium.',sv:'Titta på berättelsen igen. Räkna allt på scenen.',da:'Se historien igen. Tæl alt på scenen.',no:'Se fortellingen igjen. Tell alt på scenen.',fi:'Katso tarina uudelleen. Laske kaikki näyttämöllä.'},
    hintStory:    {en:'The story says {b}, not {k}.',de:'In der Geschichte steht {b}, nicht {k}.',fr:'L’histoire dit {b}, pas {k}.',it:'La storia dice {b}, non {k}.',es:'El cuento dice {b}, no {k}.',pt:'A história diz {b}, não {k}.',nl:'In het verhaal staat {b}, niet {k}.',sv:'Berättelsen säger {b}, inte {k}.',da:'Historien siger {b}, ikke {k}.',no:'Fortellingen sier {b}, ikke {k}.',fi:'Tarinassa luku on {b}, ei {k}.'},
    hintBright:   {en:'Count only the ones that are still there.',de:'Zähl nur die, die noch da sind.',fr:'Compte seulement les images encore là.',it:'Conta solo le figure che sono ancora lì.',es:'Cuenta solo los dibujos que siguen ahí.',pt:'Conte só as figuras que ainda estão lá.',nl:'Tel alleen wat er nog is.',sv:'Räkna bara dem som är kvar.',da:'Tæl kun dem, der stadig er der.',no:'Tell bare dem som fortsatt er der.',fi:'Laske vain ne, jotka ovat vielä paikalla.'},
    hintEvery:    {en:'Count every one.',de:'Zähl jedes einzelne.',fr:'Compte toutes les images.',it:'Conta tutte le figure.',es:'Cuenta todos los dibujos.',pt:'Conte todas as figuras.',nl:'Tel ze allemaal.',sv:'Räkna alla.',da:'Tæl dem alle.',no:'Tell alle sammen.',fi:'Laske jokainen.'},
    hintNumbers:  {en:'Which number goes where the question mark is?',de:'Welche Zahl gehört zum Fragezeichen?',fr:'Quel nombre va à la place du point d’interrogation ?',it:'Quale numero va al posto del punto interrogativo?',es:'¿Qué número va donde está el signo de interrogación?',pt:'Qual número vai no lugar do ponto de interrogação?',nl:'Welk getal hoort bij het vraagteken?',sv:'Vilket tal ska stå vid frågetecknet?',da:'Hvilket tal hører til spørgsmålstegnet?',no:'Hvilket tall hører til spørsmålstegnet?',fi:'Mikä luku kuuluu kysymysmerkin paikalle?'},
    sumAdd:       {en:'{a} and {b} more make {c}.',de:'{a} und {b} dazu sind {c}.',fr:'{a} et encore {b}, ça fait {c}.',it:'{a} e ancora {b} fanno {c}.',es:'{a} y {b} más son {c}.',pt:'{a} e mais {b} são {c}.',nl:'{a} en er {b} bij is {c}.',sv:'{a} och {b} till blir {c}.',da:'{a} og {b} mere giver {c}.',no:'{a} og {b} til blir {c}.',fi:'{a} ja vielä {b} on yhteensä {c}.'},
    sumTake:      {en:'{a} take away {b} leaves {c}.',de:'Von {a} gehen {b} weg, {c} bleiben übrig.',fr:'{a} moins {b}, il en reste {c}.',it:'{a} meno {b}: ne restano {c}.',es:'{a} menos {b}: quedan {c}.',pt:'{a} menos {b}: sobram {c}.',nl:'{a} min {b}, dan blijven er {c} over.',sv:'{a} minus {b}, då är {c} kvar.',da:'{a} minus {b}, så er der {c} tilbage.',no:'{a} minus {b}, da er det {c} igjen.',fi:'{a} miinus {b}, jäljelle jää {c}.'},
    sumTakeB1:    {en:'{a} take away 1 leaves {c}.',de:'Von {a} geht 1 weg, {c} bleiben übrig.',fr:'{a} moins 1, il en reste {c}.',it:'{a} meno 1: ne restano {c}.',es:'{a} menos 1: quedan {c}.',pt:'{a} menos 1: sobram {c}.',nl:'{a} min 1, dan blijven er {c} over.',sv:'{a} minus 1, då är {c} kvar.',da:'{a} minus 1, så er der {c} tilbage.',no:'{a} minus 1, da er det {c} igjen.',fi:'{a} miinus 1, jäljelle jää {c}.'},
    sumTake1:     {en:'{a} take away {b} leaves 1.',de:'Von {a} gehen {b} weg, 1 bleibt übrig.',fr:'{a} moins {b}, il en reste 1.',it:'{a} meno {b}: ne resta 1.',es:'{a} menos {b}: queda 1.',pt:'{a} menos {b}: sobra 1.',nl:'{a} min {b}, dan blijft er 1 over.',sv:'{a} minus {b}, då är 1 kvar.',da:'{a} minus {b}, så er der 1 tilbage.',no:'{a} minus {b}, da er det 1 igjen.',fi:'{a} miinus {b}, jäljelle jää 1.'},
    sumPut:       {en:'{a} and {b} make {c}.',de:'{a} und {b} sind zusammen {c}.',fr:'{a} et {b}, ça fait {c}.',it:'{a} e {b} fanno {c}.',es:'{a} y {b} son {c}.',pt:'{a} e {b} são {c}.',nl:'{a} en {b} is samen {c}.',sv:'{a} och {b} blir {c}.',da:'{a} og {b} giver {c}.',no:'{a} og {b} blir {c}.',fi:'{a} ja {b} on yhteensä {c}.'},
    play:         {en:'Tell your own',de:'Erzähl deine eigene',fr:'Invente ton histoire',it:'Inventa la tua storia',es:'Inventa tu cuento',pt:'Invente sua história',nl:'Verzin je eigen verhaal',sv:'Hitta på en egen',da:'Find på din egen',no:'Lag din egen',fi:'Keksi oma tarina'},
    playBack:     {en:'Back to the story',de:'Zurück zur Geschichte',fr:'Retour à l’histoire',it:'Torna alla storia',es:'Volver al cuento',pt:'Voltar à história',nl:'Terug naar het verhaal',sv:'Tillbaka till berättelsen',da:'Tilbage til historien',no:'Tilbake til fortellingen',fi:'Takaisin tarinaan'},
    playAgain:    {en:'Start again',de:'Neu anfangen',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Start forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    playHint:     {en:'Tap the pile to put some on the stage.',de:'Tipp auf den Stapel, um welche auf die Bühne zu holen.',fr:'Touche la pile pour en mettre sur la scène.',it:'Tocca la pila per metterne qualcuno sul palco.',es:'Toca la pila para poner algunos en el escenario.',pt:'Toque na pilha para colocar alguns no palco.',nl:'Tik op de stapel om er een paar op het podium te zetten.',sv:'Tryck på högen för att lägga några på scenen.',da:'Tryk på bunken for at sætte nogle på scenen.',no:'Trykk på bunken for å sette noen på scenen.',fi:'Napauta pinoa, niin saat niitä näyttämölle.'},
    playStart:    {en:'There are {n}.',de:'Da sind {n}.',fr:'Il y en a {n}.',it:'Ce ne sono {n}.',es:'Hay {n}.',pt:'Tem {n}.',nl:'Er zijn er {n}.',sv:'Det är {n}.',da:'Der er {n}.',no:'Det er {n}.',fi:'Näyttämöllä on {n}.'},
    playStart1:   {en:'There is {n}.',de:'Da ist {n}.',fr:'Il y en a {n}.',it:'Ce n’è {n}.',es:'Hay {n}.',pt:'Tem {n}.',nl:'Er is er {n}.',sv:'Det är {n}.',da:'Der er {n}.',no:'Det er {n}.',fi:'Näyttämöllä on {n}.'},
    playMore:     {en:'{k} more come.',de:'{k} kommen dazu.',fr:'Il en arrive encore {k}.',it:'Ne arrivano ancora {k}.',es:'Llegan {k} más.',pt:'Chegam mais {k}.',nl:'Er komen er {k} bij.',sv:'{k} till kommer.',da:'{k} mere kommer.',no:'{k} til kommer.',fi:'{k} tulee lisää.'},
    playMore1:    {en:'{k} more comes.',de:'{k} kommt dazu.',fr:'Il en arrive encore {k}.',it:'Ne arriva ancora {k}.',es:'Llega {k} más.',pt:'Chega mais {k}.',nl:'Er komt er {k} bij.',sv:'{k} till kommer.',da:'{k} mere kommer.',no:'{k} til kommer.',fi:'{k} tulee lisää.'},
    playAway:     {en:'{k} go away.',de:'{k} gehen weg.',fr:'{k} s’en vont.',it:'Ne vanno via {k}.',es:'Se van {k}.',pt:'Vão embora {k}.',nl:'Er gaan er {k} weg.',sv:'{k} går bort.',da:'{k} går væk.',no:'{k} går bort.',fi:'{k} lähtee pois.'},
    playAway1:    {en:'{k} goes away.',de:'{k} geht weg.',fr:'{k} s’en va.',it:'Ne va via {k}.',es:'Se va {k}.',pt:'Vai embora {k}.',nl:'Er gaat er {k} weg.',sv:'{k} går bort.',da:'{k} går væk.',no:'{k} går bort.',fi:'{k} lähtee pois.'},
    playNow:      {en:'Now there are {m}.',de:'Jetzt sind {m} da.',fr:'Maintenant, il y en a {m}.',it:'Adesso ce ne sono {m}.',es:'Ahora hay {m}.',pt:'Agora tem {m}.',nl:'Nu zijn er {m}.',sv:'Nu är det {m}.',da:'Nu er der {m}.',no:'Nå er det {m}.',fi:'Nyt näyttämöllä on {m}.'},
    playNow1:     {en:'Now there is {m}.',de:'Jetzt ist {m} da.',fr:'Maintenant, il y en a {m}.',it:'Adesso ce n’è {m}.',es:'Ahora hay {m}.',pt:'Agora tem {m}.',nl:'Nu is er {m}.',sv:'Nu är det {m}.',da:'Nu er der {m}.',no:'Nå er det {m}.',fi:'Nyt näyttämöllä on {m}.'},
    playNone:     {en:'Now there are none.',de:'Jetzt ist nichts mehr da.',fr:'Maintenant, il n’y en a plus.',it:'Adesso non ce n’è più nessuno.',es:'Ahora ya no hay ninguno.',pt:'Agora não tem nenhum.',nl:'Nu is er niets meer.',sv:'Nu är det inga kvar.',da:'Nu er der ingen tilbage.',no:'Nå er det ingen igjen.',fi:'Nyt näyttämöllä ei ole yhtään.'},
    placeLabel:   {en:'Place {p}: {s}',de:'Platz {p}: {s}',fr:'Case {p} : {s}',it:'Posto {p}: {s}',es:'Lugar {p}: {s}',pt:'Lugar {p}: {s}',nl:'Vakje {p}: {s}',sv:'Plats {p}: {s}',da:'Plads {p}: {s}',no:'Plass {p}: {s}',fi:'Paikka {p}: {s}'},
    sEmpty:       {en:'empty',de:'leer',fr:'vide',it:'vuoto',es:'vacío',pt:'vazio',nl:'leeg',sv:'tom',da:'tom',no:'tom',fi:'tyhjä'},
    sGone:        {en:'{s}, gone',de:'{s}, weg',fr:'{s}, plus là',it:'{s}, non c’è più',es:'{s}, ya no está',pt:'{s}, não está mais',nl:'{s}, weg',sv:'{s}, borta',da:'{s}, væk',no:'{s}, borte',fi:'{s}, poissa'},
    answerBox:    {en:'The answer',de:'Die Antwort',fr:'La réponse',it:'La risposta',es:'La respuesta',pt:'A resposta',nl:'Het antwoord',sv:'Svaret',da:'Svaret',no:'Svaret',fi:'Vastaus'},
    del:          {en:'Delete',de:'Löschen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Apagar',nl:'Wissen',sv:'Radera',da:'Slet',no:'Slett',fi:'Poista'},
    keysLabel:    {en:'Number keys',de:'Zahlentasten',fr:'Touches des nombres',it:'Tasti dei numeri',es:'Teclas de números',pt:'Teclas de números',nl:'Cijfertoetsen',sv:'Siffertangenter',da:'Taltaster',no:'Talltaster',fi:'Numeronäppäimet'},
    setNumbers:   {en:'Numbers',de:'Zahlen',fr:'Nombres',it:'Numeri',es:'Números',pt:'Números',nl:'Getallen',sv:'Tal',da:'Tal',no:'Tall',fi:'Luvut'},
    within5:      {en:'Within 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opp til 5',fi:'5:een asti'},
    within10:     {en:'Within 10',de:'Bis 10',fr:'Jusqu’à 10',it:'Fino a 10',es:'Hasta 10',pt:'Até 10',nl:'Tot en met 10',sv:'Upp till 10',da:'Op til 10',no:'Opp til 10',fi:'10:een asti'},
    within20:     {en:'Within 20',de:'Bis 20',fr:'Jusqu’à 20',it:'Fino a 20',es:'Hasta 20',pt:'Até 20',nl:'Tot en met 20',sv:'Upp till 20',da:'Op til 20',no:'Opp til 20',fi:'20:een asti'},
    setRead:      {en:'Read aloud',de:'Vorlesen',fr:'Lecture à voix haute',it:'Lettura ad alta voce',es:'Leer en voz alta',pt:'Ler em voz alta',nl:'Voorlezen',sv:'Läs upp',da:'Læs højt',no:'Les høyt',fi:'Lue ääneen'},
    readOn:       {en:'On',de:'An',fr:'Oui',it:'Sì',es:'Sí',pt:'Sim',nl:'Aan',sv:'På',da:'Til',no:'På',fi:'Päällä'},
    readOff:      {en:'Off',de:'Aus',fr:'Non',it:'No',es:'No',pt:'Não',nl:'Uit',sv:'Av',da:'Fra',no:'Av',fi:'Pois'}
  },

  defaults: { numbers: 'within10', read: 'on' },
  settings: [
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: 'within5', labelKey: 'within5' }, { value: 'within10', labelKey: 'within10' }, { value: 'within20', labelKey: 'within20' }] },
    { key: 'read', type: 'choice', labelKey: 'setRead', options: [{ value: 'on', labelKey: 'readOn' }, { value: 'off', labelKey: 'readOff' }] }
  ],

  /* motion timings (FAST = the gates' short pauses) */
  STEP_MS: 300, CHECK_MS: 1300, FAST: false,
  THEMES: ['spring', 'At the Supermarket', 'farm animals', 'toys', 'bakery', 'pets'],

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._acting = false; this._replay = null; this._timers = []; this._ro = null; this._fresh = {}; this._left = {}; this._bow = false;
    this._themes = {};
    injectStoryStageCSS();
    if (typeof LCSPictures !== 'undefined') {
      this.THEMES.forEach(function (dir) {
        LCSPictures.load(dir).then(function (th) { self._themes[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* the place stays bare */ });
      });
    }
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur();
      if (!st || st.explore || st.done) return;
      if (/^[0-9]$/.test(ev.key) && st.line === 2) {
        var v = ev.key;
        if (st.level !== 'within20') { v = (st.typed === '1' && ev.key === '0') ? '10' : ev.key; if (v === '0') return; }
        self._key(v); ev.preventDefault();
      } else if (ev.key === 'Backspace' && st.line === 2) { self._del(); ev.preventDefault(); }
      else if ((ev.key === 'n' || ev.key === 'N') && StoryStageCore.canAsk(st)) { self._ask(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    this._pool = null; this._order = null; this._playing = false;
    if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? Math.min(ms, 40) : ms; },

  /* ---------------- rounds ---------------- */
  _level: function () { return StoryStageCore.level(this.api && this.api.settings && this.api.settings.numbers); },
  _readAloud: function () { return !(this.api && this.api.settings && this.api.settings.read === 'off'); },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = StoryStageCore.rounds(key); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = StoryStageCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = StoryStageCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    return {
      id: 'story-stage.' + r.id,
      promptKey: 'taskLine',
      promptArgs: { a: r.a, b: r.b, c: r.answer },
      celebrateKey: StoryStageCore.celebrateKey(r),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool.st = StoryStageCore.newState(r); tool._round = r; tool._playing = false;
        tool._busy = false; tool._acting = false; tool._replay = null; tool._fresh = {}; tool._left = {}; tool._bow = false;
        tool._later(function () { tool._startStory(); }, 0);
      },
      /* the stage presses Check itself when the typed answer is right */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },

  /* the narrator's line acts itself: a reading pause, then its things arrive one by one */
  _startStory: function () {
    var st = this.st, self = this;
    if (!st || st.line !== 0 || this._acting) return;
    this._acting = true;
    var lines = StoryStageCore.sentences(this.api.lang, this._round);
    if (this._readAloud()) this._say(lines[0]);
    this._paint();
    var step = function () {
      if (self.st !== st) return;
      var i = StoryStageCore.actOne(st);
      if (i >= 0) { self._fresh = {}; self._fresh[i] = 'in'; self.api.sound(520 + 30 * (i % 10)); }
      if (st.line === 0) { self._paint(); self._later(step, self._ms(self.STEP_MS)); return; }
      self._acting = false;
      self._paint();
      if (self._readAloud()) self._later(function () { if (self.st === st && st.line === 1) self._say(lines[1]); }, self._ms(500));
    };
    this._later(step, this._ms(StoryStageCore.pause(lines[0], this._readAloud())));
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, t = api.t, self = this;
    if (!this.st) { this._round = StoryStageCore.rounds('within10')[0]; this.st = StoryStageCore.newState(this._round); }
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'ss-wrap'); this._wrap = wrap;

    /* the story card */
    var card = api.el('div', 'ss-card');
    var head = api.el('div', 'ss-cardtools');
    var say = api.el('button', 'ss-say'); say.type = 'button';
    say.innerHTML = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16.5 8.5a5 5 0 0 1 0 7"/><path class="ss-say-off" d="M3 3l18 18"/></svg>';
    say.addEventListener('click', function () { self._sayStory(); }); this._sayBtn = say;
    var playBtn = api.el('button', 'ss-tool ss-playbtn'); playBtn.type = 'button';
    playBtn.innerHTML = ICONS.pen + '<span class="ss-playlab"></span>';
    playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn;
    var again = api.el('button', 'ss-tool ss-again'); again.type = 'button'; again.addEventListener('click', function () { self._playAgain(); }); this._againBtn = again;
    var more = api.el('button', 'ss-more'); more.type = 'button';
    more.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>';
    more.addEventListener('click', function () { self._showAll = !self._showAll; self._wrap.classList.toggle('is-all', self._showAll); });
    this._moreBtn = more;
    head.appendChild(more); head.appendChild(again); head.appendChild(playBtn); head.appendChild(say);
    card.appendChild(head);
    var lines = api.el('div', 'ss-lines'); this._linesEl = lines;
    card.appendChild(lines);
    wrap.appendChild(card);

    /* the stage: a band (picture label / the pile) above one or two ten-frames */
    var stg = api.el('div', 'ss-stage'); this._stage = stg;
    var band = api.el('div', 'ss-band'); this._band = band;
    var label = api.el('div', 'ss-label'); this._label = label; band.appendChild(label);
    var note = api.el('div', 'ss-note'); note.setAttribute('aria-live', 'polite'); this._note = note; band.appendChild(note);
    var pile = api.el('button', 'ss-pile'); pile.type = 'button'; this._pile = pile;
    pile.innerHTML = '<span class="ss-pile-back"></span><span class="ss-pile-back ss-pile-back2"></span>';
    this._bindPile(pile);
    band.appendChild(pile);
    stg.appendChild(band);
    var framesEl = api.el('div', 'ss-frames'); this._framesEl = framesEl;
    this._frameEls = []; this._placeEls = [];
    for (var f = 0; f < 2; f++) {
      var frame = api.el('div', 'ss-frame'); frame.setAttribute('role', 'group');
      for (var j = 0; j < StoryStageCore.FRAME; j++) {
        (function (i) {
          var pl = api.el('button', 'ss-place'); pl.type = 'button'; pl.setAttribute('data-i', String(i));
          pl.innerHTML = '<img class="ss-pic" alt="" aria-hidden="true" draggable="false"><span class="ss-counter"></span><svg class="ss-x" viewBox="0 0 40 40" aria-hidden="true"><path d="M10 10L30 30"/><path d="M30 10L10 30"/></svg><span class="ss-chip" aria-hidden="true"></span>';
          pl.addEventListener('click', function () { self._tap(i); });
          frame.appendChild(pl); self._placeEls[i] = pl;
        }(f * StoryStageCore.FRAME + j));
      }
      framesEl.appendChild(frame); this._frameEls.push(frame);
    }
    stg.appendChild(framesEl);
    wrap.appendChild(stg);

    /* the keypad row */
    var pad = api.el('div', 'ss-pad'); this._pad = pad;
    var keys = api.el('div', 'ss-keys'); keys.setAttribute('role', 'group'); this._keysEl = keys; pad.appendChild(keys);
    var row = api.el('div', 'ss-padrow');
    var box = api.el('div', 'ss-box'); box.setAttribute('role', 'status'); this._box = box; row.appendChild(box);
    var del = api.el('button', 'ss-del'); del.type = 'button';
    del.innerHTML = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 5H9l-6 7 6 7h12z"/><path d="M17 9l-6 6"/><path d="M11 9l6 6"/></svg>';
    del.addEventListener('click', function () { self._del(); }); this._delBtn = del; row.appendChild(del);
    var go = api.el('button', 'ss-go'); go.type = 'button'; go.addEventListener('click', function () { self._goPress(); }); this._go = go; row.appendChild(go);
    pad.appendChild(row);
    wrap.appendChild(pad);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _showAll: false,
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var st = this._cur(), L = this._L = StoryStageCore.layout(this._width(), st.frames);
    var w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide');
    w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.classList.toggle('is-tiny', this._width() < 300);
    w.style.setProperty('--ss-place', L.place + 'px');
    w.style.setProperty('--ss-pic', L.pic + 'px');
    w.style.setProperty('--ss-gap', L.gap + 'px');
    w.style.setProperty('--ss-pad', L.pad + 'px');
    w.style.setProperty('--ss-between', L.between + 'px');
    w.style.setProperty('--ss-tab', L.tab + 'px');
    w.style.setProperty('--ss-tabpic', L.tabPic + 'px');
    w.style.setProperty('--ss-key', L.key + 'px');
    w.style.setProperty('--ss-keyh', L.keyH + 'px');
    w.style.setProperty('--ss-box', L.box + 'px');
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- pictures ---------------- */
  _picSrc: function (name) {
    var p = StoryStageCore.PICS[name], th = p && this._themes[p[0]];
    if (!th || typeof LCSPictures === 'undefined') return '';
    try { return LCSPictures.url(th, p[1]); } catch (e) { return ''; }
  },
  _picLabel: function (name) {
    var p = StoryStageCore.PICS[name], th = p && this._themes[p[0]];
    if (!th || typeof LCSPictures === 'undefined') return '';
    try { return LCSPictures.label(th, p[1], this.api.lang, { plural: false }); } catch (e) { return ''; }
  },
  _pics: function (st) { return StoryStageCore.KINDS[st.kind].pics; },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this;
    if (!st || !this._wrap) return;
    if (this._L && this._L.frames !== st.frames) this._layout();
    var kind = StoryStageCore.KINDS[st.kind], pics = this._pics(st);
    var w = this._wrap;
    w.classList.toggle('is-play', !!st.explore);
    w.classList.toggle('is-done', !!st.done);
    w.classList.toggle('is-two', st.frames === 2);
    w.classList.toggle('is-take', st.type === 'take');
    this._stage.setAttribute('data-scene', kind.scene);

    this._paintLines(st);

    /* the band: the pile (open in add / put stories and free play) and, with counters, the picture label */
    var sk = StoryStageCore.supplyKind(st);
    var pileOn = sk >= 0 && !st.done && !this._replay;
    this._pile.hidden = sk < 0;
    this._pile.disabled = !pileOn || (!st.explore && st.line < 1);
    this._pile.classList.toggle('is-awake', !st.explore && st.line === 1 && StoryStageCore.acted(st) === 0);
    this._pile.setAttribute('aria-label', t('supply'));
    if (sk >= 0) {
      var top = this._pile.querySelector('.ss-pile-pic'), src = this._picSrc(pics[sk]);
      if (!top) { top = document.createElement('img'); top.className = 'ss-pile-pic'; top.alt = ''; top.draggable = false; top.setAttribute('aria-hidden', 'true'); this._pile.appendChild(top); }
      if (src && top.getAttribute('src') !== src) top.setAttribute('src', src);
      top.hidden = !src;
      var pileCounter = this._pile.querySelector('.ss-pile-counter');
      if (!pileCounter) { pileCounter = document.createElement('span'); pileCounter.className = 'ss-pile-counter'; this._pile.appendChild(pileCounter); }
      pileCounter.style.background = StoryStageCore.COUNTER[pics[sk]];
    }
    /* the label: with drawn counters the stage shows which picture each colour means */
    var labelHtml = '';
    if (st.counters) pics.forEach(function (p, k) { if (k === sk) return; labelHtml += '<span class="ss-lab"><img class="ss-lab-pic" alt="" aria-hidden="true" draggable="false" src="' + escAttr(self._picSrc(p)) + '"><span class="ss-lab-dot" style="background:' + StoryStageCore.COUNTER[p] + '"></span></span>'; });
    if (this._label.getAttribute('data-html') !== labelHtml) { this._label.innerHTML = labelHtml; this._label.setAttribute('data-html', labelHtml); }
    this._label.querySelectorAll('img').forEach(function (im) { if (!im.getAttribute('src')) im.hidden = true; });

    /* the places */
    var view = this._replay ? this._replay.view : st.places;
    var chips = this._replay ? this._replay.chips : StoryStageCore.chips(st);
    for (var f = 0; f < 2; f++) this._frameEls[f].hidden = f >= st.frames;
    var n = 0;
    for (var i = 0; i < this._placeEls.length; i++) {
      var pl = this._placeEls[i];
      if (i >= st.places.length) continue;
      var p = view[i], img = pl.querySelector('.ss-pic'), ctr = pl.querySelector('.ss-counter');
      var name = p ? pics[p.k] : null;
      pl.classList.toggle('is-full', !!p);
      pl.classList.toggle('is-out', !!(p && p.out));
      pl.classList.toggle('is-child', !!(p && p.who === 'c'));
      pl.classList.toggle('is-counter', !!st.counters);
      pl.setAttribute('data-leave', kind.leave || '');
      pl.classList.toggle('ss-in', this._fresh[i] === 'in');
      pl.classList.toggle('ss-leave', this._fresh[i] === 'out');
      pl.classList.toggle('ss-bow', !!(this._bow && p && !p.out));
      if (p && !p.out) { pl.style.setProperty('--ss-bow', (n * 80) + 'ms'); n++; }
      if (st.counters) { img.hidden = true; ctr.style.background = name ? StoryStageCore.COUNTER[name] : 'transparent'; }
      else {
        var src = name ? this._picSrc(name) : '';
        if (src) { if (img.getAttribute('src') !== src) img.setAttribute('src', src); img.hidden = false; } else { img.hidden = true; img.removeAttribute('src'); }
      }
      var ch = chips[i], chip = pl.querySelector('.ss-chip');
      chip.textContent = ch === '' || ch == null ? '' : String(ch);
      chip.classList.toggle('is-on', !(ch === '' || ch == null));
      chip.classList.toggle('is-q', ch === '?');
      chip.classList.toggle('is-change', !!(this._replay && this._replay.changeChip && this._replay.changeChip[i]));
      var canTap = !this._replay && !this._busy && !this._acting && !st.done && (st.explore || st.line >= 1);
      pl.disabled = !canTap;
      var lab = name ? this._picLabel(name) : '';
      var stxt = !p ? t('sEmpty') : (p.out ? interp(t('sGone'), { s: lab }) : lab);
      pl.setAttribute('aria-label', interp(t('placeLabel'), { p: i + 1, s: stxt }));
    }

    /* the note */
    var notes = [];
    var h = StoryStageCore.hint(st), wrong = false;
    if (this._replay) { h = { key: st.type === 'take' ? 'hintReplayLeft' : 'hintReplayAll', wrong: true }; }
    if (h && h.key) { notes.push(t(h.key)); if (h.more) notes.push(t(h.more)); if (h.story) notes.push(interp(t('hintStory'), h.story)); wrong = !!h.wrong; }
    var text = notes.join(' ');
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', wrong);
    this._note.classList.toggle('is-turn', !!(h && /^hintTurn/.test(h.key)));
    this._band.hidden = sk < 0 && !labelHtml && !text;

    /* the keypad */
    var keyset = StoryStageCore.keypad(st.explore ? { level: 'within10' } : st);
    if (this._keysEl.getAttribute('data-set') !== keyset.join(',')) {
      this._keysEl.innerHTML = '';
      keyset.forEach(function (v) { var b = self.api.el('button', 'ss-key'); b.type = 'button'; b.textContent = v; b.setAttribute('data-v', v); b.addEventListener('click', function () { self._key(v); }); self._keysEl.appendChild(b); });
      this._keysEl.setAttribute('data-set', keyset.join(','));
    }
    this._keysEl.setAttribute('aria-label', t('keysLabel'));
    var asking = !st.explore && st.line === 2 && !st.done;
    this._pad.classList.toggle('is-asleep', !asking);
    var ks = this._keysEl.children;
    for (var q = 0; q < ks.length; q++) {
      var kv = ks[q].getAttribute('data-v');
      ks[q].disabled = !asking || this._busy || !!this._replay || (st.level === 'within20' && kv === '0' && st.typed === '');
    }
    this._box.textContent = st.explore ? '' : (st.typed || '');
    this._box.setAttribute('aria-label', t('answerBox') + (st.typed ? ': ' + st.typed : ''));
    this._box.classList.toggle('is-awake', asking);
    this._box.classList.toggle('is-gold', !!st.done);
    this._box.classList.toggle('is-wrong', !!(st.last && st.last.slip === 'wrong' && st.help > 0 && !st.done));
    this._delBtn.setAttribute('aria-label', t('del')); this._delBtn.title = t('del');
    this._delBtn.disabled = !asking || !st.typed || this._busy;
    var asNext = st.explore ? st.line === 0 : st.line < 2;
    this._go.textContent = t(asNext ? 'nextLine' : 'check');
    this._go.classList.toggle('is-next', asNext);
    this._go.classList.toggle('is-awake', st.explore ? StoryStageCore.solid(st) > 0 && st.line === 0 : StoryStageCore.canAsk(st));
    this._go.disabled = this._busy || !!this._replay || this._acting || !!st.done || (st.explore && st.line !== 0) || (!st.explore && st.line === 0);
    this._go.hidden = !!st.explore && st.line !== 0;
    this._againBtn.textContent = t('playAgain');
    this._againBtn.hidden = !st.explore;
    this._keysEl.hidden = !!st.explore; this._box.hidden = !!st.explore; this._delBtn.hidden = !!st.explore;

    /* card tools */
    this._playBtn.querySelector('.ss-playlab').textContent = t(st.explore ? 'playBack' : 'play');
    this._playBtn.setAttribute('aria-label', t(st.explore ? 'playBack' : 'play')); this._playBtn.title = t(st.explore ? 'playBack' : 'play');
    this._playBtn.classList.toggle('is-back', !!st.explore);
    this._playBtn.disabled = this._busy || !!this._replay;
    this._sayBtn.setAttribute('aria-label', t('speak')); this._sayBtn.title = t('speak');
    this._moreBtn.setAttribute('aria-label', t('wholeStory')); this._moreBtn.title = t('wholeStory');
    this._sayBtn.classList.toggle('is-off', !this._readAloud());
    this._sayBtn.hidden = !!st.explore;
  },

  /* the story card: narrator ▸ · the child's line ✋ (+ Next) · the question ? */
  _paintLines: function (st) {
    var t = this.api.t, self = this, el = this._linesEl, rows = [];
    if (st.explore) {
      var pl = StoryStageCore.playLines(st);
      pl.forEach(function (x, i) { rows.push({ icon: i === 0 ? 'play' : (x.key === 'playNow' || x.key === 'playNow1' || x.key === 'playNone' ? 'q' : 'hand'), text: interp(t(x.key), x), state: 'now' }); });
    } else {
      var r = this._round, s = StoryStageCore.sentences(this.api.lang, r);
      var done = st.done ? StoryStageCore.line(this.api.lang, r, 'done') : null;
      rows.push({ icon: 'play', text: s[0], state: st.line === 0 ? 'now' : 'past' });
      rows.push({ icon: 'hand', text: s[1], state: st.line === 1 ? 'now' : st.line > 1 ? 'past' : 'next' });
      rows.push({ icon: 'q', text: done || s[2], state: st.done ? 'done' : st.line === 2 ? 'now' : 'next' });
    }
    var sig = JSON.stringify(rows) + '|' + (st.explore ? 1 : 0);
    if (el.getAttribute('data-sig') !== sig) {
      el.setAttribute('data-sig', sig);
      el.innerHTML = '';
      rows.forEach(function (row, idx) {
        var div = self.api.el('div', 'ss-line is-' + row.state);
        var ic = self.api.el('span', 'ss-ico ss-ico-' + row.icon); ic.setAttribute('aria-hidden', 'true'); ic.innerHTML = ICONS[row.icon];
        if (!st.explore && idx === 0) { ic.classList.add('ss-ico-btn'); ic.addEventListener('click', function () { self._say(row.text); }); }
        div.appendChild(ic);
        var tx = self.api.el('span', 'ss-text'); tx.innerHTML = boldNumerals(row.text); div.appendChild(tx);
        el.appendChild(div);
      });

      var live = rows.filter(function (r) { return r.state === 'now' || r.state === 'done'; })[0];
      if (live && !st.explore) this.api.announce(live.text);
    }
  },

  /* ---------------- the hand ---------------- */
  _tap: function (i) {
    var st = this._cur();
    if (!st || this._busy || this._replay || this._acting) return;
    var res = StoryStageCore.tap(st, i);
    if (res === 'locked' || res === 'closed' || res === 'full' || res === 'refused') { this.api.sound(260); bounce(this._placeEls[i], 'ss-nope'); this._paint(); return; }
    this._fresh = {};
    if (res === 'added') { this._fresh[i] = 'in'; this.api.sound(600); }
    else if (res === 'taken') { this._fresh[i] = 'out'; this.api.sound(420); }
    else this.api.sound(360);
    this.api.track('move', { id: st.id, res: res });
    this._paint();
  },
  _bring: function (at) {
    var st = this._cur();
    if (!st || this._busy || this._replay || this._acting) return;
    var res = StoryStageCore.add(st, at);
    if (typeof res !== 'number') { this.api.sound(260); bounce(this._pile, 'ss-nope'); this._paint(); return; }
    this._fresh = {}; this._fresh[res] = 'in';
    this.api.sound(600);
    this.api.track('move', { id: st.id, res: 'added' });
    this._paint();
  },
  /* the pile: a tap brings one to the next empty place; a drag drops it on the place the finger chooses */
  _bindPile: function (pile) {
    var self = this, drag = null;
    pile.addEventListener('pointerdown', function (ev) {
      if (pile.disabled) return;
      drag = { x: ev.clientX, y: ev.clientY, id: ev.pointerId, ghost: null, moved: false };
      try { pile.setPointerCapture(ev.pointerId); } catch (e) { /* older browsers */ }
    });
    pile.addEventListener('pointermove', function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      if (!drag.moved && Math.hypot(ev.clientX - drag.x, ev.clientY - drag.y) < 8) return;
      if (!drag.moved) {
        drag.moved = true;
        var src = pile.querySelector('.ss-pile-pic');
        var g = document.createElement('div'); g.className = 'ss-ghost';
        if (self._cur().counters) { g.classList.add('is-counter'); g.style.background = (pile.querySelector('.ss-pile-counter') || {}).style ? pile.querySelector('.ss-pile-counter').style.background : '#888'; }
        else if (src && src.getAttribute('src')) g.innerHTML = '<img alt="" src="' + escAttr(src.getAttribute('src')) + '">';
        document.body.appendChild(g); drag.ghost = g;
      }
      var s = self._L ? self._L.pic : 80;
      drag.ghost.style.cssText += ';width:' + s + 'px;height:' + s + 'px;left:' + (ev.clientX - s / 2) + 'px;top:' + (ev.clientY - s / 2) + 'px;';
    });
    var end = function (ev) {
      if (!drag || ev.pointerId !== drag.id) return;
      var d = drag; drag = null;
      if (d.ghost && d.ghost.parentNode) d.ghost.parentNode.removeChild(d.ghost);
      if (!d.moved) return; /* a plain tap is the click below */
      var el = document.elementFromPoint(ev.clientX, ev.clientY);
      var place = el && el.closest ? el.closest('.ss-place') : null;
      if (place && self._wrap.contains(place)) self._bring(+place.getAttribute('data-i'));
      pile._dragged = true;
    };
    pile.addEventListener('pointerup', end);
    pile.addEventListener('pointercancel', function (ev) { if (drag && drag.ghost && drag.ghost.parentNode) drag.ghost.parentNode.removeChild(drag.ghost); drag = null; });
    pile.addEventListener('click', function () { if (pile._dragged) { pile._dragged = false; return; } self._bring(); });
  },
  _ask: function () {
    var st = this.st, self = this;
    if (!st || this._busy || this._replay || !StoryStageCore.ask(st)) return;
    this.api.sound(560);
    this._paint();
    if (this._readAloud()) this._say(StoryStageCore.sentences(this.api.lang, this._round)[2]);
    var first = this._keysEl.querySelector('.ss-key:not(:disabled)'); if (first) first.focus({ preventScroll: true });
  },
  _key: function (v) {
    var st = this.st;
    if (!st || this._busy || this._replay) return;
    var res = StoryStageCore.key(st, v);
    if (res !== 'typed') { this.api.sound(260); return; }
    this.api.sound(480);
    this._paint();
  },
  _del: function () { var st = this.st; if (!st || this._busy) return; if (StoryStageCore.del(st)) { this.api.sound(380); this._paint(); } },

  /* the main button: Next on the child's line (the question wakes only after acting), Check at the question */
  _goPress: function () {
    var st = this._cur();
    if (!st) return;
    if (st.explore) { this._playNext(); return; }
    if (st.line === 1 && StoryStageCore.canAsk(st)) { this._ask(); return; }
    this._check();
  },
  _check: function () {
    var st = this.st, self = this;
    if (!st || this._busy || this._replay || this._acting || this._playing || st.done) return;
    var res = StoryStageCore.check(st);
    if (!res) return;
    this.api.track('check', { id: st.id, ok: res.ok, slip: res.slip, misses: st.misses });
    this._fresh = {};
    if (res.slip === 'act') { this.api.sound(300); this._paint(); var cur = this._linesEl.querySelector('.ss-line.is-now'); bounce(cur, 'ss-pulse'); if (st.line === 1) bounce(this._pile.hidden ? this._framesEl : this._pile, 'ss-pulse'); return; }
    if (res.slip === 'empty') { this.api.sound(300); this._paint(); bounce(this._keysEl, 'ss-pulse'); return; }
    if (res.ok) {
      this._busy = true; this._bow = true;
      this.api.sound(660); this._later(function () { self.api.sound(880); }, 140);
      this._paint();
      bounce(this._box, 'ss-stick');
      this._speakNumber(st.answer);
      this._later(function () { self._busy = false; self._paint(); var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled && self.st.done) chk.click(); }, this._ms(this.CHECK_MS));
      return;
    }
    this.api.sound(280);
    bounce(this._box, 'ss-wobble');
    if (st.help === 1) this._runReplay(); else this._paint();
  },

  /* miss 1: the story re-acts itself at its TRUE numbers, each thing numbered as it moves,
     and the stage is left telling the true story */
  _runReplay: function () {
    var st = this.st, self = this, script = StoryStageCore.replayScript(st);
    var view = st.places.map(function () { return null; }), chips = view.map(function () { return ''; }), changeChip = {};
    this._replay = { view: view, chips: chips, changeChip: changeChip };
    this._paint();
    var step = this._ms(260), t0 = this._ms(380);
    script.start.forEach(function (idx, k) {
      self._later(function () {
        var p = script.places[idx];
        view[idx] = { k: p.k, who: 's', out: false }; chips[idx] = k + 1;
        self._fresh = {}; self._fresh[idx] = 'in'; self.api.sound(520 + 20 * k); self._paint();
      }, t0 + k * step);
    });
    var t1 = t0 + script.start.length * step + this._ms(500);
    script.change.forEach(function (idx, k) {
      self._later(function () {
        for (var c = 0; c < chips.length; c++) if (!changeChip[c]) chips[c] = '';
        var p = script.places[idx];
        if (st.type === 'take') { view[idx] = { k: p.k, who: 's', out: true }; self._fresh = {}; self._fresh[idx] = 'out'; }
        else { view[idx] = { k: p.k, who: 'c', out: false }; self._fresh = {}; self._fresh[idx] = 'in'; }
        chips[idx] = k + 1; changeChip[idx] = true;
        self.api.sound(640 + 20 * k); self._paint();
      }, t1 + k * step);
    });
    this._later(function () {
      StoryStageCore.settle(st);
      self._replay = null; self._fresh = {};
      self._paint();
    }, t1 + script.change.length * step + this._ms(1100));
  },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy || this._replay) return;
    this._fresh = {};
    if (this._playing) { this._playing = false; this._layout(); this._paint(); return; }
    this._playing = true; this._play = StoryStageCore.newPlay(this._round);
    this._layout(); this._paint();
  },
  _playNext: function () { if (StoryStageCore.playNext(this._play)) { this.api.sound(560); this._paint(); } },
  _playAgain: function () { if (!this._playing) return; this._play = StoryStageCore.newPlay(this._round); this._fresh = {}; this._paint(); },

  /* ---------------- voice ---------------- */
  _say: function (text) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak || !text) return;
    try { LCSAudio.speak({ type: 'ui', text: String(text), lang: this.api.lang, rate: 0.9 }); } catch (e) { /* silent */ }
  },
  _sayStory: function () {
    var st = this.st; if (!st || this._playing) return;
    var s = StoryStageCore.sentences(this.api.lang, this._round);
    this._say(s.slice(0, Math.min(3, st.line + 1)).join(' '));
  },
  _speakNumber: function (n) {
    if (typeof LCSAudio === 'undefined' || !LCSAudio.speak) return;
    try { LCSAudio.speak({ type: 'number', text: String(n), lang: this.api.lang, rate: 0.95 }); } catch (e) { /* silent */ }
  }
};

var ICONS = {
  play: '<svg viewBox="0 0 24 24" width="24" height="24"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg>',
  hand: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11"/><path d="M11 10.5V4a1.5 1.5 0 0 1 3 0v6.5"/><path d="M14 10.5V5.5a1.5 1.5 0 0 1 3 0V13"/><path d="M17 11.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.6-2.2L4.6 15.6a1.6 1.6 0 0 1 2.4-2.1L8 14.5"/></svg>',
  q: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 9a3 3 0 1 1 4.2 2.8c-.8.4-1.2 1-1.2 1.9V15"/><circle cx="12" cy="18.6" r=".6" fill="currentColor"/></svg>',
  pen: '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13.5 6.5l4 4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h13"/><path d="M13 6l6 6-6 6"/></svg>'
};
function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; }); }
function escAttr(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }
function escHtml(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
/* numbers in a story are content: bold teal numerals */
function boldNumerals(s) { return escHtml(s).replace(/\d+/g, function (m) { return '<b class="ss-num">' + m + '</b>'; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }

var ssCssDone = false;
function injectStoryStageCSS() {
  if (ssCssDone || typeof document === 'undefined') return;
  ssCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.ss-wrap{width:100%;position:relative;display:flex;flex-direction:column;align-items:stretch;gap:12px;--ss-place:112px;--ss-pic:100px;--ss-gap:10px;--ss-pad:14px;--ss-between:0px;--ss-tab:112px;--ss-tabpic:96px;--ss-key:56px;--ss-keyh:56px;--ss-box:72px;--ss-ink:#2B3A36;}'
  /* the story card */
  + '.ss-card{position:relative;box-sizing:border-box;padding:10px 14px 12px;border-radius:16px;background:#FFFBF2;border:2px solid #EADFC8;box-shadow:0 2px 6px rgba(60,40,10,.06);}'
  + '.ss-cardtools{float:right;display:flex;gap:6px;margin:0 0 4px 8px;}'
  + '.ss-wrap.is-narrow .ss-cardtools{float:none;justify-content:flex-end;margin:0 0 4px;}'
  + '.ss-playbtn{display:inline-flex;align-items:center;gap:6px;} .ss-playbtn svg{flex:none;}'
  + '.ss-wrap.is-narrow .ss-playbtn{width:44px;padding:0;justify-content:center;} .ss-wrap.is-narrow .ss-playbtn .ss-playlab{display:none;}'
  + '.ss-wrap.is-narrow .ss-playbtn.is-back{width:auto;padding:0 10px;} .ss-wrap.is-narrow .ss-playbtn.is-back .ss-playlab{display:inline;} .ss-wrap.is-narrow .ss-playbtn.is-back svg{display:none;}'
  + '.ss-more{display:none;width:44px;height:44px;margin:0 auto 0 0;padding:0;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);cursor:pointer;}'
  + '.ss-wrap.is-tiny:not(.is-play) .ss-more{display:grid;place-items:center;}'
  + '.ss-wrap.is-tiny:not(.is-play):not(.is-all) .ss-line.is-past,.ss-wrap.is-tiny:not(.is-play):not(.is-all) .ss-line.is-next{display:none;}'
  + '.ss-wrap.is-tiny.is-all .ss-more svg{transform:rotate(180deg);}'
  + '.ss-say{width:44px;height:44px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);display:grid;place-items:center;cursor:pointer;padding:0;} .ss-say[hidden]{display:none;}'
  + '.ss-say .ss-say-off{opacity:0;} .ss-say.is-off .ss-say-off{opacity:1;} .ss-say.is-off{color:#7C8A86;}'
  + '.ss-lines{display:flex;flex-direction:column;gap:4px;}'
  + '.ss-line{display:flex;align-items:center;gap:10px;min-height:40px;padding:3px 6px;border-radius:10px;font-family:var(--lcs-font-body);font-weight:700;font-size:22px;line-height:1.3;color:var(--ss-ink);transition:opacity .25s,background .25s;}'
  + '.ss-line.is-next{opacity:.42;} .ss-line.is-past{opacity:.75;}'
  + '.ss-line.is-now{background:#EEF7F4;box-shadow:inset 0 -4px 0 var(--lcs-structure);}'
  + '.ss-line.is-done{background:#FFF3CF;box-shadow:inset 0 -4px 0 #C9A24A;color:#5B4312;}'
  + '.ss-text{flex:1;min-width:0;} .ss-num{color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;}'
  + '.ss-line.is-done .ss-num{color:#7A5A12;}'
  + '.ss-ico{flex:none;width:28px;height:28px;border-radius:50%;display:grid;place-items:center;color:var(--lcs-structure);background:#fff;box-shadow:inset 0 0 0 2px #CFE3DD;} .ss-ico svg{width:20px;height:20px;}'
  + '.ss-ico-btn{cursor:pointer;} .ss-line.is-now .ss-ico{background:var(--lcs-structure);color:#fff;box-shadow:none;}'
  + '.ss-line.is-now .ss-ico-hand{background:var(--lcs-accent);}'
  + '@keyframes ss-nudge{0%,100%{transform:none;}50%{transform:translateX(3px);}}'
  + '.ss-tool{min-height:44px;padding:0 12px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font-family:var(--lcs-font-body);font-weight:800;font-size:15px;cursor:pointer;touch-action:manipulation;} .ss-tool[hidden]{display:none;} .ss-tool:disabled{opacity:.45;cursor:default;}'
  /* the stage */
  + '.ss-stage{position:relative;display:flex;flex-direction:column;align-items:center;gap:10px;padding:12px 0;border-radius:18px;background:#E6F1F8;}'
  + '.ss-stage[data-scene="sky"]{background:linear-gradient(180deg,#DDEEFB,#EEF6FC);} .ss-stage[data-scene="pond"]{background:linear-gradient(180deg,#D3ECF0,#E4F3F4);}'
  + '.ss-stage[data-scene="grass"]{background:linear-gradient(180deg,#E3F2DA,#EEF7E8);} .ss-stage[data-scene="table"]{background:linear-gradient(180deg,#F6EAD5,#FBF3E4);}'
  + '.ss-band{align-self:stretch;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 14px;} .ss-band[hidden]{display:none;}'
  + '.ss-label{display:flex;gap:12px;align-items:center;} .ss-lab{position:relative;display:inline-flex;}'
  + '.ss-lab-pic{width:var(--ss-tabpic);height:var(--ss-tabpic);object-fit:contain;} .ss-lab-dot{position:absolute;right:-4px;bottom:-2px;width:26px;height:26px;border-radius:50%;box-shadow:0 0 0 3px #fff;}'
  + '.ss-pile{position:relative;margin-left:auto;width:var(--ss-tab);height:var(--ss-tab);padding:0;border:0;border-radius:18px;background:#fff;box-shadow:inset 0 0 0 3px #CFE3DD,0 3px 8px rgba(20,60,50,.12);cursor:grab;touch-action:none;display:grid;place-items:center;} .ss-pile[hidden]{display:none;}'
  + '.ss-pile:disabled{cursor:default;} .ss-pile:disabled .ss-pile-pic{opacity:.55;}'
  + '.ss-pile.is-awake{box-shadow:inset 0 0 0 4px var(--lcs-accent),0 3px 8px rgba(20,60,50,.12);animation:ss-beckon 1.4s ease-in-out infinite;} @keyframes ss-beckon{0%,100%{transform:none;}50%{transform:translateY(-4px);}}'
  + '.ss-pile-back{position:absolute;left:14%;right:10%;top:16%;bottom:6%;border-radius:12px;background:#F1EEE6;transform:rotate(6deg);} .ss-pile-back2{transform:rotate(-5deg);background:#E8E3D7;}'
  + '.ss-pile-pic{position:relative;width:var(--ss-tabpic);height:var(--ss-tabpic);object-fit:contain;pointer-events:none;} .ss-pile-pic[hidden]{display:none;}'
  + '.ss-pile-counter{display:none;position:relative;width:calc(var(--ss-tabpic) * .6);height:calc(var(--ss-tabpic) * .6);border-radius:50%;box-shadow:inset 0 -4px 0 rgba(0,0,0,.18);}'
  + '.ss-wrap.is-two .ss-pile-counter{display:block;position:absolute;right:6px;bottom:6px;width:30px;height:30px;}'
  + '.ss-frames{display:flex;flex-direction:row;gap:var(--ss-between);justify-content:center;}'
  + '.ss-wrap.is-narrow.is-two .ss-frames{flex-direction:column;}'
  + '.ss-frame{display:grid;grid-template-columns:repeat(5,var(--ss-place));grid-template-rows:repeat(2,var(--ss-place));gap:var(--ss-gap);padding:var(--ss-pad);border-radius:16px;background:rgba(255,255,255,.55);box-shadow:inset 0 0 0 3px var(--lcs-structure);} .ss-frame[hidden]{display:none;}'
  + '.ss-wrap.is-narrow:not(.is-two) .ss-frame{box-shadow:none;background:transparent;border-radius:0;}'
  + '.ss-place{position:relative;width:var(--ss-place);height:var(--ss-place);padding:0;border:0;border-radius:12px;background:rgba(255,255,255,.85);box-shadow:inset 0 0 0 2px #BFD8D1;cursor:pointer;touch-action:manipulation;display:grid;place-items:center;overflow:visible;}'
  + '.ss-wrap.is-narrow:not(.is-two) .ss-place{border-radius:10px;box-shadow:inset 0 0 0 2px #9CC4BA;}'
  + '.ss-place:disabled{cursor:default;} .ss-place:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.ss-pic{width:var(--ss-pic);height:var(--ss-pic);object-fit:contain;pointer-events:none;} .ss-pic[hidden]{display:none;}'
  + '.ss-counter{display:none;width:calc(var(--ss-place) * .78);height:calc(var(--ss-place) * .78);border-radius:50%;box-shadow:inset 0 -4px 0 rgba(0,0,0,.18);}'
  + '.ss-place.is-counter.is-full .ss-counter{display:block;}'
  + '.ss-x{position:absolute;inset:18%;width:64%;height:64%;fill:none;stroke:#7B5B4A;stroke-width:4;stroke-linecap:round;opacity:0;pointer-events:none;}'
  /* a thing that went away: a pale outline with a small cross, still in its place */
  + '.ss-place.is-out{background:repeating-linear-gradient(45deg,rgba(255,255,255,.9) 0 6px,rgba(236,231,221,.9) 6px 12px);box-shadow:inset 0 0 0 2px #B9AE98;}'
  + '.ss-place.is-out .ss-pic{opacity:.22;filter:grayscale(1);} .ss-place.is-out .ss-counter{opacity:.22;filter:grayscale(1);} .ss-place.is-out .ss-x{opacity:.9;}'
  + '.ss-wrap.is-take .ss-place.is-full:not(.is-out):not(:disabled):hover{box-shadow:inset 0 0 0 3px var(--lcs-accent);}'
  /* arrivals and departures */
  + '.ss-place.ss-in .ss-pic,.ss-place.ss-in .ss-counter{animation:ss-drop .28s var(--lcs-ease) both;} @keyframes ss-drop{0%{transform:translateY(-22px);opacity:0;}100%{transform:none;opacity:1;}}'
  + '.ss-place.is-out.ss-leave[data-leave="pop"] .ss-pic{animation:ss-pop .42s ease-out both;} @keyframes ss-pop{0%{transform:scale(1);opacity:1;filter:none;}35%{transform:scale(1.22);opacity:1;filter:none;}60%{transform:scale(.4);opacity:0;}100%{transform:scale(1);opacity:.22;filter:grayscale(1);}}'
  + '.ss-place.is-out.ss-leave[data-leave="eat"] .ss-pic{animation:ss-eat .42s ease-out both;} @keyframes ss-eat{0%{clip-path:circle(75% at 50% 50%);opacity:1;filter:none;}50%{clip-path:circle(45% at 30% 40%);opacity:.8;filter:none;}100%{clip-path:circle(75% at 50% 50%);opacity:.22;filter:grayscale(1);}}'
  + '.ss-place.is-out.ss-leave[data-leave="swim"] .ss-pic{animation:ss-swim .46s ease-in both;} @keyframes ss-swim{0%{transform:none;opacity:1;filter:none;}55%{transform:translateX(46px);opacity:0;}56%{transform:none;opacity:0;}100%{opacity:.22;filter:grayscale(1);}}'
  + '.ss-place.is-out.ss-leave[data-leave="pick"] .ss-pic{animation:ss-pick .46s ease-in both;} @keyframes ss-pick{0%{transform:none;opacity:1;filter:none;}55%{transform:translateY(-40px);opacity:0;}56%{transform:none;opacity:0;}100%{opacity:.22;filter:grayscale(1);}}'
  + '.ss-place.is-out.ss-leave .ss-counter{animation:ss-fadeout .4s ease both;} @keyframes ss-fadeout{0%{opacity:1;filter:none;}100%{opacity:.22;filter:grayscale(1);}}'
  + '.ss-place.ss-bow .ss-pic,.ss-place.ss-bow .ss-counter{animation:ss-bowk .4s var(--lcs-ease) var(--ss-bow,0ms) both;} @keyframes ss-bowk{0%,100%{transform:none;}45%{transform:translateY(6px) rotate(-4deg);}}'
  + '.ss-chip{position:absolute;right:-6px;top:-6px;min-width:28px;height:28px;padding:0 5px;box-sizing:border-box;border-radius:14px;background:#fff;color:var(--ss-ink);font-family:var(--lcs-font-display);font-weight:800;font-size:17px;line-height:28px;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.3);pointer-events:none;z-index:2;}'
  + '.ss-chip:not(.is-on){display:none;} .ss-chip.is-q{background:var(--lcs-structure);color:#fff;} .ss-chip.is-change{background:var(--lcs-accent);color:#fff;}'
  + '.ss-wrap.is-done .ss-chip.is-on{background:#F6D98A;color:#5B4312;}'
  + '.ss-ghost{position:fixed;z-index:60;pointer-events:none;opacity:.9;} .ss-ghost img{width:100%;height:100%;object-fit:contain;} .ss-ghost.is-counter{border-radius:50%;}'
  /* the note */
  + '.ss-note{box-sizing:border-box;flex:1;min-width:0;max-width:520px;margin:0 auto;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--ss-ink);text-align:center;} .ss-note[hidden]{display:none;}'
  + '.ss-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;} .ss-note.is-turn{border-color:var(--lcs-accent);background:#FFF4EC;}'
  /* the keypad */
  + '.ss-pad{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:12px;transition:opacity .25s;}'
  + '.ss-pad.is-asleep .ss-keys,.ss-pad.is-asleep .ss-box:not(.is-gold),.ss-pad.is-asleep .ss-del{opacity:.4;}'
  + '.ss-keys{display:grid;grid-template-columns:repeat(5,var(--ss-key));gap:6px;} .ss-keys[hidden]{display:none;}'
  + '.ss-key{height:var(--ss-keyh);padding:0;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:22px;color:var(--lcs-structure);cursor:pointer;touch-action:manipulation;}'
  + '.ss-key:hover:not(:disabled){background:#EEF7F4;} .ss-key:disabled{cursor:default;} .ss-key:focus-visible,.ss-del:focus-visible,.ss-go:focus-visible,.ss-pile:focus-visible,.ss-next:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  + '.ss-padrow{display:flex;align-items:center;gap:10px;}'
  + '.ss-box{display:inline-grid;place-items:center;min-width:var(--ss-box);height:calc(var(--ss-keyh) + 8px);box-sizing:border-box;padding:0 8px;border:3px dashed #9AA8A3;border-radius:14px;background:#fff;color:var(--ss-ink);font-family:var(--lcs-font-display);font-weight:800;font-size:34px;} .ss-box[hidden]{display:none;}'
  + '.ss-box.is-awake{border-color:var(--lcs-structure);box-shadow:0 0 0 4px rgba(20,107,94,.15);} .ss-box.is-wrong{border-style:solid;border-color:#C9542A;color:#9C3F1C;} .ss-box.is-gold{border-style:solid;border-color:#C9A24A;background:#F6D98A;color:#5B4312;}'
  + '.ss-del{width:52px;height:calc(var(--ss-keyh) + 8px);border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);display:grid;place-items:center;cursor:pointer;padding:0;} .ss-del[hidden]{display:none;} .ss-del:disabled{opacity:.4;cursor:default;}'
  + '.ss-go{min-width:120px;height:calc(var(--ss-keyh) + 8px);padding:0 22px;border-radius:14px;border:0;background:var(--lcs-accent);color:#fff;font-family:var(--lcs-font-display);font-weight:800;font-size:20px;cursor:pointer;touch-action:manipulation;box-shadow:0 4px 0 #C95A31;} .ss-go[hidden]{display:none;} .ss-go:disabled{opacity:.5;cursor:default;}'
  + '.ss-go.is-next{background:#A9B8B3;box-shadow:0 4px 0 #87968F;} .ss-go.is-next.is-awake{background:var(--lcs-structure);box-shadow:0 4px 0 #0E4E44;animation:ss-nudge 1.6s ease-in-out infinite;}'
  /* motion */
  + '.ss-nope{animation:ss-wob .3s var(--lcs-ease) 1;} .ss-wobble{animation:ss-wob .45s var(--lcs-ease) 1;} @keyframes ss-wob{0%,100%{transform:translateX(0);}25%{transform:translateX(-5px);}75%{transform:translateX(5px);}}'
  + '.ss-pulse{animation:ss-pulsek .5s var(--lcs-ease) 2;} @keyframes ss-pulsek{0%,100%{transform:none;}50%{transform:scale(1.04);}}'
  + '.ss-stick{animation:ss-stickk .5s var(--lcs-ease) 1;} @keyframes ss-stickk{0%{transform:scale(1);}40%{transform:scale(1.18) rotate(-3deg);}100%{transform:none;}}'
  /* narrow: smaller story text, the keypad wraps under the keys */
  + '.ss-wrap.is-narrow{gap:8px;} .ss-wrap.is-narrow .ss-card{padding:6px 8px 8px;} .ss-wrap.is-narrow .ss-line{font-size:17px;gap:7px;min-height:32px;padding:2px 4px;} .ss-wrap.is-narrow .ss-ico{width:24px;height:24px;} .ss-wrap.is-narrow .ss-ico svg{width:16px;height:16px;}'
  + '.ss-wrap.is-narrow .ss-tool{font-size:14px;padding:0 10px;}'
  + '.ss-wrap.is-narrow .ss-stage{padding:8px 0;gap:6px;border-radius:14px;} .ss-wrap.is-narrow .ss-band{padding:0 6px;gap:6px;}'
  + '.ss-wrap.is-narrow .ss-note{font-size:15px;padding:6px 8px;line-height:1.25;}'
  + '.ss-wrap.is-narrow .ss-pad{gap:6px;} .ss-wrap.is-narrow .ss-keys{gap:5px;} .ss-wrap.is-narrow .ss-key{font-size:20px;} .ss-wrap.is-narrow .ss-box{font-size:28px;height:52px;} .ss-wrap.is-narrow .ss-del{height:52px;} .ss-wrap.is-narrow .ss-go{height:52px;min-width:110px;font-size:18px;}'
  + '.ss-wrap.is-tiny{gap:6px;} .ss-wrap.is-tiny .ss-stage{padding:5px 0;gap:5px;} .ss-wrap.is-tiny .ss-card{padding:5px 6px 6px;} .ss-wrap.is-tiny .ss-box,.ss-wrap.is-tiny .ss-del,.ss-wrap.is-tiny .ss-go{height:46px;}'
  + '@media (prefers-reduced-motion:reduce){.ss-pic,.ss-counter,.ss-next,.ss-pile,.ss-box,.ss-chip,.ss-place{animation:none!important;transition:none!important;}}';
  var style = document.createElement('style');
  style.id = 'ss-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = StoryStageActivity;
if (typeof window !== 'undefined') window.StoryStageActivity = StoryStageActivity;
