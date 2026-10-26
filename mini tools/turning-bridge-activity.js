/* =====================================================================
   turning-bridge-activity.js — ACTIVITY #126 of the one-by-one rebuild:
   "Hazel's Word Bridge" → THE TURNING BRIDGE (L.1.1.g; all 11 locales).
   Model: turning-bridge-core.js (TurningBridgeCore).
   Design: docs/activities-rebuild/designs/126-hazel-word-bridge.md
   ---------------------------------------------------------------------
   Two banks with a river between them: the first half of a sentence on
   the left signboard, the second half on the right (each with its library
   picture), and a gap where a bridge should be. On the rack lie wooden
   planks with their own shapes: AND straight, BUT with a turn, OR forked,
   and ONE arrow plank with "because" on one face and "so" on the other —
   its arrow always runs from the reason to what happened. Tap a plank
   onto the bridge; tap the round turner to flip the arrow plank; tap the
   swap knob and the halves change banks — the arrow plank turns over by
   itself. Check (or the little car, any time) drives the bridge the
   plank's way: straight across, round the turn, into the fork, or along
   the arrow from the reason's bank. No timer, no score.
   Test seams: window.TurningBridgeActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._lay / ._flip / ._swap /
   ._check / .FAST / .OK_MS.
   ===================================================================== */
var TurningBridgeActivity = {
  id: 'turning-bridge',
  /* the drawn apparatus (the hierarchy gate): the river, the banks, the planks, the car's road */
  apparatusClasses: ['tb-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Hazel's Word Bridge",de:"Hazels Wortbrücke",fr:"Le pont de mots de Hazel",es:"El puente de palabras de Hazel",pt:"A Ponte de Palavras da Hazel",it:"Il ponte di parole di Hazel",nl:"Hazels woordbrug",sv:"Hazels ordbro",da:"Hazels ordbro",no:"Hazels ordbru",fi:"Hazelin sanasilta"},
    instruction: {en:"Lay the plank that joins the two parts so they make sense.",de:"Leg das Brett, das die beiden Teile sinnvoll verbindet.",fr:"Pose la planche qui relie les deux parties pour que la phrase ait du sens.",es:"Pon la tabla que une las dos partes para que tengan sentido.",pt:"Coloque a tábua que liga as duas partes para a frase fazer sentido.",it:"Metti l’asse che unisce le due parti in modo che abbiano senso.",nl:"Leg de plank die de twee delen goed verbindt.",sv:"Lägg plankan som binder ihop de två delarna så att det blir rätt.",da:"Læg den planke, der binder de to dele sammen, så det giver mening.",no:"Legg planken som binder sammen de to delene så det gir mening.",fi:"Laita lankku, joka yhdistää kaksi osaa niin, että lause on järkevä."},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Which plank makes the two parts make sense?",de:"Welches Brett verbindet die beiden Teile richtig?",fr:"Quelle planche relie bien les deux parties ?",es:"¿Qué tabla une bien las dos partes?",pt:"Qual tábua liga bem as duas partes?",it:"Quale asse unisce bene le due parti?",nl:"Welke plank verbindet de twee delen goed?",sv:"Vilken planka binder ihop delarna rätt?",da:"Hvilken planke binder delene rigtigt sammen?",no:"Hvilken planke binder delene riktig sammen?",fi:"Mikä lankku yhdistää osat oikein?"},
    t2: {en:"Because or so? Lay the arrow plank and turn it the right way.",de:"Denn oder deshalb? Leg das Pfeilbrett und dreh es richtig herum.",fr:"Parce que ou alors ? Pose la planche-flèche et tourne-la du bon côté.",es:"¿Porque o así que? Pon la tabla con flecha y voltéala del lado correcto.",pt:"Porque ou então? Coloque a tábua com seta e vire do lado certo.",it:"Perché o quindi? Metti l’asse con la freccia e girala dal lato giusto.",nl:"Want of dus? Leg de pijlplank en draai hem de goede kant op.",sv:"För eller så? Lägg pilplankan och vänd den rätt.",da:"For eller så? Læg pileplanken og vend den rigtigt.",no:"For eller så? Legg pilplanken og snu den riktig vei.",fi:"Koska vai joten? Laita nuolilankku ja käännä se oikein päin."},
    t3: {en:"Which plank makes the two parts make sense?",de:"Welches Brett verbindet die beiden Teile richtig?",fr:"Quelle planche relie bien les deux parties ?",es:"¿Qué tabla une bien las dos partes?",pt:"Qual tábua liga bem as duas partes?",it:"Quale asse unisce bene le due parti?",nl:"Welke plank verbindet de twee delen goed?",sv:"Vilken planka binder ihop delarna rätt?",da:"Hvilken planke binder delene rigtigt sammen?",no:"Hvilken planke binder delene riktig sammen?",fi:"Mikä lankku yhdistää osat oikein?"},
    t4: {en:"Say it the other way round.",de:"Sag es andersherum.",fr:"Dis-le dans l’autre sens.",es:"Dilo al revés.",pt:"Diga ao contrário.",it:"Dillo al contrario.",nl:"Zeg het andersom.",sv:"Säg det åt andra hållet.",da:"Sig det den anden vej rundt.",no:"Si det andre veien.",fi:"Sano se toisin päin."},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    setLevel: {en:"Joining words",de:"Bindewörter",fr:"Mots de liaison",es:"Palabras que unen",pt:"Palavras que ligam",it:"Congiunzioni",nl:"Verbindingswoorden",sv:"Bindeord",da:"Bindeord",no:"Bindeord",fi:"Sidesanat"},
    l1: {en:"And · but · or",de:"Und · aber · oder",fr:"Et · mais · ou",es:"Y · pero · o",pt:"E · mas · ou",it:"E · ma · o",nl:"En · maar · of",sv:"Och · men · eller",da:"Og · men · eller",no:"Og · men · eller",fi:"Ja · mutta · vai"},
    l2: {en:"Because · so",de:"Denn · deshalb",fr:"Parce que · alors",es:"Porque · así que",pt:"Porque · então",it:"Perché · quindi",nl:"Want · dus",sv:"För · så",da:"For · så",no:"For · så",fi:"Koska · joten"},
    l3: {en:"All five",de:"Alle fünf",fr:"Les cinq",es:"Las cinco",pt:"As cinco",it:"Tutte e cinque",nl:"Alle vijf",sv:"Alla fem",da:"Alle fem",no:"Alle fem",fi:"Kaikki viisi"},
    l4: {en:"Turn it round",de:"Andersherum",fr:"Dans l’autre sens",es:"Al revés",pt:"Ao contrário",it:"Al contrario",nl:"Andersom",sv:"Åt andra hållet",da:"Den anden vej rundt",no:"Andre veien",fi:"Toisin päin"},
    setPics: {en:"Pictures",de:"Bilder",fr:"Images",es:"Dibujos",pt:"Imagens",it:"Immagini",nl:"Plaatjes",sv:"Bilder",da:"Billeder",no:"Bilder",fi:"Kuvat"},
    picsShow: {en:"Show pictures",de:"Bilder zeigen",fr:"Montrer les images",es:"Mostrar dibujos",pt:"Mostrar imagens",it:"Mostra le immagini",nl:"Plaatjes tonen",sv:"Visa bilder",da:"Vis billeder",no:"Vis bilder",fi:"Näytä kuvat"},
    picsWords: {en:"Words only",de:"Nur Wörter",fr:"Seulement les mots",es:"Solo palabras",pt:"Só palavras",it:"Solo parole",nl:"Alleen woorden",sv:"Bara ord",da:"Kun ord",no:"Bare ord",fi:"Vain sanat"},
    hintEmpty: {en:"Lay a plank across the river. How do the two parts go together?",de:"Leg ein Brett über den Fluss. Wie gehören die beiden Teile zusammen?",fr:"Pose une planche sur la rivière. Comment les deux parties vont-elles ensemble ?",es:"Pon una tabla sobre el río. ¿Cómo van juntas las dos partes?",pt:"Coloque uma tábua sobre o rio. Como as duas partes combinam?",it:"Metti un’asse sul fiume. Come stanno insieme le due parti?",nl:"Leg een plank over de rivier. Hoe horen de twee delen bij elkaar?",sv:"Lägg en planka över ån. Hur hör de två delarna ihop?",da:"Læg en planke over åen. Hvordan hører de to dele sammen?",no:"Legg en planke over elva. Hvordan henger de to delene sammen?",fi:"Laita lankku joen yli. Miten osat kuuluvat yhteen?"},
    missAnd: {en:"Can both parts be true together? Read it again.",de:"Kann beides zugleich stimmen? Lies noch einmal.",fr:"Les deux parties peuvent-elles être vraies ensemble ? Relis.",es:"¿Pueden ser ciertas las dos partes a la vez? Léelo otra vez.",pt:"As duas partes podem ser verdade juntas? Leia de novo.",it:"Possono essere vere tutte e due insieme? Rileggi.",nl:"Kunnen beide delen tegelijk waar zijn? Lees het nog eens.",sv:"Kan båda delarna stämma samtidigt? Läs igen.",da:"Kan begge dele passe på én gang? Læs igen.",no:"Kan begge delene stemme samtidig? Les igjen.",fi:"Voivatko molemmat osat olla totta yhtä aikaa? Lue uudestaan."},
    missBut: {en:"Is the second part a surprise? Or does it just add more?",de:"Ist der zweite Teil eine Überraschung? Oder kommt nur etwas dazu?",fr:"La deuxième partie est-elle une surprise ? Ou ajoute-t-elle seulement quelque chose ?",es:"¿La segunda parte es una sorpresa? ¿O solo agrega algo más?",pt:"A segunda parte é uma surpresa? Ou só acrescenta algo?",it:"La seconda parte è una sorpresa? O aggiunge solo qualcosa?",nl:"Is het tweede deel een verrassing? Of komt er alleen iets bij?",sv:"Är den andra delen en överraskning? Eller kommer det bara mer?",da:"Er den anden del en overraskelse? Eller kommer der bare mere til?",no:"Er den andre delen en overraskelse? Eller kommer det bare mer?",fi:"Onko toinen osa yllätys? Vai tuleeko vain lisää?"},
    missOr: {en:"Is this a choice, one or the other?",de:"Ist das eine Wahl, das eine oder das andere?",fr:"Est-ce un choix, l’un ou l’autre ?",es:"¿Es una elección, una cosa o la otra?",pt:"É uma escolha, uma coisa ou a outra?",it:"È una scelta, una cosa o l’altra?",nl:"Is dit een keuze, het een of het ander?",sv:"Är det ett val, det ena eller det andra?",da:"Er det et valg, det ene eller det andet?",no:"Er dette et valg, det ene eller det andre?",fi:"Pitääkö valita toinen kahdesta?"},
    missArrow: {en:"Does one part make the other happen?",de:"Sorgt der eine Teil dafür, dass der andere passiert?",fr:"Est-ce qu’une partie fait arriver l’autre ?",es:"¿Una parte hace que pase la otra?",pt:"Uma parte faz a outra acontecer?",it:"Una parte fa succedere l’altra?",nl:"Zorgt het ene deel ervoor dat het andere gebeurt?",sv:"Gör den ena delen att den andra händer?",da:"Får den ene del den anden til at ske?",no:"Gjør den ene delen at den andre skjer?",fi:"Saako toinen osa toisen tapahtumaan?"},
    missFace: {en:"Which is the reason, and which is what happened? The arrow runs from the reason. Turn the plank.",de:"Was ist der Grund, und was ist passiert? Der Pfeil zeigt vom Grund weg. Dreh das Brett um.",fr:"Quelle est la cause, et qu’est-ce qui s’est passé ? La flèche part de la cause. Retourne la planche.",es:"¿Cuál es la razón y qué es lo que pasó? La flecha sale de la razón. Voltea la tabla.",pt:"Qual é o motivo, e o que aconteceu? A seta sai do motivo. Vire a tábua.",it:"Qual è il motivo, e che cosa è successo? La freccia parte dal motivo. Gira l’asse.",nl:"Wat is de reden, en wat is er gebeurd? De pijl wijst vanaf de reden. Draai de plank om.",sv:"Vad är orsaken, och vad hände? Pilen går från orsaken. Vänd plankan.",da:"Hvad er grunden, og hvad skete der? Pilen går fra grunden. Vend planken.",no:"Hva er grunnen, og hva skjedde? Pilen går fra grunnen. Snu planken.",fi:"Kumpi on syy ja kumpi se, mitä tapahtui? Nuoli lähtee syystä. Käännä lankku."},
    missSwap: {en:"Say it the other way round: swap the two parts.",de:"Sag es andersherum: Tausch die beiden Teile.",fr:"Dis-le dans l’autre sens : échange les deux parties.",es:"Dilo al revés: cambia de lugar las dos partes.",pt:"Diga ao contrário: troque as duas partes de lugar.",it:"Dillo al contrario: scambia le due parti.",nl:"Zeg het andersom: wissel de twee delen.",sv:"Säg det åt andra hållet: byt plats på delarna.",da:"Sig det den anden vej rundt: byt om på de to dele.",no:"Si det andre veien: bytt plass på de to delene.",fi:"Sano se toisin päin: vaihda osien paikat."},
    missGlow: {en:"Try the plank that is glowing.",de:"Probier das Brett, das leuchtet.",fr:"Essaie la planche qui brille.",es:"Prueba la tabla que brilla.",pt:"Experimente a tábua que brilha.",it:"Prova l’asse che brilla.",nl:"Probeer de plank die oplicht.",sv:"Prova plankan som lyser.",da:"Prøv planken, der lyser.",no:"Prøv planken som lyser.",fi:"Kokeile hohtavaa lankkua."},
    missGlowSwap: {en:"Tap the glowing knob to swap the two parts.",de:"Tipp auf den leuchtenden Knopf und tausch die Teile.",fr:"Touche le bouton qui brille pour échanger les deux parties.",es:"Toca el botón que brilla para cambiar las partes.",pt:"Toque no botão que brilha para trocar as partes.",it:"Tocca il pulsante che brilla per scambiare le parti.",nl:"Tik op de knop die oplicht om de delen te wisselen.",sv:"Tryck på knappen som lyser och byt plats på delarna.",da:"Tryk på knappen, der lyser, og byt om på delene.",no:"Trykk på knappen som lyser, og bytt plass på delene.",fi:"Napauta hohtavaa nuppia ja vaihda osien paikat."},
    missGlowFlip: {en:"Turn the plank over with the glowing button.",de:"Dreh das Brett mit dem leuchtenden Knopf um.",fr:"Retourne la planche avec le bouton qui brille.",es:"Voltea la tabla con el botón que brilla.",pt:"Vire a tábua com o botão que brilha.",it:"Gira l’asse con il pulsante che brilla.",nl:"Draai de plank om met de knop die oplicht.",sv:"Vänd plankan med knappen som lyser.",da:"Vend planken med knappen, der lyser.",no:"Snu planken med knappen som lyser.",fi:"Käännä lankku hohtavalla napilla."},
    okAnd: {en:"{s} — both of them!",de:"{s} – alle beide!",fr:"{s} : tous les deux !",es:"{s}: ¡los dos!",pt:"{s}: os dois!",it:"{s}: tutti e due!",nl:"{s} – allebei!",sv:"{s} – båda två!",da:"{s} – begge to!",no:"{s} – begge to!",fi:"{s} – molemmat!"},
    okBut: {en:"{s} — the sentence takes a turn!",de:"{s} – der Satz macht eine Kurve!",fr:"{s} : la phrase prend un virage !",es:"{s}: ¡la oración da una vuelta!",pt:"{s}: a frase faz uma curva!",it:"{s}: la frase fa una curva!",nl:"{s} – de zin maakt een bocht!",sv:"{s} – meningen tar en sväng!",da:"{s} – sætningen slår et sving!",no:"{s} – setningen tar en sving!",fi:"{s} – lause tekee mutkan!"},
    okOr: {en:"{s} — just one of them!",de:"{s} – nur eins von beiden!",fr:"{s} : seulement l’un des deux !",es:"{s}: ¡solo una de las dos!",pt:"{s}: só uma das duas!",it:"{s}: solo una delle due!",nl:"{s} – maar één van de twee!",sv:"{s} – bara det ena!",da:"{s} – kun det ene!",no:"{s} – bare det ene!",fi:"{s} – vain toinen!"},
    okBecause: {en:"{s} — the second part is the reason!",de:"{s} – der zweite Teil ist der Grund!",fr:"{s} : la deuxième partie est la cause !",es:"{s}: ¡la segunda parte es la razón!",pt:"{s}: a segunda parte é o motivo!",it:"{s}: la seconda parte è il motivo!",nl:"{s} – het tweede deel is de reden!",sv:"{s} – den andra delen är orsaken!",da:"{s} – den anden del er grunden!",no:"{s} – den andre delen er grunnen!",fi:"{s} – toinen osa on syy!"},
    okSo: {en:"{s} — the second part is what happened!",de:"{s} – der zweite Teil ist, was passiert ist!",fr:"{s} : la deuxième partie, c’est ce qui est arrivé !",es:"{s}: ¡la segunda parte es lo que pasó!",pt:"{s}: a segunda parte é o que aconteceu!",it:"{s}: la seconda parte è quello che è successo!",nl:"{s} – het tweede deel is wat er gebeurde!",sv:"{s} – den andra delen är det som hände!",da:"{s} – den anden del er det, der skete!",no:"{s} – den andre delen er det som skjedde!",fi:"{s} – toinen osa on se, mitä tapahtui!"},
    okTurn: {en:"{s} — the same, the other way round!",de:"{s} – dasselbe, nur andersherum!",fr:"{s} : la même chose, dans l’autre sens !",es:"{s}: ¡lo mismo, pero al revés!",pt:"{s}: a mesma coisa, ao contrário!",it:"{s}: la stessa cosa, al contrario!",nl:"{s} – hetzelfde, maar andersom!",sv:"{s} – samma sak, åt andra hållet!",da:"{s} – det samme, den anden vej rundt!",no:"{s} – det samme, andre veien!",fi:"{s} – sama asia toisin päin!"},
    okSwapAnd: {en:"{s} — the same both ways round!",de:"{s} – in beiden Richtungen dasselbe!",fr:"{s} : pareil dans les deux sens !",es:"{s}: ¡igual en los dos sentidos!",pt:"{s}: igual nos dois sentidos!",it:"{s}: uguale in tutti e due i sensi!",nl:"{s} – in beide richtingen hetzelfde!",sv:"{s} – samma sak åt båda hållen!",da:"{s} – det samme begge veje!",no:"{s} – det samme begge veier!",fi:"{s} – sama asia kumminkin päin!"},
    aFirst: {en:"First part: {s}",de:"Erster Teil: {s}",fr:"Première partie : {s}",es:"Primera parte: {s}",pt:"Primeira parte: {s}",it:"Prima parte: {s}",nl:"Eerste deel: {s}",sv:"Första delen: {s}",da:"Første del: {s}",no:"Første del: {s}",fi:"Ensimmäinen osa: {s}"},
    aSecond: {en:"Second part: {s}",de:"Zweiter Teil: {s}",fr:"Deuxième partie : {s}",es:"Segunda parte: {s}",pt:"Segunda parte: {s}",it:"Seconda parte: {s}",nl:"Tweede deel: {s}",sv:"Andra delen: {s}",da:"Anden del: {s}",no:"Andre del: {s}",fi:"Toinen osa: {s}"},
    aPlank: {en:"Plank: {w}",de:"Brett: {w}",fr:"Planche : {w}",es:"Tabla: {w}",pt:"Tábua: {w}",it:"Asse: {w}",nl:"Plank: {w}",sv:"Planka: {w}",da:"Planke: {w}",no:"Planke: {w}",fi:"Lankku: {w}"},
    aFlip: {en:"Turn the arrow plank over",de:"Das Pfeilbrett umdrehen",fr:"Retourner la planche-flèche",es:"Voltear la tabla con flecha",pt:"Virar a tábua com seta",it:"Girare l’asse con la freccia",nl:"De pijlplank omdraaien",sv:"Vänd pilplankan",da:"Vend pileplanken",no:"Snu pilplanken",fi:"Käännä nuolilankku"},
    aSwap: {en:"Swap the two parts",de:"Die beiden Teile tauschen",fr:"Échanger les deux parties",es:"Cambiar de lugar las dos partes",pt:"Trocar as duas partes",it:"Scambiare le due parti",nl:"De twee delen wisselen",sv:"Byt plats på delarna",da:"Byt om på de to dele",no:"Bytt plass på delene",fi:"Vaihda osien paikat"},
    aCar: {en:"Send the car across",de:"Das Auto hinüberfahren lassen",fr:"Faire traverser la voiture",es:"Mandar el carrito al otro lado",pt:"Mandar o carrinho para o outro lado",it:"Far attraversare la macchinina",nl:"Laat het autootje oversteken",sv:"Låt bilen köra över",da:"Lad bilen køre over",no:"La bilen kjøre over",fi:"Lähetä auto yli"},
    aSentence: {en:"Sentence: {s}",de:"Satz: {s}",fr:"Phrase : {s}",es:"Oración: {s}",pt:"Frase: {s}",it:"Frase: {s}",nl:"Zin: {s}",sv:"Mening: {s}",da:"Sætning: {s}",no:"Setning: {s}",fi:"Lause: {s}"},
    srTurned: {en:"The plank turned over: {a} became {b}.",de:"Das Brett hat sich umgedreht: Aus „{a}“ wurde „{b}“.",fr:"La planche s’est retournée : « {a} » est devenu « {b} ».",es:"La tabla se volteó: «{a}» se volvió «{b}».",pt:"A tábua virou: “{a}” se transformou em “{b}”.",it:"L’asse si è girata: «{a}» è diventato «{b}».",nl:"De plank draaide om: ‘{a}’ werd ‘{b}’.",sv:"Plankan vände sig: ”{a}” blev ”{b}”.",da:"Planken vendte sig: ”{a}” blev til ”{b}”.",no:"Planken snudde seg: «{a}» ble til «{b}».",fi:"Lankku kääntyi: ”{a}” muuttui sanaksi ”{b}”."},
  },/*STRINGS-END*/

  defaults: { level: '1', pics: 'show' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }] },
    { key: 'pics', type: 'choice', labelKey: 'setPics', options: [{ value: 'show', labelKey: 'picsShow' }, { value: 'words', labelKey: 'picsWords' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {};
    this._timers = []; this._ro = null; this._view = {}; this._span = []; this._fresh = null;
    injectTurningBridgeCSS();
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
  _loc: function () { return TurningBridgeCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return TurningBridgeCore.levelOf(this._setting('level')); },
  _pics: function () { return this._setting('pics') !== 'words'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TurningBridgeCore.rounds(); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {}; this._span = []; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TurningBridgeCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._trays = P.trays; this._orderForPool = pool; if (pass > this._pass) this._span = []; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'turningbridge.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._fresh = null;
    this.st = TurningBridgeCore.newState(this._loc(), this._level(), r, this._trays && this._trays[r]);
    this._view = { note: '', ok: '', drive: null, flipped: false, swapped: false };
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
    var wrap = api.el('div', 'tb-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="tb-main"></div><div class="tb-foot"></div><p class="tb-note" aria-live="polite"></p><p class="tb-sr" aria-live="polite"></p>';
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
  _dims: function () { var W = this._width(), B = TurningBridgeCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? 104 : B.tiny ? 64 : 72 }; },
  _img: function (key, size, cls) { var p = TurningBridgeCore.DATA.PICS[key]; return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + p + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.tb-sr'); if (el) el.textContent = s; },
  /* a plank's shape (the plank IS its meaning): straight · a turn · a fork · an arrow */
  _shape: function (p, face) {
    var W = '#C8955E', D = '#8C6239';
    if (p === 'and') return '<svg class="tb-shape tb-art" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="8" width="116" height="24" rx="5" fill="' + W + '" stroke="' + D + '" stroke-width="3"/><circle cx="12" cy="20" r="3" fill="' + D + '"/><circle cx="108" cy="20" r="3" fill="' + D + '"/></svg>';
    if (p === 'but') return '<svg class="tb-shape tb-art" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true"><path d="M2 6 H56 L70 20 L56 34 H2 Z" fill="' + W + '" stroke="' + D + '" stroke-width="3" stroke-linejoin="round"/><path d="M64 20 L78 6 H118 V34 H78 Z" fill="' + W + '" stroke="' + D + '" stroke-width="3" stroke-linejoin="round"/></svg>';
    if (p === 'or') return '<svg class="tb-shape tb-art" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true"><path d="M2 12 H60 L104 2 L118 4 L118 14 L66 20 L118 26 L118 36 L104 38 L60 28 H2 Z" fill="' + W + '" stroke="' + D + '" stroke-width="3" stroke-linejoin="round"/></svg>';
    /* the arrow: the because-face points back to the first half (the reason comes second), the so-face forward */
    var back = face === 'because';
    return '<svg class="tb-shape tb-art" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true"><rect x="2" y="8" width="116" height="24" rx="5" fill="' + (back ? '#E8B07A' : '#D9A066') + '" stroke="' + D + '" stroke-width="3"/>' +
      (back ? '<path d="M112 20 H16 M26 12 L14 20 L26 28" fill="none" stroke="#7A3E1E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>'
            : '<path d="M8 20 H104 M94 12 L106 20 L94 28" fill="none" stroke="#7A3E1E" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>') + '</svg>';
  },
  _plankHtml: function (p, face) { return this._shape(p, face) + '<b>' + esc(TurningBridgeCore.word(this._loc(), p, face)) + '</b>'; },

  _paint_: function () {
    var C = TurningBridgeCore, st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, glow = C.glow(st), pics = this._pics();
    this._wrap.className = 'tb-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' k-' + rd.kind + (pics ? '' : ' no-pics');
    var main = this._qs('.tb-main'); main.innerHTML = '';
    /* the long bridge: one plank per solved round this pass */
    var span = this._el('div', 'tb-span tb-art'); span.setAttribute('aria-hidden', 'true');
    this._span.forEach(function (p) { span.insertAdjacentHTML('beforeend', '<i class="tb-seg s-' + p + '"></i>'); });
    main.appendChild(span);
    /* the scene: left bank · river with the bridge · right bank */
    var A = st.order === 'ba' ? rd.b : rd.a, B = st.order === 'ba' ? rd.a : rd.b, P = C.parts(rd, st.order, st.gap, st.face);
    var scene = this._el('div', 'tb-scene' + (v.swapped ? ' is-swapped' : ''));
    var bank = function (side, half, text) {
      var bx = self._el('div', 'tb-bank b-' + side + (v.drive && v.drive.fade === side ? ' is-fade' : '') + (v.drive && v.drive.pop === side ? ' is-pop' : ''));
      if (pics && half.p) bx.insertAdjacentHTML('beforeend', self._img(half.p, D.pic, 'tb-pic'));
      var sign = self._el('p', 'tb-sign', esc(text)); sign.setAttribute('aria-label', self._t(side === 'l' ? 'aFirst' : 'aSecond', { s: text }));
      bx.appendChild(sign); return bx;
    };
    scene.appendChild(bank('l', A, P.first));
    var river = this._el('div', 'tb-river tb-art');
    if (rd.swappable) {
      var sw = this._btn('tb-swap' + (glow && rd.kind === 'swap' && st.order === 'ab' ? ' is-glow' : ''), 'swap', this._t('aSwap'), '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M4 8h14m-4-4 4 4-4 4M20 16H6m4-4-4 4 4 4" fill="none" stroke="#FFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      sw.disabled = st.done; sw.addEventListener('click', function () { self._swap(); }); river.appendChild(sw);
    }
    var gapBox = this._el('div', 'tb-gapbox');
    gapBox.innerHTML = '<i class="tb-abut a1 tb-art"></i><i class="tb-abut a2 tb-art"></i>';
    if (st.gap) {
      var pl = this._btn('tb-plank on-bridge p-' + st.gap + (st.done ? ' is-ok' : st.last === 'miss' ? ' is-bad' : '') + (v.flipped ? ' is-flip' : ''), 'gap', this._t('aPlank', { w: C.word(rd.loc, st.gap, st.face) }), this._plankHtml(st.gap, st.face));
      pl.disabled = st.done || rd.kind === 'swap'; pl.addEventListener('click', function () { self._back(); });
      gapBox.appendChild(pl);
    } else gapBox.appendChild(this._el('span', 'tb-hole', ''));
    river.appendChild(gapBox);
    /* the little car, under the bridge's road */
    var car = this._btn('tb-car tb-art' + (v.drive ? ' dr-' + v.drive.cls : ''), 'car', this._t('aCar'), this._img('car', D.wide ? 96 : 64, 'tb-carimg') + (v.drive && v.drive.carried && pics ? this._img(v.drive.carried, 30, 'tb-load') : ''));
    car.disabled = !st.gap || st.done; car.addEventListener('click', function () { self._drive(false); });
    river.appendChild(car);
    scene.appendChild(river);
    scene.appendChild(bank('r', B, P.second.replace(/[.?]$/, '') + P.end));
    main.appendChild(scene);
    /* the sentence strip: the reading surface */
    var strip = this._el('p', 'tb-strip');
    strip.setAttribute('aria-label', this._t('aSentence', { s: C.sentence(rd, st.order, st.gap, st.face) }));
    strip.appendChild(document.createTextNode(P.first + (P.comma ? ',' : '') + ' '));
    if (st.gap) strip.appendChild(this._el('b', 'tb-sw' + (st.done ? ' is-ok' : st.last === 'miss' ? ' is-bad' : ''), esc(P.word)));
    else strip.appendChild(this._el('span', 'tb-blank', ''));
    strip.appendChild(document.createTextNode((st.gap ? P.glue : ' ') + P.second + P.end));
    main.appendChild(strip);
    /* the rack (levels 1–3): the planks, and the turner for the arrow plank */
    if (rd.kind === 'pick') {
      var rack = this._el('div', 'tb-rack');
      rd.rack.forEach(function (p) {
        var on = st.gap === p, right = C.rightPlank(rd) === p;
        var b = self._btn('tb-plank p-' + p + (on ? ' is-in' : '') + (glow && right ? ' is-glow' : '') + (p === 'arrow' && v.flipped && !on ? ' is-flip' : ''), 'plank-' + p, self._t('aPlank', { w: C.word(rd.loc, p, st.face) }), self._plankHtml(p, glow && right && p === 'arrow' ? C.rightFace(rd, st.order) : st.face));
        b.disabled = st.done; b.setAttribute('aria-pressed', on ? 'true' : 'false');
        b.addEventListener('click', function () { self._lay(p); });
        rack.appendChild(b);
      });
      main.appendChild(rack);
    }
    /* the turner: flips the arrow plank wherever it lies */
    if (rd.rack.indexOf('arrow') >= 0 || st.gap === 'arrow') {
      var turnRow = this._el('div', 'tb-turnrow');
      var fl = this._btn('tb-flip' + (glow && rd.kind === 'swap' && st.order === 'ba' ? ' is-glow' : ''), 'flip', this._t('aFlip'), '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.3-5.6M20 4v5h-5" fill="none" stroke="#FFF" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(C.word(rd.loc, 'arrow', 'because')) + ' ⇄ ' + esc(C.word(rd.loc, 'arrow', 'so')) + '</span>');
      fl.disabled = st.done; fl.addEventListener('click', function () { self._flip(); });
      turnRow.appendChild(fl); main.appendChild(turnRow);
    }
    var foot = this._qs('.tb-foot'); foot.innerHTML = '';
    var chk = this._btn('tb-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.tb-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'tb-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'tb-note is-hint'; }
    else { note.textContent = ''; note.className = 'tb-note'; }
    v.flipped = false; v.swapped = false;
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.drive = null; },
  _lay: function (p) { var r = TurningBridgeCore.lay(this.st, p); if (r === 'no') return; this._moved(); this.api.sound(r === 'in' ? 420 : 320); this._paint(); },
  _back: function () { if (TurningBridgeCore.back(this.st) === 'no') return; this._moved(); this.api.sound(320); this._paint(); },
  _flip: function () {
    var C = TurningBridgeCore, st = this.st, was = st.face; if (C.flip(st) === 'no') return;
    this._moved(); this._view.flipped = true; this.api.sound(560); this._paint();
    this._sr(this._t('srTurned', { a: C.word(st.rd.loc, 'arrow', was), b: C.word(st.rd.loc, 'arrow', st.face) }));
  },
  _swap: function () {
    var C = TurningBridgeCore, st = this.st, was = st.face, r = C.swap(st); if (r === 'no') return;
    this._moved(); this._view.swapped = true; this._view.flipped = r === 'turned'; this.api.sound(500); this._paint();
    if (r === 'turned') this._sr(this._t('srTurned', { a: C.word(st.rd.loc, 'arrow', was), b: C.word(st.rd.loc, 'arrow', st.face) }));
  },
  /* the car drives the plank's way; ok = it reaches the far bank the right way */
  _driveView: function (ok) {
    var C = TurningBridgeCore, st = this.st, d = C.drive(st); if (!d) return null;
    var A = st.order === 'ba' ? st.rd.b : st.rd.a, B = st.order === 'ba' ? st.rd.a : st.rd.b;
    if (d.path === 'straight') return { cls: 'straight', carried: A.p };
    if (d.path === 'turn') return { cls: ok ? 'turn' : 'turn-stop' };
    if (d.path === 'fork') return { cls: ok ? 'fork' : 'fork-stall', fade: ok ? 'r' : null };
    if (st.rd.k === 'plain' || st.rd.k === 'swap-and') return { cls: 'stall' };
    var from = d.from, carried = (from === 'left' ? A : B).p;
    return { cls: 'arrow-' + (from === 'left' ? 'ltr' : 'rtl') + (ok ? '' : ' is-wrong'), carried: carried, pop: ok ? (from === 'left' ? 'r' : 'l') : null };
  },
  _drive: function (checked) {
    var st = this.st; if (!st.gap) return;
    this._clearTimers(); this._view.drive = this._driveView(true); this.api.sound(620); this._paint();
    var self = this; this._later(function () { if (self.st === st && !st.done) { self._view.drive = null; self._paint(); } }, 1600);
  },
  _check: function () {
    var C = TurningBridgeCore, st = this.st, v = this._view; if (st.done) return;
    this._clearTimers();
    var res = C.check(st);
    if (res.result === 'ok') { this._success(); return; }
    v.ok = ''; v.note = this._t(C.hint(st));
    v.drive = res.result === 'miss' && res.reason !== 'swap' ? this._driveView(false) : null;
    this.api.sound(res.result === 'empty' ? 400 : 220); this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = TurningBridgeCore, st = this.st, rd = st.rd, v = this._view;
    var s = C.sentence(rd, st.order, st.gap, st.face).replace(/[.!]$/, '').replace(/ \?$/, '?');
    var msg = this._t(C.okKey(st), { s: s });
    v.note = ''; v.ok = msg; v.drive = this._driveView(true); this._fresh = 'ok';
    this._span.push(st.gap === 'arrow' ? 'arrow' : st.gap);
    this.api.sound(988); this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: C.sentence(rd, st.order, st.gap, st.face), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectTurningBridgeCSS() {
  if (typeof document === 'undefined' || document.getElementById('tb-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tb-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .tb-wrap:focus{outline:none;}'
  + '.tb-main{display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the long bridge */
  + '.tb-span{display:flex;gap:3px;min-height:16px;padding:0 6px;border-bottom:4px solid #8C6239;} .tb-seg{display:block;width:34px;height:12px;border-radius:3px;background:#C8955E;box-shadow:inset 0 0 0 2px #8C6239;} .tb-seg.s-but{clip-path:polygon(0 0,45% 0,58% 50%,45% 100%,0 100%,0 0,55% 0,70% 0,100% 0,100% 100%,70% 100%);} .tb-seg.s-or{border-radius:3px 10px 10px 3px;} .tb-seg.s-arrow{background:#E8B07A;}'
  /* the scene */
  + '.tb-scene{display:grid;grid-template-columns:minmax(0,1fr) 150px minmax(0,1fr);align-items:stretch;gap:0;border-radius:14px;overflow:hidden;background:#DCEBC8;box-shadow:inset 0 0 0 3px #A6C08A;}'
  + '.tb-scene.is-swapped .tb-bank{animation:tbSwap .36s ease-out;} @keyframes tbSwap{0%{opacity:.2;transform:translateY(-10px);}}'
  + '.tb-bank{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:6px;padding:10px 8px 12px;min-width:0;transition:opacity .3s,transform .3s;}'
  + '.tb-bank.is-fade .tb-pic{opacity:.25;} .tb-bank.is-pop .tb-pic{animation:tbPop .5s ease-out .9s both;} @keyframes tbPop{50%{transform:scale(1.18);}}'
  + '.tb-pic{display:block;object-fit:contain;}'
  + '.tb-sign{margin:0;width:100%;box-sizing:border-box;padding:6px 8px;border-radius:8px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #B98A55,0 3px 0 #8C6239;font-family:' + H + ';font-weight:800;font-size:21px;line-height:1.25;color:' + INK + ';text-align:center;overflow-wrap:break-word;hyphens:auto;}'
  + '.tb-river{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:8px 0 104px;background:linear-gradient(90deg,#A6C08A 0 4px,#8EC5E8 4px calc(100% - 4px),#A6C08A calc(100% - 4px));}'
  + '.tb-river::before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(180deg,transparent 0 22px,rgba(255,255,255,.35) 22px 25px);pointer-events:none;}'
  + '.tb-swap{position:relative;z-index:2;width:48px;height:48px;border:0;border-radius:50%;background:#5A7FB8;box-shadow:0 4px 0 #3D5D8F;cursor:pointer;display:flex;align-items:center;justify-content:center;} .tb-swap:disabled{opacity:.5;cursor:default;}'
  + '.tb-gapbox{position:relative;z-index:2;width:100%;min-height:62px;display:flex;align-items:center;justify-content:center;}'
  + '.tb-abut{position:absolute;top:50%;width:10px;height:44px;margin-top:-22px;background:#9C8B78;border-radius:3px;} .tb-abut.a1{left:0;} .tb-abut.a2{right:0;}'
  + '.tb-hole{display:block;width:calc(100% - 24px);height:44px;border-radius:6px;border:3px dashed #FFF;box-sizing:border-box;opacity:.85;}'
  /* the planks */
  + '.tb-plank{position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:128px;min-height:54px;padding:0 10px;border:0;background:none;cursor:pointer;font-family:' + H + ';font-weight:800;font-size:22px;color:#3A2616;}'
  + '.tb-plank .tb-shape{position:absolute;inset:0;width:100%;height:100%;} .tb-plank b{position:relative;z-index:1;padding:0 4px;white-space:nowrap;text-shadow:0 1px 0 rgba(255,255,255,.55);}'
  + '.tb-plank.on-bridge{width:calc(100% - 8px);min-width:0;font-size:20px;} .tb-plank.on-bridge b{white-space:normal;line-height:1.05;}'
  + '.tb-plank.is-in{opacity:.4;} .tb-plank:disabled{cursor:default;} .tb-plank.is-glow{transform:translateY(-6px);filter:drop-shadow(0 0 6px rgba(46,140,126,.9));}'
  + '.tb-plank.is-ok b{color:#0E5C50;} .tb-plank.is-ok{filter:drop-shadow(0 0 4px rgba(46,140,126,.8));} .tb-plank.is-bad{filter:drop-shadow(0 0 4px rgba(242,120,75,.9));}'
  + '.tb-plank.is-flip{animation:tbFlip .42s ease-in-out;} @keyframes tbFlip{0%{transform:rotateX(0);}50%{transform:rotateX(90deg);}100%{transform:rotateX(0);}}'
  + '.tb-rack{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;padding:8px;border-radius:12px;background:#EFE3C8;box-shadow:inset 0 0 0 3px #D9C29A;}'
  + '.tb-turnrow{display:flex;justify-content:center;margin-top:-4px;}'
  + '.tb-flip{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:4px 14px;border:0;border-radius:22px;background:#B5763E;box-shadow:0 3px 0 #7A4E26;color:#FFF;font-family:' + H + ';font-weight:800;font-size:17px;cursor:pointer;} .tb-flip:disabled{opacity:.5;cursor:default;} .tb-flip.is-glow,.tb-swap.is-glow{box-shadow:0 0 0 5px rgba(46,140,126,.55),0 3px 0 #1B5F55;}'
  /* the car */
  + '.tb-car{position:absolute;z-index:3;left:50%;bottom:4px;width:100px;height:96px;margin-left:-50px;padding:0;border:0;background:none;cursor:pointer;} .tb-car:disabled{cursor:default;} .tb-carimg{display:block;width:96px;height:96px;object-fit:contain;margin:0 auto;} .tb-wrap.is-narrow .tb-car{width:68px;height:64px;margin-left:-34px;} .tb-wrap.is-narrow .tb-carimg{width:64px;height:64px;}'
  + '.tb-load{position:absolute;left:50%;top:-18px;width:30px;height:30px;margin-left:-15px;object-fit:contain;}'
  + '.tb-car.dr-straight{animation:tbStraight 1.2s ease-in-out;} @keyframes tbStraight{0%{transform:translateX(-120%);}100%{transform:translateX(0);}}'
  + '.tb-car.dr-turn{animation:tbTurn 1.3s ease-in-out;} @keyframes tbTurn{0%{transform:translateX(-120%);}45%{transform:translateX(-10%) rotate(18deg);}60%{transform:translateX(10%) rotate(-12deg);}100%{transform:translateX(0);}}'
  + '.tb-car.dr-turn-stop{animation:tbTurnStop 1.1s ease-in-out;} @keyframes tbTurnStop{0%{transform:translateX(-120%);}60%{transform:translateX(-10%) rotate(22deg);}75%{transform:translateX(-10%) rotate(10deg);}90%{transform:translateX(-10%) rotate(20deg);}100%{transform:translateX(0);}}'
  + '.tb-car.dr-fork{animation:tbFork 1.3s ease-in-out;} @keyframes tbFork{0%{transform:translateX(-120%);}55%{transform:translateX(-10%);}100%{transform:translateX(0) translateY(-6px) rotate(-8deg);}}'
  + '.tb-car.dr-fork-stall,.tb-car.dr-stall{animation:tbStall 1.2s ease-in-out;} @keyframes tbStall{0%{transform:translateX(-120%);}55%{transform:translateX(-10%);}70%{transform:translateX(-14%) rotate(-4deg);}100%{transform:translateX(-120%);}}'
  + '.tb-car.dr-arrow-ltr{animation:tbLtr 1.3s ease-in-out;} @keyframes tbLtr{0%{transform:translateX(-120%);}100%{transform:translateX(0);}}'
  + '.tb-car.dr-arrow-rtl .tb-carimg{transform:scaleX(-1);} .tb-car.dr-arrow-rtl{animation:tbRtl 1.3s ease-in-out;} @keyframes tbRtl{0%{transform:translateX(120%);}100%{transform:translateX(0);}}'
  + '.tb-car.is-wrong .tb-carimg{filter:sepia(.4) saturate(1.6) hue-rotate(-30deg);}'
  /* the sentence strip */
  + '.tb-strip{margin:0;padding:8px 12px;border-radius:10px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #D9C29A;font-family:' + H + ';font-weight:800;font-size:24px;line-height:1.4;color:' + INK + ';text-align:center;overflow-wrap:break-word;}'
  + '.tb-blank{display:inline-block;vertical-align:middle;width:80px;height:30px;margin:0 2px;border-radius:6px;border:3px dashed #B98A55;box-sizing:border-box;} .tb-sw{color:#8C4A1E;} .tb-sw.is-ok{color:#0E5C50;} .tb-sw.is-bad{color:#C2502A;}'
  + '.tb-foot{display:flex;justify-content:center;} .tb-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;box-shadow:0 5px 0 #0E4A41;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .tb-check:disabled{opacity:.5;cursor:default;}'
  + '.tb-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .tb-note.is-hint{color:#9A3D1C;}'
  + '.tb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.tb-wrap.is-narrow{gap:9px;} .tb-wrap.is-narrow .tb-main{gap:9px;} .tb-wrap.is-narrow .tb-scene{grid-template-columns:minmax(0,1fr) 104px minmax(0,1fr);} .tb-wrap.is-narrow .tb-river{padding-bottom:70px;} .tb-wrap.is-narrow .tb-sign{font-size:16px;padding:4px 5px;} .tb-wrap.is-narrow .tb-bank{padding:8px 5px 10px;}'
  + '.tb-wrap.is-narrow .tb-plank{min-width:0;flex:1 1 auto;max-width:150px;min-height:50px;font-size:18px;padding:0 6px;} .tb-wrap.is-narrow .tb-rack{gap:6px;padding:6px;flex-wrap:nowrap;} .tb-wrap.is-narrow .tb-plank.on-bridge{font-size:15px;padding:0 3px;}'
  + '.tb-wrap.is-narrow .tb-strip{font-size:20px;padding:6px 8px;} .tb-wrap.is-narrow .tb-check{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .tb-wrap.is-narrow .tb-note{font-size:17px;} .tb-wrap.is-narrow .tb-flip{font-size:15px;}'
  + '.tb-wrap.is-tiny .tb-scene{grid-template-columns:minmax(0,1fr) 92px minmax(0,1fr);} .tb-wrap.is-tiny .tb-sign{font-size:15px;} .tb-wrap.is-tiny .tb-span{display:none;} .tb-wrap.is-tiny .tb-strip{font-size:18px;padding:4px 6px;}'
  + '.tb-wrap.is-tiny,.tb-wrap.is-tiny .tb-main{gap:6px;} .tb-wrap.is-tiny .tb-river{gap:6px;} .tb-wrap.is-tiny .tb-rack{padding:4px;} .tb-wrap.is-tiny .tb-bank{padding:6px 4px 8px;gap:4px;}'
  /* a solved round on a phone: the rack, the turner and Check give their room to the shell's Next */
  + '.tb-wrap.is-narrow.is-done .tb-rack,.tb-wrap.is-narrow.is-done .tb-turnrow,.tb-wrap.is-narrow.is-done .tb-foot{display:none;}'
  + '.tb-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.tb-wrap *{animation:none !important;transition:none !important;}}'
  + '.tb-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'tb-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.TurningBridgeActivity = TurningBridgeActivity;
