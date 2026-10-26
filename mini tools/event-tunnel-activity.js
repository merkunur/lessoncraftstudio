/* =====================================================================
   event-tunnel-activity.js — ACTIVITY #127 of the one-by-one rebuild:
   "Tempo's Day Plan" → THE EVENT TUNNEL (L.1.1.i; all 11 locales).
   Model: event-tunnel-core.js (EventTunnelCore).
   Design: docs/activities-rebuild/designs/127-tempo-day-plan.md
   ---------------------------------------------------------------------
   The day's road runs from morning (left) to evening (right); an event is
   a stone tunnel on it, its library picture above the arch. Levels 1–2:
   the action card already stands on the road — in front of the tunnel,
   inside it, or past it — and the child taps the phrase (before / during /
   after + the event) that names its place. Check sends the library lantern
   along the road: it lights the stretch the chosen word means, and the
   card glows if it stands there. Level 3: the sentence is complete; tap
   the stretch the card belongs on. Level 4: two tunnels, five stretches,
   three cards, each tagged with a shape. No timer, no score.
   Test seams: window.EventTunnelActivity.st / ._pool / ._order /
   ._ensurePool / ._start / ._dims / ._render2 / ._choose / ._zone /
   ._card / ._check / .FAST / .OK_MS.
   ===================================================================== */
var EventTunnelActivity = {
  id: 'event-tunnel',
  /* the drawn apparatus (the hierarchy gate): the sky band, the road, the tunnels, the lantern, the stretches */
  apparatusClasses: ['et-art'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Tempo's Day Plan",de:"Tempos Tagesplan",fr:"La journée de Tempo",es:"El día de Tempo",pt:"O dia do Tempo",it:"La giornata di Tempo",nl:"De dag van Tempo",sv:"Tempos dag",da:"Tempos dag",no:"Tempos dag",fi:"Tempon päivä"},
    instruction: {en:"The tunnel is the event. In front of it, inside it or past it: which words fit where the card stands?",de:"Der Tunnel ist das Ereignis. Davor, darin oder danach: Welche Wörter passen zu dem Platz, an dem die Karte steht?",fr:"Le tunnel, c’est le moment. Avant, dedans ou après : quels mots vont avec l’endroit où est la carte ?",es:"El túnel es el momento. Antes, adentro o después: ¿qué palabras van con el lugar de la tarjeta?",pt:"O túnel é o momento. Antes, dentro ou depois: quais palavras combinam com o lugar do cartão?",it:"Il tunnel è il momento. Prima, dentro o dopo: quali parole vanno con il posto del cartellino?",nl:"De tunnel is het moment. Ervoor, erin of erna: welke woorden passen bij de plek van de kaart?",sv:"Tunneln är händelsen. Före, inuti eller efter: vilka ord passar till där kortet står?",da:"Tunnelen er det, der sker. Før, inde i eller efter: hvilke ord passer til, hvor kortet står?",no:"Tunnelen er det som skjer. Før, inne i eller etter: hvilke ord passer til der kortet står?",fi:"Tunneli on tapahtuma. Ennen, sisällä vai jälkeen: mitkä sanat sopivat siihen, missä kortti on?"},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    t1: {en:"Where does the card stand on the road? Pick the words.",de:"Wo steht die Karte auf dem Weg? Wähl die Wörter.",fr:"Où est la carte sur la route ? Choisis les mots.",es:"¿Dónde está la tarjeta en el camino? Elige las palabras.",pt:"Onde está o cartão na estrada? Escolha as palavras.",it:"Dov’è il cartellino sulla strada? Scegli le parole.",nl:"Waar staat de kaart op de weg? Kies de woorden.",sv:"Var står kortet på vägen? Välj orden.",da:"Hvor står kortet på vejen? Vælg ordene.",no:"Hvor står kortet på veien? Velg ordene.",fi:"Missä kortti on tiellä? Valitse sanat."},
    t2: {en:"Where does the card stand on the road? Pick the words.",de:"Wo steht die Karte auf dem Weg? Wähl die Wörter.",fr:"Où est la carte sur la route ? Choisis les mots.",es:"¿Dónde está la tarjeta en el camino? Elige las palabras.",pt:"Onde está o cartão na estrada? Escolha as palavras.",it:"Dov’è il cartellino sulla strada? Scegli le parole.",nl:"Waar staat de kaart op de weg? Kies de woorden.",sv:"Var står kortet på vägen? Välj orden.",da:"Hvor står kortet på vejen? Vælg ordene.",no:"Hvor står kortet på veien? Velg ordene.",fi:"Missä kortti on tiellä? Valitse sanat."},
    t3: {en:"Read it. Put the card on the road.",de:"Lies den Satz. Stell die Karte auf den Weg.",fr:"Lis la phrase. Pose la carte sur la route.",es:"Lee la oración. Pon la tarjeta en el camino.",pt:"Leia a frase. Coloque o cartão na estrada.",it:"Leggi la frase. Metti il cartellino sulla strada.",nl:"Lees de zin. Zet de kaart op de weg.",sv:"Läs meningen. Sätt kortet på vägen.",da:"Læs sætningen. Sæt kortet på vejen.",no:"Les setningen. Sett kortet på veien.",fi:"Lue lause. Laita kortti tielle."},
    t4: {en:"Plan Tempo's day: put every card on the road.",de:"Plan Tempos Tag: Stell jede Karte auf den Weg.",fr:"Prépare la journée de Tempo : pose chaque carte sur la route.",es:"Planea el día de Tempo: pon cada tarjeta en el camino.",pt:"Planeje o dia do Tempo: coloque cada cartão na estrada.",it:"Organizza la giornata di Tempo: metti ogni cartellino sulla strada.",nl:"Plan de dag van Tempo: zet elke kaart op de weg.",sv:"Planera Tempos dag: sätt varje kort på vägen.",da:"Planlæg Tempos dag: sæt hvert kort på vejen.",no:"Planlegg Tempos dag: sett hvert kort på veien.",fi:"Suunnittele Tempon päivä: laita jokainen kortti tielle."},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    setLevel: {en:"Days",de:"Tage",fr:"Journées",es:"Días",pt:"Dias",it:"Giornate",nl:"Dagen",sv:"Dagar",da:"Dage",no:"Dager",fi:"Päivät"},
    l1: {en:"Where is it?",de:"Wo ist es?",fr:"Où est-ce ?",es:"¿Dónde está?",pt:"Onde está?",it:"Dov’è?",nl:"Waar is het?",sv:"Var är det?",da:"Hvor er det?",no:"Hvor er det?",fi:"Missä se on?"},
    l2: {en:"New days",de:"Neue Tage",fr:"D’autres journées",es:"Otros días",pt:"Outros dias",it:"Altre giornate",nl:"Nieuwe dagen",sv:"Nya dagar",da:"Nye dage",no:"Nye dager",fi:"Uusia päiviä"},
    l3: {en:"Put it on the road",de:"Auf den Weg stellen",fr:"Sur la route",es:"Ponlo en el camino",pt:"Coloque na estrada",it:"Mettila sulla strada",nl:"Op de weg zetten",sv:"Sätt det på vägen",da:"Sæt det på vejen",no:"Sett det på veien",fi:"Laita se tielle"},
    l4: {en:"Day plan",de:"Tagesplan",fr:"Programme de la journée",es:"Plan del día",pt:"Plano do dia",it:"Programma della giornata",nl:"Dagplanning",sv:"Dagsplan",da:"Dagsplan",no:"Dagsplan",fi:"Päivän suunnitelma"},
    setStretch: {en:"Stretches",de:"Abschnitte",fr:"Tronçons",es:"Tramos",pt:"Trechos",it:"Tratti",nl:"Stukken weg",sv:"Sträckor",da:"Strækninger",no:"Strekninger",fi:"Tieosat"},
    stretchHide: {en:"Hidden",de:"Verborgen",fr:"Cachés",es:"Ocultos",pt:"Escondidos",it:"Nascosti",nl:"Verborgen",sv:"Dolda",da:"Skjulte",no:"Skjult",fi:"Piilossa"},
    stretchShow: {en:"Show the three stretches",de:"Die drei Abschnitte zeigen",fr:"Montrer les trois tronçons",es:"Mostrar los tres tramos",pt:"Mostrar os três trechos",it:"Mostra i tre tratti",nl:"De drie stukken laten zien",sv:"Visa de tre sträckorna",da:"Vis de tre strækninger",no:"Vis de tre strekningene",fi:"Näytä kolme tieosaa"},
    hintPick: {en:"Look where the card stands on the road. Is it before the tunnel, inside it, or after it?",de:"Schau, wo die Karte auf dem Weg steht. Vor dem Tunnel, im Tunnel oder hinter dem Tunnel?",fr:"Regarde où est la carte sur la route. Avant le tunnel, dedans ou après ?",es:"Mira dónde está la tarjeta en el camino. ¿Antes del túnel, adentro o después?",pt:"Veja onde o cartão está na estrada. Antes do túnel, dentro ou depois?",it:"Guarda dov’è il cartellino sulla strada. Prima del tunnel, dentro o dopo?",nl:"Kijk waar de kaart op de weg staat. Voor de tunnel, erin of erna?",sv:"Titta var kortet står på vägen. Före tunneln, inuti eller efter?",da:"Se, hvor kortet står på vejen. Før tunnelen, inde i den eller efter?",no:"Se hvor kortet står på veien. Før tunnelen, inne i den eller etter?",fi:"Katso, missä kortti on tiellä. Ennen tunnelia, sen sisällä vai sen jälkeen?"},
    hintPlace: {en:"Read the sentence. Where does the card go on the road?",de:"Lies den Satz. Wohin gehört die Karte auf dem Weg?",fr:"Lis la phrase. Où va la carte sur la route ?",es:"Lee la oración. ¿Dónde va la tarjeta en el camino?",pt:"Leia a frase. Onde o cartão fica na estrada?",it:"Leggi la frase. Dove va il cartellino sulla strada?",nl:"Lees de zin. Waar hoort de kaart op de weg?",sv:"Läs meningen. Var ska kortet stå på vägen?",da:"Læs sætningen. Hvor skal kortet stå på vejen?",no:"Les setningen. Hvor skal kortet stå på veien?",fi:"Lue lause. Mihin kohtaan tietä kortti kuuluu?"},
    hintPlan: {en:"Put every card on the road first.",de:"Stell zuerst jede Karte auf den Weg.",fr:"Pose d’abord chaque carte sur la route.",es:"Primero pon cada tarjeta en el camino.",pt:"Primeiro coloque cada cartão na estrada.",it:"Prima metti ogni cartellino sulla strada.",nl:"Zet eerst elke kaart op de weg.",sv:"Sätt först varje kort på vägen.",da:"Sæt først hvert kort på vejen.",no:"Sett først hvert kort på veien.",fi:"Laita ensin jokainen kortti tielle."},
    missLitB: {en:"The lantern lit the road before the tunnel, but the card is not there. Which words light up the card?",de:"Die Laterne leuchtet den Weg vor dem Tunnel an, aber da steht die Karte nicht. Welche Wörter leuchten die Karte an?",fr:"La lanterne éclaire la route avant le tunnel, mais la carte n’est pas là. Quels mots éclairent la carte ?",es:"El farol alumbró el camino antes del túnel, pero la tarjeta no está ahí. ¿Qué palabras alumbran la tarjeta?",pt:"A lanterna iluminou a estrada antes do túnel, mas o cartão não está lá. Quais palavras iluminam o cartão?",it:"La lanterna ha illuminato la strada prima del tunnel, ma il cartellino non è lì. Quali parole illuminano il cartellino?",nl:"De lantaarn verlicht de weg voor de tunnel, maar daar staat de kaart niet. Welke woorden verlichten de kaart?",sv:"Lyktan lyste upp vägen före tunneln, men där står inte kortet. Vilka ord lyser upp kortet?",da:"Lygten lyste vejen op før tunnelen, men der står kortet ikke. Hvilke ord lyser kortet op?",no:"Lykta lyste opp veien før tunnelen, men der står ikke kortet. Hvilke ord lyser opp kortet?",fi:"Lyhty valaisi tien ennen tunnelia, mutta kortti ei ole siellä. Mitkä sanat valaisevat kortin?"},
    missLitD: {en:"The lantern lit the inside of the tunnel, but the card is not there. Which words light up the card?",de:"Die Laterne leuchtet in den Tunnel, aber da steht die Karte nicht. Welche Wörter leuchten die Karte an?",fr:"La lanterne éclaire l’intérieur du tunnel, mais la carte n’est pas là. Quels mots éclairent la carte ?",es:"El farol alumbró el interior del túnel, pero la tarjeta no está ahí. ¿Qué palabras alumbran la tarjeta?",pt:"A lanterna iluminou o lado de dentro do túnel, mas o cartão não está lá. Quais palavras iluminam o cartão?",it:"La lanterna ha illuminato l’interno del tunnel, ma il cartellino non è lì. Quali parole illuminano il cartellino?",nl:"De lantaarn verlicht de binnenkant van de tunnel, maar daar staat de kaart niet. Welke woorden verlichten de kaart?",sv:"Lyktan lyste upp inuti tunneln, men där står inte kortet. Vilka ord lyser upp kortet?",da:"Lygten lyste tunnelen op indeni, men der står kortet ikke. Hvilke ord lyser kortet op?",no:"Lykta lyste opp inne i tunnelen, men der står ikke kortet. Hvilke ord lyser opp kortet?",fi:"Lyhty valaisi tunnelin sisäosan, mutta kortti ei ole siellä. Mitkä sanat valaisevat kortin?"},
    missLitA: {en:"The lantern lit the road after the tunnel, but the card is not there. Which words light up the card?",de:"Die Laterne leuchtet den Weg hinter dem Tunnel an, aber da steht die Karte nicht. Welche Wörter leuchten die Karte an?",fr:"La lanterne éclaire la route après le tunnel, mais la carte n’est pas là. Quels mots éclairent la carte ?",es:"El farol alumbró el camino después del túnel, pero la tarjeta no está ahí. ¿Qué palabras alumbran la tarjeta?",pt:"A lanterna iluminou a estrada depois do túnel, mas o cartão não está lá. Quais palavras iluminam o cartão?",it:"La lanterna ha illuminato la strada dopo il tunnel, ma il cartellino non è lì. Quali parole illuminano il cartellino?",nl:"De lantaarn verlicht de weg na de tunnel, maar daar staat de kaart niet. Welke woorden verlichten de kaart?",sv:"Lyktan lyste upp vägen efter tunneln, men där står inte kortet. Vilka ord lyser upp kortet?",da:"Lygten lyste vejen op efter tunnelen, men der står kortet ikke. Hvilke ord lyser kortet op?",no:"Lykta lyste opp veien etter tunnelen, men der står ikke kortet. Hvilke ord lyser opp kortet?",fi:"Lyhty valaisi tien tunnelin jälkeen, mutta kortti ei ole siellä. Mitkä sanat valaisevat kortin?"},
    missPlace: {en:"The lantern lit what the sentence says, and the card is not there. Read the little word again.",de:"Die Laterne leuchtet dort, wo der Satz es sagt, und da steht die Karte nicht. Lies das kleine Wort noch einmal.",fr:"La lanterne éclaire ce que dit la phrase, et la carte n’y est pas. Relis le petit mot.",es:"El farol alumbró lo que dice la oración, y la tarjeta no está ahí. Vuelve a leer la palabrita.",pt:"A lanterna iluminou o que a frase diz, e o cartão não está lá. Leia de novo a palavrinha.",it:"La lanterna ha illuminato ciò che dice la frase, e il cartellino non è lì. Rileggi la parolina.",nl:"De lantaarn verlicht wat de zin zegt, en daar staat de kaart niet. Lees het kleine woord nog eens.",sv:"Lyktan lyste upp det som meningen säger, och där står inte kortet. Läs det lilla ordet igen.",da:"Lygten lyste det op, som sætningen siger, og der står kortet ikke. Læs det lille ord igen.",no:"Lykta lyste opp det setningen sier, og der står ikke kortet. Les det lille ordet igjen.",fi:"Lyhty valaisi sen kohdan, josta lause kertoo, eikä kortti ole siellä. Lue pieni sana uudestaan."},
    missPlan: {en:"Some cards came back. Read each sentence again: before, during or after?",de:"Ein paar Karten sind zurückgekommen. Lies jeden Satz noch einmal: vor, während oder nach?",fr:"Des cartes sont revenues. Relis chaque phrase : avant, pendant ou après ?",es:"Algunas tarjetas regresaron. Vuelve a leer cada oración: ¿antes, durante o después?",pt:"Alguns cartões voltaram. Leia cada frase de novo: antes, durante ou depois?",it:"Alcuni cartellini sono tornati indietro. Rileggi ogni frase: prima, durante o dopo?",nl:"Een paar kaarten kwamen terug. Lees elke zin nog eens: voor, tijdens of na?",sv:"Några kort kom tillbaka. Läs varje mening igen: före, under eller efter?",da:"Nogle kort kom tilbage. Læs hver sætning igen: før, under eller efter?",no:"Noen kort kom tilbake. Les hver setning igjen: før, under eller etter?",fi:"Osa korteista palasi. Lue jokainen lause uudestaan: ennen, aikana vai jälkeen?"},
    missGlow: {en:"Try the words that light up the glowing stretch.",de:"Probier die Wörter, die den leuchtenden Abschnitt anleuchten.",fr:"Essaie les mots qui éclairent le tronçon qui brille.",es:"Prueba las palabras que alumbran el tramo que brilla.",pt:"Experimente as palavras que iluminam o trecho que brilha.",it:"Prova le parole che illuminano il tratto che brilla.",nl:"Probeer de woorden die het oplichtende stuk verlichten.",sv:"Prova orden som lyser upp sträckan som lyser.",da:"Prøv de ord, der lyser den lysende strækning op.",no:"Prøv ordene som lyser opp strekningen som lyser.",fi:"Kokeile sanoja, jotka valaisevat hohtavan tieosan."},
    missGlowPlace: {en:"Put the card on the glowing stretch.",de:"Stell die Karte auf den leuchtenden Abschnitt.",fr:"Pose la carte sur le tronçon qui brille.",es:"Pon la tarjeta en el tramo que brilla.",pt:"Coloque o cartão no trecho que brilha.",it:"Metti il cartellino sul tratto che brilla.",nl:"Zet de kaart op het stuk dat oplicht.",sv:"Sätt kortet på sträckan som lyser.",da:"Sæt kortet på strækningen, der lyser.",no:"Sett kortet på strekningen som lyser.",fi:"Laita kortti hohtavaan tieosaan."},
    missGlowPlan: {en:"A card belongs on the glowing stretch.",de:"Eine Karte gehört auf den leuchtenden Abschnitt.",fr:"Une carte va sur le tronçon qui brille.",es:"Una tarjeta va en el tramo que brilla.",pt:"Um cartão fica no trecho que brilha.",it:"Un cartellino va sul tratto che brilla.",nl:"Er hoort een kaart op het stuk dat oplicht.",sv:"Ett kort ska stå på sträckan som lyser.",da:"Et kort skal stå på strækningen, der lyser.",no:"Et kort skal stå på strekningen som lyser.",fi:"Yksi korteista kuuluu hohtavaan tieosaan."},
    okB: {en:"{s} — that happens first!",de:"{s} – das kommt zuerst!",fr:"{s} : ça vient d’abord !",es:"{s}: ¡eso va primero!",pt:"{s}: isso vem primeiro!",it:"{s}: questo viene prima!",nl:"{s} – dat komt eerst!",sv:"{s} – det kommer först!",da:"{s} – det kommer først!",no:"{s} – det kommer først!",fi:"{s} – se tulee ensin!"},
    okD: {en:"{s} — while it is going on!",de:"{s} – mittendrin!",fr:"{s} : pendant que ça se passe !",es:"{s}: ¡mientras está pasando!",pt:"{s}: enquanto está acontecendo!",it:"{s}: mentre succede!",nl:"{s} – terwijl het bezig is!",sv:"{s} – medan det pågår!",da:"{s} – mens det står på!",no:"{s} – mens det pågår!",fi:"{s} – samaan aikaan!"},
    okA: {en:"{s} — that comes afterwards!",de:"{s} – das kommt danach!",fr:"{s} : ça vient ensuite !",es:"{s}: ¡eso va después!",pt:"{s}: isso vem depois!",it:"{s}: questo viene dopo!",nl:"{s} – dat komt daarna!",sv:"{s} – det kommer efteråt!",da:"{s} – det kommer bagefter!",no:"{s} – det kommer etterpå!",fi:"{s} – se tulee jälkeenpäin!"},
    okPlan: {en:"Tempo's day is all planned!",de:"Tempos Tag ist fertig geplant!",fr:"La journée de Tempo est prête !",es:"¡El día de Tempo está listo!",pt:"O dia do Tempo está todo planejado!",it:"La giornata di Tempo è pronta!",nl:"De dag van Tempo is helemaal gepland!",sv:"Tempos dag är färdigplanerad!",da:"Tempos dag er planlagt!",no:"Tempos dag er ferdig planlagt!",fi:"Tempon päivä on suunniteltu!"},
    whereB: {en:"in front of the tunnel",de:"vor dem Tunnel",fr:"avant le tunnel",es:"antes del túnel",pt:"antes do túnel",it:"prima del tunnel",nl:"voor de tunnel",sv:"före tunneln",da:"før tunnelen",no:"før tunnelen",fi:"ennen tunnelia"},
    whereD: {en:"inside the tunnel",de:"im Tunnel",fr:"dans le tunnel",es:"dentro del túnel",pt:"dentro do túnel",it:"dentro il tunnel",nl:"in de tunnel",sv:"inuti tunneln",da:"inde i tunnelen",no:"inne i tunnelen",fi:"tunnelin sisällä"},
    whereA: {en:"past the tunnel",de:"hinter dem Tunnel",fr:"après le tunnel",es:"después del túnel",pt:"depois do túnel",it:"dopo il tunnel",nl:"na de tunnel",sv:"efter tunneln",da:"efter tunnelen",no:"etter tunnelen",fi:"tunnelin jälkeen"},
    whereM: {en:"between the tunnels",de:"zwischen den Tunneln",fr:"entre les tunnels",es:"entre los túneles",pt:"entre os túneis",it:"tra i tunnel",nl:"tussen de tunnels",sv:"mellan tunnlarna",da:"mellem tunnelerne",no:"mellom tunnelene",fi:"tunnelien välissä"},
    aWord: {en:"Words: {w}",de:"Wörter: {w}",fr:"Mots : {w}",es:"Palabras: {w}",pt:"Palavras: {w}",it:"Parole: {w}",nl:"Woorden: {w}",sv:"Ord: {w}",da:"Ord: {w}",no:"Ord: {w}",fi:"Sanat: {w}"},
    aZone: {en:"Road: {w}",de:"Weg: {w}",fr:"Route : {w}",es:"Camino: {w}",pt:"Estrada: {w}",it:"Strada: {w}",nl:"Weg: {w}",sv:"Väg: {w}",da:"Vej: {w}",no:"Vei: {w}",fi:"Tie: {w}"},
    aLamp: {en:"Send the lantern along the road",de:"Die Laterne den Weg entlanggehen lassen",fr:"Faire avancer la lanterne sur la route",es:"Mandar el farol por el camino",pt:"Mandar a lanterna pela estrada",it:"Mandare la lanterna lungo la strada",nl:"De lantaarn over de weg sturen",sv:"Skicka lyktan längs vägen",da:"Send lygten hen ad vejen",no:"Send lykta langs veien",fi:"Lähetä lyhty tietä pitkin"},
    aCard: {en:"Card: {w}",de:"Karte: {w}",fr:"Carte : {w}",es:"Tarjeta: {w}",pt:"Cartão: {w}",it:"Cartellino: {w}",nl:"Kaart: {w}",sv:"Kort: {w}",da:"Kort: {w}",no:"Kort: {w}",fi:"Kortti: {w}"},
    srLit: {en:"The lantern lit the road {w}.",de:"Die Laterne leuchtet den Weg {w} an.",fr:"La lanterne éclaire la route {w}.",es:"El farol alumbró el camino {w}.",pt:"A lanterna iluminou a estrada {w}.",it:"La lanterna ha illuminato la strada {w}.",nl:"De lantaarn verlicht de weg {w}.",sv:"Lyktan lyste upp vägen {w}.",da:"Lygten lyste vejen op {w}.",no:"Lykta lyste opp veien {w}.",fi:"Lyhty valaisi tien: {w}."},
  },/*STRINGS-END*/

  defaults: { level: '1', stretches: 'hide' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }, { value: '4', labelKey: 'l4' }] },
    { key: 'stretches', type: 'choice', labelKey: 'setStretch', options: [{ value: 'hide', labelKey: 'stretchHide' }, { value: 'show', labelKey: 'stretchShow' }] }
  ],
  OK_MS: 500, FAST: false,
  TAGS: ['circle', 'square', 'triangle'],

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {};
    this._timers = []; this._ro = null; this._view = {}; this._miles = 0; this._fresh = null;
    injectEventTunnelCSS();
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
  _loc: function () { return EventTunnelCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return EventTunnelCore.levelOf(this._setting('level')); },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = EventTunnelCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._trays = {}; this._miles = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = EventTunnelCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var P = C.plan(this._loc(), this._level(), Math.random, fresh ? null : this._prev); this._prev = P.order; this._order = P.order.slice(); this._trays = P.trays; this._orderForPool = pool; if (pass > this._pass) this._miles = 0; this._pass = pass; }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'eventtunnel.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t('t' + this._level()); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._fresh = null;
    this.st = EventTunnelCore.newState(this._loc(), this._level(), r, this._trays && this._trays[r]);
    this._view = { note: '', ok: '', walk: null, hop: false };
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
    var wrap = api.el('div', 'et-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="et-main"></div><div class="et-foot"></div><p class="et-note" aria-live="polite"></p><p class="et-sr" aria-live="polite"></p>';
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
  _dims: function () { var W = this._width(), B = EventTunnelCore.band(W); return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, pic: B.wide ? 112 : B.tiny ? 64 : 76, lamp: B.wide ? 96 : 64 }; },
  _img: function (path, size, cls) { return '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="/image-library-webp/themes/' + path + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.et-sr'); if (el) el.textContent = s; },
  _tag: function (i) {
    var c = ['#E0663A', '#2E8C7E', '#8A5BA8'][i], sh = this.TAGS[i];
    var g = sh === 'circle' ? '<circle cx="12" cy="12" r="8" fill="' + c + '"/>' : sh === 'square' ? '<rect x="4.5" y="4.5" width="15" height="15" rx="2" fill="' + c + '"/>' : '<path d="M12 3.5 L21 20 H3 Z" fill="' + c + '"/>';
    return '<svg class="et-tag" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">' + g + '</svg>';
  },
  _phraseHtml: function (ph) { return esc(ph.parts[0]) + '<b>' + esc(ph.parts[1]) + '</b>' + esc(ph.parts[2]); },
  _where: function (z) { return this._t('where' + z.charAt(0).toUpperCase()); },

  _paint_: function () {
    var C = EventTunnelCore, st = this.st, rd = st.rd, D = this._dims(), v = this._view, self = this, gz = C.glowZone(st);
    this._wrap.className = 'et-wrap' + (D.wide ? ' is-wide' : ' is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' k-' + rd.kind + (this._setting('stretches') === 'show' ? ' show-stretch' : '');
    var main = this._qs('.et-main'); main.innerHTML = '';
    /* the strip: the reading surface */
    var strip = this._el('div', 'et-strip');
    if (rd.kind === 'name') {
      var p = this._el('p', 'et-sent'), tpl = rd.tpl, cut = tpl.indexOf('{g}'), ph = st.chosen ? rd.ph[C.WORDS.indexOf(st.chosen)] : null;
      p.appendChild(document.createTextNode(tpl.slice(0, cut)));
      if (ph) { var gb = this._btn('et-gapw' + (st.done ? ' is-ok' : st.last === 'miss' ? ' is-bad' : ''), 'gap', this._t('aWord', { w: ph.text }), this._phraseHtml(ph)); gb.disabled = st.done; gb.addEventListener('click', function () { self._choose(st.chosen); }); p.appendChild(gb); }
      else p.appendChild(this._el('span', 'et-gap', ''));
      p.appendChild(document.createTextNode(tpl.slice(cut + 3)));
      strip.appendChild(p);
    } else if (rd.kind === 'place') {
      strip.appendChild(this._el('p', 'et-sent', esc(C.sentence(rd, rd.stretch)).replace(esc(rd.ph[C.WORDS.indexOf(rd.stretch)].parts[1]), '<b>' + esc(rd.ph[C.WORDS.indexOf(rd.stretch)].parts[1]) + '</b>')));
    } else {
      var ul = this._el('ul', 'et-list');
      rd.items.forEach(function (it, i) { var li = self._el('li', 'et-li' + (st.at[i] && st.done ? ' is-ok' : ''), self._tag(i) + '<span>' + esc(C.fill(it.tpl, it.ph)).replace(esc(it.ph.parts[1]), '<b>' + esc(it.ph.parts[1]) + '</b>') + '</span>'); ul.appendChild(li); });
      strip.appendChild(ul);
    }
    main.appendChild(strip);
    /* the day road */
    var scene = this._el('div', 'et-scene et-art'), cols = rd.kind === 'plan' ? (D.wide ? '1fr 1.25fr .8fr 1.25fr 1fr' : '1fr 1.3fr .9fr 1.3fr 1fr') : '1fr 1.15fr 1fr';
    var sky = this._el('div', 'et-sky et-art'), road = this._el('div', 'et-road et-art');
    sky.style.gridTemplateColumns = cols; road.style.gridTemplateColumns = cols;
    var tunnels = rd.kind === 'plan' ? { d1: 0, d2: 1 } : { d: 0 };
    var lit = v.walk;
    rd.zones.forEach(function (z, zi) {
      var cell = self._el('div', 'et-skyc');
      if (z in tunnels) cell.insertAdjacentHTML('beforeend', self._img(rd.kind === 'plan' ? rd.pics[tunnels[z]] : rd.pic, D.pic, 'et-pic'));
      sky.appendChild(cell);
      var inPlace = rd.kind !== 'name';
      var zone = inPlace ? self._btn('et-zone z-' + z, 'zone-' + z, self._t('aZone', { w: self._where(z) })) : self._el('div', 'et-zone z-' + z);
      zone.className += (z in tunnels ? ' is-tunnel' : '') + (lit === z ? ' is-lit' : '') + (gz === z ? ' is-glow' : '');
      if (z in tunnels) zone.insertAdjacentHTML('beforeend', '<span class="et-arch et-art"><i class="et-win w1"></i><i class="et-win w2"></i><i class="et-win w3"></i></span>');
      zone.insertAdjacentHTML('beforeend', '<span class="et-lane et-art"></span>');
      /* the card(s) standing in this stretch */
      if (rd.kind === 'name' && rd.stretch === z) zone.insertAdjacentHTML('beforeend', '<span class="et-act' + (st.done ? ' is-ok' : '') + (v.hop ? ' is-hop' : '') + '">' + esc(C.cardText(rd.tpl)) + '</span>');
      if (rd.kind === 'place' && st.at === z) zone.insertAdjacentHTML('beforeend', '<span class="et-act' + (st.done ? ' is-ok' : st.last === 'miss' ? ' is-bad' : '') + '">' + esc(C.cardText(rd.tpl)) + '</span>');
      if (rd.kind === 'plan') { var j = st.at.indexOf(z); if (j >= 0) zone.insertAdjacentHTML('beforeend', '<span class="et-pin' + (st.done ? ' is-ok' : '') + '">' + self._tag(j) + (D.wide ? '<em>' + esc(C.cardText(rd.items[j].tpl)) + '</em>' : '') + '</span>'); }
      if (inPlace) { zone.disabled = st.done; zone.addEventListener('click', function () { self._zone(z); }); }
      road.appendChild(zone);
    });
    scene.appendChild(sky); scene.appendChild(road);
    /* the lantern: at the morning end; after Check it stands over the stretch it lit */
    var lamp = this._btn('et-lamp et-art' + (lit ? ' at-' + lit : ''), 'lamp', this._t('aLamp'), this._img('camping/lantern', D.lamp, 'et-lampimg'));
    lamp.disabled = st.done || !(rd.kind === 'name' ? st.chosen : rd.kind === 'place' ? true : false); lamp.addEventListener('click', function () { self._walk(); });
    scene.appendChild(lamp);
    if (this._miles) { var mi = this._el('div', 'et-miles et-art'); for (var m = 0; m < Math.min(9, this._miles); m++) mi.insertAdjacentHTML('beforeend', '<i></i>'); scene.appendChild(mi); }
    main.appendChild(scene);
    /* the rack (name) / the shelf (place, plan) */
    if (rd.kind === 'name') {
      var rack = this._el('div', 'et-rack');
      rd.rack.forEach(function (w) {
        var ph = rd.ph[C.WORDS.indexOf(w)], on = st.chosen === w;
        var b = self._btn('et-word' + (on ? ' is-in' : '') + (C.glow(st) && w === rd.stretch ? ' is-glow' : ''), 'word-' + w, self._t('aWord', { w: ph.text }), self._phraseHtml(ph));
        b.disabled = st.done; b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.addEventListener('click', function () { self._choose(w); });
        rack.appendChild(b);
      });
      main.appendChild(rack);
    } else if (rd.kind === 'place') {
      var shelf = this._el('div', 'et-shelf');
      if (st.at == null) shelf.appendChild(this._el('span', 'et-card is-wait', esc(C.cardText(rd.tpl))));
      else shelf.appendChild(this._el('span', 'et-shelfempty', ''));
      main.appendChild(shelf);
    } else {
      var sh = this._el('div', 'et-shelf');
      rd.shelf.forEach(function (i) {
        if (st.at[i] != null) return;
        var cb2 = self._btn('et-card' + (st.sel === i ? ' is-sel' : ''), 'card-' + i, self._t('aCard', { w: C.cardText(rd.items[i].tpl) }), self._tag(i) + (D.wide ? '<span>' + esc(C.cardText(rd.items[i].tpl)) + '</span>' : ''));
        cb2.disabled = st.done; cb2.addEventListener('click', function () { self._card(i); }); sh.appendChild(cb2);
      });
      if (!sh.children.length) sh.appendChild(this._el('span', 'et-shelfempty', ''));
      main.appendChild(sh);
    }
    var foot = this._qs('.et-foot'); foot.innerHTML = '';
    var chk = this._btn('et-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.et-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'et-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'et-note is-hint'; }
    else { note.textContent = ''; note.className = 'et-note'; }
    this._placeLamp(lit);
  },
  /* the lantern over the lit stretch (or at the morning end) */
  _placeLamp: function (z) {
    var lamp = this._qs('.et-lamp'), scene = this._qs('.et-scene'); if (!lamp || !scene) return;
    var target = z ? scene.querySelector('.et-zone.z-' + z) : scene.querySelector('.et-road .et-zone'), s = scene.getBoundingClientRect(), r = target.getBoundingClientRect(), lw = lamp.getBoundingClientRect().width || 64;
    /* over a stretch of open road the lantern hangs above it; at a tunnel it stands at the mouth, so it never covers the card inside */
    var tunnel = !!z && /^d/.test(z), left = !z ? r.left - s.left + 2 : tunnel ? r.left - s.left - lw * 0.45 : r.left - s.left + r.width / 2 - lw / 2;
    lamp.style.left = Math.max(0, Math.min(s.width - lw, left)) + 'px';
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { this._clearTimers(); this._view.note = ''; this._view.ok = ''; this._view.walk = null; this._view.hop = false; },
  _choose: function (w) { var r = EventTunnelCore.choose(this.st, w); if (r === 'no') return; this._moved(); this.api.sound(r === 'in' ? 520 : 320); this._paint(); },
  _zone: function (z) {
    var C = EventTunnelCore, st = this.st, r;
    if (st.rd.kind === 'place') r = C.place(st, z);
    else if (st.sel != null) r = C.put(st, z);
    else { var j = st.at.indexOf(z); r = j >= 0 ? C.take(st, j) : 'no'; }
    if (r === 'no') return; this._moved(); this.api.sound(r === 'on' ? 560 : 320); this._paint();
  },
  _card: function (i) { var r = EventTunnelCore.pick(this.st, i); if (r === 'no') return; this._moved(); this.api.sound(480); this._paint(); },
  /* free play: the lantern walks and lights the stretch the word means — no miss, no hint */
  _walk: function () {
    var st = this.st, z = EventTunnelCore.lit(st), self = this; if (!z || st.done) return;
    this._clearTimers(); this._view.walk = z; this._view.hop = false; this.api.sound(620); this._paint();
    this._sr(this._t('srLit', { w: this._where(z) }));
    this._later(function () { if (self.st === st && !st.done) { self._view.walk = null; self._paint(); } }, 1800);
  },
  _check: function () {
    var C = EventTunnelCore, st = this.st, v = this._view; if (st.done) return;
    this._clearTimers();
    var z = C.lit(st), res = C.check(st);
    if (res.result === 'ok') { this._success(); return; }
    v.ok = ''; v.note = this._t(C.hint(st)); v.walk = res.result === 'miss' ? z : null; v.hop = false;
    this.api.sound(res.result === 'empty' ? 400 : 220); this._paint(); this.api.announce(v.note);
  },
  _success: function () {
    var C = EventTunnelCore, st = this.st, rd = st.rd, v = this._view, msg;
    if (rd.kind === 'plan') { msg = this._t('okPlan'); v.walk = null; }
    else { var s = C.sentence(rd, rd.stretch).replace(/[.!]$/, ''); msg = this._t(C.okKey(rd), { s: s }); v.walk = rd.stretch; v.hop = true; }
    v.note = ''; v.ok = msg; this._fresh = 'ok'; this._miles++;
    this.api.sound(988); this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak && rd.kind !== 'plan') { try { LCSAudio.speak({ type: 'word', text: C.sentence(rd, rd.stretch), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
function injectEventTunnelCSS() {
  if (typeof document === 'undefined' || document.getElementById('et-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.et-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:stretch;gap:12px;user-select:none;-webkit-user-select:none;} .et-wrap:focus{outline:none;}'
  + '.et-main{display:flex;flex-direction:column;align-items:stretch;gap:12px;}'
  /* the strip */
  + '.et-strip{padding:8px 12px;border-radius:12px;background:#FFFDF4;box-shadow:inset 0 0 0 3px #D9C29A,0 3px 0 #D9C29A;}'
  + '.et-sent{margin:0;font-family:' + H + ';font-weight:800;font-size:26px;line-height:1.6;color:' + INK + ';text-align:center;overflow-wrap:break-word;} .et-sent b{color:#8C4A1E;}'
  + '.et-gap{display:inline-block;vertical-align:middle;width:120px;height:40px;margin:0 4px;border-radius:8px;border:3px dashed #B98A55;box-sizing:border-box;}'
  + '.et-gapw{display:inline-block;min-height:44px;margin:0 0 0 2px;padding:0 10px;border:0;border-radius:8px;background:#FBE9D2;box-shadow:inset 0 0 0 3px #E0A15E;font:inherit;color:' + INK + ';cursor:pointer;} .et-gapw b{color:#8C4A1E;} .et-gapw.is-ok{background:#DDF1EC;box-shadow:inset 0 0 0 3px #2E8C7E;} .et-gapw.is-ok b{color:#0E5C50;} .et-gapw.is-bad{box-shadow:inset 0 0 0 3px #F2784B;} .et-gapw:disabled{cursor:default;}'
  + '.et-list{margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:4px;} .et-li{display:flex;align-items:center;gap:8px;font-family:' + H + ';font-weight:800;font-size:21px;line-height:1.3;color:' + INK + ';} .et-li b{color:#8C4A1E;} .et-tag{flex:none;display:block;}'
  /* the scene: a sky band (dawn → dusk) over the road */
  + '.et-scene{position:relative;border-radius:14px;overflow:hidden;background:linear-gradient(90deg,#FFF2C2 0%,#EAF2F8 45%,#E3DDF2 100%);box-shadow:inset 0 0 0 3px #C9C2D8;}'
  + '.et-sky,.et-road{display:grid;} .et-skyc{display:flex;align-items:flex-end;justify-content:center;min-height:120px;padding-top:6px;} .et-pic{display:block;object-fit:contain;}'
  + '.et-zone{position:relative;display:flex;align-items:center;justify-content:center;min-height:120px;margin:0;padding:0 2px;border:0;background:none;font:inherit;} button.et-zone{cursor:pointer;} button.et-zone:disabled{cursor:default;}'
  + '.et-lane{position:absolute;left:0;right:0;bottom:10px;height:44px;background:#E8D9BC;border-top:3px solid #C4AC82;border-bottom:3px solid #C4AC82;z-index:0;} .et-lane::after{content:"";position:absolute;left:0;right:0;top:50%;border-top:3px dashed #FFF;}'
  + '.et-zone.is-tunnel .et-lane{background:#B9AF9F;}'
  + '.et-arch{position:absolute;left:4%;right:4%;bottom:6px;top:4px;border-radius:999px 999px 6px 6px;background:repeating-linear-gradient(0deg,#A39A8C 0 14px,#958B7C 14px 16px);box-shadow:inset 0 0 0 4px #7D7466;z-index:0;}'
  + '.et-arch::after{content:"";position:absolute;left:18%;right:18%;bottom:0;top:34%;border-radius:999px 999px 0 0;background:#4A4339;}'
  + '.et-win{position:absolute;z-index:1;top:16%;width:16px;height:16px;border-radius:50%;background:#5C5346;box-shadow:inset 0 0 0 3px #7D7466;transition:background .25s;} .et-win.w1{left:22%;} .et-win.w2{left:50%;margin-left:-8px;top:9%;} .et-win.w3{right:22%;}'
  + '.et-zone.is-lit{background:radial-gradient(ellipse at 50% 70%,rgba(255,214,102,.75),rgba(255,214,102,0) 70%);} .et-zone.is-tunnel.is-lit .et-win{background:#FFD666;box-shadow:0 0 10px #FFC93C,inset 0 0 0 3px #E2A93A;} .et-zone.is-tunnel.is-lit .et-arch::after{background:#8C6B2E;}'
  + '.et-zone.is-glow{box-shadow:inset 0 0 0 4px rgba(46,140,126,.75);border-radius:10px;animation:etPulse 1s ease-in-out infinite;} @keyframes etPulse{50%{box-shadow:inset 0 0 0 4px rgba(46,140,126,.3);}}'
  + '.et-wrap.show-stretch .et-zone{box-shadow:inset 0 0 0 3px rgba(140,98,57,.45);border-radius:10px;} .et-wrap.show-stretch .et-zone.is-glow{box-shadow:inset 0 0 0 4px rgba(46,140,126,.75);}'
  /* the action card on the road */
  + '.et-act{position:relative;z-index:2;max-width:92%;padding:6px 10px;border-radius:8px;background:#FFFDF4;box-shadow:0 0 0 3px #B98A55,0 4px 0 #8C6239;font-family:' + H + ';font-weight:800;font-size:19px;line-height:1.15;color:' + INK + ';text-align:center;overflow-wrap:break-word;hyphens:auto;}'
  + '.et-act.is-ok{box-shadow:0 0 0 3px #2E8C7E,0 0 14px rgba(255,201,60,.9);} .et-act.is-bad{box-shadow:0 0 0 3px #F2784B,0 4px 0 #8C6239;} .et-act.is-hop{animation:etHop .5s ease-out .6s;} @keyframes etHop{40%{transform:translateY(-12px);}}'
  + '.et-pin{position:relative;z-index:2;display:inline-flex;align-items:center;gap:4px;padding:4px 6px;border-radius:8px;background:#FFFDF4;box-shadow:0 0 0 3px #B98A55;font-family:' + H + ';font-weight:800;font-size:14px;line-height:1.1;color:' + INK + ';max-width:94%;} .et-pin em{font-style:normal;overflow-wrap:anywhere;} .et-pin.is-ok{box-shadow:0 0 0 3px #2E8C7E,0 0 10px rgba(255,201,60,.9);}'
  /* the lantern */
  + '.et-lamp{position:absolute;z-index:4;top:6px;left:0;padding:0;border:0;background:none;cursor:pointer;transition:left .9s ease-in-out;} .et-lamp:disabled{cursor:default;} .et-lampimg{display:block;object-fit:contain;filter:drop-shadow(0 0 0 rgba(255,201,60,0));} .et-lamp[class*="at-"]{pointer-events:none;} .et-lamp[class*="at-"] .et-lampimg{filter:drop-shadow(0 0 12px rgba(255,201,60,.95));}'
  + '.et-miles{position:absolute;z-index:3;right:6px;top:6px;display:flex;gap:3px;} .et-miles i{display:block;width:10px;height:14px;border-radius:2px;background:#FFFDF4;box-shadow:inset 0 0 0 2px #B98A55;}'
  /* the rack and the shelf */
  + '.et-rack,.et-shelf{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;padding:8px;border-radius:12px;background:#EFE3C8;box-shadow:inset 0 0 0 3px #D9C29A;min-height:60px;}'
  + '.et-word,.et-card{display:inline-flex;align-items:center;justify-content:center;gap:6px;min-height:56px;min-width:44px;padding:6px 14px;border:0;border-radius:10px;background:#FFF8E8;box-shadow:inset 0 0 0 3px #C9B48E,0 4px 0 #C9B48E;font-family:' + H + ';font-weight:800;font-size:21px;line-height:1.15;color:' + INK + ';cursor:pointer;text-align:center;}'
  + '.et-word b{color:#8C4A1E;} .et-word.is-in{opacity:.45;} .et-word.is-glow{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #2E8C7E,0 0 0 5px rgba(46,140,126,.3),0 4px 0 #1B5F55;} .et-word:disabled,.et-card:disabled{cursor:default;}'
  + '.et-card.is-sel{transform:translateY(-6px);box-shadow:inset 0 0 0 3px #2E8C7E,0 4px 0 #1B5F55;} .et-shelfempty{display:block;height:44px;}'
  + '.et-wrap.k-place .et-card{opacity:1;}'
  + '.et-foot{display:flex;justify-content:center;} .et-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;box-shadow:0 5px 0 #0E4A41;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;} .et-check:disabled{opacity:.5;cursor:default;}'
  + '.et-note{margin:0;min-height:1.3em;max-width:640px;align-self:center;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .et-note.is-hint{color:#9A3D1C;}'
  + '.et-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.et-wrap.is-narrow,.et-wrap.is-narrow .et-main{gap:9px;} .et-wrap.is-narrow .et-sent{font-size:21px;line-height:1.55;} .et-wrap.is-narrow .et-strip{padding:6px 8px;} .et-wrap.is-narrow .et-li{font-size:17px;}'
  + '.et-wrap.is-narrow .et-skyc{min-height:84px;} .et-wrap.is-narrow .et-zone{min-height:104px;} .et-wrap.is-narrow .et-act{font-size:15px;padding:4px 5px;max-width:96%;} .et-wrap.is-narrow .et-lane{height:36px;bottom:8px;}'
  + '.et-wrap.is-narrow .et-word,.et-wrap.is-narrow .et-card{font-size:17px;min-height:50px;padding:4px 10px;} .et-wrap.is-narrow .et-rack,.et-wrap.is-narrow .et-shelf{gap:6px;padding:6px;}'
  + '.et-wrap.is-narrow .et-check{min-height:48px;min-width:130px;padding:6px 18px;font-size:20px;} .et-wrap.is-narrow .et-note{font-size:17px;} .et-wrap.is-narrow .et-win{width:12px;height:12px;} .et-wrap.is-narrow .et-win.w2{margin-left:-6px;}'
  + '.et-wrap.is-narrow.k-plan .et-lamp{display:none;} .et-wrap.is-narrow .et-pin{padding:3px;} .et-wrap.is-narrow.k-plan .et-card{min-width:56px;min-height:52px;padding:4px;} .et-wrap.is-narrow.k-plan .et-card .et-tag{width:30px;height:30px;} .et-wrap.is-narrow.k-plan .et-shelf{flex-wrap:nowrap;}'
  + '.et-wrap.is-tiny .et-sent{font-size:18px;line-height:1.5;} .et-wrap.is-tiny .et-act{font-size:14px;}'
  + '.et-wrap.is-narrow .et-word{font-size:15px;min-height:46px;padding:2px 8px;} .et-wrap.is-narrow .et-skyc{min-height:80px;} .et-wrap.is-narrow .et-zone{min-height:96px;} .et-wrap.is-narrow .et-gapw{min-height:44px;padding:0 6px;}'
  + '.et-wrap.is-tiny,.et-wrap.is-tiny .et-main{gap:6px;} .et-wrap.is-tiny .et-skyc{min-height:68px;padding-top:2px;} .et-wrap.is-tiny .et-zone{min-height:88px;} .et-wrap.is-tiny .et-rack,.et-wrap.is-tiny .et-shelf{gap:4px;padding:4px;} .et-wrap.is-tiny .et-word{min-height:44px;font-size:14px;} .et-wrap.is-tiny .et-strip{padding:4px 6px;}'
  /* a solved round on a phone: the rack, the shelf and Check give their room to the shell's Next */
  + '.et-wrap.is-narrow.is-done .et-rack,.et-wrap.is-narrow.is-done .et-shelf,.et-wrap.is-narrow.is-done .et-foot{display:none;}'
  + '.et-wrap.is-fast *{animation:none !important;transition:none !important;}'
  + '@media (prefers-reduced-motion: reduce){.et-wrap *{animation:none !important;transition:none !important;}}'
  + '.et-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'et-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.EventTunnelActivity = EventTunnelActivity;
