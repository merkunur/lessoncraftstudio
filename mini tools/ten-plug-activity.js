/* =====================================================================
   ten-plug-activity.js — ACTIVITY #85 of the one-by-one rebuild:
   "Make a Ten to Add" → THE TEN PLUG (1.OA.C.6, 11 locales).
   Design sheet: docs/activities-rebuild/designs/085-numberbond.md
   ---------------------------------------------------------------------
   THE INVENTION: the first number sits in a ten-rack with a hole in it.
   The second number is a stick of linking cubes: tap it to snap it, drag
   a piece into the hole. Too long → it bounces back; too short → the
   empty slots glow; exactly the hole → the rack turns into a golden ten
   and the rest waits beside it on the ones shelf. Then the child types
   the total. A wrong total is shown as a ghost ten and ghost ones on the
   shelves; the "10 + the whole second number" slip shows the missing
   cubes glowing — they are inside the ten now.
   ACTIVITY LAYER ONLY: the model is ten-plug-core.js; no pictures (the
   cubes are apparatus); lcs-shell.js untouched (the shell's Check is
   hidden and pressed by this activity on success). Test seams:
   window.TenPlugActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var TenPlugActivity = {
  id: 'ten-plug',
  apparatusClasses: ['tp-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'The Ten Plug',de:'Der Zehnerstöpsel',nl:'De tientalstop',da:'Tierproppen',sv:'Tiopluggen',no:'Tierpluggen',es:'El tapón de la decena',it:'Il tappo della decina',pt:'A rolha da dezena',fr:'Le bouchon de la dizaine',fi:'Kymppitulppa'},
    tLine:       {en:'Snap the stick so one piece fills the ten. Then type the total.',de:'Brich die Stange so ab, dass ein Stück den Zehner voll macht. Tippe dann das Ergebnis ein.',nl:'Breek de staaf zo dat één stuk het tiental vol maakt. Typ dan het totaal.',da:'Knæk stangen, så ét stykke fylder tieren op. Skriv så resultatet.',sv:'Bryt staven så att en bit fyller tiotalet. Skriv sedan summan.',no:'Knekk stangen slik at én bit fyller opp tieren. Skriv så summen.',es:'Parte la barra para que un trozo complete la decena. Luego escribe el total.',it:'Spezza la barretta in modo che un pezzo completi la decina. Poi scrivi il totale.',pt:'Quebre a barra para que um pedaço complete a dezena. Depois digite o total.',fr:'Casse la barre pour qu’un morceau complète la dizaine. Puis tape le total.',fi:'Katkaise sauva niin, että yksi pala täydentää kympin. Kirjoita sitten summa.'},
    tLineHead:   {en:'Add in your head and type the total. The stick can help.',de:'Rechne im Kopf und tippe das Ergebnis ein. Die Stange kann helfen.',nl:'Reken uit je hoofd en typ het totaal. De staaf kan helpen.',da:'Regn i hovedet og skriv resultatet. Stangen kan hjælpe.',sv:'Räkna i huvudet och skriv summan. Staven kan hjälpa.',no:'Regn i hodet og skriv summen. Stangen kan hjelpe.',es:'Suma mentalmente y escribe el total. La barra puede ayudarte.',it:'Calcola a mente e scrivi il totale. La barretta può aiutarti.',pt:'Some de cabeça e digite o total. A barra pode ajudar.',fr:'Calcule dans ta tête et tape le total. La barre peut t’aider.',fi:'Laske päässä ja kirjoita summa. Sauva voi auttaa.'},
    tLineM10:    {en:'Snap the ten-stick so one piece fills the hole. Then type how many cubes it took.',de:'Brich die Zehnerstange so ab, dass ein Stück die Lücke füllt. Tippe dann ein, wie viele Würfel es waren.',nl:'Breek de tienstaaf zo dat één stuk het gat vult. Typ dan hoeveel blokjes het waren.',da:'Knæk tierstangen, så ét stykke fylder hullet. Skriv så, hvor mange klodser det var.',sv:'Bryt tiostaven så att en bit fyller luckan. Skriv sedan hur många kuber det var.',no:'Knekk tierstangen slik at én bit fyller hullet. Skriv så hvor mange klosser det var.',es:'Parte la barra de diez para que un trozo llene el hueco. Luego escribe cuántos cubos usaste.',it:'Spezza la barretta da dieci in modo che un pezzo riempia il buco. Poi scrivi quanti cubetti erano.',pt:'Quebre a barra de dez para que um pedaço encha o buraco. Depois digite quantos cubinhos você usou.',fr:'Casse la barre de dix pour qu’un morceau remplisse le trou. Puis tape combien de cubes il a fallu.',fi:'Katkaise kymppisauva niin, että yksi pala täyttää kolon. Kirjoita sitten, montako palikkaa siihen meni.'},
    tLineM10Head:{en:'How many more make 10? Type the number.',de:'Wie viele fehlen bis 10? Tippe die Zahl ein.',nl:'Hoeveel moet erbij om 10 te maken? Typ het getal.',da:'Hvor mange mangler op til 10? Skriv tallet.',sv:'Hur många fattas till 10? Skriv talet.',no:'Hvor mange til blir 10? Skriv tallet.',es:'¿Cuántos faltan para 10? Escribe el número.',it:'Quanti ne mancano per fare 10? Scrivi il numero.',pt:'Quantos faltam para 10? Digite o número.',fr:'Combien en faut-il pour faire 10 ? Tape le nombre.',fi:'Montako puuttuu kymppiin? Kirjoita luku.'},
    hSnap:       {en:'Snap the stick so one piece fills the hole in the ten.',de:'Brich die Stange so ab, dass ein Stück die Lücke im Zehner füllt.',nl:'Breek de staaf zo dat één stuk het gat in het tiental vult.',da:'Knæk stangen, så ét stykke fylder hullet i tieren.',sv:'Bryt staven så att en bit fyller luckan i tiotalet.',no:'Knekk stangen slik at én bit fyller hullet i tieren.',es:'Parte la barra para que un trozo llene el hueco de la decena.',it:'Spezza la barretta in modo che un pezzo riempia il buco della decina.',pt:'Quebre a barra para que um pedaço encha o buraco da dezena.',fr:'Casse la barre pour qu’un morceau remplisse le trou de la dizaine.',fi:'Katkaise sauva niin, että yksi pala täyttää kympin kolon.'},
    hSnap2:      {en:'Fill the hole in the ten exactly. The round arrow joins the stick again.',de:'Füll die Lücke im Zehner genau. Der runde Pfeil setzt die Stange wieder zusammen.',nl:'Vul het gat in het tiental precies. De ronde pijl maakt de staaf weer heel.',da:'Fyld hullet i tieren præcist. Den runde pil sætter stangen sammen igen.',sv:'Fyll luckan i tiotalet exakt. Den runda pilen sätter ihop staven igen.',no:'Fyll hullet i tieren nøyaktig. Den runde pilen setter sammen stangen igjen.',es:'Llena exactamente el hueco de la decena. La flecha redonda vuelve a unir la barra.',it:'Riempi esattamente il buco della decina. La freccia rotonda riunisce la barretta.',pt:'Encha o buraco da dezena exatamente. A seta redonda junta a barra de novo.',fr:'Remplis exactement le trou de la dizaine. La flèche ronde recolle la barre.',fi:'Täytä kympin kolo täsmälleen. Pyöreä nuoli liittää sauvan takaisin yhteen.'},
    nLong:       {en:'Too long — it does not fit in the hole.',de:'Zu lang – das passt nicht in die Lücke.',nl:'Te lang – het past niet in het gat.',da:'For lang – den passer ikke i hullet.',sv:'För lång – den får inte plats i luckan.',no:'For lang – den passer ikke i hullet.',es:'Demasiado largo: no cabe en el hueco.',it:'Troppo lungo: non entra nel buco.',pt:'Comprido demais: não cabe no buraco.',fr:'Trop long : il ne rentre pas dans le trou.',fi:'Liian pitkä – se ei mahdu koloon.'},
    nShort:      {en:'Too short — the ten is not full yet.',de:'Zu kurz – der Zehner ist noch nicht voll.',nl:'Te kort – het tiental is nog niet vol.',da:'For kort – tieren er ikke fuld endnu.',sv:'För kort – tiotalet är inte fullt än.',no:'For kort – tieren er ikke full ennå.',es:'Demasiado corto: la decena todavía no está completa.',it:'Troppo corto: la decina non è ancora completa.',pt:'Curto demais: a dezena ainda não está completa.',fr:'Trop court : la dizaine n’est pas encore pleine.',fi:'Liian lyhyt – kymppi ei ole vielä täynnä.'},
    nFit:        {en:'The ten is full! Now type how many altogether.',de:'Der Zehner ist voll! Tippe jetzt ein, wie viele es zusammen sind.',nl:'Het tiental is vol! Typ nu hoeveel het er samen zijn.',da:'Tieren er fuld! Skriv nu, hvor mange der er i alt.',sv:'Tiotalet är fullt! Skriv nu hur många det är tillsammans.',no:'Tieren er full! Skriv nå hvor mange det er til sammen.',es:'¡La decena está completa! Ahora escribe cuántos hay en total.',it:'La decina è completa! Ora scrivi quanti sono in tutto.',pt:'A dezena está completa! Agora digite quantos são ao todo.',fr:'La dizaine est pleine ! Tape maintenant combien il y en a en tout.',fi:'Kymppi on täynnä! Kirjoita nyt, montako on yhteensä.'},
    nFitM10:     {en:'The ten is full! How many cubes filled the hole?',de:'Der Zehner ist voll! Wie viele Würfel haben die Lücke gefüllt?',nl:'Het tiental is vol! Hoeveel blokjes vulden het gat?',da:'Tieren er fuld! Hvor mange klodser fyldte hullet?',sv:'Tiotalet är fullt! Hur många kuber fyllde luckan?',no:'Tieren er full! Hvor mange klosser fylte hullet?',es:'¡La decena está completa! ¿Cuántos cubos llenaron el hueco?',it:'La decina è completa! Quanti cubetti hanno riempito il buco?',pt:'A dezena está completa! Quantos cubinhos encheram o buraco?',fr:'La dizaine est pleine ! Combien de cubes ont rempli le trou ?',fi:'Kymppi on täynnä! Montako palikkaa koloon meni?'},
    hEmpty:      {en:'A ten and {left} more — type the total.',de:'Ein Zehner und noch {left} – tippe das Ergebnis ein.',nl:'Een tiental en nog {left} – typ het totaal.',da:'En tier og {left} mere – skriv resultatet.',sv:'Ett tiotal och {left} till – skriv summan.',no:'En tier og {left} til – skriv summen.',es:'Una decena y {left} más: escribe el total.',it:'Una decina e ancora {left}: scrivi il totale.',pt:'Uma dezena e mais {left}: digite o total.',fr:'Une dizaine et encore {left} : tape le total.',fi:'Kymppi ja vielä {left} – kirjoita summa.'},
    hType:       {en:'Type the total, or snap the stick first.',de:'Tippe das Ergebnis ein oder brich zuerst die Stange ab.',nl:'Typ het totaal, of breek eerst de staaf.',da:'Skriv resultatet, eller knæk stangen først.',sv:'Skriv summan, eller bryt staven först.',no:'Skriv summen, eller knekk stangen først.',es:'Escribe el total o parte primero la barra.',it:'Scrivi il totale o spezza prima la barretta.',pt:'Digite o total ou quebre a barra primeiro.',fr:'Tape le total, ou casse d’abord la barre.',fi:'Kirjoita summa tai katkaise ensin sauva.'},
    hShown:      {en:'Look: a ten and {left} more. Type the total again.',de:'Schau: ein Zehner und noch {left}. Tippe das Ergebnis noch einmal ein.',nl:'Kijk: een tiental en nog {left}. Typ het totaal nog een keer.',da:'Se: en tier og {left} mere. Skriv resultatet igen.',sv:'Titta: ett tiotal och {left} till. Skriv summan igen.',no:'Se: en tier og {left} til. Skriv summen igjen.',es:'Mira: una decena y {left} más. Escribe otra vez el total.',it:'Guarda: una decina e ancora {left}. Scrivi di nuovo il totale.',pt:'Olhe: uma dezena e mais {left}. Digite o total de novo.',fr:'Regarde : une dizaine et encore {left}. Tape de nouveau le total.',fi:'Katso: kymppi ja vielä {left}. Kirjoita summa uudelleen.'},
    hLeft:       {en:'The ten is full. Count what is left beside it.',de:'Der Zehner ist voll. Zähl, was daneben übrig ist.',nl:'Het tiental is vol. Tel wat ernaast over is.',da:'Tieren er fuld. Tæl det, der er tilbage ved siden af.',sv:'Tiotalet är fullt. Räkna det som är kvar bredvid.',no:'Tieren er full. Tell det som er igjen ved siden av.',es:'La decena está completa. Cuenta lo que sobra al lado.',it:'La decina è completa. Conta quello che resta accanto.',pt:'A dezena está completa. Conte o que sobrou ao lado.',fr:'La dizaine est pleine. Compte ce qui reste à côté.',fi:'Kymppi on täynnä. Laske, mitä sen viereen jäi.'},
    hOver:       {en:'Some of these cubes are already in the ten. Count only what is left beside it.',de:'Einige dieser Würfel stecken schon im Zehner. Zähl nur, was daneben übrig ist.',nl:'Een paar van deze blokjes zitten al in het tiental. Tel alleen wat ernaast over is.',da:'Nogle af klodserne sidder allerede i tieren. Tæl kun det, der er tilbage ved siden af.',sv:'Några av kuberna sitter redan i tiotalet. Räkna bara det som är kvar bredvid.',no:'Noen av klossene sitter allerede i tieren. Tell bare det som er igjen ved siden av.',es:'Algunos de estos cubos ya están en la decena. Cuenta solo lo que sobra al lado.',it:'Alcuni di questi cubetti sono già nella decina. Conta solo quello che resta accanto.',pt:'Alguns desses cubinhos já estão na dezena. Conte só o que sobrou ao lado.',fr:'Certains de ces cubes sont déjà dans la dizaine. Compte seulement ce qui reste à côté.',fi:'Osa näistä palikoista on jo kympissä. Laske vain se, mitä viereen jäi.'},
    hOn:         {en:'Count on from 10.',de:'Zähl von 10 aus weiter.',nl:'Tel door vanaf 10.',da:'Tæl videre fra 10.',sv:'Räkna vidare från 10.',no:'Tell videre fra 10.',es:'Sigue contando desde 10.',it:'Continua a contare da 10.',pt:'Continue contando a partir de 10.',fr:'Continue à compter à partir de 10.',fi:'Laske eteenpäin luvusta 10.'},
    hM10a:       {en:'Count the cubes that filled the hole.',de:'Zähl die Würfel, die die Lücke gefüllt haben.',nl:'Tel de blokjes die het gat vulden.',da:'Tæl de klodser, der fyldte hullet.',sv:'Räkna kuberna som fyllde luckan.',no:'Tell klossene som fylte hullet.',es:'Cuenta los cubos que llenaron el hueco.',it:'Conta i cubetti che hanno riempito il buco.',pt:'Conte os cubinhos que encheram o buraco.',fr:'Compte les cubes qui ont rempli le trou.',fi:'Laske palikat, jotka täyttivät kolon.'},
    hM10b:       {en:'The orange cubes and the new cubes make 10. How many new ones?',de:'Die orangefarbenen und die neuen Würfel sind zusammen 10. Wie viele neue?',nl:'De oranje en de nieuwe blokjes zijn samen 10. Hoeveel nieuwe?',da:'De orange og de nye klodser er tilsammen 10. Hvor mange nye?',sv:'De orange och de nya kuberna är tillsammans 10. Hur många nya?',no:'De oransje og de nye klossene er til sammen 10. Hvor mange nye?',es:'Los cubos naranjas y los nuevos son 10. ¿Cuántos nuevos hay?',it:'I cubetti arancioni e quelli nuovi fanno 10. Quanti sono i nuovi?',pt:'Os cubinhos laranja e os novos dão 10. Quantos são os novos?',fr:'Les cubes orange et les nouveaux font 10. Combien de nouveaux ?',fi:'Oranssit ja uudet palikat ovat yhteensä 10. Montako uutta?'},
    okAdd:       {en:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',de:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',nl:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',da:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',sv:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',no:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',es:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',it:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',pt:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',fr:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}',fi:'{a} + {b} = {a} + {plug} + {left} = 10 + {left} = {total}'},
    okM10:       {en:'{k} and {p} make 10!',de:'{k} und {p} sind zusammen 10!',nl:'{k} en {p} zijn samen 10!',da:'{k} og {p} er tilsammen 10!',sv:'{k} och {p} är tillsammans 10!',no:'{k} og {p} er til sammen 10!',es:'¡{k} y {p} son 10!',it:'{k} e {p} fanno 10!',pt:'{k} e {p} formam 10!',fr:'{k} et {p} font 10 !',fi:'{k} ja {p} ovat yhteensä 10!'},
    setLevel:    {en:'Level',de:'Stufe',nl:'Niveau',da:'Niveau',sv:'Nivå',no:'Nivå',es:'Nivel',it:'Livello',pt:'Nível',fr:'Niveau',fi:'Taso'},
    lvAdd:       {en:'Make a ten to add',de:'Über den Zehner rechnen',nl:'Via het tiental optellen',da:'Læg sammen over tieren',sv:'Addera över tiotalet',no:'Legg sammen over tieren',es:'Completar la decena para sumar',it:'Completare la decina per sommare',pt:'Completar a dezena para somar',fr:'Passer par la dizaine',fi:'Kymppiylitys'},
    lvM10:       {en:'Make 10',de:'Bis 10 ergänzen',nl:'Aanvullen tot 10',da:'Op til 10',sv:'Upp till 10',no:'Opp til 10',es:'Formar 10',it:'Fare 10',pt:'Formar 10',fr:'Faire 10',fi:'Kymppiparit'},
    setMode:     {en:'Mode',de:'Modus',nl:'Modus',da:'Måde',sv:'Läge',no:'Modus',es:'Modo',it:'Modalità',pt:'Modo',fr:'Mode',fi:'Tapa'},
    mSnap:       {en:'Snap first',de:'Erst abbrechen',nl:'Eerst breken',da:'Knæk først',sv:'Bryt först',no:'Knekk først',es:'Primero partir',it:'Prima spezzare',pt:'Quebrar primeiro',fr:'D’abord casser',fi:'Ensin katkaisu'},
    mHead:       {en:'In my head',de:'Im Kopf',nl:'Uit het hoofd',da:'I hovedet',sv:'I huvudet',no:'I hodet',es:'Mentalmente',it:'A mente',pt:'De cabeça',fr:'Dans ma tête',fi:'Päässä'},
    ariaRack:    {en:'Ten-rack with {n} cubes',de:'Zehnerschiene mit {n} Würfeln',nl:'Tienrek met {n} blokjes',da:'Tierskinne med {n} klodser',sv:'Tioskena med {n} kuber',no:'Tierskinne med {n} klosser',es:'Riel de diez con {n} cubos',it:'Binario da dieci con {n} cubetti',pt:'Trilho de dez com {n} cubinhos',fr:'Rail de dix avec {n} cubes',fi:'Kymppikisko, jossa on {n} palikkaa'},
    ariaStick:   {en:'Stick of {n} cubes',de:'Stange aus {n} Würfeln',nl:'Staaf van {n} blokjes',da:'Stang med {n} klodser',sv:'Stav med {n} kuber',no:'Stang med {n} klosser',es:'Barra de {n} cubos',it:'Barretta di {n} cubetti',pt:'Barra de {n} cubinhos',fr:'Barre de {n} cubes',fi:'{n} palikan sauva'},
    ariaStick1:  {en:'1 cube',de:'1 Würfel',nl:'1 blokje',da:'1 klods',sv:'1 kub',no:'1 kloss',es:'1 cubo',it:'1 cubetto',pt:'1 cubinho',fr:'1 cube',fi:'1 palikka'},
    ariaSwap:    {en:'Swap the numbers',de:'Zahlen tauschen',nl:'Getallen omwisselen',da:'Byt om på tallene',sv:'Byt plats på talen',no:'Bytt plass på tallene',es:'Cambiar el orden de los números',it:'Scambia i numeri',pt:'Trocar a ordem dos números',fr:'Échanger les nombres',fi:'Vaihda lukujen paikkaa'},
    ariaUndo:    {en:'Join the stick again',de:'Stange wieder zusammensetzen',nl:'Staaf weer heel maken',da:'Sæt stangen sammen igen',sv:'Sätt ihop staven igen',no:'Sett sammen stangen igjen',es:'Volver a unir la barra',it:'Riunisci la barretta',pt:'Juntar a barra de novo',fr:'Recoller la barre',fi:'Liitä sauva takaisin yhteen'},
    ariaCheck:   {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    ariaDel:     {en:'Delete',de:'Löschen',nl:'Wissen',da:'Slet',sv:'Radera',no:'Slett',es:'Borrar',it:'Cancella',pt:'Apagar',fr:'Effacer',fi:'Poista'},
    ariaAnswer:  {en:'Your answer: {n}',de:'Deine Antwort: {n}',nl:'Jouw antwoord: {n}',da:'Dit svar: {n}',sv:'Ditt svar: {n}',no:'Svaret ditt: {n}',es:'Tu respuesta: {n}',it:'La tua risposta: {n}',pt:'Sua resposta: {n}',fr:'Ta réponse : {n}',fi:'Vastauksesi: {n}'}
  },/*STRINGS-END*/

  defaults: { level: 'add', mode: 'snap' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'm10', labelKey: 'lvM10' }, { value: 'add', labelKey: 'lvAdd' }] },
    { key: 'mode', type: 'choice', labelKey: 'setMode', options: [{ value: 'snap', labelKey: 'mSnap' }, { value: 'head', labelKey: 'mHead' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._view = {}; this._cursor = {};
    injectPlugCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && !this.st.done) { this.st.mode = this._mode(); this._setLine(); if (this._wrap) this._paint(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return TenPlugCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return TenPlugCore.levelOf(this._setting('level')); },
  _mode: function () { return this._setting('mode') === 'head' ? 'head' : 'snap'; },
  _key: function () { return this._level(); },
  _lineKey: function () { var m10 = this._level() === 'm10', head = this._mode() === 'head'; return m10 ? (head ? 'tLineM10Head' : 'tLineM10') : (head ? 'tLineHead' : 'tLine'); },
  _setLine: function () { var line = this._t(this._lineKey()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TenPlugCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TenPlugCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], pa = { msg: this._t(this._lineKey()) }; this._pa = pa;
    return {
      id: 'plug.' + this._loc() + '.' + this._level() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx) {
    var C = TenPlugCore;
    this._clearTimers(); this._view = {}; this._cursor = {};
    this.st = C.newState(C.round(this._level(), idx), this._mode());
    this._setLine();
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) this._start(0);
    this._render2();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'tp-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="tp-eq" aria-live="polite"></div><div class="tp-board"></div><div class="tp-shelves" aria-hidden="true"></div><p class="tp-note" aria-live="polite"></p><div class="tp-keys" role="group"></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    wrap.addEventListener('keydown', function (e) {
      if (/^[0-9]$/.test(e.key)) { self._type(e.key); e.preventDefault(); }
      else if (e.key === 'Backspace') { self._type('del'); e.preventDefault(); }
      else if ((e.key === 's' || e.key === 'S') && self.st.r.swapOk) { self._swap(); e.preventDefault(); }
      else if (e.key === 'Enter' && !(e.target && e.target.classList && e.target.classList.contains('tp-piece'))) { self._check(); e.preventDefault(); }
    });
    var keys = this._q('.tp-keys');
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'del', 'ok'].forEach(function (k) {
      var b = api.el('button', 'tp-key' + (k === 'ok' ? ' is-ok' : k === 'del' ? ' is-del' : '')); b.type = 'button'; b.setAttribute('data-k', 'key-' + k);
      if (k === 'ok') { b.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M7 17l6 6 12-14" fill="none" stroke="#FFFFFF" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'; b.setAttribute('aria-label', self._t('ariaCheck')); }
      else if (k === 'del') { b.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M12 8h14v16H12l-7-8z" fill="none" stroke="#146B5E" stroke-width="3" stroke-linejoin="round"/><path d="M15 13l6 6M21 13l-6 6" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/></svg>'; b.setAttribute('aria-label', self._t('ariaDel')); }
      else b.textContent = k;
      b.addEventListener('click', function () { if (k === 'ok') self._check(); else self._type(k); });
      keys.appendChild(b);
    });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _geom: function (W) {
    var narrow = W < 620, ZW = Math.min(W, 660);
    var p = narrow ? Math.max(22, Math.min(34, Math.floor((ZW - 60) / 10))) : Math.min(58, Math.floor((ZW - 40) / 10.8));
    return { narrow: narrow, ZW: ZW, p: p, c: p - (narrow ? 4 : 6), gap: Math.max(10, Math.round(p * 0.32)), q: Math.max(12, Math.min(30, Math.floor((ZW - 50) / 20))) };   /* the shelves carry the miss picture: two trays of ten across the board */
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = TenPlugCore, st = this.st, r = st.r, G = this._geom(this._width()), v = this._view, self = this, m10 = r.level === 'm10';
    this._wrap.className = 'tp-wrap is-' + (G.narrow ? 'narrow' : 'wide') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (m10 ? ' is-m10' : '') + (st.mode === 'head' ? ' is-head' : '');
    var h = C.hole(st), inR = C.inRack(st), L = C.left(st);
    /* ---- the equation strip ---- */
    var box = '<span class="tp-ans' + (st.done ? ' is-ok' : '') + '" aria-label="' + this._t('ariaAnswer', { n: st.typed || '–' }) + '">' + (st.typed || '') + '</span>';
    var eqh;
    if (m10) eqh = '<span>' + st.a + ' + </span>' + box + '<span> = 10</span>';
    else {
      eqh = '<span>' + st.a + ' + ' + st.b + '</span>';
      if (st.first && !st.plugged) eqh += '<span> = ' + st.a + ' + ' + st.first[0] + ' + ' + st.first[1] + '</span>';
      if (st.plugged) eqh += '<span> = ' + st.a + ' + ' + h + ' + ' + L + '</span><span> = 10 + ' + L + '</span>';
      eqh += '<span> = </span>' + box;
    }
    this._q('.tp-eq').innerHTML = eqh;
    /* ---- the board ---- */
    var board = this._q('.tp-board'); board.innerHTML = ''; board.style.width = G.ZW + 'px';
    var p = G.p, c = G.c, rackW = 10 * p + 16, rx = (G.ZW - rackW) / 2, y = 0;
    /* the ten-rack */
    var rack = this.api.el('div', 'tp-rack' + (st.plugged ? ' is-gold' : '')); rack.style.cssText = 'left:' + rx + 'px;top:0;width:' + rackW + 'px;height:' + (p + 14) + 'px;';
    rack.setAttribute('role', 'img'); rack.setAttribute('aria-label', this._t('ariaRack', { n: st.a + inR }));
    var s = '<svg width="' + rackW + '" height="' + (p + 14) + '" viewBox="0 0 ' + rackW + ' ' + (p + 14) + '" aria-hidden="true"><rect x="1.5" y="1.5" width="' + (rackW - 3) + '" height="' + (p + 11) + '" rx="10" class="tp-chan"/><rect x="' + (rackW - 11) + '" y="1.5" width="9.5" height="' + (p + 11) + '" rx="4" class="tp-wall"/>';
    var gold = st.plugged, rackPieces = st.pieces.filter(function (x) { return x.where === 'rack'; }), slot = 0, i;
    for (i = 0; i < 10; i++) {
      var cx = 6 + i * p + (p - c) / 2, cy = 7 + (p - c) / 2;
      if (i < st.a) s += cubeSVG(cx, cy, c, gold ? 'gold' : 'coral', gold ? i : -1, i === 9 && v.ten);
      else if (i < st.a + inR) s += cubeSVG(cx, cy, c, gold ? 'gold' : 'teal', gold ? i : -1, i === 9 && v.ten);
      else s += '<rect x="' + cx + '" y="' + cy + '" width="' + c + '" height="' + c + '" rx="' + (c * 0.18) + '" class="tp-slot' + (st.last && st.last.reason === 'short' ? ' is-gap' : '') + '"/>';
    }
    if (gold && v.ten) s += '<text x="' + (rackW - 18) + '" y="' + (7 + p / 2 + p * 0.18) + '" class="tp-tenlab" font-size="' + Math.round(p * 0.52) + '">10</text>';
    s += '</svg>'; rack.innerHTML = s; board.appendChild(rack);
    /* pieces sitting in the rack can be tapped out again (before the ten is full) */
    var acc = st.a;
    rackPieces.forEach(function (pc) {
      var b = self.api.el('button', 'tp-inrack'); b.type = 'button'; b.setAttribute('data-k', 'rack-' + pc.id);
      var bw = Math.max(44, pc.len * p); b.style.cssText = 'left:' + (rx + 6 + acc * p + (pc.len * p - bw) / 2) + 'px;top:0;width:' + bw + 'px;height:' + (p + 14) + 'px;';
      b.setAttribute('aria-label', pc.len === 1 ? self._t('ariaStick1') : self._t('ariaStick', { n: pc.len }));
      b.disabled = st.plugged || st.done; b.hidden = st.plugged;
      b.addEventListener('click', function () { if (TenPlugCore.unplug(st, pc.id)) { self._view = {}; self.api.sound(300); self._paint(); } });
      board.appendChild(b); acc += pc.len;
    });
    y = p + 14 + (G.narrow ? 6 : 10);
    /* the bond: the second number's circle over its two snapped parts */
    var bR = G.narrow ? 20 : 30, lR = G.narrow ? 16 : 24, bondH = bR * 2 + lR * 2 + (G.narrow ? 18 : 26), bx = G.ZW / 2, dx = G.narrow ? 54 : 78;
    if (!m10) {
      var sv = '<svg width="' + G.ZW + '" height="' + bondH + '" viewBox="0 0 ' + G.ZW + ' ' + bondH + '" aria-hidden="true">';
      var ly = bondH - lR - 2, goldSide = st.plugged && st.first && !st.auto ? (st.first[0] === h ? 0 : st.first[1] === h ? 1 : -1) : (st.plugged && st.auto ? 0 : -1);
      var parts = st.plugged && st.auto ? [h, st.b - h] : st.first;
      [-1, 1].forEach(function (sg, k) { sv += '<line x1="' + bx + '" y1="' + (bR * 2 + 2) + '" x2="' + (bx + sg * dx) + '" y2="' + (ly - lR + 2) + '" class="tp-leg' + (goldSide === k ? ' is-gold' : '') + '"/>'; });
      sv += '<circle cx="' + bx + '" cy="' + (bR + 2) + '" r="' + bR + '" class="tp-bc"/><text x="' + bx + '" y="' + (bR + 2 + bR * 0.36) + '" class="tp-bn" font-size="' + Math.round(bR * 1.05) + '">' + st.b + '</text>';
      [-1, 1].forEach(function (sg, k) { var on = parts ? parts[k] : null; sv += '<circle cx="' + (bx + sg * dx) + '" cy="' + ly + '" r="' + lR + '" class="tp-lc' + (on == null ? ' is-empty' : '') + (goldSide === k ? ' is-gold' : '') + '"/>' + (on == null ? '' : '<text x="' + (bx + sg * dx) + '" y="' + (ly + lR * 0.36) + '" class="tp-bn" font-size="' + Math.round(lR * 1.05) + '">' + on + '</text>'); });
      sv += '</svg>';
      var bond = this.api.el('div', 'tp-bond'); bond.style.cssText = 'left:0;top:' + y + 'px;width:' + G.ZW + 'px;height:' + bondH + 'px;'; bond.innerHTML = sv; board.appendChild(bond);
    }
    /* the swap and undo chips sit at the two ends of the bond row */
    var chipY = y + (m10 ? 0 : Math.max(0, (bondH - 52) / 2));
    if (r.swapOk) {
      var sw = this.api.el('button', 'tp-tbtn tp-swap'); sw.type = 'button'; sw.setAttribute('data-k', 'swap'); sw.setAttribute('aria-label', this._t('ariaSwap'));
      sw.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 11h18l-5-5M26 21H8l5 5" fill="none" stroke="#146B5E" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      sw.style.cssText = 'left:' + rx + 'px;top:' + chipY + 'px;'; sw.disabled = st.done || st.plugged || !C.whole(st);
      sw.addEventListener('click', function () { self._swap(); }); board.appendChild(sw);
    }
    var un = this.api.el('button', 'tp-tbtn tp-undo'); un.type = 'button'; un.setAttribute('data-k', 'undo'); un.setAttribute('aria-label', this._t('ariaUndo'));
    un.innerHTML = '<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M10 9 4 15l6 6" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15h13a8 8 0 0 1 0 16h-3" fill="none" stroke="#146B5E" stroke-width="3.5" stroke-linecap="round"/></svg>';
    un.style.cssText = 'left:' + (rx + rackW - 52) + 'px;top:' + chipY + 'px;'; un.disabled = st.done || st.plugged || C.whole(st);
    un.addEventListener('click', function () { if (TenPlugCore.reset(st)) { self._view = {}; self.api.sound(380); self._paint(); } }); board.appendChild(un);
    y += m10 ? 62 : bondH + (G.narrow ? 2 : 6);
    /* the mat: the stick and its pieces, left to right */
    var mat = st.pieces.filter(function (x) { return x.where === 'mat'; }), widths = mat.map(function (x) { return Math.max(44, x.len * p); });
    var total = widths.reduce(function (s2, w) { return s2 + w; }, 0) + Math.max(0, mat.length - 1) * G.gap, mx = (G.ZW - total) / 2, ph = Math.max(G.narrow ? 44 : 48, p + 8), pad = G.narrow ? 4 : 8;
    var matBox = this.api.el('div', 'tp-mat'); matBox.style.cssText = 'left:' + Math.max(0, rx) + 'px;top:' + y + 'px;width:' + rackW + 'px;height:' + (ph + pad) + 'px;'; board.appendChild(matBox);
    mat.forEach(function (pc, k) {
      var w = widths[k], b = self._piece(pc, mx, y + pad / 2, w, ph, G); board.appendChild(b); mx += w + G.gap;
    });
    y += ph + pad;
    board.style.height = y + 'px';
    /* ---- the shelves: the golden ten and the ones beside it (and the miss picture) ---- */
    var sh = this._q('.tp-shelves'); sh.hidden = m10; sh.innerHTML = '';
    if (!m10) sh.innerHTML = this._shelvesSVG(G, L);
    /* ---- keys ---- */
    var asleep = st.mode === 'snap' && !st.plugged;
    [].forEach.call(this._wrap.querySelectorAll('.tp-key'), function (k) { var key = k.getAttribute('data-k'); k.disabled = st.done || (asleep && key !== 'key-ok'); });
    this._wrap.classList.toggle('keys-asleep', asleep);
    /* ---- the note ---- */
    var note = this._q('.tp-note'), hk = C.hint(st), txt = '', cls = 'tp-note';
    if (st.done && v.msg) { txt = v.msg; cls += ' is-ok'; }
    else if (hk) { txt = this._t(hk, { left: L }); cls += (hk === 'nFit' || hk === 'nFitM10') ? ' is-ok' : ' is-hint'; }
    note.className = cls; note.textContent = txt;
    /* a too-long piece bounces where it lies */
    if (v.bounce) { var bb = this._wrap.querySelector('[data-k="piece-' + v.bounce + '"]'); if (bb) { void bb.offsetWidth; bb.classList.add('is-bounce'); } }
  },
  /* one piece of the stick: a row of joined cubes; a tap snaps at the nearest joint, a drag carries it */
  _piece: function (pc, x, y, w, ph, G) {
    var st = this.st, self = this, p = G.p, c = G.c, len = pc.len, inner = len * p;
    var b = this.api.el('button', 'tp-piece'); b.type = 'button'; b.setAttribute('data-k', 'piece-' + pc.id); b.setAttribute('data-len', len);
    b.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + ph + 'px;';
    b.setAttribute('aria-label', len === 1 ? this._t('ariaStick1') : this._t('ariaStick', { n: len }));
    var ox = (w - inner) / 2, oy = (ph - c) / 2, s = '<svg width="' + w + '" height="' + ph + '" viewBox="0 0 ' + w + ' ' + ph + '" aria-hidden="true">';
    for (var i = 0; i < len; i++) s += cubeSVG(ox + i * p + (p - c) / 2, oy, c, st.mode === 'head' && !st.plugged && !st.first && st.pieces.length === 1 ? 'faint' : 'teal', -1, false);
    for (var j = 1; j < len; j++) s += '<rect x="' + (ox + j * p - 1.5) + '" y="' + (oy + 2) + '" width="3" height="' + (c - 4) + '" rx="1.5" class="tp-joint' + (this._cursor[pc.id] === j ? ' is-cur' : '') + '"/>';
    s += '</svg>'; b.innerHTML = s;
    b.disabled = st.done || st.plugged;
    b._ox = ox;
    var drag = null;
    b.addEventListener('pointerdown', function (e) { if (b.disabled) return; drag = { x0: e.clientX, y0: e.clientY, on: false }; try { b.setPointerCapture(e.pointerId); } catch (er) {} });
    b.addEventListener('pointermove', function (e) { if (!drag) return; var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0; if (!drag.on && Math.abs(dx) + Math.abs(dy) > 8) { drag.on = true; b.classList.add('is-dragging'); } if (drag.on) b.style.transform = 'translate(' + dx + 'px,' + dy + 'px) scale(1.05)'; });
    b.addEventListener('pointerup', function (e) {
      var d = drag; drag = null; if (!d) return;
      if (!d.on) { var rb = b.getBoundingClientRect(), xx = e.clientX - rb.left - b._ox, j = Math.round(xx / p); self._snap(pc.id, Math.max(1, Math.min(len - 1, j))); return; }
      b.classList.remove('is-dragging'); b.style.transform = '';
      var rk = self._q('.tp-rack').getBoundingClientRect();
      if (e.clientX >= rk.left - 20 && e.clientX <= rk.right + 20 && e.clientY >= rk.top - 30 && e.clientY <= rk.bottom + 30) self._plug(pc.id);
    });
    b.addEventListener('pointercancel', function () { drag = null; b.classList.remove('is-dragging'); b.style.transform = ''; });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { self._plug(pc.id); e.preventDefault(); e.stopPropagation(); }
      else if (e.key === ' ' || e.key === 'x' || e.key === 'X') { self._snap(pc.id, self._cursor[pc.id] || Math.floor(len / 2) || 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { if (len > 1) { var cu = self._cursor[pc.id] || Math.floor(len / 2) || 1; cu = Math.max(1, Math.min(len - 1, cu + (e.key === 'ArrowRight' ? 1 : -1))); self._cursor[pc.id] = cu; self._paint(); } e.preventDefault(); }
    });
    return b;
  },
  _shelvesSVG: function (G, L) {
    var st = this.st, q = G.q, gs = TenPlugCore.ghost(st), v = this._view, show = st.show;
    var tenW = 10 * q + 14, oneW = 10 * q + 14, gap = 18, W = tenW + gap + oneW, H = q + 18, s = '';
    s += '<rect x="1" y="1" width="' + tenW + '" height="' + (H - 2) + '" rx="8" class="tp-shelf"/><rect x="' + (tenW + gap) + '" y="1" width="' + (oneW - 20) + '" height="' + (H - 2) + '" rx="8" class="tp-shelf"/>';
    var cube = function (x, cls) { return '<rect x="' + x + '" y="' + 9 + '" width="' + (q - 3) + '" height="' + (q - 3) + '" rx="' + (q * 0.2) + '" class="' + cls + '"/>'; };
    var i;
    if (st.plugged) {
      for (i = 0; i < 10; i++) s += cube(8 + i * q, 'tp-mini is-gold');
      if (show >= 2) s += '<text x="' + (tenW / 2) + '" y="' + (9 + q * 0.72) + '" class="tp-tenlab" font-size="' + Math.round(q * 0.9) + '">10</text>';
      var ox = tenW + gap + 8, slots = gs ? Math.min(10, gs.slots) : 0;
      for (i = 0; i < Math.max(L, slots) && i < 10; i++) {
        var x = ox + i * q;
        if (i < L) s += cube(x, 'tp-mini is-teal' + (gs && i >= slots ? ' is-out' : ''));
        if (gs && i < slots) s += '<rect x="' + (x - 1) + '" y="8" width="' + (q - 1) + '" height="' + (q - 1) + '" rx="' + (q * 0.2) + '" class="tp-ghost' + (i >= L ? ' is-extra' : '') + '"/>';
      }
      if (gs && gs.extra) s += '<path d="M' + (ox + L * q + 2) + ' 8 C ' + (tenW + gap / 2) + ' -6, ' + (tenW - 20) + ' -6, ' + (tenW - 26) + ' 8" fill="none" class="tp-thread"/>';
    }
    return '<svg width="' + (W - 18) + '" height="' + H + '" viewBox="-2 -10 ' + (W - 14) + ' ' + (H + 10) + '">' + s + '</svg>';
  },
  /* ---------------- actions ---------------- */
  _snap: function (id, j) {
    if (TenPlugCore.snap(this.st, id, j)) { this._view = {}; this.api.sound(700); this._paint(); }
  },
  _plug: function (id) {
    var st = this.st, self = this, res = TenPlugCore.plug(st, id);
    if (!res) return;
    this._view = {};
    if (res === 'long') { this._view.bounce = id; this.api.sound(180); }
    else if (res === 'short') this.api.sound(320);
    else { for (var k = 0; k < 10; k++) (function (k) { self._later(function () { self.api.sound(523 + k * 55); }, self._ms(30 * k)); })(k); }
    this._paint(); this.api.announce(this._q('.tp-note').textContent || '');
  },
  _swap: function () { if (TenPlugCore.swap(this.st)) { this._view = {}; this.api.sound(440); this._paint(); } },
  _type: function (k) { if (this.st.done) return; if (TenPlugCore.type(this.st, k)) { this._view = {}; this.api.sound(560); this._paint(); } },
  _check: function () {
    var C = TenPlugCore, st = this.st, r = st.r, self = this;
    if (st.done) return;
    var res = C.check(st);
    this._view = {};
    if (!res.ok) { if (st.show >= 2) this._view.ten = true; this.api.sound(res.reason === 'snap' || res.reason === 'empty' ? 460 : 220); this._paint(); this.api.announce(this._q('.tp-note').textContent || ''); var kk = this._q('.tp-keys'); if (kk && kk.scrollIntoView) kk.scrollIntoView({ block: 'nearest' }); return; }
    var h = C.hole(st), L = C.left(st);
    var msg = r.level === 'm10' ? this._t('okM10', { k: st.a, p: r.answer }) : this._t('okAdd', { a: st.a, b: st.b, plug: h, left: L, total: r.answer });
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg, ten: true };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140)); this._later(function () { self.api.sound(1568); }, this._ms(280));
    this._paint(); this.api.announce(msg);
    this._later(function () { var n = self._q('.tp-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);
    this._advance(msg.length * 60 + 1500);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

/* a linking cube: a rounded square with a small top nub */
var TP_COL = { coral: ['#F2784B', '#C9542B'], teal: ['#1E8A78', '#0F5C4F'], gold: ['#E8B53A', '#B07A00'], faint: ['#FFFFFF', '#9CC9BE'] };
function cubeSVG(x, y, c, col, k, ten) {
  var f = TP_COL[col], r = c * 0.18, n = c * 0.34, dash = col === 'faint' ? ' stroke-dasharray="4 3"' : '';
  var delay = k >= 0 ? ' style="animation-delay:' + (k * 30) + 'ms"' : '';
  return '<g class="tp-cube' + (col === 'gold' ? ' is-gold' : '') + '"' + delay + '><rect x="' + (x + (c - n) / 2).toFixed(1) + '" y="' + (y - c * 0.1).toFixed(1) + '" width="' + n.toFixed(1) + '" height="' + (c * 0.2).toFixed(1) + '" rx="2" fill="' + f[0] + '" stroke="' + f[1] + '" stroke-width="2"' + dash + '/>'
    + '<rect x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '" width="' + c.toFixed(1) + '" height="' + c.toFixed(1) + '" rx="' + r.toFixed(1) + '" fill="' + f[0] + '" stroke="' + f[1] + '" stroke-width="2"' + dash + '/></g>';
}

var tpCssDone = false;
function injectPlugCSS() {
  if (tpCssDone || typeof document === 'undefined') return;
  tpCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tp-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.tp-eq{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:0 .25em;font-family:' + H + ';font-weight:800;font-size:30px;line-height:1.25;color:#0F4A40;max-width:100%;}'
  + '.tp-eq span{white-space:nowrap;} .tp-ans{display:inline-flex;align-items:center;justify-content:center;min-width:66px;height:50px;padding:0 8px;box-sizing:border-box;border-radius:12px;background:#FFFFFF;box-shadow:inset 0 0 0 3px #0F4A40;} .tp-ans:empty::after{content:"?";color:#9CC9BE;} .tp-ans.is-ok{background:#146B5E;color:#FFFFFF;}'
  + '.tp-board{position:relative;max-width:100%;} .tp-board>*{position:absolute;}'
  + '.tp-rack svg{display:block;} .tp-chan{fill:#E9D7B6;stroke:#3A2E1F;stroke-width:3;} .tp-wall{fill:#8A6B42;stroke:#3A2E1F;stroke-width:2;}'
  + '.tp-rack.is-gold .tp-chan{fill:#FFF0C2;stroke:#B07A00;} .tp-slot{fill:#F6EBD6;stroke:#B9A27C;stroke-width:2;stroke-dasharray:5 4;} .tp-slot.is-gap{fill:#FFE3B8;stroke:#D9822B;animation:tpGlow 1s ease-in-out 2;} @keyframes tpGlow{50%{fill:#FFC98A;}}'
  + '.tp-cube.is-gold{animation:tpGold .35s ease-out both;} @keyframes tpGold{from{opacity:.2;transform:translateY(-4px);}}'
  + '.tp-tenlab{fill:#7A5200;font-family:' + H + ';font-weight:800;text-anchor:middle;}'
  + '.tp-inrack{padding:0;border:0;background:transparent;cursor:pointer;border-radius:10px;} .tp-inrack[hidden]{display:none;} .tp-inrack:not(:disabled):hover{box-shadow:inset 0 0 0 3px #F2784B;}'
  + '.tp-bond svg{display:block;} .tp-leg{stroke:#146B5E;stroke-width:3;opacity:.55;} .tp-leg.is-gold{stroke:#D4A21E;opacity:1;stroke-width:4;}'
  + '.tp-bc{fill:#FFFDF7;stroke:#146B5E;stroke-width:3;} .tp-lc{fill:#FFFDF7;stroke:#146B5E;stroke-width:2.5;} .tp-lc.is-empty{fill:none;stroke:#9CC9BE;stroke-dasharray:4 3;} .tp-lc.is-gold{stroke:#D4A21E;stroke-width:3.5;fill:#FFF6D6;}'
  + '.tp-bn{fill:#0F4A40;font-family:' + H + ';font-weight:800;text-anchor:middle;}'
  + '.tp-tbtn{width:52px;height:52px;padding:0;border:0;border-radius:26px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #146B5E,0 3px 0 #9CC9BE;cursor:pointer;display:flex;align-items:center;justify-content:center;} .tp-tbtn svg{width:28px;height:28px;} .tp-tbtn:disabled{opacity:.3;cursor:default;}'
  + '.tp-mat{border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 2px #EADBC0;}'
  + '.tp-piece{z-index:2;padding:0;border:0;background:none;cursor:pointer;touch-action:none;border-radius:10px;transition:left .2s;} .tp-piece svg{display:block;} .tp-piece:disabled{cursor:default;}'
  + '.tp-piece.is-dragging{z-index:6;transition:none;filter:drop-shadow(0 6px 8px rgba(0,0,0,.25));} .tp-piece.is-bounce{animation:tpBounce .5s ease-in-out;} @keyframes tpBounce{20%{transform:translateY(-14px) rotate(-6deg);}45%{transform:translateY(-6px) rotate(5deg);}70%{transform:rotate(-3deg);}}'
  + '.tp-joint{fill:#FFFFFF;opacity:.0;} .tp-piece:not(:disabled):hover .tp-joint,.tp-joint.is-cur{opacity:.85;} .tp-piece:focus-visible,.tp-tbtn:focus-visible,.tp-key:focus-visible,.tp-inrack:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.tp-shelves{display:flex;justify-content:center;} .tp-shelves[hidden]{display:none;} .tp-shelves svg{display:block;overflow:visible;}'
  + '.tp-shelf{fill:#F6EBD6;stroke:#C9B48A;stroke-width:2;} .tp-mini.is-gold{fill:#E8B53A;stroke:#B07A00;stroke-width:1.5;} .tp-mini.is-teal{fill:#1E8A78;stroke:#0F5C4F;stroke-width:1.5;} .tp-mini.is-out{stroke:#F2784B;stroke-width:3;}'
  + '.tp-ghost{fill:none;stroke:#6FB3A6;stroke-width:2;stroke-dasharray:3 2;} .tp-ghost.is-extra{fill:#FFE3B8;stroke:#D9822B;animation:tpGlow 1s ease-in-out 2;} .tp-thread{stroke:#D4A21E;stroke-width:2.5;stroke-dasharray:4 3;}'
  + '.tp-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .tp-note:empty{display:none;} .tp-note.is-hint{color:#B5461F;} .tp-note.is-ok{color:#146B5E;}'
  + '.tp-wrap.is-done .tp-note.is-ok{font-family:' + H + ';font-size:22px;}'
  + '.tp-keys{display:grid;grid-template-columns:repeat(12,minmax(44px,52px));gap:6px;justify-content:center;width:100%;}'
  + '.tp-key{height:52px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40,0 4px 0 #9CC9BE;font-family:' + H + ';font-weight:800;font-size:26px;color:#0F4A40;cursor:pointer;display:flex;align-items:center;justify-content:center;}'
  + '.tp-key svg{width:28px;height:28px;} .tp-key.is-ok{background:#146B5E;box-shadow:0 4px 0 #0F4A40;} .tp-key:disabled{opacity:.35;cursor:default;}'
  + '.tp-wrap.is-narrow{gap:7px;} .tp-wrap.is-narrow .tp-eq{font-size:22px;} .tp-wrap.is-narrow .tp-ans{min-width:52px;height:40px;border-radius:10px;}'
  + '.tp-wrap.is-narrow .tp-keys{grid-template-columns:repeat(6,minmax(44px,1fr));max-width:420px;gap:5px;} .tp-wrap.is-narrow .tp-key{height:46px;font-size:24px;} .tp-wrap.is-narrow .tp-note{font-size:17px;}'
  + '.tp-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.tp-keys,.tp-tbtn,.tp-note{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.tp-wrap *{animation-duration:.15s !important;animation-iteration-count:1 !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'tp-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.TenPlugActivity = TenPlugActivity;
