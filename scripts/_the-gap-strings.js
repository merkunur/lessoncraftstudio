/* =====================================================================
   _the-gap-strings.js — TOOL #56 "THE GAP", the ten native panels
   ---------------------------------------------------------------------
   ⚠ CONSOLIDATED VERBATIM from the ten three-expert panels (§A.13.48:
   linguist + K-2 mathematics teacher + B2C marketing writer, per locale,
   REBUILD-never-translate). Nothing here has been translated, reworded,
   or reordered inside a locale by the integrator.

   30 keys per locale, in the tool's own declared order. The key set and
   the per-key placeholder set were read OFF `mini tools/the-gap.js`, not
   hand-typed — a hand-typed list is how a wrong key set certifies itself.

   ---------------------------------------------------------------------
   ROUND 2 (this revision) — the four keys the tool gained, and the
   reconciliation of the twenty-six it already had
   ---------------------------------------------------------------------
   The tool grew FOUR keys after round 1 — `saidTryOff`, `saidLocked`,
   `gateCta`, `gateClose` — which is exactly the authoring gap all ten
   panels reported last time and were told not to invent. They are
   authored here.

   ⚠⚠ `saidTryOff` HAS EXACTLY ONE REACHABLE BRANCH, AND IT IS MEASURED,
   NOT READ. Enumerated over every (legal scene × rail offer) at both
   caps — 1,960 pairs — `tryK` accepts 1,960 of 1,960 on first press and
   refuses 1,960 of 1,960 on a repeat press. `BOUNDS` 0. `KMIN` 0.
   `rail()` and `tryK()` share their bounds to the character, so an
   out-of-range press DOES NOT EXIST and no string may speak for it.

   ⚠ AND NO REFUSAL MAY CARRY A PLACEHOLDER. `_refuse` calls
   `api.announce(api.t(msg))` with NO `_fmt` — a `{k}` in `saidMidRun`,
   `saidNoTry`, `saidTryOff` or `saidLocked` renders as literal braces.
   Three panels found this independently by reading the dispatch.

   ---------------------------------------------------------------------
   ⭐⭐ TEN PANELS CONVICTED THE ENGLISH, AND THE ENGLISH IS THE ONE
   LOCALE NOBODY REVIEWS
   ---------------------------------------------------------------------
   Every one of the ten read the model rather than the copy, and 10/10
   independently ruled `saidTryOff` FALSE: the try is `add(lands(s),
   'is-try')` into `_counts`, which is a SIBLING of `_stage`; the ground
   is a CHILD of the stage. Nothing about a try is ever drawn on the
   ground. The header records this string being corrected once already,
   for a different falsehood — the replacement swapped one false claim
   for another, and it uses a NAMED PART loosely in the one tool whose
   whole correction pass was about ground-versus-marks confusion.
   The English defects the panels found are listed in the report, not
   fixed here: this file authors locales, and the panels' locale values
   are written to be TRUE regardless of which way the English is ruled.

   ---------------------------------------------------------------------
   ROUND 3 — NINE ENGLISH DEFECTS, AND HOW THE STRINGS GOT HERE
   ---------------------------------------------------------------------
   ⚠⚠ THE FIRST ATTEMPT AT THIS ROUND LOST EVERY PANEL'S COPY. Ten panels
   authored, and the values were carried back as PROSE — reasoning,
   summaries, quoted fragments. Nothing landed, because a native string
   retyped from a paraphrase is not that panel's string. The fix is
   structural and is now the rule: EACH PANEL WRITES ITS OWN FILE,
   `scripts/_the-gap-locale-<loc>.js`, and `merge-the-gap-locales.js`
   folds it in BY REFERENCE. No value is ever transcribed by hand.
   ⚠ And per-panel files, not one shared file, because ten agents editing
   `_the-gap-strings.js` concurrently is a lost-update race: each reads,
   edits its own row, writes the whole file back, and the last writer
   silently erases the rest. Nothing errors; the file looks plausible.

   ⚠⚠ AN ABSENT KEY MEANS "HELD", NEVER "MISSING". da, es and fi each
   read the shipped state first and deliberately omitted rows that were
   ALREADY CORRECT rather than resending them. The merge treats an absent
   key as untouched. `again`/`saidDealt` are send-both-or-neither in fr,
   it, fi, nl and da (lexically bound); ⭐ FINNISH SENT NEITHER, and was
   right — `Uusi näytös` is already a noun phrase and stays true against
   the reversed English, so sending one would have forced the other for
   no defect. pt WITHDREW its `test` and `ariaEnd` after re-reading the
   file; the shipped values are correct and must not be overwritten. fi
   shipped the DEFECT-ONLY `ariaTry` (keeping `Alussa`), refusing to
   churn a string it had itself ruled taste.

   ⭐⭐ `again` WAS REVERSED TWICE AND THE PANELS WERE RIGHT BOTH TIMES.
   It read 'Something else happens' — a declarative sitting on a control.
   I "fixed" the shape to 'New marks', which BROKE THE MEANING: `_again`
   calls `newState()`, which re-deals a new `n` AND a new hidden `k`, so
   naming only the marks under-describes the button. fi caught it by
   reading the model. fr and nl then converged independently on the real
   answer from two constraints — the re-dealt `k`, and line 7's
   three-named-parts law forbidding a fourth noun — and both landed on a
   VERB PHRASE WITH NO NOUN. The English follows them.
   ⚠ de then found `run` was a SECOND declarative outlier in its own
   control row; fixing only `again` would have left the row half
   converted. Nobody briefed that.

   ⚠⚠ A VERDICT IS ONLY VALID AGAINST THE BYTES IT MEASURED. This bit
   three times in one session and never once produced a real defect:
   de measured the tool twice, got different English, and nearly filed
   "the English has not changed" — stale between its read and its send;
   da reported de still carrying both two-band overclaims, reading the
   pre-merge shared file while the fixed values sat in de's own file;
   and the integrator merged `it` minutes before `it` rewrote its
   `instruction`, shipping `mai quanto` when `mai quanti` was on disk.
   RE-READ IMMEDIATELY BEFORE APPLYING, not just before authoring.

   ⚠ AND A SHELL-QUOTED `node -e` CHECK THAT REPORTS EVERYTHING BROKEN IS
   AN ESCAPING ARTEFACT UNTIL PROVEN OTHERWISE. It produced FOUR false
   findings today — one panel saw all seven rows "mismatched", another
   all five keys "EN NOT FOUND", and the integrator's own `nunca cu\w+`
   probe reported the Spanish agreement fix missing when `á` is simply
   not `\w`. No panel acted on it; each re-ran from a FILE first. Write
   the script to a file.
   ⭐ fr poison-tested its own checker in both directions before trusting
   it: "a green check I wrote myself isn't evidence until I've watched it
   fail." That is the standard for every panel-side check.

   ---------------------------------------------------------------------
   MEASURED PLACEHOLDER RANGES — ⚠ THE PREVIOUS REVISION OF THIS BLOCK
   WAS STALE, AND SIX PANELS PLUS THE INTEGRATOR REFUTED IT
   ---------------------------------------------------------------------
   Run over every legal scene at both caps, plus every rail offer:
       {n} in [3,16]   -- NEVER 1. FLOOR=3, so a plural noun is always safe.
       {m} in [1,16]   -- CAN be 1: 22 of 240 legal scenes (8 at cap 10,
                          14 at cap 16 — ~9%). No fixed plural noun after {m}.
       {r} in [1,16]   -- ⚠⚠ CANNOT BE 0. The previous block said "[0,16],
                          CAN be 0" and "141 rail offers land on r=0";
                          BOTH ARE PRE-FIX NUMBERS. `rail()` and `tryK()`
                          now both guard `>= 1` (the fix the tool header
                          documents), and 0 of 1,960 offers land on 0.
       {k} in [2,15]   -- KMIN=2 at the floor; 15 at the ceiling, not 16.
   A stale range is how a panel gets asked to contort grammar around a
   value the model cannot produce. Corrected here rather than defended.

   ---------------------------------------------------------------------
   ⚠ THE SHELF CENSUS IN THE BRIEF WAS RIGHT AND FIVE PANELS "CORRECTED"
   IT WRONGLY
   ---------------------------------------------------------------------
   de, it, pt, da and fi each re-counted the shipped `gateCta` census and
   each reported different numbers; re-measured per FILE with attribution,
   the original counts hold every time (de "Lehrer-Paket ansehen" is ×6 in
   six named files, not ×1; it "Il piano Insegnante" ×8; pt "Ver o plano
   Professor" ×10; da "Se Lærerabonnementet" ×14; fi "Tutustu
   Opettaja-tilaukseen" ×4, not 0). Every panel's VERDICT was sound and
   every panel's ARITHMETIC was not — which is why the census was
   re-measured instead of deferred to. Each value below is a form already
   shipped by a sibling; none invents a variant and none says "Premium".
   ===================================================================== */

module.exports = {

  /* German — DER BODEN · DIE KIESEL · DIE ZWISCHENZEIT
     `Lücke` lost (rekenrek + word-spacing tool, a named tappable part);
     `Punkte` rejected because it means SCORE POINTS in German and the
     shelf ships "ohne Punkte, ohne Zeitdruck"; `Plättchen` is #55's mark.
     `Kiesel` is invariant in the nom/acc plural, so no numeral trap.
     ⚠ `ariaStart`'s plural verb `liegen` is correct ONLY because
     GEO.FLOOR = 3; `ariaEnd`'s colon fragment is what makes {m}=1
     grammatical ("1 Kiesel" — der Kiesel, sg. = pl.). Do NOT expand it
     into a clause: *"Auf dem Boden liegen 1 Kiesel" is what it avoids.
     ⚠ Homograph on the record, lexicon locked: `Zwischenzeit` is also
     the athletics SPLIT TIME, in a house that bans timers. The
     instruction disambiguates immediately. */
  de: {
    title: 'Die Zwischenzeit',
    instruction: 'Zählt die Kiesel auf dem Boden. Dann kommt die Zwischenzeit: Die Kiesel sind verdeckt, nur der Boden bleibt zu sehen. Er verrät, ob etwas dazugekommen oder weggegangen ist — nie, wie viele. Danach zählt noch einmal und überlegt gemeinsam, was passiert ist, während die Kiesel verdeckt waren.',
    again: 'Etwas anderes passieren lassen',
    run: 'Die Zwischenzeit zeigen',
    test: 'Versuch mit',
    clear: 'Versuch wegnehmen',
    print: 'Blatt drucken',
    ariaStart: 'Auf dem Boden liegen {n} Kiesel.',
    ariaGap: 'Jetzt läuft die Zwischenzeit. Die Kiesel sind verdeckt, es ist nichts zu zählen. Der Boden ist weiter zu sehen.',
    ariaCameIn: 'Der Boden zeigt: Vom Rand her ist etwas dazugekommen.',
    ariaWentOut: 'Der Boden zeigt: Zum Rand hin ist etwas weggegangen.',
    ariaEnd: 'Die Zwischenzeit ist vorbei. Jetzt auf dem Boden: {m} Kiesel. Vorher waren es {n}.',
    ariaTry: 'Versuch mit {k}: Los ging es bei {n}, und es landet auf {r}. Gezählt hat die Klasse {m}.',
    sayBefore: 'Vor der Zwischenzeit: {n}.',
    sayAfter: 'Nach der Zwischenzeit: {m}.',
    sayLands: 'Dieser Versuch landet auf {r}.',
    saidMidRun: 'Gerade ist keine neue Zwischenzeit möglich.',
    saidNoTry: 'Es gibt noch keinen Versuch zum Wegnehmen.',
    saidTryOff: 'Diese Zahl ist schon euer Versuch.',
    saidLocked: 'Das Blatt zum Ausdrucken gehört zum Lehrkraft-Abo.',
    saidDealt: 'Etwas Neues liegt da. Zählt erst die Kiesel, bevor es losgeht.',
    rangeLabel: 'Anzahl der Kiesel',
    rangeTen: 'bis zehn',
    rangeSixteen: 'bis sechzehn',
    sheetTitle: 'Der Boden, wie ihn die Klasse gesehen hat — und Platz für das, was passiert ist',
    sheetHint: 'Für jede Zwischenzeit eine Zeile — und darauf die passende Rechnung.',
    lockedTitle: 'Das Blatt gehört zum Lehrkraft-Abo',
    lockedBody: 'Alles hier ist kostenlos — jede Zwischenzeit, der Boden und so viele Versuche, wie die Klasse möchte. Das Lehrkraft-Abo bringt zusätzlich das Blatt zum Ausdrucken: der Boden, wie ihn die Klasse gerade gesehen hat, und Linien zum Aufschreiben.',
    gateCta: 'Das Lehrkraft-Abo ansehen',
    gateClose: 'Jetzt nicht'
  },

  /* French — LE SOL · LES BILLES · L'ÉCLIPSE
     `billes` is the canonical object of French change-unknown word
     problems ("Léa a 7 billes. Elle joue. Maintenant elle en a 4.") —
     this tool's mathematics, verbatim. `rideau` (10) lost; `ronds` and
     `rebord` are #55's; `caillou`/`terrain` are rounding-hill's.
     Measured with (?<!\p{L})…(?!\p{L}) — \b is ASCII-only and cannot
     match `éclipse`. Typographic apostrophes throughout, no escaping.
     ⚠ `ariaEnd` uses a label-then-colon construction, which is why it is
     grammatical at m=1 where the English ("1 marks") is not. */
  fr: {
    title: 'L’Éclipse',
    instruction: 'Comptez les billes sur le sol. L’éclipse passe et couvre les billes un instant : le sol, lui, reste visible et montre seulement si quelque chose est entré ou sorti, jamais combien. Quand l’éclipse est finie, comptez de nouveau et cherchez ensemble ce qui s’est passé pendant que les billes étaient cachées.',
    again: 'Recommencer autrement',
    run: 'Lancer l’éclipse',
    test: 'Essayer le nombre',
    clear: 'Effacer l’essai',
    print: 'Imprimer la fiche',
    ariaStart: 'Sur le sol, il y a {n} billes.',
    ariaGap: 'L’éclipse couvre les billes. Il n’y a rien à compter. Le sol, lui, est toujours là.',
    ariaCameIn: 'Sur le sol : quelque chose est entré par le bord.',
    ariaWentOut: 'Sur le sol : quelque chose est sorti par le bord.',
    ariaEnd: 'L’éclipse est finie. Nombre de billes sur le sol : {m} maintenant, {n} avant.',
    ariaTry: 'Essai avec {k} : on part de {n} et on arrive à {r}. La classe a compté {m}.',
    sayBefore: 'Avant l’éclipse : {n}.',
    sayAfter: 'Après l’éclipse : {m}.',
    sayLands: 'Cet essai arrive à {r}.',
    saidMidRun: 'Attendez la fin de l’éclipse.',
    saidNoTry: 'Il n’y a encore rien à effacer.',
    saidTryOff: 'Ce nombre est déjà l’essai en cours.',
    saidLocked: 'La fiche fait partie de l’abonnement Enseignant.',
    saidDealt: 'On recommence. Comptez les billes sur le sol avant de lancer l’éclipse.',
    rangeLabel: 'Combien de billes',
    rangeTen: 'jusqu’à dix',
    rangeSixteen: 'jusqu’à seize',
    sheetTitle: 'Le sol comme la classe l’a vu, et de la place pour écrire ce qui s’est passé',
    sheetHint: 'Des lignes réglées pour écrire ce que la classe a vu, et le calcul qui va avec.',
    lockedTitle: 'La fiche fait partie de l’abonnement Enseignant',
    lockedBody: 'Tout l’outil est gratuit — chaque éclipse, le sol et autant d’essais que la classe veut. L’abonnement Enseignant ajoute la fiche imprimée : elle reprend le sol comme la classe l’a vu, avec des lignes réglées pour écrire ses phrases.',
    gateCta: 'Voir l’abonnement Enseignant',
    gateClose: 'Pas maintenant'
  },

  /* Spanish — EL SUELO · LAS MARCAS · EL PARPADEO
     `parpadeo` measures 0 across the whole `parpade*` family — a span of
     TIME belonging to the observer, not to a cloth. `hueco` (the literal
     "gap") is TAKEN by counting-cups + pair-gate. `apagón` scores 0 but
     its verb family scores 16 (number-sieve's whole mechanic) — a family
     count is the real measurement. `marcas` is shared with #55 on the
     header's own stated law that the two tools share a mark.
     ⚠ `ariaEnd`/`sayAfter` use the label form, which is what lets them
     survive {m}=1; a full clause would force *"hay 1 marcas".
     ⭐ This locale's `ariaGap` needed NO correction — it already said the
     marks are gone AND that the suelo stays visible, before the English
     did. The child's theory is `la idea`, so the new refusal is about
     the idea already being stated, never about a place. */
  es: {
    title: 'El parpadeo',
    instruction: 'Cuenten en voz alta las marcas que hay sobre el suelo. En el parpadeo no queda ninguna a la vista: lo único que se sigue viendo es el suelo, y el suelo solo dice si algo entró o si algo salió, nunca cuántas. Cuando el parpadeo termina, vuelvan a contar y averigüen qué pasó mientras las marcas no se veían.',
    again: 'Empezar con otras marcas',
    run: 'Pasar por el parpadeo',
    test: 'Probar con',
    clear: 'Quitar la idea',
    print: 'Imprimir la hoja',
    ariaStart: 'Marcas en el suelo: {n}.',
    ariaGap: 'Es el parpadeo: no queda ninguna marca a la vista y no hay nada que contar. El suelo se sigue viendo.',
    ariaCameIn: 'El suelo muestra que algo entró por un extremo.',
    ariaWentOut: 'El suelo muestra que algo salió por un extremo.',
    ariaEnd: 'Terminó el parpadeo. Marcas en el suelo ahora: {m}. Antes había: {n}.',
    ariaTry: 'La idea es {k}. Empezó en {n} y llega a {r}. La clase contó {m}.',
    sayBefore: 'Antes del parpadeo: {n}.',
    sayAfter: 'Después del parpadeo: {m}.',
    sayLands: 'Esa idea llega a {r}.',
    saidMidRun: 'Esperen a que termine el parpadeo.',
    saidNoTry: 'Todavía no hay ninguna idea que quitar.',
    saidTryOff: 'Esa idea ya está puesta.',
    saidLocked: 'La hoja forma parte del plan Docente.',
    saidDealt: 'Otras marcas. Cuéntenlas antes de que pase el parpadeo.',
    rangeLabel: 'Cuántas marcas',
    rangeTen: 'hasta diez',
    rangeSixteen: 'hasta dieciséis',
    sheetTitle: 'El suelo tal como lo vio la clase, y espacio para escribir qué pasó',
    sheetHint: 'Usen una línea para cada parpadeo que vio la clase y escriban la operación que le corresponde.',
    lockedTitle: 'La hoja forma parte del plan Docente',
    lockedBody: 'Usar el instrumento es gratis: cada parpadeo, el suelo y todas las ideas que la clase quiera probar. El plan Docente añade la hoja impresa, que lleva el suelo tal como lo vio la clase, con renglones para escribir qué pasó.',
    gateCta: 'Ver el plan Docente',
    gateClose: 'Ahora no'
  },

  /* Brazilian Portuguese — O CHÃO · AS BOLINHAS · O INTERVALO
     `intervalo` = 0 hits, and BNCC anos iniciais uses "intervalo de
     tempo" for duration — the curriculum's own noun for a span of time.
     `recreio` (4) already carries the school break, so this is not it.
     `marca(s)` is TRIPLE-owned in pt (#55 ships "As marcas do parapeito"
     AND rangeLabel "Quantas marcas", plus ruler and tape) — hence
     `bolinhas`. ⚠ `vão` rejected: homograph of "eles vão" (they go), in
     a tool about things going.
     ⚠⚠ THE LONG TITLE IS A HOMOGRAPH DEFENCE, NOT VERBOSITY. Standing
     alone, "O intervalo" is what every Brazilian child calls RECESS; the
     surrounding clause forces the temporal-span reading. A future
     tightening pass that shortens it ships a maths tool called "Recess".
     ⚠ `ariaEnd`'s bare numerals are deliberate: `_fmt` has no plural
     selector (cf. baking-tray.js:764) and {m}=1 reaches ~9% of scenes. */
  pt: {
    title: 'O que aconteceu no intervalo',
    instruction: 'Contem as bolinhas no chão. O intervalo cobre as bolinhas por um instante — o chão continua à vista e só mostra se alguma coisa entrou ou saiu, nunca quantas. Quando o intervalo acaba, contem de novo e descubram o que aconteceu enquanto as bolinhas estavam escondidas.',
    again: 'Fazer acontecer outra coisa',
    run: 'Começar o intervalo',
    test: 'Testar este tanto:',
    clear: 'Apagar a tentativa',
    print: 'Imprimir a folha',
    ariaStart: 'O chão tem {n} bolinhas.',
    ariaGap: 'O intervalo está cobrindo as bolinhas. Não dá para contar nada. O chão continua aí.',
    ariaCameIn: 'O chão mostra que alguma coisa entrou pela beirada.',
    ariaWentOut: 'O chão mostra que alguma coisa saiu pela beirada.',
    ariaEnd: 'O intervalo acabou. Agora o chão tem {m}, e antes tinha {n}.',
    ariaTry: 'Testando {k}: começou em {n} e chega a {r}. A turma contou {m}.',
    sayBefore: 'Antes do intervalo: {n}.',
    sayAfter: 'Depois do intervalo: {m}.',
    sayLands: 'Essa tentativa chega a {r}.',
    saidMidRun: 'Esperem o intervalo acabar.',
    saidNoTry: 'Ainda não há nenhuma tentativa para apagar.',
    saidTryOff: 'Esse número já é a tentativa de vocês.',
    saidLocked: 'A folha faz parte do plano Professor.',
    saidDealt: 'Tudo de novo. Contem o que está no chão antes de começar o intervalo.',
    rangeLabel: 'Quantas bolinhas',
    rangeTen: 'até dez',
    rangeSixteen: 'até dezesseis',
    sheetTitle: 'O chão como a turma viu, e espaço para escrever o que aconteceu',
    sheetHint: 'Em cada linha, um intervalo que a turma viu e a sentença matemática que corresponde a ele.',
    lockedTitle: 'A folha faz parte do plano Professor',
    lockedBody: 'Aqui tudo é grátis — todos os intervalos, o chão e quantas tentativas a turma quiser. O plano Professor acrescenta a folha impressa: o chão como a turma viu, com linhas pautadas para ela escrever as sentenças.',
    gateCta: 'Ver o plano Professor',
    gateClose: 'Agora não'
  },

  /* Italian — LA RIVA · I SASSI · IL FRATTEMPO
     ⚠ `intervallo` is the Italian `banan` trap: in a primary school it IS
     the mid-morning break. ⚠ `piano` is unusable — it is the paid tier on
     this very shelf ("il piano Insegnante"), so lockedBody would read
     "il piano … il piano Insegnante". `sipario` (13) is the shipped
     curtain; `terreno`/`ciottolo` are rounding-hill's; `mensola`/
     `pallini` are #55's. ⚠ A naive `grep riva` returns 77 — every one
     inside `arriva/arrivare`; word-bounded it is 0.
     ⚠ `ariaStart`/`ariaEnd`/`sayAfter` use label:value, which is the sole
     reason {m}=1 is grammatical; a verbal form yields *"ci sono 1 sassi". */
  it: {
    title: 'Il frattempo',
    instruction: 'Contate i sassi sulla riva. Poi arriva il frattempo e i sassi non si vedono più: la riva resta, e dice soltanto se qualcosa è entrato o se è uscito, mai quanti sassi. Quando il frattempo è passato, contate di nuovo e ragionate su che cosa è successo mentre i sassi non si vedevano.',
    again: 'Cambia situazione',
    run: 'Fai partire il frattempo',
    test: 'Prova con',
    clear: 'Togli la prova',
    print: 'Stampa la scheda',
    ariaStart: 'Sassi sulla riva: {n}.',
    ariaGap: 'C’è il frattempo: i sassi non si vedono e non si può contare niente. La riva c’è ancora.',
    ariaCameIn: 'La riva mostra che qualcosa è entrato da un lato.',
    ariaWentOut: 'La riva mostra che qualcosa è uscito da un lato.',
    ariaEnd: 'Il frattempo è passato. Sassi sulla riva adesso: {m}. Prima del frattempo erano {n}.',
    ariaTry: 'Prova con {k}: si parte da {n} e si arriva a {r}. La classe ha contato {m}.',
    sayBefore: 'Prima del frattempo: {n}.',
    sayAfter: 'Dopo il frattempo: {m}.',
    sayLands: 'Con questa prova si arriva a {r}.',
    saidMidRun: 'Aspettate che passi il frattempo.',
    saidNoTry: 'Non c’è ancora nessuna prova da togliere.',
    saidTryOff: 'Questo numero è già la prova.',
    saidLocked: 'La scheda fa parte del piano Insegnante.',
    saidDealt: 'Ecco un’altra situazione. Contate i sassi prima di far partire il frattempo.',
    rangeLabel: 'Quanti sassi',
    rangeTen: 'fino a dieci',
    rangeSixteen: 'fino a sedici',
    sheetTitle: 'La riva come l’ha vista la classe, con lo spazio per scrivere che cosa è successo',
    sheetHint: 'Una riga per ogni frattempo che la classe ha guardato, con l’operazione corrispondente.',
    lockedTitle: 'La scheda fa parte del piano Insegnante',
    lockedBody: 'Qui è tutto gratuito: ogni frattempo, la riva e tutte le prove che la classe vuole fare. Il piano Insegnante aggiunge la scheda da stampare: riporta la riva come l’ha vista la classe, con le righe su cui scrivere le operazioni.',
    gateCta: 'Scopri il piano Insegnante',
    gateClose: 'Non ora'
  },

  /* Dutch — DE STOEP · DE KNIKKERS · DE TUSSENTIJD
     ⚠ `de grond` — the literal translation — is TAKEN (16 hits, all
     rounding-hill: "De grond houdt op bij {n}", "De papieren grond").
     ⚠ `het gat` is the dictionary's first answer for "gap" and the worst
     available word: "een gat in de grond" is a HOLE, in a tool whose
     stage IS a ground. `stippen`/`richel`/`luifel` are #55's parts;
     `kralen` is the rekenrek's. ⚠ `uitkomen` refused for `lands`: "dat
     idee komt uit" means "that idea COMES TRUE" — a verdict verb.
     ⚠ `saidNoTry` primes the fixed idiom "geen idee" = "no clue" before
     the relative clause rescues it; kept deliberately, because every
     alternative loses `weghalen`, the only word tying the refusal to the
     button that did nothing. */
  nl: {
    title: 'De tussentijd',
    instruction: 'Tel de knikkers op de stoep. In de tussentijd zie je ze even niet — de stoep blijft wel zichtbaar, en die laat alleen zien dát er iets bij is gekomen of weg is gegaan, nooit hoeveel. Als de tussentijd voorbij is, tel je opnieuw en zoek je samen uit wat er gebeurd is terwijl je de knikkers niet kon zien.',
    again: 'Iets anders laten gebeuren',
    run: 'De tussentijd laten lopen',
    test: 'Probeer dit aantal:',
    clear: 'Het idee weghalen',
    print: 'Het stoepblad afdrukken',
    ariaStart: 'Knikkers op de stoep: {n}.',
    ariaGap: 'De tussentijd loopt. Je kunt de knikkers nu even niet tellen. De stoep zie je nog wel.',
    ariaCameIn: 'De stoep laat zien dat er iets bij is gekomen, van opzij.',
    ariaWentOut: 'De stoep laat zien dat er iets weg is gegaan, naar opzij.',
    ariaEnd: 'De tussentijd is voorbij. Knikkers op de stoep nu: {m}. Daarvoor: {n}.',
    ariaTry: 'Idee: {k}. Het begon bij {n}, daarmee kom je op {r}. De klas telde er {m}.',
    sayBefore: 'Vóór de tussentijd: {n}.',
    sayAfter: 'Na de tussentijd: {m}.',
    sayLands: 'Met dit idee: {r}.',
    saidMidRun: 'Wacht tot de tussentijd voorbij is.',
    saidNoTry: 'Er is nog geen idee om weg te halen.',
    saidTryOff: 'Dat idee staat er al.',
    saidLocked: 'Het stoepblad hoort bij het Leerkracht-abonnement.',
    saidDealt: 'Er gebeurt iets anders. Tel eerst de knikkers op de stoep.',
    rangeLabel: 'Hoeveel knikkers',
    rangeTen: 'tot tien',
    rangeSixteen: 'tot zestien',
    sheetTitle: 'De stoep zoals de klas hem zag, en ruimte om op te schrijven wat er gebeurde',
    sheetHint: 'Op elke regel één tussentijd die de klas zag, met de som die erbij hoort.',
    lockedTitle: 'Het stoepblad hoort bij het Leerkracht-abonnement',
    lockedBody: 'Het hele apparaat is gratis — elke tussentijd, de stoep en zoveel ideeën als de klas wil. Het Leerkracht-abonnement voegt het stoepblad toe: daarop staat de stoep zoals de klas hem zag, met lijnen om de sommen op te schrijven die de klas erbij bedacht.',
    gateCta: 'Bekijk het Leerkracht-abonnement',
    gateClose: 'Nu niet'
  },

  /* Swedish — GOLVET · PRICKARNA · ÖGONBLICKET
     ⚠ `luckan` — the obvious Swedish word for "gap" — is #55's central
     part AND its tagline ("Luckan är frågan"). `marken` is
     rounding-hill's ("Marken tar slut vid {n}"). ⚠ `mellantid` is the
     STOPWATCH SPLIT-TIME in Swedish; a house that bans timers must not
     name its central part for one. `bana` -> `banan` refused on sight.
     Definite forms checked aloud: golvet / pricken / prickarna /
     ögonblicket — none collides with an ordinary Swedish word.
     ⚠⚠ THE `banan` DEFECT IS ONE KEYSTROKE AWAY IN OUR OWN LEXICON:
     `förslag` -> definite plural `FÖRSLAGEN`, spelt identically to the
     adjective "cunning, sly". Every string below uses `förslaget` or the
     bare `förslag`; the definite plural is BANNED in this tool. The
     natural sentence "Alla förslagen står kvar" would ship "All the sly
     ones remain" to a class of seven-year-olds.
     ⚠ SEE THE REPORT: `ögonblick` is an exact cognate of Norwegian
     `øyeblikk`. Both panels measured it free in their own lexicon; the
     Norwegian panel flagged the convergence itself. Operator's call. */
  sv: {
    title: 'Ögonblicket',
    instruction: 'Räkna prickarna som ligger på golvet. Sedan täcker ögonblicket prickarna en stund — golvet syns hela tiden och visar bara om något kom eller gick, aldrig hur många. När ögonblicket är över räknar ni igen och listar ut vad som hände medan ni inte kunde se dem.',
    again: 'Låt något annat hända',
    run: 'Låt ögonblicket gå',
    test: 'Pröva',
    clear: 'Ta bort förslaget',
    print: 'Skriv ut arbetsbladet',
    ariaStart: 'Det ligger {n} prickar på golvet.',
    ariaGap: 'Ögonblicket täcker prickarna. Ingenting går att räkna. Golvet finns kvar.',
    ariaCameIn: 'Golvet visar att något kom in från kanten.',
    ariaWentOut: 'Golvet visar att något gick ut mot kanten.',
    ariaEnd: 'Ögonblicket är över. Nu är antalet på golvet {m}. Innan var det {n}.',
    ariaTry: 'Förslaget {k}: från {n} till {r}. Klassen räknade {m}.',
    sayBefore: 'Före ögonblicket: {n}.',
    sayAfter: 'Efter ögonblicket: {m}.',
    sayLands: 'Det förslaget hamnar på {r}.',
    saidMidRun: 'Vänta tills ögonblicket är över.',
    saidNoTry: 'Det finns inget förslag att ta bort än.',
    saidTryOff: 'Det förslaget är redan valt.',
    saidLocked: 'Arbetsbladet ingår i Lärarplanen.',
    saidDealt: 'Nya prickar. Räkna dem innan ni låter ögonblicket gå.',
    rangeLabel: 'Hur många prickar',
    rangeTen: 'upp till tio',
    rangeSixteen: 'upp till sexton',
    sheetTitle: 'Golvet precis som klassen såg det, med plats att skriva vad som hände',
    sheetHint: 'Skriv en rad för varje ögonblick klassen har sett, och likheten som hör ihop med det.',
    lockedTitle: 'Arbetsbladet ingår i Lärarplanen',
    lockedBody: 'Allt här är gratis — varje nytt ögonblick, golvet och så många förslag som klassen vill. Lärarplanen lägger till arbetsbladet, som visar golvet precis som klassen såg det, med linjerade rader för de likheter klassen skriver.',
    gateCta: 'Se Lärarplanen',
    gateClose: 'Inte nu'
  },

  /* Danish — JORDEN · KASTANJERNE · MELLEMTIDEN
     The most fenced locale: BOTH `tæppet` (10) and `gardin` (21) are
     lost, `Gemmegardinet` being #55's own Danish title. Every obvious
     mark-noun was gone — brikker 102, kugler 26, prikker 24 (#55),
     skiver 23, perler 13, pinde 29. ⚠ `grunden` means THE REASON in all
     16 hits, inside a tool that asks children why. ⚠ `frø` refused: en
     frø = a frog, et frø = a seed, same spelling. `kastanjer` is the
     counting material of Danish indskoling and the one thing a child has
     genuinely watched change while not looking.
     ⚠ `væk` avoided in `ariaGap`: it is also the imperative of `at
     vække`, "wake up!" — a `ti`-class trap. `ikke at se` sidesteps it.
     ⚠ `hører TIL` — the particle is load-bearing; bare `hører` = "hears".
     ⚠ `op til ti` is safe only because it is never standalone: "Ti."
     alone is the imperative "Be quiet!". If that chip label is ever
     shortened to `ti`, the defect returns. */
  da: {
    title: 'Mellemtiden',
    instruction: 'Tæl kastanjerne på jorden. Så kommer mellemtiden, hvor kastanjerne ikke er at se: jorden ligger der stadig, og den røber kun, om der kom noget ind, eller om der gik noget ud — aldrig hvor mange. Når mellemtiden er forbi, så tæl igen, og find ud af, hvad der skete, mens I ikke kunne se dem.',
    again: 'Lad noget andet ske',
    run: 'Lad mellemtiden gå',
    test: 'Prøv med',
    clear: 'Fjern forslaget',
    print: 'Print arket',
    ariaStart: 'Der ligger {n} kastanjer på jorden.',
    ariaGap: 'Mellemtiden er i gang. Kastanjerne er ikke at se, og der er ikke noget at tælle. Jorden ligger der stadig.',
    ariaCameIn: 'Jorden viser, at der kom noget ind fra kanten.',
    ariaWentOut: 'Jorden viser, at der gik noget ud til kanten.',
    ariaEnd: 'Mellemtiden er forbi. Nu er der {m} på jorden. Før var der {n}.',
    ariaTry: 'Forslaget er {k}. Fra {n} lander det på {r}. På jorden ligger der {m}.',
    sayBefore: 'Før mellemtiden: {n}.',
    sayAfter: 'Efter mellemtiden: {m}.',
    sayLands: 'Forslaget lander på {r}.',
    saidMidRun: 'Det kan ikke lade sig gøre lige nu.',
    saidNoTry: 'Der er ikke sat noget forslag endnu.',
    saidTryOff: 'Det er allerede jeres forslag.',
    saidLocked: 'Arket hører til Lærerabonnementet.',
    saidDealt: 'Nu er der noget andet på vej. Tæl kastanjerne på jorden, før I går i gang.',
    rangeLabel: 'Hvor mange kastanjer',
    rangeTen: 'op til ti',
    rangeSixteen: 'op til seksten',
    sheetTitle: 'Jorden, som klassen så den — og plads til at skrive, hvad der skete',
    sheetHint: 'Brug en linje til hver mellemtid, klassen har set, og skriv det regnestykke, der hører til.',
    lockedTitle: 'Arket hører til Lærerabonnementet',
    lockedBody: 'Alt her er gratis — hver eneste mellemtid, jorden og lige så mange forslag, som klassen har lyst til. Lærerabonnementet giver desuden det printede ark med jorden, præcis som klassen lige har set den, og med linjer til de regnestykker, klassen selv skriver.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nu'
  },

  /* Norwegian (bokmål) — BAKKEN · PUNKTENE · ØYEBLIKKET
     ⚠ `gapet` — the direct translation — is the one word Norwegian
     cannot use: å gape = to open one's mouth wide, so to a six-year-old
     "gapet" is an open mouth. ⚠ `merkene` refused on MEANING: `merke` is
     the shelf's word for GRADING ("Ingen merker for riktig og galt"), and
     this tool's binding rule is that nothing is marked right or wrong.
     ⚠ `marka` refused: en mark is an EARTHWORM. ⚠ `talte` refused in
     ariaTry: it is also the past of å tale, "to speak" — "Klassen talte
     9" would read "the class SPOKE 9"; ships `telte`.
     ⭐ `punkt` is a neuter monosyllable with a ZERO indefinite plural, so
     1 punkt / 3 punkt / 16 punkt are one form — the {m}=1 trap is solved
     natively. This is Norwegian-only; Danish pluralises `punkter`.
     ⚠ `arket` is neuter (et ark), so it never collides with `arken`,
     Noah's Ark (en ark). Gender does the disambiguation. */
  no: {
    title: 'Øyeblikket vi ikke ser',
    instruction: 'Tell punktene på bakken. Så blir punktene borte et øyeblikk — bakken er der hele tiden, og den viser dere bare om noe kom eller gikk, aldri hvor mange. Når øyeblikket er over, teller dere på nytt og finner ut hva som skjedde mens punktene var borte.',
    again: 'La noe annet skje',
    run: 'Start øyeblikket',
    test: 'Prøv med',
    clear: 'Ta bort forslaget',
    print: 'Skriv ut arket',
    ariaStart: 'Det ligger {n} punkt på bakken.',
    ariaGap: 'Øyeblikket er i gang. Punktene er borte, og det er ingenting å telle. Bakken er der fortsatt.',
    ariaCameIn: 'Bakken viser at noe kom inn fra kanten.',
    ariaWentOut: 'Bakken viser at noe gikk ut mot kanten.',
    ariaEnd: 'Øyeblikket er over. Nå ligger det {m} punkt på bakken. Før lå det {n}.',
    ariaTry: 'Forslaget er {k}. Det begynte på {n} og lander på {r}. Klassen telte {m}.',
    sayBefore: 'Før øyeblikket: {n}.',
    sayAfter: 'Etter øyeblikket: {m}.',
    sayLands: 'Det forslaget lander på {r}.',
    saidMidRun: 'Vent til øyeblikket er over.',
    saidNoTry: 'Det er ikke lagt fram noe forslag ennå.',
    saidTryOff: 'Det forslaget er allerede lagt fram.',
    saidLocked: 'Arket hører til Lærerabonnementet.',
    saidDealt: 'Noe nytt. Tell punktene på bakken før dere starter øyeblikket.',
    rangeLabel: 'Hvor mange punkt',
    rangeTen: 'opp til ti',
    rangeSixteen: 'opp til seksten',
    sheetTitle: 'Bakken slik klassen så den, med plass til å skrive hva som skjedde',
    sheetHint: 'Skriv én linje for hvert øyeblikk klassen så på, og regnestykket som hører til.',
    lockedTitle: 'Arket hører til Lærerabonnementet',
    lockedBody: 'Hele apparatet er gratis — hvert øyeblikk, bakken og så mange forslag klassen vil prøve. Lærerabonnementet gir i tillegg arket, som viser bakken slik klassen nettopp så den, med linjer å skrive regnestykkene på.',
    gateCta: 'Se Lærerabonnementet',
    gateClose: 'Ikke nå'
  },

  /* Finnish — MAA · MERKIT · VÄLIAIKA
     `väliaika` = 0 hits, and every Finnish child knows it from the
     theatre programme and from ice hockey: play stops, the ice is
     covered, you cannot see, then it restarts changed. A span of TIME.
     ⚠ `piste` refused on MEANING: it is the shelf's word for SCORE, and
     "ei pisteitä" is the no-competition promise across ~10 landings.
     (The family measures 29 shelf hits, not the 77 an earlier revision
     of this block claimed; the ruling is unchanged, the number is not.)
     ⚠ `pohja` refused because `paperipohja` is the shelf's word for the
     printed sheet — it would collide inside this tool's own button row.
     `merkki` is shared with #55 deliberately (same object, header law);
     the mathematical "operation sign" reading is defused by naming the
     ground `maa` and never `viiva`.
     ⭐ THE CASE RULE THAT GOVERNS THIS WHOLE SET: a numeral APPOSITIVE to
     an inflected head noun (`merkkejä {n}`, `lukua {k}`, `lukuun {r}`) is
     safe at every value, because the head noun carries the case. A
     numeral standing as a BARE ARGUMENT is not — `yksi` inflects where
     `kaksi`/`kolme` do not. `ariaEnd`'s postposed `merkkejä {m}` is the
     price of count-neutrality and was paid deliberately: the idiomatic
     "Maassa on {m} merkkiä" yields *"1 merkkiä" at the reachable {m}=1.
     ⚠ ONE STRING STILL BREAKS THIS RULE — see the report's independent
     findings: `ariaTry`'s bare "Luokka laski {m}" speaks "laski yksi" at
     {m}=1, reachable in ~9% of scenes. Not applied here, because it is
     not downstream of the English corrections. */
  fi: {
    title: 'Väliaika',
    instruction: 'Laskekaa yhdessä, kuinka monta merkkiä maassa on. Sitten väliaika peittää merkit hetkeksi: maa jää näkyviin ja näyttää vain sen, tuliko jotakin lisää vai lähtikö jotakin pois — ei koskaan sitä, kuinka paljon. Kun väliaika on ohi, laskekaa uudelleen ja päätelkää yhdessä, mitä väliajalla tapahtui.',
    again: 'Uusi näytös',
    run: 'Aloita väliaika',
    test: 'Kokeile lukua',
    clear: 'Poista ehdotus',
    print: 'Tulosta paperipohja',
    ariaStart: 'Maassa on merkkejä {n}.',
    ariaGap: 'Väliaika peittää merkit. Nyt ei voi laskea mitään. Maa on yhä näkyvissä.',
    ariaCameIn: 'Maa näyttää, että jotakin tuli reunalta.',
    ariaWentOut: 'Maa näyttää, että jotakin lähti reunalle.',
    ariaEnd: 'Väliaika on ohi. Maassa on nyt merkkejä {m}. Ennen väliaikaa niitä oli {n}.',
    ariaTry: 'Kokeillaan lukua {k}. Alussa maassa oli merkkejä {n}, ja tämä ehdotus päätyy lukuun {r}. Luokka laski: {m}.',
    sayBefore: 'Ennen väliaikaa: {n}.',
    sayAfter: 'Väliajan jälkeen: {m}.',
    sayLands: 'Tämä ehdotus päätyy lukuun {r}.',
    saidMidRun: 'Odotetaan, kunnes väliaika on ohi.',
    saidNoTry: 'Ei ole vielä ehdotusta, jonka voisi poistaa.',
    saidTryOff: 'Tämä ehdotus on jo valittuna.',
    saidLocked: 'Paperipohjan tulostus kuuluu Opettajatilaukseen.',
    saidDealt: 'Uusi näytös. Laskekaa ensin, mitä maassa on.',
    rangeLabel: 'Merkkien määrä',
    rangeTen: 'enintään kymmenen',
    rangeSixteen: 'enintään kuusitoista',
    sheetTitle: 'Maa sellaisena kuin luokka sen näki, ja tilaa kirjoittaa mitä tapahtui',
    sheetHint: 'Täytetään yksi rivi jokaista väliaikaa kohden ja kirjoitetaan siihen kuuluva lasku.',
    lockedTitle: 'Paperipohja kuuluu Opettajatilaukseen',
    lockedBody: 'Täällä koko väline on maksuton — jokainen näytös, jokainen väliaika, maa ja niin monta ehdotusta kuin luokka haluaa kokeilla. Opettajatilaus tuo lisäksi paperipohjan, jossa on maa sellaisena kuin luokka sen näki, ja viivat, joille luokka kirjoittaa lauseensa.',
    gateCta: 'Tutustu Opettajatilaukseen',
    gateClose: 'Ei nyt'
  }
};
