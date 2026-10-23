/* =====================================================================
   question-lamp-activity.js — ACTIVITY #76 of the one-by-one rebuild:
   "Wren's Question Window" → THE QUESTION LAMP (L.K.1.d, 11 locales).
   Design sheet: docs/activities-rebuild/designs/076-wren-question-window.md
   ---------------------------------------------------------------------
   THE INVENTION: every question word is a lamp that shines on one kind of
   answer. Put a word in the question's gap and press Check: the brass lamp
   swings along its rail and drops its beam on the answer card of the kind
   that word asks for — the gold-framed card when it is right, another card
   (or nothing) when it is not. After a right answer the lamp tours the
   strip: each card lights with the question word that asks about it.
   Match: the beam drops into the reply slot. Sort: three lamps over three
   trays light only the cards of their own kind.
   ACTIVITY LAYER ONLY: the model is question-lamp-core.js; pictures through
   lcs-pictures.js; lcs-shell.js untouched (the shell's Check is hidden and
   pressed by this activity on success). Test seams:
   window.QuestionLampActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var QuestionLampActivity = {
  id: 'question-lamp',
  apparatusClasses: ['ql-'],

  strings: {
    title:      {en:'Wren\'s Question Window',de:'Wrens Fragefenster',nl:'Het vragenluik van Wren',da:'Wrens spørgsmålsvindue',sv:'Wrens frågefönster',no:'Wrens spørsmålsvindu',es:'La ventanilla de preguntas de Wren',it:'La finestrella delle domande di Wren',pt:'A janelinha de perguntas da Wren',fr:'Le guichet des questions de Wren',fi:'Wrenin kysymysikkuna'},
    instrBubble:{en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    tAsk:       {en:'Which question word asks about the gold part?',de:'Welches Fragewort fragt nach dem goldenen Teil?',nl:'Welk vraagwoord vraagt naar het gouden deel?',da:'Hvilket spørgeord spørger om den gyldne del?',sv:'Vilket frågeord frågar efter den gyllene delen?',no:'Hvilket spørreord spør om den gylne delen?',es:'¿Qué palabra pregunta por la parte dorada?',it:'Quale parola riguarda la parte dorata?',pt:'Que palavra pergunta pela parte dourada?',fr:'Quel mot pose la question sur la partie dorée ?',fi:'Mikä kysymyssana kysyy kultaisesta osasta?'},
    tMatch:     {en:'Find the answer to the question.',de:'Finde die Antwort auf die Frage.',nl:'Zoek het antwoord op de vraag.',da:'Find svaret på spørgsmålet.',sv:'Hitta svaret på frågan.',no:'Finn svaret på spørsmålet.',es:'Busca la respuesta a la pregunta.',it:'Trova la risposta alla domanda.',pt:'Encontre a resposta da pergunta.',fr:'Trouve la réponse à la question.',fi:'Etsi vastaus kysymykseen.'},
    tSort:      {en:'Sort the answers under the lamps.',de:'Sortiere die Antworten unter die Lampen.',nl:'Sorteer de antwoorden onder de lampen.',da:'Sortér svarene under lamperne.',sv:'Sortera svaren under lamporna.',no:'Sorter svarene under lampene.',es:'Ordena las respuestas debajo de las lámparas.',it:'Metti le risposte sotto le lampade giuste.',pt:'Separe as respostas embaixo das lâmpadas.',fr:'Range les réponses sous les lampes.',fi:'Lajittele vastaukset lamppujen alle.'},
    check:      {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hEmpty:     {en:'Put a question word in the gap. Which part of the answer do we want to ask about?',de:'Setz ein Fragewort in die Lücke. Nach welchem Teil der Antwort wollen wir fragen?',nl:'Zet een vraagwoord op de lege plek. Naar welk deel van het antwoord willen we vragen?',da:'Sæt et spørgeord i hullet. Hvilken del af svaret vil vi spørge om?',sv:'Sätt ett frågeord i luckan. Vilken del av svaret vill vi fråga efter?',no:'Sett et spørreord i hullet. Hvilken del av svaret vil vi spørre om?',es:'Pon una palabra en el hueco. ¿Por qué parte de la respuesta queremos preguntar?',it:'Metti una parola nello spazio. Di quale parte della risposta vogliamo chiedere?',pt:'Coloque uma palavra no espaço. Por qual parte da resposta queremos perguntar?',fr:'Mets un mot interrogatif dans le trou. Sur quelle partie de la réponse veut-on poser la question ?',fi:'Laita kysymyssana aukkoon. Mistä vastauksen osasta haluamme kysyä?'},
    hUnknown:   {en:'That is not one of the question words. Look at the keys.',de:'Das ist keins der Fragewörter. Schau dir die Tasten an.',nl:'Dat is geen van de vraagwoorden. Kijk naar de toetsen.',da:'Det er ikke et af spørgeordene. Se på tasterne.',sv:'Det är inte ett av frågeorden. Titta på tangenterna.',no:'Det er ikke et av spørreordene. Se på tastene.',es:'Esa no es una de las palabras para preguntar. Mira las teclas.',it:'Non è una delle parole per fare domande. Guarda i tasti.',pt:'Essa não é uma das palavras de pergunta. Olhe as teclas.',fr:'Ce n’est pas un des mots interrogatifs. Regarde les touches.',fi:'Se ei ole yksi kysymyssanoista. Katso näppäimiä.'},
    hWrong:     {en:'“{w}” asks about {k}: the lamp lit up “{c}”. We want to ask about the gold part.',de:'„{w}“ fragt nach {k}: Die Lampe hat „{c}“ angestrahlt. Wir wollen nach dem goldenen Teil fragen.',nl:'„{w}” vraagt naar {k}: de lamp scheen op „{c}”. We willen naar het gouden deel vragen.',da:'»{w}« spørger om {k}: Lampen lyste på »{c}«. Vi vil spørge om den gyldne del.',sv:'”{w}” frågar efter {k}: lampan lyste på ”{c}”. Vi vill fråga efter den gyllene delen.',no:'«{w}» spør om {k}: Lampen lyste på «{c}». Vi vil spørre om den gylne delen.',es:'«{w}» pregunta por {k}: la lámpara iluminó «{c}». Queremos preguntar por la parte dorada.',it:'«{w}» riguarda {k}: la lampada ha illuminato «{c}». Vogliamo chiedere della parte dorata.',pt:'“{w}” pergunta por {k}: a lâmpada iluminou “{c}”. Queremos perguntar pela parte dourada.',fr:'« {w} » pose une question sur {k} : la lampe a éclairé « {c} ». On veut poser la question sur la partie dorée.',fi:'”{w}” kysyy {k}: lamppu valaisi kohdan ”{c}”. Haluamme kysyä kultaisesta osasta.'},
    hNone:      {en:'“{w}” asks about {k}, and this answer has none, so the lamp found nothing. We want to ask about the gold part.',de:'„{w}“ fragt nach {k}, und diese Antwort hat keine. Die Lampe hat nichts gefunden. Wir wollen nach dem goldenen Teil fragen.',nl:'„{w}” vraagt naar {k}, en dit antwoord heeft er geen. De lamp vond niets. We willen naar het gouden deel vragen.',da:'»{w}« spørger om {k}, og det svar har ingen. Lampen fandt intet. Vi vil spørge om den gyldne del.',sv:'”{w}” frågar efter {k}, och det svaret har ingen. Lampan hittade ingenting. Vi vill fråga efter den gyllene delen.',no:'«{w}» spør om {k}, og dette svaret har ingen. Lampen fant ingenting. Vi vil spørre om den gylne delen.',es:'«{w}» pregunta por {k}, pero esta respuesta no lo dice. La lámpara no encontró nada. Queremos preguntar por la parte dorada.',it:'«{w}» riguarda {k}, ma questa risposta non lo dice. La lampada non ha trovato niente. Vogliamo chiedere della parte dorata.',pt:'“{w}” pergunta por {k}, mas esta resposta não diz isso. A lâmpada não encontrou nada. Queremos perguntar pela parte dourada.',fr:'« {w} » pose une question sur {k}, mais cette réponse ne le dit pas : la lampe n’a rien trouvé. On veut poser la question sur la partie dorée.',fi:'”{w}” kysyy {k}, eikä tässä vastauksessa ole sellaista. Lamppu ei löytänyt mitään. Haluamme kysyä kultaisesta osasta.'},
    hMiss2:     {en:'Find the key with the same mark as the gold part.',de:'Such die Taste mit demselben Zeichen wie der goldene Teil.',nl:'Zoek de toets met hetzelfde teken als het gouden deel.',da:'Find tasten med samme tegn som den gyldne del.',sv:'Hitta tangenten med samma tecken som den gyllene delen.',no:'Finn tasten med samme tegn som den gylne delen.',es:'Busca la tecla con la misma marca que la parte dorada.',it:'Trova il tasto con lo stesso segno della parte dorata.',pt:'Procure a tecla com a mesma marca da parte dourada.',fr:'Trouve la touche qui a le même signe que la partie dorée.',fi:'Etsi näppäin, jossa on sama merkki kuin kultaisessa osassa.'},
    hEmptyMatch:{en:'Put one answer card in the reply slot.',de:'Leg eine Antwortkarte in das Antwortfeld.',nl:'Leg een antwoordkaart in het antwoordvak.',da:'Læg et svarkort i svarfeltet.',sv:'Lägg ett svarskort i svarsrutan.',no:'Legg et svarkort i svarfeltet.',es:'Pon una tarjeta de respuesta en el espacio.',it:'Metti una carta risposta nello spazio.',pt:'Coloque um cartão de resposta no espaço.',fr:'Mets une carte réponse dans la case.',fi:'Laita yksi vastauskortti vastauskohtaan.'},
    hMatch:     {en:'The lamp shines into the reply slot. Look at the question word: what does it ask about?',de:'Die Lampe strahlt ins Antwortfeld. Schau aufs Fragewort: Wonach fragt es?',nl:'De lamp schijnt in het antwoordvak. Kijk naar het vraagwoord: waarnaar vraagt het?',da:'Lampen lyser ned i svarfeltet. Se på spørgeordet: Hvad spørger det om?',sv:'Lampan lyser ner i svarsrutan. Titta på frågeordet: vad frågar det efter?',no:'Lampen lyser ned i svarfeltet. Se på spørreordet: Hva spør det om?',es:'La lámpara ilumina el espacio. Mira la palabra de la pregunta: ¿por qué pregunta?',it:'La lampada illumina lo spazio della risposta. Guarda la parola della domanda: che cosa chiede?',pt:'A lâmpada ilumina o espaço. Olhe a palavra da pergunta: o que ela pergunta?',fr:'La lampe éclaire la case. Regarde le mot interrogatif : que demande-t-il ?',fi:'Lamppu valaisee vastauskohdan. Katso kysymyssanaa: mitä se kysyy?'},
    hMatch2:    {en:'Find the card with the same mark as the question word.',de:'Such die Karte mit demselben Zeichen wie das Fragewort.',nl:'Zoek de kaart met hetzelfde teken als het vraagwoord.',da:'Find kortet med samme tegn som spørgeordet.',sv:'Hitta kortet med samma tecken som frågeordet.',no:'Finn kortet med samme tegn som spørreordet.',es:'Busca la tarjeta con la misma marca que la palabra de la pregunta.',it:'Trova la carta con lo stesso segno della parola della domanda.',pt:'Procure o cartão com a mesma marca da palavra da pergunta.',fr:'Trouve la carte qui a le même signe que le mot interrogatif.',fi:'Etsi kortti, jossa on sama merkki kuin kysymyssanassa.'},
    hEmptySort: {en:'Tap a card, then tap the lamp tray it belongs under.',de:'Tipp eine Karte an und dann das Fach unter der richtigen Lampe.',nl:'Tik op een kaart en dan op het vak onder de goede lamp.',da:'Tryk på et kort og så på bakken under den rigtige lampe.',sv:'Tryck på ett kort och sedan på facket under rätt lampa.',no:'Trykk på et kort og så på brettet under riktig lampe.',es:'Toca una tarjeta y luego la bandeja de la lámpara que le toca.',it:'Tocca una carta e poi il vassoio sotto la lampada giusta.',pt:'Toque num cartão e depois na bandeja da lâmpada certa.',fr:'Touche une carte, puis le plateau sous la bonne lampe.',fi:'Napauta korttia ja sitten oikean lampun alla olevaa tarjotinta.'},
    hNotAll:    {en:'Some cards are still waiting. Put every card under a lamp.',de:'Ein paar Karten warten noch. Leg jede Karte unter eine Lampe.',nl:'Er wachten nog kaarten. Leg elke kaart onder een lamp.',da:'Nogle kort venter stadig. Læg hvert kort under en lampe.',sv:'Några kort väntar fortfarande. Lägg varje kort under en lampa.',no:'Noen kort venter fortsatt. Legg hvert kort under en lampe.',es:'Todavía esperan algunas tarjetas. Pon cada tarjeta debajo de una lámpara.',it:'Alcune carte aspettano ancora. Metti ogni carta sotto una lampada.',pt:'Ainda há cartões esperando. Coloque cada cartão embaixo de uma lâmpada.',fr:'Des cartes attendent encore. Mets chaque carte sous une lampe.',fi:'Osa korteista odottaa vielä. Laita jokainen kortti jonkin lampun alle.'},
    hSort:      {en:'Each lamp lights only its own kind. The dark cards are in the wrong tray.',de:'Jede Lampe leuchtet nur auf ihre eigene Sorte. Die dunklen Karten liegen im falschen Fach.',nl:'Elke lamp schijnt alleen op zijn eigen soort. De donkere kaarten liggen in het verkeerde vak.',da:'Hver lampe lyser kun på sin egen slags. De mørke kort ligger i den forkerte bakke.',sv:'Varje lampa lyser bara på sin egen sort. De mörka korten ligger i fel fack.',no:'Hver lampe lyser bare på sin egen sort. De mørke kortene ligger på feil brett.',es:'Cada lámpara ilumina solo lo suyo. Las tarjetas oscuras están en la bandeja equivocada.',it:'Ogni lampada illumina solo il suo tipo. Le carte scure sono nel vassoio sbagliato.',pt:'Cada lâmpada ilumina só o seu tipo. Os cartões escuros estão na bandeja errada.',fr:'Chaque lampe n’éclaire que les cartes de sa sorte. Les cartes sombres sont sur le mauvais plateau.',fi:'Jokainen lamppu valaisee vain omaa lajiaan. Tummat kortit ovat väärällä tarjottimella.'},
    hSort2:     {en:'Look at the marks: every card goes under the lamp with its mark.',de:'Schau auf die Zeichen: Jede Karte gehört unter die Lampe mit ihrem Zeichen.',nl:'Kijk naar de tekens: elke kaart hoort onder de lamp met zijn teken.',da:'Se på tegnene: Hvert kort skal under lampen med dets tegn.',sv:'Titta på tecknen: varje kort ska under lampan med samma tecken.',no:'Se på tegnene: Hvert kort skal under lampen med samme tegn.',es:'Mira las marcas: cada tarjeta va debajo de la lámpara con su marca.',it:'Guarda i segni: ogni carta va sotto la lampada con il suo segno.',pt:'Olhe as marcas: cada cartão vai embaixo da lâmpada com a sua marca.',fr:'Regarde les signes : chaque carte va sous la lampe qui a son signe.',fi:'Katso merkkejä: jokainen kortti kuuluu sen lampun alle, jossa on sama merkki.'},
    okAsk:      {en:'“{q}” — “{c}”! “{w}” asks about {k}.',de:'„{q}“ – „{c}“! „{w}“ fragt nach {k}.',nl:'„{q}” – „{c}”! „{w}” vraagt naar {k}.',da:'»{q}« – »{c}«! »{w}« spørger om {k}.',sv:'”{q}” – ”{c}”! ”{w}” frågar efter {k}.',no:'«{q}» – «{c}»! «{w}» spør om {k}.',es:'«{q}» — «{c}». ¡«{w}» pregunta por {k}!',it:'«{q}» — «{c}»! «{w}» riguarda {k}.',pt:'“{q}” — “{c}”! “{w}” pergunta por {k}.',fr:'« {q} » — « {c} » ! « {w} » pose une question sur {k}.',fi:'”{q}” – ”{c}”! ”{w}” kysyy {k}.'},
    okMatch:    {en:'“{q}” — “{c}”!',de:'„{q}“ – „{c}“!',nl:'„{q}” – „{c}”!',da:'»{q}« – »{c}«!',sv:'”{q}” – ”{c}”!',no:'«{q}» – «{c}»!',es:'«{q}» — ¡«{c}»!',it:'«{q}» — «{c}»!',pt:'“{q}” — “{c}”!',fr:'« {q} » — « {c} » !',fi:'”{q}” – ”{c}”!'},
    okSort:     {en:'Every card is under its own lamp!',de:'Jede Karte liegt unter ihrer Lampe!',nl:'Elke kaart ligt onder zijn eigen lamp!',da:'Hvert kort ligger under sin egen lampe!',sv:'Varje kort ligger under sin egen lampa!',no:'Hvert kort ligger under sin egen lampe!',es:'¡Cada tarjeta está debajo de su lámpara!',it:'Ogni carta è sotto la sua lampada!',pt:'Cada cartão está embaixo da sua lâmpada!',fr:'Chaque carte est sous sa lampe !',fi:'Jokainen kortti on oman lamppunsa alla!'},
    kWho:       {en:'a person',de:'einer Person',nl:'een persoon',da:'en person',sv:'en person',no:'en person',es:'una persona',it:'una persona',pt:'uma pessoa',fr:'une personne',fi:'henkilöstä'},
    kWhat:      {en:'a thing',de:'einer Sache',nl:'een ding',da:'en ting',sv:'en sak',no:'en ting',es:'una cosa',it:'una cosa',pt:'uma coisa',fr:'une chose',fi:'asiasta'},
    kWhere:     {en:'a place',de:'einem Ort',nl:'een plek',da:'et sted',sv:'en plats',no:'et sted',es:'un lugar',it:'un luogo',pt:'um lugar',fr:'un lieu',fi:'paikasta'},
    kWhen:      {en:'a time',de:'der Zeit',nl:'een tijd',da:'en tid',sv:'en tid',no:'en tid',es:'un momento',it:'un momento',pt:'um momento',fr:'un moment',fi:'ajasta'},
    kWhy:       {en:'a reason',de:'einem Grund',nl:'een reden',da:'en grund',sv:'ett skäl',no:'en grunn',es:'una razón',it:'un motivo',pt:'um motivo',fr:'une raison',fi:'syystä'},
    kHow:       {en:'the way',de:'der Art und Weise',nl:'de manier',da:'måden',sv:'sättet',no:'måten',es:'la manera',it:'il modo',pt:'o jeito',fr:'la manière',fi:'tavasta'},
    setLevel:   {en:'Question words',de:'Fragewörter',nl:'Vraagwoorden',da:'Spørgeord',sv:'Frågeord',no:'Spørreord',es:'Palabras para preguntar',it:'Parole per le domande',pt:'Palavras de pergunta',fr:'Mots interrogatifs',fi:'Kysymyssanat'},
    l1:         {en:'Who, what, where',de:'Wer, was, wo',nl:'Wie, wat, waar',da:'Hvem, hvad, hvor',sv:'Vem, vad, var',no:'Hvem, hva, hvor',es:'Quién, qué, dónde',it:'Chi, che cosa, dove',pt:'Quem, o que, onde',fr:'Qui, qu’est-ce que, où',fi:'Kuka, mitä, missä'},
    l2:         {en:'Add when',de:'Mit wann',nl:'Met wanneer',da:'Med hvornår',sv:'Med när',no:'Med når',es:'Con cuándo',it:'Con quando',pt:'Com quando',fr:'Avec quand',fi:'Myös milloin'},
    l3:         {en:'Add why and how',de:'Mit warum und wie',nl:'Met waarom en hoe',da:'Med hvorfor og hvordan',sv:'Med varför och hur',no:'Med hvorfor og hvordan',es:'Con por qué y cómo',it:'Con perché e come',pt:'Com por que e como',fr:'Avec pourquoi et comment',fi:'Myös miksi ja miten'},
    l4:         {en:'Match',de:'Zuordnen',nl:'Koppelen',da:'Par sammen',sv:'Para ihop',no:'Koble sammen',es:'Relaciona',it:'Abbina',pt:'Ligue',fr:'Associe',fi:'Yhdistä'},
    l5:         {en:'Sort',de:'Sortieren',nl:'Sorteren',da:'Sortér',sv:'Sortera',no:'Sorter',es:'Ordena',it:'Ordina',pt:'Separe',fr:'Trie',fi:'Lajittele'},
    setAnswer:  {en:'Answer',de:'Antwort',nl:'Antwoord',da:'Svar',sv:'Svar',no:'Svar',es:'Respuesta',it:'Risposta',pt:'Resposta',fr:'Réponse',fi:'Vastaus'},
    aKeys:      {en:'Keys',de:'Tasten',nl:'Toetsen',da:'Taster',sv:'Tangenter',no:'Taster',es:'Teclas',it:'Tasti',pt:'Teclas',fr:'Touches',fi:'Näppäimet'},
    aWrite:     {en:'Write it',de:'Selbst schreiben',nl:'Zelf schrijven',da:'Skriv selv',sv:'Skriv själv',no:'Skriv selv',es:'Escríbela',it:'Scrivila tu',pt:'Escreva você',fr:'Écris-le',fi:'Kirjoita itse'},
    ariaQ:      {en:'Question: {q}',de:'Frage: {q}',nl:'Vraag: {q}',da:'Spørgsmål: {q}',sv:'Fråga: {q}',no:'Spørsmål: {q}',es:'Pregunta: {q}',it:'Domanda: {q}',pt:'Pergunta: {q}',fr:'Question : {q}',fi:'Kysymys: {q}'},
    ariaGold:   {en:'{c}, the gold part',de:'{c}, der goldene Teil',nl:'{c}, het gouden deel',da:'{c}, den gyldne del',sv:'{c}, den gyllene delen',no:'{c}, den gylne delen',es:'{c}, la parte dorada',it:'{c}, la parte dorata',pt:'{c}, a parte dourada',fr:'{c}, la partie dorée',fi:'{c}, kultainen osa'},
    ariaLamp:   {en:'The lamp shines on: {c}',de:'Die Lampe leuchtet auf: {c}',nl:'De lamp schijnt op: {c}',da:'Lampen lyser på: {c}',sv:'Lampan lyser på: {c}',no:'Lampen lyser på: {c}',es:'La lámpara ilumina: {c}',it:'La lampada illumina: {c}',pt:'A lâmpada ilumina: {c}',fr:'La lampe éclaire : {c}',fi:'Lamppu valaisee: {c}'},
    ariaGap:    {en:'The gap. Tap to empty it.',de:'Die Lücke. Antippen zum Leeren.',nl:'De lege plek. Tik om hem leeg te maken.',da:'Hullet. Tryk for at tømme det.',sv:'Luckan. Tryck för att tömma den.',no:'Hullet. Trykk for å tømme det.',es:'El hueco. Tócalo para vaciarlo.',it:'Lo spazio. Toccalo per svuotarlo.',pt:'O espaço. Toque para esvaziar.',fr:'Le trou. Touche-le pour le vider.',fi:'Aukko. Napauta tyhjentääksesi.'},
    ariaSlot:   {en:'The reply slot',de:'Das Antwortfeld',nl:'Het antwoordvak',da:'Svarfeltet',sv:'Svarsrutan',no:'Svarfeltet',es:'El espacio de la respuesta',it:'Lo spazio della risposta',pt:'O espaço da resposta',fr:'La case de la réponse',fi:'Vastauskohta'},
    ariaTray:   {en:'Tray under the lamp “{w}”',de:'Fach unter der Lampe „{w}“',nl:'Vak onder de lamp „{w}”',da:'Bakke under lampen »{w}«',sv:'Fack under lampan ”{w}”',no:'Brett under lampen «{w}»',es:'Bandeja debajo de la lámpara «{w}»',it:'Vassoio sotto la lampada «{w}»',pt:'Bandeja embaixo da lâmpada “{w}”',fr:'Plateau sous la lampe « {w} »',fi:'Tarjotin lampun ”{w}” alla'},
    ariaBack:   {en:'Rub out a letter',de:'Einen Buchstaben löschen',nl:'Een letter weghalen',da:'Slet et bogstav',sv:'Sudda en bokstav',no:'Slett en bokstav',es:'Borrar una letra',it:'Cancella una lettera',pt:'Apagar uma letra',fr:'Effacer une lettre',fi:'Pyyhi kirjain'},
    ariaSpace:  {en:'Space',de:'Leerzeichen',nl:'Spatie',da:'Mellemrum',sv:'Mellanslag',no:'Mellomrom',es:'Espacio',it:'Spazio',pt:'Espaço',fr:'Espace',fi:'Välilyönti'}
  },

  defaults: { level: 'l1', answer: 'keys' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'l1', labelKey: 'l1' }, { value: 'l2', labelKey: 'l2' }, { value: 'l3', labelKey: 'l3' }, { value: 'l4', labelKey: 'l4' }, { value: 'l5', labelKey: 'l5' }] },
    { key: 'answer', type: 'choice', labelKey: 'setAnswer', options: [{ value: 'keys', labelKey: 'aKeys' }, { value: 'write', labelKey: 'aWrite' }] }
  ],

  OK_MS: 2600, TOUR_MS: 520, FAST: false,
  KMARK: { who: 'kWho', what: 'kWhat', where: 'kWhere', when: 'kWhen', why: 'kWhy', how: 'kHow' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {}; this._slips = 0;
    injectLampCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.answer !== this._answer()) { if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return QuestionLampCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return QuestionLampCore.levelOf(this._setting('level')); },
  _answer: function () { return QuestionLampCore.answerOf(this._setting('answer')); },
  _key: function () { return this._loc() + '/' + this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = QuestionLampCore.ids(this._loc(), this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = QuestionLampCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) { var prev = fresh ? null : this._order.slice(); this._order = C.plan(this._loc(), this._level(), Math.random, prev); this._orderForPool = pool; this._pass = pass; }
    var idx = this._order[pos], r = C.round(this._loc(), this._level(), idx);
    var pa = { msg: this._taskLine(r) }; this._pa = pa;
    return {
      id: 'lamp.' + this._loc() + '.' + r.id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function (r) { return this._t(r.type === 'match' ? 'tMatch' : r.type === 'sort' ? 'tSort' : 'tAsk'); },
  _start: function (idx) {
    var C = QuestionLampCore, r = C.round(this._loc(), this._level(), idx);
    this._clearTimers(); this._busy = false; this._view = {};
    this.st = C.newState(r, this._answer());
    if (this._pa) this._pa.msg = this._taskLine(r);
    var el = document.querySelector('.lcs-activity-prompt-text'); if (el) el.textContent = this._taskLine(r);
    this._loadPics(r);
  },
  _cards: function (r) { return r.type === 'ask' ? r.chunks : r.cards; },
  _loadPics: function (r) {
    var self = this, dirs = {};
    this._cards(r).forEach(function (c) { if (c.pic) dirs[c.pic.slice(0, c.pic.lastIndexOf('/'))] = 1; });
    if (typeof LCSPictures === 'undefined') return;
    Object.keys(dirs).forEach(function (d) { if (self._pics[d]) return; LCSPictures.load(d).then(function (th) { self._pics[d] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  _img: function (pic, size) {
    var d = pic.slice(0, pic.lastIndexOf('/')), k = pic.slice(pic.lastIndexOf('/') + 1), th = this._pics[d];
    if (!th || !th.nouns[k] || typeof LCSPictures === 'undefined') { var ph = this.api.el('span', 'ql-ph'); ph.style.width = size + 'px'; ph.style.height = size + 'px'; return ph; }
    var im = LCSPictures.img(th, k, this._loc(), { size: size, plural: false }); im.className = 'ql-pic'; im.style.width = size + 'px'; im.style.height = size + 'px'; im.alt = ''; return im;
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = QuestionLampCore; this.st = C.newState(C.round(this._loc(), this._level(), 0), this._answer()); this._loadPics(this.st.r); }
    this._render2(); this._watchWidth();
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected || self._busy) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'ql-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="ql-window" aria-hidden="true"><span class="ql-slips"></span></div><div class="ql-board"></div><p class="ql-note" aria-live="polite"></p><div class="ql-row"><button type="button" class="ql-check" data-k="check"></button></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    this._q('.ql-check').addEventListener('click', function () { self._check(); });
    wrap.addEventListener('keydown', function (ev) {
      if (ev.target && ev.target.tagName === 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) return;
      var st = self.st;
      if (ev.key === 'Enter') { ev.preventDefault(); self._check(); }
      else if (QuestionLampCore.writes(st) && ev.key === 'Backspace') { ev.preventDefault(); self._type('⌫'); }
      else if (QuestionLampCore.writes(st) && ev.key.length === 1) { var ch = ev.key.toLocaleLowerCase(); if (ch === "'") ch = '’'; if (QuestionLampCore.keyLetters(self._loc(), self._level()).indexOf(ch) >= 0) { ev.preventDefault(); self._type(ch); } }
      else if (ev.key === 'Delete' || ev.key === 'Backspace') { ev.preventDefault(); self._clear(); }
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
    if (!this._wrap) return;
    var C = QuestionLampCore, st = this.st, r = st.r, L = this._L = C.layout(this._width()), v = this._view;
    this._wrap.className = 'ql-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.type + (st.help >= 2 && !st.done ? ' is-marks' : '');
    this._wrap.style.setProperty('--ql-pic', L.pic + 'px'); this._wrap.style.setProperty('--ql-card', L.card + 'px'); this._wrap.style.setProperty('--ql-key', L.key + 'px');
    var slips = this._q('.ql-slips'), s = ''; for (var i = 0; i < Math.min(this._slips, 12); i++) s += '<i class="ql-slip"></i>'; slips.innerHTML = s;
    var board = this._q('.ql-board'); board.innerHTML = '';
    if (r.type === 'ask') this._paintAsk(board); else if (r.type === 'match') this._paintMatch(board); else this._paintSort(board);
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg; else if (h) msg = this._hintText(h);
    var note = this._q('.ql-note'); note.textContent = msg;
    note.className = 'ql-note' + (st.done ? ' is-ok' : h && !/^hEmpty/.test(h) ? ' is-hint' : '');
    var chk = this._q('.ql-check'); chk.textContent = this._t('check'); chk.disabled = !!this._busy || st.done;
  },
  _hintText: function (h) {
    var st = this.st, r = st.r;
    if (h === 'hWrong' || h === 'hNone') { var k = st.lit, key = r.keys.filter(function (x) { return x.kind === k; })[0]; return this._t(h, { w: key ? key.form : '', k: this._t(this.KMARK[k]), c: st.lamp !== 'none' && st.lamp !== null ? r.chunks[st.lamp].t.replace(/,$/, '') : '' }); }
    return this._t(h);
  },
  _mark: function (kind) { return '<svg class="ql-mark is-' + kind + '" viewBox="0 0 20 20" aria-hidden="true">' + markShape(kind) + '</svg>'; },
  /* l1–l3: the question with its gap, the lamp rail, the answer strip, the keys (or the write keyboard) */
  _paintAsk: function (board) {
    var C = QuestionLampCore, st = this.st, r = st.r, L = this._L, self = this, v = this._view;
    var k = C.chosen(st), keyOf = function (kind) { return r.keys.filter(function (x) { return x.kind === kind; })[0]; };
    var qBox = this.api.el('p', 'ql-q'), parts = r.q.split('___');
    qBox.setAttribute('aria-label', this._t('ariaQ', { q: C.filled(r, C.writes(st) ? st.typed : (st.blank ? keyOf(st.blank).form : '___')) }));
    qBox.appendChild(document.createTextNode(parts[0]));
    var gap = this.api.el('button', 'ql-gap' + (st.done ? ' is-ok' : '') + ((st.blank || st.typed) ? ' is-full' : '')); gap.type = 'button'; gap.setAttribute('data-k', 'gap'); gap.setAttribute('aria-label', this._t('ariaGap'));
    gap.textContent = C.writes(st) ? (st.typed || ' ') : (st.blank ? keyOf(st.blank).form : ' ');
    if (!C.writes(st)) gap.addEventListener('click', function () { self._clear(); }); else gap.addEventListener('click', function () { self._type('⌫'); });
    qBox.appendChild(gap); qBox.appendChild(document.createTextNode(parts[1] || ''));
    board.appendChild(qBox);
    /* the strip of answer cards under the rail; the lamp hangs over the card it shines on (or the middle) */
    var stage = this.api.el('div', 'ql-stage'), rail = this.api.el('div', 'ql-rail'), strip = this.api.el('div', 'ql-strip');
    rail.innerHTML = '<span class="ql-bar"></span>';
    var lamp = this.api.el('div', 'ql-lamp'); lamp.innerHTML = '<svg viewBox="0 0 60 70" aria-hidden="true"><path class="ql-stem" d="M30 0 V18"/><path class="ql-shade" d="M14 40 Q14 18 30 18 Q46 18 46 40 Z"/><ellipse class="ql-bulb" cx="30" cy="40" rx="9" ry="4"/></svg><span class="ql-beam"></span>'; rail.appendChild(lamp);
    var target = v.tour !== undefined ? v.tour : st.lamp, gold = st.done ? r.framed : null;
    r.chunks.forEach(function (c, i) {
      var cell = self.api.el('div', 'ql-chunk' + (c.k === 'verb' ? ' is-verb' : '') + (i === r.framed ? ' is-gold' : '') + (target === i ? ' is-lit' : '') + (gold === i ? ' is-won' : ''));
      cell.setAttribute('data-c', i);
      if (c.pic) cell.appendChild(self._img(c.pic, L.pic));
      var tx = self.api.el('span', 'ql-ctext'); tx.textContent = c.t; cell.appendChild(tx);
      if (c.k !== 'verb') cell.insertAdjacentHTML('beforeend', self._mark(c.k));
      cell.setAttribute('role', 'img'); cell.setAttribute('aria-label', i === r.framed ? self._t('ariaGold', { c: c.t }) : c.t);
      strip.appendChild(cell);
    });
    stage.appendChild(rail); stage.appendChild(strip); board.appendChild(stage);
    /* keys */
    var tray = this.api.el('div', 'ql-keys');
    if (C.writes(st)) {
      tray.className = 'ql-keys is-write';
      C.keyLetters(this._loc(), this._level()).concat(['⌫']).forEach(function (ch) {
        var b = self.api.el('button', 'ql-letter' + (ch === '⌫' ? ' is-back' : '') + (ch === ' ' ? ' is-space' : '')); b.type = 'button'; b.setAttribute('data-k', 'key-' + (ch === ' ' ? 'space' : ch));
        b.textContent = ch === ' ' ? '␣' : ch; if (ch === '⌫') b.setAttribute('aria-label', self._t('ariaBack')); if (ch === ' ') b.setAttribute('aria-label', self._t('ariaSpace'));
        b.disabled = st.done || !!self._busy; b.addEventListener('click', function () { self._type(ch); }); tray.appendChild(b);
      });
    } else r.keys.forEach(function (key) {
      var b = self.api.el('button', 'ql-key' + (st.blank === key.kind ? ' is-in' : '') + (v.tourKey === key.kind ? ' is-tour' : '')); b.type = 'button'; b.setAttribute('data-k', 'key-' + key.kind); b.setAttribute('data-kind', key.kind);
      b.innerHTML = '<span class="ql-kword">' + esc(key.form) + '</span>' + self._mark(key.kind);
      b.disabled = st.done || !!self._busy; b.addEventListener('click', function () { self._place(key.kind); }); tray.appendChild(b);
    });
    board.appendChild(tray);
    /* the lamp's place: over its target card, or centred (and swept to the edge for 'none') */
    this._later(function () { self._aimLamp(lamp, strip, target); }, 0);
  },
  _aimLamp: function (lamp, strip, target) {
    if (!lamp.isConnected) return;
    var rail = lamp.parentNode, rr = rail.getBoundingClientRect(), x;
    if (typeof target === 'number') { var c = strip.children[target], cr = c.getBoundingClientRect(); x = cr.left + cr.width / 2 - rr.left; lamp.classList.add('is-on'); lamp.setAttribute('role', 'img'); lamp.setAttribute('aria-label', this._t('ariaLamp', { c: this.st.r.chunks[target].t })); var beam = lamp.querySelector('.ql-beam'); beam.style.height = Math.max(20, cr.top - rr.top - 50) + 'px'; }
    else if (target === 'none') { x = rr.width - 24; lamp.classList.add('is-on', 'is-none'); lamp.querySelector('.ql-beam').style.height = '30px'; }
    else x = rr.width / 2;
    lamp.style.left = Math.round(x - 38) + 'px';
  },
  /* l4: the question, the reply slot under its lamp, three answer cards */
  _paintMatch: function (board) {
    var st = this.st, r = st.r, L = this._L, self = this;
    var qBox = this.api.el('p', 'ql-q is-full'); qBox.textContent = r.q; qBox.setAttribute('aria-label', this._t('ariaQ', { q: r.q })); board.appendChild(qBox);
    var stage = this.api.el('div', 'ql-mstage');
    var lamp = this.api.el('div', 'ql-lamp is-fixed' + ((st.last && st.last.reason) ? ' is-on' : '') + (st.done ? ' is-on is-gold' : '')); lamp.innerHTML = '<svg viewBox="0 0 60 70" aria-hidden="true"><path class="ql-stem" d="M30 0 V18"/><path class="ql-shade" d="M14 40 Q14 18 30 18 Q46 18 46 40 Z"/><ellipse class="ql-bulb" cx="30" cy="40" rx="9" ry="4"/></svg><span class="ql-beam"></span>' + this._mark(r.ask); stage.appendChild(lamp);
    var slot = this.api.el('button', 'ql-slot' + (st.done ? ' is-won' : '') + (st.placed !== null ? ' is-full' : '')); slot.type = 'button'; slot.setAttribute('data-k', 'slot'); slot.setAttribute('aria-label', this._t('ariaSlot'));
    if (st.placed !== null) slot.appendChild(this._cardEl(r.cards[st.placed], st.placed, true)); else slot.innerHTML = '<span class="ql-slothole"></span>';
    slot.addEventListener('click', function () { self._takeCard(); });
    stage.appendChild(slot); board.appendChild(stage);
    var tray = this.api.el('div', 'ql-cards');
    r.cards.forEach(function (c, i) { if (i === st.placed) { tray.appendChild(self.api.el('span', 'ql-cardgap')); return; } var b = self._cardEl(c, i, false); b.addEventListener('click', function () { self._putCard(i); }); b.disabled = st.done || !!self._busy; tray.appendChild(b); });
    board.appendChild(tray);
  },
  _cardEl: function (c, i, inSlot) {
    var b = this.api.el(inSlot ? 'span' : 'button', 'ql-card' + (this.st.sel === i ? ' is-sel' : '')); if (!inSlot) { b.type = 'button'; b.setAttribute('data-k', 'card-' + i); }
    b.setAttribute('data-card', i);
    if (c.pic) b.appendChild(this._img(c.pic, this._L.pic));
    var tx = this.api.el('span', 'ql-ctext'); tx.textContent = c.t; b.appendChild(tx);
    b.insertAdjacentHTML('beforeend', this._mark(c.k));
    if (!inSlot) b.setAttribute('aria-label', c.t);
    return b;
  },
  /* l5: three lamps over three trays; the cards not yet sorted wait in a row */
  _paintSort: function (board) {
    var st = this.st, r = st.r, self = this, checked = st.last && (st.last.reason === 'wrongTray' || st.last.reason === 'right');
    var trays = this.api.el('div', 'ql-trays');
    r.trays.forEach(function (t) {
      var col = self.api.el('div', 'ql-tcol');
      col.innerHTML = '<div class="ql-lamp is-fixed' + (checked ? ' is-on' : '') + '"><svg viewBox="0 0 60 70" aria-hidden="true"><path class="ql-stem" d="M30 0 V18"/><path class="ql-shade" d="M14 40 Q14 18 30 18 Q46 18 46 40 Z"/><ellipse class="ql-bulb" cx="30" cy="40" rx="9" ry="4"/></svg><span class="ql-beam"></span></div>';
      var tr = self.api.el('button', 'ql-tray'); tr.type = 'button'; tr.setAttribute('data-k', 'tray-' + t.kind); tr.setAttribute('data-tray', t.kind); tr.setAttribute('aria-label', self._t('ariaTray', { w: t.form }));
      tr.innerHTML = '<span class="ql-tword">' + esc(t.form) + '</span>' + self._mark(t.kind);
      tr.addEventListener('click', function () { self._drop(t.kind); });
      var held = self.api.el('div', 'ql-held');
      r.cards.forEach(function (c, i) { if (st.trays[i] !== t.kind) return; var b = self._cardEl(c, i, false); if (checked) b.className += st.trays[i] === c.k ? ' is-bright' : ' is-dark'; b.addEventListener('click', function () { self._unsort(i); }); b.disabled = st.done || !!self._busy; held.appendChild(b); });
      col.appendChild(tr); col.appendChild(held); trays.appendChild(col);
    });
    board.appendChild(trays);
    var pool = this.api.el('div', 'ql-cards is-pool');
    r.cards.forEach(function (c, i) { if (i in st.trays) return; var b = self._cardEl(c, i, false); b.addEventListener('click', function () { self._select(i); }); b.disabled = st.done || !!self._busy; pool.appendChild(b); });
    board.appendChild(pool);
  },

  /* ---------------- the hand ---------------- */
  _place: function (kind) { if (this._busy) return; if (QuestionLampCore.place(this.st, kind)) { this._view = {}; this.api.sound(620); this._paint(); } },
  _clear: function () { if (this._busy) return; if (QuestionLampCore.clearBlank(this.st)) { this._view = {}; this.api.sound(380); this._paint(); } },
  _type: function (ch) { if (this._busy) return; if (QuestionLampCore.type(this.st, ch)) { this._view = {}; this.api.sound(600); this._paint(); } },
  _putCard: function (i) { if (this._busy) return; if (QuestionLampCore.putCard(this.st, i)) { this._view = {}; this.api.sound(620); this._paint(); } },
  _takeCard: function () { if (this._busy) return; if (QuestionLampCore.takeCard(this.st)) { this._view = {}; this.api.sound(380); this._paint(); } },
  _select: function (i) { if (this._busy) return; QuestionLampCore.select(this.st, i); this._view = {}; this._paint(); },
  _drop: function (tray) { if (this._busy) return; if (QuestionLampCore.drop(this.st, tray)) { this._view = {}; this.api.sound(620); this._paint(); } },
  _unsort: function (i) { if (this._busy) return; if (QuestionLampCore.unsort(this.st, i)) { this._view = {}; this.api.sound(380); this._paint(); } },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = QuestionLampCore, st = this.st, r = st.r, res = C.check(st), self = this;
    this._view = {};
    if (!res.ok) { this.api.sound(/^(empty|notAll|unknown)$/.test(res.reason) ? 460 : 300); this._paint(); this.api.announce(this._q('.ql-note').textContent || ''); return; }
    this.api.sound(988); this._slips++;
    var pa = this._pa || {}, msg;
    if (r.type === 'ask') { var key = r.keys.filter(function (x) { return x.kind === r.ask; })[0]; msg = this._t('okAsk', { q: C.filled(r, key.form), c: r.chunks[r.framed].t.replace(/,$/, ''), w: key.form, k: this._t(this.KMARK[r.ask]) }); }
    else if (r.type === 'match') msg = this._t('okMatch', { q: r.q, c: r.cards[r.right].t });
    else msg = this._t('okSort');
    pa.msg = msg; this._view = { msg: msg }; this._busy = true;
    this._paint(); this.api.announce(msg);
    var finish = function () { self._busy = false; self._view = { msg: msg }; self._paint(); self._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, self.OK_MS); };
    if (r.type !== 'ask' || this.FAST) return finish();
    /* the question tour: every card of the strip lights with the key that asks about it */
    var steps = C.tour(r), n = 0;
    var hop = function () { if (n >= steps.length) return finish(); var s = steps[n++]; self._view = { msg: msg, tour: s.chunk, tourKey: s.kind }; self.api.sound(660 + n * 90); self._paint(); self._later(hop, self.TOUR_MS); };
    this._later(hop, 900);
  }
};

/* the kind marks (miss-2 help): geometry only — a person a circle, a thing a square, a place a roof, a time a clock face, a reason a chevron, the way a wave */
function markShape(k) {
  return ({ who: '<circle cx="10" cy="10" r="7" fill="#146B5E"/>', what: '<rect x="3" y="3" width="14" height="14" rx="2" fill="#F2784B"/>', where: '<path d="M3 17 V9 L10 3 L17 9 V17 Z" fill="#E8A53A"/>', when: '<circle cx="10" cy="10" r="7.5" fill="#8E5BA8"/><path d="M10 5.5 V10 L13.2 11.8" stroke="#FFFFFF" stroke-width="2" fill="none" stroke-linecap="round"/>', why: '<path d="M4 6 L10 13 L16 6" stroke="#3A7BD5" stroke-width="3.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>', how: '<path d="M2 11 Q6 5 10 11 T18 11" stroke="#2FA56A" stroke-width="3.4" fill="none" stroke-linecap="round"/>' })[k] || '';
}
function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }

var qlCssDone = false;
function injectLampCSS() {
  if (qlCssDone || typeof document === 'undefined') return;
  qlCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.ql-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;}'
  + '.ql-wrap:focus{outline:none;}'
  /* Wren's window */
  + '.ql-window{width:100%;box-sizing:border-box;min-height:22px;padding:4px 10px;border-radius:12px 12px 4px 4px;background:#C9A46A;box-shadow:inset 0 -4px 0 #9C7B45;display:flex;align-items:center;}'
  + '.ql-slips{display:flex;gap:4px;flex-wrap:wrap;} .ql-slip{display:inline-block;width:14px;height:16px;border-radius:2px;background:#FFFEFB;box-shadow:0 1px 0 #9C7B45;transform:rotate(-4deg);} .ql-slip:nth-child(even){transform:rotate(5deg);}'
  /* the question */
  + '.ql-q{margin:0;padding:6px 10px;text-align:center;font-family:' + B + ';font-weight:800;font-size:24px;line-height:1.45;color:#2A2A35;}'
  + '.ql-gap{display:inline-block;min-width:110px;min-height:46px;margin:0 4px;padding:2px 10px;vertical-align:middle;border:0;border-radius:12px;background:#FFFEFB;box-shadow:inset 0 0 0 2.5px #146B5E;font-family:' + B + ';font-weight:900;font-size:24px;color:#146B5E;cursor:pointer;border-style:dashed;}'
  + '.ql-gap:not(.is-full){box-shadow:none;outline:2.5px dashed #146B5E;outline-offset:-2px;} .ql-gap.is-full{background:#DDF1EA;} .ql-gap.is-ok{background:#FFF1C9;box-shadow:inset 0 0 0 3px #E8A53A;}'
  /* the lamp, its rail and the answer strip */
  + '.ql-stage{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;}'
  + '.ql-rail{position:relative;width:100%;height:78px;} .ql-bar{position:absolute;left:4%;right:4%;top:3px;height:6px;border-radius:3px;background:#C9A34A;box-shadow:inset 0 0 0 1.2px #8C6A26;}'
  + '.ql-lamp{position:absolute;top:2px;left:calc(50% - 38px);width:76px;height:88px;transition:left .4s cubic-bezier(.3,1.25,.5,1);z-index:2;} .ql-lamp svg{width:76px;height:88px;display:block;}'
  + '.ql-wrap.is-fast .ql-lamp{transition:none;}'
  + '.ql-stem{stroke:#8C6A26;stroke-width:3;} .ql-shade{fill:#C9A34A;stroke:#8C6A26;stroke-width:2;} .ql-bulb{fill:#FFF4D0;}'
  + '.ql-beam{position:absolute;left:8px;top:50px;width:60px;height:0;opacity:0;background:linear-gradient(rgba(255,214,90,.95),rgba(255,226,140,.25));clip-path:polygon(30% 0,70% 0,100% 100%,0 100%);transition:opacity .2s;pointer-events:none;}'
  + '.ql-lamp.is-on .ql-bulb{fill:#FFE27A;} .ql-lamp.is-on .ql-beam{opacity:1;}'
  + '.ql-strip{display:flex;flex-wrap:wrap;justify-content:center;align-items:stretch;gap:6px;margin-top:-6px;}'
  + '.ql-chunk{position:relative;width:var(--ql-card);box-sizing:border-box;padding:6px 4px 8px;border-radius:14px;background:#FFFEFB;box-shadow:inset 0 0 0 2px #E2D6BE,0 3px 0 #E6DCC6;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;transition:box-shadow .2s,background .2s;}'
  + '.ql-chunk.is-verb{width:auto;min-width:64px;padding:6px 10px;justify-content:center;background:#F6EFE6;}'
  + '.ql-chunk.is-gold{box-shadow:inset 0 0 0 4px #E8A53A,0 3px 0 #E6DCC6;}'
  + '.ql-chunk.is-lit{background:#FFF3C4;box-shadow:inset 0 0 0 2px #E2D6BE,0 0 26px 6px rgba(255,220,110,.9);}'  /* light, not a frame: only the gold card wears a ring */
  + '.ql-chunk.is-gold.is-lit,.ql-chunk.is-won{background:#FFF1C9;box-shadow:inset 0 0 0 4px #E8A53A,0 0 22px rgba(232,165,58,.8);animation:qlBounce .45s ease-out;}'
  + '@keyframes qlBounce{40%{transform:translateY(-6px);}100%{transform:none;}}'
  + '.ql-pic{display:block;object-fit:contain;} .ql-ph{display:block;}'
  + '.ql-ctext{font-family:' + B + ';font-weight:800;font-size:16px;line-height:1.15;color:#2A2A35;text-align:center;overflow-wrap:break-word;hyphens:auto;max-width:100%;}'
  + '.ql-mark{display:none;position:absolute;right:4px;top:4px;width:18px;height:18px;} .ql-wrap.is-marks .ql-mark{display:block;}'
  /* the keys */
  + '.ql-keys{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;max-width:640px;}'
  + '.ql-key{position:relative;min-width:96px;min-height:var(--ql-key);padding:0 14px;border:0;border-radius:12px;background:#E8C77A;color:#3A2A08;font-family:' + B + ';font-weight:900;font-size:21px;box-shadow:inset 0 0 0 2px #8C6A26,0 4px 0 #8C6A26;cursor:pointer;}'
  + '.ql-key .ql-mark{right:3px;top:3px;width:14px;height:14px;} .ql-key.is-in{opacity:.5;} .ql-key.is-tour{background:#FFE27A;transform:translateY(-6px);} .ql-key:disabled{cursor:default;}'
  + '.ql-wrap.is-marks .ql-key{padding-right:24px;}'
  + '.ql-keys.is-write{gap:6px;max-width:460px;} .ql-letter{min-width:44px;height:48px;padding:0 6px;border:0;border-radius:10px;background:#FFF4DE;color:#2A2A35;font-family:' + H + ';font-weight:700;font-size:22px;box-shadow:inset 0 0 0 1.5px #C9A46A,0 3px 0 #B9965C;cursor:pointer;} .ql-letter.is-back,.ql-letter.is-space{background:#F6EFE6;min-width:56px;} .ql-letter:disabled{opacity:.45;cursor:default;}'
  /* match */
  + '.ql-q.is-full{font-size:24px;} .ql-mstage{position:relative;display:flex;flex-direction:column;align-items:center;padding-top:80px;}'
  + '.ql-lamp.is-fixed{position:absolute;top:0;left:calc(50% - 38px);} .ql-lamp.is-fixed .ql-mark{display:block;left:29px;top:28px;right:auto;width:18px;height:18px;opacity:0;} .ql-wrap.is-marks .ql-lamp.is-fixed .ql-mark{opacity:1;}'
  + '.ql-mstage .ql-lamp.is-on .ql-beam{height:44px;} .ql-tcol .ql-lamp.is-on .ql-beam{height:40px;}'
  + '.ql-slot{min-width:calc(var(--ql-card) + 28px);min-height:calc(var(--ql-pic) + 64px);padding:6px;border:0;border-radius:16px;background:rgba(20,107,94,.06);box-shadow:inset 0 0 0 2.5px #146B5E;display:flex;align-items:center;justify-content:center;cursor:pointer;}'
  + '.ql-slot:not(.is-full){box-shadow:none;outline:2.5px dashed #146B5E;outline-offset:-2px;} .ql-slot.is-won{background:#FFF1C9;box-shadow:inset 0 0 0 4px #E8A53A,0 0 22px rgba(232,165,58,.7);}'
  + '.ql-slothole{width:40px;height:40px;}'
  + '.ql-cards{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;} .ql-cardgap{width:var(--ql-card);}'
  + '.ql-card{position:relative;width:var(--ql-card);box-sizing:border-box;padding:6px 4px 8px;border:0;border-radius:14px;background:#FFFEFB;box-shadow:inset 0 0 0 2px #E2D6BE,0 3px 0 #E6DCC6;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;font:inherit;}'
  + 'span.ql-card{cursor:default;} .ql-card.is-sel{box-shadow:inset 0 0 0 3px #146B5E,0 0 0 3px rgba(20,107,94,.25);transform:translateY(-4px);} .ql-card:disabled{cursor:default;}'
  + '.ql-card.is-bright{background:#FFF6D8;box-shadow:inset 0 0 0 3px #F5C84B;} .ql-card.is-dark{background:#D9D6CF;filter:saturate(.4) brightness(.85);}'
  /* sort */
  + '.ql-trays{display:flex;justify-content:center;gap:10px;width:100%;}'
  + '.ql-tcol{position:relative;flex:1 1 0;max-width:220px;display:flex;flex-direction:column;align-items:center;padding-top:80px;}'
  + '.ql-tray{position:relative;width:100%;min-height:48px;border:0;border-radius:12px;background:#E8C77A;color:#3A2A08;font-family:' + B + ';font-weight:900;font-size:20px;box-shadow:inset 0 0 0 2px #8C6A26,0 4px 0 #8C6A26;cursor:pointer;} .ql-tray .ql-mark{right:6px;top:14px;}'
  + '.ql-held{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:8px;min-height:20px;}'
  + '.ql-cards.is-pool{margin-top:6px;padding-top:8px;border-top:2px dashed #E2D6BE;width:100%;}'
  /* controls */
  + '.ql-row{display:flex;justify-content:center;}'
  + '.ql-check{min-height:52px;min-width:120px;padding:0 26px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:20px;box-shadow:0 4px 0 #0C4A41;cursor:pointer;} .ql-check:disabled{opacity:.5;cursor:default;}'
  + '.ql-key:focus-visible,.ql-gap:focus-visible,.ql-card:focus-visible,.ql-tray:focus-visible,.ql-slot:focus-visible,.ql-letter:focus-visible,.ql-check:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.ql-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .ql-note.is-hint{color:#B5461F;} .ql-note.is-ok{color:#146B5E;}'
  /* phones */
  + '.ql-wrap.is-narrow .ql-q{font-size:19px;} .ql-wrap.is-narrow .ql-gap{font-size:19px;min-width:86px;min-height:44px;} .ql-wrap.is-narrow .ql-ctext{font-size:14px;} .ql-wrap.is-narrow .ql-key{min-width:84px;font-size:18px;padding:0 10px;} .ql-wrap.is-tiny .ql-key{min-width:64px;padding:0 8px;} .ql-wrap.is-tiny .ql-q{padding:2px 6px;line-height:1.3;}'
  + '.ql-wrap.is-narrow .ql-note{font-size:17px;} .ql-wrap.is-narrow .ql-check{font-size:18px;min-width:104px;} .ql-wrap.is-narrow .ql-tray{font-size:16px;} .ql-wrap.is-narrow .ql-trays{gap:6px;}'
  /* phones: the answer cards lie sideways (picture beside its words, two to a row) so the strip stays two short rows; a slimmer rail and window */
  + '.ql-wrap.is-narrow .ql-chunk{flex-direction:row;width:auto;max-width:calc(50% - 4px);min-height:72px;padding:4px 8px 4px 4px;gap:6px;justify-content:flex-start;align-items:center;} .ql-wrap.is-narrow .ql-chunk .ql-ctext{text-align:left;} .ql-wrap.is-narrow .ql-chunk.is-verb{min-width:0;padding:4px 10px;}'
  + '.ql-wrap.is-narrow .ql-rail{height:62px;} .ql-wrap.is-narrow .ql-lamp:not(.is-fixed){transform:scale(.8);transform-origin:50% 0;} .ql-wrap.is-narrow .ql-window{min-height:14px;padding:2px 8px;} .ql-wrap.is-narrow .ql-slip{width:10px;height:11px;}'
  + '@media print{.ql-row,.ql-note,.ql-keys{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.ql-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'ql-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.QuestionLampActivity = QuestionLampActivity;
