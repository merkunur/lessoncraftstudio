/* =====================================================================
   lamplight-cupboard-activity.js — ACTIVITY #80 of the one-by-one rebuild:
   "Sock & Shadow" → THE LAMPLIGHT CUPBOARD (SL.K.6, 11 locales).
   Design sheet: docs/activities-rebuild/designs/080-sock-and-shadow.md
   ---------------------------------------------------------------------
   THE INVENTION: Shadow's cupboard is dark. Every word the child taps
   lights only the things that fit it; the speaking tube sends the words to
   Shadow's memory pegs (one word too many knocks the first off), and the
   little door in the curtain lets exactly ONE lit thing through — two lit
   things jam in the door. Sock's thing wears a coral ring on the outside of
   the glass. Feeling rounds: "I feel … because …" — the feeling lights a
   face, the reason lights the help Shadow brings.
   ACTIVITY LAYER ONLY: the model is lamplight-cupboard-core.js; pictures
   through lcs-pictures.js; lcs-shell.js untouched (the shell's Check is
   hidden and pressed by this activity on success). Test seams:
   window.LamplightCupboardActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var LamplightCupboardActivity = {
  id: 'lamplight-cupboard',
  apparatusClasses: ['lc-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Sock & Shadow',de:'Socke & Schatten',nl:'Sok & Schaduw',da:'Strømpe og Skygge',sv:'Strumpa och Skugga',no:'Sokk og Skygge',es:'Calcetín y Sombra',it:'Calzino e Ombra',pt:'Meia e Sombra',fr:'Chaussette et Ombre',fi:'Sukka ja Varjo'},
    tL1:         {en:'Tell Shadow which thing Sock means.',de:'Sag Schatten, welches Ding Socke meint.',nl:'Vertel Schaduw welk ding Sok bedoelt.',da:'Fortæl Skygge, hvilken ting Strømpe mener.',sv:'Berätta för Skugga vilken sak Strumpa menar.',no:'Fortell Skygge hvilken ting Sokk mener.',es:'Dile a Sombra qué cosa quiere Calcetín.',it:'Di’ a Ombra quale cosa vuole Calzino.',pt:'Diga à Sombra qual coisa a Meia quer.',fr:'Dis à Ombre de quel objet Chaussette parle.',fi:'Kerro Varjolle, mitä esinettä Sukka tarkoittaa.'},
    tL2:         {en:'Tell Shadow how you feel — and why.',de:'Sag Schatten, wie du dich fühlst – und warum.',nl:'Vertel Schaduw hoe je je voelt – en waarom.',da:'Fortæl Skygge, hvordan du har det – og hvorfor.',sv:'Berätta för Skugga hur du känner dig – och varför.',no:'Fortell Skygge hvordan du har det – og hvorfor.',es:'Dile a Sombra cómo te sientes y por qué.',it:'Di’ a Ombra come ti senti e perché.',pt:'Diga à Sombra como você se sente e por quê.',fr:'Dis à Ombre ce que tu ressens, et pourquoi.',fi:'Kerro Varjolle, miltä sinusta tuntuu – ja miksi.'},
    hEmpty:      {en:'Say a word into the tube first.',de:'Sag zuerst ein Wort in das Rohr.',nl:'Zeg eerst een woord in de buis.',da:'Sig først et ord ind i røret.',sv:'Säg först ett ord i röret.',no:'Si først et ord inn i røret.',es:'Primero di una palabra por el tubo.',it:'Prima di’ una parola nel tubo.',pt:'Primeiro diga uma palavra no tubo.',fr:'Dis d’abord un mot dans le tuyau.',fi:'Sano ensin sana putkeen.'},
    hJam:        {en:'More than one thing came to the door. Add a word that tells them apart.',de:'Mehr als ein Ding ist zur Tür gekommen. Nimm ein Wort dazu, das sie unterscheidet.',nl:'Er kwam meer dan één ding naar het deurtje. Voeg een woord toe dat ze uit elkaar houdt.',da:'Mere end én ting kom hen til lågen. Tilføj et ord, der kan skelne dem.',sv:'Mer än en sak kom fram till luckan. Lägg till ett ord som skiljer dem åt.',no:'Mer enn én ting kom til luka. Legg til et ord som skiller dem fra hverandre.',es:'Llegó más de una cosa a la puerta. Agrega una palabra que las distinga.',it:'È arrivata più di una cosa alla porta. Aggiungi una parola che le distingua.',pt:'Mais de uma coisa veio até a porta. Coloque uma palavra que diferencie as coisas.',fr:'Plus d’une chose est arrivée à la porte. Ajoute un mot qui les distingue.',fi:'Luukulle tuli useampi kuin yksi esine. Lisää sana, joka erottaa ne.'},
    hNone:       {en:'Nothing in Shadow’s cupboard fits those words. Look at Sock’s thing again.',de:'Nichts in Schattens Schrank passt zu diesen Wörtern. Schau dir Sockes Ding noch einmal an.',nl:'Niets in de kast van Schaduw past bij die woorden. Kijk nog eens naar het ding van Sok.',da:'Intet i Skygges skab passer til de ord. Se på Strømpes ting igen.',sv:'Inget i Skuggas skåp passar till de orden. Titta på Strumpas sak igen.',no:'Ingenting i Skygges skap passer til de ordene. Se på Sokks ting igjen.',es:'Nada en el armario de Sombra va con esas palabras. Mira otra vez la cosa de Calcetín.',it:'Niente nell’armadio di Ombra va con queste parole. Guarda di nuovo la cosa di Calzino.',pt:'Nada no armário da Sombra combina com essas palavras. Olhe de novo a coisa da Meia.',fr:'Rien dans le placard d’Ombre ne va avec ces mots. Regarde encore la chose de Chaussette.',fi:'Mikään Varjon kaapissa ei sovi niihin sanoihin. Katso Sukan esinettä uudelleen.'},
    hWrong:      {en:'That one has no ring. Which word tells Shadow the difference?',de:'Das hat keinen Ring. Welches Wort zeigt Schatten den Unterschied?',nl:'Dat ding heeft geen ring. Welk woord laat Schaduw het verschil zien?',da:'Den har ingen ring. Hvilket ord viser Skygge forskellen?',sv:'Den har ingen ring. Vilket ord visar Skugga skillnaden?',no:'Den har ingen ring. Hvilket ord viser Skygge forskjellen?',es:'Esa no tiene anillo. ¿Qué palabra le dice a Sombra la diferencia?',it:'Quella non ha l’anello. Quale parola spiega a Ombra la differenza?',pt:'Essa não tem anel. Qual palavra mostra a diferença para a Sombra?',fr:'Celui-là n’a pas d’anneau. Quel mot montre la différence à Ombre ?',fi:'Siinä ei ole rengasta. Mikä sana kertoo Varjolle eron?'},
    hOverflow:   {en:'Shadow can only hold {n} words. One rolled away. Say less!',de:'Schatten kann sich nur {n} Wörter merken. Eins ist weggerollt. Sag weniger!',nl:'Schaduw kan maar {n} woorden onthouden. Er is er een weggerold. Zeg minder!',da:'Skygge kan kun huske {n} ord. Ét rullede væk. Sig mindre!',sv:'Skugga kan bara minnas {n} ord. Ett rullade bort. Säg mindre!',no:'Skygge kan bare huske {n} ord. Ett rullet bort. Si mindre!',es:'Sombra solo puede guardar {n} palabras. Una se fue rodando. ¡Di menos!',it:'Ombra può ricordare solo {n} parole. Una è rotolata via. Di’ meno parole!',pt:'A Sombra só consegue guardar {n} palavras. Uma saiu rolando. Diga menos!',fr:'Ombre ne peut retenir que {n} mots. Un mot a roulé plus loin. Dis-en moins !',fi:'Varjo muistaa vain {n} sanaa. Yksi vieri pois. Sano vähemmän!'},
    hNoFeel:     {en:'Shadow knows what to bring, but not how you feel. Add a feeling word.',de:'Schatten weiß, was zu holen ist, aber nicht, wie du dich fühlst. Nimm ein Gefühlswort dazu.',nl:'Schaduw weet wat er gebracht moet worden, maar niet hoe je je voelt. Voeg een gevoelswoord toe.',da:'Skygge ved, hvad der skal hentes, men ikke hvordan du har det. Tilføj et følelsesord.',sv:'Skugga vet vad som ska hämtas, men inte hur du känner dig. Lägg till ett känsloord.',no:'Skygge vet hva som skal hentes, men ikke hvordan du har det. Legg til et følelsesord.',es:'Sombra sabe qué traer, pero no cómo te sientes. Agrega una palabra que diga cómo te sientes.',it:'Ombra sa che cosa portare, ma non come ti senti. Aggiungi una parola per come ti senti.',pt:'A Sombra sabe o que trazer, mas não como você se sente. Coloque uma palavra de sentimento.',fr:'Ombre sait quoi apporter, mais pas ce que tu ressens. Ajoute un mot pour ce que tu ressens.',fi:'Varjo tietää, mitä tuoda, mutta ei sitä, miltä sinusta tuntuu. Lisää tunnesana.'},
    hNoWhy:      {en:'Shadow knows how you feel, but not why. Add what happened.',de:'Schatten weiß, wie du dich fühlst, aber nicht, warum. Sag, was passiert ist.',nl:'Schaduw weet hoe je je voelt, maar niet waarom. Zeg wat er gebeurd is.',da:'Skygge ved, hvordan du har det, men ikke hvorfor. Sig, hvad der er sket.',sv:'Skugga vet hur du känner dig, men inte varför. Säg vad som hände.',no:'Skygge vet hvordan du har det, men ikke hvorfor. Si hva som skjedde.',es:'Sombra sabe cómo te sientes, pero no por qué. Di qué pasó.',it:'Ombra sa come ti senti, ma non perché. Di’ che cosa è successo.',pt:'A Sombra sabe como você se sente, mas não por quê. Diga o que aconteceu.',fr:'Ombre sait ce que tu ressens, mais pas pourquoi. Dis ce qui s’est passé.',fi:'Varjo tietää, miltä sinusta tuntuu, mutta ei sitä, miksi. Kerro, mitä tapahtui.'},
    hWrongFace:  {en:'Look at Sock’s face again. Which feeling fits?',de:'Schau dir Sockes Gesicht noch einmal an. Welches Gefühl passt?',nl:'Kijk nog eens naar het gezicht van Sok. Welk gevoel past?',da:'Se på Strømpes ansigt igen. Hvilken følelse passer?',sv:'Titta på Strumpas ansikte igen. Vilken känsla passar?',no:'Se på ansiktet til Sokk igjen. Hvilken følelse passer?',es:'Mira otra vez la cara de Calcetín. ¿Qué sentimiento va?',it:'Guarda di nuovo la faccia di Calzino. Quale sentimento va bene?',pt:'Olhe de novo o rosto da Meia. Qual sentimento combina?',fr:'Regarde encore le visage de Chaussette. Quel sentiment va ?',fi:'Katso Sukan kasvoja uudelleen. Mikä tunne sopii?'},
    hWrongHelp:  {en:'Look at what happened to Sock. Which reason fits?',de:'Schau, was Socke passiert ist. Welcher Grund passt?',nl:'Kijk wat er met Sok gebeurd is. Welke reden past?',da:'Se, hvad der er sket med Strømpe. Hvilken grund passer?',sv:'Titta på vad som hände Strumpa. Vilket skäl passar?',no:'Se hva som skjedde med Sokk. Hvilken grunn passer?',es:'Mira qué le pasó a Calcetín. ¿Qué razón va?',it:'Guarda che cosa è successo a Calzino. Quale motivo va bene?',pt:'Olhe o que aconteceu com a Meia. Qual motivo combina?',fr:'Regarde ce qui est arrivé à Chaussette. Quelle raison va ?',fi:'Katso, mitä Sukalle tapahtui. Mikä syy sopii?'},
    hMiss2:      {en:'Look where they are different, and say that word.',de:'Schau, wo sie verschieden sind, und sag dieses Wort.',nl:'Kijk waar ze verschillen, en zeg dat woord.',da:'Se, hvor de er forskellige, og sig det ord.',sv:'Titta på var de är olika, och säg det ordet.',no:'Se hvor de er forskjellige, og si det ordet.',es:'Mira en qué son distintas y di esa palabra.',it:'Guarda dove sono diverse e di’ quella parola.',pt:'Veja onde elas são diferentes e diga essa palavra.',fr:'Regarde où ils sont différents, et dis ce mot.',fi:'Katso, missä ne eroavat, ja sano se sana.'},
    hMiss2f:     {en:'The glowing words fit Sock. Put them in the sentence.',de:'Die leuchtenden Wörter passen zu Socke. Nimm sie in den Satz.',nl:'De woorden die oplichten, passen bij Sok. Zet ze in de zin.',da:'Ordene, der lyser, passer til Strømpe. Sæt dem ind i sætningen.',sv:'Orden som lyser passar till Strumpa. Sätt in dem i meningen.',no:'Ordene som lyser, passer til Sokk. Sett dem inn i setningen.',es:'Las palabras que brillan van con Calcetín. Ponlas en la oración.',it:'Le parole che brillano vanno bene per Calzino. Mettile nella frase.',pt:'As palavras que brilham combinam com a Meia. Coloque na frase.',fr:'Les mots qui brillent vont avec Chaussette. Mets-les dans la phrase.',fi:'Hehkuvat sanat sopivat Sukalle. Laita ne lauseeseen.'},
    okL1:        {en:'Just enough words! Shadow understood: “{p}”',de:'Genau genug Wörter! Schatten hat verstanden: „{p}“',nl:'Precies genoeg woorden! Schaduw begreep: ‘{p}’',da:'Lige nok ord! Skygge forstod: »{p}«',sv:'Lagom många ord! Skugga förstod: ”{p}”',no:'Akkurat nok ord! Skygge forstod: «{p}»',es:'¡Las palabras justas! Sombra entendió: «{p}»',it:'Le parole giuste! Ombra ha capito: «{p}»',pt:'Só as palavras certas! A Sombra entendeu: “{p}”',fr:'Juste assez de mots ! Ombre a compris : « {p} »',fi:'Juuri sopivasti sanoja! Varjo ymmärsi: ”{p}”'},
    okL2:        {en:'Shadow understood: “{p}” And here is the help.',de:'Schatten hat verstanden: „{p}“ Und hier ist die Hilfe.',nl:'Schaduw begreep: ‘{p}’ En hier is de hulp.',da:'Skygge forstod: »{p}« Og her er hjælpen.',sv:'Skugga förstod: ”{p}” Och här är hjälpen.',no:'Skygge forstod: «{p}» Og her er hjelpen.',es:'Sombra entendió: «{p}» Y aquí está la ayuda.',it:'Ombra ha capito: «{p}» Ed ecco l’aiuto.',pt:'A Sombra entendeu: “{p}” E aqui está a ajuda.',fr:'Ombre a compris : « {p} » Et voici l’aide.',fi:'Varjo ymmärsi: ”{p}” Ja tässä on apu.'},
    setLevel:    {en:'Round types',de:'Runden',nl:'Soort rondes',da:'Slags runder',sv:'Typer av omgångar',no:'Typer runder',es:'Tipo de rondas',it:'Tipi di turno',pt:'Tipos de rodada',fr:'Types de manches',fi:'Kierrostyypit'},
    l1:          {en:'Fetch it',de:'Hol es',nl:'Haal het',da:'Hent den',sv:'Hämta den',no:'Hent den',es:'Tráelo',it:'Portalo',pt:'Vá buscar',fr:'Va le chercher',fi:'Hae se'},
    l2:          {en:'Tell how you feel',de:'Sag, wie du dich fühlst',nl:'Zeg hoe je je voelt',da:'Sig, hvordan du har det',sv:'Säg hur du känner dig',no:'Si hvordan du har det',es:'Di cómo te sientes',it:'Di’ come ti senti',pt:'Diga como você se sente',fr:'Dis ce que tu ressens',fi:'Kerro, miltä tuntuu'},
    setMemory:   {en:'Shadow’s memory',de:'Schattens Gedächtnis',nl:'Geheugen van Schaduw',da:'Skygges hukommelse',sv:'Skuggas minne',no:'Skygges hukommelse',es:'Memoria de Sombra',it:'Memoria di Ombra',pt:'Memória da Sombra',fr:'Mémoire d’Ombre',fi:'Varjon muisti'},
    m3:          {en:'3 words',de:'3 Wörter',nl:'3 woorden',da:'3 ord',sv:'3 ord',no:'3 ord',es:'3 palabras',it:'3 parole',pt:'3 palavras',fr:'3 mots',fi:'3 sanaa'},
    m2:          {en:'2 words',de:'2 Wörter',nl:'2 woorden',da:'2 ord',sv:'2 ord',no:'2 ord',es:'2 palabras',it:'2 parole',pt:'2 palavras',fr:'2 mots',fi:'2 sanaa'},
    setLamps:    {en:'Lamps',de:'Lampen',nl:'Lampjes',da:'Lamper',sv:'Lampor',no:'Lamper',es:'Lámparas',it:'Lampadine',pt:'Lâmpadas',fr:'Lampes',fi:'Lamput'},
    aLive:       {en:'Light up as you tap',de:'Leuchten beim Tippen',nl:'Gaan aan bij het tikken',da:'Lyser, mens du trykker',sv:'Lyser när du trycker',no:'Lyser mens du trykker',es:'Se encienden al tocar',it:'Si accendono mentre tocchi',pt:'Acendem quando você toca',fr:'S’allument quand tu touches',fi:'Syttyvät napautettaessa'},
    aAfter:      {en:'Only after I speak',de:'Erst nach dem Sprechen',nl:'Pas als ik heb gesproken',da:'Først når jeg har talt',sv:'Först när jag har pratat',no:'Først når jeg har snakket',es:'Solo después de hablar',it:'Solo dopo che ho parlato',pt:'Só depois de falar',fr:'Seulement après avoir parlé',fi:'Vasta puhumisen jälkeen'},
    ariaTube:    {en:'Tell Shadow',de:'Sag es Schatten',nl:'Zeg het tegen Schaduw',da:'Sig det til Skygge',sv:'Säg det till Skugga',no:'Si det til Skygge',es:'Díselo a Sombra',it:'Dillo a Ombra',pt:'Diga para a Sombra',fr:'Dis-le à Ombre',fi:'Kerro Varjolle'},
    ariaRing:    {en:'{p}, with the ring',de:'{p}, mit dem Ring',nl:'{p}, met de ring',da:'{p}, med ringen',sv:'{p}, med ringen',no:'{p}, med ringen',es:'{p}, con el anillo',it:'{p}, con l’anello',pt:'{p}, com o anel',fr:'{p}, avec l’anneau',fi:'{p}, jossa on rengas'},
    ariaLit:     {en:'{n} lit',de:'{n} leuchten',nl:'{n} branden',da:'{n} lyser',sv:'{n} lyser',no:'{n} lyser',es:'{n} encendidas',it:'{n} accese',pt:'{n} acesas',fr:'{n} allumées',fi:'{n} palaa'},
    ariaChip:    {en:'Word: {w}',de:'Wort: {w}',nl:'Woord: {w}',da:'Ord: {w}',sv:'Ord: {w}',no:'Ord: {w}',es:'Palabra: {w}',it:'Parola: {w}',pt:'Palavra: {w}',fr:'Mot : {w}',fi:'Sana: {w}'},
    ariaBack:    {en:'{w}: tap to take it back',de:'{w}: tippen, um es zurückzunehmen',nl:'{w}: tik om het terug te nemen',da:'{w}: tryk for at tage det tilbage',sv:'{w}: tryck för att ta tillbaka det',no:'{w}: trykk for å ta det tilbake',es:'{w}: toca para quitarla',it:'{w}: tocca per toglierla',pt:'{w}: toque para tirar',fr:'{w} : touche pour le retirer',fi:'{w}: napauta, niin se poistuu'},
    ariaPegs:    {en:'Shadow remembers: {w}',de:'Schatten merkt sich: {w}',nl:'Schaduw onthoudt: {w}',da:'Skygge husker: {w}',sv:'Skugga minns: {w}',no:'Skygge husker: {w}',es:'Sombra recuerda: {w}',it:'Ombra ricorda: {w}',pt:'A Sombra lembra: {w}',fr:'Ombre retient : {w}',fi:'Varjo muistaa: {w}'},
    ariaSock:    {en:'Sock’s face and what happened',de:'Sockes Gesicht und was passiert ist',nl:'Het gezicht van Sok en wat er gebeurd is',da:'Strømpes ansigt og det, der skete',sv:'Strumpas ansikte och det som hände',no:'Ansiktet til Sokk og det som skjedde',es:'La cara de Calcetín y lo que pasó',it:'La faccia di Calzino e che cosa è successo',pt:'O rosto da Meia e o que aconteceu',fr:'Le visage de Chaussette et ce qui s’est passé',fi:'Sukan kasvot ja mitä tapahtui'}
  },/*STRINGS-END*/

  defaults: { level: 'l1', memory: '3', lamps: 'live' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'l1', labelKey: 'l1' }, { value: 'l2', labelKey: 'l2' }] },
    { key: 'memory', type: 'choice', labelKey: 'setMemory', options: [{ value: '3', labelKey: 'm3' }, { value: '2', labelKey: 'm2' }] },
    { key: 'lamps', type: 'choice', labelKey: 'setLamps', options: [{ value: 'live', labelKey: 'aLive' }, { value: 'after', labelKey: 'aAfter' }] }
  ],

  OK_MS: 500, FAST: false, LONG_MS: 650,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._lays = null;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {}; this._tickets = [];
    injectLampCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st) { this.st.memory = LamplightCupboardCore.memoryOf(this._setting('memory')); this.st.lamps = LamplightCupboardCore.lampsOf(this._setting('lamps')); if (this._wrap) this._paint(); }
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return LamplightCupboardCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return LamplightCupboardCore.levelOf(this._setting('level')); },
  _key: function () { return this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = LamplightCupboardCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = LamplightCupboardCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._level(), Math.random, prev);
      this._order = p.order; this._lays = p.lays; this._orderForPool = pool;
      if (pass > this._pass) this._tickets = [];
      this._pass = pass;
    }
    var idx = this._order[pos], lay = this._lays && this._order.indexOf(idx) >= 0 ? this._lays[this._order.indexOf(idx)] : null;
    var pa = { msg: this._t(this._level() === 'l1' ? 'tL1' : 'tL2') }; this._pa = pa;
    return {
      id: 'lamps.' + this._loc() + '.' + this._level() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, lay); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx, lay) {
    var C = LamplightCupboardCore, level = this._level();
    if (!lay) { var p = C.plan(level, Math.random); lay = p.lays[p.order.indexOf(idx)]; }
    this._clearTimers(); this._busy = false; this._view = {};
    this.st = C.newState(C.round(level, idx, lay), this._setting('memory'), this._setting('lamps'));
    var line = this._t(level === 'l1' ? 'tL1' : 'tL2');
    if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
    this._loadPics();
  },
  _loadPics: function () {
    var self = this, D = LamplightCupboardCore.DATA, dirs = {};
    [D.PIC, D.FACE, D.HELP, D.EVENT].forEach(function (m) { Object.keys(m).forEach(function (k) { dirs[m[k].split('/')[0]] = 1; }); });
    Object.keys(dirs).forEach(function (dir) {
      if (self._pics[dir] || typeof LCSPictures === 'undefined') return;
      LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
    });
  },
  _pic: function (path, size, cls) {
    var i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)], key = path.slice(i + 1);
    if (!th || !th.nouns[key]) return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = 'lc-pic' + (cls ? ' ' + cls : ''); im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px';
    return im;
  },
  _word: function (path) { var i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)]; return th ? LCSPictures.label(th, path.slice(i + 1), this._loc()) : ''; },
  _phrase: function (words) { var C = LamplightCupboardCore; return this.st.r.level === 'l1' ? C.build(this._loc(), words) : C.buildFeel(this._loc(), words); },

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
    var wrap = api.el('div', 'lc-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="lc-stage"><div class="lc-cupboard"></div><div class="lc-counter"></div></div><div class="lc-strip"><div class="lc-words" aria-live="polite"></div><button type="button" class="lc-tube" data-k="check"></button></div><div class="lc-chips" role="group"></div><p class="lc-note" aria-live="polite"></p><span class="lc-live" aria-live="polite"></span>';
    this._q = function (s) { return wrap.querySelector(s); };
    this._q('.lc-tube').addEventListener('click', function () { self._check(); });
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx || this._wrap).focus(); }
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = LamplightCupboardCore, st = this.st, r = st.r, L = this._L = C.layout(this._width());
    var dark = st.lamps === 'after' && !st.peeked && !st.done;
    this._wrap.className = 'lc-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + ' is-' + r.level + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + (dark ? ' is-pelmet' : '');
    this._wrap.style.setProperty('--lc-big', L.big + 'px'); this._wrap.style.setProperty('--lc-small', L.small + 'px'); this._wrap.style.setProperty('--lc-chip', L.chipPic + 'px');
    this._paintCupboard(dark);
    this._paintCounter();
    this._paintStrip();
    this._paintChips();
    var h = C.hint(st), msg = this._view.msg || (h ? this._t(h, { n: st.memory }) : '');
    var note = this._q('.lc-note'); note.textContent = msg; note.className = 'lc-note' + (st.done ? ' is-ok' : h ? ' is-hint' : '');
    var tube = this._q('.lc-tube'); tube.setAttribute('aria-label', this._t('ariaTube')); tube.disabled = st.done || this._busy;
    tube.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M8 26 V14 a4 4 0 0 1 4-4 h8" fill="none" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/><path d="M24 12 q5 8 0 16 M29 9 q8 11 0 22" fill="none" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></svg>';
  },
  /* Shadow's cupboard: 2 shelves × 3 cubbies behind glass, a lamp over each; Sock's ring sits on the OUTSIDE of the glass */
  _paintCupboard: function (dark) {
    var C = LamplightCupboardCore, st = this.st, r = st.r, L = this._L, self = this, box = this._q('.lc-cupboard'), loc = this._loc();
    box.innerHTML = '';
    var lit = C.lit(st), bd = C.badges(st), v = this._view, glow = bd ? bd.chips : C.feelHelp(st);
    var cells = [];
    for (var c = 0; c < 6; c++) cells.push(null);
    if (r.level === 'l1') r.things.forEach(function (t) { cells[C.cubby(t)] = { kind: 'thing', t: t }; });
    else { r.faces.forEach(function (f, p) { cells[p] = { kind: 'face', key: f, p: p }; }); r.helps.forEach(function (h, p) { cells[3 + p] = { kind: 'help', key: h, p: p }; }); }
    var on = function (cell) {
      if (!cell || dark) return false;
      if (cell.kind === 'thing') return lit.indexOf(cell.t.i) >= 0;
      if (cell.kind === 'face') return lit.faces.indexOf(cell.p) >= 0;
      return st.strip.some(function (w) { return w.charAt(0) === 'r'; }) || st.sent ? lit.helps.indexOf(cell.p) >= 0 : false;
    };
    var nLit = 0;
    cells.forEach(function (cell, k) {
      var lt = on(cell); if (lt) nLit++;
      var gone = st.done && cell && ((cell.kind === 'thing' && cell.t.i === r.target) || (cell.kind === 'help' && cell.key === r.reason));
      var say = cell && cell.kind === 'thing' ? 'n:' + cell.t.noun : cell && cell.kind === 'face' ? 'f:' + cell.key : null, said = say && st.strip.indexOf(say) >= 0;
      var cb = self.api.el(say ? 'button' : 'div', 'lc-cubby' + (lt ? ' is-lit' : '') + (cell ? '' : ' is-empty') + (v.jam && lt ? ' is-jam' : '') + (gone ? ' is-gone' : '') + (said ? ' is-said' : '') + (say ? ' is-say' : '') + (say && glow.indexOf(say) >= 0 ? ' is-help' : ''));
      cb.setAttribute('data-c', String(k));
      if (say) { cb.type = 'button'; cb.setAttribute('data-k', 'cubby-' + k); cb.setAttribute('data-w', say); cb.disabled = st.done; cb.setAttribute('aria-pressed', said ? 'true' : 'false'); cb.addEventListener('click', function () { if (st.strip.indexOf(say) >= 0) self._take(say); else self._put(say); }); }
      cb.appendChild(self.api.el('span', 'lc-lamp'));
      if (cell) {
        var path = cell.kind === 'thing' ? C.DATA.PIC[cell.t.noun] : cell.kind === 'face' ? C.DATA.FACE[cell.key] : C.DATA.HELP[cell.key];
        var size = cell.kind === 'thing' ? (cell.t.size === 'B' ? L.big : L.small) : L.small;
        var im = self._pic(path, size, 'is-' + (cell.kind === 'thing' ? cell.t.size : 'B')); if (im && !gone) cb.appendChild(im);
        if (cell.kind === 'face') cb.setAttribute('aria-label', C.chipLabel(loc, 'f:' + cell.key));
        if (cell.kind === 'thing') {
          var ph = self._word(path);   /* the library word for the thing (blocks, kite and robot are never chips, so they have no phrase) */
          cb.setAttribute('aria-label', cell.t.i === r.target ? self._t('ariaRing', { p: ph }) : ph);
          if (cell.t.i === r.target) cb.appendChild(self.api.el('span', 'lc-ring' + (st.done ? ' is-gold' : '')));
          if (bd && (cell.t.i === r.target || bd.others[cell.t.i])) { var b = self.api.el('span', 'lc-badge is-' + (cell.t.i === r.target ? 'gold' : 'coral') + ' is-d' + (bd.others[cell.t.i] || 'n')); b.innerHTML = badgeIcon(bd.others[cell.t.i] || ''); cb.appendChild(b); }
        }
      }
      box.appendChild(cb);
    });
    if (dark) box.appendChild(this.api.el('span', 'lc-pelmet'));
    box.appendChild(this.api.el('span', 'lc-glass'));
    var live = this._q('.lc-live'); if (live) live.textContent = dark ? '' : this._t('ariaLit', { n: nLit });
  },
  /* Sock's counter: the hatch (one thing through), the face hook, Shadow's memory pegs, the ticket spike */
  _paintCounter: function () {
    var C = LamplightCupboardCore, st = this.st, r = st.r, L = this._L, self = this, box = this._q('.lc-counter'), v = this._view;
    box.innerHTML = '';
    if (r.level === 'l2') {
      var sock = this.api.el('div', 'lc-sock'); sock.setAttribute('role', 'img'); sock.setAttribute('aria-label', this._t('ariaSock'));
      var f = this._pic(C.DATA.FACE[r.feel], L.face); if (f) sock.appendChild(f);
      var e = this._pic(C.DATA.EVENT[r.reason], L.face); if (e) sock.appendChild(e);
      box.appendChild(sock);
    }
    var hatch = this.api.el('div', 'lc-hatch' + (v.jam ? ' is-jam' : '') + (v.none ? ' is-none' : '') + (st.done ? ' is-open' : ''));
    hatch.appendChild(this.api.el('span', 'lc-curtain'));
    if (st.done) {
      var path = r.level === 'l1' ? C.DATA.PIC[r.things[r.target].noun] : C.DATA.HELP[r.reason];
      var im = this._pic(path, L.small, 'is-through'); if (im) hatch.appendChild(im);
    }
    box.appendChild(hatch);
    if (r.level === 'l2' && st.done) { var hook = this.api.el('div', 'lc-facehook'); var fi = this._pic(C.DATA.FACE[r.feel], L.small); if (fi) hook.appendChild(fi); box.appendChild(hook); }
    var rail = this.api.el('div', 'lc-pegs'); rail.setAttribute('role', 'img');
    rail.setAttribute('aria-label', this._t('ariaPegs', { w: st.pegs.map(function (w) { return C.chipLabel(self._loc(), w); }).join(', ') || '—' }));
    for (var k = 0; k < st.memory; k++) {
      var peg = this.api.el('span', 'lc-peg'), w = st.pegs[k];
      if (w) { var bead = this.api.el('span', 'lc-bead is-' + w.charAt(0)); peg.appendChild(bead); }
      rail.appendChild(peg);
    }
    st.dropped.forEach(function (w) { rail.appendChild(self.api.el('span', 'lc-bead is-' + w.charAt(0) + ' is-rolled')); });
    box.appendChild(rail);
    var spike = this.api.el('div', 'lc-spike'); spike.appendChild(this.api.el('span', 'lc-rod'));
    this._tickets.slice(-6).forEach(function (t, i) { var tk = self.api.el('span', 'lc-ticket'); tk.style.setProperty('--i', String(i)); spike.appendChild(tk); });
    box.appendChild(spike);
  },
  /* the sentence strip: the phrase the chips make, each word underlined in its bead colour; a word rolled off the pegs is struck through */
  _paintStrip: function () {
    var st = this.st, self = this, box = this._q('.lc-words');
    box.innerHTML = '';
    var seg = st.strip.length ? this._phrase(st.strip) : [];
    if (!seg.length) { box.appendChild(this.api.el('span', 'lc-hollow')); return; }
    seg.forEach(function (s) {
      if (!s.w) { var t = self.api.el('span', 'lc-glue'); t.textContent = s.t; box.appendChild(t); return; }
      var lead = /^\s+/.exec(s.t), tail = /\s+$/.exec(s.t);   /* a word's spaces are glue, not underlined */
      if (lead) { var g0 = self.api.el('span', 'lc-glue'); g0.textContent = lead[0]; box.appendChild(g0); }
      var b = self.api.el('button', 'lc-word is-' + s.w.charAt(0) + (st.dropped.indexOf(s.w) >= 0 ? ' is-dropped' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'word-' + s.w); b.textContent = s.t.trim();
      b.setAttribute('aria-label', self._t('ariaBack', { w: s.t.trim() }));
      b.disabled = st.done;
      b.addEventListener('click', function () { self._take(s.w); });
      box.appendChild(b);
      if (tail) { var g1 = self.api.el('span', 'lc-glue'); g1.textContent = tail[0]; box.appendChild(g1); }
    });
  },
  _paintChips: function () {
    var C = LamplightCupboardCore, st = this.st, r = st.r, L = this._L, self = this, box = this._q('.lc-chips'), loc = this._loc();
    box.innerHTML = '';
    var bd = C.badges(st), glow = bd ? bd.chips : C.feelHelp(st);
    r.chips.forEach(function (w) {
      var c = w.charAt(0), inStrip = st.strip.indexOf(w) >= 0;
      var b = self.api.el('button', 'lc-chip is-' + c + (inStrip ? ' is-used' : '') + (glow.indexOf(w) >= 0 ? ' is-help' : ''));
      b.type = 'button'; b.setAttribute('data-k', 'chip-' + w); b.setAttribute('data-w', w);
      var label = C.chipLabel(loc, w);
      if (c === 'n') { var im = self._pic(C.DATA.PIC[w.slice(2)], L.chipPic); if (im) b.appendChild(im); }
      else { var ic = self.api.el('span', 'lc-icon'); ic.innerHTML = chipIcon(w); b.appendChild(ic); }
      var lb = self.api.el('span', 'lc-label'); lb.textContent = label; b.appendChild(lb);
      b.setAttribute('aria-label', self._t('ariaChip', { w: label })); b.setAttribute('aria-pressed', inStrip ? 'true' : 'false');
      b.disabled = st.done;
      b.addEventListener('click', function () { if (inStrip) self._take(w); else self._put(w); });
      box.appendChild(b);
    });
  },

  /* ---------------- the hand ---------------- */
  _put: function (w) { if (this._busy) return; if (LamplightCupboardCore.addWord(this.st, w)) { this._view = {}; this.api.sound(640); this._paint(); } },
  _take: function (w) { if (this._busy) return; if (LamplightCupboardCore.removeWord(this.st, w)) { this._view = {}; this.api.sound(380); this._paint(); } },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = LamplightCupboardCore, st = this.st, res = C.check(st), self = this, loc = this._loc();
    this._view = {};
    if (!res.ok) {
      if (st.last && st.last.door === 'jam') this._view.jam = true;
      if (st.last && st.last.door === 'none') this._view.none = true;
      if (st.r.level === 'l2' && st.last && (st.last.reason === 'noWhy')) this._view.jam = true;
      this.api.sound(res.reason === 'empty' ? 460 : 220); this._paint(); this.api.announce(this._q('.lc-note').textContent || '');
      if (this._view.jam) this._later(function () { self._view.jam = false; if (self._wrap) self._paint(); }, this._ms(900));
      return;
    }
    var said = C.phraseText(this._phrase(st.pegs.concat(st.strip.filter(function (w) { return w.charAt(0) === 'p'; }))));
    var msg = this._t(st.r.level === 'l1' ? 'okL1' : 'okL2', { p: said });
    this._tickets.push(said);
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140));
    this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: said, lang: this.api.lang, rate: 0.9, pitch: 1.1 }); } catch (e) {} }
    this._later(function () { var n = self._q('.lc-note'); if (n && n.scrollIntoView) n.scrollIntoView({ block: 'nearest' }); }, 0);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

/* drawn icons for the words that are not pictures: big / small (nested squares), top / bottom shelf, next to, because, please */
function chipIcon(w) {
  var c = w.charAt(0), k = w.slice(2), ink = '#0F4A40', fill = '#F2784B';
  if (c === 's') return '<svg viewBox="0 0 32 32"><rect x="3" y="3" width="26" height="26" rx="3" fill="' + (k === 'big' ? fill : 'none') + '" stroke="' + ink + '" stroke-width="2.5"/><rect x="11" y="11" width="10" height="10" rx="2" fill="' + (k === 'small' ? fill : '#FFFFFF') + '" stroke="' + ink + '" stroke-width="2.5"/></svg>';
  if (c === 'h') return '<svg viewBox="0 0 32 32"><rect x="3" y="4" width="26" height="24" rx="3" fill="none" stroke="' + ink + '" stroke-width="2.5"/><rect x="6" y="' + (k === 'top' ? 7 : 18) + '" width="20" height="7" rx="2" fill="' + fill + '"/><path d="M3 16 H29" stroke="' + ink + '" stroke-width="2.5"/></svg>';
  if (c === 'x') return '<svg viewBox="0 0 32 32"><rect x="2" y="9" width="13" height="14" rx="2" fill="none" stroke="' + ink + '" stroke-width="2.5"/><rect x="17" y="9" width="13" height="14" rx="2" fill="' + fill + '" stroke="' + ink + '" stroke-width="2.5"/></svg>';
  if (c === 'r') return '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" fill="none" stroke="' + ink + '" stroke-width="2.5"/><path d="M12 12 a4 4 0 1 1 5 4 v3" fill="none" stroke="' + fill + '" stroke-width="3" stroke-linecap="round"/><circle cx="17" cy="23.5" r="1.8" fill="' + fill + '"/></svg>';
  return '<svg viewBox="0 0 32 32"><path d="M16 27 C6 20 3 14 7 9 C10 5 14 7 16 10 C18 7 22 5 25 9 C29 14 26 20 16 27 Z" fill="' + fill + '" stroke="' + ink + '" stroke-width="2"/></svg>';
}
function badgeIcon(d) { return d ? chipIcon(d === 'n' ? 'n:x' : d === 's' ? 's:small' : d === 'h' ? 'h:top' : 'x:x') : '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="9" fill="#FFFFFF"/></svg>'; }

var lcCssDone = false;
function injectLampCSS() {
  if (lcCssDone || typeof document === 'undefined') return;
  lcCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.lc-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.lc-wrap:focus{outline:none;}'
  + '.lc-pic{display:block;object-fit:contain;pointer-events:none;} .lc-cubby .lc-pic{max-width:calc(100% - 6px);}'
  + '.lc-stage{display:grid;grid-template-columns:minmax(0,1fr) 180px;gap:12px;width:100%;max-width:700px;align-items:start;}'
  /* the cupboard */
  + '.lc-cupboard{position:relative;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;padding:8px;border-radius:14px;background:#2E3B44;box-shadow:inset 0 0 0 3px #0F4A40,0 5px 0 #1B262D;}'
  + '.lc-cubby{position:relative;display:flex;align-items:flex-end;justify-content:center;height:calc(var(--lc-big) + 30px);padding-bottom:6px;border-radius:8px;background:#3C4A53;box-shadow:inset 0 0 0 2.5px #0F4A40;overflow:hidden;transition:background .2s;}'
  + '.lc-cubby .lc-pic{opacity:.45;filter:saturate(.6);transition:opacity .15s,filter .15s;}'
  + '.lc-cubby.is-lit{background:radial-gradient(ellipse at 50% 0,#FFE9A8 0,#FFF8EC 55%,#F5EBD6 100%);} .lc-cubby.is-lit .lc-pic{opacity:1;filter:none;}'
  + '.lc-lamp{position:absolute;top:4px;left:50%;width:18px;height:18px;margin-left:-9px;border-radius:50%;background:#55626B;box-shadow:inset 0 0 0 2px #0F4A40;} .lc-lamp::before{content:"";position:absolute;left:8px;top:-6px;width:2px;height:6px;background:#0F4A40;}'
  + '.lc-cubby.is-lit .lc-lamp{background:#FFD66B;box-shadow:inset 0 0 0 2px #B88A1A,0 0 14px 6px rgba(255,214,107,.8);}'
  + '.lc-cubby.is-jam .lc-pic{animation:lcJam .4s ease-in-out 3;} @keyframes lcJam{25%{transform:translateX(-6px) rotate(-3deg);}75%{transform:translateX(6px) rotate(3deg);}}'
  + '.lc-cubby.is-say{border:0;padding-left:0;padding-right:0;font:inherit;cursor:pointer;} .lc-cubby.is-say:disabled{cursor:default;opacity:1;} .lc-cubby.is-said{box-shadow:inset 0 0 0 4px #146B5E;} .lc-cubby.is-help{animation:lcThrob .8s ease-in-out infinite;} .lc-cubby:focus-visible{outline:3px solid #FFFFFF;outline-offset:-5px;}'
  + '.lc-cubby.is-gone{background:radial-gradient(ellipse at 50% 0,#FFE9A8 0,#FFF8EC 70%);}'
  + '.lc-ring{position:absolute;right:6px;top:6px;width:30px;height:30px;border-radius:50%;box-sizing:border-box;border:5px solid #F2784B;box-shadow:0 0 0 2px #FFFFFF;z-index:3;} .lc-ring.is-gold{border-color:#E8B23A;}'
  + '.lc-glass{position:absolute;inset:4px;border-radius:12px;pointer-events:none;box-shadow:inset 0 0 0 2px rgba(190,225,240,.7);background:linear-gradient(120deg,transparent 40%,rgba(255,255,255,.12) 45%,transparent 52%);z-index:2;}'
  + '.lc-pelmet{position:absolute;left:4px;right:4px;top:0;height:30px;border-radius:12px 12px 6px 6px;background:repeating-linear-gradient(90deg,#8C6A44 0 14px,#7A5A38 14px 16px);box-shadow:0 3px 0 #5B4228;z-index:4;}'
  + '.lc-badge{position:absolute;left:6px;top:6px;width:30px;height:30px;padding:3px;border-radius:8px;box-sizing:border-box;z-index:3;} .lc-badge svg{width:100%;height:100%;display:block;} .lc-badge.is-gold{background:#FFE07A;box-shadow:0 0 0 2px #B88A1A;} .lc-badge.is-coral{background:#FDE2D6;box-shadow:0 0 0 2px #F2784B;}'
  /* Sock's counter */
  + '.lc-counter{display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px 8px;border-radius:14px;background:#F6EDDD;box-shadow:inset 0 0 0 3px #C99A6B,0 5px 0 #A8743A;}'
  + '.lc-sock{display:flex;gap:6px;justify-content:center;}'
  + '.lc-hatch{position:relative;display:flex;align-items:center;justify-content:center;width:calc(var(--lc-small) + 20px);height:calc(var(--lc-small) + 20px);border-radius:50px 50px 6px 6px;background:#2E3B44;box-shadow:inset 0 0 0 3px #0F4A40;overflow:hidden;}'
  + '.lc-curtain{position:absolute;inset:4px;border-radius:46px 46px 4px 4px;background:repeating-linear-gradient(90deg,#B03A5B 0 12px,#962F4D 12px 16px);transition:transform .3s;} .lc-hatch.is-open .lc-curtain{transform:translateY(-92%);}'
  + '.lc-hatch.is-jam{animation:lcJam .4s ease-in-out 2;} .lc-hatch.is-none{box-shadow:inset 0 0 0 3px #0F4A40,0 0 0 4px #F2784B;}'
  + '.lc-hatch .is-through{position:relative;z-index:1;animation:lcThrough .4s ease-out both;} @keyframes lcThrough{from{transform:translateX(-60px);opacity:0;}}'
  + '.lc-facehook{display:flex;justify-content:center;padding-top:8px;border-top:3px solid #9C7B2E;}'
  + '.lc-pegs{position:relative;display:flex;gap:8px;justify-content:center;align-items:center;min-height:30px;padding:4px 10px;border-radius:8px;background:#C99A6B;box-shadow:inset 0 -3px 0 #8C6A44;}'
  + '.lc-peg{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:50%;background:#8C6A44;}'
  + '.lc-bead{display:block;width:20px;height:20px;border-radius:50%;box-shadow:inset 0 -3px 0 rgba(0,0,0,.2);animation:lcBead .3s ease-out both;} @keyframes lcBead{from{transform:translateY(-30px);opacity:0;}}'
  + '.lc-bead.is-n{background:#2FA56A;} .lc-bead.is-s{background:#F2784B;} .lc-bead.is-h{background:#5AB4E6;} .lc-bead.is-x{background:#B07AE0;} .lc-bead.is-f{background:#E8B23A;} .lc-bead.is-r{background:#5AB4E6;}'
  + '.lc-bead.is-rolled{position:absolute;right:-6px;bottom:-14px;animation:lcRoll .7s ease-in both;} @keyframes lcRoll{from{transform:translate(-80px,-10px);}to{transform:translate(0,0) rotate(360deg);}}'
  + '.lc-spike{position:relative;width:60px;height:34px;} .lc-rod{position:absolute;left:28px;bottom:0;width:4px;height:30px;background:#7A5226;border-radius:2px;} .lc-rod::after{content:"";position:absolute;left:-10px;bottom:-4px;width:24px;height:6px;border-radius:3px;background:#7A5226;}'
  + '.lc-ticket{position:absolute;left:6px;bottom:calc(var(--i) * 4px + 2px);width:48px;height:10px;border-radius:2px;background:#FFFDF7;box-shadow:0 0 0 1px #C9B48F;}'
  /* the strip and the chips */
  + '.lc-strip{display:flex;align-items:center;gap:10px;width:100%;max-width:700px;padding:6px 6px 6px 14px;border-radius:30px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40;box-sizing:border-box;}'
  + '.lc-words{flex:1 1 auto;min-width:0;display:flex;flex-wrap:wrap;align-items:center;min-height:44px;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.25;color:#2A2A35;}'
  + '.lc-hollow{display:block;width:60%;height:4px;border-radius:2px;background:repeating-linear-gradient(90deg,#C9D8D3 0 10px,transparent 10px 18px);}'
  + '.lc-glue{white-space:pre-wrap;} .lc-word{min-height:44px;min-width:44px;text-align:center;padding:0 2px;border:0;background:transparent;font:inherit;color:inherit;cursor:pointer;white-space:normal;text-decoration:underline;text-decoration-thickness:4px;text-underline-offset:5px;}'
  + '.lc-word.is-n{text-decoration-color:#2FA56A;} .lc-word.is-s{text-decoration-color:#F2784B;} .lc-word.is-h,.lc-word.is-r{text-decoration-color:#5AB4E6;} .lc-word.is-x{text-decoration-color:#B07AE0;} .lc-word.is-f{text-decoration-color:#E8B23A;} .lc-word.is-p{text-decoration-color:#E8A0B8;}'
  + '.lc-word.is-dropped{color:#9AA3A8;text-decoration:line-through;text-decoration-color:#9AA3A8;} .lc-word:disabled{cursor:default;}'
  + '.lc-tube{flex:0 0 auto;width:64px;height:64px;border:0;border-radius:50%;background:#146B5E;box-shadow:0 4px 0 #0C4A41;cursor:pointer;display:flex;align-items:center;justify-content:center;} .lc-tube svg{width:36px;height:36px;} .lc-tube:disabled{opacity:.5;cursor:default;}'
  + '.lc-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;width:100%;max-width:700px;}'
  + '.lc-chip{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;min-width:64px;max-width:170px;min-height:76px;padding:6px 12px;border:0;border-radius:14px;background:#FFFDF7;box-shadow:inset 0 0 0 2.5px #0F4A40,0 4px 0 #9CC9BE;cursor:pointer;font-family:' + B + ';color:#2A2A35;}'
  + '.lc-chip.is-used{opacity:.4;box-shadow:inset 0 0 0 2.5px #9CC9BE;} .lc-chip.is-help{animation:lcThrob .8s ease-in-out infinite;} @keyframes lcThrob{50%{box-shadow:inset 0 0 0 2.5px #0F4A40,0 0 0 4px rgba(47,165,106,.7),0 0 14px rgba(47,165,106,.7);}}'
  + '.lc-chip:disabled{cursor:default;} .lc-icon{display:block;width:32px;height:32px;} .lc-icon svg{width:100%;height:100%;display:block;}'
  + '.lc-label{font-weight:800;font-size:17px;line-height:1.15;text-align:center;}'
  + '.lc-chip.is-r{max-width:220px;} .lc-chip.is-r .lc-label{font-size:16px;}'
  + '.lc-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .lc-note:empty{display:none;} .lc-note.is-hint{color:#B5461F;} .lc-note.is-ok{color:#146B5E;}'
  + '.lc-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '.lc-chip:focus-visible,.lc-word:focus-visible,.lc-tube:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.lc-wrap.is-done .lc-chips{display:none;}'
  /* phones: the counter becomes a row under the cupboard */
  + '.lc-wrap.is-narrow .lc-stage{grid-template-columns:minmax(0,1fr);gap:8px;} .lc-wrap.is-narrow .lc-counter{flex-direction:row;flex-wrap:nowrap;justify-content:center;align-items:center;padding:6px;gap:8px;} .lc-wrap.is-narrow .lc-spike{display:none;} .lc-wrap.is-narrow .lc-hatch{width:calc(var(--lc-small) + 12px);height:calc(var(--lc-small) + 12px);} .lc-wrap.is-narrow .lc-facehook{padding-top:0;border-top:0;border-left:3px solid #9C7B2E;padding-left:6px;} .lc-wrap.is-narrow .lc-pegs{flex-direction:row;gap:4px;padding:4px 6px;}'
  + '.lc-wrap.is-narrow .lc-cupboard{gap:4px;padding:6px;} .lc-wrap.is-narrow .lc-cubby{height:calc(var(--lc-big) + 10px);padding-bottom:2px;} .lc-wrap.is-narrow .lc-lamp{width:14px;height:14px;margin-left:-7px;}'
  + '.lc-wrap.is-narrow .lc-ring{width:24px;height:24px;border-width:4px;} .lc-wrap.is-narrow .lc-badge{width:26px;height:26px;}'
  + '.lc-wrap.is-narrow .lc-strip{padding:4px 4px 4px 10px;} .lc-wrap.is-narrow .lc-words{font-size:17px;} .lc-wrap.is-narrow .lc-tube{width:56px;height:56px;}'
  + '.lc-wrap.is-narrow .lc-chips{gap:6px;} .lc-wrap.is-narrow .lc-chip{flex-direction:row;min-width:0;max-width:none;min-height:46px;padding:3px 10px 3px 6px;gap:6px;} .lc-wrap.is-narrow .lc-label{font-size:15px;} .lc-wrap.is-narrow .lc-icon{width:26px;height:26px;}'
  + '.lc-wrap.is-narrow .lc-note{font-size:17px;} .lc-wrap.is-narrow{gap:7px;} .lc-wrap.is-narrow .lc-counter{padding:4px 6px;} .lc-wrap.is-narrow .lc-hatch{width:var(--lc-small);height:var(--lc-small);}'
  + '.lc-wrap.is-wide.is-l2 .lc-stage{grid-template-columns:minmax(0,1fr) 224px;}'
  + '.lc-wrap.is-tiny{gap:4px;} .lc-wrap.is-tiny .lc-stage{gap:5px;} .lc-wrap.is-tiny .lc-cupboard{padding:4px;gap:3px;} .lc-wrap.is-tiny .lc-cubby{height:calc(var(--lc-big) + 2px);padding-bottom:0;} .lc-wrap.is-tiny .lc-counter{padding:2px 6px;} .lc-wrap.is-tiny .lc-tube{width:48px;height:48px;} .lc-wrap.is-tiny .lc-strip{padding:3px 3px 3px 10px;} .lc-wrap.is-tiny .lc-chips{gap:4px;} .lc-wrap.is-tiny .lc-chip{min-height:44px;padding:2px 8px 2px 5px;} .lc-wrap.is-tiny .lc-label{font-size:14px;} .lc-wrap.is-tiny .lc-icon{width:22px;height:22px;}'
  + '.lc-wrap.is-fast *,.lc-wrap.is-fast *::after{animation:none !important;transition:none !important;}'
  + '@media print{.lc-strip,.lc-note,.lc-chips{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.lc-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'lc-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.LamplightCupboardActivity = LamplightCupboardActivity;
