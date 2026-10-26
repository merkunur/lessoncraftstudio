/* =====================================================================
   point-of-view-activity.js — ACTIVITY #119 of the one-by-one rebuild:
   "Lumen's Lighthouse Windows" → THE WINDOW THAT SHOWS WHAT IT SEES
   (RL.1.6; all 11 locales). Model: point-of-view-core.js
   (LumenWindowsCore).
   Design: docs/activities-rebuild/designs/119-point-of-view.md
   ---------------------------------------------------------------------
   A story card (what happened, and the storyteller's words), a drawn
   lighthouse with three windows — a creature looking out of each — and a
   view panel. Tap a window: the panel shows the harbor exactly as that
   creature sees it (high: a tiny dot far below; middle: straight across;
   low: so huge it is cut off by the frame). Check: Lumen's beam swings to
   the window; only the window whose view matches the words is the
   storyteller's. Level 2 hangs each line of a story on the window of the
   one who tells it — a line about wings cannot belong to the mouse.
   From miss 2 the three views lie side by side (Level 2: each creature's
   parts are listed under it). No timer, no score. Test seams:
   window.PointOfViewActivity.st / ._pool / ._order / ._ensurePool /
   ._start / ._dims / ._render2 / .FAST / .OK_MS.
   ===================================================================== */
var PointOfViewActivity = {
  id: 'point-of-view',
  /* the drawn apparatus (the hierarchy gate): the lighthouse and its view panel */
  apparatusClasses: ['pv-towerart', 'pv-viewart', 'pv-lampart'],
  /*STRINGS-BEGIN*/strings: {
    title: {en:"Lumen's Lighthouse Windows",de:"Lumens Leuchtturmfenster",fr:"Les fenêtres du phare de Lumen",es:"Las ventanas del faro de Lumen",pt:"As janelas do farol da Lumen",it:"Le finestre del faro di Lumen",nl:"De vuurtorenramen van Lumen",sv:"Lumens fyrfönster",da:"Lumens fyrtårnsvinduer",no:"Lumens fyrvinduer",fi:"Lumenin majakan ikkunat"},
    instruction: {en:"Read what the storyteller saw. Which window was it told from?",de:"Lies, was erzählt wird. Aus welchem Fenster wurde es erzählt?",fr:"Lis ce que le conteur a vu. De quelle fenêtre est-ce raconté ?",es:"Lee lo que vio quien lo cuenta. ¿Desde qué ventana lo contó?",pt:"Leia o que quem conta viu. De qual janela foi contado?",it:"Leggi che cosa ha visto chi racconta. Da quale finestra è raccontato?",nl:"Lees wat de verteller zag. Vanuit welk raam is het verteld?",sv:"Läs vad berättaren såg. Från vilket fönster berättades det?",da:"Læs, hvad fortælleren så. Fra hvilket vindue blev det fortalt?",no:"Les hva fortelleren så. Fra hvilket vindu ble det fortalt?",fi:"Lue, mitä kertoja näki. Mistä ikkunasta se kerrottiin?"},
    instrBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    okBubble: {en:"{msg}",de:"{msg}",fr:"{msg}",es:"{msg}",pt:"{msg}",it:"{msg}",nl:"{msg}",sv:"{msg}",da:"{msg}",no:"{msg}",fi:"{msg}"},
    check: {en:"Check",de:"Prüfen",fr:"Vérifier",es:"Comprobar",pt:"Verificar",it:"Controlla",nl:"Controleer",sv:"Kontrollera",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    tWindow: {en:"Read what the storyteller saw. Which window was it told from?",de:"Lies, was erzählt wird. Aus welchem Fenster wurde es erzählt?",fr:"Lis ce que le conteur a vu. De quelle fenêtre est-ce raconté ?",es:"Lee lo que vio quien lo cuenta. ¿Desde qué ventana lo contó?",pt:"Leia o que quem conta viu. De qual janela foi contado?",it:"Leggi che cosa ha visto chi racconta. Da quale finestra è raccontato?",nl:"Lees wat de verteller zag. Vanuit welk raam is het verteld?",sv:"Läs vad berättaren såg. Från vilket fönster berättades det?",da:"Læs, hvad fortælleren så. Fra hvilket vindue blev det fortalt?",no:"Les hva fortelleren så. Fra hvilket vindu ble det fortalt?",fi:"Lue, mitä kertoja näki. Mistä ikkunasta se kerrottiin?"},
    tTellers: {en:"Who is telling each part? Give each part to its teller.",de:"Wer erzählt welchen Teil? Gib jeden Teil dem, der ihn erzählt.",fr:"Qui raconte chaque partie ? Donne-la à son conteur.",es:"¿Quién cuenta cada parte? Dale cada parte a quien la cuenta.",pt:"Quem conta cada parte? Dê cada parte a quem a conta.",it:"Chi racconta ogni parte? Dai ogni parte a chi la racconta.",nl:"Wie vertelt welk deel? Geef elk deel aan wie het vertelt.",sv:"Vem berättar vilken del? Ge varje del till den som berättar den.",da:"Hvem fortæller hvilken del? Giv hver del til den, der fortæller den.",no:"Hvem forteller hvilken del? Gi hver del til den som forteller den.",fi:"Kuka kertoo minkäkin osan? Anna jokainen osa sen kertojalle."},
    nudgeWindow: {en:"Tap a window to see what that creature sees. Then press Check.",de:"Tippe ein Fenster an und sieh, was das Tier sieht. Dann drück auf Prüfen.",fr:"Touche une fenêtre pour voir ce que voit l’animal. Puis appuie sur Vérifier.",es:"Toca una ventana para ver lo que ve ese animal. Luego presiona Comprobar.",pt:"Toque em uma janela para ver o que aquele bicho vê. Depois toque em Verificar.",it:"Tocca una finestra per vedere che cosa vede quell’animale. Poi premi Controlla.",nl:"Tik op een raam en kijk wat dat dier ziet. Druk dan op Controleer.",sv:"Tryck på ett fönster och se vad djuret ser. Tryck sedan på Kontrollera.",da:"Tryk på et vindue, og se, hvad dyret ser. Tryk så på Tjek.",no:"Trykk på et vindu og se hva dyret ser. Trykk så på Sjekk.",fi:"Napauta ikkunaa ja katso, mitä eläin näkee. Paina sitten Tarkista."},
    nudgeTellers: {en:"Tap a part of the story, then tap the window of the one who tells it.",de:"Tippe einen Teil der Geschichte an, dann das Fenster von dem, der ihn erzählt.",fr:"Touche une partie de l’histoire, puis la fenêtre de celui qui la raconte.",es:"Toca una parte del cuento y luego la ventana de quien la cuenta.",pt:"Toque em uma parte da história e depois na janela de quem a conta.",it:"Tocca una parte della storia, poi la finestra di chi la racconta.",nl:"Tik op een deel van het verhaal en dan op het raam van wie het vertelt.",sv:"Tryck på en del av berättelsen och sedan på fönstret hos den som berättar den.",da:"Tryk på en del af historien og så på vinduet hos den, der fortæller den.",no:"Trykk på en del av historien og så på vinduet til den som forteller den.",fi:"Napauta tarinan osaa ja sitten sen ikkunaa, joka sen kertoo."},
    hintEmptyWindow: {en:"Tap a window to see what that creature sees.",de:"Tippe ein Fenster an und sieh, was das Tier sieht.",fr:"Touche une fenêtre pour voir ce que voit l’animal.",es:"Toca una ventana para ver lo que ve ese animal.",pt:"Toque em uma janela para ver o que aquele bicho vê.",it:"Tocca una finestra per vedere che cosa vede quell’animale.",nl:"Tik op een raam en kijk wat dat dier ziet.",sv:"Tryck på ett fönster och se vad djuret ser.",da:"Tryk på et vindue, og se, hvad dyret ser.",no:"Trykk på et vindu og se hva dyret ser.",fi:"Napauta ikkunaa ja katso, mitä eläin näkee."},
    hintEmptyTellers: {en:"Give every part of the story to a window first.",de:"Gib zuerst jeden Teil der Geschichte einem Fenster.",fr:"Donne d’abord chaque partie de l’histoire à une fenêtre.",es:"Primero dale cada parte del cuento a una ventana.",pt:"Primeiro dê cada parte da história a uma janela.",it:"Prima dai ogni parte della storia a una finestra.",nl:"Geef eerst elk deel van het verhaal aan een raam.",sv:"Ge först varje del av berättelsen till ett fönster.",da:"Giv først hver del af historien til et vindue.",no:"Gi først hver del av historien til et vindu.",fi:"Anna ensin jokainen tarinan osa jollekin ikkunalle."},
    hintL1Miss1: {en:"Look at the view from this window. Does it match the storyteller's words?",de:"Schau dir die Sicht aus diesem Fenster an. Passt sie zu den Worten?",fr:"Regarde la vue depuis cette fenêtre. Est-ce qu’elle va avec les mots du conteur ?",es:"Mira lo que se ve desde esta ventana. ¿Coincide con lo que dice quien lo cuenta?",pt:"Olhe a vista desta janela. Ela combina com as palavras de quem conta?",it:"Guarda la vista da questa finestra. Va d’accordo con le parole di chi racconta?",nl:"Kijk naar het uitzicht uit dit raam. Past het bij de woorden van de verteller?",sv:"Titta på utsikten från det här fönstret. Passar den med berättarens ord?",da:"Se på udsigten fra det her vindue. Passer den med fortællerens ord?",no:"Se på utsikten fra dette vinduet. Passer den med ordene til fortelleren?",fi:"Katso näkymää tästä ikkunasta. Sopiiko se kertojan sanoihin?"},
    hintL1Miss2: {en:"Compare the three views. Which one fits the storyteller's words?",de:"Vergleiche die drei Ansichten. Welche passt zu den Worten?",fr:"Compare les trois vues. Laquelle va avec les mots du conteur ?",es:"Compara las tres vistas. ¿Cuál coincide con lo que dice quien lo cuenta?",pt:"Compare as três vistas. Qual combina com as palavras de quem conta?",it:"Confronta le tre viste. Quale va d’accordo con le parole di chi racconta?",nl:"Vergelijk de drie uitzichten. Welk past bij de woorden van de verteller?",sv:"Jämför de tre utsikterna. Vilken passar med berättarens ord?",da:"Sammenlign de tre udsigter. Hvilken passer med fortællerens ord?",no:"Sammenlign de tre utsiktene. Hvilken passer med ordene til fortelleren?",fi:"Vertaa kolmea näkymää. Mikä niistä sopii kertojan sanoihin?"},
    hintPart: {en:"Does {name} have {hp}? Who could say this?",de:"Hat {name} {hp}? Wer könnte das sagen?",fr:"Est-ce que {name} a {hp} ? Qui pourrait dire ça ?",es:"¿{name} tiene {hp}? ¿Quién podría decir esto?",pt:"{name} tem {hp}? Quem poderia dizer isso?",it:"{name} ha {hp}? Chi potrebbe dirlo?",nl:"Heeft {name} {hp}? Wie zou dit kunnen zeggen?",sv:"Har {name} {hp}? Vem kan säga så?",da:"Har {name} {hp}? Hvem kunne sige det?",no:"Har {name} {hp}? Hvem kunne sagt dette?",fi:"Onko {nameAd} {hp}? Kuka voisi sanoa näin?"},
    hintView: {en:"Could {name} see that from this window?",de:"Könnte {name} das aus diesem Fenster sehen?",fr:"Est-ce que {name} pourrait voir ça depuis cette fenêtre ?",es:"¿{name} podría ver eso desde esta ventana?",pt:"{name} conseguiria ver isso desta janela?",it:"{name} potrebbe vederlo da questa finestra?",nl:"Kan {name} dat vanuit dit raam zien?",sv:"Kan {name} se det från det här fönstret?",da:"Kan {name} se det fra det her vindue?",no:"Kan {name} se det fra dette vinduet?",fi:"Voisiko {name} nähdä tuon tästä ikkunasta?"},
    hintL2Miss2: {en:"Find the creature that has what the line says.",de:"Finde das Tier, zu dem passt, was im Satz steht.",fr:"Trouve l’animal qui a ce que dit la phrase.",es:"Busca el animal que tiene lo que dice la frase.",pt:"Encontre o bicho que tem o que a frase diz.",it:"Trova l’animale che ha quello che dice la frase.",nl:"Zoek het dier dat heeft wat de zin zegt.",sv:"Hitta djuret som har det som meningen säger.",da:"Find dyret, der har det, sætningen siger.",no:"Finn dyret som har det setningen sier.",fi:"Etsi eläin, jolla on se, mistä lause kertoo."},
    okHigh: {en:"Yes! {name} told it from the high window!",de:"Ja! {name} hat es aus dem oberen Fenster erzählt!",fr:"Oui ! {name} l’a raconté depuis la fenêtre du haut !",es:"¡Sí! {name} lo contó desde la ventana de arriba.",pt:"Isso! {name} contou da janela de cima!",it:"Sì! {name} l’ha raccontato dalla finestra in alto!",nl:"Ja! {name} vertelde het vanuit het bovenste raam!",sv:"Ja! {name} berättade det från det översta fönstret!",da:"Ja! {name} fortalte det fra det øverste vindue!",no:"Ja! {name} fortalte det fra det øverste vinduet!",fi:"Kyllä! {name} kertoi sen ylimmästä ikkunasta!"},
    okMid: {en:"Yes! {name} told it from the middle window!",de:"Ja! {name} hat es aus dem mittleren Fenster erzählt!",fr:"Oui ! {name} l’a raconté depuis la fenêtre du milieu !",es:"¡Sí! {name} lo contó desde la ventana de en medio.",pt:"Isso! {name} contou da janela do meio!",it:"Sì! {name} l’ha raccontato dalla finestra in mezzo!",nl:"Ja! {name} vertelde het vanuit het middelste raam!",sv:"Ja! {name} berättade det från det mittersta fönstret!",da:"Ja! {name} fortalte det fra det midterste vindue!",no:"Ja! {name} fortalte det fra det midterste vinduet!",fi:"Kyllä! {name} kertoi sen keskimmäisestä ikkunasta!"},
    okLow: {en:"Yes! {name} told it from the low window!",de:"Ja! {name} hat es aus dem unteren Fenster erzählt!",fr:"Oui ! {name} l’a raconté depuis la fenêtre du bas !",es:"¡Sí! {name} lo contó desde la ventana de abajo.",pt:"Isso! {name} contou da janela de baixo!",it:"Sì! {name} l’ha raccontato dalla finestra in basso!",nl:"Ja! {name} vertelde het vanuit het onderste raam!",sv:"Ja! {name} berättade det från det nedersta fönstret!",da:"Ja! {name} fortalte det fra det nederste vindue!",no:"Ja! {name} fortalte det fra det nederste vinduet!",fi:"Kyllä! {name} kertoi sen alimmasta ikkunasta!"},
    okTellers: {en:"Yes! Every part went to the one who told it!",de:"Ja! Jeder Teil ist bei dem, der ihn erzählt hat!",fr:"Oui ! Chaque partie est allée à celui qui l’a racontée !",es:"¡Sí! Cada parte quedó con quien la contó.",pt:"Isso! Cada parte foi para quem a contou!",it:"Sì! Ogni parte è andata a chi l’ha raccontata!",nl:"Ja! Elk deel ging naar wie het vertelde!",sv:"Ja! Varje del kom till den som berättade den!",da:"Ja! Hver del kom til den, der fortalte den!",no:"Ja! Hver del kom til den som fortalte den!",fi:"Kyllä! Jokainen osa meni kertojalleen!"},
    winHigh: {en:"High window: {name}",de:"Oberes Fenster: {name}",fr:"Fenêtre du haut : {name}",es:"Ventana de arriba: {name}",pt:"Janela de cima: {name}",it:"Finestra in alto: {name}",nl:"Bovenste raam: {name}",sv:"Översta fönstret: {name}",da:"Øverste vindue: {name}",no:"Øverste vindu: {name}",fi:"Ylin ikkuna: {name}"},
    winMid: {en:"Middle window: {name}",de:"Mittleres Fenster: {name}",fr:"Fenêtre du milieu : {name}",es:"Ventana de en medio: {name}",pt:"Janela do meio: {name}",it:"Finestra in mezzo: {name}",nl:"Middelste raam: {name}",sv:"Mittersta fönstret: {name}",da:"Midterste vindue: {name}",no:"Midterste vindu: {name}",fi:"Keskimmäinen ikkuna: {name}"},
    winLow: {en:"Low window: {name}",de:"Unteres Fenster: {name}",fr:"Fenêtre du bas : {name}",es:"Ventana de abajo: {name}",pt:"Janela de baixo: {name}",it:"Finestra in basso: {name}",nl:"Onderste raam: {name}",sv:"Nedersta fönstret: {name}",da:"Nederste vindue: {name}",no:"Nederste vindu: {name}",fi:"Alin ikkuna: {name}"},
    aLine: {en:"The storyteller says: {t}",de:"Erzählt wird: {t}",fr:"Le conteur dit : {t}",es:"Quien lo cuenta dice: {t}",pt:"Quem conta diz: {t}",it:"Chi racconta dice: {t}",nl:"De verteller zegt: {t}",sv:"Berättaren säger: {t}",da:"Fortælleren siger: {t}",no:"Fortelleren sier: {t}",fi:"Kertoja sanoo: {t}"},
    aPart: {en:"Part {i}: {t}",de:"Teil {i}: {t}",fr:"Partie {i} : {t}",es:"Parte {i}: {t}",pt:"Parte {i}: {t}",it:"Parte {i}: {t}",nl:"Deel {i}: {t}",sv:"Del {i}: {t}",da:"Del {i}: {t}",no:"Del {i}: {t}",fi:"Osa {i}: {t}"},
    aViewHigh: {en:"From the high window, things look tiny and far away.",de:"Aus dem oberen Fenster sieht alles winzig und weit weg aus.",fr:"Depuis la fenêtre du haut, tout paraît minuscule et loin.",es:"Desde la ventana de arriba, todo se ve pequeñito y lejos.",pt:"Da janela de cima, tudo parece pequenininho e longe.",it:"Dalla finestra in alto tutto sembra piccolissimo e lontano.",nl:"Vanuit het bovenste raam ziet alles er piepklein en ver weg uit.",sv:"Från det översta fönstret ser allt pyttelitet och långt bort ut.",da:"Fra det øverste vindue ser alt bitte lille og langt væk ud.",no:"Fra det øverste vinduet ser alt bitte lite og langt borte ut.",fi:"Ylimmästä ikkunasta kaikki näyttää pikkuruiselta ja kaukaiselta."},
    aViewMid: {en:"From the middle window, things are straight across, not higher, not lower.",de:"Aus dem mittleren Fenster ist alles genau gegenüber, nicht höher und nicht tiefer.",fr:"Depuis la fenêtre du milieu, tout est juste en face, ni plus haut ni plus bas.",es:"Desde la ventana de en medio, todo está justo enfrente, ni más arriba ni más abajo.",pt:"Da janela do meio, tudo fica bem em frente, nem mais alto, nem mais baixo.",it:"Dalla finestra in mezzo tutto è proprio di fronte, né più su né più giù.",nl:"Vanuit het middelste raam is alles recht tegenover, niet hoger en niet lager.",sv:"Från det mittersta fönstret är allt mitt emot, inte högre och inte lägre.",da:"Fra det midterste vindue er alt lige over for, hverken højere eller lavere.",no:"Fra det midterste vinduet er alt rett overfor, verken høyere eller lavere.",fi:"Keskimmäisestä ikkunasta kaikki on suoraan vastapäätä, ei ylempänä eikä alempana."},
    aViewLow: {en:"From the low window, things look huge and close.",de:"Aus dem unteren Fenster sieht alles riesig und ganz nah aus.",fr:"Depuis la fenêtre du bas, tout paraît énorme et tout près.",es:"Desde la ventana de abajo, todo se ve enorme y muy cerca.",pt:"Da janela de baixo, tudo parece enorme e pertinho.",it:"Dalla finestra in basso tutto sembra enorme e vicinissimo.",nl:"Vanuit het onderste raam ziet alles er enorm en vlakbij uit.",sv:"Från det nedersta fönstret ser allt jättestort och alldeles nära ut.",da:"Fra det nederste vindue ser alt kæmpestort og helt tæt på ud.",no:"Fra det nederste vinduet ser alt kjempestort og helt nær ut.",fi:"Alimmasta ikkunasta kaikki näyttää valtavalta ja on ihan lähellä."},
    aLog: {en:"Lumen's logbook: {n}",de:"Lumens Logbuch: {n}",fr:"Le carnet de Lumen : {n}",es:"La bitácora de Lumen: {n}",pt:"O diário de bordo da Lumen: {n}",it:"Il diario di bordo di Lumen: {n}",nl:"Het logboek van Lumen: {n}",sv:"Lumens loggbok: {n}",da:"Lumens logbog: {n}",no:"Lumens loggbok: {n}",fi:"Lumenin lokikirja: {n}"},
    partsGull: {en:"wings · beak",de:"Flügel · Schnabel",fr:"ailes · bec",es:"alas · pico",pt:"asas · bico",it:"ali · becco",nl:"vleugels · snavel",sv:"vingar · näbb",da:"vinger · næb",no:"vinger · nebb",fi:"siivet · nokka"},
    partsMouse: {en:"long thin tail",de:"langer dünner Schwanz",fr:"longue queue fine",es:"cola larga y delgada",pt:"rabo comprido e fino",it:"coda lunga e sottile",nl:"lange dunne staart",sv:"lång smal svans",da:"lang tynd hale",no:"lang tynn hale",fi:"pitkä ohut häntä"},
    partsRabbit: {en:"long ears · big back feet",de:"lange Ohren · große Hinterbeine",fr:"longues oreilles · grandes pattes arrière",es:"orejas largas · grandes patas traseras",pt:"orelhas compridas · patas de trás grandes",it:"orecchie lunghe · grandi zampe posteriori",nl:"lange oren · grote achterpoten",sv:"långa öron · stora bakfötter",da:"lange ører · store bagben",no:"lange ører · store bakbein",fi:"pitkät korvat · isot takajalat"},
    partsCrab: {en:"pincers · shell",de:"Scheren · Panzer",fr:"pinces · carapace",es:"pinzas · caparazón",pt:"pinças · carapaça",it:"chele · guscio",nl:"scharen · schild",sv:"skal · går i sidled",da:"skjold · går sidelæns",no:"skall · går sidelengs",fi:"sakset · kuori"},
    setTask: {en:"Task",de:"Aufgabe",fr:"Activité",es:"Actividad",pt:"Atividade",it:"Attività",nl:"Opdracht",sv:"Uppgift",da:"Opgave",no:"Oppgave",fi:"Tehtävä"},
    tWin: {en:"From which window?",de:"Aus welchem Fenster?",fr:"De quelle fenêtre ?",es:"¿Desde qué ventana?",pt:"De qual janela?",it:"Da quale finestra?",nl:"Vanuit welk raam?",sv:"Från vilket fönster?",da:"Fra hvilket vindue?",no:"Fra hvilket vindu?",fi:"Mistä ikkunasta?"},
    tTell: {en:"Who tells each part?",de:"Wer erzählt welchen Teil?",fr:"Qui raconte chaque partie ?",es:"¿Quién cuenta cada parte?",pt:"Quem conta cada parte?",it:"Chi racconta ogni parte?",nl:"Wie vertelt welk deel?",sv:"Vem berättar vilken del?",da:"Hvem fortæller hvilken del?",no:"Hvem forteller hvilken del?",fi:"Kuka kertoo minkäkin osan?"},
    setViews: {en:"View panel",de:"Aussicht",fr:"La vue",es:"La vista",pt:"A vista",it:"La vista",nl:"Uitzicht",sv:"Utsikt",da:"Udsigt",no:"Utsikt",fi:"Näkymä"},
    vAfter: {en:"Shows after you choose",de:"Erst nach der Wahl",fr:"Après ton choix",es:"Después de elegir",pt:"Depois de escolher",it:"Dopo la scelta",nl:"Na je keuze",sv:"Efter valet",da:"Efter valget",no:"Etter valget",fi:"Valinnan jälkeen"},
    vAll: {en:"Always shows all three views",de:"Immer alle drei Ansichten",fr:"Toujours les trois vues",es:"Siempre las tres vistas",pt:"Sempre as três vistas",it:"Sempre tutte e tre le viste",nl:"Altijd alle drie de uitzichten",sv:"Alltid alla tre utsikterna",da:"Altid alle tre udsigter",no:"Alltid alle tre utsiktene",fi:"Aina kaikki kolme näkymää"},
  },/*STRINGS-END*/

  defaults: { task: 'window', views: 'after' },
  settings: [
    { key: 'task', type: 'choice', labelKey: 'setTask', options: [{ value: 'window', labelKey: 'tWin' }, { value: 'tellers', labelKey: 'tTell' }] },
    { key: 'views', type: 'choice', labelKey: 'setViews', options: [{ value: 'after', labelKey: 'vAfter' }, { value: 'all', labelKey: 'vAll' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._at = 0;
    this._timers = []; this._ro = null; this._view = {}; this._log = {}; this._nudged = {}; this._anim = null; this._lastView = null;
    injectLumenWindowsCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; this._anim = null; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return LumenWindowsCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return LumenWindowsCore.levelOf(this._setting('task')); },
  _allViews: function () { return this._setting('views') === 'all'; },
  _key: function () { return this._loc() + '/' + this._level(); },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = LumenWindowsCore.rounds(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = LumenWindowsCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var P = C.plan(this._level(), Math.random, fresh ? null : this._prev);
      this._prev = P.order; this._order = P.order.slice(); this._orderForPool = pool; this._pass = pass; this._log[this._key()] = 0;
    }
    var r = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'lumen.' + this._key() + '.' + r, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(r, at); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _setPrompt: function () { var line = this._t(this.st.level === 'tellers' ? 'tTellers' : 'tWindow'); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (r, at) {
    this._clearTimers(); this._at = at || 0;
    this.st = LumenWindowsCore.newState(this._loc(), this._level(), r);
    this._view = { note: '', ok: '' }; this._lastView = null;
    if (!this._nudged[this.st.level]) { this._view.note = this._t(this.st.level === 'tellers' ? 'nudgeTellers' : 'nudgeWindow'); this._view.nudge = true; }
    this._setPrompt();
  },
  _clearHelp: function () { if (this._view.nudge) this._nudged[this.st.level] = true; this._view.note = ''; this._view.nudge = false; },
  _name: function (key) { return LumenWindowsCore.name(this._loc(), key); },

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
    var wrap = api.el('div', 'pv-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="pv-top"></div><div class="pv-main"></div><div class="pv-foot"></div><p class="pv-note" aria-live="polite"></p><div class="pv-log"></div><p class="pv-sr" aria-live="polite"></p>';
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
    var W = this._width(), B = LumenWindowsCore.band(W);
    var win = B.wide ? 108 : B.xs ? 70 : 80, pic = B.wide ? 96 : 64;
    return { W: W, wide: B.wide, tiny: B.tiny, xs: B.xs, win: win, pic: pic, ev: B.wide ? 96 : B.xs ? 64 : 72, col: B.wide ? 150 : win + 12, gap: B.wide ? 10 : 6 };
  },
  _img: function (pic, size) { return '<img src="/image-library-webp/themes/' + pic + '@2x.webp" alt="" width="' + size + '" height="' + size + '" draggable="false">'; },
  _sr: function (s) { var el = this._qs('.pv-sr'); if (el) el.textContent = s; },

  _paint_: function () {
    var C = LumenWindowsCore, st = this.st, D = this._dims(), v = this._view, self = this, help = C.help(st);
    this._wrap.className = 'pv-wrap ' + (D.wide ? 'is-wide' : 'is-narrow') + (D.tiny ? ' is-tiny' : '') + (D.xs ? ' is-xs' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' lv-' + st.level + (help ? ' is-help' : '');
    var top = this._qs('.pv-top'); top.innerHTML = ''; top.appendChild(st.level === 'window' ? this._storyCard(D) : this._tray(D));
    var main = this._qs('.pv-main'); main.innerHTML = ''; main.appendChild(this._lighthouse(D));
    var foot = this._qs('.pv-foot'); foot.innerHTML = '';
    var chk = this._btn('pv-check', 'check', null, '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + esc(this._t('check')) + '</span>');
    chk.disabled = st.done || !!this._anim; chk.addEventListener('click', function () { self._check(); });
    foot.appendChild(chk);
    var note = this._qs('.pv-note');
    if (v.ok) { note.textContent = v.ok; note.className = 'pv-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'pv-note' + (v.nudge ? ' is-nudge' : ' is-hint'); }
    else { note.textContent = ''; note.className = 'pv-note'; }
    /* Lumen's logbook: one page per round told this pass */
    var n = this._log[this._key()] || 0, log = this._qs('.pv-log'); log.setAttribute('role', 'img'); log.setAttribute('aria-label', this._t('aLog', { n: n }));
    var lh = ''; for (var k = 0; k < this._pool.length; k++) lh += '<i class="pv-tab' + (k < n ? ' is-on' : '') + '"></i>'; log.innerHTML = lh;
  },
  /* Level 1: what happened (with its picture) and the storyteller's words */
  _storyCard: function (D) {
    var st = this.st, R = st.R, c = document.createElement('div'), help = LumenWindowsCore.help(st) || (st.last === 'miss' && !this._anim);
    c.className = 'pv-story';
    c.innerHTML = '<span class="pv-evpic" aria-hidden="true">' + this._img(R.pic, D.ev) + '</span><span class="pv-stext"><span class="pv-event">' + esc(R.event) + '</span>' +
      '<span class="pv-line" role="note" aria-label="' + esc(this._t('aLine', { t: R.line })) + '">' + markUp(R.line, help ? R.marks : [], 'pv-mk' + (LumenWindowsCore.help(st) ? ' is-pulse' : '')) + '</span></span>';
    return c;
  },
  /* Level 2: the story's three parts, in order; a part already given to a window leaves an empty slot */
  _tray: function (D) {
    var st = this.st, self = this, t = document.createElement('div'), help = LumenWindowsCore.help(st);
    t.className = 'pv-tray';
    st.R.lines.forEach(function (l, i) {
      if (st.hang[i]) { var g = document.createElement('div'); g.className = 'pv-slot'; g.setAttribute('aria-hidden', 'true'); t.appendChild(g); return; }
      t.appendChild(self._lineBtn(i, help));
    });
    return t;
  },
  _lineBtn: function (i, marks) {
    var st = this.st, self = this, l = st.R.lines[i], ok = st.locked[i] || (st.done);
    var b = this._btn('pv-part' + (st.pick === i ? ' is-pick' : '') + (ok ? ' is-ok' : ''), 'part-' + i, this._t('aPart', { i: i + 1, t: l.t }),
      '<span class="pv-pnum" aria-hidden="true">' + (i + 1) + '</span><span class="pv-ptext">' + markUp(l.t, marks ? [l.mk] : [], 'pv-mk') + '</span>');
    b.disabled = st.done || !!ok || !!this._anim; b.setAttribute('aria-pressed', st.pick === i ? 'true' : 'false');
    b.addEventListener('click', function () { self._pick(i); });
    return b;
  },
  /* the lighthouse: the lamp, three windows with their creatures; beside them the view (Level 1) or the parts each tells (Level 2) */
  _lighthouse: function (D) {
    var C = LumenWindowsCore, st = this.st, self = this, R = st.R, an = this._anim, help = C.help(st);
    var g = document.createElement('div'); g.className = 'pv-house' + (an ? ' beam-' + an.win : '') + (st.done && !an ? ' beam-' + (st.level === 'window' ? R.view : 'all') : '');
    g.style.setProperty('--pv-col', D.col + 'px'); g.style.setProperty('--pv-win', D.win + 'px'); g.style.setProperty('--pv-gap', D.gap + 'px');
    /* the drawn tower behind the windows */
    var tower = document.createElement('div'); tower.className = 'pv-tower'; tower.setAttribute('aria-hidden', 'true');
    tower.innerHTML = '<svg class="pv-towerart" viewBox="0 0 100 400" preserveAspectRatio="none" width="100%" height="100%"><defs><pattern id="pvBands" width="100" height="80" patternUnits="userSpaceOnUse"><rect width="100" height="40" fill="#F7F1E6"/><rect y="40" width="100" height="40" fill="#D9473B"/></pattern></defs>' +
      '<path d="M18 4 H82 L96 400 H4 Z" fill="url(#pvBands)" stroke="#8C3A2E" stroke-width="2"/></svg>';
    g.appendChild(tower);
    /* the lamp room (and Lumen, on wide screens) */
    var lamp = document.createElement('div'); lamp.className = 'pv-lamp'; lamp.setAttribute('aria-hidden', 'true');
    lamp.innerHTML = '<svg class="pv-lampart" viewBox="0 0 80 60" width="' + (D.wide ? 80 : 54) + '" height="' + (D.wide ? 60 : 40) + '"><path d="M10 58 H70 L64 46 H16 Z" fill="#5E4A35"/><rect x="22" y="18" width="36" height="28" rx="3" fill="#FFE7A3" stroke="#5E4A35" stroke-width="3"/><path d="M18 18 L40 3 L62 18 Z" fill="#D9473B" stroke="#8C3A2E" stroke-width="2"/><circle cx="40" cy="32" r="8" fill="#FFC93C"/></svg>' +
      (D.wide ? '<span class="pv-lumen">' + this._img('birds 2/owl', 96) + '</span>' : '');
    g.appendChild(lamp);
    var showAll = st.level === 'window' && (this._allViews() || help);
    C.WINS.forEach(function (w, row) {
      var key = R.chars[w], nm = self._name(key);
      var sel = st.level === 'window' ? st.sel === w : false, ok = st.done && !an && (st.level === 'window' ? R.view === w : true);
      var search = st.level === 'tellers' && !an && st.last === 'miss' && st.wrong.some(function (x) { return x.win === w; });
      var b = self._btn('pv-win win-' + w + (sel ? ' is-sel' : '') + (ok ? ' is-wave' : '') + (search ? ' is-search' : ''), 'win-' + w, self._t(w === 'high' ? 'winHigh' : w === 'mid' ? 'winMid' : 'winLow', { name: nm }),
        '<span class="pv-frame">' + self._img(LumenWindowsCore.DATA.PICS[key], D.pic) + '</span><span class="pv-name" aria-hidden="true">' + esc(nm) + '</span>');
      b.style.gridRow = String(row + 2);
      b.disabled = st.done || !!an || (st.level === 'tellers' && st.pick == null && false);
      if (st.level === 'window') b.setAttribute('aria-pressed', sel ? 'true' : 'false');
      b.addEventListener('click', function () { self._win(w); });
      g.appendChild(b);
      if (showAll || st.level === 'tellers') {
        var rail = document.createElement('div'); rail.className = 'pv-rail'; rail.style.gridRow = String(row + 2);
        if (st.level === 'window') rail.appendChild(self._viewEl(w, D, 'strip'));
        else {
          if (help) { var tag = document.createElement('div'); tag.className = 'pv-parts'; tag.textContent = self._t({ gull: 'partsGull', mouse: 'partsMouse', rabbit: 'partsRabbit', crab: 'partsCrab' }[key]); rail.appendChild(tag); }
          st.hang.forEach(function (hw, i) { if (hw === w) rail.appendChild(self._lineBtn(i, false)); });
          if (!st.done && !an) rail.addEventListener('click', function (e) { if (e.target.closest('.pv-part')) return; self._win(w); });
        }
        g.appendChild(rail);
      }
    });
    if (st.level === 'window' && !showAll) {
      var panel = this._viewEl(an ? an.win : st.sel, D, 'panel'); panel.style.gridRow = '2 / span 3'; g.appendChild(panel);
    }
    return g;
  },
  /* a view of the harbor from one window: high → a tiny dot far below; middle → the object straight across; low → huge and cut off */
  _viewEl: function (w, D, kind) {
    var st = this.st, R = st.R, el = document.createElement('div'), isNew = kind === 'panel' && w && this._lastView !== w;
    if (kind === 'panel') this._lastView = w || null;
    el.className = 'pv-view kind-' + kind + (w ? ' v-' + w : ' v-rest') + (isNew ? ' is-new' : '');
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', w ? this._t(w === 'high' ? 'aViewHigh' : w === 'mid' ? 'aViewMid' : 'aViewLow') : this._t('hintEmptyWindow'));
    var hz = w === 'high' ? 14 : w === 'mid' ? 48 : 66;
    var art = '<svg class="pv-viewart" viewBox="0 0 100 100" preserveAspectRatio="none" width="100%" height="100%" aria-hidden="true">' +
      '<rect width="100" height="' + hz + '" fill="#CFE8F6"/><rect y="' + hz + '" width="100" height="' + (100 - hz) + '" fill="#4F9BC4"/>' +
      '<path d="M0 ' + (hz + 6) + ' Q 25 ' + (hz + 3) + ' 50 ' + (hz + 6) + ' T 100 ' + (hz + 6) + '" fill="none" stroke="#86C1DE" stroke-width="1.2"/>' +
      '</svg>' + (w ? '' : '<span class="pv-glow"></span>');
    var obj = '';
    if (w === 'high') {
      /* the drawn dot token, never a shrunken picture */
      obj = '<span class="pv-dot" style="background:' + R.dot + '"></span>';
    } else if (w === 'mid') obj = '<span class="pv-obj o-mid">' + this._img(R.pic, kind === 'strip' ? Math.max(64, Math.round(D.win * 0.85)) : (D.wide ? 120 : 96)) + '</span>';
    else if (w === 'low') obj = '<span class="pv-obj o-low">' + this._img(R.pic, kind === 'strip' ? D.win * 2 : (D.wide ? 300 : 210)) + '</span>';
    el.innerHTML = art + obj;
    return el;
  },

  /* ---------------- the hand ---------------- */
  _win: function (w) {
    if (this._anim) return; var st = this.st, C = LumenWindowsCore;
    if (st.level === 'window') { var r = C.choose(st, w); if (r === 'no') return; this.api.sound(w === 'high' ? 660 : w === 'mid' ? 520 : 400); this._clearHelp(); this._sr(this._t(w === 'high' ? 'aViewHigh' : w === 'mid' ? 'aViewMid' : 'aViewLow')); this._paint(); return; }
    if (st.pick == null) { this._view.nudge = false; this._view.note = this._t('nudgeTellers'); this.api.sound(200); this._paint(); return; }
    var h = C.hang(st, w); if (h === 'no') return; this.api.sound(h === 'on' ? 520 : 320); this._clearHelp(); this._paint();
  },
  _pick: function (i) { if (this._anim) return; if (LumenWindowsCore.pick(this.st, i) === 'no') return; this.api.sound(480); this._clearHelp(); this._paint(); },

  /* ---------------- Check: Lumen's beam swings to the window(s) ---------------- */
  _check: function () {
    var C = LumenWindowsCore, st = this.st, v = this._view, self = this;
    if (st.done || this._anim) return;
    this._nudged[st.level] = true;
    var a = C.check(st);
    if (a.result === 'empty') { v.nudge = false; v.note = this._t(C.hint(st).key); this.api.sound(200); this._paint(); this.api.announce(v.note); return; }
    var finish = function () {
      self._anim = null;
      if (a.result === 'ok') { self._success(); return; }
      var h = C.hint(st), D = C.DATA[self._loc()];
      v.nudge = false; v.note = self._t(h.key, h.name ? { name: D.names[h.name], nameAd: D.nameAd[h.name], hp: h.hp } : {});
      self.api.sound(180); self._paint(); self.api.announce(v.note);
    };
    if (this.FAST) { finish(); return; }
    var w = st.level === 'window' ? (a.result === 'ok' ? st.R.view : a.chose) : 'all';
    this._anim = { win: w }; this.api.sound(560); this._paint();
    this._later(finish, 700);
  },
  _success: function () {
    var st = this.st, v = this._view;
    if (st.level === 'window') { var w = st.R.view; v.ok = this._t(w === 'high' ? 'okHigh' : w === 'mid' ? 'okMid' : 'okLow', { name: this._name(st.R.chars[w]) }); }
    else v.ok = this._t('okTellers');
    this._log[this._key()] = (this._log[this._key()] || 0) + 1;
    this.api.sound(988); this._paint(); this.api.announce(v.ok);
    this._advance(v.ok.length * 60 + 3800);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
/* underline the marked words (the view words of a line, or the part a line names) */
function markUp(text, marks, cls) {
  var out = esc(text);
  (marks || []).forEach(function (m) { var e = esc(m), i = out.indexOf(e); if (m && i >= 0) out = out.slice(0, i) + '<mark class="' + cls + '">' + e + '</mark>' + out.slice(i + e.length); });
  return out;
}
function injectLumenWindowsCSS() {
  if (typeof document === 'undefined' || document.getElementById('pv-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2F2A3B', GOLD = '#E9B23C';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.pv-wrap{position:relative;width:100%;max-width:700px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;} .pv-wrap:focus{outline:none;}'
  /* the story card */
  + '.pv-top{width:100%;}'
  + '.pv-story{display:flex;align-items:center;gap:14px;width:100%;box-sizing:border-box;padding:12px 16px;border-radius:14px;background:#FFF8EC;box-shadow:0 3px 0 #E3CFA8,inset 0 0 0 2px #E8DCC2;}'
  + '.pv-evpic{flex:none;display:flex;border-radius:12px;background:#EAF4FA;} .pv-evpic img,.pv-frame img,.pv-obj img,.pv-lumen img{display:block;object-fit:contain;pointer-events:none;}'
  + '.pv-stext{display:flex;flex-direction:column;gap:6px;min-width:0;} .pv-event{font-family:' + B + ';font-weight:700;font-size:17px;line-height:1.3;color:#5E5670;}'
  + '.pv-line{position:relative;padding:8px 12px;border-radius:12px;background:#FFFFFF;box-shadow:inset 0 0 0 2px #D8CBB2;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.3;color:' + INK + ';}'
  + '.pv-mk{background:#FFF0C2;color:inherit;border-radius:3px;text-decoration:underline;text-decoration-thickness:3px;text-decoration-color:#C9952E;text-underline-offset:4px;} .pv-mk.is-pulse{animation:pvPulse 1.2s ease-in-out infinite;}'
  + '@keyframes pvPulse{0%,100%{background:#FFF0C2;}50%{background:#FFD97A;}}'
  /* Level 2: the parts of the story */
  + '.pv-tray{display:flex;flex-direction:column;gap:8px;width:100%;}'
  + '.pv-slot{min-height:44px;border-radius:12px;box-shadow:inset 0 0 0 2px #E8DCC2;background:repeating-linear-gradient(135deg,#FBF4E8 0 8px,#F5EBDA 8px 16px);}'
  + '.pv-part{display:flex;align-items:center;gap:10px;width:100%;min-height:48px;padding:6px 12px;border:0;border-radius:12px;background:#FFFFFF;box-shadow:0 3px 0 #E3CFA8,inset 0 0 0 2px #D8CBB2;font-family:' + B + ';font-weight:800;font-size:18px;line-height:1.25;color:' + INK + ';text-align:left;cursor:pointer;}'
  + '.pv-part.is-pick{background:#FFE9A8;box-shadow:0 0 0 4px #F2784B;} .pv-part.is-ok{box-shadow:inset 0 0 0 3px ' + GOLD + ';} .pv-part:disabled{cursor:default;}'
  + '.pv-pnum{flex:none;display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;background:#146B5E;color:#FFF;font-family:' + H + ';font-size:16px;}'
  /* the lighthouse grid: the tower column, the view or the rails beside it */
  + '.pv-main{width:100%;}'
  + '.pv-house{position:relative;display:grid;grid-template-columns:var(--pv-col) 1fr;grid-template-rows:auto repeat(3, minmax(var(--pv-win), auto));column-gap:12px;row-gap:var(--pv-gap);width:100%;}'
  + '.pv-tower{grid-column:1;grid-row:2 / span 3;position:relative;margin:-6px 0 -10px;} .pv-towerart{position:absolute;inset:0;display:block;}'
  + '.pv-lamp{grid-column:1 / span 2;grid-row:1;display:flex;align-items:flex-end;gap:12px;padding-left:calc((var(--pv-col) - 80px) / 2);} .pv-wrap.is-narrow .pv-lamp{padding-left:calc((var(--pv-col) - 54px) / 2);}'
  + '.pv-lumen{display:flex;}'
  + '.pv-win{grid-column:1;position:relative;z-index:1;justify-self:center;align-self:center;display:flex;flex-direction:column;align-items:center;justify-content:center;width:var(--pv-win);height:var(--pv-win);padding:0;border:0;border-radius:10px;background:transparent;cursor:pointer;}'
  + '.pv-frame{position:relative;display:flex;align-items:center;justify-content:center;width:calc(var(--pv-win) - 6px);height:calc(var(--pv-win) - 6px);border-radius:10px;background:#BFE3F5;box-shadow:inset 0 0 0 4px #5E4A35,0 3px 0 #3F3125;overflow:hidden;}'
  + '.pv-name{position:absolute;left:50%;bottom:-2px;transform:translate(-50%,50%);padding:0 6px;border-radius:8px;background:#FFF8EC;box-shadow:0 0 0 2px #5E4A35;font-family:' + H + ';font-weight:800;font-size:14px;line-height:1.3;color:' + INK + ';white-space:nowrap;}'
  + '.pv-win.is-sel .pv-frame{box-shadow:inset 0 0 0 4px #F2784B,0 0 0 4px #F2784B,0 3px 0 #3F3125;} .pv-win.is-wave .pv-frame{box-shadow:inset 0 0 0 4px ' + GOLD + ',0 0 0 6px #FFE7A3;} .pv-win.is-wave img{animation:pvWave .7s ease-out;}'
  + '.pv-win.is-search .pv-frame::after{content:"";position:absolute;inset:8px;border:3px dashed #8A3B1F;border-radius:50%;animation:pvSearch 1.2s ease-out forwards;} .pv-win:disabled{cursor:default;}'
  + '@keyframes pvWave{0%{transform:none;}40%{transform:translateY(-8px) rotate(-6deg);}100%{transform:none;}} @keyframes pvSearch{0%{opacity:1;transform:scale(.6);}100%{opacity:0;transform:scale(1.15);}}'
  /* the beam from the lamp */
  + '.pv-house[class*="beam-"] .pv-lamp svg{filter:drop-shadow(0 0 10px #FFD24A);}'
  + '.pv-house.beam-high .win-high .pv-frame,.pv-house.beam-mid .win-mid .pv-frame,.pv-house.beam-low .win-low .pv-frame,.pv-house.beam-all .pv-frame{box-shadow:inset 0 0 0 4px ' + GOLD + ',0 0 18px 6px #FFE7A3;}'
  /* the view */
  + '.pv-view{position:relative;grid-column:2;overflow:hidden;border-radius:12px;box-shadow:inset 0 0 0 4px #5E4A35;background:#CFE8F6;} .pv-viewart{position:absolute;inset:0;display:block;}'
  + '.pv-view.kind-panel{min-height:100%;} .pv-view.is-new{animation:pvZoom .4s ease-out;} @keyframes pvZoom{0%{transform:scale(.9);opacity:.3;}100%{transform:none;opacity:1;}} .pv-wrap.is-fast .pv-view{animation:none;}'
  + '.pv-glow{position:absolute;inset:0;background:radial-gradient(circle at 50% 30%,rgba(255,236,160,.75) 0,rgba(255,236,160,0) 55%);} .pv-dot{position:absolute;left:62%;top:58%;width:12px;height:12px;border-radius:50%;box-shadow:0 0 0 2px #FFFFFF;} .pv-view.kind-strip .pv-dot{top:56%;width:10px;height:10px;}'
  + '.pv-obj{position:absolute;display:flex;} .pv-obj.o-mid{left:50%;top:48%;transform:translate(-50%,-50%);} .pv-view.kind-strip .pv-obj.o-mid{top:50%;}'
  + '.pv-obj.o-low{left:50%;bottom:0;transform:translate(-50%,42%);}'
  + '.pv-rail{grid-column:2;position:relative;display:flex;flex-direction:column;justify-content:center;gap:6px;min-width:0;}'
  + '.lv-tellers .pv-rail{padding:4px 8px;border-radius:12px;background:#FBF4E8;box-shadow:inset 0 0 0 2px #E8DCC2;cursor:pointer;} .lv-tellers .pv-rail .pv-part{min-height:44px;font-size:16px;}'
  + '.pv-rail > .pv-view{grid-column:auto;height:100%;}'
  + '.pv-parts{align-self:flex-start;padding:2px 8px;border-radius:8px;background:#FFF0C2;font-family:' + B + ';font-weight:800;font-size:15px;color:#7A4E15;}'
  /* Check, the note, the logbook */
  + '.pv-foot{display:flex;justify-content:center;width:100%;}'
  + '.pv-check{display:inline-flex;align-items:center;gap:8px;min-width:150px;min-height:54px;padding:8px 26px;border:0;border-radius:16px;background:#146B5E;color:#FFF;font-family:' + H + ';font-weight:800;font-size:22px;box-shadow:0 4px 0 #0D4A41;cursor:pointer;} .pv-check:disabled{opacity:.5;cursor:default;}'
  + '.pv-note{margin:0;min-height:1.3em;max-width:620px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .pv-note.is-hint{color:#8A3B1F;} .pv-note.is-nudge{color:#5E6770;}'
  + '.pv-log{display:flex;gap:6px;justify-content:center;flex-wrap:wrap;padding:6px 12px;border-radius:10px;background:#7A5638;box-shadow:inset 0 0 0 2px #5E4A35;}'
  + '.pv-tab{display:block;width:14px;height:18px;border-radius:2px 4px 4px 2px;background:#A57C55;} .pv-tab.is-on{background:#FFF3C4;box-shadow:0 0 0 2px ' + GOLD + ';}'
  + '.pv-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);margin:0;}'
  /* phones */
  + '.pv-wrap.lv-tellers{gap:10px;} .pv-wrap.lv-tellers .pv-tray{gap:6px;}'
  + '.pv-wrap.is-narrow{gap:10px;} .pv-wrap.is-narrow .pv-story{padding:8px 10px;gap:10px;} .pv-wrap.is-narrow .pv-event{font-size:15px;} .pv-wrap.is-narrow .pv-line{font-size:17px;padding:6px 10px;}'
  + '.pv-wrap.is-narrow .pv-part{font-size:16px;padding:4px 10px;} .pv-wrap.is-narrow .pv-note{font-size:17px;} .pv-wrap.is-narrow .pv-house{column-gap:8px;}'
  + '.pv-wrap.is-narrow.lv-tellers .pv-lamp{display:none;} .pv-wrap.is-narrow .lv-tellers .pv-rail .pv-part{font-size:15px;}'
  + '.pv-wrap.is-tiny{gap:8px;} .pv-wrap.is-tiny .pv-check{min-width:112px;min-height:48px;padding:6px 14px;font-size:20px;} .pv-wrap.is-tiny .pv-tray{gap:6px;} .pv-wrap.is-tiny .pv-part{min-height:44px;}'
  + '.pv-wrap.is-xs{gap:4px;} .pv-wrap.is-xs .pv-lamp{display:none;} .pv-wrap.is-xs .pv-story{padding:6px 8px;gap:8px;} .pv-wrap.is-xs .pv-line{padding:4px 8px;} .pv-wrap.is-xs .pv-stext{gap:3px;} .pv-wrap.is-xs .pv-tray{gap:4px;} .pv-wrap.is-xs .pv-part{padding:2px 8px;gap:8px;} .pv-wrap.is-xs .pv-pnum{width:22px;height:22px;font-size:14px;} .pv-wrap.is-xs .pv-line{font-size:16px;} .pv-wrap.is-xs .pv-part{font-size:15px;}'
  + '@media (prefers-reduced-motion: reduce){.pv-view,.pv-win img,.pv-mk,.pv-frame::after{animation:none !important;}}'
  + '.pv-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var el = document.createElement('style'); el.id = 'pv-css'; el.textContent = css; document.head.appendChild(el);
}
if (typeof window !== 'undefined') window.PointOfViewActivity = PointOfViewActivity;
