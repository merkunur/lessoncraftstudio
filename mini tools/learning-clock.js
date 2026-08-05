/* =====================================================================
   TOOL #14 — LEARNING CLOCK   (learning-clock.js)
   REBUILT TO THE v4 BAR, 2026-08-05.
   ---------------------------------------------------------------------
   THE THESIS. A geared demonstration clock whose bubble says the time
   THE WAY PEOPLE ACTUALLY SAY IT HERE — drag to 2:30 in German and it
   says "halb drei", with a honey arc on the bezel showing the distance
   the idiom names. The generative speech engine (TIME_RULES + sayTime,
   below, byte-untouched by this rebuild) is the moat; 176 anchors x 11
   locales are enforced by verify-learning-clock-l10n.js.

   ---------------------------------------------------------------------
   WHY IT WAS REBUILT: THE HANDS DID NOT MOVE ON A TOUCHSCREEN, AND
   THREE GATES WERE BLIND TO IT.

   ⭐⭐ REPRODUCED BEFORE ANY LINE CHANGED (scripts/repro-learning-clock-
   touch.js, which serves three builds from memory and is poisoned by
   requiring the patched ones to MOVE):

       [V0 shipped]  pointerdown:1  pointermove:2  POINTERCANCEL:1   total 150 -> 150
       [V1 +root  ]  pointerdown:1  pointermove:12 pointerup:1       total 150 -> 180

   `touch-action:none` sat on `.lck-hand`, an SVG <g>. It is not honoured
   there. The browser claimed the gesture after two moves and cancelled
   it — and `pointercancel` was wired straight to the release handler, so
   the hand SNAPPED BACK before it had visibly moved. `clock-core.js:329`
   declares the rule on `.clk-svg`, the ROOT; this file had copied the
   `.clk-hand` line and dropped the root one. One line, measured.

   ⭐⭐ AND THE GATE COULD NOT HAVE SEEN IT. local-test drove `page.mouse`
   — `touch-action` is irrelevant to a mouse — so "ONE real pointer drag
   moves the hands" was true of the only input it tested. Its tap-target
   sweep also selected `.lck-chip,.lck-big,.lck-speak,.lck-why,.lck-sky`
   and NOT `.lck-hand`: the two most important controls in the tool had
   never been measured against any floor, and both failed (hit line
   21.1px, pad 27.4px at a 320px page; floors are 44 control / 34 canvas).

   THE INVENTION this rebuild adds: the interactive surface leaves the
   SVG. Two real 44px HTML <button> grips ride the face at DIFFERENT
   RADII (hour r=360, minute r=740 of 1000), so with the hands perfectly
   collinear at 12:00 they are still 19% of the face apart — both stay
   individually grabbable at every viewport and THERE IS NEVER AN
   AMBIGUOUS STATE. The radial rule says it wordlessly: the short hand
   lives in the inner disc, the long hand reaches the ring. The whole
   dial is live too, so a miss still does something.

   ---------------------------------------------------------------------
   THE MOAT IS FENCED. Lines 102-844 (TIME_RULES + NUM_WORDS_HELPERS +
   sayTime + _numWord + _sayFormal) are BYTE-IDENTICAL to the shipped
   file, md5 affd29ce059a96e15cc7c740b5c3c48a. Do not reformat them.

   ---------------------------------------------------------------------
   WHAT THIS TOOL REFUSES (a tool without an anti-feature list is a
   widget):
     · NO timer, countdown, score, streak or verdict. `class-timer` owns
       transitions; this instrument never races a child.
     · NO analog-to-digital matching quiz — `clock-digital` owns it.
     · NO daily schedule strip — `our-day` owns it, and it must never
       compare the clock to the plan.
     · NO 24-hour ring by page language. It is a SETTING, off in all 11.
       No curriculum of the eleven teaches 24-hour time by adding a
       second numeral ring to a beginner's analog face.
     · NO words on the apparatus. The dial carries numerals and marks.
     · NO dependence on hearing: TTS is reliable in about five of eleven
       locales here, so the bubble, the arc and the halo carry the
       meaning and speech only ever confirms it.

   THE POINTING CONTRACT (governs the whole face): a colour is a PROMISE
   about which hand points at it. Teal = what the HOUR hand points at.
   Coral = what the MINUTE hand points at. Anything that is neither a
   hand nor a hand's target is a third, non-pointing colour. The shipped
   build painted the 60 minute ticks TEAL — the minute hand's own targets
   in the other hand's colour — and neither hand reached its targets
   (hour tip r40 vs numerals r64; on a non-English face the hour hand
   TERMINATED on the 13-24 ring, so a child following it landed on "14"
   when the answer was "2").
   ===================================================================== */
var LearningClock = {
  id: 'learning-clock',

  /* ⭐ THE FREE/PAID LINE, AS ONE CONSTANT so it is a one-line reversal.
     FREE = 60/30/15/5. Gating quarter-hours was calibrated to US Grade 1
     alone; in SEVEN of the eleven curricula `halv` and `kvart` are one
     lesson (de Klasse 2 Viertel vor/nach · nl groep 4 kwart over/voor ·
     fr CE1 et quart · sv/da/no kvart with halv · fi vartti with puoli),
     so the old line left the free tool unable to finish the first-year
     objective in most of the markets the tool's positioning rests on.
     The 5-minute grid is also where every hard idiom lives (fünf vor
     halb, tien voor half tien, kymmentä vaille puoli) — the best
     acquisition argument the tool has.
     1-minute stays PAID: it is the only setting that engages the FORMAL
     register ("zwei Uhr siebenunddreißig"), which no locale speaks
     colloquially and no K-2 curriculum asks for. */
  FREE_STEPS: ['60', '30', '15', '5'],

  /* ---------------------------------------------------------------------
     STRINGS — EN is authored; the other ten were REBUILT (not translated)
     by a three-person NATIVE panel per locale, §A.13.48.
     ⚠ DO NOT HAND-EDIT A LOCALE HERE. The source of truth is
     scripts/_learning-clock-strings.js; scripts/apply-learning-clock-
     locales.js rewrites this whole block from it and refuses to write on
     a missing key, an English leak, a lost placeholder or a banned word.
     --------------------------------------------------------------------- */
  strings: {
    title:          {en:"Learning Clock",de:"Lernuhr",fr:"Horloge parlante",it:"Orologio didattico",es:"Reloj para aprender la hora",pt:"Relógio das horas",nl:"Oefenklok",sv:"Lärklockan",da:"Læringsuret",no:"Læringsklokka",fi:"Opettelukello"},
    instruction:    {en:"Drag the hands — the clock shows and says the time, the way we really say it.",de:"Zieh an den Zeigern — die Uhr zeigt und sagt dir die Zeit so, wie wir sie wirklich sagen.",fr:"Fais glisser les aiguilles — l’horloge dit l’heure comme on la dit vraiment.",it:"Trascina le lancette — l’orologio dice l’ora come la diciamo davvero.",es:"Arrastra las manecillas — el reloj dice la hora como la decimos de verdad.",pt:"Arraste os ponteiros — o relógio fala a hora do jeito que a gente fala.",nl:"Sleep aan de kleine of de grote wijzer — de klok zegt hoe laat het is, zoals wij het echt zeggen.",sv:"Dra i visarna — klockan säger tiden precis som vi säger den på riktigt.",da:"Træk i viserne — uret siger, hvad klokken er, sådan som vi rent faktisk siger det.",no:"Dra i viserne. Så sier klokka hva den er — slik vi sier det.",fi:"Vedä viisareita — kello kertoo ajan niin kuin me sen oikeasti sanomme."},
    modeExplore:    {en:"Explore",de:"Entdecken",fr:"Découverte",it:"Esplora",es:"Explorar",pt:"Explorar",nl:"Ontdekken",sv:"Utforska",da:"Udforsk",no:"Utforsk",fi:"Tutki"},
    modeTask:       {en:"Practice",de:"Üben",fr:"Entraînement",it:"Esercizi",es:"Practicar",pt:"Praticar",nl:"Oefenen",sv:"Öva",da:"Øv",no:"Øv",fi:"Harjoittele"},
    modeElapsed:    {en:"How long?",de:"Wie lange?",fr:"Combien de temps ?",it:"Quanto tempo?",es:"¿Cuánto tiempo?",pt:"Quanto tempo?",nl:"Hoe lang?",sv:"Hur länge?",da:"Hvor længe?",no:"Hvor lenge?",fi:"Kuinka kauan?"},
    modeGroup:      {en:"What to do with the clock",de:"Was wir mit der Uhr machen",fr:"Ce que fait l’horloge",it:"Che cosa fare con l’orologio",es:"Modo del reloj",pt:"O que fazer com o relógio",nl:"Wat wil je doen?",sv:"Vad du vill göra",da:"Hvad uret bruges til",no:"Hva vi gjør med klokka",fi:"Mihin kelloa käytetään"},
    granLbl:        {en:"Steps",de:"Schritte",fr:"Le pas",it:"Passo",es:"Pasos",pt:"Passos",nl:"Stapgrootte",sv:"Steg",da:"Trin",no:"Steg",fi:"Askeleet"},
    granHour:       {en:"Whole hours",de:"Ganze Stunden",fr:"Heures pile",it:"Ore",es:"Horas",pt:"De hora em hora",nl:"Hele uren",sv:"Hela timmar",da:"Timer",no:"Timer",fi:"Tasatunnit"},
    granHalf:       {en:"Half hours",de:"Halbe Stunden",fr:"Demi-heures",it:"Mezz’ore",es:"Medias horas",pt:"De meia em meia hora",nl:"Halve uren",sv:"Halvtimmar",da:"Halve timer",no:"Halvtimer",fi:"Puolitunnit"},
    granQuarter:    {en:"Quarter hours",de:"Viertelstunden",fr:"Quarts d’heure",it:"Quarti d’ora",es:"Cuartos de hora",pt:"De quinze em quinze minutos",nl:"Kwartieren",sv:"Kvartar",da:"Kvarter",no:"Kvarter",fi:"Vartit"},
    granFive:       {en:"5 minutes",de:"5 Minuten",fr:"5 minutes",it:"5 minuti",es:"5 minutos",pt:"De 5 em 5 minutos",nl:"5 minuten",sv:"5 minuter",da:"5 minutter",no:"5 minutter",fi:"5 minuuttia"},
    granMinute:     {en:"1 minute",de:"1 Minute",fr:"1 minute",it:"1 minuto",es:"1 minuto",pt:"De 1 em 1 minuto",nl:"1 minuut",sv:"1 minut",da:"1 minut",no:"1 minutt",fi:"1 minuutti"},
    viewLbl:        {en:"Hands shown",de:"Zeiger",fr:"Aiguilles visibles",it:"Lancette",es:"Manecillas",pt:"Ponteiros",nl:"Wijzers",sv:"Visare",da:"Visere",no:"Visere",fi:"Viisarit"},
    viewBoth:       {en:"Both hands",de:"Beide Zeiger",fr:"Les deux aiguilles",it:"Tutte e due le lancette",es:"Las dos manecillas",pt:"Os dois ponteiros",nl:"Allebei de wijzers",sv:"Båda visarna",da:"Begge visere",no:"Begge viserne",fi:"Molemmat viisarit"},
    viewHour:       {en:"Short hand only",de:"Nur der kleine Zeiger",fr:"La petite aiguille seule",it:"Solo la lancetta corta",es:"Solo la manecilla corta",pt:"Só o ponteiro pequeno (as horas)",nl:"Alleen de kleine wijzer",sv:"Bara lilla visaren",da:"Kun den lille viser",no:"Bare timeviseren",fi:"Vain tuntiviisari"},
    viewMinute:     {en:"Long hand only",de:"Nur der große Zeiger",fr:"La grande aiguille seule",it:"Solo la lancetta lunga",es:"Solo la manecilla larga",pt:"Só o ponteiro grande (os minutos)",nl:"Alleen de grote wijzer",sv:"Bara stora visaren",da:"Kun den store viser",no:"Bare minuttviseren",fi:"Vain minuuttiviisari"},
    speakBtn:       {en:"Say it out loud",de:"Uhrzeit vorlesen",fr:"Dire l’heure",it:"Ascolta l’ora",es:"Decir la hora",pt:"Ouvir a hora",nl:"Zeg hoe laat het is",sv:"Säg tiden",da:"Sig det højt",no:"Les opp",fi:"Sano kellonaika ääneen"},
    whyBtn:         {en:"Why do we say it like that?",de:"Warum sagen wir das so?",fr:"Pourquoi on dit ça comme ça ?",it:"Perché si dice così?",es:"¿Por qué se dice así?",pt:"Por que a gente fala assim?",nl:"Waarom zeggen we het zo?",sv:"Varför säger vi så?",da:"Hvorfor siger vi det sådan?",no:"Hvorfor sier vi det slik?",fi:"Miksi sanomme näin?"},
    countFives:     {en:"Count the minutes in fives",de:"In Fünferschritten zählen",fr:"Compter de cinq en cinq",it:"Conta di cinque in cinque",es:"Contar de cinco en cinco",pt:"Contar de cinco em cinco",nl:"Tellen met sprongen van vijf",sv:"Räkna fem och fem",da:"Tæl med femmere",no:"Tell videre med femmere",fi:"Laske viisi kerrallaan"},
    printBtn:       {en:"Print the practice sheets",de:"Zifferblätter ausdrucken",fr:"Imprimer les fiches",it:"Stampa i quadranti",es:"Imprimir carátulas",pt:"Imprimir as folhas",nl:"Werkbladen afdrukken",sv:"Skriv ut urtavlor",da:"Print arbejdsark",no:"Skriv ut urskiver",fi:"Tulosta kellotauluja"},
    ampmLbl:        {en:"Before or after midday",de:"Tageshälfte",fr:"Avant ou après midi",it:"Parte della giornata",es:"Mitad del día",pt:"Parte do dia",nl:"Helft van de dag",sv:"Förmiddag eller eftermiddag",da:"Døgnets halvdel",no:"Tid på døgnet",fi:"Vuorokauden puolisko"},
    amLbl:          {en:"Before midday",de:"Vormittag",fr:"Avant midi",it:"Mattina",es:"a.m.",pt:"Manhã",nl:"Ochtend",sv:"Förmiddag",da:"Formiddag",no:"Formiddag",fi:"Aamupäivä"},
    pmLbl:          {en:"After midday",de:"Nachmittag",fr:"Après midi",it:"Pomeriggio",es:"p.m.",pt:"Tarde",nl:"Middag en avond",sv:"Eftermiddag",da:"Eftermiddag",no:"Ettermiddag/kveld",fi:"Iltapäivä"},
    handHour:       {en:"Hour hand — the short one",de:"Kleiner Zeiger – die Stunden",fr:"Aiguille des heures – la petite",it:"Lancetta delle ore – quella corta",es:"Manecilla de las horas – la corta",pt:"Ponteiro das horas — o pequeno",nl:"De kleine wijzer – de uurwijzer",sv:"Timvisaren – den lilla",da:"Timeviseren – den lille",no:"Timeviser – den korte",fi:"Tuntiviisari – lyhyt viisari"},
    handMinute:     {en:"Minute hand — the long one",de:"Großer Zeiger – die Minuten",fr:"Aiguille des minutes – la grande",it:"Lancetta dei minuti – quella lunga",es:"Manecilla de los minutos – la larga",pt:"Ponteiro dos minutos — o grande",nl:"De grote wijzer – de minutenwijzer",sv:"Minutvisaren – den stora",da:"Minutviseren – den store",no:"Minuttviser – den lange",fi:"Minuuttiviisari – pitkä viisari"},
    hintDrag:       {en:"Drag a hand — when you let go it settles on the nearest mark and the clock says the time.",de:"Zieh an einem Zeiger — wenn du loslässt, zeigt und sagt die Uhr die neue Zeit.",fr:"Fais glisser une aiguille : quand tu la lâches, elle se cale sur le repère le plus proche et l’horloge dit l’heure.",it:"Trascina una lancetta: quando la lasci, l’orologio dice che ora è.",es:"Arrastra una manecilla — al soltarla, el reloj lee la hora nueva.",pt:"Arraste um ponteiro — quando você soltar, o relógio fala a hora.",nl:"Sleep aan de kleine of de grote wijzer — als je loslaat, staat er hoe laat het is.",sv:"Dra i en visare — när du släpper säger klockan den nya tiden.",da:"Træk i en viser — når du slipper, siger uret, hvad klokken er.",no:"Dra i en viser. Når du slipper, sier klokka hva den er.",fi:"Vedä jompaakumpaa viisaria — kun päästät irti, kello kertoo uuden ajan."},
    hintTaskSet:    {en:"Set the hands, then press Check.",de:"Stell die Zeiger ein und drück dann auf Nachschauen.",fr:"Place les aiguilles, puis appuie sur Vérifier.",it:"Sposta le lancette, poi premi Controlla.",es:"Coloca las manecillas y luego pulsa Revisar.",pt:"Coloque os ponteiros e depois toque em Conferir.",nl:"Zet de wijzers goed en druk dan op Nakijken.",sv:"Ställ visarna och tryck sedan på Kolla.",da:"Stil viserne, og tryk så på Tjek.",no:"Still viserne, og trykk så på Sjekk.",fi:"Aseta viisarit ja paina sitten Tarkista-painiketta."},
    hintTaskDone:   {en:"Press Next for another time.",de:"Drück auf Weiter für die nächste Uhrzeit.",fr:"Appuie sur Suivant pour une autre heure.",it:"Premi Avanti per un’altra ora.",es:"Pulsa Siguiente para otra hora.",pt:"Toque em Próximo para ver outro horário.",nl:"Druk op Volgende voor een nieuwe tijd.",sv:"Tryck på Nästa för en ny tid.",da:"Tryk på Næste for et nyt klokkeslæt.",no:"Trykk på Neste for et nytt klokkeslett.",fi:"Paina Seuraava-painiketta, niin saat uuden kellonajan."},
    hintElapsedA:   {en:"Set a starting time, then mark it.",de:"Stell eine Startzeit ein und markiere sie.",fr:"Règle l’heure de départ, puis marque-la.",it:"Imposta l’ora di partenza, poi fissala.",es:"Pon una hora de inicio y fíjala.",pt:"Coloque a hora de início e depois anote.",nl:"Kies een begintijd en zet die vast.",sv:"Ställ in en starttid och markera den.",da:"Stil uret på starttidspunktet, og marker det.",no:"Still en starttid, og fest den.",fi:"Aseta aloitusaika ja kiinnitä se."},
    hintElapsedB:   {en:"Now set the finishing time and mark that.",de:"Jetzt die Endzeit einstellen und markieren.",fr:"Maintenant règle l’heure d’arrivée et marque-la.",it:"Ora imposta l’ora di fine e fissala.",es:"Ahora pon la hora final y fíjala.",pt:"Agora coloque a hora do fim e anote também.",nl:"Kies nu de eindtijd en zet die ook vast.",sv:"Ställ nu in sluttiden och markera den.",da:"Stil nu uret på sluttidspunktet, og marker det.",no:"Still nå sluttiden, og fest den.",fi:"Aseta nyt lopetusaika ja kiinnitä se."},
    hintElapsedC:   {en:"Clear it to time something else.",de:"Setz zurück, wenn ihr etwas anderes messen wollt.",fr:"Efface pour mesurer autre chose.",it:"Cancella per misurare un altro tempo.",es:"Borra para medir otro tiempo.",pt:"Limpe para medir outro tempo.",nl:"Wis het om iets anders te meten.",sv:"Börja om för att ta tid på något annat.",da:"Ryd det, hvis I vil tage tid på noget andet.",no:"Nullstill for å ta tiden på noe annet.",fi:"Tyhjennä, jos haluatte mitata jotain muuta."},
    taskPrompt:     {en:"Set the clock to {time}.",de:"Stell die Uhr auf {time}.",fr:"Règle l’horloge sur {time}.",it:"Fai segnare {time} all’orologio.",es:"Pon el reloj en {time}.",pt:"Coloque o relógio em {time}.",nl:"Zet de klok op {time}.",sv:"Ställ klockan på {time}.",da:"Stil uret på {time}.",no:"Still klokka på {time}.",fi:"Näytä {time}."},
    checkBtn:       {en:"Check",de:"Nachschauen",fr:"Vérifier",it:"Controlla",es:"Revisar",pt:"Conferir",nl:"Nakijken",sv:"Kolla",da:"Tjek",no:"Sjekk",fi:"Tarkista"},
    nextBtn:        {en:"Next",de:"Weiter",fr:"Suivant",it:"Avanti",es:"Siguiente",pt:"Próximo",nl:"Volgende",sv:"Nästa",da:"Næste",no:"Neste",fi:"Seuraava"},
    youMade:        {en:"You set the clock to {time}.",de:"Du hast {time} eingestellt.",fr:"Tu as réglé l’horloge sur {time}.",it:"Hai segnato {time}.",es:"Pusiste {time}.",pt:"Você marcou {time}.",nl:"Je hebt de klok op {time} gezet.",sv:"Du ställde klockan på {time}.",da:"Du stillede uret på {time}.",no:"Du stilte klokka på {time}.",fi:"Juuri noin — {time}."},
    nudgeMinute:    {en:"The long hand is right. Now the short one.",de:"Die Minuten stimmen. Jetzt der kleine Zeiger.",fr:"La grande aiguille est bien placée. Maintenant la petite.",it:"La lancetta lunga è giusta. Ora quella corta.",es:"La manecilla larga ya está en los minutos. Ahora mira la corta.",pt:"O ponteiro grande está certo. Agora o pequeno.",nl:"De grote wijzer klopt. Nu de kleine.",sv:"Stora visaren är rätt. Nu den lilla.",da:"Den store viser passer. Nu den lille.",no:"Den lange viseren stemmer. Nå den korte.",fi:"Pitkä viisari on oikein. Siirrä nyt lyhyttä viisaria."},
    nudgeHour:      {en:"The short hand has the hour. Now look at the long one.",de:"Die Stunde stimmt. Jetzt der große Zeiger.",fr:"La petite aiguille est sur la bonne heure. Regarde la grande.",it:"La lancetta corta è al posto giusto. Guarda quella lunga.",es:"La manecilla corta ya está en la hora. Ahora mira la larga.",pt:"O ponteiro pequeno está quase lá. Agora olhe o grande.",nl:"De kleine wijzer staat bij het goede uur. Kijk nu naar de grote.",sv:"Lilla visaren är nästan rätt. Titta på den stora.",da:"Den lille viser er tæt på. Kig på den store.",no:"Den korte viseren er nesten der. Se på den lange.",fi:"Lyhyt viisari on jo lähellä. Katso pitkää viisaria."},
    nudgeBoth:      {en:"Start with the long hand — where do the minutes go?",de:"Fang mit dem großen Zeiger an — wo gehören die Minuten hin?",fr:"Commence par la grande aiguille — où vont les minutes ?",it:"Comincia dalla lancetta lunga — dove vanno i minuti?",es:"Empieza por la manecilla larga — ¿dónde van los minutos?",pt:"Comece pelo ponteiro grande — onde ficam os minutos?",nl:"Begin bij de grote wijzer — waar horen de minuten?",sv:"Börja med stora visaren — vart ska den peka?",da:"Start med den store viser — hvor skal minutterne stå?",no:"Start med den lange viseren — hvor skal minuttene være?",fi:"Aloita pitkästä viisarista — mihin minuutit kuuluvat?"},
    showMinutes:    {en:"Help me with the long hand",de:"Nur den großen Zeiger zeigen",fr:"Juste la grande aiguille",it:"Mostrami i minuti",es:"Ayúdame con la manecilla larga",pt:"Mostrar os minutos",nl:"Laat het me even zien",sv:"Visa minuterna",da:"Hjælp mig med minutterne",no:"Vis meg minuttene",fi:"Näytä minuutit"},
    niceBreak:      {en:"A good moment to swap turns.",de:"Ein guter Moment zum Wechseln.",fr:"C’est le moment de passer la main.",it:"Bel momento per cambiare turno.",es:"Buen momento para cambiar de turno.",pt:"Boa hora de trocar a vez.",nl:"Mooi moment om te wisselen.",sv:"Bra läge att byta med en kompis.",da:"Godt tidspunkt at bytte tur.",no:"Nå kan dere bytte — la en annen få prøve.",fi:"Viisi kellonaikaa tehty. Hyvä hetki vaihtaa vuoroa."},
    pinStart:       {en:"Mark the start",de:"Start markieren",fr:"Marquer le départ",it:"Fissa l’inizio",es:"Fijar el inicio",pt:"Anotar o início",nl:"Begin vastzetten",sv:"Markera start",da:"Marker starten",no:"Fest starten",fi:"Kiinnitä alku"},
    pinEnd:         {en:"Mark the end",de:"Ende markieren",fr:"Marquer l’arrivée",it:"Fissa la fine",es:"Fijar el final",pt:"Anotar o fim",nl:"Einde vastzetten",sv:"Markera slut",da:"Marker slutningen",no:"Fest slutten",fi:"Kiinnitä loppu"},
    elapsedClear:   {en:"Clear",de:"Zurücksetzen",fr:"Effacer",it:"Cancella",es:"Borrar",pt:"Limpar",nl:"Wissen",sv:"Börja om",da:"Ryd",no:"Nullstill",fi:"Tyhjennä"},
    elapsedIdle:    {en:"Set a starting time.",de:"Stell eine Startzeit ein.",fr:"Règle l’heure de départ.",it:"Imposta un’ora di partenza.",es:"Pon una hora de inicio.",pt:"Coloque uma hora de início.",nl:"Kies eerst een begintijd.",sv:"Ställ in en starttid.",da:"Stil først uret på starttidspunktet.",no:"Still en starttid.",fi:"Aseta aloitusaika."},
    durMinutes:     {en:"{n} minutes",de:"{n} Minuten",fr:"{n} minutes",it:"{n} minuti",es:"{n} minutos",pt:"{n} minutos",nl:"{n} minuten",sv:"{n} minuter",da:"{n} minutter",no:"{n} minutter",fi:"{n} min"},
    durHours:       {en:"{h} hours and {m} minutes",de:"{h} Stunden und {m} Minuten",fr:"{h} heures et {m} minutes",it:"{h} ore e {m} minuti",es:"{h} horas y {m} minutos",pt:"{h} horas e {m} minutos",nl:"{h} uur en {m} minuten",sv:"{h} timmar och {m} minuter",da:"{h} timer og {m} minutter",no:"{h} timer og {m} minutter",fi:"{h} h {m} min"},
    ourTimes:       {en:"Our times",de:"Unsere Uhrzeiten",fr:"Nos horaires",it:"I nostri orari",es:"Nuestros horarios",pt:"Nossos horários",nl:"Onze tijden",sv:"Våra tider",da:"Vores tider",no:"Tidene våre",fi:"Meidän kellonajat"},
    addTime:        {en:"Save this time",de:"Diese Uhrzeit benennen",fr:"Enregistrer cette heure",it:"Dai un nome a quest’ora",es:"Guardar esta hora",pt:"Salvar esta hora com um nome",nl:"Deze tijd bewaren",sv:"Spara tiden",da:"Gem dette klokkeslæt som",no:"Gi dette klokkeslettet et navn",fi:"Tallenna tämä kellonaika"},
    timeLabelPh:    {en:"lunch, story time…",de:"Pause, Mittagessen, Vorlesen…",fr:"la cantine, la récré…",it:"mensa, ricreazione…",es:"recreo, comida, salida…",pt:"recreio, hora da história…",nl:"gym, voorlezen, fruit eten…",sv:"lunch, samling, rast…",da:"frokost, samling…",no:"lunsj, lesestund…",fi:"ruokailu, satuhetki…"},
    setOurTime:     {en:"{label} — set the clock to {time}.",de:"{label} — stell die Uhr auf {time}.",fr:"{label} — règle l’horloge sur {time}.",it:"{label} — fai segnare {time} all’orologio.",es:"{label} — pon el reloj en {time}.",pt:"{label} — coloque o relógio em {time}.",nl:"{label} — zet de klok op {time}.",sv:"{label} — ställ klockan på {time}.",da:"{label} — stil uret på {time}.",no:"{label} — still klokka på {time}.",fi:"{label} — näytä {time}."},
    deleteBtn:      {en:"Remove",de:"Entfernen",fr:"Supprimer",it:"Togli",es:"Quitar",pt:"Remover",nl:"Verwijderen",sv:"Ta bort",da:"Fjern",no:"Fjern",fi:"Poista"},
    closeBtn:       {en:"Close",de:"Schließen",fr:"Fermer",it:"Chiudi",es:"Cerrar",pt:"Fechar",nl:"Sluiten",sv:"Stäng",da:"Luk",no:"Lukk",fi:"Sulje"},
    savedFull:      {en:"That is twelve saved — remove one to add another.",de:"Zwölf Uhrzeiten sind gespeichert — entferne eine, um eine neue hinzuzufügen.",fr:"Il y a déjà douze horaires : retires-en un pour en ajouter un autre.",it:"Sono già dodici. Togline uno per aggiungerne un altro.",es:"Ya hay doce horarios guardados — quita uno para agregar otro.",pt:"Já são doze — remova uma para guardar outra.",nl:"Er staan er al twaalf — verwijder er een om een nieuwe te bewaren.",sv:"Tolv är sparade — ta bort en för att lägga till en ny.",da:"Der er tolv gemt — fjern ét, før du gemmer et nyt.",no:"Tolv er lagret — fjern en for å legge til en ny.",fi:"Tallennettuja aikoja on jo kaksitoista — poista yksi, niin voit lisätä uuden."},
    savedNeedName:  {en:"Give it a name first.",de:"Gib der Uhrzeit zuerst einen Namen.",fr:"Donne-lui d’abord un nom.",it:"Prima scrivi un nome.",es:"Primero ponle un nombre.",pt:"Primeiro, dê um nome.",nl:"Geef deze tijd eerst een naam.",sv:"Ge den ett namn först.",da:"Skriv først et navn.",no:"Skriv inn et navn først.",fi:"Kirjoita ensin nimi."},
    deVariantA:     {en:"Say “Viertel nach”",de:"„Viertel nach“ sagen",fr:"Dire « Viertel nach »",it:"Dire «Viertel nach»",es:"Decir «Viertel nach»",pt:"Dizer “Viertel nach”",nl:"“Viertel nach” zeggen",sv:"Säga ”Viertel nach”",da:"Sige »Viertel nach«",no:"Si «Viertel nach»",fi:"Sano ”Viertel nach”"},
    deVariantB:     {en:"Say “viertel drei”",de:"„viertel“ und „dreiviertel“ sagen",fr:"Dire « viertel drei »",it:"Dire «viertel drei»",es:"Decir «viertel drei»",pt:"Dizer “viertel drei”",nl:"“viertel drei” zeggen",sv:"Säga ”viertel drei”",da:"Sige »viertel drei«",no:"Si «viertel drei»",fi:"Sano ”viertel drei”"},
    setDigital:     {en:"Digital readout",de:"Digitalanzeige",fr:"Affichage numérique",it:"Ora in cifre",es:"Pantalla digital",pt:"Mostrador digital",nl:"Digitale weergave",sv:"Digital tid",da:"Digital visning",no:"Digital visning",fi:"Digitaalinäyttö"},
    digBoth:        {en:"Both",de:"Beide",fr:"Les deux",it:"Tutti e due",es:"12 y 24 horas",pt:"Ambos",nl:"Beide",sv:"Båda",da:"Begge",no:"Begge",fi:"Molemmat"},
    dig12:          {en:"12-hour",de:"12-Stunden",fr:"12 h",it:"12 ore",es:"12 horas",pt:"12 horas",nl:"12-uursnotatie",sv:"12-timmars",da:"12-timers",no:"12-timers",fi:"12-tuntinen"},
    dig24:          {en:"24-hour",de:"24-Stunden",fr:"24 h",it:"24 ore",es:"24 horas",pt:"24 horas",nl:"24-uursnotatie",sv:"24-timmars",da:"24-timers",no:"24-timers",fi:"24-tuntinen"},
    digOff:         {en:"Off",de:"Aus",fr:"Masqué",it:"Nascosto",es:"Oculta",pt:"Oculto",nl:"Uit",sv:"Av",da:"Fra",no:"Av",fi:"Pois"},
    minuteRing:     {en:"Minute numbers",de:"Minutenzahlen",fr:"Chiffres des minutes",it:"Numeri dei minuti",es:"Números de los minutos",pt:"Números dos minutos",nl:"Minuutgetallen",sv:"Minutsiffror",da:"Minuttal",no:"Minuttall",fi:"Minuuttinumerot"},
    ring24:         {en:"24-hour ring on the face",de:"24-Stunden-Ring auf dem Zifferblatt",fr:"Anneau des 24 h sur le cadran",it:"Anello delle 24 ore sul quadrante",es:"Anillo de 24 horas en la carátula",pt:"Anel de 24 horas no mostrador",nl:"24-uursring op de wijzerplaat",sv:"24-timmarsring på urtavlan",da:"24-timers ring på urskiven",no:"24-timersring på urskiva",fi:"24 tunnin rengas kellotaulussa"},
    setSpeakDrag:   {en:"Speak while dragging",de:"Beim Ziehen mitsprechen",fr:"Dire l’heure en déplaçant l’aiguille",it:"Dice l’ora mentre trascini",es:"Decir la hora al arrastrar",pt:"Falar a hora ao arrastar",nl:"Hardop zeggen tijdens het slepen",sv:"Säg tiden medan du drar",da:"Sig klokken, mens du trækker",no:"Les opp mens du drar",fi:"Sano aika myös vedettäessä"},
    gateGran:       {en:"The 1-minute step is part of the Teacher plan — hours, half hours, quarters and 5 minutes are always free.",de:"Der Ein-Minuten-Schritt gehört zum Lehrkraft-Abo — Stunden, halbe Stunden, Viertelstunden und 5 Minuten bleiben immer kostenlos.",fr:"Le pas d’une minute fait partie de l’offre Enseignant — heures pile, demi-heures, quarts d’heure et 5 minutes restent gratuits.",it:"Il passo di un minuto fa parte del piano Insegnante — ore, mezz’ore, quarti d’ora e 5 minuti restano gratuiti.",es:"El paso de un minuto es parte del plan Docente — horas, medias horas, cuartos de hora y 5 minutos son gratis siempre.",pt:"O passo de um minuto faz parte do plano Professor — horas, meias horas, quartos de hora e 5 minutos são sempre grátis.",nl:"De minuutstap hoort bij het Leerkracht-abonnement — hele en halve uren, kwartieren en 5 minuten blijven altijd gratis.",sv:"Minutsteget ingår i Lärarplanen — hela timmar, halvtimmar, kvartar och 5 minuter är alltid gratis.",da:"Minuttrinnet er en del af Lærerplanen — timer, halve timer, kvarter og 5 minutter er altid gratis.",no:"Minuttsteget er en del av Lærerplanen — timer, halvtimer, kvarter og 5 minutter er alltid gratis.",fi:"Yhden minuutin askel kuuluu Opettaja-tilaukseen — tasatunnit, puolitunnit, vartit ja viiden minuutin askel ovat aina ilmaisia."},
    gateTask:       {en:"The Practice mode is part of the Teacher plan.",de:"Das Üben gehört zum Lehrkraft-Abo.",fr:"Le mode Entraînement fait partie de l’offre Enseignant.",it:"La modalità Esercizi fa parte del piano Insegnante.",es:"El modo Practicar es parte del plan Docente.",pt:"As rodadas de prática fazem parte do plano Professor.",nl:"Oefenen hoort bij het Leerkracht-abonnement.",sv:"Övningarna ingår i Lärarplanen.",da:"Øveopgaverne er en del af Lærerplanen.",no:"Øvingsrundene er en del av Lærerplanen.",fi:"Harjoituskierrokset kuuluvat Opettaja-tilaukseen."},
    gateElapsed:    {en:"Working out how long is part of the Teacher plan.",de:"Zeitspannen gehören zum Lehrkraft-Abo.",fr:"Calculer une durée fait partie de l’offre Enseignant.",it:"La modalità «Quanto tempo?» fa parte del piano Insegnante.",es:"El modo «¿Cuánto tiempo?» es parte del plan Docente.",pt:"O modo “Quanto tempo?” faz parte do plano Professor.",nl:"“Hoe lang?” hoort bij het Leerkracht-abonnement.",sv:"Att mäta hur lång tid det tar ingår i Lärarplanen.",da:"At måle, hvor længe noget varer, er en del af Lærerplanen.",no:"«Hvor lenge?» er en del av Lærerplanen.",fi:"Kuinka kauan -osio kuuluu Opettaja-tilaukseen."},
    gateSaves:      {en:"Saving your class times is part of the Teacher plan.",de:"Eigene Uhrzeiten zu speichern gehört zum Lehrkraft-Abo.",fr:"Enregistrer les horaires de la classe fait partie de l’offre Enseignant.",it:"Salvare gli orari della classe fa parte del piano Insegnante.",es:"Guardar los horarios de la clase es parte del plan Docente.",pt:"Guardar os horários da turma faz parte do plano Professor.",nl:"De tijden van je klas bewaren hoort bij het Leerkracht-abonnement.",sv:"Att spara klassens tider ingår i Lärarplanen.",da:"At gemme klassens tider er en del af Lærerplanen.",no:"Å lagre klassens tider er en del av Lærerplanen.",fi:"Luokan aikojen tallentaminen kuuluu Opettaja-tilaukseen."},
    gatePrint:      {en:"The printable sheets are part of the Teacher plan.",de:"Die Zifferblätter zum Ausdrucken gehören zum Lehrkraft-Abo.",fr:"Les fiches à imprimer font partie de l’offre Enseignant.",it:"I quadranti da stampare fanno parte del piano Insegnante.",es:"Las carátulas para imprimir son parte del plan Docente.",pt:"As folhas para imprimir fazem parte do plano Professor.",nl:"De werkbladen om af te drukken horen bij het Leerkracht-abonnement.",sv:"Att skriva ut urtavlor ingår i Lärarplanen.",da:"Arbejdsark til print er en del af Lærerplanen.",no:"Utskriftsarkene er en del av Lærerplanen.",fi:"Tulostettavat kellotaulut kuuluvat Opettaja-tilaukseen."},
    unlock:         {en:"See the Teacher plan",de:"Zum Lehrkraft-Abo",fr:"Voir l’offre Enseignant",it:"Vedi il piano Insegnante",es:"Ver el plan Docente",pt:"Ver o plano Professor",nl:"Bekijk het Leerkracht-abonnement",sv:"Se Lärarplanen",da:"Se Lærerplanen",no:"Se Lærerplanen",fi:"Tutustu Opettaja-tilaukseen"},
    sheetDraw:      {en:"Draw the hands",de:"Zeichne die Zeiger ein.",fr:"Dessine les aiguilles",it:"Disegna le lancette",es:"Dibuja las manecillas",pt:"Desenhe os ponteiros",nl:"Teken de wijzers",sv:"Rita visarna",da:"Tegn viserne",no:"Tegn viserne",fi:"Piirrä viisarit"},
    sheetWrite:     {en:"Write the time",de:"Schreib die Uhrzeit auf.",fr:"Écris l’heure",it:"Scrivi l’ora",es:"Escribe la hora",pt:"Escreva a hora",nl:"Schrijf op hoe laat het is",sv:"Skriv vad klockan är",da:"Skriv klokkeslættet",no:"Skriv klokkeslettet",fi:"Kirjoita kellonaika"},
    sheetOurs:      {en:"Our times",de:"Unsere Uhrzeiten",fr:"Nos horaires",it:"I nostri orari",es:"Nuestros horarios",pt:"Nossos horários",nl:"Onze tijden",sv:"Våra tider",da:"Vores tider",no:"Tidene våre",fi:"Meidän kellonajat"},
    sheetCards:     {en:"Cards to cut out",de:"Karten zum Ausschneiden",fr:"Cartes à découper",it:"Carte da ritagliare",es:"Tarjetas para recortar",pt:"Cartões para recortar",nl:"Kaartjes om uit te knippen",sv:"Kort att klippa ut",da:"Kort til at klippe ud",no:"Kort du kan klippe ut",fi:"Leikattavat kortit"}
  },

  TIME_RULES: {
    /*__TR_en__*/ en: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:"{H} o'clock",5:'five past {H}',10:'ten past {H}',15:'quarter past {H}',20:'twenty past {H}',25:'twenty-five past {H}',30:'half past {H}',35:'twenty-five to {N}',40:'twenty to {N}',45:'quarter to {N}',50:'ten to {N}',55:'five to {N}'}, formal:{tpl:'{HW} {M#}',zero:"{HW} o'clock",low:'{HW} oh {M#}'}, specials:[] },
    /*__TR_de__*/ de: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:'{H} Uhr',5:'fünf nach {H}',10:'zehn nach {H}',15:'Viertel nach {H}',20:'zwanzig nach {H}',25:'fünf vor halb {N}',30:'halb {N}',35:'fünf nach halb {N}',40:'zwanzig vor {N}',45:'Viertel vor {N}',50:'zehn vor {N}',55:'fünf vor {N}'}, overlays:{deQuarter:{15:'viertel {N}',45:'dreiviertel {N}'}}, formal:{tpl:'{HW} Uhr {M#}',zero:'{HW} Uhr'}, specials:[] },
    /*__TR_fr__*/ fr: { hourWords:['une heure','deux heures','trois heures','quatre heures','cinq heures','six heures','sept heures','huit heures','neuf heures','dix heures','onze heures','midi'], hourWordsAlt:null, positions:{0:'{H}',5:'{H} cinq',10:'{H} dix',15:'{H} et quart',20:'{H} vingt',25:'{H} vingt-cinq',30:'{H} et demie',35:'{N} moins vingt-cinq',40:'{N} moins vingt',45:'{N} moins le quart',50:'{N} moins dix',55:'{N} moins cinq'}, formal:{tpl:'{H} {M#}',zero:'{H}'}, specials:[{h:12,m:30,text:'midi et demi'}] },
    /*__TR_it__*/ it: { hourWords:['l\'una','le due','le tre','le quattro','le cinque','le sei','le sette','le otto','le nove','le dieci','le undici','mezzogiorno'], hourWordsAlt:null, positions:{0:'{H}',5:'{H} e cinque',10:'{H} e dieci',15:'{H} e un quarto',20:'{H} e venti',25:'{H} e venticinque',30:'{H} e mezza',35:'{N} meno venticinque',40:'{N} meno venti',45:'{N} meno un quarto',50:'{N} meno dieci',55:'{N} meno cinque'}, formal:{tpl:'{H} e {M#}',zero:'{H}'}, specials:[{h:12,m:30,text:'mezzogiorno e mezzo'}] },
    /*__TR_es__*/ es: { hourWords:['la una','las dos','las tres','las cuatro','las cinco','las seis','las siete','las ocho','las nueve','las diez','las once','las doce'], hourWordsAlt:null, positions:{0:'{H} en punto',5:'{H} y cinco',10:'{H} y diez',15:'{H} y cuarto',20:'{H} y veinte',25:'{H} y veinticinco',30:'{H} y media',35:'veinticinco para {N}',40:'veinte para {N}',45:'un cuarto para {N}',50:'diez para {N}',55:'cinco para {N}'}, formal:{tpl:'{H} {M#}',zero:'{H} en punto',low:'{H} cero {M#}'}, specials:[] },
    /*__TR_pt__*/ pt: { hourWords:['uma','duas','três','quatro','cinco','seis','sete','oito','nove','dez','onze','meio-dia'], hourWordsAlt:['a uma','as duas','as três','as quatro','as cinco','as seis','as sete','as oito','as nove','as dez','as onze','o meio-dia'], positions:{0:'{H} horas',5:'{H} e cinco',10:'{H} e dez',15:'{H} e quinze',20:'{H} e vinte',25:'{H} e vinte e cinco',30:'{H} e meia',35:'vinte e cinco para {N2}',40:'vinte para {N2}',45:'quinze para {N2}',50:'dez para {N2}',55:'cinco para {N2}'}, formal:{tpl:'{H} e {M#}',zero:'{H} horas'}, specials:[{h:1,m:0,text:'uma hora'},{h:12,m:0,text:'meio-dia'}] },
    /*__TR_nl__*/ nl: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['een','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf','twaalf'], positions:{0:'{H} uur',5:'vijf over {H}',10:'tien over {H}',15:'kwart over {H}',20:'tien voor half {N}',25:'vijf voor half {N}',30:'half {N}',35:'vijf over half {N}',40:'tien over half {N}',45:'kwart voor {N}',50:'tien voor {N}',55:'vijf voor {N}'}, formal:{tpl:'{HW} uur {M#}',zero:'{HW} uur'}, specials:[] },
    /*__TR_sv__*/ sv: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:null, positions:{0:'{H}',5:'fem över {H}',10:'tio över {H}',15:'kvart över {H}',20:'tjugo över {H}',25:'fem i halv {N}',30:'halv {N}',35:'fem över halv {N}',40:'tjugo i {N}',45:'kvart i {N}',50:'tio i {N}',55:'fem i {N}'}, formal:{tpl:'{HW} och {M#}',zero:'klockan {HW}',low:'{HW} noll {M#}'}, specials:[] },
    /*__TR_da__*/ da: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['et','to','tre','fire','fem','seks','syv','otte','ni','ti','elleve','tolv'], positions:{0:'klokken {H}',5:'fem over {H}',10:'ti minutter over {H}',15:'kvart over {H}',20:'ti i halv {N2}',25:'fem i halv {N}',30:'halv {N}',35:'fem over halv {N}',40:'ti over halv {N2}',45:'kvart i {N}',50:'ti i {N}',55:'fem i {N}'}, formal:{tpl:'{HW} {M#}',zero:'klokken {HW}',low:'{HW} nul {M#}'}, specials:[] },
    /*__TR_no__*/ no: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['ett','to','tre','fire','fem','seks','sju','åtte','ni','ti','elleve','tolv'], positions:{0:'klokka {H}',5:'fem over {H}',10:'ti over {H}',15:'kvart over {H}',20:'ti på halv {N}',25:'fem på halv {N}',30:'halv {N}',35:'fem over halv {N}',40:'ti over halv {N}',45:'kvart på {N}',50:'ti på {N}',55:'fem på {N}'}, formal:{tpl:'{HW} {M#}',zero:'klokka {HW}',low:'{HW} null {M#}'}, specials:[] },
    /*__TR_fi__*/ fi: { hourWords:['1','2','3','4','5','6','7','8','9','10','11','12'], hourWordsAlt:['yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän','kymmenen','yksitoista','kaksitoista'], hourWordsAlt2:['yhtä','kahta','kolmea','neljää','viittä','kuutta','seitsemää','kahdeksaa','yhdeksää','kymmentä','yhtätoista','kahtatoista'], positions:{0:'kello {H}',5:'viisi yli {H2}',10:'kymmenen yli {H2}',15:'vartti yli {H2}',20:'kymmentä vaille puoli {N2}',25:'viittä vaille puoli {N2}',30:'puoli {N}',35:'viisi yli puoli {N2}',40:'kymmenen yli puoli {N2}',45:'varttia vaille {N2}',50:'kymmentä vaille {N2}',55:'viittä vaille {N2}'}, formal:{tpl:'{HW} {M#}',zero:'kello {HW}',low:'{HW} nolla {M#}'}, specials:[] },
  },

  /* byte-faithful copy of the number-word composers (0-59 used here for
     the FORMAL register) — spliced at build time. */
  NUM_WORDS_HELPERS: {
    en: function (n, mode) {
      /* 0-19 lookup; 20-99 = tens-word + "-" + ones-word (or tens-word
         alone when ones===0). 100-999 = ones-word + "hundred" + " " +
         sub99(remainder) — US Common Core convention with NO "and"
         between hundreds and tens (305 = "three hundred five", NOT
         "three hundred and five"). Round hundreds: 200 = "two hundred".
         Zero-tens: 305 = "three hundred five". Zero-ones: 420 = "four
         hundred twenty". mode is ignored (cardinal===attributive). */
      var ones = ['zero','one','two','three','four','five','six','seven','eight','nine',
                  'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
      var tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
      function sub99(m) {
        if (m < 20) return ones[m];
        var t = Math.floor(m / 10), o = m % 10;
        return (o === 0) ? tens[t] : (tens[t] + '-' + ones[o]);
      }
      if (n < 100) return sub99(n);
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = ones[h] + ' hundred';
      if (rem === 0) return hPart;
      return hPart + ' ' + sub99(rem);
    },
    de: function (n, mode) {
      /* German 0-999. 0-99 units-first compound (einundzwanzig = 1 +
         und + 20) — BYTE-IDENTICAL to prior shipped (load-bearing for
         the LIVE 1.NBT.B.2 DE tens-and-ones activity at /de/activities/
         zehner-und-einer; the existing logic is preserved verbatim
         under `if (n < 100)` guard).

         100-999 NEW layer (2.NBT.A.1 activity 2 DE fan-out):
         <ones-attributive>hundert + agglutinated 0-99 tail as a single
         word (zweihundertsiebenundvierzig). Classroom convention:
         100 = "einhundert" (NOT colloquial bare "hundert"); 101 =
         "einhunderteins" (cardinal `eins` at ones-only tail position,
         not attributive `ein`); 305 = "dreihundertfünf" (zero-tens
         skipped, no `null` inserted); 420 = "vierhundertzwanzig"
         (zero-ones, ends on tens-word). */
      var onesCard = ['null','eins','zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var onesAttr = ['null','ein', 'zwei','drei','vier','fünf','sechs','sieben','acht','neun'];
      var teens    = ['zehn','elf','zwölf','dreizehn','vierzehn','fünfzehn','sechzehn','siebzehn','achtzehn','neunzehn'];
      var tens     = ['','','zwanzig','dreißig','vierzig','fünfzig','sechzig','siebzig','achtzig','neunzig'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? onesAttr[n] : onesCard[n];
        if (n < 20) return teens[n - 10];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return onesAttr[o] + 'und' + tens[t];  // e.g. einundzwanzig
      }
      /* 100-999 layer */
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = onesAttr[h] + 'hundert';     // ein/zwei/.../neun + hundert
      if (rem === 0) return hPart;             // 200 → zweihundert
      if (rem < 10) return hPart + onesCard[rem];     // 305 → dreihundertfünf, 101 → einhunderteins
      if (rem < 20) return hPart + teens[rem - 10];   // 215 → zweihundertfünfzehn
      var t2 = Math.floor(rem / 10), o2 = rem % 10;
      if (o2 === 0) return hPart + tens[t2];          // 420 → vierhundertzwanzig
      return hPart + onesAttr[o2] + 'und' + tens[t2]; // 247 → zweihundertsiebenundvierzig
    },
    es: function (n, mode) {
      /* Spanish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 ES tens-and-ones activity at /es/activities/
         decenas-y-unidades; existing logic preserved verbatim under
         `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 ES fan-out:
         - n=100 → "cien" (standalone form; NOT "ciento")
         - n=101-199 → "ciento " + sub99(rem) (space-separated)
         - n=200-999 → hundreds[h] + (rem ? " " + sub99(rem) : "")
         - hundreds[2..9]: doscientos, trescientos, cuatrocientos,
           QUINIENTOS (irregular 500, NOT cincocientos), seiscientos,
           SETECIENTOS (irregular 700, NOT sietecientos), ochocientos,
           NOVECIENTOS (irregular 900, NOT nuevecientos)
         - "y" appears ONLY inside sub99 between tens and units
           (existing rule). NEVER between hundreds and tens:
           305 = "trescientos cinco", NOT "trescientos y cinco". */
      var lookup = [
        'cero','uno','dos','tres','cuatro','cinco','seis','siete','ocho','nueve',
        'diez','once','doce','trece','catorce','quince',
        'dieciséis','diecisiete','dieciocho','diecinueve',
        'veinte','veintiuno','veintidós','veintitrés','veinticuatro',
        'veinticinco','veintiséis','veintisiete','veintiocho','veintinueve'
      ];
      var attrFem = ['cero','una','dos','tres','cuatro','cinco','seis','siete','ocho','nueve'];
      var tens = ['','','veinte','treinta','cuarenta','cincuenta','sesenta','setenta','ochenta','noventa'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 30) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + ' y ' + lookup[o];  // e.g. cuarenta y siete
      }
      /* 100-999 layer */
      if (n === 100) return 'cien';
      var hundredsBare = ['','ciento','doscientos','trescientos','cuatrocientos','quinientos','seiscientos','setecientos','ochocientos','novecientos'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = hundredsBare[h];
      if (rem === 0) return hPart;
      /* sub99 inline — cardinal-form tail; "y" between tens and units */
      function sub99(m) {
        if (m < 30) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + ' y ' + lookup[o2];
      }
      return hPart + ' ' + sub99(rem);
    },
    it: function (n, mode) {
      /* Italian 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 IT activity at /it/activities/decine-e-unita;
         existing logic — ventuno/ventotto vowel-elision + tré grave-accent
         in compound — preserved verbatim under `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 IT fan-out:
         - n=100 → "cento" (standalone)
         - n=200-900 round → multiplier + "cento": duecento, trecento,
           ..., novecento. cento INVARIANT (NEVER "duecenti").
         - n=101-999 compound → hundreds-word + sub99(rem) AGGLUTINATED
           with VOWEL ELISION at cento boundary when sub99 starts with
           'o' or 'u':
             cento + uno → centuno
             cento + otto → centotto
             cento + ottanta → centottanta
             cinquecento + ottantatré → cinquecentottantatré
           No elision when sub99 starts with consonant or other vowel:
             cento + due → centodue
             cento + venti → centoventi (no cento elision; internal
             ventuno/ventotto elision preserved in sub99). */
      var lookup = [
        'zero','uno','due','tre','quattro','cinque','sei','sette','otto','nove',
        'dieci','undici','dodici','tredici','quattordici','quindici',
        'sedici','diciassette','diciotto','diciannove'
      ];
      var attrFem = ['zero','una','due','tre','quattro','cinque','sei','sette','otto','nove'];
      var tens = ['','','venti','trenta','quaranta','cinquanta','sessanta','settanta','ottanta','novanta'];
      /* Compound-position ones forms: same as standalone except 3 → 'tré'. */
      var onesForCompound = ['','uno','due','tré','quattro','cinque','sei','sette','otto','nove'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        var tensStr = tens[t];
        if (o === 1 || o === 8) tensStr = tensStr.slice(0, -1);  // elision: ventuno, ventotto
        return tensStr + onesForCompound[o];
      }
      /* 100-999 layer */
      var hundredsMul = ['','','due','tre','quattro','cinque','sei','sette','otto','nove'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'cento' : hundredsMul[h] + 'cento';
      if (rem === 0) return hWord;
      /* sub99 inline — cardinal-form tail with internal ventuno/ventotto
         elision + tré grave-accent preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        var tensStr2 = tens[t2];
        if (o2 === 1 || o2 === 8) tensStr2 = tensStr2.slice(0, -1);
        return tensStr2 + onesForCompound[o2];
      }
      var tail = sub99(rem);
      /* Cento elision: drop final 'o' of hundreds-word when tail starts
         with 'o' or 'u' (cento+uno → centuno; cento+ottanta → centottanta;
         cinquecento+ottantatré → cinquecentottantatré). */
      var first = tail.charAt(0);
      if (first === 'o' || first === 'u') {
        hWord = hWord.slice(0, -1);
      }
      return hWord + tail;
    },
    fr: function (n, mode) {
      /* French 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 FR activity at /fr/activities/dizaines-
         et-unites; existing vigesimal 70s/80s/90s + "et un" at 21/31/…/
         71 + soixante-et-onze + quatre-vingts -s at exactly 80 logic
         preserved verbatim under `if (n < 100)` guard).

         100-999 NEW layer for 2.NBT.A.1 activity 2 FR fan-out — the
         TWO -s rules colliding:
         - n=100 → "cent" (bare, no multiplier, no -s)
         - n=200-900 round → multiplier + "cents" WITH -s (multiplied
           AND final): "deux cents", "cinq cents", "neuf cents"
         - n=201-999 non-final → multiplier + "cent" DROPS -s
           (multiplied but non-final): "deux cent quarante-sept",
           "trois cent cinq", "trois cent quatre-vingts" (cent drops;
           quatre-vingts keeps via sub99's own rule), "trois cent
           quatre-vingt-deux" (both drop)
         - "et" join preserved inside sub99 only (cent vingt et un = 121,
           deux cent soixante et onze = 271; NO "et" at 81/91 even in
           hundreds frame: quatre-vingt-un, quatre-vingt-onze) */
      var lookup = [
        'zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf',
        'dix','onze','douze','treize','quatorze','quinze','seize',
        'dix-sept','dix-huit','dix-neuf'
      ];
      var attrFem = ['zéro','une','deux','trois','quatre','cinq','six','sept','huit','neuf'];
      var tens20to60 = ['','','vingt','trente','quarante','cinquante','soixante'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (t >= 2 && t <= 6) {
          /* 20-69 */
          if (o === 0) return tens20to60[t];
          if (o === 1) return tens20to60[t] + ' et un';
          return tens20to60[t] + '-' + lookup[o];
        }
        if (t === 7) {
          /* 70-79 = soixante + (10..19); "soixante et onze" at 71 */
          if (o === 0) return 'soixante-dix';
          if (o === 1) return 'soixante et onze';
          return 'soixante-' + lookup[10 + o];
        }
        if (t === 8) {
          /* 80 = "quatre-vingts" with -s; 81-89 = "quatre-vingt-" + ones (no -s, no "et") */
          if (o === 0) return 'quatre-vingts';
          return 'quatre-vingt-' + lookup[o];
        }
        /* t === 9: 90-99 = "quatre-vingt-" + (10..19), NO "et" */
        if (o === 0) return 'quatre-vingt-dix';
        return 'quatre-vingt-' + lookup[10 + o];
      }
      /* 100-999 layer */
      /* Inline sub99 for the tail — cardinal mode only. Replicates the
         0-99 logic above (no attributive-fem needed in compound
         position; gender-invariant cardinal). The vigesimal -s rule at
         exactly 80 emerges naturally: sub99(80)="quatre-vingts" with
         -s; sub99(82)="quatre-vingt-deux" without. This drives 380
         vs 382 distinction inside the hundreds frame. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (t2 >= 2 && t2 <= 6) {
          if (o2 === 0) return tens20to60[t2];
          if (o2 === 1) return tens20to60[t2] + ' et un';
          return tens20to60[t2] + '-' + lookup[o2];
        }
        if (t2 === 7) {
          if (o2 === 0) return 'soixante-dix';
          if (o2 === 1) return 'soixante et onze';
          return 'soixante-' + lookup[10 + o2];
        }
        if (t2 === 8) {
          if (o2 === 0) return 'quatre-vingts';
          return 'quatre-vingt-' + lookup[o2];
        }
        if (o2 === 0) return 'quatre-vingt-dix';
        return 'quatre-vingt-' + lookup[10 + o2];
      }
      var hMul = ['','','deux','trois','quatre','cinq','six','sept','huit','neuf'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord;
      if (h === 1) {
        hWord = 'cent';  // bare; no multiplier, no -s
      } else {
        /* h ≥ 2: multiplier + cent/cents. Rule: -s ONLY when rem === 0
           (multiplied AND final). Drop -s when rem > 0 (multiplied but
           non-final — tail follows). */
        hWord = hMul[h] + ' cent' + (rem === 0 ? 's' : '');
      }
      if (rem === 0) return hWord;
      return hWord + ' ' + sub99(rem);
    },
    pt: function (n, mode) {
      /* Brazilian Portuguese ('pt' canonical per CLAUDE.md §6; NEVER
         pt-BR). 0-99 BYTE-IDENTICAL to prior shipped (load-bearing for
         the LIVE 1.NBT.B.2 PT activity at /pt/activities/dezenas-e-
         unidades; existing BR forms preserved verbatim under `if (n <
         100)` guard: dezesseis/dezessete/dezenove + cinquenta/setenta
         + feminine duas at count=2).

         100-999 NEW layer for 2.NBT.A.1 activity 2 PT fan-out:
         - n=100 → "cem" (standalone)
         - n=101-199 → "cento e " + sub99(rem) (BR "e"-connector)
         - n=200-999 → hundreds[h] + (rem ? " e " + sub99(rem) : "")
         - hundreds[2..9] BR-canonical: duzentos, trezentos,
           quatrocentos, QUINHENTOS (irregular 500), seiscentos,
           SETECENTOS (irregular 700), oitocentos, NOVECENTOS
           (irregular 900) — distinct from ES doscientos/trescientos/
           cuatrocientos/quinientos/etc.
         - "e" appears BETWEEN hundreds and tail (BR-specific; ES omits
           "y" there): 305 = "trezentos e cinco". Internal "e" inside
           sub99 stays between tens and units. So 247 = "duzentos e
           quarenta e sete" (two "e"s). */
      var lookup = [
        'zero','um','dois','três','quatro','cinco','seis','sete','oito','nove',
        'dez','onze','doze','treze','quatorze','quinze',
        'dezesseis','dezessete','dezoito','dezenove'
      ];
      var attrFem = ['zero','uma','duas','três','quatro','cinco','seis','sete','oito','nove'];
      var tens = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive-fem') ? attrFem[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + ' e ' + lookup[o];  // e.g. quarenta e sete; setenta e dois
      }
      /* 100-999 layer */
      if (n === 100) return 'cem';
      var hundredsBare = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];
      var h = Math.floor(n / 100), rem = n % 100;
      var hPart = hundredsBare[h];
      if (rem === 0) return hPart;
      /* sub99 inline — cardinal-form tail; internal "e" between
         tens and units preserved (47 → "quarenta e sete"). */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + ' e ' + lookup[o2];
      }
      return hPart + ' e ' + sub99(rem);  // BR "e"-connector between hundreds and tail
    },
    nl: function (n, mode) {
      /* Dutch 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 NL activity at /nl/activities/tientallen-
         en-eenheden; existing units-first compound + trema "ën" at
         ones=2/3 + accented "één" at attributive 1 logic preserved
         verbatim under `if (n < 100)` guard).

         Standard Dutch. 0-12 direct lookup; 13-19 irregular teens with
         morphological stems (dertien/veertien). Tens 20-90 with irregular
         forms (dertig/veertig/tachtig). 20-99: units-first compound
         <onesForCompound> + connector + <tens-word> where connector is
         "ën" (TREMA) when ones is 2 or 3, else plain "en". The trema
         marks vowel-collision: twee+en→tweeën (two syllables); without
         trema "tweeen" could misread as a digraph.
         attributive: 1→"één" (with acute accents) to disambiguate from
         indefinite article "een" (which means "a/an"). K-1 readers benefit
         from the visual disambiguator before noun.

         100-999 NEW layer for 2.NBT.A.1 activity 2 NL fan-out:
         - n=100 → "honderd" (bare; K-1 classroom standard; "éénhonderd"
           is formal/archaic, not emitted)
         - n=101-199 → "honderd" + sub99(rem) (agglutinated; 101 →
           "honderdeen", 121 → "honderdeenentwintig", 122 →
           "honderdtweeëntwintig" with trema preserved)
         - n=200-999 → onesForCompound[h] + "honderd" + (rem ? sub99(rem) : "")
           — honderd INVARIANT (NEVER "honderden"). Examples:
             200 = tweehonderd
             247 = tweehonderdzevenenveertig
             305 = driehonderdvijf (zero-tens; NO "nul" inserted in cardinal)
             420 = vierhonderdtwintig (zero-ones; tens-only tail)
             583 = vijfhonderddrieëntachtig (trema at ones=3 preserved)
             906 = negenhonderdzes
             999 = negenhonderdnegenennegentig */
      var lookup = [
        'nul','een','twee','drie','vier','vijf','zes','zeven','acht','negen',
        'tien','elf','twaalf','dertien','veertien','vijftien','zestien',
        'zeventien','achttien','negentien'
      ];
      var attr = ['nul','één','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      var tens = ['','','twintig','dertig','veertig','vijftig','zestig','zeventig','tachtig','negentig'];
      var onesForCompound = ['','een','twee','drie','vier','vijf','zes','zeven','acht','negen'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        var joinPart = (o === 2 || o === 3) ? 'ën' : 'en';  // trema when ones is 2 or 3
        return onesForCompound[o] + joinPart + tens[t];  // e.g. tweeëntwintig, zevenenveertig
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, units-first with trema preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        var joinPart2 = (o2 === 2 || o2 === 3) ? 'ën' : 'en';
        return onesForCompound[o2] + joinPart2 + tens[t2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'honderd' : onesForCompound[h] + 'honderd';
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated; no joiner
    },
    sv: function (n, mode) {
      /* Swedish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 SV activity at /sv/activities/tiotal-och-
         ental; existing tens-first compound + irregular fyrtio/sjuttio +
         ett-at-1 logic preserved verbatim under `if (n < 100)` guard).

         Swedish. 0-19 lookup; 20-99 = tens-first concat (no space, no
         joiner). Tens-words have IRREGULAR forms (load-bearing):
           fyrtio (NOT fyratio — 40)
           sjuttio (NOT sjutio — 70)
         attributive: 1→"ett" (neuter form before neuter nouns tiotal/
         ental/hundratal). Cardinal[1] also "ett" (locked as Swedish K-1
         counting default; "en" is the common-gender variant, not
         emitted here).

         100-999 NEW layer for 2.NBT.A.1 activity 2 SV fan-out:
         - n=100 → "hundra" (bare; K-1 classroom standard; "etthundra"
           is formal/numerical, not emitted)
         - n=101-199 → "hundra" + sub99(rem) (agglutinated; 101 →
           "hundraett", 121 → "hundratjugoett", 147 → "hundrafyrtiosju")
         - n=200-999 → onesForCompound[h] + "hundra" + (rem ? sub99(rem) : "")
           — hundra INVARIANT (NEVER "hundror"). Examples:
             200 = tvåhundra
             247 = tvåhundrafyrtiosju (irregular fyrtio preserved)
             305 = trehundrafem (zero-tens; NO "noll" inserted in cardinal)
             420 = fyrahundratjugo (zero-ones; tens-only tail)
             583 = femhundraåttiotre (irregular åttio preserved)
             906 = niohundrasex
             999 = niohundranittionio */
      var lookup = [
        'noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio',
        'tio','elva','tolv','tretton','fjorton','femton','sexton',
        'sjutton','arton','nitton'
      ];
      var attr = ['noll','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];
      var tens = ['','','tjugo','trettio','fyrtio','femtio','sextio','sjuttio','åttio','nittio'];
      /* onesForCompound: ones-multiplier for hundreds layer. Swedish
         doesn't drop "ett" at sub-100 compound boundaries the way some
         Germanic locales do, but at n=100 standalone canonical Swedish
         emits bare "hundra" (not "etthundra"); so onesForCompound[1] is
         unused for hundreds construction (n=100 is handled by hWord
         shortcut). */
      var onesForCompound = ['','ett','två','tre','fyra','fem','sex','sju','åtta','nio'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // e.g. fyrtiosju, sjuttiotvå, åttionio
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, tens-first agglutinated. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundra' : onesForCompound[h] + 'hundra';
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated; no joiner
    },
    fi: function (n, mode) {
      /* Finnish 0-999 (Uralic; not Indo-European). 0-99 BYTE-IDENTICAL
         to prior shipped (load-bearing for the LIVE 1.NBT.B.2 FI
         activity at /fi/activities/kymmenet-ja-ykkoset; agglutinated
         tens-first compound + -toista teens + nolla-at-0 + kymmenen
         cardinal-10 logic preserved verbatim under `if (n < 100)`
         guard).

         Finnish. 0-19 lookup; 20-99 = AGGLUTINATED compound (tens-
         first, single word, no joiner, no space). Teens 11-19 use
         "-toista" suffix (yksitoista, kaksitoista, ...,
         yhdeksäntoista). Tens 20-90: Xkymmentä (kaksikymmentä 20, ...,
         yhdeksänkymmentä 90). Compound 21-99 is single agglutinated
         word: tens[t] + lookup[o] without space (neljäkymmentä-
         seitsemän 47, seitsemänkymmentäkaksi 72, kahdeksankymmentä-
         yhdeksän 89, yhdeksänkymmentäyhdeksän 99). Cardinal[10] =
         "kymmenen" — the genitive form of the noun "kymmen" functions
         as the standalone cardinal "10" in Finnish. Attributive mode:
         same as cardinal lookup for the number-word itself. Finnish
         has no gender — the number-word doesn't change form for
         attributive use. What CHANGES is the case of the COUNTED NOUN
         (nominative sg at 1, partitive sg at 0 or 2+) — that case-
         switch lives in speakDecomposition, not here.

         100-999 NEW layer for 2.NBT.A.1 activity 2 FI fan-out:
         - n=100 → "sata" (bare nominative; K-1 classroom standard;
           "yksisataa" with multiplier-1 is formal/redundant, not emitted)
         - n=101-199 → "sata" + sub99(rem) (agglutinated single word;
           101 → "satayksi", 110 → "satakymmenen", 147 →
           "sataneljäkymmentäseitsemän")
         - n=200-999 → onesForCompound[h] + "sataa" + (rem ? sub99(rem) : "")
           — multiplier governs partitive `sataa` inside cardinal
           (Finnish 2+ governs partitive). Agglutinated single word.
           Examples:
             200 = kaksisataa
             247 = kaksisataaneljäkymmentäseitsemän
             305 = kolmesataaviisi (zero-tens; NO "nolla" inserted)
             420 = neljäsataakaksikymmentä (zero-ones; tens-only tail)
             583 = viisisataakahdeksankymmentäkolme
             906 = yhdeksänsataakuusi
             999 = yhdeksänsataayhdeksänkymmentäyhdeksän */
      var lookup = [
        'nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän',
        'kymmenen','yksitoista','kaksitoista','kolmetoista','neljätoista','viisitoista','kuusitoista',
        'seitsemäntoista','kahdeksantoista','yhdeksäntoista'
      ];
      var attr = ['nolla','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
      var tens = ['','','kaksikymmentä','kolmekymmentä','neljäkymmentä','viisikymmentä','kuusikymmentä','seitsemänkymmentä','kahdeksankymmentä','yhdeksänkymmentä'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "sata" (not "yksisataa"), so onesForCompound[1] is unused
         for hundreds construction (handled by hWord shortcut). For
         h=2..9, bare cardinal multiplier prepends to partitive "sataa". */
      var onesForCompound = ['','yksi','kaksi','kolme','neljä','viisi','kuusi','seitsemän','kahdeksan','yhdeksän'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // agglutinated: neljäkymmentäseitsemän, kahdeksankymmentäyhdeksän
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, agglutinated tens-first; partitive `kymmentä` inside tens-word preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'sata' : onesForCompound[h] + 'sataa';  // n=100 bare nominative; n=200+ multiplier+partitive
      if (rem === 0) return hWord;
      return hWord + sub99(rem);  // agglutinated single word (no joiner)
    },
    no: function (n, mode) {
      /* Norwegian Bokmål 0-999. 0-99 BYTE-IDENTICAL to prior shipped
         (load-bearing for the LIVE 1.NBT.B.2 NO activity at
         /no/activities/tiere-og-enere; modern post-1951 tens-first
         concat + irregular ø/å tens-words + acute én-at-1 + sju-
         preferred logic preserved verbatim under `if (n < 100)` guard).

         Norwegian Bokmål. 0-19 lookup; 20-99 = TENS-FIRST concat (no
         space, no joiner; modern post-1951 reform; mirrors SV pattern;
         OPPOSITE of DA's ones-first compound).
         Tens-words 20-90 IRREGULAR (load-bearing Norwegian-specific):
           tjue    (20; NOT pre-1951 "tyve" which is DA's form)
           tretti  (30; NOT pre-1951 "tredve")
           førti   (40; ø vowel — irregular)
           femti
           seksti
           sytti
           åtti    (80; å vowel — irregular)
           nitti
         "sju" preferred over "syv" per modern K-1 Bokmål convention.
         attributive: 1 → "én" with acute accent (K-1 emphatic form
         before noun, distinguishes from indefinite article "en").
         Cardinal[1] also "én". Compound examples: 21=tjueén,
         47=førtisju, 72=syttito, 89=åttini, 99=nittini.

         100-999 NEW layer for 2.NBT.A.1 activity 2 NO fan-out:
         - n=100 → "hundre" (bare; K-1 classroom standard; "etthundre"
           is formal/numerical, not emitted)
         - n=101-199 → "hundreog" + sub99(rem) (Bokmål agglutinated-with-
           og convention; 101 → "hundreogén", 147 → "hundreogførtisju")
         - n=200-999 → onesForCompound[h] + "hundre" + (rem ? "og" + sub99(rem) : "")
           — `hundre` is the cardinal hundreds-word, agglutinated to
           ones-multiplier (tohundre, trehundre, firehundre, ...,
           nihundre). NEVER pluralizes to "hundrer" inside cardinal
           (hundrer is the place-unit-noun singular reserved for column/
           decomp). Bokmål joins hundreds to tail with agglutinated "og"
           forming ONE orthographic word (DISTINCT from DA's spaced
           " og " convention). Examples:
             200 = tohundre
             247 = tohundreogførtisju (modern førti+sju tens-first)
             305 = trehundreogfem (zero-tens; "og"-join with bare-5)
             420 = firehundreogtjue (zero-ones; "og"-join with tens-only)
             583 = femhundreogåttitre (modern åtti=80, NOT DA firs)
             906 = nihundreogseks
             999 = nihundreognittini (modern nitti=90, NOT DA halvfems) */
      var lookup = [
        'null','én','to','tre','fire','fem','seks','sju','åtte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['null','én','to','tre','fire','fem','seks','sju','åtte','ni'];
      var tens = ['','','tjue','tretti','førti','femti','seksti','sytti','åtti','nitti'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "hundre" (not "etthundre" — kid-natural K-1), so
         onesForCompound[1] is unused for hundreds construction
         (handled by hWord shortcut). */
      var onesForCompound = ['','én','to','tre','fire','fem','seks','sju','åtte','ni'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return tens[t] + lookup[o];  // tens-first concat: førtisju, syttito, åttini
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, tens-first agglutinated; modern tens preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return tens[t2] + lookup[o2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundre' : onesForCompound[h] + 'hundre';
      if (rem === 0) return hWord;
      return hWord + 'og' + sub99(rem);  // agglutinated-with-og (single orthographic word per Bokmål convention)
    },
    da: function (n, mode) {
      /* Danish 0-999. 0-99 BYTE-IDENTICAL to prior shipped (load-bearing
         for the LIVE 1.NBT.B.2 DA activity at /da/activities/tiere-og-
         enere; vigesimal tens (halvtreds/tres/halvfjerds/firs/halvfems)
         + ones-first "og" compound + en-at-1 logic preserved verbatim
         under `if (n < 100)` guard. Strictest 0-99 preservation across
         the 11-locale set — DA has the most irregular sub-100 logic).

         Danish. 0-19 lookup; 20-99 = ONES-FIRST + "og" (and) + TENS-word
         compound (Germanic, like German "einundzwanzig").
         Tens-words 50/60/70/80/90 are VICESIMAL (base-20) — load-bearing
         irregulars rooted in Old Norse halv-tredje-sinds-tyve etc.:
           halvtreds (50 = 2.5 × 20)
           tres      (60 = 3   × 20)
           halvfjerds(70 = 3.5 × 20)
           firs      (80 = 4   × 20)
           halvfems  (90 = 4.5 × 20)
         Regular tens 20=tyve, 30=tredive, 40=fyrre.
         attributive: 1 → "en" (common-gender form before common-gender
         nouns tier / ener — both common gender, taking the "en" article).
         Cardinal[1] also "en" (locked as Danish K-1 default; "et" is the
         neuter variant, not emitted here for tier/ener). Compound
         examples: 21=enogtyve, 47=syvogfyrre, 50=halvtreds, 72=tooghalv-
         fjerds, 89=niogfirs, 90=halvfems, 99=niooghalvfems.

         100-999 NEW layer for 2.NBT.A.1 activity 2 DA fan-out:
         - n=100 → "hundrede" (bare; K-1 classroom standard; "ethundrede"
           is formal/numerical, not emitted)
         - n=101-199 → "hundrede og " + sub99(rem) (Danish "og"-join
           between hundreds-word and tail; 101 → "hundrede og en",
           147 → "hundrede og syvogfyrre" with vigesimal tens via sub99)
         - n=200-999 → onesForCompound[h] + "hundrede" + (rem ? " og " + sub99(rem) : "")
           — `hundrede` is the cardinal hundreds-word, agglutinated to
           ones-multiplier (tohundrede, trehundrede, firehundrede ...
           nihundrede). NEVER pluralizes to "hundreder" inside cardinal
           (hundreder is the place-unit-noun plural for column/decomp).
           DA joins hundreds to tail with explicit " og " (DISTINCT from
           DE's fully-agglutinated compound). Examples:
             200 = tohundrede
             247 = tohundrede og syvogfyrre
             305 = trehundrede og fem (zero-tens; bare-5 tail via "og")
             420 = firehundrede og tyve (zero-ones; tens-20 tail via "og")
             583 = femhundrede og treogfirs (VIGESIMAL firs=80 inside)
             906 = nihundrede og seks
             999 = nihundrede og niooghalvfems (VIGESIMAL halvfems=90) */
      var lookup = [
        'nul','en','to','tre','fire','fem','seks','syv','otte','ni',
        'ti','elleve','tolv','tretten','fjorten','femten','seksten',
        'sytten','atten','nitten'
      ];
      var attr = ['nul','en','to','tre','fire','fem','seks','syv','otte','ni'];
      var tens = ['','','tyve','tredive','fyrre','halvtreds','tres','halvfjerds','firs','halvfems'];
      /* onesForCompound: ones-multiplier for hundreds layer. n=100 is
         bare "hundrede" (not "ethundrede" — kid-natural K-1), so
         onesForCompound[1] is unused for hundreds construction (handled
         by hWord shortcut). */
      var onesForCompound = ['','en','to','tre','fire','fem','seks','syv','otte','ni'];
      if (n < 100) {
        if (n < 10) return (mode === 'attributive') ? attr[n] : lookup[n];
        if (n < 20) return lookup[n];
        var t = Math.floor(n / 10), o = n % 10;
        if (o === 0) return tens[t];
        return lookup[o] + 'og' + tens[t];  // ones-first: syvogfyrre, niogfirs, tooghalvfjerds
      }
      /* 100-999 layer */
      /* sub99 inline — cardinal-form tail, ones-first; vigesimal tens preserved. */
      function sub99(m) {
        if (m < 20) return lookup[m];
        var t2 = Math.floor(m / 10), o2 = m % 10;
        if (o2 === 0) return tens[t2];
        return lookup[o2] + 'og' + tens[t2];
      }
      var h = Math.floor(n / 100), rem = n % 100;
      var hWord = (h === 1) ? 'hundrede' : onesForCompound[h] + 'hundrede';
      if (rem === 0) return hWord;
      return hWord + ' og ' + sub99(rem);  // "og"-join between hundreds-word and tail
    }
  },

  /* sayTime(locale, h(1-12), m(0-59), opts{deQuarter}) → the spoken string */
  sayTime: function (loc, h, m, opts) {
    var R = this.TIME_RULES[loc] || this.TIME_RULES.en;
    opts = opts || {};
    h = ((h - 1) % 12 + 12) % 12 + 1;
    m = ((m % 60) + 60) % 60;
    /* specials first (exact h+m matches) */
    for (var i = 0; i < (R.specials || []).length; i++) {
      var sp = R.specials[i];
      if (sp.h === h && (sp.m === undefined || sp.m === m)) {
        if (sp.m !== undefined) return sp.text;
      }
    }
    if (m % 5 !== 0) return this._sayFormal(loc, h, m);
    var positions = R.positions;
    if (opts.deQuarter && R.overlays && R.overlays.deQuarter && R.overlays.deQuarter[m] !== undefined) {
      positions = {};
      for (var k in R.positions) positions[k] = R.positions[k];
      for (var k2 in R.overlays.deQuarter) positions[k2] = R.overlays.deQuarter[k2];
    }
    var tpl = positions[m];
    if (!tpl) return this._sayFormal(loc, h, m);
    var n = h % 12 + 1;
    var out = tpl;
    if (R.hourWordsAlt2) out = out.split('{N3}').join(R.hourWordsAlt2[n - 1]);
    if (R.hourWordsAlt) {
      out = out.split('{N2}').join(R.hourWordsAlt[n - 1]);
      out = out.split('{H2}').join(R.hourWordsAlt[h - 1]);
    } else {
      out = out.split('{N2}').join(R.hourWords[n - 1]);
      out = out.split('{H2}').join(R.hourWords[h - 1]);
    }
    out = out.split('{N}').join(R.hourWords[n - 1]);
    out = out.split('{H}').join(R.hourWords[h - 1]);
    return out;
  },
  _numWord: function (loc, n) {
    try {
      var fn = this.NUM_WORDS_HELPERS[loc] || this.NUM_WORDS_HELPERS.en;
      return fn(n, 'cardinal');
    } catch (_) { return String(n); }
  },
  _sayFormal: function (loc, h, m) {
    var R = this.TIME_RULES[loc] || this.TIME_RULES.en;
    var F = R.formal || { tpl: '{HW} {M#}', zero: '{HW}' };
    /* the HOUR word prefers the native hourWordsAlt list when present
       (no "klokka ett" never "én"; da "klokken et"; school registers the
       composers can't know) — minutes always come from the composers. */
    var hw = (R.hourWordsAlt && R.hourWordsAlt[h - 1]) || this._numWord(loc, h);
    if (m === 0) return F.zero.split('{HW}').join(hw).split('{H}').join(R.hourWords[h - 1]);
    var tpl = (m < 10 && F.low) ? F.low : F.tpl;
    return tpl
      .split('{HW}').join(hw)
      .split('{H}').join(R.hourWords[h - 1])
      .split('{M#}').join(this._numWord(loc, m));
  },

  /* =====================================================================
     GEOMETRY — a 1000x1000 viewBox, centre (500,500).
     The 200-unit box the shipped build used is why every useful weight
     was a decimal and a 1.4 stroke had nowhere to go; all four reference
     tools are W=1000.

     ⭐ THE RADII ARE THE POINTING CONTRACT, EXPRESSED AS GEOMETRY.
     Reading outward: hub · 24h ring (opt) · HOUR numerals · hour tip ·
     MINUTE numerals (opt) · minute tip · tick band · bezel.
     Each hand's tip sits just inside the ring it points at, so a child
     following a hand lands on that hand's own targets and nothing else.
     ===================================================================== */
  G: {
    C: 500,
    bezelR: 456, bezelW: 32, hairOut: 472, hairIn: 440,
    faceR: 440,
    tickIn: 372, tickOut: 400, capIn: 414,
    dotR: 418,
    minNumR: 344,
    hourNumR: 300,
    ring24R: 222,
    /* each tip stops just inside the ring it points AT: the hour hand
       inside the hour numerals, the minute hand on the coral dot ring */
    hourTip: 258, minTip: 418,
    hubR: 26,
    /* ⚠ THE MINUTE GRIP IS THE TIP. At 390 its 44px button sat over the
       tip at 418 and hid the one thing the minute hand exists to do —
       point at a mark. Coinciding them makes the knob read as the tip
       marker resting on the coral dot ring, and it widens the hour/minute
       grip separation to 22.8% of the face, well past the 44px floor at
       every viewport. */
    gripHourR: 190, gripMinR: 418,
    elapsedHourR: 140, elapsedMinR: 230,
    /* the dial-wide region rule: a miss still does something */
    regHubMax: 60, regHourMax: 330, regMinMax: 500
  },

  defaults: { digital: 'both', speakDrag: false, minuteRing: false, ring24: false },
  /* ⚠ THE DRAWER IS FOR BOOLEANS AND CHOICES THAT CAN NEVER BE REFUSED.
     `granularity` used to live here AND on the dock, and the non-premium
     case had to be bounced back inside onSettings — which reads as a bug
     rather than a gate. The step ladder now lives only on the card. */
  settings: [
    { key: 'digital', type: 'choice', labelKey: 'setDigital', options: [
      { value: 'both', labelKey: 'digBoth' },
      { value: '12', labelKey: 'dig12' },
      { value: '24', labelKey: 'dig24' },
      { value: 'off', labelKey: 'digOff' }
    ]},
    { key: 'minuteRing', type: 'toggle', labelKey: 'minuteRing' },
    { key: 'ring24', type: 'toggle', labelKey: 'ring24' },
    { key: 'speakDrag', type: 'toggle', labelKey: 'setSpeakDrag' }
  ],

  STORE_KEY: 'lcs:learning-clock:v1',
  ENT_TRUST_DAYS: 14,
  MAX_SAVED: 12,
  C: {
    T: '#146B5E', TD: '#0F4A40',
    CORAL: '#F2784B', CORALD: '#C8613A',
    FACE: '#FFFDF7', HONEY: '#F2C879', CARD: '#FFFEFB'
  },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.premiumKnown = false;
    this.mode = 'explore';
    this.total = 150;                 /* 2:30 — the demo pose */
    this.pm = true;
    this.step = '30';
    this.view = 'both';               /* both | hour | minute */
    this._gesture = null;
    this._drag = null;
    this._timers = [];
    this._nudged = false;
    this._fiveCount = null;
    this.task = { order: [], idx: 0, phase: 'set', target: null, done: 0, misses: 0, face: 0, gran: 30 };
    this.elapsed = { start: null, end: null };

    this._store = this._loadStore() || {};
    if (this._store.step && this.STEPS.indexOf(this._store.step) >= 0) this.step = this._store.step;
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];
    if (!this._store.ourTimes) this._store.ourTimes = [];

    document.body.classList.add('lck-wide');
    injectLearningClockCSS();
    var ent = this._store.ent;
    if (ent && ent.tier && ent.checkedAt) {
      var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
      if (age <= this.ENT_TRUST_DAYS) this.premium = ent.tier !== 'free';
    }
    this._fetchEntitlement();
    /* ⚠ NO render() HERE — the shell calls init(api) and then render() on
       the very next line (lcs-shell.js:994-995). */
  },

  /* ⚠ THE SHELL CALLS destroy() ON TEARDOWN AND THE BODY CLASS MUST GO
     WITH IT. The shipped build added `lck-wide` in render() and never
     removed it, so it leaked onto whatever mounted next. */
  destroy: function () {
    (this._timers || []).forEach(function (t) { clearTimeout(t); });
    this._timers = [];
    document.body.classList.remove('lck-wide', 'lck-paid', 'lck-night');
  },

  STEPS: ['60', '30', '15', '5', '1'],

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY) || 'null'); } catch (_) { return null; }
  },
  _saveStore: function () {
    this._store.settings = JSON.parse(JSON.stringify(this.api.settings));
    this._store.step = this.step;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(this._store)); } catch (_) {}
  },

  /* ENTITLEMENT — the pattern from pattern-bench.js:239-265.
     ⚠ UNKNOWN IS PESSIMISTIC, and locking a control is not enough: the
     state it produced must be re-clamped once we actually know. */
  _fetchEntitlement: function () {
    var self = this, token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    var settle = function (paid) {
      self.premium = !!paid;
      self.premiumKnown = true;
      self._reclamp();
      if (self._wrap) self.render();
    };
    var trustCache = function () {
      var ent = self._store.ent;
      if (ent && ent.checkedAt) {
        var age = (Date.now() - new Date(ent.checkedAt).getTime()) / 86400000;
        settle(age <= self.ENT_TRUST_DAYS && ent.tier !== 'free');
      } else settle(false);
    };
    if (!token) { settle(false); return; }
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { settle(false); return; }
        var tier = j.user && j.user.subscriptionTier, sub = j.subscription;
        var paid = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: paid ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        settle(paid);
      })
      .catch(trustCache);
  },
  /* ⚠ A LAPSED SUBSCRIBER KEPT THE PAID STEP because init restored the
     persisted settings blindly and onSettings only fires on CHANGE. */
  _reclamp: function () {
    if (this.premiumKnown && !this.premium) {
      /* the finest FREE rung, not a hardcoded one — dropping a lapsed
         subscriber from 1 minute to 30 coarsens their clock by six steps
         when 15 and 5 are free to them */
      if (!this._stepFree(this.step)) {
        var free = this.STEPS.filter(function (x) { return this._stepFree(x); }, this);
        this.step = free.length ? free[free.length - 1] : '30';
        this._snapToStep();
      }
      if (this.mode !== 'explore') this.mode = 'explore';
    }
  },
  _stepFree: function (s) { return this.FREE_STEPS.indexOf(String(s)) >= 0; },

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m2, k) { return (args && k in args) ? String(args[k]) : m2; });
  },
  _reducedMotion: function () {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  },
  _after: function (ms, fn) { var t = setTimeout(fn, ms); this._timers.push(t); return t; },

  _gran: function () { return parseInt(this.step, 10) || 30; },
  /* _h FLOORED WHILE _m ROUNDED, so at total 119.7 mid-drag the screen
     reader was told "1 o'clock" while the hands sat at 1:59.7 — _m rolled
     59.7 to 60 to 0 and the hour never carried. One rounded value now
     feeds both. */
  _round: function (t) { return Math.round(((t === undefined ? this.total : t))) % 720; },
  _h: function (t) { var h = Math.floor(this._round(t) / 60) % 12; return h === 0 ? 12 : h; },
  _m: function (t) { return this._round(t) % 60; },
  _say: function (t) {
    return this.sayTime(this.api.lang, this._h(t), this._m(t), { deQuarter: !!this._store.deQuarter });
  },

  /* ---- speech: legible with the sound off, always -------------------
     ⚠ LCSAudio never calls getVoices() and silently substitutes a missing
     voice, so TTS is reliable in about five of eleven locales here. The
     guard is deliberately PERMISSIVE (an empty voice list means "not
     loaded yet", so let TTS try) — it is the estimation-jar shape.
     ⭐ THE ORDERING IS THE LOAD-BEARING PART: announce() fires BEFORE the
     guard, so a screen-reader user gets the reading even when the voice
     is refused. Sound may confirm; it may never carry. */
  _voiceOk: function () {
    if (this._voiceState != null) return this._voiceState;
    var ok = true;
    try {
      if (!window.speechSynthesis) ok = false;
      else {
        var voices = window.speechSynthesis.getVoices() || [];
        if (voices.length > 0) {
          var want = ({ no: 'nb', pt: 'pt' }[this.api.lang] || this.api.lang).toLowerCase();
          var self = this;
          ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf(want) === 0; });
          if (!ok && this.api.lang === 'no') {
            ok = voices.some(function (v) { return (v.lang || '').toLowerCase().indexOf('no') === 0; });
          }
        }
      }
    } catch (_) { ok = true; }
    this._voiceState = ok;
    return ok;
  },
  _speakNow: function (text, kind) {
    this.api.announce(text);
    if (!this._voiceOk()) return;
    try { LCSAudio.speak({ type: kind || 'ui', text: text, lang: this.api.lang, rate: 0.9 }); } catch (_) {}
  },

  /* ===================== the gear engine ============================ */

  /* ⚠ getScreenCTM, not getBoundingClientRect — both are correct on an
     untransformed square, but the CTM is ALSO correct under fullscreen
     scaling and CSS zoom, and it is one code path. */
  _angleAt: function (cx, cy) {
    var svg = this._svg;
    if (!svg) return null;
    var dx, dy;
    var m = svg.getScreenCTM && svg.getScreenCTM();
    if (m && typeof svg.createSVGPoint === 'function') {
      var p = svg.createSVGPoint(); p.x = cx; p.y = cy;
      var u = p.matrixTransform(m.inverse());
      dx = u.x - this.G.C; dy = u.y - this.G.C;
    } else {
      var r = svg.getBoundingClientRect();
      if (!r.width) return null;
      dx = (cx - (r.left + r.width / 2)) / r.width * 1000;
      dy = (cy - (r.top + r.height / 2)) / r.height * 1000;
    }
    var a = Math.atan2(dx, -dy) * 180 / Math.PI;
    return { a: (a + 360) % 360, r: Math.sqrt(dx * dx + dy * dy) };
  },
  _signedDelta: function (from, to) {
    var d = (to - from) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  },

  /* ===================== THE PURE MODEL ==============================
     ⭐⭐ THESE FIVE ARE EXTRACTED SO THE GATE CAN CALL THEM. They were
     inline in _paint/_applyDrag/_snapToStep/_nextTask, so
     verify-learning-clock.js had to RE-IMPLEMENT each one to check it —
     and the mutation harness then reported six survivors in a row,
     because both sides of every comparison were the gate's own copy.
     A gate that reimplements the thing it checks is testing a copy.
     Nothing below reads `this` beyond the constants, so the gate can
     drive them without a DOM.
     ================================================================== */
  hourAngle: function (total) { return total / 2; },        /* ≡ 30h + 0.5m */
  minuteAngle: function (total) { return (total % 60) * 6; },
  /* one drag step: `deg` is the signed sweep of the named hand */
  applyDelta: function (which, total, deg) {
    var t = total + (which === 'minute' ? deg / 6 : deg * 2);
    return ((t % 720) + 720) % 720;
  },
  snapTo: function (total, g) { return (Math.round(total / g) * g) % 720; },
  /* ⚠ the neutral pose, clock-core.js:119 — 12:00, or 6:00 when the
     target IS 12:00, so the child is never handed a hand already right */
  startPoseFor: function (target) { return (target === 0) ? 360 : 0; },

  /* apply a drag delta (degrees on the dragged hand) to totalMinutes */
  _applyDrag: function (which, angle) {
    if (!this._drag) return;
    /* the five-count belongs to a walk that has just been abandoned:
       count to 20, drag to 7:45, press again and it landed on 7:25 —
       the hand moving backwards with no rule a child could see */
    this._fiveCount = null;
    var d = this._signedDelta(this._drag.lastAngle, angle);
    this._drag.lastAngle = angle;
    this.total = this.applyDelta(which, this.total, d);
    this._paint();
    this._bubbleLive();
  },
  _snapToStep: function () {
    this.total = this.snapTo(this.total, this._gran());
  },
  _snapRelease: function (speak) {
    this._snapToStep();
    this._paint();
    this._bubbleFinal(speak !== false);
  },

  /* ============================ render ============================== */

  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    this._reclamp();
    /* ⚠⚠ DROP EVERY CACHED NODE FIRST. render() replaces the whole stage,
       so a reference held across it points at a DETACHED element — and
       _paint() then styles the corpse while the live grip keeps its
       static position and lands outside the dial. It only showed for a
       SIGNED-IN user, because that is the one path where the entitlement
       callback fires a second render; the free path settles
       synchronously before `_wrap` exists and renders once. Found by
       reading the 768 render, not by any assertion.
       _nightState is reset for the same reason: it guards a repaint of a
       node that no longer exists. */
    this._gripH = null; this._gripM = null; this._nightState = undefined;

    /* ⚠ THE LITERAL FORM IS REQUIRED. audit-tool-control-liveness derives a
       tool's class prefix by matching `api.el('div', '<pfx>-wrap')` in the
       source — deliberately, so a new tool needs no entry in that file —
       and a concatenated argument defeats the match: the gate refused to
       run at all with "cannot resolve a class prefix". The entitlement
       class goes on afterwards. */
    var wrap = api.el('div', 'lck-wrap');
    if (this.premium) wrap.classList.add('lck-paid');
    this._wrap = wrap;

    /* ---- mode switch, ABOVE the face -----------------------------
       ⚠ A MODE SWITCH READ AFTER ITS OWN CONSEQUENCES IS A TOP-ORDER
       CONFUSION. The shipped build put it at the very bottom of the
       card, under everything it governs. */
    wrap.appendChild(this._buildModes());

    /* the task prompt card — persistent, never audio-only */
    if (this.mode === 'task' && this.task.target !== null) wrap.appendChild(this._buildPrompt());

    var main = api.el('div', 'lck-main');

    /* ---- face column ---- */
    var facecol = api.el('div', 'lck-facecol');
    facecol.appendChild(this._buildFaceHead());
    var face = api.el('div', 'lck-face');
    this._faceEl = face;
    face.appendChild(this._buildFace());
    face.appendChild(this._buildGrip('hour'));
    face.appendChild(this._buildGrip('minute'));
    facecol.appendChild(face);
    main.appendChild(facecol);

    /* ---- rail ---- */
    main.appendChild(this._buildRail());
    wrap.appendChild(main);

    /* ⭐ THE HINT BAND — the tool's only explanation, in the tool's own
       DOM. `strings.instruction` is display:none inside an embed
       (lcs-shell.css:261) and the production page always embeds, so the
       one sentence telling a child the hands move never rendered. */
    wrap.appendChild(this._buildHint());

    /* ---- dock ---- */
    wrap.appendChild(this._buildDock());
    if (this._gate) wrap.appendChild(this._buildGate());

    stage.appendChild(wrap);

    /* the printable is a SIBLING of the wrap — print hides .lck-wrap
       entirely and a sheet inside it would inherit that */
    this._ensureSheet(stage);

    this._wirePointer();
    this._paint();
    this._maybeNudge();
  },

  /* ---------------------- chrome builders ------------------------- */

  _buildModes: function () {
    var api = this.api, self = this;
    var row = api.el('div', 'lck-modes');
    row.setAttribute('role', 'radiogroup');
    row.setAttribute('aria-label', api.t('modeGroup'));
    var defs = [['explore', 'modeExplore', true], ['task', 'modeTask', this.premium], ['elapsed', 'modeElapsed', this.premium]];
    defs.forEach(function (d) {
      var b = api.el('button', 'lck-mode' + (self.mode === d[0] ? ' active' : '') + (d[2] ? '' : ' locked'));
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(self.mode === d[0]));
      b.setAttribute('data-fk', 'mode-' + d[0]);
      b.textContent = api.t(d[1]);
      if (!d[2]) b.appendChild(self._lockGlyph());
      b.addEventListener('click', function () {
        if (!d[2]) { self._showGate(d[0] === 'task' ? 'gateTask' : 'gateElapsed'); return; }
        if (self.mode === d[0]) return;
        self.mode = d[0];
        self._fiveCount = null;
        if (d[0] === 'task' && self.task.target === null) { self._nextTask(); return; }
        if (d[0] === 'elapsed') self.elapsed = { start: null, end: null };
        self.render();
      });
      row.appendChild(b);
    });
    return row;
  },

  _lockGlyph: function () {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', '13'); s.setAttribute('height', '13');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('class', 'lck-lock');
    s.innerHTML = '<path d="M7 10V7a5 5 0 0 1 10 0v3" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
                  '<rect x="4.5" y="10" width="15" height="10.5" rx="2.6" fill="currentColor"/>';
    return s;
  },

  _buildPrompt: function () {
    var api = this.api;
    var card = api.el('div', 'lck-prompt' + (this.task.phase === 'done' ? ' done' : ''));
    /* ⚠ SPLIT THE RAW TEMPLATE ON THE VISIBLE PLACEHOLDER. The shipped
       build split on a U+0001 sentinel it had substituted in — correct,
       but an invisible control character in source is one normalising
       editor away from breaking the prompt in eleven locales with no
       gate able to see it. */
    var parts = String(api.t('taskPrompt')).split('{time}');
    var worded = this._say(this.task.target);
    card.appendChild(document.createTextNode(parts[0] || ''));
    var em = api.el('em');
    em.textContent = this.task.face === 1 ? this._digitalOf(this.task.target) : worded;
    card.appendChild(em);
    if (parts.length > 1) card.appendChild(document.createTextNode(parts[1] || ''));
    return card;
  },

  _buildFaceHead: function () {
    var api = this.api, self = this;
    var head = api.el('div', 'lck-facehead');
    /* ⭐ A TWO-STATE CHOICE, NOT A GLYPH THAT GUESSES. The shipped sun/moon
       derived its icon from the resulting 24h hour while the TAP flipped
       am/pm — so at 6:00 tapping gave 18:00, still "day", the icon did
       not change, and its label ("tap for evening") was false. Measured:
       6:00 is the one hour where the control looked dead. */
    var grp = api.el('div', 'lck-ampm');
    grp.setAttribute('role', 'radiogroup');
    grp.setAttribute('aria-label', api.t('ampmLbl'));
    [['am', 'amLbl', false], ['pm', 'pmLbl', true]].forEach(function (d) {
      var b = api.el('button', 'lck-half' + (self.pm === d[2] ? ' active' : ''));
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(self.pm === d[2]));
      b.setAttribute('data-fk', 'half-' + d[0]);
      b.setAttribute('aria-label', api.t(d[1]));
      b.appendChild(d[2] ? self._moonGlyph() : self._sunGlyph());
      var lab = api.el('span', 'lck-halflab');
      lab.textContent = api.t(d[1]);
      b.appendChild(lab);
      b.addEventListener('click', function () {
        if (self.pm === d[2]) return;
        self.pm = d[2];
        self.render();
        self._speakNow(self._say());
      });
      grp.appendChild(b);
    });
    head.appendChild(grp);
    return head;
  },

  _sunGlyph: function () {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 40 40'); s.setAttribute('width', '24'); s.setAttribute('height', '24');
    s.setAttribute('aria-hidden', 'true');
    var rays = '';
    for (var i = 0; i < 8; i++) {
      var a = i * 45 * Math.PI / 180;
      rays += '<line x1="' + (20 + Math.sin(a) * 12).toFixed(1) + '" y1="' + (20 - Math.cos(a) * 12).toFixed(1) +
              '" x2="' + (20 + Math.sin(a) * 17).toFixed(1) + '" y2="' + (20 - Math.cos(a) * 17).toFixed(1) +
              '" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>';
    }
    s.innerHTML = '<circle cx="20" cy="20" r="8.5" fill="currentColor"/>' + rays;
    return s;
  },
  _moonGlyph: function () {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 40 40'); s.setAttribute('width', '24'); s.setAttribute('height', '24');
    s.setAttribute('aria-hidden', 'true');
    s.innerHTML = '<path d="M25.5 6.5A15 15 0 1 0 33 24.5 11.5 11.5 0 0 1 25.5 6.5z" fill="currentColor"/>';
    return s;
  },

  /* ---------------------- the face -------------------------------- */

  _buildFace: function () {
    var G = this.G, C = this.C, api = this.api;
    var ns = 'http://www.w3.org/2000/svg';
    function elNS(tag, attrs) {
      var e = document.createElementNS(ns, tag);
      for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) e.setAttribute(k, attrs[k]);
      return e;
    }
    function pol(r, deg) {
      var a = deg * Math.PI / 180;
      return [G.C + Math.sin(a) * r, G.C - Math.cos(a) * r];
    }
    var svg = elNS('svg', { viewBox: '0 0 1000 1000', class: 'lck-svg' });
    /* ⚠ THE SVG IS DECORATION NOW. The two controls are real HTML buttons
       above it, so the whole subtree is hidden from assistive tech — the
       shipped build had role="img" (a LEAF role) on an svg CONTAINING two
       focusable role="slider" hands, which removed them from the tree. */
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    this._svg = svg;

    var defs = elNS('defs', {});
    defs.innerHTML =
      '<radialGradient id="lckFace" cx="38%" cy="32%" r="78%">' +
      '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="58%" stop-color="#FFFDF7"/>' +
      '<stop offset="100%" stop-color="#F7EEDC"/></radialGradient>' +
      '<radialGradient id="lckFaceNight" cx="38%" cy="32%" r="78%">' +
      '<stop offset="0%" stop-color="#FFFFFF"/><stop offset="58%" stop-color="#F7F9FB"/>' +
      '<stop offset="100%" stop-color="#EAEEF2"/></radialGradient>';
    svg.appendChild(defs);

    svg.appendChild(elNS('circle', { cx: G.C, cy: G.C, r: G.faceR, fill: 'url(#lckFace)', class: 'lck-facefill' }));
    /* bezel — and the arc rides it, so nothing on the dial is ever hidden */
    svg.appendChild(elNS('circle', { cx: G.C, cy: G.C, r: G.bezelR, fill: 'none', stroke: C.T, 'stroke-width': G.bezelW }));
    svg.appendChild(elNS('circle', { cx: G.C, cy: G.C, r: G.hairOut, fill: 'none', stroke: C.TD, 'stroke-width': 4 }));
    svg.appendChild(elNS('circle', { cx: G.C, cy: G.C, r: G.hairIn, fill: 'none', stroke: C.TD, 'stroke-width': 4 }));

    /* the explainer arc lives ON the bezel */
    this._arcEl = elNS('path', { d: '', fill: 'none', stroke: C.HONEY, 'stroke-width': G.bezelW,
      'stroke-linecap': 'butt', opacity: 0, class: 'lck-arc' });
    svg.appendChild(this._arcEl);
    this._pinA = elNS('circle', { cx: G.C, cy: G.C, r: 23, fill: C.HONEY, opacity: 0, class: 'lck-pin' });
    this._pinB = elNS('circle', { cx: G.C, cy: G.C, r: 23, fill: C.HONEY, opacity: 0, class: 'lck-pin' });
    svg.appendChild(this._pinA); svg.appendChild(this._pinB);

    /* elapsed rings sit in the empty inner disc, colour-coded to the hands */
    this._bandGroup = elNS('g', { class: 'lck-band' });
    svg.appendChild(this._bandGroup);

    /* ---- ticks. THREE CLASSES, and the third is a COLOUR not a weight.
       The shipped build painted all 60 ticks TEAL — the minute hand's own
       targets in the hour hand's colour. ---- */
    /* ⚠ TWO SEPARATE RINGS, NOT A TWO-TONE STROKE. Overdrawing a coral
       cap on a teal shaft looked right on paper and rendered as twelve
       coral blobs: `stroke-linecap:round` extends a 24-wide stroke by 12
       units at EACH end, so the cap bled back over almost all of the
       shaft it was supposed to cap. Caught by reading the render.
       Now the contract is spatial as well as chromatic — an inner TEAL
       tick ring the hour hand points into, and an outer CORAL dot ring
       the minute hand's tip lands on. */
    for (var i = 0; i < 60; i++) {
      var deg = i * 6, major = (i % 5 === 0), quarter = (i % 15 === 0);
      if (major) {
        var p1 = pol(G.tickIn, deg), p2 = pol(G.tickOut, deg);
        svg.appendChild(elNS('line', { x1: p1[0], y1: p1[1], x2: p2[0], y2: p2[1],
          stroke: C.T, 'stroke-width': quarter ? 30 : 22, 'stroke-linecap': 'round' }));
      }
      var pd = pol(G.dotR, deg);
      svg.appendChild(elNS('circle', { cx: pd[0], cy: pd[1],
        r: quarter ? 16 : (major ? 12 : 6), fill: C.CORAL,
        opacity: major ? 0.95 : 0.42 }));
    }

    /* ---- 24-hour ring (a SETTING, off in all 11) ---- */
    this._ring24Els = [];
    if (api.settings.ring24) {
      svg.appendChild(elNS('circle', { cx: G.C, cy: G.C, r: G.ring24R, fill: 'none',
        stroke: C.T, 'stroke-width': 55, opacity: 0.055 }));
      for (var q = 1; q <= 12; q++) {
        var p24 = pol(G.ring24R, q * 30);
        var t24 = elNS('text', { x: p24[0], y: p24[1], 'text-anchor': 'middle',
          'dominant-baseline': 'central', fill: C.T, 'font-size': 34, 'font-weight': 700,
          opacity: 0.62, class: 'lck-num24' });
        svg.appendChild(t24);
        this._ring24Els.push({ el: t24, h: q });
      }
    }

    /* ---- minute numerals (INSIDE the tick band, not outside the bezel).
       The shipped build put them at r=97 of a 200 box — beyond the bezel's
       own outer edge at 94.5, and flush against the viewBox border. ---- */
    if (api.settings.minuteRing) {
      for (var mn = 5; mn <= 60; mn += 5) {
        var pm2 = pol(G.minNumR, mn * 6);
        var tm = elNS('text', { x: pm2[0], y: pm2[1], 'text-anchor': 'middle',
          'dominant-baseline': 'central', fill: C.CORALD, 'font-size': 40, 'font-weight': 700, class: 'lck-nummin' });
        tm.textContent = String(mn === 60 ? 0 : mn);
        svg.appendChild(tm);
      }
    }

    /* ---- hour numerals. font-weight 700, not 800: lcs-shell.css imports
       Baloo 2 at 500;600;700, so 800 was FAUX bold — thicker strokes with
       unopened counters, exactly wrong at numeral sizes. ---- */
    this._numEls = {};
    for (var hn = 1; hn <= 12; hn++) {
      var ph = pol(G.hourNumR, hn * 30);
      var halo = elNS('circle', { cx: ph[0], cy: ph[1], r: 66, fill: C.HONEY, opacity: 0, class: 'lck-halo' });
      svg.appendChild(halo);
      var tn = elNS('text', { x: ph[0], y: ph[1], 'text-anchor': 'middle', 'dominant-baseline': 'central',
        fill: C.T, 'font-size': 84, 'font-weight': 700, class: 'lck-num' });
      tn.textContent = String(hn);
      svg.appendChild(tn);
      this._numEls[hn] = { text: tn, halo: halo };
    }
    /* the five-count marker */
    this._fiveEl = elNS('circle', { cx: G.C, cy: G.C, r: 30, fill: 'none', stroke: this.C.CORALD,
      'stroke-width': 8, opacity: 0, class: 'lck-fivemark' });
    svg.appendChild(this._fiveEl);

    /* ghost hands — the target preview and the elapsed start */
    this._ghostH = this._handPath(elNS, 'hour', true);
    this._ghostM = this._handPath(elNS, 'minute', true);
    svg.appendChild(this._ghostH); svg.appendChild(this._ghostM);

    /* ---- the hands ----
       ⚠ THE HOUR HAND PAINTS LAST, WHICH IS THE OPPOSITE OF A REAL CLOCK
       AND RIGHT FOR A TEACHING ONE. With the minute hand on top, 12:00
       rendered as a single coral bar: the teal showed only ~3px either
       side at a 480px face, so the hand a child finds hardest to read
       vanished at the very time they are first taught. Hour-on-top gives
       a wide teal hand out to r=258 with the narrow coral continuing past
       it to the dot ring — unmistakably two hands, both at 12. */
    this._minHand = this._handPath(elNS, 'minute', false);
    this._hourHand = this._handPath(elNS, 'hour', false);
    svg.appendChild(this._minHand);
    svg.appendChild(this._hourHand);

    /* hub — one teal disc with a cream eye, not a honey annulus */
    svg.appendChild(elNS('circle', { cx: G.C, cy: G.C, r: G.hubR, fill: C.T }));
    svg.appendChild(elNS('circle', { cx: G.C, cy: G.C, r: 11, fill: C.FACE }));

    return svg;
  },

  /* a real tapered silhouette with a counterweight, not a line.
     ⭐ THE CREAM KEYLINE IS THE LOAD-BEARING DETAIL — `paint-order:stroke`
     with a face-coloured stroke is what stops the two hands merging into
     one shape at 12:00 and keeps each readable over numerals and rings. */
  _handPath: function (elNS, which, ghost) {
    var G = this.G, C = this.C;
    var hour = which === 'hour';
    var tip = hour ? G.hourTip : G.minTip;
    /* ⚠ THE TAIL IS A COUNTERWEIGHT, NOT A SECOND HAND. At back=60 with a
       1.25x counterweight the hour tail read as heavy as the blade — a
       three-hand clock at a glance. Measured off the render and trimmed. */
    var w0 = hour ? 34 : 15, w1 = hour ? 21 : 7, back = hour ? 34 : 26;
    var cw = 0.8 * w0;
    var cx = G.C, cy = G.C;
    /* ⚠ THE TAIL GOES BEHIND THE PIVOT, NOT IN FRONT OF IT. Written as
       `cy - back` the blade started 60 units along the TIP side, so the
       hand floated clear of the hub with its counterweight bobbing at the
       far end — caught by reading the render, not by any assertion. */
    var d = 'M' + (cx - w0) + ' ' + (cy + back) +
            ' L' + (cx - w1) + ' ' + (cy - tip + w1) +
            ' A' + w1 + ' ' + w1 + ' 0 0 1 ' + (cx + w1) + ' ' + (cy - tip + w1) +
            ' L' + (cx + w0) + ' ' + (cy + back) + ' Z';
    var g = elNS('g', { class: 'lck-hand lck-hand-' + which + (ghost ? ' ghost' : '') });
    g.appendChild(elNS('circle', { cx: cx, cy: cy + back, r: cw, fill: hour ? C.T : C.CORAL,
      stroke: C.FACE, 'stroke-width': 7, 'paint-order': 'stroke' }));
    g.appendChild(elNS('path', { d: d, fill: hour ? C.T : C.CORAL,
      stroke: C.FACE, 'stroke-width': 7, 'paint-order': 'stroke', 'stroke-linejoin': 'round' }));
    /* knurl — the setting-knob glyph, language-free */
    if (!ghost) {
      var kr = hour ? G.gripHourR : G.gripMinR;
      for (var i = -1; i <= 1; i++) {
        g.appendChild(elNS('line', { x1: cx - (hour ? 11 : 7), y1: cy - kr + i * (hour ? 15 : 11),
          x2: cx + (hour ? 11 : 7), y2: cy - kr + i * (hour ? 15 : 11),
          stroke: hour ? C.TD : C.CORALD, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0.75 }));
      }
    }
    if (ghost) g.setAttribute('opacity', '0');
    return g;
  },

  /* ---- the grips: real 44px HTML buttons riding the face ----------
     ⚠ 44 CSS PIXELS, FIXED, IN PX — never a radius in model units. A
     radius in model units cannot hold a floor in pixels; the shipped
     hit line measured 21.1px and the tip pad 27.4px at a 320px page,
     against floors of 44 (control) and 34 (canvas cell).
     ⭐ AND THEY SIT AT DIFFERENT RADII, so with the hands collinear at
     12:00 they are still 19% of the face apart — both stay individually
     grabbable and there is never an ambiguous state. */
  _buildGrip: function (which) {
    var api = this.api, self = this;
    var b = api.el('button', 'lck-grip lck-grip-' + which);
    b.type = 'button';
    b.setAttribute('role', 'slider');
    b.setAttribute('aria-label', api.t(which === 'hour' ? 'handHour' : 'handMinute'));
    b.setAttribute('aria-valuemin', '0');
    b.setAttribute('aria-valuemax', '719');
    b.setAttribute('data-fk', 'grip-' + which);
    b.setAttribute('data-which', which);
    b.addEventListener('pointerdown', function (ev) { self._beginGesture(which, ev, b); });
    /* ⚠ A DRAG-ONLY HANDLE IS DEAD TO A KEYBOARD, TO ASSISTIVE TECH AND TO
       THE LIVENESS GATE — a synthetic .click() never fires pointerdown. */
    b.addEventListener('click', function (ev) {
      ev.preventDefault();
      if (self._movedAt && Date.now() - self._movedAt < 400) return;   /* a drag just ended here */
      self._speakNow(self._say());
    });
    b.addEventListener('keydown', function (ev) { self._gripKey(which, ev); });
    return b;
  },

  _gripKey: function (which, e) {
    var g = this._gran(), d = 0, abs = null;
    var k = e.key;
    if (k === 'ArrowRight' || k === 'ArrowUp') d = which === 'minute' ? g : 60;
    else if (k === 'ArrowLeft' || k === 'ArrowDown') d = which === 'minute' ? -g : -60;
    else if (k === 'PageUp') d = which === 'minute' ? 60 : 720 / 2;
    else if (k === 'PageDown') d = which === 'minute' ? -60 : -720 / 2;
    else if (k === 'Home') abs = which === 'minute' ? (Math.floor(this.total / 60) * 60) : (this.total % 60);
    else if (k === 'Enter' || k === ' ' || k === 'Spacebar') { e.preventDefault(); this._speakNow(this._say()); return; }
    else if (k === 'Escape' && this._gesture) { e.preventDefault(); this.total = this._gesture.t0; this._paint(); this._endGesture(); return; }
    else return;
    e.preventDefault();
    this._nudgeCancel();
    if (abs !== null) this.total = ((abs % 720) + 720) % 720;
    else this.total = ((this.total + d) % 720 + 720) % 720;
    this._snapToStep();
    this._paint();
    this._bubbleFinal(true);
  },

  /* ---- one gesture object, listeners on window, bound ONCE --------
     ⚠ NO setPointerCapture. render() rebuilds the SVG and a captured
     element that is removed loses the capture silently. It is also
     unnecessary: touch pointers are IMPLICITLY captured to the element
     that received pointerdown, so moves reach it wherever the finger
     goes and bubble to window.
     ⚠ ONE listener set on window, added ONCE — a pair per render leaks. */
  _wirePointer: function () {
    if (this._wired) return;
    this._wired = true;
    var self = this;
    var move = function (ev) {
      var g = self._gesture;
      if (!g || ev.pointerId !== g.id) return;
      ev.preventDefault();
      var a = self._angleAt(ev.clientX, ev.clientY);
      if (!a) return;
      g.pending = a.a;
      g.moved = true;
      if (g.raf) return;
      g.raf = requestAnimationFrame(function () {
        g.raf = null;
        if (self._gesture !== g || g.pending == null) return;
        self._applyDrag(g.which, g.pending);
      });
    };
    var end = function (ev) {
      var g = self._gesture;
      if (!g) return;
      if (ev && ev.pointerId !== undefined && ev.pointerId !== g.id) return;
      /* ⚠ A CLICK IS SUPPRESSED BY TIME, NOT BY A FLAG A LATER CLICK HAS
         TO CLEAR. The flag version went stale whenever a drag ended off
         the grip, and then ate the next genuine tap — so tapping a hand
         to hear the time silently did nothing once per drag. */
      self._movedAt = g.moved ? Date.now() : 0;
      self._endGesture();
    };
    /* ⚠ {passive:false} — a window-level pointermove listener is passive
       by default in Chrome and preventDefault would be a silent no-op. */
    window.addEventListener('pointermove', move, { passive: false });
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    window.addEventListener('blur', end);
    /* grabbing anywhere on the dial still does something */
    if (this._faceEl) {
      this._faceEl.addEventListener('pointerdown', function (ev) {
        if (self._gesture) return;
        if (ev.target && ev.target.classList && ev.target.classList.contains('lck-grip')) return;
        var a = self._angleAt(ev.clientX, ev.clientY);
        if (!a) return;
        var G = self.G;
        if (a.r < G.regHubMax || a.r > G.regMinMax) return;
        var which = a.r < G.regHourMax ? 'hour' : 'minute';
        if (!self._handLive(which)) return;
        self._beginGesture(which, ev, null);
      });
    }
  },
  _handLive: function (which) {
    if (this.view === 'hour') return which === 'hour';
    if (this.view === 'minute') return which === 'minute';
    return true;
  },
  _beginGesture: function (which, ev, btn) {
    if (this._gesture) return;
    if (ev.button !== undefined && ev.button > 0) return;
    if (ev.isPrimary === false) return;
    if (!this._handLive(which)) return;
    ev.preventDefault();
    this._nudgeCancel();
    var a = this._angleAt(ev.clientX, ev.clientY);
    if (!a) return;
    this._gesture = this._drag = { which: which, id: ev.pointerId, lastAngle: a.a,
      raf: null, pending: null, moved: false, t0: this.total, lastSpoke: null };
    if (btn) btn.classList.add('dragging');
    if (this._wrap) this._wrap.classList.add('lck-dragging');
  },
  _endGesture: function () {
    var g = this._gesture;
    if (!g) return;
    /* ⚠⚠ FLUSH THE PENDING FRAME, DO NOT CANCEL IT. Moves are coalesced
       through one requestAnimationFrame (an interactive-whiteboard pen
       emits ~240Hz), and cancelling on release DISCARDED the last one —
       so a quick flick (down, one move, up) moved the hand by exactly
       nothing. Measured: total 150 -> 150 with the gesture correctly
       begun. Real children flick. */
    if (g.raf) cancelAnimationFrame(g.raf);
    if (g.pending != null) this._applyDrag(g.which, g.pending);
    this._gesture = null;
    this._drag = null;
    if (this._wrap) {
      this._wrap.classList.remove('lck-dragging');
      var d = this._wrap.querySelector('.lck-grip.dragging');
      if (d) d.classList.remove('dragging');
    }
    this._snapRelease(true);
  },

  /* ---------------------- the rail -------------------------------- */

  _buildRail: function () {
    var api = this.api, self = this;
    var rail = api.el('div', 'lck-rail');

    var bubble = api.el('div', 'lck-bubble');
    var bt = api.el('span', 'lck-bubbletext');
    bt.textContent = this.mode === 'elapsed' ? this._elapsedText() : this._say();
    bubble.appendChild(bt);
    this._bubbleEl = bt;
    var spk = api.el('button', 'lck-speak');
    spk.type = 'button';
    spk.setAttribute('data-fk', 'speak');
    spk.setAttribute('aria-label', api.t('speakBtn'));
    spk.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
    spk.addEventListener('click', function () {
      self._speakNow(self.mode === 'elapsed' ? self._elapsedText() : self._say());
    });
    bubble.appendChild(spk);
    rail.appendChild(bubble);

    if (this.mode !== 'elapsed') {
      var why = api.el('button', 'lck-why');
      why.type = 'button';
      why.setAttribute('data-fk', 'why');
      why.innerHTML = '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.2"/><path d="M9.3 9.2a2.8 2.8 0 1 1 3.4 2.9v1.6"/><circle cx="12.6" cy="17.2" r="1.15" fill="currentColor" stroke="none"/></svg>';
      var wl = api.el('span'); wl.textContent = api.t('whyBtn'); why.appendChild(wl);
      why.addEventListener('click', function () { self._explain(true); });
      this._whyEl = why;
      rail.appendChild(why);

      if (api.lang === 'de') {
        var dv = api.el('button', 'lck-devariant');
        dv.type = 'button';
        dv.setAttribute('data-fk', 'devariant');
        /* the chip names the CONVENTION it switches TO — never a time */
        dv.textContent = this._store.deQuarter ? api.t('deVariantA') : api.t('deVariantB');
        dv.addEventListener('click', function () {
          self._store.deQuarter = !self._store.deQuarter;
          self._saveStore();
          self.render();
          self._speakNow(self._say());
        });
        rail.appendChild(dv);
      }
    }

    if (this.api.settings.digital !== 'off') rail.appendChild(this._buildDigital());

    if (this.mode === 'task') rail.appendChild(this._buildTaskRail());
    if (this.mode === 'elapsed') rail.appendChild(this._buildElapsedRail());
    if (this.mode === 'explore') rail.appendChild(this._buildFivesChip());

    return rail;
  },

  _digitalOf: function (t) {
    var h12 = this._h(t), m = this._m(t);
    return h12 + ':' + (m < 10 ? '0' : '') + m;
  },
  _h24: function (t) {
    var h24 = (this._h(t) % 12) + (this.pm ? 12 : 0);
    var m = this._m(t);
    return (h24 < 10 ? '0' : '') + h24 + ':' + (m < 10 ? '0' : '') + m;
  },
  _night: function () {
    var h24 = (this._h() % 12) + (this.pm ? 12 : 0);
    return h24 >= 19 || h24 < 6;
  },
  _buildDigital: function () {
    var api = this.api;
    var dig = api.el('div', 'lck-digital');
    var mode = api.settings.digital;
    var d1 = api.el('span', 'lck-d1');
    dig.appendChild(d1);
    this._d1 = d1; this._d2 = null;
    if (mode === 'both') {
      var d2 = api.el('span', 'lck-d2');
      dig.appendChild(d2);
      this._d2 = d2;
    }
    return dig;
  },

  _buildFivesChip: function () {
    var api = this.api, self = this;
    var wrapEl = api.el('div', 'lck-taskrail');
    var b = api.el('button', 'lck-chip wide');
    b.type = 'button';
    b.setAttribute('data-fk', 'fives');
    b.textContent = api.t('countFives');
    b.addEventListener('click', function () { self._countFive(); });
    wrapEl.appendChild(b);
    return wrapEl;
  },
  /* count on in fives — the bridge between skip-counting and reading the
     minute ring, and the reason the minute numerals exist */
  _countFive: function () {
    this._nudgeCancel();
    /* 55 + 5 used to be 60, which set total = hour*60 + 60 — a value of
       720 at 11:55, outside the [0,720) invariant every other path keeps,
       and it announced "60" at a mark the face labels 12 */
    if (this._fiveCount === null || this._fiveCount >= 55) {
      this._fiveCount = 0;
      this.total = Math.floor(this.total / 60) * 60;
    } else {
      this._fiveCount += 5;
      this.total = Math.floor(this.total / 60) * 60 + this._fiveCount;
    }
    this._paint();
    this._markFive();
    this.api.announce(String(this._fiveCount));
    if (this._voiceOk()) {
      try { LCSAudio.speak({ type: 'number', text: String(this._fiveCount), lang: this.api.lang, rate: 0.95 }); } catch (_) {}
    }
  },
  _markFive: function () {
    if (!this._fiveEl) return;
    if (this._fiveCount === null) { this._fiveEl.setAttribute('opacity', '0'); return; }
    var deg = (this._fiveCount % 60) * 6, a = deg * Math.PI / 180;
    this._fiveEl.setAttribute('cx', String(this.G.C + Math.sin(a) * this.G.dotR));
    this._fiveEl.setAttribute('cy', String(this.G.C - Math.cos(a) * this.G.dotR));
    this._fiveEl.setAttribute('opacity', '1');
  },

  _buildTaskRail: function () {
    var api = this.api, self = this;
    var tr = api.el('div', 'lck-taskrail');
    if (this.task.phase === 'set') {
      var check = api.el('button', 'lck-big coral');
      check.type = 'button';
      check.setAttribute('data-fk', 'check');
      check.textContent = api.t('checkBtn');
      check.addEventListener('click', function () { self._checkTask(); });
      tr.appendChild(check);
      /* the scaffold appears only after a second miss, and the child taps it */
      if (this.task.misses >= 2) {
        var sc = api.el('button', 'lck-chip');
        sc.type = 'button';
        sc.setAttribute('data-fk', 'scaffold');
        sc.textContent = api.t('showMinutes');
        sc.addEventListener('click', function () {
          /* THREE DEFECTS HERE, ALL FOUND BY NATIVE PANELS READING THE MODEL.
             (a) it set view='minute', which hides the hour hand AND its
                 grip — so a child whose error was the HOUR could no longer
                 move it while the nudge told them to. Help that traps you
                 is worse than no help.
             (b) it called _showTargetGhost() and THEN render(), and render
                 rebuilds the ghosts — so the child saw two faint hands at
                 12 o'clock on every round, whatever the target was.
             (c) it ghosted BOTH hands, i.e. it gave away the hour answer
                 under a label that offers the minutes. */
          self.render();
          self._showTargetGhost(5000, 'minute');
        });
        tr.appendChild(sc);
      }
    } else {
      var next = api.el('button', 'lck-big coral');
      next.type = 'button';
      next.setAttribute('data-fk', 'next');
      next.textContent = api.t('nextBtn');
      next.addEventListener('click', function () { self._nextTask(); });
      tr.appendChild(next);
    }
    if (this._taskNote) {
      var note = api.el('div', 'lck-tasknote' + (this._taskNoteKind === 'good' ? ' good' : ''));
      note.textContent = this._taskNote;
      tr.appendChild(note);
    }
    return tr;
  },

  _buildElapsedRail: function () {
    var api = this.api, self = this;
    var er = api.el('div', 'lck-taskrail');
    var row = api.el('div', 'lck-pinrow');
    var ps = api.el('button', 'lck-chip' + (this.elapsed.start === null ? ' cta' : ''));
    ps.type = 'button'; ps.setAttribute('data-fk', 'pinstart');
    ps.textContent = api.t('pinStart');
    ps.addEventListener('click', function () {
      /* ⚠ re-pinning the start MUST clear the end, or start > end wraps
         the duration through 12 hours with no visible rule */
      self.elapsed = { start: self.total, end: null };
      self.render();
    });
    var pe = api.el('button', 'lck-chip' + (this.elapsed.start !== null && this.elapsed.end === null ? ' cta' : ''));
    pe.type = 'button'; pe.setAttribute('data-fk', 'pinend');
    pe.textContent = api.t('pinEnd');
    if (this.elapsed.start === null) { pe.setAttribute('aria-disabled', 'true'); pe.classList.add('inert'); }
    pe.addEventListener('click', function () {
      if (self.elapsed.start === null) { self._speakNow(api.t('elapsedIdle')); return; }
      self.elapsed.end = self.total;
      self.render();
      self._speakNow(self._elapsedText());
    });
    var pc = api.el('button', 'lck-chip');
    pc.type = 'button'; pc.setAttribute('data-fk', 'pinclear');
    pc.textContent = api.t('elapsedClear');
    if (this.elapsed.start === null) { pc.setAttribute('aria-disabled', 'true'); pc.classList.add('inert'); }
    pc.addEventListener('click', function () {
      if (self.elapsed.start === null) { self._speakNow(api.t('elapsedIdle')); return; }
      self.elapsed = { start: null, end: null };
      self.render();
    });
    row.append(ps, pe, pc);
    er.appendChild(row);
    return er;
  },

  /* ---------------------- hint band ------------------------------- */

  _hintKey: function () {
    if (this.mode === 'task') return this.task.phase === 'done' ? 'hintTaskDone' : 'hintTaskSet';
    /* there used to be no resolved state, so once both marks were down the
       band still said "now set the finishing time" — instructing a move
       already made, permanently, with the answer on screen */
    if (this.mode === 'elapsed') {
      if (this.elapsed.start === null) return 'hintElapsedA';
      return this.elapsed.end === null ? 'hintElapsedB' : 'hintElapsedC';
    }
    return 'hintDrag';
  },
  _buildHint: function () {
    var h = this.api.el('div', 'lck-hint');
    h.setAttribute('role', 'status');
    h.textContent = this.api.t(this._hintKey());
    this._hintEl = h;
    return h;
  },

  /* ---------------------- the dock -------------------------------- */

  _buildDock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'lck-dock');

    /* step ladder */
    var grp = api.el('div', 'lck-group');
    var gl = api.el('span', 'lck-glbl'); gl.textContent = api.t('granLbl');
    grp.appendChild(gl);
    var steps = api.el('div', 'lck-steps');
    steps.setAttribute('role', 'radiogroup');
    steps.setAttribute('aria-label', api.t('granLbl'));
    var LBL = { '60': 'granHour', '30': 'granHalf', '15': 'granQuarter', '5': 'granFive', '1': 'granMinute' };
    this.STEPS.forEach(function (s) {
      var free = self._stepFree(s);
      var b = api.el('button', 'lck-step' + (self.step === s ? ' active' : '') + (free ? '' : ' locked'));
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(self.step === s));
      b.setAttribute('aria-label', api.t(LBL[s]));
      b.setAttribute('data-fk', 'step-' + s);
      b.setAttribute('data-g', s);
      /* ⚠ A LANGUAGE-FREE DIAL GLYPH, not `1h ½ ¼ 5 1` — the shipped set
         mixed two fractions, one numeral+unit and two bare numerals with
         no unit, so "5" and "1" said nothing at all. */
      b.appendChild(self._stepGlyph(parseInt(s, 10)));
      /* the padlock marks what THIS visitor cannot reach, not what the
         free tier excludes — a subscriber was still shown a locked chip */
      if (!free && !self.premium) b.appendChild(self._lockGlyph());
      b.addEventListener('click', function () {
        if (!free && !self.premium) { self._showGate('gateGran'); return; }
        if (self.step === s) return;
        self.step = s;
        /* the coupling is pedagogically right; make it VISIBLE and
           restore the teacher's own toggle on the way back out */
        if (parseInt(s, 10) <= 5) {
          if (self._ringAuto === undefined) self._ringAuto = api.settings.minuteRing;
          api.settings.minuteRing = true;
        } else if (self._ringAuto !== undefined) {
          api.settings.minuteRing = self._ringAuto;
          self._ringAuto = undefined;
        }
        self._snapToStep();
        self._saveStore();
        self.render();
        self._bubbleFinal(true);
      });
      steps.appendChild(b);
    });
    grp.appendChild(steps);
    dock.appendChild(grp);

    /* hand view — the one-handed clock, free */
    var vg = api.el('div', 'lck-group');
    var vl = api.el('span', 'lck-glbl'); vl.textContent = api.t('viewLbl');
    vg.appendChild(vl);
    var views = api.el('div', 'lck-steps');
    views.setAttribute('role', 'radiogroup');
    views.setAttribute('aria-label', api.t('viewLbl'));
    [['both', 'viewBoth'], ['hour', 'viewHour'], ['minute', 'viewMinute']].forEach(function (d) {
      var b = api.el('button', 'lck-step' + (self.view === d[0] ? ' active' : ''));
      b.type = 'button';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(self.view === d[0]));
      b.setAttribute('aria-label', api.t(d[1]));
      b.setAttribute('data-fk', 'view-' + d[0]);
      b.appendChild(self._viewGlyph(d[0]));
      b.addEventListener('click', function () {
        if (self.view === d[0]) return;
        self.view = d[0];
        self.render();
      });
      views.appendChild(b);
    });
    vg.appendChild(views);
    dock.appendChild(vg);

    /* our times + print */
    var acts = api.el('div', 'lck-group');
    var ot = api.el('button', 'lck-chip' + (this.premium ? '' : ' locked'));
    ot.type = 'button'; ot.setAttribute('data-fk', 'ourtimes');
    ot.textContent = api.t('ourTimes');
    if (!this.premium) ot.appendChild(this._lockGlyph());
    ot.addEventListener('click', function () {
      if (!self.premium) { self._showGate('gateSaves'); return; }
      self._openPanel();
    });
    acts.appendChild(ot);

    var pr = api.el('button', 'lck-chip' + (this.premium ? '' : ' locked'));
    pr.type = 'button'; pr.setAttribute('data-fk', 'print');
    pr.textContent = api.t('printBtn');
    if (!this.premium) pr.appendChild(this._lockGlyph());
    pr.addEventListener('click', function () {
      if (!self.premium) { self._showGate('gatePrint'); return; }
      try { window.print(); } catch (_) { /* no printer in a headless gate */ }
    });
    acts.appendChild(pr);
    dock.appendChild(acts);

    return dock;
  },

  _stepGlyph: function (min) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 40 40'); s.setAttribute('width', '22'); s.setAttribute('height', '22');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('class', 'lck-stepglyph');
    var n = Math.round(60 / min), marks = '';
    if (n > 24) { /* 1-minute: a full ring of fine marks reads as "every one" */
      marks = '<circle cx="20" cy="20" r="14.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-dasharray="1.2 2.1"/>';
    } else {
      for (var i = 0; i < n; i++) {
        var a = i * (360 / n) * Math.PI / 180;
        marks += '<line x1="' + (20 + Math.sin(a) * 11).toFixed(1) + '" y1="' + (20 - Math.cos(a) * 11).toFixed(1) +
                 '" x2="' + (20 + Math.sin(a) * 16).toFixed(1) + '" y2="' + (20 - Math.cos(a) * 16).toFixed(1) +
                 '" stroke="currentColor" stroke-width="' + (n <= 4 ? 3.6 : 2.6) + '" stroke-linecap="round"/>';
      }
    }
    s.innerHTML = '<circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" stroke-width="2" opacity=".34"/>' + marks;
    return s;
  },
  _viewGlyph: function (v) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 40 40'); s.setAttribute('width', '22'); s.setAttribute('height', '22');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('class', 'lck-stepglyph');
    var hourH = '<line x1="20" y1="20" x2="20" y2="11.5" stroke="currentColor" stroke-width="4.2" stroke-linecap="round"/>';
    var minH = '<line x1="20" y1="20" x2="28.5" y2="24" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>';
    s.innerHTML = '<circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" stroke-width="2" opacity=".34"/>' +
      (v === 'minute' ? '' : hourH) + (v === 'hour' ? '' : minH) +
      '<circle cx="20" cy="20" r="2.4" fill="currentColor"/>';
    return s;
  },

  /* ---------------------- painting -------------------------------- */

  _paint: function () {
    if (!this._svg) return;
    var G = this.G;
    var hourA = this.hourAngle(this.total);
    var minA = this.minuteAngle(this.total);
    this._hourHand.setAttribute('transform', 'rotate(' + hourA.toFixed(2) + ' ' + G.C + ' ' + G.C + ')');
    this._minHand.setAttribute('transform', 'rotate(' + minA.toFixed(2) + ' ' + G.C + ' ' + G.C + ')');
    this._hourHand.setAttribute('opacity', this.view === 'minute' ? '0' : '1');
    this._minHand.setAttribute('opacity', this.view === 'hour' ? '0' : '1');
    if (this._gripH) this._gripH.style.display = this.view === 'minute' ? 'none' : '';
    if (this._gripM) this._gripM.style.display = this.view === 'hour' ? 'none' : '';

    /* grips ride the hands */
    this._placeGrip('hour', hourA, G.gripHourR);
    this._placeGrip('minute', minA, G.gripMinR);

    /* ⚠ THE 24-HOUR RING MUST TELL THE TRUTH. The shipped build wrote
       h+12 unconditionally, so at 03:00 it labelled the 3 position "15" —
       wrong half the time. Deriving it from `pm` also makes the am/pm
       choice visibly change the face, which is the lesson. */
    var pmv = this.pm;
    (this._ring24Els || []).forEach(function (e) {
      var v = pmv ? (e.h % 12) + 12 : (e.h % 12);
      e.el.textContent = (v < 10 ? '0' : '') + v;
    });

    this._paintBand();
    this._paintNight();
    this._paintDigital();
    this._paintAria();
  },
  _placeGrip: function (which, deg, r) {
    var el = which === 'hour' ? this._gripH : this._gripM;
    if (!el) {
      el = this._wrap && this._wrap.querySelector('.lck-grip-' + which);
      if (!el) return;
      if (which === 'hour') this._gripH = el; else this._gripM = el;
    }
    var a = deg * Math.PI / 180;
    el.style.left = (50 + Math.sin(a) * r / 10) + '%';
    el.style.top = (50 - Math.cos(a) * r / 10) + '%';
  },
  _paintAria: function () {
    var txt = this._say();
    [this._gripH, this._gripM].forEach(function (el) {
      if (!el) return;
      el.setAttribute('aria-valuenow', String(Math.round(this.total)));
      /* ⭐ valuetext is MANDATORY here — a raw 0…719 is meaningless on a
         clock, and this is the one place the tool's best asset (the
         colloquial reading) reaches a screen-reader user. */
      el.setAttribute('aria-valuetext', txt);
    }, this);
  },
  _paintNight: function () {
    var n = this._night();
    if (this._nightState === n) return;
    this._nightState = n;
    document.body.classList.toggle('lck-night', n);
    var ff = this._svg && this._svg.querySelector('.lck-facefill');
    if (ff) ff.setAttribute('fill', n ? 'url(#lckFaceNight)' : 'url(#lckFace)');
  },
  _paintDigital: function () {
    if (!this._d1) return;
    var mode = this.api.settings.digital;
    if (mode === '24') this._d1.textContent = this._h24();
    else this._d1.textContent = this._digitalOf();
    if (this._d2) this._d2.textContent = this._h24();
  },

  _bubbleLive: function () {
    if (!this._bubbleEl) return;
    /* THE ONE MODE WHERE YOU MUST SET TWO TIMES WAS THE ONE THAT NEVER
       SAID EITHER. Both bubble paths returned early in elapsed mode, so
       while a child dragged to choose the start the bubble read "Set a
       starting time" and the only readout left was a digital line the
       teacher can switch off. */
    if (this.mode === 'elapsed') {
      var ge = this._gran();
      this._bubbleEl.textContent = this._say(this.snapTo(this.total, ge));
      if (this._bubbleEl.parentNode) this._bubbleEl.parentNode.classList.add('live');
      return;
    }
    var g = this._gran();
    var t = this.snapTo(this.total, g);
    this._bubbleEl.textContent = this._say(t);
    /* ⚠ THE READING MUST NOT FADE WHILE THIRTY CHILDREN WATCH IT CHANGE.
       The shipped build dimmed it to .55 during a drag; it now lifts. */
    if (this._bubbleEl.parentNode) this._bubbleEl.parentNode.classList.add('live');
    /* speakDrag, which used to be a toggle wired to two identical branches */
    if (this.api.settings.speakDrag && this._gesture && this._gesture.lastSpoke !== t) {
      this._gesture.lastSpoke = t;
      this._speakNow(this._say(t));
    }
  },
  _bubbleFinal: function (speak) {
    if (!this._bubbleEl) return;
    if (this.mode === 'elapsed') {
      this._bubbleEl.textContent = this._elapsedText();
      if (this._bubbleEl.parentNode) this._bubbleEl.parentNode.classList.remove('live');
      if (speak) this._speakNow(this._elapsedText());
      return;
    }
    var text = this._say();
    this._bubbleEl.textContent = text;
    if (this._bubbleEl.parentNode) this._bubbleEl.parentNode.classList.remove('live');
    if (speak) this._speakNow(text);
  },

  /* ---- the explainer arc, on the bezel ---------------------------
     ⭐ towardNext IS DERIVED FROM THE RESOLVED TEMPLATE, never from a
     hardcoded locale list plus a threshold. The shipped build used
     ['de','nl','sv','da','no','fi'] with m >= 20 — but de and sv switch
     to the coming hour at :25, not :20 (`zwanzig nach {H}` names the
     CURRENT hour), so the arc pointed the wrong way at :20 in the two
     locales the feature exists to convert; and under the deQuarter
     overlay `viertel {N}` names the coming hour at :15 while the past
     branch haloed the current one. Reading the template is
     locale-general, self-maintaining and correct for both. */
  _template: function (m) {
    var rules = this.TIME_RULES[this.api.lang] || this.TIME_RULES.en;
    var key = Math.round(m / 5) * 5;
    if (key >= 60) key = 0;
    if (this._store.deQuarter && rules.overlays && rules.overlays.deQuarter &&
        rules.overlays.deQuarter[key] !== undefined) return rules.overlays.deQuarter[key];
    return (rules.positions && rules.positions[key]) || null;
  },
  _towardNext: function (m) {
    var tpl = this._template(m);
    if (!tpl) return m > 30;
    return /\{N2?3?\}/.test(tpl);
  },
  /* the distinctive word of the :30 phrase — whatever it carries that the
     :05 phrase does not, at four letters or more so a shared particle
     like French `et` cannot qualify. Derived, never listed. */
  _halfTokens: function () {
    var lang = this.api.lang;
    this._halfTok = this._halfTok || {};
    if (this._halfTok[lang] !== undefined) return this._halfTok[lang];
    var r = this.TIME_RULES[lang] || this.TIME_RULES.en;
    var words = function (t) {
      return String(t || '').replace(/\{\w+\}/g, ' ').toLowerCase()
        .split(/[^a-z\u00c0-\u024f]+/).filter(function (x) { return x.length >= 4; });
    };
    var half = words(r.positions && r.positions[30]);
    var five = words(r.positions && r.positions[5]);
    var only = half.filter(function (x) { return five.indexOf(x) < 0; });
    this._halfTok[lang] = only.length ? only : null;
    return this._halfTok[lang];
  },
  /* THE ANCHOR THE PHRASE NAMES — the minute mark the distance runs to.
     MEASURED before it was written: at 2:25 Swedish says `fem i halv 3`,
     five minutes to the HALF mark, and the arc swept 150 degrees to 360 —
     THIRTY-FIVE minutes, a number the phrase never says. Same in de, nl,
     da, no and fi at :20 :25 :35 :40, which is exactly the zone `_pool`
     calls the reason this tool exists. It was correct in English
     throughout, which is why no gate and no English reader caught it;
     two native panels found it independently, reading the model. */
  _arcAnchor: function (m) {
    var tpl = this._template(m);
    if (!tpl) return m > 30 ? 60 : 0;
    var toks = this._halfTokens();
    if (toks) {
      var low = String(tpl).toLowerCase();
      for (var i = 0; i < toks.length; i++) if (low.indexOf(toks[i]) >= 0) return 30;
    }
    return /\{N2?3?\}/.test(tpl) ? 60 : 0;
  },
  _explain: function () {
    var self = this, G = this.G;
    var m = this._m();
    var anchor = this._arcAnchor(m);
    var toward = this._towardNext(m);
    var refHour, a0, a1;
    /* on the hour the phrase names NO distance, so it draws none — a full
       lap for "no offset" read as "a whole hour" */
    if (m === 0) { refHour = this._h(); a0 = 0; a1 = 0; }
    else if (anchor === 30) {
      refHour = toward ? (this._h() % 12 + 1) : this._h();
      if (m < 30) { a0 = m * 6; a1 = 180; } else { a0 = 180; a1 = m * 6; }
    }
    else if (anchor === 60) { refHour = this._h() % 12 + 1; a0 = m * 6; a1 = 360; }
    else { refHour = this._h(); a0 = 0; a1 = m * 6; }
    if (this._whyEl) this._whyEl.setAttribute('aria-pressed', 'true');

    var r = G.bezelR;
    var noSpan = (a1 - a0) < 0.5;
    var large = (a1 - a0) > 180 ? 1 : 0;
    function pt(deg) { var a = deg * Math.PI / 180; return [G.C + Math.sin(a) * r, G.C - Math.cos(a) * r]; }
    var p0 = pt(a0), p1 = pt(a1);
    this._arcEl.setAttribute('d', 'M' + p0[0].toFixed(1) + ' ' + p0[1].toFixed(1) +
      ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + p1[0].toFixed(1) + ' ' + p1[1].toFixed(1));
    this._arcEl.setAttribute('opacity', noSpan ? '0' : '1');
    this._pinA.setAttribute('cx', p0[0]); this._pinA.setAttribute('cy', p0[1]); this._pinA.setAttribute('opacity', noSpan ? '0' : '1');
    this._pinB.setAttribute('cx', p1[0]); this._pinB.setAttribute('cy', p1[1]); this._pinB.setAttribute('opacity', noSpan ? '0' : '1');
    var tgt = this._numEls[((refHour - 1) % 12) + 1];
    if (tgt) { tgt.halo.setAttribute('opacity', '0.85'); tgt.text.classList.add('lit'); }

    var hold = this._reducedMotion() ? 1600 : 2400;
    this._after(hold, function () {
      self._arcEl.setAttribute('opacity', '0');
      self._pinA.setAttribute('opacity', '0');
      self._pinB.setAttribute('opacity', '0');
      if (tgt) { tgt.halo.setAttribute('opacity', '0'); tgt.text.classList.remove('lit'); }
      if (self._whyEl) self._whyEl.setAttribute('aria-pressed', 'false');
    });
  },

  /* ---- elapsed: TWO RINGS, colour-coded to the hands --------------
     ⚠ The shipped band split laps at hour boundaries and then drew every
     lap at the SAME radius, so lap 2 overdrew lap 1 and 60, 90 and 120
     minutes were indistinguishable — on the tool whose whole job is "how
     long". Its only lap cue was a fade that made MORE time look like
     LESS. Small ring counts hours, big ring counts minutes: the same
     short-hand/long-hand relationship, so it needs no legend. */
  _paintBand: function () {
    var G = this.G, C = this.C;
    if (!this._bandGroup) return;
    while (this._bandGroup.firstChild) this._bandGroup.removeChild(this._bandGroup.firstChild);
    if (this._ghostH) this._ghostH.setAttribute('opacity', this._ghostShown ? '0.3' : '0');
    if (this._ghostM) this._ghostM.setAttribute('opacity', this._ghostShown ? '0.3' : '0');
    if (this.mode !== 'elapsed' || this.elapsed.start === null) return;

    var ns = 'http://www.w3.org/2000/svg';
    var start = this.elapsed.start;
    var end = this.elapsed.end !== null ? this.elapsed.end : this.total;
    var dur = Math.round((((end - start) % 720) + 720) % 720);
    var hours = Math.floor(dur / 60), mins = dur % 60;

    var self = this;
    function ring(r, sweepDeg, color) {
      var track = document.createElementNS(ns, 'circle');
      track.setAttribute('cx', G.C); track.setAttribute('cy', G.C); track.setAttribute('r', r);
      track.setAttribute('fill', 'none'); track.setAttribute('stroke', color);
      track.setAttribute('stroke-width', 28); track.setAttribute('opacity', '0.13');
      self._bandGroup.appendChild(track);
      if (sweepDeg <= 0) return;
      var s = Math.min(sweepDeg, 359.9);
      var large = s > 180 ? 1 : 0;
      var a1 = s * Math.PI / 180;
      var x0 = G.C, y0 = G.C - r;
      var x1 = G.C + Math.sin(a1) * r, y1 = G.C - Math.cos(a1) * r;
      var p = document.createElementNS(ns, 'path');
      p.setAttribute('d', 'M' + x0 + ' ' + y0 + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1));
      p.setAttribute('fill', 'none'); p.setAttribute('stroke', color);
      p.setAttribute('stroke-width', 28); p.setAttribute('stroke-linecap', 'round');
      /* the ring and the hand it is colour-matched to cross each other;
         the ring yields so the live hands stay the dominant reading */
      p.setAttribute('opacity', '0.62');
      self._bandGroup.appendChild(p);
    }
    ring(G.elapsedHourR, hours * 30, C.T);
    ring(G.elapsedMinR, mins * 6, C.CORAL);

    /* the start pose as ghost hands — direction, which a bare span lacks */
    var gh = (start / 2), gm = (start % 60) * 6;
    this._ghostH.setAttribute('transform', 'rotate(' + gh.toFixed(2) + ' ' + G.C + ' ' + G.C + ')');
    this._ghostM.setAttribute('transform', 'rotate(' + gm.toFixed(2) + ' ' + G.C + ' ' + G.C + ')');
    this._ghostH.setAttribute('opacity', '0.3');
    this._ghostM.setAttribute('opacity', '0.3');
  },
  _elapsedText: function () {
    if (this.elapsed.start === null) return this.api.t('elapsedIdle');
    var end = this.elapsed.end !== null ? this.elapsed.end : this.total;
    var dur = Math.round((((end - this.elapsed.start) % 720) + 720) % 720);
    if (dur < 60) return this.fmt('durMinutes', { n: dur });
    return this.fmt('durHours', { h: Math.floor(dur / 60), m: dur % 60 });
  },

  /* ---- the target ghost: shown on a wrong Check, never the answer
     given away — it fades, and the child still has to move the hands ---- */
  _showTargetGhost: function (ms, which) {
    var self = this, G = this.G;
    if (this.task.target === null || !this._ghostH) return;
    var t = this.task.target;
    this._ghostH.setAttribute('transform', 'rotate(' + (t / 2).toFixed(2) + ' ' + G.C + ' ' + G.C + ')');
    this._ghostM.setAttribute('transform', 'rotate(' + ((t % 60) * 6).toFixed(2) + ' ' + G.C + ' ' + G.C + ')');
    this._ghostShown = true;
    this._ghostH.setAttribute('opacity', which === 'minute' ? '0' : '0.3');
    this._ghostM.setAttribute('opacity', which === 'hour' ? '0' : '0.3');
    this._after(ms || 2000, function () {
      self._ghostShown = false;
      if (self._ghostH) self._ghostH.setAttribute('opacity', '0');
      if (self._ghostM) self._ghostM.setAttribute('opacity', '0');
    });
  },

  /* ---------------------- practice -------------------------------- */

  /* ⭐ ROUND POOLS BY IDIOM ZONE, NOT UNIFORM STRIDE. The shipped stride
     walk could miss :20–:25 and :35–:40 entirely — and those two zones
     are where the whole halb-relative and subtractive idiom lives
     (fünf vor halb, tien voor half tien, ti på halv, menos veinticinco).
     Coverage of them is a correctness requirement of THIS tool. */
  _pool: function () {
    var g = this._gran(), pool = [], h, i;
    if (g === 60) { for (h = 0; h < 12; h++) pool.push(h * 60); return pool; }
    if (g === 30) { for (h = 0; h < 12; h++) { pool.push(h * 60); pool.push(h * 60 + 30); } return pool; }
    if (g === 15) {
      for (h = 0; h < 12; h++) [0, 15, 30, 45].forEach(function (m) { pool.push(h * 60 + m); });
      return this._sampleCovering(pool, [[0, 0], [15, 15], [30, 30], [45, 45]], 24);
    }
    if (g === 5) {
      for (h = 0; h < 12; h++) for (i = 0; i < 60; i += 5) pool.push(h * 60 + i);
      return this._sampleCovering(pool, [[0, 0], [15, 15], [30, 30], [45, 45], [20, 25], [35, 40]], 24);
    }
    /* 1-minute: curated NEAR THE HOUR. "Two thirty-seven" is not a K-2
       task in any of the eleven, and the shipped build asked for 24
       uniformly random minutes. */
    for (h = 0; h < 12; h++) [1, 2, 3, 4, 56, 57, 58, 59].forEach(function (m) { pool.push(h * 60 + m); });
    return this._shuffle(pool).slice(0, 24);
  },
  /* ⚠⚠ IT USED TO STARVE FOUR MARKS COMPLETELY. With per = floor(24/6) = 4
     the six zones filled all 24 slots and the remainder was sliced to
     zero, so :05, :10, :50 and :55 were NEVER offered — measured by a
     native panel over 400 draws (5:0  10:0  50:0  55:0). Those are the
     FIRST five-minute idioms every one of the eleven teaches ("five past",
     "fünf nach", "cinco e cinco", "ti i seks"). The comment above _pool
     claimed idiom-zone coverage and had quietly bought it by deleting a
     third of the clock. The zones now take at most HALF the round and the
     rest of the dial keeps the other half. */
  _sampleCovering: function (pool, zones, n) {
    var out = [], self = this;
    var quota = Math.max(1, Math.floor(n / 2));
    var per = Math.max(1, Math.floor(quota / zones.length));
    zones.forEach(function (z) {
      var band = pool.filter(function (t) { var m = t % 60; return m >= z[0] && m <= z[1]; });
      out = out.concat(self._shuffle(band).slice(0, per));
    });
    var rest = pool.filter(function (t) { return out.indexOf(t) < 0; });
    out = out.concat(this._shuffle(rest).slice(0, Math.max(0, n - out.length)));
    return this._shuffle(out);
  },
  _shuffle: function (a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  },
  _nextTask: function () {
    if (!this.task.order.length || this.task.idx >= this.task.order.length) {
      var prev = this.task.order.length ? this.task.order[this.task.order.length - 1] : null;
      var pool = this._shuffle(this._pool());
      if (pool.length > 1 && pool[0] === prev) { var t0 = pool[0]; pool[0] = pool[1]; pool[1] = t0; }
      this.task.order = pool;
      this.task.idx = 0;
    }
    this.task.target = this.task.order[this.task.idx];
    this.task.idx += 1;
    this.task.phase = 'set';
    this.task.misses = 0;
    /* TWO FACES, AND THE COMMENT USED TO PROMISE THREE. `% 3` against a
       renderer that branches only on face===1 made every third round
       identical to the first — a third of practice silently doing nothing
       it was designed to do. Four panels found it independently. */
    this.task.face = this.task.done % 2;      /* worded | digital */
    /* ⚠ THE TOLERANCE MUST BELONG TO THE TARGET, NOT TO THE DIAL. It was
       read from the CURRENT step, so a target drawn at 5 minutes and then
       judged after switching to Hours passed anything within half an hour
       — the tool congratulating a clock showing 3:00 for a 3:25 task. */
    this.task.gran = this._gran();
    this.view = 'both';
    this._taskNote = (this.task.done > 0 && this.task.done % 5 === 0) ? this.api.t('niceBreak') : null;
    this._taskNoteKind = 'good';
    /* ⭐⭐ A NEUTRAL START POSE. The shipped build used
       `(target + 180) % 720` — 180 MINUTES is exactly three hours, so the
       minute hand began ON THE ANSWER in 948 of 948 measured rounds, at
       every granularity. Practice never once asked a child to set it.
       The rule reused here is clock-core.js:119. */
    this.total = this.startPoseFor(this.task.target);
    this._speakNow(this.fmt('taskPrompt', { time: this._say(this.task.target) }));
    this.render();
  },
  _checkTask: function () {
    var g = this.task.gran || this._gran();
    var hit = Math.abs(this.total - this.task.target) < (g / 2) ||
              Math.abs(this.total - this.task.target) > (720 - g / 2);
    if (hit) {
      this.total = this.task.target;
      this.task.phase = 'done';
      this.task.done += 1;
      this._taskNote = this.fmt('youMade', { time: this._say() });
      this._taskNoteKind = 'good';
      this.render();
      this._speakNow(this._say());
      var card = this._wrap && this._wrap.querySelector('.lck-face');
      if (card) { card.classList.remove('glow'); void card.offsetWidth; card.classList.add('glow'); }
      return;
    }
    /* ⭐ ONE DIAGNOSIS, NEVER A MARK, NAMING ONLY THE NEXT MOVE. */
    this.task.misses += 1;
    var minutesRight = this._m() === this._m(this.task.target);
    var hourRight = Math.floor(this.total / 60) === Math.floor(this.task.target / 60);
    this._taskNote = this.api.t(minutesRight ? 'nudgeMinute' : (hourRight ? 'nudgeHour' : 'nudgeBoth'));
    this._taskNoteKind = 'nudge';
    this.render();
    this._showTargetGhost(2000);
    this._speakNow(this._taskNote);
  },

  /* ---------------------- misc lifecycle -------------------------- */

  reset: function () {
    this.mode = 'explore';
    this.total = 150;
    this.pm = true;
    this.view = 'both';
    this._fiveCount = null;
    this._gate = null;
    this.task = { order: [], idx: 0, phase: 'set', target: null, done: 0, misses: 0, face: 0 };
    this.elapsed = { start: null, end: null };
    this._taskNote = null;
    if (this._panelEl) this._closePanel();
    this.render();
  },
  onSettings: function () {
    this._saveStore();
    /* ⚠ the shell's commitSettings already calls render() — calling it
       here too rebuilt the whole SVG twice on every toggle */
  },
  paint: function () {},

  /* one-time nudge: the hands rock once so the affordance is visible
     even to a child who cannot read the hint */
  _maybeNudge: function () {
    var self = this;
    if (this._nudged || this.mode !== 'explore') return;
    this._nudged = true;
    if (this._reducedMotion()) {
      this._after(700, function () {
        var el = self._wrap && self._wrap.querySelector('.lck-grip-minute');
        if (el) { el.classList.add('pulse'); self._after(400, function () { el.classList.remove('pulse'); }); }
      });
      return;
    }
    this._after(900, function () {
      if (self._nudgeOff || !self._minHand) return;
      var mA = (self.total % 60) * 6, G = self.G;
      var seq = [7, -7, 5, -5, 0], i = 0;
      var stepFn = function () {
        if (self._nudgeOff || !self._minHand) return;
        self._minHand.setAttribute('transform', 'rotate(' + (mA + seq[i]) + ' ' + G.C + ' ' + G.C + ')');
        var el = self._wrap && self._wrap.querySelector('.lck-grip-minute');
        if (el) el.classList.toggle('pulse', i < seq.length - 1);
        i++;
        if (i < seq.length) self._after(150, stepFn);
        else { self._paint(); if (el) el.classList.remove('pulse'); }
      };
      stepFn();
    });
  },
  _nudgeCancel: function () {
    this._nudgeOff = true;
    var el = this._wrap && this._wrap.querySelector('.lck-grip-minute.pulse');
    if (el) el.classList.remove('pulse');
  },

  /* ---------------------- gate + panel ---------------------------- */

  _showGate: function (key) {
    this._gate = key;
    this.render();
    var self = this;
    this._after(14000, function () { if (self._gate === key) { self._gate = null; if (self._wrap) self.render(); } });
  },
  _buildGate: function () {
    var api = this.api;
    var g = api.el('div', 'lck-gate');
    g.setAttribute('role', 'status');
    /* ⚠ TWO NODES, NEVER A CONCATENATION — joining them makes the one
       actionable thing unclickable, and it is a localisation smell. */
    var sp = api.el('span');
    sp.textContent = api.t(this._gate);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-learning-clock';
    a.target = '_top';
    a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.appendChild(sp); g.appendChild(a);
    return g;
  },

  _openPanel: function () {
    if (!this._panelEl) this._buildPanel();
    this._renderPanel();
    this._scrimEl.classList.add('open');
    this._panelEl.classList.add('open');
    var f = this._panelEl.querySelector('button, input');
    if (f) try { f.focus(); } catch (_) {}
  },
  _closePanel: function () {
    if (!this._panelEl) return;
    this._scrimEl.classList.remove('open');
    this._panelEl.classList.remove('open');
    var back = this._wrap && this._wrap.querySelector('[data-fk="ourtimes"]');
    if (back) try { back.focus(); } catch (_) {}
  },
  _buildPanel: function () {
    var api = this.api, self = this;
    var host = document.querySelector('.lcs-app') || document.body;
    var scrim = api.el('div', 'lck-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'lck-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', api.t('ourTimes'));
    panel.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { e.preventDefault(); self._closePanel(); }
    });
    host.appendChild(scrim); host.appendChild(panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },
  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';
    var head = api.el('div', 'lck-panel-head');
    var h = api.el('div', 'lck-panel-title');
    h.textContent = api.t('ourTimes');
    var x = api.el('button', 'lck-panel-close');
    x.type = 'button';
    /* ⚠ THE CLOSE BUTTON USED TO ANNOUNCE "DELETE" — it reused the
       per-row delete string, so a screen-reader user was told the close
       control removed something. */
    x.setAttribute('aria-label', api.t('closeBtn'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); });
    head.append(h, x);
    panel.appendChild(head);

    var body = api.el('div', 'lck-panel-body');
    (this._store.ourTimes || []).forEach(function (ot, i) {
      var row = api.el('div', 'lck-prow');
      var play = api.el('button', 'lck-chip');
      play.type = 'button';
      var total = ((ot.h % 12) * 60 + ot.m);
      play.textContent = ot.label + ' — ' + self.sayTime(api.lang, ot.h, ot.m, { deQuarter: !!self._store.deQuarter });
      play.addEventListener('click', function () {
        self.mode = 'task';
        self.task.target = total;
        self.task.phase = 'set';
        self.task.misses = 0;
        self.task.face = 0;
        self.pm = !!ot.pm;
        self.total = self.startPoseFor(total);
        self._taskNote = null;
        self._closePanel();
        self.render();
        self._speakNow(self.fmt('setOurTime', { label: ot.label, time: self.sayTime(api.lang, ot.h, ot.m, { deQuarter: !!self._store.deQuarter }) }));
      });
      var del = api.el('button', 'lck-linkbtn danger');
      del.type = 'button';
      del.textContent = '✕';
      del.setAttribute('aria-label', api.t('deleteBtn') + ' — ' + ot.label);
      del.addEventListener('click', function () {
        self._store.ourTimes.splice(i, 1);
        self._saveStore();
        self._renderPanel();
      });
      row.append(play, del);
      body.appendChild(row);
    });

    var comp = api.el('div', 'lck-composer');
    var lbl = document.createElement('label');
    lbl.className = 'lck-complbl';
    lbl.setAttribute('for', 'lck-newname');
    lbl.textContent = api.t('addTime') + ' — ' + this._say();
    var nameIn = document.createElement('input');
    nameIn.className = 'lck-input';
    nameIn.id = 'lck-newname';
    nameIn.type = 'text';
    nameIn.maxLength = 30;
    nameIn.placeholder = api.t('timeLabelPh');
    var save = api.el('button', 'lck-chip');
    save.type = 'button';
    save.textContent = '+';
    save.setAttribute('aria-label', api.t('addTime'));
    var full = (this._store.ourTimes || []).length >= this.MAX_SAVED;
    if (full) { save.setAttribute('aria-disabled', 'true'); save.classList.add('inert'); }
    /* ⚠ THE + USED TO SILENTLY DO NOTHING on an empty name and at the cap
       — the exact dead-control shape the liveness gate exists for. */
    save.addEventListener('click', function () {
      if (full) { self._panelNote(api.t('savedFull')); return; }
      var nm = nameIn.value.trim();
      if (!nm) { self._panelNote(api.t('savedNeedName')); try { nameIn.focus(); } catch (_) {} return; }
      self._store.ourTimes.push({ id: 't' + Math.random().toString(36).slice(2, 8), label: nm,
        h: self._h(), m: self._m(), pm: self.pm });
      self._saveStore();
      nameIn.value = '';
      self._renderPanel();
      self._ensureSheet(self.api.stage);
    });
    comp.append(lbl, nameIn, save);
    body.appendChild(comp);
    var note = api.el('div', 'lck-pnote');
    note.setAttribute('role', 'status');
    this._pnoteEl = note;
    body.appendChild(note);
    panel.appendChild(body);
  },
  _panelNote: function (msg) {
    if (this._pnoteEl) this._pnoteEl.textContent = msg;
    this.api.announce(msg);
  },

  /* ======================= the print sheet =========================
     ⭐⭐ DOUBLE-LOCKED. Gating the CHIP is not gating the FEATURE: Ctrl+P
     is guarded by nobody. The subtree is ABSENT unless entitled AND every
     print rule is scoped `body.lck-paid`, including the chrome-hiding
     ones — scoping only the reveal rules makes a free Ctrl+P print a
     blank page.
     ⚠ LINE ART, NOT FILLS. Chrome ships "Background graphics" OFF for a
     great many teachers, so a fill-drawn sheet comes out of the copier
     as an empty circle. Borders and strokes print unconditionally.
     ⚠ THE SHEET IS A SIBLING OF .lck-wrap, never a descendant — print
     hides the wrap and a child would inherit that. */
  _ensureSheet: function (host) {
    if (!host) return;
    var old = host.querySelector ? host.querySelector('.lck-sheet') : null;
    if (old && old.parentNode) old.parentNode.removeChild(old);
    if (!this.premium) { document.body.classList.remove('lck-paid'); return; }
    host.appendChild(this._buildSheet());
    document.body.classList.add('lck-paid');
  },
  _blankFace: function (opts) {
    /* the SAME geometry as the board — a printed apparatus that differs
       from the board apparatus is a different apparatus */
    var G = this.G, o = opts || {};
    var ns = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('viewBox', '0 0 1000 1000');
    svg.setAttribute('class', 'lck-pface');
    svg.setAttribute('aria-hidden', 'true');
    var parts = ['<circle cx="500" cy="500" r="' + G.bezelR + '" fill="none" stroke="#000" stroke-width="8"/>'];
    for (var i = 0; i < 60; i++) {
      var deg = i * 6, a = deg * Math.PI / 180;
      var major = i % 5 === 0;
      var r1 = major ? G.tickIn : (G.tickOut - 12), r2 = G.tickOut;
      parts.push('<line x1="' + (500 + Math.sin(a) * r1).toFixed(1) + '" y1="' + (500 - Math.cos(a) * r1).toFixed(1) +
        '" x2="' + (500 + Math.sin(a) * r2).toFixed(1) + '" y2="' + (500 - Math.cos(a) * r2).toFixed(1) +
        '" stroke="#000" stroke-width="' + (major ? 10 : 4) + '" stroke-linecap="round"/>');
    }
    for (var h = 1; h <= 12; h++) {
      var ah = h * 30 * Math.PI / 180;
      parts.push('<text x="' + (500 + Math.sin(ah) * G.hourNumR).toFixed(1) + '" y="' + (500 - Math.cos(ah) * G.hourNumR).toFixed(1) +
        '" text-anchor="middle" dominant-baseline="central" font-size="86" font-weight="700" fill="#000">' + h + '</text>');
    }
    if (o.hands) {
      var t = o.hands;
      var ha = (t / 2) * Math.PI / 180, ma = ((t % 60) * 6) * Math.PI / 180;
      parts.push('<line x1="500" y1="500" x2="' + (500 + Math.sin(ha) * G.hourTip).toFixed(1) + '" y2="' + (500 - Math.cos(ha) * G.hourTip).toFixed(1) + '" stroke="#000" stroke-width="26" stroke-linecap="round"/>');
      parts.push('<line x1="500" y1="500" x2="' + (500 + Math.sin(ma) * G.minTip).toFixed(1) + '" y2="' + (500 - Math.cos(ma) * G.minTip).toFixed(1) + '" stroke="#000" stroke-width="13" stroke-linecap="round" fill="none"/>');
    }
    parts.push('<circle cx="500" cy="500" r="18" fill="none" stroke="#000" stroke-width="8"/>');
    svg.innerHTML = parts.join('');
    return svg;
  },
  _sheetTimes: function (n) {
    var g = this._gran(), pool = [], i;
    for (i = 0; i < 720; i += Math.max(g, 5)) pool.push(i);
    return this._shuffle(pool).slice(0, n);
  },
  _buildSheet: function () {
    var api = this.api, self = this;
    var sheet = api.el('div', 'lck-sheet');
    function page(titleKey) {
      var p = api.el('section', 'lck-page');
      var head = api.el('div', 'lck-phead');
      head.textContent = api.t(titleKey);
      p.appendChild(head);
      return p;
    }
    /* 1 — draw the hands, captioned with the WORDED time in this locale.
       Nobody else prints this page with `halb drei` on it. */
    var p1 = page('sheetDraw');
    var g1 = api.el('div', 'lck-pgrid');
    this._sheetTimes(6).forEach(function (t) {
      var cell = api.el('div', 'lck-pcell');
      cell.appendChild(self._blankFace({}));
      var cap = api.el('div', 'lck-pcap');
      cap.textContent = self._say(t);
      cell.appendChild(cap);
      cell.appendChild(api.el('div', 'lck-pbox'));
      g1.appendChild(cell);
    });
    p1.appendChild(g1);
    sheet.appendChild(p1);

    /* 2 — the mirror: hands drawn, write the time */
    var p2 = page('sheetWrite');
    var g2 = api.el('div', 'lck-pgrid');
    this._sheetTimes(6).forEach(function (t) {
      var cell = api.el('div', 'lck-pcell');
      cell.appendChild(self._blankFace({ hands: t }));
      cell.appendChild(api.el('div', 'lck-pbox'));
      cell.appendChild(api.el('div', 'lck-prule'));
      g2.appendChild(cell);
    });
    p2.appendChild(g2);
    sheet.appendChild(p2);

    /* 3 — our times: the only page nobody else can print */
    var p3 = page('sheetOurs');
    var g3 = api.el('div', 'lck-pgrid');
    var ours = (this._store.ourTimes || []).slice(0, 6);
    if (!ours.length) ours = [null, null, null, null, null, null];
    ours.forEach(function (ot) {
      var cell = api.el('div', 'lck-pcell');
      cell.appendChild(self._blankFace({}));
      var cap = api.el('div', 'lck-pcap');
      cap.textContent = ot ? ot.label : '';
      cell.appendChild(cap);
      cell.appendChild(api.el('div', 'lck-prule'));
      g3.appendChild(cell);
    });
    p3.appendChild(g3);
    sheet.appendChild(p3);

    /* 4 — cards to cut out: faces, digitals and words */
    var p4 = page('sheetCards');
    var g4 = api.el('div', 'lck-pcards');
    var times = this._sheetTimes(6);
    times.forEach(function (t) {
      var c = api.el('div', 'lck-pcard');
      c.appendChild(self._blankFace({ hands: t }));
      g4.appendChild(c);
    });
    times.forEach(function (t) {
      var c = api.el('div', 'lck-pcard text');
      c.textContent = self._digitalOf(t);
      g4.appendChild(c);
    });
    times.forEach(function (t) {
      var c = api.el('div', 'lck-pcard text small');
      c.textContent = self._say(t);
      g4.appendChild(c);
    });
    p4.appendChild(g4);
    sheet.appendChild(p4);

    return sheet;
  }
};

if (typeof window !== 'undefined') window.LearningClock = LearningClock;
if (typeof module !== 'undefined' && module.exports) module.exports = LearningClock;

/* =====================================================================
   CSS — stage only, plus the sanctioned body class and the panel.
   ⚠ NO `vh`, NO `vmin`, AND NO HEIGHT-KEYED MEDIA QUERY ANYWHERE. The
   iframe height is set FROM the content height (lcs-shell.js posts
   lcs-activity-resize and ActivityIframe applies it, starting at 420px
   with a 250ms transition), so any height input is a feedback loop:
   continuous units converge on a value pinned by the initial 420 and
   animate visibly, and step functions have two stable states of which
   the small one is the one you start in. The shipped build sized the
   dial `min(52vh,66vw,460px)` and keyed all three wide-board tiers on
   min-height:880/1080/1150 — which is very likely why the wide tiers
   never fired in production.
   ⚠ AND THE FACE IS CAPPED ON WIDTH ONLY. Capping the height of an
   aspect-ratio:1 box yields a RECTANGLE; the SVG then letterboxes while
   the %-positioned grips stay on the wider box, and every grip drifts
   off the hand it drives.
   ===================================================================== */
var lckCssDone = false;
function injectLearningClockCSS() {
  if (lckCssDone) return;
  lckCssDone = true;
  var css = ''
  + 'body.lck-wide .lcs-app{max-width:min(1080px,97vw);}'
  /* ⚠ REACHABILITY. lcs-shell.css sets `html,body{overflow:hidden}`, so on
     a short window the dock and the hint band are simply unreachable —
     measured at 360x486, where the render stopped at the 4 o'clock mark.
     `auto` shows no scrollbar when the content fits, and it CANNOT feed
     back into the iframe height (which comes from .lcs-app's scrollHeight
     via the shell's ResizeObserver, not from body overflow), so it is not
     a height dependency. It is also safe for the drag now: the face
     carries touch-action:none, and the reproduction measured the fix
     working with this scroller present. */
  + 'body.lck-wide{overflow-y:auto;}'
  /* ⚠ AND THE CARD ITSELF, because `.lcs-app{height:100%;overflow:hidden}`
     is what actually clips. cold-line.js:933-949 records the cost of
     leaving it: a tool grew to 942px, was SILENTLY cut off, and "it
     failed in es, pt, it and nl only... English fit, so a single-locale
     check would have called this clean." Measured content heights here
     are 742 at 768 and 898 at 1366 (inside the platform's 900 line), but
     a 1920x1080 board and a long-word locale both exceed their viewport,
     and scrolling is honest where silent truncation is not. This is
     tool-scoped (0,1,1) — it is the sanctioned `body.lck-wide .lcs-app`
     pattern the shell's own comment describes, not a shell edit. */
  + 'body.lck-wide .lcs-app{overflow-y:auto;}'
  + '.lck-wrap{display:flex;flex-direction:column;align-items:center;'
  +   'gap:clamp(8px,1.6vw,16px);width:100%;--lck-face-max:420px;--lck-grip:44px;'
  +   '--lck-chip:46px;--lck-glyph:22px;--lck-d2:20px;}'

  /* modes — above the face, one connected segmented control */
  + '.lck-modes{display:inline-flex;align-items:stretch;border:2px solid var(--lcs-structure);'
  +   'border-radius:var(--lcs-radius-pill);overflow:hidden;background:var(--lcs-surface);'
  +   'box-shadow:var(--lcs-shadow-sm);max-width:100%;flex-wrap:wrap;}'
  + '.lck-mode{display:inline-flex;align-items:center;justify-content:center;gap:6px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:clamp(14px,1.7vw,17px);'
  +   'color:var(--lcs-structure);background:transparent;border:0;'
  +   'padding:9px clamp(12px,2vw,22px);min-height:44px;cursor:pointer;'
  +   'border-right:2px solid var(--lcs-structure);}'
  + '.lck-modes .lck-mode:last-child{border-right:0;}'
  + '.lck-mode.active{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.lck-mode.locked{color:var(--lcs-ink-soft);}'
  + '.lck-lock{flex:none;opacity:.75;}'

  + '.lck-prompt{font-family:var(--lcs-font-display);font-weight:700;color:var(--lcs-structure);'
  +   'font-size:clamp(19px,2.6vw,30px);text-align:center;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius-sm);padding:9px 18px;box-shadow:var(--lcs-shadow-sm);'
  +   'max-width:100%;box-sizing:border-box;}'
  + '.lck-prompt em{color:#C8613A;font-style:normal;}'
  + '.lck-prompt.done{background:#E4F2EC;}'

  /* the layout: GRID, never flex-wrap — a wrap boundary you cannot name
     is what let the old absolutely-positioned sun/moon land beside the
     clock at exactly the wrong width */
  + '.lck-main{display:grid;grid-template-columns:1fr;justify-items:center;'
  +   'gap:clamp(12px,2.4vw,32px);width:100%;}'
  + '.lck-facecol{display:flex;flex-direction:column;width:100%;'
  +   'max-width:var(--lck-face-max);margin-inline:auto;}'
  + '.lck-facehead{display:flex;justify-content:flex-end;align-items:center;min-height:44px;'
  +   'margin-bottom:6px;}'
  + '.lck-face{position:relative;width:100%;aspect-ratio:1;touch-action:none;'
  +   'border-radius:50%;transition:box-shadow .5s;}'
  + '.lck-face.glow{animation:lckGlow 1.2s ease-out;}'
  + '@keyframes lckGlow{0%{box-shadow:0 0 0 0 rgba(242,200,121,.8);}'
  +   '100%{box-shadow:0 0 0 34px rgba(242,200,121,0);}}'
  /* ⭐ THE ROOT DECLARATION. `touch-action` on the SVG <g> the hands used
     to be is not honoured: the browser claimed the gesture after two
     moves and fired pointercancel, which the release handler treated as
     a release — so the hand snapped back before it visibly moved.
     Measured: 150 -> 150 with pointercancel; with this rule, 150 -> 180. */
  + '.lck-svg{display:block;width:100%;height:auto;touch-action:none;overflow:visible;}'
  + '.lck-num{font-family:var(--lcs-font-display);transition:opacity .25s;}'
  + '.lck-num.lit{fill:#0F4A40;}'
  + '.lck-nummin,.lck-num24{font-family:var(--lcs-font-display);}'
  + '.lck-halo{transition:opacity .3s;}'
  + '.lck-arc,.lck-pin{transition:opacity .35s;}'
  + '.lck-hand{transition:transform .04s linear;}'
  + '.lck-wrap.lck-dragging .lck-hand{transition:none;}'
  + '.lck-hand.ghost{transition:opacity .4s;}'
  + '.lck-fivemark{transition:opacity .2s;}'

  /* ⭐ THE GRIPS — 44 CSS px, FIXED, on real buttons, at DIFFERENT RADII
     so the hands never become ambiguous even when perfectly collinear. */
  + '.lck-grip{position:absolute;width:var(--lck-grip);height:var(--lck-grip);'
  +   'margin:calc(var(--lck-grip) / -2) 0 0 calc(var(--lck-grip) / -2);'
  +   'padding:0;border:0;background:transparent;border-radius:50%;cursor:grab;'
  +   'touch-action:none;-webkit-tap-highlight-color:transparent;'
  +   'display:grid;place-items:center;z-index:3;}'
  + '.lck-grip:before{content:"";width:18px;height:18px;border-radius:50%;'
  +   'box-shadow:0 0 0 3px rgba(255,253,247,.92);transition:transform .12s var(--lcs-ease);}'
  + '.lck-grip-hour:before{background:#146B5E;}'
  + '.lck-grip-minute:before{background:transparent;border:5px solid #F2784B;'
  +   'box-shadow:0 0 0 3px rgba(255,253,247,.92),inset 0 0 0 2px rgba(255,253,247,.9);}'
  + '.lck-grip:hover:before{transform:scale(1.16);}'
  + '.lck-grip:active{cursor:grabbing;}'
  + '.lck-grip:active:before{transform:scale(.92);}'
  + '.lck-grip.pulse:before{animation:lckPulse .5s ease-in-out 2;}'
  + '@keyframes lckPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.42);}}'
  + '.lck-grip:focus-visible{outline:3px solid var(--lcs-focus);outline-offset:-2px;border-radius:50%;}'

  /* rail */
  + '.lck-rail{display:flex;flex-direction:column;align-items:center;gap:10px;'
  +   'width:100%;max-width:var(--lck-rail-max,392px);}'
  + '.lck-bubble{position:relative;background:var(--lcs-surface);border-radius:22px;'
  +   'box-shadow:var(--lcs-shadow);padding:15px 18px;width:100%;box-sizing:border-box;'
  +   'display:flex;align-items:center;gap:12px;min-height:82px;'
  +   'transition:box-shadow .18s,transform .18s var(--lcs-ease);}'
  + '.lck-bubble.live{box-shadow:var(--lcs-shadow),0 0 0 3px rgba(242,200,121,.85);transform:translateY(-1px);}'
  + '.lck-bubbletext{flex:1;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(20px,2.5vw,29px);line-height:1.2;color:var(--lcs-structure);text-align:center;}'
  + '.lck-speak{width:46px;height:46px;flex:none;display:grid;place-items:center;border-radius:50%;'
  +   'background:#F2784B;color:#fff;border:none;cursor:pointer;box-shadow:0 3px 0 0 #C8613A;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.lck-speak:active{transform:translateY(2px);box-shadow:0 1px 0 0 #C8613A;}'
  + '.lck-why{display:inline-flex;align-items:center;gap:8px;text-align:left;'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-structure);'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 15px;min-height:44px;cursor:pointer;max-width:100%;}'
  + '.lck-why[aria-pressed="true"]{background:#F2C879;}'
  + '.lck-devariant{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;'
  +   'color:var(--lcs-ink-soft);background:var(--lcs-surface);border:1.5px dashed var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:8px 14px;min-height:44px;cursor:pointer;}'
  + '.lck-digital{display:flex;flex-direction:column;align-items:center;gap:1px;'
  +   'background:var(--lcs-surface);border:3px solid var(--lcs-structure);border-radius:16px;'
  +   'padding:5px 22px;}'
  + '.lck-d1{font-family:var(--lcs-font-display);font-weight:700;font-variant-numeric:tabular-nums;'
  +   'font-size:clamp(26px,3.2vw,40px);color:var(--lcs-structure);line-height:1.1;}'
  + '.lck-d2{font-family:var(--lcs-font-body);font-weight:700;font-variant-numeric:tabular-nums;'
  +   'font-size:clamp(14px,1.7vw,var(--lck-d2));color:var(--lcs-structure);opacity:.62;}'
  + '.lck-taskrail{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.lck-pinrow{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;}'
  + '.lck-tasknote{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;'
  +   'color:var(--lcs-ink);background:#FDF0DC;border-radius:var(--lcs-radius-sm);'
  +   'padding:8px 12px;text-align:center;}'
  + '.lck-tasknote.good{background:#E4F2EC;}'

  /* am/pm */
  + '.lck-ampm{display:inline-flex;border:2px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'overflow:hidden;background:var(--lcs-surface);}'
  + '.lck-half{display:inline-flex;align-items:center;gap:6px;min-height:44px;padding:6px 13px;'
  +   'border:0;background:transparent;color:var(--lcs-ink-soft);cursor:pointer;'
  +   'font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;}'
  + '.lck-half.active{background:var(--lcs-structure-soft);color:var(--lcs-structure);}'
  + '.lck-halflab{white-space:nowrap;}'

  /* hint band — min-height:1lh so it never jumps */
  + '.lck-hint{min-height:1.4em;font-family:var(--lcs-font-body);font-weight:600;'
  +   'font-size:clamp(13px,1.6vw,15.5px);color:var(--lcs-ink-soft);text-align:center;'
  +   'max-width:46ch;padding:0 8px;}'

  /* dock */
  + '.lck-dock{display:flex;align-items:flex-start;justify-content:center;'
  +   'gap:clamp(10px,2vw,26px);flex-wrap:wrap;width:100%;}'
  + '.lck-group{display:flex;flex-direction:column;align-items:center;gap:5px;}'
  + '.lck-glbl{font-family:var(--lcs-font-body);font-weight:700;font-size:11.5px;'
  +   'letter-spacing:.04em;text-transform:uppercase;color:var(--lcs-ink-soft);}'
  + '.lck-steps{display:inline-flex;gap:5px;flex-wrap:wrap;justify-content:center;}'
  + '.lck-step{position:relative;display:inline-flex;align-items:center;justify-content:center;'
  +   'width:var(--lck-chip);height:var(--lck-chip);padding:0;border:1.5px solid var(--lcs-line);'
  +   'border-radius:14px;background:var(--lcs-surface);color:var(--lcs-structure);'
  +   'cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.lck-step:active{transform:scale(.95);}'
  + '.lck-step.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.lck-step.locked{color:var(--lcs-ink-soft);}'
  + '.lck-step .lck-lock{position:absolute;right:1px;bottom:1px;width:11px;height:11px;}'
  + '.lck-stepglyph{width:var(--lck-glyph);height:var(--lck-glyph);}'
  + '.lck-chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 15px;min-height:44px;cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.lck-chip.wide{width:100%;justify-content:center;}'
  + '.lck-chip:active{transform:scale(.96);}'
  + '.lck-chip.cta{background:#F2784B;color:#fff;border-color:#F2784B;}'
  + '.lck-chip.locked{color:var(--lcs-ink-soft);}'
  + '.lck-chip.inert{opacity:.5;}'
  + '.lck-big{min-width:150px;min-height:54px;padding:11px 28px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(16px,2vw,20px);box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.lck-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C8613A,0 6px 14px rgba(20,30,28,.14);}'
  + '.lck-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C8613A;}'

  /* gate */
  + '.lck-gate{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:10px 14px;'
  +   'max-width:520px;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.lck-gate a{color:#C8613A;font-weight:700;text-decoration:underline;}'

  /* panel */
  + '.lck-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;'
  +   'pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.lck-scrim.open{opacity:1;pointer-events:auto;}'
  + '.lck-panel{position:absolute;left:50%;top:5%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(520px,94%);overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;opacity:0;'
  +   'pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);}'
  + '.lck-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.lck-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px;border-bottom:1.5px solid var(--lcs-line);}'
  + '.lck-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:18px;'
  +   'color:var(--lcs-structure);}'
  + '.lck-panel-close{width:44px;height:44px;border:0;background:transparent;'
  +   'color:var(--lcs-structure);cursor:pointer;display:grid;place-items:center;}'
  + '.lck-panel-body{padding:14px 16px 18px;display:flex;flex-direction:column;gap:9px;}'
  + '.lck-prow{display:flex;align-items:center;gap:8px;}'
  + '.lck-prow .lck-chip{flex:1;justify-content:flex-start;}'
  + '.lck-linkbtn{min-width:44px;min-height:44px;border:0;background:transparent;cursor:pointer;'
  +   'font-size:17px;color:var(--lcs-ink-soft);}'
  + '.lck-linkbtn.danger{color:#C8613A;}'
  + '.lck-composer{display:flex;align-items:center;gap:8px;flex-wrap:wrap;'
  +   'padding-top:10px;border-top:1.5px dashed var(--lcs-line);}'
  + '.lck-complbl{width:100%;font-family:var(--lcs-font-body);font-weight:700;font-size:13px;'
  +   'color:var(--lcs-ink-soft);}'
  + '.lck-input{flex:1;min-width:150px;min-height:44px;font:inherit;padding:9px 11px;'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);box-sizing:border-box;}'
  + '.lck-pnote{min-height:1.2em;font-family:var(--lcs-font-body);font-size:12.5px;color:#C8613A;}'

  /* ---- the two-column step. 760 is DERIVED: 280 (the smallest face the
     grip-separation arithmetic allows) + 32 gap + 300 (the narrowest rail
     that still holds `Viertel vor zwölf`) + card padding ≈ 756. ---- */
  + '@media (min-width:760px){'
  +   '.lck-main{grid-template-columns:minmax(280px,var(--lck-face-max)) minmax(300px,var(--lck-rail-max,392px));'
  +     'align-items:center;justify-items:stretch;}'
  +   '.lck-wrap{--lck-face-max:480px;}'
  + '}'
  + '@media (max-width:759px){.lck-facecol{max-width:min(88vw,var(--lck-face-max));}}'
  /* wide boards — WIDTH-keyed only */
  /* ⚠ A WIDE TIER THAT ONLY GROWS THE CARD IS HOLLOW. The gate measured
     it: the box grew from 1366 to 2560 and `.lck-stepglyph` stayed 22px
     at both, so the instrument did not. Every tier now carries the chip,
     the glyph and the digital second line up with the dial. */
  + '@media (min-width:1367px){body.lck-wide .lck-wrap{--lck-face-max:600px;--lck-grip:52px;'
  +   '--lck-chip:54px;--lck-glyph:26px;--lck-d2:26px;--lck-rail-max:440px;}'
  +   'body.lck-wide .lcs-app{max-width:min(1192px,97vw);}}'
  + '@media (min-width:1800px){body.lck-wide .lck-wrap{--lck-face-max:760px;--lck-grip:60px;'
  +   '--lck-chip:64px;--lck-glyph:32px;--lck-d2:32px;--lck-rail-max:500px;}'
  +   'body.lck-wide .lcs-app{max-width:min(1560px,97vw);}}'
  + '@media (min-width:2400px){body.lck-wide .lck-wrap{--lck-face-max:900px;--lck-grip:68px;'
  +   '--lck-chip:74px;--lck-glyph:38px;--lck-d2:38px;--lck-rail-max:560px;}'
  +   'body.lck-wide .lcs-app{max-width:min(1752px,97vw);}}'
  + '@media (prefers-reduced-motion:reduce){'
  +   '.lck-hand,.lck-arc,.lck-pin,.lck-halo,.lck-grip:before,.lck-bubble{transition:none;}'
  +   '.lck-face.glow{animation:none;}}'

  /* ================= the printable ================================ */
  + '.lck-sheet{display:none;}'
  + '@media print{'
  +   '@page{size:A4 portrait;margin:14mm;}'
  +   'body.lck-paid html,body.lck-paid body,body.lck-paid .lcs-app,body.lck-paid .lcs-stage{'
  +     'background:#FFF !important;box-shadow:none !important;height:auto !important;'
  +     'max-height:none !important;max-width:none !important;overflow:visible !important;padding:0 !important;}'
  +   'body.lck-paid .lcs-header,body.lck-paid .lcs-controls,body.lck-paid .lcs-instruction{display:none !important;}'
  +   'body.lck-paid .lck-wrap,body.lck-paid .lck-scrim,body.lck-paid .lck-panel{display:none !important;}'
  +   'body.lck-paid .lck-sheet{display:block !important;}'
  +   'body.lck-paid .lck-page{break-after:page;page-break-after:always;break-inside:avoid;}'
  +   'body.lck-paid .lck-page:last-child{break-after:auto;page-break-after:auto;}'
  /* the name line is a RULE, not a label — the no-words law does not
     stop at the glass */
  +   'body.lck-paid .lck-page:before{content:"";display:block;width:82mm;height:0;'
  +     'border-bottom:.7pt solid #444;margin:0 0 7mm;}'
  +   'body.lck-paid .lck-phead{font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
  +     'font-size:15pt;color:#000;margin:0 0 6mm;}'
  +   'body.lck-paid .lck-pgrid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8mm 6mm;}'
  +   'body.lck-paid .lck-pcell{display:flex;flex-direction:column;align-items:center;gap:2mm;break-inside:avoid;}'
  +   'body.lck-paid .lck-pface{width:52mm;height:52mm;display:block;}'
  +   'body.lck-paid .lck-pcap{font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
  +     'font-size:11pt;color:#000;text-align:center;min-height:2.2em;}'
  +   'body.lck-paid .lck-pbox{width:26mm;height:11mm;border:.9pt solid #000;border-radius:1.6mm;}'
  +   'body.lck-paid .lck-prule{width:44mm;height:0;border-bottom:.7pt solid #000;margin-top:4mm;}'
  +   'body.lck-paid .lck-pcards{display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:0;}'
  +   'body.lck-paid .lck-pcard{border:.6pt dashed #666;min-height:38mm;display:flex;'
  +     'align-items:center;justify-content:center;padding:3mm;break-inside:avoid;}'
  +   'body.lck-paid .lck-pcard .lck-pface{width:30mm;height:30mm;}'
  +   'body.lck-paid .lck-pcard.text{font-family:"Baloo 2",system-ui,sans-serif;font-weight:700;'
  +     'font-size:19pt;color:#000;}'
  +   'body.lck-paid .lck-pcard.text.small{font-size:11pt;text-align:center;line-height:1.25;}'
  + '}';
  var el = document.createElement('style');
  el.setAttribute('data-lck', '1');
  el.textContent = css;
  document.head.appendChild(el);
}
