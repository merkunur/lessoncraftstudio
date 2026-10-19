/* =====================================================================
   tipping-pour-activity.js — ACTIVITY #33 of the one-by-one rebuild:
   "Which Holds More?" (K.MD.A.2) — THE TIPPING POUR, at Bramble's stand.
   Design sheet: docs/activities-rebuild/designs/033-bramble.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: the direct comparison of two containers IS pouring one
   into the other, so the child calls it first (the raspberry goes on the
   one that holds more, less, or on "the same"), fills the left one at the
   tap, picks it up and tips it into the other with their own hand. The
   juice decides: it SPILLS over into the drip tray, leaves a GAP at the
   top, or fills exactly to the BRIM. Capacities are real volumes of the
   drawn shapes (tipping-pour-core.js), so a tall glass that looks bigger
   really can leave a gap in a low bowl.

   ACTIVITY LAYER ONLY: lcs-shell.js is untouched (its Check is hidden and
   pressed by this activity when the round is complete). Test seams:
   window.TippingPourActivity.st / ._order / ._pool / .FAST.
   ===================================================================== */
'use strict';

var TippingPourActivity = {
  id: 'tipping-pour',
  apparatusClasses: ['tp-'],

  strings: {
    title:       {en:'Bramble’s Berry-Juice Stand',de:'Brambles Beerensaft-Stand',fr:'Le stand de jus de baies de Bramble',it:'La bancarella del succo di Bramble',es:'El puesto de Bramble',pt:'A Barraquinha de Suco do Bramble',nl:'Storms sapkraam',sv:'Igges saftstånd',da:'Pjuskes saftbod',no:'Piggs saftbod',fi:'Piikin mehukoju'},
    instruction: {en:'Put the berry on your guess, then tip one cup into the other and watch the juice.',de:'Leg die Himbeere auf deinen Tipp, dann kipp ein Gefäß ins andere und schau auf den Saft.',fr:'Pose la framboise sur ton choix, puis verse un récipient dans l’autre et regarde le jus.',it:'Metti il lampone sulla tua scelta, poi versa un recipiente nell’altro e guarda il succo.',es:'Pon la frambuesa en tu respuesta; luego vierte un recipiente en el otro y mira el jugo.',pt:'Coloque a framboesa no seu palpite; depois despeje um recipiente no outro e observe o suco.',nl:'Leg de framboos op je gok. Giet dan de ene in de andere en kijk naar het sap.',sv:'Lägg hallonet på din gissning. Häll sedan det ena kärlet i det andra och titta på saften.',da:'Læg hindbærret på dit gæt. Hæld så den ene beholder over i den anden, og se på saften.',no:'Legg bringebæret på gjetningen din. Hell så den ene beholderen over i den andre, og se på saften.',fi:'Laita vadelma arvauksesi päälle. Kaada sitten toinen astia toiseen ja katso mehua.'},
    promptMore:  {en:'Which holds more? Put the berry on it — then pour!',de:'Wo passt mehr hinein? Leg die Himbeere darauf – dann gieß!',fr:'Lequel contient le plus ? Pose la framboise dessus, puis verse !',it:'Quale contiene di più? Mettici sopra il lampone, poi versa!',es:'¿A cuál le cabe más? Ponle la frambuesa encima y luego vierte.',pt:'Em qual cabe mais? Coloque a framboesa nele e depois despeje!',nl:'Waar past meer in? Leg de framboos erop – en dan gieten!',sv:'Vilket rymmer mest? Lägg hallonet på det – och häll sedan!',da:'Hvilken kan rumme mest? Læg hindbærret på den – og hæld så!',no:'Hvilken rommer mest? Legg bringebæret på den – og hell så!',fi:'Kumpaan mahtuu enemmän? Laita vadelma sen päälle – ja kaada sitten!'},
    promptLess:  {en:'Which holds less? Put the berry on it — then pour!',de:'Wo passt weniger hinein? Leg die Himbeere darauf – dann gieß!',fr:'Lequel contient le moins ? Pose la framboise dessus, puis verse !',it:'Quale contiene di meno? Mettici sopra il lampone, poi versa!',es:'¿A cuál le cabe menos? Ponle la frambuesa encima y luego vierte.',pt:'Em qual cabe menos? Coloque a framboesa nele e depois despeje!',nl:'Waar past minder in? Leg de framboos erop – en dan gieten!',sv:'Vilket rymmer minst? Lägg hallonet på det – och häll sedan!',da:'Hvilken kan rumme mindst? Læg hindbærret på den – og hæld så!',no:'Hvilken rommer minst? Legg bringebæret på den – og hell så!',fi:'Kumpaan mahtuu vähemmän? Laita vadelma sen päälle – ja kaada sitten!'},
    promptFit:   {en:'Fill the left one: will its juice fit in the right one? Put the berry on your guess — then pour!',de:'Passt der Saft aus dem linken Gefäß ins rechte? Leg die Himbeere auf deinen Tipp – dann gieß!',fr:'Le jus du récipient de gauche va-t-il tenir dans celui de droite ? Pose la framboise sur ton choix, puis verse !',it:'Il succo del recipiente di sinistra ci starà in quello di destra? Metti il lampone sulla tua scelta, poi versa!',es:'¿El jugo del recipiente de la izquierda cabrá en el de la derecha? Pon la frambuesa en tu respuesta y luego vierte.',pt:'O suco do recipiente da esquerda cabe no da direita? Coloque a framboesa no seu palpite e depois despeje!',nl:'Past het sap uit de linker in de rechter? Leg de framboos op je gok – en dan gieten!',sv:'Får saften från det vänstra kärlet plats i det högra? Lägg hallonet på din gissning – och häll sedan!',da:'Kan saften fra den venstre beholder være i den højre? Læg hindbærret på dit gæt – og hæld så!',no:'Får saften fra den venstre beholderen plass i den høyre? Legg bringebæret på gjetningen din – og hell så!',fi:'Mahtuuko vasemman astian mehu oikeaan astiaan? Laita vadelma arvauksesi päälle – ja kaada sitten!'},
    hintPutMore: {en:'Put the berry on the one you think holds more.',de:'Leg die Himbeere auf das Gefäß, in das mehr hineinpasst.',fr:'Pose la framboise sur celui qui, d’après toi, contient le plus.',it:'Metti il lampone sul recipiente che secondo te contiene di più.',es:'Pon la frambuesa en el recipiente al que crees que le cabe más.',pt:'Coloque a framboesa no recipiente em que você acha que cabe mais.',nl:'Leg de framboos op degene waar volgens jou meer in past.',sv:'Lägg hallonet på det kärl som du tror rymmer mest.',da:'Læg hindbærret på den beholder, du tror kan rumme mest.',no:'Legg bringebæret på beholderen du tror rommer mest.',fi:'Laita vadelma sen astian päälle, johon arvelet mahtuvan enemmän.'},
    hintPutLess: {en:'Put the berry on the one you think holds less.',de:'Leg die Himbeere auf das Gefäß, in das weniger hineinpasst.',fr:'Pose la framboise sur celui qui, d’après toi, contient le moins.',it:'Metti il lampone sul recipiente che secondo te contiene di meno.',es:'Pon la frambuesa en el recipiente al que crees que le cabe menos.',pt:'Coloque a framboesa no recipiente em que você acha que cabe menos.',nl:'Leg de framboos op degene waar volgens jou minder in past.',sv:'Lägg hallonet på det kärl som du tror rymmer minst.',da:'Læg hindbærret på den beholder, du tror kan rumme mindst.',no:'Legg bringebæret på beholderen du tror rommer minst.',fi:'Laita vadelma sen astian päälle, johon arvelet mahtuvan vähemmän.'},
    hintGuess:   {en:'Put the berry on your guess.',de:'Leg die Himbeere auf deinen Tipp.',fr:'Pose la framboise sur ton choix.',it:'Metti il lampone sulla tua scelta.',es:'Pon la frambuesa en tu respuesta.',pt:'Coloque a framboesa no seu palpite.',nl:'Leg de framboos op je gok.',sv:'Lägg hallonet på din gissning.',da:'Læg hindbærret på dit gæt.',no:'Legg bringebæret på gjetningen din.',fi:'Laita vadelma arvauksesi päälle.'},
    stepFill:    {en:'Now press the tap to fill it up.',de:'Jetzt drück auf den Hahn und füll es.',fr:'Maintenant, appuie sur le robinet pour le remplir.',it:'Ora premi il rubinetto per riempirlo.',es:'Ahora abre la llave para llenarlo.',pt:'Agora aperte a torneira para enchê-lo.',nl:'Druk nu op de kraan om hem te vullen.',sv:'Tryck nu på kranen och fyll det.',da:'Tryk nu på hanen og fyld den.',no:'Trykk nå på kranen og fyll den.',fi:'Paina nyt hanaa ja täytä se.'},
    stepPour:    {en:'Now pick it up and tip it into the other one!',de:'Jetzt heb es hoch und kipp es ins andere!',fr:'Maintenant, soulève-le et verse-le dans l’autre !',it:'Ora sollevalo e versalo nell’altro!',es:'Ahora levántalo y viértelo en el otro.',pt:'Agora levante e despeje no outro!',nl:'Til hem nu op en giet hem leeg in de andere!',sv:'Lyft det nu och häll det i det andra!',da:'Løft den nu, og hæld den over i den anden!',no:'Løft den nå, og hell den over i den andre!',fi:'Nosta se nyt ja kaada se toiseen!'},
    hintSpill:   {en:'Look — the juice spilled over. That one could not hold it all.',de:'Schau – der Saft ist übergelaufen. Das Gefäß konnte nicht alles fassen.',fr:'Regarde : le jus a débordé. Ce récipient ne pouvait pas tout contenir.',it:'Guarda: il succo è traboccato. Lì non ci stava tutto.',es:'Mira: el jugo se derramó. A ese no le cupo todo.',pt:'Olhe: o suco transbordou. Ali não coube tudo.',nl:'Kijk: het sap is overgelopen. Daar paste niet alles in.',sv:'Titta – saften rann över. Det kärlet kunde inte rymma allt.',da:'Se – saften løb over. Den beholder kunne ikke rumme det hele.',no:'Se – saften rant over. Den beholderen kunne ikke romme alt.',fi:'Katso – mehu valui yli. Siihen astiaan ei mahtunut kaikkea.'},
    hintGap:     {en:'Look — the juice did not fill it. There is room left at the top.',de:'Schau – der Saft hat es nicht gefüllt. Oben ist noch Platz.',fr:'Regarde : le jus ne l’a pas rempli. Il reste de la place en haut.',it:'Guarda: il succo non l’ha riempito. In cima c’è ancora posto.',es:'Mira: el jugo no lo llenó. Queda espacio arriba.',pt:'Olhe: o suco não encheu. Ainda sobra espaço em cima.',nl:'Kijk: het sap heeft hem niet gevuld. Bovenin is nog ruimte.',sv:'Titta – saften fyllde det inte. Det finns plats kvar upptill.',da:'Se – saften fyldte den ikke. Der er plads tilbage øverst.',no:'Se – saften fylte den ikke. Det er plass igjen øverst.',fi:'Katso – mehu ei täyttänyt sitä. Yläreunaan jäi tilaa.'},
    hintBrim:    {en:'Look — full to the very top, and nothing left over.',de:'Schau – bis ganz oben voll, und nichts ist übrig.',fr:'Regarde : plein à ras bord, et il ne reste rien.',it:'Guarda: pieno fino all’orlo, e non è avanzato niente.',es:'Mira: lleno hasta el borde y no sobró nada.',pt:'Olhe: cheio até a borda, e não sobrou nada.',nl:'Kijk: tot de rand vol, en er is niets over.',sv:'Titta – fullt ända upp till kanten, och inget blev över.',da:'Se – fyldt helt op til kanten, og intet blev tilovers.',no:'Se – full helt opp til kanten, og ingenting ble til overs.',fi:'Katso – piripintaan täynnä, eikä mitään jäänyt yli.'},
    hintHere:    {en:'The berry goes here.',de:'Die Himbeere gehört hierhin.',fr:'La framboise va ici.',it:'Il lampone va qui.',es:'La frambuesa va aquí.',pt:'A framboesa vai aqui.',nl:'De framboos hoort hier.',sv:'Hallonet ska ligga här.',da:'Hindbærret skal ligge her.',no:'Bringebæret skal ligge her.',fi:'Vadelma kuuluu tähän.'},
    okMoreSpill: {en:'Yes — this one holds more: its juice spilled over!',de:'Ja – in dieses passt mehr: Sein Saft ist übergelaufen!',fr:'Oui, celui-ci contient le plus : son jus a débordé !',it:'Sì! Questo contiene di più: il suo succo è traboccato!',es:'¡Sí! A este le cabe más: su jugo se derramó.',pt:'Isso! Neste cabe mais: o suco dele transbordou!',nl:'Ja! Hier past meer in: het sap liep over!',sv:'Ja – det här rymmer mest: saften rann över!',da:'Ja – den her kan rumme mest: saften løb over!',no:'Ja – denne rommer mest: saften rant over!',fi:'Kyllä – tähän mahtuu enemmän: sen mehu valui yli!'},
    okMoreGap:   {en:'Yes — this one holds more: the juice did not fill it!',de:'Ja – in dieses passt mehr: Der Saft hat es nicht gefüllt!',fr:'Oui, celui-ci contient le plus : le jus ne l’a pas rempli !',it:'Sì! Questo contiene di più: il succo non l’ha riempito!',es:'¡Sí! A este le cabe más: el jugo no lo llenó.',pt:'Isso! Neste cabe mais: o suco não o encheu!',nl:'Ja! Hier past meer in: het sap vulde hem niet!',sv:'Ja – det här rymmer mest: saften fyllde det inte!',da:'Ja – den her kan rumme mest: saften fyldte den ikke!',no:'Ja – denne rommer mest: saften fylte den ikke!',fi:'Kyllä – tähän mahtuu enemmän: mehu ei täyttänyt sitä!'},
    okLessGap:   {en:'Yes — this one holds less: its juice did not fill the other one!',de:'Ja – in dieses passt weniger: Sein Saft hat das andere nicht gefüllt!',fr:'Oui, celui-ci contient le moins : son jus n’a pas rempli l’autre !',it:'Sì! Questo contiene di meno: il suo succo non ha riempito l’altro!',es:'¡Sí! A este le cabe menos: su jugo no llenó el otro.',pt:'Isso! Neste cabe menos: o suco dele não encheu o outro!',nl:'Ja! Hier past minder in: het sap vulde de andere niet!',sv:'Ja – det här rymmer minst: saften fyllde inte det andra!',da:'Ja – den her kan rumme mindst: saften fyldte ikke den anden!',no:'Ja – denne rommer minst: saften fylte ikke den andre!',fi:'Kyllä – tähän mahtuu vähemmän: sen mehu ei täyttänyt toista!'},
    okLessSpill: {en:'Yes — this one holds less: it spilled over!',de:'Ja – in dieses passt weniger: Es ist übergelaufen!',fr:'Oui, celui-ci contient le moins : il a débordé !',it:'Sì! Questo contiene di meno: è traboccato!',es:'¡Sí! A este le cabe menos: se desbordó.',pt:'Isso! Neste cabe menos: ele transbordou!',nl:'Ja! Hier past minder in: hij liep over!',sv:'Ja – det här rymmer minst: det rann över!',da:'Ja – den her kan rumme mindst: den løb over!',no:'Ja – denne rommer minst: den rant over!',fi:'Kyllä – tähän mahtuu vähemmän: siitä valui mehua yli!'},
    okSame:      {en:'Yes — they hold the same: full to the brim!',de:'Ja – in beide passt gleich viel: bis zum Rand voll!',fr:'Oui, ils contiennent autant l’un que l’autre : plein à ras bord !',it:'Sì! Contengono la stessa quantità: pieno fino all’orlo!',es:'¡Sí! A los dos les cabe lo mismo: lleno hasta el borde.',pt:'Isso! Nos dois cabe o mesmo tanto: cheio até a borda!',nl:'Ja! In allebei past evenveel: tot de rand vol!',sv:'Ja – de rymmer lika mycket: fullt ända upp till kanten!',da:'Ja – de kan rumme lige meget: fyldt helt op til kanten!',no:'Ja – de rommer like mye: full helt opp til kanten!',fi:'Kyllä – kumpaankin mahtuu yhtä paljon: piripintaan täynnä!'},
    okFits:      {en:'Yes — it fits, with room to spare!',de:'Ja – es passt, und es ist noch Platz!',fr:'Oui, ça tient, et il reste de la place !',it:'Sì! Ci sta, e c’è ancora spazio!',es:'¡Sí! Cabe, y sobra espacio.',pt:'Isso! Cabe, e ainda sobra espaço!',nl:'Ja! Het past, en er is nog ruimte over!',sv:'Ja – det får plats, och det finns plats kvar!',da:'Ja – den kan være der, og der er stadig plads tilbage!',no:'Ja – det får plass, og det er plass igjen!',fi:'Kyllä – se mahtuu, ja tilaa jää vielä!'},
    okSpills:    {en:'Yes — it spills over: it does not fit!',de:'Ja – es läuft über: Es passt nicht!',fr:'Oui, ça déborde : ça ne tient pas !',it:'Sì! Trabocca: non ci sta!',es:'¡Sí! Se derrama: no cabe.',pt:'Isso! Transborda: não cabe!',nl:'Ja! Het loopt over: het past niet!',sv:'Ja – det rinner över: det får inte plats!',da:'Ja – det løber over: der er ikke plads!',no:'Ja – det renner over: det får ikke plass!',fi:'Kyllä – se valuu yli: se ei mahdu!'},
    playNote:    {en:'Pour back and forth as much as you like — the juice never gets more or less.',de:'Gieß hin und her, so viel du willst – der Saft wird nie mehr und nie weniger.',fr:'Verse dans un sens puis dans l’autre autant que tu veux : le jus ne devient jamais plus ni moins.',it:'Versa avanti e indietro quanto vuoi: il succo non aumenta e non diminuisce mai.',es:'Vierte de uno a otro todo lo que quieras: el jugo nunca aumenta ni disminuye.',pt:'Despeje de um para o outro quantas vezes quiser: o suco nunca aumenta nem diminui.',nl:'Giet heen en weer zoveel je wilt: het sap wordt nooit meer of minder.',sv:'Häll fram och tillbaka så mycket du vill – saften blir aldrig mer eller mindre.',da:'Hæld frem og tilbage, så meget du vil – saften bliver aldrig mere eller mindre.',no:'Hell fram og tilbake så mye du vil – saften blir aldri mer eller mindre.',fi:'Kaada edestakaisin niin paljon kuin haluat – mehua ei tule koskaan enempää eikä vähempää.'},
    setCups:     {en:'Cups',de:'Gefäße',fr:'Récipients',it:'Recipienti',es:'Recipientes',pt:'Recipientes',nl:'Bekers',sv:'Kärl',da:'Beholdere',no:'Beholdere',fi:'Astiat'},
    cEasy:       {en:'Easy',de:'Leicht',fr:'Facile',it:'Facile',es:'Fácil',pt:'Fácil',nl:'Makkelijk',sv:'Lätt',da:'Lette',no:'Lette',fi:'Helppo'},
    cTricky:     {en:'Tricky',de:'Knifflig',fr:'Trompe-l’œil',it:'Ingannevole',es:'Engañoso',pt:'Enganoso',nl:'Lastig',sv:'Klurigt',da:'Drilske',no:'Lure',fi:'Kinkkinen'},
    setQuestion: {en:'Question',de:'Frage',fr:'Question',it:'Domanda',es:'Pregunta',pt:'Pergunta',nl:'Vraag',sv:'Fråga',da:'Spørgsmål',no:'Spørsmål',fi:'Kysymys'},
    qMore:       {en:'Holds more',de:'Passt mehr',fr:'Contient plus',it:'Contiene di più',es:'Cabe más',pt:'Cabe mais',nl:'Past meer in',sv:'Rymmer mest',da:'Rummer mest',no:'Rommer mest',fi:'Mahtuu enemmän'},
    qLess:       {en:'Holds less',de:'Passt weniger',fr:'Contient moins',it:'Contiene di meno',es:'Cabe menos',pt:'Cabe menos',nl:'Past minder in',sv:'Rymmer minst',da:'Rummer mindst',no:'Rommer minst',fi:'Mahtuu vähemmän'},
    qMixed:      {en:'Mixed',de:'Gemischt',fr:'Mélangé',it:'Misto',es:'Mezclado',pt:'Misturado',nl:'Gemengd',sv:'Blandat',da:'Blandet',no:'Blandet',fi:'Vaihteleva'},
    ariaLeft:    {en:'Left container',de:'Linkes Gefäß',fr:'Récipient de gauche',it:'Recipiente a sinistra',es:'Recipiente izquierdo',pt:'Recipiente da esquerda',nl:'Linker beker',sv:'Vänster kärl',da:'Venstre beholder',no:'Venstre beholder',fi:'Vasen astia'},
    ariaRight:   {en:'Right container',de:'Rechtes Gefäß',fr:'Récipient de droite',it:'Recipiente a destra',es:'Recipiente derecho',pt:'Recipiente da direita',nl:'Rechter beker',sv:'Höger kärl',da:'Højre beholder',no:'Høyre beholder',fi:'Oikea astia'},
    ariaSame:    {en:'The same',de:'Gleich viel',fr:'Autant',it:'La stessa quantità',es:'Lo mismo',pt:'O mesmo tanto',nl:'Evenveel',sv:'Lika mycket',da:'Lige meget',no:'Like mye',fi:'Yhtä paljon'},
    ariaFits:    {en:'It fits',de:'Es passt',fr:'Ça tient',it:'Ci sta',es:'Cabe',pt:'Cabe',nl:'Het past',sv:'Får plats',da:'Der er plads',no:'Får plass',fi:'Mahtuu'},
    ariaSpills:  {en:'It spills over',de:'Es läuft über',fr:'Ça déborde',it:'Trabocca',es:'Se derrama',pt:'Transborda',nl:'Het loopt over',sv:'Rinner över',da:'Det løber over',no:'Renner over',fi:'Valuu yli'},
    ariaTap:     {en:'Juice tap',de:'Safthahn',fr:'Robinet de jus',it:'Rubinetto del succo',es:'Llave del jugo',pt:'Torneira de suco',nl:'Sapkraan',sv:'Saftkran',da:'Safthane',no:'Saftkran',fi:'Mehuhana'},
    ariaTip:     {en:'Tip',de:'Kippen',fr:'Pencher',it:'Inclina',es:'Inclinar',pt:'Inclinar',nl:'Kantelen',sv:'Luta',da:'Hæld',no:'Hell',fi:'Kallista'},
    ariaBerry:   {en:'Berry',de:'Himbeere',fr:'Framboise',it:'Lampone',es:'Frambuesa',pt:'Framboesa',nl:'Framboos',sv:'Hallon',da:'Hindbær',no:'Bringebær',fi:'Vadelma'},
    ariaSpill:   {en:'Juice: spilled over',de:'Saft: übergelaufen',fr:'Jus : a débordé',it:'Succo: è traboccato',es:'Jugo: se derramó',pt:'Suco: transbordou',nl:'Sap: overgelopen',sv:'Saft: rann över',da:'Saft: løb over',no:'Saft: rant over',fi:'Mehu: valui yli'},
    ariaGap:     {en:'Juice: room left at the top',de:'Saft: oben ist noch Platz',fr:'Jus : il reste de la place en haut',it:'Succo: in cima c’è ancora posto',es:'Jugo: queda espacio arriba',pt:'Suco: sobra espaço em cima',nl:'Sap: bovenin nog ruimte',sv:'Saft: plats kvar upptill',da:'Saft: plads tilbage øverst',no:'Saft: plass igjen øverst',fi:'Mehu: yläreunaan jäi tilaa'},
    ariaBrim:    {en:'Juice: full to the brim',de:'Saft: bis zum Rand voll',fr:'Jus : plein à ras bord',it:'Succo: pieno fino all’orlo',es:'Jugo: lleno hasta el borde',pt:'Suco: cheio até a borda',nl:'Sap: tot de rand vol',sv:'Saft: fullt till kanten',da:'Saft: fyldt til kanten',no:'Saft: full til kanten',fi:'Mehu: piripintaan täynnä'}
  },

  defaults: { cups: 'easy', question: 'more' },
  settings: [
    { key: 'cups', type: 'choice', labelKey: 'setCups', options: [{ value: 'easy', labelKey: 'cEasy' }, { value: 'tricky', labelKey: 'cTricky' }] },
    { key: 'question', type: 'choice', labelKey: 'setQuestion', options: [{ value: 'more', labelKey: 'qMore' }, { value: 'less', labelKey: 'qLess' }, { value: 'mixed', labelKey: 'qMixed' }] }
  ],

  OK_MS: 1800, BACK_MS: 700, FILL_S: 1.2, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._raf = null; this._pose = null; this._sel = false; this._busy = false;
    this._fillTo = null; this._hold = 0; this._flow = { pour: 0, spill: 0 }; this._ring = null; this._berryAt = null; this._basket = 0; this._spillL = 0;
    injectTippingPourCSS();
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected || !self.st) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var d = self._pose && self._pose.docked;
      if (!d) return;
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowUp') { self._setTilt(self.st.tilt + (ev.key === 'ArrowDown' ? 10 : -10)); ev.preventDefault(); }
      else if (ev.key === 'Escape') { self._undock(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers(); this._stopLoop();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    var key = this._key();
    if (this._poolKey !== key) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k) { return this.api && this.api.t ? this.api.t(k) : k; },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _key: function () { return TippingPourCore.cups(this._set('cups')) + '.' + TippingPourCore.question(this._set('question')); },
  _ensurePool: function () { var key = this._key(); if (!this._pool || this._poolKey !== key) { this._pool = TippingPourCore.rounds(key.split('.')[0]); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = TippingPourCore, q = this._key().split('.')[1];
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null, pass, q); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order, pass, q); }
    var k = index % n, r = pool[this._order[k]], swap = C.swapOf(r.i, this._curPass), polarity = C.polarityAt(q, k);
    var probe = C.newState(r, { swap: swap, polarity: polarity }), c = C.compare(r, swap);
    probe.outcome = c === 'A' ? 'spill' : c === 'B' ? 'gap' : 'brim'; probe.berry = C.want(probe); probe.done = true;
    return {
      id: 'tipping-pour.' + r.id + (swap ? '.swap' : '') + '.' + probe.polarity,
      promptKey: r.fit ? 'promptFit' : polarity === 'less' ? 'promptLess' : 'promptMore',
      celebrateKey: C.success(probe).key,
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._stopLoop(); tool._round = r; tool._sel = false; tool._busy = false;
        tool._fillTo = null; tool._hold = 0; tool._flow = { pour: 0, spill: 0 }; tool._ring = null; tool._berryAt = null; tool._landed = null; tool._afterOk = false; tool._spillL = 0;
        tool.st = C.newState(r, { swap: swap, polarity: polarity });
        tool._pose = null;
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = TippingPourCore.rounds('easy')[0]; this._round = r0; this.st = TippingPourCore.newState(r0); }
    this._render2();
    this._watchWidth();
  },
  _render2: function () {
    var api = this.api, self = this, C = TippingPourCore, st = this.st;
    this._stopLoop();
    api.stage.innerHTML = '';
    var L = this._L = C.layout(this._width());
    this._sky = C.skyFor(st.L, st.R, L, !!(this._pose && this._pose.docked === 'R'));
    this._pose = this._pose && this._pose.docked ? this._pose : null; if (this._pose && this._pose.docked) this._dockAt(this._pose.from); else this._restPose();
    var wrap = api.el('div', 'tp-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow')); this._wrap = wrap;
    var scene = api.el('div', 'tp-scene'); this._scene = scene;
    scene.style.height = Math.round((this._sky + L.UNDER) * L.u) + 'px';
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'tp-svg'); svg.setAttribute('viewBox', '0 0 ' + L.SW + ' ' + (this._sky + L.UNDER)); svg.setAttribute('aria-hidden', 'true');
    this._svg = svg; scene.appendChild(svg);

    /* the two vessels: a button over each (the drag handle, and a berry place) */
    this._vbtn = {};
    ['L', 'R'].forEach(function (s) {
      var b = api.el('button', 'tp-vessel tp-vessel-' + s); b.type = 'button';
      b.setAttribute('aria-label', self._t(s === 'L' ? 'ariaLeft' : 'ariaRight'));
      self._bindVessel(b, s); self._vbtn[s] = b; scene.appendChild(b);
    });
    /* the coasters in the middle: "the same" (or "fits" / "spills" in the fit round) */
    this._coasters = {};
    (st.fit ? ['FITS', 'SPILLS'] : ['SAME']).forEach(function (p) {
      var b = api.el('button', 'tp-coaster'); b.type = 'button'; b.setAttribute('data-place', p);
      b.setAttribute('aria-label', self._t({ SAME: 'ariaSame', FITS: 'ariaFits', SPILLS: 'ariaSpills' }[p]));
      b.innerHTML = coasterIcon(p);
      b.addEventListener('click', function () { if (self._sel) { self._sel = false; self._place(p); } else if (!self._berryDrag) self._place(p); });
      self._coasters[p] = b; scene.appendChild(b);
    });
    /* the tap's knob */
    var knob = api.el('button', 'tp-knob'); knob.type = 'button'; knob.setAttribute('aria-label', this._t('ariaTap'));
    knob.innerHTML = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" class="tp-knob-c"/><rect x="17" y="6" width="6" height="28" rx="3" class="tp-knob-b"/></svg>';
    knob.addEventListener('click', function () { self._fill(); });
    this._knob = knob; scene.appendChild(knob);
    /* the tip button (only while a vessel is docked) */
    var tip = api.el('button', 'tp-tip'); tip.type = 'button'; tip.setAttribute('aria-label', this._t('ariaTip'));
    tip.innerHTML = '<svg viewBox="0 0 40 40"><path d="M10 26 A12 12 0 1 1 28 30" class="tp-tip-a"/><path d="M22 31 L29 31 L28 24" class="tp-tip-a"/></svg>';
    this._bindTip(tip); this._tip = tip; scene.appendChild(tip);
    /* the berry */
    var berry = api.el('button', 'tp-berry'); berry.type = 'button'; berry.setAttribute('aria-label', this._t('ariaBerry'));
    var img = document.createElement('img'); img.src = '/image-library-webp/themes/fruits/raspberry@2x.webp'; img.alt = ''; img.draggable = false; berry.appendChild(img);
    this._bindBerry(berry); this._berry = berry; scene.appendChild(berry);
    /* Bramble at the end of the counter (decoration: hops on a right call) */
    var bram = document.createElement('img'); bram.className = 'tp-bramble'; bram.src = '/image-library-webp/themes/' + encodeURIComponent('forest creatures') + '/hedgehog@2x.webp'; bram.alt = ''; bram.draggable = false;
    this._bramble = bram; scene.appendChild(bram);
    wrap.appendChild(scene);
    var note = api.el('div', 'tp-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    api.stage.appendChild(wrap);
    this._place2();
    this._paint();
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
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._render2();
    });
    this._ro.observe(this.api.stage);
  },

  /* ---------------- geometry: model units → px ---------------- */
  _px: function (x, yUp) { var L = this._L; return { left: x * L.u, top: (this._sky - yUp) * L.u }; },
  _restPose: function () {
    var X = this._L.X;
    this._pose = { L: { x: X.L, y: 0, tilt: 0 }, R: { x: X.R, y: 0, tilt: 0 }, docked: null, from: null };
  },
  /* dock vessel `from` over the other one (left pours right, right pours left) */
  _dockAt: function (from) {
    var C = TippingPourCore, X = this._L.X, st = this.st, to = from === 'L' ? 'R' : 'L';
    var p = C.dockPose(st[from], st[to], X[from], X[to]);
    if (!this._pose) this._restPose();
    this._pose[from] = { x: p.x, y: p.y, pivot: p.pivot, dir: p.dir };
    this._pose[to] = { x: X[to], y: 0 };
    this._pose.docked = from; this._pose.from = from;
  },
  /* where a vessel's outer foot is, and its box (px) — for the hit buttons */
  _vesselBox: function (s) {
    var C = TippingPourCore, v = C.V[this.st[s]], o = C.outer(v), p = this._pose[s], u = this._L.u;
    var hw = o.r + (C.hasHandle(v) ? C.HANDLE : 0);
    var a = this._px(p.x - hw, p.y + o.h), b = this._px(p.x + o.r, p.y);
    return { left: a.left, top: a.top, width: b.left - a.left, height: b.top - a.top };
  },
  _place2: function () {
    var C = TippingPourCore, L = this._L, u = L.u, st = this.st, self = this, X = L.X;
    ['L', 'R'].forEach(function (s) {
      var bx = self._vesselBox(s), b = self._vbtn[s];
      var h = Math.max(bx.height, 48), w = Math.max(bx.width, 48);
      b.style.left = (bx.left - (w - bx.width) / 2) + 'px'; b.style.top = (bx.top - (h - bx.height)) + 'px';
      b.style.width = w + 'px'; b.style.height = h + 'px';
      b.classList.toggle('is-docked', self._pose.docked === s);
    });
    /* coasters: the middle of the counter (stacked when there are two) */
    var cw = Math.max(48, Math.min(72, 34 * u)), ch = 48;
    var keys = Object.keys(this._coasters), mid = this._px(X.mid, 0);
    keys.forEach(function (p, i) {
      var b = self._coasters[p];
      b.style.width = cw + 'px'; b.style.height = ch + 'px';
      b.style.left = (mid.left - cw / 2) + 'px'; b.style.top = (mid.top - ch - 4 - i * (ch + 10)) + 'px';
    });
    /* the knob on the tap pipe, left of the spout */
    var kz = L.mode === 'wide' ? 56 : 48, kp = this._px(Math.max(X.L - 26, kz / 2 / u + 2), TAP_Y);
    this._knob.style.width = kz + 'px'; this._knob.style.height = kz + 'px';
    this._knob.style.left = (kp.left - kz / 2) + 'px'; this._knob.style.top = (kp.top - kz / 2) + 'px';
    this._knob.hidden = this._pose.docked === 'R';
    /* the tip button: right edge, beside the docked pair */
    var tz = L.mode === 'wide' ? 64 : 56, tp = this._px(0, this._sky - 6);
    this._tip.style.width = tz + 'px'; this._tip.style.height = tz + 'px';
    this._tip.style.left = this._pose.docked === 'R' ? (6 + 'px') : (L.SW * u - tz - 6) + 'px'; this._tip.style.top = tp.top + 'px';
    this._tip.hidden = !this._pose.docked;
    /* Bramble */
    var bz = L.PIC, bp = this._px(X.bramble, 0);
    this._bramble.style.width = bz + 'px'; this._bramble.style.height = bz + 'px';
    this._bramble.style.left = (bp.left - bz / 2) + 'px'; this._bramble.style.top = ((this._sky + L.UNDER) * u - bz - 4) + 'px';
    this._placeBerry();
  },
  _berryHome: function () {
    var L = this._L, p = this._px(L.X.dish, 0);
    return { left: p.left, top: (this._sky + L.UNDER) * L.u - L.PIC / 2 - 10 };
  },
  /* where the berry sits: its dish, a vessel's rim, or a coaster */
  _berrySpot: function (where) {
    var C = TippingPourCore, st = this.st;
    if (where === 'A' || where === 'B') {
      var s = where === 'A' ? 'L' : 'R', p = this._pose[s], o = C.outer(C.V[st[s]]);
      var half = this._L.PIC / 2 / this._L.u;
      if (this._pose.docked === s) return this._px(this._L.X[s], half);
      /* while a pour is docked the berry sits on the front of its glass, clear of the stream and the tip button */
      if (this._pose.docked) return this._px(p.x, Math.max(half, o.h / 2));
      return this._px(p.x, p.y + o.h + half - 6);
    }
    var b = this._coasters[where]; if (!b) return this._berryHome();
    return { left: parseFloat(b.style.left) + parseFloat(b.style.width) / 2, top: parseFloat(b.style.top) - this._L.PIC / 2 + 10 };
  },
  _placeBerry: function () {
    var bz = this._L.PIC, b = this._berry, st = this.st;
    /* in free play the berry has done its job: back to its dish (the basket keeps the call) */
    var at = this._berryAt || (st.berry && !(st.done && this._afterOk) ? this._berrySpot(st.berry) : this._berryHome());
    if (st.done && this._landed && !this._afterOk) at = this._landed;
    b.style.width = bz + 'px'; b.style.height = bz + 'px';
    b.style.left = (at.left - bz / 2) + 'px'; b.style.top = (at.top - bz / 2) + 'px';
    b.classList.toggle('is-sel', !!this._sel);
    b.classList.toggle('is-placed', !!st.berry);
  },

  /* ---------------- paint (the SVG scene) ---------------- */
  _paint: function () {
    if (!this._svg || !this.st) return;
    var C = TippingPourCore, L = this._L, st = this.st, self = this, SKY = this._sky, X = L.X, out = [];
    var Y = function (yUp) { return SKY - yUp; };
    /* the counter, the drip tray (sunk under the right vessel), the dish */
    var trayW = L.mode === 'wide' ? 120 : 96, trayX = X.R - trayW / 2;
    out.push('<rect class="tp-counter" x="0" y="' + SKY + '" width="' + L.SW + '" height="5"/>');
    out.push('<rect class="tp-tray" x="' + trayX + '" y="' + (SKY + 5) + '" width="' + trayW + '" height="9" rx="2"/>');
    for (var gx = trayX + 6; gx < trayX + trayW - 3; gx += 6) out.push('<line class="tp-grille" x1="' + gx + '" y1="' + (SKY + 6) + '" x2="' + gx + '" y2="' + (SKY + 13) + '"/>');
    var spillR = st.spilled - (this._spillL || 0);
    if (this._spillL > 0) {
      var oL = C.outer(C.V[st.L]), lx = X.L - oL.r - 4, lw = Math.min(24, 6 + Math.sqrt(this._spillL) * 0.2);
      out.push('<ellipse class="tp-puddle" cx="' + (lx - lw / 2 + 4) + '" cy="' + (SKY - 0.6) + '" rx="' + (lw / 2) + '" ry="1.6"/>');
    }
    if (spillR > 0) {
      var pw = Math.min(trayW - 6, 10 + Math.sqrt(spillR) * 0.42);
      out.push('<ellipse class="tp-puddle" cx="' + (X.R) + '" cy="' + (SKY + 9) + '" rx="' + (pw / 2) + '" ry="3.4"/>');
      if (this._ring === 'spill') out.push('<ellipse class="tp-ring" cx="' + X.R + '" cy="' + (SKY + 9) + '" rx="' + (trayW / 2 + 3) + '" ry="9"/>');
    }
    var dish = this._berryHome(), du = L.u, dy = (dish.top + L.PIC / 2) / du - 2;
    out.push('<ellipse class="tp-dish" cx="' + (dish.left / du) + '" cy="' + dy + '" rx="' + (L.PIC / du * 0.5) + '" ry="' + (L.PIC / du * 0.1) + '"/>');
    /* the basket of right calls (no number, just berries) */
    var bx = X.basket, by = dy - 5;
    out.push('<path class="tp-basket" d="M' + (bx - 13) + ' ' + (by - 6) + ' L' + (bx + 13) + ' ' + (by - 6) + ' L' + (bx + 9) + ' ' + (by + 5) + ' L' + (bx - 9) + ' ' + (by + 5) + ' Z"/>');
    for (var k = 0; k < Math.min(this._basket, 9); k++) out.push('<circle class="tp-bb" cx="' + (bx - 8 + (k % 5) * 4) + '" cy="' + (by - 8 - Math.floor(k / 5) * 3.5) + '" r="2.4"/>');
    /* the tap: a pipe from the left edge, a spout over the left vessel */
    if (this._pose.docked !== 'R') {
      out.push('<path class="tp-pipe" d="M0 ' + Y(TAP_Y) + ' L' + X.L + ' ' + Y(TAP_Y) + ' L' + X.L + ' ' + Y(TAP_Y - 8) + '"/>');
      out.push('<rect class="tp-spout" x="' + (X.L - 4) + '" y="' + Y(TAP_Y - 6) + '" width="8" height="5" rx="1"/>');
    }
    /* the vessels: the docked one last (it is in front) */
    var order = this._pose.docked === 'L' ? ['R', 'L'] : ['L', 'R'];
    order.forEach(function (s) { out.push(self._vesselSVG(s)); });
    /* the stream from the tap while filling */
    if (this._fillTo != null) {
      var lv = C.levelFor(C.V[st.L], st.vol.L) + C.outer(C.V[st.L]).floor;
      out.push('<rect class="tp-juice" x="' + (X.L - 1.6) + '" y="' + Y(TAP_Y - 11) + '" width="3.2" height="' + Math.max(0, (TAP_Y - 11) - lv) + '"/>');
    }
    /* the pour stream, and the spill over the far rim */
    if (this._pose.docked && this._flow.pour > 0) out.push(this._streamSVG());
    if (this._flow.spill > 0) out.push(this._spillSVG());
    this._svg.innerHTML = out.join('');
    this._paintUI();
  },
  _xf: function (s) {
    /* local (x right, y up from the outer foot) → svg, through the pose and its tilt */
    var p = this._pose[s], SKY = this._sky, tilt = this._pose.docked === s ? this.st.tilt : 0;
    var a = tilt * Math.PI / 180, c = Math.cos(a), sn = Math.sin(a), dir = p.dir || 1;
    return function (q) {
      var x = p.x + q[0], y = p.y + q[1];
      if (tilt && p.pivot) { var dx = x - p.pivot[0], dy = y - p.pivot[1]; x = p.pivot[0] + dx * c + dir * dy * sn; y = p.pivot[1] - dir * dx * sn + dy * c; }
      return [x, SKY - y];
    };
  },
  _vesselSVG: function (s) {
    var C = TippingPourCore, st = this.st, v = C.V[st[s]], o = C.outer(v), f = this._xf(s), out = [];
    var poly = function (pts, cls, extra) { return '<polygon class="' + cls + '" points="' + pts.map(function (q) { var w = f(q); return w[0].toFixed(2) + ',' + w[1].toFixed(2); }).join(' ') + '"' + (extra || '') + '/>'; };
    var path = function (pts, cls) { return '<path class="' + cls + '" d="' + pts.map(function (q, i) { var w = f(q); return (i ? 'L' : 'M') + w[0].toFixed(2) + ' ' + w[1].toFixed(2); }).join(' ') + '"/>'; };
    var cav = C.cavPoly(v);
    /* the outer shell */
    var shell = [];
    if (v.thick) shell = [[-o.r, o.h], [-o.r, 0], [o.r, 0], [o.r, o.h]];
    else {
      var top = C.cavTop(v);
      for (var i = v.cav.length - 1; i >= 0; i--) { var t = v.cav[i]; shell.push([-(t[3] + C.WALL), o.floor + t[1]]); shell.push([-(t[2] + C.WALL), o.floor + t[0]]); }
      shell.push([-(v.cav[0][2] + C.WALL), 0]); shell.push([v.cav[0][2] + C.WALL, 0]);
      for (var j = 0; j < v.cav.length; j++) { var u2 = v.cav[j]; shell.push([u2[2] + C.WALL, o.floor + u2[0]]); shell.push([u2[3] + C.WALL, o.floor + u2[1]]); }
      void top;
    }
    if (C.hasHandle(v)) out.push(path([[-o.r, o.h * 0.78], [-o.r - C.HANDLE + 2, o.h * 0.72], [-o.r - C.HANDLE + 2, o.h * 0.32], [-o.r, o.h * 0.26]], 'tp-handle'));
    if (v.thick) out.push(poly(shell, 'tp-stone'));
    out.push(poly(cav, 'tp-glass'));
    /* the juice: its surface stays level however the vessel is tipped */
    var vol = st.vol[s];
    if (vol > 0) {
      var dir = (this._pose[s] && this._pose[s].dir) || 1, tilt = this._pose.docked === s ? st.tilt : 0;
      var lp = C.liquidPoly(v, vol, tilt, dir);
      if (lp.length > 2) out.push(poly(lp, 'tp-juice-in'));
    }
    /* evidence on the right vessel: the dashed gap band, the brim sparkle */
    if (s === 'R' && st.outcome && !this._pose.docked) {
      var lvl = C.levelFor(v, vol), ct = C.cavTop(v);
      if (st.outcome === 'gap' && ct - lvl > 0.5) {
        var rl = C.radiusAt(v, lvl), rt = C.radiusAt(v, ct);
        out.push(poly([[-rl + 1, o.floor + lvl], [rl - 1, o.floor + lvl], [rt - 1, o.floor + ct - 0.6], [-rt + 1, o.floor + ct - 0.6]], 'tp-gap' + (this._ring === 'gap' ? ' is-ring' : '')));
      }
      if (st.outcome === 'brim') {
        var rr = C.radiusAt(v, ct), sy = o.floor + ct;
        [-rr * 0.6, 0, rr * 0.6].forEach(function (sx) { var w = f([sx, sy + 3]); out.push('<path class="tp-spark' + (this._ring === 'brim' ? ' is-ring' : '') + '" d="M' + w[0] + ' ' + (w[1] - 4) + ' L' + (w[0] + 1.2) + ' ' + (w[1] - 1.2) + ' L' + (w[0] + 4) + ' ' + w[1] + ' L' + (w[0] + 1.2) + ' ' + (w[1] + 1.2) + ' L' + w[0] + ' ' + (w[1] + 4) + ' L' + (w[0] - 1.2) + ' ' + (w[1] + 1.2) + ' L' + (w[0] - 4) + ' ' + w[1] + ' L' + (w[0] - 1.2) + ' ' + (w[1] - 1.2) + ' Z"/>'); }, this);
      }
    }
    out.push(path(shell, v.thick ? 'tp-shell is-thick' : 'tp-shell'));
    if (v.thick) out.push(path(cav.slice(0, cav.length), 'tp-cavline'));
    /* a highlight down the glass */
    if (!v.thick) out.push(path([[-(v.cav[0][2] * 0.62), o.floor + C.cavTop(v) * 0.86], [-(v.cav[0][2] * 0.62), o.floor + C.cavTop(v) * 0.22]], 'tp-hi'));
    /* the right place glows from the second miss */
    var g = C.glow(st);
    if (g && ((g === 'A' && s === 'L') || (g === 'B' && s === 'R'))) out.push(path(shell, 'tp-glowline'));
    return '<g class="tp-v tp-v-' + s + '">' + out.join('') + '</g>';
  },
  _streamSVG: function () {
    var C = TippingPourCore, st = this.st, from = this._pose.docked, to = from === 'L' ? 'R' : 'L';
    var p = this._pose[from], lip = C.lipInner(C.V[st[from]], p.dir), w = this._xf(from)(lip);
    var vt = C.V[st[to]], lv = C.levelFor(vt, st.vol[to]) + C.outer(vt).floor, SKY = this._sky;
    var x2 = w[0] + p.dir * 3, y2 = SKY - lv;
    return '<path class="tp-stream" d="M' + w[0].toFixed(2) + ' ' + w[1].toFixed(2) + ' Q' + (w[0] + p.dir * 4).toFixed(2) + ' ' + (w[1] + 4).toFixed(2) + ' ' + x2.toFixed(2) + ' ' + y2.toFixed(2) + '"/>';
  },
  _spillSVG: function () {
    var C = TippingPourCore, st = this.st, to = this._pose.docked === 'R' ? 'L' : 'R', v = C.V[st[to]], o = C.outer(v), X = this._L.X[to], SKY = this._sky;
    var dir = to === 'R' ? 1 : -1, rimX = X + dir * o.r, rimY = SKY - o.h;
    return '<path class="tp-stream" d="M' + rimX + ' ' + rimY + ' Q' + (rimX + dir * 4) + ' ' + (rimY + 3) + ' ' + (rimX + dir * 3) + ' ' + (SKY + 8) + '"/>';
  },
  _paintUI: function () {
    var C = TippingPourCore, st = this.st, self = this, g = C.glow(st);
    Object.keys(this._coasters).forEach(function (p) {
      var b = self._coasters[p];
      b.classList.toggle('is-glow', g === p);
      b.classList.toggle('is-ring', (self._ring === 'brim' && p === 'SAME'));
    });
    this._vbtn.L.classList.toggle('is-glow', g === 'A'); this._vbtn.R.classList.toggle('is-glow', g === 'B');
    this._knob.classList.toggle('is-ready', !!st.berry && !st.vol.L && !st.outcome && !this._pose.docked);
    this._placeBerry();
    var h = C.hint(st), msg = '';
    /* once the shell's bubble carries the win line, the note invites free pouring instead */
    if (st.done) msg = this._afterOk ? this._t('playNote') : this._t(C.success(st).key);
    else if (h) msg = this._t(h.key);
    else if (st.berry && !st.outcome && !st.vol.L && this._fillTo == null) msg = this._t('stepFill');
    else if (st.berry && !st.outcome && st.vol.L > 0 && !this._pose.docked) msg = this._t('stepPour');
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
    var ar = C.aria(st); this._scene.setAttribute('aria-label', ar ? this._t(ar) : '');
  },

  /* ---------------- the hand: the berry ---------------- */
  _bindBerry: function (el) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self.st.done || self._pose.docked) return;
      ev.preventDefault();
      var sr = self._scene.getBoundingClientRect(), x0 = ev.clientX, y0 = ev.clientY, moved = false;
      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var move = function (e) {
        if (!moved && Math.hypot(e.clientX - x0, e.clientY - y0) < 6) return;
        moved = true; self._berryDrag = true; self._sel = false;
        self._berryAt = { left: e.clientX - sr.left, top: e.clientY - sr.top }; self._placeBerry(); el.classList.add('is-drag');
      };
      var up = function (e) {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        el.classList.remove('is-drag');
        if (!moved) { self._sel = !self._sel; self._berryAt = null; self._paintUI(); return; }
        var where = self._hitPlace(e.clientX, e.clientY);
        self._berryAt = null; self._later(function () { self._berryDrag = false; }, 0);
        if (where) self._place(where); else self._paintUI();
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
    el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); if (!self.st.done) { self._sel = !self._sel; self._paintUI(); } } });
  },
  /* which berry place is under a point (vessel boxes and coasters, generous) */
  _hitPlace: function (cx, cy) {
    var st = this.st, best = null;
    var test = function (el, where) { if (!el) return; var r = el.getBoundingClientRect(); if (cx >= r.left - 14 && cx <= r.right + 14 && cy >= r.top - 30 && cy <= r.bottom + 10) best = best || where; };
    Object.keys(this._coasters).forEach(function (p) { test(this._coasters[p], p); }, this);
    if (!st.fit) { test(this._vbtn.L, 'A'); test(this._vbtn.R, 'B'); }
    return best;
  },
  _place: function (where) {
    var C = TippingPourCore, st = this.st, self = this;
    if (this._busy || st.done || this._pose.docked) return;
    var res = C.place(st, where);
    this._sel = false;
    if (res.result === 'nope') { this._wiggle(this._berry); return; }
    this.api.sound(587);
    if (res.result === 'ok') { this._win(); return; }
    if (res.result === 'wrong') { this._miss(); return; }
    this._paint();
    void self;
  },
  _wiggle: function (el) { if (!el) return; el.classList.remove('is-wiggle'); void el.offsetWidth; el.classList.add('is-wiggle'); },
  _nudgeBerry: function () {
    var st = this.st; st.last = { result: 'nobery' };
    this._wiggle(this._berry); this._paintUI();
  },

  /* ---------------- the hand: the tap ---------------- */
  _fill: function () {
    var C = TippingPourCore, st = this.st, self = this;
    if (this._busy || this._fillTo != null || this._pose.docked) return;
    if (!st.berry && !st.done) { this._nudgeBerry(); return; }
    if (st.vol.L >= C.capacity(C.V[st.L]) - 1e-6) { this._wiggle(this._knob); return; }
    if (!st.done && (st.poured || st.outcome)) { this._wiggle(this._knob); return; }
    if (st.last && st.last.result === 'nobery') st.last = null;
    var target = C.capacity(C.V[st.L]);
    if (this.FAST) { if (st.done) st.vol.L = target; else C.fill(st); this._paint(); return; }
    this._fillTo = target; this._fillFrom = st.vol.L; this._fillT = 0;
    this.api.sound(330);
    this._startLoop();
    void self;
  },

  /* ---------------- the hand: the vessels ---------------- */
  _canMove: function (s) {
    var st = this.st;
    if (st.done) return true;                                 /* after the call: pour any way you like */
    if (s !== 'L' || st.outcome) return false;
    return true;
  },
  _bindVessel: function (el, s) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy || self._fillTo != null) return;
      var st = self.st;
      if (self._sel && !st.fit) { ev.preventDefault(); self._sel = false; self._place(s === 'L' ? 'A' : 'B'); return; }
      if (!st.berry && !st.done) { ev.preventDefault(); self._nudgeBerry(); return; }
      if (!self._canMove(s)) return;
      if (!st.done && st.vol.L <= 0) { ev.preventDefault(); self._wiggle(self._knob); st.last = null; self._paintUI(); return; }
      ev.preventDefault();
      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var x0 = ev.clientX, y0 = ev.clientY, moved = false, u = self._L.u, docked = self._pose.docked === s, t0 = st.tilt;
      var start = { x: self._pose[s].x, y: self._pose[s].y };
      var move = function (e) {
        var dx = e.clientX - x0, dy = e.clientY - y0;
        if (!moved && Math.hypot(dx, dy) < 6) return;
        moved = true;
        if (docked) {
          if (st.tilt < 2 && Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 30) { self._undock(); docked = false; start = { x: self._pose[s].x, y: 0 }; x0 = e.clientX; y0 = e.clientY; return; }
          self._setTilt(t0 + dy / (70 * u) * TippingPourCore.MAX_TILT); return;
        }
        self._pose[s].x = start.x + dx / u; self._pose[s].y = Math.max(0, start.y - dy / u);
        el.classList.add('is-lift'); self._place2(); self._paint();
      };
      var up = function () {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        el.classList.remove('is-lift');
        if (docked) return;
        if (!moved) { self._dock(s); return; }
        /* close enough to the other vessel's mouth? then it docks; else it goes home */
        var C = TippingPourCore, to = s === 'L' ? 'R' : 'L', X = self._L.X, d = C.dockPose(st[s], st[to], X[s], X[to]);
        var dist = Math.hypot(self._pose[s].x - d.x, self._pose[s].y - d.y);
        if (dist < 48) self._dock(s); else { self._restPose(); self._place2(); self._paint(); }
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
    el.addEventListener('keydown', function (ev) {
      if (ev.key !== 'Enter' && ev.key !== ' ') return;
      ev.preventDefault();
      var st = self.st;
      if (self._sel && !st.fit) { self._sel = false; self._place(s === 'L' ? 'A' : 'B'); return; }
      if (self._pose.docked === s) { self._undock(); return; }
      if (!st.berry && !st.done) { self._nudgeBerry(); return; }
      if (self._canMove(s) && (st.done || st.vol.L > 0)) self._dock(s);
    });
  },
  _dock: function (s) {
    if (this._pose.docked || this._busy) return;
    if (!this._canMove(s)) return;
    if (!this.st.done && this.st.vol.L <= 0) { this._wiggle(this._knob); return; }
    this.st.tilt = 0; this._dockAt(s); this.st.docked = s;
    this.api.sound(440);
    if (s === 'R') { this._render2(); return; }
    this._place2(); this._paint();
    if (this._tip && !this._tip.hidden && document.activeElement === this._vbtn[s]) { /* keep focus */ }
  },
  _undock: function () {
    if (!this._pose || !this._pose.docked) return;
    var wasR = this._pose.docked === 'R';
    this.st.tilt = 0; this.st.docked = null; this._flow = { pour: 0, spill: 0 };
    this._restPose(); this._stopLoop();
    if (wasR) { this._render2(); return; }
    this._place2(); this._paint();
  },
  _setTilt: function (deg) {
    if (!this._pose.docked) return;
    this.st.tilt = Math.max(0, Math.min(TippingPourCore.MAX_TILT, deg));
    this._paint(); this._startLoop();
  },
  _bindTip: function (el) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      ev.preventDefault(); if (!self._pose.docked) return;
      self._setTilt(self.st.tilt + 20); self._hold = 1;
      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var up = function () { self._hold = 0; el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
    el.addEventListener('keydown', function (ev) { if (ev.key === 'Enter' || ev.key === ' ' || ev.key === 'ArrowDown') { ev.preventDefault(); self._setTilt(self.st.tilt + 20); } else if (ev.key === 'ArrowUp') { ev.preventDefault(); self._setTilt(self.st.tilt - 20); } });
  },

  /* ---------------- the loop: filling and pouring ---------------- */
  _startLoop: function () {
    if (this._raf || typeof requestAnimationFrame === 'undefined') return;
    var self = this; this._last = null;
    var step = function (now) {
      self._raf = null;
      if (!self._wrap || !self._wrap.isConnected) return;
      var dt = self._last == null ? 0.016 : Math.min(0.05, (now - self._last) / 1000); self._last = now;
      if (self._tick(dt)) self._raf = requestAnimationFrame(step);
    };
    this._raf = requestAnimationFrame(step);
  },
  _stopLoop: function () { if (this._raf && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(this._raf); this._raf = null; },
  /* one frame; returns true while there is still something moving */
  _tick: function (dt) {
    var C = TippingPourCore, st = this.st, busy = false;
    if (this._fillTo != null) {
      this._fillT += dt / this.FILL_S;
      var cap = this._fillTo, v = this._fillFrom + (cap - this._fillFrom) * Math.min(1, this._fillT);
      st.vol.L = v;
      if (this._fillT >= 1) { this._fillTo = null; if (st.done) st.vol.L = cap; else { st.vol.L = 0; C.fill(st); } this.api.sound(1046); }
      busy = true;
    }
    if (this._pose.docked) {
      if (this._hold) { this.st.tilt = Math.min(C.MAX_TILT, st.tilt + 60 * dt); busy = true; }
      var before = st.spilled, hadOutcome = !!st.outcome;
      var out = C.pourStep(st, dt, this._pose.docked);
      this._flow = { pour: out, spill: st.spilled - before };
      if (this._pose.docked === 'R') this._spillL += st.spilled - before;   /* poured back: it runs over the left one, onto the counter */
      if (out > 1e-6) busy = true;
      if (!hadOutcome && st.outcome) { this._paint(); this._settled(); return false; }
    }
    this._paint();
    return busy;
  },
  /* the juice has decided: put the vessel back, then show the call */
  _settled: function () {
    var self = this, st = this.st;
    this._busy = true;
    this.api.sound(st.outcome === 'brim' ? 1600 : st.outcome === 'spill' ? 220 : 392);
    this._later(function () {
      var wasR = self._pose.docked === 'R';
      self._flow = { pour: 0, spill: 0 }; st.tilt = 0; st.docked = null; self._restPose();
      self._busy = false; if (wasR) self._render2(); else self._place2();
      if (st.last && st.last.result === 'ok') self._win(); else if (st.last && st.last.result === 'wrong') self._miss(); else self._paint();
    }, this._ms(this.BACK_MS));
  },
  _miss: function () {
    var st = this.st;
    this._ring = st.outcome; this._berryAt = null;
    this.api.sound(196);
    this._place2(); this._paint();
  },
  _win: function () {
    var self = this, st = this.st, C = TippingPourCore;
    this._ring = null; this._basket++;
    /* the berry hops into the right vessel's juice (or stays on its coaster) */
    var w = C.want(st);
    if (w === 'A' || w === 'B') { var s = w === 'A' ? 'L' : 'R', v = C.V[st[s]], lv = C.levelFor(v, st.vol[s]) + C.outer(v).floor; this._landed = this._px(this._L.X[s], Math.max(lv, 6) + 4); }
    else this._landed = null;
    this._bramble.classList.remove('is-hop'); void this._bramble.offsetWidth; this._bramble.classList.add('is-hop');
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._place2(); this._paint();
    this._busy = true;
    this._later(function () {
      self._busy = false; self._afterOk = true; self._paint();
      var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click();
    }, this._ms(this.OK_MS));
  }
};

var TAP_Y = TippingPourCore.TAP_Y;

/* the coaster icons: two equal bars for "the same"; a level under a rim line for "fits"; a drop over a rim for "spills" */
function coasterIcon(p) {
  var base = '<svg viewBox="0 0 64 44" aria-hidden="true"><ellipse cx="32" cy="36" rx="28" ry="6" class="tp-co"/>';
  if (p === 'SAME') return base + '<rect x="18" y="12" width="28" height="6" rx="3" class="tp-eq"/><rect x="18" y="23" width="28" height="6" rx="3" class="tp-eq"/></svg>';
  if (p === 'FITS') return base + '<path d="M20 6 L20 30 L44 30 L44 6" class="tp-cupi"/><rect x="22" y="16" width="20" height="12" class="tp-jl"/><line x1="16" y1="6" x2="48" y2="6" class="tp-rim"/></svg>';
  return base + '<path d="M20 8 L20 30 L44 30 L44 8" class="tp-cupi"/><rect x="22" y="8" width="20" height="20" class="tp-jl"/><path d="M44 8 Q50 8 51 16 Q52 22 48 22 Q45 22 46 16 Q47 11 44 8 Z" class="tp-jl"/></svg>';
}

var tpCssDone = false;
function injectTippingPourCSS() {
  if (tpCssDone || typeof document === 'undefined') return;
  tpCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.tp-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--tp-ink:#0F4A40;--tp-teal:#146B5E;--tp-coral:#F2784B;--tp-juice:#B03A5B;}'
  + '.tp-scene{position:relative;width:100%;touch-action:none;user-select:none;-webkit-user-select:none;}'
  + '.tp-svg{position:absolute;left:0;top:0;width:100%;height:100%;display:block;overflow:visible;}'
  + '.tp-counter{fill:#C99A6B;stroke:#8A6440;stroke-width:1;}'
  + '.tp-tray{fill:#DCD3C6;stroke:#8C8478;stroke-width:.8;} .tp-grille{stroke:#A79D90;stroke-width:.8;}'
  + '.tp-puddle{fill:var(--tp-juice);opacity:.85;} .tp-ring{fill:none;stroke:var(--tp-coral);stroke-width:1.6;stroke-dasharray:3 2;}'
  + '.tp-dish{fill:#EFE6D6;stroke:#B9A88A;stroke-width:.8;}'
  + '.tp-basket{fill:#E7C98E;stroke:#9C7A3C;stroke-width:.9;stroke-linejoin:round;} .tp-bb{fill:var(--tp-juice);}'
  + '.tp-pipe{fill:none;stroke:#8C9894;stroke-width:4;stroke-linecap:round;stroke-linejoin:round;} .tp-spout{fill:#6E7B77;}'
  + '.tp-glass{fill:#EAF6F8;} .tp-stone{fill:#D9C6AE;stroke:none;}'
  + '.tp-shell{fill:none;stroke:var(--tp-ink);stroke-width:1.5;stroke-linejoin:round;stroke-linecap:round;} .tp-shell.is-thick{stroke-width:1.6;}'
  + '.tp-cavline{fill:none;stroke:#7E6A52;stroke-width:.8;}'
  + '.tp-handle{fill:none;stroke:var(--tp-ink);stroke-width:2.6;stroke-linecap:round;stroke-linejoin:round;}'
  + '.tp-hi{fill:none;stroke:#fff;stroke-width:1.2;stroke-linecap:round;opacity:.9;}'
  + '.tp-juice-in{fill:var(--tp-juice);} .tp-juice{fill:var(--tp-juice);}'
  + '.tp-stream{fill:none;stroke:var(--tp-juice);stroke-width:2.6;stroke-linecap:round;}'
  + '.tp-gap{fill:none;stroke:var(--tp-teal);stroke-width:1.1;stroke-dasharray:2.6 1.8;} .tp-gap.is-ring{stroke:var(--tp-coral);stroke-width:1.6;}'
  + '.tp-spark{fill:#F4C542;stroke:#B98A10;stroke-width:.4;} .tp-spark.is-ring{fill:var(--tp-coral);}'
  + '.tp-glowline{fill:none;stroke:var(--tp-teal);stroke-width:3.4;opacity:.55;animation:tp-pulse .7s ease-in-out 2;}'
  + '@keyframes tp-pulse{50%{opacity:.1;}}'
  + '.tp-vessel{position:absolute;padding:0;margin:0;border:0;border-radius:14px;background:transparent;cursor:grab;touch-action:none;}'
  + '.tp-vessel.is-lift{cursor:grabbing;filter:drop-shadow(0 6px 6px rgba(0,0,0,.18));} .tp-vessel.is-glow{box-shadow:0 0 0 3px rgba(20,107,94,.35);}'
  + '.tp-coaster{position:absolute;padding:0;border:0;border-radius:12px;background:#FFFBF2;box-shadow:inset 0 0 0 2px #C9B897;cursor:pointer;}'
  + '.tp-coaster svg{width:100%;height:100%;display:block;} .tp-co{fill:#E8DCC2;} .tp-eq{fill:var(--tp-teal);} .tp-cupi{fill:#EAF6F8;stroke:var(--tp-ink);stroke-width:2.4;stroke-linejoin:round;} .tp-jl{fill:var(--tp-juice);} .tp-rim{stroke:var(--tp-teal);stroke-width:2.4;stroke-dasharray:4 3;}'
  + '.tp-coaster.is-glow{box-shadow:inset 0 0 0 3px var(--tp-teal),0 0 0 5px rgba(20,107,94,.25);animation:tp-cpulse .7s ease-in-out 2;} .tp-coaster.is-ring{box-shadow:inset 0 0 0 3px var(--tp-coral);}'
  + '@keyframes tp-cpulse{50%{transform:scale(1.06);}}'
  + '.tp-tip{z-index:5;} .tp-knob,.tp-tip{position:absolute;padding:0;border:0;border-radius:50%;background:#FFFBF2;box-shadow:0 2px 0 #C9B897,inset 0 0 0 2px #8C9894;cursor:pointer;}'
  + '.tp-knob svg,.tp-tip svg{width:100%;height:100%;display:block;} .tp-knob-c{fill:#E3F1EC;stroke:var(--tp-teal);stroke-width:2.5;} .tp-knob-b{fill:var(--tp-teal);}'
  + '.tp-knob.is-ready{animation:tp-cpulse .9s ease-in-out infinite;box-shadow:0 2px 0 #C9B897,inset 0 0 0 3px var(--tp-coral);}'
  + '.tp-tip-a{fill:none;stroke:var(--tp-teal);stroke-width:3.4;stroke-linecap:round;stroke-linejoin:round;} .tp-knob[hidden],.tp-tip[hidden]{display:none;}'
  + '.tp-berry{position:absolute;padding:0;border:0;background:transparent;cursor:grab;touch-action:none;transition:left .16s ease,top .16s ease;z-index:3;}'
  + '.tp-berry img{width:100%;height:100%;display:block;pointer-events:none;} .tp-berry.is-drag{transition:none;cursor:grabbing;transform:scale(1.1);} .tp-berry.is-sel{transform:translateY(-6px) scale(1.08);filter:drop-shadow(0 4px 3px rgba(0,0,0,.25));}'
  + '.is-wiggle{animation:tp-wiggle .45s ease-in-out;} @keyframes tp-wiggle{20%{transform:rotate(-12deg);}40%{transform:rotate(10deg);}60%{transform:rotate(-7deg);}80%{transform:rotate(4deg);}}'
  + '.tp-bramble{position:absolute;pointer-events:none;object-fit:contain;scale:-1 1;} .tp-bramble.is-hop{animation:tp-hop .5s ease-out 2;} @keyframes tp-hop{40%{transform:translateY(-18px);}}'
  + '.tp-note{min-height:28px;align-self:center;font:700 20px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--tp-ink);text-align:center;max-width:620px;}'
  + '.tp-note.is-ok{color:var(--tp-teal);font-weight:800;} .tp-note.is-wrong{color:#A6461F;}'
  + '.tp-berry:focus-visible,.tp-vessel:focus-visible,.tp-coaster:focus-visible,.tp-knob:focus-visible,.tp-tip:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '.is-narrow .tp-note{font-size:17px;}'
  + '@media (prefers-reduced-motion: reduce){.tp-berry{transition:none;} .is-wiggle,.tp-bramble.is-hop,.tp-knob.is-ready,.tp-coaster.is-glow,.tp-glowline{animation:none;}}';
  var el = document.createElement('style'); el.id = 'tp-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.TippingPourActivity = TippingPourActivity;
