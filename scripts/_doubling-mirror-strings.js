/* =====================================================================
   TOOL #54 — THE DOUBLING MIRROR — the ten non-English string sets
   =====================================================================
   Rebuilt, never translated. 32 keys per locale, read dynamically off
   `require('mini tools/doubling-mirror.js').strings`; every {n} {d} {t}
   {a} {b} {s} placeholder preserved per key.

   ⚠⚠ READ THE DEFECT REPORT FIRST. Five of these keys describe a state
   the model cannot reach, and two more are FALSE about the model as
   shipped. Where the English is false, the ten locales are TRUE and the
   English needs correcting — the panels do not reproduce a defect in ten
   languages to keep parity with one. The three divergences are named
   individually at the bottom of this docblock.

   ---------------------------------------------------------------------
   THE NOUNS — every locale names the apparatus for THE HINGE
   ---------------------------------------------------------------------
   Not a stylistic preference: a measurement. The tray nouns are almost
   all taken as registered part-names by neighbouring tools —

     Tablett 10 (fraction-kitchen, center-board, our-day) · plateau 13
     (lids, money-core, measurement-bench, fraction-kitchen) · bandeja 10
     (baking-tray, money-core, letter-tiles) · vassoio 4 · bricka 11
     (counting-cups, number-sieve, number-balance) · bakke 11 · tarjotin 2

   — and Norwegian `brett` is the worst of them: it is BOTH the tray AND
   `folding-sheet`'s own fold verb (14 hits: "Brett", "brettelinjen").
   A Norwegian tray would have been the sibling tool's headline word.

   `hinge`, meanwhile, measured 0 in all ten (0 in English too):
     Scharnier · charnière · bisagra · dobradiça · cerniera · scharnier ·
     gångjärn · hængsel · hengsel · sarana
   The header's own ruling put a hinge where the glass was; naming the
   apparatus for it sidesteps every tray collision at once, including
   the Norwegian one, and costs nothing.

   THE LEAVES — a hinged-leaf word, free per locale, chosen against the
   shelf rather than against English (so they are ten unrelated words,
   not one word respelled ten times):
     de  die Flügel      — the leaf of a double door (Flügeltür). Free in
                           tools (4 hits, all story/activity JSON).
                           ⛔ NOT `Klappe` — pattern-bench + syllable-splitter.
                           ⛔ NOT `Blatt` (20) — and it is `folding-sheet`'s register.
     fr  les battants    — 0 hits. The exact word for the leaf of a
                           double door. ⛔ NOT `volet` (fraction-kitchen).
     es  las alas        — 0 hits in the Spanish forms (`el ala`, `las
                           alas`); the earlier 14 were other languages'
                           words matching a bare \bala\b. "Mesa de alas
                           abatibles" is the ordinary Spanish for exactly
                           this object. ⛔ NOT `hoja` — folding-sheet's.
                           ⚠ el ala / las alas / el ala CERCANA: masculine
                           article in the singular, feminine agreement.
     pt  as abas         — 1 hit (a landing file). "aba da frente / aba de
                           trás" is more natural for a child than any
                           near/far calque.
     it  le ante         — l'anta di un armadio. The 5 hits are other
                           languages' words inside es/fr/sv files.
     nl  de kleppen      — 1 hit (a Dutch deck word list).
                           ⛔ NOT `blad` (24) — and it is folding-sheet's.
     sv  klaffarna       — 0. bordsklaff is the hinged table leaf.
     da  fløjene         — 1 hit (a picture-word-wall noun list). A
                           double door "med to fløje".
                           ⛔ NOT `klap` (folding-wall, pattern-bench,
                           syllable-splitter). ⛔⛔ NOT `lem`: it is a
                           hatch AND crude Danish slang for a body part.
     no  klaffene        — 0. bordklaff. And it keeps `brett` untouched.
     fi  siivet          — ovensiipi, the leaf of a door.
                           ⛔ NOT `läppä` (8: learning-clock, number-balance,
                           pair-gate, rounding-hill, sorting-hoops).

   THE OBJECTS — `counter` is taken in all eleven, so the disc family:
     fr disques · it dischi · nl schijven · sv skivor · da skiver ·
     no skiver   — all measured 0.
     de Scheiben — 2 hits, both the class-timer's CLOCK disc in landing
                   prose, a different sense in a different tool.
                   ⛔ NOT `Plättchen` (15) — that is the shelf's German
                   counter word (counting-cups, lids, number-bond-core,
                   number-sieve, number-balance).
     es chapas   — 0. `disco` 25, `ficha` 22, `círculo` 19 all taken.
     pt pastilhas— 0. Same three taken; deliberately unrelated to the
                   Spanish choice.
     fi kiekot   — the one near-collision I accepted and am flagging:
                   3 hits, of which one is a real tool (class-timer, for
                   a clock WEDGE) and two are vocabulary/landing files.
                   Every alternative was a harder collision — `nappula` 6,
                   `pala` 18, `laatta` 3, `nappi` 2 (lids).

   THE ODD ONE — described by having no partner, never by the parity
   adjective. That is what the model actually holds (`odd` is a single
   unpartnered token, and `outside()` can never exceed 1), it keeps the
   tool off `pariton/udda/ungerade` which several activities own, and it
   avoids telling a six-year-old that one disc is the wrong kind.

   ⛔⛔ MIRROR APPEARS IN NO LOCALE. `folding-sheet.js` (#35) ships
   Spiegel / miroir / espejo / espelho / specchio / spiegel / spegeln /
   spejlet / speilet / peili as its own registered part-name, and #35 was
   itself renamed FROM "Mirror Bench". The English product name is the
   operator's and stays; nothing else carries it.

   ---------------------------------------------------------------------
   ⚠⚠ THE es/pt STRUCTURAL TRAP, AND HOW IT IS SOLVED
   ---------------------------------------------------------------------
   `doblar` and `dobrar` mean BOTH *to fold* and *to double*, and both
   are `folding-sheet`'s shipped verbs (es foldBtn "Doblar", creaseLabel
   "El doblez"; pt foldBtn "Dobrar", title "A folha que dobra"). The
   subject of THIS tool therefore collides with a sibling's part-name in
   exactly two languages.

   Solved by splitting on PART OF SPEECH, which is where the two senses
   actually diverge in classroom register:

     * the VERB is the sibling's.  es `doblar`, pt `dobrar` appear NOWHERE
       in these ten sets — not once, including in the paper-sheet
       instructions, where "fold along the middle" is rewritten as
       "marquen bien la línea del medio" / "marque bem a linha do meio".
     * the NOUN is ours.  es «el doble», pt «o dobro» — which is what a
       Spanish or Brazilian primary teacher says anyway ("¿cuál será el
       doble?", "quanto vai dar o dobro?"). It is a QUANTITY word, not a
       part name, so it does not enter the fence.
     * the PART is the hinge.  es «la bisagra» (0), pt «a dobradiça» (0).

   ⚠ On `dobradiça`: yes, it is morphologically from *dobrar*. It is also
   completely lexicalised — a Brazilian six-year-old knows it as the
   metal thing on a door, not as a fold-derivative — and it is the only
   natural Portuguese word for the object. Accepting it is deliberate.
   The pt set therefore contains three dobr- items in total (dobradiça,
   dobro) and ZERO instances of the verb the sibling owns.

   ⚠ The same rewrite was needed in every locale, for the same reason in
   miniature — `folding-sheet` owns the fold verb everywhere. The paper
   instruction says SCORE, not fold, in all ten: de "ritzt an", fr
   "marquez bien", es "marquen bien", pt "marque bem", it "incidete", nl
   "druk goed aan", sv "ritsa", da "rids", no "riss opp", fi "uurtakaa".

   ---------------------------------------------------------------------
   SCANDINAVIAN DEFINITE FORMS — checked, per the `banan` rule
   ---------------------------------------------------------------------
     sv  gångjärn (ett) → gångjärnet · klaff (en) → klaffen, klaffarna
         · skiva (en) → skivan, skivorna
     da  hængsel (et) → hængslet  ⚠ e-elides; "hængselet" is wrong
         · fløj (en) → fløjen, fløjene · skive (en) → skiven, skiverne
     no  hengsel (et) → hengslet · klaff (en) → klaffen, klaffene
         · skive (en) → skiven, skivene
   No definite form lands on another word. `fløj` is a homograph of the
   past tense of *at flyve*; in "den nærmeste fløj" it cannot be read as
   a verb, and the alternative (`lem`) was rejected outright as slang.

   ---------------------------------------------------------------------
   FINNISH CASE
   ---------------------------------------------------------------------
   No fill-in slot takes a nominative by default. Where a numeral would
   force a partitive/nominative choice the model cannot make ({n} runs
   0..9 and 1 alone takes the nominative), the sentence is rebuilt as a
   predicate or a colon-list so it is grammatical for every value:
     saidPlace  «Lähemmällä siivellä: {n}.»
     saidClosed «Siivillä {n} ja {n}. Yhteensä {d}.»
     saidFull   «Lähemmällä siivellä on {n}, eikä enempää mahdu.»
   Adessive/ablative elsewhere: siivelle / siivellä / siiveltä.

   ---------------------------------------------------------------------
   PAID PLAN NAME — measured, not assumed
   ---------------------------------------------------------------------
   Read from frontend/messages/<loc>.json → homepageV6.planTag:
     de Lehrkraft-Abo · fr Abonnement Enseignant · es Plan Docente ·
     pt Plano Professor · it Piano Insegnante · nl Leerkracht-abonnement ·
     sv Lärarplanen · da Lærerabonnementet · no Lærerabonnementet ·
     fi Opettajatilaus
   All ten verified; none says "Premium". (en is "Teacher plan", which
   the tool's own English already gets right.)

   ---------------------------------------------------------------------
   ⚠⚠ THREE PLACES THESE SETS DELIBERATELY DIVERGE FROM THE ENGLISH
   ---------------------------------------------------------------------
   1. `again` — English "Clear the tray" is FALSE. `reset()` calls
      `newState()`, which puts 3 (or 7) discs back. The ten say "start
      again", which is what happens.
   2. `startTen` — English "up to ten" is FALSE twice: it sets near = 7,
      and GEO.CAP = 9, so ten is unreachable on a leaf. The ten name the
      actual starting count ("seven discs"), which also makes the pair
      with `startSmall` legible as two start values rather than a range.
   3. `gateBody` — English sells "the odd one's side" as a free feature.
      It does not exist (see defect 1). The ten sell the counting, the
      closing and the opening, and nothing else.

   ---------------------------------------------------------------------
   ⚠⚠ `saidOddPlaced` CANNOT BE MADE CORRECT IN ANY LANGUAGE
   ---------------------------------------------------------------------
   `_side()` feeds {s} a BARE DIGIT — `s: dir < 0 ? '1' : '2'` at
   doubling-mirror.js:425. English renders "went to the 1 leaf", which is
   not English, and no locale can rescue a numeral standing where a word
   belongs. Below, {s} is placed so it at least parses as a leaf ordinal
   ("Flügel {s}", "aba {s}", "klaff {s}"), which is a compromise, not a
   fix: the leaves carry no numeral anywhere on the apparatus, so "leaf 2"
   names nothing the child can see.

   THE FIX is two keys and one line. Add `sideNameNear`/`sideNameFar`,
   change the call site to `s: this.api.t(dir < 0 ? 'sideNameNear' : 'sideNameFar')`,
   and drop these in — they are already consistent with the sets below:

     de {near:'nahen',      far:'fernen'}        → "auf dem nahen Flügel"
     fr {near:'proche',     far:'opposé'}
     es {near:'cercana',    far:'lejana'}
     pt {near:'da frente',  far:'de trás'}
     it {near:'vicina',     far:'lontana'}
     nl {near:'aan jouw kant', far:'aan de overkant'}
     sv {near:'närmaste',   far:'bortre'}
     da {near:'nærmeste',   far:'fjerneste'}
     no {near:'nærmeste',   far:'borterste'}
     fi {near:'lähemmällä', far:'kauemmalla'}

   (Not exported here: adding keys the tool does not declare would break
   any strict key-parity gate. They are values waiting for a patch.)
   ===================================================================== */

module.exports = {

  /* ── de ── Das Scharnier · die Flügel · die Scheiben ──────────────── */
  de: {
    title: 'Das Scharnier',
    instruction: 'Legt Scheiben auf den nahen Flügel und sagt, wie viel das Doppelte sein wird. Dann schließt das Scharnier — der ferne Flügel bekommt noch einmal genauso viele, und ihr könnt jede einzelne zählen.',

    ariaTray: 'Zwei Flügel mit einem Scharnier dazwischen.',
    ariaNear: 'der nahe Flügel, {n}',
    ariaFar: 'der ferne Flügel, {n}',
    ariaOdd: 'eine Scheibe ohne Partner, sie wartet auf einen Flügel',

    setStart: 'Womit das Scharnier anfängt',
    startSmall: 'mit drei Scheiben',
    startTen: 'mit sieben Scheiben',

    addOne: 'Eine Scheibe mehr auf den nahen Flügel legen',
    takeOne: 'Eine Scheibe vom nahen Flügel nehmen',
    close: 'Das Scharnier schließen',
    open: 'Das Scharnier öffnen',
    sideLow: 'Die Scheibe ohne Partner auf den nahen Flügel legen',
    sideHigh: 'Die Scheibe ohne Partner auf den fernen Flügel legen',
    again: 'Von vorn anfangen',

    saidPlace: 'Auf dem nahen Flügel: {n}.',
    saidClosed: '{n} und {n} auf den Flügeln. {d} zusammen.',
    saidOpened: '{t} wird wieder zu {a} und {a}.',
    saidOddWaiting: '{t} lässt sich nicht auf zwei gleiche Flügel verteilen. Eine Scheibe hat keinen Partner — auf welchen Flügel soll die Klasse sie legen?',
    saidOddPlaced: '{t} wird zu {a} und {b}. Die Scheibe ohne Partner liegt auf Flügel {s} — das ist ein Doppeltes und eins mehr.',
    saidEmpty: 'Auf dem nahen Flügel liegt noch nichts.',
    saidFull: 'Auf dem nahen Flügel liegen {n}, und mehr passen nicht darauf.',
    saidAlreadyClosed: 'Das Scharnier ist schon geschlossen. Öffnet es, um die Flügel wieder auseinanderzunehmen.',
    saidAlreadyOpen: 'Das Scharnier ist schon offen.',

    gateTitle: 'Der Bastelbogen',
    gateBody: 'Das ganze Scharnier ist kostenlos — jedes Zählen, das Schließen und das Öffnen. Mit dem Lehrkraft-Abo kommt der Bastelbogen dazu: zwei Flügel zum Ausschneiden, damit ein Kind echte Scheiben auf beide legen und selbst zuklappen kann.',
    gateCta: 'Das Lehrkraft-Abo ansehen',
    gateClose: 'Jetzt nicht',

    printBtn: 'Den Bastelbogen drucken',
    sheetTitle: 'Bastelbogen zum Ausschneiden',
    sheetNote: 'Schneidet die beiden Flügel aus und ritzt die Mittellinie an, damit sie sich zuklappen lassen. Legt Scheiben auf einen Flügel, sagt, wie viel das Doppelte sein wird, klappt den anderen Flügel darüber und legt noch einmal genauso viele hin. Zählt alle: Das Scharnier macht keine einzige Scheibe — das macht ihr.'
  },

  /* ── fr ── La charnière · les battants · les disques ──────────────── */
  fr: {
    title: 'La charnière',
    instruction: 'Posez des disques sur le battant proche et dites ce que fera le double. Fermez ensuite la charnière : le battant opposé en reçoit autant, et vous pouvez les compter tous, un par un.',

    ariaTray: 'Deux battants reliés par une charnière.',
    ariaNear: 'le battant proche, {n}',
    ariaFar: 'le battant opposé, {n}',
    ariaOdd: 'un disque sans partenaire, qui attend un battant',

    setStart: 'Ce que la charnière a au départ',
    startSmall: 'trois disques',
    startTen: 'sept disques',

    addOne: 'Poser un disque de plus sur le battant proche',
    takeOne: 'Retirer un disque du battant proche',
    close: 'Fermer la charnière',
    open: 'Ouvrir la charnière',
    sideLow: 'Donner le disque sans partenaire au battant proche',
    sideHigh: 'Donner le disque sans partenaire au battant opposé',
    again: 'Tout recommencer',

    saidPlace: 'Sur le battant proche : {n}.',
    saidClosed: '{n} et {n} sur les battants. {d} en tout.',
    saidOpened: '{t} redevient {a} et {a}.',
    saidOddWaiting: '{t} ne se partage pas en deux battants égaux. Un disque n’a pas de partenaire — à quel battant la classe le donne-t-elle ?',
    saidOddPlaced: '{t} redevient {a} et {b}. Le disque sans partenaire est sur le battant {s} : c’est un double et un de plus.',
    saidEmpty: 'Il n’y a encore rien sur le battant proche.',
    saidFull: 'Le battant proche en porte {n}, et il n’en tient pas davantage.',
    saidAlreadyClosed: 'La charnière est déjà fermée. Ouvrez-la pour séparer les battants.',
    saidAlreadyOpen: 'La charnière est déjà ouverte.',

    gateTitle: 'La charnière en papier',
    gateBody: 'Toute la charnière est gratuite : chaque comptage, la fermeture et l’ouverture. L’Abonnement Enseignant y ajoute la charnière en papier à découper, pour qu’un enfant pose de vrais disques sur les deux battants et la referme de ses mains.',
    gateCta: 'Voir l’Abonnement Enseignant',
    gateClose: 'Pas maintenant',

    printBtn: 'Imprimer la charnière en papier',
    sheetTitle: 'Charnière en papier à découper',
    sheetNote: 'Découpez les deux battants et marquez bien la ligne du milieu pour qu’ils se referment. Posez des disques sur un battant, dites ce que fera le double, rabattez l’autre battant et posez-en autant. Comptez-les tous : la charnière ne fabrique aucun disque, c’est vous qui le faites.'
  },

  /* ── es ── La bisagra · las alas · las chapas ─────────────────────── */
  es: {
    title: 'La bisagra',
    instruction: 'Pongan chapas en el ala cercana y digan cuál será el doble. Luego cierren la bisagra: el ala lejana recibe otras tantas, y pueden contarlas todas, una por una.',

    ariaTray: 'Dos alas unidas por una bisagra.',
    ariaNear: 'el ala cercana, {n}',
    ariaFar: 'el ala lejana, {n}',
    ariaOdd: 'una chapa sin pareja, esperando un ala',

    setStart: 'Con qué empieza la bisagra',
    startSmall: 'tres chapas',
    startTen: 'siete chapas',

    addOne: 'Poner otra chapa en el ala cercana',
    takeOne: 'Quitar una chapa del ala cercana',
    close: 'Cerrar la bisagra',
    open: 'Abrir la bisagra',
    sideLow: 'Dar la chapa sin pareja al ala cercana',
    sideHigh: 'Dar la chapa sin pareja al ala lejana',
    again: 'Empezar de nuevo',

    saidPlace: 'En el ala cercana: {n}.',
    saidClosed: '{n} y {n} en las alas. {d} en total.',
    saidOpened: '{t} vuelve a ser {a} y {a}.',
    saidOddWaiting: '{t} no se reparte en dos alas iguales. Una chapa se queda sin pareja: ¿a qué ala se la da la clase?',
    saidOddPlaced: '{t} vuelve a ser {a} y {b}. La chapa sin pareja está en el ala {s}: es el doble y una más.',
    saidEmpty: 'Todavía no hay nada en el ala cercana.',
    saidFull: 'El ala cercana lleva {n}, y ya no caben más.',
    saidAlreadyClosed: 'La bisagra ya está cerrada. Ábranla para separar las alas otra vez.',
    saidAlreadyOpen: 'La bisagra ya está abierta.',

    gateTitle: 'La bisagra de papel',
    gateBody: 'Toda la bisagra es gratuita: cada recuento, el cierre y la apertura. El Plan Docente añade la bisagra de papel para recortar, de modo que un niño pueda poner chapas de verdad en las dos alas y cerrarla con sus propias manos.',
    gateCta: 'Ver el Plan Docente',
    gateClose: 'Ahora no',

    printBtn: 'Imprimir la bisagra de papel',
    sheetTitle: 'Bisagra de papel para recortar',
    sheetNote: 'Recorten las dos alas y marquen bien la línea del medio para que se cierren. Pongan chapas en un ala, digan cuál será el doble, cierren la otra ala encima y pongan otras tantas. Cuéntenlas todas: la bisagra no fabrica ni una chapa, la ponen ustedes.'
  },

  /* ── pt ── A dobradiça · as abas · as pastilhas ───────────────────── */
  pt: {
    title: 'A dobradiça',
    instruction: 'Ponha pastilhas na aba da frente e diga quanto vai dar o dobro. Depois feche a dobradiça: a aba de trás recebe a mesma quantidade, e dá para contar cada uma delas.',

    ariaTray: 'Duas abas ligadas por uma dobradiça.',
    ariaNear: 'a aba da frente, {n}',
    ariaFar: 'a aba de trás, {n}',
    ariaOdd: 'uma pastilha sem par, à espera de uma aba',

    setStart: 'Com o que a dobradiça começa',
    startSmall: 'três pastilhas',
    startTen: 'sete pastilhas',

    addOne: 'Pôr mais uma pastilha na aba da frente',
    takeOne: 'Tirar uma pastilha da aba da frente',
    close: 'Fechar a dobradiça',
    open: 'Abrir a dobradiça',
    sideLow: 'Dar a pastilha sem par à aba da frente',
    sideHigh: 'Dar a pastilha sem par à aba de trás',
    again: 'Começar de novo',

    saidPlace: 'Na aba da frente: {n}.',
    saidClosed: '{n} e {n} nas abas. {d} ao todo.',
    saidOpened: '{t} volta a ser {a} e {a}.',
    saidOddWaiting: '{t} não se reparte em duas abas iguais. Uma pastilha ficou sem par — para qual aba a turma vai dá-la?',
    saidOddPlaced: '{t} volta a ser {a} e {b}. A pastilha sem par está na aba {s}: é o dobro e mais uma.',
    saidEmpty: 'Ainda não há nada na aba da frente.',
    saidFull: 'A aba da frente tem {n}, e não cabem mais.',
    saidAlreadyClosed: 'A dobradiça já está fechada. Abra para separar as abas outra vez.',
    saidAlreadyOpen: 'A dobradiça já está aberta.',

    gateTitle: 'A dobradiça de papel',
    gateBody: 'A dobradiça inteira é gratuita: cada contagem, o fechar e o abrir. O Plano Professor acrescenta a dobradiça de papel para recortar, para uma criança pôr pastilhas de verdade nas duas abas e fechá-la com as próprias mãos.',
    gateCta: 'Ver o Plano Professor',
    gateClose: 'Agora não',

    printBtn: 'Imprimir a dobradiça de papel',
    sheetTitle: 'Dobradiça de papel para recortar',
    sheetNote: 'Recorte as duas abas e marque bem a linha do meio para elas fecharem. Ponha pastilhas numa aba, diga quanto vai dar o dobro, feche a outra aba por cima e ponha a mesma quantidade. Conte todas: a dobradiça não faz nenhuma pastilha — quem faz é você.'
  },

  /* ── it ── La cerniera · le ante · i dischi ───────────────────────── */
  it: {
    title: 'La cerniera',
    instruction: 'Mettete dei dischi sull’anta vicina e dite quanto farà il doppio. Poi chiudete la cerniera: l’anta lontana ne riceve altrettanti, e potete contarli tutti, uno per uno.',

    ariaTray: 'Due ante unite da una cerniera.',
    ariaNear: 'l’anta vicina, {n}',
    ariaFar: 'l’anta lontana, {n}',
    ariaOdd: 'un disco senza compagno, in attesa di un’anta',

    setStart: 'Come comincia la cerniera',
    startSmall: 'tre dischi',
    startTen: 'sette dischi',

    addOne: 'Mettere un altro disco sull’anta vicina',
    takeOne: 'Togliere un disco dall’anta vicina',
    close: 'Chiudere la cerniera',
    open: 'Aprire la cerniera',
    sideLow: 'Dare il disco senza compagno all’anta vicina',
    sideHigh: 'Dare il disco senza compagno all’anta lontana',
    again: 'Ricominciare',

    saidPlace: 'Sull’anta vicina: {n}.',
    saidClosed: '{n} e {n} sulle ante. {d} in tutto.',
    saidOpened: '{t} torna a essere {a} e {a}.',
    saidOddWaiting: '{t} non si divide in due ante uguali. Un disco resta senza compagno: a quale anta lo dà la classe?',
    saidOddPlaced: '{t} torna a essere {a} e {b}. Il disco senza compagno è sull’anta {s}: è un doppio e uno in più.',
    saidEmpty: 'Sull’anta vicina non c’è ancora niente.',
    saidFull: 'L’anta vicina ne porta {n}, e più di così non ce ne stanno.',
    saidAlreadyClosed: 'La cerniera è già chiusa. Apritela per separare di nuovo le ante.',
    saidAlreadyOpen: 'La cerniera è già aperta.',

    gateTitle: 'La cerniera di carta',
    gateBody: 'Tutta la cerniera è gratuita: ogni conteggio, la chiusura e l’apertura. Il Piano Insegnante aggiunge la cerniera di carta da ritagliare, così un bambino può mettere dischi veri su tutte e due le ante e chiuderla con le sue mani.',
    gateCta: 'Scopri il Piano Insegnante',
    gateClose: 'Non ora',

    printBtn: 'Stampare la cerniera di carta',
    sheetTitle: 'Cerniera di carta da ritagliare',
    sheetNote: 'Ritagliate le due ante e incidete bene la linea di mezzo perché si chiudano. Mettete dei dischi su un’anta, dite quanto farà il doppio, chiudete l’altra anta sopra e mettetene altrettanti. Contateli tutti: la cerniera non fabbrica nemmeno un disco, lo fate voi.'
  },

  /* ── nl ── Het scharnier · de kleppen · de schijven ───────────────── */
  nl: {
    title: 'Het scharnier',
    instruction: 'Leg schijven op de klep aan jouw kant en zeg wat het dubbele wordt. Sluit dan het scharnier: de klep aan de overkant krijgt er net zo veel bij, en je kunt ze allemaal stuk voor stuk tellen.',

    ariaTray: 'Twee kleppen met een scharnier ertussen.',
    ariaNear: 'de klep aan jouw kant, {n}',
    ariaFar: 'de klep aan de overkant, {n}',
    ariaOdd: 'een schijf zonder maatje, die op een klep wacht',

    setStart: 'Waarmee het scharnier begint',
    startSmall: 'drie schijven',
    startTen: 'zeven schijven',

    addOne: 'Nog een schijf op de klep aan jouw kant leggen',
    takeOne: 'Een schijf van de klep aan jouw kant halen',
    close: 'Het scharnier sluiten',
    open: 'Het scharnier openen',
    sideLow: 'De schijf zonder maatje aan de klep aan jouw kant geven',
    sideHigh: 'De schijf zonder maatje aan de klep aan de overkant geven',
    again: 'Opnieuw beginnen',

    saidPlace: 'Op de klep aan jouw kant: {n}.',
    saidClosed: '{n} en {n} op de kleppen. {d} bij elkaar.',
    saidOpened: '{t} wordt weer {a} en {a}.',
    saidOddWaiting: '{t} gaat niet in twee gelijke kleppen. Eén schijf heeft geen maatje — aan welke klep geeft de klas hem?',
    saidOddPlaced: '{t} wordt {a} en {b}. De schijf zonder maatje ligt op klep {s}: dit is een dubbele en nog eentje.',
    saidEmpty: 'Er ligt nog niets op de klep aan jouw kant.',
    saidFull: 'Op de klep aan jouw kant liggen er {n}, en meer passen er niet op.',
    saidAlreadyClosed: 'Het scharnier is al gesloten. Open het om de kleppen weer los te maken.',
    saidAlreadyOpen: 'Het scharnier is al open.',

    gateTitle: 'Het papieren scharnier',
    gateBody: 'Het hele scharnier is gratis: elk tellen, het sluiten en het openen. Bij het Leerkracht-abonnement komt het papieren scharnier om uit te knippen, zodat een kind echte schijven op allebei de kleppen kan leggen en het zelf kan dichtdoen.',
    gateCta: 'Bekijk het Leerkracht-abonnement',
    gateClose: 'Nu niet',

    printBtn: 'Het papieren scharnier afdrukken',
    sheetTitle: 'Papieren scharnier om uit te knippen',
    sheetNote: 'Knip de twee kleppen uit en druk de middellijn goed aan, zodat ze dichtgaan. Leg schijven op één klep, zeg wat het dubbele wordt, doe de andere klep erover en leg er net zo veel bij. Tel ze allemaal: het scharnier maakt geen enkele schijf, dat doe jij.'
  },

  /* ── sv ── Gångjärnet · klaffarna · skivorna ──────────────────────── */
  sv: {
    title: 'Gångjärnet',
    instruction: 'Lägg skivor på den närmaste klaffen och säg vad dubbelt så många blir. Stäng sedan gångjärnet: den bortre klaffen får lika många till, och ni kan räkna varenda en.',

    ariaTray: 'Två klaffar med ett gångjärn emellan.',
    ariaNear: 'den närmaste klaffen, {n}',
    ariaFar: 'den bortre klaffen, {n}',
    ariaOdd: 'en skiva utan par som väntar på en klaff',

    setStart: 'Vad gångjärnet börjar med',
    startSmall: 'tre skivor',
    startTen: 'sju skivor',

    addOne: 'Lägg en skiva till på den närmaste klaffen',
    takeOne: 'Ta bort en skiva från den närmaste klaffen',
    close: 'Stäng gångjärnet',
    open: 'Öppna gångjärnet',
    sideLow: 'Ge skivan utan par till den närmaste klaffen',
    sideHigh: 'Ge skivan utan par till den bortre klaffen',
    again: 'Börja om',

    saidPlace: 'På den närmaste klaffen: {n}.',
    saidClosed: '{n} och {n} på klaffarna. {d} tillsammans.',
    saidOpened: '{t} blir {a} och {a} igen.',
    saidOddWaiting: '{t} går inte jämnt upp på två klaffar. En skiva blir utan par — vilken klaff ska klassen ge den till?',
    saidOddPlaced: '{t} blir {a} och {b}. Skivan utan par ligger på klaff {s} — det är dubbelt och en till.',
    saidEmpty: 'Det ligger ingenting på den närmaste klaffen än.',
    saidFull: 'Den närmaste klaffen bär {n}, och fler får inte plats.',
    saidAlreadyClosed: 'Gångjärnet är redan stängt. Öppna det för att skilja klaffarna åt igen.',
    saidAlreadyOpen: 'Gångjärnet är redan öppet.',

    gateTitle: 'Pappersgångjärnet',
    gateBody: 'Hela gångjärnet är gratis — varje räkning, stängningen och öppningen. Lärarplanen lägger till pappersgångjärnet att klippa ut, så att ett barn kan lägga riktiga skivor på båda klaffarna och stänga det med egna händer.',
    gateCta: 'Se Lärarplanen',
    gateClose: 'Inte nu',

    printBtn: 'Skriv ut pappersgångjärnet',
    sheetTitle: 'Pappersgångjärn att klippa ut',
    sheetNote: 'Klipp ut de två klaffarna och ritsa mittlinjen så att de går att stänga. Lägg skivor på den ena klaffen, säg vad dubbelt så många blir, fäll den andra klaffen över och lägg lika många till. Räkna alla: gångjärnet gör inte en enda skiva — det gör ni.'
  },

  /* ── da ── Hængslet · fløjene · skiverne ──────────────────────────── */
  da: {
    title: 'Hængslet',
    instruction: 'Læg skiver på den nærmeste fløj og sig, hvad det dobbelte bliver. Luk så hængslet: den fjerneste fløj får lige så mange igen, og I kan tælle hver eneste en.',

    ariaTray: 'To fløje med et hængsel imellem.',
    ariaNear: 'den nærmeste fløj, {n}',
    ariaFar: 'den fjerneste fløj, {n}',
    ariaOdd: 'en skive uden makker, der venter på en fløj',

    setStart: 'Hvad hængslet begynder med',
    startSmall: 'tre skiver',
    startTen: 'syv skiver',

    addOne: 'Læg en skive mere på den nærmeste fløj',
    takeOne: 'Tag en skive af den nærmeste fløj',
    close: 'Luk hængslet',
    open: 'Åbn hængslet',
    sideLow: 'Giv skiven uden makker til den nærmeste fløj',
    sideHigh: 'Giv skiven uden makker til den fjerneste fløj',
    again: 'Begynd forfra',

    saidPlace: 'På den nærmeste fløj: {n}.',
    saidClosed: '{n} og {n} på fløjene. {d} i alt.',
    saidOpened: '{t} bliver til {a} og {a} igen.',
    saidOddWaiting: '{t} går ikke op i to lige store fløje. En skive er uden makker — hvilken fløj skal klassen give den til?',
    saidOddPlaced: '{t} bliver til {a} og {b}. Skiven uden makker ligger på fløj {s} — det er et dobbelt og en mere.',
    saidEmpty: 'Der ligger ikke noget på den nærmeste fløj endnu.',
    saidFull: 'Den nærmeste fløj bærer {n}, og der er ikke plads til flere.',
    saidAlreadyClosed: 'Hængslet er allerede lukket. Åbn det for at skille fløjene ad igen.',
    saidAlreadyOpen: 'Hængslet er allerede åbent.',

    gateTitle: 'Papirhængslet',
    gateBody: 'Hele hængslet er gratis — hver optælling, lukningen og åbningen. Lærerabonnementet lægger papirhængslet oveni, som I klipper ud, så et barn kan lægge rigtige skiver på begge fløje og lukke det med sine egne hænder.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nu',

    printBtn: 'Print papirhængslet',
    sheetTitle: 'Papirhængsel til at klippe ud',
    sheetNote: 'Klip de to fløje ud, og rids midterlinjen, så de kan lukkes. Læg skiver på den ene fløj, sig hvad det dobbelte bliver, klap den anden fløj henover, og læg lige så mange igen. Tæl dem alle sammen: hængslet laver ikke en eneste skive — det gør I.'
  },

  /* ── no ── Hengslet · klaffene · skivene ──────────────────────────── */
  no: {
    title: 'Hengslet',
    instruction: 'Legg skiver på den nærmeste klaffen og si hva det dobbelte blir. Lukk så hengslet: den borterste klaffen får like mange til, og dere kan telle hver eneste en.',

    ariaTray: 'To klaffer med et hengsel imellom.',
    ariaNear: 'den nærmeste klaffen, {n}',
    ariaFar: 'den borterste klaffen, {n}',
    ariaOdd: 'en skive uten make som venter på en klaff',

    setStart: 'Hva hengslet begynner med',
    startSmall: 'tre skiver',
    startTen: 'sju skiver',

    addOne: 'Legg en skive til på den nærmeste klaffen',
    takeOne: 'Ta en skive av den nærmeste klaffen',
    close: 'Lukk hengslet',
    open: 'Åpne hengslet',
    sideLow: 'Gi skiven uten make til den nærmeste klaffen',
    sideHigh: 'Gi skiven uten make til den borterste klaffen',
    again: 'Begynn på nytt',

    saidPlace: 'På den nærmeste klaffen: {n}.',
    saidClosed: '{n} og {n} på klaffene. {d} til sammen.',
    saidOpened: '{t} blir {a} og {a} igjen.',
    saidOddWaiting: '{t} går ikke opp i to like klaffer. En skive er uten make — hvilken klaff skal klassen gi den til?',
    saidOddPlaced: '{t} blir {a} og {b}. Skiven uten make ligger på klaff {s} — det er et dobbelt og en til.',
    saidEmpty: 'Det ligger ingenting på den nærmeste klaffen ennå.',
    saidFull: 'Den nærmeste klaffen bærer {n}, og det er ikke plass til flere.',
    saidAlreadyClosed: 'Hengslet er allerede lukket. Åpne det for å skille klaffene fra hverandre igjen.',
    saidAlreadyOpen: 'Hengslet er allerede åpent.',

    gateTitle: 'Papirhengslet',
    gateBody: 'Hele hengslet er gratis — hver opptelling, lukkingen og åpningen. Lærerabonnementet legger til papirhengslet som dere klipper ut, slik at et barn kan legge ekte skiver på begge klaffene og lukke det med sine egne hender.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nå',

    printBtn: 'Skriv ut papirhengslet',
    sheetTitle: 'Papirhengsel til å klippe ut',
    sheetNote: 'Klipp ut de to klaffene og riss opp midtlinjen, så de lar seg lukke. Legg skiver på den ene klaffen, si hva det dobbelte blir, legg den andre klaffen over og legg like mange til. Tell dem alle: hengslet lager ikke en eneste skive — det gjør dere.'
  },

  /* ── fi ── Sarana · siivet · kiekot ───────────────────────────────── */
  fi: {
    title: 'Sarana',
    instruction: 'Asettakaa kiekkoja lähemmälle siivelle ja sanokaa, paljonko kaksinkertainen määrä on. Sulkekaa sitten sarana: kauempi siipi saa yhtä monta lisää, ja jokaisen voi laskea yksitellen.',

    ariaTray: 'Kaksi siipeä ja niiden välissä sarana.',
    ariaNear: 'lähempi siipi, {n}',
    ariaFar: 'kauempi siipi, {n}',
    ariaOdd: 'yksi kiekko ilman paria, odottamassa siipeä',

    setStart: 'Mistä sarana aloittaa',
    startSmall: 'kolme kiekkoa',
    startTen: 'seitsemän kiekkoa',

    addOne: 'Aseta vielä yksi kiekko lähemmälle siivelle',
    takeOne: 'Ota yksi kiekko pois lähemmältä siiveltä',
    close: 'Sulje sarana',
    open: 'Avaa sarana',
    sideLow: 'Anna ilman paria jäänyt kiekko lähemmälle siivelle',
    sideHigh: 'Anna ilman paria jäänyt kiekko kauemmalle siivelle',
    again: 'Aloita alusta',

    saidPlace: 'Lähemmällä siivellä: {n}.',
    saidClosed: 'Siivillä {n} ja {n}. Yhteensä {d}.',
    saidOpened: '{t} jakautuu taas: {a} ja {a}.',
    saidOddWaiting: '{t} ei jakaudu kahdelle yhtä suurelle siivelle. Yksi kiekko jäi ilman paria — kummalle siivelle luokka antaa sen?',
    saidOddPlaced: '{t} jakautuu näin: {a} ja {b}. Ilman paria jäänyt kiekko on siivellä {s} — se on kaksinkertainen määrä ja yksi lisää.',
    saidEmpty: 'Lähemmällä siivellä ei ole vielä mitään.',
    saidFull: 'Lähemmällä siivellä on {n}, eikä enempää mahdu.',
    saidAlreadyClosed: 'Sarana on jo kiinni. Avaa se, niin siivet erkanevat taas.',
    saidAlreadyOpen: 'Sarana on jo auki.',

    gateTitle: 'Paperisarana',
    gateBody: 'Koko sarana on ilmainen — jokainen laskeminen, sulkeminen ja avaaminen. Opettajatilaus tuo lisäksi paperisaranan, jonka leikkaatte irti, niin lapsi voi asettaa oikeita kiekkoja kummallekin siivelle ja sulkea sen omin käsin.',
    gateCta: 'Tutustu Opettajatilaukseen',
    gateClose: 'Ei nyt',

    printBtn: 'Tulosta paperisarana',
    sheetTitle: 'Paperisarana leikattavaksi',
    sheetNote: 'Leikatkaa molemmat siivet irti ja uurtakaa keskiviiva, jotta ne menevät kiinni. Asettakaa kiekkoja toiselle siivelle, sanokaa paljonko kaksinkertainen määrä on, kääntäkää toinen siipi päälle ja asettakaa yhtä monta lisää. Laskekaa kaikki: sarana ei tee yhtäkään kiekkoa — te teette.'
  }
};
