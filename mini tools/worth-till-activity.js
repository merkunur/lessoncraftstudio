/* =====================================================================
   worth-till-activity.js — ACTIVITY #164 of the one-by-one rebuild:
   "Pip's Market Stall — Counting Coins & Making Change" (2.MD.C.8)
   → THE WORTH TILL. Model: worth-till-core.js. Design:
   docs/activities-rebuild/designs/164-coin-stall.md
   ---------------------------------------------------------------------
   The stall's till has a cup for every coin's worth, biggest on the left,
   and a cup only takes the coin it is named for: a coin dropped in the
   wrong cup bounces back. The coins are drawn true to the real coins'
   sizes and metals, so the big nickel bouncing off the 10 cup is felt,
   not told. Level 1 counts a spilled till (the money is already lined up
   biggest-first for counting on), level 2 pays Pip (exact, fewest coins,
   a fair trade, a second way), level 3 gives change, decides "enough?"
   and which purse holds more. Miss 1 parades the money worth-first,
   miss 2 adds the running totals. Next appears .OK_MS after success.
   ===================================================================== */
var WorthTillActivity = {
  id: 'worth-till-activity',
  THEMES: ['beach', 'zoo-animals'],
  /* the drawn apparatus (coins, cups, notes): declared for the hierarchy audit */
  apparatusClasses: ['wt-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Pip's Market Stall","de":"Otto der Otter","fr":"L’étal de Filou","es":"El puesto de Otto","pt":"A barraca do Otto","it":"La bancarella di Otto","nl":"Otto de otter","sv":"Ottos marknadsstånd","da":"Ottos markedsbod","no":"Ottos markedsbod","fi":"Oton torikoju"},
    instruction: {"en":"Put each coin in the till cup for what it is worth: a cup takes only its own coin, and the wrong coin bounces back. Then count the money, pay Pip, give change, or find the purse that holds more. After a miss, Check lines the money up, the coin worth the most first.","de":"Leg jede Münze in das Kassenfach für ihren Wert: Ein Fach nimmt nur seine eigene Münze, die falsche springt zurück. Dann zählst du das Geld, bezahlst Otto, gibst Wechselgeld oder findest den Geldbeutel mit mehr Geld. Nach einem Fehler stellt Prüfen das Geld der Reihe nach auf, die wertvollste Münze zuerst.","fr":"Range chaque pièce dans le compartiment de la caisse qui correspond à sa valeur : un compartiment ne prend que sa pièce, la mauvaise rebondit. Ensuite, compte l’argent, paie Filou, rends la monnaie ou trouve le porte-monnaie qui contient le plus d’argent. Après une erreur, Vérifier aligne l’argent, la pièce qui vaut le plus en premier.","es":"Pon cada moneda en el compartimento de la caja que corresponde a su valor: cada compartimento solo acepta su moneda y la equivocada rebota. Luego cuenta el dinero, págale a Otto, da el cambio o encuentra el monedero que tiene más dinero. Si te equivocas, Revisar forma el dinero en fila, primero la moneda que vale más.","pt":"Coloque cada moeda no compartimento do caixa que corresponde ao valor dela: cada compartimento só aceita a sua moeda, e a errada pula de volta. Depois conte o dinheiro, pague o Otto, dê o troco ou descubra o porta-moedas que tem mais dinheiro. Se errar, Conferir mostra o dinheiro em fila, primeiro a moeda que vale mais.","it":"Metti ogni moneta nello scomparto della cassa che corrisponde al suo valore: ogni scomparto accetta solo la sua moneta, quella sbagliata rimbalza fuori. Poi conta i soldi, paga Otto, dai il resto o trova il borsellino che contiene più soldi. Dopo un errore, Controlla mette i soldi in fila, prima la moneta che vale di più.","nl":"Leg elke munt in het kassavakje dat bij zijn waarde hoort: een vakje neemt alleen zijn eigen munt, de verkeerde springt terug. Tel dan het geld, betaal Otto, geef wisselgeld of zoek de portemonnee waar meer geld in zit. Na een fout zet Controleer het geld op een rij, de munt die het meest waard is eerst.","sv":"Lägg varje mynt i det fack i kassan som hör till dess värde: ett fack tar bara sitt eget mynt, och fel mynt studsar tillbaka. Räkna sedan pengarna, betala Otto, ge växel eller hitta plånboken med mest pengar. Efter ett fel ställer Kolla upp pengarna på rad, myntet som är värt mest först.","da":"Læg hver mønt i det rum i kassen, der passer til dens værdi: et rum tager kun sin egen mønt, og den forkerte hopper tilbage. Tæl så pengene, betal Otto, giv byttepenge eller find pungen med flest penge. Efter en fejl stiller Tjek pengene på række, den mønt, der er mest værd, først.","no":"Legg hver mynt i rommet i kassen som passer til verdien: et rom tar bare sin egen mynt, og feil mynt spretter tilbake. Tell så pengene, betal Otto, gi vekslepenger eller finn lommeboka med mest penger. Etter en feil stiller Sjekk opp pengene på rad, mynten som er verdt mest, først.","fi":"Laita jokainen kolikko kassan siihen lokeroon, joka vastaa sen arvoa: lokero ottaa vain oman kolikkonsa, ja väärä kolikko pomppaa takaisin. Laske sitten rahat, maksa Otolle, anna vaihtorahat tai etsi kukkaro, jossa on enemmän rahaa. Virheen jälkeen Tarkista asettaa rahat riviin, arvokkain kolikko ensin."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Revisar","pt":"Conferir","it":"Controlla","nl":"Controleer","sv":"Kolla","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    l1: {"en":"Count the coins","de":"Münzen zählen","fr":"Compter les pièces","es":"Contar monedas","pt":"Contar moedas","it":"Contare le monete","nl":"Munten tellen","sv":"Räkna mynt","da":"Tæl mønter","no":"Tell mynter","fi":"Laske kolikot"},
    l2: {"en":"Pay Pip","de":"Otto bezahlen","fr":"Payer Filou","es":"Pagarle a Otto","pt":"Pagar o Otto","it":"Pagare Otto","nl":"Otto betalen","sv":"Betala Otto","da":"Betal Otto","no":"Betal Otto","fi":"Maksa Otolle"},
    l3: {"en":"Change and enough?","de":"Wechselgeld und „Reicht es?“","fr":"Monnaie et « assez ? »","es":"Cambio y ¿alcanza?","pt":"Troco e “dá?”","it":"Resto e «bastano?»","nl":"Wisselgeld en genoeg?","sv":"Växel och räcker det?","da":"Byttepenge og nok?","no":"Vekslepenger og nok?","fi":"Vaihtorahat ja riittääkö"},
    setKey: {"en":"Coin key","de":"Münzhilfe","fr":"Aide des pièces","es":"Ayuda de monedas","pt":"Ajuda das moedas","it":"Aiuto monete","nl":"Munthulp","sv":"Mynthjälp","da":"Mønthjælp","no":"Mynthjelp","fi":"Kolikkoapu"},
    kOn: {"en":"On","de":"An","fr":"Oui","es":"Sí","pt":"Sim","it":"Sì","nl":"Aan","sv":"På","da":"Til","no":"På","fi":"Päällä"},
    kOff: {"en":"Off","de":"Aus","fr":"Non","es":"No","pt":"Não","it":"No","nl":"Uit","sv":"Av","da":"Fra","no":"Av","fi":"Pois"},
    pCount: {"en":"Pip tipped out the till. Put the coins back in the till, then show how much money it is.","de":"Otto hat die Kasse ausgekippt. Leg die Münzen zurück in die Kasse und stell dann ein, wie viel Geld es ist.","fr":"Filou a vidé sa caisse. Remets les pièces dans la caisse, puis affiche combien d’argent il y a.","es":"Otto vació su caja. Regresa las monedas a la caja y luego marca cuánto dinero es.","pt":"O Otto esvaziou o caixa. Coloque as moedas de volta no caixa e depois mostre quanto dinheiro tem.","it":"Otto ha svuotato la cassa. Rimetti le monete nella cassa, poi indica quanti soldi sono.","nl":"Otto heeft de kassa leeggegooid. Leg de munten terug in de kassa en zet dan in hoeveel geld het is.","sv":"Otto har tömt kassan. Lägg tillbaka mynten i kassan och ställ sedan in hur mycket pengar det är.","da":"Otto har tømt kassen. Læg mønterne tilbage, og vis så, hvor mange penge det er.","no":"Otto har tømt kassen. Legg myntene tilbake i kassen, og still så inn hvor mye penger det er.","fi":"Otto kaatoi kassan tyhjäksi. Laita kolikot takaisin kassaan ja näytä sitten, paljonko rahaa on."},
    pExact: {"en":"This costs {price}. Pay Pip exactly.","de":"Das kostet {price}. Bezahl Otto passend.","fr":"Cela coûte {price}. Paie Filou le prix exact.","es":"Esto cuesta {price}. Págale a Otto la cantidad exacta.","pt":"Isto custa {price}. Pague o Otto com o valor exato.","it":"Costa {price}. Paga Otto con l’importo esatto.","nl":"Dit kost {price}. Betaal Otto gepast.","sv":"Det här kostar {price}. Betala exakt till Otto.","da":"Det her koster {price}. Betal Otto det præcise beløb.","no":"Dette koster {price}. Betal Otto nøyaktig.","fi":"Tämä maksaa {price}. Maksa Otolle tasan."},
    pFewest: {"en":"This costs {price}. Pay with as few coins as you can.","de":"Das kostet {price}. Bezahl mit so wenig Münzen wie möglich.","fr":"Cela coûte {price}. Paie avec le moins de pièces possible.","es":"Esto cuesta {price}. Paga con la menor cantidad de monedas que puedas.","pt":"Isto custa {price}. Pague com o menor número de moedas possível.","it":"Costa {price}. Paga con il minor numero di monete possibile.","nl":"Dit kost {price}. Betaal met zo weinig mogelijk munten.","sv":"Det här kostar {price}. Betala med så få mynt som möjligt.","da":"Det her koster {price}. Betal med så få mønter som muligt.","no":"Dette koster {price}. Betal med så få mynter som mulig.","fi":"Tämä maksaa {price}. Maksa niin vähillä kolikoilla kuin voit."},
    pTrade: {"en":"Pip needs change for this coin. Give coins worth the same.","de":"Otto möchte diese Münze wechseln. Gib ihm Münzen, die zusammen gleich viel wert sind.","fr":"Filou veut faire la monnaie de cette pièce. Donne des pièces qui valent autant.","es":"Otto necesita cambio para esta moneda. Dale monedas que valgan lo mismo.","pt":"O Otto precisa trocar esta moeda. Dê moedas que valham o mesmo.","it":"Otto deve cambiare questa moneta. Dagli monete che valgono lo stesso.","nl":"Otto wil deze munt wisselen. Geef munten die samen evenveel waard zijn.","sv":"Otto behöver växla det här myntet. Ge mynt som tillsammans är värda lika mycket.","da":"Otto skal have byttet denne mønt. Giv mønter, der tilsammen er lige så meget værd.","no":"Otto trenger å veksle denne mynten. Gi mynter som til sammen er verdt like mye.","fi":"Otto haluaa vaihtaa tämän kolikon pienemmiksi. Anna kolikoita, joiden arvo on yhteensä sama."},
    pTwo: {"en":"Pip paid {price} like this. Pay {price} a different way.","de":"Otto hat {price} so bezahlt. Bezahl {price} auf eine andere Art.","fr":"Filou a payé {price} comme ça. Paie {price} d’une autre façon.","es":"Otto pagó {price} así. Paga {price} de otra manera.","pt":"O Otto pagou {price} assim. Pague {price} de outro jeito.","it":"Otto ha pagato {price} così. Paga {price} in un altro modo.","nl":"Otto betaalde {price} zo. Betaal {price} op een andere manier.","sv":"Otto betalade {price} så här. Betala {price} på ett annat sätt.","da":"Otto betalte {price} sådan her. Betal {price} på en anden måde.","no":"Otto betalte {price} slik. Betal {price} på en annen måte.","fi":"Otto maksoi {price} näin. Maksa {price} toisella tavalla."},
    pChange: {"en":"This costs {price}. A customer pays with {paid}. Give the change from the till.","de":"Das kostet {price}. Ein Kunde zahlt mit {paid}. Gib das Wechselgeld aus der Kasse.","fr":"Cela coûte {price}. Un client paie avec {paid}. Rends la monnaie en prenant dans la caisse.","es":"Esto cuesta {price}. Un cliente paga con {paid}. Dale el cambio de la caja.","pt":"Isto custa {price}. Um cliente paga com {paid}. Dê o troco do caixa.","it":"Costa {price}. Un cliente paga con {paid}. Dai il resto dalla cassa.","nl":"Dit kost {price}. Een klant betaalt met {paid}. Geef het wisselgeld uit de kassa.","sv":"Det här kostar {price}. En kund betalar med {paid}. Ge växel ur kassan.","da":"Det her koster {price}. En kunde betaler med {paid}. Giv byttepenge fra kassen.","no":"Dette koster {price}. En kunde betaler med {paid}. Gi vekslepenger fra kassen.","fi":"Tämä maksaa {price}. Asiakas antaa {paid}. Anna vaihtorahat kassasta."},
    pEnough: {"en":"This costs {price}. Is the money in this purse enough?","de":"Das kostet {price}. Reicht das Geld in diesem Geldbeutel?","fr":"Cela coûte {price}. Y a-t-il assez d’argent dans ce porte-monnaie ?","es":"Esto cuesta {price}. ¿Alcanza el dinero de este monedero?","pt":"Isto custa {price}. O dinheiro deste porta-moedas dá?","it":"Costa {price}. I soldi di questo borsellino bastano?","nl":"Dit kost {price}. Is het geld in deze portemonnee genoeg?","sv":"Det här kostar {price}. Räcker pengarna i den här plånboken?","da":"Det her koster {price}. Er der penge nok i denne pung?","no":"Dette koster {price}. Er det nok penger i denne lommeboka?","fi":"Tämä maksaa {price}. Riittävätkö tämän kukkaron rahat?"},
    pPurse: {"en":"Which purse holds more money?","de":"In welchem Geldbeutel ist mehr Geld?","fr":"Quel porte-monnaie contient le plus d’argent ?","es":"¿Qué monedero tiene más dinero?","pt":"Qual porta-moedas tem mais dinheiro?","it":"Quale borsellino contiene più soldi?","nl":"In welke portemonnee zit meer geld?","sv":"Vilken plånbok har mest pengar?","da":"Hvilken pung har flest penge?","no":"Hvilken lommebok har mest penger?","fi":"Kummassa kukkarossa on enemmän rahaa?"},
    hintSortFirst: {"en":"First put all the coins in the till.","de":"Leg zuerst alle Münzen in die Kasse.","fr":"Range d’abord toutes les pièces dans la caisse.","es":"Primero pon todas las monedas en la caja.","pt":"Primeiro coloque todas as moedas no caixa.","it":"Prima metti tutte le monete nella cassa.","nl":"Leg eerst alle munten in de kassa.","sv":"Lägg först alla mynt i kassan.","da":"Læg først alle mønterne i kassen.","no":"Legg først alle myntene i kassen.","fi":"Laita ensin kaikki kolikot kassaan."},
    hintDial: {"en":"Now show how much it is with the arrows.","de":"Stell jetzt mit den Pfeilen ein, wie viel es ist.","fr":"Maintenant, affiche le total avec les flèches.","es":"Ahora marca cuánto es con las flechas.","pt":"Agora mostre quanto é com as setas.","it":"Ora indica quanto fa con le frecce.","nl":"Zet nu met de pijlen in hoeveel het is.","sv":"Ställ nu in hur mycket det är med pilarna.","da":"Indstil nu med pilene, hvor meget det er.","no":"Still nå inn med pilene hvor mye det er.","fi":"Näytä nyt nuolilla, paljonko se on."},
    hintPayFirst: {"en":"Pay from the purse: drop coins into the till.","de":"Bezahl aus dem Geldbeutel: Leg Münzen in die Kasse.","fr":"Paie avec le porte-monnaie : mets des pièces dans la caisse.","es":"Paga con el monedero: pon monedas en la caja.","pt":"Pague com o porta-moedas: coloque moedas no caixa.","it":"Paga con il borsellino: metti delle monete nella cassa.","nl":"Betaal uit de portemonnee: leg munten in de kassa.","sv":"Betala ur plånboken: lägg mynt i kassan.","da":"Betal fra pungen: læg mønter i kassen.","no":"Betal fra lommeboka: legg mynter i kassen.","fi":"Maksa kukkarosta: laita kolikoita kassaan."},
    hintTrayFirst: {"en":"Tap coins in the till to give them to the customer.","de":"Tippe Münzen in der Kasse an, um sie dem Kunden zu geben.","fr":"Touche des pièces de la caisse pour les donner au client.","es":"Toca monedas de la caja para dárselas al cliente.","pt":"Toque em moedas do caixa para dar ao cliente.","it":"Tocca le monete nella cassa per darle al cliente.","nl":"Tik op munten in de kassa om ze aan de klant te geven.","sv":"Tryck på mynt i kassan för att ge dem till kunden.","da":"Tryk på mønter i kassen for at give dem til kunden.","no":"Trykk på mynter i kassen for å gi dem til kunden.","fi":"Napauta kassan kolikoita, niin annat ne asiakkaalle."},
    hintChoose: {"en":"First tap Enough or Not enough.","de":"Tippe zuerst auf „Reicht“ oder „Reicht nicht“.","fr":"Touche d’abord « Assez » ou « Pas assez ».","es":"Primero toca «Alcanza» o «No alcanza».","pt":"Primeiro toque em “Dá” ou “Não dá”.","it":"Prima tocca «Bastano» o «Non bastano».","nl":"Tik eerst op ‘Genoeg’ of ‘Niet genoeg’.","sv":"Tryck först på ”Räcker” eller ”Räcker inte”.","da":"Tryk først på »Nok« eller »Ikke nok«.","no":"Trykk først på «Nok» eller «Ikke nok».","fi":"Napauta ensin ”Riittää” tai ”Ei riitä”."},
    hintPurseFirst: {"en":"First tap a purse.","de":"Tippe zuerst einen Geldbeutel an.","fr":"Touche d’abord un porte-monnaie.","es":"Primero toca un monedero.","pt":"Primeiro toque em um porta-moedas.","it":"Prima tocca un borsellino.","nl":"Tik eerst op een portemonnee.","sv":"Tryck först på en plånbok.","da":"Tryk først på en pung.","no":"Trykk først på en lommebok.","fi":"Napauta ensin kukkaroa."},
    hintAgain: {"en":"Change something first, then press Check.","de":"Ändere zuerst etwas, dann drück auf Prüfen.","fr":"Change d’abord quelque chose, puis appuie sur Vérifier.","es":"Primero cambia algo y luego presiona Revisar.","pt":"Primeiro mude alguma coisa e depois toque em Conferir.","it":"Prima cambia qualcosa, poi premi Controlla.","nl":"Verander eerst iets en druk dan op Controleer.","sv":"Ändra något först och tryck sedan på Kolla.","da":"Lav først noget om, og tryk så på Tjek.","no":"Endre noe først, og trykk så på Sjekk.","fi":"Muuta ensin jotain ja paina sitten Tarkista."},
    hintLid: {"en":"That cup is shut: Pip wants other coins for this one.","de":"Dieses Fach ist zu: Otto möchte für diese Münze andere Münzen.","fr":"Ce compartiment est fermé : Filou veut d’autres pièces pour celle-ci.","es":"Ese compartimento está cerrado: Otto quiere otras monedas a cambio de esta.","pt":"Este compartimento está fechado: o Otto quer outras moedas no lugar desta.","it":"Questo scomparto è chiuso: Otto vuole altre monete al posto di questa.","nl":"Dit vakje is dicht: Otto wil andere munten voor deze munt.","sv":"Det facket är stängt: Otto vill ha andra mynt för det här.","da":"Det rum er lukket: Otto vil have andre mønter for denne.","no":"Det rommet er stengt: Otto vil ha andre mynter for denne.","fi":"Tämä lokero on kiinni: Otto haluaa tämän tilalle muita kolikoita."},
    hintCount: {"en":"Start with the coins worth the most, then count on.","de":"Fang mit den Münzen an, die am meisten wert sind, und zähl dann weiter.","fr":"Commence par les pièces qui valent le plus, puis continue à compter.","es":"Empieza con las monedas que valen más y sigue contando.","pt":"Comece pelas moedas que valem mais e continue contando.","it":"Comincia dalle monete che valgono di più, poi continua a contare.","nl":"Begin met de munten die het meest waard zijn en tel dan verder.","sv":"Börja med mynten som är värda mest och räkna sedan vidare.","da":"Begynd med de mønter, der er mest værd, og tæl så videre.","no":"Begynn med myntene som er verdt mest, og tell så videre.","fi":"Aloita arvokkaimmista kolikoista ja laske sitten eteenpäin."},
    helpCount: {"en":"Count on: {steps} … What is the last number?","de":"Zähl weiter: {steps} … Was ist die letzte Zahl?","fr":"Continue à compter : {steps} … Quel est le dernier nombre ?","es":"Sigue contando: {steps} … ¿Cuál es el último número?","pt":"Continue contando: {steps} … Qual é o último número?","it":"Continua a contare: {steps} … Qual è l’ultimo numero?","nl":"Tel verder: {steps} … Wat is het laatste getal?","sv":"Räkna vidare: {steps} … Vilket är det sista talet?","da":"Tæl videre: {steps} … Hvad er det sidste tal?","no":"Tell videre: {steps} … Hva er det siste tallet?","fi":"Laske eteenpäin: {steps} … Mikä on viimeinen luku?"},
    hintOver: {"en":"That is too much. Take a coin out.","de":"Das ist zu viel. Nimm eine Münze heraus.","fr":"C’est trop. Enlève une pièce.","es":"Es demasiado. Saca una moneda.","pt":"É demais. Tire uma moeda.","it":"È troppo. Togli una moneta.","nl":"Dat is te veel. Haal er een munt uit.","sv":"Det är för mycket. Ta ut ett mynt.","da":"Det er for meget. Tag en mønt ud.","no":"Det er for mye. Ta ut en mynt.","fi":"Se on liikaa. Ota yksi kolikko pois."},
    hintUnder: {"en":"Not enough yet. Pip needs more.","de":"Das reicht noch nicht. Otto braucht mehr.","fr":"Ce n’est pas encore assez. Filou a besoin de plus.","es":"Todavía no alcanza. Otto necesita más.","pt":"Ainda não dá. O Otto precisa de mais.","it":"Non basta ancora. A Otto serve di più.","nl":"Nog niet genoeg. Otto heeft meer nodig.","sv":"Det räcker inte än. Otto behöver mer.","da":"Det er ikke nok endnu. Otto skal have mere.","no":"Det er ikke nok ennå. Otto trenger mer.","fi":"Ei vielä riitä. Otto tarvitsee lisää."},
    helpPay: {"en":"Count on to {price}.","de":"Zähl weiter bis {price}.","fr":"Compte jusqu’à {price}.","es":"Cuenta hasta {price}.","pt":"Conte até {price}.","it":"Conta fino a {price}.","nl":"Tel verder tot {price}.","sv":"Räkna vidare till {price}.","da":"Tæl videre til {price}.","no":"Tell videre til {price}.","fi":"Laske eteenpäin, kunnes saat {price}."},
    hintFewer: {"en":"Right amount! Can you pay with fewer coins?","de":"Der Betrag stimmt! Geht es mit weniger Münzen?","fr":"C’est la bonne somme ! Peux-tu payer avec moins de pièces ?","es":"¡La cantidad es correcta! ¿Puedes pagar con menos monedas?","pt":"O valor está certo! Dá para pagar com menos moedas?","it":"La somma è giusta! Riesci a pagare con meno monete?","nl":"Het bedrag klopt! Kun je met minder munten betalen?","sv":"Rätt summa! Kan du betala med färre mynt?","da":"Beløbet passer! Kan du betale med færre mønter?","no":"Riktig beløp! Kan du betale med færre mynter?","fi":"Summa on oikein! Voitko maksaa vähemmillä kolikoilla?"},
    hintSame: {"en":"That is the way Pip paid. Try other coins.","de":"So hat Otto bezahlt. Nimm andere Münzen.","fr":"C’est comme ça que Filou a payé. Essaie d’autres pièces.","es":"Así pagó Otto. Prueba con otras monedas.","pt":"Foi assim que o Otto pagou. Tente outras moedas.","it":"È così che ha pagato Otto. Prova con altre monete.","nl":"Zo betaalde Otto. Probeer andere munten.","sv":"Så betalade Otto. Prova andra mynt.","da":"Sådan betalte Otto. Prøv andre mønter.","no":"Slik betalte Otto. Prøv andre mynter.","fi":"Näin Otto maksoi. Kokeile muita kolikoita."},
    hintTrade: {"en":"Give coins that together are worth the same as this coin.","de":"Gib Münzen, die zusammen so viel wert sind wie diese Münze.","fr":"Donne des pièces qui, ensemble, valent autant que cette pièce.","es":"Da monedas que juntas valgan lo mismo que esta moneda.","pt":"Dê moedas que juntas valham o mesmo que esta moeda.","it":"Dai monete che insieme valgono quanto questa moneta.","nl":"Geef munten die samen evenveel waard zijn als deze munt.","sv":"Ge mynt som tillsammans är värda lika mycket som det här myntet.","da":"Giv mønter, der tilsammen er lige så meget værd som denne mønt.","no":"Gi mynter som til sammen er verdt like mye som denne mynten.","fi":"Anna kolikoita, joiden arvo on yhteensä sama kuin tämän kolikon."},
    helpTrade: {"en":"This coin is worth {price}. Count on to {price}.","de":"Diese Münze ist {price} wert. Zähl weiter bis {price}.","fr":"Cette pièce vaut {price}. Compte jusqu’à {price}.","es":"Esta moneda vale {price}. Cuenta hasta {price}.","pt":"Esta moeda vale {price}. Conte até {price}.","it":"Questa moneta vale {price}. Conta fino a {price}.","nl":"Deze munt is {price} waard. Tel verder tot {price}.","sv":"Det här myntet är värt {price}. Räkna vidare till {price}.","da":"Denne mønt er {price} værd. Tæl videre til {price}.","no":"Denne mynten er verdt {price}. Tell videre til {price}.","fi":"Tämän kolikon arvo on {price}. Laske eteenpäin, kunnes saat {price}."},
    hintChangeMiss: {"en":"It costs {price}. The customer paid with {paid}.","de":"Es kostet {price}. Der Kunde hat mit {paid} bezahlt.","fr":"Cela coûte {price}. Le client a payé avec {paid}.","es":"Cuesta {price}. El cliente pagó con {paid}.","pt":"Custa {price}. O cliente pagou com {paid}.","it":"Costa {price}. Il cliente ha pagato con {paid}.","nl":"Het kost {price}. De klant betaalde met {paid}.","sv":"Det kostar {price}. Kunden betalade med {paid}.","da":"Det koster {price}. Kunden betalte med {paid}.","no":"Det koster {price}. Kunden betalte med {paid}.","fi":"Se maksaa {price}. Asiakas antoi {paid}."},
    helpChange: {"en":"Count up from {price} to {paid}.","de":"Zähl von {price} weiter bis {paid}.","fr":"Compte de {price} jusqu’à {paid}.","es":"Cuenta desde {price} hasta {paid}.","pt":"Conte de {price} até {paid}.","it":"Conta da {price} fino a {paid}.","nl":"Tel verder van {price} tot {paid}.","sv":"Räkna vidare från {price} till {paid}.","da":"Tæl videre fra {price} til {paid}.","no":"Tell videre fra {price} til {paid}.","fi":"Aloita hinnasta {price} ja laske eteenpäin, kunnes saat {paid}."},
    hintEnough: {"en":"Count the money in the purse, starting with the coin worth the most.","de":"Zähl das Geld im Geldbeutel. Fang mit der Münze an, die am meisten wert ist.","fr":"Compte l’argent du porte-monnaie en commençant par la pièce qui vaut le plus.","es":"Cuenta el dinero del monedero, empezando por la moneda que vale más.","pt":"Conte o dinheiro do porta-moedas, começando pela moeda que vale mais.","it":"Conta i soldi del borsellino, cominciando dalla moneta che vale di più.","nl":"Tel het geld in de portemonnee. Begin bij de munt die het meest waard is.","sv":"Räkna pengarna i plånboken. Börja med myntet som är värt mest.","da":"Tæl pengene i pungen. Begynd med den mønt, der er mest værd.","no":"Tell pengene i lommeboka. Begynn med mynten som er verdt mest.","fi":"Laske kukkaron rahat. Aloita arvokkaimmasta kolikosta."},
    helpEnough: {"en":"The purse holds {total}. Is that enough for {price}?","de":"Im Geldbeutel sind {total}. Reicht das für {price}?","fr":"Le porte-monnaie contient {total}. Est-ce assez pour {price} ?","es":"En el monedero hay {total}. ¿Alcanza para {price}?","pt":"No porta-moedas tem {total}. Dá para {price}?","it":"Nel borsellino ci sono {total}. Bastano per {price}?","nl":"In de portemonnee zit {total}. Is dat genoeg voor {price}?","sv":"I plånboken finns {total}. Räcker det till {price}?","da":"I pungen er der {total}. Er det nok til {price}?","no":"I lommeboka er det {total}. Er det nok til {price}?","fi":"Kukkarossa on {total}. Riittääkö se, kun hinta on {price}?"},
    hintPurse: {"en":"More coins is not always more money.","de":"Mehr Münzen heißt nicht immer mehr Geld.","fr":"Plus de pièces, ce n’est pas toujours plus d’argent.","es":"Más monedas no siempre es más dinero.","pt":"Mais moedas nem sempre é mais dinheiro.","it":"Più monete non vuol dire sempre più soldi.","nl":"Meer munten is niet altijd meer geld.","sv":"Fler mynt är inte alltid mer pengar.","da":"Flere mønter er ikke altid flere penge.","no":"Flere mynter er ikke alltid mer penger.","fi":"Useampi kolikko ei aina tarkoita enempää rahaa."},
    helpPurse: {"en":"Count each purse, starting with the coin worth the most.","de":"Zähl jeden Geldbeutel. Fang mit der Münze an, die am meisten wert ist.","fr":"Compte chaque porte-monnaie en commençant par la pièce qui vaut le plus.","es":"Cuenta cada monedero, empezando por la moneda que vale más.","pt":"Conte cada porta-moedas, começando pela moeda que vale mais.","it":"Conta ogni borsellino, cominciando dalla moneta che vale di più.","nl":"Tel elke portemonnee. Begin bij de munt die het meest waard is.","sv":"Räkna varje plånbok. Börja med myntet som är värt mest.","da":"Tæl hver pung. Begynd med den mønt, der er mest værd.","no":"Tell hver lommebok. Begynn med mynten som er verdt mest.","fi":"Laske kumpikin kukkaro. Aloita arvokkaimmasta kolikosta."},
    okCount: {"en":"That is {total}!","de":"Das sind {total}!","fr":"Ça fait {total} !","es":"¡Son {total}!","pt":"São {total}!","it":"Sono {total}!","nl":"Dat is {total}!","sv":"Det är {total}!","da":"Det er {total}!","no":"Det er {total}!","fi":"Se on {total}!"},
    okExact: {"en":"{price}, paid exactly.","de":"{price}, passend bezahlt.","fr":"{price} : le compte est bon !","es":"{price}: ¡cantidad exacta!","pt":"{price}: valor exato.","it":"{price}: importo esatto.","nl":"{price}: precies gepast.","sv":"{price}: exakt rätt.","da":"{price}: præcis betalt.","no":"{price}: nøyaktig betalt.","fi":"{price}: maksettu tasan."},
    okFewest: {"en":"{price} with just {n} coins.","de":"{price} mit nur {n} Münzen.","fr":"{price} avec seulement {n} pièces.","es":"{price} con solo {n} monedas.","pt":"{price} com só {n} moedas.","it":"{price} con solo {n} monete.","nl":"{price} met maar {n} munten.","sv":"{price} med bara {n} mynt.","da":"{price} med kun {n} mønter.","no":"{price} med bare {n} mynter.","fi":"{price} vain {n} kolikolla."},
    okTrade: {"en":"Fair trade: {price} for {price}.","de":"Ein fairer Tausch: {price} für {price}.","fr":"Échange juste : {price} contre {price}.","es":"Cambio justo: {price} por {price}.","pt":"Troca justa: {price} por {price}.","it":"Cambio giusto: {price} per {price}.","nl":"Eerlijk geruild: {price} voor {price}.","sv":"Rättvist byte: {price} mot {price}.","da":"Et retfærdigt bytte: {price} for {price}.","no":"Rettferdig bytte: {price} for {price}.","fi":"Reilu vaihto: {price} = {price}."},
    okTwo: {"en":"{price}, paid a different way!","de":"{price}, auf eine andere Art bezahlt!","fr":"{price}, payé d’une autre façon !","es":"¡{price}, pagado de otra manera!","pt":"{price}, pago de outro jeito!","it":"{price}, pagati in un altro modo!","nl":"{price}, op een andere manier betaald!","sv":"{price}, betalt på ett annat sätt!","da":"{price}, betalt på en anden måde!","no":"{price}, betalt på en annen måte!","fi":"{price}, maksettu toisella tavalla!"},
    okChange: {"en":"{price} + {change} = {paid}. The change is {change}.","de":"{price} + {change} = {paid}. Das Wechselgeld ist {change}.","fr":"{price} + {change} = {paid}. La monnaie, c’est {change}.","es":"{price} + {change} = {paid}. El cambio es {change}.","pt":"{price} + {change} = {paid}. O troco é {change}.","it":"{price} + {change} = {paid}. Il resto è {change}.","nl":"{price} + {change} = {paid}. Het wisselgeld is {change}.","sv":"{price} + {change} = {paid}. Växeln är {change}.","da":"{price} + {change} = {paid}. Byttepengene er {change}.","no":"{price} + {change} = {paid}. Vekslepengene er {change}.","fi":"{price} + {change} = {paid}. Vaihtoraha on {change}."},
    okYes: {"en":"The purse holds {total}: enough for {price}!","de":"Im Geldbeutel sind {total}: Das reicht für {price}!","fr":"Le porte-monnaie contient {total} : c’est assez pour {price} !","es":"En el monedero hay {total}: ¡alcanza para {price}!","pt":"No porta-moedas tem {total}: dá para {price}!","it":"Nel borsellino ci sono {total}: bastano per {price}!","nl":"In de portemonnee zit {total}: genoeg voor {price}!","sv":"I plånboken finns {total}: det räcker till {price}!","da":"I pungen er der {total}: det er nok til {price}!","no":"I lommeboka er det {total}: det er nok til {price}!","fi":"Kukkarossa on {total}: se riittää, kun hinta on {price}!"},
    okNo: {"en":"The purse holds {total}: less than {price}, so it is not enough.","de":"Im Geldbeutel sind nur {total}: weniger als {price}, das reicht nicht.","fr":"Le porte-monnaie contient {total} : moins que {price}, ce n’est pas assez.","es":"En el monedero hay {total}: es menos que {price}, no alcanza.","pt":"No porta-moedas tem {total}: é menos que {price}, não dá.","it":"Nel borsellino ci sono {total}: meno di {price}, non bastano.","nl":"In de portemonnee zit {total}: minder dan {price}, niet genoeg.","sv":"I plånboken finns {total}: mindre än {price}, det räcker inte.","da":"I pungen er der {total}: mindre end {price}, det er ikke nok.","no":"I lommeboka er det {total}: mindre enn {price}, det er ikke nok.","fi":"Kukkarossa on {total}: se on vähemmän kuin {price}, ei riitä."},
    okPurse: {"en":"{big} is more than {small}.","de":"{big} sind mehr als {small}.","fr":"{big}, c’est plus que {small}.","es":"{big} es más que {small}.","pt":"{big} é mais que {small}.","it":"{big} sono più di {small}.","nl":"{big} is meer dan {small}.","sv":"{big} är mer än {small}.","da":"{big} er mere end {small}.","no":"{big} er mer enn {small}.","fi":"{big} on enemmän kuin {small}."},
    okPurseFew: {"en":"{big} is more than {small}, even with fewer coins!","de":"{big} sind mehr als {small}, auch mit weniger Münzen!","fr":"{big}, c’est plus que {small}, même avec moins de pièces !","es":"{big} es más que {small}, ¡aunque con menos monedas!","pt":"{big} é mais que {small}, mesmo com menos moedas!","it":"{big} sono più di {small}, anche con meno monete!","nl":"{big} is meer dan {small}, zelfs met minder munten!","sv":"{big} är mer än {small}, fast med färre mynt!","da":"{big} er mere end {small}, selv med færre mønter!","no":"{big} er mer enn {small}, selv med færre mynter!","fi":"{big} on enemmän kuin {small}, vaikka kolikoita on vähemmän!"},
    bEnough: {"en":"Enough","de":"Reicht","fr":"Assez","es":"Alcanza","pt":"Dá","it":"Bastano","nl":"Genoeg","sv":"Räcker","da":"Nok","no":"Nok","fi":"Riittää"},
    bNot: {"en":"Not enough","de":"Reicht nicht","fr":"Pas assez","es":"No alcanza","pt":"Não dá","it":"Non bastano","nl":"Niet genoeg","sv":"Räcker inte","da":"Ikke nok","no":"Ikke nok","fi":"Ei riitä"},
    aPurseL: {"en":"the orange purse","de":"der orange Geldbeutel","fr":"le porte-monnaie orange","es":"el monedero naranja","pt":"o porta-moedas laranja","it":"il borsellino arancione","nl":"de oranje portemonnee","sv":"den orange plånboken","da":"den orange pung","no":"den oransje lommeboka","fi":"oranssi kukkaro"},
    aPurseR: {"en":"the teal purse","de":"der türkise Geldbeutel","fr":"le porte-monnaie turquoise","es":"el monedero turquesa","pt":"o porta-moedas verde-água","it":"il borsellino turchese","nl":"de turquoise portemonnee","sv":"den turkosa plånboken","da":"den turkise pung","no":"den turkise lommeboka","fi":"turkoosi kukkaro"},
    aCup: {"en":"Cup for {amt}","de":"Fach für {amt}","fr":"Compartiment de {amt}","es":"Compartimento de {amt}","pt":"Compartimento de {amt}","it":"Scomparto da {amt}","nl":"Vakje voor {amt}","sv":"Fack för {amt}","da":"Rum til {amt}","no":"Rom for {amt}","fi":"Lokero: {amt}"},
    aTray: {"en":"The customer's dish","de":"Schale des Kunden","fr":"Le plateau du client","es":"La charola del cliente","pt":"A bandeja do cliente","it":"Il vassoio del cliente","nl":"Het schaaltje van de klant","sv":"Kundens skål","da":"Kundens skål","no":"Kundens skål","fi":"Asiakkaan vati"},
    aIn: {"en":"In the {cup} cup.","de":"Im Fach für {cup}.","fr":"Dans le compartiment de {cup}.","es":"En el compartimento de {cup}.","pt":"No compartimento de {cup}.","it":"Nello scomparto da {cup}.","nl":"In het vakje voor {cup}.","sv":"I facket för {cup}.","da":"I rummet til {cup}.","no":"I rommet for {cup}.","fi":"Lokeroon: {cup}."},
    aOut: {"en":"{coin}, back out.","de":"{coin} wieder heraus.","fr":"Retirée : {coin}.","es":"Sale: {coin}.","pt":"Saiu: {coin}.","it":"Tolta: {coin}.","nl":"Terug: {coin}.","sv":"Tillbaka: {coin}.","da":"Tilbage: {coin}.","no":"Tilbake: {coin}.","fi":"Pois: {coin}."},
    aToTray: {"en":"{coin}, to the customer.","de":"{coin} zum Kunden.","fr":"Pour le client : {coin}.","es":"Para el cliente: {coin}.","pt":"Para o cliente: {coin}.","it":"Al cliente: {coin}.","nl":"Naar de klant: {coin}.","sv":"Till kunden: {coin}.","da":"Til kunden: {coin}.","no":"Til kunden: {coin}.","fi":"Asiakkaalle: {coin}."},
    aBounce: {"en":"That cup is for {cup}.","de":"Dieses Fach ist für {cup}.","fr":"Ce compartiment est pour {cup}.","es":"Ese compartimento es para {cup}.","pt":"Este compartimento é para {cup}.","it":"Questo scomparto è per {cup}.","nl":"Dit vakje is voor {cup}.","sv":"Det facket är för {cup}.","da":"Det rum er til {cup}.","no":"Det rommet er for {cup}.","fi":"Tämä lokero on kolikoille {cup}."},
    aCoin: {"en":"{amt} coin","de":"{amt}-Münze","fr":"pièce de {amt}","es":"moneda de {amt}","pt":"moeda de {amt}","it":"moneta da {amt}","nl":"munt van {amt}","sv":"mynt på {amt}","da":"mønt på {amt}","no":"mynt på {amt}","fi":"kolikko {amt}"},
    aNote: {"en":"{amt} bill","de":"{amt}-Schein","fr":"billet de {amt}","es":"billete de {amt}","pt":"cédula de {amt}","it":"banconota da {amt}","nl":"biljet van {amt}","sv":"sedel på {amt}","da":"seddel på {amt}","no":"seddel på {amt}","fi":"seteli {amt}"},
    aTensUp: {"en":"Tens up","de":"Zehner höher","fr":"Dizaines plus","es":"Decenas más","pt":"Dezenas para cima","it":"Decine su","nl":"Tientallen omhoog","sv":"Tiotal upp","da":"Tiere op","no":"Tiere opp","fi":"Kymmeniä ylös"},
    aTensDown: {"en":"Tens down","de":"Zehner niedriger","fr":"Dizaines moins","es":"Decenas menos","pt":"Dezenas para baixo","it":"Decine giù","nl":"Tientallen omlaag","sv":"Tiotal ned","da":"Tiere ned","no":"Tiere ned","fi":"Kymmeniä alas"},
    aOnesUp: {"en":"Ones up","de":"Einer höher","fr":"Unités plus","es":"Unidades más","pt":"Unidades para cima","it":"Unità su","nl":"Eenheden omhoog","sv":"Ental upp","da":"Enere op","no":"Enere opp","fi":"Ykkösiä ylös"},
    aOnesDown: {"en":"Ones down","de":"Einer niedriger","fr":"Unités moins","es":"Unidades menos","pt":"Unidades para baixo","it":"Unità giù","nl":"Eenheden omlaag","sv":"Ental ned","da":"Enere ned","no":"Enere ned","fi":"Ykkösiä alas"},
    name1: {"en":"penny","de":"penny","fr":"penny","es":"penny","pt":"penny","it":"penny","nl":"penny","sv":"penny","da":"penny","no":"penny","fi":"penny"},
    name5: {"en":"nickel","de":"nickel","fr":"nickel","es":"nickel","pt":"nickel","it":"nickel","nl":"nickel","sv":"nickel","da":"nickel","no":"nickel","fi":"nickel"},
    name10: {"en":"dime","de":"dime","fr":"dime","es":"dime","pt":"dime","it":"dime","nl":"dime","sv":"dime","da":"dime","no":"dime","fi":"dime"},
    name25: {"en":"quarter","de":"quarter","fr":"quarter","es":"quarter","pt":"quarter","it":"quarter","nl":"quarter","sv":"quarter","da":"quarter","no":"quarter","fi":"quarter"},
    nameBill: {"en":"one-dollar bill","de":"one-dollar bill","fr":"one-dollar bill","es":"one-dollar bill","pt":"one-dollar bill","it":"one-dollar bill","nl":"one-dollar bill","sv":"one-dollar bill","da":"one-dollar bill","no":"one-dollar bill","fi":"one-dollar bill"}
  },/*STRINGS-END*/
  defaults: { level: '1', key: 'on' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }] },
    { key: 'key', type: 'choice', labelKey: 'setKey', options: [{ value: 'on', labelKey: 'kOn' }, { value: 'off', labelKey: 'kOff' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._themes = {}; this._picsReady = false; this._sideHist = [];
    injectWorthTillCSS();
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function () { self._picsReady = true; });
    } else this._picsReady = true;
  },
  destroy: function () { this._clearTimers(); this._endDrag(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  /* da writes «13 kr.» — at a sentence end the abbreviation's own period closes the sentence (never «kr..») */
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }).replace(/kr\.\./g, 'kr.'); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _level: function () { return WorthTillCore.levelOf(this._setting('level')); },
  _keyOn: function () { return this._setting('key') !== 'off'; },
  _loc: function () { return WorthTillCore.locOf(this.api && this.api.lang); },
  _fam: function () { return WorthTillCore.famOf(this._loc()); },
  _key: function () { return this._fam() + '.' + this._level(); },

  /* ---------------- money words ---------------- */
  /* the amount as a child reads it in its own country (no decimals at this grade) */
  _money: function (v) {
    var l = this._loc(), nb = ' ', e = Math.floor(v / 100), c = v % 100;
    if (l === 'en') return v >= 100 && c === 0 ? '$' + e : v + '¢';
    if (l === 'es') return '$' + v;
    if (l === 'sv' || l === 'no') return v + nb + 'kr';
    if (l === 'da') return v + nb + 'kr.';
    var U = { de: ['ct', '€'], fr: ['c', '€'], fi: ['snt', '€'], it: ['cent', 'euro'], nl: ['cent', 'euro'], pt: ['centavos', 'real'] }[l];
    if (v < 100) return v + nb + U[0];
    return e + nb + (l === 'pt' && e > 1 ? 'reais' : U[1]) + (c ? nb + c + nb + U[0] : '');
  },
  /* the drawer numeral of a cup: [number, unit] */
  _cupLabel: function (v) {
    var l = this._loc();
    if (l === 'en') return [String(v), '¢'];
    if (l === 'es') return ['$' + v, ''];
    if (l === 'sv' || l === 'no') return [String(v), 'kr'];
    if (l === 'da') return [String(v), 'kr.'];
    return [String(v), { de: 'ct', fr: 'c', fi: 'snt', it: 'cent', nl: 'cent', pt: 'centavos' }[l]];
  },
  _coinName: function (v) {
    var c = WorthTillCore.coin(this._fam(), v);
    if (this._loc() === 'en') return this._t(c && c.note ? 'nameBill' : 'name' + v);
    /* de couples the compound: «10-ct-Münze» */
    var amt = this._money(v); if (this._loc() === 'de') amt = amt.replace(/ /g, '-');
    return this._t(c && c.note ? 'aNote' : 'aCoin', { amt: amt });
  },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = WorthTillCore.rounds(this._fam(), this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = WorthTillCore, pool = this._ensurePool(), n = C.passSize(), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._fam(), this._level(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'worth-till.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var r = this.st.round, k = r.kind;
    var key = { count: 'pCount', exact: 'pExact', fewest: 'pFewest', trade: 'pTrade', two: 'pTwo', change: 'pChange', enough: 'pEnough', purse: 'pPurse' }[k];
    return this._t(key, { price: this._money(r.price || 0), paid: this._money(r.paid || 0) });
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    /* the purse side is drawn per showing */
    this.st = WorthTillCore.newState(this._fam(), this._level(), k, Math.random() < 0.5 ? 1 : 0);
    this._view = { note: '', soft: false, sel: null, bounce: null, nod: null, rail: 0 };
    this._setPrompt();
    if (this._wrap) this._paint();
  },

  /* ---------------- render ---------------- */
  render: function () { this._ensurePool(); if (!this.st) this._start(this._order ? this._order[0] : 0); this._render2(); this._watchWidth(); },
  _width: function () {
    var s = this.api && this.api.stage, w = 0;
    if (this._wrap && this._wrap.isConnected) w = Math.floor(this._wrap.getBoundingClientRect().width);
    else if (s) { var cs = getComputedStyle(s); w = s.clientWidth - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0); }
    return w > 160 ? w : 600;
  },
  _watchWidth: function () {
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected || self._drag) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'wt-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="wt-top" data-qa="top"></div><div class="wt-counter" data-qa="counter"></div><div class="wt-rail" data-qa="rail"></div><div class="wt-till" data-qa="till"></div><div class="wt-ctrl"></div><p class="wt-note" data-qa="note" aria-live="polite"></p><div class="wt-sr" aria-live="polite"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _geometry: function (W) {
    var wide = W >= 560, cramp = W < 330;
    return { W: W, wide: wide, cramp: cramp, k: wide ? 3.0 : cramp ? 2.1 : 2.5, cup: wide ? 64 : cramp ? 46 : 52, pic: wide ? 112 : cramp ? 64 : 72, otter: wide ? 96 : 64 };
  },
  _paint: function () {
    if (!this._wrap) return;
    var a = document.activeElement, had = !!(a && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _paint_: function () {
    var st = this.st, v = this._view, g = this._g = this._geometry(this._width());
    this._wrap.className = 'wt-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '');
    this._paintTop(); this._paintCounter(); this._paintRail(); this._paintTill(); this._paintCtrl();
    var note = this._qs('.wt-note');
    note.textContent = v.note || ''; note.className = 'wt-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _pic: function (theme, noun, size, cls) {
    var loc = this._loc();
    if (!this._picsReady || typeof LCSPictures === 'undefined' || !this._themes[theme]) { var d = this.api.el('div', cls + ' wt-picwait'); d.style.width = size + 'px'; d.style.height = size + 'px'; return d; }
    var im = LCSPictures.img(this._themes[theme], noun, loc, { size: size }); im.className = cls; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  /* a coin, true to size: metal, rim, reeded edge, centre hole; the worth numeral on every coin, the US ones too (operator ruling 2026-10-30, extended to this activity 2026-10-31) */
  _coinSvg: function (v, px, opt) {
    opt = opt || {};
    var C = WorthTillCore, c = C.coin(this._fam(), v), loc = this._loc();
    if (c.note) {
      var w = Math.round(px * 1.9), h = px;
      var fill = { green: '#9CC69B', blue: '#8DB4E2', purple: '#C3A6DC' }[c.metal];
      return '<svg class="wt-coinsvg" viewBox="0 0 120 60" width="' + w + '" height="' + h + '" aria-hidden="true"><rect x="2" y="2" width="116" height="56" rx="6" fill="' + fill + '" stroke="#2B2B2B" stroke-width="3"/><rect x="10" y="10" width="100" height="40" rx="4" fill="none" stroke="#2B2B2B" stroke-opacity=".35" stroke-width="2"/><text x="60" y="41" text-anchor="middle" class="wt-notenum">' + this._esc(loc === 'en' ? '$' + v / 100 : loc === 'es' ? '$' + v : v + ' kr') + '</text></svg>';
    }
    var M = { copper: ['#C97B43', '#8E5124'], silver: ['#C9CDD2', '#7D838A'], gold: ['#E1BE4E', '#9C7A16'] };
    var o = '<svg class="wt-coinsvg" viewBox="0 0 100 100" width="' + px + '" height="' + px + '" aria-hidden="true">';
    if (c.metal === 'bi-sg' || c.metal === 'bi-gs') {
      var outer = c.metal === 'bi-sg' ? M.gold : M.silver, inner = c.metal === 'bi-sg' ? M.silver : M.gold;
      o += '<circle cx="50" cy="50" r="47" fill="' + outer[0] + '" stroke="' + outer[1] + '" stroke-width="3"/><circle cx="50" cy="50" r="31" fill="' + inner[0] + '" stroke="' + inner[1] + '" stroke-width="2"/>';
    } else {
      var m = M[c.metal];
      o += '<circle cx="50" cy="50" r="47" fill="' + m[0] + '" stroke="' + m[1] + '" stroke-width="3"/><circle cx="50" cy="50" r="40" fill="none" stroke="' + m[1] + '" stroke-opacity=".45" stroke-width="2"/>';
      if (c.reeded) for (var i = 0; i < 48; i++) { var a = i * 7.5 * Math.PI / 180; o += '<path d="M' + (50 + 44 * Math.cos(a)).toFixed(1) + ' ' + (50 + 44 * Math.sin(a)).toFixed(1) + 'L' + (50 + 48 * Math.cos(a)).toFixed(1) + ' ' + (50 + 48 * Math.sin(a)).toFixed(1) + '" stroke="' + m[1] + '" stroke-width="1.6"/>'; }
    }
    if (c.hole) o += '<circle cx="50" cy="50" r="12" fill="#FFF8E7" stroke="' + (M[c.metal] || M.silver)[1] + '" stroke-width="2"/>';
    var num = v >= 100 ? String(v / 100) : String(v);
    o += '<text x="50" y="' + (c.hole ? 36 : 50) + '" dy=".35em" text-anchor="middle" class="wt-coinnum" font-size="' + (c.hole ? 22 : 38) + '">' + num + '</text>';
    return o + '</svg>';
  },
  _coinPx: function (v) { var c = WorthTillCore.coin(this._fam(), v); return c.note ? Math.round(30 * this._g.k / 2.5 * 1.4) : Math.round(c.d * this._g.k); },

  _paintTop: function () {
    var st = this.st, r = st.round, g = this._g, el = this._qs('.wt-top'), self = this;
    el.innerHTML = '';
    var otter = this._pic('zoo-animals', 'otter', g.otter, 'wt-otter' + (st.done ? ' is-hop' : '')); otter.alt = ''; otter.setAttribute('data-otter', '1'); el.appendChild(otter);
    if (r.item) {
      var goods = this.api.el('div', 'wt-goods');
      var pic = this._pic('beach', r.item, g.pic, 'wt-item'); pic.alt = ''; goods.appendChild(pic);
      if (st.done && r.kind !== 'enough') goods.insertAdjacentHTML('beforeend', '<svg class="wt-bag" viewBox="0 0 60 70" aria-hidden="true"><path d="M8 18 L52 18 L56 68 L4 68 Z" fill="#D9B98A" stroke="#7A5E14" stroke-width="2"/><path d="M8 18 L14 8 L46 8 L52 18" fill="#E7C9A0" stroke="#7A5E14" stroke-width="2"/></svg>');
      var tag = this.api.el('div', 'wt-tag'); tag.setAttribute('data-price', r.price); tag.textContent = this._money(r.price); goods.appendChild(tag);
      el.appendChild(goods);
    }
    /* the dish: the coin to change, the way Pip paid, or the customer's payment */
    var dishCoins = r.kind === 'trade' ? [r.price] : r.kind === 'two' ? r.shown : r.kind === 'change' ? r.payWith : null;
    if (dishCoins) {
      var dish = this.api.el('div', 'wt-dish'); dish.setAttribute('data-dish', dishCoins.join(','));
      dishCoins.forEach(function (v) { dish.insertAdjacentHTML('beforeend', '<span class="wt-dishcoin">' + self._coinSvg(v, self._coinPx(v)) + '<span class="wt-sr">' + self._esc(self._coinName(v)) + '</span></span>'); });
      el.appendChild(dish);
    }
  },
  _looseCoin: function (c, box) {
    var self = this, v = this._view, px = this._coinPx(c.v), ghost = (this.st.bounces[c.id] || 0) >= 2;
    var b = this._btn('wt-coin' + (v.sel === c.id ? ' is-sel' : '') + (v.bounce === c.id ? ' is-bounce' : ''), 'coin-' + c.id, this._coinName(c.v), this._coinSvg(c.v, px, { ghost: ghost }));
    b.setAttribute('data-coin', c.v); b.setAttribute('data-id', c.id); b.disabled = this.st.done;
    b.style.width = Math.max(44, px) + 'px'; b.style.height = Math.max(44, px) + 'px';
    b.addEventListener('pointerdown', function (e) { if (e.button || self.st.done) return; self._press(e, c.id); });
    b.addEventListener('click', function (e) { if (e.detail === 0) self._select(c.id); });
    box.appendChild(b);
  },
  _paintCounter: function () {
    var st = this.st, r = st.round, el = this._qs('.wt-counter'), self = this, C = WorthTillCore;
    el.innerHTML = ''; el.className = 'wt-counter is-' + r.kind;
    if (r.kind === 'change') { el.style.display = 'none'; return; }
    el.style.display = '';
    if (r.kind === 'purse') {
      var order = st.side ? [['b', r.b], ['a', r.a]] : [['a', r.a], ['b', r.b]];
      order.forEach(function (p, i) {
        var side = i ? 'right' : 'left', b = self._btn('wt-purse is-' + (i ? 'teal' : 'coral') + (st.choice === side ? ' is-chosen' : ''), 'purse-' + side, self._t(i ? 'aPurseR' : 'aPurseL'), '');
        b.setAttribute('data-purse', p[0]); b.disabled = st.done;
        var inner = '<span class="wt-clasp" aria-hidden="true"></span><span class="wt-pursecoins">';
        C.desc(p[1]).forEach(function (v) { inner += '<span class="wt-pc">' + self._coinSvg(v, Math.round(self._coinPx(v) * 0.62)) + '</span>'; });
        b.innerHTML = inner + '</span>';
        b.addEventListener('click', function () { if (C.choose(st, side)) self._moved(); });
        el.appendChild(b);
      });
      return;
    }
    var box = this.api.el('div', r.kind === 'count' ? 'wt-spill' : 'wt-pursebox');
    if (r.kind !== 'count') box.insertAdjacentHTML('beforeend', '<span class="wt-clasp" aria-hidden="true"></span>');
    var loose = st.coins.filter(function (c) { return c.at === 'counter' || c.at === 'purse'; });
    /* a counter emptied into the till steps aside (the purse stays: it is where the money comes from) */
    if (r.kind === 'count' && !loose.length) { el.style.display = 'none'; return; }
    loose.forEach(function (c) { self._looseCoin(c, box); });
    if (!loose.length) box.insertAdjacentHTML('beforeend', '<span class="wt-empty" aria-hidden="true"></span>');
    el.appendChild(box);
  },
  _paintRail: function () {
    var st = this.st, v = this._view, el = this._qs('.wt-rail'), self = this, C = WorthTillCore;
    el.innerHTML = '';
    if (!v.rail || st.done) { el.style.display = 'none'; return; }
    el.style.display = '';
    var R = C.rail(st), nums = v.rail >= 2, r = st.round;
    R.rows.forEach(function (row, ri) {
      var line = self.api.el('div', 'wt-railrow');
      if (R.rows.length > 1) line.insertAdjacentHTML('beforeend', '<span class="wt-railsw is-' + (ri ? 'teal' : 'coral') + '" aria-hidden="true"></span>');
      if (R.start != null) line.insertAdjacentHTML('beforeend', '<span class="wt-railstart">' + self._esc(self._money(R.start)) + '</span>');
      row.forEach(function (p, i) {
        var last = i === row.length - 1, n = nums ? (R.hideLast && last ? '?' : self._money(p.run)) : '';
        line.insertAdjacentHTML('beforeend', '<span class="wt-railcoin" style="animation-delay:' + (i * 0.25) + 's"><span class="wt-run" data-run="' + (nums ? (R.hideLast && last ? '?' : p.run) : '') + '">' + self._esc(n) + '</span>' + self._coinSvg(p.v, 34) + '</span>');
      });
      if (R.target != null) line.insertAdjacentHTML('beforeend', '<span class="wt-railgoal" data-goal="' + R.target + '">' + self._esc(self._money(R.target)) + '</span>');
      el.appendChild(line);
    });
  },
  _paintTill: function () {
    var st = this.st, r = st.round, g = this._g, el = this._qs('.wt-till'), self = this, C = WorthTillCore, v = this._view;
    el.innerHTML = ''; el.className = 'wt-till' + (st.done ? ' is-shut' : '');
    /* a purse round takes no coins: the till steps aside */
    el.style.display = r.kind === 'purse' ? 'none' : '';
    if (r.kind === 'purse') return;
    /* cups share the drawer's width, never below a 44 px tap; six cups close their gaps */
    var cups = C.cups(st.fam), n = cups.length, gap = g.wide ? 10 : n > 5 ? 2 : 5, cw = Math.max(44, Math.min(n > 5 ? 52 : g.cup, Math.floor((g.W - 12 - gap * (n - 1)) / n)));
    el.style.gap = gap + 'px';
    cups.forEach(function (cv) {
      var inTill = st.coins.filter(function (c) { return c.at === 'till' && c.v === cv; }), lid = C.lidded(st, cv);
      var b = self._btn('wt-cup' + (v.nod === cv ? ' is-nod' : '') + (lid ? ' is-lid' : ''), 'cup-' + cv, self._t('aCup', { amt: self._money(cv) }), '');
      b.setAttribute('data-cup', cv); b.setAttribute('data-n', inTill.length); b.disabled = st.done || lid;
      b.style.width = cw + 'px'; b.style.flex = 'none';
      /* the key: the coin itself on the cup's lip (its own face, numeral and all) */
      /* the stack: each coin an edge-on slab, 0.6 × its counter size, capped at the cup */
      var c = C.coin(st.fam, cv), sw = Math.min(cw - 8, Math.round(c.d * g.k * 0.6)), H = g.cramp ? 50 : 66, o = '<svg class="wt-cupsvg" viewBox="0 0 ' + cw + ' ' + H + '" width="' + cw + '" height="' + H + '" aria-hidden="true">';
      o += '<rect x="2" y="6" width="' + (cw - 4) + '" height="' + (H - 8) + '" rx="10" class="wt-well"/>';
      var shown = Math.min(inTill.length, 8), M = { copper: '#C97B43', silver: '#C9CDD2', gold: '#E1BE4E', 'bi-sg': '#E1BE4E', 'bi-gs': '#C9CDD2' }[c.metal];
      for (var i = 0; i < shown; i++) { var y = H - 10 - i * 6; o += '<ellipse cx="' + cw / 2 + '" cy="' + y + '" rx="' + sw / 2 + '" ry="4" fill="' + M + '" stroke="#5E5A52" stroke-width="1.2"/>'; }
      if (lid) o += '<rect x="0" y="2" width="' + cw + '" height="14" rx="6" class="wt-lidbar"/>';
      b.innerHTML = o + '</svg>';
      if (self._keyOn() && !lid) b.insertAdjacentHTML('beforeend', '<span class="wt-keycoin" aria-hidden="true">' + self._coinSvg(cv, Math.round(Math.min(30, c.d * g.k * 0.4))) + '</span>');
      var lab = self._cupLabel(cv);
      b.insertAdjacentHTML('beforeend', '<span class="wt-cuplab" aria-hidden="true"><b>' + self._esc(lab[0]) + '</b>' + (lab[1] ? '<i' + (lab[1].length > 4 ? ' class="is-long"' : '') + '>' + self._esc(lab[1]) + '</i>' : '') + '</span>');
      b.addEventListener('click', function () { self._cupTap(cv); });
      el.appendChild(b);
    });
  },
  _paintCtrl: function () {
    var st = this.st, r = st.round, el = this._qs('.wt-ctrl'), self = this, C = WorthTillCore;
    el.innerHTML = '';
    if (r.kind === 'count') {
      var dial = this.api.el('div', 'wt-dial'); dial.setAttribute('data-dial', C.dialValue(st));
      ['t', 'o'].forEach(function (w) {
        var col = self.api.el('div', 'wt-wheel');
        var up = self._btn('wt-spin', 'up-' + w, self._t(w === 't' ? 'aTensUp' : 'aOnesUp'), '▲'); up.disabled = st.done;
        up.addEventListener('click', function () { if (C.spin(st, w, 1)) self._moved(); });
        var dn = self._btn('wt-spin', 'down-' + w, self._t(w === 't' ? 'aTensDown' : 'aOnesDown'), '▼'); dn.disabled = st.done;
        dn.addEventListener('click', function () { if (C.spin(st, w, -1)) self._moved(); });
        /* on a phone the wheel lies flat: ▼ digit ▲ */
        var dig = '<span class="wt-digit" data-wheel="' + w + '">' + st.dial[w] + '</span>';
        if (self._g.wide) { col.appendChild(up); col.insertAdjacentHTML('beforeend', dig); col.appendChild(dn); } else { col.appendChild(dn); col.insertAdjacentHTML('beforeend', dig); col.appendChild(up); }
        dial.appendChild(col);
      });
      var unit = this._cupLabel(1)[1] || '';
      if (this._loc() === 'es') dial.insertAdjacentHTML('afterbegin', '<span class="wt-dialunit">$</span>');
      else dial.insertAdjacentHTML('beforeend', '<span class="wt-dialunit' + (unit.length > 4 ? ' is-long' : '') + '">' + this._esc(unit) + '</span>');
      el.appendChild(dial);
    }
    if (r.kind === 'enough') {
      ['yes', 'no'].forEach(function (c) {
        var b = self._btn('wt-yn' + (st.choice === c ? ' is-chosen' : ''), 'choose-' + c, null, self._esc(self._t(c === 'yes' ? 'bEnough' : 'bNot')));
        b.disabled = st.done; b.setAttribute('aria-pressed', st.choice === c ? 'true' : 'false');
        b.addEventListener('click', function () { if (C.choose(st, c)) self._moved(); });
        el.appendChild(b);
      });
    }
    if (r.kind === 'change') {
      var tray = this.api.el('div', 'wt-tray'); tray.setAttribute('data-tray', C.sum(C.at(st, 'tray')));
      tray.setAttribute('aria-label', this._t('aTray'));
      var tc = st.coins.filter(function (c) { return c.at === 'tray'; });
      tc.forEach(function (c) {
        var px = self._coinPx(c.v), b = self._btn('wt-coin is-tray', 'tray-' + c.id, self._coinName(c.v), self._coinSvg(c.v, px));
        b.style.width = Math.max(44, px) + 'px'; b.style.height = Math.max(44, px) + 'px'; b.disabled = st.done;
        b.addEventListener('click', function () { if (C.trayBack(st, c.id)) { self.api.sound(420); self._moved(); } });
        tray.appendChild(b);
      });
      if (!tc.length) tray.insertAdjacentHTML('beforeend', '<span class="wt-empty" aria-hidden="true"></span>');
      el.appendChild(tray);
    }
    var go = this._btn('wt-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = st.done; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { var v = this._view; v.note = ''; v.rail = 0; this._paint(); },
  _select: function (id) { var v = this._view; v.sel = v.sel === id ? null : id; this.api.sound(560); this._paint(); },
  _cupTap: function (cv) {
    var v = this._view, st = this.st;
    if (v.sel != null) { var id = v.sel; v.sel = null; this._dropTo(id, cv); return; }
    var c = WorthTillCore.takeTop(st, cv);
    if (c) { this.api.sound(480); this._moved(); this.api.announce(this._t(st.round.kind === 'change' ? 'aToTray' : 'aOut', { coin: this._coinName(c.v) })); }
  },
  _dropTo: function (id, cv) {
    var st = this.st, v = this._view, self = this, res = WorthTillCore.drop(st, id, cv);
    if (res.result === 'in') { this.api.sound(700); this._moved(); this.api.announce(this._t('aIn', { cup: this._money(cv) })); return; }
    if (res.result === 'lid') { this.api.sound(200); v.note = this._t('hintLid'); v.soft = true; this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'bounce') {
      v.bounce = id; v.nod = cv; this.api.sound(260); this._paint(); this.api.announce(this._t('aBounce', { cup: this._money(cv) }));
      this._later(function () { v.bounce = null; v.nod = null; if (self._wrap) self._paint(); }, 420);
    }
  },
  _press: function (e, id) {
    var self = this, x0 = e.clientX, y0 = e.clientY, moved = false, ghost = null, src = e.currentTarget;
    e.preventDefault();
    this._endDrag();
    var mv = function (ev) {
      var dx = ev.clientX - x0, dy = ev.clientY - y0;
      if (!moved && dx * dx + dy * dy < 49) return;
      ev.preventDefault();
      if (!moved) { moved = true; ghost = src.cloneNode(true); ghost.className += ' is-ghostdrag'; ghost.removeAttribute('data-k'); document.body.appendChild(ghost); src.style.opacity = '.3'; }
      ghost.style.left = (ev.clientX - ghost.offsetWidth / 2) + 'px'; ghost.style.top = (ev.clientY - ghost.offsetHeight / 2) + 'px';
    };
    var up = function (ev) {
      self._endDrag();
      if (ghost) { ghost.remove(); src.style.opacity = ''; }
      if (!moved) { self._select(id); return; }
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), cup = hit && hit.closest ? hit.closest('[data-cup]') : null;
      if (cup && !cup.disabled) self._dropTo(id, +cup.getAttribute('data-cup'));
      else if (cup && cup.classList.contains('is-lid')) self._dropTo(id, +cup.getAttribute('data-cup'));
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  _check: function () {
    var st = this.st, v = this._view, C = WorthTillCore; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') { v.note = this._t(res.key); v.soft = true; this.api.sound(300); this._paint(); this.api.announce(v.note); return; }
    if (res.result === 'ok') { this._success(); return; }
    v.rail = st.help ? 2 : 1; v.soft = false;
    v.note = this._t(C.hint(st), this._args());
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  /* the numbers the bubble names */
  _args: function () {
    var st = this.st, r = st.round, C = WorthTillCore, self = this, R = C.rail(st);
    var steps = R.rows[0].map(function (p) { return self._money(p.run); });
    var total = r.kind === 'count' ? r.total : r.kind === 'enough' ? C.sum(r.purse) : r.kind === 'change' ? C.sum(C.at(st, 'tray')) : C.sum(C.paid(st));
    var a = { price: this._money(r.price || 0), paid: this._money(r.paid || 0), change: this._money((r.paid || 0) - (r.price || 0)), total: this._money(total), steps: steps.slice(0, -1).join(', '), n: C.paid(st).length };
    if (r.kind === 'purse') { var sa = C.sum(r.a), sb = C.sum(r.b); a.big = this._money(Math.max(sa, sb)); a.small = this._money(Math.min(sa, sb)); }
    if (!a.steps) a.steps = steps.join(', ');
    return a;
  },
  _success: function () {
    var st = this.st, v = this._view, C = WorthTillCore;
    var msg = this._t(C.okKey(st), this._args());
    v.note = ''; v.rail = 0; v.sel = null;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectWorthTillCSS() {
  if (typeof document === 'undefined' || document.getElementById('wt-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.wt-wrap{position:relative;width:100%;max-width:680px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .wt-wrap:focus{outline:none;}'
  + '.wt-top{display:flex;align-items:flex-end;justify-content:center;gap:14px;width:100%;min-height:64px;padding:6px 8px 0;border-top:20px solid transparent;border-image:repeating-linear-gradient(90deg,#146B5E 0 22px,#FFF8E7 22px 44px) 20;} .wt-wrap.is-narrow .wt-top{border-top-width:10px;padding-top:2px;}'
  + '.wt-otter{display:block;} .wt-otter.is-hop{animation:wtHop .5s ease 2;} @keyframes wtHop{50%{transform:translateY(-12px);}}'
  + '.wt-goods{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;} .wt-item{display:block;} .wt-picwait{display:block;}'
  + '.wt-tag{font-family:' + H + ';font-weight:800;font-size:28px;line-height:1.1;color:' + INK + ';background:#FFF8E7;border:3px solid ' + INK + ';border-radius:8px;padding:0 10px;white-space:nowrap;} .wt-wrap.is-narrow .wt-tag{font-size:22px;}'
  + '.wt-bag{position:absolute;left:50%;top:6%;width:62%;height:auto;transform:translateX(-50%);animation:wtBag .4s ease;} @keyframes wtBag{from{transform:translateX(-50%) scale(.3);opacity:0;}}'
  + '.wt-dish{display:flex;align-items:center;justify-content:center;gap:4px;flex-wrap:wrap;max-width:200px;padding:8px 10px;border-radius:50%/40%;background:#E9E2D2;box-shadow:inset 0 3px 0 rgba(0,0,0,.12);} .wt-dishcoin{display:block;line-height:0;}'
  + '.wt-counter{width:100%;display:flex;justify-content:center;gap:12px;} .wt-spill,.wt-pursebox{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;width:100%;min-height:72px;padding:12px;border-radius:16px;background:#E7C9A0;box-shadow:inset 0 0 0 3px ' + INK + ';}'
  + '.wt-pursebox{background:#9B6B43;border-radius:22px;padding-top:22px;} .wt-clasp{position:absolute;top:4px;left:50%;width:34px;height:12px;margin-left:-17px;border-radius:6px;background:#C9A23A;box-shadow:inset 0 0 0 2px #7A5E14;}'
  + '.wt-coin{position:relative;display:flex;align-items:center;justify-content:center;padding:0;border:0;background:none;border-radius:50%;cursor:grab;touch-action:none;line-height:0;} .wt-coin:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.wt-coin.is-sel{transform:translateY(-6px) scale(1.1);filter:drop-shadow(0 4px 0 rgba(20,107,94,.6));} .wt-coin.is-bounce{animation:wtBounce .4s ease;} @keyframes wtBounce{30%{transform:translateY(-18px) rotate(-12deg);}60%{transform:translateY(0) rotate(8deg);}}'
  + '.wt-coin.is-ghostdrag{position:fixed;z-index:50;pointer-events:none;transform:scale(1.1);}'
  + '.wt-coinnum{font-family:' + H + ';font-weight:800;fill:#2B2B2B;fill-opacity:.7;} .wt-coinnum.is-ghost{fill-opacity:.28;} .wt-notenum{font-family:' + H + ';font-weight:800;font-size:28px;fill:#2B2B2B;}'
  + '.wt-empty{display:block;width:44px;height:44px;}'
  + '.wt-purse{position:relative;flex:1 1 0;max-width:300px;min-height:96px;padding:22px 10px 12px;border:0;border-radius:24px;cursor:pointer;} .wt-purse.is-coral{background:#F2A07F;} .wt-purse.is-teal{background:#7FC0B4;} .wt-purse.is-chosen{box-shadow:0 0 0 5px ' + INK + ';transform:translateY(-4px);} .wt-pursecoins{display:flex;flex-wrap:wrap;justify-content:center;gap:4px;line-height:0;}'
  + '.wt-rail{display:flex;flex-direction:column;gap:6px;width:100%;padding:6px 10px;border-radius:12px;background:#FFF8E7;box-shadow:inset 0 0 0 2px #E2D6BF;} .wt-railrow{display:flex;align-items:flex-end;justify-content:center;flex-wrap:wrap;gap:6px;}'
  + '.wt-railcoin{display:flex;flex-direction:column;align-items:center;line-height:1;animation:wtPop .35s ease both;} @keyframes wtPop{from{transform:translateY(-16px);opacity:0;}} .wt-run{font-family:' + H + ';font-weight:800;font-size:17px;color:#146B5E;min-height:20px;white-space:nowrap;}'
  + '.wt-railstart,.wt-railgoal{font-family:' + H + ';font-weight:800;font-size:18px;padding:2px 8px;border-radius:8px;white-space:nowrap;} .wt-railstart{background:#E9E2D2;} .wt-railgoal{background:#FDE3D6;color:#C4522F;border:2px dashed #C4522F;} .wt-railsw{width:16px;height:16px;border-radius:50%;align-self:center;} .wt-railsw.is-coral{background:#F2A07F;} .wt-railsw.is-teal{background:#7FC0B4;}'
  + '.wt-till{display:flex;justify-content:center;align-items:flex-start;gap:10px;width:100%;padding:12px 10px 10px;border-radius:14px;background:#B98552;box-shadow:inset 0 0 0 3px ' + INK + ',0 4px 0 #6E4A27;} .wt-till.is-shut{filter:saturate(.7) brightness(.95);}'
  + '.wt-wrap.is-narrow .wt-till{gap:5px;padding:10px 6px 8px;} .wt-wrap.is-cramp .wt-till{padding:8px 4px 6px;} .wt-wrap.is-cramp .wt-spill,.wt-wrap.is-cramp .wt-pursebox{padding:8px;gap:6px;min-height:60px;} .wt-wrap.is-cramp .wt-pursebox{padding-top:18px;} .wt-wrap.is-cramp{gap:6px;}'
  + '.wt-cup{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;padding:0 0 2px;border:0;background:none;cursor:pointer;line-height:1;min-height:44px;} .wt-cup:focus-visible{outline:3px solid #FFF8E7;outline-offset:2px;border-radius:10px;}'
  + '.wt-well{fill:#4A3220;stroke:' + INK + ';stroke-width:2;} .wt-lidbar{fill:#7A5232;stroke:' + INK + ';stroke-width:2;} .wt-cup.is-lid{opacity:.85;cursor:not-allowed;} .wt-cup.is-nod{animation:wtNod .4s ease;} @keyframes wtNod{30%{transform:rotate(-6deg);}70%{transform:rotate(5deg);}}'
  + '.wt-keycoin{position:absolute;top:-8px;right:-6px;line-height:0;}'
  + '.wt-cuplab{display:flex;align-items:baseline;gap:1px;font-family:' + H + ';color:#FFF8E7;white-space:nowrap;} .wt-cuplab b{font-size:24px;font-weight:800;} .wt-cuplab i{font-style:normal;font-weight:800;font-size:14px;} .wt-cuplab{flex-wrap:wrap;justify-content:center;} .wt-cuplab i.is-long{flex-basis:100%;text-align:center;font-size:11px;margin-top:-3px;} .wt-wrap.is-narrow .wt-cuplab b{font-size:20px;} .wt-wrap.is-narrow .wt-cuplab i{font-size:12px;}'
  + '.wt-ctrl{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;width:100%;}'
  + '.wt-dial{display:flex;align-items:center;gap:6px;padding:6px 10px;border-radius:14px;background:#FFF8E7;box-shadow:inset 0 0 0 3px ' + INK + ';} .wt-wheel{display:flex;flex-direction:column;align-items:center;} .wt-wrap.is-narrow .wt-wheel{flex-direction:row;gap:2px;} .wt-wrap.is-narrow .wt-spin{width:44px;} .wt-wrap.is-narrow .wt-digit{font-size:36px;min-width:30px;} .wt-wrap.is-narrow .wt-dial{padding:4px 6px;gap:4px;}'
  + '.wt-spin{width:52px;height:44px;border:0;border-radius:10px;background:#DDF1EC;color:#146B5E;font-size:20px;cursor:pointer;} .wt-digit{font-family:' + H + ';font-weight:800;font-size:44px;line-height:1.1;color:' + INK + ';min-width:44px;text-align:center;} .wt-dialunit{font-family:' + H + ';font-weight:800;font-size:26px;color:' + INK + ';} .wt-dialunit.is-long{font-size:15px;} .wt-wrap.is-narrow .wt-dialunit{font-size:18px;} .wt-wrap.is-narrow .wt-dialunit.is-long{font-size:12px;}'
  + '.wt-yn{min-width:140px;height:60px;padding:0 16px;border:0;border-radius:14px;background:#FFF8E7;box-shadow:inset 0 0 0 3px ' + INK + ',0 3px 0 #CFC4AE;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .wt-wrap.is-narrow .wt-yn{min-width:0;flex:1 1 0;max-width:150px;height:52px;padding:0 6px;font-size:16px;white-space:nowrap;} .wt-wrap.is-narrow .wt-ctrl{gap:8px;} .wt-yn.is-chosen{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0D4A41;}'
  + '.wt-tray{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;min-width:160px;min-height:64px;padding:8px 12px;border-radius:50%/40%;background:#E9E2D2;box-shadow:inset 0 3px 0 rgba(0,0,0,.12);}'
  + '.wt-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0D4A41;} .wt-go svg{width:22px;height:22px;} .wt-go:disabled{opacity:.45;cursor:default;} .wt-wrap.is-done .wt-go{display:none;}'
  + '.wt-note{margin:0;min-height:1.3em;font-family:' + B + ';font-weight:700;font-size:18px;color:#146B5E;text-align:center;} .wt-note.is-hint{color:#A3401F;} .wt-wrap.is-narrow .wt-note{font-size:16px;}'
  + '.wt-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '@media (prefers-reduced-motion:reduce){.wt-wrap *{animation:none !important;}}';
  var s = document.createElement('style'); s.id = 'wt-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.WorthTillActivity = WorthTillActivity;
