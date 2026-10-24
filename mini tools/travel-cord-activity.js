/* =====================================================================
   travel-cord-activity.js — ACTIVITY #99 of the one-by-one rebuild: "The
   Faraway Shelf" → THE TRAVELLING CORD (1.MD.A.1, 11 locales).
   Design: docs/activities-rebuild/designs/099-seriation.md
   ---------------------------------------------------------------------
   THE INVENTION: Tilly's ribbons hang from a hook, lie on a high shelf
   and lie on the counter — they can never be brought together, so the
   eye cannot line them up. The SAME cord (6 units, every round) is carried
   to each one: its clip at the ribbon's start pin, it lays itself along
   the ribbon and leaves a TAG — shorter than me, just as long, longer.
   The three tags decide the question; on success Tilly's reveal lays the
   ribbons side by side from one pin, exactly as the tags said. Tall
   things: three copies of one picture on a stool, a box and a high
   shelf; the cord is held up from each object's own foot.
   ACTIVITY LAYER ONLY: the model is travel-cord-core.js; the wall, hook,
   shelf, counter, stands, ribbons, cord and tags are drawn apparatus;
   Tilly (pets/cat), the candle (christmas/candle) and the bottle
   (kitchen tools/bottle) are library pictures via lcs-pictures.js;
   lcs-shell.js untouched (the shell's Check is hidden and pressed by this
   activity when the round is right).
   Test seams: window.TravelCordActivity.st / ._pool / ._order /
   ._ensurePool / ._start / .FAST / .OK_MS.
   ===================================================================== */
'use strict';

var TravelCordActivity = {
  id: 'travel-cord',
  apparatusClasses: ['tc-'],

  /*STRINGS-BEGIN*/strings: {
    instrBubble:   {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    okBubble:      {en:'{msg}',de:'{msg}',nl:'{msg}',da:'{msg}',sv:'{msg}',no:'{msg}',es:'{msg}',it:'{msg}',pt:'{msg}',fr:'{msg}',fi:'{msg}'},
    title:         {en:'The Faraway Shelf',de:'Tillys fernes Regal',nl:'Tilly\'s verre plank',da:'Tillys fjerne hylde',sv:'Tillys hyllor',no:'Tillys fjerne hylle',es:'El estante lejano',it:'Lo scaffale lontano di Tilly',pt:'A estante distante da Tilly',fr:'Les étagères lointaines de Tilly',fi:'Tillyn kaukainen hylly'},
    tLong:         {en:'Carry the cord to each ribbon. Then tap the longest ribbon.',de:'Bring die Schnur zu jedem Band. Tippe dann auf das längste Band.',nl:'Breng het touwtje naar elk lint. Tik dan op het langste lint.',da:'Bær snoren hen til hvert bånd. Tryk så på det længste bånd.',sv:'Bär repet till varje band. Tryck sedan på det längsta bandet.',no:'Bær snoren bort til hvert bånd. Trykk så på det lengste båndet.',es:'Lleva el cordón a cada listón. Luego toca el listón más largo.',it:'Porta lo spago a ogni nastro. Poi tocca il nastro più lungo.',pt:'Leve o barbante até cada fita. Depois toque na fita mais comprida.',fr:'Porte la ficelle jusqu’à chaque ruban. Puis touche le ruban le plus long.',fi:'Vie naru jokaisen nauhan luo. Napauta sitten pisintä nauhaa.'},
    tShort:        {en:'Carry the cord to each ribbon. Then tap the shortest ribbon.',de:'Bring die Schnur zu jedem Band. Tippe dann auf das kürzeste Band.',nl:'Breng het touwtje naar elk lint. Tik dan op het kortste lint.',da:'Bær snoren hen til hvert bånd. Tryk så på det korteste bånd.',sv:'Bär repet till varje band. Tryck sedan på det kortaste bandet.',no:'Bær snoren bort til hvert bånd. Trykk så på det korteste båndet.',es:'Lleva el cordón a cada listón. Luego toca el listón más corto.',it:'Porta lo spago a ogni nastro. Poi tocca il nastro più corto.',pt:'Leve o barbante até cada fita. Depois toque na fita mais curta.',fr:'Porte la ficelle jusqu’à chaque ruban. Puis touche le ruban le plus court.',fi:'Vie naru jokaisen nauhan luo. Napauta sitten lyhintä nauhaa.'},
    tSame:         {en:'Carry the cord to each ribbon. Then tap the ribbon just as long as the cord.',de:'Bring die Schnur zu jedem Band. Tippe dann auf das Band, das genauso lang ist wie die Schnur.',nl:'Breng het touwtje naar elk lint. Tik dan op het lint dat even lang is als het touwtje.',da:'Bær snoren hen til hvert bånd. Tryk så på det bånd, der er lige så langt som snoren.',sv:'Bär repet till varje band. Tryck sedan på bandet som är lika långt som repet.',no:'Bær snoren bort til hvert bånd. Trykk så på båndet som er like langt som snoren.',es:'Lleva el cordón a cada listón. Luego toca el listón que es igual de largo que el cordón.',it:'Porta lo spago a ogni nastro. Poi tocca il nastro lungo come lo spago.',pt:'Leve o barbante até cada fita. Depois toque na fita do mesmo comprimento do barbante.',fr:'Porte la ficelle jusqu’à chaque ruban. Puis touche le ruban aussi long que la ficelle.',fi:'Vie naru jokaisen nauhan luo. Napauta sitten nauhaa, joka on yhtä pitkä kuin naru.'},
    tOrder:        {en:'Carry the cord to each ribbon. Then put them in order, shortest first.',de:'Bring die Schnur zu jedem Band. Ordne sie dann, das kürzeste zuerst.',nl:'Breng het touwtje naar elk lint. Zet ze dan op volgorde, het kortste eerst.',da:'Bær snoren hen til hvert bånd. Sæt dem så i rækkefølge, det korteste først.',sv:'Bär repet till varje band. Sätt dem sedan i ordning, det kortaste först.',no:'Bær snoren bort til hvert bånd. Sett dem så i rekkefølge, det korteste først.',es:'Lleva el cordón a cada listón. Luego ordénalos, primero el más corto.',it:'Porta lo spago a ogni nastro. Poi mettili in ordine, prima il più corto.',pt:'Leve o barbante até cada fita. Depois coloque-as em ordem, a mais curta primeiro.',fr:'Porte la ficelle jusqu’à chaque ruban. Puis range-les, le plus court d’abord.',fi:'Vie naru jokaisen nauhan luo. Laita ne sitten järjestykseen, lyhin ensin.'},
    tLongTall:     {en:'Hold the cord up to each one. Then tap the tallest.',de:'Halte die Schnur an jede. Tippe dann auf die größte.',nl:'Houd het touwtje naast elk ervan. Tik dan op de hoogste.',da:'Hold snoren op ved hver. Tryk så på den højeste.',sv:'Håll repet intill var och en. Tryck sedan på den högsta.',no:'Hold snoren opp ved hver. Trykk så på den høyeste.',es:'Pon el cordón junto a cada una. Luego toca la más alta.',it:'Metti lo spago accanto a ognuna. Poi tocca la più alta.',pt:'Coloque o barbante ao lado de cada uma. Depois toque na mais alta.',fr:'Tiens la ficelle contre chacune. Puis touche la plus grande.',fi:'Pidä narua jokaisen vieressä. Napauta sitten korkeinta.'},
    tShortTall:    {en:'Hold the cord up to each one. Then tap the shortest.',de:'Halte die Schnur an jede. Tippe dann auf die kleinste.',nl:'Houd het touwtje naast elk ervan. Tik dan op de laagste.',da:'Hold snoren op ved hver. Tryk så på den laveste.',sv:'Håll repet intill var och en. Tryck sedan på den lägsta.',no:'Hold snoren opp ved hver. Trykk så på den laveste.',es:'Pon el cordón junto a cada una. Luego toca la más baja.',it:'Metti lo spago accanto a ognuna. Poi tocca la più bassa.',pt:'Coloque o barbante ao lado de cada uma. Depois toque na mais baixa.',fr:'Tiens la ficelle contre chacune. Puis touche la plus petite.',fi:'Pidä narua jokaisen vieressä. Napauta sitten matalinta.'},
    tSameTall:     {en:'Hold the cord up to each one. Then tap the one just as tall as the cord.',de:'Halte die Schnur an jede. Tippe dann auf die, die genauso groß ist wie die Schnur.',nl:'Houd het touwtje naast elk ervan. Tik dan op degene die even hoog is als het touwtje.',da:'Hold snoren op ved hver. Tryk så på den, der er lige så høj som snoren.',sv:'Håll repet intill var och en. Tryck sedan på den som är lika hög som repet.',no:'Hold snoren opp ved hver. Trykk så på den som er like høy som snoren.',es:'Pon el cordón junto a cada una. Luego toca la que es igual de alta que el cordón.',it:'Metti lo spago accanto a ognuna. Poi tocca quella alta come lo spago.',pt:'Coloque o barbante ao lado de cada uma. Depois toque na que tem a mesma altura do barbante.',fr:'Tiens la ficelle contre chacune. Puis touche celle qui est aussi grande que la ficelle.',fi:'Pidä narua jokaisen vieressä. Napauta sitten sitä, joka on yhtä korkea kuin naru.'},
    tOrderTall:    {en:'Hold the cord up to each one. Then put them in order, shortest first.',de:'Halte die Schnur an jede. Ordne sie dann, die kleinste zuerst.',nl:'Houd het touwtje naast elk ervan. Zet ze dan op volgorde, de laagste eerst.',da:'Hold snoren op ved hver. Sæt dem så i rækkefølge, den laveste først.',sv:'Håll repet intill var och en. Sätt dem sedan i ordning, den lägsta först.',no:'Hold snoren opp ved hver. Sett dem så i rekkefølge, den laveste først.',es:'Pon el cordón junto a cada una. Luego ordénalas, primero la más baja.',it:'Metti lo spago accanto a ognuna. Poi mettile in ordine, prima la più bassa.',pt:'Coloque o barbante ao lado de cada uma. Depois coloque-as em ordem, a mais baixa primeiro.',fr:'Tiens la ficelle contre chacune. Puis range-les, la plus petite d’abord.',fi:'Pidä narua jokaisen vieressä. Laita ne sitten järjestykseen, matalin ensin.'},
    hintNone:      {en:'Now tap the ribbon you choose.',de:'Tippe jetzt auf das Band, das du wählst.',nl:'Tik nu op het lint dat je kiest.',da:'Tryk nu på det bånd, du vælger.',sv:'Tryck nu på bandet du väljer.',no:'Trykk nå på båndet du velger.',es:'Ahora toca el listón que eliges.',it:'Ora tocca il nastro che scegli.',pt:'Agora toque na fita que você escolher.',fr:'Touche maintenant le ruban que tu choisis.',fi:'Napauta nyt nauhaa, jonka valitset.'},
    hintNoneTall:  {en:'Now tap the one you choose.',de:'Tippe jetzt auf die, die du wählst.',nl:'Tik nu op degene die je kiest.',da:'Tryk nu på den, du vælger.',sv:'Tryck nu på den du väljer.',no:'Trykk nå på den du velger.',es:'Ahora toca la que eliges.',it:'Ora tocca quella che scegli.',pt:'Agora toque na que você escolher.',fr:'Touche maintenant celle que tu choisis.',fi:'Napauta nyt sitä, jonka valitset.'},
    hintFill:      {en:'Put all three on the rail.',de:'Stell alle drei auf die Leiste.',nl:'Zet alle drie op de rail.',da:'Sæt alle tre på skinnen.',sv:'Sätt alla tre på skenan.',no:'Sett alle tre på skinnen.',es:'Llena los tres escalones del riel.',it:'Riempi tutti e tre i gradini della guida.',pt:'Coloque as três no trilho.',fr:'Mets les trois sur le rail.',fi:'Laita kaikki kolme kiskolle.'},
    hintLong:      {en:'Look at the tags: only one ribbon is longer than the cord.',de:'Schau auf die Schilder: Nur ein Band ist länger als die Schnur.',nl:'Kijk naar de kaartjes: maar één lint is langer dan het touwtje.',da:'Se på mærkerne: Kun ét bånd er længere end snoren.',sv:'Titta på lapparna: bara ett band är längre än repet.',no:'Se på lappene: Bare ett bånd er lengre enn snoren.',es:'Mira las etiquetas: solo un listón es más largo que el cordón.',it:'Guarda le etichette: solo un nastro è più lungo dello spago.',pt:'Olhe as etiquetas: só uma fita é mais comprida que o barbante.',fr:'Regarde les étiquettes : un seul ruban est plus long que la ficelle.',fi:'Katso lappuja: vain yksi nauha on narua pidempi.'},
    hintShort:     {en:'Look at the tags: only one ribbon is shorter than the cord.',de:'Schau auf die Schilder: Nur ein Band ist kürzer als die Schnur.',nl:'Kijk naar de kaartjes: maar één lint is korter dan het touwtje.',da:'Se på mærkerne: Kun ét bånd er kortere end snoren.',sv:'Titta på lapparna: bara ett band är kortare än repet.',no:'Se på lappene: Bare ett bånd er kortere enn snoren.',es:'Mira las etiquetas: solo un listón es más corto que el cordón.',it:'Guarda le etichette: solo un nastro è più corto dello spago.',pt:'Olhe as etiquetas: só uma fita é mais curta que o barbante.',fr:'Regarde les étiquettes : un seul ruban est plus court que la ficelle.',fi:'Katso lappuja: vain yksi nauha on narua lyhyempi.'},
    hintSame:      {en:'Look at the tags: only one ribbon ends exactly where the cord ends.',de:'Schau auf die Schilder: Nur ein Band endet genau da, wo die Schnur endet.',nl:'Kijk naar de kaartjes: maar één lint eindigt precies waar het touwtje eindigt.',da:'Se på mærkerne: Kun ét bånd ender præcis, hvor snoren ender.',sv:'Titta på lapparna: bara ett band slutar precis där repet slutar.',no:'Se på lappene: Bare ett bånd slutter akkurat der snoren slutter.',es:'Mira las etiquetas: solo un listón termina justo donde termina el cordón.',it:'Guarda le etichette: solo un nastro finisce proprio dove finisce lo spago.',pt:'Olhe as etiquetas: só uma fita termina exatamente onde o barbante termina.',fr:'Regarde les étiquettes : un seul ruban s’arrête exactement là où s’arrête la ficelle.',fi:'Katso lappuja: vain yksi nauha loppuu täsmälleen siihen, mihin naru loppuu.'},
    hintOrder:     {en:'Look at the tags: which is shorter than the cord, which is just as long, which is longer?',de:'Schau auf die Schilder: Welches ist kürzer als die Schnur, welches genauso lang, welches länger?',nl:'Kijk naar de kaartjes: welk lint is korter dan het touwtje, welk is even lang en welk is langer?',da:'Se på mærkerne: Hvilket er kortere end snoren, hvilket lige så langt, hvilket længere?',sv:'Titta på lapparna: vilket är kortare än repet, vilket lika långt, vilket längre?',no:'Se på lappene: Hvilket er kortere enn snoren, hvilket like langt, hvilket lengre?',es:'Mira las etiquetas: ¿cuál es más corto que el cordón, cuál igual de largo, cuál más largo?',it:'Guarda le etichette: qual è più corto dello spago, quale è lungo come lo spago, quale è più lungo?',pt:'Olhe as etiquetas: qual é mais curta que o barbante, qual tem o mesmo comprimento, qual é mais comprida?',fr:'Regarde les étiquettes : lequel est plus court que la ficelle, lequel est aussi long, lequel est plus long ?',fi:'Katso lappuja: mikä on narua lyhyempi, mikä yhtä pitkä, mikä pidempi?'},
    hintLongTall:  {en:'Look at the tags: only one is taller than the cord.',de:'Schau auf die Schilder: Nur eine ist größer als die Schnur.',nl:'Kijk naar de kaartjes: maar één is hoger dan het touwtje.',da:'Se på mærkerne: Kun én er højere end snoren.',sv:'Titta på lapparna: bara en är högre än repet.',no:'Se på lappene: Bare én er høyere enn snoren.',es:'Mira las etiquetas: solo una es más alta que el cordón.',it:'Guarda le etichette: solo una è più alta dello spago.',pt:'Olhe as etiquetas: só uma é mais alta que o barbante.',fr:'Regarde les étiquettes : une seule est plus grande que la ficelle.',fi:'Katso lappuja: vain yksi on narua korkeampi.'},
    hintShortTall: {en:'Look at the tags: only one is shorter than the cord.',de:'Schau auf die Schilder: Nur eine ist kleiner als die Schnur.',nl:'Kijk naar de kaartjes: maar één is lager dan het touwtje.',da:'Se på mærkerne: Kun én er lavere end snoren.',sv:'Titta på lapparna: bara en är lägre än repet.',no:'Se på lappene: Bare én er lavere enn snoren.',es:'Mira las etiquetas: solo una es más baja que el cordón.',it:'Guarda le etichette: solo una è più bassa dello spago.',pt:'Olhe as etiquetas: só uma é mais baixa que o barbante.',fr:'Regarde les étiquettes : une seule est plus petite que la ficelle.',fi:'Katso lappuja: vain yksi on narua matalampi.'},
    hintSameTall:  {en:'Look at the tags: only one is just as tall as the cord.',de:'Schau auf die Schilder: Nur eine ist genauso groß wie die Schnur.',nl:'Kijk naar de kaartjes: maar één is even hoog als het touwtje.',da:'Se på mærkerne: Kun én er lige så høj som snoren.',sv:'Titta på lapparna: bara en är lika hög som repet.',no:'Se på lappene: Bare én er like høy som snoren.',es:'Mira las etiquetas: solo una es igual de alta que el cordón.',it:'Guarda le etichette: solo una è alta come lo spago.',pt:'Olhe as etiquetas: só uma tem a mesma altura do barbante.',fr:'Regarde les étiquettes : une seule est aussi grande que la ficelle.',fi:'Katso lappuja: vain yksi on yhtä korkea kuin naru.'},
    hintOrderTall: {en:'Look at the tags: which is shorter than the cord, which is just as tall, which is taller?',de:'Schau auf die Schilder: Welche ist kleiner als die Schnur, welche genauso groß, welche größer?',nl:'Kijk naar de kaartjes: welke is lager dan het touwtje, welke even hoog, welke hoger?',da:'Se på mærkerne: Hvilken er lavere end snoren, hvilken lige så høj, hvilken højere?',sv:'Titta på lapparna: vilken är lägre än repet, vilken lika hög, vilken högre?',no:'Se på lappene: Hvilken er lavere enn snoren, hvilken like høy, hvilken høyere?',es:'Mira las etiquetas: ¿cuál es más baja que el cordón, cuál igual de alta, cuál más alta?',it:'Guarda le etichette: qual è più bassa dello spago, quale è alta come lo spago, quale è più alta?',pt:'Olhe as etiquetas: qual é mais baixa que o barbante, qual tem a mesma altura, qual é mais alta?',fr:'Regarde les étiquettes : laquelle est plus petite que la ficelle, laquelle est aussi grande, laquelle est plus grande ?',fi:'Katso lappuja: mikä on narua matalampi, mikä yhtä korkea, mikä korkeampi?'},
    hintTags2:     {en:'The cord is the same every time — so the tags tell you the order.',de:'Die Schnur ist jedes Mal dieselbe – deshalb verraten dir die Schilder die Reihenfolge.',nl:'Het touwtje is elke keer hetzelfde, dus de kaartjes vertellen je de volgorde.',da:'Snoren er den samme hver gang – så mærkerne fortæller dig rækkefølgen.',sv:'Repet är detsamma varje gång – därför visar lapparna ordningen.',no:'Snoren er den samme hver gang – derfor forteller lappene deg rekkefølgen.',es:'El cordón es siempre el mismo, así que las etiquetas te dicen el orden.',it:'Lo spago è sempre lo stesso, quindi le etichette ti dicono l’ordine.',pt:'O barbante é sempre o mesmo, então as etiquetas mostram a ordem.',fr:'La ficelle est toujours la même : les étiquettes te donnent donc l’ordre.',fi:'Naru on joka kerta sama, joten laput kertovat järjestyksen.'},
    hintCarry:     {en:'Now tap a ribbon to lay the cord along it.',de:'Tippe jetzt auf ein Band, um die Schnur daran entlangzulegen.',nl:'Tik nu op een lint om het touwtje erlangs te leggen.',da:'Tryk nu på et bånd for at lægge snoren langs det.',sv:'Tryck nu på ett band för att lägga repet längs det.',no:'Trykk nå på et bånd for å legge snoren langs det.',es:'Ahora toca un listón para poner el cordón a lo largo.',it:'Ora tocca un nastro per stendere lo spago lungo il nastro.',pt:'Agora toque em uma fita para esticar o barbante ao longo dela.',fr:'Touche maintenant un ruban pour y poser la ficelle.',fi:'Napauta nyt nauhaa, niin naru asettuu sen viereen.'},
    hintCarryTall: {en:'Now tap one to hold the cord up beside it.',de:'Tippe jetzt auf eine, um die Schnur daneben zu halten.',nl:'Tik nu op één om het touwtje ernaast te houden.',da:'Tryk nu på én for at holde snoren op ved siden af den.',sv:'Tryck nu på en för att hålla repet bredvid den.',no:'Trykk nå på én for å holde snoren opp ved siden av den.',es:'Ahora toca una para poner el cordón a su lado.',it:'Ora toccane una per tenerle accanto lo spago.',pt:'Agora toque em uma para colocar o barbante ao lado dela.',fr:'Touche maintenant l’une d’elles pour tenir la ficelle à côté.',fi:'Napauta nyt yhtä, niin naru asettuu sen viereen.'},
    okLong:        {en:'Yes! {Rib} is longer than the cord — and longer than the others.',de:'Ja! {Rib} ist länger als die Schnur – und länger als die anderen.',nl:'Ja! {Rib} is langer dan het touwtje – en langer dan de andere.',da:'Ja! {Rib} er længere end snoren – og længere end de andre.',sv:'Ja! {Rib} är längre än repet – och längre än de andra.',no:'Ja! {Rib} er lengre enn snoren – og lengre enn de andre.',es:'¡Sí! {Rib} es más largo que el cordón, y más largo que los otros.',it:'Sì! {Rib} è più lungo dello spago, e più lungo degli altri.',pt:'Isso! {Rib} é mais comprida que o barbante, e mais comprida que as outras.',fr:'Oui ! {Rib} est plus long que la ficelle, et plus long que les autres.',fi:'Kyllä! {Rib} on narua pidempi – ja pidempi kuin muut.'},
    okShort:       {en:'Yes! {Rib} is shorter than the cord — and shorter than the others.',de:'Ja! {Rib} ist kürzer als die Schnur – und kürzer als die anderen.',nl:'Ja! {Rib} is korter dan het touwtje – en korter dan de andere.',da:'Ja! {Rib} er kortere end snoren – og kortere end de andre.',sv:'Ja! {Rib} är kortare än repet – och kortare än de andra.',no:'Ja! {Rib} er kortere enn snoren – og kortere enn de andre.',es:'¡Sí! {Rib} es más corto que el cordón, y más corto que los otros.',it:'Sì! {Rib} è più corto dello spago, e più corto degli altri.',pt:'Isso! {Rib} é mais curta que o barbante, e mais curta que as outras.',fr:'Oui ! {Rib} est plus court que la ficelle, et plus court que les autres.',fi:'Kyllä! {Rib} on narua lyhyempi – ja lyhyempi kuin muut.'},
    okSame:        {en:'Yes! {Rib} is just as long as the cord.',de:'Ja! {Rib} ist genauso lang wie die Schnur.',nl:'Ja! {Rib} is even lang als het touwtje.',da:'Ja! {Rib} er lige så langt som snoren.',sv:'Ja! {Rib} är lika långt som repet.',no:'Ja! {Rib} er like langt som snoren.',es:'¡Sí! {Rib} es igual de largo que el cordón.',it:'Sì! {Rib} è lungo come lo spago.',pt:'Isso! {Rib} tem o mesmo comprimento do barbante.',fr:'Oui ! {Rib} est aussi long que la ficelle.',fi:'Kyllä! {Rib} on yhtä pitkä kuin naru.'},
    okOrder:       {en:'{rib1}, {rib2}, {rib3} — from shortest to longest!',de:'{rib1}, {rib2}, {rib3} – vom kürzesten zum längsten!',nl:'{rib1}, {rib2}, {rib3}: van kort naar lang!',da:'{rib1}, {rib2}, {rib3} – fra det korteste til det længste!',sv:'{rib1}, {rib2}, {rib3} – från det kortaste till det längsta!',no:'{rib1}, {rib2}, {rib3} – fra det korteste til det lengste!',es:'{rib1}, {rib2}, {rib3}: ¡del más corto al más largo!',it:'{rib1}, {rib2}, {rib3}: dal più corto al più lungo!',pt:'{rib1}, {rib2}, {rib3}: da mais curta à mais comprida!',fr:'{rib1}, {rib2}, {rib3} : du plus court au plus long !',fi:'{rib1}, {rib2}, {rib3} – lyhimmästä pisimpään!'},
    okLongTall:    {en:'Yes! It is taller than the cord — and taller than the others.',de:'Ja! Sie ist größer als die Schnur – und größer als die anderen.',nl:'Ja! Die is hoger dan het touwtje – en hoger dan de andere.',da:'Ja! Højere end snoren – og højere end de andre.',sv:'Ja! Högre än repet – och högre än de andra.',no:'Ja! Høyere enn snoren – og høyere enn de andre.',es:'¡Sí! Es más alta que el cordón, y más alta que las otras.',it:'Sì! È più alta dello spago, e più alta delle altre.',pt:'Isso! É mais alta que o barbante, e mais alta que as outras.',fr:'Oui ! Elle est plus grande que la ficelle, et plus grande que les autres.',fi:'Kyllä! Narua korkeampi – ja korkeampi kuin muut.'},
    okShortTall:   {en:'Yes! It is shorter than the cord — and shorter than the others.',de:'Ja! Sie ist kleiner als die Schnur – und kleiner als die anderen.',nl:'Ja! Die is lager dan het touwtje – en lager dan de andere.',da:'Ja! Lavere end snoren – og lavere end de andre.',sv:'Ja! Lägre än repet – och lägre än de andra.',no:'Ja! Lavere enn snoren – og lavere enn de andre.',es:'¡Sí! Es más baja que el cordón, y más baja que las otras.',it:'Sì! È più bassa dello spago, e più bassa delle altre.',pt:'Isso! É mais baixa que o barbante, e mais baixa que as outras.',fr:'Oui ! Elle est plus petite que la ficelle, et plus petite que les autres.',fi:'Kyllä! Narua matalampi – ja matalampi kuin muut.'},
    okSameTall:    {en:'Yes! It is just as tall as the cord.',de:'Ja! Sie ist genauso groß wie die Schnur.',nl:'Ja! Die is even hoog als het touwtje.',da:'Ja! Lige så høj som snoren.',sv:'Ja! Lika hög som repet.',no:'Ja! Like høy som snoren.',es:'¡Sí! Es igual de alta que el cordón.',it:'Sì! È alta come lo spago.',pt:'Isso! Tem a mesma altura do barbante.',fr:'Oui ! Elle est aussi grande que la ficelle.',fi:'Kyllä! Yhtä korkea kuin naru.'},
    okOrderTall:   {en:'From shortest to tallest!',de:'Von der kleinsten zur größten!',nl:'Van laag naar hoog!',da:'Fra den laveste til den højeste!',sv:'Från den lägsta till den högsta!',no:'Fra den laveste til den høyeste!',es:'¡De la más baja a la más alta!',it:'Dalla più bassa alla più alta!',pt:'Da mais baixa à mais alta!',fr:'De la plus petite à la plus grande !',fi:'Matalimmasta korkeimpaan!'},
    tagShort:      {en:'shorter than the cord',de:'kürzer als die Schnur',nl:'korter dan het touwtje',da:'kortere end snoren',sv:'kortare än repet',no:'kortere enn snoren',es:'más corto que el cordón',it:'più corto dello spago',pt:'mais curta que o barbante',fr:'plus court que la ficelle',fi:'narua lyhyempi'},
    tagSame:       {en:'just as long as the cord',de:'genauso lang wie die Schnur',nl:'even lang als het touwtje',da:'lige så langt som snoren',sv:'lika långt som repet',no:'like langt som snoren',es:'igual de largo que el cordón',it:'lungo come lo spago',pt:'do mesmo comprimento do barbante',fr:'aussi long que la ficelle',fi:'yhtä pitkä kuin naru'},
    tagLong:       {en:'longer than the cord',de:'länger als die Schnur',nl:'langer dan het touwtje',da:'længere end snoren',sv:'längre än repet',no:'lengre enn snoren',es:'más largo que el cordón',it:'più lungo dello spago',pt:'mais comprida que o barbante',fr:'plus long que la ficelle',fi:'narua pidempi'},
    tagShortTall:  {en:'shorter than the cord',de:'kleiner als die Schnur',nl:'lager dan het touwtje',da:'lavere end snoren',sv:'lägre än repet',no:'lavere enn snoren',es:'más baja que el cordón',it:'più bassa dello spago',pt:'mais baixa que o barbante',fr:'plus petite que la ficelle',fi:'narua matalampi'},
    tagSameTall:   {en:'just as tall as the cord',de:'genauso groß wie die Schnur',nl:'even hoog als het touwtje',da:'lige så høj som snoren',sv:'lika hög som repet',no:'like høy som snoren',es:'igual de alta que el cordón',it:'alta come lo spago',pt:'da mesma altura do barbante',fr:'aussi grande que la ficelle',fi:'yhtä korkea kuin naru'},
    tagLongTall:   {en:'taller than the cord',de:'größer als die Schnur',nl:'hoger dan het touwtje',da:'højere end snoren',sv:'högre än repet',no:'høyere enn snoren',es:'más alta que el cordón',it:'più alta dello spago',pt:'mais alta que o barbante',fr:'plus grande que la ficelle',fi:'narua korkeampi'},
    on_stool:      {en:'the one on the stool',de:'die auf dem Hocker',nl:'die op het krukje',da:'tingen på skamlen',sv:'saken på pallen',no:'tingen på krakken',es:'la del banquito',it:'quella sullo sgabello',pt:'a do banquinho',fr:'celle sur le tabouret',fi:'jakkaralla oleva'},
    on_box:        {en:'the one on the box',de:'die auf der Kiste',nl:'die op de kist',da:'tingen på kassen',sv:'saken på lådan',no:'tingen på kassen',es:'la de la caja',it:'quella sulla scatola',pt:'a da caixa',fr:'celle sur la caisse',fi:'laatikon päällä oleva'},
    on_shelf:      {en:'the one on the high shelf',de:'die auf dem hohen Regal',nl:'die op de hoge plank',da:'tingen på den høje hylde',sv:'saken på den höga hyllan',no:'tingen på den høye hylla',es:'la del estante alto',it:'quella sullo scaffale alto',pt:'a da prateleira alta',fr:'celle sur l’étagère haute',fi:'korkealla hyllyllä oleva'},
    aRibbon:       {en:'{rib}, {place}',de:'{rib}, {place}',nl:'{rib}, {place}',da:'{rib}, {place}',sv:'{rib}, {place}',no:'{rib}, {place}',es:'{rib}, {place}',it:'{rib}, {place}',pt:'{rib}, {place}',fr:'{rib}, {place}',fi:'{rib}, {place}'},
    placeH:        {en:'hanging from the hook',de:'am Haken',nl:'hangt aan de haak',da:'hænger på krogen',sv:'hänger på kroken',no:'henger på kroken',es:'colgado del gancho',it:'appeso al gancio',pt:'pendurada no gancho',fr:'suspendu au crochet',fi:'koukussa'},
    placeS:        {en:'lying on the high shelf',de:'auf dem hohen Regal',nl:'ligt op de hoge plank',da:'ligger på den høje hylde',sv:'ligger på den höga hyllan',no:'ligger på den høye hylla',es:'sobre el estante alto',it:'sullo scaffale alto',pt:'na prateleira alta',fr:'posé sur l’étagère haute',fi:'korkealla hyllyllä'},
    placeC:        {en:'lying on the counter',de:'auf der Theke',nl:'ligt op de toonbank',da:'ligger på disken',sv:'ligger på disken',no:'ligger på disken',es:'sobre el mostrador',it:'sul bancone',pt:'no balcão',fr:'posé sur le comptoir',fi:'tiskillä'},
    aCord:         {en:'The cord: drag it to a ribbon, or tap it and then a ribbon',de:'Die Schnur: Zieh sie zu einem Band oder tippe sie an und dann ein Band',nl:'Het touwtje: sleep het naar een lint, of tik erop en dan op een lint',da:'Snoren: Træk den hen til et bånd, eller tryk på den og så på et bånd',sv:'Repet: dra det till ett band, eller tryck på det och sedan på ett band',no:'Snoren: Dra den bort til et bånd, eller trykk på den og så på et bånd',es:'El cordón: arrástralo a un listón, o tócalo y luego toca un listón',it:'Lo spago: trascinalo su un nastro, oppure toccalo e poi tocca un nastro',pt:'O barbante: arraste-o até uma fita, ou toque nele e depois em uma fita',fr:'La ficelle : fais-la glisser jusqu’à un ruban, ou touche-la puis touche un ruban',fi:'Naru: vedä se nauhan luo tai napauta sitä ja sitten nauhaa'},
    aCordTall:     {en:'The cord: drag it to one of them, or tap it and then one of them',de:'Die Schnur: Zieh sie zu einer von ihnen oder tippe sie an und dann eine von ihnen',nl:'Het touwtje: sleep het naar één ervan, of tik erop en dan op één',da:'Snoren: Træk den hen til en af dem, eller tryk på den og så på en af dem',sv:'Repet: dra det till en av dem, eller tryck på det och sedan på en av dem',no:'Snoren: Dra den bort til en av dem, eller trykk på den og så på en av dem',es:'El cordón: arrástralo a una de ellas, o tócalo y luego toca una',it:'Lo spago: trascinalo su una di loro, oppure toccalo e poi toccane una',pt:'O barbante: arraste-o até uma delas, ou toque nele e depois em uma delas',fr:'La ficelle : fais-la glisser jusqu’à l’une d’elles, ou touche-la puis touches-en une',fi:'Naru: vedä se yhden luo tai napauta sitä ja sitten yhtä'},
    aSlot1:        {en:'Rail, first step',de:'Leiste, erste Stufe',nl:'Rail, eerste trede',da:'Skinne, første trin',sv:'Skena, första steget',no:'Skinne, første trinn',es:'Riel, primer escalón',it:'Guida, primo gradino',pt:'Trilho, primeiro degrau',fr:'Rail, première marche',fi:'Kisko, ensimmäinen askelma'},
    aSlot2:        {en:'Rail, second step',de:'Leiste, zweite Stufe',nl:'Rail, tweede trede',da:'Skinne, andet trin',sv:'Skena, andra steget',no:'Skinne, andre trinn',es:'Riel, segundo escalón',it:'Guida, secondo gradino',pt:'Trilho, segundo degrau',fr:'Rail, deuxième marche',fi:'Kisko, toinen askelma'},
    aSlot3:        {en:'Rail, third step',de:'Leiste, dritte Stufe',nl:'Rail, derde trede',da:'Skinne, tredje trin',sv:'Skena, tredje steget',no:'Skinne, tredje trinn',es:'Riel, tercer escalón',it:'Guida, terzo gradino',pt:'Trilho, terceiro degrau',fr:'Rail, troisième marche',fi:'Kisko, kolmas askelma'},
    check:         {en:'Check',de:'Prüfen',nl:'Controleer',da:'Tjek',sv:'Kontrollera',no:'Sjekk',es:'Comprobar',it:'Controlla',pt:'Verificar',fr:'Vérifier',fi:'Tarkista'},
    setQ:          {en:'Question',de:'Frage',nl:'Vraag',da:'Spørgsmål',sv:'Fråga',no:'Spørsmål',es:'Pregunta',it:'Domanda',pt:'Pergunta',fr:'Question',fi:'Kysymys'},
    qMixed:        {en:'Longest, shortest, as long',de:'Längste, kürzeste, gleich lang',nl:'Langste, kortste, even lang',da:'Længste, korteste, lige så lang',sv:'Längst, kortast, lika lång',no:'Lengste, korteste, like lang',es:'El más largo, el más corto, igual de largo',it:'Il più lungo, il più corto, lungo come lo spago',pt:'A mais comprida, a mais curta, do mesmo comprimento',fr:'Le plus long, le plus court, aussi long',fi:'Pisin, lyhin, yhtä pitkä'},
    qOrder:        {en:'Put in order',de:'Ordnen',nl:'Op volgorde zetten',da:'Sæt i rækkefølge',sv:'Sätt i ordning',no:'Sett i rekkefølge',es:'Ordenar',it:'Mettere in ordine',pt:'Colocar em ordem',fr:'Ranger dans l’ordre',fi:'Laita järjestykseen'},
    setThings:     {en:'Things',de:'Dinge',nl:'Dingen',da:'Ting',sv:'Saker',no:'Ting',es:'Objetos',it:'Oggetti',pt:'Objetos',fr:'Objets',fi:'Esineet'},
    thRibbons:     {en:'Ribbons',de:'Bänder',nl:'Linten',da:'Bånd',sv:'Band',no:'Bånd',es:'Listones',it:'Nastri',pt:'Fitas',fr:'Rubans',fi:'Nauhat'},
    thTall:        {en:'Tall things',de:'Hohe Dinge',nl:'Hoge dingen',da:'Høje ting',sv:'Höga saker',no:'Høye ting',es:'Objetos altos',it:'Oggetti alti',pt:'Objetos altos',fr:'Objets hauts',fi:'Korkeat esineet'},
    hintTagFirst:  {en:'Carry the cord to each ribbon first.',de:'Bring die Schnur zuerst zu jedem Band.',nl:'Breng het touwtje eerst naar elk lint.',da:'Bær først snoren hen til hvert bånd.',sv:'Bär först repet till varje band.',no:'Bær først snoren bort til hvert bånd.',es:'Primero lleva el cordón a cada listón.',it:'Prima porta lo spago a ogni nastro.',pt:'Primeiro leve o barbante até cada fita.',fr:'Porte d’abord la ficelle jusqu’à chaque ruban.',fi:'Vie naru ensin jokaisen nauhan luo.'},
    hintTagFirstTall:{en:'Hold the cord up to each one first.',de:'Halte die Schnur zuerst an jede.',nl:'Houd het touwtje eerst naast elk ervan.',da:'Hold først snoren op ved hver af dem.',sv:'Håll först repet intill var och en.',no:'Hold først snoren opp ved hver av dem.',es:'Primero pon el cordón junto a cada una.',it:'Prima metti lo spago accanto a ognuna.',pt:'Primeiro coloque o barbante ao lado de cada uma.',fr:'Tiens d’abord la ficelle contre chacune.',fi:'Pidä narua ensin jokaisen vieressä.'},
    hintTags2Tall: {en:'The cord is the same every time — so the three tags tell you the answer.',de:'Die Schnur ist jedes Mal dieselbe – deshalb verraten dir die drei Schilder die Antwort.',nl:'Het touwtje is elke keer hetzelfde, dus de drie kaartjes vertellen je het antwoord.',da:'Snoren er den samme hver gang – så de tre mærker fortæller dig svaret.',sv:'Repet är detsamma varje gång – därför visar de tre lapparna svaret.',no:'Snoren er den samme hver gang – derfor forteller de tre lappene deg svaret.',es:'El cordón es siempre el mismo, así que las tres etiquetas te dicen la respuesta.',it:'Lo spago è sempre lo stesso, quindi le tre etichette ti dicono la risposta.',pt:'O barbante é sempre o mesmo, então as três etiquetas mostram a resposta.',fr:'La ficelle est toujours la même : les trois étiquettes te donnent donc la réponse.',fi:'Naru on joka kerta sama, joten kolme lappua kertovat vastauksen.'},
    tagNote:       {en:'{name}: {tag}',de:'{name}: {tag}',nl:'{name}: {tag}',da:'{name}: {tag}',sv:'{name}: {tag}',no:'{name}: {tag}',es:'{name}: {tag}',it:'{name}: {tag}',pt:'{name}: {tag}',fr:'{name} : {tag}',fi:'{name}: {tag}'}
  },/*STRINGS-END*/

  /* "the red ribbon" per locale: a whole authored phrase per colour (agreement is never assembled by rule) */
  /*RIBBON-BEGIN*/RIBBON: {
    en: {red:'the red ribbon',blue:'the blue ribbon',green:'the green ribbon',yellow:'the yellow ribbon',purple:'the purple ribbon',orange:'the orange ribbon'},
    de: {red:'das rote Band',blue:'das blaue Band',green:'das grüne Band',yellow:'das gelbe Band',purple:'das lila Band',orange:'das orange Band'},
    nl: {red:'het rode lint',blue:'het blauwe lint',green:'het groene lint',yellow:'het gele lint',purple:'het paarse lint',orange:'het oranje lint'},
    da: {red:'det røde bånd',blue:'det blå bånd',green:'det grønne bånd',yellow:'det gule bånd',purple:'det lilla bånd',orange:'det orange bånd'},
    sv: {red:'det röda bandet',blue:'det blå bandet',green:'det gröna bandet',yellow:'det gula bandet',purple:'det lila bandet',orange:'det orange bandet'},
    no: {red:'det røde båndet',blue:'det blå båndet',green:'det grønne båndet',yellow:'det gule båndet',purple:'det lilla båndet',orange:'det oransje båndet'},
    es: {red:'el listón rojo',blue:'el listón azul',green:'el listón verde',yellow:'el listón amarillo',purple:'el listón morado',orange:'el listón naranja'},
    it: {red:'il nastro rosso',blue:'il nastro blu',green:'il nastro verde',yellow:'il nastro giallo',purple:'il nastro viola',orange:'il nastro arancione'},
    pt: {red:'a fita vermelha',blue:'a fita azul',green:'a fita verde',yellow:'a fita amarela',purple:'a fita roxa',orange:'a fita laranja'},
    fr: {red:'le ruban rouge',blue:'le ruban bleu',green:'le ruban vert',yellow:'le ruban jaune',purple:'le ruban violet',orange:'le ruban orange'},
    fi: {red:'punainen nauha',blue:'sininen nauha',green:'vihreä nauha',yellow:'keltainen nauha',purple:'violetti nauha',orange:'oranssi nauha'}
  },/*RIBBON-END*/

  defaults: { question: 'mixed', things: 'ribbons' },
  settings: [
    { key: 'question', type: 'choice', labelKey: 'setQ', options: [{ value: 'mixed', labelKey: 'qMixed' }, { value: 'order', labelKey: 'qOrder' }] },
    { key: 'things', type: 'choice', labelKey: 'setThings', options: [{ value: 'ribbons', labelKey: 'thRibbons' }, { value: 'tall', labelKey: 'thTall' }] }
  ],
  OK_MS: 4200, FAST: false,
  PAINT: { stool: '#6FA3C9', box: '#E9C46A', shelf: '#B07D4F' },

  init: function (api) {
    this.api = api;
    this.st = null; this._pool = null; this._poolKey = null; this._order = null; this._orderForPool = null; this._pass = 0; this._pos = 0;
    this._timers = []; this._ro = null; this._view = {}; this._dragUntil = 0; this._pics = {};
    injectCordCSS();
    var self = this;
    if (typeof LCSPictures !== 'undefined') ['pets', 'christmas', 'kitchen tools'].forEach(function (th) { LCSPictures.load(th).then(function (t) { self._pics[th] = t; if (self._wrap && self._wrap.isConnected) self._paint(); }).catch(function () {}); });
  },
  destroy: function () { this._clearTimers(); if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; } },
  onSettings: function () {
    if (this._poolKey !== this._key()) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._paint();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); return id; },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },
  _setting: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _loc: function () { return TravelCordCore.locale(((this.api && this.api.lang) || 'en')); },
  _q: function () { return TravelCordCore.questionOf(this._setting('question')); },
  _th: function () { return TravelCordCore.thingsOf(this._setting('things')); },
  _key: function () { return this._q() + '.' + this._th(); },
  _cap: function (s) { s = String(s); return s.charAt(0).toUpperCase() + s.slice(1); },
  /* "the red ribbon" (lower case) — or, for tall things, "the one on the stool" */
  _name: function (id) {
    var r = this.st.r;
    if (r.things === 'tall') return this._t('on_' + this.st.lay.place[id]);
    var t = this.RIBBON[this._loc()] || this.RIBBON.en; return t[id];
  },
  _ensurePool: function () {
    var k = this._key();
    if (!this._pool || this._poolKey !== k) { this._pool = TravelCordCore.ids(this._q(), this._th()); this._poolKey = k; this._order = null; this._orderForPool = null; this._pass = 0; }
    return this._pool;
  },
  nextTask: function (opts) {
    var C = TravelCordCore, pool = this._ensurePool(), n = pool.length, index = (opts && opts.index) || 0, pass = Math.floor(index / n), pos = index % n;
    var fresh = !this._order || this._orderForPool !== pool || this._order.length !== n;
    if (fresh || pass > this._pass) {
      /* _order holds POSITIONS into _pool (the test seam's contract); the plan works on round ids */
      var prevIds = fresh ? null : this._order.map(function (p) { return pool[p]; });
      this._order = C.plan(this._q(), this._th(), Math.random, prevIds).order.map(function (id) { return pool.indexOf(id); }); this._orderForPool = pool; this._pass = pass;
    }
    var id = pool[this._order[pos]], pa = { msg: this._promptText(C.round(this._q(), this._th(), id)) }; this._pa = pa;
    return {
      id: 'travelcord.' + this._loc() + '.' + this._key() + '.' + id, promptKey: 'instrBubble', promptArgs: pa, celebrateKey: 'okBubble', answerType: 'state',
      setup: function (tool) { tool._start(id, pos); },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },
  _promptText: function (r) {
    var k = r.kind === 'long' ? 'tLong' : r.kind === 'short' ? 'tShort' : r.kind === 'same' ? 'tSame' : 'tOrder';
    return this._t(k + (r.things === 'tall' ? 'Tall' : ''));
  },
  _start: function (id, pos) {
    var C = TravelCordCore;
    this._clearTimers(); this._view = {}; this._pos = pos || 0; this._busy = false; this._dragUntil = 0;
    var r = C.round(this._q(), this._th(), id);
    this.st = C.newState(r, C.layout(r));
    var line = this._promptText(r); if (this._pa) this._pa.msg = line;
    var pe = typeof document !== 'undefined' && document.querySelector('.lcs-activity-prompt-text'); if (pe) pe.textContent = line;
  },

  /* ---------------- render ---------------- */
  render: function () {
    this._ensurePool();
    if (!this.st) this._start(this._pool[0], 0);
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
    if (this._ro || typeof ResizeObserver === 'undefined' || !this.api || !this.api.stage) return;
    var self = this, last = this._width();
    this._ro = new ResizeObserver(function () { var w = self._width(); if (Math.abs(w - last) < 2 || !self._wrap || !self._wrap.isConnected) return; last = w; self._paint(); });
    this._ro.observe(this.api.stage);
  },
  _render2: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    var wrap = api.el('div', 'tc-wrap'); this._wrap = wrap; wrap.tabIndex = -1; wrap.setAttribute('lang', this._loc());
    wrap.innerHTML = '<div class="tc-wall"></div><div class="tc-row"><div class="tc-tray"></div><div class="tc-rail" role="group"></div></div><div class="tc-foot"></div><p class="tc-note" aria-live="polite"></p>';
    wrap.addEventListener('keydown', function (e) { if ((e.key === 'Escape') && self.st && self.st.carrying) { self.st.carrying = false; self._paint(); } });
    this._qs = function (s) { return wrap.querySelector(s); };
    api.stage.appendChild(wrap);
    this._paint();
  },
  _paint: function () {
    var a = document.activeElement, had = !!(a && this._wrap && this._wrap.contains(a)), sel = null;
    if (had && a !== this._wrap && a.getAttribute('data-k')) sel = '[data-k="' + a.getAttribute('data-k') + '"]';
    this._paint_();
    if (had) { var nx = sel ? this._wrap.querySelector(sel) : null; (nx && !nx.disabled ? nx : this._wrap).focus(); }
  },
  _btn: function (cls, k, label, html) { var b = this.api.el('button', cls); b.type = 'button'; if (k) b.setAttribute('data-k', k); if (label) b.setAttribute('aria-label', label); if (html != null) b.innerHTML = html; return b; },
  /* the wall's size: px per unit */
  _dims: function () {
    var C = TravelCordCore, r = this.st.r, W = C.WALL[r.things], w = this._width();
    var max = r.things === 'tall' ? 470 : 620, px = Math.min(w, max);
    return { W: W.W, H: W.H, px: px, U: px / W.W, narrow: w < 560 };
  },
  _paint_: function () {
    if (!this._wrap) return;
    var C = TravelCordCore, st = this.st, r = st.r, v = this._view, B = C.band(this._width());
    this._wrap.className = 'tc-wrap ' + (B.wide ? 'is-wide' : 'is-narrow') + (B.tiny ? ' is-tiny' : '') + (st.done ? ' is-done' : '') + (this.FAST ? ' is-fast' : '') + ' is-' + r.things + ' is-' + r.kind + (st.carrying ? ' is-carrying' : '');
    this._paintWall();
    this._paintTray();
    this._paintRail();
    /* narrow screens: Check joins Tilly and the basket in one row (a whole band saved for the 320 px fold) */
    var self = this, foot = this._qs('.tc-foot'); foot.innerHTML = ''; foot.style.display = B.wide ? '' : 'none';
    var ck = this._btn('tc-check', 'check', null); ck.textContent = this._t('check'); ck.disabled = st.done || !!this._busy;
    ck.addEventListener('click', function () { self._check(); }); (B.wide ? foot : this._qs('.tc-tray')).appendChild(ck);
    var note = this._qs('.tc-note'), h = C.hint(st);
    if (v.msg) { note.textContent = v.msg; note.className = 'tc-note is-ok'; }
    else if (v.note) { note.textContent = v.note; note.className = 'tc-note is-hint'; }
    else if (h && v.checked) { note.textContent = this._t(h.key, h.args); note.className = 'tc-note is-hint'; }
    else if (st.carrying) { note.textContent = this._t(r.things === 'tall' ? 'hintCarryTall' : 'hintCarry'); note.className = 'tc-note'; }
    else { note.textContent = ''; note.className = 'tc-note'; }
  },

  /* ---- the wall: an SVG drawing in units, the things over it as buttons ---- */
  _paintWall: function () {
    var C = TravelCordCore, st = this.st, r = st.r, D = this._dims(), U = D.U, wall = this._qs('.tc-wall'), self = this, g = C.geom(r, st.lay);
    wall.innerHTML = ''; wall.style.width = D.px + 'px'; wall.style.height = Math.round(D.H * U) + 'px';
    var s = [], k;
    s.push('<rect x="0" y="0" width="' + D.W + '" height="' + D.H + '" rx="0.5" fill="#FBF3E4"/>');
    if (r.things === 'ribbons') {
      /* fixtures: the hook, the high shelf, the counter */
      s.push('<path d="M1.6 0.35 V0.95 a0.32 0.32 0 1 0 0.32 0.32" fill="none" stroke="#B8893A" stroke-width="0.16" stroke-linecap="round"/><circle cx="1.6" cy="0.35" r="0.18" fill="#B8893A"/>');
      s.push('<rect x="3.6" y="3.02" width="14.1" height="0.42" rx="0.08" fill="#C08A52"/><path d="M4.4 3.44 v0.9 h0.7 M16.4 3.44 v0.9 h0.7" stroke="#9C6B3C" stroke-width="0.18" fill="none"/>');
      s.push('<rect x="3.6" y="11.32" width="14.3" height="2.7" rx="0.12" fill="#D9B38C"/><rect x="3.6" y="11.32" width="14.3" height="0.3" fill="#C08A52"/>');
    } else {
      s.push('<rect x="0" y="' + (D.H - 0.4) + '" width="' + D.W + '" height="0.4" fill="#C08A52"/>');
      if (st.done) s.push('<g opacity="0.18">');
      C.DATA.STANDS.forEach(function (sd) {
        var col = st.lay.order.indexOf(sd), cx = 2.0 + col * 4.5, h = C.DATA.STAND_H[sd], fl = D.H - 0.4, paint = self.PAINT[sd];
        if (sd === 'stool') s.push('<rect x="' + (cx - 1.2) + '" y="' + (fl - h) + '" width="2.4" height="0.32" rx="0.08" fill="' + paint + '"/><path d="M' + (cx - 0.9) + ' ' + (fl - h + 0.3) + ' L' + (cx - 1.1) + ' ' + fl + ' M' + (cx + 0.9) + ' ' + (fl - h + 0.3) + ' L' + (cx + 1.1) + ' ' + fl + '" stroke="' + paint + '" stroke-width="0.22"/>');
        else if (sd === 'box') s.push('<rect x="' + (cx - 1.3) + '" y="' + (fl - h) + '" width="2.6" height="' + h + '" rx="0.1" fill="' + paint + '"/><path d="M' + (cx - 1.3) + ' ' + (fl - h + 0.5) + ' h2.6" stroke="#C9A54E" stroke-width="0.08"/>');
        else s.push('<rect x="' + (cx - 1.5) + '" y="' + (fl - h) + '" width="3.0" height="0.36" rx="0.08" fill="' + paint + '"/><path d="M' + (cx - 1.2) + ' ' + (fl - h + 0.34) + ' V' + fl + ' M' + (cx + 1.2) + ' ' + (fl - h + 0.34) + ' V' + fl + ' M' + (cx - 1.2) + ' ' + (fl - 1.6) + ' H' + (cx + 1.2) + '" stroke="' + paint + '" stroke-width="0.2"/>');
      });
      if (st.done) s.push('</g>');
    }
    /* the ribbons (tall things are pictures, placed below) */
    if (r.things === 'ribbons') r.items.forEach(function (x) {
      var q = g[x.id], fade = st.done ? ' opacity="0.25"' : '';
      if (q.dir === 'h') s.push('<rect class="tc-ribbon" data-id="' + x.id + '" x="' + q.x0 + '" y="' + (q.y0 - 0.31) + '" width="' + (q.x1 - q.x0) + '" height="0.62" rx="0.12" fill="' + C.DATA.HEX[x.colour] + '"' + fade + '/>');
      else { if (q.y0 > 1.35) s.push('<line x1="' + q.x0 + '" y1="1.25" x2="' + q.x0 + '" y2="' + q.y0 + '" stroke="#8C6A45" stroke-width="0.07"' + fade + '/>'); s.push('<rect class="tc-ribbon" data-id="' + x.id + '" x="' + (q.x0 - 0.31) + '" y="' + q.y0 + '" width="0.62" height="' + (q.y1 - q.y0) + '" rx="0.12" fill="' + C.DATA.HEX[x.colour] + '"' + fade + '/>'); }
      s.push('<circle cx="' + q.x0 + '" cy="' + q.y0 + '" r="0.2" fill="#B8893A"' + fade + '/>');
    });
    /* the laid cord: from the start pin, the cord's own 6 units, the clip at the start and the knot at its end */
    if (st.laid && !st.done) {
      var q = g[st.laid], x0 = q.x0, y0 = q.y0, x1, y1, tag = st.tags[st.laid];
      if (r.things === 'tall') { var ink = this._ink(st.laid); x0 = q.x0 + ink.half + 0.38; y0 = q.foot; x1 = x0; y1 = y0 - C.CORD; }
      else if (q.dir === 'h') { x1 = x0 + C.CORD; y1 = y0; }
      else { x1 = x0; y1 = y0 + C.CORD; }
      s.push('<g class="tc-laid is-' + tag + '"><line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y1 + '" stroke="#146B5E" stroke-width="0.22" stroke-linecap="round"/><circle cx="' + x0 + '" cy="' + y0 + '" r="0.3" fill="#B8893A" stroke="#7A5A22" stroke-width="0.06"/><circle class="tc-knot" cx="' + x1 + '" cy="' + y1 + '" r="0.26" fill="#146B5E"/></g>');
    }
    /* the tags */
    var tagAt = function (x) {
      var q = g[x.id];
      if (r.things === 'tall') return { x: q.x0 - 0.9, y: D.H - 0.4 - 1.25 };
      var p = st.lay.place[x.id];
      return p === 'H' ? { x: 2.2, y: 0.15 } : p === 'S' ? { x: q.x0, y: 1.05 } : { x: q.x0, y: 9.3 };
    };
    var tagSvg = function (x0, y0, tag, colour, sc) {
      sc = sc || 1; var w = 1.8 * sc, h = 1.1 * sc, bw = (tag === 'short' ? 0.62 : tag === 'same' ? 1.0 : 1.34) * sc;
      return '<g class="tc-tag is-' + tag + '"><rect x="' + x0 + '" y="' + y0 + '" width="' + w + '" height="' + h + '" rx="' + 0.16 * sc + '" fill="#FFFDF7" stroke="#C9B79A" stroke-width="0.06"/>' +
        '<rect x="' + (x0 + 0.22 * sc) + '" y="' + (y0 + 0.26 * sc) + '" width="' + 1.0 * sc + '" height="' + 0.18 * sc + '" rx="0.05" fill="#146B5E"/>' +
        '<rect x="' + (x0 + 0.22 * sc) + '" y="' + (y0 + 0.6 * sc) + '" width="' + bw + '" height="' + 0.26 * sc + '" rx="0.05" fill="' + colour + '"/>' +
        (tag === 'same' ? '<path d="M' + (x0 + 1.22 * sc) + ' ' + (y0 + 0.16 * sc) + ' v' + 0.8 * sc + '" stroke="#3A2E1F" stroke-width="0.06"/>' : '') + '</g>';
    };
    var colourOf = function (x) { return r.things === 'tall' ? self.PAINT[st.lay.place[x.id]] : C.DATA.HEX[x.colour]; };
    var helpTags = st.show >= 2 && !st.done && r.things === 'ribbons';
    r.items.forEach(function (x) { var t = st.tags[x.id]; if (!t || helpTags || st.done) return; var p = tagAt(x), sv = tagSvg(p.x, p.y, t, colourOf(x)); if (st.show === 1 && self._view.checked && (st.chosen === x.id || r.kind === 'order')) sv = sv.replace('class="tc-tag ', 'class="tc-tag is-pulse '); s.push(sv); });
    /* miss 2 (ribbons): the three tags line up in the middle of the wall — shorter, as long, longer */
    if (helpTags) {
      var rank = { short: 0, same: 1, long: 2 }, row = r.items.slice().sort(function (a, b) { return rank[st.tags[a.id]] - rank[st.tags[b.id]]; });
      row.forEach(function (x, i) { s.push(tagSvg(4.6 + i * 4.2, 5.6, st.tags[x.id], colourOf(x), 1.7)); });
    }
    /* the reveal (ribbons): the three side by side from ONE pin, shortest first, and the cord beneath them */
    if (st.done && r.things === 'ribbons') {
      var srt = r.items.slice().sort(function (a, b) { return a.len - b.len; });
      srt.forEach(function (x, i) { var yy = 5.3 + i * 1.25; s.push('<rect class="tc-reveal" x="4.2" y="' + (yy - 0.31) + '" width="' + x.len + '" height="0.62" rx="0.12" fill="' + C.DATA.HEX[x.colour] + '" style="animation-delay:' + (self.FAST ? 0 : i * 120) + 'ms"/>'); });
      var cy = 5.3 + 3 * 1.25; s.push('<g class="tc-reveal"><line x1="4.2" y1="' + cy + '" x2="' + (4.2 + C.CORD) + '" y2="' + cy + '" stroke="#146B5E" stroke-width="0.22" stroke-linecap="round"/><circle cx="4.2" cy="' + cy + '" r="0.3" fill="#B8893A"/><circle cx="' + (4.2 + C.CORD) + '" cy="' + cy + '" r="0.26" fill="#146B5E"/></g>');
      s.push('<line x1="4.2" y1="4.7" x2="4.2" y2="' + (cy + 0.5) + '" stroke="#B8893A" stroke-width="0.08" stroke-dasharray="0.2 0.15"/>');
    }
    var svg = '<svg class="tc-svg" viewBox="0 0 ' + D.W + ' ' + D.H + '" aria-hidden="true" preserveAspectRatio="xMinYMin meet">' + s.join('') + '</svg>';
    wall.innerHTML = svg;
    /* tall things: the pictures, each placed so its ink stands on its stand (done: all on the floor, side by side) */
    if (r.things === 'tall') {
      var th = this._pics[C.DATA.PICS[r.pic][0]];
      r.items.forEach(function (x) {
        if (!th || typeof LCSPictures === 'undefined') return;
        var q = g[x.id], ink = C.DATA.INK[r.pic], S = x.len / ink.h, foot = st.done ? D.H - 0.4 : q.foot, cx = q.x0;
        var im = LCSPictures.img(th, C.DATA.PICS[r.pic][1], self._loc(), {}); im.className = 'tc-pic' + (st.done ? ' is-down' : ''); im.alt = ''; im.setAttribute('data-id', x.id);
        im.style.width = im.style.height = (S * U) + 'px';
        im.style.left = ((cx - (ink.x + ink.w / 2) * S) * U) + 'px'; im.style.top = ((foot - (ink.y + ink.h) * S) * U) + 'px';
        wall.appendChild(im);
      });
      if (st.done) { /* the reveal: a dashed floor line and the cord standing beside them */
        wall.querySelector('svg').insertAdjacentHTML('beforeend', '<g class="tc-reveal"><line x1="' + (D.W - 0.16) + '" y1="' + (D.H - 0.4) + '" x2="' + (D.W - 0.16) + '" y2="' + (D.H - 0.4 - C.CORD) + '" stroke="#146B5E" stroke-width="0.22" stroke-linecap="round"/><circle cx="' + (D.W - 0.16) + '" cy="' + (D.H - 0.4) + '" r="0.3" fill="#B8893A"/><circle cx="' + (D.W - 0.16) + '" cy="' + (D.H - 0.4 - C.CORD) + '" r="0.26" fill="#146B5E"/><line x1="0.2" y1="' + (D.H - 0.4 - C.CORD) + '" x2="' + (D.W - 0.2) + '" y2="' + (D.H - 0.4 - C.CORD) + '" stroke="#146B5E" stroke-width="0.05" stroke-dasharray="0.25 0.2"/></g>');
      }
    }
    /* the things as buttons (≥ 44 px): tap to measure (when the cord is in hand), to choose, or to pick for the rail */
    r.items.forEach(function (x) {
      var q = g[x.id], box;
      if (r.things === 'tall') { var ink = self._ink(x.id), ft = st.done ? D.H - 0.4 : q.foot; box = { x: q.x0 - ink.half, y: ft - x.len, w: ink.half * 2, h: x.len }; }
      else if (q.dir === 'h') box = { x: q.x0 - 0.3, y: q.y0 - 0.31, w: x.len + 0.3, h: 0.62 };
      else box = { x: q.x0 - 0.31, y: q.y0 - 0.3, w: 0.62, h: x.len + 0.3 };
      var L = box.x * U, T = box.y * U, Wd = box.w * U, Ht = box.h * U;
      if (Wd < 44) { L -= (44 - Wd) / 2; Wd = 44; } if (Ht < 44) { T -= (44 - Ht) / 2; Ht = 44; }
      var chosen = st.chosen === x.id, onRail = st.slots.indexOf(x.id) >= 0;
      var b = self._btn('tc-thing' + (chosen ? ' is-chosen' : '') + (onRail ? ' is-railed' : '') + (st.done && (r.kind === 'order' || x.id === C.answer(r)) ? ' is-right' : ''), 'thing-' + x.id, self._thingLabel(x));
      b.style.left = L + 'px'; b.style.top = T + 'px'; b.style.width = Wd + 'px'; b.style.height = Ht + 'px';
      b.disabled = st.done;
      b.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._tapThing(x.id); });
      if (r.kind === 'order') b.addEventListener('pointerdown', function (e) { self._dragThing(e, x.id, b); });
      wall.appendChild(b);
    });
  },
  _ink: function (id) { var C = TravelCordCore, r = this.st.r, x = C.item(r, id), ink = C.DATA.INK[r.pic], S = x.len / ink.h; return { half: ink.w * S / 2 }; },
  _thingLabel: function (x) {
    var st = this.st, r = st.r, t = st.tags[x.id], nm = this._cap(this._name(x.id));
    var base = r.things === 'tall' ? nm : this._t('aRibbon', { rib: nm, place: this._t('place' + st.lay.place[x.id]) });
    return t ? base + ' — ' + this._tagText(x.id, t) : base;
  },
  _tagText: function (id, t) { return this._t((t === 'short' ? 'tagShort' : t === 'same' ? 'tagSame' : 'tagLong') + (this.st.r.things === 'tall' ? 'Tall' : '')); },

  /* ---- the tray: Tilly and the cord's basket ---- */
  _paintTray: function () {
    var st = this.st, r = st.r, tray = this._qs('.tc-tray'), self = this, C = TravelCordCore, B = C.band(this._width());
    tray.innerHTML = '';
    var tilly = this.api.el('span', 'tc-tilly' + (st.done ? ' is-hop' : '')), th = this._pics.pets;
    if (th && typeof LCSPictures !== 'undefined') { var im = LCSPictures.img(th, 'cat', this._loc(), { size: B.wide ? 96 : 64 }); im.className = 'tc-cat'; im.alt = ''; tilly.appendChild(im); }
    tray.appendChild(tilly);
    var away = !!st.laid && !st.carrying;
    var bk = this._btn('tc-basket' + (st.carrying ? ' is-on' : '') + (away ? ' is-away' : ''), 'cord', this._t(r.things === 'tall' ? 'aCordTall' : 'aCord'),
      '<svg viewBox="0 0 60 44" aria-hidden="true"><path d="M6 24 h48 l-5 16 h-38z" fill="#C9A06A" stroke="#8C6A45" stroke-width="2"/><path d="M10 30 h40 M12 35 h36" stroke="#8C6A45" stroke-width="1.2"/>' +
      (away ? '' : '<g fill="none" stroke="#146B5E" stroke-width="3.2"><ellipse cx="30" cy="20" rx="15" ry="7"/><ellipse cx="30" cy="17" rx="10" ry="5"/></g><circle cx="44" cy="12" r="4" fill="#B8893A"/>') + '</svg>');
    bk.disabled = st.done;
    bk.addEventListener('click', function () { if (self._dragUntil && Date.now() < self._dragUntil) { self._dragUntil = 0; return; } self._pickCord(); });
    bk.addEventListener('pointerdown', function (e) { self._dragCord(e, bk); });
    tray.appendChild(bk);
  },

  /* ---- the order rail: three rising pegs ---- */
  _paintRail: function () {
    var st = this.st, r = st.r, rail = this._qs('.tc-rail'), self = this, C = TravelCordCore;
    rail.innerHTML = ''; rail.style.display = r.kind === 'order' ? '' : 'none';
    if (r.kind !== 'order') return;
    [0, 1, 2].forEach(function (i) {
      var id = st.slots[i], x = id ? C.item(r, id) : null, col = x ? (r.things === 'tall' ? self.PAINT[st.lay.place[id]] : C.DATA.HEX[x.colour]) : null;
      var b = self._btn('tc-slot is-' + i + (x ? ' is-full' : '') + (st.done ? ' is-right' : ''), 'slot-' + i, self._t('aSlot' + (i + 1)) + (x ? ': ' + self._cap(self._name(id)) : ''),
        '<span class="tc-peg"></span>' + (x ? '<span class="tc-swatch" style="background:' + col + '"></span>' : ''));
      b.disabled = st.done;
      b.addEventListener('click', function () { self._tapSlot(i); });
      rail.appendChild(b);
    });
  },

  /* ---------------- actions ---------------- */
  _edit: function (extra) { this._clearTimers(); this._busy = false; this._view = extra || {}; this._paint(); },
  _pickCord: function () { var st = this.st; if (this._busy || st.done) return; st.carrying = !st.carrying; this.api.sound(st.carrying ? 520 : 300); this._edit(); },
  _tapThing: function (id) {
    var C = TravelCordCore, st = this.st; if (this._busy || st.done) return;
    if (st.carrying) { this._measure(id); return; }
    C.choose(st, id); this.api.sound(440); this._edit();
  },
  _measure: function (id) {
    var C = TravelCordCore, st = this.st, t = C.measure(st, id); if (!t) return;
    this.api.sound(t === 'same' ? 1200 : t === 'short' ? 660 : 380);
    this._edit({ note: this._t('tagNote', { name: this._cap(this._name(id)), tag: this._tagText(id, t) }) });
    this.api.announce(this._qs('.tc-note').textContent || '');
  },
  _tapSlot: function (i) {
    var C = TravelCordCore, st = this.st; if (this._busy || st.done) return;
    if (st.chosen) { if (C.place(st, st.chosen, i) === 'placed') { this.api.sound(560); this._edit(); } return; }
    if (st.slots[i] != null && C.unplace(st, i) === 'removed') { this.api.sound(300); this._edit(); }
  },
  /* drag the cord out of its basket by the clip: dropped near a thing's start (or on it), it is laid there */
  _dragCord: function (e, el) {
    var self = this; if (this._busy || this.st.done || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, y0 = e.clientY, ghost = null, moved = false;
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
      if (!moved) { moved = true; ghost = document.createElement('span'); ghost.className = 'tc-clipghost'; document.body.appendChild(ghost); }
      ghost.style.left = (ev.clientX - 14) + 'px'; ghost.style.top = (ev.clientY - 14) + 'px';
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!moved) return;
      self._dragUntil = Date.now() + 300; if (ghost) ghost.remove();
      var id = self._dropTarget(ev.clientX, ev.clientY);
      if (id) self._measure(id);
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  /* the thing whose start pin is within 40 px of the drop, else the thing whose button holds the drop (the clip slides to its start) */
  _dropTarget: function (x, y) {
    var C = TravelCordCore, st = this.st, r = st.r, wall = this._qs('.tc-wall'), R = wall.getBoundingClientRect(), D = this._dims(), g = C.geom(r, st.lay), best = null, bd = 41;
    r.items.forEach(function (it) { var q = g[it.id], px = R.left + q.x0 * D.U, py = R.top + (r.things === 'tall' ? q.foot : q.y0) * D.U, d = Math.hypot(px - x, py - y); if (d < bd) { bd = d; best = it.id; } });
    if (best) return best;
    var hit = document.elementsFromPoint(x, y).map(function (n) { return n.closest && n.closest('.tc-thing'); }).filter(Boolean)[0];
    return hit ? hit.getAttribute('data-k').slice(6) : null;
  },
  /* order: drag a thing onto a rail slot */
  _dragThing: function (e, id, el) {
    var self = this; if (this._busy || this.st.done || this.st.carrying || (e.button != null && e.button !== 0)) return;
    var x0 = e.clientX, y0 = e.clientY, ghost = null, moved = false, C = TravelCordCore, r = this.st.r;
    var move = function (ev) {
      if (!moved && Math.abs(ev.clientX - x0) + Math.abs(ev.clientY - y0) < 8) return;
      if (!moved) { moved = true; ghost = document.createElement('span'); ghost.className = 'tc-swatch tc-dragswatch'; ghost.style.background = r.things === 'tall' ? self.PAINT[self.st.lay.place[id]] : C.DATA.HEX[C.item(r, id).colour]; document.body.appendChild(ghost); }
      ghost.style.left = (ev.clientX - 30) + 'px'; ghost.style.top = (ev.clientY - 12) + 'px';
    };
    var up = function (ev) {
      document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up);
      if (!moved) return;
      self._dragUntil = Date.now() + 300; if (ghost) ghost.remove();
      var hit = document.elementsFromPoint(ev.clientX, ev.clientY).map(function (n) { return n.closest && n.closest('.tc-slot'); }).filter(Boolean)[0];
      if (hit && C.place(self.st, id, +hit.getAttribute('data-k').slice(5)) === 'placed') { self.api.sound(560); self._edit(); }
    };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  },
  _check: function () {
    var C = TravelCordCore, st = this.st;
    if (this._busy || st.done) return;
    var a = C.check(st);
    this._view = { checked: true };
    if (a.result === 'none') { this.api.sound(200); this._paint(); this.api.announce(this._qs('.tc-note').textContent || ''); return; }
    if (a.result === 'ok') {
      var msg = this._okText(); this._view.msg = msg; this.api.sound(880); this._paint(); this.api.announce(msg);
      this._advance(msg.length * 60 + 2800);
    } else { this.api.sound(220); this._paint(); this.api.announce(this._qs('.tc-note').textContent || ''); }
  },
  _okText: function () {
    var ok = TravelCordCore.okOf(this.st);
    if (ok.key === 'okOrder') return this._cap(this._t('okOrder', { rib1: this._name(ok.order[0]), rib2: this._name(ok.order[1]), rib3: this._name(ok.order[2]) }));
    if (ok.id && this.st.r.things === 'ribbons') return this._t(ok.key, { Rib: this._cap(this._name(ok.id)) });
    return this._t(ok.key);
  },
  _advance: function (ms) {
    if (this._adv) clearTimeout(this._adv);
    this._adv = this._later(function () { var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click(); }, Math.max(this.OK_MS, this.OK_MS === 4200 ? ms : 0));
  }
};

var tcCssDone = false;
function injectCordCSS() {
  if (tcCssDone || typeof document === 'undefined') return;
  tcCssDone = true;
  var B = 'var(--lcs-font-body,Nunito,sans-serif)', H = 'var(--lcs-font-display,"Baloo 2",sans-serif)';
  var css = ''
  + '.lcs-activity-check{display:none !important;}'
  + '.tc-wrap{position:relative;width:100%;display:flex;flex-direction:column;align-items:center;gap:10px;user-select:none;-webkit-user-select:none;} .tc-wrap:focus{outline:none;}'
  + '.tc-wall{position:relative;border-radius:14px;box-shadow:inset 0 0 0 2px #E8DCC6;overflow:visible;} .tc-svg{position:absolute;inset:0;width:100%;height:100%;display:block;}'
  + '.tc-thing{position:absolute;border:0;background:transparent;border-radius:10px;cursor:pointer;padding:0;touch-action:none;} .tc-thing:focus-visible{outline:3px solid #146B5E;outline-offset:2px;}'
  + '.tc-thing.is-chosen{box-shadow:0 0 0 3px #146B5E;background:rgba(20,107,94,.08);} .tc-thing.is-railed{outline:2px dashed #146B5E;outline-offset:1px;} .tc-thing.is-right{box-shadow:0 0 0 3px #F4CF62;} .tc-thing:disabled{cursor:default;}'
  + '.tc-wrap.is-carrying .tc-thing{box-shadow:0 0 0 2px rgba(20,107,94,.35);} .tc-wrap.is-carrying .tc-thing:hover{box-shadow:0 0 0 3px #146B5E;}'
  + '.tc-pic{position:absolute;display:block;pointer-events:none;} .tc-pic.is-down{transition:top .5s ease;}'
  + '.tc-laid .tc-knot{transform-box:fill-box;transform-origin:center;} .tc-laid.is-short .tc-knot{animation:tcWiggle .5s ease-in-out 2;} @keyframes tcWiggle{25%{transform:translate(0.08px,-0.12px);}75%{transform:translate(-0.08px,0.12px);}}'
  + '.tc-tag.is-pulse{animation:tcPulse .7s ease-in-out 3;transform-box:fill-box;transform-origin:center;} @keyframes tcPulse{50%{transform:scale(1.18);}}'
  + '.tc-reveal{animation:tcReveal .5s ease-out both;} @keyframes tcReveal{from{opacity:0;transform:translateY(-0.4px);}to{opacity:1;transform:none;}}'
  + '.tc-wrap.is-fast .tc-reveal,.tc-wrap.is-fast .tc-tag,.tc-wrap.is-fast .tc-knot,.tc-wrap.is-fast .tc-cat{animation:none !important;}'
  + '.tc-row{display:flex;flex-direction:column;align-items:center;gap:10px;} .tc-wrap.is-wide .tc-row{flex-direction:row;align-items:flex-end;gap:28px;} .tc-wrap.is-narrow .tc-row{gap:6px;}'
  + '.tc-tray{display:flex;align-items:flex-end;justify-content:center;gap:18px;} .tc-tilly{display:flex;align-items:flex-end;} .tc-cat{display:block;} .tc-tilly.is-hop .tc-cat{animation:tcHop .5s ease-out 1;} @keyframes tcHop{30%{transform:translateY(-12px);}60%{transform:none;}80%{transform:translateY(-4px);}}'
  + '.tc-basket{width:84px;height:60px;border:0;border-radius:14px;background:#F1E7D6;box-shadow:0 3px 0 #C9B79A;cursor:grab;padding:4px 6px;touch-action:none;} .tc-basket svg{width:100%;height:100%;display:block;} .tc-basket.is-on{background:#146B5E;box-shadow:0 3px 0 #0E4E44;} .tc-basket.is-away{opacity:.85;} .tc-basket:disabled{opacity:.5;cursor:default;} .tc-basket:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}'
  + '.tc-wrap.is-narrow .tc-basket{width:72px;height:52px;} .tc-wrap.is-narrow .tc-tray{gap:10px;align-items:center;} .tc-wrap.is-narrow .tc-check{min-width:96px;padding:0 12px;font-size:20px;} .tc-wrap.is-tiny .tc-check{font-size:18px;padding:0 10px;} .tc-wrap.is-tiny .tc-tray{gap:8px;} .tc-wrap.is-tiny .tc-basket{width:64px;} .tc-wrap.is-narrow .tc-slot{width:64px;} .tc-wrap.is-narrow .tc-slot.is-0{height:44px;} .tc-wrap.is-narrow .tc-slot.is-1{height:52px;} .tc-wrap.is-narrow .tc-slot.is-2{height:60px;} .tc-wrap.is-narrow .tc-swatch{width:48px;height:16px;} .tc-wrap.is-narrow{gap:6px;}'
  + '.tc-clipghost{position:fixed;z-index:60;width:28px;height:28px;border-radius:50%;background:#B8893A;box-shadow:0 0 0 3px #146B5E;pointer-events:none;}'
  + '.tc-rail{display:flex;align-items:flex-end;justify-content:center;gap:10px;} .tc-slot{position:relative;width:76px;border:0;border-radius:10px;background:#F4ECDD;box-shadow:inset 0 0 0 2px #E2D5BF;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding:6px 6px 8px;gap:6px;}'
  + '.tc-slot.is-0{height:48px;} .tc-slot.is-1{height:60px;} .tc-slot.is-2{height:72px;} .tc-peg{width:8px;height:8px;border-radius:50%;background:#B8893A;} .tc-slot.is-full{box-shadow:inset 0 0 0 3px #146B5E;} .tc-slot.is-right{box-shadow:inset 0 0 0 3px #F4CF62;} .tc-slot:disabled{cursor:default;}'
  + '.tc-swatch{display:block;width:56px;height:18px;border-radius:5px;} .tc-dragswatch{position:fixed;z-index:60;pointer-events:none;width:60px;height:22px;box-shadow:0 2px 6px rgba(0,0,0,.25);}'
  + '.tc-foot{display:flex;justify-content:center;} .tc-check{min-width:150px;min-height:54px;padding:0 26px;border:0;border-radius:16px;background:#1E8C78;color:#fff;font-family:' + H + ';font-weight:800;font-size:22px;cursor:pointer;box-shadow:0 4px 0 #0E5E50;} .tc-check:disabled{opacity:.5;cursor:default;}'
  + '.tc-note{margin:0;min-height:1.3em;max-width:560px;text-align:center;font-family:' + B + ';font-weight:800;font-size:19px;line-height:1.3;color:#146B5E;} .tc-note.is-hint{color:#8A3B1F;} .tc-wrap.is-narrow .tc-note{font-size:17px;}'
  + '.tc-wrap button:focus-visible{outline:3px solid #F4CF62;outline-offset:2px;}';
  var s = document.createElement('style'); s.id = 'tc-css'; s.textContent = css; document.head.appendChild(s);
}

if (typeof window !== 'undefined') window.TravelCordActivity = TravelCordActivity;
