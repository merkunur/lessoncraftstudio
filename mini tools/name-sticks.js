/* =====================================================================
   TOOL #26 — NAME STICKS   (name-sticks.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #8 of the Premium Tools Program
   pilot wave (the FINALE) — fair turn-taking + instant grouping: the
   class roster becomes a jar of illustrated name sticks. Pull one with
   a wooden rattle → the name presents big + spoken (locale TTS with a
   per-name phonetic override — the multilingual moat). Pulled sticks
   rest in a VISIBLE side cup until the jar empties: sampling without
   replacement the whole class can see. Shake mode deals the class into
   2-6 animal-team cups (never numbered — ordinal shame).

   THIS TOOL CREATES THE "MY CLASSES" INFRASTRUCTURE:
   `lcs:my-classes:v1` is a SHARED device-local store owned by no tool —
   future consumers: Center Board (groupings), Letter Studio (name
   tracing), Feelings Check-In (rosters). The hard line: anything a
   second tool would want (rosters, phonetics, fairness cups, groupings)
   lives in my-classes; `lcs:name-sticks:v1` keeps only tool state.
   Writes ROUND-TRIP unknown keys (future tools add fields). Children's
   names are PII: ON-DEVICE ONLY, never transmitted — stated in-product
   and enforced by the harness's no-PII-in-network gate.

   FAIRNESS DOCTRINE (the product promise, property-tested): uniform
   pull via crypto.getRandomValues; the cup persists across reloads AND
   overnight; reshuffle ONLY on exhaustion (a visible moment); skip
   returns the stick to the jar with zero trace (the turn isn't burned);
   absent-today lies flat in a tray, date-scoped by LOCAL date key;
   put-backs exist only as visible actions. No hidden weighting, ever.
   No drumroll/suspense — a short rattle and a calm present.
   ===================================================================== */
var NameSticks = {
  id: 'name-sticks',

  strings: {
    title:        {en:'Name Sticks',de:'Namensstäbchen',fr:'Bâtonnets de prénoms',it:'Bastoncini dei nomi',es:'Palitos con nombre',pt:'Palitos de nomes',nl:'Beurtenstokjes',sv:'Namnpinnar',da:'Navnepinde',no:'Navnepinner',fi:'Nimitikut'},
    instruction:  {en:'Every name goes in the jar. Pull a stick — pulled names rest in the cup until everyone has had a turn.',de:'Alle Namen kommen ins Glas. Zieh ein Stäbchen — gezogene Namen warten im Becher, bis alle dran waren.',fr:'Tous les prénoms vont dans le pot. Tire un bâtonnet — les prénoms tirés se reposent dans le gobelet jusqu’à ce que tout le monde soit passé.',it:'Tutti i nomi vanno nel barattolo. Pesca un bastoncino — i nomi pescati riposano nel bicchiere finché non è toccato a tutti.',es:'Todos los nombres van al frasco. Saca un palito — los nombres que salen descansan en el vaso hasta que todos hayan pasado.',pt:'Todos os nomes vão para o pote. Puxe um palito — os nomes puxados descansam no copo até todo mundo ter a vez.',nl:'Alle namen gaan in de pot. Trek een stokje — getrokken namen wachten in de beker tot iedereen aan de beurt is geweest.',sv:'Alla namn ligger i burken. Dra en pinne — dragna namn vilar i muggen tills alla har fått sin tur.',da:'Alle navne ligger i krukken. Træk en pind — trukne navne hviler i bægeret, til alle har haft en tur.',no:'Alle navnene ligger i krukken. Trekk en pinne — trukne navn venter i koppen til alle har fått sin tur.',fi:'Kaikki nimet ovat purkissa. Nosta tikku — nostetut nimet odottavat mukissa, kunnes jokainen on saanut vuoronsa.'},
    /* modes + dock */
    modePull:     {en:'Pull sticks',de:'Stäbchen ziehen',fr:'Bâtonnets',it:'Pesca',es:'Sacar palitos',pt:'Puxar palitos',nl:'Stokjes trekken',sv:'Dra pinnar',da:'Træk pinde',no:'Trekk pinner',fi:'Nosta tikkuja'},
    modeGroups:   {en:'Teams',de:'Teams',fr:'Équipes',it:'Squadre',es:'Equipos',pt:'Equipes',nl:'Groepjes',sv:'Lag',da:'Hold',no:'Lag',fi:'Ryhmät'},
    pullBtn:      {en:'Pull a stick',de:'Stäbchen ziehen',fr:'Tirer un bâtonnet',it:'Pesca un bastoncino',es:'Sacar un palito',pt:'Puxar um palito',nl:'Trek een stokje',sv:'Dra en pinne',da:'Træk en pind',no:'Trekk en pinne',fi:'Nosta tikku'},
    pullCountAria:{en:'How many sticks per pull',de:'Wie viele Stäbchen pro Zug',fr:'Combien de bâtonnets par tirage',it:'Quanti bastoncini a ogni pescata',es:'Cuántos palitos se sacan a la vez',pt:'Quantos palitos por vez',nl:'Hoeveel stokjes per keer',sv:'Hur många pinnar åt gången',da:'Hvor mange pinde pr. træk',no:'Hvor mange pinner per trekk',fi:'Montako tikkua kerralla'},
    skip:         {en:'Back in the jar',de:'Zurück ins Glas',fr:'Retour dans le pot',it:'Torna nel barattolo',es:'De vuelta al frasco',pt:'De volta ao pote',nl:'Terug in de pot',sv:'Tillbaka i burken',da:'Tilbage i krukken',no:'Tilbake i krukken',fi:'Takaisin purkkiin'},
    absentBtn:    {en:'Absent today',de:'Heute nicht da',fr:'Absent aujourd’hui',it:'Assente oggi',es:'Hoy no vino',pt:'Faltou hoje',nl:'Vandaag afwezig',sv:'Borta i dag',da:'Fraværende i dag',no:'Borte i dag',fi:'Poissa tänään'},
    undo:         {en:'Undo',de:'Rückgängig',fr:'Annuler',it:'Annulla',es:'Deshacer',pt:'Desfazer',nl:'Ongedaan maken',sv:'Ångra',da:'Fortryd',no:'Angre',fi:'Kumoa'},
    speakAgain:   {en:'Say the name again',de:'Namen noch einmal sagen',fr:'Redire le prénom',it:'Ripeti il nome',es:'Decir el nombre otra vez',pt:'Falar o nome de novo',nl:'Zeg de naam nog eens',sv:'Säg namnet igen',da:'Sig navnet igen',no:'Si navnet en gang til',fi:'Sano nimi uudelleen'},
    sticksLeft:   {en:'{n} sticks left',de:'Noch {n} Stäbchen',fr:'Encore {n} bâtonnets',it:'{n} bastoncini rimasti',es:'Quedan {n} palitos',pt:'Restam {n} palitos',nl:'Nog {n} stokjes',sv:'{n} pinnar kvar',da:'{n} pinde tilbage',no:'{n} pinner igjen',fi:'{n} tikkua jäljellä'},
    cupAria:      {en:'The cup — names that have had a turn',de:'Der Becher — Namen, die schon dran waren',fr:'Le gobelet — prénoms déjà passés',it:'Il bicchiere — nomi già passati',es:'El vaso — nombres que ya pasaron',pt:'O copo — nomes que já tiveram a vez',nl:'De beker — namen die al aan de beurt zijn geweest',sv:'Muggen — namn som har fått sin tur',da:'Bægeret — navne, der har haft en tur',no:'Koppen — navn som har fått sin tur',fi:'Muki — nimet, jotka ovat jo saaneet vuoronsa'},
    absentTray:   {en:'Away today',de:'Heute nicht dabei',fr:'Absents aujourd’hui',it:'Assenti oggi',es:'Faltaron hoy',pt:'Faltaram hoje',nl:'Vandaag niet op school',sv:'Borta i dag',da:'Hjemme i dag',no:'Borte i dag',fi:'Poissa tänään'},
    backIn:       {en:'Back in',de:'Wieder dabei',fr:'De retour',it:'Rientra',es:'Ya regresó',pt:'Voltou',nl:'Weer terug',sv:'Är tillbaka',da:'Tilbage igen',no:'Tilbake igjen',fi:'Takaisin mukaan'},
    emptyJar:     {en:'Everyone has had a turn.',de:'Alle waren einmal dran.',fr:'Tout le monde est passé.',it:'Tutti hanno avuto il loro turno.',es:'Ya pasaron todos.',pt:'Todo mundo teve a vez.',nl:'Iedereen is aan de beurt geweest.',sv:'Alla har fått sin tur.',da:'Alle har haft en tur.',no:'Alle har fått sin tur.',fi:'Jokainen on saanut vuoronsa.'},
    tipBack:      {en:'Tip them back in',de:'Alle zurück ins Glas',fr:'Verse-les dans le pot',it:'Versali nel barattolo',es:'Regresarlos al frasco',pt:'Virar tudo de volta no pote',nl:'Kieper ze terug',sv:'Häll tillbaka dem',da:'Hæld dem tilbage',no:'Hell dem tilbake',fi:'Kaada takaisin purkkiin'},
    /* groups */
    shake:        {en:'Shake into teams',de:'In Teams schütteln',fr:'Secouer pour faire les équipes',it:'Scuoti e fai le squadre',es:'Agitar para formar equipos',pt:'Chacoalhar em equipes',nl:'Schud in groepjes',sv:'Skaka fram lagen',da:'Ryst holdene frem',no:'Rist ut lagene',fi:'Ravista ryhmiin'},
    resetGroups:  {en:'New teams',de:'Neue Teams',fr:'Nouvelles équipes',it:'Nuove squadre',es:'Equipos nuevos',pt:'Novas equipes',nl:'Nieuwe groepjes',sv:'Nya lag',da:'Nye hold',no:'Nye lag',fi:'Uudet ryhmät'},
    cupsLabel:    {en:'Teams',de:'Teams',fr:'Équipes',it:'Squadre',es:'Equipos',pt:'Equipes',nl:'Groepjes',sv:'Lag',da:'Hold',no:'Lag',fi:'Ryhmiä'},
    groupsSaved:  {en:'Teams saved',de:'Teams gespeichert',fr:'Équipes enregistrées',it:'Squadre salvate',es:'Equipos guardados',pt:'Equipes salvas',nl:'Groepjes opgeslagen',sv:'Lagen sparade',da:'Holdene er gemt',no:'Lagene er lagret',fi:'Ryhmät tallennettu'},
    teamFox:      {en:'Fox team',de:'Team Fuchs',fr:'Équipe Renard',it:'Squadra Volpe',es:'Equipo Zorro',pt:'Time Raposa',nl:'Team Vos',sv:'Rävlaget',da:'Ræveholdet',no:'Revelaget',fi:'Ketut'},
    teamTurtle:   {en:'Turtle team',de:'Team Schildkröte',fr:'Équipe Tortue',it:'Squadra Tartaruga',es:'Equipo Tortuga',pt:'Time Tartaruga',nl:'Team Schildpad',sv:'Sköldpaddslaget',da:'Skildpaddeholdet',no:'Skilpaddelaget',fi:'Kilpikonnat'},
    teamBee:      {en:'Bee team',de:'Team Biene',fr:'Équipe Abeille',it:'Squadra Ape',es:'Equipo Abeja',pt:'Time Abelha',nl:'Team Bij',sv:'Bi-laget',da:'Biholdet',no:'Bielaget',fi:'Mehiläiset'},
    teamRabbit:   {en:'Rabbit team',de:'Team Hase',fr:'Équipe Lapin',it:'Squadra Coniglio',es:'Equipo Conejo',pt:'Time Coelho',nl:'Team Konijn',sv:'Kaninlaget',da:'Kaninholdet',no:'Kaninlaget',fi:'Puput'},
    teamWhale:    {en:'Whale team',de:'Team Wal',fr:'Équipe Baleine',it:'Squadra Balena',es:'Equipo Ballena',pt:'Time Baleia',nl:'Team Walvis',sv:'Val-laget',da:'Hvalholdet',no:'Hvallaget',fi:'Valaat'},
    teamOwl:      {en:'Owl team',de:'Team Eule',fr:'Équipe Hibou',it:'Squadra Gufo',es:'Equipo Búho',pt:'Time Coruja',nl:'Team Uil',sv:'Ugglelaget',da:'Ugleholdet',no:'Uglelaget',fi:'Pöllöt'},
    /* roster panel */
    rosterBtn:    {en:'My classes',de:'Meine Klassen',fr:'Mes classes',it:'Le mie classi',es:'Mis grupos',pt:'Minhas turmas',nl:'Mijn klassen',sv:'Mina klasser',da:'Mine klasser',no:'Mine klasser',fi:'Omat luokat'},
    rosterTitle:  {en:'Class list',de:'Klassenliste',fr:'Liste de classe',it:'Elenco della classe',es:'Lista del grupo',pt:'Lista da turma',nl:'Klassenlijst',sv:'Klasslista',da:'Klasseliste',no:'Klasseliste',fi:'Luokkalista'},
    pasteHint:    {en:'Paste your class list — one name per line',de:'Füge deine Klassenliste ein — ein Name pro Zeile',fr:'Colle ta liste de classe — un prénom par ligne',it:'Incolla l’elenco della classe — un nome per riga',es:'Pega tu lista del grupo — un nombre por línea',pt:'Cole a lista da turma — um nome por linha',nl:'Plak je klassenlijst — één naam per regel',sv:'Klistra in din klasslista — ett namn per rad',da:'Indsæt din klasseliste — ét navn pr. linje',no:'Lim inn klasselisten — ett navn per linje',fi:'Liitä luokkalistasi — yksi nimi riville'},
    addNames:     {en:'Add names',de:'Namen hinzufügen',fr:'Ajouter les prénoms',it:'Aggiungi i nomi',es:'Agregar nombres',pt:'Adicionar nomes',nl:'Namen toevoegen',sv:'Lägg till namn',da:'Tilføj navne',no:'Legg til navn',fi:'Lisää nimet'},
    privacyLine:  {en:'Names are stored only on this device — they are never sent anywhere.',de:'Die Namen werden nur auf diesem Gerät gespeichert — sie werden nie irgendwohin gesendet.',fr:'Les prénoms restent uniquement sur cet appareil — ils ne sont jamais envoyés nulle part.',it:'I nomi restano solo su questo dispositivo — non vengono mai inviati da nessuna parte.',es:'Los nombres se guardan solo en este dispositivo — nunca se envían a ningún lado.',pt:'Os nomes ficam somente neste aparelho — nunca são enviados a lugar nenhum.',nl:'Namen blijven alleen op dit apparaat — ze worden nooit ergens naartoe gestuurd.',sv:'Namnen sparas bara på den här enheten — de skickas aldrig någonstans.',da:'Navnene gemmes kun på denne enhed — de sendes aldrig nogen steder hen.',no:'Navnene lagres bare på denne enheten — de sendes aldri noe sted.',fi:'Nimet tallentuvat vain tälle laitteelle — niitä ei koskaan lähetetä minnekään.'},
    freeNote:     {en:'Free class lists last for today’s session. Premium keeps your classes on this device.',de:'Kostenlose Klassenlisten gelten nur für heute. Mit Premium bleiben deine Klassen auf diesem Gerät gespeichert.',fr:'En version gratuite, la liste de classe dure la journée. Premium garde tes classes sur cet appareil.',it:'Gli elenchi gratuiti valgono per la sessione di oggi. Premium conserva le tue classi su questo dispositivo.',es:'Las listas gratis duran solo la sesión de hoy. Premium guarda tus grupos en este dispositivo.',pt:'As listas grátis valem só por hoje. O Premium guarda suas turmas neste aparelho.',nl:'Een gratis klassenlijst geldt voor vandaag. Met Premium blijven je klassen op dit apparaat bewaard.',sv:'Gratis klasslistor räcker dagen ut. Med Premium finns dina klasser kvar på den här enheten.',da:'Gratis klasselister gælder dagen ud. Premium gemmer dine klasser på denne enhed.',no:'Gratis klasselister varer ut dagens økt. Premium beholder klassene dine på denne enheten.',fi:'Ilmainen luokkalista säilyy tämän päivän ajan. Premium säilyttää luokkasi tällä laitteella.'},
    phoneticPh:   {en:'Say it like… (optional)',de:'Klingt wie… (optional)',fr:'Ça se prononce… (facultatif)',it:'Si pronuncia… (facoltativo)',es:'Se pronuncia… (opcional)',pt:'Como se fala… (opcional)',nl:'Spreek uit als… (optioneel)',sv:'Uttalas som… (valfritt)',da:'Udtales som… (valgfrit)',no:'Uttales som… (valgfritt)',fi:'Lausutaan näin… (valinnainen)'},
    playTest:     {en:'Hear it',de:'Anhören',fr:'Écouter',it:'Ascolta',es:'Escuchar',pt:'Ouvir',nl:'Luister',sv:'Lyssna',da:'Lyt',no:'Hør',fi:'Kuuntele'},
    newClass:     {en:'New class',de:'Neue Klasse',fr:'Nouvelle classe',it:'Nuova classe',es:'Nuevo grupo',pt:'Nova turma',nl:'Nieuwe klas',sv:'Ny klass',da:'Ny klasse',no:'Ny klasse',fi:'Uusi luokka'},
    classNamePh:  {en:'Class name (e.g. Room 4B)',de:'Klassenname (z. B. Klasse 2a)',fr:'Nom de la classe (ex. CP B)',it:'Nome della classe (es. 2ª B)',es:'Nombre del grupo (p. ej. 2.º B)',pt:'Nome da turma (ex.: 2º B)',nl:'Naam van de klas (bijv. groep 4b)',sv:'Klassens namn (t.ex. 2B)',da:'Klassens navn (f.eks. 2.b)',no:'Klassens navn (f.eks. 2B)',fi:'Luokan nimi (esim. 2B)'},
    deleteClass:  {en:'Delete class',de:'Klasse löschen',fr:'Supprimer la classe',it:'Elimina la classe',es:'Eliminar el grupo',pt:'Excluir a turma',nl:'Klas verwijderen',sv:'Ta bort klassen',da:'Slet klassen',no:'Slett klassen',fi:'Poista luokka'},
    startFresh:   {en:'Start a fresh jar (everyone back in)',de:'Glas neu füllen (alle wieder rein)',fr:'Repartir à zéro (tout le monde dans le pot)',it:'Barattolo nuovo (tutti di nuovo dentro)',es:'Frasco nuevo (todos adentro otra vez)',pt:'Pote novo (todo mundo de volta)',nl:'Nieuwe ronde (iedereen weer in de pot)',sv:'Ny burk (alla namn tillbaka)',da:'Start på en frisk (alle pinde tilbage i krukken)',no:'Ny krukke (alle oppi igjen)',fi:'Uusi purkki (kaikki nimet takaisin)'},
    dupPrompt:    {en:'You have two named {name} — add a last initial.',de:'Es gibt zwei Kinder namens {name} — ergänze den ersten Buchstaben des Nachnamens.',fr:'Il y a deux {name} — ajoute l’initiale du nom.',it:'Ci sono due {name} — aggiungi l’iniziale del cognome.',es:'Hay dos con el nombre {name} — agrega la inicial del apellido.',pt:'Tem duas crianças chamadas {name} — acrescente a inicial do sobrenome.',nl:'Er zijn twee kinderen die {name} heten — voeg de eerste letter van de achternaam toe.',sv:'Det finns två som heter {name} — lägg till första bokstaven i efternamnet.',da:'Der er to, der hedder {name} — tilføj efternavnets forbogstav.',no:'Det er to som heter {name} — legg til forbokstaven i etternavnet.',fi:'Luokassa on kaksi lasta nimeltä {name} — lisää sukunimen alkukirjain.'},
    removeName:   {en:'Remove',de:'Entfernen',fr:'Retirer',it:'Rimuovi',es:'Quitar',pt:'Remover',nl:'Verwijderen',sv:'Ta bort',da:'Fjern',no:'Fjern',fi:'Poista'},
    noNames:      {en:'Add your class to begin',de:'Füge deine Klasse hinzu, um zu starten',fr:'Ajoute ta classe pour commencer',it:'Aggiungi la tua classe per iniziare',es:'Agrega tu grupo para empezar',pt:'Adicione sua turma para começar',nl:'Voeg je klas toe om te beginnen',sv:'Lägg till din klass för att börja',da:'Tilføj din klasse for at komme i gang',no:'Legg til klassen din for å begynne',fi:'Aloita lisäämällä luokkasi'},
    /* gates */
    gateGroups:   {en:'The team maker is part of Premium — pulling sticks is always free.',de:'Teams schütteln ist Teil von Premium — Stäbchen ziehen bleibt immer kostenlos.',fr:'Le mode Équipes fait partie de Premium — tirer les bâtonnets reste toujours gratuit.',it:'Fare le squadre è una funzione Premium — pescare i bastoncini resta sempre gratuito.',es:'Armar equipos es parte de Premium — sacar palitos siempre es gratis.',pt:'Montar equipes faz parte do Premium — puxar palitos é sempre grátis.',nl:'De groepjesmaker hoort bij Premium — stokjes trekken blijft altijd gratis.',sv:'Lagblandaren ingår i Premium — att dra pinnar är alltid gratis.',da:'Holddeling er en del af Premium — at trække pinde er altid gratis.',no:'Laginndelingen er en del av Premium — å trekke pinner er alltid gratis.',fi:'Ryhmäjako kuuluu Premiumiin — tikkujen nostaminen on aina ilmaista.'},
    gateClasses:  {en:'Saved classes are part of Premium — today’s list works free, it just won’t be here tomorrow.',de:'Gespeicherte Klassen gehören zu Premium — die heutige Liste ist kostenlos, sie ist morgen nur nicht mehr da.',fr:'Les classes enregistrées font partie de Premium — la liste du jour fonctionne gratuitement, elle ne sera simplement plus là demain.',it:'Le classi salvate fanno parte di Premium — l’elenco di oggi funziona gratis, solo che domani non ci sarà più.',es:'Los grupos guardados son parte de Premium — la lista de hoy funciona gratis, solo que mañana no estará.',pt:'As turmas salvas fazem parte do Premium — a lista de hoje funciona grátis, só não estará aqui amanhã.',nl:'Opgeslagen klassen horen bij Premium — de lijst van vandaag werkt gratis, hij is er morgen alleen niet meer.',sv:'Sparade klasser ingår i Premium — dagens lista funkar gratis, den finns bara inte kvar i morgon.',da:'Gemte klasser er en del af Premium — dagens liste virker gratis, den er her bare ikke i morgen.',no:'Lagrede klasser er en del av Premium — dagens liste kan du bruke gratis, den er bare borte i morgen.',fi:'Tallennetut luokat kuuluvat Premiumiin — tämän päivän lista toimii ilmaiseksi, se ei vain säily huomiseen.'},
    unlock:       {en:'Keep your classes',de:'Klassen behalten',fr:'Garder mes classes',it:'Conserva le tue classi',es:'Conservar tus grupos',pt:'Manter suas turmas',nl:'Bewaar je klassen',sv:'Behåll dina klasser',da:'Behold dine klasser',no:'Behold klassene dine',fi:'Säilytä luokkasi'},
    /* settings */
    setSpeak:     {en:'Say the name on pull',de:'Namen beim Ziehen sprechen',fr:'Dire le prénom au tirage',it:'Pronuncia il nome a ogni pescata',es:'Decir el nombre al sacar',pt:'Falar o nome ao puxar',nl:'Naam zeggen bij het trekken',sv:'Säg namnet när pinnen dras',da:'Sig navnet, når pinden trækkes',no:'Si navnet når pinnen trekkes',fi:'Sano nimi nostettaessa'},
    setThink:     {en:'Quiet think-time before the name',de:'Stille Denkzeit vor dem Namen',fr:'Temps de réflexion avant le prénom',it:'Tempo per pensare prima del nome',es:'Tiempo para pensar antes del nombre',pt:'Tempo para pensar antes do nome',nl:'Stille denktijd vóór de naam',sv:'Tyst tänketid före namnet',da:'Stille tænketid før navnet',no:'Stille tenketid før navnet',fi:'Hiljainen miettimisaika ennen nimeä'},
    setRattle:    {en:'Jar sounds',de:'Glasgeräusche',fr:'Sons du pot',it:'Suoni del barattolo',es:'Sonidos del frasco',pt:'Sons do pote',nl:'Rammelgeluidjes',sv:'Burkljud',da:'Krukkelyde',no:'Krukkelyder',fi:'Purkin äänet'},
    loading:      {en:'Sanding the sticks…',de:'Die Stäbchen werden geschliffen…',fr:'On ponce les bâtonnets…',it:'Stiamo levigando i bastoncini…',es:'Lijando los palitos…',pt:'Lixando os palitos…',nl:'De stokjes worden geschuurd…',sv:'Pinnarna slipas…',da:'Pindene slibes…',no:'Pinnene pusses…',fi:'Tikkuja hiotaan…'}
  },

  defaults: { speak: true, think: false, rattle: true },
  settings: [
    { key:'speak', type:'toggle', labelKey:'setSpeak' },
    { key:'think', type:'toggle', labelKey:'setThink' },
    { key:'rattle', type:'toggle', labelKey:'setRattle' }
  ],

  MC_KEY: 'lcs:my-classes:v1',
  STORE_KEY: 'lcs:name-sticks:v1',
  SESSION_KEY: 'lcs:name-sticks:session',
  ENT_TRUST_DAYS: 14,
  TINTS: ['#F2784B', '#BFE3DC', '#F2C879'],
  /* ink = header text color: dark on the light cups (honey/mint) so the
     team name stays readable at 8 metres */
  TEAMS: [
    { key:'teamFox', color:'#F2784B', animal:'fox', ink:'#fff' },
    { key:'teamTurtle', color:'#146B5E', animal:'turtle', ink:'#fff' },
    { key:'teamBee', color:'#F2C879', animal:'bee', ink:'#1F2A28' },
    { key:'teamRabbit', color:'#BFE3DC', animal:'rabbit', ink:'#1F2A28' },
    { key:'teamWhale', color:'#8B6BAE', animal:'whale', ink:'#fff' },
    { key:'teamOwl', color:'#4A90B8', animal:'owl', ink:'#fff' }
  ],
  /* 12 tiny 2-color glyphs — teal line-art on a tinted disc */
  ANIMALS: {
    fox:      '<path d="M5 7 L9 11 M19 7 L15 11" stroke-width="2.2"/><path d="M5 7 Q12 4 19 7 Q20 15 12 19 Q4 15 5 7 Z"/><circle cx="9.5" cy="12" r="1" fill="#146B5E"/><circle cx="14.5" cy="12" r="1" fill="#146B5E"/><path d="M12 14 l0 2" stroke-width="2"/>',
    turtle:   '<path d="M5 14 Q12 4 19 14 Z"/><path d="M9 13 l0 -4 M15 13 l0 -4 M12 14 l0 -6" stroke-width="1.6"/><ellipse cx="12" cy="16" rx="9" ry="2.6"/><circle cx="20" cy="13.5" r="1.8"/>',
    bird:     '<circle cx="12" cy="12" r="7"/><path d="M19 12 l4 -1.5 -4 -1.5" fill="#146B5E"/><circle cx="14" cy="10" r="1" fill="#146B5E"/><path d="M6 12 Q10 15 12 12" stroke-width="1.8"/>',
    frog:     '<circle cx="8" cy="8" r="3.4"/><circle cx="16" cy="8" r="3.4"/><circle cx="8" cy="8" r="1" fill="#146B5E"/><circle cx="16" cy="8" r="1" fill="#146B5E"/><path d="M4 15 Q12 21 20 15" stroke-width="2.2"/>',
    cat:      '<path d="M6 10 L5 4 L10 7 M18 10 L19 4 L14 7" stroke-width="2"/><circle cx="12" cy="13" r="7"/><circle cx="9.5" cy="12" r="1" fill="#146B5E"/><circle cx="14.5" cy="12" r="1" fill="#146B5E"/><path d="M4 15 l4 0 M16 15 l4 0" stroke-width="1.6"/>',
    rabbit:   '<ellipse cx="9" cy="6" rx="2.2" ry="5"/><ellipse cx="15" cy="6" rx="2.2" ry="5"/><circle cx="12" cy="15" r="6.4"/><circle cx="10" cy="14" r="1" fill="#146B5E"/><circle cx="14" cy="14" r="1" fill="#146B5E"/>',
    bee:      '<ellipse cx="12" cy="13" rx="7" ry="5.6"/><path d="M9 8.5 l0 9 M12 7.6 l0 10.8 M15 8.5 l0 9" stroke-width="2"/><ellipse cx="7" cy="6" rx="3.4" ry="2.2"/><ellipse cx="17" cy="6" rx="3.4" ry="2.2"/>',
    whale:    '<path d="M4 13 Q12 6 20 13 Q16 19 12 19 Q8 19 4 13 Z"/><path d="M17 8 Q18 4 15 4 M17 8 Q20 6 20 3" stroke-width="1.8"/><circle cx="9" cy="13" r="1" fill="#146B5E"/>',
    hedgehog: '<path d="M5 15 L8 9 L10 13 L12 8 L14 13 L16 9 L19 15 Z"/><ellipse cx="12" cy="16" rx="8" ry="3.4"/><circle cx="18" cy="15.4" r="1" fill="#146B5E"/>',
    owl:      '<circle cx="12" cy="13" r="8"/><circle cx="9" cy="11" r="2.8"/><circle cx="15" cy="11" r="2.8"/><circle cx="9" cy="11" r="1" fill="#146B5E"/><circle cx="15" cy="11" r="1" fill="#146B5E"/><path d="M12 13 l-1.4 2 2.8 0 Z" fill="#146B5E"/>',
    snail:    '<circle cx="10" cy="11" r="6"/><circle cx="10" cy="11" r="3"/><path d="M4 19 L20 19 M17 19 Q19 14 18 10" stroke-width="2.2"/><circle cx="19" cy="9" r="1.4"/>',
    deer:     '<path d="M8 8 L6 3 M8 8 L4 6 M16 8 L18 3 M16 8 L20 6" stroke-width="2"/><ellipse cx="12" cy="14" rx="6.4" ry="7"/><circle cx="10" cy="12" r="1" fill="#146B5E"/><circle cx="14" cy="12" r="1" fill="#146B5E"/><ellipse cx="12" cy="17" rx="1.6" ry="1.2" fill="#146B5E"/>'
  },
  ANIMAL_KEYS: ['fox', 'turtle', 'bird', 'frog', 'cat', 'rabbit', 'bee', 'whale', 'hedgehog', 'owl', 'snail', 'deer'],

  /* =========================== lifecycle =========================== */

  init: function (api) {
    var self = this;
    this.api = api;
    this.premium = false;
    this.mode = 'pull';
    this._presented = [];
    this._undoSnap = null;
    this._audio = null;
    this._pullCount = 1;

    this._store = this._loadJSON(this.STORE_KEY) || {};
    if (!this._store.v) this._store.v = 1;
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    this._mc = this._loadJSON(this.MC_KEY) || {};
    if (!this._mc.v) { this._mc.v = 1; }
    if (!this._mc.classes) this._mc.classes = [];
    if (!this._mc.fairness) this._mc.fairness = {};
    if (!this._mc.groupings) this._mc.groupings = {};

    this._session = this._loadSession() || { students: [], fair: { drawnIds: [], absent: { dateKey: this._dateKey(), ids: [] } }, grouping: null };

    /* absent lists are date-scoped: auto-clear on a new LOCAL day */
    this._clearStaleAbsent();

    var params = new URLSearchParams(location.search);
    if (params.get('mode') === 'groups') this.mode = 'groups';
    var cups = parseInt(params.get('cups'), 10);
    this.cupCount = (cups >= 2 && cups <= 6) ? cups : (this._store.cupCount || 3);
    var cid = params.get('class');
    if (cid && this._mc.classes.some(function (c) { return c.id === cid; })) this._mc.activeClassId = cid;

    this._fetchEntitlement();
  },

  _loadJSON: function (key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch (_) { return null; }
  },
  _loadSession: function () {
    try { return JSON.parse(sessionStorage.getItem(this.SESSION_KEY)); } catch (_) { return null; }
  },
  _saveSession: function () {
    try { sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(this._session)); } catch (_) {}
  },
  /* my-classes writes ROUND-TRIP unknown keys: we mutate the parsed
     object in place and re-serialize it whole — future tools' fields
     survive a Name Sticks save untouched */
  _saveMC: function () {
    try { localStorage.setItem(this.MC_KEY, JSON.stringify(this._mc)); } catch (_) {}
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    st.cupCount = this.cupCount;
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },
  /* LOCAL date key — never toISOString (the UTC-midnight rule) */
  _dateKey: function () {
    var d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
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

  /* ==================== roster + fairness context =================== */

  _activeClass: function () {
    if (!this.premium) return null;
    var id = this._mc.activeClassId;
    for (var i = 0; i < this._mc.classes.length; i++) if (this._mc.classes[i].id === id) return this._mc.classes[i];
    return this._mc.classes[0] || null;
  },
  _students: function () {
    var cls = this._activeClass();
    if (cls) return cls.students;
    return this._session.students;
  },
  _fair: function () {
    var cls = this._activeClass();
    if (cls) {
      if (!this._mc.fairness[cls.id]) this._mc.fairness[cls.id] = { drawnIds: [], absent: { dateKey: this._dateKey(), ids: [] }, cycleStartedAt: Date.now() };
      return this._mc.fairness[cls.id];
    }
    return this._session.fair;
  },
  _persistFair: function () {
    if (this._activeClass()) this._saveMC(); else this._saveSession();
  },
  _clearStaleAbsent: function () {
    var today = this._dateKey();
    var self = this;
    Object.keys(this._mc.fairness || {}).forEach(function (cid) {
      var f = self._mc.fairness[cid];
      if (f.absent && f.absent.dateKey !== today) f.absent = { dateKey: today, ids: [] };
    });
    if (this._session.fair.absent.dateKey !== today) this._session.fair.absent = { dateKey: today, ids: [] };
    this._saveMC(); this._saveSession();
  },
  _absentIds: function () {
    var f = this._fair();
    return (f.absent && f.absent.dateKey === this._dateKey()) ? f.absent.ids : [];
  },
  _eligible: function () {
    var f = this._fair();
    var absent = this._absentIds();
    return this._students().filter(function (s) {
      return f.drawnIds.indexOf(s.id) < 0 && absent.indexOf(s.id) < 0;
    });
  },
  _byId: function (id) {
    var st = this._students();
    for (var i = 0; i < st.length; i++) if (st[i].id === id) return st[i];
    return null;
  },
  _uid: function (prefix) {
    var s = '';
    try {
      var a = new Uint32Array(2);
      crypto.getRandomValues(a);
      s = a[0].toString(36) + a[1].toString(36);
    } catch (_) { s = Math.random().toString(36).slice(2, 10); }
    return prefix + s.slice(0, 8);
  },
  /* uniform integer in [0, n) — rejection-sampled crypto */
  _rand: function (n) {
    if (n <= 0) return 0;
    try {
      var max = Math.floor(0x100000000 / n) * n;
      var a = new Uint32Array(1);
      do { crypto.getRandomValues(a); } while (a[0] >= max);
      return a[0] % n;
    } catch (_) { return Math.floor(Math.random() * n); }
  },

  /* ======================= fairness actions ======================== */

  _pull: function () {
    var api = this.api;
    var f = this._fair();
    var count = this._pullCount;
    var picked = [];
    for (var i = 0; i < count; i++) {
      var el = this._eligible();
      if (!el.length) break;
      var s = el[this._rand(el.length)];
      f.drawnIds.push(s.id);
      picked.push(s.id);
    }
    if (!picked.length) return;
    this._undoSnap = { drawnIds: f.drawnIds.slice(0, f.drawnIds.length - picked.length), presented: this._presented.slice() };
    this._presented = picked;
    this._persistFair();
    this._log('pull', picked);
    if (api.settings.rattle) this._rattle();
    if (api.settings.speak) this._speakPresented();
    this.render();
  },
  _speakPresented: function () {
    var self = this, api = this.api;
    var names = this._presented.map(function (id) {
      var s = self._byId(id);
      return s ? (s.phonetic || s.name) : '';
    }).filter(Boolean);
    if (!names.length) return;
    var say = function () {
      names.forEach(function (n, i) {
        setTimeout(function () {
          try { LCSAudio.speak({ type: 'ui', text: n, lang: api.lang, rate: 0.9 }); } catch (_) {}
        }, i * 1400);
      });
    };
    api.announce(this._presented.map(function (id) { var s = self._byId(id); return s ? s.name : ''; }).join(', '));
    if (api.settings.think) setTimeout(say, 5000); else say();
  },
  _skip: function () {
    /* "not right now" — the stick returns to the JAR, zero trace */
    var f = this._fair();
    var self = this;
    this._presented.forEach(function (id) {
      var i = f.drawnIds.indexOf(id);
      if (i >= 0) f.drawnIds.splice(i, 1);
    });
    this._presented = [];
    this._undoSnap = null;
    this._persistFair();
    this._log('skip');
    this.render();
  },
  _markAbsent: function () {
    var f = this._fair();
    var self = this;
    if (!f.absent || f.absent.dateKey !== this._dateKey()) f.absent = { dateKey: this._dateKey(), ids: [] };
    this._presented.forEach(function (id) {
      var i = f.drawnIds.indexOf(id);
      if (i >= 0) f.drawnIds.splice(i, 1);
      if (f.absent.ids.indexOf(id) < 0) f.absent.ids.push(id);
    });
    this._presented = [];
    this._undoSnap = null;
    this._persistFair();
    this._log('absent');
    this.render();
  },
  _unmarkAbsent: function (id) {
    var f = this._fair();
    var i = (f.absent && f.absent.ids || []).indexOf(id);
    if (i >= 0) f.absent.ids.splice(i, 1);
    this._persistFair();
    this.render();
  },
  _undo: function () {
    if (!this._undoSnap) return;
    var f = this._fair();
    f.drawnIds = this._undoSnap.drawnIds;
    this._presented = this._undoSnap.presented;
    this._undoSnap = null;
    this._persistFair();
    this.render();
  },
  _tipBack: function () {
    var f = this._fair();
    f.drawnIds = [];
    f.cycleStartedAt = Date.now();
    this._presented = [];
    this._undoSnap = null;
    this._persistFair();
    this._log('reshuffle');
    if (this.api.settings.rattle) this._rattle();
    this.render();
  },

  /* ========================= group maker =========================== */

  _shake: function () {
    var f = this._fair();
    var absent = this._absentIds();
    var pool = this._students().filter(function (s) { return absent.indexOf(s.id) < 0; }).map(function (s) { return s.id; });
    /* Fisher–Yates with the honest RNG */
    for (var i = pool.length - 1; i > 0; i--) {
      var j = this._rand(i + 1);
      var t = pool[i]; pool[i] = pool[j]; pool[j] = t;
    }
    var k = this.cupCount;
    var cups = [];
    for (var c = 0; c < k; c++) cups.push([]);
    /* round-robin from a RANDOM starting cup: sizes differ ≤1 and the
       extras land in random cups — never "last kid left over" */
    var start = this._rand(k);
    for (var p = 0; p < pool.length; p++) cups[(start + p) % k].push(pool[p]);
    var cls = this._activeClass();
    if (cls) {
      this._mc.groupings[cls.id] = { cups: cups, madeAt: Date.now(), sentBy: 'name-sticks' };
      this._saveMC();
    } else {
      this._session.grouping = { cups: cups, madeAt: Date.now() };
      this._saveSession();
    }
    this._log('shake', cups.map(function (c) { return c.length; }));
    if (this.api.settings.rattle) this._rattle();
    this.render();
  },
  _grouping: function () {
    var cls = this._activeClass();
    if (cls) return this._mc.groupings[cls.id] || null;
    return this._session.grouping;
  },
  _moveToCup: function (studentId, cupIdx) {
    var g = this._grouping();
    if (!g) return;
    g.cups.forEach(function (cup) {
      var i = cup.indexOf(studentId);
      if (i >= 0) cup.splice(i, 1);
    });
    if (g.cups[cupIdx]) g.cups[cupIdx].push(studentId);
    g.madeAt = Date.now();
    if (this._activeClass()) this._saveMC(); else this._saveSession();
    this.render();
  },
  _resetGroups: function () {
    var cls = this._activeClass();
    if (cls) { delete this._mc.groupings[cls.id]; this._saveMC(); }
    else { this._session.grouping = null; this._saveSession(); }
    this.render();
  },

  /* ====================== identity + audio ========================= */

  _hash: function (str) {
    var h = 5381;
    for (var i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h;
  },
  _identity: function (student) {
    var h = this._hash(student.name + '|' + student.id);
    return { animal: this.ANIMAL_KEYS[h % 12], tint: this.TINTS[Math.floor(h / 12) % 3] };
  },
  _iconEl: function (student, size) {
    var id = this._identity(student);
    var span = this.api.el('span', 'nsk-icon');
    span.style.width = span.style.height = (size || 26) + 'px';
    span.style.background = id.tint;
    span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + this.ANIMALS[id.animal] + '</svg>';
    return span;
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
  /* the wooden rattle: three quick bandpass shaker bursts */
  _rattle: function () {
    var ctx = this._ctx();
    if (!ctx) return;
    if (!this._noise) {
      var len = Math.floor(ctx.sampleRate * 0.08);
      var buf = ctx.createBuffer(1, len, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this._noise = buf;
    }
    var t0 = ctx.currentTime;
    for (var b = 0; b < 3; b++) {
      var t = t0 + b * 0.09;
      var src = ctx.createBufferSource();
      src.buffer = this._noise;
      var bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 1500 + b * 250 + Math.random() * 200;
      bp.Q.value = 6;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.22, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      src.connect(bp); bp.connect(g); g.connect(ctx.destination);
      src.start(t); src.stop(t + 0.1);
    }
  },
  /* the empty-jar two-note wood chime */
  _woodChime: function () {
    var ctx = this._ctx();
    if (!ctx) return;
    var mk = function (freq, at) {
      var t = ctx.currentTime + at;
      var o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = freq;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.2, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
      o.connect(g); g.connect(ctx.destination);
      o.start(t); o.stop(t + 1.2);
    };
    mk(523.25, 0); mk(659.25, 0.3);
  },
  _log: function (ev, data) {
    try { (window.__lcsSticksLog = window.__lcsSticksLog || []).push({ ev: ev, data: data || null, at: Date.now() }); } catch (_) {}
  },

  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },

  /* ============================ render ============================== */

  render: function () {
    var api = this.api, self = this;
    var stage = api.stage;
    stage.innerHTML = '';
    document.body.classList.add('nsk-wide');

    var wrap = api.el('div', 'nsk-wrap');
    stage.appendChild(wrap);
    this._wrap = wrap;

    /* top strip: mode toggle + roster chip */
    var strip = api.el('div', 'nsk-strip');
    var seg = api.el('div', 'nsk-seg');
    var mp = api.el('button', 'nsk-segbtn' + (this.mode === 'pull' ? ' active' : ''));
    mp.type = 'button';
    mp.textContent = api.t('modePull');
    mp.addEventListener('click', function () { self.mode = 'pull'; self.render(); });
    var mg = api.el('button', 'nsk-segbtn' + (this.mode === 'groups' ? ' active' : '') + (this.premium ? '' : ' locked'));
    mg.type = 'button';
    mg.textContent = api.t('modeGroups');
    if (!this.premium) mg.innerHTML += ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
    mg.addEventListener('click', function () {
      if (!self.premium) { self._gateInline(strip, 'gateGroups'); return; }
      self.mode = 'groups'; self.render();
    });
    seg.append(mp, mg);
    var roster = api.el('button', 'nsk-chip manage');
    roster.type = 'button';
    var cls = this._activeClass();
    roster.textContent = cls ? cls.name : api.t('rosterBtn');
    roster.addEventListener('click', function () { self._openPanel(); });
    strip.append(seg, roster);
    wrap.appendChild(strip);

    var students = this._students();
    if (!students.length) {
      /* first-run invite */
      var invite = api.el('div', 'nsk-invite');
      var big = api.el('button', 'nsk-big coral');
      big.type = 'button';
      big.textContent = api.t('noNames');
      big.addEventListener('click', function () { self._openPanel(); });
      invite.appendChild(big);
      wrap.appendChild(invite);
      return;
    }

    if (this.mode === 'groups') { this._renderGroups(wrap); return; }
    this._renderPull(wrap);
  },

  /* ------------------------- pull mode ----------------------------- */

  _renderPull: function (wrap) {
    var api = this.api, self = this;
    var f = this._fair();
    var students = this._students();
    var absent = this._absentIds();
    var eligible = this._eligible();
    var drawnNotPresented = f.drawnIds.filter(function (id) { return self._presented.indexOf(id) < 0; });

    /* presented banner */
    if (this._presented.length) {
      var banner = api.el('div', 'nsk-banner');
      this._presented.forEach(function (id) {
        var s = self._byId(id);
        if (!s) return;
        var card = api.el('div', 'nsk-bigstick');
        card.appendChild(self._iconEl(s, 44));
        var nm = api.el('span', 'nsk-bigname');
        nm.textContent = s.name;
        card.appendChild(nm);
        var re = api.el('button', 'nsk-respeak');
        re.type = 'button';
        re.setAttribute('aria-label', api.t('speakAgain'));
        re.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
        re.addEventListener('click', function () {
          try { LCSAudio.speak({ type: 'ui', text: s.phonetic || s.name, lang: api.lang, rate: 0.9 }); } catch (_) {}
        });
        card.appendChild(re);
        banner.appendChild(card);
      });
      if (this._undoSnap) {
        var un = api.el('button', 'nsk-linkbtn');
        un.type = 'button';
        un.textContent = api.t('undo');
        un.addEventListener('click', function () { self._undo(); });
        banner.appendChild(un);
      }
      wrap.appendChild(banner);
    }

    /* board: jar + cup */
    var board = api.el('div', 'nsk-board');
    var exhausted = eligible.length === 0;                       /* nothing left to pull */
    var emptyJar = exhausted && this._presented.length === 0;    /* the full rest pose */

    /* THE JAR */
    var jarWrap = api.el('div', 'nsk-jarwrap');
    var jar = api.el('button', 'nsk-jar' + (emptyJar ? ' tilted' : ''));
    jar.type = 'button';
    jar.setAttribute('aria-label', api.t('pullBtn'));
    var jarBody = api.el('div', 'nsk-jarbody');
    var rim = api.el('div', 'nsk-rim');
    var fan = api.el('div', 'nsk-fan');
    var inJar = eligible.filter(function (s) { return self._presented.indexOf(s.id) < 0; });
    var shown = inJar.slice(0, 24);
    shown.forEach(function (s, i) {
      var st = api.el('span', 'nsk-jarstick');
      var n = shown.length;
      var frac = n > 1 ? i / (n - 1) : 0.5;
      var ang = (frac - 0.5) * 22;                       /* gentle outward fan */
      var jitter = (self._hash(s.id) % 21) - 10;
      st.style.transform = 'rotate(' + ang.toFixed(1) + 'deg) translateY(' + jitter + 'px)';
      st.style.left = (2 + 92 * frac) + '%';
      st.appendChild(self._iconEl(s, 22));
      fan.appendChild(st);
    });
    jar.append(fan, rim, jarBody);
    jar.addEventListener('click', function () { if (!emptyJar) self._pull(); });
    jarWrap.appendChild(jar);
    /* absent tray */
    if (absent.length) {
      var tray = api.el('div', 'nsk-tray');
      var tl = api.el('span', 'nsk-traylabel');
      tl.textContent = api.t('absentTray');
      tray.appendChild(tl);
      absent.forEach(function (id) {
        var s = self._byId(id);
        if (!s) return;
        var chip = api.el('button', 'nsk-absentchip');
        chip.type = 'button';
        chip.title = api.t('backIn');
        chip.appendChild(self._iconEl(s, 18));
        var nm = api.el('span');
        nm.textContent = s.name;
        chip.appendChild(nm);
        chip.innerHTML += ' ✕';
        chip.addEventListener('click', function () { self._unmarkAbsent(id); });
        tray.appendChild(chip);
      });
      jarWrap.appendChild(tray);
    }
    board.appendChild(jarWrap);

    /* THE CUP (kid-visible fairness — it IS the product) */
    var cupWrap = api.el('div', 'nsk-cupwrap');
    var cup = api.el('div', 'nsk-cup');
    cup.setAttribute('role', 'img');
    cup.setAttribute('aria-label', api.t('cupAria'));
    var count = api.el('span', 'nsk-cupcount');
    count.textContent = drawnNotPresented.length + ' / ' + (students.length - absent.length);
    cup.appendChild(count);
    var cupFan = api.el('div', 'nsk-cupfan');
    drawnNotPresented.forEach(function (id, i) {
      var s = self._byId(id);
      if (!s) return;
      var st = api.el('button', 'nsk-cupstick');
      st.type = 'button';
      st.title = s.name;
      var n = Math.max(1, drawnNotPresented.length - 1);
      st.style.left = (6 + 80 * (i / n)) + '%';
      st.style.transform = 'rotate(' + ((self._hash(id) % 21) - 10) + 'deg)';
      st.appendChild(self._iconEl(s, 20));
      cupFan.appendChild(st);
    });
    cup.appendChild(cupFan);
    cupWrap.appendChild(cup);
    board.appendChild(cupWrap);
    wrap.appendChild(board);

    /* empty-jar rest moment — shows as soon as the jar is exhausted,
       even while the last stick is still presented (that pull IS the
       last turn) */
    if (exhausted && (drawnNotPresented.length || this._presented.length)) {
      var done = api.el('div', 'nsk-done');
      var msg = api.el('p');
      msg.textContent = api.t('emptyJar');
      var tip = api.el('button', 'nsk-big coral');
      tip.type = 'button';
      tip.textContent = api.t('tipBack');
      tip.addEventListener('click', function () { self._woodChime(); self._tipBack(); });
      done.append(msg, tip);
      wrap.appendChild(done);
      if (!this._chimedEmpty) { this._chimedEmpty = true; this._woodChime(); }
    } else {
      this._chimedEmpty = false;
    }

    /* dock */
    var dock = api.el('div', 'nsk-dock');
    if (!exhausted || this._presented.length) {
      if (!exhausted) {
      var pull = api.el('button', 'nsk-big coral');
      pull.type = 'button';
      pull.textContent = api.t('pullBtn');
      pull.addEventListener('click', function () { self._pull(); });
      dock.appendChild(pull);
      }
      /* 1|2 pull-count toggle (partners) */
      var pc = api.el('div', 'nsk-pcount');
      pc.setAttribute('role', 'group');
      pc.setAttribute('aria-label', api.t('pullCountAria'));
      [1, 2].forEach(function (n) {
        var b = api.el('button', 'nsk-chip small' + (self._pullCount === n ? ' active' : ''));
        b.type = 'button';
        b.textContent = String(n);
        b.addEventListener('click', function () { self._pullCount = n; self.render(); });
        pc.appendChild(b);
      });
      dock.appendChild(pc);
      var skip = api.el('button', 'nsk-chip');
      skip.type = 'button';
      skip.textContent = api.t('skip');
      skip.disabled = !this._presented.length;
      skip.addEventListener('click', function () { self._skip(); });
      var abs = api.el('button', 'nsk-chip');
      abs.type = 'button';
      abs.textContent = api.t('absentBtn');
      abs.disabled = !this._presented.length;
      abs.addEventListener('click', function () { self._markAbsent(); });
      dock.append(skip, abs);
      /* eligible already excludes drawn (incl. presented) sticks */
      var left = api.el('span', 'nsk-left');
      left.textContent = this.fmt('sticksLeft', { n: eligible.length });
      dock.appendChild(left);
    }
    wrap.appendChild(dock);
  },

  /* ------------------------ groups mode ---------------------------- */

  _renderGroups: function (wrap) {
    var api = this.api, self = this;
    var g = this._grouping();

    var cupsArea = api.el('div', 'nsk-teams');
    var k = this.cupCount;
    for (var c = 0; c < k; c++) {
      (function (cupIdx) {
        var team = self.TEAMS[cupIdx];
        var cup = api.el('div', 'nsk-teamcup');
        cup.style.borderColor = team.color;
        cup.setAttribute('data-cup', String(cupIdx));
        var head = api.el('div', 'nsk-teamhead');
        head.style.background = team.color;
        head.style.color = team.ink || '#fff';
        var ic = api.el('span', 'nsk-icon');
        ic.style.width = ic.style.height = '22px';
        ic.style.background = '#FFFEFB';
        ic.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#146B5E" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + self.ANIMALS[team.animal] + '</svg>';
        head.appendChild(ic);
        var tn = api.el('span');
        tn.textContent = api.t(team.key);
        head.appendChild(tn);
        cup.appendChild(head);
        var body = api.el('div', 'nsk-teambody');
        if (g && g.cups[cupIdx]) {
          g.cups[cupIdx].forEach(function (id) {
            var s = self._byId(id);
            if (!s) return;
            var chip = api.el('div', 'nsk-teamstick');
            chip.setAttribute('data-student', id);
            chip.appendChild(self._iconEl(s, 20));
            var nm = api.el('span');
            nm.textContent = s.name;
            chip.appendChild(nm);
            self._bindDrag(chip, id);
            body.appendChild(chip);
          });
        }
        cup.appendChild(body);
        cupsArea.appendChild(cup);
      }(c));
    }
    wrap.appendChild(cupsArea);
    if (g && this._activeClass()) {
      var saved = api.el('div', 'nsk-saved');
      saved.textContent = api.t('groupsSaved') + ' ✓';
      wrap.appendChild(saved);
    }

    var dock = api.el('div', 'nsk-dock');
    var cLbl = api.el('span', 'nsk-left');
    cLbl.textContent = api.t('cupsLabel');
    dock.appendChild(cLbl);
    for (var n = 2; n <= 6; n++) {
      (function (nn) {
        var chip = api.el('button', 'nsk-chip small' + (self.cupCount === nn ? ' active' : ''));
        chip.type = 'button';
        chip.textContent = String(nn);
        chip.addEventListener('click', function () { self.cupCount = nn; self._saveStore(); self._resetGroups(); });
        dock.appendChild(chip);
      }(n));
    }
    var shake = api.el('button', 'nsk-big coral');
    shake.type = 'button';
    shake.textContent = api.t('shake');
    shake.addEventListener('click', function () { self._shake(); });
    var reset = api.el('button', 'nsk-chip');
    reset.type = 'button';
    reset.textContent = api.t('resetGroups');
    reset.addEventListener('click', function () { self._shake(); });
    dock.append(shake, reset);
    wrap.appendChild(dock);
  },

  _bindDrag: function (chip, studentId) {
    var self = this;
    chip.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      try { chip.setPointerCapture(e.pointerId); } catch (_) {}
      chip.classList.add('dragging');
      var moved = false;
      var move = function (ev) {
        moved = true;
        chip.style.position = 'fixed';
        chip.style.left = (ev.clientX - 40) + 'px';
        chip.style.top = (ev.clientY - 18) + 'px';
        chip.style.zIndex = '60';
        document.querySelectorAll('.nsk-teamcup').forEach(function (cup) {
          var r = cup.getBoundingClientRect();
          var over = ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom;
          cup.classList.toggle('dropover', over);
        });
      };
      var up = function (ev) {
        chip.removeEventListener('pointermove', move);
        chip.removeEventListener('pointerup', up);
        chip.removeEventListener('pointercancel', up);
        chip.classList.remove('dragging');
        var target = null;
        document.querySelectorAll('.nsk-teamcup').forEach(function (cup) {
          cup.classList.remove('dropover');
          var r = cup.getBoundingClientRect();
          if (ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom) target = cup;
        });
        if (moved && target) self._moveToCup(studentId, parseInt(target.getAttribute('data-cup'), 10));
        else self.render();
      };
      chip.addEventListener('pointermove', move);
      chip.addEventListener('pointerup', up);
      chip.addEventListener('pointercancel', up);
    });
  },

  /* shell reset: back to pull mode, clear the presented stick — the
     CUP IS SACRED (fairness memory) and survives every reset */
  reset: function () {
    this.mode = 'pull';
    this._presented = [];
    this._undoSnap = null;
    if (this._panelEl) this._closePanel();
    this.render();
  },
  onSettings: function () { this._saveStore(); },
  paint: function () {},

  /* ====================== gates + roster panel ===================== */

  _gateInline: function (host, key) {
    var api = this.api;
    var old = this._wrap.querySelector('.nsk-gate');
    if (old) old.remove();
    var g = api.el('div', 'nsk-gate');
    var txt = api.el('span');
    txt.textContent = api.t(key);
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-name-sticks';
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
    var scrim = api.el('div', 'nsk-scrim');
    scrim.addEventListener('click', function () { self._closePanel(); self.render(); });
    var panel = api.el('div', 'nsk-panel');
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', api.t('rosterTitle'));
    document.querySelector('.lcs-app').append(scrim, panel);
    this._panelEl = panel;
    this._scrimEl = scrim;
  },

  _renderPanel: function () {
    var api = this.api, self = this;
    var panel = this._panelEl;
    panel.innerHTML = '';

    var head = api.el('div', 'nsk-panel-head');
    var h = api.el('div', 'nsk-panel-title');
    h.textContent = api.t('rosterTitle');
    var x = api.el('button', 'nsk-panel-close');
    x.type = 'button';
    x.setAttribute('aria-label', api.t('removeName'));
    x.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';
    x.addEventListener('click', function () { self._closePanel(); self.render(); });
    head.append(h, x);
    panel.appendChild(head);

    var body = api.el('div', 'nsk-panel-body');

    /* privacy — the promise, stated where names are typed */
    var priv = api.el('div', 'nsk-privacy');
    priv.textContent = api.t('privacyLine');
    body.appendChild(priv);

    /* class picker (premium) or the session note (free) */
    if (this.premium) {
      var row = api.el('div', 'nsk-classrow');
      this._mc.classes.forEach(function (c) {
        var chip = api.el('button', 'nsk-chip' + (self._mc.activeClassId === c.id ? ' active' : ''));
        chip.type = 'button';
        chip.textContent = c.name;
        chip.addEventListener('click', function () {
          self._mc.activeClassId = c.id;
          self._saveMC();
          self._renderPanel();
        });
        row.appendChild(chip);
      });
      if (this._mc.classes.length < 6) {
        var add = api.el('button', 'nsk-chip manage');
        add.type = 'button';
        add.textContent = '+ ' + api.t('newClass');
        add.addEventListener('click', function () {
          var name = (document.querySelector('.nsk-classname') || {}).value || '';
          name = String(name).trim() || api.t('rosterBtn') + ' ' + (self._mc.classes.length + 1);
          var c = { id: self._uid('c_'), name: name.slice(0, 30), students: [], createdAt: Date.now(), updatedAt: Date.now() };
          self._mc.classes.push(c);
          self._mc.activeClassId = c.id;
          self._saveMC();
          self._renderPanel();
        });
        row.appendChild(add);
        var cn = document.createElement('input');
        cn.className = 'nsk-input nsk-classname';
        cn.type = 'text';
        cn.maxLength = 30;
        cn.placeholder = api.t('classNamePh');
        row.appendChild(cn);
      }
      body.appendChild(row);
    } else {
      var note = api.el('div', 'nsk-freenote');
      note.textContent = api.t('freeNote');
      body.appendChild(note);
    }

    /* paste-first entry */
    var ta = document.createElement('textarea');
    ta.className = 'nsk-ta';
    ta.rows = 4;
    ta.placeholder = api.t('pasteHint');
    body.appendChild(ta);
    var addBtn = api.el('button', 'nsk-chip manage');
    addBtn.type = 'button';
    addBtn.textContent = api.t('addNames');
    addBtn.addEventListener('click', function () {
      var lines = ta.value.split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
      if (!lines.length) return;
      var list = self._students();
      lines.forEach(function (name) {
        if (list.length >= 40) return;
        list.push({ id: self._uid('s_'), name: name.slice(0, 30) });
      });
      var cls = self._activeClass();
      if (cls) { cls.updatedAt = Date.now(); self._saveMC(); } else self._saveSession();
      ta.value = '';
      self._renderPanel();
    });
    body.appendChild(addBtn);

    /* duplicate warning */
    var students = this._students();
    var seen = {}, dup = null;
    students.forEach(function (s) {
      var k = s.name.toLowerCase();
      if (seen[k]) dup = s.name;
      seen[k] = true;
    });
    if (dup) {
      var warn = api.el('div', 'nsk-dup');
      warn.textContent = this.fmt('dupPrompt', { name: dup });
      body.appendChild(warn);
    }

    /* the list */
    var list = api.el('div', 'nsk-list');
    students.forEach(function (s, i) {
      var row2 = api.el('div', 'nsk-row');
      row2.appendChild(self._iconEl(s, 24));
      var nameIn = document.createElement('input');
      nameIn.className = 'nsk-input grow';
      nameIn.type = 'text';
      nameIn.maxLength = 30;
      nameIn.value = s.name;
      nameIn.addEventListener('change', function () {
        s.name = nameIn.value.trim() || s.name;
        var cls = self._activeClass();
        if (cls) { cls.updatedAt = Date.now(); self._saveMC(); } else self._saveSession();
      });
      var ph = document.createElement('input');
      ph.className = 'nsk-input grow2';
      ph.type = 'text';
      ph.maxLength = 40;
      ph.placeholder = api.t('phoneticPh');
      ph.value = s.phonetic || '';
      ph.addEventListener('change', function () {
        s.phonetic = ph.value.trim() || undefined;
        var cls = self._activeClass();
        if (cls) { cls.updatedAt = Date.now(); self._saveMC(); } else self._saveSession();
      });
      var play = api.el('button', 'nsk-play');
      play.type = 'button';
      play.setAttribute('aria-label', api.t('playTest'));
      play.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16 9a4 4 0 0 1 0 6"/></svg>';
      play.addEventListener('click', function () {
        try { LCSAudio.speak({ type: 'ui', text: ph.value.trim() || s.name, lang: api.lang, rate: 0.9 }); } catch (_) {}
      });
      var rm = api.el('button', 'nsk-linkbtn danger');
      rm.type = 'button';
      rm.textContent = '✕';
      rm.setAttribute('aria-label', api.t('removeName'));
      rm.addEventListener('click', function () {
        students.splice(i, 1);
        var f = self._fair();
        var di = f.drawnIds.indexOf(s.id);
        if (di >= 0) f.drawnIds.splice(di, 1);
        var cls = self._activeClass();
        if (cls) { cls.updatedAt = Date.now(); self._saveMC(); } else self._saveSession();
        self._renderPanel();
      });
      row2.append(nameIn, ph, play, rm);
      list.appendChild(row2);
    });
    body.appendChild(list);

    /* fresh-jar + delete class */
    var foot = api.el('div', 'nsk-panel-foot');
    var fresh = api.el('button', 'nsk-linkbtn');
    fresh.type = 'button';
    fresh.textContent = api.t('startFresh');
    fresh.addEventListener('click', function () { self._tipBack(); self._renderPanel(); });
    foot.appendChild(fresh);
    var cls2 = this._activeClass();
    if (cls2 && this._mc.classes.length > 0) {
      var del = api.el('button', 'nsk-linkbtn danger');
      del.type = 'button';
      del.textContent = api.t('deleteClass');
      del.addEventListener('click', function () {
        if (!del.classList.contains('confirm')) { del.classList.add('confirm'); del.textContent = api.t('deleteClass') + '?'; return; }
        self._mc.classes = self._mc.classes.filter(function (c) { return c.id !== cls2.id; });
        delete self._mc.fairness[cls2.id];
        delete self._mc.groupings[cls2.id];
        self._mc.activeClassId = (self._mc.classes[0] || {}).id || null;
        self._saveMC();
        self._renderPanel();
      });
      foot.appendChild(del);
    }
    body.appendChild(foot);
    panel.appendChild(body);
  }
};

/* per-tool styling: STAGE ONLY + the sanctioned body class + panel */
(function injectCSS() {
  var css = ''
  + 'body.nsk-wide .lcs-app{max-width:min(1040px,96vw);}'
  + '@media (max-width:480px){'
  +   'body.nsk-wide .lcs-header{flex-direction:column;align-items:flex-start;gap:8px;}'
  + '}'
  + '.nsk-wrap{display:flex;flex-direction:column;align-items:center;gap:clamp(8px,1.4vmin,14px);width:100%;}'

  /* strip */
  + '.nsk-strip{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;width:100%;}'
  + '.nsk-seg{display:inline-flex;background:var(--lcs-surface);border:1.5px solid var(--lcs-line);'
  +   'border-radius:var(--lcs-radius-pill);padding:3px;gap:3px;}'
  + '.nsk-segbtn{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-display);font-weight:700;font-size:14.5px;'
  +   'color:var(--lcs-structure);background:transparent;border:none;border-radius:var(--lcs-radius-pill);'
  +   'padding:9px 18px;min-height:44px;cursor:pointer;}'
  + '.nsk-segbtn.active{background:var(--lcs-structure);color:var(--lcs-surface);}'
  + '.nsk-segbtn.locked{color:var(--lcs-ink-soft);}'
  + '.nsk-chip{display:inline-flex;align-items:center;gap:6px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:14px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);'
  +   'padding:8px 15px;min-height:44px;cursor:pointer;transition:transform .1s var(--lcs-ease);}'
  + '.nsk-chip:active{transform:scale(.96);}'
  + '.nsk-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.nsk-chip.small{min-width:46px;justify-content:center;}'
  + '.nsk-chip.manage{color:var(--lcs-structure);}'
  + '.nsk-chip:disabled{opacity:.45;cursor:default;}'

  /* icon disc */
  + '.nsk-icon{display:inline-grid;place-items:center;border-radius:50%;border:1.6px solid var(--lcs-structure);'
  +   'flex:none;box-sizing:border-box;overflow:hidden;}'
  + '.nsk-icon svg{width:78%;height:78%;}'

  /* presented banner — the stick IS the card */
  + '.nsk-banner{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;width:100%;}'
  + '.nsk-bigstick{display:inline-flex;align-items:center;gap:14px;background:#F7E9CF;'
  +   'border:2.5px solid var(--lcs-structure);border-radius:60px;padding:10px 28px 10px 14px;'
  +   'box-shadow:inset 0 -5px 0 rgba(0,0,0,.07),inset 6px 7px 0 rgba(255,255,255,.4),0 5px 10px rgba(20,30,28,.14);'
  +   'animation:nskRise .45s var(--lcs-ease);}'
  + '@keyframes nskRise{0%{transform:translateY(46px) rotate(-5deg);opacity:.4;}100%{transform:none;opacity:1;}}'
  + '.nsk-bigname{font-family:var(--lcs-font-display);font-weight:700;color:#1F2A28;'
  +   'font-size:clamp(30px,7vmin,72px);line-height:1.05;}'
  + '.nsk-respeak{width:44px;height:44px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);cursor:pointer;}'
  + '.nsk-linkbtn{font-family:var(--lcs-font-body);font-weight:700;font-size:13.5px;color:var(--lcs-structure);'
  +   'background:transparent;border:none;cursor:pointer;text-decoration:underline;padding:6px;}'
  + '.nsk-linkbtn.danger{color:#C9502A;}'

  /* board: jar + cup */
  + '.nsk-board{display:flex;align-items:flex-end;justify-content:center;gap:clamp(20px,6vw,90px);width:100%;}'
  + '.nsk-jarwrap{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.nsk-jar{position:relative;width:clamp(200px,30vmin,300px);height:clamp(190px,28vmin,280px);'
  +   'background:transparent;border:none;cursor:pointer;padding:0;}'
  + '.nsk-jar.tilted{transform:rotate(-5deg);cursor:default;}'
  + '.nsk-jarbody{position:absolute;left:0;right:0;bottom:0;top:34px;background:#FFFEFB;'
  +   'border:2.5px solid var(--lcs-structure);border-radius:16% 16% 24px 24px / 12% 12% 24px 24px;'
  +   'box-shadow:inset 8px 10px 0 rgba(255,255,255,.35),inset 0 -6px 0 rgba(0,0,0,.08),var(--lcs-shadow-sm);}'
  + '.nsk-rim{position:absolute;left:-4%;right:-4%;top:22px;height:24px;background:var(--lcs-structure);'
  +   'border-radius:50%;z-index:3;box-shadow:inset 0 3px 0 rgba(255,255,255,.22);}'
  + '.nsk-fan{position:absolute;left:6%;right:6%;top:0;height:40px;z-index:2;}'
  + '.nsk-jarstick{position:absolute;bottom:0;width:15px;height:52px;background:#F7E9CF;'
  +   'border:1.8px solid var(--lcs-structure);border-radius:8px;display:flex;justify-content:center;'
  +   'padding-top:2px;box-sizing:border-box;}'
  + '.nsk-jarstick .nsk-icon{margin-left:-6px;margin-top:-4px;background-clip:padding-box;}'
  + '.nsk-jar:not(.tilted):hover .nsk-fan{animation:nskWiggle .4s var(--lcs-ease);}'
  + '@keyframes nskWiggle{0%,100%{transform:rotate(0);}30%{transform:rotate(1.6deg);}70%{transform:rotate(-1.4deg);}}'

  + '.nsk-cupwrap{display:flex;flex-direction:column;align-items:center;}'
  + '.nsk-cup{position:relative;width:clamp(150px,22vmin,230px);height:clamp(110px,16vmin,160px);'
  +   'background:#FFFEFB;border:2.5px solid var(--lcs-structure);'
  +   'border-radius:10% 10% 30px 30px / 14% 14% 30px 30px;'
  +   'box-shadow:inset 6px 8px 0 rgba(255,255,255,.35),inset 0 -5px 0 rgba(0,0,0,.08),var(--lcs-shadow-sm);}'
  + '.nsk-cupcount{position:absolute;bottom:10px;left:50%;transform:translateX(-50%);z-index:4;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:15px;color:var(--lcs-surface);'
  +   'background:var(--lcs-structure);border-radius:var(--lcs-radius-pill);padding:3px 14px;white-space:nowrap;}'
  + '.nsk-cupfan{position:absolute;left:4%;right:4%;top:-26px;height:44px;}'
  + '.nsk-cupstick{position:absolute;bottom:0;width:13px;height:46px;background:#F7E9CF;'
  +   'border:1.6px solid var(--lcs-structure);border-radius:7px;cursor:pointer;'
  +   'display:flex;justify-content:center;padding:2px 0 0;box-sizing:border-box;}'
  + '.nsk-cupstick .nsk-icon{margin-left:-5px;margin-top:-3px;}'

  /* absent tray */
  + '.nsk-tray{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:center;max-width:340px;}'
  + '.nsk-traylabel{font-family:var(--lcs-font-body);font-weight:800;font-size:12.5px;color:var(--lcs-ink-soft);}'
  + '.nsk-absentchip{display:inline-flex;align-items:center;gap:5px;font-family:var(--lcs-font-body);'
  +   'font-weight:700;font-size:12.5px;color:var(--lcs-ink-soft);background:var(--lcs-surface-2);'
  +   'border:1.5px dashed var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:4px 10px;cursor:pointer;}'

  /* empty-jar rest */
  + '.nsk-done{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius);padding:12px 22px;}'
  + '.nsk-done p{margin:0;font-family:var(--lcs-font-display);font-weight:700;'
  +   'font-size:clamp(17px,2.8vmin,24px);color:var(--lcs-ink);}'

  /* invite */
  + '.nsk-invite{display:grid;place-items:center;padding:56px 0;}'

  /* dock */
  + '.nsk-dock{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;width:100%;}'
  + '.nsk-pcount{display:inline-flex;gap:4px;}'
  + '.nsk-big{min-width:170px;min-height:56px;padding:12px 30px;border-radius:var(--lcs-radius-pill);'
  +   'border:1.5px solid var(--lcs-structure);cursor:pointer;background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:clamp(16px,2.5vmin,21px);box-shadow:var(--lcs-shadow-sm);transition:transform .1s var(--lcs-ease);}'
  + '.nsk-big:active{transform:scale(.97);}'
  + '.nsk-big.coral{background:#F2784B;border-color:#F2784B;color:#fff;'
  +   'box-shadow:0 4px 0 0 #C9502A,0 6px 14px rgba(20,30,28,.14);}'
  + '.nsk-big.coral:active{transform:translateY(3px);box-shadow:0 1px 0 0 #C9502A;}'
  + '.nsk-left{font-family:var(--lcs-font-body);font-weight:800;font-size:13.5px;color:var(--lcs-ink-soft);}'

  /* teams */
  + '.nsk-teams{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;width:100%;}'
  + '.nsk-teamcup{background:var(--lcs-surface);border:2.5px solid;border-radius:var(--lcs-radius);'
  +   'overflow:hidden;min-height:150px;transition:transform .12s var(--lcs-ease);}'
  + '.nsk-teamcup.dropover{transform:translateY(-3px);outline:3px dashed var(--lcs-structure);outline-offset:3px;}'
  + '.nsk-teamhead{display:flex;align-items:center;gap:8px;padding:8px 12px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:15px;color:#fff;}'
  + '.nsk-teambody{display:flex;flex-direction:column;gap:6px;padding:10px;}'
  + '.nsk-teamstick{display:inline-flex;align-items:center;gap:8px;background:#F7E9CF;'
  +   'border:1.8px solid var(--lcs-structure);border-radius:40px;padding:5px 14px 5px 6px;'
  +   'font-family:var(--lcs-font-body);font-weight:800;font-size:14.5px;color:#1F2A28;'
  +   'cursor:grab;touch-action:none;user-select:none;width:fit-content;}'
  + '.nsk-teamstick.dragging{cursor:grabbing;box-shadow:0 8px 14px rgba(20,30,28,.22);}'
  + '.nsk-saved{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:var(--lcs-structure);}'

  /* gate */
  + '.nsk-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:520px;'
  +   'margin:8px auto;background:#FDE8DE;border-radius:var(--lcs-radius-sm);'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.nsk-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'

  /* panel */
  + '.nsk-scrim{position:absolute;inset:0;background:rgba(38,51,47,.28);opacity:0;'
  +   'pointer-events:none;transition:opacity .2s;z-index:70;border-radius:inherit;}'
  + '.nsk-scrim.open{opacity:1;pointer-events:auto;}'
  + '.nsk-panel{position:absolute;left:50%;top:5%;transform:translateX(-50%) translateY(8px);'
  +   'width:min(620px,94%);max-height:min(86vh,900px);overflow:auto;background:var(--lcs-surface);'
  +   'border-radius:var(--lcs-radius);box-shadow:var(--lcs-shadow);z-index:71;'
  +   'opacity:0;pointer-events:none;transition:opacity .2s,transform .2s var(--lcs-ease);'
  +   'display:flex;flex-direction:column;}'
  + '.nsk-panel.open{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0);}'
  + '.nsk-panel-head{display:flex;align-items:center;justify-content:space-between;'
  +   'padding:14px 16px 10px;border-bottom:1px solid var(--lcs-line);}'
  + '.nsk-panel-title{font-family:var(--lcs-font-display);font-weight:700;font-size:17px;color:var(--lcs-ink);}'
  + '.nsk-panel-close{width:36px;height:36px;display:grid;place-items:center;border-radius:50%;'
  +   'color:var(--lcs-ink-soft);background:transparent;cursor:pointer;border:none;}'
  + '.nsk-panel-body{padding:12px 16px 16px;display:flex;flex-direction:column;gap:10px;}'
  + '.nsk-privacy{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;color:var(--lcs-structure);'
  +   'background:var(--lcs-structure-soft,#E8F2F0);border-radius:var(--lcs-radius-sm);padding:8px 12px;}'
  + '.nsk-freenote{font-family:var(--lcs-font-body);font-weight:700;font-size:12.5px;color:var(--lcs-ink-soft);}'
  + '.nsk-classrow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;}'
  + '.nsk-ta{width:100%;box-sizing:border-box;font-family:var(--lcs-font-body);font-weight:700;font-size:14.5px;'
  +   'padding:10px;border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);resize:vertical;}'
  + '.nsk-input{font-family:var(--lcs-font-body);font-weight:700;font-size:14px;padding:8px 10px;'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-sm);'
  +   'background:var(--lcs-surface-2);color:var(--lcs-ink);box-sizing:border-box;min-width:0;}'
  + '.nsk-input.grow{flex:1 1 110px;}'
  + '.nsk-input.grow2{flex:1.2 1 130px;font-style:italic;}'
  + '.nsk-list{display:flex;flex-direction:column;gap:6px;}'
  + '.nsk-row{display:flex;align-items:center;gap:8px;}'
  + '.nsk-play{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;flex:none;'
  +   'color:var(--lcs-structure);background:var(--lcs-surface);border:1.5px solid var(--lcs-line);cursor:pointer;}'
  + '.nsk-dup{font-family:var(--lcs-font-body);font-weight:700;font-size:13px;color:#C9502A;'
  +   'background:#FDE8DE;border-radius:var(--lcs-radius-sm);padding:8px 12px;}'
  + '.nsk-panel-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;'
  +   'padding-top:8px;border-top:1.5px dashed var(--lcs-line);}'

  /* phone */
  + '@media (max-width:560px){'
  +   '.nsk-board{flex-direction:column;align-items:center;gap:26px;}'
  +   '.nsk-row{flex-wrap:wrap;}'
  + '}'
  /* short screens (projector 1024×768) */
  + '@media (max-height:960px) and (min-width:768px){'
  +   '.nsk-wrap{gap:6px;}'
  +   '.nsk-jar{width:clamp(180px,26vmin,260px);height:clamp(170px,24vmin,240px);}'
  +   '.nsk-bigname{font-size:clamp(26px,6vh,56px);}'
  + '}'
  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.nsk-bigstick{animation:none;}'
  +   '.nsk-jar:not(.tilted):hover .nsk-fan{animation:none;}'
  +   '.nsk-teamcup{transition:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());
