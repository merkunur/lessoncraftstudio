/* =====================================================================
   ten-seat-wheel-activity.js — ACTIVITY #28 of the one-by-one rebuild:
   "Make 10" (K.OA.A.4) — THE TEN-SEAT WHEEL.
   Design sheet: docs/activities-rebuild/designs/028-numberbond.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: a Ferris wheel with exactly N seats only balances when
   every seat is full. k riders are aboard; the child commits to a number on
   the gate dial, pulls the gate lever (that many library animals hop in one
   by one, the wheel clicking round a seat each) and releases the brake. A
   full wheel spins a slow circle; a short call makes it lurch and settle
   with the empty gondolas at the top; riders who do not fit stand on the
   platform edge, the brake holds and they all hop back off. WHOLE rounds:
   every seat is full of two kinds of rider and the hub carries the dial.
   The bond board prints each ride as a ticket (10 = 7 + 3). "Fairground"
   is open play.

   ACTIVITY LAYER ONLY: the model is ten-seat-wheel-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity when the
   round is complete). Test seams: window.TenSeatWheelActivity.st /
   ._order / ._pool / .FAST (no animation, for the gates).
   ===================================================================== */
'use strict';

var TenSeatWheelActivity = {
  id: 'ten-seat-wheel',
  apparatusClasses: ['tw-'],

  strings: {
    title:          {en:'Make 10',de:'Bilde 10',fr:'Fais 10',it:'Fai 10',es:'Forma 10',pt:'Forme 10',nl:'Maak 10',sv:'Bilda 10',da:'Lav 10',no:'Lag 10',fi:'Tee 10'},
    instruction:    {en:'The wheel only turns smoothly when every seat is full. Set the number, pull the gate lever, then release the brake.',de:'Das Rad dreht sich nur ruhig, wenn jeder Sitz besetzt ist. Stell die Zahl ein, zieh den Torhebel und löse dann die Bremse.',fr:'La roue ne tourne bien que si chaque siège est occupé. Règle le nombre, tire le levier du portillon, puis desserre le frein.',it:'La ruota gira bene solo quando tutti i posti sono occupati. Imposta il numero, tira la leva del cancello, poi togli il freno.',es:'La rueda solo gira bien cuando todos los asientos están ocupados. Pon el número, jala la palanca de la entrada y luego suelta el freno.',pt:'A roda só gira direitinho quando todos os assentos estão ocupados. Ajuste o número, puxe a alavanca da entrada e depois solte o freio.',nl:'Het rad draait alleen mooi rond als elke plek bezet is. Zet het getal goed, trek aan de hendel van het hekje en haal dan de rem eraf.',sv:'Hjulet snurrar bara jämnt när varje plats är upptagen. Ställ in talet, dra i grindspaken och släpp sedan bromsen.',da:'Hjulet drejer kun pænt rundt, når alle pladser er optaget. Indstil tallet, træk i lågens håndtag, og slip så bremsen.',no:'Hjulet går bare jevnt rundt når alle plassene er opptatt. Still inn tallet, trekk i porthendelen, og slipp så bremsen.',fi:'Pyörä pyörii tasaisesti vain, kun jokaisella paikalla istuu joku. Säädä luku, vedä portin vivusta ja vapauta sitten jarru.'},
    promptFill10:   {en:'{k} riders are on. How many more make 10?',de:'{k} Fahrgäste sitzen schon. Wie viele fehlen bis 10?',fr:'{k} passagers sont montés. Combien en faut-il encore pour faire 10 ?',it:'Sono già saliti {k} passeggeri. Quanti ne mancano per fare 10?',es:'Ya subieron {k} pasajeros. ¿Cuántos faltan para 10?',pt:'{k} passageiros já subiram. Quantos faltam para fazer 10?',nl:'Er zitten al {k} passagiers in. Hoeveel moeten er nog bij om 10 te maken?',sv:'{k} passagerare har redan klivit på. Hur många till blir 10?',da:'{k} passagerer er allerede steget på. Hvor mange flere giver 10?',no:'{k} passasjerer sitter allerede på. Hvor mange til blir 10?',fi:'Kyydissä on jo {k} matkustajaa. Montako lisää tarvitaan, että saadaan 10?'},
    promptFill10One:{en:'1 rider is on. How many more make 10?',de:'1 Fahrgast sitzt schon. Wie viele fehlen bis 10?',fr:'1 passager est monté. Combien en faut-il encore pour faire 10 ?',it:'È già salito 1 passeggero. Quanti ne mancano per fare 10?',es:'Ya subió 1 pasajero. ¿Cuántos faltan para 10?',pt:'1 passageiro já subiu. Quantos faltam para fazer 10?',nl:'Er zit al 1 passagier in. Hoeveel moeten er nog bij om 10 te maken?',sv:'1 passagerare har redan klivit på. Hur många till blir 10?',da:'1 passager er allerede steget på. Hvor mange flere giver 10?',no:'1 passasjer sitter allerede på. Hvor mange til blir 10?',fi:'Kyydissä on jo 1 matkustaja. Montako lisää tarvitaan, että saadaan 10?'},
    promptFill:     {en:'{k} riders are on. How many more fill {n} seats?',de:'{k} Fahrgäste sitzen schon. Wie viele fehlen noch, damit alle {n} Sitze besetzt sind?',fr:'{k} passagers sont montés. Combien en faut-il encore pour remplir les {n} sièges ?',it:'Sono già saliti {k} passeggeri. Quanti ne mancano per riempire i {n} posti?',es:'Ya subieron {k} pasajeros. ¿Cuántos faltan para llenar los {n} asientos?',pt:'{k} passageiros já subiram. Quantos faltam para ocupar os {n} assentos?',nl:'Er zitten al {k} passagiers in. Hoeveel moeten er nog bij om alle {n} plekken te vullen?',sv:'{k} passagerare har redan klivit på. Hur många till fyller alla {n} platser?',da:'{k} passagerer er allerede steget på. Hvor mange flere fylder alle {n} pladser?',no:'{k} passasjerer sitter allerede på. Hvor mange til fyller alle {n} plassene?',fi:'Kyydissä on jo {k} matkustajaa. Montako lisää täyttää kaikki {n} paikkaa?'},
    promptFillOne:  {en:'1 rider is on. How many more fill {n} seats?',de:'1 Fahrgast sitzt schon. Wie viele fehlen noch, damit alle {n} Sitze besetzt sind?',fr:'1 passager est monté. Combien en faut-il encore pour remplir les {n} sièges ?',it:'È già salito 1 passeggero. Quanti ne mancano per riempire i {n} posti?',es:'Ya subió 1 pasajero. ¿Cuántos faltan para llenar los {n} asientos?',pt:'1 passageiro já subiu. Quantos faltam para ocupar os {n} assentos?',nl:'Er zit al 1 passagier in. Hoeveel moeten er nog bij om alle {n} plekken te vullen?',sv:'1 passagerare har redan klivit på. Hur många till fyller alla {n} platser?',da:'1 passager er allerede steget på. Hvor mange flere fylder alle {n} pladser?',no:'1 passasjer sitter allerede på. Hvor mange til fyller alle {n} plassene?',fi:'Kyydissä on jo 1 matkustaja. Montako lisää täyttää kaikki {n} paikkaa?'},
    promptWhole:    {en:'Every seat is full. How many riders in all?',de:'Alle Sitze sind besetzt. Wie viele Fahrgäste sind es zusammen?',fr:'Tous les sièges sont occupés. Combien de passagers en tout ?',it:'Tutti i posti sono occupati. Quanti passeggeri ci sono in tutto?',es:'Todos los asientos están ocupados. ¿Cuántos pasajeros hay en total?',pt:'Todos os assentos estão ocupados. Quantos passageiros há ao todo?',nl:'Alle plekken zijn bezet. Hoeveel passagiers zijn het samen?',sv:'Alla platser är upptagna. Hur många passagerare är det sammanlagt?',da:'Alle pladser er optaget. Hvor mange passagerer er der i alt?',no:'Alle plassene er opptatt. Hvor mange passasjerer er det til sammen?',fi:'Kaikki paikat ovat täynnä. Montako matkustajaa on yhteensä?'},
    hintDial:       {en:'Set the dial, then pull the gate lever.',de:'Stell die Zahl ein und zieh dann den Torhebel.',fr:'Règle le nombre, puis tire le levier du portillon.',it:'Imposta il numero, poi tira la leva del cancello.',es:'Pon el número y luego jala la palanca de la entrada.',pt:'Ajuste o número e depois puxe a alavanca da entrada.',nl:'Zet het getal goed en trek dan aan de hendel van het hekje.',sv:'Ställ in talet och dra sedan i grindspaken.',da:'Indstil tallet, og træk så i lågens håndtag.',no:'Still inn tallet, og trekk så i porthendelen.',fi:'Säädä luku ja vedä sitten portin vivusta.'},
    hintHub:        {en:'Set the number in the middle of the wheel.',de:'Stell die Zahl in der Mitte des Rads ein.',fr:'Règle le nombre au centre de la roue.',it:'Imposta il numero al centro della ruota.',es:'Pon el número en el centro de la rueda.',pt:'Ajuste o número no centro da roda.',nl:'Zet het getal in het midden van het rad.',sv:'Ställ in talet i mitten av hjulet.',da:'Indstil tallet i midten af hjulet.',no:'Still inn tallet midt på hjulet.',fi:'Säädä luku pyörän keskelle.'},
    hintShort:      {en:'There are still empty seats.',de:'Es sind noch Sitze frei.',fr:'Il reste des sièges vides.',it:'Ci sono ancora posti vuoti.',es:'Todavía hay asientos vacíos.',pt:'Ainda há assentos vazios.',nl:'Er zijn nog lege plekken.',sv:'Det finns fortfarande tomma platser.',da:'Der er stadig tomme pladser.',no:'Det er fortsatt tomme plasser.',fi:'Tyhjiä paikkoja on vielä.'},
    hintOver:       {en:'Too many riders! Some can’t get on.',de:'Zu viele Fahrgäste! Einige passen nicht mehr hinein.',fr:'Trop de passagers ! Certains ne peuvent pas monter.',it:'Troppi passeggeri! Alcuni non riescono a salire.',es:'¡Demasiados pasajeros! Algunos no caben.',pt:'Passageiros demais! Alguns não cabem.',nl:'Te veel passagiers! Ze passen er niet allemaal in.',sv:'För många passagerare! Några får inte plats.',da:'For mange passagerer! Nogle kan ikke komme med.',no:'For mange passasjerer! Noen får ikke plass.',fi:'Liikaa matkustajia! Kaikki eivät mahdu kyytiin.'},
    hintWhole:      {en:'Count all the riders.',de:'Zähl alle Fahrgäste.',fr:'Compte tous les passagers.',it:'Conta tutti i passeggeri.',es:'Cuenta a todos los pasajeros.',pt:'Conte todos os passageiros.',nl:'Tel alle passagiers.',sv:'Räkna alla passagerare.',da:'Tæl alle passagererne.',no:'Tell alle passasjerene.',fi:'Laske kaikki matkustajat.'},
    hintCountOn:    {en:'Count on: {seq}.',de:'Zähl weiter: {seq}.',fr:'Continue à compter : {seq}.',it:'Continua a contare: {seq}.',es:'Sigue contando: {seq}.',pt:'Continue contando: {seq}.',nl:'Tel verder: {seq}.',sv:'Räkna vidare: {seq}.',da:'Tæl videre: {seq}.',no:'Tell videre: {seq}.',fi:'Jatka laskemista: {seq}.'},
    celebrateFill:  {en:'{k} and {m} make {n} — every seat is full!',de:'{k} und {m} ergeben {n} – alle Sitze sind besetzt!',fr:'{k} et {m} font {n} : tous les sièges sont occupés !',it:'{k} e {m} fanno {n}: tutti i posti sono occupati!',es:'¡{k} y {m} forman {n}: todos los asientos están ocupados!',pt:'{k} e {m} formam {n}: todos os assentos estão ocupados!',nl:'{k} en {m} maken {n}: alle plekken zijn bezet!',sv:'{k} och {m} blir {n} – alla platser är upptagna!',da:'{k} og {m} giver {n} – alle pladser er optaget!',no:'{k} og {m} blir {n} – alle plassene er opptatt!',fi:'{k} ja {m} on yhteensä {n} – kaikki paikat ovat täynnä!'},
    celebrateWhole: {en:'{a} and {b} make {n}!',de:'{a} und {b} ergeben {n}!',fr:'{a} et {b} font {n} !',it:'{a} e {b} fanno {n}!',es:'¡{a} y {b} forman {n}!',pt:'{a} e {b} formam {n}!',nl:'{a} en {b} maken {n}!',sv:'{a} och {b} blir {n}!',da:'{a} og {b} giver {n}!',no:'{a} og {b} blir {n}!',fi:'{a} ja {b} on yhteensä {n}!'},
    celebrateTen:   {en:'Every way to make 10 has had a ride!',de:'Alle Zehnerfreunde sind mitgefahren!',fr:'Tous les amis de 10 ont fait un tour !',it:'Tutti gli amici del 10 hanno fatto un giro!',es:'¡Todas las parejas del 10 ya dieron una vuelta!',pt:'Todos os amigos do 10 já deram uma volta!',nl:'Alle verliefde harten van 10 hebben een rondje gedraaid!',sv:'Alla tiokompisar har fått åka!',da:'Alle tier-vennerne har fået en tur!',no:'Alle tiervennene har fått en tur!',fi:'Kaikki kymppikaverit ovat päässeet kyytiin!'},
    dialLabel:      {en:'Riders to board: {d}',de:'Fahrgäste, die einsteigen: {d}',fr:'Passagers qui montent : {d}',it:'Passeggeri che salgono: {d}',es:'Pasajeros que suben: {d}',pt:'Passageiros que vão subir: {d}',nl:'Passagiers die instappen: {d}',sv:'Passagerare som kliver på: {d}',da:'Passagerer, der stiger på: {d}',no:'Passasjerer som går på: {d}',fi:'Kyytiin nousevat matkustajat: {d}'},
    dialUp:         {en:'One more rider',de:'Ein Fahrgast mehr',fr:'Un passager de plus',it:'Un passeggero in più',es:'Un pasajero más',pt:'Um passageiro a mais',nl:'Eén passagier meer',sv:'En passagerare till',da:'En passager mere',no:'Én passasjer til',fi:'Yksi matkustaja lisää'},
    dialDown:       {en:'One fewer rider',de:'Ein Fahrgast weniger',fr:'Un passager de moins',it:'Un passeggero in meno',es:'Un pasajero menos',pt:'Um passageiro a menos',nl:'Eén passagier minder',sv:'En passagerare färre',da:'En passager færre',no:'Én passasjer færre',fi:'Yksi matkustaja vähemmän'},
    hubLabel:       {en:'Riders in all: {d}',de:'Fahrgäste zusammen: {d}',fr:'Passagers en tout : {d}',it:'Passeggeri in tutto: {d}',es:'Pasajeros en total: {d}',pt:'Passageiros ao todo: {d}',nl:'Passagiers samen: {d}',sv:'Passagerare sammanlagt: {d}',da:'Passagerer i alt: {d}',no:'Passasjerer til sammen: {d}',fi:'Matkustajia yhteensä: {d}'},
    hubUnset:       {en:'Riders in all: not set yet',de:'Fahrgäste zusammen: noch nicht eingestellt',fr:'Passagers en tout : pas encore réglé',it:'Passeggeri in tutto: non ancora impostato',es:'Pasajeros en total: sin poner',pt:'Passageiros ao todo: ainda não ajustado',nl:'Passagiers samen: nog niet ingesteld',sv:'Passagerare sammanlagt: inte inställt än',da:'Passagerer i alt: ikke indstillet endnu',no:'Passasjerer til sammen: ikke stilt inn ennå',fi:'Matkustajia yhteensä: ei vielä säädetty'},
    hubUp:          {en:'A bigger number',de:'Eine größere Zahl',fr:'Un nombre plus grand',it:'Un numero più grande',es:'Un número mayor',pt:'Um número maior',nl:'Een groter getal',sv:'Ett större tal',da:'Et større tal',no:'Et større tall',fi:'Suurempi luku'},
    hubDown:        {en:'A smaller number',de:'Eine kleinere Zahl',fr:'Un nombre plus petit',it:'Un numero più piccolo',es:'Un número menor',pt:'Um número menor',nl:'Een kleiner getal',sv:'Ett mindre tal',da:'Et mindre tal',no:'Et mindre tall',fi:'Pienempi luku'},
    gate:           {en:'Gate lever',de:'Torhebel',fr:'Levier du portillon',it:'Leva del cancello',es:'Palanca de la entrada',pt:'Alavanca da entrada',nl:'Hendel van het hekje',sv:'Grindspak',da:'Lågens håndtag',no:'Porthendel',fi:'Portin vipu'},
    brake:          {en:'Brake',de:'Bremse',fr:'Frein',it:'Freno',es:'Freno',pt:'Freio',nl:'Rem',sv:'Broms',da:'Bremse',no:'Brems',fi:'Jarru'},
    wheelLabel:     {en:'Wheel with {n} seats, riders on: {f}',de:'Rad mit {n} Sitzen, Fahrgäste an Bord: {f}',fr:'Roue de {n} sièges, passagers à bord : {f}',it:'Ruota con {n} posti, passeggeri a bordo: {f}',es:'Rueda de {n} asientos, pasajeros a bordo: {f}',pt:'Roda com {n} assentos, passageiros a bordo: {f}',nl:'Rad met {n} plekken, passagiers aan boord: {f}',sv:'Hjul med {n} platser, passagerare ombord: {f}',da:'Hjul med {n} pladser, passagerer om bord: {f}',no:'Hjul med {n} plasser, passasjerer om bord: {f}',fi:'Pyörä, jossa on {n} paikkaa, matkustajia kyydissä: {f}'},
    resShort:       {en:'Seats full: {f}, empty: {e}',de:'Besetzte Sitze: {f}, freie: {e}',fr:'Sièges occupés : {f}, vides : {e}',it:'Posti occupati: {f}, vuoti: {e}',es:'Asientos ocupados: {f}, vacíos: {e}',pt:'Assentos ocupados: {f}, vazios: {e}',nl:'Bezette plekken: {f}, lege: {e}',sv:'Upptagna platser: {f}, tomma: {e}',da:'Optagne pladser: {f}, tomme: {e}',no:'Opptatte plasser: {f}, tomme: {e}',fi:'Varattuja paikkoja: {f}, tyhjiä: {e}'},
    resOver:        {en:'Riders who could not get on: {x}',de:'Fahrgäste, die nicht mehr hineinpassen: {x}',fr:'Passagers qui n’ont pas pu monter : {x}',it:'Passeggeri rimasti fuori: {x}',es:'Pasajeros que no cupieron: {x}',pt:'Passageiros que não couberam: {x}',nl:'Passagiers die er niet meer in pasten: {x}',sv:'Passagerare som inte fick plats: {x}',da:'Passagerer, der ikke kunne komme med: {x}',no:'Passasjerer som ikke fikk plass: {x}',fi:'Kyydistä jääneet matkustajat: {x}'},
    bondLabel:      {en:'Number bond: whole {n}, parts {p} and {q}',de:'Zerlegung: Ganzes {n}, Teile {p} und {q}',fr:'Décomposition : tout {n}, parties {p} et {q}',it:'Scomposizione: intero {n}, parti {p} e {q}',es:'Descomposición: total {n}, partes {p} y {q}',pt:'Decomposição: todo {n}, partes {p} e {q}',nl:'Splitsing: geheel {n}, delen {p} en {q}',sv:'Uppdelning: helhet {n}, delar {p} och {q}',da:'Opdeling: helhed {n}, dele {p} og {q}',no:'Oppdeling: helhet {n}, deler {p} og {q}',fi:'Hajotelma: kokonaisuus {n}, osat {p} ja {q}'},
    riderOff:       {en:'Let this rider off',de:'Diesen Fahrgast aussteigen lassen',fr:'Faire descendre ce passager',it:'Fai scendere questo passeggero',es:'Bajar a este pasajero',pt:'Fazer este passageiro descer',nl:'Laat deze passagier uitstappen',sv:'Låt den här passageraren kliva av',da:'Lad denne passager stige af',no:'La denne passasjeren gå av',fi:'Anna tämän matkustajan nousta pois'},
    queueLabel:     {en:'Riders waiting in the queue',de:'Fahrgäste in der Warteschlange',fr:'Passagers dans la file d’attente',it:'Passeggeri in fila',es:'Pasajeros en la fila',pt:'Passageiros na fila',nl:'Passagiers in de rij',sv:'Passagerare i kön',da:'Passagerer i køen',no:'Passasjerer i køen',fi:'Jonossa odottavat matkustajat'},
    ticketsLabel:   {en:'Tickets',de:'Fahrkarten',fr:'Tickets',it:'Biglietti',es:'Boletos',pt:'Ingressos',nl:'Kaartjes',sv:'Biljetter',da:'Billetter',no:'Billetter',fi:'Liput'},
    play:           {en:'Fairground',de:'Rummelplatz',fr:'Fête foraine',it:'Luna park',es:'La feria',pt:'Parque de diversões',nl:'Kermis',sv:'Tivoli',da:'Tivoli',no:'Tivoli',fi:'Tivoli'},
    playBack:       {en:'Back to the rounds',de:'Zurück zu den Runden',fr:'Retour aux manches',it:'Torna ai turni',es:'Volver a las rondas',pt:'Voltar às rodadas',nl:'Terug naar de rondes',sv:'Tillbaka till omgångarna',da:'Tilbage til runderne',no:'Tilbake til rundene',fi:'Takaisin kierroksiin'},
    playNote:       {en:'Choose a wheel, board any riders and release the brake.',de:'Wähl ein Rad, lass Fahrgäste einsteigen und löse die Bremse.',fr:'Choisis une roue, fais monter des passagers et desserre le frein.',it:'Scegli una ruota, fai salire i passeggeri e togli il freno.',es:'Elige una rueda, sube pasajeros y suelta el freno.',pt:'Escolha uma roda, faça passageiros subirem e solte o freio.',nl:'Kies een rad, laat passagiers instappen en haal de rem eraf.',sv:'Välj ett hjul, låt passagerare kliva på och släpp bromsen.',da:'Vælg et hjul, lad passagerer stige på, og slip bremsen.',no:'Velg et hjul, la passasjerer gå på, og slipp bremsen.',fi:'Valitse pyörä, päästä matkustajia kyytiin ja vapauta jarru.'},
    seatsLess:      {en:'Fewer seats',de:'Weniger Sitze',fr:'Moins de sièges',it:'Meno posti',es:'Menos asientos',pt:'Menos assentos',nl:'Minder plekken',sv:'Färre platser',da:'Færre pladser',no:'Færre plasser',fi:'Vähemmän paikkoja'},
    seatsMore:      {en:'More seats',de:'Mehr Sitze',fr:'Plus de sièges',it:'Più posti',es:'Más asientos',pt:'Mais assentos',nl:'Meer plekken',sv:'Fler platser',da:'Flere pladser',no:'Flere plasser',fi:'Enemmän paikkoja'},
    setWheel:       {en:'Wheel',de:'Rad',fr:'Roue',it:'Ruota',es:'Rueda',pt:'Roda',nl:'Rad',sv:'Hjul',da:'Hjul',no:'Hjul',fi:'Pyörä'},
    upto5:          {en:'Up to 5',de:'Bis 5',fr:'Jusqu’à 5',it:'Fino a 5',es:'Hasta 5',pt:'Até 5',nl:'Tot en met 5',sv:'Upp till 5',da:'Op til 5',no:'Opp til 5',fi:'5:een asti'},
    six9:           {en:'6 to 9',de:'6 bis 9',fr:'De 6 à 9',it:'Da 6 a 9',es:'Del 6 al 9',pt:'De 6 a 9',nl:'6 tot en met 9',sv:'6 till 9',da:'6 til 9',no:'6 til 9',fi:'6–9'},
    ten:            {en:'Make 10',de:'10 bilden',fr:'Faire 10',it:'Fare 10',es:'Formar 10',pt:'Formar 10',nl:'10 maken',sv:'Bilda 10',da:'Lav 10',no:'Lag 10',fi:'Tee 10'},
    setSeats:       {en:'Seat numbers',de:'Sitznummern',fr:'Numéros des sièges',it:'Numeri dei posti',es:'Números de asiento',pt:'Números dos assentos',nl:'Plaatsnummers',sv:'Platsnummer',da:'Pladsnumre',no:'Plassnummer',fi:'Paikkanumerot'},
    off:            {en:'Off',de:'Aus',fr:'Non',it:'No',es:'No',pt:'Não',nl:'Uit',sv:'Av',da:'Fra',no:'Av',fi:'Pois'},
    on:             {en:'On',de:'An',fr:'Oui',it:'Sì',es:'Sí',pt:'Sim',nl:'Aan',sv:'På',da:'Til',no:'På',fi:'Päällä'}
  },

  defaults: { wheel: 'ten', seatNums: 'off' },
  settings: [
    { key: 'wheel', type: 'choice', labelKey: 'setWheel', options: [{ value: 'upto5', labelKey: 'upto5' }, { value: 'six9', labelKey: 'six9' }, { value: 'ten', labelKey: 'ten' }] },
    { key: 'seatNums', type: 'choice', labelKey: 'setSeats', options: [{ value: 'off', labelKey: 'off' }, { value: 'on', labelKey: 'on' }] }
  ],

  BOARD_MS: 380, LURCH_MS: 1600, SPIN_MS: 2400, OVER_MS: 1500, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._play = null; this._playing = false; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._busy = false; this._timers = []; this._raf = null; this._ro = null; this._v = {}; this._tickets = [];
    this._theme = null;
    injectTenSeatWheelCSS();
    if (typeof LCSPictures !== 'undefined') LCSPictures.load(TenSeatWheelCore.THEME).then(function (th) { self._theme = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () { /* bare */ });
    this._keyHandler = function (ev) {
      if (!self._wrap || !self._wrap.isConnected) return;
      var tg = ev.target && ev.target.tagName;
      if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT' || ev.ctrlKey || ev.metaKey || ev.altKey) return;
      var st = self._cur(); if (!st || st.done) return;
      if (ev.key === 'ArrowUp' || ev.key === 'ArrowDown') { self._step(ev.key === 'ArrowUp' ? 1 : -1); ev.preventDefault(); }
      else if (ev.key === 'g' || ev.key === 'G') { self._gate(); ev.preventDefault(); }
      else if (ev.key === 'b' || ev.key === 'B') { self._brake(); ev.preventDefault(); }
    };
    if (typeof document !== 'undefined') document.addEventListener('keydown', this._keyHandler);
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
    if (this._keyHandler && typeof document !== 'undefined') document.removeEventListener('keydown', this._keyHandler);
  },
  onSettings: function () {
    var key = this._level();
    if (this._poolKey !== key) { this._pool = null; this._order = null; this._playing = false; this._tickets = []; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; } },
  _ms: function (ms) { return this.FAST ? 0 : ms; },

  /* ---------------- rounds ---------------- */
  _level: function () { return TenSeatWheelCore.level(this.api && this.api.settings && this.api.settings.wheel); },
  _seatNumsOn: function () { return !!(this.api && this.api.settings && this.api.settings.seatNums === 'on'); },
  _ensurePool: function () { var key = this._level(); if (!this._pool || this._poolKey !== key) { this._pool = TenSeatWheelCore.rounds(key); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length;
    var index = (opts && opts.index) || 0;
    if (!this._order || this._order.length !== n) { this._order = TenSeatWheelCore.order(pool, Math.random, null); this._curPass = Math.floor(index / n); }
    var pass = Math.floor(index / n);
    if (pass > this._curPass) { this._order = TenSeatWheelCore.order(pool, Math.random, this._order); this._curPass = pass; }
    var r = pool[this._order[index % n]];
    var first = index % n === 0, last = index % n === n - 1;
    return {
      id: 'ten-seat-wheel.' + r.id,
      promptKey: TenSeatWheelCore.promptKey(r),
      promptArgs: { n: r.n, k: r.k, m: r.answer, a: r.a, b: r.b },
      celebrateKey: TenSeatWheelCore.celebrateKey(r, last),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool.st = TenSeatWheelCore.newState(r); tool._round = r; tool._playing = false;
        tool._busy = false; tool._v = {}; tool._last2 = last;
        if (first) tool._tickets = [];
      },
      /* this activity presses Check itself when the round is complete */
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _cur: function () { return this._playing ? this._play : this.st; },
  _src: function (key) { if (!this._theme || typeof LCSPictures === 'undefined') return ''; try { return LCSPictures.url(this._theme, key); } catch (e) { return ''; } },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    var api = this.api, self = this;
    if (!this.st) { this._round = TenSeatWheelCore.rounds('ten')[0]; this.st = TenSeatWheelCore.newState(this._round); }
    var stage = api.stage;
    stage.innerHTML = '';
    var wrap = api.el('div', 'tw-wrap'); this._wrap = wrap;
    var body = api.el('div', 'tw-body'); this._body = body;
    var main = api.el('div', 'tw-main');

    /* the wheel */
    var wheel = api.el('div', 'tw-wheel'); wheel.setAttribute('role', 'group'); this._wheel = wheel;
    var frame = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); frame.setAttribute('class', 'tw-frame'); frame.setAttribute('aria-hidden', 'true'); this._frame = frame; wheel.appendChild(frame);
    var gonds = api.el('div', 'tw-gonds'); this._gonds = gonds; wheel.appendChild(gonds);
    var hubRow = api.el('div', 'tw-hubrow'); this._hubRow = hubRow;
    var hub = api.el('div', 'tw-hub'); hub.setAttribute('role', 'status'); this._hub = hub;
    hubRow.appendChild(hub); wheel.appendChild(hubRow);
    main.appendChild(wheel);

    /* the platform: the queue at the turnstile, the gate dial + lever, the brake */
    var plat = api.el('div', 'tw-platform'); this._plat = plat;
    var dial = api.el('div', 'tw-dial'); this._dial = dial;
    var dDown = api.el('button', 'tw-arrow tw-ddown'); dDown.type = 'button'; dDown.innerHTML = arrowSvg(false); dDown.addEventListener('click', function () { self._step(-1); }); this._dDown = dDown;
    var dWin = api.el('div', 'tw-dwin'); dWin.setAttribute('role', 'status'); this._dWin = dWin;
    var dUp = api.el('button', 'tw-arrow tw-dup'); dUp.type = 'button'; dUp.innerHTML = arrowSvg(true); dUp.addEventListener('click', function () { self._step(1); }); this._dUp = dUp;
    dial.appendChild(dDown); dial.appendChild(dWin); dial.appendChild(dUp);
    var gate = api.el('button', 'tw-lever tw-gate'); gate.type = 'button'; gate.innerHTML = '<span class="tw-lever-arm"><span class="tw-lever-knob"></span></span><span class="tw-lever-base"></span><svg class="tw-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5M20 21V5M4 9h16M4 14h16M8 9v5M12 9v5M16 9v5" fill="none" stroke="#7A6A58" stroke-width="2.4" stroke-linecap="round"/></svg>'; gate.addEventListener('click', function () { self._gate(); }); this._gateBtn = gate;
    var queue = api.el('div', 'tw-queue'); queue.setAttribute('role', 'img'); this._queue = queue;
    var brake = api.el('button', 'tw-lever tw-brake'); brake.type = 'button'; brake.innerHTML = '<span class="tw-lever-arm"><span class="tw-lever-knob"></span></span><span class="tw-lever-base"></span><svg class="tw-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="#146B5E" stroke-width="2.4"/><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" stroke="#146B5E" stroke-width="1.6"/></svg>'; brake.addEventListener('click', function () { self._brake(); }); this._brakeBtn = brake;
    var row1 = api.el('div', 'tw-prow tw-prow1'); row1.appendChild(dial); row1.appendChild(gate); row1.appendChild(brake); this._row1 = row1;
    var row2 = api.el('div', 'tw-prow tw-prow2'); row2.appendChild(queue); this._row2 = row2;
    plat.appendChild(row2); plat.appendChild(row1);
    main.appendChild(plat);

    /* the stepper (Fairground) */
    var stepper = api.el('div', 'tw-stepper'); this._stepper = stepper;
    var less = api.el('button', 'tw-step'); less.type = 'button'; less.textContent = '−'; less.addEventListener('click', function () { self._seats(-1); }); this._lessBtn = less;
    var more = api.el('button', 'tw-step'); more.type = 'button'; more.textContent = '+'; more.addEventListener('click', function () { self._seats(1); }); this._moreBtn = more;
    stepper.appendChild(less); stepper.appendChild(more); main.appendChild(stepper);

    /* the bond board and the tickets */
    var side = api.el('div', 'tw-side'); this._side = side;
    var bond = api.el('div', 'tw-bond'); bond.setAttribute('role', 'img'); bond.innerHTML = '<svg class="tw-bondlines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><line x1="50" y1="30" x2="22" y2="72"/><line x1="50" y1="30" x2="78" y2="72"/></svg><b class="tw-bw"></b><i class="tw-beq">=</i><b class="tw-bp tw-bp1"></b><i class="tw-bplus">+</i><b class="tw-bp tw-bp2"></b>'; this._bond = bond; side.appendChild(bond);
    var tickets = api.el('div', 'tw-tickets'); tickets.setAttribute('role', 'list'); this._ticketsEl = tickets; side.appendChild(tickets);
    body.appendChild(main); body.appendChild(side);
    wrap.appendChild(body);
    var note = api.el('div', 'tw-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var live = api.el('div', 'tw-live'); live.setAttribute('aria-live', 'polite'); this._live = live; wrap.appendChild(live);
    var rowA = api.el('div', 'tw-actions'); this._actions = rowA;
    var playBtn = api.el('button', 'tw-tool tw-playbtn'); playBtn.type = 'button'; playBtn.addEventListener('click', function () { self._togglePlay(); }); this._playBtn = playBtn; rowA.appendChild(playBtn);
    wrap.appendChild(rowA);

    stage.appendChild(wrap);
    this._layout();
    this._paint();
    this._watchWidth();
  },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _layout: function () {
    var L = this._L = TenSeatWheelCore.layout(this._width()), w = this._wrap;
    w.classList.toggle('is-wide', L.mode === 'wide'); w.classList.toggle('is-narrow', L.mode === 'narrow');
    w.classList.toggle('is-tiny', L.col < 300);
    /* on phones the bond board rides in the queue row as one line; on the smallest it folds away and
       the Fairground button rides there instead */
    if (this._playBtn) { var host = L.mode === 'wide' ? this._side : L.col < 300 ? this._row2 : this._actions; if (this._playBtn.parentNode !== host) host.appendChild(this._playBtn); }
    if (this._side) { var sh = L.mode === 'wide' ? this._body : this._row2; if (this._side.parentNode !== sh) sh.appendChild(this._side); }
    /* the Fairground's seat stepper: in the side column (wide) or the queue row (phones) */
    if (this._stepper) { var stH = L.mode === 'wide' ? this._side : this._row2; if (this._stepper.parentNode !== stH) { if (stH === this._side) stH.insertBefore(this._stepper, this._playBtn && this._playBtn.parentNode === stH ? this._playBtn : null); else stH.appendChild(this._stepper); } }
    w.style.setProperty('--tw-gw', L.gond.w + 'px'); w.style.setProperty('--tw-gh', L.gond.h + 'px');
    w.style.setProperty('--tw-rider', L.rider + 'px'); w.style.setProperty('--tw-hub', L.hub + 'px'); w.style.setProperty('--tw-hubf', L.hubFont + 'px');
    w.style.setProperty('--tw-q', L.qRider + 'px'); w.style.setProperty('--tw-side', L.side + 'px');
    w.style.setProperty('--tw-lever', L.lever + 'px'); w.style.setProperty('--tw-brake', L.brake + 'px');
    this._wheel.style.width = L.wheelW + 'px'; this._wheel.style.height = L.wheelH + 'px';
    this._drawFrame();
  },
  _watchWidth: function () {
    var self = this;
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} }
    if (typeof ResizeObserver === 'undefined') return;
    var last = this._width();
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._layout(); self._paint();
    });
    this._ro.observe(this.api.stage);
  },
  /* the stand, the rim, the spokes and the rim bulbs (the rim group turns with the wheel) */
  _drawFrame: function () {
    var L = this._L, st = this._cur(), n = st ? st.n : 10, R = L.R, cx = L.wheelW / 2, cy = R + 6, W = L.wheelW, H = L.wheelH;
    this._cx = cx; this._cy = cy;
    var s = '<path class="tw-stand" d="M ' + (cx - R * 0.62) + ' ' + (H - 2) + ' L ' + cx + ' ' + cy + ' L ' + (cx + R * 0.62) + ' ' + (H - 2) + '"/>';
    s += '<g class="tw-rimg"><circle class="tw-rim" cx="' + cx + '" cy="' + cy + '" r="' + R + '"/><circle class="tw-rim2" cx="' + cx + '" cy="' + cy + '" r="' + (R * 0.82) + '"/>';
    for (var i = 0; i < n; i++) { var a = i * 360 / n * Math.PI / 180; s += '<line class="tw-spoke" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + R * Math.cos(a)) + '" y2="' + (cy + R * Math.sin(a)) + '"/>'; }
    for (var b = 0; b < 20; b++) { var ab = b * 18 * Math.PI / 180; s += '<circle class="tw-bulb" data-b="' + b + '" cx="' + (cx + R * Math.cos(ab)) + '" cy="' + (cy + R * Math.sin(ab)) + '" r="' + (L.mode === 'wide' ? 5 : 3.5) + '"/>'; }
    s += '</g>';
    this._frame.setAttribute('viewBox', '0 0 ' + W + ' ' + H); this._frame.style.width = W + 'px'; this._frame.style.height = H + 'px';
    this._frame.innerHTML = s;
    this._frameN = n;
    this._hubRow.style.top = (cy - L.hub / 2) + 'px'; this._hubRow.style.height = L.hub + 'px';
  },

  /* ---------------- paint ---------------- */
  _paint: function () {
    var st = this._cur(), t = this.api.t, self = this, C = TenSeatWheelCore, L = this._L;
    if (!st || !this._wrap) return;
    var w = this._wrap, v = this._v || {}, n = st.n;
    if (this._frameN !== n) this._drawFrame();
    w.classList.toggle('is-play', !!st.explore);
    /* the bond board folds away on the smallest phones, and on phones in the Fairground (the stepper takes its place) */
    this._side.hidden = L.col < 300 || (L.mode !== 'wide' && !!st.explore);
    w.classList.toggle('is-done', !!st.done);
    w.classList.toggle('is-whole', st.kind === 'whole');
    w.classList.toggle('is-seatnums', this._seatNumsOn());
    var rot = v.rot != null ? v.rot : st.rot;
    var boarded = v.boarded != null ? v.boarded : st.boarded;
    var extras = v.extras != null ? v.extras : st.extras;
    this._frame.querySelector('.tw-rimg').setAttribute('transform', 'rotate(' + rot + ' ' + this._cx + ' ' + this._cy + ')');
    this._frame.classList.toggle('is-chase', !!v.chase);

    /* the gondolas */
    var seatsNow = [], i;
    for (i = 0; i < n; i++) {
      if (st.kind === 'whole') seatsNow.push({ who: 'start', kind: i < st.a ? st.pair[0] : st.pair[1] });
      else if (i < st.k) seatsNow.push({ who: 'start', kind: st.pair[0] });
      else if (i < st.k + boarded) seatsNow.push({ who: 'board', kind: st.pair[1] });
      else seatsNow.push(null);
    }
    if (this._gonds.children.length !== n) {
      this._gonds.innerHTML = '';
      for (i = 0; i < n; i++) (function (si) {
        var g = self.api.el('button', 'tw-gond'); g.type = 'button';
        g.innerHTML = '<span class="tw-hanger"></span><span class="tw-cup"></span><img class="tw-rider" alt="" draggable="false"><b class="tw-mark"></b><i class="tw-seatno"></i>';
        g.addEventListener('click', function () { self._letOff(si); });
        self._gonds.appendChild(g);
      }(i));
    }
    var marks = v.marks || C.seatMarks(st), lit = v.lit;
    var R = L.R, cx = this._cx, cy = this._cy;
    for (i = 0; i < n; i++) {
      var g = this._gonds.children[i], s = seatsNow[i], ang = C.seatAngle(rot, i, n) * Math.PI / 180;
      var px = cx + R * Math.cos(ang), py = cy + R * Math.sin(ang);
      g.style.left = (px - L.gond.w / 2) + 'px'; g.style.top = (py - 6) + 'px';
      g.classList.toggle('is-five', i < 5); g.classList.toggle('is-ten', i >= 5);
      g.classList.toggle('is-full', !!s); g.classList.toggle('is-boarded', !!(s && s.who === 'board'));
      g.classList.toggle('is-empty', !s);
      g.classList.toggle('is-glow', !s && !!v.glowEmpty);
      g.classList.toggle('is-lit', !!(lit && lit[i]));
      var img = g.querySelector('.tw-rider'), src = s ? this._src(s.kind) : '';
      if (src) { if (img.getAttribute('src') !== src) img.setAttribute('src', src); img.hidden = false; } else img.hidden = true;
      var mk = marks && marks[i] !== '' && marks[i] != null ? String(marks[i]) : '';
      var mkEl = g.querySelector('.tw-mark'); mkEl.textContent = mk; mkEl.hidden = !mk;
      var sn = g.querySelector('.tw-seatno'); sn.textContent = String(i + 1);
      var canOff = !!(s && s.who === 'board') && !st.done && !this._busy && st.kind !== 'whole';
      g.disabled = !canOff;
      g.setAttribute('aria-label', s ? (canOff ? t('riderOff') : String(i + 1)) : String(i + 1));
    }
    var filled = st.kind === 'whole' ? n : st.k + boarded;
    this._wheel.setAttribute('aria-label', interp(t('wheelLabel'), { n: n, f: filled }));

    /* the hub: the whole, or (WHOLE) the hub dial */
    var isWhole = st.kind === 'whole';
    this._hub.textContent = isWhole ? (st.hub == null ? '?' : String(st.hub)) : String(n);
    this._hub.classList.toggle('is-q', isWhole && st.hub == null);
    this._hub.classList.toggle('is-dial', isWhole && !st.done);
    this._hub.classList.toggle('is-wrong', !!v.hubWrong);
    this._hub.setAttribute('aria-label', isWhole ? (st.hub == null ? t('hubUnset') : interp(t('hubLabel'), { d: st.hub })) : String(n));
    var glow = C.arrowGlow(st);

    /* the dial, the gate, the brake — in WHOLE rounds the dial's arrows set the hub */
    this._gateBtn.hidden = isWhole; this._dWin.hidden = isWhole;
    this._dWin.textContent = String(st.dial);
    this._dWin.setAttribute('aria-label', interp(t('dialLabel'), { d: st.dial }));
    if (isWhole) { this._dDown.disabled = this._busy || st.done || (st.hub != null && st.hub <= 2); this._dUp.disabled = this._busy || st.done || (st.hub != null && st.hub >= 10); }
    else { this._dDown.disabled = this._busy || st.done || st.dial <= 1; this._dUp.disabled = this._busy || st.done || st.dial >= 9; }
    this._dDown.setAttribute('aria-label', t(isWhole ? 'hubDown' : 'dialDown')); this._dUp.setAttribute('aria-label', t(isWhole ? 'hubUp' : 'dialUp'));
    this._dUp.classList.toggle('is-glow', glow === 'up'); this._dDown.classList.toggle('is-glow', glow === 'down');
    this._dWin.classList.toggle('is-flash', !!v.dialFlash);
    this._gateBtn.disabled = this._busy || st.done;
    this._gateBtn.setAttribute('aria-label', t('gate')); this._gateBtn.title = t('gate');
    this._brakeBtn.disabled = this._busy || st.done;
    this._brakeBtn.setAttribute('aria-label', t('brake')); this._brakeBtn.title = t('brake');
    this._brakeBtn.classList.toggle('is-held', !!v.held);

    /* the queue: always the same few at the turnstile, the rope running off-stage; the extras stand on the edge */
    var qn = L.queue, qsrc = this._src(st.pair[1]), qh = '<span class="tw-turnstile"></span>';
    for (var q = 0; q < qn; q++) qh += '<img class="tw-qrider" alt="" draggable="false"' + (qsrc ? ' src="' + qsrc + '"' : ' hidden') + '>';
    qh += '<span class="tw-rope"></span>';
    var eh = ''; for (var x = 0; x < extras; x++) eh += '<img class="tw-extra" alt="" draggable="false"' + (qsrc ? ' src="' + qsrc + '"' : ' hidden') + '>';
    var qkey = qn + '|' + qsrc + '|' + extras;
    if (this._queue.getAttribute('data-k') !== qkey) { this._queue.innerHTML = qh + (extras ? '<span class="tw-edge">' + eh + '</span>' : ''); this._queue.setAttribute('data-k', qkey); }
    this._queue.setAttribute('aria-label', extras ? interp(t('resOver'), { x: extras }) : t('queueLabel'));
    this._queue.hidden = isWhole;
    this._row2.hidden = isWhole && this._playBtn.parentNode !== this._row2 && this._side.parentNode !== this._row2;

    /* the bond board */
    var p1, p2, whole;
    if (isWhole) { whole = st.hub == null || !st.done ? '?' : String(n); p1 = st.a; p2 = st.b; }
    else if (st.explore) { whole = n; p1 = boarded || '?'; p2 = boarded ? n - boarded : '?'; }
    else { whole = n; p1 = st.k; p2 = st.done ? n - st.k : '?'; }
    this._bond.querySelector('.tw-bw').textContent = String(whole);
    this._bond.querySelector('.tw-bp1').textContent = String(p1);
    this._bond.querySelector('.tw-bp2').textContent = String(p2);
    this._bond.setAttribute('aria-label', interp(t('bondLabel'), { n: whole, p: p1, q: p2 }));
    var th = this._tickets.map(function (tk) { return '<span class="tw-ticket" role="listitem">' + tk + '</span>'; }).join('');
    if (this._ticketsEl.getAttribute('data-h') !== th) { this._ticketsEl.innerHTML = th; this._ticketsEl.setAttribute('data-h', th); }
    this._ticketsEl.setAttribute('aria-label', t('ticketsLabel'));
    this._ticketsEl.hidden = !this._tickets.length || !!st.explore || L.mode !== 'wide';

    /* the stepper */
    this._stepper.hidden = !st.explore;
    this._lessBtn.disabled = !st.explore || st.n <= 2 || this._busy; this._moreBtn.disabled = !st.explore || st.n >= 10 || this._busy;
    this._lessBtn.setAttribute('aria-label', t('seatsLess')); this._moreBtn.setAttribute('aria-label', t('seatsMore'));

    /* the note */
    var h = st.explore ? { key: 'playNote' } : C.hint(st);
    var text = h ? interp(t(h.key), h) : '';
    if (this._note.textContent !== text) this._note.textContent = text;
    this._note.hidden = !text;
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
    this._playBtn.textContent = t(st.explore ? 'playBack' : 'play');
    this._playBtn.disabled = this._busy;
  },
  _say: function (text) { if (this._live) this._live.textContent = text; },

  /* ---------------- motion ---------------- */
  /* tween the wheel's rotation: fn(p) → degrees, over ms */
  _tween: function (ms, fn, done) {
    var self = this;
    if (this.FAST || ms <= 0 || typeof requestAnimationFrame === 'undefined') { this._v.rot = fn(1); this._paint(); done(); return; }
    var t0 = null;
    var tick = function (ts) {
      if (t0 == null) t0 = ts;
      var p = Math.min(1, (ts - t0) / ms);
      self._v.rot = fn(p); self._paint();
      if (p < 1) self._raf = requestAnimationFrame(tick); else { self._raf = null; done(); }
    };
    this._raf = requestAnimationFrame(tick);
  },
  _shortest: function (from, to) { var d = ((to - from) % 360 + 540) % 360 - 180; return d; },

  /* ---------------- the hand ---------------- */
  _step: function (d) {
    var st = this._cur(), C = TenSeatWheelCore;
    if (!st || this._busy || st.done) return;
    var ok = st.kind === 'whole' ? C.stepHub(st, d) : C.stepDial(st, d);
    if (!ok) { this.api.sound(220); return; }
    this._v = {};
    this.api.sound(440 + (st.kind === 'whole' ? st.hub : st.dial) * 30);
    this._paint();
  },
  /* the gate lever: riders hop in one at a time, the wheel clicking round a seat each */
  _gate: function () {
    var st = this._cur(), self = this, C = TenSeatWheelCore;
    if (!st || this._busy || st.done || st.kind === 'whole') return;
    var before = st.boarded, startRot = this._v.rot != null ? this._v.rot : st.rot;
    var res = C.board(st);
    if (!res) return;
    this.api.track('gate', { id: st.id, dial: st.dial, boarded: res.boarded, extras: res.extras });
    bounce(this._gateBtn, 'tw-pull');
    if (this.FAST || res.boarded === before) { this._v = {}; this._afterGate(res); return; }
    this._busy = true;
    var n = st.n, stepDeg = C.step(n), dir = res.boarded > before ? 1 : -1;
    this._v = { boarded: before, extras: 0, rot: startRot };
    var cur = before;
    var next = function () {
      if (cur === res.boarded) { self._busy = false; self._v = {}; self._afterGate(res); return; }
      /* bring the seat at the boarding point to the bottom, then the rider hops in (or out) */
      var seat = dir > 0 ? st.k + cur : st.k + cur - 1;
      var from = self._v.rot, to = from + self._shortest(from, C.norm(90 - seat * stepDeg));
      self._tween(self.BOARD_MS * 0.6, function (p) { return from + (to - from) * easeInOut(p); }, function () {
        cur += dir; self._v.boarded = cur;
        self.api.sound(dir > 0 ? 392 * Math.pow(2, (st.k + cur) / 12) : 330);
        self._paint();
        self._later(next, self.BOARD_MS * 0.4);
      });
    };
    next();
  },
  _afterGate: function (res) {
    var st = this._cur();
    if (res.extras > 0) { this.api.sound(160); this._say(interp(this.api.t('resOver'), { x: res.extras })); }
    this._paint();
    void st;
  },
  _letOff: function (seat) {
    var st = this._cur();
    if (!st || this._busy) return;
    if (!TenSeatWheelCore.letOff(st, seat)) { var g = this._gonds.children[seat]; bounce(g, 'tw-swing'); this.api.sound(240); return; }
    this._v = {};
    this.api.sound(330);
    this._paint();
  },
  /* the brake (= Check) */
  _brake: function () {
    var st = this._cur(), self = this, C = TenSeatWheelCore, t = this.api.t;
    if (!st || this._busy || st.done) return;
    var fromRot = this._v.rot != null ? this._v.rot : st.rot;
    var res = C.release(st);
    if (!res) return;
    this.api.track('brake', { id: st.id, state: res.state, misses: st.misses });
    if (res.state === 'empty') { this.api.sound(240); bounce(this._gateBtn, 'tw-bob'); bounce(this._dial, 'tw-bob'); this._v = {}; this._paint(); return; }
    if (res.state === 'unset') { this.api.sound(240); bounce(this._hub, 'tw-bob'); this._v = {}; this._paint(); return; }
    if (res.state === 'over') {
      /* the brake clunks and holds; the extras stand with a halo; then everyone boarded hops back off */
      this.api.sound(150);
      this._v = { boarded: res.boarded, extras: res.extras, held: true, dialFlash: true, rot: fromRot };
      this._busy = true; this._paint();
      this._say(interp(t('resOver'), { x: res.extras }));
      this._later(function () { self._busy = false; self._v = {}; self._paint(); }, this._ms(this.OVER_MS));
      return;
    }
    if (res.state === 'short') {
      /* the lurch: the heavy side swings down, rocks three times, settles with the empty seats on top */
      var target = st.rot, d = this._shortest(fromRot, target);
      this.api.sound(200);
      this._busy = true; this._v = { rot: fromRot };
      this._say(interp(t('resShort'), { f: st.n - res.empties, e: res.empties }));
      this._tween(this._ms(this.LURCH_MS), function (p) { return target - d * Math.cos(p * Math.PI * 3.5) * Math.exp(-3.2 * p) * (1 - p); }, function () {
        self._busy = false; self._v = { glowEmpty: true }; self._paint();
      });
      return;
    }
    if (res.state === 'wholeWrong') {
      /* the gondolas light one by one in seat order */
      this.api.sound(220);
      this._v = { hubWrong: true, lit: [] }; this._busy = true; this._paint();
      var n = st.n, j = 0;
      var light = function () {
        if (j >= n || self.FAST) { self._later(function () { self._busy = false; self._v = {}; self._paint(); }, self._ms(500)); return; }
        self._v.lit[j++] = true; self.api.sound(440 + j * 20); self._paint(); self._later(light, 160);
      };
      light();
      return;
    }
    /* full / wholeRight: one slow turn (two at the end of a Make 10 pass), the rim bulbs chase */
    var turns = this._last2 && st.level === 'ten' ? 2 : 1, start = fromRot;
    if (!st.explore) {
      if (st.kind === 'whole') this._tickets.push(st.n + ' = ' + st.a + ' + ' + st.b);
      else this._tickets.push(st.n + ' = ' + st.k + ' + ' + (st.n - st.k));
    }
    this._busy = true; this._v = { rot: start, chase: true };
    [523, 659, 784, 1047].forEach(function (f, q) { self._later(function () { self.api.sound(f); }, self._ms(q * 200)); });
    this._tween(this._ms(this.SPIN_MS * turns), function (p) { return start + 360 * turns * easeInOut(p); }, function () {
      self._busy = false; st.rot = C.norm(start); self._v = {}; self._paint();
      if (st.done) self._finish();
    });
  },
  _finish: function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); },

  /* ---------------- free play ---------------- */
  _togglePlay: function () {
    if (this._busy) return;
    this._v = {};
    if (this._playing) { this._playing = false; this._drawFrame(); this._paint(); return; }
    this._playing = true; this._play = TenSeatWheelCore.newPlay(6);
    this._drawFrame(); this._paint();
  },
  _seats: function (d) { var st = this._play; if (!this._playing || !st || this._busy) return; TenSeatWheelCore.setSeats(st, st.n + d); this._v = {}; this.api.sound(440); this._drawFrame(); this._paint(); }
};

function interp(s, args) { return String(s || '').replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args && args[k] != null) ? String(args[k]) : m; }); }
function bounce(el, cls) { if (!el) return; el.classList.remove(cls); void (el.getBoundingClientRect ? el.getBoundingClientRect() : 0); el.classList.add(cls); }
function easeInOut(p) { return p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
function arrowSvg(up) { return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + (up ? 'M5 15 L12 7 L19 15' : 'M5 9 L12 17 L19 9') + '" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'; }

var twCssDone = false;
function injectTenSeatWheelCSS() {
  if (twCssDone || typeof document === 'undefined') return;
  twCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.tw-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:10px;--tw-ink:#2B3A36;--tw-coral:#F2784B;--tw-teal:#2E9C88;--tw-gw:104px;--tw-gh:104px;--tw-rider:96px;--tw-hub:96px;--tw-hubf:48px;--tw-q:96px;--tw-side:152px;--tw-lever:64px;--tw-brake:56px;}'
  + '.tw-body{display:flex;flex-direction:column;align-items:stretch;gap:8px;}'
  + '.tw-wrap.is-wide .tw-body{flex-direction:row;align-items:flex-start;gap:12px;}'
  + '.tw-main{flex:1;min-width:0;display:flex;flex-direction:column;align-items:center;gap:8px;}'
  /* the wheel */
  + '.tw-wheel{position:relative;flex:none;}'
  + '.tw-frame{position:absolute;left:0;top:0;overflow:visible;pointer-events:none;}'
  + '.tw-stand{fill:none;stroke:#146B5E;stroke-width:8;stroke-linecap:round;stroke-linejoin:round;}'
  + '.tw-rim{fill:#FFFBF2;fill-opacity:.55;stroke:var(--tw-ink);stroke-width:3;} .tw-rim2{fill:none;stroke:#C9BFA8;stroke-width:2;}'
  + '.tw-spoke{stroke:#9AA5A1;stroke-width:2.5;}'
  + '.tw-bulb{fill:#F2C14E;stroke:#B58A2E;stroke-width:1;}'
  + '.tw-frame.is-chase .tw-bulb{animation:tw-chase .6s steps(2) infinite;} .tw-frame.is-chase .tw-bulb:nth-child(odd){animation-delay:.3s;} @keyframes tw-chase{50%{fill:#fff;}}'
  + '.tw-gonds{position:absolute;inset:0;}'
  + '.tw-gond{position:absolute;width:var(--tw-gw);height:var(--tw-gh);padding:0;border:0;background:none;cursor:default;z-index:2;}'
  + '.tw-gond:not(:disabled){cursor:pointer;}'
  + '.tw-hanger{position:absolute;left:50%;top:0;width:3px;height:12px;margin-left:-1.5px;background:var(--tw-ink);}'
  + '.tw-gond{border-radius:50%;}'
  + '.tw-cup{position:absolute;left:5px;right:5px;top:10px;bottom:0;border-radius:50%;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--tw-ink);}'
  + '.tw-gond.is-five .tw-cup{box-shadow:inset 0 0 0 3px var(--tw-ink),inset 0 0 0 8px var(--tw-coral);} .tw-gond.is-ten .tw-cup{box-shadow:inset 0 0 0 3px var(--tw-ink),inset 0 0 0 8px var(--tw-teal);}'
  + '.tw-gond.is-glow .tw-cup{background:#fff;outline:3px dashed var(--tw-coral);outline-offset:2px;}'
  + '.tw-gond.is-lit .tw-cup{background:#FFF1BF;}'
  + '.tw-rider{position:absolute;left:50%;bottom:4px;width:var(--tw-rider);height:var(--tw-rider);margin-left:calc(var(--tw-rider) / -2);object-fit:contain;pointer-events:none;} .tw-rider[hidden]{display:none;}'
  + '.tw-gond.is-boarded .tw-rider{animation:tw-hop .3s ease-out both;} @keyframes tw-hop{from{transform:translateY(-14px);}to{transform:none;}}'
  + '.tw-mark{position:absolute;left:50%;top:50%;transform:translate(-50%,-30%);min-width:30px;height:30px;padding:0 4px;box-sizing:border-box;border-radius:15px;background:#fff;color:var(--tw-ink);font:800 20px/30px var(--lcs-font-display);text-align:center;box-shadow:0 0 0 2px var(--tw-teal);z-index:3;} .tw-mark[hidden]{display:none;}'
  + '.tw-seatno{display:none;position:absolute;right:-4px;top:4px;min-width:20px;height:20px;border-radius:10px;background:#fff;font:800 14px/20px var(--lcs-font-display);font-style:normal;color:var(--tw-ink);box-shadow:0 0 0 1.5px var(--tw-ink);z-index:3;}'
  + '.tw-wrap.is-seatnums .tw-seatno{display:block;}'
  + '.tw-gond.tw-swing{animation:tw-swk .3s ease-in-out 2;} @keyframes tw-swk{25%{rotate:-6deg;}75%{rotate:6deg;}}'
  + '.tw-hubrow{position:absolute;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:6px;z-index:4;pointer-events:none;}'
  + '.tw-hubrow > *{pointer-events:auto;}'
  + '.tw-hub{width:var(--tw-hub);height:var(--tw-hub);border-radius:50%;background:#146B5E;color:#fff;font:800 var(--tw-hubf)/var(--tw-hub) var(--lcs-font-display);text-align:center;box-shadow:0 0 0 4px #fff,0 0 0 7px var(--tw-ink);}'
  + '.tw-hub.is-q{background:#fff;color:#8C9894;} .tw-hub.is-dial:not(.is-q){background:#fff;color:#146B5E;} .tw-hub.is-wrong{animation:tw-wr .4s ease-in-out 3;} @keyframes tw-wr{50%{box-shadow:0 0 0 4px #fff,0 0 0 9px var(--tw-coral);}}'
  + '.tw-arrow{width:48px;height:48px;padding:10px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure,#146B5E);cursor:pointer;} .tw-arrow[hidden]{display:none;} .tw-arrow:disabled{opacity:.4;cursor:default;}'
  + '.tw-arrow svg{width:100%;height:100%;display:block;} .tw-arrow.is-glow{border-color:#F2C14E;box-shadow:0 0 0 4px #FFE7A3;}'
  /* the platform */
  + '.tw-platform{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;}'
  + '.tw-prow{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:nowrap;} .tw-prow[hidden]{display:none;}'
  + '.tw-dial{display:flex;align-items:center;gap:6px;} .tw-dial[hidden]{display:none;}'
  + '.tw-dwin{width:56px;height:56px;border-radius:12px;background:#FFFBF2;box-shadow:inset 0 0 0 3px var(--tw-ink);font:800 36px/56px var(--lcs-font-display);text-align:center;color:var(--tw-ink);}'
  + '.tw-dwin.is-flash{animation:tw-wr2 .35s ease-in-out 3;} @keyframes tw-wr2{50%{background:#FFE2D6;}}'
  + '.tw-lever{position:relative;width:var(--tw-lever);height:var(--tw-lever);padding:0;border:0;border-radius:12px;background:#F4EEE2;cursor:pointer;} .tw-lever[hidden]{display:none;} .tw-lever:disabled{opacity:.5;cursor:default;}'
  + '.tw-brake{width:var(--tw-brake);height:var(--tw-brake);}'
  + '.tw-lever-base{position:absolute;left:20%;right:20%;bottom:6px;height:10px;border-radius:5px;background:#7A6A58;}'
  + '.tw-lever-arm{position:absolute;left:50%;bottom:12px;width:8px;height:58%;margin-left:-4px;transform-origin:50% 100%;transform:rotate(-24deg);border-radius:4px;background:#9AA5A1;transition:transform .15s;}'
  + '.tw-lever-knob{position:absolute;left:50%;top:-14px;width:22px;height:22px;margin-left:-11px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F79A73,var(--tw-coral) 60%,#C95A31);}'
  + '.tw-ico{position:absolute;right:4px;top:4px;width:18px;height:18px;}'
  + '.tw-brake .tw-lever-knob{background:radial-gradient(circle at 35% 30%,#6FC6B4,var(--tw-teal) 60%,#146B5E);}'
  + '.tw-lever.tw-pull .tw-lever-arm{animation:tw-pk .35s ease-in-out 1;} @keyframes tw-pk{50%{transform:rotate(24deg);}}'
  + '.tw-brake.is-held .tw-lever-arm{animation:tw-clunk .2s ease-in-out 3;} @keyframes tw-clunk{50%{transform:rotate(-10deg);}}'
  + '.tw-lever.tw-bob,.tw-dial.tw-bob,.tw-hub.tw-bob{animation:tw-bobk .5s ease-in-out 1;} @keyframes tw-bobk{50%{transform:translateY(-6px);}}'
  + '.tw-queue{position:relative;display:flex;align-items:flex-end;padding:0 10px 4px 4px;min-height:var(--tw-q);} .tw-queue[hidden]{display:none;}'
  + '.tw-turnstile{width:10px;height:calc(var(--tw-q) * .7);margin-right:6px;border-radius:4px;background:#B58A2E;box-shadow:inset 0 0 0 2px #7A5A1C;flex:none;}'
  + '.tw-qrider{width:var(--tw-q);height:var(--tw-q);object-fit:contain;flex:none;} .tw-qrider + .tw-qrider{margin-left:calc(var(--tw-q) / -3);} .tw-qrider[hidden]{display:none;}'
  + '.tw-rope{position:absolute;left:12px;right:0;bottom:2px;height:4px;border-radius:2px;background:repeating-linear-gradient(90deg,#B4472A 0 10px,#E8A53A 10px 20px);}'
  + '.tw-edge{display:flex;align-items:flex-end;margin-left:10px;padding:0 4px;border-radius:12px;box-shadow:0 0 0 3px var(--tw-coral);background:#FFF5F0;}'
  + '.tw-extra{width:calc(var(--tw-q) * .66);height:calc(var(--tw-q) * .66);object-fit:contain;} .tw-extra[hidden]{display:none;} .tw-extra + .tw-extra{margin-left:-14px;}'
  /* the bond board + tickets */
  + '.tw-side{display:flex;flex-direction:column;align-items:center;gap:8px;}'
  + '.tw-wrap.is-wide .tw-side{width:var(--tw-side);flex:none;}'
  + '.tw-bond{position:relative;width:140px;height:128px;}'
  + '.tw-bondlines{position:absolute;inset:0;width:100%;height:100%;} .tw-bondlines line{stroke:var(--tw-ink);stroke-width:2;vector-effect:non-scaling-stroke;}'
  + '.tw-bw,.tw-bp{position:absolute;display:grid;place-items:center;border-radius:50%;background:#fff;color:var(--tw-ink);font-family:var(--lcs-font-display);font-weight:800;box-shadow:inset 0 0 0 3px var(--tw-ink);}'
  + '.tw-bw{left:50%;top:0;width:64px;height:64px;margin-left:-32px;font-size:30px;background:#E3F1EC;}'
  + '.tw-bp{top:76px;width:52px;height:52px;font-size:26px;} .tw-bp1{left:0;box-shadow:inset 0 0 0 3px var(--tw-coral);} .tw-bp2{right:0;box-shadow:inset 0 0 0 3px var(--tw-teal);}'
  + '.tw-tickets{display:flex;flex-direction:column;gap:4px;width:100%;} .tw-tickets[hidden]{display:none;}'
  + '.tw-ticket{display:block;padding:3px 8px;border-radius:6px;background:#FFF6DA;box-shadow:inset 0 0 0 2px #E8D9B8;font:800 16px/22px var(--lcs-font-display);color:var(--tw-ink);text-align:center;white-space:nowrap;animation:tw-print .4s ease-out both;} @keyframes tw-print{from{transform:translateY(-8px);opacity:0;}}'
  + '.tw-wrap.is-narrow .tw-side{flex-direction:row;justify-content:center;align-items:center;flex-wrap:wrap;}'
  + '.tw-beq,.tw-bplus{display:none;font:800 20px/1 var(--lcs-font-display);font-style:normal;color:var(--tw-ink);}'
  + '.tw-wrap.is-narrow .tw-bond{display:flex;align-items:center;gap:4px;width:auto;height:auto;} .tw-wrap.is-narrow .tw-bondlines{display:none;}'
  + '.tw-wrap.is-narrow .tw-bw,.tw-wrap.is-narrow .tw-bp{position:static;margin:0;width:40px;height:40px;font-size:20px;} .tw-wrap.is-narrow .tw-bw{width:44px;height:44px;font-size:22px;} .tw-wrap.is-narrow .tw-beq,.tw-wrap.is-narrow .tw-bplus{display:inline;}'
  + '.tw-side[hidden]{display:none !important;}'
  + '.tw-wrap.is-narrow .tw-tickets{flex-direction:row;flex-wrap:wrap;width:auto;max-width:180px;} .tw-wrap.is-narrow .tw-ticket{font-size:14px;line-height:18px;padding:2px 6px;}'
  + '.tw-stepper{display:flex;gap:10px;} .tw-stepper[hidden]{display:none;}'
  + '.tw-step{width:48px;height:48px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 26px/1 var(--lcs-font-display);cursor:pointer;} .tw-step:disabled{opacity:.4;cursor:default;}'
  /* the note and the actions */
  + '.tw-note{box-sizing:border-box;align-self:center;width:100%;max-width:560px;padding:10px 14px;border-radius:14px;background:#fff;border:2px solid var(--lcs-line,#DDE6E3);font-family:var(--lcs-font-body);font-weight:700;font-size:17px;line-height:1.35;color:var(--tw-ink);text-align:center;} .tw-note[hidden]{display:none;}'
  + '.tw-note.is-wrong{border-color:#E5B39E;background:#FFF5F0;}'
  + '.tw-live{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '.tw-actions{display:flex;justify-content:center;gap:12px;} .tw-actions:empty{display:none;}'
  + '.tw-tool{min-height:48px;padding:0 14px;border-radius:12px;border:2px solid var(--lcs-structure-soft,#CFE3DD);background:#fff;color:var(--lcs-structure);font:800 15px/1 var(--lcs-font-body);cursor:pointer;} .tw-tool:disabled{opacity:.45;cursor:default;}'
  + '.tw-gond:focus-visible,.tw-arrow:focus-visible,.tw-lever:focus-visible,.tw-tool:focus-visible,.tw-step:focus-visible{outline:3px solid var(--lcs-structure);outline-offset:2px;}'
  /* narrow */
  + '.tw-wrap.is-narrow{gap:6px;} .tw-wrap.is-narrow .tw-body,.tw-wrap.is-narrow .tw-main,.tw-wrap.is-narrow .tw-platform{gap:6px;} .tw-wrap.is-narrow .tw-note{font-size:15px;line-height:1.3;padding:5px 10px;} .tw-wrap.is-narrow .tw-prow{gap:8px;}'
  + '.tw-wrap.is-narrow .tw-mark{min-width:24px;height:24px;font-size:16px;line-height:24px;}'
  + '.tw-wrap.is-tiny .tw-prow2 .tw-playbtn{min-height:44px;padding:0 8px;font-size:13px;}'
  + '@media (prefers-reduced-motion:reduce){.tw-rider,.tw-ticket,.tw-lever-arm,.tw-gond,.tw-hub,.tw-dial,.tw-dwin{animation:none!important;transition:none!important;} .tw-frame.is-chase .tw-bulb{animation:none!important;}}';
  var style = document.createElement('style');
  style.id = 'tw-css';
  style.textContent = css;
  document.head.appendChild(style);
}

if (typeof module !== 'undefined' && module.exports) module.exports = TenSeatWheelActivity;
if (typeof window !== 'undefined') window.TenSeatWheelActivity = TenSeatWheelActivity;
