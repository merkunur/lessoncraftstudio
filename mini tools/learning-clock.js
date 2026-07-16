/* =====================================================================
   TOOL #14 — LEARNING CLOCK   (learning-clock.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #10 — the Math Table's
   localization showcase: a big friendly GEARED analog clock whose
   speech bubble says the time THE WAY PEOPLE ACTUALLY SAY IT HERE —
   drag to 2:30 in German and it says "halb drei", with a small honey
   arc showing WHY (the distance the idiom names, toward the coming
   hour). The catalog's "converts German teachers on the spot" feature.

   THE GENERATIVE SPEECH ENGINE: sayTime(locale, h, m) composes the
   colloquial time for EVERY 5-minute position from TIME_RULES —
   per-locale hour tokens (digits or words, up to three grammatical
   forms: {H}/{N} default, {H2}/{N2} alt word-form, {N3} fi partitive)
   + 12 position templates + a de "viertel drei" overlay + specials
   (fr midi, pt meio-dia…) + a FORMAL register for the minute stop
   ("zwei Uhr siebenunddreißig" via the spliced number-word composers —
   no locale speaks colloquial ":37"). The 16 native-verified times in
   clock-core.js timeExpr are the BYTE-FOR-BYTE regression anchor,
   enforced by verify-learning-clock-l10n.js.

   GEARING: totalMinutes ∈ [0,720) is the single truth. The minute
   hand accumulates signed drag deltas (crossing 12 carries the hour);
   the hour hand drags CONTINUOUSLY too (sweeping the minute at 12× —
   the Judy-Clock realism; never snap-minute-to-zero). Snap happens on
   RELEASE, to the active granularity stop. Angle/snap/keyboard/SVG
   recipes copied from clock-core.js (the protected activity engine is
   never imported or touched).

   Granularity drives BOTH drag snap AND the speech register:
   60/30 free (the "halb drei" wow IS the free demo) · 15/5/1 premium
   (1 = the formal register). Task + Elapsed modes and saved "our
   times" are premium. Sun/moon is explicit teacher state — tapping
   the moon flips the digital line 2:30 → 14:30 (that IS the 24h
   lesson); it is never derived from hand position.
   ===================================================================== */
var LearningClock = {
  id: 'learning-clock',

  strings: {
    title:        {en:'Learning Clock',de:'Lernuhr',fr:'Horloge parlante',it:'Orologio didattico',es:'Reloj para aprender la hora',pt:'Relógio das horas',nl:'Oefenklok',sv:'Lärklockan',da:'Læringsur',no:'Læringsklokka',fi:'Opettelukello'},
    instruction:  {en:'Drag the hands — the clock says the time out loud, the way we really say it.',de:'Zieh an den Zeigern — die Uhr sagt dir die Zeit so, wie wir sie wirklich sagen.',fr:'Fais glisser les aiguilles — l’horloge dit l’heure comme on la dit vraiment.',it:'Trascina le lancette — l’orologio dice l’ora come la diciamo davvero.',es:'Arrastra las manecillas — el reloj dice la hora como la decimos de verdad.',pt:'Arraste os ponteiros — o relógio fala a hora do jeito que a gente fala.',nl:'Sleep de wijzers — de klok zegt de tijd zoals wij die echt zeggen.',sv:'Dra i visarna — klockan säger tiden så som vi faktiskt säger den.',da:'Træk i viserne — uret siger, hvad klokken er, sådan som vi rigtigt siger det.',no:'Dra i viserne — klokka sier tiden høyt, slik vi faktisk sier den.',fi:'Vedä viisareita — kello sanoo ajan niin kuin me oikeasti sanomme sen.'},
    /* modes + dock */
    modeExplore:  {en:'Explore',de:'Entdecken',fr:'Découverte',it:'Esplora',es:'Explorar',pt:'Explorar',nl:'Ontdekken',sv:'Utforska',da:'Udforsk',no:'Utforsk',fi:'Tutki'},
    modeTask:     {en:'Practice',de:'Üben',fr:'Entraînement',it:'Esercizi',es:'Practicar',pt:'Praticar',nl:'Oefenen',sv:'Öva',da:'Øv',no:'Øv',fi:'Harjoittele'},
    modeElapsed:  {en:'How long?',de:'Wie lange?',fr:'Combien de temps ?',it:'Quanto tempo?',es:'¿Cuánto tiempo?',pt:'Quanto tempo?',nl:'Hoe lang?',sv:'Hur länge?',da:'Hvor længe?',no:'Hvor lenge?',fi:'Kuinka kauan?'},
    granLbl:      {en:'Steps',de:'Schritte',fr:'Précision',it:'Passo',es:'Pasos',pt:'Passos',nl:'Stappen',sv:'Steg',da:'Trin',no:'Steg',fi:'Askeleet'},
    granHour:     {en:'Hours',de:'Stunden',fr:'Heures',it:'Ore',es:'Horas',pt:'Horas',nl:'Hele uren',sv:'Timmar',da:'Timer',no:'Timer',fi:'Tasatunnit'},
    granHalf:     {en:'Half hours',de:'Halbe Stunden',fr:'Demi-heures',it:'Mezz’ore',es:'Medias horas',pt:'Meias horas',nl:'Halve uren',sv:'Halvtimmar',da:'Halve timer',no:'Halvtimer',fi:'Puolitunnit'},
    granQuarter:  {en:'Quarter hours',de:'Viertelstunden',fr:'Quarts d’heure',it:'Quarti d’ora',es:'Cuartos de hora',pt:'Quartos de hora',nl:'Kwartieren',sv:'Kvartar',da:'Kvarterer',no:'Kvarter',fi:'Vartit'},
    granFive:     {en:'5 minutes',de:'5 Minuten',fr:'5 minutes',it:'5 minuti',es:'5 minutos',pt:'5 minutos',nl:'5 minuten',sv:'5 minuter',da:'5 minutter',no:'5 minutter',fi:'5 minuuttia'},
    granMinute:   {en:'1 minute',de:'1 Minute',fr:'1 minute',it:'1 minuto',es:'1 minuto',pt:'1 minuto',nl:'1 minuut',sv:'1 minut',da:'1 minut',no:'1 minutt',fi:'1 minuutti'},
    speakBtn:     {en:'Say the time',de:'Uhrzeit ansagen',fr:'Dire l’heure',it:'Di’ l’ora',es:'Decir la hora',pt:'Falar a hora',nl:'Zeg de tijd',sv:'Säg tiden',da:'Sig klokken',no:'Si hva klokka er',fi:'Sano aika'},
    whyBtn:       {en:'Why do we say it like that?',de:'Warum sagen wir das so?',fr:'Pourquoi on dit ça comme ça ?',it:'Perché si dice così?',es:'¿Por qué se dice así?',pt:'Por que falamos assim?',nl:'Waarom zeggen we het zo?',sv:'Varför säger vi så?',da:'Hvorfor siger vi det sådan?',no:'Hvorfor sier vi det slik?',fi:'Miksi sanomme niin?'},
    sunAria:      {en:'Daytime — tap for evening',de:'Tag — tippe für Abend',fr:'Jour — appuie pour le soir',it:'Giorno — tocca per la sera',es:'Día — toca para la noche',pt:'Dia — toque para a noite',nl:'Dag — tik voor de avond',sv:'Dag — tryck för kväll',da:'Dag — tryk for aften',no:'Dag — trykk for kveld',fi:'Päivä — napauta vaihtaaksesi iltaan'},
    moonAria:     {en:'Evening — tap for daytime',de:'Abend — tippe für Tag',fr:'Soir — appuie pour le jour',it:'Sera — tocca per il giorno',es:'Noche — toca para el día',pt:'Noite — toque para o dia',nl:'Avond — tik voor de dag',sv:'Kväll — tryck för dag',da:'Aften — tryk for dag',no:'Kveld — trykk for dag',fi:'Ilta — napauta vaihtaaksesi päivään'},
    minuteRing:   {en:'Minute numbers',de:'Minutenzahlen',fr:'Chiffres des minutes',it:'Numeri dei minuti',es:'Números de minutos',pt:'Números dos minutos',nl:'Minutencijfers',sv:'Minutsiffror',da:'Minuttal',no:'Minuttall',fi:'Minuuttinumerot'},
    /* task mode */
    taskPrompt:   {en:'Set the clock to {time}.',de:'Stell die Uhr auf {time}.',fr:'Règle l’horloge sur {time}.',it:'Fai segnare {time} all’orologio.',es:'Pon el reloj en {time}.',pt:'Coloque o relógio em {time}.',nl:'Zet de klok op {time}.',sv:'Ställ klockan på {time}.',da:'Stil uret på {time}.',no:'Still klokka på {time}.',fi:'Aseta kello näyttämään: {time}.'},
    checkBtn:     {en:'Check',de:'Prüfen',fr:'Vérifier',it:'Controlla',es:'Revisar',pt:'Verificar',nl:'Nakijken',sv:'Kolla',da:'Tjek',no:'Sjekk',fi:'Tarkista'},
    nextBtn:      {en:'Next',de:'Weiter',fr:'Suivant',it:'Avanti',es:'Siguiente',pt:'Próximo',nl:'Volgende',sv:'Nästa',da:'Næste',no:'Neste',fi:'Seuraava'},
    youMade:      {en:'You made {time}.',de:'Du hast {time} eingestellt.',fr:'Ton horloge montre {time}.',it:'Il tuo orologio segna {time}.',es:'Pusiste {time}.',pt:'Você marcou {time}.',nl:'Jouw klok staat op {time}.',sv:'Du ställde klockan på {time}.',da:'Du stillede uret på {time}.',no:'Du stilte klokka på {time}.',fi:'Asetit ajan: {time}.'},
    tryNudge:     {en:'Look again — the short hand shows the hour, the long hand the minutes.',de:'Schau noch mal — der kurze Zeiger zeigt die Stunde, der lange die Minuten.',fr:'Regarde encore — la petite aiguille montre l’heure, la grande les minutes.',it:'Guarda ancora — la lancetta corta segna l’ora, quella lunga i minuti.',es:'Mira otra vez — la manecilla corta marca la hora y la larga los minutos.',pt:'Olhe de novo — o ponteiro curto marca a hora, o comprido os minutos.',nl:'Kijk nog eens — de kleine wijzer wijst de uren, de grote wijzer de minuten.',sv:'Titta igen — den korta visaren visar timmen, den långa minuterna.',da:'Se igen — den korte viser peger på timen, den lange på minutterne.',no:'Se en gang til — den korte viseren viser timen, den lange minuttene.',fi:'Katso vielä — lyhyt viisari näyttää tunnit, pitkä minuutit.'},
    niceBreak:    {en:'Lovely work — a nice place to pause.',de:'Schön gemacht — ein guter Moment für eine Pause.',fr:'Beau travail — un bon moment pour une pause.',it:'Ben fatto — un buon momento per una pausa.',es:'Muy bien — buen momento para una pausa.',pt:'Muito bem — um bom momento para fazer uma pausa.',nl:'Mooi gedaan — een fijn moment om te pauzeren.',sv:'Fint jobbat — ett bra läge att pausa.',da:'Flot klaret — et godt sted at holde pause.',no:'Flott jobbet — et fint sted å ta en liten pause.',fi:'Hienoa työtä — hyvä hetki pitää tauko.'},
    /* elapsed */
    pinStart:     {en:'Pin the start',de:'Startzeit setzen',fr:'Fixer le début',it:'Fissa l’inizio',es:'Fijar el inicio',pt:'Marcar o início',nl:'Begintijd vastzetten',sv:'Fäst starten',da:'Sæt starttid',no:'Fest starten',fi:'Kiinnitä alku'},
    pinEnd:       {en:'Pin the end',de:'Endzeit setzen',fr:'Fixer la fin',it:'Fissa la fine',es:'Fijar el final',pt:'Marcar o fim',nl:'Eindtijd vastzetten',sv:'Fäst slutet',da:'Sæt sluttid',no:'Fest slutten',fi:'Kiinnitä loppu'},
    elapsedClear: {en:'Clear',de:'Zurücksetzen',fr:'Effacer',it:'Cancella',es:'Borrar',pt:'Limpar',nl:'Wissen',sv:'Rensa',da:'Ryd',no:'Nullstill',fi:'Tyhjennä'},
    durMinutes:   {en:'{n} minutes',de:'{n} Minuten',fr:'{n} minutes',it:'{n} minuti',es:'{n} minutos',pt:'{n} minutos',nl:'{n} minuten',sv:'{n} minuter',da:'{n} minutter',no:'{n} minutter',fi:'{n} minuuttia'},
    durHours:     {en:'{h} h {m} min',de:'{h} Std. {m} Min.',fr:'{h} h {m} min',it:'{h} h {m} min',es:'{h} h {m} min',pt:'{h} h {m} min',nl:'{h} uur {m} min',sv:'{h} tim {m} min',da:'{h} t {m} min',no:'{h} t {m} min',fi:'{h} t {m} min'},
    /* saved times */
    ourTimes:     {en:'Our times',de:'Unsere Zeiten',fr:'Les heures de notre journée',it:'I nostri orari',es:'Nuestros horarios',pt:'Nossos horários',nl:'Onze tijden',sv:'Våra tider',da:'Vores tider',no:'Tidene våre',fi:'Meidän ajat'},
    addTime:      {en:'Save the time on the clock',de:'Diese Uhrzeit speichern',fr:'Enregistrer l’heure affichée',it:'Salva l’ora segnata sull’orologio',es:'Guardar la hora del reloj',pt:'Salvar a hora do relógio',nl:'Tijd op de klok opslaan',sv:'Spara tiden på klockan',da:'Gem tiden på uret',no:'Lagre tiden på klokka',fi:'Tallenna kellon aika'},
    timeLabelPh:  {en:'What is this time? (e.g. Lunch)',de:'Wofür ist diese Zeit? (z. B. Mittagessen)',fr:'C\'est l\'heure de quoi ? (ex. : la cantine)',it:'Che momento è? (es. la ricreazione)',es:'¿Qué hora es esta? (p. ej. recreo)',pt:'Hora de quê? (ex.: almoço)',nl:'Welke tijd is dit? (bijv. gymles)',sv:'Vad kallar vi den här tiden? (t.ex. lunch)',da:'Hvad er det for et tidspunkt? (f.eks. frokost)',no:'Hva skjer da? (f.eks. matfri)',fi:'Mikä aika tämä on? (esim. ruokailu)'},
    setOurTime:   {en:'Set the clock to {label} — {time}.',de:'Stell die Uhr auf {label} — {time}.',fr:'Règle l’horloge sur {label} — {time}.',it:'Fai segnare all’orologio l’ora di {label}: {time}.',es:'Pon el reloj en {label} — {time}.',pt:'Coloque o relógio em {label} — {time}.',nl:'Zet de klok op {label} — {time}.',sv:'Ställ klockan på {label} — {time}.',da:'Stil uret på {label} — {time}.',no:'Still klokka på {label} — {time}.',fi:'Aseta kello: {label} — {time}.'},
    deleteBtn:    {en:'Delete',de:'Löschen',fr:'Supprimer',it:'Elimina',es:'Eliminar',pt:'Excluir',nl:'Verwijderen',sv:'Ta bort',da:'Slet',no:'Slett',fi:'Poista'},

    /* de regional variant chip (rendered for de only) */
    deVariantA:   {en:'Viertel nach zwei',de:'Viertel nach zwei',fr:'Viertel nach zwei',it:'Viertel nach zwei',es:'Viertel nach zwei',pt:'Viertel nach zwei',nl:'Viertel nach zwei',sv:'Viertel nach zwei',da:'Viertel nach zwei',no:'Viertel nach zwei',fi:'Viertel nach zwei'},
    deVariantB:   {en:'viertel drei',de:'viertel drei',fr:'viertel drei',it:'viertel drei',es:'viertel drei',pt:'viertel drei',nl:'viertel drei',sv:'viertel drei',da:'viertel drei',no:'viertel drei',fi:'viertel drei'},

    /* gates + settings */
    gateGran:     {en:'Quarter-hour and minute steps are part of Premium — hours and half hours are always free.',de:'Viertelstunden- und Minutenschritte gehören zu Premium — Stunden und halbe Stunden bleiben immer kostenlos.',fr:'Les réglages au quart d\'heure et à la minute font partie de Premium — les heures et les demi-heures restent gratuites.',it:'I passi di quarto d’ora e di minuto fanno parte di Premium — ore e mezz’ore restano gratuite.',es:'Los pasos de cuarto de hora y de minuto son parte de Premium — las horas y medias horas siempre son gratis.',pt:'Os passos de quarto de hora e de minuto fazem parte do Premium — horas e meias horas são sempre grátis.',nl:'Kwartier- en minuutstappen horen bij Premium — hele en halve uren blijven altijd gratis.',sv:'Kvarts- och minutsteg ingår i Premium — timmar och halvtimmar är alltid gratis.',da:'Kvarter- og minuttrin er en del af Premium — timer og halve timer er altid gratis.',no:'Kvarter- og minuttsteg er en del av Premium — hele og halve timer er alltid gratis.',fi:'Vartti- ja minuuttiaskeleet kuuluvat Premiumiin — tasatunnit ja puolitunnit ovat aina ilmaisia.'},
    gateTask:     {en:'Practice mode is part of Premium — exploring the talking clock is always free.',de:'Der Übungsmodus gehört zu Premium — das Entdecken der sprechenden Uhr bleibt kostenlos.',fr:'Le mode entraînement fait partie de Premium — explorer l’horloge parlante reste gratuit.',it:'La modalità esercizi fa parte di Premium — esplorare l’orologio parlante resta gratuito.',es:'El modo práctica es parte de Premium — explorar el reloj parlante siempre es gratis.',pt:'O modo prática faz parte do Premium — explorar o relógio falante é sempre grátis.',nl:'De oefenmodus hoort bij Premium — de pratende klok ontdekken blijft gratis.',sv:'Övningsläget ingår i Premium — att utforska den talande klockan är alltid gratis.',da:'Øvetilstanden er en del af Premium — det talende ur er altid gratis at udforske.',no:'Øvemodus er en del av Premium — å utforske den snakkende klokka er alltid gratis.',fi:'Harjoittelutila kuuluu Premiumiin — puhuvan kellon tutkiminen on aina ilmaista.'},
    gateElapsed:  {en:'The How-long mode is part of Premium.',de:'Der Wie-lange-Modus gehört zu Premium.',fr:'Le mode Combien-de-temps fait partie de Premium.',it:'La modalità «Quanto tempo?» fa parte di Premium.',es:'El modo «¿Cuánto tiempo?» es parte de Premium.',pt:'O modo Quanto-tempo faz parte do Premium.',nl:'De Hoe-lang-modus hoort bij Premium.',sv:'Hur-länge-läget ingår i Premium.',da:'Hvor-længe-tilstanden er en del af Premium.',no:'Hvor-lenge-modusen er en del av Premium.',fi:'Kuinka-kauan-tila kuuluu Premiumiin.'},
    gateSaves:    {en:'Saving your class’s times is part of Premium.',de:'Das Speichern eurer Klassenzeiten gehört zu Premium.',fr:'Enregistrer les horaires de la classe fait partie de Premium.',it:'Salvare gli orari della classe fa parte di Premium.',es:'Guardar los horarios del grupo es parte de Premium.',pt:'Salvar os horários da turma faz parte do Premium.',nl:'De tijden van je klas opslaan hoort bij Premium.',sv:'Att spara klassens tider ingår i Premium.',da:'At gemme klassens tider er en del af Premium.',no:'Å lagre klassens tider er en del av Premium.',fi:'Luokan aikojen tallennus kuuluu Premiumiin.'},
    unlock:       {en:'Unlock the whole clock',de:'Die ganze Uhr freischalten',fr:'Débloquer toute l’horloge',it:'Sblocca tutto l’orologio',es:'Desbloquear todo el reloj',pt:'Desbloquear o relógio todo',nl:'De hele klok ontgrendelen',sv:'Lås upp hela klockan',da:'Lås hele uret op',no:'Lås opp hele klokka',fi:'Avaa koko kello'},
    setDigital:   {en:'Digital display',de:'Digitale Anzeige',fr:'Affichage numérique',it:'Display digitale',es:'Pantalla digital',pt:'Mostrador digital',nl:'Digitale weergave',sv:'Digital visning',da:'Digital visning',no:'Digital visning',fi:'Digitaalinen näyttö'},
    digOff:       {en:'Off',de:'Aus',fr:'Sans',it:'Spento',es:'Apagada',pt:'Desligado',nl:'Uit',sv:'Av',da:'Fra',no:'Av',fi:'Pois'},
    dig12:        {en:'2:30',de:'2:30',fr:'2:30',it:'2:30',es:'2:30',pt:'2:30',nl:'2:30',sv:'2:30',da:'2:30',no:'2:30',fi:'2:30'},
    dig24:        {en:'14:30',de:'14:30',fr:'14:30',it:'14:30',es:'14:30',pt:'14:30',nl:'14:30',sv:'14:30',da:'14:30',no:'14:30',fi:'14:30'},
    digBoth:      {en:'Both',de:'Beides',fr:'Les deux',it:'Entrambi',es:'Ambas',pt:'Ambos',nl:'Allebei',sv:'Båda',da:'Begge',no:'Begge',fi:'Molemmat'},
    setSpeakDrag: {en:'Speak while dragging',de:'Beim Ziehen sprechen',fr:'Parler pendant le déplacement',it:'Parla mentre trascini',es:'Hablar al arrastrar',pt:'Falar ao arrastar',nl:'Spreken tijdens slepen',sv:'Säg tiden medan du drar',da:'Tal, mens du trækker',no:'Snakk mens du drar',fi:'Puhe vedettäessä'},
    loading:      {en:'Winding the hands…',de:'Die Zeiger werden gestellt…',fr:'On remonte les aiguilles…',it:'Sistemiamo le lancette…',es:'Ajustando las manecillas…',pt:'Acertando os ponteiros…',nl:'De wijzers worden gezet…',sv:'Visarna ställs…',da:'Viserne stilles…',no:'Vi stiller viserne…',fi:'Viisareita asetellaan…'}
  },

  /* ================= THE TIME RULES (one line per locale — the
     /*__TR_xx__* / markers let the fan-out apply whole-line replace).
     {H}/{N} = current/next hour token (hourWords); {H2}/{N2} = alt list
     (word forms); {N3} = fi partitive list; {HW}/{M#} = number words
     (formal register). Anchored on clock-core's 16 verified times. */
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

  defaults: { granularity: '30', digital: 'auto', speakDrag: false, minuteRing: false },
  settings: [
    { key:'granularity', type:'choice', labelKey:'granLbl', options:[
      { value:'60', labelKey:'granHour' },
      { value:'30', labelKey:'granHalf' },
      { value:'15', labelKey:'granQuarter' },
      { value:'5', labelKey:'granFive' },
      { value:'1', labelKey:'granMinute' }
    ]},
    { key:'digital', type:'choice', labelKey:'setDigital', options:[
      { value:'auto', labelKey:'digBoth' },
      { value:'12', labelKey:'dig12' },
      { value:'24', labelKey:'dig24' },
      { value:'off', labelKey:'digOff' }
    ]},
    { key:'speakDrag', type:'toggle', labelKey:'setSpeakDrag' },
    { key:'minuteRing', type:'toggle', labelKey:'minuteRing' }
  ],

  STORE_KEY: 'lcs:learning-clock:v1',
  ENT_TRUST_DAYS: 14,
  C: { T: '#146B5E', CORAL: '#F2784B', CORALD: '#C9502A', FACE: '#FBF3E4', HONEY: '#F2C879', CARD: '#FFFEFB' },

  /* =========================== lifecycle =========================== */

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.mode = 'explore';
    this.total = 150;                 /* 2:30 — the demo pose */
    this.pm = true;                   /* 14:30 — a school afternoon, sun up */
    this._drag = null;
    this.task = { order: [], idx: 0, phase: 'set', target: null, done: 0 };
    this.elapsed = { start: null, end: null };

    this._store = this._loadStore() || {};
    if (!this._store.v) this._store = { v: 1, ent: null, ourTimes: [], deQuarter: false };
    if (!this._store.ourTimes) this._store.ourTimes = [];
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    this._fetchEntitlement();
  },
  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)); } catch (_) { return null; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
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

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m2, k) { return (args && k in args) ? String(args[k]) : m2; });
  },
  _reducedMotion: function () {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  _gran: function () { return parseInt(this.api.settings.granularity, 10) || 30; },
  _h: function (t) { var h = Math.floor(((t === undefined ? this.total : t)) / 60); return h === 0 ? 12 : h; },
  _m: function (t) { return ((t === undefined ? this.total : t)) % 60; },
  _say: function (t) {
    return this.sayTime(this.api.lang, this._h(t), this._m(t), { deQuarter: !!this._store.deQuarter });
  },
  _speakNow: function (text) {
    try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.9 }); } catch (_) {}
    this.api.announce(text);
  },

  /* ===================== the gear engine ============================ */

  _angleFromPointer: function (cx, cy) {
    var r = this._svg.getBoundingClientRect();
    var dx = cx - (r.left + r.width / 2);
    var dy = cy - (r.top + r.height / 2);
    var a = Math.atan2(dx, -dy) * 180 / Math.PI;
    return (a + 360) % 360;
  },
  _signedDelta: function (from, to) {
    var d = (to - from) % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
  },
  /* apply a drag delta (degrees on the dragged hand) to totalMinutes */
  _applyDrag: function (which, angle) {
    var d = this._signedDelta(this._drag.lastAngle, angle);
    this._drag.lastAngle = angle;
    if (which === 'minute') this.total += d / 6;            /* 6°/min */
    else this.total += d * 2;                                /* hour: 30°/h → 2 min/deg; minute sweeps 12× */
    this.total = ((this.total % 720) + 720) % 720;
    this._paint();
    if (this.api.settings.speakDrag) this._liveBubble();
    else this._bubbleLive();
  },
  _snapRelease: function () {
    var g = this._gran();
    this.total = (Math.round(this.total / g) * g) % 720;
    this._paint();
    this._bubbleFinal(true);
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('lck-wide');

    var wrap = api.el('div', 'lck-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    /* task prompt line */
    if (this.mode === 'task' && this.task.target !== null) {
      var prompt = api.el('div', 'lck-prompt');
      var worded = this._say(this.task.target);
      prompt.innerHTML = '';
      var parts = this.fmt('taskPrompt', { time: '' }).split('');
      prompt.appendChild(document.createTextNode(parts[0]));
      var em = api.el('em');
      em.textContent = worded;
      prompt.appendChild(em);
      if (parts[1]) prompt.appendChild(document.createTextNode(parts[1]));
      wrap.appendChild(prompt);
    }

    var main = api.el('div', 'lck-main');
    /* sun/moon corner — the ART is derived from the actual 24h hour
       (moon 19:00-05:59) so the sky never lies about the time of day;
       TAPPING still flips the am/pm half (that IS the 24h lesson). */
    var sky = api.el('button', 'lck-sky');
    sky.type = 'button';
    sky.addEventListener('click', function () { self.pm = !self.pm; self.render(); });
    main.appendChild(sky);
    this._skyEl = sky;
    this._skyNight = undefined;
    this._paintSky();

    /* the clock card */
    var card = api.el('div', 'lck-card');
    card.appendChild(this._buildFace());
    main.appendChild(card);

    /* right rail */
    var rail = api.el('div', 'lck-rail');
    if (this.mode !== 'elapsed') {
      var bubble = api.el('div', 'lck-bubble');
      var bt = api.el('span', 'lck-bubbletext');
      bt.textContent = this._say();
      bubble.appendChild(bt);
      var spk = api.el('button', 'lck-speak');
      spk.type = 'button';
      spk.setAttribute('aria-label', api.t('speakBtn'));
      spk.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
      spk.addEventListener('click', function () { self._speakNow(self._say()); });
      bubble.appendChild(spk);
      rail.appendChild(bubble);
      this._bubbleEl = bt;
      /* the why chip */
      var why = api.el('button', 'lck-why');
      why.type = 'button';
      why.textContent = '? ' + api.t('whyBtn');
      why.addEventListener('click', function () { self._explain(); });
      rail.appendChild(why);
      /* de regional variant chip */
      if (api.lang === 'de') {
        var dv = api.el('button', 'lck-devariant');
        dv.type = 'button';
        dv.textContent = this._store.deQuarter ? api.t('deVariantB') + ' ↔' : api.t('deVariantA') + ' ↔';
        dv.addEventListener('click', function () {
          self._store.deQuarter = !self._store.deQuarter;
          self._saveStore();
          self.render();
        });
        rail.appendChild(dv);
      }
    } else {
      var eb = api.el('div', 'lck-bubble');
      var ebt = api.el('span', 'lck-bubbletext');
      ebt.textContent = this._elapsedText();
      eb.appendChild(ebt);
      var espk = api.el('button', 'lck-speak');
      espk.type = 'button';
      espk.setAttribute('aria-label', api.t('speakBtn'));
      espk.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
      espk.addEventListener('click', function () { self._speakNow(self._elapsedText()); });
      eb.appendChild(espk);
      rail.appendChild(eb);
      this._bubbleEl = ebt;
    }

    /* digital pill */
    var digMode = api.settings.digital;
    if (digMode !== 'off') {
      var dig = api.el('div', 'lck-digital');
      var h12 = this._h(), m = this._m();
      var mm = (m < 10 ? '0' : '') + m;
      var line12 = h12 + ':' + mm + (api.lang === 'en' ? (this.pm ? ' PM' : ' AM') : '');
      /* the second line is the zero-padded 24h reading (02:30 / 14:30) —
         always distinct from the analog line, sky glyph tells the truth */
      var line24 = this._h24str();
      var showBoth = digMode === 'auto' ? (api.lang !== 'en') : digMode === 'both';
      if (digMode === '24') {
        dig.innerHTML = '<span class="lck-d1">' + line24 + '</span>';
      } else if (showBoth) {
        dig.innerHTML = '<span class="lck-d1">' + line12.replace(/ (AM|PM)/, '') + '</span><span class="lck-d2">' + (this._night() ? '☾ ' : '☀ ') + line24 + '</span>';
      } else {
        dig.innerHTML = '<span class="lck-d1">' + line12 + '</span>';
      }
      rail.appendChild(dig);
    }

    /* task/elapsed rail controls */
    if (this.mode === 'task') {
      var tr = api.el('div', 'lck-taskrail');
      if (this.task.phase === 'set') {
        var check = api.el('button', 'lck-big coral');
        check.type = 'button';
        check.textContent = api.t('checkBtn');
        check.addEventListener('click', function () { self._checkTask(); });
        tr.appendChild(check);
      } else {
        var next = api.el('button', 'lck-big coral');
        next.type = 'button';
        next.textContent = api.t('nextBtn');
        next.addEventListener('click', function () { self._nextTask(); });
        tr.appendChild(next);
      }
      if (this._taskNote) {
        var note = api.el('div', 'lck-tasknote' + (this._taskNoteKind === 'good' ? ' good' : ''));
        note.textContent = this._taskNote;
        tr.appendChild(note);
      }
      rail.appendChild(tr);
    }
    if (this.mode === 'elapsed') {
      var er = api.el('div', 'lck-taskrail');
      var ps = api.el('button', 'lck-chip' + (this.elapsed.start === null ? ' cta' : ''));
      ps.type = 'button';
      ps.textContent = api.t('pinStart');
      ps.addEventListener('click', function () { self.elapsed.start = self.total; self.render(); });
      var pe = api.el('button', 'lck-chip' + (this.elapsed.start !== null && this.elapsed.end === null ? ' cta' : ''));
      pe.type = 'button';
      pe.textContent = api.t('pinEnd');
      pe.addEventListener('click', function () { self.elapsed.end = self.total; self.render(); });
      var pc = api.el('button', 'lck-chip');
      pc.type = 'button';
      pc.textContent = api.t('elapsedClear');
      pc.addEventListener('click', function () { self.elapsed = { start: null, end: null }; self.render(); });
      er.append(ps, pe, pc);
      rail.appendChild(er);
    }
    main.appendChild(rail);
    wrap.appendChild(main);

    /* dock */
    var dock = api.el('div', 'lck-dock');
    var modes = api.el('div', 'lck-modes');
    [['explore', 'modeExplore', true], ['task', 'modeTask', this.premium], ['elapsed', 'modeElapsed', this.premium]].forEach(function (mdef) {
      var chip = api.el('button', 'lck-chip' + (self.mode === mdef[0] ? ' active' : '') + (mdef[2] ? '' : ' locked'));
      chip.type = 'button';
      chip.textContent = api.t(mdef[1]);
      if (!mdef[2]) chip.innerHTML += ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
      chip.addEventListener('click', function () {
        if (!mdef[2]) { self._gateInline(dock, mdef[0] === 'task' ? 'gateTask' : 'gateElapsed'); return; }
        self.mode = mdef[0];
        self._taskNote = null;
        if (mdef[0] === 'task' && self.task.target === null) self._nextTask();
        self.render();
      });
      modes.appendChild(chip);
    });
    dock.appendChild(modes);

    var grans = api.el('div', 'lck-grans');
    var gl = api.el('span', 'lck-glbl');
    gl.textContent = api.t('granLbl');
    grans.appendChild(gl);
    [['60', '1h'], ['30', '½'], ['15', '¼'], ['5', '5'], ['1', '1']].forEach(function (g) {
      var free = g[0] === '60' || g[0] === '30';
      var chip = api.el('button', 'lck-chip small' + (api.settings.granularity === g[0] ? ' active' : '') + (free || self.premium ? '' : ' locked'));
      chip.type = 'button';
      chip.textContent = g[1];
      chip.setAttribute('data-g', g[0]);
      chip.addEventListener('click', function () {
        if (!free && !self.premium) { self._gateInline(dock, 'gateGran'); return; }
        api.settings.granularity = g[0];
        if (g[0] === '5') api.settings.minuteRing = true;
        self._saveStore();
        /* re-snap the current time to the new step */
        var step = parseInt(g[0], 10);
        self.total = (Math.round(self.total / step) * step) % 720;
        if (self.mode === 'task') { self.task.order = []; self._nextTask(); }
        self.render();
      });
      grans.appendChild(chip);
    });
    dock.appendChild(grans);

    /* our-times chip — lives INSIDE the grans group so a dock wrap
       breaks between the two groups, never orphaning a lone chip */
    var ot = api.el('button', 'lck-chip manage' + (this.premium ? '' : ' locked'));
    ot.type = 'button';
    ot.textContent = api.t('ourTimes');
    ot.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(dock, 'gateSaves'); return; }
      self._openPanel();
    });
    grans.appendChild(ot);
    wrap.appendChild(dock);

    this._paint();
  },

  /* ---- the face (recipes doubled from clock-core, viewBox 200) ---- */
  _buildFace: function () {
    var api = this.api, self = this;
    var ns = 'http://www.w3.org/2000/svg';
    function elNS(tag, attrs) { var e = document.createElementNS(ns, tag); for (var k in attrs) if (attrs.hasOwnProperty(k)) e.setAttribute(k, attrs[k]); return e; }
    var svg = elNS('svg', { viewBox: '0 0 200 200', class: 'lck-svg', role: 'img' });
    this._svg = svg;

    svg.appendChild(elNS('circle', { cx: 100, cy: 100, r: 92, fill: this.C.FACE, stroke: this.C.T, 'stroke-width': 5 }));
    svg.appendChild(elNS('circle', { cx: 100, cy: 100, r: 86, fill: 'none', stroke: this.C.HONEY, 'stroke-width': 1.2, opacity: 0.5 }));

    /* elapsed band (under ticks) */
    this._bandGroup = elNS('g', {});
    svg.appendChild(this._bandGroup);

    /* ticks */
    for (var i = 0; i < 60; i++) {
      var major = i % 5 === 0;
      var a = i * 6 * Math.PI / 180;
      var r1 = major ? 77 : 81.5, r2 = 86;
      svg.appendChild(elNS('line', {
        x1: 100 + Math.sin(a) * r1, y1: 100 - Math.cos(a) * r1,
        x2: 100 + Math.sin(a) * r2, y2: 100 - Math.cos(a) * r2,
        stroke: this.C.T, 'stroke-width': major ? 3 : 1.4, 'stroke-linecap': 'round',
        opacity: major ? 1 : 0.4
      }));
    }
    /* numerals 1-12 (+ the explainer halo targets) */
    this._numEls = {};
    for (var h = 1; h <= 12; h++) {
      var ah = h * 30 * Math.PI / 180;
      var halo = elNS('circle', { cx: 100 + Math.sin(ah) * 64, cy: 100 - Math.cos(ah) * 64, r: 13, fill: this.C.HONEY, opacity: 0, class: 'lck-halo' });
      svg.appendChild(halo);
      var t = elNS('text', {
        x: 100 + Math.sin(ah) * 64, y: 100 - Math.cos(ah) * 64,
        'text-anchor': 'middle', 'dominant-baseline': 'central',
        fill: this.C.T, 'font-size': 17, 'font-weight': 800, class: 'lck-num'
      });
      t.textContent = String(h);
      svg.appendChild(t);
      this._numEls[h] = { text: t, halo: halo };
      /* inner 13-24 ring (24h locales) */
      if (this.api.lang !== 'en') {
        var t24 = elNS('text', {
          x: 100 + Math.sin(ah) * 47, y: 100 - Math.cos(ah) * 47,
          'text-anchor': 'middle', 'dominant-baseline': 'central',
          fill: this.C.T, 'font-size': 8.5, 'font-weight': 700, opacity: 0.65
        });
        t24.textContent = String(h + 12);
        svg.appendChild(t24);
      }
    }
    /* outer minute numerals */
    if (this.api.settings.minuteRing) {
      for (var mnum = 5; mnum <= 60; mnum += 5) {
        var am = mnum * 6 * Math.PI / 180;
        var tm = elNS('text', {
          x: 100 + Math.sin(am) * 97, y: 100 - Math.cos(am) * 97,
          'text-anchor': 'middle', 'dominant-baseline': 'central',
          fill: this.C.CORALD, 'font-size': 8, 'font-weight': 700
        });
        tm.textContent = String(mnum === 60 ? 60 : mnum);
        svg.appendChild(tm);
      }
    }

    /* the explainer arc */
    this._arcEl = elNS('path', { d: '', fill: 'none', stroke: this.C.HONEY, 'stroke-width': 7, 'stroke-linecap': 'round', opacity: 0, class: 'lck-arc' });
    svg.appendChild(this._arcEl);
    /* ghost hour hand (explainer) + ghost pair (elapsed start) */
    this._ghostEl = elNS('line', { x1: 100, y1: 100, x2: 100, y2: 62, stroke: this.C.T, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0 });
    svg.appendChild(this._ghostEl);
    this._ghostMin = elNS('line', { x1: 100, y1: 100, x2: 100, y2: 30, stroke: this.C.CORAL, 'stroke-width': 4.5, 'stroke-linecap': 'round', opacity: 0 });
    svg.appendChild(this._ghostMin);

    /* hands */
    this._hourHand = this._makeHand(svg, elNS, 'hour', 40, 9, this.C.T);
    this._minHand = this._makeHand(svg, elNS, 'minute', 72, 4.5, this.C.CORAL);

    /* hub */
    svg.appendChild(elNS('circle', { cx: 100, cy: 100, r: 9, fill: this.C.HONEY }));
    svg.appendChild(elNS('circle', { cx: 100, cy: 100, r: 7, fill: this.C.T }));

    return svg;
  },
  _makeHand: function (svg, elNS, which, len, w, color) {
    var g = elNS('g', { class: 'lck-hand lck-hand-' + which, tabindex: 0, role: 'slider', 'aria-label': which });
    g.appendChild(elNS('line', { x1: 100, y1: 110, x2: 100, y2: 100 - len, stroke: color, 'stroke-width': w, 'stroke-linecap': 'round' }));
    /* fat transparent hit line + tip grab pad */
    g.appendChild(elNS('line', { x1: 100, y1: 112, x2: 100, y2: 96 - len, stroke: 'rgba(0,0,0,0)', 'stroke-width': 20 }));
    g.appendChild(elNS('circle', { cx: 100, cy: 100 - len, r: 13, fill: color, opacity: 0.14, class: 'lck-pad' }));
    svg.appendChild(g);
    this._wireHand(g, which);
    return g;
  },
  _wireHand: function (g, which) {
    var self = this;
    g.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      try { g.setPointerCapture(e.pointerId); } catch (_) {}
      self._drag = { which: which, lastAngle: self._angleFromPointer(e.clientX, e.clientY) };
      var move = function (ev) { ev.preventDefault(); if (self._drag) self._applyDrag(which, self._angleFromPointer(ev.clientX, ev.clientY)); };
      var up = function () {
        g.removeEventListener('pointermove', move);
        g.removeEventListener('pointerup', up);
        g.removeEventListener('pointercancel', up);
        self._drag = null;
        self._snapRelease();
      };
      g.addEventListener('pointermove', move);
      g.addEventListener('pointerup', up);
      g.addEventListener('pointercancel', up);
    });
    g.addEventListener('keydown', function (e) {
      var gStep = self._gran();
      var d = 0;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') d = which === 'minute' ? gStep : 60;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') d = which === 'minute' ? -gStep : -60;
      if (!d) return;
      e.preventDefault();
      self.total = ((self.total + d) % 720 + 720) % 720;
      self.total = (Math.round(self.total / gStep) * gStep) % 720;
      self._paint();
      self._bubbleFinal(false);
    });
  },

  /* actual time-of-day: night = 19:00-05:59 on the 24h clock */
  _night: function () {
    var h24 = (this._h() % 12) + (this.pm ? 12 : 0);
    return h24 >= 19 || h24 < 6;
  },
  _h24str: function () {
    var h24 = (this._h() % 12) + (this.pm ? 12 : 0);
    var m = Math.round(this._m()); if (m === 60) m = 0;
    return (h24 < 10 ? '0' : '') + h24 + ':' + (m < 10 ? '0' : '') + m;
  },
  _paintSky: function () {
    if (!this._skyEl) return;
    var night = this._night();
    if (this._skyNight === night) return;
    this._skyNight = night;
    this._skyEl.className = 'lck-sky' + (night ? ' moon' : '');
    this._skyEl.setAttribute('aria-label', this.api.t(night ? 'moonAria' : 'sunAria'));
    this._skyEl.innerHTML = night
      ? '<svg viewBox="0 0 60 60" aria-hidden="true"><path d="M40 12 A22 22 0 1 0 52 40 A18 18 0 0 1 40 12 Z" fill="#FDF7EC" stroke="#146B5E" stroke-width="2"/><circle cx="14" cy="16" r="1.6" fill="#F2C879"/><circle cx="22" cy="8" r="1.2" fill="#F2C879"/><circle cx="10" cy="28" r="1.2" fill="#F2C879"/></svg>'
      : '<svg viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="13" fill="#F2C879" stroke="#146B5E" stroke-width="2"/><g stroke="#F2C879" stroke-width="4" stroke-linecap="round"><path d="M30 6v6M30 48v6M6 30h6M48 30h6M13 13l4 4M43 43l4 4M47 13l-4 4M17 43l-4 4"/></g></svg>';
  },
  _paint: function () {
    if (!this._svg) return;
    var hourA = this.total / 2;              /* ≡ 30h + 0.5m */
    var minA = (this.total % 60) * 6;
    this._hourHand.setAttribute('transform', 'rotate(' + hourA.toFixed(2) + ' 100 100)');
    this._minHand.setAttribute('transform', 'rotate(' + minA.toFixed(2) + ' 100 100)');
    /* elapsed band */
    this._paintBand();
    /* sky art tracks the actual hour */
    this._paintSky();
    /* digital live update */
    var dig = (this._wrap || document).querySelector('.lck-digital');
    if (dig) {
      var h12 = this._h(), m = Math.round(this._m());
      if (m === 60) m = 0;
      var mm = (m < 10 ? '0' : '') + m;
      var d1 = dig.querySelector('.lck-d1');
      var d2 = dig.querySelector('.lck-d2');
      if (d1) d1.textContent = this.api.settings.digital === '24' ? this._h24str() : h12 + ':' + mm + (this.api.lang === 'en' && !d2 ? (this.pm ? ' PM' : ' AM') : '');
      if (d2) d2.textContent = (this._night() ? '☾ ' : '☀ ') + this._h24str();
    }
  },
  _bubbleLive: function () {
    if (!this._bubbleEl || this.mode === 'elapsed') return;
    var g = this._gran();
    var t = (Math.round(this.total / g) * g) % 720;
    this._bubbleEl.textContent = this._say(t);
    this._bubbleEl.parentNode.classList.add('dragging');
  },
  _liveBubble: function () { this._bubbleLive(); },
  _bubbleFinal: function (speak) {
    if (!this._bubbleEl) return;
    if (this.mode === 'elapsed') { this._bubbleEl.textContent = this._elapsedText(); return; }
    var text = this._say();
    this._bubbleEl.textContent = text;
    this._bubbleEl.parentNode.classList.remove('dragging');
    if (speak) this._speakNow(text);
    /* auto-explain once per half-hour arrival in explore */
    if (this.mode === 'explore' && this._m() === 30 && this._lastExplained !== this.total) {
      this._lastExplained = this.total;
      this._explain();
    }
  },

  /* ---- the explainer arc: fill the distance the idiom names ---- */
  _explain: function () {
    var self = this;
    var m = this._m();
    var loc = this.api.lang;
    var towardNext = ['de', 'nl', 'sv', 'da', 'no', 'fi'].indexOf(loc) >= 0;
    var refHour, a0, a1;
    if (m === 0) { refHour = this._h(); a0 = 0; a1 = 359.99; }
    else if (towardNext ? m >= 20 : m > 30) {
      /* the remaining arc, toward the coming hour */
      refHour = this._h() % 12 + 1;
      a0 = m * 6; a1 = 360;
    } else {
      /* the past arc from 12 */
      refHour = this._h();
      a0 = 0; a1 = m * 6;
    }
    var r = 83;
    var large = (a1 - a0) > 180 ? 1 : 0;
    var x0 = 100 + Math.sin(a0 * Math.PI / 180) * r, y0 = 100 - Math.cos(a0 * Math.PI / 180) * r;
    var x1 = 100 + Math.sin(a1 * Math.PI / 180) * r, y1 = 100 - Math.cos(a1 * Math.PI / 180) * r;
    this._arcEl.setAttribute('d', 'M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1));
    var len = 2 * Math.PI * r * ((a1 - a0) / 360);
    var reduced = this._reducedMotion();
    this._arcEl.style.transition = 'none';
    this._arcEl.setAttribute('stroke-dasharray', String(len));
    this._arcEl.setAttribute('stroke-dashoffset', reduced ? '0' : String(len));
    this._arcEl.setAttribute('opacity', '0.7');
    if (!reduced) {
      void this._arcEl.getBoundingClientRect();
      this._arcEl.style.transition = 'stroke-dashoffset 0.7s ease-out';
      this._arcEl.setAttribute('stroke-dashoffset', '0');
    }
    /* halo the reference numeral + ghost hour hand at the coming hour */
    var ne = this._numEls[refHour];
    if (ne) {
      ne.halo.setAttribute('opacity', '0.55');
      ne.text.setAttribute('font-size', '21');
    }
    var ga = (refHour * 30) * Math.PI / 180;
    this._ghostEl.setAttribute('x2', String(100 + Math.sin(ga) * 38));
    this._ghostEl.setAttribute('y2', String(100 - Math.cos(ga) * 38));
    this._ghostEl.setAttribute('opacity', '0.2');
    clearTimeout(this._explainT);
    this._explainT = setTimeout(function () {
      self._arcEl.setAttribute('opacity', '0');
      self._ghostEl.setAttribute('opacity', '0');
      if (ne) { ne.halo.setAttribute('opacity', '0'); ne.text.setAttribute('font-size', '17'); }
    }, reduced ? 1900 : 2300);
  },

  /* ---- elapsed band (segmented at hour boundaries) ---- */
  _paintBand: function () {
    if (!this._bandGroup) return;
    while (this._bandGroup.firstChild) this._bandGroup.removeChild(this._bandGroup.firstChild);
    if (this.mode !== 'elapsed' || this.elapsed.start === null) {
      this._ghostMin.setAttribute('opacity', '0');
      return;
    }
    var ns = 'http://www.w3.org/2000/svg';
    var start = this.elapsed.start;
    var end = this.elapsed.end !== null ? this.elapsed.end : this.total;
    var dur = ((end - start) % 720 + 720) % 720;
    /* ghost hands at the start */
    var gh = (start / 2) * Math.PI / 180, gm = ((start % 60) * 6) * Math.PI / 180;
    this._ghostEl.setAttribute('x2', String(100 + Math.sin(gh) * 40));
    this._ghostEl.setAttribute('y2', String(100 - Math.cos(gh) * 40));
    this._ghostEl.setAttribute('opacity', '0.22');
    this._ghostMin.setAttribute('x2', String(100 + Math.sin(gm) * 72));
    this._ghostMin.setAttribute('y2', String(100 - Math.cos(gm) * 72));
    this._ghostMin.setAttribute('opacity', '0.22');
    /* segments: split at hour boundaries of the MINUTE dial (each 60 min = a full lap) */
    var segs = [];
    var s = start;
    var remaining = dur;
    while (remaining > 0) {
      var lapLeft = 60 - (s % 60);
      var take = Math.min(lapLeft, remaining);
      segs.push([s % 60, take]);
      s += take;
      remaining -= take;
    }
    /* draw INSIDE the tick ring (r72, under the minute-hand tip path) so
       the band is unmistakable — thick, high-opacity, with a small gap
       at each hour-boundary seam to show the taught chunking */
    for (var i = 0; i < segs.length; i++) {
      var a0 = segs[i][0] * 6, sweep = segs[i][1] * 6;
      if (sweep <= 0) continue;
      var trim0 = i > 0 ? 1.2 : 0;
      var trim1 = i < segs.length - 1 ? 1.2 : 0;
      var b0 = a0 + trim0, b1 = a0 + sweep - trim1;
      if (b1 <= b0) { b0 = a0; b1 = a0 + sweep; }
      var rMid = 72;
      var large = (b1 - b0) > 180 ? 1 : 0;
      var x0 = 100 + Math.sin(b0 * Math.PI / 180) * rMid, y0 = 100 - Math.cos(b0 * Math.PI / 180) * rMid;
      var x1 = 100 + Math.sin(b1 * Math.PI / 180) * rMid, y1 = 100 - Math.cos(b1 * Math.PI / 180) * rMid;
      var p = document.createElementNS(ns, 'path');
      p.setAttribute('d', 'M' + x0.toFixed(1) + ' ' + y0.toFixed(1) + ' A' + rMid + ' ' + rMid + ' 0 ' + large + ' 1 ' + x1.toFixed(1) + ' ' + y1.toFixed(1));
      p.setAttribute('fill', 'none');
      p.setAttribute('stroke', this.C.HONEY);
      p.setAttribute('stroke-width', '7');
      p.setAttribute('stroke-linecap', i === 0 || i === segs.length - 1 ? 'round' : 'butt');
      p.setAttribute('opacity', String(0.85 - i * 0.06));
      this._bandGroup.appendChild(p);
    }
  },
  _elapsedText: function () {
    if (this.elapsed.start === null) return this.api.t('pinStart');
    var end = this.elapsed.end !== null ? this.elapsed.end : this.total;
    var dur = Math.round(((end - this.elapsed.start) % 720 + 720) % 720);
    if (dur < 60) return this.fmt('durMinutes', { n: dur });
    return this.fmt('durHours', { h: Math.floor(dur / 60), m: dur % 60 });
  },

  /* ---- task mode ---- */
  _pool: function () {
    var g = this._gran();
    var pool = [];
    for (var t = 0; t < 720; t += Math.max(g, 5)) pool.push(t);   /* colloquial pool: min 5-step */
    if (g === 1) { pool = []; for (var i = 0; i < 24; i++) pool.push(Math.floor(Math.random() * 720)); }
    if (pool.length > 24) {
      /* a 24-item shuffled walk */
      var walk = [];
      var stride = Math.floor(pool.length / 24);
      for (var j = 0; j < 24; j++) walk.push(pool[(j * stride + Math.floor(Math.random() * stride)) % pool.length]);
      pool = walk;
    }
    return pool;
  },
  _nextTask: function () {
    if (!this.task.order.length || this.task.idx >= this.task.order.length) {
      var pool = this._pool();
      var prevFirst = this.task.order.length ? this.task.order[this.task.order.length - 1] : null;
      /* Fisher–Yates */
      for (var i = pool.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
      }
      if (pool.length > 1 && pool[0] === prevFirst) { var t0 = pool[0]; pool[0] = pool[1]; pool[1] = t0; }
      this.task.order = pool;
      this.task.idx = 0;
    }
    this.task.target = this.task.order[this.task.idx];
    this.task.idx += 1;
    this.task.phase = 'set';
    this._taskNote = (this.task.done > 0 && this.task.done % 5 === 0) ? this.api.t('niceBreak') : null;
    this._taskNoteKind = 'good';
    /* neutral start pose away from the target */
    this.total = (this.task.target + 180) % 720;
    var g = this._gran();
    this.total = (Math.round(this.total / g) * g) % 720;
    this._speakNow(this.fmt('taskPrompt', { time: this._say(this.task.target) }));
    this.render();
  },
  _checkTask: function () {
    var self = this;
    if (this.total === this.task.target) {
      this.task.phase = 'done';
      this.task.done += 1;
      this._taskNote = this.fmt('youMade', { time: this._say() });
      this._taskNoteKind = 'good';
      this._speakNow(this._say());
      this.render();
      var card = this._wrap.querySelector('.lck-card');
      if (card) { card.classList.remove('glow'); void card.offsetWidth; card.classList.add('glow'); }
    } else {
      this._taskNote = this.fmt('youMade', { time: this._say() }) + ' ' + this.api.t('tryNudge');
      this._taskNoteKind = 'nudge';
      this.render();
    }
  },

  /* shell reset: back to explore at 2:30; keeps settings + saved times */
  reset: function () {
    this.mode = 'explore';
    this.total = 150;
    this.pm = true;
    this.task = { order: [], idx: 0, phase: 'set', target: null, done: 0 };
    this.elapsed = { start: null, end: null };
    this._taskNote = null;
    if (this._panelEl) this._closePanel();
    this.render();
  },
  onSettings: function (key, val) {
    if (key === 'granularity' && (val === '15' || val === '5' || val === '1') && !this.premium) {
      this.api.settings.granularity = '30';
      this._saveStore();
      var self = this;
      requestAnimationFrame(function () {
        if (self._wrap) self._gateInline(self._wrap.querySelector('.lck-dock') || self._wrap, 'gateGran');
      });
      return;
    }
    var g = this._gran();
    this.total = (Math.round(this.total / g) * g) % 720;
    this._saveStore();
    if (this._wrap) this.render();
  },
  paint: function () {},

  /* ==================== gates + our-times panel ===================== */

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.lck-gate');
    if (old) old.remove();
    var g = api.el('div', 'lck-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-learning-clock';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
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
    var scrim = api.el('div', 'lck-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); });
    var panel = api.el('div', 'lck-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('ourTimes'));
    document.querySelector('.lcs-app').append(scrim, panel);
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
    x.setAttribute('aria-label', api.t('deleteBtn'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
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
        /* becomes a task prompt */
        self.mode = 'task';
        self.task.target = total;
        self.task.phase = 'set';
        self.pm = !!ot.pm;
        self.total = (total + 180) % 720;
        var g = self._gran();
        self.total = (Math.round(self.total / g) * g) % 720;
        self._taskNote = null;
        self._speakNow(self.fmt('setOurTime', { label: ot.label, time: self.sayTime(api.lang, ot.h, ot.m, { deQuarter: !!self._store.deQuarter }) }));
        self._closePanel();
        self.render();
      });
      var del = api.el('button', 'lck-linkbtn danger');
      del.type = 'button';
      del.textContent = '✕';
      del.setAttribute('aria-label', api.t('deleteBtn'));
      del.addEventListener('click', function () {
        self._store.ourTimes.splice(i, 1);
        self._saveStore();
        self._renderPanel();
      });
      row.append(play, del);
      body.appendChild(row);
    });
    /* add the current clock time */
    var comp = api.el('div', 'lck-composer');
    var lbl = api.el('div', 'lck-complbl');
    lbl.textContent = api.t('addTime') + ' — ' + this._say();
    var nameIn = document.createElement('input');
    nameIn.className = 'lck-input';
    nameIn.type = 'text';
    nameIn.maxLength = 30;
    nameIn.placeholder = api.t('timeLabelPh');
    var save = api.el('button', 'lck-chip manage');
    save.type = 'button';
    save.textContent = '+';
    save.addEventListener('click', function () {
      var nm = nameIn.value.trim();
      if (!nm || (self._store.ourTimes || []).length >= 12) return;
      self._store.ourTimes.push({ id: 't' + Math.random().toString(36).slice(2, 8), label: nm, h: self._h(), m: self._m(), pm: self.pm });
      self._saveStore();
      nameIn.value = '';
      self._renderPanel();
    });
    comp.append(lbl, nameIn, save);
    body.appendChild(comp);
    panel.appendChild(body);
  }
};

/* per-tool styling: STAGE ONLY + the sanctioned body class + panel */
(function injectCSS() {
  var css = ''
  + 'body.lck-wide .lcs-app{max-width:min(1080px,97vw);}'
  + '@media (max-width:480px){'
  +   'body.lck-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  + '}'
  + '.lck-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(6px,1.2vmin,12px);width:100%;}'
  + '.lck-prompt{font-family:var(--lcs-font-display);font-weight:700;color:var(--lcs-structure);'
  +   'font-size:clamp(20px,3vmin,32px);text-align:center;}'
  + '.lck-prompt em{color:#C9502A;font-style:normal;}'

  + '.lck-main{display:flex;align-items:center;justify-content:center;gap:clamp(14px,3vw,36px);'
  +   'width:100%;position:relative;flex-wrap:wrap;}'
  + '.lck-sky{position:absolute;left:6px;top:-6px;width:64px;height:64px;border:none;background:transparent;'
  +   'cursor:pointer;z-index:2;transition:transform .15s var(--lcs-ease);}'
  + '.lck-sky:hover{transform:scale(1.08);}'
  + '.lck-card{background:#FFFEFB;border-radius:26px;box-shadow:var(--lcs-shadow);'
  +   'padding:clamp(10px,2vmin,20px);transition:box-shadow .5s;}'
  + '.lck-card.glow{animation:lckGlow 1.2s ease-out;}'
  + '@keyframes lckGlow{0%{box-shadow:var(--lcs-shadow),0 0 0 0 rgba(242,200,121,.75);}'
  +   '100%{box-shadow:var(--lcs-shadow),0 0 0 26px rgba(242,200,121,0);}}'
  + '.lck-svg{display:block;width:min(52vh,66vw,460px);height:auto;}'
  + '.lck-num{font-family:var(--lcs-font-display);}'
  + '.lck-num,.lck-halo{transition:opacity .3s,font-size .3s;}'
  + '.lck-hand{cursor:grab;touch-action:none;outline:none;}'
  + '.lck-hand:focus-visible .lck-pad{opacity:.3;}'
  + '.lck-hand:hover .lck-pad{opacity:.26;}'
  + '.lck-hand:active{cursor:grabbing;}'

  /* rail */
  + '.lck-rail{display:flex;flex-direction:column;align-items:center;gap:10px;min-width:min(310px,90vw);max-width:360px;}'
  + '.lck-bubble{position:relative;background:#FFFEFB;border-radius:22px;box-shadow:var(--lcs-shadow);'
  +   'padding:16px 20px;width:100%;box-sizing:border-box;display:flex;align-items:center;gap:12px;'
  +   'min-height:88px;}'
  + '.lck-bubble:before{content:"";position:absolute;left:-9px;top:44%;width:18px;height:18px;'
  +   'background:#FFFEFB;transform:rotate(45deg);box-shadow:-3px 3px 4px rgba(20,30,28,.05);}'
  + '.lck-bubble.dragging .lck-bubbletext{opacity:.55;}'
  + '.lck-bubbletext{flex:1;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(21px,2.6vmin,30px);line-height:1.2;color:var(--lcs-structure);'
  +   'text-align:center;transition:opacity .15s;}'
  + '.lck-speak{width:46px;height:46px;flex:none;display:grid;place-items:center;border-radius:50%;'
  +   'background:#F2784B;color:#fff;border:none;cursor:pointer;'
  +   'box-shadow:0 3px 0 0 #C9502A;transition:transform .1s var(--lcs-ease);}'
  + '.lck-speak:active{transform:translateY(2px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.lck-why{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-structure);'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 14px;min-height:44px;cursor:pointer;}'
  + '.lck-devariant{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;color:var(--lcs-ink-soft);'
  +   'background:var(--lcs-surface);border:1.5px dashed var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:6px 12px;cursor:pointer;}'
  + '.lck-digital{display:flex;flex-direction:column;align-items:center;gap:1px;'
  +   'background:var(--lcs-surface);border:3px solid var(--lcs-structure);border-radius:16px;'
  +   'padding:6px 22px;}'
  + '.lck-d1{font-family:var(--lcs-font-display);font-weight:800;font-variant-numeric:tabular-nums;'
  +   'font-size:clamp(28px,3.6vmin,42px);color:var(--lcs-structure);line-height:1.1;}'
  + '.lck-d2{font-family:var(--lcs-font-body);font-weight:700;font-variant-numeric:tabular-nums;'
  +   'font-size:clamp(15px,2vmin,21px);color:var(--lcs-structure);opacity:.6;}'
  + '.lck-taskrail{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.lck-tasknote{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-ink);'
  +   'background:#FDF0DC;border-radius:var(--lcs-radius-sm);padding:8px 12px;text-align:center;}'
  + '.lck-tasknote.good{background:#E4F2EC;}'

  /* dock */
  + '.lck-dock{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;width:100%;}'
  + '.lck-modes,.lck-grans{display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;}'
  + '.lck-glbl{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;color:var(--lcs-ink-soft);}'
  + '.lck-chip{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 15px;min-height:44px;cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.lck-chip:active{transform:scale(.96);}'
  + '.lck-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.lck-chip.small{min-width:46px;justify-content:center;}'
  + '.lck-chip.manage{color:var(--lcs-structure);}'
  + '.lck-chip.locked{color:var(--lcs-ink-soft);}'
  + '.lck-chip.cta{background:#F2784B;color:#fff;border-color:#F2784B;}'
  + '.lck-big{min-width:150px;min-height:54px;padding:11px 28px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(16px,2.4vmin,20px);box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.lck-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.lck-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'

  /* gate */
  + '.lck-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;'
  +   'margin:8px auto;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.lck-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* panel */
  + '.lck-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;'
  +   'pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.lck-scrim.open{opacity:1;pointer-events:auto;}'
  + '.lck-panel{position:absolute;left:50%;top:6%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(520px,94%);max-height:min(86vh,900px);overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.lck-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.lck-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.lck-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;color:var(--lcs-ink);}'
  + '.lck-panel-close{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;border:none;}'
  + '.lck-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:8px;}'
  + '.lck-prow{display:flex;align-items:center;gap:8px;}'
  + '.lck-prow .lck-chip{flex:1;justify-content:flex-start;text-align:left;}'
  + '.lck-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;color:var(--lcs-structure);'
  +   'background:transparent;border:none;cursor:pointer;text-decoration:underline;padding:6px;}'
  + '.lck-linkbtn.danger{color:#C9502A;}'
  + '.lck-composer{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding-top:10px;'
  +   'border-top:1.5px dashed var(--lcs-line);}'
  + '.lck-complbl{width:100%;font-family:var(--lcs-font-body);font-weight:800;font-size:13px;color:var(--lcs-ink);}'
  + '.lck-input{flex:1;min-width:160px;font-family:var(--lcs-font-body);font-weight:700;font-size:14.5px;'
  +   'padding:10px;border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);box-sizing:border-box;}'

  /* phone */
  /* stacked layout: force the column BEFORE flex-wrap would kick in, and
     point the bubble tail UP at the clock instead of left into空 */
  + '@media (max-width:900px){'
  +   '.lck-main{flex-direction:column;}'
  +   '.lck-bubble:before{left:50%;top:-8px;margin-left:-9px;'
  +     'box-shadow:-3px -3px 4px rgba(20,30,28,.04);}'
  + '}'
  /* phone: compact + let the STAGE scroll so every control stays
     reachable inside the shell\'s fixed-height frame */
  + '@media (max-width:560px){'
  +   'body.lck-wide{overflow-y:auto;}'
  +   '.lck-sky{position:static;align-self:flex-start;width:46px;height:46px;}'
  +   '.lck-bubble{min-height:64px;padding:12px 14px;}'
  +   '.lck-wrap{gap:6px;}'
  + '}'
  + '@media (max-width:400px){'
  +   '.lck-chip[data-g="1"]{display:none;}'
  + '}'
  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.lck-wrap{gap:5px;}'
  +   '.lck-svg{width:min(46vh,60vw,420px);}'
  + '}'
  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.lck-card.glow{animation:none;box-shadow:var(--lcs-shadow),0 0 0 4px rgba(242,200,121,.5);}'
  +   '.lck-arc{transition:none!important;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
