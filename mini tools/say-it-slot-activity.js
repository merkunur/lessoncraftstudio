/* =====================================================================
   say-it-slot-activity.js — ACTIVITY #165 of the one-by-one rebuild:
   "Count Out the Money — Coins to a Target Amount" (2.MD.C.8)
   → THE SAY-IT SLOT. Model: say-it-slot-core.js. Design:
   docs/activities-rebuild/designs/165-money.md
   ---------------------------------------------------------------------
   Pip's bakery coin box has a slot, a counter of number wheels and a
   price pin. A coin goes in only when the counter already says what the
   box will hold with that coin inside; any other number flips the coin
   back out. The wheels clack against the price pin, so overshoot cannot
   happen, and the purse is real, so spending the small coins first can
   strand you. There is no running total and no Check button: every drop
   is its own check. Level 1 counts out a price, level 2 with the fewest
   coins, level 3 tops up Pip's coins or counts two trays to see which
   holds more. Next appears .OK_MS after success.
   ===================================================================== */
var SayItSlotActivity = {
  id: 'say-it-slot-activity',
  THEMES: ['bakery'],
  /* the drawn apparatus (box, wheels, coins, trays, slips): declared for the hierarchy audit */
  apparatusClasses: ['si-'],
  /*STRINGS-BEGIN*/strings: {
    title: {"en":"Count Out the Money","de":"Geld abzählen","fr":"Compte la monnaie","es":"Cuenta el dinero","pt":"Conte o dinheiro","it":"Conta i soldi","nl":"Tel het geld","sv":"Räkna pengarna","da":"Tæl pengene","no":"Tell pengene","fi":"Laske rahat"},
    instruction: {"en":"Turn the counter to what the box will hold with your coin in it, then drop the coin into the slot. A wrong number sends the coin back out, and the counter never goes past the price.","de":"Stell das Zählwerk auf den Betrag, der mit deiner Münze in der Münzkasse ist, und wirf die Münze dann in den Schlitz. Bei einer falschen Zahl kommt die Münze wieder heraus, und das Zählwerk geht nie über den Preis hinaus.","fr":"Tourne le compteur jusqu’à ce que la caisse affiche ce qu’elle contiendra avec ta pièce, puis glisse la pièce dans la fente. Si le nombre est faux, la pièce ressort, et le compteur ne dépasse jamais le prix.","es":"Gira el contador hasta lo que tendrá la alcancía con tu moneda adentro y luego echa la moneda por la ranura. Si el número está mal, la moneda sale de nuevo, y el contador nunca pasa del precio.","pt":"Gire o contador até o valor que o cofrinho vai ter com a sua moeda dentro e depois coloque a moeda na fenda. Se o número estiver errado, a moeda volta, e o contador nunca passa do preço.","it":"Gira il contatore fino a quanto avrà la cassetta con la tua moneta dentro, poi infila la moneta nella fessura. Se il numero è sbagliato la moneta esce di nuovo, e il contatore non supera mai il prezzo.","nl":"Draai de teller naar wat er in het kistje zit als jouw munt erbij komt, en gooi de munt dan in de gleuf. Bij een verkeerd getal komt de munt er weer uit, en de teller gaat nooit verder dan de prijs.","sv":"Vrid räkneverket till det som finns i myntlådan med ditt mynt i, och släpp sedan myntet i springan. Fel tal skickar tillbaka myntet, och räkneverket går aldrig förbi priset.","da":"Drej tælleværket hen på det, møntkassen vil indeholde med din mønt i, og put så mønten i sprækken. Et forkert tal sender mønten ud igen, og tælleværket går aldrig forbi prisen.","no":"Vri telleverket til det myntkassa vil inneholde med mynten din i, og slipp så mynten ned i sprekken. Et feil tall sender mynten ut igjen, og telleverket går aldri forbi prisen.","fi":"Käännä laskuri siihen summaan, joka lippaassa on, kun kolikkosi on mukana, ja pudota kolikko sitten rakoon. Väärällä luvulla kolikko tulee takaisin ulos, eikä laskuri koskaan mene hinnan yli."},
    instrBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    okBubble: {"en":"{msg}","de":"{msg}","fr":"{msg}","es":"{msg}","pt":"{msg}","it":"{msg}","nl":"{msg}","sv":"{msg}","da":"{msg}","no":"{msg}","fi":"{msg}"},
    setLevel: {"en":"Level","de":"Stufe","fr":"Niveau","es":"Nivel","pt":"Nível","it":"Livello","nl":"Niveau","sv":"Nivå","da":"Niveau","no":"Nivå","fi":"Taso"},
    l1: {"en":"Count out","de":"Abzählen","fr":"Compter la somme","es":"Contar","pt":"Contar","it":"Contare","nl":"Bedrag maken","sv":"Räkna upp","da":"Tæl op","no":"Tell opp","fi":"Laske summa"},
    l2: {"en":"Fewest coins","de":"Wenigste Münzen","fr":"Le moins de pièces","es":"Menos monedas","pt":"Menos moedas","it":"Meno monete","nl":"Zo min mogelijk munten","sv":"Färst mynt","da":"Færrest mønter","no":"Færrest mynter","fi":"Vähiten kolikoita"},
    l3: {"en":"Top up and compare","de":"Auffüllen und vergleichen","fr":"Compléter et comparer","es":"Completar y comparar","pt":"Completar e comparar","it":"Completare e confrontare","nl":"Aanvullen en vergelijken","sv":"Fyll på och jämför","da":"Fyld op og sammenlign","no":"Fyll på og sammenlign","fi":"Täydennä ja vertaa"},
    setCoins: {"en":"Coins","de":"Münzen","fr":"Pièces","es":"Monedas","pt":"Moedas","it":"Monete","nl":"Munten","sv":"Mynt","da":"Mønter","no":"Mynter","fi":"Kolikot"},
    mPurse: {"en":"A purse of coins","de":"Münzen im Geldbeutel","fr":"Un porte-monnaie","es":"Un monedero","pt":"Um porta-moedas","it":"Un borsellino","nl":"Een portemonnee","sv":"En plånbok","da":"En pung","no":"En lommebok","fi":"Kukkaro"},
    mEndless: {"en":"Endless coins","de":"Unendlich viele Münzen","fr":"Pièces à volonté","es":"Monedas sin fin","pt":"Moedas sem fim","it":"Monete infinite","nl":"Onbeperkt munten","sv":"Hur många mynt som helst","da":"Uendeligt mange mønter","no":"Uendelig mange mynter","fi":"Loputtomasti kolikoita"},
    pCount: {"en":"Pay exactly {price}.","de":"Bezahle genau {price}.","fr":"Paie exactement {price}.","es":"Paga exactamente {price}.","pt":"Pague exatamente {price}.","it":"Paga esattamente {price}.","nl":"Betaal precies {price}.","sv":"Betala precis {price}.","da":"Betal præcis {price}.","no":"Betal nøyaktig {price}.","fi":"Maksa tasan {price}."},
    pFewest: {"en":"Pay exactly {price} with the fewest coins.","de":"Bezahle genau {price} mit so wenigen Münzen wie möglich.","fr":"Paie exactement {price} avec le moins de pièces possible.","es":"Paga exactamente {price} con la menor cantidad de monedas.","pt":"Pague exatamente {price} com o menor número de moedas.","it":"Paga esattamente {price} con meno monete possibile.","nl":"Betaal precies {price} met zo min mogelijk munten.","sv":"Betala precis {price} med så få mynt som möjligt.","da":"Betal præcis {price} med så få mønter som muligt.","no":"Betal nøyaktig {price} med så få mynter som mulig.","fi":"Maksa tasan {price} mahdollisimman vähillä kolikoilla."},
    pTop: {"en":"The box already holds {in}. Fill it up to {price}.","de":"In der Kasse sind schon {in}. Füll sie auf {price} auf.","fr":"La caisse contient déjà {in}. Complète jusqu’à {price}.","es":"La alcancía ya tiene {in}. Llénala hasta {price}.","pt":"O cofrinho já tem {in}. Complete até {price}.","it":"Nella cassetta ci sono già {in}. Riempila fino a {price}.","nl":"In het kistje zit al {in}. Vul het aan tot {price}.","sv":"I myntlådan finns redan {in}. Fyll på till {price}.","da":"I møntkassen er der allerede {in}. Fyld op til {price}.","no":"I myntkassa ligger det allerede {in}. Fyll på til {price}.","fi":"Lippaassa on jo {in}. Täydennä summaan {price}."},
    pCompare: {"en":"Which tray holds more money? Tap it.","de":"Auf welchem Tablett liegt mehr Geld? Tippe es an.","fr":"Quel plateau contient le plus d’argent ? Touche-le.","es":"¿Qué charola tiene más dinero? Tócala.","pt":"Qual bandeja tem mais dinheiro? Toque nela.","it":"Quale vassoio contiene più soldi? Toccalo.","nl":"Op welk schaaltje ligt meer geld? Tik erop.","sv":"Vilken bricka har mest pengar? Tryck på den.","da":"Hvilken bakke har flest penge? Tryk på den.","no":"Hvilket brett har mest penger? Trykk på det.","fi":"Kummalla tarjottimella on enemmän rahaa? Napauta sitä."},
    pCompare2: {"en":"Now count each tray into the box.","de":"Zähle jetzt jedes Tablett in die Kasse.","fr":"Maintenant, compte chaque plateau dans la caisse.","es":"Ahora cuenta cada charola en la alcancía.","pt":"Agora conte cada bandeja no cofrinho.","it":"Adesso conta ogni vassoio nella cassetta.","nl":"Tel nu elk schaaltje in het kistje.","sv":"Räkna nu in varje bricka i myntlådan.","da":"Tæl nu hver bakke ind i møntkassen.","no":"Tell nå hvert brett inn i myntkassa.","fi":"Laske nyt kumpikin tarjotin lippaaseen."},
    hintIdle: {"en":"Turn the counter first: what will the box hold with this coin in it?","de":"Stell zuerst das Zählwerk: Wie viel ist mit dieser Münze in der Kasse?","fr":"Tourne d’abord le compteur : combien la caisse contiendra-t-elle avec cette pièce ?","es":"Primero gira el contador: ¿cuánto tendrá la alcancía con esta moneda?","pt":"Primeiro gire o contador: quanto o cofrinho vai ter com esta moeda?","it":"Prima gira il contatore: quanto ci sarà nella cassetta con questa moneta?","nl":"Draai eerst de teller: hoeveel zit er in het kistje met deze munt erbij?","sv":"Vrid räkneverket först: hur mycket finns i lådan med det här myntet?","da":"Drej tælleværket først: hvor meget er der i kassen med denne mønt?","no":"Vri telleverket først: hvor mye er det i kassa med denne mynten?","fi":"Käännä ensin laskuri: paljonko lippaassa on tämän kolikon kanssa?"},
    hintPick: {"en":"Tap a coin, or drag it to the slot.","de":"Tippe eine Münze an oder zieh sie zum Schlitz.","fr":"Touche une pièce, ou fais-la glisser jusqu’à la fente.","es":"Toca una moneda o arrástrala hasta la ranura.","pt":"Toque em uma moeda ou arraste-a até a fenda.","it":"Tocca una moneta oppure trascinala fino alla fessura.","nl":"Tik op een munt of sleep hem naar de gleuf.","sv":"Tryck på ett mynt eller dra det till springan.","da":"Tryk på en mønt, eller træk den hen til sprækken.","no":"Trykk på en mynt, eller dra den til sprekken.","fi":"Napauta kolikkoa tai vedä se rakoon."},
    hintMiss1: {"en":"The box holds {in}. Count on what this coin is worth, then drop it again.","de":"In der Kasse sind {in}. Zähle den Wert dieser Münze dazu und wirf sie noch einmal ein.","fr":"La caisse contient {in}. Ajoute la valeur de cette pièce, puis glisse-la de nouveau.","es":"La alcancía tiene {in}. Suma lo que vale esta moneda y échala otra vez.","pt":"O cofrinho tem {in}. Some o valor desta moeda e coloque-a de novo.","it":"Nella cassetta ci sono {in}. Aggiungi quanto vale questa moneta e infilala di nuovo.","nl":"In het kistje zit {in}. Tel de waarde van deze munt erbij en gooi hem er opnieuw in.","sv":"I lådan finns {in}. Räkna vidare med det här myntets värde och släpp det igen.","da":"Der er {in} i kassen. Tæl videre med det, mønten er værd, og put den i igen.","no":"Det er {in} i kassa. Tell videre med det mynten er verdt, og slipp den ned igjen.","fi":"Lippaassa on {in}. Laske siihen lisää tämän kolikon arvo ja pudota se uudelleen."},
    hintMiss2: {"en":"Watch: {in} … {steps}. Now you turn the counter and drop the coin.","de":"Schau: {in} … {steps}. Jetzt stellst du das Zählwerk und wirfst die Münze ein.","fr":"Regarde : {in} … {steps}. À toi de tourner le compteur et de glisser la pièce.","es":"Mira: {in} … {steps}. Ahora gira tú el contador y echa la moneda.","pt":"Veja: {in} … {steps}. Agora é sua vez de girar o contador e colocar a moeda.","it":"Guarda: {in} … {steps}. Ora gira tu il contatore e infila la moneta.","nl":"Kijk: {in} … {steps}. Draai nu zelf de teller en gooi de munt erin.","sv":"Titta: {in} … {steps}. Nu vrider du räkneverket och släpper myntet.","da":"Se: {in} … {steps}. Nu drejer du tælleværket og putter mønten i.","no":"Se: {in} … {steps}. Nå vrir du telleverket og slipper mynten ned.","fi":"Katso: {in} … {steps}. Käännä nyt sinä laskuri ja pudota kolikko."},
    hintPin: {"en":"The counter stops at {price}. This coin is too much: try a smaller coin.","de":"Das Zählwerk bleibt bei {price} stehen. Diese Münze ist zu viel: Nimm eine kleinere.","fr":"Le compteur s’arrête à {price}. Cette pièce, c’est trop : essaie une pièce plus petite.","es":"El contador se detiene en {price}. Esta moneda es demasiado: prueba una más chica.","pt":"O contador para em {price}. Esta moeda é demais: tente uma menor.","it":"Il contatore si ferma a {price}. Questa moneta è troppo: prova con una più piccola.","nl":"De teller stopt bij {price}. Deze munt is te veel: probeer een kleinere.","sv":"Räkneverket stannar vid {price}. Det här myntet är för mycket: prova ett mindre.","da":"Tælleværket stopper ved {price}. Denne mønt er for meget: prøv en mindre.","no":"Telleverket stopper på {price}. Denne mynten er for mye: prøv en mindre.","fi":"Laskuri pysähtyy kohtaan {price}. Tämä kolikko on liikaa: kokeile pienempää."},
    hintPinStop: {"en":"The counter stops at {price}.","de":"Das Zählwerk bleibt bei {price} stehen.","fr":"Le compteur s’arrête à {price}.","es":"El contador se detiene en {price}.","pt":"O contador para em {price}.","it":"Il contatore si ferma a {price}.","nl":"De teller stopt bij {price}.","sv":"Räkneverket stannar vid {price}.","da":"Tælleværket stopper ved {price}.","no":"Telleverket stopper på {price}.","fi":"Laskuri pysähtyy kohtaan {price}."},
    hintFloor: {"en":"The box already holds {in}. The counter can’t go lower.","de":"In der Kasse sind schon {in}. Weniger geht nicht.","fr":"La caisse contient déjà {in}. Le compteur ne peut pas descendre plus bas.","es":"La alcancía ya tiene {in}. El contador no puede bajar más.","pt":"O cofrinho já tem {in}. O contador não pode descer mais.","it":"Nella cassetta ci sono già {in}. Il contatore non può scendere di più.","nl":"In het kistje zit al {in}. Lager kan de teller niet.","sv":"I lådan finns redan {in}. Lägre kan räkneverket inte gå.","da":"Der er allerede {in} i kassen. Lavere kan tælleværket ikke gå.","no":"Det er allerede {in} i kassa. Lavere kan telleverket ikke gå.","fi":"Lippaassa on jo {in}. Laskuri ei voi mennä alemmas."},
    hintStranded: {"en":"The coins left can’t make {gap} more. Pull the lever to take coins back.","de":"Mit den übrigen Münzen schaffst du die fehlenden {gap} nicht. Zieh am Hebel, um Münzen zurückzuholen.","fr":"Avec les pièces qui restent, tu ne peux pas faire les {gap} qui manquent. Tire le levier pour reprendre des pièces.","es":"Con las monedas que quedan no se pueden juntar los {gap} que faltan. Jala la palanca para sacar monedas.","pt":"Com as moedas que sobraram não dá para fazer os {gap} que faltam. Puxe a alavanca para tirar moedas.","it":"Con le monete rimaste non arrivi ai {gap} che mancano. Tira la leva per riprendere delle monete.","nl":"Met de munten die over zijn, kun je de {gap} die nog ontbreekt niet maken. Trek aan de hendel om munten terug te halen.","sv":"Med mynten som är kvar går det inte att få ihop {gap} till. Dra i spaken för att ta tillbaka mynt.","da":"Med de mønter, der er tilbage, kan du ikke nå de {gap}, der mangler. Træk i håndtaget for at tage mønter tilbage.","no":"Med myntene som er igjen, får du ikke til de {gap} som mangler. Dra i spaken for å ta tilbake mynter.","fi":"Jäljellä olevilla kolikoilla ei saa kokoon puuttuvaa summaa {gap}. Vedä vivusta ja ota kolikoita takaisin."},
    hintStranded2: {"en":"Start with the biggest coin that fits, then count on.","de":"Fang mit der größten Münze an, die passt, und zähle dann weiter.","fr":"Commence par la plus grande pièce qui convient, puis continue à compter.","es":"Empieza con la moneda más grande que quepa y luego sigue contando.","pt":"Comece pela maior moeda que couber e depois continue contando.","it":"Comincia dalla moneta più grande che ci sta, poi continua a contare.","nl":"Begin met de grootste munt die past en tel dan verder.","sv":"Börja med det största myntet som får plats och räkna sedan vidare.","da":"Begynd med den største mønt, der passer, og tæl så videre.","no":"Begynn med den største mynten som passer, og tell så videre.","fi":"Aloita suurimmasta kolikosta, joka mahtuu, ja laske sitten eteenpäin."},
    hintFewer1: {"en":"Exactly {price}! Can you pay it with fewer coins?","de":"Genau {price}! Schaffst du es mit weniger Münzen?","fr":"Exactement {price} ! Peux-tu payer avec moins de pièces ?","es":"¡Exactamente {price}! ¿Puedes pagarlo con menos monedas?","pt":"Exatamente {price}! Você consegue pagar com menos moedas?","it":"Esattamente {price}! Riesci a pagare con meno monete?","nl":"Precies {price}! Kun je het met minder munten betalen?","sv":"Precis {price}! Kan du betala med färre mynt?","da":"Præcis {price}! Kan du betale med færre mønter?","no":"Nøyaktig {price}! Klarer du å betale med færre mynter?","fi":"Tasan {price}! Osaatko maksaa vähemmillä kolikoilla?"},
    hintFewer2: {"en":"Use the circled coin: pull the lever to take coins back, then drop the circled coin in.","de":"Nimm die markierte Münze: Hol mit dem Hebel Münzen zurück und wirf dann die markierte Münze ein.","fr":"Prends la pièce entourée : tire le levier pour reprendre des pièces, puis glisse-la dans la fente.","es":"Usa la moneda marcada: jala la palanca para sacar monedas y luego échala.","pt":"Use a moeda marcada: puxe a alavanca para tirar moedas e depois coloque-a.","it":"Usa la moneta cerchiata: tira la leva per riprendere delle monete, poi infilala.","nl":"Gebruik de omcirkelde munt: haal met de hendel munten terug en gooi hem er dan in.","sv":"Använd det inringade myntet: dra i spaken för att ta tillbaka mynt och släpp sedan ner det.","da":"Brug mønten, der er sat ring om: træk i håndtaget for at tage mønter tilbage, og put den så i.","no":"Bruk mynten med ring rundt: dra i spaken for å ta tilbake mynter, og slipp den så ned.","fi":"Käytä ympyröityä kolikkoa: vedä vivusta ja ota kolikoita takaisin, pudota se sitten rakoon."},
    hintCompare: {"en":"{big} is more than {small}. More coins is not always more money. Tap the tray with more money.","de":"{big} ist mehr als {small}. Mehr Münzen heißt nicht immer mehr Geld. Tippe das Tablett mit mehr Geld an.","fr":"{big}, c’est plus que {small}. Plus de pièces, ce n’est pas toujours plus d’argent. Touche le plateau qui contient le plus d’argent.","es":"{big} es más que {small}. Más monedas no siempre es más dinero. Toca la charola con más dinero.","pt":"{big} é mais que {small}. Mais moedas nem sempre é mais dinheiro. Toque na bandeja com mais dinheiro.","it":"{big} è più di {small}. Più monete non vuol dire sempre più soldi. Tocca il vassoio con più soldi.","nl":"{big} is meer dan {small}. Meer munten is niet altijd meer geld. Tik op het schaaltje met meer geld.","sv":"{big} är mer än {small}. Fler mynt är inte alltid mer pengar. Tryck på brickan med mest pengar.","da":"{big} er mere end {small}. Flere mønter er ikke altid flere penge. Tryk på bakken med flest penge.","no":"{big} er mer enn {small}. Flere mynter er ikke alltid mer penger. Trykk på brettet med mest penger.","fi":"{big} on enemmän kuin {small}. Useampi kolikko ei aina tarkoita enemmän rahaa. Napauta tarjotinta, jolla on enemmän rahaa."},
    hintCompareMoney: {"en":"{big} is more than {small}. Tap the tray with more money.","de":"{big} ist mehr als {small}. Tippe das Tablett mit mehr Geld an.","fr":"{big}, c’est plus que {small}. Touche le plateau qui contient le plus d’argent.","es":"{big} es más que {small}. Toca la charola con más dinero.","pt":"{big} é mais que {small}. Toque na bandeja com mais dinheiro.","it":"{big} è più di {small}. Tocca il vassoio con più soldi.","nl":"{big} is meer dan {small}. Tik op het schaaltje met meer geld.","sv":"{big} är mer än {small}. Tryck på brickan med mest pengar.","da":"{big} er mere end {small}. Tryk på bakken med flest penge.","no":"{big} er mer enn {small}. Trykk på brettet med mest penger.","fi":"{big} on enemmän kuin {small}. Napauta tarjotinta, jolla on enemmän rahaa."},
    hintSlip: {"en":"That tray is counted. Now count the other tray.","de":"Dieses Tablett ist gezählt. Zähle jetzt das andere.","fr":"Ce plateau est compté. Compte maintenant l’autre.","es":"Esa charola ya está contada. Ahora cuenta la otra.","pt":"Essa bandeja já foi contada. Agora conte a outra.","it":"Quel vassoio è contato. Ora conta l’altro.","nl":"Dat schaaltje is geteld. Tel nu het andere.","sv":"Den brickan är räknad. Räkna nu den andra.","da":"Den bakke er talt. Tæl nu den anden.","no":"Det brettet er telt. Tell nå det andre.","fi":"Se tarjotin on laskettu. Laske nyt toinen."},
    hintPickFirst: {"en":"First tap the tray you think holds more money.","de":"Tippe zuerst das Tablett an, auf dem du mehr Geld vermutest.","fr":"Touche d’abord le plateau qui, selon toi, contient le plus d’argent.","es":"Primero toca la charola que crees que tiene más dinero.","pt":"Primeiro toque na bandeja que você acha que tem mais dinheiro.","it":"Prima tocca il vassoio che secondo te contiene più soldi.","nl":"Tik eerst op het schaaltje waarvan je denkt dat er meer geld op ligt.","sv":"Tryck först på den bricka som du tror har mest pengar.","da":"Tryk først på den bakke, du tror har flest penge.","no":"Trykk først på det brettet du tror har mest penger.","fi":"Napauta ensin tarjotinta, jolla arvelet olevan enemmän rahaa."},
    hintOtherTray: {"en":"Finish counting this tray first.","de":"Zähle zuerst dieses Tablett fertig.","fr":"Finis d’abord de compter ce plateau.","es":"Primero termina de contar esta charola.","pt":"Termine de contar esta bandeja primeiro.","it":"Prima finisci di contare questo vassoio.","nl":"Tel eerst dit schaaltje helemaal.","sv":"Räkna klart den här brickan först.","da":"Tæl først denne bakke færdig.","no":"Tell ferdig dette brettet først.","fi":"Laske ensin tämä tarjotin loppuun."},
    okCount: {"en":"You counted {chain}: exactly {price}!","de":"Du hast gezählt: {chain}. Genau {price}!","fr":"Tu as compté {chain} : exactement {price} !","es":"Contaste {chain}: ¡exactamente {price}!","pt":"Você contou {chain}: exatamente {price}!","it":"Hai contato {chain}: esattamente {price}!","nl":"Je telde {chain}: precies {price}!","sv":"Du räknade {chain}: precis {price}!","da":"Du talte {chain}: præcis {price}!","no":"Du telte {chain}: nøyaktig {price}!","fi":"Laskit {chain}: tasan {price}!"},
    okFewest: {"en":"{price} with just {n} coins: {chain}.","de":"{price} mit nur {n} Münzen: {chain}.","fr":"{price} avec seulement {n} pièces : {chain}.","es":"{price} con solo {n} monedas: {chain}.","pt":"{price} com só {n} moedas: {chain}.","it":"{price} con solo {n} monete: {chain}.","nl":"{price} met maar {n} munten: {chain}.","sv":"{price} med bara {n} mynt: {chain}.","da":"{price} med kun {n} mønter: {chain}.","no":"{price} med bare {n} mynter: {chain}.","fi":"{price} vain {n} kolikolla: {chain}."},
    okTop: {"en":"{in} + {added} = {price}. You needed {added} more.","de":"{in} + {added} = {price}. Es haben {added} gefehlt.","fr":"{in} + {added} = {price}. Il manquait {added}.","es":"{in} + {added} = {price}. Te faltaban {added}.","pt":"{in} + {added} = {price}. Faltavam {added}.","it":"{in} + {added} = {price}. Mancavano {added}.","nl":"{in} + {added} = {price}. Er ontbrak nog {added}.","sv":"{in} + {added} = {price}. Det fattades {added}.","da":"{in} + {added} = {price}. Der manglede {added}.","no":"{in} + {added} = {price}. Det manglet {added}.","fi":"{in} + {added} = {price}. Puuttui {added}."},
    okCompare: {"en":"{big} is more than {small}: that tray holds more money!","de":"{big} ist mehr als {small}: Auf diesem Tablett liegt mehr Geld!","fr":"{big}, c’est plus que {small} : ce plateau contient le plus d’argent !","es":"{big} es más que {small}: ¡esa charola tiene más dinero!","pt":"{big} é mais que {small}: essa bandeja tem mais dinheiro!","it":"{big} è più di {small}: quel vassoio contiene più soldi!","nl":"{big} is meer dan {small}: op dat schaaltje ligt meer geld!","sv":"{big} är mer än {small}: den brickan har mest pengar!","da":"{big} er mere end {small}: den bakke har flest penge!","no":"{big} er mer enn {small}: det brettet har mest penger!","fi":"{big} on enemmän kuin {small}: sillä tarjottimella on enemmän rahaa!"},
    okSplit: {"en":"{cents} = {split}.","de":"{cents} = {split}.","fr":"{cents} = {split}.","es":"{cents} = {split}.","pt":"{cents} = {split}.","it":"{cents} = {split}.","nl":"{cents} = {split}.","sv":"{cents} = {split}.","da":"{cents} = {split}.","no":"{cents} = {split}.","fi":"{cents} = {split}."},
    aBox: {"en":"Coin box. The counter shows {n}.","de":"Münzkasse. Das Zählwerk zeigt {n}.","fr":"Caisse à monnaie. Le compteur affiche {n}.","es":"Alcancía. El contador marca {n}.","pt":"Cofrinho. O contador mostra {n}.","it":"Cassetta delle monete. Il contatore segna {n}.","nl":"Muntenkistje. De teller wijst {n} aan.","sv":"Myntlåda. Räkneverket visar {n}.","da":"Møntkasse. Tælleværket viser {n}.","no":"Myntkasse. Telleverket viser {n}.","fi":"Rahalipas. Laskuri näyttää {n}."},
    aSlot: {"en":"Coin slot","de":"Münzschlitz","fr":"Fente à pièces","es":"Ranura","pt":"Fenda","it":"Fessura","nl":"Gleuf","sv":"Myntspringa","da":"Møntsprække","no":"Myntsprekk","fi":"Kolikkorako"},
    aLever: {"en":"Give back the last coin","de":"Letzte Münze zurückholen","fr":"Reprendre la dernière pièce","es":"Sacar la última moneda","pt":"Tirar a última moeda","it":"Riprendi l’ultima moneta","nl":"Laatste munt terughalen","sv":"Ta tillbaka det sista myntet","da":"Tag den sidste mønt tilbage","no":"Ta tilbake den siste mynten","fi":"Ota viimeinen kolikko takaisin"},
    aRing: {"en":"Tip out all the coins","de":"Alle Münzen ausschütten","fr":"Vider toutes les pièces","es":"Vaciar todas las monedas","pt":"Esvaziar todas as moedas","it":"Rovescia tutte le monete","nl":"Alle munten uitschudden","sv":"Häll ut alla mynt","da":"Hæld alle mønterne ud","no":"Hell ut alle myntene","fi":"Kaada kaikki kolikot ulos"},
    aTrayCoral: {"en":"The coral tray","de":"Das korallenrote Tablett","fr":"Le plateau corail","es":"La charola coral","pt":"A bandeja coral","it":"Il vassoio corallo","nl":"Het koraalrode schaaltje","sv":"Den korallröda brickan","da":"Den koralrøde bakke","no":"Det korallrøde brettet","fi":"Korallinpunainen tarjotin"},
    aTrayTeal: {"en":"The teal tray","de":"Das türkise Tablett","fr":"Le plateau turquoise","es":"La charola turquesa","pt":"A bandeja verde-água","it":"Il vassoio turchese","nl":"Het turquoise schaaltje","sv":"Den turkosa brickan","da":"Den turkise bakke","no":"Det turkise brettet","fi":"Turkoosi tarjotin"},
    aSlipCoral: {"en":"Coral tray: {amt}","de":"Korallenrotes Tablett: {amt}","fr":"Plateau corail : {amt}","es":"Charola coral: {amt}","pt":"Bandeja coral: {amt}","it":"Vassoio corallo: {amt}","nl":"Koraalrood schaaltje: {amt}","sv":"Korallröd bricka: {amt}","da":"Koralrød bakke: {amt}","no":"Korallrødt brett: {amt}","fi":"Korallinpunainen tarjotin: {amt}"},
    aSlipTeal: {"en":"Teal tray: {amt}","de":"Türkises Tablett: {amt}","fr":"Plateau turquoise : {amt}","es":"Charola turquesa: {amt}","pt":"Bandeja verde-água: {amt}","it":"Vassoio turchese: {amt}","nl":"Turquoise schaaltje: {amt}","sv":"Turkos bricka: {amt}","da":"Turkis bakke: {amt}","no":"Turkis brett: {amt}","fi":"Turkoosi tarjotin: {amt}"},
    aIn: {"en":"In the box: {coin}.","de":"In der Kasse: {coin}.","fr":"Dans la caisse : {coin}.","es":"En la alcancía: {coin}.","pt":"No cofrinho: {coin}.","it":"Nella cassetta: {coin}.","nl":"In het kistje: {coin}.","sv":"I lådan: {coin}.","da":"I kassen: {coin}.","no":"I kassa: {coin}.","fi":"Lippaassa: {coin}."},
    aOut: {"en":"Back out: {coin}.","de":"Zurück: {coin}.","fr":"Ressortie : {coin}.","es":"Afuera: {coin}.","pt":"Saiu: {coin}.","it":"Fuori: {coin}.","nl":"Eruit: {coin}.","sv":"Ut igen: {coin}.","da":"Ud igen: {coin}.","no":"Ut igjen: {coin}.","fi":"Ulos: {coin}."},
    aCoin: {"en":"{amt} coin","de":"{amt}-Münze","fr":"pièce de {amt}","es":"moneda de {amt}","pt":"moeda de {amt}","it":"moneta da {amt}","nl":"munt van {amt}","sv":"mynt på {amt}","da":"mønt på {amt}","no":"mynt på {amt}","fi":"kolikko {amt}"},
    name1: {"en":"penny","de":"penny","fr":"penny","es":"penny","pt":"penny","it":"penny","nl":"penny","sv":"penny","da":"penny","no":"penny","fi":"penny"},
    name5: {"en":"nickel","de":"nickel","fr":"nickel","es":"nickel","pt":"nickel","it":"nickel","nl":"nickel","sv":"nickel","da":"nickel","no":"nickel","fi":"nickel"},
    name10: {"en":"dime","de":"dime","fr":"dime","es":"dime","pt":"dime","it":"dime","nl":"dime","sv":"dime","da":"dime","no":"dime","fi":"dime"},
    name25: {"en":"quarter","de":"quarter","fr":"quarter","es":"quarter","pt":"quarter","it":"quarter","nl":"quarter","sv":"quarter","da":"quarter","no":"quarter","fi":"quarter"},
    aHundUp: {"en":"Hundreds up","de":"Hunderter höher","fr":"Centaines plus","es":"Centenas más","pt":"Centenas para cima","it":"Centinaia su","nl":"Honderdtallen omhoog","sv":"Hundratal upp","da":"Hundreder op","no":"Hundrere opp","fi":"Satoja ylös"},
    aHundDown: {"en":"Hundreds down","de":"Hunderter niedriger","fr":"Centaines moins","es":"Centenas menos","pt":"Centenas para baixo","it":"Centinaia giù","nl":"Honderdtallen omlaag","sv":"Hundratal ned","da":"Hundreder ned","no":"Hundrere ned","fi":"Satoja alas"},
    aTensUp: {"en":"Tens up","de":"Zehner höher","fr":"Dizaines plus","es":"Decenas más","pt":"Dezenas para cima","it":"Decine su","nl":"Tientallen omhoog","sv":"Tiotal upp","da":"Tiere op","no":"Tiere opp","fi":"Kymmeniä ylös"},
    aTensDown: {"en":"Tens down","de":"Zehner niedriger","fr":"Dizaines moins","es":"Decenas menos","pt":"Dezenas para baixo","it":"Decine giù","nl":"Tientallen omlaag","sv":"Tiotal ned","da":"Tiere ned","no":"Tiere ned","fi":"Kymmeniä alas"},
    aOnesUp: {"en":"Ones up","de":"Einer höher","fr":"Unités plus","es":"Unidades más","pt":"Unidades para cima","it":"Unità su","nl":"Eenheden omhoog","sv":"Ental upp","da":"Enere op","no":"Enere opp","fi":"Ykkösiä ylös"},
    aOnesDown: {"en":"Ones down","de":"Einer niedriger","fr":"Unités moins","es":"Unidades menos","pt":"Unidades para baixo","it":"Unità giù","nl":"Eenheden omlaag","sv":"Ental ned","da":"Enere ned","no":"Enere ned","fi":"Ykkösiä alas"}
  },/*STRINGS-END*/
  defaults: { level: '1', coins: 'purse' },
  settings: [
    { key: 'level', type: 'choice', labelKey: 'setLevel', options: [{ value: '1', labelKey: 'l1' }, { value: '2', labelKey: 'l2' }, { value: '3', labelKey: 'l3' }] },
    { key: 'coins', type: 'choice', labelKey: 'setCoins', options: [{ value: 'purse', labelKey: 'mPurse' }, { value: 'endless', labelKey: 'mEndless' }] }
  ],
  OK_MS: 500, FAST: false,

  init: function (api) {
    var self = this;
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null;
    this._timers = []; this._ro = null; this._view = {}; this._drag = null; this._themes = {}; this._picsReady = false;
    injectSayItSlotCSS();
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
  _level: function () { return SayItSlotCore.levelOf(this._setting('level')); },
  _mode: function () { return SayItSlotCore.modeOf(this._setting('coins')); },
  _loc: function () { return SayItSlotCore.locOf(this.api && this.api.lang); },
  _fam: function () { return SayItSlotCore.famOf(this._loc()); },
  _key: function () { return this._fam() + '.' + this._level() + '.' + this._mode(); },

  /* ---------------- money words ---------------- */
  /* the amount as the counter says it: cents / centavos below and above one unit (no decimals at this grade) */
  _money: function (v) {
    var l = this._loc(), nb = ' ';
    if (l === 'en') return v + '¢';
    if (l === 'es') return '$' + v;
    if (l === 'sv' || l === 'no') return v + nb + 'kr';
    if (l === 'da') return v + nb + 'kr.';
    return v + nb + { de: 'ct', fr: 'c', fi: 'snt', it: 'cent', nl: 'cent', pt: 'centavos' }[l];
  },
  /* the grade-2 split form of an amount of 100 or more cents: «1 € 50 ct», «1 euro e 50 cent», «1 real» */
  _split: function (v) {
    var l = this._loc(), nb = ' ', e = Math.floor(v / 100), c = v % 100;
    var U = { de: ['ct', '€'], fr: ['c', '€'], fi: ['snt', '€'], it: ['cent', 'euro'], nl: ['cent', 'euro'], pt: ['centavos', e > 1 ? 'reais' : 'real'] }[l];
    if (!U) return this._money(v);
    return e + nb + U[1] + (c ? (l === 'it' ? ' e ' : nb) + c + nb + U[0] : '');
  },
  /* the unit beside the wheels */
  _unit: function () { var l = this._loc(); return { en: '¢', es: '$', sv: 'kr', no: 'kr', da: 'kr.', de: 'ct', fr: 'c', fi: 'snt', it: 'cent', nl: 'cent', pt: 'centavos' }[l]; },
  /* an amount on the apparatus: a long unit («centavos») goes on a second line under the number */
  _amtHtml: function (v) {
    var m = this._money(v), u = this._unit();
    if (u.length <= 4) return this._esc(m);
    return '<span class="si-amt"><b>' + v + '</b><i>' + this._esc(u) + '</i></span>';
  },
  _coinName: function (v) {
    if (this._loc() === 'en') return this._t('name' + v);
    /* de couples the compound: «10-ct-Münze» */
    var amt = this._money(v); if (this._loc() === 'de') amt = amt.replace(/ /g, '-');
    return this._t('aCoin', { amt: amt });
  },

  /* ---------------- tasks ---------------- */
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = SayItSlotCore.rounds(this._fam(), this._level()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; this._prev = null; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = SayItSlotCore, pool = this._ensurePool(), n = C.passSize(), index = (opts && opts.index) || 0, pass = Math.floor(index / n), at = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass !== this._pass) { this._order = C.plan(this._fam(), this._level(), Math.random, fresh ? null : this._prev); this._prev = this._order.slice(); this._orderForPool = pool; this._pass = pass; }
    var k = this._order[at], pa = { msg: '' }; this._pa = pa;
    return {
      id: 'say-it-slot.' + this._key() + '.' + k, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(k); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _taskLine: function () {
    var st = this.st, r = st.round;
    if (r.kind === 'compare') return this._t(st.pick ? 'pCompare2' : 'pCompare');
    if (r.kind === 'top') return this._t('pTop', { 'in': this._money(SayItSlotCore.preTotal(st)), price: this._money(r.price) });
    return this._t(r.kind === 'fewest' ? 'pFewest' : 'pCount', { price: this._money(r.price) });
  },
  _setPrompt: function () { if (!this.st || this.st.done) return; var line = this._taskLine(); if (this._pa) this._pa.msg = line; var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line; },
  _start: function (k) {
    this._clearTimers(); this._endDrag();
    /* the cloth is shuffled per showing, and which tray sits on the left is drawn per showing */
    this.st = SayItSlotCore.newState(this._fam(), this._level(), k, this._mode(), Math.random, Math.random() < 0.5 ? 1 : 0);
    this._view = { note: '', soft: false, sel: null, spit: null, said: null, open: false, shiver: false, show: null, ring: null, glow: false, wiggle: false };
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
    var wrap = api.el('div', 'si-wrap'); this._wrap = wrap; wrap.tabIndex = -1;
    wrap.innerHTML = '<div class="si-stage"><div class="si-boxcol" data-qa="box"></div><div class="si-side"><div class="si-treat" data-qa="treat"></div><div class="si-cloth" data-qa="cloth"></div><div class="si-slips" data-qa="slips"></div></div></div><p class="si-note" data-qa="note" aria-live="polite"></p><div class="si-sr" aria-live="polite"></div>';
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _geometry: function (W) {
    var wide = W >= 560, cramp = W < 330;
    return { W: W, wide: wide, cramp: cramp, k: wide ? 2.6 : cramp ? 1.85 : 2.0, pic: wide ? 112 : cramp ? 64 : 72 };
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
    this._wrap.className = 'si-wrap' + (g.wide ? ' is-wide' : ' is-narrow') + (g.cramp ? ' is-cramp' : '') + (st.done ? ' is-done' : '') + (st.round.kind === 'compare' ? ' is-compare' : '');
    this._paintBox(); this._paintTreat(); this._paintCloth(); this._paintSlips();
    var note = this._qs('.si-note');
    note.textContent = v.note || ''; note.className = 'si-note' + (v.note && !v.soft ? ' is-hint' : '');
    this._setPrompt();
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  _esc: function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); },
  _pic: function (theme, noun, size, cls) {
    var loc = this._loc();
    if (!this._picsReady || typeof LCSPictures === 'undefined' || !this._themes[theme]) { var d = this.api.el('div', cls + ' si-picwait'); d.style.width = size + 'px'; d.style.height = size + 'px'; return d; }
    var im = LCSPictures.img(this._themes[theme], noun, loc, { size: size }); im.className = cls; im.style.width = size + 'px'; im.style.height = size + 'px'; return im;
  },
  /* a coin, true to size: metal, rim, reeded edge, centre hole; the worth numeral on every coin, the US ones too (operator ruling 2026-10-30) */
  _coinSvg: function (v, px, opt) {
    opt = opt || {};
    var c = SayItSlotCore.coin(this._fam(), v), loc = this._loc();
    var M = { copper: ['#C97B43', '#8E5124'], silver: ['#C9CDD2', '#7D838A'], gold: ['#E1BE4E', '#9C7A16'] };
    var o = '<svg class="si-coinsvg" viewBox="0 0 100 100" width="' + px + '" height="' + px + '" aria-hidden="true">';
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
    o += '<text x="50" y="' + (c.hole ? 23 : 50) + '" dy=".35em" text-anchor="middle" class="si-coinnum" font-size="' + (c.hole ? 22 : 38) + '">' + num + '</text>';
    return o + '</svg>';
  },
  _coinPx: function (v) { return Math.round(SayItSlotCore.coin(this._fam(), v).d * this._g.k); },

  /* ---------------- the box ---------------- */
  _paintBox: function () {
    var st = this.st, r = st.round, v = this._view, g = this._g, C = SayItSlotCore, self = this, el = this._qs('.si-boxcol');
    el.innerHTML = '';
    var box = this.api.el('div', 'si-box' + (v.shiver ? ' is-shiver' : '') + (st.done ? ' is-paid' : ''));
    var shown = v.show != null ? v.show : st.counter;
    box.setAttribute('role', 'group'); box.setAttribute('aria-label', this._t('aBox', { n: this._money(st.counter) }));
    box.setAttribute('data-counter', st.counter); box.setAttribute('data-inbox', C.inBox(st));
    /* the lid: a bell, and the slot with its brass flap */
    var lid = this.api.el('div', 'si-lid');
    lid.insertAdjacentHTML('beforeend', '<svg class="si-bell' + (st.done ? ' is-ring' : '') + '" viewBox="0 0 40 30" aria-hidden="true"><path d="M6 26 Q6 6 20 6 Q34 6 34 26 Z" fill="#E1BE4E" stroke="#2B2B2B" stroke-width="2.5"/><rect x="3" y="25" width="34" height="4" rx="2" fill="#9C7A16"/><circle cx="20" cy="4" r="3" fill="#9C7A16"/></svg>');
    var slot = this._btn('si-slot' + (v.open ? ' is-open' : '') + (v.wiggle ? ' is-crack' : '') + (v.sel != null ? ' is-ready' : ''), 'slot', this._t('aSlot'), '<span class="si-slit"></span><span class="si-flap"></span>');
    slot.setAttribute('data-slot', '1'); slot.disabled = st.done;
    slot.addEventListener('click', function () { self._slotTap(); });
    lid.appendChild(slot);
    box.appendChild(lid);
    /* the front: the counter window (wheels), the unit, the price pin */
    var front = this.api.el('div', 'si-front');
    var win = this.api.el('div', 'si-window' + (v.wiggle ? ' is-wiggle' : ''));
    var n = C.digits(st), unit = this._unit();
    if (this._loc() === 'es') win.insertAdjacentHTML('beforeend', '<span class="si-unit">$</span>');
    var PL = [['aOnesUp', 'aOnesDown'], ['aTensUp', 'aTensDown'], ['aHundUp', 'aHundDown']];
    for (var p = n - 1; p >= 0; p--) (function (p) {
      var col = self.api.el('div', 'si-wheel');
      var up = self._btn('si-pad', 'up-' + p, self._t(PL[p][0]), '▲'); up.disabled = st.done;
      up.addEventListener('click', function () { self._roll(p, 1); });
      var dn = self._btn('si-pad', 'down-' + p, self._t(PL[p][1]), '▼'); dn.disabled = st.done;
      dn.addEventListener('click', function () { self._roll(p, -1); });
      col.appendChild(up);
      col.insertAdjacentHTML('beforeend', '<span class="si-digit" data-wheel="' + p + '">' + (Math.floor(shown / Math.pow(10, p)) % 10) + '</span>');
      col.appendChild(dn);
      win.appendChild(col);
    })(p);
    if (this._loc() !== 'es') win.insertAdjacentHTML('beforeend', '<span class="si-unit' + (unit.length > 4 ? ' is-long' : '') + '">' + this._esc(unit) + '</span>');
    front.appendChild(win);
    if (r.kind !== 'compare') {
      /* on a phone the treat stands on the box, above the price pin (the pin's tag is its price) */
      var pc = this.api.el('div', 'si-pincol');
      if (!g.wide) { var tp = this._pic('bakery', r.treat, g.pic, 'si-treatpic' + (st.done ? ' is-paid' : '')); tp.alt = ''; pc.appendChild(tp); }
      pc.insertAdjacentHTML('beforeend', '<div class="si-pin' + (v.shiver ? ' is-flash' : '') + '" data-price="' + r.price + '"><span class="si-peg" aria-hidden="true"></span><span class="si-pintag">' + this._amtHtml(r.price) + '</span></div>');
      front.appendChild(pc);
    }
    /* the wrong number flutters out on a coral slip */
    if (v.said != null) front.insertAdjacentHTML('beforeend', '<span class="si-saidslip" data-said="' + v.said + '" aria-hidden="true">' + this._esc(this._money(v.said)) + '</span>');
    box.appendChild(front);
    /* the glass window: the coins in the box, newest on top; Pip's coins (top-up) marked */
    var glass = this.api.el('div', 'si-glass'); glass.setAttribute('data-qa', 'glass');
    var ids = C.where(st, 'box').filter(function (c) { return c.pre; }).map(function (c) { return c.id; }).concat(st.box);
    glass.setAttribute('data-n', ids.length);
    ids.forEach(function (id, i) {
      var c = C.byId(st, id), px = Math.max(22, Math.round(self._coinPx(c.v) * 0.5));
      glass.insertAdjacentHTML('beforeend', '<span class="si-gcoin' + (c.pre ? ' is-pre' : '') + '" data-v="' + c.v + '" style="z-index:' + (i + 1) + '">' + self._coinSvg(c.v, px) + '</span>');
    });
    /* the lever (give back the last coin) and the ring (tip everything out) */
    var lever = this._btn('si-lever' + (v.glow ? ' is-bob' : ''), 'lever', this._t('aLever'), '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="17" y="4" width="6" height="24" rx="3" fill="#9C7A16"/><circle cx="20" cy="30" r="8" fill="#E1BE4E" stroke="#2B2B2B" stroke-width="2.5"/></svg>');
    lever.disabled = st.done || !st.box.length;
    lever.addEventListener('click', function () { self._giveBack(); });
    var ring = this._btn('si-ring', 'tip', this._t('aRing'), '<svg viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="11" fill="none" stroke="#9C7A16" stroke-width="5"/></svg>');
    ring.disabled = st.done || !st.box.length;
    ring.addEventListener('click', function () { self._tipOut(); });
    var foot = this.api.el('div', 'si-foot'); foot.appendChild(lever); foot.appendChild(glass); foot.appendChild(ring);
    box.appendChild(foot);
    /* the drawer slides open on success */
    box.insertAdjacentHTML('beforeend', '<span class="si-drawer' + (st.done && r.kind !== 'compare' ? ' is-open' : '') + '" aria-hidden="true"></span>');
    el.appendChild(box);
    /* the parade: the child's own count, replayed over the coins (success) */
    if (st.done && st.said.length && r.kind !== 'compare') {
      var par = this.api.el('div', 'si-parade'); par.setAttribute('data-chain', st.said.join(','));
      st.box.forEach(function (id, i) { var c = C.byId(st, id); par.insertAdjacentHTML('beforeend', '<span class="si-pcoin" style="animation-delay:' + (i * 0.25) + 's"><b>' + self._esc(self._money(st.said[i])) + '</b>' + self._coinSvg(c.v, 30) + '</span>'); });
      el.appendChild(par);
    }
  },
  _paintTreat: function () {
    var st = this.st, r = st.round, g = this._g, el = this._qs('.si-treat');
    el.innerHTML = '';
    if (r.kind === 'compare' || !g.wide) { el.style.display = 'none'; return; }
    el.style.display = '';
    var pic = this._pic('bakery', r.treat, g.pic, 'si-treatpic' + (st.done ? ' is-paid' : '')); el.appendChild(pic);
    var tag = this.api.el('div', 'si-tag'); tag.setAttribute('data-price', r.price); tag.innerHTML = this._amtHtml(r.price); el.appendChild(tag);
  },
  _coinBtn: function (c, into) {
    var self = this, v = this._view, st = this.st, px = this._coinPx(c.v), C = SayItSlotCore;
    var ghost = (st.misses[c.id] || 0) >= 2;
    var b = this._btn('si-coin' + (v.sel === c.id ? ' is-sel' : '') + (v.spit === c.id ? ' is-spit' : '') + (v.ring === c.v && c.at === 'cloth' ? ' is-ring' : '') + (c.at === 'supply' ? ' is-supply' : ''), 'coin-' + c.id, this._coinName(c.v), this._coinSvg(c.v, px, { ghost: ghost }));
    b.setAttribute('data-coin', c.v); b.setAttribute('data-id', c.id);
    var can = C.droppable(st, c) || (st.round.kind === 'compare' && !st.pick && !st.done);
    b.disabled = st.done || !can;
    b.style.width = Math.max(44, px) + 'px'; b.style.height = Math.max(44, px) + 'px';
    b.addEventListener('pointerdown', function (e) { if (e.button || self.st.done) return; self._press(e, c.id); });
    b.addEventListener('click', function (e) { if (e.detail === 0) self._select(c.id); });
    into.appendChild(b);
  },
  _paintCloth: function () {
    var st = this.st, r = st.round, C = SayItSlotCore, self = this, el = this._qs('.si-cloth');
    el.innerHTML = ''; el.className = 'si-cloth' + (r.kind === 'compare' ? ' is-trays' : '') + (st.sorted ? ' is-sorted' : '');
    /* solved on a phone: nothing is left to pay with, the cloth steps aside for the parade */
    el.style.display = st.done && !this._g.wide && r.kind !== 'compare' ? 'none' : '';
    if (r.kind === 'compare') {
      var order = st.side ? ['b', 'a'] : ['a', 'b'];
      order.forEach(function (t, i) {
        var col = i ? 'teal' : 'coral', tray = self.api.el('div', 'si-tray is-' + col + (st.pick === t ? ' is-picked' : '') + (st.compareMiss && C.answer(r) === t ? ' is-glow' : ''));
        tray.setAttribute('data-tray', t);
        var pick = self._btn('si-traypick', 'tray-' + t, self._t(i ? 'aTrayTeal' : 'aTrayCoral'), '<span class="si-pickring" aria-hidden="true"></span>');
        pick.setAttribute('aria-pressed', st.pick === t ? 'true' : 'false');
        var slipsDone = st.slips.a != null && st.slips.b != null;
        pick.disabled = st.done || (!!st.box.length && !slipsDone);
        pick.addEventListener('click', function () { self._pickTray(t); });
        tray.appendChild(pick);
        var inner = self.api.el('div', 'si-traycoins');
        C.where(st, 'tray-' + t).forEach(function (c) { self._coinBtn(c, inner); });
        if (!inner.children.length) inner.insertAdjacentHTML('beforeend', '<span class="si-empty" aria-hidden="true"></span>');
        tray.appendChild(inner);
        el.appendChild(tray);
      });
      return;
    }
    var free = st.coins.filter(function (c) { return c.at === 'cloth' || c.at === 'supply'; });
    free.forEach(function (c) { self._coinBtn(c, el); });
    if (!free.length) el.insertAdjacentHTML('beforeend', '<span class="si-empty" aria-hidden="true"></span>');
  },
  _paintSlips: function () {
    var st = this.st, r = st.round, C = SayItSlotCore, self = this, el = this._qs('.si-slips');
    el.innerHTML = '';
    if (r.kind !== 'compare' || (st.slips.a == null && st.slips.b == null)) { el.style.display = 'none'; return; }
    el.style.display = '';
    (st.side ? ['b', 'a'] : ['a', 'b']).forEach(function (t, i) {
      if (st.slips[t] == null) return;
      var col = i ? 'teal' : 'coral', s = self.api.el('div', 'si-slip is-' + col);
      s.setAttribute('data-slip', t); s.setAttribute('data-amount', st.slips[t]);
      s.setAttribute('aria-label', self._t(i ? 'aSlipTeal' : 'aSlipCoral', { amt: self._money(st.slips[t]) }));
      s.innerHTML = '<b>' + self._amtHtml(st.slips[t]) + '</b><span class="si-slippile" aria-hidden="true"></span>';
      var pile = s.querySelector('.si-slippile');
      C.where(st, 'slip-' + t).forEach(function (c) { pile.insertAdjacentHTML('beforeend', self._coinSvg(c.v, 22)); });
      el.appendChild(s);
    });
  },

  /* ---------------- the hand ---------------- */
  _say: function (key, a, soft) { var v = this._view; v.note = this._t(key, a || {}); v.soft = !!soft; },
  _roll: function (p, d) {
    var st = this.st, v = this._view, self = this, res = SayItSlotCore.roll(st, p, d);
    v.said = null; v.wiggle = false; v.show = null;
    if (res === 'ok') { this.api.sound(d > 0 ? 620 : 560); v.note = ''; v.glow = false; this._paint(); return; }
    if (res === 'pin') {
      var held = v.sel != null ? SayItSlotCore.byId(st, v.sel) : null, tooBig = held && SayItSlotCore.inBox(st) + held.v > st.round.price;
      if (st.round.kind === 'compare') return;
      this._say(tooBig ? 'hintPin' : 'hintPinStop', { price: this._money(st.round.price) }, true);
      v.shiver = true; this.api.sound(180); this._paint(); this.api.announce(v.note);
      this._later(function () { v.shiver = false; if (self._wrap) self._paint(); }, this.FAST ? 30 : 300);
      return;
    }
    if (res === 'floor') { this._say('hintFloor', { 'in': this._money(SayItSlotCore.inBox(st)) }, true); this.api.sound(220); this._paint(); }
  },
  _select: function (id) {
    var st = this.st, v = this._view, c = SayItSlotCore.byId(st, id);
    if (st.round.kind === 'compare' && !st.pick) { this._say('hintPickFirst', {}, true); this._paint(); return; }
    if (!SayItSlotCore.droppable(st, c)) { if (st.round.kind === 'compare' && st.active) { this._say('hintOtherTray', {}, true); this._paint(); } return; }
    v.sel = v.sel === id ? null : id; v.said = null; this.api.sound(560); this._paint();
  },
  _slotTap: function () {
    var v = this._view;
    if (v.sel == null) { this._say('hintPick', {}, true); this._paint(); this.api.announce(v.note); return; }
    var id = v.sel; v.sel = null; this._drop(id);
  },
  _drop: function (id) {
    var st = this.st, v = this._view, C = SayItSlotCore, self = this, c = C.byId(st, id), cv = c ? c.v : 0;
    var has = C.inBox(st), res = C.drop(st, id);
    v.said = null; v.show = null; v.spit = null; v.wiggle = false;
    if (res.result === 'no') return;
    if (res.result === 'pickFirst') { this._say('hintPickFirst', {}, true); this._paint(); return; }
    if (res.result === 'otherTray') { this._say('hintOtherTray', {}, true); this._paint(); return; }
    if (res.result === 'tooBig') { v.sel = id; this._say('hintPin', { price: this._money(st.round.price) }, true); v.shiver = true; this.api.sound(180); this._paint(); this.api.announce(v.note); this._later(function () { v.shiver = false; if (self._wrap) self._paint(); }, this.FAST ? 30 : 300); return; }
    if (res.result === 'idle') { v.sel = id; v.wiggle = true; this._say('hintIdle', {}, true); this.api.sound(300); this._paint(); this.api.announce(v.note); this._later(function () { v.wiggle = false; if (self._wrap) self._paint(); }, this.FAST ? 40 : 400); return; }
    if (res.result === 'spit') {
      v.spit = id; v.said = res.said; v.sel = id; this.api.sound(240);
      if (res.miss >= 2) {
        var steps = C.steps(has, cv);
        this._say('hintMiss2', { 'in': this._money(has), steps: steps.map(function (x) { return self._money(x); }).join(', ') });
        /* the box counts on by itself, in the coin's natural steps, then rolls back for the child to do it */
        if (!this.FAST) steps.forEach(function (n, i) { self._later(function () { v.show = n; if (self._wrap) self._paint(); }, 350 * (i + 1)); });
        this._later(function () { v.show = null; if (self._wrap) self._paint(); }, this.FAST ? 10 : 350 * (steps.length + 2));
      } else this._say('hintMiss1', { 'in': this._money(has) });
      this._paint(); this.api.announce(v.note);
      this._later(function () { v.spit = null; v.said = null; if (self._wrap) self._paint(); }, this.FAST ? 300 : 900);
      return;
    }
    /* swallowed */
    v.sel = null; v.open = true; v.note = ''; v.glow = false; v.ring = null; this.api.sound(700);
    this.api.announce(this._t('aIn', { coin: this._coinName(cv) }));
    this._later(function () { v.open = false; if (self._wrap) self._paint(); }, this.FAST ? 30 : 300);
    if (res.slip && !st.done) { this.api.sound(820); if (st.compareMiss) this._say(this._compareKey(), this._compareArgs()); else this._say('hintSlip', {}, true); }
    if (res.fewer) { var fc = C.fewestCoin(st); if (res.fewer >= 2) { v.ring = fc; this._say('hintFewer2', {}); } else this._say('hintFewer1', { price: this._money(st.round.price) }); }
    if (res.stranded) {
      if (res.stranded >= 2) { C.sortCloth(st); this._say('hintStranded2', {}); }
      else { v.glow = true; this._say('hintStranded', { gap: this._money(st.round.price - C.inBox(st)) }); }
    }
    if (st.done) { this._success(); return; }
    this._paint(); if (v.note) this.api.announce(v.note);
  },
  _giveBack: function () {
    var st = this.st, v = this._view, c = SayItSlotCore.giveBack(st);
    if (!c) return;
    v.note = ''; v.said = null; v.show = null; v.glow = false; this.api.sound(420); this._paint();
    this.api.announce(this._t('aOut', { coin: this._coinName(c.v) }));
  },
  _tipOut: function () {
    var st = this.st, v = this._view;
    if (!SayItSlotCore.tipOut(st)) return;
    v.note = ''; v.said = null; v.show = null; v.glow = false; v.sel = null; this.api.sound(380); this._paint();
  },
  _pickTray: function (t) {
    var st = this.st, v = this._view;
    if (!SayItSlotCore.pickTray(st, t)) return;
    this.api.sound(560); v.note = '';
    if (st.done) { this._success(); return; }
    if (st.compareMiss) this._say(this._compareKey(), this._compareArgs());
    this._paint();
  },
  /* «more coins is not always more money» only when the tray picked holds MORE coins (R7); in R8 the tray with more coins really holds more */
  _compareKey: function () { var r = this.st.round, mine = this.st.pick === 'a' ? r.a : r.b, other = this.st.pick === 'a' ? r.b : r.a; return mine.length > other.length ? 'hintCompare' : 'hintCompareMoney'; },
  _compareArgs: function () {
    var st = this.st, r = st.round, C = SayItSlotCore, sa = C.sum(r.a), sb = C.sum(r.b);
    return { big: this._money(Math.max(sa, sb)), small: this._money(Math.min(sa, sb)) };
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
      var hit = document.elementFromPoint(ev.clientX, ev.clientY), slot = hit && hit.closest ? hit.closest('[data-slot]') : null;
      if (!slot) return;
      var st = self.st;
      if (st.round.kind === 'compare' && !st.pick) { self._say('hintPickFirst', {}, true); self._paint(); return; }
      self._view.sel = null; self._drop(id);
    };
    this._drag = { mv: mv, up: up };
    document.addEventListener('pointermove', mv, { passive: false }); document.addEventListener('pointerup', up); document.addEventListener('pointercancel', up);
  },
  _endDrag: function () {
    var d = this._drag; if (!d || typeof document === 'undefined') return;
    document.removeEventListener('pointermove', d.mv); document.removeEventListener('pointerup', d.up); document.removeEventListener('pointercancel', d.up);
    this._drag = null;
  },
  /* the numbers the success line names */
  _args: function () {
    var st = this.st, r = st.round, C = SayItSlotCore, self = this, pre = C.preTotal(st);
    var a = { price: this._money(r.price || 0), chain: st.said.map(function (x) { return self._money(x); }).join(', '), n: st.box.length, 'in': this._money(pre), added: this._money((r.price || 0) - pre) };
    if (r.kind === 'compare') { var ca = this._compareArgs(); a.big = ca.big; a.small = ca.small; }
    return a;
  },
  _okKey: function () { var k = this.st.round.kind; return k === 'count' ? 'okCount' : k === 'fewest' ? 'okFewest' : k === 'top' ? 'okTop' : 'okCompare'; },
  _success: function () {
    var st = this.st, v = this._view, r = st.round;
    var msg = this._t(this._okKey(), this._args());
    /* 100 or more cents: the grade-2 split form follows («150 ct = 1 € 50 ct») */
    if (r.price >= 100 && this._split(r.price) !== this._money(r.price)) msg += ' ' + this._t('okSplit', { cents: this._money(r.price), split: this._split(r.price) });
    v.note = ''; v.sel = null; v.glow = false; v.ring = null; v.said = null;
    if (this._pa) this._pa.msg = msg;
    this._paint(); this.api.announce(msg); this.api.sound(988);
    this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, this.OK_MS);
  }
};

function injectSayItSlotCSS() {
  if (typeof document === 'undefined' || document.getElementById('si-css')) return;
  var H = "'Baloo 2', 'Nunito', sans-serif", B = "'Nunito', sans-serif", INK = '#2B2B2B';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.si-wrap{position:relative;width:100%;max-width:680px;margin:0 auto;display:flex;flex-direction:column;align-items:center;gap:8px;user-select:none;-webkit-user-select:none;touch-action:manipulation;} .si-wrap:focus{outline:none;}'
  + '.si-stage{display:flex;gap:16px;width:100%;align-items:flex-start;justify-content:center;} .si-wrap.is-narrow .si-stage{flex-direction:column;align-items:center;gap:8px;}'
  + '.si-boxcol{flex:0 0 auto;display:flex;flex-direction:column;align-items:center;gap:6px;} .si-wrap.is-narrow .si-boxcol{width:100%;}'
  + '.si-side{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:8px;} .si-wrap.is-narrow .si-side{width:100%;}'
  /* the tin box */
  + '.si-box{position:relative;width:290px;padding:0 0 8px;border-radius:14px;background:#FBF3E4;box-shadow:inset 0 0 0 3px ' + INK + ',0 5px 0 #CFC4AE;display:flex;flex-direction:column;align-items:stretch;} .si-wrap.is-narrow .si-box{width:min(100%,320px);}'
  + '.si-box.is-shiver{animation:siShiver .15s linear 2;} @keyframes siShiver{25%{transform:translateX(-3px);}75%{transform:translateX(3px);}}'
  + '.si-lid{position:relative;display:flex;align-items:center;justify-content:center;height:56px;border-radius:14px 14px 0 0;background:#146B5E;box-shadow:inset 0 0 0 3px ' + INK + ';} .si-wrap.is-narrow .si-lid{height:50px;} .si-wrap.is-narrow .si-front{padding-top:6px;} .si-wrap.is-cramp .si-pad{width:48px;}'
  + '.si-bell{position:absolute;left:12px;top:-14px;width:40px;height:30px;} .si-bell.is-ring{animation:siRing .3s ease 3;transform-origin:50% 0;} @keyframes siRing{25%{transform:rotate(-14deg);}75%{transform:rotate(14deg);}}'
  + '.si-slot{position:relative;width:120px;height:46px;border:0;border-radius:12px;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;} .si-slot:focus-visible{outline:3px solid #FFF8E7;outline-offset:2px;}'
  + '.si-slit{display:block;width:96px;height:14px;border-radius:7px;background:#1E1E1E;box-shadow:inset 0 2px 0 #000;} .si-slot.is-ready .si-slit{box-shadow:0 0 0 4px #F2C94C;}'
  + '.si-flap{position:absolute;left:50%;top:50%;width:96px;height:10px;margin:-12px 0 0 -48px;border-radius:5px;background:#C9A227;box-shadow:inset 0 0 0 2px #7A5E14;transform-origin:50% 0;transition:transform .12s;} .si-slot.is-crack .si-flap{transform:rotateX(35deg) translateY(-3px);} .si-slot.is-open .si-flap{transform:translateY(-14px) scaleY(.4);}'
  + '.si-front{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;padding:10px 8px 4px;}'
  + '.si-window{display:flex;align-items:center;gap:4px;padding:4px 6px;border-radius:12px;background:#FFF8E7;box-shadow:inset 0 0 0 3px ' + INK + ';} .si-window.is-wiggle{animation:siShiver .12s linear 3;}'
  + '.si-wheel{display:flex;flex-direction:column;align-items:center;gap:2px;}'
  + '.si-pad{width:52px;height:44px;border:0;border-radius:10px;background:#DDF1EC;color:#146B5E;font-size:20px;cursor:pointer;} .si-pad:disabled{opacity:.5;cursor:default;} .si-pad:focus-visible{outline:3px solid #146B5E;outline-offset:1px;}'
  + '.si-digit{display:block;min-width:46px;padding:2px 0;font-family:' + H + ';font-weight:800;font-size:44px;line-height:1.05;text-align:center;color:' + INK + ';background:#FFFDF6;border-radius:8px;box-shadow:inset 0 2px 0 rgba(0,0,0,.08),inset 0 -2px 0 rgba(0,0,0,.08);} .si-wrap.is-cramp .si-digit{font-size:36px;min-width:38px;}'
  + '.si-unit{font-family:' + H + ';font-weight:800;font-size:22px;color:' + INK + ';padding:0 2px;} .si-unit.is-long{font-size:13px;writing-mode:vertical-rl;transform:rotate(180deg);}'
  + '.si-pin{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;} .si-peg{display:block;width:16px;height:30px;border-radius:8px 8px 3px 3px;background:#F2784B;box-shadow:inset 0 0 0 2px ' + INK + ';} .si-pin.is-flash .si-peg{background:#FF4F1F;box-shadow:0 0 0 4px rgba(242,120,75,.45),inset 0 0 0 2px ' + INK + ';}'
  + '.si-pintag{font-family:' + H + ';font-weight:800;font-size:20px;line-height:1.1;padding:0 6px;border-radius:6px;background:#FFF8E7;border:2px solid ' + INK + ';white-space:nowrap;}'
  + '.si-saidslip{position:absolute;left:50%;top:6px;padding:2px 8px;border-radius:6px;background:#F2784B;color:#fff;font-family:' + H + ';font-weight:800;font-size:18px;white-space:nowrap;animation:siFlutter .9s ease forwards;pointer-events:none;} @keyframes siFlutter{from{transform:translate(-50%,0) rotate(-4deg);opacity:1;}to{transform:translate(-50%,-26px) rotate(8deg);opacity:0;}}'
  + '.si-glass{position:relative;flex:1 1 auto;min-width:0;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:2px;min-height:52px;padding:4px 6px;border-radius:10px;background:#EAF6F3;box-shadow:inset 0 0 0 2px #9CC9BF;line-height:0;} .si-gcoin{display:block;} .si-gcoin.is-pre{opacity:.75;}'
  + '.si-foot{display:flex;align-items:center;gap:8px;padding:6px 8px 0;} .si-pincol{display:flex;flex-direction:column;align-items:center;gap:4px;}'
  + '.si-lever,.si-ring{width:48px;height:48px;border:0;border-radius:12px;background:#FFF1D6;box-shadow:inset 0 0 0 2px #C9A227;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:4px;} .si-lever svg,.si-ring svg{width:34px;height:34px;} .si-lever:disabled,.si-ring:disabled{opacity:.4;cursor:default;} .si-lever:focus-visible,.si-ring:focus-visible{outline:3px solid #146B5E;}'
  + '.si-lever.is-bob{animation:siBob .5s ease 4;} @keyframes siBob{50%{transform:translateY(5px);}}'
  + '.si-drawer{display:block;align-self:center;width:150px;height:14px;margin-top:8px;border-radius:4px;background:#E9DCC4;box-shadow:inset 0 0 0 3px ' + INK + ';transition:transform .3s;} .si-drawer.is-open{transform:translateY(6px);background:#FFF8E7;}'
  + '.si-parade{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;} .si-pcoin{display:flex;flex-direction:column;align-items:center;line-height:1;animation:siHop .5s ease both;} .si-pcoin b{font-family:' + H + ';font-weight:800;font-size:17px;color:#146B5E;white-space:nowrap;} @keyframes siHop{0%{transform:translateY(0);opacity:0;}50%{transform:translateY(-10px);opacity:1;}100%{transform:translateY(0);opacity:1;}}'
  /* the treat and the cloth */
  + '.si-treat{display:flex;align-items:center;justify-content:center;gap:10px;} .si-treatpic{display:block;} .si-treatpic.is-paid{animation:siHop .6s ease;} .si-picwait{display:block;}'
  + '.si-tag{font-family:' + H + ';font-weight:800;font-size:28px;line-height:1.1;color:' + INK + ';background:#FFF8E7;border:3px solid ' + INK + ';border-radius:8px;padding:2px 12px;white-space:nowrap;} .si-wrap.is-narrow .si-tag{font-size:22px;}'
  + '.si-cloth{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;width:100%;min-height:96px;padding:14px 10px;border-radius:16px;background:#E9DCC4;box-shadow:inset 0 0 0 3px #CDB991,inset 0 0 0 7px #E9DCC4,inset 0 0 0 9px rgba(122,94,20,.25);} .si-wrap.is-wide .si-cloth{max-width:360px;} .si-wrap.is-cramp .si-cloth{gap:6px;padding:10px 6px;min-height:80px;}'
  + '.si-cloth.is-trays{background:none;box-shadow:none;padding:0;flex-wrap:nowrap;gap:10px;align-items:stretch;}'
  + '.si-coin{position:relative;display:flex;align-items:center;justify-content:center;padding:0;border:0;background:none;border-radius:50%;cursor:grab;touch-action:none;line-height:0;} .si-coin:focus-visible{outline:3px solid #146B5E;outline-offset:2px;} .si-coin:disabled{cursor:default;}'
  + '.si-coin.is-sel{transform:translateY(-6px) scale(1.1);filter:drop-shadow(0 4px 0 rgba(20,107,94,.6));} .si-coin.is-spit{animation:siSpit .4s ease;} @keyframes siSpit{30%{transform:translateY(-22px) rotate(-14deg);}60%{transform:translateY(0) rotate(8deg);}}'
  + '.si-coin.is-ring{box-shadow:0 0 0 4px #F2784B;} .si-coin.is-supply::after{content:"";position:absolute;left:10%;right:10%;bottom:-6px;height:6px;border-radius:50%;background:rgba(122,94,20,.35);}'
  + '.si-coin.is-ghostdrag{position:fixed;z-index:50;pointer-events:none;transform:scale(1.1);}'
  + '.si-cloth.is-sorted{flex-wrap:wrap;}'
  + '.si-coinnum{font-family:' + H + ';font-weight:800;fill:#2B2B2B;fill-opacity:.7;} .si-coinnum.is-ghost{fill-opacity:.3;}'
  + '.si-empty{display:block;width:44px;height:44px;}'
  /* compare: two trays and their slips */
  + '.si-tray{flex:1 1 0;min-width:0;max-width:220px;display:flex;flex-direction:column;align-items:stretch;border-radius:18px;padding:6px 6px 10px;} .si-tray.is-coral{background:#F7C1AA;box-shadow:inset 0 0 0 3px #C4522F;} .si-tray.is-teal{background:#A9D8CE;box-shadow:inset 0 0 0 3px #146B5E;}'
  + '.si-tray.is-picked{transform:translateY(-4px);box-shadow:inset 0 0 0 3px ' + INK + ',0 0 0 4px ' + INK + ';} .si-tray.is-glow{animation:siGlow 1s ease 3;} @keyframes siGlow{50%{filter:brightness(1.12) drop-shadow(0 0 8px #F2C94C);}}'
  + '.si-traypick{height:44px;border:0;border-radius:12px;background:rgba(255,255,255,.55);cursor:pointer;display:flex;align-items:center;justify-content:center;} .si-traypick:focus-visible{outline:3px solid ' + INK + ';} .si-traypick:disabled{cursor:default;opacity:.6;}'
  + '.si-pickring{display:block;width:26px;height:26px;border-radius:50%;border:4px solid ' + INK + ';} .si-tray.is-picked .si-pickring{background:' + INK + ';box-shadow:inset 0 0 0 4px #fff;}'
  + '.si-traycoins{display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:4px;padding-top:6px;}'
  + '.si-slips{display:flex;gap:10px;justify-content:center;} .si-slip{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:90px;padding:4px 10px 6px;border-radius:6px;background:#FFF8E7;animation:siPop .4s ease both;} .si-slip.is-coral{border:4px solid #F2784B;} .si-slip.is-teal{border:4px solid #146B5E;}'
  + '.si-slip b{font-family:' + H + ';font-weight:800;font-size:26px;line-height:1.1;color:' + INK + ';white-space:nowrap;} .si-slippile{display:flex;flex-wrap:wrap;justify-content:center;gap:1px;max-width:130px;line-height:0;} @keyframes siPop{from{transform:translateY(-14px);opacity:0;}}'
  + '.si-wrap.is-done.is-narrow .si-pad,.si-wrap.is-done.is-narrow .si-foot{display:none;} .si-wrap.is-done.is-narrow:not(.is-compare) .si-side{display:none;} .si-wrap.is-done .si-note:empty{display:none;}'
  + '.si-amt{display:inline-flex;flex-direction:column;align-items:center;line-height:1;vertical-align:middle;} .si-amt i{font-style:normal;font-size:.5em;font-weight:800;margin-top:1px;}'
  + '.si-wrap.is-narrow .si-slip b{font-size:22px;} .si-wrap.is-narrow .si-slip{min-width:0;flex:1 1 0;max-width:150px;padding:4px 6px 6px;} .si-wrap.is-narrow .si-slips{width:100%;}'
  + '.si-note{margin:0;min-height:1.3em;font-family:' + B + ';font-weight:700;font-size:18px;color:#146B5E;text-align:center;} .si-note.is-hint{color:#A3401F;} .si-wrap.is-narrow .si-note{font-size:16px;}'
  + '.si-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);}'
  + '@media (prefers-reduced-motion:reduce){.si-wrap *{animation:none !important;transition:none !important;}}';
  var s = document.createElement('style'); s.id = 'si-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.SayItSlotActivity = SayItSlotActivity;
