/* =====================================================================
   TOOL #52 — THE ROUNDING HILL — the ten non-English string sets
   =====================================================================
   Rebuilt per locale by a native panel, never translated. Same 36 keys,
   same {n} / {d} placeholders in every set.

   ⭐ ROUND 2 (36 keys). Four keys were added to carry the audit fixes, and
   FIVE existing strings changed underneath these sets — only three were
   flagged to me; I found the other two by diffing every key against the
   tool rather than trusting the list:
     - `saidTiltSet` gained the PURPOSE clause ("for what these numbers are
       being used for … until that changes") — NOT flagged.
     - `saidTiltClear` gained "What are these numbers for now?" AND was
       RE-SCOPED: `_tilt` now dispatches
       `onRidge(next, next.at) ? 'saidTiltClear' : 'saidTiltClearOff'`
       (:554), so `saidTiltClear` is now the ON-RIDGE branch and must speak
       about THE CURRENT stone, while `saidTiltClearOff` must not claim the
       current stone does anything. Placing these by NAME instead of by
       dispatch would have put the wrong sentence in each. NOT flagged.
   Verified fixed in code: `ariaGround` is finally wired (:698);
   `why()` at :539 passes 'rest' when the stone is at rest, so `saidEdge`
   no longer fires away from the edge; `_release` refuses with 'teeter'
   (:580) so a teetering stone is no longer told it is at rest; `_refuse`
   splits `saidAlreadyLevel`/`saidAlreadySet` (:81 of that fn);
   `ariaStoneRest` is used exactly when `phase === 'settled'` (:686).
   ⚠ STILL OPEN (was never in the six): `ariaTilt` carries no direction —
   sighted users see which way the ridge leans, screen-reader users do not,
   and the code passes it no params, so no string can fix it.

   ⭐ THE ENGLISH PART-NOUN — RECOMMENDATION: **THE BOULDER**.
   Measured over `mini tools` + `tool-content`: boulder **0**, cobble 0,
   nugget 0 — against stone 100, rock 92, slab 26, chunk 25, pebble 19,
   lump 4. `boulder` is not merely free, it is the register the ten locales
   already landed on independently — Brocken (chunk of rock), kampesten,
   kampestein, stenbumling, lohkare and kei are all boulder-words, not
   pebble-words. Renaming the English part to THE BOULDER makes the eleven
   one instrument instead of leaving English the only member colliding with
   a live activity. The product name "The Rounding Hill" is untouched.

   ⚠⚠ THE FENCE OVERTURNED THE DOCBLOCK'S OWN CLAIM. `rounding-hill.js`
   declares "FREE, and used here: THE SLOPES · THE DIPS · THE RIDGE ·
   THE STONE". Measured against the shipped lexicon, THE STONE IS TAKEN
   IN TEN OF ELEVEN LANGUAGES:
     - `unroll-tape.js` (#41) `shapePebble` — a RENDERED OBJECT named in
       all 11: de Kieselstein · fr Galet · es "Piedra de río" ·
       pt Pedrinha · it Sasso · nl Kiezelsteen · sv Småsten ·
       da Rullesten · no Småstein · fi Pikkukivi.
     - `ten-stones-*` — a live activity (en/de/fr/es) whose SUBJECT is a
       number line you hop along, i.e. this tool's own domain. It owns
       en "the golden Ten Stone", de Stein/Steine, es piedra/piedras.
       (Its French escapes: it uses *nénuphar*, lily pads.)
     - `choice-board-activity.js` glosses `rock` in all 11: der Stein,
       une pierre, la piedra, il sasso, de steen, a pedra, stenen,
       en sten, en stein, kivi.
   So each locale below takes its OWN free heavy-thing noun. They are
   unrelated words, not one word respelled ten times.

   PART NOUNS — every one measured 0-hit unless noted.
   loc  SLOPE        DIP            RIDGE          STONE           GROUND
   de   Abhang       Mulde          Grat           Brocken         Gelände
   fr   pente        cuvette        crête          caillou         terrain
   es   ladera       hondonada      cresta         guijarro        terreno
   pt   ladeira      cova           crista         seixo           terreno
   it   pendio       conca          cresta         ciottolo        terreno
   nl   helling      kuil           bult           kei             grond
   sv   sluttning    grop           krön           stenbumling     mark
   da   skråning     fordybning     højderyg       kampesten       terræn
   no   skråning     grop           høyderygg      kampestein      terreng
   fi   rinne        kuoppa         harjanne       lohkare         maasto

   WHY NOT THE OBVIOUS WORD — the obvious one was taken nine times:
   - de `Hang` matches a LIVE DUTCH IMPERATIVE (`nl:'Hang dit op...'`),
     the cross-locale homograph class. → `Abhang`.
   - de `Kamm` and nl/da `kam` are the shipped picture-word for a COMB
     (pww-index-de/-da, blending-board-deck-nl, sound-boxes-bank-de).
     nl `rug` is the picture-word for a BACK / the English word *rug*
     (58 hits). → de `Grat`, nl `bult`, da/no `høyderyg(g)`.
   - fr `creux` is used ELEVEN TIMES by the sibling tool `baking-tray`.
     → `cuvette`. fr `côte` collides with the idiom "côte à côte" (30).
   - es `cuesta` is the verb "it costs" all over `coin-stall`, `money-core`
     and `money-mat` — unusable on a maths platform. → `ladera`.
     es `roca` is the pww-index picture-word for rock. → `guijarro`.
   - ⭐ sv `klippa` and da `klippe` mean TO CUT, and they are already in
     shipped print copy ("att rita, klippa och lägga ovanpå" /
     "at tegne, klippe og lægge oven på"). This tool's own sheet says
     *cut along the outline* — the stone and the scissors would have been
     the same word IN THE SAME STRING. → `stenbumling` / `kampesten`.
   - ⭐ da/no `bakke`/`bakken` is the TRAY in `money-core` and
     `fraction-kitchen` ("Fyld bakken"). → `skråning`, and NOT
     "Afrundingsbakken" for the product name.
   - ⭐ no `søkk` was rejected on its DEFINITE form: `søkket` is also the
     definite of `søkke`, a fishing SINKER — a heavy thing that drops, in
     a tool whose whole subject is a heavy thing that drops. → `grop`.
     (This is the `bana`/`banan` check, and it fired.)
   - fi `harja` is the pww-index picture-word for a BRUSH. → `harjanne`.
     fi `kivi` is taken (Pikkukivi + letter-tiles-fi). → `lohkare`.
   - nl `blok`, sv `block` are place-value blocks. `kula/kule` are the
     rekenrek beads and `Murmel/bille` the forbidden marbles.

   PRODUCT NAMES — the English name is the operator's and stays.
   de Der Rundungshügel · fr La colline des arrondis ·
   es La colina del redondeo · pt A colina do arredondamento ·
   it La collina dell'arrotondamento · nl De afrondingsheuvel ·
   sv Avrundningskullen · da Afrundingshøjen · no Avrundingskollen ·
   fi Pyöristysmäki.
   ⭐ `Avrundingshaugen` was REJECTED: `counting-cups` (#48) ships
   `no:'En haug'` as the name of its spilled PILE. → `kolle`, a rounded
   knoll, 0 hits. (`hög`/`dynge`/`kasa` are that tool's sv/da/fi words —
   none is used here either.) The hill words that survived — Hügel,
   colline, colina, collina, heuvel, kulle, høj, mäki — appear only as
   story scenery ("eine Pizza den Hügel hinauf") or as phonics decoding
   words, never as an apparatus part.

   TENS / HUNDREDS are the platform's OWN shipped place-value lexicon
   (place-value-core.js + the verify-script names), not invented:
   Zehner/Hunderter · dizaines/centaines · decenas/centenas ·
   dezenas/centenas · decine/centinaia · tientallen/honderdtallen ·
   tiotal/hundratal · tiere/hundreder · tiere/hundrere · kymmenet/sadat.

   PAID PLAN — read from `frontend/messages/<loc>.json` `planTag`, verbatim,
   all ten verified: Lehrkraft-Abo · Abonnement Enseignant · Plan Docente ·
   Plano Professor · Piano Insegnante · Leerkracht-abonnement ·
   Lärarplanen · Lærerabonnementet · Lærerabonnementet · Opettajatilaus.

   FOUR ENGLISH DEFECTS REPAIRED IN THESE SETS (the model was driven in
   node to confirm each; the two that need CODE are reported, not papered
   over):
   1. `instruction` claimed a ridge stone never falls. Once the class has
      set a tilt, `settleOf` resolves it immediately — so every set here
      says "...until the class has settled which way the ridge leans".
   2. `saidTiltClear` claimed "the stone will teeter". Clearing the tilt
      re-teeters a stone ONLY if it is on the ridge; a settled 47 stays
      settled. Every set here speaks about the stones to COME.
   3. `saidAlready` ("The stone is already at rest") fires on THREE
      refusals, including releasing a TEETERING stone — which is exactly
      not at rest — and a no-op tilt press, which is not about the stone
      at all. Every set here is worded to be true in all three.
   4. `ariaStone` "the stone, at {n}" reads as a position, but {n} is the
      stone's NUMBER and after settling the stone is DRAWN in the dip
      while still reading 47. Every set here says "marked {n}".
   Also: the ridge is drawn as a tent apex by `heightAt`, so "the ground
   is level here" is not what the picture shows. These sets say "neither
   side is lower", which is true of both the picture and the model.
   ===================================================================== */
'use strict';

module.exports = {

  de: {
    title: 'Der Rundungshügel',
    instruction: 'Setzt den Brocken auf das Gelände und lasst ihn los. Er rollt in die nächste Mulde – außer er kommt auf dem Grat zu liegen: dort ist keine Seite tiefer, von allein rollt er nicht weiter, und wozu die Zahl gebraucht wird, entscheidet, wohin er geht.',

    ariaGround: 'Gelände mit je einer Mulde an beiden Enden und einem Grat in der Mitte.',
    ariaStone: 'der Brocken mit der Zahl {n}',
    ariaStoneRest: 'der Brocken mit der Zahl {n}, liegt in der Mulde {d}',
    ariaRidge: 'der Grat, genau in der Mitte zwischen den beiden Mulden',
    ariaTilt: 'der Grat, von der Klasse in Richtung {d} geneigt',

    setSpan: 'Welches Gelände',
    spanTens: 'zwischen zwei Zehnern',
    spanHundreds: 'zwischen zwei Hundertern',

    lessBig: 'Den Brocken weit nach links schieben',
    lessOne: 'Den Brocken ein Stück nach links schieben',
    moreOne: 'Den Brocken ein Stück nach rechts schieben',
    moreBig: 'Den Brocken weit nach rechts schieben',
    letGo: 'Loslassen',
    tiltDown: 'Den Grat zur unteren Mulde neigen',
    tiltUp: 'Den Grat zur oberen Mulde neigen',
    clearTilt: 'Die Zahl wird jetzt für etwas anderes gebraucht – den Grat wieder gerade stellen',
    again: 'Neuer Brocken',

    saidSet: '{n}',
    saidSettled: '{n} rollt in die Mulde {d}.',
    saidTeeter: '{n} liegt auf dem Grat. Keine Seite ist tiefer, also rollt der Brocken von allein nicht weiter. Wozu braucht ihr diese Zahlen – und wohin soll das den Grat neigen?',
    saidTiltSet: 'Die Klasse hat den Grat in Richtung {d} geneigt – dafür, wozu diese Zahlen gerade gebraucht werden. Jeder Brocken, der genau auf dem Grat landet, geht dorthin, bis sich das ändert.',
    saidTiltClear: 'Der Grat steht wieder gerade. Wozu werden diese Zahlen jetzt gebraucht? Der Brocken wackelt, bis die Klasse den Grat neu neigt.',
    saidAlready: 'Das ändert hier nichts. Legt einen neuen Brocken hin.',
    saidAlreadyLevel: 'Der Grat steht schon gerade.',
    saidAlreadySet: 'Der Grat ist schon in diese Richtung geneigt.',
    saidTiltClearOff: 'Der Grat steht wieder gerade. Der nächste Brocken, der darauf landet, wackelt.',
    saidEdge: 'Das Gelände endet bei {n}.',

    gateTitle: 'Das Gelände aus Papier',
    gateBody: 'Das ganze Gerät ist kostenlos – jeder Abhang, das Wackeln und das Neigen des Grats. Das Lehrkraft-Abo ergänzt das Gelände aus Papier zum Ausschneiden und Falten: Es steht auf dem Tisch, und ein Kind kann einen echten Brocken auf den Grat legen und sehen, dass er wirklich liegen bleibt.',
    gateCta: 'Das Lehrkraft-Abo ansehen',
    gateClose: 'Jetzt nicht',

    printBtn: 'Gelände aus Papier drucken',
    sheetTitle: 'Gelände aus Papier zum Ausschneiden und Falten',
    sheetNote: 'Schneidet am Rand entlang und faltet an den gestrichelten Linien, damit das Gelände steht. Schreibt die beiden runden Zahlen in die Mulden. Legt einen echten Brocken irgendwo auf einen Abhang – er rollt in eine Mulde; legt ihn auf den Grat, bleibt er liegen. Genau darum geht es.'
  },

  fr: {
    title: 'La colline des arrondis',
    instruction: "Pose le caillou sur le terrain et lâche-le. Il descend dans la cuvette la plus proche – sauf s'il s'arrête sur la crête : là, aucun côté n'est plus bas, il ne tombe pas tout seul, et c'est l'usage qu'on fait du nombre qui décide de quel côté il va.",

    ariaGround: 'Terrain avec une cuvette à chaque bout et une crête au milieu.',
    ariaStone: 'le caillou portant le nombre {n}',
    ariaStoneRest: 'le caillou portant le nombre {n}, posé dans la cuvette {d}',
    ariaRidge: 'la crête, à mi-chemin entre les deux cuvettes',
    ariaTilt: 'la crête, penchée par la classe vers {d}',

    setSpan: 'Quel terrain',
    spanTens: 'entre deux dizaines',
    spanHundreds: 'entre deux centaines',

    lessBig: 'Déplacer le caillou loin vers la gauche',
    lessOne: 'Déplacer le caillou un peu vers la gauche',
    moreOne: 'Déplacer le caillou un peu vers la droite',
    moreBig: 'Déplacer le caillou loin vers la droite',
    letGo: 'Lâcher',
    tiltDown: 'Faire pencher la crête vers la cuvette du bas',
    tiltUp: 'Faire pencher la crête vers la cuvette du haut',
    clearTilt: "Le nombre sert à autre chose maintenant – remettre la crête droite",
    again: 'Un autre caillou',

    saidSet: '{n}',
    saidSettled: '{n} descend dans la cuvette {d}.',
    saidTeeter: "{n} est sur la crête. Aucun côté n'est plus bas, donc le caillou ne tombe pas tout seul. À quoi servent ces nombres – et de quel côté cela doit-il faire pencher la crête ?",
    saidTiltSet: "La classe a fait pencher la crête vers {d}, pour l'usage qu'on fait de ces nombres. Chaque caillou qui s'arrête pile sur la crête ira de ce côté jusqu'à ce que cela change.",
    saidTiltClear: "La crête est de nouveau droite. À quoi servent ces nombres maintenant ? Le caillou hésite jusqu'à ce que la classe la règle de nouveau.",
    saidAlready: 'Cela ne change rien ici. Pose un nouveau caillou.',
    saidAlreadyLevel: 'La crête est déjà droite.',
    saidAlreadySet: 'La crête penche déjà de ce côté.',
    saidTiltClearOff: "La crête est de nouveau droite. Le prochain caillou qui s'y arrêtera hésitera.",
    saidEdge: "Le terrain s'arrête à {n}.",

    gateTitle: 'Le terrain en papier',
    gateBody: "Tout l'appareil est gratuit : chaque pente, l'hésitation et le réglage de la crête. L'Abonnement Enseignant ajoute le terrain en papier à découper et à plier, qui tient debout sur une table : un enfant peut poser un vrai caillou sur la crête et voir qu'il ne tombe vraiment pas.",
    gateCta: "Découvrir l'Abonnement Enseignant",
    gateClose: 'Pas maintenant',

    printBtn: 'Imprimer le terrain en papier',
    sheetTitle: 'Terrain en papier à découper et à plier',
    sheetNote: "Découpe le contour et plie sur les pointillés pour que le terrain tienne debout. Écris les deux nombres ronds dans les cuvettes. Pose un vrai caillou n'importe où sur une pente : il descend dans une cuvette. Pose-le sur la crête : il reste. C'est tout l'intérêt."
  },

  es: {
    title: 'La colina del redondeo',
    instruction: 'Coloca el guijarro en el terreno y suéltalo. Baja rodando hasta la hondonada más cercana, salvo que quede sobre la cresta: allí ningún lado está más bajo, no cae solo, y es para qué sirve el número lo que decide hacia dónde va.',

    ariaGround: 'Terreno con una hondonada en cada extremo y una cresta en el medio.',
    ariaStone: 'el guijarro con el número {n}',
    ariaStoneRest: 'el guijarro con el número {n}, parado en la hondonada {d}',
    ariaRidge: 'la cresta, a mitad de camino entre las dos hondonadas',
    ariaTilt: 'la cresta, inclinada por la clase hacia {d}',

    setSpan: 'Qué terreno',
    spanTens: 'entre dos decenas',
    spanHundreds: 'entre dos centenas',

    lessBig: 'Mover el guijarro mucho hacia la izquierda',
    lessOne: 'Mover el guijarro un poco hacia la izquierda',
    moreOne: 'Mover el guijarro un poco hacia la derecha',
    moreBig: 'Mover el guijarro mucho hacia la derecha',
    letGo: 'Soltar',
    tiltDown: 'Inclinar la cresta hacia la hondonada de abajo',
    tiltUp: 'Inclinar la cresta hacia la hondonada de arriba',
    clearTilt: 'Ahora el número sirve para otra cosa: dejar la cresta recta otra vez',
    again: 'Otro guijarro',

    saidSet: '{n}',
    saidSettled: '{n} baja hasta la hondonada {d}.',
    saidTeeter: '{n} está sobre la cresta. Ningún lado está más bajo, así que el guijarro no cae solo. ¿Para qué sirven estos números y hacia dónde debe inclinar eso la cresta?',
    saidTiltSet: 'La clase ha inclinado la cresta hacia {d}, para lo que se están usando estos números. Cada guijarro que quede justo sobre la cresta irá hacia ese lado hasta que eso cambie.',
    saidTiltClear: 'La cresta vuelve a estar recta. ¿Para qué sirven ahora estos números? El guijarro se balanceará hasta que la clase vuelva a inclinarla.',
    saidAlready: 'Esto no cambia nada. Coloca un guijarro nuevo.',
    saidAlreadyLevel: 'La cresta ya está recta.',
    saidAlreadySet: 'La cresta ya está inclinada hacia ese lado.',
    saidTiltClearOff: 'La cresta vuelve a estar recta. El próximo guijarro que quede sobre ella se balanceará.',
    saidEdge: 'El terreno termina en {n}.',

    gateTitle: 'El terreno de papel',
    gateBody: 'Todo el aparato es gratuito: cada ladera, el balanceo y la inclinación de la cresta. El Plan Docente añade el terreno de papel para recortar y plegar, que se sostiene sobre la mesa: un niño puede poner un guijarro de verdad sobre la cresta y ver que de verdad no cae.',
    gateCta: 'Ver el Plan Docente',
    gateClose: 'Ahora no',

    printBtn: 'Imprimir el terreno de papel',
    sheetTitle: 'Terreno de papel para recortar y plegar',
    sheetNote: 'Recorta por el contorno y pliega por las líneas de puntos para que el terreno se sostenga. Escribe los dos números redondos en las hondonadas. Pon un guijarro de verdad en cualquier punto de una ladera y bajará a una hondonada; ponlo sobre la cresta y se quedará ahí, que es de lo que se trata.'
  },

  pt: {
    title: 'A colina do arredondamento',
    instruction: 'Apoie o seixo no terreno e solte. Ele desce até a cova mais próxima — a não ser que pare sobre a crista: ali nenhum lado está mais baixo, ele não cai sozinho, e é para que serve o número que decide para que lado ele vai.',

    ariaGround: 'Terreno com uma cova em cada ponta e uma crista no meio.',
    ariaStone: 'o seixo com o número {n}',
    ariaStoneRest: 'o seixo com o número {n}, parado na cova {d}',
    ariaRidge: 'a crista, na metade do caminho entre as duas covas',
    ariaTilt: 'a crista, inclinada pela turma para {d}',

    setSpan: 'Qual terreno',
    spanTens: 'entre duas dezenas',
    spanHundreds: 'entre duas centenas',

    lessBig: 'Mover o seixo bem para a esquerda',
    lessOne: 'Mover o seixo um pouco para a esquerda',
    moreOne: 'Mover o seixo um pouco para a direita',
    moreBig: 'Mover o seixo bem para a direita',
    letGo: 'Soltar',
    tiltDown: 'Inclinar a crista para a cova de baixo',
    tiltUp: 'Inclinar a crista para a cova de cima',
    clearTilt: 'Agora o número serve para outra coisa — deixar a crista reta de novo',
    again: 'Outro seixo',

    saidSet: '{n}',
    saidSettled: '{n} desce até a cova {d}.',
    saidTeeter: '{n} está sobre a crista. Nenhum lado está mais baixo, então o seixo não cai sozinho. Para que servem estes números — e para que lado isso deve inclinar a crista?',
    saidTiltSet: 'A turma inclinou a crista para {d}, pelo que estes números estão servindo agora. Cada seixo que parar bem sobre a crista vai para esse lado até isso mudar.',
    saidTiltClear: 'A crista está reta de novo. Para que servem estes números agora? O seixo fica balançando até a turma inclinar de novo.',
    saidAlready: 'Isso não muda nada aqui. Apoie um seixo novo.',
    saidAlreadyLevel: 'A crista já está reta.',
    saidAlreadySet: 'A crista já está inclinada para esse lado.',
    saidTiltClearOff: 'A crista está reta de novo. O próximo seixo que parar sobre ela vai ficar balançando.',
    saidEdge: 'O terreno termina em {n}.',

    gateTitle: 'O terreno de papel',
    gateBody: 'O aparelho inteiro é gratuito: cada ladeira, o balanço e a inclinação da crista. O Plano Professor acrescenta o terreno de papel para recortar e dobrar, que fica em pé na mesa: a criança pode colocar um seixo de verdade sobre a crista e ver que ele realmente não cai.',
    gateCta: 'Conhecer o Plano Professor',
    gateClose: 'Agora não',

    printBtn: 'Imprimir o terreno de papel',
    sheetTitle: 'Terreno de papel para recortar e dobrar',
    sheetNote: 'Recorte pelo contorno e dobre nas linhas pontilhadas para o terreno ficar em pé. Escreva os dois números redondos nas covas. Coloque um seixo de verdade em qualquer ponto de uma ladeira e ele desce até uma cova; coloque sobre a crista e ele fica lá, que é justamente a questão.'
  },

  it: {
    title: "La collina dell'arrotondamento",
    instruction: 'Appoggia il ciottolo sul terreno e lascialo andare. Scende nella conca più vicina, a meno che non si fermi sulla cresta: lì nessun lato è più basso, non cade da solo, ed è a che cosa serve il numero a decidere da che parte va.',

    ariaGround: 'Terreno con una conca a ogni estremità e una cresta nel mezzo.',
    ariaStone: 'il ciottolo con il numero {n}',
    ariaStoneRest: 'il ciottolo con il numero {n}, fermo nella conca {d}',
    ariaRidge: 'la cresta, a metà strada tra le due conche',
    ariaTilt: 'la cresta, inclinata dalla classe verso {d}',

    setSpan: 'Quale terreno',
    spanTens: 'tra due decine',
    spanHundreds: 'tra due centinaia',

    lessBig: 'Sposta il ciottolo molto a sinistra',
    lessOne: 'Sposta il ciottolo un poco a sinistra',
    moreOne: 'Sposta il ciottolo un poco a destra',
    moreBig: 'Sposta il ciottolo molto a destra',
    letGo: 'Lascia andare',
    tiltDown: 'Inclina la cresta verso la conca più bassa',
    tiltUp: 'Inclina la cresta verso la conca più alta',
    clearTilt: 'Ora il numero serve per altro – rimetti la cresta dritta',
    again: 'Un altro ciottolo',

    saidSet: '{n}',
    saidSettled: '{n} scende nella conca {d}.',
    saidTeeter: '{n} è sulla cresta. Nessun lato è più basso, quindi il ciottolo non cade da solo. A che cosa servono questi numeri — e da che parte deve far pendere la cresta?',
    saidTiltSet: "La classe ha inclinato la cresta verso {d}, per ciò a cui servono ora questi numeri. Ogni ciottolo che si ferma esattamente sulla cresta andrà da quella parte finché non cambia.",
    saidTiltClear: "La cresta è di nuovo dritta. A che cosa servono ora questi numeri? Il ciottolo oscilla finché la classe non la inclina di nuovo.",
    saidAlready: 'Questo non cambia nulla. Appoggia un nuovo ciottolo.',
    saidAlreadyLevel: 'La cresta è già dritta.',
    saidAlreadySet: 'La cresta pende già da quella parte.',
    saidTiltClearOff: 'La cresta è di nuovo dritta. Il prossimo ciottolo che si fermerà lì oscillerà.',
    saidEdge: 'Il terreno finisce a {n}.',

    gateTitle: 'Il terreno di carta',
    gateBody: "Tutto l'apparecchio è gratuito: ogni pendio, l'oscillazione e l'inclinazione della cresta. Il Piano Insegnante aggiunge il terreno di carta da ritagliare e piegare, che sta in piedi sul banco: un bambino può posare un ciottolo vero sulla cresta e vedere che davvero non cade.",
    gateCta: 'Scopri il Piano Insegnante',
    gateClose: 'Non ora',

    printBtn: 'Stampa il terreno di carta',
    sheetTitle: 'Terreno di carta da ritagliare e piegare',
    sheetNote: 'Ritaglia lungo il contorno e piega sulle linee tratteggiate, così il terreno sta in piedi. Scrivi i due numeri tondi nelle conche. Posa un ciottolo vero in un punto qualsiasi di un pendio e scenderà in una conca; posalo sulla cresta e resterà lì, ed è tutto qui.'
  },

  nl: {
    title: 'De afrondingsheuvel',
    instruction: 'Zet de kei op de grond en laat los. Hij rolt naar de dichtstbijzijnde kuil — tenzij hij op de bult blijft liggen: daar is geen kant lager, hij valt niet vanzelf, en waar het getal vóór dient bepaalt welke kant hij op gaat.',

    ariaGround: 'Grond met aan elk uiteinde een kuil en een bult in het midden.',
    ariaStone: 'de kei met het getal {n}',
    ariaStoneRest: 'de kei met het getal {n}, in kuil {d}',
    ariaRidge: 'de bult, precies tussen de twee kuilen in',
    ariaTilt: 'de bult, door de klas naar {d} gekanteld',

    setSpan: 'Welke grond',
    spanTens: 'tussen twee tientallen',
    spanHundreds: 'tussen twee honderdtallen',

    lessBig: 'De kei ver naar links schuiven',
    lessOne: 'De kei een beetje naar links schuiven',
    moreOne: 'De kei een beetje naar rechts schuiven',
    moreBig: 'De kei ver naar rechts schuiven',
    letGo: 'Loslaten',
    tiltDown: 'De bult naar de onderste kuil laten hellen',
    tiltUp: 'De bult naar de bovenste kuil laten hellen',
    clearTilt: 'Het getal dient nu voor iets anders — de bult weer recht zetten',
    again: 'Nog een kei',

    saidSet: '{n}',
    saidSettled: '{n} rolt in kuil {d}.',
    saidTeeter: '{n} ligt op de bult. Geen kant is lager, dus de kei valt niet vanzelf. Waar dienen deze getallen voor — en naar welke kant moet dat de bult laten hellen?',
    saidTiltSet: 'De klas heeft de bult naar {d} laten hellen, voor waar deze getallen nu voor dienen. Elke kei die precies op de bult belandt, gaat die kant op tot dat verandert.',
    saidTiltClear: 'De bult staat weer recht. Waar dienen deze getallen nu voor? De kei wiebelt tot de klas hem opnieuw laat hellen.',
    saidAlready: 'Dit verandert hier niets. Zet een nieuwe kei neer.',
    saidAlreadyLevel: 'De bult staat al recht.',
    saidAlreadySet: 'De bult helt al naar die kant.',
    saidTiltClearOff: 'De bult staat weer recht. De volgende kei die erop belandt, gaat wiebelen.',
    saidEdge: 'De grond houdt op bij {n}.',

    gateTitle: 'De papieren grond',
    gateBody: 'Het hele apparaat is gratis: elke helling, het wiebelen en het instellen van de bult. Het Leerkracht-abonnement voegt de papieren grond toe om uit te knippen en te vouwen, zodat hij op tafel blijft staan en een kind een echte kei op de bult kan leggen en ziet dat hij er echt niet af valt.',
    gateCta: 'Bekijk het Leerkracht-abonnement',
    gateClose: 'Nu niet',

    printBtn: 'Papieren grond afdrukken',
    sheetTitle: 'Papieren grond om uit te knippen en te vouwen',
    sheetNote: 'Knip langs de rand en vouw op de stippellijnen, zodat de grond blijft staan. Schrijf de twee ronde getallen in de kuilen. Leg een echte kei ergens op een helling: hij rolt naar een kuil. Leg hem op de bult: hij blijft liggen — en daar gaat het om.'
  },

  sv: {
    title: 'Avrundningskullen',
    instruction: 'Sätt ner stenbumlingen på marken och släpp. Den rullar ner i närmaste grop – om den inte hamnar på krönet: där är ingen sida lägre, den rullar inte av sig själv, och vad talet ska användas till avgör åt vilket håll den går.',

    ariaGround: 'Mark med en grop i vardera änden och ett krön i mitten.',
    ariaStone: 'stenbumlingen med talet {n}',
    ariaStoneRest: 'stenbumlingen med talet {n}, ligger i gropen {d}',
    ariaRidge: 'krönet, mitt emellan de två groparna',
    ariaTilt: 'krönet, lutat av klassen mot {d}',

    setSpan: 'Vilken mark',
    spanTens: 'mellan två tiotal',
    spanHundreds: 'mellan två hundratal',

    lessBig: 'Flytta stenbumlingen långt åt vänster',
    lessOne: 'Flytta stenbumlingen lite åt vänster',
    moreOne: 'Flytta stenbumlingen lite åt höger',
    moreBig: 'Flytta stenbumlingen långt åt höger',
    letGo: 'Släpp',
    tiltDown: 'Luta krönet mot den lägre gropen',
    tiltUp: 'Luta krönet mot den högre gropen',
    clearTilt: 'Talet ska användas till något annat nu – räta upp krönet igen',
    again: 'En ny stenbumling',

    saidSet: '{n}',
    saidSettled: '{n} rullar ner i gropen {d}.',
    saidTeeter: '{n} ligger på krönet. Ingen sida är lägre, så stenbumlingen rullar inte av sig själv. Vad ska de här talen användas till – och åt vilket håll ska det luta krönet?',
    saidTiltSet: 'Klassen har lutat krönet mot {d}, för det som de här talen används till nu. Varje stenbumling som hamnar precis på krönet går åt det hållet tills det ändras.',
    saidTiltClear: 'Krönet är rakt igen. Vad ska de här talen användas till nu? Stenbumlingen vacklar tills klassen lutar krönet på nytt.',
    saidAlready: 'Det här ändrar ingenting. Sätt ner en ny stenbumling.',
    saidAlreadyLevel: 'Krönet är redan rakt.',
    saidAlreadySet: 'Krönet lutar redan åt det hållet.',
    saidTiltClearOff: 'Krönet är rakt igen. Nästa stenbumling som hamnar där kommer att vackla.',
    saidEdge: 'Marken tar slut vid {n}.',

    gateTitle: 'Marken i papper',
    gateBody: 'Hela apparaten är gratis – varje sluttning, vacklandet och att luta krönet. Lärarplanen lägger till marken i papper att klippa ut och vika, så att den står på bordet och ett barn kan lägga en riktig stenbumling på krönet och se att den verkligen ligger kvar.',
    gateCta: 'Läs om Lärarplanen',
    gateClose: 'Inte nu',

    printBtn: 'Skriv ut marken i papper',
    sheetTitle: 'Mark i papper att klippa ut och vika',
    sheetNote: 'Klipp längs kanten och vik på de streckade linjerna så att marken står upp. Skriv de två runda talen i groparna. Lägg en riktig stenbumling var som helst på en sluttning – den rullar ner i en grop. Lägg den på krönet – den ligger kvar, och det är hela poängen.'
  },

  da: {
    title: 'Afrundingshøjen',
    instruction: 'Sæt kampestenen på terrænet og slip. Den ruller ned i den nærmeste fordybning — medmindre den bliver liggende på højderyggen: dér er ingen side lavere, den falder ikke af sig selv, og hvad tallet skal bruges til afgør, hvilken vej den går.',

    ariaGround: 'Terræn med en fordybning i hver ende og en højderyg i midten.',
    ariaStone: 'kampestenen med tallet {n}',
    ariaStoneRest: 'kampestenen med tallet {n}, ligger i fordybningen {d}',
    ariaRidge: 'højderyggen, midt mellem de to fordybninger',
    ariaTilt: 'højderyggen, som klassen har hældt mod {d}',

    setSpan: 'Hvilket terræn',
    spanTens: 'mellem to tiere',
    spanHundreds: 'mellem to hundreder',

    lessBig: 'Flyt kampestenen langt til venstre',
    lessOne: 'Flyt kampestenen lidt til venstre',
    moreOne: 'Flyt kampestenen lidt til højre',
    moreBig: 'Flyt kampestenen langt til højre',
    letGo: 'Slip',
    tiltDown: 'Hæld højderyggen mod den lavere fordybning',
    tiltUp: 'Hæld højderyggen mod den højere fordybning',
    clearTilt: 'Tallet skal bruges til noget andet nu – ret højderyggen op igen',
    again: 'En ny kampesten',

    saidSet: '{n}',
    saidSettled: '{n} ruller ned i fordybningen {d}.',
    saidTeeter: '{n} ligger på højderyggen. Ingen side er lavere, så kampestenen falder ikke af sig selv. Hvad skal de her tal bruges til — og hvilken vej skal det hælde højderyggen?',
    saidTiltSet: 'Klassen har hældt højderyggen mod {d}, ud fra hvad de her tal bruges til nu. Hver kampesten, der lander præcis på højderyggen, går den vej, indtil det ændrer sig.',
    saidTiltClear: 'Højderyggen er rank igen. Hvad skal de her tal bruges til nu? Kampestenen vakler, indtil klassen hælder den på ny.',
    saidAlready: 'Det ændrer ikke noget her. Sæt en ny kampesten ned.',
    saidAlreadyLevel: 'Højderyggen er allerede rank.',
    saidAlreadySet: 'Højderyggen hælder allerede den vej.',
    saidTiltClearOff: 'Højderyggen er rank igen. Den næste kampesten, der lander på den, vakler.',
    saidEdge: 'Terrænet stopper ved {n}.',

    gateTitle: 'Papirterrænet',
    gateBody: 'Hele apparatet er gratis – hver skråning, vaklen og det at hælde højderyggen. Lærerabonnementet tilføjer papirterrænet til at klippe ud og folde, så det står på bordet, og et barn kan lægge en rigtig kampesten på højderyggen og se, at den virkelig bliver liggende.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nu',

    printBtn: 'Udskriv papirterrænet',
    sheetTitle: 'Papirterræn til at klippe ud og folde',
    sheetNote: 'Klip langs kanten og fold på de stiplede linjer, så terrænet står op. Skriv de to runde tal i fordybningerne. Læg en rigtig kampesten et vilkårligt sted på en skråning – den ruller ned i en fordybning. Læg den på højderyggen – den bliver liggende, og det er hele pointen.'
  },

  no: {
    title: 'Avrundingskollen',
    instruction: 'Sett kampesteinen ned på terrenget og slipp. Den triller ned i den nærmeste gropa — med mindre den blir liggende på høyderyggen: der er ingen side lavere, den faller ikke av seg selv, og hva tallet skal brukes til avgjør hvilken vei den går.',

    ariaGround: 'Terreng med ei grop i hver ende og en høyderygg i midten.',
    ariaStone: 'kampesteinen med tallet {n}',
    ariaStoneRest: 'kampesteinen med tallet {n}, ligger i gropa {d}',
    ariaRidge: 'høyderyggen, midt mellom de to gropene',
    ariaTilt: 'høyderyggen, som klassen har helt mot {d}',

    setSpan: 'Hvilket terreng',
    spanTens: 'mellom to tiere',
    spanHundreds: 'mellom to hundrere',

    lessBig: 'Flytt kampesteinen langt til venstre',
    lessOne: 'Flytt kampesteinen litt til venstre',
    moreOne: 'Flytt kampesteinen litt til høyre',
    moreBig: 'Flytt kampesteinen langt til høyre',
    letGo: 'Slipp',
    tiltDown: 'Hell høyderyggen mot den lavere gropa',
    tiltUp: 'Hell høyderyggen mot den høyere gropa',
    clearTilt: 'Tallet skal brukes til noe annet nå – rett opp høyderyggen igjen',
    again: 'En ny kampestein',

    saidSet: '{n}',
    saidSettled: '{n} triller ned i gropa {d}.',
    saidTeeter: '{n} ligger på høyderyggen. Ingen side er lavere, så kampesteinen faller ikke av seg selv. Hva skal disse tallene brukes til — og hvilken vei skal det helle høyderyggen?',
    saidTiltSet: 'Klassen har helt høyderyggen mot {d}, ut fra hva disse tallene brukes til nå. Hver kampestein som havner nøyaktig på høyderyggen, går den veien til det endrer seg.',
    saidTiltClear: 'Høyderyggen er rett igjen. Hva skal disse tallene brukes til nå? Kampesteinen vakler til klassen heller den på nytt.',
    saidAlready: 'Dette endrer ingenting her. Sett ned en ny kampestein.',
    saidAlreadyLevel: 'Høyderyggen er allerede rett.',
    saidAlreadySet: 'Høyderyggen heller allerede den veien.',
    saidTiltClearOff: 'Høyderyggen er rett igjen. Den neste kampesteinen som havner der, vakler.',
    saidEdge: 'Terrenget slutter ved {n}.',

    gateTitle: 'Papirterrenget',
    gateBody: 'Hele apparatet er gratis – hver skråning, vaklingen og det å helle høyderyggen. Lærerabonnementet legger til papirterrenget til å klippe ut og brette, så det står på pulten, og et barn kan legge en ekte kampestein på høyderyggen og se at den virkelig blir liggende.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nå',

    printBtn: 'Skriv ut papirterrenget',
    sheetTitle: 'Papirterreng til å klippe ut og brette',
    sheetNote: 'Klipp langs kanten og brett på de stiplede linjene, så terrenget står. Skriv de to runde tallene i gropene. Legg en ekte kampestein hvor som helst i en skråning – den triller ned i ei grop. Legg den på høyderyggen – den blir liggende, og det er hele poenget.'
  },

  fi: {
    title: 'Pyöristysmäki',
    instruction: 'Aseta lohkare maastoon ja päästä irti. Se vierii lähimpään kuoppaan – paitsi jos se jää harjanteelle: siellä kumpikaan puoli ei ole alempana, lohkare ei lähde itsestään liikkeelle, ja se, mihin lukua tarvitaan, ratkaisee kumpaan suuntaan se menee.',

    ariaGround: 'Maasto, jonka kummassakin päässä on kuoppa ja keskellä harjanne.',
    ariaStone: 'lohkare, jossa lukee {n}',
    ariaStoneRest: 'lohkare, jossa lukee {n}, lepää kuopassa {d}',
    ariaRidge: 'harjanne, tasan kahden kuopan puolivälissä',
    ariaTilt: 'harjanne, jonka luokka on kallistanut lukua {d} kohti',

    setSpan: 'Mikä maasto',
    spanTens: 'kahden kymmenen välissä',
    spanHundreds: 'kahden sadan välissä',

    lessBig: 'Siirrä lohkaretta paljon vasemmalle',
    lessOne: 'Siirrä lohkaretta vähän vasemmalle',
    moreOne: 'Siirrä lohkaretta vähän oikealle',
    moreBig: 'Siirrä lohkaretta paljon oikealle',
    letGo: 'Päästä irti',
    tiltDown: 'Kallista harjanne alempaa kuoppaa kohti',
    tiltUp: 'Kallista harjanne ylempää kuoppaa kohti',
    clearTilt: 'Lukua tarvitaan nyt johonkin muuhun – suorista harjanne taas tasaiseksi',
    again: 'Uusi lohkare',

    saidSet: '{n}',
    saidSettled: '{n} vierii kuoppaan {d}.',
    saidTeeter: '{n} on harjanteella. Kumpikaan puoli ei ole alempana, joten lohkare ei lähde itsestään liikkeelle. Mihin näitä lukuja tarvitaan – ja kumpaan suuntaan sen pitäisi kallistaa harjanne?',
    saidTiltSet: 'Luokka on kallistanut harjanteen lukua {d} kohti sen mukaan, mihin näitä lukuja nyt tarvitaan. Jokainen lohkare, joka jää tarkalleen harjanteelle, menee sinne, kunnes se muuttuu.',
    saidTiltClear: 'Harjanne on taas tasainen. Mihin näitä lukuja nyt tarvitaan? Lohkare huojuu, kunnes luokka kallistaa harjanteen uudelleen.',
    saidAlready: 'Tämä ei muuta tässä mitään. Aseta uusi lohkare maastoon.',
    saidAlreadyLevel: 'Harjanne on jo tasainen.',
    saidAlreadySet: 'Harjanne kallistuu jo siihen suuntaan.',
    saidTiltClearOff: 'Harjanne on taas tasainen. Seuraava harjanteelle jäävä lohkare huojuu.',
    saidEdge: 'Maasto loppuu lukuun {n}.',

    gateTitle: 'Paperinen maasto',
    gateBody: 'Koko laite on ilmainen – jokainen rinne, huojunta ja harjanteen kallistaminen. Opettajatilaus lisää paperisen maaston, jonka voi leikata ja taittaa pystyyn pöydälle: lapsi voi asettaa oikean lohkareen harjanteelle ja nähdä, ettei se todellakaan lähde liikkeelle.',
    gateCta: 'Tutustu Opettajatilaukseen',
    gateClose: 'Ei nyt',

    printBtn: 'Tulosta paperinen maasto',
    sheetTitle: 'Paperinen maasto leikattavaksi ja taitettavaksi',
    sheetNote: 'Leikkaa ääriviivaa pitkin ja taita katkoviivoista, niin maasto seisoo pystyssä. Kirjoita kuoppiin kaksi tasalukua. Aseta oikea lohkare mihin tahansa kohtaan rinnettä – se vierii kuoppaan. Aseta se harjanteelle – se jää siihen, ja siinä on koko juju.'
  }
};
