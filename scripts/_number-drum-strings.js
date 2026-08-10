/* =====================================================================
   TOOL #50 — the ten non-English string sets.
   =====================================================================
   ⚠⚠ THE PRODUCT NAME CANNOT BE TRANSLATED. "Drum" is spent in ALL
   ELEVEN locales by `syllable-splitter` (Trommel · trumma · tromme ·
   rumpu — a tapped drum is that instrument's only control, and the key
   `tapDrum` ships in every locale). So each locale names the part that
   is actually on the screen: THE RING. The English title stays the
   operator's.

   ⚠ Nouns checked against the shipped lexicon of the OTHER tools, not
   against English — that is what makes them unrelated words rather than
   one word respelled eleven times. Refused, each owned elsewhere:
   Zahnrad/roue/rueda/roda/ruota/wiel/hjul/ratas (gear-wheel reads as
   `learning-clock`'s engine), band/bande/banda/nauha (tape, #40/#41),
   Streifen/tira/strimmel (strip, `unroll-tape`), Reihe/rangée/rij/rad
   (row, `number-sieve`), Spalte/colonne/kolom (column, `place-value`),
   tromle/tønde (barrel reads as a container, `estimation-jar`).

   ⚠ fi takes the case endings the sentence needs, not the nominative:
   `rengas` → `renkaan`/`rengasta`/`renkaassa`. A fill-in token in the
   nominative is the recorded Finnish trap (§A.13.56).
   ===================================================================== */
'use strict';

module.exports = {
  de: {
    title: 'Der Zahlenring',
    instruction: 'Dreh den rechten Ring. Wenn seine 9 zur 0 weiterrückt, greift ein Zahn in den Ring daneben und nimmt ihn mit.',
    ariaFrame: 'Zwei Zahlenringe in einem Rahmen. Der rechte Ring zählt die Einer, der linke die Zehner.',
    ariaOnes: 'Einerring', ariaTens: 'Zehnerring', ariaHund: 'Hunderterring',
    setTop: 'Wie weit gezählt wird', top99: 'bis 99', top999: 'bis 999',
    fwd: 'Vorwärts drehen', back: 'Zurückdrehen',
    fwdHalf: 'Einen halben Schritt vorwärts drehen', backHalf: 'Einen halben Schritt zurückdrehen',
    up10: 'Den Zehnerring vorwärts drehen', down10: 'Den Zehnerring zurückdrehen',
    slow: 'Langsam drehen',
    saidAt: '{n}', saidBetween: 'zwischen {a} und {b}',
    saidCarry: '{n}. Beide Ringe haben sich gedreht.',
    saidTopEnd: 'Weiter als {n} drehen die Ringe nicht.',
    saidZeroEnd: 'Unter null drehen die Ringe nicht.',
    gateTitle: 'Die Ringe aus Papier',
    gateBody: 'Alle drei Ringe sind kostenlos, und jede Drehung auch. Mit dem Lehrkraft-Abo kommen die Ringe zum Ausschneiden und Zusammenkleben dazu, damit jedes Kind dasselbe Gerät in den Händen hat und selbst einen Ring in den nächsten greifen lässt.',
    gateCta: 'Zum Lehrkraft-Abo', gateClose: 'Jetzt nicht',
    printBtn: 'Die Ringe zum Ausschneiden drucken',
    sheetTitle: 'Ringe zum Ausschneiden und Zusammenkleben',
    sheetNote: 'Schneide jeden langen Streifen aus, roll ihn zu einem Ring und klebe die Enden zusammen. Halte zwei Ringe nebeneinander und dreh den rechten: Immer wenn seine 9 zur 0 weiterrückt, drehst du den linken um eins weiter.'
  },

  fr: {
    title: 'L’anneau des nombres',
    instruction: 'Fais tourner l’anneau de droite. Quand son 9 arrive sur le 0, une dent accroche l’anneau voisin et l’entraîne avec elle.',
    ariaFrame: 'Deux anneaux de chiffres dans un cadre. L’anneau de droite compte les unités, celui de gauche les dizaines.',
    ariaOnes: 'anneau des unités', ariaTens: 'anneau des dizaines', ariaHund: 'anneau des centaines',
    setTop: 'Jusqu’où on compte', top99: 'jusqu’à 99', top999: 'jusqu’à 999',
    fwd: 'Tourner en avant', back: 'Tourner en arrière',
    fwdHalf: 'Tourner d’un demi-cran en avant', backHalf: 'Tourner d’un demi-cran en arrière',
    up10: 'Tourner l’anneau des dizaines en avant', down10: 'Tourner l’anneau des dizaines en arrière',
    slow: 'Tourner lentement',
    saidAt: '{n}', saidBetween: 'entre {a} et {b}',
    saidCarry: '{n}. Les deux anneaux ont tourné.',
    saidTopEnd: 'Les anneaux ne vont pas plus loin que {n}.',
    saidZeroEnd: 'Les anneaux ne descendent pas en dessous de zéro.',
    gateTitle: 'Les anneaux en papier',
    gateBody: 'Les trois anneaux sont gratuits, et chaque tour aussi. L’abonnement Enseignant ajoute les anneaux en papier à découper et à rouler, pour que chaque enfant tienne le même appareil et fasse lui-même accrocher un anneau sur le suivant.',
    gateCta: 'Découvrir l’abonnement Enseignant', gateClose: 'Pas maintenant',
    printBtn: 'Imprimer les anneaux en papier',
    sheetTitle: 'Anneaux à découper et à rouler',
    sheetNote: 'Découpe chaque longue pièce de papier, roule-la en anneau et colle les deux bouts. Tiens deux anneaux côte à côte et fais tourner celui de droite : chaque fois que son 9 arrive sur le 0, avance celui de gauche d’un cran.'
  },

  es: {
    title: 'El anillo de los números',
    instruction: 'Gira el anillo de la derecha. Cuando su 9 pasa al 0, un diente engancha el anillo de al lado y lo arrastra con él.',
    ariaFrame: 'Dos anillos de cifras en un marco. El anillo de la derecha cuenta las unidades y el de la izquierda las decenas.',
    ariaOnes: 'anillo de las unidades', ariaTens: 'anillo de las decenas', ariaHund: 'anillo de las centenas',
    setTop: 'Hasta dónde cuenta', top99: 'hasta 99', top999: 'hasta 999',
    fwd: 'Girar hacia adelante', back: 'Girar hacia atrás',
    fwdHalf: 'Girar medio paso hacia adelante', backHalf: 'Girar medio paso hacia atrás',
    up10: 'Girar el anillo de las decenas hacia adelante', down10: 'Girar el anillo de las decenas hacia atrás',
    slow: 'Girar despacio',
    saidAt: '{n}', saidBetween: 'entre {a} y {b}',
    saidCarry: '{n}. Han girado los dos anillos.',
    saidTopEnd: 'Los anillos no pasan de {n}.',
    saidZeroEnd: 'Los anillos no bajan de cero.',
    gateTitle: 'Los anillos de papel',
    gateBody: 'Los tres anillos son gratis, y cada giro también. El plan Docente añade los anillos de papel para recortar y enrollar, para que cada niño tenga el mismo aparato en las manos y enganche un anillo en el siguiente por sí mismo.',
    gateCta: 'Conoce el plan Docente', gateClose: 'Ahora no',
    printBtn: 'Imprimir los anillos de papel',
    sheetTitle: 'Anillos para recortar y enrollar',
    sheetNote: 'Recorta cada tira larga, enróllala hasta formar un anillo y pega los dos extremos. Pon dos anillos juntos y gira el de la derecha: cada vez que su 9 pase al 0, adelanta el de la izquierda una posición.'
  },

  pt: {
    title: 'O anel dos números',
    instruction: 'Gire o anel da direita. Quando o 9 dele passa para o 0, um dente engata no anel ao lado e leva esse anel junto.',
    ariaFrame: 'Dois anéis de algarismos numa moldura. O anel da direita conta as unidades e o da esquerda conta as dezenas.',
    ariaOnes: 'anel das unidades', ariaTens: 'anel das dezenas', ariaHund: 'anel das centenas',
    setTop: 'Até onde conta', top99: 'até 99', top999: 'até 999',
    fwd: 'Girar para a frente', back: 'Girar para trás',
    fwdHalf: 'Girar meio passo para a frente', backHalf: 'Girar meio passo para trás',
    up10: 'Girar o anel das dezenas para a frente', down10: 'Girar o anel das dezenas para trás',
    slow: 'Girar devagar',
    saidAt: '{n}', saidBetween: 'entre {a} e {b}',
    saidCarry: '{n}. Os dois anéis giraram.',
    saidTopEnd: 'Os anéis não passam de {n}.',
    saidZeroEnd: 'Os anéis não descem abaixo de zero.',
    gateTitle: 'Os anéis de papel',
    gateBody: 'Os três anéis são gratuitos, e cada giro também. O plano Professor acrescenta os anéis de papel para recortar e enrolar, para que cada criança tenha o mesmo aparelho nas mãos e faça um anel engatar no seguinte.',
    gateCta: 'Conheça o plano Professor', gateClose: 'Agora não',
    printBtn: 'Imprimir os anéis de papel',
    sheetTitle: 'Anéis para recortar e enrolar',
    sheetNote: 'Recorte cada tira comprida, enrole até formar um anel e cole as duas pontas. Ponha dois anéis lado a lado e gire o da direita: sempre que o 9 dele passar para o 0, avance o da esquerda uma casa.'
  },

  it: {
    title: 'L’anello dei numeri',
    instruction: 'Gira l’anello di destra. Quando il suo 9 passa allo 0, un dente aggancia l’anello accanto e se lo porta dietro.',
    ariaFrame: 'Due anelli di cifre in una cornice. L’anello di destra conta le unità, quello di sinistra le decine.',
    ariaOnes: 'anello delle unità', ariaTens: 'anello delle decine', ariaHund: 'anello delle centinaia',
    setTop: 'Fino a quanto conta', top99: 'fino a 99', top999: 'fino a 999',
    fwd: 'Girare in avanti', back: 'Girare indietro',
    fwdHalf: 'Girare avanti di mezzo scatto', backHalf: 'Girare indietro di mezzo scatto',
    up10: 'Girare in avanti l’anello delle decine', down10: 'Girare indietro l’anello delle decine',
    slow: 'Girare piano',
    saidAt: '{n}', saidBetween: 'tra {a} e {b}',
    saidCarry: '{n}. Hanno girato tutti e due gli anelli.',
    saidTopEnd: 'Gli anelli non vanno oltre {n}.',
    saidZeroEnd: 'Gli anelli non scendono sotto lo zero.',
    gateTitle: 'Gli anelli di carta',
    gateBody: 'Tutti e tre gli anelli sono gratuiti, e lo è anche ogni giro. Il piano Insegnante aggiunge gli anelli di carta da ritagliare e arrotolare, così ogni bambino tiene in mano lo stesso apparecchio e fa agganciare da solo un anello a quello dopo.',
    gateCta: 'Scopri il piano Insegnante', gateClose: 'Non ora',
    printBtn: 'Stampa gli anelli di carta',
    sheetTitle: 'Anelli da ritagliare e arrotolare',
    sheetNote: 'Ritaglia ogni striscia lunga, arrotolala fino a formare un anello e incolla le due estremità. Tieni due anelli affiancati e gira quello di destra: ogni volta che il suo 9 passa allo 0, fai avanzare di uno quello di sinistra.'
  },

  nl: {
    title: 'De getallenring',
    instruction: 'Draai de rechterring. Als zijn 9 doordraait naar de 0, pakt een tand de ring ernaast en neemt die mee.',
    ariaFrame: 'Twee ringen met cijfers in een kader. De rechterring telt de eenheden, de linkerring de tientallen.',
    ariaOnes: 'ring van de eenheden', ariaTens: 'ring van de tientallen', ariaHund: 'ring van de honderdtallen',
    setTop: 'Tot hoever hij telt', top99: 'tot 99', top999: 'tot 999',
    fwd: 'Vooruit draaien', back: 'Terugdraaien',
    fwdHalf: 'Een halve stap vooruit draaien', backHalf: 'Een halve stap terugdraaien',
    up10: 'De ring van de tientallen vooruit draaien', down10: 'De ring van de tientallen terugdraaien',
    slow: 'Langzaam draaien',
    saidAt: '{n}', saidBetween: 'tussen {a} en {b}',
    saidCarry: '{n}. Allebei de ringen zijn gedraaid.',
    saidTopEnd: 'Verder dan {n} draaien de ringen niet.',
    saidZeroEnd: 'Onder nul draaien de ringen niet.',
    gateTitle: 'De ringen van papier',
    gateBody: 'Alle drie de ringen zijn gratis, en elke draai ook. Met het Leerkracht-abonnement komen daar de papieren ringen bij om uit te knippen en op te rollen, zodat elk kind hetzelfde apparaat in handen heeft en zelf de ene ring in de volgende laat pakken.',
    gateCta: 'Bekijk het Leerkracht-abonnement', gateClose: 'Nu niet',
    printBtn: 'De papieren ringen afdrukken',
    sheetTitle: 'Ringen om uit te knippen en op te rollen',
    sheetNote: 'Knip elke lange strook uit, draai hem op tot een ring en plak de twee uiteinden aan elkaar. Houd twee ringen naast elkaar en draai de rechter: telkens als zijn 9 doordraait naar de 0, draai je de linker één verder.'
  },

  sv: {
    title: 'Talringen',
    instruction: 'Vrid den högra ringen. När dess 9 går runt till 0 hakar en tand i ringen bredvid och drar med den.',
    ariaFrame: 'Två ringar med siffror i en ram. Den högra ringen räknar ental och den vänstra tiotal.',
    ariaOnes: 'entalsringen', ariaTens: 'tiotalsringen', ariaHund: 'hundratalsringen',
    setTop: 'Hur långt den räknar', top99: 'upp till 99', top999: 'upp till 999',
    fwd: 'Vrid framåt', back: 'Vrid tillbaka',
    fwdHalf: 'Vrid ett halvt hack framåt', backHalf: 'Vrid ett halvt hack tillbaka',
    up10: 'Vrid tiotalsringen framåt', down10: 'Vrid tiotalsringen tillbaka',
    slow: 'Vrid långsamt',
    saidAt: '{n}', saidBetween: 'mellan {a} och {b}',
    saidCarry: '{n}. Båda ringarna vred sig.',
    saidTopEnd: 'Ringarna går inte längre än {n}.',
    saidZeroEnd: 'Ringarna går inte under noll.',
    gateTitle: 'Ringarna av papper',
    gateBody: 'Alla tre ringarna är gratis, och varje vridning också. Med Lärarabonnemanget får du dessutom pappersringarna att klippa ut och rulla ihop, så att varje barn håller samma sak i händerna och själv låter en ring haka i nästa.',
    gateCta: 'Se Lärarabonnemanget', gateClose: 'Inte nu',
    printBtn: 'Skriv ut pappersringarna',
    sheetTitle: 'Ringar att klippa ut och rulla ihop',
    sheetNote: 'Klipp ut varje lång remsa, rulla ihop den till en ring och fäst ihop ändarna. Håll två ringar bredvid varandra och vrid den högra: varje gång dess 9 går runt till 0 vrider du den vänstra ett steg.'
  },

  da: {
    title: 'Talringen',
    instruction: 'Drej den højre ring. Når dens 9 kommer rundt til 0, griber en tand fat i ringen ved siden af og trækker den med.',
    ariaFrame: 'To ringe med tal i en ramme. Den højre ring tæller enere, og den venstre tæller tiere.',
    ariaOnes: 'enerringen', ariaTens: 'tierringen', ariaHund: 'hundredringen',
    setTop: 'Hvor langt den tæller', top99: 'op til 99', top999: 'op til 999',
    fwd: 'Drej fremad', back: 'Drej tilbage',
    fwdHalf: 'Drej et halvt hak fremad', backHalf: 'Drej et halvt hak tilbage',
    up10: 'Drej tierringen fremad', down10: 'Drej tierringen tilbage',
    slow: 'Drej langsomt',
    saidAt: '{n}', saidBetween: 'mellem {a} og {b}',
    saidCarry: '{n}. Begge ringe drejede.',
    saidTopEnd: 'Ringene går ikke længere end {n}.',
    saidZeroEnd: 'Ringene går ikke under nul.',
    gateTitle: 'Ringene af papir',
    gateBody: 'Alle tre ringe er gratis, og det er hver eneste drejning også. Med Lærer-abonnementet får du desuden papirringene til at klippe ud og rulle sammen, så hvert barn har det samme apparat i hænderne og selv lader den ene ring gribe fat i den næste.',
    gateCta: 'Se Lærer-abonnementet', gateClose: 'Ikke nu',
    printBtn: 'Print papirringene',
    sheetTitle: 'Ringe til at klippe ud og rulle sammen',
    sheetNote: 'Klip hver lang strimmel ud, rul den sammen til en ring og sæt de to ender sammen. Hold to ringe ved siden af hinanden og drej den højre: hver gang dens 9 kommer rundt til 0, drejer du den venstre et hak frem.'
  },

  no: {
    title: 'Tallringen',
    instruction: 'Vri den høyre ringen. Når 9-tallet kommer rundt til 0, griper en tann tak i ringen ved siden av og drar den med.',
    ariaFrame: 'To ringer med siffer i en ramme. Den høyre ringen teller enere, og den venstre teller tiere.',
    ariaOnes: 'enerringen', ariaTens: 'tierringen', ariaHund: 'hundrerringen',
    setTop: 'Hvor langt den teller', top99: 'opp til 99', top999: 'opp til 999',
    fwd: 'Vri framover', back: 'Vri tilbake',
    fwdHalf: 'Vri et halvt hakk framover', backHalf: 'Vri et halvt hakk tilbake',
    up10: 'Vri tierringen framover', down10: 'Vri tierringen tilbake',
    slow: 'Vri sakte',
    saidAt: '{n}', saidBetween: 'mellom {a} og {b}',
    saidCarry: '{n}. Begge ringene vred seg.',
    saidTopEnd: 'Ringene går ikke lenger enn {n}.',
    saidZeroEnd: 'Ringene går ikke under null.',
    gateTitle: 'Ringene av papir',
    gateBody: 'Alle tre ringene er gratis, og det er hver eneste dreining også. Med Lærer-abonnementet får du i tillegg papirringene til å klippe ut og rulle sammen, slik at hvert barn holder det samme apparatet i hendene og selv lar den ene ringen gripe tak i den neste.',
    gateCta: 'Se Lærer-abonnementet', gateClose: 'Ikke nå',
    printBtn: 'Skriv ut papirringene',
    sheetTitle: 'Ringer å klippe ut og rulle sammen',
    sheetNote: 'Klipp ut hver lange remse, rull den sammen til en ring og fest de to endene. Hold to ringer ved siden av hverandre og vri den høyre: hver gang 9-tallet kommer rundt til 0, vrir du den venstre ett hakk fram.'
  },

  fi: {
    title: 'Lukurengas',
    instruction: 'Pyöritä oikeanpuoleista rengasta. Kun sen 9 kiertyy nollaan, hammas tarttuu viereiseen renkaaseen ja vetää sen mukanaan.',
    ariaFrame: 'Kaksi numerorengasta kehyksessä. Oikea rengas laskee ykkösiä ja vasen kymmeniä.',
    ariaOnes: 'ykkösrengas', ariaTens: 'kymmenrengas', ariaHund: 'sadasrengas',
    setTop: 'Kuinka pitkälle lasketaan', top99: 'yhdeksäänkymmeneenyhdeksään asti', top999: 'yhdeksäänsataanyhdeksäänkymmeneenyhdeksään asti',
    fwd: 'Pyöritä eteenpäin', back: 'Pyöritä taaksepäin',
    fwdHalf: 'Pyöritä puoli pykälää eteenpäin', backHalf: 'Pyöritä puoli pykälää taaksepäin',
    up10: 'Pyöritä kymmenrengasta eteenpäin', down10: 'Pyöritä kymmenrengasta taaksepäin',
    slow: 'Pyöritä hitaasti',
    saidAt: '{n}', saidBetween: '{a}:n ja {b}:n välissä',
    saidCarry: '{n}. Molemmat renkaat pyörähtivät.',
    saidTopEnd: 'Renkaat eivät mene lukua {n} pidemmälle.',
    saidZeroEnd: 'Renkaat eivät mene nollan alle.',
    gateTitle: 'Paperiset renkaat',
    gateBody: 'Kaikki kolme rengasta ovat maksuttomia, ja niin on jokainen pyöräytyskin. Opettajatilaus tuo lisäksi paperiset renkaat, jotka leikataan irti ja rullataan kokoon, niin jokaisella lapsella on sama laite käsissään ja hän saa itse tarttua yhdellä renkaalla seuraavaan.',
    gateCta: 'Tutustu Opettajatilaukseen', gateClose: 'Ei nyt',
    printBtn: 'Tulosta paperiset renkaat',
    sheetTitle: 'Renkaat leikattavaksi ja rullattavaksi',
    sheetNote: 'Leikkaa irti jokainen pitkä suikale, rullaa se renkaaksi ja kiinnitä päät yhteen. Pidä kahta rengasta vierekkäin ja pyöritä oikeanpuoleista: aina kun sen 9 kiertyy nollaan, pyöräytä vasenta yhden pykälän eteenpäin.'
  }
};
