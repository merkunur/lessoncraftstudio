/* =====================================================================
   drop-stands-activity.js — ACTIVITY #34 of the one-by-one rebuild:
   "Comparing Length" (K.MD.A.2) — THE DROP-DOWN STANDS.
   Design sheet: docs/activities-rebuild/designs/034-choice-board.md · law: LAW.md
   ---------------------------------------------------------------------
   THE INVENTION: direct comparison means lining up the starts, so the
   things stand on folding stands of different heights (or lie on rails a
   little way from a start wall) and their tops — or far ends — lie. Drag a
   thing down and its stand folds under it; drag it left and it slides to
   the wall. Check brings everything to ONE floor (or ONE wall) and a level
   beam comes to rest on the true tallest top / longest end; every shorter
   one shows its gap under the beam.

   ACTIVITY LAYER ONLY: the model is drop-stands-core.js; lcs-shell.js is
   untouched (its Check is hidden and pressed by this activity when the
   round is complete). Test seams: window.DropStandsActivity.st / ._order /
   ._pool / .FAST.
   ===================================================================== */
'use strict';

var DropStandsActivity = {
  id: 'drop-stands',
  apparatusClasses: ['ds-'],

  strings: {
    title:          {en:'The Drop-Down Stands',de:'Die Klapp-Podeste',fr:'Les socles pliants',es:'Las bases plegables',pt:'Os suportes dobráveis',it:'I piedistalli pieghevoli',nl:'De klapkrukjes',sv:'Fällpallarna',da:'Klapskamlerne',no:'Klappkrakkene',fi:'Taittojakkarat'},
    instruction:    {en:'Things on stands can trick you. Bring them down to the floor — or slide them to the wall — then choose.',de:'Dinge auf Podesten können täuschen. Bring sie auf denselben Boden – oder an dieselbe Wand – und wähle dann.',fr:'Sur des socles, les choses peuvent tromper. Ramène-les au même sol, ou contre le même mur, puis choisis.',es:'Las cosas sobre bases pueden engañarte. Bájalas al mismo piso, o llévalas a la misma pared, y luego elige.',pt:'Coisas em cima de suportes podem enganar. Traga tudo para o mesmo chão, ou encoste na mesma parede, e depois escolha.',it:'Le cose sui piedistalli possono ingannare. Portale sullo stesso pavimento, o contro lo stesso muro, poi scegli.',nl:'Dingen op krukjes kunnen je foppen. Zet ze op dezelfde vloer, of tegen dezelfde muur, en kies dan.',sv:'Saker på pallar kan lura dig. Ställ dem på samma golv, eller mot samma vägg, och välj sedan.',da:'Ting på skamler kan snyde. Sæt dem på samme gulv, eller mod samme væg, og vælg så.',no:'Ting på krakker kan lure deg. Sett dem på samme gulv, eller mot samme vegg, og velg så.',fi:'Jakkaroilla olevat asiat voivat hämätä. Tuo ne samalle lattialle tai saman seinän viereen ja valitse sitten.'},
    missFloor:      {en:'Down on the same floor, look where the beam rests.',de:'Alle auf demselben Boden: Schau, wo der Balken liegt.',fr:'Toutes sur le même sol : regarde où la barre se pose.',es:'Todas en el mismo piso: mira dónde se apoya la barra.',pt:'Todas no mesmo chão: veja onde a barra se apoia.',it:'Tutte sullo stesso pavimento: guarda dove si appoggia la barra.',nl:'Allemaal op dezelfde vloer: kijk waar de balk op ligt.',sv:'Alla på samma golv: titta var bjälken vilar.',da:'Alle på samme gulv: se, hvor bjælken hviler.',no:'Alle på samme gulv: se hvor bjelken hviler.',fi:'Kaikki samalla lattialla: katso, mihin palkki asettuu.'},
    missWall:       {en:'Pushed to the same wall, look where the beam stops.',de:'Alle an derselben Wand: Schau, wo der Balken stoppt.',fr:'Toutes contre le même mur : regarde où la barre s’arrête.',es:'Todas contra la misma pared: mira dónde se detiene la barra.',pt:'Todas encostadas na mesma parede: veja onde a barra para.',it:'Tutte contro lo stesso muro: guarda dove si ferma la barra.',nl:'Allemaal tegen dezelfde muur: kijk waar de balk stopt.',sv:'Alla mot samma vägg: titta var bjälken stannar.',da:'Alle mod samme væg: se, hvor bjælken standser.',no:'Alle mot samme vegg: se hvor bjelken stopper.',fi:'Kaikki samaa seinää vasten: katso, mihin palkki pysähtyy.'},
    haloReach:      {en:'This one reaches the beam.',de:'Dieses reicht bis zum Balken.',fr:'Celle-ci touche la barre.',es:'Esta llega a la barra.',pt:'Esta encosta na barra.',it:'Questa tocca la barra.',nl:'Dit plaatje raakt de balk.',sv:'Den här når upp till bjälken.',da:'Det her når op til bjælken.',no:'Dette når opp til bjelken.',fi:'Tämä ylettyy palkkiin asti.'},
    haloFar:        {en:'This one is farthest from the beam.',de:'Dieses ist am weitesten vom Balken weg.',fr:'Celle-ci est la plus loin de la barre.',es:'Esta es la que queda más lejos de la barra.',pt:'Esta é a que fica mais longe da barra.',it:'Questa è la più lontana dalla barra.',nl:'Dit plaatje is het verst van de balk.',sv:'Den här är längst bort från bjälken.',da:'Det her er længst fra bjælken.',no:'Dette er lengst unna bjelken.',fi:'Tämä on kauimpana palkista.'},
    setCompare:     {en:'Compare',de:'Vergleichen',fr:'Comparer',es:'Comparar',pt:'Comparar',it:'Confronta',nl:'Vergelijken',sv:'Jämför',da:'Sammenlign',no:'Sammenlign',fi:'Vertaa'},
    cTwo:           {en:'Two things',de:'Zwei Dinge',fr:'Deux choses',es:'Dos cosas',pt:'Duas coisas',it:'Due cose',nl:'Twee dingen',sv:'Två saker',da:'To ting',no:'To ting',fi:'Kaksi asiaa'},
    cRow:           {en:'A whole row',de:'Eine ganze Reihe',fr:'Toute une rangée',es:'Una fila completa',pt:'Uma fileira inteira',it:'Una fila intera',nl:'Een hele rij',sv:'En hel rad',da:'En hel række',no:'En hel rad',fi:'Koko rivi'},
    setStart:       {en:'Start',de:'Start',fr:'Départ',es:'Inicio',pt:'Começo',it:'Partenza',nl:'Begin',sv:'Start',da:'Start',no:'Start',fi:'Alku'},
    sStands:        {en:'On stands',de:'Auf Podesten',fr:'Sur les socles',es:'En las bases',pt:'Nos suportes',it:'Sui piedistalli',nl:'Op krukjes',sv:'På pallar',da:'På skamler',no:'På krakker',fi:'Jakkaroilla'},
    sFloor:         {en:'On the floor',de:'Auf dem Boden',fr:'Par terre',es:'En el piso',pt:'No chão',it:'Sul pavimento',nl:'Op de vloer',sv:'På golvet',da:'På gulvet',no:'På gulvet',fi:'Lattialla'},
    ariaStandUp:    {en:'Stand, up',de:'Podest, aufgeklappt',fr:'Socle, déplié',es:'Base, arriba',pt:'Suporte, aberto',it:'Piedistallo, alzato',nl:'Krukje, uitgeklapt',sv:'Pall, uppfälld',da:'Skammel, oppe',no:'Krakk, oppe',fi:'Jakkara, auki'},
    ariaStandFolded:{en:'Stand, folded',de:'Podest, zusammengeklappt',fr:'Socle, plié',es:'Base, plegada',pt:'Suporte, dobrado',it:'Piedistallo, piegato',nl:'Krukje, ingeklapt',sv:'Pall, hopfälld',da:'Skammel, klappet sammen',no:'Krakk, slått sammen',fi:'Jakkara, taitettu'},
    ariaWall:       {en:'Start wall',de:'Startwand',fr:'Mur de départ',es:'Pared de inicio',pt:'Parede de início',it:'Muro di partenza',nl:'Beginmuur',sv:'Startvägg',da:'Startvæg',no:'Startvegg',fi:'Lähtöseinä'},
    ariaBeam:       {en:'Level beam',de:'Messbalken',fr:'Barre de niveau',es:'Barra de nivel',pt:'Barra de nível',it:'Barra di livello',nl:'Meetbalk',sv:'Mätbjälke',da:'Målebjælke',no:'Målebjelke',fi:'Mittapalkki'},
    ariaPic:        {en:'Picture {n}',de:'Bild {n}',fr:'Image {n}',es:'Imagen {n}',pt:'Imagem {n}',it:'Immagine {n}',nl:'Plaatje {n}',sv:'Bild {n}',da:'Billede {n}',no:'Bilde {n}',fi:'Kuva {n}'},
    ariaAllFloor:   {en:'All on the floor',de:'Alle auf dem Boden',fr:'Toutes par terre',es:'Todas en el piso',pt:'Todas no chão',it:'Tutte sul pavimento',nl:'Allemaal op de vloer',sv:'Alla på golvet',da:'Alle på gulvet',no:'Alle på gulvet',fi:'Kaikki lattialla'},
    ariaAllWall:    {en:'All at the wall',de:'Alle an der Wand',fr:'Toutes contre le mur',es:'Todas contra la pared',pt:'Todas encostadas na parede',it:'Tutte contro il muro',nl:'Allemaal tegen de muur',sv:'Alla mot väggen',da:'Alle mod væggen',no:'Alle mot veggen',fi:'Kaikki seinää vasten'},
    ariaBeamOn:     {en:'The beam rests on picture {n}',de:'Der Balken liegt auf Bild {n}',fr:'La barre se pose sur l’image {n}',es:'La barra se apoya en la imagen {n}',pt:'A barra se apoia na imagem {n}',it:'La barra si appoggia sull’immagine {n}',nl:'De balk ligt op plaatje {n}',sv:'Bjälken vilar på bild {n}',da:'Bjælken hviler på billede {n}',no:'Bjelken hviler på bilde {n}',fi:'Palkki on kuvan {n} kohdalla'},
    pTaller:        {en:'Which one is taller?',de:'Welches Bild ist größer?',fr:'Quelle image est la plus haute quand elles sont toutes par terre ?',es:'¿Qué imagen es más alta?',pt:'Qual imagem é mais alta?',it:'Quale immagine è più alta?',nl:'Welk plaatje is hoger als alles op de vloer staat?',sv:'Vilken bild är högre när alla står på golvet?',da:'Hvilket billede er højere, når alle står på gulvet?',no:'Hvilket bilde er høyere når alle står på gulvet?',fi:'Kumpi kuva on korkeampi?'},
    tapTaller:      {en:'Tap the one you think is taller.',de:'Tippe zuerst auf ein Bild: Welches ist größer?',fr:'Touche d’abord l’image qui te semble la plus haute.',es:'Primero toca la imagen que crees que es más alta.',pt:'Primeiro toque na imagem que você acha que é mais alta.',it:'Prima tocca l’immagine che secondo te è più alta.',nl:'Tik eerst op het plaatje dat volgens jou hoger is.',sv:'Tryck först på den bild som du tror är högre.',da:'Tryk først på det billede, du tror er højere.',no:'Trykk først på det bildet du tror er høyere.',fi:'Napauta ensin kuvaa, joka on mielestäsi korkeampi.'},
    okTaller:       {en:'Yes — on the same floor, this one is taller!',de:'Ja – auf demselben Boden ist dieses größer!',fr:'Oui, sur le même sol, celle-ci est la plus haute !',es:'¡Sí! En el mismo piso, esta es más alta.',pt:'Isso! No mesmo chão, esta é mais alta!',it:'Sì! Sullo stesso pavimento, questa è più alta!',nl:'Ja! Op dezelfde vloer is dit plaatje hoger!',sv:'Ja – på samma golv är den här högre!',da:'Ja – på samme gulv er det her højere!',no:'Ja – på samme gulv er dette høyere!',fi:'Kyllä – samalla lattialla tämä on korkeampi!'},
    pLonger:        {en:'Which one is longer?',de:'Welches Bild ist länger?',fr:'Quelle image est la plus longue ?',es:'¿Qué imagen es más larga?',pt:'Qual imagem é mais comprida?',it:'Quale immagine è più lunga?',nl:'Welk plaatje is langer?',sv:'Vilken bild är längre?',da:'Hvilket billede er længere?',no:'Hvilket bilde er lengre?',fi:'Kumpi kuva on pidempi?'},
    tapLonger:      {en:'Tap the one you think is longer.',de:'Tippe zuerst auf ein Bild: Welches ist länger?',fr:'Touche d’abord l’image qui te semble la plus longue.',es:'Primero toca la imagen que crees que es más larga.',pt:'Primeiro toque na imagem que você acha que é mais comprida.',it:'Prima tocca l’immagine che secondo te è più lunga.',nl:'Tik eerst op het plaatje dat volgens jou langer is.',sv:'Tryck först på den bild som du tror är längre.',da:'Tryk først på det billede, du tror er længere.',no:'Trykk først på det bildet du tror er lengre.',fi:'Napauta ensin kuvaa, joka on mielestäsi pidempi.'},
    okLonger:       {en:'Yes — from the same wall, this one is longer!',de:'Ja – an derselben Wand ist dieses länger!',fr:'Oui, contre le même mur, celle-ci est la plus longue !',es:'¡Sí! Desde la misma pared, esta es más larga.',pt:'Isso! Encostada na mesma parede, esta é mais comprida!',it:'Sì! Contro lo stesso muro, questa è più lunga!',nl:'Ja! Tegen dezelfde muur is dit plaatje langer!',sv:'Ja – mot samma vägg är den här längre!',da:'Ja – mod samme væg er det her længere!',no:'Ja – mot samme vegg er dette lengre!',fi:'Kyllä – samaa seinää vasten tämä on pidempi!'},
    pShorterH:      {en:'Which one is shorter?',de:'Welches Bild ist kleiner?',fr:'Quelle image est la moins haute quand elles sont toutes par terre ?',es:'¿Qué imagen es más baja?',pt:'Qual imagem é mais baixa?',it:'Quale immagine è più bassa?',nl:'Welk plaatje is lager als alles op de vloer staat?',sv:'Vilken bild är lägre när alla står på golvet?',da:'Hvilket billede er lavere, når alle står på gulvet?',no:'Hvilket bilde er lavere når alle står på gulvet?',fi:'Kumpi kuva on matalampi?'},
    tapShorterH:    {en:'Tap the one you think is shorter.',de:'Tippe zuerst auf ein Bild: Welches ist kleiner?',fr:'Touche d’abord l’image qui te semble la moins haute.',es:'Primero toca la imagen que crees que es más baja.',pt:'Primeiro toque na imagem que você acha que é mais baixa.',it:'Prima tocca l’immagine che secondo te è più bassa.',nl:'Tik eerst op het plaatje dat volgens jou lager is.',sv:'Tryck först på den bild som du tror är lägre.',da:'Tryk først på det billede, du tror er lavere.',no:'Trykk først på det bildet du tror er lavere.',fi:'Napauta ensin kuvaa, joka on mielestäsi matalampi.'},
    okShorterH:     {en:'Yes — on the same floor, this one is shorter!',de:'Ja – auf demselben Boden ist dieses kleiner!',fr:'Oui, sur le même sol, celle-ci est la moins haute !',es:'¡Sí! En el mismo piso, esta es más baja.',pt:'Isso! No mesmo chão, esta é mais baixa!',it:'Sì! Sullo stesso pavimento, questa è più bassa!',nl:'Ja! Op dezelfde vloer is dit plaatje lager!',sv:'Ja – på samma golv är den här lägre!',da:'Ja – på samme gulv er det her lavere!',no:'Ja – på samme gulv er dette lavere!',fi:'Kyllä – samalla lattialla tämä on matalampi!'},
    pShorterL:      {en:'Which one is shorter?',de:'Welches Bild ist kürzer?',fr:'Quelle image est la plus courte ?',es:'¿Qué imagen es más corta?',pt:'Qual imagem é mais curta?',it:'Quale immagine è più corta?',nl:'Welk plaatje is korter?',sv:'Vilken bild är kortare?',da:'Hvilket billede er kortere?',no:'Hvilket bilde er kortere?',fi:'Kumpi kuva on lyhyempi?'},
    tapShorterL:    {en:'Tap the one you think is shorter.',de:'Tippe zuerst auf ein Bild: Welches ist kürzer?',fr:'Touche d’abord l’image qui te semble la plus courte.',es:'Primero toca la imagen que crees que es más corta.',pt:'Primeiro toque na imagem que você acha que é mais curta.',it:'Prima tocca l’immagine che secondo te è più corta.',nl:'Tik eerst op het plaatje dat volgens jou korter is.',sv:'Tryck först på den bild som du tror är kortare.',da:'Tryk først på det billede, du tror er kortere.',no:'Trykk først på det bildet du tror er kortere.',fi:'Napauta ensin kuvaa, joka on mielestäsi lyhyempi.'},
    okShorterL:     {en:'Yes — from the same wall, this one is shorter!',de:'Ja – an derselben Wand ist dieses kürzer!',fr:'Oui, contre le même mur, celle-ci est la plus courte !',es:'¡Sí! Desde la misma pared, esta es más corta.',pt:'Isso! Encostada na mesma parede, esta é mais curta!',it:'Sì! Contro lo stesso muro, questa è più corta!',nl:'Ja! Tegen dezelfde muur is dit plaatje korter!',sv:'Ja – mot samma vägg är den här kortare!',da:'Ja – mod samme væg er det her kortere!',no:'Ja – mot samme vegg er dette kortere!',fi:'Kyllä – samaa seinää vasten tämä on lyhyempi!'},
    pTallest:       {en:'Which one is the tallest?',de:'Welches Bild ist am größten?',fr:'Quelle image est la plus haute quand elles sont toutes par terre ?',es:'¿Qué imagen es la más alta?',pt:'Qual imagem é a mais alta?',it:'Quale immagine è la più alta?',nl:'Welk plaatje is het hoogst als alles op de vloer staat?',sv:'Vilken bild är högst när alla står på golvet?',da:'Hvilket billede er højest, når alle står på gulvet?',no:'Hvilket bilde er høyest når alle står på gulvet?',fi:'Mikä kuva on korkein?'},
    tapTallest:     {en:'Tap the one you think is the tallest.',de:'Tippe zuerst auf ein Bild: Welches ist am größten?',fr:'Touche d’abord l’image qui te semble la plus haute.',es:'Primero toca la imagen que crees que es la más alta.',pt:'Primeiro toque na imagem que você acha que é a mais alta.',it:'Prima tocca l’immagine che secondo te è la più alta.',nl:'Tik eerst op het plaatje dat volgens jou het hoogst is.',sv:'Tryck först på den bild som du tror är högst.',da:'Tryk først på det billede, du tror er højest.',no:'Trykk først på det bildet du tror er høyest.',fi:'Napauta ensin kuvaa, joka on mielestäsi korkein.'},
    okTallest:      {en:'Yes — this one is the tallest!',de:'Ja – dieses ist am größten!',fr:'Oui, celle-ci est la plus haute !',es:'¡Sí! Esta es la más alta.',pt:'Isso! Esta é a mais alta!',it:'Sì! Questa è la più alta!',nl:'Ja! Dit plaatje is het hoogst!',sv:'Ja – den här är högst!',da:'Ja – det her er højest!',no:'Ja – dette er høyest!',fi:'Kyllä – tämä on korkein!'},
    pLongest:       {en:'Which one is the longest?',de:'Welches Bild ist am längsten?',fr:'Quelle image est la plus longue ?',es:'¿Qué imagen es la más larga?',pt:'Qual imagem é a mais comprida?',it:'Quale immagine è la più lunga?',nl:'Welk plaatje is het langst?',sv:'Vilken bild är längst?',da:'Hvilket billede er længst?',no:'Hvilket bilde er lengst?',fi:'Mikä kuva on pisin?'},
    tapLongest:     {en:'Tap the one you think is the longest.',de:'Tippe zuerst auf ein Bild: Welches ist am längsten?',fr:'Touche d’abord l’image qui te semble la plus longue.',es:'Primero toca la imagen que crees que es la más larga.',pt:'Primeiro toque na imagem que você acha que é a mais comprida.',it:'Prima tocca l’immagine che secondo te è la più lunga.',nl:'Tik eerst op het plaatje dat volgens jou het langst is.',sv:'Tryck först på den bild som du tror är längst.',da:'Tryk først på det billede, du tror er længst.',no:'Trykk først på det bildet du tror er lengst.',fi:'Napauta ensin kuvaa, joka on mielestäsi pisin.'},
    okLongest:      {en:'Yes — this one is the longest!',de:'Ja – dieses ist am längsten!',fr:'Oui, celle-ci est la plus longue !',es:'¡Sí! Esta es la más larga.',pt:'Isso! Esta é a mais comprida!',it:'Sì! Questa è la più lunga!',nl:'Ja! Dit plaatje is het langst!',sv:'Ja – den här är längst!',da:'Ja – det her er længst!',no:'Ja – dette er lengst!',fi:'Kyllä – tämä on pisin!'},
    pShortestH:     {en:'Which one is the shortest?',de:'Welches Bild ist am kleinsten?',fr:'Quelle image est la moins haute quand elles sont toutes par terre ?',es:'¿Qué imagen es la más baja?',pt:'Qual imagem é a mais baixa?',it:'Quale immagine è la più bassa?',nl:'Welk plaatje is het laagst als alles op de vloer staat?',sv:'Vilken bild är lägst när alla står på golvet?',da:'Hvilket billede er lavest, når alle står på gulvet?',no:'Hvilket bilde er lavest når alle står på gulvet?',fi:'Mikä kuva on matalin?'},
    tapShortestH:   {en:'Tap the one you think is the shortest.',de:'Tippe zuerst auf ein Bild: Welches ist am kleinsten?',fr:'Touche d’abord l’image qui te semble la moins haute.',es:'Primero toca la imagen que crees que es la más baja.',pt:'Primeiro toque na imagem que você acha que é a mais baixa.',it:'Prima tocca l’immagine che secondo te è la più bassa.',nl:'Tik eerst op het plaatje dat volgens jou het laagst is.',sv:'Tryck först på den bild som du tror är lägst.',da:'Tryk først på det billede, du tror er lavest.',no:'Trykk først på det bildet du tror er lavest.',fi:'Napauta ensin kuvaa, joka on mielestäsi matalin.'},
    okShortestH:    {en:'Yes — this one is the shortest!',de:'Ja – dieses ist am kleinsten!',fr:'Oui, celle-ci est la moins haute !',es:'¡Sí! Esta es la más baja.',pt:'Isso! Esta é a mais baixa!',it:'Sì! Questa è la più bassa!',nl:'Ja! Dit plaatje is het laagst!',sv:'Ja – den här är lägst!',da:'Ja – det her er lavest!',no:'Ja – dette er lavest!',fi:'Kyllä – tämä on matalin!'},
    pShortestL:     {en:'Which one is the shortest?',de:'Welches Bild ist am kürzesten?',fr:'Quelle image est la plus courte ?',es:'¿Qué imagen es la más corta?',pt:'Qual imagem é a mais curta?',it:'Quale immagine è la più corta?',nl:'Welk plaatje is het kortst?',sv:'Vilken bild är kortast?',da:'Hvilket billede er kortest?',no:'Hvilket bilde er kortest?',fi:'Mikä kuva on lyhyin?'},
    tapShortestL:   {en:'Tap the one you think is the shortest.',de:'Tippe zuerst auf ein Bild: Welches ist am kürzesten?',fr:'Touche d’abord l’image qui te semble la plus courte.',es:'Primero toca la imagen que crees que es la más corta.',pt:'Primeiro toque na imagem que você acha que é a mais curta.',it:'Prima tocca l’immagine che secondo te è la più corta.',nl:'Tik eerst op het plaatje dat volgens jou het kortst is.',sv:'Tryck först på den bild som du tror är kortast.',da:'Tryk først på det billede, du tror er kortest.',no:'Trykk først på det bildet du tror er kortest.',fi:'Napauta ensin kuvaa, joka on mielestäsi lyhyin.'},
    okShortestL:    {en:'Yes — this one is the shortest!',de:'Ja – dieses ist am kürzesten!',fr:'Oui, celle-ci est la plus courte !',es:'¡Sí! Esta es la más corta.',pt:'Isso! Esta é a mais curta!',it:'Sì! Questa è la più corta!',nl:'Ja! Dit plaatje is het kortst!',sv:'Ja – den här är kortast!',da:'Ja – det her er kortest!',no:'Ja – dette er kortest!',fi:'Kyllä – tämä on lyhyin!'},
    pBiggest:       {en:'Which one is the biggest?',de:'Welches Bild ist am größten?',fr:'Quelle image est la plus grande ?',es:'¿Qué imagen es la más grande?',pt:'Qual imagem é a maior?',it:'Quale immagine è la più grande?',nl:'Welk plaatje is het grootst?',sv:'Vilken bild är störst?',da:'Hvilket billede er størst?',no:'Hvilket bilde er størst?',fi:'Mikä kuva on suurin?'},
    tapBiggest:     {en:'Tap the one you think is the biggest.',de:'Tippe zuerst auf ein Bild: Welches ist am größten?',fr:'Touche d’abord l’image qui te semble la plus grande.',es:'Primero toca la imagen que crees que es la más grande.',pt:'Primeiro toque na imagem que você acha que é a maior.',it:'Prima tocca l’immagine che secondo te è la più grande.',nl:'Tik eerst op het plaatje dat volgens jou het grootst is.',sv:'Tryck först på den bild som du tror är störst.',da:'Tryk først på det billede, du tror er størst.',no:'Trykk først på det bildet du tror er størst.',fi:'Napauta ensin kuvaa, joka on mielestäsi suurin.'},
    okBiggest:      {en:'Yes — this one is the biggest!',de:'Ja – dieses ist am größten!',fr:'Oui, celle-ci est la plus grande !',es:'¡Sí! Esta es la más grande.',pt:'Isso! Esta é a maior!',it:'Sì! Questa è la più grande!',nl:'Ja! Dit plaatje is het grootst!',sv:'Ja – den här är störst!',da:'Ja – det her er størst!',no:'Ja – dette er størst!',fi:'Kyllä – tämä on suurin!'},
    check:          {en:'Check',de:'Prüfen',fr:'Vérifier',es:'Revisar',pt:'Conferir',it:'Controlla',nl:'Controleren',sv:'Kontrollera',da:'Tjek',no:'Sjekk',fi:'Tarkista'}
  },
  defaults: { compare: 'two', start: 'stands' },
  settings: [
    { key: 'compare', type: 'choice', labelKey: 'setCompare', options: [{ value: 'two', labelKey: 'cTwo' }, { value: 'row', labelKey: 'cRow' }] },
    { key: 'start', type: 'choice', labelKey: 'setStart', options: [{ value: 'stands', labelKey: 'sStands' }, { value: 'floor', labelKey: 'sFloor' }] }
  ],

  OK_MS: 500, FAST: false,

  init: function (api) {
    this.api = api;
    this.st = null; this._round = null;
    this._pool = null; this._poolKey = null; this._order = null; this._curPass = 0;
    this._timers = []; this._ro = null; this._busy = false; this._beamIn = false; this._hop = -1;
    injectDropStandsCSS();
  },
  destroy: function () {
    this._clearTimers();
    if (this._ro) { try { this._ro.disconnect(); } catch (e) {} this._ro = null; }
  },
  onSettings: function () {
    var key = this._key();
    if (this._poolKey !== key) { this._pool = null; this._order = null; if (window.LCS_reloadFirstTask) window.LCS_reloadFirstTask(); }
    else if (this._wrap) this._render2();
  },
  _later: function (fn, ms) { var self = this, id = setTimeout(function () { self._timers = self._timers.filter(function (x) { return x !== id; }); fn(); }, ms); this._timers.push(id); },
  _clearTimers: function () { for (var i = 0; i < this._timers.length; i++) clearTimeout(this._timers[i]); this._timers = []; },
  _ms: function (ms) { return this.FAST ? 0 : ms; },
  _t: function (k, a) { var s = this.api && this.api.t ? this.api.t(k) : k; return a ? String(s).replace(/\{(\w+)\}/g, function (m, x) { return x in a ? a[x] : m; }) : s; },

  /* ---------------- rounds ---------------- */
  _set: function (k) { return this.api && this.api.settings ? this.api.settings[k] : null; },
  _key: function () { return DropStandsCore.compare(this._set('compare')) + '.' + DropStandsCore.start(this._set('start')); },
  _ensurePool: function () { var key = this._key(); if (!this._pool || this._poolKey !== key) { this._pool = DropStandsCore.rounds(key.split('.')[0]); this._poolKey = key; this._order = null; } return this._pool; },
  nextTask: function (opts) {
    var pool = this._ensurePool(), n = pool.length, C = DropStandsCore, start = this._key().split('.')[1];
    var index = (opts && opts.index) || 0, pass = Math.floor(index / n);
    if (!this._order || this._order.length !== n) { this._curPass = pass; this._order = C.order(pool, Math.random, null, pass); }
    if (pass > this._curPass) { this._curPass = pass; this._order = C.order(pool, Math.random, this._order, pass); }
    var r = pool[this._order[index % n]], mirror = this._curPass % 2 === 1;
    return {
      id: 'drop-stands.' + r.id + (mirror ? '.m' : '') + '.' + start,
      promptKey: 'p' + C.cap(r.q),
      celebrateKey: 'ok' + C.cap(r.q),
      answerType: 'state',
      setup: function (tool) {
        tool._clearTimers(); tool._round = r; tool._busy = false; tool._beamIn = false; tool._hop = -1; tool._afterOk = false;
        tool.st = C.newState(r, { mirror: mirror, start: start });
      },
      check: function (tool) { return !!(tool.st && tool.st.done); }
    };
  },

  /* ---------------- render ---------------- */
  render: function () {
    if (!this.api) return;
    if (!this.st) { var r0 = DropStandsCore.rounds('two')[0]; this._round = r0; this.st = DropStandsCore.newState(r0); }
    this._render2();
    this._watchWidth();
  },
  _render2: function () {
    var api = this.api, self = this, st = this.st, C = DropStandsCore;
    api.stage.innerHTML = '';
    var L = this._L = C.layout(this._width());
    var wrap = api.el('div', 'ds-wrap ' + (L.mode === 'wide' ? 'is-wide' : 'is-narrow') + (st.mode === 'length' ? ' is-length' : ' is-height')); this._wrap = wrap;
    var stage = api.el('div', 'ds-stage'); this._stage = stage;
    wrap.appendChild(stage);
    var note = api.el('div', 'ds-note'); note.setAttribute('aria-live', 'polite'); this._note = note; wrap.appendChild(note);
    var row = api.el('div', 'ds-actions');
    var chk = api.el('button', 'ds-check'); chk.type = 'button'; chk.textContent = this._t('check'); chk.addEventListener('click', function () { self._check(); }); this._checkBtn = chk; row.appendChild(chk);
    wrap.appendChild(row);
    api.stage.appendChild(wrap);
    this._build();
    this._paint();
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
    this._ro = new ResizeObserver(function () {
      var w = self._width();
      if (Math.abs(w - last) < 8 || !self._wrap || !self._wrap.isConnected) return;
      last = w; self._render2();
    });
    this._ro.observe(this.api.stage);
  },
  _pic: function (noun) { var o = DropStandsCore.OBJ[noun]; return '/image-library-webp/themes/' + encodeURIComponent(o.dir) + '/' + noun + '@2x.webp'; },

  /* the stage: the floor (or the rails and the wall), a column/rail button per thing, its stand, its picture */
  _build: function () {
    var api = this.api, self = this, st = this.st, C = DropStandsCore, L = this._L, stage = this._stage, n = st.items.length;
    var H = this._H = Math.round(C.stageH(st, L)); stage.style.height = H + 'px';
    this._cols = []; this._stands = []; this._pics = []; this._gaps = []; this._rings = [];
    var o = C.OBJ[st.noun];
    if (st.mode === 'height') {
      var floor = api.el('div', 'ds-floor'); stage.appendChild(floor);
    } else {
      var wall = api.el('div', 'ds-wall'); wall.setAttribute('role', 'img'); wall.setAttribute('aria-label', this._t('ariaWall')); stage.appendChild(wall); this._wallEl = wall;
    }
    for (var i = 0; i < n; i++) {
      (function (i) {
        var col = api.el('button', 'ds-col'); col.type = 'button';
        col.setAttribute('aria-label', self._t('ariaPic', { n: i + 1 }));
        self._bindCol(col, i); stage.appendChild(col); self._cols.push(col);
        if (st.mode === 'height' && !st.flat) {
          var sd = api.el('div', 'ds-stand'); sd.setAttribute('aria-hidden', 'true');
          sd.innerHTML = '<svg class="ds-stand-svg" preserveAspectRatio="none" viewBox="0 0 100 100"><rect class="ds-plate" x="0" y="0" width="100" height="10" rx="2"/><path class="ds-leg" d="M14 10 L34 100 M86 10 L66 100 M24 55 L76 55"/></svg>';
          stage.appendChild(sd); self._stands.push(sd);
        } else self._stands.push(null);
        var pic;
        if (o.shape) { pic = api.el('div', 'ds-shape ds-' + o.shape); }
        else { pic = document.createElement('img'); pic.className = 'ds-img'; pic.alt = ''; pic.draggable = false; pic.src = self._pic(st.noun); }
        stage.appendChild(pic); self._pics.push(pic);
        var gap = api.el('div', 'ds-gap'); stage.appendChild(gap); self._gaps.push(gap);
        var ring = api.el('div', 'ds-ring'); stage.appendChild(ring); self._rings.push(ring);
      })(i);
    }
    var beam = api.el('div', 'ds-beam'); beam.setAttribute('role', 'img'); beam.setAttribute('aria-label', this._t('ariaBeam')); stage.appendChild(beam); this._beam = beam;
  },
  /* geometry of item i at this moment (px in the stage) */
  _geo: function (i) {
    var C = DropStandsCore, st = this.st, L = this._L, o = C.OBJ[st.noun], it = st.items[i], n = st.items.length;
    var k = C.inkScale(st, L) * it.size, W = L.W, H = this._H;
    if (st.mode === 'height') {
      var cw = n === 2 ? L.col2 : L.colR, cx = W / 2 + (i - (n - 1) / 2) * cw, floorY = H - 6 * L.k;
      var lift = C.liftOf(it) * L.standK, bottom = floorY - lift;
      var iw = (o.box[2] - o.box[0]) * k, ih = (o.box[3] - o.box[1]) * k;
      return { mode: 'height', cx: cx, cw: cw, floorY: floorY, standH: it.lift * L.standK, lift: lift, ink: { l: cx - iw / 2, r: cx + iw / 2, t: bottom - ih, b: bottom }, k: k };
    }
    var t = 0; st.items.forEach(function (_, j) { t = Math.max(t, C.thick(st, L, j)); });
    var band = t + 18 * L.k, x0 = (W - L.rail) / 2, railY = 6 * L.k + i * band + band - 8 * L.k;
    var off = C.liftOf(it) * L.offK, iw2 = (o.box[2] - o.box[0]) * k, ih2 = (o.box[3] - o.box[1]) * k, left = x0 + L.wallW + off;
    return { mode: 'length', x0: x0, railY: railY, band: band, bandTop: 6 * L.k + i * band, ink: { l: left, r: left + iw2, t: railY - ih2, b: railY }, k: k };
  },
  _paint: function () {
    if (!this._stage) return;
    var C = DropStandsCore, st = this.st, L = this._L, self = this, o = C.OBJ[st.noun], n = st.items.length, H = this._H;
    var rv = st.revealed ? C.reveal(st, L) : null, g = C.glow(st);
    if (st.mode === 'length') { var g0 = this._geo(0); this._wallEl.style.cssText = 'left:' + g0.x0 + 'px;top:0;width:' + L.wallW + 'px;height:' + (H - 4 * L.k) + 'px;'; }
    for (var i = 0; i < n; i++) {
      var G = this._geo(i), it = st.items[i], col = this._cols[i], pic = this._pics[i], ink = G.ink;
      if (G.mode === 'height') {
        col.style.cssText = 'left:' + (G.cx - G.cw / 2 + 2) + 'px;top:0;width:' + (G.cw - 4) + 'px;height:' + G.floorY + 'px;';
        col.setAttribute('aria-label', this._t('ariaPic', { n: i + 1 }) + (it.lift && !st.flat ? ', ' + this._t(it.down ? 'ariaStandFolded' : 'ariaStandUp') : ''));
        var sd = this._stands[i];
        if (sd) {
          var pw = Math.min(L.plate, G.cw - 12), sh = it.down ? 4 * L.k : G.standH;
          sd.style.cssText = 'left:' + (G.cx - pw / 2) + 'px;width:' + pw + 'px;top:' + (G.floorY - sh + (it.down ? 2 * L.k : 0)) + 'px;height:' + sh + 'px;';
          sd.classList.toggle('is-down', it.down); sd.hidden = !it.lift;
        }
      } else {
        col.style.cssText = 'left:' + G.x0 + 'px;top:' + G.bandTop + 'px;width:' + L.rail + 'px;height:' + G.band + 'px;';
      }
      /* the picture, placed by its ink box */
      if (o.shape) pic.style.cssText = 'left:' + ink.l + 'px;top:' + ink.t + 'px;width:' + (ink.r - ink.l) + 'px;height:' + (ink.b - ink.t) + 'px;';
      else {
        var S = 256 * G.k, ccx = ink.l - o.box[0] * G.k, ccy = ink.b - o.box[3] * G.k;
        pic.style.cssText = 'width:' + S.toFixed(1) + 'px;height:' + S.toFixed(1) + 'px;left:' + (ccx - S / 2).toFixed(1) + 'px;top:' + (ccy - S / 2).toFixed(1) + 'px;transform:rotate(' + o.rot + 'deg);';
      }
      pic.classList.toggle('is-hop', this._hop === i);
      /* the chosen ring, the halo */
      var ring = this._rings[i], pad = 6 * L.k + 3;
      ring.style.cssText = 'left:' + (ink.l - pad) + 'px;top:' + (ink.t - pad) + 'px;width:' + (ink.r - ink.l + 2 * pad) + 'px;height:' + (ink.b - ink.t + 2 * pad) + 'px;';
      ring.className = 'ds-ring' + (st.choice === i ? (st.done ? ' is-gold' : ' is-on') : '') + (g === i ? ' is-halo' : '');
      /* the gap under the beam */
      var gap = this._gaps[i], gp = rv && this._beamIn ? rv.gaps[i] : 0;
      if (gp > 1) {
        if (G.mode === 'height') gap.style.cssText = 'display:block;left:' + ((ink.l + ink.r) / 2 - 5 * L.k) + 'px;width:' + (10 * L.k) + 'px;top:' + (ink.t - gp) + 'px;height:' + gp + 'px;';
        else gap.style.cssText = 'display:block;top:' + ((ink.t + ink.b) / 2 - 5 * L.k) + 'px;height:' + (10 * L.k) + 'px;left:' + ink.r + 'px;width:' + gp + 'px;';
      } else gap.style.cssText = 'display:none;';
      gap.classList.toggle('is-pulse', !!(st.last && st.last.result === 'wrong' && st.last.i === i && !st.done));
    }
    /* the beam: parked off-stage, then resting on the true extreme */
    var beam = this._beam, Gb = this._geo(0);
    if (st.mode === 'height') {
      var bl = this._geo(0).cx - (n === 2 ? L.col2 : L.colR) / 2, bw = (n === 2 ? L.col2 : L.colR) * n;
      var by = rv && this._beamIn ? Gb.floorY - rv.beam - 12 * L.k : -20 * L.k;
      beam.style.cssText = 'left:' + bl + 'px;width:' + bw + 'px;height:' + (12 * L.k) + 'px;top:' + by + 'px;opacity:' + (rv && this._beamIn ? 1 : 0) + ';';
    } else {
      var bx = rv && this._beamIn ? Gb.x0 + L.wallW + rv.beam : L.W + 10;
      beam.style.cssText = 'top:0;height:' + (H - 4 * L.k) + 'px;width:' + (12 * L.k) + 'px;left:' + bx + 'px;opacity:' + (rv && this._beamIn ? 1 : 0) + ';';
    }
    /* the words */
    var h = C.hint(st), msg = '';
    if (st.done) msg = this._afterOk ? '' : this._t('ok' + C.cap(st.q));   /* the shell's bubble carries the win line once Check fires */
    else if (h) msg = this._t(h.key);
    this._note.textContent = msg;
    this._note.classList.toggle('is-ok', !!st.done);
    this._note.classList.toggle('is-wrong', !!(h && h.wrong));
    this._checkBtn.disabled = !!(this._busy || st.done);
    this._checkBtn.hidden = !!st.done;   /* the shell's Next takes over */
    var allDown = st.items.every(function (x) { return x.down || !x.lift; });
    this._stage.setAttribute('aria-label', rv && this._beamIn ? this._t('ariaBeamOn', { n: rv.at + 1 }) : allDown ? this._t(st.mode === 'length' ? 'ariaAllWall' : 'ariaAllFloor') : '');
  },

  /* ---------------- the hand ---------------- */
  _toggle: function (i) {
    var C = DropStandsCore, st = this.st;
    if (this._busy) return;
    var it = st.items[i];
    if (!it.down) { if (C.align(st, i)) this._clack(); }
    else if (C.unalign(st, i)) this.api.sound(520);
    this._paint();
  },
  _clack: function () { var self = this; this.api.sound(this.st.mode === 'length' ? 300 : 600); if (this.st.mode === 'height') this._later(function () { self.api.sound(600); }, 90); },
  _bindCol: function (el, i) {
    var self = this;
    el.addEventListener('pointerdown', function (ev) {
      if (self._busy) return;
      ev.preventDefault();
      try { el.setPointerCapture(ev.pointerId); } catch (e) {}
      var x0 = ev.clientX, y0 = ev.clientY, acted = false, moved = false, lastY = ev.clientY;
      var move = function (e) {
        var dx = e.clientX - x0, dy = e.clientY - y0; lastY = e.clientY;
        if (Math.hypot(dx, dy) > 8) moved = true;
        if (acted) return;
        var st = self.st, it = st.items[i];
        if (st.mode === 'height') {
          if (dy > 24 && !it.down) { acted = true; DropStandsCore.align(st, i); self._clack(); self._paint(); }
          else if (dy < -24 && it.down && DropStandsCore.unalign(st, i)) { acted = true; self.api.sound(520); self._paint(); }
        } else {
          if (dx < -24 && !it.down) { acted = true; DropStandsCore.align(st, i); self._clack(); self._paint(); }
          else if (dx > 24 && it.down && DropStandsCore.unalign(st, i)) { acted = true; self.api.sound(520); self._paint(); }
        }
      };
      var up = function () {
        el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
        if (moved || acted) return;
        var st = self.st, it = st.items[i];
        if (st.mode === 'height' && it.lift && !it.down) { var sr = self._stage.getBoundingClientRect(), G = self._geo(i); if (lastY - sr.top > G.ink.b + 2) { self._toggle(i); return; } }
        self._choose(i);
      };
      el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    });
    el.addEventListener('keydown', function (ev) {
      var st = self.st, k = ev.key;
      if (k === ' ' || k === 'Enter') { ev.preventDefault(); self._choose(i); return; }
      var al = st.mode === 'height' ? 'ArrowDown' : 'ArrowLeft', un = st.mode === 'height' ? 'ArrowUp' : 'ArrowRight';
      if (k === al || k === un) { ev.preventDefault(); if ((k === al) !== st.items[i].down) self._toggle(i); }
    });
  },
  _choose: function (i) {
    if (this._busy || this.st.done) return;
    DropStandsCore.choose(this.st, i);
    this.api.sound(660);
    this._paint();
  },
  _check: function () {
    var C = DropStandsCore, st = this.st, self = this;
    if (this._busy || st.done) return;
    var wasDown = st.items.map(function (x) { return x.down || !x.lift; });
    var res = C.check(st);
    if (res.result === 'empty') { this._paint(); return; }
    this._busy = true; this._beamIn = false;
    /* the stands fold (or things slide to the wall), staggered; then the beam comes in */
    if (wasDown.some(function (d) { return !d; })) this._clack();
    this._paint();
    this._later(function () {
      self._beamIn = true; self._paint(); self.api.sound(392);
      self._later(function () {
        self._busy = false;
        if (res.result === 'ok') self._win(); else { self.api.sound(196); self._paint(); }
      }, self._ms(560));
    }, this._ms(320));
  },
  _win: function () {
    var self = this, st = this.st;
    this._hop = st.choice;
    this.api.sound(523); this._later(function () { self.api.sound(659); }, 110); this._later(function () { self.api.sound(784); }, 220);
    this._paint();
    this._busy = true;
    this._later(function () {
      self._busy = false; self._hop = -1;
      self._afterOk = true; self._paint();
      var chk = document.querySelector('.lcs-activity-check'); if (chk && !chk.disabled) chk.click();
    }, this._ms(this.OK_MS));
  }
};

var dsCssDone = false;
function injectDropStandsCSS() {
  if (dsCssDone || typeof document === 'undefined') return;
  dsCssDone = true;
  var css = ''
  + '.lcs-app .lcs-activity-check{display:none !important;}'
  + '.ds-wrap{width:100%;display:flex;flex-direction:column;align-items:stretch;gap:12px;--ds-ink:#0F4A40;--ds-teal:#146B5E;--ds-coral:#F2784B;--ds-gold:#E0A400;}'
  + '.ds-stage{position:relative;width:100%;touch-action:none;user-select:none;-webkit-user-select:none;}'
  + '.ds-floor{position:absolute;left:0;right:0;bottom:0;height:6px;border-radius:3px;background:var(--ds-ink);}'
  + '.ds-wall{position:absolute;border-radius:3px;background:#C99A6B;box-shadow:inset 0 0 0 2px #8A6440;}'
  + '.is-length .ds-col::after{content:"";position:absolute;left:0;right:0;bottom:6px;height:4px;border-radius:2px;background:#8C9894;}'
  + '.ds-col{position:absolute;padding:0;margin:0;border:0;border-radius:12px;background:transparent;cursor:pointer;touch-action:none;}'
  + '.ds-col:hover{background:rgba(20,107,94,.05);}'
  + '.ds-stand{position:absolute;pointer-events:none;z-index:2;transition:top .22s ease,height .22s ease;}'
  + '.ds-stand-svg{position:absolute;inset:0;width:100%;height:100%;display:block;overflow:visible;}'
  + '.ds-plate{fill:#FFF3DA;stroke:var(--ds-ink);stroke-width:2.4;vector-effect:non-scaling-stroke;} .ds-leg{fill:none;stroke:var(--ds-ink);stroke-width:3;stroke-linecap:round;vector-effect:non-scaling-stroke;}'
  + '.ds-stand.is-down .ds-leg{display:none;}'
  + '.ds-img{position:absolute;pointer-events:none;transition:top .22s ease,left .22s ease;z-index:3;}'
  + '.ds-shape{position:absolute;pointer-events:none;background:#9ED9CF;box-shadow:inset 0 0 0 3px var(--ds-teal);transition:top .22s ease,left .22s ease;z-index:3;} .ds-circle{border-radius:50%;} .ds-square{border-radius:4px;}'
  + '.ds-img.is-hop,.ds-shape.is-hop{animation:ds-hop .45s ease-out 2;} @keyframes ds-hop{40%{translate:0 -12px;}}'
  + '.ds-ring{position:absolute;pointer-events:none;border-radius:14px;box-shadow:none;z-index:4;transition:box-shadow .08s;}'
  + '.ds-ring.is-on{box-shadow:0 0 0 4px var(--ds-teal);} .ds-ring.is-gold{box-shadow:0 0 0 4px var(--ds-gold),0 0 14px rgba(224,164,0,.5);}'
  + '.ds-ring.is-halo{box-shadow:0 0 0 4px rgba(224,164,0,.55),0 0 22px rgba(224,164,0,.6);animation:ds-pulse .8s ease-in-out 2;}'
  + '.ds-gap{position:absolute;display:none;background:rgba(242,120,75,.62);box-shadow:inset 0 0 0 1.5px rgba(166,70,31,.55);border-radius:3px;pointer-events:none;z-index:4;} .ds-gap.is-pulse{animation:ds-pulse .7s ease-in-out 3;}'
  + '@keyframes ds-pulse{50%{opacity:.25;}}'
  + '.ds-beam{position:absolute;pointer-events:none;border-radius:4px;background:var(--ds-gold);box-shadow:inset 0 0 0 2px #9C7300;z-index:5;transition:top .5s cubic-bezier(.2,.8,.3,1),left .5s cubic-bezier(.2,.8,.3,1),opacity .2s;}'
  + '.ds-note{min-height:28px;align-self:center;font:700 20px/1.3 var(--lcs-font-body,Nunito,sans-serif);color:var(--ds-ink);text-align:center;max-width:620px;} .ds-note.is-ok{color:var(--ds-teal);font-weight:800;} .ds-note.is-wrong{color:#A6461F;}'
  + '.ds-actions{display:flex;justify-content:flex-end;}'
  + '.ds-check{min-height:48px;padding:0 24px;border-radius:12px;border:0;background:var(--lcs-accent,#F2784B);color:#fff;font:800 18px/1 var(--lcs-font-display);cursor:pointer;box-shadow:0 3px 0 #C95A31;} .ds-check:disabled{opacity:.5;cursor:default;} .ds-check[hidden]{display:none;}'
  + '.ds-col:focus-visible,.ds-check:focus-visible{outline:3px solid var(--lcs-structure,#146B5E);outline-offset:3px;}'
  + '.is-narrow .ds-note{font-size:17px;}'
  + '@media (prefers-reduced-motion: reduce){.ds-stand,.ds-img,.ds-shape,.ds-beam{transition:none;} .ds-img.is-hop,.ds-shape.is-hop,.ds-ring.is-halo,.ds-gap.is-pulse{animation:none;}}';
  var el = document.createElement('style'); el.id = 'ds-css'; el.textContent = css; document.head.appendChild(el);
}

if (typeof window !== 'undefined') window.DropStandsActivity = DropStandsActivity;
