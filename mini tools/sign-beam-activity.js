/* =====================================================================
   sign-beam-activity.js — ACTIVITY #88 of the one-by-one rebuild:
   "Numbers Court" → THE EQUAL-SIGN BEAM (1.OA.D.7, 11 locales).
   Design sheet: docs/activities-rebuild/designs/088-numbers-court.md
   ---------------------------------------------------------------------
   THE INVENTION: the equal sign IS the balance. Its top bar is a fixed
   level; its bottom bar is the beam, pivoting under it. Both sides hold
   the same amount → the bars lie parallel and read "=". Otherwise the
   light end rises until it touches the top bar and the pair becomes a
   "<" or ">" wedge opening toward the bigger side. A court seal holds
   the beam until the Judge's ruling is RIGHT: the child stamps = or ≠,
   bangs the gavel, and only a right ruling cracks the seal — a wrong one
   never moves the beam. A caught false claim is then repaired with a
   dial ("Make it balance": a blank crate from the start).
   ACTIVITY LAYER ONLY: the model is sign-beam-core.js; Judge Tess and the
   witnesses are library pictures (pets/tortoise, forest creatures …) via
   lcs-pictures.js; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity when the round is won). Test seams:
   window.SignBeamActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var SignBeamActivity = {
  id: 'sign-beam',
  apparatusClasses: ['sb-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble: {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:    {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:       {en:'Numbers Court',de:'Das Zahlengericht',nl:'De rekenrechtbank',da:'Talretten',sv:'Taldomstolen',no:'Talretten',es:'El tribunal de los números',it:'Il tribunale dei numeri',pt:'O tribunal dos números',fr:'Le tribunal des nombres',fi:'Lukujen oikeussali'},
    tLine:       {en:'Is the claim true? Stamp = or ≠, then bang the gavel.',de:'Stimmt die Behauptung? Stemple = oder ≠, dann klopf mit dem Hammer.',nl:'Klopt de bewering? Stempel = of ≠ en sla dan met de hamer.',da:'Passer påstanden? Stempl = eller ≠, og slå så med hammeren.',sv:'Stämmer påståendet? Stämpla = eller ≠ och slå sedan med klubban.',no:'Stemmer påstanden? Stemple = eller ≠, og slå så med klubba.',es:'¿Es verdadera la igualdad? Sella = o ≠ y luego golpea con el mazo.',it:'L’uguaglianza è vera? Timbra = o ≠, poi batti il martelletto.',pt:'A sentença é verdadeira? Carimbe = ou ≠ e depois bata o martelo.',fr:'L’égalité est-elle vraie ? Tamponne = ou ≠, puis frappe avec le marteau.',fi:'Pitääkö väite paikkansa? Leimaa = tai ≠ ja kopauta sitten nuijalla.'},
    tLineMB:     {en:'Set the missing number so both sides are the same. Then bang the gavel.',de:'Stell die fehlende Zahl so ein, dass beide Seiten gleich viel sind. Dann klopf mit dem Hammer.',nl:'Zet het ontbrekende getal zo dat beide kanten evenveel zijn. Sla dan met de hamer.',da:'Indstil det manglende tal, så begge sider er lige meget. Slå så med hammeren.',sv:'Ställ in talet som fattas så att båda sidorna blir lika mycket. Slå sedan med klubban.',no:'Still inn tallet som mangler, så begge sidene blir like mye. Slå så med klubba.',es:'Pon el número que falta para que los dos lados valgan lo mismo. Luego golpea con el mazo.',it:'Imposta il numero che manca perché i due lati valgano lo stesso. Poi batti il martelletto.',pt:'Coloque o número que falta para os dois lados valerem o mesmo. Depois bata o martelo.',fr:'Règle le nombre qui manque pour que les deux côtés valent autant. Puis frappe avec le marteau.',fi:'Aseta puuttuva luku niin, että molemmilla puolilla on yhtä paljon. Kopauta sitten nuijalla.'},
    labTrue:     {en:'true',de:'stimmt',nl:'klopt',da:'sandt',sv:'sant',no:'sant',es:'verdadera',it:'vera',pt:'verdadeira',fr:'vraie',fi:'totta'},
    labFalse:    {en:'false',de:'stimmt nicht',nl:'klopt niet',da:'falsk',sv:'falskt',no:'usant',es:'falsa',it:'falsa',pt:'falsa',fr:'fausse',fi:'ei totta'},
    gavel:       {en:'Bang the gavel',de:'Mit dem Hammer klopfen',nl:'Sla met de hamer',da:'Slå med hammeren',sv:'Slå med klubban',no:'Slå med klubba',es:'Golpea con el mazo',it:'Batti il martelletto',pt:'Bata o martelo',fr:'Frappe avec le marteau',fi:'Kopauta nuijalla'},
    turnBtn:     {en:'Turn the court round',de:'Gericht umdrehen',nl:'Draai de rechtbank om',da:'Vend retten om',sv:'Vänd på domstolen',no:'Snu retten',es:'Voltea el tribunal',it:'Gira il tribunale',pt:'Vire o tribunal',fr:'Retourne le tribunal',fi:'Käännä oikeussali'},
    hStamp:      {en:'Judge, stamp your ruling first: = or ≠.',de:'Stemple zuerst dein Urteil: = oder ≠.',nl:'Rechter, stempel eerst je oordeel: = of ≠.',da:'Dommer, stempl først din dom: = eller ≠.',sv:'Domare, stämpla din dom först: = eller ≠.',no:'Dommer, stemple dommen din først: = eller ≠.',es:'Juez, primero sella tu decisión: = o ≠.',it:'Giudice, prima timbra la tua sentenza: = o ≠.',pt:'Juiz, carimbe primeiro a sua decisão: = ou ≠.',fr:'Juge, tamponne d’abord ta décision : = ou ≠.',fi:'Tuomari, leimaa ensin tuomiosi: = tai ≠.'},
    hEvid:       {en:'The court wants evidence. Look at what each pan holds.',de:'Das Gericht braucht Beweise. Schau, was in jeder Schale liegt.',nl:'De rechtbank wil bewijs. Kijk wat er in elke schaal ligt.',da:'Retten vil have beviser. Se, hvad der ligger i hver skål.',sv:'Domstolen vill ha bevis. Titta på vad varje vågskål innehåller.',no:'Retten vil ha bevis. Se hva som ligger i hver skål.',es:'El tribunal quiere pruebas. Mira lo que hay en cada platillo.',it:'Il tribunale vuole le prove. Guarda che cosa c’è su ogni piatto.',pt:'O tribunal quer provas. Veja o que há em cada prato.',fr:'Le tribunal veut des preuves. Regarde ce que contient chaque plateau.',fi:'Oikeus haluaa todisteita. Katso, mitä kummassakin vaakakupissa on.'},
    hPair:       {en:'Does every dot have a partner — or not?',de:'Hat jeder Punkt einen Partner – oder nicht?',nl:'Heeft elke stip een partner – of niet?',da:'Har hver prik en makker – eller ej?',sv:'Har varje prick en partner – eller inte?',no:'Har hver prikk en makker – eller ikke?',es:'¿Cada punto tiene pareja, o no?',it:'Ogni pallino ha un compagno, o no?',pt:'Cada bolinha tem um par, ou não?',fr:'Chaque point a-t-il un partenaire, ou pas ?',fi:'Onko jokaisella pisteellä pari – vai ei?'},
    hRepair:     {en:'Now make it true: change the number in the gold crate.',de:'Mach es jetzt richtig: Ändere die Zahl in der goldenen Kiste.',nl:'Maak het nu kloppend: verander het getal in het gouden kistje.',da:'Få det nu til at passe: lav tallet i den gyldne kasse om.',sv:'Få det att stämma nu: ändra talet i den gyllene lådan.',no:'Få det til å stemme nå: endre tallet i gullkassa.',es:'Ahora hazla verdadera: cambia el número de la caja dorada.',it:'Ora rendila vera: cambia il numero della cassetta dorata.',pt:'Agora deixe a sentença verdadeira: mude o número da caixa dourada.',fr:'Maintenant, rends-la vraie : change le nombre de la caisse dorée.',fi:'Tee siitä nyt totta: muuta kultaisen laatikon lukua.'},
    hDial:       {en:'Set the missing number first.',de:'Stell zuerst die fehlende Zahl ein.',nl:'Zet eerst het ontbrekende getal.',da:'Indstil først det manglende tal.',sv:'Ställ först in talet som fattas.',no:'Still først inn tallet som mangler.',es:'Primero pon el número que falta.',it:'Prima imposta il numero che manca.',pt:'Primeiro coloque o número que falta.',fr:'Règle d’abord le nombre qui manque.',fi:'Aseta ensin puuttuva luku.'},
    hHeavy:      {en:'The gold crate’s side is too heavy — make it lighter.',de:'Die Seite mit der goldenen Kiste ist zu schwer – mach sie leichter.',nl:'De kant met het gouden kistje is te zwaar – maak hem lichter.',da:'Siden med den gyldne kasse er for tung – gør den lettere.',sv:'Sidan med den gyllene lådan är för tung – gör den lättare.',no:'Siden med gullkassa er for tung – gjør den lettere.',es:'El lado de la caja dorada pesa demasiado: hazlo más ligero.',it:'Il lato della cassetta dorata è troppo pesante: alleggeriscilo.',pt:'O lado da caixa dourada está pesado demais: deixe-o mais leve.',fr:'Le côté de la caisse dorée est trop lourd : allège-le.',fi:'Kultaisen laatikon puoli on liian painava – kevennä sitä.'},
    hLight:      {en:'The gold crate’s side is too light — make it heavier.',de:'Die Seite mit der goldenen Kiste ist zu leicht – mach sie schwerer.',nl:'De kant met het gouden kistje is te licht – maak hem zwaarder.',da:'Siden med den gyldne kasse er for let – gør den tungere.',sv:'Sidan med den gyllene lådan är för lätt – gör den tyngre.',no:'Siden med gullkassa er for lett – gjør den tyngre.',es:'El lado de la caja dorada pesa muy poco: hazlo más pesado.',it:'Il lato della cassetta dorata è troppo leggero: appesantiscilo.',pt:'O lado da caixa dourada está leve demais: deixe-o mais pesado.',fr:'Le côté de la caisse dorée est trop léger : alourdis-le.',fi:'Kultaisen laatikon puoli on liian kevyt – lisää sille painoa.'},
    hTakeMore:   {en:'The gold crate takes away too little — take away more.',de:'Die goldene Kiste nimmt zu wenig weg – nimm mehr weg.',nl:'Het gouden kistje haalt te weinig weg – haal meer weg.',da:'Den gyldne kasse tager for lidt væk – tag mere væk.',sv:'Den gyllene lådan tar bort för lite – ta bort mer.',no:'Gullkassa tar bort for lite – ta bort mer.',es:'La caja dorada quita muy poco: quita más.',it:'La cassetta dorata toglie troppo poco: togli di più.',pt:'A caixa dourada tira pouco demais: tire mais.',fr:'La caisse dorée enlève trop peu : enlève davantage.',fi:'Kultainen laatikko vie liian vähän pois – vie enemmän.'},
    hTakeLess:   {en:'The gold crate takes away too much — take away less.',de:'Die goldene Kiste nimmt zu viel weg – nimm weniger weg.',nl:'Het gouden kistje haalt te veel weg – haal minder weg.',da:'Den gyldne kasse tager for meget væk – tag mindre væk.',sv:'Den gyllene lådan tar bort för mycket – ta bort mindre.',no:'Gullkassa tar bort for mye – ta bort mindre.',es:'La caja dorada quita demasiado: quita menos.',it:'La cassetta dorata toglie troppo: togli di meno.',pt:'A caixa dourada tira demais: tire menos.',fr:'La caisse dorée enlève trop : enlève moins.',fi:'Kultainen laatikko vie liikaa pois – vie vähemmän.'},
    okTrue:      {en:'True! Both sides are {n}.',de:'Stimmt! Beide Seiten sind {n}.',nl:'Klopt! Beide kanten zijn {n}.',da:'Det passer! Begge sider er {n}.',sv:'Det stämmer! Båda sidorna är {n}.',no:'Det stemmer! Begge sidene er {n}.',es:'¡Es verdadera! Los dos lados valen {n}.',it:'È vera! I due lati valgono {n}.',pt:'É verdadeira! Os dois lados valem {n}.',fr:'C’est vrai ! Les deux côtés valent {n}.',fi:'Totta! Kummallakin puolella on {n}.'},
    okFalse:     {en:'False: {l} and {r} are different.',de:'Stimmt nicht: {l} und {r} sind verschieden.',nl:'Klopt niet: {l} en {r} zijn verschillend.',da:'Det passer ikke: {l} og {r} er forskellige.',sv:'Det stämmer inte: {l} och {r} är olika.',no:'Det stemmer ikke: {l} og {r} er forskjellige.',es:'No es verdadera: {l} y {r} son diferentes.',it:'Non è vera: {l} e {r} sono diversi.',pt:'Não é verdadeira: {l} e {r} são diferentes.',fr:'Ce n’est pas vrai : {l} et {r} sont différents.',fi:'Ei totta: {l} ja {r} ovat eri suuria.'},
    okFixed:     {en:'Now it’s true: {c}.',de:'Jetzt stimmt es: {c}.',nl:'Nu klopt het: {c}.',da:'Nu passer det: {c}.',sv:'Nu stämmer det: {c}.',no:'Nå stemmer det: {c}.',es:'Ahora es verdadera: {c}.',it:'Ora è vera: {c}.',pt:'Agora é verdadeira: {c}.',fr:'Maintenant, c’est vrai : {c}.',fi:'Nyt se on totta: {c}.'},
    okTurn:      {en:'Still true the other way round!',de:'Stimmt auch andersherum!',nl:'Klopt ook andersom!',da:'Det passer også den anden vej!',sv:'Det stämmer åt andra hållet också!',no:'Det stemmer den andre veien også!',es:'¡También es verdadera al revés!',it:'È vera anche al contrario!',pt:'Também é verdadeira ao contrário!',fr:'C’est vrai aussi dans l’autre sens !',fi:'Totta myös toisin päin!'},
    setClaims:   {en:'Claims',de:'Behauptungen',nl:'Beweringen',da:'Påstande',sv:'Påståenden',no:'Påstander',es:'Igualdades',it:'Uguaglianze',pt:'Sentenças',fr:'Égalités',fi:'Väitteet'},
    cTF:         {en:'True or false',de:'Stimmt oder stimmt nicht',nl:'Klopt of klopt niet',da:'Sandt eller falsk',sv:'Sant eller falskt',no:'Sant eller usant',es:'Verdadera o falsa',it:'Vera o falsa',pt:'Verdadeira ou falsa',fr:'Vraie ou fausse',fi:'Totta vai ei totta'},
    cMB:         {en:'Make it balance',de:'Ins Gleichgewicht bringen',nl:'In evenwicht brengen',da:'Få det til at passe',sv:'Få det att väga jämnt',no:'Få det til å veie likt',es:'Equilibrar',it:'Mettere in equilibrio',pt:'Equilibrar',fr:'Équilibrer',fi:'Tasapainoon'},
    setNumbers:  {en:'Numbers',de:'Zahlen',nl:'Getallen',da:'Tal',sv:'Tal',no:'Tall',es:'Números',it:'Numeri',pt:'Números',fr:'Nombres',fi:'Luvut'},
    n10:         {en:'To 10',de:'Bis 10',nl:'Tot 10',da:'Op til 10',sv:'Upp till 10',no:'Til 10',es:'Hasta 10',it:'Fino a 10',pt:'Até 10',fr:'Jusqu’à 10',fi:'10 asti'},
    n20:         {en:'To 20',de:'Bis 20',nl:'Tot 20',da:'Op til 20',sv:'Upp till 20',no:'Til 20',es:'Hasta 20',it:'Fino a 20',pt:'Até 20',fr:'Jusqu’à 20',fi:'20 asti'},
    ariaEq:      {en:'Stamp =: the claim is true',de:'Stempel =: die Behauptung stimmt',nl:'Stempel =: de bewering klopt',da:'Stempel =: påstanden er sand',sv:'Stämpel =: påståendet är sant',no:'Stempel =: påstanden er sann',es:'Sello =: la igualdad es verdadera',it:'Timbro =: l’uguaglianza è vera',pt:'Carimbo =: a sentença é verdadeira',fr:'Tampon = : l’égalité est vraie',fi:'Leima =: väite on totta'},
    ariaNe:      {en:'Stamp ≠: the claim is false',de:'Stempel ≠: die Behauptung stimmt nicht',nl:'Stempel ≠: de bewering klopt niet',da:'Stempel ≠: påstanden er falsk',sv:'Stämpel ≠: påståendet är falskt',no:'Stempel ≠: påstanden er usann',es:'Sello ≠: la igualdad es falsa',it:'Timbro ≠: l’uguaglianza è falsa',pt:'Carimbo ≠: a sentença é falsa',fr:'Tampon ≠ : l’égalité est fausse',fi:'Leima ≠: väite ei ole totta'},
    ariaMinus:   {en:'One less',de:'Eins weniger',nl:'Eén minder',da:'Én mindre',sv:'En mindre',no:'Én mindre',es:'Uno menos',it:'Uno in meno',pt:'Um a menos',fr:'Un de moins',fi:'Yksi vähemmän'},
    ariaPlus:    {en:'One more',de:'Eins mehr',nl:'Eén meer',da:'Én mere',sv:'En mer',no:'Én mer',es:'Uno más',it:'Uno in più',pt:'Um a mais',fr:'Un de plus',fi:'Yksi enemmän'},
    ariaDial:    {en:'The number in the gold crate: {n}',de:'Die Zahl in der goldenen Kiste: {n}',nl:'Het getal in het gouden kistje: {n}',da:'Tallet i den gyldne kasse: {n}',sv:'Talet i den gyllene lådan: {n}',no:'Tallet i gullkassa: {n}',es:'El número de la caja dorada: {n}',it:'Il numero della cassetta dorata: {n}',pt:'O número da caixa dourada: {n}',fr:'Le nombre de la caisse dorée : {n}',fi:'Luku kultaisessa laatikossa: {n}'},
    ariaFlat:    {en:'The sign lies flat: both sides are {n}.',de:'Das Zeichen liegt flach: Beide Seiten sind {n}.',nl:'Het teken ligt plat: beide kanten zijn {n}.',da:'Tegnet ligger fladt: begge sider er {n}.',sv:'Tecknet ligger plant: båda sidorna är {n}.',no:'Tegnet ligger flatt: begge sidene er {n}.',es:'El signo queda plano: los dos lados valen {n}.',it:'Il segno resta piatto: i due lati valgono {n}.',pt:'O sinal fica plano: os dois lados valem {n}.',fr:'Le signe reste à plat : les deux côtés valent {n}.',fi:'Merkki on suorassa: kummallakin puolella on {n}.'},
    ariaTipL:    {en:'The sign tips: the left side is heavier.',de:'Das Zeichen kippt: Die linke Seite ist schwerer.',nl:'Het teken kantelt: de linkerkant is zwaarder.',da:'Tegnet vipper: venstre side er tungest.',sv:'Tecknet tippar: vänster sida är tyngst.',no:'Tegnet vipper: venstre side er tyngst.',es:'El signo se inclina: el lado izquierdo pesa más.',it:'Il segno si inclina: il lato sinistro pesa di più.',pt:'O sinal inclina: o lado esquerdo pesa mais.',fr:'Le signe penche : le côté gauche est plus lourd.',fi:'Merkki kallistuu: vasen puoli on painavampi.'},
    ariaTipR:    {en:'The sign tips: the right side is heavier.',de:'Das Zeichen kippt: Die rechte Seite ist schwerer.',nl:'Het teken kantelt: de rechterkant is zwaarder.',da:'Tegnet vipper: højre side er tungest.',sv:'Tecknet tippar: höger sida är tyngst.',no:'Tegnet vipper: høyre side er tyngst.',es:'El signo se inclina: el lado derecho pesa más.',it:'Il segno si inclina: il lato destro pesa di più.',pt:'O sinal inclina: o lado direito pesa mais.',fr:'Le signe penche : le côté droit est plus lourd.',fi:'Merkki kallistuu: oikea puoli on painavampi.'},
    ariaSealed:  {en:'The beam is sealed until the ruling.',de:'Der Balken ist bis zum Urteil versiegelt.',nl:'De balk is verzegeld tot het oordeel.',da:'Bjælken er forseglet indtil dommen.',sv:'Balken är förseglad fram till domen.',no:'Bjelken er forseglet til dommen.',es:'La barra está sellada hasta la decisión.',it:'La barra è sigillata fino alla sentenza.',pt:'A barra está lacrada até a decisão.',fr:'La barre est scellée jusqu’à la décision.',fi:'Palkki on sinetöity tuomioon asti.'},
    ariaClaim:   {en:'The claim: {c}',de:'Die Behauptung: {c}',nl:'De bewering: {c}',da:'Påstanden: {c}',sv:'Påståendet: {c}',no:'Påstanden: {c}',es:'La igualdad: {c}',it:'L’uguaglianza: {c}',pt:'A sentença: {c}',fr:'L’égalité : {c}',fi:'Väite: {c}'}
  },/*STRINGS-END*/

  defaults: { claims: 'tf', numbers: '10' },
  settings: [
    { key: 'claims', type: 'choice', labelKey: 'setClaims', options: [{ value: 'tf', labelKey: 'cTF' }, { value: 'mb', labelKey: 'cMB' }] },
    { key: 'numbers', type: 'choice', labelKey: 'setNumbers', options: [{ value: '10', labelKey: 'n10' }, { value: '20', labelKey: 'n20' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._view = {}; this._pics = {}; this._wIdx = 0;
    injectBeamCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') ['pets', 'forest creatures', 'farm animals'].forEach(function (dir) { LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return SignBeamCore.locale(((this.api && this.api.lang) || 'en')); },
  _mode: function () { return SignBeamCore.modeOf(this._setting('claims')); },
  _level: function () { return SignBeamCore.levelOf(this._setting('numbers')); },
  _key: function () { return this._mode() + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SignBeamCore.ids(this._mode(), this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SignBeamCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice(), p = C.plan(this._mode(), this._level(), Math.random, prev);
      this._order = p.order; this._orderForPool = pool; this._pass = pass;
    }
    var idx = this._order[pos], w = index % C.DATA.WITNESSES.length, pa = { msg: this._t(this._mode() === 'mb' ? 'tLineMB' : 'tLine') }; this._pa = pa;
    return {
      id: 'court.' + this._loc() + '.' + this._key() + '.' + idx, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx, w); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (idx, w) {
    var C = SignBeamCore;
    this._clearTimers(); this._view = {}; this._busy = false;
    this.st = C.newState(C.round(this._mode(), this._level(), idx));
    this._wIdx = w || 0;
    var line = this._t(this._mode() === 'mb' ? 'tLineMB' : 'tLine'); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(0, 0);
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
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'sb-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="sb-bench"><span class="sb-judge"></span><div class="sb-claim" role="status"></div><span class="sb-witness"></span></div>'
      + '<div class="sb-court"></div><div class="sb-controls"></div><p class="sb-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) {
      if (e.target && /^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
      var k = e.key;
      if (k === 'g' || k === 'G') { e.preventDefault(); self._gavel(); }
      else if (k === 't' || k === 'T') { e.preventDefault(); self._turn(); }
      else if (k === 'ArrowUp') { e.preventDefault(); self._nudge(1); }
      else if (k === 'ArrowDown') { e.preventDefault(); self._nudge(-1); }
    });
    this._q = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _pic: function (dir, key, size, cls) {
    var th = this._pics[dir]; if (!th || typeof LCSPictures === 'undefined') return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = cls; im.alt = ''; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = SignBeamCore, st = this.st, r = st.r, W = this._width(), G = C.geometry(W), v = this._view, self = this, mb = r.mode === 'mb';
    this._G = G;
    this._wrap.className = 'sb-wrap ' + (G.narrow ? 'is-narrow' : 'is-wide') + (W < 330 ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* ---- the bench: Judge Tess, the claim, the witness ---- */
    var pic = G.narrow ? 64 : 96, judge = this._q('.sb-judge'), wit = this._q('.sb-witness');
    judge.innerHTML = ''; wit.innerHTML = '';
    var tj = this._pic('pets', 'tortoise', pic, 'sb-tess' + (v.nod ? ' is-nod' : '')); if (tj) judge.appendChild(tj);
    var wd = C.DATA.WITNESSES[this._wIdx % C.DATA.WITNESSES.length], wi = this._pic(wd[0], wd[1], pic, 'sb-wit'); if (wi) wit.appendChild(wi);
    judge.style.width = wit.style.width = pic + 'px'; judge.style.height = wit.style.height = pic + 'px';
    var claim = this._q('.sb-claim'), o = C.over(st), txt = C.claimText(r, o, st.turned);
    var ink = st.done ? (st.shape === 'eq' ? '=' : '≠') : st.phase === 'verdict' && st.stamp ? (st.stamp === 'eq' ? '=' : '≠') : '';
    claim.className = 'sb-claim' + (st.done ? ' is-gold' : '');
    claim.innerHTML = '<span class="sb-claim-t">' + txt + '</span>' + (ink ? '<span class="sb-ink is-' + (ink === '=' ? 'eq' : 'ne') + '" aria-hidden="true">' + ink + '</span>' : '');
    claim.setAttribute('aria-label', this._t('ariaClaim', { c: txt }));
    /* ---- the court ---- */
    this._paintCourt(G);
    /* ---- the controls ---- */
    this._paintControls(G);
    /* ---- the note ---- */
    var note = this._q('.sb-note'), hk = C.hint(st), t = '', cls = 'sb-note';
    if (v.msg) { t = v.msg; cls += v.msgBad ? ' is-hint' : ' is-ok'; }
    else if (hk) { t = this._t(hk); cls += ' is-hint'; }
    else if (st.phase === 'repair' && !v.release) { t = this._t('hRepair'); cls += ' is-ok'; }
    note.className = cls; note.textContent = t;
  },
  /* the court: the post, the fixed top bar, the beam, the seal, the pans and their crates, the evidence */
  _paintCourt: function (G) {
    var C = SignBeamCore, st = this.st, r = st.r, v = this._view, court = this._q('.sb-court');
    var W = G.W, cx = W / 2, y1 = 22, y2 = y1 + G.thick + G.gap, pivotY = y2 + G.thick / 2, half = G.bar / 2;
    var ev = C.evidence(st), dot = G.narrow ? 11 : 14, dgap = G.narrow ? 3 : 4, rows = 4;
    var panY = pivotY + G.string, evH = ev ? rows * (dot + dgap) + 14 : 0, H = Math.round(panY + G.drop + 14 + evH + 12);
    var release = v.release || (st.done ? { shape: st.shape } : null), shape = release ? release.shape : 'eq', ang = release && !v.settling ? C.angle(shape, G) : 0;
    var sealed = !release;
    var left = st.turned ? 'R' : 'L', right = st.turned ? 'L' : 'R', o = C.over(st);
    var s = '<svg class="sb-svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" aria-hidden="true">';
    /* post + base */
    s += '<rect x="' + (cx - 14) + '" y="' + (y1) + '" width="28" height="' + (panY + G.drop + 4 - y1) + '" rx="6" class="sb-post"/>';
    s += '<rect x="' + (cx - 60) + '" y="' + (panY + G.drop + 2) + '" width="120" height="12" rx="6" class="sb-base"/>';
    /* the fixed top bar */
    s += '<rect x="' + (cx - half) + '" y="' + (y1) + '" width="' + G.bar + '" height="' + G.thick + '" rx="' + (G.thick / 2) + '" class="sb-top' + (st.done && shape === 'eq' ? ' is-glow' : '') + '"/>';
    /* the beam (bottom bar) with the pans' strings, rotating about the pivot */
    s += '<g class="sb-beam" data-ang="' + ang.toFixed(2) + '" style="transform-origin:' + cx + 'px ' + pivotY + 'px;transform:rotate(' + ang.toFixed(3) + 'deg)">';
    s += '<rect x="' + (cx - half) + '" y="' + y2 + '" width="' + G.bar + '" height="' + G.thick + '" rx="' + (G.thick / 2) + '" class="sb-bar' + (release && !v.settling ? (shape === 'eq' ? ' is-eq' : ' is-tip') : '') + '"/></g>';
    /* the seal over the pivot */
    if (sealed) {
      var sy = (y1 + y2 + G.thick) / 2, sr = G.narrow ? 19 : 24, sink = st.phase === 'verdict' && st.stamp ? (st.stamp === 'eq' ? '=' : '≠') : '';
      s += '<g class="sb-seal"><circle cx="' + cx + '" cy="' + sy + '" r="' + sr + '"/>' + (sink ? '<text x="' + cx + '" y="' + (sy + sr * 0.42) + '" font-size="' + Math.round(sr * 1.25) + '">' + sink + '</text>' : '') + '</g>';
    } else if (v.crack && !this.FAST) s += '<g class="sb-crack"><path d="M' + (cx - 20) + ' ' + ((y1 + y2 + G.thick) / 2) + 'a20 20 0 0 1 20 -20v40a20 20 0 0 1 -20 -20z"/><path d="M' + (cx + 20) + ' ' + ((y1 + y2 + G.thick) / 2) + 'a20 20 0 0 0 -20 -20v40a20 20 0 0 0 20 -20z"/></g>';
    /* the pans: one per side, hanging under the beam's ends */
    var pan = function (which, px) {
      var side = C.sideOf(r, which), endY = pivotY + (px < cx ? -1 : 1) * Math.sin(ang * Math.PI / 180) * half;
      var g = '<g class="sb-pan-g" style="transform:translateY(' + (endY - pivotY) + 'px)">';
      g += '<line x1="' + (px - G.pan / 2 + 6) + '" y1="' + panY + '" x2="' + px + '" y2="' + (pivotY) + '" class="sb-string"/><line x1="' + (px + G.pan / 2 - 6) + '" y1="' + panY + '" x2="' + px + '" y2="' + pivotY + '" class="sb-string"/>';
      g += '<rect x="' + (px - G.pan / 2) + '" y="' + panY + '" width="' + G.pan + '" height="10" rx="5" class="sb-pan"/>';
      /* the crates sit on the pan */
      var n = side.nums.length, totalW = n === 2 ? G.crate * 2 + G.opW : G.crate, x0 = px - totalW / 2, cy = panY - G.crate - 1;
      side.nums.forEach(function (num, i) {
        var dial = o && o.side === which && o.pos === i, val = dial ? (o.v == null ? '□' : String(o.v)) : String(num);
        var xx = x0 + i * (G.crate + G.opW);
        g += '<g class="sb-crate' + (dial ? ' is-dial' : '') + '" data-side="' + which + '" data-pos="' + i + '"><rect x="' + xx + '" y="' + cy + '" width="' + G.crate + '" height="' + G.crate + '" rx="8"/><text x="' + (xx + G.crate / 2) + '" y="' + (cy + G.crate * 0.68) + '" font-size="' + Math.round(G.crate * 0.54) + '">' + val + '</text></g>';
        if (i === 0 && n === 2) g += '<text class="sb-op" x="' + (xx + G.crate + G.opW / 2) + '" y="' + (cy + G.crate * 0.66) + '" font-size="' + Math.round(G.crate * 0.5) + '">' + (side.op === '+' ? '+' : '−') + '</text>';
      });
      g += '</g>';
      return g;
    };
    s += pan(left, cx - half) + pan(right, cx + half);
    /* the evidence: dots under the pans (5 to a row) */
    if (ev) {
      var by = panY + G.drop + 18, rowW = 5 * dot + 4 * dgap, pos = function (k, px) { return { x: px - rowW / 2 + (k % 5) * (dot + dgap) + dot / 2, y: by + Math.floor(k / 5) * (dot + dgap) + dot / 2 }; };
      var sides = { L: ev.L, R: ev.R }, colX = { }; colX[left] = cx - half; colX[right] = cx + half;
      var live = function (list) { return list.map(function (d, k) { return { d: d, k: k }; }); };
      if (ev.threads) {
        var la = sides[left].filter(function (d) { return !d.gone; }), ra = sides[right].filter(function (d) { return !d.gone; });
        for (var t = 0; t < ev.threads; t++) { var a = pos(t, colX[left]), b = pos(t, colX[right]); s += '<line x1="' + a.x + '" y1="' + a.y + '" x2="' + b.x + '" y2="' + b.y + '" class="sb-thread"/>'; }
      }
      ['L', 'R'].forEach(function (which) {
        var list = sides[which], solid = list.filter(function (d) { return !d.gone; }), gone = list.filter(function (d) { return d.gone; }), mine = solid.length, theirs = which === 'L' ? ev.nr : ev.nl;
        solid.concat(gone).forEach(function (d, k) {
          var p = pos(k, colX[which]), extra = !d.gone && ev.threads && k >= theirs;
          s += '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + (dot / 2 - 1) + '" class="sb-dot' + (d.gone ? ' is-gone' : '') + (d.dash ? ' is-dash' : '') + (extra ? ' is-extra' : '') + '"/>';
          if (d.gone) s += '<line x1="' + (p.x - dot / 2 + 2) + '" y1="' + (p.y + dot / 2 - 2) + '" x2="' + (p.x + dot / 2 - 2) + '" y2="' + (p.y - dot / 2 + 2) + '" class="sb-x"/>';
        });
      });
    }
    s += '</svg>';
    court.innerHTML = s; court.style.height = H + 'px';
    court.className = 'sb-court' + (v.flip ? ' is-flip' : '');
    court.setAttribute('aria-label', release ? (shape === 'eq' ? this._t('ariaFlat', { n: C.values(r, C.over(st)).l }) : this._t(shape === 'gt' ? 'ariaTipL' : 'ariaTipR')) : this._t('ariaSealed'));
    court.setAttribute('role', 'img');
  },
  _paintControls: function (G) {
    var C = SignBeamCore, st = this.st, self = this, box = this._q('.sb-controls'), v = this._view;
    box.innerHTML = '';
    var mk = function (cls, k, html, label, fn, dis) { var b = self.api.el('button', cls); b.type = 'button'; b.setAttribute('data-k', k); b.innerHTML = html; if (label) b.setAttribute('aria-label', label); b.disabled = !!dis; b.addEventListener('click', fn); box.appendChild(b); return b; };
    var busy = !!this._busy;
    if (st.done) {
      if (st.shape === 'eq') mk('sb-turn', 'turn', '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h13l-3-3M20 15H7l3 3" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._t('turnBtn') + '</span>', null, function () { self._turn(); }, busy);
      return;
    }
    if (st.phase === 'verdict') {
      [['eq', '=', 'labTrue', 'ariaEq'], ['ne', '≠', 'labFalse', 'ariaNe']].forEach(function (s) {
        var b = mk('sb-stamp is-' + s[0] + (st.stamp === s[0] ? ' is-on' : '') + (v.bob ? ' is-bob' : ''), 'stamp-' + s[0], '<span class="sb-glyph">' + s[1] + '</span><span class="sb-lab">' + self._t(s[2]) + '</span>', self._t(s[3]), function () { self._stamp(s[0]); }, busy);
        b.setAttribute('aria-pressed', st.stamp === s[0] ? 'true' : 'false');
      });
    } else {
      var d = st.dial, rg = C.range(st);
      mk('sb-nudge', 'minus', '−', this._t('ariaMinus'), function () { self._nudge(-1); }, busy || d == null || d <= rg.lo);
      var face = this.api.el('span', 'sb-dial'); face.setAttribute('data-k', 'dial'); face.textContent = d == null ? '□' : String(d); face.setAttribute('aria-label', this._t('ariaDial', { n: d == null ? '?' : d })); face.setAttribute('role', 'status'); box.appendChild(face);
      mk('sb-nudge', 'plus', '+', this._t('ariaPlus'), function () { self._nudge(1); }, busy || (d != null && d >= rg.hi));
    }
    mk('sb-gavel', 'gavel', '<svg viewBox="0 0 32 32" aria-hidden="true"><rect x="4" y="6" width="14" height="9" rx="2.5" transform="rotate(-35 11 10.5)" fill="#8A5A2B"/><rect x="13" y="13" width="4" height="16" rx="2" transform="rotate(-35 15 21)" fill="#B57A3E"/><rect x="18" y="26" width="12" height="4" rx="2" fill="#5C3A1A"/></svg><span>' + this._t('gavel') + '</span>', null, function () { self._gavel(); }, busy);
  },

  /* ---------------- actions ---------------- */
  _stamp: function (v) {
    if (this._busy || !SignBeamCore.stamp(this.st, v)) return;
    this._view = {}; this.api.sound(v === 'eq' ? 520 : 470); this._paint();
  },
  _nudge: function (d) {
    if (this._busy || !SignBeamCore.nudge(this.st, d)) return;
    this._view = {}; this.api.sound(d > 0 ? 560 : 480); this._paint();
  },
  _gavel: function () {
    var C = SignBeamCore, st = this.st, self = this, r = st.r;
    if (this._busy || st.done) return;
    var res = C.gavel(st); if (!res) return;
    this.api.sound(180);
    if (!res.released) { this._view = res.reason === 'nostamp' ? { bob: true } : {}; this._paint(); this.api.announce(this._q('.sb-note').textContent || ''); return; }
    /* the seal cracks, the beam swings */
    var settle = !this.FAST;
    this._view = { release: { shape: res.shape }, crack: true, settling: settle };
    if (res.reason === 'caught') { var v = C.values(r); this._view.msg = this._t('okFalse', { l: v.l, r: v.r }); this._view.msgBad = false; }
    if (res.reason === 'true') this._view.msg = this._t('okTrue', { n: st.last.n });
    if (res.reason === 'fixed' || res.reason === 'balanced') this._view.msg = this._t('okFixed', { c: st.last.text });
    if (res.shape === 'eq') this._view.nod = true;
    this._busy = !this.FAST && (res.reason === 'caught' || res.reason === 'tip');
    this._paint();
    if (settle) this._later(function () { self._view.settling = false; self._paint(); }, 40);
    this.api.announce((this._view.msg ? this._view.msg + ' ' : '') + (this._q('.sb-court').getAttribute('aria-label') || ''));
    if (res.reason === 'caught' || res.reason === 'tip') {
      /* the beam shows its answer, then a fresh seal presses on for the repair */
      /* (the note then carries the repair line or the heavy/light hint) */
      if (this.FAST) return;   /* (test seam: the shown beam stays until the next stamp or dial move) */
      this._later(function () { self._busy = false; self._view = {}; self._paint(); }, res.reason === 'caught' ? 2200 : 1400);
      return;
    }
    if (st.done) this._advance(this._view.msg.length * 60 + 2200);
  },
  _turn: function () {
    var C = SignBeamCore, st = this.st, self = this;
    if (this._busy || !C.turn(st)) return;
    this.api.sound(620);
    var finish = function () { self._view = { release: { shape: 'eq' }, msg: self._t('okTurn'), nod: true }; self._paint(); self.api.announce(self._view.msg); self._advance(self._view.msg.length * 60 + 2200); };
    if (this.FAST) { finish(); return; }
    this._busy = true; this._view.flip = true; this._paint();
    this._later(function () { self._busy = false; finish(); }, 320);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

var sbCssDone = false;
function injectBeamCSS() {
  if (sbCssDone || typeof document === 'undefined') return;
  sbCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.sb-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;}'
  + '.sb-bench{display:flex;align-items:center;justify-content:center;gap:16px;width:100%;} .sb-wrap.is-narrow .sb-bench{gap:6px;}'
  + '.sb-judge,.sb-witness{display:block;flex:none;} .sb-tess,.sb-wit{display:block;} .sb-witness{transform:scaleX(1);}'
  + '.sb-tess.is-nod{animation:sbNod 1.4s ease-in-out 1;transform-origin:70% 80%;} @keyframes sbNod{25%{rotate:8deg;}50%{rotate:0deg;}75%{rotate:8deg;}}'
  + '.sb-claim{position:relative;min-width:300px;min-height:72px;padding:6px 26px;border-radius:16px;background:#FFFDF7;box-shadow:inset 0 0 0 3px #EADBC0,0 4px 0 #EADBC0;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:34px;color:#0F4A40;white-space:nowrap;}'
  + '.sb-wrap.is-narrow .sb-claim{min-width:0;min-height:56px;padding:4px 14px;font-size:26px;} .sb-wrap.is-narrow .sb-ink{width:26px;height:26px;font-size:18px;right:-10px;top:-15px;} .sb-wrap.is-tiny .sb-claim{font-size:22px;padding:4px 10px;}'
  + '.sb-claim.is-gold{box-shadow:inset 0 0 0 3px #D4A21E,0 4px 0 #E8C26A;}'
  + '.sb-ink{position:absolute;right:-14px;top:-17px;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;transform:rotate(-12deg);} .sb-ink.is-eq{background:#1E8A78;} .sb-ink.is-ne{background:#E0603A;} .sb-claim.is-gold .sb-ink{background:#D4A21E;}'
  + '.sb-court{position:relative;width:100%;display:flex;justify-content:center;transition:transform .3s ease-in;} .sb-court.is-flip{transform:scaleX(0);} .sb-svg{display:block;overflow:visible;}'
  + '.sb-post{fill:#C79A3E;stroke:#7A5A1E;stroke-width:2;} .sb-base{fill:#9C7A3A;}'
  + '.sb-top{fill:#C9A04A;stroke:#7A5A1E;stroke-width:2;} .sb-top.is-glow{fill:#2AA390;stroke:#0F5C4F;}'
  + '.sb-beam{transition:transform .9s cubic-bezier(.34,1.56,.64,1);} .sb-bar{fill:#1E8A78;stroke:#0F5C4F;stroke-width:2;} .sb-bar.is-eq{fill:#2AA390;} .sb-bar.is-tip{fill:#E0603A;stroke:#9C3A1C;}'
  + '.sb-seal circle{fill:#C0392B;stroke:#7A1F15;stroke-width:3;} .sb-seal text{fill:#FFE9E3;text-anchor:middle;font-family:' + H + ';font-weight:800;}'
  + '.sb-crack path{fill:#C0392B;animation:sbCrack .5s ease-in forwards;} .sb-crack path:last-child{animation-name:sbCrack2;} @keyframes sbCrack{to{transform:translate(-18px,60px) rotate(-40deg);opacity:0;}} @keyframes sbCrack2{to{transform:translate(18px,60px) rotate(40deg);opacity:0;}}'
  + '.sb-pan-g{transition:transform .9s cubic-bezier(.34,1.56,.64,1);} .sb-string{stroke:#7A5A33;stroke-width:1.5;} .sb-pan{fill:#B8925A;stroke:#6E4F22;stroke-width:2;}'
  + '.sb-crate rect{fill:#FFFDF7;stroke:#1E8A78;stroke-width:3;} .sb-crate text,.sb-op{fill:#0F4A40;text-anchor:middle;font-family:' + H + ';font-weight:800;}'
  + '.sb-crate.is-dial rect{fill:#FFF6D6;stroke:#D4A21E;stroke-width:4;} .sb-crate.is-dial text{fill:#5A3D00;}'
  + '.sb-dot{fill:#1E8A78;} .sb-dot.is-dash{fill:#FFF6D6;stroke:#D4A21E;stroke-width:2;stroke-dasharray:3 2;} .sb-dot.is-gone{fill:#E9E2D2;} .sb-dot.is-extra{fill:#F2784B;filter:drop-shadow(0 0 3px #F2784B);} .sb-x{stroke:#B5461F;stroke-width:1.6;} .sb-thread{stroke:#7BB8AD;stroke-width:1.2;}'
  + '.sb-controls{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;} .sb-wrap.is-narrow .sb-controls{gap:8px;}'
  + '.sb-stamp{width:96px;height:96px;border:0;border-radius:50%;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;font-family:' + H + ';font-weight:800;color:#fff;transition:transform .15s;}'
  + '.sb-stamp.is-eq{background:#1E8A78;box-shadow:0 5px 0 #0F5C4F;} .sb-stamp.is-ne{background:#E0603A;box-shadow:0 5px 0 #9C3A1C;}'
  + '.sb-stamp.is-on{transform:translateY(4px);outline:4px solid #D4A21E;outline-offset:3px;} .sb-stamp.is-bob{animation:sbBob .5s ease-in-out 2;} @keyframes sbBob{50%{transform:translateY(-8px);}}'
  + '.sb-glyph{font-size:44px;line-height:1;} .sb-lab{font-family:' + B + ';font-size:15px;font-weight:800;line-height:1.1;max-width:84px;text-align:center;}'
  + '.sb-wrap.is-narrow .sb-stamp{width:80px;height:80px;} .sb-wrap.is-narrow .sb-glyph{font-size:36px;} .sb-wrap.is-narrow .sb-lab{font-size:13px;max-width:70px;} .sb-wrap.is-tiny .sb-stamp{width:72px;height:72px;}'
  + '.sb-gavel,.sb-turn{min-height:56px;padding:6px 18px;border:0;border-radius:16px;background:#FFF6D6;box-shadow:inset 0 0 0 3px #D4A21E,0 4px 0 #C79A3E;display:flex;align-items:center;gap:8px;font-family:' + H + ';font-weight:800;font-size:19px;color:#5A3D00;cursor:pointer;}'
  + '.sb-gavel svg{width:30px;height:30px;flex:none;} .sb-turn svg{width:24px;height:24px;flex:none;} .sb-wrap.is-narrow .sb-gavel,.sb-wrap.is-narrow .sb-turn{font-size:16px;padding:6px 12px;max-width:150px;text-align:left;line-height:1.15;}'
  + '.sb-nudge{width:56px;height:56px;border:0;border-radius:14px;background:#1E8A78;box-shadow:0 4px 0 #0F5C4F;color:#fff;font-family:' + H + ';font-weight:800;font-size:32px;line-height:1;cursor:pointer;} .sb-nudge:disabled{opacity:.35;cursor:default;}'
  + '.sb-dial{min-width:72px;height:56px;padding:0 8px;border-radius:12px;background:#FFF6D6;box-shadow:inset 0 0 0 4px #D4A21E;display:flex;align-items:center;justify-content:center;font-family:' + H + ';font-weight:800;font-size:34px;color:#5A3D00;}'
  + '.sb-stamp:focus-visible,.sb-gavel:focus-visible,.sb-turn:focus-visible,.sb-nudge:focus-visible{outline:3px solid #146B5E;outline-offset:3px;} button:disabled{cursor:default;}'
  + '.sb-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .sb-note:empty{display:none;} .sb-note.is-hint{color:#B5461F;} .sb-note.is-ok{color:#146B5E;}'
  + '.sb-wrap.is-narrow .sb-note{font-size:17px;}'
  + '.sb-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media print{.sb-note,.sb-controls{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.sb-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'sb-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.SignBeamActivity = SignBeamActivity;
