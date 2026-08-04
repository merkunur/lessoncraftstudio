/* =====================================================================
   TOOL #18 — MONEY MAT   (money-mat.js)
   ---------------------------------------------------------------------
   Free-play utility (no `tasks`). Tool #18 of the Premium Tools Program
   (Wave 3) — coin counting with the coins children ACTUALLY see: a
   market stall with an illustrated item and a price tag, a purse of
   coins, and a mat. Tap coins onto the mat; the running total counts up
   with clinks (pitch falls with coin size) and speaks on demand. After
   an exact payment, "make it another way" gently invites a second
   combination (equivalence without pressure). Premium adds notes, the
   bigger price bands, a participatory change-making mode in which the
   stall keeper counts ON aloud coin-by-coin, and saved stalls.

   CURRENCIES (the moat): EUR (de fr it es nl fi), BRL (pt — Brazilian
   Portuguese is platform-canonical), SEK / DKK / NOK whole-krona
   (minorPerMajor:1 per platform precedent — Denmark's 50-øre skipped),
   en = USD with a GBP settings toggle. Coin faces are STYLIZED: value +
   metal-family color + plain ring, TRUE relative diameters — never
   national designs. Display format via the money-core descriptor
   (comma decimals); price tags read minor-form under 1 major ("45 c"),
   major-form above ("2,30 €"), whole-krona always "7 kr".

   CHANGE MODE — the child BUILDS the change; the keeper narrates.
   Pick something to pay with, and the tender STAYS on the counter beside
   the price for the whole count (it used to vanish the instant it was
   tapped, so the child was asked to count up to a target that was not
   there). Each coin tapped lands on the mat and draws a hop on the rail
   whose LENGTH is its value, and the keeper says the move the CHILD just
   made. The change is named at the END, as a numeral in the total pill —
   never up front, which would turn a missing-addend into copy-the-number,
   and never omitted, which is what the tool used to do: it ended by
   announcing the TENDER, so a teacher paying 45c with $1 was told "that
   makes 1 dollar" while holding 55c. The numeral, not a sentence, does
   the saying — TTS is reliable in only five of the eleven locales and the
   number the child came for must not depend on hearing.

   THE MAT IS THE CHILD'S MONEY IN BOTH DIRECTIONS — what they put down
   when paying, what comes back when getting change. The purse is a pouch
   and the mat is a recessed tray, so the two halves of the only action in
   the tool are two visibly different objects.

   NO-SHAME: no timers/scores/verdict colors; tap a mat coin to take it
   back (full reversibility); the another-way invitation is dismissible
   and simply persists until the multiset differs — never a scolding;
   NO WRONG TAP CAN EXIST — not because it is forgiven but because it is
   not offered: in change mode the purse shows only coins that still fit
   the gap. Overpaying in shop mode runs past the notch as a HATCH, a
   second kind and never a second hue, because a colour would be a verdict.
   The keeper's face NEVER reacts to the child (fixed smile, idle blink).

   Items are alpha-trim-seated on the counter (the standing rule); item
   noun phrases are hand-authored per-locale literals. Pure engines
   (composability, greedy change, placements) are gate-driven.
   ===================================================================== */
var MoneyMat = {
  id: 'money-mat',

  strings: {
    title:        {en:'Money Mat',de:'Die Geldmatte',fr:'Le tapis de la monnaie',it:'Il tappeto dei soldi',es:'El tapete del dinero',pt:'O tapete do dinheiro',nl:'De geldmat',sv:'Pengamattan',da:'Pengemåtten',no:'Pengematta',fi:'Rahamatto'},
    instruction:  {en:'Tap coins onto the mat to pay the exact price.',de:'Tippe Münzen auf die Matte und bezahle passend.',fr:'Touche des pièces pour les poser sur le tapis et payer le prix exact.',it:'Tocca le monete per metterle sul tappeto e pagare il prezzo esatto.',es:'Toca monedas para ponerlas en el tapete y pagar el precio exacto.',pt:'Toque nas moedas para colocá-las no tapete e pagar o preço exato.',nl:'Tik munten op de mat en betaal gepast.',sv:'Tryck på mynt för att lägga dem på mattan och betala jämnt.',da:'Tryk på mønterne for at lægge dem på måtten og betale lige præcis det, varen koster.',no:'Trykk på mynter for å legge dem på matta — og betal akkurat så mye som varen koster.',fi:'Napauta kolikoita matolle ja maksa hinta tasan.'},
    pricePrompt:  {en:'{noun} costs {price}. Can you pay it exactly?',de:'{noun} kostet {price}. Kannst du passend bezahlen?',fr:'{noun} coûte {price}. Peux-tu payer le prix exact ?',it:'{noun} costa {price}. Riesci a pagare l’importo esatto?',es:'{noun} cuesta {price}. ¿Puedes pagar justo?',pt:'{noun} custa {price}. Você consegue pagar certinho?',nl:'{noun} kost {price}. Kun je gepast betalen?',sv:'{noun} kostar {price}. Kan du betala jämnt?',da:'{noun} koster {price}. Kan du betale med lige penge?',no:'{noun} koster {price}. Klarer du å betale helt nøyaktig?',fi:'Tässä olisi {noun} — hinta on {price}. Osaatko maksaa tasarahalla?'},
    paidLine:     {en:'You paid {price} — thank you!',de:'Du hast {price} bezahlt — danke!',fr:'Tu as payé {price} — merci !',it:'Hai pagato {price} — grazie!',es:'Pagaste {price} — ¡gracias!',pt:'Você pagou {price} — a banca agradece!',nl:'Je hebt {price} betaald — dankjewel!',sv:'Du betalade {price} — tack så mycket!',da:'Du betalte {price} — tak skal du have!',no:'Du betalte {price} — tusen takk!',fi:'Se oli tasan {price} — kiitos!'},
    anotherWay:   {en:'Can you make {price} another way?',de:'Kannst du {price} auch anders legen?',fr:'Peux-tu faire {price} d’une autre façon ?',it:'Riesci a fare {price} in un altro modo?',es:'¿Puedes formar {price} de otra manera?',pt:'Você consegue formar {price} de outro jeito?',nl:'Kun je {price} ook op een andere manier leggen?',sv:'Kan du lägga {price} på ett annat sätt?',da:'Kan du lægge {price} på en anden måde?',no:'Kan du lage {price} på en annen måte?',fi:'{price} — osaatko koota sen vielä toisella tavalla?'},
    bothWays:     {en:'Two ways to make {price}!',de:'Zwei Wege zu {price}!',fr:'Deux façons de faire {price} !',it:'Due modi per fare {price}!',es:'¡Dos maneras de formar {price}!',pt:'Dois jeitos de formar {price}!',nl:'Twee manieren om {price} te betalen!',sv:'Två sätt att lägga {price}!',da:'To måder at lægge {price} på!',no:'To måter å lage {price} på!',fi:'Kaksi tapaa samaan summaan — {price}!'},
    notYet:       {en:'Skip',de:'Später',fr:'Plus tard',it:'Più tardi',es:'Ahora no',pt:'Agora não',nl:'Straks',sv:'Inte nu',da:'Senere',no:'Senere',fi:'Ei nyt'},
    anotherItem:  {en:'Another item',de:'Etwas anderes kaufen',fr:'Un autre article',it:'Compra qualcos’altro',es:'Comprar otra cosa',pt:'Outro item',nl:'Iets anders kopen',sv:'En annan vara',da:'En anden vare',no:'En annen vare',fi:'Toinen tuote'},
    startAgain:   {en:'Start again',de:'Noch einmal',fr:'Recommencer',it:'Ricomincia',es:'Empezar de nuevo',pt:'Começar de novo',nl:'Opnieuw beginnen',sv:'Börja om',da:'Begynd forfra',no:'Begynn på nytt',fi:'Aloita alusta'},
    bandChip1:    {en:'Small prices',de:'Kleine Preise',fr:'Petits prix',it:'Prezzi piccoli',es:'Precios pequeños',pt:'Preços pequenos',nl:'Kleine prijzen',sv:'Låga priser',da:'Små priser',no:'Små priser',fi:'Pienet hinnat'},
    bandChip2:    {en:'Bigger prices',de:'Größere Preise',fr:'Prix moyens',it:'Prezzi più grandi',es:'Precios más grandes',pt:'Preços maiores',nl:'Grotere prijzen',sv:'Högre priser',da:'Større priser',no:'Større priser',fi:'Isommat hinnat'},
    bandChip3:    {en:'Big prices',de:'Große Preise',fr:'Grands prix',it:'Prezzi grandi',es:'Precios grandes',pt:'Preços grandes',nl:'Grote prijzen',sv:'Höga priser',da:'Store priser',no:'Kjempestore priser',fi:'Suuret hinnat'},
    changeChip:   {en:'Get change',de:'Rückgeld bekommen',fr:'Recevoir la monnaie',it:'Ricevere il resto',es:'Recibir la vuelta',pt:'Receber troco',nl:'Wisselgeld krijgen',sv:'Få växel tillbaka',da:'Få byttepenge',no:'Få igjen penger',fi:'Saat vaihtorahaa'},
    shopChip:     {en:'Pay exactly',de:'Passend zahlen',fr:'Payer le prix exact',it:'Importo esatto',es:'Pagar justo',pt:'Pagar certinho',nl:'Gepast betalen',sv:'Betala jämnt',da:'Betal med lige penge',no:'Betale nøyaktig',fi:'Maksa tasan'},
    pickTender:   {en:'Choose what to pay with — I’ll give you change!',de:'Such dir aus, womit du bezahlst — ich gebe dir Rückgeld!',fr:'Choisis avec quoi payer — je te rends la monnaie !',it:'Scegli con cosa pagare — ti do il resto!',es:'Elige con qué pagar — ¡yo te doy la vuelta!',pt:'Escolha com o que pagar — eu dou o seu troco!',nl:'Kies waarmee je betaalt — ik geef je wisselgeld!',sv:'Välj vad du vill betala med — jag ger dig växel tillbaka!',da:'Vælg, hvad du betaler med — jeg giver dig byttepenge!',no:'Velg hva du vil betale med — så får du igjen penger av meg!',fi:'Valitse, millä maksat — minä annan vaihtorahat!'},
    changeStart:  {en:'That’s {price} — you paid {tender}. Here comes your change:',de:'Das macht {price} — du hast {tender} gegeben. Hier kommt dein Rückgeld:',fr:'Ça fait {price} — tu as donné {tender}. Voici ta monnaie :',it:'Fa {price} — hai dato {tender}. Ecco il tuo resto:',es:'Son {price} — pagaste con {tender}. Aquí tienes tu vuelta:',pt:'Deu {price} — você pagou com {tender}. Aqui vai o seu troco:',nl:'Dat is dan {price} — je betaalt met {tender}. Hier komt je wisselgeld:',sv:'Det blir {price} — du gav {tender}. Här kommer växeln:',da:'Det bliver {price} — du gav {tender}. Her kommer dine byttepenge:',no:'Det blir {price} — du betalte med {tender}. Her er pengene du skal ha igjen:',fi:'Se tekee {price} — sinulta tuli {tender}. Tässä vaihtorahasi:'},
    countOn:      {en:'…and {step} makes {run}.',de:'…und {step} macht {run}.',fr:'…et {step}, ça fait {run}.',it:'…e {step} fa {run}.',es:'…y {step} son {run}.',pt:'…e {step} dá {run}.',nl:'…en {step} erbij is {run}.',sv:'…och {step} blir {run}.',da:'…og {step} giver {run}.',no:'…og {step} — det blir {run}.',fi:'…ja {step} — yhteensä {run}.'},
    countDone:    {en:'…and that makes {tender}. All done!',de:'…und das macht {tender}. Fertig!',fr:'…et ça fait {tender}. Et voilà !',it:'…e così fa {tender}. Ecco fatto!',es:'…y así llegamos a {tender}. ¡Listo!',pt:'…e isso completa {tender}. Pronto!',nl:'…en dat is samen {tender}. Alsjeblieft!',sv:'…och det blir {tender}. Så där!',da:'…og det giver {tender}. Sådan!',no:'…og da har vi {tender}. Vær så god!',fi:'…ja niin on koossa {tender}. Valmista tuli!'},
    speakTotal:   {en:'Say the total out loud',de:'Den Betrag vorlesen',fr:'Dire le total à voix haute',it:'Ascolta il totale',es:'Decir el total en voz alta',pt:'Falar o total em voz alta',nl:'Het bedrag hardop horen',sv:'Läs upp summan',da:'Sig beløbet højt',no:'Les opp summen',fi:'Lue summa ääneen'},
    matEmpty:     {en:'The mat is empty.',de:'Die Matte ist leer.',fr:'Le tapis est vide.',it:'Il tappeto è vuoto.',es:'El tapete está vacío.',pt:'O tapete está vazio.',nl:'De mat is leeg.',sv:'Mattan är tom.',da:'Måtten er tom.',no:'Matta er tom.',fi:'Matto on tyhjä.'},
    saveStall:    {en:'Save this stall',de:'Diesen Stand speichern',fr:'Enregistrer cet étal',it:'Salva questo banco',es:'Guardar este puesto',pt:'Salvar esta banca',nl:'Dit kraampje opslaan',sv:'Spara torgståndet',da:'Gem denne bod',no:'Lagre denne boden',fi:'Tallenna tämä koju'},
    savedList:    {en:'Saved stalls',de:'Gespeicherte Stände',fr:'Étals enregistrés',it:'Banchi salvati',es:'Puestos guardados',pt:'Bancas salvas',nl:'Opgeslagen kraampjes',sv:'Sparade torgstånd',da:'Gemte boder',no:'Lagrede boder',fi:'Tallennetut kojut'},
    gateBands:    {en:'Bigger prices, banknotes, getting change, saved stalls, and the paper stall are part of Premium. The small-price stall with every coin — and “make it another way” — is always free.',de:'Größere Preise, Geldscheine, Rückgeld, gespeicherte Stände und Kopiervorlagen gehören zu Premium. Der Stand mit kleinen Preisen und allen Münzen — samt „auch anders legen“ — bleibt immer kostenlos.',fr:'Les prix plus grands, les billets, la monnaie rendue, les étals enregistrés et le matériel à imprimer font partie de Premium. L’étal des petits prix avec toutes les pièces — et « d’une autre façon » — reste toujours gratuit.',it:'I prezzi più grandi, le banconote, il resto, i banchi salvati e le schede da ritagliare fanno parte di Premium. Il banco dei prezzi piccoli con tutte le monete — e «in un altro modo» — resta sempre gratuito.',es:'Los precios más grandes, los billetes, recibir la vuelta, los puestos guardados y los recortables forman parte de Premium. El puesto de precios pequeños con todas las monedas — y el «de otra manera» — es gratis para siempre.',pt:'Preços maiores, cédulas, troco, bancas salvas e a feirinha de papel fazem parte do Premium. A banca de preços pequenos com todas as moedas — e o “de outro jeito” — é sempre gratuita.',nl:'Grotere prijzen, briefgeld, wisselgeld, opgeslagen kraampjes en kopieerbladen horen bij Premium. Het kraampje met kleine prijzen en alle munten — én “op een andere manier” — blijft altijd gratis.',sv:'Högre priser, sedlar, växel, sparade torgstånd och utskrivbara underlag ingår i Premium. Torgståndet med låga priser och alla mynt — och ”på ett annat sätt” — är alltid gratis.',da:'Større priser, sedler, byttepenge, gemte boder og kopiark er en del af Premium. Boden med små priser og alle mønter — og “på en anden måde” — er altid gratis.',no:'Papirboden, større priser, sedler, vekslepenger og lagrede boder er en del av Premium. Boden med små priser og alle myntene — og «på en annen måte» — er alltid gratis.',fi:'Kojun paperit, isommat hinnat, setelit, vaihtorahat ja tallennetut kojut kuuluvat Premiumiin. Pienten hintojen koju kolikoineen — ja ”toisella tavalla” — on aina ilmainen.'},
    unlock:       {en:'Unlock everything',de:'Alles freischalten',fr:'Tout débloquer',it:'Sblocca tutto',es:'Desbloquear todo',pt:'Desbloquear tudo',nl:'Alles ontgrendelen',sv:'Lås upp allt',da:'Lås alt op',no:'Lås opp alt',fi:'Avaa kaikki'},
    setCurrency:  {en:'Currency',de:'Währung',fr:'Devise',it:'Valuta',es:'Moneda',pt:'Moeda',nl:'Munteenheid',sv:'Valuta',da:'Valuta',no:'Valuta',fi:'Valuutta'},
    curUSD:       {en:'Dollars (USD)',de:'Dollar (USD)',fr:'Dollars (USD)',it:'Dollari (USD)',es:'Dólares (USD)',pt:'Dólares (USD)',nl:'Dollars (USD)',sv:'Dollar (USD)',da:'Dollar (USD)',no:'Dollar (USD)',fi:'Dollarit (USD)'},
    curGBP:       {en:'Pounds (GBP)',de:'Pfund (GBP)',fr:'Livres (GBP)',it:'Sterline (GBP)',es:'Libras (GBP)',pt:'Libras (GBP)',nl:'Ponden (GBP)',sv:'Pund (GBP)',da:'Pund (GBP)',no:'Pund (GBP)',fi:'Punnat (GBP)'},
    /* ⚠⚠ EN-ONLY, AND MUST NOT DEPLOY THIS WAY. These two are new controls;
       the three-agent native panel per locale (§A.13.48) owns them, and it
       is briefed to audit this English as a SOURCE rather than translate it.
       _loc falls back to .en so the tool degrades to English rather than
       breaking, but shipping that would be the "45 c is nobody's Finnish"
       defect in a new dress. Locale round closes this. */
    /* ⭐ REBUILT BY THREE NATIVE PANELS, NOT TRANSLATED. Each caught something
       the English could not see. `setFineGrain` is SUPPRESSED in sv/da/no
       (whole krona has no finer step, so the label would lie in both
       directions) and below band 3 in nl/fi — the strings exist only so the
       drawer degrades honestly if it is ever shown. fi warned that the
       English promise "cents become necessary" is IMPOSSIBLE in Finland,
       where no 1c or 2c coin circulates, so the fi label claims only
       "finer" and matches the shape of its bandChip neighbours. */
    setFineGrain: {en:'Prices need the small coins',de:'Centgenaue Preise',fr:'Prix à la pièce près',it:'Prezzi alla monetina',es:'Precios a la última moneda',pt:'Preços até a menor moeda',nl:'Prijzen op de kleinste munt',sv:'Priser till minsta myntet',da:'Priser til mindste mønt',no:'Bruk enkronene også',fi:'Tarkemmat hinnat'},
    /* ⚠ every purse noun here is the one the tool's OWN landing copy already
       uses, and each was checked against all ~48 siblings. no takes
       `pengepungen` not bare `pung` — neutral in Danish, playground slang in
       Norwegian, and a 25-character label has no context to disambiguate.
       pt takes `bolsinha` not `carteira`, which is the pupil's DESK in
       Brazilian classroom register and is owned by dictation-desk. */
    setCoinsFrom: {en:'Smallest coin in the purse',de:'Münzen im Geldbeutel',fr:'Pièces du porte-monnaie',it:'Monete nel borsellino',es:'Monedas del monedero',pt:'Moedas da bolsinha',nl:'Munten in de portemonnee',sv:'Mynt i portmonnän',da:'Mønter i pungen',no:'Minste mynt i pengepungen',fi:'Kukkaron pienin kolikko'},
    /* ⚠ NOT "print the mat": fr/it/es/pt `tapis|tappeto|tapete` are owned by
       arrow-strip and sorting-hoops, and it is the word money-mat's own
       apparatus is called. sv rejected `arken` — the definite plural of
       `ark` is spelt identically to Noah's ARK — and sv/da rejected
       `sidorna`/`siderne`, which mean SIDES and are shipped that way by
       number-balance and sort-bins-core. no/fi anchor on the tool's own
       owned noun (bod / koju) because "Skriv ut matta" and "Tulosta matto"
       are ALREADY SHIPPED by two siblings. */
    printBtn:     {en:'Print the paper stall',de:'Kopiervorlagen',fr:'Imprimer le matériel',it:'Stampa e ritaglia',es:'Imprimir recortables',pt:'Imprimir a feirinha',nl:'Kopieerbladen printen',sv:'Skriv ut underlagen',da:'Print kopiarkene',no:'Skriv ut papirboden',fi:'Tulosta kojun paperit'},
    setSpeak:     {en:'Speak the money words',de:'Geldbeträge vorlesen',fr:'Dire les montants à voix haute',it:'Leggi gli importi ad alta voce',es:'Decir las cantidades en voz alta',pt:'Falar os valores em voz alta',nl:'De bedragen hardop voorlezen',sv:'Läs upp beloppen',da:'Sig beløbene højt',no:'Les opp beløpene',fi:'Lue summat ääneen'}
  },

  /* spoken-amount templates — NUMERALS-IN-TEMPLATE, the locale TTS voice
     inflects the numbers ("2 Euro 30" → "zwei Euro dreißig"). Whole-
     krona locales never mention a minor unit. Fan-out corrects. */
  SPOKEN: {
    both: {en:'{maj} {majUnit} and {min} {minUnit}',de:'{maj} {majUnit} {min}',fr:'{maj} {majUnit} et {min} {minUnit}',it:'{maj} {majUnit} e {min}',es:'{maj} {majUnit} con {min}',pt:'{maj} {majUnit} e {min} {minUnit}',nl:'{maj} {majUnit} {min}',sv:'{maj} {majUnit} och {min} {minUnit}',da:'{maj} {majUnit} og {min} {minUnit}',no:'{maj} {majUnit} og {min}',fi:'{maj} {majUnit} {min} {minUnit}'},
    majOnly: {en:'{maj} {majUnit}',de:'{maj} {majUnit}',fr:'{maj} {majUnit}',it:'{maj} {majUnit}',es:'{maj} {majUnit}',pt:'{maj} {majUnit}',nl:'{maj} {majUnit}',sv:'{maj} {majUnit}',da:'{maj} {majUnit}',no:'{maj} {majUnit}',fi:'{maj} {majUnit}'},
    minOnly: {en:'{min} {minUnit}',de:'{min} {minUnit}',fr:'{min} {minUnit}',it:'{min} {minUnit}',es:'{min} {minUnit}',pt:'{min} {minUnit}',nl:'{min} {minUnit}',sv:'{min} {minUnit}',da:'{min} {minUnit}',no:'{min} {minUnit}',fi:'{min} {minUnit}'}
  },
  /* unit WORDS per (currency, locale) — only the pairs that occur.
     s = singular, p = plural (fi partitive as the counted form). */
  UNITW: {
    eur: {
      de: { majS:'Euro', majP:'Euro', minS:'Cent', minP:'Cent' },
      fr: { majS:'euro', majP:'euros', minS:'centime', minP:'centimes' },
      it: { majS:'euro', majP:'euro', minS:'centesimo', minP:'centesimi' },
      es: { majS:'euro', majP:'euros', minS:'céntimo', minP:'céntimos' },
      nl: { majS:'euro', majP:'euro', minS:'cent', minP:'cent' },
      fi: { majS:'euro', majP:'euroa', minS:'sentti', minP:'senttiä' },
      en: { majS:'euro', majP:'euros', minS:'cent', minP:'cents' }
    },
    usd: { en: { majS:'dollar', majP:'dollars', minS:'cent', minP:'cents' } },
    gbp: { en: { majS:'pound', majP:'pounds', minS:'penny', minP:'pence' } },
    brl: { pt: { majS:'real', majP:'reais', minS:'centavo', minP:'centavos' } },
    sek: { sv: { majS:'krona', majP:'kronor', minS:'', minP:'' } },
    dkk: { da: { majS:'krone', majP:'kroner', minS:'', minP:'' } },
    nok: { no: { majS:'krone', majP:'kroner', minS:'', minP:'' } }
  },

  /* ==================== currencies + denominations =================
     Values in MINOR units. Coin faces: value + metal family + TRUE
     relative diameter — stylized, never national designs. */
  CURRENCIES: {
    eur: { symbol: '€', before: false, decimalSep: ',', minorPerMajor: 100,
      coins: [ { v: 1, label: '1c', d: 30, fam: 'copper' }, { v: 2, label: '2c', d: 34, fam: 'copper' }, { v: 5, label: '5c', d: 38, fam: 'copper' },
        { v: 10, label: '10c', d: 35, fam: 'gold' }, { v: 20, label: '20c', d: 39, fam: 'gold' }, { v: 50, label: '50c', d: 43, fam: 'gold' },
        { v: 100, label: '1 €', d: 41, fam: 'bi-sg' }, { v: 200, label: '2 €', d: 45, fam: 'bi-gs' } ],
      notes: [ { v: 500, label: '5 €', tint: '#A9BF9C' }, { v: 1000, label: '10 €', tint: '#D9A0A0' }, { v: 2000, label: '20 €', tint: '#9CB4CF' } ] },
    usd: { symbol: '$', before: true, decimalSep: '.', minorPerMajor: 100,
      coins: [ { v: 1, label: '1¢', d: 34, fam: 'copper' }, { v: 5, label: '5¢', d: 38, fam: 'silver' },
        { v: 10, label: '10¢', d: 31, fam: 'silver' }, { v: 25, label: '25¢', d: 43, fam: 'silver' } ],
      notes: [ { v: 100, label: '$1', tint: '#BFD0B8' }, { v: 500, label: '$5', tint: '#C9BBD8' }, { v: 1000, label: '$10', tint: '#D8C9A8' } ] },
    gbp: { symbol: '£', before: true, decimalSep: '.', minorPerMajor: 100,
      coins: [ { v: 1, label: '1p', d: 34, fam: 'copper' }, { v: 2, label: '2p', d: 43, fam: 'copper' }, { v: 5, label: '5p', d: 31, fam: 'silver' },
        { v: 10, label: '10p', d: 41, fam: 'silver' }, { v: 20, label: '20p', d: 36, fam: 'silver' }, { v: 50, label: '50p', d: 45, fam: 'silver' },
        { v: 100, label: '£1', d: 39, fam: 'gold' }, { v: 200, label: '£2', d: 47, fam: 'bi-sg' } ],
      notes: [ { v: 500, label: '£5', tint: '#9CC0C4' }, { v: 1000, label: '£10', tint: '#C9A886' } ] },
    brl: { symbol: 'R$', before: true, decimalSep: ',', minorPerMajor: 100,
      coins: [ { v: 5, label: '5c', d: 30, fam: 'copper' }, { v: 10, label: '10c', d: 32, fam: 'gold' }, { v: 25, label: '25c', d: 36, fam: 'gold' },
        { v: 50, label: '50c', d: 38, fam: 'silver' }, { v: 100, label: 'R$ 1', d: 41, fam: 'bi-sg' } ],
      notes: [ { v: 200, label: 'R$ 2', tint: '#9CC0C4' }, { v: 500, label: 'R$ 5', tint: '#C4A9C9' }, { v: 1000, label: 'R$ 10', tint: '#D9A0A0' } ] },
    sek: { symbol: 'kr', before: false, decimalSep: ',', minorPerMajor: 1,
      coins: [ { v: 1, label: '1 kr', d: 33, fam: 'copper' }, { v: 2, label: '2 kr', d: 37, fam: 'copper' },
        { v: 5, label: '5 kr', d: 41, fam: 'gold' }, { v: 10, label: '10 kr', d: 35, fam: 'gold' } ],
      notes: [ { v: 20, label: '20 kr', tint: '#C4A9C9' }, { v: 50, label: '50 kr', tint: '#D8B48A' }, { v: 100, label: '100 kr', tint: '#9CB4CF' } ] },
    dkk: { symbol: 'kr', before: false, decimalSep: ',', minorPerMajor: 1,
      coins: [ { v: 1, label: '1 kr', d: 34, fam: 'silver' }, { v: 2, label: '2 kr', d: 38, fam: 'silver' }, { v: 5, label: '5 kr', d: 45, fam: 'silver' },
        { v: 10, label: '10 kr', d: 35, fam: 'gold' }, { v: 20, label: '20 kr', d: 43, fam: 'gold' } ],
      notes: [ { v: 50, label: '50 kr', tint: '#C9A0B4' }, { v: 100, label: '100 kr', tint: '#D8B48A' } ] },
    nok: { symbol: 'kr', before: false, decimalSep: ',', minorPerMajor: 1,
      coins: [ { v: 1, label: '1 kr', d: 34, fam: 'silver' }, { v: 5, label: '5 kr', d: 41, fam: 'silver' },
        { v: 10, label: '10 kr', d: 37, fam: 'gold' }, { v: 20, label: '20 kr', d: 43, fam: 'gold' } ],
      notes: [ { v: 50, label: '50 kr', tint: '#A8C4A0' }, { v: 100, label: '100 kr', tint: '#C9A886' } ] }
  },
  LOCALE_CUR: { en: 'usd', de: 'eur', fr: 'eur', it: 'eur', es: 'eur', pt: 'brl', nl: 'eur', fi: 'eur', sv: 'sek', da: 'dkk', no: 'nok' },
  /* native-ensemble VETOES (nl 2004 / fi 2002 cash rounding): these
     locales drop 1c/2c — the coins children never actually see */
  COIN_MIN: { nl: 5, fi: 5 },

  /* bands: FREE = 1; premium = 2, 3. max in minor units (kr = whole). */
  /* ⭐ THE LADDER IS A CEILING LADDER; THE GRAIN IS ITS OWN AXIS.
     Bands 2 and 3 used to drop the grain to ONE minor unit, so the paid
     tiers generated prices like 13,79 € and 19,97 € — measured, band 3
     needed up to TEN pieces including 1c and 2c, which is not a K-2 task.
     The free band averaged 2.3 coins and was the pedagogically sound one,
     so the paid tiers were degrading the tool rather than deepening it.
     Grain now RISES with the ceiling, keeping the piece count humane, and
     pennies get their own rung through `fineGrain` instead of arriving as a
     side effect of a five-fold ceiling jump. That coupling also meant one
     chip meant three different things: for de/en band 2 raised the ceiling
     AND dropped the grain, for nl/fi/pt only the ceiling moved (their
     minCoin of 5 pinned it), and for sv/da/no likewise. */
  BANDS: {
    1: { maxCents: 100, maxKr: 10, grainCents: 5 },
    2: { maxCents: 500, maxKr: 50, grainCents: 5 },
    3: { maxCents: 2000, maxKr: 100, grainCents: 10 }
  },

  /* ================== the stall items (12, 3 price tiers) =========== */
  ITEMS: [
    { k: 'apple', tier: 1 }, { k: 'banana', tier: 1 }, { k: 'carrot', tier: 1 }, { k: 'strawberry', tier: 1 },
    { k: 'bread', tier: 2 }, { k: 'cheese', tier: 2 }, { k: 'ball', tier: 2 }, { k: 'watermelon', tier: 2 },
    { k: 'book', tier: 3 }, { k: 'shoe', tier: 3 }, { k: 'teddy-bear', tier: 3 }, { k: 'train', tier: 3 }
  ],
  META: {
    apple: ['At the Supermarket', 'apple'], banana: ['At the Supermarket', 'banana'], carrot: ['At the Supermarket', 'carrot'],
    strawberry: ['At the Supermarket', 'strawberry'], bread: ['At the Supermarket', 'bread'], cheese: ['At the Supermarket', 'cheese'],
    ball: ['toys', 'ball'], watermelon: ['4th of July', 'watermelon'], book: ['classroom', 'book'],
    shoe: ['clothing', 'shoe'], 'teddy-bear': ['toys', 'teddy_bear'], train: ['toys', 'train']
  },
  /* alpha-trims (sharp-measured, gate re-measured — the standing rule) */
  TRIMS: {
    apple: { x: 125, y: 24, w: 759, h: 982, iw: 1024, ih: 1024 },
    banana: { x: 31, y: 75, w: 963, h: 894, iw: 1024, ih: 1024 },
    carrot: { x: 120, y: 24, w: 780, h: 983, iw: 1024, ih: 1024 },
    strawberry: { x: 134, y: 29, w: 739, h: 976, iw: 1024, ih: 1024 },
    bread: { x: 24, y: 76, w: 977, h: 895, iw: 1024, ih: 1024 },
    cheese: { x: 29, y: 122, w: 970, h: 785, iw: 1024, ih: 1024 },
    ball: { x: 26, y: 24, w: 963, h: 987, iw: 1024, ih: 1024 },
    watermelon: { x: 43, y: 148, w: 935, h: 739, iw: 1024, ih: 1024 },
    book: { x: 19, y: 273, w: 978, h: 517, iw: 1024, ih: 1024 },
    shoe: { x: 27, y: 274, w: 970, h: 550, iw: 1024, ih: 1024 },
    'teddy-bear': { x: 102, y: 11, w: 820, h: 1002, iw: 1024, ih: 1024 },
    train: { x: 24, y: 166, w: 975, h: 722, iw: 1024, ih: 1024 }
  },
  /* per-locale noun PHRASES (article included; Nordic suffixed
     definites) — hand-authored literals, natives verify at fan-out */
  NOUNS: {
    apple: {en:'the apple',de:'der Apfel',fr:'la pomme',it:'la mela',es:'la manzana',pt:'a maçã',nl:'de appel',sv:'äpplet',da:'æblet',no:'eplet',fi:'omena'},
    banana: {en:'the banana',de:'die Banane',fr:'la banane',it:'la banana',es:'el plátano',pt:'a banana',nl:'de banaan',sv:'bananen',da:'bananen',no:'bananen',fi:'banaani'},
    carrot: {en:'the carrot',de:'die Karotte',fr:'la carotte',it:'la carota',es:'la zanahoria',pt:'a cenoura',nl:'de wortel',sv:'moroten',da:'guleroden',no:'gulroten',fi:'porkkana'},
    strawberry: {en:'the strawberry',de:'die Erdbeere',fr:'la fraise',it:'la fragola',es:'la fresa',pt:'o morango',nl:'de aardbei',sv:'jordgubben',da:'jordbærret',no:'jordbæret',fi:'mansikka'},
    bread: {en:'the bread',de:'das Brot',fr:'le pain',it:'il pane',es:'el pan',pt:'o pão',nl:'het brood',sv:'brödet',da:'brødet',no:'brødet',fi:'leipä'},
    cheese: {en:'the cheese',de:'der Käse',fr:'le fromage',it:'il formaggio',es:'el queso',pt:'o queijo',nl:'de kaas',sv:'osten',da:'osten',no:'osten',fi:'juusto'},
    ball: {en:'the ball',de:'der Ball',fr:'le ballon',it:'la palla',es:'la pelota',pt:'a bola',nl:'de bal',sv:'bollen',da:'bolden',no:'ballen',fi:'pallo'},
    watermelon: {en:'the watermelon',de:'die Wassermelone',fr:'la pastèque',it:'l’anguria',es:'la sandía',pt:'a melancia',nl:'de watermeloen',sv:'vattenmelonen',da:'vandmelonen',no:'vannmelonen',fi:'vesimeloni'},
    book: {en:'the book',de:'das Buch',fr:'le livre',it:'il libro',es:'el libro',pt:'o livro',nl:'het boek',sv:'boken',da:'bogen',no:'boken',fi:'kirja'},
    shoe: {en:'the shoe',de:'der Schuh',fr:'la chaussure',it:'la scarpa',es:'el zapato',pt:'o sapato',nl:'de schoen',sv:'skon',da:'skoen',no:'skoen',fi:'kenkä'},
    'teddy-bear': {en:'the teddy bear',de:'der Teddybär',fr:'l’ours en peluche',it:'l’orsacchiotto',es:'el osito de peluche',pt:'o ursinho de pelúcia',nl:'de teddybeer',sv:'nallebjörnen',da:'bamsen',no:'bamsen',fi:'nallekarhu'},
    train: {en:'the train',de:'der Zug',fr:'le train',it:'il treno',es:'el tren',pt:'o trem',nl:'de trein',sv:'tåget',da:'toget',no:'toget',fi:'juna'}
  },

  defaults: { enCurrency: 'usd', speakNames: true, fineGrain: false, coinsFrom: 0 },
  settings: [
    { key: 'enCurrency', type: 'choice', labelKey: 'setCurrency', options: [
      { value: 'usd', labelKey: 'curUSD' }, { value: 'gbp', labelKey: 'curGBP' }
    ], enOnly: true },
    /* ⚠ fineGrain (the penny rung, age ~7) and coinsFrom (the purse
       restriction, age 5-6) are LIVE IN THE ENGINE and reachable today by
       ?fine=1 and ?coins=5|10, which is language-free and is exactly the
       plannable-link affordance a teacher wants anyway. Their DRAWER ROWS
       are deliberately absent: a settings row needs a label, and the gate
       refused three English-only strings — correctly. The native panel
       round authors setFineGrain / setCoinsFrom / coinsAll in all eleven
       and adds the two rows here in the same commit. Authoring them myself
       would be translate-not-rebuild, which is the one thing the locale
       doctrine forbids. */
    { key: 'coinsFrom', type: 'choice', labelKey: 'setCoinsFrom', options: [] },
    { key: 'fineGrain', type: 'toggle', labelKey: 'setFineGrain' },
    { key: 'speakNames', type: 'toggle', labelKey: 'setSpeak' }
  ],

  /* ⭐ THE FREE/PAID BOUNDARY AS ONE NAMED LITERAL. It used to be scattered
     across `this.premium && this.band > 1` conditions, so there was nothing
     a mutation harness could flip and the entitlement rule could not be
     gated at all — every tool in the v4 cohort declares one of these.
     ⚠ There is no FALLBACK_* book here on purpose: money-mat fetches no
     repertoire, so an offline entitlement failure already degrades to the
     free tier (premium defaults to false) rather than to nothing. */
  FREE_BANDS: 1,
  STORE_KEY: 'lcs:money-mat:v1',
  ENT_TRUST_DAYS: 14,

  /* ======================= PURE money engine ======================= */

  cur: function () {
    var key = this.api && this.api.lang === 'en' ? (this.api.settings.enCurrency || 'usd') : this.LOCALE_CUR[(this.api && this.api.lang) || 'en'];
    return this.CURRENCIES[key];
  },
  /* the locale VIEW of the currency: same descriptor, coins filtered by
     the COIN_MIN veto — every engine path below consumes the view */
  /* the smallest coin actually in the purse: the locale's cash-rounding veto
     (nl/fi never see 1c/2c) OR the teacher's restriction, whichever is
     higher. ⚠ ONE source, because the price generator must use the same
     number — a purse of 10s and 5s handed a price of 3 would be an
     unpayable task, and the child would be the one who looked wrong. */
  minCoin: function () {
    var veto = this.COIN_MIN[(this.api && this.api.lang) || 'en'] || 0;
    var chosen = (this.api && this.api.settings && this.api.settings.coinsFrom) || 0;
    if (chosen && !this.coinsFromApplies(chosen)) chosen = 0;
    return Math.max(veto, chosen);
  },
  /* ⭐⭐ A CONTROL IS ONLY OFFERED WHERE IT HAS A CONSEQUENCE.
     The native panel read the engine, not the copy, and caught both of these
     in controls I had just added — the §23.6 defect the shared liveness gate
     is structurally blind to, because a toggle that flips its own
     aria-checked has "acted".

     fineGrain, measured: DEAD in sv/da/no at every band (whole krona has no
     finer step than one krona, and the branch never consulted the flag), and
     DEAD in nl/fi/pt at bands 1 and 2 — their smallest coin IS 5, so
     max(5,5) === max(5,5). That is six of eleven locales handed a switch
     that provably does nothing, and for pt/nl/fi it is dead in the FREE tier.

     coinsFrom, measured: `10` in sv/da/no leaves band 1 with exactly ONE
     generable price (10 kr, paid with one coin) — a choice with one outcome.
     `5` is inert in pt/nl/fi, whose floor is already 5. */
  fineGrainApplies: function (band) {
    var c = this.cur();
    if ((c.minorPerMajor || 1) === 1) return false;
    var b = this.BANDS[band || this.band || 1];
    /* ⚠ against the EFFECTIVE smallest coin — the currency's own floor, not
       just the teacher's restriction. BRL's smallest coin is 5 centavos, so
       comparing against minCoin() alone reported pt's toggle live in bands
       1 and 2 when the panel had already proven it dead there. */
    return b.grainCents > Math.max(c.coins[0].v, this.minCoin());
  },
  coinsFromApplies: function (v) {
    if (!v) return true;
    var c = this.cur();
    var veto = this.COIN_MIN[(this.api && this.api.lang) || 'en'] || 0;
    if (v <= veto) return false;                       /* the locale already vetoes it */
    if (!c.coins.some(function (d) { return d.v >= v; })) return false;
    /* and it must leave the child a genuine choice of price */
    var b = this.BANDS[this.band || 1];
    var max = (c.minorPerMajor || 1) === 1 ? b.maxKr : b.maxCents;
    var grain = Math.max((c.minorPerMajor || 1) === 1 ? 1 : b.grainCents, v);
    return Math.floor(max / grain) >= 3;
  },
  curView: function () {
    var c = this.cur();
    var min = this.minCoin();
    if (!min) return c;
    var v = {};
    for (var k in c) v[k] = c[k];
    v.coins = c.coins.filter(function (d) { return d.v >= min; });
    return v;
  },
  curKey: function () {
    return this.api && this.api.lang === 'en' ? (this.api.settings.enCurrency || 'usd') : this.LOCALE_CUR[(this.api && this.api.lang) || 'en'];
  },
  /* copied verbatim from money-core.js formatMoney (display format) */
  formatMoney: function (v, c) {
    c = c || this.cur();
    var s;
    if ((c.minorPerMajor || 1) === 1) { s = String(v); }
    else {
      var maj = Math.floor(v / c.minorPerMajor), min = v % c.minorPerMajor;
      s = maj + (c.decimalSep || '.') + (min < 10 ? '0' + min : '' + min);
    }
    return c.before ? (c.symbol + ' ' + s) : (s + ' ' + c.symbol);
  },
  /* the minor-unit mark, ONE site. ⚠ Native panels own this table: `45 c`
     is not how fi (snt), de (Cent), it, es or pt write it — queued for the
     locale round, and it must stay a single site so the fix is one edit. */
  _minorMark: function (cKey) {
    var mark = { eur: 'c', usd: '¢', gbp: 'p', brl: 'c' }[cKey || this.curKey()] || 'c';
    if ((this.api && this.api.lang) === 'nl') mark = 'ct';   /* Dutch tags read "ct" */
    return mark;
  },
  /* the price TAG: minor-form under 1 major, major-form above */
  formatTag: function (v, cKey) {
    var c = this.CURRENCIES[cKey || this.curKey()];
    if (c.minorPerMajor === 1) return v + ' ' + c.symbol;
    if (v < c.minorPerMajor) return v + ' ' + this._minorMark(cKey);
    return this.formatMoney(v, c);
  },
  /* ⭐ ONE NOTATION PER ROUND — the running total's formatter.
     formatTag flips form AT 1 major (95 c → 1,00 €), so pointing the total
     at it would change units MID-COUNT, which is worse than the constant
     mismatch it replaces (measured: the flip lands between 95 and 100 in
     eur/usd/gbp/brl; sv/da/no have one form and are already coherent).
     So the form is pinned to the ROUND's price and every amount — tag,
     total, rail, caption — is rendered that way, always naming the same
     countable unit. `ref` overrides the anchor for amounts belonging to a
     different round.
     RELATION TO formatTag, which is the rule for a tag standing ALONE:
       formatLike(v, v) === formatTag(v)  for every v and every currency.
     They are not interchangeable — in a minor-form round an OVERPAY can
     exceed one major, and formatTag would flip it while formatLike must
     not. Both are live: tags-for-other-rounds (saved stalls, and the print
     sheet's neighbour prices) use formatTag; everything inside the running
     round uses formatLike. */
  formatLike: function (v, ref) {
    var c = this.cur();
    if ((c.minorPerMajor || 1) === 1) return v + ' ' + c.symbol;
    var anchor = (typeof ref === 'number') ? ref : this.price;
    if (anchor < c.minorPerMajor) return v + ' ' + this._minorMark();
    return this.formatMoney(v, c);
  },
  /* PURE: is `amount` composable from `values` (unbounded)? DP. */
  composable: function (amount, values) {
    if (amount === 0) return true;
    var dp = new Array(amount + 1).fill(false);
    dp[0] = true;
    for (var a = 1; a <= amount; a++) {
      for (var i = 0; i < values.length; i++) {
        if (values[i] <= a && dp[a - values[i]]) { dp[a] = true; break; }
      }
    }
    return dp[amount];
  },
  /* PURE: shopkeeper change — EXACT fewest-coins, presented ASCENDING for
     the counting-on ritual.
     ⚠ This was greedy, which is only fewest-coins on a CANONICAL set — and
     the tool stopped shipping only canonical sets the moment a teacher
     could restrict the purse. With ?coins=10 the USD set becomes [10, 25]
     and greedy fails on 30: it takes the 25 and strands a remainder of 5,
     never seeing 10+10+10. tendersFor then filtered out every tender it
     could not make change for, and at 8 measured (price, purse) pairs in
     usd and brl it filtered out ALL of them — leaving the child at an empty
     purse with no way forward. A dead end, reachable, and produced by an
     algorithm that was correct only for the coin sets we happened to have.
     The DP is exact for any set at negligible cost (change ≤ 2000, ≤ 8
     denominations) and keeps the same contract. */
  fewestChange: function (change, coinValues) {
    if (change === 0) return [];
    if (change < 0) return null;
    var vals = coinValues.slice().sort(function (a, b) { return a - b; });
    var len = new Array(change + 1), via = new Array(change + 1);
    len[0] = 0;
    for (var a = 1; a <= change; a++) {
      for (var i = 0; i < vals.length; i++) {
        var v = vals[i];
        if (v > a) break;
        if (len[a - v] === undefined) continue;
        if (len[a] === undefined || len[a - v] + 1 < len[a]) { len[a] = len[a - v] + 1; via[a] = v; }
      }
    }
    if (len[change] === undefined) return null;
    var out = [], cur = change;
    while (cur > 0) { out.push(via[cur]); cur -= via[cur]; }
    return out.sort(function (a, b) { return a - b; });
  },
  /* PURE: valid tenders for a price — the smallest denominations
     strictly above the price WHOSE change counts back in ≤ 6 coins
     (the spoken count-on stays humane); up to 3. */
  tendersFor: function (price, c) {
    var self = this;
    var coinVals = c.coins.map(function (d) { return d.v; });
    var all = c.coins.concat(c.notes)
      .sort(function (a, b) { return a.v - b.v; })
      .filter(function (d) {
        if (d.v <= price) return false;
        var chg = self.fewestChange(d.v - price, coinVals);
        return chg !== null && chg.length <= 6;
      });
    return all.slice(0, 3);
  },
  /* PURE: price generator inputs — the legal price set for (band, tier, currency) */
  priceRange: function (band, tier, cKey, minCoinOverride) {
    var c = this.CURRENCIES[cKey];
    var b = this.BANDS[band];
    var max = c.minorPerMajor === 1 ? b.maxKr : b.maxCents;
    var minCoin = Math.max(c.coins[0].v, minCoinOverride || 0);
    /* fineGrain is the PENNY RUNG (age ~7): the same ceiling, counted to the
       smallest coin in circulation. Nothing in the tool used to be
       1-grained below one major, so a child met pennies for the first time
       at the same moment the ceiling jumped five-fold and banknotes
       appeared — and meanwhile the free purse's 1c/2c were decorative,
       since no band-1 price ever needed them. */
    var fine = !!(this.api && this.api.settings && this.api.settings.fineGrain) && this.fineGrainApplies(band);
    /* ⚠ whole-krona keeps a 1-unit grain — 47 kr is an ordinary K-2 price in
       a currency with no sub-unit, unlike 13,79 € — but it must STILL
       respect minCoin, which it did not: with the purse restricted to 5s and
       10s, sek/dkk/nok happily emitted 6, 7 and 8 kr. 1398 unpayable prices,
       found by sweeping every teacher-settable amount rather than by
       reasoning about it. */
    var grain = c.minorPerMajor === 1
      ? Math.max(1, minCoin)
      : Math.max(fine ? minCoin : b.grainCents, minCoin);
    var lo, hi;
    /* tier 0 = the whole band, which is what a teacher-set price ranges over */
    if (!tier) { lo = grain; hi = max; }
    else if (tier === 1) { lo = grain; hi = Math.max(grain, Math.floor(max * 0.4)); }
    else if (tier === 2) { lo = Math.floor(max * 0.3); hi = Math.floor(max * 0.7); }
    else { lo = Math.floor(max * 0.6); hi = max; }
    lo = Math.max(minCoin, Math.ceil(lo / grain) * grain);
    hi = Math.max(lo, Math.floor(hi / grain) * grain);
    return { lo: lo, hi: hi, grain: grain };
  },
  /* ⭐⭐ THE TEACHER CAN CHOOSE THE PRICE.
     pickPrice ends in Math.random() and the URL took only ?band=, so there
     was NO path — chip, setting, URL or keyboard — by which a teacher could
     say "today the price is 47 cents". For an instrument you stand at the
     front and teach FROM, in a named repeated routine, that is the defect
     that outranks the others: you cannot plan a lesson around it, repeat
     yesterday's amount, run "same amount, different coins" across two days,
     or rescue a rotation when the die hands a child 5c three times running.
     Every sibling instrument lets the teacher set the state; this one was a
     die the teacher watched.
     The legal set is priceRange's own {lo, hi, grain}, so a set price is
     always payable by construction — and saved stalls stop being bookmarks
     of what the die produced and become plans. */
  priceSteps: function () {
    /* ⚠ THE BAND'S RANGE, NOT THE ITEM'S TIER. The tiers exist so a random
       roll suits its item (a teddy bear costs more than an apple) — but a
       teacher asking for 35c must GET 35c, and a tier-3 item was clamping
       that up to 60. Plausibility is the die's concern; the teacher's
       number outranks it, and setPrice moves the stall to a fitting item
       rather than moving the teacher's price. */
    var r = this.priceRange(this.band, 0, this.curKey(), this.minCoin());
    if (this.mode === 'change') {
      var probe = this.pickPrice(this.band, this.ITEMS[this.itemIdx].tier, this.curKey(), 'change');
      /* change mode has its own narrowed window; re-derive it around the probe */
      var g = this.CURRENCIES[this.curKey()].minorPerMajor > 1 ? Math.max(r.grain, 5) : r.grain;
      var cap = this.CURRENCIES[this.curKey()].minorPerMajor > 1
        ? this.BANDS[1].maxCents - g : this.BANDS[1].maxKr;
      return { lo: g, hi: cap, grain: g, at: probe };
    }
    return { lo: r.lo, hi: r.hi, grain: r.grain, at: this.price };
  },
  /* snap any requested amount onto the legal set (never rejects, always
     lands on something payable) */
  snapPrice: function (want) {
    var s = this.priceSteps();
    var v = Math.round(want / s.grain) * s.grain;
    return Math.max(s.lo, Math.min(s.hi, v));
  },
  /* move the stall to an item whose tier suits the chosen price, so the
     teacher gets their number AND the stall stays plausible */
  _fitItemTo: function (v) {
    var cKey = this.curKey(), mc = this.minCoin();
    for (var t = 1; t <= 3; t++) {
      var r = this.priceRange(this.band, t, cKey, mc);
      if (v >= r.lo && v <= r.hi) {
        if (this.ITEMS[this.itemIdx].tier === t) return;
        for (var i = 0; i < this.ITEMS.length; i++) {
          var j = (this.itemIdx + i) % this.ITEMS.length;
          if (this.ITEMS[j].tier === t) { this.itemIdx = j; return; }
        }
        return;
      }
    }
  },
  setPrice: function (want) {
    var v = this.snapPrice(want);
    if (v === this.price) return v;
    this._fitItemTo(v);
    this.price = v;
    this.tray = [];
    this.phase = this.mode === 'change' ? 'changePick' : 'paying';
    this.firstWay = null;
    this.dismissedInvite = false;
    this.chg = null;
    this.render();
    return v;
  },
  pickPrice: function (band, tier, cKey, mode) {
    /* CHANGE MODE runs on band-1 prices (≤ 1 major / ≤ 10 kr) at a
       friendly 5-minor grain — counting on within the unit is the K-2
       skill, and the counted-back change stays ≤ 6 speakable coins in
       EVERY currency (gate-proven; larger spans made USD/NOK change
       inhumane). The band chips govern shop mode only. */
    var effBand = mode === 'change' ? 1 : band;
    var minOv = this.minCoin();
    var r = this.priceRange(effBand, tier, cKey, minOv);
    var grain = r.grain;
    if (mode === 'change' && this.CURRENCIES[cKey].minorPerMajor > 1) {
      grain = Math.max(grain, 5);
      var hiCap = this.BANDS[1].maxCents - grain;   /* strictly below 1 major */
      r = { lo: Math.ceil(r.lo / grain) * grain, hi: Math.min(hiCap, Math.floor(r.hi / grain) * grain), grain: grain };
      if (r.hi < r.lo) r.hi = r.lo;
    }
    var steps = Math.floor((r.hi - r.lo) / r.grain) + 1;
    return r.lo + Math.floor(Math.random() * steps) * r.grain;
  },
  /* PURE: item seating from the alpha-trim (visible bottom-center at
     the anchor point) — the standing image rule, gate-proven */
  _itemPlacement: function (key, maxH, maxW) {
    var t = this.TRIMS[key];
    var k = Math.min(maxH / t.h, maxW / t.w);
    return {
      width: t.iw * k, height: t.ih * k,
      left: -(t.x + t.w / 2) * k,
      bottom: -(t.ih - t.y - t.h) * k
    };
  },

  /* =========================== lifecycle =========================== */

  /* ⭐⭐ THE DRAWER SHOWS ONLY ROWS THAT DO SOMETHING HERE.
     `enOnly: true` has been declared on the Currency row since the tool
     shipped and is honoured NOWHERE — grep lcs-shell.js for it and you get
     zero. So a Finnish class has been offered a choice between "Dollarit
     (USD)" and "Punnat (GBP)" all along, and cur() ignores the setting
     unless lang === 'en', making it inert in ten locales. The shared
     liveness gate cannot see that: a choice chip that flips its own
     aria-checked has "acted".
     The shell builds the drawer LAZILY on click, long after init(), so the
     tool can filter its own rows — no line of lcs-shell.js is touched. */
  _applicableSettings: function () {
    var self = this;
    return this.settings.filter(function (f) {
      if (f.enOnly && self.api.lang !== 'en') return false;
      if (f.key === 'fineGrain') return self.fineGrainApplies();
      if (f.key === 'coinsFrom') return self.coinsFromApplies(5) || self.coinsFromApplies(10);
      return true;
    }).map(function (f) {
      if (f.key !== 'coinsFrom') return f;
      /* ⭐ the options are COIN FACES, not "5+"/"10+". Both native panels
         independently rejected the authored form: `+` is an arithmetic glyph
         in a maths tool, and the same digit means five CENTS in Finnish and
         five KRONER in Norwegian — a hundredfold difference in what the
         teacher just did. formatTag is already the single locale-correct
         site, so this needs no string at all, and it drops the option that
         merely repeats another (nl/fi already floor at 5). */
      var c = self.cur();
      var opts = [{ value: 0, label: self.formatTag(c.coins[0].v) }];
      [5, 10].forEach(function (v) {
        if (self.coinsFromApplies(v)) opts.push({ value: v, label: self.formatTag(v) });
      });
      var out = {};
      for (var k in f) out[k] = f[k];
      out.options = opts;
      return out;
    });
  },

  init: function (api) {
    this.api = api;
    this.premium = false;
    this.band = 1;
    this.mode = 'shop';          /* shop | change */
    this.itemIdx = Math.floor(Math.random() * this.ITEMS.length);
    this.tray = [];              /* minor-unit values on the mat */
    this.phase = 'paying';       /* paying | invited | secondWay | bothWays | changePick | changeCount */
    this.firstWay = null;
    this.dismissedInvite = false;
    this.chg = null;             /* { tender, coins[], idx, run } */
    this._actx = null;

    this.settings = this._applicableSettings();
    this._store = this._loadStore();
    if (!this._store.v) this._store = { v: 1, ent: null, settings: null, stalls: [] };
    if (!this._store.stalls) this._store.stalls = [];
    var saved = this._store.settings || {};
    for (var k in saved) if (Object.prototype.hasOwnProperty.call(api.settings, k)) api.settings[k] = saved[k];

    var params = new URLSearchParams(location.search);
    var wantBand = parseInt(params.get('band'), 10);
    if (wantBand >= 1 && wantBand <= 3) this.band = wantBand;
    /* free resolves band 1 only; the tautology this replaces reduced to the
       same thing by a longer road */
    if (!this.premium) this.band = Math.min(this.band, this.FREE_BANDS);

    this.price = this.pickPrice(this.band, this.ITEMS[this.itemIdx].tier, this.curKey(), this.mode);
    /* ⭐ ?price= is what makes a lesson PLANNABLE — the link goes into a
       slide deck, an MDM or a class page and comes up on the number the
       teacher chose. Snapped onto the band's legal set, so a deep link can
       never land on an unpayable amount. */
    /* language-free teacher controls, live before their drawer rows exist */
    if (params.get('fine') === '1' && this.fineGrainApplies()) api.settings.fineGrain = true;
    var wantCoins = parseInt(params.get('coins'), 10);
    if ((wantCoins === 5 || wantCoins === 10) && this.coinsFromApplies(wantCoins)) api.settings.coinsFrom = wantCoins;
    if (params.get('fine') === '1' || wantCoins) {
      this.price = this.pickPrice(this.band, this.ITEMS[this.itemIdx].tier, this.curKey(), this.mode);
    }
    var wantPrice = parseInt(params.get('price'), 10);
    if (wantPrice > 0) { this.price = this.snapPrice(wantPrice); this._fitItemTo(this.price); }
    this.render();
    this._fetchEntitlement();
    var self = this;
    try {
      var mq = window.matchMedia('(max-width: 480px)');
      var onMq = function () { self.render(); };
      if (mq.addEventListener) mq.addEventListener('change', onMq);
      else if (mq.addListener) mq.addListener(onMq);
    } catch (_) {}
  },

  _loadStore: function () {
    try { return JSON.parse(localStorage.getItem(this.STORE_KEY)) || {}; }
    catch (_) { return {}; }
  },
  _saveStore: function () {
    var st = this._store;
    st.settings = {};
    for (var i = 0; i < this.settings.length; i++) st.settings[this.settings[i].key] = this.api.settings[this.settings[i].key];
    try { localStorage.setItem(this.STORE_KEY, JSON.stringify(st)); } catch (_) {}
  },
  _fetchEntitlement: function () {
    var self = this;
    var cached = this._store.ent;
    var applyDeepLink = function () {
      var params = new URLSearchParams(location.search);
      var wantBand = parseInt(params.get('band'), 10);
      if (self.premium && wantBand >= 2 && wantBand <= 3 && self.band === 1) { self.band = wantBand; self._newPrice(); }
    };
    var trustCache = function () {
      if (cached && cached.tier === 'full' && cached.checkedAt) {
        var age = (Date.now() - new Date(cached.checkedAt).getTime()) / 86400000;
        if (age <= self.ENT_TRUST_DAYS) { self.premium = true; applyDeepLink(); if (self._wrap) self.render(); }
      }
    };
    var token = null;
    try { token = localStorage.getItem('accessToken'); } catch (_) {}
    if (!token) return;
    fetch('/api/auth/me', { headers: { Authorization: 'Bearer ' + token }, cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        if (!j) { trustCache(); return; }
        var tier = j.user && j.user.subscriptionTier;
        var sub = j.subscription;
        self.premium = !!((tier && tier !== 'free') || (sub && (sub.status === 'active' || sub.status === 'past_due')));
        self._store.ent = { tier: self.premium ? 'full' : 'free', checkedAt: new Date().toISOString() };
        self._saveStore();
        if (self._wrap) { applyDeepLink(); self.render(); }
      })
      .catch(function () { trustCache(); });
  },

  /* ====================== helpers + speech + sfx =================== */

  _loc: function (map) { return map ? (map[this.api.lang] || map.en || '') : ''; },
  fmt: function (key, args) {
    var s = this.api.t(key);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _cap: function (s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; },
  _tpl: function (map, args) {
    var s = this._loc(map);
    return s.replace(/\{(\w+)\}/g, function (m, k) { return (args && k in args) ? String(args[k]) : m; });
  },
  _noun: function (key) { return this._loc(this.NOUNS[key]); },
  _imgUrl: function (key) {
    var m = this.META[key];
    return '/image-library-webp/themes/' + encodeURIComponent(m[0]) + '/' + encodeURIComponent(m[1]) + '@2x.webp';
  },
  /* the SPOKEN amount — locale template + unit words, TTS inflects */
  spokenAmount: function (v) {
    var cKey = this.curKey(), c = this.CURRENCIES[cKey];
    var uw = (this.UNITW[cKey] && (this.UNITW[cKey][this.api.lang] || this.UNITW[cKey].en)) || { majS: c.symbol, majP: c.symbol, minS: '', minP: '' };
    if (c.minorPerMajor === 1) {
      return this._tpl(this.SPOKEN.majOnly, { maj: v, majUnit: v === 1 ? uw.majS : uw.majP });
    }
    var maj = Math.floor(v / c.minorPerMajor), min = v % c.minorPerMajor;
    if (min === 0) return this._tpl(this.SPOKEN.majOnly, { maj: maj, majUnit: maj === 1 ? uw.majS : uw.majP });
    if (maj === 0) return this._tpl(this.SPOKEN.minOnly, { min: min, minUnit: min === 1 ? uw.minS : uw.minP });
    return this._tpl(this.SPOKEN.both, { maj: maj, majUnit: maj === 1 ? uw.majS : uw.majP, min: min, minUnit: min === 1 ? uw.minS : uw.minP });
  },
  _speak: function (text) {
    if (this.api.settings.speakNames) {
      try { LCSAudio.speak({ type: 'ui', text: text, lang: this.api.lang, rate: 0.92 }); } catch (_) {}
    }
    this.api.announce(text);
  },
  _ctx: function () {
    if (this._actx === null) {
      try { var AC = window.AudioContext || window.webkitAudioContext; this._actx = AC ? new AC() : false; } catch (_) { this._actx = false; }
    }
    if (this._actx && this._actx.state === 'suspended') { try { this._actx.resume(); } catch (_) {} }
    return this._actx;
  },
  _note: function (freq, at, dur, peak) {
    var ctx = this._ctx();
    if (!ctx) return;
    var t = ctx.currentTime + (at || 0);
    var osc = ctx.createOscillator();
    osc.type = 'sine'; osc.frequency.value = freq;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(peak || 0.12, t + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (dur || 0.2));
    osc.connect(g); g.connect(ctx.destination);
    osc.start(t); osc.stop(t + (dur || 0.2) + 0.05);
  },
  /* clink pitch INVERSELY scaled to diameter — audible denominations */
  _sfxClink: function (d, quiet) {
    var f = 1900 - (d - 28) * 32;
    this._note(f, 0, 0.05, quiet ? 0.05 : 0.10);
    this._note(f * 1.5, 0.02, 0.06, quiet ? 0.03 : 0.07);
  },
  _sfxTick: function (last) { this._note(last ? 880 : 659.25, 0, 0.09, 0.10); },
  _sfxCelebrate: function () { this._note(523.25, 0, 0.3, 0.10); this._note(659.25, 0.10, 0.3, 0.10); this._note(783.99, 0.20, 0.42, 0.10); },
  _sfxPurse: function () { this._note(392, 0, 0.08, 0.07); this._note(523.25, 0.06, 0.10, 0.07); },

  trayTotal: function () { var t = 0; for (var i = 0; i < this.tray.length; i++) t += this.tray[i]; return t; },
  _multisetEq: function (a, b) {
    if (a.length !== b.length) return false;
    var x = a.slice().sort(function (m, n) { return m - n; });
    var y = b.slice().sort(function (m, n) { return m - n; });
    for (var i = 0; i < x.length; i++) if (x[i] !== y[i]) return false;
    return true;
  },
  _newPrice: function () {
    this.price = this.pickPrice(this.band, this.ITEMS[this.itemIdx].tier, this.curKey(), this.mode);
    this.tray = [];
    this.phase = this.mode === 'change' ? 'changePick' : 'paying';
    this.firstWay = null;
    this.dismissedInvite = false;
    this.chg = null;
  },

  /* ============================ render ============================= */

  render: function () {
    var api = this.api, self = this;
    api.stage.innerHTML = '';
    document.body.classList.add('mm-wide');
    /* ⚠ THE LITERAL MUST STAY INTACT. audit-tool-control-liveness derives
       this tool's class prefix by grepping for exactly `api.el('div',
       'mm-wrap')`; concatenating the paid class onto the argument made the
       shared gate unable to resolve a prefix at all, so it exited rather
       than running. The entitlement class goes on afterwards. */
    var wrap = api.el('div', 'mm-wrap');
    if (this.premium) wrap.classList.add('mm-paid');
    api.stage.appendChild(wrap);
    this._wrap = wrap;

    /* ------- the stall scene ------- */
    var scene = api.el('div', 'mm-scene');
    scene.innerHTML =
      '<div class="mm-awning">' + '<span></span><span></span><span></span><span></span><span></span><span></span>' + '</div>' +
      '<div class="mm-keeper">' + this._keeperSVG(this._keeperPose()) + '</div>' +
      '<div class="mm-counter"></div>';
    /* item seated on the counter edge (alpha-trim, the standing rule) */
    var itemKey = this.ITEMS[this.itemIdx].k;
    var anchor = api.el('div', 'mm-item-anchor');
    var phone = false;
    try { phone = window.matchMedia('(max-width: 480px)').matches; } catch (_) {}
    var pl = this._itemPlacement(itemKey, phone ? 66 : 104, phone ? 96 : 150);
    var img = api.el('img', 'mm-item');
    img.src = this._imgUrl(itemKey);
    img.alt = this._noun(itemKey);
    img.draggable = false;
    /* every placement number is linear in the trim scale, so one --mm-sc
       multiplier grows the item and keeps it seated on the counter edge.
       CSS-side (not a build-time constant) so entering fullscreen re-lays it. */
    img.style.width = 'calc(' + pl.width + 'px * var(--mm-sc,1))';
    img.style.left = 'calc(' + pl.left + 'px * var(--mm-sc,1))';
    img.style.bottom = 'calc(' + pl.bottom + 'px * var(--mm-sc,1))';
    anchor.appendChild(img);
    scene.appendChild(anchor);
    /* price tag */
    /* ⭐ the tag IS the control — it already sat at a fixed spot carrying the
       number, and it was inert. Tapping it opens the stepper below. */
    var tag = api.el('div', 'mm-tag');
    var tagBtn = api.el('button', 'mm-tag-body' + (this._priceEdit ? ' editing' : ''));
    tagBtn.type = 'button';
    tagBtn.textContent = this.formatLike(this.price);
    tagBtn.setAttribute('aria-label', this.formatLike(this.price));
    tagBtn.setAttribute('aria-expanded', this._priceEdit ? 'true' : 'false');
    tagBtn.addEventListener('click', function () {
      self._priceEdit = !self._priceEdit;
      self.render();
    });
    tag.innerHTML = '<span class="mm-tag-string"></span>';
    tag.appendChild(tagBtn);
    scene.appendChild(tag);
    wrap.appendChild(scene);

    /* ------- mat + total -------
       ⭐ THE MAT IS THE CHILD'S MONEY, IN BOTH DIRECTIONS. Paying, it holds
       what they put down; getting change, it holds what comes back. Same
       object, same meaning, so the total pill above it needs no relabelling
       to become the answer to "how much did I get back?" — which is the
       question the tool used to end without answering.
       ⚠ The pill used to be HIDDEN for the whole of change mode, taking the
       speaker chip with it: the one on-demand spoken readout, gone from the
       one flow that most needed it, in the six locales that have no voice. */
    /* ⭐ THE SCENE DESCRIBES ITSELF. The stall was a decorative div with an
       alt-tagged image inside it and nothing tying the item to its price —
       and pricePrompt, the sentence that states the task, was authored in
       eleven locales and spoken on exactly ONE path. It is the scene's
       accessible name now, so the task is stated on arrival rather than only
       when the "another item" chip happens to be pressed. */
    scene.setAttribute('role', 'img');
    scene.setAttribute('aria-label', this._cap(this.fmt('pricePrompt', {
      noun: this._noun(itemKey), price: this.formatLike(this.price)
    })));
    img.alt = '';                        /* the scene's label covers it now */

    var matZone = api.el('div', 'mm-matzone');
    var totalRow = api.el('div', 'mm-totalrow' + (this.phase === 'changePick' ? ' mm-hidden' : ''));
    var pill = api.el('div', 'mm-total');
    pill.textContent = this.formatLike(this.trayTotal());
    this._totalEl = pill;
    var spk = api.el('button', 'mm-speak');
    spk.type = 'button';
    spk.setAttribute('aria-label', api.t('speakTotal'));
    spk.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M18.5 6.5a8 8 0 0 1 0 11"/></svg>';
    spk.addEventListener('click', function () {
      var t = self.trayTotal();
      self._speak(t === 0 ? self.api.t('matEmpty') : self.spokenAmount(t));
    });
    totalRow.append(pill, spk);
    matZone.appendChild(totalRow);
    /* the stepper. Numerals only — and each button's ACCESSIBLE NAME is the
       amount it would land on, which is informative and needs no new prose
       in eleven languages. */
    if (this._priceEdit) {
      var steps = this.priceSteps();
      var pad = api.el('div', 'mm-pricepad');
      var mkStep = function (delta, glyph) {
        var b = api.el('button', 'mm-step');
        b.type = 'button';
        b.textContent = glyph;
        var next = self.snapPrice(self.price + delta);
        b.setAttribute('aria-label', self.formatLike(next));
        b.disabled = next === self.price;
        b.addEventListener('click', function () { self.setPrice(self.price + delta); });
        return b;
      };
      var now = api.el('span', 'mm-step-now');
      now.textContent = this.formatLike(this.price);
      pad.append(mkStep(-steps.grain, '−'), now, mkStep(steps.grain, '+'));
      matZone.appendChild(pad);
    }
    this._railEl = api.el('div', 'mm-rail');
    matZone.appendChild(this._railEl);
    var mat = api.el('div', 'mm-mat');
    mat.setAttribute('role', 'group');
    mat.setAttribute('aria-label', this.formatLike(this.trayTotal()));
    this._matEl = mat;
    matZone.appendChild(mat);
    wrap.appendChild(matZone);
    this._paintTray();

    /* phase panels (invitation / both-ways / change) */
    this._phaseHost = api.el('div', 'mm-phasehost');
    wrap.appendChild(this._phaseHost);
    this._paintPhase();

    /* ------- purse (unscaled chrome, ≥44px buttons) ------- */
    this._purseHost = api.el('div', 'mm-purse');
    wrap.appendChild(this._purseHost);
    this._paintPurse();

    wrap.appendChild(this._dock());
    /* the sheet lives in the DOM and is hidden on screen; only @media print
       reveals it, so nothing here can leak into the stage */
    this._sheetEl = api.el('div', 'mm-sheet');
    wrap.appendChild(this._sheetEl);
    /* ⚠ BUILD IT. It was created and never populated, so Ctrl+P printed a
       blank page — and the probe passed because the PROBE called _buildSheet
       itself. A gate you help past is not a gate. */
    this._buildSheet();
  },

  /* ⭐ THE KEEPER — a half-figure the counter genuinely occludes.
     The old one was a head and torso with no arms and no hands, clipped by
     the counter band: viewBox 120x150 gave a 42-wide head against a 92
     shoulder span — 72% head, a bobblehead — and only 6px of it grazed the
     counter, hence the guillotined bust. Now 168x128 with the counter plane
     at y=104: the head is 46% of the shoulders and the torso runs to y=128,
     so 24 units tuck BEHIND the counter instead of being cut by it.

     ⭐⭐ THE NO-SHAME LOCK IS NOW STRUCTURAL, NOT PROMISED. The face is one
     immutable <g> — every feature in it, blink included — and the ONLY
     thing that ever changes is a sibling <g> of hands. A hand opening to
     receive is a stage direction with no valence: it is identical whether
     the child paid in one coin or in eleven, and there is no code path by
     which a child's action can reach the face at all.
     `pose` ∈ idle | receiving | giving. */
  _keeperSVG: function (pose) {
    var SKIN = '#E0A878', SHADE = '#D08F63', HAIR = '#5A4630', SHIRT = '#146B5E';
    var hands = pose === 'giving'
      /* the near hand reaches out over the counter edge, offering */
      ? '<path d="M104 92 q16 -6 27 4 q4 4 -1 7 q-10 6 -22 2 Z" fill="' + SKIN + '"/>'
        + '<circle cx="131" cy="96" r="7" fill="' + SKIN + '"/>'
      : pose === 'receiving'
        /* open, palm up, slightly cupped */
        ? '<path d="M40 96 q-14 -2 -20 8 q-2 5 4 6 q12 1 19 -6 Z" fill="' + SKIN + '"/>'
          + '<path d="M20 104 q10 8 22 6" stroke="' + SHADE + '" stroke-width="2" fill="none" stroke-linecap="round"/>'
        /* both palms flat on the counter */
        : '<rect x="26" y="96" width="26" height="9" rx="4.5" fill="' + SKIN + '"/>'
          + '<rect x="116" y="96" width="26" height="9" rx="4.5" fill="' + SKIN + '"/>';
    return '<svg viewBox="0 0 168 128" width="168" height="128" aria-hidden="true">' +
      /* torso runs PAST the counter plane (y=104) so the counter occludes it */
      '<path d="M38 128 L44 76 Q52 58 84 58 Q116 58 124 76 L130 128 Z" fill="' + SHIRT + '"/>' +
      '<rect x="66" y="76" width="36" height="52" rx="7" fill="#FBF3E4" opacity="0.92"/>' +
      '<path d="M66 82 h36" stroke="#E7DCC8" stroke-width="2"/>' +
      /* arms, which the old figure simply did not have */
      '<path d="M46 78 q-14 8 -18 22" stroke="' + SHIRT + '" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      '<path d="M122 78 q14 8 18 22" stroke="' + SHIRT + '" stroke-width="13" fill="none" stroke-linecap="round"/>' +
      '<g class="mm-hands">' + hands + '</g>' +
      '<rect x="76" y="44" width="16" height="18" rx="6" fill="' + SHADE + '"/>' +
      /* ---- THE FACE: one immutable group. Nothing below reacts, ever. ---- */
      '<g class="mm-face">' +
        '<circle cx="63" cy="30" r="4.5" fill="' + SKIN + '"/><circle cx="105" cy="30" r="4.5" fill="' + SKIN + '"/>' +
        '<circle cx="84" cy="28" r="21" fill="' + SKIN + '"/>' +
        '<path d="M63 25 Q84 -1 105 25 Q99 9 84 8 Q69 9 63 25 Z" fill="' + HAIR + '"/>' +
        '<path d="M75 21 q3 -2 6 -0.5 M87 20.5 q3 -1.5 6 0.5" stroke="' + HAIR + '" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".75"/>' +
        '<circle cx="76" cy="28" r="2.6" fill="#2A2A35" class="mm-eye"/>' +
        '<circle cx="92" cy="28" r="2.6" fill="#2A2A35" class="mm-eye"/>' +
        '<circle cx="76.9" cy="27.1" r=".8" fill="#FFF"/><circle cx="92.9" cy="27.1" r=".8" fill="#FFF"/>' +
        '<circle cx="69" cy="34" r="3.4" fill="#E38A6E" opacity=".24"/>' +
        '<circle cx="99" cy="34" r="3.4" fill="#E38A6E" opacity=".24"/>' +
        '<path d="M77 36 q7 5 14 0" stroke="#8A5A3A" stroke-width="2.4" fill="none" stroke-linecap="round"/>' +
      '</g>' +
      '</svg>';
  },
  /* the pose is a function of the TRANSACTION, never of correctness */
  _keeperPose: function () {
    if (this.phase === 'changeCount' || this.phase === 'changeDone') return 'giving';
    if (this.trayTotal() > 0) return 'receiving';
    return 'idle';
  },

  /* ⭐ THE FACE: digits big, unit mark small. The label shapes differ by
     currency — "25¢" / "£2" / "R$ 1" / "10 kr" / "1c" — so the split is on
     the digit RUN, wherever it sits, which handles all six shapes. Splitting
     them is what lets the digits be large without the mark bursting the
     disc, and the digits are the thing a child reads across a room. */
  _face: function (label) {
    var m = String(label).match(/^(\D*)(\d+)(\D*)$/);
    if (!m) return '<b>' + label + '</b>';
    return (m[1] ? '<i>' + m[1].replace(/ /g, '&nbsp;') + '</i>' : '')
      + '<b>' + m[2] + '</b>'
      + (m[3] ? '<i>' + m[3].replace(/ /g, '&nbsp;') + '</i>' : '');
  },
  _coinBtn: function (den, cls) {
    var api = this.api;
    var b = api.el('button', 'mm-coinbtn ' + (cls || ''));
    b.type = 'button';
    b.setAttribute('aria-label', den.label);
    b.dataset.v = den.v;
    /* ⭐ The diameter is the pedagogy (a 2 € IS bigger than a 1c), so the coin
       publishes its own raw diameter as --mm-d and CSS derives the width, the
       height AND the type size from that one number. Before, the numeral was
       a flat 11px on every coin, so its visual weight was INVERSELY related
       to value — the quarter and the dime carried the same glyph. Deriving it
       means the ratio between denominations is expressed once, and the type
       can never disagree with the disc it sits in. */
    var v = 'style="--mm-d:' + den.d + '"';
    var face = this._face(den.label);
    var inner = den.fam === 'bi-sg'
      ? '<span class="mm-disc fam-gold" ' + v + '><span class="mm-disc-in fam-silver">' + face + '</span></span>'
      : den.fam === 'bi-gs'
        ? '<span class="mm-disc fam-silver" ' + v + '><span class="mm-disc-in fam-gold">' + face + '</span></span>'
        : '<span class="mm-disc fam-' + den.fam + '" ' + v + '>' + face + '</span>';
    b.innerHTML = inner;
    return b;
  },
  _noteBtn: function (den) {
    var b = this.api.el('button', 'mm-notebtn');
    b.type = 'button';
    b.setAttribute('aria-label', den.label);
    b.dataset.v = den.v;
    b.innerHTML = '<span class="mm-note" style="--mm-tint:' + den.tint + '"><u>' + den.label + '</u>' + this._face(den.label) + '</span>';
    return b;
  },
  /* ⭐ A STATIC COIN — used by the two-ways panel and the change tray.
     It carries --mm-d like every other coin, because the panel that shows
     "different coins, SAME value" was drawing every coin at a flat 30px and
     therefore saying the opposite of what it teaches. Scale lives in
     --mm-mini on the container, never in a per-coin override. */
  _discHTML: function (den) {
    if (!den) return '';
    if (!den.fam) {
      /* --mm-tint, never an inline `background:` shorthand (house ban) — the
         shorthand also resets background-image, which blocks any note art. */
      return '<span class="mm-note mini" style="--mm-tint:' + den.tint + '">' + this._face(den.label) + '</span>';
    }
    var fam = den.fam === 'bi-sg' ? 'gold' : den.fam === 'bi-gs' ? 'silver' : den.fam;
    return '<span class="mm-disc mini fam-' + fam + '" style="--mm-d:' + den.d + '">' + this._face(den.label) + '</span>';
  },
  _denOf: function (v) {
    var c = this.cur();
    for (var i = 0; i < c.coins.length; i++) if (c.coins[i].v === v) return c.coins[i];
    for (var j = 0; j < c.notes.length; j++) if (c.notes[j].v === v) return c.notes[j];
    return null;
  },

  _paintPurse: function () {
    var api = this.api, self = this;
    var host = this._purseHost;
    host.innerHTML = '';
    if (this.phase === 'changePick') {
      /* only VALID tenders — no wrong tap exists */
      var tenders = this.tendersFor(this.price, this.curView());
      tenders.forEach(function (den) {
        var b = den.fam ? self._coinBtn(den) : self._noteBtn(den);
        b.addEventListener('click', function () { self._pickTender(den); });
        host.appendChild(b);
      });
      return;
    }
    if (this.phase === 'bothWays' || this.phase === 'changeDone') return;
    var c = this.curView();
    if (this.phase === 'changeCount') {
      /* ⭐ NO WRONG TAP CAN EXIST — not because a wrong tap is forgiven, but
         because it is not offered. The purse shows only coins that still fit
         in the gap, which is the same mechanism tendersFor already uses to
         guarantee every tender is valid. Remove the wrong option; never
         punish it. Nothing here is ever marked, because there is no wrong
         state to mark. */
      var gap = this.changeGap();
      c.coins.forEach(function (den) {
        if (den.v > gap) return;
        var b = self._coinBtn(den);
        b.addEventListener('click', function () { self._placeCoin(den.v); });
        host.appendChild(b);
      });
      return;
    }
    c.coins.forEach(function (den) {
      var b = self._coinBtn(den);
      b.addEventListener('click', function () { self._placeCoin(den.v); });
      host.appendChild(b);
    });
    if (this.premium && this.band > this.FREE_BANDS) {
      c.notes.forEach(function (den) {
        var b = self._noteBtn(den);
        b.addEventListener('click', function () { self._placeCoin(den.v); });
        host.appendChild(b);
      });
    }
  },
  /* how much of the change is still owed */
  changeGap: function () {
    if (!this.chg) return 0;
    return (this.chg.tender - this.price) - this.trayTotal();
  },

  _placeCoin: function (v) {
    if (this.phase === 'bothWays' || this.phase === 'changePick' || this.phase === 'changeDone') return;
    if (this.phase === 'changeCount' && v > this.changeGap()) return;
    this.tray.push(v);
    var den = this._denOf(v);
    this._sfxClink(den ? (den.d || 40) : 40);
    this._paintTray();
    this._checkPaid();
  },
  _removeCoin: function (idx) {
    if (this.phase === 'bothWays' || this.phase === 'changeDone') return;
    var v = this.tray.splice(idx, 1)[0];
    var den = this._denOf(v);
    this._sfxClink(den ? (den.d || 40) : 40, true);
    this._paintTray();
    /* ⭐ TAKING A COIN BACK IS A WAY OF PAYING. Removal used to be the one
       route to an exact total that the tool could not see: a child who
       overpaid (25+10+10+5 against 45) and lifted the 5 back off landed on
       the price in silence, and — from `invited` — a second, genuinely
       different way built that way could never reach `bothWays`, because
       only _placeCoin ever asked. The tool's best moment was unreachable by
       its most natural route.
       (The rewind block that used to sit here was DEAD: it required
       `phase === 'invited' && !this.firstWay`, but firstWay is assigned in
       _checkPaid immediately BEFORE phase becomes 'invited', so the
       condition could never be true. Removed rather than repaired — the
       phase does not need rewinding, since _checkPaid is idempotent on a
       non-matching total.) */
    this._checkPaid();
  },
  /* ⭐ THE COUNT IS THE CHILD'S, AND THE CHANGE IS NAMED AT THE END.
     The keeper narrates the move the CHILD just made — "…and 25 cents makes
     75 cents" — which is the correct counting-on utterance and is already
     authored in all eleven locales, so not one string changes shape here.
     The change amount itself is spoken by the NUMERAL in the total pill
     above the mat, not by a sentence: TTS is reliable in only five of the
     eleven locales, and the number the child came for must not depend on
     hearing. Naming it up front would have handed over the answer and turned
     a missing-addend into copy-the-number; never naming it is what the tool
     used to do, ending without answering its own question. */
  _checkChange: function () {
    if (!this.chg) return;
    var last = this.tray.length ? this.tray[this.tray.length - 1] : 0;
    var run = this.price + this.trayTotal();
    if (this.changeGap() <= 0) {
      this._sfxTick(true);
      this._speak(this.fmt('countDone', { tender: this.spokenAmount(this.chg.tender) }));
      this._sfxCelebrate();
      this.phase = 'changeDone';
    } else if (last) {
      this._sfxTick(false);
      this._speak(this.fmt('countOn', { step: this.spokenAmount(last), run: this.spokenAmount(run) }));
    }
    this._paintPhase();
    this._paintPurse();
  },
  /* the hands follow the transaction between full renders. ⚠ ONLY the hands
     — _keeperSVG rebuilds the whole figure, but the face group inside it is
     byte-identical for every pose, so no child action can reach it. */
  _paintKeeper: function () {
    if (!this._wrap) return;
    var k = this._wrap.querySelector('.mm-keeper');
    if (k) k.innerHTML = this._keeperSVG(this._keeperPose());
  },
  _paintTray: function () {
    var self = this;
    this._paintRail();
    this._paintKeeper();
    if (!this._matEl) return;
    this._matEl.innerHTML = '';
    this.tray.forEach(function (v, i) {
      var den = self._denOf(v);
      if (!den) return;
      var b = den.fam ? self._coinBtn(den, 'on-mat') : self._noteBtn(den);
      b.classList.add('on-mat');
      b.setAttribute('aria-label', den.label + ' → ' + self.formatLike(self.trayTotal() - v));
      b.addEventListener('click', function () { self._removeCoin(i); });
      self._matEl.appendChild(b);
    });
    if (this._totalEl) this._totalEl.textContent = this.formatLike(this.trayTotal());
    if (this._matEl) this._matEl.setAttribute('aria-label', this.formatLike(this.trayTotal()));
    /* ⚠ announce SEPARATELY from _speak: _speak is gated on a setting and on
       a voice existing, and the running total must reach assistive tech in
       all eleven locales regardless of either. */
    if (this.api && this.api.announce) this.api.announce(this.formatLike(this.trayTotal()));
  },
  /* ================== THE RAIL — pure geometry ======================
     ⭐ Shop mode is a COLLECTION on a mat (cardinality); change mode is a
     JOURNEY on a line (missing addend). Same tap, two different
     mathematical objects — and if change mode showed a collection too, the
     two modes would collapse into each other. So the rail is load-bearing,
     not decoration.
       shop:   domain 0 → price, filled by the tray
       change: domain price → tender, filled coin by coin, each one a hop
               whose LENGTH is its value. Taking 5c where 25c would do costs
               five cramped hops instead of one, and the child SEES five.
               That is the material pushing back — no verdict, no colour.
     Overshoot is drawn in a second KIND (a hatch), never a second hue: a
     colour here would be a verdict, and this tool does not deliver verdicts.
     Returns a pure descriptor so the geometry can be gated without a DOM. */
  railModel: function () {
    var inChange = (this.phase === 'changeCount' || this.phase === 'changeDone') && this.chg;
    var from = inChange ? this.price : 0;
    var to = inChange ? this.chg.tender : this.price;
    var span = Math.max(1, to - from);
    var hops = [];
    var run = from;
    if (inChange) {
      for (var i = 0; i < this.tray.length; i++) {
        hops.push({ v: this.tray[i], from: run, to: run + this.tray[i], pct: (this.tray[i] / span) * 100 });
        run += this.tray[i];
      }
    } else {
      run = from + Math.min(this.trayTotal(), span);
    }
    var over = inChange ? 0 : Math.max(0, this.trayTotal() - this.price);
    return {
      from: from, to: to, span: span, run: run, hops: hops, over: over,
      fillPct: Math.max(0, Math.min(100, ((run - from) / span) * 100)),
      overPct: Math.min(100, (over / span) * 100),
      done: run >= to
    };
  },
  _paintRail: function () {
    if (!this._railEl) return;
    var r = this.railModel();
    var el = this._railEl;
    /* the rail is a picture of the numerals beside it — screen readers get
       the numerals, so the drawing itself is decorative */
    el.setAttribute('aria-hidden', 'true');
    var html = '<span class="mm-rail-track">';
    if (r.hops.length) {
      for (var i = 0; i < r.hops.length; i++) {
        html += '<span class="mm-hop" style="width:' + r.hops[i].pct.toFixed(4) + '%"></span>';
      }
    } else if (r.fillPct > 0) {
      html += '<span class="mm-hop solo" style="width:' + r.fillPct.toFixed(4) + '%"></span>';
    }
    if (r.overPct > 0) html += '<span class="mm-over" style="width:' + r.overPct.toFixed(4) + '%"></span>';
    html += '</span>';
    html += '<span class="mm-rail-ends"><span>' + this.formatLike(r.from) + '</span><span>' + this.formatLike(r.to) + '</span></span>';
    el.innerHTML = html;
    el.classList.toggle('mm-rail-change', this.phase === 'changeCount');
  },

  _checkPaid: function () {
    var self = this;
    if (this.phase === 'changeCount') { this._checkChange(); return; }
    if (this.trayTotal() !== this.price) { this._paintPhase(); return; }
    if (this.phase === 'paying') {
      this._sfxCelebrate();
      this._speak(this._cap(this.fmt('paidLine', { price: this.spokenAmount(this.price) })));
      this.firstWay = this.tray.slice();
      this.phase = 'invited';
      this._paintPhase();
      return;
    }
    if (this.phase === 'invited' || this.phase === 'secondWay') {
      /* a differing MULTISET completes the another-way flow; identical
         combinations simply leave the invitation standing (no scolding) */
      if (this.firstWay && !this._multisetEq(this.tray, this.firstWay)) {
        this.phase = 'bothWays';
        this._sfxCelebrate();
        this._speak(this.fmt('bothWays', { price: this.spokenAmount(this.price) }));
        this._paintPhase();
        this._paintPurse();
      } else {
        this._paintPhase();
      }
    }
  },
  _paintPhase: function () {
    var api = this.api, self = this;
    var host = this._phaseHost;
    if (!host) return;
    host.innerHTML = '';
    if (this.phase === 'invited' && !this.dismissedInvite) {
      var inv = api.el('div', 'mm-invite');
      var txt = api.el('span');
      txt.textContent = this.fmt('anotherWay', { price: this.formatLike(this.price) });
      var go = api.el('button', 'mm-chip small primary');
      go.type = 'button'; go.textContent = '✦';
      go.setAttribute('aria-label', this.fmt('anotherWay', { price: this.formatLike(this.price) }));
      go.addEventListener('click', function () {
        self.phase = 'secondWay';
        self.tray = [];
        self._paintTray();
        self._paintPhase();
        self._speak(self.fmt('anotherWay', { price: self.spokenAmount(self.price) }));
      });
      var skip = api.el('button', 'mm-chip small');
      skip.type = 'button'; skip.textContent = api.t('notYet');
      skip.addEventListener('click', function () { self.dismissedInvite = true; self._paintPhase(); });
      inv.append(txt, go, skip);
      host.appendChild(inv);
    }
    if (this.phase === 'bothWays' && this.firstWay) {
      var panel = api.el('div', 'mm-bothways');
      /* ⭐ THE PAYOFF, AT TRUE DIAMETERS AND LEFT-ALIGNED.
         Two rows stacked, with the price on a rule BETWEEN them, so it reads
         25+10+10 ═ 45 ¢ ═ 25+10+5+5. Centring the rows hid the thing worth
         seeing — that one way uses FOUR coins and the other three — and the
         old 26px "=" glyph is redundant once the price sits on the rule. */
      var mk = function (way) {
        var box = api.el('div', 'mm-way');
        way.slice().sort(function (a, b) { return b - a; }).forEach(function (v) {
          box.innerHTML += self._discHTML(self._denOf(v));
        });
        return box;
      };
      var rule = api.el('div', 'mm-bothrule');
      var pricePill = api.el('span', 'mm-bothprice');
      pricePill.textContent = this.formatLike(this.price);
      rule.appendChild(pricePill);
      panel.append(mk(this.firstWay), rule, mk(this.tray));
      var cap = api.el('div', 'mm-bothcap');
      cap.textContent = this.fmt('bothWays', { price: this.formatLike(this.price) });
      host.append(panel, cap);
    }
    if (this.phase === 'changePick') {
      var pick = api.el('div', 'mm-changeline');
      pick.textContent = api.t('pickTender');
      host.appendChild(pick);
    }
    if ((this.phase === 'changeCount' || this.phase === 'changeDone') && this.chg) {
      /* ⭐ THE TENDER STAYS ON SCREEN, AS ONE WHOLE OBJECT.
         It used to VANISH the instant it was tapped — _paintPurse returned
         without painting and :empty removed the box — so the child was asked
         to count up to a target that was not there. Nothing on screen said
         "I gave a dollar; the bread cost 45c". Now the counter holds the
         price beside the coin that paid it, for the whole count. */
      var deck = api.el('div', 'mm-deck');
      var gave = api.el('div', 'mm-gave');
      var gden = this._denOf(this.chg.tender);
      gave.innerHTML = gden ? (gden.fam ? this._discHTML(gden) : this._discHTML(gden)) : '';
      var paidTag = api.el('span', 'mm-deck-price');
      paidTag.textContent = this.formatLike(this.price);
      deck.append(paidTag, gave);
      host.appendChild(deck);
    }
  },
  _pickTender: function (den) {
    /* the child builds the change; the keeper no longer computes it up front */
    if (den.v <= this.price) return;
    this.chg = { tender: den.v };
    this.tray = [];
    this.phase = 'changeCount';
    this._speak(this.fmt('changeStart', { price: this.spokenAmount(this.price), tender: this.spokenAmount(den.v) }));
    this.render();
  },
  /* _acceptChange is GONE. It was a control with exactly one valid option
     and no branch — the child tapped "take" up to six times while the keeper
     read out a script it had computed before the routine began. Nothing was
     counted ON by the child, which is why the mode performed rather than
     taught. The count is now built by _placeCoin like any other coin. */

  /* ====================== the printable sheet ======================
     ⭐ THE PAID ARTEFACT. Three pages, drawn fresh from what is on screen —
     not a screenshot of the stage and not a certificate.

     ⚠⚠ PX_PER_MM IS A STATED CONSTANT AND WANTS A RULER. The `d` values are
     DISPLAY px, and the fraction-kitchen sheet once printed a 6.2mm piece
     for K-2 scissors. At 1.77 — the px-per-mm ratio measured across
     eur/usd/gbp/sek/nok — the coins print 16.9mm to 26.6mm, i.e. life size,
     and the smallest is comfortably cuttable. Measure a printed 2 € against
     a real one before trusting this.
     ⚠ It must NOT inherit --mm-cs or --mm-dz: those are screen-legibility
     multipliers, and the wide tiers would silently print coins at twice
     life size. The sheet sets its own --mm-d chain from scratch.
     ⚠ brl and dkk diameters are NOT faithful to their real coins (21% and
     12% px/mm spread, see verify's ratchet) — their sheets keep the tool's
     internal ratios but will not match a real Brazilian or Danish coin. */
  PX_PER_MM: 1.77,
  SHEET_COPIES: 6,
  _sheetCoinHTML: function (den) {
    var mm = (den.d / this.PX_PER_MM).toFixed(2);
    var fam = den.fam === 'bi-sg' ? 'gold' : den.fam === 'bi-gs' ? 'silver' : (den.fam || 'gold');
    return '<span class="mm-cut fam-' + fam + '" style="width:' + mm + 'mm;height:' + mm + 'mm">'
      + this._face(den.label) + '</span>';
  },
  _buildSheet: function () {
    if (!this._sheetEl) return;
    var self = this, api = this.api;
    var c = this.curView();
    var h = '';

    /* PAGE 1 — the coins, life size, on cut lines. The single most
       photocopied artefact in primary money teaching, and every teacher
       currently makes it badly by hand. */
    h += '<section class="mm-page"><div class="mm-cutgrid">';
    for (var i = 0; i < c.coins.length; i++) {
      for (var n = 0; n < this.SHEET_COPIES; n++) h += this._sheetCoinHTML(c.coins[i]);
    }
    if (this.premium && this.band > 1) {
      for (var j = 0; j < c.notes.length; j++) {
        for (var m = 0; m < 3; m++) {
          h += '<span class="mm-cutnote" style="--mm-tint:' + c.notes[j].tint + '">' + this._face(c.notes[j].label) + '</span>';
        }
      }
    }
    h += '</div></section>';

    /* PAGE 2 — three empty mats, carrying THE PRICE JUST USED plus two
       neighbours from the same band, each with a second mat and an equals
       between: the another-way move, on paper, in the tool's own notation.
       No writing required, which matters at 5-6. */
    var s = this.priceSteps();
    var prices = [this.price];
    if (this.price - s.grain >= s.lo) prices.push(this.price - s.grain);
    if (this.price + s.grain <= s.hi) prices.push(this.price + s.grain);
    while (prices.length < 3) prices.push(this.price);
    h += '<section class="mm-page">';
    for (var p = 0; p < 3; p++) {
      h += '<div class="mm-psheet">'
        + '<div class="mm-ptag">' + this.formatLike(prices[p], prices[p]) + '</div>'
        + '<div class="mm-pmat"></div><div class="mm-peq">=</div><div class="mm-pmat"></div>'
        + '</div>';
    }
    h += '</section>';

    /* PAGE 3 — change mode only: the counting-on line with the SAME price
       and the SAME tender the class just used, and blank hops to draw. */
    if (this.chg) {
      h += '<section class="mm-page"><div class="mm-pline">'
        + '<span class="mm-pend">' + this.formatLike(this.price) + '</span>'
        + '<span class="mm-ptrack"></span>'
        + '<span class="mm-pend">' + this.formatLike(this.chg.tender) + '</span>'
        + '</div><div class="mm-pline"><span class="mm-pend">'
        + this.formatLike(this.price) + '</span><span class="mm-ptrack"></span><span class="mm-pend">'
        + this.formatLike(this.chg.tender) + '</span></div></section>';
    }
    this._sheetEl.innerHTML = h;
  },

  /* ============================ dock =============================== */

  _dock: function () {
    var api = this.api, self = this;
    var dock = api.el('div', 'mm-dock');
    var row = api.el('div', 'mm-chiprow');
    var lock = ' <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';

    /* ⚠ THE BAND CHIPS ARE NOT SHOWN IN CHANGE MODE, because they do nothing
       there. pickPrice forces band 1 whenever mode === 'change', yet the
       handler still set `band`, re-rolled the price and MOVED THE HIGHLIGHT
       — so the chip looked like it had worked. That is worse than an inert
       control: it is a control that lies, and the shared liveness gate
       cannot see it, because a chip that highlights ITSELF has changed the
       DOM and scores as alive. */
    if (this.mode !== 'change') {
      [1, 2, 3].forEach(function (b) {
        var locked = b > self.FREE_BANDS && !self.premium;
        var chip = api.el('button', 'mm-chip' + (self.band === b ? ' active' : '') + (locked ? ' locked' : ''));
        chip.type = 'button';
        chip.innerHTML = api.t('bandChip' + b) + (locked ? lock : '');
        chip.setAttribute('aria-pressed', self.band === b ? 'true' : 'false');
        chip.addEventListener('click', function () {
          if (locked) { self._gate(dock); return; }
          self.band = b;
          self._newPrice();
          self.render();
        });
        row.appendChild(chip);
      });
    }

    var chg = api.el('button', 'mm-chip' + (this.mode === 'change' ? ' active' : '') + (this.premium ? '' : ' locked'));
    chg.type = 'button';
    chg.innerHTML = api.t(this.mode === 'change' ? 'shopChip' : 'changeChip') + (this.premium ? '' : lock);
    chg.addEventListener('click', function () {
      if (!self.premium) { self._gate(dock); return; }
      self.mode = self.mode === 'change' ? 'shop' : 'change';
      self._newPrice();
      self.render();
      if (self.mode === 'change') self._speak(self.api.t('pickTender'));
    });
    row.appendChild(chg);

    var another = api.el('button', 'mm-chip');
    another.type = 'button';
    another.textContent = api.t('anotherItem');
    another.addEventListener('click', function () {
      self.itemIdx = (self.itemIdx + 5) % self.ITEMS.length;   /* coprime hop */
      self._newPrice();
      self.render();
      var key = self.ITEMS[self.itemIdx].k;
      self._speak(self._cap(self.fmt('pricePrompt', { noun: self._noun(key), price: self.spokenAmount(self.price) })));
    });
    row.appendChild(another);

    /* ⭐ the print chip. ⚠ It is NOT the gate — the sheet's @media print
       reveal is scoped to .mm-paid, because Ctrl+P bypasses every button on
       the page. This chip is the affordance; the entitlement lives in the
       model. */
    var pr = api.el('button', 'mm-chip' + (this.premium ? '' : ' locked'));
    pr.type = 'button';
    pr.innerHTML = api.t('printBtn') + (this.premium ? '' : lock);
    pr.addEventListener('click', function () {
      if (!self.premium) { self._gate(dock); return; }
      self._buildSheet();
      try { window.print(); } catch (_) { /* no printer in a headless gate */ }
    });
    row.appendChild(pr);

    var again = api.el('button', 'mm-chip');
    again.type = 'button';
    again.textContent = api.t('startAgain');
    again.addEventListener('click', function () { self._newPrice(); self.render(); });
    row.appendChild(again);

    if (this.premium) {
      var save = api.el('button', 'mm-chip');
      save.type = 'button';
      save.textContent = api.t('saveStall');
      save.addEventListener('click', function () {
        self._store.stalls.unshift({ item: self.ITEMS[self.itemIdx].k, price: self.price, band: self.band, mode: self.mode });
        self._store.stalls = self._store.stalls.slice(0, 8);
        self._saveStore();
        self._sfxPurse();
        self.render();
      });
      row.appendChild(save);
      if (this._store.stalls.length) {
        var list = api.el('button', 'mm-chip');
        list.type = 'button';
        list.textContent = api.t('savedList');
        list.addEventListener('click', function () {
          var old = self._wrap.querySelector('.mm-stalls');
          if (old) { old.remove(); return; }
          var panel = api.el('div', 'mm-stalls');
          self._store.stalls.forEach(function (st) {
            var chipR = api.el('button', 'mm-chip small');
            chipR.type = 'button';
            /* a saved stall is a DIFFERENT round, so its chip carries a price
               TAG (anchored on itself), not this round's pinned form. */
            chipR.textContent = self._cap(self._noun(st.item).replace(/^the /, '')) + ' · ' + self.formatTag(st.price);
            chipR.addEventListener('click', function () {
              self.itemIdx = Math.max(0, self.ITEMS.findIndex(function (it) { return it.k === st.item; }));
              self.band = self.premium ? st.band : 1;
              self.mode = st.mode === 'change' && self.premium ? 'change' : 'shop';
              self._newPrice();
              self.price = st.price;
              self.render();
            });
            panel.appendChild(chipR);
          });
          dock.insertAdjacentElement('beforebegin', panel);
        });
        row.appendChild(list);
      }
    }
    dock.appendChild(row);
    return dock;
  },
  _gate: function (host) {
    var api = this.api;
    var old = this._wrap.querySelector('.mm-gate');
    if (old) old.remove();
    var g = api.el('div', 'mm-gate');
    var txt = api.el('span');
    txt.textContent = api.t('gateBands');
    var a = document.createElement('a');
    a.href = '/' + api.lang + '/pricing?from=tool-money-mat';
    a.target = '_blank'; a.rel = 'noopener';
    a.textContent = api.t('unlock');
    g.append(txt, a);
    host.insertAdjacentElement('beforebegin', g);
    setTimeout(function () { if (g.parentNode) g.remove(); }, 12000);
  },

  onSettings: function () {
    this._saveStore();
    this._newPrice();
    this.render();
  },
  reset: function () {
    this.mode = 'shop';
    this._newPrice();
    this.render();
  },
  paint: function () {}
};

/* per-tool styling: STAGE ONLY + the sanctioned body class */
(function injectCSS() {
  var css = ''
  + 'body.mm-wide .lcs-app{max-width:min(1040px,96vw);}'
  + '@media (max-width:560px){body.mm-wide{overflow-y:auto;}body.mm-wide #lcs-root{height:auto;}}'
  /* --mm-dz: the catalogue-wide coin legibility multiplier. MEASURED, not
     chosen — see scripts/probe-money-mat-coinface.js, which sweeps every
     currency at every viewport and reports the smallest rendered digit and
     any label that bursts its disc. The shipped value is the smallest one
     that clears the 14px numeral floor everywhere without overflow.
     ⚠ Raise the SET, never a single coin: clamping one denomination up to
     the floor would destroy the true relative diameters. */
  /* MEASURED (probe-money-mat-coinface.js, full 8-currency × 8-viewport sweep):
       dz 1.00 / df .30  → smallest digit  9.0px   — the shipped defect
       dz 1.62 / df .30  → 14.6px, 0 bursts, purse ONE row at 768-1366
       dz 1.85 / df .30  → 16.6px but the 8-coin purses WRAP at 1024
       dz 1.62 / df .38  → 18.5px, 0 bursts, purse unchanged   ← shipped
     ⭐ The second lever is the right one: --mm-df is type as a fraction of
     the disc, so raising it buys legibility WITHOUT widening the purse.
     Chasing the same numeral through --mm-dz cost a second row on the
     desktop viewport, where local-test asserts no scrolling. */
  + '.mm-wrap{--mm-dz:1.62;--mm-df:.38;'
  +   'display:flex;flex-direction:column;align-items:center;gap:clamp(5px,1vmin,10px);width:100%;}'

  /* scene: awning band, wall, counter band, keeper, item, tag */
  + '.mm-scene{position:relative;width:min(var(--mm-w,680px),94vw);height:calc(190px * var(--mm-sc,1));'
  +   'border-radius:20px 20px 0 0;overflow:hidden;'
  +   'background:linear-gradient(180deg,#FDF9F0 0%,#FBF3E4 100%);border:2px solid #E7DCC8;border-bottom:none;}'
  /* the awning: a scalloped canopy with a valance shadow under it, rather
     than six flat rectangles that read as a colour bar */
  + '.mm-awning{position:absolute;top:0;left:0;right:0;height:calc(34px * var(--mm-sc,1));display:flex;'
  +   'filter:drop-shadow(0 3px 5px rgba(90,70,48,.22));}'
  + '.mm-awning span{flex:1;border-radius:0 0 60% 60% / 0 0 26px 26px;}'
  + '.mm-awning span:nth-child(odd){background-color:#F2784B;}'
  + '.mm-awning span:nth-child(even){background-color:#F2C879;}'
  /* the rail the canopy hangs from — and what the tag's string hangs from */
  + '.mm-awning::before{content:"";position:absolute;left:0;right:0;top:0;height:5px;'
  +   'background-color:#B9855C;border-radius:2px;}'
  /* the counter gains a lip and a thickness, so goods SIT on it instead of
     floating above a flat band — and it casts a shadow back onto the wall */
  + '.mm-counter{position:absolute;left:0;right:0;bottom:0;height:calc(44px * var(--mm-sc,1));'
  +   'background:linear-gradient(180deg,#D2A66C 0 6%,#C99B62 6% 62%,#B9855C 62% 100%);'
  +   'border-top:3px solid #A9814F;box-shadow:0 -6px 10px -6px rgba(90,70,48,.45);}'
  /* the front edge, which is what gives it depth */
  + '.mm-counter::after{content:"";position:absolute;left:0;right:0;bottom:0;height:calc(9px * var(--mm-sc,1));'
  +   'background-color:#A9784E;box-shadow:inset 0 2px 3px rgba(60,40,24,.3);}'
  /* a contact shadow under the goods, so the item is ON the counter */
  + '.mm-item-anchor::after{content:"";position:absolute;left:50%;bottom:0;transform:translate(-50%,40%);'
  +   'width:calc(96px * var(--mm-sc,1));height:calc(11px * var(--mm-sc,1));border-radius:50%;'
  +   'background-color:rgba(90,70,48,.26);filter:blur(4px);}'
  + '.mm-keeper{position:absolute;right:5%;bottom:calc(20px * var(--mm-sc,1));}'
  + '.mm-keeper svg{width:calc(168px * var(--mm-sc,1));height:calc(128px * var(--mm-sc,1));display:block;}'
  + '.mm-eye{animation:mmBlink 5.2s infinite;}'
  + '@keyframes mmBlink{0%,94%,100%{transform:scaleY(1);}96%,98%{transform:scaleY(0.1);}}'
  + '.mm-keeper .mm-eye{transform-box:fill-box;transform-origin:center;}'
  + '.mm-item-anchor{position:absolute;left:26%;bottom:calc(44px * var(--mm-sc,1));width:0;height:0;}'
  + '.mm-item{position:absolute;user-select:none;-webkit-user-drag:none;pointer-events:none;}'
  + '.mm-tag{position:absolute;left:calc(26% + 66px * var(--mm-sc,1));bottom:calc(104px * var(--mm-sc,1));'
  +   'display:flex;flex-direction:column;align-items:center;}'
  + '.mm-tag-string{width:2px;height:calc(16px * var(--mm-sc,1));background:#8B6F47;}'
  /* ⚠ the tag must not be the SMALLER numeral on screen — it was 17px
     against the total pill's 21px, so the price a child is asked to match
     was quieter than their own running total. */
  + '.mm-tag-body{background:#FDF0DC;border:2px solid #F2C879;border-radius:10px;padding:6px 14px;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:calc(22px * var(--mm-tsc,1));color:#5A4630;transform:rotate(-3deg);'
  +   'box-shadow:0 3px 8px rgba(20,30,28,.12);cursor:pointer;min-height:44px;}'
  + '.mm-tag-body.editing{border-color:#146B5E;box-shadow:0 0 0 3px rgba(20,107,94,.18),0 3px 8px rgba(20,30,28,.12);}'
  /* the teacher's stepper: numerals and two symbols, no prose */
  + '.mm-pricepad{display:flex;align-items:center;justify-content:center;gap:10px;padding:2px 0 4px;}'
  + '.mm-step{min-width:46px;min-height:46px;border-radius:50%;border:1.5px solid var(--lcs-line);'
  +   'background:var(--lcs-surface);color:var(--lcs-structure);font-family:var(--lcs-font-display);'
  +   'font-weight:800;font-size:calc(22px * var(--mm-tsc,1));line-height:1;cursor:pointer;}'
  + '.mm-step:disabled{opacity:.35;cursor:default;}'
  + '.mm-step-now{min-width:96px;text-align:center;font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:calc(20px * var(--mm-tsc,1));color:#146B5E;}'

  /* mat + total */
  + '.mm-matzone{width:min(var(--mm-w,680px),94vw);background:#FBF3E4;border:2px solid #E7DCC8;border-top:none;'
  +   'border-radius:0 0 20px 20px;padding:8px 12px 12px;display:flex;flex-direction:column;gap:6px;}'
  + '.mm-totalrow{display:flex;align-items:center;justify-content:center;gap:8px;}'
  + '.mm-total{min-width:110px;text-align:center;background:var(--lcs-surface);border:2px solid var(--lcs-structure);'
  +   'border-radius:var(--lcs-radius-pill);padding:7px 18px;font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:21px;color:var(--lcs-structure);}'
  + '.mm-speak{width:46px;height:46px;border-radius:50%;border:1.5px solid var(--lcs-line);background:var(--lcs-surface);'
  +   'color:var(--lcs-structure);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;}'
  /* ⭐ THE MAT IS A RECESSED TRAY; THE PURSE IS A POUCH.
     They used to be the same dashed rounded box, so nothing on screen
     distinguished "coins I can take" from "coins I have put down" — the two
     halves of the only action the tool has. The mat is now sunk into the
     counter (inner shadow, no dash, a darker well) and its coins cast a
     shadow onto it; the purse sits proud with a lip over its contents and
     its coins are bedded INTO it. Two objects, two readings, no words. */
  + '.mm-mat{min-height:104px;background:#F0DFC0;border:none;border-radius:14px;'
  +   'box-shadow:inset 0 3px 7px rgba(90,70,48,.28), inset 0 -1px 0 rgba(255,255,255,.5);'
  +   'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;padding:10px;}'
  + '.mm-mat .mm-disc{box-shadow:inset 0 0 0 2.5px rgba(90,70,48,.35), 0 3px 5px rgba(20,30,28,.28);}'

  /* coins + notes */
  + '.mm-coinbtn,.mm-notebtn{min-width:46px;min-height:46px;padding:2px;border:none;background:none;cursor:pointer;'
  +   'display:inline-flex;align-items:center;justify-content:center;}'
  /* ⭐ EVERY COIN DIMENSION DERIVES FROM ONE NUMBER, --mm-d.
     --mm-D is the coin's RENDERED diameter: its true relative size, times
     --mm-dz (the catalogue-wide legibility multiplier), times --mm-cs (the
     wide-tier growth), times --mm-mini (1 on a live coin, smaller on a
     static one). Type is a fraction of --mm-D, so a 25¢ can never carry the
     same glyph as a 10¢ again, and no per-coin clamp can creep in and break
     the ratio — which is the one thing in this tool that must not move. */
  + '.mm-disc{--mm-D:calc(var(--mm-d,34) * 1px * var(--mm-dz,1) * var(--mm-cs,1) * var(--mm-mini,1));'
  +   'width:var(--mm-D);height:var(--mm-D);'
  +   'display:inline-flex;align-items:baseline;justify-content:center;border-radius:50%;'
  +   'font-family:var(--lcs-font-display);font-weight:800;font-size:calc(var(--mm-D) * var(--mm-df,.30));color:#4A3B2A;'
  +   'line-height:1;letter-spacing:-.01em;'
  +   'box-shadow:inset 0 0 0 2.5px rgba(90,70,48,.35), 0 2px 4px rgba(20,30,28,.18);}'
  + '.mm-disc b{font-weight:800;font-size:1em;}'
  + '.mm-disc i{font-style:normal;font-weight:800;font-size:.66em;opacity:.85;}'
  + '.mm-disc.mini{--mm-mini:.86;}'
  + '.fam-copper{background:radial-gradient(circle at 35% 30%,#D89A6E,#B06A42 78%);color:#5A3620;}'
  + '.fam-silver{background:radial-gradient(circle at 35% 30%,#DCDCE2,#A8A8B2 78%);color:#4A4A55;}'
  + '.fam-gold{background:radial-gradient(circle at 35% 30%,#E8C070,#BE9440 78%);color:#5A4620;}'
  /* the bimetallic centre is sized in %, so it tracks the true diameter
     automatically and can never disagree with it */
  + '.mm-disc-in{display:inline-flex;align-items:baseline;justify-content:center;border-radius:50%;width:70%;height:70%;'
  +   'font-size:inherit;box-shadow:inset 0 0 0 1.5px rgba(90,70,48,.3);}'
  + '.mm-note{--mm-N:calc(64px * var(--mm-dz,1) * var(--mm-cs,1) * var(--mm-mini,1));'
  +   'display:inline-flex;align-items:baseline;justify-content:center;position:relative;'
  +   'width:var(--mm-N);height:calc(var(--mm-N) * .5625);'
  +   'background-color:var(--mm-tint,#CBD5CC);'
  +   'border-radius:6px;border:2px solid rgba(90,70,48,.35);font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:calc(var(--mm-N) * .26);line-height:1;color:#3A3A45;box-shadow:0 2px 4px rgba(20,30,28,.15);}'
  + '.mm-note.mini{--mm-mini:.78;}'
  + '.mm-note b{font-weight:800;font-size:1em;}'
  + '.mm-note i{font-style:normal;font-weight:800;font-size:.66em;opacity:.85;}'
  + '.mm-note u{position:absolute;top:2px;left:6px;text-decoration:none;font-size:.5em;opacity:.7;}'

  /* purse */
  + '.mm-purse{position:relative;display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px;'
  +   'width:min(var(--mm-w,680px),94vw);min-height:56px;background:#F7EEDC;border:none;'
  +   'border-radius:10px 10px 20px 20px;padding:12px 10px 8px;'
  +   'box-shadow:0 2px 0 rgba(90,70,48,.18), 0 6px 14px -6px rgba(20,30,28,.28);}'
  /* the pouch lip, drawn over the coins so they read as sitting INSIDE it */
  + '.mm-purse::before{content:"";position:absolute;left:0;right:0;top:0;height:9px;'
  +   'background-color:#E4D2B2;border-radius:10px 10px 0 0;'
  +   'box-shadow:inset 0 -2px 3px rgba(90,70,48,.22);}'
  + '.mm-purse .mm-disc{box-shadow:inset 0 0 0 2.5px rgba(90,70,48,.35), inset 0 3px 5px rgba(90,70,48,.22);}'

  /* phases */
  + '.mm-phasehost{display:flex;flex-direction:column;align-items:center;gap:6px;width:min(var(--mm-w,680px),94vw);}'
  + '.mm-invite{display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;'
  +   'background:#FDF0DC;border:1.5px dashed #F2C879;border-radius:14px;padding:7px 12px;'
  +   'font-family:var(--lcs-font-display);font-weight:700;font-size:14px;color:#8A6320;}'
  /* ⭐ THE PAYOFF. Stacked rows, LEFT-aligned, with the price on a rule
     between them. Centring the rows hid the very thing worth seeing — that
     one way uses four coins and the other three — and the coins now carry
     their true diameters, so the panel finally agrees with what it teaches. */
  + '.mm-bothways{display:flex;flex-direction:column;align-items:stretch;gap:6px;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:16px;padding:12px 16px;'
  +   'box-shadow:0 0 24px rgba(242,200,121,.5);animation:mmShimmer 1.4s var(--lcs-ease);}'
  + '@keyframes mmShimmer{0%{box-shadow:0 0 0 rgba(242,200,121,0);}55%{box-shadow:0 0 34px rgba(242,200,121,.85);}}'
  + '.mm-way{display:flex;align-items:center;gap:5px;flex-wrap:wrap;justify-content:flex-start;}'
  + '.mm-bothrule{display:flex;align-items:center;gap:8px;}'
  + '.mm-bothrule::before,.mm-bothrule::after{content:"";flex:1;height:2px;background:rgba(20,107,94,.35);border-radius:2px;}'
  + '.mm-bothprice{font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:calc(17px * var(--mm-tsc,1));color:#146B5E;white-space:nowrap;}'
  + '.mm-bothcap{font-family:var(--lcs-font-display);font-weight:700;font-size:calc(15px * var(--mm-tsc,1));color:#5A4630;text-align:center;}'
  + '.mm-changeline{font-family:var(--lcs-font-display);font-weight:700;font-size:calc(15px * var(--mm-tsc,1));color:var(--lcs-ink);text-align:center;}'

  /* ⭐ THE RAIL — a JOURNEY, where the mat is a COLLECTION.
     Each hop is its own segment with a hard divider, so five 5c hops read as
     five cramped steps and one 25c hop reads as one stride. That difference
     IS the pushback: fewest-coins gets discovered rather than demonstrated.
     Overshoot is a HATCH — a second kind, never a second hue, because a
     colour here would be a verdict and this tool does not deliver verdicts. */
  + '.mm-rail{display:flex;flex-direction:column;gap:3px;padding:0 2px;}'
  + '.mm-rail-track{display:flex;align-items:stretch;height:calc(16px * var(--mm-tsc,1));'
  +   'background:#EFE3CB;border:1.5px solid rgba(90,70,48,.25);border-radius:var(--lcs-radius-pill);overflow:hidden;}'
  + '.mm-hop{background-color:#146B5E;box-shadow:inset -1.5px 0 0 rgba(253,249,240,.85);'
  +   'transition:width .18s var(--lcs-ease);}'
  + '.mm-hop.solo{box-shadow:none;}'
  + '.mm-hop:last-child{box-shadow:none;}'
  + '.mm-over{background-image:repeating-linear-gradient(135deg,#146B5E 0 5px,#EFE3CB 5px 10px);'
  +   'box-shadow:inset 1.5px 0 0 rgba(253,249,240,.9);}'
  + '.mm-rail-ends{display:flex;justify-content:space-between;font-family:var(--lcs-font-display);'
  +   'font-weight:800;font-size:calc(15px * var(--mm-tsc,1));color:#5A4630;opacity:.85;}'

  /* the counter deck: the price, and beside it the money that paid it */
  + '.mm-deck{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;'
  +   'background:var(--lcs-surface);border:1.5px solid var(--lcs-line);border-radius:16px;padding:8px 16px;}'
  + '.mm-deck-price{font-family:var(--lcs-font-display);font-weight:800;'
  +   'font-size:calc(19px * var(--mm-tsc,1));color:#5A4630;}'
  + '.mm-gave{display:flex;align-items:center;gap:6px;}'
  + '.mm-gave::before{content:"";width:calc(22px * var(--mm-tsc,1));height:2px;background:rgba(90,70,48,.35);border-radius:2px;}'

  /* gate + stalls + dock */
  + '.mm-gate{display:flex;flex-direction:column;gap:5px;padding:10px 14px;max-width:560px;margin:2px auto;'
  +   'background:#FDF0DC;border:1.5px solid #F2C879;border-radius:14px;'
  +   'font-size:13.5px;font-family:var(--lcs-font-body);color:var(--lcs-ink);text-align:center;}'
  + '.mm-gate a{color:#C9502A;font-weight:800;text-decoration:underline;}'
  + '.mm-stalls{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;max-width:min(var(--mm-w,680px),94vw);}'
  + '.mm-dock{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;padding-bottom:4px;}'
  + '.mm-chiprow{display:flex;align-items:center;justify-content:center;gap:7px;flex-wrap:wrap;}'
  + '.mm-chip{display:inline-flex;align-items:center;gap:6px;min-height:46px;font-family:var(--lcs-font-display);'
  +   'font-weight:700;font-size:13.5px;color:var(--lcs-structure);background:var(--lcs-surface);'
  +   'border:1.5px solid var(--lcs-line);border-radius:var(--lcs-radius-pill);padding:8px 13px;cursor:pointer;'
  +   'transition:transform .1s var(--lcs-ease);}'
  + '.mm-chip:active{transform:scale(.96);}'
  + '.mm-chip.active{background:var(--lcs-structure);color:var(--lcs-surface);border-color:var(--lcs-structure);}'
  + '.mm-chip.locked{color:var(--lcs-ink-soft);}'
  + '.mm-chip.small{min-height:44px;padding:7px 11px;}'
  + '.mm-chip.small.primary{background:#FDF0DC;border-color:#F2C879;color:#C9502A;font-size:16px;min-width:44px;}'

  + '.mm-hidden{display:none;}'
  /* ⚠ NO `:empty{display:none}` HERE. _paintPurse empties its host during
     BOTH changeCount and bothWays, and above 1367 the purse is its own grid
     column — so collapsing it made the whole board lurch sideways at the two
     most important moments in the tool. Reserve the space instead. Invisible
     in every phone screenshot, which is exactly why it survived. */
  + '.mm-purse:empty{border-color:transparent;background:none;}'
  + '@media (min-width:900px){.mm-purse{gap:10px;padding:8px 10px;}'
  +   '.mm-purse .mm-disc{transform:scale(1.22);}'
  +   '.mm-purse .mm-note{transform:scale(1.15);}}'

  /* phone */
  + '@media (max-width:480px){'
  +   '.mm-scene{height:calc(158px * var(--mm-sc,1));}'
  +   '.mm-keeper svg{width:118px;height:90px;}'
  +   '.mm-item-anchor{left:22%;}'
  +   '.mm-tag{left:calc(22% + 52px);bottom:96px;}'
  +   '.mm-total{font-size:18px;}'
  + '}'

  /* ---- wide board (§23 the apparatus a teacher teaches FROM) ----
     One --mm-w drives the five stacked panels (scene / matzone / purse /
     phasehost / stalls) because they are one column and must stay flush.
     --mm-sc scales the SCENE geometry (all of it linear in one trim factor),
     --mm-cs the coin+note set (ratios between denominations preserved
     exactly — that ratio IS the pedagogy), --mm-tsc the read-out type.
     Vertical cost: the scene is 190·sc and the rest is roughly flat, so a
     tier's sc ceiling is (tierHeight − ~560 chrome+mat+purse+dock)/190. */
  /* ⭐⭐ THE SHOP CARD HAS A NATURAL WIDTH; THE COIN TRAY TAKES THE REST.
     The first version of this tier just raised --mm-w to 1680 and every
     measured assertion passed — FILL 65.6%, no overflow, type over floor.
     Reading the 2560 render showed why that was hollow: the scene holds
     exactly three things (awning, one item, the keeper) at FIXED percent
     positions, so a 1680px band is a barn with a carrot in it. Widening a
     box that has no content to put in it is the rekenrek bead defect in
     another dress. So above 1367 the column becomes two: the shop card
     (scene glued to matzone, one drawn object) keeps a width its content can
     actually fill, and the purse moves beside it as a till tray. Phase
     panels and the dock still span the full board.
     ⚠ row-gap MUST be 0 — matzone carries `border-top:none` because it is
     the bottom half of the scene's card; any gap opens a seam. */
  + '@media (min-width:1367px) and (min-height:880px){'
  +   'body.mm-wide .lcs-app{max-width:min(1192px,96vw);}'
  +   'body.mm-wide{--mm-w:700px;--mm-sc:1.55;--mm-cs:1.34;--mm-tsc:1.2;}'
  +   'body.mm-wide .mm-wrap{display:grid;grid-template-columns:var(--mm-w) auto;justify-content:center;'
  +     'row-gap:0;column-gap:26px;align-items:start;justify-items:center;}'
  +   'body.mm-wide .mm-scene{grid-column:1;grid-row:1;}'
  +   'body.mm-wide .mm-matzone{grid-column:1;grid-row:2;}'
  /* ⚠ a FLEX-WRAP tray beside the shop wrapped 7+1 at 2560 — the odd coin
     alone on a second row reads as a mistake, not as a tray. Two fixed
     columns give 8→4×2, 5→3 rows, 4→2×2 in every currency the tool ships. */
  +   'body.mm-wide .mm-purse{grid-column:2;grid-row:1 / span 2;align-self:center;'
  +     'width:auto;max-width:none;padding:14px 16px;display:grid;'
  +     'grid-template-columns:repeat(2,auto);justify-content:center;place-items:center;}'
  +   'body.mm-wide .mm-phasehost{grid-column:1 / -1;grid-row:3;width:100%;max-width:none;margin-top:10px;}'
  +   'body.mm-wide .mm-dock{grid-column:1 / -1;grid-row:4;margin-top:8px;}'
  +   'body.mm-wide .mm-total{font-size:26px;}'
  +   'body.mm-wide .mm-mat{min-height:150px;gap:7px;}'
  + '}'
  + '@media (min-width:1800px) and (min-height:1080px){'
  +   'body.mm-wide .lcs-app{max-width:min(1560px,96vw);}'
  +   'body.mm-wide{--mm-w:960px;--mm-sc:1.9;--mm-cs:1.62;--mm-tsc:1.35;}'
  +   'body.mm-wide .mm-wrap{column-gap:32px;}'
  +   'body.mm-wide .mm-total{font-size:30px;}'
  +   'body.mm-wide .mm-mat{min-height:190px;gap:9px;}'
  +   'body.mm-wide .mm-purse{gap:12px;padding:16px;}'
  + '}'
  + '@media (min-width:2400px) and (min-height:1150px){'
  +   'body.mm-wide .lcs-app{max-width:min(1752px,96vw);}'
  +   'body.mm-wide{--mm-w:1120px;--mm-sc:2.1;--mm-cs:1.9;--mm-tsc:1.5;}'
  +   'body.mm-wide .mm-wrap{column-gap:36px;}'
  +   'body.mm-wide .mm-total{font-size:34px;}'
  +   'body.mm-wide .mm-mat{min-height:225px;gap:12px;}'
  +   'body.mm-wide .mm-purse{gap:14px;padding:18px;}'
  + '}'

  /* ⭐ THE PRINT SHEET. Hidden on screen, revealed only by @media print —
     and the chrome goes, because a printed picture of a button is not a
     worksheet. ⚠ The cut-out coins are sized in MILLIMETRES from their own
     --mm-d, deliberately outside the --mm-cs / --mm-dz chain: those are
     screen-legibility multipliers and the wide tiers would print coins at
     twice life size. */
  + '.mm-sheet{display:none;}'
  + '@media print{'
  +   '*{-webkit-print-color-adjust:exact !important;print-color-adjust:exact !important;}'
  +   '.lcs-header,.lcs-bar,.mm-scene,.mm-matzone,.mm-purse,.mm-phasehost,.mm-dock,.mm-gate{display:none !important;}'
  +   '.mm-wrap.mm-paid .mm-sheet{display:block !important;}'
  /* ⚠⚠ GATING THE CHIP IS NOT GATING THE FEATURE. Ctrl+P bypasses every
     button on the page, so the reveal is scoped to an entitlement class the
     MODEL writes — the recorded fraction-kitchen defect, caught here by a
     native panel reading the CSS rather than the copy. */
  +   '.mm-wrap:not(.mm-paid) .mm-sheet{display:none !important;}'
  +   '.mm-page{break-after:page;padding:0;}'
  +   '.mm-page:last-child{break-after:auto;}'
  +   '.mm-cutgrid{display:flex;flex-wrap:wrap;gap:6mm;align-items:center;}'
  +   '.mm-cut{display:inline-flex;align-items:center;justify-content:center;border-radius:50%;'
  +     'border:1px dashed #555;font-family:var(--lcs-font-display);font-weight:800;'
  +     'font-size:3.2mm;color:#000;}'
  +   '.mm-cut b{font-size:1em;}.mm-cut i{font-style:normal;font-size:.7em;}'
  +   '.mm-cutnote{display:inline-flex;align-items:center;justify-content:center;'
  +     'width:38mm;height:21mm;border:1px dashed #555;border-radius:1.5mm;'
  +     'background-color:var(--mm-tint,#eee);font-family:var(--lcs-font-display);font-weight:800;font-size:4mm;color:#000;}'
  +   '.mm-psheet{display:flex;align-items:center;gap:4mm;margin-bottom:9mm;break-inside:avoid;}'
  +   '.mm-ptag{min-width:22mm;font-family:var(--lcs-font-display);font-weight:800;font-size:6mm;color:#000;}'
  +   '.mm-pmat{flex:1;height:26mm;border:1.2px solid #333;border-radius:3mm;}'
  +   '.mm-peq{font-family:var(--lcs-font-display);font-weight:800;font-size:7mm;color:#000;}'
  +   '.mm-pline{display:flex;align-items:center;gap:3mm;margin-bottom:22mm;break-inside:avoid;}'
  +   '.mm-pend{font-family:var(--lcs-font-display);font-weight:800;font-size:5mm;color:#000;white-space:nowrap;}'
  +   '.mm-ptrack{flex:1;height:2.5mm;border:1.2px solid #333;border-radius:1.2mm;}'
  +   '@page{margin:14mm;}'
  + '}'

  /* reduced motion */
  + '@media (prefers-reduced-motion: reduce){'
  +   '.mm-eye{animation:none;}'
  +   '.mm-bothways{animation:none;}'
  + '}';
  var tag = document.createElement('style'); tag.textContent = css;
  document.head.appendChild(tag);
}());

/* ⚠ `var MoneyMat` at classic-script scope already creates window.MoneyMat,
   which is what money-mat.html and the gates use today — so this is
   insurance, not a repair: it survives a future IIFE wrap, and module.exports
   is what lets a Node gate require() the pure engine instead of eval'ing the
   file. The shared print-sheet gate discovers a tool by looking for a
   window-reachable object with id + STORE_KEY + a writable `premium`. */
if (typeof window !== 'undefined') window.MoneyMat = MoneyMat;
if (typeof module !== 'undefined' && module.exports) module.exports = MoneyMat;
