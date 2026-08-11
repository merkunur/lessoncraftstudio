/* =====================================================================
   TOOL #53 — THE PAIR GATE · the ten non-English string sets
   =====================================================================
   Rebuilt per locale by a native panel, never translated. The key set was
   read DYNAMICALLY off `require('mini tools/pair-gate.js').strings` (38
   keys) and every placeholder set is asserted equal to the English —
   see `scripts/_pair-gate-verify-strings.js`.

   ---------------------------------------------------------------------
   THE PART NOUNS, AND WHAT THE FENCE ACTUALLY MEASURED
   ---------------------------------------------------------------------
   Fence corpus = every shipped string in the locale being fenced:
   `mini tools/*.js` locale-keyed values + `mini tools/*.json` manifests +
   `frontend/messages/{<loc>,tool-content/<loc>,activity-content/<loc>,
   maker-content/<loc>}.json`. Between 7.6k and 11.5k strings per locale.
   ⚠ Run IN the locale, never in English — the #52 lesson.

     loc  ARCHWAY        PARADE        MARCHERS           SILL       (the bar)
     de   der Rundbogen  der Umzug     die Marschierenden der Sims   die Schranke
     fr   l'arche        le défilé     les marcheurs      le seuil   la barrière
     es   el pórtico     el desfile    los desfilantes    el umbral  la barrera
     pt   o pórtico      o desfile     os desfilantes     a soleira  a barreira
     it   l'arcata       la sfilata    i marciatori       la soglia  la sbarra
     nl   de doorgang    de optocht    de lopers          de drempel de slagboom
     sv   valvet         paraden       marscherarna       tröskeln   bommen
     da   hvælvingen     optoget       de marcherende     tærsklen   bommen
     no   hvelvingen     opptoget      de marsjerende     terskelen  bommen
     fi   holvi          kulkue        marssijat          kynnys     puomi

   ⭐⭐ THE OBVIOUS ARCH WORD IS TAKEN IN EVERY SINGLE LOCALE, and the fence
   is the only reason I know it. `Bogen`(23) `arc`(16) `arco`(25 es / 53 pt
   / 15 it) `boog`(26) `båge`(19) `bue`(15 da / 17 no) `kaari`(24) are all
   already the JUMP ARCS of `number-line.js` and `reading-easel.js` — and
   `kaari` is additionally `unroll-tape`'s and `comparison-planks`'. In
   Portuguese it is worse: `arco` is `sorting-hoops`' HOOP, 15 hits in that
   one file. So no locale gets the transparent word; each gets the
   architectural one, which is free everywhere it was measured.

   ⭐⭐ THE GERMAN SILL WAS A COLLISION AND I WOULD HAVE SHIPPED IT.
   `Schwelle` is the perfect German for a sill — and `track-repair-activity.js`
   already ships it TEN TIMES meaning a railway SLEEPER ("Leg die Schwellen
   an die richtige Stelle"). A child would meet one word for two objects on
   the same shelf. German takes `der Sims` (0 hits) instead. Every other
   locale's threshold word measured genuinely free: seuil 0 · umbral 0 ·
   soleira 0 · soglia 0 · drempel 0 · tröskeln 0 · tærskel 0 · terskel 0 ·
   kynnys 0. (sv `tröskel` returned exactly 1 hit — `tröskelsteg`, a
   METAPHOR in landing prose about multiplication, a different compound.)

   ⛔ REFUSED, AND WHY
   - `gate` in any language: `Tor` `poort` `portti` `port(al)` `puerta`.
     `gate*` is the paywall key across 51 tools. Note nl `poort` and fi
     `portti` both measured 0 hits and are STILL out — free is not the test.
   - `pair`: fr `pair` LITERALLY MEANS EVEN, and es/pt `par`, it `pari` the
     same. The tool would be named after the answer.
   - any noun for the one left behind. Ten locales use a RELATIVE CLAUSE
     throughout — "die, die stehen geblieben sind" / "ceux qui sont restés"
     / "de som blev stående" / "ne, jotka jäivät seisomaan". Never a noun.
     ⚠ This binds hardest on `saidNoSecond`, whose English reads "two lots
     of LEFT-BEHINDS"; all ten carry that as a clause instead.
   - the row word, per the standing fence: `Reihe`(253) `rangée`(84)
     `fila`(149 es) `rij`(163) `rad`(178) `række`(235) `rekke`(99)
     `rivi`(141). ⭐ This has a consequence: THERE IS NO NOUN FOR A RANK IN
     ANY OF THE TEN. Every locale expresses it as ABREAST instead —
     nebeneinander · de front · juntos · lado a lado · affiancati · naast
     elkaar · i bredd · ved siden af hinanden · ved siden av hverandre ·
     rinnakkain. Each of those is that language's own parade-ground idiom,
     so the constraint improved the copy rather than damaging it.
   - `bench` in the Nordic and everywhere else: `bänk`(24) `bænk`(5)
     `benk`(13) `penkki`(2) `banco`(56 it) `Werkbank`(8) `werkbank`(4) are
     `asking-bench` and `measurement-bench`. Every "cut it out and put it on
     the bench" became "on the table".
   - `käytävä` for the Finnish archway: 32 hits — it is `number-hotel`'s
     CORRIDOR (#49). `holvi` instead.
   - `Durchgang` for the German archway: 4 hits, and in `lids.js` it means a
     ROUND ("der zweite Durchgang"). `Rundbogen` instead.
   - es `la arcada` (0 hits, so free): rejected anyway — *dar arcadas* is to
     retch. `el pórtico` instead. pt `arcada` likewise (dental arch).
   - fr `par` as a PREPOSITION ("ne se répartit pas par {k} de front").
     ⭐ This is the ban-too-wide trap and it is recorded rather than patched
     away: `par` there is ordinary correct French and the regex condemning it
     is technically over-broad. It was REWORDED ("ne tombe pas juste à {k} de
     front") instead of loosening the pattern, because in THIS tool the word
     sits one letter from *pair* = EVEN, which is the answer the apparatus
     exists to withhold. Fix the content, never the gauge.
   - `Leiste`(14 de) is `unroll-tape`'s rail; `balk`(14 nl) is
     `number-balance`'s beam; `barra`/`barre` (90+/93) are the bar charts.
     The lifting bar is therefore the BOOM word — Schranke/barrière/barrera/
     barreira/sbarra/slagboom/bommen/puomi, all measured free or metaphor-only.

   ⚠ SCANDINAVIAN DEFINITE FORMS CHECKED INDIVIDUALLY (the `banan` rule):
   valv→valvet · tröskel→tröskeln · parad→paraden · bom→bommen ·
   hvælving→hvælvingen · tærskel→tærsklen (syncopated) · optog→optoget ·
   hvelving→hvelvingen · terskel→terskelen · opptog→opptoget. None is
   homographic with another word. `hvelvet` was available for no and was
   passed over because it is also the past participle of *hvelve*;
   `hvelvingen` carries no such reading. Danish `optog` is the fastelavns-
   and karnevalsoptog every Danish child has walked in; Norwegian
   `opptoget` is the 17. mai one — the warmest word available in each.

   ⚠ FINNISH TAKES THE CASE THE SENTENCE NEEDS, never the nominative.
   Three slots were rebuilt AROUND the case rather than forcing the case
   into the slot, because no fixed suffix serves the whole value range:
   - `{n}:stä` is wrong — the elative follows vowel harmony (7:stä but
     12:sta, 8:sta but 9:stä), so {n} sits as a nominative predicate.
   - `{r} kutsulla` is wrong — the adessive needs *kolmella kutsulla*, and a
     bare numeral does not agree with an inflected noun. Nominative tally.
   - `{k}:ta` is wrong — 2:ta / 3:a / 4:ää / 5:ttä. {k} sits as a nominative
     subject of `mahtuu`.
   ⭐ Finnish is also the ONE locale where `ariaStand` can keep its natural
   shape (see below): the partitive singular after a numeral is correct at
   1 as well as at 4, so `{e} tyhjää paikkaa` is right for every value.

   ---------------------------------------------------------------------
   ⚠⚠ WHAT STILL DIVERGES FROM THE ENGLISH, AND WHY. Summarised here so
   nobody "fixes" the divergence back.
   - `ariaStand` — THE ENGLISH IS WRONG IN THE TOOL'S MOST COMMON STATE.
     `{e}` is k−s, which is 1 whenever the archway takes two, and two IS the
     default width — so the default configuration renders "1 left standing,
     with 1 empty placeS beside them", every time. Nine of the ten locales
     force the same agreement (de "1 leere Plätze", sv "1 tomma platser",
     nl "1 lege plekken" …), so all nine use a TALLY form instead —
     "leere Plätze daneben: {e}" — which is correct at every value of {e}
     and reads naturally as a screen-reader label. Finnish alone keeps the
     natural phrase, because its partitive is right at 1 too.
   - `saidStand` — the s=0 hedge is now OUT, as instructed: with the `clear`
     branch in place I measured 55 reachable `saidStand` refusals and ZERO
     of them at s=0, so the ten now carry the sharper and previously
     unavailable reason — "{n} does not divide evenly into {k} abreast" —
     rather than the weaker "the archway only takes full ones".
   - `saidSillShort` — the ten follow the corrected English. For the record,
     the sentence it replaced ("only ever … when the archway takes two") was
     refuted in 237 reachable states: two left-behinds fill at k=3 in 98 of
     them, at k=4 in 75, at k=5 in 64.
   ---------------------------------------------------------------------

   PAID PLAN NAME verified against `frontend/messages/<loc>.json`
   `homepageV6.planTag`, all ten: de Lehrkraft-Abo · fr Abonnement Enseignant
   · es Plan Docente · pt Plano Professor · it Piano Insegnante ·
   nl Leerkracht-abonnement · sv Lärarplanen · da Lærerabonnementet ·
   no Lærerabonnementet · fi Opettajatilaus. (sv/da/no are already definite
   and are used as such; fi is inflected.)
   ===================================================================== */
'use strict';

module.exports = {
  /* REGENERATED 2026-08-11 from the shipped `mini tools/pair-gate.js`
     after the redesign fold — the TOOL FILE is the SoT and this data
     file mirrors it so `apply-pair-gate-locales.js` is an idempotent
     no-op. Author changes in the tool (via native panels), then
     regenerate with scripts/_pgt-regen-strings-data.js; never
     hand-edit a locale here. */
  de: {
    title: 'Der Rundbogen',
    instruction: 'Wählt den Umzug und sagt, wie viele stehen bleiben werden. Dann ruft sie nach vorn — immer so viele auf einmal — und seht nach.',
    ariaYard: 'Der wartende Umzug, der Rundbogen und der Hof dahinter.',
    ariaWaiting: 'Noch wartend: {n}',
    ariaThrough: '{n} durch, {r} mal nebeneinander',
    ariaStand: 'Stehen geblieben: {n}, leere Plätze daneben: {e}',
    ariaSill: 'der Sims, so breit wie der Rundbogen',
    setN: 'Wie viele nebeneinander',
    n2: 'zwei',
    n3: 'drei',
    n4: 'vier',
    n5: 'fünf',
    sizeAsk: 'Wählt den Umzug',
    sizeChip: 'Ein Umzug mit {n}',
    predAsk: 'Wie viele werden stehen bleiben?',
    predChip: 'Stehen bleiben: {s}',
    predYes: 'Alle kommen durch',
    call: 'Die Nächsten nach vorn rufen',
    second: 'Den zweiten Umzug holen',
    sill: 'Beide auf den Sims stellen',
    again: 'Ein neuer Umzug',
    saidParade: '{n} im Umzug. Wie viele werden stehen bleiben?',
    saidChooseFirst: 'Wählt zuerst den Umzug — tippt auf eine Zahl.',
    saidPredYes: 'Die Klasse sagt: Alle kommen durch. Die Schranke ist oben.',
    saidPredN: 'Die Klasse sagt, wie viele stehen bleiben werden: {s}. Die Schranke ist oben.',
    saidPred2: 'Die Klasse sagt, wie viele stehen bleiben werden: {s}. Lasst sie einziehen.',
    saidPredSill: 'Die Klasse hat sich festgelegt. Stellt beide auf den Sims.',
    saidRank: '{n} durch, noch wartend: {w}.',
    saidClear: 'Alle {n} sind durch — {r} mal {k} nebeneinander. Niemand ist stehen geblieben.',
    saidAllThrough: 'Alle sind schon durch. Fang einen neuen Umzug an.',
    saidStand: 'Stehen geblieben: {s} — {n} lässt sich nicht restlos zu {k} nebeneinander aufteilen. Der Rundbogen nimmt nur volle, nie angefangene.',
    saidMarchOn: 'Der erste Umzug ist noch unterwegs. Ruft die Nächsten nach vorn.',
    saidSecondHere: 'Der zweite Umzug ist schon da.',
    saidSecond: 'Ein zweiter Umzug mit {n}. Auch dort stehen geblieben: {s}.',
    saidSecondClear: 'Der zweite Umzug mit {n} ist restlos durchgekommen — niemand ist stehen geblieben, und für den Sims bleibt nichts.',
    saidSill: 'Beide auf dem Sims — und der Sims ist voll, also darf er hindurch. {a} und {b} zusammen füllen den Rundbogen genau.',
    saidSillShort: '{a} und {b} auf dem Sims sind {c} — und {c} füllt {k} nebeneinander immer noch nicht, also warten auch sie. Bei zwei nebeneinander geht es jedes Mal auf; bei einem breiteren Rundbogen nur manchmal.',
    saidBarDown: 'Sagt zuerst, was ihr glaubt. Dann geht die Schranke hoch.',
    saidNoSecond: 'Hol zuerst den zweiten Umzug — auf den Sims kommen die, die aus beiden Umzügen stehen geblieben sind.',
    saidOnSill: 'Sie stehen schon auf dem Sims.',
    saidBusy: 'Die Klasse hat sich schon festgelegt. Ruft sie nach vorn und findet es heraus.',
    gateTitle: 'Der Umzug aus Papier',
    gateBody: 'Der ganze Rundbogen ist frei — jede Breite, jeder Aufruf, die Verweigerung und der Sims. Das Lehrkraft-Abo legt den Umzug aus Papier dazu: zum Ausschneiden und Aufstellen auf dem Tisch, damit ein Kind die Marschierenden durch einen selbst geschnittenen Rundbogen schicken kann.',
    gateCta: 'Lehrkraft-Abo ansehen',
    gateClose: 'Jetzt nicht',
    printBtn: 'Den Umzug aus Papier drucken',
    printAsk: 'Der Umzug aus Papier — Lehrkraft-Abo ansehen',
    sheetTitle: 'Umzug aus Papier zum Ausschneiden',
    sheetNote: 'Schneide die Marschierenden und den Rundbogen zum Hinstellen aus und falte den Sims genau auf die Breite deines Rundbogens. Wähle einen Umzug und kreise zuerst ein, wie viele wohl stehen bleiben werden. Dann schick sie hindurch — immer so viele nebeneinander. Wer durch ist, wird auf dem Hof abgelegt — jeder in einen gestrichelten Platz, damit du die Zahl wachsen siehst. Wenn zu wenige übrig sind, um den Rundbogen zu füllen, streiche niemanden durch — male stattdessen den leeren Platz daneben. Dieser leere Platz ist das, was die Zahl dir sagt.'
  },
  fr: {
    title: 'L’arche',
    instruction: 'Choisissez le défilé, dites combien resteront debout, puis appelez-les en avant, autant à la fois, et voyez.',
    ariaYard: 'Le défilé qui attend, l’arche, et la cour au-delà.',
    ariaWaiting: 'encore en attente : {n}',
    ariaThrough: 'passés : {n}, appels : {r}',
    ariaStand: 'Il en reste {n} debout, places vides à côté : {e}',
    ariaSill: 'le seuil, aussi large que l’arche',
    setN: 'Combien de front',
    n2: 'deux',
    n3: 'trois',
    n4: 'quatre',
    n5: 'cinq',
    sizeAsk: 'Choisissez le défilé',
    sizeChip: 'Un défilé de {n}',
    predAsk: 'Combien resteront debout ?',
    predChip: 'Il en restera {s} debout',
    predYes: 'Tout le monde passera',
    call: 'Appeler les suivants en avant',
    second: 'Faire venir le second défilé',
    sill: 'Les mettre tous les deux sur le seuil',
    again: 'Un nouveau défilé',
    saidParade: '{n} dans le défilé. Combien resteront debout ?',
    saidChooseFirst: 'Choisissez d’abord le défilé — touchez un nombre.',
    saidPredYes: 'La classe dit que tout le monde passera. La barrière est levée.',
    saidPredN: 'La classe dit qu’il en restera {s} debout. La barrière est levée.',
    saidPred2: 'La classe dit qu’il en restera {s} debout. Faites venir le second défilé.',
    saidPredSill: 'La classe s’est prononcée. Mettez-les tous les deux sur le seuil.',
    saidRank: '{n} passés, {w} attendent encore.',
    saidClear: 'Les {n} sont tous passés — {r} fois {k} de front. Personne n’est resté debout.',
    saidAllThrough: 'Tout le monde est déjà passé. Commence un nouveau défilé.',
    saidStand: 'Il en reste {s} debout : {n} ne tombe pas juste à {k} de front. L’arche ne prend que des complets, jamais des entamés.',
    saidMarchOn: 'Le premier défilé marche encore. Appelez les suivants en avant.',
    saidSecondHere: 'Le second défilé est déjà là.',
    saidSecond: 'Un second défilé de {n}. Lui aussi en laisse {s} debout.',
    saidSecondClear: 'Le second défilé de {n} est passé tout entier, sans laisser personne debout — il n’y a rien à porter sur le seuil.',
    saidSill: 'Tous les deux sur le seuil — et le seuil est complet, donc il passe. {a} et {b} ensemble remplissent l’arche exactement.',
    saidSillShort: '{a} et {b} sur le seuil font {c} — et {c} ne remplit toujours pas {k} de front, alors eux aussi attendent. À deux de front, cela tombe juste à chaque fois ; sous une arche plus large, seulement parfois.',
    saidBarDown: 'Dites d’abord ce que vous pensez. La barrière se lève ensuite.',
    saidNoSecond: 'Fais d’abord venir le second défilé — le seuil est pour ceux qui sont restés debout dans les deux défilés.',
    saidOnSill: 'Ils sont déjà sur le seuil.',
    saidBusy: 'La classe s’est déjà prononcée. Appelez-les en avant et voyez.',
    gateTitle: 'Le défilé en papier',
    gateBody: 'Toute l’arche est libre — chaque largeur, chaque appel, le refus et le seuil. L’Abonnement Enseignant ajoute le défilé en papier à découper et à aligner sur la table, pour qu’un enfant fasse passer les marcheurs sous une arche qu’il a découpée lui-même.',
    gateCta: 'Voir l’Abonnement Enseignant',
    gateClose: 'Pas maintenant',
    printBtn: 'Imprimer le défilé en papier',
    printAsk: 'Le défilé en papier — voir l’Abonnement Enseignant',
    sheetTitle: 'Défilé en papier à découper',
    sheetNote: 'Découpe les marcheurs et l’arche — ses rabats la font tenir debout — puis plie le seuil à la largeur de ton arche. Choisis un défilé, entoure combien resteront debout à ton avis, puis fais-les passer, autant de front à chaque fois. À mesure qu’ils passent, pose les marcheurs sur la cour — les quinze places en pointillés — et regarde les colonnes se remplir. Quand il n’en reste pas assez pour remplir l’arche, ne raye jamais personne — dessine plutôt la place vide à côté. Cette place vide est ce que le nombre te dit.'
  },
  es: {
    title: 'El pórtico',
    instruction: 'Elijan el desfile, digan cuántos se quedarán de pie y luego llámenlos hacia delante — tantos juntos cada vez — y compruébenlo.',
    ariaYard: 'El desfile esperando, el pórtico y el patio del otro lado.',
    ariaWaiting: 'En espera: {n}',
    ariaThrough: 'Al patio: {n}, llamadas: {r}',
    ariaStand: 'De pie: {n}, lugares vacíos al lado: {e}',
    ariaSill: 'el umbral, tan ancho como el pórtico',
    setN: 'Cuántos juntos',
    n2: 'dos',
    n3: 'tres',
    n4: 'cuatro',
    n5: 'cinco',
    sizeAsk: 'Elijan el desfile',
    sizeChip: 'Un desfile de {n}',
    predAsk: '¿Cuántos se quedarán de pie?',
    predChip: '{s} de pie',
    predYes: 'Pasarán todos',
    call: 'Llamar a los siguientes',
    second: 'Traer el segundo desfile',
    sill: 'Poner a los dos en el umbral',
    again: 'Un desfile nuevo',
    saidParade: 'Un desfile de {n}. ¿Cuántos se quedarán de pie?',
    saidChooseFirst: 'Elijan primero el desfile: toquen un número.',
    saidPredYes: 'La clase dice que pasarán todos. La barrera está levantada.',
    saidPredN: 'La clase dice: {s} de pie. La barrera está levantada.',
    saidPred2: 'La clase dice: {s} de pie. Adelante el segundo desfile.',
    saidPredSill: 'La clase ya ha dicho. Pongan a los dos en el umbral.',
    saidRank: 'Al patio: {n}. En espera: {w}.',
    saidClear: 'El desfile de {n} pasó entero — de {k} en {k}, llamadas: {r}. Nadie se quedó de pie.',
    saidAllThrough: 'Ya pasaron todos. Empieza un desfile nuevo.',
    saidStand: 'De pie: {s}. {n} no se reparte exactamente en {k} juntos. El pórtico solo acepta completos, nunca a medias.',
    saidMarchOn: 'El primer desfile todavía está pasando. Llamen a los siguientes.',
    saidSecondHere: 'El segundo desfile ya está aquí.',
    saidSecond: 'Un segundo desfile de {n}. También deja a {s} de pie.',
    saidSecondClear: 'El segundo desfile de {n} pasó entero, sin nadie de pie: no hay nada que llevar al umbral.',
    saidSill: 'Los dos en el umbral — y el umbral está lleno, así que pasa. {a} y {b} juntos llenan el pórtico exactamente.',
    saidSillShort: '{a} y {b} en el umbral son {c} — y {c} sigue sin llenar {k} juntos, así que ellos también esperan. Con dos juntos sale justo todas las veces; con un pórtico más ancho, solo a veces.',
    saidBarDown: 'Digan primero lo que creen. Después se levanta la barrera.',
    saidNoSecond: 'Trae primero el segundo desfile: al umbral suben los que se quedaron de pie en los dos desfiles.',
    saidOnSill: 'Ya están en el umbral.',
    saidBusy: 'La clase ya ha dicho lo que cree. Llámenlos hacia delante y compruébenlo.',
    gateTitle: 'El desfile de papel',
    gateBody: 'Todo el pórtico es gratis: cada anchura, cada llamada, el rechazo y el umbral. El Plan Docente añade el desfile de papel para recortar y alinear sobre la mesa, para que un niño haga pasar a los desfilantes por un pórtico recortado por él mismo.',
    gateCta: 'Ver el Plan Docente',
    gateClose: 'Ahora no',
    printBtn: 'Imprimir el desfile de papel',
    printAsk: 'El desfile de papel — ver el Plan Docente',
    sheetTitle: 'Desfile de papel para recortar',
    sheetNote: 'Recorta a los desfilantes y el pórtico que se pone de pie, y dobla el umbral a la anchura de tu pórtico. Elige un desfile, rodea cuántos crees que se quedarán de pie y luego hazlos pasar, tantos juntos cada vez. El tapete del patio trae quince asientos punteados — de tres en tres, cinco tandas: ve colocando en ellos a los desfilantes que ya han pasado, tanda a tanda. Cuando queden muy pocos para llenar el pórtico, no taches a nadie: dibuja el lugar vacío a su lado. Ese lugar vacío es lo que el número te está diciendo.'
  },
  pt: {
    title: 'O pórtico',
    instruction: 'Escolham o desfile, digam quantos vão ficar de pé e depois chamem-nos para a frente, uma leva de cada vez, e confiram.',
    ariaYard: 'O desfile esperando, o pórtico e o pátio do outro lado.',
    ariaWaiting: '{n} ainda esperando',
    ariaThrough: '{n} passaram, chamadas: {r}',
    ariaStand: 'De pé: {n}. Lugares vazios ao lado: {e}',
    ariaSill: 'a soleira, tão larga quanto o pórtico',
    setN: 'Quantos lado a lado',
    n2: 'dois',
    n3: 'três',
    n4: 'quatro',
    n5: 'cinco',
    sizeAsk: 'Escolham o desfile',
    sizeChip: 'Um desfile de {n}',
    predAsk: 'Quantos vão ficar de pé?',
    predChip: '{s} de pé',
    predYes: 'Todos vão passar',
    call: 'Chamar os próximos',
    second: 'Trazer o segundo desfile',
    sill: 'Colocar os dois na soleira',
    again: 'Um desfile novo',
    saidParade: '{n} no desfile. Quantos vão ficar de pé?',
    saidChooseFirst: 'Escolham o desfile primeiro — toquem em um número.',
    saidPredYes: 'A turma diz que todos vão passar. A barreira está levantada.',
    saidPredN: 'A turma diz: {s} de pé. A barreira está levantada.',
    saidPred2: 'A turma diz: {s} de pé. Podem entrar.',
    saidPredSill: 'A turma já disse. Coloquem os dois na soleira.',
    saidRank: '{n} passaram, {w} ainda esperando.',
    saidClear: 'Os {n} passaram todos — {k} lado a lado a cada chamada, {r} ao todo. Ninguém ficou de pé.',
    saidAllThrough: 'Todos já passaram. Comece um desfile novo.',
    saidStand: '{s} de pé: {n} não se divide exatamente em {k} lado a lado. O pórtico só aceita completos, nunca pela metade.',
    saidMarchOn: 'O primeiro desfile ainda está passando. Chamem os próximos para a frente.',
    saidSecondHere: 'O segundo desfile já está aqui.',
    saidSecond: 'Um segundo desfile de {n}. Ele também deixa {s} de pé.',
    saidSecondClear: 'O segundo desfile de {n} passou inteiro, sem ninguém de pé — não sobrou nada para levar à soleira.',
    saidSill: 'Os dois na soleira — e a soleira está cheia, então passa. {a} e {b} juntos enchem o pórtico exatamente.',
    saidSillShort: '{a} e {b} na soleira dão {c} — e {c} não fecha certinho em {k} lado a lado, então ainda fica gente de pé. Com dois lado a lado dá certo todas as vezes; com um pórtico mais largo, só às vezes.',
    saidBarDown: 'Digam primeiro o que vocês acham. Depois a barreira sobe.',
    saidNoSecond: 'Traga primeiro o segundo desfile — na soleira sobem os que ficaram de pé nos dois desfiles.',
    saidOnSill: 'Eles já estão na soleira.',
    saidBusy: 'A turma já disse o que acha. Chamem-nos para a frente e confiram.',
    gateTitle: 'O desfile de papel',
    gateBody: 'O pórtico inteiro é gratuito: cada largura, cada chamada, a recusa e a soleira. O Plano Professor acrescenta o desfile de papel para recortar e alinhar sobre a mesa, para que a criança faça os desfilantes passarem por um pórtico recortado por ela mesma.',
    gateCta: 'Ver o Plano Professor',
    gateClose: 'Agora não',
    printBtn: 'Imprimir o desfile de papel',
    printAsk: 'O desfile de papel — ver o Plano Professor',
    sheetTitle: 'Desfile de papel para recortar',
    sheetNote: 'Recorte os desfilantes e o pórtico de armar, e dobre a soleira na largura do seu pórtico. Escolha um desfile, faça um círculo em quantos você acha que vão ficar de pé e depois faça-os passar, uma leva de cada vez. Quem passa se deita no tapete do pátio — lugares tracejados, três lado a lado em cinco levas — e assim a contagem fica à vista sobre a mesa. Quando sobrarem poucos demais para encher o pórtico, não risque ninguém — desenhe o lugar vazio ao lado de quem ficou. Esse lugar vazio é o que o número está dizendo.'
  },
  it: {
    title: 'L’arcata',
    instruction: 'Scegliete la sfilata, dite quanti resteranno in piedi, poi chiamateli avanti, tanti affiancati per volta, e vedete.',
    ariaYard: 'La sfilata che aspetta, l’arcata e il cortile oltre.',
    ariaWaiting: 'In attesa: {n}',
    ariaThrough: 'Passati: {n}, chiamate: {r}',
    ariaStand: 'In piedi: {n}, spazi vuoti accanto: {e}',
    ariaSill: 'la soglia, larga quanto l’arcata',
    setN: 'Quanti affiancati',
    n2: 'due',
    n3: 'tre',
    n4: 'quattro',
    n5: 'cinque',
    sizeAsk: 'Scegliete la sfilata',
    sizeChip: 'Una sfilata di {n}',
    predAsk: 'Quanti resteranno in piedi?',
    predChip: '{s} in piedi',
    predYes: 'Passeranno tutti',
    call: 'Chiamare avanti i prossimi',
    second: 'Far arrivare la seconda sfilata',
    sill: 'Metterli tutti e due sulla soglia',
    again: 'Una nuova sfilata',
    saidParade: '{n} nella sfilata. Quanti resteranno in piedi?',
    saidChooseFirst: 'Prima scegliete la sfilata: toccate un numero.',
    saidPredYes: 'La classe dice che passeranno tutti. La sbarra è alzata.',
    saidPredN: 'La classe dice: {s} in piedi. La sbarra è alzata.',
    saidPred2: 'La classe dice: {s} in piedi. Fateli arrivare.',
    saidPredSill: 'La classe si è espressa. Metteteli tutti e due sulla soglia.',
    saidRank: '{n} passati, {w} in attesa.',
    saidClear: 'Tutti e {n} sono passati — {k} affiancati per volta, chiamate: {r}. Nessuno è rimasto in piedi.',
    saidAllThrough: 'Sono già passati tutti. Comincia una nuova sfilata.',
    saidStand: 'In piedi: {s}. {n} non si divide esattamente in {k} affiancati. L’arcata accetta solo chi è al completo, mai chi è a metà.',
    saidMarchOn: 'La prima sfilata sta ancora sfilando. Chiamate avanti i prossimi.',
    saidSecondHere: 'La seconda sfilata è già qui.',
    saidSecond: 'Una seconda sfilata di {n}. Anche questa lascia {s} in piedi.',
    saidSecondClear: 'La seconda sfilata di {n} è passata tutta — nessuno è rimasto in piedi, e non c’è niente da portare sulla soglia.',
    saidSill: 'Tutti e due sulla soglia — e la soglia è piena, quindi passa. {a} e {b} insieme riempiono l’arcata esattamente.',
    saidSillShort: '{a} e {b} sulla soglia fanno {c} — e {c} non riempie ancora {k} affiancati, quindi aspettano anche loro. Con due affiancati torna ogni volta; sotto un’arcata più larga, solo a volte.',
    saidBarDown: 'Dite prima che cosa pensate. Poi la sbarra si alza.',
    saidNoSecond: 'Fai arrivare prima la seconda sfilata — sulla soglia salgono quelli rimasti in piedi nelle due sfilate.',
    saidOnSill: 'Sono già sulla soglia.',
    saidBusy: 'La classe si è già espressa. Chiamateli avanti e vedete.',
    gateTitle: 'La sfilata di carta',
    gateBody: 'Tutta l’arcata è gratuita: ogni larghezza, ogni chiamata, il rifiuto e la soglia. Il Piano Insegnante aggiunge la sfilata di carta da ritagliare e allineare sul tavolo, così un bambino può far passare i marciatori sotto un’arcata ritagliata da lui.',
    gateCta: 'Vedi il Piano Insegnante',
    gateClose: 'Non ora',
    printBtn: 'Stampa la sfilata di carta',
    printAsk: 'La sfilata di carta — vedi il Piano Insegnante',
    sheetTitle: 'Sfilata di carta da ritagliare',
    sheetNote: 'Ritaglia i marciatori e l’arcata da mettere in piedi, e piega la soglia alla larghezza della tua arcata. Scegli una sfilata, cerchia quanti secondo te resteranno in piedi, poi falli passare, tanti affiancati per volta. Man mano che passano, appoggia i marciatori sul tappeto del cortile, dentro i posti tratteggiati — tre affiancati, per cinque chiamate. Quando ne restano troppo pochi per riempire l’arcata, non cancellare mai nessuno: disegna invece il posto vuoto accanto. Quel posto vuoto è ciò che il numero ti sta dicendo.'
  },
  nl: {
    title: 'De doorgang',
    instruction: 'Kies de optocht, zeg hoeveel er blijven staan, roep ze dan naar voren, steeds zoveel tegelijk, en kijk wat er gebeurt.',
    ariaYard: 'De optocht die wacht, de doorgang en het plein erachter.',
    ariaWaiting: 'Wachten nog: {n}',
    ariaThrough: '{n} erdoor, in {r} keer',
    ariaStand: 'Blijven staan: {n}, lege plekken ernaast: {e}',
    ariaSill: 'de drempel, zo breed als de doorgang',
    setN: 'Hoeveel naast elkaar',
    n2: 'twee',
    n3: 'drie',
    n4: 'vier',
    n5: 'vijf',
    sizeAsk: 'Kies de optocht',
    sizeChip: 'Een optocht van {n}',
    predAsk: 'Hoeveel blijven er staan?',
    predChip: 'Blijven staan: {s}',
    predYes: 'Iedereen komt erdoor',
    call: 'De volgenden naar voren roepen',
    second: 'De tweede optocht halen',
    sill: 'Ze allebei op de drempel zetten',
    again: 'Een nieuwe optocht',
    saidParade: '{n} in de optocht. Hoeveel blijven er staan?',
    saidChooseFirst: 'Kies eerst de optocht — tik op een getal.',
    saidPredYes: 'De klas zegt dat iedereen erdoor komt. De slagboom staat omhoog.',
    saidPredN: 'De klas zegt hoeveel er blijven staan: {s}. De slagboom staat omhoog.',
    saidPred2: 'De klas zegt hoeveel er blijven staan: {s}. Laat ze maar komen.',
    saidPredSill: 'De klas heeft zich uitgesproken. Zet ze allebei op de drempel.',
    saidRank: '{n} erdoor, wachten nog: {w}.',
    saidClear: 'Alle {n} zijn erdoor — {r} keer {k} naast elkaar. Niemand bleef staan.',
    saidAllThrough: 'Iedereen is er al door. Begin een nieuwe optocht.',
    saidStand: 'Blijven staan: {s} — {n} gaat niet precies op in {k} naast elkaar. De doorgang neemt alleen volle, nooit halve.',
    saidMarchOn: 'De eerste optocht loopt nog. Roep de volgenden naar voren.',
    saidSecondHere: 'De tweede optocht is er al.',
    saidSecond: 'Een tweede optocht van {n}. Ook daar blijven staan: {s}.',
    saidSecondClear: 'De tweede optocht van {n} is er helemaal doorheen en niemand bleef staan — er komt dus niets bij voor de drempel.',
    saidSill: 'Allebei op de drempel — en de drempel is vol, dus die mag erdoor. {a} en {b} samen vullen de doorgang precies.',
    saidSillShort: '{a} en {b} op de drempel zijn {c} — en {c} vult {k} naast elkaar nog steeds niet, dus zij wachten ook. Bij twee naast elkaar klopt het elke keer; bij een bredere doorgang alleen soms.',
    saidBarDown: 'Zeg eerst wat je denkt. Daarna gaat de slagboom omhoog.',
    saidNoSecond: 'Haal eerst de tweede optocht — op de drempel komen wie in allebei de optochten is blijven staan.',
    saidOnSill: 'Ze staan al op de drempel.',
    saidBusy: 'De klas heeft zich al uitgesproken. Roep ze naar voren en kijk wat er gebeurt.',
    gateTitle: 'De papieren optocht',
    gateBody: 'De hele doorgang is gratis: elke breedte, elke oproep, de weigering en de drempel. Het Leerkracht-abonnement voegt de papieren optocht toe om uit te knippen en op tafel te zetten, zodat een kind de lopers door een zelfgeknipte doorgang kan sturen.',
    gateCta: 'Bekijk het Leerkracht-abonnement',
    gateClose: 'Nu niet',
    printBtn: 'De papieren optocht afdrukken',
    printAsk: 'De papieren optocht — bekijk het Leerkracht-abonnement',
    sheetTitle: 'Papieren optocht om uit te knippen',
    sheetNote: 'Knip de lopers uit en zet de doorgang rechtop met de vouwflappen. Vouw de drempel tot hij precies zo breed is als jouw doorgang. Kies een optocht, omcirkel eerst hoeveel er volgens jou blijven staan, en stuur ze er dan doorheen, steeds zoveel naast elkaar. Wie erdoor is, leg je op de pleinmat: voor elke loper een eigen plek met stippellijn, netjes naast elkaar. Zijn er te weinig over om de doorgang te vullen? Streep dan nooit iemand door — teken de lege plek ernaast. Die lege plek is wat het getal je vertelt.'
  },
  sv: {
    title: 'Valvet',
    instruction: 'Välj paraden och säg hur många som blir stående. Ropa dem sedan fram, så många i bredd åt gången, och se efter.',
    ariaYard: 'Paraden som väntar, valvet och gården bakom.',
    ariaWaiting: '{n} väntar fortfarande',
    ariaThrough: '{n} igenom, på {r} rop',
    ariaStand: '{n} blir stående, tomma platser bredvid: {e}',
    ariaSill: 'tröskeln, lika bred som valvet',
    setN: 'Hur många i bredd',
    n2: 'två',
    n3: 'tre',
    n4: 'fyra',
    n5: 'fem',
    sizeAsk: 'Välj paraden',
    sizeChip: 'En parad på {n}',
    predAsk: 'Hur många blir stående?',
    predChip: '{s} blir stående',
    predYes: 'Alla kommer igenom',
    call: 'Ropa fram de nästa',
    second: 'Hämta den andra paraden',
    sill: 'Ställ båda på tröskeln',
    again: 'En ny parad',
    saidParade: '{n} i paraden. Hur många blir stående?',
    saidChooseFirst: 'Välj paraden först — tryck på ett tal.',
    saidPredYes: 'Klassen säger att alla kommer igenom. Bommen är uppe.',
    saidPredN: 'Klassen säger att {s} blir stående. Bommen är uppe.',
    saidPred2: 'Klassen säger att {s} blir stående. Låt dem marschera in.',
    saidPredSill: 'Klassen har sagt sitt. Ställ båda på tröskeln.',
    saidRank: '{n} igenom, {w} väntar fortfarande.',
    saidClear: 'Hela paraden på {n} kom igenom — {r} rop med {k} i bredd. Ingen blev stående.',
    saidAllThrough: 'Alla har redan kommit igenom. Börja en ny parad.',
    saidStand: '{s} blir stående: {n} går inte jämnt upp i {k} i bredd. Valvet tar bara fulla, aldrig påbörjade.',
    saidMarchOn: 'Den första paraden marscherar fortfarande. Ropa fram de nästa.',
    saidSecondHere: 'Den andra paraden är redan här.',
    saidSecond: 'En andra parad på {n}. Även den lämnar {s} stående.',
    saidSecondClear: 'Den andra paraden på {n} gick igenom utan att någon blev stående — det finns ingen att ställa på tröskeln.',
    saidSill: 'Båda på tröskeln — och tröskeln är full, så den får gå igenom. {a} och {b} tillsammans fyller valvet precis.',
    saidSillShort: '{a} och {b} på tröskeln blir {c} — och {c} fyller fortfarande inte {k} i bredd, så de får också vänta. Med två i bredd går det jämnt ut varje gång; med ett bredare valv bara ibland.',
    saidBarDown: 'Säg först vad ni tror. Sedan går bommen upp.',
    saidNoSecond: 'Hämta den andra paraden först — på tröskeln ställer sig de som blev stående i båda paraderna.',
    saidOnSill: 'De står redan på tröskeln.',
    saidBusy: 'Klassen har redan sagt sitt. Ropa fram dem och se efter.',
    gateTitle: 'Pappersparaden',
    gateBody: 'Hela valvet är gratis: varje bredd, varje rop, vägran och tröskeln. Lärarplanen lägger till pappersparaden att klippa ut och ställa upp på bordet, så att ett barn kan skicka marscherarna genom ett valv som det klippt själv.',
    gateCta: 'Se Lärarplanen',
    gateClose: 'Inte nu',
    printBtn: 'Skriv ut pappersparaden',
    printAsk: 'Pappersparaden — se Lärarplanen',
    sheetTitle: 'Pappersparad att klippa ut',
    sheetNote: 'Klipp ut marscherarna och valvet, och vik flikarna bakåt så att valvet står av sig självt. Vik tröskeln så att den blir lika bred som ert valv. Välj en parad, ringa in hur många ni tror blir stående, och skicka sedan igenom dem, så många i bredd åt gången. Lägg dem som kommit igenom på gårdsmattans streckade platser allteftersom de passerar — så syns det på bordet hur talet växer. När det blir för få kvar för att fylla valvet, stryk aldrig över någon — rita den tomma platsen bredvid i stället. Den tomma platsen är det som talet säger dig.'
  },
  da: {
    title: 'Hvælvingen',
    instruction: 'Vælg optoget, sig hvor mange der bliver stående, kald dem så frem, så mange ad gangen, og se efter.',
    ariaYard: 'Optoget der venter, hvælvingen og gården bagved.',
    ariaWaiting: '{n} venter stadig',
    ariaThrough: '{n} igennem, på {r} kald',
    ariaStand: '{n} bliver stående, tomme pladser ved siden af: {e}',
    ariaSill: 'tærsklen, lige så bred som hvælvingen',
    setN: 'Hvor mange ved siden af hinanden',
    n2: 'to',
    n3: 'tre',
    n4: 'fire',
    n5: 'fem',
    sizeAsk: 'Vælg optoget',
    sizeChip: 'Et optog på {n}',
    predAsk: 'Hvor mange bliver stående?',
    predChip: '{s} bliver stående',
    predYes: 'Alle kommer igennem',
    call: 'Kald de næste frem',
    second: 'Hent det andet optog',
    sill: 'Stil dem begge på tærsklen',
    again: 'Et nyt optog',
    saidParade: '{n} i optoget. Hvor mange bliver stående?',
    saidChooseFirst: 'Vælg først optoget — tryk på et tal.',
    saidPredYes: 'Klassen siger, at alle kommer igennem. Bommen er oppe.',
    saidPredN: 'Klassen siger, at {s} bliver stående. Bommen er oppe.',
    saidPred2: 'Klassen siger, at {s} bliver stående. Lad dem komme ind.',
    saidPredSill: 'Klassen har sagt sit. Stil dem begge på tærsklen.',
    saidRank: '{n} igennem, {w} venter stadig.',
    saidClear: 'Alle {n} kom igennem, {k} ved siden af hinanden — på {r} kald. Ingen blev stående.',
    saidAllThrough: 'Alle er allerede kommet igennem. Start et nyt optog.',
    saidStand: '{s} bliver stående: {n} kan ikke deles ligeligt i {k} ved siden af hinanden. Hvælvingen tager kun fulde, aldrig halve.',
    saidMarchOn: 'Det første optog marcherer stadig. Kald de næste frem.',
    saidSecondHere: 'Det andet optog er her allerede.',
    saidSecond: 'Et andet optog på {n}. Det efterlader også {s} stående.',
    saidSecondClear: 'Det andet optog på {n} gik igennem, uden at nogen blev stående — der er ingen anden at stille på tærsklen.',
    saidSill: 'Dem begge på tærsklen — og tærsklen er fuld, så den må komme igennem. {a} og {b} tilsammen fylder hvælvingen præcis.',
    saidSillShort: '{a} og {b} på tærsklen bliver {c} — og {c} passer stadig ikke præcis til {k} ved siden af hinanden, så de venter også. Med to ved siden af hinanden går det op hver gang; med en bredere hvælving kun nogle gange.',
    saidBarDown: 'Sig først, hvad I tror. Så går bommen op.',
    saidNoSecond: 'Hent først det andet optog — på tærsklen stiller dem, der blev stående i begge optog, sig op.',
    saidOnSill: 'De står allerede på tærsklen.',
    saidBusy: 'Klassen har allerede sagt sit. Kald dem frem, og se efter.',
    gateTitle: 'Papiroptoget',
    gateBody: 'Hele hvælvingen er gratis: hver bredde, hvert kald, afvisningen og tærsklen. Lærerabonnementet lægger papiroptoget til, som klippes ud og stilles op på bordet, så et barn kan sende de marcherende gennem en hvælving, det selv har klippet.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nu',
    printBtn: 'Udskriv papiroptoget',
    printAsk: 'Papiroptoget — se Lærerabonnementet',
    sheetTitle: 'Papiroptog til at klippe ud',
    sheetNote: 'Klip de marcherende ud og hvælvingen, der kan stilles op, og fold tærsklen, så den er lige så bred som din hvælving. Gårdmåtten er gården på papir: tre gange fem stiplede pladser, hvor du lægger de marcherende, efterhånden som de kommer igennem. Vælg et optog, sæt ring om, hvor mange du tror, der bliver stående, og send dem så igennem, så mange ved siden af hinanden ad gangen. Når der er for få tilbage til at fylde hvælvingen, så streg aldrig nogen ud — tegn i stedet den tomme plads ved siden af dem. Den tomme plads er det, tallet fortæller dig.'
  },
  no: {
    title: 'Hvelvingen',
    instruction: 'Velg opptoget, si hvor mange som blir stående, rop dem så fram, så mange om gangen, og se etter.',
    ariaYard: 'Opptoget som venter, hvelvingen og gården bak.',
    ariaWaiting: '{n} venter fortsatt',
    ariaThrough: '{n} gjennom, på {r} rop',
    ariaStand: '{n} blir stående, tomme plasser ved siden av: {e}',
    ariaSill: 'terskelen, like bred som hvelvingen',
    setN: 'Hvor mange ved siden av hverandre',
    n2: 'to',
    n3: 'tre',
    n4: 'fire',
    n5: 'fem',
    sizeAsk: 'Velg opptoget',
    sizeChip: 'Et opptog på {n}',
    predAsk: 'Hvor mange blir stående?',
    predChip: '{s} blir stående',
    predYes: 'Alle kommer gjennom',
    call: 'Rop fram de neste',
    second: 'Hent det andre opptoget',
    sill: 'Sett dem begge på terskelen',
    again: 'Et nytt opptog',
    saidParade: '{n} i opptoget. Hvor mange blir stående?',
    saidChooseFirst: 'Velg opptoget først — trykk på et tall.',
    saidPredYes: 'Klassen sier at alle kommer gjennom. Bommen er oppe.',
    saidPredN: 'Klassen sier at {s} blir stående. Bommen er oppe.',
    saidPred2: 'Klassen sier at {s} blir stående. Nå kommer de inn.',
    saidPredSill: 'Klassen har sagt sitt. Sett dem begge på terskelen.',
    saidRank: '{n} gjennom, {w} venter fortsatt.',
    saidClear: 'Alle {n} kom gjennom — {r} rop med {k} ved siden av hverandre. Ingen ble stående.',
    saidAllThrough: 'Alle har allerede kommet gjennom. Start et nytt opptog.',
    saidStand: '{s} blir stående: {n} lar seg ikke dele i {k} ved siden av hverandre. Hvelvingen tar bare fulle, aldri halve.',
    saidMarchOn: 'Det første opptoget marsjerer fortsatt. Rop fram de neste.',
    saidSecondHere: 'Det andre opptoget er her allerede.',
    saidSecond: 'Et andre opptog på {n}. Det lar også {s} bli stående.',
    saidSecondClear: 'Det andre opptoget på {n} kom gjennom uten at noen ble stående — det er ingenting å sette på terskelen.',
    saidSill: 'Begge på terskelen — og terskelen er full, så den får gå gjennom. {a} og {b} til sammen fyller hvelvingen nøyaktig.',
    saidSillShort: '{a} og {b} på terskelen blir {c} — og {c} fyller fortsatt ikke {k} ved siden av hverandre, så de venter også. Med to ved siden av hverandre går det opp hver gang; med en bredere hvelving bare noen ganger.',
    saidBarDown: 'Si først hva dere tror. Så går bommen opp.',
    saidNoSecond: 'Hent det andre opptoget først — på terskelen stiller de som ble stående i begge opptogene seg opp.',
    saidOnSill: 'De står allerede på terskelen.',
    saidBusy: 'Klassen har allerede sagt sitt. Rop dem fram og se etter.',
    gateTitle: 'Papiropptoget',
    gateBody: 'Hele hvelvingen er gratis: hver bredde, hvert rop, avvisningen og terskelen. Lærerabonnementet legger til papiropptoget som klippes ut og stilles opp på bordet, slik at et barn kan sende de marsjerende gjennom en hvelving det har klippet selv.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nå',
    printBtn: 'Skriv ut papiropptoget',
    printAsk: 'Papiropptoget — se Lærerabonnementet',
    sheetTitle: 'Papiropptog til å klippe ut',
    sheetNote: 'Klipp ut de marsjerende og hvelvingen, og brett klaffene bakover så hvelvingen kan stå på bordet. Brett terskelplaten så den blir like bred som hvelvingen din, og legg gårdsmatten bak hvelvingen — de marsjerende legges på de stiplede plassene etter hvert som de kommer gjennom. Velg et opptog, sett ring rundt hvor mange du tror blir stående, og send dem så gjennom, så mange ved siden av hverandre om gangen. Når det er for få igjen til å fylle hvelvingen, stryk aldri ut noen — tegn heller den tomme plassen ved siden av. Den tomme plassen er det tallet forteller deg.'
  },
  fi: {
    title: 'Holvi',
    instruction: 'Valitkaa kulkue, sanokaa, kuinka moni jää seisomaan, ja kutsukaa heidät sitten eteen, näin monta kerrallaan, ja katsokaa, miten käy.',
    ariaYard: 'Odottava kulkue, holvi ja piha sen takana.',
    ariaWaiting: '{n} odottaa vielä',
    ariaThrough: '{n} läpi, kutsuja {r}',
    ariaStand: '{n} jää seisomaan, tyhjiä paikkoja vieressä: {e}',
    ariaSill: 'kynnys, yhtä leveä kuin holvi',
    setN: 'Montako rinnakkain',
    n2: 'kaksi',
    n3: 'kolme',
    n4: 'neljä',
    n5: 'viisi',
    sizeAsk: 'Valitkaa kulkue',
    sizeChip: '{n} marssijan kulkue',
    predAsk: 'Kuinka moni jää seisomaan?',
    predChip: '{s} jää seisomaan',
    predYes: 'Kaikki pääsevät läpi',
    call: 'Kutsu seuraavat eteen',
    second: 'Hae toinen kulkue',
    sill: 'Aseta molemmat kynnykselle',
    again: 'Uusi kulkue',
    saidParade: 'Marssijoita on {n}. Kuinka moni jää seisomaan?',
    saidChooseFirst: 'Valitkaa ensin kulkue — napauttakaa lukua.',
    saidPredYes: 'Luokka sanoo, että kaikki pääsevät läpi. Puomi on ylhäällä.',
    saidPredN: 'Luokka sanoo, että {s} jää seisomaan. Puomi on ylhäällä.',
    saidPred2: 'Luokka sanoo, että {s} jää seisomaan. Toinen kulkue saa tulla.',
    saidPredSill: 'Luokka on sanonut sanottavansa. Aseta molemmat kynnykselle.',
    saidRank: '{n} läpi, {w} odottaa vielä.',
    saidClear: 'Kaikki {n} pääsivät läpi — {r} kertaa {k} rinnakkain. Kukaan ei jäänyt seisomaan.',
    saidAllThrough: 'Kaikki ovat jo päässeet läpi. Aloita uusi kulkue.',
    saidStand: '{s} jää seisomaan: marssijoita on {n}, eikä se jakaudu tasan. Holvista pääsee vain täydet {k} rinnakkain.',
    saidMarchOn: 'Ensimmäinen kulkue marssii vielä. Kutsu seuraavat eteen.',
    saidSecondHere: 'Toinen kulkue on jo täällä.',
    saidSecond: 'Toinen kulkue — marssijoita on {n}. Siitäkin jää {s} seisomaan.',
    saidSecondClear: 'Toinen kulkue pääsi läpi kokonaan — marssijoita oli {n}, eikä kukaan jäänyt seisomaan. Kynnykselle ei ole mitään vietävää.',
    saidSill: 'Molemmat kynnyksellä — ja kynnys on täysi, joten se pääsee läpi. {a} ja {b} yhdessä täyttävät holvin tarkalleen.',
    saidSillShort: '{a} ja {b} kynnyksellä ovat {c} — eikä {c} täytä holvia, johon mahtuu {k} rinnakkain, joten hekin jäävät odottamaan. Kun rinnakkain mahtuu kaksi, se osuu tasan joka kerta; leveämmässä holvissa vain joskus.',
    saidBarDown: 'Sanokaa ensin, mitä uskotte. Sitten puomi nousee.',
    saidNoSecond: 'Hae ensin toinen kulkue — kynnykselle asettuvat ne, jotka jäivät seisomaan kummastakin kulkueesta.',
    saidOnSill: 'He seisovat jo kynnyksellä.',
    saidBusy: 'Luokka on jo sanonut sanottavansa. Kutsu heidät eteen ja katso.',
    gateTitle: 'Paperikulkue',
    gateBody: 'Koko holvi on ilmainen: jokainen leveys, jokainen kutsu, torjuminen ja kynnys. Opettajatilaus tuo lisäksi paperikulkueen, jonka voi leikata irti ja asettaa pöydälle, niin lapsi voi kuljettaa marssijat itse leikkaamansa holvin läpi.',
    gateCta: 'Katso Opettajatilaus',
    gateClose: 'Ei nyt',
    printBtn: 'Tulosta paperikulkue',
    printAsk: 'Paperikulkue — katso Opettajatilaus',
    sheetTitle: 'Paperikulkue leikattavaksi',
    sheetNote: 'Leikkaa irti marssijat ja pystyyn taittuva holvi, ja taita kynnys holvisi levyiseksi. Valitse kulkue, ympyröi, kuinka monen arvelet jäävän seisomaan, ja kuljeta heidät sitten läpi, näin monta rinnakkain kerrallaan. Läpi päässeet asetetaan pihalle — painetulle alustalle, jossa katkoviivapaikkoja on kolme rinnakkain ja viisi peräkkäin — kukin omalle paikalleen sitä mukaa kuin kulkue etenee. Kun jäljellä on liian vähän täyttämään holvia, älä koskaan yliviivaa ketään — piirrä sen sijaan tyhjä paikka hänen viereensä. Se tyhjä paikka kertoo, mitä luku sanoo.'
  }
};
