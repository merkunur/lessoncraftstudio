/* =====================================================================
   juniper-story-lantern-activity.js — ACTIVITY #116 of the one-by-one
   rebuild: "Juniper's Story Lantern" → THE LANTERN THAT CARRIES A LESSON
   (RL.1.2; all 11 locales).
   Design: docs/activities-rebuild/designs/116-juniper-story-lantern.md
   ---------------------------------------------------------------------
   THE INVENTION: a lantern whose light shows what a card really is. Tap
   a lesson card and it slides into Juniper's lantern; press Check and the
   light pours out — back across the three story panes and forward along
   a beam of sparks to a new little story. A true lesson lights every
   pane and the new story's window opens; a detail lights only its own
   pane and the beam fizzles halfway; a wrong lesson makes the ending
   pane turn cold and the beam stops; another story's lesson lights
   nothing. Every lesson found puts a firefly in the jar. Retell (task
   setting): the panes arrive out of order — tap two to swap them — and
   the lantern opens only when the story is in order.
   ACTIVITY LAYER ONLY: the model is juniper-story-lantern-core.js;
   pictures are the library's (Juniper is the library hedgehog);
   lcs-shell.js untouched (the shell's Check is hidden and pressed by
   this activity when right).
   Test seams: window.JuniperLanternActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var JuniperLanternActivity = {
  id: 'juniper-lantern',
  apparatusClasses: ['jl-'],

  /*STRINGS-BEGIN*/strings: {
    title: {en:"Juniper's Story Lantern",de:"Junipers Geschichten-Laterne",fr:"La lanterne à histoires de Juniper",es:"El farolito de Juniper",pt:"O lampião de Fagulha",it:"La lanterna delle favole di Ginepro",nl:"De verhalenlantaarn van Prikkel",sv:"Junipers berättelselykta",da:"Junipers fortællelygte",no:"Junipers fortellerlykt",fi:"Juniperin tarinalyhty"},
    instruction: {en:"Read the story. Which card tells what the story teaches?",de:"Lies die Geschichte. Welche Karte sagt, was die Geschichte lehrt?",fr:"Lis l’histoire. Quelle carte dit ce que l’histoire nous apprend ?",es:"Lee el cuento. ¿Qué tarjeta dice lo que nos enseña?",pt:"Leia a história. Qual cartão diz o que a história ensina?",it:"Leggi la storia. Quale carta dice che cosa insegna la storia?",nl:"Lees het verhaal. Welke kaart zegt wat het verhaal ons leert?",sv:"Läs berättelsen. Vilket kort säger vad berättelsen lär oss?",da:"Læs historien. Hvilket kort siger, hvad historien lærer os?",no:"Les historien. Hvilket kort sier hva historien lærer oss?",fi:"Lue tarina. Mikä kortti kertoo, mitä tarina opettaa?"},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    tLesson: {en:"Read the story. Which card tells what the story teaches?",de:"Lies die Geschichte. Welche Karte sagt, was die Geschichte lehrt?",fr:"Lis l’histoire. Quelle carte dit ce que l’histoire nous apprend ?",es:"Lee el cuento. ¿Qué tarjeta dice lo que nos enseña?",pt:"Leia a história. Qual cartão diz o que a história ensina?",it:"Leggi la storia. Quale carta dice che cosa insegna la storia?",nl:"Lees het verhaal. Welke kaart zegt wat het verhaal ons leert?",sv:"Läs berättelsen. Vilket kort säger vad berättelsen lär oss?",da:"Læs historien. Hvilket kort siger, hvad historien lærer os?",no:"Les historien. Hvilket kort sier hva historien lærer oss?",fi:"Lue tarina. Mikä kortti kertoo, mitä tarina opettaa?"},
    tRetell: {en:"Put the story in order: tap two parts to swap them.",de:"Bring die Geschichte in die richtige Reihenfolge: Tipp zwei Teile an, um sie zu tauschen.",fr:"Remets l’histoire dans l’ordre : touche deux parties pour les échanger.",es:"Ordena el cuento: toca dos partes para cambiarlas de lugar.",pt:"Coloque a história em ordem: toque em duas partes para trocá-las.",it:"Metti in ordine la storia: tocca due parti per scambiarle.",nl:"Zet het verhaal op volgorde: tik op twee delen om ze te wisselen.",sv:"Sätt berättelsen i ordning: tryck på två delar för att byta plats på dem.",da:"Sæt historien i rækkefølge: Tryk på to dele for at bytte dem.",no:"Sett historien i riktig rekkefølge: Trykk på to deler for å bytte dem.",fi:"Laita tarina järjestykseen: napauta kahta osaa, niin ne vaihtavat paikkaa."},
    tAfter: {en:"Now find its lesson: which card tells what the story teaches?",de:"Such jetzt die Lehre: Welche Karte sagt, was die Geschichte lehrt?",fr:"Trouve maintenant la leçon : quelle carte dit ce que l’histoire nous apprend ?",es:"Ahora busca la enseñanza: ¿qué tarjeta dice lo que nos enseña?",pt:"Agora ache a lição: qual cartão diz o que a história ensina?",it:"Ora trova la lezione: quale carta dice che cosa insegna la storia?",nl:"Zoek nu de les: welke kaart zegt wat het verhaal ons leert?",sv:"Hitta nu det berättelsen lär oss: vilket kort säger det?",da:"Find nu det, historien lærer os: Hvilket kort siger det?",no:"Finn nå det historien lærer oss: Hvilket kort sier det?",fi:"Etsi nyt tarinan opetus: mikä kortti kertoo sen?"},
    nudge: {en:"Tap a card: it slides into the lantern. Then press Check.",de:"Tipp eine Karte an: Sie rutscht in die Laterne. Dann drück auf Prüfen.",fr:"Touche une carte : elle glisse dans la lanterne. Puis appuie sur Vérifier.",es:"Toca una tarjeta: entra en el farolito. Luego presiona Comprobar.",pt:"Toque em um cartão: ele entra no lampião. Depois toque em Verificar.",it:"Tocca una carta: scivola nella lanterna. Poi premi Controlla.",nl:"Tik op een kaart: hij glijdt in de lantaarn. Druk dan op Controleer.",sv:"Tryck på ett kort: det glider in i lyktan. Tryck sedan på Kontrollera.",da:"Tryk på et kort: Det glider ind i lygten. Tryk så på Tjek.",no:"Trykk på et kort: Det glir inn i lykta. Trykk så på Sjekk.",fi:"Napauta korttia: se liukuu lyhtyyn. Paina sitten Tarkista."},
    hintEmpty: {en:"Put a card in the lantern.",de:"Steck eine Karte in die Laterne.",fr:"Mets une carte dans la lanterne.",es:"Pon una tarjeta en el farolito.",pt:"Coloque um cartão no lampião.",it:"Metti una carta nella lanterna.",nl:"Stop een kaart in de lantaarn.",sv:"Lägg ett kort i lyktan.",da:"Læg et kort i lygten.",no:"Legg et kort i lykta.",fi:"Laita kortti lyhtyyn."},
    hintDetail: {en:"That happened in the story. But a lesson is something you can take to a new story.",de:"Das ist in der Geschichte passiert. Aber eine Lehre kann man in eine neue Geschichte mitnehmen.",fr:"Ça s’est passé dans l’histoire. Mais une leçon, on peut l’emporter dans une nouvelle histoire.",es:"Eso pasó en el cuento. Pero una enseñanza sirve también en un cuento nuevo.",pt:"Isso aconteceu na história. Mas uma lição serve também para uma história nova.",it:"Questo è successo nella storia. Ma una lezione si può portare anche in una storia nuova.",nl:"Dat gebeurde in het verhaal. Maar een les kun je meenemen naar een nieuw verhaal.",sv:"Det hände i berättelsen. Men det man lär sig kan man ta med till en ny berättelse.",da:"Det skete i historien. Men det, man lærer, kan man tage med til en ny historie.",no:"Det skjedde i historien. Men det man lærer, kan man ta med til en ny historie.",fi:"Niin tarinassa tapahtui. Mutta opetuksen voi viedä mukanaan uuteen tarinaan."},
    hintWrong: {en:"Look at how the story ends. Does it agree?",de:"Schau, wie die Geschichte endet. Passt das dazu?",fr:"Regarde comment l’histoire se termine. Est-ce que ça va ensemble ?",es:"Fíjate cómo termina el cuento. ¿Coincide?",pt:"Veja como a história termina. Combina?",it:"Guarda come finisce la storia. Corrisponde alla carta?",nl:"Kijk hoe het verhaal afloopt. Klopt het daarmee?",sv:"Titta på hur berättelsen slutar. Stämmer det?",da:"Se, hvordan historien ender. Passer det?",no:"Se hvordan historien slutter. Stemmer det?",fi:"Katso, miten tarina loppuu. Sopiiko se siihen?"},
    hintOther: {en:"That is a lesson from a different story. What does this story teach?",de:"Das ist die Lehre aus einer anderen Geschichte. Was lehrt diese Geschichte?",fr:"C’est la leçon d’une autre histoire. Que nous apprend cette histoire-ci ?",es:"Esa es la enseñanza de otro cuento. ¿Qué nos enseña este cuento?",pt:"Essa é a lição de outra história. O que esta história ensina?",it:"Questa è la lezione di un’altra storia. Che cosa insegna questa storia?",nl:"Dat is de les van een ander verhaal. Wat leert dit verhaal?",sv:"Det är vad en annan berättelse lär oss. Vad lär den här berättelsen?",da:"Det er det, en anden historie lærer os. Hvad lærer denne historie?",no:"Det er det en annen historie lærer oss. Hva lærer denne historien?",fi:"Se on toisen tarinan opetus. Mitä tämä tarina opettaa?"},
    hintBoth: {en:"Read the ending again, and the new story. Which card is true for both?",de:"Lies das Ende noch einmal und die neue Geschichte. Welche Karte passt zu beiden?",fr:"Relis la fin, puis la nouvelle histoire. Quelle carte est vraie pour les deux ?",es:"Lee otra vez el final y el cuento nuevo. ¿Qué tarjeta sirve para los dos?",pt:"Leia de novo o final e a história nova. Qual cartão vale para as duas?",it:"Rileggi la fine e la storia nuova. Quale carta va bene per tutte e due?",nl:"Lees het einde nog eens, en het nieuwe verhaal. Welke kaart past bij allebei?",sv:"Läs slutet igen, och den nya berättelsen. Vilket kort passar till båda?",da:"Læs slutningen igen og den nye historie. Hvilket kort passer til begge?",no:"Les slutten igjen, og den nye historien. Hvilket kort passer til begge?",fi:"Lue loppu uudestaan ja uusi tarina. Mikä kortti sopii molempiin?"},
    hintOrder: {en:"Which part happened first?",de:"Welcher Teil ist zuerst passiert?",fr:"Quelle partie s’est passée en premier ?",es:"¿Qué parte pasó primero?",pt:"Qual parte aconteceu primeiro?",it:"Quale parte è successa per prima?",nl:"Welk deel gebeurde eerst?",sv:"Vilken del hände först?",da:"Hvilken del skete først?",no:"Hvilken del skjedde først?",fi:"Mikä osa tapahtui ensin?"},
    hintOrder2: {en:"The glowing part comes first.",de:"Der leuchtende Teil kommt zuerst.",fr:"La partie qui brille vient en premier.",es:"La parte que brilla va primero.",pt:"A parte que brilha vem primeiro.",it:"La parte che brilla viene per prima.",nl:"Het deel dat oplicht, komt eerst.",sv:"Delen som lyser kommer först.",da:"Den del, der lyser, kommer først.",no:"Delen som lyser, kommer først.",fi:"Hehkuva osa tulee ensin."},
    okLesson: {en:"Yes! This story teaches: {moral} It works in a new story too.",de:"Ja! Diese Geschichte lehrt: {moral} Das passt auch zu einer neuen Geschichte.",fr:"Oui ! Cette histoire nous apprend : {moral} Ça marche aussi dans une nouvelle histoire.",es:"¡Sí! Este cuento nos enseña: {moral} También sirve en un cuento nuevo.",pt:"Isso! Esta história ensina: {moral} Também vale para uma história nova.",it:"Sì! Questa storia insegna: {moral} Vale anche in una storia nuova.",nl:"Ja! Dit verhaal leert: {moral} Dat past ook bij een nieuw verhaal.",sv:"Ja! Berättelsen lär oss: {moral} Det gäller i en ny berättelse också.",da:"Ja! Historien lærer os: {moral} Det gælder også i en ny historie.",no:"Ja! Historien lærer oss: {moral} Det gjelder i en ny historie også.",fi:"Kyllä! Tarina opettaa: {moral} Se pätee uudessakin tarinassa."},
    okRetell: {en:"You told the story in order.",de:"Du hast die Geschichte in der richtigen Reihenfolge erzählt.",fr:"Tu as raconté l’histoire dans l’ordre.",es:"Contaste el cuento en orden.",pt:"Você contou a história em ordem.",it:"Hai raccontato la storia in ordine.",nl:"Je hebt het verhaal op volgorde verteld.",sv:"Du berättade historien i rätt ordning.",da:"Du fortalte historien i rækkefølge.",no:"Du fortalte historien i riktig rekkefølge.",fi:"Kerroit tarinan oikeassa järjestyksessä."},
    aPane: {en:"Story part {i}: {s}",de:"Teil {i} der Geschichte: {s}",fr:"Partie {i} de l’histoire : {s}",es:"Parte {i} del cuento: {s}",pt:"Parte {i} da história: {s}",it:"Parte {i} della storia: {s}",nl:"Deel {i} van het verhaal: {s}",sv:"Del {i} av berättelsen: {s}",da:"Del {i} af historien: {s}",no:"Del {i} av historien: {s}",fi:"Tarinan osa {i}: {s}"},
    aCard: {en:"Lesson card: {t}",de:"Karte: {t}",fr:"Carte : {t}",es:"Tarjeta: {t}",pt:"Cartão: {t}",it:"Carta: {t}",nl:"Kaart: {t}",sv:"Kort: {t}",da:"Kort: {t}",no:"Kort: {t}",fi:"Kortti: {t}"},
    aLantern: {en:"Lantern, holding: {t}",de:"Laterne, darin: {t}",fr:"Lanterne, avec : {t}",es:"Farolito, con: {t}",pt:"Lampião, com: {t}",it:"Lanterna, con: {t}",nl:"Lantaarn, met: {t}",sv:"Lykta, med: {t}",da:"Lygte, med: {t}",no:"Lykt, med: {t}",fi:"Lyhty, sisällä: {t}"},
    aLanternEmpty: {en:"Lantern: empty",de:"Laterne: leer",fr:"Lanterne : vide",es:"Farolito: vacío",pt:"Lampião: vazio",it:"Lanterna: vuota",nl:"Lantaarn: leeg",sv:"Lykta: tom",da:"Lygte: tom",no:"Lykt: tom",fi:"Lyhty: tyhjä"},
    aNext: {en:"New story: {s}",de:"Neue Geschichte: {s}",fr:"Nouvelle histoire : {s}",es:"Cuento nuevo: {s}",pt:"História nova: {s}",it:"Storia nuova: {s}",nl:"Nieuw verhaal: {s}",sv:"Ny berättelse: {s}",da:"Ny historie: {s}",no:"Ny historie: {s}",fi:"Uusi tarina: {s}"},
    aJar: {en:"Lesson jar: {n} fireflies",de:"Glas mit Glühwürmchen: {n}",fr:"Bocal à lucioles : {n}",es:"Frasco de luciérnagas: {n}",pt:"Pote de vaga-lumes: {n}",it:"Barattolo di lucciole: {n}",nl:"Pot met vuurvliegjes: {n}",sv:"Burk med eldflugor: {n}",da:"Glas med ildfluer: {n}",no:"Glass med ildfluer: {n}",fi:"Tulikärpäspurkki: {n}"},
    srMoral: {en:"The light fills the story and reaches the new story.",de:"Das Licht füllt die Geschichte und reicht bis zur neuen Geschichte.",fr:"La lumière remplit l’histoire et arrive jusqu’à la nouvelle histoire.",es:"La luz llena el cuento y llega al cuento nuevo.",pt:"A luz enche a história e chega à história nova.",it:"La luce riempie la storia e arriva alla storia nuova.",nl:"Het licht vult het verhaal en reikt tot het nieuwe verhaal.",sv:"Ljuset fyller berättelsen och når den nya berättelsen.",da:"Lyset fylder historien og når den nye historie.",no:"Lyset fyller historien og når den nye historien.",fi:"Valo täyttää tarinan ja yltää uuteen tarinaan."},
    srDetail: {en:"The light shows one part only.",de:"Das Licht zeigt nur einen Teil.",fr:"La lumière n’éclaire qu’une partie.",es:"La luz solo ilumina una parte.",pt:"A luz só ilumina uma parte.",it:"La luce illumina solo una parte.",nl:"Het licht laat maar één deel zien.",sv:"Ljuset lyser bara på en del.",da:"Lyset viser kun én del.",no:"Lyset viser bare én del.",fi:"Valo näyttää vain yhden osan."},
    srWrong: {en:"The ending turns cold.",de:"Das Ende wird kalt.",fr:"La fin devient froide.",es:"El final se pone frío.",pt:"O final fica frio.",it:"La fine diventa fredda.",nl:"Het einde wordt koud.",sv:"Slutet blir kallt.",da:"Slutningen bliver kold.",no:"Slutten blir kald.",fi:"Loppu muuttuu kylmäksi."},
    srOther: {en:"No part of the story lights up.",de:"Kein Teil der Geschichte leuchtet.",fr:"Aucune partie de l’histoire ne s’allume.",es:"Ninguna parte del cuento se ilumina.",pt:"Nenhuma parte da história acende.",it:"Nessuna parte della storia si accende.",nl:"Geen enkel deel van het verhaal licht op.",sv:"Ingen del av berättelsen lyser.",da:"Ingen del af historien lyser op.",no:"Ingen del av historien lyser.",fi:"Mikään tarinan osa ei syty."},
    setTask: {en:"Task",de:"Aufgabe",fr:"Consigne",es:"Actividad",pt:"Atividade",it:"Attività",nl:"Opdracht",sv:"Uppgift",da:"Opgave",no:"Oppgave",fi:"Tehtävä"},
    tkLesson: {en:"Lesson",de:"Lehre",fr:"Leçon",es:"Enseñanza",pt:"Lição",it:"Lezione",nl:"Les",sv:"Det vi lär oss",da:"Det, vi lærer",no:"Det vi lærer",fi:"Opetus"},
    tkRetell: {en:"Retell, then lesson",de:"Nacherzählen, dann Lehre",fr:"Raconter, puis leçon",es:"Ordenar el cuento y luego la enseñanza",pt:"Recontar, depois lição",it:"Raccontare, poi lezione",nl:"Navertellen, dan de les",sv:"Återberätta, sedan det vi lär oss",da:"Genfortælle, så det, vi lærer",no:"Gjenfortelle, så det vi lærer",fi:"Kerro uudelleen, sitten opetus"},
    setCards: {en:"Cards",de:"Karten",fr:"Cartes",es:"Tarjetas",pt:"Cartões",it:"Carte",nl:"Kaarten",sv:"Kort",da:"Kort",no:"Kort",fi:"Kortit"},
    n3: {en:"3",de:"3",fr:"3",es:"3",pt:"3",it:"3",nl:"3",sv:"3",da:"3",no:"3",fi:"3"},
    n4: {en:"4",de:"4",fr:"4",es:"4",pt:"4",it:"4",nl:"4",sv:"4",da:"4",no:"4",fi:"4"},
  },/*STRINGS-END*/

  defaults: { task: 'lesson', cards: '3' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'lesson', labelKey: 'tkLesson' }, { value: 'retell', labelKey: 'tkRetell' }] },
    { key: 'cards', type: 'choice', labelKey: 'setCards', options: [{ value: '3', labelKey: 'n3' }, { value: '4', labelKey: 'n4' }] }
  ],
  OK_MS: 4200, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._jar = {}; this._nudged = false;
    injectJuniperLanternCSS();
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
  _loc: function () { return JuniperLanternCore.locale(((this.api && this.api.lang) || 'en')); },
  _task: function () { return JuniperLanternCore.taskOf(this._setting('task')); },
  _n: function () { return JuniperLanternCore.nCards(this._setting('cards')); },
  _key: function () { return this._loc() + '/' + this._task() + '/' + this._n(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = JuniperLanternCore.rounds(this._loc()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = JuniperLanternCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._loc(), this._task(), this._n(), Math.random, fresh ? null : this._prev, pass);
      this._prev = P.order; this._order = P.order.slice(); this._slots = P.slots; this._perms = P.perms; this._orderForPool = pool; this._pass = pass;
      this._jar[this._key()] = 0;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'juniperlantern.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var st = this.st, line = this._t(st.retold ? (st.task === 'retell' ? 'tAfter' : 'tLesson') : 'tRetell'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._at = at || 0;
    this.st = JuniperLanternCore.newState(this._loc(), this._task(), this._n(), r, { slot: this._slots ? this._slots[r] : null, perm: this._perms ? this._perms[this._at] : null });
    this._view = { note: '', ok: '', roll: false };
    if (!this._nudged && this.st.task === 'lesson') { this._view.note = this._t('nudge'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged = true; this._view.note = ''; this._view.nudge = false; },

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
    var wrap = api.el('div', 'jl-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="jl-story"></div><div class="jl-row"><div class="jl-mid"></div><div class="jl-next"></div></div><div class="jl-tray"></div><div class="jl-foot"></div><p class="jl-note" aria-live="polite"></p><p class="jl-sr" aria-live="polite"></p>';
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
  _dims: function () {
    var W = this._width(), w = Math.min(W, 700), B = JuniperLanternCore.band(W);
    return { W: W, w: w, wide: B.wide, tiny: B.tiny, xs: W < 300, pic: B.wide ? 96 : 64 };
  },
  _img: function (pic, size) { return '<img src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _speak: function (text) { try { if (window.LCSAudio && window.LCSAudio.speak) window.LCSAudio.speak({ type: 'phrase', text: text, lang: this._loc(), rate: 0.85 }); } catch (e) {} },
  _sr: function (s) { var el = this._qs('.jl-sr'); if (el) el.textContent = s; },

  _paint_: function () {
    var C = JuniperLanternCore, st = this.st, D = this._dims(), v = this._view, self = this, F = st.F, L = st.light, help = C.help(st), oh = C.orderHelp(st);
    this._wrap.className = 'jl-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' task-' + st.task + (st.retold ? ' is-open' : ' is-shut') + (help ? ' is-help' : '');
    /* the story window: the sill pictures, then three panes (shuffled in Retell until put in order) */
    var story = this._qs('.jl-story'); story.innerHTML = '';
    var sill = document.createElement('div'); sill.className = 'jl-sill';
    F.pics.forEach(function (p) { var c = document.createElement('div'); c.className = 'jl-pic'; c.innerHTML = self._img(p, D.pic); c.style.width = c.style.height = (D.pic + 8) + 'px'; sill.appendChild(c); });
    if (D.wide) story.appendChild(sill);
    var frame = document.createElement('div'); frame.className = 'jl-frame' + (st.task === 'retell' && st.retold ? ' is-joined' : '');
    st.order.forEach(function (p, i) {
      var cls = 'jl-pane';
      if (L && L.panes[p]) cls += ' is-lit';
      if (L && p === 2 && L.ending === 'cold') cls += ' is-cold';
      if (help && p === 2) cls += ' is-ending';
      if (st.done) cls += ' is-lit';
      if (oh && p === 0) cls += ' is-first';
      if (st.misplaced === i && st.last === 'order') cls += ' is-wobble';
      var label = self._t('aPane', { i: i + 1, s: F.story[p] });
      var el;
      if (!st.retold) { el = self._btn(cls + (st.sel === i ? ' is-sel' : ''), 'pane-' + i, label, '<span>' + esc(F.story[p]) + '</span>'); el.addEventListener('click', function () { self._tapPane(i); }); }
      else { el = document.createElement('div'); el.className = cls; el.setAttribute('role', 'note'); el.setAttribute('aria-label', label); el.innerHTML = '<span>' + esc(F.story[p]) + '</span>'; }
      frame.appendChild(el);
    });
    story.appendChild(frame);
    /* the middle: Juniper, the lantern, the beam, the jar */
    var mid = this._qs('.jl-mid'); mid.innerHTML = '';
    if (D.wide) { var juni = document.createElement('div'); juni.className = 'jl-juniper' + (v.roll ? ' is-roll' : ''); juni.innerHTML = this._img('forest creatures/hedgehog', D.pic); juni.setAttribute('aria-hidden', 'true'); mid.appendChild(juni); }
    else if (!D.xs) F.pics.forEach(function (p) { var c = document.createElement('div'); c.className = 'jl-pic'; c.innerHTML = self._img(p, D.pic); c.style.width = c.style.height = (D.pic + 8) + 'px'; mid.appendChild(c); });
    var lit = st.lantern != null, held = lit ? st.cards[st.lantern].text : '';
    var lan = document.createElement('div'); lan.className = 'jl-lantern' + (lit ? ' is-lit' : '') + (st.retold ? '' : ' is-shut'); lan.setAttribute('role', 'img');
    lan.setAttribute('aria-label', lit ? this._t('aLantern', { t: held }) : this._t('aLanternEmpty'));
    var LH = D.wide ? 100 : D.xs ? 56 : 68, LW = Math.round(LH * 0.64);
    lan.innerHTML = '<svg viewBox="0 0 64 100" width="' + LW + '" height="' + LH + '" aria-hidden="true">' +
      '<path d="M22 6 h20 v6 h-20z" fill="#8C5E33"/><path d="M32 0 v6" stroke="#8C5E33" stroke-width="3"/>' +
      '<path d="M14 18 h36 l-4 -6 h-28z" fill="#B98552"/>' +
      '<rect x="14" y="18" width="36" height="62" rx="6" fill="' + (lit ? '#FFE9A8' : '#E9E2D2') + '" stroke="#8C5E33" stroke-width="4"/>' +
      '<rect class="jl-slot" x="22" y="14" width="20" height="5" rx="2" fill="' + (st.retold ? '#3B2A1A' : '#B98552') + '"/>' +
      (lit ? '<ellipse class="jl-flame" cx="32" cy="52" rx="8" ry="14" fill="#F2A53A"/><ellipse cx="32" cy="56" rx="4" ry="7" fill="#FFF4C7"/>' : '') +
      '<path d="M10 80 h44 v8 h-44z" fill="#8C5E33"/></svg>';
    mid.appendChild(lan);
    var n = this._jar[this._key()] || 0, jar = document.createElement('div'); jar.className = 'jl-jar'; jar.setAttribute('role', 'img'); jar.setAttribute('aria-label', this._t('aJar', { n: n }));
    jar.innerHTML = new Array(n + 1).join('<i class="jl-fly"></i>'); mid.appendChild(jar);
    /* the beam and the new story's window */
    var nx = this._qs('.jl-next'); nx.innerHTML = ''; nx.className = 'jl-next' + ((L && L.beam === 'reaches') || st.done ? ' is-open' : '') + (help ? ' is-bright' : '');
    var beam = document.createElement('div'); beam.className = 'jl-beam' + (L ? ' is-' + L.beam : '') + (st.done ? ' is-reaches' : ''); beam.setAttribute('aria-hidden', 'true'); beam.innerHTML = '<i></i>';
    nx.appendChild(beam);
    var pane = document.createElement('div'); pane.className = 'jl-npane' + (L && L.beam === 'stops' && L.ending === 'dark' ? ' is-glass' : ''); pane.setAttribute('role', 'note'); pane.setAttribute('aria-label', this._t('aNext', { s: F.next }));
    pane.innerHTML = '<span class="jl-npic">' + this._img(F.nextPic, D.pic) + '</span><span class="jl-ntext">' + esc(F.next) + '</span>';
    nx.appendChild(pane);
    /* the cards */
    var tray = this._qs('.jl-tray'); tray.innerHTML = ''; tray.className = 'jl-tray n-' + st.n;
    st.cards.forEach(function (c, i) {
      var b = self._btn('jl-card' + (st.lantern === i ? ' is-in' : ''), 'card-' + i, self._t('aCard', { t: c.text }), '<span>' + esc(c.text) + '</span>');
      b.disabled = st.done || !st.retold; b.addEventListener('click', function () { self._drop(i); }); tray.appendChild(b);
    });
    var foot = this._qs('.jl-foot'); foot.innerHTML = '';
    var chk = this._btn('jl-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    /* at the narrowest width the lantern and the jar stand beside Check */
    if (D.xs) { foot.insertBefore(lan, chk); foot.appendChild(jar); }
    var note = this._qs('.jl-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'jl-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'jl-note' + (v.nudge ? ' is-nudge' : v.latch ? ' is-ok' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'jl-note'; }
  },

  /* ---------------- the hand ---------------- */
  _tapPane: function (i) { var r = JuniperLanternCore.tapPane(this.st, i); if (r === 'no') return; this.api.sound(r === 'swapped' ? 560 : 420); if (r === 'swapped') this._clearHelp(); this._view.latch = false; this._paint(); },
  _drop: function (i) { var r = JuniperLanternCore.drop(this.st, i); if (r === 'no') return; this.api.sound(r === 'in' ? 520 : 300); this._clearHelp(); this._view.latch = false; this._paint(); },

  /* ---------------- Check: the light ---------------- */
  _check: function () {
    var C = JuniperLanternCore, st = this.st, v = this._view;
    if (st.done) return;
    this._nudged = true;
    var a = C.check(st);
    if (a.result === 'ok') { this._success(); return; }
    if (a.result === 'latch') { v.note = this._t('okRetell'); v.latch = true; v.nudge = false; this.api.sound(760); this._setPrompt(); this._paint(); this.api.announce(v.note + ' ' + this._t('tAfter')); return; }
    var h = C.hint(st); v.nudge = false; v.latch = false; v.note = this._t(h.key, h.args);
    if (a.result === 'tray') { this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    this.api.sound(180);
    if (a.kind !== 'order') this._sr(this._t({ detail: 'srDetail', wrong: 'srWrong', other: 'srOther' }[a.kind]));
    this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var st = this.st, v = this._view;
    v.ok = (st.task === 'retell' ? this._t('okRetell') + ' ' : '') + this._t('okLesson', { moral: st.F.m });
    v.roll = !this.FAST; v.latch = false;
    this._jar[this._key()] = (this._jar[this._key()] || 0) + 1;
    this.api.sound(988); this._sr(this._t('srMoral')); this._paint(); this.api.announce(v.ok);
    this._speak(st.F.m);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectJuniperLanternCSS() {
  if (typeof document === 'undefined' || document.getElementById('jl-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', WARM = '#FFE9A8', GOLD = '#F2A53A', COLD = '#CFE3F4';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.jl-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .jl-wrap:focus{outline:none;}'
  /* the story window */
  + '.jl-story{width:100%;display:flex;flex-direction:column;align-items:center;gap:6px;padding:10px 10px 12px;box-sizing:border-box;border-radius:16px;background:#3E4A6B;box-shadow:inset 0 -5px 0 #2E3753;}'
  + '.jl-sill{display:flex;gap:10px;justify-content:center;} .jl-pic{display:flex;align-items:center;justify-content:center;border-radius:12px;background:#F5EEDC;} .jl-pic img,.jl-juniper img,.jl-npic img{display:block;object-fit:contain;pointer-events:none;}'
  + '.jl-frame{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;padding:8px;box-sizing:border-box;border-radius:10px;background:#8C5E33;box-shadow:inset 0 0 0 3px #6E4825;}'
  + '.jl-wrap.is-narrow .jl-frame{grid-template-columns:1fr;gap:6px;padding:6px;}'
  + '.jl-pane{display:flex;align-items:center;justify-content:center;min-height:96px;padding:8px 10px;box-sizing:border-box;border:0;border-radius:6px;background:#2B3352;font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.35;color:#DCE2F2;text-align:center;transition:background .3s,color .3s;}'
  + '.jl-wrap.is-narrow .jl-pane{min-height:54px;font-size:17px;padding:6px 10px;} .jl-wrap.is-tiny .jl-pane{font-size:16px;}'
  + 'button.jl-pane{cursor:pointer;box-shadow:inset 0 0 0 2px #56628A;} button.jl-pane.is-sel{box-shadow:inset 0 0 0 4px ' + GOLD + ';}'
  + '.jl-pane.is-lit{background:' + WARM + ';color:' + INK + ';} .jl-pane.is-cold{background:' + COLD + ';color:#2B4560;box-shadow:inset 0 0 0 3px #7FA6CC;}'
  + '.jl-wrap.is-help .jl-pane.is-ending{background:#FFF2C9;color:' + INK + ';box-shadow:inset 0 -4px 0 ' + GOLD + ';}'
  + '.jl-pane.is-first{box-shadow:inset 0 0 0 4px ' + GOLD + ',0 0 14px rgba(242,165,58,.6);} .jl-pane.is-wobble{animation:jlWob .5s ease-in-out;} .jl-wrap.is-fast .jl-pane{animation:none;transition:none;}'
  + '@keyframes jlWob{0%,100%{transform:none;}25%{transform:rotate(-2deg);}75%{transform:rotate(2deg);}}'
  + '.jl-frame.is-joined{gap:2px;}'
  /* the middle row */
  + '.jl-wrap.is-narrow .jl-row{display:contents;} .jl-wrap.is-narrow .jl-story{order:1;} .jl-wrap.is-narrow .jl-mid{order:2;} .jl-wrap.is-narrow .jl-tray{order:3;} .jl-wrap.is-narrow .jl-foot{order:4;} .jl-wrap.is-narrow .jl-note{order:5;} .jl-wrap.is-narrow .jl-next{order:6;}'
  + '.jl-row{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;} .jl-wrap.is-wide .jl-row{flex-direction:row;align-items:center;gap:14px;}'
  + '.jl-mid{display:flex;align-items:flex-end;justify-content:center;gap:12px;} .jl-wrap.is-wide .jl-mid{flex:none;} .jl-wrap.is-wide .jl-next{flex:1;min-width:0;}'
  + '.jl-juniper{transition:transform .8s ease;} .jl-juniper.is-roll{transform:translateX(16px) rotate(10deg);}'
  + '.jl-lantern{position:relative;display:flex;flex-direction:column;align-items:center;} .jl-lantern.is-lit svg{filter:drop-shadow(0 0 12px rgba(242,165,58,.75));}'
  + '.jl-jar{display:flex;flex-wrap:wrap-reverse;align-content:flex-start;gap:3px;width:52px;min-height:62px;padding:6px;box-sizing:border-box;border-radius:8px 8px 14px 14px;background:rgba(220,235,245,.5);box-shadow:inset 0 0 0 3px #A9BED0,0 -4px 0 #8C5E33;}'
  + '.jl-fly{display:block;width:9px;height:9px;border-radius:50%;background:#FFE36B;box-shadow:0 0 6px #FFD23F;}'
  /* the beam and the next story */
  + '.jl-next{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:6px;}'
  + '.jl-beam{position:relative;width:100%;height:10px;} .jl-beam i{position:absolute;left:0;top:3px;height:4px;width:0;border-radius:2px;background:repeating-linear-gradient(90deg,' + GOLD + ' 0 6px,transparent 6px 12px);transition:width .6s ease;}'
  + '.jl-beam.is-reaches i{width:100%;} .jl-beam.is-half i{width:45%;} .jl-beam.is-stops i{width:12%;} .jl-wrap.is-fast .jl-beam i{transition:none;}'
  + '.jl-npane{display:flex;align-items:center;gap:10px;width:100%;padding:8px 12px;box-sizing:border-box;border-radius:12px;background:#2B3352;opacity:.82;transition:opacity .4s,background .4s;}'
  + '.jl-next.is-bright .jl-npane{opacity:1;} .jl-next.is-open .jl-npane{opacity:1;background:' + WARM + ';} .jl-npane.is-glass{box-shadow:inset 0 0 0 3px #7FA6CC;}'
  + '.jl-ntext{font-family:' + B + ';font-weight:700;font-size:18px;line-height:1.35;color:#DCE2F2;} .jl-next.is-open .jl-ntext{color:' + INK + ';} .jl-wrap.is-narrow .jl-ntext{font-size:17px;} .jl-wrap.is-tiny .jl-ntext{font-size:16px;}'
  + '.jl-npic{flex:none;display:flex;border-radius:10px;background:#F5EEDC;padding:3px;}'
  /* the cards */
  + '.jl-tray{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;width:100%;} .jl-tray.n-4{grid-template-columns:repeat(2,1fr);} .jl-wrap.is-narrow .jl-tray{grid-template-columns:1fr 1fr;gap:6px;}'
  + '.jl-card{min-height:64px;padding:6px 12px;border:0;border-radius:12px;background:#FFF8EC;box-shadow:0 3px 0 #E3CFA8,inset 0 0 0 2px #E8DCC2;font-family:' + B + ';font-weight:800;font-size:17px;line-height:1.25;color:' + INK + ';text-align:center;cursor:pointer;}'
  + '.jl-card.is-in{background:' + WARM + ';box-shadow:0 0 0 4px ' + GOLD + ';} .jl-card:disabled{cursor:default;opacity:.55;} .jl-wrap.is-done .jl-card:disabled{opacity:.8;}'
  + '.jl-wrap.is-narrow .jl-card{min-height:50px;font-size:15px;padding:4px 8px;} .jl-wrap.is-tiny .jl-card{min-height:46px;font-size:15px;}'
  + '.jl-foot{display:flex;justify-content:center;width:100%;}'
  + '.jl-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .jl-check:disabled{opacity:.5;cursor:default;}'
  + '.jl-note{margin:0;min-height:1.3em;max-width:600px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .jl-note.is-hint{color:#8A3B1F;} .jl-note.is-nudge{color:#5E6770;} .jl-wrap.is-narrow .jl-note{font-size:17px;}'
  + '.jl-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  + '.jl-wrap.is-tiny .jl-check{min-width:112px;min-height:50px;padding:6px 14px;font-size:20px;} .jl-wrap.is-tiny{gap:7px;}'
  /* the 320 phone: the lantern beside Check, tighter panes and cards */
  + '.jl-wrap.is-xs .jl-mid{display:none;} .jl-wrap.is-xs .jl-foot{align-items:center;gap:12px;} .jl-wrap.is-xs .jl-story{padding:5px;} .jl-wrap.is-xs .jl-frame{padding:4px;gap:4px;}'
  + '.jl-wrap.is-xs .jl-pane{min-height:0;padding:5px 8px;font-size:15px;line-height:1.25;} .jl-wrap.is-xs button.jl-pane{min-height:44px;} .jl-wrap.is-xs .jl-tray.n-3{grid-template-columns:1fr;} .jl-wrap.is-xs .jl-card{min-height:44px;padding:3px 8px;line-height:1.2;} .jl-wrap.is-xs .jl-jar{min-height:52px;}'
  + '.jl-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'jl-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.JuniperLanternActivity = JuniperLanternActivity;
