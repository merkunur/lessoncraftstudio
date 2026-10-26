/* =====================================================================
   magnet-plates-activity.js — ACTIVITY #77 of the one-by-one rebuild:
   "Sunny-Side Diner" → THE MAGNET PLATES AND THE GOLDEN "AND"
   (L.K.1.f, 11 locales). Design sheet: docs/activities-rebuild/designs/077-sunny-side-diner.md
   ---------------------------------------------------------------------
   THE INVENTION: order plates are magnets that push each other apart —
   tap a plate toward its neighbour and they spring away. Only the golden
   "and" holds two of them: lift it off its hook and drop it into the gap,
   and the plates pull in and lock. The kitchen hatch at the end of the
   rail opens only for a WHOLE sentence — the beginning cap, the plates
   joined, the end cap. With a third plate the first "and" turns into a
   comma by itself. Gather the order on the tray first (the ticket shows
   it as pictures and numerals; in Listen mode it folds shut).
   ACTIVITY LAYER ONLY: the model is magnet-plates-core.js; pictures
   through lcs-pictures.js; lcs-shell.js untouched (the shell's Check is
   hidden and pressed by this activity on success). Test seams:
   window.MagnetPlatesActivity.st / ._pool / ._order / ._ensurePool / .FAST.
   ===================================================================== */
'use strict';

var MagnetPlatesActivity = {
  id: 'magnet-plates',
  apparatusClasses: ['mp-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:  {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:     {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:        {en:'Sunny-Side Diner',de:'Sunnys Café',nl:'Het café van Sunny',da:'Sunnys café',sv:'Sunnys kafé',no:'Sunnys kafé',es:'La cafetería de Sunny',it:'La caffetteria di Sunny',pt:'A lanchonete da Sunny',fr:'Le restaurant de Sunny',fi:'Sunnyn kahvila'},
    tTray:        {en:'Put the whole order on the tray.',de:'Leg die ganze Bestellung auf das Tablett.',nl:'Zet de hele bestelling op het dienblad.',da:'Læg hele bestillingen på bakken.',sv:'Lägg hela beställningen på brickan.',no:'Legg hele bestillingen på brettet.',es:'Pon todo el pedido en la charola.',it:'Metti tutta l’ordinazione sul vassoio.',pt:'Coloque o pedido inteiro na bandeja.',fr:'Mets toute la commande sur le plateau.',fi:'Laita koko tilaus tarjottimelle.'},
    tJoin:        {en:'Join the plates into one sentence.',de:'Verbinde die Teller zu einem Satz.',nl:'Maak van de borden één zin.',da:'Sæt tallerkenerne sammen til én sætning.',sv:'Sätt ihop tallrikarna till en mening.',no:'Sett sammen tallerkenene til én setning.',es:'Une los platos en una sola oración.',it:'Unisci i piatti in una sola frase.',pt:'Junte os pratos em uma só frase.',fr:'Relie les assiettes en une seule phrase.',fi:'Yhdistä lautaset yhdeksi lauseeksi.'},
    tFix:         {en:'The robot made a mistake. Fix the order.',de:'Der Roboter hat einen Fehler gemacht. Verbessere die Bestellung.',nl:'De robot heeft een fout gemaakt. Verbeter de bestelling.',da:'Robotten har lavet en fejl. Ret bestillingen.',sv:'Roboten har gjort fel. Rätta beställningen.',no:'Roboten har gjort en feil. Rett bestillingen.',es:'El robot se equivocó. Arregla el pedido.',it:'Il robot ha sbagliato. Correggi l’ordinazione.',pt:'O robô errou. Conserte o pedido.',fr:'Le robot s’est trompé. Corrige la commande.',fi:'Robotti teki virheen. Korjaa tilaus.'},
    tMore:        {en:'One more thing! Add it to the sentence.',de:'Noch etwas! Füge es zum Satz hinzu.',nl:'Nog één ding! Zet het erbij in de zin.',da:'Én ting mere! Sæt den ind i sætningen.',sv:'En sak till! Lägg till den i meningen.',no:'Én ting til! Legg den til i setningen.',es:'¡Una cosa más! Agrégala a la oración.',it:'Ancora una cosa! Aggiungila alla frase.',pt:'Mais uma coisa! Coloque na frase.',fr:'Encore une chose ! Ajoute-la à la phrase.',fi:'Vielä yksi asia! Lisää se lauseeseen.'},
    check:        {en:'Check',de:'Prüfen',nl:'Controleren',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Revisar',it:'Controlla',pt:'Conferir',fr:'Vérifier',fi:'Tarkista'},
    hEmptyTray:   {en:'What did the customer order? Put it on the tray.',de:'Was hat der Gast bestellt? Leg es auf das Tablett.',nl:'Wat heeft de klant besteld? Zet het op het dienblad.',da:'Hvad har kunden bestilt? Læg det på bakken.',sv:'Vad har kunden beställt? Lägg det på brickan.',no:'Hva har kunden bestilt? Legg det på brettet.',es:'¿Qué pidió el cliente? Ponlo en la charola.',it:'Che cosa ha ordinato il cliente? Mettilo sul vassoio.',pt:'O que o cliente pediu? Coloque na bandeja.',fr:'Qu’a commandé le client ? Mets-le sur le plateau.',fi:'Mitä asiakas tilasi? Laita se tarjottimelle.'},
    hTray:        {en:'Look at the ticket: how many of each?',de:'Schau auf den Zettel: Wie viele von jedem?',nl:'Kijk op het bonnetje: hoeveel van elk?',da:'Se på sedlen: Hvor mange af hver?',sv:'Titta på lappen: hur många av varje?',no:'Se på lappen: Hvor mange av hver?',es:'Mira la nota: ¿cuántos de cada uno?',it:'Guarda il biglietto: quanti ne servono di ognuno?',pt:'Olhe a comanda: quantos de cada um?',fr:'Regarde le ticket : combien de chaque ?',fi:'Katso lappua: montako kutakin?'},
    hTray2:       {en:'The glowing bins show what to change.',de:'Die leuchtenden Kisten zeigen, was du ändern musst.',nl:'De bakken die oplichten laten zien wat er anders moet.',da:'Kasserne, der lyser, viser, hvad du skal ændre.',sv:'Lådorna som lyser visar vad du ska ändra.',no:'Kassene som lyser, viser hva du må endre.',es:'Las cajas que brillan muestran qué hay que cambiar.',it:'Le cassette che brillano mostrano che cosa cambiare.',pt:'As caixas que brilham mostram o que mudar.',fr:'Les bacs qui brillent montrent ce qu’il faut changer.',fi:'Hehkuvat laatikot näyttävät, mitä pitää muuttaa.'},
    hEmptyRail:   {en:'Join the plates to make one sentence.',de:'Verbinde die Teller zu einem Satz.',nl:'Maak van de borden één zin.',da:'Sæt tallerkenerne sammen til én sætning.',sv:'Sätt ihop tallrikarna till en mening.',no:'Sett sammen tallerkenene til én setning.',es:'Une los platos para formar una oración.',it:'Unisci i piatti per fare una frase.',pt:'Junte os pratos para formar uma frase.',fr:'Relie les assiettes pour faire une phrase.',fi:'Yhdistä lautaset yhdeksi lauseeksi.'},
    hEmptyRepair: {en:'Look at the ticket. Which plate is not what the customer asked for?',de:'Schau auf den Zettel. Welcher Teller passt nicht zur Bestellung?',nl:'Kijk op het bonnetje. Welk bord heeft de klant niet besteld?',da:'Se på sedlen. Hvilken tallerken har kunden ikke bestilt?',sv:'Titta på lappen. Vilken tallrik har kunden inte beställt?',no:'Se på lappen. Hvilken tallerken har kunden ikke bestilt?',es:'Mira la nota. ¿Qué plato no pidió el cliente?',it:'Guarda il biglietto. Quale piatto il cliente non ha ordinato?',pt:'Olhe a comanda. Qual prato o cliente não pediu?',fr:'Regarde le ticket. Quelle assiette le client n’a-t-il pas commandée ?',fi:'Katso lappua. Mikä lautanen ei ole sitä, mitä asiakas tilasi?'},
    hGap:         {en:'The plates won’t hold together. What joins them?',de:'Die Teller halten nicht zusammen. Was verbindet sie?',nl:'De borden blijven niet aan elkaar. Wat verbindt ze?',da:'Tallerkenerne vil ikke holde sammen. Hvad binder dem sammen?',sv:'Tallrikarna håller inte ihop. Vad binder ihop dem?',no:'Tallerkenene holder ikke sammen. Hva binder dem sammen?',es:'Los platos no se quedan juntos. ¿Qué los une?',it:'I piatti non stanno insieme. Che cosa li unisce?',pt:'Os pratos não ficam juntos. O que une os dois?',fr:'Les assiettes ne tiennent pas ensemble. Qu’est-ce qui les relie ?',fi:'Lautaset eivät pysy yhdessä. Mikä yhdistää ne?'},
    hEnd:         {en:'The sentence needs its end.',de:'Dem Satz fehlt das Ende.',nl:'De zin mist nog het einde.',da:'Sætningen mangler sin slutning.',sv:'Meningen behöver sitt slut.',no:'Setningen trenger slutten sin.',es:'A la oración le falta el final.',it:'Alla frase manca la fine.',pt:'Falta o final da frase.',fr:'Il manque la fin de la phrase.',fi:'Lauseesta puuttuu loppu.'},
    hWrongPlate:  {en:'Look at the ticket: one plate is not what the customer asked for.',de:'Schau auf den Zettel: Ein Teller passt nicht zur Bestellung.',nl:'Kijk op het bonnetje: één bord is niet wat de klant besteld heeft.',da:'Se på sedlen: Én tallerken er ikke det, kunden har bestilt.',sv:'Titta på lappen: en tallrik är inte det kunden beställde.',no:'Se på lappen: Én tallerken er ikke det kunden bestilte.',es:'Mira la nota: un plato no es lo que pidió el cliente.',it:'Guarda il biglietto: un piatto non è quello che il cliente ha ordinato.',pt:'Olhe a comanda: um prato não é o que o cliente pediu.',fr:'Regarde le ticket : une assiette n’est pas ce que le client a commandé.',fi:'Katso lappua: yksi lautanen ei ole sitä, mitä asiakas tilasi.'},
    hHole:        {en:'A plate is missing. Put the right one in.',de:'Ein Teller fehlt. Stell den richtigen hin.',nl:'Er mist een bord. Zet het goede erin.',da:'Der mangler en tallerken. Sæt den rigtige ind.',sv:'En tallrik fattas. Sätt dit den rätta.',no:'Det mangler en tallerken. Sett inn den riktige.',es:'Falta un plato. Pon el correcto.',it:'Manca un piatto. Metti quello giusto.',pt:'Está faltando um prato. Coloque o certo.',fr:'Il manque une assiette. Mets la bonne.',fi:'Yksi lautanen puuttuu. Laita oikea paikalleen.'},
    hExtendGap:   {en:'Three things! Join the last two as well.',de:'Drei Sachen! Verbinde auch die letzten zwei.',nl:'Drie dingen! Verbind de laatste twee ook.',da:'Tre ting! Sæt også de sidste to sammen.',sv:'Tre saker! Sätt ihop de två sista också.',no:'Tre ting! Sett sammen de to siste også.',es:'¡Tres cosas! Une también las dos últimas.',it:'Tre cose! Unisci anche le ultime due.',pt:'Três coisas! Junte também as duas últimas.',fr:'Trois choses ! Relie aussi les deux dernières.',fi:'Kolme asiaa! Yhdistä myös kaksi viimeistä.'},
    hMiss2:       {en:'Tap what is glowing.',de:'Tippe auf das, was leuchtet.',nl:'Tik op wat oplicht.',da:'Tryk på det, der lyser.',sv:'Tryck på det som lyser.',no:'Trykk på det som lyser.',es:'Toca lo que brilla.',it:'Tocca quello che brilla.',pt:'Toque no que está brilhando.',fr:'Touche ce qui brille.',fi:'Napauta sitä, mikä hehkuu.'},
    fOneSide:     {en:'An “and” needs a plate on both sides.',de:'Ein „und“ braucht auf beiden Seiten einen Teller.',nl:'Een ‘en’ heeft aan beide kanten een bord nodig.',da:'Et »og« skal have en tallerken på begge sider.',sv:'Ett ”och” behöver en tallrik på båda sidor.',no:'Et «og» trenger en tallerken på begge sider.',es:'Una «y» necesita un plato de cada lado.',it:'Una «e» ha bisogno di un piatto da tutte e due le parti.',pt:'Um “e” precisa de um prato dos dois lados.',fr:'Un « et » a besoin d’une assiette de chaque côté.',fi:'”Ja” tarvitsee lautasen kummallekin puolelleen.'},
    fNotEnd:      {en:'The end goes at the end of the sentence.',de:'Das Ende gehört ans Ende des Satzes.',nl:'Het einde hoort aan het eind van de zin.',da:'Slutningen skal stå sidst i sætningen.',sv:'Slutet ska stå sist i meningen.',no:'Slutten skal stå til slutt i setningen.',es:'El final va al final de la oración.',it:'La fine va alla fine della frase.',pt:'O final vai no fim da frase.',fr:'La fin va à la fin de la phrase.',fi:'Loppu tulee lauseen loppuun.'},
    fRepel:       {en:'The plates push apart. Something has to join them.',de:'Die Teller stoßen sich ab. Etwas muss sie verbinden.',nl:'De borden duwen elkaar weg. Iets moet ze verbinden.',da:'Tallerkenerne skubber hinanden væk. Noget skal binde dem sammen.',sv:'Tallrikarna knuffar bort varandra. Något måste binda ihop dem.',no:'Tallerkenene skyver hverandre bort. Noe må binde dem sammen.',es:'Los platos se separan. Algo tiene que unirlos.',it:'I piatti si respingono. Qualcosa deve unirli.',pt:'Os pratos se afastam. Alguma coisa tem que juntar os dois.',fr:'Les assiettes se repoussent. Il faut quelque chose pour les relier.',fi:'Lautaset työntävät toisiaan pois. Jonkin täytyy yhdistää ne.'},
    okTwo:        {en:'“{s}” One whole sentence. The customer is smiling!',de:'„{s}“ Ein ganzer Satz. Der Gast lächelt!',nl:'“{s}” Eén hele zin. De klant lacht!',da:'»{s}« En hel sætning. Kunden smiler!',sv:'”{s}” En hel mening. Kunden ler!',no:'«{s}» En hel setning. Kunden smiler!',es:'«{s}» Una oración completa. ¡El cliente sonríe!',it:'«{s}» Una frase intera. Il cliente sorride!',pt:'“{s}” Uma frase inteira. O cliente está sorrindo!',fr:'« {s} » Une phrase entière. Le client sourit !',fi:'”{s}” Kokonainen lause. Asiakas hymyilee!'},
    okThree:      {en:'“{s}” Three things in one sentence!',de:'„{s}“ Drei Sachen in einem Satz!',nl:'“{s}” Drie dingen in één zin!',da:'»{s}« Tre ting i én sætning!',sv:'”{s}” Tre saker i en mening!',no:'«{s}» Tre ting i én setning!',es:'«{s}» ¡Tres cosas en una oración!',it:'«{s}» Tre cose in una frase!',pt:'“{s}” Três coisas em uma frase!',fr:'« {s} » Trois choses dans une phrase !',fi:'”{s}” Kolme asiaa yhdessä lauseessa!'},
    setOrder:     {en:'Order',de:'Bestellung',nl:'Bestelling',da:'Bestilling',sv:'Beställning',no:'Bestilling',es:'Pedido',it:'Ordinazione',pt:'Pedido',fr:'Commande',fi:'Tilaus'},
    oShow:        {en:'Show the ticket',de:'Zettel zeigen',nl:'Bonnetje laten zien',da:'Vis sedlen',sv:'Visa lappen',no:'Vis lappen',es:'Ver la nota',it:'Mostra il biglietto',pt:'Mostrar a comanda',fr:'Montrer le ticket',fi:'Näytä lappu'},
    oListen:      {en:'Listen',de:'Zuhören',nl:'Luisteren',da:'Lyt',sv:'Lyssna',no:'Lytt',es:'Escuchar',it:'Ascolta',pt:'Ouvir',fr:'Écouter',fi:'Kuuntele'},
    setLevel:     {en:'Round types',de:'Runden',nl:'Soort rondes',da:'Slags runder',sv:'Typer av omgångar',no:'Typer runder',es:'Tipo de rondas',it:'Tipi di turno',pt:'Tipos de rodada',fr:'Types de manches',fi:'Kierrostyypit'},
    l1:           {en:'Gather and say',de:'Sammeln und sagen',nl:'Verzamelen en zeggen',da:'Saml og sig',sv:'Samla och säg',no:'Samle og si',es:'Junta y di',it:'Prepara e di’',pt:'Junte e fale',fr:'Rassembler et dire',fi:'Kerää ja sano'},
    l2:           {en:'Missing “and”',de:'Das fehlende „und“',nl:'De ontbrekende ‘en’',da:'Det manglende »og«',sv:'Det ”och” som saknas',no:'Det manglende «og»',es:'La «y» que falta',it:'La «e» che manca',pt:'O “e” que falta',fr:'Le « et » qui manque',fi:'Puuttuva ”ja”'},
    l3:           {en:'Fix the robot',de:'Den Fehler verbessern',nl:'Verbeter de robot',da:'Ret robotten',sv:'Rätta roboten',no:'Rett roboten',es:'Corrige al robot',it:'Correggi il robot',pt:'Corrija o robô',fr:'Corriger le robot',fi:'Korjaa robotin virhe'},
    l4:           {en:'One more thing',de:'Noch etwas',nl:'Nog één ding',da:'Én ting mere',sv:'En sak till',no:'Én ting til',es:'Una cosa más',it:'Ancora una cosa',pt:'Mais uma coisa',fr:'Encore une chose',fi:'Vielä yksi asia'},
    ariaCustomer: {en:'Customer',de:'Gast',nl:'Klant',da:'Kunde',sv:'Kund',no:'Kunde',es:'Cliente',it:'Cliente',pt:'Cliente',fr:'Client',fi:'Asiakas'},
    ariaTicket:   {en:'Ticket: {t}',de:'Zettel: {t}',nl:'Bonnetje: {t}',da:'Seddel: {t}',sv:'Lapp: {t}',no:'Lapp: {t}',es:'Nota: {t}',it:'Biglietto: {t}',pt:'Comanda: {t}',fr:'Ticket : {t}',fi:'Lappu: {t}'},
    ariaReopen:   {en:'Open the ticket again',de:'Zettel noch mal öffnen',nl:'Bonnetje weer openen',da:'Åbn sedlen igen',sv:'Öppna lappen igen',no:'Åpne lappen igjen',es:'Abrir la nota otra vez',it:'Riapri il biglietto',pt:'Abrir a comanda de novo',fr:'Rouvrir le ticket',fi:'Avaa lappu uudestaan'},
    ariaBin:      {en:'{f}: put one on the tray',de:'{f}: eins auf das Tablett legen',nl:'{f}: zet er een op het dienblad',da:'{f}: læg én på bakken',sv:'{f}: lägg en på brickan',no:'{f}: legg én på brettet',es:'{f}: pon uno en la charola',it:'{f}: mettine uno sul vassoio',pt:'{f}: colocar um na bandeja',fr:'{f} : en mettre un sur le plateau',fi:'{f}: laita yksi tarjottimelle'},
    ariaTrayItem: {en:'On the tray: {f}, {n}. Tap to take one back.',de:'Auf dem Tablett: {f}, {n}. Tippe, um eins zurückzulegen.',nl:'Op het dienblad: {f}, {n}. Tik om er een terug te zetten.',da:'På bakken: {f}, {n}. Tryk for at lægge én tilbage.',sv:'På brickan: {f}, {n}. Tryck för att lägga tillbaka en.',no:'På brettet: {f}, {n}. Trykk for å legge én tilbake.',es:'En la charola: {f}, {n}. Toca para regresar uno.',it:'Sul vassoio: {f}, {n}. Tocca per rimetterne uno a posto.',pt:'Na bandeja: {f}, {n}. Toque para devolver um.',fr:'Sur le plateau : {f}, {n}. Touche pour en remettre un.',fi:'Tarjottimella: {f}, {n}. Napauta, niin yksi palaa takaisin.'},
    ariaRail:     {en:'Sentence rail: {s}',de:'Satzschiene: {s}',nl:'Zinsrails: {s}',da:'Sætningsskinne: {s}',sv:'Meningsskena: {s}',no:'Setningsskinne: {s}',es:'Riel de la oración: {s}',it:'Binario della frase: {s}',pt:'Trilho da frase: {s}',fr:'Rail de la phrase : {s}',fi:'Lausekisko: {s}'},
    ariaPlate:    {en:'Plate: {p}',de:'Teller: {p}',nl:'Bord: {p}',da:'Tallerken: {p}',sv:'Tallrik: {p}',no:'Tallerken: {p}',es:'Plato: {p}',it:'Piatto: {p}',pt:'Prato: {p}',fr:'Assiette : {p}',fi:'Lautanen: {p}'},
    ariaAnd:      {en:'Golden “{a}”',de:'Goldenes „{a}“',nl:'Gouden ‘{a}’',da:'Gyldent »{a}«',sv:'Gyllene ”{a}”',no:'Gyllent «{a}»',es:'«{a}» dorada',it:'«{a}» d’oro',pt:'“{a}” dourado',fr:'« {a} » doré',fi:'Kultainen ”{a}”'},
    ariaAndIn:    {en:'“{a}” joins the plates. Tap to take it off.',de:'„{a}“ verbindet die Teller. Tippe, um es abzunehmen.',nl:'‘{a}’ verbindt de borden. Tik om het eraf te halen.',da:'»{a}« binder tallerkenerne sammen. Tryk for at tage det af.',sv:'”{a}” binder ihop tallrikarna. Tryck för att ta bort det.',no:'«{a}» binder sammen tallerkenene. Trykk for å ta det av.',es:'La «{a}» une los platos. Toca para quitarla.',it:'La «{a}» unisce i piatti. Tocca per toglierla.',pt:'O “{a}” junta os pratos. Toque para tirar.',fr:'Le « {a} » relie les assiettes. Touche pour l’enlever.',fi:'”{a}” yhdistää lautaset. Napauta, niin se irtoaa.'},
    ariaEnd:      {en:'End: {e}',de:'Ende: {e}',nl:'Einde: {e}',da:'Slutning: {e}',sv:'Slut: {e}',no:'Slutt: {e}',es:'Final: {e}',it:'Fine: {e}',pt:'Final: {e}',fr:'Fin : {e}',fi:'Loppu: {e}'},
    ariaEndIn:    {en:'End: {e}. Tap to take it off.',de:'Ende: {e}. Tippe, um es abzunehmen.',nl:'Einde: {e}. Tik om het eraf te halen.',da:'Slutning: {e}. Tryk for at tage den af.',sv:'Slut: {e}. Tryck för att ta bort det.',no:'Slutt: {e}. Trykk for å ta den av.',es:'Final: {e}. Toca para quitarlo.',it:'Fine: {e}. Tocca per toglierla.',pt:'Final: {e}. Toque para tirar.',fr:'Fin : {e}. Touche pour l’enlever.',fi:'Loppu: {e}. Napauta, niin se irtoaa.'},
    ariaGap:      {en:'Gap between the plates',de:'Lücke zwischen den Tellern',nl:'Gat tussen de borden',da:'Hul mellem tallerkenerne',sv:'Lucka mellan tallrikarna',no:'Mellomrom mellom tallerkenene',es:'Espacio entre los platos',it:'Spazio tra i piatti',pt:'Espaço entre os pratos',fr:'Espace entre les assiettes',fi:'Rako lautasten välissä'},
    ariaDock:     {en:'End of the sentence',de:'Ende des Satzes',nl:'Einde van de zin',da:'Sætningens slutning',sv:'Meningens slut',no:'Slutten på setningen',es:'Final de la oración',it:'Fine della frase',pt:'Final da frase',fr:'Fin de la phrase',fi:'Lauseen loppu'},
    ariaOpen:     {en:'Open end of the rail',de:'Offenes Ende der Schiene',nl:'Open einde van de rails',da:'Åben ende af skinnen',sv:'Öppen ände av skenan',no:'Åpen ende av skinnen',es:'Extremo abierto del riel',it:'Estremità aperta del binario',pt:'Ponta aberta do trilho',fr:'Bout ouvert du rail',fi:'Kiskon avoin pää'},
    ariaHatch:    {en:'Kitchen hatch, {s}',de:'Küchenklappe, {s}',nl:'Keukenluik, {s}',da:'Køkkenluge, {s}',sv:'Köksluckan, {s}',no:'Kjøkkenluke, {s}',es:'Ventanilla de la cocina, {s}',it:'Sportello della cucina, {s}',pt:'Janelinha da cozinha, {s}',fr:'Passe-plat de la cuisine, {s}',fi:'Keittiön luukku, {s}'},
    sOpen:        {en:'open',de:'offen',nl:'open',da:'åben',sv:'öppen',no:'åpen',es:'abierta',it:'aperto',pt:'aberta',fr:'ouvert',fi:'auki'},
    sShut:        {en:'closed',de:'zu',nl:'dicht',da:'lukket',sv:'stängd',no:'lukket',es:'cerrada',it:'chiuso',pt:'fechada',fr:'fermé',fi:'kiinni'},
    ariaSpare:    {en:'Plate on the counter: {p}',de:'Teller auf der Theke: {p}',nl:'Bord op de toonbank: {p}',da:'Tallerken på disken: {p}',sv:'Tallrik på disken: {p}',no:'Tallerken på disken: {p}',es:'Plato en el mostrador: {p}',it:'Piatto sul bancone: {p}',pt:'Prato no balcão: {p}',fr:'Assiette sur le comptoir : {p}',fi:'Lautanen tiskillä: {p}'},
    ariaHole:     {en:'Empty place on the rail',de:'Leerer Platz auf der Schiene',nl:'Lege plek op de rails',da:'Tom plads på skinnen',sv:'Tom plats på skenan',no:'Tom plass på skinnen',es:'Lugar vacío en el riel',it:'Posto vuoto sul binario',pt:'Lugar vazio no trilho',fr:'Place vide sur le rail',fi:'Tyhjä paikka kiskolla'}
  },/*STRINGS-END*/

  defaults: { level: 'l1', order: 'show' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: 'l1', labelKey: 'l1' }, { value: 'l2', labelKey: 'l2' }, { value: 'l3', labelKey: 'l3' }, { value: 'l4', labelKey: 'l4' }] },
    { key: 'order', type: 'choice', labelKey: 'setOrder', options: [{ value: 'show', labelKey: 'oShow' }, { value: 'listen', labelKey: 'oListen' }] }
  ],

  OK_MS: 500, FAST: false, FOLD_MS: 5000,

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._view = {}; this._pics = {}; this._shut = false; this._reopens = 0;
    injectMagnetCSS();
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this.st && this.st.order !== this._orderMode()) { if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return MagnetPlatesCore.locale(((this.api && this.api.lang) || 'en')); },
  _level: function () { return MagnetPlatesCore.levelOf(this._setting('level')); },
  _orderMode: function () { return MagnetPlatesCore.orderOf(this._setting('order')); },
  _key: function () { return this._level(); },

  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = MagnetPlatesCore.ids(this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = MagnetPlatesCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      var prev = fresh ? null : this._order.slice();
      this._order = C.plan(this._level(), Math.random, prev); this._orderForPool = pool;
      this._pass = pass;
    }
    var idx = this._order[pos], r = C.round(this._level(), idx);
    var pa = { msg: this._taskLine(C.newState(r)) }; this._pa = pa;
    return {
      id: 'plates.' + this._loc() + '.' + r.id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(idx); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function (st) {
    if (st.phase === 'tray') return this._t('tTray');
    if (st.r.type === 'repair') return this._t('tFix');
    if (st.extended) return this._t('tMore');
    return this._t('tJoin');
  },
  _setTask: function () {
    var line = this._taskLine(this.st);
    if (this._pa) this._pa.msg = line;
    var el = document.querySelector('.lcs-activity-prompt-text'); if (el) el.textContent = line;
  },
  _start: function (idx) {
    var C = MagnetPlatesCore, r = C.round(this._level(), idx);
    this._clearTimers(); this._busy = false; this._view = {}; this._shut = false; this._reopens = 0;
    this.st = C.newState(r, this._orderMode());
    this._setTask();
    this._loadPics();
    if (this.st.order === 'listen') this._listen();
  },
  /* Listen mode: the order is read (where the voice works) and the ticket folds after a while; one free re-open */
  _listen: function () {
    var self = this, C = MagnetPlatesCore, st = this.st, hasVoice = typeof LCSAudio !== 'undefined' && LCSAudio.speak;
    if (hasVoice) { try { LCSAudio.speak({ type: 'word', text: C.say(this._loc(), st.r.ticket), lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { if (self.st === st && !st.done) { self._shut = true; if (self._wrap) self._paint(); } }, this.FOLD_MS + (hasVoice ? 0 : 2000));
  },
  _reopen: function () {
    var self = this, st = this.st;
    if (!this._shut || (this._reopens >= 1 && st.help < 2)) return;
    this._reopens++; this._shut = false; this._paint();
    this._later(function () { if (self.st === st && !st.done) { self._shut = true; if (self._wrap) self._paint(); } }, this.FOLD_MS);
  },
  _loadPics: function () {
    var self = this, dirs = {}, C = MagnetPlatesCore;
    Object.keys(C.DATA.FOOD_PIC).forEach(function (k) { dirs[C.DATA.FOOD_PIC[k].split('/')[0]] = 1; });
    Object.keys(C.DATA.CUSTOMER_PIC).forEach(function (k) { dirs[C.DATA.CUSTOMER_PIC[k].split('/')[0]] = 1; });
    Object.keys(dirs).forEach(function (dir) {
      if (self._pics[dir] || typeof LCSPictures === 'undefined') return;
      LCSPictures.load(dir).then(function (th) { self._pics[dir] = th; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {});
    });
  },
  /* a library picture by its 'theme/key' path, or null while its theme loads */
  _pic: function (path, size) {
    var i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)], key = path.slice(i + 1);
    if (!th || !th.nouns[key]) return null;
    var im = LCSPictures.img(th, key, this._loc(), { size: size }); im.className = 'mp-pic'; im.style.width = size + 'px'; im.style.height = size + 'px';
    return im;
  },
  _foodName: function (food) {
    var path = MagnetPlatesCore.DATA.FOOD_PIC[food], i = path.lastIndexOf('/'), th = this._pics[path.slice(0, i)];
    if (!th) return food;
    var w = LCSPictures.label(th, path.slice(i + 1), this._loc());
    return this._loc() === 'de' ? w : w.toLocaleLowerCase(this._loc());
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var C = MagnetPlatesCore; this.st = C.newState(C.round(this._level(), 0), this._orderMode()); this._loadPics(); }
    this._render2();
    this._watchWidth();
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'mp-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="mp-booth"><div class="mp-cust"></div><div class="mp-ticket"></div><div class="mp-hookslot"></div></div><div class="mp-work"></div><p class="mp-note" aria-live="polite"></p><div class="mp-row"><button type="button" class="mp-check" data-k="check"></button></div>';
    this._q = function (s) { return wrap.querySelector(s); };
    this._q('.mp-check').addEventListener('click', function () { self._check(); });
    this._q('.mp-ticket').addEventListener('click', function () { self._reopen(); });
    wrap.addEventListener('keydown', function (ev) {
      if (ev.target && ev.target.tagName === 'BUTTON' && (ev.key === 'Enter' || ev.key === ' ')) return;
      if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); self._check(); }
      else if (ev.key === 'Escape' && self.st.lift) { ev.preventDefault(); self.st.lift = null; self._paint(); }
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
    var C = MagnetPlatesCore, st = this.st, L = this._L = C.layout(this._width()), v = this._view;
    this._wrap.className = 'mp-wrap is-' + L.mode + (L.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + st.phase + ' is-' + st.r.type;
    this._wrap.style.setProperty('--mp-pic', L.pic + 'px');
    this._wrap.style.setProperty('--mp-cust', L.cust + 'px');
    this._wrap.style.setProperty('--mp-bin', L.bin + 'px');
    this._paintBooth();
    var work = this._q('.mp-work'); work.innerHTML = ''; this._q('.mp-hookslot').innerHTML = '';
    if (st.phase === 'tray') this._paintTray(work); else this._paintRail(work);
    var h = C.hint(st), msg = '';
    if (v.msg) msg = v.msg; else if (v.flash) msg = this._t(v.flash); else if (h) msg = this._t(h);
    var note = this._q('.mp-note'); note.textContent = msg;
    note.className = 'mp-note' + (st.done ? ' is-ok' : (h && h !== 'hEmptyTray' && h !== 'hEmptyRail' && h !== 'hEmptyRepair' && h !== 'tMore') || v.flash ? ' is-hint' : '');
    var chk = this._q('.mp-check'); chk.textContent = this._t('check'); chk.disabled = !!this._busy || st.done;
  },
  /* the booth: the customer (a library picture) and the ticket — the order as numerals + pictures, a drink as its picture alone */
  _paintBooth: function () {
    var C = MagnetPlatesCore, st = this.st, r = st.r, L = this._L, self = this;
    var cust = this._q('.mp-cust'); cust.innerHTML = ''; cust.className = 'mp-cust' + (st.done ? ' is-bob' : '');
    cust.setAttribute('role', 'img'); cust.setAttribute('aria-label', this._t('ariaCustomer'));
    var ci = this._pic(C.DATA.CUSTOMER_PIC[r.customer], L.cust); if (ci) { ci.alt = ''; cust.appendChild(ci); }
    var tk = this._q('.mp-ticket'), lines = r.ticket.concat(st.extended ? [r.extra] : []), diff = st.last && st.last.reason === 'tray' ? st.last.diff : [];
    tk.innerHTML = '';
    var shut = this._shut && !st.done;
    tk.className = 'mp-ticket' + (shut ? ' is-shut' : '') + (st.order === 'listen' ? ' is-listen' : '') + (st.done ? ' is-stamped' : '');
    tk.setAttribute('role', shut ? 'button' : 'img'); if (shut) { tk.setAttribute('tabindex', '0'); tk.setAttribute('aria-label', this._t('ariaReopen')); tk.setAttribute('data-k', 'ticket'); }
    else { tk.removeAttribute('tabindex'); tk.removeAttribute('data-k'); tk.setAttribute('aria-label', this._t('ariaTicket', { t: lines.map(function (p) { return C.phrase(self._loc(), p); }).join(', ') })); }
    tk.onkeydown = shut ? function (ev) { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); self._reopen(); } } : null;
    if (st.order === 'listen') tk.appendChild(earIcon());
    if (shut) { var fold = this.api.el('span', 'mp-fold'); tk.appendChild(fold); return; }
    lines.forEach(function (p, i) {
      var line = self.api.el('span', 'mp-tline' + (diff.indexOf(p.food) >= 0 ? ' is-blink' : '') + (st.extended && i === lines.length - 1 && self._view.more ? ' is-new' : ''));
      if (!C.isDrink(p.food)) { var n = self.api.el('b', 'mp-tnum'); n.textContent = String(p.qty); line.appendChild(n); }
      var im = self._pic(C.DATA.FOOD_PIC[p.food], L.pic); if (im) { im.alt = ''; line.appendChild(im); }
      tk.appendChild(line);
    });
    if (st.done) { var s = this.api.el('span', 'mp-stamp'); s.textContent = '✓'; tk.appendChild(s); }
  },
  /* phase 1: four bins on the counter, the tray beside them; the tray keeps each food as ONE picture with a dot per item */
  _paintTray: function (work) {
    var C = MagnetPlatesCore, st = this.st, r = st.r, L = this._L, self = this, hp = C.help(st), diff = st.last && st.last.reason === 'tray' ? st.last.diff : [];
    var bins = this.api.el('div', 'mp-bins');
    r.bins.forEach(function (food) {
      var b = self.api.el('button', 'mp-bin' + (hp && hp.bins && hp.bins.indexOf(food) >= 0 ? ' is-help' : '')); b.type = 'button'; b.setAttribute('data-k', 'bin-' + food); b.setAttribute('data-food', food);
      b.setAttribute('aria-label', self._t('ariaBin', { f: self._foodName(food) }));
      var im = self._pic(C.DATA.FOOD_PIC[food], L.pic); if (im) { im.alt = ''; b.appendChild(im); }
      b.disabled = st.done || (st.tray[food] || 0) >= C.MAXQ;
      b.addEventListener('click', function () { self._add(food); });
      bins.appendChild(b);
    });
    work.appendChild(bins);
    var tray = this.api.el('div', 'mp-tray' + (Object.keys(st.tray).length ? '' : ' is-empty'));
    r.bins.forEach(function (food) {
      var n = st.tray[food] || 0; if (!n) return;
      var g = self.api.el('button', 'mp-group' + (diff.indexOf(food) >= 0 ? ' is-blink' : '') + (self._view.added === food ? ' is-plop' : '')); g.type = 'button'; g.setAttribute('data-k', 'tray-' + food); g.setAttribute('data-n', String(n));
      g.setAttribute('aria-label', self._t('ariaTrayItem', { f: self._foodName(food), n: n }));
      var im = self._pic(C.DATA.FOOD_PIC[food], L.pic); if (im) { im.alt = ''; g.appendChild(im); }
      var dots = self.api.el('span', 'mp-dots'); for (var i = 0; i < n; i++) dots.appendChild(self.api.el('span', 'mp-dot')); g.appendChild(dots);
      g.addEventListener('click', function () { self._takeBack(food); });
      tray.appendChild(g);
    });
    work.appendChild(tray);
  },
  /* phase 2: the hook with the golden "and"s and the end cap, the rail (beginning cap, plates, gaps, the dock, the hatch), the robot's counter */
  _paintRail: function (work) {
    var C = MagnetPlatesCore, st = this.st, r = st.r, L = this._L, self = this, loc = this._loc(), W = C.words(loc), v = this._view;
    var hp = C.help(st), R = st.last && st.last.reason, miss1 = st.help >= 1 && !st.done;
    var glowPlace = function (place) { return (hp && hp.place === place) || (miss1 && ((R === 'gap' && place === 'joint:' + st.joints.indexOf(null)) || (R === 'extendGap' && place === 'joint:' + (st.joints.length - 1)) || (R === 'end' && place === 'dock'))); };
    /* the hook */
    var hook = this.api.el('div', 'mp-hook'), nAnd = C.hookAnds(st);
    hook.appendChild(this.api.el('span', 'mp-hookbar'));
    for (var k = 0; k < nAnd; k++) {
      var a = this.api.el('button', 'mp-and' + (st.lift === 'and' && k === 0 ? ' is-lift' : '') + (hp && hp.piece === 'and' && k === 0 ? ' is-help' : '')); a.type = 'button'; a.setAttribute('data-k', 'hook-and-' + k);
      a.textContent = W.and; a.setAttribute('aria-label', this._t('ariaAnd', { a: W.and })); a.setAttribute('aria-pressed', st.lift === 'and' && k === 0 ? 'true' : 'false');
      a.disabled = st.done;
      a.addEventListener('click', function () { self._lift('and'); });
      hook.appendChild(a);
    }
    if (!st.end && !st.done) {
      var e = this.api.el('button', 'mp-endcap' + (st.lift === 'end' ? ' is-lift' : '') + (hp && hp.piece === 'end' ? ' is-help' : '')); e.type = 'button'; e.setAttribute('data-k', 'hook-end');
      e.textContent = W.end; e.setAttribute('aria-label', this._t('ariaEnd', { e: W.end })); e.setAttribute('aria-pressed', st.lift === 'end' ? 'true' : 'false');
      e.addEventListener('click', function () { self._lift('end'); });
      hook.appendChild(e);
    }
    if (nAnd || (!st.end && !st.done)) this._q('.mp-hookslot').appendChild(hook);   /* the hook hangs beside the ticket */
    /* the rail */
    var said = st.done ? C.sentence(loc, st) : null;
    if (said) {
      var strip = this.api.el('p', 'mp-said');
      said.split(' ').forEach(function (w, i) { var s = self.api.el('span', 'mp-w'); s.textContent = w; s.style.animationDelay = (self.FAST ? 0 : i * 280) + 'ms'; strip.appendChild(s); strip.appendChild(document.createTextNode(' ')); });
      work.appendChild(strip);
    }
    var rail = this.api.el('div', 'mp-rail' + (st.done ? ' is-whole' : ''));
    rail.setAttribute('role', 'group'); rail.setAttribute('aria-label', this._t('ariaRail', { s: this._railText() }));
    var startCap = this.api.el('span', 'mp-start'); startCap.textContent = W.start; rail.appendChild(startCap);
    if (st.lift === 'and') rail.appendChild(this._target('mp-open', 'open-start', this._t('ariaOpen'), function () { self._drop('open:start'); }));
    st.plates.forEach(function (p, i) {
      if (!p) {
        var hole = self._target('mp-hole' + (glowPlace('plate:' + i) || (miss1 && R === 'hole') ? ' is-glow' : ''), 'hole-' + i, self._t('ariaHole'), function () {});
        rail.appendChild(hole);
      } else {
        var bad = (hp && hp.plate === i) || (miss1 && R === 'wrongPlate' && firstBad(st) === i);
        var pl = self._plate(p, 'plate-' + i, 'mp-plate' + (bad ? ' is-bad' : '') + (v.repel === i ? (v.dir > 0 ? ' is-repel' : ' is-repelL') : '') + (v.repel !== undefined && v.repel + v.dir === i ? (v.dir > 0 ? ' is-pushed' : ' is-pushedL') : '') + (st.extended && i === st.plates.length - 1 && v.more ? ' is-drop' : ''));
        pl.addEventListener('click', function () { self._tapPlate(i); });
        rail.appendChild(pl);
      }
      if (i < st.joints.length) {
        if (st.joints[i] === 'and') {
          var lab = C.jointLabel(loc, st, i);
          var j = self.api.el('button', 'mp-and is-in' + (lab === ',' ? ' is-comma' : '') + (v.snap === i ? ' is-snap' : '') + (v.comma && lab === ',' ? ' is-shrink' : '')); j.type = 'button'; j.setAttribute('data-k', 'joint-' + i);
          j.textContent = lab; j.setAttribute('aria-label', self._t('ariaAndIn', { a: lab === ',' ? ',' : W.and }));
          j.disabled = st.done || r.type === 'repair';
          j.addEventListener('click', function () { self._unjoin(i); });
          rail.appendChild(j);
        } else {
          rail.appendChild(self._target('mp-gap' + (st.lift ? ' is-target' : '') + (glowPlace('joint:' + i) ? ' is-glow' : ''), 'gap-' + i, self._t('ariaGap'), function () { self._tapGap(i); }));
        }
      }
    });
    if (st.end) {
      var ec = this.api.el('button', 'mp-endcap is-in'); ec.type = 'button'; ec.setAttribute('data-k', 'dock'); ec.textContent = W.end; ec.setAttribute('aria-label', this._t('ariaEndIn', { e: W.end }));
      ec.disabled = st.done || r.type === 'repair';
      ec.addEventListener('click', function () { self._undock(); });
      rail.appendChild(ec);
    } else {
      rail.appendChild(this._target('mp-dock' + (st.lift ? ' is-target' : '') + (glowPlace('dock') ? ' is-glow' : ''), 'dock', this._t('ariaDock'), function () { self._drop('dock'); }));
    }
    var hatch = this.api.el('span', 'mp-hatch' + (st.done ? ' is-open' : '') + (v.rattle ? ' is-rattle' : ''));
    hatch.setAttribute('role', 'img'); hatch.setAttribute('aria-label', this._t('ariaHatch', { s: this._t(st.done ? 'sOpen' : 'sShut') }));
    hatch.innerHTML = '<svg viewBox="0 0 48 64" aria-hidden="true"><rect x="2" y="2" width="44" height="60" rx="6" fill="#5B4636"/><rect x="7" y="8" width="34" height="50" rx="3" fill="#FFF4DE"/><g class="mp-shutter"><rect x="7" y="8" width="34" height="50" rx="3" fill="#C9A34A"/><path d="M7 16h34M7 24h34M7 32h34M7 40h34M7 48h34" stroke="#8C6A26" stroke-width="2"/></g></svg>';
    rail.appendChild(hatch);
    work.appendChild(rail);
    /* the robot's counter: plates that can go into the empty place */
    if (r.type === 'repair' && st.plates.indexOf(null) >= 0 && !st.done) {   /* the counter opens when a plate has gone back to it */
      var counter = this.api.el('div', 'mp-counter');
      st.spares.forEach(function (p, k) {
        var sp = self._plate(p, 'spare-' + k, 'mp-plate is-spare' + (hp && hp.spare === k ? ' is-help' : ''));
        sp.setAttribute('aria-label', self._t('ariaSpare', { p: C.phrase(loc, p) }));
        sp.disabled = st.plates.indexOf(null) < 0;
        sp.addEventListener('click', function () { self._putOn(k); });
        counter.appendChild(sp);
      });
      work.appendChild(counter);
    }
  },
  _plate: function (p, dk, cls) {
    var C = MagnetPlatesCore, b = this.api.el('button', cls); b.type = 'button'; b.setAttribute('data-k', dk);
    b.setAttribute('data-food', p.food); b.setAttribute('data-qty', String(p.qty));
    var disc = this.api.el('span', 'mp-disc'), im = this._pic(C.DATA.FOOD_PIC[p.food], this._L.pic); if (im) { im.alt = ''; disc.appendChild(im); }
    b.appendChild(disc);
    var ph = this.api.el('span', 'mp-phrase'); ph.textContent = C.phrase(this._loc(), p); b.appendChild(ph);
    b.setAttribute('aria-label', this._t('ariaPlate', { p: ph.textContent }));
    b.disabled = this.st.done;
    return b;
  },
  _target: function (cls, dk, aria, fn) {
    var b = this.api.el('button', cls); b.type = 'button'; b.setAttribute('data-k', dk); b.setAttribute('aria-label', aria);
    b.disabled = this.st.done; b.addEventListener('click', fn); return b;
  },
  _railText: function () {
    var C = MagnetPlatesCore, st = this.st, loc = this._loc(), W = C.words(loc), out = [W.start];
    st.plates.forEach(function (p, i) { out.push(p ? C.phrase(loc, p) : '…'); if (i < st.joints.length) out.push(st.joints[i] === 'and' ? C.jointLabel(loc, st, i) : '…'); });
    out.push(st.end ? W.end : '…');
    return out.join(' ');
  },

  /* ---------------- the hand ---------------- */
  _add: function (food) { if (this._busy) return; if (!MagnetPlatesCore.addToTray(this.st, food)) return; this._view = { added: food }; this.api.sound(520 + (this.st.tray[food] || 0) * 70); this._paint(); },
  _takeBack: function (food) { if (this._busy) return; if (!MagnetPlatesCore.removeFromTray(this.st, food)) return; this._view = {}; this.api.sound(380); this._paint(); },
  _lift: function (what) { if (this._busy) return; if (!MagnetPlatesCore.lift(this.st, what)) return; this._view = {}; this.api.sound(this.st.lift ? 700 : 400); this._paint(); },
  _drop: function (where) {
    if (this._busy || !this.st.lift) return;
    var C = MagnetPlatesCore, before = C.jointLabel(this._loc(), this.st, 0), res = C.dropAt(this.st, where);
    if (res.held) {
      var m = /^joint:(\d+)$/.exec(where), comma = before !== ',' && this.st.joints.length > 1 && C.jointLabel(this._loc(), this.st, 0) === ',';
      this._view = { snap: m ? +m[1] : -1, comma: comma };
      this.api.sound(880); this._later(function () {}, 0);
    } else { this._view = { flash: res.reason === 'oneSide' ? 'fOneSide' : 'fNotEnd' }; this.api.sound(200); }
    this._paint();
  },
  _tapGap: function (i) {
    if (this.st.lift) { this._drop('joint:' + i); return; }
    this._tapPlate(i);
  },
  /* tap a plate: on the robot's rail it goes back to the counter; anywhere else it is pushed toward its neighbour and springs away unless joined */
  _tapPlate: function (i) {
    if (this._busy) return;
    var C = MagnetPlatesCore, st = this.st;
    if (st.lift) { this._drop(i < st.joints.length ? 'joint:' + i : 'dock'); return; }
    if (st.r.type === 'repair') { if (C.takeOff(st, i)) { this._view = {}; this.api.sound(360); this._paint(); } return; }
    var n = C.nudge(st, i); if (!n) return;
    if (n === 'repel') { var dir = i < st.joints.length && st.joints[i] === null ? 1 : -1; this._view = { repel: i, dir: dir, flash: 'fRepel' }; this.api.sound(170); }   /* pushed toward the open gap: the neighbour springs away */
    else { this._view = {}; this.api.sound(620); }
    this._paint();
  },
  _unjoin: function (i) { if (this._busy) return; if (MagnetPlatesCore.unjoin(this.st, i)) { this._view = {}; this.api.sound(300); this._paint(); } },
  _undock: function () { if (this._busy) return; if (MagnetPlatesCore.undock(this.st)) { this._view = {}; this.api.sound(300); this._paint(); } },
  _putOn: function (k) { if (this._busy) return; if (MagnetPlatesCore.putOn(this.st, k)) { this._view = {}; this.api.sound(660); this._paint(); } },
  _check: function () {
    if (this._busy || this.st.done) return;
    var C = MagnetPlatesCore, st = this.st, res = C.check(st), self = this;
    this._view = {};
    if (res.step === 'rail') { this.api.sound(780); this._setTask(); this._paint(); return; }
    if (res.step === 'more') { this._view = { more: true }; this.api.sound(990); this._setTask(); this._paint(); this.api.announce(this._t('tMore')); return; }
    if (!res.ok) {
      var empty = /^empty/.test(res.reason);
      if (!empty && st.phase === 'rail') this._view.rattle = true;
      var hp = C.help(st); if (hp && hp.piece) C.lift(st, hp.piece);          /* miss 2: the needed piece lifts off its hook, waiting over its glowing place */
      this.api.sound(empty ? 460 : 220); this._paint(); this.api.announce(this._q('.mp-note').textContent || ''); return;
    }
    var s = C.sentence(this._loc(), st), msg = this._t(st.plates.length > 2 ? 'okThree' : 'okTwo', { s: s });
    if (this._pa) this._pa.msg = msg; this._view = { msg: msg };
    this.api.sound(1046); this._later(function () { self.api.sound(1318); }, this._ms(140));
    this._paint(); this.api.announce(msg);
    if (typeof LCSAudio !== 'undefined' && LCSAudio.speak) { try { LCSAudio.speak({ type: 'word', text: s, lang: this.api.lang, rate: 0.9 }); } catch (e) {} }
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function firstBad(st) { var w = st.r.ticket.concat(st.extended ? [st.r.extra] : []); for (var i = 0; i < st.plates.length; i++) if (st.plates[i] && !MagnetPlatesCore.same(st.plates[i], w[i])) return i; return -1; }
function earIcon() { var s = document.createElement('span'); s.className = 'mp-ear'; s.setAttribute('aria-hidden', 'true'); s.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5 2" fill="none" stroke="#146B5E" stroke-width="2.4" stroke-linecap="round"/><path d="M11 10a2 2 0 0 1 4 0c0 1.5-1.5 2-1.5 3" fill="none" stroke="#146B5E" stroke-width="2" stroke-linecap="round"/></svg>'; return s; }

var mpCssDone = false;
function injectMagnetCSS() {
  if (mpCssDone || typeof document === 'undefined') return;
  mpCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.mp-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;user-select:none;-webkit-user-select:none;}'
  + '.mp-wrap:focus{outline:none;}'
  + '.mp-pic{display:block;object-fit:contain;pointer-events:none;}'
  /* the booth */
  + '.mp-booth{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;}'
  + '.mp-cust{flex:0 0 auto;position:relative;}'
  + '.mp-cust.is-bob{animation:mpBob .5s ease-in-out 3;} @keyframes mpBob{50%{transform:translateY(-8px);}}'
  + '.mp-ticket{position:relative;display:flex;align-items:center;gap:10px;min-height:calc(var(--mp-pic) + 16px);padding:8px 14px 8px 12px;border-radius:6px;background:#FFFEFB;box-shadow:0 2px 0 #E2D6BE,inset 0 0 0 1.5px #E2D6BE;transform:rotate(-1.5deg);}'
  + '.mp-ticket::before{content:"";position:absolute;top:-8px;left:50%;width:30px;height:14px;margin-left:-15px;border-radius:4px;background:#C9A34A;box-shadow:inset 0 0 0 2px #8C6A26;}'
  + '.mp-tline{display:inline-flex;align-items:center;gap:2px;border-radius:10px;padding:0 4px;} .mp-tline.is-blink{animation:mpBlink .6s ease-in-out 3;box-shadow:0 0 0 3px #F2784B;} @keyframes mpBlink{50%{background:#FDE7DC;}}'
  + '.mp-tline.is-new{animation:mpNew .45s ease-out;} @keyframes mpNew{from{transform:translateY(-14px);opacity:0;}}'
  + '.mp-tnum{font-family:' + H + ';font-weight:800;font-size:40px;line-height:1;color:#146B5E;min-width:26px;text-align:center;}'
  + '.mp-ticket.is-shut{min-width:120px;cursor:pointer;background:#F6EFE6;} .mp-fold{display:block;width:96px;height:48px;background:linear-gradient(135deg,#FFFEFB 49%,#E2D6BE 50%,#F6EFE6 51%);border-radius:4px;}'
  + '.mp-ear{position:absolute;right:-8px;top:-8px;width:28px;height:28px;border-radius:50%;background:#FFFEFB;box-shadow:0 0 0 2px #146B5E;display:flex;align-items:center;justify-content:center;} .mp-ear svg{width:20px;height:20px;}'
  + '.mp-stamp{position:absolute;right:4px;bottom:0;font-size:24px;color:#2FA56A;font-weight:900;transform:rotate(-14deg);animation:mpStamp .3s ease-out;} @keyframes mpStamp{from{transform:scale(2) rotate(-14deg);opacity:0;}}'
  + '.mp-work{display:flex;flex-direction:column;align-items:center;gap:12px;width:100%;}'
  /* the counter and the tray */
  + '.mp-bins{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;}'
  + '.mp-bin{width:var(--mp-bin);height:var(--mp-bin);padding:0;border:0;border-radius:14px;background:#E8D2A8;box-shadow:inset 0 0 0 2.5px #B9965C,0 4px 0 #9C7B45;display:flex;align-items:center;justify-content:center;cursor:pointer;}'
  + '.mp-bin:disabled{opacity:.5;cursor:default;} .mp-bin.is-help{box-shadow:inset 0 0 0 2.5px #B9965C,0 0 0 4px #2FA56A,0 4px 0 #9C7B45;transform:translateY(-4px);}'
  + '.mp-tray{display:flex;justify-content:center;align-items:flex-end;gap:12px;flex-wrap:wrap;min-width:min(100%,420px);min-height:calc(var(--mp-pic) + 34px);padding:10px 16px 12px;border-radius:30px;background:#DCE8E4;box-shadow:inset 0 0 0 3px #146B5E,0 4px 0 #9CC9BE;box-sizing:border-box;}'
  + '.mp-tray.is-empty{background:repeating-linear-gradient(135deg,#DCE8E4 0 12px,#E6EFEC 12px 24px);}'
  + '.mp-group{display:flex;flex-direction:column;align-items:center;gap:4px;padding:2px 4px;border:0;border-radius:12px;background:transparent;cursor:pointer;} .mp-group.is-blink{animation:mpBlink .6s ease-in-out 3;box-shadow:0 0 0 3px #F2784B;}'
  + '.mp-group.is-plop .mp-pic{animation:mpPlop .22s ease-out;} @keyframes mpPlop{from{transform:translateY(-20px) scale(.8);}}'
  + '.mp-dots{display:flex;gap:5px;} .mp-dot{width:14px;height:14px;border-radius:50%;background:#F2784B;box-shadow:inset 0 0 0 2px #B5461F;}'
  /* the hook */
  + '.mp-hookslot:empty{display:none;} .mp-hook{position:relative;display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:10px;padding:14px 10px 4px;min-height:52px;}'
  + '.mp-hookbar{position:absolute;left:8px;right:8px;top:4px;height:6px;border-radius:3px;background:#C9A34A;box-shadow:inset 0 -2px 0 #8C6A26;}'
  /* the rail */
  + '.mp-rail{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;row-gap:14px;column-gap:0;max-width:100%;padding:4px 0 8px;}'
  + '.mp-rail > *{position:relative;margin-bottom:8px;} .mp-rail > *::after{content:"";position:absolute;left:-4px;right:-4px;bottom:-12px;height:6px;border-radius:3px;background:#C9A34A;box-shadow:inset 0 -2px 0 #8C6A26;pointer-events:none;}'
  + '.mp-start,.mp-endcap{display:inline-flex;align-items:center;justify-content:center;min-height:60px;min-width:var(--mp-capw,88px);padding:0 14px;border:0;border-radius:16px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.15;text-align:center;box-sizing:border-box;}'
  + '.mp-start{border-radius:20px 8px 8px 20px;margin-right:6px;} .mp-endcap{cursor:pointer;border-radius:8px 20px 20px 8px;box-shadow:0 4px 0 #0C4A41;} .mp-endcap.is-in{margin-left:6px;} .mp-endcap:disabled{cursor:default;opacity:1;}'
  + '.mp-plate{display:flex;flex-direction:column;align-items:center;gap:4px;width:var(--mp-platew,150px);padding:6px 6px 8px;border:0;border-radius:18px;background:#FFFEFB;box-shadow:inset 0 0 0 2.5px #146B5E,0 4px 0 #9CC9BE;cursor:pointer;box-sizing:border-box;transition:transform .16s ease-out;}'
  + '.mp-disc{display:flex;align-items:center;justify-content:center;border-radius:50%;background:radial-gradient(circle,#FFFFFF 58%,#E6F4EF 60%,#E6F4EF 70%,#9CC9BE 71%);padding:2px;}'
  + '.mp-phrase{font-family:' + B + ';font-weight:800;font-size:18px;line-height:1.2;color:#2A2A35;text-align:center;}'
  + '.mp-plate:disabled{cursor:default;} .mp-plate.is-bad{box-shadow:inset 0 0 0 3px #E0A030,0 0 0 4px rgba(224,160,48,.45),0 4px 0 #9CC9BE;}'
  + '.mp-plate.is-repel{animation:mpRepel .42s cubic-bezier(.3,1.8,.5,1);} @keyframes mpRepel{30%{transform:translateX(16px);}60%{transform:translateX(-6px);}}'
  + '.mp-plate.is-repelL{animation:mpRepelL .42s cubic-bezier(.3,1.8,.5,1);} @keyframes mpRepelL{30%{transform:translateX(-16px);}60%{transform:translateX(6px);}}' + '.mp-plate.is-pushed{animation:mpPushed .42s ease-out;} @keyframes mpPushed{30%{transform:translateX(12px) rotate(3deg);}70%{transform:translateX(-3px);}}'
  + '.mp-plate.is-pushedL{animation:mpPushedL .42s ease-out;} @keyframes mpPushedL{30%{transform:translateX(-12px) rotate(-3deg);}70%{transform:translateX(3px);}}'
  + '.mp-plate.is-drop{animation:mpDrop .4s ease-out;} @keyframes mpDrop{from{transform:translateY(-40px);opacity:.2;}}'
  + '.mp-and{min-width:64px;min-height:48px;padding:0 12px;border:0;border-radius:24px;background:linear-gradient(#FFD86B,#E8B23A);color:#5B3A00;font-family:' + H + ';font-weight:800;font-size:22px;line-height:1;box-shadow:inset 0 0 0 2.5px #A9781A,0 4px 0 #A9781A;cursor:pointer;}'
  + '.mp-and.is-lift{transform:translateY(-10px);box-shadow:inset 0 0 0 2.5px #A9781A,0 0 0 4px #FFE9A8,0 12px 10px rgba(0,0,0,.18);}'
  + '.mp-and.is-in{margin:0 -4px;z-index:2;} .mp-and.is-snap{animation:mpSnap .24s ease-out;} @keyframes mpSnap{from{transform:scale(1.35);}}'
  + '.mp-and.is-comma{min-width:44px;padding:0 6px;font-size:30px;} .mp-and.is-shrink{animation:mpShrink .3s ease-out;} @keyframes mpShrink{from{min-width:64px;letter-spacing:6px;}}'
  + '.mp-and:disabled{cursor:default;}'
  + '.mp-endcap.is-lift{transform:translateY(-10px);box-shadow:0 0 0 4px #9CC9BE,0 12px 10px rgba(0,0,0,.18);}'
  + '.mp-and.is-help,.mp-endcap.is-help,.mp-plate.is-help{box-shadow:0 0 0 4px #2FA56A,0 0 16px rgba(47,165,106,.7);}'
  + '.mp-gap,.mp-open,.mp-dock,.mp-hole{min-width:44px;min-height:60px;padding:0;border:0;border-radius:14px;background:transparent;cursor:pointer;}'
  + '.mp-gap{width:52px;} .mp-dock{width:var(--mp-capw,88px);margin-left:6px;box-shadow:inset 0 0 0 2px #D8CDB8;border-radius:8px 20px 20px 8px;}'
  + '.mp-hole{width:var(--mp-platew,150px);min-height:calc(var(--mp-pic) + 50px);box-shadow:inset 0 0 0 2.5px #9CC9BE;border-radius:18px;background:repeating-linear-gradient(135deg,#F6EFE6 0 10px,#FFFEFB 10px 20px);cursor:default;}'
  + '.mp-gap.is-target,.mp-open,.mp-dock.is-target{box-shadow:inset 0 0 0 2.5px #E8B23A;background:rgba(255,216,107,.18);border:2px dashed #E8B23A;}'
  + '.mp-gap.is-glow,.mp-dock.is-glow,.mp-hole.is-glow{animation:mpGlow .8s ease-in-out infinite;border:2px dashed #E8B23A;} @keyframes mpGlow{50%{box-shadow:0 0 0 4px rgba(232,178,58,.6),0 0 14px rgba(232,178,58,.8);}}'
  + '.mp-hatch{display:inline-block;width:48px;height:64px;margin-left:8px;} .mp-hatch svg{width:100%;height:100%;display:block;} .mp-shutter{transition:transform .5s ease-in-out;transform-origin:24px 8px;} .mp-hatch.is-open .mp-shutter{transform:scaleY(.08);}'
  + '.mp-hatch.is-rattle{animation:mpRattle .3s ease-in-out 2;} @keyframes mpRattle{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}}'
  + '.mp-said{margin:0;padding:6px 14px;border-radius:14px;background:#FFFEFB;box-shadow:inset 0 0 0 2px #E2D6BE;font-family:' + B + ';font-weight:800;font-size:20px;line-height:1.35;color:#2A2A35;text-align:center;max-width:640px;}'
  + '.mp-w{animation:mpWord .5s ease-out both;} @keyframes mpWord{0%{color:#2A2A35;}40%{color:#146B5E;background:#FFE9A8;border-radius:6px;}100%{color:#146B5E;}}'
  + '.mp-counter{display:flex;justify-content:center;gap:14px;flex-wrap:wrap;padding:10px 14px;border-radius:16px;background:#E8D2A8;box-shadow:inset 0 0 0 2px #B9965C;}'
  + '.mp-plate.is-spare:disabled{opacity:.55;}'
  + '.mp-bin:focus-visible,.mp-group:focus-visible,.mp-plate:focus-visible,.mp-and:focus-visible,.mp-endcap:focus-visible,.mp-gap:focus-visible,.mp-dock:focus-visible,.mp-open:focus-visible,.mp-check:focus-visible,.mp-ticket:focus-visible{outline:3px solid #146B5E;outline-offset:3px;}'
  + '.mp-row{display:flex;justify-content:center;}'
  + '.mp-check{min-height:52px;min-width:120px;padding:0 26px;border:0;border-radius:26px;background:#146B5E;color:#FFFFFF;font-family:' + B + ';font-weight:800;font-size:20px;box-shadow:0 4px 0 #0C4A41;cursor:pointer;} .mp-check:disabled{opacity:.5;cursor:default;}'
  + '.mp-note{min-height:1.4em;margin:0;padding:0 8px;text-align:center;font-family:' + B + ';font-weight:700;font-size:19px;line-height:1.35;color:#2A2A35;max-width:640px;} .mp-note:empty{min-height:0;} .mp-note.is-hint{color:#B5461F;} .mp-note.is-ok{color:#146B5E;}'
  /* phones: plates lie sideways (picture beside the phrase) so the rail bends onto two lines */
  + '.mp-wrap.is-narrow{gap:9px;--mp-capw:72px;--mp-platew:auto;} .mp-wrap.is-narrow .mp-work{gap:9px;}'
  + '.mp-wrap.is-narrow .mp-plate{width:auto;min-width:84px;max-width:108px;padding:4px 4px 6px;gap:2px;border-radius:14px;} .mp-wrap.is-narrow .mp-disc{padding:0;} .mp-wrap.is-narrow .mp-phrase{font-size:15px;line-height:1.15;}'
  + '.mp-wrap.is-narrow .mp-start,.mp-wrap.is-narrow .mp-endcap{min-height:52px;font-size:16px;padding:0 10px;} .mp-wrap.is-narrow .mp-start{max-width:112px;} .mp-wrap.is-narrow .mp-endcap{max-width:104px;} .mp-wrap.is-narrow .mp-and{min-width:52px;min-height:44px;font-size:19px;} .mp-wrap.is-narrow .mp-gap{width:44px;}'
  + '.mp-wrap.is-narrow .mp-hole{width:150px;min-height:72px;} .mp-wrap.is-narrow .mp-tnum{font-size:30px;} .mp-wrap.is-narrow .mp-ticket{gap:6px;padding:6px 10px;}'
  + '.mp-wrap.is-narrow .mp-bins{gap:8px;} .mp-wrap.is-narrow .mp-tray{min-width:100%;gap:8px;padding:8px;} .mp-wrap.is-narrow .mp-dot{width:11px;height:11px;}'
  + '.mp-wrap.is-narrow .mp-note{font-size:17px;} .mp-wrap.is-narrow .mp-said{font-size:17px;} .mp-wrap.is-narrow .mp-check{font-size:18px;min-width:104px;} .mp-wrap.is-narrow .mp-hatch{width:30px;height:48px;margin-left:4px;} .mp-wrap.is-narrow .mp-booth{gap:8px;}'
  + '.mp-wrap.is-tiny .mp-bins{gap:6px;flex-wrap:nowrap;} .mp-wrap.is-tiny.is-rail .mp-cust{display:none;} .mp-wrap.is-tiny .mp-ticket{gap:4px;padding:6px 8px;} .mp-wrap.is-tiny .mp-tline{position:relative;padding:0;} .mp-wrap.is-tiny .mp-tnum{position:absolute;left:-4px;top:-6px;z-index:1;min-width:26px;height:26px;border-radius:13px;background:#146B5E;color:#FFFFFF;font-size:19px;line-height:26px;} .mp-wrap.is-tiny .mp-endcap{max-width:96px;padding:0 8px;} .mp-wrap.is-tiny .mp-hook{flex-direction:column;gap:8px;padding:12px 4px 2px;} .mp-wrap.is-narrow .mp-tnum{min-width:16px;} .mp-wrap.is-narrow .mp-tline{gap:0;padding:0 2px;}'
  + '@media print{.mp-row,.mp-note,.mp-hook,.mp-bins{display:none;}}'
  + '@media (prefers-reduced-motion: reduce){.mp-wrap *{animation-duration:.2s !important;transition-duration:.05s !important;}}';
  var s = document.createElement('style'); s.id = 'mp-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.MagnetPlatesActivity = MagnetPlatesActivity;
