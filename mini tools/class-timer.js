/* =====================================================================
   TOOL #25 — CLASS TIMER   (class-timer.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #7 of the Premium Tools Program
   pilot wave — the Teacher's Desk transition timer: a serene projector
   visual (clock wedge / sand jar / candle / balloon), one-tap routine
   labels, gentle locale voice lines, a warm three-note chime — never
   an alarm.

   THE CARVE-OUT (operator-ratified): teacher-facing ROUTINE timers are
   approved — calm visual, gentle chime, no alarm, timing the CLASSROOM
   ROUTINE never a child's performance. Structurally banned here: red
   flashing, color-shift-to-red, motion/sound acceleration, ticking,
   pulsing, klaxons, hurry copy, 3-2-1 pre-start countdowns, count-up
   stopwatch, auto-restart, repeat-chime nagging. Mood: a lamp on a
   shelf, not a stopwatch — everything empties, settles or descends
   continuously.

   ENGINE (the correctness heart): never decrement a counter. The wall
   clock is the clock of record: `endAt = Date.now() + duration*1000`;
   one 250ms interval is only a REPAINT trigger computing
   `remaining = max(0, endAt - Date.now())` — a throttled background
   tick self-corrects. Cues are edge-triggered with dedupe flags
   (`!endFired && remaining <= 0`), plus a visibilitychange catch-up
   that resumes the AudioContext BEFORE re-running the cue check, so a
   teacher returning to a finished timer hears exactly one prompt
   chime. Reload mid-run resumes from the persisted absolute endAt;
   reload after the end renders the done state SILENTLY (no gesture =
   no honest audio). Screen Wake Lock while running (re-requested on
   visible — it auto-releases when hidden).
   ===================================================================== */
var ClassTimer = {
  id: 'class-timer',

  strings: {
    title:        {en:'Class Timer',de:'Klassen-Timer',fr:'Minuteur de classe',it:'Timer visivo',es:'Temporizador del salón',pt:'Timer da turma',nl:'Klassentimer',sv:'Klassrumstimer',da:'Nedtællingsur',no:'Klassens tidsur',fi:'Luokan ajastin'},
    instruction:  {en:'Pick the minutes, pick what we’re doing, and tap Start — the picture shows how much time is left.',de:'Minuten wählen, aussuchen, was wir machen, und Start tippen — das Bild zeigt, wie viel Zeit noch bleibt.',fr:'Choisissez les minutes, choisissez l’activité, appuyez sur Démarrer — l’image montre le temps qu’il reste.',it:'Scegli i minuti, scegli l’attività e tocca Avvia — l’immagine mostra quanto tempo resta.',es:'Elige los minutos, elige la actividad y toca Empezar — la imagen muestra cuánto tiempo queda.',pt:'Escolha os minutos, escolha a atividade e toque em Começar — a imagem mostra quanto tempo falta.',nl:'Kies de minuten, kies wat we doen en tik op Start — het beeld laat zien hoeveel tijd er nog is.',sv:'Välj minuter, välj vad vi gör och tryck på Starta — bilden visar hur mycket tid som är kvar.',da:'Vælg minutter, vælg, hvad vi laver, og tryk på Start — billedet viser, hvor meget tid der er tilbage.',no:'Velg minutter, velg hva vi gjør, og trykk på Start — bildet viser hvor mye tid som er igjen.',fi:'Valitse minuutit, valitse tekeminen ja napauta Aloita — kuva näyttää, paljonko aikaa on jäljellä.'},
    /* dock */
    minutes:      {en:'Minutes',de:'Minuten',fr:'Minutes',it:'Minuti',es:'Minutos',pt:'Minutos',nl:'Minuten',sv:'Minuter',da:'Minutter',no:'Minutter',fi:'Minuutit'},
    whatTiming:   {en:'What are we doing?',de:'Was machen wir?',fr:'Que fait-on ?',it:'Cosa facciamo?',es:'¿Qué vamos a hacer?',pt:'O que vamos fazer?',nl:'Wat gaan we doen?',sv:'Vad gör vi?',da:'Hvad laver vi?',no:'Hva skal vi gjøre?',fi:'Mitä teemme?'},
    labelCleanup: {en:'Cleanup',de:'Aufräumen',fr:'Rangement',it:'Riordino',es:'A recoger',pt:'Arrumação',nl:'Opruimen',sv:'Städning',da:'Oprydning',no:'Rydding',fi:'Siivous'},
    labelCenters: {en:'Centers',de:'Stationen',fr:'Ateliers',it:'Angoli',es:'Rincones',pt:'Cantinhos',nl:'Hoekenwerk',sv:'Stationer',da:'Værksteder',no:'Stasjoner',fi:'Työpisteet'},
    labelReading: {en:'Quiet reading',de:'Lesezeit',fr:'Lecture calme',it:'Lettura silenziosa',es:'Lectura en silencio',pt:'Leitura silenciosa',nl:'Stillezen',sv:'Tyst läsning',da:'Stillelæsning',no:'Stillelesing',fi:'Hiljainen lukeminen'},
    labelPackup:  {en:'Pack-up',de:'Einpacken',fr:'On prépare les cartables',it:'Prepariamo lo zaino',es:'A guardar',pt:'Arrumar a mochila',nl:'Inpakken',sv:'Packa ihop',da:'Pakke sammen',no:'Pakke sammen',fi:'Repun pakkaus'},
    labelTalk:    {en:'Turn and talk',de:'Murmelphase',fr:'Discussion à deux',it:'Parliamo a coppie',es:'Platicamos en pareja',pt:'Conversa em dupla',nl:'Praten met je maatje',sv:'Prata med grannen',da:'Snak med sidemanden',no:'Snakk med naboen',fi:'Parikeskustelu'},
    noLabel:      {en:'Timer',de:'Timer',fr:'Minuteur',it:'Timer',es:'Temporizador',pt:'Timer',nl:'Timer',sv:'Timer',da:'Timer',no:'Tidsur',fi:'Ajastin'},
    start:        {en:'Start',de:'Start',fr:'Démarrer',it:'Avvia',es:'Empezar',pt:'Começar',nl:'Start',sv:'Starta',da:'Start',no:'Start',fi:'Aloita'},
    pause:        {en:'Pause',de:'Pause',fr:'Pause',it:'Pausa',es:'Pausa',pt:'Pausar',nl:'Pauze',sv:'Pausa',da:'Pause',no:'Pause',fi:'Tauko'},
    resume:       {en:'Resume',de:'Weiter',fr:'Reprendre',it:'Riprendi',es:'Continuar',pt:'Continuar',nl:'Verder',sv:'Fortsätt',da:'Fortsæt',no:'Fortsett',fi:'Jatka'},
    plusMin:      {en:'+1 min',de:'+1 Min.',fr:'+1 min',it:'+1 min',es:'+1 min',pt:'+1 min',nl:'+1 min',sv:'+1 min',da:'+1 min.',no:'+1 min',fi:'+1 min'},
    minusMin:     {en:'−1 min',de:'−1 Min.',fr:'−1 min',it:'−1 min',es:'−1 min',pt:'−1 min',nl:'−1 min',sv:'−1 min',da:'−1 min.',no:'−1 min',fi:'−1 min'},
    endNow:       {en:'End now',de:'Jetzt beenden',fr:'Terminer',it:'Termina ora',es:'Terminar ya',pt:'Encerrar agora',nl:'Nu stoppen',sv:'Avsluta nu',da:'Afslut nu',no:'Avslutt nå',fi:'Lopeta nyt'},
    paused:       {en:'Paused',de:'Pausiert',fr:'En pause',it:'In pausa',es:'En pausa',pt:'Em pausa',nl:'Gepauzeerd',sv:'Pausad',da:'På pause',no:'På pause',fi:'Tauolla'},
    stopQ:        {en:'Stop the timer?',de:'Timer wirklich stoppen?',fr:'Arrêter le minuteur ?',it:'Fermare il timer?',es:'¿Detener el temporizador?',pt:'Parar o timer?',nl:'Timer stoppen?',sv:'Stoppa timern?',da:'Stop timeren?',no:'Stoppe tidsuret?',fi:'Pysäytetäänkö ajastin?'},
    keepGoing:    {en:'Keep going',de:'Weiterlaufen lassen',fr:'Continuer',it:'Lascialo correre',es:'Que siga',pt:'Deixar continuar',nl:'Laten doorlopen',sv:'Låt den gå',da:'Lad den køre',no:'La det gå',fi:'Anna käydä'},
    stopYes:      {en:'Stop',de:'Stoppen',fr:'Arrêter',it:'Ferma',es:'Detener',pt:'Parar',nl:'Stoppen',sv:'Stoppa',da:'Stop',no:'Stopp',fi:'Pysäytä'},
    finishedAway: {en:'The timer finished while you were away.',de:'Der Timer ist abgelaufen, während du weg warst.',fr:'Le minuteur s’est terminé pendant votre absence.',it:'Il timer è terminato mentre non c\'eri.',es:'El temporizador terminó mientras no estabas.',pt:'O timer terminou enquanto você estava fora.',nl:'De timer is afgelopen terwijl je weg was.',sv:'Tiden tog slut medan du var borta.',da:'Tiden løb ud, mens du var væk.',no:'Tidsuret ble ferdig mens du var borte.',fi:'Ajastin ehti loppua, kun olit poissa.'},
    /* voice lines — the classroom register; {label} = the routine name */
    voiceStart:   {en:'Our {label} time is starting.',de:'Unsere Zeit beginnt jetzt: {label}.',fr:'Notre temps commence : {label}.',it:'Il nostro tempo comincia adesso: {label}!',es:'Empieza nuestro tiempo: {label}.',pt:'Nosso tempo de {label} está começando.',nl:'Onze tijd voor {label} begint nu.',sv:'Nu börjar vår tid: {label}.',da:'Nu begynder vores tid: {label}.',no:'Nå begynner tiden vår: {label}.',fi:'Seuraavaksi {label}. Aika alkaa nyt.'},
    voiceStartPlain:{en:'Our time is starting.',de:'Unsere Zeit beginnt jetzt.',fr:'Notre temps commence.',it:'Il nostro tempo comincia adesso.',es:'Nuestro tiempo empieza ahora.',pt:'Nosso tempo está começando.',nl:'Onze tijd begint nu.',sv:'Nu börjar vår tid.',da:'Nu begynder vores tid.',no:'Nå begynner tiden vår.',fi:'Aika alkaa nyt.'},
    voiceOneMin:  {en:'One more minute.',de:'Noch eine Minute.',fr:'Encore une minute.',it:'Ancora un minuto.',es:'Un minuto más.',pt:'Falta só um minutinho.',nl:'Nog één minuut.',sv:'En minut kvar.',da:'Ét minut tilbage.',no:'Ett minutt igjen.',fi:'Vielä yksi minuutti.'},
    voiceHalf:    {en:'We are halfway there.',de:'Die Hälfte der Zeit ist um.',fr:'Nous sommes à la moitié du temps.',it:'Siamo a metà.',es:'Vamos a la mitad.',pt:'Já estamos na metade do tempo.',nl:'We zijn op de helft.',sv:'Halva tiden har gått.',da:'Vi er halvvejs.',no:'Halve tiden har gått.',fi:'Puolet ajasta on kulunut.'},
    voiceEnd1:    {en:'Time to gather.',de:'Kommt bitte wieder zusammen.',fr:'C’est l’heure de se rassembler.',it:'È il momento di ritrovarci.',es:'Es hora de reunirnos.',pt:'Hora de se reunir.',nl:'Tijd om bij elkaar te komen.',sv:'Dags att samlas.',da:'Tid til at samles.',no:'Nå samler vi oss.',fi:'Nyt on aika kokoontua.'},
    voiceEnd2:    {en:'Our time is finished — eyes on me.',de:'Unsere Zeit ist vorbei — alle Augen zu mir.',fr:'Notre temps est terminé — tous les yeux sur moi.',it:'Il nostro tempo è finito — occhi a me.',es:'Se acabó nuestro tiempo. Ojitos aquí.',pt:'Nosso tempo acabou — olhinhos aqui.',nl:'Onze tijd is om — alle ogen naar het bord.',sv:'Vår tid är slut — titta hit.',da:'Vores tid er slut — alle øjne herop.',no:'Tiden vår er ute — alle øyne hit.',fi:'Aika on lopussa — katseet tänne.'},
    voiceEnd3:    {en:'Time is up — well done, everyone.',de:'Die Zeit ist um — gut gemacht, alle zusammen.',fr:'Le temps est écoulé — bravo à tous.',it:'Il tempo è finito — bravi tutti.',es:'Se acabó el tiempo. ¡Muy bien, todos!',pt:'O tempo acabou — muito bem, turma.',nl:'De tijd is om — goed gedaan, allemaal.',sv:'Tiden är slut — bra jobbat, allihop.',da:'Tiden er gået — flot klaret, alle sammen.',no:'Tiden er ute — bra jobbet, alle sammen.',fi:'Aika loppui — hyvin tehty, kaikki.'},
    /* presets */
    presetsTitle: {en:'My timers',de:'Meine Timer',fr:'Mes minuteurs',it:'I miei timer',es:'Mis temporizadores',pt:'Meus timers',nl:'Mijn timers',sv:'Mina timrar',da:'Mine timere',no:'Mine tidsur',fi:'Omat ajastimet'},
    savePreset:   {en:'Save the current timer',de:'Aktuellen Timer speichern',fr:'Enregistrer ce minuteur',it:'Salva questo timer',es:'Guardar este temporizador',pt:'Salvar este timer',nl:'Deze timer opslaan',sv:'Spara den här timern',da:'Gem denne timer',no:'Lagre dette tidsuret',fi:'Tallenna tämä ajastin'},
    presetName:   {en:'Name your timer',de:'Name des Timers',fr:'Nom du minuteur',it:'Nome del timer',es:'Nombre del temporizador',pt:'Nome do timer',nl:'Geef je timer een naam',sv:'Vad ska timern heta?',da:'Timerens navn',no:'Gi tidsuret et navn',fi:'Ajastimen nimi'},
    saveBtn:      {en:'Save',de:'Speichern',fr:'Enregistrer',it:'Salva',es:'Guardar',pt:'Salvar',nl:'Opslaan',sv:'Spara',da:'Gem',no:'Lagre',fi:'Tallenna'},
    deleteBtn:    {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},

    /* corner mode */
    cornerMode:   {en:'Corner view',de:'Eckansicht',fr:'Vue en coin d’écran',it:'Modalità angolo',es:'Vista de esquina',pt:'Modo canto da tela',nl:'Hoekweergave',sv:'Hörnvy',da:'Hjørnevisning',no:'Hjørnevisning',fi:'Kulmanäkymä'},
    cornerHint:   {en:'Open the timer in a second browser window and snap it next to your other tool.',de:'Öffne den Timer in einem zweiten Browserfenster und lege ihn neben dein anderes Werkzeug.',fr:'Ouvrez le minuteur dans une seconde fenêtre et placez-la à côté de votre autre outil.',it:'Apri il timer in una seconda finestra e affiancalo all’altro strumento.',es:'Abre el temporizador en una segunda ventana del navegador y acomódala junto a tu otra herramienta.',pt:'Abra o timer em outra janela e encaixe ao lado da sua outra ferramenta.',nl:'Open de timer in een tweede browservenster en zet het naast je andere tool.',sv:'Öppna timern i ett nytt webbläsarfönster och lägg det bredvid ditt andra verktyg.',da:'Åbn timeren i et nyt browservindue, og sæt det ved siden af dit andet værktøj.',no:'Åpne tidsuret i et nytt nettleservindu og legg det ved siden av det andre verktøyet.',fi:'Avaa ajastin toiseen selainikkunaan ja kiinnitä se toisen työkalun viereen.'},
    expand:       {en:'Back to full view',de:'Zurück zur großen Ansicht',fr:'Revenir en grand',it:'Torna alla vista grande',es:'Volver a la vista grande',pt:'Voltar à visão completa',nl:'Terug naar grote weergave',sv:'Tillbaka till den stora vyn',da:'Tilbage til stor visning',no:'Tilbake til stor visning',fi:'Takaisin isoon näkymään'},
    /* settings */
    setMetaphor:  {en:'Timer picture',de:'Timer-Bild',fr:'Image du minuteur',it:'Immagine del timer',es:'Imagen del temporizador',pt:'Imagem do timer',nl:'Timerbeeld',sv:'Timerbild',da:'Timerbillede',no:'Nedtellingsbilde',fi:'Ajastimen kuva'},
    metWedge:     {en:'Clock wedge',de:'Zeitdauer-Uhr',fr:'Horloge à quartier',it:'Orologio a spicchio',es:'Reloj de rebanada',pt:'Relógio de fatia',nl:'Klok met taartpunt',sv:'Klocka med tårtbit',da:'Ur med lagkagestykke',no:'Klokke med kakestykke',fi:'Kiekkokello'},
    metJar:       {en:'Sand jar',de:'Sanduhr',fr:'Bocal de sable',it:'Barattolo di sabbia',es:'Frasco de arena',pt:'Pote de areia',nl:'Zandpotje',sv:'Sandburk',da:'Sandkrukke',no:'Sandkrukke',fi:'Hiekkapurkki'},
    metCandle:    {en:'Candle',de:'Kerze',fr:'Bougie',it:'Candela',es:'Vela',pt:'Vela',nl:'Kaars',sv:'Stearinljus',da:'Stearinlys',no:'Stearinlys',fi:'Kynttilä'},
    metBalloon:   {en:'Balloon',de:'Heißluftballon',fr:'Montgolfière',it:'Mongolfiera',es:'Globo',pt:'Balão',nl:'Luchtballon',sv:'Luftballong',da:'Luftballon',no:'Luftballong',fi:'Kuumailmapallo'},
    setReadout:   {en:'Show the minutes',de:'Minuten anzeigen',fr:'Afficher les minutes',it:'Mostra i minuti',es:'Mostrar los minutos',pt:'Mostrar os minutos',nl:'Minuten tonen',sv:'Visa minuterna',da:'Vis minutterne',no:'Vis minuttene',fi:'Näytä minuutit'},
    setOneMin:    {en:'One-minute chime',de:'Klang bei der letzten Minute',fr:'Carillon à la dernière minute',it:'Suono all\'ultimo minuto',es:'Aviso a un minuto',pt:'Aviso de um minuto',nl:'Belletje bij één minuut',sv:'Pling vid en minut',da:'Klokkelyd ved ét minut',no:'Lyd ved ett minutt igjen',fi:'Merkkiääni, kun minuutti on jäljellä'},
    setHalf:      {en:'Halfway chime',de:'Klang bei halber Zeit',fr:'Carillon à mi-parcours',it:'Suono a metà tempo',es:'Aviso a la mitad',pt:'Aviso na metade',nl:'Belletje halverwege',sv:'Pling vid halva tiden',da:'Klokkelyd halvvejs',no:'Lyd ved halve tiden',fi:'Merkkiääni puolivälissä'},
    setVoice:     {en:'Voice announcements',de:'Sprachansagen',fr:'Annonces vocales',it:'Annunci vocali',es:'Anuncios de voz',pt:'Avisos por voz',nl:'Gesproken aankondigingen',sv:'Röstuppläsning',da:'Oplæste beskeder',no:'Talebeskjeder',fi:'Puhutut ilmoitukset'},
    setChime:     {en:'End chime',de:'Schlussklang',fr:'Carillon de fin',it:'Suono finale',es:'Aviso final',pt:'Aviso de fim',nl:'Eindbelletje',sv:'Pling vid slutet',da:'Klokkelyd til slut',no:'Lyd når tiden er ute',fi:'Loppuääni'},
    /* gates */
    gateMetaphor: {en:'More timer pictures — the candle, the sand jar and the balloon — are part of Premium. The clock wedge is always free.',de:'Weitere Timer-Bilder — Kerze, Sanduhr und Heißluftballon — gehören zu Premium. Die Zeitdauer-Uhr bleibt immer kostenlos.',fr:'Les autres images — bougie, bocal de sable et montgolfière — font partie de Premium. L’horloge à quartier reste gratuite.',it:'Le altre immagini — candela, barattolo di sabbia e mongolfiera — fanno parte di Premium. L\'orologio a spicchio resta sempre gratuito.',es:'Las demás imágenes — vela, frasco de arena y globo — son parte de Premium. El reloj de rebanada siempre es gratis.',pt:'As outras imagens — vela, pote de areia e balão — fazem parte do Premium. O relógio de fatia é sempre gratuito.',nl:'De andere timerbeelden — de kaars, het zandpotje en de luchtballon — horen bij Premium. De klok met taartpunt blijft altijd gratis.',sv:'De andra timerbilderna — stearinljuset, sandburken och luftballongen — ingår i Premium. Klockan med tårtbit är alltid gratis.',da:'De andre timerbilleder — stearinlyset, sandkrukken og luftballonen — er en del af Premium. Uret med lagkagestykke er altid gratis.',no:'De andre nedtellingsbildene — stearinlyset, sandkrukken og luftballongen — er en del av Premium. Klokken med kakestykke er alltid gratis.',fi:'Muut ajastinkuvat — kynttilä, hiekkapurkki ja kuumailmapallo — kuuluvat Premiumiin. Kiekkokello on aina ilmainen.'},
    gatePresets:  {en:'One-tap saved timers are part of Premium — the timer itself is always free.',de:'Gespeicherte Timer für den Ein-Tipp-Start gehören zu Premium — der Timer selbst bleibt immer kostenlos.',fr:'Les minuteurs enregistrés en un geste font partie de Premium — le minuteur lui-même reste gratuit.',it:'I timer salvati con un tocco fanno parte di Premium — il timer resta sempre gratuito.',es:'Los temporizadores guardados de un toque son parte de Premium — el temporizador siempre es gratis.',pt:'Timers salvos com um só toque fazem parte do Premium — o timer em si é sempre gratuito.',nl:'Timers opslaan en met één tik starten hoort bij Premium — de timer zelf blijft altijd gratis.',sv:'Sparade timrar som startar med ett tryck ingår i Premium — själva timern är alltid gratis.',da:'Gemte ét-tryks-timere er en del af Premium — selve timeren er altid gratis.',no:'Lagrede tidsur du starter med ett trykk, er en del av Premium — selve tidsuret er alltid gratis.',fi:'Yhdellä napautuksella käynnistyvät omat ajastimet kuuluvat Premiumiin — itse ajastin on aina ilmainen.'},
    gateCorner:   {en:'Corner view is part of Premium — perfect beside another projected tool.',de:'Die Eckansicht gehört zu Premium — perfekt neben einem zweiten projizierten Werkzeug.',fr:'La vue en coin d’écran fait partie de Premium — parfaite à côté d’un autre outil projeté.',it:'La modalità angolo fa parte di Premium — perfetta accanto a un altro strumento proiettato.',es:'La vista de esquina es parte de Premium — perfecta junto a otra herramienta proyectada.',pt:'O modo canto da tela faz parte do Premium — perfeito ao lado de outra ferramenta projetada.',nl:'De hoekweergave hoort bij Premium — perfect naast een andere geprojecteerde tool.',sv:'Hörnvyn ingår i Premium — perfekt bredvid ett annat projicerat verktyg.',da:'Hjørnevisningen er en del af Premium — perfekt ved siden af et andet projiceret værktøj.',no:'Hjørnevisningen er en del av Premium — perfekt ved siden av et annet projisert verktøy.',fi:'Kulmanäkymä kuuluu Premiumiin — täydellinen toisen heijastetun työkalun viereen.'},
    unlock:       {en:'Unlock every timer',de:'Alle Timer freischalten',fr:'Débloquer tous les minuteurs',it:'Sblocca tutti i timer',es:'Desbloquear todos los temporizadores',pt:'Desbloquear todos os timers',nl:'Alle timers ontgrendelen',sv:'Lås upp alla timrar',da:'Lås alle timere op',no:'Lås opp alle tidsurene',fi:'Avaa kaikki ajastimet'},
    loading:      {en:'Winding the clock…',de:'Die Uhr wird aufgezogen…',fr:'On remonte l’horloge…',it:'Carichiamo l’orologio…',es:'Dando cuerda al reloj…',pt:'Dando corda no relógio…',nl:'De klok wordt opgewonden…',sv:'Klockan dras upp…',da:'Uret trækkes op…',no:'Klokken trekkes opp…',fi:'Kelloa vedetään…'}
  },

  defaults: {
    metaphor: 'wedge', readout: false, oneMin: true, half: false, voice: true, chime: true
  },
  settings: [
    { key:'metaphor', type:'choice', labelKey:'setMetaphor', options:[
        { value:'wedge', labelKey:'metWedge' },
        { value:'jar', labelKey:'metJar' },
        { value:'candle', labelKey:'metCandle' },
        { value:'balloon', labelKey:'metBalloon' }
    ]},
    { key:'readout', type:'toggle', labelKey:'setReadout' },
    { key:'oneMin', type:'toggle', labelKey:'setOneMin' },
    { key:'half', type:'toggle', labelKey:'setHalf' },
    { key:'voice', type:'toggle', labelKey:'setVoice' },
    { key:'chime', type:'toggle', labelKey:'setChime' }
  ],

  STORE_KEY: 'lcs:class-timer:v1',
  ENT_TRUST_DAYS: 14,
  LABEL_KEYS: ['labelCleanup', 'labelCenters', 'labelReading', 'labelPackup', 'labelTalk'],
  STARTERS: [
    { labelKey: 'labelCleanup', seconds: 300 },
    { labelKey: 'labelCenters', seconds: 900 },
    { labelKey: 'labelReading', seconds: 600 },
    { labelKey: 'labelPackup', seconds: 420 },
    { labelKey: 'labelTalk', seconds: 120 }
  ],
  CHIP_MINUTES: [1, 2, 3, 5, 10, 15, 20, 30],

  /* =========================== lifecycle =========================== */

  init: function (api) {
    var self = this;
    this.api = api;
    this.premium = false;
    this._audio = null;
    this._wakeLock = null;
    this._endVariant = 0;

    /* harness log — cue firings with timestamps */
    try { window.__lcsTimerLog = window.__lcsTimerLog || []; } catch (_) {}

    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, timer: null, presets: null };
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var t = this._store.timer;
    this.timer = t && t.phase ? t : { phase: 'idle', duration: 300, endAt: null, remainingAtPause: null, labelKey: null, halfFired: false, oneMinFired: false, endFired: false };
    this._awayDone = false;
    if (this.timer.phase === 'running') {
      if (this.timer.endAt && this.timer.endAt > Date.now()) {
        /* resume mid-run with correct remaining — endAt is absolute */
      } else {
        /* finished while away: render done SILENTLY (no gesture = no honest audio) */
        this.timer.phase = 'done';
        this.timer.endFired = true;
        this._awayDone = true;
      }
    }

    /* deep links: ?t=<seconds>&label=<key>&metaphor=<key>&half=1 — pre-armed
       idle, one giant Start. NO autostart (no gesture = no TTS/audio/wake lock). */
    var params = new URLSearchParams(location.search);
    var dt = parseInt(params.get('t'), 10);
    if (!isNaN(dt) && dt >= 30 && dt <= 3600 && this.timer.phase === 'idle') this.timer.duration = dt;
    var lbl = params.get('label');
    if (lbl && this.LABEL_KEYS.indexOf('label' + lbl.charAt(0).toUpperCase() + lbl.slice(1)) >= 0) {
      this.timer.labelKey = 'label' + lbl.charAt(0).toUpperCase() + lbl.slice(1);
    } else if (lbl && this.LABEL_KEYS.indexOf(lbl) >= 0) {
      this.timer.labelKey = lbl;
    }
    var met = params.get('metaphor');
    if (['wedge', 'jar', 'candle', 'balloon'].indexOf(met) >= 0) api.settings.metaphor = met;
    if (params.get('half') === '1') api.settings.half = true;
    this.corner = params.get('embed') === 'corner';

    /* the repaint ticker — ONLY a repaint trigger; time lives in endAt */
    this._ticker = setInterval(function () { self._tick(); }, 250);

    document.addEventListener('visibilitychange', function () {
      if (document.visibilityState !== 'visible') return;
      /* resume audio BEFORE the cue catch-up so a caught-up chime sounds */
      if (self._audio && self._audio.state === 'suspended') { try { self._audio.resume(); } catch (_) {} }
      self._tick();
      if (self.timer.phase === 'running') self._requestWakeLock();
    });

    this._fetchEntitlement();
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.timer = this.timer;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) {
      var key = this.settings[i].key;
      st.settings[key] = this.api.settings[key];
    }
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },

  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; if (self._wrap) self.render(); }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        if (self._wrap) self.render();
      })
      .catch(function () { trustCache(); });
  },

  /* ============================ helpers ============================ */

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  _log: function (cue) {
    try { (window.__lcsTimerLog = window.__lcsTimerLog || []).push({ cue: cue, at: Date.now() }); } catch (_) {}
  },
  _remaining: function () {
    var t = this.timer;
    if (t.phase === 'running') return Math.max(0, t.endAt - Date.now());
    if (t.phase === 'paused') return Math.max(0, t.remainingAtPause || 0);
    if (t.phase === 'done') return 0;
    return t.duration * 1000;
  },
  _labelText: function () {
    return this.timer.labelKey ? this.api.t(this.timer.labelKey) : this.api.t('noLabel');
  },

  /* ------------------------- the engine ---------------------------- */

  _tick: function () {
    var t = this.timer;
    if (t.phase !== 'running') return;
    var remaining = Math.max(0, t.endAt - Date.now());
    /* edge-triggered cues with dedupe flags — a late throttled tick
       still fires each exactly once */
    if (!t.halfFired && this.api.settings.half && remaining <= t.duration * 500 && remaining > 0) {
      t.halfFired = true;
      this._log('half');
      this._pip();
      if (this.premium && this.api.settings.voice) this._speak('voiceHalf');
      this._saveStore();
    }
    if (!t.oneMinFired && this.api.settings.oneMin && t.duration > 90 && remaining <= 60000 && remaining > 0) {
      t.oneMinFired = true;
      this._log('onemin');
      this._pip();
      if (this.premium && this.api.settings.voice) this._speak('voiceOneMin');
      this._saveStore();
    }
    if (!t.endFired && remaining <= 0) {
      t.endFired = true;
      t.phase = 'done';
      this._log('end');
      if (this.api.settings.chime) this._chime();
      if (this.premium && this.api.settings.voice) {
        var v = ['voiceEnd1', 'voiceEnd2', 'voiceEnd3'][this._endVariant % 3];
        this._endVariant++;
        this._speak(v);
      }
      this._releaseWakeLock();
      this._saveStore();
      this.render();
      return;
    }
    this._paint(remaining);
  },

  _start: function () {
    var t = this.timer;
    if (t.phase === 'running') return;
    if (t.phase === 'paused') {
      t.endAt = Date.now() + (t.remainingAtPause || 0);
      t.remainingAtPause = null;
      t.phase = 'running';
    } else {
      t.endAt = Date.now() + t.duration * 1000;
      t.phase = 'running';
      t.halfFired = false; t.oneMinFired = false; t.endFired = false;
      this._log('start');
      /* the tap IS the unlock gesture: create/resume audio + speak NOW */
      this._ctx();
      if (this.premium && this.api.settings.voice) {
        if (t.labelKey) this._speak('voiceStart', { label: this._labelText() });
        else this._speak('voiceStartPlain');
      }
    }
    this._requestWakeLock();
    this._saveStore();
    this.render();
  },

  _pause: function () {
    var t = this.timer;
    if (t.phase !== 'running') return;
    t.remainingAtPause = Math.max(0, t.endAt - Date.now());
    t.endAt = null;
    t.phase = 'paused';
    this._releaseWakeLock();
    this._saveStore();
    this.render();
  },

  _plusMin: function () {
    var t = this.timer;
    if (t.phase === 'running') {
      t.endAt += 60000;
      t.duration += 60;              /* the wedge grows back smoothly */
      /* halfFired stays true — a second halfway cue confuses */
    } else if (t.phase === 'paused') {
      t.remainingAtPause += 60000;
      t.duration += 60;
    } else if (t.phase === 'idle') {
      t.duration = Math.min(3600, t.duration + 60);
    }
    this._saveStore();
    if (t.phase === 'idle') this.render();
    else this._paint(this._remaining());
  },
  _minusMin: function () {
    var t = this.timer;
    if (t.phase !== 'idle') return;   /* no on-screen subtraction mid-run */
    t.duration = Math.max(60, t.duration - 60);
    this._saveStore();
    this.render();
  },

  _endNow: function () {
    var t = this.timer;
    if (t.phase !== 'running' && t.phase !== 'paused') return;
    t.phase = 'done';
    t.endFired = true;
    t.endAt = null;
    this._log('endnow');
    /* gentle: soft pip, not the full end chime — the teacher cut it short */
    this._pip();
    this._releaseWakeLock();
    this._saveStore();
    this.render();
  },

  /* shell reset: guard a RUNNING timer behind a 2-button confirm */
  reset: function () {
    var self = this;
    if (this.timer.phase === 'running' || this.timer.phase === 'paused') {
      this._confirmStop(function () { self._resetToIdle(); });
      return;
    }
    this._resetToIdle();
  },
  _resetToIdle: function () {
    var t = this.timer;
    t.phase = 'idle';
    t.endAt = null; t.remainingAtPause = null;
    t.halfFired = false; t.oneMinFired = false; t.endFired = false;
    this._awayDone = false;
    this._releaseWakeLock();
    this._saveStore();
    this.render();
  },

  _confirmStop: function (onStop) {
    var api = this.api, self = this;
    var old = document.querySelector('.ctm-confirm-scrim');
    if (old) old.remove();
    var scrim = api.el('div', 'ctm-confirm-scrim');
    var card = api.el('div', 'ctm-confirm');
    var q = api.el('p');
    q.textContent = api.t('stopQ');
    var row = api.el('div', 'ctm-confirm-row');
    var keep = api.el('button', 'ctm-ctrlchip teal');
    keep.type = 'button';
    keep.textContent = api.t('keepGoing');
    keep.addEventListener('click', function () { scrim.remove(); });
    var stop = api.el('button', 'ctm-ctrlchip');
    stop.type = 'button';
    stop.textContent = api.t('stopYes');
    stop.addEventListener('click', function () { scrim.remove(); onStop(); });
    row.append(keep, stop);
    card.append(q, row);
    scrim.appendChild(card);
    scrim.addEventListener('click', function (e) { if (e.target === scrim) scrim.remove(); });
    document.querySelector('.lcs-app').appendChild(scrim);
  },

  /* ---------------------- wake lock + audio ------------------------ */

  _requestWakeLock: function () {
    var self = this;
    if (!navigator.wakeLock || document.visibilityState !== 'visible') return;
    try {
      navigator.wakeLock.request('screen').then(function (l) { self._wakeLock = l; }).catch(function () {});
    } catch (_) {}
  },
  _releaseWakeLock: function () {
    if (this._wakeLock) { try { this._wakeLock.release(); } catch (_) {} this._wakeLock = null; }
  },

  _ctx: function () {
    if (this._audio === null) {
      try {
        var AC = window.AudioContext || window.webkitAudioContext;
        this._audio = AC ? new AC() : false;
      } catch (_) { this._audio = false; }
    }
    if (this._audio && this._audio.state === 'suspended') { try { this._audio.resume(); } catch (_) {} }
    return this._audio;
  },

  /* one warm sine note; the building block of every cue — no other
     waveform exists in this tool (alarm-incapable by construction) */
  _note: function (freq, at, dur, peak) {
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.25, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 1.2));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 1.2) + 0.05);
  },
  /* end chime: three overlapping falling-then-resting sines — E5 C5 G4 */
  _chime: function () {
    this._log('chime');
    this._note(659.25, 0, 1.2, 0.22);
    this._note(523.25, 0.35, 1.2, 0.22);
    this._note(392.0, 0.7, 1.4, 0.25);
  },
  /* the soft single-note cue (one-minute / halfway / end-now) */
  _pip: function () {
    this._note(392.0, 0, 0.9, 0.15);
  },
  _speak: function (key, args) {
    var text = args ? this.fmt(key, args) : this.api.t(key);
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.9 }); } catch (_) {}
    this.api.announce(text);
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('ctm-wide');
    if (this.corner) document.body.classList.add('ctm-corner');

    var wrap = api.el('div', 'ctm-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    var t = this.timer;
    var phase = t.phase;

    /* corner mode: metaphor + one-line label, tap to expand */
    if (this.corner) {
      var cwrap = api.el('button', 'ctm-cornercard');
      cwrap.type = 'button';
      cwrap.setAttribute('aria-label', api.t('expand'));
      cwrap.appendChild(this._buildMetaphor());
      var clbl = api.el('div', 'ctm-cornerlabel');
      clbl.textContent = phase === 'done' ? api.t('voiceEnd1') : this._labelText();
      cwrap.appendChild(clbl);
      cwrap.addEventListener('click', function () {
        var u = new URL(location.href);
        u.searchParams.delete('embed');
        location.href = u.toString();
      });
      wrap.appendChild(cwrap);
      this._paint(this._remaining());
      return;
    }

    /* preset row (premium; shows for everyone — gated on tap) */
    wrap.appendChild(this._presetRow());

    /* hero label */
    var hero = api.el('div', 'ctm-hero');
    hero.textContent = phase === 'done' ? api.t('voiceEnd1') : this._labelText();
    if (phase === 'done') hero.classList.add('done');
    wrap.appendChild(hero);

    /* the metaphor card */
    var card = api.el('div', 'ctm-card');
    if (phase === 'paused') card.classList.add('paused');
    card.appendChild(this._buildMetaphor());
    if (phase === 'paused') {
      var pz = api.el('div', 'ctm-pausechip');
      pz.innerHTML = '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1.4"/><rect x="14" y="5" width="4" height="14" rx="1.4"/></svg> ' + api.t('paused');
      card.appendChild(pz);
    }
    if (this._awayDone) {
      var aw = api.el('div', 'ctm-away');
      aw.textContent = api.t('finishedAway');
      card.appendChild(aw);
    }
    wrap.appendChild(card);
    this._card = card;

    /* readout pill (default OFF; off-axis, teacher-glanceable) */
    if (api.settings.readout && phase !== 'done') {
      var ro = api.el('div', 'ctm-readout');
      wrap.appendChild(ro);
      this._readoutEl = ro;
    } else this._readoutEl = null;

    /* dock */
    wrap.appendChild(this._dock());

    this._paint(this._remaining());
  },

  _presetRow: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'ctm-presets');
    var presets = this._presetList();
    presets.slice(0, 5).forEach(function (p) {
      var chip = api.el('button', 'ctm-presetchip' + (self.premium ? '' : ' locked'));
      chip.type = 'button';
      var name = p.labelKey ? api.t(p.labelKey) : p.label;
      var m = Math.round(p.seconds / 60);
      chip.innerHTML = '<b>' + String(name).replace(/[<>&]/g, '') + '</b> ' + m + ':00';
      if (!self.premium) chip.innerHTML += ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
      chip.addEventListener('click', function () {
        if (!self.premium) { self._gateInline(row, 'gatePresets'); return; }
        if (self.timer.phase === 'running' || self.timer.phase === 'paused') return;
        self.timer.duration = p.seconds;
        self.timer.labelKey = p.labelKey || null;
        self._customLabel = p.labelKey ? null : p.label;
        if (p.metaphor) self.api.settings.metaphor = p.metaphor;
        self.timer.phase = 'idle';
        self.timer.endFired = false; self.timer.halfFired = false; self.timer.oneMinFired = false;
        self._awayDone = false;
        self._saveStore();
        self.render();
      });
      row.appendChild(chip);
    });
    /* manage chip */
    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    var manage = api.el('button', 'ctm-presetchip manage' + (this.premium ? '' : ' locked'));
    manage.type = 'button';
    manage.textContent = api.t('presetsTitle');
    if (!this.premium) manage.innerHTML += lock;
    manage.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(row, 'gatePresets'); return; }
      self._openPanel();
    });
    row.appendChild(manage);
    /* corner chip */
    var corner = api.el('button', 'ctm-presetchip manage' + (this.premium ? '' : ' locked'));
    corner.type = 'button';
    corner.textContent = api.t('cornerMode');
    if (!this.premium) corner.innerHTML += lock;
    corner.title = api.t('cornerHint');
    corner.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(row, 'gateCorner'); return; }
      var u = new URL(location.href);
      u.searchParams.set('embed', 'corner');
      location.href = u.toString();
    });
    row.appendChild(corner);
    return row;
  },

  _presetList: function () {
    if (!this._store.presets) {
      /* seed the localized starters once (stored as labelKeys so they
         render in the CURRENT locale — the frozen-locale lesson) */
      this._store.presets = this.STARTERS.map(function (s, i) {
        return { id: 'p' + i, labelKey: s.labelKey, seconds: s.seconds };
      });
      this._saveStore();
    }
    return this._store.presets;
  },

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'ctm-dock');
    var t = this.timer;

    if (t.phase === 'running' || t.phase === 'paused') {
      /* exactly three controls: Pause/Resume · +1 min · End now */
      var pr = api.el('button', 'ctm-big' + (t.phase === 'paused' ? ' coral' : ''));
      pr.type = 'button';
      pr.textContent = t.phase === 'running' ? api.t('pause') : api.t('resume');
      pr.addEventListener('click', function () {
        if (self.timer.phase === 'running') self._pause(); else self._start();
      });
      var plus = api.el('button', 'ctm-ctrlchip');
      plus.type = 'button';
      plus.textContent = api.t('plusMin');
      plus.addEventListener('click', function () { self._plusMin(); });
      var end = api.el('button', 'ctm-ctrlchip');
      end.type = 'button';
      end.textContent = api.t('endNow');
      end.addEventListener('click', function () { self._endNow(); });
      var runrow = api.el('div', 'ctm-chiprow');
      runrow.append(pr, plus, end);
      dock.appendChild(runrow);
      return dock;
    }

    if (t.phase === 'done') {
      var again = api.el('button', 'ctm-big coral');
      again.type = 'button';
      again.textContent = api.t('start');
      again.addEventListener('click', function () { self._resetToIdle(); self._start(); });
      dock.appendChild(again);
      return dock;
    }

    /* idle: minutes chips + stepper, label chips, Start */
    var mrow = api.el('div', 'ctm-chiprow');
    var mlbl = api.el('span', 'ctm-rowlabel');
    mlbl.textContent = api.t('minutes');
    mrow.appendChild(mlbl);
    this.CHIP_MINUTES.forEach(function (m) {
      var chip = api.el('button', 'ctm-chip' + (t.duration === m * 60 ? ' active' : ''));
      chip.type = 'button';
      chip.textContent = String(m);
      chip.addEventListener('click', function () {
        self.timer.duration = m * 60;
        self._saveStore();
        self.render();
      });
      mrow.appendChild(chip);
    });
    var minus = api.el('button', 'ctm-chip step');
    minus.type = 'button';
    minus.setAttribute('aria-label', api.t('minusMin'));
    minus.textContent = '−1';
    minus.addEventListener('click', function () { self._minusMin(); });
    var plus2 = api.el('button', 'ctm-chip step');
    plus2.type = 'button';
    plus2.setAttribute('aria-label', api.t('plusMin'));
    plus2.textContent = '+1';
    plus2.addEventListener('click', function () { self._plusMin(); });
    mrow.append(minus, plus2);
    dock.appendChild(mrow);

    var lrow = api.el('div', 'ctm-chiprow');
    var llbl = api.el('span', 'ctm-rowlabel');
    llbl.textContent = api.t('whatTiming');
    lrow.appendChild(llbl);
    this.LABEL_KEYS.forEach(function (k) {
      var chip = api.el('button', 'ctm-chip' + (t.labelKey === k ? ' active' : ''));
      chip.type = 'button';
      chip.textContent = api.t(k);
      chip.addEventListener('click', function () {
        self.timer.labelKey = self.timer.labelKey === k ? null : k;
        self._saveStore();
        self.render();
      });
      lrow.appendChild(chip);
    });
    dock.appendChild(lrow);

    var startRow = api.el('div', 'ctm-startrow');
    var start = api.el('button', 'ctm-big coral');
    start.type = 'button';
    start.textContent = api.t('start') + ' · ' + Math.round(t.duration / 60) + ':' + ('0' + (t.duration % 60)).slice(-2);
    start.addEventListener('click', function () { self._start(); });
    startRow.appendChild(start);
    dock.appendChild(startRow);

    return dock;
  },

  onSettings: function (key, val) {
    /* the free tier keeps the wedge; other metaphors gate at select */
    if (key === 'metaphor' && val !== 'wedge' && !this.premium) {
      this.api.settings.metaphor = 'wedge';
      this._saveStore();
      var self = this;
      requestAnimationFrame(function () {
        if (self._wrap) self._gateInline(self._wrap.querySelector('.ctm-hero') || self._wrap, 'gateMetaphor');
      });
      return;
    }
    this._saveStore();
  },
  paint: function () {},

  /* ===================== the four metaphors ========================= */

  _buildMetaphor: function () {
    var api = this.api;
    /* the free tier renders the wedge no matter what the setting or a
       deep link says — the premium metaphors appear when entitlement
       resolves (render() re-runs) */
    var kind = this.premium ? (this.api.settings.metaphor || 'wedge') : 'wedge';
    var host = api.el('div', 'ctm-met ctm-met-' + kind);
    this._metKind = kind;
    if (kind === 'wedge') {
      host.innerHTML =
        '<svg viewBox="0 0 200 200" class="ctm-svg" aria-hidden="true">' +
        '<circle cx="100" cy="100" r="94" fill="#FFFEFB" stroke="#146B5E" stroke-width="7"/>' +
        this._ticksSVG() +
        '<path class="ctm-wedge" d="" fill="#F2784B"/>' +
        '<path class="ctm-wedge-edge" d="" fill="none" stroke="#C9502A" stroke-width="2.5" stroke-linecap="round"/>' +
        '<circle cx="100" cy="100" r="7" fill="#146B5E"/>' +
        '</svg>';
    } else if (kind === 'jar') {
      /* the FUNNEL holds the remaining time (full at idle, drains as it
         runs — reads like its sibling metaphors); the jar collects the
         elapsed sand and is full at 0:00 */
      host.innerHTML =
        '<svg viewBox="0 0 200 240" class="ctm-svg" aria-hidden="true">' +
        '<clipPath id="ctmFun"><path d="M54 10 L146 10 L107 35 L107 46 L93 46 L93 35 Z"/></clipPath>' +
        '<g clip-path="url(#ctmFun)"><rect class="ctm-funsand" x="50" y="10" width="100" height="36" fill="#F2784B"/></g>' +
        '<path d="M50 7 L150 7 L110 36 L110 49 L90 49 L90 36 Z" fill="none" stroke="#146B5E" stroke-width="6" stroke-linejoin="round"/>' +
        '<line class="ctm-stream" x1="100" y1="50" x2="100" y2="210" stroke="#F2784B" stroke-width="3" stroke-dasharray="4 7"/>' +
        '<rect x="40" y="60" width="120" height="166" rx="18" fill="#FFFEFB" stroke="#146B5E" stroke-width="7"/>' +
        '<clipPath id="ctmJar"><rect x="47" y="67" width="106" height="152" rx="12"/></clipPath>' +
        '<g clip-path="url(#ctmJar)">' +
        '<rect class="ctm-sand" x="47" y="219" width="106" height="0" fill="#F2784B"/>' +
        '<path class="ctm-sandtop" d="" fill="#F2784B"/>' +
        '</g>' +
        '</svg>';
    } else if (kind === 'candle') {
      host.innerHTML =
        '<svg viewBox="0 0 200 240" class="ctm-svg" aria-hidden="true">' +
        '<ellipse cx="100" cy="222" rx="76" ry="12" fill="#146B5E"/>' +      /* saucer */
        '<g class="ctm-waxg">' +
        '<rect class="ctm-wax" x="64" y="60" width="72" height="160" rx="10" fill="#FDF7EC" stroke="#146B5E" stroke-width="6"/>' +
        '<rect class="ctm-wick" x="97" y="48" width="6" height="14" rx="3" fill="#146B5E"/>' +
        '<g class="ctm-flameg"><path class="ctm-flame" d="M100 18 C 108 30 112 38 106 48 C 103 53 97 53 94 48 C 88 38 92 30 100 18 Z" fill="#F2784B"/>' +
        '<ellipse cx="100" cy="44" rx="4" ry="6" fill="#FFD9A8"/></g>' +
        '<path class="ctm-smoke" d="M100 40 C 96 30 106 24 102 14" fill="none" stroke="#146B5E" stroke-width="2.5" stroke-linecap="round" opacity="0"/>' +
        '</g>' +
        '</svg>';
    } else {
      host.innerHTML =
        '<svg viewBox="0 0 200 260" class="ctm-svg" aria-hidden="true">' +
        '<line x1="100" y1="8" x2="100" y2="230" stroke="#146B5E" stroke-width="3" stroke-dasharray="1 10" opacity="0.14"/>' +
        '<path d="M0 252 Q 50 228 100 250 T 200 250 V 260 H 0 Z" fill="#146B5E" opacity="0.9"/>' +
        '<g class="ctm-balloong"><g class="ctm-sway">' +
        '<path d="M100 10 C 138 10 152 44 152 68 C 152 96 126 112 100 126 C 74 112 48 96 48 68 C 48 44 62 10 100 10 Z" fill="#F2784B"/>' +
        '<path d="M100 10 C 114 10 122 44 122 68 C 122 96 112 112 100 126 C 88 112 78 96 78 68 C 78 44 86 10 100 10 Z" fill="#FDF7EC"/>' +
        '<line x1="82" y1="120" x2="88" y2="146" stroke="#146B5E" stroke-width="2.5"/>' +
        '<line x1="118" y1="120" x2="112" y2="146" stroke="#146B5E" stroke-width="2.5"/>' +
        '<rect x="86" y="146" width="28" height="20" rx="5" fill="#146B5E"/>' +
        '</g></g>' +
        '</svg>';
    }
    return host;
  },
  _ticksSVG: function () {
    var s = '';
    for (var i = 0; i < 12; i++) {
      var a = i * Math.PI / 6;
      var x1 = 100 + Math.sin(a) * 82, y1 = 100 - Math.cos(a) * 82;
      var x2 = 100 + Math.sin(a) * 90, y2 = 100 - Math.cos(a) * 90;
      s += '<line x1="' + x1.toFixed(1) + '" y1="' + y1.toFixed(1) + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) + '" stroke="#146B5E" stroke-width="5" stroke-linecap="round"/>';
    }
    return s;
  },

  /* paint the metaphor for the current remaining ms */
  _paint: function (remaining) {
    var t = this.timer;
    var total = t.duration * 1000;
    var frac = total > 0 ? Math.max(0, Math.min(1, remaining / total)) : 0;   /* remaining fraction */
    var host = (this._wrap || document).querySelector('.ctm-met');
    if (!host) return;
    var kind = this._metKind;

    if (kind === 'wedge') {
      var wedge = host.querySelector('.ctm-wedge');
      var edge = host.querySelector('.ctm-wedge-edge');
      if (wedge) {
        if (frac >= 0.9999) {
          wedge.setAttribute('d', 'M100 100 m0 -84 a84 84 0 1 1 -0.01 0 Z');
          if (edge) edge.setAttribute('d', '');
        } else if (frac <= 0.0001) {
          wedge.setAttribute('d', '');
          if (edge) edge.setAttribute('d', '');
        } else {
          var ang = frac * 2 * Math.PI;
          var x = 100 + Math.sin(ang) * 84, y = 100 - Math.cos(ang) * 84;
          var large = ang > Math.PI ? 1 : 0;
          wedge.setAttribute('d', 'M100 100 L100 16 A84 84 0 ' + large + ' 1 ' + x.toFixed(2) + ' ' + y.toFixed(2) + ' Z');
          if (edge) edge.setAttribute('d', 'M100 100 L' + x.toFixed(2) + ' ' + y.toFixed(2));
        }
      }
    } else if (kind === 'jar') {
      var sand = host.querySelector('.ctm-sand');
      var top = host.querySelector('.ctm-sandtop');
      var stream = host.querySelector('.ctm-stream');
      var funsand = host.querySelector('.ctm-funsand');
      var innerTop = 67, innerH = 152;
      var h = (1 - frac) * innerH;                     /* the jar collects elapsed */
      var y = innerTop + innerH - h;
      if (sand) { sand.setAttribute('y', y.toFixed(1)); sand.setAttribute('height', h.toFixed(1)); }
      if (top) {
        /* scalloped surface: 4 gentle bumps riding the sand line */
        var d = 'M47 ' + y.toFixed(1);
        for (var i = 0; i < 4; i++) d += ' q ' + 13.25 + ' -7 ' + 26.5 + ' 0';
        d += ' V ' + (y + 8).toFixed(1) + ' H 47 Z';
        top.setAttribute('d', frac < 0.999 ? d : '');
      }
      if (funsand) {
        /* the funnel holds the REMAINING time: full at idle, drains */
        var fh = frac * 36;
        funsand.setAttribute('y', (10 + 36 - fh).toFixed(1));
        funsand.setAttribute('height', fh.toFixed(1));
      }
      if (stream) {
        stream.setAttribute('y2', Math.max(56, y - 2).toFixed(1));
        stream.style.opacity = (t.phase === 'running' && frac > 0.001) ? '1' : '0';
      }
    } else if (kind === 'candle') {
      var wax = host.querySelector('.ctm-wax');
      var flameg = host.querySelector('.ctm-flameg');
      var wick = host.querySelector('.ctm-wick');
      var smoke = host.querySelector('.ctm-smoke');
      var fullH = 160, baseY = 220;
      var wh = Math.max(14, frac * fullH);
      var wy = baseY - wh;
      if (wax) { wax.setAttribute('y', wy.toFixed(1)); wax.setAttribute('height', wh.toFixed(1)); }
      if (wick) wick.setAttribute('y', (wy - 12).toFixed(1));
      if (flameg) {
        flameg.setAttribute('transform', 'translate(0 ' + (wy - 60).toFixed(1) + ')');
        flameg.style.opacity = frac > 0.0001 ? '1' : '0';
      }
      if (smoke) {
        smoke.setAttribute('transform', 'translate(0 ' + (wy - 52).toFixed(1) + ')');
        smoke.style.opacity = (t.phase === 'done') ? '0.5' : '0';
      }
    } else if (kind === 'balloon') {
      var g = host.querySelector('.ctm-balloong');
      if (g) {
        var travel = 88;                                /* svg units of descent */
        var ty = (1 - frac) * travel;
        g.setAttribute('transform', 'translate(0 ' + ty.toFixed(2) + ')' + (t.phase === 'done' ? ' scale(1 0.97)' : ''));
      }
    }

    /* the sunset glow (final 60s) — a warm dim, never a siren */
    if (this._card) this._card.classList.toggle('sunset', t.phase === 'running' && remaining <= 60000 && remaining > 0);

    /* readout: rounds UP to 10s bands while >2min; per-second below */
    if (this._readoutEl) {
      var secs;
      if (remaining > 120000) secs = Math.ceil(remaining / 10000) * 10;
      else secs = Math.ceil(remaining / 1000);
      var mm = Math.floor(secs / 60), ss = secs % 60;
      this._readoutEl.textContent = mm + ':' + ('0' + ss).slice(-2);
    }
  },

  /* ==================== gates + presets panel ====================== */

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.ctm-gate');
    if (old) old.remove();
    var g = api.el('div', 'ctm-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-class-timer';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('afterend', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  _openPanel: function () {
    if (!this._panelEl) this._buildPanel();
    this._renderPanel();
    this._panelEl.classList.add('open');
    this._scrimEl.classList.add('open');
  },
  _closePanel: function () {
    if (this._panelEl) { this._panelEl.classList.remove('open'); this._scrimEl.classList.remove('open'); }
  },
  _buildPanel: function () {
    var api = this.api, self = this;
    var scrim = api.el('div', 'ctm-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'ctm-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('presetsTitle'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },
  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';
    var head = api.el('div', 'ctm-panel-head');
    var h = api.el('div', 'ctm-panel-title');
    h.textContent = api.t('presetsTitle');
    var x = api.el('button', 'ctm-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('deleteBtn'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(h, x);
    panel.appendChild(head);

    var body = api.el('div', 'ctm-panel-body');
    var presets = this._presetList();
    presets.forEach(function (p, i) {
      var row = api.el('div', 'ctm-prow');
      var name = api.el('span', 'ctm-prow-name');
      name.textContent = (p.labelKey ? api.t(p.labelKey) : p.label) + ' · ' + Math.round(p.seconds / 60) + ':' + ('0' + (p.seconds % 60)).slice(-2);
      var del = api.el('button', 'ctm-linkbtn');
      del.type = 'button';
      del.textContent = api.t('deleteBtn');
      del.addEventListener('click', function () {
        self._store.presets.splice(i, 1);
        self._saveStore();
        self._renderPanel();
        self.render();
      });
      row.append(name, del);
      body.appendChild(row);
    });

    /* save-current composer */
    var comp = api.el('div', 'ctm-composer');
    var lbl = api.el('div', 'ctm-rowlabel');
    lbl.textContent = api.t('savePreset') + ' — ' + Math.round(this.timer.duration / 60) + ':' + ('0' + (this.timer.duration % 60)).slice(-2);
    var nameIn = document.createElement('input');
    nameIn.className = 'ctm-input';
    nameIn.type = 'text';
    nameIn.maxLength = 30;
    nameIn.placeholder = api.t('presetName');
    if (this.timer.labelKey) nameIn.value = api.t(this.timer.labelKey);
    var save = api.el('button', 'ctm-ctrlchip teal');
    save.type = 'button';
    save.textContent = api.t('saveBtn');
    save.addEventListener('click', function () {
      var nm = nameIn.value.trim();
      if (!nm || self._store.presets.length >= 12) return;
      self._store.presets.push({ id: 'c' + Math.random().toString(36).slice(2, 8), label: nm, seconds: self.timer.duration, metaphor: self.api.settings.metaphor });
      self._saveStore();
      self._renderPanel();
      self.render();
    });
    comp.append(lbl, nameIn, save);
    body.appendChild(comp);
    panel.appendChild(body);
  }
};

/* per-tool styling: STAGE ONLY + the sanctioned body class + confirm/panel */
(function injectCSS() {
  var css = ''
  + 'body.ctm-wide .lcs-app{max-width:min(980px,96vw);}'
  + '@media (max-width:480px){'
  +   'body.ctm-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  + '}'
  + '.ctm-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;}'

  /* hero label */
  + '.ctm-hero{font-family:var(--lcs-font-display);font-weight:700;color:var(--lcs-structure);'
  +   'font-size:clamp(28px,6vmin,58px);line-height:1.1;text-align:center;}'
  + '.ctm-hero.done{color:#C9502A;}'

  /* metaphor card */
  + '.ctm-card{position:relative;background:#FFFEFB;border-radius:22px;box-shadow:var(--lcs-shadow);'
  +   'padding:clamp(10px,2vmin,20px);display:flex;align-items:center;justify-content:center;'
  +   'transition:background 1.2s linear;}'
  + '.ctm-card.sunset{background:#FDF0E0;}'
  + '.ctm-card.paused .ctm-met{opacity:0.55;}'
  + '.ctm-met{width:min(46vh,72vw,420px);}'
  + '.ctm-met-jar,.ctm-met-candle,.ctm-met-balloon{width:min(40vh,62vw,330px);}'
  + '.ctm-svg{display:block;width:100%;height:auto;}'
  + '.ctm-pausechip{position:absolute;top:12px;right:14px;display:inline-flex;align-items:center;gap:5px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:14px;color:var(--lcs-structure);'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:5px 12px;}'
  + '.ctm-away{position:absolute;bottom:12px;left:50%;transform:translateX(-50%);white-space:nowrap;'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-ink-soft);}'

  /* balloon sway + candle flicker (decorative loops — reduced-motion kills them) */
  + '.ctm-sway{transform-origin:100px 70px;animation:ctmSway 8s ease-in-out infinite;}'
  + '@keyframes ctmSway{0%,100%{transform:rotate(-1.5deg);}50%{transform:rotate(1.5deg);}}'
  + '.ctm-flameg{animation:ctmFlick 3s ease-in-out infinite;transform-box:fill-box;transform-origin:center 80%;}'
  + '@keyframes ctmFlick{0%,100%{scale:1;}50%{scale:1.04 0.97;}}'
  + '.ctm-balloong{transition:transform 0.9s linear;}'
  + '.ctm-stream{transition:opacity .4s;}'

  /* readout */
  + '.ctm-readout{align-self:flex-end;font-family:var(--lcs-font-body);font-weight:800;'
  +   'font-size:clamp(26px,4.4vmin,44px);color:var(--lcs-structure);opacity:0.55;'
  +   'background:var(--lcs-surface);border-radius:var(--lcs-radius-pill);padding:2px 18px;'
  +   'box-shadow:var(--lcs-shadow-sm);font-variant-numeric:tabular-nums;}'

  /* presets row */
  + '.ctm-presets{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;width:100%;}'
  + '.ctm-presetchip{display:inline-flex;align-items:center;gap:6px;font-family:var(--lcs-font-body);'
  +   'font-weight:700;font-size:13px;color:var(--lcs-ink);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 14px;'
  +   'min-height:44px;cursor:pointer;}'
  + '.ctm-presetchip b{font-family:var(--lcs-font-display);color:var(--lcs-structure);}'
  + '.ctm-presetchip.manage{color:var(--lcs-structure);font-family:var(--lcs-font-display);}'
  + '.ctm-presetchip.locked{color:var(--lcs-ink-soft);}'

  /* dock */
  + '.ctm-dock{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;}'
  + '.ctm-chiprow{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;}'
  + '.ctm-rowlabel{font-family:var(--lcs-font-body);font-weight:800;font-size:13px;color:var(--lcs-ink-soft);margin-right:2px;}'
  + '.ctm-chip{min-width:48px;min-height:46px;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:15px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 13px;'
  +   'cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.ctm-chip:active{transform:scale(.96);}'
  + '.ctm-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.ctm-chip.step{color:var(--lcs-ink-soft);}'
  + '.ctm-startrow{display:flex;justify-content:center;}'
  + '.ctm-big{min-width:180px;min-height:58px;padding:12px 36px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(17px,2.6vmin,22px);box-shadow:var(--lcs-shadow-sm);'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.ctm-big:active{transform:scale(.97);}'
  + '.ctm-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.ctm-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.ctm-ctrlchip{font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:10px 18px;min-height:50px;cursor:pointer;'
  +   'box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.ctm-ctrlchip:active{transform:scale(.97);}'
  + '.ctm-ctrlchip.teal{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'

  /* gate */
  + '.ctm-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;'
  +   'margin:8px auto;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.ctm-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* confirm scrim */
  + '.ctm-confirm-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);z-index:80;'
  +   'display:grid;place-items:center;border-radius:inherit;}'
  + '.ctm-confirm{background:var(--lcs-surface);border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);'
  +   'padding:20px 24px;max-width:340px;text-align:center;}'
  + '.ctm-confirm p{margin:0 0 14px;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:18px;color:var(--lcs-ink);}'
  + '.ctm-confirm-row{display:flex;gap:10px;justify-content:center;}'

  /* presets panel */
  + '.ctm-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;'
  +   'pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.ctm-scrim.open{opacity:1;pointer-events:auto;}'
  + '.ctm-panel{position:absolute;left:50%;top:8%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(480px,92%);max-height:84%;overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.ctm-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.ctm-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.ctm-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;color:var(--lcs-ink);}'
  + '.ctm-panel-close{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;border:none;}'
  + '.ctm-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.ctm-prow{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);border:1.5px solid var(--lcs-line);}'
  + '.ctm-prow-name{flex:1;font-family:var(--lcs-font-body);font-weight:800;color:var(--lcs-ink);}'
  + '.ctm-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:#C9502A;'
  +   'background:transparent;border:none;cursor:pointer;text-decoration:underline;padding:4px;}'
  + '.ctm-composer{display:flex;flex-direction:column;gap:8px;padding-top:10px;'
  +   'border-top:1.5px dashed var(--lcs-line);}'
  + '.ctm-input{width:100%;box-sizing:border-box;font-family:var(--lcs-font-body);font-weight:700;'
  +   'font-size:15px;padding:10px;border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);}'

  /* corner mode */
  + 'body.ctm-corner .lcs-header,body.ctm-corner .lcs-instruction{display:none;}'
  + 'body.ctm-corner .lcs-app{max-width:320px;padding:8px;}'
  + '.ctm-cornercard{display:flex;flex-direction:column;align-items:center;gap:4px;width:280px;'
  +   'background:#FFFEFB;border-radius:18px;box-shadow:var(--lcs-shadow);border:none;cursor:pointer;'
  +   'padding:12px;}'
  + '.ctm-cornercard .ctm-met{width:220px;}'
  + '.ctm-cornerlabel{font-family:var(--lcs-font-display);font-weight:700;font-size:18px;'
  +   'color:var(--lcs-structure);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:250px;}'

  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.ctm-wrap{gap:5px;}'
  +   '.ctm-hero{font-size:clamp(24px,5vh,44px);}'
  +   '.ctm-met{width:min(38vh,60vw,360px);}'
  +   '.ctm-met-jar,.ctm-met-candle,.ctm-met-balloon{width:min(32vh,50vw,270px);}'
  +   '.ctm-readout{font-size:clamp(20px,3.6vh,32px);}'
  + '}'

  /* reduced motion: decorative loops off; the drain stays (it is information) */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.ctm-sway,.ctm-flameg{animation:none;}'
  +   '.ctm-balloong{transition:none;}'
  +   '.ctm-card{transition:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
