/* =====================================================================
   writing-carriage-activity.js — ACTIVITY #73 of the one-by-one rebuild:
   "Penny's Alphabet Trace" → THE WRITING CARRIAGE (L.K.1.a, 11 locales).
   Design sheet: docs/activities-rebuild/designs/073-penny-alphabet-trace.md
   ---------------------------------------------------------------------
   THE INVENTION: the child always writes in the same window and the paper
   moves under it like a typewriter carriage. Each letter is traced on its
   road, then written again with only the country's ruling and the start
   dot; every finished letter glides out to the left with three ratchet
   clicks and sits on the line beside the others. The alphabet wall above
   fills with the child's own letters, in the locale's alphabet order.
   Letters only (capitals, lowercase): words, sentences and word spacing
   belong to New #218 Word Ribbon (design §15).

   ACTIVITY LAYER ONLY: the model is writing-carriage-core.js, which judges
   with stroke-trace-core.js and draws the 52 glyphs of alphabet-trace-core.js
   (both read-only); lcs-shell.js is untouched (the shell's Check is hidden
   and pressed by this activity on success). Test seams:
   window.WritingCarriageActivity.st / ._pool / ._order / ._ensurePool /
   .FAST / ._toClient(pt).
   ===================================================================== */
'use strict';

var WritingCarriageActivity = {
  id: 'writing-carriage',
  apparatusClasses: ['wc-'],

  strings: {
    title:        {en:'Penny\'s Alphabet Trace',de:'Buchstaben nachspuren mit Penny',nl:'Letters naschrijven met Penny',da:'Skriv alfabetet med Penny',sv:'Skriv alfabetet med Penny',no:'Skriv alfabetet med Penny',es:'Traza el alfabeto con Penny',it:'Traccia le lettere con Penny',pt:'Trace o alfabeto com a Penny',fr:'Écris l’alphabet avec Penny',fi:'Kirjoita aakkoset Pennyn kanssa'},
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    tTW:          {en:'Start on the green dot. Trace it, then write it.',de:'Fang am grünen Punkt an. Erst nachspuren, dann selbst schreiben.',nl:'Begin bij de groene stip. Eerst overtrekken, dan zelf schrijven.',da:'Start ved den grønne prik. Først tegner du efter, så skriver du selv.',sv:'Börja vid den gröna pricken. Spåra först, skriv sedan själv.',no:'Start ved den grønne prikken. Først sporer du, så skriver du selv.',es:'Empieza en el punto verde. Primero repasa la letra y luego escríbela tú.',it:'Parti dal puntino verde. Prima ripassa la lettera, poi scrivila tu.',pt:'Comece no ponto verde. Cubra a letra e depois escreva de novo, sem o caminho.',fr:'Commence au point vert. Repasse la lettre, puis écris-la sans modèle.',fi:'Aloita vihreästä pisteestä. Jäljennä ensin, kirjoita sitten itse.'},
    tTWW:         {en:'Start on the green dot. Trace it, then write it twice.',de:'Fang am grünen Punkt an. Erst nachspuren, dann zweimal selbst schreiben.',nl:'Begin bij de groene stip. Eerst overtrekken, dan twee keer zelf schrijven.',da:'Start ved den grønne prik. Først tegner du efter, så skriver du selv to gange.',sv:'Börja vid den gröna pricken. Spåra först, skriv sedan själv två gånger.',no:'Start ved den grønne prikken. Først sporer du, så skriver du selv to ganger.',es:'Empieza en el punto verde. Primero repasa la letra y luego escríbela tú dos veces.',it:'Parti dal puntino verde. Prima ripassa la lettera, poi scrivila tu due volte.',pt:'Comece no ponto verde. Cubra a letra e depois escreva duas vezes, sem o caminho.',fr:'Commence au point vert. Repasse la lettre, puis écris-la deux fois sans modèle.',fi:'Aloita vihreästä pisteestä. Jäljennä ensin, kirjoita sitten itse kaksi kertaa.'},
    tT:           {en:'Start on the green dot and trace the letter.',de:'Fang am grünen Punkt an und spure den Buchstaben nach.',nl:'Begin bij de groene stip en trek de letter over.',da:'Start ved den grønne prik, og tegn bogstavet efter.',sv:'Börja vid den gröna pricken och spåra bokstaven.',no:'Start ved den grønne prikken, og spor bokstaven.',es:'Empieza en el punto verde y repasa la letra.',it:'Parti dal puntino verde e ripassa la lettera.',pt:'Comece no ponto verde e cubra a letra.',fr:'Commence au point vert et repasse la lettre.',fi:'Aloita vihreästä pisteestä ja jäljennä kirjain.'},
    tWriteOnly:   {en:'Write it once more — just the lines and the green dot.',de:'Schreib ihn noch einmal – nur mit den Linien und dem grünen Punkt.',nl:'Schrijf hem nog een keer – alleen met de lijnen en de groene stip.',da:'Skriv det en gang til – kun med linjerne og den grønne prik.',sv:'Skriv den en gång till – bara med linjerna och den gröna pricken.',no:'Skriv den en gang til – bare med linjene og den grønne prikken.',es:'Escríbela otra vez, solo con las líneas y el punto verde.',it:'Scrivila ancora una volta, solo con le righe e il puntino verde.',pt:'Escreva a letra mais uma vez, só com as linhas e o ponto verde.',fr:'Écris-la encore une fois, avec seulement les lignes et le point vert.',fi:'Kirjoita se vielä kerran – vain viivojen ja vihreän pisteen avulla.'},
    nWrite:       {en:'Now write it — just the lines and the green dot.',de:'Jetzt schreib ihn selbst – nur mit den Linien und dem grünen Punkt.',nl:'Schrijf hem nu zelf – alleen met de lijnen en de groene stip.',da:'Skriv det nu selv – kun med linjerne og den grønne prik.',sv:'Skriv den nu själv – bara med linjerna och den gröna pricken.',no:'Skriv den nå selv – bare med linjene og den grønne prikken.',es:'Ahora escríbela tú, solo con las líneas y el punto verde.',it:'Ora scrivila tu, solo con le righe e il puntino verde.',pt:'Agora escreva a letra, só com as linhas e o ponto verde.',fr:'Maintenant, écris-la avec seulement les lignes et le point vert.',fi:'Kirjoita se nyt itse – vain viivojen ja vihreän pisteen avulla.'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hEmpty:       {en:'Put your finger on the green dot and follow the road.',de:'Leg deinen Finger auf den grünen Punkt und fahr den Weg entlang.',nl:'Zet je vinger op de groene stip en volg het pad.',da:'Sæt fingeren på den grønne prik, og følg vejen.',sv:'Sätt fingret på den gröna pricken och följ vägen.',no:'Sett fingeren på den grønne prikken, og følg veien.',es:'Pon el dedo en el punto verde y sigue el camino.',it:'Metti il dito sul puntino verde e segui la strada.',pt:'Coloque o dedo no ponto verde e siga o caminho.',fr:'Pose ton doigt sur le point vert et suis le chemin.',fi:'Laita sormi vihreälle pisteelle ja seuraa tietä.'},
    hUnfinished:  {en:'Start on the green dot and follow the arrow.',de:'Fang am grünen Punkt an und folge dem Pfeil.',nl:'Begin bij de groene stip en volg de pijl.',da:'Start ved den grønne prik, og følg pilen.',sv:'Börja vid den gröna pricken och följ pilen.',no:'Start ved den grønne prikken, og følg pilen.',es:'Empieza en el punto verde y sigue la flecha.',it:'Parti dal puntino verde e segui la freccia.',pt:'Comece no ponto verde e siga a seta.',fr:'Commence au point vert et suis la flèche.',fi:'Aloita vihreästä pisteestä ja seuraa nuolta.'},
    hOff:         {en:'Look at the shadow letter — where did your line go off?',de:'Schau dir den Schattenbuchstaben an: Wo ist deine Linie abgebogen?',nl:'Kijk naar de schaduwletter: waar ging je lijn ernaast?',da:'Se på skyggebogstavet: Hvor gik din streg forkert?',sv:'Titta på skuggbokstaven: var gick ditt streck fel?',no:'Se på skyggebokstaven: Hvor gikk streken din feil?',es:'Mira la letra sombra: ¿dónde se salió tu línea?',it:'Guarda la lettera ombra: dov’è uscita la tua linea?',pt:'Olhe a letra-sombra: onde a sua linha saiu do caminho?',fr:'Regarde la lettre fantôme : où ton trait est-il sorti ?',fi:'Katso varjokirjainta: mistä kohtaa viivasi lähti sivuun?'},
    hMiss2:       {en:'Watch the spark, then do the same.',de:'Schau dem Funken zu und mach es genauso.',nl:'Kijk naar het vonkje en doe het na.',da:'Se på gnisten, og gør det samme.',sv:'Titta på gnistan och gör likadant.',no:'Se på gnisten, og gjør det samme.',es:'Mira la chispa y haz lo mismo.',it:'Guarda la scintilla e fai lo stesso.',pt:'Veja a faísca e faça igual.',fr:'Regarde l’étincelle, puis fais pareil.',fi:'Katso kipinää ja tee samoin.'},
    hWrongEnd:    {en:'Start at the green dot and go the way the arrow points.',de:'Fang am grünen Punkt an und fahr in Pfeilrichtung.',nl:'Begin bij de groene stip en ga de kant van de pijl op.',da:'Start ved den grønne prik, og gå den vej, pilen peger.',sv:'Börja vid den gröna pricken och gå åt det håll pilen pekar.',no:'Start ved den grønne prikken, og gå den veien pilen peker.',es:'Empieza en el punto verde y ve hacia donde apunta la flecha.',it:'Parti dal puntino verde e vai dove indica la freccia.',pt:'Comece no ponto verde e vá para onde a seta aponta.',fr:'Commence au point vert et va dans le sens de la flèche.',fi:'Aloita vihreästä pisteestä ja kulje nuolen suuntaan.'},
    nStroke:      {en:'Stroke done. The next one starts at the green dot.',de:'Strich fertig. Der nächste beginnt am grünen Punkt.',nl:'Die haal is klaar. De volgende begint bij de groene stip.',da:'Stregen er færdig. Den næste starter ved den grønne prik.',sv:'Strecket är klart. Nästa börjar vid den gröna pricken.',no:'Streken er ferdig. Den neste starter ved den grønne prikken.',es:'Trazo terminado. El siguiente empieza en el punto verde.',it:'Tratto finito. Il prossimo parte dal puntino verde.',pt:'Traço pronto. O próximo começa no ponto verde.',fr:'Trait fini. Le suivant commence au point vert.',fi:'Veto valmis. Seuraava alkaa vihreästä pisteestä.'},
    okLetter:     {en:'{g} — you wrote it!',de:'{g} – du hast ihn geschrieben!',nl:'{g} – je hebt hem geschreven!',da:'{g} – du har skrevet det!',sv:'{g} – du har skrivit den!',no:'{g} – du har skrevet den!',es:'{g}: ¡la escribiste!',it:'{g}: l’hai scritta!',pt:'{g}: você conseguiu escrever!',fr:'{g} : tu l’as écrite !',fi:'{g} – kirjoitit sen!'},
    setLevel:     {en:'Capitals or lowercase',de:'Groß oder klein',nl:'Hoofdletters of kleine letters',da:'Store eller små bogstaver',sv:'Stora eller små bokstäver',no:'Store eller små bokstaver',es:'Mayúsculas o minúsculas',it:'Maiuscole o minuscole',pt:'Maiúsculas ou minúsculas',fr:'Majuscules ou minuscules',fi:'Isot vai pienet kirjaimet'},
    lUpper:       {en:'Capitals',de:'Großbuchstaben',nl:'Hoofdletters',da:'Store bogstaver',sv:'Stora bokstäver',no:'Store bokstaver',es:'Mayúsculas',it:'Maiuscole',pt:'Maiúsculas',fr:'Majuscules',fi:'Isot kirjaimet'},
    lLower:       {en:'Lowercase',de:'Kleinbuchstaben',nl:'Kleine letters',da:'Små bogstaver',sv:'Små bokstäver',no:'Små bokstaver',es:'Minúsculas',it:'Minuscole',pt:'Minúsculas',fr:'Minuscules',fi:'Pienet kirjaimet'},
    setSet:       {en:'Letters',de:'Buchstaben',nl:'Letters',da:'Bogstaver',sv:'Bokstäver',no:'Bokstaver',es:'Letras',it:'Lettere',pt:'Letras',fr:'Lettres',fi:'Kirjaimet'},
    sAll:         {en:'All',de:'Alle',nl:'Alle',da:'Alle',sv:'Alla',no:'Alle',es:'Todas',it:'Tutte',pt:'Todas',fr:'Toutes',fi:'Kaikki'},
    sAF:          {en:'A to F',de:'A bis F',nl:'A tot en met F',da:'A til F',sv:'A till F',no:'A til F',es:'De la A a la F',it:'Dalla A alla F',pt:'Do A ao F',fr:'De A à F',fi:'A–F'},
    sGL:          {en:'G to L',de:'G bis L',nl:'G tot en met L',da:'G til L',sv:'G till L',no:'G til L',es:'De la G a la L',it:'Dalla G alla L',pt:'Do G ao L',fr:'De G à L',fi:'G–L'},
    sMR:          {en:'M to R',de:'M bis R',nl:'M tot en met R',da:'M til R',sv:'M till R',no:'M til R',es:'De la M a la R',it:'Dalla M alla R',pt:'Do M ao R',fr:'De M à R',fi:'M–R'},
    sSZ:          {en:'S to Z',de:'S bis Z',nl:'S tot en met Z',da:'S til Å',sv:'S till Ö',no:'S til Å',es:'De la S a la Z',it:'Dalla S alla Z',pt:'Do S ao Z',fr:'De S à Z',fi:'S–Ö'},
    sVow:         {en:'Vowels',de:'Selbstlaute',nl:'Klinkers',da:'Vokaler',sv:'Vokaler',no:'Vokaler',es:'Vocales',it:'Vocali',pt:'Vogais',fr:'Voyelles',fi:'Vokaalit'},
    sFirst:       {en:'First letters',de:'Erste Buchstaben',nl:'Eerste letters',da:'De første bogstaver',sv:'De första bokstäverna',no:'De første bokstavene',es:'Primeras letras',it:'Prime lettere',pt:'Primeiras letras',fr:'Premières lettres',fi:'Ensimmäiset kirjaimet'},
    setPractice:  {en:'Practice',de:'Üben',nl:'Oefenen',da:'Øvelse',sv:'Övning',no:'Øving',es:'Práctica',it:'Esercizio',pt:'Prática',fr:'Entraînement',fi:'Harjoitus'},
    pTW:          {en:'Trace, then write',de:'Nachspuren, dann schreiben',nl:'Overtrekken, dan schrijven',da:'Tegn efter, så skriv',sv:'Spåra, skriv sedan',no:'Spor, så skriv',es:'Repasar y luego escribir',it:'Ripassare, poi scrivere',pt:'Cobrir e depois escrever',fr:'Repasser, puis écrire',fi:'Jäljennä, sitten kirjoita'},
    pTWW:         {en:'Trace, then write twice',de:'Nachspuren, dann zweimal schreiben',nl:'Overtrekken, dan twee keer schrijven',da:'Tegn efter, så skriv to gange',sv:'Spåra, skriv sedan två gånger',no:'Spor, så skriv to ganger',es:'Repasar y escribir dos veces',it:'Ripassare, poi scrivere due volte',pt:'Cobrir e escrever duas vezes',fr:'Repasser, puis écrire deux fois',fi:'Jäljennä, sitten kirjoita kahdesti'},
    pT:           {en:'Trace only',de:'Nur nachspuren',nl:'Alleen overtrekken',da:'Kun tegne efter',sv:'Bara spåra',no:'Bare spore',es:'Solo repasar',it:'Solo ripassare',pt:'Só cobrir',fr:'Repasser seulement',fi:'Vain jäljennä'},
    ariaWindow:   {en:'Writing window. Letter {g}. Stroke {k} of {n}: start at the green dot.',de:'Schreibfenster. Buchstabe {g}. Strich {k} von {n}: Fang am grünen Punkt an.',nl:'Schrijfvenster. Letter {g}. Haal {k} van {n}: begin bij de groene stip.',da:'Skrivevindue. Bogstavet {g}. Streg {k} af {n}: start ved den grønne prik.',sv:'Skrivfönster. Bokstaven {g}. Streck {k} av {n}: börja vid den gröna pricken.',no:'Skrivevindu. Bokstaven {g}. Strek {k} av {n}: start ved den grønne prikken.',es:'Ventana de escritura. Letra {g}. Trazo {k} de {n}: empieza en el punto verde.',it:'Finestra di scrittura. Lettera {g}. Tratto {k} di {n}: parti dal puntino verde.',pt:'Janela de escrita. Letra {g}. Traço {k} de {n}: comece no ponto verde.',fr:'Fenêtre d’écriture. Lettre {g}. Trait {k} sur {n} : commence au point vert.',fi:'Kirjoitusikkuna. Kirjain {g}. Veto {k}/{n}: aloita vihreästä pisteestä.'},
    ariaWall:     {en:'Alphabet wall: {count} of {total} letters',de:'ABC-Wand: {count} von {total} Buchstaben',nl:'Alfabetmuur: {count} van {total} letters',da:'Alfabetvæg: {count} af {total} bogstaver',sv:'Alfabetsvägg: {count} av {total} bokstäver',no:'Alfabetvegg: {count} av {total} bokstaver',es:'Muro del abecedario: {count} de {total} letras',it:'Muro dell’alfabeto: {count} lettere su {total}',pt:'Mural do alfabeto: {count} de {total} letras',fr:'Mur de l’alphabet : {count} lettres sur {total}',fi:'Aakkosseinä: {count}/{total} kirjainta'},
    ariaStep:     {en:'Step {n} of {total}: {kind}',de:'Schritt {n} von {total}: {kind}',nl:'Stap {n} van {total}: {kind}',da:'Trin {n} af {total}: {kind}',sv:'Steg {n} av {total}: {kind}',no:'Steg {n} av {total}: {kind}',es:'Paso {n} de {total}: {kind}',it:'Passo {n} di {total}: {kind}',pt:'Etapa {n} de {total}: {kind}',fr:'Étape {n} sur {total} : {kind}',fi:'Vaihe {n}/{total}: {kind}'},
    kTrace:       {en:'trace',de:'nachspuren',nl:'overtrekken',da:'tegne efter',sv:'spåra',no:'spore',es:'repasar',it:'ripassare',pt:'cobrir',fr:'repasser',fi:'jäljennä'},
    kWrite:       {en:'write',de:'schreiben',nl:'schrijven',da:'skrive',sv:'skriva',no:'skrive',es:'escribir',it:'scrivere',pt:'escrever',fr:'écrire',fi:'kirjoita'},
    ariaErase:    {en:'Rub out this letter',de:'Diesen Buchstaben wegradieren',nl:'Deze letter uitgummen',da:'Visk bogstavet ud',sv:'Sudda ut bokstaven',no:'Visk ut bokstaven',es:'Borrar esta letra',it:'Cancella questa lettera',pt:'Apagar esta letra',fr:'Effacer cette lettre',fi:'Pyyhi tämä kirjain'},
    ariaBell:     {en:'Ring the bell',de:'Die Glocke läuten',nl:'Laat de bel rinkelen',da:'Ring med klokken',sv:'Ring i klockan',no:'Ring med klokka',es:'Tocar la campana',it:'Suona il campanello',pt:'Tocar o sino',fr:'Faire sonner la cloche',fi:'Soita kelloa'}
  },

  defaults: { level: 'upper', letters: 'all', practice: 'tw' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'upper', labelKey: 'lUpper' }, { value: 'lower', labelKey: 'lLower' }] },
    { key: 'letters', type: 'choice', labelKey: 'setSet', options: [{ value: 'all', labelKey: 'sAll' }, { value: 'af', labelKey: 'sAF' }, { value: 'gl', labelKey: 'sGL' }, { value: 'mr', labelKey: 'sMR' }, { value: 'sz', labelKey: 'sSZ' }, { value: 'vowels', labelKey: 'sVow' }, { value: 'first', labelKey: 'sFirst' }] },
    { key: 'practice', type: 'choice', labelKey: 'setPractice', options: [{ value: 'tw', labelKey: 'pTW' }, { value: 'tww', labelKey: 'pTWW' }, { value: 't', labelKey: 'pT' }] }
  ],

  OK_MS: 2600, FAST: false, GLIDE_MS: 320,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pa = {}; this._ptr = null;
    this._paper = null; this._wall = null; this._wallKey = null;
    injectCarriageCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; this._paper = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.r.steps.join() !== WritingCarriageCore.round(this._loc(), this._level(), this._set(), this.st.r.id, this._practice()).steps.join()) { if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return WritingCarriageCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return WritingCarriageCore.levelOf(this._setting('level')); },
  _set: function () { return WritingCarriageCore.setOf(this._setting('letters')); },
  _practice: function () { return WritingCarriageCore.practiceOf(this._setting('practice')); },
  _key: function () { return this._loc() + '/' + this._level() + '/' + this._set(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = WritingCarriageCore.ids(this._loc(), this._level(), this._set()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  /* the round id names the letter: pass 1 runs in alphabet order, every later pass is a new order */
  nextTask: function (opts) {
    var C = WritingCarriageCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.map(function (i) { return pool[i]; });
      this._order = C.plan(this._loc(), this._level(), this._set(), Math.random, prev, fresh ? pass : pass).map(function (x) { return pool.indexOf(x); }); this._orderForPool = pool;
      this._pass = pass;
    }
    var id = pool[this._order[pos]], r = C.round(this._loc(), this._level(), this._set(), id, this._practice());
    var pa = { msg: this._t(r.pad ? 'tWriteOnly' : ({ tw: 'tTW', tww: 'tTWW', t: 'tT' })[this._practice()]) }; this._pa = pa;
    return {
      id: 'carriage.' + this._loc() + '.' + this._level() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _start: function (id) {
    var C = WritingCarriageCore, r = C.round(this._loc(), this._level(), this._set(), id, this._practice());
    this._clearTimers(); this._busy = false; this._view = {}; this._ptr = null;
    this.st = C.newState(r);
    if (!this._paper) this._paper = { X: null, items: [] };
  },

  /* ---------------- the wall: the child's own letters, kept per locale and case ---------------- */
  _wallStore: function () {
    var k = 'lcs-wc-wall-' + this._loc() + '-' + this._level();
    if (this._wallKey !== k) { this._wallKey = k; this._wall = {}; try { var v = window.localStorage && localStorage.getItem(k); if (v) this._wall = JSON.parse(v) || {}; } catch (e) { this._wall = {}; } }
    return this._wall;
  },
  _pin: function (letter, ink) {
    var w = this._wallStore(), thin = ink.map(function (s) { var out = []; for (var i = 0; i < s.length; i += 2) out.push([Math.round(s[i].x), Math.round(s[i].y)]); if (s.length && (s.length - 1) % 2) out.push([Math.round(s[s.length - 1].x), Math.round(s[s.length - 1].y)]); return out; });
    w[letter] = thin;
    try { if (window.localStorage) localStorage.setItem(this._wallKey, JSON.stringify(w)); } catch (e) {}
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = WritingCarriageCore; this.st = C.newState(C.round(this._loc(), this._level(), this._set(), C.ids(this._loc(), this._level(), this._set())[0], this._practice())); if (!this._paper) this._paper = { X: null, items: [] }; }
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy || self._ptr) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'wc-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    this._wallEl = api.el('div', 'wc-wall'); this._wallEl.setAttribute('role', 'img'); wrap.appendChild(this._wallEl);
    this._paperEl = api.el('div', 'wc-paperbox'); wrap.appendChild(this._paperEl);
    var row = api.el('div', 'wc-row'); wrap.appendChild(row);
    var er = api.el('button', 'wc-erase'); er.type = 'button'; er.setAttribute('data-k', 'erase');
    er.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><g transform="rotate(-35 20 20)"><rect x="8" y="13" width="24" height="14" rx="3" fill="#F2A6C0" stroke="#2A2A35" stroke-width="2.4"/><rect x="8" y="13" width="9" height="14" rx="2" fill="#7FB3D5" stroke="#2A2A35" stroke-width="2.4"/></g><path d="M9 34 H31" stroke="#2A2A35" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 4"/></svg>';
    er.addEventListener('click', function () { self._erase(); }); this._eraseBtn = er; row.appendChild(er);
    var chk = api.el('button', 'wc-check'); chk.type = 'button'; chk.setAttribute('data-k', 'check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    var note = api.el('p', 'wc-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    wrap.addEventListener('keydown', function (ev) {
      if (ev.target && ev.target.tagName === 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) return;
      if (ev.key === ' ') { ev.preventDefault(); self._demo(); }
      else if (ev.key === 'Enter') { ev.preventDefault(); self._check(); }
    });
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
    if (!this._paperEl) return;
    var C = WritingCarriageCore, st = this.st, L = this._L = C.layout(this._width());
    this._wrap.className = 'wc-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (L.W < 320 ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '');
    /* wall slots sized so one alphabet row fits the card (26–29 letters), 13–24 px wide */
    var loc = this._loc(), nRow = C.setLetters(loc, this._level(), this._set()).filter(function (c) { return !C.isForeign(loc, c); }).length || 1;
    var sw = Math.floor((L.W - 22) / nRow) - 3;
    if (sw < 13) sw = Math.floor((L.W - 22) / Math.ceil(nRow / 2)) - 3;     /* two balanced rows on a phone */
    sw = Math.max(13, Math.min(24, sw));
    this._wrap.style.setProperty('--wc-sw', sw + 'px');
    this._wrap.style.setProperty('--wc-sh', Math.round(sw * 1.36) + 'px');
    this._paintWall();
    this._paintPaper();
    var h = C.hint(st), v = this._view, msg = '';
    if (v.msg) msg = v.msg;
    else if (h) msg = this._t(h);
    else if (!st.done && C.kind(st) === 'write' && !st.ink.length && st.tr.strokesDone === 0 && !st.r.pad) msg = this._t('nWrite');
    this._note.textContent = msg;
    this._note.className = 'wc-note' + (st.done ? ' is-ok' : (h && h !== 'hEmpty' ? ' is-hint' : ''));
    this._checkBtn.textContent = this._t('check'); this._checkBtn.disabled = !!this._busy || st.done;
    this._eraseBtn.setAttribute('aria-label', this._t('ariaErase')); this._eraseBtn.disabled = !!this._busy || st.done;
  },
  _paintWall: function () {
    var C = WritingCarriageCore, self = this, loc = this._loc(), letters = C.setLetters(loc, this._level(), this._set()), w = this._wallStore(), el = this._wallEl, NS = 'http://www.w3.org/2000/svg';
    el.innerHTML = '';
    var rows = [letters.filter(function (c) { return !C.isForeign(loc, c); }), letters.filter(function (c) { return C.isForeign(loc, c); })], count = 0;
    rows.forEach(function (row, ri) {
      if (!row.length) return;
      var rEl = this.api.el('div', 'wc-wallrow' + (ri ? ' is-foreign' : ''));
      row.forEach(function (ch) {
        var slot = self.api.el('span', 'wc-slot' + (w[ch] ? ' is-pinned' : '') + (self._view.pinned === ch ? ' is-new' : '')); slot.setAttribute('data-slot', ch);
        var s = '<svg viewBox="8 -2 84 104" aria-hidden="true">';
        if (w[ch]) { count++; w[ch].forEach(function (pl) { s += '<path class="wc-mini" d="' + pl.map(function (p, i) { return (i ? 'L' : 'M') + p[0] + ' ' + p[1]; }).join(' ') + '"/>'; }); }
        else C.glyph(ch).forEach(function (stroke) { s += '<path class="wc-ghost" d="' + spline(stroke) + '"/>'; });
        slot.innerHTML = s + '</svg>';
        rEl.appendChild(slot);
      });
      el.appendChild(rEl);
    }, this);
    el.setAttribute('aria-label', this._t('ariaWall', { count: count, total: letters.length }));
  },
  /* the carriage: rail, bell, roll, the ruled paper (the sheet glides under the fixed window), the window, the step pips */
  _paintPaper: function () {
    var C = WritingCarriageCore, st = this.st, r = st.r, L = this._L, self = this, v = this._view, P = this._paper;
    var Wu = Math.round(L.wu * 10) / 10, top = -20, H = 128, adv = C.advance(r);
    if (P.X === null) P.X = L.winCx - adv / 2;
    var off = P.X + adv / 2 - L.winCx, tx = r.box.cx;              /* letter glyph x → svg x: x - cx + winCx (the sheet moved by -off) */
    var rl = C.ruling(this._loc()), s = '';
    s += '<svg class="wc-svg" viewBox="0 ' + top + ' ' + Wu + ' ' + H + '" width="' + L.W + '" height="' + Math.round(H * L.scale) + '" role="group" aria-label="' + esc(this._t('ariaWindow', { g: r.letter, k: Math.min(st.tr.idx + 1, r.strokes.length), n: r.strokes.length })) + '">';
    /* the rail, the bell, the paper and its ruling */
    s += '<rect class="wc-rail" x="4" y="-17" width="' + (Wu - 30) + '" height="3.2" rx="1.6"/>';
    s += '<rect class="wc-paper" x="0" y="-3" width="' + (Wu - 12) + '" height="110"/>';
    var lines = rl.zones.map(function (z) { return z.y; }), band = rl.band;
    var x1 = (lines.indexOf(44) >= 0 || band) ? 44 : null;
    if (x1 !== null) s += '<rect class="wc-sky" x="0" y="14" width="' + (Wu - 12) + '" height="30"/>';
    if (x1 !== null) s += '<rect class="wc-grass" x="0" y="44" width="' + (Wu - 12) + '" height="40"/>';
    if (lines.indexOf(96) >= 0) s += '<rect class="wc-ground" x="0" y="84" width="' + (Wu - 12) + '" height="12"/>';
    rl.zones.forEach(function (z) { s += '<line class="wc-rule is-' + z.tone + (z.kind === 'dashed' ? ' is-dashed' : '') + '" x1="0" x2="' + (Wu - 12) + '" y1="' + z.y + '" y2="' + z.y + '"/>'; });
    /* the sheet: letters already written, then the letter in the window */
    s += '<g class="wc-sheet' + (v.glide ? ' is-glide' : '') + '" style="transform:translateX(' + (-(v.glideFrom !== undefined ? v.glideFrom : off)).toFixed(2) + 'px)">';
    P.items.forEach(function (it) { s += '<g transform="translate(' + it.tx.toFixed(2) + ' 0)">' + it.ink.map(function (pl) { return '<path class="wc-ink is-old" d="' + poly(pl) + '"/>'; }).join('') + '</g>'; });
    s += '</g>';
    s += '<g class="wc-letter" transform="translate(' + (L.winCx - tx).toFixed(2) + ' 0)">';
    if (!st.done && !v.glide) {
      var k = C.kind(st), help = C.helpOf(st);
      if (k === 'trace') r.strokes.forEach(function (stroke, i) { if (i < st.tr.idx) return; s += '<path class="wc-road" d="' + spline(stroke) + '"/><path class="wc-hair" d="' + spline(stroke) + '"/>'; });
      if (help && help.shadow) r.strokes.forEach(function (stroke) { s += '<path class="wc-shadow" d="' + spline(stroke) + '"/>'; });
      if (help && (help.light || help.spark)) { var lane = st.tr.lanes[help.stroke], d = poly(lane.pts); s += '<path class="wc-light" pathLength="1" d="' + d + '"/>'; if (help.spark) s += '<path class="wc-roadfat" d="' + d + '"/><circle class="wc-spark" r="4.5"><animateMotion dur="1.2s" repeatCount="2" path="' + d + '"/></circle>'; }
      if (v.demo) { var dl = st.tr.lanes[st.tr.idx]; s += '<circle class="wc-spark" r="4.5"><animateMotion dur="1.2s" repeatCount="1" fill="freeze" path="' + poly(dl.pts) + '"/></circle>'; }
      st.ink.forEach(function (stroke, i) { s += '<path class="wc-ink' + (stroke.pale ? ' is-pale' : '') + '" data-ink="' + i + '" d="' + poly(stroke.pts) + '"/>'; });
      var dot = C.startDot(st), R = L.dot / L.scale;
      if (dot && !this._ptr) {
        var len = Math.sqrt(dot.dx * dot.dx + dot.dy * dot.dy) || 1, ux = dot.dx / len, uy = dot.dy / len, ax = dot.x + ux * (R + 3), ay = dot.y + uy * (R + 3), A1 = 14 / L.scale, A2 = 8 / L.scale;   /* the arrow ~14 px long whatever the scale */
        s += '<circle class="wc-dothalo" cx="' + dot.x + '" cy="' + dot.y + '" r="' + (R * 1.6).toFixed(2) + '"/><circle class="wc-dot" cx="' + dot.x + '" cy="' + dot.y + '" r="' + R.toFixed(2) + '"/>';
        if (!dot.isDot) s += '<path class="wc-arrow" d="M' + (ax + ux * A1).toFixed(2) + ' ' + (ay + uy * A1).toFixed(2) + ' L' + (ax - uy * A2).toFixed(2) + ' ' + (ay + ux * A2).toFixed(2) + ' L' + (ax + uy * A2).toFixed(2) + ' ' + (ay - ux * A2).toFixed(2) + 'Z"/>';
      }
    }
    s += '</g>';
    /* the window (fixed), its step pips, the roll, the bell */
    s += '<rect class="wc-win" x="' + (L.winCx - L.win / 2) + '" y="-2" width="' + L.win + '" height="108" rx="6"/>';
    var n = st.kinds.length, gap = 9, x0 = L.winCx - (n - 1) * gap / 2;
    s += '<g class="wc-pips" role="group" aria-label="' + esc(this._t('ariaStep', { n: Math.min(st.step + 1, n), total: n, kind: this._t(C.kind(st) === 'write' ? 'kWrite' : 'kTrace') })) + '">';
    for (var i = 0; i < n; i++) s += '<circle class="wc-pip' + (i < st.step || st.done ? ' is-done' : i === st.step ? ' is-now' : '') + (st.kinds[i] === 'write' ? ' is-write' : '') + '" data-pip="' + i + '" cx="' + (x0 + i * gap) + '" cy="-8" r="3.2"/>';
    s += '</g>';
    s += '<rect class="wc-roll" x="' + (Wu - 12) + '" y="-6" width="12" height="114" rx="5"/>';
    var bx = Wu - 22, by = -15.5;
    s += '<g class="wc-bell' + (v.ring ? ' is-ring' : '') + '" data-k="bell" role="button" tabindex="0" aria-label="' + esc(this._t('ariaBell')) + '"><circle class="wc-bellhit" cx="' + bx + '" cy="' + by + '" r="' + (24 / L.scale).toFixed(1) + '"/><path class="wc-bellcup" d="M' + (bx - 5) + ' ' + (by + 3) + ' Q' + (bx - 5) + ' ' + (by - 5) + ' ' + bx + ' ' + (by - 5) + ' Q' + (bx + 5) + ' ' + (by - 5) + ' ' + (bx + 5) + ' ' + (by + 3) + 'Z"/><circle class="wc-bellknob" cx="' + bx + '" cy="' + (by + 4) + '" r="1.4"/></g>';
    s += '</svg>';
    this._paperEl.innerHTML = s;
    this._svg = this._paperEl.firstChild; this._off = off; this._tx = L.winCx - tx;
    var svg = this._svg;
    svg.addEventListener('pointerdown', function (ev) { self._down(ev); });
    var bell = svg.querySelector('.wc-bell');
    bell.addEventListener('click', function (ev) { ev.stopPropagation(); self._ring(); });
    bell.addEventListener('pointerdown', function (ev) { ev.stopPropagation(); });
    bell.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); ev.stopPropagation(); self._ring(); } });
    if (v.glide) this._later(function () { var g = svg.querySelector('.wc-sheet'); if (g) g.style.transform = 'translateX(' + (-off).toFixed(2) + 'px)'; }, 20);
  },

  /* ---------------- the hand ---------------- */
  _glyphPt: function (ev) {
    var m = this._svg && this._svg.getScreenCTM(); if (!m) return null;
    var p = this._svg.createSVGPoint(); p.x = ev.clientX; p.y = ev.clientY; p = p.matrixTransform(m.inverse());
    return { x: p.x - this._tx, y: p.y };
  },
  /* test seam: a glyph-unit point of the letter in the window → client coordinates */
  _toClient: function (pt) {
    var m = this._svg && this._svg.getScreenCTM(); if (!m) return null;
    var p = this._svg.createSVGPoint(); p.x = pt.x + this._tx; p.y = pt.y; p = p.matrixTransform(m);
    return { x: p.x, y: p.y };
  },
  _down: function (ev) {
    if (this._busy || this.st.done || (ev.button !== undefined && ev.button !== 0) || this._ptr) return;
    var pt = this._glyphPt(ev); if (!pt) return;
    ev.preventDefault();
    var self = this, C = WritingCarriageCore, st = this.st, svg = this._svg;
    try { svg.setPointerCapture(ev.pointerId); } catch (e) {}
    /* no repaint while the finger is down (a repaint would replace the svg under the pointer): hide the start dot and help, add this stroke's ink path */
    this._view = {}; C.down(st, pt);
    this._ptr = ev.pointerId;
    [].forEach.call(svg.querySelectorAll('.wc-dot,.wc-dothalo,.wc-arrow,.wc-light,.wc-spark,.wc-roadfat,.wc-shadow'), function (n) { n.parentNode.removeChild(n); });
    this._note.textContent = ''; this._note.className = 'wc-note';
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('class', 'wc-ink'); path.setAttribute('d', poly(st.cur.pts));
    svg.querySelector('.wc-letter').appendChild(path);
    var onMove = function (e) {
      if (e.pointerId !== self._ptr) return;
      var evs = (e.getCoalescedEvents && e.getCoalescedEvents()) || [e]; if (!evs.length) evs = [e];
      for (var i = 0; i < evs.length; i++) { var q = self._glyphPt(evs[i]); if (q) C.move(st, q); }
      if (path && st.cur) path.setAttribute('d', poly(st.cur.pts));
    };
    var onUp = function (e) {
      if (e.pointerId !== self._ptr) return;
      svg.removeEventListener('pointermove', onMove); svg.removeEventListener('pointerup', onUp); svg.removeEventListener('pointercancel', onUp);
      self._ptr = null;
      self._lift(C.up(st));
    };
    svg.addEventListener('pointermove', onMove); svg.addEventListener('pointerup', onUp); svg.addEventListener('pointercancel', onUp);
  },
  _lift: function (res) {
    var self = this, st = this.st;
    if (!res) { this._paint(); return; }
    if (res.res === 'incomplete') {
      this._paint();
      if (st.ink.some(function (s) { return s.pale; })) this._later(function () { st.ink = st.ink.filter(function (s) { return !s.pale; }); if (self.st === st && !self._ptr) self._paint(); }, 1100);   /* the fade is seen, so it keeps real time */
      return;
    }
    if (res.res === 'stroke') { this.api.sound(587); this._paint(); this.api.announce(this._t('nStroke')); return; }
    /* a letter is written: it glides out of the window with three ratchet clicks */
    var C = WritingCarriageCore, last = st.inks[st.inks.length - 1], P = this._paper, adv = C.advance(st.r), L = this._L, from = this._off;
    P.items.push({ tx: P.X + adv / 2 - st.r.box.cx, ink: last.ink }); if (P.items.length > 10) P.items.shift();
    P.X += adv;
    this._busy = true; this._view = { glide: true, glideFrom: from };
    this.api.sound(330); this._later(function () { self.api.sound(330); }, this._ms(90)); this._later(function () { self.api.sound(330); }, this._ms(180));
    this._paint();
    this._later(function () {
      self._busy = false; self._view = {};
      if (res.res === 'round') return self._win(last.ink);
      self._paint(); self.api.announce(self._note.textContent || '');
    }, this._ms(this.GLIDE_MS));
  },
  _erase: function () { if (this._busy || this.st.done) return; if (WritingCarriageCore.erase(this.st)) { this.api.sound(260); this._view = {}; this._paint(); } },
  _check: function () {
    if (this._busy || this.st.done) return;
    var res = WritingCarriageCore.check(this.st);
    this.api.sound(res.reason === 'empty' ? 460 : 220); this._view = {}; this._paint(); this.api.announce(this._note.textContent || '');
  },
  /* Space: the spark shows the stroke — a demonstration only, never credited */
  _demo: function () { if (this._busy || this.st.done) return; this._view = { demo: true }; this._paint(); var self = this; this._later(function () { if (self._view.demo) { self._view = {}; self._paint(); } }, 1400); },
  _ring: function () { var self = this; this.api.sound(1318); this._view = { ring: true }; this._paint(); this._later(function () { if (self._view.ring) { self._view = {}; self._paint(); } }, 600); },
  _win: function (ink) {
    var self = this, st = this.st, pa = this._pa || {}, msg = this._t('okLetter', { g: st.r.letter });
    this._pin(st.r.letter, ink);
    pa.msg = msg; this._busy = true; this._view = { msg: msg, pinned: st.r.letter, ring: true };
    this.api.sound(1318); this._later(function () { self.api.sound(1568); }, this._ms(140));
    this._paint();
    this._later(function () { self._busy = false; self._paint(); self.api.announce(msg); }, this._ms(500));
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

/* Catmull-Rom → cubic Bézier through every point (the guide letters, the same curve the tracer flattens) */
function spline(pts) {
  if (!pts || !pts.length) return '';
  if (pts.length < 3) return 'M ' + pts.map(function (p) { return p.x + ' ' + p.y; }).join(' L ');
  var d = 'M ' + pts[0].x + ' ' + pts[0].y;
  for (var k = 0; k < pts.length - 1; k++) {
    var p0 = pts[k - 1] || pts[k], p1 = pts[k], p2 = pts[k + 1], p3 = pts[k + 2] || p2;
    d += ' C ' + (p1.x + (p2.x - p0.x) / 6).toFixed(2) + ' ' + (p1.y + (p2.y - p0.y) / 6).toFixed(2) + ' ' + (p2.x - (p3.x - p1.x) / 6).toFixed(2) + ' ' + (p2.y - (p3.y - p1.y) / 6).toFixed(2) + ' ' + p2.x + ' ' + p2.y;
  }
  return d;
}
function poly(pts) { if (!pts || !pts.length) return ''; var d = 'M' + pts[0].x.toFixed(1) + ' ' + pts[0].y.toFixed(1); for (var i = 1; i < pts.length; i++) d += ' L' + pts[i].x.toFixed(1) + ' ' + pts[i].y.toFixed(1); if (pts.length === 1) d += ' l0.01 0'; return d; }
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;'); }

var wcCssDone = false;
function injectCarriageCSS() {
  if (wcCssDone || typeof document === 'undefined') return;
  wcCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.wc-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.wc-wrap:focus{outline:none;}'
  /* the wall */
  + '.wc-wall{width:100%;box-sizing:border-box;padding:6px 8px;border-radius:12px;background:#E3C99A;box-shadow:inset 0 0 0 2px #B9965C;display:flex;flex-direction:column;gap:4px;}'
  + '.wc-wallrow{display:flex;flex-wrap:wrap;justify-content:center;gap:3px;} .wc-wallrow.is-foreign{padding-top:3px;border-top:2px dashed #B9965C;}'
  + '.wc-slot{position:relative;width:var(--wc-sw);height:var(--wc-sh);border-radius:3px;background:rgba(255,254,251,.35);box-shadow:inset 0 0 0 1.5px #B9965C;}'
  + '.wc-slot.is-pinned{background:#FFFEFB;box-shadow:0 1px 0 #9C7B45;}'
  /* the pin sits in the card's top-left CORNER: centred above the letter it read as a diacritic (A looked like Ȧ) */
  + '.wc-slot.is-pinned::before{content:"";position:absolute;left:-2px;top:-2px;width:5px;height:5px;border-radius:50%;background:#C64A22;box-shadow:0 0 0 1px #FFFEFB;}'
  + '.wc-slot.is-new{animation:wcPin .5s ease-out;}'
  + '@keyframes wcPin{0%{transform:translateY(16px) scale(1.6);opacity:.2;}100%{transform:none;opacity:1;}}'
  + '.wc-slot svg{width:100%;height:100%;display:block;}'
  + '.wc-mini{fill:none;stroke:#C64A22;stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}'
  + '.wc-ghost{fill:none;stroke:#C9AE80;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;}'
  /* the carriage */
  + '.wc-paperbox{width:100%;display:flex;justify-content:center;touch-action:none;}'
  + '.wc-svg{display:block;max-width:100%;overflow:visible;touch-action:none;cursor:crosshair;}'
  + '.wc-rail{fill:#C9A34A;stroke:#7A5E1E;stroke-width:.6;}'
  + '.wc-paper{fill:#FFFEFB;stroke:#E2D6BE;stroke-width:.6;}'
  + '.wc-sky{fill:#E9F3FB;} .wc-grass{fill:#EEF7EA;} .wc-ground{fill:#F6EFE6;}'
  + '.wc-rule{stroke:#146B5E;vector-effect:non-scaling-stroke;} .wc-rule.is-faint{stroke:#A9C9C1;stroke-width:1px;} .wc-rule.is-mid{stroke:#6FA597;stroke-width:1.5px;} .wc-rule.is-strong{stroke:#146B5E;stroke-width:2.4px;} .wc-rule.is-dashed{stroke-dasharray:6 5;}'
  + '.wc-sheet.is-glide{transition:transform .32s cubic-bezier(.3,.7,.3,1);} .wc-wrap.is-fast .wc-sheet{transition:none;}'
  + '.wc-road{fill:none;stroke:rgba(20,107,94,.30);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}'
  + '.wc-hair{fill:none;stroke:rgba(20,107,94,.85);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;}'
  + '.wc-roadfat{fill:none;stroke:rgba(20,107,94,.38);stroke-width:11;stroke-linecap:round;stroke-linejoin:round;}'
  + '.wc-shadow{fill:none;stroke:rgba(42,42,53,.2);stroke-width:7;stroke-linecap:round;stroke-linejoin:round;}'
  + '.wc-light{fill:none;stroke:#FFD23F;stroke-width:6;stroke-linecap:round;stroke-dasharray:.16 1;animation:wcLight .9s linear 2;}'
  + '@keyframes wcLight{from{stroke-dashoffset:1.16;}to{stroke-dashoffset:0;}}'
  + '.wc-spark{fill:#FFD23F;stroke:#E8833A;stroke-width:1.4;}'
  + '.wc-ink{fill:none;stroke:#C64A22;stroke-width:5.4;stroke-linecap:round;stroke-linejoin:round;}'
  + '.wc-ink.is-old{stroke:#B04A28;}'
  + '.wc-ink.is-pale{stroke-width:2.4;opacity:.45;animation:wcFade 1s ease-in forwards;}'
  + '@keyframes wcFade{to{opacity:0;}}'
  + '.wc-dothalo{fill:rgba(47,165,106,.22);} .wc-dot{fill:#2FA56A;stroke:#FFFFFF;stroke-width:1.2;} .wc-arrow{fill:#2FA56A;}'
  + '.wc-win{fill:none;stroke:#146B5E;stroke-width:3px;vector-effect:non-scaling-stroke;}'
  + '.wc-pip{fill:#FFFFFF;stroke:#146B5E;stroke-width:1.2;} .wc-pip.is-now{fill:#146B5E;} .wc-pip.is-done{fill:#2FA56A;stroke:#2FA56A;}'
  + '.wc-roll{fill:#EADFC7;stroke:#9C8C72;stroke-width:.8;}'
  + '.wc-bell{cursor:pointer;} .wc-bellhit{fill:transparent;} .wc-bellcup{fill:#E8B83A;stroke:#7A5E1E;stroke-width:.8;} .wc-bellknob{fill:#7A5E1E;}'
  + '.wc-bell.is-ring .wc-bellcup{animation:wcRing .6s ease-in-out;transform-box:fill-box;transform-origin:50% 0;}'
  + '@keyframes wcRing{0%,100%{transform:rotate(0);}25%{transform:rotate(16deg);}50%{transform:rotate(-14deg);}75%{transform:rotate(8deg);}}'
  /* the controls */
  + '.wc-row{display:flex;align-items:center;justify-content:center;gap:14px;}'
  + '.wc-erase{width:52px;height:52px;padding:4px;border:0;border-radius:14px;background:#FFF8EC;box-shadow:inset 0 0 0 2.5px #2A2A35,0 3px 0 #D8C9A6;cursor:pointer;} .wc-erase svg{width:100%;height:100%;display:block;} .wc-erase:disabled{opacity:.45;cursor:default;}'
  + '.wc-check{min-height:52px;min-width:120px;padding:0 26px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:20px;box-shadow:0 4px 0 #0C4A41;cursor:pointer;} .wc-check:disabled{opacity:.5;cursor:default;}'
  + '.wc-erase:focus-visible,.wc-check:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.wc-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;}'
  + '.wc-note.is-hint{color:#B5461F;} .wc-note.is-ok{color:#146B5E;}'
  + '.wc-wrap.is-narrow .wc-note{font-size:17px;} .wc-wrap.is-narrow .wc-check{font-size:18px;min-width:104px;}'
  + '@media print{.wc-row,.wc-note{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.wc-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'wc-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.WritingCarriageActivity = WritingCarriageActivity;
