/* =====================================================================
   TOOL #53 — THE PAIR GATE · the ten non-English string sets
   =====================================================================
   Rebuilt per locale by a native panel, never translated. The key set was
   read DYNAMICALLY off `require('mini tools/pair-gate.js').strings` (36
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

   ⚠ FINNISH TAKES THE CASE THE SENTENCE NEEDS, never the nominative:
   `holvista pääsee` (elative) · `kynnykselle` (allative) · `kynnyksellä`
   (adessive) · `{n}:stä` (elative on a numeral placeholder) · `{n} marssijaa`
   (partitive after a numeral) · `Opettajatilaus` inflected where the verb
   demands it.

   ---------------------------------------------------------------------
   ⚠⚠ THREE STRINGS DELIBERATELY DIVERGE FROM THE ENGLISH, BECAUSE THE
   ENGLISH IS FALSE AT STATES THE MODEL REACHES. Reported in full to the
   operator; summarised here so nobody "fixes" the divergence back.
   - `saidSillShort` — THE NEW STRING IS FALSE. Its closing sentence, "Two
     left-behinds only ever make a full rank when the archway takes two",
     is refuted by the model in 237 reachable states: at k=3 two left-behinds
     fill in 98 of them (1+2 and 2+1), at k=4 in 75, at k=5 in 64. Worse,
     those are exactly the states where the OTHER branch, `saidSill`, fires
     — so a class at three abreast can hear "only when the archway takes
     two" and then watch it happen one parade later. The true statement,
     which the ten carry, is that at TWO abreast it fills EVERY time, and at
     any wider archway only sometimes. (`saidSill` itself is now sound: the
     call site branches on `sillFull()`, so the ten follow it faithfully.)
   - `saidStand`. EN says "{s} left standing, because {n} does not fill a
     rank of {k}", and it is announced with s=0 on a divisible parade
     ("0 left standing, because 12 does not fill a rank of 2"). The ten put
     the reason on the archway rather than on divisibility — "{s} of {n} stay
     standing, because the archway only lets {k} abreast through, and only
     full" — which is true at s=0 and at s>0 alike.
   - `saidNoSill`. EN describes the ONLY branch of `toSill()` that is
     unreachable (a+b===0, 0 reachable states, because `bringSecond` already
     guarantees a>0). Every refusal a child can actually cause is either "no
     second parade yet" or "already on the sill". The ten name those two.
   `saidBusy` is likewise rewritten: EN talks about changing the width, but
   its only call site is the PREDICTION refusal. See the report.
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

  /* ===================== DEUTSCH ==================================== */
  de: {
    title: 'Der Rundbogen',
    instruction: 'Der Rundbogen lässt genau so viele nebeneinander durch. Sagt zuerst, ob alle durchkommen, und ruft sie dann nach vorn — immer so viele auf einmal — und seht nach.',

    ariaYard: 'Der wartende Umzug, der Rundbogen und der Hof dahinter.',
    ariaWaiting: '{n} warten noch',
    ariaThrough: '{n} durch, {r} mal nebeneinander',
    ariaStand: '{n} bleiben stehen, daneben die leeren Plätze',
    ariaSill: 'der Sims, so breit wie der Rundbogen',

    setN: 'Wie viele nebeneinander',
    n2: 'zwei',
    n3: 'drei',
    n4: 'vier',
    n5: 'fünf',
    setSize: 'Wie viele marschieren',

    predYes: 'Alle kommen durch',
    predNo: 'Jemand bleibt stehen',
    call: 'Die Nächsten nach vorn rufen',
    second: 'Den zweiten Umzug holen',
    sill: 'Beide auf den Sims stellen',
    again: 'Ein neuer Umzug',

    saidPredYes: 'Die Klasse sagt: Alle kommen durch. Die Schranke ist oben.',
    saidPredNo: 'Die Klasse sagt: Jemand bleibt stehen. Die Schranke ist oben.',
    saidRank: '{n} durch, {w} warten noch.',
    saidClear: 'Alle {n} sind durch — {r} mal {k} nebeneinander. Niemand ist stehen geblieben.',
    saidStand: '{s} von {n} bleiben stehen, denn der Rundbogen lässt nur volle {k} nebeneinander durch.',
    saidSecond: 'Ein zweiter Umzug mit {n}. Auch dort bleiben {s} stehen.',
    saidSill: 'Beide auf dem Sims — und der Sims ist voll, also darf er hindurch. {a} und {b} zusammen füllen den Rundbogen genau.',
    saidSillShort: '{a} und {b} auf dem Sims sind {c} — und {c} füllt {k} nebeneinander immer noch nicht. Nur wenn der Rundbogen zwei nimmt, geht es jedes Mal auf.',
    saidBarDown: 'Sagt zuerst, was ihr glaubt. Dann geht die Schranke hoch.',
    saidNoSill: 'Auf den Sims kommen nur die, die stehen geblieben sind, und sie stellen sich nur einmal hin. Hol zuerst den zweiten Umzug.',
    saidBusy: 'Die Klasse hat sich schon festgelegt. Für eine neue Vorhersage braucht ihr einen neuen Umzug.',

    gateTitle: 'Der Umzug aus Papier',
    gateBody: 'Der ganze Rundbogen ist frei — jede Breite, jeder Aufruf, die Verweigerung und der Sims. Das Lehrkraft-Abo legt den Umzug aus Papier dazu: zum Ausschneiden und Aufstellen auf dem Tisch, damit ein Kind die Marschierenden durch einen selbst geschnittenen Rundbogen schicken kann.',
    gateCta: 'Lehrkraft-Abo ansehen',
    gateClose: 'Jetzt nicht',

    printBtn: 'Den Umzug aus Papier drucken',
    sheetTitle: 'Umzug aus Papier zum Ausschneiden',
    sheetNote: 'Schneide die Marschierenden und den Rundbogen aus. Stell die Marschierenden hintereinander auf und schick sie hindurch, immer so viele nebeneinander. Wenn zu wenige da sind, um den Rundbogen zu füllen, lass sie stehen und male die leeren Plätze daneben — diese leeren Plätze sind das, was die Zahl dir sagt.'
  },

  /* ===================== FRANÇAIS =================================== */
  fr: {
    title: 'L’arche',
    instruction: 'L’arche laisse passer exactement ce nombre-là de front. Dites d’abord si tout le monde passera, puis appelez-les en avant, autant à la fois, et voyez.',

    ariaYard: 'Le défilé qui attend, l’arche, et la cour au-delà.',
    ariaWaiting: '{n} attendent encore',
    ariaThrough: '{n} passés, en {r} appels',
    ariaStand: '{n} restent debout, avec les places vides à côté',
    ariaSill: 'le seuil, aussi large que l’arche',

    setN: 'Combien de front',
    n2: 'deux',
    n3: 'trois',
    n4: 'quatre',
    n5: 'cinq',
    setSize: 'Combien défilent',

    predYes: 'Tout le monde passera',
    predNo: 'Quelqu’un restera debout',
    call: 'Appeler les suivants en avant',
    second: 'Faire venir le second défilé',
    sill: 'Les mettre tous les deux sur le seuil',
    again: 'Un nouveau défilé',

    saidPredYes: 'La classe dit que tout le monde passera. La barrière est levée.',
    saidPredNo: 'La classe dit que quelqu’un restera debout. La barrière est levée.',
    saidRank: '{n} passés, {w} attendent encore.',
    saidClear: 'Les {n} sont tous passés — {r} fois {k} de front. Personne n’est resté debout.',
    saidStand: '{s} sur {n} restent debout, car l’arche ne laisse passer que {k} de front, et au complet.',
    saidSecond: 'Un second défilé de {n}. Lui aussi laisse {s} debout.',
    saidSill: 'Tous les deux sur le seuil — et le seuil est complet, donc il passe. {a} et {b} ensemble remplissent l’arche exactement.',
    saidSillShort: '{a} et {b} sur le seuil font {c} — et {c} ne remplit toujours pas {k} de front. Ce n’est que lorsque l’arche en prend deux que cela tombe juste à chaque fois.',
    saidBarDown: 'Dites d’abord ce que vous pensez. La barrière se lève ensuite.',
    saidNoSill: 'Seuls ceux qui sont restés debout montent sur le seuil, et ils n’y montent qu’une fois. Faites d’abord venir le second défilé.',
    saidBusy: 'La classe s’est déjà prononcée. Il faut un nouveau défilé pour une nouvelle prédiction.',

    gateTitle: 'Le défilé en papier',
    gateBody: 'Toute l’arche est libre — chaque largeur, chaque appel, le refus et le seuil. L’Abonnement Enseignant ajoute le défilé en papier à découper et à aligner sur la table, pour qu’un enfant fasse passer les marcheurs sous une arche qu’il a découpée lui-même.',
    gateCta: 'Voir l’Abonnement Enseignant',
    gateClose: 'Pas maintenant',

    printBtn: 'Imprimer le défilé en papier',
    sheetTitle: 'Défilé en papier à découper',
    sheetNote: 'Découpe les marcheurs et l’arche. Aligne les marcheurs les uns derrière les autres et fais-les passer, autant de front à chaque fois. Quand il n’en reste pas assez pour remplir l’arche, laisse-les debout et dessine les places vides à côté — ces places vides sont ce que le nombre te dit.'
  },

  /* ===================== ESPAÑOL ==================================== */
  es: {
    title: 'El pórtico',
    instruction: 'El pórtico deja pasar exactamente a esta cantidad juntos. Digan primero si pasarán todos y luego llámenlos hacia delante, tantos cada vez, y compruébenlo.',

    ariaYard: 'El desfile esperando, el pórtico y el patio del otro lado.',
    ariaWaiting: '{n} siguen esperando',
    ariaThrough: '{n} han pasado, en {r} llamadas',
    ariaStand: '{n} se quedan de pie, con los lugares vacíos al lado',
    ariaSill: 'el umbral, tan ancho como el pórtico',

    setN: 'Cuántos juntos',
    n2: 'dos',
    n3: 'tres',
    n4: 'cuatro',
    n5: 'cinco',
    setSize: 'Cuántos desfilan',

    predYes: 'Pasarán todos',
    predNo: 'Alguien se quedará de pie',
    call: 'Llamar a los siguientes',
    second: 'Traer el segundo desfile',
    sill: 'Poner a los dos en el umbral',
    again: 'Un desfile nuevo',

    saidPredYes: 'La clase dice que pasarán todos. La barrera está levantada.',
    saidPredNo: 'La clase dice que alguien se quedará de pie. La barrera está levantada.',
    saidRank: '{n} han pasado, {w} siguen esperando.',
    saidClear: 'Los {n} pasaron todos — {r} veces {k} juntos. Nadie se quedó de pie.',
    saidStand: '{s} de {n} se quedan de pie, porque el pórtico solo deja pasar a {k} juntos, y completos.',
    saidSecond: 'Un segundo desfile de {n}. También deja a {s} de pie.',
    saidSill: 'Los dos en el umbral — y el umbral está lleno, así que pasa. {a} y {b} juntos llenan el pórtico exactamente.',
    saidSillShort: '{a} y {b} en el umbral son {c} — y {c} sigue sin llenar {k} juntos. Solo cuando el pórtico deja pasar a dos sale justo todas las veces.',
    saidBarDown: 'Digan primero lo que creen. Después se levanta la barrera.',
    saidNoSill: 'Al umbral solo suben los que se quedaron de pie, y suben una sola vez. Trae primero el segundo desfile.',
    saidBusy: 'La clase ya se ha decidido. Hace falta un desfile nuevo para volver a predecir.',

    gateTitle: 'El desfile de papel',
    gateBody: 'Todo el pórtico es gratis: cada anchura, cada llamada, el rechazo y el umbral. El Plan Docente añade el desfile de papel para recortar y alinear sobre la mesa, para que un niño haga pasar a los desfilantes por un pórtico recortado por él mismo.',
    gateCta: 'Ver el Plan Docente',
    gateClose: 'Ahora no',

    printBtn: 'Imprimir el desfile de papel',
    sheetTitle: 'Desfile de papel para recortar',
    sheetNote: 'Recorta a los desfilantes y el pórtico. Colócalos uno detrás de otro y hazlos pasar, tantos juntos cada vez. Cuando queden muy pocos para llenar el pórtico, déjalos de pie y dibuja los lugares vacíos a su lado: esos lugares vacíos son lo que el número te está diciendo.'
  },

  /* ===================== PORTUGUÊS (BR) ============================= */
  pt: {
    title: 'O pórtico',
    instruction: 'O pórtico deixa passar exatamente esta quantidade lado a lado. Digam primeiro se todos vão passar e depois chamem-nos para a frente, tantos por vez, e confiram.',

    ariaYard: 'O desfile esperando, o pórtico e o pátio do outro lado.',
    ariaWaiting: '{n} ainda esperando',
    ariaThrough: '{n} passaram, em {r} chamadas',
    ariaStand: '{n} ficam de pé, com os lugares vazios ao lado',
    ariaSill: 'a soleira, tão larga quanto o pórtico',

    setN: 'Quantos lado a lado',
    n2: 'dois',
    n3: 'três',
    n4: 'quatro',
    n5: 'cinco',
    setSize: 'Quantos estão desfilando',

    predYes: 'Todos vão passar',
    predNo: 'Alguém vai ficar de pé',
    call: 'Chamar os próximos',
    second: 'Trazer o segundo desfile',
    sill: 'Colocar os dois na soleira',
    again: 'Um desfile novo',

    saidPredYes: 'A turma diz que todos vão passar. A barreira está levantada.',
    saidPredNo: 'A turma diz que alguém vai ficar de pé. A barreira está levantada.',
    saidRank: '{n} passaram, {w} ainda esperando.',
    saidClear: 'Os {n} passaram todos — {r} vezes {k} lado a lado. Ninguém ficou de pé.',
    saidStand: '{s} de {n} ficam de pé, porque o pórtico só deixa passar {k} lado a lado, e completos.',
    saidSecond: 'Um segundo desfile de {n}. Ele também deixa {s} de pé.',
    saidSill: 'Os dois na soleira — e a soleira está cheia, então passa. {a} e {b} juntos enchem o pórtico exatamente.',
    saidSillShort: '{a} e {b} na soleira dão {c} — e {c} ainda não enche {k} lado a lado. Só quando o pórtico deixa passar dois é que dá certo todas as vezes.',
    saidBarDown: 'Digam primeiro o que vocês acham. Depois a barreira sobe.',
    saidNoSill: 'Só sobem na soleira os que ficaram de pé, e sobem uma vez só. Traga primeiro o segundo desfile.',
    saidBusy: 'A turma já se decidiu. É preciso um desfile novo para prever de novo.',

    gateTitle: 'O desfile de papel',
    gateBody: 'O pórtico inteiro é gratuito: cada largura, cada chamada, a recusa e a soleira. O Plano Professor acrescenta o desfile de papel para recortar e alinhar sobre a mesa, para que a criança faça os desfilantes passarem por um pórtico recortado por ela mesma.',
    gateCta: 'Ver o Plano Professor',
    gateClose: 'Agora não',

    printBtn: 'Imprimir o desfile de papel',
    sheetTitle: 'Desfile de papel para recortar',
    sheetNote: 'Recorte os desfilantes e o pórtico. Coloque-os um atrás do outro e faça-os passar, tantos lado a lado por vez. Quando sobrarem poucos demais para encher o pórtico, deixe-os de pé e desenhe os lugares vazios ao lado deles — esses lugares vazios são o que o número está dizendo.'
  },

  /* ===================== ITALIANO =================================== */
  it: {
    title: 'L’arcata',
    instruction: 'L’arcata lascia passare esattamente questo numero di persone affiancate. Dite prima se passeranno tutti, poi chiamateli avanti, tanti alla volta, e vedete.',

    ariaYard: 'La sfilata che aspetta, l’arcata e il cortile oltre.',
    ariaWaiting: '{n} aspettano ancora',
    ariaThrough: '{n} passati, in {r} chiamate',
    ariaStand: '{n} restano in piedi, con accanto gli spazi vuoti',
    ariaSill: 'la soglia, larga quanto l’arcata',

    setN: 'Quanti affiancati',
    n2: 'due',
    n3: 'tre',
    n4: 'quattro',
    n5: 'cinque',
    setSize: 'Quanti sfilano',

    predYes: 'Passeranno tutti',
    predNo: 'Qualcuno resterà in piedi',
    call: 'Chiamare avanti i prossimi',
    second: 'Far arrivare la seconda sfilata',
    sill: 'Metterli tutti e due sulla soglia',
    again: 'Una nuova sfilata',

    saidPredYes: 'La classe dice che passeranno tutti. La sbarra è alzata.',
    saidPredNo: 'La classe dice che qualcuno resterà in piedi. La sbarra è alzata.',
    saidRank: '{n} passati, {w} aspettano ancora.',
    saidClear: 'Tutti e {n} sono passati — {r} volte {k} affiancati. Nessuno è rimasto in piedi.',
    saidStand: '{s} su {n} restano in piedi, perché l’arcata lascia passare solo {k} affiancati, e al completo.',
    saidSecond: 'Una seconda sfilata di {n}. Anche questa lascia {s} in piedi.',
    saidSill: 'Tutti e due sulla soglia — e la soglia è piena, quindi passa. {a} e {b} insieme riempiono l’arcata esattamente.',
    saidSillShort: '{a} e {b} sulla soglia fanno {c} — e {c} non riempie ancora {k} affiancati. Solo quando l’arcata ne prende due torna ogni volta.',
    saidBarDown: 'Dite prima che cosa pensate. Poi la sbarra si alza.',
    saidNoSill: 'Sulla soglia salgono solo quelli rimasti in piedi, e ci salgono una volta sola. Fai arrivare prima la seconda sfilata.',
    saidBusy: 'La classe si è già espressa. Per una nuova previsione serve una nuova sfilata.',

    gateTitle: 'La sfilata di carta',
    gateBody: 'Tutta l’arcata è gratuita: ogni larghezza, ogni chiamata, il rifiuto e la soglia. Il Piano Insegnante aggiunge la sfilata di carta da ritagliare e allineare sul tavolo, così un bambino può far passare i marciatori sotto un’arcata ritagliata da lui.',
    gateCta: 'Vedi il Piano Insegnante',
    gateClose: 'Non ora',

    printBtn: 'Stampa la sfilata di carta',
    sheetTitle: 'Sfilata di carta da ritagliare',
    sheetNote: 'Ritaglia i marciatori e l’arcata. Mettili uno dietro l’altro e falli passare, tanti affiancati per volta. Quando ne restano troppo pochi per riempire l’arcata, lasciali in piedi e disegna accanto gli spazi vuoti: quegli spazi vuoti sono ciò che il numero ti sta dicendo.'
  },

  /* ===================== NEDERLANDS ================================= */
  nl: {
    title: 'De doorgang',
    instruction: 'De doorgang laat er precies zoveel naast elkaar door. Zeg eerst of iedereen erdoor komt, roep ze dan naar voren, steeds zoveel tegelijk, en kijk wat er gebeurt.',

    ariaYard: 'De optocht die wacht, de doorgang en het plein erachter.',
    ariaWaiting: '{n} wachten nog',
    ariaThrough: '{n} erdoor, in {r} keer',
    ariaStand: '{n} blijven staan, met de lege plekken ernaast',
    ariaSill: 'de drempel, zo breed als de doorgang',

    setN: 'Hoeveel naast elkaar',
    n2: 'twee',
    n3: 'drie',
    n4: 'vier',
    n5: 'vijf',
    setSize: 'Hoeveel er meelopen',

    predYes: 'Iedereen komt erdoor',
    predNo: 'Er blijft iemand staan',
    call: 'De volgenden naar voren roepen',
    second: 'De tweede optocht halen',
    sill: 'Ze allebei op de drempel zetten',
    again: 'Een nieuwe optocht',

    saidPredYes: 'De klas zegt dat iedereen erdoor komt. De slagboom staat omhoog.',
    saidPredNo: 'De klas zegt dat er iemand blijft staan. De slagboom staat omhoog.',
    saidRank: '{n} erdoor, {w} wachten nog.',
    saidClear: 'Alle {n} zijn erdoor — {r} keer {k} naast elkaar. Niemand bleef staan.',
    saidStand: '{s} van de {n} blijven staan, want de doorgang laat er alleen {k} naast elkaar door, en dan nog vol ook.',
    saidSecond: 'Een tweede optocht van {n}. Daar blijven er ook {s} staan.',
    saidSill: 'Allebei op de drempel — en de drempel is vol, dus die mag erdoor. {a} en {b} samen vullen de doorgang precies.',
    saidSillShort: '{a} en {b} op de drempel zijn {c} — en {c} vult {k} naast elkaar nog steeds niet. Alleen als de doorgang er twee neemt, klopt het elke keer.',
    saidBarDown: 'Zeg eerst wat je denkt. Daarna gaat de slagboom omhoog.',
    saidNoSill: 'Op de drempel komen alleen wie is blijven staan, en ze gaan er maar één keer op. Haal eerst de tweede optocht.',
    saidBusy: 'De klas heeft zich al uitgesproken. Voor een nieuwe voorspelling heb je een nieuwe optocht nodig.',

    gateTitle: 'De papieren optocht',
    gateBody: 'De hele doorgang is gratis: elke breedte, elke oproep, de weigering en de drempel. Het Leerkracht-abonnement voegt de papieren optocht toe om uit te knippen en op tafel te zetten, zodat een kind de lopers door een zelfgeknipte doorgang kan sturen.',
    gateCta: 'Bekijk het Leerkracht-abonnement',
    gateClose: 'Nu niet',

    printBtn: 'De papieren optocht afdrukken',
    sheetTitle: 'Papieren optocht om uit te knippen',
    sheetNote: 'Knip de lopers en de doorgang uit. Zet de lopers achter elkaar en stuur ze erdoor, steeds zoveel naast elkaar. Als er te weinig zijn om de doorgang te vullen, laat ze dan staan en teken de lege plekken ernaast — die lege plekken zijn wat het getal je vertelt.'
  },

  /* ===================== SVENSKA ==================================== */
  sv: {
    title: 'Valvet',
    instruction: 'Valvet släpper igenom precis så många i bredd. Säg först om alla kommer igenom, ropa dem sedan fram, så många åt gången, och se efter.',

    ariaYard: 'Paraden som väntar, valvet och gården bakom.',
    ariaWaiting: '{n} väntar fortfarande',
    ariaThrough: '{n} igenom, på {r} rop',
    ariaStand: '{n} blir stående, med de tomma platserna bredvid',
    ariaSill: 'tröskeln, lika bred som valvet',

    setN: 'Hur många i bredd',
    n2: 'två',
    n3: 'tre',
    n4: 'fyra',
    n5: 'fem',
    setSize: 'Hur många som marscherar',

    predYes: 'Alla kommer igenom',
    predNo: 'Någon blir stående',
    call: 'Ropa fram de nästa',
    second: 'Hämta den andra paraden',
    sill: 'Ställ båda på tröskeln',
    again: 'En ny parad',

    saidPredYes: 'Klassen säger att alla kommer igenom. Bommen är uppe.',
    saidPredNo: 'Klassen säger att någon blir stående. Bommen är uppe.',
    saidRank: '{n} igenom, {w} väntar fortfarande.',
    saidClear: 'Alla {n} kom igenom — {r} gånger {k} i bredd. Ingen blev stående.',
    saidStand: '{s} av {n} blir stående, för valvet släpper bara igenom {k} i bredd, och då fulla.',
    saidSecond: 'En andra parad på {n}. Även den lämnar {s} stående.',
    saidSill: 'Båda på tröskeln — och tröskeln är full, så den får gå igenom. {a} och {b} tillsammans fyller valvet precis.',
    saidSillShort: '{a} och {b} på tröskeln blir {c} — och {c} fyller fortfarande inte {k} i bredd. Bara när valvet tar två går det jämnt ut varje gång.',
    saidBarDown: 'Säg först vad ni tror. Sedan går bommen upp.',
    saidNoSill: 'På tröskeln ställer sig bara de som blev stående, och de ställer sig bara en gång. Hämta den andra paraden först.',
    saidBusy: 'Klassen har redan sagt sitt. Det behövs en ny parad för en ny gissning.',

    gateTitle: 'Pappersparaden',
    gateBody: 'Hela valvet är gratis: varje bredd, varje rop, vägran och tröskeln. Lärarplanen lägger till pappersparaden att klippa ut och ställa upp på bordet, så att ett barn kan skicka marscherarna genom ett valv som det klippt själv.',
    gateCta: 'Se Lärarplanen',
    gateClose: 'Inte nu',

    printBtn: 'Skriv ut pappersparaden',
    sheetTitle: 'Pappersparad att klippa ut',
    sheetNote: 'Klipp ut marscherarna och valvet. Ställ upp marscherarna efter varandra och skicka igenom dem, så många i bredd åt gången. När det blir för få kvar för att fylla valvet, låt dem stå och rita de tomma platserna bredvid — de tomma platserna är det som talet säger dig.'
  },

  /* ===================== DANSK ====================================== */
  da: {
    title: 'Hvælvingen',
    instruction: 'Hvælvingen lukker præcis så mange igennem ved siden af hinanden. Sig først, om alle kommer igennem, kald dem så frem, så mange ad gangen, og se efter.',

    ariaYard: 'Optoget der venter, hvælvingen og gården bagved.',
    ariaWaiting: '{n} venter stadig',
    ariaThrough: '{n} igennem, på {r} kald',
    ariaStand: '{n} bliver stående, med de tomme pladser ved siden af',
    ariaSill: 'tærsklen, lige så bred som hvælvingen',

    setN: 'Hvor mange ved siden af hinanden',
    n2: 'to',
    n3: 'tre',
    n4: 'fire',
    n5: 'fem',
    setSize: 'Hvor mange der marcherer',

    predYes: 'Alle kommer igennem',
    predNo: 'Nogen bliver stående',
    call: 'Kald de næste frem',
    second: 'Hent det andet optog',
    sill: 'Stil dem begge på tærsklen',
    again: 'Et nyt optog',

    saidPredYes: 'Klassen siger, at alle kommer igennem. Bommen er oppe.',
    saidPredNo: 'Klassen siger, at nogen bliver stående. Bommen er oppe.',
    saidRank: '{n} igennem, {w} venter stadig.',
    saidClear: 'Alle {n} kom igennem — {r} gange {k} ved siden af hinanden. Ingen blev stående.',
    saidStand: '{s} ud af {n} bliver stående, for hvælvingen lukker kun {k} igennem ved siden af hinanden — hverken flere eller færre.',
    saidSecond: 'Et andet optog på {n}. Det efterlader også {s} stående.',
    saidSill: 'Dem begge på tærsklen — og tærsklen er fuld, så den må komme igennem. {a} og {b} tilsammen fylder hvælvingen præcis.',
    saidSillShort: '{a} og {b} på tærsklen bliver {c} — og {c} fylder stadig ikke {k} ved siden af hinanden. Kun når hvælvingen tager to, går det op hver gang.',
    saidBarDown: 'Sig først, hvad I tror. Så går bommen op.',
    saidNoSill: 'På tærsklen stiller kun dem, der blev stående, sig op, og de stiller sig kun én gang. Hent først det andet optog.',
    saidBusy: 'Klassen har allerede sagt sit. Der skal et nyt optog til, før I kan gætte igen.',

    gateTitle: 'Papiroptoget',
    gateBody: 'Hele hvælvingen er gratis: hver bredde, hvert kald, afvisningen og tærsklen. Lærerabonnementet lægger papiroptoget til, som klippes ud og stilles op på bordet, så et barn kan sende de marcherende gennem en hvælving, det selv har klippet.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nu',

    printBtn: 'Udskriv papiroptoget',
    sheetTitle: 'Papiroptog til at klippe ud',
    sheetNote: 'Klip de marcherende og hvælvingen ud. Stil de marcherende op efter hinanden og send dem igennem, så mange ved siden af hinanden ad gangen. Når der er for få tilbage til at fylde hvælvingen, så lad dem stå og tegn de tomme pladser ved siden af — de tomme pladser er det, tallet fortæller dig.'
  },

  /* ===================== NORSK (bokmål) ============================= */
  no: {
    title: 'Hvelvingen',
    instruction: 'Hvelvingen slipper gjennom nøyaktig så mange ved siden av hverandre. Si først om alle kommer gjennom, rop dem så fram, så mange om gangen, og se etter.',

    ariaYard: 'Opptoget som venter, hvelvingen og gården bak.',
    ariaWaiting: '{n} venter fortsatt',
    ariaThrough: '{n} gjennom, på {r} rop',
    ariaStand: '{n} blir stående, med de tomme plassene ved siden av',
    ariaSill: 'terskelen, like bred som hvelvingen',

    setN: 'Hvor mange ved siden av hverandre',
    n2: 'to',
    n3: 'tre',
    n4: 'fire',
    n5: 'fem',
    setSize: 'Hvor mange som marsjerer',

    predYes: 'Alle kommer gjennom',
    predNo: 'Noen blir stående',
    call: 'Rop fram de neste',
    second: 'Hent det andre opptoget',
    sill: 'Sett dem begge på terskelen',
    again: 'Et nytt opptog',

    saidPredYes: 'Klassen sier at alle kommer gjennom. Bommen er oppe.',
    saidPredNo: 'Klassen sier at noen blir stående. Bommen er oppe.',
    saidRank: '{n} gjennom, {w} venter fortsatt.',
    saidClear: 'Alle {n} kom gjennom — {r} ganger {k} ved siden av hverandre. Ingen ble stående.',
    saidStand: '{s} av {n} blir stående, for hvelvingen slipper bare gjennom {k} ved siden av hverandre — verken flere eller færre.',
    saidSecond: 'Et andre opptog på {n}. Det lar også {s} bli stående.',
    saidSill: 'Begge på terskelen — og terskelen er full, så den får gå gjennom. {a} og {b} til sammen fyller hvelvingen nøyaktig.',
    saidSillShort: '{a} og {b} på terskelen blir {c} — og {c} fyller fortsatt ikke {k} ved siden av hverandre. Bare når hvelvingen tar to, går det opp hver gang.',
    saidBarDown: 'Si først hva dere tror. Så går bommen opp.',
    saidNoSill: 'På terskelen stiller bare de som ble stående seg opp, og de stiller seg bare én gang. Hent det andre opptoget først.',
    saidBusy: 'Klassen har allerede sagt sitt. Det trengs et nytt opptog for å gjette på nytt.',

    gateTitle: 'Papiropptoget',
    gateBody: 'Hele hvelvingen er gratis: hver bredde, hvert rop, avvisningen og terskelen. Lærerabonnementet legger til papiropptoget som klippes ut og stilles opp på bordet, slik at et barn kan sende de marsjerende gjennom en hvelving det har klippet selv.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nå',

    printBtn: 'Skriv ut papiropptoget',
    sheetTitle: 'Papiropptog til å klippe ut',
    sheetNote: 'Klipp ut de marsjerende og hvelvingen. Still de marsjerende opp etter hverandre og send dem gjennom, så mange ved siden av hverandre om gangen. Når det er for få igjen til å fylle hvelvingen, la dem bli stående og tegn de tomme plassene ved siden av — de tomme plassene er det tallet forteller deg.'
  },

  /* ===================== SUOMI ====================================== */
  fi: {
    title: 'Holvi',
    instruction: 'Holvista mahtuu kerralla juuri näin monta rinnakkain. Sanokaa ensin, pääsevätkö kaikki läpi, ja kutsukaa heidät sitten eteen, näin monta kerrallaan, ja katsokaa.',

    ariaYard: 'Odottava kulkue, holvi ja piha sen takana.',
    ariaWaiting: '{n} odottaa vielä',
    /* ⚠ NOT `{r} kutsulla` — the adessive needs `kolmella kutsulla`, and a
       bare numeral in front of an inflected noun does not agree. Nominative
       tally instead, which is correct for every value of {r}. */
    ariaThrough: '{n} läpi, kutsuja {r}',
    ariaStand: '{n} jää seisomaan, vieressä tyhjät paikat',
    ariaSill: 'kynnys, yhtä leveä kuin holvi',

    setN: 'Montako rinnakkain',
    n2: 'kaksi',
    n3: 'kolme',
    n4: 'neljä',
    n5: 'viisi',
    setSize: 'Montako marssii',

    predYes: 'Kaikki pääsevät läpi',
    predNo: 'Joku jää seisomaan',
    call: 'Kutsu seuraavat eteen',
    second: 'Hae toinen kulkue',
    sill: 'Aseta molemmat kynnykselle',
    again: 'Uusi kulkue',

    saidPredYes: 'Luokka sanoo, että kaikki pääsevät läpi. Puomi on ylhäällä.',
    saidPredNo: 'Luokka sanoo, että joku jää seisomaan. Puomi on ylhäällä.',
    saidRank: '{n} läpi, {w} odottaa vielä.',
    saidClear: 'Kaikki {n} pääsivät läpi — {r} kertaa {k} rinnakkain. Kukaan ei jäänyt seisomaan.',
    /* ⚠ NOT `{n}:stä` — the elative suffix follows vowel harmony, so it is
       7:stä but 12:sta, 8:sta but 9:stä. No fixed suffix is right for the
       whole range 3..20. {n} therefore sits as the nominative predicate of
       `on`, which is correct for every value. */
    saidStand: '{s} jää seisomaan, vaikka marssijoita on {n}, sillä holvista pääsee vain täydet {k} rinnakkain.',
    saidSecond: 'Toinen kulkue, {n} marssijaa. Siitäkin jää {s} seisomaan.',
    saidSill: 'Molemmat kynnyksellä — ja kynnys on täysi, joten se pääsee läpi. {a} ja {b} yhdessä täyttävät holvin tarkalleen.',
    /* ⚠ {k} stays NOMINATIVE as the subject of `mahtuu` — a partitive slot
       would need 2:ta / 3:a / 4:ää / 5:ttä, and no single suffix serves all
       four values. The sentence was rebuilt around the case, not the case
       forced into the sentence. */
    saidSillShort: '{a} ja {b} kynnyksellä ovat {c} — eikä {c} täytä holvia, johon mahtuu {k} rinnakkain. Vain silloin kun holvista mahtuu kaksi, se osuu tasan joka kerta.',
    saidBarDown: 'Sanokaa ensin, mitä uskotte. Sitten puomi nousee.',
    saidNoSill: 'Kynnykselle asettuvat vain ne, jotka jäivät seisomaan, ja he asettuvat sille vain kerran. Hae ensin toinen kulkue.',
    saidBusy: 'Luokka on jo sanonut sanottavansa. Uutta arvausta varten tarvitaan uusi kulkue.',

    gateTitle: 'Paperikulkue',
    gateBody: 'Koko holvi on ilmainen: jokainen leveys, jokainen kutsu, torjuminen ja kynnys. Opettajatilaus tuo lisäksi paperikulkueen, jonka voi leikata irti ja asettaa pöydälle, niin lapsi voi kuljettaa marssijat itse leikkaamansa holvin läpi.',
    gateCta: 'Katso Opettajatilaus',
    gateClose: 'Ei nyt',

    printBtn: 'Tulosta paperikulkue',
    sheetTitle: 'Paperikulkue leikattavaksi',
    sheetNote: 'Leikkaa marssijat ja holvi irti. Aseta marssijat peräkkäin ja kuljeta heidät läpi, näin monta rinnakkain kerrallaan. Kun jäljellä on liian vähän täyttämään holvia, jätä heidät seisomaan ja piirrä tyhjät paikat heidän viereensä — nuo tyhjät paikat kertovat, mitä luku sanoo.'
  }
};
