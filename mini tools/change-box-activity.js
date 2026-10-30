/* =====================================================================
   change-box-activity.js — ACTIVITY #166 of the one-by-one rebuild:
   "Make Change with Coins — Money Word Problems" (2.MD.C.8)
   → THE CHANGE BOX. Model: change-box-core.js. Design:
   docs/activities-rebuild/designs/166-money.md
   ---------------------------------------------------------------------
   The customer's money goes into Pip's change box, which rattles and
   pours out the same worth in small coins. The child taps the change
   into the customer's tray; the rest is Pip's, and at Check Pip counts
   his coins onto the price tag — short if the child gave back too much,
   over if too little. That count is the only total ever shown. Level 2:
   is the purse enough / how much more; level 3: a basket of toys, then
   change. Miss 2 counts up from the price to the payment. Next appears
   .OK_MS after success.
   ===================================================================== */
var ChangeBoxActivity = {
  id: 'change-box-activity',
  THEMES: ['toys', 'zoo-animals'],
  /* the drawn apparatus (box, coins, notes, dishes, tags, the count rail): declared for the hierarchy audit */
  apparatusClasses: ['cb-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Make Change with Coins","de":"Wechselgeld herausgeben","fr":"Rends la monnaie","es":"Da el cambio","pt":"Dê o troco","it":"Dai il resto","nl":"Geef wisselgeld","sv":"Ge tillbaka växel","da":"Giv byttepenge tilbage","no":"Gi tilbake vekslepenger","fi":"Anna vaihtorahat"},
    instruction: {"en":"The change box turns the customer’s money into small coins. Put the change in the customer’s tray, or answer the question about the purse, then press Check. Pip counts the coins left for him against the price.","de":"Die Wechselkasse macht aus dem Geld des Kunden kleine Münzen. Leg das Wechselgeld in die Schale des Kunden oder beantworte die Frage zum Geldbeutel und tippe dann auf Prüfen. Otto zählt die Münzen, die ihm bleiben, bis zum Preis.","fr":"La boîte à monnaie change l’argent du client en petites pièces. Mets la monnaie dans le plateau du client, ou réponds à la question sur le porte-monnaie, puis appuie sur Vérifier. Filou compte les pièces qui lui restent jusqu’au prix.","es":"La caja de cambio convierte el dinero del cliente en monedas chicas. Pon el cambio en la charola del cliente o contesta la pregunta sobre el monedero, y luego toca Comprobar. Otto cuenta las monedas que le quedan hasta el precio.","pt":"A caixa de troco transforma o dinheiro do cliente em moedas pequenas. Coloque o troco na bandeja do cliente ou responda à pergunta sobre o porta-moedas e depois toque em Verificar. O Otto conta as moedas que ficam com ele até o preço.","it":"La cassetta del resto cambia i soldi del cliente in monete piccole. Metti il resto nel piattino del cliente, oppure rispondi alla domanda sul borsellino, poi premi Verifica. Otto conta le monete che gli restano fino al prezzo.","nl":"Het wisselbakje maakt van het geld van de klant kleine munten. Leg het wisselgeld op het schaaltje van de klant, of beantwoord de vraag over de portemonnee, en tik dan op Controleer. Otto telt de munten die hij overhoudt tot de prijs.","sv":"Växelkassan gör om kundens pengar till små mynt. Lägg växeln i kundens skål eller svara på frågan om plånboken, och tryck sedan på Kontrollera. Otto räknar mynten som blir kvar hos honom upp till priset.","da":"Byttekassen laver kundens penge om til små mønter. Læg byttepengene i kundens skål, eller svar på spørgsmålet om pungen, og tryk så på Tjek. Otto tæller de mønter, der bliver tilbage til ham, op til prisen.","no":"Vekslekassa gjør om kundens penger til små mynter. Legg vekslepengene i kundens skål, eller svar på spørsmålet om lommeboka, og trykk så på Sjekk. Otto teller myntene han sitter igjen med, opp til prisen.","fi":"Vaihtokone vaihtaa asiakkaan rahat pieniksi kolikoiksi. Laita vaihtoraha asiakkaan lautaselle tai vastaa kysymykseen kukkarosta, ja paina sitten Tarkista. Otto laskee itselleen jäävät kolikot hintaan asti."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    checkBtn: {"en":"Check","de":"Prüfen","fr":"Vérifier","es":"Comprobar","pt":"Verificar","it":"Verifica","nl":"Controleer","sv":"Kontrollera","da":"Tjek","no":"Sjekk","fi":"Tarkista"},
    pipName: {"en":"Pip","de":"Otto","fr":"Filou","es":"Otto","pt":"Otto","it":"Otto","nl":"Otto","sv":"Otto","da":"Otto","no":"Otto","fi":"Otto"},
    setShop: {"en":"Shop","de":"Laden","fr":"Boutique","es":"Tienda","pt":"Loja","it":"Negozio","nl":"Winkel","sv":"Affär","da":"Butik","no":"Butikk","fi":"Kauppa"},
    sChange: {"en":"Change","de":"Wechselgeld","fr":"Rendre la monnaie","es":"Cambio","pt":"Troco","it":"Resto","nl":"Wisselgeld","sv":"Växel","da":"Byttepenge","no":"Vekslepenger","fi":"Vaihtoraha"},
    sMore: {"en":"Enough and how much more","de":"Reicht es, und wie viel fehlt?","fr":"Assez, et combien il manque","es":"Alcanza y cuánto falta","pt":"Dá e quanto falta","it":"Basta, e quanto manca","nl":"Genoeg, en hoeveel meer","sv":"Räcker det, och hur mycket mer","da":"Nok, og hvor meget mere","no":"Nok, og hvor mye mer","fi":"Riittääkö, ja paljonko puuttuu"},
    sBasket: {"en":"Basket","de":"Einkaufskorb","fr":"Panier","es":"Canasta","pt":"Cesta","it":"Cestino","nl":"Mandje","sv":"Korg","da":"Kurv","no":"Kurv","fi":"Kori"},
    sMixed: {"en":"Mixed shop","de":"Alles gemischt","fr":"Tout mélangé","es":"Todo mezclado","pt":"Tudo misturado","it":"Tutto mescolato","nl":"Alles door elkaar","sv":"Blandat","da":"Blandet","no":"Blandet","fi":"Sekaisin"},
    setCount: {"en":"Pip counts","de":"Otto zählt","fr":"Filou compte","es":"Otto cuenta","pt":"O Otto conta","it":"Otto conta","nl":"Otto telt","sv":"Otto räknar","da":"Otto tæller","no":"Otto teller","fi":"Otto laskee"},
    cCheck: {"en":"At Check","de":"Beim Prüfen","fr":"Quand tu vérifies","es":"Al comprobar","pt":"Ao verificar","it":"Quando verifichi","nl":"Bij Controleer","sv":"När du kontrollerar","da":"Når du tjekker","no":"Når du sjekker","fi":"Kun tarkistat"},
    cLive: {"en":"As you go","de":"Laufend","fr":"Au fur et à mesure","es":"Mientras juegas","pt":"Enquanto você joga","it":"Man mano","nl":"Meteen mee","sv":"Medan du spelar","da":"Undervejs","no":"Underveis","fi":"Koko ajan"},
    pChange: {"en":"This costs {price}. The customer pays {paid}. Give the change.","de":"Das kostet {price}. Der Kunde bezahlt mit {paid}. Gib das Wechselgeld heraus.","fr":"Ça coûte {price}. Le client paie avec {paid}. Rends la monnaie.","es":"Esto cuesta {price}. El cliente paga con {paid}. Da el cambio.","pt":"Isto custa {price}. O cliente paga com {paid}. Dê o troco.","it":"Costa {price}. Il cliente paga con {paid}. Dai il resto.","nl":"Dit kost {price}. De klant betaalt met {paid}. Geef het wisselgeld.","sv":"Det kostar {price}. Kunden betalar med {paid}. Ge tillbaka växeln.","da":"Det koster {price}. Kunden betaler med {paid}. Giv byttepengene tilbage.","no":"Det koster {price}. Kunden betaler med {paid}. Gi tilbake vekslepengene.","fi":"Tämä maksaa {price}. Asiakas antaa {paid}. Anna vaihtoraha."},
    pBasket: {"en":"The customer buys everything on the shelf and pays {paid}. Give the change.","de":"Der Kunde kauft alles im Regal und bezahlt mit {paid}. Gib das Wechselgeld heraus.","fr":"Le client achète tout ce qui est sur l’étagère et paie avec {paid}. Rends la monnaie.","es":"El cliente compra todo lo del estante y paga con {paid}. Da el cambio.","pt":"O cliente compra tudo o que está na prateleira e paga com {paid}. Dê o troco.","it":"Il cliente compra tutto quello che c’è sullo scaffale e paga con {paid}. Dai il resto.","nl":"De klant koopt alles op de plank en betaalt met {paid}. Geef het wisselgeld.","sv":"Kunden köper allt på hyllan och betalar med {paid}. Ge tillbaka växeln.","da":"Kunden køber alt på hylden og betaler med {paid}. Giv byttepengene tilbage.","no":"Kunden kjøper alt på hylla og betaler med {paid}. Gi tilbake vekslepengene.","fi":"Asiakas ostaa kaiken hyllyltä ja antaa {paid}. Anna vaihtoraha."},
    pEnough: {"en":"This costs {price}. Is the money in the purse enough?","de":"Das kostet {price}. Reicht das Geld im Geldbeutel?","fr":"Ça coûte {price}. L’argent du porte-monnaie suffit-il ?","es":"Esto cuesta {price}. ¿Alcanza el dinero del monedero?","pt":"Isto custa {price}. O dinheiro do porta-moedas dá?","it":"Costa {price}. Bastano i soldi nel borsellino?","nl":"Dit kost {price}. Is het geld in de portemonnee genoeg?","sv":"Det kostar {price}. Räcker pengarna i plånboken?","da":"Det koster {price}. Er der penge nok i pungen?","no":"Det koster {price}. Er det nok penger i lommeboka?","fi":"Tämä maksaa {price}. Riittävätkö kukkaron rahat?"},
    pMore: {"en":"This costs {price}. How much more does the purse need? Add coins to {name}’s dish.","de":"Das kostet {price}. Wie viel fehlt im Geldbeutel noch? Leg Münzen auf {name}s Teller.","fr":"Ça coûte {price}. Combien manque-t-il dans le porte-monnaie ? Ajoute des pièces dans la coupelle de {name}.","es":"Esto cuesta {price}. ¿Cuánto le falta al monedero? Pon monedas en el platito de {name}.","pt":"Isto custa {price}. Quanto falta no porta-moedas? Coloque moedas no pratinho do {name}.","it":"Costa {price}. Quanto manca nel borsellino? Metti delle monete nella ciotola di {name}.","nl":"Dit kost {price}. Hoeveel komt de portemonnee nog tekort? Leg munten op het bordje van {name}.","sv":"Det kostar {price}. Hur mycket mer behövs i plånboken? Lägg mynt på {name}s fat.","da":"Det koster {price}. Hvor meget mangler der i pungen? Læg mønter på {name}s fad.","no":"Det koster {price}. Hvor mye mangler i lommeboka? Legg mynter på {name}s fat.","fi":"Tämä maksaa {price}. Paljonko kukkarosta puuttuu? Laita kolikoita Oton kulhoon."},
    hintTrayEmpty: {"en":"Put the change in the customer’s tray.","de":"Leg das Wechselgeld in die Schale des Kunden.","fr":"Mets la monnaie dans le plateau du client.","es":"Pon el cambio en la charola del cliente.","pt":"Coloque o troco na bandeja do cliente.","it":"Metti il resto nel piattino del cliente.","nl":"Leg het wisselgeld op het schaaltje van de klant.","sv":"Lägg växeln i kundens skål.","da":"Læg byttepengene i kundens skål.","no":"Legg vekslepengene i kundens skål.","fi":"Laita vaihtoraha asiakkaan lautaselle."},
    hintAddEmpty: {"en":"Add coins to {name}’s dish.","de":"Leg Münzen auf {name}s Teller.","fr":"Ajoute des pièces dans la coupelle de {name}.","es":"Pon monedas en el platito de {name}.","pt":"Coloque moedas no pratinho do {name}.","it":"Metti delle monete nella ciotola di {name}.","nl":"Leg munten op het bordje van {name}.","sv":"Lägg mynt på {name}s fat.","da":"Læg mønter på {name}s fad.","no":"Legg mynter på {name}s fat.","fi":"Laita kolikoita Oton kulhoon."},
    hintChoose: {"en":"Tap Enough or Not enough.","de":"Tippe auf Reicht oder Reicht nicht.","fr":"Touche Assez ou Pas assez.","es":"Toca Alcanza o No alcanza.","pt":"Toque em Dá ou Não dá.","it":"Tocca Bastano o Non bastano.","nl":"Tik op Genoeg of Niet genoeg.","sv":"Tryck på Räcker eller Räcker inte.","da":"Tryk på Nok eller Ikke nok.","no":"Trykk på Nok eller Ikke nok.","fi":"Napauta Riittää tai Ei riitä."},
    hintAgain: {"en":"Change something first, then press Check.","de":"Ändere zuerst etwas, dann tippe auf Prüfen.","fr":"Change d’abord quelque chose, puis appuie sur Vérifier.","es":"Primero cambia algo y luego toca Comprobar.","pt":"Primeiro mude alguma coisa e depois toque em Verificar.","it":"Prima cambia qualcosa, poi premi Verifica.","nl":"Verander eerst iets en tik dan op Controleer.","sv":"Ändra något först och tryck sedan på Kontrollera.","da":"Lav først noget om, og tryk så på Tjek.","no":"Endre noe først, og trykk så på Sjekk.","fi":"Muuta ensin jotakin ja paina sitten Tarkista."},
    hintShort: {"en":"{name} has only {pip}, but it costs {price}. You gave back too much.","de":"{name} hat nur {pip}, aber es kostet {price}. Du hast zu viel herausgegeben.","fr":"{name} n’a que {pip}, mais ça coûte {price}. Tu as rendu trop d’argent.","es":"{name} solo tiene {pip}, pero cuesta {price}. Diste demasiado cambio.","pt":"O {name} só tem {pip}, mas custa {price}. Você deu troco demais.","it":"{name} ha solo {pip}, ma costa {price}. Hai dato troppo resto.","nl":"{name} heeft alleen {pip}, maar het kost {price}. Je hebt te veel teruggegeven.","sv":"{name} har bara {pip}, men det kostar {price}. Du gav tillbaka för mycket.","da":"{name} har kun {pip}, men det koster {price}. Du gav for meget tilbage.","no":"{name} har bare {pip}, men det koster {price}. Du ga tilbake for mye.","fi":"Otolla on vain {pip}, mutta hinta on {price}. Annoit liikaa takaisin."},
    hintNothing: {"en":"{name} has nothing left: you gave back all of the money, but it costs {price}.","de":"{name} hat nichts mehr: Du hast das ganze Geld herausgegeben, aber es kostet {price}.","fr":"{name} n’a plus rien : tu as rendu tout l’argent, mais ça coûte {price}.","es":"A {name} no le queda nada: devolviste todo el dinero, pero cuesta {price}.","pt":"O {name} ficou sem nada: você devolveu todo o dinheiro, mas custa {price}.","it":"A {name} non resta niente: hai restituito tutti i soldi, ma costa {price}.","nl":"{name} heeft niets meer: je hebt al het geld teruggegeven, maar het kost {price}.","sv":"{name} har inget kvar: du gav tillbaka alla pengarna, men det kostar {price}.","da":"{name} har ikke noget tilbage: du gav alle pengene tilbage, men det koster {price}.","no":"{name} har ingenting igjen: du ga tilbake alle pengene, men det koster {price}.","fi":"Otolle ei jäänyt mitään: annoit kaikki rahat takaisin, mutta hinta on {price}."},
    hintOver: {"en":"{name} has {pip}, more than {price}. Some of that is the customer’s change.","de":"{name} hat {pip}, mehr als {price}. Ein Teil davon ist das Wechselgeld des Kunden.","fr":"{name} a {pip}, plus que {price}. Une partie, c’est la monnaie du client.","es":"{name} tiene {pip}, más que {price}. Una parte es el cambio del cliente.","pt":"O {name} tem {pip}, mais que {price}. Uma parte é o troco do cliente.","it":"{name} ha {pip}, più di {price}. Una parte è il resto del cliente.","nl":"{name} heeft {pip}, meer dan {price}. Een deel daarvan is het wisselgeld van de klant.","sv":"{name} har {pip}, mer än {price}. En del av det är kundens växel.","da":"{name} har {pip}, mere end {price}. Noget af det er kundens byttepenge.","no":"{name} har {pip}, mer enn {price}. Noe av det er kundens vekslepenger.","fi":"Otolla on {pip}, enemmän kuin {price}. Osa siitä on asiakkaan vaihtorahaa."},
    hintBasketShort: {"en":"{name} has only {pip}, but everything together costs {price}. You gave back too much.","de":"{name} hat nur {pip}, aber alles zusammen kostet {price}. Du hast zu viel herausgegeben.","fr":"{name} n’a que {pip}, mais tout ensemble coûte {price}. Tu as rendu trop d’argent.","es":"{name} solo tiene {pip}, pero todo junto cuesta {price}. Diste demasiado cambio.","pt":"O {name} só tem {pip}, mas tudo junto custa {price}. Você deu troco demais.","it":"{name} ha solo {pip}, ma tutto insieme costa {price}. Hai dato troppo resto.","nl":"{name} heeft alleen {pip}, maar alles samen kost {price}. Je hebt te veel teruggegeven.","sv":"{name} har bara {pip}, men allt tillsammans kostar {price}. Du gav tillbaka för mycket.","da":"{name} har kun {pip}, men det hele koster {price} tilsammen. Du gav for meget tilbage.","no":"{name} har bare {pip}, men alt sammen koster {price}. Du ga tilbake for mye.","fi":"Otolla on vain {pip}, mutta kaikki yhteensä maksaa {price}. Annoit liikaa takaisin."},
    hintBasketOver: {"en":"{name} has {pip}, more than everything costs together ({price}). Some of that is the customer’s change.","de":"{name} hat {pip}, mehr als alles zusammen kostet ({price}). Ein Teil davon ist das Wechselgeld des Kunden.","fr":"{name} a {pip}, plus que le prix de tout ensemble ({price}). Une partie, c’est la monnaie du client.","es":"{name} tiene {pip}, más de lo que cuesta todo junto ({price}). Una parte es el cambio del cliente.","pt":"O {name} tem {pip}, mais do que tudo junto custa ({price}). Uma parte é o troco do cliente.","it":"{name} ha {pip}, più di quanto costa tutto insieme ({price}). Una parte è il resto del cliente.","nl":"{name} heeft {pip}, meer dan alles samen kost ({price}). Een deel daarvan is het wisselgeld van de klant.","sv":"{name} har {pip}, mer än allt kostar tillsammans ({price}). En del av det är kundens växel.","da":"{name} har {pip}, mere end det hele koster tilsammen ({price}). Noget af det er kundens byttepenge.","no":"{name} har {pip}, mer enn alt sammen koster ({price}). Noe av det er kundens vekslepenger.","fi":"Otolla on {pip}, enemmän kuin kaikki yhteensä maksaa ({price}). Osa siitä on asiakkaan vaihtorahaa."},
    hintEnoughYes: {"en":"The purse holds {sum}: that is enough for {price}.","de":"Im Geldbeutel sind {sum}: Das reicht für {price}.","fr":"Le porte-monnaie contient {sum} : c’est assez pour {price}.","es":"El monedero tiene {sum}: alcanza para {price}.","pt":"O porta-moedas tem {sum}: dá para {price}.","it":"Nel borsellino ci sono {sum}: bastano per {price}.","nl":"In de portemonnee zit {sum}: dat is genoeg voor {price}.","sv":"I plånboken finns {sum}: det räcker till {price}.","da":"I pungen er der {sum}: det er nok til {price}.","no":"I lommeboka er det {sum}: det er nok til {price}.","fi":"Kukkarossa on {sum}: se riittää hintaan {price}."},
    hintEnoughNo: {"en":"The purse holds {sum}: that is not enough for {price}.","de":"Im Geldbeutel sind {sum}: Das reicht nicht für {price}.","fr":"Le porte-monnaie contient {sum} : ce n’est pas assez pour {price}.","es":"El monedero tiene {sum}: no alcanza para {price}.","pt":"O porta-moedas tem {sum}: não dá para {price}.","it":"Nel borsellino ci sono {sum}: non bastano per {price}.","nl":"In de portemonnee zit {sum}: dat is niet genoeg voor {price}.","sv":"I plånboken finns {sum}: det räcker inte till {price}.","da":"I pungen er der {sum}: det er ikke nok til {price}.","no":"I lommeboka er det {sum}: det er ikke nok til {price}.","fi":"Kukkarossa on {sum}: se ei riitä hintaan {price}."},
    hintMoreShort: {"en":"{name} has {pip}: still less than {price}. Add more.","de":"{name} hat {pip}: noch weniger als {price}. Leg mehr dazu.","fr":"{name} a {pip} : c’est encore moins que {price}. Ajoutes-en.","es":"{name} tiene {pip}: todavía menos que {price}. Pon más.","pt":"O {name} tem {pip}: ainda menos que {price}. Coloque mais.","it":"{name} ha {pip}: ancora meno di {price}. Aggiungine ancora.","nl":"{name} heeft {pip}: nog minder dan {price}. Leg er meer bij.","sv":"{name} har {pip}: fortfarande mindre än {price}. Lägg till mer.","da":"{name} har {pip}: stadig mindre end {price}. Læg mere til.","no":"{name} har {pip}: fortsatt mindre enn {price}. Legg til mer.","fi":"Otolla on {pip}: vielä vähemmän kuin {price}. Lisää kolikoita."},
    hintMoreOver: {"en":"{name} has {pip}: more than {price}. Take a coin back out.","de":"{name} hat {pip}: mehr als {price}. Nimm eine Münze wieder heraus.","fr":"{name} a {pip} : c’est plus que {price}. Reprends une pièce.","es":"{name} tiene {pip}: más que {price}. Saca una moneda.","pt":"O {name} tem {pip}: mais que {price}. Tire uma moeda.","it":"{name} ha {pip}: più di {price}. Togli una moneta.","nl":"{name} heeft {pip}: meer dan {price}. Haal er een munt uit.","sv":"{name} har {pip}: mer än {price}. Ta tillbaka ett mynt.","da":"{name} har {pip}: mere end {price}. Tag en mønt tilbage.","no":"{name} har {pip}: mer enn {price}. Ta tilbake en mynt.","fi":"Otolla on {pip}: enemmän kuin {price}. Ota yksi kolikko pois."},
    helpChange: {"en":"Count up from {price} to {paid}: {steps}. Those coins are the change.","de":"Zähle von {price} bis {paid} weiter: {steps}. Diese Münzen sind das Wechselgeld.","fr":"Compte de {price} jusqu’à {paid} : {steps}. Ces pièces sont la monnaie.","es":"Cuenta desde {price} hasta {paid}: {steps}. Esas monedas son el cambio.","pt":"Conte de {price} até {paid}: {steps}. Essas moedas são o troco.","it":"Conta da {price} fino a {paid}: {steps}. Quelle monete sono il resto.","nl":"Tel verder van {price} tot {paid}: {steps}. Die munten zijn het wisselgeld.","sv":"Räkna vidare från {price} till {paid}: {steps}. De mynten är växeln.","da":"Tæl videre fra {price} til {paid}: {steps}. De mønter er byttepengene.","no":"Tell videre fra {price} til {paid}: {steps}. De myntene er vekslepengene.","fi":"Laske eteenpäin hinnasta {price} summaan {paid}: {steps}. Ne kolikot ovat vaihtorahaa."},
    helpMore: {"en":"Count up from {purse} to {price}: {steps}.","de":"Zähle von {purse} bis {price} weiter: {steps}.","fr":"Compte de {purse} jusqu’à {price} : {steps}.","es":"Cuenta desde {purse} hasta {price}: {steps}.","pt":"Conte de {purse} até {price}: {steps}.","it":"Conta da {purse} fino a {price}: {steps}.","nl":"Tel verder van {purse} tot {price}: {steps}.","sv":"Räkna vidare från {purse} till {price}: {steps}.","da":"Tæl videre fra {purse} til {price}: {steps}.","no":"Tell videre fra {purse} til {price}: {steps}.","fi":"Laske eteenpäin summasta {purse} hintaan {price}: {steps}."},
    helpEnough: {"en":"The purse: {steps}. Compare that with {price}.","de":"Der Geldbeutel: {steps}. Vergleiche das mit {price}.","fr":"Le porte-monnaie : {steps}. Compare avec {price}.","es":"El monedero: {steps}. Compáralo con {price}.","pt":"O porta-moedas: {steps}. Compare com {price}.","it":"Il borsellino: {steps}. Confrontalo con {price}.","nl":"De portemonnee: {steps}. Vergelijk dat met {price}.","sv":"Plånboken: {steps}. Jämför det med {price}.","da":"Pungen: {steps}. Sammenlign det med {price}.","no":"Lommeboka: {steps}. Sammenlign det med {price}.","fi":"Kukkaro: {steps}. Vertaa sitä hintaan {price}."},
    okChange: {"en":"{price} + {change} = {paid}. Your change is {change}.","de":"{price} + {change} = {paid}. Das Wechselgeld ist {change}.","fr":"{price} + {change} = {paid}. La monnaie, c’est {change}.","es":"{price} + {change} = {paid}. El cambio es {change}.","pt":"{price} + {change} = {paid}. O troco é {change}.","it":"{price} + {change} = {paid}. Il resto è {change}.","nl":"{price} + {change} = {paid}. Het wisselgeld is {change}.","sv":"{price} + {change} = {paid}. Växeln är {change}.","da":"{price} + {change} = {paid}. Byttepengene er {change}.","no":"{price} + {change} = {paid}. Vekslepengene er {change}.","fi":"{price} + {change} = {paid}. Vaihtoraha on {change}."},
    okBasket: {"en":"{tags} = {price}. {price} + {change} = {paid}. Your change is {change}.","de":"{tags} = {price}. {price} + {change} = {paid}. Das Wechselgeld ist {change}.","fr":"{tags} = {price}. {price} + {change} = {paid}. La monnaie, c’est {change}.","es":"{tags} = {price}. {price} + {change} = {paid}. El cambio es {change}.","pt":"{tags} = {price}. {price} + {change} = {paid}. O troco é {change}.","it":"{tags} = {price}. {price} + {change} = {paid}. Il resto è {change}.","nl":"{tags} = {price}. {price} + {change} = {paid}. Het wisselgeld is {change}.","sv":"{tags} = {price}. {price} + {change} = {paid}. Växeln är {change}.","da":"{tags} = {price}. {price} + {change} = {paid}. Byttepengene er {change}.","no":"{tags} = {price}. {price} + {change} = {paid}. Vekslepengene er {change}.","fi":"{tags} = {price}. {price} + {change} = {paid}. Vaihtoraha on {change}."},
    okMore: {"en":"{purse} + {added} = {price}. The purse needed {added} more.","de":"{purse} + {added} = {price}. Im Geldbeutel haben {added} gefehlt.","fr":"{purse} + {added} = {price}. Il manquait {added} dans le porte-monnaie.","es":"{purse} + {added} = {price}. Al monedero le faltaban {added}.","pt":"{purse} + {added} = {price}. Faltavam {added} no porta-moedas.","it":"{purse} + {added} = {price}. Nel borsellino mancavano {added}.","nl":"{purse} + {added} = {price}. De portemonnee kwam {added} tekort.","sv":"{purse} + {added} = {price}. Det fattades {added} i plånboken.","da":"{purse} + {added} = {price}. Der manglede {added} i pungen.","no":"{purse} + {added} = {price}. Det manglet {added} i lommeboka.","fi":"{purse} + {added} = {price}. Kukkarosta puuttui {added}."},
    okEqual: {"en":"{sum} = {price}: enough!","de":"{sum} = {price}: Das reicht!","fr":"{sum} = {price} : c’est assez !","es":"{sum} = {price}: ¡alcanza!","pt":"{sum} = {price}: dá!","it":"{sum} = {price}: bastano!","nl":"{sum} = {price}: genoeg!","sv":"{sum} = {price}: det räcker!","da":"{sum} = {price}: det er nok!","no":"{sum} = {price}: det er nok!","fi":"{sum} = {price}: riittää!"},
    okYes: {"en":"{sum} is more than {price}: enough!","de":"{sum} ist mehr als {price}: Das reicht!","fr":"{sum}, c’est plus que {price} : c’est assez !","es":"{sum} es más que {price}: ¡alcanza!","pt":"{sum} é mais que {price}: dá!","it":"{sum} sono più di {price}: bastano!","nl":"{sum} is meer dan {price}: genoeg!","sv":"{sum} är mer än {price}: det räcker!","da":"{sum} er mere end {price}: det er nok!","no":"{sum} er mer enn {price}: det er nok!","fi":"{sum} on enemmän kuin {price}: riittää!"},
    okNo: {"en":"{sum} is less than {price}: not enough.","de":"{sum} ist weniger als {price}: Das reicht nicht.","fr":"{sum}, c’est moins que {price} : ce n’est pas assez.","es":"{sum} es menos que {price}: no alcanza.","pt":"{sum} é menos que {price}: não dá.","it":"{sum} sono meno di {price}: non bastano.","nl":"{sum} is minder dan {price}: niet genoeg.","sv":"{sum} är mindre än {price}: det räcker inte.","da":"{sum} er mindre end {price}: det er ikke nok.","no":"{sum} er mindre enn {price}: det er ikke nok.","fi":"{sum} on vähemmän kuin {price}: ei riitä."},
    bEnough: {"en":"Enough","de":"Reicht","fr":"Assez","es":"Alcanza","pt":"Dá","it":"Bastano","nl":"Genoeg","sv":"Räcker","da":"Nok","no":"Nok","fi":"Riittää"},
    bNot: {"en":"Not enough","de":"Reicht nicht","fr":"Pas assez","es":"No alcanza","pt":"Não dá","it":"Non bastano","nl":"Niet genoeg","sv":"Räcker inte","da":"Ikke nok","no":"Ikke nok","fi":"Ei riitä"},
    aPile: {"en":"{n} coins from the change box","de":"{n} Münzen aus der Wechselkasse","fr":"{n} pièces de la boîte à monnaie","es":"{n} monedas de la caja de cambio","pt":"{n} moedas da caixa de troco","it":"{n} monete dalla cassetta del resto","nl":"{n} munten uit het wisselbakje","sv":"{n} mynt från växelkassan","da":"{n} mønter fra byttekassen","no":"{n} mynter fra vekslekassa","fi":"{n} kolikkoa vaihtokoneesta"},
    aTray: {"en":"The customer’s tray: {n} coins","de":"Die Schale des Kunden: {n} Münzen","fr":"Le plateau du client : {n} pièces","es":"La charola del cliente: {n} monedas","pt":"A bandeja do cliente: {n} moedas","it":"Il piattino del cliente: {n} monete","nl":"Het schaaltje van de klant: {n} munten","sv":"Kundens skål: {n} mynt","da":"Kundens skål: {n} mønter","no":"Kundens skål: {n} mynter","fi":"Asiakkaan lautanen: {n} kolikkoa"},
    aDish: {"en":"{name}’s dish","de":"{name}s Teller","fr":"La coupelle de {name}","es":"El platito de {name}","pt":"O pratinho do {name}","it":"La ciotola di {name}","nl":"Het bordje van {name}","sv":"{name}s fat","da":"{name}s fad","no":"{name}s fat","fi":"Oton kulho"},
    aPurse: {"en":"The purse","de":"Der Geldbeutel","fr":"Le porte-monnaie","es":"El monedero","pt":"O porta-moedas","it":"Il borsellino","nl":"De portemonnee","sv":"Plånboken","da":"Pungen","no":"Lommeboka","fi":"Kukkaro"},
    aSide: {"en":"Coins to add","de":"Münzen zum Dazulegen","fr":"Pièces à ajouter","es":"Monedas para agregar","pt":"Moedas para acrescentar","it":"Monete da aggiungere","nl":"Munten om bij te leggen","sv":"Mynt att lägga till","da":"Mønter at lægge til","no":"Mynter å legge til","fi":"Lisättävät kolikot"},
    aCoin: {"en":"{amt} coin","de":"{amt}-Münze","fr":"pièce de {amt}","es":"moneda de {amt}","pt":"moeda de {amt}","it":"moneta da {amt}","nl":"munt van {amt}","sv":"mynt på {amt}","da":"mønt på {amt}","no":"mynt på {amt}","fi":"kolikko {amt}"},
    aNote: {"en":"{amt} bill","de":"{amt}-Schein","fr":"billet de {amt}","es":"billete de {amt}","pt":"nota de {amt}","it":"banconota da {amt}","nl":"biljet van {amt}","sv":"sedel på {amt}","da":"seddel på {amt}","no":"seddel på {amt}","fi":"seteli {amt}"},
    name1: {"en":"penny","de":"penny","fr":"penny","es":"penny","pt":"penny","it":"penny","nl":"penny","sv":"penny","da":"penny","no":"penny","fi":"penny"},
    name5: {"en":"nickel","de":"nickel","fr":"nickel","es":"nickel","pt":"nickel","it":"nickel","nl":"nickel","sv":"nickel","da":"nickel","no":"nickel","fi":"nickel"},
    name10: {"en":"dime","de":"dime","fr":"dime","es":"dime","pt":"dime","it":"dime","nl":"dime","sv":"dime","da":"dime","no":"dime","fi":"dime"},
    name25: {"en":"quarter","de":"quarter","fr":"quarter","es":"quarter","pt":"quarter","it":"quarter","nl":"quarter","sv":"quarter","da":"quarter","no":"quarter","fi":"quarter"},
    nameBill: {"en":"one-dollar bill","de":"one-dollar bill","fr":"one-dollar bill","es":"one-dollar bill","pt":"one-dollar bill","it":"one-dollar bill","nl":"one-dollar bill","sv":"one-dollar bill","da":"one-dollar bill","no":"one-dollar bill","fi":"one-dollar bill"},
    aToTray: {"en":"Into the tray: {coin}.","de":"In die Schale: {coin}.","fr":"Dans le plateau : {coin}.","es":"A la charola: {coin}.","pt":"Na bandeja: {coin}.","it":"Nel piattino: {coin}.","nl":"Op het schaaltje: {coin}.","sv":"I skålen: {coin}.","da":"I skålen: {coin}.","no":"I skålen: {coin}.","fi":"Lautaselle: {coin}."},
    aToPile: {"en":"Back to the pile: {coin}.","de":"Zurück zum Haufen: {coin}.","fr":"Retour au tas : {coin}.","es":"De vuelta al montón: {coin}.","pt":"De volta ao montinho: {coin}.","it":"Di nuovo nel mucchio: {coin}.","nl":"Terug naar de stapel: {coin}.","sv":"Tillbaka till högen: {coin}.","da":"Tilbage til bunken: {coin}.","no":"Tilbake til haugen: {coin}.","fi":"Takaisin kasaan: {coin}."},
    aOut: {"en":"Taken back out: {coin}.","de":"Wieder herausgenommen: {coin}.","fr":"Reprise : {coin}.","es":"Sacada: {coin}.","pt":"Retirada: {coin}.","it":"Tolta: {coin}.","nl":"Er weer uit: {coin}.","sv":"Taget tillbaka: {coin}.","da":"Taget tilbage: {coin}.","no":"Tatt tilbake: {coin}.","fi":"Otettu pois: {coin}."},
    aToDish: {"en":"Into {name}’s dish: {coin}","de":"Auf {name}s Teller: {coin}","fr":"Dans la coupelle de {name} : {coin}","es":"Al platito de {name}: {coin}","pt":"No pratinho do {name}: {coin}","it":"Nella ciotola di {name}: {coin}","nl":"Op het bordje van {name}: {coin}","sv":"På {name}s fat: {coin}","da":"På {name}s fad: {coin}","no":"På {name}s fat: {coin}","fi":"Oton kulhoon: {coin}"},
    aFromDish: {"en":"Take it back out: {coin}","de":"Wieder herausnehmen: {coin}","fr":"Reprendre : {coin}","es":"Sacarla: {coin}","pt":"Tirar de volta: {coin}","it":"Toglierla: {coin}","nl":"Er weer uit halen: {coin}","sv":"Ta tillbaka: {coin}","da":"Tag tilbage: {coin}","no":"Ta tilbake: {coin}","fi":"Ota pois: {coin}"},
    pipLive: {"en":"{name}: {pip}","de":"{name}: {pip}","fr":"{name} : {pip}","es":"{name}: {pip}","pt":"{name}: {pip}","it":"{name}: {pip}","nl":"{name}: {pip}","sv":"{name}: {pip}","da":"{name}: {pip}","no":"{name}: {pip}","fi":"{name}: {pip}"}
  },/*STRINGS-END*/
  defaults: { shop: 'change', count: 'check' },
  settings: [
    { key: 'shop', type: 'choice', labelKey: 'setShop', options: [{ value: 'change', labelKey: 'sChange' }, { value: 'more', labelKey: 'sMore' }, { value: 'basket', labelKey: 'sBasket' }, { value: 'mixed', labelKey: 'sMixed' }] },
    { key: 'count', type: 'choice', labelKey: 'setCount', options: [{ value: 'check', labelKey: 'cCheck' }, { value: 'live', labelKey: 'cLive' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; this._toy = 0;
    this._timers = []; this._ro = null; this._view = {}; this._themes = {}; this._picsReady = false;
    injectChangeBoxCSS();
    if (typeof LCSPictures !== 'undefined') {
      Promise.all(this.THEMES.map(function (d) { return LCSPictures.load(d).then(function (t) { self._themes[d] = t; }); }))
        .then(function () { self._picsReady = true; if (self._wrap) self._paint(); })
        .catch(function () { self._picsReady = true; });
    } else this._picsReady = true;
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  /* da writes «13 kr.» — at a sentence end the abbreviation's own period closes the sentence (never «kr..») */
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; a = a || {}; return String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }).replace(/kr\.\./g, 'kr.'); },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _shop: function () { return ChangeBoxCore.shopOf(this._setting('shop')); },
  _live: function () { return ChangeBoxCore.countOf(this._setting('count')) === 'live'; },
  _loc: function () { return ChangeBoxCore.locOf(this.api && this.api.lang); },
  _fam: function () { return ChangeBoxCore.famOf(this._loc()); },
  _key: function () { return this._fam() + '.' + this._shop(); },

  /* ---------------- money words (the harmonized formatter shared with rows 164/165) ---------------- */
  /* below one unit the cent form; from one unit up the grade-2 split form («1 € 75 ct», «1 real e 50 centavos»); es/sv/da/no whole units */
  _money: function (v) {
    var l = this._loc(), nb = ' ', e = Math.floor(v / 100), c = v % 100;
    if (l === 'en') return v >= 100 && c === 0 ? '$' + e : v + '¢';
    if (l === 'es') return '$' + v;
    if (l === 'sv' || l === 'no') return v + nb + 'kr';
    if (l === 'da') return v + nb + 'kr.';
    var U = { de: ['ct', '€'], fr: ['c', '€'], fi: ['snt', '€'], it: ['cent', 'euro'], nl: ['cent', 'euro'], pt: ['centavos', e > 1 ? 'reais' : 'real'] }[l];
    if (v < 100) return v + nb + U[0];
    return e + nb + U[1] + (c ? ((l === 'it' || l === 'pt') ? ' e ' : nb) + c + nb + U[0] : '');
  },
  /* the decimal form beside a split amount in a success sentence: «(1,75 €)», «(R$ 1,35)» — only when there are cents */
  _dec: function (v) {
    var l = this._loc(), c = v % 100; if (v < 100 || !c || ['en', 'es', 'sv', 'da', 'no'].indexOf(l) >= 0) return '';
    var d = Math.floor(v / 100) + ',' + (c < 10 ? '0' : '') + c;
    return ' (' + (l === 'pt' ? 'R$ ' + d : l === 'nl' ? '€ ' + d : d + ' €') + ')';
  },
  /* an amount on a price tag: a long unit («centavos») goes on a second line under the number */
  _amtHtml: function (v, stack) {
    var m = this._money(v), l = this._loc(), c = v % 100;
    if (l === 'pt' && v < 100) return '<span class="cb-amt"><b>' + v + '</b><i>centavos</i></span>';
    /* a euro / real amount with cents, stacked when asked (the phone rail) or always in pt: «1 euro» over «90 cent» */
    if (v >= 100 && c && (stack || l === 'pt') && ['de', 'fr', 'it', 'nl', 'fi', 'pt'].indexOf(l) >= 0) {
      var top = this._money(v - c), bottom = m.slice(top.length).replace(/^\s+/, '');
      return '<span class="cb-amt"><b>' + this._esc(top) + '</b><i>' + this._esc(bottom) + '</i></span>';
    }
    return this._esc(m);
  },
  _coinName: function (v, note) {
    var amt = this._money(v);
    if (this._loc() === 'en') return note ? this._t('nameBill') : this._t('name' + v);
    if (this._loc() === 'de') amt = amt.replace(/ /g, '-');
    return this._t(note ? 'aNote' : 'aCoin', { amt: amt });
  },
  _name: function () { return this._t('pipName'); },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = ChangeBoxCore.rounds(this._fam(), this._shop()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = ChangeBoxCore, pool = this._ensurePool(), n = C.passSize(this._shop()), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._fam(), this._shop(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }, self = this; this._pa = pa;
    return {
      id: 'change-box.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k, at * 3); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var r = this.st.round, k = r.kind, C = ChangeBoxCore;
    var key = { change: 'pChange', basket: 'pBasket', enough: 'pEnough', more: 'pMore' }[k];
    return this._t(key, { price: this._money(r.price), paid: this._money(C.paid(r)), name: this._name() });
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k, toy) {
    this._clearTimers();
    /* the toys are drawn without repeats inside a pass (3 per round slot) */
    this.st = ChangeBoxCore.newState(this._fam(), this._shop(), k, toy == null ? Math.floor(Math.random() * 11) : toy);
    this._view = { note: '', soft: false, rail: null, hintIds: [], pour: true, bob: null };
    this._setPrompt();
    if (this._wrap) this._paint();
    var v = this._view, self = this; this._later(function () { v.pour = false; }, this.FAST ? 20 : 1400);
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
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'cb-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="cb-shelf" data-qa="shelf"></div><div class="cb-counter" data-qa="counter"></div><div class="cb-rail" data-qa="rail"></div><p class="cb-note" data-qa="note" aria-live="polite"></p><div class="cb-ctrl"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _geometry: function (W) {
    var wide = W >= 560, cramp = W < 330;
    return { W: W, wide: wide, cramp: cramp, k: wide ? 2.4 : cramp ? 1.7 : 1.9, toy: wide ? 104 : 64, otter: wide ? 96 : 64 };
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
    this._wrap.className = 'cb-wrap is-' + st.round.kind + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '');
    this._paintShelf(); this._paintCounter(); this._paintRail(); this._paintCtrl();
    var note = this._qs('.cb-note');
    note.textContent = v.note || ''; note.className = 'cb-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _pic: function (theme, noun, size, cls) {
    var loc = this._loc();
    if (!this._picsReady || typeof LCSPictures === 'undefined' || !this._themes[theme]) { var d = this.api.el('div', cls + ' cb-picwait'); d.style.width = size + 'px'; d.style.height = size + 'px'; return d; }
    var im = LCSPictures.img(this._themes[theme], noun, loc, { size: size }); im.className = cls; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  /* a coin, true to size, its worth numeral on it (the US coins too, operator ruling 2026-10-30); a note: a rectangle with its numeral and sign only */
  _coinSvg: function (v, px, note) {
    var C = ChangeBoxCore, fam = this._fam(), loc = this._loc();
    if (note) {
      var w = Math.round(px * 1.9), h = px, fill = { green: '#9CC69B', blue: '#8DB4E2', pink: '#E8A7C2', bluegrey: '#A9B8C9', purple: '#C3A6DC', orange: '#F1B77E' }[C.noteColour(fam, v)] || '#C9DDB4';
      var lab = loc === 'en' ? '$' + (v / 100) : loc === 'es' ? '$' + v : loc === 'pt' ? 'R$' + (v / 100) : String(v);
      return '<svg class="cb-coinsvg" viewBox="0 0 120 60" width="' + w + '" height="' + h + '" aria-hidden="true"><rect x="2" y="2" width="116" height="56" rx="6" fill="' + fill + '" stroke="#2B2B2B" stroke-width="3"/><rect x="10" y="10" width="100" height="40" rx="4" fill="none" stroke="#2B2B2B" stroke-opacity=".35" stroke-width="2"/><text x="60" y="41" text-anchor="middle" class="cb-notenum">' + this._esc(lab) + '</text></svg>';
    }
    var c = C.coin(fam, v), M = { copper: ['#C97B43', '#8E5124'], silver: ['#C9CDD2', '#7D838A'], gold: ['#E1BE4E', '#9C7A16'] };
    var o = '<svg class="cb-coinsvg" viewBox="0 0 100 100" width="' + px + '" height="' + px + '" aria-hidden="true">';
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
    o += '<text x="50" y="' + (c.hole ? 23 : 50) + '" dy=".35em" text-anchor="middle" class="cb-coinnum" font-size="' + (c.hole ? 22 : 38) + '">' + num + '</text>';
    return o + '</svg>';
  },
  _coinPx: function (v) { return Math.round(ChangeBoxCore.coin(this._fam(), v).d * this._g.k); },

  _paintShelf: function () {
    var st = this.st, r = st.round, g = this._g, el = this._qs('.cb-shelf'), self = this, C = ChangeBoxCore;
    el.innerHTML = '';
    var prices = r.kind === 'basket' ? r.tags : [r.price];
    st.toys.forEach(function (toy, i) {
      /* on a phone one toy wears its tag beside it (a basket keeps the tags under the toys) */
      var item = self.api.el('div', 'cb-item' + (st.done ? ' is-bagged' : '') + (!g.wide && st.toys.length === 1 && (self._loc() === 'pt' || self._money(prices[i]).length <= 10) ? ' is-side' : ''));
      var pic = self._pic('toys', toy, g.toy, 'cb-toy'); item.appendChild(pic);
      var tag = self.api.el('div', 'cb-tag'); tag.setAttribute('data-price', prices[i]); tag.innerHTML = self._amtHtml(prices[i]);
      if (st.done && r.kind !== 'enough') tag.insertAdjacentHTML('beforeend', '<svg class="cb-stamp" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="#146B5E" stroke-width="2.5"/><path d="M7 12.5l3.5 3.5L17 8.5" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>');
      item.appendChild(tag);
      el.appendChild(item);
    });
    /* the payment, drawn as the real notes and coins (change and basket rounds) */
    if (r.pay && (g.wide || r.kind !== 'basket')) el.appendChild(this._payEl());
    /* on a phone Pip stands on the shelf row, beside the payment */
    if (!g.wide) { var ot = this._pic('zoo-animals', 'otter', g.otter, 'cb-otter' + (st.done ? ' is-hop' : '')); ot.alt = ''; el.appendChild(ot); }
  },
  /* the payment, drawn as the real notes and coins: on the shelf (wide), above the change box (phone) */
  _payEl: function () {
    var r = this.st.round, C = ChangeBoxCore, self = this, g = this._g;
    var pay = this.api.el('div', 'cb-pay' + (this._view.pour ? ' is-going' : ' is-in')); pay.setAttribute('data-paid', C.paid(r));
    var small = !g.wide && r.kind === 'basket';
    r.pay.forEach(function (p) { pay.insertAdjacentHTML('beforeend', '<span class="cb-payitem">' + self._coinSvg(p.v, p.note ? (small ? 28 : 40) : Math.round(self._coinPx(p.v) * (small ? 0.8 : 1)), p.note) + '<span class="cb-sr">' + self._esc(self._coinName(p.v, p.note)) + '</span></span>'); });
    return pay;
  },
  _coinBtn: function (c, into, label) {
    var self = this, v = this._view, st = this.st, px = this._coinPx(c.v);
    var b = this._btn('cb-coin' + (v.hintIds.indexOf(c.id) >= 0 ? ' is-hint' : '') + (v.pour && c.at === 'pile' ? ' is-pour' : ''), 'coin-' + c.id, label || this._coinName(c.v), this._coinSvg(c.v, px));
    b.setAttribute('data-coin', c.v); b.setAttribute('data-id', c.id); b.disabled = st.done;
    b.style.width = Math.max(44, px) + 'px'; b.style.height = Math.max(44, px) + 'px';
    if (v.pour && c.at === 'pile') b.style.animationDelay = (0.5 + 0.08 * into.children.length) + 's';
    b.addEventListener('click', function () { self._tapCoin(c.id); });
    into.appendChild(b);
  },
  _paintCounter: function () {
    var st = this.st, r = st.round, g = this._g, el = this._qs('.cb-counter'), self = this, C = ChangeBoxCore, v = this._view;
    el.innerHTML = '';
    var k = r.kind;
    /* the change box and its pile (change, basket) */
    /* on a phone the box steps aside after the first Check (it is only needed for the pour), and an empty pile row goes too */
    var pileN = C.where(st, 'pile').length, showBox = g.wide || !st.checked;
    if ((k === 'change' || k === 'basket') && (g.wide || pileN || showBox)) {
      var side = this.api.el('div', 'cb-boxside'), bx = this.api.el('div', 'cb-boxcol');
      if (!g.wide && r.kind === 'basket') bx.appendChild(this._payEl());
      bx.insertAdjacentHTML('beforeend', '<svg class="cb-box' + (v.pour ? ' is-rattle' : '') + '" viewBox="0 0 80 96" aria-hidden="true"><rect x="6" y="10" width="68" height="76" rx="8" fill="#C9A227" stroke="#2B2B2B" stroke-width="3"/><rect x="24" y="3" width="32" height="12" rx="4" fill="#9C7A16" stroke="#2B2B2B" stroke-width="2.5"/><rect x="28" y="7" width="24" height="4" rx="2" fill="#1E1E1E"/><circle cx="40" cy="44" r="14" fill="#FFF8E7" stroke="#2B2B2B" stroke-width="2.5"/><circle cx="40" cy="44" r="7" fill="#E1BE4E" stroke="#9C7A16" stroke-width="2" class="cb-spin"/><path d="M28 86 L32 94 L48 94 L52 86" fill="#9C7A16" stroke="#2B2B2B" stroke-width="2.5"/></svg>');
      if (showBox) side.appendChild(bx);
      var pile = this.api.el('div', 'cb-pile'); pile.setAttribute('data-qa', 'pile');
      var pc = C.where(st, 'pile');
      pile.setAttribute('aria-label', this._t('aPile', { n: pc.length }));
      pc.forEach(function (c) { self._coinBtn(c, pile); });
      if (!pc.length) pile.insertAdjacentHTML('beforeend', '<span class="cb-empty" aria-hidden="true"></span>');
      side.appendChild(pile);
      el.appendChild(side);
    }
    var dishes = this.api.el('div', 'cb-dishes');
    /* the customer's tray (the change) */
    if (k === 'change' || k === 'basket') {
      var tray = this.api.el('div', 'cb-dish cb-tray' + (st.done ? ' is-closed' : '')); tray.setAttribute('data-qa', 'tray');
      var tc = C.where(st, 'tray'); tray.setAttribute('aria-label', this._t('aTray', { n: tc.length })); tray.setAttribute('data-n', tc.length);
      tray.insertAdjacentHTML('beforeend', '<span class="cb-dishlab" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 14 Q12 6 20 14" fill="none" stroke="#146B5E" stroke-width="3" stroke-linecap="round"/><circle cx="12" cy="16" r="3" fill="#146B5E"/></svg></span>');
      var tin = this.api.el('div', 'cb-dishcoins'); tc.forEach(function (c) { self._coinBtn(c, tin); });
      if (!tc.length) tin.insertAdjacentHTML('beforeend', '<span class="cb-empty" aria-hidden="true"></span>');
      tray.appendChild(tin); dishes.appendChild(tray);
    }
    /* Pip and his dish: the purse (enough / more), what was added (more), the pile after Check (change, basket) */
    var pipc = this.api.el('div', 'cb-pipcol');
    if (g.wide) { var ot = this._pic('zoo-animals', 'otter', g.otter, 'cb-otter' + (st.done ? ' is-hop' : '')); ot.alt = ''; pipc.appendChild(ot); }
    var dish = this.api.el('div', 'cb-dish cb-pipdish'); dish.setAttribute('data-qa', 'dish'); dish.setAttribute('aria-label', this._t(k === 'enough' ? 'aPurse' : 'aDish', { name: this._name() }));
    var din = this.api.el('div', 'cb-dishcoins');
    if (k === 'enough' || k === 'more') {
      C.where(st, 'purse').forEach(function (c) { din.insertAdjacentHTML('beforeend', '<span class="cb-pcoin" data-coin="' + c.v + '">' + self._coinSvg(c.v, Math.round(self._coinPx(c.v) * 0.8)) + '</span>'); });
      C.where(st, 'added').forEach(function (c) { self._coinBtn(c, din, self._t('aFromDish', { coin: self._coinName(c.v) })); });
    } else if ((st.checked && !(v.rail && v.rail.type === 'help')) || this._live() || st.done) {
      /* during the count-up the tray has emptied back: Pip's dish waits for the next Check */
      /* Pip's share, small (his count on the rail names it); on a phone smaller still */
      C.where(st, 'pile').forEach(function (c) { din.insertAdjacentHTML('beforeend', '<span class="cb-pcoin" data-coin="' + c.v + '">' + self._coinSvg(c.v, Math.round(self._coinPx(c.v) * (g.wide ? 0.6 : 0.45))) + '</span>'); });
    }
    if (!din.children.length) din.insertAdjacentHTML('beforeend', '<span class="cb-empty" aria-hidden="true"></span>');
    dish.appendChild(din);
    /* "as you go": Pip's count lives on his dish */
    if (this._live() && k !== 'enough') dish.insertAdjacentHTML('beforeend', '<span class="cb-live" data-live="' + C.pip(st) + '">' + this._esc(this._t('pipLive', { name: this._name(), pip: this._money(C.pip(st)) })) + '</span>');
    pipc.appendChild(dish); dishes.appendChild(pipc);
    el.appendChild(dishes);
  },
  /* Pip's count onto the tag (at Check), or the count-up (miss 2) */
  _paintRail: function () {
    var st = this.st, r = st.round, v = this._view, el = this._qs('.cb-rail'), self = this, C = ChangeBoxCore;
    el.innerHTML = '';
    var R = v.rail; if (!R || st.done && R.type !== 'done') { el.style.display = 'none'; return; }
    el.style.display = '';
    var row = this.api.el('div', 'cb-railrow');
    if (R.start != null) row.insertAdjacentHTML('beforeend', '<span class="cb-railstart" data-start="' + R.start + '">' + this._amtHtml(R.start, !this._g.wide) + '</span>');
    var gap = Math.min(0.15, 0.45 / Math.max(1, R.steps.length)), cpx = this._g.wide ? 30 : 24;
    R.steps.forEach(function (p, i) {
      var over = R.cross === i;
      row.insertAdjacentHTML('beforeend', '<span class="cb-railcoin' + (over ? ' is-over' : '') + '" style="animation-delay:' + (i * gap).toFixed(2) + 's"><b data-run="' + p.run + '">' + self._amtHtml(p.run, !self._g.wide) + '</b>' + self._coinSvg(p.v, cpx) + '</span>');
    });
    if (R.sign) row.insertAdjacentHTML('beforeend', '<span class="cb-railsign" data-sign="' + R.sign + '">' + R.sign + '</span>');
    row.insertAdjacentHTML('beforeend', '<span class="cb-railgoal' + (R.short ? ' is-short' : '') + '" data-goal="' + R.goal + '">' + this._amtHtml(R.goal, !this._g.wide) + '</span>');
    el.appendChild(row);
  },
  _paintCtrl: function () {
    var st = this.st, r = st.round, el = this._qs('.cb-ctrl'), self = this, C = ChangeBoxCore, v = this._view;
    el.innerHTML = '';
    if (r.kind === 'enough') {
      ['yes', 'no'].forEach(function (c) {
        var b = self._btn('cb-yn' + (st.choice === c ? ' is-chosen' : '') + (v.bob === 'choose' ? ' is-bob' : ''), 'choose-' + c, null, self._esc(self._t(c === 'yes' ? 'bEnough' : 'bNot')));
        b.disabled = st.done; b.setAttribute('aria-pressed', st.choice === c ? 'true' : 'false');
        b.addEventListener('click', function () { if (C.choose(st, c)) self._moved(); });
        el.appendChild(b);
      });
    }
    if (r.kind === 'more') {
      var side = this.api.el('div', 'cb-side' + (v.bob === 'side' ? ' is-bob' : '')); side.setAttribute('role', 'group'); side.setAttribute('aria-label', this._t('aSide'));
      C.kinds(st.fam).filter(function (x) { return x < r.price; }).forEach(function (x) {
        var px = self._coinPx(x), b = self._btn('cb-coin cb-supply', 'add-' + x, self._t('aToDish', { coin: self._coinName(x), name: self._name() }), self._coinSvg(x, px));
        b.style.width = Math.max(44, px) + 'px'; b.style.height = Math.max(44, px) + 'px'; b.disabled = st.done;
        b.addEventListener('click', function () { if (C.add(st, x)) { self.api.sound(640); self._moved(); } });
        side.appendChild(b);
      });
      el.appendChild(side);
    }
    var go = this._btn('cb-go', 'check', this._t('checkBtn'), '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + this._esc(this._t('checkBtn')) + '</span>');
    go.disabled = st.done; go.addEventListener('click', function () { self._check(); });
    el.appendChild(go);
  },

  /* ---------------- the hand ---------------- */
  _moved: function () { var v = this._view; v.note = ''; v.rail = null; v.hintIds = []; v.bob = null; this._paint(); },
  _tapCoin: function (id) {
    var st = this.st, c = ChangeBoxCore.move(st, id);
    if (!c) return;
    this.api.sound(c.at === 'tray' ? 700 : 520);
    this._moved();
    this.api.announce(this._t(c.at === 'tray' ? 'aToTray' : c.at === 'pile' ? 'aToPile' : 'aOut', { coin: this._coinName(c.v), name: this._name() }));
  },
  /* the rail of a check: Pip's coins biggest first with Pip's running amount, up to the tag */
  _railFor: function (why) {
    var st = this.st, r = st.round, C = ChangeBoxCore, steps = C.count(C.pipVals(st), 0), cross = -1;
    for (var i = 0; i < steps.length; i++) if (steps[i].run > r.price) { cross = i; break; }
    var last = steps.length ? steps[steps.length - 1].run : 0, sign = null;
    if (r.kind === 'enough') sign = last === r.price ? '=' : last > r.price ? '>' : '<';
    return { type: why || 'count', steps: steps, goal: r.price, cross: why === 'over' ? cross : -1, short: why === 'short', sign: sign };
  },
  _check: function () {
    var st = this.st, v = this._view, C = ChangeBoxCore; if (st.done) return;
    var res = C.check(st);
    if (res.result === 'no') return;
    if (res.result === 'note') {
      v.note = this._t(res.key, { name: this._name() }); v.soft = true; v.bob = res.key === 'hintChoose' ? 'choose' : res.key === 'hintAddEmpty' ? 'side' : null;
      this.api.sound(300); this._paint(); this.api.announce(v.note); return;
    }
    if (res.result === 'ok') { this._success(); return; }
    var key = C.hint(st), a = this._args();
    /* counting never shows 0: when everything went back, Pip «has nothing left» */
    if ((key === 'hintShort' || key === 'hintBasketShort') && C.pip(st) === 0) key = 'hintNothing';
    v.soft = false; v.hintIds = [];
    if (st.help) {
      /* miss 2: the count-up — the tray empties back, the count runs up from the price, Pip's fewest change coins outlined in the pile */
      var U = C.countUp(st);
      if (st.round.kind === 'change' || st.round.kind === 'basket') { C.trayBack(st); v.hintIds = U.ids; }
      /* counting never starts from 0 on screen: the enough count-up has no start chip */
      v.rail = { type: 'help', start: st.round.kind === 'enough' ? null : U.start, steps: U.steps, goal: U.end, cross: -1, short: false, sign: st.round.kind === 'enough' ? this._railFor().sign : null };
      a.steps = U.steps.map(function (p) { return p.run; }).map(this._money.bind(this)).join(', ');
    } else v.rail = this._railFor(res.why);
    v.note = this._t(key, a);
    this._paint(); this.api.announce(v.note); this.api.sound(240);
  },
  /* the numbers the bubble names */
  _args: function () {
    var st = this.st, r = st.round, C = ChangeBoxCore, self = this, pre = r.purse ? C.sum(r.purse) : 0;
    var a = { price: this._money(r.price), paid: this._money(C.paid(r)), change: this._money(C.paid(r) - r.price), pip: this._money(C.pip(st)), name: this._name(),
      sum: this._money(pre), purse: this._money(pre), added: this._money(C.sum(C.vals(st, 'added'))), tags: (r.tags || []).map(function (x) { return self._money(x); }).join(' + ') };
    return a;
  },
  _success: function () {
    var st = this.st, v = this._view, r = st.round, C = ChangeBoxCore, a = this._args();
    /* the decimal form beside an amount of a euro / real or more, in the success sentence only */
    a.paid += this._dec(C.paid(r)); if (r.kind !== 'basket') a.price += this._dec(r.price);
    var msg = this._t(C.okKey(st), a);
    v.note = ''; v.hintIds = []; v.bob = null;
    v.rail = r.kind === 'enough' ? null : { type: 'done', steps: C.count(C.pipVals(st), 0), goal: r.price, cross: -1, short: false };
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectChangeBoxCSS() {
  if (typeof document === 'undefined' || document.getElementById('cb-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.cb-wrap{position:relative;width:100%;max-width:680px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .cb-wrap:focus{outline:none;}'
  /* the shelf: toys with their tags, the payment */
  + '.cb-shelf{display:flex;align-items:flex-end;justify-content:center;flex-wrap:wrap;gap:14px;width:100%;padding:6px 8px 0;border-top:18px solid transparent;border-image:repeating-linear-gradient(90deg,#146B5E 0 22px,#FFF8E7 22px 44px) 18;} .cb-wrap.is-narrow .cb-shelf{border-top-width:10px;gap:8px;padding-top:2px;flex-wrap:nowrap;} .cb-wrap.is-cramp .cb-shelf{gap:4px;padding:0;}'
  + '.cb-item{display:flex;flex-direction:column;align-items:center;gap:2px;} .cb-toy{display:block;} .cb-picwait{display:block;} .cb-item.is-bagged .cb-toy{animation:cbBag .6s ease both;} @keyframes cbBag{to{transform:translateY(-10px) scale(.9);opacity:.85;}}'
  + '.cb-tag{position:relative;font-family:' + H + ';font-weight:800;font-size:24px;line-height:1.1;color:' + INK + ';background:#FFF8E7;border:3px solid ' + INK + ';border-radius:8px;padding:0 10px;white-space:nowrap;} .cb-wrap.is-narrow .cb-tag{font-size:18px;padding:0 6px;}'
  + '.cb-stamp{position:absolute;right:-14px;top:-14px;width:26px;height:26px;background:#FFF8E7;border-radius:50%;}'
  + '.cb-pay{display:flex;align-items:center;gap:4px;padding:6px 8px;border-radius:10px;background:#E9E2D2;box-shadow:inset 0 2px 0 rgba(0,0,0,.1);line-height:0;} .cb-pay.is-going{animation:cbGo 1.2s ease;} @keyframes cbGo{0%{transform:translateX(0);}40%{transform:translateX(-14px);}100%{transform:translateX(0);}} .cb-payitem{display:block;}'
  /* the counter: the change box and its pile; the two dishes */
  + '.cb-counter{display:flex;align-items:center;justify-content:center;gap:12px;width:100%;padding:10px;border-radius:14px;background:#E7C9A0;box-shadow:inset 0 0 0 3px ' + INK + ',0 4px 0 #B8925E;} .cb-wrap.is-narrow .cb-counter{flex-direction:column;gap:8px;padding:8px;}'
  + '.cb-boxside{flex:1 1 0;min-width:0;display:flex;align-items:center;gap:8px;} .cb-boxcol{flex:none;display:flex;flex-direction:column;align-items:center;gap:4px;} .cb-box{flex:none;width:70px;height:84px;} .cb-wrap.is-narrow .cb-box{width:56px;height:68px;} .cb-wrap.is-narrow .cb-pay{padding:3px 4px;} .cb-wrap.is-cramp .cb-box{width:52px;height:62px;} .cb-box.is-rattle{animation:cbRattle .12s linear 5;} @keyframes cbRattle{25%{transform:translate(-2px,1px) rotate(-3deg);}75%{transform:translate(2px,-1px) rotate(3deg);}}'
  + '.cb-pile{flex:1 1 auto;min-width:0;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;min-height:72px;padding:8px;border-radius:12px;background:rgba(255,248,231,.55);} .cb-wrap.is-cramp .cb-pile{gap:4px;padding:6px;}'
  + '.cb-dishes{flex:1 1 0;min-width:0;display:flex;gap:10px;align-items:flex-end;} .cb-wrap.is-narrow .cb-dishes{width:100%;}'
  + '.cb-dish{position:relative;flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:4px;padding:8px 8px 10px;border-radius:40%/34%;min-height:96px;justify-content:center;} .cb-wrap.is-narrow .cb-dish{min-height:72px;padding:6px;} .cb-tray{background:#DDF1EC;box-shadow:inset 0 0 0 4px #146B5E;} .cb-pipdish{background:#FDE3D6;box-shadow:inset 0 0 0 4px #F2784B;}'
  + '.cb-tray.is-closed{box-shadow:inset 0 0 0 4px #146B5E,0 -6px 0 #146B5E;}'
  + '.cb-dishlab{display:block;width:22px;height:22px;} .cb-dishlab svg{width:22px;height:22px;}'
  + '.cb-dishcoins{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px;line-height:0;} .cb-wrap.is-narrow .cb-pipdish .cb-dishcoins{gap:1px;} .cb-pcoin{display:block;}'
  + '.cb-pipcol{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:2px;} .cb-pipcol .cb-dish{width:100%;flex:none;} .cb-otter{display:block;} .cb-otter.is-hop{animation:cbHop .5s ease 2;} @keyframes cbHop{50%{transform:translateY(-12px);}}'
  + '.cb-live{font-family:' + H + ';font-weight:800;font-size:16px;color:#A3401F;white-space:nowrap;}'
  + '.cb-coin{position:relative;display:flex;align-items:center;justify-content:center;padding:0;border:0;background:none;border-radius:50%;cursor:pointer;line-height:0;} .cb-coin:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .cb-coin:disabled{cursor:default;}'
  + '.cb-coin.is-pour{animation:cbPour .35s ease both;} @keyframes cbPour{from{transform:translateY(-24px);}}'
  + '.cb-coin.is-hint{box-shadow:0 0 0 3px #FFF8E7,0 0 0 6px #146B5E;border-radius:50%;opacity:.55;outline:3px dashed #146B5E;outline-offset:5px;}'
  + '.cb-coinnum{font-family:' + H + ';font-weight:800;fill:#2B2B2B;fill-opacity:.7;} .cb-notenum{font-family:' + H + ';font-weight:800;font-size:26px;fill:#2B2B2B;}'
  + '.cb-empty{display:block;width:44px;height:44px;}'
  /* Pip's count on the tag */
  + '.cb-rail{width:100%;padding:6px 10px;border-radius:12px;background:#FFF8E7;box-shadow:inset 0 0 0 2px #E2D6BF;} .cb-railrow{display:flex;align-items:flex-end;justify-content:center;flex-wrap:wrap;gap:6px;}'
  + '.cb-railcoin{display:flex;flex-direction:column;align-items:center;line-height:1;animation:cbPop .35s ease both;} .cb-railcoin b{font-family:' + H + ';font-weight:800;font-size:16px;color:#146B5E;white-space:nowrap;} .cb-railcoin.is-over b{color:#C4522F;} .cb-railcoin.is-over{animation:cbPop .35s ease both,cbWob .5s ease 1s 2;} @keyframes cbPop{from{transform:translateY(-16px);}} @keyframes cbWob{50%{transform:rotate(-10deg);}}'
  + '.cb-railstart,.cb-railgoal{font-family:' + H + ';font-weight:800;font-size:18px;padding:2px 8px;border-radius:8px;white-space:nowrap;align-self:flex-end;} .cb-railstart{background:#E9E2D2;} .cb-railgoal{background:#FFF8E7;border:3px solid ' + INK + ';} .cb-railgoal.is-short{border-color:#C4522F;box-shadow:0 0 0 4px #FDE3D6;}'
  + '.cb-railsign{font-family:' + H + ';font-weight:800;font-size:24px;color:' + INK + ';align-self:flex-end;}'
  + '.cb-wrap.is-narrow .cb-tray{flex:2.3 1 0;} .cb-wrap.is-narrow .cb-tray .cb-dishcoins{gap:2px;} .cb-wrap.is-narrow .cb-dishlab{display:none;} .cb-wrap.is-narrow .cb-item{gap:0;} .cb-wrap.is-narrow .cb-tag{margin-top:-6px;} .cb-wrap.is-narrow .cb-pile{min-height:48px;padding:4px;}'
  + '.cb-wrap.is-cramp .cb-counter{padding:4px;} .cb-wrap.is-cramp .cb-pile{gap:2px;padding:2px 0;} .cb-wrap.is-cramp .cb-tray .cb-dishcoins{gap:1px;} .cb-wrap.is-cramp .cb-dish{min-height:52px;}'
  + '.cb-wrap.is-cramp .cb-box{width:44px;height:54px;} .cb-wrap.is-cramp .cb-boxside{gap:4px;} .cb-wrap.is-narrow .cb-railcoin b{font-size:13px;} .cb-wrap.is-narrow .cb-railstart,.cb-wrap.is-narrow .cb-railgoal{font-size:15px;padding:1px 6px;} .cb-wrap.is-narrow .cb-railrow{gap:4px;} .cb-wrap.is-narrow .cb-rail{padding:4px 6px;}'
  + '.cb-wrap.is-done.is-narrow .cb-boxside{display:none;} .cb-wrap.is-done .cb-pile{display:none;}'
  + '.cb-amt{display:inline-flex;flex-direction:column;align-items:center;line-height:1;} .cb-amt i{font-style:normal;font-size:.5em;}'
  + '.cb-item.is-side{flex-direction:row;align-items:center;gap:4px;} .cb-item.is-side .cb-tag{margin-top:0;}'
  + '.cb-wrap.is-cramp{gap:5px;} .cb-wrap.is-cramp .cb-counter{padding:6px;gap:6px;} .cb-wrap.is-cramp .cb-shelf{border-top-width:6px;} .cb-wrap.is-cramp .cb-dish{min-height:60px;padding:4px;} .cb-wrap.is-cramp .cb-pile{min-height:56px;}'
  + '.cb-ctrl{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;width:100%;}'
  + '.cb-yn{min-width:140px;height:58px;padding:0 16px;border:0;border-radius:14px;background:#FFF8E7;box-shadow:inset 0 0 0 3px ' + INK + ',0 3px 0 #CFC4AE;font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';cursor:pointer;} .cb-yn.is-chosen{background:#146B5E;color:#fff;box-shadow:0 3px 0 #0D4A41;} .cb-wrap.is-narrow .cb-yn{min-width:0;flex:1 1 0;max-width:150px;height:52px;padding:0 6px;font-size:16px;white-space:nowrap;}'
  + '.cb-side{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:6px;padding:6px 10px;border-radius:12px;background:#E9DCC4;} .cb-supply::after{content:"";position:absolute;left:12%;right:12%;bottom:-5px;height:5px;border-radius:50%;background:rgba(122,94,20,.35);}'
  + '.is-bob{animation:cbBob .45s ease 2;} @keyframes cbBob{50%{transform:translateY(-6px);}}'
  + '.cb-go{height:52px;padding:0 22px;border:0;border-radius:14px;background:#146B5E;color:#fff;font-family:' + H + ';font-weight:800;font-size:20px;display:flex;align-items:center;gap:6px;cursor:pointer;box-shadow:0 3px 0 #0D4A41;} .cb-go svg{width:22px;height:22px;} .cb-go:disabled{opacity:.45;cursor:default;} .cb-wrap.is-done .cb-go{display:none;}'
  + '.cb-note{margin:0;min-height:1.3em;font-family:' + B + ';font-weight:700;font-size:18px;color:#146B5E;text-align:center;} .cb-note.is-hint{color:#A3401F;} .cb-wrap.is-narrow .cb-note{font-size:16px;} .cb-wrap.is-cramp .cb-note{font-size:15px;line-height:1.3;} .cb-wrap.is-done .cb-note:empty{display:none;}'
  + '.cb-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '@media (prefers-reduced-motion:reduce){.cb-wrap *{animation:none !important;}}';
  var s = document.createElement('style'); s.id = 'cb-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.ChangeBoxActivity = ChangeBoxActivity;
